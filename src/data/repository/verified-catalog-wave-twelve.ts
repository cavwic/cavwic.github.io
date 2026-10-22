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
type CompanySlug = typeof waveTwelveCompanySlugs[number];

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
  level?: "model" | "family" | "platform";
  specificationKind?: "parameters" | "capabilities";
  sourceLinks?: Array<{ label: Localized; url: string }>;
};

type TimelineSeed = {
  date: string;
  title: Localized;
  detail: Localized;
  sourceUrl: string;
  kind: "founding" | "product" | "funding";
};

type FundingSeed = {
  date: string;
  round: Localized;
  amount: string | Localized;
  investors: Localized;
  sourceUrl: string;
};

const l = (zh: string, en: string): Localized => ({ zh, en });
const t = (locale: Locale, value: Localized) => value[locale];

const AGILITY_HOME = "https://www.agilityrobotics.com/";
const AGILITY_COMPANY = "https://www.agilityrobotics.com/company";
const AGILITY_SOLUTIONS = "https://www.agilityrobotics.com/solutions";
const AGILITY_2020_FUNDING = "https://www.agilityrobotics.com/content/agility-robotics-raises-20-million";
const AGILITY_2022_FUNDING = "https://www.agilityrobotics.com/content/agility-robotics-raises-150m-series-b-led-by-dcvc-and-playground-global";
const AGILITY_PUBLIC = "https://www.agilityrobotics.com/content/agility-robotics-to-go-public-through-merger-with-churchill-capital-corp-xi";

const FIGURE_HOME = "https://www.figure.ai/";
const FIGURE_COMPANY = "https://www.figure.ai/company";
const FIGURE_PRODUCT = "https://www.figure.ai/figure";
const FIGURE_03 = "https://www.figure.ai/news/introducing-figure-03";
const FIGURE_BATTERY = "https://www.figure.ai/news/f-03-battery-development";
const FIGURE_HELIX = "https://www.figure.ai/news/helix-02";
const FIGURE_INDEX = "https://www.figure.ai/news/introducing-index";
const FIGURE_CULTURE = "https://www.figure.ai/culture";
const FIGURE_SERIES_C = "https://www.figure.ai/news/series-c";

const ONE_X_HOME = "https://www.1x.tech/";
const ONE_X_COMPANY = "https://www.1x.tech/about";
const ONE_X_NEO = "https://www.1x.tech/order";
const ONE_X_NEO_RELEASE = "https://www.1x.tech/discover/neo-home-robot";
const ONE_X_HAND = "https://www.1x.tech/discover/neos-hands";
const ONE_X_EVE = "https://www.1x.tech/eve";
const ONE_X_REDWOOD = "https://www.1x.tech/discover/redwood-ai";
const ONE_X_SERIES_A2 = "https://www.1x.tech/discover/1x-rasies-23-5m-in-series-a2-funding-led-by-open-ai";

const SANCTUARY_HOME = "https://sanctuary.ai/";
const SANCTUARY_COMPANY = "https://sanctuary.ai/about-us/";
const SANCTUARY_MILESTONES = "https://sanctuary.ai/milestones/";
const SANCTUARY_PHOENIX_6 = "https://sanctuary.ai/news/sanctuary-ai-unveils-phoenix-a-humanoid-general-purpose-robot-designed-for-work/";
const SANCTUARY_PHOENIX_8 = "https://sanctuary.ai/news/sanctuary-ai-releases-new-generation-of-ai-robots-for-high-quality-data-capture/";
const SANCTUARY_HAND = "https://sanctuary.ai/solutions/hydraulic-hands/";
const SANCTUARY_HAND_TEST = "https://sanctuary.ai/news/sanctuary-ai-demonstrates-in-hand-manipulation-capabilities-for-improved-general-purpose-robot-dexterity/";
const SANCTUARY_SERIES_A = "https://sanctuary.ai/news/sanctuary-ai-closes-75-million-series-a-funding/";
const SANCTUARY_STRATEGIC = "https://sanctuary.ai/news/sanctuary-ai-announces-strategic-financing-from-bdc-capital-and-inbc/";

const NEURA_HOME = "https://neura-robotics.com/";
const NEURA_COMPANY = "https://neura-robotics.com/about-us/";
const NEURA_4NE1 = "https://neura-robotics.com/products/4ne-1";
const NEURA_LARA = "https://neura-robotics.com/products/lara/";
const NEURA_MAIRA = "https://neura-robotics.com/products/maira/";
const NEURA_MAV = "https://neura-robotics.com/products/mav/";
const NEURA_MIPA = "https://neura-robotics.com/products/mipa/";
const NEURA_OMNISENSOR = "https://neura-robotics.com/omnisensor/";
const NEURA_SENSEKIT = "https://neura-robotics.com/sensekit/";
const NEURA_TEACH = "https://neura-robotics.com/teach/";
const NEURA_TOUCH = "https://neura-robotics.com/touch/";
const NEURA_SERIES_B = "https://neura-robotics.com/neura-robotics-secures-euro-120-million-series-b/";
const NEURA_SERIES_C = "https://neura-robotics.com/record-series-c/";

export const waveTwelveCompanySlugs = [
  "agility-robotics",
  "figure-ai",
  "1x-technologies",
  "sanctuary-ai",
  "neura-robotics",
] as const;

const companySlugSet = new Set<string>(waveTwelveCompanySlugs);
export const isWaveTwelveCompanySlug = (slug: string) => companySlugSet.has(slug);

const patchAgility = (company: CompanyProfile, locale: Locale): CompanyProfile => ({
  ...company,
  legalName: "Agility Robotics, Inc.",
  country: t(locale, l("美国", "United States")),
  headquarters: t(locale, l("美国俄勒冈州塞勒姆", "Salem, Oregon, United States")),
  founded: "2015",
  officialUrl: AGILITY_HOME,
  valueChainRole: t(locale, l("工业人形机器人、机群工作流平台与部署服务厂商", "Industrial humanoid, fleet-workflow platform, and deployment-services supplier")),
  positioning: t(locale, l("以 Digit 和 Arc 组成工业现场自动化平台，当前重点是物流、配送和制造中的重复搬运流程。", "Combines Digit and Arc as an industrial automation platform focused on repetitive material-flow work in logistics, distribution, and manufacturing.")),
  strengths: [
    t(locale, l("Digit 采用双足移动和可更换末端，面向原有为人设计的厂房与仓库空间。", "Digit combines bipedal mobility with interchangeable end effectors for facilities originally designed around people.")),
    t(locale, l("Arc 连接机器人、WMS、WES、MES 与机群运行指标，属于部署系统而不是另一台机器人。", "Arc connects robots, WMS, WES, MES, and fleet metrics; it is a deployment system rather than another robot.")),
    t(locale, l("官网已披露商业部署与认证进展，但完整规格表仍需提交表单获取，公开网页不足以证明所有机械与安全参数。", "The official site discloses commercial deployments and certification progress, but the full specification sheet remains form-gated, so public pages do not establish every mechanical and safety field.")),
  ],
  products: ["Digit (v5)", "Arc"],
  fit: [
    t(locale, l("仓储周转箱搬运、生产物流、配送中心和重复物料流转。", "Warehouse tote handling, production logistics, distribution centers, and repetitive material movement.")),
    t(locale, l("需要在既有人工通道、货架和工位之间移动的自动化项目。", "Automation projects that must navigate existing human aisles, racks, and workstations.")),
    t(locale, l("具备现场流程数据、异常接管和持续服务资源的规模化试点。", "Scaled pilots with workflow data, exception handling, and ongoing service resources.")),
  ],
  overview: [
    t(locale, l("Agility Robotics 2015 年源自俄勒冈州立大学 Dynamic Robotics Laboratory。公司从 Cassie 与早期研究版 Digit 演进到面向工业客户的 Digit，并用 Arc 管理任务、机群和企业系统连接。", "Agility Robotics was founded in 2015 from Oregon State University's Dynamic Robotics Laboratory. It evolved from Cassie and early research editions of Digit to an industrial Digit platform, with Arc handling tasks, fleets, and enterprise-system connectivity.")),
    t(locale, l("公司官网列出 GXO、Schaeffler、Toyota Motor Manufacturing Canada 和 Amazon 等客户或合作方，并披露 Digit 在单一设施搬运超过 10 万个周转箱。该类部署事实不能自动外推到不同对象、工位或节拍。", "The company site lists GXO, Schaeffler, Toyota Motor Manufacturing Canada, and Amazon among customers or partners and reports more than 100,000 totes moved at one facility. That deployment evidence cannot be generalized automatically to different objects, workstations, or cycle times.")),
    t(locale, l("2026 年公司宣布与 Churchill Capital Corp XI 达成拟议业务合并。交易仍应按公告中的先决条件理解，不能在完成前把公司视为已上市。", "In 2026 the company announced a proposed business combination with Churchill Capital Corp XI. The transaction remains subject to the stated closing conditions and should not be treated as a completed public listing before closing.")),
  ],
  businessAreas: [
    t(locale, l("工业人形机器人本体与末端配置", "Industrial humanoid bodies and end-effector configurations")),
    t(locale, l("机群、任务与企业系统连接平台", "Fleet, task, and enterprise-system connectivity platform")),
    t(locale, l("现场部署、培训、监控、服务与扩展", "Site deployment, training, monitoring, service, and expansion")),
  ],
  customerGroups: [
    t(locale, l("物流、配送、仓储和电商运营商", "Logistics, distribution, warehousing, and e-commerce operators")),
    t(locale, l("汽车及一般制造企业", "Automotive and general manufacturers")),
    t(locale, l("WMS、WES、MES 与自动化系统集成商", "WMS, WES, MES, and automation integrators")),
  ],
  milestones: [
    { date: "2015", event: t(locale, l("公司从俄勒冈州立大学 Dynamic Robotics Laboratory 创立。", "The company was founded from Oregon State University's Dynamic Robotics Laboratory.")) },
    { date: "2017", event: t(locale, l("发布面向研究的第一代完整人形机器人 Digit。", "The first complete Digit humanoid for researchers was released.")) },
    { date: "2022", event: t(locale, l("完成 1.5 亿美元 Series B 融资。", "The company closed a USD 150 million Series B round.")) },
    { date: "2023", event: t(locale, l("面向工业客户重新设计 Digit，产品重心从实验室转向现场劳动。", "Digit was redesigned for industrial customers, shifting the product focus from laboratory research to field work.")) },
    { date: "2025", event: t(locale, l("官网记录 Digit 获 FCC 批准并取得 NRTL 认证。", "The company timeline records FCC approval and NRTL certification for Digit.")) },
    { date: "2026", event: t(locale, l("宣布与 Churchill Capital Corp XI 的拟议业务合并。", "A proposed business combination with Churchill Capital Corp XI was announced.")) },
  ],
  catalogScope: t(locale, l("当前公开产品范围按 Digit 本体和 Arc 工作流平台分别建档。Cassie 与早期 Digit 代际作为历史节点保留，不与当前 Digit v5 参数混用。", "The current public range is represented by separate Digit hardware and Arc workflow-platform records. Cassie and early Digit generations remain historical milestones and are not mixed into current Digit v5 parameters.")),
  catalogCoverage: "model-partial",
  verificationFocus: t(locale, l("锁定 Digit 硬件代际、末端、承载对象、节拍、续航与充电方案、安全认证适用范围、Arc 接口、异常接管和服务 SLA。", "Lock the Digit hardware generation, end effector, handled object, cycle time, endurance and charging plan, certification scope, Arc interfaces, exception handling, and service SLA.")),
  presalesQuestions: [
    t(locale, l("报价对应 Digit v5 的哪一硬件、末端和软件配置？", "Which Digit v5 hardware, end-effector, and software configuration does the quotation cover?")),
    t(locale, l("现场对象、搬运高度、通道、节拍和连续班次是否有同类验证？", "Are the site's objects, handling heights, aisles, cycle times, and continuous shifts covered by comparable evidence?")),
    t(locale, l("Arc 与 WMS/WES/MES 如何集成，故障时由谁接管并在多长时间内恢复？", "How does Arc integrate with WMS/WES/MES, and who takes over and restores operation after a fault?")),
  ],
  reviewedAt: "2026-09-04",
});

