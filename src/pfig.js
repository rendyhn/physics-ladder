/* ==========================================================================
   Physics figures built on fig.js: apparatus, set-ups and motion diagrams.
   ========================================================================== */
const zigzag = (x1, y1, x2, y2, n = 8, w = 7) => {   // a spring drawn as a zigzag between two points
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, px = -uy, py = ux, pts = [[x1, y1], [x1 + ux * 6, y1 + uy * 6]];
  for (let i = 0; i < n; i++) { const t = 6 + (L - 12) * (i + 0.5) / n, s = i % 2 ? -w : w; pts.push([x1 + ux * t + px * s, y1 + uy * t + py * s]); }
  pts.push([x2 - ux * 6, y2 - uy * 6], [x2, y2]);
  return sPline(pts, 'mf-line', ' stroke-width="1.8"');
};
const ball = (x, y, r = 9, cls = 'mf-s1') => sC(x, y, r, cls, ' stroke="var(--ink-2)" stroke-width="1.2"');
const water = (x, y, w, h) => sR(x, y, w, h, 'mf-f1');

/* --- A. foundations --- */
function targetsSvg() {
  const cw = 120, pts = [[[0, 0], [3, -2], [-2, 3], [2, 2], [-3, -1], [1, -3]], [[22, -18], [26, -15], [19, -21], [24, -22], [20, -14], [27, -19]], [[0, -24], [22, 6], [-20, 12], [8, 22], [-14, -16], [18, -12]], [[30, 10], [-8, -28], [16, 30], [-30, 4], [34, -20], [0, 16]]];
  const lab = [[T`precise`, T`accurate`], [T`precise`, T`not accurate`], [T`not precise`, T`accurate`], [T`not precise`, T`not accurate`]];
  let s = svgBox(cw * 4, 150, T`Four targets showing accurate and precise, precise but not accurate, accurate but not precise, and neither`);
  pts.forEach((set, i) => {
    const cx = i * cw + cw / 2, cy = 56;
    s += sC(cx, cy, 46, 'mf-cell', ' stroke-width="1.4"') + sC(cx, cy, 31, 'mf-s2l', ' stroke-width="1.2"') + sC(cx, cy, 15, 'mf-s4l', ' stroke-width="1.2"');
    s += set.map(([dx, dy]) => sC(cx + dx, cy + dy, 3.6, 'mf-dot')).join('') + sT(cx, 124, lab[i][0], 'mf-small') + sT(cx, 140, lab[i][1], 'mf-small');
  });
  return s + '</svg>';
}

