// One wake event, sleep to sleep. Durations and currents are relative and
// illustrative; the time axis is unitless, so short states are widened to stay
// legible on a phone (the spec allows stretching time, never the peaks).
export const STATES = [
  { id: 'sleep', label: 'sleep', c: 'slate', w: 150, i: 0.01 },
  { id: 'pir', label: 'PIR wake', c: 'sage', w: 95, i: 0.15 },
  { id: 'boot', label: 'camera boot', c: 'ochre', w: 220, i: 0.45 },
  { id: 'capture', label: 'capture', c: 'ochre', w: 130, i: 0.7 },
  { id: 'infer', label: 'inference', c: 'teal', w: 250, i: 1.0 },
  { id: 'deter', label: 'deter', c: 'clay', w: 300, i: 0.85 },
  { id: 'lte', label: 'LTE tx', c: 'plum', w: 400, i: 0.6 },
  { id: 'sleep2', label: 'sleep', c: 'slate', w: 160, i: 0.01 },
];
export const TOTAL = STATES.reduce((a, s) => a + s.w, 0);
export const Y_MAX = 1.75;
const N = 560;

export const starts: number[] = [];
STATES.reduce((a, s) => (starts.push(a), a + s.w), 0);
const at = (x: number) => {
  let k = STATES.length - 1;
  for (let j = 0; j < STATES.length; j++) if (x < starts[j] + STATES[j].w) { k = j; break; }
  return { k, local: x - starts[k] };
};

// Datasheet model: flat plateaus, instant jumps.
export const datasheet = (x: number) => STATES[at(x).k].i;
export const stateAt = (x: number) => STATES[at(x).k];

// Bench-shaped trace: the same plateaus plus what a list of states leaves out.
const rise = (t: number, w: number) => Math.min(1, Math.max(0, t / w));
const decay = (t: number, tau: number) => Math.exp(-Math.max(0, t) / tau);
const ripple = (x: number, a: number) => a * Math.sin(x * 0.9) * Math.sin(x * 0.23);
const LTE_BASE = 0.425;      // 4 pulses to 1.3 over 600 units averages 0.6
export function measured(x: number) {
  const { k, local: t } = at(x);
  switch (STATES[k].id) {
    case 'sleep': return 0.01 + ripple(x, 0.004);
    case 'pir': return 0.01 + (0.15 - 0.01) * rise(t, 6) + 0.05 * rise(t, 6) * decay(t - 6, 14);
    case 'boot': // inrush to 1.6x, decaying to the plateau
      return 0.15 + (1.6 - 0.15) * rise(t, 4) - (1.6 - 0.45) * rise(t, 4) * (1 - decay(t - 4, 20)) + ripple(x, 0.01);
    case 'capture': return 0.45 + 0.25 * rise(t, 8) + 0.08 * rise(t, 8) * decay(t - 8, 10) + ripple(x, 0.012);
    case 'infer': return 0.7 + 0.3 * rise(t, 32) + ripple(x, 0.03);
    case 'deter': // speaker turn-on spike
      return 1.0 + (1.4 - 1.0) * rise(t, 4) - (1.4 - 0.85) * rise(t, 4) * (1 - decay(t - 4, 16)) + ripple(x, 0.02);
    case 'lte': {
      const settle = LTE_BASE + (0.85 - LTE_BASE) * decay(t, 12);
      const pw = 34, gap = (STATES[k].w - 4 * pw) / 5;
      let p = 0;
      for (let j = 0; j < 4; j++) {
        const s0 = gap * (j + 1) + pw * j;
        if (t >= s0 && t <= s0 + pw) p = Math.min(rise(t - s0, 5), rise(s0 + pw - t, 5));
      }
      return settle + (1.3 - LTE_BASE) * p + ripple(x, 0.012);
    }
    case 'sleep2': return 0.01 + (LTE_BASE - 0.01) * decay(t, 28) + ripple(x, 0.004);
  }
  return 0;
}

export const xs = Array.from({ length: N + 1 }, (_, i) => (i / N) * TOTAL);
export const dataY = xs.map(datasheet);
export const measY = xs.map(measured);

// Charge per event is the area under current: trapezoid rule on the shared
// grid. A ratio of two curves we drew, so it discloses nothing absolute.
const area = (ys: number[]) => ys.slice(1).reduce((a, y, i) => a + (xs[i + 1] - xs[i]) * (y + ys[i]) / 2, 0);
export const CHARGE_RATIO = area(measY) / area(dataY);
// Sample both curves on the same grid so one can morph into the other.
// Add exact boundary points to the datasheet so its jumps are truly vertical.
export function bounds() {
  return starts.map((s, j) => ({ x0: s, x1: s + STATES[j].w, label: STATES[j].label, c: STATES[j].c }));
}

export function geometry(W: number, H: number, pad = { l: 8, r: 8, t: 14, b: 8 }) {
  const sx = (x: number) => pad.l + (x / TOTAL) * (W - pad.l - pad.r);
  const sy = (y: number) => H - pad.b - (y / Y_MAX) * (H - pad.t - pad.b);
  const line = (ys: number[]) =>
    'M' + xs.map((x, i) => `${sx(x).toFixed(1)},${sy(ys[i]).toFixed(1)}`).join('L');
  const area = (ys: number[]) =>
    `${line(ys)}L${sx(TOTAL).toFixed(1)},${sy(0).toFixed(1)}L${sx(0).toFixed(1)},${sy(0).toFixed(1)}Z`;
  // Datasheet path with true vertical edges at every state boundary.
  const step = () => {
    let d = '';
    STATES.forEach((s, j) => {
      const x0 = sx(starts[j]), x1 = sx(starts[j] + s.w), y = sy(s.i).toFixed(1);
      d += (j === 0 ? `M${x0.toFixed(1)},${y}` : `L${x0.toFixed(1)},${y}`) + `L${x1.toFixed(1)},${y}`;
    });
    return d;
  };
  return { sx, sy, line, area, step };
}
