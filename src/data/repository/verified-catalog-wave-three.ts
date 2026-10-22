import type { Locale } from "../site";
import type { CompanyProfile } from "./catalog";
import type {
  FinderCategory,
  FinderExpansionRecord,
  FinderParameter,
  FinderSpecificationCoverage,
  FinderUseCase,
} from "./product-finder-demo";

type Localized = { zh: string; en: string };
type SpecRow = {
  label: Localized;
  value: Localized;
  conditions?: Localized;
  locator?: Localized;
  sourceUrl?: string;
  sourceLabel?: Localized;
};

type ProductSeed = {
  id: string;
  product: string;
  pageUrl: string;
  datasheetUrl?: string;
  category: FinderCategory;
  primary: string;
  subclass: string;
  useCases: FinderUseCase[];
  type: Localized;
  integration: Localized;
  verification: Localized;
  rows: SpecRow[];
  overview: Localized[];
  highlights: Array<{ title: Localized; detail: Localized }>;
  applications: Localized[];
  coverage?: FinderSpecificationCoverage;
  level?: "model" | "family" | "platform";
  specificationKind?: "parameters" | "capabilities";
};

const l = (zh: string, en: string): Localized => ({ zh, en });
const t = (locale: Locale, value: Localized) => value[locale];

const ONROBOT_HOME = "https://onrobot.com/";
const ONROBOT_ABOUT = "https://onrobot.com/en/about-us";

const productUrl = (slug: string) => `https://onrobot.com/en/products/${slug}`;
const datasheetUrl = (folder: string, file: string) => `https://onrobot.com/storage/datasheets/${folder}/${file}`;

const sourceNames = {
  page: l("OnRobot 官方产品页", "OnRobot official product page"),
  datasheet: l("OnRobot 官方数据表", "OnRobot official datasheet"),
  security: l("OnRobot 官方安全概览", "OnRobot official security overview"),
};

const manufacturerConditions = l(
  "数值来自厂商公开数据表；负载、速度、寿命和精度会受安装、重心、加速度、工件、工具、环境与软件版本影响，采购前需按目标工况复核。",
  "Figures come from manufacturer datasheets. Payload, speed, life, and accuracy depend on mounting, center of gravity, acceleration, workpiece, tooling, environment, and software revision and require application-specific verification before purchase.",
);

const conditions = (zh: string, en: string) => l(zh, en);
const row = (zh: string, en: string, valueZh: string, valueEn = valueZh, rowConditions?: Localized): SpecRow => ({
  label: l(zh, en),
  value: l(valueZh, valueEn),
  conditions: rowConditions,
});

const withSource = (sourceUrl: string, sourceLabel: Localized, rows: SpecRow[]) => rows.map((item) => ({
  ...item,
  sourceUrl,
  sourceLabel,
}));

const electricalRows = (
  supply: string,
  current: string,
  operating = "5–50 °C",
  storage = "0–60 °C",
): SpecRow[] => [
  row("供电电压", "Power supply", supply),
  row("电流消耗", "Current consumption", current),
  row("工作温度", "Operating temperature", operating),
  row("存储温度", "Storage temperature", storage),
  row("相对湿度", "Relative humidity", "0–95%，无凝露", "0–95%, non-condensing"),
];

const warrantyRow = row(
  "保修口径",
  "Warranty basis",
  "3 年或 3,000,000 次循环，以先到者为准",
  "3 years or 3,000,000 cycles, whichever comes first",
  conditions("一个循环按一次完整夹持与释放定义；以正式保修条款为准。", "One cycle is one complete grip-and-release sequence; the formal warranty terms remain authoritative."),
);

const companyProducts = [
  "RG2", "RG6", "RG2-FT", "2FG7", "2FG14", "2FGP20", "3FG15", "3FG25",
  "VG10", "VGC10", "VGP20", "VGP30", "MG10", "Gecko SP1", "Gecko SP3", "Gecko SP5",
  "Soft Gripper SG-a-H", "Soft Gripper SG-a-S", "Soft Gripper SG-b-H", "OnRobot Eyes",
  "OnRobot Screwdriver", "OnRobot Sander", "HEX-E", "HEX-H", "LIFT100", "Quick Changer",
  "Dual Quick Changer", "Dual Mounting Kit", "Pallet Station", "D:PLOY Palletizing",
  "D:PLOY CNC Machine Tending", "D:PLOY Packaging", "D:PLOY Transferring", "WebLytics",
];

const onRobotCompanyPatch = (company: CompanyProfile, locale: Locale): CompanyProfile => ({
  ...company,
  name: "OnRobot",
  englishName: "OnRobot",
  legalName: "OnRobot A/S",
  country: locale === "zh" ? "丹麦" : "Denmark",
  headquarters: locale === "zh" ? "欧登塞" : "Odense",
  founded: "2018",
  officialUrl: ONROBOT_HOME,
  valueChainRole: locale === "zh"
    ? "工业与协作机器人末端工具、应用软件和快速部署方案厂商"
    : "Industrial and collaborative robot end-of-arm tooling, application-software, and rapid-deployment supplier",
  positioning: locale === "zh"
    ? "OnRobot 围绕统一机械与电气接口提供夹爪、真空与磁性抓具、力/矩传感、视觉、工艺工具、工具快换、升降轴以及 D:PLOY 和 WebLytics 软件。"
    : "OnRobot supplies grippers, vacuum and magnetic tooling, force/torque sensing, vision, process tools, tool changing, a lift axis, and D:PLOY and WebLytics software around a common mechanical and electrical interface.",
  strengths: locale === "zh" ? [
    "跨主流工业与协作机器人品牌的末端工具组合",
    "覆盖抓取、视觉、力控、打磨、锁付和码垛的应用链路",
    "统一快换、控制和部署软件生态",
  ] : [
    "End-of-arm portfolio across major industrial and collaborative robot brands",
    "Application coverage spanning gripping, vision, force control, sanding, screwdriving, and palletizing",
    "Common tool-changing, control, and deployment-software ecosystem",
  ],
  products: companyProducts,
  fit: locale === "zh" ? [
    "机床上下料、装配和物料搬运",
    "包装、码垛、拣选与分拣",
    "打磨、抛光、去毛刺、检测与螺丝锁付",
    "多品牌机器人工作站标准化和快速换产",
  ] : [
    "Machine tending, assembly, and material handling",
    "Packaging, palletizing, picking, and sorting",
    "Sanding, polishing, deburring, inspection, and screwdriving",
    "Multi-brand robot-cell standardization and rapid changeover",
  ],
  overview: locale === "zh" ? [
    "OnRobot A/S 于 2018 年由 On Robot、OptoForce 与 Perception Robotics 合并成立，总部位于丹麦欧登塞。公司官网称其产品通过 700 多家分销和系统集成合作伙伴提供，并采用统一的 One System 平台适配多种机器人品牌。",
    "公开目录不只是夹爪：它同时覆盖 2.5D 视觉、六轴力/矩传感器、砂光和锁付工具、LIFT100 第七轴、快换与码垛附件，以及面向码垛、机床上下料、包装和搬运的 D:PLOY 软件。不同产品的负载、IP 等级、电源和兼容边界差异明显，不能用系列摘要替代型号数据表。",
    "本仓库把组合型号拆开保存，例如 Gecko SP1/SP3/SP5、HEX-E/HEX-H 和三种 Soft Gripper 工具，以免参数检索把某一变体的数值错误扩展到整个系列。D:PLOY 和 WebLytics 以能力记录收录，因为其公开资料没有类似机械产品的统一数值规格表。",
  ] : [
    "OnRobot A/S was formed in 2018 through the merger of On Robot, OptoForce, and Perception Robotics and is headquartered in Odense, Denmark. The company states that its products are supplied through more than 700 distribution and system-integration partners and use the common One System platform across multiple robot brands.",
    "The public catalog extends beyond grippers to 2.5D vision, six-axis force/torque sensors, sanding and screwdriving tools, the LIFT100 seventh axis, changers and palletizing accessories, and D:PLOY software for palletizing, machine tending, packaging, and transferring. Payload, IP rating, power, and compatibility differ materially by product, so model datasheets cannot be replaced by family summaries.",
    "This repository separates combined families such as Gecko SP1/SP3/SP5, HEX-E/HEX-H, and the three Soft Gripper tools so one variant's values are not attributed to every variant. D:PLOY and WebLytics remain capability records because their public material does not expose a mechanical-style unified numeric specification table.",
  ],
  businessAreas: locale === "zh" ? [
    "电动、真空、磁性和仿生夹持工具",
    "视觉与六轴力/矩感知",
    "打磨、抛光和螺丝锁付工艺工具",
    "工具快换、第七轴和码垛工作站组件",
    "机器人应用部署、监控和诊断软件",
  ] : [
    "Electric, vacuum, magnetic, and gecko-inspired gripping",
    "Vision and six-axis force/torque sensing",
    "Sanding, polishing, and screwdriving process tools",
    "Tool changing, seventh-axis, and palletizing cell components",
    "Robot-application deployment, monitoring, and diagnostics software",
  ],
  customerGroups: locale === "zh" ? [
    "工业与协作机器人系统集成商",
    "制造、汽车、航空航天、食品、包装和物流企业",
    "需要标准化多品牌工作站的自动化团队",
    "需要生产监控、快速换产和应用复用的终端用户",
  ] : [
    "Industrial and collaborative robot system integrators",
    "Manufacturing, automotive, aerospace, food, packaging, and logistics operators",
    "Automation teams standardizing cells across robot brands",
    "End users requiring production monitoring, fast changeover, and reusable applications",
  ],
  milestones: locale === "zh" ? [
    { date: "2018", event: "On Robot、OptoForce 和 Perception Robotics 合并成立 OnRobot A/S，并收购 Purple Robotics。" },
    { date: "2019", event: "RG2-FT 与 Gecko 商业化，并推出统一机械和电气接口的 One-System Solution。" },
    { date: "2020", event: "推出 3FG15、Soft Gripper、2FG7、Eyes、Screwdriver 和 Sander。" },
    { date: "2021", event: "推出 MG10、VGP20、WebLytics 和 OnRobot LEARN。" },
    { date: "2022", event: "推出 2FGP20、LIFT100 与 Pallet Station。" },
    { date: "2023", event: "推出 D:PLOY 应用部署平台。" },
    { date: "2024", event: "推出由 D:PLOY 驱动、与集成伙伴交付的即用型方案。" },
    { date: "2025", event: "推出面向重载码垛和搬运的 VGP30。" },
  ] : [
    { date: "2018", event: "On Robot, OptoForce, and Perception Robotics merged to form OnRobot A/S, which also acquired Purple Robotics." },
    { date: "2019", event: "RG2-FT and Gecko became commercially available and the common mechanical/electrical One-System Solution launched." },
    { date: "2020", event: "3FG15, Soft Gripper, 2FG7, Eyes, Screwdriver, and Sander launched." },
    { date: "2021", event: "MG10, VGP20, WebLytics, and OnRobot LEARN launched." },
    { date: "2022", event: "2FGP20, LIFT100, and Pallet Station launched." },
    { date: "2023", event: "The D:PLOY application-deployment platform launched." },
    { date: "2024", event: "Off-the-shelf solutions powered by D:PLOY and delivered with integration partners were introduced." },
    { date: "2025", event: "VGP30 launched for high-payload palletizing and material handling." },
  ],
  catalogScope: locale === "zh"
    ? "已拆分当前官方产品目录中的具名硬件型号、Gecko/HEX/Soft Gripper 变体、四种 D:PLOY 应用和 WebLytics。官方附件页中的独立指尖、吸盘、支架和备件 SKU 尚未全部建成独立产品记录。"
    : "Named hardware products in the current official catalog, Gecko/HEX/Soft Gripper variants, four D:PLOY applications, and WebLytics are separated. Individual fingertip, suction-cup, bracket, and spare-part SKUs on the accessories page are not yet all standalone records.",
  catalogCoverage: "model-partial",
  verificationFocus: locale === "zh"
    ? "按具体机器人、法兰、工具侧/机器人侧部件、控制器、线缆、软件许可、工件重心、加速度和现场安全评估确认最终配置。"
    : "Confirm the final configuration against the exact robot, flange, tool-side and robot-side parts, controller, cabling, software license, workpiece center of gravity, acceleration, and site risk assessment.",
  presalesQuestions: locale === "zh" ? [
    "工件材质、形状、尺寸、质量、表面和允许夹痕如何定义，负载是否包含工具和偏心矩？",
    "目标机器人、法兰、控制器和软件版本是否在当前兼容清单内，需要哪些 Compute Box、快换、线缆和许可？",
    "节拍、连续工况、断电保持、IP、清洁、食品接触、耗材和维护周期如何验收？",
  ] : [
    "How are workpiece material, shape, size, mass, surface, and permissible marking defined, and does payload account for tooling and offset moment?",
    "Are the target robot, flange, controller, and software revision in the current compatibility list, and which Compute Box, changer, cable, and license are required?",
    "How will cycle time, continuous duty, power-loss holding, IP protection, cleaning, food contact, consumables, and maintenance be accepted?",
  ],
  sourceIds: company.sourceIds,
  reviewedAt: "2026-09-04",
});

export const applyOnRobotCompanyPatch = (company: CompanyProfile, locale: Locale): CompanyProfile => (
  company.slug === "onrobot" ? onRobotCompanyPatch(company, locale) : company
);

const rg2Pdf = datasheetUrl("rg2", "datasheet_rg2_v1.8_en.pdf");
const rg6Pdf = datasheetUrl("rg6", "datasheet_rg6_v2.0_en.pdf");
const vgp30Pdf = datasheetUrl("vgp30", "datasheet_vgp30_v1.5_en.pdf");
const fg14Pdf = datasheetUrl("2fg14", "datasheet_2fg14_v1.3_en.pdf");
const fg7Pdf = datasheetUrl("2fg7", "datasheet_2fg7_v2.0_en.pdf");
const fgp20Pdf = datasheetUrl("2fgp20", "datasheet_2fgp20_v1.9_en.pdf");
const mg10Pdf = datasheetUrl("mg10", "datasheet_mg10_v1.5_en.pdf");
const geckoPdf = datasheetUrl("gecko", "datasheet_gecko_gripper_v1.5_en.pdf");
const fg15Pdf = datasheetUrl("3fg15", "datasheet_3fg15_v2.1_en.pdf");
const fg25Pdf = datasheetUrl("3fg25", "datasheet_3fg25_v1.3_en.pdf");
const vg10Pdf = datasheetUrl("vg10", "datasheet_vg10_v2.6_en.pdf");
const vgc10Pdf = datasheetUrl("vgc10", "datasheet_vgc10_v1.7_en.pdf");
const vgp20Pdf = datasheetUrl("vgp20", "datasheet_vgp20_v1.7_en.pdf");
const softPdf = datasheetUrl("soft", "datasheet_sg_base_part_and_sg_silicone_tools_v1.5_en.pdf");
const eyesPdf = datasheetUrl("eyes", "datasheet_eyes_v3.6_en.pdf");
const screwdriverPdf = datasheetUrl("screwdriver", "datasheet_screwdriver_v1.7_en.pdf");
const sanderPdf = datasheetUrl("sander", "datasheet_sander_v1.5_en.pdf");
const hexPdf = datasheetUrl("hex", "datasheet_hex-e_h_qc_v1.5_en.pdf");
const liftPdf = datasheetUrl("lift", "datasheet_lift100_v1.4_en.pdf");
const quickPdf = datasheetUrl("quick-changers", "datasheet_quick_changers_v2.0_en.pdf");
const palletPdf = datasheetUrl("pallet-station", "datasheet_pallet_station_v1.1_en.pdf");

