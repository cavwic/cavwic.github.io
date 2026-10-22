import type { Locale } from "../site";
import type { CompanyProfile } from "./catalog";
import type {
  FinderCategory,
  FinderExpansionRecord,
  FinderParameter,
  FinderSpecificationCoverage,
  FinderUseCase,
} from "./product-finder-demo";
import { withParameterIndex } from "./parameter-index";

type Localized = { zh: string; en: string };
type SpecRow = {
  label: Localized;
  value: Localized;
  conditions?: Localized;
  sourceUrl?: string;
  sourceLabel?: Localized;
  locator?: Localized;
};

type ProductSeed = {
  id: string;
  product: string;
  pageUrl: string;
  datasheetUrl?: string;
  extraSources?: Array<{ url: string; label: Localized }>;
  category: FinderCategory;
  primary: string;
  subclass: string;
  useCases: FinderUseCase[];
  type: Localized;
  integration: Localized;
  verification: Localized;
  rows: SpecRow[];
  overview: Localized[];
  applications: Localized[];
  coverage?: FinderSpecificationCoverage;
  level?: "model" | "family" | "platform";
  specificationKind?: "parameters" | "capabilities";
};

const l = (zh: string, en: string): Localized => ({ zh, en });
const t = (locale: Locale, value: Localized) => value[locale];
const row = (zh: string, en: string, valueZh: string, valueEn = valueZh, conditions?: Localized): SpecRow => ({
  label: l(zh, en),
  value: l(valueZh, valueEn),
  conditions,
});
const sourced = (sourceUrl: string, sourceLabel: Localized, rows: SpecRow[], locator = l("规格表", "Specification table")) => rows.map((item) => ({
  ...item,
  sourceUrl,
  sourceLabel,
  locator: item.locator ?? locator,
}));

const ROBOTIQ_HOME = "https://robotiq.com/";
const ROBOTIQ_ABOUT = "https://robotiq.com/about";
const ADAPTIVE_PAGE = "https://robotiq.com/products/adaptive-grippers";
const ADAPTIVE_SHEET = "https://robotiq.com/hubfs/Hand-E_Adaptive_Gripper_ProductSheet_EN_2024-11_WEB.pdf";
const TWO_FINGER_MANUAL = "https://assets.robotiq.com/website-assets/support_documents/document/online/2F-85_2F-140_TM_InstructionManual_HTML5_20190503.zip/2F-85_2F-140_TM_InstructionManual_HTML5/Content/6.%20Specifications.htm";
const THREE_FINGER_MANUAL = "https://assets.robotiq.com/website-assets/support_documents/document/3-Finger_PDF_20181127.pdf";
const VACUUM_PAGE = "https://robotiq.com/products/vacuum-grippers";
const VACUUM_SHEET = "https://robotiq.com/hubfs/Product-sheets/Vacuum%20Grippers/ROBOTIQ_One_Pager_Vacuum_Grippers_10_2024_EN_V3.pdf";
const POWERPICK_MULTI_MANUAL = "https://blog.robotiq.com/hubfs/support-files/PowerPickMulti_User_Manual_2026-03-20.pdf";
const FT_PAGE = "https://robotiq.com/products/ft-300-force-torque-sensor";
const WRIST_CAMERA_PAGE = "https://robotiq.com/products/wrist-camera";
const TSF_PAGE = "https://robotiq.com/tactile-sensor-fingertips";
const TSF_GUIDE = "https://robotiq.com/hubfs/Tactile%20Sensor%20Fingertips/Tactile%20Sensors%20TSF-85%20-%20User%20Guide.pdf";
const FORCE_COPILOT_PAGE = "https://robotiq.com/products/force-copilot";
const PALLETIZING_PAGE = "https://robotiq.com/solutions/palletizing";
const PALLETIZING_SHEET = "https://robotiq.com/hubfs/PAL_Product_Sheet_EN_Recto_Verso_WEB.pdf";
const MACHINE_TENDING_PAGE = "https://robotiq.com/solutions/machine-tending";
const SCREWDRIVING_PAGE = "https://robotiq.com/solutions/screwdriving";
const IQ_PAGE = "https://robotiq.com/iq-platform";
const CONTACT_CORE_PAGE = "https://robotiq.com/contact-core-robotiq";

const sourceNames = {
  page: l("Robotiq 官方产品页", "Robotiq official product page"),
  sheet: l("Robotiq 官方产品数据表", "Robotiq official product sheet"),
  manual: l("Robotiq 官方技术手册", "Robotiq official technical manual"),
  guide: l("Robotiq 官方用户指南", "Robotiq official user guide"),
};

const selectionConditions = l(
  "公开数值不能脱离工件、抓取方式、机器人、安装件、重心、加速度、环境和软件版本使用；采购与安全验收仍需以当前交付文档和实物测试为准。",
  "Published figures cannot be separated from workpiece, grasp type, robot, mounting, center of gravity, acceleration, environment, and software revision. Procurement and safety acceptance still require current delivery documents and physical testing.",
);

const robotiqProducts = [
  "Hand-E 50 mm", "Hand-E 100 mm", "Hand-E C10", "2F-85", "2F-140", "3-Finger Adaptive Robot Gripper",
  "PowerPick Multi", "PowerPick 10", "PowerPick 20", "PowerPick 30", "PowerPick10 SingleCup", "EPick",
  "FT 300-S", "TSF-85", "Wrist Camera", "SD-100", "SF-300",
  "AX30", "AX20", "AX10", "PE20", "PE10", "Production-Ready Palletizer", "Machine Tending Solution", "Screwdriving Solution",
  "Force Copilot", "Material Handling Copilot", "IQ", "Contact Core",
];

const robotiqCompanyPatch = (company: CompanyProfile, locale: Locale): CompanyProfile => ({
  ...company,
  name: "Robotiq",
  englishName: "Robotiq",
  legalName: "Robotiq Inc.",
  country: locale === "zh" ? "加拿大" : "Canada",
  headquarters: locale === "zh" ? "加拿大魁北克省莱维" : "Levis, Quebec, Canada",
  founded: "2008",
  officialUrl: ROBOTIQ_HOME,
  valueChainRole: locale === "zh"
    ? "机器人末端组件、应用软件与标准化工作站厂商"
    : "Robot end-of-arm component, application-software, and standardized-workcell supplier",
  positioning: locale === "zh"
    ? "Robotiq 面向制造自动化提供夹爪、真空抓具、力/矩与触觉感知、腕部视觉、应用软件，以及码垛、机床上下料和锁付工作站。"
    : "Robotiq supplies grippers, vacuum tooling, force/torque and tactile sensing, wrist vision, application software, and palletizing, machine-tending, and screwdriving workcells for manufacturing automation.",
  strengths: locale === "zh" ? [
    "末端组件、软件和工作站采用同一应用部署思路",
    "型号页公开了较多机械、电气、环境和兼容性参数",
    "覆盖抓取、接触感知、视觉、码垛、上下料和锁付流程",
  ] : [
    "A common application-deployment approach across components, software, and workcells",
    "Relatively broad public mechanical, electrical, environmental, and compatibility specifications",
    "Coverage across gripping, contact sensing, vision, palletizing, machine tending, and screwdriving",
  ],
  products: robotiqProducts,
  fit: locale === "zh" ? [
    "高混流机床上下料、装配、拾放与检测",
    "箱体码垛、拆码垛与物流搬运",
    "力控插入、表面搜索、自动锁付与接触数据采集",
    "协作机器人应用的标准化部署与换产",
  ] : [
    "High-mix machine tending, assembly, pick-and-place, and inspection",
    "Case palletizing, depalletizing, and logistics handling",
    "Force-controlled insertion, surface finding, screwdriving, and contact-data capture",
    "Standardized deployment and changeover of collaborative-robot applications",
  ],
  overview: locale === "zh" ? [
    "Robotiq Inc. 于 2008 年由 Samuel Bouchard、Vincent Duchaine 和 Jean-Philippe Jobin 创立，源自加拿大拉瓦尔大学的机器人研究项目。公司总部公开地址位于魁北克省莱维，并在欧洲设有团队。",
    "当前官网将业务分成 Components、Software 和 Workcells。组件包括 Hand-E、2F 与 3-Finger 夹爪、PowerPick 与 EPick 真空抓具、FT 300-S、Wrist Camera 和 TSF-85；工作站覆盖码垛、机床上下料和锁付；软件包括 Force Copilot、Material Handling Copilot、IQ 与 Contact Core。",
    "产品是否适合项目不能只看一个负载或精度数字。夹持能力受工件摩擦、包络抓取、指尖和加速度影响；真空工具受材料孔隙、吸盘布置、气源和泄漏影响；工作站的负载、节拍和高度还取决于机器人及配置器结果。",
    "Robotiq 是非上市公司。官网未建立面向公众的定期财务报告库；2018 年官方新闻稿披露 Battery Ventures 投资 3,100 万加元，且为公司首轮机构融资。除此之外，本档案不推断收入、利润或估值。",
  ] : [
    "Robotiq Inc. was founded in 2008 by Samuel Bouchard, Vincent Duchaine, and Jean-Philippe Jobin after a robotics project at Universite Laval in Canada. Its published head-office address is in Levis, Quebec, and it also has a European presence.",
    "The current website organizes the business into Components, Software, and Workcells. Components include Hand-E, 2F and 3-Finger grippers, PowerPick and EPick vacuum tooling, FT 300-S, Wrist Camera, and TSF-85. Workcells cover palletizing, machine tending, and screwdriving. Software includes Force Copilot, Material Handling Copilot, IQ, and Contact Core.",
    "Project fit cannot be determined from one payload or accuracy number. Gripping depends on friction, encompassing geometry, fingertips, and acceleration; vacuum performance depends on porosity, cup layout, air supply, and leakage; workcell payload, throughput, and height also depend on the robot and configurator result.",
    "Robotiq is privately held. Its website does not expose a public periodic-financial-report library. A 2018 official release disclosed a CAD 31 million Battery Ventures investment as the company's first institutional financing. This profile does not infer revenue, profit, or valuation beyond that disclosure.",
  ],
  businessAreas: locale === "zh" ? [
    "自适应电动夹爪与真空抓具",
    "六轴力/矩、触觉和腕部视觉组件",
    "力控、物料搬运、接触数据与自动集成软件",
    "码垛、机床上下料和螺丝锁付工作站",
  ] : [
    "Adaptive electric grippers and vacuum tooling",
    "Six-axis force/torque, tactile, and wrist-vision components",
    "Force control, material handling, contact-data, and automatic-integration software",
    "Palletizing, machine-tending, and screwdriving workcells",
  ],
  customerGroups: locale === "zh" ? [
    "采用协作机器人或轻型工业机器人的制造企业",
    "机床、汽车、电子、食品饮料、包装和物流运营方",
    "机器人系统集成商、渠道伙伴与自动化工程团队",
    "研究接触操作、触觉数据和 Physical AI 的开发团队",
  ] : [
    "Manufacturers using collaborative or light-industrial robots",
    "Machine-tool, automotive, electronics, food-and-beverage, packaging, and logistics operators",
    "Robot integrators, channel partners, and automation engineering teams",
    "Developers researching contact manipulation, tactile data, and physical AI",
  ],
  milestones: locale === "zh" ? [
    { date: "2008", event: "公司由三位拉瓦尔大学机器人实验室成员创立。" },
    { date: "2018-12", event: "官方披露 Battery Ventures 投资 3,100 万加元，为首轮机构融资。" },
    { date: "2019-01", event: "在法国里昂设立欧洲总部，承担分销、伙伴支持和技术培训。" },
  ] : [
    { date: "2008", event: "The company was founded by three members of a Universite Laval robotics lab." },
    { date: "2018-12", event: "Robotiq disclosed a CAD 31 million Battery Ventures investment as its first institutional financing." },
    { date: "2019-01", event: "It opened a European headquarters in Lyon for distribution, partner support, and technical training." },
  ],
  catalogScope: locale === "zh"
    ? "按当前官网导航和具名规格表拆分 29 条组件、工作站型号与软件记录。指尖、吸盘、批头、法兰、线缆、维修件等订货附件尚未逐 SKU 建档；历史停产代际不作为当前产品。"
    : "Twenty-nine component, workcell-model, and software records are split from the current website navigation and named specification tables. Fingertips, cups, bits, flanges, cables, service parts, and other orderable accessories are not yet individual SKU records; discontinued generations are not treated as current products.",
  catalogCoverage: "model-partial",
  verificationFocus: locale === "zh"
    ? "按具体机器人、法兰、控制器、通信、工件、指尖/吸盘、气源、软件许可和安全评估锁定交付 BOM；网页参数变化时以当前手册修订为准。"
    : "Lock the delivery BOM against the exact robot, flange, controller, communications, workpiece, fingertip or cup, air supply, software license, and safety assessment; use the current manual revision when web figures change.",
  presalesQuestions: locale === "zh" ? [
    "工件尺寸、质量、材质、表面、重心、抓取姿态和机器人最大加速度是什么？",
    "目标机器人、法兰、控制器、通信协议和软件版本是否在当前兼容范围内？",
    "节拍、连续工况、断电保持、气源、IP、防护、维护和安全验收如何定义？",
  ] : [
    "What are the workpiece dimensions, mass, material, surface, center of gravity, grasp orientation, and maximum robot acceleration?",
    "Are the target robot, flange, controller, protocol, and software revision within the current compatibility scope?",
    "How are cycle time, continuous duty, power-loss holding, air supply, IP protection, maintenance, and safety acceptance defined?",
  ],
  reviewedAt: "2026-09-04",
});

