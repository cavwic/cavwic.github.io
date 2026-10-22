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
type CompanySlug = typeof waveTenCompanySlugs[number];

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

const AUBO_HOME = "https://www.aubo-robotics.cn/";
const AUBO_ABOUT = "https://www.aubo-robotics.cn/about";
const AUBO_I_MANUAL = "https://developer.aubo-robotics.cn/en/hardware/user_manual/robot_arm_i_user_manual.html";
const AUBO_PRODUCTS = "https://www.aubo-robotics.cn/products";
const DOBOT_HOME = "https://www.dobot-robots.com/";
const DOBOT_ABOUT = "https://www.dobot-robots.com/about/about-dobot?lang=en";
const DOBOT_CRA = "https://www.dobot-robots.com/products/cr-series/cr3.html?lang=en";
const KASSOW_HOME = "https://www.kassowrobots.com/";
const KASSOW_ABOUT = "https://www.kassowrobots.com/about-us";
const KASSOW_SERIES = "https://www.kassowrobots.com/products/7-axis-collaborative-robot-arm-kr-series";
const KASSOW_NEW = "https://www.kassowrobots.com/products/new-models";
const KASSOW_BROCHURE = "https://cdn.prod.website-files.com/63d54839f7e09bd5bf27f6c2/6a96bfbd376525e3e5afa656_EN_KRSeries_brochure_2025_kassowrobots.pdf";

export const waveTenCompanySlugs = ["aubo-robotics", "dobot", "kassow-robots"] as const;
const companySlugSet = new Set<string>(waveTenCompanySlugs);
export const isWaveTenCompanySlug = (slug: string) => companySlugSet.has(slug);

const patchAubo = (company: CompanyProfile, locale: Locale): CompanyProfile => ({
  ...company,
  legalName: t(locale, l("遨博（北京）智能科技股份有限公司", "AUBO (Beijing) Robotics Technology Co., Ltd.")),
  country: t(locale, l("中国", "China")),
  headquarters: t(locale, l("中国北京", "Beijing, China")),
  founded: "2015",
  officialUrl: AUBO_HOME,
  valueChainRole: t(locale, l("协作机器人、移动操作机器人与具身智能平台厂商", "Collaborative-robot, mobile-manipulation, and embodied-intelligence platform manufacturer")),
  positioning: t(locale, l("以 i、iS、iS(FT)、iS Pro、iS(SE)、C、S 和 G 系列覆盖通用、高性能、力控及专项协作应用，并延伸到移动操作与具身智能系统。", "Covers general, higher-performance, force-controlled, and application-specific collaboration through the i, iS, iS(FT), iS Pro, iS(SE), C, S, and G families, extending into mobile manipulation and embodied systems.")),
  strengths: [
    t(locale, l("现行 i 系列手册统一公开七个型号的机械、运动、环境、功耗和认证字段。", "The current i-series manual publishes mechanical, motion, environmental, power, and certification fields for seven models in one controlled source.")),
    t(locale, l("官网产品目录同时区分 iS、力控、控制柜、移动底座和应用方案，便于按系统层级确认配置。", "The product catalog also separates iS, force-control, controller, mobile-base, and application offerings for system-level configuration checks.")),
    t(locale, l("研发历程从 2010 年协作机器人研发、2013 年首代产品到 2015 年公司成立和 i5 销售，具有连续的官方时间线。", "The official timeline runs from cobot R&D in 2010 and a first-generation product in 2013 to company formation and i5 sales in 2015.")),
  ],
  products: ["AUBO-i series", "AUBO-iS series", "AUBO-iS(FT) series", "AUBO-iS Pro series", "AUBO-iS(SE) series", "AUBO-C series", "AUBO-S series", "AUBO-G series", "AUBO controllers", "mobile manipulators"],
  fit: [
    t(locale, l("3C、汽车、新能源、半导体、机械加工、家电和医疗健康自动化。", "3C, automotive, new-energy, semiconductor, machining, appliance, and healthcare automation.")),
    t(locale, l("装配、上下料、焊接、打磨、检测、码垛和柔性搬运。", "Assembly, machine tending, welding, finishing, inspection, palletizing, and flexible handling.")),
    t(locale, l("需要力控、洁净、移动操作或本地化控制系统的集成项目。", "Integration projects requiring force control, cleanroom compatibility, mobile manipulation, or locally developed controls.")),
  ],
  overview: [
    t(locale, l("遨博官方资料将公司创立时间列为 2015 年，前序研发可追溯到 2010 年。当前产品覆盖协作机械臂、控制器、移动操作和具身智能方向；官网关于市场地位与自主化程度的表述属于厂商口径。", "AUBO's official material dates company formation to 2015 and traces preceding R&D to 2010. Its current catalog covers cobot arms, controllers, mobile manipulation, and embodied intelligence; website claims about market position and localization are manufacturer statements.")),
    t(locale, l("本批次按 2026 年 8 月 27 日发布的 i 系列手册，建立 i3、i5、i7、i10、i12、i16 和 i20 七条型号记录。旧宣传册与现行网页在个别质量和精度数字上存在差异，因此仓库以标明版本的现行手册为基准。", "This wave creates seven model records for i3, i5, i7, i10, i12, i16, and i20 from the i-series manual released on 27 August 2026. Older brochures and current product pages differ on some mass and repeatability figures, so the repository uses the versioned current manual as its baseline.")),
    t(locale, l("手册明确指出，协作功能不替代系统集成商对末端、外围设备、现场环境和人员活动区域的整体风险评估。", "The manual explicitly states that collaborative functions do not replace the integrator's whole-system risk assessment covering end tools, peripherals, the site environment, and human activity zones.")),
  ],
  businessAreas: [
    t(locale, l("六轴协作机器人本体与控制器", "Six-axis cobot arms and controllers")),
    t(locale, l("力控、洁净和专项应用机器人", "Force-controlled, cleanroom, and application-specific robots")),
    t(locale, l("移动操作与具身智能系统", "Mobile manipulation and embodied-intelligence systems")),
  ],
  customerGroups: [
    t(locale, l("汽车、3C、新能源、半导体、机械加工和消费品制造商", "Automotive, 3C, new-energy, semiconductor, machining, and consumer-goods manufacturers")),
    t(locale, l("协作自动化、移动操作和医疗健康设备集成商", "Collaborative-automation, mobile-manipulation, and healthcare-equipment integrators")),
    t(locale, l("高校、科研机构和机器人开发团队", "Universities, research institutes, and robotics developers")),
  ],
  milestones: [
    { date: "2010", event: t(locale, l("官方时间线记录协作机器人研发启动。", "The official timeline records the start of cobot R&D.")) },
    { date: "2013", event: t(locale, l("第一代协作机器人产品面世。", "The first-generation cobot product appeared.")) },
    { date: "2015", event: t(locale, l("公司成立，AUBO-i5 开始全球销售。", "The company was established and AUBO-i5 entered global sales.")) },
    { date: "2017", event: t(locale, l("i3、i7 和 i10 发布，并取得多地区产品认证。", "i3, i7, and i10 were launched and received certifications in multiple regions.")) },
    { date: "2019", event: t(locale, l("i16、iV 和 iF 系列发布，承担国家重点研发项目。", "The i16, iV, and iF families were released and national R&D projects were undertaken.")) },
  ],
  catalogScope: t(locale, l("本批次逐项转录现行 i 系列七个型号。iS、iS(FT)、iS Pro、iS(SE)、C、S、G、控制器与移动操作产品仍待型号级补录。", "This wave transcribes all seven current i-series models field by field. iS, iS(FT), iS Pro, iS(SE), C, S, G, controllers, and mobile-manipulation products still need model-level records.")),
  catalogCoverage: "model-partial",
  verificationFocus: t(locale, l("锁定手册版本、型号、负载曲线、臂展、运动范围、控制器、末端、洁净和认证配置，以及整机风险评估。", "Lock the manual revision, model, load curve, reach, motion limits, controller, tooling, cleanroom and certified configuration, and whole-system risk assessment.")),
  presalesQuestions: [
    t(locale, l("现行 i 系列还是 iS/力控系列更符合负载、精度、速度和环境要求？", "Does the current i family or an iS/force-control family better fit payload, accuracy, speed, and environmental requirements?")),
    t(locale, l("负载与工具重心组合是否落在手册负载曲线内？", "Does the payload and tool-center-of-gravity combination remain within the manual's load-deflection curve?")),
    t(locale, l("控制器、AuboStudio、SDK/ROS、现场总线、安全 I/O 和认证版本如何验收？", "How will the controller, AuboStudio, SDK/ROS, fieldbus, safety I/O, and certified revision be accepted?")),
  ],
  reviewedAt: "2026-09-04",
});

