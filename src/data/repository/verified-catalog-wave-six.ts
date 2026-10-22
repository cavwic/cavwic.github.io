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
  sourceUrl: string;
  sourceLabel: Localized;
  locator: Localized;
  conditions?: Localized;
};

type ProductSeed = {
  id: string;
  companySlug: WaveSixCompanySlug;
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
  catalogScope?: Localized;
};

const l = (zh: string, en: string): Localized => ({ zh, en });
const t = (locale: Locale, value: Localized) => value[locale];

const LIV0X_ABOUT = "https://www.livoxtech.com/contact";
const ORBBEC_ABOUT = "https://www.orbbec.com/company/";
const ORBBEC_SERIES = "https://www.orbbec.com/gemini-330-series/";
const PAL_ABOUT = "https://pal-robotics.com/who-we-are/";
const PAL_TIMELINE = "https://pal-robotics.com/timeline/";
const TALOS_PAGE = "https://pal-robotics.com/robot/talos/";
const TALOS_DATASHEET = "https://pal-robotics.com/wp-content/uploads/2024/05/Datasheet-TALOS.pdf";
const TESOLLO_ABOUT = "https://www.tesollo.com/cn/company";
const TESOLLO_PRODUCTS = "https://www.tesollo.com/products";
const TESOLLO_FAQ = "https://www.tesollo.com/support/faq";

export const waveSixCompanySlugs = ["livox", "orbbec", "pal-robotics", "tesollo"] as const;
type WaveSixCompanySlug = typeof waveSixCompanySlugs[number];

const waveSixCompanySlugSet = new Set<string>(waveSixCompanySlugs);
export const isWaveSixCompanySlug = (slug: string) => waveSixCompanySlugSet.has(slug);

const companyPatch = (
  company: CompanyProfile,
  locale: Locale,
  values: {
    legalName: Localized;
    country: Localized;
    headquarters: Localized;
    founded: string;
    officialUrl: string;
    valueChainRole: Localized;
    positioning: Localized;
    strengths: Localized[];
    products: string[];
    fit: Localized[];
    overview: Localized[];
    businessAreas: Localized[];
    customerGroups: Localized[];
    milestones: Array<{ date: string; event: Localized }>;
    catalogScope: Localized;
    verificationFocus: Localized;
    questions: Localized[];
  },
): CompanyProfile => ({
  ...company,
  legalName: t(locale, values.legalName),
  country: t(locale, values.country),
  headquarters: t(locale, values.headquarters),
  founded: values.founded,
  officialUrl: values.officialUrl,
  valueChainRole: t(locale, values.valueChainRole),
  positioning: t(locale, values.positioning),
  strengths: values.strengths.map((item) => t(locale, item)),
  products: values.products,
  fit: values.fit.map((item) => t(locale, item)),
  overview: values.overview.map((item) => t(locale, item)),
  businessAreas: values.businessAreas.map((item) => t(locale, item)),
  customerGroups: values.customerGroups.map((item) => t(locale, item)),
  milestones: values.milestones.map((item) => ({ date: item.date, event: t(locale, item.event) })),
  catalogScope: t(locale, values.catalogScope),
  catalogCoverage: "model-partial",
  verificationFocus: t(locale, values.verificationFocus),
  presalesQuestions: values.questions.map((item) => t(locale, item)),
  reviewedAt: "2026-09-04",
});

const patchLivox = (company: CompanyProfile, locale: Locale) => companyPatch(company, locale, {
  legalName: l("深圳市览沃科技有限公司", "Livox Technology Company Limited"),
  country: l("中国", "China"),
  headquarters: l("中国深圳", "Shenzhen, China"),
  founded: "2016",
  officialUrl: "https://www.livoxtech.com/",
  valueChainRole: l("三维激光雷达与感知硬件厂商", "3D lidar and perception-hardware manufacturer"),
  positioning: l("以非重复扫描和旋转扫描激光雷达覆盖机器人、无人系统、测绘与自动驾驶感知。", "Provides non-repetitive and rotating-scan lidar for robotics, unmanned systems, mapping, and autonomous-driving perception."),
  strengths: [
    l("从近距 360 度感知到远距窄视场测距的多种扫描方案。", "Multiple scan architectures spanning near-field 360-degree perception and long-range narrow-field ranging."),
    l("产品页公开量程、反射率、视场、点率、同步、环境和机械参数。", "Product pages publish range, reflectivity, field of view, point rate, synchronization, environmental, and mechanical specifications."),
    l("以太网、PTP/GPS/NTP 与官方 SDK 支持机器人和测绘集成。", "Ethernet, PTP/GPS/NTP, and official SDK support robotics and mapping integration."),
  ],
  products: ["MID-360", "MID-360S", "Mid-70", "Avia", "Avia 2", "Tele-15"],
  fit: [
    l("移动机器人定位、导航、避障与近距全向感知。", "Mobile-robot localization, navigation, obstacle avoidance, and near-field all-around perception."),
    l("无人机、测绘、长距检测和室外三维重建。", "Drones, surveying, long-range detection, and outdoor 3D reconstruction."),
    l("需要多传感器时间同步和点云 SDK 的研发与集成团队。", "R&D and integration teams requiring multi-sensor time synchronization and point-cloud SDKs."),
  ],
  overview: [
    l("览沃成立于 2016 年，总部位于深圳。公司官网将产品应用列为自动驾驶、机器人、三维测绘、智慧城市与安全等方向，并称产品已销往 26 个国家和地区；后者属于公司公开口径，不等同于经审计的市场份额。", "Livox was founded in 2016 and is headquartered in Shenzhen. Its website lists autonomous driving, robotics, 3D mapping, smart cities, and security as application areas and states that products have been sold in 26 countries and regions; that is a company-published statement, not audited market-share evidence."),
    l("本批次按当前可访问的具名规格页拆分 MID-360、MID-360S、Mid-70、Avia、Avia 2 与 Tele-15。不同页面采用不同的照度、反射率、距离和回波条件，因此数值只在各自条件下可比。", "This batch separates MID-360, MID-360S, Mid-70, Avia, Avia 2, and Tele-15 from currently accessible named specification pages. The pages use different illumination, reflectivity, distance, and return conditions, so figures are comparable only within their stated conditions."),
    l("公司未在官网建立面向公众的定期财务报告库。本档案不据此推断收入、利润、估值、客户集中度或交付规模。", "The website does not expose a public periodic-financial-report library. This profile does not infer revenue, profit, valuation, customer concentration, or delivery volume from that absence."),
  ],
  businessAreas: [
    l("机器人与无人系统三维激光雷达", "3D lidar for robots and unmanned systems"),
    l("测绘、建模和长距环境感知", "Mapping, modeling, and long-range environmental perception"),
    l("点云采集、时间同步和 SDK 集成", "Point-cloud acquisition, time synchronization, and SDK integration"),
  ],
  customerGroups: [
    l("AMR、AGV、移动机器人与无人机厂商", "AMR, AGV, mobile-robot, and drone manufacturers"),
    l("测绘、数字孪生和三维数据服务团队", "Surveying, digital-twin, and 3D-data service teams"),
    l("自动驾驶、特种车辆和科研开发团队", "Autonomous-driving, special-vehicle, and research teams"),
  ],
  milestones: [
    { date: "2016", event: l("公司成立。", "The company was founded.") },
    { date: "2023", event: l("MID-360 产品资料进入公开支持体系。", "MID-360 product material entered the public support catalog.") },
    { date: "2026-04", event: l("官网发布 MID-360S 产品资料。", "The website published MID-360S product material.") },
    { date: "2026-07", event: l("官网发布 Avia 2 产品资料。", "The website published Avia 2 product material.") },
  ],
  catalogScope: l("覆盖当前下载/支持入口中六个具名激光雷达型号。配件、线缆、转换盒及历史停售型号尚未逐 SKU 建档。", "Covers six named lidar models in the current download/support entry points. Accessories, cables, converter boxes, and historical discontinued models are not yet individual SKU records."),
  verificationFocus: l("锁定型号、扫描模式、反射率与照度条件、回波模式、同步源、供电峰值、热管理、线缆和 IP 验收。", "Lock model, scan mode, reflectivity and illumination conditions, return mode, timing source, peak power, thermal management, cable, and IP acceptance."),
  questions: [
    l("目标的最低反射率、最大距离、视场、盲区和点云密度是什么？", "What are the minimum target reflectivity, maximum range, field of view, blind zone, and required point-cloud density?"),
    l("需要哪种回波、帧率、PTP/GPS/NTP 同步和网络拓扑？", "Which return mode, frame rate, PTP/GPS/NTP synchronization, and network topology are required?"),
    l("低温自加热峰值、散热、振动、雾雨和外壳温度如何验证？", "How will low-temperature self-heating peak power, cooling, vibration, fog/rain, and enclosure temperature be validated?"),
  ],
});

const patchOrbbec = (company: CompanyProfile, locale: Locale) => companyPatch(company, locale, {
  legalName: l("奥比中光科技集团股份有限公司", "Orbbec Inc."),
  country: l("中国", "China"),
  headquarters: l("中国深圳", "Shenzhen, China"),
  founded: "2013",
  officialUrl: "https://www.orbbec.com/",
  valueChainRole: l("机器人与 AI 三维视觉传感器厂商", "Robotics and AI 3D-vision sensor manufacturer"),
  positioning: l("围绕双目、ToF、结构光、相机计算平台和激光雷达提供三维视觉硬件、芯片与 SDK。", "Provides 3D-vision hardware, chips, and SDKs across stereo, ToF, structured light, camera computers, and lidar."),
  strengths: [
    l("覆盖多种深度成像原理、连接方式和防护配置。", "Covers multiple depth-imaging principles, connectivity options, and ruggedization levels."),
    l("Gemini 330 系列以统一表格公开八个型号的深度、RGB、同步、电气和环境差异。", "The Gemini 330 series publishes depth, RGB, synchronization, electrical, and environmental differences for eight models in one table."),
    l("提供 Orbbec SDK v2、文档和多相机同步能力。", "Provides Orbbec SDK v2, documentation, and multi-camera synchronization."),
  ],
  products: ["Gemini 335", "Gemini 336", "Gemini 335L", "Gemini 336L", "Gemini 335Le", "Gemini 338Le", "Gemini 335Lg", "Gemini 338Lg", "Gemini 305 / 305g", "Gemini 345Lg", "Gemini 435Le", "Gemini 215", "Gemini 2 / 2 L / 2 XL", "Femto Bolt / Mega / Mega I", "Astra 2 / Astra Mini", "Persee 2 / Persee N1", "Pulsar ME450 / SL450"],
  fit: [
    l("机器人抓取、导航、避障、定位和人机交互。", "Robot grasping, navigation, obstacle avoidance, localization, and human-machine interaction."),
    l("物流、零售、健康、扫描和三维数据采集。", "Logistics, retail, healthtech, scanning, and 3D data acquisition."),
    l("需要 USB、PoE、GMSL2 或多相机同步的嵌入式视觉项目。", "Embedded-vision projects requiring USB, PoE, GMSL2, or multi-camera synchronization."),
  ],
  overview: [
    l("奥比中光成立于 2013 年，总部位于深圳。公司官网称其具备自研三维视觉芯片与系统技术，并在中国多地和美国设有业务或研发据点。官网公开的客户与覆盖国家数量属于公司口径，不能替代审计或第三方市场研究。", "Orbbec was established in 2013 and is headquartered in Shenzhen. The company states that it develops in-house 3D-vision chips and system technologies and maintains business or R&D locations in several Chinese cities and the United States. Published customer and country counts are company statements, not substitutes for audited or third-party market research."),
    l("官网当前产品导航包含双目、ToF、结构光、相机计算平台、激光雷达和无机器人数据采集。本批次先对 Gemini 330 系列八个具名型号逐项拆分，其他产品保持在公司目录中，后续按各自数据表继续补足。", "The current product navigation covers stereo, ToF, structured light, camera computers, lidar, and robot-free data collection. This batch first separates the eight named Gemini 330 models; other products remain in the company catalog for later model-specific datasheet work."),
    l("不同型号在基线、滤光、连接器、快门、防护、电源、同步和工作温度上差异明显。选型必须匹配具体型号，不能只以 Gemini 330 系列名称代替交付配置。", "Models differ materially in baseline, filtering, connector, shutter, ingress protection, power, synchronization, and temperature. Selection must identify the exact model rather than treating Gemini 330 as a deliverable configuration."),
  ],
  businessAreas: [
    l("双目、ToF 与结构光深度相机", "Stereo, ToF, and structured-light depth cameras"),
    l("机器人视觉芯片、SDK 与多相机同步", "Robot-vision chips, SDKs, and multi-camera synchronization"),
    l("相机计算平台、激光雷达和三维数据采集", "Camera computers, lidar, and 3D-data acquisition"),
  ],
  customerGroups: [
    l("机器人、AMR、机械臂和自动化设备厂商", "Robot, AMR, manipulator, and automation-equipment manufacturers"),
    l("物流、零售、健康、消费电子和三维扫描团队", "Logistics, retail, healthtech, consumer-electronics, and 3D-scanning teams"),
    l("算法、科研、系统集成和嵌入式开发团队", "Algorithm, research, system-integration, and embedded-development teams"),
  ],
  milestones: [
    { date: "2013", event: l("公司成立。", "The company was established.") },
    { date: "2022", event: l("公司公开资料记载完成首次公开发行。", "Company material records completion of its initial public offering.") },
    { date: "2024", event: l("Gemini 330 系列进入公开产品体系。", "The Gemini 330 series entered the public product portfolio.") },
    { date: "2026", event: l("Gemini 330 系列继续增加工业连接与滤光型号。", "The Gemini 330 series continued adding industrial-connectivity and filtered variants.") },
  ],
  catalogScope: l("公司目录列出当前主要产品族；本批次完成 Gemini 330 系列八个具名型号的型号级索引，其他双目、ToF、结构光、计算平台与激光雷达型号仍待逐表补足。", "The company catalog lists current major product families. This batch completes model-level indexing for eight named Gemini 330 variants; other stereo, ToF, structured-light, camera-computer, and lidar models still require individual datasheet transcription."),
  verificationFocus: l("按具体型号核对基线、滤光片、深度与 RGB 快门、接口、同步、电源、防护、温度、SDK 和标定条件。", "Verify baseline, filter, depth and RGB shutters, interface, synchronization, power, ingress protection, temperature, SDK, and calibration conditions for the exact model."),
  questions: [
    l("工作距离、深度精度、视场、运动速度、强光和反光材料条件是什么？", "What are the working distance, depth accuracy, field of view, motion speed, strong-light, and reflective-material conditions?"),
    l("USB、PoE、GMSL2、硬件同步、PTP 或 RS-485 哪些是必需的？", "Which of USB, PoE, GMSL2, hardware sync, PTP, or RS-485 are required?"),
    l("IP 等级、线缆、安装、温度、标定和多相机外参如何验收？", "How will IP rating, cable, mounting, temperature, calibration, and multi-camera extrinsics be accepted?"),
  ],
});

