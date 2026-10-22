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
type CompanySlug = typeof waveElevenCompanySlugs[number];

type SpecRow = {
  label: Localized;
  value: Localized;
  sourceUrl: string;
  sourceLabel: Localized;
  locator: Localized;
  conditions?: Localized;
};

type ProductSeed = {
  id: string;
  companySlug: CompanySlug;
  product: string;
  pageUrl: string;
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
  coverage: FinderSpecificationCoverage;
  sourceLinks?: Array<{ label: Localized; url: string }>;
};

const l = (zh: string, en: string): Localized => ({ zh, en });
const t = (locale: Locale, value: Localized) => value[locale];

const TM_HOME = "https://www.tm-robot.com/en/";
const TM_COMPANY = "https://www2.tm-robot.com/en/company-profile/";
const TM_SERIES = "https://www.tm-robot.com/en/product/tm-ai-cobot-s-series";
const TM_SPEC = "https://tmwebtest.blob.core.windows.net/triwebtest/docs/797ceeca199c5941/TM_Robot_Catalog_260407EN_SPEC.pdf";
const TM3S = "https://www.tm-robot.com/en/support/technical-document/introducing-TM3S";

const FRANKA_HOME = "https://franka.de/";
const FRANKA_COMPANY = "https://franka.de/company";
const FRANKA_DOCUMENTS = "https://franka.de/documents";
const FR3_PAGE = "https://franka.de/franka-research-3";
const FR3_DATA = "https://download.franka.de/documents/120020_Datasheet%20Franka%20Research%203_1.1_EN.pdf";
const FP3_PAGE = "https://franka.de/franka-production-3";
const FP3_MANUAL = "https://download.franka.de/documents/Product%20Manual%20Franka%20Production%203_R02110_1.0_EN.pdf";
const FRANKA_HAND = "https://franka.de/franka-hand";
const FRANKA_HAND_MANUAL = "https://download.franka.de/documents/220010_Product%20Manual_Franka%20Hand_1.2_EN.pdf";
const DIANA7 = "https://www.agile-robots.com/en/solutions/diana-7";
const DIANA7_DATA = "https://www.agile-robots.com/media/files/New_website/Solutions/Diana_7/AR-Diana7-Productflyer-RGB-en-20260130.pdf";
const FR3_DUO = "https://franka.de/fr3-duo";
const MOBILE_FR3_DUO = "https://franka.de/de-de/mobile-fr3-duo";
const TMR = "https://franka.de/tmr";
const GELLO = "https://franka.de/gello";

const STANDARD_HOME = "https://standardbots.com/";
const STANDARD_ABOUT = "https://standardbots.com/about";
const STANDARD_SPARK = "https://standardbots.com/spark";
const STANDARD_CORE = "https://standardbots.com/ro1";
const STANDARD_CORE_MANUAL = "https://corehelp.standardbots.com/2-hardware-overview.html";
const STANDARD_THOR = "https://standardbots.com/thor";
const STANDARD_THOR_MANUAL = "https://thorhelp.standardbots.com/2-hardware-overview.html";
const STANDARD_BOLT = "https://standardbots.com/bolt";

const ELEPHANT_HOME = "https://www.elephantrobotics.com/en";
const ELEPHANT_COMPANY = "https://www.elephantrobotics.com/en/our-company/";
const ELEPHANT_MANUAL = "https://static.elephantrobotics.com/wp-content/uploads/2024/07/%E5%A4%A7%E8%B1%A1%E6%9C%BA%E5%99%A8%E4%BA%BA%E3%80%8A%E4%BA%A7%E5%93%81%E9%80%89%E5%9E%8B%E6%89%8B%E5%86%8C2024%E3%80%8B.pdf";
const ELEPHANT_280_PI = "https://www.elephantrobotics.com/en/mycobot-280-pi-2023-en/";
const ELEPHANT_280_PI_SPEC = "https://www.elephantrobotics.com/en/mycobot-280-pi-2023-specifications/";
const ELEPHANT_280_M5 = "https://www.elephantrobotics.com/en/mycobot-en/";
const ELEPHANT_280_JETSON = "https://www.elephantrobotics.com/en/mycobot-280jetsonnano/";
const ELEPHANT_280_ARDUINO = "https://www.elephantrobotics.com/en/mycobot-280arduino-en/";
const ELEPHANT_320_PI = "https://www.elephantrobotics.com/en/mycobot-pro-pi-en/";
const ELEPHANT_320_M5 = "https://www.elephantrobotics.com/en/mycobot-320-m5-en/";
const ELEPHANT_PALLETIZER_PI = "https://www.elephantrobotics.com/en/mypalletizer-260-pi-en/";
const ELEPHANT_PALLETIZER_M5 = "https://www.elephantrobotics.com/en/mypalletizer-260-m5-en/";
const ELEPHANT_ULTRAARM = "https://www.elephantrobotics.com/en/ultraarm-p340-en/";
const ELEPHANT_MECHARM_PI = "https://www.elephantrobotics.com/en/mecharm-cn/";
const ELEPHANT_MECHARM_M5 = "https://www.elephantrobotics.com/en/mecharm-m5-cn/";
const ELEPHANT_MYBUDDY = "https://www.elephantrobotics.com/en/mybuddy-280-pi-en/";
const ELEPHANT_PRO600 = "https://www.elephantrobotics.com/en/mycobot-600-en/";
const ELEPHANT_MYARM300 = "https://www.elephantrobotics.com/en/support-myarm-300-en/";
const ELEPHANT_MYAGV = "https://www.elephantrobotics.com/en/myagv-en/";
const ELEPHANT_M750 = "https://www.elephantrobotics.com/en/myarm-m750";
const ELEPHANT_M750_DOC = "https://docs.elephantrobotics.com/docs/myarm-master_750-en/2-ProductInformation/2-ProductParameters/2-ProductParameters.html";
const ELEPHANT_MERCURY = "https://www.elephantrobotics.com/en/mercury-humanoid-robot/";

export const waveElevenCompanySlugs = [
  "techman-robot",
  "franka-robotics",
  "standard-bots",
  "elephant-robotics",
] as const;

const companySlugSet = new Set<string>(waveElevenCompanySlugs);
export const isWaveElevenCompanySlug = (slug: string) => companySlugSet.has(slug);

const patchTechman = (company: CompanyProfile, locale: Locale): CompanyProfile => ({
  ...company,
  legalName: "Techman Robot Inc.",
  country: t(locale, l("中国台湾", "Taiwan, China")),
  headquarters: t(locale, l("中国台湾桃园", "Taoyuan, Taiwan")),
  founded: "2015",
  officialUrl: TM_HOME,
  valueChainRole: t(locale, l("内置视觉协作机器人及工厂自动化系统厂商", "Integrated-vision collaborative-robot and factory-automation supplier")),
  positioning: t(locale, l("以 TM AI Cobot、TM S Series、内置视觉、TMflow 和控制箱配置覆盖轻载到 30 kg 级协作自动化。", "Covers light-duty through 30 kg-class collaborative automation with TM AI Cobots, the TM S Series, integrated vision, TMflow, and controller configurations.")),
  strengths: [
    t(locale, l("多款机械臂把视觉系统与图形化 TMflow 工作流作为同一平台能力提供。", "Multiple arms combine an integrated vision system with the graphical TMflow workflow on one platform.")),
    t(locale, l("现行规格表集中披露 S 系列九个本体型号及旧系列六个型号的机械、运动、I/O、环境和供电字段。", "The current specification sheet publishes mechanical, motion, I/O, environmental, and power fields for nine S-series bodies and six earlier models.")),
    t(locale, l("产品同时提供标准、M 与 X 控制配置；本仓按机械臂本体建档，将控制配置作为选件字段，避免重复计数。", "Products are offered with standard, M, and X controller configurations; this repository records each arm body once and treats controller configurations as options to avoid double-counting.")),
  ],
  products: ["TM3S", "TM5S", "TM6S", "TM7S", "TM12S", "TM14S", "TM20S", "TM25S", "TM30S", "TM30SC", "TM5-700", "TM5-900", "TM12", "TM14", "TM16", "TM20"],
  fit: [
    t(locale, l("电子、半导体、汽车、金属加工、食品、仓储和通用制造。", "Electronics, semiconductor, automotive, metalworking, food, warehousing, and general manufacturing.")),
    t(locale, l("视觉定位、检测、装配、上下料、焊接、码垛和移动工作站。", "Vision guidance, inspection, assembly, machine tending, welding, palletizing, and mobile workcells.")),
    t(locale, l("需要内置视觉、图形化流程或欧姆龙自动化生态协同的项目。", "Projects requiring integrated vision, graphical workflows, or coordination with the OMRON automation ecosystem.")),
  ],
  overview: [
    t(locale, l("达明机器人 2015 年成立于桃园，官网将内置视觉、协作机械臂和 TMflow 作为产品主线。公司现为欧姆龙集团体系的一部分；选型时仍需分别确认机械臂本体、控制箱、视觉、力矩传感器和软件许可。", "Techman Robot was founded in Taoyuan in 2015. Its official site centers the portfolio on integrated vision, collaborative arms, and TMflow. The company is part of the OMRON group; selection still requires separate confirmation of the arm, controller, vision, force-torque sensing, and software licenses.")),
    t(locale, l("本批次按 2026 年 4 月 7 日版本规格表建立 S 系列与旧系列型号，并把 2026 年 6 月发布的 TM3S 单独标为部分披露。官网页面与规格表存在小数取整差异时，参数以带版本的规格表为准。", "This wave creates S-series and earlier-model records from the specification sheet dated 7 April 2026, while the TM3S announced in June 2026 is marked as partially disclosed. Where product pages round values differently from the versioned sheet, the sheet is the parameter baseline.")),
    t(locale, l("官网年度报告入口公开 2022、2023 和 2024 年报告；财务判断应回到报告及证券市场文件，不以产品宣传页代替。", "The official annual-report page exposes the 2022, 2023, and 2024 reports. Financial analysis should use those reports and market filings rather than product marketing pages.")),
  ],
  businessAreas: [
    t(locale, l("六轴协作机械臂与控制箱", "Six-axis collaborative arms and controllers")),
    t(locale, l("机器视觉、力控与图形化机器人软件", "Machine vision, force control, and graphical robot software")),
    t(locale, l("工厂自动化应用与系统集成支持", "Factory-automation applications and integration support")),
  ],
  customerGroups: [
    t(locale, l("电子、半导体、汽车、金属、食品和物流制造企业", "Electronics, semiconductor, automotive, metal, food, and logistics manufacturers")),
    t(locale, l("机器人工作站、视觉和移动平台系统集成商", "Robot-workcell, vision, and mobile-platform integrators")),
    t(locale, l("高校、研究机构与协作机器人开发团队", "Universities, research institutes, and cobot developers")),
  ],
  milestones: [
    { date: "2015", event: t(locale, l("公司成立并启动 TM 协作机器人业务。", "The company was founded and began its TM collaborative-robot business.")) },
    { date: "2022", event: t(locale, l("官方时间线记录 TM16 与 TM20 推出。", "The official timeline records the introduction of TM16 and TM20.")) },
    { date: "2023", event: t(locale, l("发布 TM S 系列及 TM25S。", "The TM S Series and TM25S were introduced.")) },
    { date: "2024", event: t(locale, l("官方时间线列出 TM30S 与 Rugged 系列。", "The official timeline lists TM30S and the Rugged range.")) },
    { date: "2025", event: t(locale, l("公司在台湾证券市场挂牌，时间线同时列出 TM6S 与 TM20S。", "The company listed on the Taiwan securities market; the timeline also lists TM6S and TM20S.")) },
    { date: "2026", event: t(locale, l("发布紧凑型 TM3S。", "The compact TM3S was introduced.")) },
  ],
  catalogScope: t(locale, l("本批次建立 TM3S、九个 S 系列本体和六个旧系列本体。M/X 控制配置不重复建本体记录；Rugged、移动底座和末端生态仍待单独补录。", "This wave creates TM3S, nine S-series arm bodies, and six earlier arm bodies. M/X controller configurations are not duplicated as arm products; Rugged variants, mobile bases, and the end-tool ecosystem remain to be added separately.")),
  catalogCoverage: "model-partial",
  verificationFocus: t(locale, l("锁定本体型号、控制箱配置、视觉与力矩传感器版本、负载重心、I/O、网络、功能安全、IP 等级和交付地区认证。", "Lock the arm model, controller configuration, vision and force-torque-sensor revision, payload center of gravity, I/O, networking, functional safety, IP rating, and regional certification.")),
  presalesQuestions: [
    t(locale, l("任务需要哪一款本体，以及标准、M 或 X 控制配置中的哪一种？", "Which arm body and which standard, M, or X controller configuration does the task require?")),
    t(locale, l("内置视觉、外部相机与力矩传感器分别属于标准配置还是选件？", "Are integrated vision, external cameras, and force-torque sensing standard or optional in the quoted configuration?")),
    t(locale, l("负载重心、速度、安装姿态、现场总线、安全回路和连续工况如何验收？", "How will payload center of gravity, speed, mounting pose, fieldbus, safety circuits, and continuous duty be accepted?")),
  ],
  reviewedAt: "2026-09-04",
});

const patchFranka = (company: CompanyProfile, locale: Locale): CompanyProfile => ({
  ...company,
  legalName: "Franka Robotics GmbH",
  country: t(locale, l("德国", "Germany")),
  headquarters: t(locale, l("德国慕尼黑", "Munich, Germany")),
  founded: "2016",
  officialUrl: FRANKA_HOME,
  valueChainRole: t(locale, l("力控七轴机械臂、双臂移动研究平台与遥操作采集设备厂商", "Force-controlled seven-axis arm, dual-arm mobile research-platform, and teleoperation-device supplier")),
  positioning: t(locale, l("以 Franka Research 3、Franka Production 3、Franka Hand 和 Diana 7 覆盖研究与工业操作，并用 FR3 Duo、Mobile FR3 Duo、TMR 与 GELLO 扩展双臂、移动和数据采集。", "Spans research and industrial manipulation with Franka Research 3, Franka Production 3, Franka Hand, and Diana 7, extending into bimanual, mobile, and data-collection work through FR3 Duo, Mobile FR3 Duo, TMR, and GELLO.")),
  strengths: [
    t(locale, l("七个关节均配力矩传感器，并公开 1 kHz Franka Control Interface，适合力控和机器人学习研究。", "All seven joints carry torque sensors, and the public 1 kHz Franka Control Interface supports force-control and robot-learning research.")),
    t(locale, l("产品线区分研究接口与生产安全边界，避免把 FR3 的研究开放性直接等同于 FP3 的工业交付条件。", "The portfolio separates research interfaces from production safety boundaries, avoiding a direct equivalence between FR3 research openness and FP3 industrial delivery conditions.")),
    t(locale, l("GELLO 提供开源机械与软件资料，也可采购预装版本，用于单臂或双臂示教和数据采集。", "GELLO provides open mechanical and software resources and is also available pre-assembled for single- or dual-arm teaching and data collection.")),
  ],
  products: ["Franka Research 3", "Franka Production 3", "Franka Hand", "Diana 7", "FR3 Duo", "Mobile FR3 Duo", "Tactile Mobile Robot", "Franka GELLO", "Franka GELLO Duo"],
  fit: [
    t(locale, l("力控、接触丰富操作、机器人学习、模仿学习和双臂研究。", "Force control, contact-rich manipulation, robot learning, imitation learning, and bimanual research.")),
    t(locale, l("精密装配、检测、打磨、实验室自动化和轻载工业操作。", "Precision assembly, inspection, finishing, laboratory automation, and light industrial manipulation.")),
    t(locale, l("需要 1 kHz 控制接口、关节力矩反馈或移动双臂数据采集的团队。", "Teams requiring a 1 kHz control interface, joint-torque feedback, or mobile bimanual data collection.")),
  ],
  overview: [
    t(locale, l("Franka Robotics 2016 年成立于慕尼黑，2023 年被 Agile Robots 收购并从 Franka Emika 更名为 Franka Robotics。当前公开产品同时覆盖研究机械臂、生产机械臂、末端手爪、七轴工业臂以及双臂和移动研究平台。", "Franka Robotics was founded in Munich in 2016. Following acquisition by Agile Robots in 2023, Franka Emika was renamed Franka Robotics. Its public portfolio now spans research arms, production arms, an end-effector hand, a seven-axis industrial arm, and bimanual and mobile research platforms.")),
    t(locale, l("本批次把 FR3、FP3、Franka Hand 与 Diana 7 按官方数据表逐项建档；原型或系统级产品只记录当前页面明确披露的尺寸、负载、速度、传感器和算力，不把组合系统的能力反推到单个部件。", "This wave transcribes FR3, FP3, Franka Hand, and Diana 7 field by field from official data sheets. Prototype or system-level products include only dimensions, payload, speed, sensing, and compute explicitly disclosed on their pages; system capabilities are not projected onto individual components.")),
    t(locale, l("Franka 的研究产品、生产产品和原型平台具有不同的安全、支持和生命周期边界；采购前应以当前手册、许可、区域供货和风险评估为准。", "Franka research products, production products, and prototype platforms have different safety, support, and lifecycle boundaries. Procurement should follow current manuals, licenses, regional availability, and application risk assessment.")),
  ],
  businessAreas: [
    t(locale, l("七轴力控研究与工业机械臂", "Seven-axis force-controlled research and industrial arms")),
    t(locale, l("双臂、移动操作和触觉机器人平台", "Bimanual, mobile-manipulation, and tactile-robot platforms")),
    t(locale, l("遥操作、示教与机器人学习数据采集", "Teleoperation, teaching, and robot-learning data collection")),
  ],
  customerGroups: [
    t(locale, l("高校、研究机构、机器人学习和力控研发团队", "Universities, research institutes, and robot-learning and force-control teams")),
    t(locale, l("精密制造、实验室自动化与机器人系统集成商", "Precision-manufacturing, laboratory-automation, and robotics integrators")),
    t(locale, l("需要双臂移动操作或示教数据平台的开发团队", "Developers needing mobile bimanual manipulation or teaching-data platforms")),
  ],
  milestones: [
    { date: "2016", event: t(locale, l("公司在慕尼黑成立。", "The company was founded in Munich.")) },
    { date: "2023", event: t(locale, l("Agile Robots 完成收购，公司随后更名为 Franka Robotics。", "Agile Robots completed the acquisition, followed by the rename to Franka Robotics.")) },
    { date: "2025", event: t(locale, l("官方产品组合扩展到 FR3 Duo、Mobile FR3 Duo、TMR 与 GELLO 数据采集方案。", "The official portfolio expanded across FR3 Duo, Mobile FR3 Duo, TMR, and GELLO data-collection solutions.")) },
    { date: "2026", event: t(locale, l("Diana 7 当前产品资料发布 2026 年版规格单。", "A 2026 revision of the Diana 7 product sheet was published.")) },
  ],
  catalogScope: t(locale, l("本批次建立九条具名产品记录；FR3、FP3、Hand 和 Diana 7 为参数表记录，Duo、移动平台、TMR 和 GELLO 按当前公开系统字段记录。", "This wave creates nine named product records. FR3, FP3, Hand, and Diana 7 use specification-table records; Duo, mobile, TMR, and GELLO products use the system fields currently disclosed.")),
  catalogCoverage: "model-partial",
  verificationFocus: t(locale, l("锁定研究或生产版本、控制接口许可、末端、负载重心、力控频率、安全功能、移动底盘、传感器配置和支持周期。", "Lock the research or production edition, control-interface license, end effector, payload center of gravity, force-control rate, safety functions, mobile base, sensor configuration, and support lifecycle.")),
  presalesQuestions: [
    t(locale, l("需要 FR3 的研究接口、FP3 的生产集成，还是 Diana 7 的更高负载？", "Does the task require FR3 research interfaces, FP3 production integration, or Diana 7's higher payload?")),
    t(locale, l("末端、工件、重心、接触力和控制周期组合是否满足具体任务？", "Does the combination of end effector, workpiece, center of gravity, contact force, and control cycle fit the task?")),
    t(locale, l("FCI、ROS、GELLO、双臂同步、移动平台安全和区域服务如何验收？", "How will FCI, ROS, GELLO, bimanual synchronization, mobile-platform safety, and regional service be accepted?")),
  ],
  reviewedAt: "2026-09-04",
});

