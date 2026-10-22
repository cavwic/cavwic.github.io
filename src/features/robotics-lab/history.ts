import { operationHistory, type OperationHistory } from './history-core';
export { OperationHistory, operationHistory } from './history-core';

type ScopeOptions<T> = {
  /** Return owned immutable snapshots; large immutable data may be retained by reference. */
  capture(): T;
  restore(state: T): void | Promise<void>;
  equals?(a: T, b: T): boolean;
  beforeRestore?(): void;
  controller?: OperationHistory;
  label?: string;
};
const isPromise = (value: unknown): value is PromiseLike<unknown> => !!value && typeof (value as PromiseLike<unknown>).then === 'function';

export function createHistoryScope<T>(options: ScopeOptions<T>) {
  const history = options.controller ?? operationHistory;
  const equal = options.equals ?? ((a: T, b: T) => JSON.stringify(a) === JSON.stringify(b));
  let last: T, pending: T, initialized = false, editing = false, disposed = false, dirty = false;
  let owner: symbol | 'gesture' | undefined;
  let pendingLabel = options.label ?? (typeof document !== 'undefined' && document.documentElement?.dataset.locale === 'en' ? 'Edit experiment' : '调整实验设置');
  const draftKey = Symbol('experiment-edit');
  const clearPending = () => { editing = false;dirty = false;owner = undefined;history.setDraft(draftKey,null); };
  const reset = () => { if (disposed) return; last = options.capture(); initialized = true; clearPending(); };
  const begin = (label?: string) => {
    if (disposed || history.busy || history.replaying) return;
    if (editing && owner === 'gesture') return;
    if (editing && dirty) commit(pendingLabel);
    pending = options.capture();editing = true;dirty = false;owner = 'gesture';
    if(label)pendingLabel=label;
  };
  const prepareEvent = (eventOwner:symbol,label:string) => {
    if (!editing || owner!==eventOwner) { pending = initialized ? last : options.capture();editing = true;owner=eventOwner; }
    dirty = true;pendingLabel=label;
  };
  const preview = () => { if(editing&&dirty&&!equal(pending,options.capture()))history.setDraft(draftKey,pendingLabel);else history.setDraft(draftKey,null); };
  function add(label: string, before: T): void {
    const after = options.capture();
    last = after; initialized = true; clearPending();
    if (history.replaying || equal(before, after)) return;
    history.record({ label,
      undo: async () => { await options.restore(before); reset(); },
      redo: async () => { await options.restore(after); reset(); },
    });
  }
  const fail = async (label: string, before: T) => {
    // Roll back a partially-applied asynchronous selection, never replay its external action.
    try { await options.restore(before); } catch { /* The visible error still remains explicit. */ }
    reset(); history.reportError(label);
  };
  function execute<R>(label: string, before: T, action: () => R): R | undefined {
    try {
      const result = action();
      if (isPromise(result)) {
        history.setBusy(true);
        return Promise.resolve(result).then(() => { add(label, before); return result; }, async () => { await fail(label, before); return undefined; })
          .finally(() => history.setBusy(false)) as R;
      }
      add(label, before); return result;
    } catch {
      history.setBusy(true);
      void fail(label, before).finally(() => history.setBusy(false));
      return undefined;
    }
  }
  function run<R>(label: string, action: () => R): R | undefined {
    if (disposed || history.busy && !history.replaying) return undefined;
    if (history.replaying) return action();
    if(editing&&(dirty||owner==='gesture'))commit(pendingLabel);
    const before = options.capture(); clearPending();
    return execute(label, before, action);
  }
  function commit(label: string): void {
    if (disposed || history.busy || history.replaying) return;
    if (!editing) return;
    const before = pending; clearPending(); add(label, before);
  }
  const cleanups: (() => void)[] = [];
  function listen(element: HTMLElement, event: 'change' | 'input', label: string, handler: (event: Event) => unknown): void {
    const eventOwner=Symbol(label);
    const start = () => {
      if(disposed||history.busy||history.replaying)return;
      if(editing&&owner!==eventOwner&&(dirty||owner==='gesture'))commit(pendingLabel);
      if(!editing||owner!==eventOwner||!dirty){pending=options.capture();editing=true;owner=eventOwner;dirty=false;pendingLabel=label;}
    };
    // One pointer drag or text edit is one command, not one command per input event.
    for (const name of ['focusin', 'pointerdown', 'keydown']) element.addEventListener(name, start);
    const handle = (e: Event) => {
      if (history.busy && !history.replaying) return;
      if (history.replaying) { void handler(e); return; }
      prepareEvent(eventOwner,label);
      if (event === 'change') { const before = pending; clearPending(); execute(label, before, () => handler(e)); }
      else {
        try { const result = handler(e); if (isPromise(result)) void Promise.resolve(result).catch(() => history.reportError(label)); }
        catch { history.reportError(label); }
        preview();
      }
    };
    const end = () => {if(owner!==eventOwner)return;if(dirty)commit(label);else clearPending();};
    const previewChange = () => {if(history.busy||history.replaying)return;prepareEvent(eventOwner,label);preview();};
    element.addEventListener(event, handle);
    if(event==='change')element.addEventListener('input',previewChange);
    if (event === 'input') element.addEventListener('change', end);
    element.addEventListener('focusout', end);
    cleanups.push(() => {
      for (const name of ['focusin', 'pointerdown', 'keydown']) element.removeEventListener(name, start);
      element.removeEventListener(event, handle); element.removeEventListener('change', end); element.removeEventListener('focusout', end);
      element.removeEventListener('input',previewChange);
    });
  }
  const unpause = options.beforeRestore ? history.onBeforeRestore(options.beforeRestore) : () => {};
  const unrebase = history.onAfterRestore(reset);
  const unflush = history.onBeforeMove(()=>{if(editing&&(dirty||owner==='gesture'))commit(pendingLabel);else clearPending();});
  return { run, begin, commit, reset, listen, dispose() { disposed = true;history.setDraft(draftKey,null);unpause();unrebase();unflush();cleanups.forEach(fn => fn()); } };
}

