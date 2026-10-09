/* AI-Powered Experience Supply Chain — interactive presentation shell.
   The constellation (the core) is always running behind the scenes; C opens it at any moment. */

const PARAMS = new URLSearchParams(location.search);
const $ = (id) => document.getElementById(id);
const UI = { i: 0, core: false, notes: false, timers: [], intervals: [], presenter: null, t0: Date.now(), target: {} };
const CFG = window.CLIENT_CONFIG || { id: "demo", name: "" };
const STORE_KEY = `csc-${CFG.id}-maturity`;

/* ---------- Client layer ---------- */
function fmt(v) {
  if (typeof v === "string") return v.replace(/\{client\}/g, CFG.name || "").replace(/\{CLIENT\}/g, (CFG.name || "").toUpperCase()).replace(/\{brand\}/g, (window.BRANDS && BRANDS[window.BRAND] || { label: "Reply" }).label);
  if (Array.isArray(v)) return v.map(fmt);
  if (v && typeof v === "object") { const o = {}; Object.keys(v).forEach((k) => { o[k] = fmt(v[k]); }); return o; }
  return v;
}
function buildClient() {
  // UI strings
  ["en", "it"].forEach((l) => { Object.assign(UI_TEXT[l], (CFG.ui && CFG.ui[l]) || {}); UI_TEXT[l] = fmt(UI_TEXT[l]); });
  if (CFG.sections) window.SECTIONS = CFG.sections;
  buildScenes();
  setThemeVars();
  if (CFG.title) document.title = fmt(CFG.title);
}
/* Scene pool: core libraries + backup scenes (core/scenes/backup/) + client scenes; the last definition of an id wins. */
function scenePool() {
  const pool = {};
  (window.SCENE_LIBRARY || []).concat(window.SCENE_BACKUP || [], window.CLIENT_SCENES || []).forEach((s) => { pool[s.id] = s; });
  return pool;
}
/* A scene object from the sources (library, backup or client), without overrides — e.g. the close scene reads "framework". */
function sceneSrc(id) { return scenePool()[id] || null; }
/* One scene as the client sees it: client.json overrides applied, tokens replaced. */
function sceneFor(id, pool) {
  const base = JSON.parse(JSON.stringify(pool[id]));
  const ov = (CFG.overrides && CFG.overrides[id]) || {};
  Object.keys(ov).forEach((k) => {
    if (k === "d" || k === "core") base[k] = Object.assign({}, base[k] || {}, ov[k]);
    else base[k] = ov[k];
  });
  return fmt(base);
}
function buildScenes() {
  // Scenes: pool picked and ordered by client.json "scenes", minus "hidden", plus backup scenes switched on in the Regia
  const pool = scenePool();
  if (!UI.regia) { UI.regia = regiaLoad() || regiaDefaults(); (CFG.scenes || []).forEach((id) => { if (!pool[id]) console.warn("Unknown scene:", id); }); }
  const vis = regiaVisible(UI.regia, pool);
  window.SCENES = vis.map((id) => sceneFor(id, pool));
}

/* ---------- Regia: which scenes are shown, in which order (client.json defaults + local choices of this browser) ----------
   client.json: "scenes" = the ordered list, "hidden" = ids of that list not shown by default.
   Backup scenes (window.SCENE_BACKUP, core/scenes/backup/*.js) not listed in "scenes" are off unless switched on here;
   a backup scene switched on goes at the end of its section (or at the end of the deck if the section is absent).
   Order: the Regia reorders slides inside their section block and whole section blocks (a block = consecutive
   scenes with the same "sec", as in the navigation); a slide never changes section, because "sec" is content.
   Local state in localStorage "csc-regia-<clientId>" = { hidden: [...], backupOn: [...], order?: [...] }
   (order = full order, hidden and enabled backups included; absent = client.json order; old objects without it still work). */
const REGIA_KEY = `csc-regia-${CFG.id}`;
function regiaDefaults() { return { hidden: (CFG.hidden || []).slice(), backupOn: [], order: null }; }
function regiaLoad() {
  try {
    const v = JSON.parse(localStorage.getItem(REGIA_KEY) || "null");
    if (v && Array.isArray(v.hidden) && Array.isArray(v.backupOn)) return { hidden: v.hidden.slice(), backupOn: v.backupOn.slice(), order: Array.isArray(v.order) ? v.order.slice() : null };
  } catch (e) {}
  return null;
}
function regiaCopy(st) { return { hidden: st.hidden.slice(), backupOn: st.backupOn.slice(), order: st.order ? st.order.slice() : null }; }
function regiaNorm(st, pool) {
  pool = pool || scenePool();
  const order = regiaOrder(st, pool);
  return { hidden: st.hidden.filter((id) => order.indexOf(id) >= 0).sort(), backupOn: st.backupOn.filter((id) => order.indexOf(id) >= 0).sort(), order };
}
function regiaSame(a, b) { return JSON.stringify(regiaNorm(a)) === JSON.stringify(regiaNorm(b)); }
function regiaStore(st) {
  try {
    if (regiaSame(st, regiaDefaults())) { localStorage.removeItem(REGIA_KEY); return; }
    const pool = scenePool(), n = regiaNorm(st, pool);
    const out = { hidden: n.hidden, backupOn: n.backupOn };
    if (JSON.stringify(n.order) !== JSON.stringify(regiaBase(st, pool))) out.order = n.order;
    localStorage.setItem(REGIA_KEY, JSON.stringify(out));
  } catch (e) {}
}
function backupIds() {
  const listed = CFG.scenes || [];
  return (window.SCENE_BACKUP || []).map((s) => s.id).filter((id, i, a) => a.indexOf(id) === i && listed.indexOf(id) < 0);
}
function secOf(id, pool) { const ov = CFG.overrides && CFG.overrides[id]; return (ov && ov.sec) || (pool[id] && pool[id].sec); }
/* client.json order (hidden included) with the backup scenes switched on inserted at the end of their section. */
function regiaBase(st, pool) {
  const bk = (window.SCENE_BACKUP || []).map((s) => s.id);
  const listed = CFG.scenes && CFG.scenes.length ? CFG.scenes : Object.keys(pool).filter((id) => bk.indexOf(id) < 0);
  const order = listed.filter((id, i) => !!pool[id] && listed.indexOf(id) === i);
  backupIds().forEach((id) => {
    if (st.backupOn.indexOf(id) < 0 || !pool[id]) return;
    const sec = secOf(id, pool); let at = -1;
    order.forEach((x, i) => { if (secOf(x, pool) === sec) at = i; });
    order.splice(at < 0 ? order.length : at + 1, 0, id);
  });
  return order;
}
/* Full ordered list: the Regia order when there is one (unknown/disabled ids dropped; scenes it does not know —
   e.g. added to client.json later, or a backup just switched on — go right after their predecessor in the base order). */
function regiaOrder(st, pool) {
  const base = regiaBase(st, pool);
  if (!st.order || !st.order.length) return base;
  const out = [];
  st.order.forEach((id) => { if (base.indexOf(id) >= 0 && out.indexOf(id) < 0) out.push(id); });
  base.forEach((id, i) => {
    if (out.indexOf(id) >= 0) return;
    let at = -1; for (let j = i - 1; j >= 0 && at < 0; j--) at = out.indexOf(base[j]);
    out.splice(at + 1, 0, id);
  });
  return out;
}
function regiaVisible(st, pool) {
  const order = regiaOrder(st, pool);
  const vis = order.filter((id) => st.hidden.indexOf(id) < 0);
  return vis.length ? vis : order;
}
/* What to write in client.json: { scenes, hidden } */
function regiaExport(st) {
  const pool = scenePool(), order = regiaOrder(st, pool);
  return { scenes: order, hidden: order.filter((id) => st.hidden.indexOf(id) >= 0) };
}