const patchDobot = (company: CompanyProfile, locale: Locale): CompanyProfile => ({
  ...company,
  legalName: t(locale, l("深圳市越疆科技股份有限公司", "Shenzhen Dobot Corp Ltd")),
  country: t(locale, l("中国", "China")),
  headquarters: t(locale, l("中国深圳", "Shenzhen, China")),
  founded: "2015",
  officialUrl: DOBOT_HOME,
  valueChainRole: t(locale, l("协作机器人、桌面机械臂、教育机器人与具身智能平台厂商", "Collaborative-robot, desktop-arm, education-robot, and embodied-intelligence platform manufacturer")),
  positioning: t(locale, l("产品线覆盖 CRA/CRAS/CR/CRS 工业协作机器人、MG400、M1 Pro、Nova 与 Magician 桌面及教育平台，并延伸到 ATOM、X-Trainer 和 Rover X1。", "The catalog spans CRA/CRAS/CR/CRS industrial cobots, MG400, M1 Pro, Nova, and Magician desktop and education platforms, extending into ATOM, X-Trainer, and Rover X1.")),
  strengths: [
    t(locale, l("当前 CRA 系列在同一官方表中提供 3 kg 至 30 kg 负载和 620 mm 至 1800 mm 工作半径的十个型号。", "The current CRA table provides ten models spanning 3 kg to 30 kg payload and 620 mm to 1,800 mm reach.")),
    t(locale, l("产品矩阵同时覆盖桌面、SCARA、教育与工业协作场景，但不同系列的软件、安全和连续工况边界不同。", "The portfolio also covers desktop, SCARA, education, and industrial collaboration, with different software, safety, and duty-cycle boundaries by family.")),
    t(locale, l("公司官网提供从 2015 年成立、产品发布到 2024 年港交所上市和后续具身智能产品的时间线。", "The official site provides a timeline from the 2015 founding and product launches through the 2024 Hong Kong listing and later embodied-intelligence products.")),
  ],
  products: ["CRA series", "CRAS series", "CR series", "CRS series", "MG400", "M1 Pro", "Nova series", "Magician series", "ATOM", "X-Trainer", "Rover X1"],
  fit: [
    t(locale, l("电子、汽车、金属、半导体、食品饮料、零售和教育自动化。", "Electronics, automotive, metal, semiconductor, food-and-beverage, retail, and education automation.")),
    t(locale, l("装配、焊接、上下料、码垛、打磨、检测和教学实验。", "Assembly, welding, machine tending, palletizing, finishing, inspection, and teaching labs.")),
    t(locale, l("桌面自动化、机器人数据采集和具身智能验证。", "Desktop automation, robot-data collection, and embodied-intelligence validation.")),
  ],
  overview: [
    t(locale, l("越疆于 2015 年在深圳成立。官网时间线记录 2016 年发布 Magician 和 M1、2019 年发布 CR5、2020 年扩展 CR 系列并发布 MG400、2024 年在香港联交所主板上市、2025 年发布 ATOM。", "Dobot was founded in Shenzhen in 2015. Its official timeline records Magician and M1 launches in 2016, CR5 in 2019, CR-family expansion and MG400 in 2020, listing on the Hong Kong Stock Exchange Main Board in 2024, and ATOM in 2025.")),
    t(locale, l("本批次把 CRA 页面中的 CR3A、CR5A、CR7A、CR6AL、CR10A、CR12A、CR16A、CR16AL、CR20A 和 CR30A 建为独立型号。页面表格有合并单元格且 CR20A/CR30A 的 IP 行出现异常值，本仓只记录可无歧义归属的 IP54 范围，不将异常单元格解释成防护等级。", "This wave creates individual records for CR3A, CR5A, CR7A, CR6AL, CR10A, CR12A, CR16A, CR16AL, CR20A, and CR30A from the CRA page. Because the merged-cell table shows anomalous values in the CR20A/CR30A IP row, the repository records IP54 only where attribution is unambiguous and does not reinterpret the anomalous cells as protection ratings.")),
    t(locale, l("官网披露的累计出货、国家覆盖和市场排名属于厂商陈述；选型仍应以订单型号、当前手册、负载曲线、功能安全文件和现场验收为准。", "Cumulative shipments, country coverage, and market-ranking claims on the website are manufacturer statements. Selection still depends on the ordered model, current manual, load curve, functional-safety documentation, and site acceptance.")),
  ],
  businessAreas: [
    t(locale, l("工业协作机器人与自动化工作站", "Industrial cobots and automation workcells")),
    t(locale, l("桌面、SCARA 与教育机器人", "Desktop, SCARA, and education robots")),
    t(locale, l("具身智能本体与数据采集训练系统", "Embodied-robot platforms and data-collection/training systems")),
  ],
  customerGroups: [
    t(locale, l("电子、汽车、半导体、金属、食品饮料和消费品制造商", "Electronics, automotive, semiconductor, metal, food-and-beverage, and consumer-goods manufacturers")),
    t(locale, l("工业自动化、零售服务和机器人系统集成商", "Industrial-automation, retail-service, and robotics integrators")),
    t(locale, l("高校、职业教育机构、实验室和开发者", "Universities, vocational schools, laboratories, and developers")),
  ],
  milestones: [
    { date: "2015", event: t(locale, l("公司在深圳成立并发布轻量桌面机械臂。", "The company was founded in Shenzhen and launched a lightweight desktop robot arm.")) },
    { date: "2016", event: t(locale, l("发布 Magician 与 M1。", "Magician and M1 were launched.")) },
    { date: "2019", event: t(locale, l("发布 CR5 六轴协作机器人。", "The CR5 six-axis cobot was launched.")) },
    { date: "2020", event: t(locale, l("发布 CR3、CR10、CR16 与 MG400。", "CR3, CR10, CR16, and MG400 were launched.")) },
    { date: "2024", event: t(locale, l("公司在香港联交所主板上市，股票代码 2432.HK。", "The company listed on the Hong Kong Stock Exchange Main Board under 2432.HK.")) },
    { date: "2025", event: t(locale, l("发布 ATOM 具身智能人形机器人。", "The ATOM embodied-intelligence humanoid was launched.")) },
  ],
  catalogScope: t(locale, l("本批次转录 CRA 系列十个具名型号。CRAS、CR、CRS、MG400、M1 Pro、Nova、Magician、ATOM、X-Trainer 和 Rover X1 仍需逐型号补录。", "This wave transcribes ten named CRA models. CRAS, CR, CRS, MG400, M1 Pro, Nova, Magician, ATOM, X-Trainer, and Rover X1 still require model-level records.")),
  catalogCoverage: "model-partial",
  verificationFocus: t(locale, l("锁定系列、型号、负载和重心、臂展、关节/TCP 速度、末端 I/O、控制柜、软件、安全功能、防护和交付版本。", "Lock family, model, payload and center of gravity, reach, joint/TCP speed, tool I/O, controller, software, safety functions, protection, and delivered revision.")),
  presalesQuestions: [
    t(locale, l("CRA、CRAS、CR、CRS 或桌面平台中哪一系列符合任务和安全边界？", "Which of CRA, CRAS, CR, CRS, or the desktop platforms fits the task and safety boundary?")),
    t(locale, l("工件、末端、重心和速度组合是否落在具体型号的动态负载范围？", "Does the workpiece, tool, center-of-gravity, and speed combination remain within the exact model's dynamic load envelope?")),
    t(locale, l("末端 I/O、RS-485、控制柜、DobotStudio、现场总线、功能安全和恢复流程如何验收？", "How will tool I/O, RS-485, the controller, DobotStudio, fieldbus, functional safety, and recovery procedures be accepted?")),
  ],
  reviewedAt: "2026-09-04",
});