const patchPal = (company: CompanyProfile, locale: Locale) => companyPatch(company, locale, {
  legalName: l("PAL ROBOTICS, S.L.", "PAL ROBOTICS, S.L."),
  country: l("西班牙", "Spain"),
  headquarters: l("西班牙巴塞罗那", "Barcelona, Spain"),
  founded: "2004",
  officialUrl: "https://pal-robotics.com/",
  valueChainRole: l("服务、研究和人形机器人平台厂商", "Service, research, and humanoid-robot platform manufacturer"),
  positioning: l("提供移动、双臂、人形和零售机器人，以及面向研究和集成的 ROS 软件与组件。", "Provides mobile, dual-arm, humanoid, and retail robots plus ROS-oriented software and components for research and integration."),
  strengths: [l("长期围绕 ROS、研究平台和可定制机器人开展产品化。", "Long-running product development around ROS, research platforms, and customizable robots."), l("TALOS 数据表公开全身自由度、传感器、计算、软件、视觉和电池参数。", "The TALOS datasheet publishes whole-body DoF, sensors, compute, software, vision, and battery specifications."), l("产品覆盖实验室研究、移动操作、零售盘点和服务场景。", "Products cover laboratory research, mobile manipulation, retail inventory, and service scenarios.")],
  products: ["TALOS", "TIAGo", "TIAGo Base", "TIAGo Pro", "ARI", "StockBot", "SOLO 12", "Kangaroo", "Kangaroo Pro"],
  fit: [l("全身控制、双臂操作、步行和人形机器人研究。", "Whole-body control, bimanual manipulation, walking, and humanoid-robot research."), l("ROS 研究、教学、移动操作和具身智能实验。", "ROS research, education, mobile manipulation, and embodied-AI experiments."), l("零售盘点、服务交互与定制机器人项目。", "Retail inventory, service interaction, and custom-robot projects.")],
  overview: [
    l("PAL Robotics 于 2004 年在巴塞罗那成立，法律主体为 PAL ROBOTICS, S.L.。公司时间线记录了从早期人形机器人到 TIAGo、TALOS、Kangaroo 和后续平台的演进。", "PAL Robotics was founded in Barcelona in 2004 and operates as PAL ROBOTICS, S.L. Its timeline records development from early humanoids through TIAGo, TALOS, Kangaroo, and later platforms."),
    l("本批次对 TALOS 官方两页数据表逐字段建档。TALOS 是研究型平台，公开配置可以定制；数据表中的 32 自由度、95 kg、双臂 6 kg 负载等数值不能自动外推到后续定制版本。", "This batch transcribes the two-page official TALOS datasheet field by field. TALOS is a customizable research platform; figures such as 32 DoF, 95 kg, and 6 kg per arm cannot be inferred for later custom configurations."),
    l("公司未在官网建立面向公众的定期财务报告库。本档案只记录官网可核对的公司和产品事实，不推断营收、利润或估值。", "The company website does not expose a public periodic-financial-report library. This profile records only verifiable company and product facts and does not infer revenue, profit, or valuation."),
  ],
  businessAreas: [l("人形与双臂研究机器人", "Humanoid and dual-arm research robots"), l("移动机器人、服务机器人和零售盘点", "Mobile robots, service robots, and retail inventory"), l("ROS 软件、仿真、机器人组件和定制平台", "ROS software, simulation, robot components, and custom platforms")],
  customerGroups: [l("高校、实验室和机器人研发机构", "Universities, laboratories, and robotics R&D organizations"), l("服务、零售、物流和工业试点团队", "Service, retail, logistics, and industrial pilot teams"), l("系统集成商、ROS 开发者和教育机构", "System integrators, ROS developers, and education institutions")],
  milestones: [
    { date: "2004", event: l("公司在巴塞罗那成立。", "The company was founded in Barcelona.") },
    { date: "2009", event: l("公司时间线记录开始将 ROS 集成到机器人平台。", "The company timeline records the start of ROS integration into its robots.") },
    { date: "2015", event: l("推出 TIAGo。", "TIAGo was introduced.") },
    { date: "2017", event: l("推出 TALOS。", "TALOS was introduced.") },
    { date: "2021", event: l("推出 Kangaroo。", "Kangaroo was introduced.") },
    { date: "2025", event: l("公司时间线列出 Kangaroo Pro 进入销售准备阶段。", "The company timeline lists Kangaroo Pro as ready for sale.") },
  ],
  catalogScope: l("列出官网当前主要机器人平台；本批次完成 TALOS 型号级数据表，其他平台仍待逐型号补足。", "Lists the main current robot platforms on the website; this batch completes the model-level TALOS datasheet, while other platforms still require individual model work."),
  verificationFocus: l("核对定制配置、关节与传感器版本、计算机、ROS/Ubuntu 版本、电池、维护、安全设施和实验室使用边界。", "Verify custom configuration, joint and sensor revisions, computers, ROS/Ubuntu versions, battery, maintenance, safety facilities, and laboratory-use boundaries."),
  questions: [l("目标研究任务需要哪些全身、双臂、步行、视觉和力控能力？", "Which whole-body, bimanual, walking, vision, and force-control capabilities are required?"), l("交付版本的关节、传感器、计算机、软件和仿真模型分别是什么？", "What joints, sensors, computers, software, and simulation models are included in the delivered version?"), l("实验室安全、急停、跌倒风险、维护、备件和培训如何落实？", "How will laboratory safety, emergency stop, fall risk, maintenance, spares, and training be handled?")],
});

const patchTesollo = (company: CompanyProfile, locale: Locale) => companyPatch(company, locale, {
  legalName: l("Tesollo Inc.", "Tesollo Inc."),
  country: l("韩国", "South Korea"),
  headquarters: l("韩国仁川", "Incheon, South Korea"),
  founded: "2019-01",
  officialUrl: "https://www.tesollo.com/",
  valueChainRole: l("多关节机器人手与夹爪厂商", "Multi-joint robotic hand and gripper manufacturer"),
  positioning: l("以一至五指独立关节驱动产品覆盖工业抓取、人形机器人和 Physical AI 研究。", "Provides one- to five-finger independently articulated products for industrial gripping, humanoid robots, and Physical AI research."),
  strengths: [l("产品线从真空单指到 20 自由度五指手，型号边界清晰。", "The product line spans a vacuum single-finger tool to 20-DoF five-finger hands with clear model boundaries."), l("产品页公开电气、通信、控制频率、编码器、自由度、抓力和质量。", "Product pages publish electrical, communication, control-rate, encoder, DoF, grip-force, and mass data."), l("提供 C/C++ SDK、ROS 2、URCap 与 TMflow 等集成入口。", "Provides integration entry points including C/C++ SDK, ROS 2, URCap, and TMflow.")],
  products: ["DG-5F-M", "DG-5F-S", "DG-4F", "DG-3F-M", "DG-2F", "DG-1F", "DG-C", "DG-3F-B（已停产）"],
  fit: [l("人形机器人灵巧操作与具身智能研究。", "Humanoid dexterous manipulation and embodied-AI research."), l("工业自动化、物流抓取、装配和异形件处理。", "Industrial automation, logistics picking, assembly, and irregular-object handling."), l("需要多关节独立控制、力/触觉选件和 ROS 2 集成的团队。", "Teams requiring independent multi-joint control, force/tactile options, and ROS 2 integration.")],
  overview: [
    l("Tesollo Inc. 成立于 2019 年，总部位于韩国仁川，研发中心和工厂位于京畿道光明。官网将其定位为机器人手与夹爪厂商，并列出 CEO、注册地址、研发中心和工厂。", "Tesollo Inc. was founded in 2019 and is headquartered in Incheon, South Korea, with an R&D center and factory in Gwangmyeong, Gyeonggi-do. Its website identifies the company as a robotic-hand and gripper maker and publishes its CEO, office, R&D, and factory details."),
    l("当前产品页列出 DG-5F-M、DG-5F-S、DG-4F、DG-3F-M、DG-2F、DG-1F 和定制 DG-C；DG-3F-B 明确标记为停产且销售于 2025 年结束。本仓库保留其历史记录，但不会把它列为当前可采购型号。", "The current product page lists DG-5F-M, DG-5F-S, DG-4F, DG-3F-M, DG-2F, DG-1F, and custom DG-C. DG-3F-B is explicitly marked discontinued with sales ending in 2025. The repository retains it as a historical record but does not treat it as a current orderable model."),
    l("官网 FAQ 给出软件支持、关节重复性和模块寿命测试口径；这些共享说明不能替代具体型号、负载、姿态、速度和环境下的项目验收。", "The website FAQ publishes software support, joint-repeatability, and module-cycle-test statements. These shared statements do not replace project acceptance for the exact model, load, pose, speed, and environment."),
  ],
  businessAreas: [l("多指灵巧手与独立驱动夹爪", "Multi-finger dexterous hands and independently actuated grippers"), l("真空末端、力觉/触觉选件与定制末端", "Vacuum end effectors, force/tactile options, and custom tooling"), l("SDK、ROS 2 与协作机器人软件集成", "SDK, ROS 2, and collaborative-robot software integration")],
  customerGroups: [l("人形机器人和 Physical AI 研发团队", "Humanoid-robot and Physical AI R&D teams"), l("制造、物流、装配和机器人自动化集成商", "Manufacturing, logistics, assembly, and robot-automation integrators"), l("高校、研究机构和机器人开发者", "Universities, research organizations, and robotics developers")],
  milestones: [
    { date: "2019-01", event: l("公司成立。", "The company was founded.") },
    { date: "2020", event: l("公司设立研发中心。", "The company established its R&D center.") },
    { date: "2022", event: l("公司时间线记录 DG-3F 向 LG 交付。", "The company timeline records delivery of DG-3F to LG.") },
    { date: "2025", event: l("DG-3F-B 销售结束并标记停产。", "Sales of DG-3F-B ended and the model was marked discontinued.") },
    { date: "2026-02", event: l("公司时间线记录 DG-5F-S 商业化。", "The company timeline records commercialization of DG-5F-S.") },
    { date: "2026-06", event: l("公司时间线记录完成 B 轮融资。", "The company timeline records completion of Series B financing.") },
  ],
  catalogScope: l("覆盖官网产品索引中的七个当前产品入口和一个已停产型号；DG-C 为定制能力记录，不声明固定数值参数。", "Covers seven current product entries and one discontinued model in the official product index. DG-C is a custom-capability record and does not claim fixed numerical specifications."),
  verificationFocus: l("锁定手指数、自由度、抓力定义、传感选件、接口、控制频率、法兰、软件包、寿命条件和停产状态。", "Lock finger count, DoF, force definition, sensor options, interface, control rate, flange, software package, life-test conditions, and discontinuation status."),
  questions: [l("对象尺寸、质量、材质、抓取姿态、速度和所需抓力是什么？", "What are the object dimensions, mass, material, grasp pose, speed, and required force?"), l("需要哪种力觉、触觉、吸盘、法兰、通信和软件集成？", "Which force, tactile, suction, flange, communication, and software integrations are required?"), l("关节寿命、重复性、连续工况、断电状态和安全如何验收？", "How will joint life, repeatability, continuous duty, power-loss state, and safety be accepted?")],
});

