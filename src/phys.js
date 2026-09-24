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
  if (u === '%') return '\\%';
  return '\\mathrm{' + un(u).replace(/Ω/g, '\\Omega').replace(/·/g, '\\cdot ').replace(/ /g, '\\,') + '}';   // un(): local unit words, e.g. km/jam
}
const QT = (x, u, fixed) => `${M(x, fixed)}${u === '°' || u === '°C' || u === '%' ? '' : '\\,'}${uT(u)}`;   // quantity inside $…$
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
  const a = Math.atan2(y2 - y1, x2 - x1), c = Math.cos(a);
  const anchor = c > 0.5 ? 'start' : c < -0.5 ? 'end' : 'middle', g = anchor === 'middle' ? gap : 7;   // text starts (or ends) just past a sideways tip
  return txt(x2 + g * c, y2 + gap * Math.sin(a) + 5, s, 'fig-text', anchor);
}

/* ---------- a line graph with labelled axes (for motion graphs) ---------- */
/* pts: [[x, y], …] in data units; xs, ys: axis maxima; xl, yl: axis labels */
function graphSvg(pts, { xMax, yMax, yMin = 0, xl = 't (s)', yl = 'v (m/s)', xStep, yStep, label, dots = true }) {
  const W = 420, H = 250, L = 52, R = 18, Tp = 16, B = 40;
  const X = x => L + (x / xMax) * (W - L - R), Y = y => Tp + ((yMax - y) / (yMax - yMin)) * (H - Tp - B);
  let s = svgOpen(W, H, label || yl + ' – ' + xl);
  for (let x = xStep; x <= xMax + 1e-9; x += xStep) s += `<line class="fig-grid" x1="${X(x)}" y1="${Y(yMin)}" x2="${X(x)}" y2="${Y(yMax)}"/>` + txt(X(x), Y(yMin) + 18, F(x), 'fig-small');
  for (let y = Math.ceil(yMin / yStep - 1e-9) * yStep; y <= yMax + 1e-9; y += yStep) { if (Math.abs(y - yMin) > 1e-9) s += `<line class="fig-grid" x1="${X(0)}" y1="${Y(y)}" x2="${X(xMax)}" y2="${Y(y)}"/>`; s += txt(X(0) - 8, Y(y) + 4, F(y), 'fig-small', 'end'); }
  if (yMin < 0) s += `<line class="fig-line" x1="${X(0)}" y1="${Y(0)}" x2="${X(xMax)}" y2="${Y(0)}"/>`;
  s += arrow(X(0), Y(yMin), X(xMax) + 12, Y(yMin), 'c', 1.5) + arrow(X(0), Y(yMin), X(0), Y(yMax) - 10, 'c', 1.5);
  s += txt(X(xMax), Y(yMin) + 34, xl, 'fig-small', 'end') + txt(X(0) + 6, Tp + 2, yl, 'fig-small', 'start');
  s += `<polyline class="fig-plot" points="${pts.map(([x, y]) => `${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join(' ')}"/>`;
  if (dots) pts.forEach(([x, y]) => { s += `<circle class="fig-dot" cx="${X(x).toFixed(1)}" cy="${Y(y).toFixed(1)}" r="3"/>`; });
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
  s += arrow(X(0), Y(0), X(0) + 70 * cosD(angle), Y(0) - 70 * sinD(angle), 'a') + txt(X(0) + 70 * cosD(angle) - 14 * sinD(angle), Y(0) - 70 * sinD(angle) - 14 * cosD(angle), 'v₀', 'fig-text', 'end');   // above the launch arrow, clear of the path
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
    const [fx, fy] = v.from || [0, 0], x1 = X(fx), y1 = Y(fy), x2 = X(fx + v.x), y2 = Y(fy + v.y);
    if (v.guides) s += `<line class="fig-dash" x1="${x2}" y1="${y2}" x2="${x2}" y2="${Y(0)}"/><line class="fig-dash" x1="${x2}" y1="${y2}" x2="${X(0)}" y2="${y2}"/>`;   // dashed lines down to the axes
    if (v.theta) { const a = Math.atan2(v.y, v.x), r = 34; s += `<path class="fig-line" fill="none" d="M${x1 + r} ${y1} A${r} ${r} 0 0 0 ${+(x1 + r * Math.cos(a)).toFixed(1)} ${+(y1 - r * Math.sin(a)).toFixed(1)}"/>` + txt(x1 + (r + 12) * Math.cos(a / 2), y1 - (r + 12) * Math.sin(a / 2) + 5, v.theta, 'fig-small'); }   // angle arc from the +x axis
    s += arrow(x1, y1, x2, y2, v.kind || 'a');
    s += v.mid ? txt((x1 + x2) / 2 + v.mid[0], (y1 + y2) / 2 + v.mid[1], v.label) : tipLabel(x1, y1, x2, y2, v.label, 14);   // mid: label beside the middle of the arrow, offset [dx, dy] px
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
  const W = 450, H = 230, L = 70, R = 380, Tp = 40, Bt = 200;   // room on the right for the last resistor's label
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
    xs.forEach((x, i) => { s += resistor(x, Tp, x, Bt, names[i]) + (i < n - 1 ? node(x, Tp) + node(x, Bt) : ''); });   // no junction dot at the far corners
  } else {   // mixed
    const xa = 250, xb = 360;
    s += resistor(L, Tp, 190, Tp, names[0]) + wire(`M 190 ${Tp} H ${xb} M ${L} ${Bt} H ${xb}`);
    s += resistor(xa, Tp, xa, Bt, names[1]) + resistor(xb, Tp, xb, Bt, names[2]) + node(xa, Tp) + node(xa, Bt);
  }
  return s + '</svg>';
}

