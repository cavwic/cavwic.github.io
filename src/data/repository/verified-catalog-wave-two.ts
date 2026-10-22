import type { Locale } from "../site";
import type { CompanyProfile } from "./catalog";
import type { FinderExpansionRecord, FinderParameter } from "./product-finder-demo";

type Localized = { zh: string; en: string };
type SpecRow = {
  label: Localized;
  value: Localized;
  conditions?: Localized;
  locator?: Localized;
  sourceUrl?: string;
  sourceLabel?: Localized;
};

const l = (zh: string, en: string): Localized => ({ zh, en });
const t = (locale: Locale, value: Localized) => value[locale];

const ROBOTERA_HOME = "https://www.robotera.com/en/";
const ROBOTERA_ABOUT = "https://www.robotera.com/en/about/us";
const ROBOTERA_L7 = "https://www.robotera.com/en/product/L7";
const ROBOTERA_Q5 = "https://www.robotera.com/en/product/Q5";
const ROBOTERA_M7 = "https://www.robotera.com/en/product/M7";
const ROBOTERA_XHAND = "https://www.robotera.com/en/product/XHAND";
const ROBOTERA_XHAND_PDF = "https://www.robotera.com/upload/goods/20241208/2ab64afaae0098db948e9d4063951c28.pdf";
const ROBOTERA_LITE = "https://www.robotera.com/en/product/Lite";
const ROBOTERA_PRO = "https://www.robotera.com/en/product/PRO";
const ROBOTERA_MODEL = "https://www.robotera.com/en/model";

const sourceName = l("星动纪元官方产品页", "ROBOTERA official product page");
const brochureName = l("星动纪元官方产品手册", "ROBOTERA official product brochure");
const laboratoryConditions = l(
  "厂商页面将该数值标为实验室或演示条件结果；实际表现会受负载、姿态、环境、控制策略和软件版本影响。",
  "The manufacturer presents this figure as a laboratory or demonstration result; actual performance depends on payload, posture, environment, control policy, and software version.",
);

const verifiedSpecs = (locale: Locale, defaultUrl: string, rows: SpecRow[]): FinderParameter[] => rows.map((row) => ({
  label: t(locale, row.label),
  value: t(locale, row.value),
  status: "manufacturer",
  sourceUrl: row.sourceUrl ?? defaultUrl,
  sourceLabel: t(locale, row.sourceLabel ?? sourceName),
  sourceLocator: t(locale, row.locator ?? l("产品参数或配置区", "Product specifications or configuration section")),
  conditions: row.conditions ? t(locale, row.conditions) : undefined,
}));

const roboteraCompanyPatch = (company: CompanyProfile, locale: Locale): CompanyProfile => ({
  ...company,
  name: locale === "zh" ? "星动纪元" : "ROBOTERA",
  englishName: "ROBOTERA",
  legalName: locale === "zh" ? "北京星动纪元科技股份有限公司" : "Beijing Xingdongjiyuan Technology Co., Ltd.",
  country: locale === "zh" ? "中国" : "China",
  headquarters: locale === "zh" ? "北京" : "Beijing",
  founded: "2023-08",
  officialUrl: ROBOTERA_HOME,
  valueChainRole: locale === "zh"
    ? "人形机器人、灵巧手、具身模型与数据闭环平台厂商"
    : "Humanoid, dexterous-hand, embodied-model, and data-loop platform company",
  positioning: locale === "zh"
    ? "星动纪元采用本体、灵巧手、具身模型和数据训练链路并行的产品路线。当前官网硬件目录包括 L7、Q5、M7、XHAND 1、XHAND 1 Lite 和 XHAND 1 PRO，并单列 ERA-42 VLA 模型。"
    : "ROBOTERA develops robot bodies, dexterous hands, embodied models, and data-training workflows in parallel. Its current hardware catalog lists L7, Q5, M7, XHAND 1, XHAND 1 Lite, and XHAND 1 PRO, with the ERA-42 VLA model presented separately.",
  strengths: locale === "zh"
    ? ["全尺寸与轮式人形本体", "全驱多指灵巧手", "遥操作、数据采集与 VLA 模型链路"]
    : ["Full-size and wheeled humanoid bodies", "Fully actuated multi-finger hands", "Teleoperation, data capture, and VLA model workflows"],
  products: ["L7", "Q5", "M7", "XHAND 1", "XHAND 1 Lite", "XHAND 1 PRO", "ERA-42"],
  fit: locale === "zh"
    ? ["具身智能科研与数据采集", "物流、制造和服务场景验证", "灵巧操作、遥操作与模型部署"]
    : ["Embodied-AI research and data capture", "Logistics, manufacturing, and service validation", "Dexterous manipulation, teleoperation, and model deployment"],
  overview: locale === "zh" ? [
    "星动纪元官网披露公司于 2023 年 8 月成立，总部位于北京。公开路线覆盖人形机器人本体、五指灵巧手、端到端 VLA 模型以及配套的数据采集、训练和真机验证流程。",
    "L7 是全尺寸双足平台，M7 是可用于工作台操作的全尺寸半身平台，Q5 采用轮式底盘；三者分别面向不同移动和操作空间。XHAND 系列则按主动自由度、触觉覆盖、质量和控制能力形成 Lite、标准版和 PRO 三个层级。",
    "官网公开参数足以支持初步筛选，但速度、载荷、寿命和触觉指标多来自厂商测试。项目选型仍需锁定左右手、末端配置、软件包、遥操作设备、交付批次和现场验收条件。",
  ] : [
    "ROBOTERA states that it was founded in Beijing in August 2023. Its public stack spans humanoid bodies, five-finger dexterous hands, an end-to-end VLA model, and supporting data capture, training, and real-robot validation workflows.",
    "L7 is a full-size biped, M7 is a full-size upper-body platform for workbench manipulation, and Q5 uses a wheeled base. The XHAND line separates Lite, standard, and PRO tiers by actuation, tactile coverage, mass, and control capability.",
    "Published specifications support early screening, but speed, payload, life, and tactile figures are mainly manufacturer test results. Selection still requires locking handedness, end-effector configuration, software package, teleoperation hardware, delivery revision, and acceptance conditions.",
  ],
  businessAreas: locale === "zh"
    ? ["全尺寸双足与轮式人形机器人", "半身移动操作与工作台机器人", "全驱五指灵巧手", "VLA 模型、遥操作和数据训练工具链"]
    : ["Full-size biped and wheeled humanoids", "Upper-body mobile manipulation and workbench robots", "Fully actuated five-finger hands", "VLA models, teleoperation, and data-training tooling"],
  customerGroups: locale === "zh"
    ? ["高校、实验室和具身模型团队", "物流与制造自动化团队", "服务机器人与商业场景集成方", "灵巧操作和高质量数据采集团队"]
    : ["Universities, laboratories, and embodied-model teams", "Logistics and manufacturing automation teams", "Service-robot and commercial integrators", "Dexterous-manipulation and high-fidelity data-capture teams"],
  milestones: locale === "zh" ? [
    { date: "2023-08", event: "公司成立。" },
    { date: "2024", event: "公开 STAR1 与 XHAND 1；当前 L7 页面延续 55 自由度全尺寸本体路线。" },
    { date: "2025-07", event: "公司介绍页披露近 5 亿元人民币 A 轮融资，并称已实现规模化产品交付。" },
    { date: "2026-03", event: "官网新闻披露 10 亿元人民币战略轮融资。" },
    { date: "2026-04", event: "官网新闻披露超过 2 亿美元新一轮融资。" },
  ] : [
    { date: "2023-08", event: "Company founded." },
    { date: "2024", event: "Published STAR1 and XHAND 1; the current L7 page continues the 55-DoF full-size body line." },
    { date: "2025-07", event: "The company page reported a nearly RMB 500 million Series A and stated that scaled product delivery had begun." },
    { date: "2026-03", event: "The official news feed reported an RMB 1 billion strategic round." },
    { date: "2026-04", event: "The official news feed reported a new round exceeding USD 200 million." },
  ],
  catalogScope: locale === "zh"
    ? "按当前官网硬件产品导航收录 6 个独立型号，并将官网单列的 ERA-42 作为模型平台记录；历史 STAR1 资料只用于解释 L7 路线，不重复建立现售型号。"
    : "Six distinct models in the current hardware navigation are indexed, plus the separately presented ERA-42 model platform. Historical STAR1 material is used only to explain the L7 lineage and is not duplicated as a current model.",
  catalogCoverage: "family-complete",
  verificationFocus: locale === "zh"
    ? "采购前核对型号修订、左右手、触觉配置、控制协议、SDK 版本、遥操作硬件、负载和寿命测试条件。"
    : "Before procurement, verify model revision, handedness, tactile configuration, control protocol, SDK version, teleoperation hardware, and payload and life test conditions.",
  presalesQuestions: locale === "zh" ? [
    "任务需要双足、轮式还是半身工作台形态，工作空间和负载工况如何定义？",
    "XHAND 的主动自由度、触觉覆盖、接口和控制模式应选哪个版本？",
    "厂商测试指标如何转换为现场节拍、连续运行、故障恢复和验收标准？",
  ] : [
    "Does the task require a biped, wheeled base, or upper-body workbench form, and how are workspace and payload conditions defined?",
    "Which XHAND edition provides the required actuated DoF, tactile coverage, interfaces, and control modes?",
    "How will manufacturer test figures translate into on-site cycle time, continuous duty, recovery, and acceptance criteria?",
  ],
  reviewedAt: "2026-09-04",
});

