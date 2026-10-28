// Six-microphone array: five on a 15 cm radius ring, one on a 15 cm post.
// Far-field delays from the source's unit direction vector, as in the spec.
export const R_RING = 0.15, POST = 0.15, C = 343, FS = 48000;
export const MICS: [number, number, number][] = [0, 1, 2, 3, 4].map((i) => {
  const a = (i * 2 * Math.PI) / 5;
  return [R_RING * Math.cos(a), R_RING * Math.sin(a), 0];
});
MICS.push([0, 0, POST]);
export const MAX_US = 832;    // 2 * 0.15 * sin(72deg) / 343
export const SAMPLE_US = 1e6 / FS;

export const unit = (azDeg: number, elDeg: number): [number, number, number] => {
  const az = (azDeg * Math.PI) / 180, el = (elDeg * Math.PI) / 180;
  return [Math.cos(el) * Math.cos(az), Math.cos(el) * Math.sin(az), Math.sin(el)];
};
export const delays = (u: number[]) => MICS.map((p) => -(u[0] * p[0] + u[1] * p[1] + u[2] * p[2]) / C);

// Least-squares direction from delays relative to their mean. With the raised
// mic off the vertical component is unobservable: we solve for x and y only and
// return both signs of z, which is exactly the ambiguity the figure shows.
export function solve(tau: number[], useRaised: boolean) {
  const idx = useRaised ? [0, 1, 2, 3, 4, 5] : [0, 1, 2, 3, 4];
  const mt = idx.reduce((a, i) => a + tau[i], 0) / idx.length;
  const mp = [0, 1, 2].map((k) => idx.reduce((a, i) => a + MICS[i][k], 0) / idx.length);
  const dims = useRaised ? 3 : 2;
  const A = Array.from({ length: dims }, () => new Array(dims).fill(0));
  const b = new Array(dims).fill(0);
  for (const i of idx) {
    const row = [0, 1, 2].slice(0, dims).map((k) => -(MICS[i][k] - mp[k]) / C);
    const y = tau[i] - mt;
    for (let r = 0; r < dims; r++) { b[r] += row[r] * y; for (let c = 0; c < dims; c++) A[r][c] += row[r] * row[c]; }
  }
  const x = gauss(A, b);
  if (useRaised) {
    const n = Math.hypot(x[0], x[1], x[2]) || 1;
    return [[x[0] / n, x[1] / n, x[2] / n]];
  }
  let h = Math.hypot(x[0], x[1]);
  if (h > 1) { x[0] /= h; x[1] /= h; h = 1; }
  const z = Math.sqrt(Math.max(0, 1 - h * h));
  return [[x[0], x[1], z], [x[0], x[1], -z]];
}
function gauss(A: number[][], b: number[]) {
  const n = b.length, M = A.map((r, i) => [...r, b[i]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    [M[c], M[p]] = [M[p], M[c]];
    for (let r = 0; r < n; r++) if (r !== c) {
      const f = M[r][c] / (M[c][c] || 1e-12);
      for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k];
    }
  }
  return M.map((r, i) => r[n] / (r[i] || 1e-12));
}

// Orthographic camera: yaw around z, then tilt by pitch. World z is up.
// The orbit never comes within ~60 units of the sides, so the visible box
// (X0..X0+VW) crops that margin away and the array draws bigger.
export const VIEW = { W: 560, H: 380, cx: 280, cy: 212, scale: 630, X0: 60, VW: 440 };
export function projector(yawDeg: number, pitchDeg: number) {
  const ya = (yawDeg * Math.PI) / 180, pa = (pitchDeg * Math.PI) / 180;
  const cy = Math.cos(ya), sy = Math.sin(ya), cp = Math.cos(pa), sp = Math.sin(pa);
  return (p: number[]) => {
    const x1 = p[0] * cy - p[1] * sy, y1 = p[0] * sy + p[1] * cy, z1 = p[2];
    return {
      x: VIEW.cx + x1 * VIEW.scale,
      y: VIEW.cy - (z1 * cp + y1 * sp) * VIEW.scale,
      depth: y1 * cp - z1 * sp,          // larger is further away
    };
  };
}
export const DIST = 0.32;   // how far out the drone is drawn, metres

// Everything the SVG needs for one frame, so the server can draw the default
// view and the client can redraw on every change from the same code.
export function scene(o: { yaw: number; pitch: number; az: number; el: number; raised: boolean; jitter?: number[] }) {
  const P = projector(o.yaw, o.pitch);
  const u = unit(o.az, o.el);
  let tau = delays(u);
  if (o.jitter) tau = tau.map((t, i) => t + o.jitter![i]);
  const t0 = Math.min(...tau.slice(0, o.raised ? 6 : 5));
  const bars = tau.map((t, i) => (i === 5 && !o.raised ? null : (t - t0) * 1e6));
  const ests = solve(tau, o.raised);
  const ring = Array.from({ length: 65 }, (_, i) => {
    const a = (i / 64) * 2 * Math.PI; return P([R_RING * Math.cos(a), R_RING * Math.sin(a), 0]);
  });
  const orbit = Array.from({ length: 97 }, (_, i) => {
    const a = (i / 96) * 2 * Math.PI; return P([DIST * Math.cos(a), DIST * Math.sin(a), 0]);
  });
  const drone = [u[0] * DIST, u[1] * DIST, u[2] * DIST];
  const ghost = [drone[0], drone[1], -drone[2]];
  const foot = [drone[0], drone[1], 0];
  return {
    ring: ring.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' '),
    orbit: orbit.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' '),
    center: P([0, 0, 0]), postTop: P([0, 0, POST]),
    mics: MICS.map((m, i) => ({ i, ...P(m) })),
    drone: P(drone), ghost: P(ghost), foot: P(foot),
    ests: ests.map((e) => P([e[0] * DIST, e[1] * DIST, e[2] * DIST])),
    dirs: ests, bars,
  };
}