export const applyVerifiedWaveSixCompanyPatch = (company: CompanyProfile, locale: Locale): CompanyProfile => {
  if (company.slug === "livox") return patchLivox(company, locale);
  if (company.slug === "orbbec") return patchOrbbec(company, locale);
  if (company.slug === "pal-robotics") return patchPal(company, locale);
  if (company.slug === "tesollo") return patchTesollo(company, locale);
  return company;
};

const row = (
  sourceUrl: string,
  sourceLabel: Localized,
  locator: Localized,
  label: Localized,
  value: Localized,
  conditions?: Localized,
): SpecRow => ({ sourceUrl, sourceLabel, locator, label, value, conditions });

const simpleRow = (
  sourceUrl: string,
  sourceLabel: Localized,
  locator: Localized,
  labelZh: string,
  labelEn: string,
  valueZh: string,
  valueEn = valueZh,
  conditions?: Localized,
) => row(sourceUrl, sourceLabel, locator, l(labelZh, labelEn), l(valueZh, valueEn), conditions);

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

const companyAboutUrl: Record<WaveSixCompanySlug, string> = {
  livox: LIV0X_ABOUT,
  orbbec: ORBBEC_ABOUT,
  "pal-robotics": PAL_ABOUT,
  tesollo: TESOLLO_ABOUT,
};

const catalogTitle: Record<WaveSixCompanySlug, Localized> = {
  livox: l("览沃型号级产品目录", "Livox model-level product catalog"),
  orbbec: l("奥比中光型号级产品目录", "Orbbec model-level product catalog"),
  "pal-robotics": l("PAL Robotics 型号级产品目录", "PAL Robotics model-level product catalog"),
  tesollo: l("TESOLLO 型号级产品目录", "TESOLLO model-level product catalog"),
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
  openness: locale === "zh" ? "官方产品页或数据表公开" : "Official product page or datasheet is public",
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
  catalogScope: seed.catalogScope ? t(locale, seed.catalogScope) : (locale === "zh"
    ? "本条对应具名型号；数值只适用于来源页所述配置和条件。"
    : "This record maps to a named model; figures apply only to the configuration and conditions in the cited source."),
  profile: finderProfile(company),
  evidence: {
    level: seed.level ?? "model",
    specificationKind: seed.specificationKind ?? "parameters",
    specificationCoverage: seed.coverage,
    specificationCoverageNote: locale === "zh"
      ? seed.coverage === "official-complete"
        ? "已逐项覆盖当前引用官方规格表的公开字段；后续版本变化仍以来源页和订单文件为准。"
        : seed.coverage === "capability-only"
          ? "该入口描述定制能力而非固定型号规格，未用推断值填充。"
          : "已索引当前入口可核对的规格，但尚不能声明厂商全部文档字段均已覆盖。"
      : seed.coverage === "official-complete"
        ? "All public fields in the currently cited official specification table are covered; later revisions remain governed by the source and order documents."
        : seed.coverage === "capability-only"
          ? "The entry describes a custom capability rather than a fixed model specification, so no inferred values are added."
          : "Verifiable specifications on the current entry are indexed, but complete coverage of every manufacturer document is not claimed.",
    overview: seed.overview.map((item) => t(locale, item)),
    applications: seed.applications.map((item) => t(locale, item)),
    disclosureBoundary: locale === "zh"
      ? "公开数值只适用于引用来源、具名型号、配置和测试条件；未公开字段、价格、交期和项目性能不作推断。"
      : "Published figures apply only to the cited source, named model, configuration, and test conditions; undisclosed fields, price, lead time, and project performance are not inferred.",
    sourceLinks: [...new Map([
      { label: locale === "zh" ? `${seed.product} 官方资料` : `${seed.product} official material`, url: seed.pageUrl },
      ...(seed.sourceLinks ?? []).map((item) => ({ label: t(locale, item.label), url: item.url })),
      { label: locale === "zh" ? "公司官方介绍" : "Official company profile", url: companyAboutUrl[seed.companySlug] },
    ].map((item) => [item.url, item])).values()],
  },
});

const livoxSource = l("Livox 官方规格页", "Livox official specification page");
const livoxLocator = l("Basic Specs 与 Notes", "Basic Specs and Notes");
const livoxRow = (pageUrl: string, zh: string, en: string, valueZh: string, valueEn = valueZh, conditions?: Localized) => (
  simpleRow(pageUrl, livoxSource, livoxLocator, zh, en, valueZh, valueEn, conditions)
);

const mid360Page = "https://www.livoxtech.com/cn/mid-360/specs";
const mid360sPage = "https://www.livoxtech.com/mid-360s/specs";
const mid70Page = "https://www.livoxtech.com/mid-70/specs";
const aviaPage = "https://www.livoxtech.com/de/avia/specs";
const avia2Page = "https://www.livoxtech.com/avia-2/specs";
const tele15Page = "https://www.livoxtech.com/tele-15/specs";

const livoxShared = {
  companySlug: "livox" as const,
  category: "perception" as const,
  primary: "sensing",
  subclass: "lidar",
  useCases: ["research", "logistics", "integration"] satisfies FinderUseCase[],
  integration: l("通过以太网、官方 SDK 与产品支持的时间同步方式接入点云系统；供电、线缆、散热和同步拓扑必须按型号确认。", "Integrates into point-cloud systems through Ethernet, the official SDK, and model-supported time synchronization. Power, cabling, cooling, and timing topology must be confirmed per model."),
  verification: l("在目标反射率、日照、距离、雾雨、振动和运动条件下复测量程与精度，并核对低温启动功耗、外壳温度和 IP 边界。", "Retest range and precision under target reflectivity, sunlight, distance, fog/rain, vibration, and motion, and verify low-temperature startup power, enclosure temperature, and IP boundaries."),
  applications: [l("移动机器人定位、导航与避障", "Mobile-robot localization, navigation, and obstacle avoidance"), l("三维测绘、重建与环境感知", "3D mapping, reconstruction, and environmental perception")],
  coverage: "official-complete" as FinderSpecificationCoverage,
};

