#!/usr/bin/env node
/* Local "Regia" dashboard: choose which slides a client presentation shows and save it into client.json.
   npm run dashboard -- lavazza          (default: the first client in clients/)
   node tools/dashboard.mjs lavazza --port=4321
   - builds the unencrypted dev preview (dist-dev/<id>/index.html) and serves it on http://127.0.0.1:<port>/?regia
     (bound to 127.0.0.1 only: never expose it, the preview is NOT encrypted);
   - injects window.CSC_DASHBOARD = true, so the Regia shows "Salva nel progetto";
   - POST /api/regia { scenes: [...], hidden: [...] } validates the ids (known scenes, no duplicates, hidden ⊂ scenes,
     at least one visible), rewrites clients/<id>/client.json "scenes" and "hidden" (other keys and the 2-space format
     are kept) and rebuilds the preview. Answer: { ok: true, scenes, hidden } or { ok: false, error }.
   No dependencies (node:http). Stop it with Ctrl+C. */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { ROOT, clientIds, loadClient, writeClientScenes, argv } from "./lib.mjs";

const a = argv({ port: "4321" });
const id = a._[0] || clientIds()[0];
const port = +a.port || 4321;
const HOST = "127.0.0.1";
if (!id || !fs.existsSync(path.join(ROOT, "clients", id, "client.json"))) { console.error(`Unknown client "${id}". Known: ${clientIds().join(", ")}`); process.exit(2); }

const FLAG = "<script>window.CSC_DASHBOARD = true;</script>";
let page = "";
function build() {
  execFileSync(process.execPath, [path.join(ROOT, "scripts/build.mjs"), id, "--dev"], { stdio: "ignore" });
  const html = fs.readFileSync(path.join(ROOT, "dist-dev", id, "index.html"), "utf8");
  const at = html.indexOf("</head>");
  page = at < 0 ? FLAG + html : html.slice(0, at) + FLAG + "\n" + html.slice(at);
}

function validate(body) {
  const c = loadClient(id);
  const { scenes, hidden } = body || {};
  const strs = (v) => Array.isArray(v) && v.every((x) => typeof x === "string" && x);
  if (!strs(scenes) || !scenes.length) return "scenes must be a non-empty array of scene ids";
  if (hidden !== undefined && !(Array.isArray(hidden) && (hidden.length === 0 || strs(hidden)))) return "hidden must be an array of scene ids";
  const h = hidden || [];
  const unknown = scenes.concat(h).filter((x) => !c.pool[x]);
  if (unknown.length) return `unknown scene ids: ${[...new Set(unknown)].join(", ")}`;
  const dup = (l) => l.filter((x, i) => l.indexOf(x) !== i);
  if (dup(scenes).length) return `duplicate ids in scenes: ${[...new Set(dup(scenes))].join(", ")}`;
  if (dup(h).length) return `duplicate ids in hidden: ${[...new Set(dup(h))].join(", ")}`;
  const out = h.filter((x) => !scenes.includes(x));
  if (out.length) return `hidden ids not in scenes: ${out.join(", ")}`;
  if (scenes.every((x) => h.includes(x))) return "at least one scene must stay visible";
  return null;
}

const send = (res, code, type, body) => { res.writeHead(code, { "Content-Type": type, "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" }); res.end(body); };
const json = (res, code, obj) => send(res, code, "application/json; charset=utf-8", JSON.stringify(obj));
const okHost = (req) => {
  // Same-origin only: defeats DNS rebinding (Host) and cross-site posts (Origin)
  const hosts = [`${HOST}:${port}`, `localhost:${port}`];
  if (!hosts.includes(req.headers.host || "")) return false;
  const o = req.headers.origin;
  return !o || hosts.some((h) => o === `http://${h}`);
};

build();
const server = http.createServer((req, res) => {
  if (!okHost(req)) return send(res, 403, "text/plain", "Forbidden");
  const url = new URL(req.url, `http://${HOST}:${port}`);
  if (req.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html")) return send(res, 200, "text/html; charset=utf-8", page);
  if (url.pathname === "/api/regia") {
    if (req.method !== "POST") return json(res, 405, { ok: false, error: "use POST" });
    if (!/^application\/json/.test(req.headers["content-type"] || "")) return json(res, 415, { ok: false, error: "Content-Type must be application/json" });
    let raw = "";
    req.on("data", (ch) => { raw += ch; if (raw.length > 1e6) req.destroy(); });
    req.on("end", () => {
      let body;
      try { body = JSON.parse(raw); } catch (e) { return json(res, 400, { ok: false, error: "invalid JSON" }); }
      const err = validate(body);
      if (err) return json(res, 400, { ok: false, error: err });
      const hidden = body.hidden || [];
      try {
        const file = writeClientScenes(id, body.scenes, hidden);
        build();
        console.log(`✓ saved ${path.relative(ROOT, file)}: ${body.scenes.length} scenes, ${hidden.length} hidden · preview rebuilt`);
        json(res, 200, { ok: true, scenes: body.scenes, hidden });
      } catch (e) {
        console.error(e);
        json(res, 500, { ok: false, error: String(e.message || e) });
      }
    });
    return;
  }
  send(res, 404, "text/plain", "Not found");
});
server.on("error", (e) => { console.error(e.code === "EADDRINUSE" ? `Port ${port} is busy: use --port=<n>` : e.message); process.exit(1); });
server.listen(port, HOST, () => {
  console.log(`Regia · ${id}  →  http://${HOST}:${port}/?regia`);
  console.log(`Saving writes clients/${id}/client.json ("scenes", "hidden"). Local only, NOT encrypted. Ctrl+C to stop.`);
});
