import type { Entry, Locale } from "./site";

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
  return [lab, ...articles.filter(entry => entry.href !== lab.href).slice(0, 3)];
}