const patchStandardBots = (company: CompanyProfile, locale: Locale): CompanyProfile => ({
  ...company,
  legalName: "Standard Bots Inc.",
  country: t(locale, l("美国", "United States")),
  headquarters: t(locale, l("美国纽约", "New York, United States")),
  founded: "2017",
  officialUrl: STANDARD_HOME,
  valueChainRole: t(locale, l("协作机械臂、双臂移动平台与 AI 机器人软件厂商", "Collaborative-arm, bimanual mobile-platform, and AI robotics software supplier")),
  positioning: t(locale, l("当前产品由 Spark、Core、Thor 三档协作机械臂与可配置双臂平台 Bolt 组成，统一强调浏览器编程、视觉与 AI 工作流。", "The current range combines Spark, Core, and Thor cobot tiers with the configurable bimanual Bolt platform, using browser-based programming, vision, and AI workflows.")),
  strengths: [
    t(locale, l("Core 与 Thor 官方硬件手册公开本体、控制箱、工具端 I/O、现场总线、速度和环境字段。", "Official Core and Thor hardware manuals publish arm, controller, tool I/O, fieldbus, speed, and environmental fields.")),
    t(locale, l("Spark、Core 与 Thor 覆盖 7 kg、18 kg 和 30 kg 负载档位，Bolt 可按任务选择双臂组合。", "Spark, Core, and Thor cover 7 kg, 18 kg, and 30 kg payload tiers, while Bolt can be configured with a task-specific arm pair.")),
    t(locale, l("官网将视觉、云端或本地软件能力与机械臂销售结合；数据治理、离线运行和许可边界需在项目中单独确认。", "The website combines vision and cloud or local software capabilities with arm sales; data governance, offline operation, and licensing boundaries require project-specific confirmation.")),
  ],
  products: ["Spark", "Core", "Thor", "Bolt"],
  fit: [
    t(locale, l("上下料、装配、检测、包装、码垛和通用制造自动化。", "Machine tending, assembly, inspection, packaging, palletizing, and general manufacturing automation.")),
    t(locale, l("需要浏览器编程、视觉或 AI 工作流的中小型自动化团队。", "Small and midsize automation teams needing browser-based programming, vision, or AI workflows.")),
    t(locale, l("双臂、移动或可换电机器人工作流的验证。", "Validation of bimanual, mobile, or hot-swappable-battery robot workflows.")),
  ],
  overview: [
    t(locale, l("Standard Bots 2017 年成立，总部位于纽约。官网当前把 Spark、Core、Thor 和 Bolt 作为四个主要产品入口；其中 Core 与 Thor 有独立硬件手册，Spark 和 Bolt 的公开资料仍以产品页为主。", "Standard Bots was founded in 2017 and is headquartered in New York. Its current website presents Spark, Core, Thor, and Bolt as the four main product entries. Core and Thor have dedicated hardware manuals, while Spark and Bolt remain primarily documented through product pages.")),
    t(locale, l("公司 2025 年公告称累计获得 6300 万美元融资，最近一轮由 General Catalyst 领投并有 Amazon Industrial Innovation Fund 与 Samsung Next 参与；公告未把全部累计金额等同于单轮金额。", "A 2025 company announcement says it had secured $63 million in funding, with the latest round led by General Catalyst and participation from the Amazon Industrial Innovation Fund and Samsung Next. The announcement does not equate the total secured amount with one round.")),
    t(locale, l("Spark 同一页面对机械臂防护等级给出 IP65 与 IP69K 两种表述。本仓保留该冲突并将其标为部分披露，采购时必须以当前数据表和订单配置确认。", "The same Spark page states both IP65 and IP69K for arm protection. This repository preserves the conflict and marks the product partially disclosed; procurement must use the current data sheet and ordered configuration.")),
  ],
  businessAreas: [
    t(locale, l("协作机械臂与控制系统", "Collaborative arms and control systems")),
    t(locale, l("双臂移动机器人平台", "Bimanual mobile robot platforms")),
    t(locale, l("视觉、浏览器编程和 AI 自动化软件", "Vision, browser programming, and AI automation software")),
  ],
  customerGroups: [
    t(locale, l("通用制造、金属、汽车零部件、包装和仓储企业", "General manufacturing, metal, automotive-component, packaging, and warehousing companies")),
    t(locale, l("自动化系统集成商与中小型生产团队", "Automation integrators and small or midsize production teams")),
    t(locale, l("机器人 AI、视觉和双臂工作流开发者", "Robotics AI, vision, and bimanual-workflow developers")),
  ],
  milestones: [
    { date: "2017", event: t(locale, l("公司成立。", "The company was founded.")) },
    { date: "2024", event: t(locale, l("公司公开 Core 协作机器人及软件平台。", "The company publicly presented the Core cobot and software platform.")) },
    { date: "2025", event: t(locale, l("公司公告累计获得 6300 万美元融资，并披露最新一轮投资方。", "The company announced $63 million in total funding and disclosed investors in its latest round.")) },
    { date: "2026", event: t(locale, l("产品页将 Spark 与 Bolt 标为 2026 年交付计划中的产品。", "Product pages place Spark and Bolt in the 2026 delivery roadmap.")) },
  ],
  catalogScope: t(locale, l("当前四个主要产品均已建档；Core 与 Thor 按硬件手册逐项覆盖，Spark 与 Bolt 按当前产品页保留为部分披露。", "All four current main products are recorded. Core and Thor are transcribed from hardware manuals; Spark and Bolt remain partially disclosed from current product pages.")),
  catalogCoverage: "model-partial",
  verificationFocus: t(locale, l("锁定型号、可交付时间、机械臂和控制箱 IP、负载重心、速度、I/O、现场总线、数据治理、离线模式与支持条款。", "Lock model, delivery timing, arm and controller IP ratings, payload center of gravity, speed, I/O, fieldbus, data governance, offline mode, and support terms.")),
  presalesQuestions: [
    t(locale, l("Spark、Core、Thor 或 Bolt 中哪一款与负载、臂展、节拍和交付时间匹配？", "Which of Spark, Core, Thor, or Bolt matches payload, reach, cycle time, and delivery timing?")),
    t(locale, l("浏览器软件、视觉和 AI 功能在断网、权限和数据保留方面如何运行？", "How do browser software, vision, and AI functions behave for offline operation, permissions, and data retention?")),
    t(locale, l("安全回路、工具端供电、现场总线、移动底盘和售后责任如何验收？", "How will safety circuits, tool power, fieldbus, the mobile base, and support responsibilities be accepted?")),
  ],
  reviewedAt: "2026-09-04",
});

const patchElephant = (company: CompanyProfile, locale: Locale): CompanyProfile => ({
  ...company,
  legalName: t(locale, l("深圳市大象机器人科技有限公司", "Shenzhen Elephant Robotics Technology Co., Ltd.")),
  country: t(locale, l("中国", "China")),
  headquarters: t(locale, l("中国深圳", "Shenzhen, China")),
  founded: "2016",
  officialUrl: ELEPHANT_HOME,
  valueChainRole: t(locale, l("桌面机械臂、教育机器人、移动底盘与具身智能开发平台厂商", "Desktop-arm, education-robot, mobile-base, and embodied-development-platform supplier")),
  positioning: t(locale, l("以 myCobot、myPalletizer、mechArm、myArm、myBuddy、myAGV 和 Mercury 系列覆盖入门教学、机器人研究、轻型操作与双臂移动开发。", "Uses the myCobot, myPalletizer, mechArm, myArm, myBuddy, myAGV, and Mercury ranges to span entry-level teaching, robotics research, light manipulation, and bimanual mobile development.")),
  strengths: [
    t(locale, l("产品采用多种主控版本并配套 Python、ROS、图形化编程、GitBook 文档和丰富附件，适合教学与原型验证。", "Products use multiple controller editions with Python, ROS, graphical programming, GitBook documentation, and accessories for teaching and prototyping.")),
    t(locale, l("2024 选型手册集中公开多款产品的自由度、臂展、负载、质量、精度、供电、主控与接口字段。", "The 2024 selection manual publishes DoF, reach, payload, mass, accuracy, power, controller, and interface fields across multiple products.")),
    t(locale, l("型号更新快且同一系列存在 M5、Pi、Jetson、Arduino 等控制版本；本仓把硬件平台与控制变体明确分开。", "Model turnover is rapid and one family may have M5, Pi, Jetson, and Arduino controller editions; this repository separates the mechanical platform from controller variants.")),
  ],
  products: ["myPalletizer 260", "ultraArm P340", "mechArm 270", "myCobot 280", "myCobot 320", "myCobot Pro 600", "myArm 300 Pi", "myArm M750", "myBuddy 280 Pi", "myAGV 2023", "Mercury A1", "Mercury B1", "Mercury X1"],
  fit: [
    t(locale, l("高校、职业教育、STEM 教学、创客和机器人算法实验。", "Universities, vocational education, STEM teaching, makers, and robotics algorithm experiments.")),
    t(locale, l("视觉抓取、轻载桌面操作、ROS/MoveIt 学习和端到端数据采集。", "Vision-guided picking, light desktop manipulation, ROS/MoveIt learning, and end-to-end data collection.")),
    t(locale, l("双臂协同、移动操作和具身智能原型开发。", "Bimanual coordination, mobile manipulation, and embodied-intelligence prototyping.")),
  ],
  overview: [
    t(locale, l("大象机器人 2016 年在深圳成立，公开产品从桌面机械臂延伸到移动底盘、双臂半人形和轮式人形平台。官网披露的国家覆盖、合作伙伴、专利和出货数字属于厂商陈述，不能替代独立市场统计。", "Elephant Robotics was founded in Shenzhen in 2016. Its public catalog has expanded from desktop arms to mobile bases, dual-arm semi-humanoids, and wheeled humanoid platforms. Website figures for country reach, partners, patents, and shipments are manufacturer statements rather than independent market statistics.")),
    t(locale, l("本批次以 2024 选型手册为统一机械参数基线，并为 myCobot 280 Pi、myCobot 320 Pi、myArm M750 与 Mercury 系列补充产品专页或 GitBook。手册与当前页面出现臂展、质量或算力差异时，记录来源版本和冲突，不把旧值覆盖成新事实。", "This wave uses the 2024 selection manual as the shared mechanical baseline and adds product pages or GitBooks for myCobot 280 Pi, myCobot 320 Pi, myArm M750, and the Mercury range. Where manuals and current pages differ on reach, mass, or compute, the source revision and conflict are preserved instead of overwriting an older value as a new fact.")),
    t(locale, l("这些产品主要面向教学、研究和轻载开发，不应仅凭“协作”或“开源”宣传推断工业安全认证、连续工况或生产保修；相关边界必须按具体型号和合同确认。", "These products primarily target education, research, and light-duty development. Terms such as collaborative or open source do not establish industrial safety certification, continuous duty, or production warranty; those boundaries require model- and contract-specific confirmation.")),
  ],
  businessAreas: [
    t(locale, l("桌面机械臂、码垛与轻型协作平台", "Desktop arms, palletizing, and light collaborative platforms")),
    t(locale, l("教育课程、开发软件和机器人附件", "Education curricula, development software, and robot accessories")),
    t(locale, l("双臂、移动底盘和具身智能研究平台", "Bimanual, mobile-base, and embodied-intelligence research platforms")),
  ],
  customerGroups: [
    t(locale, l("高校、职业院校、STEM 教育机构和研究实验室", "Universities, vocational schools, STEM educators, and research laboratories")),
    t(locale, l("创客、机器人开发者、AI 与视觉算法团队", "Makers, robotics developers, and AI and vision teams")),
    t(locale, l("轻型自动化、展陈与机器人系统原型集成商", "Light-automation, exhibition, and robotics-prototype integrators")),
  ],
  milestones: [
    { date: "2016", event: t(locale, l("公司在深圳正式成立。", "The company was formally established in Shenzhen.")) },
    { date: "2020", event: t(locale, l("myCobot 桌面机械臂进入公开产品线。", "The myCobot desktop arm entered the public product range.")) },
    { date: "2023", event: t(locale, l("公开 Mercury A1、B1 与 X1 具身研究平台。", "Mercury A1, B1, and X1 embodied-research platforms were presented publicly.")) },
    { date: "2024", event: t(locale, l("发布覆盖桌面机械臂、移动底盘和 Mercury 系列的选型手册。", "A selection manual covering desktop arms, mobile bases, and the Mercury range was published.")) },
    { date: "2026", event: t(locale, l("官网继续扩展 myArm 与 Mercury 产品及文档。", "The website continued expanding the myArm and Mercury product and documentation set.")) },
  ],
  catalogScope: t(locale, l("本批次建立当前主要本体与平台记录；myCobot 的 M5/Pi/Jetson/Arduino、mechArm 和 myPalletizer 控制版本仍需在后续按当前专页拆分，附件生态也需型号级补录。", "This wave creates records for the main current bodies and platforms. M5/Pi/Jetson/Arduino editions of myCobot, controller editions of mechArm and myPalletizer, and the accessory ecosystem still require model-level separation against current product pages.")),
  catalogCoverage: "model-partial",
  verificationFocus: t(locale, l("锁定机械版本、主控版本、固件、ROS/Python 支持、负载条件、精度定义、连续工况、附件兼容、供电和安全边界。", "Lock mechanical revision, controller edition, firmware, ROS/Python support, payload conditions, accuracy definition, continuous duty, accessory compatibility, power, and safety boundaries.")),
  presalesQuestions: [
    t(locale, l("具体任务需要哪一款机械平台和哪一种 M5、Pi、Jetson 或 Arduino 主控版本？", "Which mechanical platform and which M5, Pi, Jetson, or Arduino controller edition does the task require?")),
    t(locale, l("负载、臂展、精度、速度、寿命和连续运行条件是否有当前手册支撑？", "Are payload, reach, accuracy, speed, service life, and continuous-operation conditions supported by the current manual?")),
    t(locale, l("夹爪、相机、底盘、ROS、固件、API 和安全停机如何组成可验收系统？", "How will grippers, cameras, base, ROS, firmware, APIs, and safe stopping form an acceptable system?")),
  ],
  reviewedAt: "2026-09-04",
});

export const applyVerifiedWaveElevenCompanyPatch = (company: CompanyProfile, locale: Locale): CompanyProfile => {
  if (company.slug === "techman-robot") return patchTechman(company, locale);
  if (company.slug === "franka-robotics") return patchFranka(company, locale);
  if (company.slug === "standard-bots") return patchStandardBots(company, locale);
  if (company.slug === "elephant-robotics") return patchElephant(company, locale);
  return company;
};

const row = (
  sourceUrl: string,
  sourceLabel: Localized,
  locator: Localized,
  labelZh: string,
  labelEn: string,
  valueZh: string,
  valueEn = valueZh,
  conditions?: Localized,
): SpecRow => ({ sourceUrl, sourceLabel, locator, label: l(labelZh, labelEn), value: l(valueZh, valueEn), conditions });

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

