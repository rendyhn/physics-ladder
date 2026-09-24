/* ==========================================================================
   TRACK G — Modern Physics
   ========================================================================== */
level({
  id: 'modern', mark: 'G', name: 'Modern Physics', short: 'Modern', band: 'Relativity · quanta · atoms · nuclei', color: 'lv7',
  blurb: 'The physics of the twentieth century: relativity, light as particles, atoms and nuclei.',
  topics: [
{
  id: 'relativity', stage: 'sh', title: 'Special Relativity',
  blurb: 'Einstein’s two postulates, the Lorentz factor, time dilation, length contraction, velocity addition and E = mc².',
  lesson: () => T`
<p>Einstein built special relativity (1905) on two <b>postulates</b>:</p>
<ol><li>The laws of physics are the same in every inertial (non-accelerating) frame of reference.</li><li>The speed of light in a vacuum, $c = 3.0 \times 10^{8}\,\mathrm{m/s}$, is the same for every observer, however fast they or the source move.</li></ol>
<p>Accepting both means that time and length depend on the observer. Everything is controlled by the <b>Lorentz factor</b></p>
${Fm(T`\gamma = \frac{1}{\sqrt{1 - v^2/c^2}}`)}
<p>which is 1 at everyday speeds and grows without limit as $v$ approaches $c$. For $v = 0.6c$, $\gamma = 1.25$; for $v = 0.8c$, $\gamma = \frac53$.</p>
${Key(T`<p><b>Time dilation:</b> a moving clock runs slow, $\Delta t = \gamma\,\Delta t_0$, where $\Delta t_0$ is the <b>proper time</b> measured by a clock at rest relative to the events.</p><p><b>Length contraction:</b> a moving object is shorter along its direction of motion, $L = \dfrac{L_0}{\gamma}$, where $L_0$ is its <b>proper length</b> (measured at rest).</p>`)}
<h3>Adding velocities</h3>
<p>Speeds do not simply add. If a spaceship moving at $v$ fires a probe forwards at $u'$ relative to itself, an observer sees the probe move at</p>
${Fm(T`u = \frac{u' + v}{1 + \dfrac{u'v}{c^2}}`)}
<p>which never exceeds $c$.</p>
<h3>Mass and energy</h3>
<p>Mass is a form of energy. An object of mass $m$ at rest has <b>rest energy</b> $E_0 = mc^2$, and its total energy when moving is $E = \gamma mc^2$, so its kinetic energy is $E_k = (\gamma - 1)mc^2$.</p>
${Tip(T`<p>Write speeds as fractions of $c$: then $v^2/c^2$ is just the square of that fraction, and $c$ cancels.</p>`)}`,
  gens: [
    () => {
      const b = pick([0.6, 0.8, 0.5, 0.9, 0.99, 0.28, 0.96]), g = sig(1 / Math.sqrt(1 - b * b));
      return { q: T`What is the Lorentz factor $\gamma$ for an object moving at $${M(b)}c$?`, a: g, w: [sig(Math.sqrt(1 - b * b)), sig(1 / (1 - b * b)), sig(1 / (1 - b))], s: T`$\gamma = \frac{1}{\sqrt{1 - ${M(b)}^2}} = \frac{1}{\sqrt{${M(sig(1 - b * b, 4))}}} = ${M(g)}$.` };
    },
    () => {
      const [b, g] = pick([[0.6, 1.25], [0.8, 5 / 3], [0.28, 25 / 24], [0.96, 25 / 7]]), t0 = pick([2, 3, 5, 6, 10, 12, 20]), t = sig(g * t0);
      return { q: T`A spaceship travels at $${M(b)}c$. An astronaut on board measures the time between two ticks of her clock as ${Q(t0, 's')}. How long does this take according to an observer on Earth?`, a: t, u: 's', w: [sig(t0 / g), t0, sig(t0 * b)], s: T`$\gamma = \frac{1}{\sqrt{1 - ${M(b)}^2}} = ${M(sig(g))}$, so $\Delta t = \gamma\,\Delta t_0 = ${M(sig(g))} \times ${t0} = ${QT(t, 's')}$. The moving clock runs slow.` };
    },
    () => {
      const [b, g] = pick([[0.6, 1.25], [0.8, 5 / 3], [0.28, 25 / 24], [0.96, 25 / 7]]), L0 = pick([20, 50, 100, 120, 150, 200]), L = sig(L0 / g);
      return { q: T`A spaceship is ${Q(L0, 'm')} long when measured at rest. How long does it appear to an observer when it flies past at $${M(b)}c$?`, a: L, u: 'm', w: [sig(L0 * g), L0, sig(L0 * (1 - b))], s: T`$\gamma = ${M(sig(g))}$, so $L = \frac{L_0}{\gamma} = \frac{${L0}}{${M(sig(g))}} = ${QT(L, 'm')}$.` };
    },
    () => {
      const t0 = 2.2, b = pick([0.99, 0.995, 0.98, 0.95]), g = 1 / Math.sqrt(1 - b * b), t = sig(t0 * g);
      return { q: T`A muon lives for ${Q(t0, 'µs')} on average when at rest. How long does a muon moving at $${M(b)}c$ live on average, as measured from the Earth?`, a: t, u: 'µs', w: [sig(t0 / g), t0, sig(t0 * b)], s: T`$\gamma = \frac{1}{\sqrt{1 - ${M(b)}^2}} = ${M(sig(g))}$, so $\Delta t = \gamma\,\Delta t_0 = ${M(sig(g))} \times ${M(t0)} = ${QT(t, 'µs')}$. This is why muons made high in the atmosphere reach the ground.` };
    },
    () => {
      const [u1, v] = pick([[0.5, 0.5], [0.6, 0.6], [0.8, 0.5], [0.9, 0.9], [0.5, 0.75], [0.4, 0.8]]), u = sig((u1 + v) / (1 + u1 * v));
      return { q: T`A spaceship moving at $${M(v)}c$ relative to the Earth fires a probe forwards at $${M(u1)}c$ relative to the ship. How fast does the probe move relative to the Earth, as a fraction of $c$?`, a: u, w: [sig(u1 + v), sig(Math.abs(u1 - v)) || sig(u * 0.8), sig(u1 * v)], s: T`$u = \frac{u' + v}{1 + u'v/c^2} = \frac{${M(u1)} + ${M(v)}}{1 + ${M(u1)} \cdot ${M(v)}} = ${M(u)}c$, less than $c$ as it must be.` };
    },
    () => {
      const m = pick([1, 2, 5, 0.5, 10]), unit = pick(['g', 'kg']), kg = unit === 'g' ? m / 1000 : m, E = kg * 9e16;
      return { q: T`How much energy is equivalent to a mass of ${Q(m, unit)}? ($c = 3.0 \times 10^{8}\,\mathrm{m/s}$.)`, a: `$${sciT(E)}\\,\\mathrm{J}$`, w: [`$${sciT(E / 3e8)}\\,\\mathrm{J}$`, `$${sciT(E * 1000)}\\,\\mathrm{J}$`, `$${sciT(E / 1000)}\\,\\mathrm{J}$`], v: E, rtol: 0.02, h: T`Type a power of ten like 9e13.`,
        s: T`$E = mc^2 = ${M(kg)} \times (3.0 \times 10^{8})^2 = ${sciT(E)}\,\mathrm{J}$.` };
    },
    () => pick([
      { q: T`According to special relativity, which quantity is the same for all observers?`, a: T`The speed of light in a vacuum`, w: [T`The length of a moving object`, T`The time between two events`, T`The kinetic energy of an object`], only: 'mc', s: T`This is Einstein's second postulate. Lengths and times depend on the observer's motion.` },
      { q: T`Why can a spaceship with mass never reach the speed of light?`, a: T`Its energy would have to become infinite`, w: [T`Its mass would become zero`, T`Space is too empty`, T`Its engine would stop working`], only: 'mc', s: T`$E = \gamma mc^2$ and $\gamma$ grows without limit as $v \to c$, so an infinite amount of energy would be needed.` },
      { q: T`An astronaut travels at high speed to a distant star and back. Compared with her twin on Earth, she is:`, a: T`younger`, w: [T`older`, T`the same age`, T`older or younger at random`], only: 'mc', s: T`Her clock (and her body) ran slow relative to the Earth, so less time passed for her. This is the twin paradox.` },
    ]),
  ],
},
{
  id: 'photons', stage: 'sh', title: 'Photons & the Photoelectric Effect',
  blurb: 'Light as photons, E = hf, the electronvolt, the photoelectric effect, work function, stopping potential and de Broglie waves.',
  lesson: () => T`
<p>Light carries energy in tiny packets called <b>photons</b>. Planck and Einstein showed that the energy of one photon depends only on its frequency:</p>
${Fm(T`E = hf = \frac{hc}{\lambda}`)}
<p>with Planck's constant $h = 6.63 \times 10^{-34}\,\mathrm{J\,s}$. Photon energies are tiny, so they are often given in <b>electronvolts</b>: $1\,\mathrm{eV} = 1.6 \times 10^{-19}\,\mathrm{J}$, the energy an electron gains across $1\,\mathrm{V}$.</p>
<h3>The photoelectric effect</h3>
<p>Light shining on a clean metal can knock electrons out of it. The experiments showed:</p>
<ul><li>below a <b>threshold frequency</b> $f_0$ no electrons come out, however bright the light;</li><li>above it, electrons come out at once, and their maximum kinetic energy depends on the frequency, not the brightness;</li><li>brighter light gives <b>more</b> electrons, not faster ones.</li></ul>
${Key(T`<p>One photon gives all its energy to one electron. Part of it, the <b>work function</b> $\phi = hf_0$, is needed to free the electron; the rest becomes kinetic energy:</p><p>$$E_{k,\max} = hf - \phi = eV_s$$</p><p>where $V_s$ is the <b>stopping potential</b> needed to halt the fastest electrons.</p>`)}
<h3>Matter waves</h3>
<p>De Broglie suggested that particles also behave as waves, with wavelength $\lambda = \dfrac{h}{p} = \dfrac{h}{mv}$. Electron diffraction confirmed it, and electron microscopes use it to see details far smaller than light can.</p>
${Tip(T`<p>A handy shortcut: $hc = 1240\,\mathrm{eV\,nm}$ (to 3 significant figures, $1.24 \times 10^{3}$), so a photon of wavelength $\lambda$ in nm has an energy of about $\frac{1240}{\lambda}\,\mathrm{eV}$.</p>`)}`,
  gens: [
    () => {
      const nm = pick([400, 450, 500, 550, 600, 650, 700, 300, 250]), E = 6.63e-34 * 3e8 / (nm * 1e-9);
      return { q: T`What is the energy of a photon of wavelength ${Q(nm, 'nm')}, in joules? ($h = 6.63 \times 10^{-34}\,\mathrm{J\,s}$, $c = 3.0 \times 10^{8}\,\mathrm{m/s}$.)`, a: `$${sciT(E)}\\,\\mathrm{J}$`, w: [`$${sciT(E * 1e9)}\\,\\mathrm{J}$`, `$${sciT(6.63e-34 * nm * 1e-9 / 3e8)}\\,\\mathrm{J}$`, `$${sciT(E / 1.6e-19)}\\,\\mathrm{J}$`], v: sig(E), rtol: 0.02, h: T`Type a power of ten like 3.3e-19.`,
        s: T`$E = \frac{hc}{\lambda} = \frac{6.63 \times 10^{-34} \cdot 3.0 \times 10^{8}}{${nm} \times 10^{-9}} = ${sciT(E)}\,\mathrm{J}$.` };
    },
    () => {
      const nm = pick([250, 310, 400, 413, 500, 620, 700, 1240]), E = sig(1240 / nm);
      return { q: T`What is the energy of a photon of wavelength ${Q(nm, 'nm')}, in electronvolts? (Use $hc = 1240\,\mathrm{eV\,nm}$.)`, a: E, u: 'eV', w: [sig(nm / 1240), sig(E * 10), sig(1240 / nm / 1.6)], s: T`$E = \frac{hc}{\lambda} = \frac{1240}{${nm}} = ${QT(E, 'eV')}$.` };
    },
    () => {
      const [metal, phi] = pick([[T`caesium`, 2.1], [T`sodium`, 2.3], [T`potassium`, 2.2], [T`calcium`, 2.9], [T`zinc`, 4.3]]), nm = pick(phi > 4 ? [200, 220, 250] : phi > 2.5 ? [250, 300, 350] : [300, 350, 400, 420, 450]), E = 1240 / nm, K = sig(E - phi), askV = chance();
      return { q: T`Light of wavelength ${Q(nm, 'nm')} falls on ${metal}, whose work function is ${Q(phi, 'eV')}. What is ${askV ? T`the stopping potential` : T`the maximum kinetic energy of the emitted electrons, in eV`}? (Use $hc = 1240\,\mathrm{eV\,nm}$.)`, a: K, u: askV ? 'V' : 'eV', w: [sig(E + phi), sig(E), sig(phi)],
        s: T`Photon energy $E = \frac{1240}{${nm}} = ${M(sig(E))}\,\mathrm{eV}$. $E_{k,\max} = E - \phi = ${M(sig(E))} - ${M(phi)} = ${QT(K, 'eV')}$${askV ? T`, so the stopping potential is ${Q(K, 'V')}` : ''}.` };
    },
    () => {
      const [metal, phi] = pick([[T`caesium`, 2.1], [T`sodium`, 2.3], [T`potassium`, 2.2], [T`calcium`, 2.9], [T`zinc`, 4.3], [T`copper`, 4.7]]), lam = sig(1240 / phi), askF = chance(), f0 = phi * 1.6e-19 / 6.63e-34;
      return askF
        ? { q: T`The work function of ${metal} is ${Q(phi, 'eV')}. What is its threshold frequency? ($h = 6.63 \times 10^{-34}\,\mathrm{J\,s}$, $1\,\mathrm{eV} = 1.6 \times 10^{-19}\,\mathrm{J}$.)`, a: `$${sciT(f0)}\\,\\mathrm{Hz}$`, w: [`$${sciT(f0 / 10)}\\,\\mathrm{Hz}$`, `$${sciT(f0 * 10)}\\,\\mathrm{Hz}$`, `$${sciT(phi / 6.63e-34)}\\,\\mathrm{Hz}$`], v: sig(f0), rtol: 0.02, h: T`Type a power of ten like 5e14.`,
          s: T`$f_0 = \frac{\phi}{h} = \frac{${M(phi)} \times 1.6 \times 10^{-19}}{6.63 \times 10^{-34}} = ${sciT(f0)}\,\mathrm{Hz}$.` }
        : { q: T`The work function of ${metal} is ${Q(phi, 'eV')}. What is the longest wavelength of light that can release electrons from it, in nm? (Use $hc = 1240\,\mathrm{eV\,nm}$.)`, a: lam, u: 'nm', w: [sig(lam / 2), sig(phi * 1240 / 10), sig(lam * 2)], s: T`$\lambda_0 = \frac{hc}{\phi} = \frac{1240}{${M(phi)}} = ${QT(lam, 'nm')}$. Longer wavelengths have too little energy per photon.` };
    },
    () => {
      const P = pick([1, 2, 5, 10, 0.5]), nm = pick([450, 500, 550, 600, 650]), N = P * nm * 1e-9 / (6.63e-34 * 3e8);
      return { q: T`A laser emits ${Q(P, 'mW')} of light of wavelength ${Q(nm, 'nm')}. How many photons does it emit each second? ($h = 6.63 \times 10^{-34}\,\mathrm{J\,s}$, $c = 3.0 \times 10^{8}\,\mathrm{m/s}$.)`, a: `$${sciT(N / 1000)}$`, w: [`$${sciT(N)}$`, `$${sciT(N / 1e6)}$`, `$${sciT(N / 1000 / 1e9)}$`], v: sig(N / 1000), rtol: 0.02, h: T`Type a power of ten like 2.5e15.`,
        s: T`Each photon carries $E = \frac{hc}{\lambda} = ${sciT(6.63e-34 * 3e8 / (nm * 1e-9))}\,\mathrm{J}$. The number per second is $\frac{P}{E} = \frac{${M(P)} \times 10^{-3}}{${sciT(6.63e-34 * 3e8 / (nm * 1e-9))}} = ${sciT(N / 1000)}$.` };
    },
    () => {
      const v = pick([1, 2, 3, 4, 5, 7]) * 1e6, lam = 6.63e-34 / (9.11e-31 * v) * 1e9;
      return { q: T`What is the de Broglie wavelength of an electron moving at $${sciT(v)}\,\mathrm{m/s}$, in nm? ($h = 6.63 \times 10^{-34}\,\mathrm{J\,s}$, $m_e = 9.11 \times 10^{-31}\,\mathrm{kg}$.)`, a: sig(lam), u: 'nm', w: [sig(lam * 10), sig(lam / 10), sig(lam * 2)],
        s: T`$\lambda = \frac{h}{mv} = \frac{6.63 \times 10^{-34}}{9.11 \times 10^{-31} \cdot ${sciT(v)}} = ${sciT(lam * 1e-9)}\,\mathrm{m} = ${QT(sig(lam), 'nm')}$.` };
    },
    () => pick([
      { q: T`In the photoelectric effect, what happens when the light is made brighter but its frequency is kept the same?`, a: T`More electrons are emitted, with the same maximum kinetic energy`, w: [T`The electrons come out faster`, T`Fewer electrons are emitted`, T`Nothing changes at all`], only: 'mc', s: T`Brighter light means more photons, so more electrons; each photon still has the same energy $hf$, so the maximum kinetic energy is unchanged.` },
      { q: T`Light below the threshold frequency shines on a metal for a long time. What happens?`, a: T`No electrons are emitted`, w: [T`Electrons are eventually emitted`, T`Electrons are emitted only if the light is bright`, T`The metal emits photons`], only: 'mc', s: T`Each photon has too little energy to free an electron, and an electron cannot save up energy from several photons.` },
      { q: T`Which experiment shows that electrons behave as waves?`, a: T`Electron diffraction`, w: [T`The photoelectric effect`, T`Rutherford's gold-foil experiment`, T`Millikan's oil-drop experiment`], only: 'mc', s: T`A beam of electrons passing through a crystal gives a diffraction pattern, just as waves do.` },
      { q: T`Which evidence shows that light behaves as particles?`, a: T`The photoelectric effect`, w: [T`Double-slit interference`, T`Diffraction through a narrow slit`, T`Polarisation`], only: 'mc', s: T`The threshold frequency and the instant emission can only be explained if light arrives in packets of energy $hf$. Interference, diffraction and polarisation show its wave nature.` },
    ]),
  ],
},
{
  id: 'atoms', stage: 'sh', title: 'Atomic Models & Spectra',
  blurb: 'From Thomson to Rutherford to Bohr: the nucleus, energy levels of hydrogen, emission and absorption spectra.',
  lesson: () => T`
<h3>Models of the atom</h3>
${Tbl([T`Model`, T`Picture`, T`Problem`], [[T`Thomson (1897)`, T`a sphere of positive charge with electrons embedded, like raisins in a bun`, T`could not explain the gold-foil results`], [T`Rutherford (1911)`, T`a tiny, dense, positive nucleus with electrons orbiting far away`, T`orbiting electrons should radiate energy and spiral into the nucleus`], [T`Bohr (1913)`, T`electrons only in certain allowed orbits, each with a fixed energy`, T`works only for hydrogen-like atoms`]])}
<p>In Rutherford's <b>gold-foil experiment</b> most alpha particles passed straight through, but a few bounced back. So the atom is mostly empty space, with its mass and positive charge concentrated in a tiny nucleus.</p>
<h3>The Bohr model of hydrogen</h3>
${Fm(T`E_n = -\frac{13.6\,\mathrm{eV}}{n^2} \qquad r_n = n^2 \times 0.053\,\mathrm{nm}`)}
${Fig(levelsSvg(6, 3, 2, T`Energy levels of hydrogen, with an electron dropping from n = 3 to n = 2`), T`Energy levels of hydrogen (not to scale). A drop from $n = 3$ to $n = 2$ emits a red photon of $1.89\,\mathrm{eV}$.`)}
${Key(T`<p>When an electron drops from a higher level to a lower one it emits a photon with exactly the energy difference: $hf = E_{\text{upper}} - E_{\text{lower}}$. Absorbing a photon of exactly that energy lifts it back up. The energy needed to remove the electron completely from level $n$ is the <b>ionisation energy</b>, $\frac{13.6}{n^2}\,\mathrm{eV}$.</p>`)}
<p>Because only certain energy differences are possible, each element emits and absorbs only certain wavelengths: its <b>line spectrum</b>, a fingerprint used to identify elements in stars. For hydrogen, drops to $n = 1$ give the ultraviolet <b>Lyman</b> series, drops to $n = 2$ the visible <b>Balmer</b> series and drops to $n = 3$ the infrared <b>Paschen</b> series.</p>
${Tip(T`<p>Level energies are negative because the electron is bound: you have to add energy to free it. With $hc = 1240\,\mathrm{eV\,nm}$ the wavelength of a photon is $\lambda = \frac{1240}{\Delta E}$ in nm when $\Delta E$ is in eV.</p>`)}`,
  gens: [
    () => {
      const n = ri(2, 6), E = sig(-13.6 / (n * n)), ion = chance();
      return ion
        ? { q: T`How much energy is needed to ionise a hydrogen atom whose electron is in level $n = ${n}$?`, a: sig(13.6 / (n * n)), u: 'eV', w: [sig(13.6 / n), 13.6, sig(13.6 - 13.6 / (n * n))], s: T`The electron must be raised from $E_{${n}} = -\frac{13.6}{${n}^2} = ${M(E)}\,\mathrm{eV}$ to $0$, so it needs ${Q(sig(13.6 / (n * n)), 'eV')}.` }
        : { q: T`What is the energy of the electron in level $n = ${n}$ of a hydrogen atom? (Include the minus sign.)`, a: E, u: 'eV', neg: true, w: [sig(-13.6 / n), sig(13.6 / (n * n)), sig(-13.6 * n * n)], s: T`$E_n = -\frac{13.6}{n^2} = -\frac{13.6}{${n * n}} = ${QT(E, 'eV')}$.` };
    },
    () => {
      const lo = ri(1, 3), hi = ri(lo + 1, 6), dE = sig(13.6 * (1 / (lo * lo) - 1 / (hi * hi)));
      return { q: T`An electron in a hydrogen atom drops from level $n = ${hi}$ to $n = ${lo}$. What is the energy of the emitted photon?${Fig(levelsSvg(6, hi, lo, T`Hydrogen energy levels with the transition in the question`))}`, a: dE, u: 'eV', w: [sig(13.6 / (lo * lo)), sig(13.6 / (hi * hi)), sig(13.6 * (1 / (lo * lo) + 1 / (hi * hi)))],
        s: T`$\Delta E = E_{${hi}} - E_{${lo}} = -\frac{13.6}{${hi * hi}} + \frac{13.6}{${lo * lo}} = ${QT(dE, 'eV')}$.` };
    },
    () => {
      const [hi, lo] = pick([[3, 2], [4, 2], [5, 2], [2, 1], [3, 1], [4, 3]]), dE = 13.6 * (1 / (lo * lo) - 1 / (hi * hi)), lam = sig(1240 / dE);
      return { q: T`What is the wavelength of the photon emitted when a hydrogen electron drops from $n = ${hi}$ to $n = ${lo}$, in nm? (Use $hc = 1240\,\mathrm{eV\,nm}$.)`, a: lam, u: 'nm', w: [sig(1240 / (13.6 / (lo * lo))), sig(dE * 100), sig(1240 / (13.6 / (hi * hi)))],
        s: T`$\Delta E = 13.6\left(\frac{1}{${lo * lo}} - \frac{1}{${hi * hi}}\right) = ${M(sig(dE))}\,\mathrm{eV}$, so $\lambda = \frac{1240}{${M(sig(dE))}} = ${QT(lam, 'nm')}$${lo === 2 ? T` (visible light, in the Balmer series)` : lo === 1 ? T` (ultraviolet, in the Lyman series)` : T` (infrared, in the Paschen series)`}.` };
    },
    () => {
      const n = ri(2, 5), r = sig(0.053 * n * n);
      return { q: T`In the Bohr model the radius of the smallest hydrogen orbit is ${Q(0.053, 'nm')}. What is the radius of orbit $n = ${n}$?`, a: r, u: 'nm', w: [sig(0.053 * n), sig(0.053 / (n * n)), sig(0.053 * n ** 3)], s: T`$r_n = n^2 r_1 = ${n * n} \times 0.053 = ${QT(r, 'nm')}$.` };
    },
    () => {
      const n = ri(3, 6), lines = n * (n - 1) / 2;
      return { q: T`Hydrogen atoms are excited to level $n = ${n}$. As the electrons fall back to the ground state by every possible route, how many different spectral lines can be emitted?`, a: lines, rtol: 0, w: [n - 1, n, lines + n - 1], s: T`Every pair of levels gives one line: $\frac{n(n-1)}{2} = \frac{${n} \cdot ${n - 1}}{2} = ${lines}$.` };
    },
    () => pick([
      { q: T`In Rutherford's gold-foil experiment most alpha particles passed straight through the foil. What did this show?`, a: T`The atom is mostly empty space`, w: [T`The atom is a solid sphere`, T`Electrons are very heavy`, T`Alpha particles are negative`], only: 'mc', s: T`Only a tiny fraction bounced back, from a very small, dense, positive nucleus; the rest of the atom lets the particles through.` },
      { q: T`Which series of hydrogen lines lies in the visible part of the spectrum?`, a: T`Balmer`, w: [T`Lyman`, T`Paschen`, T`Brackett`], only: 'mc', s: T`Drops to $n = 2$ (the Balmer series) give visible light; drops to $n = 1$ give ultraviolet and drops to $n = 3$ give infrared.` },
      { q: T`Why does each element have its own line spectrum?`, a: T`Its atoms have their own set of energy levels`, w: [T`Its atoms have different masses`, T`Its nuclei emit light`, T`Its electrons move at different speeds`], only: 'mc', s: T`Photons are emitted with energies equal to the differences between levels, and the levels are different for every element.` },
      { q: T`What was the main problem with Rutherford's model of the atom?`, a: T`Orbiting electrons should radiate energy and spiral into the nucleus`, w: [T`It had no nucleus`, T`It could not explain the gold-foil results`, T`It put the electrons inside the nucleus`], only: 'mc', s: T`Classical physics says an accelerating charge radiates. Bohr solved this by allowing only certain stable orbits.` },
    ]),
  ],
},
{
  id: 'radioactivity', stage: 'sh', title: 'Nuclei & Radioactivity',
  blurb: 'Protons, neutrons and isotopes, alpha, beta and gamma radiation, decay equations, half-life and radiocarbon dating.',
  lesson: () => T`
<p>A nucleus contains <b>protons</b> and <b>neutrons</b> (together, <b>nucleons</b>). A nuclide is written $^{A}_{Z}\mathrm{X}$, where $Z$ is the <b>atomic number</b> (number of protons) and $A$ the <b>mass number</b> (protons + neutrons), so the number of neutrons is $N = A - Z$. <b>Isotopes</b> of an element have the same $Z$ but different $A$, for example $^{12}_{6}\mathrm{C}$ and $^{14}_{6}\mathrm{C}$.</p>
<h3>Three kinds of radiation</h3>
${Tbl([T`Radiation`, T`What it is`, T`Ionising`, T`Stopped by`], [[T`alpha, $\alpha$`, T`helium nucleus $^{4}_{2}\mathrm{He}$`, T`strongly`, T`paper or a few cm of air`], [T`beta, $\beta^-$`, T`fast electron $^{\;\,0}_{-1}\mathrm{e}$`, T`moderately`, T`a few mm of aluminium`], [T`gamma, $\gamma$`, T`high-energy photon`, T`weakly`, T`thick lead or concrete (reduced, not stopped)`]])}
${Key(T`<p>In a decay equation both $A$ and $Z$ must balance. Alpha decay lowers $A$ by 4 and $Z$ by 2; beta decay (a neutron turning into a proton) keeps $A$ and raises $Z$ by 1; gamma emission changes neither.</p><p>$$^{238}_{\;\,92}\mathrm{U} \to\, ^{234}_{\;\,90}\mathrm{Th} + {}^{4}_{2}\mathrm{He} \qquad ^{14}_{\;\,6}\mathrm{C} \to\, ^{14}_{\;\,7}\mathrm{N} + {}^{\;\,0}_{-1}\mathrm{e}$$</p>`)}
<h3>Half-life</h3>
<p>Decay is random, but a large number of nuclei decays at a predictable rate. The <b>half-life</b> $T_{1/2}$ is the time for half of the nuclei (and so half the activity) to decay:</p>
${Fm(T`N = N_0\left(\tfrac12\right)^{t/T_{1/2}}`)}
${Fig(graphSvg([...Array(41)].map((_, i) => [i / 5, 100 * 0.5 ** (i / 5)]), { xMax: 8, yMax: 100, xStep: 1, yStep: 25, xl: T`t (half-lives)`, yl: T`N (%)`, dots: false, label: T`Decay curve: the number of nuclei halves every half-life` }), T`After 1, 2, 3 half-lives, $50\%$, $25\%$, $12.5\%$ remain.`)}
${Tip(T`<p>Radiocarbon dating uses $^{14}\mathrm{C}$, with a half-life of about 5730 years. Living things keep a steady level of it; after death it decays, so the fraction left gives the age.</p>`)}`,
  gens: [
    () => {
      const [sym, Z, A] = pick([['C', 6, 14], ['O', 8, 16], ['Na', 11, 23], ['Fe', 26, 56], ['Co', 27, 60], ['Sr', 38, 90], ['I', 53, 131], ['Cs', 55, 137], ['Pb', 82, 208], ['Ra', 88, 226], ['U', 92, 235], ['U', 92, 238]]), what = pick(['n', 'p', 'nuc']);
      const a = what === 'n' ? A - Z : what === 'p' ? Z : A;
      return { q: T`How many ${what === 'n' ? T`neutrons` : what === 'p' ? T`protons` : T`nucleons`} are there in a nucleus of $^{${A}}_{${Z}}\mathrm{${sym}}$?`, a, rtol: 0, w: [A - Z, Z, A, A + Z].filter(x => x !== a),
        s: T`$Z = ${Z}$ protons, $A = ${A}$ nucleons, so $N = A - Z = ${A} - ${Z} = ${A - Z}$ neutrons.` };
    },
    () => {
      const [p, d, alpha] = pick([[['U', 92, 238], ['Th', 90, 234], 1], [['Ra', 88, 226], ['Rn', 86, 222], 1], [['Po', 84, 210], ['Pb', 82, 206], 1], [['Am', 95, 241], ['Np', 93, 237], 1], [['C', 6, 14], ['N', 7, 14], 0], [['Sr', 38, 90], ['Y', 39, 90], 0], [['Co', 27, 60], ['Ni', 28, 60], 0], [['I', 53, 131], ['Xe', 54, 131], 0]]), askA = chance();
      return { q: T`$^{${p[2]}}_{${p[1]}}\mathrm{${p[0]}}$ decays by ${alpha ? T`alpha` : T`beta`} emission into ${d[0]}. What is the ${askA ? T`mass number` : T`atomic number`} of the ${d[0]} nucleus?`, a: askA ? d[2] : d[1], rtol: 0, w: askA ? [p[2] - 2, p[2] - 4 === d[2] ? p[2] : p[2] - 4, p[2] + 1] : [p[1] - 4, p[1] + 2, alpha ? p[1] + 1 : p[1] - 1, p[1]],
        s: alpha ? T`Alpha emission removes $^{4}_{2}\mathrm{He}$: $^{${p[2]}}_{${p[1]}}\mathrm{${p[0]}} \to\, ^{${d[2]}}_{${d[1]}}\mathrm{${d[0]}} + {}^{4}_{2}\mathrm{He}$.` : T`In beta decay a neutron becomes a proton: $^{${p[2]}}_{${p[1]}}\mathrm{${p[0]}} \to\, ^{${d[2]}}_{${d[1]}}\mathrm{${d[0]}} + {}^{\;\,0}_{-1}\mathrm{e}$. $A$ is unchanged and $Z$ goes up by 1.` };
    },
    () => {
      const T12 = pick([2, 5, 8, 10, 15, 30, 6]), k = ri(1, 5), m0 = pick([80, 64, 160, 200, 320, 400, 48]), m = sig(m0 / 2 ** k, 4), unit = pick([[T`days`, 'd'], [T`hours`, 'h'], [T`years`, 'y']]), askM = chance(0.6);
      return askM
        ? { q: T`A radioactive sample contains ${Q(m0, 'g')} of an isotope with a half-life of ${T12} ${unit[0]}. How much of the isotope is left after ${T12 * k} ${unit[0]}?`, a: m, u: 'g', w: [sig(m0 / (2 * k)), sig(m / 2, 4), sig(m * 2, 4)], s: T`${T12 * k} ${unit[0]} is ${k} half-lives, so $m = ${m0} \times \left(\frac12\right)^{${k}} = ${QT(m, 'g')}$.` }
        : { q: T`The activity of a sample falls from ${Q(m0 * 10, 'Bq')} to ${Q(sig(m * 10, 4), 'Bq')} in ${T12 * k} ${unit[0]}. What is its half-life, in ${unit[0]}?`, a: T12, rtol: 0, w: [T12 * k, sig(T12 * k / 2), T12 * 2].filter(x => x !== T12), s: T`$\frac{${M(sig(m * 10, 4))}}{${m0 * 10}} = \frac{1}{${2 ** k}} = \left(\frac12\right)^{${k}}$, so ${k} half-lives passed in ${T12 * k} ${unit[0]}: $T_{1/2} = \frac{${T12 * k}}{${k}} = ${T12}$ ${unit[0]}.` };
    },
    () => {
      const k = ri(1, 4), frac = 2 ** k, age = 5730 * k;
      return { q: T`A piece of ancient wood contains $\frac{1}{${frac}}$ of the carbon-14 found in living wood. Carbon-14 has a half-life of 5730 years. How old is the wood, in years?`, a: age, rtol: 0.01, w: [5730 * frac, sig(5730 / frac), 5730 * (k + 1)], s: T`$\frac{1}{${frac}} = \left(\frac12\right)^{${k}}$, so ${k} half-lives have passed: $${k} \times 5730 = ${M(age)}$ years.` };
    },
    () => {
      const [p, d] = pick([[['U', 92, 238], ['Pb', 82, 206]], [['Th', 90, 232], ['Pb', 82, 208]], [['U', 92, 235], ['Pb', 82, 207]], [['Ra', 88, 226], ['Pb', 82, 206]]]), na = (p[2] - d[2]) / 4, nb = 2 * na - (p[1] - d[1]), askA = chance();
      return { q: T`$^{${p[2]}}_{${p[1]}}\mathrm{${p[0]}}$ decays through a series of alpha and beta decays to stable $^{${d[2]}}_{${d[1]}}\mathrm{${d[0]}}$. How many ${askA ? T`alpha` : T`beta`} decays take place?`, a: askA ? na : nb, rtol: 0, w: askA ? [nb, na * 2, p[2] - d[2]] : [na, p[1] - d[1], nb + 2],
        s: T`Only alpha decays change $A$: $\frac{${p[2]} - ${d[2]}}{4} = ${na}$ alpha decays. They lower $Z$ by $2 \times ${na} = ${2 * na}$, but $Z$ only falls by $${p[1]} - ${d[1]} = ${p[1] - d[1]}$, so there are $${2 * na} - ${p[1] - d[1]} = ${nb}$ beta decays.` };
    },
    () => pick([
      { q: T`Which type of radiation is the most penetrating?`, a: T`Gamma`, w: [T`Alpha`, T`Beta`, T`They are all the same`], only: 'mc', s: T`Gamma rays are uncharged photons and ionise weakly, so they travel furthest; thick lead or concrete is needed to reduce them.` },
      { q: T`Which type of radiation is stopped by a sheet of paper?`, a: T`Alpha`, w: [T`Beta`, T`Gamma`, T`None of them`], only: 'mc', s: T`Alpha particles are heavy and doubly charged, so they ionise strongly and lose their energy very quickly.` },
      { q: T`What are isotopes?`, a: T`Atoms with the same number of protons but different numbers of neutrons`, w: [T`Atoms with the same number of neutrons but different numbers of protons`, T`Atoms with the same mass number but different elements`, T`Atoms that have lost electrons`], only: 'mc', s: T`Isotopes are the same element (same $Z$) with different mass numbers, like carbon-12 and carbon-14.` },
      { q: T`Why is an alpha source dangerous inside the body but fairly safe outside it?`, a: T`Alpha is strongly ionising but cannot get through the skin`, w: [T`Alpha is very penetrating`, T`Alpha only affects metals`, T`Alpha is a form of light`], only: 'mc', s: T`Outside, alpha is stopped by the dead outer layer of skin. Inside, all of its strong ionisation is done to living cells.` },
    ]),
  ],
},
{
  id: 'nuclear-energy', stage: 'sh', title: 'Nuclear Energy: Fission & Fusion',
  blurb: 'Mass defect and binding energy, energy released in reactions, fission and chain reactions, nuclear reactors and fusion in the Sun.',
  lesson: () => T`
<p>A nucleus has slightly <b>less</b> mass than the protons and neutrons it is made of. This <b>mass defect</b> $\Delta m$ is the mass equivalent of the <b>binding energy</b>, the energy needed to pull the nucleus apart:</p>
${Fm(T`\Delta m = Z m_p + (A - Z) m_n - m_{\text{nucleus}} \qquad E_B = \Delta m\,c^2`)}
<p>Nuclear masses are given in <b>atomic mass units</b>, and $1\,\mathrm{u}$ is equivalent to $931.5\,\mathrm{MeV}$. Take $m_p = 1.00728\,\mathrm{u}$ and $m_n = 1.00867\,\mathrm{u}$.</p>
${Key(T`<p>The <b>binding energy per nucleon</b> measures how stable a nucleus is. It peaks near iron-56 (about $8.8\,\mathrm{MeV}$). Energy is released when light nuclei join (<b>fusion</b>) or heavy nuclei split (<b>fission</b>), because the products are more tightly bound. The energy released in a reaction is</p><p>$$Q = (m_{\text{before}} - m_{\text{after}}) \times 931.5\,\mathrm{MeV/u}.$$</p>`)}
<h3>Fission</h3>
<p>A slow neutron absorbed by uranium-235 makes it split into two smaller nuclei and 2 or 3 new neutrons, releasing about $200\,\mathrm{MeV}$. The new neutrons can split further nuclei: a <b>chain reaction</b>. In a reactor:</p>
<ul><li>the <b>moderator</b> (water or graphite) slows the neutrons so that they cause fission more easily;</li><li><b>control rods</b> (boron or cadmium) absorb neutrons so that, on average, each fission causes exactly one more;</li><li>the <b>coolant</b> carries the heat to make steam for the turbines;</li><li>thick concrete <b>shielding</b> absorbs the radiation.</li></ul>
<h3>Fusion</h3>
<p>In the Sun, hydrogen nuclei fuse into helium at about 15 million kelvin; only at such temperatures do nuclei move fast enough to overcome their electric repulsion. Fusion fuel is plentiful and leaves little long-lived waste, but a practical fusion power station has not yet been built.</p>
${Tip(T`<p>Keep many decimal places when subtracting masses: the mass defect is a small difference between large numbers.</p>`)}`,
  gens: [
    () => {
      const [name, sym, Z, A, m] = pick([[T`helium-4`, 'He', 2, 4, 4.00151], [T`deuterium`, 'H', 1, 2, 2.01355], [T`lithium-7`, 'Li', 3, 7, 7.01436], [T`carbon-12`, 'C', 6, 12, 11.99671], [T`oxygen-16`, 'O', 8, 16, 15.99053]]), dm = Z * 1.00728 + (A - Z) * 1.00867 - m, E = sig(dm * 931.5), what = pick(['dm', 'E', 'per']);
      const q0 = T`A ${name} nucleus ($^{${A}}_{${Z}}\mathrm{${sym}}$) has a mass of ${Q(m, 'u')}. ($m_p = 1.00728\,\mathrm{u}$, $m_n = 1.00867\,\mathrm{u}$, $1\,\mathrm{u} = 931.5\,\mathrm{MeV}$.)`;
      const sdm = T`$\Delta m = ${Z}(1.00728) + ${A - Z}(1.00867) - ${M(m)} = ${M(sig(dm, 4))}\,\mathrm{u}$.`;
      return what === 'dm'
        ? { q: T`${q0} What is its mass defect, in u?`, a: sig(dm, 3), u: 'u', w: [sig(dm * 10, 3), sig(Z * 1.00728 + (A - Z) * 1.00867, 4), sig(dm / A, 3)], s: sdm }
        : what === 'E'
          ? { q: T`${q0} What is its binding energy, in MeV?`, a: E, u: 'MeV', rtol: 0.02, w: [sig(E / A), sig(dm * 931.5 * 10), sig(E * 2)], s: T`${sdm} $E_B = ${M(sig(dm, 4))} \times 931.5 = ${QT(E, 'MeV')}$.` }
          : { q: T`${q0} What is its binding energy per nucleon, in MeV?`, a: sig(dm * 931.5 / A), u: 'MeV', rtol: 0.02, w: [E, sig(dm * 931.5 / Z), sig(dm * 931.5 / A / 2)], s: T`${sdm} $E_B = ${M(E)}\,\mathrm{MeV}$, and per nucleon $\frac{${M(E)}}{${A}} = ${QT(sig(dm * 931.5 / A), 'MeV')}$.` };
    },
    () => {
      const [eq, mb, ma] = pick([
        [`^{2}_{1}\\mathrm{H} + {}^{3}_{1}\\mathrm{H} \\to\\, ^{4}_{2}\\mathrm{He} + {}^{1}_{0}\\mathrm{n}`, [2.01410, 3.01605], [4.00260, 1.00867]],
        [`^{2}_{1}\\mathrm{H} + {}^{2}_{1}\\mathrm{H} \\to\\, ^{3}_{2}\\mathrm{He} + {}^{1}_{0}\\mathrm{n}`, [2.01410, 2.01410], [3.01603, 1.00867]],
        [`^{2}_{1}\\mathrm{H} + {}^{2}_{1}\\mathrm{H} \\to\\, ^{3}_{1}\\mathrm{H} + {}^{1}_{1}\\mathrm{H}`, [2.01410, 2.01410], [3.01605, 1.00783]],
        [`^{7}_{3}\\mathrm{Li} + {}^{1}_{1}\\mathrm{H} \\to 2\\,^{4}_{2}\\mathrm{He}`, [7.01600, 1.00783], [4.00260, 4.00260]],
      ]), dm = mb[0] + mb[1] - ma[0] - ma[1], Qv = sig(dm * 931.5);
      return { q: T`Find the energy released in the reaction $${eq}$, in MeV. The masses before are ${Q(mb[0], 'u')} and ${Q(mb[1], 'u')}; after, ${Q(ma[0], 'u')} and ${Q(ma[1], 'u')}. ($1\,\mathrm{u} = 931.5\,\mathrm{MeV}$.)`, a: Qv, u: 'MeV', rtol: 0.02, w: [sig(Qv * 10), sig(Qv / 2), sig(dm * 1000)],
        s: T`$\Delta m = (${M(mb[0])} + ${M(mb[1])}) - (${M(ma[0])} + ${M(ma[1])}) = ${M(sig(dm, 4))}\,\mathrm{u}$, so $Q = ${M(sig(dm, 4))} \times 931.5 = ${QT(Qv, 'MeV')}$.` };
    },
    () => {
      const P = pick([100, 300, 500, 1000, 1200]), N = P * 1e6 / (200e6 * 1.6e-19);
      return { q: T`Each fission of uranium-235 releases about ${Q(200, 'MeV')}. How many fissions per second are needed to produce ${Q(P, 'MW')} of power? ($1\,\mathrm{eV} = 1.6 \times 10^{-19}\,\mathrm{J}$.)`, a: `$${sciT(N)}$`, w: [`$${sciT(N / 1e6)}$`, `$${sciT(P * 1e6 / 200e6)}$`, `$${sciT(N * 10)}$`], v: sig(N), rtol: 0.02, h: T`Type a power of ten like 3.1e19.`,
        s: T`One fission gives $200 \times 10^{6} \times 1.6 \times 10^{-19} = 3.2 \times 10^{-11}\,\mathrm{J}$. Then $N = \frac{${P} \times 10^{6}}{3.2 \times 10^{-11}} = ${sciT(N)}$ fissions per second.` };
    },
    () => {
      const P = pick([500, 1000, 1500, 2000]), days = pick([1, 30, 365]), E = P * 1e6 * days * 86400, mg = E / 9e16 * 1000;
      return { q: T`A power station produces ${Q(P, 'MW')} of electrical and heat output for ${days === 1 ? T`one day` : days === 30 ? T`30 days` : T`one year (365 days)`}. How much mass is converted into energy, in grams? ($c = 3.0 \times 10^{8}\,\mathrm{m/s}$.)`, a: sig(mg), u: 'g', w: [sig(mg * 1000), sig(mg / 1000), sig(mg * 10)],
        s: T`$E = Pt = ${P} \times 10^{6} \times ${M(days * 86400)} = ${sciT(E)}\,\mathrm{J}$, so $m = \frac{E}{c^2} = \frac{${sciT(E)}}{9 \times 10^{16}} = ${sciT(E / 9e16)}\,\mathrm{kg} = ${QT(sig(mg), 'g')}$.` };
    },
    () => pick([
      { q: T`What is the job of the control rods in a nuclear reactor?`, a: T`To absorb neutrons and control the rate of fission`, w: [T`To slow the neutrons down`, T`To carry heat away`, T`To stop gamma rays escaping`], only: 'mc', s: T`Control rods (boron or cadmium) absorb neutrons. Lowering them slows the chain reaction; raising them speeds it up.` },
      { q: T`What is the job of the moderator in a nuclear reactor?`, a: T`To slow the neutrons down`, w: [T`To absorb all the neutrons`, T`To cool the turbines`, T`To make the uranium radioactive`], only: 'mc', s: T`Slow neutrons are much more likely to cause U-235 to split. Water or graphite slow them through collisions.` },
      { q: T`What is the main source of the Sun's energy?`, a: T`Fusion of hydrogen into helium`, w: [T`Fission of uranium`, T`Burning of hydrogen gas`, T`Radioactive decay of carbon`], only: 'mc', s: T`In the Sun's core hydrogen nuclei fuse into helium; the lost mass appears as energy, $E = \Delta m c^2$.` },
      { q: T`Why does fusion need extremely high temperatures?`, a: T`So that nuclei move fast enough to overcome their electric repulsion`, w: [T`To melt the fuel`, T`To produce neutrons`, T`To start a chemical reaction`], only: 'mc', s: T`Nuclei are all positive and repel each other. Only at millions of kelvin do they collide hard enough to get close and fuse.` },
      { q: T`Which nuclei release energy when they split?`, a: T`Very heavy nuclei, such as uranium`, w: [T`Very light nuclei, such as hydrogen`, T`Nuclei near iron`, T`All nuclei`], only: 'mc', s: T`Binding energy per nucleon peaks near iron. Heavy nuclei become more tightly bound by splitting, light ones by fusing.` },
    ]),
  ],
},
  ],
});