const livoxSeeds: ProductSeed[] = [
  {
    ...livoxShared,
    id: "livox-mid-360",
    product: "MID-360",
    pageUrl: mid360Page,
    type: l("近距 360 度三维激光雷达", "Near-field 360-degree 3D lidar"),
    rows: [
      livoxRow(mid360Page, "型号", "Model", "MID-360"),
      livoxRow(mid360Page, "激光波长", "Laser wavelength", "905 nm"),
      livoxRow(mid360Page, "激光安全等级", "Laser safety", "Class 1（IEC 60825-1:2014）", "Class 1 (IEC 60825-1:2014)"),
      livoxRow(mid360Page, "100 klx、10% 反射率量程", "Range at 100 klx and 10% reflectivity", "40 m"),
      livoxRow(mid360Page, "100 klx、80% 反射率量程", "Range at 100 klx and 80% reflectivity", "70 m"),
      livoxRow(mid360Page, "近处盲区", "Close-proximity blind zone", "0.1 m", "0.1 m", l("0.1–0.2 m 可输出点云，但厂商不保证精度。", "Point clouds may be output from 0.1-0.2 m, but precision is not guaranteed.")),
      livoxRow(mid360Page, "水平视场", "Horizontal field of view", "360°"),
      livoxRow(mid360Page, "垂直视场", "Vertical field of view", "-7° 至 52°", "-7° to 52°"),
      livoxRow(mid360Page, "10 m 测距随机误差", "Range precision at 10 m", "≤2 cm（1σ）", "<=2 cm (1 sigma)", l("25°C、80% 反射率目标、10 m。", "25°C, 80% reflectivity target, 10 m.")),
      livoxRow(mid360Page, "0.2 m 测距随机误差", "Range precision at 0.2 m", "≤3 cm（1σ）", "<=3 cm (1 sigma)", l("25°C、80% 反射率目标、0.2 m。", "25°C, 80% reflectivity target, 0.2 m.")),
      livoxRow(mid360Page, "角度随机误差", "Angular precision", "<0.15°（1σ）", "<0.15° (1 sigma)"),
      livoxRow(mid360Page, "点云输出", "Point rate", "200,000 点/s（可配置第一回波）", "200,000 points/s (configurable first return)"),
      livoxRow(mid360Page, "点云帧率", "Frame rate", "10 Hz（典型值）", "10 Hz (typical)"),
      livoxRow(mid360Page, "数据网口", "Data port", "100BASE-TX 以太网", "100BASE-TX Ethernet"),
      livoxRow(mid360Page, "数据同步", "Data synchronization", "IEEE 1588-2008 PTPv2、GPS", "IEEE 1588-2008 PTPv2, GPS"),
      livoxRow(mid360Page, "抗串扰", "Anti-interference", "支持", "Available"),
      livoxRow(mid360Page, "100 klx 虚警率", "False-alarm rate at 100 klx", "<0.01%", "<0.01%", l("25°C、100 klx 杂散光测试。", "25°C, 100 klx stray-light test.")),
      livoxRow(mid360Page, "内置 IMU", "Built-in IMU", "ICM40609"),
      livoxRow(mid360Page, "工作温度", "Operating temperature", "-20°C 至 55°C", "-20°C to 55°C"),
      livoxRow(mid360Page, "防护等级", "Ingress protection", "IP67"),
      livoxRow(mid360Page, "典型功耗", "Typical power", "6.5 W"),
      livoxRow(mid360Page, "低温自加热峰值功耗", "Low-temperature self-heating peak power", "最高 14 W", "Up to 14 W", l("环境温度 -20°C 至 0°C。", "Ambient temperature -20°C to 0°C.")),
      livoxRow(mid360Page, "供电电压范围", "Supply-voltage range", "9–27 V DC"),
      livoxRow(mid360Page, "尺寸", "Dimensions", "65 × 65 × 60 mm"),
      livoxRow(mid360Page, "质量", "Weight", "265 g"),
    ],
    overview: [l("MID-360 以水平 360°、垂直 -7° 至 52° 视场和 0.1 m 近处盲区面向小型移动机器人近距感知。", "MID-360 targets near-field perception on compact mobile robots with a 360-degree horizontal and -7 to 52-degree vertical field of view and a 0.1 m blind zone."), l("页面列出的量程和误差均带反射率、照度、距离或温度条件；低反射率细小物体、水面和亮面近距检测不能只按标称盲区判断。", "Published range and error figures carry reflectivity, illumination, distance, or temperature conditions; near-field detection of low-reflectivity small objects, water, and polished surfaces cannot be judged from the nominal blind zone alone.")],
  },
  {
    ...livoxShared,
    id: "livox-mid-360s",
    product: "MID-360S",
    pageUrl: mid360sPage,
    type: l("近距 360 度三维激光雷达", "Near-field 360-degree 3D lidar"),
    rows: [
      livoxRow(mid360sPage, "型号", "Model", "MID-360S"),
      livoxRow(mid360sPage, "激光波长", "Laser wavelength", "905 nm"),
      livoxRow(mid360sPage, "激光安全等级", "Laser safety", "Class 1（IEC 60825-1:2014）", "Class 1 (IEC 60825-1:2014)"),
      livoxRow(mid360sPage, "100 klx、10% 反射率典型量程", "Typical range at 100 klx and 10% reflectivity", "40 m"),
      livoxRow(mid360sPage, "截止量程", "Cut-off range", "100 m"),
      livoxRow(mid360sPage, "近处盲区", "Close-proximity blind zone", "0.1 m", "0.1 m", l("0.1–0.2 m 可输出点云，但精度不保证。", "Point clouds may be output from 0.1-0.2 m, but precision is not guaranteed.")),
      livoxRow(mid360sPage, "水平视场", "Horizontal field of view", "360°"),
      livoxRow(mid360sPage, "垂直视场", "Vertical field of view", "-7° 至 52°（典型值）", "-7° to 52° (typical)"),
      livoxRow(mid360sPage, "10 m 测距精密度", "Range precision at 10 m", "≤2 cm（1σ）", "<=2 cm (1 sigma)", l("25°C、80% 反射率目标。", "25°C, 80% reflectivity target.")),
      livoxRow(mid360sPage, "0.2 m 测距精密度", "Range precision at 0.2 m", "≤4 cm（1σ）", "<=4 cm (1 sigma)", l("25°C、80% 反射率目标。", "25°C, 80% reflectivity target.")),
      livoxRow(mid360sPage, "角度精密度", "Angular precision", "<0.15°（1σ）", "<0.15° (1 sigma)"),
      livoxRow(mid360sPage, "点率", "Point rate", "200,000 点/s（第一回波）", "200,000 points/s (first return)"),
      livoxRow(mid360sPage, "帧率", "Frame rate", "10 Hz（典型值）", "10 Hz (typical)"),
      livoxRow(mid360sPage, "数据口", "Data port", "100BASE-TX 以太网", "100BASE-TX Ethernet"),
      livoxRow(mid360sPage, "数据同步", "Data synchronization", "IEEE 1588-2008 PTPv2、GPS", "IEEE 1588-2008 PTPv2, GPS"),
      livoxRow(mid360sPage, "抗串扰", "Anti-interference", "支持", "Available"),
      livoxRow(mid360sPage, "100 klx 虚警率", "False-alarm rate at 100 klx", "<0.01%", "<0.01%", l("25°C、100 klx 杂散光测试。", "25°C, 100 klx stray-light test.")),
      livoxRow(mid360sPage, "内置 IMU", "Built-in IMU", "ICM40609"),
      livoxRow(mid360sPage, "工作温度", "Operating temperature", "-20°C 至 55°C", "-20°C to 55°C"),
      livoxRow(mid360sPage, "防护等级", "Ingress protection", "IP67"),
      livoxRow(mid360sPage, "典型功耗", "Typical power", "6.5 W"),
      livoxRow(mid360sPage, "低温自加热峰值功耗", "Low-temperature self-heating peak power", "最高 14 W", "Up to 14 W", l("环境温度 -20°C 至 0°C。", "Ambient temperature -20°C to 0°C.")),
      livoxRow(mid360sPage, "供电电压范围", "Supply-voltage range", "9–27 V DC"),
      livoxRow(mid360sPage, "尺寸", "Dimensions", "65 × 65 × 60 mm"),
      livoxRow(mid360sPage, "质量", "Weight", "265 g"),
    ],
    overview: [l("MID-360S 在与 MID-360 相近的尺寸、功耗和全向视场下公开了 100 m 截止量程，并将 0.2 m 处精密度列为不超过 4 cm。", "MID-360S retains dimensions, power, and all-around field of view similar to MID-360 while publishing a 100 m cut-off range and no more than 4 cm precision at 0.2 m."), l("40 m 是 100 klx、10% 反射率下的典型值，100 m 是截止量程，两者不能作为同一检测概率口径直接比较。", "The 40 m figure is a typical value at 100 klx and 10% reflectivity, while 100 m is a cut-off range; they are not directly comparable under one detection-probability definition.")],
  },
  {
    ...livoxShared,
    id: "livox-mid-70",
    product: "Mid-70",
    pageUrl: mid70Page,
    type: l("中距非重复扫描三维激光雷达", "Mid-range non-repetitive-scan 3D lidar"),
    rows: [
      livoxRow(mid70Page, "型号", "Model", "MID-70"),
      livoxRow(mid70Page, "激光波长", "Laser wavelength", "905 nm"),
      livoxRow(mid70Page, "激光安全等级", "Laser safety", "Class 1（IEC 60825-1:2014）", "Class 1 (IEC 60825-1:2014)"),
      livoxRow(mid70Page, "100 klx、10% 反射率量程", "Range at 100 klx and 10% reflectivity", "90 m"),
      livoxRow(mid70Page, "100 klx、20% 反射率量程", "Range at 100 klx and 20% reflectivity", "130 m"),
      livoxRow(mid70Page, "100 klx、80% 反射率量程", "Range at 100 klx and 80% reflectivity", "260 m"),
      livoxRow(mid70Page, "视场", "Field of view", "70.4° 圆形", "70.4° circular"),
      livoxRow(mid70Page, "20 m 测距精密度", "Range precision at 20 m", "≤2 cm（1σ）", "<=2 cm (1 sigma)", l("25°C、30% 反射率目标、20 m。", "25°C, 30% reflectivity target, 20 m.")),
      livoxRow(mid70Page, "0.2–1 m 测距精密度", "Range precision at 0.2-1 m", "≤3 cm（1σ）", "<=3 cm (1 sigma)", l("25°C、30% 反射率目标。", "25°C, 30% reflectivity target.")),
      livoxRow(mid70Page, "角度精密度", "Angular precision", "<0.1°（1σ）", "<0.1° (1 sigma)"),
      livoxRow(mid70Page, "光束发散角", "Beam divergence", "0.28° 垂直 × 0.03° 水平", "0.28° vertical x 0.03° horizontal"),
      livoxRow(mid70Page, "单回波点率", "Single-return point rate", "100,000 点/s", "100,000 points/s"),
      livoxRow(mid70Page, "双回波点率", "Dual-return point rate", "200,000 点/s", "200,000 points/s"),
      livoxRow(mid70Page, "数据延迟", "Data latency", "≤2 ms", "<=2 ms"),
      livoxRow(mid70Page, "数据口", "Data port", "100 Mbps 以太网", "100 Mbps Ethernet"),
      livoxRow(mid70Page, "数据同步", "Data synchronization", "PTPv2、PPS、GPS（PPS+UTC）", "PTPv2, PPS, GPS (PPS+UTC)"),
      livoxRow(mid70Page, "100 klx 虚警率", "False-alarm rate at 100 klx", "<0.01%"),
      livoxRow(mid70Page, "工作温度", "Operating temperature", "-20°C 至 65°C", "-20°C to 65°C"),
      livoxRow(mid70Page, "防护等级", "Ingress protection", "IP67", "IP67", l("不包括 Livox Converter 2.0 和线缆。", "Excludes Livox Converter 2.0 and cables.")),
      livoxRow(mid70Page, "平均功耗", "Average power", "8 W"),
      livoxRow(mid70Page, "供电电压", "Supply voltage", "10–15 V DC；使用 Converter 2.0 时 9–30 V DC", "10-15 V DC; 9-30 V DC with Converter 2.0"),
      livoxRow(mid70Page, "尺寸", "Dimensions", "97 × 64 × 62.7 mm"),
      livoxRow(mid70Page, "质量", "Weight", "580 g"),
    ],
    overview: [l("Mid-70 采用 70.4° 圆形视场，面向中距三维感知；官网在 100 klx 下分别给出 10%、20% 和 80% 反射率量程。", "Mid-70 uses a 70.4-degree circular field of view for mid-range 3D perception, with published 100-klx ranges at 10%, 20%, and 80% reflectivity."), l("起动功率可能高于 8 W 平均值，且 IP67 不覆盖转换器和线缆，系统电源与防护设计需单独留量。", "Startup power may exceed the 8 W average, and IP67 excludes the converter and cables, so system power and protection need separate margin.")],
  },
  {
    ...livoxShared,
    id: "livox-avia",
    product: "Avia",
    pageUrl: aviaPage,
    type: l("双扫描模式三维激光雷达", "Dual-scan-mode 3D lidar"),
    rows: [
      livoxRow(aviaPage, "型号", "Model", "AVIA"),
      livoxRow(aviaPage, "激光波长", "Laser wavelength", "905 nm"),
      livoxRow(aviaPage, "激光安全等级", "Laser safety", "Class 1（IEC 60825-1:2014）", "Class 1 (IEC 60825-1:2014)"),
      livoxRow(aviaPage, "100 klx 量程", "Range at 100 klx", "190 m @ 10%；230 m @ 20%；320 m @ 80% 反射率", "190 m @ 10%; 230 m @ 20%; 320 m @ 80% reflectivity"),
      livoxRow(aviaPage, "0 klx 量程", "Range at 0 klx", "190 m @ 10%；260 m @ 20%；450 m @ 80% 反射率", "190 m @ 10%; 260 m @ 20%; 450 m @ 80% reflectivity"),
      livoxRow(aviaPage, "非重复扫描视场", "Non-repetitive-scan field of view", "70.4° 水平 × 77.2° 垂直", "70.4° horizontal x 77.2° vertical"),
      livoxRow(aviaPage, "重复线扫描视场", "Repetitive-line-scan field of view", "70.4° 水平 × 4.5° 垂直", "70.4° horizontal x 4.5° vertical"),
      livoxRow(aviaPage, "测距精密度", "Range precision", "2 cm（1σ）", "2 cm (1 sigma)", l("25°C、80% 反射率目标、20 m。", "25°C, 80% reflectivity target, 20 m.")),
      livoxRow(aviaPage, "角度精密度", "Angular precision", "<0.05°（1σ）", "<0.05° (1 sigma)"),
      livoxRow(aviaPage, "光束发散角", "Beam divergence", "0.28° 垂直 × 0.03° 水平", "0.28° vertical x 0.03° horizontal"),
      livoxRow(aviaPage, "第一/最强回波点率", "First/strongest-return point rate", "240,000 点/s", "240,000 points/s"),
      livoxRow(aviaPage, "双回波点率", "Dual-return point rate", "480,000 点/s", "480,000 points/s"),
      livoxRow(aviaPage, "三回波点率", "Triple-return point rate", "720,000 点/s", "720,000 points/s"),
      livoxRow(aviaPage, "数据延迟", "Data latency", "≤2 ms", "<=2 ms"),
      livoxRow(aviaPage, "数据口", "Data port", "100 Mbps 以太网", "100 Mbps Ethernet"),
      livoxRow(aviaPage, "数据同步", "Data synchronization", "PTPv2、PPS、GPS（PPS+UTC）", "PTPv2, PPS, GPS (PPS+UTC)"),
      livoxRow(aviaPage, "100 klx 虚警率", "False-alarm rate at 100 klx", "<0.0003%", "<0.0003%", l("0–100 klx、25°C。", "0-100 klx, 25°C.")),
      livoxRow(aviaPage, "内置 IMU", "Built-in IMU", "BMI088"),
      livoxRow(aviaPage, "工作温度", "Operating temperature", "-20°C 至 65°C", "-20°C to 65°C"),
      livoxRow(aviaPage, "防护等级", "Ingress protection", "IP67", "IP67", l("不包括 Converter 2.0 和线缆。", "Excludes Converter 2.0 and cables.")),
      livoxRow(aviaPage, "非重复扫描功耗", "Non-repetitive-scan power", "8 W；启动 16 W", "8 W; 16 W startup"),
      livoxRow(aviaPage, "重复扫描功耗", "Repetitive-scan power", "9 W；启动 16 W", "9 W; 16 W startup"),
      livoxRow(aviaPage, "供电电压", "Supply voltage", "10–15 V DC；使用 Converter 2.0 时 9–30 V DC", "10-15 V DC; 9-30 V DC with Converter 2.0"),
      livoxRow(aviaPage, "噪声", "Noise", "40 cm 全向 <45 dBA", "<45 dBA omnidirectional at 40 cm"),
      livoxRow(aviaPage, "尺寸", "Dimensions", "91 × 61.2 × 64.8 mm"),
      livoxRow(aviaPage, "质量", "Weight", "498 g（不含线缆）", "498 g (without cables)"),
    ],
    overview: [l("Avia 在非重复扫描和重复线扫描之间提供两种视场，并支持最多三回波、720,000 点/s。", "Avia provides non-repetitive and repetitive line-scan fields of view and supports up to triple returns at 720,000 points/s."), l("两种扫描模式的功耗和覆盖不同；量程还受照度与反射率影响，选型时应按实际扫描模式比较。", "The scan modes differ in power and coverage, while range depends on illumination and reflectivity; selection should compare the actual intended scan mode.")],
  },
  {
    ...livoxShared,
    id: "livox-avia-2",
    product: "Avia 2",
    pageUrl: avia2Page,
    type: l("1535 nm 长距双模式三维激光雷达", "1535 nm long-range dual-mode 3D lidar"),
    rows: [
      livoxRow(avia2Page, "型号", "Model", "Avia 2"),
      livoxRow(avia2Page, "激光波长", "Laser wavelength", "1535 nm"),
      livoxRow(avia2Page, "激光安全等级", "Laser safety", "Class 1（IEC 60825-1:2014）", "Class 1 (IEC 60825-1:2014)"),
      livoxRow(avia2Page, "普通模式量程", "Normal-mode range", "400 m @ 5% 反射率（约等效 600 m @ 10%）", "400 m @ 5% reflectivity (about 600 m equivalent at 10%)", l("100 klx、受控环境；实际结果随环境和用途变化。", "100 klx in a controlled environment; actual results vary by environment and use.")),
      livoxRow(avia2Page, "聚焦模式量程", "Focus-mode range", "≥800 m @ 10% 反射率", ">=800 m @ 10% reflectivity", l("100 klx、受控环境。", "100 klx in a controlled environment.")),
      livoxRow(avia2Page, "最大检测距离", "Maximum detection range", "普通模式 400 m；聚焦模式 1000 m", "400 m normal; 1000 m focus"),
      livoxRow(avia2Page, "视场", "Field of view", "普通模式 80° × 80°；聚焦模式 15° × 15°", "80° x 80° normal; 15° x 15° focus"),
      livoxRow(avia2Page, "盲区", "Blind zone", "5 m @ 80% 反射率", "5 m @ 80% reflectivity"),
      livoxRow(avia2Page, "5–400 m 测距准确度", "Range accuracy at 5-400 m", "≤5 cm", "<=5 cm", l("视场中心、25°C、80% 反射率、5–90 m 并使用衰减器。", "FOV center, 25°C, 80% reflectivity, 5-90 m, with attenuator.")),
      livoxRow(avia2Page, "5–400 m 测距精密度", "Range precision at 5-400 m", "≤4 cm（1σ）", "<=4 cm (1 sigma)"),
      livoxRow(avia2Page, "400–700 m 测距准确度", "Range accuracy at 400-700 m", "≤10 cm", "<=10 cm"),
      livoxRow(avia2Page, "400–700 m 测距精密度", "Range precision at 400-700 m", "≤6 cm（1σ）", "<=6 cm (1 sigma)"),
      livoxRow(avia2Page, "角度精密度", "Angular precision", "≤0.02°（1σ）", "<=0.02° (1 sigma)"),
      livoxRow(avia2Page, "点率", "Point rate", "普通模式 350,000 点/s；聚焦模式 100,000 点/s", "350,000 points/s normal; 100,000 points/s focus"),
      livoxRow(avia2Page, "点云数据格式", "Point-cloud data format", "x/y/z/intensity/tag（笛卡尔坐标）", "x/y/z/intensity/tag (Cartesian coordinates)"),
      livoxRow(avia2Page, "虚警率", "False-alarm rate", "≤0.01%", "<=0.01%", l("0–100 klx、25°C。", "0-100 klx, 25°C.")),
      livoxRow(avia2Page, "回波模式", "Return modes", "最强、第一、双回波", "Strongest, first, and dual return"),
      livoxRow(avia2Page, "内置 IMU", "Built-in IMU", "ICM40609D"),
      livoxRow(avia2Page, "工作温度", "Operating temperature", "-20°C 至 65°C", "-20°C to 65°C"),
      livoxRow(avia2Page, "防护等级", "Ingress protection", "IP66"),
      livoxRow(avia2Page, "功耗", "Power", "常温启动 55 W、稳态 50 W；低温无风扇启动 55 W、稳态 45 W", "55 W startup and 50 W steady at regular temperature; 55 W startup and 45 W steady at low temperature without fan"),
      livoxRow(avia2Page, "供电电压", "Supply voltage", "9–27 V DC"),
      livoxRow(avia2Page, "数据口", "Data port", "100 Mbps 以太网", "100 Mbps Ethernet"),
      livoxRow(avia2Page, "数据同步", "Data synchronization", "GPS（PPS+GPRMC）、PTP（IEEE 1588）、NTP", "GPS (PPS+GPRMC), PTP (IEEE 1588), NTP"),
      livoxRow(avia2Page, "尺寸", "Dimensions", "带风扇 146 × 113 × 139 mm；不带风扇 146 × 113 × 103 mm（±0.5 mm）", "146 x 113 x 139 mm with fan; 146 x 113 x 103 mm without fan (+/-0.5 mm)"),
      livoxRow(avia2Page, "质量", "Weight", "带风扇 ≤1.8 kg；不带风扇 ≤1.5 kg", "<=1.8 kg with fan; <=1.5 kg without fan"),
    ],
    overview: [l("Avia 2 以 1535 nm 激光、普通 80° × 80° 视场与聚焦 15° × 15° 模式覆盖长距感知。", "Avia 2 combines a 1535 nm laser with an 80 x 80-degree normal field and a 15 x 15-degree focus mode for long-range perception."), l("量程、等效反射率和精度来自厂商受控条件；普通与聚焦模式的视场、点率和最大距离不同，不应只比较单个 1000 m 数字。", "Range, equivalent-reflectivity, and precision figures come from manufacturer-controlled conditions. Normal and focus modes differ in field of view, point rate, and maximum range, so selection should not hinge on the 1000 m figure alone.")],
  },
  {
    ...livoxShared,
    id: "livox-tele-15",
    product: "Tele-15",
    pageUrl: tele15Page,
    type: l("窄视场长距三维激光雷达", "Narrow-field long-range 3D lidar"),
    rows: [
      livoxRow(tele15Page, "型号", "Model", "TELE-15"),
      livoxRow(tele15Page, "激光波长", "Laser wavelength", "905 nm"),
      livoxRow(tele15Page, "激光安全等级", "Laser safety", "Class 1（IEC 60825-1:2014）", "Class 1 (IEC 60825-1:2014)"),
      livoxRow(tele15Page, "100 klx、10% 反射率量程", "Range at 100 klx and 10% reflectivity", "320 m"),
      livoxRow(tele15Page, "100 klx、50% 反射率量程", "Range at 100 klx and 50% reflectivity", "500 m"),
      livoxRow(tele15Page, "视场", "Field of view", "14.5° × 16.2°"),
      livoxRow(tele15Page, "测距精密度", "Range precision", "2 cm（1σ）", "2 cm (1 sigma)", l("25°C、80% 反射率目标、20 m。", "25°C, 80% reflectivity target, 20 m.")),
      livoxRow(tele15Page, "角度精密度", "Angular precision", "<0.03°", "<0.03°"),
      livoxRow(tele15Page, "光束发散角", "Beam divergence", "0.12° 垂直 × 0.02° 水平", "0.12° vertical x 0.02° horizontal"),
      livoxRow(tele15Page, "点率", "Point rate", "240,000 点/s；双回波 480,000 点/s", "240,000 points/s; 480,000 points/s dual return"),
      livoxRow(tele15Page, "视场覆盖率", "Field-of-view coverage", "99.8% @ 0.1 s"),
      livoxRow(tele15Page, "数据延迟", "Data latency", "≤2 ms", "<=2 ms"),
      livoxRow(tele15Page, "数据口", "Data port", "100 Mbps 以太网", "100 Mbps Ethernet"),
      livoxRow(tele15Page, "虚警率", "False-alarm rate", "<0.01%", "<0.01%", l("100 klx 日光杂散光条件。", "100 klx daylight stray-light condition.")),
      livoxRow(tele15Page, "内置 IMU", "Built-in IMU", "BMI088"),
      livoxRow(tele15Page, "工作温度", "Operating temperature", "-40°C 至 85°C", "-40°C to 85°C"),
      livoxRow(tele15Page, "防护等级", "Ingress protection", "IP67"),
      livoxRow(tele15Page, "典型功耗", "Typical power", "12 W"),
      livoxRow(tele15Page, "供电电压", "Supply voltage", "10–15 V DC；使用 Converter 2.0 时 9–30 V DC", "10-15 V DC; 9-30 V DC with Converter 2.0"),
      livoxRow(tele15Page, "数据同步", "Data synchronization", "IEEE 1588-2008 PTPv2、PPS", "IEEE 1588-2008 PTPv2, PPS"),
      livoxRow(tele15Page, "尺寸", "Dimensions", "带自散热模块 112 × 94.2 × 122 mm；不带 112 × 82.4 × 122 mm", "112 x 94.2 x 122 mm with self-dissipation module; 112 x 82.4 x 122 mm without"),
      livoxRow(tele15Page, "质量", "Weight", "带自散热模块 1600 g；不带 1500 g", "1600 g with self-dissipation module; 1500 g without"),
    ],
    overview: [l("Tele-15 以 14.5° × 16.2° 窄视场和 320 m/500 m 公开量程面向长距测绘与检测。", "Tele-15 targets long-range mapping and detection with a 14.5 x 16.2-degree narrow field and published 320 m / 500 m ranges."), l("其重量、尺寸和散热模块明显不同于近距移动机器人雷达；安装平台、振动、启动功率和扫描覆盖时间应作为系统约束。", "Its mass, size, and heat-dissipation module differ substantially from near-field mobile-robot lidar, making mounting platform, vibration, startup power, and scan coverage time system constraints.")],
  },
];

