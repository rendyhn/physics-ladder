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
      let d, t; do { d = ri(12, 90) * 10; t = ri(6, 30) * 5; } while (d / t > 12 || d / t < 2);
      const v = sig(d / t);
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
      const v0 = ri(0, 10), a = ri(1, 6) / (chance() ? 1 : 2), t = ri(2, Math.min(10, Math.floor(20 / a))), v = sig(v0 + a * t, 6);   // final speed stays below about 30 m/s
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
{
  id: 'circular', stage: 'sh', title: 'Circular Motion',
  blurb: 'Period and frequency, angular speed, centripetal acceleration and force, cars on bends and vertical loops.',
  lesson: () => T`
<p>An object moving around a circle at constant speed is still <b>accelerating</b>, because the direction of its velocity keeps changing.</p>
${Fig(circleSvg(T`An object moving on a circle, with its velocity along the tangent and its acceleration towards the centre`), T`The velocity is along the tangent; the acceleration points to the centre.`)}
<h3>Describing the motion</h3>
<ul><li><b>Period</b> $T$: the time for one revolution. <b>Frequency</b> $f = 1/T$, in hertz ($\mathrm{Hz}$), revolutions per second.</li><li><b>Angular speed</b> $\omega = \dfrac{2\pi}{T} = 2\pi f$, in radians per second.</li><li><b>Speed</b> along the circle: $v = \dfrac{2\pi r}{T} = \omega r$.</li></ul>
${Key(T`<p>The <b>centripetal acceleration</b> points to the centre of the circle:</p><p>$$a_c = \frac{v^2}{r} = \omega^2 r.$$</p><p>By Newton's second law this needs a net force towards the centre, the <b>centripetal force</b> $F_c = \dfrac{m v^2}{r}$. It is not a new kind of force: tension, friction, gravity or a normal force provides it.</p>`)}
${Ex(T`<p>A car of mass $1000\,\mathrm{kg}$ takes a flat bend of radius $50\,\mathrm{m}$ at $10\,\mathrm{m/s}$. The friction on the tyres must provide $F_c = \frac{1000 \cdot 10^2}{50} = 2000\,\mathrm{N}$. If the maximum friction is $\mu m g$, the fastest safe speed is $v_{\max} = \sqrt{\mu g r}$.</p>`)}
<h3>Vertical circles</h3>
<p>At the top of a vertical loop, gravity can provide the whole centripetal force. The smallest speed that keeps a ball or a roller-coaster car on the track there is $v_{\min} = \sqrt{g r}$.</p>
${Tip(T`<p>If the string of a whirling ball breaks, the ball flies off along the <b>tangent</b>, not outwards along the radius. There is no "centrifugal force" pulling it out; it simply keeps moving in a straight line.</p>`)}`,
  gens: [
    () => {
      const n = ri(2, 30) * 5, t = ri(2, 30) * 2, T0 = sig(t / n), f = sig(n / t), askT = chance();
      return { q: T`A fan blade makes ${n} revolutions in ${Q(t, 's')}. What is its ${askT ? T`period` : T`frequency`}?`, a: askT ? T0 : f, u: askT ? 's' : 'Hz', w: askT ? [f, sig(t * n, 4), sig(2 * Math.PI * t / n)] : [T0, sig(n * t, 4), sig(2 * Math.PI * n / t)],
        s: askT ? T`$T = \frac{t}{n} = \frac{${t}}{${n}} = ${QT(T0, 's')}$.` : T`$f = \frac{n}{t} = \frac{${n}}{${t}} = ${QT(f, 'Hz')}$.` };
    },
    () => {
      const rpm = pick([30, 45, 60, 90, 120, 300, 600, 1200]), w = sig(2 * Math.PI * rpm / 60);
      return { q: T`A wheel turns at ${rpm} revolutions per minute. What is its angular speed in rad/s?`, a: w, u: 'rad/s', w: [sig(rpm / 60), sig(2 * Math.PI * rpm), sig(Math.PI * rpm / 60)],
        s: T`$f = \frac{${rpm}}{60} = ${M(sig(rpm / 60))}\,\mathrm{Hz}$, so $\omega = 2\pi f = ${QT(w, 'rad/s')}$.` };
    },
    () => {
      const r = ri(2, 30) / 10, T0 = ri(2, 20) / 10, v = sig(2 * Math.PI * r / T0), ac = sig(4 * Math.PI ** 2 * r / T0 ** 2), askA = chance();
      return askA
        ? { q: T`A stone on a string moves in a horizontal circle of radius ${Q(r, 'm')}, making one revolution every ${Q(T0, 's')}. What is its centripetal acceleration?`, a: ac, u: 'm/s²', w: [v, sig(v / r), sig(2 * Math.PI * r / T0 ** 2)], s: T`$v = \frac{2\pi r}{T} = ${M(v)}\,\mathrm{m/s}$, so $a_c = \frac{v^2}{r} = \frac{${M(v)}^2}{${M(r)}} = ${QT(ac, 'm/s^2')}$.` }
        : { q: T`A stone on a string moves in a circle of radius ${Q(r, 'm')}, making one revolution every ${Q(T0, 's')}. What is its speed?`, a: v, u: 'm/s', w: [sig(r / T0), sig(Math.PI * r / T0), ac], s: T`$v = \frac{2\pi r}{T} = \frac{2\pi \cdot ${M(r)}}{${M(T0)}} = ${QT(v, 'm/s')}$.` };
    },
    () => {
      const m = pick([0.2, 0.5, 1, 2, 5, 60, 900, 1200]), v = ri(2, 25), r = ri(2, 60), F = sig(m * v * v / r);
      return { q: T`What centripetal force is needed to keep a ${Q(m, 'kg')} object moving at ${Q(v, 'm/s')} in a circle of radius ${Q(r, 'm')}?`, a: F, u: 'N', w: [sig(m * v / r), sig(m * v * v * r, 4), sig(v * v / r)],
        s: T`$F_c = \frac{m v^2}{r} = \frac{${M(m)} \cdot ${v}^2}{${r}} = ${QT(F, 'N')}$.` };
    },
    () => {
      const g = gPick(), mu = ri(3, 9) / 10, r = ri(2, 20) * 10, v = sig(Math.sqrt(mu * g * r));
      return { q: T`A car rounds a flat, unbanked bend of radius ${Q(r, 'm')}. The coefficient of friction between tyres and road is ${NUM(mu)}. What is the greatest speed at which it can take the bend without skidding? ${gNote(g)}`, a: v, u: 'm/s', w: [sig(mu * g * r), sig(Math.sqrt(g * r)), sig(Math.sqrt(mu * r))],
        s: T`Friction provides the centripetal force: $\mu m g = \frac{m v^2}{r}$, so $v = \sqrt{\mu g r} = \sqrt{${M(mu)} \cdot ${M(g)} \cdot ${r}} = ${QT(v, 'm/s')}$.` };
    },
    () => {
      const g = gPick(), r = ri(4, 30) / 2, v = sig(Math.sqrt(g * r));
      return { q: T`A roller-coaster loop has a radius of ${Q(r, 'm')} at the top. What is the minimum speed a car must have at the top to stay on the track? ${gNote(g)}`, a: v, u: 'm/s', w: [sig(Math.sqrt(2 * g * r)), sig(g * r), sig(Math.sqrt(g / r) * 10)],
        s: T`At the minimum speed gravity alone provides the centripetal force: $mg = \frac{m v^2}{r}$, so $v = \sqrt{gr} = \sqrt{${M(g)} \cdot ${M(r)}} = ${QT(v, 'm/s')}$.` };
    },
    () => pick([
      { q: T`A ball whirled on a string moves in a horizontal circle. The string suddenly breaks. In which direction does the ball move just afterwards?`, a: T`Along the tangent to the circle`, w: [T`Straight outwards, away from the centre`, T`Straight towards the centre`, T`It keeps moving in the circle`], only: 'mc', s: T`Once the string breaks there is no centripetal force, so the ball keeps its velocity at that instant, which points along the tangent.` },
      { q: T`An object moves in a circle at constant speed. Which statement is true?`, a: T`It is accelerating towards the centre`, w: [T`It is not accelerating, because its speed is constant`, T`It is accelerating along its direction of motion`, T`It is accelerating away from the centre`], only: 'mc', s: T`The direction of the velocity changes all the time, so there is an acceleration $v^2/r$ pointing to the centre.` },
    ]),
  ],
},
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
${Fig(fbdSvg([{ ang: 90, len: 70, label: 'N', kind: 'b' }, { ang: 270, len: 70, label: 'W' }, { ang: 0, len: 90, label: 'F' }, { ang: 180, len: 58, label: 'f', kind: 'c', ground: true }], T`Free-body diagram of a block pulled along the floor: normal force up, weight down, pull to the right and friction to the left`), T`A block pulled to the right: $N$ balances $W$, and the net force is $F - f$.`)}
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
          + Fig(fbdSvg([{ ang: 0, len: 110, label: `${F1} N` }, { ang: 180, len: 45 + 65 * F2 / F1, label: `${F2} N`, kind: 'b' }], T`A block with a force to the right and a smaller force to the left`)),
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
      const g = gPick(), m = ri(1, 60), h = ri(2, 40), E = sig(m * g * h);
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
      const F = ri(5, 60) * 50, dt = pick([0.002, 0.004, 0.005, 0.008, 0.01, 0.02]), J = sig(F * dt, 6);
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
{
  id: 'rotation', stage: 'sh', title: 'Rotational Dynamics & Torque',
  blurb: 'Torque, moment of inertia, Newton’s second law for rotation, rotational kinetic energy and rolling.',
  lesson: () => T`
<p>Forces make things speed up in a straight line; <b>torques</b> make them spin faster or slower.</p>
<h3>Torque</h3>
${Fm(T`\tau = r F \sin\theta`)}
<p>$r$ is the distance from the axis to where the force acts and $\theta$ the angle between $r$ and $F$. The unit is $\mathrm{N\,m}$. A force pointing straight at the axis ($\theta = 0$) produces no torque, which is why door handles are far from the hinges.</p>
<h3>Moment of inertia</h3>
<p>The rotational version of mass is the <b>moment of inertia</b> $I = \sum m r^2$. Mass far from the axis counts much more than mass close to it.</p>
${Tbl([T`Object (axis through centre unless stated)`, '$I$'], [[T`Thin ring or hoop`, '$MR^2$'], [T`Solid disc or cylinder`, '$\\tfrac12 MR^2$'], [T`Solid sphere`, '$\\tfrac25 MR^2$'], [T`Thin rod, about its centre`, '$\\tfrac1{12} ML^2$'], [T`Thin rod, about one end`, '$\\tfrac13 ML^2$']])}
${Key(T`<p>Rotation mirrors straight-line motion:</p><p>$$\tau = I\alpha \qquad E_{k,\text{rot}} = \tfrac12 I \omega^2 \qquad \omega = \omega_0 + \alpha t \qquad \theta = \omega_0 t + \tfrac12 \alpha t^2$$</p><p>Here $\alpha$ is the angular acceleration in $\mathrm{rad/s^2}$ and $\theta$ the angle turned in radians (one revolution is $2\pi$).</p>`)}
<h3>Rolling</h3>
<p>A rolling object has both kinds of kinetic energy: $E_k = \tfrac12 m v^2 + \tfrac12 I\omega^2$ with $v = \omega r$. Rolling down a slope of height $h$ from rest, a solid sphere reaches $v = \sqrt{\tfrac{10}{7} g h}$ and a solid cylinder $v = \sqrt{\tfrac43 g h}$: both slower than a block sliding without friction ($\sqrt{2gh}$), because part of the energy goes into spinning.</p>
${Tip(T`<p>Angles in rotational formulas must be in radians. Convert revolutions with $1\,\mathrm{rev} = 2\pi\,\mathrm{rad}$ and rpm with $\omega = 2\pi \cdot \frac{\text{rpm}}{60}$.</p>`)}`,
  gens: [
    () => {
      const F = ri(4, 40) * 5, r = ri(2, 12) / 10, th = pick([90, 90, 30, 45, 60]), tau = sig(r * F * sinD(th));
      return { q: th === 90 ? T`A spanner ${Q(r, 'm')} long is pushed with ${Q(F, 'N')} at right angles to its handle. What torque is applied to the nut?` : T`A force of ${Q(F, 'N')} is applied ${Q(r, 'm')} from a hinge, at ${Q(th, '°')} to the door. What torque does it produce about the hinge?`,
        a: tau, u: 'N m', w: th === 90 ? [sig(F / r), sig(F + r), sig(r * F / 2)] : [sig(r * F), sig(r * F * cosD(th)), sig(F / r)],
        s: th === 90 ? T`$\tau = rF = ${M(r)} \cdot ${F} = ${QT(tau, 'N\\,m')}$.` : T`$\tau = rF\sin\theta = ${M(r)} \cdot ${F} \sin ${th}^\circ = ${QT(tau, 'N\\,m')}$.` };
    },
    () => {
      const [name, k, kT] = pick([[T`solid disc`, 0.5, '\\tfrac12'], [T`thin ring`, 1, ''], [T`solid sphere`, 0.4, '\\tfrac25']]), M0 = ri(1, 20) / 2, R = ri(1, 10) / 10, I = sig(k * M0 * R * R);
      return { q: T`What is the moment of inertia of a ${name} of mass ${Q(M0, 'kg')} and radius ${Q(R, 'm')} about its central axis?`, a: I, u: 'kg m²', w: [sig(M0 * R * R * (k === 1 ? 0.5 : 1)), sig(k * M0 * R), sig(k * M0 * R * R * 2)],
        s: T`$I = ${kT} MR^2 = ${kT ? kT + ' \\cdot ' : ''}${M(M0)} \cdot ${M(R)}^2 = ${QT(I, 'kg\\,m^2')}$.` };
    },
    () => {
      const M0 = ri(2, 20), R = ri(1, 5) / 10, tau = ri(1, 20) / 2, I = 0.5 * M0 * R * R, al = sig(tau / I);
      return { q: T`A torque of ${Q(tau, 'N m')} acts on a solid disc (mass ${Q(M0, 'kg')}, radius ${Q(R, 'm')}) that can spin about its axle. What is its angular acceleration?`, a: al, u: 'rad/s²', w: [sig(tau / (M0 * R * R)), sig(tau * I, 4), sig(tau / (M0 * R))],
        s: T`$I = \tfrac12 MR^2 = ${M(sig(I))}\,\mathrm{kg\,m^2}$, so $\alpha = \frac{\tau}{I} = \frac{${M(tau)}}{${M(sig(I))}} = ${QT(al, 'rad/s^2')}$.` };
    },
    () => {
      const al = ri(1, 10), t = ri(2, 10), w = al * t, th = 0.5 * al * t * t, rev = sig(th / (2 * Math.PI)), askRev = chance();
      return askRev
        ? { q: T`A turntable starts from rest with an angular acceleration of ${Q(al, 'rad/s^2')}. How many revolutions does it make in ${Q(t, 's')}?`, a: rev, w: [sig(th), sig(w / (2 * Math.PI)), sig(al * t * t / (2 * Math.PI))], s: T`$\theta = \tfrac12 \alpha t^2 = \tfrac12 \cdot ${al} \cdot ${t}^2 = ${M(th)}\,\mathrm{rad}$, which is $\frac{${M(th)}}{2\pi} = ${M(rev)}$ revolutions.` }
        : { q: T`A wheel starts from rest with an angular acceleration of ${Q(al, 'rad/s^2')}. What is its angular speed after ${Q(t, 's')}?`, a: w, u: 'rad/s', w: [th, sig(w / (2 * Math.PI)), al + t], s: T`$\omega = \omega_0 + \alpha t = 0 + ${al} \cdot ${t} = ${QT(w, 'rad/s')}$.` };
    },
    () => {
      const I = ri(1, 40) / 10, w = ri(5, 60), E = sig(0.5 * I * w * w);
      return { q: T`A flywheel with moment of inertia ${Q(I, 'kg m^2')} spins at ${Q(w, 'rad/s')}. How much rotational kinetic energy does it store?`, a: E, u: 'J', w: [sig(I * w * w), sig(0.5 * I * w), sig(I * w)],
        s: T`$E_k = \tfrac12 I \omega^2 = \tfrac12 \cdot ${M(I)} \cdot ${w}^2 = ${QT(E, 'J')}$.` };
    },
    () => {
      const g = gPick(), h = ri(2, 20) / 2, sphere = chance(), v = sig(Math.sqrt((sphere ? 10 / 7 : 4 / 3) * g * h));
      return { q: T`A ${sphere ? T`solid ball` : T`solid cylinder`} rolls without slipping from rest down a slope, dropping ${Q(h, 'm')} in height. How fast is it moving at the bottom? ${gNote(g)}`, a: v, u: 'm/s', w: [sig(Math.sqrt(2 * g * h)), sig(Math.sqrt((sphere ? 4 / 3 : 10 / 7) * g * h)), sig(Math.sqrt(g * h))],
        s: sphere ? T`$mgh = \tfrac12 m v^2 + \tfrac12 \cdot \tfrac25 m r^2 \cdot \frac{v^2}{r^2} = \tfrac{7}{10} m v^2$, so $v = \sqrt{\tfrac{10}{7} g h} = ${QT(v, 'm/s')}$.` : T`$mgh = \tfrac12 m v^2 + \tfrac12 \cdot \tfrac12 m r^2 \cdot \frac{v^2}{r^2} = \tfrac34 m v^2$, so $v = \sqrt{\tfrac43 g h} = ${QT(v, 'm/s')}$.` };
    },
    () => ({ q: T`A solid disc and a ring have the same mass and radius. Both are given the same torque from rest. Which spins up faster?`, a: T`The disc, because its moment of inertia is smaller`, w: [T`The ring, because its mass is at the edge`, T`Both spin up equally fast`, T`The ring, because its moment of inertia is smaller`], only: 'mc',
      s: T`$\alpha = \tau / I$. The disc has $I = \tfrac12 MR^2$ and the ring $I = MR^2$, so the same torque gives the disc twice the angular acceleration.` }),
  ],
},
{
  id: 'equilibrium', stage: 'sh', title: 'Equilibrium of Rigid Bodies',
  blurb: 'The two conditions for equilibrium, moments and levers, beams on supports, centre of gravity and stability.',
  lesson: () => T`
<p>A rigid body is in <b>equilibrium</b> when it neither speeds up nor starts to turn. That needs two conditions at once.</p>
${Key(T`<p><b>Conditions for equilibrium</b></p><ol><li>The net force is zero: $\Sigma F_x = 0$ and $\Sigma F_y = 0$.</li><li>The net torque (moment) about <i>any</i> point is zero: clockwise moments = anticlockwise moments.</li></ol>`)}
<p>The <b>moment</b> of a force about a point is the force times its perpendicular distance from that point. Choosing the point where an unknown force acts removes that force from the moment equation, which makes problems much shorter.</p>
<h3>Levers and seesaws</h3>
${Fig(beamSvg(4, [{ x: 2, kind: 'pivot' }, { x: 0.5, kind: 'load', label: '300 N' }, { x: 3.5, kind: 'load', label: '300 N' }], T`A seesaw balanced on a central pivot with equal loads at equal distances`), T`Equal moments about the pivot: $300 \times 1.5 = 300 \times 1.5$.`)}
<p>A seesaw balances when $F_1 d_1 = F_2 d_2$. A lever lets a small effort lift a large load when the effort is much farther from the pivot than the load.</p>
${Ex(T`<p>A uniform $4\,\mathrm{m}$ plank of weight $200\,\mathrm{N}$ rests on supports at its two ends. A $600\,\mathrm{N}$ person stands $1\,\mathrm{m}$ from the left end. Taking moments about the left support: $R_B \cdot 4 = 600 \cdot 1 + 200 \cdot 2$, so $R_B = 250\,\mathrm{N}$. Then $R_A = 800 - 250 = 550\,\mathrm{N}$.</p>`)}
<h3>Centre of gravity and stability</h3>
<p>The weight of a body acts as if at one point, its <b>centre of gravity</b>; for a uniform beam that is the middle. An object resting on a base topples when the vertical line through its centre of gravity falls outside the base. A low centre of gravity and a wide base make an object more stable.</p>
${Tip(T`<p>Remember the beam's own weight: for a uniform beam, put it at the midpoint when you take moments.</p>`)}`,
  gens: [
    () => {
      const w1 = ri(20, 60) * 10, d1 = ri(4, 20) / 10, w2 = ri(20, 60) * 10, d2 = sig(w1 * d1 / w2);
      if (d2 > 3) return null;
      return { q: T`A child weighing ${Q(w1, 'N')} sits ${Q(d1, 'm')} from the pivot of a seesaw. How far from the pivot, on the other side, must a child weighing ${Q(w2, 'N')} sit to balance it?`, a: d2, u: 'm', w: [sig(w2 * d1 / w1), d1, sig(d1 * (w1 + w2) / w2 / 2)],
        s: T`Moments balance: $${w1} \cdot ${M(d1)} = ${w2} \cdot d$, so $d = \frac{${M(w1 * d1)}}{${w2}} = ${QT(d2, 'm')}$.` };
    },
    () => {
      const L = pick([2, 3, 4, 5, 6]), W = ri(4, 20) * 10, P = ri(4, 12) * 50, x = pick([...Array(L * 2 - 1)].map((_, i) => (i + 1) / 2).filter(v => v !== L / 2)), RB = sig((P * x + W * L / 2) / L), RA = sig(P + W - RB), askA = chance();
      return { q: T`A uniform beam ${Q(L, 'm')} long weighing ${Q(W, 'N')} rests on supports A (left end) and B (right end). A load of ${Q(P, 'N')} hangs ${Q(x, 'm')} from A. What is the upward force at ${askA ? 'A' : 'B'}?` + Fig(beamSvg(L, [{ x: 0, kind: 'support', label: 'A' }, { x: L, kind: 'support', label: 'B' }, { x, kind: 'load', label: `${P} N` }, { x: L / 2, kind: 'load', label: 'W', arrow: 'c' }], T`A beam on two end supports with a hanging load`)),
        a: askA ? RA : RB, u: 'N', w: askA ? [RB, sig((P + W) / 2), sig(P * x / L)] : [RA, sig((P + W) / 2), sig(P * x / L)],
        s: T`Moments about A: $R_B \cdot ${L} = ${P} \cdot ${M(x)} + ${W} \cdot ${M(L / 2)}$, so $R_B = ${M(RB)}\,\mathrm{N}$. Forces: $R_A = ${P} + ${W} - ${M(RB)} = ${M(RA)}\,\mathrm{N}$. ${askA ? T`The force at A is ${Q(RA, 'N')}.` : T`The force at B is ${Q(RB, 'N')}.`}` };
    },
    () => {
      const load = ri(20, 100) * 10, dl = ri(1, 5) / 10, de = ri(8, 20) / 10, E = sig(load * dl / de);
      return { q: T`A crowbar is used to lift a ${Q(load, 'N')} rock. The rock is ${Q(dl, 'm')} from the pivot and the effort is applied ${Q(de, 'm')} from the pivot on the other side. What effort is needed?`, a: E, u: 'N', w: [sig(load * de / dl), sig(load - de * 100), sig(load / 2)],
        s: T`Moments about the pivot: $F \cdot ${M(de)} = ${load} \cdot ${M(dl)}$, so $F = ${QT(E, 'N')}$. The lever multiplies the force by $\frac{${M(de)}}{${M(dl)}}$.` };
    },
    () => {
      const W = ri(4, 40) * 10, th = pick([20, 30, 37, 45, 53, 60]), T2 = sig(W / (2 * cosD(th)));
      return { q: T`A lamp of weight ${Q(W, 'N')} hangs from two identical cables, each making ${Q(th, '°')} with the vertical. What is the tension in each cable?`, a: T2, u: 'N', w: [sig(W / 2), sig(W / (2 * sinD(th))), sig(W / cosD(th))],
        s: T`Vertically: $2T\cos\theta = W$, so $T = \frac{${W}}{2\cos ${th}^\circ} = ${QT(T2, 'N')}$. The horizontal parts cancel.` };
    },
    () => pick([
      { q: T`Which change makes a bus less likely to tip over on a sharp bend?`, a: T`Lowering its centre of gravity`, w: [T`Raising its centre of gravity`, T`Making its wheelbase narrower`, T`Loading heavy luggage on the roof`], only: 'mc', s: T`A bus topples when the line through its centre of gravity passes outside its wheels. A low centre of gravity and a wide base keep that line inside.` },
      { q: T`A ladder rests against a wall without moving. Which statement must be true?`, a: T`The net force and the net torque on it are both zero`, w: [T`Only the net force is zero`, T`Only the net torque is zero`, T`The weight equals the normal force from the wall`], only: 'mc', s: T`A rigid body in equilibrium needs both conditions: no net force and no net torque.` },
    ]),
  ],
},
{
  id: 'gravitation', stage: 'sh', title: 'Gravitation & Orbits',
  blurb: 'Newton’s law of gravitation, g on other planets and at altitude, orbital speed and period, Kepler’s third law and escape speed.',
  lesson: () => T`
<p>Every mass attracts every other mass. Newton's law of gravitation gives the size of the pull between two point masses (or spheres) whose centres are a distance $r$ apart:</p>
${Fm(T`F = \frac{G m_1 m_2}{r^2}, \qquad G = 6.67 \times 10^{-11}\,\mathrm{N\,m^2/kg^2}`)}
<p>It is an <b>inverse-square law</b>: doubling the distance makes the force four times smaller.</p>
<h3>The gravitational field strength $g$</h3>
<p>At the surface of a planet of mass $M$ and radius $R$, $g = \dfrac{GM}{R^2}$. For the Earth ($M = 6.0 \times 10^{24}\,\mathrm{kg}$, $R = 6.4 \times 10^{6}\,\mathrm{m}$) this gives about $9.8\,\mathrm{m/s^2}$. At a height $h$ above the surface, $g_h = g \left(\dfrac{R}{R + h}\right)^2$.</p>
${Key(T`<p>For a satellite in a circular orbit of radius $r$, gravity provides the centripetal force:</p><p>$$\frac{GMm}{r^2} = \frac{m v^2}{r} \;\Rightarrow\; v = \sqrt{\frac{GM}{r}}, \qquad T = \frac{2\pi r}{v}.$$</p><p>From this follows <b>Kepler's third law</b>: $T^2 \propto r^3$ for all bodies orbiting the same central mass.</p>`)}
<h3>Escape speed</h3>
<p>The speed needed to leave a planet's surface for good (ignoring air) is $v_{\text{esc}} = \sqrt{\dfrac{2GM}{R}}$, about $11.2\,\mathrm{km/s}$ for the Earth.</p>
${Tip(T`<p>$r$ is measured from the <b>centre</b> of the planet. A satellite $400\,\mathrm{km}$ up orbits at $r = R + 400\,\mathrm{km}$.</p>`)}`,
  gens: [
    () => {
      const m1 = ri(20, 90), m2 = ri(20, 90), r = ri(5, 30) / 10, F = 6.67e-11 * m1 * m2 / (r * r);
      return { q: T`Two people of masses ${Q(m1, 'kg')} and ${Q(m2, 'kg')} stand ${Q(r, 'm')} apart. What is the gravitational force between them? ($G = 6.67 \times 10^{-11}\,\mathrm{N\,m^2/kg^2}$.)`, a: `$${sciT(F)}$`, w: [`$${sciT(F * r)}$`, `$${sciT(F * 1e3)}$`, `$${sciT(F / 1e3)}$`], v: F, rtol: 0.02, u: 'N', h: T`Type a power of ten like 3.1e-7.`,
        s: T`$F = \frac{G m_1 m_2}{r^2} = \frac{6.67 \times 10^{-11} \cdot ${m1} \cdot ${m2}}{${M(r)}^2} = ${sciT(F)}\,\mathrm{N}$. Tiny, which is why we never notice it.` };
    },
    () => {
      const k = pick([2, 3, 4, 0.5]), g0 = gPick(), g2 = sig(g0 / (k * k));
      return { q: T`A satellite is moved from a distance $r$ to a distance ${k === 0.5 ? '$r/2$' : `$${k}r$`} from the centre of the Earth. If the gravitational field strength was ${Q(g0, 'm/s^2')} at first, what is it now?`, a: g2, u: 'm/s²', w: [sig(g0 / k), sig(g0 * k * k), g0],
        s: T`$g \propto \frac{1}{r^2}$, so the new value is $\frac{${M(g0)}}{${k === 0.5 ? '(1/2)' : k}^2} = ${QT(g2, 'm/s^2')}$.` };
    },
    () => {
      const [name, Mp, Rp] = pick([[T`Mars`, 6.4e23, 3.4e6], [T`the Moon`, 7.3e22, 1.74e6], [T`Jupiter`, 1.9e27, 7.0e7], [T`Venus`, 4.9e24, 6.1e6]]), g = sig(6.67e-11 * Mp / (Rp * Rp));
      return { q: T`${name} has a mass of $${sciT(Mp, 2)}\,\mathrm{kg}$ and a radius of $${sciT(Rp, 3)}\,\mathrm{m}$. What is the gravitational field strength at its surface? ($G = 6.67 \times 10^{-11}\,\mathrm{N\,m^2/kg^2}$.)`, a: g, u: 'm/s²', w: [sig(6.67e-11 * Mp / Rp / 1e6), sig(g * 2), sig(g / 3)],
        s: T`$g = \frac{GM}{R^2} = \frac{6.67 \times 10^{-11} \cdot ${sciT(Mp, 2)}}{(${sciT(Rp, 3)})^2} = ${QT(g, 'm/s^2')}$.` };
    },
    () => {
      const h = pick([300, 400, 500, 800, 1000, 2000, 20000, 35800]), r = 6.4e6 + h * 1e3, v = 6.67e-11 * 6.0e24 / r, vv = Math.sqrt(v), T0 = 2 * Math.PI * r / vv, askT = chance();
      return askT
        ? { q: T`A satellite orbits ${Q(h, 'km')} above the Earth's surface. What is its orbital period, in minutes? (Earth: $M = 6.0 \times 10^{24}\,\mathrm{kg}$, $R = 6.4 \times 10^{6}\,\mathrm{m}$, $G = 6.67 \times 10^{-11}$.)`, a: sig(T0 / 60), u: 'min', w: [sig(T0 / 3600), sig(T0 / 60 / 2), sig(T0 / 60 * 1.5)],
            s: T`$r = R + h = ${sciT(r)}\,\mathrm{m}$, $v = \sqrt{\frac{GM}{r}} = ${M(sig(vv))}\,\mathrm{m/s}$, and $T = \frac{2\pi r}{v} = ${M(sig(T0))}\,\mathrm{s} = ${QT(sig(T0 / 60), 'min')}$.` }
        : { q: T`A satellite orbits ${Q(h, 'km')} above the Earth's surface. What is its orbital speed, in km/s? (Earth: $M = 6.0 \times 10^{24}\,\mathrm{kg}$, $R = 6.4 \times 10^{6}\,\mathrm{m}$, $G = 6.67 \times 10^{-11}$.)`, a: sig(vv / 1000), u: 'km/s', w: [sig(Math.sqrt(6.67e-11 * 6.0e24 / 6.4e6) / 1000 * (h > 5000 ? 1 : 1.4)), sig(Math.sqrt(2) * vv / 1000), sig(vv / 1000 / 2)],
            s: T`$r = R + h = ${sciT(r)}\,\mathrm{m}$, so $v = \sqrt{\frac{GM}{r}} = \sqrt{\frac{6.67 \times 10^{-11} \cdot 6.0 \times 10^{24}}{${sciT(r)}}} = ${M(sig(vv))}\,\mathrm{m/s} = ${QT(sig(vv / 1000), 'km/s')}$.` };
    },
    () => {
      const k = pick([4, 9, 16, 1 / 4]), T1 = pick([2, 3, 10, 27, 90]), T2 = sig(T1 * k ** 1.5);
      return { q: T`Planet A orbits a star with a period of ${T1} years. Planet B orbits the same star at ${k < 1 ? T`one quarter of` : T`${k} times`} A's orbital radius. What is B's period in years?`, a: T2, u: T`years`, w: [sig(T1 * k), sig(T1 * k * k), sig(T1 * Math.sqrt(k))],
        s: T`Kepler's third law: $T^2 \propto r^3$, so $T_B = T_A \left(\frac{r_B}{r_A}\right)^{3/2} = ${T1} \cdot ${k < 1 ? '(1/4)' : k}^{3/2} = ${M(T2)}$ years.` };
    },
    () => {
      const [name, Mp, Rp] = pick([[T`the Earth`, 6.0e24, 6.4e6], [T`Mars`, 6.4e23, 3.4e6], [T`the Moon`, 7.3e22, 1.74e6]]), v = sig(Math.sqrt(2 * 6.67e-11 * Mp / Rp) / 1000);
      return { q: T`What is the escape speed from the surface of ${name}, in km/s? ($M = ${sciT(Mp, 2)}\,\mathrm{kg}$, $R = ${sciT(Rp, 3)}\,\mathrm{m}$, $G = 6.67 \times 10^{-11}$.)`, a: v, u: 'km/s', w: [sig(v / Math.SQRT2), sig(v * 2), sig(v * v)],
        s: T`$v_{\text{esc}} = \sqrt{\frac{2GM}{R}} = \sqrt{\frac{2 \cdot 6.67 \times 10^{-11} \cdot ${sciT(Mp, 2)}}{${sciT(Rp, 3)}}} = ${QT(v, 'km/s')}$.` };
    },
    () => ({ q: T`The distance between two asteroids is tripled. What happens to the gravitational force between them?`, a: T`It becomes one ninth as large`, w: [T`It becomes one third as large`, T`It becomes three times as large`, T`It stays the same`], only: 'mc',
      s: T`Gravity is an inverse-square law: $F \propto 1/r^2$, so tripling $r$ divides the force by $3^2 = 9$.` }),
  ],
},
{
  id: 'elasticity', stage: 'sh', title: 'Elasticity & Springs',
  blurb: 'Hooke’s law, springs in series and parallel, stress, strain, Young’s modulus and elastic potential energy.',
  lesson: () => T`
<p>An <b>elastic</b> material returns to its original shape when the force is removed. Springs, rubber bands, and steel wires (for small stretches) all behave this way.</p>
<h3>Hooke's law</h3>
${Fm(T`F = k\,x`)}
<p>The extension $x$ is proportional to the force $F$, up to the <b>elastic limit</b>. The spring constant $k$ (in $\mathrm{N/m}$) measures stiffness: a stiff spring has a large $k$.</p>
<h3>Combining springs</h3>
<ul><li><b>Parallel</b> (side by side, sharing the load): $k = k_1 + k_2$. Stiffer.</li><li><b>Series</b> (one below the other): $\dfrac{1}{k} = \dfrac{1}{k_1} + \dfrac{1}{k_2}$. Softer.</li></ul>
<h3>Stress, strain and Young's modulus</h3>
${Fm(T`\sigma = \frac{F}{A} \qquad \varepsilon = \frac{\Delta L}{L} \qquad E = \frac{\sigma}{\varepsilon} = \frac{F L}{A\,\Delta L}`)}
<p>Stress $\sigma$ is force per area (in $\mathrm{Pa}$); strain $\varepsilon$ is the fractional change in length (no unit). The <b>Young's modulus</b> $E$ is a property of the material, not of the particular wire: steel has about $2 \times 10^{11}\,\mathrm{Pa}$.</p>
${Key(T`<p>A stretched or compressed spring stores <b>elastic potential energy</b>:</p><p>$$E_p = \tfrac12 k x^2 = \tfrac12 F x.$$</p><p>It is the area under the force–extension graph, a triangle.</p>`)}
${Tip(T`<p>Extension is the <i>change</i> in length, not the new length. A $20\,\mathrm{cm}$ spring stretched to $25\,\mathrm{cm}$ has $x = 5\,\mathrm{cm} = 0.05\,\mathrm{m}$.</p>`)}`,
  gens: [
    () => {
      const k = ri(2, 60) * 10, x = ri(1, 20) / 100, F = sig(k * x), ask = pick(['F', 'k', 'x']);
      if (ask === 'F') return { q: T`A spring with spring constant ${Q(k, 'N/m')} is stretched by ${Q(x * 100, 'cm')}. What force is needed?`, a: F, u: 'N', w: [sig(k * x * 100), sig(k / x), sig(0.5 * k * x * x, 3)], s: T`$x = ${M(x)}\,\mathrm{m}$, so $F = kx = ${k} \cdot ${M(x)} = ${QT(F, 'N')}$.` };
      if (ask === 'k') return { q: T`A force of ${Q(F, 'N')} stretches a spring by ${Q(x * 100, 'cm')}. What is its spring constant?`, a: k, u: 'N/m', w: [sig(F / (x * 100)), sig(F * x, 3), sig(k * 2)], s: T`$k = \frac{F}{x} = \frac{${M(F)}}{${M(x)}} = ${QT(k, 'N/m')}$.` };
      return { q: T`A spring with $k = ${QT(k, 'N/m')}$ carries a load of ${Q(F, 'N')}. By how many centimetres does it stretch?`, a: sig(x * 100), u: 'cm', w: [sig(x), sig(x * 1000), sig(k / F)], s: T`$x = \frac{F}{k} = \frac{${M(F)}}{${k}} = ${M(x)}\,\mathrm{m} = ${QT(sig(x * 100), 'cm')}$.` };
    },
    () => {
      const k1 = ri(1, 20) * 50, k2 = ri(1, 20) * 50, par = chance(), k = par ? k1 + k2 : sig(k1 * k2 / (k1 + k2));
      return { q: par ? T`Two springs, ${Q(k1, 'N/m')} and ${Q(k2, 'N/m')}, are hung side by side (in parallel) and share a load. What is the combined spring constant?` : T`Two springs, ${Q(k1, 'N/m')} and ${Q(k2, 'N/m')}, are joined end to end (in series). What is the combined spring constant?`,
        a: k, u: 'N/m', w: par ? [sig(k1 * k2 / (k1 + k2)), sig((k1 + k2) / 2), Math.abs(k1 - k2) || k1 * 2] : [k1 + k2, sig((k1 + k2) / 2), Math.min(k1, k2)],
        s: par ? T`In parallel the constants add: $${k1} + ${k2} = ${QT(k, 'N/m')}$.` : T`In series $\frac{1}{k} = \frac{1}{${k1}} + \frac{1}{${k2}}$, so $k = \frac{${k1} \cdot ${k2}}{${k1} + ${k2}} = ${QT(k, 'N/m')}$.` };
    },
    () => {
      const F = ri(1, 10) * 50, d = pick([1, 1.5, 2, 3]), A = Math.PI * (d / 2000) ** 2, st = F / A;
      return { q: T`A wire of diameter ${Q(d, 'mm')} supports a load of ${Q(F, 'N')}. What is the tensile stress in the wire, in MPa?`, a: sig(st / 1e6), u: 'MPa', w: [sig(F / (Math.PI * (d / 1000) ** 2) / 1e6), sig(st / 1e3), sig(F / d)],
        s: T`Cross-sectional area: $A = \pi\left(\frac{d}{2}\right)^2 = \pi (${M(d / 2000)})^2 = ${sciT(A)}\,\mathrm{m^2}$. Stress: $\sigma = \frac{F}{A} = ${sciT(st)}\,\mathrm{Pa} = ${QT(sig(st / 1e6), 'MPa')}$.` };
    },
    () => {
      const [mat, E] = pick([[T`steel`, 2.0e11], [T`copper`, 1.2e11], [T`aluminium`, 7.0e10]]), L = ri(1, 10), A = pick([1, 2, 4, 5]) * 1e-6, F = ri(1, 8) * 50, dL = F * L / (A * E);
      return { q: T`A wire made of ${mat}, ${Q(L, 'm')} long, with a cross-sectional area of ${Q(A * 1e6, 'mm^2')} carries a load of ${Q(F, 'N')}. By how many millimetres does it stretch? (Young's modulus: $${sciT(E, 2)}\,\mathrm{Pa}$.)`, a: sig(dL * 1000), u: 'mm', w: [sig(dL), sig(dL * 1e4), sig(dL * 1000 / L)],
        s: T`$\Delta L = \frac{F L}{A E} = \frac{${F} \cdot ${L}}{${sciT(A)} \cdot ${sciT(E, 2)}} = ${sciT(dL)}\,\mathrm{m} = ${QT(sig(dL * 1000), 'mm')}$.` };
    },
    () => {
      const k = ri(2, 10) * 50, x = ri(2, 8) / 100, E = sig(0.5 * k * x * x), m = pick([0.02, 0.05, 0.1]), v = sig(Math.sqrt(k * x * x / m)), askV = chance();
      return askV
        ? { q: T`A toy launcher uses a spring with $k = ${QT(k, 'N/m')}$ compressed by ${Q(x * 100, 'cm')} to fire a ${Q(m * 1000, 'g')} ball horizontally. Ignoring losses, how fast does the ball leave?`, a: v, u: 'm/s', w: [sig(Math.sqrt(0.5 * k * x * x / m)), sig(k * x / m / 10), sig(Math.sqrt(k * x / m))],
            s: T`$\tfrac12 k x^2 = \tfrac12 m v^2$, so $v = x\sqrt{\frac{k}{m}} = ${M(x)}\sqrt{\frac{${k}}{${M(m)}}} = ${QT(v, 'm/s')}$.` }
        : { q: T`How much elastic potential energy is stored in a spring with $k = ${QT(k, 'N/m')}$ stretched by ${Q(x * 100, 'cm')}?`, a: E, u: 'J', w: [sig(k * x * x), sig(0.5 * k * x), sig(0.5 * k * (x * 100) ** 2 / 1000)],
            s: T`$E_p = \tfrac12 k x^2 = \tfrac12 \cdot ${k} \cdot ${M(x)}^2 = ${QT(E, 'J')}$.` };
    },
    () => ({ q: T`Two wires are made of the same steel, but one is twice as thick (twice the diameter). The same load hangs on each. How does the stretch of the thick wire compare with the thin one?`, a: T`It stretches one quarter as much`, w: [T`It stretches half as much`, T`It stretches the same amount`, T`It stretches twice as much`], only: 'mc',
      s: T`$\Delta L = \frac{FL}{AE}$. Doubling the diameter makes the area $2^2 = 4$ times larger, so the stretch is 4 times smaller. The Young's modulus is the same because the material is the same.` }),
  ],
},
{
  id: 'fluid-statics', stage: 'sh', title: 'Fluids at Rest',
  blurb: 'Density and pressure, pressure at depth, hydraulic presses (Pascal) and buoyancy (Archimedes), floating and sinking.',
  lesson: () => T`
<h3>Density and pressure</h3>
${Fm(T`\rho = \frac{m}{V} \qquad p = \frac{F}{A}`)}
<p>Density is measured in $\mathrm{kg/m^3}$ (water: $1000\,\mathrm{kg/m^3}$) and pressure in pascals, $1\,\mathrm{Pa} = 1\,\mathrm{N/m^2}$. The same force on a smaller area gives a larger pressure, which is why knives are sharp and snowshoes are wide.</p>
<h3>Pressure in a liquid</h3>
${Fm(T`p = p_0 + \rho g h`)}
<p>The pressure at depth $h$ is the pressure at the surface $p_0$ (atmospheric pressure, about $1.0 \times 10^{5}\,\mathrm{Pa}$) plus the weight of the liquid above each square metre, $\rho g h$. It depends only on depth, not on the shape of the container, and acts equally in all directions.</p>
<h3>Pascal's principle and hydraulics</h3>
<p>Pressure applied to an enclosed liquid is passed on undiminished to every part of it. In a hydraulic press or car lift the pressure is the same under both pistons, so</p>
${Fm(T`\frac{F_1}{A_1} = \frac{F_2}{A_2}`)}
<p>A small force on a small piston lifts a large load on a large piston.</p>
${Key(T`<p><b>Archimedes' principle:</b> a body in a fluid feels an upward <b>buoyant force</b> equal to the weight of the fluid it displaces:</p><p>$$F_B = \rho_{\text{fluid}}\, g\, V_{\text{submerged}}.$$</p><p>A floating object displaces its own weight of fluid, so the fraction under the surface is $\dfrac{\rho_{\text{object}}}{\rho_{\text{fluid}}}$.</p>`)}
${Ex(T`<p>A $0.002\,\mathrm{m^3}$ stone is fully under water ($g = 10\,\mathrm{m/s^2}$). Buoyant force: $1000 \cdot 10 \cdot 0.002 = 20\,\mathrm{N}$. If the stone weighs $50\,\mathrm{N}$ in air, it seems to weigh only $50 - 20 = 30\,\mathrm{N}$ in the water.</p>`)}
${Tip(T`<p>Use the density of the <b>fluid</b> in $F_B = \rho g V$, not the density of the object.</p>`)}`,
  gens: [
    () => {
      const F = ri(2, 80) * 10, A = pick([0.01, 0.02, 0.05, 0.1, 0.25, 0.5]), p = sig(F / A);
      return { q: T`A box weighing ${Q(F, 'N')} rests on a base of area ${Q(A, 'm^2')}. What pressure does it exert on the floor?`, a: p, u: 'Pa', w: [sig(F * A), sig(F / A / 100), sig(F / (A * 1e4))], s: T`$p = \frac{F}{A} = \frac{${F}}{${M(A)}} = ${QT(p, 'Pa')}$.` };
    },
    () => {
      const g = gPick(), [liq, rho] = pick([[T`fresh water`, 1000], [T`sea water`, 1030], [T`oil`, 800]]), h = ri(1, 40), p = sig(rho * g * h), total = chance();
      return total
        ? { q: T`A diver is ${Q(h, 'm')} below the surface of ${liq} ($\rho = ${QT(rho, 'kg/m^3')}$). Taking atmospheric pressure as $1.0 \times 10^{5}\,\mathrm{Pa}$, what is the total pressure on the diver, in kPa? ${gNote(g)}`, a: sig((p + 1e5) / 1000), u: 'kPa', w: [sig(p / 1000), sig((p + 1e5) / 1e5), sig((rho * h + 1e5) / 1000)],
            s: T`$p = p_0 + \rho g h = 1.0 \times 10^{5} + ${rho} \cdot ${M(g)} \cdot ${h} = ${M(sig(p + 1e5, 6))}\,\mathrm{Pa} = ${QT(sig((p + 1e5) / 1000), 'kPa')}$.` }
        : { q: T`What is the pressure due to the liquid alone at a depth of ${Q(h, 'm')} in ${liq} ($\rho = ${QT(rho, 'kg/m^3')}$)? ${gNote(g)}`, a: p, u: 'Pa', w: [sig(rho * h), sig(p + 1e5), sig(rho * g / h)], s: T`$p = \rho g h = ${rho} \cdot ${M(g)} \cdot ${h} = ${QT(p, 'Pa')}$.` };
    },
    () => {
      const A1 = pick([2, 4, 5, 10, 20]), A2 = A1 * pick([10, 20, 25, 50, 100]), F2 = ri(5, 40) * 100, F1 = sig(F2 * A1 / A2);
      return { q: T`In a hydraulic car lift the small piston has an area of ${Q(A1, 'cm^2')} and the large piston ${Q(A2, 'cm^2')}. What force on the small piston lifts a load of ${Q(F2, 'N')}?`, a: F1, u: 'N', w: [sig(F2 * A2 / A1), sig(F2 * Math.sqrt(A1 / A2)), sig(F2 / 2)],
        s: T`The pressure is the same: $\frac{F_1}{${A1}} = \frac{${F2}}{${A2}}$, so $F_1 = ${F2} \cdot \frac{${A1}}{${A2}} = ${QT(F1, 'N')}$. (The units of area cancel, so cm² can be used directly.)` };
    },
    () => {
      const g = gPick(), V = ri(1, 50) / 1000, W = sig(V * pick([2500, 2700, 7800, 8900]) * g), Fb = sig(1000 * g * V), app = chance();
      return app
        ? { q: T`A metal block of volume ${Q(V * 1e6, 'cm^3')} weighs ${Q(W, 'N')} in air. What does it seem to weigh when fully under water ($\rho = 1000\,\mathrm{kg/m^3}$)? ${gNote(g)}`, a: sig(W - Fb), u: 'N', w: [Fb, sig(W + Fb), W],
            s: T`$V = ${M(V)}\,\mathrm{m^3}$. Buoyant force: $F_B = \rho g V = 1000 \cdot ${M(g)} \cdot ${M(V)} = ${M(Fb)}\,\mathrm{N}$. Apparent weight: $${M(W)} - ${M(Fb)} = ${QT(sig(W - Fb), 'N')}$.` }
        : { q: T`An object of volume ${Q(V * 1e6, 'cm^3')} is completely submerged in water ($\rho = 1000\,\mathrm{kg/m^3}$). What is the buoyant force on it? ${gNote(g)}`, a: Fb, u: 'N', w: [sig(Fb * 1000), sig(1000 * V), sig(Fb / g)],
            s: T`$V = ${M(V * 1e6)}\,\mathrm{cm^3} = ${M(V)}\,\mathrm{m^3}$, so $F_B = \rho g V = 1000 \cdot ${M(g)} \cdot ${M(V)} = ${QT(Fb, 'N')}$.` };
    },
    () => {
      const [obj, ro] = pick([[T`block of wood`, pick([500, 600, 700, 800])], [T`block of ice`, 920], [T`plastic toy`, pick([300, 400, 950])]]), [liq, rl] = pick([[T`fresh water`, 1000], [T`sea water`, 1030]]), f = sig(ro / rl * 100);
      return { q: T`A ${obj} (density ${Q(ro, 'kg/m^3')}) floats in ${liq} (density ${Q(rl, 'kg/m^3')}). What percentage of its volume is below the surface?`, a: f, u: '%', w: [sig(100 - f), sig(rl / ro * 100 > 100 ? 100 * ro / 1000 + 5 : rl / ro * 100), 50],
        s: T`A floating body displaces its own weight: $\rho_{\text{object}} V = \rho_{\text{fluid}} V_{\text{sub}}$, so $\frac{V_{\text{sub}}}{V} = \frac{${ro}}{${rl}} = ${M(sig(f / 100))}$, that is ${NUM(f)}%.` };
    },
    () => pick([
      { q: T`Three differently shaped containers are filled with water to the same depth. Where is the water pressure on the base greatest?`, a: T`It is the same in all three`, w: [T`In the widest container`, T`In the container holding the most water`, T`In the narrowest container`], only: 'mc', s: T`Liquid pressure $p = \rho g h$ depends only on the depth and the density, not on the shape of the container or the amount of liquid.` },
      { q: T`A steel ship floats although steel is denser than water. Why?`, a: T`Its hollow hull displaces a weight of water equal to the ship's weight`, w: [T`Steel becomes lighter in sea water`, T`The air above the water holds it up`, T`Water pressure is zero at the surface`], only: 'mc', s: T`The hull encloses a large volume, so the ship's average density (steel plus air) is less than that of water, and it sinks only until the displaced water weighs as much as the ship.` },
    ]),
  ],
},
{
  id: 'fluid-dynamics', stage: 'sh', title: 'Fluids in Motion',
  blurb: 'Flow rate, the continuity equation, Bernoulli’s principle, Torricelli’s law and why faster fluid has lower pressure.',
  lesson: () => T`
<p>For an ideal fluid (incompressible, no friction, steady flow) two simple laws describe the motion.</p>
<h3>Flow rate and continuity</h3>
${Fm(T`Q = \frac{V}{t} = A\,v \qquad A_1 v_1 = A_2 v_2`)}
<p>The volume flow rate $Q$ (in $\mathrm{m^3/s}$) is the same all along a pipe, because the fluid cannot pile up anywhere. Where the pipe narrows, the fluid speeds up. Putting your thumb over a garden hose makes the water squirt faster for this reason.</p>
${Key(T`<p><b>Bernoulli's equation</b> (conservation of energy for a flowing fluid):</p><p>$$p + \tfrac12 \rho v^2 + \rho g h = \text{constant along a streamline}.$$</p><p>In a horizontal pipe, where the fluid flows faster its pressure is lower.</p>`)}
<h3>Torricelli's law</h3>
<p>Water leaking from a hole a depth $h$ below the surface of an open tank comes out at the speed of a free fall from that height:</p>
${Fm(T`v = \sqrt{2 g h}`)}
<h3>Applications</h3>
<ul><li>An aircraft wing makes air flow faster over its top surface, so the pressure above is lower than below: lift.</li><li>A Venturi meter measures flow speed from the pressure drop in a narrow section.</li><li>Two sheets of paper held close together are pushed towards each other when you blow between them.</li></ul>
${Tip(T`<p>If a pipe is described by its diameter, the area goes with the square: halving the diameter makes the area four times smaller and the speed four times larger.</p>`)}`,
  gens: [
    () => {
      const Q0 = ri(2, 40) / 10, V = ri(2, 20) * 100, t = sig(V / Q0), askT = chance();
      return askT
        ? { q: T`A hose delivers water at ${Q(Q0, 'L/s')}. How long does it take to fill a ${Q(V, 'L')} tank?`, a: t, u: 's', w: [sig(V * Q0), sig(t / 60), sig(Q0 / V * 1000)], s: T`$t = \frac{V}{Q} = \frac{${V}}{${M(Q0)}} = ${QT(t, 's')}$.` }
        : { q: T`Water flows at ${Q(Q0, 'm/s')} through a pipe with a cross-sectional area of ${Q(V / 1e4, 'm^2')}. What is the volume flow rate?`, a: sig(Q0 * V / 1e4), u: 'm³/s', w: [sig(Q0 / (V / 1e4)), sig(Q0 * V / 1e3), sig(V / 1e4 / Q0)], s: T`$Q = Av = ${M(V / 1e4)} \cdot ${M(Q0)} = ${QT(sig(Q0 * V / 1e4), 'm^3/s')}$.` };
    },
    () => {
      const d2 = pick([1, 1.5, 2, 2.5, 3, 4]), d1 = sig(d2 * pick([1.5, 2, 2.5, 3]), 3), v1 = ri(1, 6) / 2;
      const v2 = sig(v1 * (d1 / d2) ** 2);
      return { q: T`Water flows at ${Q(v1, 'm/s')} in a pipe of diameter ${Q(d1, 'cm')}. The pipe narrows to a diameter of ${Q(d2, 'cm')}. How fast does the water flow in the narrow part?`, a: v2, u: 'm/s', w: [sig(v1 * d1 / d2), sig(v1 * d2 / d1), sig(v1 * (d2 / d1) ** 2)],
        s: T`$A_1 v_1 = A_2 v_2$ and $A \propto d^2$, so $v_2 = v_1 \left(\frac{d_1}{d_2}\right)^2 = ${M(v1)} \cdot \left(\frac{${M(d1)}}{${M(d2)}}\right)^2 = ${QT(v2, 'm/s')}$.` };
    },
    () => {
      const g = gPick(), h = ri(1, 40) / 5, v = sig(Math.sqrt(2 * g * h));
      return { q: T`A water tank has a small hole ${Q(h, 'm')} below the water surface. How fast does the water come out of the hole? ${gNote(g)}`, a: v, u: 'm/s', w: [sig(Math.sqrt(g * h)), sig(2 * g * h), sig(g * h)],
        s: T`Torricelli's law: $v = \sqrt{2gh} = \sqrt{2 \cdot ${M(g)} \cdot ${M(h)}} = ${QT(v, 'm/s')}$.` };
    },
    () => {
      const g = gPick(), h = ri(1, 10) / 2, y = ri(1, 10) / 2, x = sig(2 * Math.sqrt(h * y));
      return { q: T`A tank stands on the ground. Water spurts horizontally from a small hole ${Q(h, 'm')} below the water surface and ${Q(y, 'm')} above the ground. How far from the tank does the jet hit the ground? ${gNote(g)}`, a: x, u: 'm', w: [sig(Math.sqrt(h * y)), sig(h + y), sig(2 * h * y)],
        s: T`Exit speed: $v = \sqrt{2gh}$. Falling time: $t = \sqrt{2y/g}$. Distance: $x = vt = \sqrt{2gh} \cdot \sqrt{\frac{2y}{g}} = 2\sqrt{hy} = 2\sqrt{${M(h)} \cdot ${M(y)}} = ${QT(x, 'm')}$. The value of $g$ cancels.` };
    },
    () => {
      const [fl, rho] = pick([[T`water`, 1000], [T`air`, 1.2]]), v1 = ri(1, 10), v2 = v1 + ri(2, 20), dp = sig(0.5 * rho * (v2 * v2 - v1 * v1));
      return { q: T`${fl === T`water` ? T`Water` : T`Air`} (density ${Q(rho, 'kg/m^3')}) flows through a horizontal pipe. Its speed rises from ${Q(v1, 'm/s')} to ${Q(v2, 'm/s')} at a narrowing. By how much does the pressure drop?`, a: dp, u: 'Pa', w: [sig(0.5 * rho * (v2 - v1) ** 2), sig(rho * (v2 * v2 - v1 * v1)), sig(0.5 * rho * v2 * v2)],
        s: T`Bernoulli with equal heights: $p_1 - p_2 = \tfrac12 \rho (v_2^2 - v_1^2) = \tfrac12 \cdot ${M(rho)} \cdot (${v2}^2 - ${v1}^2) = ${QT(dp, 'Pa')}$.` };
    },
    () => pick([
      { q: T`You blow a stream of air between two sheets of paper hanging close together. What happens?`, a: T`The sheets move towards each other`, w: [T`The sheets move apart`, T`Nothing happens`, T`Both sheets swing the same way`], only: 'mc', s: T`The fast-moving air between the sheets has a lower pressure (Bernoulli), so the still air outside pushes them together.` },
      { q: T`Water flows steadily through a pipe that becomes narrower. In the narrow part, compared with the wide part:`, a: T`the speed is higher and the pressure is lower`, w: [T`the speed is lower and the pressure is higher`, T`the speed and pressure are both higher`, T`the flow rate is smaller`], only: 'mc', s: T`Continuity makes the water speed up where the area is smaller, and Bernoulli then says its pressure must drop. The volume flow rate stays the same.` },
    ]),
  ],
},
{
  id: 'center-of-mass', stage: 'uni', title: 'Centre of Mass & Angular Momentum',
  blurb: 'Finding the centre of mass, how it moves, angular momentum and its conservation, spinning skaters and turntables.',
  lesson: () => T`
<h3>Centre of mass</h3>
<p>For a set of point masses, the <b>centre of mass</b> is the mass-weighted average position:</p>
${Fm(T`x_{\text{cm}} = \frac{\sum m_i x_i}{\sum m_i} \qquad y_{\text{cm}} = \frac{\sum m_i y_i}{\sum m_i}`)}
<p>The centre of mass of a system moves as if all the mass were concentrated there and all the external forces acted on it: $\Sigma F_{\text{ext}} = M a_{\text{cm}}$. When a shell explodes in mid-air, its fragments fly apart, but their centre of mass keeps following the original parabola.</p>
<h3>Angular momentum</h3>
${Fm(T`L = I\,\omega \qquad \text{(for a point mass: } L = m v r\text{)}`)}
<p>Angular momentum is the rotational counterpart of momentum. A net torque changes it: $\tau = \dfrac{\Delta L}{\Delta t}$.</p>
${Key(T`<p><b>Conservation of angular momentum:</b> if no external torque acts, $L$ stays constant:</p><p>$$I_1 \omega_1 = I_2 \omega_2.$$</p><p>A figure skater who pulls in her arms reduces $I$, so $\omega$ goes up and she spins faster.</p>`)}
${Ex(T`<p>A skater spins at $2\,\mathrm{rev/s}$ with $I = 4\,\mathrm{kg\,m^2}$ and pulls her arms in to $I = 1.6\,\mathrm{kg\,m^2}$. Then $\omega_2 = \frac{4 \cdot 2}{1.6} = 5\,\mathrm{rev/s}$. Her kinetic energy $\tfrac12 I\omega^2$ rises by a factor of $2.5$; the extra energy comes from the work her muscles do.</p>`)}
${Tip(T`<p>In $I_1\omega_1 = I_2\omega_2$ you can keep $\omega$ in rev/s or rpm, as long as both sides use the same unit.</p>`)}`,
  gens: [
    () => {
      const m1 = ri(1, 10), m2 = ri(1, 10), x1 = 0, x2 = ri(2, 20) / 2, x = sig(m2 * x2 / (m1 + m2));
      return { q: T`A ${Q(m1, 'kg')} mass sits at $x = 0$ and a ${Q(m2, 'kg')} mass at $x = ${QT(x2, 'm')}$. Where is their centre of mass?`, a: x, u: 'm', w: [sig(x2 / 2), sig(m1 * x2 / (m1 + m2)), sig(m2 * x2 / m1)],
        s: T`$x_{\text{cm}} = \frac{${m1} \cdot 0 + ${m2} \cdot ${M(x2)}}{${m1} + ${m2}} = ${QT(x, 'm')}$. It is nearer the heavier mass.` };
    },
    () => {
      const ms = Array.from({ length: 3 }, () => ri(1, 6)), xs = [0, ri(1, 4), ri(5, 9)], x = sig(ms.reduce((s, m, i) => s + m * xs[i], 0) / sum(ms));
      return { q: T`Masses of ${ms.map(m => Q(m, 'kg')).join(LS())} lie on a line at $x = ${xs.map(v => QT(v, 'm')).join(LS())}$ respectively. Find the $x$-coordinate of their centre of mass.`, a: x, u: 'm', w: [sig(sum(xs) / 3), sig(ms.reduce((s, m, i) => s + m * xs[i], 0) / 3), sig(x + 1)],
        s: T`$x_{\text{cm}} = \frac{${ms.map((m, i) => `${m} \\cdot ${xs[i]}`).join(' + ')}}{${ms.join(' + ')}} = \frac{${ms.reduce((s, m, i) => s + m * xs[i], 0)}}{${sum(ms)}} = ${QT(x, 'm')}$.` };
    },
    () => {
      const I = ri(1, 40) / 10, rpm = pick([30, 45, 60, 120, 300]), w = 2 * Math.PI * rpm / 60, L = sig(I * w);
      return { q: T`A wheel with moment of inertia ${Q(I, 'kg m^2')} spins at ${rpm} rpm. What is its angular momentum?`, a: L, u: 'kg m²/s', w: [sig(I * rpm), sig(0.5 * I * w * w), sig(I * rpm / 60)],
        s: T`$\omega = 2\pi \cdot \frac{${rpm}}{60} = ${M(sig(w))}\,\mathrm{rad/s}$, so $L = I\omega = ${M(I)} \cdot ${M(sig(w))} = ${QT(L, 'kg\\,m^2/s')}$.` };
    },
    () => {
      const I1 = ri(20, 60) / 10, I2 = sig(I1 / pick([1.5, 2, 2.5, 3, 4]), 3), w1 = ri(2, 8) / 2, w2 = sig(I1 * w1 / I2);
      return { q: T`A skater spinning at ${Q(w1, 'rev/s')} with a moment of inertia of ${Q(I1, 'kg m^2')} pulls in her arms, reducing it to ${Q(I2, 'kg m^2')}. How fast does she now spin?`, a: w2, u: 'rev/s', w: [sig(I2 * w1 / I1), sig(w1 * Math.sqrt(I1 / I2)), w1],
        s: T`No external torque, so $I_1\omega_1 = I_2\omega_2$: $\omega_2 = \frac{${M(I1)} \cdot ${M(w1)}}{${M(I2)}} = ${QT(w2, 'rev/s')}$.` };
    },
    () => {
      const I = ri(100, 500), w = ri(4, 20) / 10, m = ri(20, 50), r = ri(10, 25) / 10, w2 = sig(I * w / (I + m * r * r));
      return { q: T`A playground roundabout (moment of inertia ${Q(I, 'kg m^2')}) turns freely at ${Q(w, 'rad/s')}. A ${Q(m, 'kg')} child jumps on at its edge, ${Q(r, 'm')} from the axis. What is the new angular speed?`, a: w2, u: 'rad/s', w: [sig(I * w / (I + m * r)), sig(w * m / I), w],
        s: T`The child adds $mr^2 = ${m} \cdot ${M(r)}^2 = ${M(sig(m * r * r))}\,\mathrm{kg\,m^2}$. Conserving $L$: $\omega_2 = \frac{${I} \cdot ${M(w)}}{${I} + ${M(sig(m * r * r))}} = ${QT(w2, 'rad/s')}$.` };
    },
    () => pick([
      { q: T`A firework shell flying along a parabola explodes into many pieces. Ignoring air resistance, what happens to the centre of mass of all the pieces?`, a: T`It continues along the original parabola`, w: [T`It stops at the point of the explosion`, T`It falls straight down`, T`It moves in a straight line at constant speed`], only: 'mc', s: T`The explosion forces are internal. Only gravity acts from outside, so the centre of mass carries on exactly as the unexploded shell would have.` },
      { q: T`A diver tucks into a tight ball in mid-air. What happens to her rate of spin?`, a: T`It increases, because her moment of inertia decreases`, w: [T`It decreases, because she is more compact`, T`It stays the same`, T`It increases, because gravity gives her a torque`], only: 'mc', s: T`In the air there is no external torque about her centre of mass, so $I\omega$ is constant. Tucking in reduces $I$, so $\omega$ increases.` },
    ]),
  ],
},
  ],
});
})();