const rgCommon = (
  payloadForce: string,
  payloadForm: string,
  stroke: string,
  force: string,
  speed: string,
  time: string,
  dimensions: string,
  weight: string,
): SpecRow[] => [
  row("力闭合负载", "Force-fit payload", payloadForce, payloadForce, manufacturerConditions),
  row("形闭合负载", "Form-fit payload", payloadForm, payloadForm, manufacturerConditions),
  row("总行程（可调）", "Total stroke (adjustable)", stroke),
  row("手指位置分辨率", "Finger position resolution", "0.1 mm"),
  row("重复精度", "Repetition accuracy", "典型 0.1 mm；最大 0.2 mm", "Typical 0.1 mm; maximum 0.2 mm"),
  row("反向间隙", "Reversing backlash", "0.1–0.3 mm"),
  row("夹持力（可调）", "Gripping force (adjustable)", force, force, manufacturerConditions),
  row("夹持力偏差", "Gripping-force deviation", "±25%"),
  row("夹持速度", "Gripping speed", speed, speed, manufacturerConditions),
  row("夹持时间", "Gripping time", time, time, conditions("按双指合计移动 8 mm 测得，速度与力设定相关。", "Based on 8 mm total movement between fingers; speed depends on force setting.")),
  row("可调支架倾斜精度", "Adjustable-bracket tilting accuracy", "<1°"),
  row("断电保持工件", "Hold workpiece on power loss", "是", "Yes"),
  row("电机", "Motor", "集成式电动 BLDC", "Integrated electric BLDC"),
  row("防护等级", "IP classification", "IP54"),
  row("尺寸", "Dimensions", dimensions),
  row("质量", "Weight", weight),
  ...electricalRows("20 / 24 / 25 V", "70–600 mA；释放时可能出现最高 3 A、最长 6 ms 的尖峰", "5–50 °C", "0–60 °C"),
  warrantyRow,
];

const rg2Rows = withSource(rg2Pdf, sourceNames.datasheet, rgCommon(
  "2 kg", "5 kg", "0–110 mm", "3–40 N", "38–127 mm/s", "0.06–0.21 s", "213 × 149 × 36 mm", "0.78 kg",
));

const rg6Rows = withSource(rg6Pdf, sourceNames.datasheet, rgCommon(
  "6 kg", "10 kg", "0–160 mm", "25–120 N", "51–140 mm/s", "0.05–0.15 s", "262 × 212 × 42 mm", "1.25 kg",
));

const rg2FtPage = productUrl("rg2-ft-finger-gripper");
const rg2FtRows: SpecRow[] = [
  row("力闭合负载", "Force-fit payload", "2 kg", "2 kg", manufacturerConditions),
  row("形闭合负载", "Form-fit payload", "4 kg", "4 kg", manufacturerConditions),
  row("总行程", "Total stroke", "100 mm"),
  row("手指位置分辨率", "Finger position resolution", "0.1 mm"),
  row("重复精度", "Repetition accuracy", "典型 0.1 mm；最大 0.2 mm", "Typical 0.1 mm; maximum 0.2 mm"),
  row("反向间隙", "Reversing backlash", "最小 0.2 mm；典型 0.4 mm；最大 0.6 mm", "Minimum 0.2 mm; typical 0.4 mm; maximum 0.6 mm"),
  row("夹持力", "Gripping force", "3–40 N", "3–40 N", manufacturerConditions),
  row("夹持速度档位", "Gripping speed settings", "55 / 110 / 184 mm/s", "55 / 110 / 184 mm/s", manufacturerConditions),
  row("夹持时间档位", "Gripping time settings", "0.04 / 0.07 / 0.11 s", "0.04 / 0.07 / 0.11 s", manufacturerConditions),
  row("可调支架倾斜精度", "Adjustable-bracket tilting accuracy", "<1°"),
  row("电机", "Motor", "集成式电动 BLDC", "Integrated electric BLDC"),
  row("防护等级", "IP classification", "IP54"),
  row("尺寸", "Dimensions", "219 × 149 × 49 mm"),
  row("质量", "Weight", "0.98 kg", "0.98 kg", conditions("旧版官方手册另有不含 Compute Box 的质量口径；必须按交付清单复核。", "An older official manual uses a different mass basis excluding the Compute Box; verify against the delivered configuration.")),
  row("力/矩额定量程", "Force/torque nominal range", "Fx/Fy 20 N；Fz 40 N；Tx/Ty 0.7 N·m；Tz 0.5 N·m", "Fx/Fy 20 N; Fz 40 N; Tx/Ty 0.7 N·m; Tz 0.5 N·m"),
  row("力/矩过载", "Force/torque overload", "额定量程的 200%", "200% of nominal range"),
  row("力/矩分辨率", "Force/torque resolution", "Fx/Fy 0.1 N；Fz 0.5 N；Tx/Ty 0.005 N·m；Tz 0.005 N·m", "Fx/Fy 0.1 N; Fz 0.5 N; Tx/Ty 0.005 N·m; Tz 0.005 N·m"),
  row("接近传感范围", "Proximity-sensor range", "0–100 mm"),
  row("接近传感精度", "Proximity-sensor accuracy", "±25%"),
  row("供电电压", "Power supply", "20 / 24 / 25 V"),
  row("电流消耗", "Current consumption", "按机器人接口与 Compute Box 配置复核", "Verify by robot interface and Compute Box configuration"),
  row("工作温度", "Operating temperature", "5–50 °C"),
  row("存储温度", "Storage temperature", "0–60 °C"),
  row("相对湿度", "Relative humidity", "0–95%，无凝露", "0–95%, non-condensing"),
].map((item) => ({ ...item, sourceUrl: rg2FtPage, sourceLabel: sourceNames.page }));

const twoFg14Rows = withSource(fg14Pdf, sourceNames.datasheet, [
  row("力闭合负载", "Force-fit payload", "14 kg", "14 kg", manufacturerConditions),
  row("形闭合负载", "Form-fit payload", "20 kg", "20 kg", manufacturerConditions),
  row("总行程", "Total stroke", "50 mm"),
  row("外夹范围（向内安装）", "External grip range (inward fingers)", "5–55 mm"),
  row("外夹范围（向外安装）", "External grip range (outward fingers)", "55–105 mm"),
  row("内撑范围（向内安装）", "Internal grip range (inward fingers)", "17.6–67.6 mm"),
  row("内撑范围（向外安装）", "Internal grip range (outward fingers)", "67.6–117.6 mm"),
  row("重复精度", "Repeatability", "±0.1 mm"),
  row("夹持力", "Gripping force", "40–280 N；容差 ±10 N", "40–280 N; tolerance ±10 N", manufacturerConditions),
  row("手指平台允许扭矩", "Permissible finger-platform torque", "X 轴 30 N·m；Y 轴 25 N·m", "X axis 30 N·m; Y axis 25 N·m"),
  row("夹持速度", "Gripping speed", "16–450 mm/s", "16–450 mm/s", manufacturerConditions),
  row("典型夹持时间", "Typical gripping time", "4 mm / 80 N 时 200 ms；80 mm / 150 N 时 300 ms", "200 ms at 4 mm / 80 N; 300 ms at 80 mm / 150 N", manufacturerConditions),
  row("断电保持工件", "Hold workpiece on power loss", "是", "Yes"),
  row("电机", "Motor", "集成式电动 BLDC", "Integrated electric BLDC"),
  row("防护等级", "IP classification", "IP67"),
  row("食品接触润滑脂", "Food-contact grease", "NSF H1；符合 FDA 21 CFR 178.3570", "NSF H1; compliant with FDA 21 CFR 178.3570"),
  row("尺寸", "Dimensions", "155.2 × 115 × 70 mm"),
  row("质量", "Weight", "1.5 kg"),
  ...electricalRows("20 / 24 / 25 V", "最大 2,000 mA", "0–50 °C", "0–60 °C"),
  warrantyRow,
]);

const twoFg7Rows = withSource(fg7Pdf, sourceNames.datasheet, [
  row("力闭合负载", "Force-fit payload", "7 kg", "7 kg", manufacturerConditions),
  row("形闭合负载", "Form-fit payload", "11 kg", "11 kg", manufacturerConditions),
  row("总行程", "Total stroke", "38 mm"),
  row("外夹范围（向内 / 向外安装）", "External grip range (inward / outward fingers)", "1–39 mm / 35–73 mm"),
  row("内撑范围（向内 / 向外安装）", "Internal grip range (inward / outward fingers)", "11–49 mm / 45–83 mm"),
  row("硅胶指尖范围修正", "Silicone-fingertip range adjustment", "每个方向增加 1 mm", "Adds 1 mm in each direction"),
  row("重复精度", "Repeatability", "±0.1 mm"),
  row("夹持力", "Gripping force", "20–140 N；容差 ±5 N", "20–140 N; tolerance ±5 N", manufacturerConditions),
  row("夹持速度", "Gripping speed", "16–450 mm/s", "16–450 mm/s", manufacturerConditions),
  row("典型夹持时间", "Typical gripping time", "4 mm / 80 N 时 200 ms；38 mm / 80 N 时 300 ms", "200 ms at 4 mm / 80 N; 300 ms at 38 mm / 80 N", manufacturerConditions),
  row("断电保持工件", "Hold workpiece on power loss", "是", "Yes"),
  row("电机", "Motor", "集成式电动 BLDC", "Integrated electric BLDC"),
  row("防护等级", "IP classification", "IP67"),
  row("洁净室等级", "Cleanroom classification", "ISO 5"),
  row("ESD 电阻", "ESD resistance", "10^5–10^9 Ω", "10^5–10^9 ohm", conditions("适用于带标识的 ESD 波纹罩配置。", "Applies to configurations with the marked ESD bellow.")),
  row("食品接触润滑脂", "Food-contact grease", "NSF H1；符合 FDA 21 CFR 178.3570", "NSF H1; compliant with FDA 21 CFR 178.3570"),
  row("尺寸", "Dimensions", "144 × 90 × 71 mm"),
  row("质量", "Weight", "1.1 kg"),
  ...electricalRows("20 / 24 / 25 V", "最大 2,000 mA", "5–50 °C", "0–60 °C"),
  warrantyRow,
]);

const twoFgp20Rows = withSource(fgp20Pdf, sourceNames.datasheet, [
  row("手指夹持负载", "Finger-grip payload", "20 kg", "20 kg", manufacturerConditions),
  row("总行程", "Total stroke", "260 mm"),
  row("夹持范围（标准手指）", "Grip range (standard fingers)", "170–430 mm"),
  row("夹持范围（夹垫）", "Grip range (pads)", "158–418 mm"),
  row("重复精度", "Repeatability", "±0.5 mm"),
  row("夹持力", "Gripping force", "80–400 N；容差 ±30 N", "80–400 N; tolerance ±30 N", manufacturerConditions),
  row("夹持速度", "Gripping speed", "16–180 mm/s", "16–180 mm/s", manufacturerConditions),
  row("典型夹持时间", "Typical gripping time", "6 mm / 150 N 时 600 ms；20 mm / 200 N 时 900 ms", "600 ms at 6 mm / 150 N; 900 ms at 20 mm / 200 N", manufacturerConditions),
  row("手指机构噪声", "Finger-mechanism noise", "Leq 58 dBA；最大 63 dBA", "Leq 58 dBA; maximum 63 dBA"),
  row("真空范围", "Vacuum range", "5–60%；-0.05 至 -0.607 bar；1.5–17.95 inHg", "5–60%; -0.05 to -0.607 bar; 1.5–17.95 inHg"),
  row("真空流量", "Vacuum airflow", "0–12 L/min"),
  row("真空模块负载", "Vacuum-module payload", "2.5 kg", "2.5 kg", manufacturerConditions),
  row("吸盘数量", "Suction-cup count", "1–4"),
  row("真空抓取 / 释放时间", "Vacuum grip / release time", "40% 真空时 0.25 s / 0.4 s", "0.25 s at 40% vacuum / 0.4 s", manufacturerConditions),
  row("真空过滤", "Vacuum filtration", "50 µm 可更换过滤器", "Replaceable 50 µm filters"),
  row("真空噪声", "Vacuum noise", "Leq 72 dBA；最大 74 dBA", "Leq 72 dBA; maximum 74 dBA"),
  row("防护等级", "IP classification", "IP54"),
  row("尺寸", "Dimensions", "400 × 121.6 × 188 mm"),
  row("基座质量", "Base weight", "3.7 kg"),
  row("标准手指质量", "Standard-finger weight", "1.37 kg"),
  row("真空模块质量", "Vacuum-module weight", "0.27 kg"),
  row("标准手指总质量", "Total weight with standard fingers", "5.07 kg；带真空模块 5.34 kg", "5.07 kg; 5.34 kg with vacuum module"),
  row("KLT 手指质量", "KLT-finger weight", "0.43 kg"),
  row("KLT 手指总质量", "Total weight with KLT fingers", "4.13 kg；带真空模块 4.40 kg", "4.13 kg; 4.40 kg with vacuum module"),
  row("加强支架", "Reinforcement bracket", "机器人额定负载 ≥20 kg 时要求使用；增加 40 N·m 允许扭矩；质量 0.45 kg", "Required for robots rated at 20 kg or more; adds 40 N·m permissible torque; weight 0.45 kg", conditions("当前数据表与附件网页曾出现不同数值；此处采用当前数据表，采购时按附件料号复核。", "The current datasheet and accessories page have published different figures; this record follows the current datasheet and requires part-number verification.")),
  ...electricalRows("20 / 24 / 25 V", "最大 2,000 mA", "5–50 °C", "0–60 °C"),
  warrantyRow,
]);

