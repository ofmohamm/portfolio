// Understory: a seeded canopy grown around a resting panther.
// Works with any p5 instance (instance mode), so the site mock and the seed
// explorer share this one file. See design/art/understory.md.

// ---------------------------------------------------------------------------
// Compositions. Coordinates are fractions of the canvas; the limb always
// enters from the right edge and runs left.
//   wide  the original 1200x560 piece (seed explorer)
//   hero  full-bleed masthead: the limb crosses the whole screen, edge to edge
//   side  compact piece for the top-right margin
// ---------------------------------------------------------------------------
export const LAYOUTS = {
  wide: { W: 1200, H: 560, limb: [[1.04, 0.6], [0.72, 0.66], [0.38, 0.8], [0.05, 0.73]], t: 0.52, clear: [0.36, 0.66], pw: 420, thick: 1 },
  hero: { W: 1800, H: 560, limb: [[1.03, 0.55], [0.7, 0.63], [0.34, 0.83], [-0.03, 0.7]], t: 0.5, clear: [0.41, 0.6], pw: 420, thick: 1 },
  side: { W: 640, H: 520, limb: [[1.05, 0.5], [0.8, 0.55], [0.5, 0.68], [0.1, 0.62]], t: 0.47, clear: [0.24, 0.72], pw: 330, thick: 0.75 },
};
let L, W, H, LIMB, PANTHER_T, CLEAR;
export function useLayout(name = 'wide') {
  L = LAYOUTS[name] || LAYOUTS.wide;
  W = L.W; H = L.H; PANTHER_T = L.t; CLEAR = L.clear;
  LIMB = L.limb.map(([x, y]) => [x * W, y * H]);
  return L;
}
useLayout('wide');

// ---------------------------------------------------------------------------
// Habitats: where black panthers actually live. Each sets the leaf shape,
// palette, base density, light, bark, and the extra growth that makes the
// place recognisable.
// ---------------------------------------------------------------------------
export const HABITATS = {
  // Nagarhole / Kabini, South India: dry deciduous forest. Broad teak leaves,
  // the odd one turning ochre, a lot of sun. Sparse, so it melts into the page.
  kabini: {
    name: 'Kabini teak',
    density: 0.42, light: 1.0, droop: 0.35,
    sun: [244, 214, 128], bark: '#6B5C47', barkHi: '#9A8A70', knot: [84, 70, 52],
    leaves: ['#41592A', '#4F6830', '#5E7636', '#6C833C', '#7D8E42', '#93974A'], vein: '#3A3F1C',
    dry: ['#B08A45', '#A0763A', '#C29B52'], dryChance: 0.12,
    shape: 'teak', len: 50, tip: 1, maxDepth: 2, spread: 1.05, extras: [],
  },
  // A banyan / strangler fig: leopards' favourite day bed. Small leathery
  // oval leaves in clusters, aerial roots, ripe figs. Medium.
  banyan: {
    name: 'Banyan fig',
    density: 0.75, light: 0.6, droop: 0.5,
    sun: [236, 220, 150], bark: '#5A4E3E', barkHi: '#867A66', knot: [64, 55, 43],
    leaves: ['#26472F', '#2F5A3A', '#3A6A43', '#4A7A4A', '#5C8A50'], vein: '#1B3322',
    shape: 'oval', len: 17, tip: 4, extras: ['roots', 'figs'],
  },
  // Peninsular Malaysia / Java rainforest: glossy drip-tip leaves, lianas
  // with heart leaves, ferns and moss on the limb, deep shade behind. Dense.
  rainforest: {
    name: 'Malayan rainforest',
    density: 1.15, light: 0.35, droop: 0.8,
    sun: [210, 226, 150], bark: '#3F3529', barkHi: '#6E6250', knot: [46, 39, 30],
    leaves: ['#17382A', '#1F4A33', '#2A5C3C', '#376D45', '#4A8150', '#5E9655'], vein: '#10261B',
    shape: 'drip', len: 30, tip: 3, extras: ['backdrop', 'lianas', 'epiphytes', 'moss'],
  },
};

