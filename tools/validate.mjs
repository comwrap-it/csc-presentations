#!/usr/bin/env node
/* Static checks on the presentation sources — no browser, runs in a second.
   node tools/validate.mjs [client…]      (default: every client)
   Exit code 1 when an ERROR is found; WARN lines do not fail.

   Checks
   - client.json: every listed scene exists, no duplicates, overrides point at listed scenes,
     "hidden" ids are listed in "scenes" (no duplicates), at least one scene stays visible
   - scene ids unique across core library + backup scenes (core/scenes/backup) + client scenes;
     a backup scene also listed in "scenes" is allowed (restored) but reported as WARN
   - every check below runs on the listed scenes (hidden included) and on the backup scenes
   - every scene has id, a known type and a known section
   - bilingual pairs: k / h / p / n are [EN, IT] with both strings filled; [EN, IT] pairs inside d are complete
   - "Show in the core" spots point at real core nodes (core/model/content-*.js)
   - every assets/img|video|html path exists (client folder first, then core)
   - cases cards point at existing scenes
   - tools/policy.json (terminology, shared) + tools/policy.local.json (confidential names, git-ignored) */
import fs from "node:fs";
import path from "node:path";
import { ROOT, CORE, read, clientIds, loadClient, assetFile, argv } from "./lib.mjs";

const args = argv();
const ids = args._.length ? args._ : clientIds();
const loadPolicy = (f) => (fs.existsSync(path.join(ROOT, f)) ? JSON.parse(read(path.join(ROOT, f))) : {});
const shared = loadPolicy("tools/policy.json"), local = loadPolicy("tools/policy.local.json"); // local = confidential names, git-ignored
const policy = { terms: (shared.terms || []).concat(local.terms || []), clients: {} };
for (const src of [shared.clients || {}, local.clients || {}]) for (const [cid, v] of Object.entries(src)) (policy.clients[cid] = policy.clients[cid] || { terms: [] }).terms.push(...(v.terms || []));

const deck = read(path.join(CORE, "shell/deck.js"));
const renderBody = deck.slice(deck.indexOf("function render(s)"), deck.indexOf("function render(s)") + 20000);
const TYPES = new Set([...renderBody.matchAll(/case "([A-Za-z0-9]+)"/g)].map((m) => m[1])
  .concat([...read(path.join(CORE, "shell/scene-types.js")).matchAll(/SCENE_TYPES\.([A-Za-z0-9]+) = \{/g)].map((m) => m[1])));
const i18n = read(path.join(CORE, "shell/i18n.js"));
const DEFAULT_SECTIONS = JSON.parse((i18n.match(/window\.SECTIONS = (\[[^\]]*\])/) || [0, "[]"])[1]);

let errors = 0, warns = 0;
const E = (c, m) => { errors++; console.log(`ERROR [${c}] ${m}`); };
const W = (c, m) => { warns++; console.log(`WARN  [${c}] ${m}`); };

const isPair = (v) => Array.isArray(v) && v.length === 2 && v.every((x) => typeof x === "string");

/* Walk a value and yield [path, value] for every [EN, IT] string pair and every string. */
function* walk(v, p = "") {
  if (isPair(v)) { yield ["pair", p, v]; return; }
  if (typeof v === "string") { yield ["str", p, v]; return; }
  if (Array.isArray(v)) { for (let i = 0; i < v.length; i++) yield* walk(v[i], `${p}[${i}]`); return; }
  if (v && typeof v === "object") for (const k of Object.keys(v)) yield* walk(v[k], p ? `${p}.${k}` : k);
}

