/* ==========================================================================
   TRACK F — Optics
   ========================================================================== */
level({
  id: 'optics', mark: 'F', name: 'Optics', short: 'Optics', band: 'Mirrors · lenses · interference', color: 'lv6',
  blurb: 'How light reflects, bends and interferes, and the instruments built on it.',
  topics: [
{
  id: 'mirrors', stage: 'jh', title: 'Reflection & Mirrors',
  blurb: 'The law of reflection, images in plane mirrors, concave and convex mirrors, the mirror equation and magnification.',
  lesson: () => T`
<p>Light travels in straight lines called <b>rays</b>. When a ray hits a smooth surface it bounces off according to the <b>law of reflection</b>:</p>
${Key(T`<p>The angle of incidence equals the angle of reflection, $i = r$. Both angles are measured from the <b>normal</b>, the line at right angles to the surface, and the incident ray, reflected ray and normal lie in one plane.</p>`)}
<h3>Plane mirrors</h3>
<p>The image in a flat mirror is <b>virtual</b> (the light only seems to come from it), <b>upright</b>, the <b>same size</b> as the object, <b>laterally inverted</b> (left and right swapped) and as far behind the mirror as the object is in front. Two mirrors at an angle $\alpha$ form $n = \dfrac{360^\circ}{\alpha} - 1$ images.</p>
<h3>Curved mirrors</h3>
<p>A <b>concave</b> mirror (curved inwards, like the inside of a spoon) brings parallel rays together at its <b>focal point</b> F. A <b>convex</b> mirror (curved outwards) spreads them out as if they came from a focal point behind it. The focal length is half the radius of curvature, $f = \frac{R}{2}$.</p>
${Fig(opticsSvg('concave', 10, 25, T`Ray diagram: an object beyond C in front of a concave mirror forms a real, inverted, smaller image between F and C`), T`Object beyond C: the image is real, inverted and smaller.`)}
${Fm(T`\frac{1}{f} = \frac{1}{s} + \frac{1}{s'} \qquad M = \left|\frac{s'}{s}\right| = \frac{h'}{h}`)}
<p>Here $s$ is the object distance and $s'$ the image distance. Use the sign rule: $f$ is positive for a concave mirror and negative for a convex one; a positive $s'$ is a <b>real</b> image in front of the mirror, a negative $s'$ a <b>virtual</b> image behind it.</p>
${Fig(opticsSvg('convex', 10, 15, T`Ray diagram: a convex mirror always forms a virtual, upright, smaller image behind the mirror`), T`A convex mirror always gives a virtual, upright, smaller image.`)}
${Tip(T`<p>Convex mirrors give a wide field of view, so they are used as car side mirrors and at blind corners. Concave mirrors are used in torches and headlights (bulb at F gives a parallel beam) and as make-up mirrors (object inside F gives a magnified, upright image).</p>`)}`,
  gens: [
    () => {
      const d = ri(5, 40) / 10, ask = pick(['img', 'gap']);
      return ask === 'img'
        ? { q: T`A girl stands ${Q(d, 'm')} in front of a plane mirror. How far is she from her image?`, a: sig(2 * d), u: 'm', w: [d, sig(d / 2), sig(4 * d)], s: T`The image is ${Q(d, 'm')} behind the mirror, so the distance between her and her image is $2 \times ${M(d)} = ${QT(sig(2 * d), 'm')}$.` }
        : (() => { const v = ri(2, 15) / 10; return { q: T`A boy walks towards a plane mirror at ${Q(v, 'm/s')}. How fast does he approach his image?`, a: sig(2 * v), u: 'm/s', w: [v, sig(v / 2), 0], s: T`He and his image each move towards the mirror at ${Q(v, 'm/s')}, so they close in on each other at $2 \times ${M(v)} = ${QT(sig(2 * v), 'm/s')}$.` }; })();
    },
    () => {
      const th = pick([10, 15, 20, 25, 30, 35, 40, 50, 55, 60, 65, 70, 75, 80]), surf = chance();
      return { q: surf ? T`A ray of light strikes a plane mirror making an angle of ${Q(th, '°')} with the <b>surface</b> of the mirror. What is the angle of reflection?` : T`A ray of light strikes a plane mirror with an angle of incidence of ${Q(th, '°')}. What is the angle between the incident and reflected rays?`,
        a: surf ? 90 - th : 2 * th, u: '°', rtol: 0, w: surf ? [th, 2 * th, 180 - 2 * th] : [th, 90 - th, 180 - 2 * th],
        s: surf ? T`Angles are measured from the normal: $i = 90^\circ - ${th}^\circ = ${90 - th}^\circ$, and $r = i = ${90 - th}^\circ$.` : T`$r = i = ${th}^\circ$, so the angle between the rays is $i + r = ${2 * th}^\circ$.` };
    },
    () => {
      const a = pick([30, 36, 40, 45, 60, 72, 90, 120]), n = 360 / a - 1;
      return { q: T`Two plane mirrors are placed at an angle of ${Q(a, '°')} to each other, with a candle between them. How many images of the candle are formed?`, a: n, rtol: 0, w: [n + 1, n - 1, 2 * n], s: T`$n = \frac{360^\circ}{\alpha} - 1 = \frac{360}{${a}} - 1 = ${n}$.` };
    },
    () => {
      const cc = chance(), f = pick([5, 8, 10, 12, 15, 20]), s = pick([2, 3, 4, 1.5, 2.5]) * f, fs = cc ? f : -f, sp = sig(1 / (1 / fs - 1 / s)), Mg = sig(Math.abs(sp / s));
      const fig = Fig(opticsSvg(cc ? 'concave' : 'convex', f, s, T`Ray diagram for the object and mirror in the question`));
      return cc
        ? { q: T`An object is placed ${Q(s, 'cm')} in front of a concave mirror of focal length ${Q(f, 'cm')}. How far from the mirror is the image formed?${fig}`, a: sp, u: 'cm', w: [sig(1 / (1 / f + 1 / s)), sig(s - f), sig(s * f / (s + f) * 2)],
          s: T`$\frac{1}{s'} = \frac{1}{f} - \frac{1}{s} = \frac{1}{${f}} - \frac{1}{${M(s)}}$, so $s' = ${QT(sp, 'cm')}$ in front of the mirror (a real image, magnification ${NUM(Mg)}).` }
        : { q: T`An object is placed ${Q(s, 'cm')} in front of a convex mirror of focal length ${Q(f, 'cm')}. How far behind the mirror is the image?${fig}`, a: sig(-sp), u: 'cm', w: [sig(1 / (1 / f - 1 / s)), sig(s + f), sig(s * f / (s + f) * 2)],
          s: T`For a convex mirror $f = -${f}\,\mathrm{cm}$: $\frac{1}{s'} = -\frac{1}{${f}} - \frac{1}{${M(s)}}$, so $s' = ${M(sp)}\,\mathrm{cm}$. The minus sign means a virtual image ${Q(sig(-sp), 'cm')} behind the mirror.` };
    },
    () => {
      const f = pick([10, 12, 15, 20]), s = pick([1.5, 3, 4, 5]) * f, sp = 1 / (1 / f - 1 / s), Mg = sig(sp / s), h = ri(2, 10), askH = chance();
      return askH
        ? { q: T`An object ${Q(h, 'cm')} tall stands ${Q(s, 'cm')} in front of a concave mirror of focal length ${Q(f, 'cm')}. How tall is its image?`, a: sig(h * sp / s), u: 'cm', w: [sig(h * s / sp), h, sig(h * f / s)],
          s: T`$s' = \frac{sf}{s - f} = \frac{${M(s)} \cdot ${f}}{${M(s)} - ${f}} = ${M(sig(sp))}\,\mathrm{cm}$, so $h' = h\frac{s'}{s} = ${h} \cdot \frac{${M(sig(sp))}}{${M(s)}} = ${QT(sig(h * sp / s), 'cm')}$.` }
        : { q: T`An object stands ${Q(s, 'cm')} in front of a concave mirror of focal length ${Q(f, 'cm')}. What is the magnification?`, a: Mg, w: [sig(s / sp), sig(f / s), sig(Mg * 2)],
          s: T`$s' = \frac{sf}{s - f} = ${M(sig(sp))}\,\mathrm{cm}$, so $M = \frac{s'}{s} = \frac{${M(sig(sp))}}{${M(s)}} = ${M(Mg)}$.` };
    },
    () => {
      const R = ri(2, 30) * 4, back = chance();
      return back
        ? { q: T`A concave mirror has a focal length of ${Q(R / 2, 'cm')}. What is its radius of curvature?`, a: R, u: 'cm', w: [R / 4, R / 2, 2 * R], s: T`$R = 2f = 2 \times ${R / 2} = ${QT(R, 'cm')}$.` }
        : { q: T`A concave mirror has a radius of curvature of ${Q(R, 'cm')}. What is its focal length?`, a: R / 2, u: 'cm', w: [R, 2 * R, R / 4], s: T`$f = \frac{R}{2} = \frac{${R}}{2} = ${QT(R / 2, 'cm')}$.` };
    },
    () => pick([
      { q: T`An object is placed between the focal point and a concave mirror. What kind of image is formed?`, a: T`Virtual, upright and magnified`, w: [T`Real, inverted and smaller`, T`Real, inverted and magnified`, T`Virtual, upright and smaller`], only: 'mc', s: T`Inside F the reflected rays spread out, so they only seem to meet behind the mirror: the image is virtual, upright and larger. This is how a make-up mirror works.` },
      { q: T`Why are convex mirrors used as car side mirrors?`, a: T`They give a wide field of view`, w: [T`They make objects look bigger`, T`They form real images`, T`They focus sunlight`], only: 'mc', s: T`A convex mirror spreads the reflected rays, so a small mirror shows a wide area behind the car. The images are smaller, so cars look further away than they are.` },
      { q: T`Where should the bulb of a torch be placed relative to its concave mirror to give a parallel beam?`, a: T`At the focal point`, w: [T`At the centre of curvature`, T`Between F and the mirror`, T`Far from the mirror`], only: 'mc', s: T`Rays from the focal point reflect off a concave mirror parallel to the axis.` },
      { q: T`What kind of image does a plane mirror form?`, a: T`Virtual, upright, same size`, w: [T`Real, inverted, same size`, T`Virtual, upright, smaller`, T`Real, upright, magnified`], only: 'mc', s: T`The image is virtual (behind the mirror), upright, the same size and laterally inverted.` },
    ]),
  ],
},
{
  id: 'lenses', stage: 'sh', title: 'Refraction & Lenses',
  blurb: 'Refractive index, Snell’s law, total internal reflection, converging and diverging lenses, the lens equation and lens power.',
  lesson: () => T`
<p>Light slows down when it enters a denser medium such as water or glass, and if it arrives at an angle it changes direction. This bending is <b>refraction</b>. The <b>refractive index</b> of a medium compares the speed of light in a vacuum with its speed there:</p>
${Fm(T`n = \frac{c}{v} \qquad n_1 \sin\theta_1 = n_2 \sin\theta_2`)}
<p>The second equation is <b>Snell's law</b>; the angles are measured from the normal. Going into a denser medium (larger $n$) the ray bends <b>towards</b> the normal.</p>
${Fig(refractionSvg(40, 25, T`air`, T`glass`, T`A ray passing from air into glass bends towards the normal`), T`From air into glass the ray bends towards the normal.`)}
<h3>Total internal reflection</h3>
<p>Going from a denser into a less dense medium the ray bends away from the normal. Beyond the <b>critical angle</b> $C$ no light gets out at all: it is all reflected. For a medium of index $n$ against air, $\sin C = \dfrac{1}{n}$. Optical fibres and the sparkle of diamonds use total internal reflection.</p>
<h3>Lenses</h3>
<p>A <b>converging</b> (convex) lens brings parallel rays together at its focal point; a <b>diverging</b> (concave) lens spreads them out. The same equations as for mirrors apply, with $f$ positive for converging and negative for diverging lenses:</p>
${Fm(T`\frac{1}{f} = \frac{1}{s} + \frac{1}{s'} \qquad M = \left|\frac{s'}{s}\right| \qquad P = \frac{1}{f}`)}
${Fig(opticsSvg('converging', 10, 25, T`Ray diagram: an object beyond 2F in front of a converging lens forms a real, inverted, smaller image on the other side`), T`A converging lens: a ray parallel to the axis passes through F; a ray through the centre goes straight on.`)}
${Key(T`<p>A positive $s'$ is a <b>real</b> image on the far side of the lens; a negative $s'$ is a <b>virtual</b> image on the same side as the object. The <b>power</b> $P$ is measured in dioptres (D) when $f$ is in metres: a lens with $f = 50\,\mathrm{cm}$ has $P = 2\,\mathrm{D}$.</p>`)}
${Tip(T`<p>An object inside the focal length of a converging lens gives a virtual, upright, magnified image: this is a magnifying glass. A diverging lens always gives a virtual, upright, smaller image.</p>`)}`,
  gens: [
    () => {
      const [mat, n] = pick([[T`water`, 1.33], [T`glass`, 1.5], [T`diamond`, 2.42], [T`glass`, 1.6], [T`ice`, 1.31]]), v = 3e8 / n, askV = chance();
      return askV
        ? { q: T`The refractive index of ${mat} is ${NUM(n)}. What is the speed of light in it? ($c = 3.0 \times 10^{8}\,\mathrm{m/s}$.)`, a: `$${sciT(v)}\\,\\mathrm{m/s}$`, w: [`$${sciT(3e8 * n)}\\,\\mathrm{m/s}$`, `$${sciT(v / 10)}\\,\\mathrm{m/s}$`, `$3 \\times 10^{8}\\,\\mathrm{m/s}$`], v: sig(v), rtol: 0.02, h: T`Type a power of ten like 2e8.`,
          s: T`$v = \frac{c}{n} = \frac{3.0 \times 10^{8}}{${M(n)}} = ${sciT(v)}\,\mathrm{m/s}$.` }
        : { q: T`Light travels at $${sciT(v)}\,\mathrm{m/s}$ in a transparent material. What is its refractive index? ($c = 3.0 \times 10^{8}\,\mathrm{m/s}$.)`, a: sig(3e8 / sig(v)), w: [sig(sig(v) / 3e8), sig(3e8 / sig(v) * 2), 1], s: T`$n = \frac{c}{v} = \frac{3.0 \times 10^{8}}{${sciT(v)}} = ${M(sig(3e8 / sig(v)))}$.` };
    },
    () => {
      const [mat, n] = pick([[T`water`, 1.33], [T`glass`, 1.5], [T`glass`, 1.6], [T`diamond`, 2.42]]), i = pick([20, 30, 40, 45, 50, 60, 70]), r = sig(deg(Math.asin(sinD(i) / n)));
      return { q: T`A ray of light passes from air into ${mat} ($n = ${M(n)}$) with an angle of incidence of ${Q(i, '°')}. What is the angle of refraction?${Fig(refractionSvg(i, r, T`air`, mat, T`A ray passing from air into a denser material`))}`, a: r, u: '°', rtol: 0.02, w: [sig(i / n), sig(90 - r), i],
        s: T`$\sin r = \frac{\sin ${i}^\circ}{${M(n)}} = ${M(sig(sinD(i) / n))}$, so $r = ${QT(r, '°')}$. The ray bends towards the normal.` };
    },
    () => {
      const [mat, n] = pick([[T`water`, 1.33], [T`glass`, 1.5], [T`glass`, 1.6], [T`diamond`, 2.42], [T`plastic`, 1.4]]), C = sig(deg(Math.asin(1 / n)));
      return { q: T`What is the critical angle for light going from ${mat} ($n = ${M(n)}$) into air?`, a: C, u: '°', rtol: 0.02, w: [sig(90 - C), sig(deg(Math.asin(1 / n / 2))), sig(deg(Math.atan(1 / n)))],
        s: T`$\sin C = \frac{1}{n} = \frac{1}{${M(n)}} = ${M(sig(1 / n))}$, so $C = ${QT(C, '°')}$. Rays hitting the surface at more than this angle are totally internally reflected.` };
    },
    () => {
      const cv = chance(0.7), f = pick([5, 10, 12, 15, 20, 25]), s = cv ? pick([1.5, 2, 3, 4, 0.5]) * f : pick([0.5, 1, 2, 3]) * f, fs = cv ? f : -f, sp = sig(1 / (1 / fs - 1 / s));
      const fig = Fig(opticsSvg(cv ? 'converging' : 'diverging', f, s, T`Ray diagram for the object and lens in the question`));
      return { q: T`An object is placed ${Q(s, 'cm')} from a ${cv ? T`converging` : T`diverging`} lens of focal length ${Q(f, 'cm')}. Where is the image? Give $s'$ in cm, with a minus sign for a virtual image.${fig}`, a: sp, u: 'cm', neg: true, w: [-sp, sig(1 / (1 / f + 1 / s)), sig(s + f)],
        s: T`$\frac{1}{s'} = \frac{1}{f} - \frac{1}{s} = \frac{1}{${fs}} - \frac{1}{${M(s)}}$, so $s' = ${QT(sp, 'cm')}$: ${sp > 0 ? T`a real image on the far side of the lens` : T`a virtual image on the same side as the object`}.` };
    },
    () => {
      const cv = chance(0.6), fcm = pick([10, 20, 25, 40, 50, 100, 200]), P = sig((cv ? 100 : -100) / fcm), back = chance();
      return back
        ? { q: T`A lens has a power of ${Q(P, 'D')}. What is its focal length in centimetres?`, a: sig(100 / P), u: 'cm', neg: true, w: [sig(1 / P), sig(-100 / P), sig(10 / P)], s: T`$f = \frac{1}{P} = \frac{1}{${M(P)}}\,\mathrm{m} = ${QT(sig(100 / P), 'cm')}$. ${cv ? T`A positive focal length: a converging lens.` : T`A negative focal length: a diverging lens.`}` }
        : { q: T`A ${cv ? T`converging` : T`diverging`} lens has a focal length of ${Q(fcm, 'cm')}. What is its power, in dioptres?`, a: P, u: 'D', neg: true, w: [-P, sig(P / 100), sig(fcm / 100)], s: T`$P = \frac{1}{f} = \frac{1}{${cv ? '' : '-'}${M(fcm / 100)}\,\mathrm{m}} = ${QT(P, 'D')}$.` };
    },
    () => {
      const f = pick([10, 15, 20]), s = pick([1.5, 2.5, 3, 5]) * f, sp = s * f / (s - f), h = ri(2, 12), hi = sig(h * sp / s);
      return { q: T`A candle flame ${Q(h, 'cm')} tall is ${Q(s, 'cm')} from a converging lens of focal length ${Q(f, 'cm')}. How tall is the image on the screen?`, a: hi, u: 'cm', w: [sig(h * s / sp), h, sig(h * f / s)],
        s: T`$s' = \frac{sf}{s - f} = \frac{${M(s)} \cdot ${f}}{${M(s - f)}} = ${M(sig(sp))}\,\mathrm{cm}$, so $h' = h\frac{s'}{s} = ${h} \cdot \frac{${M(sig(sp))}}{${M(s)}} = ${QT(hi, 'cm')}$ (inverted).` };
    },
    () => pick([
      { q: T`Which two conditions are needed for total internal reflection?`, a: T`Light goes from a denser to a less dense medium, at more than the critical angle`, w: [T`Light goes from a less dense to a denser medium, at more than the critical angle`, T`Light goes from a denser to a less dense medium, at less than the critical angle`, T`The surface must be silvered like a mirror`], only: 'mc', s: T`Only light leaving a denser medium bends away from the normal, and only beyond the critical angle is all of it reflected.` },
      { q: T`What kind of image does a magnifying glass give?`, a: T`Virtual, upright and magnified`, w: [T`Real, inverted and magnified`, T`Virtual, inverted and smaller`, T`Real, upright and smaller`], only: 'mc', s: T`A magnifying glass is a converging lens with the object inside its focal length, which gives a virtual, upright, magnified image.` },
      { q: T`A straw in a glass of water looks bent at the surface. Why?`, a: T`Light from the straw refracts as it leaves the water`, w: [T`The water bends the straw`, T`Light reflects off the glass`, T`Light travels faster in water`], only: 'mc', s: T`Light from the underwater part bends away from the normal as it passes into air, so that part seems to be higher than it is.` },
      { q: T`What happens to the speed and wavelength of light as it passes from air into glass?`, a: T`Both decrease; the frequency stays the same`, w: [T`Both increase`, T`The speed decreases and the frequency decreases`, T`Nothing changes`], only: 'mc', s: T`$v = c/n$ is smaller in glass. The frequency is set by the source and does not change, so $\lambda = v/f$ also decreases.` },
    ]),
  ],
},
{
  id: 'instruments', stage: 'sh', title: 'Optical Instruments',
  blurb: 'The eye and its defects, spectacles, the magnifying glass, the microscope, the telescope and the camera.',
  lesson: () => T`
<h3>The eye</h3>
<p>The cornea and the lens of the eye form a real, inverted image on the <b>retina</b>. Muscles change the shape of the lens so that both near and far objects are in focus (<b>accommodation</b>). A normal eye sees clearly from its <b>near point</b>, about $25\,\mathrm{cm}$, to its <b>far point</b> at infinity.</p>
${Tbl([T`Defect`, T`Problem`, T`Correction`], [[T`Short sight (myopia)`, T`far point is too close; the image forms in front of the retina`, T`diverging lens: $P = -\dfrac{100}{PR}$`], [T`Long sight (hypermetropia)`, T`near point is too far; the image forms behind the retina`, T`converging lens: $P = 4 - \dfrac{100}{PP}$`], [T`Presbyopia (old age)`, T`the lens stiffens and cannot accommodate`, T`bifocal lenses`]])}
<p>Here $PR$ (far point) and $PP$ (near point) are in centimetres and $P$ comes out in dioptres.</p>
<h3>Magnifying glass</h3>
<p>A converging lens held close to the eye with the object inside its focal length. Its angular magnification is $M = \dfrac{25}{f}$ for a relaxed eye (image at infinity) and $M = \dfrac{25}{f} + 1$ when the image is at the near point ($f$ in cm).</p>
<h3>Microscope and telescope</h3>
<p>A <b>microscope</b> uses a short-focus objective lens to form a magnified real image, which the eyepiece then magnifies again. For a relaxed eye the total magnification is</p>
${Fm(T`M = \frac{s'_{ob}}{s_{ob}} \times \frac{25}{f_{ok}}`)}
<p>A <b>refracting telescope</b> has a long-focus objective and a short-focus eyepiece. For a relaxed eye the lenses are $d = f_{ob} + f_{ok}$ apart and</p>
${Fm(T`M = \frac{f_{ob}}{f_{ok}}`)}
${Key(T`<p>A <b>camera</b> is like an eye: a converging lens forms a real, inverted, smaller image on a sensor. It focuses by moving the lens rather than changing its shape.</p>`)}
${Tip(T`<p>Keep centimetres throughout these formulas, and remember that the 25 is the near point in cm.</p>`)}`,
  gens: [
    () => {
      const PR = pick([50, 100, 200, 250, 400, 40, 80]), P = sig(-100 / PR);
      return { q: T`A short-sighted person has a far point of ${Q(PR, 'cm')}. What power of spectacle lens do they need to see distant objects clearly?`, a: P, u: 'D', neg: true, w: [-P, sig(4 - 100 / PR), sig(-PR / 100)], s: T`The lens must make distant objects appear at the far point: $P = -\frac{100}{PR} = -\frac{100}{${PR}} = ${QT(P, 'D')}$, a diverging lens.` };
    },
    () => {
      const PP = pick([50, 40, 100, 75, 200, 125]), P = sig(4 - 100 / PP);
      return { q: T`A long-sighted person has a near point of ${Q(PP, 'cm')}. What power of lens do they need to read a book held ${Q(25, 'cm')} from the eye?`, a: P, u: 'D', neg: true, w: [sig(-P), sig(100 / PP), sig(4 + 100 / PP)], s: T`$P = \frac{100}{25} - \frac{100}{PP} = 4 - \frac{100}{${PP}} = ${QT(P, 'D')}$, a converging lens.` };
    },
    () => {
      const f = pick([2.5, 5, 6.25, 10, 12.5]), relaxed = chance(), Mg = sig(25 / f + (relaxed ? 0 : 1));
      return { q: T`A magnifying glass has a focal length of ${Q(f, 'cm')}. What is its magnification when ${relaxed ? T`the eye is relaxed (image at infinity)` : T`the image is at the near point, ${Q(25, 'cm')}`}?`, a: Mg, w: [relaxed ? sig(25 / f + 1) : sig(25 / f), sig(f / 25), sig(2 * 25 / f)],
        s: relaxed ? T`$M = \frac{25}{f} = \frac{25}{${M(f)}} = ${M(Mg)}$.` : T`$M = \frac{25}{f} + 1 = \frac{25}{${M(f)}} + 1 = ${M(Mg)}$.` };
    },
    () => {
      const fob = pick([50, 80, 100, 120, 150, 200]), fok = pick([2, 2.5, 4, 5, 10]), askM = chance();
      return askM
        ? { q: T`A telescope has an objective of focal length ${Q(fob, 'cm')} and an eyepiece of focal length ${Q(fok, 'cm')}. What is its magnification for a relaxed eye?`, a: sig(fob / fok), w: [sig(fok / fob), fob + fok, sig(fob * fok)], s: T`$M = \frac{f_{ob}}{f_{ok}} = \frac{${fob}}{${M(fok)}} = ${M(sig(fob / fok))}$.` }
        : { q: T`A telescope has an objective of focal length ${Q(fob, 'cm')} and an eyepiece of focal length ${Q(fok, 'cm')}. How long is the telescope (the distance between the lenses) for a relaxed eye?`, a: sig(fob + fok), u: 'cm', w: [fob - fok, sig(fob / fok), fob], s: T`$d = f_{ob} + f_{ok} = ${fob} + ${M(fok)} = ${QT(sig(fob + fok), 'cm')}$.` };
    },
    () => {
      const fob = pick([0.5, 1, 1.5, 2]), sob = sig(fob * pick([1.1, 1.2, 1.25])), fok = pick([2.5, 5, 10]), sp = sob * fob / (sob - fob), Mg = sig(sp / sob * 25 / fok);
      return { q: T`In a microscope the objective (focal length ${Q(fob, 'cm')}) is ${Q(sob, 'cm')} from the specimen, and the eyepiece has a focal length of ${Q(fok, 'cm')}. What is the total magnification for a relaxed eye?`, a: Mg, w: [sig(sp / sob), sig(25 / fok), sig(sp / sob + 25 / fok)],
        s: T`Objective: $s'_{ob} = \frac{s_{ob} f_{ob}}{s_{ob} - f_{ob}} = ${M(sig(sp))}\,\mathrm{cm}$, magnifying $\frac{${M(sig(sp))}}{${M(sob)}} = ${M(sig(sp / sob))}$ times. Eyepiece: $\frac{25}{${M(fok)}} = ${M(sig(25 / fok))}$. Total $M = ${M(sig(sp / sob))} \times ${M(sig(25 / fok))} = ${M(Mg)}$.` };
    },
    () => pick([
      { q: T`What kind of lens corrects short sight (myopia)?`, a: T`A diverging (concave) lens`, w: [T`A converging (convex) lens`, T`A bifocal lens`, T`A cylindrical lens`], only: 'mc', s: T`A short-sighted eye focuses too strongly, so the image forms in front of the retina. A diverging lens spreads the rays a little first.` },
      { q: T`In a short-sighted eye, where does the image of a distant object form?`, a: T`In front of the retina`, w: [T`Behind the retina`, T`On the retina`, T`On the lens`], only: 'mc', s: T`The eye is too strongly focusing (or too long), so rays from far away meet before they reach the retina.` },
      { q: T`What is the image formed by a camera lens on its sensor like?`, a: T`Real, inverted and smaller`, w: [T`Virtual, upright and smaller`, T`Real, upright and larger`, T`Virtual, inverted and larger`], only: 'mc', s: T`The object is far beyond $2F$, so the lens forms a real, inverted, diminished image, just as the eye does on the retina.` },
      { q: T`How does the eye focus on objects at different distances?`, a: T`Muscles change the shape of the lens`, w: [T`The lens moves forwards and backwards`, T`The pupil changes size`, T`The retina moves`], only: 'mc', s: T`This is accommodation: the ciliary muscles make the lens fatter for near objects and thinner for far ones. A camera moves its lens instead.` },
    ]),
  ],
},
{
  id: 'interference', stage: 'sh', title: 'Interference & Diffraction',
  blurb: 'Superposition of light, Young’s double slit, single-slit diffraction, diffraction gratings and thin films.',
  lesson: () => T`
<p>When two waves meet they add up (<b>superposition</b>). If crest meets crest they reinforce: <b>constructive interference</b>. If crest meets trough they cancel: <b>destructive interference</b>. To see a steady pattern the sources must be <b>coherent</b>: the same frequency and a constant phase difference.</p>
${Key(T`<p>Constructive where the path difference is a whole number of wavelengths, $\Delta = m\lambda$; destructive where it is a whole number plus a half, $\Delta = (m + \frac12)\lambda$.</p>`)}
<h3>Young's double slit</h3>
<p>Light through two narrow slits a distance $d$ apart makes bright and dark fringes on a screen a distance $L$ away. For small angles:</p>
${Fig(slitSvg(T`Two slits a distance d apart, a screen a distance L away, and bright fringes a distance Δy apart`), T`Bright fringes are equally spaced, $\Delta y$ apart.`)}
${Fm(T`d\sin\theta = m\lambda \qquad y_m = \frac{m\lambda L}{d} \qquad \Delta y = \frac{\lambda L}{d}`)}
<h3>Diffraction</h3>
<p>Waves spread out when they pass through a gap. For a single slit of width $a$ the dark fringes are at $a\sin\theta = m\lambda$, and the central bright band is twice as wide as the others. A <b>diffraction grating</b> has very many slits, $N$ per unit length, so the slit spacing is $d = 1/N$. Its bright lines are sharp and obey $d\sin\theta = m\lambda$; the highest order that can appear is the largest whole number below $d/\lambda$.</p>
${Tip(T`<p>Work in metres: $1\,\mathrm{nm} = 10^{-9}\,\mathrm{m}$ and $1\,\mathrm{mm} = 10^{-3}\,\mathrm{m}$. A grating with 500 lines per mm has $d = \frac{1}{500}\,\mathrm{mm} = 2 \times 10^{-6}\,\mathrm{m}$.</p>`)}
<p>The colours of soap bubbles and oil films come from <b>thin-film interference</b> between light reflected from the top and the bottom of the film.</p>`,
  gens: [
    () => {
      const lam = pick([450, 500, 550, 589, 600, 633, 650, 700]), d = pick([0.1, 0.2, 0.25, 0.5]), L = pick([1, 1.5, 2, 2.5, 3]), dy = sig(lam * 1e-9 * L / (d * 1e-3) * 1e3);
      return { q: T`Light of wavelength ${Q(lam, 'nm')} passes through two slits ${Q(d, 'mm')} apart onto a screen ${Q(L, 'm')} away. What is the spacing between neighbouring bright fringes, in mm?`, a: dy, u: 'mm', w: [sig(dy * 10), sig(dy / 2), sig(lam * 1e-9 * d * 1e-3 / L * 1e9)],
        s: T`$\Delta y = \frac{\lambda L}{d} = \frac{${lam} \times 10^{-9} \cdot ${M(L)}}{${M(d)} \times 10^{-3}} = ${M(sig(dy / 1000))}\,\mathrm{m} = ${QT(dy, 'mm')}$.` };
    },
    () => {
      const lam = pick([450, 500, 600, 640, 700]), d = pick([0.2, 0.25, 0.4, 0.5]), L = pick([1, 2, 2.5]), dy = sig(lam * 1e-9 * L / (d * 1e-3) * 1e3);
      return { q: T`In a double-slit experiment the slits are ${Q(d, 'mm')} apart and the screen is ${Q(L, 'm')} away. The bright fringes are ${Q(dy, 'mm')} apart. What is the wavelength of the light, in nm?`, a: lam, u: 'nm', w: [sig(lam * 10), sig(lam / 2), sig(lam * 2)],
        s: T`$\lambda = \frac{d\,\Delta y}{L} = \frac{${M(d)} \times 10^{-3} \cdot ${M(dy)} \times 10^{-3}}{${M(L)}} = ${lam} \times 10^{-9}\,\mathrm{m} = ${QT(lam, 'nm')}$.` };
    },
    () => {
      const lam = pick([450, 500, 550, 600, 650]), d = pick([0.1, 0.2, 0.5]), L = pick([1, 2]), m = ri(2, 5), y = sig(m * lam * 1e-9 * L / (d * 1e-3) * 1e3);
      return { q: T`Light of wavelength ${Q(lam, 'nm')} falls on two slits ${Q(d, 'mm')} apart. How far from the central bright fringe is bright fringe number ${m}, on a screen ${Q(L, 'm')} away? Give your answer in mm.`, a: y, u: 'mm', w: [sig(y / m), sig(y * (m + 1) / m), sig(y * (m - 0.5) / m)],
        s: T`$y_m = \frac{m\lambda L}{d} = \frac{${m} \cdot ${lam} \times 10^{-9} \cdot ${L}}{${M(d)} \times 10^{-3}} = ${QT(y, 'mm')}$.` };
    },
    () => {
      const N = pick([100, 200, 300, 400, 500, 600]), lam = pick([450, 500, 550, 600, 650]), d = 1e-3 / N, m = pick([1, 1, 2]), s1 = m * lam * 1e-9 / d, th = sig(deg(Math.asin(s1)));
      if (s1 >= 1) return null;
      return { q: T`Light of wavelength ${Q(lam, 'nm')} falls on a diffraction grating with ${N} lines per mm. At what angle is the ${m === 1 ? T`first` : T`second`}-order bright line?`, a: th, u: '°', rtol: 0.02, w: [sig(deg(Math.asin(s1 / 2))), sig(deg(s1)) === th ? sig(th * 1.5) : sig(deg(s1) * 1.2), sig(90 - th)],
        s: T`$d = \frac{1}{${N}}\,\mathrm{mm} = ${sciT(d)}\,\mathrm{m}$. Then $\sin\theta = \frac{m\lambda}{d} = \frac{${m} \cdot ${lam} \times 10^{-9}}{${sciT(d)}} = ${M(sig(s1))}$, so $\theta = ${QT(th, '°')}$.` };
    },
    () => {
      const N = pick([300, 400, 500, 600, 800]), lam = pick([450, 500, 550, 600, 650, 700]), d = 1e6 / N, mMax = Math.floor(d / lam - 1e-9);
      return { q: T`A grating has ${N} lines per mm and is lit with light of wavelength ${Q(lam, 'nm')}. What is the highest order of bright line that can be seen?`, a: mMax, rtol: 0, w: [mMax + 1, Math.max(1, mMax - 1) === mMax ? mMax + 2 : mMax - 1, 2 * mMax],
        s: T`$d = \frac{1}{${N}}\,\mathrm{mm} = ${M(sig(d))}\,\mathrm{nm}$. Since $\sin\theta \le 1$, $m \le \frac{d}{\lambda} = \frac{${M(sig(d))}}{${lam}} = ${M(sig(d / lam))}$, so the highest order is ${mMax}.` };
    },
    () => {
      const lam = pick([500, 600, 633, 700]), a = pick([0.05, 0.1, 0.2]), L = pick([1, 2, 3]), w = sig(2 * lam * 1e-9 * L / (a * 1e-3) * 1e3);
      return { q: T`Light of wavelength ${Q(lam, 'nm')} passes through a single slit ${Q(a, 'mm')} wide onto a screen ${Q(L, 'm')} away. How wide is the central bright band, in mm?`, a: w, u: 'mm', w: [sig(w / 2), sig(w * 2), sig(w / 10)],
        s: T`The first dark fringes are at $y = \frac{\lambda L}{a}$ on either side, so the central band is $\frac{2\lambda L}{a} = \frac{2 \cdot ${lam} \times 10^{-9} \cdot ${L}}{${M(a)} \times 10^{-3}} = ${QT(w, 'mm')}$ wide.` };
    },
    () => pick([
      { q: T`In a double-slit experiment the slits are moved closer together. What happens to the fringes?`, a: T`They spread further apart`, w: [T`They get closer together`, T`They stay the same`, T`They disappear`], only: 'mc', s: T`$\Delta y = \frac{\lambda L}{d}$: a smaller $d$ gives a larger fringe spacing.` },
      { q: T`Red light in a double-slit experiment is replaced by blue light. What happens to the fringe spacing?`, a: T`It decreases`, w: [T`It increases`, T`It stays the same`, T`The fringes disappear`], only: 'mc', s: T`Blue light has a shorter wavelength, and $\Delta y = \frac{\lambda L}{d}$ is proportional to $\lambda$.` },
      { q: T`Why do two separate light bulbs not produce an interference pattern?`, a: T`They are not coherent`, w: [T`Their light is too bright`, T`Light cannot interfere`, T`They are too far apart`], only: 'mc', s: T`The phase of the light from each bulb changes randomly millions of times a second, so the pattern shifts too fast to see. Coherent sources keep a constant phase difference.` },
      { q: T`What causes the colours of a soap bubble?`, a: T`Interference of light reflected from the two surfaces of the film`, w: [T`Dyes in the soap`, T`Refraction as in a prism`, T`Diffraction through the air`], only: 'mc', s: T`Light reflected from the front and back of the thin film interferes. Which colours reinforce depends on the film thickness.` },
    ]),
  ],
},
  ],
});