const patchFigure = (company: CompanyProfile, locale: Locale): CompanyProfile => ({
  ...company,
  legalName: "Figure AI, Inc.",
  country: t(locale, l("美国", "United States")),
  headquarters: t(locale, l("美国加利福尼亚州圣何塞都会区", "San Jose metropolitan area, California, United States")),
  founded: "2022",
  officialUrl: FIGURE_HOME,
  valueChainRole: t(locale, l("通用人形机器人、具身模型、机器人数据与制造平台厂商", "General-purpose humanoid, embodied-model, robotics-data, and manufacturing-platform company")),
  positioning: t(locale, l("当前硬件主线为 Figure 03，Helix 02 提供全身视觉语言动作控制，Index 面向大规模真实世界训练数据。", "Its current hardware line is Figure 03, with Helix 02 providing whole-body vision-language-action control and Index targeting large-scale real-world training data.")),
  strengths: [
    t(locale, l("机器人本体、执行器、电池、传感器、电子与 BotQ 制造系统的垂直整合。", "Vertical integration across robot bodies, actuators, batteries, sensors, electronics, and the BotQ manufacturing system.")),
    t(locale, l("Helix 02 把视觉、触觉、本体感知与全身执行器连接为分层控制系统。", "Helix 02 connects vision, touch, proprioception, and whole-body actuators in a hierarchical control system.")),
    t(locale, l("从工业物流向家庭场景扩展，但厂商演示、生产爬坡与普遍可采购能力必须分别判断。", "The company is extending from industrial logistics toward home settings, but demonstrations, production ramp, and generally purchasable capability must be evaluated separately.")),
  ],
  products: ["Figure 03", "Helix 02", "Index"],
  fit: [
    t(locale, l("制造物流、分拣、物料序列化和全身移动操作。", "Manufacturing logistics, sorting, sequencing, and whole-body mobile manipulation.")),
    t(locale, l("家庭整理、清洁、洗衣和餐具处理的研究与早期部署。", "Research and early deployment for home tidying, cleaning, laundry, and dish handling.")),
    t(locale, l("需要机器人本体、具身模型、数据闭环和制造能力共同评估的项目。", "Projects that must evaluate robot hardware, embodied models, data loops, and manufacturing together.")),
  ],
  overview: [
    t(locale, l("Figure 由 Brett Adcock 于 2022 年创立，公开路线从 Figure 01、Figure 02 演进到 Figure 03。公司页面将 01 定位为起点、02 定位为劳动力部署代际、03 定位为兼顾家庭与商业场景的现行代际。", "Figure was founded by Brett Adcock in 2022 and has publicly progressed from Figure 01 and Figure 02 to Figure 03. Its company page frames 01 as the beginning, 02 as the workforce generation, and 03 as the current generation spanning home and commercial settings.")),
    t(locale, l("Figure 03 的公开规格包括身高、负载、质量、续航和速度；另外两篇工程文章披露电池、无线充电、触觉与数据卸载。官网没有公开完整关节、扭矩、精度、环境和寿命表，因此本仓不补推这些字段。", "Public Figure 03 specifications include height, payload, mass, runtime, and speed, while engineering articles add battery, wireless charging, tactile, and data-offload information. The site does not publish a complete joint, torque, accuracy, environment, or lifetime table, so this repository does not infer those fields.")),
    t(locale, l("公司 2025 年宣布 Series C 承诺资本超过 10 亿美元、投后估值 390 亿美元。金额和估值属于公司公告时点信息，不等同于收入、盈利能力或后续交易价格。", "The company announced more than USD 1 billion in committed Series C capital at a USD 39 billion post-money valuation in 2025. Those figures are point-in-time company disclosures, not revenue, profitability, or a later transaction price.")),
  ],
  businessAreas: [
    t(locale, l("通用双足人形机器人", "General-purpose bipedal humanoids")),
    t(locale, l("视觉语言动作模型与全身控制", "Vision-language-action models and whole-body control")),
    t(locale, l("机器人数据采集、训练基础设施与 BotQ 制造", "Robot-data collection, training infrastructure, and BotQ manufacturing")),
  ],
  customerGroups: [
    t(locale, l("汽车、物流、零售与供应链运营商", "Automotive, logistics, retail, and supply-chain operators")),
    t(locale, l("家庭服务与物业场景合作方", "Home-service and property-environment partners")),
    t(locale, l("具身智能数据、模型和算力合作伙伴", "Embodied-intelligence data, model, and compute partners")),
  ],
  milestones: [
    { date: "2022", event: t(locale, l("Figure 创立。", "Figure was founded.")) },
    { date: "2023", event: t(locale, l("Figure 01 完成首次行走。", "Figure 01 took its first steps.")) },
    { date: "2025-02", event: t(locale, l("发布第一代 Helix 视觉语言动作模型。", "The first Helix vision-language-action model was introduced.")) },
    { date: "2025-09", event: t(locale, l("宣布 Series C 承诺资本超过 10 亿美元。", "The company announced more than USD 1 billion in committed Series C capital.")) },
    { date: "2025-10", event: t(locale, l("发布第三代人形机器人 Figure 03。", "The third-generation Figure 03 humanoid was introduced.")) },
    { date: "2026-01", event: t(locale, l("发布具备全身自主移动操作的 Helix 02。", "Helix 02 with whole-body autonomous loco-manipulation was introduced.")) },
  ],
  catalogScope: t(locale, l("当前目录建立 Figure 03 硬件、Helix 02 控制模型与 Index 数据平台三条记录；Figure 01 和 Figure 02 作为历史代际，不与 Figure 03 参数合并。", "The current catalog creates separate records for Figure 03 hardware, the Helix 02 control model, and the Index data platform. Figure 01 and Figure 02 remain historical generations and are not merged into Figure 03 specifications.")),
  catalogCoverage: "model-partial",
  verificationFocus: t(locale, l("区分演示、部署和可采购状态，并核对本体版本、手部、任务自治、人工接管、数据权利、充电、安全认证、生产良率和服务边界。", "Separate demonstrations, deployments, and purchasability, and verify body revision, hands, task autonomy, human intervention, data rights, charging, certification, manufacturing yield, and service boundaries.")),
  presalesQuestions: [
    t(locale, l("评估对象是 Figure 03 硬件、Helix 02 软件，还是二者与 Index 数据流程的组合？", "Is the evaluated object Figure 03 hardware, Helix 02 software, or a combination with the Index data pipeline?")),
    t(locale, l("公开演示与目标现场在对象、节拍、持续时间、错误恢复和安全条件上是否可比？", "Are public demonstrations comparable to the target site in objects, cycle time, duration, recovery, and safety conditions?")),
    t(locale, l("数据采集、上传、模型更新、人工接管和现场保密分别如何约束？", "How are data collection, upload, model updates, human intervention, and site confidentiality constrained?")),
  ],
  reviewedAt: "2026-09-04",
});

const patchOneX = (company: CompanyProfile, locale: Locale): CompanyProfile => ({
  ...company,
  legalName: "1X Technologies",
  country: t(locale, l("美国 / 挪威", "United States / Norway")),
  headquarters: t(locale, l("美国加利福尼亚州帕洛阿尔托", "Palo Alto, California, United States")),
  founded: "2014",
  officialUrl: ONE_X_HOME,
  valueChainRole: t(locale, l("家庭与工业人形机器人、肌腱驱动手部及具身模型厂商", "Home and industrial humanoid, tendon-driven hand, and embodied-model company")),
  positioning: t(locale, l("当前旗舰 NEO 面向家庭早期交付，EVE 是已在工业场景部署的轮式平台，Redwood 为跨本体视觉语言动作模型。", "The current flagship NEO targets early home deliveries, EVE is a wheeled platform deployed in industrial settings, and Redwood is a cross-embodiment vision-language-action model.")),
  strengths: [
    t(locale, l("低惯量肌腱驱动、软质外层和遮蔽关节用于降低家庭共处风险。", "Low-inertia tendon drives, a soft exterior, and covered joints are used to reduce co-presence risks in homes.")),
    t(locale, l("NEO 新一代手部公开 25 自由度、力透明、触觉与 IP68 等工程字段。", "The latest NEO hands publish engineering fields including 25 degrees of freedom, force transparency, tactile sensing, and IP68 sealing.")),
    t(locale, l("复杂任务可预约 1X Expert 远程协助，说明早期产品的自治与人工支持必须分别标注。", "Complex tasks can use scheduled 1X Expert remote assistance, so autonomy and human support must be disclosed separately for early products.")),
  ],
  products: ["NEO", "NEO 25-DoF Hand", "EVE Industrial", "Redwood AI"],
  fit: [
    t(locale, l("家庭整理、取物、开门、关灯和自然语言交互。", "Home tidying, retrieval, door opening, light switching, and natural-language interaction.")),
    t(locale, l("工业巡检、安防和轮式双臂移动操作。", "Industrial inspection, security, and wheeled bimanual mobile manipulation.")),
    t(locale, l("肌腱驱动手、遥操作、真实数据采集与跨本体模型研究。", "Tendon-driven hands, teleoperation, real-world data collection, and cross-embodiment model research.")),
  ],
  overview: [
    t(locale, l("1X 于 2014 年以 Halodi Robotics 名义在挪威创立，2023 年更名为 1X。公司当前把美国帕洛阿尔托列为基地，并在挪威建设机器人与执行器制造能力。", "1X was founded in Norway in 2014 as Halodi Robotics and adopted the 1X name in 2023. The company now identifies Palo Alto as its base while building robot and actuator manufacturing capacity in Norway.")),
    t(locale, l("产品路线从轮式 EVE 转向家庭双足 NEO。NEO Beta 和 NEO Gamma 是前代开发平台，2025 年公开发布的 NEO 才是当前预订与早期交付对象，不能把前代名称继续当作现售型号。", "The product path progressed from wheeled EVE to the home-focused bipedal NEO. NEO Beta and NEO Gamma were predecessor development platforms; the NEO launched publicly in 2025 is the current preorder and early-delivery product and should not be conflated with those earlier names.")),
    t(locale, l("官网披露 NEO 的价格、交付地区、硬件参数和远程专家模式。早期交付与软件持续更新意味着能力范围会变化，采购判断应同时覆盖硬件、订阅、人工支持、隐私和维护。", "The official site publishes NEO pricing, delivery geography, hardware specifications, and the remote Expert mode. Early delivery and continuing software updates mean capabilities can change, so procurement must address hardware, subscription, human support, privacy, and maintenance together.")),
  ],
  businessAreas: [
    t(locale, l("家庭双足人形机器人", "Home bipedal humanoids")),
    t(locale, l("工业轮式人形机器人", "Industrial wheeled humanoids")),
    t(locale, l("肌腱执行器、灵巧手与具身 AI 模型", "Tendon actuators, dexterous hands, and embodied-AI models")),
  ],
  customerGroups: [
    t(locale, l("美国早期家庭用户与家庭服务合作方", "US early home users and home-service partners")),
    t(locale, l("工业、安防和设施运营客户", "Industrial, security, and facility-operations customers")),
    t(locale, l("具身学习、遥操作和机器人数据研发团队", "Embodied-learning, teleoperation, and robot-data teams")),
  ],
  milestones: [
    { date: "2014", event: t(locale, l("公司以 Halodi Robotics 名义创立。", "The company was founded as Halodi Robotics.")) },
    { date: "2018", event: t(locale, l("Revo1 肌腱驱动伺服系统启动。", "The Revo1 tendon-drive servo platform powered up.")) },
    { date: "2022", event: t(locale, l("EVE 在客户工厂投入部署。", "EVE was deployed in customer factories.")) },
    { date: "2023", event: t(locale, l("更名为 1X，并完成 2,350 万美元 Series A2 融资。", "The company rebranded as 1X and closed a USD 23.5 million Series A2 round.")) },
    { date: "2025", event: t(locale, l("发布面向家庭预订的 NEO。", "NEO was launched for home preorders.")) },
    { date: "2026", event: t(locale, l("发布将用于每台 NEO 的 25 自由度手部。", "The 25-DoF hand intended for every shipping NEO was introduced.")) },
  ],
  catalogScope: t(locale, l("当前目录包含 NEO、NEO 新一代手部、EVE Industrial 与 Redwood AI；NEO Beta/Gamma 作为历史代际保留，不与当前 NEO 参数合并。", "The current catalog includes NEO, its latest hand, EVE Industrial, and Redwood AI. NEO Beta and Gamma remain historical generations and are not merged into current NEO specifications.")),
  catalogCoverage: "model-partial",
  verificationFocus: t(locale, l("确认交付地区与日期、所有权或订阅、硬件修订、自治任务、Expert 模式、数据访问、手部版本、维护和户外/IP 使用边界。", "Confirm delivery region and date, ownership or subscription, hardware revision, autonomous tasks, Expert mode, data access, hand version, maintenance, and outdoor/IP-use boundaries.")),
  presalesQuestions: [
    t(locale, l("交付的 NEO 是否已经采用 2026 年公布的 25 自由度手部？", "Will the delivered NEO include the 25-DoF hands announced in 2026?")),
    t(locale, l("哪些任务完全自主，哪些需要预约 Expert、移动端或 VR 远程控制？", "Which tasks are fully autonomous and which require a scheduled Expert, mobile app, or VR remote control?")),
    t(locale, l("家庭音视频、遥操作权限、模型训练、保留期限和删除流程如何约定？", "How are home audio/video, teleoperation permissions, model training, retention, and deletion governed?")),
  ],
  reviewedAt: "2026-09-04",
});

