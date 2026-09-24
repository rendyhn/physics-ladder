/* ==========================================================================
   Physics helpers: significant figures, units, scientific notation and the
   SVG diagrams the topics draw from their generated numbers.
   ========================================================================== */

/* ---------- numbers ---------- */
const NUM = x => F(x);   // plain-text number, usable where a generator has its own variable called F
const sig = (x, n = 3) => (x === 0 ? 0 : +(+x).toPrecision(n));            // round to n significant figures
const deg = r => (r * 180) / Math.PI, rad = d => (d * Math.PI) / 180;
const sinD = d => Math.sin(rad(d)), cosD = d => Math.cos(rad(d)), tanD = d => Math.tan(rad(d));
/* a unit written for TeX: m/s^2 -> \mathrm{m/s^2}; Ω and °C are handled */
function uT(u) {
  if (!u) return '';
  if (u === '°C') return '^\\circ\\mathrm{C}';
  if (u === '°') return '^\\circ';
  return '\\mathrm{' + un(u).replace(/Ω/g, '\\Omega').replace(/·/g, '\\cdot ') + '}';   // un(): local unit words, e.g. km/jam
}
const QT = (x, u, fixed) => `${M(x, fixed)}${u === '°' || u === '°C' ? '' : '\\,'}${uT(u)}`;   // quantity inside $…$
const Q = (x, u, fixed) => `$${QT(x, u, fixed)}$`;                                           // quantity as inline maths
/* scientific notation inside $…$: 3{,}0 \times 10^{8} */
function sciT(x, n = 3) {
  if (x === 0) return '0';
  let e = Math.floor(Math.log10(Math.abs(x))), m = +(x / 10 ** e).toPrecision(n);
  if (Math.abs(m) >= 10) { m /= 10; e += 1; }
  return e === 0 ? M(m) : `${M(m)} \\times 10^{${e}}`;
}
/* gravitational field strength for one question: the question always states which value it uses */
const gPick = () => pick([10, 9.8]);
const gNote = g => T`Use $g = ${QT(g, 'm/s^2')}$.`;

/* ---------- SVG building blocks ---------- */
const sub = (a, b) => `${a}<tspan class="fig-sub" dy="4">${b}</tspan>`;   // subscript inside an SVG label
const svgOpen = (w, h, label) => `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${String(label).replace(/\x22/g, '&quot;')}">`;
const txt = (x, y, s, cls = 'fig-text', anchor = 'middle') => `<text class="${cls}" x="${+x.toFixed(1)}" y="${+y.toFixed(1)}" text-anchor="${anchor}">${s}</text>`;
/* an arrow from (x1,y1) to (x2,y2); kind picks the colour (a = accent, b = second colour, c = muted) */
function arrow(x1, y1, x2, y2, kind = 'a', width = 2.4) {
  const a = Math.atan2(y2 - y1, x2 - x1), L = 11, W = 5.5;
  const bx = x2 - L * Math.cos(a), by = y2 - L * Math.sin(a);
  const p1 = [bx + W * Math.sin(a), by - W * Math.cos(a)], p2 = [bx - W * Math.sin(a), by + W * Math.cos(a)];
  const f = n => +n.toFixed(1);
  return `<line class="fig-vec fig-vec-${kind}" style="stroke-width:${width}" x1="${f(x1)}" y1="${f(y1)}" x2="${f(bx)}" y2="${f(by)}"/><polygon class="fig-head fig-head-${kind}" points="${f(x2)},${f(y2)} ${f(p1[0])},${f(p1[1])} ${f(p2[0])},${f(p2[1])}"/>`;
}
/* label placed just beyond the tip of an arrow */
function tipLabel(x1, y1, x2, y2, s, gap = 16) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  return txt(x2 + gap * Math.cos(a), y2 + gap * Math.sin(a) + 5, s);
}

