/* Constellation engine — canvas rendering of the operating model. */

const canvas = document.getElementById("sky");
const ctx = canvas.getContext("2d");
const ORBIT_OPACITY = 0.8;
const BRAIN_OPACITY = 0.8;
const backBtn = document.getElementById("back");
const hintEl = document.getElementById("hint");
const sheetEl = document.getElementById("sheet");



/* Theme: Reply defaults, overridable per client (clients/<id>/client.json → theme). */
const THEME = Object.assign({
  accent: "#01EB51", intel: "#E3F562", make: "#01EB51", act: "#22D3C5", learn: "#9FD8FF",
  canvas: "#030504", hub: "#0C1410", muted: "#8E9A93", bg2: "#07100A"
}, (window.BRANDS && window.BRANDS[window.BRAND]) || {}, ((window.CLIENT_CONFIG || {}).theme) || {});
function rgbaOf(hex, a) {
  const h = String(hex).replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

const PHASES = [
  {
    id: "intel",
    name: "STRATEGIC INTELLIGENCE",
    sub: "demand · plan · brief", subIt: "domanda · piano · brief",
    color: THEME.intel,
    angle: -Math.PI / 2,
    icon: "compass",
    seed: 1103,
    functions: [
      { name: "Demand", jobs: [
        { t: "request intake", auto: true },
        { t: "stakeholder map", auto: false },
        { t: "priority vs calendar", auto: false }
      ]},
      { name: "Brand codes", jobs: [
        { t: "platform & voice", auto: false },
        { t: "claim library", auto: true },
        { t: "do-nots", auto: false }
      ]},
      { name: "Audiences", jobs: [
        { t: "segment evidence", auto: true },
        { t: "tension / JTBD", auto: false },
        { t: "persona depth", auto: false }
      ]},
      { name: "Markets", jobs: [
        { t: "category signals", auto: true },
        { t: "competitive scan", auto: true },
        { t: "market matrix", auto: false }
      ]},
      { name: "Proof", jobs: [
        { t: "product truth", auto: false },
        { t: "substantiation", auto: false },
        { t: "offer lock", auto: false }
      ]},
      { name: "Plan", jobs: [
        { t: "channel hypothesis", auto: true },
        { t: "journey moments", auto: false },
        { t: "constraints pack", auto: true }
      ]},
      { name: "Brief", jobs: [
        { t: "creative brief", auto: false },
        { t: "comms / legal pack", auto: false },
        { t: "next-cycle intake", auto: true }
      ]}
    ]
  },
  {
    id: "make",
    name: "CREATIVE PRODUCTION",
    sub: "agency craft", subIt: "mestiere d'agenzia",
    color: THEME.make,
    angle: 0,
    icon: "layers",
    seed: 2741,
    functions: [
      { name: "Routes", jobs: [
        { t: "route scamps", auto: false },
        { t: "territory lock", auto: false },
        { t: "art direction", auto: false }
      ]},
      { name: "Hero", jobs: [
        { t: "hero still", auto: false },
        { t: "hero film", auto: false },
        { t: "master line", auto: false }
      ]},
      { name: "Copy", jobs: [
        { t: "headlines & lines", auto: false },
        { t: "scripts / VO", auto: false },
        { t: "disclaimers", auto: true }
      ]},
      { name: "Long copy", jobs: [
        { t: "page copy", auto: false },
        { t: "journey copy", auto: false },
        { t: "document copy", auto: false }
      ]},
      { name: "Hub", jobs: [
        { t: "series extensions", auto: false },
        { t: "always-on", auto: false },
        { t: "DAM pull", auto: true }
      ]},
      { name: "QA", jobs: [
        { t: "brand QA", auto: false },
        { t: "spec QA", auto: true },
        { t: "master pack", auto: false }
      ]}
    ]
  },
  {
    id: "act",
    name: "INTELLIGENT ACTIVATION",
    sub: "spend · social · launch", subIt: "spesa · social · lancio",
    color: THEME.act,
    angle: Math.PI / 2,
    icon: "play",
    seed: 5188,
    functions: [
      { name: "Spend", jobs: [
        { t: "allocate", auto: false },
        { t: "book channels", auto: false },
        { t: "pacing", auto: true }
      ]},
      { name: "Up-format", jobs: [
        { t: "sizes & crops", auto: true },
        { t: "languages", auto: true },
        { t: "placement specs", auto: true }
      ]},
      { name: "Social", jobs: [
        { t: "organic calendar", auto: false },
        { t: "paid social", auto: true },
        { t: "amplify winners", auto: true }
      ]},
      { name: "Paid", jobs: [
        { t: "search", auto: true },
        { t: "programmatic", auto: true },
        { t: "retail & affiliate", auto: false }
      ]},
      { name: "Owned", jobs: [
        { t: "site & SEO", auto: false },
        { t: "email & CRM", auto: true },
        { t: "facelift", auto: false }
      ]},
      { name: "Orchestrate", jobs: [
        { t: "journeys", auto: false },
        { t: "personalization", auto: true },
        { t: "in-flight", auto: true }
      ]},
      { name: "Launch", jobs: [
        { t: "launch gates", auto: false },
        { t: "brand control", auto: false },
        { t: "handoff to Learn", auto: true }
      ]}
    ]
  },
  {
    id: "learn",
    name: "DATA INSIGHT",
    sub: "insights write back", subIt: "gli insight tornano nel Brain",
    color: THEME.learn,
    angle: Math.PI,
    icon: "ring",
    seed: 9337,
    functions: [
      { name: "Ingest", jobs: [
        { t: "learn packet", auto: true },
        { t: "join & clean", auto: true },
        { t: "KPI dictionary", auto: false }
      ]},
      { name: "Models", jobs: [
        { t: "incrementality", auto: false },
        { t: "mix models", auto: true },
        { t: "scenarios", auto: true }
      ]},
      { name: "Brand", jobs: [
        { t: "brand tracking", auto: false },
        { t: "equity model", auto: true },
        { t: "content scores", auto: true }
      ]},
      { name: "Journeys", jobs: [
        { t: "pathing", auto: true },
        { t: "friction", auto: false },
        { t: "increment paths", auto: false }
      ]},
      { name: "Behavior", jobs: [
        { t: "segments", auto: true },
        { t: "location analytics", auto: true },
        { t: "sales intelligence", auto: false }
      ]},
      { name: "Signals", jobs: [
        { t: "trend radar", auto: true },
        { t: "market listening", auto: true },
        { t: "competitive watch", auto: true }
      ]},
      { name: "Write back", jobs: [
        { t: "forecast", auto: true },
        { t: "next-cycle brief", auto: true },
        { t: "recommendation", auto: false }
      ]}
    ]
  }
];

const STATE = {
  w: 0, h: 0, dpr: 1, t: 0, cx: 0, cy: 0, radius: 0,
  _hover: null,
  get hover() { return this._hover || this.storyFocus; },
  set hover(v) { this._hover = v; },
  storyFocus: null,
  coworkerLift: 0,
  autoView: 2, autoTarget: 2,
  agents: false, agentsA: 0,
  loopBoost: 0, loopTarget: 0,
  coreFlash: 0,
  lang: "en", lite: false, spots: [], shiftX: 0, labelLift: 1, headerA: 1, labelScale: 1, labelsA: 1,
  
  hoverFn: null,
  panel: null,
  lifts: { intel: 0, make: 0, act: 0, learn: 0 },
  coreLift: 0,
  ringLift: 0,
  demandLift: 0,
  panelShift: 0,
  mode: "wheel",
  focus: null,
  rot: 0,
  rotFrom: 0,
  rotTo: 0,
  anim: 0,
  constellations: [],
  detail: null,
  nucleus: [],
  nucleusLinks: [],
  carriers: [],
  stars: [],
  reduceMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches
};

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function lerp(a, b, t) { return a + (b - a) * t; }
function ease(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}
function blend() {
  if (STATE.mode === "phase") return 1;
  if (STATE.mode === "enter") return ease(STATE.anim);
  if (STATE.mode === "exit") return 1 - ease(STATE.anim);
  return 0;
}
function wrapPi(a) {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}

function resize() {
  STATE.dpr = Math.min(window.devicePixelRatio || 1, 2);
  STATE.w = window.innerWidth;
  STATE.h = window.innerHeight;
  canvas.width = Math.floor(STATE.w * STATE.dpr);
  canvas.height = Math.floor(STATE.h * STATE.dpr);
  canvas.style.width = STATE.w + "px";
  canvas.style.height = STATE.h + "px";
  ctx.setTransform(STATE.dpr, 0, 0, STATE.dpr, 0, 0);
  layout();
}

function currentRot() {
  if (STATE.anim <= 0) return STATE.rot;
  return STATE.rotFrom + wrapPi(STATE.rotTo - STATE.rotFrom) * ease(STATE.anim);
}

function hubPos(phase, rot) {
  const a = phase.angle + rot;
  return {
    x: STATE.cx + Math.cos(a) * STATE.radius,
    y: STATE.cy + Math.sin(a) * STATE.radius,
    a
  };
}

function layout() {
  const m = Math.min(STATE.w, STATE.h);
  STATE.cx = panelCentreX();
  STATE.cy = STATE.h * 0.51;
  STATE.radius = m * 0.22;
  buildWheelTrees();
  buildDetail();
  buildNucleus();
  buildStars();
  buildCarriers();
}

function panelCentreX() {
  // Centre the active constellation in the unobscured area beside the left sheet.
  const sheetRight = Math.min(432, STATE.w * 0.46);
  return panelCentreXFor(STATE.panelShift);
}

function updatePanelShift(nextShift) {
  const nextCx = panelCentreXFor(nextShift);
  const dx = nextCx - STATE.cx;
  STATE.panelShift = nextShift;
  STATE.cx = nextCx;
  if (!dx || !STATE.detail) return;
  Object.values(STATE.detail).forEach((detail) => {
    detail.nodes.forEach((node) => {
      node.x += dx;
      node.ox += dx;
      if (node._dx !== undefined) node._dx += dx;
    });
  });
}

function panelCentreXFor(shift) {
  const sheetRight = Math.min(432, STATE.w * 0.46);
  return STATE.w * 0.5 + sheetRight * 0.5 * shift + STATE.w * (STATE.shiftX || 0);
}

function leafLabels(phase) {
  return phase.functions.flatMap((f) => f.jobs.map((j) => j.t));
}

function buildWheelTrees() {
  const scale = Math.min(STATE.w, STATE.h) / 1040;
  STATE.constellations = PHASES.map((phase) => {
    const nodes = [];
    const links = [];
    const named = [];
    const hub = { x: 0, y: 0, r: 19 * scale, kind: "hub", color: phase.color, phase: phase.id };
    nodes.push(hub);
    const fns = phase.functions;
    const spread = Math.min(1.55, 0.24 * Math.max(fns.length, 2));
    const flenBase = 32 * scale;
    const step = 20 * scale;
    const zigAmt = 11 * scale;

    fns.forEach((fn, i) => {
      const t = fns.length === 1 ? 0.5 : i / (fns.length - 1);
      const ang = (t - 0.5) * spread;
      const flen = flenBase + (i % 2) * 8 * scale;
      const fx = Math.cos(ang) * flen;
      const fy = Math.sin(ang) * flen;
      const fnode = {
        x: fx, y: fy, ox: fx, oy: fy, drift: i,
        r: 3.4 * scale, kind: "fn", color: phase.color,
        phase: phase.id, alpha: 1, label: fn.name,
        id: `${phase.id}::fn::${slug(fn.name)}`
      };
      nodes.push(fnode);
      links.push({ a: hub, b: fnode });
      named.push({ node: fnode, text: fn.name, kind: "fn" });

      let prev = fnode;
      let dir = ang;
      const branchSign = i < fns.length / 2 ? -1 : 1;
      fn.jobs.forEach((job, j) => {
        const zig = ((j % 2 === 0) ? 1 : -1) * branchSign;
        dir = ang + zig * 0.32;
        const px = -Math.sin(dir);
        const py = Math.cos(dir);
        const jx = prev.ox + Math.cos(dir) * step + px * zigAmt * 0.5;
        const jy = prev.oy + Math.sin(dir) * step + py * zigAmt * 0.5;
        const jnode = {
          x: jx, y: jy, ox: jx, oy: jy, drift: i * 10 + j,
          r: 2.2 * scale,
              cls: jobClass(`${phase.id}::job::${slug(job.t)}`),
              fnId: `${phase.id}::fn::${slug(fn.name)}`,
              kind: job.auto ? "accent" : "plain",
          color: job.auto ? phase.color : "#F4EFE8",
          phase: phase.id, alpha: 0.92, label: job.t,
          id: `${phase.id}::job::${slug(job.t)}`
        };
        nodes.push(jnode);
        links.push({ a: prev, b: jnode });
        named.push({ node: jnode, text: job.t, kind: "job" });
        prev = jnode;
      });
    });

    return { phase, hub, nodes, links, named };
  });
}

function buildDetail() {
  const m = Math.min(STATE.w, STATE.h);
  const scale = m / 980;
  STATE.detail = {};
  PHASES.forEach((phase) => {
    const hub = {
      x: STATE.cx,
      y: STATE.h * 0.78,
      r: 22 * scale,
      kind: "hub",
      color: phase.color,
      phase: phase.id
    };
    const nodes = [hub];
    const links = [];
    const named = [];
    const fns = phase.functions;
    const spread = Math.min(2.7, 0.42 * Math.max(fns.length, 2));
    const flenBase = (fns.length > 5 ? 132 : 150) * scale;
    const step = 92 * scale;
    const zigAmt = 52 * scale;

    fns.forEach((fn, i) => {
      const t = fns.length === 1 ? 0.5 : i / (fns.length - 1);
      const ang = -Math.PI / 2 + (t - 0.5) * spread;
      const flen = flenBase + (i % 2) * 36 * scale;
      const fx = hub.x + Math.cos(ang) * flen;
      const fy = hub.y + Math.sin(ang) * flen;
      const fid = `${phase.id}::fn::${slug(fn.name)}`;
      const fnode = {
        x: fx, y: fy, ox: fx, oy: fy, drift: i,
        r: 8.4 * scale, kind: "fn", color: phase.color,
        phase: phase.id, alpha: 1, label: fn.name,
        id: fid
      };
      nodes.push(fnode);
      links.push({ a: hub, b: fnode });
      named.push({
        node: fnode, text: fn.name, kind: "fn",
        side: Math.cos(ang) >= 0 ? "right" : "left"
      });

      let prev = fnode;
      let dir = ang;
      const branchSign = i < fns.length / 2 ? -1 : 1;
      fn.jobs.forEach((job, j) => {
        const zig = ((j % 2 === 0) ? 1 : -1) * branchSign;
        dir = ang + zig * 0.38;
        const px = -Math.sin(dir);
        const py = Math.cos(dir);
        const jx = prev.x + Math.cos(dir) * step + px * zigAmt * 0.55;
        const jy = prev.y + Math.sin(dir) * step + py * zigAmt * 0.55;
        const jnode = {
          x: jx, y: jy, ox: jx, oy: jy, drift: i * 10 + j,
          r: 3.5 * scale,
              cls: jobClass(`${phase.id}::job::${slug(job.t)}`),
              kind: job.auto ? "accent" : "plain",
          color: job.auto ? phase.color : "#F4EFE8",
          phase: phase.id, alpha: 0.95, label: job.t,
          fnId: fid,
          id: `${phase.id}::job::${slug(job.t)}`
        };
        nodes.push(jnode);
        links.push({ a: prev, b: jnode });
        named.push({
          node: jnode, text: job.t, kind: "job",
          side: zig > 0 ? "right" : "left"
        });
        prev = jnode;
      });
    });
    STATE.detail[phase.id] = { phase, hub, nodes, links, named };
  });
}

function buildCarriers() {
  STATE.carriers = [];
  PHASES.forEach((phase) => {
    for (let i = 0; i < 3; i++) {
      STATE.carriers.push({
        phase: phase.id,
        u: (i / 3) + (phase.seed % 7) * 0.01,
        dir: i % 2 === 0 ? 1 : -1,
        speed: 0.18 + i * 0.045
      });
    }
  });
}

function visualHub(phase, rot) {
  const wheel = hubPos(phase, rot);
  const b = blend();
  if (STATE.focus === phase.id && STATE.detail[STATE.focus]) {
    const dest = STATE.detail[STATE.focus].hub;
    return { x: lerp(wheel.x, dest.x, b), y: lerp(wheel.y, dest.y, b) };
  }
  return { x: wheel.x, y: wheel.y };
}

function spokeEnds(phase, rot) {
  const hub = visualHub(phase, rot);
  const dx = hub.x - STATE.cx;
  const dy = hub.y - STATE.cy;
  const dist = Math.hypot(dx, dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  const inner = Math.min(STATE.w, STATE.h) * 0.072;
  return {
    x0: STATE.cx + ux * inner,
    y0: STATE.cy + uy * inner,
    x1: hub.x - ux * 20,
    y1: hub.y - uy * 20
  };
}

function drawFlows(rot, t, dt) {
  if (STATE.reduceMotion) dt = 0;
  STATE.carriers.forEach((c) => {
    c.u += c.speed * dt * c.dir * (1 + 1.6 * STATE.loopBoost);
    if (c.u >= 1) { c.u = 1; c.dir = -1; }
    if (c.u <= 0) { c.u = 0; c.dir = 1; }
  });

  const anyone = STATE.mode === "wheel" && !!(STATE.hover || STATE.panel);
  const b = blend();

  PHASES.forEach((phase) => {
    const s = spokeEnds(phase, rot);
    const lift = STATE.lifts[phase.id] || 0;
    const core = STATE.coreLift;
    const focused = STATE.focus === phase.id;
    const alpha = focused
      ? 0.85 * (1 - Math.max(0, (b - 0.78) / 0.22))
      : (anyone ? lerp(0.25, 1, Math.max(lift, core)) : 1) * (1 - b);
    if (alpha < 0.02) return;
    ctx.save();
    ctx.globalAlpha = alpha * (focused ? 0.75 : 0.55);
    ctx.strokeStyle = phase.color;
    ctx.lineWidth = focused ? 1 : 0.7;
    ctx.beginPath();
    ctx.moveTo(s.x0, s.y0);
    ctx.lineTo(s.x1, s.y1);
    ctx.stroke();
    ctx.restore();
  });

  STATE.carriers.forEach((c) => {
    const phase = PHASES.find((p) => p.id === c.phase);
    const s = spokeEnds(phase, rot);
    const easeU = c.u * c.u * (3 - 2 * c.u);
    const x = lerp(s.x0, s.x1, easeU);
    const y = lerp(s.y0, s.y1, easeU);
    const lift = STATE.lifts[phase.id] || 0;
    const focused = STATE.focus === phase.id;
    const alpha = focused
      ? 0.9 * (1 - Math.max(0, (b - 0.78) / 0.22))
      : (anyone ? lerp(0.25, 1, Math.max(lift, STATE.coreLift)) : 1) * (1 - b);
    if (alpha < 0.02) return;
    const outbound = c.dir > 0;
    const r = (outbound ? 1.7 : 2.05) * (1 + (outbound ? 0.6 : 1.4) * STATE.loopBoost);
    ctx.save();
    ctx.globalAlpha = alpha * (outbound ? 0.7 : 0.9);
    ctx.fillStyle = outbound ? THEME.accent : phase.color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
}

function buildNucleus() {
  const rand = mulberry32(42);
  const colors = PHASES.map((p) => p.color).concat([THEME.accent, THEME.accent, "#F2F5F3", THEME.act]);
  const cloudR = Math.min(STATE.w, STATE.h) * 0.086;
  STATE.nucleus = [];
  for (let i = 0; i < 260; i++) {
    const a = rand() * Math.PI * 2;
    const r = Math.pow(rand(), 0.5) * cloudR;
    STATE.nucleus.push({
      a, r, speed: 0.07 + rand() * 0.24,
      size: 0.55 + rand() * 1.8,
      color: colors[Math.floor(rand() * colors.length)],
      twinkle: rand() * Math.PI * 2
    });
  }
  STATE.nucleusLinks = [];
  for (let i = 0; i < 100; i++) {
    const a = Math.floor(rand() * STATE.nucleus.length);
    const b = Math.floor(rand() * STATE.nucleus.length);
    if (a !== b) STATE.nucleusLinks.push([a, b]);
  }
}

function buildStars() {
  const rand = mulberry32(7);
  STATE.stars = [];
  const n = Math.floor((STATE.w * STATE.h) / 2600);
  for (let i = 0; i < n; i++) {
    STATE.stars.push({
      x: rand() * STATE.w, y: rand() * STATE.h,
      a: 0.035 + rand() * 0.11, s: rand() < 0.07 ? 1.15 : 0.65
    });
  }
}

function nucleusXY(p, t) {
  const wobble = STATE.reduceMotion ? 0 : Math.sin(t * p.speed + p.twinkle) * 3.5;
  return {
    x: STATE.cx + Math.cos(p.a + t * p.speed * 0.14) * (p.r + wobble * 0.12),
    y: STATE.cy + Math.sin(p.a + t * p.speed * 0.14) * (p.r + wobble * 0.12)
  };
}

function drawIcon(kind, x, y, color, s) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 1.15;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  if (kind === "compass") {
    ctx.beginPath();
    ctx.moveTo(0, -6 * s); ctx.lineTo(1.8 * s, -0.6 * s);
    ctx.lineTo(0, 6 * s); ctx.lineTo(-1.8 * s, 0.6 * s);
    ctx.closePath(); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -6 * s); ctx.lineTo(1.8 * s, -0.6 * s); ctx.lineTo(0, -1.6 * s);
    ctx.closePath(); ctx.fill();
  } else if (kind === "layers") {
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      ctx.moveTo(-5.4 * s, i * 3 * s);
      ctx.lineTo(0, (i * 3 - 2.5) * s);
      ctx.lineTo(5.4 * s, i * 3 * s);
      ctx.lineTo(0, (i * 3 + 2.5) * s);
      ctx.closePath(); ctx.stroke();
    }
  } else if (kind === "play") {
    ctx.beginPath();
    ctx.moveTo(-3.1 * s, -5.2 * s);
    ctx.lineTo(5.4 * s, 0);
    ctx.lineTo(-3.1 * s, 5.2 * s);
    ctx.closePath(); ctx.stroke();
  } else {
    ctx.beginPath(); ctx.arc(0, 0, 5.3 * s, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, 2.3 * s, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, 0.75 * s, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}

function spacedText(text, x, y, tracking) {
  const chars = text.split("");
  let width = 0;
  const widths = chars.map((ch) => {
    const w = ctx.measureText(ch).width + tracking;
    width += w;
    return w;
  });
  let cx = x;
  if (ctx.textAlign === "center") cx = x - width / 2;
  if (ctx.textAlign === "right") cx = x - width;
  const align = ctx.textAlign;
  ctx.textAlign = "left";
  chars.forEach((ch, i) => { ctx.fillText(ch, cx, y); cx += widths[i]; });
  ctx.textAlign = align;
}

function placeWheelCluster(c, rot) {
  const hub = hubPos(c.phase, rot);
  const ca = Math.cos(hub.a);
  const sa = Math.sin(hub.a);
  c.hub.x = hub.x;
  c.hub.y = hub.y;
  c.nodes.forEach((n) => {
    if (n.kind === "hub") return;
    const lx = n.ox;
    const ly = n.oy;
    n.x = hub.x + lx * ca - ly * sa;
    n.y = hub.y + lx * sa + ly * ca;
  });
}

function activeFn(cluster) {
  if (STATE.hoverFn) return STATE.hoverFn;
  if (!STATE.panel || !cluster) return null;
  const n = cluster.nodes.find((x) => x.id === STATE.panel);
  if (!n) return null;
  return n.kind === "fn" ? n.id : (n.fnId || null);
}

function drawCluster(c, opts, t) {
  const alpha = opts.alpha == null ? 1 : opts.alpha;
  const scale = opts.scale == null ? 1 : opts.scale;
  const showJobLabels = !!opts.labels;
  const litFn = showJobLabels ? activeFn(c) : null;
  ctx.save();
  ctx.translate(c.hub.x, c.hub.y);
  ctx.scale(scale, scale);
  ctx.translate(-c.hub.x, -c.hub.y);
  ctx.globalAlpha = alpha;
  ctx.lineWidth = 0.85;
  c.links.forEach((l) => {
    const toJob = l.b.kind === "accent" || l.b.kind === "plain";
    const onTree = litFn && (l.b.fnId === litFn || l.b.id === litFn || l.a.id === litFn);
    ctx.strokeStyle = "rgba(244,239,232,0.26)";
    ctx.globalAlpha = alpha * (toJob && litFn ? (onTree ? 0.85 : 0.18) : 1);
    ctx.beginPath();
    ctx.moveTo(l.a.x, l.a.y);
    ctx.lineTo(l.b.x, l.b.y);
    ctx.stroke();
  });
  c.nodes.forEach((n) => {
    if (n.kind === "hub") return;
    const jx = n.x + (STATE.reduceMotion ? 0 : Math.sin(t * 0.5 + n.drift) * 1.2);
    const jy = n.y + (STATE.reduceMotion ? 0 : Math.cos(t * 0.38 + n.drift) * 1.0);
    let nodeA = n.alpha;
    if (litFn && n.kind !== "fn") {
      nodeA *= (n.fnId === litFn ? 1.15 : 0.35);
    } else if (litFn && n.kind === "fn" && n.id !== litFn) {
      nodeA *= 0.55;
    }
    if (n.kind === "fn") {
          ctx.beginPath();
          ctx.arc(jx, jy, n.r, 0, Math.PI * 2);
          ctx.fillStyle = n.color;
          ctx.globalAlpha = alpha * nodeA;
          ctx.fill();
        } else {
          drawJobDot(n, jx, jy, alpha, nodeA, t, c.phase.color);
        }
        n._dx = jx; n._dy = jy;
        { const M = ctx.getTransform(); n._sx = (M.a * jx + M.c * jy + M.e) / STATE.dpr; n._sy = (M.b * jx + M.d * jy + M.f) / STATE.dpr; }
    if (n.id && STATE.panel === n.id) {
      ctx.strokeStyle = n.color || THEME.accent;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(jx, jy, n.r + 5, 0, Math.PI * 2);
      ctx.stroke();
    }
  });

  ctx.globalAlpha = alpha;
      { const M = ctx.getTransform(); c.hub._sx = (M.a * c.hub.x + M.c * c.hub.y + M.e) / STATE.dpr; c.hub._sy = (M.b * c.hub.x + M.d * c.hub.y + M.f) / STATE.dpr; }
      ctx.beginPath();
      ctx.arc(c.hub.x, c.hub.y, c.hub.r + 6, 0, Math.PI * 2);
  ctx.strokeStyle = c.phase.color;
  ctx.globalAlpha = alpha * (STATE.hover === c.phase.id || STATE.focus === c.phase.id ? 0.55 : 0.2);
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.arc(c.hub.x, c.hub.y, c.hub.r, 0, Math.PI * 2);
  ctx.fillStyle = THEME.hub;
  ctx.fill();
  ctx.strokeStyle = c.phase.color;
  ctx.lineWidth = 1.45;
  ctx.stroke();
  drawIcon(c.phase.icon, c.hub.x, c.hub.y, c.phase.color, Math.min(STATE.w, STATE.h) / 1000);
  ctx.restore();

  if (showJobLabels) {
    const m = Math.min(STATE.w, STATE.h);
    ctx.save();
    c.named.forEach((item) => {
      const n = item.node;
      const x = n._dx || n.x;
      const y = n._dy || n.y;
      const fn = item.kind === "fn";
      ctx.font = `${fn ? 600 : 300} ${fn ? Math.max(13, m * 0.015) : Math.max(10, m * 0.011)}px Arial, sans-serif`;
      ctx.fillStyle = fn ? "#F4EFE8" : "rgba(244,239,232,0.82)";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      let la = alpha;
      if (!fn) la *= litFn ? (n.fnId === litFn ? 1 : 0.22) : 0.6;
      ctx.globalAlpha = la;
      ctx.fillText(item.text, x, y + (fn ? Math.max(18, m * 0.02) : Math.max(13, m * 0.014)));
    });
    ctx.restore();
  }
}

function drawWheelLabels(rot) {
  const m = Math.min(STATE.w, STATE.h);
  const titleSize = Math.max(13, m * 0.0185) * (STATE.labelScale || 1);
  const subSize = Math.max(8, m * 0.0092) * (STATE.labelScale || 1);
  const b = blend();

  ctx.save();
  ctx.globalAlpha = (1 - b) * (STATE.headerA == null ? 1 : STATE.headerA);
  const headerY = 24;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = "#F4EFE8";
  ctx.font = `700 ${Math.max(9, m * 0.0105)}px Arial, sans-serif`;
  ctx.fillStyle = THEME.accent;
  spacedText(T("header.kicker") + (window.CLIENT ? "   ·   " + window.CLIENT.toUpperCase() : ""), 36, headerY, titleSize * 0.055);
  ctx.fillStyle = "#F4EFE8";
  ctx.font = `700 ${Math.max(15, m * 0.018)}px Arial, sans-serif`;
  spacedText(T("header.title"), 36, headerY + Math.max(13, m * 0.014), titleSize * 0.055);
  ctx.font = `300 ${Math.max(8, m * 0.009)}px Arial, sans-serif`;
  ctx.fillStyle = THEME.muted;
  ctx.fillText(T("header.sub"), 36, headerY + Math.max(15, m * 0.018) + Math.max(13, m * 0.014) + 8);
  ctx.restore();

  PHASES.forEach((phase) => {
    const hub = hubPos(phase, rot);
    const focused = STATE.focus === phase.id;
    const lift = 128 * (m / 1040) * (STATE.labelLift || 1);
    const wx = hub.x + Math.cos(hub.a) * lift;
    const wy = hub.y + Math.sin(hub.a) * lift;
    let wAlign = "center";
    if (Math.cos(hub.a) > 0.45) wAlign = "left";
    if (Math.cos(hub.a) < -0.45) wAlign = "right";
    const px = STATE.cx;
    const py = STATE.h * 0.955;
    const x = focused ? lerp(wx, px, b) : wx;
    const y = focused ? lerp(wy, py, b) : wy;
    const align = focused && b > 0.5 ? "center" : wAlign;

    ctx.save();
    const hoverLift = STATE.lifts[phase.id] || 0;
    const anyone = STATE.mode === "wheel" && !!(STATE.hover || STATE.panel);
    const dimFloor = STATE.hover === "ring" || STATE.panel === "ring" ? 0.12 : 0.25;
    const hoverAlpha = anyone ? lerp(dimFloor, 1, hoverLift) : 1;
    ctx.globalAlpha = focused ? 1 : (1 - b) * hoverAlpha * (STATE.labelsA == null ? 1 : STATE.labelsA);
    ctx.textAlign = align;
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#F4EFE8";
    ctx.font = `700 ${titleSize}px Arial, sans-serif`;
    spacedText(phase.name, x, y, titleSize * 0.04);
    ctx.font = `300 ${subSize}px Arial, sans-serif`;
    ctx.fillStyle = THEME.muted;
    spacedText(STATE.lang === "it" ? phase.subIt : phase.sub, x, y + titleSize * 1.15, subSize * 0.05);
    ctx.restore();
  });
}

function demandRadius() {
  return STATE.radius + Math.min(STATE.w, STATE.h) * 0.095;
}

function drawDemandOrbit(t, wheelAlpha) {
  if (wheelAlpha <= 0.02) return;
  const r = demandRadius();
  const lift = STATE.demandLift;
  const blue = "#9FB3A6";
  const paleBlue = "#DCE6DF";
  const anyone = STATE.mode === "wheel" && !!(STATE.hover || STATE.panel);
  const dimFloor = STATE.hover === "demand" || STATE.panel === "demand" ? 0.36 : 0.12;
  const visibility = anyone ? lerp(dimFloor, 1, lift) : 1;
  const alpha = wheelAlpha * lerp(0.54, 0.96, lift) * visibility * ORBIT_OPACITY;
  const orbitScale = 1 + 0.05 * lift;
  ctx.save();
  ctx.translate(STATE.cx, STATE.cy);
  ctx.scale(orbitScale, orbitScale);
  ctx.translate(-STATE.cx, -STATE.cy);

  // Resting weight matches the governance orbit; hover unfolds the access layer.
  ctx.globalAlpha = wheelAlpha * lerp(0.14, 0.24, lift) * ORBIT_OPACITY;
  ctx.strokeStyle = blue;
  ctx.lineWidth = lerp(7, 16, lift);
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.arc(STATE.cx, STATE.cy, r, 0, Math.PI * 2);
  ctx.stroke();

  ctx.globalAlpha = alpha * lerp(0.7, 1, lift);
  ctx.strokeStyle = lift > 0.35 ? paleBlue : blue;
  ctx.lineWidth = lerp(0.7, 1.35, lift);
  ctx.setLineDash(lift > 0.35 ? [2.5, 6] : [2, 10]);
  ctx.lineDashOffset = STATE.reduceMotion ? 0 : t * lerp(3, 10, lift);
  ctx.beginPath();
  ctx.arc(STATE.cx, STATE.cy, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // On hover, the quiet contour opens into three anti-clockwise access paths.
  if (lift > 0.01) {
    [-12, 0, 12].forEach((offset, band) => {
      ctx.globalAlpha = wheelAlpha * lift * (band === 1 ? 0.74 : 0.36) * ORBIT_OPACITY;
      ctx.strokeStyle = band === 1 ? paleBlue : blue;
      ctx.lineWidth = band === 1 ? 1.15 : 0.7;
      ctx.setLineDash(band === 1 ? [2, 5] : [3, 9]);
      ctx.lineDashOffset = STATE.reduceMotion ? 0 : t * (band === 1 ? 12 : 7);
      ctx.beginPath();
      ctx.arc(STATE.cx, STATE.cy, r + offset, -Math.PI * 0.12 + band * 0.15, Math.PI * 1.88 + band * 0.1);
      ctx.stroke();
    });
    ctx.setLineDash([]);
  }

  const labels = [];
  labels.forEach((item) => {
    const x = STATE.cx + Math.cos(item.a) * r;
    const y = STATE.cy + Math.sin(item.a) * r;
    ctx.globalAlpha = wheelAlpha * lerp(0.46, 0.98, lift) * ORBIT_OPACITY;
    ctx.fillStyle = blue;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `700 ${Math.max(9, Math.min(STATE.w, STATE.h) * 0.0105)}px Arial, sans-serif`;
    spacedText(item.top, x, y, 0.7);
    ctx.fillStyle = "#DCE6DF";
    ctx.font = `300 ${Math.max(7, Math.min(STATE.w, STATE.h) * 0.0078)}px Arial, sans-serif`;
    spacedText(item.sub, x, y + 13, 0.35);
  });

  const carrierCount = 5 + Math.round(lift * 3);
  for (let i = 0; i < carrierCount; i++) {
    const a = -t * lerp(0.22, 0.52, lift) + i * Math.PI * 2 / carrierCount - Math.PI / 2;
    const x = STATE.cx + Math.cos(a) * r;
    const y = STATE.cy + Math.sin(a) * r;
    ctx.globalAlpha = alpha * (i % 2 ? lerp(0.38, 0.62, lift) : 1);
    ctx.fillStyle = i % 2 ? blue : paleBlue;
    ctx.beginPath(); ctx.arc(x, y, lerp(i % 2 ? 1.45 : 2.1, i % 2 ? 2.25 : 3.2, lift), 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}

function draw() {
  const t = STATE.t;
  const rot = currentRot();
  const b = blend();
  const wheelAlpha = 1 - b;

  ctx.fillStyle = THEME.canvas;
  ctx.fillRect(0, 0, STATE.w, STATE.h);
  ctx.fillStyle = THEME.accent;
      if (!STATE.lite) for (let x = 12; x < STATE.w; x += 22) {
    for (let y = 12; y < STATE.h; y += 22) {
      ctx.globalAlpha = 0.055;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  STATE.stars.forEach((s) => {
    ctx.globalAlpha = s.a;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.s, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;

  drawDemandOrbit(t, wheelAlpha);

  if (wheelAlpha > 0.02) {
    ctx.save();
    const ringScale = 1 + 0.05 * STATE.ringLift;
    const anyone = STATE.mode === "wheel" && !!(STATE.hover || STATE.panel);
    const dimFloor = STATE.hover === "ring" || STATE.panel === "ring" ? 0.12 : 0.22;
    const ringAlpha = wheelAlpha * (anyone ? lerp(dimFloor, 1, STATE.ringLift) : 1) * ORBIT_OPACITY;
    ctx.translate(STATE.cx, STATE.cy);
    ctx.scale(ringScale, ringScale);
    ctx.translate(-STATE.cx, -STATE.cy);

    ctx.globalAlpha = ringAlpha * lerp(0.12, 0.15, STATE.ringLift);
    ctx.strokeStyle = THEME.accent;
    ctx.lineWidth = lerp(9, 18, STATE.ringLift);
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.arc(STATE.cx, STATE.cy, STATE.radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.globalAlpha = ringAlpha * lerp(0.36, 0.72, STATE.ringLift);
    ctx.strokeStyle = rgbaOf(THEME.accent, 0.85);
    ctx.lineWidth = lerp(0.8, 1.25, STATE.ringLift);
    ctx.setLineDash([2, lerp(10, 6, STATE.ringLift)]);
    ctx.lineDashOffset = STATE.reduceMotion ? 0 : -t * 8;
    ctx.beginPath();
    ctx.arc(STATE.cx, STATE.cy, STATE.radius, 0, Math.PI * 2);
    ctx.stroke();

    // On hover, the quiet contour unfolds into the operating layer:
    // three staggered control paths, moving carriers and approval gates.
    if (STATE.ringLift > 0.01) {
      const lift = STATE.ringLift;
      const bands = [-15, 0, 15];
      bands.forEach((offset, band) => {
        ctx.globalAlpha = ringAlpha * lift * (band === 1 ? 0.68 : 0.34);
        ctx.strokeStyle = band === 1 ? "#F4EFE8" : THEME.accent;
        ctx.lineWidth = band === 1 ? 1.15 : 0.75;
        ctx.setLineDash(band === 1 ? [1.5, 5.5] : [3, 9]);
        ctx.lineDashOffset = STATE.reduceMotion ? 0 : (band + 1) * t * (band === 1 ? 12 : -7);
        ctx.beginPath();
        ctx.arc(STATE.cx, STATE.cy, STATE.radius + offset, -Math.PI * 0.36 + band * 0.15, Math.PI * 1.22 + band * 0.1);
        ctx.stroke();
      });
      ctx.setLineDash([]);
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const r = STATE.radius + (i % 3 - 1) * 15;
        const x = STATE.cx + Math.cos(a) * r;
        const y = STATE.cy + Math.sin(a) * r;
        ctx.globalAlpha = ringAlpha * lift * (i % 3 === 0 ? 0.9 : 0.5);
        ctx.fillStyle = i % 3 === 0 ? "#F4EFE8" : THEME.accent;
        ctx.beginPath(); ctx.arc(x, y, i % 3 === 0 ? 2.4 : 1.35, 0, Math.PI * 2); ctx.fill();
      }
      for (let i = 0; i < 4; i++) {
        const a = t * 0.62 + i * Math.PI / 2;
        const r = STATE.radius + (i % 2 ? 15 : -15);
        const x = STATE.cx + Math.cos(a) * r;
        const y = STATE.cy + Math.sin(a) * r;
        ctx.globalAlpha = ringAlpha * lift * 0.95;
        ctx.fillStyle = THEME.accent;
        ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.restore();

    const glowR = Math.min(STATE.w, STATE.h) * 0.16;
    const coreScale = 1 + 0.22 * STATE.coreLift + 0.25 * STATE.coreFlash;
    const coreFloor = STATE.hover === "ring" || STATE.panel === "ring" ? 0.12 : 0.25;
    const coreAlpha = Math.min(1, wheelAlpha * (anyone ? lerp(coreFloor, 1, STATE.coreLift) : 1) * BRAIN_OPACITY + STATE.coreFlash * 0.6);

    ctx.save();
    ctx.translate(STATE.cx, STATE.cy);
    ctx.scale(coreScale, coreScale);
    ctx.translate(-STATE.cx, -STATE.cy);

    const glow = ctx.createRadialGradient(STATE.cx, STATE.cy, 8, STATE.cx, STATE.cy, glowR);
    glow.addColorStop(0, rgbaOf(THEME.accent, 0.16));
    glow.addColorStop(0.55, rgbaOf(THEME.accent, 0.05));
    glow.addColorStop(1, rgbaOf(THEME.accent, 0));
    ctx.globalAlpha = coreAlpha;
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(STATE.cx, STATE.cy, glowR, 0, Math.PI * 2);
    ctx.fill();

    STATE.nucleusLinks.forEach(([i, j]) => {
      const a = nucleusXY(STATE.nucleus[i], t);
      const b = nucleusXY(STATE.nucleus[j], t);
      if ((a.x - b.x) ** 2 + (a.y - b.y) ** 2 > 1600) return;
      ctx.strokeStyle = "rgba(244,239,232,0.08)";
      ctx.globalAlpha = coreAlpha;
      ctx.lineWidth = 0.55;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    });
    STATE.nucleus.forEach((p) => {
      const q = nucleusXY(p, t);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = coreAlpha * 0.62 * (0.55 + 0.45 * Math.sin(t * 1.5 + p.twinkle));
      ctx.beginPath(); ctx.arc(q.x, q.y, p.size, 0, Math.PI * 2); ctx.fill();
    });
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  

      STATE.constellations.forEach((c) => {
        placeWheelCluster(c, rot);
    const focused = STATE.focus === c.phase.id;
    const lift = STATE.lifts[c.phase.id] || 0;
    const anyone = STATE.mode === "wheel" && !!(STATE.hover || STATE.panel);
    if (focused && STATE.detail[STATE.focus]) {
      const dest = STATE.detail[STATE.focus].hub;
      ctx.save();
      ctx.translate((dest.x - c.hub.x) * b, (dest.y - c.hub.y) * b);
      drawCluster(c, {
        alpha: wheelAlpha,
        scale: (1 + 0.18 * lift) * (1 - 0.22 * b),
        labels: false
      }, t);
      ctx.restore();
    } else {
      drawCluster(c, {
        alpha: wheelAlpha * (anyone ? lerp(STATE.hover === "ring" || STATE.panel === "ring" ? 0.12 : 0.25, 1, lift) : 1),
        scale: 1 + 0.18 * lift,
        labels: false
      }, t);
    }
  });

  drawFlows(rot, t, STATE._dt || 0);

  if (b > 0.02 && STATE.focus && STATE.detail[STATE.focus]) {
    const d = STATE.detail[STATE.focus];
    const sourceHub = hubPos(d.phase, rot);
    ctx.save();
    ctx.translate(
      (sourceHub.x - d.hub.x) * (1 - b),
      (sourceHub.y - d.hub.y) * (1 - b)
    );
    drawCluster(d, {
      alpha: b,
      scale: lerp(0.78, 1, b),
      labels: b > 0.42
    }, t);
    ctx.restore();
  }

  drawWheelLabels(rot);
      drawSpots(t);
    }

/* resolveCard, openPanel and closePanel live in app.js */

function hitTestNode(x, y) {
  if (STATE.mode !== "phase" || !STATE.focus) return null;
  const d = STATE.detail[STATE.focus];
  if (!d) return null;
  let best = null;
  let bestD = 32;
  d.nodes.forEach((n) => {
    if (!n.id) return;
    const px = n._dx || n.x;
    const py = n._dy || n.y;
    const dist = Math.hypot(x - px, y - py);
    const hitR = n.kind === "fn" ? 30 : 16;
    if (dist < hitR && dist < bestD) {
      best = n;
      bestD = dist;
    }
  });
  return best;
}

function hitTest(x, y) {
  if (STATE.mode === "phase") return STATE.focus;
  const d0 = Math.hypot(x - STATE.cx, y - STATE.cy);
  const coreR = Math.min(STATE.w, STATE.h) * 0.1;
  if (d0 < coreR) return "core";
  
      let best = null;
      let bestD = 92;
      const rot = currentRot();
  STATE.constellations.forEach((c) => {
    const hub = hubPos(c.phase, rot);
    const dist = Math.hypot(x - hub.x, y - hub.y);
    if (dist < 90 && dist < bestD) { best = c.phase.id; bestD = dist; }
    c.nodes.forEach((n) => {
      if (Math.hypot(x - n.x, y - n.y) < 24) best = c.phase.id;
    });
  });
  if (best) return best;
  if (Math.abs(d0 - demandRadius()) < 34) return "demand";
  if (Math.abs(d0 - STATE.radius) < 26) return "ring";
  return null;
}

function enterPhase(id) {
  const phase = PHASES.find((p) => p.id === id);
  if (!phase) return;
  closePanel();
  STATE.focus = id;
  STATE.mode = "enter";
  STATE.rotFrom = currentRot();
  STATE.rotTo = wrapPi(Math.PI / 2 - phase.angle);
  STATE.anim = 0;
  backBtn.classList.add("show");
  setHint("hint.phase");
}

function leavePhase() {
  closePanel();
  STATE.hoverFn = null;
  if (!STATE.focus) return;
  STATE.mode = "exit";
  STATE.rotFrom = currentRot();
  STATE.rotTo = 0;
  STATE.anim = 0;
  backBtn.classList.remove("show");
  setHint("hint.wheel");
}

function tickAnim(dt) {
  {
    const target = STATE.panel ? 1 : 0;
    const k = STATE.reduceMotion ? 1 : Math.min(1, dt * 8);
    const next = lerp(STATE.panelShift, target, k);
    updatePanelShift(Math.abs(target - next) < 0.002 ? target : next);
  }
  if (STATE.mode === "enter" || STATE.mode === "exit") {
    const speed = STATE.reduceMotion ? 4 : (STATE.animSpeed || 0.72);
    STATE.anim = Math.min(1, STATE.anim + dt * speed);
    STATE.rot = STATE.rotFrom + wrapPi(STATE.rotTo - STATE.rotFrom) * ease(STATE.anim);
    if (STATE.anim >= 1) {
      if (STATE.mode === "enter") STATE.mode = "phase";
      else { STATE.mode = "wheel"; STATE.focus = null; STATE.rot = 0; }
    }
  }
  PHASES.forEach((p) => {
    const target = (STATE.mode === "wheel" && STATE.hover === p.id) ? 1 : 0;
    const k = STATE.reduceMotion ? 1 : Math.min(1, dt * 9);
    STATE.lifts[p.id] += (target - STATE.lifts[p.id]) * k;
  });
  {
    const target = (STATE.mode === "wheel" && (STATE.hover === "core" || STATE.panel === "core")) ? 1 : 0;
    const k = STATE.reduceMotion ? 1 : Math.min(1, dt * 9);
    STATE.coreLift += (target - STATE.coreLift) * k;
  }
  {
    const target = (STATE.mode === "wheel" && (STATE.hover === "ring" || STATE.panel === "ring")) ? 1 : 0;
    const k = STATE.reduceMotion ? 1 : Math.min(1, dt * 9);
    STATE.ringLift += (target - STATE.ringLift) * k;
  }
  {
    const target = (STATE.mode === "wheel" && (STATE.hover === "demand" || STATE.panel === "demand")) ? 1 : 0;
    const k = STATE.reduceMotion ? 1 : Math.min(1, dt * 9);
    STATE.demandLift += (target - STATE.demandLift) * k;
      }
      {
        const target = (STATE.mode === "wheel" && (STATE.hover === "coworker" || STATE.panel === "coworker")) ? 1 : 0;
        const k = STATE.reduceMotion ? 1 : Math.min(1, dt * 9);
        STATE.coworkerLift += (target - STATE.coworkerLift) * k;
        const ka = STATE.reduceMotion ? 1 : Math.min(1, dt * 3.2);
        STATE.autoView += (STATE.autoTarget - STATE.autoView) * ka;
        if (Math.abs(STATE.autoTarget - STATE.autoView) < 0.002) STATE.autoView = STATE.autoTarget;
        STATE.agentsA += ((STATE.agents ? 1 : 0) - STATE.agentsA) * ka;
        STATE.loopBoost += (STATE.loopTarget - STATE.loopBoost) * ka;
        STATE.coreFlash = Math.max(0, STATE.coreFlash - dt * 0.6);
      }
      if (typeof frameTick === "function") frameTick(dt);
}

let last = performance.now();
function loop(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  STATE.t = now / 1000;
  STATE._dt = dt;
  tickAnim(dt);
  draw();
  requestAnimationFrame(loop);
}

canvas.addEventListener("pointermove", (e) => {
  if (STATE.mode === "phase") {
    const node = hitTestNode(e.clientX, e.clientY);
    STATE.hoverFn = node ? (node.kind === "fn" ? node.id : (node.fnId || null)) : null;
    canvas.style.cursor = node ? "pointer" : "default";
    return;
  }
  if (STATE.mode !== "wheel") {
    canvas.style.cursor = "default";
    return;
  }
  STATE.hover = hitTest(e.clientX, e.clientY);
  canvas.style.cursor = STATE.hover ? "pointer" : "default";
});
canvas.addEventListener("pointerleave", () => { STATE.hover = null; STATE.hoverFn = null; });
canvas.addEventListener("click", (e) => {
  if (STATE.mode === "phase") {
    const node = hitTestNode(e.clientX, e.clientY);
    if (node) {
      if (STATE.panel === node.id) closePanel();
      else openPanel(node.id, node);
    } else if (STATE.panel) closePanel();
    return;
  }
  if (STATE.mode !== "wheel") return;
  const id = hitTest(e.clientX, e.clientY);
  if (id === "core" || id === "ring" || id === "demand") {
    if (STATE.panel === id) closePanel();
    else openPanel(id);
  } else if (id) {
    enterPhase(id);
  } else if (STATE.panel) {
    closePanel();
  }
});
backBtn.addEventListener("click", leavePhase);
document.getElementById("sheetClose").addEventListener("click", () => closePanel());
window.addEventListener("resize", resize);

function engineBoot() {
  resize();
  requestAnimationFrame(loop);
}
