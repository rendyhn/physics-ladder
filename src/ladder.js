/* ==========================================================================
   The ladder: which topics each topic builds on, and why.
   link(from, to, why): "to" builds on "from". An end may be a topic that is
   still planned (shown greyed out) or math:<id>, a topic on Math Ladder
   (https://rendyhn.github.io/math-ladder/), which opens in a new tab.
   The reason is shown on both pages, so it has to read well from either side.
   ========================================================================== */
const LADDER = [];
const link = (from, to, why) => LADDER.push({ from, to, why });
/* Math Ladder topics used as prerequisites (English titles; packs translate them under meta.math) */
const MATH_TOPICS = {
  'fractions': 'Fractions', 'ratio': 'Ratio, Rates & Proportion', 'sci-notation': 'Scientific Notation', 'exponents': 'Exponents & Roots',
  'linear-eq': 'Linear Equations', 'linear-functions': 'Linear Functions & Graphs', 'systems': 'Systems of Linear Equations',
  'circles': 'Circles', 'statistics-jh': 'Statistics: Centre & Spread', 'quadratics': 'Quadratic Equations',
  'quad-functions': 'Quadratic Functions & Parabolas', 'exp-log': 'Exponents & Logarithms', 'trig-basics': 'Trigonometry: Ratios & the Unit Circle',
  'vectors': 'Vectors', 'derivatives': 'Derivatives', 'integrals': 'Integrals', 'ode': 'Differential Equations', 'complex': 'Complex Numbers',
};

/* ---------- from Math Ladder ---------- */
link('math:sci-notation', 'units', () => T`Very large and very small physical quantities are written in scientific notation.`);
link('math:ratio', 'units', () => T`Converting a unit means multiplying by a ratio that is equal to 1.`);
link('math:statistics-jh', 'measurement', () => T`Repeated measurements are summarised by their mean and their spread.`);
link('math:trig-basics', 'vectors', () => T`The components of a vector are found with sine and cosine.`);
link('math:vectors', 'vectors', () => T`Vectors in physics follow the same rules as vectors in mathematics, with units attached.`);
link('math:linear-functions', 'linear-motion', () => T`Uniform motion gives straight-line graphs, and the slope of a position–time graph is the velocity.`);
link('math:linear-eq', 'linear-motion', () => T`Each equation of motion is rearranged for one unknown, like a linear equation.`);
link('math:quadratics', 'free-fall', () => T`Finding when a thrown object is at a given height means solving a quadratic equation in $t$.`);
link('math:quad-functions', 'projectile', () => T`The path of a projectile is a parabola.`);
link('math:trig-basics', 'projectile', () => T`The launch velocity is split into components with sine and cosine.`);
link('math:trig-basics', 'friction-incline', () => T`The weight on a slope is resolved using the sine and cosine of the angle.`);
link('math:integrals', 'work-energy', () => T`The work done by a changing force is the area under the force–distance graph, an integral.`);
link('math:circles', 'circular', () => T`Circular motion uses the radius and circumference of the circle.`);
link('math:exponents', 'gravitation', () => T`Newton's law of gravitation is an inverse-square law.`);
link('math:linear-eq', 'heat', () => T`A mixing problem is a linear equation for the final temperature.`);
link('math:ratio', 'current-ohm', () => T`Ohm's law says that the current is proportional to the voltage.`);
link('math:fractions', 'dc-circuits', () => T`Parallel resistances are combined by adding reciprocals, as with fractions.`);
link('math:systems', 'dc-circuits', () => T`Kirchhoff's rules give simultaneous linear equations for the unknown currents.`);
link('math:trig-basics', 'shm', () => T`Simple harmonic motion is described by sine and cosine functions of time.`);
link('math:ode', 'shm', () => T`The equation of simple harmonic motion is a second-order differential equation.`);
link('math:exp-log', 'sound', () => T`The decibel scale for loudness is logarithmic.`);
link('math:derivatives', 'induction', () => T`Faraday's law involves the rate of change of magnetic flux, a derivative.`);
link('math:complex', 'ac', () => T`Alternating-current circuits are analysed neatly with complex numbers.`);
link('math:fractions', 'mirrors', () => T`The mirror equation adds the reciprocals of the object and image distances.`);
link('math:trig-basics', 'lenses', () => T`Snell's law of refraction relates the sines of two angles.`);
link('math:exp-log', 'radioactivity', () => T`Radioactive decay is exponential, and half-life problems use logarithms.`);

/* ---------- A. Foundations ---------- */
link('units', 'measurement', () => T`Every measurement is a number together with a unit.`);
link('units', 'vectors', () => T`Every vector quantity has a magnitude with a unit.`);
link('units', 'linear-motion', () => T`Speeds and times must be in consistent units, such as m/s and s, before using the equations of motion.`);
link('units', 'heat', () => T`Heat problems mix units such as g, kg, J and °C that often need converting.`);
link('units', 'current-ohm', () => T`Current, voltage and resistance each have their own SI unit: A, V and Ω.`);
link('vectors', 'projectile', () => T`Projectile motion treats the velocity as two perpendicular components.`);
link('vectors', 'newton', () => T`Forces are vectors, and the net force is their vector sum.`);
link('vectors', 'electrostatics', () => T`Electric forces and fields from several charges add as vectors.`);