/* ---------- a line graph with labelled axes (for motion graphs) ---------- */
/* pts: [[x, y], …] in data units; xs, ys: axis maxima; xl, yl: axis labels */
function graphSvg(pts, { xMax, yMax, yMin = 0, xl = 't (s)', yl = 'v (m/s)', xStep, yStep, label }) {
  const W = 420, H = 250, L = 52, R = 18, Tp = 16, B = 40;
  const X = x => L + (x / xMax) * (W - L - R), Y = y => Tp + ((yMax - y) / (yMax - yMin)) * (H - Tp - B);
  let s = svgOpen(W, H, label || yl + ' – ' + xl);
  for (let x = xStep; x <= xMax + 1e-9; x += xStep) s += `<line class="fig-grid" x1="${X(x)}" y1="${Y(yMin)}" x2="${X(x)}" y2="${Y(yMax)}"/>` + txt(X(x), Y(yMin) + 18, F(x), 'fig-small');
  for (let y = yMin; y <= yMax + 1e-9; y += yStep) { if (y !== yMin) s += `<line class="fig-grid" x1="${X(0)}" y1="${Y(y)}" x2="${X(xMax)}" y2="${Y(y)}"/>`; s += txt(X(0) - 8, Y(y) + 4, F(y), 'fig-small', 'end'); }
  if (yMin < 0) s += `<line class="fig-line" x1="${X(0)}" y1="${Y(0)}" x2="${X(xMax)}" y2="${Y(0)}"/>`;
  s += arrow(X(0), Y(yMin), X(xMax) + 12, Y(yMin), 'c', 1.5) + arrow(X(0), Y(yMin), X(0), Y(yMax) - 10, 'c', 1.5);
  s += txt(X(xMax), Y(yMin) + 34, xl, 'fig-small', 'end') + txt(X(0) + 6, Tp + 2, yl, 'fig-small', 'start');
  s += `<polyline class="fig-plot" points="${pts.map(([x, y]) => `${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join(' ')}"/>`;
  pts.forEach(([x, y]) => { s += `<circle class="fig-dot" cx="${X(x).toFixed(1)}" cy="${Y(y).toFixed(1)}" r="3"/>`; });
  return s + '</svg>';
}

/* ---------- free-body diagram: a block with forces drawn from its centre ---------- */
/* forces: [{ ang: degrees (0 = right, 90 = up), len: px, label, kind }] */
function fbdSvg(forces, label) {
  const W = 360, H = 260, cx = 180, cy = 130;
  let s = svgOpen(W, H, label) + `<rect class="fig-block" x="${cx - 32}" y="${cy - 24}" width="64" height="48" rx="4"/>`;
  if (forces.some(f => f.ground)) s += `<line class="fig-line" x1="${cx - 120}" y1="${cy + 24}" x2="${cx + 120}" y2="${cy + 24}"/>`;
  for (const f of forces) {
    const a = rad(f.ang), x2 = cx + f.len * Math.cos(a), y2 = cy - f.len * Math.sin(a);
    s += arrow(cx, cy, x2, y2, f.kind || 'a') + tipLabel(cx, cy, x2, y2, f.label, 18);
  }
  return s + `<circle class="fig-dot" cx="${cx}" cy="${cy}" r="3"/></svg>`;
}

/* ---------- inclined plane with a block (angle in degrees) ---------- */
function inclineSvg(angle, label, withForces = false) {
  const W = 420, H = 240, x0 = 40, y0 = 210, run = 320, rise = Math.min(170, run * tanD(angle));
  const x1 = x0 + run, y1 = y0 - rise, a = Math.atan2(rise, run);
  let s = svgOpen(W, H, label) + `<polygon class="fig-shape" points="${x0},${y0} ${x1},${y0} ${x1},${y1}"/>`;
  s += `<path class="fig-line" d="M ${x0 + 46} ${y0} A 46 46 0 0 0 ${(x0 + 46 * Math.cos(a)).toFixed(1)} ${(y0 - 46 * Math.sin(a)).toFixed(1)}"/>` + txt(x0 + 62, y0 - 8, 'θ');
  // block centred 55% up the slope, sitting on it
  const t = 0.55, bx = x0 + t * run, by = y0 - t * rise, w = 54, h = 34;
  const nx = -Math.sin(a), ny = -Math.cos(a);   // outward normal (screen coordinates)
  const cx = bx + nx * (h / 2), cy = by + ny * (h / 2);
  s += `<rect class="fig-block" x="${(cx - w / 2).toFixed(1)}" y="${(cy - h / 2).toFixed(1)}" width="${w}" height="${h}" rx="3" transform="rotate(${(-deg(a)).toFixed(1)} ${cx.toFixed(1)} ${cy.toFixed(1)})"/>`;
  if (withForces) {
    s += arrow(cx, cy, cx, cy + 70, 'a') + txt(cx + 14, cy + 78, 'mg', 'fig-text', 'start');
    s += arrow(cx, cy, cx + nx * 64, cy + ny * 64, 'b') + tipLabel(cx, cy, cx + nx * 64, cy + ny * 64, 'N');
    s += arrow(cx, cy, cx + Math.cos(a) * 60, cy - Math.sin(a) * 60, 'c') + tipLabel(cx, cy, cx + Math.cos(a) * 60, cy - Math.sin(a) * 60, 'f');
  }
  return s + '</svg>';
}