export const applyRobotiqCompanyPatch = (company: CompanyProfile, locale: Locale): CompanyProfile => (
  company.slug === "robotiq" ? robotiqCompanyPatch(company, locale) : company
);

const makeSeed = ({
  id,
  product,
  pageUrl,
  datasheetUrl,
  extraSources,
  category,
  primary,
  subclass,
  type,
  integration,
  verification,
  rows,
  overview,
  applications,
  useCases,
  coverage = "official-complete",
  level = "model",
  specificationKind = "parameters",
}: ProductSeed): ProductSeed => ({
  id,
  product,
  pageUrl,
  datasheetUrl,
  extraSources,
  category,
  primary,
  subclass,
  type,
  integration,
  verification,
  rows,
  overview,
  applications,
  useCases,
  coverage,
  level,
  specificationKind,
});

const gripperSeed = (
  id: string,
  product: string,
  rows: SpecRow[],
  overview: Localized[],
  verification: Localized,
  coverage: FinderSpecificationCoverage = "official-complete",
  datasheetUrl = ADAPTIVE_SHEET,
): ProductSeed => makeSeed({
  id,
  product,
  pageUrl: ADAPTIVE_PAGE,
  datasheetUrl,
  category: "end-effector",
  primary: "manipulator-end-effector",
  subclass: "gripper",
  useCases: ["manufacturing", "logistics", "integration"],
  type: l("自适应电动夹爪", "Adaptive electric gripper"),
  integration: l(
    "可通过适配套件接入多种协作机器人，并通过工业通信协议接入其他机器人；法兰、控制器、线缆、软件包和双夹爪配置按具体机器人确认。",
    "Plug-and-play kits support multiple cobots, while industrial protocols support other robots. Confirm flange, controller, cable, software package, and dual-gripper configuration for the exact robot.",
  ),
  verification,
  rows,
  overview,
  applications: [
    l("机床上下料、装配与拾放", "Machine tending, assembly, and pick-and-place"),
    l("高混流制造中的多规格工件抓取", "Mixed-part handling in high-mix manufacturing"),
  ],
  coverage,
});

const handEPageRows = (stroke: string, mass: string) => sourced(ADAPTIVE_PAGE, sourceNames.page, [
  row("形闭合额定负载", "Form-fit payload", "7 kg", "7 kg", selectionConditions),
  row("可调行程", "Adjustable stroke", stroke),
  row("夹爪质量", "Gripper mass", mass),
  row("能源与腕部供电", "Energy and wrist supply", "电动；24 V，2 A", "Electric; 24 V, 2 A"),
  row("控制参数", "Control parameters", "工件检测、位置、速度、夹力", "Object detection, position, speed, and force"),
  row("保修循环口径", "Warranty cycle basis", "5,000,000 次循环；不含指尖", "5,000,000 cycles; fingertips excluded"),
  row("单指闭合力", "Closing force per finger", "20–185 N"),
  row("闭合速度", "Closing speed", "最高 150 mm/s", "Up to 150 mm/s"),
  row("重复精度", "Repeatability", "0.025 mm"),
  row("防护等级", "IP rating", "IP67"),
  row("工作温度", "Operating temperature", "-10–50 °C"),
]);

const handESheetRows = (stroke: string, mass: string) => sourced(ADAPTIVE_SHEET, sourceNames.sheet, [
  row("产品表行程", "Product-sheet stroke", stroke),
  row("产品表夹爪质量", "Product-sheet gripper mass", mass),
  row("产品表单指闭合力", "Product-sheet closing force per finger", "20–185 N"),
  row("整机夹持力", "Total grip strength", "40–370 N"),
  row("形闭合额定负载", "Form-fit payload", "7 kg", "7 kg", selectionConditions),
  row("指尖位置分辨率", "Fingertip position resolution", "0.2 mm"),
  row("可调闭合速度", "Adjustable closing speed", "20–150 mm/s"),
  row("通信协议", "Communication protocol", "Modbus RTU（RS-485）", "Modbus RTU (RS-485)"),
  row("防护等级", "IP rating", "IP67"),
]);

const handEC10Rows = [
  ...sourced(ADAPTIVE_SHEET, sourceNames.sheet, [
    row("可调直径行程", "Adjustable diametral stroke", "40 mm"),
    row("夹爪质量（产品表）", "Gripper mass (product sheet)", "1.5 kg"),
    row("单指闭合力", "Closing force per finger", "25–175 N"),
    row("整机夹持力", "Total grip strength", "40–525 N"),
    row("形闭合额定负载", "Form-fit payload", "10 kg", "10 kg", selectionConditions),
    row("指尖位置分辨率", "Fingertip position resolution", "0.08 mm"),
    row("直径位置分辨率", "Diametral position resolution", "0.16 mm"),
    row("可调闭合速度", "Adjustable closing speed", "14–107 mm/s"),
    row("通信协议", "Communication protocol", "Modbus RTU（RS-485）", "Modbus RTU (RS-485)"),
    row("防护等级", "IP rating", "IP67"),
    row("保修循环口径", "Warranty cycle basis", "5,000,000 次循环；不含指尖", "5,000,000 cycles; fingertips excluded"),
  ]),
  ...sourced(ADAPTIVE_PAGE, sourceNames.page, [
    row("当前网页夹爪质量", "Current-page gripper mass", "1.7 kg", "1.7 kg", l("官网规格区与文件名标注 2024-11 的产品表所列 1.5 kg 存在差异；采购前需按具体配置和最新手册确认。", "The web specification and the product sheet whose filename is marked 2024-11 differ at 1.7 kg versus 1.5 kg; confirm the exact configuration and latest manual before purchase.")),
    row("腕部供电", "Wrist supply", "24 V，2 A", "24 V, 2 A"),
    row("控制参数", "Control parameters", "工件检测、位置、速度、夹力", "Object detection, position, speed, and force"),
    row("重复精度", "Repeatability", "0.04 mm"),
    row("工作温度", "Operating temperature", "-10–50 °C"),
  ]),
];

const twoFingerRows = ({
  model,
  opening,
  encompassingDiameter,
  height,
  width,
  manualMass,
  force,
  speed,
  repeatability,
  resolution,
  payload,
  forceLimit,
}: {
  model: "2F-85" | "2F-140";
  opening: string;
  encompassingDiameter: string;
  height: string;
  width: string;
  manualMass: string;
  force: string;
  speed: string;
  repeatability: string;
  resolution: string;
  payload: string;
  forceLimit: string;
}) => [
  ...sourced(ADAPTIVE_PAGE, sourceNames.page, [
    row("当前网页额定负载", "Current-page payload", payload, payload, selectionConditions),
    row("当前网页夹爪质量", "Current-page gripper mass", "1 kg", "1 kg", l(`官网当前摘要将 ${model} 质量四舍五入为 1 kg；技术手册按指定联轴器和指尖给出更精确质量。`, `The current web summary rounds ${model} mass to 1 kg; the manual gives a more precise mass for a specified coupling and fingertip.`)),
    row("腕部供电", "Wrist supply", "24 V，2 A", "24 V, 2 A"),
    row("控制参数", "Control parameters", "工件检测、位置、速度、夹力", "Object detection, position, speed, and force"),
    row("保修循环口径", "Warranty cycle basis", "2,000,000 次循环", "2,000,000 cycles"),
    row("防护等级", "IP rating", "IP40"),
    row("工作温度", "Operating temperature", "-10–50 °C"),
  ]),
  ...sourced(TWO_FINGER_MANUAL, sourceNames.manual, [
    row("最大开口", "Maximum opening", opening),
    row("包络抓取最小工件直径", "Minimum encompassing-object diameter", encompassingDiameter),
    row("最大高度", "Maximum height", height),
    row("最大宽度", "Maximum width", width),
    row("质量（手册测试配置）", "Mass (manual test configuration)", manualMass, manualMass, l("包含 GRP-CPL-062 联轴器和手册指定的标准硅胶指尖。", "Includes the GRP-CPL-062 coupling and the manual-specified standard silicone fingertip.")),
    row("夹持力", "Grasp force", force),
    row("手指速度", "Finger speed", speed),
    row("位置重复精度", "Position repeatability", repeatability, repeatability, l("为新制造产品的典型值，会随磨损和工况变化。", "Typical for newly manufactured products and varies with wear and operating conditions.")),
    row("夹持力重复性", "Force repeatability", "±10%"),
    row("位置分辨率", "Position resolution", resolution),
    row("摩擦抓取最大负载", "Maximum friction-grip payload", payload, payload, selectionConditions),
    row("形闭合最大负载", "Maximum form-fit payload", payload, payload, selectionConditions),
    row("允许外力 Fx / Fy / Fz", "Permissible external force Fx / Fy / Fz", forceLimit, forceLimit, selectionConditions),
    row("允许力矩 Mx / My", "Permissible moment Mx / My", "5 N·m"),
    row("允许力矩 Mz", "Permissible moment Mz", "3 N·m"),
    row("工作供电电压", "Operating supply voltage", "24 V DC ±10%"),
    row("绝对最大供电电压", "Absolute maximum supply voltage", "28 V DC"),
    row("静态功耗", "Quiescent power", "<1 W"),
    row("峰值电流", "Peak current", "1 A"),
    row("自定义指尖尺寸上限", "Custom fingertip size limit", "从指尖基座起高度和宽度均不超过 100 mm", "No more than 100 mm in height or width from the fingertip base"),
  ]),
];

