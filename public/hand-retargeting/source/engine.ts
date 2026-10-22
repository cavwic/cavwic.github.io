/**
 * A small, deliberately transparent kinematic retargeting experiment.
 * All geometry is in metres, all joints in radians. This is a synthetic
 * 20-DOF model, not a calibrated commercial hand, contact simulator or driver.
 * sampleGesture produces synthetic landmarks, not recorded human footage.
 */
export type Vec3 = [number, number, number];
export type Handedness = 'Right' | 'Left';
export type Gesture = 'open' | 'fist' | 'pinch' | 'point' | 'spread' | 'wave' | 'unreachable';
export const fingerNames = ['thumb', 'index', 'middle', 'ring', 'little'] as const;
export const gestureNames: Gesture[] = ['open', 'fist', 'pinch', 'point', 'spread', 'wave', 'unreachable'];
export const landmarkChains = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16], [17, 18, 19, 20]] as const;
export interface JointLimit { min: number; max: number }
export interface HandModel {
  name: string;
  bases: Vec3[];
  /** Fixed mount orientation [x,y,z], composed Rz * Ry * Rx. */
  mounts: Vec3[];
  lengths: Vec3[];
  /** Distal thumb roll after the metacarpal, before MCP/IP flexion. */
  thumbDistalRoll?: number;
  /** Distal pronation coupled to CMC opposition, not to ordinary finger curl. */
  thumbTwistRatio?: number;
}
export const modelKinematicsId = 'thumb-opposition-v2-palmar-canonical';
const d = Math.PI / 180;
export const robotModel: HandModel = {
  name: 'Synthetic 20-DOF robot hand',
  bases: [[.043, .030, 0], [.030, .080, 0], [0, .087, 0], [-.024, .081, 0], [-.044, .068, 0]],
  mounts: [[0, 0, -55 * d], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
  lengths: [[.044, .031, .024], [.043, .026, .020], [.049, .029, .021], [.045, .028, .020], [.035, .023, .018]],
  thumbDistalRoll: 0,
  thumbTwistRatio: -1.8,
};
export const humanModel: HandModel = {
  name: 'Synthetic human-like landmark source',
  bases: robotModel.bases.map(v => [v[0] * 1.12, v[1] * 1.12, v[2]]) as Vec3[],
  mounts: robotModel.mounts.map(v => [...v]) as Vec3[],
  // Deliberately different segment proportions; global scale alone cannot
  // remove this morphology mismatch. Values are illustrative, not anatomy.
  lengths: [[.052, .031, .028], [.052, .027, .023], [.056, .032, .025], [.052, .029, .024], [.042, .023, .022]],
  thumbDistalRoll: 0,
  thumbTwistRatio: -1.8,
};
export const jointLimits: JointLimit[] = fingerNames.flatMap((_, i) => i === 0
  ? [{ min: -.65, max: 1.40 }, { min: -.15, max: 1.20 }, { min: 0, max: 1.45 }, { min: 0, max: 1.25 }]
  : [{ min: -.38, max: .38 }, { min: -.10, max: 1.45 }, { min: 0, max: 1.75 }, { min: 0, max: 1.35 }]);

export type Mat3 = number[];
const add = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const mul = (a: Vec3, s: number): Vec3 => [a[0] * s, a[1] * s, a[2] * s];
const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: Vec3, b: Vec3): Vec3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a: Vec3) => Math.sqrt(dot(a, a));
const unit = (a: Vec3): Vec3 => mul(a, 1 / Math.max(norm(a), 1e-12));
const clamp = (x: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, x));
const mv = (m: Mat3, v: Vec3): Vec3 => [m[0] * v[0] + m[1] * v[1] + m[2] * v[2], m[3] * v[0] + m[4] * v[1] + m[5] * v[2], m[6] * v[0] + m[7] * v[1] + m[8] * v[2]];
const mtv = (m: Mat3, v: Vec3): Vec3 => [m[0] * v[0] + m[3] * v[1] + m[6] * v[2], m[1] * v[0] + m[4] * v[1] + m[7] * v[2], m[2] * v[0] + m[5] * v[1] + m[8] * v[2]];
const mm = (a: Mat3, b: Mat3): Mat3 => Array.from({ length: 9 }, (_, n) => {
  const r = Math.floor(n / 3), c = n % 3;
  return a[r * 3] * b[c] + a[r * 3 + 1] * b[3 + c] + a[r * 3 + 2] * b[6 + c];
});
const rx = (q: number): Mat3 => [1, 0, 0, 0, Math.cos(q), -Math.sin(q), 0, Math.sin(q), Math.cos(q)];
const ry = (q: number): Mat3 => [Math.cos(q), 0, Math.sin(q), 0, 1, 0, -Math.sin(q), 0, Math.cos(q)];
const rz = (q: number): Mat3 => [Math.cos(q), -Math.sin(q), 0, Math.sin(q), Math.cos(q), 0, 0, 0, 1];
const mountMatrix = (v: Vec3) => mm(mm(rz(v[2]), ry(v[1])), rx(v[0]));
const finitePoints = (p: Vec3[]) => p.length === 21 && p.every(v => v.length === 3 && v.every(Number.isFinite));
const cleanQ = (q?: number[]) => Array.from({ length: 20 }, (_, i) => Number.isFinite(q?.[i]) ? q![i] : 0);
const projectQ = (q: number[], limits?: JointLimit[]) => q.map((v, i) => limits ? clamp(v, limits[i].min, limits[i].max) : v);