const threeFg15Rows = withSource(fg15Pdf, sourceNames.datasheet, [
  row("力闭合负载（普通夹持）", "Force-fit payload (normal grip)", "10 kg", "10 kg", manufacturerConditions),
  row("力闭合负载（柔性夹持）", "Force-fit payload (flexible grip)", "8 kg", "8 kg", manufacturerConditions),
  row("形闭合负载", "Form-fit payload", "15 kg", "15 kg", manufacturerConditions),
  row("外夹直径", "External grip diameter", "4–152 mm"),
  row("内撑直径", "Internal grip diameter", "35–176 mm"),
  row("手指位置分辨率", "Finger position resolution", "0.1 mm"),
  row("直径重复精度", "Diameter repeatability", "典型 0.1 mm；最大 0.2 mm", "Typical 0.1 mm; maximum 0.2 mm"),
  row("手指平台 Z 轴允许扭矩", "Permissible Z-axis finger-platform torque", "5.3 N·m"),
  row("普通夹持力", "Normal gripping force", "10–240 N", "10–240 N", manufacturerConditions),
  row("柔性夹持力", "Flexible gripping force", "10–140 N", "10–140 N", manufacturerConditions),
  row("夹持力调节", "Gripping-force adjustment", "1–100%"),
  row("最大夹持速度（直径变化）", "Maximum gripping speed (diameter change)", "125 mm/s", "125 mm/s", manufacturerConditions),
  row("夹持时间", "Gripping time", "直径变化 10 mm 时 500 ms", "500 ms for a 10 mm diameter change", manufacturerConditions),
  row("最小手指移动量", "Minimum finger movement", "4 mm"),
  row("断电保持工件", "Hold workpiece on power loss", "是", "Yes"),
  row("电机", "Motor", "集成式电动 BLDC", "Integrated electric BLDC"),
  row("防护等级", "IP classification", "IP67"),
  row("尺寸", "Dimensions", "156 × 158 × 180 mm"),
  row("质量", "Weight", "1.15 kg"),
  row("随附指尖", "Included fingertips", "Ø10 mm 钢；Ø13 mm 钢；Ø13.5 mm 硅胶；Ø16.5 mm 硅胶", "Ø10 mm steel; Ø13 mm steel; Ø13.5 mm silicone; Ø16.5 mm silicone"),
  ...electricalRows("20 / 24 / 25 V", "43–1,500 mA；默认上限 600 mA", "5–50 °C", "0–60 °C"),
  warrantyRow,
]);

const threeFg25Rows = withSource(fg25Pdf, sourceNames.datasheet, [
  row("力闭合负载（普通夹持）", "Force-fit payload (normal grip)", "15 kg", "15 kg", manufacturerConditions),
  row("力闭合负载（柔性夹持）", "Force-fit payload (flexible grip)", "10 kg", "10 kg", manufacturerConditions),
  row("形闭合负载", "Form-fit payload", "25 kg", "25 kg", manufacturerConditions),
  row("外夹直径", "External grip diameter", "18–155 mm"),
  row("内撑直径", "Internal grip diameter", "41–184 mm"),
  row("手指位置分辨率", "Finger position resolution", "0.1 mm"),
  row("直径重复精度", "Diameter repeatability", "典型 0.1 mm；最大 0.2 mm", "Typical 0.1 mm; maximum 0.2 mm"),
  row("手指平台 Z 轴允许扭矩", "Permissible Z-axis finger-platform torque", "7.4 N·m"),
  row("普通夹持力", "Normal gripping force", "50–450 N", "50–450 N", manufacturerConditions),
  row("柔性夹持力", "Flexible gripping force", "50–300 N", "50–300 N", manufacturerConditions),
  row("夹持力调节", "Gripping-force adjustment", "1–100%"),
  row("最大夹持速度（直径变化）", "Maximum gripping speed (diameter change)", "90 mm/s", "90 mm/s", manufacturerConditions),
  row("夹持时间", "Gripping time", "直径变化 10 mm 时 500 ms", "500 ms for a 10 mm diameter change", manufacturerConditions),
  row("最小直径变化", "Minimum diameter change", "3 mm"),
  row("断电保持工件", "Hold workpiece on power loss", "是", "Yes"),
  row("电机", "Motor", "集成式电动 BLDC", "Integrated electric BLDC"),
  row("防护等级", "IP classification", "IP67"),
  row("尺寸", "Dimensions", "156 × 168 × 187 mm"),
  row("质量", "Weight", "1.6 kg"),
  row("随附指尖", "Included fingertips", "Ø13 mm 钢；Ø13 mm 滚花；Ø16.5 mm NBR", "Ø13 mm steel; Ø13 mm knurled; Ø16.5 mm NBR"),
  row("自定义手指平台 X/Y 允许扭矩", "Custom-finger platform permissible X/Y torque", "40 N·m"),
  row("手指末端 X/Y 允许扭矩", "Finger-end permissible X/Y torque", "8 N·m"),
  ...electricalRows("20 / 24 / 25 V", "50–1,500 mA", "5–50 °C", "0–60 °C"),
  warrantyRow,
]);

const vacuumElectricalRows = (
  payload: string,
  vacuum: string,
  airflow: string,
  cups: string,
  channels: string,
  gripTime: string,
  noise: string,
  dimensions: string,
  weight: string,
  supply: string,
  current: string,
): SpecRow[] => [
  row("额定负载", "Rated payload", payload, payload, manufacturerConditions),
  row("真空范围", "Vacuum range", vacuum),
  row("真空流量", "Vacuum airflow", airflow),
  row("吸盘数量", "Suction-cup count", cups),
  row("独立真空通道", "Independent vacuum channels", channels),
  row("抓取 / 释放时间", "Grip / release time", gripTime, gripTime, manufacturerConditions),
  row("真空泵", "Vacuum pump", "集成式电动泵", "Integrated electric pump"),
  row("过滤器", "Filters", "50 µm 可更换过滤器", "Replaceable 50 µm filters"),
  row("防护等级", "IP classification", "IP54；不适用于潮湿环境", "IP54; not intended for wet environments"),
  row("噪声", "Noise", noise),
  row("尺寸", "Dimensions", dimensions),
  row("质量", "Weight", weight),
  ...electricalRows(supply, current, "0–50 °C", "0–60 °C"),
  warrantyRow,
];

const vg10Rows = withSource(vg10Pdf, sourceNames.datasheet, [
  ...vacuumElectricalRows(
    "额定 10 kg；最大 15 kg",
    "5–80%；-0.05 至 -0.810 bar",
    "0–12 L/min",
    "1–16",
    "2",
    "0.35 s / 0.20 s",
    "按现场安装复核",
    "折叠 105 × 146 × 146 mm；展开 105 × 390 × 390 mm",
    "1.62 kg",
    "20.4 / 24 / 28.8 V",
    "50 / 600 / 1,500 mA",
  ),
  row("吸盘臂角度", "Suction-arm angle", "0–270°"),
  row("吸盘臂保持扭矩", "Suction-arm holding torque", "6 N·m"),
  row("手动可调吸盘臂", "Manually adjustable suction arms", "4"),
]);

const vgc10Rows = withSource(vgc10Pdf, sourceNames.datasheet, [
  ...vacuumElectricalRows(
    "默认附件 6 kg；自定义附件典型 10 kg、最大 15 kg",
    "5–80%；-0.05 至 -0.810 bar",
    "0–12 L/min",
    "1–7",
    "2",
    "0.35 s / 0.20 s",
    "按现场安装复核",
    "101 × 100 × 100 mm",
    "0.814 kg",
    "20.4 / 24 / 28.8 V",
    "50 / 600 / 1,500 mA",
  ),
  row("延长管", "Extension pipe", "50 mm"),
]);

const vgp20Rows = withSource(vgp20Pdf, sourceNames.datasheet, [
  ...vacuumElectricalRows(
    "瓦楞纸箱典型 10 kg；低加速度条件最大 20 kg",
    "5–60%；-0.05 至 -0.607 bar；1.5–17.95 inHg",
    "总计 0–48 L/min；每通道 0–12 L/min",
    "默认 16；可选支架 24；最少 1",
    "4",
    "40% 真空时 0.25 s / 0.40 s",
    "典型 67 dBA；最大 71 dBA",
    "264 × 184 × 92 mm",
    "2.55 kg",
    "20.4 / 24 / 28.8 V",
    "50 / 2,500 / 4,500 mA",
  ),
  row("20 kg 负载条件", "20 kg payload condition", "重力以外附加加速度 0.2 G，且工件、吸盘、密封和重心满足数据表条件", "0.2 G acceleration in addition to gravity, with workpiece, cups, seal, and center of gravity meeting datasheet conditions", manufacturerConditions),
  row("可选吸盘支架质量", "Optional suction bracket weight", "0.475 kg"),
]);

const vgp30Rows = withSource(vgp30Pdf, sourceNames.datasheet, [
  row("纸箱额定负载", "Cardboard payload", "30 kg", "30 kg", manufacturerConditions),
  row("真空范围", "Vacuum range", "5–60%；-0.05 至 -0.607 bar；1.5–17.95 inHg", "5–60%; -0.05 to -0.607 bar; 1.5–17.95 inHg"),
  row("总真空流量", "Total vacuum airflow", "0–440 L/min"),
  row("单通道真空流量", "Per-channel vacuum airflow", "0–220 L/min"),
  row("吸盘数量", "Suction-cup count", "1–20"),
  row("独立真空通道", "Independent vacuum channels", "2"),
  row("抓取时间", "Grip time", "30% 真空时 150 ms", "150 ms at 30% vacuum", manufacturerConditions),
  row("释放时间", "Release time", "80 ms", "80 ms", manufacturerConditions),
  row("噪声", "Noise", "典型 59 dBA；最大 62 dBA", "Typical 59 dBA; maximum 62 dBA"),
  row("真空泵输入", "Vacuum-pump input", "压缩空气", "Compressed air"),
  row("压缩空气工作压力", "Compressed-air operating pressure", "3–7 bar"),
  row("压缩空气最大压力", "Maximum compressed-air pressure", "7 bar"),
  row("压缩空气最大流量", "Maximum compressed-air flow", "440 L/min"),
  row("过滤器", "Filters", "50 µm 可更换过滤器", "Replaceable 50 µm filters"),
  row("防护等级", "IP classification", "IP54"),
  row("尺寸", "Dimensions", "390 × 240 × 62.10 mm"),
  row("质量", "Weight", "3.1 kg"),
  ...electricalRows("20 / 24 / 25 V", "50 / 750 / 2,000 mA", "0–50 °C", "0–60 °C"),
  warrantyRow,
]);

const mg10Rows = withSource(mg10Pdf, sourceNames.datasheet, [
  row("无摩擦垫负载（平行 / 垂直）", "Payload without friction pads (parallel / perpendicular)", "10 kg / 3.4 kg（3 G 条件）", "10 kg / 3.4 kg at 3 G", manufacturerConditions),
  row("带摩擦垫负载", "Payload with friction pads", "2.8 kg（3 G 条件）", "2.8 kg at 3 G", manufacturerConditions),
  row("带摩擦垫垂直负载", "Vertical payload with friction pads", "2.65 kg（3 G 条件）", "2.65 kg at 3 G", manufacturerConditions),
  row("圆柱工件负载（平行）", "Cylindrical-workpiece payload (parallel)", "4.1 kg（3 G 条件）", "4.1 kg at 3 G", manufacturerConditions),
  row("圆柱工件负载（垂直 X / Y）", "Cylindrical-workpiece payload (perpendicular X / Y)", "3.0 kg / 2.2 kg（3 G 条件）", "3.0 kg / 2.2 kg at 3 G", manufacturerConditions),
  row("最大拉力", "Maximum pulling force", "300 N", "300 N", manufacturerConditions),
  row("全力工件接触面积", "Full-force workpiece contact area", "65.4 × 65.4 mm"),
  row("磁力调节分辨率", "Magnetic-force adjustment resolution", "10 档", "10 steps"),
  row("夹持时间", "Gripping time", "300 ms；UR CB3 最长 500 ms", "300 ms; up to 500 ms on UR CB3", manufacturerConditions),
  row("断电保持工件", "Hold workpiece on power loss", "是", "Yes"),
  row("电机", "Motor", "集成式电动 BLDC", "Integrated electric BLDC"),
  row("防护等级", "IP classification", "IP67"),
  row("尺寸", "Dimensions", "Ø71 × 80.2 mm"),
  row("质量", "Weight", "0.8 kg"),
  ...electricalRows("20 / 24 / 25 V", "600–2,000 mA", "5–50 °C", "0–55 °C"),
  warrantyRow,
  row("厂商附加负载说明", "Additional manufacturer payload note", "在特定低加速度、重心和表面条件下可能达到 15 kg；不作为通用额定负载", "May reach 15 kg under specific low-acceleration, center-of-gravity, and surface conditions; not indexed as a general rated payload", manufacturerConditions),
]);

const geckoRows = (variant: "SP1" | "SP3" | "SP5", payload: string, preload: string, weight: string): SpecRow[] => withSource(geckoPdf, sourceNames.datasheet, [
  row("型号", "Variant", variant),
  row("最大负载", "Maximum payload", payload, payload, manufacturerConditions),
  row("预加载力（最小 / 中等 / 最大）", "Preload force (minimum / medium / maximum)", preload, preload, manufacturerConditions),
  row("脱离时间", "Detachment time", "100–1,000 ms", "100–1,000 ms", manufacturerConditions),
  row("断电保持", "Holding without power", "工件居中且表面满足条件时可保持数天", "Can hold for days when centered and surface conditions are met", manufacturerConditions),
  row("黏附垫材料", "Adhesive-pad material", "专有硅胶", "Proprietary silicone"),
  row("黏附垫更换周期", "Adhesive-pad replacement interval", "约 200,000 次循环", "About 200,000 cycles", manufacturerConditions),
  row("清洁介质", "Cleaning medium", "异丙醇", "Isopropyl alcohol"),
  row("清洁后恢复", "Recovery after cleaning", "厂商标称 100%", "Manufacturer-stated 100%", manufacturerConditions),
  row("适用表面", "Supported surfaces", "哑光至抛光表面；粗糙度、灰尘、油污和孔隙会影响保持力", "Matte to polished surfaces; roughness, dust, oil, and porosity affect holding force", manufacturerConditions),
  row("防护等级", "IP classification", "IP42"),
  row("尺寸", "Dimensions", "69 × 71 mm"),
  row("质量", "Weight", weight),
  row("工作温度", "Operating temperature", "0–50 °C"),
  row("存储温度", "Storage temperature", "-30–150 °C"),
  row("保修", "Warranty", "3 年，以正式保修条款为准", "3 years, subject to formal warranty terms"),
]);

