#!/usr/bin/env node
/* What is in the presentation, read from the sources (never stale).
   node tools/catalog.mjs [client]                  scenes in order: # · id · type · section · title
   node tools/catalog.mjs --types                   every scene type with the scenes that use it
   node tools/catalog.mjs --type=case               full source of a real scene of that type (copy its shape)
   node tools/catalog.mjs --scene=costa [client]    one scene as the client sees it (overrides applied)
   node tools/catalog.mjs --spots [--phase=make]    valid ids for core.spots ("Show in the core")
   Default client: the first one in clients/. Add --lang=en for English titles. */
import { clientIds, loadClient, argv } from "./lib.mjs";

const a = argv({ lang: "it" });
const id = a._[0] || clientIds()[0];
const c = loadClient(id);
const L = a.lang === "en" ? 0 : 1;
const t = (v) => (Array.isArray(v) ? v[L] : v) || "";

if (a.types) {
  const by = {};
  c.library.concat(c.clientScenes).forEach((s) => { (by[s.type] = by[s.type] || []).push(s.id + (c.ids.includes(s.id) ? "" : "°")); });
  Object.keys(by).sort().forEach((k) => console.log(k.padEnd(14), by[k].join(", ")));
  console.log("\n° = defined but not used by", id);
} else if (a.type) {
  const s = c.library.concat(c.clientScenes).find((x) => x.type === a.type);
  if (!s) { console.error(`No scene of type "${a.type}". Run --types.`); process.exit(1); }
  console.log(`// example of type "${a.type}": scene "${s.id}"`);
  console.log(JSON.stringify(s, null, 2));
} else if (a.scene) {
  const s = c.scenes.find((x) => x.id === a.scene) || c.pool[a.scene];
  if (!s) { console.error(`Unknown scene "${a.scene}"`); process.exit(1); }
  console.log(JSON.stringify(s, null, 2));
} else if (a.spots) {
  Object.keys(c.content).filter((k) => !a.phase || k.startsWith(a.phase + "::") || k === a.phase)
    .forEach((k) => console.log(k.padEnd(36), t(c.content[k].l).slice(0, 90)));
} else {
  let sec = "";
  c.scenes.forEach((s, i) => {
    if (s.sec !== sec) { sec = s.sec; console.log(`\n[${sec}]`); }
    console.log(`${String(i + 1).padStart(3)}  ${s.id.padEnd(18)} ${String(s.type).padEnd(13)} ${t(s.h).slice(0, 80)}`);
  });
  console.log(`\n${c.scenes.length} scenes · client ${id}`);
}