/* ---------- projectile path from launch speed and angle (to scale) ---------- */
function projectileSvg(v, angle, g, label) {
  const W = 440, H = 220, L = 30, B = 30, vx = v * cosD(angle), vy = v * sinD(angle);
  const T = (2 * vy) / g, R = vx * T, Hm = (vy * vy) / (2 * g);
  const k = Math.min((W - L - 40) / R, (H - B - 40) / Hm);
  const X = x => L + x * k, Y = y => H - B - y * k;
  let d = '';
  for (let i = 0; i <= 40; i++) { const t = (T * i) / 40, x = vx * t, y = vy * t - (g * t * t) / 2; d += `${i ? 'L' : 'M'} ${X(x).toFixed(1)} ${Y(y).toFixed(1)} `; }
  let s = svgOpen(W, H, label) + `<line class="fig-line" x1="${L - 10}" y1="${Y(0)}" x2="${W - 10}" y2="${Y(0)}"/>`;
  s += `<path class="fig-plot fig-dashed" d="${d}"/>`;
  s += arrow(X(0), Y(0), X(0) + 70 * cosD(angle), Y(0) - 70 * sinD(angle), 'a') + txt(X(0) + 80 * cosD(angle) + 6, Y(0) - 80 * sinD(angle), 'v₀', 'fig-text', 'start');
  s += `<path class="fig-line" d="M ${X(0) + 34} ${Y(0)} A 34 34 0 0 0 ${(X(0) + 34 * cosD(angle)).toFixed(1)} ${(Y(0) - 34 * sinD(angle)).toFixed(1)}"/>` + txt(X(0) + 48, Y(0) - 8, 'θ', 'fig-text', 'start');
  s += `<line class="fig-dash" x1="${X(R / 2)}" y1="${Y(0)}" x2="${X(R / 2)}" y2="${Y(Hm)}"/>` + txt(X(R / 2) + 8, Y(Hm / 2), 'H', 'fig-text', 'start');
  s += arrow(X(0), Y(0) + 16, X(R), Y(0) + 16, 'c', 1.4) + arrow(X(R), Y(0) + 16, X(0), Y(0) + 16, 'c', 1.4) + txt(X(R / 2), Y(0) + 30, 'R', 'fig-small');
  return s + '</svg>';
}

/* ---------- vectors on a grid: [{ x, y, label, kind, from: [x, y] }] in grid units ---------- */
function vectorSvg(vecs, label, span = 8) {
  const W = 300, H = 300, c = 150, k = (W - 40) / (2 * span);
  const X = x => c + x * k, Y = y => c - y * k;
  let s = svgOpen(W, H, label);
  for (let i = -span; i <= span; i++) s += `<line class="fig-grid" x1="${X(i)}" y1="${Y(-span)}" x2="${X(i)}" y2="${Y(span)}"/><line class="fig-grid" x1="${X(-span)}" y1="${Y(i)}" x2="${X(span)}" y2="${Y(i)}"/>`;
  s += arrow(X(-span), Y(0), X(span) + 8, Y(0), 'c', 1.4) + arrow(X(0), Y(-span), X(0), Y(span) - 8, 'c', 1.4) + txt(X(span) + 2, Y(0) - 8, 'x', 'fig-small') + txt(X(0) + 10, Y(span) - 2, 'y', 'fig-small');
  for (const v of vecs) {
    const [fx, fy] = v.from || [0, 0];
    s += arrow(X(fx), Y(fy), X(fx + v.x), Y(fy + v.y), v.kind || 'a') + tipLabel(X(fx), Y(fy), X(fx + v.x), Y(fy + v.y), v.label, 14);
  }
  return s + '</svg>';
}