/* --- B. mechanics --- */
function tickerSvg() {
  let s = svgBox(460, 130, T`Two ticker tapes: equal gaps for constant velocity and growing gaps for speeding up`);
  [[T`constant velocity: equal gaps`, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => i * 34)], [T`speeding up: growing gaps`, [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => i * i * 5.2)]].forEach(([t, xs], k) => {
    const y = 34 + k * 62;
    s += sT(10, y - 12, t, 'mf-small', 'start') + sR(10, y - 8, 440, 16, 'mf-cellc', 2) + xs.map(x => sC(24 + x, y, 3.4, 'mf-dot')).join('');
  });
  return s + '</svg>';
}
function strobeSvg() {   // a dropped ball photographed every second (g = 10 m/s²)
  const k = 3.3, y0 = 24;
  let s = svgBox(320, 300, T`Positions of a dropped ball every second: 0, 5, 20, 45 and 80 metres below the start`);
  s += sL(70, y0, 70, y0 + 80 * k, 'mf-axis');
  for (let h = 0; h <= 80; h += 10) s += sL(64, y0 + h * k, 70, y0 + h * k, 'mf-axis') + (h % 20 === 0 ? sT(58, y0 + h * k + 4, `${h} m`, 'mf-small', 'end') : '');
  [0, 1, 2, 3, 4].forEach(t => { const y = y0 + 5 * t * t * k; s += ball(110, y, 6, t ? 'mf-s1' : 'mf-s4') + sT(128, y + 4, `t = ${t} s`, 'mf-small', 'start') + (t ? sT(200, y + 4, `v = ${10 * t} m/s`, 'mf-small', 'start') : ''); });
  return s + '</svg>';
}
function loopSvg() {   // forces on a ball whirled in a vertical circle
  const cx = 150, cy = 120, r = 78;
  let s = svgBox(300, 240, T`Ball on a string in a vertical circle: at the top tension and weight both point down, at the bottom tension points up and weight down`) + sC(cx, cy, r, 'mf-ring', ' stroke-dasharray="5 4"') + sC(cx, cy, 3, 'mf-dot');
  s += sL(cx, cy, cx, cy - r, 'mf-thin') + sL(cx, cy, cx, cy + r, 'mf-thin');
  s += ball(cx, cy - r) + sArrow(cx - 12, cy - r + 4, cx - 12, cy - r + 40, 'mf-c1', 8) + sArrow(cx + 12, cy - r + 4, cx + 12, cy - r + 34, 'mf-c2', 8) + sT(cx - 18, cy - r + 36, 'T', 'mf-var', 'end') + sT(cx + 18, cy - r + 32, 'mg', 'mf-var', 'start');
  s += ball(cx, cy + r) + sArrow(cx - 12, cy + r - 4, cx - 12, cy + r - 58, 'mf-c1', 8) + sArrow(cx + 12, cy + r + 4, cx + 12, cy + r + 34, 'mf-c2', 8) + sT(cx - 18, cy + r - 40, 'T', 'mf-var', 'end') + sT(cx + 18, cy + r + 30, 'mg', 'mf-var', 'start');
  return s + sT(cx + 30, cy - r - 6, T`top`, 'mf-small', 'start') + sT(cx + 30, cy + r + 8, T`bottom`, 'mf-small', 'start') + '</svg>';
}
function thirdLawSvg() {
  let s = svgBox(340, 150, T`Two blocks pushing on each other with equal and opposite forces`);
  s += sL(10, 120, 330, 120, 'mf-axis') + sR(60, 50, 110, 70, 'mf-s1l', 4, ' stroke-width="1.6"') + sR(170, 50, 110, 70, 'mf-s2l', 4, ' stroke-width="1.6"');
  s += sT(115, 110, 'A', 'mf-var') + sT(225, 110, 'B', 'mf-var');
  s += sArrow(172, 72, 250, 72, 'mf-c1', 9) + sArrow(168, 92, 90, 92, 'mf-c2', 9) + sT(212, 64, T`A on B`, 'mf-small') + sT(128, 86, T`B on A`, 'mf-small');
  return s + '</svg>';
}
function workAngleSvg() {
  const x0 = 90, y0 = 110, a = 30 * Math.PI / 180, L = 120;
  let s = svgBox(340, 150, T`A box pulled by a rope at 30 degrees; only the horizontal component F cos theta does work along the floor`);
  s += sL(10, 130, 330, 130, 'mf-axis') + sR(30, 90, 60, 40, 'mf-s1l', 3, ' stroke-width="1.6"');
  s += sArrow(x0, y0, x0 + L * Math.cos(a), y0 - L * Math.sin(a), 'mf-c1', 9) + sArrow(x0, y0, x0 + L * Math.cos(a), y0, 'mf-c2', 9) + sL(x0 + L * Math.cos(a), y0, x0 + L * Math.cos(a), y0 - L * Math.sin(a), 'mf-thin', ' stroke-dasharray="4 3"');
  s += sAngle(x0, y0, 34, 0, 30, 'mf-c4') + sT(x0 + 42, y0 - 8, 'θ', 'mf-var', 'start') + sT(x0 + L * Math.cos(a) + 8, y0 - L * Math.sin(a), 'F', 'mf-var', 'start') + sT(x0 + L * Math.cos(a) + 8, y0 + 4, 'F cos θ', 'mf-lab', 'start');
  return s + sArrow(200, 145, 290, 145, 'mf-line', 7) + sT(245, 141, 's', 'mf-var') + '</svg>';
}
function cart(x, y, w, t, cls) { return sR(x, y, w, 30, cls, 5, ' stroke-width="1.6"') + sC(x + 12, y + 34, 6, 'mf-cellc', ' stroke="var(--ink-2)"') + sC(x + w - 12, y + 34, 6, 'mf-cellc', ' stroke="var(--ink-2)"') + sT(x + w / 2, y + 20, t, 'mf-lab-b'); }
function collisionSvg() {
  let s = svgBox(440, 200, T`Before: a 2 kg cart at 6 m/s moves towards a 1 kg cart at rest. After: they move together at 4 m/s`);
  s += sT(10, 22, T`before`, 'mf-lab-b', 'start') + sL(10, 76, 430, 76, 'mf-axis') + cart(40, 36, 70, '2 kg', 'mf-s1l') + sArrow(114, 51, 170, 51, 'mf-c1', 8) + sT(142, 44, '6 m/s', 'mf-small') + cart(250, 36, 50, '1 kg', 'mf-s2l') + sT(275, 30, 'v = 0', 'mf-small');
  s += sT(10, 118, T`after`, 'mf-lab-b', 'start') + sL(10, 172, 430, 172, 'mf-axis') + cart(200, 132, 70, '2 kg', 'mf-s1l') + cart(270, 132, 50, '1 kg', 'mf-s2l') + sArrow(324, 147, 364, 147, 'mf-c1', 8) + sT(344, 140, '4 m/s', 'mf-small');
  return s + '</svg>';
}
function wrenchSvg() {
  const px = 50, py = 110, ex = 280, a = 60 * Math.PI / 180, L = 76;
  let s = svgBox(360, 160, T`A spanner turned about a bolt: the force F at angle theta to the handle, a distance r from the axis`);
  s += sL(px, py, ex + 14, py, 'mf-line', ' stroke-width="12" stroke-linecap="round"') + sC(px, py, 16, 'mf-s2l', ' stroke-width="1.6"') + sC(px, py, 4, 'mf-dot');
  s += sArrow(ex, py, ex + L * Math.cos(a), py - L * Math.sin(a), 'mf-c1', 9) + sArrow(ex, py, ex, py - L * Math.sin(a), 'mf-c2', 8) + sAngle(ex, py, 26, 0, 60, 'mf-c4');
  s += sT(ex + L * Math.cos(a) + 6, py - L * Math.sin(a) + 4, 'F', 'mf-var', 'start') + sT(ex - 8, py - L * Math.sin(a) / 2, 'F sin θ', 'mf-lab', 'end') + sT(ex + 30, py - 8, 'θ', 'mf-var', 'start');
  return s + sArrow(px, py + 26, ex, py + 26, 'mf-line', 7) + sArrow(ex, py + 26, px, py + 26, 'mf-line', 7) + sT((px + ex) / 2, py + 44, 'r', 'mf-var') + sT(px, py - 24, T`axis`, 'mf-small') + '</svg>';
}
function toppleSvg() {
  const one = (ox, tilt, ok) => {
    const w = 50, h = 120, a = tilt * Math.PI / 180, P = (x, y) => [ox + x * Math.cos(a) - y * Math.sin(a), 170 - x * Math.sin(a) - y * Math.cos(a)];
    const c = P(-w / 2, h / 2);
    let t = sPoly([P(0, 0), P(-w, 0), P(-w, h), P(0, h)], ok ? 'mf-s2l' : 'mf-s4l', ' stroke-width="1.6"') + sC(...c, 5, 'mf-dot') + sL(c[0], c[1], c[0], 170, 'mf-c1', ' stroke-dasharray="5 4" stroke-width="2"') + sC(ox, 170, 4, 'mf-open');
    return t + sT(ox - 30, 196, ok ? T`falls back` : T`topples`, 'mf-lab-b');
  };
  return svgBox(360, 206, T`Two tilted boxes: when the vertical line through the centre of gravity stays over the base the box falls back; when it passes outside, the box topples`) + sL(10, 170, 350, 170, 'mf-axis') + one(130, 12, true) + one(300, 35, false) + '</svg>';
}
function orbitSvg() {
  const cx = 130, cy = 120, R = 40, r = 96, a = 40 * Math.PI / 180, sx = cx + r * Math.cos(a), sy = cy - r * Math.sin(a);
  let s = svgBox(300, 240, T`A satellite of mass m in a circular orbit of radius r around a planet of mass M; gravity points to the centre and the velocity along the tangent`);
  s += sC(cx, cy, r, 'mf-ring', ' stroke-dasharray="5 4"') + sC(cx, cy, R, 'mf-s2l', ' stroke-width="1.6"') + sT(cx, cy + 5, 'M', 'mf-var') + sL(cx, cy, sx, sy, 'mf-thin') + sT((cx + sx) / 2 - 8, (cy + sy) / 2 - 6, 'r', 'mf-var', 'end');
  s += sArrow(sx, sy, sx - 40 * Math.cos(a), sy + 40 * Math.sin(a), 'mf-c2', 8) + sArrow(sx, sy, sx - 60 * Math.sin(a), sy - 60 * Math.cos(a), 'mf-c1', 8) + ball(sx, sy, 7, 'mf-s4');
  return s + sT(sx + 12, sy + 2, 'm', 'mf-var', 'start') + sT(sx - 60 * Math.sin(a) - 4, sy - 60 * Math.cos(a) - 6, 'v', 'mf-var', 'end') + sT(sx - 44 * Math.cos(a) + 4, sy + 44 * Math.sin(a) + 14, 'F', 'mf-var') + '</svg>';
}
function springsSvg() {
  const block = (x, y, t) => sR(x - 22, y, 44, 26, 'mf-s1l', 3, ' stroke-width="1.6"') + sT(x, y + 18, t, 'mf-small');
  let s = svgBox(380, 230, T`A single spring, two springs in parallel and two springs in series, each holding a load`) + sL(20, 20, 360, 20, 'mf-line', ' stroke-width="3"');
  s += zigzag(70, 20, 70, 120) + block(70, 120, 'm') + sT(70, 176, T`single: k`, 'mf-small');
  s += zigzag(170, 20, 170, 100) + zigzag(210, 20, 210, 100) + sR(160, 100, 60, 6, 'mf-ink', 1) + block(190, 106, 'm') + sT(190, 176, T`parallel: k₁ + k₂`, 'mf-small');
  s += zigzag(310, 20, 310, 80, 6) + sC(310, 83, 3, 'mf-dot') + zigzag(310, 86, 310, 146, 6) + block(310, 146, 'm') + sT(310, 196, T`series: softer`, 'mf-small');
  return s + '</svg>';
}
function tankSvg() {   // pressure grows with depth
  let s = svgBox(320, 250, T`A tank of water with arrows on the wall that grow longer with depth, showing that pressure increases with depth`);
  s += water(40, 40, 170, 190) + sPline([[40, 20], [40, 230], [210, 230], [210, 20]], 'mf-line', ' stroke-width="2.5"') + sL(40, 40, 210, 40, 'mf-c1', ' stroke-width="1.5"');
  [[80, 12], [120, 26], [160, 40], [200, 54]].forEach(([y, L]) => { s += sArrow(214, y, 214 + L, y, 'mf-c2', 7); });
  s += sArrow(20, 44, 20, 196, 'mf-line', 7) + sT(14, 124, 'h', 'mf-var', 'end') + sC(120, 200, 3, 'mf-dot') + sT(112, 196, 'p = p₀ + ρgh', 'mf-small', 'end');
  return s + sT(274, 210, T`higher pressure`, 'mf-small', 'end') + '</svg>';
}
function hydraulicSvg() {
  let s = svgBox(380, 230, T`Hydraulic press: a small force on a small piston produces a large force on a large piston`);
  s += water(50, 70, 30, 120) + water(50, 170, 280, 30) + water(210, 100, 120, 80);
  s += sPline([[50, 30], [50, 200], [330, 200], [330, 60]], 'mf-line', ' stroke-width="2.5"') + sPline([[80, 30], [80, 170], [210, 170], [210, 60]], 'mf-line', ' stroke-width="2.5"');
  s += sR(50, 62, 30, 10, 'mf-ink') + sR(210, 92, 120, 10, 'mf-ink') + sR(236, 56, 68, 36, 'mf-s4l', 3, ' stroke-width="1.4"') + sT(270, 79, T`load`, 'mf-small');
  s += sArrow(65, 18, 65, 58, 'mf-c1', 8) + sT(74, 30, 'F₁', 'mf-var', 'start') + sArrow(350, 96, 350, 30, 'mf-c2', 9) + sT(356, 50, 'F₂', 'mf-var', 'start');
  return s + sT(65, 220, 'A₁', 'mf-var') + sT(270, 220, 'A₂', 'mf-var') + '</svg>';
}
function buoyancySvg() {
  let s = svgBox(280, 220, T`A stone under water: its weight acts down and the buoyant force acts up`);
  s += water(20, 40, 240, 170) + sL(20, 40, 260, 40, 'mf-c1', ' stroke-width="1.5"') + sR(110, 100, 60, 50, 'mf-s4l', 6, ' stroke-width="1.6"');
  s += sArrow(140, 100, 140, 56, 'mf-c2', 9) + sArrow(140, 150, 140, 200, 'mf-c1', 9) + sT(148, 66, sub('F', 'B') + ' = ρgV', 'mf-lab-b', 'start') + sT(148, 196, 'W = mg', 'mf-lab-b', 'start');
  return s + '</svg>';
}
function pipeSvg() {   // Venturi: narrow section, faster flow, lower pressure
  let s = svgBox(420, 220, T`A pipe that narrows: the fluid moves faster in the narrow part and the pressure there is lower, shown by the lower column in the gauge tube`);
  const top = 'M20 80 L150 80 C190 80 200 110 240 110 L400 110', bot = 'L400 170 L240 170 C200 170 190 200 150 200 L20 200 Z';
  s += sP(top + ' ' + bot, 'mf-s1l', ' stroke="none"') + sP(top, 'mf-line', ' fill="none" stroke-width="2.5"') + sP('M20 200 L150 200 C190 200 200 170 240 170 L400 170', 'mf-line', ' fill="none" stroke-width="2.5"');
  s += sR(80, 20, 16, 60, 'mf-cell') + sR(80, 36, 16, 44, 'mf-f1') + sR(310, 50, 16, 60, 'mf-cell') + sR(310, 82, 16, 28, 'mf-f1');
  [120, 160].forEach(y => { s += sArrow(40, y, 80, y, 'mf-c2', 7); }); [128, 152].forEach(y => { s += sArrow(260, y, 350, y, 'mf-c2', 7); });
  return s + sT(60, 186, 'A₁, v₁', 'mf-lab', 'start') + sT(300, 186, 'A₂, v₂', 'mf-lab') + sT(104, 30, T`higher p`, 'mf-small', 'start') + sT(334, 60, T`lower p`, 'mf-small', 'start') + '</svg>';
}
function torricelliSvg() {
  let s = svgBox(360, 230, T`Water leaving a hole at depth h below the surface of an open tank, with speed root 2gh`);
  s += water(30, 40, 120, 170) + sPline([[30, 20], [30, 210], [150, 210], [150, 20]], 'mf-line', ' stroke-width="2.5"') + sL(30, 40, 150, 40, 'mf-c1', ' stroke-width="1.5"');
  const hy = 150; s += sArrow(170, 40, 170, hy, 'mf-line', 7) + sArrow(170, hy, 170, 40, 'mf-line', 7) + sT(178, 100, 'h', 'mf-var', 'start');
  s += sP(`M150 ${hy} Q230 ${hy} 290 222`, 'mf-c1', ' fill="none" stroke-width="5" stroke-opacity="0.6"') + sArrow(152, hy, 196, hy, 'mf-c2', 8) + sT(200, hy - 8, 'v = √(2gh)', 'mf-lab-b', 'start');
  return s + '</svg>';
}
function comSvg() {
  let s = svgBox(360, 140, T`A 2 kg mass and a 1 kg mass 3 m apart on a light rod; the centre of mass is 1 m from the heavier mass`);
  s += sL(60, 60, 300, 60, 'mf-line', ' stroke-width="4"') + ball(60, 60, 22, 'mf-s1l') + sT(60, 65, '2 kg', 'mf-small') + ball(300, 60, 15, 'mf-s2l') + sT(300, 64, '1 kg', 'mf-small');
  s += sPoly([[140, 64], [130, 84], [150, 84]], 'mf-s4') + sT(140, 100, T`centre of mass`, 'mf-small');
  return s + sArrow(60, 118, 140, 118, 'mf-line', 6) + sArrow(140, 118, 60, 118, 'mf-line', 6) + sT(100, 132, '1 m', 'mf-small') + sArrow(140, 118, 300, 118, 'mf-line', 6) + sArrow(300, 118, 140, 118, 'mf-line', 6) + sT(220, 132, '2 m', 'mf-small') + '</svg>';
}