const companyAboutUrl: Record<CompanySlug, string> = {
  "techman-robot": TM_COMPANY,
  "franka-robotics": FRANKA_COMPANY,
  "standard-bots": STANDARD_ABOUT,
  "elephant-robotics": ELEPHANT_COMPANY,
};

const catalogTitle: Record<CompanySlug, Localized> = {
  "techman-robot": l("达明机器人型号级产品目录", "Techman Robot model-level catalog"),
  "franka-robotics": l("Franka Robotics 型号级产品目录", "Franka Robotics model-level catalog"),
  "standard-bots": l("Standard Bots 型号级产品目录", "Standard Bots model-level catalog"),
  "elephant-robotics": l("大象机器人型号级产品目录", "Elephant Robotics model-level catalog"),
};

const toRecord = (locale: Locale, company: CompanyProfile, seed: ProductSeed): FinderExpansionRecord => ({
  id: seed.id,
  matrixSlug: "",
  matrixTitle: t(locale, catalogTitle[seed.companySlug]),
  industry: company.industry,
  reviewedAt: "2026-09-04",
  product: seed.product,
  company: company.name,
  type: t(locale, seed.type),
  openness: locale === "zh" ? "官方产品页或型号手册公开" : "Official product page or model manual is public",
  integration: t(locale, seed.integration),
  verificationFocus: t(locale, seed.verification),
  sourceIds: company.sourceIds,
  officialUrl: seed.pageUrl,
  category: seed.category,
  useCases: seed.useCases,
  opennessLevel: "documented",
  parameters: withParameterIndex(seed.rows.map((item): FinderParameter => ({
    label: t(locale, item.label),
    value: t(locale, item.value),
    status: "manufacturer",
    sourceUrl: item.sourceUrl,
    sourceLabel: t(locale, item.sourceLabel),
    sourceLocator: t(locale, item.locator),
    conditions: item.conditions ? t(locale, item.conditions) : undefined,
  })), seed.pageUrl, locale === "zh" ? "厂商官方产品资料" : "Official manufacturer product material"),
  catalogPrimary: seed.primary,
  catalogSubclass: seed.subclass,
  catalogCoverage: "model-partial",
  catalogScope: locale === "zh"
    ? "本记录对应具名型号；数值只适用于引用来源、版本、配置和条件。"
    : "This record maps to a named model; figures apply only to the cited source, revision, configuration, and conditions.",
  profile: finderProfile(company),
  evidence: {
    level: "model",
    specificationKind: "parameters",
    specificationCoverage: seed.coverage,
    specificationCoverageNote: locale === "zh"
      ? seed.coverage === "official-complete"
        ? "已逐项覆盖引用官方规格表中该型号区块的公开字段；后续修订、选件和订单配置仍以来源文件为准。"
        : "已覆盖当前官方页面可明确归属的字段；未公开字段、冲突字段、选件或后续版本不作推断。"
      : seed.coverage === "official-complete"
        ? "Every public field in the cited official model block is covered; later revisions, options, and ordered configurations remain governed by source documents."
        : "Fields unambiguously attributable on the current official page are covered; undisclosed, conflicting, optional, or later-revision fields are not inferred.",
    overview: seed.overview.map((item) => t(locale, item)),
    applications: seed.applications.map((item) => t(locale, item)),
    disclosureBoundary: locale === "zh"
      ? "参数按来源与定位信息记录；宣传性判断、价格、交期、未披露性能和跨型号继承关系不作推断。"
      : "Parameters are recorded with source and locator context; promotional judgments, price, lead time, undisclosed performance, and cross-model inheritance are not inferred.",
    sourceLinks: [...new Map([
      { label: locale === "zh" ? `${seed.product} 官方资料` : `${seed.product} official material`, url: seed.pageUrl },
      ...(seed.sourceLinks ?? []).map((item) => ({ label: t(locale, item.label), url: item.url })),
      { label: locale === "zh" ? "公司官方介绍" : "Official company profile", url: companyAboutUrl[seed.companySlug] },
    ].map((item) => [item.url, item])).values()],
  },
});

type TechmanSpec = {
  model: string;
  generation: "s" | "legacy";
  pageUrl: string;
  mass: string;
  payload: string;
  reach: string;
  j3Range: string;
  jointSpeed: string;
  tcpSpeed: string;
  repeatability: string;
  armIp: string;
  controllerIp: string;
  power: string;
  supply: string;
  controlBoxWeight?: string;
};

const techmanSpecs: TechmanSpec[] = [
  { model: "TM5S", generation: "s", pageUrl: "https://www.tm-robot.com/en/product/tm-ai-cobot-s-series/tm5s", mass: "23.9 kg", payload: "5 kg", reach: "946 mm", j3Range: "±158°", jointSpeed: "J1/J2/J3 210°/s；J4/J5 225°/s；J6 450°/s", tcpSpeed: "4.5 m/s", repeatability: "±0.03 mm", armIp: "IP65", controllerIp: "IP54", power: "240 W", supply: "100-240 VAC, 50-60 Hz", controlBoxWeight: "13.5 kg" },
  { model: "TM6S", generation: "s", pageUrl: "https://www.tm-robot.com/en/product/tm-ai-cobot-s-series/tm6s", mass: "35.5 kg", payload: "6 kg", reach: "1800 mm", j3Range: "±166°", jointSpeed: "J1/J2 130°/s；J3 210°/s；J4/J5 225°/s；J6 450°/s", tcpSpeed: "4.5 m/s", repeatability: "±0.10 mm", armIp: "IP65", controllerIp: "IP54", power: "400 W", supply: "100-240 VAC, 50-60 Hz", controlBoxWeight: "13.5 kg" },
  { model: "TM7S", generation: "s", pageUrl: "https://www.tm-robot.com/en/product/tm-ai-cobot-s-series/tm7s", mass: "22.9 kg", payload: "7 kg", reach: "758 mm", j3Range: "±152°", jointSpeed: "J1/J2/J3 210°/s；J4/J5 225°/s；J6 450°/s", tcpSpeed: "4.5 m/s", repeatability: "±0.03 mm", armIp: "IP65", controllerIp: "IP54", power: "240 W", supply: "100-240 VAC, 50-60 Hz", controlBoxWeight: "13.5 kg" },
  { model: "TM12S", generation: "s", pageUrl: "https://www.tm-robot.com/en/product/tm-ai-cobot-s-series/tm12s", mass: "33.3 kg", payload: "12 kg", reach: "1300 mm", j3Range: "±162°", jointSpeed: "J1/J2 130°/s；J3 210°/s；J4/J5 225°/s；J6 450°/s", tcpSpeed: "4.5 m/s", repeatability: "±0.03 mm", armIp: "IP65", controllerIp: "IP54", power: "400 W", supply: "100-240 VAC, 50-60 Hz", controlBoxWeight: "13.5 kg" },
  { model: "TM14S", generation: "s", pageUrl: "https://www.tm-robot.com/en/product/tm-ai-cobot-s-series/tm14s", mass: "33 kg", payload: "14 kg", reach: "1100 mm", j3Range: "±159°", jointSpeed: "J1/J2 130°/s；J3 210°/s；J4/J5 225°/s；J6 450°/s", tcpSpeed: "4.5 m/s", repeatability: "±0.03 mm", armIp: "IP65", controllerIp: "IP54", power: "400 W", supply: "100-240 VAC, 50-60 Hz", controlBoxWeight: "13.5 kg" },
  { model: "TM20S", generation: "s", pageUrl: "https://www.tm-robot.com/en/product/tm-ai-cobot-s-series/tm20s", mass: "33.3 kg", payload: "20 kg", reach: "1300 mm", j3Range: "±162°", jointSpeed: "J1 130°/s；J2 95°/s；J3 125°/s；J4 160°/s；J5 190°/s；J6 225°/s", tcpSpeed: "4.5 m/s", repeatability: "±0.05 mm", armIp: "IP65", controllerIp: "IP54", power: "580 W", supply: "200-240 VAC, 50-60 Hz", controlBoxWeight: "16.3 kg" },
  { model: "TM25S", generation: "s", pageUrl: "https://www.tm-robot.com/en/product/tm-ai-cobot-s-series/tm25s", mass: "82.1 kg", payload: "25 kg", reach: "1902 mm", j3Range: "±166°", jointSpeed: "J1/J2 100°/s；J3 130°/s；J4/J5 195°/s；J6 225°/s", tcpSpeed: "5.2 m/s", repeatability: "±0.05 mm", armIp: "IP65", controllerIp: "IP54", power: "580 W", supply: "200-240 VAC, 50-60 Hz", controlBoxWeight: "16.3 kg" },
  { model: "TM30S", generation: "s", pageUrl: "https://www.tm-robot.com/en/product/tm-ai-cobot-s-series/tm30s", mass: "81.1 kg", payload: "30 kg", reach: "1702 mm", j3Range: "±170°", jointSpeed: "J1/J2 100°/s；J3 130°/s；J4/J5 195°/s；J6 225°/s", tcpSpeed: "5.2 m/s", repeatability: "±0.05 mm", armIp: "IP65", controllerIp: "IP54", power: "580 W", supply: "200-240 VAC, 50-60 Hz", controlBoxWeight: "16.3 kg" },
  { model: "TM30SC", generation: "s", pageUrl: "https://www.tm-robot.com/en/product/tm-ai-cobot-s-series/tm30sc", mass: "79.7 kg", payload: "30 kg", reach: "1502 mm", j3Range: "±168°", jointSpeed: "J1/J2 100°/s；J3 130°/s；J4/J5 195°/s；J6 225°/s", tcpSpeed: "5.0 m/s", repeatability: "±0.05 mm", armIp: "IP65", controllerIp: "IP54", power: "580 W", supply: "200-240 VAC, 50-60 Hz", controlBoxWeight: "16.3 kg" },
  { model: "TM5-700", generation: "legacy", pageUrl: "https://www.tm-robot.com/en/product/tm-ai-cobot-series/tm5-700", mass: "22.1 kg", payload: "6 kg", reach: "746 mm", j3Range: "±155°", jointSpeed: "J1/J2/J3 180°/s；J4/J5/J6 225°/s", tcpSpeed: "4.0 m/s", repeatability: "±0.05 mm", armIp: "IP54", controllerIp: "IP32", power: "220 W", supply: "100-240 VAC, 50-60 Hz" },
  { model: "TM5-900", generation: "legacy", pageUrl: "https://www.tm-robot.com/en/product/tm-ai-cobot-series/tm5-900", mass: "22.6 kg", payload: "4 kg", reach: "946 mm", j3Range: "±155°", jointSpeed: "J1/J2/J3 180°/s；J4/J5/J6 225°/s", tcpSpeed: "4.0 m/s", repeatability: "±0.05 mm", armIp: "IP54", controllerIp: "IP32", power: "220 W", supply: "100-240 VAC, 50-60 Hz" },
  { model: "TM12", generation: "legacy", pageUrl: "https://www.tm-robot.com/en/product/tm-ai-cobot-series/tm12", mass: "32.8 kg", payload: "12 kg", reach: "1300 mm", j3Range: "±166°", jointSpeed: "J1/J2 120°/s；J3/J4/J5/J6 180°/s", tcpSpeed: "4.0 m/s", repeatability: "±0.10 mm", armIp: "IP54", controllerIp: "IP32", power: "300 W", supply: "100-240 VAC, 50-60 Hz" },
  { model: "TM14", generation: "legacy", pageUrl: "https://www.tm-robot.com/en/product/tm-ai-cobot-series/tm14", mass: "32.5 kg", payload: "14 kg", reach: "1100 mm", j3Range: "±163°", jointSpeed: "J1/J2 120°/s；J3 180°/s；J4/J5 150°/s；J6 180°/s", tcpSpeed: "4.0 m/s", repeatability: "±0.10 mm", armIp: "IP54", controllerIp: "IP32", power: "300 W", supply: "100-240 VAC, 50-60 Hz" },
  { model: "TM16", generation: "legacy", pageUrl: "https://www.tm-robot.com/en/product/tm-ai-cobot-series/tm16", mass: "32 kg", payload: "16 kg", reach: "917 mm", j3Range: "±155°", jointSpeed: "J1/J2 120°/s；J3/J4/J5/J6 180°/s", tcpSpeed: "4.0 m/s", repeatability: "±0.10 mm", armIp: "IP54", controllerIp: "IP32", power: "300 W", supply: "100-240 VAC, 50-60 Hz" },
  { model: "TM20", generation: "legacy", pageUrl: "https://www.tm-robot.com/en/product/tm-ai-cobot-series/tm20", mass: "32.8 kg", payload: "20 kg", reach: "1300 mm", j3Range: "±166°", jointSpeed: "J1/J2 90°/s；J3 120°/s；J4 150°/s；J5 180°/s；J6 225°/s", tcpSpeed: "4.0 m/s", repeatability: "±0.10 mm", armIp: "IP54", controllerIp: "IP32", power: "300 W", supply: "100-240 VAC, 50-60 Hz" },
];

const techmanRows = (spec: TechmanSpec): SpecRow[] => {
  const source = l("TM Robot Catalog 2026-04-07 型号规格表", "TM Robot Catalog model specification sheet dated 2026-04-07");
  const locator = l(spec.generation === "s" ? `第 1 页 ${spec.model} 列` : `第 2 页 ${spec.model} 列`, spec.generation === "s" ? `Page 1, ${spec.model} column` : `Page 2, ${spec.model} column`);
  const r = (zh: string, en: string, valueZh: string, valueEn = valueZh, conditions?: Localized) => row(TM_SPEC, source, locator, zh, en, valueZh, valueEn, conditions);
  const sSeries = spec.generation === "s";
  return [
    r("本体质量", "Robot mass", spec.mass),
    r("最大负载", "Maximum payload", spec.payload),
    r("最大工作半径", "Maximum reach", spec.reach),
    r("自由度", "Degrees of freedom", "6 DoF"),
    r("J1/J2/J4/J5/J6 关节范围", "J1/J2/J4/J5/J6 joint ranges", sSeries ? "±360°" : "J1/J6 ±270°；J2/J4/J5 ±180°", sSeries ? "±360°" : "J1/J6 ±270°; J2/J4/J5 ±180°"),
    r("J3 关节范围", "J3 joint range", spec.j3Range),
    r("最大关节速度", "Maximum joint speeds", spec.jointSpeed, spec.jointSpeed.replaceAll("；", "; ")),
    r("最大 TCP 速度", "Maximum TCP speed", spec.tcpSpeed),
    r("重复定位精度", "Repeatability", spec.repeatability),
    r("控制箱数字 I/O", "Controller digital I/O", "16 路输入 / 16 路输出", "16 inputs / 16 outputs"),
    r("控制箱模拟 I/O", "Controller analog I/O", sSeries ? "2 路输入 / 2 路输出" : "2 路输入 / 1 路输出", sSeries ? "2 inputs / 2 outputs" : "2 inputs / 1 output"),
    r("工具端数字 I/O", "Tool digital I/O", sSeries ? "3 路输入 / 3 路输出" : "4 路输入 / 4 路输出", sSeries ? "3 inputs / 3 outputs" : "4 inputs / 4 outputs"),
    ...(sSeries ? [r("工具端复用通信", "Tool multiplexed communication", "DO_0 可复用为 AI；DO_1/DO_2 可复用为 RS-485 -/+", "DO_0 can be multiplexed as AI; DO_1/DO_2 can be multiplexed as RS-485 -/+")] : [r("工具端模拟 I/O", "Tool analog I/O", "1 路输入 / 0 路输出", "1 input / 0 outputs")]),
    r("I/O 供电", "I/O power supply", "控制箱 24 V 2.0 A；工具端 24 V 1.5 A", "Controller 24 V 2.0 A; tool 24 V 1.5 A"),
    r("机械臂防护等级", "Robot-arm ingress protection", spec.armIp),
    r("控制箱防护等级", "Controller ingress protection", spec.controllerIp),
    r("典型功耗", "Typical power consumption", spec.power),
    r("工作温度", "Operating temperature", "0-50°C"),
    r("洁净等级", "Cleanroom class", "ISO Class 3"),
    r("交流供电", "AC power supply", spec.supply),
    r("控制箱物理接口", "Controller physical interfaces", sSeries ? "2×COM、1×HDMI、3×LAN、2×USB 2.0、4×USB 3.0" : "3×COM、1×HDMI、3×LAN、4×USB 2.0、2×USB 3.0"),
    r("通信协议", "Communication protocols", sSeries ? "RS-232、RS-422/RS-485、Ethernet、Modbus TCP/RTU（主/从）" : "RS-232、Ethernet、Modbus TCP/RTU（主/从）", sSeries ? "RS-232, RS-422/RS-485, Ethernet, Modbus TCP/RTU master and slave" : "RS-232, Ethernet, Modbus TCP/RTU master and slave"),
    r("可选网络卡", "Optional network cards", "PROFINET、EtherNet/IP、EtherCAT、CC-Link", "PROFINET, EtherNet/IP, EtherCAT, CC-Link"),
    r("编程环境", "Programming environments", sSeries ? "TMflow（流程图）、TMscript（脚本）、TMcraft（开发者）" : "TMflow（流程图/脚本）", sSeries ? "TMflow flowchart, TMscript, and TMcraft" : "TMflow flowchart and script"),
    r("安全标准", "Safety standards", "ISO 13849-1、ISO 10218-1、ISO/TS 15066"),
    ...(spec.controlBoxWeight ? [r("标准控制箱质量", "Standard controller weight", spec.controlBoxWeight)] : []),
  ];
};