/* ---------- vernier caliper: main scale in mm, vernier with 10 divisions over 9 mm (reads to 0.1 mm) ---------- */
function vernierSvg(reading, label, mark = true) {   // mark: colour the vernier line that lines up (lesson only; it would give away a question)
  const W = 460, H = 150, k = 12, x0 = 30;                     // 12 px per mm
  const whole = Math.floor(reading + 1e-9), tenth = Math.round((reading - whole) * 10);
  const start = Math.max(0, whole - 8), end = start + 34, X = mm => x0 + (mm - start) * k;
  let s = svgOpen(W, H, label) + `<rect class="fig-block" x="${x0 - 10}" y="20" width="${W - 40}" height="50" rx="3"/>`;
  for (let mm = start; mm <= end; mm++) {
    const len = mm % 10 === 0 ? 22 : mm % 5 === 0 ? 16 : 10;
    s += `<line class="fig-wire" style="stroke-width:1.2" x1="${X(mm)}" y1="70" x2="${X(mm)}" y2="${70 - len}"/>`;
    if (mm % 10 === 0 && X(mm) < W - 56) s += txt(X(mm), 42, String(mm / 10), 'fig-small');   // keep clear of the 'cm' label
  }
  s += txt(W - 22, 34, 'cm', 'fig-small', 'end');
  s += `<rect class="fig-shape" x="${X(reading) - 14}" y="70" width="${10 * 0.9 * k + 28}" height="44" rx="3"/>`;
  for (let i = 0; i <= 10; i++) {
    const x = X(reading + i * 0.9), len = i % 5 === 0 ? 18 : 11;
    s += `<line class="fig-wire" style="stroke-width:1.2${mark && i === tenth ? ';stroke:var(--accent)' : ''}" x1="${x.toFixed(1)}" y1="70" x2="${x.toFixed(1)}" y2="${70 + len}"/>`;
    if (i % 5 === 0) s += txt(x, 104, String(i), 'fig-small');
  }
  return s + '</svg>';
}

/* ---------- a beam on supports with loads: items [{ x, kind: 'support' | 'load' | 'pivot', label }], x from 0 to L ---------- */
function beamSvg(L, items, label) {
  const W = 460, H = 196, x0 = 40, x1 = 420, y = 106, X = x => x0 + (x / L) * (x1 - x0);
  let s = svgOpen(W, H, label) + `<rect class="fig-block" x="${x0}" y="${y - 7}" width="${x1 - x0}" height="14" rx="2"/>`;
  const placed = [];   // x of load labels already drawn: a label too close to one goes on a taller arrow
  for (const it of items) {
    const x = X(it.x);
    if (it.kind === 'support' || it.kind === 'pivot') s += `<polygon class="fig-shape" points="${x},${y + 7} ${x - 14},${y + 34} ${x + 14},${y + 34}"/>` + (it.label ? txt(x, y + 52, it.label, 'fig-small') : '');
    else { const up = placed.some(px => Math.abs(px - x) < 48) ? 26 : 0; placed.push(x); s += arrow(x, y - 62 - up, x, y - 9, it.arrow || 'a') + txt(x, y - 68 - up, it.label, 'fig-small'); }
  }
  // distance ticks under the beam at every labelled item
  return s + `<line class="fig-dash" x1="${x0}" y1="${y + 62}" x2="${x1}" y2="${y + 62}"/>` + txt(x0, y + 78, '0', 'fig-small') + txt(x1, y + 78, `${F(L)} m`, 'fig-small') + '</svg>';
}

