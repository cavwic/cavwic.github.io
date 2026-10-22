/** One rotary joint; SI units; simulated parameters, not identified hardware. */
export interface Plant { inertia: number; damping: number; friction: number; gravity: number; torqueLimit: number; qMin: number; qMax: number }
export interface Gains { kp: number; ki: number; kd: number }
export type Controller = 'baseline' | 'clamping';
export type Scenario = 'step' | 'sine' | 'unreachable';
export interface Config { plant: Plant; gains: Gains; duration: number; dt: number; target: number; scenario: Scenario; disturbance: number; disturbanceAt: number; disturbanceDuration: number }
export interface Sample { t: number; target: number; q: number; velocity: number; acceleration: number; torque: number; rawTorque: number; integral: number; disturbance: number; saturated: boolean; atLimit: boolean }
export interface Metrics { rmseDeg: number; overshootPct: number | null; steadyErrorDeg: number; saturationPct: number; maxTorque: number; settlingTime: number | null; limitSamples: number }
export interface Run { controller: Controller; config: Config; samples: Sample[]; metrics: Metrics }
export const defaults: Config = { plant: { inertia: 0.018, damping: 0.075, friction: 0.025, gravity: 0.12, torqueLimit: 0.55, qMin: -1.35, qMax: 1.35 }, gains: { kp: 3.2, ki: 5.0, kd: 0.24 }, duration: 8, dt: 0.002, target: 0.95, scenario: 'step', disturbance: 0.22, disturbanceAt: 3, disturbanceDuration: 1 };
export const deg = (rad: number) => rad * 180 / Math.PI;
const clip = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));
const finite = (x: number, name: string) => { if (!Number.isFinite(x)) throw new Error(`${name}: finite number required`); };
export function validateConfig(c: Config): void {
  for (const [k, v] of Object.entries(c.plant)) finite(v, k);
  for (const [k, v] of Object.entries(c.gains)) { finite(v, k); if (v < 0 || v > 200) throw new Error(`${k}: 0…200`); }
  for (const key of ['duration', 'dt', 'target', 'disturbance', 'disturbanceAt', 'disturbanceDuration'] as const) finite(c[key], key);
  const p = c.plant;
  if (p.inertia < 0.001 || p.inertia > 1 || p.damping < 0 || p.damping > 5 || p.friction < 0 || p.friction > 2 || p.gravity < 0 || p.gravity > 10 || p.torqueLimit < 0.01 || p.torqueLimit > 10 || p.qMin >= p.qMax || p.qMin < -Math.PI || p.qMax > Math.PI) throw new Error('Plant parameters out of supported range');
  if (c.dt < 0.00025 || c.dt > 0.005 || c.duration < 2 || c.duration > 30 || Math.abs(c.target) > 3 || Math.abs(c.disturbance) > 5 || c.disturbanceAt < 0 || c.disturbanceDuration < 0 || !['step', 'sine', 'unreachable'].includes(c.scenario)) throw new Error('Experiment configuration out of range');
}
export function targetAt(t: number, c: Config): number { return t < 0.5 ? 0 : c.scenario === 'sine' ? c.target * Math.sin(2 * Math.PI * 0.35 * (t - 0.5)) : c.scenario === 'unreachable' ? Math.max(c.plant.qMax + 0.3, c.target) : c.target; }
export function disturbanceAt(t: number, c: Config): number { return t >= c.disturbanceAt && t < c.disturbanceAt + c.disturbanceDuration ? -c.disturbance : 0; }
export function acceleration(q: number, velocity: number, torque: number, load: number, p: Plant): number { return (torque + load - p.damping * velocity - p.friction * Math.tanh(velocity / 0.02) - p.gravity * Math.sin(q)) / p.inertia; }
/** RK4 integrates plant over one zero-order-held control interval. Stops are perfectly inelastic. */
export function integrate(q: number, v: number, torque: number, load: number, dt: number, p: Plant): [number, number, boolean] {
  const f = (a: number, b: number): [number, number] => [b, acceleration(a, b, torque, load, p)];
  const k1 = f(q, v), k2 = f(q + dt * k1[0] / 2, v + dt * k1[1] / 2), k3 = f(q + dt * k2[0] / 2, v + dt * k2[1] / 2), k4 = f(q + dt * k3[0], v + dt * k3[1]);
  let nq = q + dt * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]) / 6, nv = v + dt * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]) / 6;
  const hit = nq < p.qMin || nq > p.qMax;
  if (nq < p.qMin) { nq = p.qMin; nv = Math.max(0, nv); }
  if (nq > p.qMax) { nq = p.qMax; nv = Math.min(0, nv); }
  return [nq, nv, hit];
}
export function summarize(samples: Sample[], c: Config): Metrics {
  const active = samples.filter(s => s.t >= 0.5), tail = samples.filter(s => s.t >= c.duration - 0.5);
  const rmseDeg = deg(Math.sqrt(active.reduce((sum, s) => sum + (s.q - s.target) ** 2, 0) / active.length));
  const steadyErrorDeg = deg(tail.reduce((sum, s) => sum + Math.abs(s.q - s.target), 0) / tail.length);
  let settlingTime: number | null = null, overshootPct: number | null = null;
  if (c.scenario !== 'sine' && Math.abs(targetAt(1, c)) > 0.001) {
    const goal = targetAt(1, c), sign = Math.sign(goal);
    // Initial step transient only, before disturbance, measured relative to step amplitude.
    const segment = active.filter(s => s.t < Math.min(c.duration, c.disturbanceAt));
    if (segment.length) overshootPct = segment.reduce((value, s) => Math.max(value, sign * (s.q - goal) / Math.abs(goal) * 100), 0);
    let lastOutside = -1;
    segment.forEach((s, i) => { if (Math.abs(s.q - goal) > Math.max(0.02 * Math.abs(goal), 0.005)) lastOutside = i; });
    const candidate = segment[lastOutside + 1];
    if (candidate && segment.at(-1)!.t - candidate.t >= 0.25) settlingTime = Math.max(0, candidate.t - 0.5);
  }
  return { rmseDeg, overshootPct, steadyErrorDeg, saturationPct: samples.filter(s => s.saturated).length / samples.length * 100, maxTorque: samples.reduce((value, s) => Math.max(value, Math.abs(s.torque)), 0), settlingTime, limitSamples: samples.filter(s => s.atLimit).length };
}
export function simulate(input: Config = defaults, controller: Controller = 'clamping'): Run {
  const c = structuredClone(input); validateConfig(c);
  if (!['baseline', 'clamping'].includes(controller)) throw new Error('Unknown controller');
  let q = 0, velocity = 0, integral = 0;
  const samples: Sample[] = [], count = Math.round(c.duration / c.dt);
  for (let i = 0; i <= count; i++) {
    const t = i * c.dt, target = targetAt(t, c), error = target - q;
    const proposed = integral + c.gains.ki * error * c.dt;
    let raw = c.gains.kp * error + proposed - c.gains.kd * velocity;
    const sat = clip(raw, -c.plant.torqueLimit, c.plant.torqueLimit);
    // Freeze only integral updates that push further into saturation. Derivative is on measurement.
    if (controller === 'baseline' || Math.abs(raw - sat) < 1e-12 || error * (raw - sat) <= 0) integral = proposed;
    raw = c.gains.kp * error + integral - c.gains.kd * velocity;
    const torque = clip(raw, -c.plant.torqueLimit, c.plant.torqueLimit), load = disturbanceAt(t, c);
    const [nextQ, nextV, hit] = integrate(q, velocity, torque, load, c.dt, c.plant);
    samples.push({ t, target, q, velocity, acceleration: acceleration(q, velocity, torque, load, c.plant), torque, rawTorque: raw, integral, disturbance: load, saturated: Math.abs(raw) > c.plant.torqueLimit + 1e-12, atLimit: hit || Math.abs(q - c.plant.qMin) < 1e-8 || Math.abs(q - c.plant.qMax) < 1e-8 });
    q = nextQ; velocity = nextV;
    if (![q, velocity, integral].every(Number.isFinite)) throw new Error('Numerical divergence: reduce gains or integration interval');
  }
  return { controller, config: c, samples, metrics: summarize(samples, c) };
}
export interface Identification { inertia: number; damping: number; friction: number; gravity: number; torqueResidual: number; scaledPivotRatio: number; sampleCount: number; provenance: string }
/** Deterministic open-loop multisine; acceleration uses sampled velocity, not hidden plant acceleration. */
export function identifyPlant(plant: Plant, noise = 0.0005, seed = 42): Identification {
  const dt = 0.002, rows: { t: number; q: number; v: number; torque: number; hit: boolean }[] = [];
  let q = 0, v = 0, state = seed >>> 0;
  const random = () => { state = (1664525 * state + 1013904223) >>> 0; return state / 4294967296 - 0.5; };
  for (let i = 0; i <= 6000; i++) {
    const t = i * dt, torque = plant.torqueLimit * (0.42 * Math.sin(2.3 * t) + 0.28 * Math.sin(5.7 * t) + 0.18 * Math.sin(10.9 * t));
    const [nq, nv, hit] = integrate(q, v, torque, 0, dt, plant);
    rows.push({ t, q: q + noise * random(), v: v + noise * random(), torque, hit }); q = nq; v = nv;
  }
  const X: number[][] = [], Y: number[] = [];
  for (let i = 3; i < rows.length - 3; i += 3) {
    const r = rows[i];
    if (rows.slice(i - 2, i + 3).some(s => s.hit || s.q <= plant.qMin + 0.03 || s.q >= plant.qMax - 0.03)) continue;
    X.push([(rows[i + 1].v - rows[i - 1].v) / (2 * dt), r.v, Math.tanh(r.v / 0.02), Math.sin(r.q)]); Y.push((rows[i - 1].torque + r.torque) / 2);
  }
  if (X.length < 40) throw new Error('Identification failed: insufficient unconstrained excitation samples');
  // Scale columns before normal equations; reject poor excitation, do not hide it with regularization.
  const scales = [0, 1, 2, 3].map(j => Math.sqrt(X.reduce((s, r) => s + r[j] ** 2, 0) / X.length));
  if (scales.some(x => x < 1e-7)) throw new Error('Identification failed: unexcited parameter');
  const A = Array.from({ length: 4 }, (_, j) => Array.from({ length: 5 }, (_, k) => X.reduce((s, r, i) => s + r[j] / scales[j] * (k === 4 ? Y[i] : r[k] / scales[k]), 0)));
  const pivots: number[] = [];
  for (let j = 0; j < 4; j++) {
    let pivot = j; for (let k = j + 1; k < 4; k++) if (Math.abs(A[k][j]) > Math.abs(A[pivot][j])) pivot = k;
    [A[j], A[pivot]] = [A[pivot], A[j]];
    const p = A[j][j]; pivots.push(Math.abs(p)); if (Math.abs(p) < 1e-7) throw new Error('Identification failed: rank deficient');
    for (let k = j; k <= 4; k++) A[j][k] /= p;
    for (let r = 0; r < 4; r++) if (r !== j) { const factor = A[r][j]; for (let k = j; k <= 4; k++) A[r][k] -= factor * A[j][k]; }
  }
  const beta = A.map((r, j) => r[4] / scales[j]), scaledPivotRatio = Math.max(...pivots) / Math.min(...pivots);
  if (scaledPivotRatio > 1e6 || beta.some(x => !Number.isFinite(x) || x < 0)) throw new Error('Identification failed: nonphysical / poorly excited fit');
  const torqueResidual = Math.sqrt(X.reduce((sum, r, i) => sum + (r.reduce((s, x, j) => s + x * beta[j], 0) - Y[i]) ** 2, 0) / X.length);
  return { inertia: beta[0], damping: beta[1], friction: beta[2], gravity: beta[3], torqueResidual, scaledPivotRatio, sampleCount: X.length, provenance: `synthetic open-loop multisine; velocity finite differences; uniform noise=${noise}; seed=${seed}; pivot ratio is diagnostic, not matrix condition number` };
}
export function runCsv(run: Run): string { return ['t_s,target_rad,q_rad,velocity_rad_s,acceleration_rad_s2,torque_Nm,raw_torque_Nm,integral_Nm,disturbance_Nm,saturated,at_limit', ...run.samples.map(s => [s.t, s.target, s.q, s.velocity, s.acceleration, s.torque, s.rawTorque, s.integral, s.disturbance, Number(s.saturated), Number(s.atLimit)].join(','))].join('\n'); }
