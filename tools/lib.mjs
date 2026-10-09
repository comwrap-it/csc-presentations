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

/** Everything a tool needs to know about one client. */
export function loadClient(id) {
  const dir = path.join(ROOT, "clients", id);
  const cfg = JSON.parse(read(path.join(dir, "client.json")));
  cfg.id = id;
  const sb = sandbox(cfg);
  for (const f of fs.readdirSync(path.join(CORE, "model")).sort()) vm.runInContext(read(path.join(CORE, "model", f)), sb, { filename: f });
  for (const f of ["scenes/library.js", "scenes/library-trends.js"]) if (fs.existsSync(path.join(CORE, f))) vm.runInContext(read(path.join(CORE, f)), sb, { filename: f });
  if (fs.existsSync(path.join(dir, "scenes.js"))) vm.runInContext(read(path.join(dir, "scenes.js")), sb, { filename: `${id}/scenes.js` });
  vm.runInContext(read(path.join(CORE, "shell/brands.js")), sb, { filename: "brands.js" });
  const w = sb.window;
  const library = w.SCENE_LIBRARY || [];
  const clientScenes = w.CLIENT_SCENES || [];
  const pool = {};
  library.concat(clientScenes).forEach((s) => { pool[s.id] = s; });
  const ids = cfg.scenes && cfg.scenes.length ? cfg.scenes : Object.keys(pool);
  const scenes = ids.filter((sid) => pool[sid]).map((sid) => {
    const base = JSON.parse(JSON.stringify(pool[sid]));
    const ov = (cfg.overrides && cfg.overrides[sid]) || {};
    Object.keys(ov).forEach((k) => { base[k] = (k === "d" || k === "core") ? Object.assign({}, base[k] || {}, ov[k]) : ov[k]; });
    return base;
  });
  return { id, dir, cfg, library, clientScenes, pool, ids, scenes, content: w.CONTENT || {}, brands: w.BRANDS || {} };
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