export const applyRoboteraCompanyPatch = (company: CompanyProfile, locale: Locale): CompanyProfile => (
  company.slug === "robotera" ? roboteraCompanyPatch(company, locale) : company
);

const l7Rows: SpecRow[] = [
  { label: l("产品型号", "Product model"), value: l("星动 L7", "ROBOTERA L7") },
  { label: l("算力", "Compute performance"), value: l("80 TOPS（x86）+ 275 TOPS（NVIDIA Orin）", "80 TOPS (x86) + 275 TOPS (NVIDIA Orin)") },
  { label: l("高度", "Height"), value: l("1.71 m", "1.71 m") },
  { label: l("重量（不含灵巧手）", "Weight (without dexterous hand)"), value: l("65 kg", "65 kg") },
  { label: l("总自由度（含灵巧手）", "Total DoF (with dexterous hand)"), value: l("55", "55") },
  { label: l("颈部自由度", "Neck DoF"), value: l("2", "2") },
  { label: l("双臂自由度", "Dual-arm DoF"), value: l("7 × 2", "7 × 2") },
  { label: l("双腿自由度", "Dual-leg DoF"), value: l("6 × 2", "6 × 2") },
  { label: l("腰部自由度", "Waist DoF"), value: l("3", "3") },
  { label: l("灵巧手自由度", "Dexterous-hand DoF"), value: l("单手 12", "12 per hand") },
  { label: l("双臂负载", "Dual-arm payload"), value: l("20 kg", "20 kg"), conditions: laboratoryConditions },
  { label: l("臂展 / 操作空间直径", "Arm span / workspace diameter"), value: l("2.1 m", "2.1 m") },
  { label: l("奔跑速度", "Running speed"), value: l("4 m/s", "4 m/s"), conditions: laboratoryConditions },
  { label: l("膝关节峰值扭矩", "Knee-joint peak torque"), value: l("400 N·m", "400 N·m"), conditions: laboratoryConditions },
  { label: l("膝关节峰值转速", "Knee-joint peak speed"), value: l("25 rad/s", "25 rad/s"), conditions: laboratoryConditions },
  { label: l("电池", "Battery"), value: l("60 V / 15 Ah", "60 V / 15 Ah") },
  { label: l("深度视觉", "Depth vision"), value: l("双目相机", "Binocular camera") },
  { label: l("激光雷达", "LiDAR"), value: l("3D 激光雷达", "3D LiDAR") },
  { label: l("音频交互", "Audio interaction"), value: l("麦克风阵列与扬声器", "Microphone array and speaker") },
  { label: l("灵巧手型号", "Dexterous-hand model"), value: l("XHAND 1，全直驱、12 主动自由度仿人五指手", "XHAND 1, fully direct-driven 12-active-DoF anthropomorphic five-finger hand") },
  { label: l("腕部结构", "Wrist structure"), value: l("仿人十字轴手腕", "Humanoid cross-axis wrist"), conditions: l("官网中英文配置区对腕部自由度显示不一致，因此不录入额外腕部数值。", "The Chinese and English configuration panels disagree on wrist DoF, so no additional wrist count is indexed.") },
];

const q5Rows: SpecRow[] = [
  { label: l("产品型号", "Product model"), value: l("星动 Q5", "ROBOTERA Q5") },
  { label: l("全身自由度", "Whole-body DoF"), value: l("44", "44") },
  { label: l("站立尺寸", "Standing dimensions"), value: l("582 × 519 × 1650 mm", "582 × 519 × 1650 mm") },
  { label: l("底盘尺寸", "Chassis dimensions"), value: l("长 582 × 宽 519 × 高 225 mm", "582 mm long × 519 mm wide × 225 mm high") },
  { label: l("重量", "Weight"), value: l("70 kg", "70 kg") },
  { label: l("双臂最大负载", "Maximum dual-arm payload"), value: l("10 kg", "10 kg"), conditions: laboratoryConditions },
  { label: l("臂展", "Arm span"), value: l("1380 mm", "1380 mm") },
  { label: l("垂直可达范围", "Vertical reach range"), value: l("0–2 m；上方可超过 2 m，下方可触及地面", "0–2 m; published as above 2 m at the top and reaching the floor at the bottom") },
  { label: l("满载续航", "Loaded runtime"), value: l(">4 h", ">4 h"), conditions: laboratoryConditions },
  { label: l("供电电压", "Supply voltage"), value: l("60 V", "60 V") },
  { label: l("颈部自由度", "Neck DoF"), value: l("2", "2") },
  { label: l("双臂自由度", "Dual-arm DoF"), value: l("7 × 2", "7 × 2") },
  { label: l("双手自由度", "Dual-hand DoF"), value: l("11 × 2", "11 × 2"), conditions: l("Q5 页面按每只 XHAND 1 Lite 的主动与被动自由度合计。", "The Q5 page totals active and passive DoF for each XHAND 1 Lite.") },
  { label: l("腿部自由度", "Leg DoF"), value: l("3", "3") },
  { label: l("腰部自由度", "Waist DoF"), value: l("1", "1") },
  { label: l("底盘自由度", "Chassis DoF"), value: l("2", "2") },
  { label: l("底盘轮组", "Chassis wheels"), value: l("驱动轮 ×2；万向轮 ×4", "Two drive wheels and four caster wheels") },
  { label: l("感知配置", "Sensing configuration"), value: l("3D 激光雷达 + 深度 / 立体相机", "3D LiDAR plus depth / stereo camera") },
  { label: l("状态显示", "Status display"), value: l("状态显示屏", "Status display") },
  { label: l("遥操作兼容", "Teleoperation compatibility"), value: l("数据手套、VR 等全身遥操作设备", "Data gloves, VR, and other full-body teleoperation devices") },
];