const productSeeds: ProductSeed[] = [
  gripperSeed(
    "verified-robotiq-hand-e-50",
    "Hand-E 50 mm",
    [...handEPageRows("50 mm", "1 kg"), ...handESheetRows("50 mm", "1 kg")],
    [
      l("Hand-E 50 mm 是密封式平行夹爪配置，面向 CNC 上下料、精密装配和尺寸变化较小的工件。", "Hand-E 50 mm is the sealed parallel-gripper configuration for CNC tending, precision assembly, and parts with limited size variation."),
      l("7 kg 是形闭合负载口径；摩擦抓取仍需按指尖材料、工件表面、方向和加速度计算。", "The 7 kg figure is a form-fit payload basis; friction gripping still requires calculation against fingertip material, part surface, orientation, and acceleration."),
    ],
    l("确认 50 mm 行程、可更换指尖、工件包络、双夹爪质量和机器人动态负载图。", "Confirm the 50 mm stroke, replaceable fingertips, part envelope, dual-gripper mass, and robot dynamic load diagram."),
  ),
  gripperSeed(
    "verified-robotiq-hand-e-100",
    "Hand-E 100 mm",
    [...handEPageRows("100 mm", "1.1 kg"), ...handESheetRows("100 mm", "1.1 kg")],
    [
      l("Hand-E 100 mm 保留 Hand-E 的夹力、速度和 IP67 防护，同时用增加的行程覆盖更宽工件范围。", "Hand-E 100 mm retains Hand-E force, speed, and IP67 protection while extending stroke for a wider part range."),
      l("相对 50 mm 版本，夹爪质量增加到 1.1 kg；机器人腕部余量和双夹爪配置需重新核算。", "Mass rises to 1.1 kg versus the 50 mm version, so robot-wrist margin and dual-gripper configurations require a new calculation."),
    ],
    l("确认 100 mm 行程是否真正需要，并按更长行程下的碰撞包络、重心、节拍和机器人载荷复核。", "Confirm that 100 mm stroke is required and verify collision envelope, center of gravity, cycle time, and robot payload at the longer stroke."),
  ),
  gripperSeed(
    "verified-robotiq-hand-e-c10",
    "Hand-E C10",
    handEC10Rows,
    [
      l("Hand-E C10 以 40 mm 直径行程、10 kg 形闭合负载和最高 525 N 总夹持力面向更高负载的紧凑抓取。", "Hand-E C10 targets compact higher-load handling with 40 mm diametral stroke, 10 kg form-fit payload, and up to 525 N total grip strength."),
      l("官网与当前产品表对质量口径存在 1.7 kg 和 1.5 kg 差异，本记录并列保留，不擅自判定其中一个失效。", "The web page and current product sheet publish 1.7 kg and 1.5 kg mass figures. Both are preserved rather than silently treating one as obsolete."),
    ],
    l("锁定交付配置后确认质量口径、直径行程、指尖、摩擦抓取负载、重复精度和防护要求。", "After locking the delivered configuration, confirm mass basis, diametral stroke, fingertips, friction-grip payload, repeatability, and ingress protection."),
  ),
  gripperSeed(
    "verified-robotiq-2f-85",
    "2F-85",
    twoFingerRows({ model: "2F-85", opening: "85 mm", encompassingDiameter: "43 mm", height: "162.8 mm", width: "148.6 mm", manualMass: "0.925 kg", force: "20–235 N", speed: "20–150 mm/s", repeatability: "0.05 mm", resolution: "0.4 mm", payload: "5 kg", forceLimit: "50 N" }),
    [
      l("2F-85 是 85 mm 开口的自适应两指夹爪，当前官网给出 5 kg 负载、20–235 N 夹持力与 IP40。", "2F-85 is an 85 mm-opening adaptive two-finger gripper with a current published 5 kg payload, 20–235 N grasp force, and IP40."),
      l("手册参数基于指定联轴器和硅胶指尖，定制指尖会改变力、包络和允许力矩。", "Manual figures use a specified coupling and silicone fingertip; custom fingertips change force, envelope, and permissible moments."),
    ],
    l("按摩擦系数、安全系数、加速度、紧急停止、指尖长度和外力/力矩限制计算实际负载。", "Calculate actual payload against friction coefficient, safety factor, acceleration, emergency stop, fingertip length, and external force/moment limits."),
    "official-complete",
    TWO_FINGER_MANUAL,
  ),
  gripperSeed(
    "verified-robotiq-2f-140",
    "2F-140",
    twoFingerRows({ model: "2F-140", opening: "140 mm", encompassingDiameter: "90 mm", height: "232.8 mm", width: "202.1 mm", manualMass: "1.025 kg", force: "10–125 N", speed: "30–250 mm/s", repeatability: "0.08 mm", resolution: "0.6 mm", payload: "2.5 kg", forceLimit: "25 N" }),
    [
      l("2F-140 用 140 mm 开口覆盖更大工件，但额定负载、夹持力和允许外力低于 2F-85。", "2F-140 extends opening to 140 mm for larger parts, while payload, grasp force, and permissible external force are lower than 2F-85."),
      l("更大行程不等于更高负载，选型需要在尺寸包络、夹力、速度和机器人腕部空间之间权衡。", "Longer stroke does not imply higher payload; selection trades part envelope against force, speed, and robot-wrist space."),
    ],
    l("核对 140 mm 开口是否必要，并按 2.5 kg 负载、25 N 外力上限、指尖和加速度进行工况验证。", "Confirm the need for 140 mm opening and validate duty against the 2.5 kg payload, 25 N external-force limit, fingertips, and acceleration."),
    "official-complete",
    TWO_FINGER_MANUAL,
  ),
];

productSeeds.push(
  gripperSeed(
    "verified-robotiq-3-finger",
    "3-Finger Adaptive Robot Gripper",
    [
      ...sourced(ADAPTIVE_PAGE, sourceNames.page, [
        row("当前网页额定负载", "Current-page payload", "10 kg", "10 kg", selectionConditions),
        row("夹爪质量", "Gripper mass", "2.3 kg"),
        row("最大工件直径", "Maximum object diameter", "155 mm"),
        row("可调夹持力", "Adjustable grasp force", "30–70 N"),
        row("手指速度", "Finger speed", "22–110 mm/s"),
        row("位置重复精度", "Position repeatability", "0.05 mm"),
        row("工作温度", "Operating temperature", "-10–50 °C"),
        row("机器人兼容范围", "Robot compatibility scope", "Universal Robots 协作机器人", "Universal Robots cobots"),
      ]),
      ...sourced(THREE_FINGER_MANUAL, sourceNames.manual, [
        row("抓取模式", "Grasp modes", "基本、宽型、捏取、剪切", "Basic, wide, pinch, and scissor"),
        row("包络抓取最大负载", "Maximum encompassing-grip payload", "10 kg", "10 kg", selectionConditions),
        row("指尖抓取最大负载", "Maximum fingertip-grip payload", "2.5 kg", "2.5 kg", selectionConditions),
        row("单指最大作用力", "Maximum force per finger", "60 N"),
        row("手指脱开力", "Finger breakaway force", "100 N"),
        row("储存温度", "Storage temperature", "-30–60 °C"),
        row("工作相对湿度", "Operating relative humidity", "20–80%（无冷凝）", "20–80% (non-condensing)"),
        row("允许振动", "Permissible vibration", "<0.5 G"),
        row("额定供电", "Nominal supply", "24 V DC"),
        row("绝对最大供电电压", "Absolute maximum supply voltage", "28 V DC"),
        row("静态功耗", "Quiescent power", "4.1 W"),
        row("峰值功耗", "Peak power", "36 W"),
        row("最大 RMS 电流", "Maximum RMS current", "1.5 A"),
        row("工业通信选项", "Industrial communication options", "EtherNet/IP、Modbus TCP、Modbus RTU（RS-232/RS-485）、EtherCAT、DeviceNet、CANopen、PROFINET", "EtherNet/IP, Modbus TCP, Modbus RTU (RS-232/RS-485), EtherCAT, DeviceNet, CANopen, and PROFINET"),
        row("维护接口", "Service interface", "USB"),
        row("指垫与指尖寿命口径", "Finger-pad and fingertip life basis", "1,000,000 次循环", "1,000,000 cycles"),
        row("齿轮寿命与保修口径", "Gear life and warranty basis", "2,000,000 次循环或 1 年", "2,000,000 cycles or one year"),
      ]),
    ],
    [
      l("3-Finger 通过四种抓取模式覆盖圆柱、球形和形状变化较大的工件，属于多模式自适应夹爪。", "The 3-Finger gripper uses four grasp modes for cylindrical, spherical, and shape-variable parts."),
      l("当前网页与较早技术手册的参数口径并存；通信模块、联轴器和机器人兼容性必须按交付代际确认。", "Current web data and an older technical manual coexist; confirm the delivered generation, communication module, coupling, and robot compatibility."),
    ],
    l("确认抓取模式、指尖、工件重心、通信模块、机器人载荷图，以及手册修订与交付硬件是否一致。", "Confirm grasp mode, fingertips, part center of gravity, communication module, robot load diagram, and alignment between manual revision and delivered hardware."),
    "official-partial",
    THREE_FINGER_MANUAL,
  ),
);