const patchSanctuary = (company: CompanyProfile, locale: Locale): CompanyProfile => ({
  ...company,
  legalName: "Sanctuary Cognitive Systems Corporation",
  country: t(locale, l("加拿大", "Canada")),
  headquarters: t(locale, l("加拿大不列颠哥伦比亚省温哥华", "Vancouver, British Columbia, Canada")),
  founded: "2018",
  officialUrl: SANCTUARY_HOME,
  valueChainRole: t(locale, l("工业 Physical AI、通用操作机器人与液压灵巧手厂商", "Industrial Physical AI, general-manipulation robot, and hydraulic dexterous-hand company")),
  positioning: t(locale, l("以 Carbon/Physical AI、Phoenix 数据与操作平台及液压灵巧手推进工业任务自动化，并开始把软件部署到其他机器人本体。", "Advances industrial task automation through Carbon/Physical AI, the Phoenix data and manipulation platform, and hydraulic dexterous hands, while extending its software to other robot embodiments.")),
  strengths: [
    t(locale, l("长期围绕手部驱动、触觉、遥操作与任务学习构建软硬件闭环。", "A long-running hardware-software loop around hand actuation, touch, teleoperation, and task learning.")),
    t(locale, l("Phoenix 八代采用轮式底盘，官网明确说明该选择来自客户对强上身、精确操作和安全性的反馈。", "Phoenix Generation 8 uses a wheeled base; the company explicitly attributes that choice to customer feedback around a strong upper body, precise work, and safety.")),
    t(locale, l("2026 年路线转向把 Physical AI 部署到现有和下一代工业机械平台，不能再仅用人形本体数量衡量商业进展。", "The 2026 strategy extends Physical AI to existing and next-generation industrial robot platforms, so commercial progress cannot be measured only by humanoid-body counts.")),
  ],
  products: ["Phoenix Generation 8", "Carbon / Physical AI", "17-DoF Hydraulic Hand"],
  fit: [
    t(locale, l("汽车线束插接、零件操作、零售和制造任务。", "Automotive wire-harness insertion, part manipulation, retail, and manufacturing tasks.")),
    t(locale, l("高自由度手内操作、触觉闭环和液压灵巧手研究。", "High-DoF in-hand manipulation, tactile control loops, and hydraulic dexterous-hand research.")),
    t(locale, l("需要软件跨不同机械臂或本体迁移的工业 Physical AI 项目。", "Industrial Physical-AI projects requiring software transfer across different arms or embodiments.")),
  ],
  overview: [
    t(locale, l("Sanctuary AI 2018 年成立于温哥华，法律实体为 Sanctuary Cognitive Systems Corporation。公司公开路线把 Carbon 认知/控制软件、Phoenix 通用机器人和灵巧手作为相互关联但不同的资产。", "Sanctuary AI was founded in Vancouver in 2018 under the legal entity Sanctuary Cognitive Systems Corporation. Its public roadmap treats the Carbon cognitive/control software, Phoenix general-purpose robot, and dexterous hands as related but distinct assets.")),
    t(locale, l("Phoenix 第六代曾公开身高、质量、负载和速度；第八代改为轮式数据采集平台，但新页面没有重申旧代机械参数。本仓因此不把第六代数值继承给第八代。", "Phoenix Generation 6 published height, mass, payload, and speed. Generation 8 shifted to a wheeled data-capture platform without restating those mechanical figures, so this repository does not inherit Generation 6 values into Generation 8.")),
    t(locale, l("公司 2026 年公布 17 自由度下一代液压手路线，并披露汽车线束插接达到厂商所报 99.5% 以上成功率、2.54 秒周期。该结果属于特定客户与任务验证，不代表其他任务的通用成功率。", "In 2026 the company described a next-generation 17-DoF hydraulic-hand roadmap and reported more than 99.5% success at a 2.54-second cycle for an automotive wire-harness insertion task. That result is specific to the stated customer benchmark and task, not a general success rate for other work.")),
  ],
  businessAreas: [
    t(locale, l("工业 Physical AI 与跨本体任务策略", "Industrial Physical AI and cross-embodiment task policies")),
    t(locale, l("Phoenix 通用机器人与数据采集平台", "Phoenix general-purpose robot and data-capture platform")),
    t(locale, l("液压灵巧手、触觉与手内操作", "Hydraulic dexterous hands, touch, and in-hand manipulation")),
  ],
  customerGroups: [
    t(locale, l("汽车、制造、零售与物流企业", "Automotive, manufacturing, retail, and logistics companies")),
    t(locale, l("需要复杂精细操作的工业自动化团队", "Industrial-automation teams requiring complex fine manipulation")),
    t(locale, l("机器人本体、仿真和 Physical AI 生态合作方", "Robot-platform, simulation, and Physical-AI ecosystem partners")),
  ],
  milestones: [
    { date: "2018", event: t(locale, l("公司在温哥华成立。", "The company was founded in Vancouver.")) },
    { date: "2022", event: t(locale, l("完成 7,550 万加元 Series A 融资。", "The company closed a CAD 75.5 million Series A round.")) },
    { date: "2023", event: t(locale, l("发布第六代 Phoenix 与 Carbon。", "Phoenix Generation 6 and Carbon were introduced.")) },
    { date: "2024", event: t(locale, l("发布面向高质量数据采集的 Phoenix Generation 8。", "Phoenix Generation 8 for high-quality data capture was introduced.")) },
    { date: "2025", event: t(locale, l("完成首个客户现场自主工业任务技术验证。", "The company completed its first customer-site autonomous industrial proof of technology.")) },
    { date: "2026", event: t(locale, l("获得首个商业采购订单并公布 17 自由度下一代液压手路线。", "The company secured its first commercial purchase order and described its next-generation 17-DoF hydraulic hand.")) },
  ],
  catalogScope: t(locale, l("当前目录分别记录 Phoenix Generation 8、Carbon/Physical AI 与 17 自由度液压手；第六代 Phoenix 数值只保留在历史与来源说明中，不覆盖第八代。", "The current catalog separates Phoenix Generation 8, Carbon/Physical AI, and the 17-DoF hydraulic hand. Generation 6 figures remain historical/source context and do not overwrite Generation 8.")),
  catalogCoverage: "model-partial",
  verificationFocus: t(locale, l("锁定本体代际、手部版本、软件部署对象、任务与节拍基准、自治/遥操作比例、训练数据、维护和商业交付边界。", "Lock body generation, hand revision, software embodiment, task and cycle benchmark, autonomy/teleoperation split, training data, maintenance, and commercial-delivery boundaries.")),
  presalesQuestions: [
    t(locale, l("方案采用 Phoenix、第三方工业机械臂，还是仅采用 Sanctuary 的 Physical AI 软件？", "Does the solution use Phoenix, a third-party industrial arm, or only Sanctuary's Physical AI software?")),
    t(locale, l("所报成功率和周期对应什么对象、夹具、速度、错误判定和连续样本量？", "What object, fixture, speed, failure definition, and continuous sample size support the reported success rate and cycle time?")),
    t(locale, l("17 自由度液压手当前处于开发、试点还是可采购状态，接口与维护条件是什么？", "Is the 17-DoF hydraulic hand in development, pilot, or purchasable status, and what are its interfaces and maintenance conditions?")),
  ],
  reviewedAt: "2026-09-04",
});

const patchNeura = (company: CompanyProfile, locale: Locale): CompanyProfile => ({
  ...company,
  legalName: "NEURA Robotics GmbH",
  country: t(locale, l("德国", "Germany")),
  headquarters: t(locale, l("德国梅青根", "Metzingen, Germany")),
  founded: "2019",
  officialUrl: NEURA_HOME,
  valueChainRole: t(locale, l("认知机械臂、协作机器人、移动平台、服务与人形机器人及传感附加模块厂商", "Cognitive-arm, cobot, mobile-platform, service/humanoid-robot, and sensing-addon company")),
  positioning: t(locale, l("产品从 LARA、MAiRA 和 MAV 工业平台延伸到 MiPA 服务机器人、4NE1 人形机器人及 OmniSensor、SenseKit、Teach、Touch 附加模块。", "The portfolio spans LARA, MAiRA, and MAV industrial platforms, MiPA service robots, 4NE1 humanoids, and OmniSensor, SenseKit, Teach, and Touch add-ons.")),
  strengths: [
    t(locale, l("同一公司内覆盖机械臂、移动底盘、人形本体、视觉/声音/力觉感知和机器人软件。", "One company spans arms, mobile bases, humanoid bodies, visual/audio/force sensing, and robot software.")),
    t(locale, l("当前官网公开 LARA 九个负载/臂展型号、MAiRA 三个尺寸级别和 MAV 三个载荷平台。", "The current site publishes nine LARA payload/reach models, three MAiRA size classes, and three MAV load platforms.")),
    t(locale, l("Neuraverse 与 NEURA Gym 属于共享技能和数据基础设施，不能与可交付硬件本体混为一个产品型号。", "Neuraverse and NEURA Gym are shared-skill and data infrastructure and should not be conflated with deliverable robot models.")),
  ],
  products: [
    "4NE1", "LARA 3", "LARA 5", "LARA 8", "LARA 10", "LARA LM 15", "LARA LM 20", "LARA LM 25L", "LARA LM 30", "LARA LM 30L",
    "MAiRA S", "MAiRA M", "MAiRA L", "MAV 500", "MAV 1500", "MAV+", "MiPA Gen 3", "NEURA OmniSensor", "NEURA SenseKit", "NEURA Teach", "NEURA Touch",
  ],
  fit: [
    t(locale, l("装配、上下料、焊接、打磨、检测、点胶和码垛。", "Assembly, machine tending, welding, finishing, inspection, dispensing, and palletizing.")),
    t(locale, l("仓内运输、移动操作、服务接待、辅助照护和家庭研究。", "Intralogistics transport, mobile manipulation, reception, assisted care, and home research.")),
    t(locale, l("需要视觉、语音、力矩、无接触人检测或共享技能平台的集成项目。", "Integration projects requiring vision, voice, force-torque sensing, touchless human detection, or shared-skill infrastructure.")),
  ],
  overview: [
    t(locale, l("NEURA Robotics 2019 年成立于德国梅青根，当前产品范围明显超过 4NE1 单一人形本体。官网把 LARA、MAiRA、MAV、MiPA 和 4NE1 列为五条产品主线，并单列四项感知与交互附加模块。", "NEURA Robotics was founded in Metzingen, Germany, in 2019. Its current portfolio extends well beyond the 4NE1 humanoid: the official site lists LARA, MAiRA, MAV, MiPA, and 4NE1 as five main product lines and separately lists four sensing and interaction add-ons.")),
    t(locale, l("LARA 是六轴协作机器人系列，MAiRA 是带视觉、语音与力矩感知的七轴认知机械臂，MAV 是移动运输平台。MiPA 和 4NE1 面向服务与通用人机环境，成熟度、认证和交付方式不能从工业机械臂直接类推。", "LARA is a six-axis cobot family, MAiRA a seven-axis cognitive arm with vision, voice, and force-torque sensing, and MAV a mobile transport platform. MiPA and 4NE1 target service and general human environments; maturity, certification, and delivery cannot be inferred from the industrial-arm products.")),
    t(locale, l("官网 2025 年披露 1.2 亿欧元 Series B，2026 年披露最高 14 亿美元 Series C。后者为最高轮次规模表述，不能自动等同于已一次性到账现金或公司收入。", "The company disclosed a EUR 120 million Series B in 2025 and a Series C of up to USD 1.4 billion in 2026. The latter is a maximum round-size statement and should not automatically be treated as cash received at once or company revenue.")),
  ],
  businessAreas: [
    t(locale, l("协作与认知机器人机械臂", "Collaborative and cognitive robot arms")),
    t(locale, l("自主移动、服务与人形机器人", "Autonomous mobile, service, and humanoid robots")),
    t(locale, l("传感、安全、示教、AI 与共享技能基础设施", "Sensing, safety, teaching, AI, and shared-skill infrastructure")),
  ],
  customerGroups: [
    t(locale, l("制造、汽车、金属加工、食品与物流企业", "Manufacturing, automotive, metalworking, food, and logistics companies")),
    t(locale, l("医疗、零售、酒店、照护和家庭服务方案商", "Healthcare, retail, hospitality, care, and home-service solution providers")),
    t(locale, l("OEM、系统集成商、高校与机器人开发团队", "OEMs, system integrators, universities, and robotics developers")),
  ],
  milestones: [
    { date: "2019", event: t(locale, l("公司在德国梅青根成立。", "The company was founded in Metzingen, Germany.")) },
    { date: "2022", event: t(locale, l("公开 LARA、MAiRA 与 MAV 首批机器人产品。", "The first LARA, MAiRA, and MAV products were introduced.")) },
    { date: "2024", event: t(locale, l("扩展 4NE1 与 MAiRA 产品组合。", "The 4NE1 and MAiRA portfolio was expanded.")) },
    { date: "2025-01", event: t(locale, l("完成 1.2 亿欧元 Series B 融资。", "The company closed a EUR 120 million Series B round.")) },
    { date: "2025", event: t(locale, l("MiPA Gen 3 资料发布，并扩展 Neuraverse 与 NEURA Gym。", "MiPA Gen 3 material was published and Neuraverse and NEURA Gym expanded.")) },
    { date: "2026-06", event: t(locale, l("宣布最高 14 亿美元 Series C 融资。", "A Series C of up to USD 1.4 billion was announced.")) },
  ],
  catalogScope: t(locale, l("本批次拆分五条主产品线的公开型号，并建立四项 Add-On 记录。LARA、MAiRA 和 MAV 数值来自当前产品页；MiPA 与 4NE1 只记录页面明确披露字段。", "This wave separates public models across the five main product lines and creates four add-on records. LARA, MAiRA, and MAV figures come from current product pages; MiPA and 4NE1 include only explicitly published fields.")),
  catalogCoverage: "model-partial",
  verificationFocus: t(locale, l("锁定具体型号、控制器、负载与臂展组合、传感器选件、IP/安全等级、现场总线、移动平台充电、软件许可和区域服务。", "Lock the exact model, controller, payload/reach combination, sensor options, IP/safety level, fieldbus, mobile charging, software licenses, and regional service.")),
  presalesQuestions: [
    t(locale, l("目标是 LARA、MAiRA、MAV、MiPA、4NE1，还是由多个平台组成的移动操作系统？", "Is the target LARA, MAiRA, MAV, MiPA, 4NE1, or a mobile-manipulation system combining platforms?")),
    t(locale, l("页面中的系列级 IP、精度和传感能力是否适用于报价中的具体型号与选件？", "Do page-level IP, accuracy, and sensing claims apply to the quoted model and options?")),
    t(locale, l("Neuraverse、现场应用、控制接口、功能安全、备件与服务分别包含哪些许可和责任？", "What licenses and responsibilities cover Neuraverse, applications, control interfaces, functional safety, spare parts, and service?")),
  ],
  reviewedAt: "2026-09-04",
});

export const applyVerifiedWaveTwelveCompanyPatch = (company: CompanyProfile, locale: Locale): CompanyProfile => {
  if (company.slug === "agility-robotics") return patchAgility(company, locale);
  if (company.slug === "figure-ai") return patchFigure(company, locale);
  if (company.slug === "1x-technologies") return patchOneX(company, locale);
  if (company.slug === "sanctuary-ai") return patchSanctuary(company, locale);
  if (company.slug === "neura-robotics") return patchNeura(company, locale);
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

const rows = (
  sourceUrl: string,
  sourceLabel: Localized,
  locator: Localized,
  values: Array<[string, string, string, string?]>,
): SpecRow[] => values.map(([labelZh, labelEn, valueZh, valueEn]) => row(
  sourceUrl,
  sourceLabel,
  locator,
  labelZh,
  labelEn,
  valueZh,
  valueEn ?? valueZh,
));

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
  "agility-robotics": AGILITY_COMPANY,
  "figure-ai": FIGURE_COMPANY,
  "1x-technologies": ONE_X_COMPANY,
  "sanctuary-ai": SANCTUARY_COMPANY,
  "neura-robotics": NEURA_COMPANY,
};