const patchKassow = (company: CompanyProfile, locale: Locale): CompanyProfile => ({
  ...company,
  legalName: "Kassow Robots ApS",
  country: t(locale, l("丹麦", "Denmark")),
  headquarters: t(locale, l("丹麦哥本哈根卡斯特鲁普", "Kastrup, Copenhagen, Denmark")),
  founded: "2015",
  officialUrl: KASSOW_HOME,
  valueChainRole: t(locale, l("七轴轻量协作机器人与移动操作平台厂商", "Seven-axis lightweight cobot and mobile-manipulation platform manufacturer")),
  positioning: t(locale, l("全系列采用七轴结构，当前覆盖 5 kg 至 40 kg 负载、850 mm 至 1800 mm 臂展，并提供外置控制器与 EDGE 底座集成控制器配置。", "Uses a seven-axis architecture across the range, currently spanning 5 kg to 40 kg payload and 850 mm to 1,800 mm reach, with external-controller and EDGE integrated-controller configurations.")),
  strengths: [
    t(locale, l("第七轴用于绕障和在狭窄空间调整肘部位置，产品页明确支持 ROS/ROS 2 与 Profinet 等接口。", "The seventh axis supports around-corner motion and elbow placement in confined spaces; product pages explicitly reference ROS/ROS 2 and Profinet interfaces.")),
    t(locale, l("旧五款技术表公开本体、控制器、工具端、供电和通信字段，新两款扩展到 24 kg/1800 mm 与 40 kg/1200 mm。", "The original five-model technical table publishes arm, controller, tool-side, power, and communication fields; two newer models extend the range to 24 kg/1,800 mm and 40 kg/1,200 mm.")),
    t(locale, l("Bosch Rexroth 于 2022 年成为控股股东，后续产品与 ctrlX AUTOMATION 生态存在公开集成路线。", "Bosch Rexroth became majority owner in 2022, followed by a public integration path with the ctrlX AUTOMATION ecosystem.")),
  ],
  products: ["KR810", "KR1018", "KR1205", "KR1240", "KR1410", "KR1805", "KR1824", "KR EDGE variants", "KR Pulse", "Kassow Robots Connector App"],
  fit: [
    t(locale, l("狭窄空间中的上下料、包装、装配、检测和物料搬运。", "Machine tending, packaging, assembly, inspection, and material handling in confined spaces.")),
    t(locale, l("需要绕障、长臂展、大负载或多工位覆盖的七轴自动化。", "Seven-axis automation requiring obstacle avoidance, long reach, high payload, or multi-station coverage.")),
    t(locale, l("移动工作站和基于 ctrlX 的复合机器人集成。", "Mobile workcells and ctrlX-based mobile-manipulator integration.")),
  ],
  overview: [
    t(locale, l("Kassow Robots 于 2015 年由 Kristian Kassow 在哥本哈根创立，2018 年展示首批三款七轴协作机器人，2019 年进入市场，2020 年以 KR1018 和 KR1410 补齐最初五款产品。", "Kassow Robots was founded in Copenhagen by Kristian Kassow in 2015, presented its first three seven-axis cobots in 2018, entered the market in 2019, and completed its original five-model range with KR1018 and KR1410 in 2020.")),
    t(locale, l("Bosch Rexroth 于 2022 年成为控股股东，交易价格未披露。2026 年公司发布 KR1240 和 KR1824；这两款当前公开页面参数少于旧五款的完整技术表，因此分别标为官方部分覆盖。", "Bosch Rexroth became majority owner in 2022; the transaction price was not disclosed. KR1240 and KR1824 were introduced in 2026. Their current public pages expose fewer fields than the original five-model technical table, so both are marked officially partial.")),
    t(locale, l("七轴与轻量化有助于布置，但不自动等同于安全协作。官网也明确要求在部署前完成风险评估，末端工具、工件和速度仍决定防护方案。", "Seven axes and lower mass support flexible layout but do not automatically establish safe collaboration. The website also explicitly requires risk assessment before deployment; tooling, workpieces, and speed still determine safeguarding.")),
  ],
  businessAreas: [
    t(locale, l("七轴工业协作机器人", "Seven-axis industrial cobots")),
    t(locale, l("EDGE 集成控制器与移动自动化", "EDGE integrated controllers and mobile automation")),
    t(locale, l("机器人软件、外设接口与 ctrlX 集成", "Robot software, peripheral interfaces, and ctrlX integration")),
  ],
  customerGroups: [
    t(locale, l("中小制造企业和工厂自动化用户", "Small and medium-sized manufacturers and factory-automation users")),
    t(locale, l("包装、机加工、消费品、电池和半导体系统集成商", "Packaging, machining, consumer-goods, battery, and semiconductor integrators")),
    t(locale, l("移动机器人和多工位自动化开发团队", "Mobile-robot and multi-station automation developers")),
  ],
  milestones: [
    { date: "2015", event: t(locale, l("公司在哥本哈根成立，并设立布拉格软件开发办公室。", "The company was founded in Copenhagen and established a Prague software-development office.")) },
    { date: "2018", event: t(locale, l("KR810、KR1205 和 KR1805 首次公开展示。", "KR810, KR1205, and KR1805 were first presented publicly.")) },
    { date: "2019", event: t(locale, l("首批三款型号进入市场。", "The first three models entered the market.")) },
    { date: "2020", event: t(locale, l("KR1018 和 KR1410 发布，最初五款系列完成。", "KR1018 and KR1410 launched, completing the original five-model family.")) },
    { date: "2022", event: t(locale, l("Bosch Rexroth 成为控股股东，Kristian Kassow 继续担任管理者和共同所有人。", "Bosch Rexroth became majority owner while Kristian Kassow remained a manager and co-owner.")) },
    { date: "2026", event: t(locale, l("发布 KR1240 与 KR1824，覆盖更高负载和长臂展。", "KR1240 and KR1824 were introduced for higher payload and longer reach.")) },
  ],
  catalogScope: t(locale, l("本批次覆盖当前七个 KR 型号；旧五款按 2025 技术表逐项转录，新两款按 2026 发布页记录当前公开字段。EDGE 变体、KR Pulse 与 Connector App 仍需独立记录。", "This wave covers all seven current KR models. The original five are transcribed from the 2025 technical table, while the two new models use fields currently published on their 2026 launch pages. EDGE variants, KR Pulse, and the Connector App still need separate records.")),
  catalogCoverage: "model-partial",
  verificationFocus: t(locale, l("锁定型号、外置或 EDGE 控制器、负载与臂展、七轴路径、工具 I/O、供电、现场总线、ROS/KORD 版本、风险评估和服务区域。", "Lock model, external or EDGE controller, payload and reach, seven-axis path, tool I/O, power, fieldbus, ROS/KORD versions, risk assessment, and service region.")),
  presalesQuestions: [
    t(locale, l("第七轴是否解决目标工位的绕障和姿态需求，还是只增加调试复杂度？", "Does the seventh axis solve a real obstacle-avoidance or pose requirement, or only add commissioning complexity?")),
    t(locale, l("选择外置控制器还是 EDGE，移动平台的供电、急停和功能安全如何集成？", "Should the project use an external controller or EDGE, and how will mobile-platform power, emergency stop, and functional safety be integrated?")),
    t(locale, l("工件、工具、重心、速度和多工位轨迹是否满足负载与碰撞边界？", "Do the workpiece, tool, center of gravity, speed, and multi-station path satisfy load and collision boundaries?")),
  ],
  reviewedAt: "2026-09-04",
});