const softBaseRows = withSource(softPdf, sourceNames.datasheet, [
  row("基座主轴行程", "Base spindle stroke", "11–40 mm"),
  row("主轴位置分辨率", "Spindle position resolution", "0.1 mm"),
  row("主轴最大输出力", "Maximum spindle force", "380 N", "380 N", manufacturerConditions),
  row("主轴最大速度", "Maximum spindle speed", "37 mm/s", "37 mm/s", manufacturerConditions),
  row("最大夹持频次", "Maximum gripping rate", "32 次/min", "32 grips/min", manufacturerConditions),
  row("工具连接", "Tool attachment", "Quick-lock 与 Smart-lock", "Quick-lock and Smart-lock"),
  row("电机", "Motor", "集成式电动 BLDC", "Integrated electric BLDC"),
  row("基座防护等级", "Base IP classification", "IP67"),
  row("基座尺寸", "Base dimensions", "84 × Ø98 mm"),
  row("基座质量", "Base weight", "0.77 kg"),
  row("硅胶材料", "Silicone material", "双组分硅橡胶", "Two-component silicone rubber"),
  row("食品接触认证", "Food-contact approval", "FDA 21 CFR 177.2600 与 EC 1935/2004", "FDA 21 CFR 177.2600 and EC 1935/2004", conditions("厂商数据表注明测试与认证对象为非脂肪食品。", "The datasheet limits testing and approval to non-fatty food objects.")),
  row("硅胶工具循环寿命", "Silicone-tool cycle life", "2,000,000 次循环", "2,000,000 cycles", manufacturerConditions),
  row("硅胶工具工作温度", "Silicone-tool operating temperature", "-20–80 °C"),
  row("可清洗性", "Washability", "可用洗碗机清洗", "Dishwasher safe"),
  ...electricalRows("20 / 24 / 25 V", "45–600 mA", "0–50 °C", "0–60 °C"),
  warrantyRow,
]);

const softToolRows = (
  variant: string,
  payload: string,
  range: string,
  depth: string,
  dimensions: string,
  weight: string,
  extra?: SpecRow,
): SpecRow[] => [
  ...softBaseRows,
  ...withSource(softPdf, sourceNames.datasheet, [
    row("硅胶工具型号", "Silicone-tool variant", variant),
    row("最大负载", "Maximum payload", payload, payload, manufacturerConditions),
    row("夹持范围", "Grip range", range),
    row("夹持深度", "Grip depth", depth),
    row("工具尺寸", "Tool dimensions", dimensions),
    row("工具质量（含 Smart-lock）", "Tool weight (Smart-lock included)", weight),
    ...(extra ? [extra] : []),
  ]),
];

const softAhRows = softToolRows("SG-a-H", "2.2 kg", "11–75 mm", "38 mm", "76 × Ø112 mm", "0.168 kg");
const softAsRows = softToolRows("SG-a-S", "1.5 kg", "11–75 mm", "38 mm", "76 × Ø112 mm", "0.168 kg", row("软端长度", "Soft-tip length", "16 mm"));
const softBhRows = softToolRows("SG-b-H", "1.1 kg", "24–118 mm；典型 79 mm", "40 mm", "77 × Ø109 mm", "0.172 kg");

const eyesRows = withSource(eyesPdf, sourceNames.datasheet, [
  row("相机硬件版本", "Camera hardware version", "Eyes v2.0"),
  row("Eye Box 版本", "Eye Box version", "v1.4"),
  row("照明套件版本", "Lighting-kit version", "v1.0"),
  row("相机接口", "Camera interface", "USB-C 3.x"),
  row("图像传感器", "Image sensor", "滚动快门；像素尺寸 1.4 × 1.4 µm", "Rolling shutter; 1.4 × 1.4 µm pixel size"),
  row("RGB 视场角", "RGB field of view", "69.4° × 42.5° × 77°，容差 ±3°", "69.4° × 42.5° × 77°, tolerance ±3°"),
  row("RGB 标准分辨率", "RGB standard resolution", "1280 × 720 px"),
  row("RGB 近摄分辨率", "RGB close-up resolution", "1920 × 1080 px"),
  row("深度技术", "Depth technology", "主动红外双目", "Active IR stereo"),
  row("深度视场角", "Depth field of view", "65±2° × 40±1° × 72±2°"),
  row("深度输出分辨率", "Depth output resolution", "1280 × 720 px"),
  row("工作距离", "Working distance", "400–1,000 mm"),
  row("工作温度", "Operating temperature", "0–35 °C"),
  row("防护等级", "IP rating", "IP54"),
  row("相机质量", "Camera weight", "0.260 kg"),
  row("相机计算寿命", "Calculated camera life", "30,000 h", "30,000 h", manufacturerConditions),
  row("视觉系统类型", "Vision-system type", "2.5D"),
  row("最小工件尺寸", "Minimum workpiece size", "10 × 10 mm 或直径 15 mm", "10 × 10 mm or 15 mm diameter"),
  row("支持应用", "Supported applications", "检测、分拣、检验、Landmark", "Detection, sorting, inspection, and Landmark"),
  row("安装方式", "Mounting options", "机器人安装、外部安装", "Robot-mounted and external"),
  row("机器人安装构型", "Robot-mounted configurations", "12 种（绕法兰 0°/90°/180°/270° × 倾角 0°/45°/90°）", "12 (0°/90°/180°/270° around flange × 0°/45°/90° tilt)"),
  row("典型处理时间", "Typical processing time", "0.5 s", "0.5 s", manufacturerConditions),
  row("检测重复精度", "Detection repeatability", "<2 mm", "<2 mm", manufacturerConditions),
  row("500 mm 处典型检测精度", "Typical detection accuracy at 500 mm", "2 mm（外部安装与机器人安装）", "2 mm for external and robot mounting", manufacturerConditions),
  row("最小缺陷尺寸", "Minimum inspection defect size", "标准 5 mm；近摄 3 mm", "5 mm standard; 3 mm close-up", manufacturerConditions),
  row("Landmark 精度（200 mm）", "Landmark accuracy (200 mm)", "最小 / 典型 / 最大误差 0.2635 / 0.6596 / 0.9500 mm", "Minimum / typical / maximum error 0.2635 / 0.6596 / 0.9500 mm", manufacturerConditions),
  row("Landmark 精度（500 mm）", "Landmark accuracy (500 mm)", "最小 / 典型 / 最大误差 0.6586 / 1.6490 / 2.3750 mm", "Minimum / typical / maximum error 0.6586 / 1.6490 / 2.3750 mm", manufacturerConditions),
  row("Landmark 精度（1,000 mm）", "Landmark accuracy (1,000 mm)", "最小 / 典型 / 最大误差 1.3173 / 3.2981 / 4.7500 mm", "Minimum / typical / maximum error 1.3173 / 3.2981 / 4.7500 mm", manufacturerConditions),
  row("照明套件输入", "Lighting-kit input", "24 V；最大 1 A；3 针 M8", "24 V; maximum 1 A; 3-pin M8"),
  row("照明套件环境", "Lighting-kit environment", "0–50 °C；IP54；0.131 kg；计算寿命 30,000 h", "0–50 °C; IP54; 0.131 kg; calculated life 30,000 h", manufacturerConditions),
  row("Eye Box 质量", "Eye Box weight", "1.01 kg"),
  row("Eye Box 所需电源", "Eye Box required supply", "24 V / 6.25 A"),
  row("Eye Box 电源输入", "Eye Box power-supply input", "100–240 V AC；最大 2.1 A"),
  row("Eye Box 电源输出", "Eye Box power-supply output", "24 V / 6.25 A；150 W"),
  row("Eye Box 设备输出", "Eye Box device output", "24–25 V；典型 / 峰值 4.5 A", "24–25 V; typical / peak 4.5 A"),
  row("Eye Box 数字输出", "Eye Box digital outputs", "DO1–DO8；总输出电流最大 100 mA；导通电阻典型 24 Ω", "DO1–DO8; 100 mA maximum aggregate current; 24 ohm typical active resistance"),
  row("Eye Box PNP 数字输入", "Eye Box PNP digital inputs", "DI1–DI8；TRUE 18–30 V；FALSE -0.5–2.5 V；最大 6 mA；5 kΩ", "DI1–DI8; TRUE 18–30 V; FALSE -0.5–2.5 V; maximum 6 mA; 5 kohm"),
  row("Eye Box NPN 数字输入", "Eye Box NPN digital inputs", "DI1–DI8；TRUE -0.5–5 V；FALSE 18–30 V；最大 6 mA；5 kΩ", "DI1–DI8; TRUE -0.5–5 V; FALSE 18–30 V; maximum 6 mA; 5 kohm"),
  row("安装环境建议", "Setup recommendations", "避免光照突变与集中反光；目标应与背景可区分；相机尽量正对工作台", "Avoid abrupt lighting changes and focused reflections; distinguish objects from background; point the camera toward the workspace table"),
  row("保修", "Warranty", "3 年，以正式保修条款为准", "3 years, subject to formal warranty terms"),
]);

const screwdriverRows = withSource(screwdriverPdf, sourceNames.datasheet, [
  row("扭矩范围", "Torque range", "0.15–5 N·m", "0.15–5 N·m", manufacturerConditions),
  row("扭矩精度（<1.33 N·m）", "Torque accuracy (<1.33 N·m)", "±0.04 N·m", "±0.04 N·m", manufacturerConditions),
  row("扭矩精度（>1.33 N·m）", "Torque accuracy (>1.33 N·m)", "±3%", "±3%", manufacturerConditions),
  row("自攻螺钉扭矩", "Self-tapping torque", "最大 3 N·m；建议最高为紧固能力的 85%", "Maximum 3 N·m; recommended maximum 85% of tightening capability", manufacturerConditions),
  row("预装配位置误差", "Pre-mounting position error", "最大 0.5 mm", "Maximum 0.5 mm"),
  row("最大转速", "Maximum speed", "340 rpm", "340 rpm", manufacturerConditions),
  row("安全系统内最大螺钉长度", "Maximum screw length within safety system", "35 mm"),
  row("最大螺钉长度", "Maximum screw length", "50 mm"),
  row("最大螺纹长度", "Maximum thread length", "35 mm"),
  row("螺钉尺寸范围（公制）", "Screw-size range (metric)", "M1.6–M6"),
  row("螺钉尺寸范围（英制）", "Screw-size range (imperial)", "#1–1/4 in"),
  row("批头保持", "Bit retention", "磁吸", "Magnetic"),
  row("轴向行程", "Shank stroke", "55 mm"),
  row("预压力档位", "Preload settings", "0 / 10 / 25 N"),
  row("保护力", "Protective force", "35 / 40 / 45 N", "35 / 40 / 45 N", manufacturerConditions),
  row("电机", "Motors", "2 个集成式电动 BLDC", "Two integrated electric BLDC motors"),
  row("防护等级", "IP classification", "IP54"),
  row("ESD", "ESD", "支持", "Supported"),
  row("尺寸", "Dimensions", "308 × 86 × 114 mm"),
  row("质量", "Weight", "2.5 kg"),
  ...electricalRows("20 / 24 / 25 V", "75–4,500 mA", "5–50 °C", "0–60 °C"),
  row("计算运行寿命", "Calculated operating life", "30,000 h", "30,000 h", manufacturerConditions),
  warrantyRow,
]);

const sanderRows = withSource(sanderPdf, sourceNames.datasheet, [
  row("当前硬件版本", "Current hardware version", "v2"),
  row("砂盘直径", "Sanding-pad diameter", "127 mm"),
  row("砂盘高度", "Sanding-pad height", "9.5 mm"),
  row("偏心轨道", "Orbital stroke", "5 mm"),
  row("转速范围", "Speed range", "1,000–10,000 rpm", "1,000–10,000 rpm", manufacturerConditions),
  row("标准砂盘", "Standard sanding pad", "3M 20353 Hookit"),
  row("砂盘质量", "Pad weight", "0.1 kg"),
  row("整机质量", "Total weight", "1.2 kg"),
  row("防护等级", "IP classification", "IP54"),
  row("尺寸", "Dimensions", "87 × 123 × 255 mm"),
  row("砂光电机功率", "Sanding-motor power", "200 W"),
  row("外部电源", "External power supply", "36 V / 200 W"),
  row("工具控制供电", "Tool-control supply", "24 V / 2.4 W"),
  row("工作温度", "Operating temperature", "0–50 °C"),
  row("内部最高温度", "Maximum internal temperature", "100 °C"),
  row("10,000 rpm 噪声", "Noise at 10,000 rpm", "74 dBA"),
  row("3,000 rpm 噪声", "Noise at 3,000 rpm", "44 dBA"),
  row("计算运行寿命", "Calculated operating life", "30,000 h", "30,000 h", manufacturerConditions),
  row("保修口径", "Warranty basis", "3 年或 3,000 h，以先到者为准", "3 years or 3,000 h, whichever comes first"),
]);

const hexRows = (
  model: "HEX-E" | "HEX-H",
  capacity: string,
  deformation: string,
  overload: string,
  noise: string,
  resolution: string,
  weight: string,
  recalibration: string,
): SpecRow[] => withSource(hexPdf, sourceNames.datasheet, [
  row("型号", "Model", model),
  row("六轴额定量程", "Six-axis nominal capacity", capacity, capacity, manufacturerConditions),
  row("额定载荷下形变", "Deformation at nominal load", deformation, deformation, manufacturerConditions),
  row("过载能力", "Overload capacity", overload, overload, manufacturerConditions),
  row("信号噪声", "Signal noise", noise, noise, manufacturerConditions),
  row("分辨率", "Resolution", resolution, resolution, manufacturerConditions),
  row("非线性", "Nonlinearity", "<2%"),
  row("迟滞", "Hysteresis", "<2%"),
  row("串扰", "Crosstalk", "<5%"),
  row("防护等级", "IP classification", "IP67"),
  row("尺寸", "Dimensions", "50 × 71 × 93 mm"),
  row("质量", "Weight", weight),
  row("供电电压", "Supply voltage", "7–24 V"),
  row("最大功耗", "Maximum power", "0.8 W"),
  row("工作温度", "Operating temperature", "0–55 °C"),
  row("相对湿度", "Relative humidity", "0–95%，无凝露", "0–95%, non-condensing"),
  row("计算运行寿命", "Calculated operating life", "30,000 h", "30,000 h", manufacturerConditions),
  row("建议复校周期", "Recommended recalibration interval", recalibration, recalibration, manufacturerConditions),
  row("保修", "Warranty", "3 年，以正式保修条款为准", "3 years, subject to formal warranty terms"),
]);

const hexERows = hexRows(
  "HEX-E",
  "Fx/Fy/Fz 200/200/200 N；Tx/Ty/Tz 10/10/6.5 N·m",
  "Fx/Fy ±1.7 mm；Fz ±0.3 mm；Tx/Ty ±2.5°；Tz ±5°",
  "各轴 500%",
  "Fx/Fy/Fz 0.035/0.035/0.15 N；Tx/Ty/Tz 0.002/0.002/0.001 N·m",
  "Fx/Fy/Fz 0.2/0.2/0.8 N；Tx/Ty/Tz 0.01/0.01/0.002 N·m",
  "0.347 kg",
  "15,000 h",
);

const hexHRows = hexRows(
  "HEX-H",
  "Fx/Fy/Fz 200/200/200 N；Tx/Ty/Tz 20/20/13 N·m",
  "Fx/Fy ±0.6 mm；Fz ±0.25 mm；Tx/Ty ±2°；Tz ±3.5°",
  "Fx/Fy 500%；Fz 400%；Tx/Ty/Tz 300%",
  "Fx/Fy/Fz 0.1/0.1/0.2 N；Tx/Ty/Tz 0.006/0.006/0.002 N·m",
  "Fx/Fy/Fz 0.5/0.5/1 N；Tx/Ty/Tz 0.036/0.036/0.008 N·m",
  "0.350 kg",
  "7,500 h",
);

