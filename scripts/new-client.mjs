#!/usr/bin/env node
/* Create a new client from clients/_template.
   node scripts/new-client.mjs acme "ACME S.p.A."  */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const [id, ...nameParts] = process.argv.slice(2);
const name = nameParts.join(" ").trim();
if (!id || !/^[a-z0-9][a-z0-9-]*$/.test(id) || !name) {
  console.error('Usage: node scripts/new-client.mjs <id: lowercase, digits, dashes> "<Client name>"');
  process.exit(2);
}
const src = path.join(ROOT, "clients", "_template");
const dst = path.join(ROOT, "clients", id);
if (fs.existsSync(dst)) { console.error(`clients/${id} already exists.`); process.exit(1); }
fs.cpSync(src, dst, { recursive: true });
const file = path.join(dst, "client.json");
const cfg = JSON.parse(fs.readFileSync(file, "utf8"));
delete cfg._help;
if (cfg.theme) delete cfg.theme._help;
cfg.id = id;
cfg.name = name;
cfg.publish = true;
fs.writeFileSync(file, JSON.stringify(cfg, null, 2) + "\n");
const key = id.toUpperCase().replace(/[^A-Z0-9]/g, "_");
console.log(`✓ clients/${id} created for "${name}".
Next:
  1. Edit clients/${id}/client.json (scenes, overrides, theme) and, if needed, clients/${id}/scenes.js
  2. Preview:  node scripts/build.mjs ${id} --dev   → open dist-dev/${id}/index.html
  3. GitHub → Settings → Secrets and variables → Actions → New secret  PASSWORD_${key}
  4. Commit and push: the link will be  https://<pages-url>/${id}/`);
