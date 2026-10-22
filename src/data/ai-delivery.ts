import type { Locale, Mode } from "../features/ai-delivery/model";
type Localized<T> = Record<Locale, T>;
interface AiSkill {
  slug: string;
  mode: Mode;
  title: Localized<string>;
  phase: Localized<string>;
  description: Localized<string>;
  question: Localized<string>;
  useWhen: Localized<string>;
  inputs: Localized<string[]>;
  outputs: Localized<string[]>;
  sequence: Localized<string[]>;
  boundary: Localized<string>;
  request: Localized<string>;
  example: Localized<{ title: string; detail: string }[]>;
  worksheet: string;
  solution: string;
  article: string;
}
export const aiSkills: AiSkill[] = [
  {
    slug: "enterprise-ai-delivery", mode: "enterprise",
    title: { zh: "企业 AI 发现与验收", en: "Enterprise AI discovery and acceptance" },
    phase: { zh: "立项与 POC", en: "Discovery and pilot acceptance" },
    description: { zh: "立项前判断什么值得做：梳理业务需求、知识权限和测试样本，交付 POC 范围与验收矩阵。", en: "Decide what to build before a pilot: define the business need, source access and test samples, then produce scope and an acceptance matrix." },
    question: { zh: "这项 AI 应用是否值得进入 POC，怎样判断它做对了？", en: "Is this AI use case ready for a pilot, and what would count as success?" },
    useWhen: { zh: "业务提出“做一个知识助手”或“自动处理文档”，但输入、数据授权和验收方式尚未确定时。", en: "A team wants a knowledge assistant or document automation, but inputs, access and acceptance are not yet defined." },
    inputs: { zh: ["一个真实业务任务与现有处理流程", "可公开或已获授权的数据样本及版本", "使用角色、错误代价与业务负责人"], en: ["One business task and its current process", "Public or authorized samples with source versions", "User roles, error consequences and a business owner"] },
    outputs: { zh: ["用例卡：用户、目标、范围与不做什么", "数据授权表：角色、来源、有效版本与更新责任", "验收矩阵：样本、预期回答、证据与失败条件"], en: ["Use-case brief: user, objective, scope and exclusions", "Access register: roles, sources, valid versions and update owners", "Acceptance matrix: samples, expected answers, evidence and failure criteria"] },
    sequence: { zh: ["澄清业务任务", "核对数据与授权", "设计对照样本", "确认 POC 进入条件"], en: ["Clarify the task", "Check data and access", "Design test cases", "Agree pilot entry criteria"] },
    boundary: { zh: "不替代生产工作流恢复设计，也不输出代码补丁；没有实际测试时不宣称准确率或收益。", en: "Does not design production recovery or implement code. Without actual tests, do not claim accuracy or business benefits." },
    request: { zh: "我们想让服务工程师查询维修手册。资料里有草稿和旧版，部分章节只允许主管查看。请先判断 POC 范围，并制定能复测的验收样本，不要接生产系统。", en: "Help service engineers query maintenance manuals. Sources include drafts and older versions, and some sections are supervisor-only. Define a pilot and repeatable acceptance cases without connecting production systems." },
    example: {
      zh: [
        { title: "范围结论", detail: "只生成内部答复草稿，必须给出文档版本与原文位置；无依据时拒答，不自动发送给客户。" },
        { title: "权限样本", detail: "工程师询问受限章节：预期不返回受限正文；主管使用同一问题：仅依据已批准的有效版本回答。" },
        { title: "进入条件", detail: "知识负责人确认有效文档与权限；业务复核预期答案后再运行 POC。当前尚无实测结果。" },
      ],
      en: [
        { title: "Scope decision", detail: "Prepare internal drafts with document versions and source locations. Abstain without evidence; never send directly to customers." },
        { title: "Access test", detail: "An engineer requesting a restricted section receives no restricted text. A supervisor asking the same question receives an answer from the approved current version only." },
        { title: "Entry criteria", detail: "The knowledge owner confirms sources and permissions; business reviewers approve expected answers before the pilot runs. No results have been measured yet." },
      ],
    },
    worksheet: "acceptance.md", solution: "enterprise-ai-workflow-delivery", article: "enterprise-ai-evidence-boundary",
  },
  {
    slug: "workflow-reliability", mode: "workflow",
    title: { zh: "工作流恢复设计", en: "Workflow reliability" },
    phase: { zh: "执行与恢复", en: "Execution and recovery" },
    description: { zh: "面向会写入或外发的流程：识别重复事件、超时和部分成功，交付状态转换表、对账与恢复步骤。", en: "For workflows that write or send: handle duplicate events, timeouts and partial success with state transitions, reconciliation and recovery procedures." },
    question: { zh: "请求超时了，但目标可能已写入，接下来能不能重试？", en: "A request timed out, but the destination may have saved it. Is a retry safe?" },
    useWhen: { zh: "流程已有清晰业务目标，即将接入工单、CRM、通知等有副作用的接口，或需要分析失败后如何接续时。", en: "The business goal is known and a workflow is about to write to tickets, CRM or notifications, or needs a reliable failure-recovery design." },
    inputs: { zh: ["节点顺序、接口契约与允许的写入动作", "来源事件标识、目标查询能力及回执字段", "审批点、重试限制、可补偿状态与接管人"], en: ["Step order, interface contracts and permitted writes", "Source event IDs, destination queries and receipt fields", "Approval gates, retry limits, reversible states and an escalation owner"] },
    outputs: { zh: ["状态转换表：成功、失败、未知与部分完成", "写入契约：业务主键、审批、幂等与回执", "故障演练表：中断点、对账步骤与恢复决定"], en: ["State transitions for success, failure, unknown and partial outcomes", "Write contract: business key, approval, idempotency and receipt", "Failure drills: interruption points, reconciliation and recovery decisions"] },
    sequence: { zh: ["标记有副作用的节点", "定义事件与状态", "设计对账和补偿", "安排中断恢复演练"], en: ["Identify side effects", "Define events and states", "Plan reconciliation", "Test interrupted recovery"] },
    boundary: { zh: "不重新评估商业立项，不因为勾选了审批就视为已批准，也不直接启用生产写入。", en: "Does not redo business discovery, treat an approval checkbox as authorization, or enable production writes." },
    request: { zh: "服务请求经人工批准后创建工单，但目标系统偶尔超时。请保证同一来信不重复创建，说明审批后、写入后和部分成功时分别怎样恢复。", en: "An approved service request creates a ticket, but the destination sometimes times out. Prevent duplicate creation and define recovery after approval, after a write and after partial success." },
    example: {
      zh: [
        { title: "事件契约", detail: "使用来源来信的稳定事件 ID；同一事件再次到达时，先查执行记录和目标工单，不重新生成业务身份。" },
        { title: "超时分支", detail: "状态设为“待对账”。查到目标记录则保存已有回执；无法确认是否已写入则转人工，不盲目重建。" },
        { title: "恢复演练", detail: "在测试环境模拟目标写入成功但响应丢失；核对只产生一张工单。此处是待执行演练，不是通过记录。" },
      ],
      en: [
        { title: "Event contract", detail: "Use the source message's stable event ID. A replay checks execution history and destination tickets rather than creating a new business identity." },
        { title: "Timeout branch", detail: "Move to reconciliation. Retain an existing destination receipt when found; escalate an unresolved outcome instead of creating another ticket." },
        { title: "Recovery drill", detail: "In a test environment, lose the response after a successful write and confirm that exactly one ticket exists. This is a planned drill, not a recorded pass." },
      ],
    },
    worksheet: "recovery.md", solution: "enterprise-ai-workflow-delivery", article: "workflow-retry-is-not-recovery",
  },
  {
    slug: "ai-coding-delivery", mode: "coding",
    title: { zh: "AI 编码交付", en: "AI coding delivery" },
    phase: { zh: "开发与交接", en: "Implementation and handoff" },
    description: { zh: "面向现有代码与 vibe coding 原型：约束变更范围、保留用户数据，交付代码改动、实际验证记录和恢复断点。", en: "For existing code and vibe-coded prototypes: scope the change, preserve user data, and hand off code changes, actual verification and a resume point." },
    question: { zh: "怎样把一句开发需求变成可验证、可继续维护的改动？", en: "How do you turn a coding request into a verifiable, maintainable change?" },
    useWhen: { zh: "已有项目需要增加功能、修复问题，或原型需要从“能演示”推进到可以测试、保存和交接的版本时。", en: "An existing project needs a feature or fix, or a prototype must become testable, persistent and maintainable rather than merely demonstrable." },
    inputs: { zh: ["代码库、现有修改、运行入口和测试命令", "目标行为、允许修改的模块及数据保留要求", "验收场景、运行环境和发布授权边界"], en: ["Repository, existing changes, entry point and test commands", "Target behavior, allowed modules and data-preservation requirements", "Acceptance cases, runtime environment and release-permission boundaries"] },
    outputs: { zh: ["变更契约：要改什么、不能改什么、如何验收", "实现与验证记录：文件、命令、结果和未运行项", "交接断点：服务状态、剩余风险、回退点与下一步"], en: ["Change contract: intended behavior, exclusions and acceptance", "Implementation evidence: files, commands, results and unrun checks", "Resume point: services, remaining risks, rollback and next action"] },
    sequence: { zh: ["读取代码与已有状态", "实现一个纵向切片", "运行测试与交互检查", "审查差异并交接"], en: ["Inspect code and state", "Implement a vertical slice", "Run tests and UI checks", "Review the diff and hand off"] },
    boundary: { zh: "不把未运行测试写成通过，不覆盖用户已有改动；提交、推送和部署仍需分别取得授权。", en: "Never mark unrun tests as passed or overwrite pre-existing work. Commits, pushes and deployment still require appropriate authorization." },
    request: { zh: "请在现有网页中加入 CSV 检查：导入后列出缺列和重复行，并导出错误清单。原文件不能修改，不更换框架，先本地完成，不推送。", en: "Add CSV checks to the existing app: list missing columns and duplicate rows, then export errors. Preserve source files, keep the framework, work locally and do not push." },
    example: {
      zh: [
        { title: "变更范围", detail: "仅修改导入、校验、结果视图与相应测试；先阅读现有文件和工作区差异，避免覆盖已有改动。" },
        { title: "验证计划", detail: "覆盖正常、空文件、缺列、重复行及取消；导出后重新打开核对。每条记录实际执行的命令与退出状态。" },
        { title: "交接格式", detail: "列出改动文件、可运行入口、已执行与未执行检查、数据保留情况和下一步。示例未附代码，所有验证仍为待执行。" },
      ],
      en: [
        { title: "Change boundary", detail: "Touch import, validation, result views and their tests only. Inspect files and existing diffs before editing so pre-existing work survives." },
        { title: "Verification plan", detail: "Cover valid input, empty files, missing columns, duplicates and cancellation; reopen exports. Record actual commands and exit status for each check." },
        { title: "Handoff record", detail: "List files, runnable entry point, performed and unperformed checks, preserved data and the next action. No code accompanies this design example; verification remains unexecuted." },
      ],
    },
    worksheet: "handoff.md", solution: "ai-assisted-coding-delivery", article: "vibe-coding-needs-change-contract",
  },
];
export function skillEntries(locale: Locale) {
  return aiSkills.map(s => ({ title: s.title[locale], description: s.description[locale], status: "published" as const, href: `${locale === "en" ? "/en" : ""}/skills/${s.slug}` }));
}