const m7Rows: SpecRow[] = [
  { label: l("产品型号", "Product model"), value: l("星动 M7", "ROBOTERA M7") },
  { label: l("高度", "Height"), value: l("792 mm", "792 mm") },
  { label: l("重量", "Weight"), value: l("65 kg", "65 kg") },
  { label: l("手臂长度", "Arm length"), value: l("717 mm", "717 mm") },
  { label: l("总自由度（含灵巧手）", "Total DoF (with dexterous hands)"), value: l("43", "43") },
  { label: l("半身自由度（不含手）", "Upper-body DoF (without hands)"), value: l("19", "19") },
  { label: l("单臂自由度", "Single-arm DoF"), value: l("7", "7") },
  { label: l("单手自由度", "Single-hand DoF"), value: l("12", "12") },
  { label: l("臂展（不含手）", "Wingspan (without hands)"), value: l("1660 mm", "1660 mm") },
  { label: l("操作空间直径", "Workspace diameter"), value: l("2.1 m", "2.1 m") },
  { label: l("遥操作设备", "Teleoperation device"), value: l("Meta Quest", "Meta Quest") },
  { label: l("遥操作视觉", "Teleoperation vision"), value: l("Intel RealSense / 立体视觉", "Intel RealSense / stereo vision") },
  { label: l("环境感知", "Environmental sensing"), value: l("深度视觉与 3D 激光雷达", "Depth vision and 3D LiDAR") },
  { label: l("手部响应", "Hand response"), value: l("10 CPS", "10 CPS"), conditions: l("页面将该值描述为每秒点击次数，属于所配灵巧手的动作展示口径。", "The page describes this as clicks per second, an actuation demonstration metric for the configured hand.") },
];

const xhandRows: SpecRow[] = [
  { label: l("重量", "Weight"), value: l("1100 g", "1100 g") },
  { label: l("当前网页尺寸", "Current web-page dimensions"), value: l("191 × 94 × 47 mm", "191 × 94 × 47 mm") },
  { label: l("官方手册尺寸", "Official brochure dimensions"), value: l("190.36 × 94 × 47 mm", "190.36 × 94 × 47 mm"), sourceUrl: ROBOTERA_XHAND_PDF, sourceLabel: brochureName, locator: l("产品参数表", "Product specification table"), conditions: l("官方手册与当前网页的长度口径相差 0.64 mm，两个公开版本均保留。", "The official brochure and current web page differ by 0.64 mm in published length; both public revisions are retained.") },
  { label: l("主动自由度", "Active DoF"), value: l("12", "12") },
  { label: l("被动自由度", "Passive DoF"), value: l("0", "0") },
  { label: l("自由度分配", "DoF allocation"), value: l("拇指 3；食指 3；中指 2；无名指 2；小指 2", "Thumb 3; index 3; middle 2; ring 2; little finger 2") },
  { label: l("驱动方式", "Actuation"), value: l("五指关节全直驱 / 齿轮传动", "Fully direct-driven finger joints / gear transmission") },
  { label: l("指尖构型", "Fingertip shape"), value: l("圆润型", "Rounded") },
  { label: l("网页侧摆范围", "Web-page lateral range"), value: l("-5°–17°", "-5° to 17°") },
  { label: l("手册食指侧摆", "Brochure index-finger lateral motion"), value: l("±15°", "±15°"), sourceUrl: ROBOTERA_XHAND_PDF, sourceLabel: brochureName, locator: l("产品参数表", "Product specification table"), conditions: l("该手册字段与当前网页的“侧摆范围”名称和数值不同，不强行视为同一测量定义。", "This brochure field differs in label and value from the current web-page lateral-range field and is not forced into one measurement definition.") },
  { label: l("拇指活动角度", "Thumb movement angle"), value: l("<110°", "<110°"), sourceUrl: ROBOTERA_XHAND_PDF, sourceLabel: brochureName, locator: l("产品参数表", "Product specification table") },
  { label: l("大拇指最远对指", "Maximum thumb opposition"), value: l("小指", "Little finger") },
  { label: l("最小抓握直径", "Minimum grasp diameter"), value: l("16 mm", "16 mm"), sourceUrl: ROBOTERA_XHAND_PDF, sourceLabel: brochureName, locator: l("产品参数表", "Product specification table") },
  { label: l("指尖力", "Fingertip force"), value: l("15 N", "15 N"), sourceUrl: ROBOTERA_XHAND_PDF, sourceLabel: brochureName, locator: l("产品参数表", "Product specification table"), conditions: laboratoryConditions },
  { label: l("整手握力", "Whole-hand grip force"), value: l("80 N", "80 N"), sourceUrl: ROBOTERA_XHAND_PDF, sourceLabel: brochureName, locator: l("产品参数表", "Product specification table"), conditions: laboratoryConditions },
  { label: l("指尖最大负载", "Maximum fingertip payload"), value: l("5 kg", "5 kg"), sourceUrl: ROBOTERA_XHAND_PDF, sourceLabel: brochureName, locator: l("产品参数表", "Product specification table"), conditions: laboratoryConditions },
  { label: l("整手最大负载", "Maximum whole-hand payload"), value: l("25 kg", "25 kg"), sourceUrl: ROBOTERA_XHAND_PDF, sourceLabel: brochureName, locator: l("产品参数表", "Product specification table"), conditions: laboratoryConditions },
  { label: l("重复开合速度", "Repeated open/close rate"), value: l(">2 Hz", ">2 Hz"), conditions: laboratoryConditions },
  { label: l("页面点击速度展示", "Published click-rate demonstration"), value: l("10 CPS", "10 CPS"), conditions: l("CPS 是页面定义的每秒点击次数，不与重复开合频率直接等同。", "CPS is defined on the page as clicks per second and is not treated as identical to repeated open/close rate.") },
  { label: l("反驱阻尼", "Backdrive damping"), value: l("≤0.1 N·s/m", "≤0.1 N·s/m") },
  { label: l("指尖重复定位精度", "Fingertip repeatability"), value: l("±0.20 mm", "±0.20 mm"), conditions: laboratoryConditions },
  { label: l("触觉覆盖", "Tactile coverage"), value: l("五指指尖 270° 环绕", "270° wrap around all five fingertips") },
  { label: l("触觉传感器", "Tactile sensors"), value: l("5 个三维触觉阵列；每指 120 点", "Five 3D tactile arrays; 120 points per finger") },
  { label: l("触觉测量", "Tactile measurements"), value: l("切向力 X/Y、法向力 Z、温度、接触面积、振动频率和滑动趋势", "Tangential X/Y force, normal Z force, temperature, contact area, vibration frequency, and slip trend") },
  { label: l("整手控制频率", "Whole-hand control frequency"), value: l("83 Hz", "83 Hz") },
  { label: l("通信速率", "Communication rates"), value: l("EtherCAT 100 MHz；RS485 2 MHz", "EtherCAT 100 MHz; RS485 2 MHz"), conditions: l("按官网原文保留单位；采购前应确认其表示总线时钟还是有效数据率。", "Units are retained verbatim from the official page; verify whether they refer to bus clock or effective data rate before procurement.") },
  { label: l("通信接口", "Communication interfaces"), value: l("RS485（USB）、EtherCAT", "RS485 (USB), EtherCAT") },
  { label: l("感知参数", "Perception outputs"), value: l("触觉三维阵列；关节位置、速度、温度、电流 / 力矩", "3D tactile arrays; joint position, velocity, temperature, and current / torque") },
  { label: l("控制参数", "Control parameters"), value: l("关节位置、扭矩、刚度系数和阻尼系数", "Joint position, torque, stiffness coefficient, and damping coefficient") },
  { label: l("控制模式", "Control modes"), value: l("位控（低 / 高阻尼）、电流环力控、力位控制", "Position (low/high damping), current-loop force control, and force-position control") },
  { label: l("软件支持", "Software support"), value: l("Ubuntu；C++ / Python SDK；ROS 1 / ROS 2；x86 / ARM", "Ubuntu; C++ / Python SDK; ROS 1 / ROS 2; x86 / ARM") },
  { label: l("遥操作支持", "Teleoperation support"), value: l("VR 头显、动捕手套、外骨骼手套与动作重定向软件", "VR headsets, motion-capture gloves, exoskeleton gloves, and motion-retargeting software") },
  { label: l("空载抓取寿命", "No-load grasp life"), value: l("1,000,000 次", "1,000,000 cycles"), conditions: laboratoryConditions },
  { label: l("工作温度", "Operating temperature"), value: l("-20–60 °C", "-20 to 60 °C") },
  { label: l("工作电压", "Operating voltage"), value: l("24–72 V", "24–72 V") },
  { label: l("静态电流 / 功率", "Static current / power"), value: l("0.15 A @ 48 V；7 W", "0.15 A @ 48 V; 7 W") },
  { label: l("最大电流 / 功率", "Maximum current / power"), value: l("2.5 A @ 48 V；120 W", "2.5 A @ 48 V; 120 W") },
];

