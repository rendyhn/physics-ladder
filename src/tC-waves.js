/* ==========================================================================
   TRACK C — Waves & Sound
   ========================================================================== */
level({
  id: 'waves', mark: 'C', name: 'Waves & Sound', short: 'Waves', band: 'Oscillations · waves · sound', color: 'lv3',
  blurb: 'Things that repeat: oscillations, the waves they send out, and sound.',
  topics: [
{
  id: 'shm', stage: 'sh', title: 'Simple Harmonic Motion',
  blurb: 'Oscillations with a restoring force: mass on a spring, simple pendulum, period and frequency, maximum speed and energy.',
  lesson: () => T`
<p>An object oscillates in <b>simple harmonic motion</b> (SHM) when the force pulling it back to its rest position is proportional to how far it has been moved: $F = -kx$. A mass on a spring and a pendulum swinging through small angles are the classic examples.</p>
${Fig(graphSvg(Array.from({ length: 121 }, (_, i) => [i / 20, 4 * Math.cos(2 * Math.PI * i / 60)]), { xMax: 6, yMax: 5, yMin: -5, xStep: 1, yStep: 2, xl: 't (s)', yl: 'x (cm)', dots: false, label: T`Displacement against time for an oscillation with amplitude 4 cm and period 3 s` }), T`Amplitude $A = 4\,\mathrm{cm}$, period $T = 3\,\mathrm{s}$.`)}
<h3>Describing an oscillation</h3>
<ul><li><b>Amplitude</b> $A$: the largest displacement from the rest position.</li><li><b>Period</b> $T$: the time for one complete oscillation; <b>frequency</b> $f = 1/T$; <b>angular frequency</b> $\omega = 2\pi f$.</li><li>The displacement follows a sine or cosine curve: $x = A\cos(\omega t)$.</li></ul>
${FigW(oscSvg(), T`Two standard oscillators: a mass on a spring moves between $-A$ and $+A$ about its rest position; a pendulum of length $L$ swings about its lowest point.`)}
${Key(T`<p>Periods of the two standard oscillators:</p><p>$$\text{mass on a spring: } T = 2\pi\sqrt{\frac{m}{k}} \qquad \text{simple pendulum: } T = 2\pi\sqrt{\frac{L}{g}}$$</p><p>Neither depends on the amplitude. The pendulum's period does not depend on its mass either.</p>`)}
<h3>Speed, acceleration and energy</h3>
<ul><li>The speed is greatest at the centre: $v_{\max} = A\omega$. At displacement $x$: $v = \omega\sqrt{A^2 - x^2}$.</li><li>The acceleration is greatest at the ends: $a_{\max} = A\omega^2$, always pointing back to the centre.</li><li>The total energy stays constant, $E = \tfrac12 k A^2$; it changes back and forth between kinetic and potential energy.</li></ul>
${Fig(planeSvg({ W: 340, H: 210, x: [-1.25, 1.25], y: [0, 1.2], step: [0.5, 0.25], ticks: false, xl: 'x', yl: 'E', fns: [{ f: x => x * x, from: -1, to: 1, label: sub('E', 'p'), at: -0.9, dx: -4, dy: -6, anchor: 'end' }, { f: x => 1 - x * x, from: -1, to: 1, cls: 'mf-c2', label: sub('E', 'k'), at: 0, dx: 0, dy: -8, anchor: 'middle' }, { f: () => 1, from: -1, to: 1, cls: 'mf-c4', dash: true, label: T`total`, at: 1, dx: 6, dy: 4 }], texts: [[-1, -0.06, '−A', 'middle', 'mf-small'], [1, -0.06, '+A', 'middle', 'mf-small']], label: T`Energy in simple harmonic motion: kinetic energy largest at the centre, potential energy largest at the ends, total constant` }), T`In SHM energy sloshes between kinetic (largest at the centre) and potential (largest at $\pm A$); the total stays constant.`)}
${Tip(T`<p>Use SI units inside the square roots: mass in kg, length in m. A $50\,\mathrm{cm}$ pendulum has $L = 0.5\,\mathrm{m}$.</p>`)}`,
  gens: [
    () => {
      const m = pick([0.1, 0.2, 0.25, 0.4, 0.5, 1, 2]), k = ri(2, 40) * 10, T0 = sig(2 * Math.PI * Math.sqrt(m / k));
      return { q: T`A ${Q(m, 'kg')} mass hangs on a spring with $k = ${QT(k, 'N/m')}$. What is the period of its vertical oscillations?`, a: T0, u: 's', w: [sig(2 * Math.PI * Math.sqrt(k / m)), sig(Math.sqrt(m / k)), sig(2 * Math.PI * m / k)],
        s: T`$T = 2\pi\sqrt{\frac{m}{k}} = 2\pi\sqrt{\frac{${M(m)}}{${k}}} = ${QT(T0, 's')}$.` };
    },
    () => {
      const g = gPick(), L = ri(1, 40) / 10, T0 = sig(2 * Math.PI * Math.sqrt(L / g)), askL = chance();
      return askL
        ? { q: T`A pendulum clock needs a period of ${Q(T0, 's')}. How long should its pendulum be? ${gNote(g)}`, a: sig(L), u: 'm', w: [sig(g * T0 / (2 * Math.PI)), sig(L * 2), sig(Math.sqrt(L))], s: T`$T = 2\pi\sqrt{L/g}$, so $L = g\left(\frac{T}{2\pi}\right)^2 = ${M(g)}\left(\frac{${M(T0)}}{2\pi}\right)^2 = ${QT(sig(L), 'm')}$.` }
        : { q: T`What is the period of a simple pendulum ${Q(L, 'm')} long? ${gNote(g)}`, a: T0, u: 's', w: [sig(2 * Math.PI * Math.sqrt(g / L)), sig(2 * Math.PI * L / g), sig(Math.sqrt(L / g))], s: T`$T = 2\pi\sqrt{\frac{L}{g}} = 2\pi\sqrt{\frac{${M(L)}}{${M(g)}}} = ${QT(T0, 's')}$.` };
    },
    () => {
      const A = ri(2, 20) / 100, f = ri(1, 10) / 2, w = 2 * Math.PI * f, askA = chance(), v = sig(A * w), a = sig(A * w * w);
      return { q: T`An object oscillates in SHM with amplitude ${Q(A * 100, 'cm')} and frequency ${Q(f, 'Hz')}. What is its maximum ${askA ? T`acceleration` : T`speed`}?`, a: askA ? a : v, u: askA ? 'm/s²' : 'm/s', w: askA ? [v, sig(A * w * w * 100), sig(A * f * f)] : [a, sig(A * f), sig(A * w * 100)],
        s: askA ? T`$\omega = 2\pi f = ${M(sig(w))}\,\mathrm{rad/s}$, so $a_{\max} = A\omega^2 = ${M(A)} \cdot ${M(sig(w))}^2 = ${QT(a, 'm/s^2')}$.` : T`$\omega = 2\pi f = ${M(sig(w))}\,\mathrm{rad/s}$, so $v_{\max} = A\omega = ${M(A)} \cdot ${M(sig(w))} = ${QT(v, 'm/s')}$.` };
    },
    () => {
      const A = ri(5, 20), x = ri(1, A - 1), w = ri(2, 10), v = sig(w * Math.sqrt(A * A - x * x) / 100);
      return { q: T`A mass oscillates with amplitude ${Q(A, 'cm')} and angular frequency ${Q(w, 'rad/s')}. How fast is it moving when it is ${Q(x, 'cm')} from the centre?`, a: v, u: 'm/s', w: [sig(w * A / 100), sig(w * (A - x) / 100), sig(w * x / 100)],
        s: T`$v = \omega\sqrt{A^2 - x^2} = ${w}\sqrt{${M(A / 100)}^2 - ${M(x / 100)}^2} = ${QT(v, 'm/s')}$.` };
    },
    () => {
      const k = ri(2, 40) * 10, A = ri(2, 15) / 100, E = sig(0.5 * k * A * A);
      return { q: T`A spring with $k = ${QT(k, 'N/m')}$ oscillates with an amplitude of ${Q(A * 100, 'cm')}. What is the total energy of the oscillation?`, a: E, u: 'J', w: [sig(k * A * A), sig(0.5 * k * A), sig(0.5 * k * (A * 100) ** 2 / 100)],
        s: T`$E = \tfrac12 k A^2 = \tfrac12 \cdot ${k} \cdot ${M(A)}^2 = ${QT(E, 'J')}$.` };
    },
    () => pick([
      { q: T`A pendulum is set swinging with a larger amplitude (still small). What happens to its period?`, a: T`It stays the same`, w: [T`It increases`, T`It decreases`, T`It doubles`], only: 'mc', s: T`For small swings $T = 2\pi\sqrt{L/g}$, which contains no amplitude: a bigger swing covers more distance but moves faster.` },
      { q: T`A pendulum clock is taken to the Moon, where $g$ is about one sixth of its value on Earth. What happens to the period of its pendulum?`, a: T`It becomes about 2.45 times longer`, w: [T`It becomes 6 times longer`, T`It stays the same`, T`It becomes shorter`], only: 'mc', s: T`$T \propto 1/\sqrt{g}$, so dividing $g$ by 6 multiplies $T$ by $\sqrt6 \approx 2.45$. The clock runs slow.` },
      { q: T`At which point of its oscillation does a mass on a spring have its greatest speed?`, a: T`As it passes through the centre (rest position)`, w: [T`At the two ends of its motion`, T`Halfway between the centre and an end`, T`Its speed is the same everywhere`], only: 'mc', s: T`At the centre all the energy is kinetic, so the speed is greatest; at the ends the mass stops for an instant.` },
    ]),
  ],
},
{
  id: 'mech-waves', stage: 'sh', title: 'Mechanical Waves',
  blurb: 'Transverse and longitudinal waves, wavelength, frequency and wave speed, waves on strings and standing waves.',
  lesson: () => T`
<p>A <b>wave</b> carries energy from place to place without carrying the material along with it. In a mechanical wave, each particle of the medium oscillates about its own position and passes the motion on to its neighbour.</p>
<h3>Two kinds of wave</h3>
<ul><li><b>Transverse:</b> the particles move at right angles to the direction the wave travels. Waves on a string, ripples on water.</li><li><b>Longitudinal:</b> the particles move back and forth along the direction of travel, making compressions and rarefactions. Sound, a pushed slinky.</li></ul>
${Fig(waveSvg(2, 3, 5, { label: T`A transverse wave with wavelength 2 m and amplitude 3 cm` }), T`Wavelength $\lambda = 2\,\mathrm{m}$ (crest to crest), amplitude $3\,\mathrm{cm}$.`)}
${FigW(longWaveSvg(), T`A longitudinal wave, like sound: compressions (C) and rarefactions (R). One wavelength is the distance from one compression to the next.`)}
<h3>Describing a wave</h3>
<ul><li><b>Wavelength</b> $\lambda$: the length of one complete wave, for example crest to crest.</li><li><b>Frequency</b> $f$: waves passing a point per second; <b>period</b> $T = 1/f$.</li><li><b>Amplitude</b>: the largest displacement from the rest position.</li></ul>
${Key(T`<p>In one period a wave moves forward one wavelength, so its speed is</p><p>$$v = f\lambda = \frac{\lambda}{T}.$$</p><p>The speed is set by the medium; the frequency is set by the source.</p>`)}
<h3>Waves on a string and standing waves</h3>
<p>On a string with tension $F$ and mass per unit length $\mu$, $v = \sqrt{F/\mu}$. A string fixed at both ends vibrates in <b>standing waves</b> whose length fits a whole number of half-wavelengths: $L = n\frac{\lambda}{2}$, so</p>
${Fm(T`f_n = \frac{n v}{2L}, \qquad n = 1, 2, 3, \dots`)}
${FigRow([1, 2, 3].map(n => [planeSvg({ W: 200, H: 110, x: [0, 1], y: [-1.3, 1.3], grid: false, ticks: false, xl: ' ', yl: ' ', fns: [{ f: x => Math.sin(n * Math.PI * x) }, { f: x => -Math.sin(n * Math.PI * x), cls: 'mf-c2', dash: true }], label: T`Standing wave pattern with ${n} loops` }), `n = ${n}`]), T`Standing waves on a string fixed at both ends: the length holds 1, 2, 3 … half-wavelengths, giving $f_1$, $2f_1$, $3f_1$ …`)}
<p>The lowest, $f_1$, is the <b>fundamental</b>; the others are harmonics. Guitar strings are tuned by changing their tension.</p>
${Tip(T`<p>A crest and the next trough are half a wavelength apart, not a whole one.</p>`)}`,
  gens: [
    () => {
      const f = pick([2, 4, 5, 10, 20, 50, 100, 250, 500]), lam = pick([0.2, 0.5, 0.8, 1.5, 2, 3, 4]), v = sig(f * lam), ask = pick(['v', 'f', 'l']);
      if (ask === 'v') return { q: T`A wave has a frequency of ${Q(f, 'Hz')} and a wavelength of ${Q(lam, 'm')}. How fast does it travel?`, a: v, u: 'm/s', w: [sig(f / lam), sig(lam / f), sig(f * lam * 2)], s: T`$v = f\lambda = ${f} \cdot ${M(lam)} = ${QT(v, 'm/s')}$.` };
      if (ask === 'f') return { q: T`A wave travels at ${Q(v, 'm/s')} with a wavelength of ${Q(lam, 'm')}. What is its frequency?`, a: f, u: 'Hz', w: [sig(v * lam), sig(lam / v), sig(f * 2)], s: T`$f = \frac{v}{\lambda} = \frac{${M(v)}}{${M(lam)}} = ${QT(f, 'Hz')}$.` };
      return { q: T`A wave travels at ${Q(v, 'm/s')} with a frequency of ${Q(f, 'Hz')}. What is its wavelength?`, a: lam, u: 'm', w: [sig(v * f), sig(f / v), sig(lam * 2)], s: T`$\lambda = \frac{v}{f} = \frac{${M(v)}}{${f}} = ${QT(lam, 'm')}$.` };
    },
    () => {
      const lam = pick([1, 2, 4, 5]) * pick([0.5, 1, 2]), A = ri(2, 6), span = lam * 2.5, T0 = pick([0.5, 1, 2, 4]), v = sig(lam / T0), askL = chance();
      const fig = Fig(waveSvg(lam, A, span, { label: T`A snapshot of a wave on a rope`, xStep: lam / 2 }));
      return askL
        ? { q: T`The graph shows a snapshot of a wave on a rope. What is its wavelength?` + fig, a: lam, u: 'm', w: [lam / 2, lam * 2, A], s: T`One complete wave (crest to crest, or one full cycle of the curve) spans ${Q(lam, 'm')}.` }
        : { q: T`The graph shows a snapshot of a wave on a rope. Each point of the rope makes one full oscillation every ${Q(T0, 's')}. How fast does the wave travel?` + fig, a: v, u: 'm/s', w: [sig(lam * T0), sig(lam / 2 / T0), sig(A / T0)], s: T`From the graph $\lambda = ${QT(lam, 'm')}$. So $v = \frac{\lambda}{T} = \frac{${M(lam)}}{${M(T0)}} = ${QT(v, 'm/s')}$.` };
    },
    () => {
      const F = ri(2, 40) * 10, mu = pick([0.001, 0.002, 0.005, 0.01, 0.02]), v = sig(Math.sqrt(F / mu));
      return { q: T`A string with a mass of ${Q(mu * 1000, 'g')} per metre is stretched with a tension of ${Q(F, 'N')}. What is the speed of waves on it?`, a: v, u: 'm/s', w: [sig(F / mu), sig(Math.sqrt(F * mu), 3), sig(Math.sqrt(F / (mu * 1000)))],
        s: T`$\mu = ${M(mu)}\,\mathrm{kg/m}$, so $v = \sqrt{\frac{F}{\mu}} = \sqrt{\frac{${F}}{${M(mu)}}} = ${QT(v, 'm/s')}$.` };
    },
    () => {
      const L = ri(3, 12) / 10, v = ri(10, 60) * 10, n = pick([1, 1, 2, 3]), f = sig(n * v / (2 * L));
      return { q: n === 1 ? T`A guitar string ${Q(L, 'm')} long is fixed at both ends, and waves travel along it at ${Q(v, 'm/s')}. What is its fundamental frequency?` : T`A string ${Q(L, 'm')} long is fixed at both ends, and waves travel along it at ${Q(v, 'm/s')}. What is the frequency of harmonic number ${n}?`,
        a: f, u: 'Hz', w: [sig(n * v / L), sig(n * v / (4 * L)), sig(v / (2 * L))].filter(x => x !== f), s: T`$f_n = \frac{n v}{2L} = \frac{${n} \cdot ${v}}{2 \cdot ${M(L)}} = ${QT(f, 'Hz')}$.` };
    },
    () => {
      const lam = ri(2, 20) / 2, d = sig(lam / 2);
      return { q: T`A water wave has a wavelength of ${Q(lam, 'm')}. What is the horizontal distance between a crest and the next trough?`, a: d, u: 'm', w: [lam, sig(lam / 4), lam * 2], s: T`A crest and the next trough are half a wavelength apart: ${Q(d, 'm')}.` };
    },
    () => pick([
      { q: T`Which of these is a longitudinal wave?`, a: T`A sound wave in air`, w: [T`A wave on a guitar string`, T`A ripple on a pond`, T`A wave sent along a rope by shaking it sideways`], only: 'mc', s: T`In sound the air particles move back and forth along the direction the wave travels, forming compressions and rarefactions.` },
      { q: T`A wave passes from deep water into shallow water, where it travels more slowly. What stays the same?`, a: T`Its frequency`, w: [T`Its speed`, T`Its wavelength`, T`Its direction always`], only: 'mc', s: T`The frequency is set by the source and does not change. Since $v = f\lambda$, a lower speed means a shorter wavelength.` },
    ]),
  ],
},
{
  id: 'sound', stage: 'sh', title: 'Sound: Intensity, Decibels & the Doppler Effect',
  blurb: 'Speed of sound and echoes, pitch and loudness, intensity and the decibel scale, the Doppler effect and pipes.',
  lesson: () => T`
<p>Sound is a <b>longitudinal</b> mechanical wave: a travelling pattern of compressions and rarefactions. It needs a medium and cannot cross a vacuum. In air at room temperature it travels at about $340\,\mathrm{m/s}$; in water at about $1500\,\mathrm{m/s}$; in steel even faster.</p>
<h3>Echoes</h3>
<p>An echo travels to a reflecting surface and back, so the distance to the surface is $d = \dfrac{v t}{2}$. Bats, ships' sonar and ultrasound scanners all use this.</p>
<h3>Pitch and loudness</h3>
<p>The <b>pitch</b> of a sound is set by its frequency and the <b>loudness</b> mostly by its amplitude. People hear roughly $20\,\mathrm{Hz}$ to $20\,000\,\mathrm{Hz}$; above that is ultrasound, below it infrasound.</p>
${Key(T`<p>The <b>intensity</b> is the power per unit area. From a small source spreading out in all directions:</p><p>$$I = \frac{P}{4\pi r^2}.$$</p><p>Loudness is measured on the logarithmic <b>decibel</b> scale:</p><p>$$\beta = 10 \log_{10}\frac{I}{I_0}\ \mathrm{dB}, \qquad I_0 = 10^{-12}\,\mathrm{W/m^2}.$$</p><p>Every $10\,\mathrm{dB}$ more means ten times the intensity.</p>`)}
${FigW(numberLineSvg({ min: 0, max: 140, step: 10, labelEvery: 20, W: 560, H: 110, fmt: v => v + ' dB', marks: [{ v: 30, label: T`whisper` }, { v: 60, label: T`conversation`, below: true, cls: 'mf-s2' }, { v: 85, label: T`heavy traffic`, cls: 'mf-s3' }, { v: 110, label: T`rock concert`, below: true, cls: 'mf-s4' }, { v: 130, label: T`pain`, cls: 'mf-s4' }], label: T`Decibel scale with typical sound levels from a whisper to the threshold of pain` }), T`Typical sound levels (after CDC/NIOSH figures). Every 10 dB is 10 times the intensity; long exposure above about 85 dB can damage hearing.`)}
<h3>The Doppler effect</h3>
<p>When a source and a listener move towards each other, the listener hears a higher frequency; moving apart, a lower one. With the speed of sound $v$, listener speed $v_L$ and source speed $v_S$:</p>
${Fm(T`f_L = f_S\,\frac{v \pm v_L}{v \mp v_S}`)}
${Fig(dopplerSvg(), T`A source moving to the right: the wavefronts bunch up ahead (shorter wavelength, higher pitch) and spread out behind (lower pitch).`)}
<p>Use the upper signs when they approach each other and the lower signs when they move apart.</p>
<h3>Pipes</h3>
<p>An air column resonates like a string. A pipe open at both ends has $f_n = \dfrac{n v}{2L}$; a pipe closed at one end has only odd harmonics, $f = \dfrac{(2n-1) v}{4L}$, so its fundamental is $\dfrac{v}{4L}$.</p>
${Tip(T`<p>Do not forget to halve the echo time: the sound goes there <i>and</i> back.</p>`)}`,
  gens: [
    () => {
      const water = chance(), v = water ? 1500 : 340, t = water ? ri(2, 40) / 10 : ri(2, 30) / 10, d = sig(v * t / 2);
      return { q: water ? T`A ship's sonar pulse returns from the sea bed after ${Q(t, 's')}. How deep is the sea there? (Speed of sound in water: $1500\,\mathrm{m/s}$.)` : T`A girl claps and hears the echo from a cliff ${Q(t, 's')} later. How far away is the cliff? (Speed of sound: $340\,\mathrm{m/s}$.)`,
        a: d, u: 'm', w: [sig(v * t), sig(v / t), sig(v * t / 4)], s: T`The sound travels there and back, so $d = \frac{vt}{2} = \frac{${v} \cdot ${M(t)}}{2} = ${QT(d, 'm')}$.` };
    },
    () => {
      const f = pick([85, 170, 256, 340, 440, 680, 1000, 2000, 3400]), lam = sig(340 / f);
      return { q: T`A tuning fork vibrates at ${Q(f, 'Hz')}. What is the wavelength of the sound in air? (Speed of sound: $340\,\mathrm{m/s}$.)`, a: lam, u: 'm', w: [sig(f / 340), sig(340 * f / 1000), sig(lam * 2)], s: T`$\lambda = \frac{v}{f} = \frac{340}{${f}} = ${QT(lam, 'm')}$.` };
    },
    () => {
      const P = pick([0.1, 0.5, 1, 2, 5, 10, 50]), r = ri(1, 20), I = P / (4 * Math.PI * r * r);
      return { q: T`A small loudspeaker radiates ${Q(P, 'W')} of sound equally in all directions. What is the intensity ${Q(r, 'm')} away?`, a: `$${sciT(I)}\\,\\mathrm{W/m^2}$`, w: [`$${sciT(P / (4 * Math.PI * r))}\\,\\mathrm{W/m^2}$`, `$${sciT(P / (Math.PI * r * r))}\\,\\mathrm{W/m^2}$`, `$${sciT(I * 10)}\\,\\mathrm{W/m^2}$`], v: I, rtol: 0.02, h: T`Type a power of ten like 3.2e-3.`,
        s: T`$I = \frac{P}{4\pi r^2} = \frac{${M(P)}}{4\pi \cdot ${r}^2} = ${sciT(I)}\,\mathrm{W/m^2}$.` };
    },
    () => {
      const e = ri(-9, -2), m = pick([1, 2, 5]), I = m * 10 ** e, B = sig(10 * Math.log10(I / 1e-12));
      return { q: T`A sound has an intensity of $${sciT(I, 1)}\,\mathrm{W/m^2}$. What is its sound level in decibels? ($I_0 = 10^{-12}\,\mathrm{W/m^2}$.)`, a: B, u: 'dB', w: [sig(B / 10), sig(10 * Math.log10(I)), sig(B + 10)], neg: true,
        s: T`$\beta = 10\log_{10}\frac{I}{I_0} = 10\log_{10}\frac{${sciT(I, 1)}}{10^{-12}} = ${QT(B, 'dB')}$.` };
    },
    () => {
      const d = pick([10, 20, 30, 40]), k = 10 ** (d / 10), n = pick([2, 10, 100]);
      return chance()
        ? { q: T`A street is ${Q(d, 'dB')} louder than a quiet room. How many times greater is its sound intensity?`, a: k, w: [d, d / 10, k / 10], s: T`Each $10\,\mathrm{dB}$ multiplies the intensity by 10, so $${d}\,\mathrm{dB}$ is a factor of $10^{${d / 10}} = ${M(k)}$.` }
        : { q: T`One machine produces a sound level of ${Q(80, 'dB')}. What is the level when ${n} identical machines run together?`, a: sig(80 + 10 * Math.log10(n)), u: 'dB', w: [80 * n, 80 + n, sig(80 * Math.log10(n) + 80)], s: T`The intensity is ${n} times larger, adding $10\log_{10}${n} = ${M(sig(10 * Math.log10(n)))}\,\mathrm{dB}$: the level is ${Q(sig(80 + 10 * Math.log10(n)), 'dB')}.` };
    },
    () => {
      const f = pick([300, 400, 500, 600, 800, 1000]), vs = ri(10, 40), toward = chance(), fL = sig(f * 340 / (toward ? 340 - vs : 340 + vs));
      return { q: T`An ambulance siren emits ${Q(f, 'Hz')}. The ambulance moves at ${Q(vs, 'm/s')} ${toward ? T`towards` : T`away from`} a person standing still. What frequency does the person hear? (Speed of sound: $340\,\mathrm{m/s}$.)`, a: fL, u: 'Hz', w: [sig(f * 340 / (toward ? 340 + vs : 340 - vs)), f, sig(f * (340 + (toward ? vs : -vs)) / 340)],
        s: T`$f_L = f_S \frac{v}{v ${toward ? '-' : '+'} v_S} = ${f} \cdot \frac{340}{340 ${toward ? '-' : '+'} ${vs}} = ${QT(fL, 'Hz')}$. The pitch is ${toward ? T`higher` : T`lower`} than the siren's own.` };
    },
    () => {
      const L = ri(2, 20) / 10, open = chance(), f = sig(open ? 340 / (2 * L) : 340 / (4 * L));
      return { q: open ? T`What is the fundamental frequency of a pipe ${Q(L, 'm')} long that is open at both ends? (Speed of sound: $340\,\mathrm{m/s}$.)` : T`What is the fundamental frequency of a pipe ${Q(L, 'm')} long that is closed at one end? (Speed of sound: $340\,\mathrm{m/s}$.)`,
        a: f, u: 'Hz', w: open ? [sig(340 / (4 * L)), sig(340 / L), sig(340 * L)] : [sig(340 / (2 * L)), sig(340 / L), sig(340 * L)],
        s: open ? T`Open pipe: $f_1 = \frac{v}{2L} = \frac{340}{2 \cdot ${M(L)}} = ${QT(f, 'Hz')}$.` : T`Closed pipe: $f_1 = \frac{v}{4L} = \frac{340}{4 \cdot ${M(L)}} = ${QT(f, 'Hz')}$.` };
    },
  ],
},
  ],
});
