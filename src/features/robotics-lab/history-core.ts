export type HistoryEntry = { label: string; undo(): void | Promise<void>; redo(): void | Promise<void> };
export type HistoryStatus = {
  canUndo: boolean; canRedo: boolean; undoLabel: string; redoLabel: string;
  busy: boolean; action: 'idle' | 'record' | 'undo' | 'redo' | 'error'; label: string;
};

/** In-memory commands only. Never replays clicks, downloads, permissions or network writes. */
export class OperationHistory {
  private entries: HistoryEntry[] = [];
  private cursor = 0;
  private listeners = new Set<(status: HistoryStatus) => void>();
  private before = new Set<() => void>();
  private after = new Set<() => void>();
  private beforeMove = new Set<() => void>();
  private drafts = new Map<symbol, string>();
  private action: HistoryStatus['action'] = 'idle';
  private label = '';
  busy = false;
  replaying = false;
  constructor(readonly limit = 50) {}
  get status(): HistoryStatus {
    return { canUndo: !this.busy && (this.cursor > 0 || this.drafts.size > 0), canRedo: !this.busy && !this.drafts.size && this.cursor < this.entries.length,
      undoLabel: [...this.drafts.values()].at(-1) ?? this.entries[this.cursor - 1]?.label ?? '', redoLabel: this.entries[this.cursor]?.label ?? '',
      busy: this.busy, action: this.action, label: this.label };
  }
  subscribe(listener: (status: HistoryStatus) => void): () => void { this.listeners.add(listener); listener(this.status); return () => this.listeners.delete(listener); }
  onBeforeRestore(callback: () => void): () => void { this.before.add(callback); return () => this.before.delete(callback); }
  onAfterRestore(callback: () => void): () => void { this.after.add(callback); return () => this.after.delete(callback); }
  onBeforeMove(callback: () => void): () => void { this.beforeMove.add(callback); return () => this.beforeMove.delete(callback); }
  setDraft(owner: symbol, label: string | null): void { if(label===null)this.drafts.delete(owner);else this.drafts.set(owner,label);this.emit(); }
  private emit(): void { const value = this.status; this.listeners.forEach(listener => listener(value)); }
  setBusy(value: boolean): void { this.busy = value; this.emit(); }
  reportError(label: string): void { this.action = 'error'; this.label = label; this.emit(); }
  record(entry: HistoryEntry): void {
    if (this.replaying) return;
    this.entries.splice(this.cursor);
    this.entries.push(entry);
    if (this.entries.length > this.limit) this.entries.splice(0, this.entries.length - this.limit);
    this.cursor = this.entries.length;
    this.action = 'record'; this.label = entry.label; this.emit();
  }
  private async move(direction: 'undo' | 'redo'): Promise<boolean> {
    if (this.busy) return false;
    // A shortcut during a live edit must undo that edit, not skip it and erase it.
    this.beforeMove.forEach(callback => callback());
    if (direction === 'undo' && this.cursor === 0 || direction === 'redo' && this.cursor === this.entries.length) return false;
    const entry = this.entries[direction === 'undo' ? this.cursor - 1 : this.cursor]!;
    this.busy = true; this.replaying = true; this.emit();
    try {
      this.before.forEach(callback => callback());
      await entry[direction]();
      this.cursor += direction === 'undo' ? -1 : 1;
      this.action = direction; this.label = entry.label;
      return true;
    } catch {
      // Keep the cursor in place on failure; do not claim the state was restored.
      this.action = 'error'; this.label = entry.label;
      return false;
    } finally {
      this.replaying = false; this.busy = false;
      this.after.forEach(callback => callback());
      this.emit();
    }
  }
  undo(): Promise<boolean> { return this.move('undo'); }
  redo(): Promise<boolean> { return this.move('redo'); }
}

export const operationHistory = new OperationHistory(50);