const liteRows: SpecRow[] = [
  { label: l("重量", "Weight"), value: l("730 g", "730 g") },
  { label: l("尺寸", "Dimensions"), value: l("209 × 84 × 32 mm", "209 × 84 × 32 mm") },
  { label: l("总自由度", "Total DoF"), value: l("11（6 主动 + 5 被动）", "11 (6 active + 5 passive)"), conditions: l("总数同时见于 Q5 的 XHAND 1 Lite 配置说明。", "The same total appears in the Q5 XHAND 1 Lite configuration description.") },
  { label: l("主动自由度", "Active DoF"), value: l("6", "6") },
  { label: l("被动自由度", "Passive DoF"), value: l("5", "5") },
  { label: l("自由度分配", "DoF allocation"), value: l("拇指 2+1；食指 1+1；中指 1+1；无名指 1+1；小指 1+1", "Thumb 2+1; index 1+1; middle 1+1; ring 1+1; little finger 1+1"), conditions: l("中文官网把中指一项误写为拇指；此处按同页英文版及五指总数记录。", "The Chinese page repeats 'thumb' for the middle-finger row; this entry follows the English page and the five-finger total.") },
  { label: l("最小抓握直径", "Minimum grasp diameter"), value: l("12 mm", "12 mm") },
  { label: l("指尖负载", "Fingertip load"), value: l("12 N", "12 N"), conditions: laboratoryConditions },
  { label: l("大拇指最远对指", "Maximum thumb opposition"), value: l("小指", "Little finger") },
  { label: l("重复开合速度", "Repeated open/close rate"), value: l(">2 Hz", ">2 Hz"), conditions: laboratoryConditions },
  { label: l("页面点击速度展示", "Published click-rate demonstration"), value: l("10 CPS", "10 CPS"), conditions: l("CPS 为页面动作展示口径，不与重复开合频率直接等同。", "CPS is a page demonstration metric and is not treated as identical to repeated open/close rate.") },
  { label: l("反驱阻尼", "Backdrive damping"), value: l("≤0.1 N·s/m", "≤0.1 N·s/m") },
  { label: l("拇指传动", "Thumb transmission"), value: l("连杆；每指 2 个微型力控复合关节", "Linkage; two micro force-controlled composite joints per finger") },
  { label: l("四指传动", "Four-finger transmission"), value: l("连杆；每指 1 个微型力控复合关节", "Linkage; one micro force-controlled composite joint per finger") },
  { label: l("指尖构型", "Fingertip shape"), value: l("圆润型", "Rounded") },
  { label: l("指尖重复定位精度", "Fingertip repeatability"), value: l("±0.20 mm", "±0.20 mm"), conditions: laboratoryConditions },
  { label: l("通信接口", "Communication interfaces"), value: l("EtherCAT / RS485（USB）", "EtherCAT / RS485 (USB)") },
  { label: l("通信速率", "Communication rates"), value: l("EtherCAT 100 Mbps；RS485 3 Mbps", "EtherCAT 100 Mbps; RS485 3 Mbps") },
  { label: l("控制模式", "Control modes"), value: l("位控（低 / 高阻尼）、电流环力控", "Position (low/high damping) and current-loop force control") },
  { label: l("空载抓取寿命", "No-load grasp life"), value: l("1,000,000 次", "1,000,000 cycles"), conditions: laboratoryConditions },
];

const proRows: SpecRow[] = [
  { label: l("重量", "Weight"), value: l("0.884 kg", "0.884 kg") },
  { label: l("尺寸", "Dimensions"), value: l("210 × 102 × 44 mm", "210 × 102 × 44 mm") },
  { label: l("主动自由度", "Active DoF"), value: l("21；全部支持反驱", "21; all backdrivable") },
  { label: l("驱动架构", "Actuation architecture"), value: l("全驱动、准直驱", "Fully actuated, quasi-direct drive") },
  { label: l("五指最大展开角度", "Maximum five-finger spread"), value: l("135°", "135°") },
  { label: l("最大抓握直径", "Maximum grasp diameter"), value: l(">160 mm", ">160 mm"), conditions: l("规格表写 160 mm，功能说明写超过 160 mm；按较完整的功能说明保留并注明差异。", "The table says 160 mm while the feature section says over 160 mm; the richer feature description is retained with this discrepancy noted.") },
  { label: l("触觉传感器数量", "Tactile sensor count"), value: l("18", "18") },
  { label: l("触觉覆盖", "Tactile coverage"), value: l("指尖 5；指腹 10；手掌 3", "Five fingertips, ten finger pads, and three palm sensors") },
  { label: l("触觉力感知", "Tactile force sensing"), value: l("指尖三维；其他位置一维", "3D at fingertips; 1D at other locations") },
  { label: l("触觉测量范围", "Tactile measurement range"), value: l("0.1–25 N", "0.1–25 N") },
  { label: l("触觉分辨率", "Tactile resolution"), value: l("0.01 N", "0.01 N") },
  { label: l("非接触检测距离", "Non-contact detection distance"), value: l("10 mm", "10 mm") },
  { label: l("指尖力", "Fingertip force"), value: l("15 N", "15 N"), conditions: l("官网脚注说明测试方法为握拳测试。", "The official footnote states that the test method is fist clenching.") },
  { label: l("重复开合速度", "Repeated open/close rate"), value: l(">5 Hz", ">5 Hz"), conditions: laboratoryConditions },
  { label: l("Pitch 关节重复定位精度", "Pitch-joint repeatability"), value: l("±0.1 mm", "±0.1 mm"), conditions: laboratoryConditions },
  { label: l("侧摆关节重复定位精度", "Lateral-joint repeatability"), value: l("±0.2 mm", "±0.2 mm"), conditions: laboratoryConditions },
  { label: l("单关节背隙", "Single-joint backlash"), value: l("<±0.25 mm", "<±0.25 mm"), conditions: laboratoryConditions },
  { label: l("整手指背隙", "Whole-finger backlash"), value: l("<±1 mm", "<±1 mm"), conditions: laboratoryConditions },
  { label: l("电流环力控带宽", "Current-loop force-control bandwidth"), value: l("4 kHz", "4 kHz"), conditions: laboratoryConditions },
  { label: l("使用寿命", "Service life"), value: l(">200,000 次带负载测试", ">200,000 loaded cycles"), conditions: laboratoryConditions },
  { label: l("工作电压", "Operating voltage"), value: l("24–72 V", "24–72 V") },
  { label: l("通信协议", "Communication protocols"), value: l("EtherCAT / RS485 / CAN FD", "EtherCAT / RS485 / CAN FD") },
  { label: l("控制模式", "Control modes"), value: l("MIT 模式、前馈力控、位控、拖动示教", "MIT mode, feedforward force control, position control, and kinesthetic teaching") },
  { label: l("上位机功能", "Host software"), value: l("实时全掌触觉显示、动态 URDF", "Real-time full-hand haptic display and dynamic URDF") },
  { label: l("软件支持", "Software support"), value: l("Ubuntu；C++ / Python SDK；ROS 1 / ROS 2；x86 / ARM", "Ubuntu; C++ / Python SDK; ROS 1 / ROS 2; x86 / ARM") },
  { label: l("遥操作支持", "Teleoperation support"), value: l("Manus Pro Haptic、Manus Pro、IO-Tech 外骨骼及 VR / 动捕方案", "Manus Pro Haptic, Manus Pro, IO-Tech exoskeleton, and VR / motion-capture solutions") },
  { label: l("公开交付周期", "Published lead time"), value: l("<1 个月", "<1 month"), conditions: l("厂商网页声明，实际交付需按地区、数量和配置重新确认。", "Manufacturer web claim; actual lead time must be reconfirmed by region, quantity, and configuration.") },
];