const lift100Rows = withSource(liftPdf, sourceNames.datasheet, [
  row("静态允许扭矩", "Permissible static torque", "3,400 N·m"),
  row("动态允许扭矩", "Permissible dynamic torque", "1,900 N·m"),
  row("负载范围", "Payload range", "0–100 kg", "0–100 kg", manufacturerConditions),
  row("高度范围", "Height range", "730–1,630 mm"),
  row("行程", "Stroke", "900 mm"),
  row("速度", "Travel speed", "10–100 mm/s", "10–100 mm/s", manufacturerConditions),
  row("定位精度", "Positioning accuracy", "±3 mm"),
  row("重复精度", "Repeatability", "±0.5 mm"),
  row("噪声", "Noise", "Leq 64 dBA；最大 72 dBA", "Leq 64 dBA; maximum 72 dBA"),
  row("占空比", "Duty cycle", "0–100%", "0–100%", conditions("速度低于 70 mm/s 可 100%；高于 70 mm/s 为 90%，连续 10 min 后暂停 70 s。", "100% below 70 mm/s; 90% above 70 mm/s, with a 70 s pause after 10 min continuous operation.")),
  row("质量", "Weight", "86 kg"),
  row("最小尺寸", "Minimum dimensions", "730 × 325 × 492 mm"),
  row("最大尺寸", "Maximum dimensions", "1,630 × 325 × 492 mm"),
  row("防护等级", "IP classification", "IP54"),
  row("交流输入", "AC input", "90–264 V AC；47–63 Hz；最大 10.2 A", "90–264 V AC; 47–63 Hz; maximum 10.2 A"),
  row("工作温度", "Operating temperature", "0–50 °C"),
  row("存储温度", "Storage temperature", "0–60 °C"),
  row("相对湿度", "Relative humidity", "0–95%，无凝露", "0–95%, non-condensing"),
  row("设计寿命", "Design life", "1,000,000 次循环或典型使用 10 年", "1,000,000 cycles or 10 years of typical use", manufacturerConditions),
  row("保修", "Warranty", "3 年，以正式保修条款为准", "3 years, subject to formal warranty terms"),
]);

const quickRows = (kind: "Quick Changer" | "Dual Quick Changer"): SpecRow[] => withSource(quickPdf, sourceNames.datasheet, [
  row("当前版本", "Current version", kind === "Quick Changer" ? "QC-R v3；机器人侧料号 109498" : "Dual QC v3；料号 109878", kind === "Quick Changer" ? "QC-R v3; robot-side item 109498" : "Dual QC v3; item 109878"),
  row("额定负载", "Rated payload", kind === "Quick Changer" ? "25 kg" : "30 kg", kind === "Quick Changer" ? "25 kg" : "30 kg", manufacturerConditions),
  row("允许力", "Permissible force", kind === "Quick Changer" ? "400 N" : "600 N", kind === "Quick Changer" ? "400 N" : "600 N", manufacturerConditions),
  row("允许扭矩", "Permissible torque", "40 N·m", "40 N·m", manufacturerConditions),
  row("重复精度", "Repeatability", "±0.02 mm"),
  row("防护等级", "IP classification", "IP67"),
  row("工具更换寿命", "Tool-change life", "5,000 次", "5,000 cycles", manufacturerConditions),
  row("工作温度", "Operating temperature", "0–50 °C"),
  row("质量", "Weight", kind === "Quick Changer" ? "0.06 kg（机器人侧）；工具侧 0.14 kg" : "0.41 kg", kind === "Quick Changer" ? "0.06 kg robot side; 0.14 kg tool side" : "0.41 kg"),
  row("动态负载条件", "Dynamic-load condition", "2 G 时允许静态图表容量的一半", "Half of the static graph capacity at 2 G", manufacturerConditions),
  row("保修", "Warranty", "3 年，以正式保修条款为准", "3 years, subject to formal warranty terms"),
]);

const dualMountingRows = withSource(quickPdf, sourceNames.datasheet, [
  row("组成料号", "Component item numbers", "Quick Changer A 114975；Quick Changer B 114972；Splitter 114999", "Quick Changer A 114975; Quick Changer B 114972; Splitter 114999"),
  row("快换版本", "Changer versions", "QC-R v3 / QC-R v3；Splitter v1"),
  row("安装能力", "Mounting capability", "两个独立 Quick Changer，可按应用所需方向和位置安装", "Two independent Quick Changers mountable in the orientation and position required by the application"),
  row("组合工件负载", "Combined workpiece payload", "最高 25 kg；需按两个工具、工件、偏心矩和机器人能力复核", "Up to 25 kg; verify both tools, workpieces, offset moment, and robot capacity", manufacturerConditions),
  row("Splitter 中心孔紧固扭矩", "Splitter center-hole tightening torque", "最大 0.2 N·m", "Maximum 0.2 N·m"),
]);

const palletRows = withSource(palletPdf, sourceNames.datasheet, [
  row("用途", "Purpose", "落地式托盘机械导向与托盘到位检测", "Floor-mounted mechanical pallet guide and pallet-presence detection"),
  row("传感器检测区", "Sensor detection zone", "0–6 mm"),
  row("质量", "Weight", "17 kg"),
  row("尺寸", "Dimensions", "828 × 428.5 × 207.5 mm；宽度可按模块化装配扩展", "828 × 428.5 × 207.5 mm; width can be extended through modular assembly"),
  row("标准托盘适配", "Standard pallet support", "取决于机器人可达、安装、箱体和末端工具配置", "Depends on robot reach, installation, box, and end-of-arm tooling configuration", manufacturerConditions),
  row("自定义托盘范围", "Custom pallet range", "最小 600 × 800 mm；最大 1,250 × 1,250 mm", "Minimum 600 × 800 mm; maximum 1,250 × 1,250 mm", manufacturerConditions),
  row("输出信号", "Output signal", "数字式 Pallet present 信号与状态灯", "Digital pallet-present signal and status lamp"),
  row("防护等级", "IP classification", "IP54"),
  row("供电电压", "Supply voltage", "19.2 / 24 / 26.4 V"),
  row("电流消耗", "Current consumption", "0–20 mA"),
  row("工作温度", "Operating temperature", "0–50 °C"),
  row("存储温度", "Storage temperature", "0–60 °C"),
  row("相对湿度", "Relative humidity", "0–95%，无凝露", "0–95%, non-condensing"),
  row("设计寿命", "Design life", "200,000 次循环", "200,000 cycles", manufacturerConditions),
  row("保修", "Warranty", "3 年，以正式保修条款为准", "3 years, subject to formal warranty terms"),
]);

const gripperSeed = (
  id: string,
  product: string,
  slug: string,
  datasheet: string | undefined,
  rows: SpecRow[],
  type: Localized,
  differentiator: Localized,
  applications: Localized[],
  verification: Localized,
  coverage: FinderSpecificationCoverage = "official-complete",
): ProductSeed => ({
  id,
  product,
  pageUrl: productUrl(slug),
  datasheetUrl: datasheet,
  category: "end-effector",
  primary: "manipulator-end-effector",
  subclass: "gripper",
  useCases: ["manufacturing", "logistics", "integration"],
  type,
  integration: l(
    "通过 OnRobot 统一机械、电气与软件接口接入适配的工业或协作机器人；具体法兰、控制器、Compute Box、快换、线缆和软件插件按机器人型号配置。",
    "Integrates with supported industrial or collaborative robots through OnRobot's common mechanical, electrical, and software interface; flange, controller, Compute Box, changer, cabling, and software plug-in depend on the robot model.",
  ),
  verification,
  rows,
  overview: [
    l(
      `${product} 是 OnRobot 当前公开目录中的独立产品或变体，参数表按该型号保存，不向同系列其他型号扩展。`,
      `${product} is a distinct current OnRobot catalog product or variant. Its specification table is stored at model level and is not extended to adjacent models.`,
    ),
    differentiator,
  ],
  highlights: [
    { title: l("型号级参数", "Model-level specifications"), detail: l("负载、夹持范围、力、速度、电气和环境字段按官方资料逐项保存。", "Payload, gripping range, force, speed, electrical, and environmental fields are stored item by item from official material.") },
    { title: l("条件化数值", "Conditioned figures"), detail: l("测试工件、加速度、安装与负载条件不从参数中剥离。", "Test workpiece, acceleration, mounting, and load conditions remain attached to the figures.") },
    { title: l("集成边界", "Integration boundary"), detail: l("最终可用性取决于机器人、法兰、控制器、配件与软件版本。", "Final usability depends on robot, flange, controller, accessories, and software revision.") },
  ],
  applications,
  coverage,
});

const hardwareSeed = ({
  id,
  product,
  slug,
  datasheet,
  rows,
  category,
  primary,
  subclass,
  type,
  integration,
  verification,
  overview,
  applications,
  useCases,
  coverage = "official-complete",
}: {
  id: string;
  product: string;
  slug: string;
  datasheet?: string;
  rows: SpecRow[];
  category: FinderCategory;
  primary: string;
  subclass: string;
  type: Localized;
  integration: Localized;
  verification: Localized;
  overview: Localized[];
  applications: Localized[];
  useCases: FinderUseCase[];
  coverage?: FinderSpecificationCoverage;
}): ProductSeed => ({
  id,
  product,
  pageUrl: productUrl(slug),
  datasheetUrl: datasheet,
  category,
  primary,
  subclass,
  useCases,
  type,
  integration,
  verification,
  rows,
  overview,
  highlights: [
    { title: l("公开参数", "Public specifications"), detail: l("数值、单位和适用条件来自当前引用的官方数据表。", "Values, units, and conditions come from the currently cited official datasheet.") },
    { title: l("型号边界", "Model boundary"), detail: l("相邻型号或历史版本的参数不自动合并。", "Adjacent models and historical revisions are not merged automatically.") },
    { title: l("项目复核", "Project verification"), detail: tbdProjectVerification },
  ],
  applications,
  coverage,
});

const tbdProjectVerification = l(
  "采购前仍需核对机器人兼容、安装、工况、软件版本和现场验收方法。",
  "Robot compatibility, mounting, duty, software revision, and site acceptance method still require verification before purchase.",
);