/** Thumb CMC first moves the metacarpal; independent distal pronation then
 * sets the MCP/IP flexion plane. Its distal hinges must not be copied from
 * the four fingers' palmar curl plane. All rotations are row-major, with
 * columns side / bone-longitudinal / model finger-pad normal.
 * This is an illustrative model, not measured anatomy or a contact model.
 */
export function fingerKinematics(q: number[], finger: number, model = robotModel) {
  const k = finger * 4, base = model.bases[finger], mount = mountMatrix(model.mounts[finger]);
  const spread = mm(mount, rz(q[k]));
  const twist = finger === 0 ? (model.thumbTwistRatio ?? -1.8) : 0;
  const flexAxis = mv(spread, [1, 0, 0]);
  let rotation = mm(spread, rx(q[k + 1]));
  const rotations: Mat3[] = [[...rotation]];
  const p1 = add(base, mv(rotation, [0, model.lengths[finger][0], 0]));
  const oppositionTwist = finger === 0
    ? { axis: mul(mv(rotation, [0, 1, 0]), twist), origin: p1 } : undefined;
  if (finger === 0) rotation = mm(rotation, ry((model.thumbDistalRoll ?? 0) + twist * q[k]));
  const distalAxis = mv(rotation, [1, 0, 0]);
  const axes: Vec3[] = [mv(mount, [0, 0, 1]), flexAxis, distalAxis, distalAxis];
  rotation = mm(rotation, rx(q[k + 2]));
  rotations.push([...rotation]);
  const p2 = add(p1, mv(rotation, [0, model.lengths[finger][1], 0]));
  rotation = mm(rotation, rx(q[k + 3]));
  rotations.push([...rotation]);
  const tip = add(p2, mv(rotation, [0, model.lengths[finger][2], 0]));
  return { points: [[...base], p1, p2, tip] as Vec3[], axes, origins: [base, base, p1, p2], rotations, oppositionTwist };
}
export function forwardKinematics(q: number[], model = robotModel): Vec3[] {
  const angles = cleanQ(q), points: Vec3[] = [[0, 0, 0]];
  for (let f = 0; f < 5; f++) points.push(...fingerKinematics(angles, f, model).points);
  return points;
}
/** Analytic translation Jacobian, 3 rows x 4 local joints. */
export function fingerJacobian(q: number[], finger: number, landmark = 3, model = robotModel): number[][] {
  if (landmark === 0) return Array.from({ length: 3 }, () => [0, 0, 0, 0]);
  const state = fingerKinematics(q, finger, model), p = state.points[landmark];
  const lastActive = landmark === 1 ? 1 : landmark === 2 ? 2 : 3;
  const columns = state.axes.map((axis, j) => j <= lastActive ? cross(axis, sub(p, state.origins[j])) : [0, 0, 0] as Vec3);
  if (state.oppositionTwist && landmark >= 2)
    columns[0] = add(columns[0], cross(state.oppositionTwist.axis, sub(p, state.oppositionTwist.origin)));
  return [0, 1, 2].map(row => columns.map(v => v[row]));
}

export interface NormalizedLandmarks { points: Vec3[]; scale: number; palmWidthM: number; valid: boolean; reason?: string }
/** Wrist origin; +x radial (little→index), +y distal, +z palm normal.
 * The output canonicalizes a mirrored left hand to the right-hand model.
 * Metric scale is a model fit, not a measurement of real hand dimensions.
 * handedness is the caller's actual hand side. CSS display mirroring does
 * not alter these 3D coordinates or justify swapping that parameter.
 */