type OrbbecVariant = {
  id: string;
  product: string;
  pageUrl: string;
  type: Localized;
  baseline: string;
  interface: string;
  uvc: string;
  range: string;
  idealRange: string;
  depthResolution: string;
  d2cFov: string;
  accuracy: string;
  depthFilter: string;
  irResolution: string;
  rgbResolution: string;
  rgbFov: string;
  rgbShutter: string;
  power: string;
  supply: string;
  sync: string;
  dimensions: string;
  weight: string;
  ip: string;
  mounting: string;
  temperature: string;
  emissions: string;
  vibration: string;
};

const orbbecVariants: OrbbecVariant[] = [
  {
    id: "orbbec-gemini-335", product: "Gemini 335", pageUrl: "https://www.orbbec.com/gemini-335/",
    type: l("紧凑型主动双目三维相机", "Compact active-stereo 3D camera"), baseline: "50 mm", interface: "USB 3 Type-C", uvc: "Yes",
    range: "0.10–20 m+", idealRange: "0.3–3 m", depthResolution: "1280 × 800 @ 30 fps", d2cFov: "86° × 55° ±3° @ 2 m", accuracy: "≤1.5% @ 2 m", depthFilter: "All-pass",
    irResolution: "1280 × 800 @ 30 fps", rgbResolution: "1920 × 1080 @ 30 fps", rgbFov: "86° × 55° ±3°", rgbShutter: "Rolling shutter",
    power: "Average 2.3 W; maximum operating configuration 3.0 W average", supply: "USB Type-C 5 V, ≥1.5 A", sync: "Hardware timestamping; multi-device synchronization",
    dimensions: "90 × 25 × 30 mm", weight: "97 g ±3 g", ip: "IP5X", mounting: "Bottom 1 × 1/4-20 UNC; back 2 × M3", temperature: "-10°C to 45°C",
    emissions: "EN 55032:2015+A1:2020", vibration: "3.8 Grms @ 5–500 Hz, random, 2 h/axis",
  },
  {
    id: "orbbec-gemini-336", product: "Gemini 336", pageUrl: "https://www.orbbec.com/gemini-336/",
    type: l("带红外通滤光的紧凑型主动双目三维相机", "Compact active-stereo 3D camera with IR-pass filtering"), baseline: "50 mm", interface: "USB 3 Type-C", uvc: "Yes",
    range: "0.10–20 m+", idealRange: "0.3–3 m", depthResolution: "1280 × 800 @ 30 fps", d2cFov: "86° × 55° ±3° @ 2 m", accuracy: "≤1.5% @ 2 m", depthFilter: "IR-pass",
    irResolution: "1280 × 800 @ 30 fps", rgbResolution: "1920 × 1080 @ 30 fps", rgbFov: "86° × 55° ±3°", rgbShutter: "Rolling shutter",
    power: "Average 2.3 W; maximum operating configuration 3.0 W average", supply: "USB Type-C 5 V, ≥1.5 A", sync: "Hardware timestamping; multi-device synchronization",
    dimensions: "90 × 25 × 30.7 mm", weight: "99 g ±3 g", ip: "IP5X", mounting: "Bottom 1 × 1/4-20 UNC; back 2 × M3", temperature: "-10°C to 45°C",
    emissions: "EN 55032:2015+A1:2020", vibration: "3.8 Grms @ 5–500 Hz, random, 2 h/axis",
  },
  {
    id: "orbbec-gemini-335l", product: "Gemini 335L", pageUrl: "https://www.orbbec.com/gemini-335l/",
    type: l("长基线 IP65 主动双目三维相机", "Long-baseline IP65 active-stereo 3D camera"), baseline: "95 mm", interface: "USB 3 Type-C", uvc: "Yes",
    range: "0.17–20 m+", idealRange: "0.25–6 m", depthResolution: "1280 × 800 @ 30 fps; 848 × 480 @ 60 fps", d2cFov: "90° × 65° ±3° @ 2 m", accuracy: "≤0.8% @ 2 m; ≤1.6% @ 4 m", depthFilter: "Visible + NIR-pass",
    irResolution: "1280 × 800 @ 30 fps; 848 × 480 @ 60 fps", rgbResolution: "1920 × 1080 @ 30 fps", rgbFov: "86° × 55° ±3°", rgbShutter: "Rolling shutter",
    power: "Average 2.5 W; maximum operating configuration 3.0 W average", supply: "USB Type-C 5 V, ≥1.5 A", sync: "Hardware timestamping; multi-device synchronization",
    dimensions: "124 × 29 × 27 mm", weight: "133 g ±3 g", ip: "IP65", mounting: "Bottom 1 × 1/4-20 UNC; back 2 × M4", temperature: "-10°C to 50°C",
    emissions: "EN 55032:2017+A1:2020", vibration: "5 Grms @ 5–500 Hz, random, 4 h/axis",
  },
  {
    id: "orbbec-gemini-336l", product: "Gemini 336L", pageUrl: "https://www.orbbec.com/gemini-336l/",
    type: l("长基线红外通滤光 IP65 三维相机", "Long-baseline IR-pass IP65 3D camera"), baseline: "95 mm", interface: "USB 3 Type-C", uvc: "Yes",
    range: "0.17–20 m+", idealRange: "0.25–6 m", depthResolution: "1280 × 800 @ 30 fps; 848 × 480 @ 60 fps", d2cFov: "90° × 65° ±3° @ 2 m", accuracy: "≤0.8% @ 2 m; ≤1.6% @ 4 m", depthFilter: "IR-pass",
    irResolution: "1280 × 800 @ 30 fps; 848 × 480 @ 60 fps", rgbResolution: "1920 × 1080 @ 30 fps", rgbFov: "86° × 55° ±3°", rgbShutter: "Rolling shutter",
    power: "≤3 W", supply: "USB Type-C 5 V, ≥1.5 A", sync: "Hardware timestamping; multi-device synchronization",
    dimensions: "124 × 29 × 27.7 mm", weight: "135 g ±3 g", ip: "IP65", mounting: "Bottom 1 × 1/4-20 UNC; back 2 × M4", temperature: "-10°C to 50°C",
    emissions: "EN 55032:2017+A11:2020", vibration: "3.8 Grms @ 5–500 Hz, random, 2 h/axis",
  },
  {
    id: "orbbec-gemini-335le", product: "Gemini 335Le", pageUrl: "https://www.orbbec.com/gemini-335le/",
    type: l("千兆以太网 PoE、IP67 主动双目三维相机", "Gigabit-Ethernet PoE IP67 active-stereo 3D camera"), baseline: "95 mm", interface: "Gigabit Ethernet, M12 X-coded", uvc: "N/A",
    range: "0.25–20 m+", idealRange: "0.25–6 m", depthResolution: "1280 × 800 @ 30 fps; 848 × 530 @ 60 fps", d2cFov: "90° × 65° ±3° @ 2 m", accuracy: "≤0.8% @ 2 m; ≤1.6% @ 4 m", depthFilter: "Visible + NIR-pass",
    irResolution: "1280 × 800 @ 30 fps; 848 × 530 @ 60 fps", rgbResolution: "1280 × 800 @ 60 fps; 1280 × 720 @ 60 fps", rgbFov: "94° × 68° ±3°", rgbShutter: "Global shutter",
    power: "DC ≤4 W (peak ≤8.5 W); PoE ≤5 W (peak ≤12 W)", supply: "DC 9–24 V ≥1 A; PoE IEEE 802.3af", sync: "M8 A-coded hardware multi-camera sync; PTP; RS-485",
    dimensions: "124 × 29 × 50 mm (±0.3 mm)", weight: "220 g ±3 g", ip: "IP67", mounting: "Bottom 4 × M4 or 1 × 1/4-20 UNC; back 2 × M4", temperature: "-10°C to 50°C @ 15 fps; -10°C to 45°C @ 30/60 fps",
    emissions: "EN 61000-6-2; EN 61000-6-4", vibration: "5 Grms @ 5–500 Hz, random, 4 h/axis",
  },
  {
    id: "orbbec-gemini-338le", product: "Gemini 338Le", pageUrl: "https://www.orbbec.com/gemini-338le/",
    type: l("红外带通、千兆以太网 PoE、IP67 三维相机", "IR-bandpass Gigabit-Ethernet PoE IP67 3D camera"), baseline: "95 mm", interface: "Gigabit Ethernet, M12 X-coded", uvc: "N/A",
    range: "0.25–20 m+", idealRange: "0.25–6 m", depthResolution: "1280 × 800 @ 30 fps; 848 × 530 @ 60 fps", d2cFov: "90° × 65° ±3° @ 2 m", accuracy: "≤0.8% @ 2 m; ≤1.6% @ 4 m", depthFilter: "IR-bandpass",
    irResolution: "1280 × 800 @ 30 fps; 848 × 530 @ 60 fps", rgbResolution: "1280 × 800 @ 60 fps; 1280 × 720 @ 60 fps", rgbFov: "94° × 68° ±3°", rgbShutter: "Global shutter",
    power: "DC ≤4 W (peak ≤8.5 W); PoE ≤5 W (peak ≤12 W)", supply: "DC 9–24 V ≥1 A; PoE IEEE 802.3af", sync: "M8 A-coded hardware multi-camera sync; PTP; RS-485",
    dimensions: "124 × 29 × 50 mm (±0.3 mm)", weight: "220 g ±3 g", ip: "IP67", mounting: "Bottom 4 × M4 or 1 × 1/4-20 UNC; back 2 × M4", temperature: "-10°C to 50°C @ 15 fps; -10°C to 45°C @ 30/60 fps",
    emissions: "EN 61000-6-2; EN 61000-6-4", vibration: "5 Grms @ 5–500 Hz, random, 4 h/axis",
  },
  {
    id: "orbbec-gemini-335lg", product: "Gemini 335Lg", pageUrl: "https://www.orbbec.com/gemini-335lg/",
    type: l("GMSL2/FAKRA-Z 长基线 IP65 三维相机", "GMSL2/FAKRA-Z long-baseline IP65 3D camera"), baseline: "95 mm", interface: "GMSL2/FAKRA-Z and USB Type-C", uvc: "N/A",
    range: "0.17–20 m+", idealRange: "0.25–6 m", depthResolution: "1280 × 800 @ 30 fps; 848 × 480 @ 60 fps", d2cFov: "90° × 65° ±3° @ 2 m", accuracy: "≤0.8% @ 2 m; ≤1.6% @ 4 m", depthFilter: "Visible + NIR-pass",
    irResolution: "1280 × 800 @ 30 fps; 848 × 480 @ 60 fps", rgbResolution: "1280 × 800 @ 60 fps", rgbFov: "94° × 68° ±3°", rgbShutter: "Global shutter",
    power: "GMSL average <3.8 W (peak <7.5 W); USB average <3.0 W (peak <6 W)", supply: "FAKRA-Z 12 V ≥0.5 A; USB Type-C 5 V ≥1.5 A", sync: "Hardware multi-camera synchronization over GMSL2",
    dimensions: "124 × 29 × 36 mm (±0.3 mm)", weight: "164 g ±3 g", ip: "IP65", mounting: "Bottom 1 × 1/4-20 UNC; back 2 × M4", temperature: "-10°C to 50°C",
    emissions: "EN 61000-6-2; EN 61000-6-4", vibration: "5 Grms @ 5–500 Hz, random, 4 h/axis",
  },
  {
    id: "orbbec-gemini-338lg", product: "Gemini 338Lg", pageUrl: "https://www.orbbec.com/gemini-338lg/",
    type: l("红外带通 GMSL2/FAKRA-Z IP65 三维相机", "IR-bandpass GMSL2/FAKRA-Z IP65 3D camera"), baseline: "95 mm", interface: "GMSL2/FAKRA-Z and USB Type-C", uvc: "N/A",
    range: "0.17–20 m+", idealRange: "0.25–6 m", depthResolution: "1280 × 800 @ 30 fps; 848 × 480 @ 60 fps", d2cFov: "90° × 65° ±3° @ 2 m", accuracy: "≤0.8% @ 2 m; ≤1.6% @ 4 m", depthFilter: "IR-bandpass (850 nm)",
    irResolution: "1280 × 800 @ 30 fps; 848 × 480 @ 60 fps", rgbResolution: "1280 × 800 @ 60 fps", rgbFov: "94° × 68° ±3°", rgbShutter: "Global shutter",
    power: "GMSL average <3.8 W (peak <7.5 W); USB average <3.0 W (peak <6 W)", supply: "FAKRA-Z 12 V ≥0.5 A; USB Type-C 5 V ≥1.5 A", sync: "Hardware multi-camera synchronization over GMSL2",
    dimensions: "124 × 29 × 36 mm (±0.3 mm)", weight: "164 g ±3 g", ip: "IP65", mounting: "Bottom 1 × 1/4-20 UNC; back 2 × M4", temperature: "-10°C to 50°C",
    emissions: "EN 61000-6-2; EN 61000-6-4", vibration: "5 Grms @ 5–500 Hz, random, 4 h/axis",
  },
];