for (const id of ids) {
  let c;
  try { c = loadClient(id); } catch (e) { E(id, `cannot load: ${e.message}`); continue; }
  const sections = c.cfg.sections || DEFAULT_SECTIONS;

  // client.json
  const seen = new Set();
  for (const sid of c.ids) {
    if (!c.pool[sid]) E(id, `client.json lists unknown scene "${sid}"`);
    if (seen.has(sid)) E(id, `client.json lists "${sid}" twice`);
    seen.add(sid);
  }
  const backupIds = new Set(c.backup.map((s) => s.id));
  for (const sid of Object.keys(c.cfg.overrides || {})) if (!seen.has(sid) && !backupIds.has(sid)) W(id, `override for "${sid}", which is not in the scene list`);

  // hidden: optional list of ids of "scenes" not shown by default
  if (c.cfg.hidden !== undefined && !Array.isArray(c.cfg.hidden)) E(id, `client.json "hidden" must be an array of scene ids`);
  const hseen = new Set();
  for (const sid of c.hidden) {
    if (!seen.has(sid)) E(id, `client.json "hidden" lists "${sid}", which is not in "scenes"`);
    if (hseen.has(sid)) E(id, `client.json "hidden" lists "${sid}" twice`);
    hseen.add(sid);
  }
  if (c.ids.length && !c.scenes.length) E(id, `every scene is hidden: at least one must stay visible`);

  // unique ids across library + backup + client scenes
  const count = {};
  c.library.concat(c.backup, c.clientScenes).forEach((s) => { count[s.id] = (count[s.id] || 0) + 1; });
  Object.entries(count).filter(([, n]) => n > 1).forEach(([sid]) => E(id, `scene id "${sid}" is defined more than once (the last one silently wins)`));
  for (const sid of backupIds) if (seen.has(sid)) W(id, `backup scene "${sid}" is listed in client.json "scenes" (restored: it is shown like a normal scene)`);

  const termRules = (policy.terms || []).concat(((policy.clients || {})[id] || {}).terms || []);

  for (const s of c.all) {
    const at = `${id}/${s.id}${backupIds.has(s.id) && !seen.has(s.id) ? " (backup)" : hseen.has(s.id) ? " (hidden)" : ""}`;
    if (!TYPES.has(s.type)) E(at, `unknown type "${s.type}"`);
    if (!sections.includes(s.sec)) E(at, `unknown section "${s.sec}" (known: ${sections.join(", ")})`);
    for (const k of ["k", "h"]) if (!isPair(s[k]) || !s[k][0] || !s[k][1]) E(at, `"${k}" must be [EN, IT] with both filled`);
    for (const k of ["p", "n"]) if (s[k] !== undefined && (!isPair(s[k]) || !s[k][0] || !s[k][1])) E(at, `"${k}" must be [EN, IT] with both filled`);
    if (!s.n) W(at, "no speaker notes (n)");

    for (const sp of (s.core && s.core.spots) || []) {
      if (!c.content[sp.id]) E(at, `core spot "${sp.id}" does not exist (see: node tools/catalog.mjs --spots)`);
      if (!isPair(sp.l)) E(at, `core spot "${sp.id}" needs a label l: [EN, IT]`);
    }

    for (const [kind, p, v] of walk({ k: s.k, h: s.h, p: s.p, d: s.d, n: s.n })) {
      if (kind === "pair") {
        if (!v[0].trim() !== !v[1].trim()) E(at, `${p}: one language is empty → ${JSON.stringify(v).slice(0, 120)}`);
        else if (v[0] === v[1] && v[0].length > 40 && /\b(the|and|with|for)\b/i.test(v[0])) W(at, `${p}: IT is identical to EN (untranslated?) → "${v[0].slice(0, 60)}…"`);
      }
      const texts = kind === "pair" ? v : [v];
      for (const t of texts) {
        for (const m of t.matchAll(/assets\/(?:img|video|html)\/[A-Za-z0-9._-]+/g)) if (!assetFile(c.dir, m[0])) E(at, `missing asset ${m[0]}`);
        for (const r of termRules) {
          const re = new RegExp(r.pattern, r.flags || "g");
          if (re.test(t)) (r.level === "warn" ? W : E)(at, `${r.message} → "${t.slice(0, 90)}"`);
        }
      }
    }

    if (s.type === "cases") for (const card of (s.d && s.d.cards) || []) {
      if (!c.pool[card.go]) E(at, `cases card points at unknown scene "${card.go}"`);
      else if (!seen.has(card.go)) W(at, `cases card "${card.go}" is hidden: that scene is not in client.json`);
      else if (hseen.has(card.go)) W(at, `cases card "${card.go}" is hidden by default: that scene is in client.json "hidden"`);
    }
  }
  console.log(`${id}: ${c.all.length} scenes checked (${c.scenes.length} shown, ${c.hidden.length} hidden, ${c.all.length - c.ids.filter((x) => c.pool[x]).length} backup)`);
}
console.log(`\n${errors} error(s), ${warns} warning(s).`);
process.exit(errors ? 1 : 0);
