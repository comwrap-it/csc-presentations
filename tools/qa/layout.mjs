#!/usr/bin/env node
/* Layout regression: every scene × viewport × language × brand, optionally every tab.
   node tools/qa/layout.mjs [client]
     --viewports=all|quick|1440x900,390x844   (default all: 7 viewports)
     --langs=it,en        (default it,en)
     --brands=reply,comwrap   (default reply,comwrap)
     --scenes=costa,skoda     only these scene ids
     --tabs               also open every tab / step inside each scene
     --shots              save a screenshot per scene in qa-out/layout/
     --no-build           use the existing dist-dev build
   Exit 1 if any issue is found. Issues: OVERLAP (texts on top of each other), OUT-X (text off-screen),
   UNDER-BRAND / UNDER-TOOLS (text under the top bar), UNDER-NAV (text under the bottom navigation),
   SCROLL-X (horizontal scroll), JS (page error). */
import path from "node:path";
import { chromium, argv, parseViewports, list, pickClient, devUrl, openDeck, sceneIds, goScene, probe, tabCount, clickTab, outDir } from "./common.mjs";

const a = argv();
const client = pickClient(a);
const url = devUrl(client, a);
const only = a.scenes ? new Set(list(a.scenes)) : null;
const shots = a.shots ? outDir("layout") : null;
const browser = await (await chromium()).launch();
const report = {};
let total = 0;

for (const brand of list(a.brands, "reply,comwrap")) for (const lang of list(a.langs, "it,en")) for (const [w, h] of parseViewports(a.viewports || "all")) {
  const page = await openDeck(browser, url, { w, h, lang, brand });
  const ids = await sceneIds(page);
  for (let i = 0; i < ids.length; i++) {
    if (only && !only.has(ids[i])) continue;
    await goScene(page, i);
    const found = [];
    (await probe(page)).forEach((x) => found.push(x));
    if (a.tabs) {
      const n = await tabCount(page);
      for (let k = 1; k < n; k++) { await clickTab(page, k); (await probe(page)).forEach((x) => found.push(`tab ${k + 1}: ${x}`)); }
      if (n > 1) await clickTab(page, 0);
    }
    if (found.length) { total += found.length; (report[ids[i]] = report[ids[i]] || []).push(`${brand} ${lang} ${w}x${h}: ${found.slice(0, 6).join(" | ")}`); }
    if (shots) await page.screenshot({ path: path.join(shots, `${brand}_${lang}_${w}x${h}_${String(i + 1).padStart(2, "0")}_${ids[i]}.png`) });
  }
  if (page._errs.length) { total += page._errs.length; (report._js = report._js || []).push(`${brand} ${lang} ${w}x${h}: ${page._errs.slice(0, 3).join(" | ")}`); }
  await page.close();
}
await browser.close();
for (const [k, v] of Object.entries(report)) { console.log(`## ${k}`); v.forEach((l) => console.log("   " + l.slice(0, 400))); }
console.log(`TOTAL ${total}${shots ? `  · screenshots in ${shots}` : ""}`);
process.exit(total ? 1 : 0);