type ProductPatch = {
  name: string;
  url: string;
  rows: SpecRow[];
  type: Localized;
  integration: Localized;
  verification: Localized;
  overview: Localized[];
  highlights: Array<{ title: Localized; detail: Localized }>;
  applications: Localized[];
  imageUrl: string;
  imageAlt: Localized;
};

const productPatches: Record<string, ProductPatch> = {
  "exp-robotera-l7": {
    name: "L7", url: ROBOTERA_L7, rows: l7Rows,
    type: l("全尺寸双足人形机器人", "Full-size biped humanoid robot"),
    integration: l("集成人形本体、双臂、XHAND 1、双目视觉、3D 激光雷达、音频交互与双计算平台。", "Integrates a humanoid body, dual arms, XHAND 1, binocular vision, 3D LiDAR, audio interaction, and dual compute platforms."),
    verification: l("把 20 kg 双臂负载、4 m/s 速度和 400 N·m 峰值扭矩限定在厂商测试口径，并核对交付版算力、手部和电池。", "Treat 20 kg dual-arm payload, 4 m/s speed, and 400 N·m peak torque as manufacturer test figures, and verify delivered compute, hands, and battery."),
    overview: [l("L7 是星动纪元当前全尺寸双足产品，官网公开 55 自由度、双计算平台、XHAND 1、双目视觉和 3D 激光雷达配置。", "L7 is ROBOTERA's current full-size biped. Its official page publishes a 55-DoF configuration with dual compute, XHAND 1, binocular vision, and 3D LiDAR."), l("页面将物流、制造、商业服务和科研列为应用方向；这些场景是产品定位，不等于无需二次开发即可完成相应任务。", "The page lists logistics, manufacturing, commercial service, and research applications; these are product directions, not evidence of turnkey task completion without integration.")],
    highlights: [{ title: l("运动与负载", "Motion and payload"), detail: l("4 m/s 厂商跑速、20 kg 双臂负载、400 N·m 膝关节峰值扭矩。", "Published 4 m/s running speed, 20 kg dual-arm payload, and 400 N·m knee-joint peak torque.") }, { title: l("操作配置", "Manipulation configuration"), detail: l("双 7 自由度手臂与 XHAND 1 五指手，操作空间直径 2.1 m。", "Dual 7-DoF arms with XHAND 1 hands and a 2.1 m workspace diameter.") }, { title: l("感知与算力", "Sensing and compute"), detail: l("双目视觉、3D 激光雷达、麦克风阵列，以及 80 + 275 TOPS 的公开算力配置。", "Binocular vision, 3D LiDAR, a microphone array, and a published 80 + 275 TOPS compute configuration.") }],
    applications: [l("物流分拣、搬运和仓内任务验证", "Logistics sorting, handling, and in-warehouse validation"), l("制造工位、质检和物料配送研究", "Manufacturing workstation, inspection, and material-delivery research"), l("具身数据采集和平台验证", "Embodied-data capture and platform validation")],
    imageUrl: "https://www.robotera.com/img/first.DPUn1msY.png", imageAlt: l("星动 L7 官方产品图", "Official ROBOTERA L7 product image"),
  },
  "exp-robotera-q5": {
    name: "Q5", url: ROBOTERA_Q5, rows: q5Rows,
    type: l("轮式人形与移动操作机器人", "Wheeled humanoid mobile-manipulation robot"),
    integration: l("轮式底盘、双 7 自由度手臂、XHAND 1 Lite、3D 激光雷达、深度视觉和全身遥操作。", "Combines a wheeled base, dual 7-DoF arms, XHAND 1 Lite hands, 3D LiDAR, depth vision, and full-body teleoperation."),
    verification: l("核对 10 kg 是否为双臂合计、满载续航测试工况、底盘导航接口和 44 自由度中主动 / 被动自由度定义。", "Verify whether 10 kg is a combined dual-arm figure, the loaded-runtime test condition, chassis navigation interfaces, and active/passive definitions within the 44 DoF."),
    overview: [l("Q5 用轮式底盘换取紧凑空间移动和超过 2 m 的垂直操作覆盖，定位于教育、医疗、商业与服务等室内场景。", "Q5 uses a wheeled base for compact indoor mobility and a vertical reach extending beyond 2 m, targeting education, healthcare, commercial, and service environments."), l("页面提供从遥操作采集、数据处理、训练、仿真到真机部署的流程说明，但未公开导航精度、最高速度、接口清单或安全认证。", "The page outlines teleoperation capture, processing, training, simulation, and deployment, but does not publish navigation accuracy, maximum speed, a full interface list, or safety certification.")],
    highlights: [{ title: l("紧凑底盘", "Compact chassis"), detail: l("582 × 519 mm 底盘平面，2 个驱动轮与 4 个万向轮。", "582 × 519 mm chassis footprint with two drive wheels and four casters.") }, { title: l("操作覆盖", "Manipulation coverage"), detail: l("1380 mm 臂展、0–2 m 可达范围、双臂最大负载 10 kg。", "1380 mm arm span, 0–2 m reach range, and 10 kg maximum dual-arm payload.") }, { title: l("数据链路", "Data workflow"), detail: l("支持数据手套、VR 等遥操作，并公开六步数据闭环。", "Supports data-glove and VR teleoperation and publishes a six-step data loop.") }],
    applications: [l("导览、接待和室内服务验证", "Guidance, reception, and indoor-service validation"), l("轮式移动操作与遥操作数采", "Wheeled manipulation and teleoperation data capture")],
    imageUrl: "https://www.robotera.com/img/Q5.19q0389L.png", imageAlt: l("星动 Q5 官方产品图", "Official ROBOTERA Q5 product image"),
  },
  "exp-robotera-m7": {
    name: "M7", url: ROBOTERA_M7, rows: m7Rows,
    type: l("全尺寸半身人形操作平台", "Full-size upper-body humanoid manipulation platform"),
    integration: l("半身立柱、双 7 自由度手臂、双 XHAND 1、深度视觉、3D 激光雷达与 Meta Quest 遥操作。", "Combines an upper-body column, dual 7-DoF arms, dual XHAND 1 hands, depth vision, 3D LiDAR, and Meta Quest teleoperation."),
    verification: l("确认 65 kg 重量是否包含立柱和末端、M7 与 L7 的迁移软件边界，以及 2.1 m 工作空间的安装基准。", "Confirm whether the 65 kg mass includes the column and end effectors, the software-transfer boundary between M7 and L7, and the mounting datum for the 2.1 m workspace."),
    overview: [l("M7 把 L7 的上肢操作配置做成半身平台，面向工作台全域操作、遥操作采集和算法迁移。", "M7 packages the L7 upper-body manipulation configuration as a workbench platform for broad workspace operation, teleoperation capture, and algorithm transfer."), l("官网公开 43 个含手自由度和 19 个不含手半身自由度。两只 12 自由度手解释了两种统计口径的差值，检索时必须保留“含手 / 不含手”条件。", "The page publishes 43 DoF with hands and 19 upper-body DoF without hands. Two 12-DoF hands explain the difference, so queries must retain the with/without-hand condition.")],
    highlights: [{ title: l("工作空间", "Workspace"), detail: l("717 mm 手臂、1660 mm 不含手臂展、2.1 m 操作空间直径。", "717 mm arms, 1660 mm wingspan without hands, and a 2.1 m workspace diameter.") }, { title: l("自由度口径", "DoF definition"), detail: l("不含手 19，自带双 12 自由度手后总计 43。", "19 without hands and 43 total with two 12-DoF hands.") }, { title: l("遥操作", "Teleoperation"), detail: l("Meta Quest 与 Intel RealSense / 立体视觉。", "Meta Quest with Intel RealSense / stereo vision.") }],
    applications: [l("物流分拣、扫码和柔性工作台任务", "Logistics sorting, scanning, and flexible workbench tasks"), l("操作数据采集和高阶技能研究", "Manipulation-data capture and advanced-skill research")],
    imageUrl: "https://www.robotera.com/img/m7.CKumIKR1.png", imageAlt: l("星动 M7 官方产品图", "Official ROBOTERA M7 product image"),
  },
  "exp-robotera-xhand1": {
    name: "XHAND 1", url: ROBOTERA_XHAND, rows: xhandRows,
    type: l("12 主动自由度全直驱五指灵巧手", "12-active-DoF fully direct-driven five-finger hand"),
    integration: l("支持 Ubuntu、C++、Python、ROS 1/2、x86/ARM、RS485、EtherCAT 以及 VR / 手套 / 外骨骼遥操作。", "Supports Ubuntu, C++, Python, ROS 1/2, x86/ARM, RS485, EtherCAT, and VR/glove/exoskeleton teleoperation."),
    verification: l("分别核对当前网页和历史手册的尺寸与侧摆口径；触觉、负载、寿命、通信速率和 10 CPS 均按交付批次实测。", "Reconcile current-page and brochure dimensions and lateral-motion definitions; validate tactile sensing, payload, life, communication rate, and 10 CPS on the delivered revision."),
    overview: [l("XHAND 1 采用 12 个主动自由度，拇指和食指各 3 个，其余三指各 2 个，可执行五指对指和类人抓握。", "XHAND 1 uses 12 active DoF: three each in the thumb and index finger and two in each remaining finger, supporting thumb opposition and anthropomorphic grasping."), l("当前网页公开完整的机械、动态、感知、软件、可靠性和电气参数；官方产品手册另给出握力、负载、抓握直径和活动角度。两处存在小幅版本差异，本库保留而不抹平。", "The current page publishes mechanical, dynamic, sensing, software, reliability, and electrical fields. An official brochure adds force, payload, grasp diameter, and angular motion. Small revision differences are preserved rather than flattened.")],
    highlights: [{ title: l("全直驱", "Fully direct drive"), detail: l("12 主动自由度、0 被动自由度，可输出位置、扭矩、刚度和阻尼控制参数。", "12 active and zero passive DoF with position, torque, stiffness, and damping control parameters.") }, { title: l("环绕触觉", "Wraparound tactile sensing"), detail: l("五指各 120 点、270° 三维触觉阵列，并输出温度、面积、振动和滑动趋势。", "A 120-point, 270° 3D tactile array on each fingertip plus temperature, area, vibration, and slip-trend outputs.") }, { title: l("系统集成", "System integration"), detail: l("24–72 V，RS485 / EtherCAT，Ubuntu、ROS 1/2 和跨架构 SDK。", "24–72 V, RS485/EtherCAT, Ubuntu, ROS 1/2, and a cross-architecture SDK.") }],
    applications: [l("强化学习、模仿学习与柔顺力控", "Reinforcement learning, imitation learning, and compliant force control"), l("遥操作数采、机械臂和人形机器人集成", "Teleoperation capture and robot-arm or humanoid integration")],
    imageUrl: "https://www.robotera.com/img/xhand.Bd5RxxFT.png", imageAlt: l("星动 XHAND 1 官方产品图", "Official ROBOTERA XHAND 1 product image"),
  },
  "exp-robotera-xhand1-lite": {
    name: "XHAND 1 Lite", url: ROBOTERA_LITE, rows: liteRows,
    type: l("6 主动 + 5 被动自由度五指灵巧手", "Five-finger hand with 6 active and 5 passive DoF"),
    integration: l("通过 EtherCAT 或 RS485（USB）接入，提供位置与电流环力控；适配 Q5 等机器人本体。", "Connects through EtherCAT or RS485 (USB), with position and current-loop force control; used on platforms including Q5."),
    verification: l("确认左右手版本、是否包含触觉、12 N“指尖负载”的测量定义、通信固件和被动关节回差。", "Confirm handedness, tactile availability, the measurement definition of the 12 N fingertip load, communication firmware, and passive-joint backlash."),
    overview: [l("XHAND 1 Lite 以 730 g 和 32 mm 厚度降低末端负担，采用 6 个主动与 5 个被动自由度。", "XHAND 1 Lite reduces end-effector load with a 730 g mass and 32 mm thickness, using six active and five passive DoF."), l("它保留可反驱、五指对指、位置 / 电流环控制和百万次空载抓取测试，但官网当前未公开工作电压、触觉配置或整手载荷。", "It retains backdrivability, thumb opposition, position/current-loop control, and a million-cycle no-load test, while the current page does not publish operating voltage, tactile configuration, or whole-hand payload.")],
    highlights: [{ title: l("轻量尺寸", "Compact form"), detail: l("730 g，209 × 84 × 32 mm。", "730 g and 209 × 84 × 32 mm.") }, { title: l("混合自由度", "Hybrid DoF"), detail: l("6 主动 + 5 被动，共 11 自由度。", "Six active plus five passive, 11 DoF total.") }, { title: l("通信与控制", "Communication and control"), detail: l("EtherCAT 100 Mbps、RS485 3 Mbps；位置和电流环力控。", "EtherCAT at 100 Mbps, RS485 at 3 Mbps, and position/current-loop force control.") }],
    applications: [l("轻量人形末端与轮式服务机器人", "Lightweight humanoid end effectors and wheeled service robots"), l("遥操作、抓取和数据采集研究", "Teleoperation, grasping, and data-capture research")],
    imageUrl: "https://www.robotera.com/img/first.88-kd8ow.png", imageAlt: l("星动 XHAND 1 Lite 官方产品图", "Official ROBOTERA XHAND 1 Lite product image"),
  },
  "exp-robotera-xhand1-pro": {
    name: "XHAND 1 PRO", url: ROBOTERA_PRO, rows: proRows,
    type: l("21 主动自由度全掌触觉五指灵巧手", "21-active-DoF full-palm tactile five-finger hand"),
    integration: l("24–72 V 宽压输入，支持 EtherCAT、RS485、CAN FD、Ubuntu、ROS 1/2、x86/ARM 及多种遥操作设备。", "Uses 24–72 V input and supports EtherCAT, RS485, CAN FD, Ubuntu, ROS 1/2, x86/ARM, and multiple teleoperation devices."),
    verification: l("按握拳测试复核 15 N 指尖力，并对 18 个触觉传感器、4 kHz 力控带宽、背隙、重复精度和带载寿命逐项验收。", "Recheck the 15 N fingertip force using the stated fist-clench method and validate all 18 tactile sensors, 4 kHz force-control bandwidth, backlash, repeatability, and loaded life."),
    overview: [l("XHAND 1 PRO 将主动自由度提高到 21，并把 18 个触觉传感器分布到指尖、指腹和手掌。", "XHAND 1 PRO raises active DoF to 21 and distributes 18 tactile sensors across fingertips, finger pads, and the palm."), l("官网将该型号定位为面向 VLA、世界模型、强化学习和高保真数据采集的研究与开发末端。公开的高频、背隙、重复精度和寿命仍是厂商测试数据，应在目标控制器和任务下复验。", "The official page positions it for VLA, world-model, reinforcement-learning, and high-fidelity data work. Published frequency, backlash, repeatability, and life remain manufacturer test figures requiring validation on the target controller and task.")],
    highlights: [{ title: l("21 主动自由度", "21 active DoF"), detail: l("全部支持反驱，并增加侧掌独立自由度。", "All are backdrivable, including an independently actuated lateral palm DoF.") }, { title: l("全掌触觉", "Full-palm tactile sensing"), detail: l("18 个传感器，0.1–25 N 量程、0.01 N 分辨率，并支持 10 mm 接近检测。", "18 sensors, 0.1–25 N range, 0.01 N resolution, and 10 mm proximity detection.") }, { title: l("精度与控制", "Precision and control"), detail: l("Pitch 重复精度 ±0.1 mm、单关节背隙 <±0.25 mm、4 kHz 电流环力控带宽。", "±0.1 mm pitch repeatability, <±0.25 mm single-joint backlash, and 4 kHz current-loop force-control bandwidth.") }],
    applications: [l("VLA、世界模型和强化学习策略执行", "VLA, world-model, and reinforcement-learning policy execution"), l("全掌触觉数据采集与高精度遥操作", "Full-palm tactile data capture and high-precision teleoperation")],
    imageUrl: "https://www.robotera.com/img/pro-h5.CfDjJ23h.png", imageAlt: l("星动 XHAND 1 PRO 官方产品图", "Official ROBOTERA XHAND 1 PRO product image"),
  },
};

