/**
 * Recording lifecycles are independent of command history. Frames appended by a
 * camera or playback are never rolled back by undoing an unrelated setting.
 * Records and metadata must be treated as immutable after they are appended.
 */
export interface RecordingSegment<R, C, M> {
  id: number;
  records: readonly R[];
  chart: readonly C[];
  metadata?: M;
}

export class RecordingHistory<R, C, M> {
  private serial = 0;
  private currentId = 0;
  private metadata?: M;
  private retained = new Map<number, RecordingSegment<R, C, M>>();
  private records: R[];
  private chart: C[];

  constructor(records: R[], chart: C[]) { this.records = records; this.chart = chart; }

  get id(): number { return this.currentId; }

  /** Called before the first sample; later settings cannot relabel an old run. */
  start(metadata: M): void { this.metadata ??= metadata; }

  snapshot(): RecordingSegment<R, C, M> {
    return { id: this.currentId, records: [...this.records], chart: [...this.chart], metadata: this.metadata };
  }

  private retain(): void {
    if (this.records.length) this.retained.set(this.currentId, this.snapshot());
  }

  clear(): void {
    this.retain();
    this.currentId = ++this.serial;
    this.metadata = undefined;
    this.records.length = 0;
    this.chart.length = 0;
  }

  restore(snapshot: RecordingSegment<R, C, M>): void {
    // Keep newer automatically collected frames in the same lifecycle.
    if (snapshot.id === this.currentId) return;
    this.retain();
    // A retained run may contain later samples than a command's old snapshot.
    const latest = this.retained.get(snapshot.id) ?? snapshot;
    this.currentId = latest.id;
    this.serial = Math.max(this.serial, latest.id);
    this.metadata = latest.metadata;
    this.records.splice(0, this.records.length, ...latest.records);
    this.chart.splice(0, this.chart.length, ...latest.chart);
  }

  /** Nonempty inactive runs, deduplicated by monotonic lifecycle ID. */
  backups(): RecordingSegment<R, C, M>[] {
    return [...this.retained.values()].filter(segment => segment.id !== this.currentId && segment.records.length > 0);
  }
}