/* ---------- uniform circular motion: object on a circle with velocity (tangent) and centripetal acceleration ---------- */
function circleSvg(label) {
  const W = 300, H = 260, cx = 140, cy = 130, r = 95, a = rad(35), px = cx + r * Math.cos(a), py = cy - r * Math.sin(a);
  let s = svgOpen(W, H, label) + `<circle class="fig-line fig-dashed" cx="${cx}" cy="${cy}" r="${r}"/><circle class="fig-dot" cx="${cx}" cy="${cy}" r="3"/>`;
  s += `<line class="fig-dash" x1="${cx}" y1="${cy}" x2="${px.toFixed(1)}" y2="${py.toFixed(1)}"/>` + txt(cx + 0.3 * (px - cx) + 14 * Math.sin(a), cy + 0.3 * (py - cy) + 14 * Math.cos(a) + 5, 'r');   // below the radius, near the centre
  s += `<circle class="fig-block" cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="9"/>`;
  s += arrow(px, py, px - 70 * Math.sin(a), py - 70 * Math.cos(a), 'a') + tipLabel(px, py, px - 70 * Math.sin(a), py - 70 * Math.cos(a), 'v');
  s += arrow(px, py, px - 55 * Math.cos(a), py + 55 * Math.sin(a), 'b') + txt(px - 55 * Math.cos(a) - 14 * Math.sin(a), py + 55 * Math.sin(a) - 14 * Math.cos(a) + 2, 'a', 'fig-text', 'end');   // above the arrow head
  return s + '</svg>';
}

/* a sine wave y = A sin(2πx/λ) drawn to scale on labelled axes */
function waveSvg(lambda, A, span, { xl = 'x (m)', yl = 'y (cm)', label, xStep } = {}) {
  const pts = []; for (let i = 0; i <= 160; i++) { const x = span * i / 160; pts.push([x, A * Math.sin(2 * Math.PI * x / lambda)]); }
  return graphSvg(pts, { xMax: span, yMax: A * 1.25, yMin: -A * 1.25, xl, yl, xStep: xStep || lambda / 2, yStep: A, label, dots: false });
}

/* ---------- ray diagram for a mirror or thin lens ----------
   kind: 'concave' | 'convex' | 'plane' (mirrors) or 'converging' | 'diverging' (lenses);
   f: focal length (positive number), s: object distance, same units. Two principal rays are drawn;
   virtual images get dashed extensions. */