/* --- C. waves and sound --- */
function oscSvg() {   // mass on a spring and a simple pendulum
  let s = svgBox(460, 190, T`A mass on a spring oscillating between minus A and plus A, and a pendulum swinging about its lowest point`);
  s += sL(20, 30, 20, 110, 'mf-line', ' stroke-width="4"') + sL(20, 110, 240, 110, 'mf-axis');
  s += zigzag(20, 80, 150, 80, 10) + sR(150, 60, 40, 40, 'mf-s1l', 4, ' stroke-width="1.6"');
  [[90, '−A'], [130, '0'], [170, '+A']].forEach(([x, t]) => { s += sR(x, 60, 40, 40, 'mf-frame', 4, ' stroke-dasharray="4 3"') + sT(x + 20, 132, t, 'mf-lab'); });
  s += sArrow(110, 150, 190, 150, 'mf-c2', 7) + sArrow(190, 150, 110, 150, 'mf-c2', 7) + sT(150, 170, T`oscillates`, 'mf-small');
  const px = 350, py = 24, L = 120, a = 22 * Math.PI / 180, bx = px + L * Math.sin(a), by = py + L * Math.cos(a);
  s += sL(300, py, 400, py, 'mf-line', ' stroke-width="3"') + sL(px, py, px, py + L + 10, 'mf-grid', ' stroke-dasharray="4 3"') + sL(px, py, px - L * Math.sin(a), py + L * Math.cos(a), 'mf-thin', ' stroke-dasharray="4 3"') + sL(px, py, bx, by, 'mf-line', ' stroke-width="1.8"');
  s += ball(px - L * Math.sin(a), py + L * Math.cos(a), 10, 'mf-cell') + ball(bx, by, 10) + sP(`M${f1(px - L * Math.sin(a))} ${f1(py + L * Math.cos(a) + 16)} Q${px} ${py + L + 26} ${f1(bx)} ${f1(by + 16)}`, 'mf-c2', ' fill="none"');
  return s + sT(px + 26, py + 60, 'L', 'mf-var', 'start') + sT(px, py + L + 44, T`pendulum`, 'mf-small') + '</svg>';
}
function longWaveSvg() {
  const lam = 96, xs = []; for (let i = 0; i < 44; i++) { const x0 = 16 + i * 10; xs.push(x0 + 7 * Math.sin(2 * Math.PI * x0 / lam)); }
  let s = svgBox(460, 130, T`A longitudinal wave: bunched-up regions (compressions) and spread-out regions (rarefactions) along the direction of travel`);
  s += xs.map(x => sL(x, 34, x, 90, 'mf-line', ' stroke-width="1.6"')).join('');
  const c1 = 16 + lam / 2, c2 = c1 + lam;   // compressions where the displacement gradient packs lines together
  s += sT(c1, 24, 'C', 'mf-lab-b') + sT(c2, 24, 'C', 'mf-lab-b') + sT(c1 + lam / 2, 24, 'R', 'mf-lab-b') + sT(c2 + lam / 2, 24, 'R', 'mf-lab-b');
  return s + sArrow(c1, 106, c2, 106, 'mf-c2', 7) + sArrow(c2, 106, c1, 106, 'mf-c2', 7) + sT((c1 + c2) / 2, 122, 'λ', 'mf-var') + sArrow(360, 112, 440, 112, 'mf-line', 7) + sT(400, 126, T`travel`, 'mf-small') + '</svg>';
}
function dopplerSvg() {
  const xs = 250, vs = 16, v = 30;
  let s = svgBox(420, 220, T`Wavefronts from a moving source are squeezed together in front of it and stretched out behind it`);
  for (let k = 1; k <= 5; k++) s += sC(xs - k * vs, 110, k * v, 'mf-ring', ' stroke-width="1.4"');
  s += ball(xs, 110, 7, 'mf-s4') + sArrow(xs + 10, 110, xs + 44, 110, 'mf-c1', 7);
  return s + sT(404, 30, T`higher f`, 'mf-lab-b', 'end') + sT(16, 30, T`lower f`, 'mf-lab-b', 'start') + '</svg>';
}
/* --- D. heat --- */
function thermometersSvg() {
  const col = (x, name, top, bot, zero) => sR(x - 9, 30, 18, 180, 'mf-cell', 9, ' stroke-width="1.5"') + sR(x - 5, 110, 10, 96, 'mf-s4', 4) + sC(x, 214, 12, 'mf-s4') + sT(x, 20, name, 'mf-lab-b') + sT(x + 16, 64, top, 'mf-small', 'start') + sT(x + 16, 154, bot, 'mf-small', 'start') + (zero ? sT(x + 16, 196, zero, 'mf-small', 'start') : '');
  let s = svgBox(360, 236, T`Celsius, kelvin and Fahrenheit thermometers with the boiling and freezing points of water marked`);
  s += sL(20, 60, 340, 60, 'mf-c1', ' stroke-dasharray="5 4"') + sL(20, 150, 340, 150, 'mf-c2', ' stroke-dasharray="5 4"');
  return s + col(70, '°C', '100', '0') + col(180, 'K', '373', '273') + col(290, '°F', '212', '32') + sT(20, 54, T`water boils`, 'mf-small', 'start') + sT(20, 144, T`water freezes`, 'mf-small', 'start') + '</svg>';
}
function engineSvg() {
  let s = svgBox(320, 230, T`Heat engine: heat from the hot source, part turned into work, the rest rejected to the cold sink`);
  s += sR(60, 10, 200, 40, 'mf-s4l', 6, ' stroke-width="1.6"') + sT(160, 35, T`hot source`, 'mf-lab-b') + sR(60, 180, 200, 40, 'mf-s1l', 6, ' stroke-width="1.6"') + sT(160, 205, T`cold sink`, 'mf-lab-b');
  s += sC(160, 115, 30, 'mf-s2l', ' stroke-width="1.6"') + sT(160, 120, T`engine`, 'mf-small');
  s += sL(160, 50, 160, 85, 'mf-c4', ' stroke-width="10"') + sArrow(160, 60, 160, 88, 'mf-c4', 12) + sT(174, 72, sub('Q', 'H'), 'mf-var', 'start');
  s += sL(160, 145, 160, 172, 'mf-c1', ' stroke-width="5"') + sArrow(160, 150, 160, 178, 'mf-c1', 10) + sT(174, 166, sub('Q', 'C'), 'mf-var', 'start');
  return s + sL(190, 115, 262, 115, 'mf-c2', ' stroke-width="6"') + sArrow(200, 115, 280, 115, 'mf-c2', 11) + sT(250, 105, 'W', 'mf-var') + '</svg>';
}
function heatWaysSvg() {
  let s = svgBox(480, 190, T`Conduction along a metal rod, convection currents in a heated pan of water, and radiation from the Sun`);
  // conduction
  s += sR(20, 70, 130, 16, 'mf-s4l', 3, ' stroke-width="1.4"') + sP('M26 118 q8 -18 0 -30 q14 10 10 30 q10 -8 8 -18 q10 14 0 18 z', 'mf-s4') + [50, 80, 110].map(x => sArrow(x, 60, x + 22, 60, 'mf-c4', 6)).join('') + sT(85, 170, T`conduction`, 'mf-lab-b');
  // convection
  s += sPline([[180, 50], [180, 130], [300, 130], [300, 50]], 'mf-line', ' stroke-width="2.4"') + water(182, 62, 116, 66) + sP('M205 120 C200 80 225 70 240 80 C255 90 275 80 270 120', 'mf-c1', ' fill="none" stroke-width="2"') + sArrow(206, 100, 206, 80, 'mf-c4', 7) + sArrow(270, 90, 270, 110, 'mf-c1', 7) + sP('M232 150 q8 -18 0 -16 q14 10 10 16 z', 'mf-s4') + sT(240, 170, T`convection`, 'mf-lab-b');
  // radiation
  s += sC(360, 90, 24, 'mf-s4l', ' stroke-width="1.4"') + [60, 90, 120].map(y => sP(`M390 ${y} q6 -8 12 0 t12 0 t12 0 t12 0 t12 0`, 'mf-c4', ' fill="none" stroke-width="1.8"') + sArrow(446, y, 460, y, 'mf-c4', 6)).join('') + sT(410, 170, T`radiation`, 'mf-lab-b');
  return s + '</svg>';
}
/* --- E. electricity and magnetism --- */
const chargeSign = (x, y, q, r = 12) => sC(x, y, r, q > 0 ? 'mf-s4l' : 'mf-s1l', ' stroke-width="1.6"') + sT(x, y + 5, q > 0 ? '+' : '−', 'mf-lab-b');
function fieldLinesSvg() {
  let s = svgBox(480, 170, T`Electric field lines: pointing outward from a positive charge, curving from positive to negative for a pair, and straight and evenly spaced between charged plates`);
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; s += sArrow(70 + 16 * Math.cos(a), 80 + 16 * Math.sin(a), 70 + 58 * Math.cos(a), 80 + 58 * Math.sin(a), 'mf-c4', 6); }
  s += chargeSign(70, 80, 1);
  const ax = 180, bx = 290, y = 80;
  [-60, -34, -14, 14, 34, 60].forEach(h => { s += sP(`M${ax + 12} ${y} Q${(ax + bx) / 2} ${y + 2 * h} ${bx - 12} ${y}`, 'mf-c4', ' fill="none" stroke-width="1.4"'); });
  s += sL(ax + 12, y, bx - 12, y, 'mf-c4', ' stroke-width="1.4"') + sArrow((ax + bx) / 2 - 4, y, (ax + bx) / 2 + 6, y, 'mf-c4', 7) + chargeSign(ax, y, 1) + chargeSign(bx, y, -1);
  s += sR(350, 20, 8, 120, 'mf-s4l', 1, ' stroke-width="1.4"') + sR(452, 20, 8, 120, 'mf-s1l', 1, ' stroke-width="1.4"');
  for (let yy = 32; yy <= 128; yy += 24) s += sArrow(360, yy, 450, yy, 'mf-c4', 6);
  s += sT(354, 158, '+', 'mf-lab-b') + sT(456, 158, '−', 'mf-lab-b');
  return s + '</svg>';
}
function capacitorSvg() {
  let s = svgBox(320, 190, T`A parallel-plate capacitor: charges +Q and −Q on plates a distance d apart with a uniform field between them`);
  s += sR(80, 20, 10, 130, 'mf-s4l', 1, ' stroke-width="1.6"') + sR(230, 20, 10, 130, 'mf-s1l', 1, ' stroke-width="1.6"');
  for (let y = 34; y <= 136; y += 17) s += sT(72, y + 5, '+', 'mf-lab-b', 'end') + sT(250, y + 5, '−', 'mf-lab-b', 'start') + (y % 34 === 0 ? '' : sArrow(94, y, 226, y, 'mf-c4', 6));
  return s + sT(60, 90, '+Q', 'mf-var', 'end') + sT(268, 90, '−Q', 'mf-var', 'start') + sArrow(90, 170, 230, 170, 'mf-line', 6) + sArrow(230, 170, 90, 170, 'mf-line', 6) + sT(160, 186, 'd', 'mf-var') + sT(160, 16, 'E = V/d', 'mf-lab') + '</svg>';
}
function wireFieldSvg() {
  const cx = 110, cy = 100;
  let s = svgBox(420, 200, T`Left: magnetic field circles around a wire carrying current into the page. Right: a positive charge moving in a circle in a field pointing out of the page`);
  [26, 50, 74].forEach(r => { s += sC(cx, cy, r, 'mf-ring', ' stroke="var(--lv1)"'); s += sArrow(cx + 6, cy - r, cx + 12, cy - r + 0.8, 'mf-c2', 8) + sArrow(cx - 6, cy + r, cx - 12, cy + r - 0.8, 'mf-c2', 8); });
  s += sC(cx, cy, 10, 'mf-cell', ' stroke-width="1.6"') + sL(cx - 6, cy - 6, cx + 6, cy + 6, 'mf-line') + sL(cx - 6, cy + 6, cx + 6, cy - 6, 'mf-line') + sT(cx, 196, T`current into page`, 'mf-small');
  for (let x = 250; x <= 400; x += 30) for (let y = 30; y <= 170; y += 30) s += sC(x, y, 2.4, 'mf-dot');
  const ox = 322, oy = 104, r = 54;
  s += sC(ox, oy, r, 'mf-ring', ' stroke-dasharray="5 4"') + ball(ox, oy - r, 7, 'mf-s4') + sArrow(ox + 8, oy - r, ox + 48, oy - r, 'mf-c1', 7) + sArrow(ox, oy - r + 8, ox, oy - r + 40, 'mf-c2', 7);
  return s + sT(ox + 52, oy - r - 8, 'v', 'mf-var') + sT(ox + 6, oy - r + 36, 'F', 'mf-var', 'start') + sT(ox, 196, T`B out of page`, 'mf-small') + '</svg>';
}
function railsSvg() {
  let s = svgBox(400, 200, T`A rod sliding at speed v along two rails in a magnetic field into the page, with a resistor joining the rails`);
  for (let x = 40; x <= 380; x += 34) for (let y = 40; y <= 160; y += 30) s += sL(x - 3, y - 3, x + 3, y + 3, 'mf-thin') + sL(x - 3, y + 3, x + 3, y - 3, 'mf-thin');
  s += sL(40, 30, 380, 30, 'mf-line', ' stroke-width="3"') + sL(40, 170, 380, 170, 'mf-line', ' stroke-width="3"') + zigzag(40, 30, 40, 170, 6, 6) + sT(30, 104, 'R', 'mf-var', 'end');
  s += sR(222, 22, 10, 156, 'mf-s4l', 2, ' stroke-width="1.6"') + sArrow(236, 100, 290, 100, 'mf-c1', 8) + sT(292, 94, 'v', 'mf-var', 'start') + sT(214, 104, 'L', 'mf-var', 'end');
  return s + sT(340, 196, T`B into page`, 'mf-small') + sT(120, 196, 'ε = BLv', 'mf-lab-b') + '</svg>';
}
function transformerSvg() {
  let s = svgBox(380, 210, T`A transformer: primary coil with few turns and secondary coil with more turns on a shared iron core`);
  s += `<path d="M110 30 H270 V180 H110 Z M140 60 V150 H240 V60 Z" class="mf-s3l" fill-rule="evenodd" stroke="var(--ink-2)" stroke-width="1.4"/>`;
  for (let i = 0; i < 4; i++) s += `<ellipse cx="125" cy="${72 + i * 22}" rx="22" ry="7" fill="none" class="mf-c1" stroke-width="2.4"/>`;
  for (let i = 0; i < 8; i++) s += `<ellipse cx="255" cy="${66 + i * 11.5}" rx="22" ry="5" fill="none" class="mf-c2" stroke-width="2.2"/>`;
  s += sL(103, 72, 50, 72, 'mf-c1', ' stroke-width="2"') + sL(103, 138, 50, 138, 'mf-c1', ' stroke-width="2"') + sL(277, 66, 330, 66, 'mf-c2', ' stroke-width="2"') + sL(277, 147, 330, 147, 'mf-c2', ' stroke-width="2"');
  return s + sT(40, 110, 'Vₚ', 'mf-var', 'end') + sT(340, 110, 'Vₛ', 'mf-var', 'start') + sT(125, 200, 'Nₚ', 'mf-var') + sT(255, 200, 'Nₛ', 'mf-var') + sT(190, 22, T`iron core`, 'mf-small') + '</svg>';
}
function emWaveSvg() {
  let s = svgBox(480, 200, T`An electromagnetic wave: electric and magnetic fields oscillate at right angles to each other and to the direction of travel`), e = [], b = [];
  for (let i = 0; i <= 120; i++) { const x = 30 + i * 3.4, ph = Math.sin(2 * Math.PI * i / 60); e.push([x, 100 - 60 * ph]); b.push([x - 26 * ph, 100 + 26 * ph]); }
  s += sL(20, 100, 460, 100, 'mf-axis') + sPline(e, 'mf-c1', ' stroke-width="2.2"') + sPline(b, 'mf-c2', ' stroke-width="2.2"');
  for (let i = 0; i <= 120; i += 6) { const x = 30 + i * 3.4, ph = Math.sin(2 * Math.PI * i / 60); s += sL(x, 100, x, 100 - 60 * ph, 'mf-c1', ' stroke-width="0.8"') + sL(x, 100, x - 26 * ph, 100 + 26 * ph, 'mf-c2', ' stroke-width="0.8"'); }
  return s + sT(72, 30, 'E', 'mf-var') + sT(40, 140, 'B', 'mf-var') + sArrow(420, 170, 470, 170, 'mf-line', 7) + sT(446, 162, 'c', 'mf-var') + '</svg>';
}
function spectrumSvg() {
  const W = 560, L = 20, R = 20, X = v => L + (3 - v) / 15 * (W - L - R);   // v = log10(wavelength in m), from 10³ to 10⁻¹²
  const bands = [[3, 0, T`radio`, 'mf-s1l'], [0, -3, T`micro`, 'mf-s2l'], [-3, -6.15, T`infrared`, 'mf-s4l'], [-6.4, -8, 'UV', 'mf-s3l'], [-8, -11, T`X-rays`, 'mf-s1l'], [-11, -12, 'γ', 'mf-s2l']];
  let s = svgBox(W, 170, T`The electromagnetic spectrum from radio waves to gamma rays on a scale of wavelength, with the narrow visible band`);
  bands.forEach(([a, b, t, cls]) => { s += sR(X(a), 40, X(b) - X(a), 40, cls, 0, ' stroke-width="1"') + sT((X(a) + X(b)) / 2, 65, t, 'mf-small'); });
  s += `<defs><linearGradient id="rbw"><stop offset="0" stop-color="#d7263d"/><stop offset=".25" stop-color="#f49d37"/><stop offset=".45" stop-color="#f7e733"/><stop offset=".65" stop-color="#3bb273"/><stop offset=".85" stop-color="#2e86de"/><stop offset="1" stop-color="#7d3cff"/></linearGradient></defs>`;
  s += sR(X(-6.15), 40, X(-6.4) - X(-6.15), 40, '', 0, ' fill="url(#rbw)"') + sP(`M${f1(X(-6.15))} 80 L200 120 M${f1(X(-6.4))} 80 L360 120`, 'mf-thin', ' fill="none"') + sR(200, 120, 160, 18, '', 2, ' fill="url(#rbw)"') + sT(200, 152, '700 nm', 'mf-small') + sT(360, 152, '400 nm', 'mf-small') + sT(280, 152, T`visible light`, 'mf-lab-b');
  [3, 0, -3, -6, -9, -12].forEach(v => { s += sL(X(v), 82, X(v), 88, 'mf-axis') + sT(X(v), 100, ['1 km', '1 m', '1 mm', '1 µm', '1 nm', '1 pm'][[3, 0, -3, -6, -9, -12].indexOf(v)], 'mf-small'); });
  return s + sT(L, 30, T`longer wavelength, lower frequency`, 'mf-small', 'start') + sT(W - R, 30, T`shorter wavelength, more energy`, 'mf-small', 'end') + '</svg>';
}

