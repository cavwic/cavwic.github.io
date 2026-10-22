import type { IndustryId } from "../content";
import type { Locale } from "../site";

export type FinderCategory = "robot-platform" | "end-effector" | "perception" | "motion" | "model-software" | "enterprise-ai";
export type FinderUseCase = "research" | "manufacturing" | "logistics" | "service" | "integration";
export type FinderOpenness = "open" | "documented" | "confirm";

export type FinderSpecificationCoverage =
  | "official-complete"
  | "official-partial"
  | "family-summary"
  | "capability-only"
  | "source-blocked";

export type FinderParameterMetric =
  | "payloadKg"
  | "massKg"
  | "torqueNm"
  | "forceN"
  | "reachMm"
  | "heightMm"
  | "dimensionsMm"
  | "travelMm"
  | "gripRangeMm"
  | "speedMps"
  | "speedRpm"
  | "angularSpeedRadps"
  | "flowLpm"
  | "pressureBar"
  | "vacuumPercent"
  | "durationS"
  | "noiseDb"
  | "cycleLife"
  | "ipRating"
  | "angleDeg"
  | "humidityPercent"
  | "enduranceH"
  | "dof"
  | "axes"
  | "voltageV"
  | "currentA"
  | "powerW"
  | "capacityAh"
  | "energyWh"
  | "samplingHz"
  | "frequencyHz"
  | "accuracyMm"
  | "resolutionMm"
  | "reductionRatio"
  | "temperatureC"
  | "genericNumber";

export type FinderNormalizedParameter = {
  metric: FinderParameterMetric;
  unit: string;
  values: number[];
  min: number;
  max: number;
  relation: "point" | "range" | "maximum" | "minimum" | "approximate" | "list";
  sourceLabel: string;
};

export type FinderParameter = {
  label: string;
  labelAliases?: string[];
  value: string;
  status: "manufacturer" | "unknown";
  sourceUrl?: string;
  sourceLabel?: string;
  sourceLocator?: string;
  conditions?: string;
  normalized?: FinderNormalizedParameter[];
};

export type FinderEvidence = {
  level: "model" | "family" | "platform";
  specificationKind?: "parameters" | "capabilities";
  specificationCoverage?: FinderSpecificationCoverage;
  specificationCoverageNote?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageSourceUrl?: string;
  imageCredit?: string;
  overview: string[];
  highlights?: Array<{ title: string; detail: string }>;
  variants?: Array<{ series: string; model: string; form: string; dimensions: string }>;
  applications: string[];
  disclosureBoundary: string;
  sourceLinks: Array<{ label: string; url: string }>;
  companyTimeline?: Array<{ date: string; title: string; detail: string; sourceUrl: string; kind?: "founding" | "product" | "funding" | "business" }>;
  fundingRounds?: Array<{ date: string; round: string; amount: string; investors: string; sourceUrl: string }>;
  investmentView?: string[];
};

export type FinderExpansionRecord = {
  id: string;
  matrixSlug: string;
  matrixTitle: string;
  industry: IndustryId;
  reviewedAt: string;
  product: string;
  company: string;
  type: string;
  openness: string;
  integration: string;
  verificationFocus: string;
  sourceIds: string[];
  officialUrl: string;
  category: FinderCategory;
  useCases: FinderUseCase[];
  opennessLevel: FinderOpenness;
  parameters: FinderParameter[];
  catalogPrimary?: string;
  catalogSubclass?: string;
  catalogCoverage?: "family-complete" | "model-partial" | "pending-review";
  catalogScope?: string;
  evidence?: FinderEvidence;
  profile: {
    slug: string;
    valueChainRole: string;
    positioning: string;
    strengths: string[];
    products: string[];
    fit: string[];
    questions: string[];
    sourceIds: string[];
    reviewedAt: string;
    legalName?: string;
    country?: string;
    headquarters?: string;
    founded?: string;
    officialUrl?: string;
    overview?: string[];
    businessAreas?: string[];
    customerGroups?: string[];
    milestones?: Array<{ date: string; event: string }>;
    catalogScope?: string;
    catalogCoverage?: "family-complete" | "model-partial" | "pending-review";
  };
};

type Text = { zh: string; en: string };
const t = (locale: Locale, value: Text) => value[locale];
const text = (zh: string, en: string): Text => ({ zh, en });
const unknown = (locale: Locale) => locale === "zh" ? "待补充" : "Pending";

const parameter = (locale: Locale, label: Text, value?: Text): FinderParameter => ({
  label: t(locale, label),
  value: value ? t(locale, value) : unknown(locale),
  status: value ? "manufacturer" : "unknown",
});

type Seed = {
  id: string;
  company: string;
  companyEn?: string;
  profileSlug?: string;
  product: string;
  industry: IndustryId;
  category: FinderCategory;
  type: Text;
  role: Text;
  positioning: Text;
  openness: Text;
  integration: Text;
  verification: Text;
  fit: Text[];
  useCases: FinderUseCase[];
  opennessLevel: FinderOpenness;
  officialUrl: string;
  parameters: Array<{ label: Text; value?: Text }>;
};