/* ---------- Brand (Reply / Comwrap Reply) ---------- */
function rgbOf(hex) { const n = parseInt(String(hex).replace("#", ""), 16); return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`; }
function setThemeVars() {
  const r = document.documentElement.style;
  const set = (k, v) => { if (v) r.setProperty(k, v); };
  set("--green", THEME.accent); set("--accent-rgb", rgbOf(THEME.accent)); set("--core", THEME.accent);
  ["intel", "make", "act", "learn"].forEach((k) => set("--" + k, THEME[k]));
  if (THEME.bg) { set("--bg", THEME.bg); set("--bg-rgb", rgbOf(THEME.bg)); }
  if (THEME.bg2) { set("--bg-2", THEME.bg2); set("--bg2-rgb", rgbOf(THEME.bg2)); }
  if (THEME.panel) { set("--panel", THEME.panel); set("--panel-rgb", rgbOf(THEME.panel)); }
  set("--panel-2", THEME.panel2); set("--ink", THEME.ink); set("--ink-2", THEME.ink2); set("--muted", THEME.muted); set("--on-accent", THEME.onAccent);
  document.body.dataset.brand = window.BRAND || "reply";
  const logo = $("brandLogo"); if (logo && window.brandLogo) logo.innerHTML = brandLogo(window.BRAND);
  const bb = $("brandBtn"); if (bb) bb.hidden = !window.brandList || brandList().length < 2;
  const meta = document.querySelector('meta[name="theme-color"]'); if (meta) meta.content = THEME.bg || "#000";
}
function applyBrand(id, opts) {
  if (!window.BRANDS || !BRANDS[id] || (window.brandList && brandList().indexOf(id) < 0)) return;
  window.BRAND = id;
  Object.assign(THEME, BRANDS[id], CFG.theme || {});
  PHASES.forEach((p) => { if (THEME[p.id]) p.color = THEME[p.id]; });
  setThemeVars();
  buildScenes();
  if (CFG.title) document.title = fmt(CFG.title);
  try { sessionStorage.setItem("csc-brand-" + CFG.id, id); if (localStorage.getItem("csc-brand-" + CFG.id)) localStorage.setItem("csc-brand-" + CFG.id, id); } catch (e) {}
  try { const u = new URL(location.href); u.searchParams.set("brand", id); history.replaceState(null, "", u.pathname + u.search + u.hash); } catch (e) {}
  if (opts && opts.silent) return;
  resize();
  const keepCore = UI.core, keepPanel = STATE.panel;
  go(UI.i);
  if (keepCore) { setCore(true); if (keepPanel) openPanel(keepPanel); }
}
function nextBrand() { const l = brandList(); applyBrand(l[(l.indexOf(window.BRAND) + 1) % l.length]); }

/* ---------- i18n ---------- */
function L() { return STATE.lang === "it" ? 1 : 0; }
function T(key) {
  const d = UI_TEXT[STATE.lang] || UI_TEXT.en;
  const v = d[key] != null ? d[key] : (UI_TEXT.en[key] != null ? UI_TEXT.en[key] : key);
  return key === "header.kicker" && window.BRAND === "comwrap" ? String(v).replace(/^REPLY/, "COMWRAP REPLY") : v;
}
function tr(a) { return Array.isArray(a) ? (a[L()] != null ? a[L()] : a[0]) : (a == null ? "" : a); }
function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
function setHint(key) { hintEl.dataset.key = key; hintEl.textContent = T(key); }

/* ---------- Timers ---------- */
function later(fn, ms) { UI.timers.push(setTimeout(fn, ms)); }
function every(fn, ms) { UI.intervals.push(setInterval(fn, ms)); }
function clearTimers() { UI.timers.forEach(clearTimeout); UI.intervals.forEach(clearInterval); UI.timers = []; UI.intervals = []; }

/* ---------- Content merge (core cards) ---------- */
function mergeContent() {
  Object.entries(window.CONTENT || {}).forEach(([id, x]) => {
    const c = CARDS[id];
    if (!c) return;
    if (x.l) c.lede = x.l[0];
    if (x.b) c.body = x.b[0];
    if (x.n) c.notes = x.n;
    if (x.sys) c.systems = x.sys;
    c.x = x;
  });
}
function phaseOf(id) { const p = String(id || "").split("::")[0]; return PHASES.some((ph) => ph.id === p) ? p : null; }
function phaseById(id) { return PHASES.find((p) => p.id === id); }
function cardField(c, f) {
  const x = c.x || {}; const it = STATE.lang === "it";
  switch (f) {
    case "lede": return it && x.l ? x.l[1] : c.lede;
    case "body": return it && x.b ? x.b[1] : c.body;
    case "replaces": return it && x.it ? x.it.r : c.replaces;
    case "human": return it && x.it ? x.it.h : c.human;
    case "notes": return it && x.it ? x.it.n : c.notes;
    case "ladder": return it && x.it ? { human: x.it.lad[0], assist: x.it.lad[1], auto: x.it.lad[2] } : c.ladder;
    case "kicker": if (x.k) return tr(x.k); return it ? String(c.kicker).replace(" · function", " · funzione").replace(" · agent", " · agente") : c.kicker;
    default: return c[f];
  }
}
function cardLabel(c, key, fb) {
  const x = c.x || {};
  if (STATE.lang === "it" && x.lab && x.lab[key]) return x.lab[key];
  if (STATE.lang !== "it" && c.labels && c.labels[key]) return c.labels[key];
  return T(fb);
}

/* ---------- Side sheet ---------- */
function pills(a) { return `<div class="pills">${a.map((s) => `<span>${esc(s)}</span>`).join("")}</div>`; }
function renderSheet() {
  const id = STATE.panel; if (!id) return;
  const c = CARDS[id]; if (!c) return;
  const x = c.x || {};
  const isJob = id.includes("::job::"), isFn = id.includes("::fn::");
  const cls = isJob ? jobClass(id) : null;
  let h = `<p class="kick">${esc(cardField(c, "kicker"))}</p><h2>${esc(c.title)}</h2><div class="badges">`;
  h += isJob ? `<span class="bdg">${esc(T("mode." + cls))}</span>` : (c.badge ? `<span class="bdg">${esc(T("badge." + c.badge))}</span>` : "");
  h += `</div><p class="lede">${esc(cardField(c, "lede"))}</p><p class="body">${esc(cardField(c, "body"))}</p>`;
  if (isJob && x.a) {
    h += `<h3>${esc(T("sheet.agent"))}</h3><div class="aia">`;
    h += `<div><span>${esc(T("sheet.trigger"))}</span>${esc(tr(x.tr))}</div>`;
    h += `<div class="ag"><span>${esc(T("sheet.does"))}</span><b>${esc(tr(x.a))}</b> — ${esc(tr(x.do))}<em>${esc(T("sheet.poweredBy"))}: ${esc(x.ad)}</em></div>`;
    h += `<div><span>${esc(T("sheet.output"))}</span>${esc(tr(x.out))}</div>`;
    h += `<div><span>${esc(T("sheet.gate"))}</span>${esc(tr(x.gate))}</div></div>`;
  }
  if (isFn) {
    const ph = phaseById(phaseOf(id));
    const fn = ph && ph.functions.find((f) => `${ph.id}::fn::${slug(f.name)}` === id);
    if (fn) {
      h += `<h3>${esc(T("sheet.jobs"))}</h3><div class="jobs">`;
      fn.jobs.forEach((j) => {
        const jid = `${ph.id}::job::${slug(j.t)}`; const jc = CARDS[jid];
        h += `<button type="button" data-open="${jid}"><b>${esc(jc ? jc.title : j.t)}</b><small>${esc(T("mode." + jobClass(jid)))} · ${esc(jc ? cardField(jc, "lede") : "")}</small></button>`;
      });
      h += `</div>`;
    }
  }
  if (c.lives && c.lives.length) h += `<h3>${esc(cardLabel(c, "lives", "sheet.reads"))}</h3>${pills(c.lives)}`;
  if (c.systems && c.systems.length) h += `<h3>${esc(cardLabel(c, "systems", "sheet.systems"))}</h3>${pills(c.systems)}`;
  if (c.skills && c.skills.length) h += `<h3>${esc(cardLabel(c, "skills", "sheet.skills"))}</h3>${pills(c.skills)}`;
  if (c.writes && c.writes.length) h += `<h3>${esc(cardLabel(c, "writes", "sheet.writes"))}</h3>${pills(c.writes)}`;
  h += `<h3>${esc(T("sheet.replaces"))}</h3><div class="box">${esc(cardField(c, "replaces"))}</div>`;
  const lad = cardField(c, "ladder");
  h += `<h3>${esc(T("sheet.ladder"))}</h3>`;
  [["human", "lad.human"], ["assist", "lad.assist"], ["auto", "lad.auto"]].forEach(([k, lk]) => { h += `<div class="lrow"><b>${esc(T(lk))}</b><span>${esc(lad[k])}</span></div>`; });
  h += `<h3>${esc(cardLabel(c, "human", "sheet.human"))}</h3><p class="body">${esc(cardField(c, "human"))}</p>`;
  h += `<h3>${esc(cardLabel(c, "notes", "sheet.notes"))}</h3><p class="body">${esc(cardField(c, "notes"))}</p>`;
  $("sheetContent").innerHTML = h;
  $("sheetContent").querySelectorAll("[data-open]").forEach((b) => b.addEventListener("click", () => openPanel(b.dataset.open)));
}
function openPanel(id) {
  if (!CARDS[id]) return;
  if (!UI.core && SCENES[UI.i].layout !== "core") setCore(true);
  STATE.panel = id;
  document.body.classList.add("sheet-open");
  sheetEl.classList.add("open");
  renderSheet();
  sheetEl.scrollTop = 0;
}
function closePanel() {
  STATE.panel = null;
  document.body.classList.remove("sheet-open");
  sheetEl.classList.remove("open");
}

/* ---------- Core control ---------- */
const LAYOUTS = {
  cover: { shiftX: 0.24, r: 0.19, cy: 0.5, lift: 0.6, header: 0, scale: 0.8, labels: 0 },
  full: { shiftX: 0, r: 0.22, cy: 0.5, lift: 1, header: 0, scale: 1, labels: 0 },
  split: { shiftX: 0.235, r: 0.155, cy: 0.52, lift: 0.5, header: 0, scale: 0.74, labels: 1 },
  core: { shiftX: 0, r: 0.22, cy: 0.5, lift: 1, header: 1, scale: 1, labels: 1 }
};
function currentLayout() { return UI.core ? "core" : SCENES[UI.i].layout; }
function frameTick(dt) {
  const lay = LAYOUTS[currentLayout()] || LAYOUTS.full;
  const m = Math.min(STATE.w, STATE.h);
  const k = STATE.reduceMotion ? 1 : Math.min(1, dt * 3.4);
  STATE.shiftX += (lay.shiftX - STATE.shiftX) * k;
  STATE.radius += (m * lay.r - STATE.radius) * k;
  STATE.cy += (STATE.h * lay.cy - STATE.cy) * k;
  STATE.labelLift += (lay.lift - STATE.labelLift) * k;
  STATE.headerA += ((STATE.w < 760 ? 0 : lay.header) - STATE.headerA) * k;
  STATE.labelScale += (lay.scale - STATE.labelScale) * k;
  const lbl = currentLayout() === "split" && STATE.w < 1280 ? 0 : lay.labels;
  STATE.labelsA += (lbl - STATE.labelsA) * k;
}
function setCore(on) {
  if (UI.core === on) return;
  UI.core = on;
  document.body.classList.toggle("core-mode", on);
  if (!on) { closePanel(); if (STATE.focus) leavePhase(); applyCoreState(SCENES[UI.i]); UI.coreSpots = null; UI.coreSpotHi = null; }
  else { STATE.storyFocus = null; setHint("hint.wheel"); UI.coreSpots = caseSpots(SCENES[UI.i]); UI.coreSpotHi = null; }
  renderCasePanel();
  $("coreCtx").innerHTML = `<b>${esc(T("core"))}</b>${esc(tr(SCENES[UI.i].h))}`;
  syncReturn();
  syncTop();
}
function showInCore(target) {
  setCore(true);
  if (!target) return;
  if (phaseById(target)) { if (STATE.focus !== target) enterPhase(target); }
  else if (CARDS[target]) openPanel(target);
}
function spotsOf(scene) {
  return ((scene.core && scene.core.spots) || []).map((s) => ({ id: s.id, label: tr(s.l) }));
}
/* Every point of the core a scene touches (a use case shows all of them in the core) */
function caseSpots(scene) {
  let list = spotsOf(scene);
  if (!list.length && scene.type === "xchange" && scene.d && scene.d.steps) list = scene.d.steps.map((st) => ({ id: st.spot, label: tr(st.t) }));
  const seen = {};
  return list.filter((x) => x.id && !seen[x.id] && (seen[x.id] = 1));
}
function isCase(scene) { return scene.sec === "proof" && scene.type !== "cases"; }
function renderCasePanel() {
  const box = $("casePanel"); if (!box) return;
  const sp = UI.core ? UI.coreSpots : null;
  if (!sp || !sp.length) { box.classList.remove("show"); box.innerHTML = ""; return; }
  const sc = SCENES[UI.i];
  const ph = (id) => phaseById(phaseOf(id));
  box.innerHTML = `<h5>${esc(T(isCase(sc) ? "case.touches" : "scene.touches"))}</h5><b class="cp-t">${esc((() => { const g = tr(sc.k).split("·").map((x) => x.trim()); return g[1] || g[0]; })())}</b><div class="cp-list">${sp.map((x, i) => {
    const c = CARDS[x.id]; const p = ph(x.id);
    return `<button type="button" data-cp="${i}" style="--c:${p ? p.color : THEME.accent}"><i></i><span><b>${esc(x.label)}</b>${c ? `<small>${esc(c.title)}${p ? ` · ${esc(p.name.toLowerCase())}` : ""}</small>` : ""}</span></button>`;
  }).join("")}</div><p>${esc(T("case.hint"))}</p>`;
  box.classList.add("show");
  box.querySelectorAll("[data-cp]").forEach((b) => {
    const i = +b.dataset.cp, id = sp[i].id;
    b.addEventListener("mouseenter", () => { UI.coreSpotHi = i; });
    b.addEventListener("mouseleave", () => { UI.coreSpotHi = null; });
    b.addEventListener("click", () => { if (CARDS[id]) openPanel(id); else if (phaseById(id)) showInCore(id); });
  });
}
function applyCoreState(scene) {
  const c = scene.core || {};
  STATE.autoTarget = c.level != null ? c.level : 2;
  STATE.agents = !!c.agents;
  STATE.spots = spotsOf(scene);
  STATE.spotTrail = !!c.trail;
  STATE.spotActive = null;
  STATE.storyFocus = UI.core ? null : (c.focus || null);
}
function setFocus(f) { if (!UI.core) STATE.storyFocus = f || null; }

/* ---------- Navigation ---------- */
function go(i, opts) {
  i = Math.max(0, Math.min(SCENES.length - 1, i));
  const s = SCENES[i];
  clearTimers();
  document.body.classList.remove("emb-max");
  closePanel();
  if (UI.core) { UI.core = false; document.body.classList.remove("core-mode"); UI.coreSpots = null; renderCasePanel(); }
  if (STATE.focus && s.layout !== "core") leavePhase();
  UI.i = i;
  document.body.dataset.layout = s.layout;
  applyCoreState(s);
  // Leave every scene still on stage (fast clicks): ones already leaving go at once
  $("stage").querySelectorAll(".scene").forEach((old) => {
    if (old.classList.contains("leave")) old.remove();
    else { old.classList.add("leave"); setTimeout(() => old.remove(), 320); }
  });
  const el = document.createElement("section");
  el.className = "scene";
  el.dataset.type = s.type;
  el.innerHTML = render(s);
  $("stage").appendChild(el);
  el.scrollTop = 0;
  mount(s, el);
  const bg = $("coverBg");
  if (UI.bgDefault == null) UI.bgDefault = bg.style.backgroundImage;
  const bgNext = (s.d && s.d.bg) ? `url('${s.d.bg}')` : UI.bgDefault;
  if (bg.style.backgroundImage !== bgNext) { bg.style.backgroundImage = bgNext; bg.style.animation = "none"; void bg.offsetWidth; bg.style.animation = ""; }
  bg.style.display = s.layout === "cover" ? "" : "none";
  if (UI.ret && UI.ret.i === i) UI.ret = null;
  syncTop(); syncNav(); updateNotes(); updatePresenter(); syncReturn();
  try { history.replaceState(null, "", `#${s.id}`); } catch (e) {}
}
function next() { if (UI.i < SCENES.length - 1) go(UI.i + 1); }
function prev() { if (UI.i > 0) go(UI.i - 1); }
function goId(id, opts) {
  const i = SCENES.findIndex((s) => s.id === id);
  if (i < 0) return;
  // a jump (shortcut, card, chip) remembers where it came from, so the presenter can go back
  if (i !== UI.i && !(opts && opts.noReturn)) UI.ret = { i: UI.i };
  go(i);
}
function syncReturn() {
  const b = $("retBtn"); if (!b) return;
  const r = UI.ret && SCENES[UI.ret.i];
  b.hidden = !r || UI.core;
  document.body.classList.toggle("has-ret", !b.hidden);
  if (r) b.innerHTML = `<i>↩</i><span>${esc(T("returnTo"))}</span><b>${esc(tr(r.k).split("·")[0].trim() === tr(r.k) ? tr(r.h) : tr(r.k).split("·").slice(-1)[0].trim())}</b>`;
}

function syncTop() {
  const s = SCENES[UI.i];
  $("secLabel").textContent = secLabel(s.sec);
  $("brandFor").textContent = CFG.name ? T("for") : "";
  document.querySelectorAll("#langSeg button").forEach((b) => b.classList.toggle("on", b.dataset.lang === STATE.lang));
  $("coreBtnLabel").textContent = UI.core ? T("coreBack") : T("core");
}
/* Runs of consecutive scenes with the same section, in the real order of SCENES (a section that comes back later,
   e.g. a backup scene appended at the end, is a separate group). Sections outside SECTIONS are kept. */
