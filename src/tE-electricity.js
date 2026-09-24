/* ==========================================================================
   TRACK E — Electricity & Magnetism
   ========================================================================== */
(() => {
const PAR = [[6, 3], [12, 6], [4, 4], [20, 30], [10, 40], [12, 4], [6, 12], [10, 10], [30, 60], [8, 24], [15, 10], [20, 5]];
const circLabel = () => T`A circuit diagram with a battery and resistors`;

level({
  id: 'electricity', mark: 'E', name: 'Electricity & Magnetism', short: 'Electricity', band: 'Charge · circuits · fields · induction', color: 'lv5',
  blurb: 'Electric charge and current, circuits, then electric and magnetic fields, induction, alternating current and electromagnetic waves.',
  topics: [
{
  id: 'electrostatics', stage: 'sh', title: 'Electrostatics: Charge, Force & Field',
  blurb: 'Electric charge, Coulomb’s law, the inverse-square force, electric field strength and fields from point charges.',
  lesson: () => T`
<p>Electric charge comes in two kinds, positive and negative. Like charges repel and unlike charges attract. Charge is <b>conserved</b> and comes in whole multiples of the elementary charge $e = 1.6 \times 10^{-19}\,\mathrm{C}$. Rubbing a balloon on hair moves electrons from one to the other; nothing is created.</p>
<h3>Coulomb's law</h3>
${Fm(T`F = \frac{k\,q_1 q_2}{r^2}, \qquad k = 9.0 \times 10^{9}\,\mathrm{N\,m^2/C^2}`)}
<p>Like gravity, the electric force follows an inverse-square law, but it is enormously stronger. Charges are often given in microcoulombs: $1\,\mu\mathrm{C} = 10^{-6}\,\mathrm{C}$.</p>
${Key(T`<p>The <b>electric field</b> $E$ at a point is the force per unit positive charge placed there:</p><p>$$E = \frac{F}{q}, \qquad \text{for a point charge } Q: \; E = \frac{kQ}{r^2}.$$</p><p>Its unit is $\mathrm{N/C}$. The field points away from positive charges and towards negative ones. Fields from several charges add as vectors.</p>`)}
${Ex(T`<p>Two charges of $+2\,\mu\mathrm{C}$ and $+3\,\mu\mathrm{C}$ are $0.3\,\mathrm{m}$ apart. $F = \frac{9 \times 10^{9} \cdot 2 \times 10^{-6} \cdot 3 \times 10^{-6}}{0.3^2} = 0.6\,\mathrm{N}$, repulsive.</p>`)}
<h3>Field lines</h3>
<p>Field lines start on positive charges and end on negative ones. Where they crowd together the field is strong. Between two parallel oppositely charged plates the lines are straight and evenly spaced: the field is uniform.</p>
${Tip(T`<p>Convert $\mu\mathrm{C}$ to C and cm to m before using Coulomb's law. Forgetting the $10^{-6}$ is the most common slip.</p>`)}`,
  gens: [
    () => {
      const q1 = ri(1, 9), q2 = ri(1, 9), r = ri(5, 50) / 100, F = sig(9e9 * q1 * 1e-6 * q2 * 1e-6 / (r * r));
      return { q: T`Two small spheres carry charges of ${Q(q1, 'µC')} and ${Q(q2, 'µC')} and are ${Q(r * 100, 'cm')} apart. What is the size of the electric force between them? ($k = 9.0 \times 10^{9}\,\mathrm{N\,m^2/C^2}$.)`, a: F, u: 'N', w: [sig(F / 1e4), sig(F * r), sig(F / 2)],
        s: T`$F = \frac{kq_1q_2}{r^2} = \frac{9 \times 10^{9} \cdot ${q1} \times 10^{-6} \cdot ${q2} \times 10^{-6}}{${M(r)}^2} = ${QT(F, 'N')}$.` };
    },
    () => {
      const F0 = ri(2, 40) * 5, k = pick([2, 3, 0.5]), F1 = sig(F0 / (k * k));
      return { q: T`Two charges repel each other with a force of ${Q(F0, 'N')}. Their separation is ${k === 0.5 ? T`halved` : T`made ${k} times larger`}. What is the new force?`, a: F1, u: 'N', w: [sig(F0 / k), sig(F0 * k * k), F0],
        s: T`$F \propto \frac{1}{r^2}$, so the force changes by a factor of $\frac{1}{${k === 0.5 ? '(1/2)' : k}^2}$: $${F0} \cdot \frac{1}{${M(k * k)}} = ${QT(F1, 'N')}$.` };
    },
    () => {
      const Q0 = ri(1, 9), r = ri(1, 10) / 10, E = 9e9 * Q0 * 1e-9 / (r * r);
      return { q: T`What is the electric field strength ${Q(r * 100, 'cm')} from a point charge of ${Q(Q0, 'nC')}? ($k = 9.0 \times 10^{9}\,\mathrm{N\,m^2/C^2}$.)`, a: sig(E), u: 'N/C', w: [sig(E * r), sig(E / 100), sig(E * 1e3)],
        s: T`$E = \frac{kQ}{r^2} = \frac{9 \times 10^{9} \cdot ${Q0} \times 10^{-9}}{${M(r)}^2} = ${QT(sig(E), 'N/C')}$.` };
    },
    () => {
      const E = ri(1, 50) * 100, q = ri(1, 20), F = sig(E * q * 1e-6);
      return { q: T`A charge of ${Q(q, 'µC')} is placed in a uniform electric field of ${Q(E, 'N/C')}. What force acts on it?`, a: F, u: 'N', w: [sig(E * q), sig(E / q), sig(F * 1000)], s: T`$F = qE = ${q} \times 10^{-6} \cdot ${E} = ${QT(F, 'N')}$.` };
    },
    () => {
      const Qa = ri(1, 9), Qb = ri(1, 9), d = ri(2, 10) / 10, r = d / 2, Ea = 9e9 * Qa * 1e-9 / (r * r), Eb = 9e9 * Qb * 1e-9 / (r * r), same = chance(), E = sig(same ? Math.abs(Ea - Eb) : Ea + Eb);
      if (same && Qa === Qb) return null;
      return { q: same ? T`Two positive charges of ${Q(Qa, 'nC')} and ${Q(Qb, 'nC')} are ${Q(d * 100, 'cm')} apart. What is the electric field strength exactly halfway between them?` : T`A charge of $+${QT(Qa, 'nC')}$ and a charge of $-${QT(Qb, 'nC')}$ are ${Q(d * 100, 'cm')} apart. What is the electric field strength exactly halfway between them?`,
        a: E, u: 'N/C', w: same ? [sig(Ea + Eb), sig(Math.abs(Ea - Eb) / 4), 0] : [sig(Math.abs(Ea - Eb)), sig((Ea + Eb) / 4), sig(Ea)],
        s: same ? T`Each charge alone gives $E = \frac{kQ}{r^2}$ with $r = ${M(r)}\,\mathrm{m}$: ${Q(sig(Ea, 4), 'N/C')} and ${Q(sig(Eb, 4), 'N/C')}. Both point away from their charges, so in opposite directions at the midpoint: $|${M(sig(Ea, 4))} - ${M(sig(Eb, 4))}| \approx ${QT(E, 'N/C')}$.` : T`Each charge alone gives $E = \frac{kQ}{r^2}$ with $r = ${M(r)}\,\mathrm{m}$: ${Q(sig(Ea, 4), 'N/C')} and ${Q(sig(Eb, 4), 'N/C')}. At the midpoint both fields point from + towards −, so they add: $${M(sig(Ea, 4))} + ${M(sig(Eb, 4))} \approx ${QT(E, 'N/C')}$.` };
    },
    () => pick([
      { q: T`A glass rod rubbed with silk becomes positively charged. What has happened?`, a: T`Electrons have moved from the rod to the silk`, w: [T`Protons have moved from the silk to the rod`, T`Positive charge has been created in the rod`, T`Electrons have moved from the silk to the rod`], only: 'mc', s: T`Only electrons move easily. The rod loses electrons, leaving it with more protons than electrons, and the silk gains the same number of electrons: charge is conserved.` },
      { q: T`What is the direction of the electric field at a point near an isolated negative charge?`, a: T`Towards the charge`, w: [T`Away from the charge`, T`Along a circle around the charge`, T`There is no field near a negative charge`], only: 'mc', s: T`The field direction is the direction of the force on a positive test charge, which is attracted towards the negative charge.` },
    ]),
  ],
},
{
  id: 'capacitors', stage: 'sh', title: 'Electric Potential & Capacitors',
  blurb: 'Potential and potential difference, uniform fields, the electronvolt, capacitance, parallel plates, stored energy and combinations.',
  lesson: () => T`
<h3>Potential and potential difference</h3>
<p>The <b>electric potential</b> at a point is the potential energy per unit charge there, measured in volts ($1\,\mathrm{V} = 1\,\mathrm{J/C}$). Moving a charge $q$ through a potential difference $V$ changes its energy by</p>
${Fm(T`W = qV`)}
<p>Near a point charge, $V = \dfrac{kQ}{r}$. Between two parallel plates a distance $d$ apart with potential difference $V$, the field is uniform: $E = \dfrac{V}{d}$ (so $\mathrm{V/m}$ is the same unit as $\mathrm{N/C}$).</p>
<p>An electron accelerated through $1\,\mathrm{V}$ gains $1\,\mathrm{eV} = 1.6 \times 10^{-19}\,\mathrm{J}$ of energy, the <b>electronvolt</b>.</p>
${Key(T`<p>A <b>capacitor</b> stores charge on two conductors separated by an insulator. Its <b>capacitance</b> is the charge stored per volt:</p><p>$$C = \frac{Q}{V} \qquad \text{parallel plates: } C = \frac{\varepsilon_0 A}{d}, \; \varepsilon_0 = 8.85 \times 10^{-12}\,\mathrm{F/m}$$</p><p>The stored energy is $E = \tfrac12 C V^2 = \tfrac12 Q V$.</p>`)}
<h3>Combining capacitors</h3>
<ul><li><b>Parallel:</b> $C = C_1 + C_2 + \dots$ (the opposite of resistors).</li><li><b>Series:</b> $\dfrac{1}{C} = \dfrac{1}{C_1} + \dfrac{1}{C_2} + \dots$</li></ul>
<p>Capacitance is measured in farads (F); practical values are microfarads ($\mu\mathrm{F}$), nanofarads (nF) or picofarads (pF). Camera flashes and defibrillators store energy in capacitors and release it in a fraction of a second.</p>
${Tip(T`<p>Capacitors combine the opposite way to resistors: in parallel they simply add.</p>`)}`,
  gens: [
    () => {
      const q = ri(1, 20), V = ri(2, 60) * 5, W = sig(q * 1e-6 * V);
      return { q: T`How much work is done in moving a charge of ${Q(q, 'µC')} through a potential difference of ${Q(V, 'V')}?`, a: W, u: 'J', w: [sig(q * V), sig(q * V * 1e-3), sig(W * 100)], s: T`$W = qV = ${q} \times 10^{-6} \cdot ${V} = ${QT(W, 'J')}$.` };
    },
    () => {
      const V = ri(1, 50) * 20, d = ri(1, 20) / 1000, E = sig(V / d);
      return { q: T`Two parallel plates ${Q(d * 1000, 'mm')} apart are connected to ${Q(V, 'V')}. What is the electric field strength between them?`, a: E, u: 'V/m', w: [sig(V / (d * 1000)), sig(V * d, 3), sig(E * 10)], s: T`$E = \frac{V}{d} = \frac{${V}}{${M(d)}} = ${QT(E, 'V/m')}$.` };
    },
    () => {
      const V = pick([100, 200, 500, 1000, 2000, 5000]), v = Math.sqrt(2 * 1.6e-19 * V / 9.11e-31);
      return { q: T`An electron starts from rest and is accelerated through ${Q(V, 'V')}. How fast is it moving? ($e = 1.6 \times 10^{-19}\,\mathrm{C}$, $m_e = 9.11 \times 10^{-31}\,\mathrm{kg}$.)`, a: `$${sciT(v)}\\,\\mathrm{m/s}$`, w: [`$${sciT(v * v / 1e7)}\\,\\mathrm{m/s}$`, `$${sciT(v / Math.SQRT2)}\\,\\mathrm{m/s}$`, `$${sciT(v * 10)}\\,\\mathrm{m/s}$`], v, rtol: 0.02, h: T`Type a power of ten like 1.3e7.`,
        s: T`$eV = \tfrac12 m v^2$, so $v = \sqrt{\frac{2eV}{m}} = \sqrt{\frac{2 \cdot 1.6 \times 10^{-19} \cdot ${V}}{9.11 \times 10^{-31}}} = ${sciT(v)}\,\mathrm{m/s}$.` };
    },
    () => {
      const C = pick([1, 2, 4.7, 10, 22, 47, 100, 220, 470]), V = pick([3, 5, 6, 9, 12, 24, 50]), Qc = sig(C * V), askE = chance(), E = sig(0.5 * C * 1e-3 * V * V);   // E in mJ
      return askE
        ? { q: T`How much energy is stored in a ${Q(C, 'µF')} capacitor charged to ${Q(V, 'V')}? Give the answer in millijoules.`, a: E, u: 'mJ', w: [sig(E * 2), sig(E * 1000), sig(0.5 * C * 1e-3 * V)], s: T`$E = \tfrac12 C V^2 = \tfrac12 \cdot ${M(C)} \times 10^{-6} \cdot ${V}^2 = ${sciT(E / 1000)}\,\mathrm{J} = ${QT(E, 'mJ')}$.` }
        : { q: T`A ${Q(C, 'µF')} capacitor is connected to ${Q(V, 'V')}. How much charge does it store, in microcoulombs?`, a: Qc, u: 'µC', w: [sig(C / V), sig(V / C), sig(0.5 * C * V)], s: T`$Q = CV = ${M(C)}\,\mu\mathrm{F} \cdot ${V}\,\mathrm{V} = ${QT(Qc, 'µC')}$.` };
    },
    () => {
      const A = ri(1, 20) / 100, d = ri(1, 10) / 1000, C = 8.85e-12 * A / d;
      return { q: T`A parallel-plate capacitor has plates of area ${Q(A * 1e4, 'cm^2')} separated by ${Q(d * 1000, 'mm')} of air. What is its capacitance, in picofarads? ($\varepsilon_0 = 8.85 \times 10^{-12}\,\mathrm{F/m}$.)`, a: sig(C * 1e12), u: 'pF', w: [sig(C * 1e12 * 100), sig(C * 1e12 / 10), sig(8.85 * A * d * 1e3)],
        s: T`$A = ${M(A)}\,\mathrm{m^2}$, $d = ${M(d)}\,\mathrm{m}$: $C = \frac{\varepsilon_0 A}{d} = \frac{8.85 \times 10^{-12} \cdot ${M(A)}}{${M(d)}} = ${sciT(C)}\,\mathrm{F} = ${QT(sig(C * 1e12), 'pF')}$.` };
    },
    () => {
      const c1 = pick([2, 3, 4, 6, 10, 12]), c2 = pick([2, 3, 4, 6, 10, 12]), par = chance(), C = par ? c1 + c2 : sig(c1 * c2 / (c1 + c2));
      return { q: par ? T`Capacitors of ${Q(c1, 'µF')} and ${Q(c2, 'µF')} are connected in parallel. What is the combined capacitance?` : T`Capacitors of ${Q(c1, 'µF')} and ${Q(c2, 'µF')} are connected in series. What is the combined capacitance?`,
        a: C, u: 'µF', w: par ? [sig(c1 * c2 / (c1 + c2)), c1 * c2, sig((c1 + c2) / 2)] : [c1 + c2, sig((c1 + c2) / 2), Math.min(c1, c2)],
        s: par ? T`In parallel capacitances add: $${c1} + ${c2} = ${QT(C, 'µF')}$.` : T`In series: $\frac{1}{C} = \frac{1}{${c1}} + \frac{1}{${c2}}$, so $C = \frac{${c1} \cdot ${c2}}{${c1} + ${c2}} = ${QT(C, 'µF')}$.` };
    },
  ],
},
/* ------------------------------------------------------------------ */
{
  id: 'current-ohm', stage: 'jh', title: 'Current, Voltage & Ohm’s Law',
  blurb: 'Charge and current, potential difference, resistance and Ohm’s law, resistivity, electrical power and energy.',
  lesson: () => T`
<p>An electric <b>current</b> is a flow of charge. In metal wires the moving charges are electrons, each carrying $e = 1.6 \times 10^{-19}\,\mathrm{C}$ (coulomb).</p>
${Fm(T`I = \frac{Q}{t}`)}
<p>Current is measured in amperes: $1\,\mathrm{A}$ means $1\,\mathrm{C}$ of charge passing a point every second. By convention current flows from $+$ to $-$ outside the battery, the opposite way to the electrons.</p>
<h3>Potential difference and resistance</h3>
<p>The <b>potential difference</b> (voltage) $V$ between two points is the energy given to or taken from each coulomb of charge: $1\,\mathrm{V} = 1\,\mathrm{J/C}$. The <b>resistance</b> $R$ of a component tells us how much voltage is needed to push a current through it.</p>
${Key(T`<p><b>Ohm's law:</b> for a metal conductor at constant temperature the current is proportional to the voltage:</p><p>$$V = I\,R$$</p><p>Resistance is measured in ohms: $1\,\Omega = 1\,\mathrm{V/A}$.</p>`)}
<h3>Resistivity</h3>
<p>A wire's resistance depends on its material, length $L$ and cross-sectional area $A$:</p>
${Fm(T`R = \rho\,\frac{L}{A}`)}
<p>$\rho$ is the <b>resistivity</b> of the material in $\Omega\,\mathrm{m}$ (copper: $1.7 \times 10^{-8}\,\Omega\,\mathrm{m}$). A longer wire has more resistance; a thicker one has less.</p>
<h3>Electrical power and energy</h3>
${Fm(T`P = V I = I^2 R = \frac{V^2}{R} \qquad W = P\,t`)}
<p>Electricity bills use the <b>kilowatt-hour</b>: $1\,\mathrm{kWh}$ is the energy used by a $1\,\mathrm{kW}$ appliance in one hour, $3.6 \times 10^{6}\,\mathrm{J}$.</p>
${Ex(T`<p>A kettle is rated $2000\,\mathrm{W}$ at $220\,\mathrm{V}$. Current: $I = P/V = 2000/220 \approx 9.1\,\mathrm{A}$. Used for $15$ minutes a day for $30$ days: $2\,\mathrm{kW} \times 0.25\,\mathrm{h} \times 30 = 15\,\mathrm{kWh}$.</p>`)}
${Tip(T`<p>Convert areas in $\mathrm{mm^2}$ to $\mathrm{m^2}$ before using $R = \rho L / A$: $1\,\mathrm{mm^2} = 10^{-6}\,\mathrm{m^2}$.</p>`)}`,
  gens: [
    () => {
      const Qc = ri(2, 60) * 5, t = ri(2, 30) * 5, I = sig(Qc / t);
      return { q: T`A charge of ${Q(Qc, 'C')} flows through a lamp in ${Q(t, 's')}. What is the current?`, a: I, u: 'A', w: [sig(t / Qc), Qc * t, sig(Qc / t / 60)], s: T`$I = \frac{Q}{t} = \frac{${Qc}}{${t}} = ${QT(I, 'A')}$.` };
    },
    () => {
      const I = ri(1, 40) / 10, t = ri(1, 20), n = I * t / 1.6e-19;
      return { q: T`A current of ${Q(I, 'A')} flows for ${Q(t, 's')}. How many electrons pass a point in the wire? ($e = 1.6 \times 10^{-19}\,\mathrm{C}$.)`, a: `$${sciT(n)}$`, w: [`$${sciT(n / 1e3)}$`, `$${sciT(I * t * 1.6e-19)}$`, `$${sciT(n * 10)}$`], v: n, rtol: 0.02, h: T`Type a power of ten like 1.5e19.`,
        s: T`Charge: $Q = It = ${M(I)} \cdot ${t} = ${M(sig(I * t))}\,\mathrm{C}$. Number of electrons: $n = \frac{Q}{e} = \frac{${M(sig(I * t))}}{1.6 \times 10^{-19}} = ${sciT(n)}$.` };
    },
    () => {
      const R = pick([2, 4, 5, 6, 8, 10, 12, 15, 20, 25, 40, 50, 100]), I = ri(1, 30) / 10, V = sig(R * I, 6), ask = pick(['V', 'I', 'R']);
      if (ask === 'V') return { q: T`A current of ${Q(I, 'A')} flows through a ${Q(R, 'Ω')} resistor. What is the voltage across it?`, a: V, u: 'V', w: [sig(R / I), sig(I / R, 3), sig(R + I)], s: T`$V = IR = ${M(I)} \cdot ${R} = ${QT(V, 'V')}$.` };
      if (ask === 'I') return { q: T`A ${Q(R, 'Ω')} resistor is connected to ${Q(V, 'V')}. What current flows?`, a: I, u: 'A', w: [sig(V * R, 4), sig(R / V), sig(V / R * 10)], s: T`$I = \frac{V}{R} = \frac{${M(V)}}{${R}} = ${QT(I, 'A')}$.` };
      return { q: T`When ${Q(V, 'V')} is applied across a heating element, a current of ${Q(I, 'A')} flows. What is its resistance?`, a: R, u: 'Ω', w: [sig(V * I, 4), sig(I / V, 3), sig(V / I / 2)], s: T`$R = \frac{V}{I} = \frac{${M(V)}}{${M(I)}} = ${QT(R, 'Ω')}$.` };
    },
    () => {
      const [mat, rho] = pick([[T`copper`, 1.7e-8], [T`aluminium`, 2.8e-8], [T`nichrome`, 1.1e-6]]), L = ri(1, 40) * (rho > 1e-7 ? 0.1 : 5), A = pick([0.5, 1, 1.5, 2, 2.5]), R = sig(rho * L / (A * 1e-6));
      return { q: T`A wire made of ${mat}, with resistivity $${sciT(rho)}\,\Omega\,\mathrm{m}$, is ${Q(sig(L, 4), 'm')} long and has a cross-sectional area of ${Q(A, 'mm^2')}. What is its resistance?`,
        a: R, u: 'Ω', w: [sig(R * 1000), sig(R / 10), sig(R * 2)],
        s: T`$A = ${M(A)}\,\mathrm{mm^2} = ${sciT(A * 1e-6)}\,\mathrm{m^2}$, so $R = \rho\frac{L}{A} = \frac{${sciT(rho)} \cdot ${M(sig(L, 4))}}{${sciT(A * 1e-6)}} = ${QT(R, 'Ω')}$.` };
    },
    () => {
      const k = pick(['VI', 'V2R', 'I']);
      if (k === 'VI') { const V = pick([6, 12, 24, 110, 220, 230]), I = ri(1, 50) / 10, P = sig(V * I, 6); return { q: T`An appliance draws ${Q(I, 'A')} from a ${Q(V, 'V')} supply. What is its power?`, a: P, u: 'W', w: [sig(V / I), sig(I * I * V, 4), sig(V * V / I, 4)], s: T`$P = VI = ${V} \cdot ${M(I)} = ${QT(P, 'W')}$.` }; }
      if (k === 'V2R') { const V = pick([6, 9, 12, 24]), R = pick([2, 3, 4, 6, 8, 12, 24]), P = sig(V * V / R); return { q: T`A ${Q(R, 'Ω')} resistor is connected to a ${Q(V, 'V')} battery. How much power does it dissipate?`, a: P, u: 'W', w: [sig(V / R), sig(V * R), sig(V * V * R, 4)], s: T`$P = \frac{V^2}{R} = \frac{${V}^2}{${R}} = ${QT(P, 'W')}$.` }; }
      const P = pick([60, 100, 500, 800, 1000, 1200, 2000]), V = 220, I = sig(P / V);
      return { q: T`A ${Q(P, 'W')} appliance is plugged into a ${Q(V, 'V')} socket. What current does it draw?`, a: I, u: 'A', w: [sig(P * V, 4), sig(V / P), sig(P / V * 10)], s: T`$I = \frac{P}{V} = \frac{${P}}{${V}} \approx ${QT(I, 'A')}$.` };
    },
    () => {
      const P = pick([40, 60, 100, 150, 250, 400, 800, 1200, 2000]), h = pick([0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12]), d = pick([7, 30]), E = sig(P / 1000 * h * d, 6);
      return { q: T`A ${Q(P, 'W')} appliance is used for ${Q(h, 'h')} every day for ${d} days. How much electrical energy does it use, in kWh?`, a: E, u: 'kWh', w: [sig(P * h * d, 6), sig(P / 1000 * h, 6), sig(E * 1000 / 60, 4)],
        s: T`$W = Pt = ${M(P / 1000)}\,\mathrm{kW} \times ${M(h * d)}\,\mathrm{h} = ${QT(E, 'kWh')}$.` };
    },
    () => ({ q: T`The voltage across a resistor is doubled while its resistance stays the same. What happens to the current and to the power?`, a: T`The current doubles and the power becomes four times as large`, w: [T`Both double`, T`The current doubles and the power stays the same`, T`The current halves and the power doubles`], only: 'mc',
      s: T`$I = V/R$, so doubling $V$ doubles $I$. $P = V^2/R$, so doubling $V$ multiplies $P$ by $2^2 = 4$.` }),
  ],
},
/* ------------------------------------------------------------------ */
{
  id: 'dc-circuits', stage: 'sh', title: 'DC Circuits',
  blurb: 'Series and parallel resistors, mixed circuits, current and voltage in each branch, EMF and internal resistance.',
  lesson: () => T`
<p>A circuit is a closed loop through which charge can flow. The same two rules decide everything in a circuit of resistors.</p>
<h3>Series</h3>
${Fig(circuitSvg('series', ['R₁', 'R₂', 'R₃'], 'ε', circLabel()), T`Three resistors in series: one path for the current.`)}
<ul><li>The <b>same current</b> flows through every component.</li><li>The voltages add up: $V = V_1 + V_2 + V_3$.</li><li>The resistances add: $R_s = R_1 + R_2 + R_3$.</li></ul>
<h3>Parallel</h3>
${Fig(circuitSvg('parallel', ['R₁', 'R₂', 'R₃'], 'ε', circLabel()), T`Three resistors in parallel: the current splits between the branches.`)}
<ul><li>Every branch has the <b>same voltage</b>.</li><li>The currents add up: $I = I_1 + I_2 + I_3$.</li><li>$\dfrac{1}{R_p} = \dfrac{1}{R_1} + \dfrac{1}{R_2} + \dfrac{1}{R_3}$. For just two resistors: $R_p = \dfrac{R_1 R_2}{R_1 + R_2}$.</li></ul>
<p>The combined resistance of a parallel group is always smaller than its smallest resistor, because each extra branch gives the current another path.</p>
${Key(T`<p>For a mixed circuit, replace each parallel group by its equivalent resistance, then add the series parts. Find the total current from $I = V/R_{\text{total}}$, then work back through the circuit using $V = IR$ for each part.</p>`)}
${Ex(T`<p>$R_1 = 4\,\Omega$ in series with $R_2 = 6\,\Omega$ and $R_3 = 3\,\Omega$ in parallel, on a $12\,\mathrm{V}$ battery. $R_{23} = \frac{6 \cdot 3}{9} = 2\,\Omega$, total $6\,\Omega$, so $I = 2\,\mathrm{A}$. $V_1 = 8\,\mathrm{V}$, and the parallel pair gets $4\,\mathrm{V}$: $I_2 = \frac{4}{6} \approx 0.67\,\mathrm{A}$, $I_3 = \frac{4}{3} \approx 1.33\,\mathrm{A}$.</p>`)}
<h3>EMF and internal resistance</h3>
<p>A real battery has an <b>electromotive force</b> $\varepsilon$ (the energy it gives each coulomb) and a small <b>internal resistance</b> $r$. With an external resistance $R$:</p>
${Fm(T`I = \frac{\varepsilon}{R + r} \qquad V_{\text{terminal}} = \varepsilon - I r`)}
${Tip(T`<p><b>Kirchhoff's rules</b> summarise all of this: the currents into a junction equal the currents out, and around any closed loop the voltage rises equal the voltage drops.</p>`)}`,
  gens: [
    () => {
      const n = pick([2, 3]), Rs = Array.from({ length: n }, () => pick([2, 3, 4, 5, 6, 8, 10, 12, 15, 20])), V = pick([6, 9, 12, 24]), R = sum(Rs), I = sig(V / R), askI = chance();
      const fig = Fig(circuitSvg('series', Rs.map(r => `${r} Ω`), `${V} V`, circLabel()));
      return askI
        ? { q: T`In the circuit below, the battery is ${Q(V, 'V')} and the resistors are ${listF(Rs.map(r => r + ' Ω'))} in series. What current flows?` + fig, a: I, u: 'A', w: [sig(V / Rs[0]), sig(V * R, 4), sig(V / Rs.reduce((a, b) => (a * b) / (a + b)))],
            s: T`$R = ${Rs.join(' + ')} = ${R}\,\Omega$, so $I = \frac{V}{R} = \frac{${V}}{${R}} = ${QT(I, 'A')}$.` }
        : { q: T`What is the total resistance of ${listF(Rs.map(r => r + ' Ω'))} connected in series?`, a: R, u: 'Ω', w: [sig(1 / sum(Rs.map(r => 1 / r))), Math.max(...Rs), sig(R / n)], s: T`In series the resistances add: $${Rs.join(' + ')} = ${QT(R, 'Ω')}$.` };
    },
    () => {
      const [a, b] = pick(PAR), V = pick([6, 12, 24]), Rp = sig(a * b / (a + b)), I = sig(V / Rp), askI = chance();
      const fig = Fig(circuitSvg('parallel', [`${a} Ω`, `${b} Ω`], `${V} V`, circLabel()));
      return askI
        ? { q: T`A ${Q(a, 'Ω')} and a ${Q(b, 'Ω')} resistor are connected in parallel to a ${Q(V, 'V')} battery. What current does the battery supply?` + fig, a: I, u: 'A', w: [sig(V / (a + b)), sig(V / a), sig(V / b)],
            s: T`$R_p = \frac{${a} \cdot ${b}}{${a} + ${b}} = ${M(Rp)}\,\Omega$, so $I = \frac{${V}}{${M(Rp)}} = ${QT(I, 'A')}$. (Check: $\frac{${V}}{${a}} + \frac{${V}}{${b}} = ${M(sig(V / a + V / b))}\,\mathrm{A}$.)` }
        : { q: T`What is the combined resistance of ${Q(a, 'Ω')} and ${Q(b, 'Ω')} connected in parallel?` + fig, a: Rp, u: 'Ω', w: [a + b, sig((a + b) / 2), sig(Math.abs(a - b) || a * 2)],
            s: T`$R_p = \frac{R_1 R_2}{R_1 + R_2} = \frac{${a} \cdot ${b}}{${a + b}} = ${QT(Rp, 'Ω')}$.` };
    },
    () => {
      const r1 = pick([1, 2, 3, 4, 5, 6, 8, 10]), [a, b] = pick(PAR), V = pick([6, 9, 12, 24]), Rp = a * b / (a + b), Rt = sig(r1 + Rp), I = sig(V / (r1 + Rp)), askI = chance();
      const fig = Fig(circuitSvg('mixed', [`${r1} Ω`, `${a} Ω`, `${b} Ω`], `${V} V`, circLabel()));
      return askI
        ? { q: T`In the circuit shown, what current flows from the ${Q(V, 'V')} battery?` + fig, a: I, u: 'A', w: [sig(V / (r1 + a + b)), sig(V / r1), sig(V / Rp)],
            s: T`Parallel pair: $\frac{${a} \cdot ${b}}{${a + b}} = ${M(sig(Rp))}\,\Omega$. Total: $${r1} + ${M(sig(Rp))} = ${M(Rt)}\,\Omega$. Current: $I = \frac{${V}}{${M(Rt)}} = ${QT(I, 'A')}$.` }
        : { q: T`What is the total resistance of the circuit shown?` + fig, a: Rt, u: 'Ω', w: [r1 + a + b, sig(1 / (1 / r1 + 1 / a + 1 / b)), sig(r1 * Rp / (r1 + Rp))],
            s: T`First the parallel pair: $\frac{${a} \cdot ${b}}{${a} + ${b}} = ${M(sig(Rp))}\,\Omega$. Then add the series resistor: $${r1} + ${M(sig(Rp))} = ${QT(Rt, 'Ω')}$.` };
    },
    () => {
      const R1 = pick([2, 3, 4, 5, 6, 8, 10]), R2 = pick([2, 3, 4, 5, 6, 8, 10, 12]), V = pick([6, 9, 12, 18, 24]), V2 = sig(V * R2 / (R1 + R2));
      return { q: T`A ${Q(R1, 'Ω')} and a ${Q(R2, 'Ω')} resistor are in series with a ${Q(V, 'V')} battery. What is the voltage across the ${Q(R2, 'Ω')} resistor?` + Fig(circuitSvg('series', [`${R1} Ω`, `${R2} Ω`], `${V} V`, circLabel())),
        a: V2, u: 'V', w: [sig(V * R1 / (R1 + R2)), V, sig(V / 2)],
        s: T`$I = \frac{${V}}{${R1} + ${R2}} = ${M(sig(V / (R1 + R2)))}\,\mathrm{A}$, so $V_2 = IR_2 = ${M(sig(V / (R1 + R2)))} \cdot ${R2} = ${QT(V2, 'V')}$. (Voltage divides in proportion to resistance.)` };
    },
    () => {
      const [a, b] = pick(PAR), V = pick([6, 12, 24, 30]), Ib = sig(V / b);
      return { q: T`A ${Q(a, 'Ω')} and a ${Q(b, 'Ω')} resistor are connected in parallel to ${Q(V, 'V')}. What current flows through the ${Q(b, 'Ω')} resistor?`, a: Ib, u: 'A', w: [sig(V / a), sig(V / (a + b)), sig(V * b / (a + b))],
        s: T`Each branch has the full ${Q(V, 'V')} across it, so $I = \frac{${V}}{${b}} = ${QT(Ib, 'A')}$.` };
    },
    () => {
      const e = pick([1.5, 3, 4.5, 6, 9, 12]), r = pick([0.2, 0.5, 1, 1.5, 2]), R = pick([2, 3, 4, 5, 6, 8, 10]), I = sig(e / (R + r)), Vt = sig(e * R / (R + r)), askV = chance();
      return askV
        ? { q: T`A battery with EMF ${Q(e, 'V')} and internal resistance ${Q(r, 'Ω')} is connected to a ${Q(R, 'Ω')} lamp. What is the terminal voltage?`, a: Vt, u: 'V', w: [e, sig(e * r / (R + r)), sig(e - r)],
            s: T`$I = \frac{\varepsilon}{R + r} = \frac{${M(e)}}{${M(R + r)}} = ${M(I)}\,\mathrm{A}$, so $V = \varepsilon - Ir = ${M(e)} - ${M(I)} \cdot ${M(r)} = ${QT(Vt, 'V')}$.` }
        : { q: T`A battery with EMF ${Q(e, 'V')} and internal resistance ${Q(r, 'Ω')} is connected to a ${Q(R, 'Ω')} resistor. What current flows?`, a: I, u: 'A', w: [sig(e / R), sig(e / r), sig(e / (R - r || 1))],
            s: T`$I = \frac{\varepsilon}{R + r} = \frac{${M(e)}}{${R} + ${M(r)}} = ${QT(I, 'A')}$.` };
    },
    () => {
      const k = pick([0, 1]);
      if (k === 0) return { q: T`Three identical lamps are connected in parallel to a battery. One lamp blows. What happens to the other two?`, a: T`They stay lit with the same brightness`, w: [T`They both go out`, T`They get brighter`, T`They get dimmer`], only: 'mc', s: T`Each parallel branch has its own path and still gets the full battery voltage, so the other lamps are unaffected (for an ideal battery). This is why household sockets are wired in parallel.` };
      return { q: T`Two identical lamps are connected in series to a battery. A third identical lamp is added in series. What happens to the brightness of the lamps?`, a: T`They all become dimmer`, w: [T`They stay the same`, T`They become brighter`, T`Only the new lamp is dim`], only: 'mc', s: T`The total resistance goes up, so the current through every lamp goes down, and $P = I^2 R$ for each lamp falls.` };
    },
  ],
},
/* ------------------------------------------------------------------ */
{
  id: 'magnetism', stage: 'sh', title: 'Magnetic Fields & the Lorentz Force',
  blurb: 'Magnetic fields of wires and coils, the force on a current-carrying wire, the force on a moving charge and circular paths.',
  lesson: () => T`
<p>Magnets and electric currents both produce <b>magnetic fields</b>, measured in tesla (T). The Earth's field is about $5 \times 10^{-5}\,\mathrm{T}$; a fridge magnet about $0.01\,\mathrm{T}$.</p>
<h3>Fields made by currents</h3>
<ul><li>Around a long straight wire the field lines are circles: $B = \dfrac{\mu_0 I}{2\pi r}$.</li><li>Inside a long solenoid with $n$ turns per metre the field is uniform: $B = \mu_0 n I$.</li></ul>
<p>Here $\mu_0 = 4\pi \times 10^{-7}\,\mathrm{T\,m/A}$. Curl the fingers of your right hand around the wire with the thumb along the current: the fingers show the field direction.</p>
${Key(T`<p>A magnetic field pushes on moving charges (the <b>Lorentz force</b>):</p><p>$$\text{on a wire: } F = B I L \sin\theta \qquad \text{on a charge: } F = q v B \sin\theta$$</p><p>$\theta$ is the angle between the current (or velocity) and the field. The force is perpendicular to both, and zero when they are parallel.</p>`)}
<h3>Charged particles in a field</h3>
<p>A charge moving at right angles to a uniform field feels a force perpendicular to its velocity, so it moves in a circle. Setting $qvB = \dfrac{m v^2}{r}$ gives the radius</p>
${Fm(T`r = \frac{m v}{q B}`)}
<p>This is how mass spectrometers sort ions and how particle accelerators steer beams. Electric motors use the force on current-carrying wires.</p>
${Tip(T`<p>The magnetic force never speeds a charge up or slows it down, because it is always at right angles to the motion: it only changes the direction.</p>`)}`,
  gens: [
    () => {
      const I = ri(1, 50), r = ri(1, 20) / 100, B = 2e-7 * I / r;
      return { q: T`A long straight wire carries a current of ${Q(I, 'A')}. What is the magnetic field strength ${Q(r * 100, 'cm')} from it, in microtesla? ($\mu_0 = 4\pi \times 10^{-7}\,\mathrm{T\,m/A}$.)`, a: sig(B * 1e6), u: 'µT', w: [sig(B * 1e6 * 2 * Math.PI), sig(2e-7 * I / (r * 100) * 1e6), sig(B * 1e6 * 10)],
        s: T`$B = \frac{\mu_0 I}{2\pi r} = \frac{4\pi \times 10^{-7} \cdot ${I}}{2\pi \cdot ${M(r)}} = ${sciT(B)}\,\mathrm{T} = ${QT(sig(B * 1e6), 'µT')}$.` };
    },
    () => {
      const N = ri(1, 20) * 100, L = ri(1, 10) / 10, I = ri(1, 10) / 2, B = 4 * Math.PI * 1e-7 * (N / L) * I;
      return { q: T`A solenoid ${Q(L * 100, 'cm')} long has ${N} turns and carries ${Q(I, 'A')}. What is the magnetic field inside it, in millitesla? ($\mu_0 = 4\pi \times 10^{-7}\,\mathrm{T\,m/A}$.)`, a: sig(B * 1e3), u: 'mT', w: [sig(4 * Math.PI * 1e-7 * N * I * 1e3), sig(B * 1e3 / (2 * Math.PI)), sig(B * 1e6)],
        s: T`$n = \frac{${N}}{${M(L)}} = ${M(sig(N / L))}\,\mathrm{m^{-1}}$, so $B = \mu_0 n I = 4\pi \times 10^{-7} \cdot ${M(sig(N / L))} \cdot ${M(I)} = ${QT(sig(B * 1e3), 'mT')}$.` };
    },
    () => {
      const B = ri(1, 20) / 20, I = ri(1, 20), L = ri(5, 50) / 100, th = pick([90, 90, 30, 60]), F = sig(B * I * L * sinD(th));
      return { q: th === 90 ? T`A wire ${Q(L * 100, 'cm')} long carrying ${Q(I, 'A')} lies at right angles to a magnetic field of ${Q(B, 'T')}. What force acts on it?` : T`A wire ${Q(L * 100, 'cm')} long carrying ${Q(I, 'A')} makes an angle of ${Q(th, '°')} with a magnetic field of ${Q(B, 'T')}. What force acts on it?`,
        a: F, u: 'N', w: [sig(B * I * L * (th === 90 ? 0.5 : cosD(th))), sig(B * I * L * 100), sig(B * I / L)], s: T`$F = BIL\sin\theta = ${M(B)} \cdot ${I} \cdot ${M(L)} \sin ${th}^\circ = ${QT(F, 'N')}$.` };
    },
    () => {
      const v = ri(1, 9) * 10 ** ri(5, 6), B = ri(1, 20) / 10, F = 1.6e-19 * v * B;
      return { q: T`A proton moves at $${sciT(v, 1)}\,\mathrm{m/s}$ at right angles to a magnetic field of ${Q(B, 'T')}. What force acts on it? ($e = 1.6 \times 10^{-19}\,\mathrm{C}$.)`, a: `$${sciT(F)}\\,\\mathrm{N}$`, w: [`$${sciT(F * 1e3)}\\,\\mathrm{N}$`, `$${sciT(F * 1e-3)}\\,\\mathrm{N}$`, `$${sciT(F / 2)}\\,\\mathrm{N}$`], v: F, rtol: 0.02, h: T`Type a power of ten like 4.8e-13.`,
        s: T`$F = qvB = 1.6 \times 10^{-19} \cdot ${sciT(v, 1)} \cdot ${M(B)} = ${sciT(F)}\,\mathrm{N}$.` };
    },
    () => {
      const [pn, m] = pick([[T`A proton`, 1.67e-27], [T`An electron`, 9.11e-31]]), v = ri(1, 9) * (m > 1e-28 ? 1e6 : 1e7), B = pick([0.01, 0.02, 0.05, 0.1, 0.5, 1]), r = m * v / (1.6e-19 * B);
      return { q: T`${pn} moves at $${sciT(v, 1)}\,\mathrm{m/s}$ at right angles to a uniform magnetic field of ${Q(B, 'T')}. What is the radius of its circular path, in centimetres? ($m_p = 1.67 \times 10^{-27}\,\mathrm{kg}$, $m_e = 9.11 \times 10^{-31}\,\mathrm{kg}$, $e = 1.6 \times 10^{-19}\,\mathrm{C}$.)`, a: sig(r * 100), u: 'cm', w: [sig(r), sig(r * 100 * 2), sig(r * 1e4)],
        s: T`$r = \frac{mv}{qB} = \frac{${sciT(m, 3)} \cdot ${sciT(v, 1)}}{1.6 \times 10^{-19} \cdot ${M(B)}} = ${sciT(r)}\,\mathrm{m} = ${QT(sig(r * 100), 'cm')}$.` };
    },
    () => pick([
      { q: T`An electron moves exactly parallel to the field lines of a uniform magnetic field. What magnetic force acts on it?`, a: T`None`, w: [T`A force along its motion`, T`A force at right angles to its motion`, T`A force opposite to its motion`], only: 'mc', s: T`$F = qvB\sin\theta$ and $\theta = 0$, so the force is zero; the electron carries on in a straight line.` },
      { q: T`What does the magnetic force do to a charged particle moving across a uniform magnetic field?`, a: T`It changes the particle's direction but not its speed`, w: [T`It speeds the particle up`, T`It slows the particle down`, T`It changes neither speed nor direction`], only: 'mc', s: T`The force is always perpendicular to the velocity, so it does no work. The speed stays the same while the path curves into a circle.` },
    ]),
  ],
},
{
  id: 'induction', stage: 'sh', title: 'Electromagnetic Induction',
  blurb: 'Magnetic flux, Faraday’s and Lenz’s laws, EMF in a moving rod, generators, transformers and power transmission.',
  lesson: () => T`
<p>A changing magnetic field can drive a current. This is <b>electromagnetic induction</b>, discovered by Faraday in 1831, and it is how almost all of our electricity is generated.</p>
<h3>Magnetic flux</h3>
${Fm(T`\Phi = B A \cos\theta`)}
<p>The flux (in webers, $\mathrm{Wb}$) measures how much magnetic field passes through a loop of area $A$; $\theta$ is the angle between the field and the normal to the loop.</p>
${Key(T`<p><b>Faraday's law:</b> the EMF induced in a coil of $N$ turns equals the rate of change of flux linkage:</p><p>$$\varepsilon = -N\frac{\Delta \Phi}{\Delta t}.$$</p><p><b>Lenz's law</b> (the minus sign): the induced current flows so as to oppose the change that causes it.</p>`)}
<h3>A moving rod</h3>
<p>A rod of length $L$ moving at speed $v$ at right angles to a field $B$ sweeps through flux, and an EMF $\varepsilon = B L v$ appears between its ends.</p>
<h3>Generators and transformers</h3>
<p>A generator turns a coil in a magnetic field, producing an alternating EMF. A <b>transformer</b> uses a changing current in one coil to induce an EMF in another wound on the same iron core:</p>
${Fm(T`\frac{V_s}{V_p} = \frac{N_s}{N_p} \qquad \text{ideal: } V_p I_p = V_s I_s`)}
<p>Power is sent across the country at very high voltage: for the same power the current is small, so the heating loss in the cables, $P = I^2 R$, is small too.</p>
${Tip(T`<p>A transformer works only with alternating current. A steady direct current gives no changing flux, so nothing is induced.</p>`)}`,
  gens: [
    () => {
      const B = ri(1, 20) / 20, a = ri(2, 20), A = (a / 100) ** 2, th = pick([0, 0, 30, 60]), Phi = B * A * cosD(th);
      return { q: th ? T`A square loop of side ${Q(a, 'cm')} is in a uniform field of ${Q(B, 'T')}; the field makes ${Q(th, '°')} with the normal to the loop. What is the flux through the loop, in milliwebers?` : T`A square loop of side ${Q(a, 'cm')} lies at right angles to a uniform field of ${Q(B, 'T')}. What is the magnetic flux through it, in milliwebers?`,
        a: sig(Phi * 1000), u: 'mWb', w: [sig(B * a * a), sig(B * A * 1000 * (th ? sinD(th) : 2)), sig(B * (a / 100) * 1000)], s: T`$A = (${M(a / 100)})^2 = ${M(sig(A))}\,\mathrm{m^2}$, so $\Phi = BA\cos\theta = ${M(B)} \cdot ${M(sig(A))} \cos ${th}^\circ = ${QT(sig(Phi * 1000), 'mWb')}$.` };
    },
    () => {
      const N = ri(1, 20) * 50, dPhi = ri(1, 20) / 1000, dt = pick([0.01, 0.02, 0.05, 0.1, 0.2, 0.5]), e = sig(N * dPhi / dt);
      return { q: T`The magnetic flux through a coil of ${N} turns changes by ${Q(dPhi * 1000, 'mWb')} in ${Q(dt, 's')}. What EMF is induced?`, a: e, u: 'V', w: [sig(dPhi / dt), sig(N * dPhi * dt), sig(N * dPhi / dt * 1000)], s: T`$\varepsilon = N\frac{\Delta\Phi}{\Delta t} = ${N} \cdot \frac{${M(dPhi)}}{${M(dt)}} = ${QT(e, 'V')}$.` };
    },
    () => {
      const B = ri(1, 20) / 20, L = ri(1, 20) / 10, v = ri(1, 20), e = sig(B * L * v);
      return { q: T`A metal rod ${Q(L, 'm')} long moves at ${Q(v, 'm/s')} at right angles to a magnetic field of ${Q(B, 'T')}. What EMF is induced between its ends?`, a: e, u: 'V', w: [sig(B * v / L), sig(B * L / v), sig(B * L * v * v)], s: T`$\varepsilon = BLv = ${M(B)} \cdot ${M(L)} \cdot ${v} = ${QT(e, 'V')}$.` };
    },
    () => {
      const Vp = pick([220, 230, 240, 110]), Np = pick([500, 1000, 1200, 2000, 2200]), Ns = pick([50, 60, 100, 120, 240, 4000, 10000]), Vs = sig(Vp * Ns / Np);
      return { q: T`A transformer has ${Np} turns on its primary coil and ${Ns} turns on its secondary. The primary is connected to ${Q(Vp, 'V')} AC. What is the secondary voltage?`, a: Vs, u: 'V', w: [sig(Vp * Np / Ns), sig(Vp * Ns / Np / 2), Vp], s: T`$V_s = V_p \frac{N_s}{N_p} = ${Vp} \cdot \frac{${Ns}}{${Np}} = ${QT(Vs, 'V')}$. ${Ns > Np ? T`It is a step-up transformer.` : T`It is a step-down transformer.`}` };
    },
    () => {
      const Vp = 220, Vs = pick([6, 9, 12, 24]), Is = ri(1, 20) / 2, Ip = sig(Vs * Is / Vp);
      return { q: T`An ideal transformer steps ${Q(Vp, 'V')} down to ${Q(Vs, 'V')}. The secondary supplies ${Q(Is, 'A')} to a lamp. What current flows in the primary?`, a: Ip, u: 'A', w: [sig(Vp * Is / Vs), Is, sig(Is * Vs / Vp * 10)], s: T`Power in = power out: $I_p = \frac{V_s I_s}{V_p} = \frac{${Vs} \cdot ${M(Is)}}{${Vp}} = ${QT(Ip, 'A')}$.` };
    },
    () => {
      const k = pick([10, 20, 50, 100]);
      return { q: T`A power station sends the same power along the same cables, but at ${k} times the voltage. By what factor does the power lost as heat in the cables change?`, a: T`It becomes ${k * k} times smaller`, w: [T`It becomes ${k} times smaller`, T`It becomes ${k} times larger`, T`It does not change`], only: 'mc',
        s: T`For the same power, ${k} times the voltage means $\frac{1}{${k}}$ of the current. The loss $P = I^2R$ therefore falls by a factor of $${k}^2 = ${k * k}$.` };
    },
    () => ({ q: T`The north pole of a magnet is pushed into a coil. According to Lenz's law, the induced current in the coil:`, a: T`makes the near end of the coil a north pole, repelling the magnet`, w: [T`makes the near end of the coil a south pole, attracting the magnet`, T`flows only after the magnet stops`, T`is zero, because the magnet is not touching the coil`], only: 'mc',
      s: T`The induced current opposes the change causing it: the coil pushes back on the approaching north pole by forming a north pole of its own. The work done against this push becomes electrical energy.` }),
  ],
},
{
  id: 'ac', stage: 'sh', title: 'Alternating Current',
  blurb: 'Peak and rms values, reactance of inductors and capacitors, impedance of RLC circuits, resonance and AC power.',
  lesson: () => T`
<p>Mains electricity is <b>alternating current</b>: the voltage swings back and forth sinusoidally, $V = V_0 \sin(\omega t)$ with $\omega = 2\pi f$. In Indonesia the frequency is $50\,\mathrm{Hz}$.</p>
<h3>RMS values</h3>
<p>The <b>root-mean-square</b> (rms) value is the steady DC value that would give the same heating: $V_{\text{rms}} = \dfrac{V_0}{\sqrt2}$ and $I_{\text{rms}} = \dfrac{I_0}{\sqrt2}$. When mains is described as $220\,\mathrm{V}$ this is the rms value; the peak is $220\sqrt2 \approx 311\,\mathrm{V}$. The average power in a resistor is $P = I_{\text{rms}}^2 R = V_{\text{rms}} I_{\text{rms}}$.</p>
${Key(T`<p>Inductors and capacitors oppose AC with a <b>reactance</b> (in ohms) that depends on the frequency:</p><p>$$X_L = \omega L = 2\pi f L \qquad X_C = \frac{1}{\omega C} = \frac{1}{2\pi f C}$$</p><p>In a series RLC circuit the <b>impedance</b> is $Z = \sqrt{R^2 + (X_L - X_C)^2}$ and $I = V/Z$.</p>`)}
<h3>Resonance</h3>
<p>When $X_L = X_C$, the impedance is smallest ($Z = R$) and the current largest. This happens at the <b>resonant frequency</b></p>
${Fm(T`f_0 = \frac{1}{2\pi\sqrt{LC}}`)}
<p>Radios select one station by tuning an LC circuit to resonate at its frequency.</p>
${Tip(T`<p>An inductor passes low frequencies easily and blocks high ones; a capacitor does the opposite.</p>`)}`,
  gens: [
    () => {
      const Vr = pick([110, 120, 220, 230, 240]), V0 = sig(Vr * Math.SQRT2), askPeak = chance();
      return askPeak
        ? { q: T`A mains supply is rated ${Q(Vr, 'V')} rms. What is its peak voltage?`, a: V0, u: 'V', w: [sig(Vr / Math.SQRT2), Vr * 2, Vr], s: T`$V_0 = \sqrt2\,V_{\text{rms}} = \sqrt2 \cdot ${Vr} = ${QT(V0, 'V')}$.` }
        : { q: T`An AC voltage has a peak value of ${Q(V0, 'V')}. What is its rms value?`, a: sig(V0 / Math.SQRT2), u: 'V', w: [sig(V0 * Math.SQRT2), sig(V0 / 2), V0], s: T`$V_{\text{rms}} = \frac{V_0}{\sqrt2} = \frac{${M(V0)}}{\sqrt2} = ${QT(sig(V0 / Math.SQRT2), 'V')}$.` };
    },
    () => {
      const V = 220, R = pick([22, 44, 55, 110, 220, 440]), I = sig(V / R), P = sig(V * V / R), askP = chance();
      return { q: T`A ${Q(R, 'Ω')} heater is connected to ${Q(V, 'V')} rms mains. What is ${askP ? T`the average power` : T`the rms current`}?`, a: askP ? P : I, u: askP ? 'W' : 'A', w: askP ? [sig(2 * V * V / R), sig(V * V / R / 2), sig(V / R)] : [sig(I * Math.SQRT2), sig(I / Math.SQRT2), sig(R / V)],
        s: askP ? T`$P = \frac{V_{\text{rms}}^2}{R} = \frac{${V}^2}{${R}} = ${QT(P, 'W')}$.` : T`$I_{\text{rms}} = \frac{V_{\text{rms}}}{R} = \frac{${V}}{${R}} = ${QT(I, 'A')}$.` };
    },
    () => {
      const f = pick([50, 60, 100, 500, 1000]), ind = chance(), L = pick([0.05, 0.1, 0.2, 0.5, 1]), C = pick([1, 2, 5, 10, 47, 100]), X = sig(ind ? 2 * Math.PI * f * L : 1 / (2 * Math.PI * f * C * 1e-6));
      return { q: ind ? T`What is the reactance of a ${Q(L * 1000, 'mH')} inductor at ${Q(f, 'Hz')}?` : T`What is the reactance of a ${Q(C, 'µF')} capacitor at ${Q(f, 'Hz')}?`, a: X, u: 'Ω', w: ind ? [sig(f * L), sig(1 / (2 * Math.PI * f * L)), sig(2 * Math.PI * f * L * 1000)] : [sig(2 * Math.PI * f * C * 1e-6, 3), sig(1 / (f * C * 1e-6)), sig(X / 1000)],
        s: ind ? T`$X_L = 2\pi f L = 2\pi \cdot ${f} \cdot ${M(L)} = ${QT(X, 'Ω')}$.` : T`$X_C = \frac{1}{2\pi f C} = \frac{1}{2\pi \cdot ${f} \cdot ${M(C)} \times 10^{-6}} = ${QT(X, 'Ω')}$.` };
    },
    () => {
      const [R, XL, XC] = pick([[30, 60, 20], [40, 50, 20], [60, 100, 20], [80, 90, 30], [120, 200, 40], [30, 20, 60], [40, 10, 40]]), Z = sig(Math.hypot(R, XL - XC)), V = pick([12, 24, 50, 100, 220]), I = sig(V / Z), askI = chance();
      return { q: T`A series circuit has $R = ${QT(R, 'Ω')}$, $X_L = ${QT(XL, 'Ω')}$ and $X_C = ${QT(XC, 'Ω')}$. ${askI ? T`It is connected to ${Q(V, 'V')} rms. What rms current flows?` : T`What is its impedance?`}`, a: askI ? I : Z, u: askI ? 'A' : 'Ω', w: askI ? [sig(V / (R + XL + XC)), sig(V / R), sig(V / Math.hypot(R, XL + XC))] : [R + XL - XC, sig(Math.hypot(R, XL + XC)), R],
        s: T`$Z = \sqrt{R^2 + (X_L - X_C)^2} = \sqrt{${R}^2 + ${XL - XC}^2} = ${M(Z)}\,\Omega$.${askI ? T` So $I = \frac{V}{Z} = \frac{${V}}{${M(Z)}} = ${QT(I, 'A')}$.` : ''}` };
    },
    () => {
      const L = pick([1, 2, 5, 10, 50, 100]) / 1000, C = pick([1, 10, 47, 100, 220]) * 1e-9, f0 = 1 / (2 * Math.PI * Math.sqrt(L * C));
      return { q: T`A tuning circuit has an inductance of ${Q(L * 1000, 'mH')} and a capacitance of ${Q(C * 1e9, 'nF')}. At what frequency does it resonate, in kHz?`, a: sig(f0 / 1000), u: 'kHz', w: [sig(1 / Math.sqrt(L * C) / 1000), sig(f0 / 1000 * 2 * Math.PI), sig(1 / (2 * Math.PI * L * C) / 1e6)],
        s: T`$f_0 = \frac{1}{2\pi\sqrt{LC}} = \frac{1}{2\pi\sqrt{${sciT(L)} \cdot ${sciT(C)}}} = ${M(sig(f0))}\,\mathrm{Hz} = ${QT(sig(f0 / 1000), 'kHz')}$.` };
    },
    () => ({ q: T`The frequency of the AC supply to a circuit containing only a capacitor is increased. What happens to the current?`, a: T`It increases, because the capacitor's reactance falls`, w: [T`It decreases, because the reactance rises`, T`It stays the same`, T`It becomes zero`], only: 'mc',
      s: T`$X_C = \frac{1}{2\pi f C}$ falls as $f$ rises, so for the same voltage more current flows. (For an inductor the opposite happens.)` }),
  ],
},
{
  id: 'em-waves', stage: 'sh', title: 'Electromagnetic Waves',
  blurb: 'The electromagnetic spectrum, the speed of light, frequency and wavelength, uses and dangers, and polarisation.',
  lesson: () => T`
<p>Changing electric and magnetic fields create each other and travel together through space as an <b>electromagnetic (EM) wave</b>. EM waves are transverse, need no medium, and in a vacuum all travel at the speed of light, $c = 3.0 \times 10^{8}\,\mathrm{m/s}$.</p>
${Fm(T`c = f\lambda`)}
<h3>The electromagnetic spectrum</h3>
${Tbl([T`Type`, T`Typical wavelength`, T`Uses`], [[T`Radio waves`, T`metres to kilometres`, T`radio, TV, communication`], [T`Microwaves`, T`millimetres to centimetres`, T`mobile phones, Wi-Fi, radar, cooking`], [T`Infrared`, T`micrometres`, T`remote controls, thermal cameras, heaters`], [T`Visible light`, T`400–700 nm`, T`seeing, optical fibres`], [T`Ultraviolet`, T`10–400 nm`, T`sterilising, fluorescence; causes sunburn`], [T`X-rays`, T`about 0.01–10 nm`, T`medical imaging, airport security`], [T`Gamma rays`, T`below about 0.01 nm`, T`cancer treatment, sterilising equipment`]])}
<p>From radio to gamma rays the wavelength gets shorter and the frequency higher. Higher frequency also means more energy carried by each photon, which is why ultraviolet, X-rays and gamma rays can damage living cells.</p>
${Key(T`<p><b>Polarisation</b> shows that EM waves are transverse. A polarising filter lets through only the part of the wave oscillating in one direction. For polarised light of intensity $I_0$ falling on a filter at angle $\theta$ to its direction of polarisation (Malus's law):</p><p>$$I = I_0 \cos^2\theta.$$</p><p>Unpolarised light loses half its intensity at the first filter.</p>`)}
${Tip(T`<p>1 nanometre is $10^{-9}\,\mathrm{m}$. Green light of $500\,\mathrm{nm}$ has $f = \frac{3 \times 10^{8}}{500 \times 10^{-9}} = 6 \times 10^{14}\,\mathrm{Hz}$.</p>`)}`,
  gens: [
    () => {
      const fm = chance(), f = fm ? ri(880, 1080) / 10 : ri(54, 160) * 10, lam = sig(3e8 / (f * (fm ? 1e6 : 1e3)));
      return { q: fm ? T`An FM radio station broadcasts at ${Q(f, 'MHz')}. What is the wavelength of its waves? ($c = 3.0 \times 10^{8}\,\mathrm{m/s}$.)` : T`An AM radio station broadcasts at ${Q(f, 'kHz')}. What is the wavelength of its waves? ($c = 3.0 \times 10^{8}\,\mathrm{m/s}$.)`,
        a: lam, u: 'm', w: [sig(lam * 1000), sig(lam / 1000), sig(3e8 / f / 1e3)], s: T`$\lambda = \frac{c}{f} = \frac{3.0 \times 10^{8}}{${M(f)} \times 10^{${fm ? 6 : 3}}} = ${QT(lam, 'm')}$.` };
    },
    () => {
      const nm = ri(40, 70) * 10, f = 3e8 / (nm * 1e-9);
      return { q: T`Light has a wavelength of ${Q(nm, 'nm')}. What is its frequency? ($c = 3.0 \times 10^{8}\,\mathrm{m/s}$.)`, a: `$${sciT(f)}\\,\\mathrm{Hz}$`, w: [`$${sciT(f / 1e9)}\\,\\mathrm{Hz}$`, `$${sciT(nm * 1e-9 / 3e8)}\\,\\mathrm{Hz}$`, `$${sciT(f * 10)}\\,\\mathrm{Hz}$`], v: f, rtol: 0.02, h: T`Type a power of ten like 5e14.`,
        s: T`$f = \frac{c}{\lambda} = \frac{3.0 \times 10^{8}}{${nm} \times 10^{-9}} = ${sciT(f)}\,\mathrm{Hz}$.` };
    },
    () => {
      const [what, d] = pick([[T`the Sun`, 1.5e11], [T`the Moon`, 3.84e8], [T`a geostationary satellite`, 3.6e7]]), t = d / 3e8;
      return { q: T`How long does light (or a radio signal) take to travel from ${what} to the Earth, a distance of $${sciT(d)}\,\mathrm{m}$? ($c = 3.0 \times 10^{8}\,\mathrm{m/s}$.)`, a: sig(t), u: 's', w: [sig(t * 60), sig(t / 60), sig(t * 2)], s: T`$t = \frac{d}{c} = \frac{${sciT(d)}}{3.0 \times 10^{8}} = ${QT(sig(t), 's')}$${t > 120 ? T`, about ${NUM(sig(t / 60, 2))} minutes` : ''}.` };
    },
    () => {
      const I0 = ri(2, 40) * 10, th = pick([30, 45, 60, 20, 70]), I = sig(I0 * cosD(th) ** 2), unpol = chance();
      return unpol
        ? { q: T`Unpolarised light of intensity ${Q(I0, 'W/m^2')} passes through two polarising filters whose axes are at ${Q(th, '°')} to each other. What intensity comes out?`, a: sig(I0 / 2 * cosD(th) ** 2), u: 'W/m²', w: [I, sig(I0 / 2), sig(I0 / 2 * cosD(th))], s: T`The first filter halves the intensity: ${Q(I0 / 2, 'W/m^2')}. Then $I = \frac{I_0}{2}\cos^2\theta = ${M(I0 / 2)} \cos^2 ${th}^\circ = ${QT(sig(I0 / 2 * cosD(th) ** 2), 'W/m^2')}$.` }
        : { q: T`Polarised light of intensity ${Q(I0, 'W/m^2')} falls on a polarising filter whose axis is at ${Q(th, '°')} to the light's direction of polarisation. What intensity passes through?`, a: I, u: 'W/m²', w: [sig(I0 * cosD(th)), sig(I0 * sinD(th) ** 2), sig(I0 / 2)], s: T`Malus's law: $I = I_0\cos^2\theta = ${I0} \cos^2 ${th}^\circ = ${QT(I, 'W/m^2')}$.` };
    },
    () => {
      const bands = [T`radio waves`, T`microwaves`, T`infrared`, T`visible light`, T`ultraviolet`, T`X-rays`, T`gamma rays`], i = ri(0, 5), j = ri(i + 1, 6), hi = chance();
      return { q: hi ? T`Which has the <b>higher</b> frequency: ${bands[i]} or ${bands[j]}?` : T`Which has the <b>longer</b> wavelength: ${bands[i]} or ${bands[j]}?`, a: hi ? bands[j] : bands[i], w: [hi ? bands[i] : bands[j], T`They are the same`], only: 'mc',
        s: T`In order of increasing frequency (and decreasing wavelength): radio, microwaves, infrared, visible, ultraviolet, X-rays, gamma rays.` };
    },
    () => pick([
      { q: T`Which type of electromagnetic radiation is used by a TV remote control?`, a: T`Infrared`, w: [T`Ultraviolet`, T`X-rays`, T`Gamma rays`], only: 'mc', s: T`Remote controls send pulses of infrared light that a sensor on the TV detects.` },
      { q: T`Why can sound waves not be polarised, while light can?`, a: T`Sound is longitudinal; only transverse waves can be polarised`, w: [T`Sound is too slow`, T`Sound has too low a frequency`, T`Light carries more energy`], only: 'mc', s: T`Polarisation picks one direction of oscillation at right angles to the travel. A longitudinal wave oscillates along its travel, so there is nothing to choose.` },
      { q: T`What do all electromagnetic waves have in common in a vacuum?`, a: T`They travel at the same speed`, w: [T`They have the same frequency`, T`They have the same wavelength`, T`They carry the same energy per photon`], only: 'mc', s: T`All EM waves travel through a vacuum at $c = 3.0 \times 10^{8}\,\mathrm{m/s}$; they differ in frequency and wavelength.` },
    ]),
  ],
},
  ],
});
})();