const vacuumSeed = ({
  id,
  product,
  rows,
  overview,
  verification,
  coverage = "official-complete",
  pageUrl = VACUUM_PAGE,
  datasheetUrl = VACUUM_SHEET,
}: {
  id: string;
  product: string;
  rows: SpecRow[];
  overview: Localized[];
  verification: Localized;
  coverage?: FinderSpecificationCoverage;
  pageUrl?: string;
  datasheetUrl?: string;
}) => makeSeed({
  id,
  product,
  pageUrl,
  datasheetUrl,
  category: "end-effector",
  primary: "manipulator-end-effector",
  subclass: "vacuum-gripper",
  useCases: ["manufacturing", "logistics", "integration"],
  type: l("真空抓具", "Vacuum gripper"),
  integration: l(
    "通过 Robotiq 控制与安装生态接入支持的协作机器人；气动型号还需核对洁净压缩空气、管径、流量、泄漏和排气条件。",
    "Integrates with supported cobots through Robotiq controls and mounting. Pneumatic models also require clean compressed air, tubing, airflow, leakage, and exhaust checks.",
  ),
  verification,
  rows,
  overview,
  applications: [
    l("箱体、袋装、板材与多件阵列搬运", "Handling cases, bags, sheets, and multi-item arrays"),
    l("码垛、拆码垛、包装和机床上下料", "Palletizing, depalletizing, packaging, and machine tending"),
  ],
  coverage,
});