function secGroups() {
  const groups = [];
  SCENES.forEach((s, i) => {
    const g = groups[groups.length - 1];
    if (g && g.sec === s.sec) g.items.push({ s, i }); else groups.push({ sec: s.sec, items: [{ s, i }] });
  });
  return groups;
}
function secLabel(sec) { const v = T("sec." + sec); return v === "sec." + sec ? String(sec || "") : v; }
function syncNav() {
  const groups = secGroups();
  $("prog").innerHTML = groups.map((g) => `<div class="grp ${g.items.some((o) => o.i === UI.i) ? "on" : ""}" style="--n:${g.items.length}"><span title="${esc(secLabel(g.sec))}">${esc(secLabel(g.sec))}</span><div class="bars">${g.items.map((o) => `<button type="button" data-go="${o.i}" class="${o.i === UI.i ? "on" : o.i < UI.i ? "done" : ""}" title="${esc(tr(o.s.h))}"></button>`).join("")}</div></div>`).join("");
  $("prog").querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => go(+b.dataset.go)));
  $("count").textContent = `${UI.i + 1} ${T("of")} ${SCENES.length}`;
  $("prevBtn").disabled = UI.i === 0;
  $("nextBtn").disabled = UI.i === SCENES.length - 1;
  $("prevBtn").textContent = "←";
  $("nextBtn").textContent = T("next") + " →";
}

