# Physics Ladder

Physics lessons and practice worksheets, topic by topic, from units and motion to electricity, heat and modern physics. Every worksheet is generated fresh when it opens, with worked solutions, an answer key and print-ready pages. English and Bahasa Indonesia.

A companion to [Math Ladder](https://github.com/rendyhn/math-ladder): each topic lists the mathematics it relies on and links straight to it.

## Contents

The 45 topics are laid out in eight tracks, and all of them are ready.

| Track | Topics |
|---|---|
| A. Foundations | quantities, units & conversions; measurement & significant figures; vectors |
| B. Mechanics | motion in a straight line; vertical motion & free fall; projectile motion; circular motion; Newton's laws; friction & inclined planes; work, energy & power; momentum, impulse & collisions; rotation & torque; equilibrium of rigid bodies; gravitation & orbits; elasticity & springs; fluids at rest; fluids in motion; centre of mass & angular momentum |
| C. Waves & Sound | simple harmonic motion; mechanical waves; sound (intensity, decibels, Doppler effect) |
| D. Heat & Thermodynamics | temperature, heat & expansion; kinetic theory & ideal gases; laws of thermodynamics & heat engines; heat transfer |
| E. Electricity & Magnetism | electrostatics; electric potential & capacitors; current, voltage & Ohm's law; DC circuits; magnetic fields & the Lorentz force; electromagnetic induction; alternating current; electromagnetic waves |
| F. Optics | reflection & mirrors; refraction & lenses; optical instruments; interference & diffraction |
| G. Modern Physics | special relativity; photons & the photoelectric effect; atomic models & spectra; nuclei & radioactivity; nuclear energy |
| H. Physics & Technology | renewable & alternative energy; global warming & the greenhouse effect; semiconductors & basic electronics |

Each topic has a lesson and a practice sheet. A sheet mixes multiple-choice and fill-in questions (or only one kind), checks the answers and folds out worked solutions. Diagrams (free-body diagrams, slopes, projectile paths, motion graphs, circuits, waves, ray diagrams for mirrors and lenses, energy levels and decay curves) are drawn from each question's own numbers.

Each lesson opens with **Where this topic sits**: the topics it builds on, including topics on Math Ladder, and the topics it leads to, each with a one-sentence reason.

## Answers

- Answers within about 1% are accepted, so three significant figures are enough.
- Powers of ten can be typed as `3e8`, `3*10^8` or `3×10^8`.
- Units may be typed after the number (`12 m/s`, `40 Ω`, `3.6 kJ`).
- Questions that need $g$ always state whether to use 9.8 or 10 m/s².

## Languages

English and Bahasa Indonesia. Pick one from the menu at the top, or open the page with `?lang=en` or `?lang=id`. The translation system is the same as Math Ladder's, so more languages can be added later. Translations were produced with AI assistance and have not yet been reviewed. Corrections are welcome.

## Running it

Open `index.html` in any modern browser, from disk or from a static host, with the `lang/` folder next to it. Formulas are rendered by MathJax from a CDN, so an internet connection is needed.

The page follows the device's light or dark setting, and the sun/moon button switches between day and night mode. To save a lesson or worksheet as PDF, use its Print button and choose **Save as PDF**.

## Publishing on GitHub Pages

Settings → Pages → Source: **Deploy from a branch**, branch `main`, folder `/ (root)`. The site needs only `index.html`, `.nojekyll` and `lang/`.

## Development

The page is built from `src/`:

```
python build.py
```

This writes `index.html` and `lang/<code>.js`. Edit the files in `src/`, not the built output.

English text in `src/*.js` is written as ``T`...` ``, and each language pack in `src/lang/<code>/` maps a key to its translation. `tools/i18n.py` keeps them in step:

```
python tools/i18n.py catalog     # extract every English string to i18n/
python tools/i18n.py check id    # coverage, placeholders, TeX and HTML checks
python tools/i18n.py missing id  # strings still untranslated
```

To add a topic, add it to its track file first as `{ id, stage, soon: true, title }` (it then shows as *coming soon*), then replace that entry with a full topic (`blurb`, `lesson`, `gens`) and translate the new strings.

## Files

| Path | Purpose |
|---|---|
| `index.html` | The app, built from `src/`. English is built in; other languages load from `lang/`. |
| `lang/<code>.js` | Built language packs. |
| `src/tA-foundations.js` … `src/tH-technology.js` | Lessons and question generators for each track. |
| `src/ladder.js` | Prerequisite links between topics and to Math Ladder, each with its reason. |
| `src/phys.js` | Significant figures, units, scientific notation, and the SVG diagrams. |
| `src/core.js` | Random numbers, number formatting, formula builders, the translation system. |
| `src/app.js` | Navigation, worksheets, answer checking, answer key, printing, language menu, day/night mode. |
| `src/style.css`, `src/head.html`, `src/body.html` | Styles (light/dark, print) and page skeleton. |
| `src/lang/<code>/` | Translation sources. |
| `tools/i18n.py` | Translation catalogue and checks. |
| `build.py` | Build script. |

## License

- **Code** (the app, question generators, build script and tools): [MIT](LICENSE).
- **Educational content** (lessons, questions, worked solutions, topic links and all translations): [CC BY-NC 4.0](LICENSE-CONTENT). You may share and adapt it with credit to *Physics Ladder by rendyhn*, but not for commercial use. Free use in classrooms, tutoring and self-study is welcome. Ask for permission for commercial use.

The content was prepared with AI assistance and has not yet been fully reviewed by teachers. Please check it before relying on it, and report errors on the issue tracker.

---

© 2026 @rendyhn