const orbbecRows = (spec: OrbbecVariant): SpecRow[] => {
  const source = l("Orbbec Gemini 330 系列官方规格表", "Orbbec Gemini 330 series official specification table");
  const locator = l("Gemini 330 Series Specifications", "Gemini 330 Series Specifications");
  const r = (zh: string, en: string, value: string, conditions?: Localized) => simpleRow(ORBBEC_SERIES, source, locator, zh, en, value, value, conditions);
  return [
    r("型号", "Model", spec.product),
    r("工作环境", "Operating environment", "Indoor & outdoor"),
    r("深度技术", "Depth technology", "Stereo vision with active IR speckle"),
    r("双目基线", "Stereo baseline", spec.baseline),
    r("接口", "Interface", spec.interface),
    r("UVC 兼容", "UVC compliant", spec.uvc),
    r("SDK", "SDK", "Orbbec SDK v2"),
    r("深度感知范围", "Depth sensing range", spec.range, l("理论最大深度距离最高 65 m；该值不代表推荐工作距离。", "Theoretical maximum depth range is up to 65 m; this does not represent the recommended working distance.")),
    r("理想工作范围", "Ideal working range", spec.idealRange),
    r("深度分辨率与帧率", "Depth resolution and frame rate", spec.depthResolution),
    r("深度视场", "Depth field of view", "90° × 65° ±3° @ 2 m"),
    r("D2C 后深度视场", "Depth field of view after D2C", spec.d2cFov),
    r("空间相对精度", "Spatial relative accuracy", spec.accuracy, l("厂内标定时测量。", "Measured during factory calibration.")),
    r("深度快门", "Depth shutter", "Global shutter"),
    r("深度滤光", "Depth filter", spec.depthFilter),
    r("红外分辨率与帧率", "IR resolution and frame rate", spec.irResolution),
    r("红外视场", "IR field of view", "Up to 91° × 65°"),
    r("RGB 分辨率与帧率", "RGB resolution and frame rate", spec.rgbResolution),
    r("RGB 视场", "RGB field of view", spec.rgbFov),
    r("RGB 快门", "RGB shutter", spec.rgbShutter),
    r("内置传感器", "Built-in sensor", "IMU"),
    r("功耗", "Power consumption", spec.power),
    r("供电", "Power supply", spec.supply),
    r("多相机硬件同步", "Multi-camera hardware synchronization", spec.sync),
    r("尺寸", "Dimensions", spec.dimensions),
    r("质量", "Weight", spec.weight),
    r("防护等级", "Ingress protection", spec.ip, l("达到标称 IP 等级需要使用具有相应防护等级的线缆。", "Cables with the corresponding protection rating are required to achieve the stated IP rating.")),
    r("安装接口", "Mounting", spec.mounting),
    r("工作温度", "Operating temperature", spec.temperature),
    r("电磁发射/兼容要求", "Electromagnetic emissions or compatibility", spec.emissions),
    r("抗振动", "Vibration resistance", spec.vibration),
    r("设计寿命口径", "Published design-life basis", "5 years", l("默认工作模式与环境，按典型每日 16 h 工作估算；实际寿命随工况变化。", "Estimated for default mode and environment at a typical 16 h/day; actual life varies with duty and environment.")),
  ];
};

