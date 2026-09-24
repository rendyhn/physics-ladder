/* ==========================================================================
   TRACK A — Foundations: units, measurement, vectors
   ========================================================================== */
(() => {
const siTable = () => Tbl([T`Quantity`, T`SI unit`, T`Symbol`], [
  [T`Length`, T`metre`, 'm'], [T`Mass`, T`kilogram`, 'kg'], [T`Time`, T`second`, 's'], [T`Electric current`, T`ampere`, 'A'],
  [T`Temperature`, T`kelvin`, 'K'], [T`Amount of substance`, T`mole`, 'mol'], [T`Luminous intensity`, T`candela`, 'cd']]);
const prefixTable = () => Tbl([T`Prefix`, T`Symbol`, T`Factor`], [
  ['giga', 'G', '$10^{9}$'], ['mega', 'M', '$10^{6}$'], ['kilo', 'k', '$10^{3}$'], ['centi', 'c', '$10^{-2}$'], ['milli', 'm', '$10^{-3}$'], ['micro', 'µ', '$10^{-6}$'], ['nano', 'n', '$10^{-9}$']]);
const DERIVED = [
  ['N', T`newton (force)`, '\\mathrm{kg\\,m/s^2}', ['\\mathrm{kg\\,m/s}', '\\mathrm{kg\\,m^2/s^2}', '\\mathrm{kg/(m\\,s^2)}']],
  ['J', T`joule (energy)`, '\\mathrm{kg\\,m^2/s^2}', ['\\mathrm{kg\\,m/s^2}', '\\mathrm{kg\\,m^2/s^3}', '\\mathrm{kg\\,m/s}']],
  ['W', T`watt (power)`, '\\mathrm{kg\\,m^2/s^3}', ['\\mathrm{kg\\,m^2/s^2}', '\\mathrm{kg\\,m/s^2}', '\\mathrm{kg\\,m^2/s}']],
  ['Pa', T`pascal (pressure)`, '\\mathrm{kg/(m\\,s^2)}', ['\\mathrm{kg\\,m/s^2}', '\\mathrm{kg\\,m^2/s^2}', '\\mathrm{kg/m^3}']],
];

level({
  id: 'foundations', mark: 'A', name: 'Foundations', short: 'Foundations', band: 'Units · measurement · vectors', color: 'lv1',
  blurb: 'The language every other topic is written in: quantities and units, measuring carefully, and vectors for anything that has a direction.',
  topics: [
/* ------------------------------------------------------------------ */
{
  id: 'units', stage: 'jh', title: 'Quantities, Units & Conversions',
  blurb: 'SI base units, derived units, prefixes, unit conversions and scientific notation.',
  lesson: () => T`
<p>A <b>physical quantity</b> is anything we can measure, and every measurement has two parts: a <b>number</b> and a <b>unit</b>. "The table is 1.5" means nothing; "the table is $1.5\,\mathrm{m}$ long" is a measurement.</p>
<h3>SI base units</h3>
<p>Scientists everywhere use the International System of Units (SI). It starts from seven base quantities:</p>
${siTable()}
<p>Every other unit is a <b>derived unit</b> built from these. Speed is distance divided by time, so its unit is $\mathrm{m/s}$. Force is mass times acceleration, so $1\,\mathrm{N} = 1\,\mathrm{kg\,m/s^2}$. Energy is force times distance, so $1\,\mathrm{J} = 1\,\mathrm{N\,m} = 1\,\mathrm{kg\,m^2/s^2}$.</p>
<h3>Prefixes</h3>
<p>Prefixes scale a unit up or down by powers of ten:</p>
${prefixTable()}
${Key(T`<p>To convert, multiply by a factor that equals 1. Since $1\,\mathrm{km} = 1000\,\mathrm{m}$,</p><p>$$3.2\,\mathrm{km} \times \frac{1000\,\mathrm{m}}{1\,\mathrm{km}} = 3200\,\mathrm{m}.$$</p><p>The unit you want goes on top, the unit you are removing goes underneath, and the old units cancel.</p>`)}
<h3>Squared and cubed units</h3>
<p>A square metre is a square $100\,\mathrm{cm}$ on each side, so $1\,\mathrm{m^2} = 100 \times 100 = 10\,000\,\mathrm{cm^2}$. For volumes the factor is cubed: $1\,\mathrm{m^3} = 1\,000\,000\,\mathrm{cm^3}$. Also $1\,\mathrm{L} = 1000\,\mathrm{cm^3}$ and $1\,\mathrm{m^3} = 1000\,\mathrm{L}$.</p>
<h3>Speeds: km/h and m/s</h3>
${Fm(T`1\,\mathrm{km/h} = \frac{1000\,\mathrm{m}}{3600\,\mathrm{s}} = \frac{1}{3.6}\,\mathrm{m/s}`)}
<p>So divide by 3.6 to go from km/h to m/s, and multiply by 3.6 to go back: $72\,\mathrm{km/h} = 20\,\mathrm{m/s}$.</p>
<h3>Scientific notation</h3>
<p>Very large and very small numbers are written as $a \times 10^n$ with $1 \le a \lt 10$. The speed of light is $3.0 \times 10^{8}\,\mathrm{m/s}$; the charge of an electron is $1.6 \times 10^{-19}\,\mathrm{C}$. In a calculator or on this site you can type these as <code>3e8</code> and <code>1.6e-19</code>.</p>
${Tip(T`<p>Check the units at the end of every calculation. If you were finding a speed and your answer comes out in $\mathrm{m\,s}$, something went wrong along the way.</p>`)}`,
  gens: [
    () => {
      const [from, to, f, lo, hi, d] = pick([['km', 'm', 1e3, 1, 99, 1], ['cm', 'm', 1e-2, 5, 950, 0], ['mm', 'cm', 1e-1, 5, 950, 0], ['g', 'kg', 1e-3, 50, 9500, 0], ['mg', 'g', 1e-3, 50, 9500, 0],
        ['ms', 's', 1e-3, 20, 9500, 0], ['min', 's', 60, 2, 45, 0], ['h', 'min', 60, 1, 12, 1], ['h', 's', 3600, 1, 6, 1], ['kJ', 'J', 1e3, 1, 90, 1], ['MW', 'kW', 1e3, 1, 50, 1], ['µm', 'mm', 1e-3, 10, 900, 0]]);
      const v = d ? ri(lo * 10, hi * 10) / 10 : ri(lo, hi), a = sig(v * f, 6);
      return { q: T`Convert ${Q(v, from)} to $\mathrm{${to}}$.`, a, u: to, w: [sig(v / f, 6), sig(a * 10, 6), sig(a / 10, 6)],
        s: T`$1\,\mathrm{${from}} = ${f >= 1 ? M(f) : sciT(f)}\,\mathrm{${to}}$, so ${Q(v, from)} $= ${M(v)} \times ${f >= 1 ? M(f) : sciT(f)}\,\mathrm{${to}} = ${QT(a, to)}$.` };
    },
    () => {
      const toMs = chance(), ms = toMs ? ri(2, 7) * 5 : ri(2, 12), kmh = sig(ms * 3.6, 6);
      return toMs
        ? { q: T`A car travels at ${Q(kmh, 'km/h')}. What is this speed in m/s?`, a: ms, u: 'm/s', w: [sig(kmh * 3.6, 4), sig(kmh / 60, 4), sig(kmh * 1000 / 60, 4)], s: T`Divide by 3.6: $${M(kmh)} \div 3.6 = ${QT(ms, 'm/s')}$.` }
        : { q: T`A runner moves at ${Q(ms, 'm/s')}. What is this speed in km/h?`, a: kmh, u: 'km/h', w: [sig(ms / 3.6, 4), sig(ms * 60, 4), sig(ms * 3.6 * 10, 4)], s: T`Multiply by 3.6: $${M(ms)} \times 3.6 = ${QT(kmh, 'km/h')}$.` };
    },
    () => {
      const kind = pick(['m2cm2', 'cm3L', 'm3L', 'cm2m2']);
      if (kind === 'm2cm2') { const v = ri(2, 95) / 10; return { q: T`Convert ${Q(v, 'm^2')} to $\mathrm{cm^2}$.`, a: sig(v * 1e4, 6), u: 'cm²', w: [sig(v * 100, 6), sig(v * 1e3, 6), sig(v * 1e6, 6)], s: T`$1\,\mathrm{m^2} = 100 \times 100 = 10\,000\,\mathrm{cm^2}$, so the area is $${M(v)} \times 10\,000 = ${QT(sig(v * 1e4, 6), 'cm^2')}$.` }; }
      if (kind === 'cm2m2') { const v = ri(5, 900) * 10; return { q: T`Convert ${Q(v, 'cm^2')} to $\mathrm{m^2}$.`, a: sig(v / 1e4, 6), u: 'm²', w: [sig(v / 100, 6), sig(v / 1e3, 6), sig(v * 1e4, 6)], s: T`$1\,\mathrm{m^2} = 10\,000\,\mathrm{cm^2}$, so divide: $${M(v)} \div 10\,000 = ${QT(sig(v / 1e4, 6), 'm^2')}$.` }; }
      if (kind === 'cm3L') { const v = ri(2, 95) * 50; return { q: T`How many litres is ${Q(v, 'cm^3')}?`, a: sig(v / 1000, 6), u: 'L', w: [sig(v / 100, 6), sig(v / 1e6, 6), sig(v * 1000, 6)], s: T`$1\,\mathrm{L} = 1000\,\mathrm{cm^3}$, so $${M(v)} \div 1000 = ${QT(sig(v / 1000, 6), 'L')}$.` }; }
      const v = ri(2, 60) / 10; return { q: T`A tank holds ${Q(v, 'm^3')} of water. How many litres is that?`, a: sig(v * 1000, 6), u: 'L', w: [sig(v * 100, 6), sig(v * 1e6, 6), sig(v * 10, 6)], s: T`$1\,\mathrm{m^3} = 1000\,\mathrm{L}$, so $${M(v)} \times 1000 = ${QT(sig(v * 1000, 6), 'L')}$.` };
    },
    () => {
      const e = pick([-6, -5, -4, -3, 4, 5, 6, 7]), m = ri(11, 99) / 10, x = sig(m * 10 ** e, 2);
      const mk = (mm, ee) => `$${M(mm)} \\times 10^{${ee}}$`;
      return { q: T`Write ${F(x)} in scientific notation.`, a: mk(m, e), w: [mk(m, -e), mk(m, e + 1), mk(m, e - 1), mk(m * 10, e - 1)],
        s: T`Move the decimal point so that one non-zero digit is in front of it: ${F(x)} $= ${M(m)} \times 10^{${e}}$. ${e > 0 ? T`The point moved ${e} places to the left, so the power is positive.` : T`The point moved ${-e} places to the right, so the power is negative.`}` };
    },
    () => {
      const [sym, name, right, wrong] = pick(DERIVED);
      return { q: T`The ${name} is written $\mathrm{${sym}}$. Which combination of base units is equal to $1\,\mathrm{${sym}}$?`, a: `$${right}$`, w: wrong.map(x => `$${x}$`), only: 'mc',
        s: sym === 'N' ? T`$F = ma$, so $\mathrm{N} = \mathrm{kg} \times \mathrm{m/s^2} = ${right}$.`
          : sym === 'J' ? T`Work is force times distance: $\mathrm{J} = \mathrm{N\,m} = \mathrm{kg\,m/s^2} \times \mathrm{m} = ${right}$.`
          : sym === 'W' ? T`Power is energy per second: $\mathrm{W} = \mathrm{J/s} = \mathrm{kg\,m^2/s^2} \div \mathrm{s} = ${right}$.`
          : T`Pressure is force per area: $\mathrm{Pa} = \mathrm{N/m^2} = \mathrm{kg\,m/s^2} \div \mathrm{m^2} = ${right}$.` };
    },
    () => {
      const base = [T`mass`, T`time`, T`electric current`, T`temperature`, T`length`], derived = [T`speed`, T`force`, T`energy`, T`area`, T`pressure`, T`density`, T`volume`, T`power`];
      const pickBase = chance();
      const a = pickBase ? pick(base) : pick(derived), w = sample(pickBase ? derived : base, 3);
      return { q: pickBase ? T`Which of these is an SI <b>base</b> quantity?` : T`Which of these is a <b>derived</b> quantity (not one of the SI base quantities)?`, a, w, only: 'mc',
        s: T`The seven SI base quantities are length, mass, time, electric current, temperature, amount of substance and luminous intensity. Everything else, such as ${pickBase ? T`speed or force` : a}, is derived from them.` };
    },
  ],
},
/* ------------------------------------------------------------------ */
{
  id: 'measurement', stage: 'jh', title: 'Measurement & Significant Figures',
  blurb: 'Reading rulers, vernier calipers and micrometers, uncertainty, significant figures and averaging repeated readings.',
  lesson: () => T`
<p>No measurement is perfectly exact. A good measurement says how big something is <i>and</i> how precisely we know it.</p>
<h3>Instruments and their precision</h3>
${Tbl([T`Instrument`, T`Smallest reading`, T`Typical use`], [[T`Ruler`, Q(1, 'mm'), T`lengths of a few cm to 1 m`], [T`Vernier caliper`, Q(0.1, 'mm'), T`diameters, depths, thicknesses`], [T`Micrometer screw gauge`, Q(0.01, 'mm'), T`wire diameters, sheet thickness`]])}
<h3>Reading a vernier caliper</h3>
<p>Read the main scale just to the left of the vernier zero, then find the vernier line that lines up exactly with a main-scale line. With 10 vernier divisions, that line number gives tenths of a millimetre.</p>
${Fig(vernierSvg(23.4, T`A vernier caliper reading`), T`Main scale: 23 mm. Vernier line 4 lines up. Reading: $23 + 0.4 = 23.4\,\mathrm{mm}$.`)}
<h3>Reading a micrometer</h3>
<p>The sleeve shows whole and half millimetres; the thimble has 50 divisions of $0.01\,\mathrm{mm}$. Reading = sleeve + thimble $\times\ 0.01\,\mathrm{mm}$. A sleeve showing $5.5\,\mathrm{mm}$ with thimble line 23 gives $5.5 + 0.23 = 5.73\,\mathrm{mm}$.</p>
<h3>Uncertainty</h3>
<p>A single reading is usually quoted with an uncertainty of about half the smallest division, for example $12.5 \pm 0.05\,\mathrm{cm}$ on a millimetre ruler. For several readings of the same quantity, use the <b>mean</b> as the best value and let the spread of the readings show the uncertainty.</p>
${Key(T`<p><b>Significant figures</b> are the digits that carry information about the measurement:</p><ul><li>All non-zero digits count: $4.73$ has 3.</li><li>Zeros between them count: $4.07$ has 3.</li><li>Leading zeros never count: $0.0047$ has 2.</li><li>Trailing zeros after a decimal point count: $4.70$ has 3.</li></ul>`)}
<h3>Calculating with measurements</h3>
<ul><li><b>Multiplying or dividing:</b> give the answer to the <i>fewest significant figures</i> of the values used. $12.5\,\mathrm{cm} \times 3.2\,\mathrm{cm} = 40.0 \to 40\,\mathrm{cm^2}$ (2 s.f.).</li><li><b>Adding or subtracting:</b> give the answer to the <i>fewest decimal places</i>. $12.52 + 3.1 = 15.62 \to 15.6$.</li></ul>
${Tip(T`<p>A calculator shows many digits, but an answer cannot be more precise than the measurements it came from.</p>`)}`,
  gens: [
    () => {
      const kind = pick([0, 1, 2, 3]);
      let s, n;
      if (kind === 0) { n = ri(2, 4); const d = [ri(1, 9), ...Array.from({ length: n - 1 }, () => ri(1, 9))]; s = d.join('').replace(/^(\d)/, '$1.'); }
      else if (kind === 1) { const zeros = ri(1, 3); n = ri(2, 3); s = '0.' + '0'.repeat(zeros) + Array.from({ length: n }, () => ri(1, 9)).join(''); }
      else if (kind === 2) { n = 3; s = `${ri(1, 9)}0${ri(1, 9)}`; if (chance()) { s = s[0] + '.' + s.slice(1); } }
      else { const a = ri(1, 9), b = ri(0, 9); s = `${a}.${b}0`; n = 3; }
      const shown = F(+s, s.includes('.') ? s.split('.')[1].length : 0);
      return { q: T`How many significant figures does ${shown} have?`, a: n, w: [n + 1, n - 1, s.replace(/[^\d]/g, '').length].filter(x => x > 0), rtol: 0,
        s: T`Leading zeros do not count; zeros between non-zero digits and trailing zeros after the decimal point do. So ${shown} has <b>${n}</b> significant figures.` };
    },
    () => {
      const e = ri(-3, 3), n = pick([2, 3]), x = (ri(1000, 9999) / 1000) * 10 ** e, a = sig(x, n);
      if (Math.floor(Math.log10(a)) !== Math.floor(Math.log10(x))) return null;   // rounding carried into a new place
      const fmt = (y, k) => F(y, Math.max(0, k - 1 - Math.floor(Math.log10(Math.abs(y)))));   // keep trailing zeros: 3.40
      return { q: T`Round ${F(sig(x, 4))} to ${n} significant figures.`, a: fmt(a, n), v: a, w: [fmt(sig(x, n + 1), n + 1), fmt(sig(x, Math.max(1, n - 1)), Math.max(1, n - 1)), fmt(sig(x * 10, n), n), fmt(sig(a / 10, n), n), fmt(Math.trunc(x * 10 ** (n - 1 - Math.floor(Math.log10(x)))) / 10 ** (n - 1 - Math.floor(Math.log10(x))) + 10 ** (Math.floor(Math.log10(x)) - n + 1), n)], rtol: 0,
        s: T`Keep the first ${n} significant digits and look at the next one to decide whether to round up: ${F(sig(x, 4))} ≈ <b>${fmt(a, n)}</b>.` };
    },
    () => {
      const a = ri(101, 999) / 10, b = ri(11, 99) / 10, p = a * b, ans = sig(p, 2);
      return { q: T`A rectangle is measured as ${Q(a, 'cm')} by ${Q(b, 'cm')}. What is its area, given to the correct number of significant figures?`, a: ans, u: 'cm²', w: [sig(p, 4), sig(p, 3), sig(p, 1)], only: 'mc',
        s: T`$${M(a)} \times ${M(b)} = ${M(sig(p, 5))}$. The shorter measurement has only 2 significant figures, so the area is ${Q(ans, 'cm^2')}.` };
    },
    () => {
      const a = ri(1001, 9999) / 100, b = ri(11, 99) / 10, s = +(a + b).toFixed(1), plus = chance(), r = plus ? s : +(a - b).toFixed(1);
      return { q: plus ? T`Add the lengths ${Q(a, 'cm')} and ${Q(b, 'cm')}, giving the answer to the correct precision.` : T`Subtract ${Q(b, 'cm')} from ${Q(a, 'cm')}, giving the answer to the correct precision.`,
        a: r, u: 'cm', w: [+(plus ? a + b : a - b).toFixed(2), sig(plus ? a + b : a - b, 2), +(plus ? a + b : a - b).toFixed(0)], only: 'mc',
        s: T`$${M(a)} ${plus ? '+' : '-'} ${M(b)} = ${M(+(plus ? a + b : a - b).toFixed(2))}$. The least precise value has one decimal place, so the answer is ${Q(r, 'cm')}.` };
    },
    () => {
      const rd = ri(80, 450) / 10;
      return { q: T`What is the reading on this vernier caliper, in millimetres?` + Fig(vernierSvg(rd, T`A vernier caliper reading`, false)), a: rd, u: 'mm', w: [Math.floor(rd), sig(rd + 1, 4), sig(Math.floor(rd) + (rd * 10 % 10) / 100, 4)], rtol: 0,
        s: T`The vernier zero is just past ${Math.floor(rd)} mm on the main scale, and vernier line ${Math.round((rd - Math.floor(rd)) * 10)} lines up with a main-scale line. Reading: $${Math.floor(rd)} + ${M(sig(rd - Math.floor(rd), 2))} = ${QT(rd, 'mm')}$.` };
    },
    () => {
      const sl = ri(2, 24) / 2, th = ri(0, 49), r = sig(sl + th / 100, 6);
      return { q: T`A micrometer sleeve shows ${Q(sl, 'mm')} and the thimble line ${th} lines up with the reference line. What is the reading?`, a: r, u: 'mm', w: [sig(sl + th / 10, 6), sig(sl + th / 1000, 6), sig(Math.floor(sl) + th / 100, 6)], rtol: 0,
        s: T`Reading = sleeve + thimble $\times\ 0.01\,\mathrm{mm}$ $= ${M(sl)} + ${th} \times 0.01 = ${QT(r, 'mm')}$.` };
    },
    () => {
      const base = ri(200, 900), xs = Array.from({ length: 5 }, () => (base + ri(-4, 4)) / 100), mean = +(sum(xs) / 5).toFixed(2), exact = sig(sum(xs) / 5, 6);
      return { q: T`A pendulum's period is timed five times (in seconds): ${listF(xs)}. What is the mean period, to two decimal places?`, a: mean, u: 's', w: [+(median(xs) + 0.01).toFixed(2), Math.max(...xs), +((Math.max(...xs) + Math.min(...xs)) / 2 + 0.02).toFixed(2)], tol: 0.005, rtol: 0,
        s: T`Add the readings and divide by 5: $\frac{${xs.map(x => M(x)).join(' + ')}}{5} = ${M(exact)}$, which is ${Q(mean, 's')} to two decimal places, the same precision as the readings.` };
    },
  ],
},
/* ------------------------------------------------------------------ */
{
  id: 'vectors', stage: 'sh', title: 'Vectors in Physics',
  blurb: 'Scalars and vectors, components, adding vectors and finding a resultant with its direction.',
  lesson: () => T`
<p>Some quantities are fully described by a size alone: a mass of $5\,\mathrm{kg}$, a temperature of $30^\circ\mathrm{C}$. These are <b>scalars</b>. Others also need a direction: a displacement of $5\,\mathrm{m}$ <i>north</i>, a force of $20\,\mathrm{N}$ <i>downwards</i>. These are <b>vectors</b>.</p>
${Tbl([T`Scalars`, T`Vectors`], [[T`distance, speed`, T`displacement, velocity`], [T`mass, time`, T`acceleration, force`], [T`energy, work, power`, T`momentum, impulse`], [T`temperature, charge`, T`electric field, weight`]])}
<p>A vector is drawn as an arrow. Its length shows the <b>magnitude</b> and the arrowhead shows the <b>direction</b>. In print a vector is written in bold, $\mathbf{F}$, or with an arrow, $\vec{F}$; its magnitude is written $F$ or $|\vec{F}|$.</p>
<h3>Components</h3>
<p>A vector of magnitude $A$ at angle $\theta$ above the positive $x$-axis can be split into two perpendicular parts:</p>
${Fm(T`A_x = A\cos\theta \qquad A_y = A\sin\theta`)}
${Fig(vectorSvg([{ x: 5.2, y: 3, label: 'A', guides: true, theta: 'θ' }, { x: 5.2, y: 0, label: sub('A', 'x'), kind: 'b', mid: [0, 24] }, { x: 0, y: 3, label: sub('A', 'y'), kind: 'b', mid: [-20, 5] }], T`A vector A split into a horizontal component and a vertical component`, 7), T`The components $A_x$ and $A_y$ add up to $\vec{A}$.`)}
<h3>Adding vectors</h3>
<p>To add vectors, place them head to tail; the <b>resultant</b> runs from the first tail to the last head.</p>
<ul><li>Same direction: add the magnitudes. $3\,\mathrm{N} + 4\,\mathrm{N}$ to the right gives $7\,\mathrm{N}$ to the right.</li><li>Opposite directions: subtract, and the resultant points the way of the larger one.</li><li>Perpendicular: use Pythagoras. $3\,\mathrm{N}$ east and $4\,\mathrm{N}$ north give $\sqrt{3^2 + 4^2} = 5\,\mathrm{N}$.</li></ul>
${Key(T`<p>For vectors at any angle, add the components:</p><p>$$R_x = A_x + B_x, \qquad R_y = A_y + B_y,$$</p><p>$$R = \sqrt{R_x^2 + R_y^2}, \qquad \tan\varphi = \frac{R_y}{R_x}.$$</p><p>For two vectors $A$ and $B$ with angle $\alpha$ between them, this gives the shortcut $R = \sqrt{A^2 + B^2 + 2AB\cos\alpha}$.</p>`)}
${Ex(T`<p>Forces of $6\,\mathrm{N}$ and $8\,\mathrm{N}$ pull on a ring with $60^\circ$ between them. Find the resultant.</p><p>$$R = \sqrt{6^2 + 8^2 + 2 \cdot 6 \cdot 8 \cos 60^\circ} = \sqrt{36 + 64 + 48} = \sqrt{148} \approx 12.2\,\mathrm{N}.$$</p>`)}
${Tip(T`<p>The angle in $R = \sqrt{A^2 + B^2 + 2AB\cos\alpha}$ is the angle <i>between the two vectors</i> when they start from the same point, not the angle inside the head-to-tail triangle.</p>`)}`,
  gens: [
    () => {
      const A = ri(4, 30) * 5 / (chance() ? 1 : 5), th = pick([20, 30, 40, 45, 50, 60, 70]), yComp = chance();
      const ax = sig(A * cosD(th)), ay = sig(A * sinD(th));
      const Ax = A * cosD(th), Ay = A * sinD(th), k = 6 / Math.max(Ax, Ay);
      return { q: T`A force of ${Q(A, 'N')} acts at ${Q(th, '°')} above the horizontal. What is its ${yComp ? T`vertical` : T`horizontal`} component?`
          + Fig(vectorSvg([{ x: Ax * k, y: Ay * k, label: 'F' }], T`A force vector at an angle above the horizontal`, 7)),
        a: yComp ? ay : ax, u: 'N', w: yComp ? [ax, sig(A * th / 90), A] : [ay, sig(A * (90 - th) / 90), A],
        s: yComp ? T`$F_y = F\sin\theta = ${M(A)} \sin ${th}^\circ = ${QT(ay, 'N')}$.` : T`$F_x = F\cos\theta = ${M(A)} \cos ${th}^\circ = ${QT(ax, 'N')}$.` };
    },
    () => {
      const [p, q, r] = pick(TRIPLES.slice(0, 4)), k = pick([1, 2, 3, 5]), a = p * k, b = q * k;
      return { q: T`A boat is pushed ${Q(a, 'N')} east by its engine and ${Q(b, 'N')} north by the current. What is the magnitude of the resultant force?`,
        a: r * k, u: 'N', w: [a + b, Math.abs(b - a), sig(Math.sqrt(a * b), 4)],
        s: T`The forces are perpendicular, so $R = \sqrt{${a}^2 + ${b}^2} = \sqrt{${a * a + b * b}} = ${QT(r * k, 'N')}$.` };
    },
    () => {
      const a = ri(3, 25), b = ri(3, 25), same = chance();
      return { q: same ? T`Two forces of ${Q(a, 'N')} and ${Q(b, 'N')} act on an object in the <b>same</b> direction. What is the magnitude of the resultant?` : T`Two forces of ${Q(a, 'N')} and ${Q(b, 'N')} act on an object in <b>opposite</b> directions. What is the magnitude of the resultant?`,
        a: same ? a + b : Math.abs(a - b), u: 'N', w: same ? [Math.abs(a - b), sig(Math.hypot(a, b)), a * b] : [a + b, sig(Math.hypot(a, b)), Math.max(a, b)],
        s: same ? T`Same direction: add, $${a} + ${b} = ${QT(a + b, 'N')}$.` : T`Opposite directions: subtract, $|${a} - ${b}| = ${QT(Math.abs(a - b), 'N')}$, in the direction of the larger force.` };
    },
    () => {
      const A = ri(3, 15), B = ri(3, 15), al = pick([60, 90, 120]), R = Math.sqrt(A * A + B * B + 2 * A * B * cosD(al)), a = sig(R);
      return { q: T`Two forces, ${Q(A, 'N')} and ${Q(B, 'N')}, act from the same point with an angle of ${Q(al, '°')} between them. Find the magnitude of the resultant.`,
        a, u: 'N', w: [A + B, sig(Math.sqrt(A * A + B * B - 2 * A * B * cosD(al))), sig(Math.hypot(A, B) + (al === 90 ? 2 : 0))],
        s: T`$R = \sqrt{A^2 + B^2 + 2AB\cos\alpha} = \sqrt{${A * A} + ${B * B} + 2 \cdot ${A} \cdot ${B} \cos ${al}^\circ} = \sqrt{${M(sig(R * R, 6))}} \approx ${QT(a, 'N')}$.` };
    },
    () => {
      let rx, ry; do { rx = ri(2, 12); ry = ri(2, 12); } while (rx === ry);
      const ang = sig(deg(Math.atan2(ry, rx))), mag = sig(Math.hypot(rx, ry)), askAng = chance();
      return { q: T`A displacement has components $R_x = ${QT(rx, 'm')}$ and $R_y = ${QT(ry, 'm')}$. ${askAng ? T`At what angle above the positive $x$-axis does it point?` : T`What is its magnitude?`}`
          + Fig(vectorSvg([{ x: rx * 7 / 12, y: ry * 7 / 12, label: 'R' }], T`A displacement vector drawn from the origin`, 8)),
        a: askAng ? ang : mag, u: askAng ? '°' : 'm', w: askAng ? [sig(90 - ang), sig(deg(Math.atan2(rx, ry)) + 10), sig(deg(Math.atan(ry / rx) * 0.5))] : [rx + ry, sig(Math.abs(ry - rx) + 0.5), sig(Math.sqrt(rx * ry))],
        s: askAng ? T`$\tan\varphi = \frac{R_y}{R_x} = \frac{${ry}}{${rx}}$, so $\varphi = \tan^{-1}(${M(sig(ry / rx, 4))}) \approx ${M(ang)}^\circ$.` : T`$R = \sqrt{${rx}^2 + ${ry}^2} = \sqrt{${rx * rx + ry * ry}} \approx ${QT(mag, 'm')}$.` };
    },
    () => {
      const vec = [T`velocity`, T`force`, T`displacement`, T`acceleration`, T`momentum`, T`weight`], sca = [T`speed`, T`mass`, T`time`, T`energy`, T`temperature`, T`distance`, T`power`];
      const wantVec = chance(), a = pick(wantVec ? vec : sca);
      return { q: wantVec ? T`Which of these quantities is a <b>vector</b>?` : T`Which of these quantities is a <b>scalar</b>?`, a, w: sample(wantVec ? sca : vec, 3), only: 'mc',
        s: wantVec ? T`A vector needs a direction as well as a size: ${a} has one, while the others are fully described by a number and a unit.` : T`A scalar is described by a size alone: ${a} has no direction, while the others do.` };
    },
  ],
},
  ],
});
})();