/* ---------- Rendering helpers ---------- */
let R = 0;
function r(x) { return `data-r style="--d:${R++};${x || ""}"`; }
function head(s, opts) {
  opts = opts || {};
  let h = `<div class="k" ${r()}>${esc(tr(s.k))}${s.conf ? ` <span class="badge conf">${esc(T("confidential"))}</span>` : ""}${s.nda ? ` <span class="badge conf">${esc(T("nda"))}</span>` : ""}</div>`;
  h += `<h1 class="h" ${r()}>${esc(tr(s.h))}</h1>`;
  if (s.p && !opts.noP) h += `<p class="p" ${r()}>${esc(tr(s.p))}</p>`;
  if (isCase(s) && caseSpots(s).length && !opts.noCase) h += `<div class="casecore" ${r()}><button type="button" class="incore" data-casecore><i></i>${esc(T("case.inCore"))} · ${caseSpots(s).length} ${esc(T("case.points"))}</button></div>`;
  return h;
}
function ul(items) { return `<ul class="b">${items.map((b) => `<li>${esc(tr(b))}</li>`).join("")}</ul>`; }
function incore(target) { return `<button type="button" class="incore" data-incore="${target || ""}"><i></i>${esc(T("inCore"))}</button>`; }
function countUp(el) {
  el.querySelectorAll("[data-count]").forEach((n) => {
    const to = +n.dataset.count; const dec = +(n.dataset.dec || 0); const t0 = performance.now(); const dur = 1400;
    const show = (v) => { n.textContent = dec ? v.toLocaleString(STATE.lang === "it" ? "it-IT" : "en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec }) : Math.round(v); };
    const step = (now) => { const p = Math.min(1, (now - t0) / dur); show(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
    if (STATE.reduceMotion) show(to); else requestAnimationFrame(step);
  });
}
const ICONS = {
  speed: '<path d="M4 15a8 8 0 1 1 16 0"/><path d="M12 15l4-5"/><circle cx="12" cy="15" r="1.2"/>',
  consistency: '<circle cx="12" cy="12" r="8.5"/><path d="M8 12.3l2.7 2.7L16.2 9.5"/>',
  scale: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/><path d="M3 17.5l9 5 9-5"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/>',
  tailor: '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
  collab: '<circle cx="8" cy="9" r="3"/><circle cx="16.5" cy="10" r="2.5"/><path d="M3 19c.8-3 2.8-4.5 5-4.5s4.2 1.5 5 4.5"/><path d="M13.5 15.2c.9-.5 1.9-.7 3-.7 2 0 3.6 1.4 4.3 4"/>',
  quality: '<path d="M12 3l7 3v5.5c0 4.3-3 7.7-7 9.5-4-1.8-7-5.2-7-9.5V6l7-3z"/><path d="M9 12l2.2 2.2L15.5 10"/>',
  cost: '<circle cx="12" cy="12" r="8.5"/><path d="M14.8 9.2c-.6-.8-1.6-1.2-2.8-1.2-1.7 0-2.8.9-2.8 2.1 0 2.9 5.8 1.5 5.8 4.3 0 1.2-1.2 2.1-3 2.1-1.3 0-2.4-.5-3-1.4M12 6.5V8M12 16v1.5"/>'
};
function icon(k) { return `<svg viewBox="0 0 24 24">${ICONS[k] || ""}</svg>`; }

/* ---------- Scene renderers ---------- */
function render(s) {
  R = 0;
  const d = s.d || {};
  switch (s.type) {
    case "cover":
      return `<div class="cover ${tr(s.h).length > 34 ? "long" : ""}">${head(s)}<div class="btns" ${r()}><button type="button" class="btn pri" data-next>${STATE.lang === "it" ? "Inizia" : "Start"} →</button><button type="button" class="btn" data-incore="">◎ ${esc(T("coreOpen"))}</button><button type="button" class="btn rg-open" data-regia title="D">⚙ ${esc(T("regia.btn"))}</button></div><div class="hint2" ${r()}>→ ${esc(T("next"))} · C ${esc(T("core"))} · G ${esc(T("overview"))} · ? ${esc(T("keys"))}</div></div>`;
    case "close":
      return `<div class="cover">${head(s)}<div class="trio" ${r()}>${(sceneSrc("framework") || { d: { steps: [] } }).d.steps.map((st, i) => `${i ? "<i>→</i>" : ""}<span>${esc(tr(st.t))}</span>`).join("")}</div><div class="btns" ${r()}><button type="button" class="btn pri" data-incore="">◎ ${esc(T("coreOpen"))}</button><button type="button" class="btn" data-goid="${esc(SCENES[0].id)}">↺ ${STATE.lang === "it" ? "Ricomincia" : "Restart"}</button></div><div class="thanks" ${r()}>${esc(tr(d.thanks))}</div></div>`;
    case "bigstat":
      return `${head(s)}<div class="stats ${d.size || ""}">${d.stats.map((st) => `<div class="stat" ${r()}>${st.lab ? `<div class="lab">${esc(tr(st.lab))}</div>` : ""}<div class="v">${st.pre ? `<small>${st.pre}</small>` : ""}<span data-count="${st.v}"${st.dec ? ` data-dec="${st.dec}"` : ""}>0</span><small>${st.suf || ""}</small></div><div class="t">${esc(tr(st.t))}</div>${st.src ? `<div class="src">${esc(T("source"))}: <b>${esc(st.src)}</b></div>` : ""}</div>`).join("")}</div>${d.src ? `<div class="src" ${r()}>${esc(T("source"))}: <b>${esc(d.src)}</b></div>` : ""}`;
    case "needs":
      return `${head(s)}<div class="needs">${d.items.map((it, i) => `<button type="button" class="need" data-need="${i}" ${r()}><span class="n">${i + 1}</span><span><h4>${esc(tr(it[0]))}</h4><p>${esc(tr(it[1]))}</p></span></button>`).join("")}</div><div class="mini-stat" ${r()}><div class="v"><span data-count="${d.stat.v}">0</span>${d.stat.suf}</div><div class="t">${esc(tr(d.stat.t))}</div></div>`;
    case "hyper":
      return `${head(s)}<div class="hyper"><div class="defs"><div class="tabs" ${r()}><button type="button" data-hm="one" class="on">${STATE.lang === "it" ? "Un cliente" : "One customer"}</button><button type="button" data-hm="scale">${STATE.lang === "it" ? "Su scala" : "At scale"}</button></div><div class="card on" data-def="one" ${r()}><h4>${esc(tr(d.one[0]))}</h4><p>${esc(tr(d.one[1]))}</p></div><div class="card dim" data-def="scale" ${r()}><h4>${esc(tr(d.scale[0]))}</h4><p>${esc(tr(d.scale[1]))}</p></div>${incore("act")}</div><div ${r()} id="hyperViz"></div></div>`;
    case "maturity": {
      const hs = [22, 34, 48, 62, 78, 96];
      return `${head(s)}<div class="mat"><div class="stairs" ${r()}><span class="ax y">${esc(tr(d.axisY))}</span>${d.steps.map((st, i) => `<button type="button" class="stair" data-st="${i}" style="--h:${hs[i]}%;animation-delay:${0.15 + i * 0.12}s"><b>${esc(tr(st.t))}</b></button>`).join("")}<div class="band">${esc(tr(d.band))} →</div><span class="ax x">${esc(tr(d.axisX))} →</span></div><div class="detail card" id="matDetail" ${r()}></div></div>`;
    }
    case "demand":
      return `${head(s)}<div class="demand"><div class="stack">${d.stats.map((st) => `<div class="stat" ${r()}><div class="v"><span data-count="${st.v}">0</span><small>${st.suf}</small></div><div class="t">${esc(tr(st.t))}</div></div>`).join("")}<div class="src">${esc(T("source"))}: <b>${esc(d.src)}</b></div></div><div class="bars5" ${r()}><div class="col"><div class="bar" data-h="18"></div><span class="lab">${esc(tr(d.bars[0]))}</span></div><div class="col"><span class="x">5×</span><div class="bar big" data-h="92"></div><span class="lab">${esc(tr(d.bars[1]))}</span></div></div></div>`;
    case "csc5":
      return `${head(s)}<div class="csc5">${d.steps.map((st, i) => `<button type="button" class="c5" data-c5="${i}" style="--c:var(--${st.f === "core" ? "core" : st.f})" ${r()}><span class="dot">${i + 1}</span><span><h4>${esc(tr(st.t))}</h4><p>${esc(tr(st.d))}</p></span></button>`).join("")}</div><div class="loopnote" ${r()}>↺ ${STATE.lang === "it" ? "Misurare alimenta la pianificazione successiva" : "Measure feeds the next plan"}</div>`;
    case "coreIntro":
      return `<div class="corecard"><div class="k">${esc(tr(s.k))}</div><h1 class="h">${esc(tr(s.h))}</h1><p class="p">${esc(tr(s.p))}</p><div class="chips">${d.chips.map((c) => `<button type="button" class="chip g" data-incore="${c.id}">${esc(tr(c.t))}</button>`).join("")}</div></div>`;
    case "framework":
      return `${head(s)}<div class="fw" data-s="0"><div class="fw-steps">${d.steps.map((st, i) => `<button type="button" class="fw-step ${i === 0 ? "on" : ""}" data-fw="${i}" ${r()}><span class="num">${i + 1}</span><span><h4>${esc(tr(st.t))}</h4><p>${esc(tr(st.d))}</p></span></button>`).join("")}</div><div ${r()}>${fwSvg(d)}</div></div>`;
    case "roads":
      return `${head(s)}<div class="roads">${d.roads.map((rd) => `<button type="button" class="road" data-road="${rd.id}" ${r()}><span class="tag">${esc(rd.tag)}</span><h3>${esc(tr(rd.t))}</h3><p>${esc(tr(rd.for))}</p><span class="want">${esc(tr(rd.want))}</span></button>`).join("")}</div><div class="fit" ${r()}><div class="col">${d.fit.filter((f) => f.s === "p").map((f) => `<button type="button" class="fitb" data-fit="${d.fit.indexOf(f)}">${esc(tr(f.t))}</button>`).join("")}</div><div class="meter"><div class="ends"><span>Product-driven</span><span>${STATE.lang === "it" ? "Misto" : "Mixed"}</span><span>Integration-first</span></div><div class="track"><span class="mk" id="mk" style="left:50%"></span></div><div class="verdict" id="verdict"></div></div><div class="col">${d.fit.filter((f) => f.s === "i").map((f) => `<button type="button" class="fitb" data-fit="${d.fit.indexOf(f)}">${esc(tr(f.t))}</button>`).join("")}</div></div>`;
    case "adobe":
      return `${head(s)}<div class="adobe"><div class="acols">${d.cols.map((c, i) => `<div class="acol" data-acol="${i}" style="--c:var(--${c.f === "ring" ? "ring" : c.f})" ${r()}><h4>${esc(tr(c.t))}</h4>${c.tools.map((t) => `<span class="t">${esc(tr(t))}</span>`).join("")}</div>`).join("")}</div><div class="abase" ${r()}>${esc(d.base)}</div><div class="abens">${d.benefits.map((b) => `<div ${r()}>${esc(tr(b))}</div>`).join("")}</div></div>`;
    case "firefly":
      return `<div class="ff"><div>${head(s)}<div class="cols">${d.cols.map((c) => `<div class="card" ${r()}><h4>${esc(tr(c.t))}</h4>${ul(c.b)}</div>`).join("")}</div></div><div ${r()}><div class="tabs">${d.videos.map((v, i) => `<button type="button" data-vid="${i}" class="${i === 0 ? "on" : ""}">${esc(tr(v.t))}</button>`).join("")}</div><div class="player"><video id="ffVideo" muted loop playsinline autoplay preload="metadata"></video><div class="cap" id="ffCap"></div></div>${incore("make")}</div></div>`;
    case "genstudio":
      return `${head(s)}<div class="flow" ${r()}><span class="pulse"></span>${d.flow.map((f, i) => `<div class="fn" data-gs="${i}"><i>${i + 1}</i><span>${esc(tr(f))}</span></div>`).join("")}</div><div class="gs-cols">${d.cols.map((c) => `<div class="card" ${r()}><h4>${esc(tr(c.t))}</h4>${ul(c.b)}</div>`).join("")}</div>`;
    case "n8n":
      return `<div class="n8n"><div>${head(s, { noP: true })}<div class="tagline" ${r()}>Think it. <span>Build it.</span> Extend it.</div><p class="p" ${r()}>${esc(tr(s.p))}</p><div ${r()}>${ul(d.b)}</div>${incore("ring")}</div><div class="img" ${r()}><img src="${d.img}" alt="n8n integrations"></div></div>`;
    case "waver":
      return `<div class="waver"><div><img class="logo" src="${d.logo}" alt="Content Waver" ${r()}>${head(s)}<div class="pillars">${d.pillars.map((p, i) => `<div class="pillar" ${r()}><span class="num">${i + 1}</span><span><h4>${esc(tr(p.t))}</h4><p>${esc(tr(p.d))}</p></span></div>`).join("")}</div></div><div class="how" ${r()}><div class="tabs">${d.how.map((h, i) => `<button type="button" data-how="${i}" class="${i === 0 ? "on" : ""}">${i + 1} · ${esc(tr(h.t))}</button>`).join("")}</div><div class="shot"><img id="howImg" src="${d.how[0].img}" alt=""></div><p class="txt" id="howTxt"></p></div></div>`;
    case "cases":
      return `${head(s)}<div class="cases ${d.cards.filter((c) => SCENES.some((x) => x.id === c.go)).length > 5 ? "many" : ""}">${d.cards.filter((c) => SCENES.some((x) => x.id === c.go)).map((c) => `<button type="button" class="case ${c.img ? "" : "noimg"}" data-goid="${c.go}" ${r()}><span class="bgi" style="${c.img ? `background-image:url('${c.img}')` : ""}"></span>${c.conf ? `<span class="badge conf">${esc(T("confidential"))}</span>` : ""}${c.nda ? `<span class="badge conf">${esc(T("nda"))}</span>` : ""}<span class="in"><span class="tag">${esc(tr(c.tag))}</span><h4>${esc(tr(c.t))}</h4><p>${esc(tr(c.d))}</p></span></button>`).join("")}</div>`;
    case "xchange":
      return `${head(s)}<div class="claims" ${r()}>${d.claims.map((c) => `<span class="chip g">${esc(tr(c))}</span>`).join("")}</div><div class="tabs" ${r()}><button type="button" data-xt="booth" class="on">${STATE.lang === "it" ? "L'esperienza allo stand" : "The booth experience"}</button><button type="button" data-xt="steps">${STATE.lang === "it" ? "Gli 8 passi della CSC" : "The 8 CSC steps"}</button></div><div id="xBody" ${r()}></div>`;
    case "costa":
      return `${head(s)}<div class="tabs" ${r()}>${d.tabs.map((t, i) => `<button type="button" data-ct="${i}" class="${i === 0 ? "on" : ""}">${esc(tr(t))}</button>`).join("")}</div><div id="cBody" ${r()}></div>`;
    case "story3":
      return `<div class="st3"><div>${head(s)}<div class="steps" ${r()}>${d.steps.map((st, i) => `<button type="button" data-s3="${i}" class="${i === 0 ? "on" : ""}">${esc(tr(st.t))}</button>`).join("")}</div><div class="body" id="s3Body" ${r()}></div></div><div class="ph" ${r()}><img id="s3Img" src="${d.steps[0].img}" alt=""></div></div>`;
    case "gambling":
      return `${head(s)}<div class="blocks">${d.blocks.map((b) => `<div class="card" ${r()}><h4>${esc(tr(b.t))}</h4><p>${esc(tr(b.d))}</p></div>`).join("")}</div><div class="chips" ${r("margin-top:14px")}>${d.tech.map((t) => `<span class="chip g">${esc(tr(t))}</span>`).join("")}</div>`;
    case "avatars":
      return `${head(s)}<div class="av"><div class="shot" ${r()}><img src="${d.img}" alt=""></div><div ${r()}><h4>${STATE.lang === "it" ? "Capacità chiave" : "Key capabilities"}</h4>${ul(d.cap)}</div><div ${r()}><h4>${STATE.lang === "it" ? "Valore per il business" : "Business value"}</h4>${ul(d.val)}</div></div>`;
    case "benefits":
      return `${head(s)}<div class="bens">${d.items.map((b) => `<button type="button" class="ben" ${r("text-align:left")}>${icon(b.i)}<h4>${esc(tr(b.t))}</h4><p>${esc(tr(b.d))}</p></button>`).join("")}</div>`;
  }
  const X = (window.SCENE_TYPES || {})[s.type];
  if (X && X.render) return X.render(s, d);
  return head(s);
}

function fwSvg(d) {
  const cx = 300, cy = 300, R0 = 190, n = d.ring.length;
  let g = `<svg viewBox="0 0 600 600" aria-hidden="true"><circle class="fw-ring" cx="${cx}" cy="${cy}" r="${R0}"/><g class="fw-spin"><circle cx="${cx}" cy="${cy - R0}" r="4" fill="${THEME.accent}"/></g>`;
  g += `<circle class="fw-centre-c" cx="${cx}" cy="${cy}" r="92"/>`;
  const words = tr(d.centre).split(" ");
  const lines = []; let cur = "";
  words.forEach((w) => { if ((cur + " " + w).trim().length > 14) { lines.push(cur.trim()); cur = w; } else cur += " " + w; });
  if (cur.trim()) lines.push(cur.trim());
  lines.forEach((ln, i) => { g += `<text class="fw-centre" x="${cx}" y="${cy + (i - (lines.length - 1) / 2) * 18 + 5}">${esc(ln)}</text>`; });
  d.ring.forEach((p, i) => {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
    const x = cx + Math.cos(a) * R0, y = cy + Math.sin(a) * R0;
    const ax = cx + Math.cos(a) * (R0 + 72), ay = cy + Math.sin(a) * (R0 + 72);
    const mx = cx + Math.cos(a) * (R0 - 50), my = cy + Math.sin(a) * (R0 - 50);
    g += `<g class="fw-mod"><rect x="${mx - 9}" y="${my - 9}" width="18" height="18" rx="4"/></g>`;
    g += `<g class="fw-node"><circle cx="${x}" cy="${y}" r="47"/><text x="${x}" y="${y + 4}">${esc(tr(p.p))}</text></g>`;
    const w = p.a.length * 7.4 + 18;
    g += `<g class="fw-agent" style="transition-delay:${i * 90}ms"><rect x="${ax - w / 2}" y="${ay - 13}" width="${w}" height="26" rx="13"/><text x="${ax}" y="${ay + 4}">${esc(p.a)}</text></g>`;
  });
  return g + `</svg>`;
}

/* ---------- Scene behaviour ---------- */
function mount(s, el) {
  const d = s.d || {};
  countUp(el);
  el.querySelectorAll("[data-next]").forEach((b) => b.addEventListener("click", next));
  el.querySelectorAll("[data-goid]").forEach((b) => { b._go = 1; b.addEventListener("click", (e) => { e.stopPropagation(); goId(b.dataset.goid); }); });
  el.querySelectorAll("[data-incore]").forEach((b) => b.addEventListener("click", () => showInCore(b.dataset.incore || (s.core && s.core.focus) || null)));
  el.querySelectorAll("[data-casecore]").forEach((b) => b.addEventListener("click", () => setCore(true)));
  el.querySelectorAll("[data-regia]").forEach((b) => b.addEventListener("click", () => openRegia()));

  if (s.type === "needs") {
    const btns = el.querySelectorAll("[data-need]");
    const pick = (i) => { btns.forEach((b, k) => b.classList.toggle("on", k === i)); STATE.spotActive = i; };
    btns.forEach((b) => { b.addEventListener("mouseenter", () => pick(+b.dataset.need)); b.addEventListener("click", () => pick(+b.dataset.need)); });
    let k = 0; pick(0);
    every(() => { if (!el.matches(":hover")) { k = (k + 1) % btns.length; pick(k); } }, 3200);
  }
  if (s.type === "hyper") {
    const show = (mode) => {
      el.querySelectorAll("[data-hm]").forEach((b) => b.classList.toggle("on", b.dataset.hm === mode));
      el.querySelectorAll("[data-def]").forEach((c) => { c.classList.toggle("on", c.dataset.def === mode); c.classList.toggle("dim", c.dataset.def !== mode); });
      hyperViz(el.querySelector("#hyperViz"), mode);
    };
    el.querySelectorAll("[data-hm]").forEach((b) => b.addEventListener("click", () => show(b.dataset.hm)));
    show("one");
  }
  if (s.type === "maturity") {
    let mark = null;
    try { mark = localStorage.getItem(STORE_KEY); } catch (e) {}
    const stairs = el.querySelectorAll("[data-st]");
    const paint = () => stairs.forEach((b, i) => { const pin = b.querySelector(".pin"); if (pin) pin.remove(); if (String(i) === mark) b.insertAdjacentHTML("beforeend", `<span class="pin">${esc(T("markHere"))}</span>`); });
    const pick = (i) => {
      const st = d.steps[i];
      stairs.forEach((b, k) => b.classList.toggle("on", k === i));
      setFocus(st.f); STATE.spots = [{ id: st.spot, label: tr(st.t) }]; STATE.spotActive = null;
      el.querySelector("#matDetail").innerHTML = `<div class="k">${i + 1} / ${d.steps.length}</div><h3>${esc(tr(st.t))}</h3>${ul(st.b)}<div class="row"><button type="button" class="chip g" data-mark>📍 ${esc(T("markHere"))}</button>${mark != null ? `<button type="button" class="chip" data-clear>${esc(T("clearMark"))}</button>` : ""}</div>`;
      el.querySelector("[data-mark]").addEventListener("click", () => { mark = String(i); try { localStorage.setItem(STORE_KEY, mark); } catch (e) {} paint(); pick(i); });
      const c = el.querySelector("[data-clear]"); if (c) c.addEventListener("click", () => { mark = null; try { localStorage.removeItem(STORE_KEY); } catch (e) {} paint(); pick(i); });
    };
    stairs.forEach((b) => b.addEventListener("click", () => pick(+b.dataset.st)));
    paint(); pick(mark != null ? +mark : 0);
  }
  if (s.type === "demand") {
    later(() => el.querySelectorAll(".bars5 .bar").forEach((b) => { b.style.height = b.dataset.h + "%"; }), 350);
  }
  if (s.type === "csc5") {
    const btns = el.querySelectorAll("[data-c5]");
    let auto = true, k = 0;
    const pick = (i) => { btns.forEach((b, j) => b.classList.toggle("on", j === i)); setFocus(d.steps[i].f); };
    btns.forEach((b) => b.addEventListener("click", () => { auto = false; pick(+b.dataset.c5); }));
    pick(0);
    every(() => { if (auto) { k = (k + 1) % btns.length; pick(k); } }, 3000);
  }
  if (s.type === "coreIntro") { setHint("hint.wheel"); }
  if (s.type === "framework") {
    const fw = el.querySelector(".fw");
    const pick = (i) => {
      fw.dataset.s = i;
      el.querySelectorAll("[data-fw]").forEach((b, k) => b.classList.toggle("on", k === i));
      STATE.autoTarget = i; STATE.agents = i === 2;
      setFocus(i === 0 ? "core" : null);
    };
    el.querySelectorAll("[data-fw]").forEach((b) => b.addEventListener("click", () => pick(+b.dataset.fw)));
    pick(0);
  }
  if (s.type === "roads") {
    const sel = new Set();
    const roads = el.querySelectorAll("[data-road]");
    roads.forEach((b) => b.addEventListener("click", () => {
      roads.forEach((x) => x.classList.toggle("on", x === b));
      setFocus(b.dataset.road === "product" ? "make" : "ring");
    }));
    const upd = () => {
      let p = 0, i = 0;
      sel.forEach((k) => { if (d.fit[k].s === "p") p++; else i++; });
      const tot = p + i;
      const pos = tot ? 50 + ((i - p) / Math.max(3, tot)) * 50 : 50;
      el.querySelector("#mk").style.left = Math.max(4, Math.min(96, pos)) + "%";
      let v = "none", go = null;
      if (tot) { if (p > i) { v = "p"; go = "bank"; } else if (i > p) { v = "i"; go = "costa"; } else { v = "m"; go = "xchange"; } }
      el.querySelector("#verdict").innerHTML = `${esc(tr(d.verdict[v]))}${go && SCENES.find((x) => x.id === go) ? `<br><button type="button" class="incore" data-goid="${go}">→ ${esc(tr(SCENES.find((x) => x.id === go).k).split("·")[1] || "")}</button>` : ""}`;
      el.querySelectorAll("#verdict [data-goid]").forEach((b) => b.addEventListener("click", () => goId(b.dataset.goid)));
      roads.forEach((x) => x.classList.toggle("on", (v === "p" && x.dataset.road === "product") || (v === "i" && x.dataset.road === "integration") || v === "m"));
    };
    el.querySelectorAll("[data-fit]").forEach((b) => b.addEventListener("click", () => { const k = +b.dataset.fit; if (sel.has(k)) sel.delete(k); else sel.add(k); b.classList.toggle("on", sel.has(k)); upd(); }));
    upd();
  }
  if (s.type === "adobe") {
    const cols = el.querySelectorAll("[data-acol]");
    const pick = (i) => { cols.forEach((c, k) => c.classList.toggle("on", k === i)); setFocus(d.cols[i].f); };
    cols.forEach((c) => c.addEventListener("mouseenter", () => pick(+c.dataset.acol)));
    let k = 0; pick(0);
    every(() => { if (!el.matches(":hover")) { k = (k + 1) % cols.length; pick(k); } }, 2600);
  }
  if (s.type === "firefly") {
    const v = el.querySelector("#ffVideo");
    const pick = (i) => {
      const vd = d.videos[i];
      el.querySelectorAll("[data-vid]").forEach((b, k) => b.classList.toggle("on", k === i));
      v.poster = vd.poster; v.src = vd.src; v.load(); const pr = v.play(); if (pr && pr.catch) pr.catch(() => {});
      el.querySelector("#ffCap").innerHTML = `<b>${esc(tr(vd.t))}</b>${esc(tr(vd.d))}`;
      STATE.spotActive = i === 0 ? 0 : 1;
    };
    el.querySelectorAll("[data-vid]").forEach((b) => b.addEventListener("click", () => pick(+b.dataset.vid)));
    pick(0);
  }
  if (s.type === "genstudio") {
    const fns = el.querySelectorAll("[data-gs]");
    let k = 0;
    const pick = (i) => { STATE.spotActive = i; fns.forEach((f, j) => f.querySelector("i").style.background = j === i ? "var(--green)" : "#000"); fns.forEach((f, j) => f.querySelector("i").style.color = j === i ? "#000" : "var(--green)"); };
    pick(0);
    every(() => { k = (k + 1) % fns.length; pick(k); }, 1000);
  }
  if (s.type === "waver") {
    const pick = (i) => {
      const h = d.how[i];
      el.querySelectorAll("[data-how]").forEach((b, k) => b.classList.toggle("on", k === i));
      const img = el.querySelector("#howImg"); img.src = h.img; img.style.animation = "none"; void img.offsetWidth; img.style.animation = "";
      el.querySelector("#howTxt").textContent = tr(h.d);
      STATE.spotActive = i === 0 ? 0 : i === 1 ? 1 : 3;
    };
    el.querySelectorAll("[data-how]").forEach((b) => b.addEventListener("click", () => pick(+b.dataset.how)));
    pick(0);
  }
  if (s.type === "xchange") mountXchange(s, el);
  const X = (window.SCENE_TYPES || {})[s.type];
  if (X && X.mount) X.mount(s, el, d);
  if (s.type === "costa") {
    const body = el.querySelector("#cBody");
    const it = STATE.lang === "it";
    const who = (w) => `<span class="cw-who ${w}">${w !== "a" ? `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-5 5-7 8-7s7 2 8 7z"/></svg>` : ""}${w !== "h" ? `<b>${w === "ha" ? "+ " : ""}AI</b>` : ""}</span>`;
    const col = (steps, cls, title) => `<div class="cw-col ${cls}"><h5>${esc(title)}</h5>${steps.map((st, i) => `${i ? '<i class="cw-ar">↓</i>' : ""}<div class="cw-step" data-k="${i}"><span>${esc(tr(st[0]))}</span>${who(st[1])}</div>`).join("")}</div>`;
    const pick = (i) => {
      clearTimers();
      el.querySelectorAll("[data-ct]").forEach((b, k) => b.classList.toggle("on", k === i));
      if (i === 0) {
        const n = d.need;
        body.innerHTML = `<div class="costa"><div><p class="p" style="margin-bottom:14px">${esc(tr(n.intro))}</p><div class="g2">${n.cards.map((c) => `<div class="card"><h4>${esc(tr(c[0]))}</h4><p>${esc(tr(c[1]))}</p></div>`).join("")}</div><p class="src">${esc(tr(n.also))}</p></div><div class="ph"><img src="${d.imgs[0]}" alt=""></div></div>`;
        STATE.spotActive = null; setFocus(null);
      } else if (i === 1) {
        const so = d.solution;
        body.innerHTML = `<div class="costa"><div><p class="p" style="margin-bottom:10px">${esc(tr(so.intro))}</p><p class="p" style="margin-bottom:14px;color:var(--ink)">${esc(tr(so.outcome))}</p><div class="g2"><div class="card"><h4>${it ? "Workflow (con n8n)" : "Workflow (powered by n8n)"}</h4>${ul(so.workflow)}</div><div class="card"><h4>${it ? "Controllo" : "Control"}</h4>${ul(so.framework)}</div></div></div><div class="ph"><img src="${d.imgs[1]}" alt=""></div></div>`;
        setFocus("ring"); STATE.spotActive = null;
      } else if (i === 2) {
        body.innerHTML = `<div class="cw-ba"><div class="cw-flows">${col(d.before, "before", it ? "Prima · workflow manuale" : "Before · manual workflow")}<div class="cw-mid"><span>→</span></div>${col(d.after, "after", it ? "Dopo · CSC orchestrata con l'AI" : "After · orchestrated AI-powered CSC")}</div><div class="cw-side"><button type="button" class="btn pri" id="cwPlay">▶ ${it ? "Avvia" : "Play"}</button><div class="cw-legend"><span>${who("h")} ${it ? "persona" : "person"}</span><span>${who("a")} ${it ? "agente AI" : "AI agent"}</span><span>${who("ha")} ${it ? "persona con l'AI" : "person with AI"}</span></div><div class="cw-kpis">${d.kpis.map((k) => `<div class="cw-kpi"><div class="cw-num">${k.pre}<span data-count="${k.v}">${k.v}</span>${k.u}</div><h4>${esc(tr(k.t))}</h4><p>${esc(tr(k.d))}</p></div>`).join("")}</div></div></div>`;
        const play = () => {
          clearTimers();
          const ba = body.querySelector(".cw-ba"); ba.classList.remove("done"); ba.classList.add("run");
          body.querySelectorAll(".cw-step").forEach((x) => x.classList.remove("lit"));
          const B = body.querySelectorAll(".before .cw-step"), A = body.querySelectorAll(".after .cw-step");
          B.forEach((x, k) => later(() => x.classList.add("lit"), 450 + k * 560));
          A.forEach((x, k) => later(() => x.classList.add("lit"), 450 + k * 300));
          later(() => { ba.classList.add("done"); countUp(body.querySelector(".cw-kpis")); }, 450 + B.length * 560);
        };
        body.querySelector("#cwPlay").addEventListener("click", play);
        setFocus(null); STATE.spotActive = null;
      } else {
        body.innerHTML = `<div class="costa"><div class="ph wf"><img src="${d.imgs[2]}" alt="n8n workflow"></div><div><p class="p">${esc(tr(d.detail))}</p>${incore("make::job::page-copy")}</div></div>`;
        body.querySelectorAll("[data-incore]").forEach((b) => b.addEventListener("click", () => showInCore(b.dataset.incore)));
        setFocus(null); STATE.spotActive = 1;
      }
    };
    el.querySelectorAll("[data-ct]").forEach((b) => b.addEventListener("click", () => pick(+b.dataset.ct)));
    pick(0);
  }
  if (s.type === "story3") {
    const pick = (i) => {
      const st = d.steps[i];
      el.querySelectorAll("[data-s3]").forEach((b, k) => b.classList.toggle("on", k === i));
      el.querySelector("#s3Body").innerHTML = st.b.map((p, k) => `<p style="animation-delay:${k * 0.12}s">${esc(tr(p))}</p>`).join("");
      const img = el.querySelector("#s3Img"); img.src = st.img; img.style.animation = "none"; void img.offsetWidth; img.style.animation = "";
      STATE.spotActive = i;
    };
    el.querySelectorAll("[data-s3]").forEach((b) => b.addEventListener("click", () => pick(+b.dataset.s3)));
    pick(0);
  }
  if (s.type === "cases") {
    el.querySelectorAll(".case[data-goid]").forEach((b) => b.addEventListener("mouseenter", () => {
      const sc = SCENES.find((x) => x.id === b.dataset.goid);
      if (sc) { STATE.spots = caseSpots(sc); STATE.spotTrail = true; STATE.spotActive = null; }
    }));
  }
  if (s.type === "benefits") {
    const bs = el.querySelectorAll(".ben"); let k = -1;
    every(() => { if (!el.matches(":hover")) { k = (k + 1) % bs.length; bs.forEach((b, j) => b.classList.toggle("on", j === k)); } }, 1600);
  }
}

function mountXchange(s, el) {
  const d = s.d;
  const body = el.querySelector("#xBody");
  let mode = "booth", stack = "adobe", cur = 0, playing = false, tick = null;
  const stop = () => { playing = false; if (tick) { clearInterval(tick); tick = null; } };
  const draw = () => {
    if (mode === "booth") {
      STATE.spots = [];
      body.innerHTML = `<div class="pipe">${d.booth.map((b, i) => `<div class="pnode ${b.ai ? "ai" : ""} ${i === cur ? "on" : i < cur ? "done" : ""}"><span class="ix">${b.ai ? "AI · " : ""}${i + 1}</span><h4>${esc(tr(b.t))}</h4><p>${esc(tr(b.d))}</p></div>`).join("")}</div><div class="xctrl"><button type="button" class="btn pri" data-play>${playing ? "❚❚ " + esc(T("pause")) : "▶ " + esc(T("play"))}</button><span class="chip">${STATE.lang === "it" ? "Persona → Workfront → 5 agenti AI → video multicanale" : "Visitor → Workfront → 5 AI agents → multichannel video"}</span></div>`;
      setFocus(cur >= 3 ? "make" : "demand");
    } else {
      STATE.spots = d.steps.map((st) => ({ id: st.spot, label: tr(st.t) }));
      STATE.spotTrail = true; STATE.spotActive = cur;
      const st = d.steps[cur];
      const tools = stack === "adobe" ? st.a : st.alt;
      body.innerHTML = `<div class="pipe">${d.steps.map((x, i) => `<button type="button" class="pnode ${i === cur ? "on" : i < cur ? "done" : ""}" data-xs="${i}"><span class="ix">${i + 1}</span><h4>${esc(tr(x.t))}</h4></button>`).join("")}</div><div class="xctrl"><button type="button" class="btn pri" data-play>${playing ? "❚❚ " + esc(T("pause")) : "▶ " + esc(T("play"))}</button><div class="seg"><button type="button" data-stk="adobe" class="${stack === "adobe" ? "on" : ""}">${esc(T("adobeStack"))}</button><button type="button" data-stk="alt" class="${stack === "alt" ? "on" : ""}">${esc(T("altStack"))}</button></div><button type="button" class="incore" data-incore="${st.spot}"><i></i>${esc(T("inCore"))}</button></div><div class="xdetail"><div class="card"><span class="ix" style="font-size:11px;letter-spacing:.14em;color:var(--green)">${cur + 1} / 8</span><h4>${esc(tr(st.t))}</h4><p>${esc(tr(st.d))}</p></div><div class="card tools"><h5>${esc(stack === "adobe" ? T("adobeStack") : T("altStack"))}</h5>${tools.length ? tools.map((t) => `<span class="chip g">${esc(tr(t))}</span>`).join("") : `<span class="chip">${STATE.lang === "it" ? "Stesso stack di attivazione" : "Same activation stack"}</span>`}</div></div>`;
      setFocus(null);
      body.querySelectorAll("[data-xs]").forEach((b) => b.addEventListener("click", () => { stop(); cur = +b.dataset.xs; draw(); }));
      body.querySelectorAll("[data-stk]").forEach((b) => b.addEventListener("click", () => { stack = b.dataset.stk; draw(); }));
      body.querySelectorAll("[data-incore]").forEach((b) => b.addEventListener("click", () => { stop(); showInCore(b.dataset.incore); }));
    }
    body.querySelector("[data-play]").addEventListener("click", () => {
      if (playing) { stop(); draw(); return; }
      playing = true;
      const n = mode === "booth" ? d.booth.length : d.steps.length;
      if (cur >= n - 1) cur = 0;
      draw();
      tick = setInterval(() => { cur++; if (cur >= n) { cur = n - 1; stop(); } draw(); }, 2400);
      UI.intervals.push(tick);
    });
  };
  el.querySelectorAll("[data-xt]").forEach((b) => b.addEventListener("click", () => {
    stop(); mode = b.dataset.xt; cur = 0;
    el.querySelectorAll("[data-xt]").forEach((x) => x.classList.toggle("on", x === b));
    draw();
  }));
  draw();
}

/* Hyper-personalization graphic */
function hyperViz(box, mode) {
  const W = 640, H = 460, cx = 320, cy = 230;
  let g = `<svg viewBox="0 0 ${W} ${H}">`;
  if (mode === "one") {
    const ch = [["M-7 -4h14v9h-14zM-7 -4l7 5 7-5", "email"], ["M-8 -6h16v10h-9l-5 4v-4h-2z", "chat"], ["M-8 -7h16v11h-16zM-3 8h6", "web"], ["M-6 -8h12v16h-12zM-1 5h2", "app"], ["M-8 -2l8 -6 8 6v8h-16z", "store"], ["M-7 6c2-7 12-7 14 0M0 -2a3 3 0 1 0 0-.1", "social"]];
    ch.forEach((c, i) => {
      const a = -Math.PI / 2 + i * Math.PI / 3; const x = cx + Math.cos(a) * 170, y = cy + Math.sin(a) * 170;
      g += `<line class="hp-line" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"/>`;
      g += `<circle class="hp-pulse" r="4"><animateMotion dur="${2 + i * 0.25}s" repeatCount="indefinite" path="M${cx},${cy} L${x},${y}"/></circle>`;
      g += `<circle class="hp-node" cx="${x}" cy="${y}" r="34"/><g transform="translate(${x},${y}) scale(1.4)"><path class="hp-ico" d="${c[0]}"/></g><text x="${x}" y="${y + 52}" fill="#86948C" font-size="12" text-anchor="middle" letter-spacing="2">${c[1].toUpperCase()}</text>`;
    });
    g += `<circle cx="${cx}" cy="${cy}" r="62" fill="${rgbaOf(THEME.accent, .12)}" stroke="${THEME.accent}" stroke-width="2"/><circle cx="${cx}" cy="${cy - 14}" r="16" fill="none" stroke="#F2F5F3" stroke-width="2.2"/><path d="M${cx - 26} ${cy + 30}c5-18 47-18 52 0" fill="none" stroke="#F2F5F3" stroke-width="2.2"/>`;
    g += `<circle cx="${cx}" cy="${cy}" r="62" fill="none" stroke="${THEME.accent}" stroke-width="1"><animate attributeName="r" values="62;90" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0" dur="2s" repeatCount="indefinite"/></circle>`;
  } else {
    const cols = 12, rows = 7, gx = 46, gy = 56, ox = (W - (cols - 1) * gx) / 2, oy = 50;
    for (let r0 = 0; r0 < rows; r0++) for (let c = 0; c < cols; c++) {
      const x = ox + c * gx, y = oy + r0 * gy, i = r0 * cols + c;
      g += `<rect class="hp-tile" data-i="${i}" x="${x - 17}" y="${y - 20}" width="34" height="42" rx="7"/><circle class="hp-person" data-i="${i}" cx="${x}" cy="${y - 6}" r="6"/><path class="hp-person" data-i="${i}" d="M${x - 10} ${y + 14}c2-9 18-9 20 0z"/>`;
    }
  }
  g += `</svg>`;
  box.innerHTML = g;
  if (mode === "scale") {
    const total = 84; const order = [...Array(total).keys()].sort(() => Math.random() - 0.5);
    order.forEach((i, k) => later(() => box.querySelectorAll(`[data-i="${i}"]`).forEach((n) => n.classList.add("lit")), 120 + k * 28));
  }
}

/* ---------- Notes, presenter, overview, handout ---------- */
function updateNotes() {
  const n = $("notes");
  n.classList.toggle("show", UI.notes);
  if (UI.notes) n.innerHTML = `<h5>${esc(T("notes.title"))} · ${UI.i + 1}/${SCENES.length}</h5>${esc(tr(SCENES[UI.i].n))}`;
}
function openPresenter() {
  const w = window.open("", "csc-presenter", "width=560,height=760");
  if (!w) return;
  UI.presenter = w; UI.t0 = Date.now();
  w.document.open();
  w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Presenter</title><style>body{margin:0;background:${THEME.bg || "#000"};color:#F2F5F3;font-family:Arial,sans-serif;padding:22px}.k{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:${THEME.accent};font-weight:700}h1{font-size:24px;margin:6px 0 14px;line-height:1.2}.n{font-size:18px;line-height:1.55;color:#C9D3CD;background:${THEME.panel || "#0B130E"};border:1px solid ${rgbaOf(THEME.accent, .3)};border-radius:12px;padding:16px}.nx{margin-top:18px;font-size:13px;color:#86948C}.nx b{color:#F2F5F3}.row{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;color:#86948C;font-size:13px}.clock{font-size:28px;color:#F2F5F3;font-variant-numeric:tabular-nums}button{background:${THEME.accent};color:${THEME.onAccent || "#000"};border:0;border-radius:99px;padding:10px 18px;font-weight:700;margin-right:8px;cursor:pointer}</style></head><body><div class="row"><span id="pos"></span><span class="clock" id="clock">00:00</span></div><div id="main"></div><p style="margin-top:20px"><button id="pv">←</button><button id="nx">→</button><button id="cr">C</button></p></body></html>`);
  w.document.close();
  w.document.getElementById("pv").onclick = prev;
  w.document.getElementById("nx").onclick = next;
  w.document.getElementById("cr").onclick = () => setCore(!UI.core);
  w.document.addEventListener("keydown", onKey);
  updatePresenter();
}
function updatePresenter() {
  const w = UI.presenter; if (!w || w.closed) return;
  const s = SCENES[UI.i], nx = SCENES[UI.i + 1];
  w.document.getElementById("pos").textContent = `${UI.i + 1} / ${SCENES.length} · ${secLabel(s.sec)}`;
  w.document.getElementById("main").innerHTML = `<div class="k">${esc(tr(s.k))}</div><h1>${esc(tr(s.h))}</h1><div class="n">${esc(tr(s.n))}</div>${nx ? `<div class="nx">${STATE.lang === "it" ? "Prossima" : "Next"}: <b>${esc(tr(nx.h))}</b></div>` : ""}`;
}
setInterval(() => {
  const w = UI.presenter; if (!w || w.closed) return;
  const s = Math.floor((Date.now() - UI.t0) / 1000);
  const el = w.document.getElementById("clock"); if (el) el.textContent = `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}, 1000);
function renderOverview() {
  $("overview").innerHTML = `<div class="ov-grid">${secGroups().map((g) => `<h3>${esc(secLabel(g.sec))}</h3><div class="ov-row">${g.items.map(({ s, i }) => `<button type="button" data-go="${i}" class="${i === UI.i ? "on" : ""}"><small>${i + 1} · ${esc(tr(s.k))}</small><b>${esc(tr(s.h))}</b></button>`).join("")}</div>`).join("")}</div>`;
  $("overview").querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => { $("overview").classList.remove("show"); go(+b.dataset.go); }));
}
function toggleOverview() { const o = $("overview"); if (o.classList.contains("show")) o.classList.remove("show"); else { renderOverview(); o.classList.add("show"); } }
function renderKeys() { $("keysBox").innerHTML = `<h3>${esc(T("keys.title"))}</h3>` + KEYS.map((k) => `<div><span>${esc(k[1 + L()])}</span><kbd>${esc(k[0])}</kbd></div>`).join(""); }
/* ---------- Regia (D): choose the scenes to show ---------- */
const RG = { draft: null, prevFocus: null };
function regiaIsOpen() { return $("regia").classList.contains("show"); }
function regiaKind(s) { const k = tr(s.k).split("·").map((x) => x.trim()).filter(Boolean); return (k.length > 1 ? k[k.length - 1] : k[0] || "") + " · " + s.type; }
function openRegia() {
  if (!$("regia")) return;
  $("overview").classList.remove("show"); $("keysModal").classList.remove("show"); $("menu").classList.remove("open");
  if (regiaIsOpen()) return;
  RG.draft = regiaCopy(UI.regia);
  RG.prevFocus = document.activeElement;
  renderRegia();
  $("regia").classList.add("show");
  document.body.classList.add("rg-on");
  const f = $("regia").querySelector(".rg"); if (f) f.focus({ preventScroll: true });
}
function closeRegia() {
  if (!regiaIsOpen()) return;
  $("regia").classList.remove("show");
  document.body.classList.remove("rg-on");
  RG.draft = null;
  if (RG.prevFocus && RG.prevFocus.focus) { try { RG.prevFocus.focus(); } catch (e) {} }
}
/* Blocks of the panel = runs of consecutive scenes with the same section in the draft order (like the navigation). */
function regiaBlocks(order, pool) {
  const out = [];
  order.forEach((id) => { const sec = secOf(id, pool), b = out[out.length - 1]; if (b && b.sec === sec) b.ids.push(id); else out.push({ sec, ids: [id] }); });
  return out;
}
const RG_GRIP = '<svg viewBox="0 0 10 16" width="10" height="16" aria-hidden="true"><circle cx="2.5" cy="3" r="1.4"/><circle cx="7.5" cy="3" r="1.4"/><circle cx="2.5" cy="8" r="1.4"/><circle cx="7.5" cy="8" r="1.4"/><circle cx="2.5" cy="13" r="1.4"/><circle cx="7.5" cy="13" r="1.4"/></svg>';
function renderRegia(focus) {
  const pool = scenePool(), st = RG.draft, box = $("regia");
  const oldBody = box.querySelector(".rg-body"), keepScroll = oldBody ? oldBody.scrollTop : 0;
  const keepOut = box.querySelector(".rg-out") && !box.querySelector(".rg-out").hidden;
  const keepBk = box.querySelector(".rg-bk") && box.querySelector(".rg-bk").open;
  const order = regiaOrder(st, pool);
  const bks = backupIds().filter((id) => pool[id]);
  const isBk = (id) => bks.indexOf(id) >= 0;
  const row = (id, sortable) => {
    const s = sceneFor(id, pool), t = esc(tr(s.h));
    return `<li class="rg-row ${sortable ? "" : "rg-fixed"}" data-row="${esc(id)}">${sortable ? `<button type="button" class="rg-grip" data-grip aria-label="${esc(T("regia.drag"))}: ${t}" title="${esc(T("regia.drag"))} · Alt+↑/↓">${RG_GRIP}</button>` : ""}<label><span class="rg-n" aria-hidden="true"></span><span class="rg-t"><b>${t}</b><small>${isBk(id) ? `${esc(T("regia.bkTag"))} · ${esc(secLabel(s.sec))} · ` : ""}${esc(regiaKind(s))}</small></span><input type="checkbox" class="rg-sw" role="switch" data-rgid="${esc(id)}" data-bk="${isBk(id) ? 1 : 0}"></label>${sortable ? `<span class="rg-mv"><button type="button" data-mv="-1" aria-label="${esc(T("regia.up"))}: ${t}" title="${esc(T("regia.up"))}">↑</button><button type="button" data-mv="1" aria-label="${esc(T("regia.down"))}: ${t}" title="${esc(T("regia.down"))}">↓</button></span>` : ""}</li>`;
  };
  let h = `<div class="rg" role="document" tabindex="-1"><div class="rg-head"><div><div class="rg-k">${esc(CFG.name || "")}</div><h2 id="rgTitle">${esc(T("regia.title"))}</h2><p>${esc(T("regia.lede"))}</p><p class="rg-hint">${RG_GRIP} ${esc(T("regia.orderHint"))}</p></div><button type="button" class="rg-x" data-rgact="close" aria-label="${esc(T("regia.close"))}">×</button></div>`;
  h += `<p class="rg-local" hidden>● ${esc(T("regia.local"))}</p><div class="rg-body">`;
  regiaBlocks(order, pool).forEach((b, k) => {
    const lab = T("sec." + b.sec) === "sec." + b.sec ? T("regia.other") + " · " + b.sec : T("sec." + b.sec);
    h += `<section class="rg-sec" data-sec="${esc(b.sec)}" data-blk="${k}"><div class="rg-sh"><button type="button" class="rg-grip" data-sgrip aria-label="${esc(T("regia.dragSec"))}: ${esc(lab)}" title="${esc(T("regia.dragSec"))} · Alt+↑/↓">${RG_GRIP}</button><label class="rg-shl"><input type="checkbox" data-rgsec aria-label="${esc(lab)} · ${esc(T("regia.all"))}"><b>${esc(lab)}</b><small class="rg-sc"></small></label><span class="rg-mv"><button type="button" data-smv="-1" aria-label="${esc(T("regia.secUp"))}: ${esc(lab)}" title="${esc(T("regia.secUp"))}">↑</button><button type="button" data-smv="1" aria-label="${esc(T("regia.secDown"))}: ${esc(lab)}" title="${esc(T("regia.secDown"))}">↓</button></span></div><ul>${b.ids.map((id) => row(id, true)).join("")}</ul></section>`;
  });
  const off = bks.filter((id) => order.indexOf(id) < 0);
  if (bks.length) h += `<details class="rg-bk"${keepBk ? " open" : ""}><summary><b>${esc(T("regia.backup"))}</b><small>${off.length}/${bks.length}</small></summary><p>${esc(T("regia.backupHint"))}</p><ul>${off.map((id) => row(id, false)).join("")}</ul></details>`;
  h += `</div><div class="rg-out"${keepOut ? "" : " hidden"}><p>${esc(T("regia.exportHint").replace("{id}", CFG.id))}</p><textarea readonly rows="8" spellcheck="false" aria-label="JSON"></textarea><button type="button" class="btn" data-rgact="copy">${esc(T("regia.copy"))}</button></div>`;
  h += `<div class="rg-foot"><div class="rg-info"><span class="rg-count"></span><span class="rg-msg" role="status" aria-live="polite"></span></div><div class="rg-btns"><button type="button" class="btn" data-rgact="reset">${esc(T("regia.reset"))}</button><button type="button" class="btn" data-rgact="export">${esc(T("regia.export"))}</button>${window.CSC_DASHBOARD ? `<button type="button" class="btn" data-rgact="save">${esc(T("regia.save"))}</button>` : ""}<button type="button" class="btn pri" data-rgact="apply">${esc(T("regia.apply"))}</button></div></div></div>`;
  box.innerHTML = h;
  const body = box.querySelector(".rg-body"); body.scrollTop = keepScroll;
  box.querySelectorAll("[data-rgid]").forEach((c) => c.addEventListener("change", () => {
    const id = c.dataset.rgid;
    if (c.dataset.bk === "1") {
      RG.draft.order = regiaDomOrder();
      RG.draft.backupOn = RG.draft.backupOn.filter((x) => x !== id).concat(c.checked ? [id] : []);
      renderRegia(`[data-rgid="${id}"]`); return;
    }
    RG.draft.hidden = RG.draft.hidden.filter((x) => x !== id).concat(c.checked ? [] : [id]);
    paintRegia();
  }));
  box.querySelectorAll("[data-rgsec]").forEach((c) => c.addEventListener("change", () => {
    const ids = [...c.closest(".rg-sec").querySelectorAll("[data-rgid]")].map((x) => x.dataset.rgid);
    RG.draft.hidden = RG.draft.hidden.filter((x) => ids.indexOf(x) < 0).concat(c.checked ? [] : ids);
    paintRegia();
  }));
  // Ordering: rows inside their section block, section blocks inside the list
  box.querySelectorAll(".rg-sec .rg-row").forEach((li) => {
    const grip = li.querySelector("[data-grip]");
    rgDrag(grip, li, li.parentElement, ".rg-row", () => paintRegia(), () => rgMoved(li));
    grip.addEventListener("keydown", (e) => { if (e.key === "ArrowUp" || e.key === "ArrowDown") { e.preventDefault(); rgStep(li, e.key === "ArrowUp" ? -1 : 1, "[data-grip]"); } });
    li.querySelectorAll("[data-mv]").forEach((b) => b.addEventListener("click", () => rgStep(li, +b.dataset.mv, `[data-mv="${b.dataset.mv}"]`)));
  });
  box.querySelectorAll(".rg-sec").forEach((sec) => {
    const grip = sec.querySelector("[data-sgrip]");
    rgDrag(grip, sec, body, ".rg-sec", () => paintRegia(), () => rgSecDone(sec, "[data-sgrip]"));
    grip.addEventListener("keydown", (e) => { if (e.key === "ArrowUp" || e.key === "ArrowDown") { e.preventDefault(); rgSecStep(sec, e.key === "ArrowUp" ? -1 : 1, "[data-sgrip]"); } });
    sec.querySelectorAll("[data-smv]").forEach((b) => b.addEventListener("click", () => rgSecStep(sec, +b.dataset.smv, `[data-smv="${b.dataset.smv}"]`)));
  });
  box.querySelectorAll("[data-rgact]").forEach((b) => b.addEventListener("click", () => regiaAct(b.dataset.rgact, b)));
  paintRegia();
  if (focus) { const f = box.querySelector(focus); if (f) f.focus({ preventScroll: false }); }
}
/* The order shown in the panel (section blocks, top to bottom) */
function regiaDomOrder() { return [...$("regia").querySelectorAll(".rg-body .rg-sec .rg-row")].map((li) => li.dataset.row); }
function rgSync() { RG.draft.order = regiaDomOrder(); paintRegia(); }
function rgMoved(li) {
  rgSync();
  const pool = scenePool(), id = li.dataset.row;
  const n = (regiaVisible(RG.draft, pool).indexOf(id) + 1) || (regiaOrder(RG.draft, pool).indexOf(id) + 1);
  regiaMsg(T("regia.moved").replace("{t}", li.querySelector(".rg-t b").textContent).replace("{n}", n), true);
}
/* One step up/down inside the section block (buttons, Alt+↑/↓ on the handle) */
function rgStep(li, dir, refocus) {
  const sib = dir < 0 ? li.previousElementSibling : li.nextElementSibling;
  if (!sib) return;
  li.parentElement.insertBefore(li, dir < 0 ? sib : sib.nextElementSibling);
  rgMoved(li);
  const f = li.querySelector(refocus); if (f && !f.disabled) f.focus(); else { const g = li.querySelector("[data-grip]"); if (g) g.focus(); }
}
function rgSecStep(sec, dir, refocus) {
  const sib = dir < 0 ? sec.previousElementSibling : sec.nextElementSibling;
  if (!sib || !sib.classList.contains("rg-sec")) return;
  sec.parentElement.insertBefore(sec, dir < 0 ? sib : sib.nextElementSibling);
  rgSecDone(sec, refocus);
}
/* After a section moved: blocks of the same section that now touch become one; redraw and keep the focus */
function rgSecDone(sec, refocus) {
  const first = sec.querySelector(".rg-row").dataset.row;
  RG.draft.order = regiaDomOrder();
  renderRegia();
  const li = $("regia").querySelector(`.rg-row[data-row="${first}"]`), ns = li && li.closest(".rg-sec");
  if (ns) {
    const f = ns.querySelector(refocus); (f && !f.disabled ? f : ns.querySelector("[data-sgrip]")).focus();
    regiaMsg(T("regia.secMoved").replace("{t}", ns.querySelector(".rg-shl b").textContent), true);
  }
}
/* Pointer drag (mouse, pen, touch) from a handle only: the item moves among the siblings of its own container,
   so a slide can never leave its section block. The list auto-scrolls near the edges. */
function rgDrag(handle, item, list, sel, onMove, onDone) {
  if (!handle) return;
  handle.addEventListener("pointerdown", (e) => {
    if (e.button !== 0 || RG.drag) return;
    e.preventDefault();
    const box = $("regia"), body = box.querySelector(".rg-body");
    try { handle.setPointerCapture(e.pointerId); } catch (err) {}
    const d = RG.drag = { y: e.clientY, x: e.clientX, raf: 0, moved: false };
    item.classList.add("rg-drag"); list.classList.add("rg-zone"); box.classList.add("rg-dragging");
    const place = () => {
      const others = [...list.children].filter((x) => x !== item && x.matches(sel));
      if (!others.length) return;
      const lw = list.getBoundingClientRect().width;
      const isBefore = (x) => {
        const r = x.getBoundingClientRect();
        if (r.width > lw * 0.7) return d.y < r.top + r.height / 2;          // one column: upper half
        return d.y < r.top || (d.y <= r.bottom && d.x < r.left + r.width / 2); // grid: reading order
      };
      const ref = others.find(isBefore);
      if (ref) { if (item.nextElementSibling === ref) return; list.insertBefore(item, ref); }
      else { const last = others[others.length - 1]; if (last.nextElementSibling === item) return; list.insertBefore(item, last.nextElementSibling); }
      d.moved = true; onMove();
    };
    const tick = () => {
      const r = body.getBoundingClientRect(), edge = 48;
      const v = d.y < r.top + edge ? -Math.ceil((r.top + edge - d.y) / 4) : d.y > r.bottom - edge ? Math.ceil((d.y - r.bottom + edge) / 4) : 0;
      if (v) { body.scrollTop += v; place(); }
      d.raf = requestAnimationFrame(tick);
    };
    d.raf = requestAnimationFrame(tick);
    const move = (ev) => { if (ev.pointerId !== e.pointerId) return; ev.preventDefault(); d.x = ev.clientX; d.y = ev.clientY; place(); };
    const end = (ev) => {
      if (ev && ev.pointerId !== e.pointerId) return;
      cancelAnimationFrame(d.raf);
      window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", end); window.removeEventListener("pointercancel", end);
      item.classList.remove("rg-drag"); list.classList.remove("rg-zone"); box.classList.remove("rg-dragging");
      RG.drag = null;
      if (d.moved) onDone();
    };
    // listen on window: moving the item in the DOM releases the pointer capture of its handle
    window.addEventListener("pointermove", move); window.addEventListener("pointerup", end); window.addEventListener("pointercancel", end);
  });
}
function paintRegia() {
  const box = $("regia"), st = RG.draft, pool = scenePool();
  if (box.querySelector(".rg-sec")) st.order = regiaDomOrder();
  const vis = regiaVisible(st, pool), order = regiaOrder(st, pool);
  const total = regiaBase({ hidden: [], backupOn: [] }, pool).length + backupIds().filter((id) => pool[id]).length;
  const none = !order.some((id) => st.hidden.indexOf(id) < 0);
  box.querySelectorAll("[data-rgid]").forEach((c) => {
    const id = c.dataset.rgid, on = c.dataset.bk === "1" ? st.backupOn.indexOf(id) >= 0 : st.hidden.indexOf(id) < 0;
    c.checked = on;
    const li = c.closest(".rg-row"); li.classList.toggle("rg-off", !on);
    const n = vis.indexOf(id);
    li.querySelector(".rg-n").textContent = on && n >= 0 && !none ? n + 1 : "–";
  });
  box.querySelectorAll(".rg-sec").forEach((sec, k, all) => {
    const c = sec.querySelector("[data-rgsec]"), cs = [...sec.querySelectorAll("[data-rgid]")];
    const n = cs.filter((x) => x.checked).length;
    c.checked = n === cs.length; c.indeterminate = n > 0 && n < cs.length;
    sec.querySelector(".rg-sc").textContent = `${n}/${cs.length}`;
    sec.querySelector('[data-smv="-1"]').disabled = k === 0;
    sec.querySelector('[data-smv="1"]').disabled = k === all.length - 1;
    const rows = [...sec.querySelectorAll(".rg-row")];
    rows.forEach((li, j) => { li.querySelector('[data-mv="-1"]').disabled = j === 0; li.querySelector('[data-mv="1"]').disabled = j === rows.length - 1; });
    sec.classList.toggle("rg-single", rows.length < 2);
  });
  box.querySelector(".rg-count").textContent = T("regia.count").replace("{n}", none ? 0 : vis.length).replace("{m}", total);
  box.querySelector(".rg-local").hidden = regiaSame(UI.regia, regiaDefaults()) && regiaSame(st, regiaDefaults());
  box.querySelector('[data-rgact="apply"]').disabled = none;
  const sv = box.querySelector('[data-rgact="save"]'); if (sv) sv.disabled = none;
  if (none) regiaMsg(T("regia.none")); else if (box.querySelector(".rg-msg").textContent === T("regia.none")) regiaMsg("");
  const out = box.querySelector(".rg-out"); if (!out.hidden) out.querySelector("textarea").value = regiaJson();
}
function regiaJson() { return JSON.stringify(regiaExport(RG.draft), null, 2); }
function regiaMsg(t, ok) { const m = $("regia").querySelector(".rg-msg"); if (m) { m.textContent = t || ""; m.classList.toggle("ok", !!ok); } }
function regiaApply(st, keepOpen) {
  const cur = SCENES[UI.i] && SCENES[UI.i].id;
  UI.regia = regiaCopy(st);
  regiaStore(UI.regia);
  buildScenes();
  UI.ret = null;
  const i = SCENES.findIndex((x) => x.id === cur);
  go(i >= 0 ? i : 0);
  if (!keepOpen) closeRegia();
}
function regiaAct(a, b) {
  const box = $("regia");
  if (a === "close") closeRegia();
  else if (a === "apply") { if (!b.disabled) regiaApply(RG.draft); }
  else if (a === "reset") { RG.draft = regiaDefaults(); regiaApply(RG.draft, true); renderRegia('[data-rgact="reset"]'); regiaMsg(T("regia.restored"), true); }
  else if (a === "export") {
    const out = box.querySelector(".rg-out"); out.hidden = !out.hidden;
    if (!out.hidden) { const ta = out.querySelector("textarea"); ta.value = regiaJson(); ta.focus(); ta.select(); out.scrollIntoView({ block: "nearest" }); }
  }
  else if (a === "copy") {
    const ta = box.querySelector(".rg-out textarea"); ta.value = regiaJson();
    const fail = () => { ta.focus(); ta.select(); regiaMsg(T("regia.copyFail")); };
    try { navigator.clipboard.writeText(ta.value).then(() => regiaMsg(T("regia.copied"), true), fail); } catch (e) { fail(); }
  }
  else if (a === "save") {
    if (b.disabled) return;
    b.disabled = true;
    fetch("/api/regia", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(regiaExport(RG.draft)) })
      .then((r) => r.json().catch(() => ({})).then((j) => { if (!r.ok || !j.ok) throw new Error(j.error || r.status); }))
      .then(() => {
        try { localStorage.removeItem(REGIA_KEY); } catch (e) {}
        regiaMsg(T("regia.saved"), true);
        setTimeout(() => { const u = new URL(location.href); u.searchParams.set("regia", "1"); u.hash = SCENES[UI.i] ? SCENES[UI.i].id : ""; location.replace(u.href); }, 700);
      })
      .catch((e) => { b.disabled = false; regiaMsg(`${T("regia.saveFail")}: ${e.message || e}`); });
  }
}

function openHandout() {
  const it = STATE.lang === "it";
  let img = ""; try { img = canvas.toDataURL("image/png"); } catch (e) {}
  const date = new Date().toLocaleDateString(it ? "it-IT" : "en-GB", { year: "numeric", month: "long", day: "numeric" });
  const flat = (v) => Array.isArray(v) && typeof v[0] === "string" && v.length === 2 ? tr(v) : "";
  let h = `<!doctype html><html lang="${STATE.lang}"><head><meta charset="utf-8"><title>${esc(document.title)}</title><style>@page{size:A4;margin:15mm}body{font-family:Arial,sans-serif;color:#0b1a10;margin:0;font-size:11pt;line-height:1.45}.bar{position:sticky;top:0;background:${THEME.bg || "#000"};color:#fff;padding:10px 16px;display:flex;justify-content:space-between;align-items:center}.bar button{background:${THEME.accent};color:${THEME.onAccent || "#000"};border:0;border-radius:99px;padding:8px 16px;font-weight:700;cursor:pointer}main{max-width:820px;margin:0 auto;padding:24px}.k{font-size:9pt;letter-spacing:.16em;text-transform:uppercase;color:${THEME.handoutK || "#00A33A"};font-weight:700}h1{font-size:28pt;line-height:1.05;margin:6px 0 10px}h2{font-size:15pt;margin:22px 0 6px}.cover{background:${THEME.bg || "#000"};color:#F2F5F3;border-radius:10px;padding:24px}.cover img{width:100%;border-radius:8px;margin-top:14px}.sc{page-break-inside:avoid;border-top:1px solid #d5ddd8;padding-top:10px;margin-top:14px}ul{margin:6px 0;padding-left:18px}.m{color:#5b6b61}@media print{.bar{display:none}main{padding:0}}</style></head><body><div class="bar"><span>${esc(document.title)}</span><button onclick="window.print()">${esc(T("handout.print"))}</button></div><main>`;
  h += `<div class="cover"><div class="k" style="color:${THEME.accent}">${esc(tr(SCENES[0].k))}</div><h1>${esc(tr(SCENES[0].h))}</h1><p>${esc(tr(SCENES[0].p))}</p><p class="m" style="color:#86948C">${esc(date)}</p>${img ? `<img src="${img}" alt="">` : ""}</div>`;
  SCENES.slice(1).forEach((s, i) => {
    h += `<div class="sc"><div class="k">${i + 2} · ${esc(secLabel(s.sec))} · ${esc(tr(s.k))}</div><h2>${esc(tr(s.h))}</h2>`;
    if (s.p) h += `<p>${esc(tr(s.p))}</p>`;
    const d = s.d || {};
    const lists = [];
    const X = (window.SCENE_TYPES || {})[s.type];
    if (X && X.handout) { try { X.handout(s, d).forEach((l) => { if (l && l.length) lists.push(l); }); } catch (e) {} }
    else if (d.stats) lists.push(d.stats.map((x) => `${x.pre || ""}${x.v}${x.suf || ""} — ${tr(x.t)}${x.src ? ` (${x.src})` : ""}`));
    if (X && X.handout) { lists.forEach((l) => { h += `<ul>${l.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`; }); h += `</div>`; return; }
    if (d.items && s.type === "needs") lists.push(d.items.map((x) => `${tr(x[0])}: ${tr(x[1])}`));
    if (d.items && s.type === "benefits") lists.push(d.items.map((x) => `${tr(x.t)}: ${tr(x.d)}`));
    if (d.steps && s.type === "maturity") lists.push(d.steps.map((x) => `${tr(x.t)}: ${x.b.map(tr).join(", ")}`));
    if (d.steps && (s.type === "csc5" || s.type === "framework")) lists.push(d.steps.map((x) => `${tr(x.t)}: ${tr(x.d)}`));
    if (d.roads) lists.push(d.roads.map((x) => `${tr(x.t)} (${x.tag}): ${tr(x.for)} ${tr(x.want)}`));
    if (d.cols) lists.push(d.cols.map((x) => `${tr(x.t)}: ${(x.tools || x.b || []).map((y) => tr(y)).join(", ")}`));
    if (d.pillars) lists.push(d.pillars.map((x) => `${tr(x.t)}: ${tr(x.d)}`));
    if (d.how) lists.push(d.how.map((x) => `${tr(x.t)}: ${tr(x.d)}`));
    if (d.b && s.type === "n8n") lists.push(d.b.map(tr));
    if (d.cards) lists.push(d.cards.map((x) => `${tr(x.t)} (${tr(x.tag)}): ${tr(x.d)}`));
    if (s.type === "xchange") { lists.push(d.booth.map((x) => `${tr(x.t)}: ${tr(x.d)}`)); lists.push(d.steps.map((x) => `${tr(x.t)} — Adobe: ${x.a.map(tr).join(", ")}${x.alt.length ? ` · ${it ? "Alternativa" : "Alternative"}: ${x.alt.map(tr).join(", ")}` : ""}`)); }
    if (s.type === "costa") { lists.push([tr(d.need.intro)].concat(d.need.cards.map((x) => `${tr(x[0])}: ${tr(x[1])}`), [tr(d.need.also)])); lists.push([tr(d.solution.intro), tr(d.solution.outcome)].concat(d.solution.workflow.map(tr), d.solution.framework.map(tr))); lists.push([`${it ? "Prima" : "Before"}: ${d.before.map((x) => tr(x[0])).join(" → ")}`, `${it ? "Dopo" : "After"}: ${d.after.map((x) => tr(x[0])).join(" → ")}`].concat(d.kpis.map((k) => `${k.pre}${k.v}${k.u} ${tr(k.t)}: ${tr(k.d)}`), [tr(d.detail)])); }
    if (s.type === "story3") lists.push(d.steps.map((x) => `${tr(x.t)}: ${x.b.map(tr).join(" ")}`));
    if (d.blocks) lists.push(d.blocks.map((x) => `${tr(x.t)}: ${tr(x.d)}`).concat([d.tech.map(tr).join(", ")]));
    if (s.type === "avatars") lists.push(d.cap.map(tr).concat(d.val.map(tr)));
    if (d.one) lists.push([`${tr(d.one[0])}: ${tr(d.one[1])}`, `${tr(d.scale[0])}: ${tr(d.scale[1])}`]);
    lists.forEach((l) => { h += `<ul>${l.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`; });
    if (d.src) h += `<p class="m">${esc(T("source"))}: ${esc(d.src)}</p>`;
    h += `</div>`;
  });
  h += `<p class="m" style="margin-top:28px">${window.BRAND === "comwrap" ? "Comwrap Reply" : "Reply · Comwrap Reply"} · ${esc(date)}</p></main></body></html>`;
  const w = window.open("", "csc-handout"); if (!w) return;
  w.document.open(); w.document.write(h); w.document.close();
}
function toggleFull() { if (!document.fullscreenElement) { if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen(); } else if (document.exitFullscreen) document.exitFullscreen(); }

/* ---------- Language ---------- */
function setLang(l) {
  STATE.lang = l;
  document.documentElement.lang = l;
  document.querySelectorAll("[data-i18n]").forEach((e) => { e.textContent = T(e.dataset.i18n); });
  if (hintEl.dataset.key) hintEl.textContent = T(hintEl.dataset.key);
  renderLegend(); renderKeys();
  const keepCore = UI.core, keepPanel = STATE.panel;
  go(UI.i);
  if (keepCore) { setCore(true); if (keepPanel) openPanel(keepPanel); }
}
function renderLegend() {
  $("legend").innerHTML = `<h5>${esc(T("legend.title"))}</h5>
    <div><svg width="16" height="16"><circle cx="8" cy="8" r="4" fill="#030504" stroke="#F2F5F3" stroke-width="1.2"/></svg>${esc(T("legend.led"))}</div>
    <div><svg width="16" height="16"><circle cx="8" cy="8" r="4.5" fill="#030504" stroke="#C9D3CD" stroke-width="1.4"/><circle cx="8" cy="8" r="1.9" fill="#C9D3CD"/></svg>${esc(T("legend.hitl"))}</div>
    <div><svg width="16" height="16"><circle cx="8" cy="8" r="4.5" fill="#C9D3CD"/></svg>${esc(T("legend.hotl"))}</div>`;
}

/* ---------- Input ---------- */
function onKey(e) {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const k = e.key;
  if ($("regia") && regiaIsOpen()) {
    const typing = e.target && e.target.tagName === "TEXTAREA";
    if (k === "Escape" || ((k === "d" || k === "D") && !typing)) { e.preventDefault(); closeRegia(); }
    else if (k === "Tab") {
      const f = [...$("regia").querySelectorAll("button:not([disabled]), input, textarea, summary")].filter((x) => x.offsetParent !== null);
      if (f.length && e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (f.length && !e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
    return;
  }
  const modal = $("overview").classList.contains("show") || $("keysModal").classList.contains("show");
  if (modal && (k === "Escape" || k === "g" || k === "G" || k === "?")) { $("overview").classList.remove("show"); $("keysModal").classList.remove("show"); e.preventDefault(); return; }
  if (k === "ArrowRight" || k === " " || k === "PageDown") { e.preventDefault(); next(); }
  else if (k === "ArrowLeft" || k === "PageUp") { e.preventDefault(); prev(); }
  else if (k === "c" || k === "C") setCore(!UI.core);
  else if (k === "g" || k === "G") toggleOverview();
  else if (k === "l" || k === "L") setLang(STATE.lang === "en" ? "it" : "en");
  else if (k === "n" || k === "N") { UI.notes = !UI.notes; updateNotes(); }
  else if (k === "p" || k === "P") openPresenter();
  else if (k === "h" || k === "H") openHandout();
  else if (k === "f" || k === "F") toggleFull();
  else if (k === "?") $("keysModal").classList.add("show");
  else if (k === "b" || k === "B") nextBrand();
  else if (k === "d" || k === "D") openRegia();
  else if (k === "Escape") {
    if (document.body.classList.contains("emb-max")) { document.body.classList.remove("emb-max"); document.querySelectorAll(".emb-frame.max").forEach((f) => f.classList.remove("max")); }
    else if ($("menu").classList.contains("open")) $("menu").classList.remove("open");
    else if (STATE.panel) closePanel();
    else if (STATE.focus) leavePhase();
    else if (UI.core) setCore(false);
  }
}
function wire() {
  window.addEventListener("keydown", onKey);
  window.addEventListener("hashchange", () => { const id = (location.hash || "").replace("#", ""); if (id && id !== SCENES[UI.i].id) goId(id, { noReturn: true }); });
  $("prevBtn").addEventListener("click", prev);
  $("retBtn").addEventListener("click", () => { if (UI.ret) { const i = UI.ret.i; UI.ret = null; go(i); } });
  $("nextBtn").addEventListener("click", next);
  $("coreBtn").addEventListener("click", () => setCore(!UI.core));
  $("coreBack").addEventListener("click", () => setCore(false));
  $("ovBtn").addEventListener("click", toggleOverview);
  document.querySelectorAll("#langSeg button").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));
  $("moreBtn").addEventListener("click", (e) => { e.stopPropagation(); $("menu").classList.toggle("open"); });
  document.addEventListener("click", () => $("menu").classList.remove("open"));
  $("menu").querySelectorAll("[data-act]").forEach((b) => b.addEventListener("click", () => {
    const a = b.dataset.act;
    if (a === "notes") { UI.notes = !UI.notes; updateNotes(); }
    if (a === "presenter") openPresenter();
    if (a === "handout") openHandout();
    if (a === "full") toggleFull();
    if (a === "keys") $("keysModal").classList.add("show");
    if (a === "brand") nextBrand();
    if (a === "regia") openRegia();
    if (a === "lock") {
      try { Object.keys(localStorage).forEach((k) => { if (k.indexOf(`csc-unlock-${CFG.id}-`) === 0) localStorage.removeItem(k); }); } catch (e) {}
      location.reload();
    }
  }));
  if (window.CSC_PROTECTED) $("lockBtn").hidden = false;
  $("keysModal").addEventListener("click", () => $("keysModal").classList.remove("show"));
  if ($("regia")) $("regia").addEventListener("click", (e) => { if (e.target === $("regia")) closeRegia(); });
  $("overview").addEventListener("click", (e) => { if (e.target === $("overview")) $("overview").classList.remove("show"); });
  // Clicking the visible core from a split scene opens the core first.
  canvas.addEventListener("click", () => {
    if (!UI.core && SCENES[UI.i].layout === "split" && STATE.hover) setCore(true);
  }, true);
}

/* ---------- Boot ---------- */
function boot() {
  buildClient();
  mergeContent();
  const pl = PARAMS.get("lang");
  STATE.lang = pl === "it" || pl === "en" ? pl : (CFG.defaultLang || ((navigator.language || "").toLowerCase().startsWith("it") ? "it" : "en"));
  STATE.lite = PARAMS.has("lite");
  STATE.animSpeed = 1.1;
  document.documentElement.lang = STATE.lang;
  document.querySelectorAll("[data-i18n]").forEach((e) => { e.textContent = T(e.dataset.i18n); });
  wire();
  setHint("hint.wheel");
  renderLegend(); renderKeys();
  engineBoot();
  const hash = (location.hash || "").replace("#", "");
  const i = SCENES.findIndex((s) => s.id === hash);
  go(i >= 0 ? i : 0);
  if (PARAMS.has("regia")) openRegia();
}
let booted = false;
function bootOnce() { if (!booted) { booted = true; boot(); } }
if (document.fonts && document.fonts.ready) document.fonts.ready.then(bootOnce);
setTimeout(bootOnce, 800);