const orbbecSeeds: ProductSeed[] = orbbecVariants.map((spec) => ({
  id: spec.id,
  companySlug: "orbbec",
  product: spec.product,
  pageUrl: spec.pageUrl,
  category: "perception",
  primary: "sensing",
  subclass: "vision-sensor",
  useCases: ["research", "manufacturing", "logistics", "integration"],
  type: spec.type,
  integration: l("通过 Orbbec SDK v2 与型号对应的 USB、PoE 或 GMSL2 接口集成；多相机同步、电源、线缆和主机兼容必须按具体型号确认。", "Integrates through Orbbec SDK v2 and the model-specific USB, PoE, or GMSL2 interface. Multi-camera synchronization, power, cable, and host compatibility must be confirmed per model."),
  verification: l("在目标距离、光照、反射材料、运动速度、帧率和温度下验证深度完整率与精度；同时锁定滤光、快门、IP 线缆和标定流程。", "Validate depth completeness and accuracy at target range, lighting, reflective materials, motion speed, frame rate, and temperature, while locking filter, shutter, IP-rated cable, and calibration workflow."),
  rows: orbbecRows(spec),
  overview: [
    l(`${spec.product} 是 Gemini 330 系列的具名型号；本记录把系列对比表中属于该型号的基线、接口、距离、成像、功耗、同步、机械和环境字段拆开索引。`, `${spec.product} is a named Gemini 330 variant. This record separates the baseline, interface, range, imaging, power, synchronization, mechanical, and environmental fields assigned to it in the series comparison table.`),
    l("理论最大 65 m、五年寿命和工厂标定精度均带条件，不代表所有现场、反射率、帧率和连续工况下的保证值。", "The theoretical 65 m range, five-year life, and factory-calibration accuracy all carry conditions and are not guarantees across every site, reflectivity, frame rate, and continuous-duty scenario."),
  ],
  applications: [l("机器人导航、避障与近距三维感知", "Robot navigation, obstacle avoidance, and near-field 3D perception"), l("抓取、测量、物流和多相机视觉", "Grasping, measurement, logistics, and multi-camera vision")],
  coverage: "official-complete",
  sourceLinks: [{ label: l("Gemini 330 系列规格对比", "Gemini 330 series specification comparison"), url: ORBBEC_SERIES }],
}));

const talosSource = l("PAL Robotics TALOS 官方数据表", "PAL Robotics official TALOS datasheet");
const talosRow = (locatorZh: string, locatorEn: string, zh: string, en: string, valueZh: string, valueEn = valueZh, conditions?: Localized) => (
  simpleRow(TALOS_DATASHEET, talosSource, l(locatorZh, locatorEn), zh, en, valueZh, valueEn, conditions)
);

const palSeeds: ProductSeed[] = [{
  id: "pal-robotics-talos",
  companySlug: "pal-robotics",
  product: "TALOS",
  pageUrl: TALOS_PAGE,
  category: "robot-platform",
  primary: "robot-platform",
  subclass: "humanoid-robot",
  useCases: ["research", "integration"],
  type: l("高载荷全尺寸研究型人形机器人", "High-payload full-size research humanoid"),
  integration: l("以 Ubuntu LTS、Linux RT Preempt、ROS、OROCOS、ros_control、MoveIt、Gazebo 与 URDF 为公开软件基础，并提供以太网、Wi-Fi 和外部 EtherCAT 主站接入。", "Uses Ubuntu LTS, Linux RT Preempt, ROS, OROCOS, ros_control, MoveIt, Gazebo, and URDF as its published software foundation, with Ethernet, Wi-Fi, and external EtherCAT-master connectivity."),
  verification: l("交付前锁定定制关节、传感器、计算机、软件版本、电池、相机、夹爪、急停和维护方案；在有防跌倒和安全隔离的实验环境中验收。", "Before delivery, lock custom joints, sensors, computers, software versions, battery, cameras, grippers, emergency stop, and maintenance plan, and accept the robot in a safeguarded laboratory environment with fall-risk controls."),
  rows: [
    talosRow("GENERAL", "GENERAL", "整机高度", "Height", "175 cm"),
    talosRow("GENERAL", "GENERAL", "整机质量", "Weight", "95 kg"),
    talosRow("FEATURES", "FEATURES", "全身自由度", "Total degrees of freedom", "32 DoF"),
    talosRow("FEATURES", "FEATURES", "腿部自由度", "Leg degrees of freedom", "每条腿 6 DoF，共 12 DoF", "6 DoF per leg, 12 DoF total"),
    talosRow("FEATURES", "FEATURES", "手臂自由度", "Arm degrees of freedom", "每条手臂 7 DoF，共 14 DoF", "7 DoF per arm, 14 DoF total"),
    talosRow("FEATURES", "FEATURES", "夹爪自由度", "Gripper degrees of freedom", "每个夹爪 1 DoF，共 2 DoF", "1 DoF per gripper, 2 DoF total"),
    talosRow("FEATURES", "FEATURES", "腰部自由度", "Waist degrees of freedom", "2 DoF"),
    talosRow("FEATURES", "FEATURES", "颈部自由度", "Neck degrees of freedom", "2 DoF"),
    talosRow("MANIPULATION", "MANIPULATION", "手臂/夹爪负载", "Arm/gripper payload", "每条手臂 6 kg", "6 kg per arm", l("手臂伸展状态。", "Arm stretched.")),
    talosRow("MANIPULATION", "MANIPULATION", "双臂工作空间", "Bimanual workspace", "面向灵巧双臂操作的大工作空间", "Large workspace for dexterous bimanual manipulation"),
    talosRow("CONNECTIVITY", "CONNECTIVITY", "Wi-Fi", "Wi-Fi", "802.11 a/b/g/n，5 GHz 与 2.4 GHz，AP 或客户端模式", "802.11 a/b/g/n at 5 GHz and 2.4 GHz, access-point or client mode"),
    talosRow("CONNECTIVITY", "CONNECTIVITY", "以太网", "Ethernet", "用户面板 RJ45，可直连 PC", "User-panel RJ45 for direct PC connection"),
    talosRow("CONNECTIVITY", "CONNECTIVITY", "EtherCAT", "EtherCAT", "可连接外部主站控制机器人", "External master can be connected to control the robot"),
    talosRow("CONNECTIVITY", "CONNECTIVITY", "服务端口", "Service port", "用于有线急停按钮", "For a tethered emergency-stop button"),
    talosRow("ELECTRICAL FEATURES", "ELECTRICAL FEATURES", "电池体系", "Power system", "锂离子电池", "Lithium-ion battery"),
    talosRow("ELECTRICAL FEATURES", "ELECTRICAL FEATURES", "标称能量", "Nominal energy", "1080 Wh"),
    talosRow("ELECTRICAL FEATURES", "ELECTRICAL FEATURES", "最大放电电流", "Maximum discharge current", "+100 A"),
    talosRow("ELECTRICAL FEATURES", "ELECTRICAL FEATURES", "电池续航", "Battery autonomy", "步行 1.5 h；待机 3 h", "1.5 h walking; 3 h standby"),
    talosRow("HRI INTERFACES", "HRI INTERFACES", "扬声器", "Speakers", "5 W；包含英文文本转语音", "5 W; English text-to-speech included"),
    talosRow("HRI INTERFACES", "HRI INTERFACES", "状态灯", "LEDs", "24 个 RGB LED；提供视觉效果控制 API", "24 RGB LEDs with visual-effects control API"),
    talosRow("SENSORS", "SENSORS", "六轴力/矩传感器", "Six-axis force/torque sensors", "4 个，双踝与双腕各 1 个", "4 sensors, one in each ankle and wrist"),
    talosRow("SENSORS", "SENSORS", "关节扭矩传感反馈", "Joint torque-sensor feedback", "除头部、手腕和夹爪外所有关节", "All joints except head, wrists, and grippers"),
    talosRow("SENSORS", "SENSORS", "AHRS/IMU", "AHRS/IMU", "1 kHz 滤波姿态、陀螺仪与加速度", "1 kHz filtered orientation, gyroscope, and acceleration"),
    talosRow("COMPUTERS", "COMPUTERS", "板载计算机", "Onboard computers", "2 × Intel Core i7，COM Express Type-6", "2 x Intel Core i7, COM Express Type-6"),
    talosRow("SOFTWARE", "SOFTWARE", "操作系统", "Operating system", "Ubuntu LTS、Linux RT Preempt"),
    talosRow("SOFTWARE", "SOFTWARE", "中间件", "Middleware", "ROS、OROCOS"),
    talosRow("SOFTWARE", "SOFTWARE", "仿真", "Simulation", "Gazebo 仿真与 URDF 模型", "Gazebo simulation and URDF model"),
    talosRow("SOFTWARE", "SOFTWARE", "实时控制环", "Real-time control loop", ">1 kHz ros_control"),
    talosRow("SOFTWARE", "SOFTWARE", "运动规划", "Motion planning", "MoveIt"),
    talosRow("VISION", "VISION", "视觉视场", "Vision field of view", "60° 水平 × 49.5° 垂直 × 73° 对角", "60° horizontal x 49.5° vertical x 73° diagonal"),
    talosRow("VISION", "VISION", "RGB 输出", "RGB output", "1280 × 720 @ 30 fps"),
    talosRow("VISION", "VISION", "深度输出", "Depth output", "640 × 480 @ 30 fps；0.4–8 m", "640 x 480 @ 30 fps; 0.4-8 m"),
    talosRow("HEAD", "HEAD", "头部水平转动范围", "Head pan range", "每个俯仰位置 150°", "150° at every head-tilt position"),
    talosRow("HEAD", "HEAD", "头部定制", "Head customization", "完全可定制", "Fully customizable"),
    talosRow("GRIPPER", "GRIPPER", "夹爪结构", "Gripper configuration", "3 指、1 个执行器，带电流限制控制", "3 fingers, 1 actuator with current-limit control"),
    talosRow("GRIPPER", "GRIPPER", "夹爪定制", "Gripper customization", "完全可定制", "Fully customizable"),
  ],
  overview: [l("TALOS 是 PAL Robotics 面向全身控制、步行和双臂操作研究的全尺寸平台，官方数据表给出 32 自由度、175 cm 高度和 95 kg 质量。", "TALOS is PAL Robotics' full-size platform for whole-body control, walking, and bimanual-manipulation research; its official datasheet publishes 32 DoF, 175 cm height, and 95 kg mass."), l("数据表同时覆盖四个六轴力/矩传感器、除头/腕/夹爪外的全关节扭矩反馈、双 Intel Core i7 和 ROS/OROCOS 软件栈。平台标注为可定制，因此采购配置必须以订单和当前手册为准。", "The datasheet also covers four six-axis force/torque sensors, torque feedback on all joints except head/wrists/grippers, dual Intel Core i7 computers, and a ROS/OROCOS software stack. Because the platform is described as customizable, the purchased configuration must follow the order and current manuals.")],
  applications: [l("人形机器人全身控制与步行研究", "Humanoid whole-body control and walking research"), l("双臂操作、力控和实验室具身智能研究", "Bimanual manipulation, force control, and laboratory embodied-AI research")],
  coverage: "official-complete",
  sourceLinks: [{ label: l("PAL Robotics 公司时间线", "PAL Robotics company timeline"), url: PAL_TIMELINE }, { label: talosSource, url: TALOS_DATASHEET }],
}];