export function normalizeLandmarks(points: Vec3[], handedness: Handedness = 'Right'): NormalizedLandmarks {
  const fail = (reason: string): NormalizedLandmarks => ({ points: [], scale: 1, palmWidthM: 0, valid: false, reason });
  if (!finitePoints(points)) return fail('Expected 21 finite three-dimensional landmarks.');
  const wrist = points[0], y = sub(points[9], wrist), across = sub(points[5], points[17]);
  const width = norm(across);
  if (width < 1e-6 || norm(y) < 1e-6) return fail('Degenerate palm dimensions.');
  const ey = unit(y), radial = sub(across, mul(ey, dot(across, ey)));
  if (norm(radial) < 1e-6) return fail('Collinear palm landmarks.');
  const ex = unit(radial), ez = cross(ex, ey);
  const robotWidth = norm(sub(robotModel.bases[1], robotModel.bases[4]));
  const scale = robotWidth / width;
  const normalized = points.map(p => {
    const v = sub(p, wrist);
    return mul([dot(v, ex), dot(v, ey), dot(v, ez) * (handedness === 'Left' ? -1 : 1)], scale);
  });
  return { points: normalized, scale, palmWidthM: width, valid: true };
}
/** Human and robot MCP locations differ: align each chain's base, then keep
 * its globally scaled human displacement. The visible target is returned,
 * never silently projected onto the robot's reachable workspace.
 */
export function getRobotTargets(points: Vec3[]): Vec3[] {
  if (!finitePoints(points)) return [];
  const target: Vec3[] = [[0, 0, 0]];
  landmarkChains.forEach((chain, f) => chain.forEach(index => target.push(add(robotModel.bases[f], sub(points[index], points[chain[0]])))));
  return target;
}
/** Joint-angle extraction followed by affine angle mapping (identity gains
 * in this experiment). Both methods use the same optional hard joint limits.
 */