const techmanSeeds: ProductSeed[] = techmanSpecs.map((spec) => ({
  id: `techman-${spec.model.toLowerCase().replaceAll("-", "-")}`,
  companySlug: "techman-robot",
  product: spec.model,
  pageUrl: spec.pageUrl,
  category: "robot-platform",
  primary: "robot-platform",
  subclass: "industrial-arm",
  useCases: ["manufacturing", "integration", "logistics"],
  type: l(spec.generation === "s" ? "TM S 系列六轴视觉协作机械臂" : "TM 六轴视觉协作机械臂", spec.generation === "s" ? "TM S Series six-axis vision cobot" : "TM six-axis vision cobot"),
  integration: l("通过 TM 控制箱、TMflow、内置或外部视觉、工具端 I/O、Modbus 与可选工业网络接入工作站。", "Integrates through a TM controller, TMflow, integrated or external vision, tool I/O, Modbus, and optional industrial networks."),
  verification: l("核对本体与控制箱变体、负载重心、速度、视觉标定、工具端复用 I/O、网络卡、安全功能和区域认证。", "Verify arm and controller variants, payload center of gravity, speed, vision calibration, multiplexed tool I/O, network card, safety functions, and regional certification."),
  rows: techmanRows(spec),
  overview: [
    l(`${spec.model} 是 ${spec.generation === "s" ? "S 系列" : "早期 TM AI Cobot 系列"}具名本体，版本化规格表列出 ${spec.payload} 最大负载、${spec.reach} 臂展、${spec.repeatability} 重复定位精度和 ${spec.mass} 本体质量。`, `${spec.model} is a named arm in the ${spec.generation === "s" ? "S Series" : "earlier TM AI Cobot range"}. The versioned sheet lists ${spec.payload} maximum payload, ${spec.reach} reach, ${spec.repeatability} repeatability, and ${spec.mass} arm mass.`),
    l("本记录把标准、M 与 X 视为控制与供电配置，不重复创建同一机械臂本体；具体配置以报价和订单文件为准。", "This record treats standard, M, and X as controller and power configurations rather than duplicate arm bodies; the exact configuration is governed by quotation and order documents."),
  ],
  applications: [l("视觉定位、装配、检测、上下料、焊接、包装、码垛与移动工作站", "Vision guidance, assembly, inspection, machine tending, welding, packaging, palletizing, and mobile workcells")],
  coverage: "official-complete",
  sourceLinks: [
    { label: l("版本化型号规格表", "Versioned model specification sheet"), url: TM_SPEC },
    { label: l("TM S 系列入口", "TM S Series entry"), url: TM_SERIES },
  ],
}));

const tm3sSeed: ProductSeed = {
  id: "techman-tm3s",
  companySlug: "techman-robot",
  product: "TM3S",
  pageUrl: TM3S,
  category: "robot-platform",
  primary: "robot-platform",
  subclass: "industrial-arm",
  useCases: ["manufacturing", "integration", "research"],
  type: l("紧凑型六轴视觉协作机械臂", "Compact six-axis vision cobot"),
  integration: l("沿用 TM S 系列视觉、手动引导、TMflow 和控制箱生态，并增加主线缆快拆连接。", "Uses the TM S Series vision, hand-guiding, TMflow, and controller ecosystem and adds a quick-release main-cable connection."),
  verification: l("TM3S 完整数据表尚未在引用公告中公开；需确认质量上限的精确值、速度、精度、I/O、IP、控制箱和认证。", "The cited announcement does not yet publish a complete TM3S data sheet; confirm exact mass, speed, accuracy, I/O, IP ratings, controller, and certification."),
  rows: [
    row(TM3S, l("TM3S 官方发布说明", "Official TM3S introduction"), l("Lightweight Design 与 Seamless Compatibility", "Lightweight Design and Seamless Compatibility"), "本体质量", "Robot mass", "小于 12 kg", "Less than 12 kg"),
    row(TM3S, l("TM3S 官方发布说明", "Official TM3S introduction"), l("Lightweight Design", "Lightweight Design"), "最大负载", "Maximum payload", "3 kg"),
    row(TM3S, l("TM3S 官方发布说明", "Official TM3S introduction"), l("Lightweight Design", "Lightweight Design"), "最大工作半径", "Maximum reach", "600 mm"),
    row(TM3S, l("TM3S 官方发布说明", "Official TM3S introduction"), l("Seamless Compatibility", "Seamless Compatibility"), "平台兼容", "Platform compatibility", "TM S 系列视觉、手动引导、TMflow 与控制箱", "TM S Series vision, hand-guiding, TMflow, and control boxes"),
    row(TM3S, l("TM3S 官方发布说明", "Official TM3S introduction"), l("Quick-Release Connector", "Quick-Release Connector"), "主线缆连接", "Main-cable connection", "快拆复合线缆，可不拆解本体更换", "Quick-release composite cable replaceable without disassembling the arm"),
    row(TM3S, l("TM3S 官方发布说明", "Official TM3S introduction"), l("页面更新时间", "Page update date"), "公告日期", "Announcement date", "2026-06-26"),
  ],
  overview: [l("TM3S 是面向狭小空间和频繁移动场景的紧凑型号，官方公告公开 3 kg 负载、600 mm 臂展与小于 12 kg 的质量。", "TM3S is a compact model for confined spaces and frequent relocation. The official announcement publishes a 3 kg payload, 600 mm reach, and mass below 12 kg."), l("该公告不是完整规格表，因此本记录不继承其他 S 系列型号的速度、精度、IP 或 I/O 数值。", "The announcement is not a complete specification table, so this record does not inherit speed, accuracy, IP, or I/O values from other S-series models.")],
  applications: [l("紧凑工位、实验室、频繁搬移的柔性自动化与轻载视觉操作", "Compact workcells, laboratories, frequently relocated flexible automation, and light vision-guided tasks")],
  coverage: "official-partial",
  sourceLinks: [{ label: l("TM S 系列入口", "TM S Series entry"), url: TM_SERIES }],
};

const frankaArmRows = (sourceUrl: string, sourceLabel: Localized, locator: Localized): SpecRow[] => {
  const r = (zh: string, en: string, valueZh: string, valueEn = valueZh, conditions?: Localized) => row(sourceUrl, sourceLabel, locator, zh, en, valueZh, valueEn, conditions);
  return [
    r("自由度", "Degrees of freedom", "7 DoF"),
    r("额定负载", "Nominal payload", "3 kg", "3 kg", l("末端负载及重心需满足手册限制", "End load and center of gravity must satisfy manual limits")),
    r("最大工作半径", "Maximum reach", "855 mm"),
    r("本体质量", "Robot mass", "17.8 kg"),
    r("关节力矩传感器", "Joint torque sensors", "7 个，所有关节", "7, one at every joint"),
    r("关节最大速度", "Maximum joint speeds", "A1-A4：150°/s；A5-A7：301°/s", "A1-A4: 150°/s; A5-A7: 301°/s"),
    r("末端最大速度", "Maximum end-effector speed", "2 m/s"),
    r("重复定位精度", "Repeatability", "小于 ±0.1 mm", "Below ±0.1 mm"),
    r("手动引导力", "Guiding force", "约 2.5 N", "Approximately 2.5 N"),
    r("平移刚度可设范围", "Configurable translational stiffness", "10-3000 N/m"),
    r("旋转刚度可设范围", "Configurable rotational stiffness", "1-300 Nm/rad"),
    r("机械臂防护等级", "Arm ingress protection", "IP40"),
    r("工作温度", "Operating temperature", "5-45°C"),
    r("相对湿度", "Relative humidity", "20-80% RH", "20-80% RH", l("非冷凝", "Non-condensing")),
    r("控制箱尺寸", "Controller dimensions", "355 × 483 × 89 mm"),
    r("控制箱质量", "Controller mass", "7 kg"),
    r("控制箱防护等级", "Controller ingress protection", "IP20"),
    r("交流输入", "AC input", "100-240 VAC, 50-60 Hz"),
    r("典型功耗", "Typical power consumption", "约 80 W", "Approximately 80 W"),
    r("工业通信", "Industrial communications", "Modbus/TCP、OPC UA", "Modbus/TCP and OPC UA"),
    r("实时控制接口", "Real-time control interface", "Franka Control Interface, 1 kHz", "Franka Control Interface at 1 kHz"),
  ];
};

const fr3Rows = frankaArmRows(FR3_DATA, l("Franka Research 3 Datasheet 1.1", "Franka Research 3 Datasheet 1.1"), l("Technical data", "Technical data"));
const fp3Rows = frankaArmRows(FP3_MANUAL, l("Franka Production 3 Product Manual 1.0", "Franka Production 3 Product Manual 1.0"), l("Technical specifications", "Technical specifications"));

