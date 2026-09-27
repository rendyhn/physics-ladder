/* ==========================================================================
   Interactive figures: sliders that redraw a figure while you move them.
   A lesson places ${Ix('name', caption)}; app.js calls mountIx() after the
   lesson renders. Each IX entry has ctrls (id, label(), min, max, step,
   value, fmt) and draw(vals) returning { svg, read } (plain text, no TeX,
   so redrawing never waits for MathJax).
   ========================================================================== */
const IX = {};
const Ix = (name, cap) => `<figure class="fig ix" data-ix="${name}"><div class="ix-out"></div><div class="ix-ctrls no-print"></div>${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure>`;
const ixF = (x, d = 1) => F(+(+x).toFixed(d));   // a rounded plain-text number
function mountIx(root) {
  root.querySelectorAll('.ix[data-ix]').forEach(fig => {
    const def = IX[fig.dataset.ix]; if (!def || fig.dataset.mounted) return;
    fig.dataset.mounted = '1';
    const out = fig.querySelector('.ix-out'), box = fig.querySelector('.ix-ctrls'), vals = {};
    const show = c => (c.fmt ? c.fmt(vals[c.id]) : ixF(vals[c.id], 2));
    box.innerHTML = def.ctrls.map(c => { vals[c.id] = c.value; return `<label class="ix-ctrl"><span class="ix-lab">${c.label()}</span><input type="range" min="${c.min}" max="${c.max}" step="${c.step}" value="${c.value}" data-k="${c.id}"><output>${show(c)}</output></label>`; }).join('');
    const draw = () => { const r = def.draw(vals); out.innerHTML = r.svg + (r.read ? `<p class="ix-read">${r.read}</p>` : ''); };
    box.addEventListener('input', e => { const k = e.target.dataset.k; if (!k) return; vals[k] = +e.target.value; e.target.nextElementSibling.textContent = show(def.ctrls.find(c => c.id === k)); draw(); });
    draw();
  });
}

/* ---------- projectile launched from the ground (no air resistance) ---------- */
IX.projectile = {
  ctrls: [
    { id: 'v', label: () => T`launch speed (m/s)`, min: 5, max: 40, step: 1, value: 30 },
    { id: 'th', label: () => T`launch angle (°)`, min: 5, max: 85, step: 1, value: 45, fmt: v => ixF(v, 0) + '°' },
  ],
  draw({ v, th }) {
    const g = 9.8, r = th * Math.PI / 180, vx = v * Math.cos(r), vy = v * Math.sin(r), T0 = 2 * vy / g, R = vx * T0, Hm = vy * vy / (2 * g);
    const f = x => x * Math.tan(r) - g * x * x / (2 * vx * vx), f45 = x => x - g * x * x / (v * v);
    return {
      svg: planeSvg({ W: 460, H: 300, x: [0, 170], y: [0, 85], step: [20, 20], tickX: 40, tickY: 20, xl: 'x (m)', yl: 'y (m)', grid: true,
        fns: [{ f: f45, from: 0, to: v * v / g, cls: 'mf-c2', dash: true }, { f, from: 0, to: R, cls: 'mf-c1' }],
        pts: [[R / 2, Hm, `${ixF(Hm)} m`, 'middle', false, 0, -10], [R, 0, `${ixF(R)} m`, 'end', false, 4, -8]], label: T`Path of a projectile for the chosen speed and angle; the dashed path is the same speed at 45 degrees` }),
      read: T`Time of flight ${ixF(T0, 2)} s · maximum height ${ixF(Hm)} m · range ${ixF(R)} m. The dashed path is 45°, which gives the longest range, ${ixF(v * v / g)} m.`,
    };
  },
};

/* ---------- refraction at a boundary (Snell's law) ---------- */
IX.snell = {
  ctrls: [
    { id: 'a', label: () => T`angle of incidence (°)`, min: 0, max: 89, step: 1, value: 40, fmt: v => ixF(v, 0) + '°' },
    { id: 'n1', label: () => T`n₁ (upper medium)`, min: 1, max: 2.4, step: 0.01, value: 1 },
    { id: 'n2', label: () => T`n₂ (lower medium)`, min: 1, max: 2.4, step: 0.01, value: 1.5 },
  ],
  draw({ a, n1, n2 }) {
    const W = 460, H = 300, cx = 230, cy = 150, L = 130, r1 = a * Math.PI / 180, s2 = n1 * Math.sin(r1) / n2, tir = s2 > 1;
    let s = svgBox(W, H, T`Ray diagram of refraction for the chosen angle and refractive indices`);
    s += sR(0, cy, W, H - cy, 'mf-f1') + sL(0, cy, W, cy, 'mf-line') + sL(cx, 20, cx, H - 20, 'mf-thin', ' stroke-dasharray="5 4"');
    s += sT(12, 24, `n₁ = ${ixF(n1, 2)}`, 'mf-lab', 'start') + sT(12, H - 12, `n₂ = ${ixF(n2, 2)}`, 'mf-lab', 'start');
    const ix = cx - L * Math.sin(r1), iy = cy - L * Math.cos(r1);
    s += sArrow(ix, iy, cx - 0.5 * (cx - ix) , cy - 0.5 * (cy - iy), 'mf-c2', 9) + sL(ix, iy, cx, cy, 'mf-c2');
    let read;
    if (tir) {
      s += sArrow(cx, cy, cx + L * Math.sin(r1), cy - L * Math.cos(r1), 'mf-c4', 9);
      read = T`sin θ₂ would be ${ixF(s2, 2)} > 1: total internal reflection. Critical angle = ${ixF(Math.asin(n2 / n1) * 180 / Math.PI)}°.`;
    } else {
      const r2 = Math.asin(s2);
      s += sArrow(cx, cy, cx + L * Math.sin(r2), cy + L * Math.cos(r2), 'mf-c1', 9) + sL(cx, cy, cx + 0.7 * L * Math.sin(r1), cy + 0.7 * L * Math.cos(r1), 'mf-thin', ' stroke-dasharray="3 4"');
      s += sT(cx + L * Math.sin(r2) + 12, cy + L * Math.cos(r2) - 6, `θ₂ = ${ixF(r2 * 180 / Math.PI)}°`, 'mf-lab', 'start');
      read = T`n₁ sin θ₁ = n₂ sin θ₂ gives θ₂ = ${ixF(r2 * 180 / Math.PI)}°. The ray bends ${n2 > n1 ? T`towards the normal (into a denser medium)` : n2 < n1 ? T`away from the normal (into a less dense medium)` : T`not at all (same medium)`}.`;
    }
    s += sT(cx - 14, cy - 60, `θ₁ = ${ixF(a, 0)}°`, 'mf-lab', 'end');
    return { svg: s + '</svg>', read };
  },
};