const seeds: Seed[] = [
  {
    id: "exp-ubtech-uworld-u1", company: "优必选", companyEn: "UBTECH Robotics", profileSlug: "ubtech", product: "UWORLD U1", industry: "robotics", category: "robot-platform",
    type: text("超仿生人形机器人", "Lifelike humanoid robot"), role: text("人形机器人与智能服务机器人厂商", "Humanoid and smart-service robot company"),
    positioning: text("优必选官网在 2026 年发展历程中将 UWORLD U1 列为超仿生人形机器人。当前公开入口可确认产品定位，但不足以支持型号级性能比较。", "UBTECH's official 2026 milestone identifies UWORLD U1 as a lifelike humanoid robot. The current public entry establishes its positioning but is not yet sufficient for model-level performance comparison."),
    openness: text("官网已公开产品发布信息；详细规格和开发接口未在当前页面披露", "The official site has announced the product; detailed specifications and developer interfaces are not disclosed on the current page"),
    integration: text("面向人物化交互与服务体验，具体感知、表情、内容和本体接口待正式资料确认", "Targets character-like interaction and service experiences; perception, expression, content, and body interfaces require formal documentation"),
    verification: text("核对可交付版本、面部与全身自由度、仿生皮肤维护、交互延迟、隐私处理、内容授权与量产状态", "Verify the deliverable edition, facial and full-body DoF, bionic-skin service, interaction latency, privacy handling, content rights, and production status"),
    fit: [text("展陈、接待和角色化服务交互", "Exhibition, reception, and character-based service interaction")],
    useCases: ["service", "research"], opennessLevel: "confirm", officialUrl: "https://www.ubtrobot.com/cn/about/company-profile",
    parameters: [
      { label: text("产品形态", "Form"), value: text("超仿生人形机器人", "Lifelike humanoid robot") },
      { label: text("发布状态", "Release status"), value: text("2026 年官网发展历程列出", "Listed in the official 2026 milestone") },
      { label: text("面部自由度", "Facial DoF") },
      { label: text("全身自由度", "Full-body DoF") },
      { label: text("尺寸与质量", "Dimensions and mass") },
      { label: text("续航与接口", "Endurance and interfaces") },
    ],
  },
  {
    id: "exp-unitree-h2", company: "宇树科技", companyEn: "Unitree Robotics", profileSlug: "unitree", product: "H2", industry: "robotics", category: "robot-platform",
    type: text("全尺寸通用人形机器人", "Full-size general-purpose humanoid"), role: text("通用人形与四足机器人厂商", "Humanoid and quadruped robot manufacturer"),
    positioning: text("H2 是宇树的 180 cm 级全尺寸人形平台，标准版与 EDU 版在开发计算和二次开发权限上存在差异。", "H2 is Unitree's 180 cm-class full-size humanoid platform. The standard and EDU editions differ in development compute and secondary-development access."),
    openness: text("产品参数公开；H2 EDU 支持二次开发", "Product specifications are public; H2 EDU supports secondary development"),
    integration: text("双目视觉、语音、可选高算力模组与灵巧手", "Binocular vision, voice interaction, optional high-compute modules, and dexterous hands"),
    verification: text("版本、开发权限、负载工况、续航、安全距离和交付配置需逐项确认", "Confirm edition, development access, payload conditions, endurance, safety distance, and delivery configuration"),
    fit: [text("全尺寸人形机器人开发", "Full-size humanoid development"), text("科研与任务验证", "Research and task validation")],
    useCases: ["research", "manufacturing", "integration"], opennessLevel: "documented", officialUrl: "https://www.unitree.com/cn/H2/",
    parameters: [
      { label: text("站立高度", "Standing height"), value: text("1820 mm", "1820 mm") }, { label: text("整机质量", "Mass"), value: text("约 70 kg", "About 70 kg") },
      { label: text("自由度", "DoF"), value: text("31", "31") }, { label: text("手臂最大关节峰值扭矩", "Maximum arm-joint peak torque"), value: text("120 N·m", "120 N·m") },
      { label: text("厂商续航口径", "Published endurance"), value: text("约 3 h", "About 3 h") }, { label: text("额定手臂负载", "Rated arm payload"), value: text("约 7 kg", "About 7 kg") },
    ],
  },
  {
    id: "exp-unitree-h1", company: "宇树科技", companyEn: "Unitree Robotics", profileSlug: "unitree", product: "H1 / H1-2", industry: "robotics", category: "robot-platform",
    type: text("全尺寸通用人形机器人", "Full-size general-purpose humanoid"), role: text("通用人形与四足机器人厂商", "Humanoid and quadruped robot manufacturer"),
    positioning: text("H1 系列强调高动态运动，H1-2 增加更完整的上肢、腰部和可选灵巧手配置。", "The H1 family emphasizes dynamic locomotion, while H1-2 adds a fuller upper-body and waist configuration with optional dexterous hands."),
    openness: text("产品参数与开发资料公开；配置和接口按型号核对", "Product specifications and development material are public; verify configuration and interfaces by model"),
    integration: text("3D 激光雷达、深度相机、用户开发计算与可选灵巧手", "3D LiDAR, depth camera, user-development compute, and optional dexterous hands"),
    verification: text("H1 与 H1-2 不应合并比较，需分别核对自由度、负载、速度和手部配置", "H1 and H1-2 should be checked separately for DoF, payload, speed, and hand configuration"),
    fit: [text("高动态运动研究", "Dynamic-locomotion research"), text("全尺寸人形开发", "Full-size humanoid development")],
    useCases: ["research", "manufacturing", "integration"], opennessLevel: "documented", officialUrl: "https://www.unitree.com/h1/",
    parameters: [
      { label: text("高度", "Height"), value: text("H1 约 180 cm；H1-2 约 178 cm", "H1 about 180 cm; H1-2 about 178 cm") },
      { label: text("整机质量", "Mass"), value: text("H1 约 47 kg；H1-2 约 70 kg", "H1 about 47 kg; H1-2 about 70 kg") },
      { label: text("移动速度", "Travel speed"), value: text("H1 3.3 m/s；H1-2 <2 m/s", "H1 3.3 m/s; H1-2 <2 m/s") },
      { label: text("电池容量", "Battery capacity"), value: text("0.864 kWh", "0.864 kWh") }, { label: text("最大关节扭矩", "Maximum joint torque"), value: text("360 N·m", "360 N·m") },
      { label: text("H1-2 自由度", "H1-2 DoF"), value: text("27", "27") },
    ],
  },
  {
    id: "exp-unitree-g1", company: "宇树科技", companyEn: "Unitree Robotics", profileSlug: "unitree", product: "G1", industry: "robotics", category: "robot-platform",
    type: text("中型人形机器人开发平台", "Mid-size humanoid development platform"), role: text("通用人形与四足机器人厂商", "Humanoid and quadruped robot manufacturer"),
    positioning: text("G1 提供标准版与 EDU 版，后者扩展关节、计算和二次开发配置。", "G1 is offered in standard and EDU editions, with the EDU edition extending joints, compute, and secondary-development options."),
    openness: text("产品页、SDK 与开源资源可查；标准版与 EDU 版权限不同", "Product pages, SDKs, and open resources are public; the standard and EDU editions have different access"),
    integration: text("深度相机、3D 激光雷达、开发计算与可选 Dex3-1 灵巧手", "Depth camera, 3D LiDAR, development compute, and optional Dex3-1 hand"),
    verification: text("版本、关节数、最大负载、控制权限和可选手部必须在采购前锁定", "Lock the edition, joint count, maximum payload, control access, and optional hand before procurement"),
    fit: [text("人形机器人算法与运控开发", "Humanoid algorithm and locomotion development"), text("教育与科研", "Education and research")],
    useCases: ["research", "integration"], opennessLevel: "open", officialUrl: "https://www.unitree.com/cn/g1/",
    parameters: [
      { label: text("站立高度", "Standing height"), value: text("1320 mm", "1320 mm") }, { label: text("整机质量", "Mass"), value: text("约 35 kg", "About 35 kg") },
      { label: text("自由度", "DoF"), value: text("23–43", "23–43") }, { label: text("膝关节最大扭矩", "Maximum knee torque"), value: text("90–120 N·m", "90–120 N·m") },
      { label: text("厂商续航口径", "Published endurance"), value: text("约 2 h", "About 2 h") }, { label: text("感知", "Perception"), value: text("深度相机 + 3D 激光雷达", "Depth camera + 3D LiDAR") },
    ],
  },
  {
    id: "exp-unitree-r1", company: "宇树科技", companyEn: "Unitree Robotics", profileSlug: "unitree", product: "R1", industry: "robotics", category: "robot-platform",
    type: text("轻量级人形机器人", "Lightweight humanoid robot"), role: text("通用人形与四足机器人厂商", "Humanoid and quadruped robot manufacturer"),
    positioning: text("R1 提供 AIR、标准版与 EDU 版，重点是轻量化、基础交互和开发入门。", "R1 is offered in AIR, standard, and EDU editions, emphasizing low mass, basic interaction, and accessible development."),
    openness: text("关节和传感器控制接口以 EDU 版为主；版本差异公开", "Joint and sensor control access is centered on the EDU edition; edition differences are published"),
    integration: text("相机、麦克风、扬声器、可选高算力模组与灵巧手", "Camera, microphones, speaker, optional high-compute module, and dexterous hand"),
    verification: text("AIR、标准版和 EDU 版的开发权限、自由度、感知与手部选件不能混用", "Do not mix development access, DoF, perception, and hand options across AIR, standard, and EDU editions"),
    fit: [text("人形机器人入门开发", "Entry-level humanoid development"), text("教学、交互与轻量实验", "Education, interaction, and lightweight experiments")],
    useCases: ["research", "service", "integration"], opennessLevel: "documented", officialUrl: "https://www.unitree.com/cn/R1/",
    parameters: [
      { label: text("站立高度", "Standing height"), value: text("1230 mm", "1230 mm") }, { label: text("整机质量", "Mass"), value: text("约 27–29 kg", "About 27–29 kg") },
      { label: text("自由度", "DoF"), value: text("20–40（按版本）", "20–40 depending on edition") }, { label: text("手臂最大负载", "Maximum arm payload"), value: text("约 2 kg", "About 2 kg") },
      { label: text("厂商续航口径", "Published endurance"), value: text("约 1 h", "About 1 h") }, { label: text("二次开发", "Secondary development"), value: text("R1 EDU 支持", "Supported on R1 EDU") },
    ],
  },
  {
    id: "exp-kepler-k2", company: "Kepler", product: "Forerunner K2", industry: "robotics", category: "robot-platform",
    type: text("全尺寸通用人形机器人", "Full-size general-purpose humanoid"),
    role: text("工业人形机器人本体厂商", "Industrial humanoid robot manufacturer"),
    positioning: text("K2 提供基础版、双足开发版和轮式开发版，面向制造、仓储与科研开发。", "K2 is offered in basic, biped development, and wheeled development configurations for manufacturing, warehousing, and research."),
    openness: text("开发版支持二次开发；具体接口以版本配置表为准", "Development editions support secondary development; interfaces depend on the selected configuration"),
    integration: text("本体、灵巧手、六维力、视觉与开发平台", "Body, dexterous hands, six-axis force sensing, vision, and development platform"),
    verification: text("载荷口径、8 小时续航工况、接口权限与工业版交付边界", "Payload definition, conditions behind the eight-hour endurance claim, interface permissions, and industrial-edition delivery scope"),
    fit: [text("制造与仓储任务", "Manufacturing and warehouse tasks"), text("人形机器人科研", "Humanoid robotics research")],
    useCases: ["research", "manufacturing", "logistics"], opennessLevel: "documented", officialUrl: "https://www.gotokepler.com/productDetailK2?id=2",
    parameters: [
      { label: text("身高", "Height"), value: text("175 cm", "175 cm") },
      { label: text("整机质量", "Mass"), value: text("75 kg（双足开发版）", "75 kg (biped development edition)") },
      { label: text("全身自由度", "Full-body DoF"), value: text("52（开发版）", "52 (development editions)") },
      { label: text("计算平台", "Compute"), value: text("100 TOPS", "100 TOPS") },
      { label: text("厂商续航口径", "Published endurance"), value: text("8 h", "8 h") },
      { label: text("双臂协同搬运", "Dual-arm handling"), value: text("25–30 kg", "25–30 kg") },
    ],
  },
  {
    id: "exp-engineai-pm01", company: "ENGINEAI", product: "PM01", industry: "robotics", category: "robot-platform",
    type: text("轻量级开放式人形机器人", "Lightweight open humanoid robot"),
    role: text("高动态人形机器人本体厂商", "High-dynamic humanoid robot manufacturer"),
    positioning: text("PM01 面向开发者和科研人员，强调高动态运动与运控代码开放。", "PM01 targets developers and researchers, emphasizing dynamic motion and access to locomotion code."),
    openness: text("厂商公开运控训练与部署代码范围，具体仓库和许可证需按版本确认", "The vendor publishes the scope of locomotion training and deployment code; repositories and licenses require version checks"),
    integration: text("Intel N97、Jetson Orin、运动控制与二次开发", "Intel N97, Jetson Orin, locomotion control, and secondary development"),
    verification: text("开放代码范围、跌倒保护、关节热负载与连续运行边界", "Code-release scope, fall protection, joint thermal load, and continuous-duty limits"),
    fit: [text("运控与强化学习研究", "Locomotion and reinforcement-learning research"), text("高动态本体验证", "Dynamic body validation")],
    useCases: ["research", "integration"], opennessLevel: "open", officialUrl: "https://en.engineai.com.cn/product-pm01",
    parameters: [
      { label: text("全身自由度", "Full-body DoF"), value: text("≥23", "≥23") },
      { label: text("腰部旋转", "Waist rotation"), value: text("320°", "320°") },
      { label: text("关节峰值扭矩", "Peak joint torque"), value: text("130 N·m", "130 N·m") },
      { label: text("板载计算", "Onboard compute"), value: text("Intel N97 + Jetson Orin", "Intel N97 + Jetson Orin") },
      { label: text("整机质量", "Mass") },
      { label: text("续航", "Endurance") },
    ],
  },
  {
    id: "exp-robotera-l7", company: "RobotEra", product: "L7", industry: "robotics", category: "robot-platform",
    type: text("全尺寸双足人形机器人", "Full-size biped humanoid"), role: text("具身本体、灵巧手与模型全栈厂商", "Integrated body, dexterous-hand, and embodied-model vendor"),
    positioning: text("L7 位于 RobotEra 全尺寸双足产品线，面向科研、制造与服务场景。", "L7 is RobotEra's full-size biped platform for research, manufacturing, and service scenarios."),
    openness: text("产品资料与下载中心公开；SDK 和交付接口按版本确认", "Product material and a download center are public; SDK and delivery interfaces require version confirmation"),
    integration: text("本体、XHAND、ERA-42 与数据训练链路", "Body, XHAND, ERA-42, and the data-training workflow"),
    verification: text("官网身高字段存在单位显示异常，本小样不采用该数值；需以正式规格书复核", "The website currently displays an inconsistent unit for height, so this demo omits that value pending a formal datasheet"),
    fit: [text("具身数据采集", "Embodied data collection"), text("制造与服务任务", "Manufacturing and service tasks")], useCases: ["research", "manufacturing", "service"], opennessLevel: "documented", officialUrl: "https://www.robotera.com/en/goods1/4.html",
    parameters: [
      { label: text("全身自由度", "Full-body DoF"), value: text("55", "55") },
      { label: text("双臂载荷", "Dual-arm payload"), value: text("20 kg", "20 kg") },
      { label: text("身高", "Height") }, { label: text("整机质量", "Mass") }, { label: text("续航", "Endurance") }, { label: text("移动速度", "Travel speed") },
    ],
  },
  ...[
    ["q5", "Q5", text("轮式人形与移动操作平台", "Wheeled humanoid and mobile-manipulation platform")],
    ["m7", "M7", text("具身数据采集与训练平台", "Embodied data-collection and training platform")],
  ].map(([id, product, typeValue]) => ({
    id: `exp-robotera-${id}`, company: "RobotEra", product: product as string, industry: "robotics" as const, category: "robot-platform" as const,
    type: typeValue as Text, role: text("具身本体、灵巧手与模型全栈厂商", "Integrated body, dexterous-hand, and embodied-model vendor"),
    positioning: text("RobotEra 产品线中的具身机器人平台，正式选型需锁定型号规格书与软件版本。", "An embodied robot platform in the RobotEra line; formal selection requires a model datasheet and software-version lock."),
    openness: text("官网列出产品与下载入口，型号级接口待资料核验", "The official site lists the product and download entry points; model-level interfaces require document review"),
    integration: text("ERA-42、XHAND、数据采集与训练链路", "ERA-42, XHAND, data collection, and training workflow"),
    verification: text("本体尺寸、负载、续航、自由度和接口均需以型号手册补齐", "Dimensions, payload, endurance, DoF, and interfaces require the model manual"),
    fit: [text("具身数据与模型研究", "Embodied data and model research")], useCases: ["research", "integration"] as FinderUseCase[], opennessLevel: "confirm" as const, officialUrl: "https://www.robotera.com/en/",
    parameters: [{ label: text("全身自由度", "Full-body DoF") }, { label: text("身高", "Height") }, { label: text("整机质量", "Mass") }, { label: text("负载", "Payload") }, { label: text("续航", "Endurance") }, { label: text("计算平台", "Compute") }],
  })),
  {
    id: "exp-robotera-xhand1", company: "RobotEra", product: "XHAND 1", industry: "dexterous-hands", category: "end-effector",
    type: text("全驱五指灵巧手", "Fully actuated five-finger dexterous hand"), role: text("具身本体、灵巧手与模型全栈厂商", "Integrated body, dexterous-hand, and embodied-model vendor"),
    positioning: text("XHAND 1 面向人形本体、机械臂、遥操作和模仿学习。", "XHAND 1 targets humanoids, robot arms, teleoperation, and imitation learning."),
    openness: text("提供 Linux SDK 与 ROS 兼容应用", "Linux SDK and ROS-compatible applications are available"), integration: text("VR、动捕手套、人形机器人和机械臂", "VR, motion-capture gloves, humanoids, and robot arms"),
    verification: text("整手与指尖载荷口径、触觉选配、重复精度和耐久仍需样机验收", "Whole-hand versus fingertip load definitions, tactile options, repeatability, and endurance require sample validation"),
    fit: [text("遥操作与数采", "Teleoperation and data collection"), text("灵巧操作研究", "Dexterous manipulation research")], useCases: ["research", "integration", "manufacturing"], opennessLevel: "documented", officialUrl: "https://www.robotera.com/upload/goods/20241208/2ab64afaae0098db948e9d4063951c28.pdf",
    parameters: [
      { label: text("主动自由度", "Actuated DoF"), value: text("12", "12") }, { label: text("质量", "Mass"), value: text("1.1 kg", "1.1 kg") },
      { label: text("指尖力", "Fingertip force"), value: text("15 N", "15 N") }, { label: text("整手握力", "Whole-hand grip force"), value: text("80 N", "80 N") },
      { label: text("指尖载荷", "Fingertip payload"), value: text("5 kg", "5 kg") }, { label: text("整手载荷", "Whole-hand payload"), value: text("25 kg", "25 kg") },
    ],
  },
  ...[
    ["xhand1-lite", "XHAND 1 Lite"], ["xhand1-pro", "XHAND 1 Pro"],
  ].map(([id, product]) => ({
    id: `exp-robotera-${id}`, company: "RobotEra", product, industry: "dexterous-hands" as const, category: "end-effector" as const,
    type: text("五指灵巧手产品线", "Five-finger dexterous-hand product line"), role: text("具身本体、灵巧手与模型全栈厂商", "Integrated body, dexterous-hand, and embodied-model vendor"),
    positioning: text("XHAND 系列成员；当前小样先建立参数槽位，版本差异等待正式规格资料补齐。", "A member of the XHAND family; this demo establishes the parameter slots while version differences await formal specifications."),
    openness: text("官网列出产品，型号级 SDK 与接口待核验", "The official site lists the product; model-level SDK and interfaces require verification"),
    integration: text("人形本体、机械臂与数据采集", "Humanoid bodies, robot arms, and data collection"), verification: text("自由度、质量、力、触觉、寿命和交付版本逐项核验", "Verify DoF, mass, force, tactile sensing, life, and delivery version"),
    fit: [text("灵巧操作与数据采集", "Dexterous manipulation and data collection")], useCases: ["research", "integration"] as FinderUseCase[], opennessLevel: "confirm" as const, officialUrl: "https://www.robotera.com/en/",
    parameters: [{ label: text("主动自由度", "Actuated DoF") }, { label: text("质量", "Mass") }, { label: text("指尖力", "Fingertip force") }, { label: text("整手握力", "Whole-hand grip force") }, { label: text("触觉配置", "Tactile sensing") }, { label: text("控制接口", "Control interface") }],
  })),
  ...[
    ["oli", "Oli", text("全尺寸通用人形机器人", "Full-size general-purpose humanoid"), ["research", "manufacturing", "service"] as FinderUseCase[], [text("身高", "Height"), text("165 cm", "165 cm")], [text("机身自由度", "Body DoF"), text("31（不含末端）", "31 (excluding end effectors)")]],
    ["luna", "Luna", text("全尺寸交互人形机器人", "Full-size interactive humanoid"), ["service", "research"] as FinderUseCase[], [text("全身自由度", "Full-body DoF"), text("27", "27")], null],
    ["tron1", "TRON 1", text("多形态双足机器人", "Multi-modal biped robot"), ["research", "integration"] as FinderUseCase[], null, null],
    ["tron2", "TRON 2", text("多形态具身机器人", "Multi-form embodied robot"), ["research", "integration", "service"] as FinderUseCase[], null, null],
  ].map(([id, product, typeValue, useCases, knownA, knownB]) => ({
    id: `exp-limx-${id}`, company: "LimX Dynamics", product: product as string, industry: "robotics" as const, category: "robot-platform" as const,
    type: typeValue as Text, role: text("运动智能与具身机器人平台厂商", "Locomotion-intelligence and embodied-robot platform vendor"),
    positioning: text("产品线覆盖全尺寸人形、多形态双足平台和具身软件工具。", "The product line spans full-size humanoids, multi-form biped platforms, and embodied software tools."),
    openness: text("公开用户手册、SDK 指南与训练部署资料，具体范围按版本核验", "User manuals, SDK guides, and training/deployment material are public; scope depends on version"),
    integration: text("SDK、Isaac Lab / Gym、扩展套件与具身软件", "SDKs, Isaac Lab/Gym, expansion kits, and embodied software"),
    verification: text("版本配置、外设、负载、续航和现场任务能力需按型号锁定", "Lock version configuration, peripherals, payload, endurance, and field-task capability by model"),
    fit: [text("机器人科研与应用开发", "Robotics research and application development")], useCases: useCases as FinderUseCase[], opennessLevel: "open" as const, officialUrl: "https://www.limxdynamics.com/en/documents",
    parameters: [
      knownA ? { label: (knownA as Text[])[0], value: (knownA as Text[])[1] } : { label: text("全身自由度", "Full-body DoF") },
      knownB ? { label: (knownB as Text[])[0], value: (knownB as Text[])[1] } : { label: text("整机质量", "Mass") },
      { label: text("负载", "Payload") }, { label: text("续航", "Endurance") }, { label: text("移动速度", "Travel speed") }, { label: text("计算平台", "Compute") },
    ],
  })),
  {
    id: "exp-contactile-papillarray", company: "Contactile", product: "PapillArray Development Kit 2.0", industry: "dexterous-hands", category: "perception",
    type: text("多模态阵列触觉开发套件", "Multimodal tactile-array development kit"), role: text("机器人触觉传感厂商", "Robotic tactile-sensing vendor"),
    positioning: text("通过软柱阵列测量局部三维位移、力、振动及滑移相关信息。", "A soft-pillar array measures localized 3D displacement, force, vibration, and slip-related signals."),
    openness: text("提供开发套件、C++ 库和可选 ROS 节点", "Development kit, C++ library, and optional ROS node are available"), integration: text("USB、Windows/Linux、C++ 与 ROS", "USB, Windows/Linux, C++, and ROS"),
    verification: text("量程需匹配对象，软柱寿命、污染、漂移和实时闭环延迟需实测", "Match ranges to the object and test pillar life, contamination, drift, and closed-loop latency"),
    fit: [text("机器人抓取与压力映射", "Robot grasping and pressure mapping"), text("触觉算法研究", "Tactile algorithm research")], useCases: ["research", "integration", "manufacturing"], opennessLevel: "documented", officialUrl: "https://contactile.com/wp-content/uploads/2022/01/Contactile_PTSDevKit2.0_SpecSheet_JAN22.pdf",
    parameters: [
      { label: text("采样率", "Sampling rate"), value: text("1000 Hz", "1000 Hz") }, { label: text("局部 XY 力量程", "Local XY force range"), value: text("±4 N", "±4 N") },
      { label: text("局部 Z 力量程", "Local Z force range"), value: text("15 N", "15 N") }, { label: text("全局 Z 力力量程", "Global Z force range"), value: text("60 N", "60 N") },
      { label: text("传感阵列尺寸", "Sensor-array size"), value: text("24 × 30.6 × 12.8 mm", "24 × 30.6 × 12.8 mm") }, { label: text("数据接口", "Data interface"), value: text("USB", "USB") },
    ],
  },
  ...[
    ["hand-e", "Hand-E", "50 mm", "20–185 N", "1 kg", "0.2 mm"],
    ["hand-e-c10", "Hand-E C10", "40 mm", "25–175 N/指", "1.5 kg", "0.08 mm"],
    ["2f-85", "2F-85", "85 mm", "20–235 N", "0.925 kg", "0.4 mm"],
    ["2f-140", "2F-140", "140 mm", "10–125 N", "1.025 kg", "0.6 mm"],
  ].map(([id, product, stroke, force, mass, resolution]) => ({
    id: `exp-robotiq-${id}`, company: "Robotiq", product, industry: "dexterous-hands" as const, category: "end-effector" as const,
    type: text("自适应两指夹爪", "Adaptive two-finger gripper"), role: text("协作机器人末端工具厂商", "Collaborative-robot end-of-arm tooling vendor"),
    positioning: text("面向高混流制造中的抓取、上下料、装配和质量检测。", "Targets picking, machine tending, assembly, and quality testing in high-mix manufacturing."),
    openness: text("Modbus RTU，并可通过控制器扩展工业协议", "Modbus RTU with industrial protocol options through a controller"), integration: text("协作机器人、URCap、工业通信与应用套件", "Cobots, URCap, industrial communications, and application kits"),
    verification: text("对象包络、摩擦、指尖、节拍、防护等级和线缆寿命必须按工件验证", "Validate object envelope, friction, fingertips, cycle time, ingress protection, and cable life against the workpiece"),
    fit: [text("上下料与装配", "Machine tending and assembly"), text("自适应抓取", "Adaptive gripping")], useCases: ["manufacturing", "integration"] as FinderUseCase[], opennessLevel: "documented" as const, officialUrl: "https://robotiq.com/products/adaptive-grippers",
    parameters: [
      { label: text("行程", "Stroke"), value: text(stroke, stroke) }, { label: text("夹力", "Grip force"), value: text(force, force) },
      { label: text("质量", "Mass"), value: text(mass, mass) }, { label: text("位置分辨率", "Position resolution"), value: text(resolution, resolution) },
      { label: text("通信", "Communication"), value: text("Modbus RTU", "Modbus RTU") }, { label: text("重复精度", "Repeatability") },
    ],
  })),
  {
    id: "exp-tacterion-flex", company: "tacterion", product: "plyon flex", industry: "dexterous-hands", category: "perception",
    type: text("柔性接近、触摸与力传感层", "Flexible proximity, touch, and force-sensing layer"), role: text("柔性触觉与智能表面厂商", "Flexible tactile and smart-surface vendor"),
    positioning: text("面向平面、轻微曲面、可穿戴和机器人表面的定制触觉集成。", "Targets custom tactile integration on flat or mildly curved surfaces, wearables, and robots."),
    openness: text("提供开发套件、数据表与 USB/UART 评估接口", "Development kits, datasheets, and USB/UART evaluation interfaces are available"), integration: text("定制传感层、读出电子、USB/UART 与原型工具", "Custom sensor layers, readout electronics, USB/UART, and prototyping tools"),
    verification: text("定制后量程、空间分辨率、漂移、弯折寿命和批次一致性需重新确认", "Reconfirm range, spatial resolution, drift, bending life, and batch consistency after customization"),
    fit: [text("曲面触觉与人机交互", "Curved-surface touch and HMI"), text("机器人表皮原型", "Robot-skin prototyping")], useCases: ["research", "integration"], opennessLevel: "documented", officialUrl: "https://www.tacterion.com/devkit-support",
    parameters: [
      { label: text("测量模式", "Sensing modes"), value: text("接近 / 触摸 / 力", "Proximity / touch / force") }, { label: text("原理", "Principle"), value: text("电容 + 电阻", "Capacitive + resistive") },
      { label: text("评估接口", "Evaluation interface"), value: text("USB / UART", "USB / UART") }, { label: text("厚度", "Thickness") }, { label: text("力范围", "Force range") }, { label: text("采样率", "Sampling rate") },
    ],
  },
  {
    id: "exp-tacterion-stretch", company: "tacterion", product: "plyon stretch", industry: "dexterous-hands", category: "perception",
    type: text("可拉伸触觉传感层", "Stretchable tactile-sensing layer"), role: text("柔性触觉与智能表面厂商", "Flexible tactile and smart-surface vendor"),
    positioning: text("面向织物、软体机器人与动态形变表面的力和触摸测量。", "Targets force and touch measurement on textiles, soft robots, and dynamically deforming surfaces."),
    openness: text("产品与开发套件资料公开，定制参数按项目确认", "Product and development-kit material is public; custom parameters depend on the project"), integration: text("织物热贴、柔性读出和开发板", "Textile bonding, flexible readout, and development board"),
    verification: text("拉伸循环、迟滞、温湿度、粘接和标定漂移需按材料组合测试", "Test stretch cycles, hysteresis, temperature/humidity, bonding, and calibration drift for the material stack"),
    fit: [text("软体机器人与可穿戴", "Soft robotics and wearables")], useCases: ["research", "integration"], opennessLevel: "documented", officialUrl: "https://www.tacterion.com/plyon-stretch-launch",
    parameters: [
      { label: text("双向拉伸", "Biaxial stretch"), value: text("最高 20%", "Up to 20%") }, { label: text("迟滞", "Hysteresis"), value: text("<2%", "<2%") },
      { label: text("测量模式", "Sensing modes"), value: text("电阻 / 电容混合", "Resistive / capacitive hybrid") }, { label: text("力范围", "Force range") }, { label: text("采样率", "Sampling rate") }, { label: text("环境等级", "Environmental rating") },
    ],
  },
  {
    id: "exp-weart-touchdiver", company: "WEART", product: "TouchDIVER Pro", industry: "dexterous-hands", category: "perception",
    type: text("多模态触觉反馈手套", "Multimodal haptic-feedback glove"), role: text("XR 触觉与遥操作交互厂商", "XR haptics and teleoperation-interface vendor"),
    positioning: text("通过手指和掌部反馈力、纹理与温度，用于训练、虚拟样机和遥操作交互。", "Delivers force, texture, and thermal cues to fingers and palm for training, virtual prototyping, and teleoperation."),
    openness: text("提供 SDK，并支持 Unity、Unreal 与主流头显", "SDK support for Unity, Unreal, and major headsets"), integration: text("PC VR、部分一体机、Unity / Unreal 与遥操作映射", "PC VR, selected standalone headsets, Unity/Unreal, and teleoperation mapping"),
    verification: text("追踪延迟、力反馈范围、手型适配、热反馈安全和机器人映射误差需实测", "Test tracking latency, force range, hand fit, thermal safety, and robot-mapping error"),
    fit: [text("遥操作与 XR 训练", "Teleoperation and XR training"), text("虚拟样机", "Virtual prototyping")], useCases: ["research", "integration"], opennessLevel: "documented", officialUrl: "https://weart.it/",
    parameters: [
      { label: text("反馈点", "Actuation points"), value: text("6（五指 + 掌部）", "6 (five fingers + palm)") }, { label: text("反馈模态", "Feedback modes"), value: text("力 / 纹理 / 温度", "Force / texture / thermal") },
      { label: text("开发接口", "Development interfaces"), value: text("Unity / Unreal SDK", "Unity / Unreal SDK") }, { label: text("刷新率", "Update rate") }, { label: text("最大反馈力", "Maximum feedback force") }, { label: text("追踪延迟", "Tracking latency") },
    ],
  },
];