const frankaSeeds: ProductSeed[] = [
  {
    id: "franka-research-3",
    companySlug: "franka-robotics",
    product: "Franka Research 3",
    pageUrl: FR3_PAGE,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "research-arm",
    useCases: ["research", "integration"],
    type: l("七轴力控研究机械臂", "Seven-axis force-controlled research arm"),
    integration: l("通过 Desk、FCI 1 kHz 接口、Modbus/TCP、OPC UA 和末端法兰接入实验与机器人学习系统。", "Integrates into experiments and robot-learning systems through Desk, the 1 kHz FCI, Modbus/TCP, OPC UA, and the end flange."),
    verification: l("核对 FCI 许可与版本、控制周期、末端负载重心、碰撞阈值、网络拓扑、研究用途和安全边界。", "Verify FCI license and revision, control cycle, end-load center of gravity, collision thresholds, network topology, research use, and safety boundaries."),
    rows: fr3Rows,
    overview: [l("Franka Research 3 是面向研究和机器人学习的七轴力控机械臂，七个关节均带力矩传感器，并提供 1 kHz FCI。", "Franka Research 3 is a seven-axis force-controlled arm for research and robot learning, with torque sensing at all seven joints and a 1 kHz FCI."), l("3 kg 负载、855 mm 臂展和重复定位精度必须结合末端重心、动态动作和手册限制使用，不能仅按单一额定值选型。", "The 3 kg payload, 855 mm reach, and repeatability must be applied with end-load center of gravity, dynamic motion, and manual limits rather than as isolated selection values.")],
    applications: [l("力控、接触操作、模仿学习、强化学习、实验室自动化和人机协作研究", "Force control, contact-rich tasks, imitation learning, reinforcement learning, laboratory automation, and human-robot interaction research")],
    coverage: "official-complete",
    sourceLinks: [{ label: l("FR3 官方数据表", "Official FR3 datasheet"), url: FR3_DATA }, { label: l("Franka 文档中心", "Franka document center"), url: FRANKA_DOCUMENTS }],
  },
  {
    id: "franka-production-3",
    companySlug: "franka-robotics",
    product: "Franka Production 3",
    pageUrl: FP3_PAGE,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "industrial-arm",
    useCases: ["manufacturing", "integration"],
    type: l("七轴力控生产机械臂", "Seven-axis force-controlled production arm"),
    integration: l("按生产手册集成控制箱、末端、Modbus/TCP、OPC UA、安全设备和工作站风险控制。", "Integrates the controller, tooling, Modbus/TCP, OPC UA, safety devices, and workcell risk controls under the production manual."),
    verification: l("确认生产版本、功能安全配置、末端负载、IP、连续工况、许可、区域认证与维护责任。", "Confirm production revision, functional-safety configuration, end load, IP rating, duty cycle, licensing, regional certification, and maintenance responsibility."),
    rows: fp3Rows,
    overview: [l("Franka Production 3 沿用七轴力控结构，面向生产和工业集成；参数与 FR3 相近不意味着软件许可、安全认证和支持边界相同。", "Franka Production 3 uses a seven-axis force-controlled structure for production and industrial integration. Similar core figures to FR3 do not imply identical software licensing, safety certification, or support boundaries."), l("本记录依据 FP3 产品手册，不把研究版接口或原型功能自动归入生产版。", "This record follows the FP3 product manual and does not automatically assign research-edition interfaces or prototype capabilities to the production edition.")],
    applications: [l("精密装配、实验室自动化、检测、轻载上下料、打磨和接触操作", "Precision assembly, laboratory automation, inspection, light machine tending, finishing, and contact-rich tasks")],
    coverage: "official-complete",
    sourceLinks: [{ label: l("FP3 官方产品手册", "Official FP3 product manual"), url: FP3_MANUAL }, { label: l("Franka 文档中心", "Franka document center"), url: FRANKA_DOCUMENTS }],
  },
  {
    id: "franka-hand",
    companySlug: "franka-robotics",
    product: "Franka Hand",
    pageUrl: FRANKA_HAND,
    category: "end-effector",
    primary: "end-effector",
    subclass: "parallel-gripper",
    useCases: ["research", "manufacturing", "integration"],
    type: l("电动平行两指手爪", "Electric parallel two-finger gripper"),
    integration: l("安装到 Franka 机械臂法兰，通过机械臂控制与手指附件组成抓取系统。", "Mounts to a Franka arm flange and forms a gripping system through arm control and finger attachments."),
    verification: l("核对开口、夹持力、指尖形状、工件摩擦、质量与重心、最大速度和碰撞风险。", "Verify opening, grasp force, fingertip geometry, workpiece friction, mass and center of gravity, maximum speed, and collision risk."),
    rows: [
      row(FRANKA_HAND_MANUAL, l("Franka Hand Product Manual 1.2", "Franka Hand Product Manual 1.2"), l("Technical data", "Technical data"), "外形尺寸", "Dimensions", "63 × 205 × 127 mm"),
      row(FRANKA_HAND_MANUAL, l("Franka Hand Product Manual 1.2", "Franka Hand Product Manual 1.2"), l("Technical data", "Technical data"), "质量", "Mass", "730 g"),
      row(FRANKA_HAND_MANUAL, l("Franka Hand Product Manual 1.2", "Franka Hand Product Manual 1.2"), l("Center of mass", "Center of mass"), "重心", "Center of mass", "x=0 mm, y=10 mm, z=30 mm"),
      row(FRANKA_HAND_MANUAL, l("Franka Hand Product Manual 1.2", "Franka Hand Product Manual 1.2"), l("Grasping", "Grasping"), "可调夹持力", "Adjustable grasp force", "30-70 N"),
      row(FRANKA_HAND_MANUAL, l("Franka Hand Product Manual 1.2", "Franka Hand Product Manual 1.2"), l("Grasping", "Grasping"), "最大开口行程", "Maximum opening travel", "80 mm"),
      row(FRANKA_HAND_MANUAL, l("Franka Hand Product Manual 1.2", "Franka Hand Product Manual 1.2"), l("Grasping", "Grasping"), "单指最大速度", "Maximum speed per finger", "50 mm/s"),
      row(FRANKA_HAND_MANUAL, l("Franka Hand Product Manual 1.2", "Franka Hand Product Manual 1.2"), l("Design", "Design"), "手指数量", "Finger count", "2"),
      row(FRANKA_HAND_MANUAL, l("Franka Hand Product Manual 1.2", "Franka Hand Product Manual 1.2"), l("Operation", "Operation"), "夹持方式", "Gripping mode", "连续可调平行夹持", "Continuously adjustable parallel grasp"),
    ],
    overview: [l("Franka Hand 是与 Franka 机械臂配套的电动平行手爪，公开手册提供尺寸、质量、重心、夹持力、开口和手指速度。", "Franka Hand is an electric parallel gripper for Franka arms. Its public manual provides dimensions, mass, center of mass, grasp force, opening, and finger speed."), l("夹持力范围不等同于可安全搬运的工件质量；实际能力取决于指尖、摩擦、加速度、姿态和机械臂负载。", "The grasp-force range is not a safe-workpiece-mass rating; actual capability depends on fingertips, friction, acceleration, pose, and arm payload.")],
    applications: [l("实验抓取、装配、搬运、机器人学习和末端工具原型", "Experimental grasping, assembly, handling, robot learning, and end-tool prototyping")],
    coverage: "official-complete",
    sourceLinks: [{ label: l("Franka Hand 官方手册", "Official Franka Hand manual"), url: FRANKA_HAND_MANUAL }],
  },
  {
    id: "franka-diana-7",
    companySlug: "franka-robotics",
    product: "Diana 7",
    pageUrl: DIANA7,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "industrial-arm",
    useCases: ["manufacturing", "research", "integration"],
    type: l("七轴力控协作机械臂", "Seven-axis force-controlled collaborative arm"),
    integration: l("通过控制箱、ISO 9409 法兰、数字/模拟 I/O 与 C++、Python、Lua 接口接入固定工作站。", "Integrates into fixed workcells through its controller, ISO 9409 flange, digital and analog I/O, and C++, Python, and Lua interfaces."),
    verification: l("核对负载重心、关节运动范围、TCP 速度、法兰、I/O、软件接口、安全配置、IP 与连续工况。", "Verify payload center of gravity, joint ranges, TCP speed, flange, I/O, software interfaces, safety configuration, IP rating, and duty cycle."),
    rows: (() => {
      const source = l("Diana 7 Product Flyer 2026-01-30", "Diana 7 Product Flyer dated 2026-01-30");
      const locator = l("Technical data", "Technical data");
      const r = (zh: string, en: string, valueZh: string, valueEn = valueZh) => row(DIANA7_DATA, source, locator, zh, en, valueZh, valueEn);
      return [
        r("自由度", "Degrees of freedom", "7 DoF"), r("额定负载", "Nominal payload", "7 kg"), r("最大工作半径", "Maximum reach", "923 mm"), r("重复定位精度", "Repeatability", "±0.05 mm"), r("本体质量", "Robot mass", "28 kg"), r("底座直径", "Base diameter", "190 mm"),
        r("末端法兰", "End flange", "ISO 9409"), r("最大 TCP 速度", "Maximum TCP speed", "2.4 m/s"), r("工作温度", "Operating temperature", "0-50°C"), r("相对湿度", "Relative humidity", "最高 90% RH", "Up to 90% RH"), r("防护等级", "Ingress protection", "IP50"),
        r("J1 范围 / 速度", "J1 range / speed", "±179° / 180°/s"), r("J2 范围 / 速度", "J2 range / speed", "±90° / 180°/s"), r("J3 范围 / 速度", "J3 range / speed", "±179° / 210°/s"), r("J4 范围 / 速度", "J4 range / speed", "0-175° / 210°/s"), r("J5-J7 范围 / 速度", "J5-J7 range / speed", "±179° / 270°/s"),
        r("编程接口", "Programming interfaces", "C++、Python、Lua"), r("控制箱连接线", "Controller cable", "5 m"), r("交流电源线", "AC power cable", "3 m"), r("交流输入", "AC input", "110-240 VAC"), r("控制箱尺寸", "Controller dimensions", "483 × 377 × 192 mm"), r("控制箱质量", "Controller mass", "16 kg"), r("控制箱数字 I/O", "Controller digital I/O", "16 路输入 / 16 路输出", "16 inputs / 16 outputs"), r("控制箱模拟 I/O", "Controller analog I/O", "2 路输入 / 2 路输出", "2 inputs / 2 outputs"), r("24 V 输出", "24 V output", "2.5 A"),
      ];
    })(),
    overview: [l("Diana 7 是当前 Agile Robots/Franka 产品组合中的 7 kg、七轴机械臂，2026 版产品单公开本体、关节、控制箱和接口字段。", "Diana 7 is a 7 kg, seven-axis arm in the current Agile Robots/Franka portfolio. Its 2026 product flyer publishes arm, joint, controller, and interface fields."), l("Diana 7 与 FR3/FP3 的软件、法兰、负载和支持体系不同，不能只按“七轴力控”归为可互换产品。", "Diana 7 differs from FR3/FP3 in software, flange, payload, and support system and is not interchangeable merely because all are seven-axis force-controlled arms.")],
    applications: [l("装配、上下料、质量检测、打磨、机器人研究与精密操作", "Assembly, machine tending, quality inspection, finishing, robotics research, and precision manipulation")],
    coverage: "official-complete",
    sourceLinks: [{ label: l("Diana 7 官方产品单", "Official Diana 7 product flyer"), url: DIANA7_DATA }],
  },
  {
    id: "franka-fr3-duo",
    companySlug: "franka-robotics",
    product: "FR3 Duo",
    pageUrl: FR3_DUO,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "dual-arm-platform",
    useCases: ["research", "integration"],
    type: l("双臂研究平台", "Bimanual research platform"),
    integration: l("由两台 FR3、本体安装结构与双臂软件组成，可配 GELLO Duo 进行遥操作和数据采集。", "Combines two FR3 arms, a mounting structure, and bimanual software and can pair with GELLO Duo for teleoperation and data collection."),
    verification: l("核对底座与工作空间、双臂同步、碰撞区、末端、总负载、FCI 许可和数据时间戳。", "Verify base and workspace, bimanual synchronization, collision zones, end effectors, total load, FCI licensing, and data timestamps."),
    rows: [
      row(FR3_DUO, l("FR3 Duo 官方产品页", "Official FR3 Duo product page"), l("Product facts", "Product facts"), "系统自由度", "System degrees of freedom", "14 DoF"),
      row(FR3_DUO, l("FR3 Duo 官方产品页", "Official FR3 Duo product page"), l("Product facts", "Product facts"), "单臂额定负载", "Payload per arm", "3 kg"),
      row(FR3_DUO, l("FR3 Duo 官方产品页", "Official FR3 Duo product page"), l("Product facts", "Product facts"), "单臂最大工作半径", "Reach per arm", "855 mm"),
      row(FR3_DUO, l("FR3 Duo 官方产品页", "Official FR3 Duo product page"), l("Product facts", "Product facts"), "系统质量", "System mass", "45 kg"),
      row(FR3_DUO, l("FR3 Duo 官方产品页", "Official FR3 Duo product page"), l("Architecture", "Architecture"), "机械臂数量", "Arm count", "2"),
      row(FR3_DUO, l("FR3 Duo 官方产品页", "Official FR3 Duo product page"), l("Use cases", "Use cases"), "数据采集方式", "Data-collection mode", "支持双臂遥操作与示教", "Supports bimanual teleoperation and teaching"),
    ],
    overview: [l("FR3 Duo 是由两台 FR3 组成的双臂研究平台，公开页面给出 14 自由度、单臂负载与臂展以及系统质量。", "FR3 Duo is a bimanual research platform built from two FR3 arms. Its public page provides 14 DoF, per-arm payload and reach, and system mass."), l("双臂组合的可达空间、协同负载和安全边界取决于安装、末端和轨迹，不能由两台单臂参数简单相加。", "Bimanual workspace, coordinated load, and safety boundaries depend on mounting, tooling, and trajectories and cannot be derived by simply adding two single-arm ratings.")],
    applications: [l("双臂操作、模仿学习、数据采集、装配研究和柔性物体处理", "Bimanual manipulation, imitation learning, data collection, assembly research, and deformable-object handling")],
    coverage: "official-partial",
    sourceLinks: [{ label: l("Franka GELLO", "Franka GELLO"), url: GELLO }],
  },
  {
    id: "franka-mobile-fr3-duo",
    companySlug: "franka-robotics",
    product: "Mobile FR3 Duo",
    pageUrl: MOBILE_FR3_DUO,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "mobile-manipulator",
    useCases: ["research", "logistics", "integration"],
    type: l("移动双臂研究平台", "Mobile bimanual research platform"),
    integration: l("将 FR3 Duo、移动底盘、Jetson 计算与激光雷达/相机/IMU 组合为移动操作系统。", "Combines FR3 Duo, a mobile base, Jetson compute, lidar, cameras, and an IMU into a mobile-manipulation system."),
    verification: l("核对底盘负载与速度、传感器版本、相机视场、定位安全、双臂工作空间、电池和急停链路。", "Verify base payload and speed, sensor revisions, camera fields of view, navigation safety, bimanual workspace, battery, and emergency-stop chain."),
    rows: (() => {
      const source = l("Mobile FR3 Duo 官方产品页", "Official Mobile FR3 Duo product page");
      const locator = l("Technical data", "Technical data");
      const r = (zh: string, en: string, valueZh: string, valueEn = valueZh) => row(MOBILE_FR3_DUO, source, locator, zh, en, valueZh, valueEn);
      return [r("底盘尺寸", "Base dimensions", "800 × 580 × 294 mm"), r("机械臂数量", "Arm count", "2"), r("单臂最大工作半径", "Reach per arm", "855 mm"), r("底盘负载", "Base payload", "100 kg"), r("单臂额定负载", "Payload per arm", "3 kg"), r("底盘最大速度", "Maximum base speed", "1.75 m/s"), r("关节力矩传感器", "Joint torque sensors", "14"), r("激光雷达", "Lidars", "2"), r("相机", "Cameras", "7"), r("惯性测量单元", "IMU", "1"), r("边缘计算", "Edge compute", "NVIDIA Jetson")];
    })(),
    overview: [l("Mobile FR3 Duo 在移动底盘上组合两台 FR3，并公开 14 个关节力矩传感器、双激光雷达、七台相机和一个 IMU。", "Mobile FR3 Duo combines two FR3 arms on a mobile base and publishes 14 joint torque sensors, two lidars, seven cameras, and one IMU."), l("页面没有完整披露电池、运行时间、相机型号和整机安全认证，因此本记录保留为部分披露。", "The page does not fully disclose battery, runtime, camera models, or system safety certification, so this record remains partially disclosed.")],
    applications: [l("移动双臂研究、实验室物料流转、机器人学习数据采集和自主操作", "Mobile bimanual research, laboratory material movement, robot-learning data collection, and autonomous manipulation")],
    coverage: "official-partial",
  },
  {
    id: "franka-tactile-mobile-robot",
    companySlug: "franka-robotics",
    product: "Tactile Mobile Robot",
    pageUrl: TMR,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "mobile-manipulator",
    useCases: ["research", "integration", "logistics"],
    type: l("触觉移动操作研究平台", "Tactile mobile-manipulation research platform"),
    integration: l("将移动底盘、Franka 机械臂、Jetson AGX Orin 与 FCI 组合为触觉移动研究平台。", "Combines a mobile base, Franka arm, Jetson AGX Orin, and FCI into a tactile mobile research platform."),
    verification: l("核对机械臂版本、底盘、电池、传感器、算力模式、实时控制、导航安全和可采购状态。", "Verify arm edition, base, battery, sensors, compute mode, real-time control, navigation safety, and availability."),
    rows: (() => {
      const source = l("Tactile Mobile Robot 官方产品页", "Official Tactile Mobile Robot product page");
      const locator = l("Platform specifications", "Platform specifications");
      const r = (zh: string, en: string, valueZh: string, valueEn = valueZh, conditions?: Localized) => row(TMR, source, locator, zh, en, valueZh, valueEn, conditions);
      return [r("底盘尺寸", "Base dimensions", "800 × 580 × 294 mm"), r("底盘负载", "Base payload", "100 kg"), r("底盘最大速度", "Maximum base speed", "1.75 m/s"), r("标称运行时间", "Nominal operating time", "8 h", "8 h", l("页面给出的 460 W 工况", "At the page's stated 460 W condition")), r("参考功耗", "Reference power", "460 W"), r("边缘计算", "Edge compute", "NVIDIA Jetson AGX Orin"), r("实时控制接口", "Real-time control interface", "Franka Control Interface, 1 kHz"), r("平台类型", "Platform type", "单臂移动操作平台", "Single-arm mobile-manipulation platform")];
    })(),
    overview: [l("Tactile Mobile Robot 是将 Franka 力控机械臂与移动底盘和 Jetson AGX Orin 组合的研究平台。", "Tactile Mobile Robot combines a Franka force-controlled arm with a mobile base and Jetson AGX Orin in a research platform."), l("8 小时运行时间对应页面给出的 460 W 条件，不代表所有计算、传感器和动作负载下的保证续航。", "The eight-hour operating time corresponds to the page's 460 W condition and is not a guaranteed runtime under every compute, sensing, and motion load.")],
    applications: [l("触觉移动操作、导航与操作联合研究、机器人学习和实验室自动化", "Tactile mobile manipulation, joint navigation-and-manipulation research, robot learning, and laboratory automation")],
    coverage: "official-partial",
  },
  {
    id: "franka-gello",
    companySlug: "franka-robotics",
    product: "Franka GELLO",
    pageUrl: GELLO,
    category: "model-software",
    primary: "model-software",
    subclass: "teleoperation-data",
    useCases: ["research", "integration"],
    type: l("单臂遥操作与示教数据采集设备", "Single-arm teleoperation and teaching-data device"),
    integration: l("面向 FR3 的单臂遥操作，可使用开源机械与软件资料自行构建，或采购预装测试版本。", "Provides single-arm teleoperation for FR3 and can be built from open mechanical and software resources or purchased as a tested pre-assembled system."),
    verification: l("核对 FR3 硬件版本、机械构件、编码器、标定、采样与时间同步、开源许可和预装交付清单。", "Verify FR3 hardware revision, mechanical components, encoders, calibration, sampling and time synchronization, open-source licenses, and the pre-assembled bill of materials."),
    rows: [
      row(GELLO, l("Franka GELLO 官方产品页", "Official Franka GELLO product page"), l("Single-arm configuration", "Single-arm configuration"), "目标机械臂", "Target robot", "Franka Research 3"),
      row(GELLO, l("Franka GELLO 官方产品页", "Official Franka GELLO product page"), l("Open-source resources", "Open-source resources"), "开源范围", "Open-source scope", "机械设计、STL 文件和软件", "Mechanical design, STL files, and software"),
      row(GELLO, l("Franka GELLO 官方产品页", "Official Franka GELLO product page"), l("Delivery options", "Delivery options"), "交付方式", "Delivery options", "自行构建或预装测试版本", "Self-built or tested pre-assembled version"),
      row(GELLO, l("Franka GELLO 官方产品页", "Official Franka GELLO product page"), l("Use cases", "Use cases"), "主要用途", "Primary uses", "示教、模仿学习和数据生成", "Teaching, imitation learning, and data generation"),
    ],
    overview: [l("Franka GELLO 是面向单台 FR3 的遥操作和示教设备，机械与软件资料公开，也有厂商预装版本。", "Franka GELLO is a teleoperation and teaching device for one FR3. Mechanical and software resources are open, and a manufacturer-assembled version is available."), l("公开页面未提供统一的精度、控制频率或整机尺寸表，因此这些数值不从 FR3 或第三方 GELLO 实现推断。", "The public page does not provide a consolidated accuracy, control-rate, or system-dimension table, so those values are not inferred from FR3 or third-party GELLO implementations.")],
    applications: [l("机器人示教、模仿学习、演示数据采集和单臂遥操作", "Robot teaching, imitation learning, demonstration-data collection, and single-arm teleoperation")],
    coverage: "official-partial",
  },
  {
    id: "franka-gello-duo",
    companySlug: "franka-robotics",
    product: "Franka GELLO Duo",
    pageUrl: GELLO,
    category: "model-software",
    primary: "model-software",
    subclass: "teleoperation-data",
    useCases: ["research", "integration"],
    type: l("双臂遥操作与示教数据采集设备", "Bimanual teleoperation and teaching-data device"),
    integration: l("面向 FR3 Duo 的双臂遥操作与同步数据采集，共享 GELLO 开源基础。", "Provides bimanual teleoperation and synchronized data collection for FR3 Duo on the shared GELLO open-source foundation."),
    verification: l("核对两台机械臂版本、左右主从映射、标定、时间同步、碰撞区、数据格式与预装交付清单。", "Verify both arm revisions, left-right leader-follower mapping, calibration, time synchronization, collision zones, data format, and pre-assembled delivery contents."),
    rows: [
      row(GELLO, l("Franka GELLO 官方产品页", "Official Franka GELLO product page"), l("Dual-arm configuration", "Dual-arm configuration"), "目标平台", "Target platform", "Franka FR3 Duo"),
      row(GELLO, l("Franka GELLO 官方产品页", "Official Franka GELLO product page"), l("Dual-arm configuration", "Dual-arm configuration"), "目标机械臂数量", "Target arm count", "2"),
      row(GELLO, l("Franka GELLO 官方产品页", "Official Franka GELLO product page"), l("Open-source resources", "Open-source resources"), "开源范围", "Open-source scope", "机械设计、STL 文件和软件", "Mechanical design, STL files, and software"),
      row(GELLO, l("Franka GELLO 官方产品页", "Official Franka GELLO product page"), l("Use cases", "Use cases"), "主要用途", "Primary uses", "双臂模仿学习、协同遥操作和同步数据采集", "Bimanual imitation learning, coordinated teleoperation, and synchronized data collection"),
    ],
    overview: [l("Franka GELLO Duo 将 GELLO 扩展到 FR3 Duo，用于双臂遥操作和同步示教数据采集。", "Franka GELLO Duo extends GELLO to FR3 Duo for bimanual teleoperation and synchronized teaching-data collection."), l("公开页面未给出独立精度或延迟指标，本记录只列公开的兼容关系与用途。", "The public page does not provide separate accuracy or latency metrics, so this record lists only the published compatibility and use cases.")],
    applications: [l("双臂模仿学习、柔性物体操作、协同装配研究和演示数据生成", "Bimanual imitation learning, deformable-object handling, coordinated-assembly research, and demonstration-data generation")],
    coverage: "official-partial",
  },
];