export const applyVerifiedWaveTenCompanyPatch = (company: CompanyProfile, locale: Locale): CompanyProfile => {
  if (company.slug === "aubo-robotics") return patchAubo(company, locale);
  if (company.slug === "dobot") return patchDobot(company, locale);
  if (company.slug === "kassow-robots") return patchKassow(company, locale);
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
  "aubo-robotics": AUBO_ABOUT,
  dobot: DOBOT_ABOUT,
  "kassow-robots": KASSOW_ABOUT,
};

const catalogTitle: Record<CompanySlug, Localized> = {
  "aubo-robotics": l("遨博型号级产品目录", "AUBO model-level product catalog"),
  dobot: l("越疆型号级产品目录", "Dobot model-level product catalog"),
  "kassow-robots": l("Kassow Robots 型号级产品目录", "Kassow Robots model-level product catalog"),
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
  openness: locale === "zh" ? "官方产品页或手册公开" : "Official product page or manual is public",
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
    ? "本记录对应具名型号；数值仅适用于引用来源、配置和条件。"
    : "This record maps to a named model; figures apply only to the cited source, configuration, and conditions.",
  profile: finderProfile(company),
  evidence: {
    level: "model",
    specificationKind: "parameters",
    specificationCoverage: seed.coverage,
    specificationCoverageNote: locale === "zh"
      ? seed.coverage === "official-complete"
        ? "已逐项覆盖当前引用官方规格表中该产品区块的全部公开字段；后续修订仍以来源和订单文件为准。"
        : "已覆盖当前官方页面可明确归属的字段，但完整手册、选件或新型号详细表尚未全部公开或转录。"
      : seed.coverage === "official-complete"
        ? "Every public field in the cited product block of the current official specification table is covered; later revisions remain governed by the source and order documents."
        : "Fields unambiguously attributable on the current official page are covered, but the full manual, options, or detailed new-model table is not yet fully public or transcribed.",
    overview: seed.overview.map((item) => t(locale, item)),
    applications: seed.applications.map((item) => t(locale, item)),
    disclosureBoundary: locale === "zh"
      ? "公开数值只适用于引用来源、具名型号、配置和条件；异常单元格、价格、交期和未公开项目性能不作推断。"
      : "Published figures apply only to the cited source, named model, configuration, and conditions; anomalous cells, price, lead time, and undisclosed project performance are not inferred.",
    sourceLinks: [...new Map([
      { label: locale === "zh" ? `${seed.product} 官方资料` : `${seed.product} official material`, url: seed.pageUrl },
      ...(seed.sourceLinks ?? []).map((item) => ({ label: t(locale, item.label), url: item.url })),
      { label: locale === "zh" ? "公司官方介绍" : "Official company profile", url: companyAboutUrl[seed.companySlug] },
    ].map((item) => [item.url, item])).values()],
  },
});