const catalogTitle: Record<CompanySlug, Localized> = {
  "agility-robotics": l("Agility Robotics 产品目录", "Agility Robotics product catalog"),
  "figure-ai": l("Figure 硬件、模型与数据平台目录", "Figure hardware, model, and data-platform catalog"),
  "1x-technologies": l("1X 机器人、手部与模型目录", "1X robot, hand, and model catalog"),
  "sanctuary-ai": l("Sanctuary AI 本体、手部与 Physical AI 目录", "Sanctuary AI embodiment, hand, and Physical-AI catalog"),
  "neura-robotics": l("NEURA Robotics 型号级产品目录", "NEURA Robotics model-level catalog"),
};

const timelineByCompany: Record<CompanySlug, TimelineSeed[]> = {
  "agility-robotics": [
    { date: "2015", title: l("公司创立", "Company founded"), detail: l("源自俄勒冈州立大学 Dynamic Robotics Laboratory。", "Founded from Oregon State University's Dynamic Robotics Laboratory."), sourceUrl: AGILITY_COMPANY, kind: "founding" },
    { date: "2020", title: l("2,000 万美元融资", "USD 20 million financing"), detail: l("DCVC 与 Playground Global 共同领投。", "Co-led by DCVC and Playground Global."), sourceUrl: AGILITY_2020_FUNDING, kind: "funding" },
    { date: "2022", title: l("1.5 亿美元 Series B", "USD 150 million Series B"), detail: l("融资用于研发与扩大机器人交付。", "The round was intended to accelerate R&D and robot delivery."), sourceUrl: AGILITY_2022_FUNDING, kind: "funding" },
    { date: "2023", title: l("工业版 Digit", "Industrial Digit"), detail: l("Digit 重新面向工业客户与现场劳动。", "Digit was redesigned around industrial customers and field work."), sourceUrl: AGILITY_COMPANY, kind: "product" },
    { date: "2026", title: l("拟议业务合并", "Proposed business combination"), detail: l("宣布与 Churchill Capital Corp XI 达成拟议交易，仍以完成条件为准。", "A proposed transaction with Churchill Capital Corp XI was announced, subject to closing conditions."), sourceUrl: AGILITY_PUBLIC, kind: "funding" },
  ],
  "figure-ai": [
    { date: "2022-05", title: l("Figure 创立", "Figure founded"), detail: l("Brett Adcock 发布公司使命与文化说明。", "Brett Adcock published the company's mission and culture statement."), sourceUrl: FIGURE_CULTURE, kind: "founding" },
    { date: "2023-05", title: l("Figure 01 首次行走", "Figure 01 first steps"), detail: l("第一代机器人完成首次行走。", "The first-generation robot took its first steps."), sourceUrl: FIGURE_COMPANY, kind: "product" },
    { date: "2025-09", title: l("Series C", "Series C"), detail: l("公司公告承诺资本超过 10 亿美元、投后估值 390 亿美元。", "The company announced over USD 1 billion in committed capital at a USD 39 billion post-money valuation."), sourceUrl: FIGURE_SERIES_C, kind: "funding" },
    { date: "2025-10", title: l("Figure 03", "Figure 03"), detail: l("发布第三代硬件并增加手部相机、触觉、无线充电和数据卸载。", "The third-generation hardware added palm cameras, touch, wireless charging, and data offload."), sourceUrl: FIGURE_03, kind: "product" },
    { date: "2026-01", title: l("Helix 02", "Helix 02"), detail: l("视觉语言动作系统扩展到全身移动操作。", "The vision-language-action system expanded to whole-body loco-manipulation."), sourceUrl: FIGURE_HELIX, kind: "product" },
  ],
  "1x-technologies": [
    { date: "2014", title: l("公司创立", "Company founded"), detail: l("以 Halodi Robotics 名义创立。", "Founded as Halodi Robotics."), sourceUrl: ONE_X_COMPANY, kind: "founding" },
    { date: "2022", title: l("EVE 工厂部署", "EVE factory deployments"), detail: l("轮式 EVE 进入客户工厂。", "Wheeled EVE entered customer factories."), sourceUrl: ONE_X_COMPANY, kind: "product" },
    { date: "2023", title: l("Series A2", "Series A2"), detail: l("完成 2,350 万美元融资并更名为 1X。", "The company raised USD 23.5 million and adopted the 1X name."), sourceUrl: ONE_X_SERIES_A2, kind: "funding" },
    { date: "2025-10", title: l("NEO 发布", "NEO launched"), detail: l("面向美国家庭开放预订与早期交付计划。", "Preorders and an early-delivery plan opened for US homes."), sourceUrl: ONE_X_NEO_RELEASE, kind: "product" },
    { date: "2026-07", title: l("25 自由度 NEO 手部", "25-DoF NEO hand"), detail: l("发布将用于每台 NEO 的新一代肌腱驱动手部。", "A new tendon-driven hand intended for every NEO was introduced."), sourceUrl: ONE_X_HAND, kind: "product" },
  ],
  "sanctuary-ai": [
    { date: "2018", title: l("公司创立", "Company founded"), detail: l("Sanctuary AI 在温哥华成立。", "Sanctuary AI was founded in Vancouver."), sourceUrl: SANCTUARY_COMPANY, kind: "founding" },
    { date: "2022", title: l("Series A", "Series A"), detail: l("完成 7,550 万加元融资。", "The company closed a CAD 75.5 million round."), sourceUrl: SANCTUARY_SERIES_A, kind: "funding" },
    { date: "2023", title: l("Phoenix 第六代与 Carbon", "Phoenix Generation 6 and Carbon"), detail: l("首次公开 Phoenix 名称与主要机械参数。", "The Phoenix name and key mechanical figures were published."), sourceUrl: SANCTUARY_PHOENIX_6, kind: "product" },
    { date: "2024", title: l("Phoenix Generation 8", "Phoenix Generation 8"), detail: l("发布轮式、高质量数据采集代际。", "A wheeled generation optimized for high-quality data capture was introduced."), sourceUrl: SANCTUARY_PHOENIX_8, kind: "product" },
    { date: "2026", title: l("17 自由度液压手路线", "17-DoF hydraulic-hand roadmap"), detail: l("里程碑页面公布下一代 17 自由度液压手。", "The milestone page described a next-generation 17-DoF hydraulic hand."), sourceUrl: SANCTUARY_MILESTONES, kind: "product" },
  ],
  "neura-robotics": [
    { date: "2019", title: l("公司创立", "Company founded"), detail: l("公司在德国梅青根成立。", "The company was founded in Metzingen, Germany."), sourceUrl: NEURA_COMPANY, kind: "founding" },
    { date: "2022", title: l("首批机器人产品", "First robot products"), detail: l("LARA、MAiRA 与 MAV 对外发布。", "LARA, MAiRA, and MAV were introduced."), sourceUrl: NEURA_COMPANY, kind: "product" },
    { date: "2025-01", title: l("Series B", "Series B"), detail: l("完成 1.2 亿欧元融资。", "The company closed a EUR 120 million round."), sourceUrl: NEURA_SERIES_B, kind: "funding" },
    { date: "2025", title: l("MiPA Gen 3", "MiPA Gen 3"), detail: l("发布第三代服务机器人资料。", "Third-generation service-robot material was published."), sourceUrl: NEURA_MIPA, kind: "product" },
    { date: "2026-06", title: l("Series C", "Series C"), detail: l("宣布最高 14 亿美元融资。", "A round of up to USD 1.4 billion was announced."), sourceUrl: NEURA_SERIES_C, kind: "funding" },
  ],
};

const fundingByCompany: Record<CompanySlug, FundingSeed[]> = {
  "agility-robotics": [
    { date: "2020-10", round: l("融资", "Financing"), amount: "USD 20 million", investors: l("DCVC、Playground Global 等", "DCVC, Playground Global, and others"), sourceUrl: AGILITY_2020_FUNDING },
    { date: "2022", round: l("Series B", "Series B"), amount: "USD 150 million", investors: l("DCVC、Playground Global、Amazon Industrial Innovation Fund 等", "DCVC, Playground Global, Amazon Industrial Innovation Fund, and others"), sourceUrl: AGILITY_2022_FUNDING },
  ],
  "figure-ai": [
    { date: "2025-09", round: l("Series C", "Series C"), amount: "> USD 1 billion committed", investors: l("Parkway Venture Capital 领投；Brookfield、NVIDIA 等参与", "Led by Parkway Venture Capital with Brookfield, NVIDIA, and others"), sourceUrl: FIGURE_SERIES_C },
  ],
  "1x-technologies": [
    { date: "2023-03", round: l("Series A2", "Series A2"), amount: "USD 23.5 million", investors: l("OpenAI Startup Fund 领投；Tiger Global 等参与", "Led by OpenAI Startup Fund with Tiger Global and others"), sourceUrl: ONE_X_SERIES_A2 },
  ],
  "sanctuary-ai": [
    { date: "2022", round: l("Series A", "Series A"), amount: "CAD 75.5 million", investors: l("Bell、Evok、EDC、Magna、SE Health、Verizon Ventures、Workday Ventures", "Bell, Evok, EDC, Magna, SE Health, Verizon Ventures, and Workday Ventures"), sourceUrl: SANCTUARY_SERIES_A },
    { date: "2024", round: l("战略融资", "Strategic financing"), amount: l("金额未单列；公司称累计投入超过 1.4 亿美元", "Amount not separately disclosed; company stated more than USD 140 million invested to date"), investors: l("BDC Capital、InBC", "BDC Capital and InBC"), sourceUrl: SANCTUARY_STRATEGIC },
  ],
  "neura-robotics": [
    { date: "2025-01", round: l("Series B", "Series B"), amount: "EUR 120 million", investors: l("Lingotto 领投；BlueCrest、Volvo Cars Tech Fund 等参与", "Led by Lingotto with BlueCrest, Volvo Cars Tech Fund, and others"), sourceUrl: NEURA_SERIES_B },
    { date: "2026-06", round: l("Series C", "Series C"), amount: "Up to USD 1.4 billion", investors: l("Tether、Qualcomm、Amazon、NVIDIA、Bosch、Schaeffler、EIB 等", "Tether, Qualcomm, Amazon, NVIDIA, Bosch, Schaeffler, EIB, and others"), sourceUrl: NEURA_SERIES_C },
  ],
};

const investmentViewByCompany: Record<CompanySlug, Localized[]> = {
  "agility-robotics": [
    l("公开部署与大额多年订单说明公司已越过纯实验室阶段，但拟议上市交易、订单里程碑和收入确认仍需分开核验。", "Public deployments and large multi-year orders indicate progress beyond the laboratory stage, but the proposed listing, order milestones, and revenue recognition still require separate verification."),
    l("核心集中在 Digit 与 Arc，产品聚焦有利于部署闭环，也意味着硬件可靠性、客户集中度与服务能力会直接影响扩张。", "The portfolio is concentrated in Digit and Arc. That focus supports deployment integration but also makes hardware reliability, customer concentration, and service capacity central scaling risks."),
  ],
  "figure-ai": [
    l("Figure 同时投入本体、模型、数据和制造，垂直整合有助于快速迭代，但也提高资本支出、产能爬坡和良率验证的重要性。", "Figure invests across hardware, models, data, and manufacturing. Vertical integration may accelerate iteration but also raises the importance of capex, production ramp, and yield verification."),
    l("公司公告的融资与估值规模较高；投资判断仍需要合同收入、毛利、交付成本、客户集中度和实际可用率等未公开经营数据。", "The announced funding and valuation are large. Investment analysis still requires undisclosed operating data such as contracted revenue, gross margin, delivery cost, customer concentration, and achieved uptime."),
  ],
  "1x-technologies": [
    l("NEO 直接面向家庭预订，商业模式同时包含所有权和订阅。早期交付节奏、支持成本、远程专家介入和隐私治理会决定用户体验与单位经济性。", "NEO is offered directly for home preorder under ownership and subscription models. Early delivery pace, support cost, remote Expert involvement, and privacy governance will shape user experience and unit economics."),
    l("EVE 的工业部署与 NEO 的家庭产品不是同一市场验证，不能用前者简单证明后者的留存、维护和消费者需求。", "EVE's industrial deployment and NEO's home product are different market tests; the former does not by itself prove the latter's retention, maintenance, or consumer demand."),
  ],
  "sanctuary-ai": [
    l("公司正在从自有通用本体扩展到跨本体 Physical AI，潜在收入可以来自软件、手部或完整系统；当前公开资料不足以判断三者的收入占比。", "The company is extending from its own general-purpose robot to cross-embodiment Physical AI, creating possible software, hand, and full-system revenue lines; public material does not establish their current mix."),
    l("特定汽车任务的高成功率是有价值的客户验证，但应继续核验持续样本、换型时间、异常恢复、现场成本和采购订单规模。", "The high reported success rate on a specific automotive task is useful customer evidence, but continuous sample size, changeover time, recovery, site cost, and purchase-order scale still require verification."),
  ],
  "neura-robotics": [
    l("NEURA 的硬件覆盖面较宽，能够形成交叉销售和平台协同，也增加型号管理、产能、认证、渠道和售后复杂度。", "NEURA's broad hardware range can support cross-selling and platform effects, while increasing model management, production, certification, channel, and after-sales complexity."),
    l("最高 14 亿美元 Series C 与超过 10 亿美元订单簿均来自公司披露；分析时应取得实际交割、订单取消条款、交付计划和收入确认资料。", "The up-to-USD-1.4-billion Series C and over-USD-1-billion orderbook are company disclosures; analysis should obtain closing, cancellation, delivery, and revenue-recognition details."),
  ],
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
  openness: locale === "zh" ? "官方产品页或工程发布公开" : "Official product page or engineering release is public",
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
    ? "硬件、历史代际、软件和数据平台分别建档；参数只适用于引用来源中的版本与范围。"
    : "Hardware, historical generations, software, and data platforms are recorded separately; parameters apply only to the cited revision and scope.",
  profile: finderProfile(company),
  evidence: {
    level: seed.level ?? "model",
    specificationKind: seed.specificationKind ?? (seed.rows.length ? "parameters" : "capabilities"),
    specificationCoverage: seed.coverage,
    specificationCoverageNote: locale === "zh"
      ? seed.coverage === "official-complete"
        ? "已逐项覆盖引用官方规格区块的公开字段；后续修订、选件和订单配置仍以来源页为准。"
        : seed.coverage === "capability-only"
          ? "厂商当前公开材料以功能、平台或代际说明为主，没有可逐项转录的完整型号参数表。"
          : "已覆盖当前官方页面可明确归属的字段；表单后资料、未披露字段和跨代参数不作推断。"
      : seed.coverage === "official-complete"
        ? "Every public field in the cited official specification block is covered; later revisions, options, and ordered configurations remain governed by the source."
        : seed.coverage === "capability-only"
          ? "Current manufacturer material describes functions, a platform, or a generation without a complete model specification table to transcribe."
          : "Fields unambiguously attributable on current official pages are covered; gated material, undisclosed fields, and cross-generation inheritance are not inferred.",
    overview: seed.overview.map((item) => t(locale, item)),
    applications: seed.applications.map((item) => t(locale, item)),
    disclosureBoundary: locale === "zh"
      ? "数值、状态和里程碑按来源时点记录；厂商目标、演示、试点、订单、量产与普遍可采购能力不互相替代。"
      : "Figures, status, and milestones are recorded at the source date; manufacturer targets, demonstrations, pilots, orders, production, and general availability are not interchangeable.",
    sourceLinks: [...new Map([
      { label: locale === "zh" ? `${seed.product} 官方资料` : `${seed.product} official material`, url: seed.pageUrl },
      ...(seed.sourceLinks ?? []).map((item) => ({ label: t(locale, item.label), url: item.url })),
      { label: locale === "zh" ? "公司官方介绍" : "Official company profile", url: companyAboutUrl[seed.companySlug] },
    ].map((item) => [item.url, item])).values()],
    companyTimeline: timelineByCompany[seed.companySlug].map((item) => ({
      date: item.date,
      title: t(locale, item.title),
      detail: t(locale, item.detail),
      sourceUrl: item.sourceUrl,
      kind: item.kind,
    })),
    fundingRounds: fundingByCompany[seed.companySlug].map((item) => ({
      date: item.date,
      round: t(locale, item.round),
      amount: typeof item.amount === "string" ? item.amount : t(locale, item.amount),
      investors: t(locale, item.investors),
      sourceUrl: item.sourceUrl,
    })),
    investmentView: investmentViewByCompany[seed.companySlug].map((item) => t(locale, item)),
  },
});

