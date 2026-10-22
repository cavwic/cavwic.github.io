import type { Vec3 } from './engine';

/** A proper local-to-palm rotation. Columns are housing side, bone tangent,
 * and pad/front. Bone endpoints cannot determine axial roll on a straight chain.
 */
export interface VisualBoneFrame {
  side: Vec3;
  tangent: Vec3;
  front: Vec3;
  midpoint: Vec3;
  length: number;
}

const finiteVector = (value: unknown): value is Vec3 => Array.isArray(value) && value.length === 3
  && Array.from(value).every(v => typeof v === 'number' && Number.isFinite(v));
const dot = (a: Vec3, b: Vec3) => a.reduce((sum, v, i) => sum + v * b[i], 0);
const norm = (a: Vec3) => Math.hypot(...a);
const cross = (a: Vec3, b: Vec3): Vec3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

/** Consume the model's full row-major rotation without bend-plane inference,
 * global-Z hemisphere selection, camera mirroring or pad/back sign guesses.
 * A zero-length segment returns null. Inconsistent FK endpoints are rejected.
 */
export function visualBoneFrame(start: Vec3, end: Vec3, rotation: readonly number[]): VisualBoneFrame | null {
  if (!finiteVector(start) || !finiteVector(end) || !Array.isArray(rotation) || rotation.length !== 9
    || !Array.from(rotation).every(v => typeof v === 'number' && Number.isFinite(v)))
    throw new Error('Visual bone requires finite endpoints and a complete 3×3 FK rotation.');
  const side: Vec3 = [rotation[0], rotation[3], rotation[6]];
  const tangent: Vec3 = [rotation[1], rotation[4], rotation[7]];
  const front: Vec3 = [rotation[2], rotation[5], rotation[8]];
  if ([side, tangent, front].some(v => Math.abs(norm(v) - 1) > 1e-6)
    || Math.abs(dot(side, tangent)) > 1e-6 || Math.abs(dot(side, front)) > 1e-6 || Math.abs(dot(tangent, front)) > 1e-6
    || dot(cross(side, tangent), front) < 1 - 1e-6)
    throw new Error('Visual FK frame must be an orthonormal proper rotation.');
  const delta = end.map((v, i) => v - start[i]) as Vec3, length = norm(delta);
  if (length < 1e-8) return null;
  if (dot(delta, tangent) / length < 1 - 1e-6)
    throw new Error('Visual endpoints and joint-state FK rotation disagree.');
  return { side, tangent, front, midpoint: start.map((v, i) => (v + end[i]) / 2) as Vec3, length };
}