export function angleBaseline(points: Vec3[], limits: JointLimit[] | null = jointLimits): number[] {
  if (!finitePoints(points)) return Array(20).fill(0);
  const q: number[] = [];
  landmarkChains.forEach((chain, f) => {
    const vectors = [0, 1, 2].map(i => sub(points[chain[i + 1]], points[chain[i]]));
    const local = mtv(mountMatrix(robotModel.mounts[f]), vectors[0]);
    let spread = -Math.atan2(local[0], local[1]);
    let flexion = Math.atan2(local[2], Math.hypot(local[0], local[1]));
    const trial = Array(20).fill(0); trial[f * 4] = spread; trial[f * 4 + 1] = flexion;
    const axis = fingerKinematics(trial, f).axes[2];
    const bend = (a: Vec3, b: Vec3) => Math.atan2(dot(cross(a, b), axis), dot(a, b));
    q.push(spread, flexion, bend(vectors[0], vectors[1]), bend(vectors[1], vectors[2]));
  });
  return projectQ(q, limits ?? undefined);
}
export interface Metrics {
  meanTipErrorMm: number; maxTipErrorMm: number; endpointRmseMm: number; allPointsRmseMm: number;
  tipErrorsMm: number[]; limitViolations: number; saturatedJoints: number;
  inputPinchDistanceMm: number; robotPinchDistanceMm: number;
  pinchDistanceErrorMm: number; pinchVectorErrorMm: number;
  /** Model pad-frame normals, not measured human normals or real contact. */
  thumbPadFacingCos: number | null; indexPadFacingCos: number | null;
}
export function padFacing(q: number[]) {
  const angles = cleanQ(q), thumb = fingerKinematics(angles, 0), index = fingerKinematics(angles, 1);
  const towardIndex = sub(index.points[3], thumb.points[3]), distance = norm(towardIndex);
  if (distance < 1e-9) return { thumbPadFacingCos: null, indexPadFacingCos: null, padNormalDot: null };
  const direction = mul(towardIndex, 1 / distance);
  const thumbNormal = mv(thumb.rotations[2], [0, 0, 1]), indexNormal = mv(index.rotations[2], [0, 0, 1]);
  return { thumbPadFacingCos: dot(thumbNormal, direction), indexPadFacingCos: -dot(indexNormal, direction), padNormalDot: dot(thumbNormal, indexNormal) };
}
export interface PinchMetricOptions { pinchTargetVector?: Vec3 }
const finiteVector = (v?: Vec3) => !!v && v.length === 3 && v.every(Number.isFinite);
export function metrics(q: number[], target: Vec3[], options: PinchMetricOptions = {}): Metrics {
  const robot = forwardKinematics(q), desired = getRobotTargets(target);
  const distances = desired.length === 21 ? robot.map((p, i) => norm(sub(p, desired[i])) * 1000) : Array(21).fill(NaN);
  const tipErrorsMm = [4, 8, 12, 16, 20].map(i => distances[i]);
  const inputVector = finiteVector(options.pinchTargetVector) ? options.pinchTargetVector! : finitePoints(target) ? sub(target[4], target[8]) : [NaN, NaN, NaN] as Vec3;
  const robotVector = sub(robot[4], robot[8]);
  return {
    meanTipErrorMm: tipErrorsMm.reduce((a, b) => a + b, 0) / 5,
    maxTipErrorMm: Math.max(...tipErrorsMm),
    endpointRmseMm: Math.sqrt(tipErrorsMm.reduce((a, b) => a + b * b, 0) / 5),
    allPointsRmseMm: Math.sqrt(distances.slice(1).reduce((a, b) => a + b * b, 0) / 20),
    tipErrorsMm,
    limitViolations: q.reduce((n, v, i) => n + Number(v < jointLimits[i].min - 1e-8 || v > jointLimits[i].max + 1e-8), 0),
    saturatedJoints: q.reduce((n, v, i) => n + Number(Math.min(Math.abs(v - jointLimits[i].min), Math.abs(v - jointLimits[i].max)) < 1e-5), 0),
    inputPinchDistanceMm: norm(inputVector) * 1000,
    robotPinchDistanceMm: norm(robotVector) * 1000,
    pinchDistanceErrorMm: Math.abs(norm(robotVector) - norm(inputVector)) * 1000,
    pinchVectorErrorMm: norm(sub(robotVector, inputVector)) * 1000,
    ...padFacing(q),
  };
}
export interface IKOptions {
  enforceLimits?: boolean; maxIterations?: number; damping?: number; postureWeight?: number;
  temporalWeight?: number; toleranceMm?: number; maxStepRad?: number;
  /** Optional final command slew bound. dt is seconds; speed is rad/s. */
  dt?: number; maxVelocityRad?: number;
  /** Relative vector is thumb tip 4 minus index tip 8, before per-chain
   * base alignment. Zero weight disables coupling, not the task metrics. */
  pinchWeight?: number; pinchTargetVector?: Vec3;
}
export interface IKResult { q: number[]; status: 'converged' | 'best-effort' | 'invalid-input'; iterations: number; fallbackAttempts: number; elapsedMs: number; metrics: Metrics; objective: number }
const weights = [.08, .12, 1];
const LENGTH_UNIT = .1;
function fingerLoss(q: number[], f: number, targets: Vec3[], reference: number[], previous: number[], posture: number, temporal: number) {
  const state = fingerKinematics(q, f);
  let loss = 0;
  for (let p = 1; p <= 3; p++) {
    const delta = sub(state.points[p], targets[f * 4 + p + 1]);
    loss += weights[p - 1] * dot(delta, delta) / (LENGTH_UNIT * LENGTH_UNIT);
  }
  for (let j = f * 4; j < f * 4 + 4; j++) loss += posture * (q[j] - reference[j]) ** 2 + temporal * (q[j] - previous[j]) ** 2;
  return loss;
}
/** Gaussian elimination with partial pivoting for damped 4/8-DOF systems. */
function solveSystem(matrix: number[][], vector: number[]): number[] {
  const size = vector.length;
  const a = matrix.map((row, i) => [...row, vector[i]]);
  for (let col = 0; col < size; col++) {
    let pivot = col;
    for (let row = col + 1; row < size; row++) if (Math.abs(a[row][col]) > Math.abs(a[pivot][col])) pivot = row;
    [a[pivot], a[col]] = [a[col], a[pivot]];
    if (Math.abs(a[col][col]) < 1e-14) return Array(size).fill(0);
    const divisor = a[col][col];
    for (let k = col; k <= size; k++) a[col][k] /= divisor;
    for (let row = 0; row < size; row++) if (row !== col) {
      const factor = a[row][col];
      for (let k = col; k <= size; k++) a[row][k] -= factor * a[col][k];
    }
  }
  return a.map(row => row[size]);
}
/** Freeze only boundary joints whose Newton step points out of the allowed
 * box, then re-solve the free coordinates. Plain component projection can
 * otherwise destroy descent in the coupled thumb/index system. */
function boundedDirection(h: number[][], rhs: number[], angles: number[], offset: number, limited: boolean) {
  let delta = solveSystem(h, rhs);
  if (!limited) return delta;
  const frozen = new Set<number>();
  for (let pass = 0; pass < rhs.length; pass++) {
    let changed = false;
    for (let j = 0; j < rhs.length; j++) {
      const limit = jointLimits[offset + j], value = angles[offset + j];
      if (!frozen.has(j) && ((value <= limit.min + 1e-8 && delta[j] < 0) || (value >= limit.max - 1e-8 && delta[j] > 0))) {
        frozen.add(j); changed = true;
        for (let k = 0; k < rhs.length; k++) { h[j][k] = 0; h[k][j] = 0; }
        h[j][j] = 1; rhs[j] = 0;
      }
    }
    if (!changed) break;
    delta = solveSystem(h, rhs);
  }
  return delta;
}
/** Projected damped Gauss–Newton, per finger, with an objective-decreasing
 * line search. Not a global optimizer and not collision avoidance.
 */