/* --- F. optics --- */
function reflectionSvg() {
  const cx = 170, cy = 150, a = 40 * Math.PI / 180, L = 120;
  let s = svgBox(340, 180, T`Law of reflection: the incident ray and the reflected ray make equal angles with the normal`);
  s += sR(40, cy, 260, 10, 'mf-s3l', 0, ' stroke-width="1.4"') + sL(cx, cy, cx, 20, 'mf-grid', ' stroke-dasharray="5 4" stroke-width="1.6"') + sT(cx, 14, T`normal`, 'mf-small');
  s += sL(cx - L * Math.sin(a), cy - L * Math.cos(a), cx, cy, 'mf-c4', ' stroke-width="2.2"') + sArrow(cx - L * Math.sin(a) * 0.5 - 1, cy - L * Math.cos(a) * 0.5 - 1, cx - L * Math.sin(a) * 0.45, cy - L * Math.cos(a) * 0.45, 'mf-c4', 9);
  s += sArrow(cx, cy, cx + L * Math.sin(a), cy - L * Math.cos(a), 'mf-c4', 9) + sAngle(cx, cy, 34, 90, 130, 'mf-c1') + sAngle(cx, cy, 40, 50, 90, 'mf-c2');
  return s + sT(cx - 22, cy - 44, 'i', 'mf-var') + sT(cx + 24, cy - 50, 'r', 'mf-var') + sT(60, 172, T`mirror`, 'mf-small', 'start') + '</svg>';
}
function planeMirrorSvg() {
  const m = 200;
  let s = svgBox(400, 180, T`Plane mirror: the image is as far behind the mirror as the object is in front`);
  s += sR(m - 3, 20, 6, 150, 'mf-s3l', 0, ' stroke-width="1.4"');
  const arrowObj = (x, cls, dash) => sL(x, 150, x, 70, cls, ' stroke-width="4"' + (dash ? ' stroke-dasharray="6 4"' : '')) + sPoly([[x - 10, 78], [x + 10, 78], [x, 60]], dash ? 'mf-cell' : 'mf-s4', dash ? ' stroke="var(--ink-2)" stroke-dasharray="3 2"' : '');
  s += arrowObj(90, 'mf-c4') + arrowObj(310, 'mf-c4', true);
  s += sL(90, 64, m, 100, 'mf-c1', ' stroke-width="1.6"') + sArrow(m, 100, 60, 136, 'mf-c1', 8) + sL(m, 100, 310, 64, 'mf-c1', ' stroke-dasharray="4 4"');
  return s + sArrow(90, 166, m, 166, 'mf-line', 6) + sArrow(m, 166, 90, 166, 'mf-line', 6) + sArrow(m, 166, 310, 166, 'mf-line', 6) + sArrow(310, 166, m, 166, 'mf-line', 6) + sT(145, 160, 'd', 'mf-var') + sT(255, 160, 'd', 'mf-var') + sT(90, 44, T`object`, 'mf-small') + sT(310, 44, T`image`, 'mf-small') + '</svg>';
}
function tirSvg() {   // glass (below) to air (above): refraction, critical angle, total internal reflection
  const y = 100;
  let s = svgBox(480, 190, T`Three rays from glass to air: below the critical angle the ray refracts out, at the critical angle it runs along the surface, beyond it the light is totally reflected`);
  s += sR(10, y, 460, 80, 'mf-s3l', 0, ' stroke="none"') + sL(10, y, 470, y, 'mf-line') + sT(20, y - 8, T`air`, 'mf-small', 'start') + sT(20, y + 18, T`glass`, 'mf-small', 'start');
  [[85, 30, 50], [240, 42, 90], [395, 55, null]].forEach(([x, ai, ao], k) => {
    const a = ai * Math.PI / 180; s += sL(x, y - 60, x, y + 70, 'mf-grid', ' stroke-dasharray="4 3"') + sL(x - 70 * Math.tan(a), y + 70, x, y, 'mf-c4', ' stroke-width="2"');
    if (ao === 50) s += sArrow(x, y, x + 60 * Math.tan(ao * Math.PI / 180), y - 60, 'mf-c4', 8) + sArrow(x, y, x + 50 * Math.tan(a), y + 50, 'mf-c4', 6);
    else if (ao === 90) s += sArrow(x, y, x + 64, y, 'mf-c4', 8) + sArrow(x, y, x + 50 * Math.tan(a), y + 50, 'mf-c4', 6);
    else s += sArrow(x, y, x + 70 * Math.tan(a), y + 70, 'mf-c4', 8);
    s += sT(x, 186, [T`refracted`, T`critical angle`, T`totally reflected`][k], 'mf-small');
  });
  return s + '</svg>';
}
function eyeSvg(kind) {   // 'normal' | 'myopia' | 'corrected'
  const cx = 120, cy = 70, R = 46, fx = kind === 'myopia' ? cx + 22 : cx + R - 2;
  let s = svgBox(200, 140, kind === 'normal' ? T`Normal eye: parallel rays focus on the retina` : kind === 'myopia' ? T`Short-sighted eye: parallel rays focus in front of the retina` : T`A diverging lens spreads the rays so they focus on the retina`);
  s += sC(cx, cy, R, 'mf-cell', ' stroke-width="1.6"') + sP(`M${cx + R * Math.cos(1.1)} ${cy - R * Math.sin(1.1)} A${R} ${R} 0 0 1 ${cx + R * Math.cos(1.1)} ${cy + R * Math.sin(1.1)}`, 'mf-c2', ' fill="none" stroke-width="4"') + `<ellipse cx="${cx - R + 12}" cy="${cy}" rx="7" ry="20" class="mf-s1l" stroke-width="1.4"/>`;
  const lx = cx - R + 12, xs = kind === 'corrected' ? 30 : 0;
  [-16, 0, 16].forEach(dy => {
    if (kind === 'corrected') { const spread = dy * 1.35; s += sL(4, cy + dy, 30, cy + dy, 'mf-c4', ' stroke-width="1.6"') + sL(30, cy + dy, lx, cy + spread, 'mf-c4', ' stroke-width="1.6"') + sL(lx, cy + spread, fx, cy, 'mf-c4', ' stroke-width="1.6"'); }
    else s += sL(4, cy + dy, lx, cy + dy, 'mf-c4', ' stroke-width="1.6"') + sL(lx, cy + dy, fx, cy, 'mf-c4', ' stroke-width="1.6"') + (kind === 'myopia' ? sL(fx, cy, cx + R - 4, cy - dy * 0.9, 'mf-c4', ' stroke-width="1.2" stroke-dasharray="3 2"') : '');
  });
  if (kind === 'corrected') s += sP(`M${xs - 6} ${cy - 26} Q${xs + 2} ${cy} ${xs - 6} ${cy + 26} L${xs + 6} ${cy + 26} Q${xs - 2} ${cy} ${xs + 6} ${cy - 26} Z`, 'mf-s2l', ' stroke-width="1.2"');
  return s + sC(fx, cy, 3, 'mf-dot') + sT(cx + R + 4, cy + R - 4, T`retina`, 'mf-small', 'end') + '</svg>';
}
function telescopeSvg() {
  const lens = (x, h) => `<ellipse cx="${x}" cy="90" rx="7" ry="${h}" class="mf-s1l" stroke-width="1.4"/>`, fo = 230, fe = 70, x1 = 60, x2 = x1 + fo + fe, F = x1 + fo;
  let s = svgBox(460, 180, T`Refracting telescope: a long-focus objective and a short-focus eyepiece separated by the sum of their focal lengths`);
  s += sL(20, 90, 440, 90, 'mf-grid', ' stroke-dasharray="4 3"') + lens(x1, 50) + lens(x2, 30);
  [-30, 30].forEach(dy => { const yE = 90 - dy * fe / fo; s += sL(20, 90 + dy, x1, 90 + dy, 'mf-c4', ' stroke-width="1.6"') + sL(x1, 90 + dy, x2, yE, 'mf-c4', ' stroke-width="1.6"') + sArrow(x2, yE, 440, yE, 'mf-c4', 7); });
  s += sC(F, 90, 3, 'mf-dot') + sT(F, 110, 'F', 'mf-var');
  return s + sArrow(x1, 160, F, 160, 'mf-line', 6) + sArrow(F, 160, x1, 160, 'mf-line', 6) + sArrow(F, 160, x2, 160, 'mf-line', 6) + sArrow(x2, 160, F, 160, 'mf-line', 6) + sT((x1 + F) / 2, 176, sub('f', 'ob'), 'mf-var') + sT((F + x2) / 2, 176, sub('f', 'ok'), 'mf-var') + sT(x1, 30, T`objective`, 'mf-small') + sT(x2, 50, T`eyepiece`, 'mf-small') + '</svg>';
}
/* --- G. modern physics --- */
function lightClockSvg() {
  let s = svgBox(440, 190, T`Light clock: at rest the light goes straight up and down; seen moving, it travels a longer zigzag path, so each tick takes longer`);
  const mirrors = (x, y) => sR(x - 20, y, 40, 5, 'mf-s3l') + sR(x - 20, y + 110, 40, 5, 'mf-s3l');
  s += mirrors(60, 30) + sArrow(56, 116, 56, 38, 'mf-c4', 7) + sArrow(64, 38, 64, 116, 'mf-c4', 7) + sT(60, 170, T`clock at rest`, 'mf-small');
  [180, 280, 380].forEach(x => { s += mirrors(x, 30); });
  s += sArrow(180, 138, 280, 38, 'mf-c4', 8) + sArrow(280, 38, 380, 138, 'mf-c4', 8) + sArrow(310, 168, 400, 168, 'mf-line', 6) + sT(260, 170, T`moving clock`, 'mf-small') + sT(355, 162, 'v', 'mf-var');
  return s + '</svg>';
}
function photoSvg() {
  let s = svgBox(360, 170, T`A photon of energy hf hits a metal surface and knocks out an electron`);
  s += sR(40, 110, 280, 40, 'mf-s3l', 3, ' stroke-width="1.4"') + sT(180, 136, T`metal`, 'mf-lab-b');
  s += sP('M40 20 q8 -8 16 0 t16 0 t16 0 t16 0 t16 0 t16 0', 'mf-c4', ' fill="none" stroke-width="2"') + sArrow(132, 20, 176, 100, 'mf-c4', 8) + sT(80, 44, 'hf', 'mf-var');
  s += ball(190, 104, 7, 'mf-s1') + sT(190, 108, '−', 'mf-small') + sArrow(200, 96, 290, 30, 'mf-c1', 8) + sT(296, 30, 'e⁻', 'mf-var', 'start') + sT(260, 80, sub('E', 'k,max'), 'mf-lab', 'start');
  return s + '</svg>';
}
function goldFoilSvg() {
  let s = svgBox(420, 190, T`Gold-foil experiment: most alpha particles pass straight through the atom, a few are deflected and very few bounce back from the tiny nucleus`);
  s += sC(260, 95, 70, 'mf-cellc', ' stroke-dasharray="4 3" stroke="var(--ink-3)"') + sC(260, 95, 6, 'mf-s4');
  [15, 35, 155, 175].forEach(y => { s += sArrow(10, y, 410, y, 'mf-c1', 7); });
  s += sP('M10 70 L220 70 Q250 68 290 40 L360 5', 'mf-c1', ' fill="none" stroke-width="1.8"') + sP('M10 120 L220 120 Q250 122 290 150 L360 185', 'mf-c1', ' fill="none" stroke-width="1.8"');
  s += sP('M10 95 L236 95 Q248 95 230 88 L120 58', 'mf-c2', ' fill="none" stroke-width="2"') + sArrow(140, 64, 110, 55, 'mf-c2', 8);
  return s + sT(260, 186, T`nucleus (not to scale)`, 'mf-small') + sT(12, 88, 'α', 'mf-var', 'start') + '</svg>';
}
function balmerSvg() {   // hydrogen visible lines (NIST, nm)
  const X = l => 30 + (700 - l) / 320 * 400, lines = [[656, '#e02020', 'Hα'], [486, '#2aa7c9', 'Hβ'], [434, '#4f4ff0', 'Hγ'], [410, '#7b3fe0', 'Hδ']];
  let s = svgBox(460, 140, T`Visible line spectrum of hydrogen with lines at 656, 486, 434 and 410 nanometres`);
  s += sR(30, 20, 400, 50, '', 3, ' fill="#0b0b12"') + lines.map(([l, c, n]) => sR(X(l) - 2, 20, 4, 50, '', 0, ` fill="${c}"`) + sT(X(l), 90 + (l === 410 ? 30 : 0), `${l} nm`, 'mf-small') + sT(X(l), 106 + (l === 410 ? 30 : 0), n, 'mf-small')).join('');
  return s + sT(30, 14, '700 nm', 'mf-small', 'start') + sT(430, 14, '380 nm', 'mf-small', 'end') + '</svg>';
}
function penetrationSvg() {
  let s = svgBox(440, 170, T`Alpha is stopped by paper, beta by a few millimetres of aluminium, and gamma is only reduced by thick lead`);
  s += sR(140, 20, 6, 120, 'mf-s3l', 0, ' stroke-width="1.2"') + sR(240, 20, 16, 120, 'mf-s2l', 0, ' stroke-width="1.2"') + sR(340, 20, 40, 120, 'mf-s1l', 0, ' stroke-width="1.2"');
  s += sT(143, 158, T`paper`, 'mf-small') + sT(248, 158, T`aluminium`, 'mf-small') + sT(360, 158, T`lead`, 'mf-small');
  s += sArrow(30, 45, 136, 45, 'mf-c4', 8) + sT(20, 50, 'α', 'mf-var', 'end') + sArrow(30, 80, 236, 80, 'mf-c1', 8) + sT(20, 85, 'β', 'mf-var', 'end');
  s += sL(30, 115, 340, 115, 'mf-c2', ' stroke-width="2.4"') + sArrow(380, 115, 430, 115, 'mf-c2', 7) + sL(380, 115, 400, 115, 'mf-c2', ' stroke-width="1" stroke-dasharray="3 3"') + sT(20, 120, 'γ', 'mf-var', 'end');
  return s + '</svg>';
}
function fissionSvg() {
  const nuc = (x, y, r, t, cls) => sC(x, y, r, cls, ' stroke-width="1.4"') + sT(x, y + 4, t, 'mf-small');
  let s = svgBox(460, 200, T`Chain reaction: a neutron splits uranium-235 into two fragments and releases more neutrons, which split further nuclei`);
  s += ball(20, 100, 5, 'mf-s2') + sArrow(28, 100, 64, 100, 'mf-line', 6) + nuc(90, 100, 22, 'U-235', 'mf-s4l');
  s += nuc(170, 60, 15, 'Ba', 'mf-s1l') + nuc(170, 140, 13, 'Kr', 'mf-s1l') + sArrow(110, 88, 152, 66, 'mf-line', 6) + sArrow(110, 112, 154, 134, 'mf-line', 6);
  [[60, 280, 30], [100, 280, 100], [140, 280, 170]].forEach(([y0, x, y]) => { s += ball(200, y0 + (y - y0) * 0.1, 4, 'mf-s2') + sArrow(206, y0 + (y - y0) * 0.1, x - 26, y, 'mf-c2', 6) + nuc(x, y, 18, 'U', 'mf-s4l') + sArrow(x + 20, y - 6, x + 60, y - 18, 'mf-c2', 5) + sArrow(x + 20, y + 6, x + 60, y + 18, 'mf-c2', 5); });
  return s + sT(20, 88, 'n', 'mf-var') + sT(420, 196, T`… and so on`, 'mf-small', 'end') + '</svg>';
}
/* --- H. technology --- */
function greenhouseSvg() {
  let s = svgBox(460, 220, T`Greenhouse effect: sunlight passes through the atmosphere, the ground emits infrared, and greenhouse gases absorb and re-emit part of it back down`);
  s += sR(0, 180, 460, 40, 'mf-s2l') + sR(0, 60, 460, 40, 'mf-f1') + sT(450, 84, T`greenhouse gases`, 'mf-small', 'end') + sC(40, 30, 22, 'mf-s4l', ' stroke-width="1.4"');
  s += sArrow(64, 40, 150, 176, 'mf-c4', 9) + sT(90, 130, T`sunlight`, 'mf-small', 'end');
  s += sP('M190 176 q6 -10 0 -20 t0 -20 t0 -20 t0 -20 t0 -20 t0 -20 t0 -20', 'mf-c2', ' fill="none" stroke-width="2"') + sArrow(190, 40, 190, 20, 'mf-c2', 7) + sT(198, 30, T`some IR escapes`, 'mf-small', 'start');
  s += sP('M240 176 q6 -10 0 -20 t0 -20 t0 -20 t0 -16', 'mf-c2', ' fill="none" stroke-width="2"') + sC(240, 86, 5, 'mf-s4') + sP('M250 92 q6 10 0 20 t0 20 t0 20 t0 16', 'mf-c1', ' fill="none" stroke-width="2"') + sArrow(250, 168, 250, 178, 'mf-c1', 7);
  return s + sT(268, 140, T`absorbed and re-emitted`, 'mf-small', 'start') + sT(230, 206, T`ground`, 'mf-small') + '</svg>';
}
function bandsSvg() {
  let s = svgBox(420, 190, T`Energy bands: in a conductor the bands overlap, a semiconductor has a small gap and an insulator a large gap`);
  [[70, 0, T`conductor`], [210, 24, T`semiconductor`], [350, 80, T`insulator`]].forEach(([x, gap, t]) => {
    const vb = 150, cb = vb - 34 - gap;
    s += sR(x - 50, vb - 34, 100, 34, 'mf-s1l', 2, ' stroke-width="1.2"') + sR(x - 50, cb - 34 + (gap ? 0 : 14), 100, 34, 'mf-s4l', 2, ' stroke-width="1.2" fill-opacity="0.8"') + sT(x, 184, t, 'mf-lab-b');
    if (gap) s += sArrow(x + 58, vb - 34, x + 58, cb, 'mf-line', 5) + sArrow(x + 58, cb, x + 58, vb - 34, 'mf-line', 5);
  });
  return s + sT(410, 52, T`conduction band`, 'mf-small', 'end') + sT(410, 166, T`valence band`, 'mf-small', 'end') + '</svg>';
}