const standardArmRows = (
  model: "Core" | "Thor",
  sourceUrl: string,
  spec: {
    mass: string;
    payload: string;
    reach: string;
    footprint: string;
    material: string;
    armIp: string;
    controllerIp: string;
    toolCurrent: string;
    boxDimensions: string;
    boxMass: string;
    jointSpeed: string;
    maxTcp: string;
  },
): SpecRow[] => {
  const source = l(`Standard Bots ${model} Hardware Overview`, `Standard Bots ${model} Hardware Overview`);
  const locator = l("Hardware specifications", "Hardware specifications");
  const r = (zh: string, en: string, valueZh: string, valueEn = valueZh, conditions?: Localized) => row(sourceUrl, source, locator, zh, en, valueZh, valueEn, conditions);
  return [
    r("自由度", "Degrees of freedom", "6 DoF"),
    r("本体质量", "Robot mass", spec.mass),
    r("最大负载", "Maximum payload", spec.payload),
    r("最大工作半径", "Maximum reach", spec.reach),
    r("安装占地", "Mounting footprint", spec.footprint),
    r("结构材料", "Structural materials", spec.material),
    r("机械臂防护等级", "Arm ingress protection", spec.armIp),
    r("工作温度", "Operating temperature", "0-55°C"),
    r("最大相对湿度", "Maximum relative humidity", "90% RH", "90% RH", l("非冷凝", "Non-condensing")),
    r("典型声压级", "Typical sound pressure", "<58 dB"),
    r("安装方向", "Mounting orientation", "地面安装", "Floor mounting"),
    r("工具连接器", "Tool connector", "M8，8 针 / 4 针", "M8, 8-pin / 4-pin"),
    r("工具端数字 I/O", "Tool digital I/O", "2 路输入 / 2 路输出", "2 inputs / 2 outputs"),
    r("工具通信", "Tool communications", model === "Core" ? "RS-485、UART，最高 10 Mbps" : "RS-485、UART；M12 以太网直通", model === "Core" ? "RS-485 and UART, up to 10 Mbps" : "RS-485, UART, and M12 Ethernet pass-through"),
    r("工具供电", "Tool power", `12 V / 24 V, ${spec.toolCurrent}`),
    r("控制箱防护等级", "Controller ingress protection", spec.controllerIp),
    r("控制箱数字 I/O", "Controller digital I/O", "16 路输入 / 16 路输出", "16 inputs / 16 outputs"),
    r("控制箱内部 24 V 输出", "Internal 24 V controller output", "3 A"),
    r("控制箱外部 24 V 输出", "External 24 V controller output", "12 A"),
    r("工业通信", "Industrial communications", "Modbus TCP、EtherNet/IP、以太网 API", "Modbus TCP, EtherNet/IP, and Ethernet APIs"),
    r("交流输入", "AC input", "90-264 VAC, 47-63 Hz"),
    r("控制箱尺寸", "Controller dimensions", spec.boxDimensions),
    r("控制箱质量", "Controller mass", spec.boxMass),
    r("重复定位精度", "Repeatability", "±0.025 mm"),
    r("最大关节速度", "Maximum joint speeds", spec.jointSpeed, spec.jointSpeed.replaceAll("；", "; ")),
    r("典型 TCP 速度", "Typical TCP speed", "1 m/s"),
    r("无负载最大 TCP 速度", "Maximum unloaded TCP speed", spec.maxTcp, spec.maxTcp, l("页面明确限定无负载", "Explicitly specified without payload")),
  ];
};

const standardSeeds: ProductSeed[] = [
  {
    id: "standard-bots-spark",
    companySlug: "standard-bots",
    product: "Spark",
    pageUrl: STANDARD_SPARK,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "industrial-arm",
    useCases: ["manufacturing", "integration", "research"],
    type: l("紧凑型六轴协作机械臂", "Compact six-axis collaborative arm"),
    integration: l("通过浏览器软件、M8 工具接口、视觉和 Standard Bots 软件生态接入紧凑工作站。", "Integrates into compact workcells through browser software, an M8 tool interface, vision, and the Standard Bots software ecosystem."),
    verification: l("完整数据表和最终交付版本尚待确认，尤其是同页冲突的 IP65/IP69K、控制箱、I/O、软件和供货时间。", "A complete data sheet and final shipping revision remain to be confirmed, especially the page's conflicting IP65/IP69K statements, controller, I/O, software, and availability."),
    rows: [
      row(STANDARD_SPARK, l("Standard Bots Spark 官方产品页", "Official Standard Bots Spark product page"), l("Product facts", "Product facts"), "最大负载", "Maximum payload", "7 kg"),
      row(STANDARD_SPARK, l("Standard Bots Spark 官方产品页", "Official Standard Bots Spark product page"), l("Product facts", "Product facts"), "最大工作半径", "Maximum reach", "900 mm"),
      row(STANDARD_SPARK, l("Standard Bots Spark 官方产品页", "Official Standard Bots Spark product page"), l("Product facts", "Product facts"), "重复定位精度", "Repeatability", "±0.025 mm"),
      row(STANDARD_SPARK, l("Standard Bots Spark 官方产品页", "Official Standard Bots Spark product page"), l("Product facts", "Product facts"), "安装占地", "Mounting footprint", "小于 200 mm", "Less than 200 mm"),
      row(STANDARD_SPARK, l("Standard Bots Spark 官方产品页", "Official Standard Bots Spark product page"), l("Product facts", "Product facts"), "本体质量", "Robot mass", "21 kg"),
      row(STANDARD_SPARK, l("Standard Bots Spark 官方产品页", "Official Standard Bots Spark product page"), l("Product facts", "Product facts"), "典型声压级", "Typical sound pressure", "<58 dB"),
      row(STANDARD_SPARK, l("Standard Bots Spark 官方产品页", "Official Standard Bots Spark product page"), l("Connector", "Connector"), "工具连接器", "Tool connector", "M8，8 针", "M8, 8-pin"),
      row(STANDARD_SPARK, l("Standard Bots Spark 官方产品页", "Official Standard Bots Spark product page"), l("Comparison table and FAQ", "Comparison table and FAQ"), "机械臂防护等级", "Arm ingress protection", "页面冲突：比较表为 IP65，FAQ 为 IP69K", "Source conflict: IP65 in the comparison table and IP69K in the FAQ"),
      row(STANDARD_SPARK, l("Standard Bots Spark 官方产品页", "Official Standard Bots Spark product page"), l("FAQ", "FAQ"), "控制箱防护等级", "Controller ingress protection", "IP44"),
      row(STANDARD_SPARK, l("Standard Bots Spark 官方产品页", "Official Standard Bots Spark product page"), l("Availability", "Availability"), "计划交付", "Planned availability", "2026 年第二季度", "Q2 2026"),
    ],
    overview: [l("Spark 是 7 kg 负载、900 mm 臂展的紧凑协作机械臂，官网将其定位于较小占地工作站。", "Spark is a compact cobot with 7 kg payload and 900 mm reach, positioned for smaller-footprint workcells."), l("同一官方页面对机械臂防护等级给出 IP65 与 IP69K 两种值；本记录不选择其中之一，交付前必须取得当前数据表。", "The same official page gives both IP65 and IP69K for the arm. This record does not choose between them; a current data sheet is required before delivery.")],
    applications: [l("轻载上下料、装配、检测、包装和紧凑工位自动化", "Light machine tending, assembly, inspection, packaging, and compact-workcell automation")],
    coverage: "official-partial",
  },
  {
    id: "standard-bots-core",
    companySlug: "standard-bots",
    product: "Core",
    pageUrl: STANDARD_CORE,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "industrial-arm",
    useCases: ["manufacturing", "integration", "logistics"],
    type: l("六轴协作机械臂", "Six-axis collaborative arm"),
    integration: l("通过 Core 控制箱、浏览器软件、M8 工具端、Modbus TCP、EtherNet/IP 和以太网 API 接入工作站。", "Integrates through the Core controller, browser software, M8 tool port, Modbus TCP, EtherNet/IP, and Ethernet APIs."),
    verification: l("核对 18 kg 负载的重心曲线、速度条件、工具供电、现场总线、视觉、软件权限和安全回路。", "Verify the center-of-gravity curve for the 18 kg payload, speed conditions, tool power, fieldbus, vision, software permissions, and safety circuits."),
    rows: standardArmRows("Core", STANDARD_CORE_MANUAL, { mass: "32.5 kg", payload: "18 kg", reach: "1300 mm", footprint: "直径 200 mm", material: "铝、钢与塑料", armIp: "IP54", controllerIp: "IP54", toolCurrent: "3 A", boxDimensions: "483 × 385 × 270 mm", boxMass: "18.5 kg", jointSpeed: "J1/J2 287°/s；J3 335°/s；J4/J5/J6 435°/s", maxTcp: "3 m/s" }),
    overview: [l("Core 是 18 kg、1300 mm 六轴协作机械臂。官方硬件手册把本体、控制箱、工具端、电源、通信和速度字段放在同一版本中。", "Core is an 18 kg, 1300 mm six-axis cobot. Its official hardware manual publishes arm, controller, tool-side, power, communications, and speed fields in one revision."), l("3 m/s 是无负载最大 TCP 速度，不能直接用于带 18 kg 负载的节拍估算。", "The 3 m/s figure is the maximum unloaded TCP speed and must not be used directly to estimate cycle time at the 18 kg payload.")],
    applications: [l("上下料、装配、检测、包装、码垛和通用制造自动化", "Machine tending, assembly, inspection, packaging, palletizing, and general manufacturing automation")],
    coverage: "official-complete",
    sourceLinks: [{ label: l("Core 硬件手册", "Core hardware manual"), url: STANDARD_CORE_MANUAL }],
  },
  {
    id: "standard-bots-thor",
    companySlug: "standard-bots",
    product: "Thor",
    pageUrl: STANDARD_THOR,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "industrial-arm",
    useCases: ["manufacturing", "integration", "logistics"],
    type: l("重载六轴协作机械臂", "Heavy-payload six-axis collaborative arm"),
    integration: l("通过 Thor 控制箱、M8 工具端、M12 以太网直通、Modbus TCP、EtherNet/IP 和以太网 API 接入重载工作站。", "Integrates into heavy-duty workcells through the Thor controller, M8 tool port, M12 Ethernet pass-through, Modbus TCP, EtherNet/IP, and Ethernet APIs."),
    verification: l("核对 30 kg 负载重心、2 m 工作空间、地面基础、工具 6 A 供电、速度条件、IP69K 本体与 IP44 控制箱边界。", "Verify the 30 kg payload center of gravity, 2 m workspace, floor foundation, 6 A tool power, speed conditions, and the boundary between the IP69K arm and IP44 controller."),
    rows: standardArmRows("Thor", STANDARD_THOR_MANUAL, { mass: "79 kg", payload: "30 kg", reach: "2000 mm", footprint: "直径 296 mm", material: "铝与橡胶", armIp: "IP69K", controllerIp: "IP44", toolCurrent: "6 A", boxDimensions: "460 × 430 × 315 mm", boxMass: "14.4 kg", jointSpeed: "J1/J2 173°/s；J3 198°/s；J4/J5/J6 277°/s", maxTcp: "4 m/s" }),
    overview: [l("Thor 是 30 kg 负载、2000 mm 臂展的重载六轴协作机械臂，手册公开 IP69K 本体和 IP44 控制箱。", "Thor is a heavy-payload six-axis cobot with 30 kg payload and 2000 mm reach. Its manual publishes an IP69K arm and IP44 controller."), l("4 m/s 为无负载最大 TCP 速度，30 kg 工况应按负载曲线、重心和实际轨迹重新核算。", "The 4 m/s figure is the maximum unloaded TCP speed. A 30 kg duty point requires recalculation from the load curve, center of gravity, and actual trajectory.")],
    applications: [l("重载上下料、码垛、包装、机床与大型工件搬运", "Heavy machine tending, palletizing, packaging, machine tools, and large-workpiece handling")],
    coverage: "official-complete",
    sourceLinks: [{ label: l("Thor 硬件手册", "Thor hardware manual"), url: STANDARD_THOR_MANUAL }],
  },
  {
    id: "standard-bots-bolt",
    companySlug: "standard-bots",
    product: "Bolt",
    pageUrl: STANDARD_BOLT,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "dual-arm-platform",
    useCases: ["research", "manufacturing", "logistics", "integration"],
    type: l("可配置双臂移动机器人平台", "Configurable bimanual mobile robot platform"),
    integration: l("可选择 Spark、Core 或 Thor 双臂，配头部与腕部相机、移动底盘和热插拔电池。", "Can be configured with a pair of Spark, Core, or Thor arms, head and wrist cameras, a mobile base, and hot-swappable batteries."),
    verification: l("核对双臂型号组合、底盘、总负载、相机型号、续航、换电、安全、软件接口和实际交付时间。", "Verify the arm pair, mobile base, total payload, camera models, runtime, battery swapping, safety, software interfaces, and actual delivery timing."),
    rows: [
      row(STANDARD_BOLT, l("Standard Bots Bolt 官方产品页", "Official Standard Bots Bolt product page"), l("Configuration", "Configuration"), "机械臂数量", "Arm count", "2"),
      row(STANDARD_BOLT, l("Standard Bots Bolt 官方产品页", "Official Standard Bots Bolt product page"), l("Configuration", "Configuration"), "可选机械臂", "Selectable arms", "Spark、Core 或 Thor"),
      row(STANDARD_BOLT, l("Standard Bots Bolt 官方产品页", "Official Standard Bots Bolt product page"), l("Vision", "Vision"), "头部相机", "Head cameras", "3"),
      row(STANDARD_BOLT, l("Standard Bots Bolt 官方产品页", "Official Standard Bots Bolt product page"), l("Vision", "Vision"), "腕部相机", "Wrist cameras", "每个腕部 1 台", "1 per wrist"),
      row(STANDARD_BOLT, l("Standard Bots Bolt 官方产品页", "Official Standard Bots Bolt product page"), l("Mobility", "Mobility"), "移动版最大速度", "Maximum mobile-edition speed", "6 mph"),
      row(STANDARD_BOLT, l("Standard Bots Bolt 官方产品页", "Official Standard Bots Bolt product page"), l("Power", "Power"), "电池方式", "Battery system", "热插拔", "Hot-swappable"),
      row(STANDARD_BOLT, l("Standard Bots Bolt 官方产品页", "Official Standard Bots Bolt product page"), l("Tooling", "Tooling"), "末端法兰", "Tool flange", "ISO 标准法兰", "ISO-standard flange"),
      row(STANDARD_BOLT, l("Standard Bots Bolt 官方产品页", "Official Standard Bots Bolt product page"), l("Availability", "Availability"), "计划年份", "Planned year", "2026"),
    ],
    overview: [l("Bolt 是可配置双臂平台，双臂可选择 Spark、Core 或 Thor，并可配移动底盘、相机和热插拔电池。", "Bolt is a configurable bimanual platform whose two arms can be Spark, Core, or Thor, with optional mobility, cameras, and hot-swappable batteries."), l("页面未给出完整整机质量、尺寸、续航和安全规格，因此单臂参数不能直接当作 Bolt 系统参数。", "The page does not provide complete system mass, dimensions, runtime, or safety specifications, so individual-arm figures cannot be treated as Bolt system specifications.")],
    applications: [l("双臂装配、搬运、移动操作、机器人 AI 验证和柔性生产", "Bimanual assembly, handling, mobile manipulation, robotics AI validation, and flexible production")],
    coverage: "official-partial",
  },
];

type ElephantArmSpec = {
  product: string;
  pageUrl: string;
  dof: string;
  reach: string;
  payload: string;
  mass: string;
  repeatability: string;
  power?: string;
  temperature?: string;
  controller: string;
  extra?: Array<[string, string, string, string?]>;
};

const elephantArmRows = (spec: ElephantArmSpec, page: string): SpecRow[] => {
  const source = l("大象机器人产品选型手册 2024 v1", "Elephant Robotics Product Selection Manual 2024 v1");
  const locator = l(`第 ${page} 页 ${spec.product} 产品参数`, `Page ${page}, ${spec.product} product parameters`);
  const r = (zh: string, en: string, valueZh: string, valueEn = valueZh) => row(ELEPHANT_MANUAL, source, locator, zh, en, valueZh, valueEn);
  return [
    r("型号", "Model", spec.product),
    r("自由度", "Degrees of freedom", spec.dof),
    r("最大工作半径", "Maximum reach", spec.reach),
    r("最大负载", "Maximum payload", spec.payload),
    r("本体质量", "Robot mass", spec.mass),
    r("重复定位精度", "Repeatability", spec.repeatability),
    ...(spec.power ? [r("电源", "Power", spec.power)] : []),
    ...(spec.temperature ? [r("工作温度", "Operating temperature", spec.temperature)] : []),
    r("主控", "Controller", spec.controller),
    ...(spec.extra ?? []).map(([zh, en, valueZh, valueEn]) => r(zh, en, valueZh, valueEn ?? valueZh)),
  ];
};

const elephantArmSeed = (
  id: string,
  spec: ElephantArmSpec,
  page: string,
  subtype: string,
  coverage: FinderSpecificationCoverage = "official-complete",
): ProductSeed => ({
  id,
  companySlug: "elephant-robotics",
  product: spec.product,
  pageUrl: spec.pageUrl,
  category: "robot-platform",
  primary: "robot-platform",
  subclass: subtype,
  useCases: ["research", "integration"],
  type: l("桌面机器人与教学开发平台", "Desktop robot and teaching-development platform"),
  integration: l("通过对应主控、Python、ROS/ROS 2、USB 或网络接口及兼容末端附件接入教学和原型系统。", "Integrates into teaching and prototype systems through the specified controller, Python, ROS/ROS 2, USB or network interfaces, and compatible end tools."),
  verification: l("核对机械版本、主控、固件、负载条件、精度定义、接口、附件兼容、供电和连续工况。", "Verify mechanical revision, controller, firmware, payload conditions, accuracy definition, interfaces, accessory compatibility, power, and duty cycle."),
  rows: elephantArmRows(spec, page),
  overview: [
    l(`${spec.product} 的 2024 选型手册区块公开 ${spec.dof}、${spec.reach} 工作半径、${spec.payload} 最大负载、${spec.mass} 本体质量和 ${spec.repeatability} 重复定位精度。`, `The 2024 selection-manual block for ${spec.product} publishes ${spec.dof}, ${spec.reach} reach, ${spec.payload} maximum payload, ${spec.mass} robot mass, and ${spec.repeatability} repeatability.`),
    l("同一机械平台可能采用不同主控；主控名称不代表所有版本具有相同接口、操作系统或软件支持。", "The same mechanical platform may use different controllers; a controller name does not establish identical interfaces, operating system, or software support across editions."),
  ],
  applications: [l("机器人教学、ROS/运动学学习、视觉抓取、轻载操作与应用原型", "Robotics teaching, ROS and kinematics learning, vision-guided picking, light manipulation, and application prototyping")],
  coverage,
  sourceLinks: [{ label: l("2024 官方选型手册", "Official 2024 selection manual"), url: ELEPHANT_MANUAL }],
});

