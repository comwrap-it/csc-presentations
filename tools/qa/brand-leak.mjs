#!/usr/bin/env node
/* Brand leak check: in one brand, look for the accent colour of the other brand
   (e.g. Reply green #01EB51 inside the Comwrap Reply version).
   node tools/qa/brand-leak.mjs [client] [--brand=comwrap] [--scenes=…] [--tabs] [--min=0.1] [--no-build]
   --min: % of an image's pixels in the other accent that raises a warning (default 0.1)
   - UI: computed colour, background, border, SVG fill/stroke of every visible element → ERROR
   - Images and the core canvas: share of pixels close to the other accent → WARN (photos and
     third-party screenshots can legitimately contain that colour: look at them before changing anything)
   Also checks the overlays (overview, menu, Regia, core) once. Exit 1 on ERROR. */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { ROOT, chromium, argv, list, pickClient, devUrl, openDeck, sceneIds, goScene, tabCount, clickTab } from "./common.mjs";

const a = argv();
const client = pickClient(a);
const brand = a.brand || "comwrap";
const sb = { window: {}, location: { search: "" }, URLSearchParams, sessionStorage: { getItem: () => null }, localStorage: { getItem: () => null } };
sb.window.window = sb.window; sb.window.CLIENT_CONFIG = {};
vm.createContext(sb); vm.runInContext(fs.readFileSync(path.join(ROOT, "core/shell/brands.js"), "utf8"), sb);
const BR = sb.window.BRANDS;
const others = Object.keys(BR).filter((b) => b !== brand).map((b) => ({ id: b, hex: BR[b].accent }));
const url = devUrl(client, a);
const MIN = Number(a.min || 0.1) / 100; // share of pixels (in %) that triggers an image warning
const only = a.scenes ? new Set(list(a.scenes)) : null;

const SCAN = String.raw`(others, MIN) => {
  const rgb = (h) => { const n = parseInt(h.replace('#', ''), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  const T = others.map((o) => ({ id: o.id, c: rgb(o.hex) }));
  const near = (r, g, b, c, d) => Math.abs(r - c[0]) + Math.abs(g - c[1]) + Math.abs(b - c[2]) < d;
  const parse = (s) => { const m = String(s).match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,/]+/).map(Number); return (p[3] === 0) ? null : p; };
  const root = document.querySelector('#stage .scene:last-child') || document.body;
  const ui = new Set(), img = [];
  const vis = (e) => { const r = e.getBoundingClientRect(); if (r.width < 2 || r.height < 2) return false; const cs = getComputedStyle(e); return cs.visibility !== 'hidden' && cs.display !== 'none' && +cs.opacity > 0.05; };
  const scope = [root, ...document.querySelectorAll('.top, .nav, .retbtn, #casePanel, .modal.show')];
  for (const base of scope) for (const e of [base, ...base.querySelectorAll('*')]) {
    if (!vis(e)) continue;
    const cs = getComputedStyle(e);
    for (const prop of ['color', 'backgroundColor', 'borderTopColor', 'borderLeftColor', 'fill', 'stroke', 'outlineColor']) {
      const p = parse(cs[prop]); if (!p) continue;
      if (prop.startsWith('border') && parseFloat(cs[prop.replace('Color', 'Width')]) === 0) continue;
      for (const t of T) if (near(p[0], p[1], p[2], t.c, 40)) ui.add(t.id + ' ' + prop + ' on <' + e.tagName.toLowerCase() + (e.className && typeof e.className === 'string' ? '.' + e.className.split(' ')[0] : '') + '> "' + (e.textContent || '').trim().slice(0, 30) + '"');
    }
    if (e.tagName === 'IMG' && e.complete && e.naturalWidth) {
      try {
        const c = document.createElement('canvas'); const s = Math.min(1, 300 / e.naturalWidth); c.width = Math.max(1, e.naturalWidth * s | 0); c.height = Math.max(1, e.naturalHeight * s | 0);
        const x = c.getContext('2d'); x.drawImage(e, 0, 0, c.width, c.height); const d = x.getImageData(0, 0, c.width, c.height).data;
        for (const t of T) { let n = 0; for (let i = 0; i < d.length; i += 4) if (d[i + 3] > 128 && near(d[i], d[i + 1], d[i + 2], t.c, 60)) n++; const share = n / (d.length / 4); if (share > MIN) img.push(t.id + ' ' + (share * 100).toFixed(1) + '% of ' + (e.alt || e.src.slice(0, 40).replace(/;base64.*/, '')) ); }
      } catch (err) {}
    }
  }
  return { ui: [...ui].slice(0, 10), img };
}`;

const browser = await (await chromium()).launch();
const page = await openDeck(browser, url, { w: 1440, h: 900, lang: "it", brand });
const ids = await sceneIds(page);
let errs = 0, warns = 0;
const check = async (label) => {
  const r = await page.evaluate(`(${SCAN})(${JSON.stringify(others)}, ${MIN})`);
  r.ui.forEach((x) => { errs++; console.log(`ERROR ${label}: ${x}`); });
  r.img.forEach((x) => { warns++; console.log(`WARN  ${label}: image ${x}`); });
};
for (let i = 0; i < ids.length; i++) {
  if (only && !only.has(ids[i])) continue;
  await goScene(page, i, 450);
  await check(`${i + 1} ${ids[i]}`);
  if (a.tabs) { const n = await tabCount(page); for (let k = 1; k < n; k++) { await clickTab(page, k); await check(`${i + 1} ${ids[i]} tab ${k + 1}`); } }
}
await page.keyboard.press("g"); await page.waitForTimeout(400); await check("overview"); await page.keyboard.press("Escape");
await page.click("#moreBtn"); await page.waitForTimeout(300); await check("menu"); await page.keyboard.press("Escape");
await page.keyboard.press("d"); await page.waitForTimeout(300); await check("regia"); await page.keyboard.press("Escape");
page._errs.forEach((e) => { errs++; console.log(`ERROR js: ${e}`); });
await browser.close();
console.log(`\nbrand ${brand}: ${errs} error(s), ${warns} image warning(s) — looking for ${others.map((o) => `${o.id} ${o.hex}`).join(", ")}`);
process.exit(errs ? 1 : 0);