function opticsSvg(kind, f, s, label) {
  const W = 460, H = 220, y0 = 110, mirror = !/ing$/.test(kind), fs = kind === 'plane' ? Infinity : (kind === 'convex' || kind === 'diverging' ? -f : f);
  const v = fs === Infinity ? -s : 1 / (1 / fs - 1 / s), m = -v / s;
  const xsD = [-s, mirror ? -v : v, 0];                        // positions in data units (mirror images mirrored)
  if (fs !== Infinity) xsD.push(mirror ? -fs : fs, mirror ? -2 * fs : 2 * fs, mirror ? 0 : -fs);
  const lo = Math.min(...xsD), hi = Math.max(...xsD), k = 380 / Math.max(hi - lo, 1e-9), Xc = 40 + (0 - lo) * k;
  const ho = Math.min(62, 62 / Math.max(1, Math.abs(m))), hi2 = ho * m, X = d => Xc + d * k;
  const xo = X(-s), yt = y0 - ho, xi = X(mirror ? -v : v), yi = y0 - hi2;
  const f1 = n => +n.toFixed(1);
  let out = svgOpen(W, H, label) + `<line class="fig-line" x1="10" y1="${y0}" x2="${W - 10}" y2="${y0}"/>`;
  // the optical element
  if (kind === 'plane') out += `<line class="fig-wire" x1="${f1(Xc)}" y1="${y0 - 90}" x2="${f1(Xc)}" y2="${y0 + 90}"/>` + [...Array(9)].map((_, i) => `<line class="fig-line" x1="${f1(Xc)}" y1="${y0 - 80 + i * 20}" x2="${f1(Xc + 9)}" y2="${y0 - 88 + i * 20}"/>`).join('');
  else if (mirror) { const b = kind === 'concave' ? -9 : 9; out += `<path class="fig-wire" fill="none" d="M${f1(Xc + b)} ${y0 - 90} Q${f1(Xc - b)} ${y0} ${f1(Xc + b)} ${y0 + 90}"/>`; }
  else if (kind === 'converging') out += `<path class="fig-shape" d="M${f1(Xc)} ${y0 - 92} Q${f1(Xc + 16)} ${y0} ${f1(Xc)} ${y0 + 92} Q${f1(Xc - 16)} ${y0} ${f1(Xc)} ${y0 - 92}Z"/>`;
  else out += `<path class="fig-shape" d="M${f1(Xc - 9)} ${y0 - 92} L${f1(Xc + 9)} ${y0 - 92} Q${f1(Xc + 1)} ${y0} ${f1(Xc + 9)} ${y0 + 92} L${f1(Xc - 9)} ${y0 + 92} Q${f1(Xc - 1)} ${y0} ${f1(Xc - 9)} ${y0 - 92}Z"/>`;
  // focal points (F) and centre of curvature / 2F
  if (fs !== Infinity) {
    const marks = mirror ? [[-fs, 'F'], [-2 * fs, 'C']] : [[fs, 'F'], [-fs, 'F'], [2 * fs, '2F'], [-2 * fs, '2F']];
    for (const [d, t] of marks) { const x = X(d); if (x > 12 && x < W - 12) out += `<circle class="fig-dot" cx="${f1(x)}" cy="${y0}" r="3"/>` + txt(x, y0 + 20, t, 'fig-small'); }
  }
  // a ray from p in direction d, clipped to the picture
  const ray = (px, py, dx, dy, dashed) => {
    let t = Infinity;
    if (dx > 0) t = Math.min(t, (W - 8 - px) / dx); if (dx < 0) t = Math.min(t, (8 - px) / dx);
    if (dy > 0) t = Math.min(t, (H - 6 - py) / dy); if (dy < 0) t = Math.min(t, (6 - py) / dy);
    return `<line class="fig-vec fig-vec-${dashed ? 'c' : 'b'}${dashed ? ' fig-dashed' : ''}" style="stroke-width:1.6" x1="${f1(px)}" y1="${f1(py)}" x2="${f1(px + t * dx)}" y2="${f1(py + t * dy)}"/>`;
  };
  const seg = (x1, y1, x2, y2, dashed) => `<line class="fig-vec fig-vec-${dashed ? 'c' : 'b'}${dashed ? ' fig-dashed' : ''}" style="stroke-width:1.6" x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}"/>`;
  const dir = mirror ? -1 : 1;                                // rays leave to the left from a mirror, to the right from a lens
  // ray 1: parallel to the axis, then through (or away from) F
  out += seg(xo, yt, Xc, yt);
  out += fs === Infinity ? ray(Xc, yt, dir, 0) : ray(Xc, yt, dir * Math.abs(fs) * k, Math.sign(fs) * (y0 - yt));
  // ray 2: through the centre of the lens, or to the pole of the mirror and back at the same angle
  out += seg(xo, yt, Xc, y0);
  out += ray(Xc, y0, mirror ? -(Xc - xo) : Xc - xo, y0 - yt);
  if (v < 0) out += seg(Xc, yt, xi, yi, true) + seg(Xc, y0, xi, yi, true);   // virtual image: extend the rays back
  out += arrow(xo, y0, xo, yt, 'a') + arrow(xi, y0, xi, yi, v < 0 ? 'c' : 'a');
  return out + '</svg>';
}

/* ---------- refraction at a flat boundary: incident angle i, refracted angle r (degrees); r = null for total internal reflection ---------- */
function refractionSvg(i, r, top, bottom, label) {
  const W = 360, H = 240, cx = 180, cy = 120, L = 105, f1 = n => +n.toFixed(1);
  let s = svgOpen(W, H, label) + `<rect class="fig-block" x="10" y="${cy}" width="${W - 20}" height="${H - cy - 10}" style="opacity:.35"/>`;
  s += `<line class="fig-line" x1="10" y1="${cy}" x2="${W - 10}" y2="${cy}"/><line class="fig-dash" x1="${cx}" y1="14" x2="${cx}" y2="${H - 14}"/>`;
  s += txt(22, cy - 10, top, 'fig-small', 'start') + txt(22, cy + 22, bottom, 'fig-small', 'start');
  const ix = cx - L * sinD(i), iy = cy - L * cosD(i);
  s += arrow(ix, iy, cx - 0.45 * L * sinD(i), cy - 0.45 * L * cosD(i), 'a') + `<line class="fig-vec fig-vec-a" style="stroke-width:2.4" x1="${f1(ix)}" y1="${f1(iy)}" x2="${cx}" y2="${cy}"/>`;
  s += txt(cx - 34 * tanD(Math.min(i, 72)) - 10, cy - 30, `${i}°`, 'fig-small', 'end');   // just outside the incident ray
  if (r == null) {
    const rx = cx + L * sinD(i), ry = cy - L * cosD(i);
    s += arrow(cx, cy, rx, ry, 'b');
  } else {
    const rx = cx + L * sinD(r), ry = cy + L * cosD(r);
    s += arrow(cx, cy, rx, ry, 'b') + txt(cx + 30 * sinD(r / 2) + 8, cy + 50 * cosD(r / 2), 'r', 'fig-small', 'start');
    s += `<line class="fig-vec fig-vec-c fig-dashed" style="stroke-width:1.2" x1="${cx}" y1="${cy}" x2="${f1(cx + 0.7 * L * sinD(i))}" y2="${f1(cy - 0.7 * L * cosD(i))}"/>`;
  }
  return s + '</svg>';
}