const myCobot280PiRows = (): SpecRow[] => {
  const source = l("myCobot 280 Pi 2023 官方规格页", "Official myCobot 280 Pi 2023 specification page");
  const locator = l("Specifications", "Specifications");
  const r = (zh: string, en: string, valueZh: string, valueEn = valueZh) => row(ELEPHANT_280_PI_SPEC, source, locator, zh, en, valueZh, valueEn);
  return [
    r("自由度", "Degrees of freedom", "6 DoF"), r("最大工作半径", "Maximum reach", "280 mm"), r("最大负载", "Maximum payload", "250 g"), r("本体质量", "Robot mass", "860 g"), r("重复定位精度", "Repeatability", "±0.5 mm"), r("标称寿命", "Rated service life", "500 h"), r("电源输入", "Power input", "12 V DC, 5 A, 60 W"),
    r("USB 3.0", "USB 3.0", "2"), r("USB 2.0", "USB 2.0", "2"), r("主控类型", "Main controller", "Raspberry Pi"), r("主控 CPU", "Main-controller CPU", "Broadcom BCM2711，64 位 1.5 GHz 四核", "Broadcom BCM2711, 64-bit 1.5 GHz quad-core"), r("主控 GPU", "Main-controller GPU", "500 MHz VideoCore VI"), r("主控内存", "Main-controller memory", "2 GB"),
    r("以太网口", "Ethernet ports", "1"), r("蓝牙", "Bluetooth", "2.4G/5G 双模", "2.4G/5G dual-mode"), r("无线网络", "Wi-Fi", "802.11ac"), r("视频接口", "Video interfaces", "2×microHDMI"), r("音频接口", "Audio interface", "1×3.5 mm"),
    r("主控输入引脚", "Main-controller input pins", "2,3,4,5,6,7,9,11,12,13,16,17,18,19,20,21,22,23,24,25,26,27"), r("主控输出", "Main-controller outputs", "与输入引脚复用", "Shared with input pins"),
    r("辅助控制器", "Auxiliary controller", "ESP32 ×1"), r("辅助控制核心", "Auxiliary-control core", "240 MHz 双核，600 DMIPS，520 KB SRAM，Wi-Fi 与双模蓝牙", "240 MHz dual-core, 600 DMIPS, 520 KB SRAM, Wi-Fi, and dual-mode Bluetooth"), r("辅助控制 Flash", "Auxiliary-control flash", "4 MB"), r("辅助控制 I/O", "Auxiliary-control I/O", "G19、G21、G22、G23、G25、G33"),
    r("固定孔位", "Mounting interfaces", "LEGO + 螺丝", "LEGO and screws"), r("自由移动", "Free-move mode", "支持", "Supported"), r("关节运动", "Joint motion", "支持", "Supported"), r("笛卡尔运动", "Cartesian motion", "支持", "Supported"), r("轨迹记录", "Trajectory recording", "支持", "Supported"), r("无线控制", "Wireless control", "支持", "Supported"),
    r("桌面系统", "Desktop operating systems", "Windows、Linux、macOS"), r("ROS", "ROS", "ROS 1、ROS 2"), r("Python", "Python", "支持", "Supported"), r("图形化开发", "Graphical development", "myBlockly、Mind+"), r("设备管理", "Device management", "myStudio"), r("控制协议", "Control protocols", "串口、TCP/IP、Modbus", "Serial, TCP/IP, and Modbus"),
    r("关节运动范围", "Joint ranges", "J1-J5：-165° 至 +165°；J6：-179° 至 +179°", "J1-J5: -165° to +165°; J6: -179° to +179°"), r("编码器", "Encoder", "12 bit 磁编码器", "12-bit magnetic encoder"), r("掉电位置保持", "Power-off position retention", "支持", "Supported"), r("外壳", "Housing", "金属", "Metal"), r("齿轮", "Gearing", "钢", "Steel"),
  ];
};

const base280Spec = (product: string, pageUrl: string, controller: string): ElephantArmSpec => ({
  product, pageUrl, dof: "6 DoF", reach: "280 mm", payload: "250 g", mass: "860 g", repeatability: "±0.5 mm", power: "12 V, 5 A", temperature: "-5-45°C", controller,
});

const base320Spec = (product: string, pageUrl: string, controller: string): ElephantArmSpec => ({
  product, pageUrl, dof: "6 DoF", reach: "350 mm", payload: "1 kg", mass: "3 kg", repeatability: "±0.5 mm", power: "24 V, 9.2 A", temperature: "0-50°C", controller,
});