const supplementarySeeds: Seed[] = [
  {
    id: "exp-boston-spot", company: "Boston Dynamics", profileSlug: "boston-dynamics", product: "Spot", industry: "robotics", category: "robot-platform",
    type: text("工业巡检与数据采集四足机器人", "Quadruped robot for industrial inspection and data capture"),
    role: text("动态机器人与工业机器人系统厂商", "Dynamic-robot and industrial robotics systems vendor"),
    positioning: text("Spot 面向工业巡检、远程调查、数字孪生采集和机器人研究，可通过负载平台、机械臂及软件扩展任务能力。", "Spot targets industrial inspection, remote investigation, digital-twin capture, and robotics research, with task capabilities extended through payloads, an arm, and software."),
    openness: text("产品、支持中心和开发文档公开；具体负载、软件与服务包按配置确认", "Product, support, and developer material is public; payload, software, and service packages depend on configuration"),
    integration: text("自主任务、远程操作、Spot Arm、传感负载、Orbit 和 Spot SDK", "Autonomous missions, remote operation, Spot Arm, sensing payloads, Orbit, and the Spot SDK"),
    verification: text("核对负载组合、续航工况、网络覆盖、自主任务边界、现场安全和服务计划", "Confirm payload combinations, endurance conditions, network coverage, autonomous-task boundaries, site safety, and service plans"),
    fit: [text("工业设施巡检与危险区域远程调查", "Industrial-site inspection and remote investigation in hazardous areas"), text("移动机器人研究与负载开发", "Mobile-robot research and payload development")],
    useCases: ["research", "manufacturing", "service", "integration"], opennessLevel: "open", officialUrl: "https://bostondynamics.com/products/spot/",
    parameters: [
      { label: text("本体形态", "Robot form"), value: text("四足移动机器人", "Quadruped mobile robot") },
      { label: text("公开负载能力", "Published payload capacity"), value: text("14 kg", "14 kg") },
      { label: text("开发接口", "Developer access"), value: text("Spot SDK 与开发文档", "Spot SDK and developer documentation") },
      { label: text("自主能力", "Autonomy"), value: text("自主充电、动态重规划与跌倒自起", "Autonomous charging, dynamic replanning, and self-righting") },
      { label: text("续航", "Endurance") }, { label: text("防护等级", "Ingress protection") },
    ],
  },
  {
    id: "exp-boston-stretch", company: "Boston Dynamics", profileSlug: "boston-dynamics", product: "Stretch", industry: "robotics", category: "robot-platform",
    type: text("仓储纸箱装卸移动机器人", "Mobile robot for warehouse case handling"),
    role: text("动态机器人与工业机器人系统厂商", "Dynamic-robot and industrial robotics systems vendor"),
    positioning: text("Stretch 将移动底盘、视觉、机械臂和吸附末端集成为仓储纸箱装卸系统，公开场景包括集装箱卸货和箱件拣选。", "Stretch combines a mobile base, vision, arm, and suction end effector for warehouse case handling, including container unloading and case picking."),
    openness: text("产品、应用和支持资料公开；节拍与续航应按具体任务包和现场工况核验", "Product, application, and support material is public; throughput and endurance require validation against the task package and site conditions"),
    integration: text("实时箱件感知、移动操作、吸附抓取、仓储流程以及通过 Orbit 连接 WMS", "Real-time case perception, mobile manipulation, suction grasping, warehouse workflows, and WMS connectivity through Orbit"),
    verification: text("核对纸箱尺寸与表面、混箱规则、峰值节拍、异常恢复、通道条件、WMS 接口和服务响应", "Confirm case dimensions and surfaces, mixed-case rules, peak throughput, recovery, aisle conditions, WMS integration, and service response"),
    fit: [text("集装箱与拖车卸货", "Trailer and container unloading"), text("仓储箱件拣选", "Warehouse case picking")],
    useCases: ["logistics", "manufacturing", "integration"], opennessLevel: "documented", officialUrl: "https://bostondynamics.com/products/stretch/",
    parameters: [
      { label: text("系统形态", "System form"), value: text("移动底盘 + 视觉 + 机械臂 + 吸附末端", "Mobile base + vision + arm + suction end effector") },
      { label: text("公开最大箱重", "Published maximum case weight"), value: text("50 lb（约 23 kg）", "50 lb (about 23 kg)") },
      { label: text("应用", "Applications"), value: text("卸货与箱件拣选", "Unloading and case picking") },
      { label: text("WMS 连接", "WMS connectivity"), value: text("通过 Orbit", "Through Orbit") },
      { label: text("峰值节拍", "Peak throughput") }, { label: text("续航", "Endurance") },
    ],
  },
  {
    id: "exp-agility-arc", company: "Agility Robotics", profileSlug: "agility-robotics", product: "Agility Arc", industry: "robotics", category: "model-software",
    type: text("Digit 机器人云端部署与运营平台", "Cloud deployment and operations platform for Digit"),
    role: text("物流与制造人形机器人厂商", "Humanoid robotics vendor for logistics and manufacturing"),
    positioning: text("Arc 是 Digit 部署使用的云端自动化平台，用于机器人状态、任务、生产率和机群工作流管理。", "Arc is the cloud automation platform used with Digit deployments to manage robot status, tasks, productivity, and fleet workflows."),
    openness: text("平台定位与公开能力可查；接口、部署区域和许可按项目确认", "Platform positioning and public capabilities are documented; interfaces, deployment regions, and licensing require project confirmation"),
    integration: text("连接仓库管理、执行与制造系统，并提供任务分配、实时指标和机群可见性", "Connects warehouse management, execution, and manufacturing systems while providing task assignment, live metrics, and fleet visibility"),
    verification: text("核对 WMS/WES/MES 连接器、身份权限、数据驻留、离线降级、告警和许可口径", "Confirm WMS/WES/MES connectors, identity and permissions, data residency, offline behavior, alerts, and licensing"),
    fit: [text("Digit 机群部署与仓储工作流运营", "Digit fleet deployment and warehouse-workflow operations")],
    useCases: ["logistics", "manufacturing", "integration"], opennessLevel: "documented", officialUrl: "https://www.agilityrobotics.com/solutions",
    parameters: [
      { label: text("部署形态", "Deployment form"), value: text("云端自动化平台", "Cloud automation platform") },
      { label: text("公开能力", "Published capabilities"), value: text("状态监控、任务分配、生产率指标与机群管理", "Status monitoring, task assignment, productivity metrics, and fleet management") },
      { label: text("系统连接", "System connections"), value: text("仓库管理、执行与制造系统", "Warehouse management, execution, and manufacturing systems") },
      { label: text("接口与许可", "Interfaces and licensing") },
    ],
  },
  {
    id: "exp-apptronik-artemis", company: "Apptronik", profileSlug: "apptronik", product: "Artemis", industry: "robotics", category: "model-software",
    type: text("Apollo 2 感知、规划、控制与任务协调层", "Perception, planning, control, and task-coordination layer for Apollo 2"),
    role: text("模块化工业人形机器人厂商", "Modular industrial humanoid robotics vendor"),
    positioning: text("Artemis 协调 Apollo 2 的感知、规划、控制、安全、任务执行和人机交互，将高层目标转化为全身动作。", "Artemis coordinates Apollo 2 perception, planning, control, safety, task execution, and human-robot interaction, translating high-level goals into whole-body action."),
    openness: text("公开页面说明能力层级；API、部署方式和版本边界未完整披露", "The public page describes the capability layer; APIs, deployment form, and version boundaries are not fully disclosed"),
    integration: text("连接 Apollo 2 本体的感知、全身控制、安全机制与任务执行", "Connects Apollo 2 perception, whole-body control, safety mechanisms, and task execution"),
    verification: text("核对可调用接口、支持任务、模型更新、功能安全责任、日志和现场人工接管", "Confirm callable interfaces, supported tasks, model updates, functional-safety ownership, logging, and human takeover"),
    fit: [text("Apollo 2 任务开发和本体能力协调", "Apollo 2 task development and body-capability coordination")],
    useCases: ["manufacturing", "logistics", "integration"], opennessLevel: "confirm", officialUrl: "https://apptronik.com/apollo/apollo-2",
    parameters: [
      { label: text("系统职责", "System responsibility"), value: text("感知、规划、控制、安全与任务协调", "Perception, planning, control, safety, and task coordination") },
      { label: text("支持本体", "Supported body"), value: text("Apollo 2", "Apollo 2") },
      { label: text("API 与部署", "APIs and deployment") }, { label: text("版本与许可", "Version and licensing") },
    ],
  },
  {
    id: "exp-apptronik-fleet-connect", company: "Apptronik", profileSlug: "apptronik", product: "Fleet Connect", industry: "robotics", category: "model-software",
    type: text("Apollo 机器人机群运营层", "Fleet-operations layer for Apollo robots"),
    role: text("模块化工业人形机器人厂商", "Modular industrial humanoid robotics vendor"),
    positioning: text("Fleet Connect 用于监控机器人状态、编排任务、管理部署、采集数据并优化人形机器人机群运营。", "Fleet Connect monitors robot status, orchestrates tasks, manages deployments, collects data, and supports optimization across humanoid fleets."),
    openness: text("公开页面说明核心能力；接口、托管边界和商业条款未完整披露", "The public page describes core capabilities; interfaces, hosting boundaries, and commercial terms are not fully disclosed"),
    integration: text("连接机器人、操作人员与部署数据，为机群提供状态、任务和运营视图", "Connects robots, operators, and deployment data to provide fleet status, task, and operations views"),
    verification: text("核对支持规模、权限、告警、数据导出、第三方系统连接、离线策略和许可", "Confirm supported scale, permissions, alerts, data export, third-party connections, offline strategy, and licensing"),
    fit: [text("Apollo 机群监控、部署与持续运营", "Apollo fleet monitoring, deployment, and ongoing operations")],
    useCases: ["manufacturing", "logistics", "integration"], opennessLevel: "confirm", officialUrl: "https://apptronik.com/apollo/apollo-2",
    parameters: [
      { label: text("公开能力", "Published capabilities"), value: text("状态监控、任务编排、部署管理、数据采集与运营优化", "Status monitoring, task orchestration, deployment management, data collection, and operations optimization") },
      { label: text("支持本体", "Supported body"), value: text("Apollo 人形机器人机群", "Apollo humanoid fleets") },
      { label: text("系统接口", "System interfaces") }, { label: text("部署与许可", "Deployment and licensing") },
    ],
  },
  {
    id: "exp-qbrobotics-softhand-industry", company: "qbrobotics", profileSlug: "qbrobotics", product: "qb SoftHand Industry", industry: "dexterous-hands", category: "end-effector",
    type: text("工业与协作应用柔顺拟人手", "Compliant anthropomorphic hand for industrial and collaborative applications"),
    role: text("柔顺灵巧手、夹爪与执行器厂商", "Vendor of compliant hands, grippers, and actuators"),
    positioning: text("qb SoftHand Industry 采用腱驱单电机协同机构，让五指以一个控制量完成柔顺抓取，面向测试、装配、上下料和复杂搬运。", "qb SoftHand Industry uses a tendon-driven, single-motor synergy so five fingers perform compliant grasping with one control input, targeting testing, assembly, machine tending, and complex handling."),
    openness: text("产品页、数据表、手册、CAD 和软件资料公开", "Product page, datasheet, manuals, CAD, and software material are public"),
    integration: text("支持 EtherCAT、UDP、ROS、ROS 2，并提供 C++ API 与 URCap", "Supports EtherCAT, UDP, ROS, and ROS 2, with a C++ API and URCap"),
    verification: text("核对左右手版本、腕部安装位、手套选型、机器人适配、负载工况和安全认证适用范围", "Confirm left/right versions, wrist mounting, glove selection, robot compatibility, load conditions, and the scope of safety certifications"),
    fit: [text("测试、质量检验、装配、上下料和复杂搬运", "Testing, quality inspection, assembly, machine tending, and complex handling")],
    useCases: ["manufacturing", "integration", "research"], opennessLevel: "open", officialUrl: "https://qbrobotics.com/product/qb-softhand-industry/",
    parameters: [
      { label: text("手指数", "Fingers"), value: text("5", "5") }, { label: text("拟人自由度", "Anthropomorphic DoF"), value: text("19", "19") },
      { label: text("驱动", "Actuation"), value: text("1 个电机、1 个协同量", "1 motor, 1 synergy") }, { label: text("强力抓负载", "Power-grasp payload"), value: text("2 kg", "2 kg") },
      { label: text("捏取负载", "Pinch-grasp payload"), value: text("0.6 kg", "0.6 kg") }, { label: text("完全闭合时间", "Full closing time"), value: text("1.2 s", "1.2 s") },
      { label: text("质量", "Mass"), value: text("0.99 kg", "0.99 kg") }, { label: text("通信", "Communication"), value: text("EtherCAT、UDP", "EtherCAT, UDP") },
      { label: text("防护等级", "Ingress protection"), value: text("IP65", "IP65") }, { label: text("机器人软件", "Robot software"), value: text("ROS、ROS 2、C++ API、URCap", "ROS, ROS 2, C++ API, URCap") },
    ],
  },
];

