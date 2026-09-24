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
{ id: 'gases', stage: 'sh', soon: true, title: 'Kinetic Theory & Ideal Gases' },
{ id: 'thermo-laws', stage: 'sh', soon: true, title: 'Laws of Thermodynamics & Heat Engines' },
{ id: 'heat-transfer', stage: 'jh', soon: true, title: 'Heat Transfer: Conduction, Convection & Radiation' },
  ],
});
})();
