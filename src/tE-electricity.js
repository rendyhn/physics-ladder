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
{ id: 'electrostatics', stage: 'sh', soon: true, title: 'Electrostatics: Charge, Force & Field' },
{ id: 'capacitors', stage: 'sh', soon: true, title: 'Electric Potential & Capacitors' },
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
{ id: 'magnetism', stage: 'sh', soon: true, title: 'Magnetic Fields & the Lorentz Force' },
{ id: 'induction', stage: 'sh', soon: true, title: 'Electromagnetic Induction' },
{ id: 'ac', stage: 'sh', soon: true, title: 'Alternating Current' },
{ id: 'em-waves', stage: 'sh', soon: true, title: 'Electromagnetic Waves' },
  ],
});
})();