const productSeeds = [...seeds, ...supplementarySeeds];

const expansionProfileSlugByCompany: Record<string, string> = {
  Kepler: "kepler",
  ENGINEAI: "engineai",
  RobotEra: "robotera",
  "LimX Dynamics": "limx-dynamics",
  Contactile: "contactile",
  Robotiq: "robotiq",
  tacterion: "tacterion",
  WEART: "weart",
};

export const getProductFinderExpansionRecords = (locale: Locale): FinderExpansionRecord[] => productSeeds.map((seed) => {
  const fit = seed.fit.map((item) => t(locale, item));
  const sourceIds = [`official-${seed.id}`];
  const company = locale === "en" ? seed.companyEn ?? seed.company : seed.company;
  return {
    id: seed.id,
    matrixSlug: "",
    matrixTitle: locale === "zh" ? "扩展收录小样" : "Expanded catalog demo",
    industry: seed.industry,
    reviewedAt: "2026-08-28",
    product: seed.product,
    company,
    type: t(locale, seed.type),
    openness: t(locale, seed.openness),
    integration: t(locale, seed.integration),
    verificationFocus: t(locale, seed.verification),
    sourceIds,
    officialUrl: seed.officialUrl,
    category: seed.category,
    useCases: seed.useCases,
    opennessLevel: seed.opennessLevel,
    parameters: seed.parameters.map((item) => parameter(locale, item.label, item.value)),
    profile: {
      slug: seed.profileSlug ?? expansionProfileSlugByCompany[seed.company] ?? "",
      valueChainRole: t(locale, seed.role),
      positioning: t(locale, seed.positioning),
      strengths: [t(locale, seed.type)],
      products: productSeeds.filter((item) => item.company === seed.company).map((item) => item.product),
      fit,
      questions: [t(locale, seed.verification)],
      sourceIds,
      reviewedAt: "2026-08-28",
    },
  };
});

