#!/usr/bin/env node
/* Contact sheets for visual review: one PNG per 12 scenes, labelled, in qa-out/sheets/.
   node tools/qa/sheets.mjs [client] [--brand=comwrap] [--lang=it] [--viewport=1440x900] [--scenes=…] [--tabs] [--no-build]
   With --tabs every tab of a scene gets its own tile. Open the PNGs (or let an agent Read them)
   to judge what the layout probe cannot: hierarchy, crops, empty areas, wrong images, brand look. */
import path from "node:path";
import { chromium, argv, list, pickClient, devUrl, openDeck, sceneIds, goScene, tabCount, clickTab, outDir } from "./common.mjs";

const a = argv();
const client = pickClient(a);
const brand = a.brand || "comwrap", lang = a.lang || "it";
const [w, h] = String(a.viewport || "1440x900").split("x").map(Number);
const url = devUrl(client, a);
const only = a.scenes ? new Set(list(a.scenes)) : null;
const dir = outDir("sheets");
const browser = await (await chromium()).launch();
const page = await openDeck(browser, url, { w, h, lang, brand });
const ids = await sceneIds(page);
const tiles = [];
for (let i = 0; i < ids.length; i++) {
  if (only && !only.has(ids[i])) continue;
  await goScene(page, i, 600);
  tiles.push({ label: `${i + 1} · ${ids[i]}`, b64: (await page.screenshot()).toString("base64") });
  if (a.tabs) { const n = await tabCount(page); for (let k = 1; k < n; k++) { await clickTab(page, k); tiles.push({ label: `${i + 1} · ${ids[i]} · tab ${k + 1}`, b64: (await page.screenshot()).toString("base64") }); } }
}
const sheet = await browser.newPage({ viewport: { width: 1800, height: 1000 } });
const files = [];
for (let s = 0; s * 12 < tiles.length; s++) {
  const part = tiles.slice(s * 12, s * 12 + 12);
  await sheet.setContent(`<body style="margin:0;background:#111;font:600 15px Arial;color:#ff0;display:grid;grid-template-columns:repeat(3,600px)">${part.map((t) => `<div style="position:relative"><img style="width:600px;display:block" src="data:image/png;base64,${t.b64}"><span style="position:absolute;left:6px;top:4px;background:#000c;padding:2px 6px">${t.label}</span></div>`).join("")}</body>`);
  await sheet.waitForTimeout(200);
  const f = path.join(dir, `${client}_${brand}_${lang}_${w}x${h}_${String(s + 1).padStart(2, "0")}.png`);
  await sheet.screenshot({ path: f, fullPage: true });
  files.push(f);
}
await browser.close();
files.forEach((f) => console.log(f));
if (page._errs.length) { console.log("JS errors:", page._errs.slice(0, 3).join(" | ")); process.exit(1); }
