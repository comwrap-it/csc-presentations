#!/usr/bin/env node
/* End-to-end test of the ENCRYPTED page (what GitHub Pages serves).
   CSC_TEST_PASSWORD=<any test password> node tools/qa/login.mjs [client]
   Builds dist/<client> with that password (a throw-away local build: never commit it, CI rebuilds
   with the real secret), then checks: wrong password refused · brand picker · remember-me ·
   deep link (#scene) · brand switch (key B) · lock · no JS errors. Exit 1 on failure. */
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { ROOT, chromium, argv, pickClient } from "./common.mjs";

const a = argv();
const client = pickClient(a);
const pw = process.env.CSC_TEST_PASSWORD;
if (!pw) { console.error("Set CSC_TEST_PASSWORD (a test password, not the real one)."); process.exit(2); }
execFileSync(process.execPath, [path.join(ROOT, "scripts/build.mjs"), client, `--password=${pw}`], { stdio: "ignore" });
const U = pathToFileURL(path.join(ROOT, "dist", client, "index.html")).href;

const browser = await (await chromium()).launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const errs = [];
let fail = 0;
const ok = (cond, msg) => { console.log(`${cond ? "PASS" : "FAIL"}  ${msg}`); if (!cond) fail++; };

const p = await ctx.newPage(); p.on("pageerror", (e) => errs.push(String(e)));
await p.goto(U); await p.waitForTimeout(500);
ok(await p.evaluate(() => !!document.getElementById("pw") && typeof window.SCENES === "undefined"), "login page shown, content not readable before unlocking");
await p.fill("#pw", pw + "-wrong"); await p.click("#go"); await p.waitForTimeout(2500);
ok((await p.innerText("#err")).trim().length > 0, "wrong password refused");
const brands = await p.evaluate(() => [...document.querySelectorAll(".bopt")].map((b) => b.dataset.b));
ok(brands.length >= 2, `brand picker offers ${brands.join(", ")}`);
const target = brands.includes("comwrap") ? "comwrap" : brands[0];
await p.click(`[data-b="${target}"]`); await p.check("#rem");
await p.fill("#pw", pw); await p.click("#go"); await p.waitForTimeout(4500);
const st = await p.evaluate(() => [window.BRAND, typeof SCENES !== "undefined" ? SCENES.length : 0]);
ok(st[0] === target && st[1] > 0, `unlocked in brand ${st[0]} with ${st[1]} scenes`);
const second = await p.evaluate(() => SCENES[Math.min(3, SCENES.length - 1)].id);

const p2 = await ctx.newPage(); p2.on("pageerror", (e) => errs.push(String(e)));
await p2.goto(`${U}#${second}`); await p2.waitForTimeout(5000);
const st2 = await p2.evaluate(() => [window.BRAND, typeof SCENES !== "undefined" && SCENES[UI.i].id]);
ok(st2[0] === target, "remember-me reopens without password, same brand");
ok(st2[1] === second, `deep link #${second} opens that scene`);
await p2.keyboard.press("b"); await p2.waitForTimeout(800);
ok(await p2.evaluate((t) => window.BRAND !== t, target), "key B switches brand");
await p2.click("#moreBtn"); await p2.click("#lockBtn"); await p2.waitForTimeout(1500);
ok(await p2.evaluate(() => !!document.getElementById("pw")), "lock returns to the login page");
ok(!errs.length, `no JS errors${errs.length ? ": " + errs.slice(0, 3).join(" | ") : ""}`);
await browser.close();
console.log(fail ? `\n${fail} check(s) failed.` : "\nAll checks passed.");
process.exit(fail ? 1 : 0);