/* ---------- circuits ---------- */
/* a zig-zag resistor between two points on a horizontal or vertical wire */
function resistor(x1, y1, x2, y2, name) {
  const horiz = Math.abs(y2 - y1) < 1, len = horiz ? x2 - x1 : y2 - y1, zl = 36, a = (len - zl) / 2;
  let d, lx, ly;
  if (horiz) {
    const s0 = x1 + a; d = `M ${x1} ${y1} H ${s0}`;
    for (let i = 0; i < 6; i++) d += ` L ${s0 + (i + 0.5) * 6} ${y1 + (i % 2 ? 7 : -7)}`;
    d += ` L ${s0 + zl} ${y1} H ${x2}`; lx = (x1 + x2) / 2; ly = y1 - 14;
  } else {
    const s0 = y1 + a; d = `M ${x1} ${y1} V ${s0}`;
    for (let i = 0; i < 6; i++) d += ` L ${x1 + (i % 2 ? 7 : -7)} ${s0 + (i + 0.5) * 6}`;
    d += ` L ${x1} ${s0 + zl} V ${y2}`; lx = x1 + 14; ly = (y1 + y2) / 2 + 5;
  }
  return `<path class="fig-wire" d="${d}"/>` + txt(lx, ly, name, 'fig-small', horiz ? 'middle' : 'start');
}
/* battery on a vertical wire: long plate = + (top) */
function battery(x, y1, y2, name) {
  const m = (y1 + y2) / 2;
  return `<path class="fig-wire" d="M ${x} ${y1} V ${m - 5} M ${x} ${m + 5} V ${y2}"/><line class="fig-wire" x1="${x - 16}" y1="${m - 5}" x2="${x + 16}" y2="${m - 5}"/><line class="fig-wire" style="stroke-width:4" x1="${x - 8}" y1="${m + 5}" x2="${x + 8}" y2="${m + 5}"/>` + txt(x - 22, m + 4, name, 'fig-small', 'end');
}
const wire = d => `<path class="fig-wire" d="${d}"/>`;
const node = (x, y) => `<circle class="fig-dot" cx="${x}" cy="${y}" r="3.2"/>`;
/* layout 'series': ε with R1…Rn in a loop; 'parallel': ε with R1…Rn side by side; 'mixed': R1 in series with (R2 ∥ R3) */
function circuitSvg(kind, names, emfName, label) {
  const W = 420, H = 230, L = 70, R = 380, Tp = 40, Bt = 200;
  let s = svgOpen(W, H, label) + battery(L, Tp, Bt, emfName);
  if (kind === 'series') {
    const n = names.length;
    if (n <= 2) {
      s += resistor(L, Tp, (L + R) / 2 + 10, Tp, names[0]) + wire(`M ${(L + R) / 2 + 10} ${Tp} H ${R} V ${Tp + 20}`);
      s += n === 2 ? resistor(R, Tp + 20, R, Bt - 20, names[1]) + wire(`M ${R} ${Bt - 20} V ${Bt} H ${L}`) : wire(`M ${R} ${Tp + 20} V ${Bt} H ${L}`);
    } else {
      const seg = (R - L) / 2;
      s += resistor(L, Tp, L + seg, Tp, names[0]) + resistor(L + seg, Tp, R, Tp, names[1]) + resistor(R, Tp, R, Bt, names[2]) + wire(`M ${R} ${Bt} H ${L}`);
    }
  } else if (kind === 'parallel') {
    const n = names.length, xs = names.map((_, i) => L + ((R - L) * (i + 1)) / n);
    s += wire(`M ${L} ${Tp} H ${R} M ${L} ${Bt} H ${R}`);
    xs.forEach((x, i) => { s += resistor(x, Tp, x, Bt, names[i]) + node(x, Tp) + node(x, Bt); });
  } else {   // mixed
    const xa = 250, xb = 360;
    s += resistor(L, Tp, 190, Tp, names[0]) + wire(`M 190 ${Tp} H ${xb} M ${L} ${Bt} H ${xb}`);
    s += resistor(xa, Tp, xa, Bt, names[1]) + resistor(xb, Tp, xb, Bt, names[2]) + node(xa, Tp) + node(xa, Bt);
  }
  return s + '</svg>';
}