// Slider values are multipliers on the habitat's own base values.
export const DEFAULTS = {
  seed: 4217,
  habitat: 'kabini',
  density: 1,     // shoots and leaves
  reach: 1,       // branch length
  leafSize: 1,
  light: 1,       // dappled sun pools
  droop: 1,       // hanging growth
};

const WIDTH = { teak: 0.42, drip: 0.34, oval: 0.36, blade: 0.1, heart: 0.5, almond: 0.3 };

function cubic(a, b, c, d, t) {
  const u = 1 - t;
  const x = u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0];
  const y = u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1];
  const dx = 3 * u * u * (b[0] - a[0]) + 6 * u * t * (c[0] - b[0]) + 3 * t * t * (d[0] - c[0]);
  const dy = 3 * u * u * (b[1] - a[1]) + 6 * u * t * (c[1] - b[1]) + 3 * t * t * (d[1] - c[1]);
  return [x, y, Math.atan2(dy, dx)];
}
export const limbAt = (t) => cubic(LIMB[0], LIMB[1], LIMB[2], LIMB[3], t);
const limbWidth = (t) => (30 - 24 * Math.pow(t, 0.9)) * L.thick;

// Where the panther goes, in canvas units: the limb's top surface at PANTHER_T
// and the angle of the limb read left-to-right.
export function pantherAnchor(layout = 'wide') {
  useLayout(layout);
  const [x, y, a] = limbAt(PANTHER_T);
  const w = limbWidth(PANTHER_T);
  // The limb runs right to left (a is about PI), so (-sin a, cos a) points up.
  const nx = -Math.sin(a), ny = Math.cos(a);
  return { x: x + nx * w * 0.5, y: y + ny * w * 0.5, angle: Math.atan2(-Math.sin(a), -Math.cos(a)) };
}

const angDiff = (a, b) => Math.atan2(Math.sin(a - b), Math.cos(a - b));