const capabilitySeed = (
  id: string,
  companySlug: CompanySlug,
  product: string,
  pageUrl: string,
  category: FinderCategory,
  primary: string,
  subclass: string,
  type: Localized,
  overview: Localized[],
  applications: Localized[],
  integration: Localized,
  verification: Localized,
  useCases: FinderUseCase[] = ["research", "integration"],
): ProductSeed => ({
  id, companySlug, product, pageUrl, category, primary, subclass, type, overview, applications,
  integration, verification, useCases, rows: [], coverage: "capability-only", level: "platform", specificationKind: "capabilities",
});

const agilitySeeds: ProductSeed[] = [
  {
    id: "agility-digit-v5",
    companySlug: "agility-robotics",
    product: "Digit (v5)",
    pageUrl: AGILITY_SOLUTIONS,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "industrial-humanoid",
    useCases: ["manufacturing", "logistics", "integration"],
    type: l("双足工业移动操作机器人", "Bipedal industrial mobile-manipulation robot"),
    integration: l("通过 Arc 连接机器人任务、机群运行与 WMS/WES/MES；末端按对象和工位配置。", "Arc connects robot tasks and fleets to WMS/WES/MES; end effectors are configured around the handled objects and workstations."),
    verification: l("索取当前 v5 规格表，并核验末端、承载姿态、节拍、充电、地面与坡度、安全认证范围和异常恢复。", "Obtain the current v5 specification sheet and verify end effectors, carried pose, cycle time, charging, floor and slope limits, certification scope, and recovery."),
    rows: rows(AGILITY_SOLUTIONS, l("Digit 官方解决方案页", "Official Digit solutions page"), l("Digit / Durable", "Digit / Durable"), [
      ["携带能力", "Carrying capacity", "35 lb（15.88 kg）", "35 lb (15.88 kg)"],
      ["电池续航", "Battery runtime", "4 h"],
      ["末端", "End effectors", "可更换", "Interchangeable"],
      ["移动形式", "Mobility", "双足", "Bipedal"],
      ["FCC 状态", "FCC status", "2025 年官网时间线记录已批准", "Recorded as approved in the 2025 company timeline"],
      ["NRTL 状态", "NRTL status", "2025 年官网时间线记录已认证", "Recorded as certified in the 2025 company timeline"],
    ]),
    overview: [
      l("Digit 是 Agility 当前工业人形硬件。公开页给出 35 lb 携带能力和 4 h 电池续航，但完整 Spec Sheet 仍为表单入口。", "Digit is Agility's current industrial humanoid hardware. The public page states a 35 lb carrying capacity and 4 h battery runtime, while the full spec sheet remains form-gated."),
      l("2026 年拟议业务合并公告称当前商业产品为 Digit v5；早期研究版和 2023 工业重设计不与 v5 数值混用。", "The 2026 proposed-business-combination release identifies Digit v5 as the current commercial product; earlier research editions and the 2023 industrial redesign are not mixed into v5 figures."),
    ],
    applications: [l("周转箱搬运、物流和制造物料流转", "Tote handling and material movement in logistics and manufacturing")],
    coverage: "official-partial",
    sourceLinks: [{ label: l("Digit v5 与交易说明", "Digit v5 and transaction release"), url: AGILITY_PUBLIC }],
  },
  capabilitySeed(
    "agility-arc", "agility-robotics", "Arc", AGILITY_SOLUTIONS, "model-software", "model-software", "fleet-orchestration",
    l("Digit 云端工作流、机群和企业系统连接平台", "Cloud workflow, fleet, and enterprise-system platform for Digit"),
    [l("Arc 监控机器人状态和生产指标、分配任务，并连接仓储与制造系统。", "Arc monitors robot status and productivity metrics, assigns tasks, and connects warehouse and manufacturing systems."), l("公开页说明加密通信、单点登录和基于角色的访问控制，但没有公开协议级接口清单。", "The public page states encrypted communications, single sign-on, and role-based access control but does not publish a protocol-level interface list.")],
    [l("Digit 机群管理、WMS/WES/MES 连接、任务编排与现场监控", "Digit fleet management, WMS/WES/MES connectivity, task orchestration, and site monitoring")],
    l("与 Digit 部署共同集成，并连接现有仓储、执行和制造系统。", "Integrated with a Digit deployment and connected to existing warehouse, execution, and manufacturing systems."),
    l("核对 API、身份与权限、数据保留、离线降级、告警、审计日志和服务等级。", "Verify APIs, identity and access, retention, offline degradation, alerts, audit logs, and service levels."),
    ["manufacturing", "logistics", "integration"],
  ),
];

const figureSeeds: ProductSeed[] = [
  {
    id: "figure-03",
    companySlug: "figure-ai",
    product: "Figure 03",
    pageUrl: FIGURE_PRODUCT,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "general-purpose-humanoid",
    useCases: ["manufacturing", "logistics", "service", "research"],
    type: l("双足通用人形机器人", "Bipedal general-purpose humanoid"),
    integration: l("与 Helix 02、手部触觉/相机、无线充电和数据卸载流程共同构成系统。", "Forms a system with Helix 02, hand tactile/camera sensing, wireless charging, and data-offload workflows."),
    verification: l("核对当前本体、手部、电池、充电底座、自治软件、任务验证、数据权利、安全与商业交付状态。", "Verify the current body, hands, battery, charging stand, autonomy software, task evidence, data rights, safety, and delivery status."),
    rows: [
      ...rows(FIGURE_PRODUCT, l("Figure 03 官方产品页", "Official Figure 03 product page"), l("Figure 03 规格", "Figure 03 specifications"), [
        ["身高", "Height", "5 ft 8 in（172.7 cm）", "5 ft 8 in (172.7 cm)"],
        ["负载", "Payload", "20 kg"],
        ["整机质量", "Robot mass", "61 kg"],
        ["运行时间", "Runtime", "5 h"],
        ["最大速度", "Maximum speed", "1.2 m/s"],
        ["动力系统", "Powertrain", "纯电动", "Electric"],
      ]),
      ...rows(FIGURE_BATTERY, l("Figure 03 电池工程说明", "Figure 03 battery engineering article"), l("Battery requirements", "Battery requirements"), [
        ["电池能量", "Battery energy", "2.3 kWh"],
        ["快速充电功率", "Fast-charge power", "2 kW"],
        ["电池管理", "Battery management", "自研 BMS", "In-house BMS"],
      ]),
      ...rows(FIGURE_03, l("Figure 03 发布说明", "Figure 03 introduction"), l("Designed for Helix / Home", "Designed for Helix / Home"), [
        ["指尖传感器最小检测载荷", "Minimum fingertip-sensor detected load", "3 g"],
        ["无线数据卸载速率", "Wireless data-offload rate", "10 Gbps"],
        ["无线充电功率", "Wireless charging power", "2 kW"],
        ["电池运输认证", "Battery transport certification", "UN38.3（发布时称已取得）", "UN38.3 (stated as achieved at publication)"],
        ["手部近距视觉", "Close-range hand vision", "每只手集成掌心相机", "Palm camera integrated in each hand"],
      ]),
    ],
    overview: [
      l("Figure 03 是第三代硬件，公开产品页给出五项核心机械/运行参数。电池与发布文章补充 2.3 kWh、2 kW、触觉和 10 Gbps 数据卸载。", "Figure 03 is the third hardware generation. Its product page publishes five core mechanical/runtime figures, while battery and launch articles add 2.3 kWh, 2 kW, tactile sensing, and 10 Gbps data offload."),
      l("页面没有公开关节数、单关节扭矩、整机精度、IP、防护环境和寿命表；这些字段保持未推断。", "The pages do not publish a joint count, joint torque table, whole-robot accuracy, IP rating, environmental limits, or lifetime table; those fields remain uninferred."),
    ],
    applications: [l("家庭任务、制造物流、双手操作和全身移动操作", "Home tasks, manufacturing logistics, bimanual manipulation, and whole-body loco-manipulation")],
    coverage: "official-partial",
    sourceLinks: [{ label: l("Figure 03 发布说明", "Figure 03 introduction"), url: FIGURE_03 }, { label: l("Figure 03 电池说明", "Figure 03 battery article"), url: FIGURE_BATTERY }],
  },
  {
    id: "figure-helix-02",
    companySlug: "figure-ai",
    product: "Helix 02",
    pageUrl: FIGURE_HELIX,
    category: "model-software",
    primary: "model-software",
    subclass: "whole-body-vla",
    useCases: ["research", "manufacturing", "logistics", "service"],
    type: l("分层全身视觉语言动作控制系统", "Hierarchical whole-body vision-language-action control system"),
    integration: l("S2 负责语义目标，S1 以 200 Hz 输出全身关节目标，S0 以 1 kHz 处理平衡、接触和协调。", "S2 handles semantic goals, S1 outputs whole-body joint targets at 200 Hz, and S0 handles balance, contact, and coordination at 1 kHz."),
    verification: l("核对演示版本、任务数据、成功标准、人工介入、部署硬件、更新机制和现场安全监督。", "Verify demonstration revision, task data, success criteria, human intervention, deployment hardware, update mechanisms, and site safety supervision."),
    rows: rows(FIGURE_HELIX, l("Helix 02 官方技术说明", "Official Helix 02 technical article"), l("Architecture / Results", "Architecture / Results"), [
      ["System 0 参数量", "System 0 parameter count", "10 million parameters"],
      ["System 0 控制频率", "System 0 control rate", "1 kHz"],
      ["System 1 目标输出频率", "System 1 target-output rate", "200 Hz"],
      ["System 0 训练人类动作数据", "System 0 human-motion training data", ">1,000 h"],
      ["并行仿真环境", "Parallel simulation environments", ">200,000"],
      ["公开连续任务时长", "Published continuous-task duration", "4 min"],
      ["公开连续任务动作数", "Published continuous-task action count", "61"],
      ["传感输入", "Sensor inputs", "头部相机、掌心相机、指尖触觉、全身本体感知", "Head cameras, palm cameras, fingertip touch, and full-body proprioception"],
      ["控制输出", "Control outputs", "腿、躯干、头、臂、腕和单指关节目标", "Joint targets for legs, torso, head, arms, wrists, and individual fingers"],
    ]),
    overview: [
      l("Helix 02 是 Figure 的软件/模型系统，不是另一台机器人。官方技术文章将其拆为语义、视觉运动和基础全身控制三层。", "Helix 02 is Figure's software/model system rather than another robot. The official article separates it into semantic, visuomotor, and foundational whole-body-control layers."),
      l("4 分钟、61 个动作是公开演示范围，不应直接解释为任意家庭或工厂任务的稳定连续运行能力。", "The four-minute, 61-action sequence is the published demonstration scope and should not be read as stable continuous operation for arbitrary home or factory tasks."),
    ],
    applications: [l("全身移动操作、双手操作、家庭任务与制造物流", "Whole-body loco-manipulation, bimanual work, home tasks, and manufacturing logistics")],
    coverage: "official-complete",
  },
  capabilitySeed(
    "figure-index", "figure-ai", "Index", FIGURE_INDEX, "model-software", "model-software", "robot-data-platform",
    l("真实世界具身数据采集平台", "Real-world embodied-data collection platform"),
    [l("Index 通过面向人类贡献者的应用收集目标导向视频，为 Helix 训练提供现实环境数据。", "Index uses an app for human contributors to collect goal-directed video for Helix training."), l("公开数量为公告时点运营指标，并非产品性能或长期承诺。", "Published counts are point-in-time operating metrics rather than product-performance specifications or long-term commitments.")],
    [l("机器人预训练数据采集、质量控制与模型训练", "Robot-pretraining data collection, quality control, and model training")],
    l("与贡献者应用、数据管线、质量标准、训练基础设施和 Helix 模型共同运行。", "Operates with the contributor app, data pipeline, quality controls, training infrastructure, and Helix models."),
    l("核对授权、隐私、地域、质量抽检、重复数据、删除、报酬和训练用途。", "Verify consent, privacy, geography, quality sampling, duplicates, deletion, compensation, and training use."),
  ),
];

