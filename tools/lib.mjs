/* Shared helpers for the repo tools (validate, catalog, QA). No dependencies: Node 18+.
   Loads the scene library, the client scenes, the core model and the brands in a sandbox,
   exactly as the browser would, so the tools see the same data as the presentation. */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const CORE = path.join(ROOT, "core");
export const read = (p) => fs.readFileSync(p, "utf8");

export function clientIds() {
  return fs.readdirSync(path.join(ROOT, "clients"))
    .filter((d) => !d.startsWith("_") && fs.existsSync(path.join(ROOT, "clients", d, "client.json")));
}

function sandbox(cfg) {
  const sb = {
    console, URLSearchParams,
    location: { search: "" },
    sessionStorage: { getItem: () => null }, localStorage: { getItem: () => null },
    window: { CLIENT_CONFIG: cfg || {} }
  };
  sb.window.window = sb.window;
  vm.createContext(sb);
  return sb;
}

/** Backup scene files (window.SCENE_BACKUP), loaded like the build does: sorted by name. */
export function backupFiles() {
  const dir = path.join(CORE, "scenes", "backup");
  return fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".js")).sort().map((f) => `scenes/backup/${f}`) : [];
}

/** Everything a tool needs to know about one client.
    ids = client.json "scenes" (ordered, hidden included) · hidden = client.json "hidden"
    scenes = the scenes shown by default (ids minus hidden), overrides applied
    backup = backup scene objects (window.SCENE_BACKUP) · all = listed + backup scenes not listed, overrides applied */
export function loadClient(id) {
  const dir = path.join(ROOT, "clients", id);
  const cfg = JSON.parse(read(path.join(dir, "client.json")));
  cfg.id = id;
  const sb = sandbox(cfg);
  for (const f of fs.readdirSync(path.join(CORE, "model")).sort()) vm.runInContext(read(path.join(CORE, "model", f)), sb, { filename: f });
  for (const f of ["scenes/library.js", "scenes/library-trends.js"].concat(backupFiles())) if (fs.existsSync(path.join(CORE, f))) vm.runInContext(read(path.join(CORE, f)), sb, { filename: f });
  if (fs.existsSync(path.join(dir, "scenes.js"))) vm.runInContext(read(path.join(dir, "scenes.js")), sb, { filename: `${id}/scenes.js` });
  vm.runInContext(read(path.join(CORE, "shell/brands.js")), sb, { filename: "brands.js" });
  const w = sb.window;
  const library = w.SCENE_LIBRARY || [];
  const backup = w.SCENE_BACKUP || [];
  const clientScenes = w.CLIENT_SCENES || [];
  const pool = {};
  library.concat(backup, clientScenes).forEach((s) => { pool[s.id] = s; });
  const backupIds = new Set(backup.map((s) => s.id));
  const ids = cfg.scenes && cfg.scenes.length ? cfg.scenes : Object.keys(pool).filter((sid) => !backupIds.has(sid));
  const hidden = Array.isArray(cfg.hidden) ? cfg.hidden : [];
  const merged = (sid) => {
    const base = JSON.parse(JSON.stringify(pool[sid]));
    const ov = (cfg.overrides && cfg.overrides[sid]) || {};
    Object.keys(ov).forEach((k) => { base[k] = (k === "d" || k === "core") ? Object.assign({}, base[k] || {}, ov[k]) : ov[k]; });
    return base;
  };
  const listed = ids.filter((sid) => pool[sid]);
  const scenes = listed.filter((sid) => !hidden.includes(sid)).map(merged);
  const all = listed.concat([...backupIds].filter((sid) => !listed.includes(sid))).filter((sid, i, a) => a.indexOf(sid) === i).map(merged);
  return { id, dir, cfg, library, backup, clientScenes, pool, ids, hidden, scenes, all, content: w.CONTENT || {}, brands: w.BRANDS || {} };
}

/** Resolve an asset path the way the build does: client folder first, then core. */
export function assetFile(clientDir, rel) {
  for (const base of [clientDir, CORE]) { const f = path.join(base, rel); if (fs.existsSync(f)) return f; }
  return null;
}

/** Parse "--key=value" and "--flag" arguments. */
export function argv(defaults = {}) {
  const out = { _: [], ...defaults };
  for (const a of process.argv.slice(2)) {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    if (m) out[m[1]] = m[2] === undefined ? true : m[2];
    else out._.push(a);
  }
  return out;
}

/** Rewrite client.json "scenes" and "hidden", keeping every other key, the key order and the 2-space format.
    "hidden" goes right after "scenes" (it is dropped when empty and it was not there before). */
export function writeClientScenes(id, scenes, hidden) {
  const file = path.join(ROOT, "clients", id, "client.json");
  const cfg = JSON.parse(read(file));
  const out = {};
  const had = Object.prototype.hasOwnProperty.call(cfg, "hidden");
  for (const k of Object.keys(cfg)) {
    if (k === "hidden") continue;
    out[k] = k === "scenes" ? scenes : cfg[k];
    if (k === "scenes" && (hidden.length || had)) out.hidden = hidden;
  }
  if (!("scenes" in out)) { out.scenes = scenes; if (hidden.length || had) out.hidden = hidden; }
  fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");
  return file;
}