type AuboSpec = {
  model: string;
  mass: string;
  payload: string;
  reach: string;
  j3Range: string;
  jointSpeed: string;
  tcpSpeed: string;
  repeatability: string;
  averagePower: string;
  peakPower: string;
  base: string;
};

const auboSpecs: AuboSpec[] = [
  { model: "i3", mass: "16 kg", payload: "3 kg", reach: "625 mm", j3Range: "-156° 至 +156°", jointSpeed: "J1-J6：237°/s", tcpSpeed: "≤2.5 m/s", repeatability: "±0.02 mm", averagePower: "约 150 W", peakPower: "1000 W", base: "Φ140 mm" },
  { model: "i5", mass: "24 kg", payload: "5 kg", reach: "886.5 mm", j3Range: "-162° 至 +162°", jointSpeed: "J1-J3：223°/s；J4-J6：237°/s", tcpSpeed: "≤3.4 m/s", repeatability: "±0.02 mm", averagePower: "约 200 W", peakPower: "2000 W", base: "Φ170 mm" },
  { model: "i7", mass: "23.4 kg", payload: "7 kg", reach: "786.5 mm", j3Range: "-158° 至 +158°", jointSpeed: "J1-J3：223°/s；J4-J6：237°/s", tcpSpeed: "≤3.0 m/s", repeatability: "±0.02 mm", averagePower: "约 200 W", peakPower: "2000 W", base: "Φ170 mm" },
  { model: "i10", mass: "38.5 kg", payload: "10 kg", reach: "1350 mm", j3Range: "-167° 至 +167°", jointSpeed: "J1-J2：178°/s；J3：223°/s；J4-J6：237°/s", tcpSpeed: "≤3.0 m/s", repeatability: "±0.03 mm", averagePower: "约 500 W", peakPower: "2000 W", base: "Φ218 mm" },
  { model: "i12", mass: "40 kg", payload: "12 kg", reach: "1250 mm", j3Range: "-166° 至 +166°", jointSpeed: "J1-J2：178°/s；J3：267°/s；J4-J6：237°/s", tcpSpeed: "≤3.8 m/s", repeatability: "±0.03 mm", averagePower: "约 500 W", peakPower: "2000 W", base: "Φ218 mm" },
  { model: "i16", mass: "38 kg", payload: "16 kg", reach: "967.5 mm", j3Range: "-161° 至 +161°", jointSpeed: "J1-J2：178°/s；J3：267°/s；J4-J6：237°/s", tcpSpeed: "≤3.0 m/s", repeatability: "±0.03 mm", averagePower: "约 600 W", peakPower: "2000 W", base: "Φ218 mm" },
  { model: "i20", mass: "63 kg", payload: "20 kg", reach: "1650 mm", j3Range: "-168° 至 +168°", jointSpeed: "J1-J2：110°/s；J3-J6：178°/s", tcpSpeed: "≤2.6 m/s", repeatability: "±0.05 mm", averagePower: "约 1000 W", peakPower: "3000 W", base: "Φ258 mm" },
];

const auboRows = (spec: AuboSpec): SpecRow[] => {
  const source = l("AUBO-i 系列机械臂用户手册 v1.0.1", "AUBO-i Series Robot Arm User Manual v1.0.1");
  const locator = l(`3.2 ${spec.model} 技术规格`, `Section 3.2 ${spec.model} technical specifications`);
  const r = (zh: string, en: string, valueZh: string, valueEn = valueZh, conditions?: Localized) => row(AUBO_I_MANUAL, source, locator, zh, en, valueZh, valueEn, conditions);
  return [
    r("机械臂类型", "Robot arm type", `AUBO-${spec.model}`), r("自由度", "Degrees of freedom", "6 DoF"), r("本体质量", "Robot mass", spec.mass),
    r("负载", "Payload", spec.payload, spec.payload, l("必须满足手册负载-偏转曲线", "Must remain within the manual load-deflection curve")), r("最大工作半径", "Maximum working radius", spec.reach),
    r("J1/J2/J4/J5/J6 关节范围", "J1/J2/J4/J5/J6 joint range", "-360° 至 +360°", "-360° to +360°"), r("J3 关节范围", "J3 joint range", spec.j3Range, spec.j3Range.replace("至", "to")),
    r("最大关节速度", "Maximum joint speed", spec.jointSpeed, spec.jointSpeed.replaceAll("；", "; ")), r("工具最大速度", "Maximum tool speed", spec.tcpSpeed), r("重复定位精度", "Repeatability", spec.repeatability),
    r("工作环境温度", "Ambient temperature", "0-50°C"), r("工作环境湿度", "Ambient humidity", "90% RH（非冷凝）", "90% RH, non-condensing"), r("防护等级", "Ingress protection", "IP54"),
    r("ISO 14644-1 洁净等级", "ISO 14644-1 cleanroom class", "Class 5"), r("平均功耗", "Average power", spec.averagePower, spec.averagePower.replace("约", "Approximately"), l("运行典型程序", "Running typical programs")),
    r("峰值功耗", "Peak power", spec.peakPower), r("安装面直径", "Mounting-surface diameter", spec.base), r("通用认证标志 / 机构", "General approval marks / agencies", "CE、NRTL、CR", "CE, NRTL, CR"),
    r("环境与化学合规", "Environmental and chemical compliance", "RoHS、REACH", "RoHS and REACH"), r("协作机器人安全标准", "Collaborative-robot safety standard", "ISO/TS 15066"),
  ];
};

