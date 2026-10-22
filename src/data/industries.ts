export type PrimaryIndustryId = "ai" | "robotics" | "dexterous-hands";

export type IndustryDirectoryItem = {
  id: PrimaryIndustryId;
  code: string;
  name: string;
  englishName: string;
  description: string;
  question: string;
  englishDescription: string;
  englishQuestion: string;
};

export const primaryIndustries: IndustryDirectoryItem[] = [
  {
    id: "ai",
    code: "AI",
    name: "企业 AI",
    englishName: "Enterprise AI",
    description: "从业务任务、知识与权限出发，评估 RAG、Agent、系统集成、评测和防护。",
    question: "它能否在真实权限、脏数据和异常输入下稳定完成任务？",
    englishDescription: "RAG and agents are operational systems. Evaluate data ownership, access control, retrieval quality, tool permissions, cost, observability, fallback, and human takeover together.",
    englishQuestion: "Can it complete the real task under production permissions, imperfect data, and abnormal input?",
  },
  {
    id: "robotics",
    code: "ROBOTICS",
    name: "具身智能",
    englishName: "Embodied robotics",
    description: "在同一方案中统筹本体、感知、控制、任务系统、安全、现场条件和服务能力。",
    question: "演示之外，失败恢复、人员安全和连续运行由谁负责？",
    englishDescription: "Robot capability depends on the body, perception, control, task system, safety boundary, site conditions, and service model working together.",
    englishQuestion: "Beyond the demo, who owns failure recovery, personnel safety, and continuous operation?",
  },
  {
    id: "dexterous-hands",
    code: "DEXTEROUS HANDS",
    name: "灵巧手",
    englishName: "Dexterous hands",
    description: "围绕末端任务研究机构、驱动、触觉、控制、接口、测试对象范围和验证方法。",
    question: "为什么必须用灵巧手，怎样证明它比夹爪更合适？",
    englishDescription: "Study mechanisms, actuation, tactile sensing, control, interfaces, object sets, and validation methods around the end task.",
    englishQuestion: "Why does the task need a dexterous hand, and how will it prove a better fit than a gripper?",
  },
];

export function getPrimaryIndustry(id: PrimaryIndustryId) {
  return primaryIndustries.find((industry) => industry.id === id)!;
}

export const industryMatrixPath = (id: PrimaryIndustryId, locale: "zh" | "en" = "zh") => `${locale === "en" ? "/en" : ""}/matrices/industry/${id}`;
export const industryCompanyPath = (id: PrimaryIndustryId, locale: "zh" | "en" = "zh") => `${locale === "en" ? "/en" : ""}/companies/industry/${id}`;
export const industryPagePath = (id: PrimaryIndustryId, locale: "zh" | "en" = "zh") => `${locale === "en" ? "/en" : ""}/industries/${id}`;
