import type { IndustryId } from "../content";
import {anyboticsCompanyVisualPatch} from './product-image-supplement-20261019';

export type CompanyVisual = {
  src: string;
  sourceUrl?: string;
  credit?: string;
  objectFit?: 'contain' | 'cover';
  alt: {
    zh: string;
    en: string;
  };
};

const visuals = {
  "ai-workflow": {
    src: "/images/company-visuals/ai-workflow-concept.webp",
    alt: { zh: "企业 AI 工作流编排概念视觉", en: "Concept visual of enterprise AI workflow orchestration" },
  },
  "ai-document": {
    src: "/images/company-visuals/ai-document-intelligence-concept.webp",
    alt: { zh: "文档解析、检索与引用概念视觉", en: "Concept visual of document parsing, retrieval, and citation" },
  },
  "ai-automation": {
    src: "/images/company-visuals/ai-process-automation-concept.webp",
    alt: { zh: "企业业务流程自动化概念视觉", en: "Concept visual of enterprise process automation" },
  },
  "robot-simulation": {
    src: "/images/company-visuals/robot-simulation-compute-concept.webp",
    alt: { zh: "机器人仿真、模型与计算平台概念视觉", en: "Concept visual of robot simulation, models, and computing" },
  },
  "robot-industrial": {
    src: "/images/company-visuals/robot-industrial-humanoid-concept.webp",
    alt: { zh: "工业人形机器人任务概念视觉", en: "Concept visual of an industrial humanoid robot task" },
  },
  "robot-logistics": {
    src: "/images/company-visuals/robot-logistics-humanoid-concept.webp",
    alt: { zh: "仓储物流具身机器人概念视觉", en: "Concept visual of an embodied robot in warehouse logistics" },
  },
  "robot-research": {
    src: "/images/company-visuals/robot-research-humanoid-concept.webp",
    alt: { zh: "科研人形机器人测试概念视觉", en: "Concept visual of humanoid robot research and testing" },
  },
  "robot-service": {
    src: "/images/company-visuals/robot-service-humanoid-concept.webp",
    alt: { zh: "室内服务机器人任务概念视觉", en: "Concept visual of an indoor service robot task" },
  },
  "robot-perception": {
    src: "/images/company-visuals/robot-perception-concept.webp",
    alt: { zh: "机器人三维视觉与激光感知概念视觉", en: "Concept visual of robot 3D vision and lidar perception" },
  },
  "robot-joint": {
    src: "/images/company-visuals/robot-joint-drive-concept.webp",
    alt: { zh: "机器人关节驱动部件概念视觉", en: "Concept visual of robot joint and drive components" },
  },
  "robot-vision-cell": {
    src: "/images/company-visuals/robot-vision-workcell-concept.webp",
    alt: { zh: "三维视觉引导机器人工作站概念视觉", en: "Concept visual of a 3D-vision-guided robot workcell" },
  },
  "robot-edge": {
    src: "/images/company-visuals/robot-edge-compute-concept.webp",
    alt: { zh: "机器人边缘计算与控制器概念视觉", en: "Concept visual of robot edge computing and controllers" },
  },
  "dexterous-hand": {
    src: "/images/company-visuals/dexterous-hand-concept.webp",
    alt: { zh: "多指灵巧手测试概念视觉", en: "Concept visual of a multi-finger dexterous hand test" },
  },
  "soft-hand": {
    src: "/images/company-visuals/soft-gripper-concept.webp",
    alt: { zh: "柔顺欠驱动机器人手概念视觉", en: "Concept visual of a compliant underactuated robot hand" },
  },
  tactile: {
    src: "/images/company-visuals/tactile-sensing-concept.webp",
    alt: { zh: "机器人触觉传感与标定概念视觉", en: "Concept visual of robotic tactile sensing and calibration" },
  },
  "force-torque": {
    src: "/images/company-visuals/force-torque-sensing-concept.webp",
    alt: { zh: "机器人多轴力与力矩测量概念视觉", en: "Concept visual of multi-axis force and torque measurement" },
  },
  inspire: {
    src: "/images/inspire-product-path-concept.webp",
    alt: { zh: "微型线性执行器、五指机器人手与触觉指尖组成的概念视觉", en: "Concept visual of miniature linear actuators, a five-finger robot hand, and tactile fingertips" },
  },
} as const satisfies Record<string, CompanyVisual>;

type VisualId = keyof typeof visuals;

const assignments: Record<string, VisualId> = {
  langgenius: "ai-workflow",
  infiniflow: "ai-document",
  labring: "ai-workflow",
  "ai-indeed": "ai-automation",
  unitree: "robot-research",
  "booster-robotics": "robot-research",
  galbot: "robot-logistics",
  "noetix-robotics": "robot-research",
  "boston-dynamics": "robot-industrial",
  "agility-robotics": "robot-logistics",
  "figure-ai": "robot-service",
  apptronik: "robot-industrial",
  "1x-technologies": "robot-service",
  "sanctuary-ai": "robot-industrial",
  "pal-robotics": "robot-research",
  "neura-robotics": "robot-industrial",
  "hexagon-robotics": "robot-industrial",
  wandercraft: "robot-industrial",
  zsibot: "robot-research",
  ubtech: "robot-industrial",
  agibot: "robot-research",
  "fourier-intelligence": "robot-research",
  "nvidia-robotics": "robot-simulation",
  "google-deepmind": "robot-simulation",
  "physical-intelligence": "robot-simulation",
  orbbec: "robot-perception",
  livox: "robot-perception",
  "d-robotics": "robot-edge",
  maxon: "robot-joint",
  faulhaber: "robot-joint",
  leaderdrive: "robot-joint",
  "harmonic-drive": "robot-joint",
  kinco: "robot-joint",
  "changxing-power": "robot-joint",
  "mech-mind": "robot-vision-cell",
  linkerbot: "dexterous-hand",
  "inspire-robots": "inspire",
  paxini: "tactile",
  "dh-robotics": "soft-hand",
  "shadow-robot": "dexterous-hand",
  "kunwei-technology": "force-torque",
  "xela-robotics": "tactile",
  gelsight: "tactile",
  "wonik-robotics": "dexterous-hand",
  tesollo: "dexterous-hand",
  qbrobotics: "soft-hand",
  schunk: "dexterous-hand",
  "seed-robotics": "soft-hand",
  psyonic: "soft-hand",
  "ati-industrial-automation": "force-torque",
  syntouch: "tactile",
  synapx: "tactile",
  "theo-hand": "dexterous-hand",
};

const defaults: Record<Exclude<IndustryId, "cross-industry">, VisualId> = {
  ai: "ai-workflow",
  robotics: "robot-research",
  "dexterous-hands": "dexterous-hand",
};

export const getCompanyProfileVisual = (slug: string, industry: IndustryId): CompanyVisual => {
  if (slug === 'anybotics') return anyboticsCompanyVisualPatch;
  const fallback = industry === "cross-industry" ? defaults.ai : defaults[industry];
  return visuals[assignments[slug] ?? fallback];
};