export function solveIK(points: Vec3[], previousQ?: number[], options: IKOptions = {}): IKResult {
  const start = performance.now(), limited = options.enforceLimits !== false;
  const previous = projectQ(cleanQ(previousQ), limited ? jointLimits : undefined);
  if (!finitePoints(points) || (options.pinchTargetVector !== undefined && !finiteVector(options.pinchTargetVector))) return { q: previous, status: 'invalid-input', iterations: 0, fallbackAttempts: 0, elapsedMs: performance.now() - start, metrics: metrics(previous, []), objective: NaN };
  const targets = getRobotTargets(points), reference = angleBaseline(points, limited ? jointLimits : null);
  const pinchTargetVector = options.pinchTargetVector ?? sub(points[4], points[8]);
  const pinchWeight = Number.isFinite(options.pinchWeight) ? Math.max(0, options.pinchWeight!) : 1.5;
  const temporal = previousQ ? Math.max(0, options.temporalWeight ?? .001) : 0;
  const posture = Math.max(0, options.postureWeight ?? .00002);
  const damping = Math.max(1e-6, options.damping ?? .02), maxStep = Math.max(.001, options.maxStepRad ?? .20);
  const maxIterations = clamp(Math.floor(options.maxIterations ?? 28), 1, 150);
  const q = [...reference];
  let iterations = 0, fallbackAttempts = 0;
  for (let f = 0; f < 5; f++) {
    const offset = f * 4;
    if (previousQ && fingerLoss(previous, f, targets, reference, previous, posture, temporal) < fingerLoss(q, f, targets, reference, previous, posture, temporal)) {
      for (let j = 0; j < 4; j++) q[offset + j] = previous[offset + j];
    }
    const optimizeFinger = (angles: number[]) => {
      for (let iter = 0; iter < maxIterations; iter++) {
        iterations++;
        const state = fingerKinematics(angles, f);
        const h = Array.from({ length: 4 }, () => Array(4).fill(0)), rhs = Array(4).fill(0);
        for (let p = 1; p <= 3; p++) {
          const jac = fingerJacobian(angles, f, p), error = mul(sub(targets[offset + p + 1], state.points[p]), 1 / LENGTH_UNIT), w = weights[p - 1];
          for (let j = 0; j < 4; j++) {
            for (let axis = 0; axis < 3; axis++) rhs[j] += w * jac[axis][j] / LENGTH_UNIT * error[axis];
            for (let k = 0; k < 4; k++) for (let axis = 0; axis < 3; axis++) h[j][k] += w * jac[axis][j] * jac[axis][k] / (LENGTH_UNIT * LENGTH_UNIT);
          }
        }
        for (let j = 0; j < 4; j++) {
          h[j][j] += damping * damping + posture + temporal;
          rhs[j] -= posture * (angles[offset + j] - reference[offset + j]) + temporal * (angles[offset + j] - previous[offset + j]);
        }
        const rawDelta = boundedDirection(h, rhs, angles, offset, limited);
        // Bound the whole search direction by one scale factor. Clipping
        // each component independently can turn a Gauss–Newton descent
        // direction into a non-descent direction near a singular chain.
        const stepScale = Math.min(1, maxStep / Math.max(1e-12, ...rawDelta.map(Math.abs)));
        const delta = rawDelta.map(value => value * stepScale);
        const currentLoss = fingerLoss(angles, f, targets, reference, previous, posture, temporal);
        let accepted = false;
        for (const fraction of [1, .5, .25, .125, .0625]) {
          const candidate = [...angles];
          for (let j = 0; j < 4; j++) {
            const k = offset + j, value = angles[k] + fraction * delta[j];
            candidate[k] = limited ? clamp(value, jointLimits[k].min, jointLimits[k].max) : value;
          }
          if (fingerLoss(candidate, f, targets, reference, previous, posture, temporal) < currentLoss - 1e-12) {
            for (let j = 0; j < 4; j++) angles[offset + j] = candidate[offset + j];
            accepted = true;
            break;
          }
        }
        if (!accepted || Math.max(...delta.map(Math.abs)) < 1e-5) return true;
      }
      return false;
    };
    const stalled = optimizeFinger(q);
    // At a straight chain the positional Jacobian has no derivative along
    // the finger. A shortened axial target can therefore look stationary.
    // Retry only this narrow failure case; do not retry targets known to be
    // beyond maximum reach or spend extra iterations on ordinary frames.
    const nearStraight = q.slice(offset + 1, offset + 4).every(angle => Math.abs(angle) < .04);
    if (stalled && nearStraight) {
      const targetTip = targets[offset + 4];
      const targetDistance = norm(sub(targetTip, robotModel.bases[f]));
      const maximumReach = robotModel.lengths[f].reduce((sum, length) => sum + length, 0);
      if (targetDistance < maximumReach - .0005 && norm(sub(targetTip, fingerKinematics(q, f).points[3])) > .002) {
        const initial = [...q];
        let bestLoss = fingerLoss(q, f, targets, reference, previous, posture, temporal);
        for (const bend of [[-.16, .32, -.16], [.16, -.32, .16]]) {
          fallbackAttempts++;
          const candidate = [...initial];
          for (let j = 1; j <= 3; j++) {
            const k = offset + j, value = candidate[k] + bend[j - 1];
            candidate[k] = limited ? clamp(value, jointLimits[k].min, jointLimits[k].max) : value;
          }
          optimizeFinger(candidate);
          const loss = fingerLoss(candidate, f, targets, reference, previous, posture, temporal);
          if (loss < bestLoss - 1e-12) {
            bestLoss = loss;
            for (let j = 0; j < 4; j++) q[offset + j] = candidate[offset + j];
          }
        }
      }
    }
  }
  const pinchLoss = (angles: number[]) => {
    const thumb = fingerKinematics(angles, 0).points[3], index = fingerKinematics(angles, 1).points[3];
    const vector = sub(thumb, index), delta = sub(vector, pinchTargetVector);
    return pinchWeight * (dot(delta, delta) + .35 * (norm(vector) - norm(pinchTargetVector)) ** 2) / (LENGTH_UNIT * LENGTH_UNIT);
  };
  const coupledLoss = (angles: number[]) => fingerLoss(angles, 0, targets, reference, previous, posture, temporal)
    + fingerLoss(angles, 1, targets, reference, previous, posture, temporal) + pinchLoss(angles);
  // Jointly refine the thumb and index. Per-chain base alignment can alter
  // their relationship, so the task vector intentionally comes from the
  // pre-alignment input (or the explicit caller-provided vector).
  if (pinchWeight > 0) {
    for (let iter = 0; iter < maxIterations; iter++) {
      const thumb = fingerKinematics(q, 0), index = fingerKinematics(q, 1);
      const vector = sub(thumb.points[3], index.points[3]);
      if (norm(sub(vector, pinchTargetVector)) < .00001) break;
      iterations++;
      const h = Array.from({ length: 8 }, () => Array(8).fill(0)), rhs = Array(8).fill(0);
      const accumulate = (jacobian: number[], error: number, weight: number) => {
        for (let j = 0; j < 8; j++) {
          rhs[j] += weight * jacobian[j] * error;
          for (let k = 0; k < 8; k++) h[j][k] += weight * jacobian[j] * jacobian[k];
        }
      };
      for (let f = 0; f < 2; f++) {
        const state = f === 0 ? thumb : index;
        for (let p = 1; p <= 3; p++) {
          const jacobian = fingerJacobian(q, f, p), error = mul(sub(targets[f * 4 + p + 1], state.points[p]), 1 / LENGTH_UNIT);
          for (let axis = 0; axis < 3; axis++) {
            const row = Array(8).fill(0);
            for (let j = 0; j < 4; j++) row[f * 4 + j] = jacobian[axis][j] / LENGTH_UNIT;
            accumulate(row, error[axis], weights[p - 1]);
          }
        }
      }
      const jt = fingerJacobian(q, 0), ji = fingerJacobian(q, 1);
      const relativeJacobian = [0, 1, 2].map(axis => [...jt[axis], ...ji[axis].map(value => -value)].map(value => value / LENGTH_UNIT));
      const error = mul(sub(pinchTargetVector, vector), 1 / LENGTH_UNIT);
      for (let axis = 0; axis < 3; axis++) accumulate(relativeJacobian[axis], error[axis], pinchWeight);
      if (norm(vector) > 1e-9) {
        const direction = unit(vector);
        const distanceJacobian = Array.from({ length: 8 }, (_, j) => direction[0] * relativeJacobian[0][j] + direction[1] * relativeJacobian[1][j] + direction[2] * relativeJacobian[2][j]);
        accumulate(distanceJacobian, (norm(pinchTargetVector) - norm(vector)) / LENGTH_UNIT, pinchWeight * .35);
      }
      for (let j = 0; j < 8; j++) {
        h[j][j] += damping * damping + posture + temporal;
        rhs[j] -= posture * (q[j] - reference[j]) + temporal * (q[j] - previous[j]);
      }
      const rawDelta = boundedDirection(h, rhs, q, 0, limited), stepScale = Math.min(1, maxStep / Math.max(1e-12, ...rawDelta.map(Math.abs)));
      const delta = rawDelta.map(value => value * stepScale), before = coupledLoss(q);
      let accepted = false;
      for (const fraction of [1, .5, .25, .125, .0625]) {
        const candidate = [...q];
        for (let j = 0; j < 8; j++) candidate[j] = limited ? clamp(q[j] + fraction * delta[j], jointLimits[j].min, jointLimits[j].max) : q[j] + fraction * delta[j];
        if (coupledLoss(candidate) < before - 1e-12) {
          for (let j = 0; j < 8; j++) q[j] = candidate[j];
          accepted = true; break;
        }
      }
      if (!accepted || Math.max(...delta.map(Math.abs)) < 1e-5) break;
    }
  }
  if (previousQ && Number.isFinite(options.maxVelocityRad) && Number.isFinite(options.dt)) {
    const step = Math.max(0, options.maxVelocityRad!) * clamp(options.dt!, 0, .1);
    for (let j = 0; j < 20; j++) q[j] = clamp(q[j], previous[j] - step, previous[j] + step);
  }
  const report = metrics(q, points, { pinchTargetVector });
  const objective = fingerNames.reduce((sum, _, f) => sum + fingerLoss(q, f, targets, reference, previous, posture, temporal), 0) + pinchLoss(q);
  const tolerance = options.toleranceMm ?? 1;
  const converged = report.maxTipErrorMm <= tolerance && (pinchWeight === 0 || report.pinchVectorErrorMm <= tolerance);
  return { q, status: converged ? 'converged' : 'best-effort', iterations, fallbackAttempts, elapsedMs: performance.now() - start, metrics: report, objective };
}