const elephantSeeds: ProductSeed[] = [
  elephantArmSeed("elephant-mypalletizer-260-pi", {
    product: "myPalletizer 260 Pi", pageUrl: ELEPHANT_PALLETIZER_PI, dof: "4 DoF", reach: "260 mm", payload: "250 g", mass: "960 g", repeatability: "±0.5 mm", power: "8-12 V, 5 A", controller: "Raspberry Pi", extra: [["本体材料", "Robot material", "光敏树脂 SLA", "SLA photopolymer"], ["电机", "Motors", "4 颗高性能伺服电机", "4 high-performance servo motors"], ["最大关节速度", "Maximum joint speed", "120°/s"]],
  }, "6", "palletizing-arm"),
  elephantArmSeed("elephant-mypalletizer-260-m5", {
    product: "myPalletizer 260 M5", pageUrl: ELEPHANT_PALLETIZER_M5, dof: "4 DoF", reach: "260 mm", payload: "250 g", mass: "960 g", repeatability: "±0.5 mm", power: "8-12 V, 5 A", controller: "M5 (ESP32)", extra: [["本体材料", "Robot material", "光敏树脂 SLA", "SLA photopolymer"], ["电机", "Motors", "4 颗高性能伺服电机", "4 high-performance servo motors"], ["最大关节速度", "Maximum joint speed", "120°/s"]],
  }, "6", "palletizing-arm"),
  elephantArmSeed("elephant-ultraarm-p340", {
    product: "ultraArm P340", pageUrl: ELEPHANT_ULTRAARM, dof: "3/4 DoF", reach: "340 mm", payload: "650 g", mass: "2.9 kg", repeatability: "±0.1 mm", power: "输入 AC 100-240 V, 50-60 Hz；输出 12 V, 5 A, 60 W", controller: "Mega2560", extra: [["材料", "Materials", "铝合金、光敏树脂 SLA", "Aluminium alloy and SLA photopolymer"], ["辅助输出", "Auxiliary power outputs", "12 V、8.4 V、5 V"], ["电机类型", "Motor type", "高精度步进电机", "High-precision stepper motors"], ["最大 TCP 速度", "Maximum TCP speed", "100 mm/s"], ["通信", "Communications", "RS-485、USB 串口", "RS-485 and USB serial"]],
  }, "8", "palletizing-arm"),
  elephantArmSeed("elephant-mecharm-270-pi", {
    product: "mechArm 270 Pi", pageUrl: ELEPHANT_MECHARM_PI, dof: "6 DoF", reach: "270 mm", payload: "250 g", mass: "1 kg", repeatability: "±0.5 mm", power: "8-12 V, 5 A", controller: "Raspberry Pi", extra: [["电机", "Motors", "6 颗高精度磁编码器电机", "6 high-precision magnetic-encoder motors"], ["最大关节速度", "Maximum joint speed", "120°/s"]],
  }, "8", "desktop-arm"),
  elephantArmSeed("elephant-mecharm-270-m5", {
    product: "mechArm 270 M5", pageUrl: ELEPHANT_MECHARM_M5, dof: "6 DoF", reach: "270 mm", payload: "250 g", mass: "1 kg", repeatability: "±0.5 mm", power: "8-12 V, 5 A", controller: "M5 (ESP32)", extra: [["电机", "Motors", "6 颗高精度磁编码器电机", "6 high-precision magnetic-encoder motors"], ["最大关节速度", "Maximum joint speed", "120°/s"]],
  }, "8", "desktop-arm"),
  {
    ...elephantArmSeed("elephant-mycobot-280-pi", base280Spec("myCobot 280 Pi", ELEPHANT_280_PI, "Raspberry Pi"), "9", "desktop-arm", "official-complete"),
    rows: myCobot280PiRows(),
    overview: [l("myCobot 280 Pi 2023 官方规格页公开从机械参数、主控与辅助控制器到接口、软件、关节范围和材料的完整规格区块。", "The official myCobot 280 Pi 2023 specification page publishes a full block spanning mechanics, main and auxiliary controllers, interfaces, software, joint ranges, and materials."), l("页面中的 500 小时为厂商标称寿命字段，不应直接解释为保修期或连续工业运行寿命。", "The page's 500-hour value is a manufacturer-rated service-life field and should not be interpreted directly as warranty duration or continuous industrial lifetime.")],
    sourceLinks: [{ label: l("myCobot 280 Pi 2023 规格页", "myCobot 280 Pi 2023 specification page"), url: ELEPHANT_280_PI_SPEC }, { label: l("产品介绍", "Product page"), url: ELEPHANT_280_PI }],
  },
  elephantArmSeed("elephant-mycobot-280-m5", base280Spec("myCobot 280 M5", ELEPHANT_280_M5, "M5 (ESP32)"), "9", "desktop-arm", "official-partial"),
  elephantArmSeed("elephant-mycobot-280-jetson", base280Spec("myCobot 280 Jetson Nano", ELEPHANT_280_JETSON, "Jetson Nano 2 GB"), "9", "desktop-arm", "official-partial"),
  elephantArmSeed("elephant-mycobot-280-arduino", base280Spec("myCobot 280 Arduino", ELEPHANT_280_ARDUINO, "Arduino UNO / MEGA / MKR expansion"), "9", "desktop-arm", "official-partial"),
  elephantArmSeed("elephant-mycobot-320-pi", base320Spec("myCobot 320 Pi", ELEPHANT_320_PI, "Raspberry Pi"), "10", "desktop-arm", "official-partial"),
  elephantArmSeed("elephant-mycobot-320-m5", base320Spec("myCobot 320 M5", ELEPHANT_320_M5, "M5 (ESP32)"), "10", "desktop-arm", "official-partial"),
  elephantArmSeed("elephant-mycobot-pro600", {
    product: "myCobot Pro 600", pageUrl: ELEPHANT_PRO600, dof: "6 DoF", reach: "600 mm", payload: "2 kg", mass: "8.8 kg", repeatability: "±0.5 mm", power: "AC 100-240 V, 50/60 Hz", temperature: "0-50°C", controller: "RoboFlow", extra: [["防护等级", "Ingress protection", "IP42"], ["材料", "Materials", "铝合金、塑料、橡胶", "Aluminium alloy, plastic, and rubber"], ["开发接口", "Development interfaces", "Python、C++、Arduino、C#、JavaScript、ROS", "Python, C++, Arduino, C#, JavaScript, and ROS"]],
  }, "12", "industrial-arm"),
  elephantArmSeed("elephant-myarm-300-pi", {
    product: "myArm 300 Pi", pageUrl: ELEPHANT_MYARM300, dof: "7 DoF", reach: "300 mm", payload: "200 g", mass: "1.5 kg", repeatability: "±0.5 mm", power: "12 V DC, 5 A", controller: "Raspberry Pi 4B", extra: [["标称寿命", "Rated service life", "500 h"], ["通信", "Communications", "Ethernet、WLAN"], ["系统", "Operating system", "Ubuntu Mate 20.04"], ["开发", "Development", "图形化编程、Python、ROS", "Graphical programming, Python, and ROS"]],
  }, "12", "research-arm"),
  {
    id: "elephant-myarm-m750",
    companySlug: "elephant-robotics",
    product: "myArm M750",
    pageUrl: ELEPHANT_M750,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "research-arm",
    useCases: ["research", "integration"],
    type: l("主端示教与运动数据采集机械臂", "Leader-arm teaching and motion-data-collection device"),
    integration: l("通过 Python、ROS、Type-C 与可选控制器用于机械臂示教、运动控制验证和端到端数据采集。", "Uses Python, ROS, Type-C, and optional controllers for arm teaching, motion-control validation, and end-to-end data collection."),
    verification: l("官方不同页面的质量与供电值存在版本差异；采购时需锁定 M750 修订、控制器、额定/峰值负载、标定和供电。", "Official pages contain revision differences for mass and power; procurement must lock the M750 revision, controller, nominal and peak payload, calibration, and power supply."),
    rows: (() => {
      const source = l("myArm M750 官方 GitBook 产品参数", "Official myArm M750 GitBook product parameters");
      const locator = l("Machine Parameters", "Machine Parameters");
      const r = (zh: string, en: string, valueZh: string, valueEn = valueZh) => row(ELEPHANT_M750_DOC, source, locator, zh, en, valueZh, valueEn);
      return [
        r("自由度", "Degrees of freedom", "6+1 DoF"), r("水平工作半径", "Horizontal reach", "750 mm"), r("总展开跨度", "Total span", "1500 mm"), r("GitBook 版本本体质量", "Robot mass in GitBook revision", "3.2 kg"), r("电源规格", "Power specification", "24 V, 5 A"), r("重复定位精度", "Repeatability", "±1 mm"), r("绝对精度", "Absolute accuracy", "5-8 mm"), r("额定负载", "Rated payload", "500 g"), r("峰值负载", "Peak payload", "1 kg"), r("舵机数量", "Servo count", "8"), r("舵机类型", "Servo type", "工业级高精度数字舵机", "Industrial-grade high-precision digital servo"), r("最大关节转角", "Maximum joint rotation", "±180°"),
        row(ELEPHANT_M750, l("myArm M750 当前官方产品页", "Current official myArm M750 product page"), l("Specification table", "Specification table"), "官方页面版本差异", "Official-page revision differences", "质量页面版本出现 3.2/3.6/4.5 kg，供电出现 24 V 5 A 与 24 V 9.2 A", "Official pages list 3.2/3.6/4.5 kg mass and 24 V 5 A or 24 V 9.2 A power across revisions"),
        row(ELEPHANT_M750, l("myArm M750 当前官方产品页", "Current official myArm M750 product page"), l("Programming & Development", "Programming & Development"), "开发环境", "Development environments", "Python、ROS"),
        row(ELEPHANT_M750, l("myArm M750 当前官方产品页", "Current official myArm M750 product page"), l("Specification table", "Specification table"), "USB 接口", "USB interface", "Type-C"),
      ];
    })(),
    overview: [l("myArm M750 是用于运动控制验证、示教和数据采集的 6+1 自由度主端机械臂，官方 GitBook 给出 750 mm 半径、500 g 额定负载和 1 kg 峰值负载。", "myArm M750 is a 6+1 DoF leader arm for motion-control validation, teaching, and data collection. Its official GitBook lists 750 mm reach, 500 g nominal payload, and 1 kg peak payload."), l("官方不同页面列出不同质量和供电值，本仓保留差异而不合并成单一规格；下单前必须确认硬件修订和所配控制器。", "Official pages list different mass and power values. The repository preserves those differences rather than merging them into one specification; the hardware revision and bundled controller must be confirmed before ordering.")],
    applications: [l("运动示教、模仿学习、遥操作、机器人数据采集和控制算法验证", "Motion teaching, imitation learning, teleoperation, robot-data collection, and control-algorithm validation")],
    coverage: "official-partial",
    sourceLinks: [{ label: l("myArm M750 参数文档", "myArm M750 parameter documentation"), url: ELEPHANT_M750_DOC }],
  },
  {
    id: "elephant-mybuddy-280-pi",
    companySlug: "elephant-robotics",
    product: "myBuddy 280 Pi",
    pageUrl: ELEPHANT_MYBUDDY,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "dual-arm-platform",
    useCases: ["research", "integration", "service"],
    type: l("桌面双臂协作研究平台", "Desktop bimanual collaborative research platform"),
    integration: l("通过 Raspberry Pi 4B、ROS、VR、Grove、USB、RJ45、3.3 V I/O 与 HDMI 接入双臂教学和视觉应用。", "Integrates into bimanual teaching and vision applications through Raspberry Pi 4B, ROS, VR, Grove, USB, RJ45, 3.3 V I/O, and HDMI."),
    verification: l("核对单臂负载、双臂工作空间、总质量版本、相机、显示屏、同步控制、供电和附件。", "Verify per-arm payload, bimanual workspace, system-mass revision, camera, display, synchronized control, power, and accessories."),
    rows: (() => {
      const source = l("大象机器人产品选型手册 2024 v1", "Elephant Robotics Product Selection Manual 2024 v1");
      const locator = l("第 18 页 myBuddy 280 产品参数", "Page 18, myBuddy 280 product parameters");
      const r = (zh: string, en: string, valueZh: string, valueEn = valueZh) => row(ELEPHANT_MANUAL, source, locator, zh, en, valueZh, valueEn);
      return [r("自由度", "Degrees of freedom", "13 DoF"), r("CPU", "CPU", "Broadcom BCM2711，64 位 1.5 GHz 四核", "Broadcom BCM2711, 64-bit 1.5 GHz quad-core"), r("运行内存", "RAM", "4 GB"), r("扩展存储", "Storage", "32 GB"), r("单臂工作半径", "Reach per arm", "280 mm"), r("单臂负载", "Payload per arm", "250 g"), r("活动空间", "Activity space", "280 mm"), r("重复定位精度", "Repeatability", "±0.5 mm"), r("本体质量", "Robot mass", "3 kg"), r("电源", "Power", "24 V, 9.2 A"), r("工作温度", "Operating temperature", "0-45°C"), r("接口", "Interfaces", "Grove、USB、RJ45、3.3 V I/O、HDMI"), r("高性能舵机", "High-performance servos", "13"), r("交互显示屏", "Interactive display", "5.7 英寸", "5.7 inches")];
    })(),
    overview: [l("myBuddy 280 Pi 是 13 自由度桌面双臂平台，手册公开每臂 280 mm 工作半径、250 g 负载及 Raspberry Pi 4B 计算配置。", "myBuddy 280 Pi is a 13-DoF desktop bimanual platform. The manual publishes 280 mm reach and 250 g payload per arm plus Raspberry Pi 4B compute."), l("双臂协同负载与碰撞空间不能由单臂额定值简单相加，需要按安装、末端和动作验证。", "Bimanual coordinated payload and collision space cannot be obtained by adding single-arm ratings; they require validation against mounting, tools, and motion.")],
    applications: [l("双臂教学、视觉研究、VR 遥操作、协同抓取和机器人课程", "Bimanual teaching, vision research, VR teleoperation, coordinated grasping, and robotics curricula")],
    coverage: "official-complete",
    sourceLinks: [{ label: l("2024 官方选型手册", "Official 2024 selection manual"), url: ELEPHANT_MANUAL }],
  },
  {
    id: "elephant-myagv-2023",
    companySlug: "elephant-robotics",
    product: "myAGV 2023",
    pageUrl: ELEPHANT_MYAGV,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "mobile-base",
    useCases: ["research", "logistics", "integration"],
    type: l("麦克纳姆轮移动机器人底盘", "Mecanum-wheel mobile robot base"),
    integration: l("可选 Raspberry Pi 4B 或 Jetson Nano B01 4 GB 主控，结合激光雷达、相机、ROS 导航与机械臂形成复合机器人。", "Offers Raspberry Pi 4B or Jetson Nano B01 4 GB control and combines lidar, camera, ROS navigation, and a robot arm into a compound robot."),
    verification: l("核对主控版本、地图与导航栈、底盘负载、速度、续航工况、雷达和相机型号、机械臂适配与急停。", "Verify controller edition, mapping and navigation stack, base payload, speed, runtime conditions, lidar and camera models, arm compatibility, and emergency stop."),
    rows: (() => {
      const source = l("大象机器人产品选型手册 2024 v1", "Elephant Robotics Product Selection Manual 2024 v1");
      const locator = l("第 20 页 myAGV 产品参数", "Page 20, myAGV product parameters");
      const r = (zh: string, en: string, valueZh: string, valueEn = valueZh, conditions?: Localized) => row(ELEPHANT_MANUAL, source, locator, zh, en, valueZh, valueEn, conditions);
      return [r("主控版本", "Controller editions", "Raspberry Pi 4B；Jetson Nano B01 4 GB", "Raspberry Pi 4B; Jetson Nano B01 4 GB"), r("电机", "Motors", "行星无刷直流电机", "Planetary brushless DC motors"), r("车轮", "Wheels", "麦克纳姆轮", "Mecanum wheels"), r("底盘负载", "Base payload", "5 kg"), r("本体质量", "Robot mass", "4.16 kg"), r("激光雷达量程", "Lidar range", "0.12-8 m"), r("激光雷达扫描角", "Lidar scan angle", "360°"), r("内置相机", "Integrated camera", "500 万像素，65° 视角", "5 MP, 65° field of view"), r("待机时长", "Standby time", "328 min"), r("运行时长", "Operating time", "181 min", "181 min", l("手册未给出完整负载与速度工况", "The manual does not state complete payload and speed conditions")), r("最大移动速度", "Maximum travel speed", "0.9 m/s"), r("电源", "Power", "12.6 V, 2 A"), r("工作温度", "Operating temperature", "-5-45°C")];
    })(),
    overview: [l("myAGV 2023 是 5 kg 负载的麦克纳姆轮移动底盘，提供 Raspberry Pi 4B 与 Jetson Nano B01 4 GB 版本。", "myAGV 2023 is a 5 kg-payload mecanum-wheel mobile base with Raspberry Pi 4B and Jetson Nano B01 4 GB editions."), l("181 分钟续航缺少完整负载、速度和计算工况，不应直接当作所有复合机器人配置的保证值。", "The 181-minute runtime lacks complete payload, speed, and compute conditions and should not be treated as a guarantee for every compound-robot configuration.")],
    applications: [l("ROS 导航、SLAM、移动抓取、复合机器人教学和轻载物流原型", "ROS navigation, SLAM, mobile picking, compound-robot teaching, and light logistics prototypes")],
    coverage: "official-complete",
    sourceLinks: [{ label: l("2024 官方选型手册", "Official 2024 selection manual"), url: ELEPHANT_MANUAL }],
  },
  {
    id: "elephant-mercury-a1",
    companySlug: "elephant-robotics",
    product: "Mercury A1",
    pageUrl: ELEPHANT_MERCURY,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "research-arm",
    useCases: ["research", "integration"],
    type: l("七轴具身智能研究机械臂", "Seven-axis embodied-research arm"),
    integration: l("通过 Cortex-A72 主控、myPanel、Python/C++、ROS 2、MoveIt、Gazebo、Wi-Fi、CAN、USB 和串口接入研究系统。", "Integrates into research systems through Cortex-A72 compute, myPanel, Python/C++, ROS 2, MoveIt, Gazebo, Wi-Fi, CAN, USB, and serial."),
    verification: l("核对硬件版本、谐波关节、制动器、负载重心、I/O、电源、控制频率、安全边界与附件。", "Verify hardware revision, harmonic joints, brakes, payload center of gravity, I/O, power, control rate, safety boundaries, and accessories."),
    rows: (() => {
      const source = l("大象机器人产品选型手册 2024 v1", "Elephant Robotics Product Selection Manual 2024 v1");
      const locator = l("第 20 页 Mercury A1 产品参数", "Page 20, Mercury A1 product parameters");
      const r = (zh: string, en: string, valueZh: string, valueEn = valueZh) => row(ELEPHANT_MANUAL, source, locator, zh, en, valueZh, valueEn);
      return [r("产品尺寸", "Product dimensions", "98 × 128 × 640 mm"), r("工作电压", "Operating voltage", "24 V"), r("自由度", "Degrees of freedom", "7 DoF"), r("最大工作半径", "Maximum reach", "450 mm"), r("最大负载", "Maximum payload", "1 kg"), r("本体质量", "Robot mass", "3.5 kg"), r("重复定位精度", "Repeatability", "±0.05 mm"), r("材料", "Materials", "碳纤维、铝合金、工程塑料", "Carbon fiber, aluminium alloy, and engineering plastic"), r("减速机构", "Reduction mechanism", "谐波减速器", "Harmonic reducer"), r("关节制动", "Joint brake", "电磁摩擦片式", "Electromagnetic friction-disc brake"), r("CPU", "CPU", "四核 ARM Cortex-A72 ARMv8 64-bit SoC @ 1.5 GHz", "Quad-core ARM Cortex-A72 ARMv8 64-bit SoC at 1.5 GHz"), r("I/O", "I/O", "24 V，6 路输入 / 6 路输出", "24 V, 6 inputs / 6 outputs"), r("通信", "Communications", "Wi-Fi、CAN、蓝牙、USB、串口", "Wi-Fi, CAN, Bluetooth, USB, and serial")];
    })(),
    overview: [l("Mercury A1 是 7 自由度、1 kg 负载、450 mm 工作半径的桌面具身研究机械臂，使用谐波减速器和关节制动。", "Mercury A1 is a 7-DoF, 1 kg-payload, 450 mm-reach desktop embodied-research arm using harmonic reducers and joint brakes."), l("公开参数适合教学与研究初筛；控制频率、负载曲线、工业安全认证和连续工况仍需按当前手册确认。", "Published parameters support education and research screening; control rate, payload curve, industrial safety certification, and duty cycle still require confirmation from the current manual.")],
    applications: [l("具身智能、力控与运动研究、视觉抓取、机器人教学和轻载操作", "Embodied intelligence, force and motion research, vision-guided picking, robotics teaching, and light manipulation")],
    coverage: "official-complete",
    sourceLinks: [{ label: l("Mercury 系列官方页面", "Official Mercury series page"), url: ELEPHANT_MERCURY }, { label: l("2024 官方选型手册", "Official 2024 selection manual"), url: ELEPHANT_MANUAL }],
  },
  {
    id: "elephant-mercury-b1",
    companySlug: "elephant-robotics",
    product: "Mercury B1",
    pageUrl: ELEPHANT_MERCURY,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "dual-arm-platform",
    useCases: ["research", "integration", "service"],
    type: l("双臂半人形具身研究平台", "Dual-arm semi-humanoid embodied-research platform"),
    integration: l("组合双七轴机械臂、Jetson Xavier、3D 相机、麦克风、触摸屏、CAN/以太网与 ROS/MoveIt/Gazebo。", "Combines dual seven-axis arms, Jetson Xavier, a 3D camera, microphone array, touchscreen, CAN/Ethernet, and ROS/MoveIt/Gazebo."),
    verification: l("核对计算模块当前版本、双臂同步、相机、麦克风、总负载、I/O、VR、制动和安全边界。", "Verify the current compute module, bimanual synchronization, camera, microphones, total payload, I/O, VR, braking, and safety boundaries."),
    rows: (() => {
      const source = l("大象机器人产品选型手册 2024 v1", "Elephant Robotics Product Selection Manual 2024 v1");
      const locator = l("第 22 页 Mercury B1 产品参数", "Page 22, Mercury B1 product parameters");
      const r = (zh: string, en: string, valueZh: string, valueEn = valueZh) => row(ELEPHANT_MANUAL, source, locator, zh, en, valueZh, valueEn);
      return [r("产品尺寸", "Product dimensions", "200 × 192.5 × 537 mm"), r("工作电压", "Operating voltage", "24 V"), r("自由度", "Degrees of freedom", "17 DoF"), r("单臂最大工作半径", "Maximum reach per arm", "450 mm"), r("最大负载", "Maximum payload", "1 kg"), r("本体质量", "Robot mass", "8 kg"), r("重复定位精度", "Repeatability", "±0.05 mm"), r("减速机构", "Reduction mechanism", "谐波减速器", "Harmonic reducer"), r("关节制动", "Joint brake", "电磁摩擦片式", "Electromagnetic friction-disc brake"), r("CPU", "CPU", "6 核 ARMv8.2 64-bit"), r("GPU", "GPU", "384 核 Volta 架构", "384-core Volta architecture"), r("AI 算力", "AI performance", "21 TOPS"), r("显示屏", "Display", "9 英寸触摸屏", "9-inch touchscreen"), r("材料", "Materials", "碳纤维、铝合金、工程塑料", "Carbon fiber, aluminium alloy, and engineering plastic"), r("3D 相机", "3D camera", "Orbbec Deeyea"), r("麦克风阵列", "Microphone array", "线性 4 麦，5 m、180° 拾音", "Linear four-microphone array, 5 m and 180° pickup"), r("I/O", "I/O", "24 V，6 路输入 / 6 路输出", "24 V, 6 inputs / 6 outputs"), r("通信", "Communications", "CAN、Wi-Fi、以太网、蓝牙、USB、串口", "CAN, Wi-Fi, Ethernet, Bluetooth, USB, and serial")];
    })(),
    overview: [l("Mercury B1 是 17 自由度双臂半人形研究平台，2024 手册列出 21 TOPS 计算、3D 相机、线性四麦阵列和双臂参数。", "Mercury B1 is a 17-DoF dual-arm semi-humanoid research platform. The 2024 manual lists 21 TOPS compute, a 3D camera, a linear four-microphone array, and bimanual arm figures."), l("当前 Mercury 官网已提到更新的 Jetson Orin Nano SUPER 8 GB 配置，2024 手册仍为 Xavier/21 TOPS；本记录不把新计算值回填到旧硬件版本。", "The current Mercury page mentions a newer Jetson Orin Nano SUPER 8 GB configuration, while the 2024 manual lists Xavier/21 TOPS. This record does not backfill new compute figures into the older hardware revision.")],
    applications: [l("双臂协同、视觉与语音交互、VR 遥操作、具身智能研究和教学", "Bimanual coordination, vision and speech interaction, VR teleoperation, embodied-intelligence research, and teaching")],
    coverage: "official-complete",
    sourceLinks: [{ label: l("Mercury 系列官方页面", "Official Mercury series page"), url: ELEPHANT_MERCURY }, { label: l("2024 官方选型手册", "Official 2024 selection manual"), url: ELEPHANT_MANUAL }],
  },
  {
    id: "elephant-mercury-x1",
    companySlug: "elephant-robotics",
    product: "Mercury X1",
    pageUrl: ELEPHANT_MERCURY,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "mobile-manipulator",
    useCases: ["research", "integration", "service", "logistics"],
    type: l("轮式双臂人形具身研究平台", "Wheeled dual-arm humanoid embodied-research platform"),
    integration: l("组合双臂、直驱移动底盘、上位与底盘计算、激光/超声/视觉传感器、3D 相机、麦克风与 ROS 生态。", "Combines dual arms, a direct-drive mobile base, upper and base compute, lidar/ultrasonic/vision sensors, a 3D camera, microphones, and the ROS ecosystem."),
    verification: l("核对计算与传感器版本、续航工况、底盘负载、双臂负载、SLAM、安全制动、I/O、VR 与交付配置。", "Verify compute and sensor revisions, runtime conditions, base payload, bimanual payload, SLAM, safe braking, I/O, VR, and delivered configuration."),
    rows: (() => {
      const source = l("大象机器人产品选型手册 2024 v1", "Elephant Robotics Product Selection Manual 2024 v1");
      const locator = l("第 22 页 Mercury X1 产品参数", "Page 22, Mercury X1 product parameters");
      const r = (zh: string, en: string, valueZh: string, valueEn = valueZh, conditions?: Localized) => row(ELEPHANT_MANUAL, source, locator, zh, en, valueZh, valueEn, conditions);
      return [r("整机高度", "System height", "1.2 m"), r("工作电压", "Operating voltage", "24 V"), r("自由度", "Degrees of freedom", "19 DoF"), r("最大续航", "Maximum runtime", "8 h", "8 h", l("厂商手册未列出完整负载与计算工况", "The manual does not state complete payload and compute conditions")), r("单臂最大负载", "Maximum payload per arm", "1 kg"), r("整机质量", "System mass", "20 kg"), r("机械臂重复定位精度", "Arm repeatability", "±0.05 mm"), r("底盘驱动", "Base drive", "高性能直驱电机", "High-performance direct-drive motors"), r("最大移动速度", "Maximum travel speed", "1.2 m/s"), r("最大爬坡角度", "Maximum slope", "15°"), r("储物空间", "Storage volume", "15 L"), r("上位主控", "Upper compute", "6 核 ARMv8.2 64-bit CPU，384 核 Volta GPU", "6-core ARMv8.2 64-bit CPU and 384-core Volta GPU"), r("上位主控 AI 算力", "Upper-compute AI performance", "21 TOPS"), r("底盘 CPU", "Base CPU", "4 核 ARM Cortex-A57", "Quad-core ARM Cortex-A57"), r("底盘 GPU", "Base GPU", "128 NVIDIA CUDA cores"), r("显示屏", "Display", "9 英寸触摸屏", "9-inch touchscreen"), r("底盘传感器", "Base sensors", "激光雷达、超声波雷达、2D 视觉", "Lidar, ultrasonic radar, and 2D vision"), r("3D 相机", "3D camera", "Orbbec Deeyea"), r("麦克风阵列", "Microphone array", "线性 4 麦，5 m、180° 拾音", "Linear four-microphone array, 5 m and 180° pickup"), r("I/O", "I/O", "24 V，6 路输入 / 6 路输出", "24 V, 6 inputs / 6 outputs")];
    })(),
    overview: [l("Mercury X1 是 19 自由度轮式双臂平台，2024 手册公开 1.2 m 高度、20 kg 质量、1.2 m/s 最大速度与双层计算配置。", "Mercury X1 is a 19-DoF wheeled bimanual platform. The 2024 manual publishes 1.2 m height, 20 kg mass, 1.2 m/s maximum speed, and two-layer compute."), l("8 小时为厂商手册中的最大续航，缺少完整负载、速度、计算与传感器工况，不应用作项目保证值。", "Eight hours is a manufacturer-stated maximum runtime without complete payload, speed, compute, and sensing conditions and should not be used as a project guarantee.")],
    applications: [l("轮式双臂移动操作、SLAM、视觉抓取、VR 遥操作、具身智能和服务研究", "Wheeled bimanual mobile manipulation, SLAM, vision-guided picking, VR teleoperation, embodied intelligence, and service research")],
    coverage: "official-complete",
    sourceLinks: [{ label: l("Mercury 系列官方页面", "Official Mercury series page"), url: ELEPHANT_MERCURY }, { label: l("2024 官方选型手册", "Official 2024 selection manual"), url: ELEPHANT_MANUAL }],
  },
];

const productSeeds: ProductSeed[] = [
  tm3sSeed,
  ...techmanSeeds,
  ...frankaSeeds,
  ...standardSeeds,
  ...elephantSeeds,
];

export const getVerifiedWaveElevenProductRecords = (
  locale: Locale,
  companies: CompanyProfile[],
): FinderExpansionRecord[] => {
  const companyBySlug = new Map(companies.map((company) => [company.slug, company]));
  return productSeeds.map((seed) => {
    const company = companyBySlug.get(seed.companySlug);
    if (!company) throw new Error(`Wave-eleven product company is missing: ${seed.companySlug}`);
    return toRecord(locale, company, seed);
  });
};

export const waveElevenCatalogProductCount = productSeeds.length;
