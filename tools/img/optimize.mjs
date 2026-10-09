#!/usr/bin/env node
/* Turn a source image (png, jpg, webp, gif, svg) into a web-ready asset, using the Playwright
   Chromium (no other dependency).
   node tools/img/optimize.mjs <input> --out=core/assets/img/<name>.webp
        [--width=1600] [--q=82] [--crop=x,y,w,h] [--bg=#ffffff]
   - max width 1600 px by default (never upscales); photos ≤ ~250 KB, screenshots ≤ ~400 KB
   - .webp (default) or .jpg by the extension of --out; transparent PNG/SVG → use .webp (keeps alpha)
   - --crop in source pixels, applied before resizing; --bg flattens transparency
   Every KB ends up base64 inside the page (×1.33): keep assets small. EMF/WMF cannot be read:
   render the slide (tools/pptx/render.mjs) or ask for a PNG. */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { argv } from "../lib.mjs";

const a = argv({ width: 1600, q: 82 });
const input = a._[0];
if (!input || !fs.existsSync(input) || !a.out) { console.error("Usage: node tools/img/optimize.mjs <input> --out=core/assets/img/name.webp [--width=1600] [--q=82] [--crop=x,y,w,h]"); process.exit(2); }
let chromium; try { ({ chromium } = await import("playwright")); } catch (e) { console.error("Playwright missing: npm install && npx playwright install chromium"); process.exit(3); }
const type = /\.jpe?g$/i.test(a.out) ? "image/jpeg" : "image/webp";
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(path.resolve(input)).href.replace(/[^/]+$/, ""));
const ext = path.extname(input).slice(1).toLowerCase();
const mime = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif", svg: "image/svg+xml" }[ext];
if (!mime) { console.error(`Unsupported input .${ext}`); process.exit(2); }
const src = `data:${mime};base64,${fs.readFileSync(input).toString("base64")}`;
const res = await page.evaluate(async ({ src, maxW, q, type, crop, bg }) => {
  const img = new Image(); img.src = src; await img.decode();
  let [sx, sy, sw, sh] = crop ? crop.split(",").map(Number) : [0, 0, img.naturalWidth || 1600, img.naturalHeight || 900];
  const scale = Math.min(1, maxW / sw);
  const c = document.createElement("canvas"); c.width = Math.round(sw * scale); c.height = Math.round(sh * scale);
  const x = c.getContext("2d"); x.imageSmoothingQuality = "high";
  if (bg || type === "image/jpeg") { x.fillStyle = bg || "#ffffff"; x.fillRect(0, 0, c.width, c.height); }
  x.drawImage(img, sx, sy, sw, sh, 0, 0, c.width, c.height);
  return { url: c.toDataURL(type, q / 100), w: c.width, h: c.height, ow: img.naturalWidth, oh: img.naturalHeight };
}, { src, maxW: Number(a.width), q: Number(a.q), type, crop: a.crop || null, bg: a.bg || null });
await browser.close();
const buf = Buffer.from(res.url.split(",")[1], "base64");
fs.mkdirSync(path.dirname(path.resolve(a.out)), { recursive: true });
fs.writeFileSync(a.out, buf);
console.log(`${a.out}  ${res.w}×${res.h} (from ${res.ow}×${res.oh})  ${(buf.length / 1024).toFixed(0)} KB`);
if (buf.length > 450 * 1024) console.log("! larger than 450 KB: lower --q or --width, or crop");