const auboSeeds: ProductSeed[] = auboSpecs.map((spec) => ({
  id: `aubo-${spec.model}`,
  companySlug: "aubo-robotics",
  product: `AUBO-${spec.model}`,
  pageUrl: `${AUBO_I_MANUAL}#_3-2-${auboSpecs.indexOf(spec) + 1}-aubo-${spec.model}`,
  category: "robot-platform",
  primary: "robot-platform",
  subclass: "industrial-arm",
  useCases: ["manufacturing", "integration"],
  type: l("六轴协作机械臂", "Six-axis collaborative robot arm"),
  integration: l("与 AUBO-CB-iS 控制器、AuboStudio、示教设备、工具端和安全外围组成系统；SDK、ROS 与现场总线按版本集成。", "Forms a system with the AUBO-CB-iS controller, AuboStudio, teaching device, tooling, and safety peripherals; SDK, ROS, and fieldbus integration depend on version."),
  verification: l("以现行手册和负载曲线核对工具重心、姿态、速度、安装、控制器、认证和整机风险评估。", "Use the current manual and load curve to verify tool center of gravity, pose, speed, mounting, controller, certification, and whole-system risk assessment."),
  rows: auboRows(spec),
  overview: [l(`AUBO-${spec.model} 是现行 i 系列独立型号，手册列出 ${spec.payload} 负载、${spec.reach} 最大工作半径、${spec.repeatability} 重复定位精度和 ${spec.mass} 本体质量。`, `AUBO-${spec.model} is a current i-series model. The manual lists ${spec.payload} payload, ${spec.reach} maximum working radius, ${spec.repeatability} repeatability, and ${spec.mass} robot mass.`), l("所有标称负载必须结合手册负载-偏转曲线和工具重心使用；协作运行条件由完整应用风险评估决定。", "All rated payloads must be applied with the manual load-deflection curve and tool center of gravity; collaborative-operation conditions are determined by the complete application risk assessment.")],
  applications: [l("装配、上下料、焊接、打磨、检测、码垛和物料搬运", "Assembly, machine tending, welding, finishing, inspection, palletizing, and material handling")],
  coverage: "official-complete",
  sourceLinks: [{ label: l("AUBO 产品目录", "AUBO product catalog"), url: AUBO_PRODUCTS }],
}));

type DobotSpec = {
  model: string;
  mass: string;
  payload: string;
  reach: string;
  tcpSpeed: string;
  j3Range: string;
  j12Speed: string;
  j3Speed: string;
  j456Speed: string;
  repeatability: string;
  power: string;
  cable: string;
  toolChannels: string;
  ip?: string;
};

const dobotSpecs: DobotSpec[] = [
  { model: "CR3A", mass: "16.5 kg", payload: "3 kg", reach: "620 mm", tcpSpeed: "3 m/s", j3Range: "±155°", j12Speed: "180°/s", j3Speed: "223°/s", j456Speed: "223°/s", repeatability: "±0.02 mm", power: "120 W", cable: "5 m", toolChannels: "2", ip: "IP54" },
  { model: "CR5A", mass: "25 kg", payload: "5 kg", reach: "900 mm", tcpSpeed: "4 m/s", j3Range: "±160°", j12Speed: "180°/s", j3Speed: "180°/s", j456Speed: "223°/s", repeatability: "±0.02 mm", power: "150 W", cable: "5 m", toolChannels: "2", ip: "IP54" },
  { model: "CR7A", mass: "24.5 kg", payload: "7 kg", reach: "800 mm", tcpSpeed: "4 m/s", j3Range: "±160°", j12Speed: "180°/s", j3Speed: "180°/s", j456Speed: "223°/s", repeatability: "±0.05 mm", power: "150 W", cable: "5 m", toolChannels: "2", ip: "IP54" },
  { model: "CR6AL", mass: "41.5 kg", payload: "6 kg", reach: "1800 mm", tcpSpeed: "5 m/s", j3Range: "±170°", j12Speed: "150°/s", j3Speed: "180°/s", j456Speed: "223°/s", repeatability: "±0.02 mm", power: "350 W", cable: "5 m", toolChannels: "2", ip: "IP54" },
  { model: "CR10A", mass: "40 kg", payload: "10 kg", reach: "1300 mm", tcpSpeed: "5 m/s", j3Range: "±160°", j12Speed: "150°/s", j3Speed: "180°/s", j456Speed: "223°/s", repeatability: "±0.03 mm", power: "350 W", cable: "5 m", toolChannels: "2", ip: "IP54" },
  { model: "CR12A", mass: "39.5 kg", payload: "12 kg", reach: "1200 mm", tcpSpeed: "5 m/s", j3Range: "±160°", j12Speed: "150°/s", j3Speed: "180°/s", j456Speed: "223°/s", repeatability: "±0.03 mm", power: "350 W", cable: "5 m", toolChannels: "2", ip: "IP54" },
  { model: "CR16A", mass: "40 kg", payload: "16 kg", reach: "1000 mm", tcpSpeed: "4 m/s", j3Range: "±160°", j12Speed: "150°/s", j3Speed: "180°/s", j456Speed: "223°/s", repeatability: "±0.03 mm", power: "350 W", cable: "5 m", toolChannels: "2", ip: "IP54" },
  { model: "CR16AL", mass: "40 kg", payload: "16 kg", reach: "1300 mm", tcpSpeed: "4 m/s", j3Range: "±160°", j12Speed: "110°/s", j3Speed: "180°/s", j456Speed: "223°/s", repeatability: "±0.04 mm", power: "350 W", cable: "5 m", toolChannels: "2", ip: "IP54" },
  { model: "CR20A", mass: "73 kg", payload: "20 kg", reach: "1700 mm", tcpSpeed: "5.5 m/s", j3Range: "±160°", j12Speed: "120°/s", j3Speed: "110°/s", j456Speed: "180°/s", repeatability: "±0.05 mm", power: "500 W", cable: "6 m", toolChannels: "4" },
  { model: "CR30A", mass: "70 kg", payload: "30 kg", reach: "1305 mm", tcpSpeed: "4 m/s", j3Range: "±160°", j12Speed: "120°/s", j3Speed: "150°/s", j456Speed: "180°/s", repeatability: "±0.05 mm", power: "500 W", cable: "6 m", toolChannels: "4" },
];

