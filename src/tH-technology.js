/* ==========================================================================
   TRACK H — Physics & Technology
   ========================================================================== */
level({
  id: 'technology', mark: 'H', name: 'Physics & Technology', short: 'Technology', band: 'Energy · climate · electronics', color: 'lv8',
  blurb: 'Physics at work in the world around us: energy sources, the climate, and electronics.',
  topics: [
{
  id: 'renewables', stage: 'sh', title: 'Renewable & Alternative Energy',
  blurb: 'Energy resources, efficiency, and the physics of solar panels, wind turbines, hydroelectric and geothermal power.',
  lesson: () => T`
<p><b>Non-renewable</b> resources (coal, oil, natural gas, uranium) will run out, and burning fossil fuels releases carbon dioxide. <b>Renewable</b> resources are replaced naturally: sunlight, wind, flowing water, geothermal heat, waves, tides and biomass. Indonesia has some of the world's largest geothermal reserves and plenty of sunshine and rivers.</p>
${Key(T`<p>No device turns all of its input into useful output. The <b>efficiency</b> is</p><p>$$\eta = \frac{\text{useful output}}{\text{total input}} \times 100\%.$$</p>`)}
${Fig(barModelSvg([['20%', 20, 'mf-s2l'], [T`heat 80%`, 80, 'mf-s4l']], { top: T`sunlight on the panel: 100%`, bottom: T`electricity 20% · heat 80%`, label: T`Bar showing a solar panel turning 20 percent of the sunlight into electricity and 80 percent into heat` }), T`A typical solar panel: about 20% of the sunlight becomes electricity; the rest warms the panel. Efficiency = useful output ÷ input.`)}
<h3>Solar power</h3>
<p>Photovoltaic (solar) cells turn light directly into electricity. On a clear day about $1000\,\mathrm{W/m^2}$ of sunlight reaches the ground, and typical panels are 15–22% efficient, so the output is $P = \eta\, I A$ for intensity $I$ and area $A$.</p>
<h3>Wind power</h3>
<p>The kinetic energy of the air passing through the blades each second is</p>
${Fm(T`P = \tfrac12 \rho A v^3`)}
<p>where $\rho \approx 1.2\,\mathrm{kg/m^3}$ is the density of air and $A = \pi r^2$ the area swept by blades of length $r$. Doubling the wind speed gives $2^3 = 8$ times the power. No turbine can extract more than about 59% of this (the Betz limit).</p>
${Fig(planeSvg({ W: 340, H: 220, x: [0, 13], y: [0, 7], step: [1, 1], tickX: 2, xl: 'v (m/s)', yl: 'P (MW)', fns: [{ f: v => 0.5 * 1.2 * Math.PI * 1600 * v ** 3 / 1e6, to: 12.6 }], pts: [[5, 0.5 * 1.2 * Math.PI * 1600 * 125 / 1e6, '5 m/s', 'end', false, 8, -6], [10, 0.5 * 1.2 * Math.PI * 1600 * 1000 / 1e6, '10 m/s: ×8', 'end', false, 8, -6]], label: T`Wind power through 40 metre blades rising with the cube of wind speed` }), T`Power in the wind through blades $40\,\mathrm{m}$ long: doubling the wind from $5$ to $10\,\mathrm{m/s}$ gives 8 times the power (about $0.38$ to $3.0\,\mathrm{MW}$, before efficiency).`)}
<h3>Hydroelectric and geothermal power</h3>
<p>Water falling through a height $h$ turns turbines. With a flow of volume $Q$ each second, the power is $P = \eta \rho Q g h$ (for water $\rho = 1000\,\mathrm{kg/m^3}$). Geothermal plants use steam from hot rocks underground to drive turbines.</p>
${Tip(T`<p>Electricity is sold in kilowatt-hours: $1\,\mathrm{kWh} = 1000\,\mathrm{W} \times 3600\,\mathrm{s}$, which is $3.6 \times 10^{6}\,\mathrm{J}$. Power in kW times hours gives kWh.</p>`)}`,
  gens: [
    () => {
      const A = pick([1.5, 1.6, 2, 10, 20, 25]), eta = pick([15, 18, 20, 22]), I = pick([800, 1000]), P = sig(eta / 100 * I * A);
      return { q: T`Sunlight of intensity ${Q(I, 'W/m^2')} falls on a solar panel of area ${Q(A, 'm^2')} with an efficiency of ${Q(eta, '%')}. What is its electrical power output?`, a: P, u: 'W', w: [sig(I * A), sig(eta * I * A), sig(I * A / eta)], s: T`$P = \eta I A = ${M(eta / 100)} \times ${I} \times ${M(A)} = ${QT(P, 'W')}$.` };
    },
    () => {
      const P = pick([1, 2, 3, 5]), eta = pick([16, 20, 25]), A = sig(P * 1000 / (eta / 100 * 1000));
      return { q: T`A house needs ${Q(P, 'kW')} from solar panels that are ${Q(eta, '%')} efficient, in sunlight of ${Q(1000, 'W/m^2')}. What area of panels is needed?`, a: A, u: 'm²', w: [sig(P), sig(P * eta / 100), sig(A * 10)], s: T`$A = \frac{P}{\eta I} = \frac{${P * 1000}}{${M(eta / 100)} \times 1000} = ${QT(A, 'm^2')}$.` };
    },
    () => {
      const r = pick([20, 30, 40, 50]), v = pick([6, 8, 10, 12]), eta = pick([30, 40, 45]), Pin = 0.5 * 1.2 * Math.PI * r * r * v ** 3, P = sig(eta / 100 * Pin / 1e6);
      return { q: T`A wind turbine has blades ${Q(r, 'm')} long. The wind blows at ${Q(v, 'm/s')} and the turbine turns ${Q(eta, '%')} of the wind's power into electricity. What is its electrical output, in MW? (Density of air ${Q(1.2, 'kg/m^3')}.)`, a: P, u: 'MW', w: [sig(Pin / 1e6), sig(eta / 100 * 0.5 * 1.2 * Math.PI * r * r * v * v / 1e6), sig(P * 4)],
        s: T`$A = \pi r^2 = ${M(sig(Math.PI * r * r))}\,\mathrm{m^2}$; $P_{\text{wind}} = \tfrac12 \rho A v^3 = \tfrac12 \cdot 1.2 \cdot ${M(sig(Math.PI * r * r))} \cdot ${v}^3 = ${sciT(Pin)}\,\mathrm{W}$. Output $= ${M(eta / 100)} \times ${sciT(Pin)} = ${QT(P, 'MW')}$.` };
    },
    () => {
      const k = pick([2, 3, 0.5]), f = sig(k ** 3);
      return { q: T`The wind speed at a turbine ${k === 0.5 ? T`halves` : k === 2 ? T`doubles` : T`triples`}. By what factor does the power available in the wind change?`, a: f, w: [k, sig(k * k), sig(k ** 4)], s: T`$P \propto v^3$, so the power changes by $${M(k)}^3 = ${M(f)}$.` };
    },
    () => {
      const Qf = pick([10, 20, 50, 100, 200]), h = pick([20, 50, 80, 100, 150]), eta = pick([80, 85, 90]), g = gPick(), P = sig(eta / 100 * 1000 * Qf * g * h / 1e6);
      return { q: T`Water flows through a hydroelectric plant at ${Q(Qf, 'm^3/s')} and falls ${Q(h, 'm')}. The plant is ${Q(eta, '%')} efficient. What is its electrical output, in MW? ${gNote(g)}`, a: P, u: 'MW', w: [sig(1000 * Qf * g * h / 1e6), sig(P * 1000), sig(eta / 100 * Qf * g * h / 1e3)],
        s: T`$P = \eta \rho Q g h = ${M(eta / 100)} \times 1000 \times ${Qf} \times ${M(g)} \times ${h} = ${sciT(P * 1e6)}\,\mathrm{W} = ${QT(P, 'MW')}$.` };
    },
    () => {
      const P = pick([200, 300, 400, 550]), n = pick([4, 6, 8, 10]), hrs = pick([4, 5, 6]), kWh = sig(P * n * hrs / 1000);
      return { q: T`A roof has ${n} solar panels, each producing ${Q(P, 'W')} in full sunlight. The roof gets the equivalent of ${hrs} hours of full sunlight a day. How much energy do the panels produce each day, in kWh?`, a: kWh, u: 'kWh', w: [sig(P * n * hrs), sig(P * n / 1000), sig(kWh * 3.6)], s: T`Total power $${n} \times ${P} = ${n * P}\,\mathrm{W} = ${M(n * P / 1000)}\,\mathrm{kW}$. Energy $= ${M(n * P / 1000)} \times ${hrs} = ${QT(kWh, 'kWh')}$.` };
    },
    () => {
      const Pin = pick([200, 500, 800, 1000, 2000]), eta = pick([25, 35, 40, 60, 80, 90]), Pout = sig(Pin * eta / 100), askEta = chance();
      return askEta
        ? { q: T`A generator is supplied with ${Q(Pin, 'kW')} of power and delivers ${Q(Pout, 'kW')} of electrical power. What is its efficiency?`, a: eta, u: '%', w: [sig(100 - eta), sig(Pin / Pout * 100), sig(eta / 10)], s: T`$\eta = \frac{${M(Pout)}}{${Pin}} \times 100\% = ${M(eta)}\%$.` }
        : { q: T`A power station burns fuel at a rate of ${Q(Pin, 'MW')} and is ${Q(eta, '%')} efficient. How much power is wasted as heat?`, a: sig(Pin - Pout), u: 'MW', w: [Pout, Pin, sig(Pin * (1 + eta / 100))], s: T`Useful output $= ${M(eta / 100)} \times ${Pin} = ${QT(Pout, 'MW')}$, so ${Q(sig(Pin - Pout), 'MW')} is wasted as heat.` };
    },
    () => pick([
      { q: T`Which of these is a renewable energy resource?`, a: pick([T`Geothermal`, T`Wind`, T`Sunlight`, T`Flowing water`]), w: [T`Coal`, T`Natural gas`, T`Uranium`], only: 'mc', s: T`Renewable resources are replaced naturally as fast as we use them; fossil fuels and uranium are not.` },
      { q: T`What energy change takes place in a solar cell?`, a: T`Light energy to electrical energy`, w: [T`Heat energy to electrical energy`, T`Chemical energy to electrical energy`, T`Kinetic energy to electrical energy`], only: 'mc', s: T`Photovoltaic cells turn light directly into electricity; photons free electrons in the semiconductor.` },
      { q: T`What is a disadvantage of wind and solar power?`, a: T`Their output depends on the weather`, w: [T`They release carbon dioxide`, T`They will run out`, T`They produce radioactive waste`], only: 'mc', s: T`The wind does not always blow and the Sun does not always shine, so storage or back-up power is needed.` },
      { q: T`What energy resource does a geothermal power station use?`, a: T`Heat from hot rocks underground`, w: [T`The kinetic energy of the wind`, T`The Sun's light`, T`Burning coal`], only: 'mc', s: T`Water pumped down (or naturally present) is heated by hot rocks and returns as steam to drive turbines.` },
    ]),
  ],
},
{
  id: 'climate', stage: 'sh', title: 'Global Warming & the Greenhouse Effect',
  blurb: 'Radiation from hot bodies, Wien’s and Stefan’s laws, the Earth’s energy balance, the greenhouse effect and carbon emissions.',
  lesson: () => T`
<p>Every object radiates electromagnetic waves, and hotter objects radiate more strongly and at shorter wavelengths. Two laws describe this radiation:</p>
${Fm(T`\lambda_{\max} T = 2.9 \times 10^{-3}\,\mathrm{m\,K} \qquad P = e\sigma A T^4`)}
<p>The first is <b>Wien's law</b>: the Sun's surface at about $5800\,\mathrm{K}$ peaks in visible light (about $500\,\mathrm{nm}$), while the Earth at about $288\,\mathrm{K}$ peaks in the infrared (about $10\,\mathrm{\mu m}$). The second is the <b>Stefan–Boltzmann law</b>, with $\sigma = 5.67 \times 10^{-8}\,\mathrm{W\,m^{-2}\,K^{-4}}$ and emissivity $e$ ($e = 1$ for a perfect black body).</p>
${Fig(planeSvg({ W: 380, H: 200, x: [0.8, 4], y: [0, 1.15], grid: false, step: [1, 0.25], fmtX: v => ({ 1: '0.1 µm', 2: '1 µm', 3: '10 µm', 4: '100 µm' })[v] || '', fmtY: () => '', xl: 'λ', yl: ' ', fns: [[5800, 'mf-c4', T`Sun, 5800 K`], [288, 'mf-c1', T`Earth, 288 K`]].map(([T0, cls, lab]) => { const pk = 2.9e-3 / T0, pl = l => { const x = 1.4388e-2 / (l * T0), xp = 1.4388e-2 / (pk * T0); return (pk / l) ** 5 * (Math.exp(xp) - 1) / (Math.exp(x) - 1); }; return { f: v => pl(10 ** (v - 8)), cls, label: lab, at: Math.log10(pk) + 8, dx: 0, dy: -8, anchor: 'middle' }; }), label: T`Blackbody curves of the Sun peaking near 0.5 micrometres and the Earth near 10 micrometres, each scaled to the same height` }), T`Wien's law: the Sun (≈ 5800 K) radiates mostly visible light, the Earth (≈ 288 K) mostly infrared near $10\,\mu\mathrm{m}$. (Each curve scaled to the same height.)`)}
<h3>The Earth's energy balance</h3>
<p>The Earth absorbs sunlight and radiates infrared back to space. About 30% of the sunlight is reflected (the <b>albedo</b> $\alpha \approx 0.3$). Balancing the energy absorbed against the energy radiated gives, with the solar constant $S = 1361\,\mathrm{W/m^2}$,</p>
${Fm(T`T = \left(\frac{S(1 - \alpha)}{4\sigma}\right)^{1/4} \approx 255\,\mathrm{K}`)}
<p>That is $-18\,^\circ\mathrm{C}$, yet the average surface temperature is about $15\,^\circ\mathrm{C}$. The difference is the <b>greenhouse effect</b>.</p>
${Key(T`<p><b>Greenhouse gases</b> (water vapour, carbon dioxide, methane, nitrous oxide) let visible sunlight through but absorb the infrared radiated by the ground, and re-emit part of it back down, warming the surface. Burning fossil fuels and cutting forests have raised the CO₂ concentration from about 280 ppm before 1800 to over 420 ppm today, enhancing the effect: this is <b>global warming</b>.</p>`)}
${FigW(greenhouseSvg(), T`The greenhouse effect: sunlight passes through, the warm ground emits infrared, and greenhouse gases absorb part of it and send some back down.`)}
<p>The consequences include rising sea levels (from the thermal expansion of seawater and melting land ice), more extreme weather and changes to ecosystems and farming. Emissions are reduced by using less energy, switching to renewable sources and protecting forests.</p>
${Fig(planeSvg({ W: 380, H: 220, x: [1955, 2026], y: [300, 430], step: [10, 20], tickX: 10, fmtX: v => String(v), xl: T`year`, yl: 'CO₂ (ppm)', fns: [], pts: [[1960, 316.91], [1970, 325.68], [1980, 338.91], [1990, 354.45], [2000, 369.71], [2010, 389.9], [2020, 414.21], [2023, 421.08, '421', 'end', false, 8, -6]], extra: (X, Y) => sPline([[1960, 316.91], [1970, 325.68], [1980, 338.91], [1990, 354.45], [2000, 369.71], [2010, 389.9], [2020, 414.21], [2023, 421.08]].map(([a, b]) => [X(a), Y(b)]), 'mf-c1', ' fill="none" stroke-width="2"'), label: T`Annual mean carbon dioxide at Mauna Loa rising from about 317 ppm in 1960 to 421 ppm in 2023` }), T`Carbon dioxide in the air at Mauna Loa, Hawaii (annual means, NOAA Global Monitoring Laboratory): from about 317 ppm in 1960 to 421 ppm in 2023.`)}
${Tip(T`<p>The ozone hole is a different problem: ozone in the upper atmosphere blocks ultraviolet, and it was damaged by CFCs. It is not the main cause of global warming.</p>`)}`,
  gens: [
    () => {
      const [obj, T0] = pick([[T`the Sun's surface`, 5800], [T`a star`, 10000], [T`a red star`, 3500], [T`the filament of a lamp`, 2900], [T`the Earth's surface`, 290], [T`the human body`, 310]]), lam = 2.9e-3 / T0, inNm = lam < 3e-6;
      return { q: T`The temperature of ${obj} is about ${Q(T0, 'K')}. At what wavelength does its radiation peak, in ${inNm ? 'nm' : 'µm'}? (Wien's constant $2.9 \times 10^{-3}\,\mathrm{m\,K}$.)`, a: sig(inNm ? lam * 1e9 : lam * 1e6), u: inNm ? 'nm' : 'µm', w: inNm ? [sig(lam * 1e6), sig(lam * 1e10), sig(T0 / 2.9 / 10)] : [sig(lam * 1e9), sig(lam * 1e7), sig(lam * 1e5)],
        s: T`$\lambda_{\max} = \frac{2.9 \times 10^{-3}}{${T0}} = ${sciT(lam)}\,\mathrm{m} = ${QT(sig(inNm ? lam * 1e9 : lam * 1e6), inNm ? 'nm' : 'µm')}$${inNm ? '' : T`, in the infrared`}.` };
    },
    () => {
      const T0 = pick([300, 400, 500, 600, 1000, 1500]), I = 5.67e-8 * T0 ** 4;
      return { q: T`How much power does each square metre of a black body at ${Q(T0, 'K')} radiate? ($\sigma = 5.67 \times 10^{-8}\,\mathrm{W\,m^{-2}\,K^{-4}}$.)`, a: sig(I), u: 'W/m²', w: [sig(5.67e-8 * T0 ** 2), sig(I * 4), sig(5.67e-8 * (T0 - 273) ** 4)], s: T`$\frac{P}{A} = \sigma T^4 = 5.67 \times 10^{-8} \times ${T0}^4 = ${QT(sig(I), 'W/m^2')}$.` };
    },
    () => {
      const k = pick([2, 3, 1.5, 0.5]), f = sig(k ** 4);
      return { q: T`The absolute temperature of a hot object ${k === 2 ? T`doubles` : k === 3 ? T`triples` : k === 0.5 ? T`halves` : T`increases by 50%`}. By what factor does the power it radiates change?`, a: f, w: [k, sig(k * k), sig(k ** 3)], s: T`$P \propto T^4$, so the power changes by $${M(k)}^4 = ${M(f)}$.` };
    },
    () => {
      const a = pick([0.2, 0.25, 0.3, 0.35, 0.4]), Tk = sig((1361 * (1 - a) / (4 * 5.67e-8)) ** 0.25);
      return { q: T`Without an atmosphere, what would the average temperature of the Earth be if its albedo were ${NUM(a)}? Use $T = \left(\frac{S(1 - \alpha)}{4\sigma}\right)^{1/4}$ with $S = 1361\,\mathrm{W/m^2}$ and $\sigma = 5.67 \times 10^{-8}\,\mathrm{W\,m^{-2}\,K^{-4}}$. Give the answer in kelvin.`, a: Tk, u: 'K', rtol: 0.01, w: [sig((1361 * (1 - a) / 5.67e-8) ** 0.25), sig((1361 * a / (4 * 5.67e-8)) ** 0.25), sig(Tk - 273)],
        s: T`$T = \left(\frac{1361 \times ${M(1 - a)}}{4 \times 5.67 \times 10^{-8}}\right)^{1/4} = ${QT(Tk, 'K')}$, that is about ${Q(sig(Tk - 273, 2), '°C')}. The greenhouse effect makes the real surface warmer.` };
    },
    () => {
      const kWh = pick([100, 150, 200, 250, 300, 500]), ef = pick([0.8, 0.85, 0.7]), co2 = sig(kWh * ef);
      return { q: T`A household uses ${Q(kWh, 'kWh')} of electricity a month. If generating each kWh releases ${Q(ef, 'kg')} of CO₂, how much CO₂ does this cause per month?`, a: co2, u: 'kg', w: [sig(kWh / ef), sig(co2 * 12), sig(co2 / 10)], s: T`$${kWh} \times ${M(ef)} = ${QT(co2, 'kg')}$ of CO₂ each month (about ${Q(sig(co2 * 12 / 1000, 2), 't')} a year).` };
    },
    () => {
      const km = pick([10, 12, 15]), d = pick([1000, 2000, 5000, 10000]), co2 = sig(d / km * 2.3);
      return { q: T`A car travels ${Q(km, 'km')} on one litre of petrol, and burning a litre of petrol releases about ${Q(2.3, 'kg')} of CO₂. How much CO₂ does it release over ${Q(d, 'km')}?`, a: co2, u: 'kg', w: [sig(d * km * 2.3 / 1000), sig(d / km), sig(d * 2.3)], s: T`Fuel used $= \frac{${M(d)}}{${km}} = ${M(sig(d / km))}$ litres, so CO₂ $= ${M(sig(d / km))} \times 2.3 = ${QT(co2, 'kg')}$.` };
    },
    () => pick([
      { q: T`How do greenhouse gases warm the Earth's surface?`, a: T`They absorb infrared radiated by the Earth and send some back down`, w: [T`They absorb visible sunlight before it reaches the ground`, T`They make a hole that lets in more ultraviolet`, T`They produce heat by chemical reactions`], only: 'mc', s: T`Sunlight (mostly visible) passes through; the warm ground radiates infrared, which greenhouse gases absorb and partly re-emit downwards.` },
      { q: T`Which of these is <b>not</b> a greenhouse gas?`, a: T`Nitrogen`, w: [T`Carbon dioxide`, T`Methane`, T`Water vapour`], only: 'mc', s: T`Nitrogen and oxygen, the main gases in air, do not absorb infrared. Carbon dioxide, methane and water vapour do.` },
      { q: T`What are the two main causes of rising sea levels?`, a: T`Thermal expansion of seawater and melting land ice`, w: [T`More rain and more rivers`, T`Melting sea ice and evaporation`, T`Tides and earthquakes`], only: 'mc', s: T`Warmer water takes up more space, and melting glaciers and ice sheets add water to the sea. Melting floating sea ice barely changes the level.` },
      { q: T`In which part of the spectrum does the Earth radiate most strongly?`, a: T`Infrared`, w: [T`Visible light`, T`Ultraviolet`, T`Microwaves`], only: 'mc', s: T`By Wien's law, at about 288 K the peak is near $10\,\mathrm{\mu m}$, in the infrared.` },
    ]),
  ],
},
{
  id: 'electronics', stage: 'sh', title: 'Semiconductors & Basic Electronics',
  blurb: 'Conductors, insulators and semiconductors, doping, diodes and LEDs, rectifiers, transistors, logic gates and binary numbers.',
  lesson: () => T`
<p>Materials are grouped by how easily charge moves through them. <b>Conductors</b> (metals) have many free electrons; <b>insulators</b> have almost none. <b>Semiconductors</b> such as silicon lie in between, and their conductivity rises as they get warmer or are lit.</p>
${FigW(bandsSvg(), T`Energy bands: electrons can only conduct in the upper (conduction) band. Semiconductors have a small gap that heat, light or doping can bridge.`)}
<h3>Doping</h3>
<p>Adding a tiny amount of another element changes a semiconductor dramatically. A group V element (phosphorus, arsenic) adds spare electrons: an <b>n-type</b> semiconductor. A group III element (boron, gallium) leaves gaps called <b>holes</b> that act as positive charges: a <b>p-type</b> semiconductor.</p>
<h3>Diodes</h3>
<p>A <b>p–n junction</b> is a <b>diode</b>: it conducts in one direction only. In <b>forward bias</b> (p side positive) it conducts once the voltage exceeds about $0.7\,\mathrm{V}$ for silicon; in <b>reverse bias</b> almost no current flows. Diodes turn AC into DC (<b>rectification</b>). A <b>light-emitting diode</b> (LED) gives out light when forward biased and needs a series resistor to limit its current:</p>
${Fig(planeSvg({ W: 340, H: 210, x: [-2, 1.2], y: [-0.5, 5], step: [0.5, 1], ticks: false, xl: 'V', yl: 'I', fns: [{ f: v => (v < 0.55 ? 0 : 25 * (v - 0.55) ** 2), from: -2, to: 1.05 }], pts: [[0.7, 25 * 0.15 ** 2, '≈ 0.7 V', 'end', false, 10, -8]], texts: [[-1, 0.4, T`reverse: almost no current`, 'middle', 'mf-small'], [0.5, 4.3, T`forward`, 'end', 'mf-small']], label: T`Current-voltage graph of a silicon diode: almost no current in reverse, and a sharp rise above about 0.7 volts forward` }), T`A silicon diode: in reverse bias almost no current flows; in forward bias the current rises steeply once $V$ passes about $0.7\,\mathrm{V}$.`)}
${Fm(T`R = \frac{V_s - V_{\text{LED}}}{I}`)}
<h3>Transistors</h3>
<p>A transistor lets a small <b>base</b> current $I_B$ control a much larger <b>collector</b> current, $I_C = \beta I_B$, where $\beta$ (often 100 or more) is the current gain. Transistors work as amplifiers and as switches; a modern processor contains billions of them.</p>
<h3>Logic gates</h3>
${Tbl([T`Gate`, T`Output is 1 when…`], [[T`NOT`, T`the input is 0`], [T`AND`, T`both inputs are 1`], [T`OR`, T`at least one input is 1`], [T`NAND`, T`not both inputs are 1`], [T`NOR`, T`both inputs are 0`], [T`XOR`, T`the inputs are different`]])}
${Key(T`<p>Digital circuits work with just two states, 0 and 1. A number in <b>binary</b> uses powers of 2: $1011_2 = 8 + 0 + 2 + 1 = 11$.</p>`)}
${Tip(T`<p>Put the milliamps into amps before using $R = V/I$: $20\,\mathrm{mA} = 0.02\,\mathrm{A}$.</p>`)}`,
  gens: [
    () => {
      const Vs = pick([5, 6, 9, 12]), [col, Vl] = pick([[T`red`, 2], [T`green`, 2.2], [T`blue`, 3], [T`yellow`, 2.1]]), I = pick([10, 15, 20, 25]), R = sig((Vs - Vl) / (I / 1000));
      return { q: T`A ${col} LED needs ${Q(Vl, 'V')} across it and a current of ${Q(I, 'mA')}. What resistor should be put in series with it on a ${Q(Vs, 'V')} supply?`, a: R, u: 'Ω', w: [sig(Vs / (I / 1000)), sig((Vs - Vl) / I), sig(Vl / (I / 1000))], s: T`The resistor takes $${Vs} - ${M(Vl)} = ${M(sig(Vs - Vl))}\,\mathrm{V}$, so $R = \frac{${M(sig(Vs - Vl))}}{${M(I / 1000)}} = ${QT(R, 'Ω')}$.` };
    },
    () => {
      const b = pick([50, 100, 150, 200, 250]), Ib = pick([10, 20, 40, 50, 100]), Ic = sig(b * Ib / 1000), back = chance();
      return back
        ? { q: T`A transistor with a current gain of ${b} carries a collector current of ${Q(Ic, 'mA')}. What is the base current, in µA?`, a: Ib, u: 'µA', w: [sig(Ic * b), sig(Ib * 10), sig(Ib / 10)], s: T`$I_B = \frac{I_C}{\beta} = \frac{${M(Ic)} \times 10^{3}\,\mathrm{\mu A}}{${b}} = ${QT(Ib, 'µA')}$.` }
        : { q: T`A transistor has a current gain $\beta = ${b}$. A base current of ${Q(Ib, 'µA')} flows. What is the collector current, in mA?`, a: Ic, u: 'mA', w: [sig(Ic * 1000), sig(Ib / b), sig(Ic / 10)], s: T`$I_C = \beta I_B = ${b} \times ${Ib}\,\mathrm{\mu A} = ${M(b * Ib)}\,\mathrm{\mu A} = ${QT(Ic, 'mA')}$.` };
    },
    () => {
      const gates = { AND: (x, y) => x & y, OR: (x, y) => x | y, NAND: (x, y) => 1 - (x & y), NOR: (x, y) => 1 - (x | y), XOR: (x, y) => x ^ y }, col = g => [[0, 0], [0, 1], [1, 0], [1, 1]].map(([x, y]) => gates[g](x, y)).join(', ');
      const g = pick(Object.keys(gates)), A = ri(0, 1), B = ri(0, 1), rule = ({ AND: T`both inputs are 1`, OR: T`at least one input is 1`, NAND: T`not both inputs are 1`, NOR: T`both inputs are 0`, XOR: T`the inputs are different` })[g];
      return chance()
        ? { q: T`The inputs $(A, B)$ of the ${g} gate take the values $(0, 0)$, $(0, 1)$, $(1, 0)$ and $(1, 1)$ in turn. What are the outputs?`, a: col(g), w: Object.keys(gates).filter(k => k !== g).map(col), only: 'mc', s: T`The ${g} gate gives 1 when ${rule}, so the outputs are ${col(g)}.` }
        : { q: T`What is the output of the ${g} gate when $A = ${A}$ and $B = ${B}$?`, a: String(gates[g](A, B)), w: [String(1 - gates[g](A, B)), T`It depends on the previous output`, T`There is no output`], only: 'mc', s: T`The ${g} gate gives 1 when ${rule}. Here the output is ${gates[g](A, B)}.` };
    },
    () => {
      const bits = ri(4, 6), n = ri(2 ** (bits - 1), 2 ** bits - 1), bin = n.toString(2), toDec = chance();
      return toDec
        ? { q: T`Convert the binary number $${bin}_2$ to decimal.`, a: n, rtol: 0, w: [n + 1, n - 2, +bin.split('').reverse().join('') === 0 ? n + 4 : parseInt(bin.split('').reverse().join(''), 2)], s: T`$${bin}_2 = ${bin.split('').map((c, i) => `${c} \\cdot 2^{${bin.length - 1 - i}}`).join(' + ')} = ${n}$.` }
        : { q: T`Write the decimal number ${n} in binary.`, a: `$${bin}$`, w: [`$${(n + 1).toString(2)}$`, `$${(n - 1).toString(2)}$`, `$${bin.split('').reverse().join('') === bin || bin.endsWith('0') ? (n + 2).toString(2) : bin.split('').reverse().join('')}$`], only: 'mc', s: T`$${n} = ${bin.split('').map((c, i) => (c === '1' ? `2^{${bin.length - 1 - i}}` : null)).filter(Boolean).join(' + ')}$, so it is $${bin}_2$.` };
    },
    () => {
      const Vr = pick([6, 9, 12, 24]), V0 = Vr * Math.SQRT2, out = sig(V0 - 0.7);
      return { q: T`A transformer gives ${Q(Vr, 'V')} rms to a single silicon diode used as a half-wave rectifier. What is the peak voltage across the load, allowing ${Q(0.7, 'V')} for the diode?`, a: out, u: 'V', w: [sig(Vr - 0.7), sig(V0), sig(V0 + 0.7)], s: T`Peak input $V_0 = \sqrt2 \times ${Vr} = ${M(sig(V0))}\,\mathrm{V}$. The diode drops ${Q(0.7, 'V')}, leaving ${Q(out, 'V')}.` };
    },
    () => pick([
      { q: T`Silicon is doped with phosphorus (group V). What type of semiconductor is made?`, a: T`n-type`, w: [T`p-type`, T`an insulator`, T`a conductor`], only: 'mc', s: T`Phosphorus has one more outer electron than silicon, so it adds free electrons: negative charge carriers, n-type.` },
      { q: T`Silicon is doped with boron (group III). What are the main charge carriers?`, a: T`Holes`, w: [T`Free electrons`, T`Protons`, T`Ions`], only: 'mc', s: T`Boron has one fewer outer electron, leaving holes that behave as positive carriers: p-type.` },
      { q: T`A diode is connected in reverse bias. What happens?`, a: T`Almost no current flows`, w: [T`A large current flows`, T`It lights up`, T`It amplifies the current`], only: 'mc', s: T`In reverse bias the junction's depletion layer widens and blocks the current.` },
      { q: T`What happens to the resistance of a semiconductor when it gets warmer?`, a: T`It decreases`, w: [T`It increases`, T`It stays the same`, T`It becomes infinite`], only: 'mc', s: T`Heat frees more charge carriers, so a semiconductor conducts better. This is used in thermistors.` },
      { q: T`Which logic gate gives an output of 1 only when both inputs are 1?`, a: T`AND`, w: [T`OR`, T`NOR`, T`XOR`], only: 'mc', s: T`An AND gate needs A and B both to be 1.` },
    ]),
  ],
},
  ],
});