let installed = false;
export function installHistoryUI(): void {
  if (installed || typeof document === 'undefined') return;
  const toolbar = document.querySelector<HTMLElement>('[data-history-toolbar]');
  if (!toolbar) return;
  installed = true;
  const zh = document.documentElement.dataset.locale !== 'en';
  const t = (cn: string, en: string) => zh ? cn : en;
  const undo = toolbar.querySelector<HTMLButtonElement>('[data-history-undo]')!;
  const redo = toolbar.querySelector<HTMLButtonElement>('[data-history-redo]')!;
  const output = toolbar.querySelector<HTMLElement>('[data-history-status]')!;
  const inertBefore = new Map<HTMLElement, boolean>();
  const unsubscribe = operationHistory.subscribe(status => {
    undo.disabled = !status.canUndo; redo.disabled = !status.canRedo;
    undo.title = status.undoLabel ? `${t('撤销', 'Undo')}: ${status.undoLabel} (Ctrl+Z)` : t('暂无可撤销操作', 'Nothing to undo');
    redo.title = status.redoLabel ? `${t('恢复', 'Redo')}: ${status.redoLabel} (Ctrl+Y / Ctrl+Shift+Z)` : t('暂无可恢复操作', 'Nothing to redo');
    output.textContent = status.busy ? t('正在更新…', 'Updating…') : status.action === 'undo' ? t(`已撤销：${status.label}`, `Undone: ${status.label}`) : status.action === 'redo' ? t(`已恢复：${status.label}`, `Redone: ${status.label}`) : status.action === 'error' ? t('未能完成操作，未推进历史。请重试。', 'The action could not be completed. History was not advanced. Please retry.') : '';
    output.title = output.textContent;
    toolbar.setAttribute('aria-busy', String(status.busy));
    if (status.busy) document.querySelectorAll<HTMLElement>('#robotics-panel,#workspace').forEach(node => { if (!inertBefore.has(node)) inertBefore.set(node, node.inert); node.inert = true; });
    else { inertBefore.forEach((value, node) => { node.inert = value; }); inertBefore.clear(); }
  });
  const doUndo = () => { void operationHistory.undo(); };
  const doRedo = () => { void operationHistory.redo(); };
  undo.addEventListener('click', doUndo); redo.addEventListener('click', doRedo);
  const keyboard = (event: KeyboardEvent) => {
    if (!(event.ctrlKey || event.metaKey) || event.altKey) return;
    const target = event.target as HTMLElement | null;
    // Keep native text editing undo available inside text fields.
    if (target?.isContentEditable || target?.tagName === 'TEXTAREA' || target instanceof HTMLInputElement && !['range','checkbox','radio','button','submit'].includes(target.type)) return;
    const key = event.key.toLowerCase();
    if (key === 'z' && !event.shiftKey) { event.preventDefault(); doUndo(); }
    else if (key === 'y' || key === 'z' && event.shiftKey) { event.preventDefault(); doRedo(); }
  };
  document.addEventListener('keydown', keyboard);
  const header = document.querySelector<HTMLElement>('header');
  const size = () => { const height = header && getComputedStyle(header).position === 'sticky' ? header.getBoundingClientRect().height : 0; toolbar.style.setProperty('--experiment-header-height', `${height}px`); };
  const observer = new ResizeObserver(size); if (header) observer.observe(header); size();
  window.addEventListener('pagehide', event => { if (event.persisted) return; unsubscribe(); observer.disconnect(); document.removeEventListener('keydown', keyboard); installed = false; });
}