function rng(seed: number) {
  let value = seed >>> 0;
  return () => { value += 0x6d2b79f5; let x = value; x = Math.imul(x ^ (x >>> 15), x | 1); x ^= x + Math.imul(x ^ (x >>> 7), x | 61); return ((x ^ (x >>> 14)) >>> 0) / 4294967296; };
}
/** Synthetic keypoint-centre clearance at the closed reference, not a
 * calibrated finger-pad contact distance or a physical collision model. */
export const syntheticPinchReferenceMm = 8;
// Offline constrained pose fit: 8.96 mm keypoint-centre clearance and both
// model pad normals face the other tip. The 1/1.12 palm fit yields ~8 mm.
// Store joint angles, not altered landmarks: all source bones stay fixed.
// This is a designed synthetic pose, never anatomical ground truth.
const PINCH_CLOSED_Q = [.8884411888543778, .9851628965167126, .20590557394597728, .10135060345659266,
  .3798545653451976, 1.0501549580254776, .787195140275167, .11910216635828018];
/** t: seconds; noise: millimetres; source: deterministic synthetic FK. */
export function sampleGesture(gesture: Gesture, t: number, noise = 0, seed = 1): Vec3[] {
  const amount = .72 + .28 * Math.sin(t * Math.PI / 2), q = Array(20).fill(0);
  const curl = (f: number, a: number) => { q[f * 4 + 1] = a * 1.05; q[f * 4 + 2] = a * 1.35; q[f * 4 + 3] = a * .85; };
  if (gesture === 'fist' || gesture === 'wave' || gesture === 'unreachable') {
    for (let f = 0; f < 5; f++) curl(f, gesture === 'wave' ? .5 + .5 * Math.sin(t * 2 + f * .7) : amount);
    q[0] = .7 * amount;
  } else if (gesture === 'pinch') {
    q.splice(0, 8, ...PINCH_CLOSED_Q);
    // Open and close by CMC opposition, rather than curling the thumb in
    // the same plane/direction as the four fingers. t=1 mod 4 is closed.
    q[0] -= .35 * (.5 - .5 * Math.sin(t * Math.PI / 2));
  } else if (gesture === 'point') {
    for (const f of [0, 2, 3, 4]) curl(f, amount);
    q[0] = .7 * amount;
  } else if (gesture === 'spread') {
    q[0] = -.30 * amount; q[4] = -.34 * amount; q[12] = .22 * amount; q[16] = .36 * amount;
  }
  const points = forwardKinematics(q, humanModel);
  if (gesture === 'unreachable') {
    // Deliberate inconsistent/out-of-workspace input: keep the target visible.
    points[8] = add(points[5], [.025, .21, .10]);
    points[4] = add(points[1], [.18, .02, .08]);
  }
  const random = rng((seed ^ Math.round(t * 100000)) >>> 0), amplitude = Math.max(0, noise) * .001;
  return points.map(p => p.map(v => v + (random() * 2 - 1) * amplitude) as Vec3);
}
export interface BenchmarkRow { gesture: Gesture; frames: number; baselineMeanMm: number; ikMeanMm: number; baselineP95Mm: number; ikP95Mm: number; ikP95Ms: number; baselineLimitViolations: number; ikLimitViolations: number; baselineViolations: number; ikViolations: number; bestEffortFrames: number;
  meanInputPinchDistanceMm: number; baselineMeanPinchDistanceErrorMm: number; ikMeanPinchDistanceErrorMm: number; baselineMeanPinchVectorErrorMm: number; ikMeanPinchVectorErrorMm: number }
