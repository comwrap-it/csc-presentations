#!/usr/bin/env node
/* Build the presentations.
   node scripts/build.mjs lavazza            → dist/lavazza/index.html (encrypted, needs a password)
   node scripts/build.mjs --all              → every client with "publish": true
   node scripts/build.mjs lavazza --dev      → dist-dev/lavazza/index.html (NOT encrypted, local preview only)
   Password lookup: --password=…  ·  env CSC_PASSWORD_<ID>  ·  env SECRETS_JSON → PASSWORD_<ID> (GitHub Actions)
   No dependencies: Node 18+. */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CORE = path.join(ROOT, "core");
const ITERATIONS = 600000;
const MIME = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml", ".gif": "image/gif", ".mp4": "video/mp4", ".webm": "video/webm" };

const args = process.argv.slice(2);
const dev = args.includes("--dev");
const all = args.includes("--all");
const pwArg = (args.find((a) => a.startsWith("--password=")) || "").slice(11);
let secrets = {};
try { secrets = JSON.parse(process.env.SECRETS_JSON || "{}"); } catch (e) { secrets = {}; }

const read = (p) => fs.readFileSync(p, "utf8");
const envKey = (id) => id.toUpperCase().replace(/[^A-Z0-9]/g, "_");
const passwordFor = (id) => pwArg || process.env[`CSC_PASSWORD_${envKey(id)}`] || secrets[`PASSWORD_${envKey(id)}`] || "";

function clientIds() {
  const named = args.filter((a) => !a.startsWith("--"));
  if (named.length) return named;
  if (!all) { console.error("Usage: node scripts/build.mjs <client…> | --all [--dev]"); process.exit(2); }
  return fs.readdirSync(path.join(ROOT, "clients")).filter((d) => !d.startsWith("_") && fs.existsSync(path.join(ROOT, "clients", d, "client.json")))
    .filter((d) => JSON.parse(read(path.join(ROOT, "clients", d, "client.json"))).publish !== false);
}

function assetPath(clientDir, rel) {
  const own = path.join(clientDir, rel);
  if (fs.existsSync(own)) return own;
  const shared = path.join(CORE, rel);
  if (fs.existsSync(shared)) return shared;
  return null;
}

function inlineAssets(text, clientDir, used) {
  return text.replace(/assets\/(img|video)\/[A-Za-z0-9._-]+/g, (rel) => {
    const file = assetPath(clientDir, rel);
    if (!file) { console.warn(`  ! missing asset ${rel}`); return rel; }
    if (!used.has(rel)) used.set(rel, `data:${MIME[path.extname(file).toLowerCase()] || "application/octet-stream"};base64,${fs.readFileSync(file).toString("base64")}`);
    return used.get(rel);
  });
}

const safeScript = (js) => js.replace(/<\/script/gi, "<\\/script");

function bundle(id) {
  const clientDir = path.join(ROOT, "clients", id);
  const cfg = JSON.parse(read(path.join(clientDir, "client.json")));
  cfg.id = id;
  const scripts = [
    "core/model/cards.js", "core/model/content-core.js", "core/model/content-intel.js", "core/model/content-make.js",
    "core/model/content-act.js", "core/model/content-learn.js", "core/shell/i18n.js", "core/scenes/library.js", "core/scenes/library-trends.js",
    fs.existsSync(path.join(clientDir, "scenes.js")) ? `clients/${id}/scenes.js` : null,
    "core/shell/brands.js", "core/engine/engine.js", "core/engine/engine-fx.js", "core/shell/scene-types.js", "core/shell/deck.js"
  ].filter(Boolean);
  const used = new Map();
  const js = scripts.map((s) => `<script>/* ${s} */\n${safeScript(inlineAssets(read(path.join(ROOT, s)), clientDir, used))}\n</script>`).join("\n");
  let css = read(path.join(CORE, "shell/csc.css")) + "\n" + read(path.join(CORE, "shell/scenes.css"));
  const extraCss = path.join(clientDir, "theme.css");
  if (fs.existsSync(extraCss)) css += "\n/* client theme */\n" + read(extraCss);
  const title = (cfg.title || "Content Supply Chain").replace(/\{client\}/g, cfg.name || "");
  const publicCfg = { id, name: cfg.name || "", title: cfg.title, brand: cfg.brand, brands: cfg.brands, defaultLang: cfg.defaultLang, theme: cfg.theme || {}, scenes: cfg.scenes, overrides: cfg.overrides || {}, ui: cfg.ui || {}, sections: cfg.sections };
  let html = read(path.join(CORE, "shell/index.template.html"))
    .replace("{{TITLE}}", () => title.replace(/</g, "&lt;"))
    .replace("{{STYLE}}", () => css)
    .replace("{{CONFIG}}", () => safeScript(JSON.stringify(publicCfg)))
    .replace("{{SCRIPTS}}", () => js);
  html = inlineAssets(html, clientDir, used);
  return { cfg, html, title };
}

function encrypt(plain, password) {
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  const key = crypto.pbkdf2Sync(password, salt, ITERATIONS, 32, "sha256");
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const data = Buffer.concat([cipher.update(plain, "utf8"), cipher.final(), cipher.getAuthTag()]);
  return { salt: salt.toString("base64"), iv: iv.toString("base64"), data: data.toString("base64") };
}