const roboteraProfile = (locale: Locale, profile: FinderExpansionRecord["profile"]): FinderExpansionRecord["profile"] => ({
  ...profile,
  slug: "robotera",
  valueChainRole: locale === "zh" ? "人形机器人、灵巧手、具身模型与数据闭环平台厂商" : "Humanoid, dexterous-hand, embodied-model, and data-loop platform company",
  positioning: locale === "zh" ? "本体、末端、VLA 模型和数据训练链路一体化布局。" : "An integrated body, end-effector, VLA-model, and data-training stack.",
  strengths: locale === "zh" ? ["全尺寸与轮式人形本体", "全驱多指灵巧手", "遥操作和 VLA 数据闭环"] : ["Full-size and wheeled humanoids", "Fully actuated multi-finger hands", "Teleoperation and VLA data loops"],
  products: ["L7", "Q5", "M7", "XHAND 1", "XHAND 1 Lite", "XHAND 1 PRO", "ERA-42"],
  fit: locale === "zh" ? ["具身科研与数据采集", "物流、制造和服务验证", "灵巧操作与模型部署"] : ["Embodied research and data capture", "Logistics, manufacturing, and service validation", "Dexterous manipulation and model deployment"],
  questions: locale === "zh" ? ["需要哪种本体和手部版本？", "控制、感知、SDK 与遥操作权限开放到什么程度？", "厂商测试指标如何转换为现场验收？"] : ["Which body and hand edition is required?", "What control, sensing, SDK, and teleoperation access is provided?", "How will manufacturer test figures translate into site acceptance?"],
  reviewedAt: "2026-09-04",
  legalName: locale === "zh" ? "北京星动纪元科技股份有限公司" : "Beijing Xingdongjiyuan Technology Co., Ltd.",
  country: locale === "zh" ? "中国" : "China",
  headquarters: locale === "zh" ? "北京" : "Beijing",
  founded: "2023-08",
  officialUrl: ROBOTERA_HOME,
  overview: locale === "zh" ? ["公司于 2023 年 8 月在北京成立，产品覆盖人形本体、五指灵巧手和 ERA-42 VLA 模型。"] : ["Founded in Beijing in August 2023, the company publishes humanoid bodies, five-finger hands, and the ERA-42 VLA model."],
  businessAreas: locale === "zh" ? ["人形机器人", "灵巧手", "VLA 模型与数据工具链"] : ["Humanoid robots", "Dexterous hands", "VLA models and data tooling"],
  customerGroups: locale === "zh" ? ["科研、物流、制造、服务和机器人集成团队"] : ["Research, logistics, manufacturing, service, and robotics-integration teams"],
  milestones: locale === "zh" ? [{ date: "2023-08", event: "公司成立。" }, { date: "2025-07", event: "官网披露近 5 亿元 A 轮融资。" }, { date: "2026-03", event: "官网披露 10 亿元战略轮融资。" }, { date: "2026-04", event: "官网披露超过 2 亿美元新一轮融资。" }] : [{ date: "2023-08", event: "Company founded." }, { date: "2025-07", event: "Official page reported a nearly RMB 500 million Series A." }, { date: "2026-03", event: "Official site reported an RMB 1 billion strategic round." }, { date: "2026-04", event: "Official site reported a new round exceeding USD 200 million." }],
  catalogScope: locale === "zh" ? "当前官网 6 个硬件型号及单列的 ERA-42 模型平台。" : "Six current hardware models plus the separately presented ERA-42 model platform.",
  catalogCoverage: "family-complete",
});

