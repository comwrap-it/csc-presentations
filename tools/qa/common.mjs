/* Shared QA plumbing: dev build, browser, scene navigation, layout probe.
   Needs the dev dependency "playwright" (npm install, then: npx playwright install chromium). */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { ROOT, clientIds, argv } from "../lib.mjs";

export { ROOT, argv };

export async function chromium() {
  try { return (await import("playwright")).chromium; } catch (e) {
    console.error("Playwright is missing. Run once:  npm install  &&  npx playwright install chromium");
    process.exit(3);
  }
}

export const VIEWPORTS = {
  all: "1920x1080,1440x900,1366x768,1280x720,1024x768,768x1024,390x844",
  quick: "1440x900,1366x768,390x844"
};
export const parseViewports = (v) => (VIEWPORTS[v] || v).split(",").map((x) => x.split("x").map(Number));
export const list = (v, def) => String(v || def).split(",").filter(Boolean);
export const pickClient = (a) => a.client || a._[0] || clientIds()[0];

/** Build the unencrypted preview (dist-dev) unless --no-build. Never publish dist-dev. */
export function devUrl(client, a) {
  const file = path.join(ROOT, "dist-dev", client, "index.html");
  if (!a["no-build"]) execFileSync(process.execPath, [path.join(ROOT, "scripts/build.mjs"), client, "--dev"], { stdio: "ignore" });
  if (!fs.existsSync(file)) { console.error(`Missing ${file}. Run: node scripts/build.mjs ${client} --dev`); process.exit(2); }
  return pathToFileURL(file).href;
}

export const OUT = path.join(ROOT, "qa-out");
export const outDir = (name) => { const d = path.join(OUT, name); fs.mkdirSync(d, { recursive: true }); return d; };

export const NOANIM = "*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition:none!important}";

/** Open the deck at a brand/language with animations off. Collects page errors in page._errs. */
export async function openDeck(browser, url, { w, h, lang = "it", brand = "reply", noanim = true }) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  page._errs = [];
  page.on("pageerror", (e) => page._errs.push(String(e.message || e)));
  await page.goto(`${url}?lang=${lang}&brand=${brand}`);
  if (noanim) await page.addStyleTag({ content: NOANIM });
  await page.waitForTimeout(900);
  return page;
}

export const sceneIds = (page) => page.evaluate(() => SCENES.map((s) => s.id));
export async function goScene(page, i, wait = 380) { await page.evaluate((n) => go(n), i); await page.waitForTimeout(wait); }
export const scrollScene = (page, y) => page.evaluate((v) => { const s = document.querySelector("#stage .scene:last-child"); if (s) s.scrollTop = v; }, y);

/** Buttons that switch the content of a scene in place (tabs, steps). Navigation buttons are excluded. */
export const TAB_SELECTOR = ".tabs button, .steps button";
export async function tabCount(page) { return page.evaluate((sel) => document.querySelectorAll(`#stage .scene:last-child :is(${sel})`).length, TAB_SELECTOR); }
export async function clickTab(page, k) {
  await page.evaluate(([sel, n]) => { const b = document.querySelectorAll(`#stage .scene:last-child :is(${sel})`)[n]; if (b) b.click(); }, [TAB_SELECTOR, k]);
  await page.waitForTimeout(280);
}

/** Layout probe: overlapping text, text off-screen, text under the top bar or the navigation, horizontal scroll. */
export const LAYOUT_PROBE = String.raw`() => {
  const vw = innerWidth, vh = innerHeight;
  const scene = document.querySelector('#stage .scene:last-child');
  const top = document.querySelector('.top .brand').getBoundingClientRect();
  const tools = document.querySelector('.top .tools').getBoundingClientRect();
  const navTop = Math.min(...[...document.querySelectorAll('.nav > *')].map(e => e.getBoundingClientRect().top).filter(Boolean));
  const vis = (el) => { for (let e = el; e && e !== document.body; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity < 0.05) return false; } return true; };
  const boxes = [];
  const walker = document.createTreeWalker(scene, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = walker.nextNode())) {
    if (!n.nodeValue.trim()) continue;
    const el = n.parentElement; if (!vis(el)) continue;
    const clips = []; for (let e = el.parentElement; e && e !== scene; e = e.parentElement) { const cs = getComputedStyle(e); if (/(auto|hidden|scroll|clip)/.test(cs.overflow + cs.overflowY + cs.overflowX)) clips.push(e.getBoundingClientRect()); }
    const r = document.createRange(); r.selectNodeContents(n);
    for (const q of r.getClientRects()) { if (q.width < 2 || q.height < 2) continue; const cx = q.left + q.width / 2, cy = q.top + q.height / 2; if (clips.some((c) => cx < c.left || cx > c.right || cy < c.top || cy > c.bottom)) continue; boxes.push({ el, x: q.left, y: q.top, w: q.width, h: q.height, t: n.nodeValue.trim().slice(0, 40) }); }
  }
  const issues = [];
  for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
    const a = boxes[i], b = boxes[j];
    if (a.el === b.el || a.el.contains(b.el) || b.el.contains(a.el)) continue;
    const ix = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x), iy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
    if (ix > 2 && iy > 3) { const ar = ix * iy, m = Math.min(a.w * a.h, b.w * b.h); if (ar > 0.12 * m) issues.push('OVERLAP "' + a.t + '" x "' + b.t + '"'); }
  }
  boxes.forEach((b) => {
    if (b.x < -1 || b.x + b.w > vw + 1) issues.push('OUT-X "' + b.t + '"');
    const inView = b.y < vh && b.y + b.h > 0;
    if (inView && b.y < Math.max(top.bottom, tools.bottom) && b.x < Math.max(top.right, 0) + 4 && b.y + b.h > 8) issues.push('UNDER-BRAND "' + b.t + '"');
    else if (inView && b.y < tools.bottom && b.x + b.w > tools.left) issues.push('UNDER-TOOLS "' + b.t + '"');
    if (b.y + b.h > navTop + 2 && b.y < vh && scene.scrollTop + scene.clientHeight >= scene.scrollHeight - 2) issues.push('UNDER-NAV "' + b.t + '"');
  });
  return { issues: [...new Set(issues)].slice(0, 12), sw: scene.scrollWidth > scene.clientWidth + 2 };
}`;

/** Probe the scene at the top and at the bottom of its scroll; returns the list of issues. */
export async function probe(page) {
  await scrollScene(page, 0);
  const a = await page.evaluate(`(${LAYOUT_PROBE})()`);
  await scrollScene(page, 1e6); await page.waitForTimeout(60);
  const b = await page.evaluate(`(${LAYOUT_PROBE})()`);
  await scrollScene(page, 0);
  const iss = new Set(a.issues.concat(b.issues.filter((x) => x.startsWith("UNDER-NAV") || x.startsWith("OVERLAP"))));
  if (a.sw) iss.add("SCROLL-X");
  return [...iss].sort();
}
