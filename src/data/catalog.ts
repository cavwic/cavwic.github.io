import type { IndustryId } from "./content";

export type CompanyProfile = {
  slug: string;
  name: string;
  englishName: string;
  industry: IndustryId;
  positioning: string;
  products: string[];
  presalesQuestions: string[];
  sourceIds: string[];
  reviewedAt: string;
};

export const companies: CompanyProfile[] = [
  {
    slug: "langgenius",
    name: "LangGenius",
    englishName: "LangGenius",
    industry: "ai",
    positioning: "Dify 的开发团队，产品重点是生成式 AI 应用、工作流、知识库和插件扩展。",
    products: ["Dify Community", "Dify Cloud", "插件生态"],
    presalesQuestions: ["部署边界和版本差异是什么？", "知识权限是否能映射现有组织？", "日志、评测和人工接管如何闭环？"],
    sourceIds: ["ref-01", "ref-02", "ref-03", "ref-04", "ref-05"],
    reviewedAt: "2026-08-14",
  },
  {
    slug: "infiniflow",
    name: "InfiniFlow",
    englishName: "InfiniFlow",
    industry: "ai",
    positioning: "RAGFlow 的开发团队，公开产品强调文档解析、检索增强生成和可追溯引用。",
    products: ["RAGFlow"],
    presalesQuestions: ["复杂文档解析的失败样本是什么？", "召回、重排和生成如何分开评测？", "索引更新和权限过滤怎样实现？"],
    sourceIds: ["ref-07", "ref-08"],
    reviewedAt: "2026-08-14",
  },
  {
    slug: "labring",
    name: "Labring",
    englishName: "Labring",
    industry: "ai",
    positioning: "FastGPT 的开发团队，公开项目覆盖知识库、工作流、模型接入和应用发布。",
    products: ["FastGPT"],
    presalesQuestions: ["私有化部署依赖哪些基础设施？", "知识库质量如何被量化？", "工作流版本和回滚怎样管理？"],
    sourceIds: ["ref-09", "ref-10", "ref-11"],
    reviewedAt: "2026-08-14",
  },
  {
    slug: "ai-indeed",
    name: "实在智能",
    englishName: "AI Indeed",
    industry: "ai",
    positioning: "企业智能体与自动化厂商，公开方向包括屏幕语义理解、RPA 和业务流程执行。",
    products: ["实在 Agent", "数字员工", "自动化平台"],
    presalesQuestions: ["哪些步骤依赖界面自动化，哪些使用 API？", "异常和人工接管如何处理？", "流程变更后维护成本如何估算？"],
    sourceIds: ["ref-16", "job-03"],
    reviewedAt: "2026-08-14",
  },
  {
    slug: "booster-robotics",
    name: "加速进化",
    englishName: "Booster Robotics",
    industry: "robotics",
    positioning: "人形机器人与开发生态厂商，公开产品覆盖不同尺寸和定位的平台。",
    products: ["K1", "T1", "T2", "开发文档与开源资源"],
    presalesQuestions: ["目标任务所需载荷、续航和移动能力是什么？", "SDK 与控制频率是否满足闭环要求？", "维护、备件和现场安全责任如何划分？"],
    sourceIds: ["ref-17", "ref-18", "ref-19"],
    reviewedAt: "2026-08-14",
  },
  {
    slug: "galbot",
    name: "银河通用",
    englishName: "Galbot",
    industry: "robotics",
    positioning: "具身智能机器人厂商，公开材料包含 G1、开发平台和面向真实场景的产品方向。",
    products: ["G1", "S1", "开发平台"],
    presalesQuestions: ["本体、模型和场景系统之间怎样分工？", "任务失败如何恢复或转人工？", "部署需要哪些地图、网络和算力条件？"],
    sourceIds: ["ref-22", "ref-23", "ref-24", "job-06"],
    reviewedAt: "2026-08-14",
  },
  {
    slug: "noetix-robotics",
    name: "松延动力",
    englishName: "Noetix Robotics",
    industry: "robotics",
    positioning: "人形机器人厂商，公开产品包括 Bumi、N2 和 E1 等平台。",
    products: ["Bumi", "N2", "E1"],
    presalesQuestions: ["产品定位是科研、展示还是任务执行？", "二次开发开放到哪一层？", "连续运行和故障维护数据是否公开？"],
    sourceIds: ["ref-25", "ref-26"],
    reviewedAt: "2026-08-14",
  },
  {
    slug: "zsibot",
    name: "智身科技",
    englishName: "Zsibot",
    industry: "robotics",
    positioning: "具身智能机器人与相关技术平台厂商，网站公开公司和产品方向。",
    products: ["具身机器人平台", "Genisom 相关技术"],
    presalesQuestions: ["公开演示对应的现场前提是什么？", "控制、感知和任务应用分别开放哪些接口？", "POC 的验收指标能否按场景拆解？"],
    sourceIds: ["ref-27", "ref-28"],
    reviewedAt: "2026-08-14",
  },
  {
    slug: "linkerbot",
    name: "灵心巧手",
    englishName: "Linkerbot",
    industry: "dexterous-hands",
    positioning: "灵巧手产品与开发支持厂商，公开产品覆盖不同自由度、尺寸和触觉配置。",
    products: ["Linker Hand 系列", "L20"],
    presalesQuestions: ["自由度与驱动数分别是多少？", "触觉数据的采样、标定和接口是什么？", "额定负载和连续工况如何定义？"],
    sourceIds: ["ref-29", "ref-30", "ref-31", "ref-32"],
    reviewedAt: "2026-08-14",
  },
  {
    slug: "inspire-robots",
    name: "因时机器人",
    englishName: "Inspire Robots",
    industry: "dexterous-hands",
    positioning: "微型伺服执行器与灵巧手厂商，公开手册提供安装、通讯和部分控制信息。",
    products: ["RH56BFX 系列", "触觉灵巧手"],
    presalesQuestions: ["控制协议和刷新率能否覆盖目标任务？", "末端安装和电气接口如何适配？", "碰撞、过载和温升保护怎样验证？"],
    sourceIds: ["ref-33", "ref-34"],
    reviewedAt: "2026-08-14",
  },
  {
    slug: "paxini",
    name: "帕西尼",
    englishName: "PaXini",
    industry: "dexterous-hands",
    positioning: "触觉传感与灵巧操作厂商，公开产品同时覆盖多维触觉传感器和灵巧手。",
    products: ["DEX Gen2", "DEX Gen3", "AX Gen3"],
    presalesQuestions: ["触觉传感器的量程、分辨率和漂移如何定义？", "手指触觉覆盖区域怎样映射任务？", "原始数据、特征数据和控制接口各开放什么？"],
    sourceIds: ["ref-35", "ref-36", "ref-37", "ref-38"],
    reviewedAt: "2026-08-14",
  },
  {
    slug: "theo-hand",
    name: "万拿机器人",
    englishName: "Theo Hand",
    industry: "dexterous-hands",
    positioning: "灵巧手厂商，公开页面展示代表产品和面向具身操作的定位。",
    products: ["Theo Hand"],
    presalesQuestions: ["可重复抓取能力如何测试？", "维护耗材和更换周期是否公开？", "与机械臂和遥操作系统怎样集成？"],
    sourceIds: ["ref-39"],
    reviewedAt: "2026-08-14",
  },
  {
    slug: "dh-robotics",
    name: "大寰机器人",
    englishName: "DH-Robotics",
    industry: "dexterous-hands",
    positioning: "机器人末端执行器厂商，产品目录覆盖夹爪、旋转执行器和灵巧手。",
    products: ["灵巧手", "电动夹爪", "旋转执行器"],
    presalesQuestions: ["为什么必须使用灵巧手而不是夹爪？", "抓取对象和节拍是否能被更简单的末端完成？", "接口、安装、寿命和维护成本怎样比较？"],
    sourceIds: ["ref-40"],
    reviewedAt: "2026-08-14",
  },
];

