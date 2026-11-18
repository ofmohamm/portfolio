// The soqv1 tracking loop, simulated from the real code:
//   read_kinect.py  one GCC-PHAT estimate per 128-sample block (8 ms at 16 kHz),
//                   lag quantized to whole samples, |ratio| > 0.9 discarded,
//                   sends int(mean of 3) only when the 3 agree within 15 deg,
//                   then clears the buffer.
//   soqv1.ino       holds the last received error; loop every 20 ms adds the
//                   PID output to servoPos, clamped to +/-20 and 0..180.
//   PID_v2          default SampleTime 100 ms (never changed in the sketch), so
//                   the output is recomputed every 100 ms and reused in between.
//                   Derivative on measurement, kd scaled by 1/SampleTime.
// The noise and latency below are modelling assumptions, not measurements.

export const FS = 16000, D = 0.226, C = 343;
export const OUT_LIMIT = 20;
export const PRESETS = [
  { id: 'shipped', label: 'shipped', kp: 0.06, kd: 0.005 },
  { id: 'slow', label: 'too slow', kp: 0.02, kd: 0.005 },
  { id: 'aggressive', label: 'too aggressive', kp: 0.19, kd: 0.005 },
  { id: 'unstable', label: 'unstable', kp: 0.25, kd: 0.02 },
] as const;

export const START = 90, SOURCE = 120, STEP_AT = 0.25, DURATION = 3.0;
const STEP = 0.004;            // 4 ms base step: blocks at 8 ms, loop at 20 ms, PID at 100 ms
const LATENCY = 0.04;          // audio buffering + processing (assumed)
const NOISE = 3.0;             // deg of estimate noise before quantizing (assumed)
const OUTLIER_P = 0.1;         // reflections that look like a new source (assumed)
const SLEW = 600;              // deg/s, hobby servo (assumed)

function rng(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const gauss = (r: () => number) =>
  Math.sqrt(-2 * Math.log(r() || 1e-9)) * Math.cos(2 * Math.PI * r());

// What GCC-PHAT can report: integer samples of lag, mapped back through asin.
// Returns null when |ratio| > 0.9, which read_kinect.py discards.
export function estimate(angleDeg: number): number | null {
  const tau = (Math.sin((Math.max(-89, Math.min(89, angleDeg)) * Math.PI) / 180) * D) / C;
  const lag = Math.round(tau * FS);
  const ratio = ((lag / FS) * C) / D;
  if (Math.abs(ratio) > 0.9) return null;
  return (Math.asin(ratio) * 180) / Math.PI;
}

export type Sim = { t: number[]; servo: number[]; est: number[]; sent: number[]; outlier: number[] };

export function simulate(kp: number, kd: number, gate: boolean): Sim {
  const r = rng(11);
  const SAMPLE = 0.1;
  const kpI = kp, kdI = kd / SAMPLE;          // PID_v2 SetTunings, Ki = 0
  const out: Sim = { t: [], servo: [], est: [], sent: [], outlier: [] };
  let servo = START, pos = START;             // physical servo angle, commanded servoPos
  let arduinoErr = 0;                         // last value received over serial (already negated)
  let pidOut = 0, lastInput = 0, lastPid = -1, lastLoop = -1;
  let buf: number[] = [];
  const heading: number[] = [];
  const LAG = Math.round(LATENCY / STEP);
  const n = Math.round(DURATION / STEP);

  for (let k = 0; k <= n; k++) {
    const t = +(k * STEP).toFixed(6);
    heading.push(servo);
    let est = NaN, sent = NaN, outl = NaN;

    // --- host: one GCC-PHAT block every 8 ms --------------------------------
    if (k % 2 === 0) {
      const talking = t >= STEP_AT;
      const seen = heading[Math.max(0, k - LAG)];
      const isOut = r() < OUTLIER_P, g = gauss(r), u = r();
      if (!talking) { buf = []; arduinoErr = 0; }           // quiet frame: sends "0"
      else {
        const e = isOut ? (u - 0.5) * 120 : estimate(SOURCE - seen + g * NOISE);
        if (e !== null) {
          est = e;
          if (isOut) outl = e;
          if (!gate) { arduinoErr = -Math.trunc(e); sent = Math.trunc(e); }
          else {
            buf.push(e);
            if (buf.length >= 3) {
              const rec = buf.slice(-3);
              if (Math.max(...rec) - Math.min(...rec) < 15) {
                const avg = Math.trunc(rec.reduce((a, b) => a + b, 0) / 3);
                arduinoErr = -avg; sent = avg; buf = [];
              } else if (buf.length > 5) buf.shift();
            }
          }
        }
      }
    }

    // --- Arduino loop every 20 ms; PID_v2 recomputes only every 100 ms ------
    if (k % 5 === 0 && t !== lastLoop) {
      lastLoop = t;
      if (lastPid < 0 || t - lastPid >= SAMPLE - 1e-9) {
        lastPid = t;
        const input = arduinoErr, error = 0 - input;
        const dInput = input - lastInput;
        let o = kpI * error - kdI * dInput;
        pidOut = Math.max(-OUT_LIMIT, Math.min(OUT_LIMIT, o));
        lastInput = input;
      }
      pos = Math.max(0, Math.min(180, pos + pidOut));
    }

    // --- servo slews toward the integer command ------------------------------
    const target = Math.trunc(pos);
    servo += Math.max(-SLEW * STEP, Math.min(SLEW * STEP, target - servo));

    out.t.push(t); out.servo.push(servo); out.est.push(est); out.sent.push(sent); out.outlier.push(outl);
  }
  return out;
}

export function score(s: Sim) {
  const idx = s.t.map((x, i) => i).filter((i) => s.t[i] > STEP_AT);
  const ys = idx.map((i) => s.servo[i]);
  const peak = Math.max(...ys);
  const settle = idx.findIndex((_, j) => ys.slice(j).every((y) => Math.abs(y - SOURCE) < 4));
  const tail = idx.filter((i) => s.t[i] > 2).map((i) => s.servo[i]);
  const m = tail.reduce((a, b) => a + b, 0) / tail.length;
  let rev = 0;
  for (let i = 2; i < tail.length; i++) {
    const a = tail[i - 1] - tail[i - 2], b = tail[i] - tail[i - 1];
    if (a * b < 0) rev++;
  }
  return {
    overshoot: +(peak - SOURCE).toFixed(1),
    settle: settle < 0 ? null : +(s.t[idx[settle]] - STEP_AT).toFixed(2),
    jitterDeg: +Math.sqrt(tail.reduce((a, b) => a + (b - m) ** 2, 0) / tail.length).toFixed(2),
    restReversals: rev,
  };
}