export const applyRoboteraProductPatch = (record: FinderExpansionRecord, locale: Locale): FinderExpansionRecord => {
  const patch = productPatches[record.id];
  if (!patch) return record;
  const productSourceLabel = locale === "zh" ? "星动纪元官方产品页" : "ROBOTERA official product page";
  const sourceLinks = [
    { label: productSourceLabel, url: patch.url },
    { label: locale === "zh" ? "星动纪元公司介绍" : "ROBOTERA company introduction", url: ROBOTERA_ABOUT },
  ];
  if (record.id === "exp-robotera-xhand1") {
    sourceLinks.push({ label: locale === "zh" ? "XHAND 1 官方产品手册" : "XHAND 1 official brochure", url: ROBOTERA_XHAND_PDF });
  }
  return {
    ...record,
    reviewedAt: "2026-09-04",
    product: patch.name,
    company: locale === "zh" ? "星动纪元" : "ROBOTERA",
    officialUrl: patch.url,
    type: t(locale, patch.type),
    openness: locale === "zh" ? "官网公开型号级产品页、参数区和开发能力说明" : "The official site publishes a model page, specification section, and development-capability description",
    integration: t(locale, patch.integration),
    verificationFocus: t(locale, patch.verification),
    parameters: verifiedSpecs(locale, patch.url, patch.rows),
    catalogCoverage: "family-complete",
    catalogScope: locale === "zh" ? "已覆盖当前官方型号页参数区；XHAND 1 另合并官方产品手册中的补充参数并保留版本差异。" : "Covers the current official model-page specification section; XHAND 1 also incorporates supplementary official-brochure fields while preserving revision differences.",
    profile: roboteraProfile(locale, record.profile),
    evidence: {
      level: "model",
      specificationKind: "parameters",
      specificationCoverage: "official-complete",
      specificationCoverageNote: locale === "zh"
        ? "已逐项转录当前官方型号页公开的参数和配置字段；XHAND 1 的官方手册补充项及冲突值按来源分开保存。"
        : "Every parameter and configuration field published on the current official model page has been transcribed; XHAND 1 brochure additions and conflicting revisions are stored separately by source.",
      imageUrl: patch.imageUrl,
      imageAlt: t(locale, patch.imageAlt),
      imageSourceUrl: patch.url,
      imageCredit: locale === "zh" ? "图片：星动纪元官网" : "Image: ROBOTERA official site",
      overview: patch.overview.map((item) => t(locale, item)),
      highlights: patch.highlights.map((item) => ({ title: t(locale, item.title), detail: t(locale, item.detail) })),
      applications: patch.applications.map((item) => t(locale, item)),
      disclosureBoundary: locale === "zh"
        ? "“完整”仅指当前引用官方页面已公开字段的完整转录，不表示厂商公开了安全认证、故障率、全部接口时序、价格或交付配置。"
        : "Complete means complete transcription of fields published in the cited current official material; it does not imply disclosure of safety certification, failure rate, full interface timing, price, or delivery configuration.",
      sourceLinks,
    },
  };
};