type TesolloSpec = {
  id: string;
  product: string;
  pageUrl: string;
  type: Localized;
  subclass: string;
  voltage?: string;
  current?: string;
  communication?: string;
  frequency?: string;
  encoder?: string;
  dof?: string;
  pinch?: string;
  envelop?: string;
  weight?: string;
  options: string;
  extra?: Array<{ label: Localized; value: Localized; conditions?: Localized }>;
  discontinued?: boolean;
  custom?: boolean;
};

const tesolloSpecs: TesolloSpec[] = [
  { id: "tesollo-dg-5f-m", product: "DG-5F-M", pageUrl: "https://www.tesollo.com/products/grippers/dg-5f-m", type: l("20 自由度五指仿人机器人手", "20-DoF five-finger anthropomorphic robotic hand"), subclass: "dexterous-hand", voltage: "24 V", current: "Max. 10 A", communication: "Modbus RTU/TCP; Ethernet TCP/IP", frequency: "250 Hz", encoder: "Absolute encoder", dof: "20 DoF (4 DoF per finger)", pinch: "Rated 2.5 kg; max 5 kg", envelop: "Rated 10 kg; max 20 kg", weight: "1763 g", options: "6-axis F/T fingertip sensor; 3-axis force sensor; tactile sensor; suction fingertip; short wrist; mounting stand" },
  { id: "tesollo-dg-5f-s", product: "DG-5F-S", pageUrl: "https://www.tesollo.com/products/grippers/dg-5f-s", type: l("轻量型 20 自由度五指仿人机器人手", "Lightweight 20-DoF five-finger anthropomorphic robotic hand"), subclass: "dexterous-hand", voltage: "24 V", current: "Max. 10 A", communication: "Ethernet TCP/IP; Modbus TCP", frequency: "500 Hz", encoder: "Absolute encoder", dof: "20 DoF (4 DoF per finger)", pinch: "Rated 1 kg; max 2 kg", envelop: "Rated 7 kg; max 12 kg", weight: "880 g", options: "Tactile fingertip sensor; optional compact 5-finger / 15-DoF configuration; mounting stand" },
  { id: "tesollo-dg-4f", product: "DG-4F", pageUrl: "https://www.tesollo.com/products/grippers/dg-4f", type: l("18 自由度四指多关节夹爪", "18-DoF four-finger multi-joint gripper"), subclass: "dexterous-hand", voltage: "24 V", current: "Max. 10 A", communication: "Modbus RTU/TCP; Ethernet TCP/IP", frequency: "333 Hz", encoder: "Absolute encoder", dof: "18 DoF", pinch: "Rated 3 kg; max 5 kg", envelop: "Rated 10 kg; max 20 kg", weight: "1494 g", options: "6-axis F/T fingertip sensor; 3-axis force sensor; tactile sensor; suction fingertip; mounting stand" },
  { id: "tesollo-dg-3f-m", product: "DG-3F-M", pageUrl: "https://www.tesollo.com/products/grippers/dg-3f-m", type: l("工业级 12 自由度三指夹爪", "Industrial 12-DoF three-finger gripper"), subclass: "gripper", voltage: "24 V", current: "Max. 10 A", communication: "Modbus RTU/TCP; Ethernet TCP/IP", frequency: "333 Hz", encoder: "Absolute encoder", dof: "12 DoF (4 DoF per finger)", pinch: "Rated 2.5 kg; max 5 kg", envelop: "Rated 10 kg; max 15 kg", weight: "1114 g", options: "Modular finger and actuator replacement", extra: [{ label: l("每指峰值扭矩口径", "Published torque per finger"), value: l("最高 2 N·m", "Up to 2 N·m") }, { label: l("传动设计循环口径", "Published drivetrain cycle basis"), value: l(">3,000,000 次运行循环", ">3,000,000 operating cycles"), conditions: l("厂商称为工业使用条件下的设计口径，实际寿命随负载和工况变化。", "Manufacturer design statement under industrial-use conditions; actual life varies with load and duty.") }] },
  { id: "tesollo-dg-3f-b", product: "DG-3F-B", pageUrl: "https://www.tesollo.com/products/grippers/dg-3f-b", type: l("已停产通用三指夹爪", "Discontinued general-purpose three-finger gripper"), subclass: "gripper", voltage: "24 V", current: "Max. 10 A", communication: "Modbus RTU/TCP; Ethernet TCP/IP", frequency: "200 Hz", encoder: "Absolute encoder", dof: "12 DoF", pinch: "Max. 2.5 kg", envelop: "Max. 5 kg", weight: "1044 g", options: "Historical configuration; sales ended in 2025", discontinued: true },
  { id: "tesollo-dg-2f", product: "DG-2F", pageUrl: "https://www.tesollo.com/products/grippers/dg-2f", type: l("6 自由度双指多关节夹爪", "6-DoF two-finger multi-joint gripper"), subclass: "gripper", voltage: "24 V", current: "Max. 10 A", communication: "Modbus RTU/TCP; Ethernet TCP/IP", frequency: "500 Hz", encoder: "Absolute encoder", dof: "6 DoF (3 DoF per finger)", pinch: "Rated 2 kg; max 4 kg", envelop: "Rated 5 kg; max 10 kg", weight: "770 g", options: "Model-specific downloadable control and hardware manuals" },
  { id: "tesollo-dg-1f", product: "DG-1F", pageUrl: "https://www.tesollo.com/products/grippers/dg-1f", type: l("3 自由度关节式真空夹爪", "3-DoF articulated vacuum gripper"), subclass: "vacuum-gripper", voltage: "24 V", current: "Max. 10 A", communication: "Modbus RTU/TCP; Ethernet TCP/IP", frequency: "1000 Hz", encoder: "Absolute encoder", dof: "3 DoF", weight: "710 g", options: "External vacuum source required" },
  { id: "tesollo-dg-c", product: "DG-C", pageUrl: "https://www.tesollo.com/products/grippers/dg-c", type: l("定制多关节夹爪与机器人手", "Custom multi-joint grippers and robotic hands"), subclass: "gripper", options: "Finger count, joints, geometry, sensing, and integration are defined per project", custom: true },
];

const tesolloRows = (spec: TesolloSpec): SpecRow[] => {
  const source = l(`${spec.product} 官方产品页`, `${spec.product} official product page`);
  const locator = l("Specifications、Options 与产品说明", "Specifications, Options, and product description");
  const r = (label: Localized, value: string, conditions?: Localized) => row(spec.pageUrl, source, locator, label, l(value, value), conditions);
  const rows: SpecRow[] = [];
  if (spec.voltage) rows.push(r(l("输入电压", "Input voltage"), spec.voltage));
  if (spec.current) rows.push(r(l("最大电流消耗", "Maximum current consumption"), spec.current));
  if (spec.communication) rows.push(r(l("通信", "Communication"), spec.communication));
  if (spec.frequency) rows.push(r(l("控制频率", "Control frequency"), spec.frequency));
  if (spec.encoder) rows.push(r(l("编码器", "Encoder"), spec.encoder));
  if (spec.dof) rows.push(r(l("自由度", "Degrees of freedom"), spec.dof));
  if (spec.pinch) rows.push(r(l("捏持负载", "Pinching payload"), spec.pinch, l("厂商说明性能可能随物体摩擦变化。", "The manufacturer states that performance may vary with object friction.")));
  if (spec.envelop) rows.push(r(l("包络抓取负载", "Enveloping payload"), spec.envelop, l("厂商说明性能可能随物体摩擦变化。", "The manufacturer states that performance may vary with object friction.")));
  if (spec.weight) rows.push(r(l("质量", "Weight"), spec.weight));
  rows.push(r(l("选件或配置边界", "Options or configuration boundary"), spec.options));
  if (spec.discontinued) rows.push(r(l("产品状态", "Product status"), "Discontinued; sales ended in 2025"));
  for (const item of spec.extra ?? []) rows.push(row(spec.pageUrl, source, locator, item.label, item.value, item.conditions));
  return rows;
};

const tesolloSeeds: ProductSeed[] = tesolloSpecs.map((spec) => ({
  id: spec.id,
  companySlug: "tesollo",
  product: spec.product,
  pageUrl: spec.pageUrl,
  category: "end-effector",
  primary: "manipulator-end-effector",
  subclass: spec.subclass,
  useCases: ["research", "manufacturing", "logistics", "integration"],
  type: spec.type,
  integration: l("通过厂商控制接口、C/C++ SDK、ROS 2 以及可用的 URCap/TMflow 软件接入；具体法兰、传感器、吸盘和软件版本按订单确认。", "Integrates through the manufacturer control interface, C/C++ SDK, ROS 2, and available URCap/TMflow packages. Confirm the exact flange, sensors, suction tooling, and software versions on the order."),
  verification: spec.custom
    ? l("DG-C 没有固定公开规格表，必须以项目需求、图纸、接口、样机测试和验收文件建立独立配置记录。", "DG-C has no fixed public specification table; create a separate configuration record from project requirements, drawings, interfaces, prototype tests, and acceptance documents.")
    : l("以目标对象和姿态复测捏持/包络负载、关节重复性、控制周期、温升和寿命，并锁定传感选件、法兰、线缆和软件。", "Retest pinching/enveloping payload, joint repeatability, control cycle, temperature rise, and life with target objects and poses, and lock sensor options, flange, cable, and software."),
  rows: tesolloRows(spec),
  overview: spec.custom ? [
    l("DG-C 是按项目定义的多关节夹爪与机器人手能力入口，不对应一个固定电气、自由度、负载或尺寸规格。", "DG-C is a project-defined multi-joint gripper and robotic-hand capability entry, not a fixed electrical, DoF, payload, or dimensional specification."),
    l("为避免生成不可查证参数，本记录只保留定制边界；具体方案应建立独立配置与来源文件。", "To avoid unverifiable specifications, this record keeps only the customization boundary; each concrete solution needs its own configuration and source documents."),
  ] : [
    l(`${spec.product} 的当前产品页公开电气、通信、控制频率、编码器、自由度、负载和质量等规格，本记录逐字段拆分用于参数查询。`, `The current ${spec.product} page publishes electrical, communication, control-rate, encoder, DoF, payload, and mass specifications, which this record separates for parameter search.`),
    spec.discontinued
      ? l("该型号已明确标记停产且销售于 2025 年结束，只用于历史兼容、维护与替代选型，不作为当前可采购产品。", "This model is explicitly marked discontinued with sales ending in 2025. It is retained for historical compatibility, maintenance, and replacement selection, not as a current orderable product.")
      : l("负载数值受物体摩擦和抓取方式影响；网页参数不替代目标对象、姿态、速度和连续工况下的验证。", "Payload figures depend on object friction and grasp mode; web specifications do not replace validation with the target object, pose, speed, and continuous duty."),
  ],
  applications: [l("机器人抓取、工具使用与灵巧操作", "Robot grasping, tool use, and dexterous manipulation"), l("制造、物流、人形机器人和研究集成", "Manufacturing, logistics, humanoid robots, and research integration")],
  coverage: spec.custom ? "capability-only" : "official-complete",
  specificationKind: spec.custom ? "capabilities" : "parameters",
  level: spec.custom ? "platform" : "model",
  sourceLinks: [{ label: l("TESOLLO 全部产品索引", "TESOLLO complete product index"), url: TESOLLO_PRODUCTS }, { label: l("TESOLLO 集成与寿命 FAQ", "TESOLLO integration and life FAQ"), url: TESOLLO_FAQ }],
  catalogScope: spec.discontinued ? l("历史停产型号；不出现在当前可采购筛选中。", "Historical discontinued model; not treated as currently orderable.") : undefined,
}));

const productSeeds: ProductSeed[] = [...livoxSeeds, ...orbbecSeeds, ...palSeeds, ...tesolloSeeds];

export const getVerifiedWaveSixProductRecords = (
  locale: Locale,
  companies: CompanyProfile[],
): FinderExpansionRecord[] => {
  const companyBySlug = new Map(companies.map((company) => [company.slug, company]));
  return productSeeds.map((seed) => {
    const company = companyBySlug.get(seed.companySlug);
    if (!company) throw new Error(`Wave-six product company is missing: ${seed.companySlug}`);
    return toRecord(locale, company, seed);
  });
};

export const waveSixCatalogProductCount = productSeeds.length;

