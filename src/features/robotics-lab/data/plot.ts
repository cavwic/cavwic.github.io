import { isFrame, type Frame } from './engine';
export type SignalSample = { frame: Frame; row: number };
export function episodeSamples(frames: unknown[], episode: string): SignalSample[] {
  return frames.flatMap((frame, row) => isFrame(frame) && frame.episodeId === episode ? [{ frame, row }] : []);
}
/** Keep acquisition order, duplicate timestamps and clock reversals visible. */
export function extent(values: number[], minimumSpan = 1): [number, number] {
  const valid = values.filter(Number.isFinite);
  if (!valid.length) return [-minimumSpan / 2, minimumSpan / 2];
  let min = Infinity, max = -Infinity;
  for (const value of valid) { min = Math.min(min, value); max = Math.max(max, value); }
  const span = Math.max(max - min, minimumSpan);
  const center = (max + min) / 2;
  return [center - span * .58, center + span * .58];
}
/** Missing joint dimensions break the trace rather than inventing interpolated data. */
export function signalPath(samples: SignalSample[], value: (sample: SignalSample) => number | undefined, x: (sample: SignalSample, index: number) => number, y: (value: number) => number): string {
  let connected = false;
  return samples.map((sample, index) => {
    const v = value(sample);
    if (v === undefined || !Number.isFinite(v)) { connected = false; return ''; }
    const point = `${connected ? 'L' : 'M'}${x(sample,index).toFixed(3)},${y(v).toFixed(3)}`;
    connected = true;
    return point;
  }).join(' ');
}