export type MatrixRow = {
  product: string;
  company: string;
  type: string;
  openness: string;
  integration: string;
  verificationFocus: string;
  sourceIds: string[];
};

export type ProductMatrix = {
  slug: string;
  title: string;
  description: string;
  industry: IndustryId;
  dimensions: string[];
  rows: MatrixRow[];
};

export const matrices: ProductMatrix[] = [
  {
    slug: "enterprise-ai-platforms",
    title: "企业 AI 应用平台对比矩阵",
    description: "按知识处理、编排、扩展、部署与评测路径比较，不给脱离场景的总排名。",
    industry: "ai",
    dimensions: ["应用定位", "知识处理", "工作流与 Agent", "扩展与接口", "部署与运维", "评测与审计"],
    rows: [
      { product: "Dify", company: "LangGenius", type: "LLM 应用与工作流平台", openness: "开源项目；云服务与社区版边界需按版本核验", integration: "API、插件、模型与外部工具", verificationFocus: "权限映射、检索评测、日志和版本治理", sourceIds: ["ref-01", "ref-02", "ref-04", "ref-05"] },
      { product: "RAGFlow", company: "InfiniFlow", type: "以文档解析和 RAG 为重点的平台", openness: "开源项目；功能以当前文档为准", integration: "API、模型、解析和检索组件", verificationFocus: "复杂文档解析、召回与引用一致性", sourceIds: ["ref-07", "ref-08"] },
      { product: "FastGPT", company: "Labring", type: "知识库与工作流应用平台", openness: "开源项目；版本能力需逐项核验", integration: "模型、知识库、工作流和 API", verificationFocus: "部署依赖、工作流维护和索引更新", sourceIds: ["ref-09", "ref-10", "ref-11"] },
      { product: "Coze Studio", company: "Coze", type: "Agent 与应用开发平台", openness: "开源项目；服务能力与开源版本分开核验", integration: "API、插件、Chat SDK", verificationFocus: "插件权限、运行日志与部署边界", sourceIds: ["ref-12", "ref-13", "ref-14", "ref-15"] },
    ],
  },
  {
    slug: "embodied-robot-platforms",
    title: "具身机器人平台对比矩阵",
    description: "先区分科研、教育、展示和任务执行，再比较本体、开发开放度、现场依赖和服务条件。",
    industry: "robotics",
    dimensions: ["产品定位", "本体形态", "开发开放度", "任务适配", "现场依赖", "服务与维护"],
    rows: [
      { product: "K1", company: "加速进化", type: "人形机器人平台", openness: "有开发文档与公开资源；具体接口按版本核验", integration: "SDK、控制与训练资源", verificationFocus: "目标任务、控制接口、续航和维护", sourceIds: ["ref-17", "ref-18", "ref-19", "ref-21"] },
      { product: "T1", company: "加速进化", type: "人形机器人平台", openness: "公开资料可查；完整接口范围需询证", integration: "未公开字段写未公开", verificationFocus: "定位、尺寸、开放度与任务边界", sourceIds: ["ref-17", "ref-19"] },
      { product: "T2", company: "加速进化", type: "人形机器人平台", openness: "公开资料可查；完整接口范围需询证", integration: "未公开字段写未公开", verificationFocus: "运动能力、安全和二次开发", sourceIds: ["ref-17", "ref-19"] },
      { product: "G1", company: "银河通用", type: "具身机器人平台", openness: "提供开发文档入口", integration: "开发平台与 G1 文档", verificationFocus: "场景数据、任务闭环、接口和故障恢复", sourceIds: ["ref-22", "ref-23", "ref-24"] },
      { product: "S1", company: "银河通用", type: "具身机器人产品", openness: "公开字段有限", integration: "未公开", verificationFocus: "场景定位、交付条件和可持续运行", sourceIds: ["ref-22"] },
      { product: "Bumi", company: "松延动力", type: "人形机器人产品", openness: "以官网当前公开信息为准", integration: "未公开", verificationFocus: "用途定位、二次开发和运行边界", sourceIds: ["ref-25"] },
      { product: "N2", company: "松延动力", type: "人形机器人产品", openness: "有独立产品页", integration: "未公开字段需询证", verificationFocus: "规格、接口、连续运行和售后", sourceIds: ["ref-25", "ref-26"] },
      { product: "E1", company: "松延动力", type: "人形机器人产品", openness: "以官网当前公开信息为准", integration: "未公开", verificationFocus: "用途定位、控制开放度和维护", sourceIds: ["ref-25"] },
    ],
  },
  {
    slug: "dexterous-hand-selection",
    title: "灵巧手选型与验证矩阵",
    description: "自由度只是入口；真正影响交付的是驱动、触觉、接口、负载定义、耐久性和目标抓取集合。",
    industry: "dexterous-hands",
    dimensions: ["机构与驱动", "自由度与驱动数", "触觉配置", "控制与接口", "负载口径", "耐久与维护"],
    rows: [
      { product: "Linker Hand 代表型号", company: "灵心巧手", type: "多指灵巧手", openness: "产品、FAQ、支持文档和数据表", integration: "按具体型号核对通讯与 SDK", verificationFocus: "触觉覆盖、控制频率、温升和寿命", sourceIds: ["ref-29", "ref-30", "ref-31", "ref-32"] },
      { product: "RH56BFX 系列", company: "因时机器人", type: "多指灵巧手", openness: "产品页与用户手册", integration: "按手册核对安装、通讯和控制", verificationFocus: "接口、电气、过载保护和重复性", sourceIds: ["ref-33", "ref-34"] },
      { product: "DEX 系列", company: "帕西尼", type: "触觉灵巧手", openness: "产品页公开；具体版本逐项核验", integration: "触觉与控制接口需按型号核对", verificationFocus: "量程、分辨率、漂移、标定和抓取", sourceIds: ["ref-35", "ref-36", "ref-37", "ref-38"] },
      { product: "Theo Hand", company: "万拿机器人", type: "多指灵巧手", openness: "产品页公开；部分字段未公开", integration: "未公开字段需询证", verificationFocus: "重复抓取、接口、耗材和维护", sourceIds: ["ref-39"] },
      { product: "灵巧手产品", company: "大寰机器人", type: "末端执行器", openness: "产品目录公开；具体型号按当前目录核验", integration: "与夹爪、旋转执行器一并评估", verificationFocus: "任务必要性、节拍、寿命和总体成本", sourceIds: ["ref-40"] },
    ],
  },
];