export type FinderUpdateKind = "product" | "funding" | "policy" | "deployment";

export type FinderUpdate = {
  kind: FinderUpdateKind;
  date: string;
  title: string;
  summary: string;
  source: string;
  url: string;
};

const updates = [
  {
    kind: "product" as const,
    date: "2025-10-09",
    title: text("Figure 发布第三代人形机器人 Figure 03", "Figure introduces its third-generation humanoid, Figure 03"),
    summary: text("公开资料聚焦 Helix 适配、家庭环境设计和规模制造准备。", "The release focuses on Helix integration, home-oriented design, and preparation for scaled manufacturing."),
    source: "Figure",
    url: "https://www.figure.ai/news/introducing-figure-03",
  },
  {
    kind: "funding" as const,
    date: "2025-09-16",
    title: text("Figure 宣布 C 轮承诺资本超过 10 亿美元", "Figure announces more than $1 billion in Series C committed capital"),
    summary: text("公司披露投后估值为 390 亿美元，资金计划用于 Helix、制造和数据基础设施。", "The company reported a $39 billion post-money valuation and plans to fund Helix, manufacturing, and data infrastructure."),
    source: "Figure",
    url: "https://www.figure.ai/news/series-c",
  },
  {
    kind: "funding" as const,
    date: "2025-02-13",
    title: text("Apptronik 完成 3.5 亿美元 A 轮融资", "Apptronik closes a $350 million Series A round"),
    summary: text("公司称资金将用于 Apollo 部署、扩大运营和生产准备。", "The company said the capital will support Apollo deployments, operational expansion, and production readiness."),
    source: "Apptronik",
    url: "https://apptronik.com/news-collection/apptronik-raises-350-million-in-series-a-funding",
  },
  {
    kind: "policy" as const,
    date: "2025-12-29",
    title: text("杭州通过具身智能机器人产业发展条例", "Hangzhou passes an embodied-intelligence robotics industry regulation"),
    summary: text("条例覆盖技术创新、基础设施、产业支持、应用和安全管理；报道时仍需履行后续批准程序。", "The regulation covers technology, infrastructure, industry support, applications, and safety; the reported text still required the subsequent approval procedure."),
    source: text("中国人大网", "National People's Congress of China"),
    url: "https://www.npc.gov.cn/npc/c2/c30834/202601/t20260104_450967.html",
  },
];

export const getFinderUpdates = (locale: Locale): FinderUpdate[] => updates.map((item) => ({
  kind: item.kind,
  date: item.date,
  title: t(locale, item.title),
  summary: t(locale, item.summary),
  source: typeof item.source === "string" ? item.source : t(locale, item.source),
  url: item.url,
})).sort((left, right) => right.date.localeCompare(left.date));