const neoRows: SpecRow[] = [
  ...rows(ONE_X_NEO, l("NEO 官方订购页", "Official NEO order page"), l("Hardware", "Hardware"), [
    ["身高", "Height", "5 ft 6 in（167.6 cm）", "5 ft 6 in (167.6 cm)"],
    ["整机质量", "Robot mass", "66 lb（29.94 kg）", "66 lb (29.94 kg)"],
    ["最大举升", "Maximum lift", "154 lb（69.85 kg）", "154 lb (69.85 kg)"],
    ["最大携带", "Maximum carry", "55 lb（24.95 kg）", "55 lb (24.95 kg)"],
    ["单臂负载", "Arm payload", "18 lb（8.16 kg）", "18 lb (8.16 kg)"],
    ["手指与掌部自由度", "Finger-and-palm degrees of freedom", "22 × 2 DoF"],
    ["手臂自由度", "Arm degrees of freedom", "7 × 2 DoF"],
    ["颈部自由度", "Neck degrees of freedom", "3 DoF"],
    ["脊柱自由度", "Spine degrees of freedom", "2 DoF"],
    ["腿部自由度", "Leg degrees of freedom", "6 × 2 DoF"],
    ["手部速度", "Hand speed", "8.0 m/s"],
    ["最大奔跑速度", "Maximum run speed", "6.2 m/s"],
    ["行走速度", "Walking speed", "1.4 m/s"],
    ["电池能量", "Battery energy", "842 Wh"],
    ["续航", "Runtime", "4 h"],
    ["快充", "Quick charge", "每充电 6 min 增加约 1 h 运行时间", "6 min of charging per hour of runtime"],
    ["手部防护等级", "Hand ingress protection", "IP68（厂商标注可浸水）", "IP68 (described as submersible)"],
    ["本体防护等级", "Body ingress protection", "IP44（厂商标注防溅水）", "IP44 (described as splash-proof)"],
    ["头部伤害指标", "Head Injury Criterion", "HIC <250"],
    ["扭矩精度", "Torque accuracy", "2%"],
    ["反向驱动能力", "Backdrivability", "95%"],
    ["重复性", "Repetition", "0.1 mm"],
    ["标称负载循环", "Nominal-load cycles", "2,000,000 cycles"],
    ["峰值负载循环", "Peak-load cycles", "100,000 cycles（3× 标称负载）", "100,000 cycles (3x nominal load)"],
    ["定位精度", "Positioning accuracy", "1 mm"],
    ["可闻噪声", "Audible noise", "22 dB"],
    ["计算平台", "Compute platform", "1X NEO Cortex（NVIDIA Jetson Thor）", "1X NEO Cortex (NVIDIA Jetson Thor)"],
    ["AI 算力", "AI compute", "up to 2,070 FP4 TFLOPS"],
    ["麦克风", "Microphones", "4 个波束成形麦克风", "4 beamforming microphones"],
    ["扬声器", "Speakers", "骨盆与胸部三级扬声器", "Three-stage speaker system in pelvis and chest"],
    ["相机", "Cameras", "双 8.85 MP、90 Hz 立体鱼眼", "Dual 8.85 MP, 90 Hz stereo fisheye"],
    ["通信", "Communications", "Wi-Fi、Bluetooth、5G"],
    ["本体外层", "Body exterior", "定制 3D 晶格聚合物软体", "Custom 3D lattice-polymer soft body"],
    ["关节结构", "Joint structure", "外部无可触及夹点", "No externally accessible pinch points"],
    ["驱动", "Actuation", "低惯量肌腱驱动", "Low-inertia tendon drives"],
  ]),
  ...rows(ONE_X_HAND, l("NEO 新一代手部工程说明", "NEO latest-hand engineering article"), l("The joints are sensors / Hardware", "The joints are sensors / Hardware"), [
    ["每只手部总自由度（含腕）", "Total degrees of freedom per hand assembly including wrist", "25 DoF"],
    ["手指与掌部全驱动自由度", "Fully actuated finger-and-palm degrees of freedom", "22 DoF"],
    ["腕部自由度", "Wrist degrees of freedom", "3 DoF"],
  ]),
];

const oneXSeeds: ProductSeed[] = [
  {
    id: "1x-neo-current",
    companySlug: "1x-technologies",
    product: "NEO",
    pageUrl: ONE_X_NEO,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "home-humanoid",
    useCases: ["service", "research"],
    type: l("家庭双足人形机器人", "Home bipedal humanoid robot"),
    integration: l("通过 NEO 应用、语音、Redwood AI、自主充电、预约 Expert 和远程移动/VR 控制运行。", "Operates through the NEO app, voice, Redwood AI, self-charging, scheduled Experts, and mobile/VR remote control."),
    verification: l("确认交付硬件与手部修订、早期自治任务、Expert 权限、订阅、数据用途、维护、保修和家庭环境限制。", "Confirm the delivered hardware and hand revision, early autonomous tasks, Expert permissions, subscription, data use, maintenance, warranty, and home-environment limits."),
    rows: neoRows,
    overview: [
      l("NEO 官方订购页公开从尺寸、负载、自由度、速度、电池、安全、IP、肌腱驱动到算力、相机和通信的 Hardware 区块，本记录逐项转录。", "The official NEO order page publishes a Hardware block spanning dimensions, loads, DoF, speed, battery, safety, IP, tendon drive, compute, cameras, and communications; this record transcribes it field by field."),
      l("2026 年手部文章说明 25 DoF 包括 22 个手指/掌部自由度和 3 个腕部自由度，因此与订购页的“Hands 22×2”按不同统计范围同时保留。", "The 2026 hand article states that 25 DoF comprises 22 finger/palm DoF plus three wrist DoF. Both that count and the order page's 'Hands 22x2' are retained with their different scopes."),
    ],
    applications: [l("家庭取物、整理、洗衣、开门、对话和个人辅助", "Home retrieval, tidying, laundry, door opening, conversation, and personal assistance")],
    coverage: "official-complete",
    sourceLinks: [{ label: l("NEO 发布说明", "NEO launch article"), url: ONE_X_NEO_RELEASE }, { label: l("NEO 新一代手部说明", "NEO latest-hand article"), url: ONE_X_HAND }],
  },
  {
    id: "1x-neo-25dof-hand",
    companySlug: "1x-technologies",
    product: "NEO 25-DoF Hand",
    pageUrl: ONE_X_HAND,
    category: "end-effector",
    primary: "end-effector",
    subclass: "integrated-humanoid-hand",
    useCases: ["research", "service", "integration"],
    type: l("NEO 集成式肌腱驱动触觉灵巧手", "Integrated tendon-driven tactile dexterous hand for NEO"),
    integration: l("手部为 NEO 全栈的一部分，不是官网声明的独立通用末端；电机、肌腱、电子、传感器和固件共同集成。", "The hand is part of the NEO stack rather than a stated standalone universal end effector; motors, tendons, electronics, sensing, and firmware are integrated."),
    verification: l("确认是否独立供货、机械/电气接口、控制 API、触觉数据、腕部边界、维护、食品接触声明与 IP68 条件。", "Confirm standalone availability, mechanical/electrical interfaces, control APIs, tactile data, wrist boundary, maintenance, food-contact claim, and IP68 conditions."),
    rows: rows(ONE_X_HAND, l("NEO 手部官方工程说明", "Official NEO hand engineering article"), l("The joints are sensors / Fruit Picking / Hardware", "The joints are sensors / Fruit Picking / Hardware"), [
      ["总自由度（含腕）", "Total degrees of freedom including wrist", "25 DoF"],
      ["全驱动手指与掌部自由度", "Fully actuated finger-and-palm degrees of freedom", "22 DoF"],
      ["腕部自由度", "Wrist degrees of freedom", "3 DoF"],
      ["传动比", "Transmission ratio", "约 5:1-15:1", "Approximately 5:1 to 15:1"],
      ["拇指 CMC 峰值扭矩", "Thumb-CMC peak torque", "3.5 Nm"],
      ["手指 MCP 峰值扭矩", "Finger-MCP peak torque", "2.6 Nm"],
      ["远端屈曲力", "Distal flexion force", "up to 45 N"],
      ["腕部扭矩", "Wrist torque", "17.75 Nm"],
      ["定位精度", "Positioning accuracy", "±0.2 mm"],
      ["防护等级", "Ingress protection", "IP68"],
      ["手指与腕部可靠性测试", "Finger and wrist reliability testing", "数百万循环；腕部在高负载下超过 2,000,000 cycles", "Millions of cycles; wrist beyond 2,000,000 cycles under high loads"],
      ["触觉测量", "Tactile measurements", "法向力、接触位置、剪切", "Normal force, contact location, and shear"],
      ["驱动", "Actuation", "低减速比准直驱肌腱", "Low-ratio quasi-direct-drive tendons"],
      ["产品关系", "Product relationship", "将集成于每台 NEO；未声明独立销售", "Intended for every NEO; standalone sale not stated"],
    ]),
    overview: [
      l("1X 将该手定义为 25 自由度手部组件：22 个手指/掌部自由度加 3 个腕部自由度，全部原生力控并可反向驱动。", "1X defines the assembly as a 25-DoF hand: 22 finger/palm DoF plus three wrist DoF, all natively force-controlled and backdrivable."),
      l("官网说明该手将随每台 NEO 出货，但没有声明作为通用独立末端销售，因此选型页明确保留产品关系边界。", "The company states that the hand will ship on every NEO but does not present it as a universal standalone end effector, so the catalog preserves that product-relationship boundary."),
    ],
    applications: [l("家庭精细操作、手内旋转、工具使用、触觉抓取和机器人学习", "Fine home manipulation, in-hand rotation, tool use, tactile grasping, and robot learning")],
    coverage: "official-complete",
  },
  capabilitySeed(
    "1x-eve-industrial", "1x-technologies", "EVE Industrial", ONE_X_EVE, "robot-platform", "robot-platform", "wheeled-humanoid",
    l("轮式工业双臂人形平台", "Wheeled industrial bimanual humanoid platform"),
    [l("1X 公司时间线记录 EVE 自 2022 年进入客户工厂，当前产品入口仍保留 EVE Industrial。", "1X's company timeline records EVE entering customer factories in 2022, and a current EVE Industrial product entry remains available."), l("当前产品页只提供咨询入口，没有可公开逐项转录的机械规格表。", "The current product page provides an inquiry entry but no public mechanical specification table to transcribe.")],
    [l("工业巡检、安防、移动双臂操作和真实数据采集", "Industrial inspection, security, wheeled bimanual work, and real-world data collection")],
    l("与 1X 自主模型、远程操作和工业任务流程集成。", "Integrated with 1X autonomy models, remote operation, and industrial workflows."),
    l("索取当前 EVE 版本、底盘、负载、续航、末端、传感、接口、安全和支持资料。", "Obtain the current EVE revision, base, payload, endurance, end-effector, sensing, interface, safety, and support material."),
    ["manufacturing", "integration"],
  ),
  capabilitySeed(
    "1x-redwood-ai", "1x-technologies", "Redwood AI", ONE_X_REDWOOD, "model-software", "model-software", "cross-embodiment-vla",
    l("跨 EVE 与 NEO 的视觉语言动作模型", "Cross-embodiment vision-language-action model for EVE and NEO"),
    [l("Redwood 融合语言、视觉和本体感知，并通过不同动作解码器控制 EVE 或 NEO。", "Redwood fuses language, vision, and proprioception and controls EVE or NEO through embodiment-specific action decoders."), l("厂商文章说明模型在 NEO 嵌入式 GPU 上运行；公开结果仍是研发材料，不是客户 SLA。", "The company article states that the model runs on NEO's embedded GPU; published results remain research material rather than a customer SLA.")],
    [l("家庭移动操作、跨本体策略、机器人数据训练与评测", "Home mobile manipulation, cross-embodiment policies, and robot-data training and evaluation")],
    l("与 EVE/NEO 的相机、关节位置、关节力和动作解码器集成。", "Integrates with EVE/NEO cameras, joint positions, joint forces, and action decoders."),
    l("核对模型版本、训练数据、失败分布、人工介入、更新回滚和现场评测。", "Verify model revision, training data, failure distribution, human intervention, update rollback, and site evaluation."),
  ),
];