export interface BenchmarkResult {
  source: 'synthetic'; seed: number; frames: number; noiseMm: number; rows: BenchmarkRow[];
  aggregate: { totalFrames: number; baselineMeanMm: number; ikMeanMm: number; baselineViolations: number; ikViolations: number; bestEffortFrames: number };
}
export function benchmark(options: { frames?: number; noiseMm?: number; seed?: number; gestures?: Gesture[]; ik?: IKOptions } = {}): BenchmarkResult {
  const frames = clamp(Math.floor(options.frames ?? 45), 1, 300), seed = options.seed ?? 42, noiseMm = options.noiseMm ?? 0;
  const percentile = (values: number[], p: number) => [...values].sort((a, b) => a - b)[Math.min(values.length - 1, Math.floor(values.length * p))];
  const rows = (options.gestures ?? gestureNames).map(gesture => {
    const baselineErrors: number[] = [], ikErrors: number[] = [], times: number[] = [];
    let inputPinchSum = 0, baselinePinchDistanceSum = 0, ikPinchDistanceSum = 0, baselinePinchVectorSum = 0, ikPinchVectorSum = 0;
    let previous: number[] | undefined, baselineLimitViolations = 0, ikLimitViolations = 0, bestEffortFrames = 0;
    for (let i = 0; i < frames; i++) {
      const input = normalizeLandmarks(sampleGesture(gesture, i / 15, noiseMm, seed)).points;
      const base = angleBaseline(input, options.ik?.enforceLimits === false ? null : jointLimits), bm = metrics(base, input, { pinchTargetVector: options.ik?.pinchTargetVector });
      const result = solveIK(input, previous, options.ik); previous = result.q;
      baselineErrors.push(bm.meanTipErrorMm); ikErrors.push(result.metrics.meanTipErrorMm); times.push(result.elapsedMs);
      inputPinchSum += bm.inputPinchDistanceMm;
      baselinePinchDistanceSum += bm.pinchDistanceErrorMm; ikPinchDistanceSum += result.metrics.pinchDistanceErrorMm;
      baselinePinchVectorSum += bm.pinchVectorErrorMm; ikPinchVectorSum += result.metrics.pinchVectorErrorMm;
      baselineLimitViolations += bm.limitViolations; ikLimitViolations += result.metrics.limitViolations;
      bestEffortFrames += Number(result.status === 'best-effort');
    }
    return { gesture, frames, baselineMeanMm: baselineErrors.reduce((a, b) => a + b, 0) / frames, ikMeanMm: ikErrors.reduce((a, b) => a + b, 0) / frames, baselineP95Mm: percentile(baselineErrors, .95), ikP95Mm: percentile(ikErrors, .95), ikP95Ms: percentile(times, .95), baselineLimitViolations, ikLimitViolations, baselineViolations: baselineLimitViolations, ikViolations: ikLimitViolations, bestEffortFrames,
      meanInputPinchDistanceMm: inputPinchSum / frames, baselineMeanPinchDistanceErrorMm: baselinePinchDistanceSum / frames, ikMeanPinchDistanceErrorMm: ikPinchDistanceSum / frames, baselineMeanPinchVectorErrorMm: baselinePinchVectorSum / frames, ikMeanPinchVectorErrorMm: ikPinchVectorSum / frames };
  });
  const totalFrames = rows.reduce((sum, row) => sum + row.frames, 0);
  const aggregate = {
    totalFrames,
    baselineMeanMm: rows.reduce((sum, row) => sum + row.baselineMeanMm * row.frames, 0) / Math.max(1, totalFrames),
    ikMeanMm: rows.reduce((sum, row) => sum + row.ikMeanMm * row.frames, 0) / Math.max(1, totalFrames),
    baselineViolations: rows.reduce((sum, row) => sum + row.baselineViolations, 0),
    ikViolations: rows.reduce((sum, row) => sum + row.ikViolations, 0),
    bestEffortFrames: rows.reduce((sum, row) => sum + row.bestEffortFrames, 0),
  };
  return { source: 'synthetic', seed, frames, noiseMm, rows, aggregate };
}
