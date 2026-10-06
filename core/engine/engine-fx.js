/* Constellation effects: autonomy rendering of the jobs, agent sparks and the 'spots' that link a scene to the core. */

const AGENT = THEME.accent;
const TAU = Math.PI * 2;

function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

/* 2 = agent-run (human-on-the-loop) · 1 = human-in-the-loop · 0 = human-led */
function jobClass(id) {
  const c = CARDS[id];
  if (!c) return 0;
  if (c.badge === "More autonomous") return 2;
  if (c.badge === "Human-assisted") return 1;
  return 0;
}

function drawJobDot(n, x, y, alpha, nodeA, t, pc) {
  const v = STATE.autoView;
  const a1 = clamp01(v);
  const a2 = clamp01(v - 1);
  const cls = n.cls || 0;
  const big = n.r > 3;
  const base = alpha * nodeA;

  ctx.beginPath();
  ctx.arc(x, y, n.r, 0, TAU);
  ctx.globalAlpha = base;
  ctx.fillStyle = "#030504";
  ctx.fill();

  const colourOn = cls >= 1 ? a1 : 0;
  ctx.lineWidth = 1;
  if (colourOn < 1) {
    ctx.strokeStyle = "rgba(244,239,232,0.82)";
    ctx.globalAlpha = base * (1 - colourOn);
    ctx.stroke();
  }
  if (colourOn > 0) {
    ctx.strokeStyle = pc;
    ctx.lineWidth = big ? 1.5 : 1.15;
    ctx.globalAlpha = base * colourOn;
    ctx.stroke();
  }
  if (cls === 2 && a2 > 0) {
    ctx.beginPath();
    ctx.arc(x, y, n.r, 0, TAU);
    ctx.fillStyle = pc;
    ctx.globalAlpha = base * a2;
    ctx.fill();
  }
  if (cls === 1 && a2 > 0) {
    ctx.beginPath();
    ctx.arc(x, y, n.r * 0.42, 0, TAU);
    ctx.fillStyle = pc;
    ctx.globalAlpha = base * a2;
    ctx.fill();
  }
  if (cls === 0 && big && a2 > 0) {
    const d = n.r + 4.5;
    ctx.beginPath();
    ctx.moveTo(x, y - d); ctx.lineTo(x + d, y); ctx.lineTo(x, y + d); ctx.lineTo(x - d, y); ctx.closePath();
    ctx.strokeStyle = "rgba(244,239,232,0.7)";
    ctx.lineWidth = 0.9;
    ctx.globalAlpha = base * a2 * 0.8;
    ctx.stroke();
  }

  const ag = STATE.agentsA;
  if (ag > 0.01) {
    let s = 0, sp = 0;
    if (cls === 2) { s = Math.max(a2, a1 * 0.6); sp = 1.8; }
    else if (cls === 1) { s = a1 * 0.7; sp = 0.95; }
    if (s > 0.01) {
      const ang = (STATE.reduceMotion ? 0 : t * sp) + n.drift * 1.7;
      const rr = n.r + (big ? 6.5 : 3.4);
      if (big && !STATE.reduceMotion) {
        ctx.beginPath();
        ctx.arc(x, y, rr, ang - 0.9, ang);
        ctx.strokeStyle = AGENT;
        ctx.lineWidth = 1;
        ctx.globalAlpha = base * ag * s * 0.45;
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(x + Math.cos(ang) * rr, y + Math.sin(ang) * rr, big ? 1.7 : 0.95, 0, TAU);
      ctx.fillStyle = AGENT;
      ctx.globalAlpha = base * ag * s;
      ctx.fill();
    }
  }
}


/* ---------- Spots: highlight nodes of the core from a scene ---------- */
function spotPos(id) {
  if (id === "core") return { x: STATE.cx, y: STATE.cy };
  if (id === "demand") {
    const a = -Math.PI / 2 - 0.42;
    const r = demandRadius();
    return { x: STATE.cx + Math.cos(a) * r, y: STATE.cy + Math.sin(a) * r };
  }
  if (id === "ring") {
    const a = -Math.PI * 0.25;
    return { x: STATE.cx + Math.cos(a) * STATE.radius, y: STATE.cy + Math.sin(a) * STATE.radius };
  }
  const list = STATE.mode === "wheel" ? STATE.constellations : (STATE.focus && STATE.detail[STATE.focus] ? [STATE.detail[STATE.focus]] : []);
  for (const c of list) {
    if (c.phase && c.phase.id === id && c.hub._sx !== undefined) return { x: c.hub._sx, y: c.hub._sy };
    const n = c.nodes.find((x) => x.id === id);
    if (n && n._sx !== undefined) return { x: n._sx, y: n._sy };
  }
  return null;
}

function drawSpots(t) {
  const spots = STATE.spots || [];
  if (!spots.length) return;
  if (STATE.mode === "enter" || STATE.mode === "exit") return;
  const tm = STATE.reduceMotion ? 0 : t;
  const a0 = STATE.spotsA == null ? 1 : STATE.spotsA;
  if (a0 < 0.02) return;
  const m = Math.min(STATE.w, STATE.h);
  const pts = spots.map((s) => ({ s, p: spotPos(s.id) })).filter((o) => o.p);
  ctx.save();
  // Trail between consecutive spots
  if (pts.length > 1 && STATE.spotTrail) {
    ctx.setLineDash([3, 6]);
    ctx.lineDashOffset = -tm * 24;
    ctx.strokeStyle = AGENT;
    ctx.lineWidth = 1.2;
    ctx.globalAlpha = 0.55 * a0;
    ctx.beginPath();
    pts.forEach((o, i) => { if (i === 0) ctx.moveTo(o.p.x, o.p.y); else ctx.lineTo(o.p.x, o.p.y); });
    ctx.stroke();
    ctx.setLineDash([]);
  }
  pts.forEach((o, i) => {
    const active = STATE.spotActive == null || STATE.spotActive === i;
    const p = o.p;
    const pulse = (active ? 9 : 6) + (active ? 3 * Math.sin(tm * 4 + i) : 0);
    ctx.globalAlpha = (active ? 0.95 : 0.4) * a0;
    ctx.strokeStyle = AGENT;
    ctx.lineWidth = active ? 1.8 : 1.1;
    ctx.beginPath(); ctx.arc(p.x, p.y, pulse, 0, TAU); ctx.stroke();
    ctx.globalAlpha = (active ? 0.18 : 0.08) * a0;
    ctx.fillStyle = AGENT;
    ctx.beginPath(); ctx.arc(p.x, p.y, pulse + 9, 0, TAU); ctx.fill();
    if (o.s.label && active) {
      const label = o.s.label;
      ctx.font = `700 ${Math.max(11, m * 0.0125)}px Arial, sans-serif`;
      const w = ctx.measureText(label).width + 20;
      const right = p.x < STATE.cx;
      const bx = right ? p.x - w - 20 : p.x + 20;
      const by = p.y - 13;
      ctx.globalAlpha = 0.94 * a0;
      ctx.fillStyle = "#07100A";
      roundRect(bx, by, w, 26, 13); ctx.fill();
      ctx.strokeStyle = AGENT; ctx.lineWidth = 1; ctx.globalAlpha = 0.85 * a0;
      roundRect(bx, by, w, 26, 13); ctx.stroke();
      ctx.globalAlpha = a0;
      ctx.fillStyle = "#F2F5F3";
      ctx.textAlign = "left"; ctx.textBaseline = "middle";
      ctx.fillText(label, bx + 10, by + 13.5);
    }
  });
  ctx.restore();
}

function roundRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