const productSeeds: ProductSeed[] = [
  gripperSeed(
    "verified-onrobot-rg2", "RG2", "rg2-finger-gripper", rg2Pdf, rg2Rows,
    l("110 mm 行程双指电动夹爪", "110 mm-stroke electric two-finger gripper"),
    l("公开数据表给出 2 kg 力闭合、5 kg 形闭合负载以及 3–40 N 可调夹力，适合尺寸变化较大的中小型工件。", "The datasheet specifies 2 kg force-fit and 5 kg form-fit payloads with 3–40 N adjustable force for varied small and medium workpieces."),
    [l("装配、机床上下料和拾放", "Assembly, machine tending, and pick-and-place")],
    l("按工件几何确认力闭合或形闭合负载，并验证加长指尖导致的夹力下降、重心、节拍和断电保持。", "Confirm force-fit versus form-fit payload by workpiece geometry and validate force reduction from fingertip extensions, center of gravity, cycle time, and power-loss holding."),
  ),
  gripperSeed(
    "verified-onrobot-rg6", "RG6", "rg6-finger-gripper", rg6Pdf, rg6Rows,
    l("160 mm 行程双指电动夹爪", "160 mm-stroke electric two-finger gripper"),
    l("RG6 的行程、夹力和负载高于 RG2，公开上限为 6 kg 力闭合与 10 kg 形闭合，但质量也增加到 1.25 kg。", "RG6 increases stroke, force, and payload over RG2, with published limits of 6 kg force-fit and 10 kg form-fit, while tool mass rises to 1.25 kg."),
    [l("较大工件拾放、机床上下料和包装", "Larger-part handling, machine tending, and packaging")],
    l("核对机器人腕部有效负载、偏心矩、160 mm 行程、指尖定制和 25–120 N 夹力是否满足工件。", "Verify robot wrist payload and moment, the 160 mm stroke, fingertip design, and 25–120 N force against the workpiece."),
  ),
  gripperSeed(
    "verified-onrobot-rg2-ft", "RG2-FT", "rg2-ft-finger-gripper", undefined, rg2FtRows,
    l("带六轴力/矩与接近感知的双指夹爪", "Two-finger gripper with six-axis force/torque and proximity sensing"),
    l("RG2-FT 将夹持与指尖力/矩、接近感知结合，用于柔顺装配、检测和人机交接；当前可访问资料未形成与新数据表同等完整的单一规格入口。", "RG2-FT combines gripping with fingertip force/torque and proximity sensing for compliant assembly, inspection, and handover; currently accessible material does not provide one current specification source as complete as newer datasheets."),
    [l("柔顺装配、检测、精密拾放和人机交接", "Compliant assembly, inspection, precision handling, and handover")],
    l("核对当前硬件修订、传感器标定、采样链路、过载保护、质量口径和所配 Compute Box。", "Verify current hardware revision, sensor calibration, sampling path, overload protection, mass basis, and supplied Compute Box."),
    "official-partial",
  ),
  gripperSeed(
    "verified-onrobot-2fg7", "2FG7", "2fg7-finger-gripper", fg7Pdf, twoFg7Rows,
    l("IP67 紧凑型平行电动夹爪", "Compact IP67 electric parallel gripper"),
    l("2FG7 提供 38 mm 行程、7 kg 力闭合负载、11 kg 形闭合负载，并公开 ISO 5 洁净室与特定 ESD 配置。", "2FG7 provides 38 mm stroke, 7 kg force-fit and 11 kg form-fit payload, with published ISO 5 cleanroom and designated ESD configurations."),
    [l("小型工件装配、机床上下料与洁净环境搬运", "Small-part assembly, machine tending, and clean-environment handling")],
    l("确认手指安装方向、硅胶指尖修正、洁净室/ESD 波纹罩版本和工件几何对应的负载口径。", "Confirm finger orientation, silicone-tip adjustment, cleanroom/ESD bellow edition, and payload basis for the workpiece geometry."),
  ),
  gripperSeed(
    "verified-onrobot-2fg14", "2FG14", "2fg14-finger-gripper", fg14Pdf, twoFg14Rows,
    l("IP67 重载平行电动夹爪", "IP67 high-payload electric parallel gripper"),
    l("2FG14 的公开行程为 50 mm、夹持力为 40–280 N，力闭合与形闭合负载分别为 14 kg 和 20 kg。", "2FG14 publishes 50 mm stroke and 40–280 N force, with 14 kg force-fit and 20 kg form-fit payloads."),
    [l("CNC 上下料、重型零件搬运和装配", "CNC tending, heavier-part handling, and assembly")],
    l("核对内撑/外夹方向、手指平台允许扭矩、工件重心、食品接触润滑脂和机器人腕部余量。", "Verify internal/external grip orientation, permissible finger-platform torque, workpiece center of gravity, food-contact grease, and robot-wrist margin."),
  ),
  gripperSeed(
    "verified-onrobot-2fgp20", "2FGP20", "2fgp20-palletizer-gripper", fgp20Pdf, twoFgp20Rows,
    l("带可选真空模块的 20 kg 码垛电动夹爪", "20 kg electric palletizing gripper with optional vacuum module"),
    l("2FGP20 以 260 mm 行程处理箱体，并可组合真空模块与 KLT 手指；不同手指、真空模块和加强支架会改变质量与允许扭矩。", "2FGP20 uses 260 mm stroke for boxes and can combine a vacuum module and KLT fingers; finger set, vacuum module, and reinforcement bracket change mass and permissible torque."),
    [l("箱体码垛、滑托板搬运和 KLT 周转箱处理", "Box palletizing, slip-sheet handling, and KLT tote handling")],
    l("按标准/KLT 手指、真空模块、加强支架、机器人负载等级和箱体刚度锁定完整 BOM，并以当前料号数据表验收。", "Lock the complete BOM by standard/KLT fingers, vacuum module, reinforcement bracket, robot rating, and box stiffness, then accept against the current part-number datasheet."),
  ),
  gripperSeed(
    "verified-onrobot-3fg15", "3FG15", "3fg15-finger-gripper", fg15Pdf, threeFg15Rows,
    l("大行程三指自定心电动夹爪", "Large-stroke three-finger self-centering electric gripper"),
    l("3FG15 支持 4–152 mm 外夹和 35–176 mm 内撑，普通与柔性夹持分别提供不同力和负载边界。", "3FG15 supports 4–152 mm external and 35–176 mm internal gripping, with separate force and payload limits for normal and flexible modes."),
    [l("圆柱类工件、CNC 车床上下料和自定心夹持", "Cylindrical parts, CNC lathe tending, and self-centering gripping")],
    l("区分普通/柔性模式、内撑/外夹、指尖规格、工件直径和自定义手指扭矩。", "Separate normal/flexible mode, internal/external grip, fingertip, workpiece diameter, and custom-finger torque."),
  ),
  gripperSeed(
    "verified-onrobot-3fg25", "3FG25", "3fg25", fg25Pdf, threeFg25Rows,
    l("25 kg 形闭合重载三指电动夹爪", "25 kg form-fit heavy-duty three-finger electric gripper"),
    l("3FG25 面向更重零件，公开 50–450 N 普通夹力、18–155 mm 外夹与 41–184 mm 内撑范围，并提供制动断电保持。", "3FG25 targets heavier parts with 50–450 N normal force, 18–155 mm external and 41–184 mm internal ranges, plus brake-based power-loss holding."),
    [l("重型 CNC 上下料、油性圆柱件搬运和装配", "Heavy CNC tending, oily cylindrical-part handling, and assembly")],
    l("核对夹持模式、滚花指尖留痕风险、工件居中、指端允许扭矩、制动和机器人负载。", "Verify grip mode, marking risk from knurled tips, workpiece centering, permissible fingertip torque, brake, and robot payload."),
  ),
  gripperSeed(
    "verified-onrobot-vg10", "VG10", "vg10-vacuum-gripper", vg10Pdf, vg10Rows,
    l("双通道可调臂电动真空夹具", "Dual-channel electric vacuum gripper with adjustable arms"),
    l("VG10 具备两路独立真空和四个手动可调吸盘臂，公开额定负载 10 kg、最大负载 15 kg。", "VG10 provides two independent vacuum channels and four manually adjustable suction arms, with 10 kg rated and 15 kg maximum published payload."),
    [l("板材、箱体、拾放和机床上下料", "Sheet, box, pick-and-place, and machine-tending handling")],
    l("根据表面孔隙、吸盘布局、泄漏、工件重心和加速度验证额定/最大负载，不将最大值当作任意工况额定值。", "Validate rated versus maximum payload against porosity, cup layout, leakage, center of gravity, and acceleration; do not treat the maximum as universal rated capacity."),
  ),
  gripperSeed(
    "verified-onrobot-vgc10", "VGC10", "vgc10-vacuum-gripper", vgc10Pdf, vgc10Rows,
    l("紧凑型双通道电动真空夹具", "Compact dual-channel electric vacuum gripper"),
    l("VGC10 尺寸约 101 × 100 × 100 mm，面向狭小空间和小型机械臂；默认与自定义附件采用不同负载口径。", "VGC10 measures about 101 × 100 × 100 mm for confined spaces and smaller arms; default and custom attachments use different payload bases."),
    [l("狭小空间拾放、包装和轻型机床上下料", "Confined-space handling, packaging, and light machine tending")],
    l("锁定吸盘和附件布局，按泄漏率、表面、加速度及自定义附件条件验证 6/10/15 kg 不同负载口径。", "Lock cup and attachment layout and validate the separate 6/10/15 kg payload bases against leakage, surface, acceleration, and custom attachment conditions."),
  ),
  gripperSeed(
    "verified-onrobot-vgp20", "VGP20", "vgp20-vacuum-gripper", vgp20Pdf, vgp20Rows,
    l("四通道 20 kg 电动真空夹具", "Four-channel 20 kg electric vacuum gripper"),
    l("VGP20 提供四路独立真空、最高 48 L/min 总流量；20 kg 是满足低加速度等条件的最大值，典型纸箱负载为 10 kg。", "VGP20 provides four independent channels and up to 48 L/min total airflow. The 20 kg figure is conditional on low acceleration and other constraints, while typical cardboard payload is 10 kg."),
    [l("重型包装、码垛和多区真空搬运", "Heavy packaging, palletizing, and multi-zone vacuum handling")],
    l("以吸盘数量、每通道泄漏、纸箱强度、0.2 G 条件、重心和支架质量验证负载。", "Validate payload using cup count, per-channel leakage, box strength, the 0.2 G condition, center of gravity, and bracket mass."),
  ),
  gripperSeed(
    "verified-onrobot-vgp30", "VGP30", "vgp30-vacuum-gripper", vgp30Pdf, vgp30Rows,
    l("30 kg 气动真空夹具", "30 kg pneumatic vacuum gripper"),
    l("VGP30 使用压缩空气，公开纸箱负载 30 kg、总流量最高 440 L/min，并分成两路独立真空通道。", "VGP30 uses compressed air, publishes 30 kg cardboard payload and up to 440 L/min total airflow, and provides two independent vacuum channels."),
    [l("高负载箱体码垛与混线物料搬运", "High-payload box palletizing and high-mix material handling")],
    l("核对 3–7 bar 气源、空气品质与耗气、纸箱刚度、20 个吸盘布局、噪声和实际节拍。", "Verify 3–7 bar air supply, air quality and consumption, box stiffness, 20-cup layout, noise, and actual cycle time."),
  ),
  gripperSeed(
    "verified-onrobot-mg10", "MG10", "mg10-magnetic-gripper", mg10Pdf, mg10Rows,
    l("断电保持型智能磁性夹具", "Intelligent magnetic gripper with power-loss holding"),
    l("MG10 面向铁磁工件，公开负载按平行/垂直方向、摩擦垫、圆柱表面和 3 G 条件分别给出，不能压缩成一个通用数值。", "MG10 targets ferromagnetic parts. Published payload differs by parallel/perpendicular orientation, friction pads, cylindrical surfaces, and a 3 G condition and cannot be reduced to one universal value."),
    [l("金属板件、机床上下料、汽车和航空零件搬运", "Metal-sheet handling, machine tending, and automotive and aerospace part handling")],
    l("先验证材料磁性、接触面积、表面涂层、方向、工件厚度、剩磁和 3 G 负载条件。", "First validate material magnetism, contact area, coating, orientation, thickness, residual magnetism, and the 3 G payload condition."),
  ),
  gripperSeed(
    "verified-onrobot-gecko-sp1", "Gecko SP1", "gecko-gripper", geckoPdf, geckoRows("SP1", "1 kg", "3 / 7 / 11 N", "0.267 kg"),
    l("1 kg 干式黏附夹具", "1 kg dry-adhesive gripper"),
    l("SP1 是 Gecko 系列的 1 kg 变体，依赖平整表面、预加载、清洁状态和工件居中。", "SP1 is the 1 kg Gecko variant and depends on flatness, preload, pad cleanliness, and workpiece centering."),
    [l("平整玻璃、金属或板材的无气源搬运", "Air-free handling of flat glass, metal, or sheet materials")],
    l("用目标表面验证预加载、脱离时间、污染恢复、偏心与长期保持；不将抛光样件结果外推到粗糙或多孔材料。", "Validate preload, detachment time, contamination recovery, offset, and long-term holding on the target surface; do not extend polished-sample results to rough or porous materials."),
  ),
  gripperSeed(
    "verified-onrobot-gecko-sp3", "Gecko SP3", "gecko-gripper", geckoPdf, geckoRows("SP3", "3 kg", "8 / 20 / 32 N", "0.297 kg"),
    l("3 kg 干式黏附夹具", "3 kg dry-adhesive gripper"),
    l("SP3 在相同 Gecko 黏附原理下提高到 3 kg 公开负载，并需要更高预加载力。", "SP3 raises published capacity to 3 kg under the same Gecko adhesion principle and requires higher preload."),
    [l("中等质量平整板材和无痕搬运", "Medium-mass flat-sheet and low-mark handling")],
    l("按 8/20/32 N 预加载档位、表面能、污染、工件刚度与加速度做样件测试。", "Sample-test the 8/20/32 N preload levels against surface energy, contamination, workpiece stiffness, and acceleration."),
  ),
  gripperSeed(
    "verified-onrobot-gecko-sp5", "Gecko SP5", "gecko-gripper", geckoPdf, geckoRows("SP5", "5 kg", "12 / 29 / 46 N", "0.318 kg"),
    l("5 kg 干式黏附夹具", "5 kg dry-adhesive gripper"),
    l("SP5 是 Gecko 公开负载最高的变体，最大预加载达到 46 N；机器人必须能稳定施加预加载并控制剥离方向。", "SP5 is the highest-capacity published Gecko variant, with up to 46 N preload; the robot must apply preload reliably and control peel direction."),
    [l("较大平整工件、玻璃和板材搬运", "Larger flat-part, glass, and sheet handling")],
    l("验证机器人法向施力、表面平整度、偏心矩、黏附垫寿命和失效后的安全保持。", "Validate robot normal-force capability, surface flatness, offset moment, adhesive-pad life, and safe handling after adhesion loss."),
  ),
  gripperSeed(
    "verified-onrobot-soft-a-h", "Soft Gripper SG-a-H", "soft-gripper", softPdf, softAhRows,
    l("硬端 a 型食品级硅胶夹持工具", "Hard-tip type-a food-grade silicone gripping tool"),
    l("SG-a-H 采用硬端 a 型硅胶工具，在数据表指定的 Ø65 mm ABS 圆柱条件下最大负载 2.2 kg。", "SG-a-H uses the hard-tip type-a silicone tool and reaches 2.2 kg only under the datasheet's specified Ø65 mm ABS cylinder condition."),
    [l("食品、饮料、化妆品和柔性工件搬运", "Food, beverage, cosmetics, and compliant-part handling")],
    l("按形状、粗糙度、柔软度、尺寸、取放方向和非脂肪食品认证边界做样件测试。", "Sample-test shape, roughness, softness, size, pick orientation, and the non-fatty-food approval boundary."),
  ),
  gripperSeed(
    "verified-onrobot-soft-a-s", "Soft Gripper SG-a-S", "soft-gripper", softPdf, softAsRows,
    l("软端 a 型食品级硅胶夹持工具", "Soft-tip type-a food-grade silicone gripping tool"),
    l("SG-a-S 在 a 型几何上增加 16 mm 软端，公开条件负载为 1.5 kg，偏向易损和尺寸波动工件。", "SG-a-S adds a 16 mm soft tip to the type-a geometry, with 1.5 kg conditional payload for fragile or size-varying parts."),
    [l("易损食品、软包装和表面敏感工件", "Fragile food, soft packaging, and surface-sensitive parts")],
    l("在目标工件上权衡软端顺应性与低于 SG-a-H 的负载，并验证清洗、循环与夹持宽度。", "Balance soft-tip compliance against lower capacity than SG-a-H on the target part, and validate cleaning, cycles, and grip width."),
  ),
  gripperSeed(
    "verified-onrobot-soft-b-h", "Soft Gripper SG-b-H", "soft-gripper", softPdf, softBhRows,
    l("硬端 b 型食品级硅胶夹持工具", "Hard-tip type-b food-grade silicone gripping tool"),
    l("SG-b-H 的公开夹持范围为 24–118 mm，在指定 Ø30 mm ABS 圆柱条件下最大负载 1.1 kg，适用几何与 a 型不同。", "SG-b-H publishes a 24–118 mm range and 1.1 kg maximum on a specified Ø30 mm ABS cylinder, with geometry distinct from type-a tools."),
    [l("不同直径的食品、消费品和柔性工件", "Varied-diameter food, consumer goods, and compliant parts")],
    l("按 24–118 mm 范围、工件形状和方向验证；数据表样件表显示同尺寸不同形状的负载差异很大。", "Validate the 24–118 mm range against shape and orientation; the datasheet example table shows large payload differences for different shapes of similar size."),
  ),
];

