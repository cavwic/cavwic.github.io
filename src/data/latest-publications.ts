import { presalesPlatform, type Entry, type Locale } from "./site.ts";
import { siteFeatures } from "./site-features.ts";

export function getLatestPublications(locale: Locale, articles: Entry[]): Entry[] {
  const lab: Entry = locale === "zh" ? {
    title: "灵巧操作实验台：八项机器人软件实验",
    description: "从单指控制、动作重定向到抓取、数据诊断与模仿学习，保留对照和失败结果；软件实验不等于真机验证。",
    href: "/tools/robotics-lab",
    status: "published",
    date: "2026.10",
  } : {
    title: "Dexterous Manipulation Labs: eight robotics software experiments",
    description: "Explore control, retargeting, grasping, data diagnostics and imitation learning, with baselines and failure cases. Software results are not hardware validation.",
    href: "/en/tools/robotics-lab",
    status: "published",
    date: "2026.10",
  };
  const aiWorkbench: Entry = locale === "zh" ? {
    title: "AI 交付工作台与配套方案、Skills",
    description: "企业应用、可恢复工作流与 AI 辅助开发：任务书、验收清单、交接提示词与三个可下载 Skill 包。",
    href: "/tools/ai-delivery-workbench", status: "published", date: "2026.10",
  } : {
    title: "AI delivery workbench, solutions and Skills",
    description: "Enterprise AI, recoverable workflows and AI-assisted coding: task briefs, acceptance checklists, handoff prompts and three downloadable Skill packages.",
    href: "/en/tools/ai-delivery-workbench", status: "published", date: "2026.10",
  };
  const aiDocs: Entry = locale === "zh" ? {
    title: "企业 AI、工作流与 AI 辅助开发方案",
    description: "从业务边界、工作流恢复到代码交付，结合方法文章、验收工作表与三个可下载 Skill 包。",
    href: "/library/enterprise-ai-workflow-delivery", status: "published", date: "2026.10",
  } : {
    title: "Enterprise AI, workflow and AI-assisted coding solutions",
    description: "Explore scope, workflow recovery and coding delivery through practical articles, acceptance worksheets and three downloadable Skill packages.",
    href: "/en/library/enterprise-ai-workflow-delivery", status: "published", date: "2026.10",
  };
  const ai = siteFeatures.aiDeliveryWorkbench ? aiWorkbench : aiDocs;
  const platform: Entry = { ...presalesPlatform[locale], date: "2026.10" };
  const seen = new Set([platform.href, ai.href, lab.href]);
  const rest = articles.filter(entry => { if ((!siteFeatures.aiDeliveryWorkbench && entry.href?.includes("/tools/ai-delivery-workbench")) || seen.has(entry.href)) return false; seen.add(entry.href); return true; });
  return [platform, ai, lab, ...rest.slice(0, 1)];
}