export function drawCanopy(p, overrides = {}, layout = 'wide') {
  useLayout(layout);
  const P = { ...DEFAULTS, ...overrides };
  const HB = HABITATS[P.habitat] || HABITATS.banyan;
  const has = (x) => HB.extras.includes(x);
  const span = W / 1200;                         // wider canvases get proportionally more growth
  const dens = HB.density * P.density;
  const droop = Math.min(1, HB.droop * P.droop);
  p.randomSeed(P.seed);
  p.noiseSeed(P.seed);
  p.clear();
  const ctx = p.drawingContext;
  const R = (a, b) => p.random(a, b);
  const pick = (arr) => arr[Math.floor(p.random(arr.length))];

  // ---- drawing helpers ------------------------------------------------------
  function shapePath(shape, len, wd) {
    p.beginShape();
    p.vertex(0, 0);
    if (shape === 'teak') {
      p.bezierVertex(len * 0.06, -wd * 1.05, len * 0.72, -wd * 1.15, len, 0);
      p.bezierVertex(len * 0.72, wd * 1.15, len * 0.06, wd * 1.05, 0, 0);
    } else if (shape === 'drip') {
      p.bezierVertex(len * 0.12, -wd, len * 0.6, -wd * 1.05, len * 0.8, -wd * 0.3);
      p.bezierVertex(len * 0.88, -wd * 0.1, len * 0.94, -wd * 0.03, len, 0);
      p.bezierVertex(len * 0.94, wd * 0.03, len * 0.88, wd * 0.1, len * 0.8, wd * 0.3);
      p.bezierVertex(len * 0.6, wd * 1.05, len * 0.12, wd, 0, 0);
    } else if (shape === 'oval') {
      p.bezierVertex(len * 0.04, -wd * 1.25, len * 0.9, -wd * 1.3, len, 0);
      p.bezierVertex(len * 0.9, wd * 1.3, len * 0.04, wd * 1.25, 0, 0);
    } else if (shape === 'heart') {
      p.bezierVertex(-len * 0.18, -len * 0.48, len * 0.5, -len * 0.55, len, 0);
      p.bezierVertex(len * 0.5, len * 0.55, -len * 0.18, len * 0.48, 0, 0);
    } else {                                     // almond, blade
      p.bezierVertex(len * 0.18, -wd, len * 0.7, -wd * 0.75, len, 0);
      p.bezierVertex(len * 0.7, wd * 0.75, len * 0.18, wd, 0, 0);
    }
    p.endShape(p.CLOSE);
  }

  // One leaf. Size and colour follow the light field: sunlit regions grow
  // bigger, paler leaves; shade keeps them small and deep.
  function leaf(x, y, ang, Lb, shade, alpha = 1, shape = HB.shape, palette = HB.leaves) {
    const n = p.noise(x * 0.004, y * 0.004);
    const idx = Math.min(palette.length - 1, Math.max(0, Math.floor((n * 1.35 + shade) * palette.length - 1)));
    const dry = HB.dry && palette === HB.leaves && p.random() < HB.dryChance;   // the odd leaf turning
    const c = p.color(dry ? pick(HB.dry) : palette[idx]);
    c.setAlpha(255 * alpha * R(0.8, 0.96));
    const len = Lb * (0.75 + n * 0.6);
    const wd = len * WIDTH[shape] * R(0.9, 1.1);
    p.push();
    p.translate(x, y);
    p.rotate(ang);
    p.noStroke(); p.fill(c);
    shapePath(shape, len, wd);
    const v = p.color(HB.vein); v.setAlpha(80 * alpha);
    p.stroke(v); p.strokeWeight(shape === 'teak' ? 1 : 0.8); p.noFill();
    if (shape !== 'heart') p.line(0, 0, len * 0.86, 0);
    if (shape === 'teak') {                       // teak's big lateral veins
      for (let i = 1; i <= 4; i++) {
        const t = i / 5.2;
        p.line(len * t, 0, len * (t + 0.12), -wd * 0.75 * (1 - t * 0.5));
        p.line(len * t, 0, len * (t + 0.12), wd * 0.75 * (1 - t * 0.5));
      }
    }
    if (shape === 'drip' || shape === 'oval') {  // waxy gloss
      p.stroke(255, 255, 255, 34 * alpha); p.strokeWeight(1.1);
      p.bezier(len * 0.15, -wd * 0.4, len * 0.35, -wd * 0.75, len * 0.6, -wd * 0.7, len * 0.78, -wd * 0.28);
    }
    p.pop();
  }

  function fig(x, y) {
    const r = R(3, 4.6);
    p.noStroke();
    p.fill(pick(['#B5653A', '#C98A4A', '#9C4E36', '#D4A055']));
    p.circle(x, y, r * 2);
    p.fill(255, 240, 210, 90);
    p.circle(x - r * 0.35, y - r * 0.35, r * 0.7);
  }

  function taper(x1, y1, cx, cy, x2, y2, w1, w2, alpha) {
    const steps = 14, left = [], right = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps, u = 1 - t;
      const x = u * u * x1 + 2 * u * t * cx + t * t * x2;
      const y = u * u * y1 + 2 * u * t * cy + t * t * y2;
      const dx = 2 * u * (cx - x1) + 2 * t * (x2 - cx);
      const dy = 2 * u * (cy - y1) + 2 * t * (y2 - cy);
      const m = Math.hypot(dx, dy) || 1, w = (w1 + (w2 - w1) * t) / 2;
      left.push([x - (dy / m) * w, y + (dx / m) * w]);
      right.push([x + (dy / m) * w, y - (dx / m) * w]);
    }
    const c = p.color(HB.bark); c.setAlpha(255 * alpha);
    p.noStroke(); p.fill(c);
    p.beginShape();
    for (const q of left) p.vertex(q[0], q[1]);
    for (let i = right.length - 1; i >= 0; i--) p.vertex(right[i][0], right[i][1]);
    p.endShape(p.CLOSE);
  }

  // Recursive growth. Up-shoots lean toward light (upper left), hanging ones
  // toward gravity. Children keep most of the length and two thirds of girth.
  function grow(x, y, ang, len, w, depth, maxD, o) {
    maxD = Math.min(maxD, HB.maxDepth ?? 9);       // coarse-branched trees (teak) stop early
    const bend = (p.noise(x * 0.008, y * 0.008, depth * 0.7) - 0.5) * 1.1;
    const target = o.down ? Math.PI / 2 : -Math.PI / 2 - 0.32;
    const a = ang + bend + angDiff(target, ang + bend) * (o.down ? 0.12 : 0.2);
    const x2 = x + Math.cos(a) * len, y2 = y + Math.sin(a) * len;
    const atEdge = y2 < 22 || y2 > H - 10 || x2 < -20 || x2 > W + 20;
    const cx = x + Math.cos(ang) * len * 0.5, cy = y + Math.sin(ang) * len * 0.5;
    taper(x, y, cx, cy, x2, y2, w, w * 0.66, o.alpha);

    const Lb = HB.len * P.leafSize * (1 - depth * 0.06);
    if (depth >= 1) {
      const n = Math.floor((len / (HB.len * 0.75)) * (0.4 + dens * 0.7));
      let side = p.random() < 0.5 ? 1 : -1;
      for (let i = 0; i < n; i++) {
        const t = (i + 0.6) / (n + 0.4), u = 1 - t;
        const lx = u * u * x + 2 * u * t * cx + t * t * x2;
        const ly = u * u * y + 2 * u * t * cy + t * t * y2;
        const tan = Math.atan2(2 * u * (cy - y) + 2 * t * (y2 - cy), 2 * u * (cx - x) + 2 * t * (x2 - cx));
        leaf(lx, ly, tan + side * ((HB.spread ?? 0.75) + R(-0.25, 0.25)) + (o.down ? 0.25 * side : 0), Lb, depth * 0.06 - (o.back ? 0.15 : 0), o.alpha);
        if (has('figs') && !o.back && p.random() < 0.12) fig(lx + R(-4, 4), ly + R(2, 6));
        side = -side;
      }
    }
    if (depth >= maxD || w < 0.9 || atEdge) {
      for (let k = 0; k < HB.tip; k++) {
        const off = (k - (HB.tip - 1) / 2) * (1.2 / Math.max(1, HB.tip - 1));
        leaf(x2, y2, a + off + R(-0.15, 0.15), Lb * 1.05, 0.2, o.alpha);
      }
      return;
    }
    const kids = p.random() < 0.22 ? 3 : 2;
    for (let k = 0; k < kids; k++) {
      const spread = R(0.32, 0.55);
      grow(x2, y2, a + (k - (kids - 1) / 2) * spread + R(-0.1, 0.1), len * R(0.68, 0.82) * P.reach, w * 0.66, depth + 1, maxD, o);
    }
  }

  // ---- 1. Rainforest: a shaded canopy far behind ------------------------------
  if (has('backdrop')) {
    const g = ctx.createLinearGradient(0, 0, 0, H * 0.7);
    g.addColorStop(0, 'rgba(23,56,42,0.16)');
    g.addColorStop(1, 'rgba(23,56,42,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H * 0.7);
    const count = Math.round(240 * span * dens);
    for (let i = 0; i < count; i++) {
      const x = R(-20, W + 20), y = H * 0.62 * Math.pow(p.random(), 1.6) - 10;
      leaf(x, y, R(0, Math.PI * 2), HB.len * R(0.8, 1.3), -0.35, R(0.18, 0.32));
    }
  }

  // ---- 2. Pools of light, where the field runs high --------------------------
  const pools = Math.round(46 * HB.light * P.light * span);
  const [sr, sg, sb] = HB.sun;
  for (let i = 0; i < pools; i++) {
    const x = R(0, W), y = R(-20, H * 0.8);
    const n = p.noise(x * 0.003, y * 0.003);
    if (n < 0.42) continue;
    const r = R(40, 130) * (0.6 + n);
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(${sr},${sg},${sb},${(0.32 * n).toFixed(3)})`);
    g.addColorStop(1, `rgba(${sr},${sg},${sb},0)`);
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }

  // ---- 4. Rainforest: lianas looping in from above ----------------------------
  if (has('lianas')) {
    const vines = Math.round(4 * span * droop);
    for (let k = 0; k < vines; k++) {
      const x0 = R(-50, W + 50), x1 = x0 + R(-300, 300), sag = R(H * 0.35, H * 0.72);
      const hang = p.random() < 0.4;                // some just hang free
      const ex = hang ? x0 + R(-30, 30) : x1, ey = hang ? R(H * 0.3, H * 0.7) : -12;
      const cx = (x0 + ex) / 2, cy = hang ? (ey * 0.6) : sag * 1.45;
      p.noFill(); p.stroke(74, 70, 46, 200); p.strokeWeight(R(1.6, 2.6));
      p.bezier(x0, -12, cx, cy, cx, cy, ex, ey);
      const steps = Math.floor(Math.hypot(ex - x0, sag) / 24);
      let side = 1;
      for (let i = 1; i < steps; i++) {
        const t = i / steps;
        const lx = p.bezierPoint(x0, cx, cx, ex, t), ly = p.bezierPoint(-12, cy, cy, ey, t);
        const tx = p.bezierTangent(x0, cx, cx, ex, t), ty = p.bezierTangent(-12, cy, cy, ey, t);
        if (p.random() < 0.75) leaf(lx, ly, Math.atan2(ty, tx) + side * 1.25 + R(-0.2, 0.2), R(11, 15), 0.1, 0.95, 'heart');
        side = -side;
      }
    }
  }

  // ---- 5. Banyan: aerial roots from out of frame -------------------------------
  const rootColor = p.color(HB.barkHi);
  function root(x, y, len, alpha) {
    rootColor.setAlpha(255 * alpha);
    p.noFill(); p.stroke(rootColor); p.strokeWeight(R(0.7, 1.9));
    p.beginShape();
    const seg = 12, n = Math.ceil(len / seg), ph = R(0, 100);
    for (let i = 0; i <= n; i++) {
      const yy = y + i * seg;
      p.vertex(x + (p.noise(ph, i * 0.08) - 0.5) * 14, yy);
    }
    p.endShape();
  }
  if (has('roots')) {
    const top = Math.round(7 * span * dens);
    for (let i = 0; i < top; i++) root(R(0, W), -10, R(H * 0.2, H * 0.65), R(0.3, 0.5));
  }

  // ---- 6. Ceiling limbs hanging in from the top edge (back layer) -------------
  const ceiling = Math.round((2 + 4 * droop * dens) * span);
  for (let k = 0; k < ceiling; k++) {
    grow(R(W * 0.02, W * 0.98), -14, Math.PI / 2 + R(-0.6, 0.6), R(50, 90) * P.reach, R(2.5, 4.5), 0, 4, { down: true, alpha: 0.5, back: true });
  }

  // ---- 7. Shoots rising from behind the limb ----------------------------------
  let t = 0.03;
  while (t < 0.97) {
    if (t < CLEAR[0] || t > CLEAR[1]) {
      const [x, y, a] = limbAt(t);
      const up = a + Math.PI / 2 + R(-0.35, 0.35) - 0.15;   // a is about PI, so this points up
      if (p.random() < Math.min(0.95, 0.55 + 0.4 * dens)) {
        grow(x, y, up - R(0.1, 0.5), R(52, 92) * P.reach * (1.1 - t * 0.3), limbWidth(t) * 0.28, 0, t < 0.2 ? 5 : 4, { down: false, alpha: 1 });
      }
    }
    t += R(0.07, 0.13) / (0.5 + dens * 0.6) / span;
  }

  // ---- 8. The limb itself -----------------------------------------------------
  const top = [];
  {
    const n = 90, bot = [];
    for (let i = 0; i <= n; i++) {
      const tt = i / n, [x, y, a] = limbAt(tt), w = limbWidth(tt) / 2;
      const nx = -Math.sin(a), ny = Math.cos(a);              // (nx, ny) points up
      const wob = (p.noise(tt * 6, 9) - 0.5) * 3;
      top.push([x + nx * (w + wob), y + ny * (w + wob)]);
      bot.push([x - nx * w, y - ny * w]);
    }
    p.noStroke(); p.fill(HB.bark);
    p.beginShape();
    for (const q of top) p.vertex(q[0], q[1]);
    for (let i = bot.length - 1; i >= 0; i--) p.vertex(bot[i][0], bot[i][1]);
    p.endShape(p.CLOSE);
    const hi = p.color(HB.barkHi); hi.setAlpha(150);
    p.noFill(); p.stroke(hi); p.strokeWeight(1.6);
    p.beginShape();
    for (let i = 2; i < n - 4; i++) { const [x, y] = top[i]; p.vertex(x, y + 3); }
    p.endShape();
    p.noStroke(); p.fill(...HB.knot, 170);
    for (const kt of [0.14, 0.29, 0.78, 0.9]) {
      const [x, y] = limbAt(kt);
      p.ellipse(x + R(-4, 4), y + R(-2, 2), limbWidth(kt) * 0.5, limbWidth(kt) * 0.28);
    }
  }

  // ---- 9. Rainforest: moss along the top of the limb, ferns growing on it ------
  if (has('moss')) {
    const dots = Math.round(170 * span);
    for (let i = 0; i < dots; i++) {
      const k = Math.floor(R(2, top.length - 3));
      const [x, y] = top[k];
      const mc = p.color(pick(['#5E8A3E', '#7A9A45', '#4C7A3A', '#8DAA52'])); mc.setAlpha(190);
      p.noStroke(); p.fill(mc);
      p.ellipse(x + R(-3, 3), y + R(-1, 2.5), R(2, 5), R(1.5, 3));
    }
  }
  if (has('epiphytes')) {
    let te = 0.06;
    while (te < 0.95) {
      if (te < CLEAR[0] - 0.03 || te > CLEAR[1] + 0.03) {
        const [x, y, a] = limbAt(te);
        const up = a + Math.PI / 2;
        const fronds = Math.floor(R(5, 8));
        for (let j = 0; j < fronds; j++) {
          leaf(x + R(-4, 4), y - limbWidth(te) * 0.45, up + (j - fronds / 2) * 0.28 + R(-0.1, 0.1), R(18, 32), 0.25, 1, 'blade', ['#4A8150', '#5E9655', '#73A85C']);
        }
      }
      te += R(0.1, 0.18) / span;
    }
  }

  // ---- 10. Banyan: aerial roots dropping from the limb -------------------------
  if (has('roots')) {
    let tr = 0.04;
    while (tr < 0.97) {
      if (tr < CLEAR[0] - 0.05 || tr > CLEAR[1] + 0.05) {
        const [x, y] = limbAt(tr);
        root(x, y + limbWidth(tr) * 0.3, R(H * 0.15, H - y + 20), R(0.45, 0.75));
      }
      tr += R(0.02, 0.05) / span / Math.max(0.5, dens);
    }
  }

  // ---- 11. Twigs that drop from the limb, and the leafy tip --------------------
  t = 0.06;
  while (t < 0.95) {
    if ((t < CLEAR[0] - 0.04 || t > CLEAR[1] + 0.04) && p.random() < droop) {
      const [x, y] = limbAt(t);
      grow(x, y + limbWidth(t) * 0.3, Math.PI / 2 + R(-0.5, 0.5), R(40, 80) * P.reach, limbWidth(t) * 0.22, 1, 3, { down: true, alpha: 1 });
    }
    t += R(0.08, 0.15) / span;
  }
  const [tx, ty, ta] = limbAt(1);
  grow(tx, ty, ta + R(-0.2, 0.2), 60 * P.reach, 5, 1, 4, { down: false, alpha: 1 });
}