productSeeds.push(
  vacuumSeed({
    id: "verified-robotiq-powerpick-multi",
    product: "PowerPick Multi",
    pageUrl: VACUUM_PAGE,
    datasheetUrl: POWERPICK_MULTI_MANUAL,
    rows: [
      ...sourced(VACUUM_PAGE, sourceNames.page, [
        row("驱动方式", "Actuation", "压缩空气", "Compressed air"),
        row("最大额定负载", "Maximum rated payload", "30 kg", "30 kg", selectionConditions),
        row("工具质量", "Tool mass", "4.2 kg"),
        row("公开配置数量", "Published configuration count", "6 种", "6"),
        row("真空通道", "Vacuum channels", "双通道独立控制", "Two independently controlled channels"),
        row("最大真空度", "Maximum vacuum", "92%"),
        row("最大真空流量", "Maximum vacuum airflow", "392 L/min"),
        row("典型抓取时间", "Typical grip time", "0.14 s"),
        row("压缩空气质量", "Compressed-air quality", "ISO 8573-1 等级 7-4-4", "ISO 8573-1 class 7-4-4"),
        row("工作温度", "Operating temperature", "10–50 °C"),
        row("吸盘数量", "Cup count", "24"),
        row("当前机器人兼容范围", "Current robot compatibility", "Universal Robots", "Universal Robots"),
      ]),
      ...sourced(POWERPICK_MULTI_MANUAL, sourceNames.manual, [
        row("典型释放时间", "Typical release time", "0.04 s"),
        row("允许供气压力", "Permissible feed pressure", "3–8 bar"),
        row("6.5 bar 时耗气量", "Air consumption at 6.5 bar", "476 L/min"),
        row("3 bar 时耗气量", "Air consumption at 3 bar", "276 L/min"),
        row("8 bar 时耗气量", "Air consumption at 8 bar", "542 L/min"),
        row("正常运行最大加速度", "Maximum normal-operation acceleration", "1.5 G", "1.5 G", selectionConditions),
        row("紧急停止加速度校核值", "Emergency-stop acceleration check", "3.5 G", "3.5 G", selectionConditions),
        row("适配机器人负载代际", "Supported robot payload generations", "UR20 / UR30；实际负载按配置器", "UR20 / UR30; actual payload per configurator"),
      ]),
    ],
    overview: [
      l("PowerPick Multi 是双真空通道、多吸盘阵列抓具，面向高负载箱体与不规则阵列搬运。", "PowerPick Multi is a dual-channel multi-cup vacuum tool for higher-payload cases and irregular arrays."),
      l("30 kg 是产品级上限，不等于任意吸盘布局都可达到；工件表面、加速度、重心和机器人负载图共同限制实际结果。", "The 30 kg product limit does not apply to every cup layout; part surface, acceleration, center of gravity, and the robot load diagram jointly limit actual performance."),
    ],
    verification: l("通过配置器确认吸盘布局、独立通道、工件泄漏率、气源余量、机器人和紧急停止工况。", "Use the configurator to confirm cup layout, independent channels, part leakage, air-supply margin, robot, and emergency-stop case."),
    coverage: "official-partial",
  }),
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

const parameterRows = (locale: Locale, seed: ProductSeed): FinderParameter[] => withParameterIndex(
  seed.rows.map((item) => ({
    label: t(locale, item.label),
    value: t(locale, item.value),
    status: "manufacturer" as const,
    sourceUrl: item.sourceUrl ?? seed.datasheetUrl ?? seed.pageUrl,
    sourceLabel: t(locale, item.sourceLabel ?? (seed.datasheetUrl ? sourceNames.sheet : sourceNames.page)),
    sourceLocator: t(locale, item.locator ?? l("产品规格或能力说明", "Product specification or capability section")),
    conditions: item.conditions ? t(locale, item.conditions) : undefined,
  })),
  seed.datasheetUrl ?? seed.pageUrl,
  locale === "zh" ? "Robotiq 官方技术资料" : "Robotiq official technical material",
);

const toRecord = (locale: Locale, company: CompanyProfile, seed: ProductSeed): FinderExpansionRecord => {
  const coverage = seed.coverage ?? "official-complete";
  const sourceLinks = [
    { label: locale === "zh" ? `${seed.product} 官方产品页` : `${seed.product} official product page`, url: seed.pageUrl },
    ...(seed.datasheetUrl && seed.datasheetUrl !== seed.pageUrl
      ? [{ label: locale === "zh" ? `${seed.product} 官方技术资料` : `${seed.product} official technical material`, url: seed.datasheetUrl }]
      : []),
    ...(seed.extraSources ?? []).map((item) => ({ label: t(locale, item.label), url: item.url })),
    { label: locale === "zh" ? "Robotiq 公司介绍" : "About Robotiq", url: ROBOTIQ_ABOUT },
  ];

  return {
    id: seed.id,
    matrixSlug: "",
    matrixTitle: locale === "zh" ? "Robotiq 型号级产品目录" : "Robotiq model-level product catalog",
    industry: "robotics",
    reviewedAt: "2026-09-04",
    product: seed.product,
    company: company.name,
    type: t(locale, seed.type),
    openness: locale === "zh" ? "官方产品页、数据表或用户指南公开" : "Official product page, sheet, or user guide is public",
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
      ? "本记录对应当前具名型号、配置或软件模块；订货附件、兼容矩阵和历史代际不自动并入。"
      : "This record applies to the named current model, configuration, or software module; orderable accessories, compatibility matrices, and historical generations are not merged automatically.",
    profile: finderProfile(company),
    evidence: {
      level: seed.level ?? "model",
      specificationKind: seed.specificationKind ?? "parameters",
      specificationCoverage: coverage,
      specificationCoverageNote: locale === "zh"
        ? coverage === "official-complete"
          ? "已转录当前引用官方规格表中的公开字段，并保留测试、配置和来源条件。"
          : coverage === "capability-only"
            ? "该条目公开内容以软件或工作站能力为主，不存在与单一硬件型号相同的统一数值规格表。"
            : "已收录当前可核对参数；因官网与手册修订并存或兼容矩阵较大，不宣称跨修订逐页完整。"
        : coverage === "official-complete"
          ? "Public fields in the currently cited official specification table are transcribed with test, configuration, and source conditions preserved."
          : coverage === "capability-only"
            ? "This entry is documented primarily through software or workcell capabilities and has no single hardware-style numeric specification table."
            : "Currently verifiable parameters are indexed; because web and manual revisions coexist or compatibility matrices are large, cross-revision page-by-page completeness is not claimed.",
      overview: seed.overview.map((item) => t(locale, item)),
      applications: seed.applications.map((item) => t(locale, item)),
      disclosureBoundary: locale === "zh"
        ? "“规格表字段已覆盖”只指当前引用版本的公开字段，不表示厂商公开了价格、交期、可靠性统计、全部机器人组合或项目验收结果；来源冲突已并列保留。"
        : "Specification-table coverage refers only to public fields in the cited revision. It does not imply disclosure of price, lead time, reliability statistics, every robot combination, or project acceptance results; source conflicts are preserved side by side.",
      sourceLinks: [...new Map(sourceLinks.map((item) => [item.url, item])).values()],
    },
  };
};

export const getRobotiqProductRecords = (locale: Locale, company: CompanyProfile): FinderExpansionRecord[] => (
  productSeeds.map((seed) => toRecord(locale, company, seed))
);

productSeeds.push(
  makeSeed({
    id: "verified-robotiq-ft-300-s",
    product: "FT 300-S",
    pageUrl: FT_PAGE,
    category: "perception",
    primary: "sensing",
    subclass: "force-torque-sensor",
    useCases: ["research", "manufacturing", "integration"],
    type: l("六轴力/矩传感器", "Six-axis force/torque sensor"),
    integration: l("通过 Modbus RTU（RS-485）输出 100 Hz 六轴数据；面向 Universal Robots 的套件与 Force Copilot 软件组合使用。", "Outputs six-axis data at 100 Hz over Modbus RTU (RS-485); Universal Robots kits pair it with Force Copilot software."),
    verification: l("确认机器人代际、安装法兰、坐标系、采样链路、过载方向、线缆布置和标定要求。", "Confirm robot generation, mounting flange, coordinate frame, sampling chain, overload direction, cable routing, and calibration requirements."),
    rows: sourced(FT_PAGE, sourceNames.page, [
      row("传感器质量", "Sensor mass", "0.44 kg"),
      row("测量轴数", "Measured axes", "6 轴", "6 axes"),
      row("Fx 量程", "Fx range", "±300 N"),
      row("Fy 量程", "Fy range", "±300 N"),
      row("Fz 量程", "Fz range", "±300 N"),
      row("Mx 量程", "Mx range", "±30 N·m"),
      row("My 量程", "My range", "±30 N·m"),
      row("Mz 量程", "Mz range", "±30 N·m"),
      row("过载能力", "Overload capacity", "500%"),
      row("输出频率", "Output rate", "100 Hz"),
      row("通信协议", "Communication protocol", "Modbus RTU（RS-485）", "Modbus RTU (RS-485)"),
      row("电磁环境说明", "Electromagnetic-environment statement", "厂商称对外部噪声具有抗扰能力；项目仍需做 EMC 与布线验证", "Manufacturer states immunity to external noise; project EMC and wiring validation remains required"),
      row("防护等级", "IP rating", "IP65"),
      row("工作温度", "Operating temperature", "5–40 °C"),
    ]),
    overview: [
      l("FT 300-S 在机器人腕部测量三轴力与三轴力矩，可用于装配、打磨、表面跟随和接触检测。", "FT 300-S measures three force and three torque axes at the robot wrist for assembly, finishing, surface following, and contact detection."),
      l("500% 过载不是允许持续工作量程；选型和安全设置仍以 ±300 N、±30 N·m 的测量范围及应用方向为基础。", "The 500% overload figure is not a continuous operating range; selection and safety settings remain based on the ±300 N and ±30 N·m measurement ranges and load direction."),
    ],
    applications: [l("精密装配、打磨抛光、表面查找与质量检测", "Precision assembly, finishing, surface finding, and quality inspection")],
  }),
  makeSeed({
    id: "verified-robotiq-tsf-85",
    product: "TSF-85",
    pageUrl: TSF_PAGE,
    datasheetUrl: TSF_GUIDE,
    category: "perception",
    primary: "sensing",
    subclass: "tactile-sensor",
    useCases: ["research", "manufacturing", "integration"],
    type: l("触觉传感指尖", "Tactile sensor fingertip"),
    integration: l("两个 TSF-85 替换兼容 2F-85 的标准指尖，通过 USB 2.0 接入外部计算机；官方快速入门程序提供数据访问，ROS/C++ 支持范围按当前软件仓库确认。", "Two TSF-85 units replace the standard fingertips on a compatible 2F-85 and connect to an external computer over USB 2.0. The official Quickstart application exposes data; confirm current ROS/C++ support in the software repository."),
    verification: l("确认 2F-85 硬件序列代际、双传感器套件、主机与 USB 带宽、零点与漂移、保护膜磨损、SDK 版本和实时性。", "Confirm 2F-85 hardware generation, two-sensor kit, host and USB bandwidth, zero and drift behavior, protective-film wear, SDK version, and real-time requirements."),
    rows: [
      ...sourced(TSF_PAGE, sourceNames.page, [
        row("兼容夹爪", "Compatible gripper", "2F-85 v4（2019 年起，C-XXXXX 序列）", "2F-85 v4 (from 2019, C-XXXXX serial)"),
        row("设计循环口径", "Design-cycle basis", ">2,000,000 次循环", ">2,000,000 cycles"),
        row("触觉单元阵列", "Taxel array", "28 个；4 × 7", "28 taxels; 4 × 7"),
        row("动态信号频率", "Dynamic-signal rate", "1,000 Hz"),
        row("页面公布力范围", "Page-published force range", "0–225 N", "0–225 N", l("用户指南强调原始与合成信号口径；该网页范围不应被视作未经标定即可达到的绝对精密测力范围。", "The guide distinguishes raw and aggregate signals; this web range should not be treated as an absolute precision-force range without calibration.")),
        row("传感面尺寸", "Sensing-face dimensions", "28.4 × 44 mm"),
        row("惯性测量", "Inertial measurement", "三轴加速度计与三轴陀螺仪", "Three-axis accelerometer and three-axis gyroscope"),
      ]),
      ...sourced(TSF_GUIDE, sourceNames.guide, [
        row("传感器外形宽度", "Sensor width", "28.4 mm"),
        row("传感器外形高度", "Sensor height", "44 mm"),
        row("传感器外形厚度", "Sensor thickness", "10.9 mm"),
        row("安装螺钉中心距", "Mounting-screw spacing", "17.9 mm"),
        row("工作温度", "Operating temperature", "0–40 °C"),
        row("工作相对湿度", "Operating relative humidity", "20–80%（无冷凝）", "20–80% (non-condensing)"),
        row("每套工作传感器数量", "Sensors per working set", "2"),
        row("主机接口", "Host interface", "USB 2.0 Type-A"),
        row("最大主机电流", "Maximum host current", "<500 mA"),
        row("压力图刷新率", "Pressure-map update rate", "60 Hz"),
        row("压力灵敏度典型值", "Typical pressure sensitivity", "0.011 N/count"),
        row("合力分辨率典型值", "Typical aggregate-force resolution", "0.5 N"),
        row("合力噪声典型值", "Typical aggregate-force noise", "0.5 N"),
        row("单触觉单元噪声典型值", "Typical per-taxel noise", "8 counts"),
        row("动态信号原始范围", "Dynamic-signal raw range", "-32767–32767 counts"),
        row("动态信号换算", "Dynamic-signal conversion", "raw × 1.024 / 32767 mV"),
        row("动态信号采样率", "Dynamic-signal sampling rate", "1,000 Hz"),
        row("IMU 采样率", "IMU sampling rate", "1,000 Hz"),
        row("加速度计量程", "Accelerometer range", "±2 g"),
        row("陀螺仪量程", "Gyroscope range", "±250 °/s"),
        row("官方软件边界", "Official software boundary", "Quickstart 直接访问；非即插即用应用，需外部计算机；C++/ROS 支持按当前仓库，NVIDIA 集成为路线图项目", "Direct access through Quickstart; not a plug-and-play application and requires an external computer; C++/ROS support depends on the current repository, while NVIDIA integration is a roadmap item"),
        row("保修口径", "Warranty basis", "1 年；保护膜等正常磨损不在常规保修范围", "One year; normal wear such as protective-film wear is excluded from standard coverage"),
      ]),
    ],
    overview: [
      l("TSF-85 把压力阵列、动态接触信号和 IMU 集成到 2F-85 指尖，用于接触事件、滑移与操作数据采集。", "TSF-85 integrates a pressure array, dynamic contact signal, and IMU into 2F-85 fingertips for contact events, slip, and manipulation-data collection."),
      l("公开资料同时包含网页级 0–225 N 范围和指南中的原始计数、灵敏度与典型噪声，两者代表不同数据口径，不能直接互换。", "Public material combines a web-level 0–225 N range with guide-level raw counts, sensitivity, and typical noise. These are different data bases and are not interchangeable."),
    ],
    applications: [l("触觉抓取研究、接触分类、滑移检测与 Physical AI 数据采集", "Tactile grasp research, contact classification, slip detection, and physical-AI data collection")],
    coverage: "official-partial",
  }),
  makeSeed({
    id: "verified-robotiq-wrist-camera",
    product: "Wrist Camera",
    pageUrl: WRIST_CAMERA_PAGE,
    category: "perception",
    primary: "sensing",
    subclass: "vision-sensor",
    useCases: ["manufacturing", "integration"],
    type: l("机器人腕部相机", "Robot wrist camera"),
    integration: l("相机安装在机器人腕部，与 Robotiq 视觉软件和兼容的 Universal Robots 应用配合；视场随机器人型号和工作距离变化。", "Mounts at the robot wrist and works with Robotiq vision software and compatible Universal Robots applications; field of view varies with robot model and working distance."),
    verification: l("按最小/最大工件占比、工作距离、视场、遮挡、照明、表面反光、运动模糊和机器人代际做样件测试。", "Test representative parts against minimum/maximum image share, working distance, field of view, occlusion, lighting, reflectivity, motion blur, and robot generation."),
    rows: sourced(WRIST_CAMERA_PAGE, sourceNames.page, [
      row("相机质量", "Camera mass", "0.16 kg"),
      row("外形尺寸", "Dimensions", "87.5 × 75 × 22.4 mm"),
      row("图像传感器", "Image sensor", "5 MP 彩色", "5 MP color"),
      row("对焦方式", "Focus method", "电子对焦", "Electronic focus"),
      row("页面焦距/工作距离摘要", "Page focus/working-distance summary", "70 mm 起", "From 70 mm"),
      row("规格表对焦范围", "Specification-table focus range", "7 mm–∞", "7 mm to infinity", l("同一官方页面的叙述区与规格区存在 70 mm 和 7 mm 差异，采购前需向厂商确认当前硬件口径。", "Narrative and specification sections on the same official page differ at 70 mm and 7 mm; confirm the current hardware basis with the manufacturer.")),
      row("最小视场", "Minimum field of view", "10 × 7.5 cm"),
      row("最大视场", "Maximum field of view", "71 × 54 cm（UR16 示例；随机器人变化）", "71 × 54 cm (UR16 example; varies by robot)"),
      row("建议最小工件占视场比例", "Recommended minimum part share of field", "10%"),
      row("建议最大工件占视场比例", "Recommended maximum part share of field", "60%"),
      row("照明", "Illumination", "6 颗漫射 LED", "Six diffuse LEDs"),
      row("当前机器人兼容范围", "Current robot compatibility", "Universal Robots；最大视场随型号变化", "Universal Robots; maximum field varies by model"),
    ]),
    overview: [
      l("Wrist Camera 面向协作机器人拾取与定位，把相机和漫射照明放在末端附近，便于换产时重新定义工件。", "Wrist Camera supports cobot picking and localization by placing the camera and diffuse lighting near the end effector for part redefinition during changeover."),
      l("同一页面给出的 70 mm 与 7 mm 对焦下限不一致，本记录保留冲突并要求项目核实。", "The same page publishes conflicting 70 mm and 7 mm lower focus limits; this record preserves the conflict and requires project confirmation."),
    ],
    applications: [l("工件定位、拾取、机床上下料与高混流换产", "Part localization, picking, machine tending, and high-mix changeover")],
    coverage: "official-partial",
  }),
);

productSeeds.push(
  makeSeed({
    id: "verified-robotiq-sd-100",
    product: "SD-100",
    pageUrl: SCREWDRIVING_PAGE,
    category: "end-effector",
    primary: "manipulator-end-effector",
    subclass: "screwdriver",
    useCases: ["manufacturing", "integration"],
    type: l("自动锁付主轴", "Automated screwdriver spindle"),
    integration: l("作为 Robotiq Screwdriving Solution 的锁付执行端，与 SF-300 供钉器、Force Copilot 和兼容机器人组合。", "Serves as the fastening end tool in the Robotiq Screwdriving Solution with the SF-300 feeder, Force Copilot, and a compatible robot."),
    verification: l("按螺钉材料、螺纹、目标扭矩、主轴转速、批头、真空套筒、供气和质量验收曲线验证。", "Validate screw material, thread, target torque, spindle speed, bit, vacuum sleeve, air supply, and quality-acceptance curve."),
    rows: sourced(SCREWDRIVING_PAGE, sourceNames.page, [
      row("扭矩范围", "Torque range", "0.3–4 N·m"),
      row("螺钉规格范围", "Screw size range", "M2.5–M5"),
      row("主轴转速", "Spindle speed", "1–600 rpm"),
      row("耗气量", "Air consumption", "65 L/min"),
      row("工具质量", "Tool mass", "1.5 kg"),
      row("外形尺寸", "Dimensions", "272 × 143.5 × 75 mm"),
      row("配套功能", "Paired functions", "Force Copilot、预编程恢复、可更换批头与真空套筒", "Force Copilot, preprogrammed recovery, replaceable bits, and vacuum sleeves"),
    ]),
    overview: [l("SD-100 是 M2.5–M5 螺钉的机器人锁付主轴，公开扭矩范围为 0.3–4 N·m。", "SD-100 is a robotic spindle for M2.5–M5 screws with a published 0.3–4 N·m torque range.")],
    applications: [l("电子、电气、汽车零部件和一般装配锁付", "Screwdriving in electronics, electrical equipment, automotive components, and general assembly")],
  }),
  makeSeed({
    id: "verified-robotiq-sf-300",
    product: "SF-300",
    pageUrl: SCREWDRIVING_PAGE,
    category: "end-effector",
    primary: "manipulator-end-effector",
    subclass: "screw-feeder",
    useCases: ["manufacturing", "integration"],
    type: l("自动供钉器", "Automatic screw feeder"),
    integration: l("作为 Screwdriving Solution 的供料模块向 SD-100 提供单颗螺钉；螺钉几何、表面和套筒需按认证组合确认。", "Feeds individual screws to the SD-100 within the Screwdriving Solution; screw geometry, finish, and sleeve require confirmation against approved combinations."),
    verification: l("以实际螺钉确认直径、长度、表面处理、供钉节拍、料斗容量、卡钉恢复和换型时间。", "Confirm diameter, length, finish, feed cycle, hopper capacity, jam recovery, and changeover time with production screws."),
    rows: sourced(SCREWDRIVING_PAGE, sourceNames.page, [
      row("螺钉规格范围", "Screw size range", "M2.5–M5"),
      row("螺钉长度范围", "Screw length range", "6–25 mm"),
      row("典型供钉时间", "Typical feed time", "3 s/颗", "3 s per screw"),
      row("料斗容积", "Hopper volume", "300 cc"),
      row("外形尺寸", "Dimensions", "157 × 286 × 171 mm"),
      row("配套主轴", "Paired spindle", "SD-100"),
    ]),
    overview: [l("SF-300 是面向 M2.5–M5、长度 6–25 mm 螺钉的自动供料模块，与 SD-100 组成完整锁付单元。", "SF-300 automatically feeds M2.5–M5 screws from 6 to 25 mm long and pairs with SD-100 as a complete fastening unit.")],
    applications: [l("自动化装配线中的连续供钉与快速换型", "Continuous screw feeding and changeover in automated assembly")],
  }),
);

const palletModelRows = ({ payload, throughput, height, width, footprint, architecture }: {
  payload: string;
  throughput: string;
  height: string;
  width: string;
  footprint: string;
  architecture: string;
}) => sourced(PALLETIZING_SHEET, sourceNames.sheet, [
  row("最大额定负载", "Maximum rated payload", payload, payload, selectionConditions),
  row("最大节拍", "Maximum throughput", throughput, throughput, selectionConditions),
  row("最大码垛高度", "Maximum palletizing height", height, height, selectionConditions),
  row("最大托盘宽度", "Maximum pallet width", width),
  row("最大托盘深度", "Maximum pallet depth", "1219 mm"),
  row("占地空间", "Footprint", footprint),
  row("码垛图案", "Pallet patterns", "不限；由软件和工况约束", "Unlimited; constrained by software and application"),
  row("抓具兼容", "Gripper compatibility", "Robotiq 码垛抓具系列；按配置器", "Robotiq palletizing gripper range; per configurator"),
  row("软件", "Software", "Material Handling Copilot"),
  row("机械架构", "Mechanical architecture", architecture),
]);

[
  { id: "verified-robotiq-ax30", product: "AX30", payload: "32 kg", throughput: "10 cycles/min", height: "2750 mm", width: "1219 mm", footprint: ">2900 × 1766 mm", architecture: "第七轴直线升降", architectureEn: "Seventh-axis linear lift" },
  { id: "verified-robotiq-ax20", product: "AX20", payload: "23 kg", throughput: "10 cycles/min", height: "3000 mm", width: "1219 mm", footprint: ">2900 × 1766 mm", architecture: "第七轴直线升降", architectureEn: "Seventh-axis linear lift" },
  { id: "verified-robotiq-ax10", product: "AX10", payload: "11.5 kg", throughput: "13 cycles/min", height: "2750 mm", width: "1219 mm", footprint: ">2700 × 1766 mm", architecture: "第七轴直线升降", architectureEn: "Seventh-axis linear lift" },
  { id: "verified-robotiq-pe20", product: "PE20", payload: "23 kg", throughput: "13 cycles/min", height: "2150 mm", width: "1219 mm", footprint: ">2900 × 1766 mm", architecture: "固定基座", architectureEn: "Fixed pedestal" },
  { id: "verified-robotiq-pe10", product: "PE10", payload: "11.5 kg", throughput: "13 cycles/min", height: "1550 mm", width: "800 mm", footprint: ">2700 × 1766 mm", architecture: "固定基座", architectureEn: "Fixed pedestal" },
].forEach((config) => productSeeds.push(makeSeed({
  id: config.id,
  product: config.product,
  pageUrl: PALLETIZING_PAGE,
  datasheetUrl: PALLETIZING_SHEET,
  category: "robot-platform",
  primary: "robot-platform",
  subclass: "palletizing-workcell",
  useCases: ["manufacturing", "logistics", "integration"],
  type: l("模块化码垛工作站", "Modular palletizing workcell"),
  integration: l(`${config.architecture}架构，配套 Robotiq 抓具与 Material Handling Copilot；机器人、输送线、安全系统和托盘流向按配置器设计。`, `${config.architectureEn} architecture with Robotiq gripper and Material Handling Copilot; robot, conveyor, safety system, and pallet flow are designed through the configurator.`),
  verification: l("用实际箱体、托盘、层型、来料节拍、机器人和安全布局验证负载、节拍、高度、占地与可达性。", "Validate payload, throughput, height, footprint, and reachability with actual cases, pallets, layer patterns, infeed rate, robot, and safety layout."),
  rows: palletModelRows(config),
  overview: [
    l(`${config.product} 是 Robotiq 模块化码垛系列中的具名配置，公开上限为 ${config.payload}、${config.throughput}、${config.height}。`, `${config.product} is a named Robotiq modular-palletizing configuration with published limits of ${config.payload}, ${config.throughput}, and ${config.height}.`),
    l("表中是配置级上限，不代表任意箱体、层型与机器人组合可以同时达到全部最大值。", "The table contains configuration-level limits; not every case, pattern, and robot combination can achieve all maxima simultaneously."),
  ],
  applications: [l("箱体码垛、拆码垛与物流线末端搬运", "Case palletizing, depalletizing, and end-of-line logistics handling")],
})));

productSeeds.push(
  makeSeed({
    id: "verified-robotiq-production-ready-palletizer",
    product: "Production-Ready Palletizer",
    pageUrl: PALLETIZING_PAGE,
    datasheetUrl: PALLETIZING_SHEET,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "palletizing-workcell",
    useCases: ["manufacturing", "logistics", "integration"],
    type: l("预工程化码垛工作站", "Production-ready palletizing workcell"),
    integration: l("预工程化工作站包含机器人、抓具、立柱/基座、软件和控制组件；输送线、安全围护与现场接口按项目确认。", "The pre-engineered cell combines robot, gripper, column or pedestal, software, and controls; conveyor, safeguarding, and site interfaces remain project-specific."),
    verification: l("通过配置器和现场布局确认箱体、托盘、节拍、最大高度、占地、安全距离、锚固方式和电气接口。", "Use the configurator and site layout to confirm case, pallet, throughput, maximum height, footprint, safety distance, anchoring, and electrical interfaces."),
    rows: sourced(PALLETIZING_SHEET, sourceNames.sheet, [
      row("额定负载", "Rated payload", "21 kg", "21 kg", selectionConditions),
      row("最大节拍", "Maximum throughput", "13 picks/min", "13 picks/min", selectionConditions),
      row("最大码垛高度", "Maximum palletizing height", "2200 mm"),
      row("欧洲托盘最小占地示例", "Minimum footprint example for Euro pallet", ">3700 × 3600 mm"),
      row("码垛图案", "Pallet patterns", "不限；由软件和工况约束", "Unlimited; constrained by software and application"),
      row("官方交付周期声明", "Official lead-time statement", "5 个工作日；受地区、库存与配置条件约束", "Five business days; subject to region, inventory, and configuration"),
      row("官方安装声明", "Official installation statement", "免地脚锚固配置的定位时间可低于 10 分钟；不等于整线投产时间", "Anchorless-cell positioning may take under 10 minutes; this is not total line commissioning time"),
    ]),
    overview: [
      l("Production-Ready Palletizer 是预工程化码垛单元，强调标准化部署，而不是单独的机器人本体。", "Production-Ready Palletizer is a pre-engineered palletizing cell focused on standardized deployment rather than a standalone robot."),
      l("交付和安装宣传数字有明确配置与地区前提，不能替代现场集成、安全验证和试生产。", "Lead-time and installation claims have configuration and regional conditions and do not replace on-site integration, safety validation, and production trials."),
    ],
    applications: [l("标准箱体末端码垛与中小批量换产", "End-of-line case palletizing and low-to-medium-volume changeover")],
  }),
  makeSeed({
    id: "verified-robotiq-machine-tending-solution",
    product: "Machine Tending Solution",
    pageUrl: MACHINE_TENDING_PAGE,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "machine-tending-workcell",
    useCases: ["manufacturing", "integration"],
    type: l("机床上下料工作站", "Machine-tending workcell"),
    integration: l("将兼容机器人、Hand-E、双夹爪或单夹爪、机床状态接口和应用软件组合；CNC 门、卡盘和安全互锁按机床设计。", "Combines a compatible robot, Hand-E single or dual grippers, machine-status interface, and application software; CNC door, chuck, and safety interlocks are machine-specific."),
    verification: l("核对工件 127 mm 包络、单/双夹爪负载、机器人、机床 I/O、门与卡盘动作、压缩空气、节拍和安全评估。", "Confirm the 127 mm part envelope, single or dual-gripper payload, robot, machine I/O, door and chuck actuation, compressed air, cycle time, and safety assessment."),
    rows: sourced(MACHINE_TENDING_PAGE, sourceNames.page, [
      row("气动接口", "Pneumatic interface", "BSPP 3/8 内螺纹；附 NPT 外螺纹转接", "BSPP 3/8 female; NPT male adapter included"),
      row("最小空气流量", "Minimum airflow", "400 L/min（6 bar）", "400 L/min at 6 bar"),
      row("压缩空气质量", "Compressed-air quality", "ISO 8573 等级 7.4.4.1", "ISO 8573 class 7.4.4.1"),
      row("控制电压", "Control voltage", "24 V DC"),
      row("夹持力范围", "Gripping-force range", "20–180 N"),
      row("夹爪防护等级", "Gripper IP rating", "Hand-E：IP67", "Hand-E: IP67"),
      row("UR5e 单夹爪最大工件负载", "UR5e single-gripper maximum part payload", "3.9 kg", "3.9 kg", selectionConditions),
      row("UR10e / UR20 单夹爪最大工件负载", "UR10e / UR20 single-gripper maximum part payload", "5 kg", "5 kg", selectionConditions),
      row("UR5e 双夹爪最大工件负载", "UR5e dual-gripper maximum part payload", "1.3 kg", "1.3 kg", selectionConditions),
      row("UR10e / UR20 双夹爪最大工件负载", "UR10e / UR20 dual-gripper maximum part payload", "2 × 5 kg", "2 × 5 kg", selectionConditions),
      row("最大工件尺寸", "Maximum part size", "127 mm"),
      row("机床状态", "Machine status", "通过状态灯和接口采集；具体 I/O 按机床", "Captured through status lights and interfaces; exact I/O is machine-specific"),
    ]),
    overview: [
      l("Machine Tending Solution 是面向 CNC 等机床的标准化上下料组合，核心约束来自机器人、夹爪配置和机床接口。", "Machine Tending Solution is a standardized CNC-loading combination whose main constraints are the robot, gripper configuration, and machine interfaces."),
      l("双夹爪能减少空行程，但会增加腕部质量和碰撞包络；不能直接沿用单夹爪的负载数字。", "Dual grippers can reduce empty travel but increase wrist mass and collision envelope; single-gripper payload figures cannot be reused directly."),
    ],
    applications: [l("CNC 车床、加工中心和高混流机床上下料", "Tending CNC lathes, machining centers, and high-mix machine tools")],
  }),
  makeSeed({
    id: "verified-robotiq-screwdriving-solution",
    product: "Screwdriving Solution",
    pageUrl: SCREWDRIVING_PAGE,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "screwdriving-workcell",
    useCases: ["manufacturing", "integration"],
    type: l("自动锁付工作站", "Automated screwdriving workcell"),
    integration: l("由 SD-100、SF-300、Force Copilot、认证批头/真空套筒和兼容机器人组成，工装、供料、安全和质量系统按项目集成。", "Combines SD-100, SF-300, Force Copilot, approved bits and vacuum sleeves, and a compatible robot; fixtures, feeding, safety, and quality systems are project-integrated."),
    verification: l("使用实际螺钉和工件验证扭矩曲线、垂直度、找孔、滑牙、漏锁、卡钉恢复、换型与追溯数据。", "Use production screws and parts to validate torque curves, perpendicularity, hole finding, stripping, missed screws, jam recovery, changeover, and traceability data."),
    rows: sourced(SCREWDRIVING_PAGE, sourceNames.page, [
      row("适用螺钉", "Supported screws", "M2.5–M5；长度 6–25 mm", "M2.5–M5; 6–25 mm long"),
      row("锁付扭矩范围", "Fastening torque range", "0.3–4 N·m"),
      row("主轴转速", "Spindle speed", "1–600 rpm"),
      row("典型供钉时间", "Typical feed time", "3 s/颗", "3 s per screw"),
      row("异常恢复", "Exception recovery", "预编程恢复流程", "Preprogrammed recovery routines"),
      row("官方换型声明", "Official changeover statement", "约 5 分钟；取决于螺钉、批头、套筒和程序", "About five minutes; depends on screw, bit, sleeve, and program"),
      row("力控软件", "Force-control software", "Force Copilot"),
      row("认证易耗件", "Approved consumables", "批头与真空套筒；按螺钉型号选配", "Bits and vacuum sleeves selected for the screw model"),
    ]),
    overview: [
      l("Screwdriving Solution 是组合式应用单元；SD-100 与 SF-300 已分别建档，便于按扭矩或螺钉长度检索。", "Screwdriving Solution is a combined application cell. SD-100 and SF-300 are separate records so users can search by torque or screw length."),
      l("换型与异常恢复是流程能力，不等于所有螺钉和材料无需打样即可稳定生产。", "Changeover and exception recovery are process capabilities, not proof that every screw and material will run stably without trials."),
    ],
    applications: [l("多品种自动锁付、螺钉装配与质量追溯", "High-mix screwdriving, screw assembly, and quality traceability")],
    coverage: "capability-only",
    level: "platform",
    specificationKind: "capabilities",
  }),
);

const softwareSeed = ({ id, product, pageUrl, rows, overview, applications, integration, verification }: {
  id: string;
  product: string;
  pageUrl: string;
  rows: SpecRow[];
  overview: Localized[];
  applications: Localized[];
  integration: Localized;
  verification: Localized;
}) => makeSeed({
  id,
  product,
  pageUrl,
  category: "model-software",
  primary: "software-tools",
  subclass: "application-software",
  useCases: ["research", "manufacturing", "integration"],
  type: l("机器人应用软件", "Robot application software"),
  integration,
  verification,
  rows: sourced(pageUrl, sourceNames.page, rows, l("能力与集成说明", "Capabilities and integration")),
  overview,
  applications,
  coverage: "capability-only",
  level: "platform",
  specificationKind: "capabilities",
});

productSeeds.push(
  softwareSeed({
    id: "verified-robotiq-force-copilot",
    product: "Force Copilot",
    pageUrl: FORCE_COPILOT_PAGE,
    integration: l("Universal Robots e-Series 使用内置力/矩传感器；CB-Series 与 FT 300-S 组合，具体版本和许可按机器人控制器确认。", "Uses the built-in force/torque sensor on Universal Robots e-Series; CB-Series pairs with FT 300-S. Confirm version and licensing for the robot controller."),
    verification: l("确认机器人代际、传感器、软件版本、力阈值、坐标系、工具质量补偿、速度和风险评估。", "Confirm robot generation, sensor, software version, force thresholds, coordinate frames, tool-mass compensation, speed, and risk assessment."),
    rows: [
      row("机器人支持", "Robot support", "Universal Robots e-Series；CB-Series + FT 300-S", "Universal Robots e-Series; CB-Series with FT 300-S"),
      row("手动引导", "Manual guidance", "ActiveDrive"),
      row("轨迹记录", "Path recording", "支持"),
      row("力/矩归零", "Force/torque zeroing", "支持"),
      row("装配动作", "Assembly actions", "插入、表面查找、力控与力事件", "Insertion, surface finding, force control, and force events"),
      row("碰撞检测", "Collision detection", "支持；阈值按应用设置", "Supported; thresholds are application-defined"),
      row("多点轨迹", "Multipoint path", "支持"),
    ],
    overview: [l("Force Copilot 将常用力控动作封装为机器人程序节点，降低插入、打磨和表面查找的编程工作量。", "Force Copilot packages common force-controlled actions as robot program nodes for insertion, finishing, and surface finding.")],
    applications: [l("插入装配、打磨、表面跟随、质量检测和锁付", "Insertion, finishing, surface following, quality inspection, and screwdriving")],
  }),
  softwareSeed({
    id: "verified-robotiq-material-handling-copilot",
    product: "Material Handling Copilot",
    pageUrl: PALLETIZING_PAGE,
    integration: l("嵌入 Robotiq 码垛和物料搬运工作站，用图形化流程配置箱体、托盘、层型和机器人动作。", "Embedded in Robotiq palletizing and material-handling cells to configure cases, pallets, layer patterns, and robot motion through a graphical workflow."),
    verification: l("确认软件与控制器版本、机器人和抓具兼容性、可达性、层型、奇异点、节拍和安全系统接口。", "Confirm software and controller versions, robot and gripper compatibility, reachability, layer pattern, singularities, cycle time, and safety-system interfaces."),
    rows: [
      row("配置对象", "Configured objects", "箱体、托盘、层型、拾放位置和机器人路径", "Cases, pallets, layer patterns, pick/place positions, and robot paths"),
      row("应用范围", "Application scope", "码垛、拆码垛和物料搬运", "Palletizing, depalletizing, and material handling"),
      row("硬件依赖", "Hardware dependency", "Robotiq 工作站、兼容机器人与抓具；按配置器", "Robotiq workcell, compatible robot, and gripper; per configurator"),
      row("部署边界", "Deployment boundary", "现场安全、输送线、I/O 与节拍仍需系统集成", "Site safety, conveyors, I/O, and cycle time still require system integration"),
    ],
    overview: [l("Material Handling Copilot 是工作站应用层软件，不是独立机器人模型；其价值在于把码垛对象和动作配置统一到部署流程。", "Material Handling Copilot is workcell application software rather than a standalone robot model; it unifies pallet objects and motions in the deployment workflow.")],
    applications: [l("码垛、拆码垛和标准化物料搬运编程", "Palletizing, depalletizing, and standardized material-handling programming")],
  }),
  softwareSeed({
    id: "verified-robotiq-iq",
    product: "IQ",
    pageUrl: IQ_PAGE,
    integration: l("面向 Robotiq 当前工作站的 AI 辅助集成平台；生成的方案仍需由集成商或工程团队完成现场确认。", "AI-assisted integration platform for current Robotiq workcells; generated designs still require on-site confirmation by an integrator or engineering team."),
    verification: l("确认地区可用性、支持的工作站、输入文件、扫描精度、仿真假设、报价边界、数据处理和人工复核流程。", "Confirm regional availability, supported cells, input files, scan accuracy, simulation assumptions, quotation boundary, data handling, and human review."),
    rows: [
      row("当前应用重点", "Current application focus", "码垛工作站生成与验证", "Palletizing workcell generation and validation"),
      row("Fit Check", "Fit Check", "官方称约 5 分钟形成适配检查", "Officially described as producing a fit check in about five minutes"),
      row("Control Center", "Control Center", "项目和生成流程管理", "Project and generation-workflow management"),
      row("Voice / File Capture", "Voice / File Capture", "通过语音与文件采集需求", "Captures requirements through voice and files"),
      row("3D Scan", "3D Scan", "采集现场空间信息", "Captures site-space information"),
      row("Simulator", "Simulator", "验证生成的工作站方案", "Validates generated workcell concepts"),
      row("输出边界", "Output boundary", "生成方案不替代现场测量、安全评估和最终工程签字", "Generated concepts do not replace site measurement, safety assessment, or final engineering sign-off"),
    ],
    overview: [l("IQ 把需求采集、现场扫描、方案生成和仿真放在同一集成流程中，当前公开重点是码垛。", "IQ combines requirements capture, site scanning, workcell generation, and simulation in one integration flow, with a current public focus on palletizing.")],
    applications: [l("码垛项目的前期适配、方案生成、仿真和项目协同", "Early fit assessment, concept generation, simulation, and project coordination for palletizing")],
  }),
  softwareSeed({
    id: "verified-robotiq-contact-core",
    product: "Contact Core",
    pageUrl: CONTACT_CORE_PAGE,
    integration: l("通过 Isaac Sim 资产、ROS 2 包和统一接触 API 连接 2F-85/2F-140、TSF-85、机器人状态及仿真数据。", "Connects 2F-85/2F-140, TSF-85, robot state, and simulation data through Isaac Sim assets, ROS 2 packages, and a unified contact API."),
    verification: l("确认仓库版本、许可证、ROS 2 发行版、仿真器版本、传感器时间同步、消息定义和路线图功能是否已正式发布。", "Confirm repository version, license, ROS 2 distribution, simulator version, sensor time synchronization, message definitions, and whether roadmap functions are formally released."),
    rows: [
      row("当前公开资产", "Current public assets", "Isaac Sim 资产、ROS 2 包和接触数据 API", "Isaac Sim assets, ROS 2 packages, and a contact-data API"),
      row("夹爪支持", "Gripper support", "2F-85、2F-140"),
      row("触觉支持", "Tactile support", "TSF-85"),
      row("同步数据", "Synchronized data", "夹爪、触觉、机器人状态与接触事件", "Gripper, tactile, robot-state, and contact-event data"),
      row("源代码开放", "Source availability", "官方 GitHub 公开；具体许可证以仓库为准", "Published on official GitHub; exact license per repository"),
      row("预览功能", "Preview feature", "AI Coupling；按当前发布状态确认", "AI Coupling; confirm current release status"),
      row("路线图边界", "Roadmap boundary", "嵌入式触觉智能属于公开路线图，不作为当前交付能力", "Embedded tactile intelligence is a public roadmap item, not a current delivery capability"),
    ],
    overview: [
      l("Contact Core 是接触数据与仿真集成层，目标是让夹爪、触觉和机器人状态使用一致的数据接口。", "Contact Core is a contact-data and simulation integration layer intended to expose gripper, tactile, and robot-state data through a consistent interface."),
      l("页面同时描述当前资产、预览和路线图，本记录明确分开，避免把未来功能当成现成功能。", "The page mixes current assets, preview features, and roadmap items; this record separates them so future capabilities are not presented as shipped functionality."),
    ],
    applications: [l("触觉数据采集、仿真到现实验证、接触策略开发和 Physical AI 研究", "Tactile-data capture, sim-to-real validation, contact-policy development, and physical-AI research")],
  }),
);

const powerPickRows = ({
  model,
  payload,
  currentMass,
  sheetMass,
  currentConfigurations,
  sheetConfigurations,
  airflow,
  airConsumption,
  standalonePayload,
  mountedPayload,
  mountedRobot,
}: {
  model: string;
  payload: string;
  currentMass: string;
  sheetMass: string;
  currentConfigurations: string;
  sheetConfigurations: string;
  airflow: string;
  airConsumption: string;
  standalonePayload: string;
  mountedPayload: string;
  mountedRobot: string;
}) => [
  ...sourced(VACUUM_PAGE, sourceNames.page, [
    row("当前网页额定负载", "Current-page payload", payload, payload, selectionConditions),
    row("当前网页工具质量", "Current-page tool mass", currentMass),
    row("能源", "Energy", "压缩空气与电力", "Compressed air and electricity"),
    row("控制功能", "Control functions", "工件检测、真空监控与自动释放", "Part detection, vacuum monitoring, and automatic release"),
    row("保修循环口径", "Warranty cycle basis", "2,000,000 次循环", "2,000,000 cycles"),
    row("当前网页配置数量", "Current-page configuration count", currentConfigurations),
    row("最大真空度", "Maximum vacuum", "92%"),
    row("最大真空流量", "Maximum vacuum airflow", airflow),
    row("当前网页耗气量", "Current-page air consumption", airConsumption),
    row("压缩空气质量", "Compressed-air quality", "ISO 8573-1 等级 7-4-4", "ISO 8573-1 class 7-4-4"),
    row("工作温度", "Operating temperature", "0–50 °C"),
    row("当前机器人兼容范围", "Current robot compatibility", "Omron、Techman Robot、Universal Robots", "Omron, Techman Robot, and Universal Robots"),
  ]),
  ...sourced(VACUUM_SHEET, sourceNames.sheet, [
    row("产品表工具质量", "Product-sheet tool mass", sheetMass, sheetMass, l(`产品表与当前网页对 ${model} 的质量口径存在差异，需按交付 BOM 确认。`, `The product sheet and current web page publish different ${model} mass figures; confirm against the delivered BOM.`)),
    row("产品表配置数量", "Product-sheet configuration count", sheetConfigurations),
    row("独立使用额定负载", "Standalone rated payload", standalonePayload, standalonePayload, selectionConditions),
    row(`${mountedRobot} 安装额定负载`, `${mountedRobot} mounted payload`, mountedPayload, mountedPayload, selectionConditions),
    row("最大耗气量", "Maximum air consumption", airConsumption.split("–").at(-1)?.trim() ?? airConsumption),
    row("允许供气压力", "Permissible feed pressure", "3–8 bar"),
    row("气管外径", "Tube outside diameter", "12 mm"),
    row("工作相对湿度", "Operating relative humidity", "35–85%（无冷凝）", "35–85% (non-condensing)"),
  ]),
];

[
  { id: "verified-robotiq-powerpick-10", product: "PowerPick 10", payload: "11.5 kg", currentMass: "1 kg", sheetMass: "1.2 kg", currentConfigurations: "42", sheetConfigurations: "42", airflow: "180 L/min", airConsumption: "157–305 L/min", standalonePayload: "13 kg", mountedPayload: "11.3 kg", mountedRobot: "UR10" },
  { id: "verified-robotiq-powerpick-20", product: "PowerPick 20", payload: "18.2 kg", currentMass: "1.8 kg", sheetMass: "1.8 kg", currentConfigurations: "24", sheetConfigurations: "16", airflow: "376 L/min", airConsumption: "282–564 L/min", standalonePayload: "18.2 kg", mountedPayload: "18.2 kg", mountedRobot: "UR20" },
  { id: "verified-robotiq-powerpick-30", product: "PowerPick 30", payload: "27.2 kg", currentMass: "1.9 kg", sheetMass: "1.85 kg", currentConfigurations: "24", sheetConfigurations: "16", airflow: "376 L/min", airConsumption: "282–564 L/min", standalonePayload: "27.2 kg", mountedPayload: "27.2 kg", mountedRobot: "UR30" },
].forEach((config) => productSeeds.push(vacuumSeed({
  id: config.id,
  product: config.product,
  rows: powerPickRows({ ...config, model: config.product }),
  overview: [
    l(`${config.product} 是模块化多吸盘真空抓具，当前网页额定负载为 ${config.payload}。`, `${config.product} is a modular multi-cup vacuum gripper with a current web payload of ${config.payload}.`),
    l("配置数、工具质量和安装负载在网页与产品表之间存在修订差异，本记录分别保存，不将旧口径静默覆盖。", "Configuration count, tool mass, and mounted payload differ between web and sheet revisions; this record preserves each source basis instead of silently overwriting it."),
  ],
  verification: l("按机器人、法兰、吸盘阵列、工件表面、气源、泄漏、节拍和安全系数运行配置器并进行抓取测试。", "Run the configurator and grip test for the robot, flange, cup array, part surface, air supply, leakage, cycle time, and safety factor."),
  coverage: "official-partial",
})));

productSeeds.push(
  vacuumSeed({
    id: "verified-robotiq-powerpick10-singlecup",
    product: "PowerPick10 SingleCup",
    rows: [
      ...sourced(VACUUM_PAGE, sourceNames.page, [
        row("额定负载", "Rated payload", "6.5 kg", "6.5 kg", selectionConditions),
        row("工具质量", "Tool mass", "0.385 kg"),
        row("外形尺寸", "Dimensions", "174 × 111 × 77 mm"),
        row("能源", "Energy", "压缩空气与电力", "Compressed air and electricity"),
        row("控制功能", "Control functions", "工件检测、真空监控与自动释放", "Part detection, vacuum monitoring, and automatic release"),
        row("保修循环口径", "Warranty cycle basis", "2,000,000 次循环", "2,000,000 cycles"),
        row("最大真空度", "Maximum vacuum", "92%"),
        row("最大真空流量", "Maximum vacuum airflow", "180 L/min"),
        row("工作温度", "Operating temperature", "0–50 °C"),
        row("当前机器人兼容范围", "Current robot compatibility", "Omron、Techman Robot、Universal Robots", "Omron, Techman Robot, and Universal Robots"),
        row("适用表面", "Supported surfaces", "无孔与多孔工件", "Non-porous and porous workpieces"),
      ]),
      ...sourced(VACUUM_SHEET, sourceNames.sheet, [
        row("压缩空气质量", "Compressed-air quality", "ISO 8573-1 等级 7-4-4", "ISO 8573-1 class 7-4-4"),
        row("最大耗气量", "Maximum air consumption", "305 L/min"),
        row("允许供气压力", "Permissible feed pressure", "3–8 bar"),
        row("气管外径", "Tube outside diameter", "12 mm"),
        row("工作相对湿度", "Operating relative humidity", "35–85%（无冷凝）", "35–85% (non-condensing)"),
      ]),
    ],
    overview: [
      l("PowerPick10 SingleCup 用单吸盘工具覆盖箱体、袋材和表面有一定泄漏的工件，工具本体质量低于多吸盘 PowerPick。", "PowerPick10 SingleCup uses one cup for cases, bags, and parts with some surface leakage, with lower tool mass than multi-cup PowerPick configurations."),
      l("6.5 kg 额定负载仍依赖吸盘尺寸、工件表面、姿态、加速度和真空保持情况。", "The 6.5 kg rating still depends on cup size, part surface, orientation, acceleration, and vacuum retention."),
    ],
    verification: l("确认吸盘型号、材料孔隙、供气压力、最大耗气量、断气风险和机器人有效负载。", "Confirm cup model, material porosity, feed pressure, maximum air use, loss-of-air risk, and robot effective payload."),
  }),
  vacuumSeed({
    id: "verified-robotiq-epick",
    product: "EPick",
    rows: sourced(VACUUM_PAGE, sourceNames.page, [
      row("单吸盘额定负载", "Rated payload per cup", "4.5 kg", "4.5 kg", selectionConditions),
      row("最大系统负载", "Maximum system payload", "16 kg", "16 kg", selectionConditions),
      row("工具质量", "Tool mass", "0.71 kg"),
      row("能源与腕部供电", "Energy and wrist supply", "电动；24 V，2 A", "Electric; 24 V, 2 A"),
      row("控制功能", "Control functions", "工件检测、真空监控与自动释放", "Part detection, vacuum monitoring, and automatic release"),
      row("保修循环口径", "Warranty cycle basis", "2,000,000 次循环", "2,000,000 cycles"),
      row("公开配置数量", "Published configuration count", "6"),
      row("最大真空度", "Maximum vacuum", "80%"),
      row("最大真空流量", "Maximum vacuum airflow", "12 L/min"),
      row("噪声", "Noise", "64 dBA"),
      row("工作温度", "Operating temperature", "5–40 °C"),
      row("当前机器人兼容范围", "Current robot compatibility", "Omron、Techman Robot、Universal Robots", "Omron, Techman Robot, and Universal Robots"),
    ]),
    overview: [
      l("EPick 内置电动真空泵，不需要工厂压缩空气，适合布气困难或移动式工作站。", "EPick has an integrated electric vacuum pump and does not require plant compressed air, which suits mobile cells or sites where air routing is difficult."),
      l("流量明显低于气动 PowerPick，因此多孔材料、快速泄漏和节拍要求需要实测。", "Airflow is substantially lower than pneumatic PowerPick products, so porous materials, fast leakage, and cycle requirements need physical testing."),
    ],
    verification: l("按材料孔隙、吸盘数量、泄漏率、噪声、循环占空比和断电后的工件保持风险验证。", "Validate material porosity, cup count, leakage, noise, duty cycle, and part-retention risk after power loss."),
    datasheetUrl: VACUUM_PAGE,
  }),
);

export const robotiqCatalogProductCount = productSeeds.length;
