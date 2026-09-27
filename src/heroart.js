/* Decorative background behind the home-page hero: faint, subject-themed doodles (aria-hidden, drawn in a 1200 × 640 box). */
const HERO_ART = (() => {
  const tf = (x, y, rot) => (rot ? ` transform="rotate(${rot} ${x} ${y})"` : '');
  // text: t(x, y, content, size, { rot, cls, font, anchor })
  const t = (x, y, s, size, { rot = 0, cls = '', font = 'serif', anchor = 'start' } = {}) => `<text x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}" class="hb-t hb-${font} ${cls}"${tf(x, y, rot)}>${s}</text>`;
  const p = (d, cls = '') => `<path d="${d}" class="hb-l ${cls}"/>`;
  const c = (x, y, r, cls = '') => `<circle cx="${x}" cy="${y}" r="${r}" class="hb-l ${cls}"/>`;
  const dot = (x, y, r, cls = '') => `<circle cx="${x}" cy="${y}" r="${r}" class="hb-f ${cls}"/>`;
  const e = (x, y, rx, ry, rot, cls = '') => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" class="hb-l ${cls}"${tf(x, y, rot)}/>`;
  const wave = (x0, y0, len, amp, per) => { let d = `M${x0} ${y0}`; for (let x = 0; x <= len; x += 4) d += `L${(x0 + x).toFixed(1)} ${(y0 - amp * Math.sin(2 * Math.PI * x / per)).toFixed(1)}`; return d; };
  const poly = (cx, cy, r, n, a0 = -Math.PI / 2) => 'M' + [...Array(n)].map((_, k) => { const a = a0 + 2 * Math.PI * k / n; return `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`; }).join('L') + 'Z';
  const parts = [];
  // top strip
  parts.push(p('M232 50h30l8-14 16 28 16-28 16 28 16-28 8 14h30') + p('M390 32v36M402 40v20'));
  parts.push(t(440, 70, 'E = mc²', 36, { rot: -3 }));
  parts.push(t(610, 30, 'F = G m₁m₂ / r²', 22));
  // gap column
  parts.push(e(612, 200, 26, 9, 0) + e(612, 200, 26, 9, 60) + e(612, 200, 26, 9, -60) + dot(612, 200, 5, 'hbc1'));
  parts.push(t(628, 440, 'ΔS ≥ 0     F = ma', 20, { rot: -90 }));
  parts.push(t(612, 545, 'ħ', 56, { cls: 'hbc2', anchor: 'middle' }));
  // behind the text: faint line drawings only
  parts.push(p('M440 250h120M500 250L540 360') + p('M455 350A115 115 0 0 0 545 364', 'hb-d') + c(540, 372, 12));
  parts.push(p('M440 470L560 470M560 470L560 410M440 470L560 410') + p('M550 464l10 6-10 6M554 422l6-12 6 12'));
  parts.push(p('M150 540h100v28h-100z') + p('M150 548C110 500 290 500 250 548', 'hb-d'));
  // bottom strip
  parts.push(e(200, 616, 60, 18, -4) + dot(200, 616, 9, 'hbc1') + dot(258, 610, 5, 'hbc3'));
  parts.push(t(300, 628, 'v = f λ     p = mv', 22, { font: 'mono' }));
  parts.push(t(560, 628, 'V = IR', 28));
  parts.push(p(wave(740, 614, 330, 14, 110), 'hbc3'));
  parts.push(t(1070, 638, 'E = hf     λ = h / p', 18, { anchor: 'end', font: 'mono' }));
  // outer edges
  parts.push(e(70, 250, 44, 14, 0) + e(70, 250, 44, 14, 60) + e(70, 250, 44, 14, -60) + dot(70, 250, 7, 'hbc1') + t(30, 480, 'g = 9.8 m/s²', 20, { rot: -90, font: 'mono' }) + t(1130, 200, 'Ω', 44, { cls: 'hbc4' }) + p('M1100 380Q1130 430 1100 480Q1070 430 1100 380Z'));
  return '<svg viewBox="0 0 1200 640" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + parts.join('') + '</svg>';
})();
