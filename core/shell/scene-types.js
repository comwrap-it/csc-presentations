/* Extra scene types (Digital Experience Trends 2026 and reusable blocks).
   Each type: render(s, d) → HTML · mount(s, el, d) → behaviour · handout(s, d) → [[lines]] for the printable handout.
   Helpers (head, r, esc, tr, ul, T, STATE, setFocus, goId, later, every…) come from deck.js and are used at run time. */

window.REPLY_LOGO = '<svg class="rlogo" viewBox="0 0 466 440" fill="currentColor" aria-hidden="true"><path d="M167 58L196 81L299 100L176 226L3 250L31 279L203 277L249 251L333 315L349 433L376 432L377 298L303 201L378 107L347 58Z"/><circle cx="417" cy="44" r="45"/></svg>';
window.SCENE_TYPES = window.SCENE_TYPES || {};

(function () {
  const it = () => STATE.lang === "it";
  const has = (id) => !!id && SCENES.some((x) => x.id === id);
  const num = (st) => `${st.pre ? `<small>${esc(st.pre)}</small>` : ""}<span data-count="${st.v}"${st.dec ? ` data-dec="${st.dec}"` : ""}>0</span>${st.suf ? `<small>${esc(st.suf)}</small>` : ""}`;
  const fmtNum = (st) => `${st.pre || ""}${st.dec ? Number(st.v).toLocaleString(it() ? "it-IT" : "en-US", { minimumFractionDigits: st.dec }) : st.v}${st.suf || ""}`;
  const goBtn = (id, label, cls) => has(id) ? `<button type="button" class="${cls || "chip g"}" data-goid="${id}">${label} ↗</button>` : `<span class="${(cls || "chip").replace(" g", "")}">${label}</span>`;
  const wireGo = (el) => el.querySelectorAll("[data-goid]").forEach((b) => { if (!b._go) { b._go = 1; b.addEventListener("click", (e) => { e.stopPropagation(); goId(b.dataset.goid); }); } });
  const spotCycle = (s, ms) => { const n = ((s.core && s.core.spots) || []).length; if (n < 2) return; let k = 0; STATE.spotActive = 0; every(() => { k = (k + 1) % n; STATE.spotActive = k; }, ms || 2400); };
  const imgTag = (src, cls) => `<img class="${cls || ""}" src="${src}" alt="" loading="eager">`;
  const retrigger = (n) => { if (!n) return; n.style.animation = "none"; void n.offsetWidth; n.style.animation = ""; };

  /* ---------- About (tabs: group / network / team) ---------- */
  SCENE_TYPES.about = {
    render: (s, d) => `<div class="about"><div>${head(s)}<div class="tabs" ${r()}>${d.tabs.map((t, i) => `<button type="button" data-ab="${i}" class="${i ? "" : "on"}">${esc(tr(t.t))}</button>`).join("")}</div><div class="ab-txt" id="abTxt" ${r()}></div></div><div class="ab-media" id="abMedia" ${r()}></div></div>`,
    mount: (s, el, d) => {
      const pick = (i) => {
        const t = d.tabs[i];
        el.querySelectorAll("[data-ab]").forEach((b, k) => b.classList.toggle("on", k === i));
        const txt = el.querySelector("#abTxt"); txt.innerHTML = `<p class="lead">${esc(tr(t.lead))}</p>${ul(t.b)}`; retrigger(txt);
        const m = el.querySelector("#abMedia");
        m.innerHTML = t.logo ? `<div class="ab-logo">${COMWRAP_LOCKUP("ab-cw")}</div>` : imgTag(t.img);
        retrigger(m);
      };
      el.querySelectorAll("[data-ab]").forEach((b) => b.addEventListener("click", () => pick(+b.dataset.ab)));
      pick(0);
    },
    handout: (s, d) => d.tabs.map((t) => [`${tr(t.t)}: ${tr(t.lead)}`].concat(t.b.map(tr)))
  };

  /* ---------- Offering (4 practices + accelerators) ---------- */
  SCENE_TYPES.offering = {
    render: (s, d) => `${head(s)}<div class="off">${d.pillars.map((p, i) => `<div class="off-p card" data-pil="${i}" ${r(`--c:var(--${p.f})`)}><h4>${esc(tr(p.t))}</h4>${ul(p.b)}</div>`).join("")}</div><div class="off-band" ${r()}><h5>${esc(tr(d.band))}</h5><div class="chips">${d.accel.map((a) => goBtn(a.go, esc(tr(a.t)))).join("")}</div><p class="hint3">${esc(tr(d.hint))}</p></div>`,
    mount: (s, el, d) => {
      const ps = el.querySelectorAll("[data-pil]");
      const pick = (i) => { ps.forEach((p, k) => p.classList.toggle("on", k === i)); setFocus(d.pillars[i].f); };
      ps.forEach((p) => p.addEventListener("mouseenter", () => pick(+p.dataset.pil)));
      let k = 0; pick(0);
      every(() => { if (!el.matches(":hover")) { k = (k + 1) % ps.length; pick(k); } }, 2800);
      wireGo(el);
    },
    handout: (s, d) => d.pillars.map((p) => [`${tr(p.t)}: ${p.b.map(tr).join(", ")}`]).concat([[`${tr(d.band)}: ${d.accel.map((a) => tr(a.t)).join(", ")}`]])
  };

  /* ---------- Timeline ---------- */
  SCENE_TYPES.timeline = {
    render: (s, d) => `${head(s)}<div class="tl" ${r()}><div class="tl-line"><span class="tl-prog" id="tlProg"></span></div><div class="tl-ev" style="--n:${d.events.length}">${d.events.map((e, i) => `<button type="button" class="tl-e ${i % 2 ? "dn" : "up"} ${e.star ? "star" : ""}" data-ev="${i}"><b>${e.y}</b><i></i><span>${esc(tr(e.t))}</span></button>`).join("")}</div></div><div class="tl-ctrl" ${r()}><button type="button" class="btn pri" data-tlplay>▶ ${esc(T("play"))}</button></div><div class="tl-kpis" ${r()}>${d.kpis.map((k) => `<div class="kpi"><div class="v">${num(k)}</div><div class="t">${esc(tr(k.t))}</div></div>`).join("")}<div class="kpi facts">${d.facts.map((f) => `<span class="chip g">${esc(tr(f))}</span>`).join("")}${d.badge ? imgTag(d.badge, "badge-img") : ""}</div></div>`,
    mount: (s, el, d) => {
      const evs = el.querySelectorAll("[data-ev]"); const n = evs.length; let cur = -1, tick = null;
      const set = (i) => { cur = i; evs.forEach((e, k) => { e.classList.toggle("on", k <= i); e.classList.toggle("cur", k === i); }); el.querySelector("#tlProg").style.width = (n > 1 ? (i / (n - 1)) * 100 : 100) + "%"; };
      const stop = () => { if (tick) { clearInterval(tick); tick = null; } };
      const play = () => { stop(); set(0); tick = setInterval(() => { if (cur >= n - 1) { stop(); return; } set(cur + 1); }, 650); UI.intervals.push(tick); };
      evs.forEach((e) => e.addEventListener("click", () => { stop(); set(+e.dataset.ev); }));
      el.querySelector("[data-tlplay]").addEventListener("click", play);
      later(play, 500);
    },
    handout: (s, d) => [d.events.map((e) => `${e.y} — ${tr(e.t)}`), d.kpis.map((k) => `${fmtNum(k)} ${tr(k.t)}`).concat(d.facts.map(tr))]
  };

  /* ---------- Method (research cycle) ---------- */
  SCENE_TYPES.method = {
    render: (s, d) => `${head(s)}<div class="meth"><div class="meth-steps" ${r()}>${d.steps.map((st, i) => `<button type="button" class="mstep" data-ms="${i}"><span class="n">${i + 1}</span><span><h4>${esc(tr(st.t))}</h4></span></button>`).join("")}<div class="mloop">↺ ${it() ? "Growth matrix → approfondimenti" : "Growth matrix → deep dives"}</div></div><div><div class="card mdet" id="mDet" ${r()}></div><div class="mini-stat" ${r()}><div class="v">${num(d.big)}</div><div class="t">${esc(tr(d.big.t))}</div></div></div></div>`,
    mount: (s, el, d) => {
      const bs = el.querySelectorAll("[data-ms]"); let auto = true, k = 0;
      const pick = (i) => {
        const st = d.steps[i];
        bs.forEach((b, j) => b.classList.toggle("on", j === i));
        const det = el.querySelector("#mDet");
        det.innerHTML = `<div class="k">${i + 1} / ${d.steps.length}</div><h3>${esc(tr(st.t))}</h3><p>${esc(tr(st.d))}</p><div class="chips">${st.tools.map((t) => `<span class="chip g">${esc(tr(t))}</span>`).join("")}</div>`;
        retrigger(det);
        STATE.spotActive = Math.min(i, 2);
      };
      bs.forEach((b) => b.addEventListener("click", () => { auto = false; pick(+b.dataset.ms); }));
      pick(0);
      every(() => { if (auto) { k = (k + 1) % bs.length; pick(k); } }, 3400);
    },
    handout: (s, d) => [d.steps.map((st) => `${tr(st.t)}: ${tr(st.d)}`), [`${fmtNum(d.big)} ${tr(d.big.t)}`]]
  };

  /* ---------- Growth matrix (bubble chart) ---------- */
  const score = (p) => 0.6 * p.x + 0.2 * p.y + 0.2 * p.s;
  SCENE_TYPES.matrix = {
    render: (s, d) => {
      const M = window.TREND_MATRIX, W = 820, H = 520, px = (x) => 40 + x / 100 * (W - 60), py = (y) => H - 40 - y / 100 * (H - 60);
      const q = M.quad;
      let g = `<svg viewBox="0 0 ${W} ${H}" class="mx-svg">`;
      g += `<rect x="${px(50)}" y="${py(100)}" width="${px(100) - px(50)}" height="${py(50) - py(100)}" class="mx-q hot"/>`;
      g += `<line x1="${px(50)}" y1="${py(0)}" x2="${px(50)}" y2="${py(100)}" class="mx-mid"/><line x1="${px(0)}" y1="${py(50)}" x2="${px(100)}" y2="${py(50)}" class="mx-mid"/>`;
      g += `<rect x="${px(0)}" y="${py(100)}" width="${px(100) - px(0)}" height="${py(0) - py(100)}" class="mx-frame"/>`;
      g += `<text x="${px(99)}" y="${py(97)}" class="mx-ql" text-anchor="end">${esc(tr(q.tr.t)).toUpperCase()}</text><text x="${px(99)}" y="${py(2)}" class="mx-ql" text-anchor="end">${esc(tr(q.br.t)).toUpperCase()}</text><text x="${px(1)}" y="${py(97)}" class="mx-ql">${esc(tr(q.tl.t)).toUpperCase()}</text><text x="${px(1)}" y="${py(2)}" class="mx-ql">${esc(tr(q.bl.t)).toUpperCase()}</text>`;
      g += `<text x="${px(50)}" y="${H - 12}" class="mx-ax" text-anchor="middle">${esc(tr(d.axisX))} →</text><text x="16" y="${py(50)}" class="mx-ax" text-anchor="middle" transform="rotate(-90 16 ${py(50)})">${esc(tr(d.axisY))} →</text>`;
      M.points.map((p, i) => ({ p, i })).sort((a, b) => b.p.s - a.p.s).forEach(({ p, i }) => {
        g += `<circle class="mx-b ${p.f ? "f" : ""} ${p.n ? "n" : ""}" data-b="${i}" cx="${px(p.x)}" cy="${py(p.y)}" r="${(5 + p.s / 100 * 17).toFixed(1)}" style="animation-delay:${(i * 18)}ms"/>`;
      });
      g += `</svg>`;
      const filters = [["all", it() ? "Tutti" : "All"], ["f", it() ? "Focus topic" : "Focus topics"], ["n", it() ? "Nuovi nel 2026" : "New for 2026"], ["c1", "1 · Omnimodal"], ["c2", "2 · Supply chain"], ["c3", "3 · Data & gov."]];
      return `${head(s)}<div class="mx"><div class="mx-chart" ${r()}>${g}<div class="mx-tip" id="mxTip"></div></div><div class="mx-side" ${r()}><div class="mx-filters">${filters.map(([k, l], i) => `<button type="button" class="chip ${i ? "" : "on"}" data-mf="${k}">${esc(l)}</button>`).join("")}</div><div class="mx-list" id="mxList"></div><div class="mx-score"><h5>${it() ? "Trend momentum score" : "Trend momentum score"}</h5>${d.score.map((x) => `<div class="sc"><span>${esc(it() ? x[1] : x[0])}</span><i><em style="--w:${x[2]}%"></em></i><b>${x[2]}%</b></div>`).join("")}<p>${esc(tr(d.note))}</p></div></div></div>`;
    },
    mount: (s, el, d) => {
      const M = window.TREND_MATRIX, tip = el.querySelector("#mxTip"), list = el.querySelector("#mxList");
      const bub = el.querySelectorAll("[data-b]"); let filt = "all";
      const match = (p) => filt === "all" ? !!p.f : filt === "f" ? !!p.f : filt === "n" ? !!p.n : (p.f && "c" + p.c === filt);
      const quad = (p) => (p.y >= 50 ? "t" : "b") + (p.x >= 50 ? "r" : "l");
      const showTip = (i) => {
        const p = M.points[i], b = el.querySelector(`[data-b="${i}"]`); if (!b) return;
        const box = el.querySelector(".mx-chart").getBoundingClientRect(), bb = b.getBoundingClientRect();
        tip.innerHTML = `<b>${esc(p.t)}</b><span>${esc(tr(M.quad[quad(p)].t))}${p.n ? ` · ${it() ? "nuovo 2026" : "new 2026"}` : ""}${p.f ? " · focus" : ""}</span>`;
        tip.style.left = (bb.left - box.left + bb.width / 2) + "px"; tip.style.top = (bb.top - box.top) + "px"; tip.classList.add("on");
        bub.forEach((x) => x.classList.toggle("hl", +x.dataset.b === i));
        list.querySelectorAll("[data-li]").forEach((x) => x.classList.toggle("hl", +x.dataset.li === i));
      };
      const hideTip = () => { tip.classList.remove("on"); bub.forEach((x) => x.classList.remove("hl")); list.querySelectorAll("[data-li]").forEach((x) => x.classList.remove("hl")); };
      const apply = () => {
        el.querySelectorAll("[data-mf]").forEach((b) => b.classList.toggle("on", b.dataset.mf === filt));
        bub.forEach((b) => { const p = M.points[+b.dataset.b]; b.classList.toggle("dim", filt !== "all" && !match(p)); b.classList.toggle("sel", filt !== "all" && match(p)); });
        const items = M.points.map((p, i) => ({ p, i })).filter((o) => match(o.p)).sort((a, b) => score(b.p) - score(a.p));
        list.innerHTML = `<h5>${filt === "all" || filt === "f" ? (it() ? "Focus topic" : "Focus topics") : filt === "n" ? (it() ? "Nuovi nel 2026" : "New for 2026") : (it() ? "Focus topic del cluster" : "Cluster focus topics")} · ${items.length}</h5>${items.map((o) => `<button type="button" data-li="${o.i}"><span>${esc(o.p.t)}</span>${o.p.c ? `<em>${o.p.c}</em>` : ""}</button>`).join("")}`;
        list.querySelectorAll("[data-li]").forEach((x) => { x.addEventListener("mouseenter", () => showTip(+x.dataset.li)); x.addEventListener("mouseleave", hideTip); });
        setFocus(filt === "c1" ? "act" : filt === "c2" ? "make" : filt === "c3" ? "learn" : "learn");
      };
      bub.forEach((b) => { b.addEventListener("mouseenter", () => showTip(+b.dataset.b)); b.addEventListener("mouseleave", hideTip); b.addEventListener("click", () => showTip(+b.dataset.b)); });
      el.querySelectorAll("[data-mf]").forEach((b) => b.addEventListener("click", () => { filt = b.dataset.mf; apply(); }));
      apply();
    },
    handout: (s, d) => {
      const M = window.TREND_MATRIX;
      return [M.points.filter((p) => p.f).sort((a, b) => score(b) - score(a)).map((p) => `${p.t}${p.n ? (it() ? " (nuovo 2026)" : " (new 2026)") : ""}`), d.score.map((x) => `${it() ? x[1] : x[0]}: ${x[2]}%`)];
    }
  };

  /* ---------- Clusters (agenda hub) ---------- */
  SCENE_TYPES.clusters = {
    render: (s, d) => `${head(s)}<div class="clu">${window.TREND_CLUSTERS.map((c) => `<div class="clu-col" data-cf="${c.f}" ${r()}><button type="button" class="clu-head" ${has(c.id) ? `data-goid="${c.id}"` : "disabled"} style="background-image:url('${c.img}')"><span class="num">${c.n}</span><h3>${esc(tr(c.t))}</h3></button>${c.trends.map((t) => `<button type="button" class="clu-t ${has(t.go) ? "go" : ""}" ${has(t.go) ? `data-goid="${t.go}"` : "disabled"}><h4>${esc(tr(t.t))}${has(t.go) ? " <i>↗</i>" : ""}</h4><p>${esc(tr(t.d))}</p></button>`).join("")}</div>`).join("")}</div><p class="hint3" ${r()}>${esc(tr(d.hint))}</p>`,
    mount: (s, el) => {
      el.querySelectorAll("[data-cf]").forEach((c) => c.addEventListener("mouseenter", () => { setFocus(c.dataset.cf); el.querySelectorAll("[data-cf]").forEach((x) => x.classList.toggle("on", x === c)); }));
      wireGo(el);
    },
    handout: () => window.TREND_CLUSTERS.map((c) => [`${c.n} · ${tr(c.t)}`].concat(c.trends.map((t) => `${tr(t.t)}: ${tr(t.d)}`)))
  };

  /* ---------- Chapter opener (cover layout) ---------- */
  SCENE_TYPES.chapter = {
    render: (s, d) => {
      const c = (window.TREND_CLUSTERS || [])[d.n - 1];
      return `<div class="cover chap"><div class="chap-n" ${r()}>${d.n}</div>${head(s)}${c ? `<div class="chips" ${r()}>${c.trends.map((t) => goBtn(t.go, esc(tr(t.t)))).join("")}</div>` : ""}<div class="btns" ${r("margin-top:22px")}><button type="button" class="btn pri" data-next>${esc(T("next"))} →</button><button type="button" class="btn" data-goid="clusters">▦ ${it() ? "Tutti i cluster" : "All clusters"}</button></div></div>`;
    },
    mount: (s, el) => { el.querySelectorAll("[data-goid='clusters']").forEach((b) => { if (!has("clusters")) b.remove(); }); wireGo(el); },
    handout: (s, d) => { const c = (window.TREND_CLUSTERS || [])[d.n - 1]; return c ? [c.trends.map((t) => tr(t.t))] : []; }
  };

  /* ---------- Trend deep dive (definition · subtrends · why it matters) ---------- */
  SCENE_TYPES.trend = {
    render: (s, d) => `${head(s)}<div class="trd"><div class="card trd-def" ${r()}><h5>${esc(T("trend.def"))}</h5><p>${esc(tr(d.def))}</p>${d.stat ? `<div class="trd-stat"><div class="v">${num(d.stat)}</div><div class="t">${esc(tr(d.stat.t))}</div><div class="s">${esc(d.stat.src)}</div></div>` : ""}</div><div class="trd-subs" ${r()}><h5>${esc(T("trend.subs"))}</h5>${d.subs.map((x, i) => `<button type="button" class="trd-sub" data-sub="${i}"><h4>${esc(tr(x.t))}</h4>${x.d ? `<p>${esc(tr(x.d))}</p>` : ""}${x.b ? ul(x.b) : ""}</button>`).join("")}${d.line ? `<div class="trd-line">${esc(tr(d.line))}</div>` : ""}</div><div class="card trd-why" ${r()}><h5>${esc(T("trend.why"))}</h5>${ul(d.why)}</div></div>`,
    mount: (s, el, d) => {
      const bs = el.querySelectorAll("[data-sub]"); const ns = ((s.core && s.core.spots) || []).length; let auto = true, k = 0;
      const pick = (i) => { bs.forEach((b, j) => b.classList.toggle("on", j === i)); STATE.spotActive = ns ? Math.min(i, ns - 1) : null; };
      bs.forEach((b) => { b.addEventListener("click", () => { auto = false; pick(+b.dataset.sub); }); b.addEventListener("mouseenter", () => { auto = false; pick(+b.dataset.sub); }); });
      pick(0);
      every(() => { if (auto) { k = (k + 1) % bs.length; pick(k); } }, 3600);
    },
    handout: (s, d) => [[`${T("trend.def")}: ${tr(d.def)}`], d.subs.map((x) => `${tr(x.t)}: ${x.d ? tr(x.d) : x.b.map(tr).join("; ")}`), d.why.map(tr).concat(d.line ? [tr(d.line)] : []).concat(d.stat ? [`${fmtNum(d.stat)} ${tr(d.stat.t)} (${d.stat.src})`] : [])]
  };

  /* ---------- GEO before / today ---------- */
  SCENE_TYPES.geo = {
    render: (s, d) => `<div class="geo"><div>${head(s)}<div class="tabs" ${r()}>${d.modes.map((m, i) => `<button type="button" data-gm="${i}" class="${i ? "" : "on"}">${esc(tr(m.t))}</button>`).join("")}</div><p class="geo-cap" id="geoCap" ${r()}></p></div><div class="screen" ${r()}>${d.modes.map((m, i) => `<img src="${m.img}" alt="" data-gi="${i}" class="${i ? "" : "on"}">`).join("")}<span class="screen-tag" id="geoTag"></span></div></div>`,
    mount: (s, el, d) => {
      let auto = true, k = 0;
      const pick = (i) => {
        el.querySelectorAll("[data-gm]").forEach((b, j) => b.classList.toggle("on", j === i));
        el.querySelectorAll("[data-gi]").forEach((m, j) => m.classList.toggle("on", j === i));
        el.querySelector("#geoCap").textContent = tr(d.modes[i].d);
        el.querySelector("#geoTag").textContent = tr(d.modes[i].t);
        STATE.spotActive = i;
      };
      el.querySelectorAll("[data-gm]").forEach((b) => b.addEventListener("click", () => { auto = false; pick(+b.dataset.gm); }));
      pick(0);
      every(() => { if (auto) { k = (k + 1) % d.modes.length; pick(k); } }, 4200);
    },
    handout: (s, d) => [d.modes.map((m) => `${tr(m.t)}: ${tr(m.d)}`)]
  };

  /* ---------- Screenshots with tabs ---------- */
  SCENE_TYPES.shots = {
    render: (s, d) => `${head(s)}<div class="tabs" ${r()}>${d.tabs.map((t, i) => `<button type="button" data-sh="${i}" class="${i ? "" : "on"}">${i + 1} · ${esc(tr(t.t))}</button>`).join("")}</div><div class="shots" ${r()}><div class="screen light"><img id="shImg" src="${d.tabs[0].img}" alt=""></div><div class="card shot-txt"><div class="k" id="shK"></div><p id="shTxt"></p></div></div>`,
    mount: (s, el, d) => {
      const pick = (i) => {
        el.querySelectorAll("[data-sh]").forEach((b, j) => b.classList.toggle("on", j === i));
        const img = el.querySelector("#shImg"); img.src = d.tabs[i].img; retrigger(img);
        el.querySelector("#shK").textContent = tr(d.tabs[i].t); el.querySelector("#shTxt").textContent = tr(d.tabs[i].d);
        STATE.spotActive = i;
      };
      el.querySelectorAll("[data-sh]").forEach((b) => b.addEventListener("click", () => pick(+b.dataset.sh)));
      pick(0);
    },
    handout: (s, d) => [d.tabs.map((t) => `${tr(t.t)}: ${tr(t.d)}`)]
  };

  /* ---------- Product / accelerator (text + stats + media) ---------- */
  SCENE_TYPES.product = {
    render: (s, d) => {
      const media = d.img || d.video;
      const lists = (d.lists || []).map((l) => `<div class="card plist" ${r()}><h4>${esc(tr(l.t))}</h4>${l.p ? `<p>${esc(tr(l.p))}</p>` : ""}${l.b ? ul(l.b) : ""}</div>`).join("");
      return `<div class="prod ${media ? "" : "nomedia"}"><div class="prod-txt">${head(s)}${d.stats ? `<div class="pstats" ${r()}>${d.stats.map((st) => `<div class="pstat"><div class="v">${num(st)}</div><div class="t">${esc(tr(st.t))}</div></div>`).join("")}</div>` : ""}<div class="plists">${lists}</div>${d.note ? `<p class="pnote" ${r()}>${esc(tr(d.note))}</p>` : ""}</div>${media ? `<div class="pmedia ${d.contain ? "contain" : ""}" ${r()}>${d.logo ? imgTag(d.logo, "plogo") : ""}${d.video ? `<video src="${d.video}" muted loop playsinline autoplay preload="auto"></video>` : imgTag(d.img)}${d.badge ? imgTag(d.badge, "pbadge") : ""}</div>` : ""}</div>`;
    },
    mount: (s, el) => {
      const v = el.querySelector("video"); if (v) { const p = v.play(); if (p && p.catch) p.catch(() => {}); }
      spotCycle(s, 2600);
    },
    handout: (s, d) => [(d.stats || []).map((st) => `${fmtNum(st)} ${tr(st.t)}`)].concat((d.lists || []).map((l) => [`${tr(l.t)}: ${l.p ? tr(l.p) : ""}`].concat((l.b || []).map(tr)))).concat(d.note ? [[tr(d.note)]] : [])
  };

  /* ---------- Agent Orchestrator ---------- */
  SCENE_TYPES.orchestrator = {
    render: (s, d) => {
      const cx = 260, cy = 250, R0 = 165;
      let g = `<svg viewBox="0 0 520 500" class="orc-svg"><circle cx="${cx}" cy="${cy}" r="${R0}" class="orc-ring"/><circle cx="${cx}" cy="${cy}" r="${R0}" class="orc-ring2"/>`;
      d.agents.forEach((a, i) => {
        const ang = -Math.PI / 2 + i * Math.PI / 2, x = cx + Math.cos(ang) * R0, y = cy + Math.sin(ang) * R0;
        g += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" class="orc-ln" data-ol="${i}"/><circle r="5" class="orc-dot" data-od="${i}"><animateMotion dur="1.6s" repeatCount="indefinite" path="M${cx},${cy} L${x},${y}"/></circle>`;
      });
      d.agents.forEach((a, i) => {
        const ang = -Math.PI / 2 + i * Math.PI / 2, x = cx + Math.cos(ang) * R0, y = cy + Math.sin(ang) * R0;
        const words = tr(a).split(" "); const l1 = words.slice(0, Math.ceil(words.length / 2)).join(" "), l2 = words.slice(Math.ceil(words.length / 2)).join(" ");
        g += `<g class="orc-ag" data-oa="${i}"><rect x="${x - 78}" y="${y - 28}" width="156" height="56" rx="12"/><text x="${x}" y="${y - 3}">${esc(l1)}</text><text x="${x}" y="${y + 15}">${esc(l2)}</text></g>`;
      });
      g += `<g class="orc-c"><circle cx="${cx}" cy="${cy}" r="70"/><text x="${cx}" y="${cy - 2}">Agent</text><text x="${cx}" y="${cy + 18}">Orchestrator</text></g></svg>`;
      return `<div class="orc"><div>${head(s)}<div class="card" ${r()}><h4>${it() ? "Cos'è" : "What it is"}</h4>${ul(d.what)}</div><div class="card" ${r("margin-top:12px")}><h4>${it() ? "Perché conta" : "Why it matters"}</h4>${ul(d.why)}</div></div><div ${r()}>${g}</div></div>`;
    },
    mount: (s, el, d) => {
      let k = 0, auto = true;
      const pick = (i) => { el.querySelectorAll("[data-oa]").forEach((x, j) => x.classList.toggle("on", j === i)); el.querySelectorAll("[data-ol]").forEach((x, j) => x.classList.toggle("on", j === i)); el.querySelectorAll("[data-od]").forEach((x, j) => x.style.opacity = j === i ? 1 : 0); };
      el.querySelectorAll("[data-oa]").forEach((x) => x.addEventListener("click", () => { auto = false; pick(+x.dataset.oa); }));
      pick(0);
      every(() => { if (auto) { k = (k + 1) % d.agents.length; pick(k); } }, 1800);
    },
    handout: (s, d) => [[`${d.centre}: ${d.agents.map(tr).join(", ")}`], d.what.map(tr), d.why.map(tr)]
  };

  /* ---------- Customer case (tabs + flow + stats + image) ---------- */
  SCENE_TYPES.case = {
    render: (s, d) => `<div class="cs"><div>${head(s)}<div class="tabs" ${r()}>${d.tabs.map((t, i) => `<button type="button" data-cs="${i}" class="${i ? "" : "on"}">${esc(tr(t.t))}</button>`).join("")}</div><div class="cs-body" id="csBody" ${r()}></div></div><div class="cs-img" ${r()}>${imgTag(d.img)}</div></div>`,
    mount: (s, el, d) => {
      const body = el.querySelector("#csBody"); const ns = ((s.core && s.core.spots) || []).length; let tick = null;
      const stop = () => { if (tick) { clearInterval(tick); tick = null; } };
      const pick = (i) => {
        stop();
        const t = d.tabs[i];
        el.querySelectorAll("[data-cs]").forEach((b, j) => b.classList.toggle("on", j === i));
        let h = "";
        if (t.flow) h += `<div class="csflow" style="--n:${d.flow.length}">${d.flow.map((f, k) => `<div class="csf" data-cf2="${k}"><span class="ix">${k + 1}</span><h4>${esc(tr(f[0]))}</h4><p>${esc(tr(f[1]))}</p></div>`).join("")}</div><div class="xctrl" style="margin:10px 0 14px"><button type="button" class="btn pri" data-csplay>▶ ${esc(T("play"))}</button></div>`;
        if (t.p) h += t.p.map((p) => `<p class="cs-p">${esc(tr(p))}</p>`).join("");
        if (t.stats && d.stats) h += `<div class="pstats">${d.stats.map((st) => `<div class="pstat"><div class="v">${num(st)}</div><div class="t">${esc(tr(st.t))}</div></div>`).join("")}</div>`;
        if (t.b) h += ul(t.b);
        body.innerHTML = h; retrigger(body);
        countUp(body);
        STATE.spotActive = null;
        const fl = body.querySelectorAll("[data-cf2]");
        if (fl.length) {
          let cur = -1;
          const set = (k) => { cur = k; fl.forEach((f, j) => { f.classList.toggle("on", j === k); f.classList.toggle("done", j < k); }); STATE.spotActive = ns ? Math.min(Math.round(k * (ns - 1) / Math.max(1, fl.length - 1)), ns - 1) : null; };
          const play = () => { stop(); set(0); tick = setInterval(() => { if (cur >= fl.length - 1) { stop(); return; } set(cur + 1); }, 1700); UI.intervals.push(tick); };
          fl.forEach((f) => f.addEventListener("click", () => { stop(); set(+f.dataset.cf2); }));
          body.querySelector("[data-csplay]").addEventListener("click", play);
          play();
        }
      };
      el.querySelectorAll("[data-cs]").forEach((b) => b.addEventListener("click", () => pick(+b.dataset.cs)));
      pick(0);
    },
    handout: (s, d) => d.tabs.map((t) => [`${tr(t.t)}:`].concat(t.flow ? d.flow.map((f) => `${tr(f[0])} — ${tr(f[1])}`) : []).concat((t.p || []).map(tr)).concat(t.stats && d.stats ? d.stats.map((st) => `${fmtNum(st)} ${tr(st.t)}`) : []).concat((t.b || []).map(tr)))
  };

  /* ---------- Agent flow with human review ---------- */
  SCENE_TYPES.agentflow = {
    render: (s, d) => {
      const nodes = [`<div class="afn start" data-afn="0"><span class="ix">●</span><h4>${esc(tr(d.start))}</h4></div>`];
      d.steps.forEach((st, i) => {
        nodes.push(`<div class="afn ai" data-afn="${nodes.length}"><span class="ix">${esc(tr(d.agent))} · ${i + 1}</span><h4>${esc(tr(st.t))}</h4><span class="chip g">${esc(tr(st.tool))}</span></div>`);
        nodes.push(`<div class="afn hr" data-afn="${nodes.length}"><span class="ix">✓</span><h4>${esc(tr(d.review))}</h4></div>`);
      });
      nodes.push(`<div class="afn end" data-afn="${nodes.length}"><span class="ix">★</span><h4>${esc(tr(d.end))}</h4></div>`);
      return `${head(s)}<div class="af" ${r(`--n:${nodes.length}`)}>${nodes.join("")}</div><div class="xctrl" ${r()}><button type="button" class="btn pri" data-afplay>▶ ${esc(T("play"))}</button><span class="chip">${it() ? "3 agenti AI · 3 revisioni umane" : "3 AI agents · 3 human reviews"}</span></div>`;
    },
    mount: (s, el) => {
      const ns = el.querySelectorAll("[data-afn]"); let cur = -1, tick = null;
      const set = (k) => { cur = k; ns.forEach((n, j) => { n.classList.toggle("on", j === k); n.classList.toggle("done", j < k); }); const node = ns[k]; STATE.spotActive = node.classList.contains("hr") ? 3 : node.classList.contains("ai") ? Math.floor((k - 1) / 2) : null; };
      const stop = () => { if (tick) { clearInterval(tick); tick = null; } };
      const play = () => { stop(); set(0); tick = setInterval(() => { if (cur >= ns.length - 1) { stop(); return; } set(cur + 1); }, 1300); UI.intervals.push(tick); };
      ns.forEach((n) => n.addEventListener("click", () => { stop(); set(+n.dataset.afn); }));
      el.querySelector("[data-afplay]").addEventListener("click", play);
      later(play, 600);
    },
    handout: (s, d) => [[tr(d.start)].concat(d.steps.map((st, i) => `${tr(d.agent)} ${i + 1}: ${tr(st.t)} (${tr(st.tool)}) → ${tr(d.review)}`)).concat([tr(d.end)])]
  };

  /* ---------- CJA diagram ---------- */
  SCENE_TYPES.cja = {
    render: (s, d) => `<div class="cja"><div>${head(s)}<div class="tabs" ${r()}>${d.views.map((v, i) => `<button type="button" data-cv="${i}" class="${i ? "" : "on"}">${esc(tr(v.t))}</button>`).join("")}</div><div class="chips" ${r()}>${d.caps.map((c) => `<span class="chip g">${esc(tr(c))}</span>`).join("")}</div></div><div class="cja-dia" id="cjaDia" ${r()}></div></div>`,
    mount: (s, el, d) => {
      const box = el.querySelector("#cjaDia");
      const draw = (vi) => {
        const v = d.views[vi], W = 640, H = 440, cx = W / 2, cy = H / 2;
        el.querySelectorAll("[data-cv]").forEach((b, j) => b.classList.toggle("on", j === vi));
        let g = `<svg viewBox="0 0 ${W} ${H}"><defs><clipPath id="cjaClip"><circle cx="${cx}" cy="${cy}" r="78"/></clipPath></defs>`;
        const col = (items, x, side) => items.forEach((it2, i) => {
          const y = 60 + i * ((H - 120) / (items.length - 1));
          g += `<path d="M${x} ${y} C ${(x + cx) / 2} ${y}, ${(x + cx) / 2} ${cy}, ${cx + (side < 0 ? -80 : 80)} ${cy}" class="cja-ln"/>`;
          g += `<circle r="3.5" class="cja-dot"><animateMotion dur="${2.2 + i * 0.3}s" repeatCount="indefinite" path="M${x} ${y} C ${(x + cx) / 2} ${y}, ${(x + cx) / 2} ${cy}, ${cx + (side < 0 ? -80 : 80)} ${cy}"/></circle>`;
          g += `<g class="cja-node"><rect x="${x - (side < 0 ? 110 : 0)}" y="${y - 16}" width="110" height="32" rx="16"/><text x="${x - (side < 0 ? 55 : -55)}" y="${y + 4}">${esc(tr(it2))}</text></g>`;
        });
        col(v.left, 120, -1); col(v.right, W - 120, 1);
        if (v.lt) g += `<text x="65" y="22" class="cja-hd">${esc(tr(v.lt)).toUpperCase()}</text><text x="${W - 65}" y="22" class="cja-hd">${esc(tr(v.rt)).toUpperCase()}</text>`;
        g += `<circle cx="${cx}" cy="${cy}" r="86" class="cja-c"/><image href="${d.img}" x="${cx - 110}" y="${cy - 80}" width="220" height="${220 * 467 / 700}" clip-path="url(#cjaClip)" preserveAspectRatio="xMidYMid slice"/><circle cx="${cx}" cy="${cy}" r="86" class="cja-c2"/><text x="${cx}" y="${cy + 112}" class="cja-lbl">Customer Journey Analytics</text></svg>`;
        box.innerHTML = g; retrigger(box);
        STATE.spotActive = vi;
      };
      el.querySelectorAll("[data-cv]").forEach((b) => b.addEventListener("click", () => draw(+b.dataset.cv)));
      draw(0);
    },
    handout: (s, d) => d.views.map((v) => [`${tr(v.t)}: ${v.left.map(tr).join(", ")} | ${v.right.map(tr).join(", ")}`]).concat([d.caps.map(tr)])
  };

  /* ---------- Sources → hub → outputs ---------- */
  SCENE_TYPES.sources = {
    render: (s, d) => `${head(s)}<div class="srcs"><div class="srcs-in">${d.sources.map((x, i) => `<button type="button" class="card src-t" data-src="${i}" ${r()}><h4>${esc(tr(x.t))}</h4><p>${esc(tr(x.d))}</p></button>`).join("")}</div><div class="srcs-arrow" ${r()}><i></i><i></i><i></i></div><div class="srcs-hub" ${r()}><div class="hub">${esc(d.hub)}</div>${d.outs.map((o) => `<div class="out">${esc(tr(o))}</div>`).join("")}</div></div><p class="pnote" ${r()}>${esc(tr(d.foot))}</p>`,
    mount: (s, el) => {
      const ts = el.querySelectorAll("[data-src]"); let k = 0;
      const pick = (i) => { ts.forEach((t, j) => t.classList.toggle("on", j === i)); el.querySelector(".srcs-hub").classList.add("pulse"); STATE.spotActive = i === 0 ? 0 : 1; };
      ts.forEach((t) => t.addEventListener("mouseenter", () => pick(+t.dataset.src)));
      pick(0);
      every(() => { if (!el.matches(":hover")) { k = (k + 1) % ts.length; pick(k); } }, 2400);
    },
    handout: (s, d) => [d.sources.map((x) => `${tr(x.t)}: ${tr(x.d)}`), [`${d.hub} → ${d.outs.map(tr).join("; ")}`, tr(d.foot)]]
  };
})();
