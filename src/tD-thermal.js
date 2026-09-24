/* ==========================================================================
   TRACK D — Heat & Thermodynamics
   ========================================================================== */
(() => {
const MATS = () => [[T`water`, 4200], [T`aluminium`, 900], [T`iron`, 450], [T`copper`, 390], [T`glass`, 670]];

level({
  id: 'thermal', mark: 'D', name: 'Heat & Thermodynamics', short: 'Heat', band: 'Temperature · heat · gases · engines', color: 'lv4',
  blurb: 'Temperature scales, heating and changes of state, expansion, then gases, heat engines and how heat travels.',
  topics: [
/* ------------------------------------------------------------------ */
{
  id: 'heat', stage: 'jh', title: 'Temperature, Heat & Expansion',
  blurb: 'Temperature scales, specific heat capacity, latent heat, mixing (calorimetry) and thermal expansion.',
  lesson: () => T`
<p><b>Temperature</b> tells us how hot something is; it measures the average kinetic energy of its particles. <b>Heat</b> is energy that flows from a hotter object to a colder one because of the temperature difference. Heat is measured in joules.</p>
<h3>Temperature scales</h3>
${Fm(T`T_K = T_C + 273 \qquad T_F = \tfrac95 T_C + 32`)}
<p>A change of $1^\circ\mathrm{C}$ is the same as a change of $1\,\mathrm{K}$. Water freezes at $0^\circ\mathrm{C} = 273\,\mathrm{K} = 32^\circ\mathrm{F}$ and boils at $100^\circ\mathrm{C} = 373\,\mathrm{K} = 212^\circ\mathrm{F}$. (More precisely, $0^\circ\mathrm{C} = 273.15\,\mathrm{K}$.)</p>
<h3>Specific heat capacity</h3>
<p>The heat needed to change the temperature of a mass $m$ by $\Delta T$ is</p>
${Fm(T`Q = m\,c\,\Delta T`)}
<p>where $c$ is the <b>specific heat capacity</b> of the material, in $\mathrm{J/(kg\,{}^\circ C)}$: the heat needed to warm $1\,\mathrm{kg}$ by $1^\circ\mathrm{C}$. Water has a very large value, about $4200\,\mathrm{J/(kg\,{}^\circ C)}$, which is why the sea warms and cools slowly.</p>
<h3>Changes of state</h3>
<p>While a substance melts or boils, its temperature stays constant even though heat is flowing in. The heat needed is</p>
${Fm(T`Q = m\,L`)}
<p>where $L$ is the <b>latent heat</b>: about $3.34 \times 10^{5}\,\mathrm{J/kg}$ to melt ice and $2.26 \times 10^{6}\,\mathrm{J/kg}$ to boil water.</p>
${Key(T`<p><b>Calorimetry (Black's principle):</b> when hot and cold objects are mixed in an insulated container, the heat lost by the hot one equals the heat gained by the cold one:</p><p>$$m_1 c_1 (T_1 - T) = m_2 c_2 (T - T_2),$$</p><p>where $T$ is the final common temperature.</p>`)}
${Ex(T`<p>$0.2\,\mathrm{kg}$ of water at $80^\circ\mathrm{C}$ is mixed with $0.3\,\mathrm{kg}$ of water at $20^\circ\mathrm{C}$. The $c$ is the same on both sides, so it cancels:</p><p>$$0.2(80 - T) = 0.3(T - 20) \;\Rightarrow\; 16 + 6 = 0.5T \;\Rightarrow\; T = 44^\circ\mathrm{C}.$$</p>`)}
<h3>Thermal expansion</h3>
<p>Most materials expand when heated. A rod of length $L_0$ grows by</p>
${Fm(T`\Delta L = \alpha\, L_0\, \Delta T`)}
<p>where $\alpha$ is the coefficient of linear expansion (steel: about $1.2 \times 10^{-5}\,/{}^\circ\mathrm{C}$). Areas expand with about $2\alpha$ and volumes with about $3\alpha$. Gaps are left in railway tracks and bridges for this reason.</p>
${Tip(T`<p>In $Q = mc\Delta T$ the mass must be in kilograms: $250\,\mathrm{g} = 0.25\,\mathrm{kg}$.</p>`)}`,
  gens: [
    () => {
      const k = pick(['CK', 'KC', 'CF', 'FC']);
      if (k === 'CK') { const c = ri(-40, 120); return { q: T`Convert ${Q(c, '°C')} to kelvin.`, a: c + 273, u: 'K', w: [c - 273, c + 32, 273 - c], neg: true, s: T`$T_K = T_C + 273 = ${pn(c)} + 273 = ${QT(c + 273, 'K')}$.` }; }
      if (k === 'KC') { const K = ri(200, 450); return { q: T`A gas is at ${Q(K, 'K')}. What is this in degrees Celsius?`, a: K - 273, u: '°C', w: [K + 273, K - 32, 273 - K], neg: true, s: T`$T_C = T_K - 273 = ${K} - 273 = ${QT(K - 273, '°C')}$.` }; }
      if (k === 'CF') { const c = ri(-8, 20) * 5; const f = 9 / 5 * c + 32; return { q: T`Convert ${Q(c, '°C')} to degrees Fahrenheit.`, a: f, u: '°F', w: [sig(5 / 9 * c + 32), sig(9 / 5 * (c + 32)), c + 32], neg: true, s: T`$T_F = \tfrac95 T_C + 32 = \tfrac95 \cdot ${pn(c)} + 32 = ${M(f)}^\circ\mathrm{F}$.` }; }
      const c = ri(-4, 20) * 5, f = 9 / 5 * c + 32;
      return { q: T`A thermometer reads $${M(f)}^\circ\mathrm{F}$. What is this in degrees Celsius?`, a: c, u: '°C', w: [sig(9 / 5 * (f - 32)), sig(f - 32), sig(5 / 9 * f)], neg: true, s: T`$T_C = \tfrac59 (T_F - 32) = \tfrac59 (${M(f)} - 32) = ${QT(c, '°C')}$.` };
    },
    () => {
      const [mat, c] = pick(MATS()), m = pick([0.2, 0.25, 0.5, 1, 1.5, 2, 3]), dT = ri(2, 16) * 5, Qh = sig(m * c * dT, 6), askQ = chance();
      return askQ
        ? { q: T`How much heat is needed to raise the temperature of ${Q(m, 'kg')} of ${mat} by ${Q(dT, '°C')}? (Specific heat capacity: ${Q(c, 'J/(kg\\,{}^\\circ C)')}.)`, a: Qh, u: 'J', w: [sig(m * c, 6), sig(c * dT, 6), sig(m * dT, 6)], s: T`$Q = mc\Delta T = ${M(m)} \cdot ${c} \cdot ${dT} = ${QT(Qh, 'J')}$.` }
        : { q: T`${Q(Qh, 'J')} of heat is given to ${Q(m, 'kg')} of ${mat} (${Q(c, 'J/(kg\\,{}^\\circ C)')}). By how much does its temperature rise?`, a: dT, u: '°C', w: [sig(Qh / c), sig(Qh / m / 1000), sig(Qh * m / c)], s: T`$\Delta T = \frac{Q}{mc} = \frac{${M(Qh)}}{${M(m)} \cdot ${c}} = ${QT(dT, '°C')}$.` };
    },
    () => {
      const m = pick([0.1, 0.2, 0.25, 0.5, 1, 2]), boil = chance(), L = boil ? 2.26e6 : 3.34e5, Qh = sig(m * L, 6);
      return { q: boil ? T`How much heat is needed to turn ${Q(m, 'kg')} of water at $100^\circ\mathrm{C}$ completely into steam at $100^\circ\mathrm{C}$? (Latent heat of vaporisation: $${sciT(L)}\,\mathrm{J/kg}$.)` : T`How much heat is needed to melt ${Q(m, 'kg')} of ice at $0^\circ\mathrm{C}$ into water at $0^\circ\mathrm{C}$? (Latent heat of fusion: $${sciT(L)}\,\mathrm{J/kg}$.)`,
        a: Qh, u: 'J', w: [sig(L / m, 6), sig(m * 4200 * 100, 6), sig(m * L / 10, 6)], s: T`The temperature does not change, so only latent heat is needed: $Q = mL = ${M(m)} \cdot ${sciT(L)} = ${sciT(Qh)}\,\mathrm{J}$.` };
    },
    () => {
      const m1 = pick([0.1, 0.2, 0.3, 0.4, 0.5]), m2 = pick([0.1, 0.2, 0.3, 0.4, 0.5]), T1 = ri(6, 18) * 5, T2 = ri(2, 6) * 5, Tf = sig((m1 * T1 + m2 * T2) / (m1 + m2));
      return { q: T`${Q(m1, 'kg')} of water at ${Q(T1, '°C')} is poured into ${Q(m2, 'kg')} of water at ${Q(T2, '°C')} in an insulated flask. What is the final temperature?`, a: Tf, u: '°C', w: [sig((T1 + T2) / 2), sig((m2 * T1 + m1 * T2) / (m1 + m2)), T1 - T2],
        s: T`Heat lost = heat gained, and $c$ cancels: $${M(m1)}(${T1} - T) = ${M(m2)}(T - ${T2})$, so $T = \frac{${M(m1)} \cdot ${T1} + ${M(m2)} \cdot ${T2}}{${M(m1 + m2)}} = ${QT(Tf, '°C')}$.` };
    },
    () => {
      const [mat, c] = pick(MATS().slice(1)), m1 = pick([0.1, 0.2, 0.5]), T1 = ri(8, 20) * 5, m2 = pick([0.2, 0.3, 0.4, 0.5]), T2 = ri(4, 6) * 5, cw = 4200;
      const Tf = sig((m1 * c * T1 + m2 * cw * T2) / (m1 * c + m2 * cw));
      return { q: T`A ${Q(m1, 'kg')} block of ${mat} (${Q(c, 'J/(kg\\,{}^\\circ C)')}) at ${Q(T1, '°C')} is dropped into ${Q(m2, 'kg')} of water ($4200\,\mathrm{J/(kg\,{}^\circ C)}$) at ${Q(T2, '°C')}. Ignoring heat lost to the surroundings, what is the final temperature?`,
        a: Tf, u: '°C', w: [sig((m1 * T1 + m2 * T2) / (m1 + m2)), sig((T1 + T2) / 2), sig(T2 + (T1 - T2) * m1 / (m1 + m2))],
        s: T`$m_1 c_1 (T_1 - T) = m_2 c_w (T - T_2)$ gives $T = \frac{m_1 c_1 T_1 + m_2 c_w T_2}{m_1 c_1 + m_2 c_w} = \frac{${M(sig(m1 * c * T1, 6))} + ${M(sig(m2 * cw * T2, 6))}}{${M(sig(m1 * c, 6))} + ${M(sig(m2 * cw, 6))}} \approx ${QT(Tf, '°C')}$.` };
    },
    () => {
      const [mat, al] = pick([[T`steel`, 1.2e-5], [T`aluminium`, 2.4e-5], [T`copper`, 1.7e-5], [T`brass`, 1.9e-5]]), L0 = ri(2, 50), dT = ri(2, 12) * 5, dL = sig(al * L0 * dT * 1000, 4);
      return { q: T`A ${mat} rod is ${Q(L0, 'm')} long at room temperature. By how many millimetres does it lengthen when heated by ${Q(dT, '°C')}? ($\alpha = ${sciT(al)}\,/{}^\circ\mathrm{C}$.)`, a: dL, u: 'mm', w: [sig(dL / 1000, 4), sig(dL * 10, 4), sig(dL * 3, 4)],
        s: T`$\Delta L = \alpha L_0 \Delta T = ${sciT(al)} \cdot ${L0} \cdot ${dT} = ${sciT(al * L0 * dT)}\,\mathrm{m} = ${QT(dL, 'mm')}$.` };
    },
    () => {
      const k = pick([0, 1]);
      if (k === 0) return { q: T`Ice at $0^\circ\mathrm{C}$ is heated steadily and starts to melt. What happens to its temperature while it is melting?`, a: T`It stays at $0^\circ\mathrm{C}$ until all the ice has melted`, w: [T`It rises steadily`, T`It falls`, T`It jumps straight to $100^\circ\mathrm{C}$`], only: 'mc', s: T`During a change of state the heat goes into breaking the bonds between particles (latent heat), not into raising the temperature.` };
      return { q: T`A large bath of warm water and a cup of boiling water are compared. Which statement is correct?`, a: T`The cup is at a higher temperature, but the bath can hold more heat energy`, w: [T`The bath is at a higher temperature because it is bigger`, T`They contain the same amount of heat`, T`Temperature and heat mean the same thing`], only: 'mc', s: T`Temperature measures how hot something is; the total thermal energy also depends on how much material there is. A large mass of warm water can store more energy than a small mass of very hot water.` };
    },
  ],
},
/* ------------------------------------------------------------------ */
{
  id: 'gases', stage: 'sh', title: 'Kinetic Theory & Ideal Gases',
  blurb: 'Boyle’s, Charles’s and Gay-Lussac’s laws, the ideal gas equation, moles, and the kinetic energy and speed of gas molecules.',
  lesson: () => T`
<p>A gas is made of a huge number of molecules moving randomly and colliding with each other and the walls of their container. The collisions with the walls cause the gas <b>pressure</b>.</p>
<h3>The gas laws</h3>
<ul><li><b>Boyle's law</b> (constant temperature): $p_1 V_1 = p_2 V_2$. Squeeze a gas into half the volume and its pressure doubles.</li><li><b>Charles's law</b> (constant pressure): $\dfrac{V_1}{T_1} = \dfrac{V_2}{T_2}$.</li><li><b>Gay-Lussac's law</b> (constant volume): $\dfrac{p_1}{T_1} = \dfrac{p_2}{T_2}$.</li></ul>
${Key(T`<p>All three combine into the <b>ideal gas equation</b>:</p><p>$$pV = nRT, \qquad R = 8.31\,\mathrm{J/(mol\,K)},$$</p><p>where $n$ is the number of moles and $T$ the <b>absolute temperature in kelvin</b>. For a fixed amount of gas, $\dfrac{p_1 V_1}{T_1} = \dfrac{p_2 V_2}{T_2}$.</p>`)}
<h3>Kinetic theory</h3>
<p>The temperature of a gas measures the average kinetic energy of its molecules:</p>
${Fm(T`\bar{E}_k = \tfrac32 k T, \qquad k = 1.38 \times 10^{-23}\,\mathrm{J/K}`)}
<p>The typical (root-mean-square) speed of molecules of molar mass $M$ (in $\mathrm{kg/mol}$) is $v_{\text{rms}} = \sqrt{\dfrac{3RT}{M}}$: lighter molecules move faster at the same temperature.</p>
${Tip(T`<p>Always use kelvin in the gas laws. Doubling the temperature from $20^\circ\mathrm{C}$ to $40^\circ\mathrm{C}$ does <i>not</i> double the absolute temperature: $293\,\mathrm{K} \to 313\,\mathrm{K}$.</p>`)}`,
  gens: [
    () => {
      const p1 = ri(1, 5) * 100, V1 = ri(2, 20), V2 = ri(1, V1 - 1) || 1, p2 = sig(p1 * V1 / V2);
      return { q: T`A gas at ${Q(p1, 'kPa')} occupies ${Q(V1, 'L')}. It is compressed at constant temperature to ${Q(V2, 'L')}. What is its new pressure?`, a: p2, u: 'kPa', w: [sig(p1 * V2 / V1), sig(p1 + V1 - V2), sig(p1 * V1 * V2 / 10)],
        s: T`Boyle's law: $p_2 = \frac{p_1 V_1}{V_2} = \frac{${p1} \cdot ${V1}}{${V2}} = ${QT(p2, 'kPa')}$.` };
    },
    () => {
      const V1 = ri(2, 20), t1 = ri(0, 40), t2 = t1 + ri(20, 150), V2 = sig(V1 * (t2 + 273) / (t1 + 273));
      return { q: T`A balloon holds ${Q(V1, 'L')} of gas at ${Q(t1, '°C')}. At constant pressure it is heated to ${Q(t2, '°C')}. What is its new volume?`, a: V2, u: 'L', w: [sig(V1 * t2 / (t1 || 1)), sig(V1 * (t1 + 273) / (t2 + 273)), V1],
        s: T`In kelvin: $T_1 = ${t1 + 273}\,\mathrm{K}$, $T_2 = ${t2 + 273}\,\mathrm{K}$. Charles's law: $V_2 = V_1 \frac{T_2}{T_1} = ${V1} \cdot \frac{${t2 + 273}}{${t1 + 273}} = ${QT(V2, 'L')}$.` };
    },
    () => {
      const p1 = ri(180, 250), t1 = ri(10, 30), t2 = t1 + ri(10, 40), p2 = sig(p1 * (t2 + 273) / (t1 + 273));
      return { q: T`A car tyre is at ${Q(p1, 'kPa')} and ${Q(t1, '°C')}. After a long drive the air in it is at ${Q(t2, '°C')}. Assuming the volume stays the same, what is the new pressure?`, a: p2, u: 'kPa', w: [sig(p1 * t2 / t1), p1, sig(p1 * (t1 + 273) / (t2 + 273))],
        s: T`$\frac{p_1}{T_1} = \frac{p_2}{T_2}$ with kelvin: $p_2 = ${p1} \cdot \frac{${t2 + 273}}{${t1 + 273}} = ${QT(p2, 'kPa')}$.` };
    },
    () => {
      const n = ri(1, 20) / 2, t = ri(0, 50), V = pick([0.01, 0.02, 0.025, 0.05, 0.1]), p = sig(n * 8.31 * (t + 273) / V);
      return { q: T`What is the pressure of ${NUM(n)} mol of an ideal gas in a ${Q(V * 1000, 'L')} container at ${Q(t, '°C')}? ($R = 8.31\,\mathrm{J/(mol\,K)}$.)`, a: sig(p / 1000), u: 'kPa', w: [sig(n * 8.31 * t / V / 1000), sig(p / 1e6), sig(n * 8.31 * (t + 273) / (V * 1000) / 1000)],
        s: T`$V = ${M(V)}\,\mathrm{m^3}$ and $T = ${t + 273}\,\mathrm{K}$, so $p = \frac{nRT}{V} = \frac{${M(n)} \cdot 8.31 \cdot ${t + 273}}{${M(V)}} = ${M(p)}\,\mathrm{Pa} = ${QT(sig(p / 1000), 'kPa')}$.` };
    },
    () => {
      const t = ri(-50, 500), E = 1.5 * 1.38e-23 * (t + 273);
      return { q: T`What is the average kinetic energy of a molecule in a gas at ${Q(t, '°C')}? ($k = 1.38 \times 10^{-23}\,\mathrm{J/K}$.)`, a: `$${sciT(E)}\\,\\mathrm{J}$`, w: [`$${sciT(1.5 * 1.38e-23 * Math.max(t, 1))}\\,\\mathrm{J}$`, `$${sciT(E / 1.5)}\\,\\mathrm{J}$`, `$${sciT(E * 2)}\\,\\mathrm{J}$`], v: E, rtol: 0.02, h: T`Type a power of ten like 6.2e-21.`,
        s: T`$T = ${t + 273}\,\mathrm{K}$, so $\bar{E}_k = \tfrac32 kT = 1.5 \cdot 1.38 \times 10^{-23} \cdot ${t + 273} = ${sciT(E)}\,\mathrm{J}$.` };
    },
    () => {
      const [gas, Mm] = pick([[T`oxygen`, 0.032], [T`nitrogen`, 0.028], [T`helium`, 0.004], [T`hydrogen`, 0.002], [T`carbon dioxide`, 0.044]]), t = ri(0, 100), v = sig(Math.sqrt(3 * 8.31 * (t + 273) / Mm));
      return { q: T`What is the rms speed of ${gas} molecules (molar mass ${Q(Mm, 'kg/mol')}) at ${Q(t, '°C')}? ($R = 8.31\,\mathrm{J/(mol\,K)}$.)`, a: v, u: 'm/s', w: [sig(Math.sqrt(3 * 8.31 * (t + 273) / (Mm * 1000))), sig(Math.sqrt(8.31 * (t + 273) / Mm)), sig(Math.sqrt(3 * 8.31 * Math.max(t, 1) / Mm))],
        s: T`$v_{\text{rms}} = \sqrt{\frac{3RT}{M}} = \sqrt{\frac{3 \cdot 8.31 \cdot ${t + 273}}{${M(Mm)}}} = ${QT(v, 'm/s')}$.` };
    },
    () => ({ q: T`The absolute temperature of a gas is doubled. What happens to the average kinetic energy of its molecules?`, a: T`It doubles`, w: [T`It becomes four times as large`, T`It increases by a factor of $\sqrt2$`, T`It stays the same`], only: 'mc',
      s: T`$\bar{E}_k = \tfrac32 kT$ is proportional to the absolute temperature, so it doubles. (The rms speed grows only by $\sqrt2$.)` }),
  ],
},
{
  id: 'thermo-laws', stage: 'sh', title: 'Laws of Thermodynamics & Heat Engines',
  blurb: 'Internal energy and the first law, work done by a gas, thermodynamic processes, heat engines, the Carnot limit and refrigerators.',
  lesson: () => T`
<h3>The first law</h3>
<p>The <b>internal energy</b> $U$ of a gas is the total kinetic energy of its molecules (for an ideal gas it depends only on temperature). It changes when heat flows in or when the gas does work:</p>
${Fm(T`\Delta U = Q - W`)}
<p>$Q$ is the heat added <i>to</i> the gas and $W$ the work done <i>by</i> the gas. This is conservation of energy.</p>
<h3>Work done by a gas</h3>
<p>A gas expanding at constant pressure $p$ from $V_1$ to $V_2$ does work $W = p\,\Delta V$. On a $p$–$V$ diagram, the work is the area under the curve.</p>
${Tbl([T`Process`, T`What stays fixed`, T`Consequence`], [[T`Isobaric`, T`pressure`, '$W = p\\Delta V$'], [T`Isochoric`, T`volume`, '$W = 0$, $\\Delta U = Q$'], [T`Isothermal`, T`temperature`, '$\\Delta U = 0$, $Q = W$'], [T`Adiabatic`, T`no heat flow`, '$Q = 0$, $\\Delta U = -W$']])}
${Key(T`<p>A <b>heat engine</b> takes in heat $Q_H$ from a hot source, does work $W$ and rejects heat $Q_C$ to a cold sink: $W = Q_H - Q_C$. Its efficiency is</p><p>$$\eta = \frac{W}{Q_H} = 1 - \frac{Q_C}{Q_H}.$$</p><p>No engine working between absolute temperatures $T_H$ and $T_C$ can beat the <b>Carnot efficiency</b> $\eta_{\max} = 1 - \dfrac{T_C}{T_H}$.</p>`)}
<h3>The second law and refrigerators</h3>
<p>Heat flows by itself only from hot to cold, and no engine can turn all of its heat into work. A refrigerator uses work $W$ to move heat $Q_C$ out of its cold interior; its coefficient of performance is $\mathrm{COP} = \dfrac{Q_C}{W}$.</p>
${Tip(T`<p>Watch the signs: heat <i>removed</i> from the gas makes $Q$ negative, and work done <i>on</i> the gas (compression) makes $W$ negative.</p>`)}`,
  gens: [
    () => {
      const Qh = ri(2, 50) * 100, W = ri(1, 40) * 50, dU = Qh - W;
      return { q: T`A gas absorbs ${Q(Qh, 'J')} of heat and does ${Q(W, 'J')} of work on its surroundings. What is the change in its internal energy?`, a: dU, u: 'J', w: [Qh + W, W - Qh, Qh], neg: true, s: T`$\Delta U = Q - W = ${Qh} - ${W} = ${QT(dU, 'J')}$.` };
    },
    () => {
      const p = ri(1, 5) * 100, V1 = ri(1, 10), dV = ri(1, 10), W = p * dV;
      return { q: T`A gas at a constant pressure of ${Q(p, 'kPa')} expands from ${Q(V1, 'L')} to ${Q(V1 + dV, 'L')}. How much work does it do?`, a: W, u: 'J', w: [W * 1000, p * (V1 + dV), sig(W / 1000)],
        s: T`$W = p\Delta V = ${p} \times 10^{3}\,\mathrm{Pa} \cdot ${dV} \times 10^{-3}\,\mathrm{m^3} = ${QT(W, 'J')}$.` };
    },
    () => {
      const Qh = ri(5, 50) * 100, eta = ri(10, 40), W = Qh * eta / 100, askEta = chance();
      return askEta
        ? { q: T`An engine takes in ${Q(Qh, 'J')} of heat per cycle and does ${Q(W, 'J')} of work. What is its efficiency?`, a: eta, u: '%', w: [100 - eta, sig(Qh / W), sig((Qh - W) / Qh * 100)].filter(x => x !== eta), s: T`$\eta = \frac{W}{Q_H} = \frac{${M(W)}}{${Qh}} = ${M(eta / 100)} = ${M(eta)}\%$.` }
        : { q: T`An engine with an efficiency of ${NUM(eta)}% takes in ${Q(Qh, 'J')} of heat per cycle. How much heat does it reject to the cold sink?`, a: Qh - W, u: 'J', w: [W, Qh, Qh + W], s: T`$W = \eta Q_H = ${M(W)}\,\mathrm{J}$, so $Q_C = Q_H - W = ${Qh} - ${M(W)} = ${QT(Qh - W, 'J')}$.` };
    },
    () => {
      const tH = ri(10, 60) * 10, tC = ri(0, 8) * 5, eta = sig((1 - (tC + 273) / (tH + 273)) * 100);
      return { q: T`What is the maximum possible efficiency of an engine working between ${Q(tH, '°C')} and ${Q(tC, '°C')}?`, a: eta, u: '%', w: [sig((1 - tC / tH) * 100), sig((tC + 273) / (tH + 273) * 100), sig(eta / 2)],
        s: T`Use kelvin: $T_H = ${tH + 273}\,\mathrm{K}$, $T_C = ${tC + 273}\,\mathrm{K}$. $\eta_{\max} = 1 - \frac{${tC + 273}}{${tH + 273}} = ${M(sig(eta / 100))}$, that is ${NUM(eta)}%.` };
    },
    () => {
      const W = ri(1, 20) * 50, cop = pick([2, 2.5, 3, 4, 5]), Qc = W * cop;
      return { q: T`A refrigerator with a coefficient of performance of ${NUM(cop)} uses ${Q(W, 'J')} of electrical work. How much heat does it remove from the food compartment?`, a: Qc, u: 'J', w: [sig(W / cop), W + cop, Qc + W], s: T`$\mathrm{COP} = \frac{Q_C}{W}$, so $Q_C = ${M(cop)} \cdot ${W} = ${QT(Qc, 'J')}$.` };
    },
    () => pick([
      { q: T`A gas is compressed so quickly that no heat can flow in or out. What kind of process is this, and what happens to its temperature?`, a: T`Adiabatic; its temperature rises`, w: [T`Isothermal; its temperature stays the same`, T`Adiabatic; its temperature falls`, T`Isochoric; its temperature stays the same`], only: 'mc', s: T`With $Q = 0$, $\Delta U = -W$. Compression means work is done on the gas ($W \lt 0$), so $\Delta U \gt 0$ and the temperature rises, as in a bicycle pump.` },
      { q: T`Why can no heat engine be 100% efficient?`, a: T`Some heat must always be rejected to a colder sink`, w: [T`Friction can never be removed completely`, T`Energy is destroyed inside the engine`, T`Heat engines always leak gas`], only: 'mc', s: T`The second law of thermodynamics: an engine working in a cycle must reject some heat to a cold sink, so $W \lt Q_H$ even with no friction at all.` },
    ]),
  ],
},
{
  id: 'heat-transfer', stage: 'jh', title: 'Heat Transfer: Conduction, Convection & Radiation',
  blurb: 'The three ways heat travels, the rate of conduction through a wall, radiation and the fourth-power law, and insulation.',
  lesson: () => T`
<p>Heat always flows from a hotter place to a colder one, in three different ways.</p>
<h3>Conduction</h3>
<p>In a solid, energetic particles pass energy to their neighbours. Metals conduct well because their free electrons carry energy quickly; wood, plastic, still air and wool are poor conductors, or <b>insulators</b>. The rate of heat flow through a slab of area $A$ and thickness $L$ with temperature difference $\Delta T$ is</p>
${Fm(T`P = \frac{k A \Delta T}{L}`)}
<p>where $k$ is the thermal conductivity in $\mathrm{W/(m\,K)}$ (copper about 400, glass about 0.8, air about 0.025).</p>
<h3>Convection</h3>
<p>In liquids and gases, warm fluid expands, becomes less dense and rises, while cooler fluid sinks to take its place. These <b>convection currents</b> heat a room from a heater, drive sea breezes and move the Earth's weather.</p>
<h3>Radiation</h3>
<p>Every object emits electromagnetic radiation (mostly infrared at everyday temperatures). Radiation needs no medium, which is how the Sun's heat crosses space. The power radiated is</p>
${Fm(T`P = e \sigma A T^4, \qquad \sigma = 5.67 \times 10^{-8}\,\mathrm{W/(m^2\,K^4)}`)}
<p>with $T$ in kelvin and emissivity $e$ between 0 and 1. Dull black surfaces are good emitters and good absorbers; shiny silver surfaces are poor at both.</p>
${Key(T`<p>A vacuum flask blocks all three: the vacuum between its double walls stops conduction and convection, and the silvered walls reduce radiation.</p>`)}
${Tip(T`<p>The fourth power makes radiation very sensitive to temperature: doubling the absolute temperature multiplies the radiated power by $2^4 = 16$.</p>`)}`,
  gens: [
    () => {
      const k = pick([0.8, 1.0]), A = ri(1, 6), L = pick([3, 4, 5, 6, 8]) / 1000, dT = ri(2, 10) / 2, P = sig(k * A * dT / L);
      return { q: T`A glass window has an area of ${Q(A, 'm^2')} and a thickness of ${Q(L * 1000, 'mm')}. The inside surface is ${Q(dT, '°C')} warmer than the outside surface. How much heat is conducted through it per second? (Thermal conductivity of glass: ${Q(k, 'W/(m\\,K)')}.)`,
        a: P, u: 'W', w: [sig(k * A * dT / (L * 1000)), sig(k * A * dT * L), sig(P * 2)], s: T`$L = ${M(L)}\,\mathrm{m}$, so $P = \frac{kA\Delta T}{L} = \frac{${M(k)} \cdot ${A} \cdot ${dT}}{${M(L)}} = ${QT(P, 'W')}$.` };
    },
    () => {
      const change = pick(['thick', 'area', 'dT']), f = pick([2, 3, 4]);
      return change === 'thick'
        ? { q: T`The insulation in a wall is made ${f} times thicker, with everything else unchanged. How does the rate of heat conduction change?`, a: T`It becomes ${f} times smaller`, w: [T`It becomes ${f} times larger`, T`It becomes ${f * f} times smaller`, T`It stays the same`], only: 'mc', s: T`$P = \frac{kA\Delta T}{L}$ is inversely proportional to the thickness $L$.` }
        : change === 'area'
          ? { q: T`A wall is replaced by one of the same material and thickness but ${f} times the area. How does the rate of heat conduction change?`, a: T`It becomes ${f} times larger`, w: [T`It becomes ${f} times smaller`, T`It becomes ${f * f} times larger`, T`It stays the same`], only: 'mc', s: T`$P = \frac{kA\Delta T}{L}$ is proportional to the area $A$.` }
          : { q: T`The temperature difference across a wall becomes ${f} times as large. How does the rate of heat conduction change?`, a: T`It becomes ${f} times larger`, w: [T`It becomes ${f * f} times larger`, T`It becomes ${f} times smaller`, T`It stays the same`], only: 'mc', s: T`$P = \frac{kA\Delta T}{L}$ is proportional to the temperature difference $\Delta T$.` };
    },
    () => {
      const e = pick([0.9, 0.95, 1]), A = pick([0.5, 1, 1.5, 2]), t = ri(20, 400), T0 = t + 273, P = sig(e * 5.67e-8 * A * T0 ** 4);
      return { q: T`A surface of area ${Q(A, 'm^2')} and emissivity ${NUM(e)} is at ${Q(t, '°C')}. How much power does it radiate? ($\sigma = 5.67 \times 10^{-8}\,\mathrm{W/(m^2\,K^4)}$.)`, a: P, u: 'W', w: [sig(e * 5.67e-8 * A * t ** 4), sig(P / 4), sig(e * 5.67e-8 * A * T0 ** 3)],
        s: T`$T = ${T0}\,\mathrm{K}$, so $P = e\sigma A T^4 = ${M(e)} \cdot 5.67 \times 10^{-8} \cdot ${M(A)} \cdot ${T0}^4 = ${QT(P, 'W')}$.` };
    },
    () => {
      const f = pick([2, 3, 1.5]), r = sig(f ** 4);
      return { q: T`The absolute temperature of a glowing object rises by a factor of ${NUM(f)}. By what factor does the power it radiates increase?`, a: r, w: [f, sig(f * f), sig(f ** 3)], s: T`$P \propto T^4$, so the power rises by $${M(f)}^4 = ${M(r)}$.` };
    },
    () => pick([
      { q: T`How does heat from the Sun reach the Earth?`, a: T`By radiation`, w: [T`By conduction`, T`By convection`, T`By conduction and convection together`], only: 'mc', s: T`Space is almost a vacuum, so there is nothing to conduct or carry the heat. Only electromagnetic radiation can cross it.` },
      { q: T`A metal spoon and a wooden spoon have been in the same room for hours. The metal one feels colder to touch. Why?`, a: T`Metal conducts heat away from your hand faster`, w: [T`The metal spoon is at a lower temperature`, T`Wood produces its own heat`, T`Metal radiates cold`], only: 'mc', s: T`Both are at room temperature. Metal is a good conductor, so it draws heat from your warmer hand quickly, and your skin senses that heat loss as cold.` },
      { q: T`Why is a room heater usually placed low down, near the floor?`, a: T`Warm air rises, setting up convection currents that circulate through the room`, w: [T`Heat can only travel downwards`, T`The floor conducts heat around the room`, T`Radiation only works near the floor`], only: 'mc', s: T`Air warmed by the heater becomes less dense and rises; cooler air sinks and flows in to be heated. The whole room is warmed by this convection current.` },
    ]),
  ],
},
  ],
});
})();