/* ---------- Young's double slit: slits, screen and the bright fringes ---------- */
function slitSvg(label) {
  const W = 460, H = 220, xs = 110, xScr = 380, cy = 110, f1 = n => +n.toFixed(1);
  let s = svgOpen(W, H, label);
  s += `<line class="fig-wire" x1="${xs}" y1="16" x2="${xs}" y2="${cy - 22}"/><line class="fig-wire" x1="${xs}" y1="${cy - 12}" x2="${xs}" y2="${cy + 12}"/><line class="fig-wire" x1="${xs}" y1="${cy + 22}" x2="${xs}" y2="${H - 16}"/>`;
  s += `<line class="fig-wire" x1="${xScr}" y1="12" x2="${xScr}" y2="${H - 12}"/>`;
  for (let k = -3; k <= 3; k++) { const y = cy + k * 26; s += `<rect class="fig-block" x="${xScr + 4}" y="${f1(y - 5)}" width="${24 - 4 * Math.abs(k)}" height="10" rx="2" style="fill:var(--accent);opacity:${f1(1 - Math.abs(k) * 0.2)}"/>`; }
  for (const y of [cy - 17, cy + 17]) s += `<line class="fig-vec fig-vec-c fig-dashed" style="stroke-width:1.2" x1="${xs}" y1="${y}" x2="${xScr}" y2="${cy + 52}"/>`;
  for (let k = 0; k < 4; k++) s += `<path class="fig-line" fill="none" d="M${40 + k * 14} ${cy - 40} Q${50 + k * 14} ${cy} ${40 + k * 14} ${cy + 40}"/>`;
  s += `<line class="fig-dash" x1="${xs}" y1="${cy}" x2="${xScr}" y2="${cy}"/>`;
  s += txt(xs - 8, cy + 5, 'd', 'fig-text', 'end') + txt((xs + xScr) / 2, cy - 8, 'L') + txt(xScr + 44, cy + 34, 'Δy', 'fig-small', 'start');
  s += `<line class="fig-line" x1="${xScr + 36}" y1="${cy}" x2="${xScr + 36}" y2="${cy + 26}"/>`;
  return s + '</svg>';
}

/* ---------- hydrogen energy levels E_n = −13.6/n² eV (spaced by √|E| so the upper levels stay readable), with an optional transition arrow from level a to level b ---------- */
function levelsSvg(nMax, a, b, label) {
  const W = 360, H = 250, top = 24, bot = 226, Y = E => top + Math.sqrt(E / -13.6) * (bot - top), f1 = n => +n.toFixed(1);
  let s = svgOpen(W, H, label);
  for (let n = 1; n <= nMax; n++) {
    const E = -13.6 / (n * n), y = Y(E);
    s += `<line class="fig-wire" x1="70" y1="${f1(y)}" x2="250" y2="${f1(y)}"/>`;
    if (n <= 4) s += txt(62, y + 4, `n = ${n}`, 'fig-small', 'end') + txt(258, y + 4, `${F(sig(E, 3))} eV`, 'fig-small', 'start');
  }
  s += `<line class="fig-dash" x1="70" y1="${top - 8}" x2="250" y2="${top - 8}"/>` + txt(258, top - 4, '0 eV (∞)', 'fig-small', 'start');
  if (a && b) { const ya = Y(-13.6 / (a * a)), yb = Y(-13.6 / (b * b)); s += arrow(160, ya, 160, yb, a > b ? 'a' : 'b'); }
  return s + '</svg>';
}