const toFinderProfile = (company: CompanyProfile): FinderExpansionRecord["profile"] => ({
  slug: company.slug,
  valueChainRole: company.valueChainRole ?? "",
  positioning: company.positioning,
  strengths: company.strengths ?? [],
  products: company.products,
  fit: company.fit ?? [],
  questions: company.presalesQuestions,
  sourceIds: company.sourceIds,
  reviewedAt: company.reviewedAt,
  legalName: company.legalName,
  country: company.country,
  headquarters: company.headquarters,
  founded: company.founded,
  officialUrl: company.officialUrl,
  overview: company.overview,
  businessAreas: company.businessAreas,
  customerGroups: company.customerGroups,
  milestones: company.milestones,
  catalogScope: company.catalogScope,
  catalogCoverage: company.catalogCoverage,
});

export const getRoboteraAdditionalProductRecords = (locale: Locale, company: CompanyProfile): FinderExpansionRecord[] => [{
  id: "verified-robotera-era-42",
  matrixSlug: "robot-model-software-compute",
  matrixTitle: locale === "zh" ? "机器人模型、软件与计算平台矩阵" : "Robot models, software, and compute platforms",
  industry: "robotics",
  reviewedAt: "2026-09-04",
  product: "ERA-42",
  company: company.name,
  type: locale === "zh" ? "端到端 VLA 具身模型平台" : "End-to-end VLA embodied-model platform",
  openness: locale === "zh" ? "官网公开模型路线、论文时间线和部分任务结果" : "The official site publishes the model direction, paper timeline, and selected task results",
  integration: locale === "zh" ? "连接人形本体、灵巧手、遥操作数据、模型训练、仿真校验和真机部署。" : "Connects humanoid bodies, dexterous hands, teleoperation data, model training, simulation validation, and real-robot deployment.",
  verificationFocus: locale === "zh" ? "按具体论文、代码或交付版本核对模型权重、训练数据、支持本体、输入输出、推理算力、许可证与复现实验。" : "For each paper, code release, or delivered version, verify weights, training data, supported embodiments, inputs and outputs, inference compute, licensing, and reproducibility.",
  sourceIds: company.sourceIds,
  officialUrl: ROBOTERA_MODEL,
  category: "model-software",
  useCases: ["research", "logistics", "manufacturing", "integration"],
  opennessLevel: "documented",
  parameters: verifiedSpecs(locale, ROBOTERA_MODEL, [
    { label: l("模型类型", "Model type"), value: l("端到端视觉-语言-动作（VLA）具身模型", "End-to-end vision-language-action (VLA) embodied model") },
    { label: l("公开研究方向", "Published research directions"), value: l("VLA、在线强化学习、世界模型与操作策略", "VLA, online reinforcement learning, world models, and manipulation policies") },
    { label: l("公开本体链路", "Published embodiment path"), value: l("L7 / M7 / Q5 与 XHAND 系列", "L7 / M7 / Q5 and the XHAND family") },
    { label: l("产品公开形态", "Public product form"), value: l("官网模型平台与论文时间线；未公开固定商业 API 规格表", "Official model platform and paper timeline; no fixed commercial API specification table is published") },
  ]),
  catalogPrimary: "software-tools",
  catalogSubclass: "robot-model",
  catalogCoverage: "family-complete",
  catalogScope: locale === "zh" ? "按官网 ERA-42 页面记录公开模型能力；不同论文和版本不合并为一个固定性能值。" : "Records public capabilities from the official ERA-42 page; different papers and revisions are not merged into one fixed performance figure.",
  profile: toFinderProfile(company),
  evidence: {
    level: "platform",
    specificationKind: "capabilities",
    specificationCoverage: "capability-only",
    specificationCoverageNote: locale === "zh" ? "官网公开研究路线和论文节点，但没有稳定、完整的商业模型参数表。" : "The official site publishes a research roadmap and paper milestones but not a stable, complete commercial model specification table.",
    overview: locale === "zh" ? ["ERA-42 是星动纪元单列的端到端 VLA 模型路线，官网按时间展示 VLA、在线强化学习和世界模型等研究进展。", "该记录用于检索模型能力和支持链路，不把论文实验结果当作所有机器人、所有任务上的通用性能。"] : ["ERA-42 is ROBOTERA's separately presented end-to-end VLA model direction, with an official timeline covering VLA, online reinforcement learning, and world-model research.", "This record supports capability and integration search without treating paper results as universal performance across robots and tasks."],
    applications: locale === "zh" ? ["具身操作策略、模型训练、仿真与真机部署研究"] : ["Embodied-manipulation policy, model training, simulation, and real-robot deployment research"],
    disclosureBoundary: locale === "zh" ? "未公开固定商业 API、权重授权、训练数据清单或统一基准配置时，不作推断。" : "No inference is made where a fixed commercial API, weight license, training-data inventory, or unified benchmark configuration is not published.",
    sourceLinks: [{ label: locale === "zh" ? "ERA-42 官方页面" : "ERA-42 official page", url: ROBOTERA_MODEL }, { label: locale === "zh" ? "星动纪元官网产品目录" : "ROBOTERA official product catalog", url: ROBOTERA_HOME }],
  },
}];