const sanctuarySeeds: ProductSeed[] = [
  capabilitySeed(
    "sanctuary-phoenix-gen8", "sanctuary-ai", "Phoenix Generation 8", SANCTUARY_PHOENIX_8, "robot-platform", "robot-platform", "wheeled-general-purpose-robot",
    l("轮式通用操作与高质量数据采集机器人", "Wheeled general-manipulation and high-quality data-capture robot"),
    [l("第八代 Phoenix 增强视场、相机分辨率、遥测、音视频和传感器，并采用轮式底盘。", "Phoenix Generation 8 improves field of view, camera resolution, telemetry, audio/video, and sensing and uses a wheeled base."), l("第八代页面没有重申第六代的 5 ft 7 in、155 lb、55 lb 和 3 mph 等数值，因此本记录不跨代继承。", "The Generation 8 page does not restate the Generation 6 figures of 5 ft 7 in, 155 lb, 55 lb, and 3 mph, so this record does not inherit them across generations.")],
    [l("高质量机器人数据采集、工业操作、遥操作与任务学习", "High-quality robot-data capture, industrial manipulation, teleoperation, and task learning")],
    l("与 Carbon/Physical AI、相机、遥测、音视频、轮式底盘和手部共同运行。", "Operates with Carbon/Physical AI, cameras, telemetry, audio/video, wheeled base, and hands."),
    l("索取第八代当前机械、电气、安全、手部、传感器、接口与交付规格，不使用第六代参数代替。", "Obtain current Generation 8 mechanical, electrical, safety, hand, sensing, interface, and delivery specifications rather than substituting Generation 6 figures."),
    ["manufacturing", "research", "integration"],
  ),
  {
    id: "sanctuary-hydraulic-hand-17dof",
    companySlug: "sanctuary-ai",
    product: "17-DoF Hydraulic Hand",
    pageUrl: SANCTUARY_HAND,
    category: "end-effector",
    primary: "end-effector",
    subclass: "hydraulic-dexterous-hand",
    useCases: ["manufacturing", "research", "integration"],
    type: l("人手形液压触觉灵巧手", "Human-form hydraulic tactile dexterous hand"),
    integration: l("与 Sanctuary 的 Physical AI、触觉、液压驱动、遥操作和仿真到真实策略共同工作。", "Works with Sanctuary Physical AI, tactile sensing, hydraulic actuation, teleoperation, and sim-to-real policies."),
    verification: l("确认当前代际、17/21 自由度历史边界、液压站、阀组、触觉接口、力/速度、寿命、泄漏维护和商业供货。", "Confirm current generation, the historical 17/21-DoF boundary, hydraulic supply, valves, tactile interface, force/speed, lifetime, leak maintenance, and commercial availability."),
    rows: [
      ...rows(SANCTUARY_HAND, l("Sanctuary 液压手官方页面", "Official Sanctuary hydraulic-hand page"), l("Human-Level Dexterity", "Human-Level Dexterity"), [
        ["当前路线自由度", "Current-roadmap degrees of freedom", "17 DoF"],
        ["驱动", "Actuation", "微型液压驱动", "Miniaturized hydraulic actuation"],
        ["触觉", "Tactile sensing", "集成触觉，覆盖抓持表面", "Integrated tactile sensing across grasping surfaces"],
        ["结构尺度", "Form factor", "人手尺度", "Human-hand scale"],
      ]),
      ...rows(SANCTUARY_HAND_TEST, l("Sanctuary 手部测试说明", "Sanctuary hand test article"), l("In-hand manipulation / actuator test", "In-hand manipulation / actuator test"), [
        ["历史测试手自由度", "Historical tested-hand degrees of freedom", "21 DoF"],
        ["液压阀执行器耐久测试", "Hydraulic-valve actuator endurance test", ">2,000,000,000 cycles（厂商称无泄漏或退化迹象）", ">2,000,000,000 cycles (company stated no signs of leakage or degradation)"],
      ]),
    ],
    overview: [
      l("Sanctuary 当前路线页写明下一代液压手为 17 自由度；较早测试文章的 21 自由度属于历史手部代际，二者按来源时点分别保留。", "Sanctuary's current roadmap page states 17 DoF for the next-generation hydraulic hand; the 21-DoF figure in an earlier test article belongs to a historical hand generation, and both are retained with source dates."),
      l("官网强调液压功率密度、触觉和高占空比，但没有公开完整尺寸、质量、峰值力、液压压力、流量、精度和接口表。", "The site emphasizes hydraulic power density, touch, and high-duty-cycle operation but does not publish a complete dimensions, mass, peak force, pressure, flow, accuracy, or interface table."),
    ],
    applications: [l("工业精细操作、手内旋转、插接、工具使用和触觉策略研究", "Industrial fine manipulation, in-hand rotation, insertion, tool use, and tactile-policy research")],
    coverage: "official-partial",
    sourceLinks: [{ label: l("手部里程碑", "Hand milestones"), url: SANCTUARY_MILESTONES }, { label: l("历史 21 自由度测试", "Historical 21-DoF test"), url: SANCTUARY_HAND_TEST }],
  },
  capabilitySeed(
    "sanctuary-carbon-physical-ai", "sanctuary-ai", "Carbon / Physical AI", SANCTUARY_PHOENIX_6, "model-software", "model-software", "physical-ai-control-platform",
    l("通用机器人认知、任务与运动控制平台", "Cognitive, task, and motion-control platform for general-purpose robots"),
    [l("Carbon 的公开说明包括自然语言到动作、可解释/可审计任务与运动计划、符号推理、LLM、深度/强化学习、仿真、人工监督和机群管理。", "Published Carbon capabilities include language-to-action, explainable and auditable task/motion plans, symbolic reasoning, LLMs, deep/reinforcement learning, simulation, human supervision, and fleet management."), l("2026 年公司扩展到在现有和下一代工业机器人上部署 Physical AI，因此软件记录与 Phoenix 本体分开。", "In 2026 the company expanded Physical AI deployment to existing and next-generation industrial robots, so the software record is separate from Phoenix hardware.")],
    [l("工业任务策略、机器人控制、遥操作、仿真训练和机群管理", "Industrial task policies, robot control, teleoperation, simulation training, and fleet management")],
    l("可与 Phoenix 或其他工业机器人本体、视觉、触觉和企业任务系统集成。", "Can integrate with Phoenix or other industrial robot embodiments, vision, touch, and enterprise task systems."),
    l("核对支持的本体、接口、任务成功率、训练数据、人工接管、解释/审计输出和版本生命周期。", "Verify supported embodiments, interfaces, task success, training data, human intervention, explainability/audit outputs, and version lifecycle."),
    ["manufacturing", "research", "integration"],
  ),
];

type LaraSpec = { model: string; payload: string; reach: string; mass: string };
const laraSpecs: LaraSpec[] = [
  { model: "LARA 3", payload: "3 kg", reach: "590 mm", mass: "18 kg" },
  { model: "LARA 5", payload: "5 kg", reach: "800 mm", mass: "26 kg" },
  { model: "LARA 8", payload: "8 kg", reach: "1300 mm", mass: "48 kg" },
  { model: "LARA 10", payload: "10 kg", reach: "1000 mm", mass: "45 kg" },
  { model: "LARA LM 15", payload: "15 kg", reach: "1600 mm", mass: "67 kg" },
  { model: "LARA LM 20", payload: "20 kg", reach: "1800 mm", mass: "98 kg" },
  { model: "LARA LM 25L", payload: "25 kg", reach: "1800 mm", mass: "101 kg" },
  { model: "LARA LM 30", payload: "30 kg", reach: "1300 mm", mass: "98 kg" },
  { model: "LARA LM 30L", payload: "30 kg", reach: "1800 mm", mass: "126 kg" },
];

const laraSeeds: ProductSeed[] = laraSpecs.map((spec) => ({
  id: `neura-${spec.model.toLowerCase().replace(/\s+/g, "-")}`,
  companySlug: "neura-robotics",
  product: spec.model,
  pageUrl: NEURA_LARA,
  category: "robot-platform",
  primary: "robot-platform",
  subclass: "collaborative-arm",
  useCases: ["manufacturing", "integration"],
  type: l("六轴协作机器人", "Six-axis collaborative robot"),
  integration: l("通过标准化法兰、EtherCAT、IO-Link、EtherNet/IP、PROFINET、Modbus TCP/RTU、RS-485 和 GPIO 接入工作站。", "Integrates into workcells through standardized flanges, EtherCAT, IO-Link, EtherNet/IP, PROFINET, Modbus TCP/RTU, RS-485, and GPIO."),
  verification: l("确认具体控制器、IP54/IP66 版本、安装姿态、负载重心、速度、精度、安全等级、力矩传感器选件和现场总线。", "Confirm controller, IP54/IP66 edition, mounting pose, payload center of gravity, speed, accuracy, safety level, force-torque option, and fieldbus."),
  rows: rows(NEURA_LARA, l("LARA 官方产品页", "Official LARA product page"), l(`${spec.model} 型号区块及系列能力`, `${spec.model} model block and family capabilities`), [
    ["自由度", "Degrees of freedom", "6 DoF"],
    ["负载", "Payload", spec.payload],
    ["臂展", "Reach", spec.reach],
    ["本体质量", "Robot mass", spec.mass],
    ["系列最高重复定位精度", "Family maximum repeatability", "±0.02 mm"],
    ["系列防护选项", "Family ingress-protection options", "IP54 / IP66"],
    ["安全架构", "Safety architecture", "PLd Cat. 3 / SIL2"],
    ["编码器", "Encoders", "24 bit"],
    ["可选力矩传感器", "Optional force-torque sensor", "6 DoF"],
    ["高速 GPIO", "High-speed GPIO", "8"],
    ["标准接口", "Standard interfaces", "EtherCAT、IO-Link、EtherNet/IP、PROFINET、Modbus TCP/RTU、RS-485", "EtherCAT, IO-Link, EtherNet/IP, PROFINET, Modbus TCP/RTU, and RS-485"],
    ["运行方式", "Operating mode", "连续 24/7（厂商系列说明）", "Continuous 24/7 (manufacturer family statement)"],
  ]),
  overview: [
    l(`${spec.model} 是当前 LARA 系列的具名型号，官方页面明确给出 ${spec.payload} 负载、${spec.reach} 臂展和 ${spec.mass} 本体质量。`, `${spec.model} is a named current LARA model. The official page states ${spec.payload} payload, ${spec.reach} reach, and ${spec.mass} robot mass.`),
    l("IP、精度、安全和接口在页面上按系列披露，报价时必须确认具体型号与配置是否全部适用。", "IP, accuracy, safety, and interfaces are published at family level; applicability to the quoted model and configuration must be confirmed."),
  ],
  applications: [l("装配、上下料、焊接、打磨、点胶、检测和码垛", "Assembly, machine tending, welding, finishing, dispensing, inspection, and palletizing")],
  coverage: "official-complete",
}));

type MairaSpec = { model: string; payload: string; reach: string; mass: string };
const mairaSpecs: MairaSpec[] = [
  { model: "MAiRA S", payload: "15-18 kg", reach: "1100 mm", mass: "51 kg" },
  { model: "MAiRA M", payload: "12-14 kg", reach: "1400 mm", mass: "53 kg" },
  { model: "MAiRA L", payload: "9-11 kg", reach: "1600 mm", mass: "56 kg" },
];

const mairaSeeds: ProductSeed[] = mairaSpecs.map((spec) => ({
  id: `neura-${spec.model.toLowerCase().replace(/\s+/g, "-")}`,
  companySlug: "neura-robotics",
  product: spec.model,
  pageUrl: NEURA_MAIRA,
  category: "robot-platform",
  primary: "robot-platform",
  subclass: "cognitive-arm",
  useCases: ["manufacturing", "research", "integration"],
  type: l("七轴认知机器人机械臂", "Seven-axis cognitive robot arm"),
  integration: l("集成 3D 视觉、360° 麦克风阵列、语音、NEURA Touch 六维力矩、无接触人检测和本地 AI。", "Integrates 3D vision, a 360-degree microphone array, voice, NEURA Touch six-axis force-torque sensing, touchless human detection, and local AI."),
  verification: l("确认负载区间对应的配置、末端、安装姿态、精度、IP65、安全认证范围、视觉/声音/力矩选件和控制接口。", "Confirm the configuration behind the payload range, end effector, mounting pose, accuracy, IP65, certification scope, vision/audio/force-torque options, and control interfaces."),
  rows: rows(NEURA_MAIRA, l("MAiRA 官方产品页", "Official MAiRA product page"), l(`${spec.model} 型号区块及系列能力`, `${spec.model} model block and family capabilities`), [
    ["自由度", "Degrees of freedom", "7 DoF"],
    ["负载范围", "Payload range", spec.payload],
    ["臂展", "Reach", spec.reach],
    ["本体质量", "Robot mass", spec.mass],
    ["防护等级", "Ingress protection", "IP65"],
    ["人检测半径", "Human-detection radius", "3 m"],
    ["安全等级", "Safety level", "PL e / SIL 3（厂商称 TÜV 批准设计）", "PL e / SIL 3 (manufacturer states a TUV-approved design)"],
    ["力矩传感器", "Force-torque sensor", "6 DoF NEURA Touch"],
    ["关节编码", "Joint encoders", "每轴双编码器", "Dual encoders on each axis"],
    ["视觉", "Vision", "3D 视觉相机", "3D vision camera"],
    ["语音", "Voice", "360° 麦克风阵列与扬声器", "360-degree microphone array and speaker"],
  ]),
  overview: [
    l(`${spec.model} 是 MAiRA 当前三个尺寸级别之一；页面公开 ${spec.payload} 负载区间、${spec.reach} 臂展和 ${spec.mass} 质量。`, `${spec.model} is one of three current MAiRA size classes; the page publishes a ${spec.payload} payload range, ${spec.reach} reach, and ${spec.mass} mass.`),
    l("负载以区间形式公开，可能对应配置或工况差异；没有报价配置时不把区间上限当作无条件额定值。", "Payload is published as a range that may reflect configuration or operating-condition differences; the upper bound is not treated as an unconditional rated value without the quoted configuration."),
  ],
  applications: [l("认知装配、视觉操作、力控、语音示教、检测和柔性制造", "Cognitive assembly, vision-guided work, force control, voice teaching, inspection, and flexible manufacturing")],
  coverage: "official-complete",
}));

type MavSpec = { model: string; payload: string; speed: string; runtime: string; accuracy: string };
const mavSpecs: MavSpec[] = [
  { model: "MAV 500", payload: "500 kg", speed: "1.5 m/s", runtime: "8 h", accuracy: "±5 mm" },
  { model: "MAV 1500", payload: "1500 kg", speed: "1.5 m/s", runtime: "10 h", accuracy: "±5 mm" },
  { model: "MAV+", payload: "500-1000 kg", speed: "1.5 m/s", runtime: "7-8 h", accuracy: "±7 mm" },
];

