import { emptyBrief, exampleBrief, getLaunchBrief, inspectBrief, parseBrief, renderBrief, type Brief, type Mode, type StepKind } from "./model";

export function initWorkbench(root: HTMLElement) {
  const locale = root.dataset.locale === "en" ? "en" : "zh";
  const zh = locale === "zh";
  const drafts: Partial<Record<Mode, Brief>> = {};
  let brief = getLaunchBrief(window.location.search, locale);
  let mode: Mode = brief.mode;
  let format: "plan" | "checks" | "prompt" = "plan";
  const form = root.querySelector<HTMLFormElement>("form")!;
  const steps = root.querySelector<HTMLOListElement>("[data-steps]")!;
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const preview = root.querySelector<HTMLElement>("[data-preview]")!;
  const inputFile = root.querySelector<HTMLInputElement>("[data-import-file]")!;
  const key = "cavwic-ai-delivery-v1";
  const handoffKey = `${key}-language-handoff`;
  const say = (text: string, error = false) => { status.textContent = text; status.dataset.error = String(error); };
  const readForm = () => {
    const d = new FormData(form);
    for (const k of ["title", "objective", "data", "output", "owner", "acceptance", "recovery", "excluded"] as const) brief[k] = String(d.get(k) ?? "");
    brief.sensitive = d.has("sensitive"); brief.external = d.has("external");
    brief.steps = Array.from(steps.children).map(row => ({ name: row.querySelector<HTMLInputElement>("[data-step-name]")!.value, kind: row.querySelector<HTMLSelectElement>("[data-step-kind]")!.value as StepKind, approval: row.querySelector<HTMLInputElement>("[data-step-approval]")!.checked }));
    drafts[mode] = brief;
  };
  const update = () => {
    const findings = inspectBrief(brief, locale);
    root.querySelector("[data-gap-count]")!.textContent = String(findings.filter(f => f.level === "blocker").length);
    root.querySelector("[data-review-count]")!.textContent = String(findings.filter(f => f.level === "review").length);
    root.querySelector("[data-preview-title]")!.textContent = brief.title.trim() || (zh ? "未命名任务" : "Untitled task");
    preview.textContent = renderBrief(brief, locale, format);
    const skill = { enterprise: "enterprise-ai-delivery", workflow: "workflow-reliability", coding: "ai-coding-delivery" }[mode];
    root.querySelector<HTMLAnchorElement>("[data-skill-link]")!.href = `${zh ? "" : "/en"}/skills/${skill}`;
    const languageLink = document.querySelector<HTMLAnchorElement>(".language-toggle");
    if (languageLink) { const url = new URL(languageLink.href); url.searchParams.set("mode", mode); url.searchParams.delete("example"); languageLink.href = url.href; }
    root.querySelectorAll<HTMLButtonElement>("[data-mode]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.mode === mode)));
    const add = root.querySelector<HTMLButtonElement>('[data-action="add"]')!;
    add.disabled = brief.steps.length >= 30;
  };
  const renderSteps = () => {
    steps.replaceChildren();
    brief.steps.forEach((step, index) => {
      const fragment = root.querySelector<HTMLTemplateElement>("[data-step-template]")!.content.cloneNode(true) as DocumentFragment;
      fragment.querySelector(".ai-step-index")!.textContent = String(index + 1).padStart(2, "0");
      fragment.querySelector<HTMLInputElement>("[data-step-name]")!.value = step.name;
      fragment.querySelector<HTMLSelectElement>("[data-step-kind]")!.value = step.kind;
      fragment.querySelector<HTMLInputElement>("[data-step-approval]")!.checked = step.approval;
      fragment.querySelector<HTMLButtonElement>('[data-step-action="up"]')!.disabled = index === 0;
      fragment.querySelector<HTMLButtonElement>('[data-step-action="down"]')!.disabled = index === brief.steps.length - 1;
      steps.append(fragment);
    });
  };
  const fill = () => {
    for (const k of ["title", "objective", "data", "output", "owner", "acceptance", "recovery", "excluded"] as const) (form.elements.namedItem(k) as HTMLInputElement).value = brief[k];
    for (const k of ["sensitive", "external"] as const) (form.elements.namedItem(k) as HTMLInputElement).checked = brief[k];
    renderSteps(); update();
  };
  const replace = (next: Brief) => { mode = next.mode; brief = next; drafts[mode] = next; fill(); };
  const hasWork = (b: Brief) => Boolean(b.title || b.objective || b.data || b.output || b.owner || b.acceptance || b.recovery || b.excluded || b.sensitive || b.external || JSON.stringify(b.steps) !== JSON.stringify(emptyBrief(b.mode, locale).steps));
  const confirmReplace = (targetMode: Mode = mode) => !(hasWork(brief) || (drafts[targetMode] && hasWork(drafts[targetMode]!))) || window.confirm(zh ? "替换此任务的内容？可先保存或导出。" : "Replace this task? Save or export it first if needed.");
  const download = (text: string, ext: string) => {
    const url = URL.createObjectURL(new Blob([text], { type: ext === "json" ? "application/json" : "text/markdown;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url; a.download = `${(brief.title.trim() || "ai-delivery").replace(/[<>:"/\\|?*\x00-\x1f]/g, "-").slice(0, 80)}.${ext}`;
    a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    say(zh ? "已生成下载文件。" : "Download prepared.");
  };
  form.addEventListener("submit", e => e.preventDefault());
  form.addEventListener("input", () => { readForm(); update(); });
  form.addEventListener("change", () => { readForm(); update(); });
  steps.addEventListener("click", e => {
    const button = (e.target as Element).closest<HTMLButtonElement>("[data-step-action]");
    if (!button) return;
    readForm();
    const index = Array.from(steps.children).indexOf(button.closest("li")!);
    const action = button.dataset.stepAction;
    if (action === "remove") brief.steps.splice(index, 1);
    else { const other = action === "up" ? index - 1 : index + 1; if (other < 0 || other >= brief.steps.length) return; [brief.steps[index], brief.steps[other]] = [brief.steps[other], brief.steps[index]]; }
    renderSteps(); update();
    say(zh ? "步骤已更新。" : "Steps updated.");
  });
  root.addEventListener("click", async e => {
    const button = (e.target as Element).closest<HTMLButtonElement>("button");
    if (!button || button.hasAttribute("data-step-action")) return;
    readForm();
    if (button.dataset.mode) { mode = button.dataset.mode as Mode; brief = drafts[mode] ?? emptyBrief(mode, locale); const url = new URL(window.location.href); url.searchParams.set("mode", mode); url.searchParams.delete("example"); history.replaceState(history.state, "", url); fill(); say(""); return; }
    if (button.dataset.format) {
      format = button.dataset.format as typeof format;
      root.querySelectorAll<HTMLButtonElement>("[data-format]").forEach(b => { b.setAttribute("aria-selected", String(b === button)); b.tabIndex = b === button ? 0 : -1; });
      preview.setAttribute("aria-labelledby", button.id); update(); return;
    }
    try {
      switch (button.dataset.action) {
        case "example": if (confirmReplace()) { replace(exampleBrief(mode, locale)); say(zh ? "已载入设计示例，未执行任何任务。" : "Design example loaded. No tasks executed."); } break;
        case "reset": if (confirmReplace()) { replace(emptyBrief(mode, locale)); say(zh ? "已清空当前模式；已保存草稿未删除。" : "Current mode cleared. Saved draft unchanged."); } break;
        case "add": if (brief.steps.length < 30) { brief.steps.push({ name: "", kind: "check", approval: false }); renderSteps(); update(); steps.lastElementChild?.querySelector<HTMLInputElement>("input")?.focus(); } break;
        case "save": localStorage.setItem(key, JSON.stringify(brief)); say(zh ? "当前任务已保存到此浏览器，仅保留最近一次保存。" : "Current task saved in this browser, replacing the previous saved draft."); break;
        case "load": { const saved = localStorage.getItem(key); if (!saved) { say(zh ? "此浏览器没有已保存草稿。" : "No saved draft in this browser."); break; } const next = parseBrief(JSON.parse(saved)); if (confirmReplace(next.mode)) { replace(next); say(zh ? "已打开本机草稿。" : "Saved draft opened."); } break; }
        case "import": inputFile.click(); break;
        case "json": download(JSON.stringify(brief, null, 2), "json"); break;
        case "markdown": download(renderBrief(brief, locale, "plan"), "md"); break;
        case "copy": await navigator.clipboard.writeText(renderBrief(brief, locale, format)); say(zh ? "已复制当前内容。" : "Current content copied."); break;
      }
    } catch { say(zh ? "操作未完成：请检查浏览器存储或剪贴板权限；可改用下载。" : "Action failed. Check browser storage or clipboard permissions, or use download.", true); }
  });
  inputFile.addEventListener("change", async () => {
    try {
      const file = inputFile.files?.[0]; if (!file) return;
      if (file.size > 1_000_000) throw new Error("Too large");
      const next = parseBrief(JSON.parse(await file.text()));
      if (confirmReplace(next.mode)) { replace(next); say(zh ? "任务已导入，未执行其中的步骤。" : "Task imported. Its steps have not been executed."); }
    } catch { say(zh ? "无法导入：请选择本工具导出的有效 JSON（不超过 1 MB）。" : "Import failed. Use valid task JSON exported by this tool, up to 1 MB.", true); }
    finally { inputFile.value = ""; }
  });
  document.querySelector<HTMLAnchorElement>(".language-toggle")?.addEventListener("click", () => {
    readForm();
    try { if (hasWork(brief)) sessionStorage.setItem(handoffKey, JSON.stringify(brief)); } catch {}
  });
  root.querySelector('[role="tablist"]')?.addEventListener("keydown", e => {
    const event = e as KeyboardEvent;
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-format]"));
    const current = tabs.indexOf(document.activeElement as HTMLButtonElement);
    const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (current + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    event.preventDefault(); tabs[next].click(); tabs[next].focus();
  });
  try {
    const handoff = sessionStorage.getItem(handoffKey);
    sessionStorage.removeItem(handoffKey);
    if (handoff) { const next = parseBrief(JSON.parse(handoff)); const requested = new URLSearchParams(window.location.search).get("mode"); if (!requested || requested === next.mode) { brief = next; mode = brief.mode; drafts[mode] = brief; } }
  } catch {}
  fill();
}