/* ---------- B. Mechanics ---------- */
link('linear-motion', 'free-fall', () => T`Free fall is motion with a constant acceleration $g$.`);
link('free-fall', 'projectile', () => T`The vertical part of a projectile's motion is free fall.`);
link('linear-motion', 'newton', () => T`Newton's second law links forces to the acceleration described in kinematics.`);
link('linear-motion', 'circular', () => T`Circular motion extends speed and acceleration to motion around a circle.`);
link('newton', 'friction-incline', () => T`Friction and slope problems are solved with $\Sigma F = ma$.`);
link('newton', 'work-energy', () => T`Work is done by the same forces that Newton's laws describe.`);
link('newton', 'momentum', () => T`Impulse is Newton's second law written as $F\,\Delta t = \Delta p$.`);
link('work-energy', 'momentum', () => T`Collisions are classified by comparing kinetic energy before and after.`);
link('newton', 'circular', () => T`A centripetal force is needed to keep an object moving in a circle.`);
link('circular', 'rotation', () => T`Rotation uses angular speed and angular acceleration, as in circular motion.`);
link('newton', 'rotation', () => T`Torque does for rotation what force does for motion in a straight line.`);
link('rotation', 'equilibrium', () => T`A rigid body is in equilibrium when both the net force and the net torque are zero.`);
link('circular', 'gravitation', () => T`An orbit is circular motion with gravity providing the centripetal force.`);
link('newton', 'elasticity', () => T`The spring force $F = kx$ enters Newton's laws like any other force.`);
link('newton', 'fluid-statics', () => T`Pressure is force per area, and buoyancy is found by balancing forces.`);
link('fluid-statics', 'fluid-dynamics', () => T`Moving fluids build on the ideas of pressure and density.`);
link('work-energy', 'fluid-dynamics', () => T`Bernoulli's equation is conservation of energy for a flowing fluid.`);
link('momentum', 'center-of-mass', () => T`The centre of mass moves as if the whole momentum were carried by one particle.`);
link('rotation', 'center-of-mass', () => T`Angular momentum is the rotational version of momentum.`);

/* ---------- C. Waves ---------- */
link('elasticity', 'shm', () => T`A mass on a spring is the standard example of simple harmonic motion.`);
link('circular', 'shm', () => T`Simple harmonic motion is the shadow of uniform circular motion.`);
link('shm', 'mech-waves', () => T`A wave is a chain of oscillations passed from particle to particle.`);
link('mech-waves', 'sound', () => T`Sound is a longitudinal mechanical wave.`);

/* ---------- D. Heat ---------- */
link('heat', 'gases', () => T`The gas laws use absolute temperature, in kelvin.`);
link('gases', 'thermo-laws', () => T`The laws of thermodynamics are applied to gases being heated, expanded and compressed.`);
link('work-energy', 'thermo-laws', () => T`The first law of thermodynamics is conservation of energy with heat included.`);
link('heat', 'heat-transfer', () => T`Heat transfer describes how heat travels from hot places to cold ones.`);

/* ---------- E. Electricity & magnetism ---------- */
link('work-energy', 'current-ohm', () => T`Electrical power and energy use the same definitions as in mechanics: $P = W/t$.`);
link('current-ohm', 'dc-circuits', () => T`Every part of a circuit obeys $V = IR$.`);
link('electrostatics', 'capacitors', () => T`Electric potential is the energy per unit charge in an electric field.`);
link('dc-circuits', 'capacitors', () => T`Capacitors are charged and discharged through resistors in circuits.`);
link('current-ohm', 'magnetism', () => T`A current in a wire produces a magnetic field and feels a force in one.`);
link('magnetism', 'induction', () => T`Induction is caused by a changing magnetic field.`);
link('induction', 'ac', () => T`Generators use induction to produce alternating current.`);
link('dc-circuits', 'ac', () => T`AC circuits extend resistance, current and power from DC circuits.`);
link('induction', 'em-waves', () => T`Changing electric and magnetic fields create each other and travel as light.`);
link('mech-waves', 'em-waves', () => T`Electromagnetic waves obey the same wave equation, $v = f\lambda$.`);

/* ---------- F. Optics ---------- */
link('mirrors', 'lenses', () => T`Lenses use the same ray diagrams and the same equation as mirrors.`);
link('lenses', 'instruments', () => T`Eyes, magnifiers, microscopes and telescopes are built from lenses.`);
link('mech-waves', 'interference', () => T`Interference happens for every kind of wave, including light.`);
link('em-waves', 'interference', () => T`Interference and diffraction show that light is a wave.`);

/* ---------- G. Modern physics ---------- */
link('linear-motion', 'relativity', () => T`Relativity revisits what speed, time and distance mean close to the speed of light.`);
link('em-waves', 'photons', () => T`Light that travels as a wave also arrives in packets of energy called photons.`);
link('current-ohm', 'photons', () => T`Photon energies are often given in electronvolts, the energy an electron gains across 1 V.`);
link('photons', 'atoms', () => T`Atoms emit and absorb light as photons of particular energies.`);
link('atoms', 'radioactivity', () => T`Radioactivity happens in the nucleus at the centre of the atom.`);
link('radioactivity', 'nuclear-energy', () => T`Fission and fusion release the binding energy of nuclei.`);
link('relativity', 'nuclear-energy', () => T`$E = mc^2$ gives the energy released when mass is lost.`);

/* ---------- H. Technology ---------- */
link('work-energy', 'renewables', () => T`Every energy source is judged by the energy and power it can deliver.`);
link('induction', 'renewables', () => T`Wind turbines and power-station generators rely on induction.`);
link('heat-transfer', 'climate', () => T`The greenhouse effect is about how the Earth absorbs and radiates heat.`);
link('em-waves', 'climate', () => T`Greenhouse gases absorb infrared radiation.`);
link('dc-circuits', 'electronics', () => T`Electronic circuits follow the same rules for current and voltage.`);
link('atoms', 'electronics', () => T`Semiconductors are explained by the energy levels of electrons in solids.`);