const dobotRows = (spec: DobotSpec): SpecRow[] => {
  const source = l("Dobot CRA 系列官方产品页", "Dobot CRA official product page");
  const locator = l("CRA Series 规格表", "CRA Series specification table");
  const r = (zh: string, en: string, valueZh: string, valueEn = valueZh) => row(DOBOT_CRA, source, locator, zh, en, valueZh, valueEn);
  return [
    r("本体质量", "Robot mass", spec.mass), r("最大负载", "Maximum payload", spec.payload), r("工作半径", "Reach", spec.reach), r("最大线速度", "Maximum linear speed", spec.tcpSpeed),
    r("J3 运动范围", "J3 motion range", spec.j3Range), r("其他关节运动范围", "Other joint ranges", "±360°"), r("J1/J2 最大速度", "J1/J2 maximum speed", spec.j12Speed),
    r("J3 最大速度", "J3 maximum speed", spec.j3Speed), r("J4/J5/J6 最大速度", "J4/J5/J6 maximum speed", spec.j456Speed),
    r("末端 DI", "End-effector DI", `${spec.toolChannels} 路`, `${spec.toolChannels} channels`), r("末端 DO", "End-effector DO", `${spec.toolChannels} 路`, `${spec.toolChannels} channels`),
    r("末端 AI", "End-effector AI", `${spec.toolChannels} 路（与 RS-485 共用）`, `${spec.toolChannels} channels, shared with RS-485`), r("重复定位精度", "Repeatability", spec.repeatability),
    ...(spec.ip ? [r("防护等级", "Ingress protection", spec.ip)] : []), r("工作温度", "Operating temperature", "0-50°C"), r("功耗", "Power consumption", spec.power),
    r("安装方向", "Mounting orientation", "任意角度", "Any orientation"), r("至控制柜线缆长度", "Cable length to controller", spec.cable), r("本体材料", "Robot materials", "铝合金、ABS 塑料", "Aluminium alloy and ABS plastic"),
  ];
};

const dobotSeeds: ProductSeed[] = dobotSpecs.map((spec) => ({
  id: `dobot-${spec.model.toLowerCase()}`,
  companySlug: "dobot",
  product: `Dobot ${spec.model}`,
  pageUrl: DOBOT_CRA,
  category: "robot-platform",
  primary: "robot-platform",
  subclass: "industrial-arm",
  useCases: ["manufacturing", "integration"],
  type: l("六轴协作机械臂", "Six-axis collaborative robot arm"),
  integration: l("通过 CRA 控制柜、DobotStudio Pro、末端 DI/DO/AI 与 RS-485 接入工作站；现场总线、安全设备和末端按项目配置。", "Integrates through the CRA controller, DobotStudio Pro, end-effector DI/DO/AI, and RS-485; fieldbus, safety devices, and tooling are project-configured."),
  verification: l("核对型号、动态负载、工具重心、工作空间、关节/TCP 速度、末端 I/O、控制柜、安全功能和防护要求。", "Verify model, dynamic payload, tool center of gravity, workspace, joint/TCP speed, tool I/O, controller, safety functions, and protection requirements."),
  rows: dobotRows(spec),
  overview: [l(`Dobot ${spec.model} 是 CRA 系列独立型号，官方表列出 ${spec.payload} 最大负载、${spec.reach} 工作半径、${spec.tcpSpeed} 最大线速度和 ${spec.mass} 本体质量。`, `Dobot ${spec.model} is a distinct CRA-series model. The official table lists ${spec.payload} maximum payload, ${spec.reach} reach, ${spec.tcpSpeed} maximum linear speed, and ${spec.mass} robot mass.`), l(spec.ip ? "当前表中该型号的 IP54 可明确归属；具体防护、末端和控制柜仍需按订单配置确认。" : "当前官方表的防护等级行无法将异常单元格无歧义归属到该型号，因此本记录不推断 IP 等级，需在当前手册或订单文件中确认。", spec.ip ? "IP54 is unambiguously attributable to this model in the current table; exact arm, tool, and controller protection still requires order-level confirmation." : "The current official table's ingress-protection row contains anomalous cells that cannot be unambiguously assigned to this model, so this record does not infer an IP rating; confirm it in the current manual or order documents.")],
  applications: [l("装配、上下料、焊接、码垛、检测、打磨和搬运", "Assembly, machine tending, welding, palletizing, inspection, finishing, and handling")],
  coverage: spec.ip ? "official-complete" : "official-partial",
}));

type KassowSpec = {
  model: string;
  reach: string;
  payload: string;
  mass: string;
  jointSpeed: string;
  footprint: string;
  repeatability?: string;
  power?: string;
  sourceUrl: string;
};

const kassowSpecs: KassowSpec[] = [
  { model: "KR810", reach: "850 mm", payload: "10 kg", mass: "26 kg", jointSpeed: "225°/s", footprint: "130 × 130 mm", repeatability: "±0.03 mm", power: "400-600 W", sourceUrl: KASSOW_BROCHURE },
  { model: "KR1018", reach: "1000 mm", payload: "18 kg", mass: "36 kg", jointSpeed: "163/225°/s", footprint: "160 × 160 mm", repeatability: "±0.03 mm", power: "400-1200 W", sourceUrl: KASSOW_BROCHURE },
  { model: "KR1205", reach: "1200 mm", payload: "5 kg", mass: "27 kg", jointSpeed: "225°/s", footprint: "130 × 130 mm", repeatability: "±0.03 mm", power: "400-600 W", sourceUrl: KASSOW_BROCHURE },
  { model: "KR1410", reach: "1400 mm", payload: "10 kg", mass: "37 kg", jointSpeed: "163/225°/s", footprint: "160 × 160 mm", repeatability: "±0.03 mm", power: "400-1200 W", sourceUrl: KASSOW_BROCHURE },
  { model: "KR1805", reach: "1800 mm", payload: "5 kg", mass: "40 kg", jointSpeed: "163/225°/s", footprint: "160 × 160 mm", repeatability: "±0.04 mm", power: "400-1200 W", sourceUrl: KASSOW_BROCHURE },
  { model: "KR1240", reach: "1200 mm", payload: "40 kg", mass: "80 kg", jointSpeed: "J1/J2 110°/s；J3/J4 162°/s；J5/J6/J7 225°/s", footprint: "194 × 194 mm", sourceUrl: KASSOW_NEW },
  { model: "KR1824", reach: "1800 mm", payload: "24 kg", mass: "76 kg", jointSpeed: "J1/J2 110°/s；J3/J4 162°/s；J5/J6/J7 270°/s", footprint: "194 × 194 mm", sourceUrl: KASSOW_NEW },
];