const mavSeeds: ProductSeed[] = mavSpecs.map((spec) => ({
  id: `neura-${spec.model.toLowerCase().replace(/\s+/g, "-").replace("+", "plus")}`,
  companySlug: "neura-robotics",
  product: spec.model,
  pageUrl: NEURA_MAV,
  category: "robot-platform",
  primary: "robot-platform",
  subclass: spec.model === "MAV+" ? "mobile-manipulator-base" : "autonomous-mobile-robot",
  useCases: ["manufacturing", "logistics", "integration"],
  type: l("自主移动运输平台", "Autonomous mobile transport platform"),
  integration: l("支持 Navitec 或 ROS 2 / VDA5050 路线，可结合 LARA、MAiRA、货架或升降模块组成移动工作站。", "Supports Navitec or ROS 2/VDA5050 paths and can combine with LARA, MAiRA, shelves, or lifts as a mobile workcell."),
  verification: l("确认平台型号、负载工况、精度条件、续航/充电、导航栈、升降或机械臂附件、安全区和地面条件。", "Confirm platform model, payload condition, accuracy condition, endurance/charging, navigation stack, lift or arm add-ons, safety zones, and floor conditions."),
  rows: rows(NEURA_MAV, l("MAV 官方产品页", "Official MAV product page"), l(`${spec.model} 型号区块及系列能力`, `${spec.model} model block and family capabilities`), [
    ["负载", "Payload", spec.payload],
    ["最大速度", "Maximum speed", spec.speed],
    ["运行时间", "Runtime", spec.runtime],
    ["定位精度", "Positioning accuracy", spec.accuracy],
    ["防护等级", "Ingress protection", "IP44"],
    ["安全检测", "Safety detection", "360° 激光扫描", "360-degree laser scanning"],
    ["安全架构", "Safety architecture", "PLd / Category 3（ISO 13849-1）", "PLd / Category 3 (ISO 13849-1)"],
    ["导航选项", "Navigation options", "Navitec 或 ROS 2 / VDA5050", "Navitec or ROS 2 / VDA5050"],
    ["充电", "Charging", "支持感应充电连续运行", "Inductive charging for continuous operation"],
  ]),
  overview: [
    l(`${spec.model} 的当前页面公开 ${spec.payload} 负载、${spec.speed} 速度、${spec.runtime} 运行时间和 ${spec.accuracy} 定位精度。`, `The current ${spec.model} page publishes ${spec.payload} payload, ${spec.speed} speed, ${spec.runtime} runtime, and ${spec.accuracy} positioning accuracy.`),
    l("续航与精度缺少完整载荷、地面、速度和充电工况，项目验收应重新定义条件。", "Runtime and accuracy lack complete load, floor, speed, and charging conditions; project acceptance should define those conditions again."),
  ],
  applications: [l("仓内运输、生产物流、移动上下料和移动机械臂工作站", "Intralogistics transport, production logistics, mobile machine tending, and mobile-manipulator workcells")],
  coverage: "official-complete",
}));

const neuraSeeds: ProductSeed[] = [
  {
    id: "neura-4ne1",
    companySlug: "neura-robotics",
    product: "4NE1",
    pageUrl: NEURA_4NE1,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "general-purpose-humanoid",
    useCases: ["research", "manufacturing", "service"],
    type: l("认知通用人形机器人", "Cognitive general-purpose humanoid"),
    integration: l("基于 Neuraverse，集成 3D 视觉、语音、力矩感知、智能皮肤和无接触人检测。", "Built on Neuraverse with 3D vision, voice, force-torque sensing, smart skin, and touchless human detection."),
    verification: l("确认硬件代际、可交付配置、手臂/前臂、自由度、续航、手部、传感、安全认证、API 和任务软件。", "Confirm hardware generation, deliverable configuration, arms/forearms, DoF, endurance, hands, sensing, certification, APIs, and task software."),
    rows: rows(NEURA_4NE1, l("4NE1 官方产品页", "Official 4NE1 product page"), l("4NE-1 Humanoid Robot Spec Sheet", "4NE-1 Humanoid Robot Spec Sheet"), [
      ["身高", "Height", "180 cm"],
      ["整机质量", "Robot mass", "80 kg"],
      ["负载", "Payload", "15 kg"],
      ["最大速度", "Maximum speed", "3 km/h"],
      ["前臂", "Forearms", "可更换", "Exchangeable"],
      ["视觉", "Vision", "3D 视觉；物体、环境与手势识别", "3D vision with object, environment, and gesture recognition"],
      ["力矩感知", "Force-torque sensing", "集成", "Integrated"],
      ["无接触人检测", "Touchless human detection", "集成", "Integrated"],
      ["平台", "Platform", "Neuraverse"],
    ]),
    overview: [
      l("4NE1 当前产品页公开 180 cm、80 kg、15 kg 与 3 km/h 四项主要数值，并列出可更换前臂和多模态感知。", "The current 4NE1 page publishes four main figures: 180 cm, 80 kg, 15 kg, and 3 km/h, along with exchangeable forearms and multimodal sensing."),
      l("页面没有公开完整关节、手部、续航、精度和环境参数；公司其他年份的 Gen 1/2/3 名称不在缺乏型号对照时混入本记录。", "The page does not publish complete joint, hand, endurance, accuracy, or environmental parameters; Gen 1/2/3 names from other years are not merged without a model crosswalk."),
    ],
    applications: [l("工业协作、服务任务、通用人形研究和 Neuraverse 应用开发", "Industrial collaboration, service tasks, general humanoid research, and Neuraverse application development")],
    coverage: "official-complete",
  },
  ...laraSeeds,
  ...mairaSeeds,
  ...mavSeeds,
  capabilitySeed(
    "neura-mipa-gen3", "neura-robotics", "MiPA Gen 3", NEURA_MIPA, "robot-platform", "robot-platform", "service-robot",
    l("模块化智能个人助理与服务机器人", "Modular intelligent personal-assistant and service robot"),
    [l("MiPA 结合 SLAM、LiDAR、相机、环境传感、语音、触屏、投影和模块化附件。", "MiPA combines SLAM, LiDAR, cameras, environmental sensing, voice, touch display, projection, and modular attachments."), l("当前网页与 Gen 3 两页资料没有公开尺寸、质量、负载、速度或电池表，因此保留为能力记录。", "The current web page and two-page Gen 3 sheet do not publish dimensions, mass, payload, speed, or a battery table, so this remains a capability record.")],
    [l("接待、配送、照护、零售、家庭辅助和开发者服务机器人应用", "Reception, delivery, care, retail, home assistance, and developer service-robot applications")],
    l("通过 Wi-Fi、5G/Matter 等通信、API、模块化背包/货架/桌面/挂钩和自动充电接入场景。", "Integrates through Wi-Fi, 5G/Matter and other communications, APIs, modular backpack/shelf/table/hook attachments, and automatic charging."),
    l("索取具体尺寸、负载、续航、速度、导航精度、传感器型号、安全认证、API 和可交付附件表。", "Obtain exact dimensions, payload, endurance, speed, navigation accuracy, sensor models, certification, APIs, and deliverable attachment list."),
    ["service", "research", "integration"],
  ),
  {
    id: "neura-omnisensor",
    companySlug: "neura-robotics",
    product: "NEURA OmniSensor",
    pageUrl: NEURA_OMNISENSOR,
    category: "perception",
    primary: "perception",
    subclass: "human-detection-sensor",
    useCases: ["manufacturing", "integration"],
    type: l("多模态工业人检测与安全区域传感器", "Multimodal industrial human-detection and safety-zone sensor"),
    integration: l("单至四模块组成可配置检测区域，为机器人、AGV 或机器提供自动停止和恢复信号。", "One to four modules form configurable detection zones and provide automatic stop-and-restart signals for robots, AGVs, or machines."),
    verification: l("核对认证、响应时间定义、安装高度、盲区、照明/粉尘条件、四模块覆盖、输出接口和安全 PLC 集成。", "Verify certification, response-time definition, mounting height, blind zones, lighting/dust conditions, four-module coverage, outputs, and safety-PLC integration."),
    rows: rows(NEURA_OMNISENSOR, l("OmniSensor 官方产品页", "Official OmniSensor product page"), l("Technical specifications", "Technical specifications"), [
      ["响应时间", "Response time", "50 ms"],
      ["传感技术", "Sensor technology", "多模态传感融合", "Multimodal sensor fusion"],
      ["视场（1-4 模块）", "Field of view (one to four modules)", "120° × 80° 至 360° × 180°", "120° x 80° to 360° x 180°"],
      ["检测距离", "Detection range", "≤4 m"],
      ["覆盖", "Coverage", "最高 360°"],
    ]),
    overview: [
      l("OmniSensor 当前页面有独立 Technical specifications 区块，披露响应时间、视场和检测距离。", "The current OmniSensor page has a dedicated Technical specifications block publishing response time, field of view, and range."),
      l("页面使用工业安全场景表述，但具体功能安全证书和系统架构仍需在项目资料中核验。", "The page uses industrial-safety positioning, while the exact functional-safety certificate and system architecture still require project-level verification."),
    ],
    applications: [l("工业人员检测、协作区、AGV/机器人安全区域和自动复位", "Industrial human detection, collaborative zones, AGV/robot safety zones, and automatic restart")],
    coverage: "official-complete",
  },
  capabilitySeed(
    "neura-sensekit", "neura-robotics", "NEURA SenseKit", NEURA_SENSEKIT, "perception", "perception", "cobot-sensing-kit",
    l("为通用协作机器人增加 3D 视觉、语音、手势与本地 AI 的套件", "Kit adding 3D vision, voice, gesture input, and local AI to general cobots"),
    [l("SenseKit 包含 3D 视觉、麦克风阵列、触摸按钮、语音反馈和运行 AURA 的本地计算单元。", "SenseKit includes 3D vision, a microphone array, touch buttons, voice feedback, and onboard compute running AURA."), l("官网称适用于带 ISO 法兰的不同品牌协作机器人，但没有公开型号兼容清单和尺寸功耗表。", "The site states support for cobots with ISO flanges across brands but does not publish a model compatibility list or dimensions/power table.")],
    [l("抓取、质量检测、语音控制和协作机器人感知升级", "Picking, quality inspection, voice control, and cobot perception upgrades")],
    l("安装在带 ISO 法兰的协作机器人上，并通过 AURA 与 Neuraverse 应用运行。", "Mounts on cobots with an ISO flange and operates through AURA and Neuraverse applications."),
    l("确认法兰、负载影响、视场、计算平台、延迟、标定、支持机器人、接口和软件许可。", "Confirm flange, payload impact, field of view, compute, latency, calibration, supported robots, interfaces, and software licenses."),
    ["manufacturing", "research", "integration"],
  ),
  capabilitySeed(
    "neura-teach", "neura-robotics", "NEURA Teach", NEURA_TEACH, "model-software", "model-software", "robot-teaching",
    l("图形化机器人示教与应用编程界面", "Graphical robot-teaching and application-programming interface"),
    [l("NEURA Teach 面向无代码/低代码示教、流程配置和机器人应用运行。", "NEURA Teach supports no-code/low-code teaching, workflow configuration, and robot-application operation."), l("当前页面未公开版本兼容矩阵、许可层级或 API 完整清单。", "The current page does not publish a complete version-compatibility matrix, license tiers, or API list.")],
    [l("机器人示教、工作流配置、应用部署和操作员交互", "Robot teaching, workflow configuration, application deployment, and operator interaction")],
    l("与 NEURA 机器人控制器、应用库和 Neuraverse 连接。", "Connects to NEURA robot controllers, application libraries, and Neuraverse."),
    l("确认支持型号、软件版本、离线/在线编辑、权限、备份、验证、许可和更新策略。", "Confirm supported models, software versions, offline/online editing, permissions, backup, validation, licensing, and update policy."),
  ),
  capabilitySeed(
    "neura-touch", "neura-robotics", "NEURA Touch", NEURA_TOUCH, "perception", "perception", "force-torque-sensor",
    l("机器人六维力矩感知与触觉交互模块", "Six-axis robot force-torque sensing and tactile-interaction module"),
    [l("NEURA Touch 为 MAiRA 等平台提供力矩反馈、手动引导和接触任务能力。", "NEURA Touch provides force-torque feedback, hand guidance, and contact-task capability for platforms including MAiRA."), l("当前网页缺少完整量程、精度、采样率、过载、尺寸、质量和电气接口表。", "The current page lacks a complete range, accuracy, sample-rate, overload, dimensions, mass, and electrical-interface table.")],
    [l("力控装配、打磨、手动引导、接触检测和机器人研究", "Force-controlled assembly, finishing, hand guidance, contact detection, and robotics research")],
    l("作为机器人腕部/法兰感知模块与 NEURA 控制器和应用软件连接。", "Connects as a robot wrist/flange sensing module to NEURA controllers and application software."),
    l("索取具体型号、测量轴、量程、精度、采样率、过载、法兰、通信和安全资料。", "Obtain the exact model, axes, ranges, accuracy, sample rate, overload, flange, communications, and safety material."),
    ["manufacturing", "research", "integration"],
  ),
];

const productSeeds: ProductSeed[] = [
  ...agilitySeeds,
  ...figureSeeds,
  ...oneXSeeds,
  ...sanctuarySeeds,
  ...neuraSeeds,
];

export const getVerifiedWaveTwelveProductRecords = (
  locale: Locale,
  companies: CompanyProfile[],
): FinderExpansionRecord[] => {
  const companyBySlug = new Map(companies.map((company) => [company.slug, company]));
  return productSeeds.map((seed) => {
    const company = companyBySlug.get(seed.companySlug);
    if (!company) throw new Error(`Wave-twelve product company is missing: ${seed.companySlug}`);
    return toRecord(locale, company, seed);
  });
};

export const waveTwelveCatalogProductCount = productSeeds.length;
