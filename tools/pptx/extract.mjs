#!/usr/bin/env node
/* Extract text, speaker notes and images from selected slides of a .pptx — no dependencies.
   node tools/pptx/extract.mjs "<deck.pptx>" --slides=12-14[,20] [--out=qa-out/pptx/<deck>]
   node tools/pptx/extract.mjs "<deck.pptx>" --list            one line per slide: number · title
   Writes for each slide: slide-<n>.md (text in reading order, grouped by shape, with position and size;
   tables as rows; notes) and the slide's images as slide-<n>_<name>.<ext>.
   Works on decks of hundreds of MB: only the needed entries are read from the zip.
   What it cannot do: render the slide. Diagrams built from shapes or SVG graphics need a picture:
   use tools/pptx/render.mjs (LibreOffice) or ask for a PDF/PNG export of those slides. */
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { ROOT, argv } from "../lib.mjs";

const a = argv();
const file = a._[0];
if (!file || !fs.existsSync(file)) { console.error('Usage: node tools/pptx/extract.mjs "<deck.pptx>" --slides=12-14 | --list'); process.exit(2); }

/* ---- minimal zip reader (central directory + stored/deflate) ---- */
const fd = fs.openSync(file, "r");
const size = fs.fstatSync(fd).size;
const readAt = (pos, len) => { const b = Buffer.alloc(len); fs.readSync(fd, b, 0, len, pos); return b; };
const tail = readAt(Math.max(0, size - 70000), Math.min(size, 70000));
let eocd = -1; for (let i = tail.length - 22; i >= 0; i--) if (tail.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
if (eocd < 0) { console.error("Not a zip/pptx file"); process.exit(2); }
let cdCount = tail.readUInt16LE(eocd + 10), cdSize = tail.readUInt32LE(eocd + 12), cdOff = tail.readUInt32LE(eocd + 16);
if (cdOff === 0xffffffff || cdCount === 0xffff) { // zip64
  const loc = tail.readUInt32LE(eocd - 20) === 0x07064b50 ? eocd - 20 : -1;
  const z64 = Number(tail.readBigUInt64LE(loc + 8));
  const rec = readAt(z64, 56);
  cdCount = Number(rec.readBigUInt64LE(32)); cdSize = Number(rec.readBigUInt64LE(40)); cdOff = Number(rec.readBigUInt64LE(48));
}
const cd = readAt(cdOff, cdSize);
const entries = {};
for (let p = 0, n = 0; n < cdCount && p < cd.length; n++) {
  const method = cd.readUInt16LE(p + 10); let csize = cd.readUInt32LE(p + 20); let usize = cd.readUInt32LE(p + 24);
  const nl = cd.readUInt16LE(p + 28), xl = cd.readUInt16LE(p + 30), cl = cd.readUInt16LE(p + 32); let off = cd.readUInt32LE(p + 42);
  const name = cd.slice(p + 46, p + 46 + nl).toString("utf8");
  if (csize === 0xffffffff || usize === 0xffffffff || off === 0xffffffff) { // zip64 extra field
    const x = cd.slice(p + 46 + nl, p + 46 + nl + xl);
    for (let q = 0; q < x.length;) { const id = x.readUInt16LE(q), l = x.readUInt16LE(q + 2); if (id === 1) { let r = q + 4; if (usize === 0xffffffff) { usize = Number(x.readBigUInt64LE(r)); r += 8; } if (csize === 0xffffffff) { csize = Number(x.readBigUInt64LE(r)); r += 8; } if (off === 0xffffffff) off = Number(x.readBigUInt64LE(r)); } q += 4 + l; }
  }
  entries[name] = { method, csize, off };
  p += 46 + nl + xl + cl;
}
const get = (name) => {
  const e = entries[name]; if (!e) return null;
  const h = readAt(e.off, 30); const start = e.off + 30 + h.readUInt16LE(26) + h.readUInt16LE(28);
  const raw = readAt(start, e.csize);
  return e.method === 0 ? raw : zlib.inflateRawSync(raw);
};
const xml = (name) => { const b = get(name); return b ? b.toString("utf8") : ""; };

/* ---- slide order from presentation.xml ---- */
const rels = (name) => {
  const dir = path.posix.dirname(name), base = path.posix.basename(name);
  const r = xml(`${dir}/_rels/${base}.rels`); const out = {};
  for (const m of r.matchAll(/<Relationship [^>]*Id="([^"]+)"[^>]*Target="([^"]+)"[^>]*>/g)) out[m[1]] = m[2].startsWith("/") ? m[2].slice(1) : path.posix.normalize(`${dir}/${m[2]}`);
  return out;
};
const pres = xml("ppt/presentation.xml"), presRels = rels("ppt/presentation.xml");
const slides = [...pres.matchAll(/<p:sldId [^>]*r:id="([^"]+)"/g)].map((m) => presRels[m[1]]);
const dec = (s) => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&");
const paras = (x) => [...x.matchAll(/<a:p>([\s\S]*?)<\/a:p>/g)].map((m) => [...m[1].matchAll(/<a:t>([\s\S]*?)<\/a:t>|<a:br\/>/g)].map((t) => (t[1] === undefined ? "\n" : dec(t[1]))).join("")).filter((t) => t.trim());
const EMU = 914400 / 2.54; // per cm
const geo = (x) => { const o = x.match(/<a:off x="(-?\d+)" y="(-?\d+)"\/>/), e = x.match(/<a:ext cx="(\d+)" cy="(\d+)"\/>/); return o && e ? { x: +o[1], y: +o[2], w: +e[1], h: +e[2] } : null; };
const title = (x) => { const m = x.match(/<p:sp>(?:(?!<\/p:sp>)[\s\S])*?type="(?:title|ctrTitle)"[\s\S]*?<\/p:sp>/); return m ? paras(m[0]).join(" / ") : (paras(x)[0] || ""); };

if (a.list) { slides.forEach((s, i) => console.log(`${String(i + 1).padStart(3)}  ${title(xml(s)).replace(/\s+/g, " ").slice(0, 100)}`)); process.exit(0); }

const want = new Set(); String(a.slides || "").split(",").filter(Boolean).forEach((r) => { const [x, y] = r.split("-").map(Number); for (let i = x; i <= (y || x); i++) want.add(i); });
if (!want.size) { console.error("Pass --slides=12-14 (or --list)"); process.exit(2); }
const out = path.resolve(a.out || path.join(ROOT, "qa-out/pptx", path.basename(file, path.extname(file)).replace(/[^\w.-]+/g, "_")));
fs.mkdirSync(out, { recursive: true });

for (const n of [...want].sort((x, y) => x - y)) {
  const name = slides[n - 1]; if (!name) { console.log(`slide ${n}: not found (deck has ${slides.length})`); continue; }
  const s = xml(name), r = rels(name);
  const md = [`# Slide ${n} — ${title(s).replace(/\s+/g, " ")}`, "", `source: ${path.basename(file)} · ${name}`, ""];
  const shapes = [];
  for (const m of s.matchAll(/<p:(sp|pic|graphicFrame)>([\s\S]*?)<\/p:\1>/g)) {
    const kind = m[1], body = m[2], g = geo(body), nm = (body.match(/<p:cNvPr [^>]*name="([^"]*)"/) || [])[1] || "";
    if (kind === "sp") { const t = paras(body); if (t.length) shapes.push({ g, nm, text: t }); }
    if (kind === "graphicFrame" && /r:dm="([^"]+)"/.test(body)) { // SmartArt: the text lives in ppt/diagrams/dataN.xml
      const dm = r[body.match(/r:dm="([^"]+)"/)[1]];
      const pts = [...xml(dm).matchAll(/<dgm:pt [^>]*>([\s\S]*?)<\/dgm:pt>/g)].map((x) => paras(x[1]).join(" ").trim()).filter(Boolean);
      if (pts.length) shapes.push({ g, nm: `${nm} (SmartArt, in order)`, text: pts.map((t, i) => `${i + 1}. ${t}`) });
    }
    if (kind === "graphicFrame" && body.includes("<a:tbl>")) shapes.push({ g, nm, table: [...body.matchAll(/<a:tr[\s\S]*?<\/a:tr>/g)].map((row) => [...row[0].matchAll(/<a:tc[\s\S]*?<\/a:tc>/g)].map((c) => paras(c[0]).join(" ").trim())) });
    if (kind === "pic") {
      const rid = (body.match(/r:embed="([^"]+)"/) || [])[1]; const svg = (body.match(/svgBlip[^>]*r:embed="([^"]+)"/) || [])[1];
      const target = r[svg || rid];
      if (target && entries[target]) {
        const f = `slide-${n}_${path.posix.basename(target)}`; fs.writeFileSync(path.join(out, f), get(target));
        shapes.push({ g, nm, img: f });
      } else shapes.push({ g, nm, img: "(vector or linked graphic: not extractable, render the slide)" });
    }
  }
  for (let i = shapes.length - 1; i > 0; i--) if (shapes[i].img && shapes.slice(0, i).some((x) => x.img === shapes[i].img && x.nm === shapes[i].nm)) shapes.splice(i, 1);
  shapes.sort((p, q) => (p.g && q.g ? (Math.abs(p.g.y - q.g.y) > EMU * 1.2 ? p.g.y - q.g.y : p.g.x - q.g.x) : 0));
  for (const sh of shapes) {
    const where = sh.g ? ` @ x${(sh.g.x / EMU).toFixed(1)} y${(sh.g.y / EMU).toFixed(1)} · ${(sh.g.w / EMU).toFixed(1)}×${(sh.g.h / EMU).toFixed(1)} cm` : "";
    md.push(`## ${sh.img ? "image" : sh.table ? "table" : "text"} — ${sh.nm}${where}`);
    if (sh.text) md.push(...sh.text.map((t) => t.replace(/\v/g, "\n")), "");
    if (sh.table) md.push(...sh.table.map((row) => `| ${row.join(" | ")} |`), "");
    if (sh.img) md.push(sh.img, "");
  }
  const notesName = Object.values(r).find((t) => /notesSlide/.test(t));
  if (notesName) { const nt = paras(xml(notesName)).filter((t) => !/^\d+$/.test(t.trim())); if (nt.length) md.push("## speaker notes", ...nt, ""); }
  const vector = /<a:graphicData[^>]*diagram|<p:grpSp>[\s\S]*?<p:cxnSp>|svgBlip/.test(s);
  if (vector) md.push("> NOTE: this slide contains SmartArt, connectors or vector graphics. Render it to see the diagram.");
  fs.writeFileSync(path.join(out, `slide-${n}.md`), md.join("\n"));
  console.log(path.join(out, `slide-${n}.md`));
}
