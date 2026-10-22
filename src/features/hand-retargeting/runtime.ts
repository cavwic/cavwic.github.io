import type { Vec3 } from './engine';

const tips = [4, 8, 12, 16, 20];
const finitePoints = (points: unknown): points is Vec3[] => Array.isArray(points) && points.length === 21
  && Array.from(points).every(point => Array.isArray(point) && point.length === 3
    && Array.from(point).every(value => typeof value === 'number' && Number.isFinite(value)));
const copy = (points: Vec3[]) => points.map(point => [...point] as Vec3);

/** Local, timestamp-aware input low-pass. It changes latency, not sensor accuracy. */
export class LandmarkFilter {
  private previous?: Vec3[];
  private timestamp?: number;
  reset() { this.previous = undefined; this.timestamp = undefined; }
  update(points: Vec3[], timestampMs: number, timeConstantSeconds: number): Vec3[] {
    if (!finitePoints(points) || !Number.isFinite(timestampMs) || timestampMs < 0) throw new Error('Invalid filter sample');
    // A render/settling tick must not repeatedly filter the same captured input.
    if (this.timestamp !== undefined && timestampMs <= this.timestamp) return copy(this.previous!);
    const dt = this.timestamp === undefined ? Infinity : (timestampMs - this.timestamp) / 1000;
    const tau = Math.max(0, Math.min(.15, Number.isFinite(timeConstantSeconds) ? timeConstantSeconds : 0));
    const alpha = tau === 0 || !this.previous || dt > .7 ? 1 : 1 - Math.exp(-dt / tau);
    const filtered = points.map((point, i) => point.map((value, axis) => this.previous
      ? this.previous[i][axis] + alpha * (value - this.previous[i][axis]) : value) as Vec3);
    this.previous = filtered;
    this.timestamp = timestampMs;
    return copy(filtered);
  }
}

export interface StationaryVariationResult { rmsMm: number | null; stationary: boolean; frames: number }
/** Output variation over a one-second, approximately stationary input window.
 * Input gating checks all 21 points; output RMS averages the five tip positions.
 * This is not positional accuracy. Moving, short or discontinuous windows are unavailable.
 */
export class StationaryVariation {
  private samples: { time: number; input: Vec3[]; output: Vec3[] }[] = [];
  reset() { this.samples = []; }
  update(input: Vec3[], output: Vec3[], timeMs: number): StationaryVariationResult {
    if (!finitePoints(input) || !finitePoints(output) || !Number.isFinite(timeMs) || timeMs < 0) {
      this.reset();
      return { rmsMm: null, stationary: false, frames: 0 };
    }
    const last = this.samples.at(-1);
    if (last && timeMs <= last.time) return this.measure();
    // Reacquisition cannot reuse a previously stationary window.
    if (last && timeMs - last.time > 250) this.reset();
    this.samples.push({ time: timeMs, input: copy(input), output: copy(output) });
    while (this.samples.length > 90 || timeMs - this.samples[0].time > 1000) this.samples.shift();
    return this.measure();
  }
  private measure(): StationaryVariationResult {
    const count = this.samples.length;
    if (count < 12 || this.samples.at(-1)!.time - this.samples[0].time < 500)
      return { rmsMm: null, stationary: false, frames: count };
    const times = this.samples.map(s => (s.time - this.samples[0].time) / 1000);
    const meanTime = times.reduce((a, b) => a + b, 0) / count;
    const timeVariance = times.reduce((sum, t) => sum + (t - meanTime) ** 2, 0);
    let squared = 0, maxSpeed = 0, maxInputDeviation = 0, maxInputExcursion = 0;
    for (let point = 0; point < 21; point++) {
      const mean = [0, 1, 2].map(axis => this.samples.reduce((sum, s) => sum + s.input[point][axis], 0) / count);
      let speedSquared = 0, inputVariance = 0;
      for (let axis = 0; axis < 3; axis++) {
        const slope = this.samples.reduce((sum, s, i) => sum + (times[i] - meanTime) * (s.input[point][axis] - mean[axis]), 0) / Math.max(1e-9, timeVariance);
        speedSquared += slope * slope;
        inputVariance += this.samples.reduce((sum, s) => sum + (s.input[point][axis] - mean[axis]) ** 2, 0) / count;
      }
      maxSpeed = Math.max(maxSpeed, Math.sqrt(speedSquared));
      maxInputDeviation = Math.max(maxInputDeviation, Math.sqrt(inputVariance));
      for (const sample of this.samples)
        maxInputExcursion = Math.max(maxInputExcursion, Math.hypot(...sample.input[point].map((v, axis) => v - mean[axis])));
    }
    for (const tip of tips) for (let axis = 0; axis < 3; axis++) {
      const mean = this.samples.reduce((sum, s) => sum + s.output[tip][axis], 0) / count;
      squared += this.samples.reduce((sum, s) => sum + (s.output[tip][axis] - mean) ** 2, 0) / count;
    }
    const stationary = maxSpeed < .008 && maxInputDeviation < .004 && maxInputExcursion < .009;
    return { rmsMm: stationary ? Math.sqrt(squared / tips.length) * 1000 : null, stationary, frames: count };
  }
}

/** Completed results only: invalid completed results / all completed results.
 * Submit capture timestamps to reject duplicate/out-of-order results. Reset on a
 * new camera session. Render ticks, dropped capture frames and timeouts are not results.
 */
export class TrackingQuality {
  processedFrames = 0;
  invalidFrames = 0;
  private lastTimestamp?: number;
  add(valid: boolean, timestampMs?: number): boolean {
    if (typeof valid !== 'boolean') throw new TypeError('Tracking result validity must be boolean');
    if (timestampMs !== undefined) {
      if (!Number.isFinite(timestampMs) || timestampMs < 0 || (this.lastTimestamp !== undefined && timestampMs <= this.lastTimestamp)) return false;
      this.lastTimestamp = timestampMs;
    }
    this.processedFrames++;
    this.invalidFrames += Number(!valid);
    return true;
  }
  reset() { this.processedFrames = 0; this.invalidFrames = 0; this.lastTimestamp = undefined; }
  get lossPercent() { return this.processedFrames ? 100 * this.invalidFrames / this.processedFrames : null; }
}