productSeeds.push(
  hardwareSeed({
    id: "verified-onrobot-eyes",
    product: "OnRobot Eyes",
    slug: "onrobot-eyes",
    datasheet: eyesPdf,
    rows: eyesRows,
    category: "perception",
    primary: "sensing",
    subclass: "vision-sensor",
    type: l("2.5D RGB-D 机器人视觉系统", "2.5D RGB-D robot vision system"),
    integration: l("由 Eyes 相机、Eye Box 与可选照明套件组成，支持机器人安装或外部安装，并通过 USB-C、数字 I/O 和机器人插件进入工作站。", "Combines the Eyes camera, Eye Box, and optional lighting kit; supports robot or external mounting and connects through USB-C, digital I/O, and robot plug-ins."),
    verification: l("核对工作距离、目标最小尺寸、光照、反光、安装构型、检测/检验/Landmark 模式、Eye Box I/O 与目标精度。", "Verify working distance, minimum target size, lighting, reflection, mounting configuration, detection/inspection/Landmark mode, Eye Box I/O, and target accuracy."),
    overview: [
      l("OnRobot Eyes 是 2.5D 视觉系统，公开硬件由 v2.0 相机、v1.4 Eye Box 和 v1.0 照明套件组成。数据表同时给出 RGB、深度、安装、处理、精度和 I/O 条件。", "OnRobot Eyes is a 2.5D vision system with a published v2.0 camera, v1.4 Eye Box, and v1.0 lighting kit. Its datasheet covers RGB, depth, mounting, processing, accuracy, and I/O conditions."),
      l("Landmark 精度随路径点距离变化，检验最小缺陷尺寸也区分标准与近摄模式，因此不能只保留一个“视觉精度”数值。", "Landmark accuracy changes with waypoint distance and minimum inspection defect size differs between standard and close-up modes, so one generic vision-accuracy value would be misleading."),
    ],
    applications: [l("工件检测、分拣、检验、定位和机床上下料", "Part detection, sorting, inspection, localization, and machine tending")],
    useCases: ["manufacturing", "logistics", "integration"],
  }),
  hardwareSeed({
    id: "verified-onrobot-screwdriver",
    product: "OnRobot Screwdriver",
    slug: "onrobot-screwdriver",
    datasheet: screwdriverPdf,
    rows: screwdriverRows,
    category: "end-effector",
    primary: "manipulator-end-effector",
    subclass: "end-effector-general",
    type: l("带轴向顺应与扭矩控制的自动锁付工具", "Automated screwdriving tool with axial compliance and torque control"),
    integration: l("通过 OnRobot 工具接口连接机器人，可结合螺钉供料器和不同批头/延长杆处理公制及英制紧固件。", "Connects through the OnRobot tool interface and can combine with a screw feeder and different bits or extensions for metric and imperial fasteners."),
    verification: l("按螺钉规格、材料、目标扭矩、自攻条件、轴向预压、批头、供料方式、位置误差和节拍做工艺验证。", "Validate process by screw size, material, target torque, self-tapping condition, axial preload, bit, feeding method, positional error, and cycle time."),
    overview: [
      l("OnRobot Screwdriver 的公开扭矩范围为 0.15–5 N·m，低扭矩和高扭矩区间采用不同精度定义，并公开 55 mm 轴向行程和三档预压力。", "OnRobot Screwdriver publishes a 0.15–5 N·m range with different accuracy definitions below and above 1.33 N·m, plus 55 mm axial travel and three preload settings."),
      l("螺钉尺寸覆盖不等于任意螺钉都可稳定锁付；螺纹成形、自攻材料、供料、批头啮合和目标质量标准仍需实物工艺试验。", "Nominal screw-size coverage does not guarantee every fastener process; thread forming, substrate, feeding, bit engagement, and quality criteria still require physical process trials."),
    ],
    applications: [l("装配线锁付、机电产品组装和多规格螺钉换产", "Assembly-line fastening, electromechanical assembly, and multi-size screw changeover")],
    useCases: ["manufacturing", "integration"],
    coverage: "official-partial",
  }),
  hardwareSeed({
    id: "verified-onrobot-sander",
    product: "OnRobot Sander",
    slug: "onrobot-sander",
    datasheet: sanderPdf,
    rows: sanderRows,
    category: "end-effector",
    primary: "manipulator-end-effector",
    subclass: "end-effector-general",
    type: l("电动随机轨道砂光与表面处理工具", "Electric random-orbital sanding and surface-finishing tool"),
    integration: l("将 127 mm 砂盘、200 W 电机、工具控制和机器人路径组合，用于砂光、抛光、清洁等表面工艺。", "Combines a 127 mm pad, 200 W motor, tool control, and robot path for sanding, polishing, cleaning, and related surface processes."),
    verification: l("按材料、曲率、砂纸、转速、接触力、除尘、温升、噪声、轨迹和表面质量验收，不把空载转速视为工艺能力。", "Accept against material, curvature, abrasive, speed, contact force, extraction, temperature, noise, path, and surface quality; do not treat no-load speed as process capability."),
    overview: [
      l("当前数据表区分 v2 工具与历史版本。本记录只保存 v2 的 127 mm 砂盘、5 mm 偏心轨道、1,000–10,000 rpm 和供电等字段。", "The current datasheet distinguishes the v2 tool from legacy versions. This record stores only v2 fields such as the 127 mm pad, 5 mm orbit, 1,000–10,000 rpm, and power."),
      l("实际去除率和表面质量未由单一规格值定义，必须同时评估接触力、耗材、吸尘、工件材料和机器人轨迹。", "Actual removal rate and finish quality are not defined by one specification and require joint evaluation of contact force, abrasive, extraction, material, and robot path."),
    ],
    applications: [l("砂光、抛光、打磨、清洁和表面预处理", "Sanding, polishing, buffing, cleaning, and surface preparation")],
    useCases: ["manufacturing", "integration"],
  }),
  hardwareSeed({
    id: "verified-onrobot-hex-e",
    product: "HEX-E",
    slug: "hex-6-axis-force-torque-sensor",
    datasheet: hexPdf,
    rows: hexERows,
    category: "perception",
    primary: "sensing",
    subclass: "force-torque-sensor",
    type: l("高灵敏六轴力/矩传感器", "High-sensitivity six-axis force/torque sensor"),
    integration: l("安装在机器人法兰与末端工具之间，为装配、检测和表面处理提供六轴力/矩反馈。", "Mounts between robot flange and end tool to provide six-axis force/torque feedback for assembly, inspection, and surface finishing."),
    verification: l("HEX-E 与 HEX-H 的扭矩量程、形变、过载、噪声、分辨率和复校周期不同；按目标载荷与灵敏度选择并复核动态带宽。", "HEX-E and HEX-H differ in torque range, deformation, overload, noise, resolution, and recalibration interval; select by target load and sensitivity and verify dynamic bandwidth."),
    overview: [l("HEX-E 保持 200 N 三轴力量程，并用较低扭矩量程换取更高扭矩分辨率，适合更精细的力控任务。", "HEX-E retains 200 N on all force axes and uses lower torque ranges for finer torque resolution in more sensitive force-control work."), l("公开数据表给出静态量程、形变、过载、信号噪声和分辨率；实际闭环性能还取决于机器人控制周期、滤波和安装刚度。", "The datasheet publishes static range, deformation, overload, noise, and resolution; closed-loop performance also depends on robot cycle, filtering, and mounting stiffness.")],
    applications: [l("精密装配、测试、质量检测和柔顺表面处理", "Precision assembly, testing, quality inspection, and compliant finishing")],
    useCases: ["research", "manufacturing", "integration"],
  }),
  hardwareSeed({
    id: "verified-onrobot-hex-h",
    product: "HEX-H",
    slug: "hex-6-axis-force-torque-sensor",
    datasheet: hexPdf,
    rows: hexHRows,
    category: "perception",
    primary: "sensing",
    subclass: "force-torque-sensor",
    type: l("高扭矩六轴力/矩传感器", "Higher-torque six-axis force/torque sensor"),
    integration: l("安装在机器人法兰与末端工具之间，为较高扭矩工艺提供六轴反馈。", "Mounts between robot flange and end tool to provide six-axis feedback for higher-torque processes."),
    verification: l("按 20/20/13 N·m 扭矩量程与较高噪声/较低分辨率的权衡选型，并核对过载方向、复校周期和工具偏置。", "Select against the 20/20/13 N·m torque ranges and the noise/resolution tradeoff, then verify directional overload, recalibration, and tool offset."),
    overview: [l("HEX-H 与 HEX-E 的力量程相同，但扭矩量程提高到 Tx/Ty 20 N·m、Tz 13 N·m，适合更高力矩工艺。", "HEX-H shares the force ranges of HEX-E but raises torque capacity to 20 N·m on Tx/Ty and 13 N·m on Tz for higher-moment processes."), l("提高量程同时改变信号噪声、分辨率、形变和过载口径，因此系统选型不能只看最大扭矩。", "The higher range also changes signal noise, resolution, deformation, and overload behavior, so selection cannot be based on maximum torque alone.")],
    applications: [l("砂光、抛光、去毛刺、装配和较高扭矩力控", "Sanding, polishing, deburring, assembly, and higher-torque force control")],
    useCases: ["manufacturing", "integration"],
  }),
  hardwareSeed({
    id: "verified-onrobot-lift100",
    product: "LIFT100",
    slug: "lift100-robot-elevator",
    datasheet: liftPdf,
    rows: lift100Rows,
    category: "motion",
    primary: "structure-thermal",
    subclass: "linear-guide",
    type: l("100 kg 负载机器人第七轴升降机", "100 kg-payload robot seventh-axis elevator"),
    integration: l("作为机器人底座的垂直第七轴，与机器人、码垛软件、Pallet Station 和末端工具组成高位码垛或多高度工作站。", "Acts as a vertical seventh axis under the robot and combines with the robot, palletizing software, Pallet Station, and end tooling for high-stack or multi-height cells."),
    verification: l("按机器人与工具总质量、静/动态倾覆矩、行程、速度、占空比、地基、护栏和安全控制验证。", "Validate total robot/tool mass, static and dynamic overturning moment, travel, speed, duty, foundation, guarding, and safety control."),
    overview: [l("LIFT100 提供 900 mm 行程和 0–100 kg 负载范围，数据表同时限制静态与动态扭矩以及高速连续运行占空比。", "LIFT100 provides 900 mm travel and a 0–100 kg payload range, with separate static/dynamic torque and high-speed duty limits."), l("100 kg 不是任意偏心和速度下的通用能力；工作站设计必须把机器人、工具、工件、重心和加速度转换为升降轴载荷与地基条件。", "The 100 kg figure is not universal across offset and speed; cell design must translate robot, tool, workpiece, center of gravity, and acceleration into lift and foundation loads.")],
    applications: [l("高位码垛、多高度机床上下料和扩展垂直工作空间", "High-stack palletizing, multi-height machine tending, and expanded vertical workspace")],
    useCases: ["manufacturing", "logistics", "integration"],
  }),
  hardwareSeed({
    id: "verified-onrobot-quick-changer",
    product: "Quick Changer",
    slug: "quick-changer",
    datasheet: quickPdf,
    rows: quickRows("Quick Changer"),
    category: "end-effector",
    primary: "manipulator-end-effector",
    subclass: "tool-changer",
    type: l("单工具手动快换接口", "Single-tool manual quick changer"),
    integration: l("在机器人侧与工具侧之间提供 OnRobot 统一机械、电气连接；当前机器人侧版本为 QC-R v3。", "Provides the common OnRobot mechanical and electrical connection between robot and tool sides; the current robot-side version is QC-R v3."),
    verification: l("区分机器人侧与工具侧料号，核对 25 kg 额定负载、40 N·m 扭矩、动态降额、触点、电流和目标机器人的法兰适配。", "Separate robot-side and tool-side item numbers and verify 25 kg rating, 40 N·m torque, dynamic derating, contacts, current, and robot flange compatibility."),
    overview: [l("Quick Changer 是 OnRobot 单工具快换接口。数据表将当前 v3 与已停产的旧版本并列，本记录只把 v3 作为当前版本。", "Quick Changer is OnRobot's single-tool changer. The datasheet lists current v3 beside discontinued predecessors; this record treats only v3 as current."), l("额定负载和允许力矩必须结合工件重心和机器人动态；2 G 条件下数据表将静态图表能力降为一半。", "Rated payload and permissible moment must be combined with workpiece center of gravity and robot dynamics; at 2 G the datasheet halves static graph capacity.")],
    applications: [l("末端工具快速换装和跨工艺工作站", "Rapid end-tool changeover and multi-process cells")],
    useCases: ["manufacturing", "integration"],
  }),
  hardwareSeed({
    id: "verified-onrobot-dual-quick-changer",
    product: "Dual Quick Changer",
    slug: "dual-quick-changer",
    datasheet: quickPdf,
    rows: quickRows("Dual Quick Changer"),
    category: "end-effector",
    primary: "manipulator-end-effector",
    subclass: "tool-changer",
    type: l("双工具并联快换接口", "Dual-tool parallel quick changer"),
    integration: l("在一个机器人周期中并联安装两个 OnRobot 工具，减少换装动作；当前版本为 Dual QC v3。", "Mounts two OnRobot tools in parallel for one robot cycle to reduce changeover motion; the current version is Dual QC v3."),
    verification: l("将两个工具与工件的总质量、偏心矩、碰撞包络、电流和控制逻辑一起核对，不能只按 30 kg 单一数值判断。", "Check aggregate tool/workpiece mass, offset moments, collision envelope, current, and control logic together; do not select on the 30 kg figure alone."),
    overview: [l("Dual Quick Changer 公开额定负载 30 kg、允许力 600 N 和允许扭矩 40 N·m，用于同时使用两个末端工具。", "Dual Quick Changer publishes 30 kg rated payload, 600 N permissible force, and 40 N·m permissible torque for simultaneous use of two end tools."), l("双工具提高应用效率的同时增加腕部质量、偏心和碰撞体积，必须在机器人动态负载图内验算。", "Dual tooling can improve process efficiency but increases wrist mass, offset, and collision volume and must be checked against the robot's dynamic load diagram.")],
    applications: [l("双夹爪、夹爪与视觉/传感组合及减少换装的工位", "Dual-gripper, gripper-plus-sensor, and reduced-changeover cells")],
    useCases: ["manufacturing", "logistics", "integration"],
  }),
  hardwareSeed({
    id: "verified-onrobot-dual-mounting-kit",
    product: "Dual Mounting Kit",
    slug: "dual-mounting-kit",
    datasheet: quickPdf,
    rows: dualMountingRows,
    category: "end-effector",
    primary: "manipulator-end-effector",
    subclass: "tool-changer",
    type: l("两个独立快换接口的安装套件", "Mounting kit for two independent quick changers"),
    integration: l("通过两个 QC-R v3 和 splitter 将两个工具按所需方向独立安装，不等同于固定几何的 Dual Quick Changer。", "Uses two QC-R v3 units and a splitter to mount two tools independently in the required orientation; it is not the same as the fixed Dual Quick Changer geometry."),
    verification: l("按三个料号、布置、线缆、总负载、偏心、碰撞包络和 splitter 紧固限制确认 BOM。", "Confirm the three item numbers, layout, cabling, aggregate load, offset, collision envelope, and splitter tightening limit."),
    overview: [l("Dual Mounting Kit 用两个独立 Quick Changer 提供更自由的双工具布置，适合需要不同方向或间距的末端组合。", "Dual Mounting Kit uses two independent Quick Changers for more flexible dual-tool orientation and spacing."), l("其公开页面给出最高 25 kg 组合工件负载，但实际能力仍受两个工具本身、机器人腕部和偏心矩限制。", "Its page publishes up to 25 kg combined workpiece payload, while actual capacity remains limited by both tools, robot wrist, and offset moment.")],
    applications: [l("自定义双工具末端、双工件搬运和复合工艺", "Custom dual-tool end effectors, dual-workpiece handling, and combined processes")],
    useCases: ["manufacturing", "integration"],
  }),
  hardwareSeed({
    id: "verified-onrobot-pallet-station",
    product: "Pallet Station",
    slug: "pallet-station",
    datasheet: palletPdf,
    rows: palletRows,
    category: "motion",
    primary: "structure-thermal",
    subclass: "structure",
    type: l("落地式托盘定位与到位检测组件", "Floor-mounted pallet positioning and presence-detection fixture"),
    integration: l("通常与 LIFT100、码垛软件以及一到两个 Pallet Station 组成码垛工作站，提供机械导向和 Pallet present 数字信号。", "Typically combines with LIFT100, palletizing software, and one or two Pallet Stations to provide mechanical guidance and a digital pallet-present signal."),
    verification: l("按托盘标准、叉车冲击、左右安装、地脚、机器人可达、箱体与末端工具校核尺寸和传感位置。", "Verify dimensions and sensor position against pallet standard, forklift impact, left/right installation, anchors, robot reach, boxes, and tooling."),
    overview: [l("Pallet Station 不是机器人末端，而是地面托盘机械导向和在位检测组件，适合在码垛工作站中重复定位托盘。", "Pallet Station is not an end effector; it is a floor fixture for mechanical pallet guidance and presence detection in palletizing cells."), l("数据表给出自定义托盘尺寸边界，但能否覆盖某个托盘还取决于机器人可达、安装方向、箱体与末端工具。", "The datasheet gives custom pallet-size bounds, but support for a specific pallet also depends on robot reach, mounting direction, boxes, and end tooling.")],
    applications: [l("单托盘或双托盘码垛工作站", "Single- or dual-pallet palletizing cells")],
    useCases: ["manufacturing", "logistics", "integration"],
  }),
);