/* Brands (core/shell/brands.js) evaluated once, for the login page selector */
function loadBrands(cfg) {
  const sb = { window: { CLIENT_CONFIG: cfg }, location: { search: "" }, URLSearchParams, sessionStorage: { getItem: () => null }, localStorage: { getItem: () => null } };
  vm.createContext(sb);
  vm.runInContext(read(path.join(CORE, "shell/brands.js")), sb);
  const w = sb.window;
  return w.brandList().map((id) => {
    const b = w.BRANDS[id];
    const head = id === "comwrap" ? w.COMWRAP_LOCKUP("cw") : `<span class="rw"><svg class="rl" viewBox="0 0 466 440" fill="currentColor" aria-hidden="true">${w.REPLY_MAN}</svg>REPLY</span>`;
    return { id, label: b.label, accent: b.accent, bg: b.bg, panel: b.panel, onAccent: b.onAccent, ink2: b.ink2, muted: b.muted, head, pick: `<i style="background:${b.accent}"></i>${head}` };
  });
}

function loginPage(cfg, title, enc) {
  const accent = (cfg.theme && cfg.theme.accent) || "#01EB51";
  const brands = loadBrands(cfg);
  const meta = { id: cfg.id, salt: enc.salt, iv: enc.iv, iter: ITERATIONS, lang: cfg.defaultLang || null, brand: cfg.brand || null, line: cfg.name ? `· ${cfg.name}` : "" };
  return read(path.join(CORE, "shell/login.template.html"))
    .replace("{{TITLE}}", () => title.replace(/</g, "&lt;"))
    .replace("{{ACCENT}}", () => accent)
    .replace("{{CLIENT_LINE}}", () => (cfg.name ? `· ${cfg.name}` : "").replace(/</g, "&lt;"))
    .replace("{{HEADLINE}}", () => (cfg.headline || "AI-Powered Experience Supply Chain").replace(/</g, "&lt;"))
    .replace("{{META}}", () => JSON.stringify(meta))
    .replace("{{BRANDS}}", () => JSON.stringify(brands).replace(/</g, "\\u003c"))
    .replace("{{PAYLOAD}}", () => enc.data);
}

function writeRoot(out) {
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, ".nojekyll"), "");
  fs.writeFileSync(path.join(out, "robots.txt"), "User-agent: *\nDisallow: /\n");
  const page = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Reply</title><style>html,body{margin:0;height:100%;background:#000;color:#F2F5F3;font-family:Arial,sans-serif}body{display:grid;place-items:center;text-align:center;padding:24px}b{color:#01EB51;letter-spacing:.22em}p{color:#86948C}</style></head><body><div><b><svg width="28" height="27" viewBox="0 0 466 440" fill="#01EB51" style="vertical-align:-6px;margin-right:10px"><path d="M167 58L196 81L299 100L176 226L3 250L31 279L203 277L249 251L333 315L349 433L376 432L377 298L303 201L378 107L347 58Z"/><circle cx="417" cy="44" r="45"/></svg>REPLY</b><p>Content Supply Chain · interactive presentations<br>Please use the link you received. · Usa il link che hai ricevuto.</p></div></body></html>`;
  fs.writeFileSync(path.join(out, "index.html"), page);
  fs.writeFileSync(path.join(out, "404.html"), page);
}

const out = path.join(ROOT, dev ? "dist-dev" : "dist");
if (!dev) writeRoot(out);
let built = 0, skipped = 0;
for (const id of clientIds()) {
  if (!fs.existsSync(path.join(ROOT, "clients", id, "client.json"))) { console.error(`✗ ${id}: clients/${id}/client.json not found`); process.exitCode = 1; continue; }
  const { cfg, html, title } = bundle(id);
  const dir = path.join(out, id);
  fs.mkdirSync(dir, { recursive: true });
  if (dev) {
    fs.writeFileSync(path.join(dir, "index.html"), html);
    console.log(`✓ ${id} (preview, NOT encrypted) → ${path.relative(ROOT, dir)}/index.html  ${(html.length / 1e6).toFixed(1)} MB`);
    built++;
    continue;
  }
  const pw = passwordFor(id);
  if (!pw) {
    console.log(`::warning::${id} skipped — no password. Add the repository secret PASSWORD_${envKey(id)}.`);
    fs.rmSync(dir, { recursive: true, force: true });
    skipped++;
    continue;
  }
  if (pw.length < 10) console.log(`::warning::${id}: the password is short; use at least 12 characters.`);
  const enc = encrypt(html.replace("<script>window.CLIENT_CONFIG", "<script>window.CSC_PROTECTED = true;</script>\n  <script>window.CLIENT_CONFIG"), pw);
  const page = loginPage(cfg, title, enc);
  fs.writeFileSync(path.join(dir, "index.html"), page);
  console.log(`✓ ${id} (encrypted) → ${path.relative(ROOT, dir)}/index.html  ${(page.length / 1e6).toFixed(1)} MB`);
  built++;
}
console.log(`${built} built${skipped ? `, ${skipped} skipped` : ""}.`);
