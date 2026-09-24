/* ==========================================================================
   TRACK B — Mechanics
   ========================================================================== */
(() => {
const vtLabel = () => T`A velocity–time graph`;

level({
  id: 'mechanics', mark: 'B', name: 'Mechanics', short: 'Mechanics', band: 'Motion · forces · energy · momentum', color: 'lv2',
  blurb: 'How things move and why: describing motion, Newton’s laws, friction, energy and momentum, and later rotation, gravity and fluids.',
  topics: [
/* ------------------------------------------------------------------ */
{
  id: 'linear-motion', stage: 'jh', title: 'Motion in a Straight Line',
  blurb: 'Distance and displacement, speed and velocity, acceleration, the equations of uniform acceleration and motion graphs.',
  lesson: () => T`
<p>To describe motion along a line we choose a starting point and a positive direction. Then every position is a number, and every change of position is a <b>displacement</b>.</p>
<h3>Distance and displacement, speed and velocity</h3>
<ul><li><b>Distance</b> is the total length of the path (a scalar). <b>Displacement</b> is the change in position, with a direction (a vector). Walk $5\,\mathrm{m}$ forward and $5\,\mathrm{m}$ back: distance $10\,\mathrm{m}$, displacement $0$.</li>
<li><b>Average speed</b> $=\dfrac{\text{distance}}{\text{time}}$ and <b>average velocity</b> $=\dfrac{\text{displacement}}{\text{time}}$.</li></ul>
<h3>Uniform motion</h3>
<p>If the velocity is constant, the object covers equal distances in equal times:</p>
${Fm(T`s = v\,t`)}
<h3>Acceleration</h3>
<p><b>Acceleration</b> is the rate of change of velocity. Its unit is $\mathrm{m/s}$ per second, written $\mathrm{m/s^2}$:</p>
${Fm(T`a = \frac{\Delta v}{\Delta t} = \frac{v - v_0}{t}`)}
<p>A negative acceleration (when the velocity is positive) means the object is slowing down; this is often called <i>deceleration</i>.</p>
${Key(T`<p>For <b>constant acceleration</b>, with initial velocity $v_0$, final velocity $v$, time $t$ and displacement $s$:</p><p>$$v = v_0 + a t$$ $$s = v_0 t + \tfrac{1}{2} a t^2$$ $$v^2 = v_0^2 + 2 a s$$</p><p>Pick the equation that contains the three quantities you know and the one you want.</p>`)}
${Ex(T`<p>A car at $20\,\mathrm{m/s}$ brakes with a deceleration of $5\,\mathrm{m/s^2}$. How far does it travel before stopping?</p><p>We know $v_0 = 20$, $v = 0$, $a = -5$ and want $s$, so use $v^2 = v_0^2 + 2as$:</p><p>$$0 = 20^2 + 2(-5)s \;\Rightarrow\; s = \frac{400}{10} = 40\,\mathrm{m}.$$</p>`)}
<h3>Motion graphs</h3>
${Fig(graphSvg([[0, 4], [4, 12], [8, 12]], { xMax: 8, yMax: 14, xStep: 2, yStep: 2, label: vtLabel() }), T`Speeding up for 4 s, then moving at a constant 12 m/s.`)}
<ul><li>On a <b>position–time</b> graph the slope is the velocity.</li><li>On a <b>velocity–time</b> graph the slope is the acceleration and the <b>area under the graph</b> is the displacement.</li></ul>
<p>In the graph above the acceleration during the first $4\,\mathrm{s}$ is $\frac{12 - 4}{4} = 2\,\mathrm{m/s^2}$, and the displacement over $8\,\mathrm{s}$ is the trapezium $\frac{4 + 12}{2} \cdot 4 = 32\,\mathrm{m}$ plus the rectangle $12 \cdot 4 = 48\,\mathrm{m}$: $80\,\mathrm{m}$ in total.</p>
${Tip(T`<p>Convert km/h to m/s before using the equations: $72\,\mathrm{km/h} = 20\,\mathrm{m/s}$.</p>`)}`,
  gens: [
    () => {
      const d = ri(12, 90) * 10, t = ri(4, 20) * 5, v = sig(d / t);
      return { q: T`A cyclist rides ${Q(d, 'm')} in ${Q(t, 's')}. What is the average speed?`, a: v, u: 'm/s', w: [sig(t / d, 3), sig(d * t, 3), sig(d / t * 3.6)],
        s: T`Average speed $= \frac{\text{distance}}{\text{time}} = \frac{${d}}{${t}} = ${QT(v, 'm/s')}$.` };
    },
    () => {
      const v = ri(4, 30), t = ri(5, 60), findS = chance(), s = v * t;
      return findS
        ? { q: T`A train moves at a constant ${Q(v, 'm/s')}. How far does it travel in ${Q(t, 's')}?`, a: s, u: 'm', w: [sig(v / t), sig(t / v), v + t], s: T`$s = vt = ${v} \times ${t} = ${QT(s, 'm')}$.` }
        : { q: T`A ship sails at a constant ${Q(v, 'm/s')}. How long does it take to cover ${Q(s, 'm')}?`, a: t, u: 's', w: [s * v, sig(v / s, 3), s - v], s: T`$t = \frac{s}{v} = \frac{${s}}{${v}} = ${QT(t, 's')}$.` };
    },
    () => {
      const v0 = ri(0, 10), a = ri(1, 6) / (chance() ? 1 : 2), t = ri(2, 10), v = sig(v0 + a * t, 6);
      return { q: T`A car moving at ${Q(v0, 'm/s')} speeds up to ${Q(v, 'm/s')} in ${Q(t, 's')}. What is its acceleration?`, a, u: 'm/s²', w: [sig(v / t), sig((v + v0) / t), sig((v - v0) * t)],
        s: T`$a = \frac{v - v_0}{t} = \frac{${M(v)} - ${v0}}{${t}} = ${QT(a, 'm/s^2')}$.` };
    },
    () => {
      const v0 = ri(2, 15), a = ri(1, 8) / 2, t = ri(2, 12), v = sig(v0 + a * t, 6), s = sig(v0 * t + 0.5 * a * t * t, 6), findS = chance();
      return findS
        ? { q: T`An object starts at ${Q(v0, 'm/s')} and accelerates uniformly at ${Q(a, 'm/s^2')} for ${Q(t, 's')}. How far does it travel in this time?`, a: s, u: 'm', w: [sig(v0 * t + a * t * t, 6), sig(0.5 * a * t * t, 6), sig(v0 * t, 6)],
            s: T`$s = v_0 t + \tfrac12 a t^2 = ${v0} \cdot ${t} + \tfrac12 \cdot ${M(a)} \cdot ${t}^2 = ${M(v0 * t)} + ${M(sig(0.5 * a * t * t, 6))} = ${QT(s, 'm')}$.` }
        : { q: T`An object starts at ${Q(v0, 'm/s')} and accelerates uniformly at ${Q(a, 'm/s^2')}. What is its velocity after ${Q(t, 's')}?`, a: v, u: 'm/s', w: [sig(a * t, 6), sig(v0 + a, 6), sig(v0 * a * t, 6)],
            s: T`$v = v_0 + at = ${v0} + ${M(a)} \cdot ${t} = ${QT(v, 'm/s')}$.` };
    },
    () => {
      const v0 = pick([10, 12, 15, 16, 18, 20, 24, 25, 30]), a = pick([2, 3, 4, 5, 6, 8]), s = sig(v0 * v0 / (2 * a));
      return { q: T`A car travelling at ${Q(v0, 'm/s')} brakes with a constant deceleration of ${Q(a, 'm/s^2')}. What distance does it need to stop?`, a: s, u: 'm', w: [sig(v0 * v0 / a), sig(v0 / a), sig(v0 * v0 / (4 * a))],
        s: T`Use $v^2 = v_0^2 + 2as$ with $v = 0$ and $a = -${a}$: $0 = ${v0}^2 - 2 \cdot ${a} \cdot s$, so $s = \frac{${v0 * v0}}{${2 * a}} = ${QT(s, 'm')}$.` };
    },
    () => {
      const v0 = ri(0, 3) * 2, t1 = ri(2, 4) * 2, v1 = v0 + ri(2, 5) * 2, t2 = t1 + ri(1, 3) * 2, askArea = chance();
      const area = (v0 + v1) / 2 * t1 + v1 * (t2 - t1), acc = sig((v1 - v0) / t1);
      const fig = Fig(graphSvg([[0, v0], [t1, v1], [t2, v1]], { xMax: t2, yMax: v1 + 2, xStep: 2, yStep: 2, label: vtLabel() }));
      return askArea
        ? { q: T`The graph shows how the velocity of a trolley changes with time. What is its displacement from $t = 0$ to $t = ${t2}\,\mathrm{s}$?` + fig, a: area, u: 'm', w: [v1 * t2, sig((v0 + v1) / 2 * t2), (v0 + v1) / 2 * t1],
            s: T`The displacement is the area under the graph: a trapezium $\frac{${v0} + ${v1}}{2} \cdot ${t1} = ${M((v0 + v1) / 2 * t1)}$ plus a rectangle $${v1} \cdot ${t2 - t1} = ${M(v1 * (t2 - t1))}$, giving ${Q(area, 'm')}.` }
        : { q: T`The graph shows how the velocity of a trolley changes with time. What is its acceleration during the first ${Q(t1, 's')}?` + fig, a: acc, u: 'm/s²', w: [sig(v1 / t1), 0, sig((v1 - v0) * t1)],
            s: T`The acceleration is the slope of the graph: $a = \frac{${v1} - ${v0}}{${t1}} = ${QT(acc, 'm/s^2')}$. After $t = ${t1}\,\mathrm{s}$ the line is flat, so the acceleration is zero.` };
    },
  ],
},
/* ------------------------------------------------------------------ */
{
  id: 'free-fall', stage: 'sh', title: 'Vertical Motion & Free Fall',
  blurb: 'Dropping and throwing objects: free fall with constant g, time of fall, impact speed and maximum height.',
  lesson: () => T`
<p>Without air resistance every object near the Earth's surface falls with the same acceleration, whatever its mass. This is the acceleration due to gravity, $g \approx 9.8\,\mathrm{m/s^2}$; many problems round it to $10\,\mathrm{m/s^2}$. Each question on this site tells you which value to use.</p>
<p>Vertical motion is just motion with constant acceleration, so the equations of the previous topic apply with $a = g$ pointing downwards.</p>
<h3>Dropped from rest</h3>
${Fm(T`v = g t \qquad h = \tfrac12 g t^2 \qquad v = \sqrt{2 g h}`)}
${Ex(T`<p>A stone is dropped from a bridge $45\,\mathrm{m}$ above the water ($g = 10\,\mathrm{m/s^2}$).</p><p>Time to fall: $45 = \tfrac12 \cdot 10 \cdot t^2 \Rightarrow t^2 = 9 \Rightarrow t = 3\,\mathrm{s}$.</p><p>Speed on impact: $v = gt = 30\,\mathrm{m/s}$, or $v = \sqrt{2 \cdot 10 \cdot 45} = 30\,\mathrm{m/s}$.</p>`)}
<h3>Thrown straight up</h3>
<p>Take upwards as positive; then $a = -g$. The ball slows down, stops for an instant at the top, and falls back.</p>
${Key(T`<p>For a ball thrown up at $v_0$:</p><ul><li>time to the top: $t_{\text{up}} = \dfrac{v_0}{g}$</li><li>maximum height: $h_{\max} = \dfrac{v_0^2}{2g}$</li><li>it returns to the launch point after $2t_{\text{up}}$, with the same speed it started with.</li></ul>`)}
${Tip(T`<p>At the top the <b>velocity</b> is zero, but the <b>acceleration</b> is still $g$ downwards. If it were zero, the ball would stay up there.</p>`)}`,
  gens: [
    () => {
      const g = gPick(), h = pick([5, 20, 45, 80, 125, 180]), t = sig(Math.sqrt(2 * h / g));
      return { q: T`A ball is dropped from rest from a height of ${Q(h, 'm')}. How long does it take to reach the ground? ${gNote(g)}`, a: t, u: 's', w: [sig(h / g), sig(Math.sqrt(h / g)), sig(2 * h / g)],
        s: T`$h = \tfrac12 g t^2$, so $t = \sqrt{\frac{2h}{g}} = \sqrt{\frac{2 \cdot ${h}}{${M(g)}}} = ${QT(t, 's')}$.` };
    },
    () => {
      const g = gPick(), h = ri(2, 12) * 2.5, v = sig(Math.sqrt(2 * g * h));
      return { q: T`A coconut falls from rest from a height of ${Q(h, 'm')}. How fast is it moving just before it hits the ground? ${gNote(g)}`, a: v, u: 'm/s', w: [sig(Math.sqrt(g * h)), sig(2 * g * h, 4), sig(g * h / 10)],
        s: T`$v = \sqrt{2gh} = \sqrt{2 \cdot ${M(g)} \cdot ${h}} = \sqrt{${M(sig(2 * g * h, 6))}} \approx ${QT(v, 'm/s')}$.` };
    },
    () => {
      const g = gPick(), t = ri(1, 6) / (chance() ? 1 : 2), h = sig(0.5 * g * t * t), v = sig(g * t), askV = chance();
      return askV
        ? { q: T`An object falls freely from rest. What is its speed after ${Q(t, 's')}? ${gNote(g)}`, a: v, u: 'm/s', w: [h, sig(g / t), sig(0.5 * g * t)], s: T`$v = gt = ${M(g)} \cdot ${M(t)} = ${QT(v, 'm/s')}$.` }
        : { q: T`An object falls freely from rest. How far does it fall in the first ${Q(t, 's')}? ${gNote(g)}`, a: h, u: 'm', w: [v, sig(g * t * t), sig(0.5 * g * t)], s: T`$h = \tfrac12 g t^2 = \tfrac12 \cdot ${M(g)} \cdot ${M(t)}^2 = ${QT(h, 'm')}$.` };
    },
    () => {
      const g = gPick(), v0 = ri(3, 12) * 2, hm = sig(v0 * v0 / (2 * g));
      return { q: T`A ball is thrown straight up at ${Q(v0, 'm/s')}. What maximum height does it reach above the launch point? ${gNote(g)}`, a: hm, u: 'm', w: [sig(v0 * v0 / g), sig(v0 / g), sig(v0 * v0 / (4 * g))],
        s: T`At the top $v = 0$: $0 = v_0^2 - 2 g h$, so $h = \frac{v_0^2}{2g} = \frac{${v0}^2}{2 \cdot ${M(g)}} = ${QT(hm, 'm')}$.` };
    },
    () => {
      const g = gPick(), v0 = ri(3, 12) * 2, tu = sig(v0 / g), tt = sig(2 * v0 / g), total = chance();
      return total
        ? { q: T`A ball is thrown straight up at ${Q(v0, 'm/s')} and caught at the same height. How long is it in the air? ${gNote(g)}`, a: tt, u: 's', w: [tu, sig(v0 * v0 / g), sig(4 * v0 / g)], s: T`Time up: $t = \frac{v_0}{g} = \frac{${v0}}{${M(g)}} = ${M(tu)}\,\mathrm{s}$. The fall takes just as long, so the total is ${Q(tt, 's')}.` }
        : { q: T`A ball is thrown straight up at ${Q(v0, 'm/s')}. How long does it take to reach its highest point? ${gNote(g)}`, a: tu, u: 's', w: [tt, sig(v0 * g, 4), sig(v0 * v0 / (2 * g))], s: T`At the top $v = 0$: $0 = v_0 - g t$, so $t = \frac{v_0}{g} = \frac{${v0}}{${M(g)}} = ${QT(tu, 's')}$.` };
    },
    () => {
      const k = pick([0, 1, 2]);
      if (k === 0) return { q: T`A heavy steel ball and a light plastic ball of the same size are dropped together from the same height. Ignoring air resistance, which lands first?`, a: T`They land at the same time`, w: [T`The steel ball`, T`The plastic ball`, T`It depends on the height`], only: 'mc', s: T`Without air resistance all objects fall with the same acceleration $g$, whatever their mass, so they land together.` };
      if (k === 1) return { q: T`A ball is thrown straight up. At the very top of its path, which statement is true?`, a: T`Its velocity is zero and its acceleration is $g$ downwards`, w: [T`Its velocity and acceleration are both zero`, T`Its velocity is zero and it has no forces on it`, T`Its acceleration is zero and its velocity is $g$`], only: 'mc', s: T`The ball stops for an instant, so $v = 0$, but gravity still acts, so the acceleration is still $g$ downwards.` };
      return { q: T`A ball thrown upwards returns to the thrower's hand. Compared with the speed it was thrown at, its speed when caught (without air resistance) is:`, a: T`the same`, w: [T`larger`, T`smaller`, T`zero`], only: 'mc', s: T`The motion is symmetric: the fall back from the top mirrors the rise, so the ball arrives with the same speed it left with, now pointing downwards.` };
    },
  ],
},
/* ------------------------------------------------------------------ */
{
  id: 'projectile', stage: 'sh', title: 'Projectile Motion',
  blurb: 'Motion in two dimensions: horizontal launches, time of flight, maximum height and range.',
  lesson: () => T`
<p>A <b>projectile</b> is an object that moves under gravity alone after it is launched: a kicked ball, a stone thrown off a cliff, water from a hose. Its path is a parabola.</p>
${Key(T`<p>Split the motion into two parts that do not affect each other:</p><ul><li><b>Horizontal:</b> no force, so the velocity $v_x$ is constant: $x = v_x t$.</li><li><b>Vertical:</b> constant acceleration $g$ downwards, exactly like free fall.</li></ul><p>The time $t$ is the only thing the two parts share.</p>`)}
<h3>Launched horizontally</h3>
<p>A ball rolls off a table of height $h$ at speed $v$. Vertically it starts from rest, so the time to land is found from the height alone: $t = \sqrt{2h/g}$. Horizontally it moves at constant speed, so it lands a distance $x = v t$ from the table.</p>
<h3>Launched at an angle</h3>
<p>A launch at speed $v_0$ and angle $\theta$ has components $v_{0x} = v_0\cos\theta$ and $v_{0y} = v_0\sin\theta$. On level ground:</p>
${Fm(T`T = \frac{2 v_0 \sin\theta}{g} \qquad H = \frac{v_0^2 \sin^2\theta}{2g} \qquad R = \frac{v_0^2 \sin 2\theta}{g}`)}
${Fig(projectileSvg(20, 50, 10, T`The path of a projectile with its launch velocity, maximum height and range marked`), T`Time of flight $T$, maximum height $H$ and range $R$.`)}
<p>The range is largest at $\theta = 45^\circ$ (where $\sin 2\theta = 1$). Two angles that add up to $90^\circ$, such as $30^\circ$ and $60^\circ$, give the same range.</p>
${Tip(T`<p>At the top of the path the vertical velocity is zero, but the horizontal velocity is not. The projectile is still moving sideways at $v_0\cos\theta$.</p>`)}`,
  gens: [
    () => {
      const g = gPick(), h = pick([0.8, 1.25, 1.8, 5, 20, 45, 80]), v = ri(2, 15), t = Math.sqrt(2 * h / g), x = sig(v * t);
      return { q: T`A ball rolls off a horizontal table ${Q(h, 'm')} high at ${Q(v, 'm/s')}. How far from the foot of the table does it land? ${gNote(g)}`, a: x, u: 'm', w: [sig(v * h), sig(v * 2 * h / g), sig(v * Math.sqrt(h / g))],
        s: T`Time to fall: $t = \sqrt{\frac{2h}{g}} = \sqrt{\frac{2 \cdot ${M(h)}}{${M(g)}}} = ${M(sig(t))}\,\mathrm{s}$. Horizontal distance: $x = vt = ${v} \cdot ${M(sig(t))} = ${QT(x, 'm')}$.` };
    },
    () => {
      const g = gPick(), v0 = ri(4, 15) * 2, th = pick([30, 37, 45, 53, 60]), T0 = sig(2 * v0 * sinD(th) / g);
      return { q: T`A ball is kicked from level ground at ${Q(v0, 'm/s')} at ${Q(th, '°')} above the horizontal. How long is it in the air? ${gNote(g)}`, a: T0, u: 's', w: [sig(v0 * sinD(th) / g), sig(2 * v0 * cosD(th) / g), sig(2 * v0 / g)],
        s: T`$T = \frac{2 v_0 \sin\theta}{g} = \frac{2 \cdot ${v0} \sin ${th}^\circ}{${M(g)}} = ${QT(T0, 's')}$.` };
    },
    () => {
      const g = gPick(), v0 = ri(4, 15) * 2, th = pick([30, 37, 45, 53, 60]), H = sig((v0 * sinD(th)) ** 2 / (2 * g));
      return { q: T`A stone is thrown from level ground at ${Q(v0, 'm/s')} at ${Q(th, '°')} above the horizontal. What is its maximum height? ${gNote(g)}`, a: H, u: 'm', w: [sig(v0 * v0 / (2 * g)), sig((v0 * sinD(th)) ** 2 / g), sig((v0 * cosD(th)) ** 2 / (2 * g))],
        s: T`$H = \frac{(v_0 \sin\theta)^2}{2g} = \frac{(${v0} \sin ${th}^\circ)^2}{2 \cdot ${M(g)}} = ${QT(H, 'm')}$.` };
    },
    () => {
      const g = gPick(), v0 = ri(4, 15) * 2, th = pick([15, 30, 37, 45, 53, 60, 75]), R = sig(v0 * v0 * sinD(2 * th) / g);
      return { q: T`A projectile is launched from level ground at ${Q(v0, 'm/s')} and ${Q(th, '°')}. How far away does it land? ${gNote(g)}` + Fig(projectileSvg(v0, th, g, T`The path of the projectile`)), a: R, u: 'm', w: [sig(v0 * v0 / g), sig(v0 * v0 * sinD(th) / g), sig(v0 * v0 * sinD(2 * th) / (2 * g))],
        s: T`$R = \frac{v_0^2 \sin 2\theta}{g} = \frac{${v0}^2 \sin ${2 * th}^\circ}{${M(g)}} = ${QT(R, 'm')}$.` };
    },
    () => {
      const th = pick([15, 20, 25, 30, 35, 40, 50, 55, 60, 65, 70, 75]);
      return { q: T`A cannon fired at ${Q(th, '°')} lands a shell on level ground some distance away. At what other launch angle (same speed) would the shell land at the same distance?`, a: 90 - th, u: '°', w: [180 - th, 2 * th, 45], neg: false,
        s: T`The range depends on $\sin 2\theta$, and $\sin 2\theta = \sin(180^\circ - 2\theta) = \sin 2(90^\circ - \theta)$. So $\theta$ and $90^\circ - \theta = ${90 - th}^\circ$ give the same range.` };
    },
    () => ({ q: T`A ball is kicked at an angle. At the highest point of its path, which is true (ignoring air resistance)?`, a: T`Its vertical velocity is zero but its horizontal velocity is not`, w: [T`Its velocity is zero`, T`Its horizontal velocity is zero`, T`Its acceleration is zero`], only: 'mc',
      s: T`The horizontal velocity $v_0\cos\theta$ never changes. Only the vertical velocity drops to zero at the top, while the acceleration stays $g$ downwards.` }),
  ],
},
/* ------------------------------------------------------------------ */
{ id: 'circular', stage: 'sh', soon: true, title: 'Circular Motion' },
/* ------------------------------------------------------------------ */
{
  id: 'newton', stage: 'sh', title: 'Newton’s Laws of Motion',
  blurb: 'Inertia, F = ma, action and reaction, weight and normal force, free-body diagrams, lifts and connected objects.',
  lesson: () => T`
<p>A <b>force</b> is a push or a pull, measured in newtons ($\mathrm{N}$). Newton's three laws link forces to motion.</p>
<h3>First law: inertia</h3>
<p>An object stays at rest, or keeps moving at constant velocity, unless a resultant (net) force acts on it. A passenger lurches forward when a bus brakes because their body tends to keep moving.</p>
<h3>Second law: $F = ma$</h3>
${Fm(T`\Sigma F = m a`)}
<p>The <b>net force</b> $\Sigma F$ is the vector sum of all forces on the object. A larger net force gives a larger acceleration; a larger mass gives a smaller one. $1\,\mathrm{N}$ is the force that gives $1\,\mathrm{kg}$ an acceleration of $1\,\mathrm{m/s^2}$.</p>
<h3>Third law: action and reaction</h3>
<p>If body A pushes on body B, then B pushes back on A with a force of equal size in the opposite direction. The two forces act on <b>different</b> bodies, so they never cancel each other.</p>
<h3>Common forces</h3>
<ul><li><b>Weight</b> $W = mg$, pulling towards the centre of the Earth.</li><li><b>Normal force</b> $N$, from a surface, perpendicular to it.</li><li><b>Tension</b> $T$, along a rope or string.</li><li><b>Friction</b> $f$, along a surface, against sliding (next topic).</li></ul>
${Key(T`<p>Solving a force problem:</p><ol><li>Draw a <b>free-body diagram</b>: the object alone, with every force on it as an arrow.</li><li>Choose a positive direction.</li><li>Write $\Sigma F = ma$ along that direction and solve.</li></ol>`)}
${Fig(fbdSvg([{ ang: 90, len: 70, label: 'N', kind: 'b' }, { ang: 270, len: 70, label: 'W' }, { ang: 0, len: 90, label: 'F' }, { ang: 180, len: 45, label: 'f', kind: 'c', ground: true }], T`Free-body diagram of a block pulled along the floor: normal force up, weight down, pull to the right and friction to the left`), T`A block pulled to the right: $N$ balances $W$, and the net force is $F - f$.`)}
${Ex(T`<p>A $60\,\mathrm{kg}$ person stands on scales in a lift accelerating <b>upwards</b> at $2\,\mathrm{m/s^2}$ ($g = 10\,\mathrm{m/s^2}$). Upwards is positive:</p><p>$$N - mg = ma \;\Rightarrow\; N = m(g + a) = 60 \cdot 12 = 720\,\mathrm{N}.$$</p><p>The scales read more than the person's weight of $600\,\mathrm{N}$. Accelerating downwards, they would read $m(g - a) = 480\,\mathrm{N}$.</p>`)}`,
  gens: [
    () => {
      const m = ri(2, 40) * (chance() ? 1 : 5), a = ri(1, 12) / (chance() ? 1 : 2), F = sig(m * a, 6), ask = pick(['a', 'F', 'm']);
      if (ask === 'a') return { q: T`A net force of ${Q(F, 'N')} acts on a ${Q(m, 'kg')} trolley. What is its acceleration?`, a, u: 'm/s²', w: [sig(F * m, 4), sig(m / F), sig(F / m / 2)], s: T`$a = \frac{\Sigma F}{m} = \frac{${M(F)}}{${m}} = ${QT(a, 'm/s^2')}$.` };
      if (ask === 'F') return { q: T`What net force is needed to give a ${Q(m, 'kg')} box an acceleration of ${Q(a, 'm/s^2')}?`, a: F, u: 'N', w: [sig(m / a), sig(a / m), sig(m + a)], s: T`$\Sigma F = ma = ${m} \cdot ${M(a)} = ${QT(F, 'N')}$.` };
      return { q: T`A net force of ${Q(F, 'N')} gives a cart an acceleration of ${Q(a, 'm/s^2')}. What is the cart's mass?`, a: m, u: 'kg', w: [sig(F * a, 4), sig(a / F), sig(F - a)], s: T`$m = \frac{\Sigma F}{a} = \frac{${M(F)}}{${M(a)}} = ${QT(m, 'kg')}$.` };
    },
    () => {
      const m = ri(2, 20), F1 = ri(10, 60), F2 = ri(2, F1 - 4), a = sig((F1 - F2) / m);
      return { q: T`A ${Q(m, 'kg')} block on a smooth floor is pulled to the right with ${Q(F1, 'N')} and to the left with ${Q(F2, 'N')}. What is its acceleration?`
          + Fig(fbdSvg([{ ang: 0, len: 95, label: `${F1} N` }, { ang: 180, len: Math.max(35, 95 * F2 / F1), label: `${F2} N`, kind: 'b' }], T`A block with a force to the right and a smaller force to the left`)),
        a, u: 'm/s²', w: [sig((F1 + F2) / m), sig(F1 / m), sig((F1 - F2) * m, 4)],
        s: T`The net force is $${F1} - ${F2} = ${F1 - F2}\,\mathrm{N}$ to the right, so $a = \frac{${F1 - F2}}{${m}} = ${QT(a, 'm/s^2')}$ to the right.` };
    },
    () => {
      const m = ri(5, 120), onMoon = chance(), g = onMoon ? 1.6 : gPick(), W = sig(m * g);
      return onMoon
        ? { q: T`An astronaut's equipment has a mass of ${Q(m, 'kg')}. What does it weigh on the Moon, where $g = ${QT(1.6, 'm/s^2')}$?`, a: W, u: 'N', w: [m, sig(m * 10), sig(m / 1.6)], s: T`$W = mg = ${m} \cdot 1.6 = ${QT(W, 'N')}$. The mass is still ${Q(m, 'kg')}; only the weight changes.` }
        : { q: T`What is the weight of a ${Q(m, 'kg')} sack of rice? ${gNote(g)}`, a: W, u: 'N', w: [m, sig(m / g), sig(m * g / 2)], s: T`$W = mg = ${m} \cdot ${M(g)} = ${QT(W, 'N')}$.` };
    },
    () => {
      const g = gPick(), m = ri(4, 9) * 10, a = ri(1, 4) / (chance() ? 1 : 2), up = chance(), N = sig(m * (up ? g + a : g - a));
      return { q: T`A ${Q(m, 'kg')} student stands on bathroom scales in a lift that is accelerating ${up ? T`upwards` : T`downwards`} at ${Q(a, 'm/s^2')}. What force do the scales read? ${gNote(g)}`, a: N, u: 'N', w: [sig(m * g), sig(m * (up ? g - a : g + a)), sig(m * a)],
        s: T`Taking upwards as positive: $N - mg = m(${up ? '' : '-'}a)$, so $N = m(g ${up ? '+' : '-'} a) = ${m}(${M(g)} ${up ? '+' : '-'} ${M(a)}) = ${QT(N, 'N')}$.` };
    },
    () => {
      const m1 = ri(1, 8), m2 = ri(1, 8), F = ri(3, 20) * 2, a = sig(F / (m1 + m2)), Tn = sig(m1 * F / (m1 + m2)), askT = chance();
      return askT
        ? { q: T`Two blocks, A (${Q(m1, 'kg')}) and B (${Q(m2, 'kg')}), are joined by a light string on a smooth table. B is pulled with a horizontal force of ${Q(F, 'N')}, dragging A behind it. What is the tension in the string?`, a: Tn, u: 'N', w: [F, sig(m2 * F / (m1 + m2)), sig(F / 2)],
            s: T`Both blocks share $a = \frac{F}{m_A + m_B} = \frac{${F}}{${m1 + m2}} = ${M(a)}\,\mathrm{m/s^2}$. The string is the only force on A, so $T = m_A a = ${m1} \cdot ${M(a)} = ${QT(Tn, 'N')}$.` }
        : { q: T`Two blocks of ${Q(m1, 'kg')} and ${Q(m2, 'kg')} are joined by a light string on a smooth table and pulled with a horizontal force of ${Q(F, 'N')}. What is their acceleration?`, a, u: 'm/s²', w: [sig(F / m1), sig(F / m2), sig(F * (m1 + m2), 4)],
            s: T`Treat both blocks as one object of mass $${m1} + ${m2} = ${m1 + m2}\,\mathrm{kg}$: $a = \frac{${F}}{${m1 + m2}} = ${QT(a, 'm/s^2')}$.` };
    },
    () => {
      const k = pick([0, 1, 2]);
      if (k === 0) return { q: T`A book rests on a table. The Earth pulls the book down with its weight. According to Newton's third law, what is the reaction to this force?`, a: T`The book pulls the Earth upwards`, w: [T`The table pushes the book upwards`, T`The book pushes the table downwards`, T`There is no reaction force`], only: 'mc', s: T`Action–reaction pairs act on two different bodies and are the same type of force. The Earth pulls the book by gravity, so the book pulls the Earth by gravity. The table's upward push is a different force (the normal force).` };
      if (k === 1) return { q: T`A spacecraft far from any planet is moving at constant velocity with its engines off. What happens?`, a: T`It keeps moving at the same velocity`, w: [T`It slowly comes to a stop`, T`It speeds up`, T`It starts to curve`], only: 'mc', s: T`With no net force there is no acceleration (Newton's first law), so the velocity stays the same.` };
      return { q: T`A lorry and a small car collide head-on. How do the forces they exert on each other compare?`, a: T`They are equal in size and opposite in direction`, w: [T`The lorry exerts the larger force`, T`The car exerts the larger force`, T`It depends on which is moving faster`], only: 'mc', s: T`By Newton's third law the forces are equal and opposite. The car is damaged more because its smaller mass gives it a larger acceleration.` };
    },
  ],
},
/* ------------------------------------------------------------------ */
{
  id: 'friction-incline', stage: 'sh', title: 'Friction & Inclined Planes',
  blurb: 'Static and kinetic friction, coefficients of friction, and objects on slopes with and without friction.',
  lesson: () => T`
<p><b>Friction</b> is the force between two surfaces that opposes sliding. It acts along the surface, against the motion (or against the motion that would happen without it).</p>
<h3>Static and kinetic friction</h3>
<ul><li><b>Static friction</b> holds an object still. It grows as you push harder, up to a maximum: $f_{s,\max} = \mu_s N$.</li><li><b>Kinetic friction</b> acts once the object slides: $f_k = \mu_k N$, roughly constant.</li></ul>
<p>$\mu_s$ and $\mu_k$ are the <b>coefficients of friction</b>. They have no unit, and usually $\mu_k \lt \mu_s$, which is why it is harder to start pushing a box than to keep it moving. On a level floor with no other vertical forces, $N = mg$.</p>
${Ex(T`<p>A $20\,\mathrm{kg}$ crate is pushed along a floor with $\mu_k = 0.3$ by a $100\,\mathrm{N}$ horizontal force ($g = 10\,\mathrm{m/s^2}$). Friction: $f = 0.3 \cdot 20 \cdot 10 = 60\,\mathrm{N}$. Net force: $100 - 60 = 40\,\mathrm{N}$, so $a = 40/20 = 2\,\mathrm{m/s^2}$.</p>`)}
<h3>Inclined planes</h3>
${Fig(inclineSvg(30, T`A block on a slope inclined at angle theta, with its weight, the normal force and friction`, true), T`On a slope the weight $mg$ is split into two components.`)}
${Key(T`<p>On a slope of angle $\theta$, split the weight into:</p><ul><li>along the slope: $mg\sin\theta$ (pulls the block down the slope)</li><li>perpendicular to the slope: $mg\cos\theta$ (balanced by the normal force, so $N = mg\cos\theta$)</li></ul><p>Sliding down a <b>smooth</b> slope: $a = g\sin\theta$.<br>Sliding down with kinetic friction: $a = g(\sin\theta - \mu_k\cos\theta)$.</p>`)}
<p>A block at rest stays put as long as $mg\sin\theta \le \mu_s mg\cos\theta$, that is, while $\tan\theta \le \mu_s$.</p>
${Tip(T`<p>The normal force on a slope is <b>not</b> $mg$; it is $mg\cos\theta$. Using $mg$ makes the friction too large.</p>`)}`,
  gens: [
    () => {
      const g = gPick(), m = ri(2, 30) * (chance() ? 1 : 2), mu = ri(1, 8) / 10, f = sig(mu * m * g);
      return { q: T`A ${Q(m, 'kg')} box slides across a level floor. The coefficient of kinetic friction is ${NUM(mu)}. What is the friction force? ${gNote(g)}`, a: f, u: 'N', w: [sig(m * g), sig(mu * m), sig(m * g / mu, 4)],
        s: T`$N = mg = ${m} \cdot ${M(g)} = ${M(sig(m * g))}\,\mathrm{N}$, so $f = \mu_k N = ${M(mu)} \cdot ${M(sig(m * g))} = ${QT(f, 'N')}$.` };
    },
    () => {
      const g = gPick(), m = ri(2, 20) * 2, mu = ri(1, 5) / 10, fr = mu * m * g, F = Math.ceil(fr / 10) * 10 + ri(1, 8) * 10, a = sig((F - fr) / m);
      return { q: T`A ${Q(m, 'kg')} crate is pushed along a level floor with a horizontal force of ${Q(F, 'N')}. The coefficient of kinetic friction is ${NUM(mu)}. What is the crate's acceleration? ${gNote(g)}`, a, u: 'm/s²', w: [sig(F / m), sig((F + fr) / m), sig((F - mu * m) / m)],
        s: T`Friction: $f = \mu_k mg = ${M(mu)} \cdot ${m} \cdot ${M(g)} = ${M(sig(fr))}\,\mathrm{N}$. Net force: $${F} - ${M(sig(fr))} = ${M(sig(F - fr))}\,\mathrm{N}$. So $a = \frac{${M(sig(F - fr))}}{${m}} = ${QT(a, 'm/s^2')}$.` };
    },
    () => {
      const g = gPick(), th = pick([20, 25, 30, 37, 45, 53]), a = sig(g * sinD(th));
      return { q: T`A block slides down a smooth (frictionless) slope inclined at ${Q(th, '°')} to the horizontal. What is its acceleration? ${gNote(g)}` + Fig(inclineSvg(th, T`A block on a slope`)), a, u: 'm/s²', w: [sig(g * cosD(th)), g, sig(g * tanD(th))],
        s: T`Along a smooth slope only $mg\sin\theta$ acts, so $a = g\sin\theta = ${M(g)} \sin ${th}^\circ = ${QT(a, 'm/s^2')}$.` };
    },
    () => {
      const g = gPick(), th = pick([30, 37, 45, 53, 60]), mu = ri(1, Math.min(8, Math.floor(tanD(th) * 10) - 1)) / 10, a = sig(g * (sinD(th) - mu * cosD(th)));
      return { q: T`A sledge slides down a snowy slope inclined at ${Q(th, '°')}. The coefficient of kinetic friction is ${NUM(mu)}. What is its acceleration? ${gNote(g)}`, a, u: 'm/s²', w: [sig(g * sinD(th)), sig(g * (sinD(th) + mu * cosD(th))), sig(g * (sinD(th) - mu))],
        s: T`$a = g(\sin\theta - \mu_k\cos\theta) = ${M(g)}(\sin ${th}^\circ - ${M(mu)}\cos ${th}^\circ) = ${QT(a, 'm/s^2')}$.` };
    },
    () => {
      const g = gPick(), m = ri(2, 25), th = pick([20, 30, 37, 45, 53, 60]), N = sig(m * g * cosD(th));
      return { q: T`A ${Q(m, 'kg')} box rests on a ramp inclined at ${Q(th, '°')}. What is the normal force from the ramp on the box? ${gNote(g)}`, a: N, u: 'N', w: [sig(m * g), sig(m * g * sinD(th)), sig(m * g * tanD(th))],
        s: T`Perpendicular to the ramp the forces balance: $N = mg\cos\theta = ${m} \cdot ${M(g)} \cos ${th}^\circ = ${QT(N, 'N')}$.` };
    },
    () => {
      const th = pick([15, 20, 25, 30, 35, 40, 45]), mu = ri(2, 9) / 10, t = tanD(th), slides = t > mu;
      if (Math.abs(t - mu) < 0.04) return null;
      return { q: T`A block is placed at rest on a plank tilted at ${Q(th, '°')}. The coefficient of static friction is ${NUM(mu)}. What happens?`, a: slides ? T`It slides down` : T`It stays at rest`, w: [slides ? T`It stays at rest` : T`It slides down`, T`It slides up the plank`], only: 'mc',
        s: T`It stays put while $\tan\theta \le \mu_s$. Here $\tan ${th}^\circ = ${M(sig(t))}$, which is ${slides ? T`greater than` : T`no more than`} $${M(mu)}$, so ${slides ? T`static friction cannot hold it and it slides` : T`static friction can hold it`}.` };
    },
  ],
},
/* ------------------------------------------------------------------ */
{
  id: 'work-energy', stage: 'sh', title: 'Work, Energy & Power',
  blurb: 'Work done by a force, kinetic and potential energy, conservation of mechanical energy, power and efficiency.',
  lesson: () => T`
<p><b>Energy</b> is the ability to do work, and <b>work</b> is energy transferred by a force. Both are measured in joules ($\mathrm{J}$).</p>
<h3>Work</h3>
${Fm(T`W = F\,s\cos\theta`)}
<p>Here $F$ is the force, $s$ the displacement and $\theta$ the angle between them. Only the part of the force along the motion does work. A force perpendicular to the motion (like the normal force on a level floor) does no work; a force against the motion (like friction) does negative work.</p>
<h3>Kinetic and potential energy</h3>
${Fm(T`E_k = \tfrac12 m v^2 \qquad E_p = m g h`)}
<p>Kinetic energy belongs to motion; gravitational potential energy to height above a chosen reference level.</p>
${Key(T`<p><b>Work–energy theorem:</b> the net work on an object equals its change in kinetic energy, $W_{\text{net}} = \Delta E_k$.</p><p><b>Conservation of mechanical energy:</b> if only gravity does work (no friction),</p><p>$$E_k + E_p = \text{constant}, \qquad \tfrac12 m v_1^2 + m g h_1 = \tfrac12 m v_2^2 + m g h_2.$$</p>`)}
${Ex(T`<p>A roller-coaster car starts from rest $20\,\mathrm{m}$ above the bottom of a smooth track ($g = 10\,\mathrm{m/s^2}$). At the bottom all the potential energy has become kinetic:</p><p>$$mgh = \tfrac12 m v^2 \;\Rightarrow\; v = \sqrt{2gh} = \sqrt{400} = 20\,\mathrm{m/s}.$$</p><p>The mass cancels, so every car reaches the same speed.</p>`)}
<h3>Power and efficiency</h3>
${Fm(T`P = \frac{W}{t} = F v \qquad \eta = \frac{\text{useful output}}{\text{input}} \times 100\%`)}
<p>Power is measured in watts: $1\,\mathrm{W} = 1\,\mathrm{J/s}$.</p>
${Tip(T`<p>Square the speed in $\tfrac12 m v^2$: doubling the speed makes the kinetic energy four times as large.</p>`)}`,
  gens: [
    () => {
      const F = ri(5, 60) * 2, s = ri(2, 30), th = pick([0, 30, 37, 45, 53, 60]), W = sig(F * s * cosD(th));
      return { q: th ? T`A child pulls a sledge ${Q(s, 'm')} along level snow with a rope that makes ${Q(th, '°')} with the ground. The tension is ${Q(F, 'N')}. How much work does the rope do?` : T`A worker pushes a trolley ${Q(s, 'm')} along a corridor with a constant horizontal force of ${Q(F, 'N')}. How much work does the worker do?`,
        a: W, u: 'J', w: th ? [F * s, sig(F * s * sinD(th)), sig(F * cosD(th))] : [sig(F / s), F + s, sig(F * s / 2)],
        s: th ? T`$W = Fs\cos\theta = ${F} \cdot ${s} \cos ${th}^\circ = ${QT(W, 'J')}$.` : T`$W = Fs = ${F} \cdot ${s} = ${QT(W, 'J')}$.` };
    },
    () => {
      const m = pick([0.5, 2, 4, 10, 60, 800, 1200]), v = ri(2, 30), E = sig(0.5 * m * v * v, 6);
      return { q: T`What is the kinetic energy of a ${Q(m, 'kg')} object moving at ${Q(v, 'm/s')}?`, a: E, u: 'J', w: [sig(m * v * v, 6), sig(0.5 * m * v, 6), sig(m * v, 6)],
        s: T`$E_k = \tfrac12 m v^2 = \tfrac12 \cdot ${M(m)} \cdot ${v}^2 = ${QT(E, 'J')}$.` };
    },
    () => {
      const g = gPick(), m = ri(1, 60), h = ri(2, 40), E = sig(m * g * h, 6);
      return { q: T`A ${Q(m, 'kg')} load is lifted ${Q(h, 'm')} straight up. By how much does its gravitational potential energy increase? ${gNote(g)}`, a: E, u: 'J', w: [m * h, sig(0.5 * m * g * h, 6), sig(m * g / h)],
        s: T`$\Delta E_p = mgh = ${m} \cdot ${M(g)} \cdot ${h} = ${QT(E, 'J')}$.` };
    },
    () => {
      const g = gPick(), h = ri(2, 25) * (chance() ? 1 : 2), v0 = chance() ? 0 : ri(2, 8), v = sig(Math.sqrt(v0 * v0 + 2 * g * h));
      return { q: v0 ? T`A skateboarder moving at ${Q(v0, 'm/s')} rolls down a smooth ramp and drops ${Q(h, 'm')} in height. How fast is she going at the bottom? ${gNote(g)}` : T`A ball is released from rest and rolls down a smooth track, dropping ${Q(h, 'm')} in height. How fast is it moving at the bottom? ${gNote(g)}`,
        a: v, u: 'm/s', w: [sig(Math.sqrt(2 * g * h) + v0), sig(Math.sqrt(g * h)), sig(2 * g * h / 10)],
        s: v0 ? T`$\tfrac12 m v^2 = \tfrac12 m v_0^2 + mgh$, so $v = \sqrt{v_0^2 + 2gh} = \sqrt{${v0 * v0} + 2 \cdot ${M(g)} \cdot ${h}} = ${QT(v, 'm/s')}$.` : T`$mgh = \tfrac12 m v^2$, so $v = \sqrt{2gh} = \sqrt{2 \cdot ${M(g)} \cdot ${h}} = ${QT(v, 'm/s')}$.` };
    },
    () => {
      const g = gPick(), m = ri(2, 20) * 10, h = ri(2, 12), t = ri(2, 20) * 2, P = sig(m * g * h / t);
      return { q: T`A crane lifts a ${Q(m, 'kg')} load through ${Q(h, 'm')} at constant speed in ${Q(t, 's')}. What is its useful power output? ${gNote(g)}`, a: P, u: 'W', w: [sig(m * g * h, 6), sig(m * h / t), sig(m * g * h * t, 6)],
        s: T`Work done: $W = mgh = ${m} \cdot ${M(g)} \cdot ${h} = ${M(sig(m * g * h, 6))}\,\mathrm{J}$. Power: $P = \frac{W}{t} = \frac{${M(sig(m * g * h, 6))}}{${t}} = ${QT(P, 'W')}$.` };
    },
    () => {
      const m = pick([800, 1000, 1200, 1500]), v = pick([10, 15, 20, 25]), s = ri(2, 10) * 5, F = sig(0.5 * m * v * v / s);
      return { q: T`A ${Q(m, 'kg')} car travelling at ${Q(v, 'm/s')} brakes to a stop in ${Q(s, 'm')}. What is the average braking force?`, a: F, u: 'N', w: [sig(m * v * v / s), sig(0.5 * m * v / s), sig(0.5 * m * v * v, 6)],
        s: T`The braking force removes all the kinetic energy: $F s = \tfrac12 m v^2$, so $F = \frac{\tfrac12 \cdot ${m} \cdot ${v}^2}{${s}} = \frac{${M(0.5 * m * v * v)}}{${s}} = ${QT(F, 'N')}$.` };
    },
    () => {
      const Pin = ri(4, 40) * 50, eta = ri(5, 18) * 5, Pout = Pin * eta / 100, askEta = chance();
      return askEta
        ? { q: T`An electric motor takes in ${Q(Pin, 'W')} and delivers ${Q(Pout, 'W')} of useful mechanical power. What is its efficiency?`, a: eta, u: '%', w: [100 - eta, sig(Pin / Pout * 100, 4), sig(Pout / 10)], s: T`$\eta = \frac{P_{\text{out}}}{P_{\text{in}}} \times 100\% = \frac{${M(Pout)}}{${M(Pin)}} \times 100\% = ${M(eta)}\%$.` }
        : { q: T`A pump is ${NUM(eta)}% efficient and takes in ${Q(Pin, 'W')}. What useful power does it deliver?`, a: Pout, u: 'W', w: [Pin - Pout, sig(Pin / eta * 100, 4), Pin], s: T`$P_{\text{out}} = \eta \times P_{\text{in}} = ${M(eta / 100)} \times ${M(Pin)} = ${QT(Pout, 'W')}$.` };
    },
  ],
},
/* ------------------------------------------------------------------ */
{
  id: 'momentum', stage: 'sh', title: 'Momentum, Impulse & Collisions',
  blurb: 'Momentum and impulse, conservation of momentum, collisions that stick together, recoil and elastic collisions.',
  lesson: () => T`
<p>The <b>momentum</b> of an object is its mass times its velocity. It is a vector, pointing the same way as the velocity, and its unit is $\mathrm{kg\,m/s}$.</p>
${Fm(T`p = m v`)}
<h3>Impulse</h3>
<p>A force acting for a time changes the momentum. The product $F\,\Delta t$ is the <b>impulse</b>:</p>
${Fm(T`J = F\,\Delta t = \Delta p = m v - m v_0`)}
<p>This is why airbags and crumple zones save lives: spreading the same change of momentum over a longer time means a smaller force.</p>
${Key(T`<p><b>Conservation of momentum:</b> when no outside force acts on a system, its total momentum stays the same. For two objects colliding:</p><p>$$m_1 v_1 + m_2 v_2 = m_1 v_1' + m_2 v_2'.$$</p><p>Choose a positive direction and give velocities the other way a minus sign.</p>`)}
<h3>Types of collision</h3>
<ul><li><b>Perfectly inelastic:</b> the objects stick together and move off with one common velocity $v' = \dfrac{m_1 v_1 + m_2 v_2}{m_1 + m_2}$. Kinetic energy is lost (to heat, sound, deformation).</li><li><b>Elastic:</b> kinetic energy is conserved as well. When two equal masses collide elastically head-on, they swap velocities.</li><li>Most real collisions are in between: momentum is conserved, some kinetic energy is lost.</li></ul>
${Ex(T`<p>A $2\,\mathrm{kg}$ cart at $6\,\mathrm{m/s}$ hits a $1\,\mathrm{kg}$ cart at rest and they stick. $v' = \frac{2 \cdot 6 + 1 \cdot 0}{3} = 4\,\mathrm{m/s}$. Kinetic energy before: $36\,\mathrm{J}$; after: $\tfrac12 \cdot 3 \cdot 4^2 = 24\,\mathrm{J}$, so $12\,\mathrm{J}$ is lost.</p>`)}
<h3>Recoil</h3>
<p>Before a gun fires, the total momentum is zero, so afterwards the bullet's forward momentum is balanced by the gun's backward momentum: $m_b v_b = m_g v_g$.</p>
${Tip(T`<p>When a ball bounces back, its velocity changes sign. Bouncing from $+5\,\mathrm{m/s}$ to $-5\,\mathrm{m/s}$ is a change of $10\,\mathrm{m/s}$, not zero.</p>`)}`,
  gens: [
    () => {
      const m = pick([0.15, 0.45, 2, 5, 60, 1200]), v = ri(2, 30), p = sig(m * v, 6);
      return { q: T`What is the momentum of a ${Q(m, 'kg')} object moving at ${Q(v, 'm/s')}?`, a: p, u: 'kg m/s', w: [sig(0.5 * m * v * v, 6), sig(m / v, 4), sig(m * v * v, 6)], s: T`$p = mv = ${M(m)} \cdot ${v} = ${QT(p, 'kg\\,m/s')}$.` };
    },
    () => {
      const F = ri(2, 50) * 10, dt = pick([0.01, 0.02, 0.05, 0.1, 0.2, 0.5]), J = sig(F * dt, 6);
      return { q: T`A bat hits a ball with an average force of ${Q(F, 'N')} for ${Q(dt, 's')}. What impulse does it give the ball?`, a: J, u: 'N s', w: [sig(F / dt, 4), sig(F * dt * 10, 4), sig(F * dt / 2, 4)], s: T`$J = F\Delta t = ${F} \cdot ${M(dt)} = ${QT(J, 'N\\,s')}$.` };
    },
    () => {
      const m = pick([0.05, 0.1, 0.2, 0.4, 0.5]), v1 = ri(3, 20), v2 = ri(2, v1), dp = sig(m * (v1 + v2), 6);
      return { q: T`A ${Q(m, 'kg')} ball hits a wall at ${Q(v1, 'm/s')} and bounces straight back at ${Q(v2, 'm/s')}. What is the magnitude of its change in momentum?`, a: dp, u: 'kg m/s', w: [sig(m * (v1 - v2), 6), sig(m * v1, 6), 0],
        s: T`Take the incoming direction as positive: $\Delta p = m(v - v_0) = ${M(m)}(-${v2} - ${v1}) = -${M(dp)}\,\mathrm{kg\,m/s}$. The magnitude is ${Q(dp, 'kg\\,m/s')}.` };
    },
    () => {
      const m1 = ri(1, 10) * (chance() ? 1 : 100), m2 = ri(1, 10) * (m1 >= 100 ? 100 : 1), v1 = ri(2, 12), v2 = chance() ? 0 : -ri(1, 8), vf = sig((m1 * v1 + m2 * v2) / (m1 + m2));
      return { q: v2 ? T`A ${Q(m1, 'kg')} trolley moving right at ${Q(v1, 'm/s')} collides with a ${Q(m2, 'kg')} trolley moving left at ${Q(-v2, 'm/s')}. They stick together. What is their velocity just after the collision (positive = to the right)?` : T`A ${Q(m1, 'kg')} trolley moving at ${Q(v1, 'm/s')} hits a stationary ${Q(m2, 'kg')} trolley and they stick together. What is their common speed?`,
        a: vf, u: 'm/s', w: [sig((m1 * v1 - m2 * v2) / (m1 + m2)), sig(m1 * v1 / m2), sig((v1 + v2) / 2)], neg: true,
        s: T`Momentum is conserved: $v' = \frac{m_1 v_1 + m_2 v_2}{m_1 + m_2} = \frac{${m1} \cdot ${v1} + ${m2} \cdot ${pn(v2)}}{${m1 + m2}} = ${QT(vf, 'm/s')}$.` };
    },
    () => {
      const mb = pick([0.005, 0.01, 0.02, 0.05]), vb = ri(20, 80) * 10, mg = ri(2, 8) / 2, vg = sig(mb * vb / mg);
      return { q: T`A ${Q(mg, 'kg')} rifle fires a ${Q(mb * 1000, 'g')} bullet at ${Q(vb, 'm/s')}. What is the recoil speed of the rifle?`, a: vg, u: 'm/s', w: [sig(mb * 1000 * vb / mg), sig(mg * vb / 1000), sig(mb * vb)],
        s: T`Total momentum is zero before and after: $m_g v_g = m_b v_b$, so $v_g = \frac{${M(mb)} \cdot ${vb}}{${M(mg)}} = ${QT(vg, 'm/s')}$ (remember $${M(mb * 1000)}\,\mathrm{g} = ${M(mb)}\,\mathrm{kg}$).` };
    },
    () => {
      const m1 = ri(1, 6), m2 = ri(1, 6), v1 = ri(2, 10), vf = (m1 * v1) / (m1 + m2), lost = sig(0.5 * m1 * v1 * v1 - 0.5 * (m1 + m2) * vf * vf);
      return { q: T`A ${Q(m1, 'kg')} cart moving at ${Q(v1, 'm/s')} hits a stationary ${Q(m2, 'kg')} cart and they stick together. How much kinetic energy is lost in the collision?`, a: lost, u: 'J', w: [sig(0.5 * m1 * v1 * v1), 0, sig(0.5 * (m1 + m2) * vf * vf)],
        s: T`Common velocity: $v' = \frac{${m1} \cdot ${v1}}{${m1 + m2}} = ${M(sig(vf))}\,\mathrm{m/s}$. Kinetic energy before: $\tfrac12 \cdot ${m1} \cdot ${v1}^2 = ${M(sig(0.5 * m1 * v1 * v1))}\,\mathrm{J}$; after: $\tfrac12 \cdot ${m1 + m2} \cdot ${M(sig(vf))}^2 = ${M(sig(0.5 * (m1 + m2) * vf * vf))}\,\mathrm{J}$. Lost: ${Q(lost, 'J')}.` };
    },
    () => ({ q: T`On a smooth track, a moving cart collides head-on and elastically with an identical cart at rest. What happens?`, a: T`The moving cart stops and the other moves off with its velocity`, w: [T`Both carts move off together at half the speed`, T`The moving cart bounces back at the same speed`, T`Both carts stop`], only: 'mc',
      s: T`In an elastic head-on collision between equal masses both momentum and kinetic energy are conserved, and the only solution is that the carts swap velocities.` }),
  ],
},
/* ------------------------------------------------------------------ */
{ id: 'rotation', stage: 'sh', soon: true, title: 'Rotational Dynamics & Torque' },
{ id: 'equilibrium', stage: 'sh', soon: true, title: 'Equilibrium of Rigid Bodies' },
{ id: 'gravitation', stage: 'sh', soon: true, title: 'Gravitation & Orbits' },
{ id: 'elasticity', stage: 'sh', soon: true, title: 'Elasticity & Springs' },
{ id: 'fluid-statics', stage: 'sh', soon: true, title: 'Fluids at Rest' },
{ id: 'fluid-dynamics', stage: 'sh', soon: true, title: 'Fluids in Motion' },
{ id: 'center-of-mass', stage: 'uni', soon: true, title: 'Centre of Mass & Angular Momentum' },
  ],
});
})();