const dploySeed = (
  id: string,
  product: string,
  path: string,
  application: Localized,
  inputs: Localized,
): ProductSeed => {
  const pageUrl = `https://onrobot.com/en/dploy/${path}`;
  return {
    id,
    product,
    pageUrl,
    category: "model-software",
    primary: "software-tools",
    subclass: "development-tool",
    useCases: ["manufacturing", "logistics", "integration"],
    type: l("免代码机器人应用部署与运行模块", "No-code robot-application deployment and operation module"),
    integration: l(
      "自动发现大部分已安装硬件，用户定义工作区障碍、边界和少量应用输入后，由平台生成路径、程序逻辑、信号交换与事件处理。",
      "Automatically discovers most installed hardware; after the user defines obstacles, boundaries, and a small set of application inputs, the platform generates paths, program logic, signal exchange, and event handling.",
    ),
    verification: l(
      "按支持的机器人、工具、控制器、软件版本、许可、离线/在线边界、安全验证、异常恢复和节拍基准确认交付；厂商节省时间比例不能替代项目验收。",
      "Verify delivered robot, tool, controller, software revision, license, offline/online boundary, safety validation, fault recovery, and cycle-time baseline; manufacturer time-saving claims do not replace project acceptance.",
    ),
    rows: withSource(pageUrl, sourceNames.page, [
      row("应用模块", "Application module", t("zh", application), t("en", application)),
      row("部署方式", "Deployment method", "图形化步骤；无需用户编程或仿真", "Graphical workflow; no user programming or simulation required"),
      row("硬件发现", "Hardware discovery", "自动发现大部分已安装硬件", "Automatically discovers most installed hardware"),
      row("用户输入", "User inputs", t("zh", inputs), t("en", inputs)),
      row("自动生成内容", "Automatically generated content", "无碰路径、程序逻辑、信号交换、事件处理与机器人运动", "Collision-free path, program logic, signal exchange, event handling, and robot motion"),
      row("运行监控", "Operation monitoring", "实时性能指标与运行监控", "Real-time performance indicators and operation monitoring"),
      row("重新部署", "Redeployment", "支持产品、工件或生产要求变化后的重新配置", "Supports reconfiguration after product, workpiece, or production changes"),
      row("机器人兼容", "Robot compatibility", "支持多家协作与轻型工业机器人；以当前官方兼容清单为准", "Supports multiple collaborative and light-industrial robot brands; use the current official compatibility list"),
    ]),
    overview: [
      l(`${product} 是 D:PLOY 平台针对${t("zh", application)}的应用模块，页面以部署流程和支持能力为主，而非固定硬件参数表。`, `${product} is the D:PLOY application module for ${t("en", application)}. Its page describes deployment workflow and supported capabilities rather than a fixed hardware specification table.`),
      l("它可减少重复的机器人编程与集成步骤，但工作站机械、电气、安全、工艺和最终节拍仍由具体项目配置决定。", "It can reduce repetitive robot programming and integration work, while cell mechanics, electrical design, safety, process, and final cycle time remain project-specific."),
    ],
    highlights: [
      { title: l("自动部署", "Automated deployment"), detail: l("根据工作区和应用输入生成路径与控制逻辑。", "Generates paths and control logic from workspace and application inputs.") },
      { title: l("运行与监控", "Run and monitor"), detail: l("在同一流程中运行、监控并重新部署应用。", "Runs, monitors, and redeploys the application in one workflow.") },
      { title: l("兼容边界", "Compatibility boundary"), detail: l("支持范围随机器人、工具和软件版本变化，需按交付版本确认。", "Support changes with robot, tool, and software revision and requires delivery-specific confirmation.") },
    ],
    applications: [application],
    coverage: "capability-only",
    level: "platform",
    specificationKind: "capabilities",
  };
};

const webLyticsUrl = "https://learn.onrobot.com/en/weblytics";
const webLyticsSecurity = "https://onrobot.com/sites/default/files/documents/WebLytics_Datasheet_ENG.pdf";

productSeeds.push(
  dploySeed(
    "verified-onrobot-dploy-palletizing",
    "D:PLOY Palletizing",
    "palletizing",
    l("码垛", "palletizing"),
    l("箱体尺寸、托盘模式、取放位置、层型与工作区边界等码垛输入", "Box dimensions, pallet pattern, pick/place positions, layers, workspace boundaries, and related palletizing inputs"),
  ),
  dploySeed(
    "verified-onrobot-dploy-cnc",
    "D:PLOY CNC Machine Tending",
    "cnc-machine-tending",
    l("CNC 机床上下料", "CNC machine tending"),
    l("机床位置、门/夹具信号、工件属性、取放点与工作区边界", "Machine position, door/fixture signals, workpiece attributes, pick/place points, and workspace boundaries"),
  ),
  dploySeed(
    "verified-onrobot-dploy-packaging",
    "D:PLOY Packaging",
    "packaging",
    l("包装", "packaging"),
    l("工件属性、容器尺寸、包装模式、取放位置与工作区边界", "Workpiece attributes, container dimensions, packaging pattern, pick/place positions, and workspace boundaries"),
  ),
  dploySeed(
    "verified-onrobot-dploy-transferring",
    "D:PLOY Transferring",
    "transferring",
    l("搬运与拾放", "transferring and pick-and-place"),
    l("工件属性、取放位置、障碍物、工作区边界和目标节拍", "Workpiece attributes, pick/place positions, obstacles, workspace boundaries, and target cycle time"),
  ),
  {
    id: "verified-onrobot-weblytics",
    product: "WebLytics",
    pageUrl: webLyticsUrl,
    category: "model-software",
    primary: "software-tools",
    subclass: "development-tool",
    useCases: ["manufacturing", "integration"],
    type: l("机器人工作站生产监控与设备诊断软件", "Robot-cell production monitoring and device-diagnostics software"),
    integration: l("本地安装在客户网络中，从机器人、OnRobot Compute Box 和末端工具采集应用与硬件遥测，提供历史/实时视图、告警和权限控制。", "Installs locally in the customer network, collecting application and hardware telemetry from robots, OnRobot Compute Boxes, and end tools for live/history views, alerts, and access control."),
    verification: l("部署前确认支持设备、指标定义、采样与保留策略、网络分区、TLS 配置、用户权限、备份、告警和数据出境边界。", "Before deployment, confirm supported devices, metric definitions, sampling and retention, network segmentation, TLS configuration, user permissions, backup, alerts, and data-boundary requirements."),
    rows: [
      ...withSource(webLyticsUrl, sourceNames.page, [
        row("软件形态", "Software form", "本地安装的 Web 应用", "Locally installed web application"),
        row("主要用途", "Primary purpose", "生产监控、应用级 KPI、硬件遥测与设备诊断", "Production monitoring, application KPIs, hardware telemetry, and device diagnostics"),
        row("数据来源", "Data sources", "机器人、OnRobot Compute Box 与 OnRobot 末端工具", "Robots, OnRobot Compute Boxes, and OnRobot end-of-arm tools"),
        row("视图", "Views", "实时与历史数据", "Real-time and historical data"),
        row("告警", "Alerts", "指标超出用户定义范围时触发", "Triggered when metrics exceed user-defined ranges"),
      ]),
      ...withSource(webLyticsSecurity, sourceNames.security, [
        row("部署网络", "Deployment network", "客户本地网络", "Customer local network"),
        row("访问控制", "Access control", "用户名与密码；多用户；基于角色和设备组的权限", "Username and password; multiple users; role- and device-group-based access"),
        row("Web/API 加密", "Web/API encryption", "加密级别取决于客户安全要求和部署配置", "Encryption level depends on customer security requirements and deployment configuration"),
        row("登录防护", "Login protections", "强密码要求、请求节流和反自动化机制", "Strong password requirements, request throttling, and anti-automation controls"),
      ]),
    ],
    overview: [
      l("WebLytics 是本地部署的生产监控和设备诊断软件，不是云端公共行情服务。它汇集机器人、Compute Box 与末端工具数据，形成应用 KPI、历史视图和告警。", "WebLytics is locally deployed production-monitoring and diagnostics software, not a public cloud analytics service. It aggregates robot, Compute Box, and tool data into application KPIs, history, and alerts."),
      l("官方安全概览说明 Web 界面和 API 的加密程度取决于部署配置，因此不能仅凭产品名称判断满足某一网络安全等级。", "The official security overview says web-interface and API encryption depends on deployment configuration, so the product name alone does not establish compliance with a particular security level."),
    ],
    highlights: [
      { title: l("本地部署", "Local deployment"), detail: l("在客户网络中运行并采集工作站数据。", "Runs in the customer network and collects cell data.") },
      { title: l("应用级监控", "Application-level monitoring"), detail: l("提供实时、历史、KPI、告警和设备诊断视图。", "Provides live, historical, KPI, alert, and device-diagnostics views.") },
      { title: l("权限控制", "Access control"), detail: l("支持多用户、角色和设备组；安全强度依赖配置。", "Supports multiple users, roles, and device groups; security strength depends on configuration.") },
    ],
    applications: [l("机器人工作站生产监控、停机诊断与维护分析", "Robot-cell production monitoring, downtime diagnostics, and maintenance analysis")],
    coverage: "capability-only",
    level: "platform",
    specificationKind: "capabilities",
  },
);

const finderProfile = (company: CompanyProfile): FinderExpansionRecord["profile"] => ({
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

const parameterRows = (locale: Locale, seed: ProductSeed): FinderParameter[] => seed.rows.map((item) => ({
  label: t(locale, item.label),
  value: t(locale, item.value),
  status: "manufacturer",
  sourceUrl: item.sourceUrl ?? seed.datasheetUrl ?? seed.pageUrl,
  sourceLabel: t(locale, item.sourceLabel ?? (seed.datasheetUrl ? sourceNames.datasheet : sourceNames.page)),
  sourceLocator: t(locale, item.locator ?? l("产品规格或能力说明", "Product specification or capability section")),
  conditions: item.conditions ? t(locale, item.conditions) : undefined,
}));

const toRecord = (locale: Locale, company: CompanyProfile, seed: ProductSeed): FinderExpansionRecord => {
  const coverage = seed.coverage ?? "official-complete";
  const sourceLinks = [
    { label: locale === "zh" ? `${seed.product} 官方产品页` : `${seed.product} official product page`, url: seed.pageUrl },
    ...(seed.datasheetUrl ? [{ label: locale === "zh" ? `${seed.product} 官方数据表` : `${seed.product} official datasheet`, url: seed.datasheetUrl }] : []),
    { label: locale === "zh" ? "OnRobot 公司与发展历程" : "OnRobot company and history", url: ONROBOT_ABOUT },
  ];
  if (seed.product === "WebLytics") {
    sourceLinks.splice(1, 0, { label: locale === "zh" ? "WebLytics 官方安全概览" : "WebLytics official security overview", url: webLyticsSecurity });
  }

  return {
    id: seed.id,
    matrixSlug: "",
    matrixTitle: locale === "zh" ? "OnRobot 型号级产品目录" : "OnRobot model-level product catalog",
    industry: "robotics",
    reviewedAt: "2026-09-04",
    product: seed.product,
    company: company.name,
    type: t(locale, seed.type),
    openness: locale === "zh" ? "官方产品页和数据表公开" : "Official product pages and datasheets are public",
    integration: t(locale, seed.integration),
    verificationFocus: t(locale, seed.verification),
    sourceIds: company.sourceIds,
    officialUrl: seed.pageUrl,
    category: seed.category,
    useCases: seed.useCases,
    opennessLevel: "documented",
    parameters: parameterRows(locale, seed),
    catalogPrimary: seed.primary,
    catalogSubclass: seed.subclass,
    catalogCoverage: "model-partial",
    catalogScope: locale === "zh"
      ? "本记录只对应当前具名型号或软件模块；变体和历史版本不自动合并。"
      : "This record applies only to the named current model or software module; variants and historical revisions are not merged automatically.",
    profile: finderProfile(company),
    evidence: {
      level: seed.level ?? "model",
      specificationKind: seed.specificationKind ?? "parameters",
      specificationCoverage: coverage,
      specificationCoverageNote: locale === "zh"
        ? coverage === "official-complete"
          ? "已转录当前引用官方数据表的型号级规格字段，并保留版本、测试和配置条件。"
          : coverage === "capability-only"
            ? "公开资料以软件能力和部署流程为主，没有与硬件产品相同的统一数值规格表。"
            : "已收录可核对的型号参数，但当前资料存在版本分散或大型兼容矩阵，尚未宣称逐页完整。"
        : coverage === "official-complete"
          ? "Model-level specification fields from the currently cited official datasheet are transcribed with revision, test, and configuration conditions preserved."
          : coverage === "capability-only"
            ? "Public material describes software capabilities and deployment workflow rather than a hardware-style unified numeric specification table."
            : "Verifiable model parameters are indexed, but the current material is distributed across revisions or large compatibility matrices, so page-by-page completeness is not claimed.",
      overview: seed.overview.map((item) => t(locale, item)),
      highlights: seed.highlights.map((item) => ({ title: t(locale, item.title), detail: t(locale, item.detail) })),
      applications: seed.applications.map((item) => t(locale, item)),
      disclosureBoundary: locale === "zh"
        ? "“完整”仅指当前引用官方数据表中的规格字段已按型号转录，不表示厂商公开了价格、交期、故障率、全部兼容组合或项目验收结果。"
        : "Complete means the specification fields in the currently cited official datasheet are transcribed at model level; it does not imply disclosure of price, lead time, failure rate, every compatible combination, or project acceptance results.",
      sourceLinks: [...new Map(sourceLinks.map((item) => [item.url, item])).values()],
    },
  };
};

export const getOnRobotProductRecords = (locale: Locale, company: CompanyProfile): FinderExpansionRecord[] => (
  productSeeds.map((seed) => toRecord(locale, company, seed))
);

export const onRobotCatalogProductCount = productSeeds.length;