const kassowRows = (spec: KassowSpec): SpecRow[] => {
  const source = spec.sourceUrl === KASSOW_BROCHURE ? l("Kassow Robots KR Series 2025 官方手册", "Kassow Robots KR Series 2025 official brochure") : l("Kassow Robots 新型号官方页面", "Kassow Robots official new-model page");
  const locator = spec.sourceUrl === KASSOW_BROCHURE ? l("KR Series Technical specifications", "KR Series Technical specifications") : l(`${spec.model} 产品参数`, `${spec.model} product specifications`);
  const r = (zh: string, en: string, valueZh: string, valueEn = valueZh) => row(spec.sourceUrl, source, locator, zh, en, valueZh, valueEn);
  const core = [
    r("最大臂展", "Maximum reach", spec.reach), r("负载", "Payload", spec.payload), r("本体质量", "Robot mass", spec.mass), r("自由度", "Degrees of freedom", "7 DoF"),
    r("最大关节速度", "Maximum joint speed", spec.jointSpeed, spec.jointSpeed.replaceAll("；", "; ")), r("标准底座占地", "Standard-base footprint", spec.footprint),
  ];
  if (!spec.repeatability || !spec.power) return core;
  return [
    ...core, r("关节范围", "Joint ranges", "J2/J4：-70° 至 +180°；J1/J3/J5/J6/J7：±360°", "J2/J4: -70° to +180°; J1/J3/J5/J6/J7: ±360°"),
    r("关节冗余绝对编码器", "Redundant absolute joint encoders", "是", "Yes"), r("重复定位精度", "Repeatability", spec.repeatability), r("工作温度", "Operating temperature", "0-45°C"),
    r("本体材料", "Robot material", "铝", "Aluminium"), r("防护等级", "Ingress protection", "IP54"), r("声压级", "Sound level", "<65 dB"),
    r("专用急停/保护停数字输入", "Dedicated E-stop / protective-stop digital inputs", "4"), r("外部 24 V 供电电流", "External 24 V supply current", "6 A"), r("继电器输出", "Relay outputs", "4"),
    r("安全数字 I/O", "Safety digital I/O", "8 路输出、16 路输入；或 4 路安全输出、8 路安全输入", "8 outputs and 16 inputs; or 4 safe outputs and 8 safe inputs"),
    r("0-10 V 模拟 I/O", "0-10 V analog I/O", "2 入 / 2 出", "2 inputs / 2 outputs"), r("4-20 mA 模拟 I/O", "4-20 mA analog I/O", "2 入 / 2 出", "2 inputs / 2 outputs"),
    r("现场总线", "Fieldbus", "Modbus Master、Profinet Slave、EtherNet/IP Slave", "Modbus Master, Profinet Slave, EtherNet/IP Slave"),
    r("通信接口", "Communication interfaces", "KORD API、TCP/IP、UDP、ROS 1、ROS 2", "KORD API, TCP/IP, UDP, ROS 1, ROS 2"),
    r("工具连接器 1", "Tool connector 1", "M8 8 针母座：2 路 4-20 mA 电流输入；另 2 路模拟 I/O 或 3 路数字输出", "M8 8-pole female: 2 current inputs at 4-20 mA; plus 2 analog I/O or 3 digital outputs"),
    r("工具连接器 2", "Tool connector 2", "M8 8 针公座：RS-485 最高 1 Mbps；另 5 路数字输出或 2 路模拟输入", "M8 8-pole male: RS-485 up to 1 Mbps; plus 5 digital outputs or 2 analog inputs"),
    r("最大负载功耗", "Power consumption at maximum load", spec.power), r("交流供电电压", "AC supply voltage", "100-120 V 或 200-240 V", "100-120 V or 200-240 V"),
    r("供电电流", "Supply current", "16 A"), r("供电频率", "Supply frequency", "50/60 Hz"),
  ];
};

const kassowSeeds: ProductSeed[] = kassowSpecs.map((spec) => ({
  id: `kassow-${spec.model.toLowerCase()}`,
  companySlug: "kassow-robots",
  product: `Kassow ${spec.model}`,
  pageUrl: spec.sourceUrl === KASSOW_BROCHURE ? KASSOW_SERIES : KASSOW_NEW,
  category: "robot-platform",
  primary: "robot-platform",
  subclass: "industrial-arm",
  useCases: ["manufacturing", "integration", "logistics"],
  type: l("七轴轻量协作机械臂", "Seven-axis lightweight collaborative robot arm"),
  integration: l("通过外置控制器或 EDGE 集成控制器、KORD/TCP/UDP、ROS/ROS 2、现场总线和工具端 I/O 接入固定或移动工作站。", "Integrates into fixed or mobile workcells through an external or EDGE controller, KORD/TCP/UDP, ROS/ROS 2, fieldbus, and tool-side I/O."),
  verification: l("核对七轴路径、负载重心、控制器形态、底座、工具 I/O、现场总线、移动平台、安全回路和风险评估。", "Verify the seven-axis path, payload center of gravity, controller form, base, tool I/O, fieldbus, mobile platform, safety circuit, and risk assessment."),
  rows: kassowRows(spec),
  overview: [l(`Kassow ${spec.model} 是当前七轴产品线中的具名型号，官方资料列出 ${spec.payload} 负载、${spec.reach} 臂展和 ${spec.mass} 本体质量。`, `Kassow ${spec.model} is a named model in the current seven-axis range. Official material lists ${spec.payload} payload, ${spec.reach} reach, and ${spec.mass} robot mass.`), l(spec.repeatability ? "本记录逐项覆盖 2025 技术表中的本体、控制器、通信、工具端和供电字段。" : "该型号为 2026 年新发布产品，当前页面只公开核心机械参数；重复精度、完整控制器和环境字段不作推断。", spec.repeatability ? "This record covers the arm, controller, communications, tool-side, and power fields in the 2025 technical table." : "This is a newly introduced 2026 model. The current page publishes only core mechanical parameters; repeatability, full controller data, and environmental fields are not inferred.")],
  applications: [l("上下料、包装、码垛、装配、检测、搬运和移动工作站", "Machine tending, packaging, palletizing, assembly, inspection, handling, and mobile workcells")],
  coverage: spec.repeatability ? "official-complete" : "official-partial",
  sourceLinks: spec.sourceUrl === KASSOW_BROCHURE ? [{ label: l("KR 系列官方页面", "Official KR-series page"), url: KASSOW_SERIES }] : [{ label: l("新型号发布公告", "New-model launch announcement"), url: "https://www.kassowrobots.com/news/kassow-robots-introduces-kr-1824-and-kr-1240-extending-collaborative-robotics-into-higher-payload-applications" }],
}));

const productSeeds: ProductSeed[] = [...auboSeeds, ...dobotSeeds, ...kassowSeeds];

export const getVerifiedWaveTenProductRecords = (
  locale: Locale,
  companies: CompanyProfile[],
): FinderExpansionRecord[] => {
  const companyBySlug = new Map(companies.map((company) => [company.slug, company]));
  return productSeeds.map((seed) => {
    const company = companyBySlug.get(seed.companySlug);
    if (!company) throw new Error(`Wave-ten product company is missing: ${seed.companySlug}`);
    return toRecord(locale, company, seed);
  });
};

export const waveTenCatalogProductCount = productSeeds.length;
