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
  companySlug: WaveSevenCompanySlug;
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
  sourceLinks?: Array<{ label: Localized; url: string }>;
  catalogScope?: Localized;
};

const l = (zh: string, en: string): Localized => ({ zh, en });
const t = (locale: Locale, value: Localized) => value[locale];

const BOTA_ABOUT = "https://shop.botasys.com/about-us";
const BOTA_PORTFOLIO = "https://shop.botasys.com/product-portfolio";
const UR_ABOUT = "https://www.universal-robots.com/about-us/";
const UR_HISTORY = "https://www.universal-robots.com/about-us/history/";
const UR_SERIES_PDF = "https://www.universal-robots.com/manuals/EN/TechSheets/comparison_ur-series_pdf_online/comparison_UR%20Series_en.pdf";
const UR_E_SERIES = "https://www.universal-robots.com/products/e-series/";
const REALSENSE_ABOUT = "https://www.realsenseai.com/about/";
const REALSENSE_COMPARE = "https://www.realsenseai.com/compare-depth-cameras/";
const REALSENSE_SPINOUT = "https://www.realsenseai.com/news-insights/news/realsense-completes-spin-out-from-intel-raises-50-million-to-accelerate-ai-powered-vision-for-robotics-and-biometrics/";
const ZIVID_ABOUT = "https://www.zivid.com/about";
const ZIVID_COMPARE = "https://www.zivid.com/en/compare-and-select-3d";

export const waveSevenCompanySlugs = ["bota-systems", "universal-robots", "realsense", "zivid"] as const;
type WaveSevenCompanySlug = typeof waveSevenCompanySlugs[number];

const waveSevenCompanySlugSet = new Set<string>(waveSevenCompanySlugs);
export const isWaveSevenCompanySlug = (slug: string) => waveSevenCompanySlugSet.has(slug);

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

const patchBota = (company: CompanyProfile, locale: Locale) => companyPatch(company, locale, {
  legalName: l("Bota Systems AG", "Bota Systems AG"),
  country: l("瑞士", "Switzerland"),
  headquarters: l("瑞士苏黎世", "Zurich, Switzerland"),
  founded: "2020",
  officialUrl: "https://www.botasys.com/",
  valueChainRole: l("机器人六维力/力矩传感器与集成套件厂商", "Robotic six-axis force/torque sensor and integration-kit manufacturer"),
  positioning: l("围绕紧凑六维力/力矩传感器、机器人专用集成套件、软件驱动和配件提供腕部力控测量方案。", "Provides wrist force-control measurement around compact six-axis force/torque sensors, robot-specific integration kits, software drivers, and accessories."),
  strengths: [
    l("型号覆盖 30 mm 级紧凑传感器到 24 kN 量程产品，并提供多种法兰和机器人集成套件。", "The catalog spans 30 mm-class compact sensors through 24 kN-range products, with multiple flanges and robot integration kits."),
    l("当前产品页公开六轴量程、过载、噪声自由分辨率、采样率、机械、电气和接口表。", "Current product pages publish six-axis range, overload, noise-free resolution, sampling, mechanical, electrical, and interface tables."),
    l("FT Stack 提供 C++、Python、ROS 驱动以及标定、去皮和重力补偿相关工具。", "FT Stack provides C++, Python, and ROS drivers plus configuration, taring, and gravity-compensation tools."),
  ],
  products: ["MiniONE Gen A", "MiniONE Pro Gen A", "MimX Gen A", "Rokubi Gen A", "SensONE Gen A", "PixONE Gen A", "LaxONE Gen A", "SensONE T80 Gen A", "MegaONE Gen A", "robot integration kits"],
  fit: [
    l("机器人腕部力控、装配、打磨、插拔和碰撞检测。", "Robot wrist force control, assembly, finishing, insertion, and collision detection."),
    l("需要高采样、EtherCAT、工业以太网或串行接口的机器人研发与量产集成。", "Robot R&D and production integration requiring high sampling, EtherCAT, industrial Ethernet, or serial interfaces."),
    l("Kinova 等特定机器人平台的内部走线和末端工具集成。", "Internal cabling and end-effector integration for specific robot platforms such as Kinova."),
  ],
  overview: [
    l("Bota Systems AG 于 2020 年成立，总部位于苏黎世，官网将其描述为苏黎世联邦理工学院衍生公司。其公开业务集中在六维力/力矩传感器、机器人集成套件和配件。", "Bota Systems AG was founded in 2020, is headquartered in Zurich, and describes itself as an ETH Zurich spin-off. Its public business centers on six-axis force/torque sensors, robot integration kits, and accessories."),
    l("本仓按当前官方产品页拆分量程变体，避免把同一外壳下的 T5、T15、T25、T60、T80、T180 和 T540 当作同一数值产品。厂商说明过载值来自有限元模拟，实物可能偏离，因此不能把过载值当作工作量程。", "The repository separates current range variants so T5, T15, T25, T60, T80, T180, and T540 variants sharing a housing are not treated as one numeric product. The manufacturer states that overload figures are FEA simulations and may differ in practice, so overload limits must not be treated as operating ranges."),
    l("官网在线门户公开价格只适用于页面所示数量、地区和时间，不在本仓作为固定采购价格。公司未提供面向公众的定期财务报告库，本档案不据此推断收入、利润或客户集中度。", "Online-store prices apply only to the displayed quantity, region, and time and are not stored as fixed procurement prices. The company does not expose a public periodic-financial-report library; this profile does not infer revenue, profit, or customer concentration."),
  ],
  businessAreas: [
    l("六维力/力矩传感器", "Six-axis force/torque sensors"),
    l("机器人平台专用力传感集成套件", "Robot-platform-specific force-sensor integration kits"),
    l("FT Stack 驱动、配置和力控软件", "FT Stack drivers, configuration, and force-control software"),
  ],
  customerGroups: [
    l("机器人本体、机械臂和末端执行器厂商", "Robot, manipulator, and end-effector manufacturers"),
    l("装配、打磨、测试和精密自动化集成商", "Assembly, finishing, test, and precision-automation integrators"),
    l("高校、研究机构和机器人学习团队", "Universities, research institutes, and robot-learning teams"),
  ],
  milestones: [
    { date: "2020", event: l("公司成立并从苏黎世联邦理工学院衍生。", "The company was founded as an ETH Zurich spin-off.") },
    { date: "2026", event: l("官方门户以 Gen A 型号和量程变体公开完整产品表、文档与集成资源。", "The official portal lists Gen A models and range variants with product tables, documents, and integration resources.") },
  ],
  catalogScope: l("当前完成九个标准传感器系列/量程变体组及 Kinova Gen3 V2 集成型号，共十四条型号级记录；TactX、更多机器人套件、配件和 Gen 0 历史型号仍需按独立页面补录。", "Currently covers nine standard sensor series/range-variant groups plus the Kinova Gen3 V2 integration model, totaling fourteen model-level records. TactX, additional robot kits, accessories, and historical Gen 0 models still require direct-page records."),
  verificationFocus: l("锁定六轴工作量程、过载定义、噪声自由分辨率条件、接口变体、协议、供电、采样率、法兰、线缆、IP 和标定证书。", "Lock six-axis operating range, overload definition, noise-free-resolution conditions, interface variant, protocol, power, sampling, flange, cable, IP boundary, and calibration certificate."),
  questions: [
    l("六个方向的工作峰值、冲击载荷、预载荷和安全系数分别是多少？", "What are the working peak, shock load, preload, and safety factor on each of the six axes?"),
    l("需要 EtherCAT、PoE Ethernet、RS-422/485/232、USB、Modbus 还是平台内部以太网？", "Is EtherCAT, PoE Ethernet, RS-422/485/232, USB, Modbus, or platform-internal Ethernet required?"),
    l("采样、滤波、坐标变换、温漂、去皮、重力补偿和现场再标定如何验收？", "How will sampling, filtering, coordinate transforms, thermal drift, taring, gravity compensation, and field recalibration be accepted?"),
  ],
});

const patchUniversalRobots = (company: CompanyProfile, locale: Locale) => companyPatch(company, locale, {
  legalName: l("Universal Robots A/S", "Universal Robots A/S"),
  country: l("丹麦", "Denmark"),
  headquarters: l("丹麦欧登塞", "Odense, Denmark"),
  founded: "2005",
  officialUrl: "https://www.universal-robots.com/",
  valueChainRole: l("协作机器人本体、控制软件与应用生态厂商", "Collaborative-robot arms, control software, and application-ecosystem manufacturer"),
  positioning: l("以 e-Series 和新一代 UR Series 覆盖从桌面轻载到 35 kg 扩展负载的协作机械臂，并通过 PolyScope、URCaps、Marketplace、培训和服务体系支持应用部署。", "Covers collaborative arms from desktop light-payload work to 35 kg extended-payload handling through e-Series and the newer UR Series, supported by PolyScope, URCaps, Marketplace, training, and service."),
  strengths: [
    l("当前九个具名机械臂覆盖 500 mm 至 1750 mm 臂展和 3 kg 至 35 kg 扩展负载。", "Nine current named arms span 500 mm to 1750 mm reach and 3 kg to 35 kg extended payload."),
    l("统一的软件、示教器、URCaps 和第三方末端工具生态降低跨型号迁移成本，但不消除应用工程。", "A shared software, teach-pendant, URCaps, and third-party tooling ecosystem reduces cross-model migration effort but does not remove application engineering."),
    l("官方数据表公开负载、臂展、重复性、力/矩传感、速度、环境、安全、控制箱和 I/O。", "Official datasheets publish payload, reach, repeatability, force/torque sensing, speed, environment, safety, controller, and I/O data."),
  ],
  products: ["UR3e", "UR7e", "UR12e", "UR16e", "UR8 Long", "UR15", "UR18", "UR20", "UR30", "PolyScope", "URCaps", "UR Marketplace"],
  fit: [
    l("机床上下料、装配、焊接、螺丝锁付、码垛、打磨和质量检测。", "Machine tending, assembly, welding, screwdriving, palletizing, finishing, and inspection."),
    l("需要人员共区、频繁换型或空间受限的制造自动化。", "Manufacturing automation requiring shared workspaces, frequent changeover, or constrained floor space."),
    l("需要成熟第三方夹爪、视觉、焊接和应用套件生态的集成项目。", "Integration projects that benefit from a mature ecosystem of grippers, vision, welding, and application kits."),
  ],
  overview: [
    l("Universal Robots 于 2005 年在丹麦欧登塞成立，2008 年销售首台 UR5。2015 年 Teradyne 以 2.85 亿美元收购公司；因此 UR 的经营信息需要在 Teradyne 合并披露中理解，不能把母公司数字直接当作 UR 单体数据。", "Universal Robots was founded in Odense in 2005 and sold its first UR5 in 2008. Teradyne acquired the company for USD 285 million in 2015; UR operating information must therefore be interpreted within Teradyne's consolidated disclosures, not treated as standalone UR figures."),
    l("当前目录区分 e-Series 的 UR3e、UR7e、UR12e、UR16e，以及新一代 UR Series 的 UR8 Long、UR15、UR18、UR20、UR30。历史 CB 系列和已从当前产品页退出的型号不混入可采购筛选。", "The current catalog separates e-Series UR3e, UR7e, UR12e, and UR16e from newer UR Series UR8 Long, UR15, UR18, UR20, and UR30. Historical CB-series and models no longer on the current product pages are not mixed into current-order filters."),
    l("协作机器人本体具备安全功能不等于任意应用天然安全。末端工具、工件、速度、夹点、环境和风险评估决定最终是否可在无围栏条件下运行。扩展负载也只在数据表规定的重心和姿态条件下成立。", "Safety functions on a cobot do not make every application inherently safe. Tooling, workpiece, speed, pinch points, environment, and risk assessment determine whether fence-free operation is acceptable. Extended payloads apply only under the center-of-gravity and pose conditions defined by the datasheet."),
  ],
  businessAreas: [
    l("e-Series 与 UR Series 协作机械臂", "e-Series and UR Series collaborative arms"),
    l("PolyScope / PolyScope X 控制软件与开发接口", "PolyScope / PolyScope X control software and developer interfaces"),
    l("URCaps、Marketplace、应用套件、培训和生命周期服务", "URCaps, Marketplace, application kits, training, and lifecycle services"),
  ],
  customerGroups: [
    l("汽车、金属加工、电子、塑料、食品和通用制造企业", "Automotive, metalworking, electronics, plastics, food, and general manufacturing companies"),
    l("机床、焊接、码垛、检测和装配系统集成商", "Machine-tending, welding, palletizing, inspection, and assembly integrators"),
    l("实验室自动化、教育和机器人应用开发团队", "Laboratory automation, education, and robot-application developers"),
  ],
  milestones: [
    { date: "2005", event: l("公司在欧登塞成立。", "The company was founded in Odense.") },
    { date: "2008", event: l("首台商业 UR5 售出。", "The first commercial UR5 was sold.") },
    { date: "2015", event: l("Teradyne 以 2.85 亿美元收购 Universal Robots。", "Teradyne acquired Universal Robots for USD 285 million.") },
    { date: "2018", event: l("e-Series 发布。", "The e-Series was launched.") },
    { date: "2022", event: l("UR20 作为新一代系列首款产品发布。", "UR20 was announced as the first model in the next-generation series.") },
    { date: "2024", event: l("欧登塞新总部启用并发布 AI Accelerator。", "The new Odense headquarters opened and the AI Accelerator was presented.") },
    { date: "2025", event: l("公司官网记录累计第 100,000 台协作机器人里程碑；该数字为厂商口径。", "The company website records its 100,000th cobot milestone; this is a manufacturer-published figure.") },
  ],
  catalogScope: l("覆盖当前 e-Series 与 UR Series 九个具名机械臂；软件、示教器、控制箱、应用套件、URCaps 和历史型号暂不作为独立 SKU 页面。", "Covers nine named arms in the current e-Series and UR Series. Software, teach pendants, controllers, application kits, URCaps, and historical models are not yet independent SKU pages."),
  verificationFocus: l("锁定型号、标准/扩展负载与重心条件、臂展、节拍、工具惯量、安装姿态、IP、安全函数、控制器、I/O、网络、软件版本和认证责任。", "Lock model, standard/extended payload and center-of-gravity conditions, reach, cycle time, tool inertia, mounting orientation, IP, safety functions, controller, I/O, networking, software version, and certification responsibility."),
  questions: [
    l("工件、末端工具、偏心距、加速度和姿态下的动态负载是多少？", "What is the dynamic load considering workpiece, end-effector, offset, acceleration, and pose?"),
    l("节拍、重复性、力控、环境、防护、线缆和安装刚度如何验收？", "How will cycle time, repeatability, force control, environment, protection, cabling, and mounting stiffness be accepted?"),
    l("风险评估、PLd Cat 3 安全链、外部设备、URCap、恢复流程和服务责任由谁承担？", "Who owns risk assessment, the PLd Cat 3 safety chain, external devices, URCaps, recovery procedures, and service responsibility?"),
  ],
});

const patchRealSense = (company: CompanyProfile, locale: Locale) => companyPatch(company, locale, {
  legalName: l("RealSense, Inc.", "RealSense, Inc."),
  country: l("美国", "United States"),
  headquarters: l("美国加利福尼亚州库比蒂诺", "Cupertino, California, United States"),
  founded: "2025",
  officialUrl: "https://www.realsenseai.com/",
  valueChainRole: l("立体深度相机、视觉模块与机器感知软件厂商", "Stereo depth-camera, vision-module, and machine-perception software manufacturer"),
  positioning: l("为机器人、自动化、生物识别和机器视觉提供立体深度相机、嵌入式模块、视觉处理器及 SDK。", "Provides stereo depth cameras, embedded modules, vision processors, and SDKs for robotics, automation, biometrics, and machine vision."),
  strengths: [
    l("D400 系列在快门、基线、滤光、IMU、接口和防护上提供多种变体。", "The D400 family provides variants across shutter type, baseline, filtering, IMU, interface, and ruggedization."),
    l("librealsense / SDK 2.0、ROS 生态和公开数据表支持跨平台原型与集成。", "librealsense / SDK 2.0, ROS integration, and public datasheets support cross-platform prototyping and deployment."),
    l("从 7 cm 近距 D405 到 6 m 级 D455/D456/D457 覆盖不同机器人感知尺度。", "The range spans the 7 cm near-field D405 through 6 m-class D455/D456/D457 for different robotic perception scales."),
  ],
  products: ["D585 Pro", "D555", "D457", "D456", "D455", "D455f", "D436", "D435i", "D435", "D435if", "D435f", "D415", "D405", "D400 modules", "RealSense ID", "Perception Studio", "SDK 2.0"],
  fit: [
    l("AMR、四足、人形和机械臂的导航、避障、抓取与空间感知。", "Navigation, obstacle avoidance, grasping, and spatial perception for AMRs, quadrupeds, humanoids, and manipulators."),
    l("近距三维扫描、尺寸测量、人体交互和边缘视觉原型。", "Near-field 3D scanning, dimensional measurement, human interaction, and edge-vision prototypes."),
    l("需要 USB、GMSL/FAKRA、PoE 或嵌入式模块形态的产品化项目。", "Product programs requiring USB, GMSL/FAKRA, PoE, or embedded-module form factors."),
  ],
  overview: [
    l("RealSense 技术最初在 Intel 内孵化。公司于 2025 年 7 月宣布从 Intel 独立，并完成 5,000 万美元 A 轮融资；总部位于库比蒂诺。这里将 2025 年记为独立公司的成立年份，而不是把技术品牌历史等同于现法律主体存续期。", "RealSense technology was incubated within Intel. In July 2025 the company announced its spinout from Intel and a USD 50 million Series A; it is headquartered in Cupertino. This profile uses 2025 as the independent company's founding year rather than equating the technology brand's history with the current legal entity."),
    l("本批次按官方对比页拆分 D457、D456、D455、D455f、D435、D435i、D435f、D435if、D415 和 D405。对比页未覆盖全部电气、时序、光学和环境字段，因此这些记录标为官方部分覆盖，后续必须继续逐份转录数据表。", "This batch separates D457, D456, D455, D455f, D435, D435i, D435f, D435if, D415, and D405 from the official comparison page. Because that page omits some electrical, timing, optical, and environmental fields, these records remain official-partial pending datasheet-by-datasheet transcription."),
    l("官网公布的装机比例、客户数量和市场覆盖属于公司口径，不等同于第三方审计市场份额。深度精度、最小距离和视场也受分辨率、标定、温度、纹理、照度与反射率影响。", "Published installed-base, customer-count, and market-coverage figures are company statements, not independently audited market share. Depth accuracy, minimum distance, and field of view also depend on resolution, calibration, temperature, texture, illumination, and reflectivity."),
  ],
  businessAreas: [
    l("立体深度相机与工业封装相机", "Stereo depth cameras and ruggedized cameras"),
    l("深度模块、视觉处理器和嵌入式设计", "Depth modules, vision processors, and embedded designs"),
    l("SDK 2.0、Perception Studio 与机器感知工具", "SDK 2.0, Perception Studio, and machine-perception tools"),
    l("身份认证与生物识别视觉", "Identity authentication and biometric vision"),
  ],
  customerGroups: [
    l("AMR、人形、四足和服务机器人厂商", "AMR, humanoid, quadruped, and service-robot manufacturers"),
    l("工业自动化、扫描、测量和边缘视觉团队", "Industrial automation, scanning, measurement, and edge-vision teams"),
    l("生物识别、门禁、医疗和辅助技术开发者", "Biometrics, access-control, healthcare, and assistive-technology developers"),
  ],
  milestones: [
    { date: "Intel 时期", event: l("RealSense 深度视觉技术在 Intel 内孵化并形成 D400 等产品体系。", "RealSense depth-vision technology was incubated at Intel and developed into product families including D400.") },
    { date: "2025-07", event: l("公司宣布从 Intel 独立并完成 5,000 万美元 A 轮融资。", "The company announced its spinout from Intel and a USD 50 million Series A.") },
    { date: "2025", event: l("D555 作为采用新一代 Vision SoC V5 和 PoE 的产品进入公开目录。", "D555 entered the public catalog using the next-generation Vision SoC V5 and PoE.") },
    { date: "2026", event: l("官网目录新增 D585 Pro 等产品，并继续保留 D400 系列型号。", "The website added products including D585 Pro while retaining D400-series models.") },
  ],
  catalogScope: l("本批次完成官方对比页中的十个 D400 系列相机型号；D585 Pro、D555、D436、模块、处理器、RealSense ID 和软件仍待按各自数据表补录。", "This batch covers ten D400 camera models in the official comparison page. D585 Pro, D555, D436, modules, processors, RealSense ID, and software still require product-specific datasheet records."),
  verificationFocus: l("锁定具体型号、快门、基线、滤光、IMU、深度/RGB 分辨率与帧率、最小距离、理想距离、接口、同步、封装、温度、标定和 SDK 版本。", "Lock exact model, shutter, baseline, filter, IMU, depth/RGB resolution and rate, minimum and ideal range, interface, synchronization, enclosure, temperature, calibration, and SDK version."),
  questions: [
    l("目标距离、速度、纹理、反光、环境光和深度完整率要求是什么？", "What are the target range, motion, texture, reflectivity, ambient-light, and depth-completeness requirements?"),
    l("需要 USB、PoE 还是 GMSL/FAKRA，是否需要 IMU、硬件同步或 IR-pass 滤光？", "Is USB, PoE, or GMSL/FAKRA required, and are IMU, hardware sync, or IR-pass filtering needed?"),
    l("主机算力、带宽、标定、温漂、多相机干扰和 SDK 生命周期如何验证？", "How will host compute, bandwidth, calibration, thermal drift, multi-camera interference, and SDK lifecycle be validated?"),
  ],
});

const patchZivid = (company: CompanyProfile, locale: Locale) => companyPatch(company, locale, {
  legalName: l("Zivid AS", "Zivid AS"),
  country: l("挪威", "Norway"),
  headquarters: l("挪威奥斯陆", "Oslo, Norway"),
  founded: "2015",
  officialUrl: "https://www.zivid.com/",
  valueChainRole: l("工业彩色三维相机、视觉软件与机器人运动规划厂商", "Industrial color 3D-camera, vision-software, and robot-motion-planning manufacturer"),
  positioning: l("以结构光彩色三维相机、SDK、Studio、手眼标定和 Motion 软件支持机器人抓取、拆码垛、装配与检测。", "Supports robotic picking, depalletizing, assembly, and inspection with structured-light color 3D cameras, SDK, Studio, hand-eye calibration, and Motion software."),
  strengths: [
    l("当前相机覆盖 300 mm 至 4000 mm 推荐工作距离，并区分机器人安装与固定安装。", "Current cameras cover recommended working distances from 300 mm to 4000 mm and distinguish robot-mounted from stationary use."),
    l("官方对比页公开工作距离、焦距点视场、空间分辨率、点精度、真值度、采集时间、尺寸和质量。", "The official comparison page publishes working distance, focus-plane FOV, spatial resolution, point precision, trueness, capture time, size, and weight."),
    l("相机、SDK、Studio、标定与 Motion 形成从点云采集到机器人路径的产品链。", "Cameras, SDK, Studio, calibration, and Motion span the workflow from point-cloud acquisition to robot paths."),
  ],
  products: ["Zivid 2+ MR60", "Zivid 2+ MR130", "Zivid 2+ LR110", "Zivid 3 XL250", "Zivid SDK", "Zivid Studio", "Zivid Motion", "Zivid 2+ Classic", "accessories"],
  fit: [
    l("料箱拣选、单件分拣、包裹处理和拆码垛。", "Bin picking, piece picking, parcel handling, and depalletizing."),
    l("装配、机器人引导、检测、机床上下料和表面处理。", "Assembly, robot guidance, inspection, machine tending, and surface finishing."),
    l("需要彩色点云、复杂材质采集和手眼标定的工业视觉集成。", "Industrial vision integration requiring color point clouds, difficult-material capture, and hand-eye calibration."),
  ],
  overview: [
    l("Zivid AS 于 2015 年 5 月由 Henrik Schumann-Olsen 和 Øystein Skotheim 从 SINTEF 分拆成立，总部位于奥斯陆。公司时间线把 2001 至 2014 年列为前期三维和机器人视觉研发期，不应误写为公司成立时间。", "Zivid AS was spun out of SINTEF in May 2015 by Henrik Schumann-Olsen and Oystein Skotheim and is headquartered in Oslo. Its timeline lists 2001-2014 as preceding 3D and robot-vision R&D, not the company's incorporation period."),
    l("本批次按官方选择器拆分 Zivid 2+ MR60、MR130、LR110 和 Zivid 3 XL250。对比页给出跨型号核心参数，但没有覆盖每份数据表的全部电气、连接、光学与合规字段，因此暂标官方部分覆盖。", "This batch separates Zivid 2+ MR60, MR130, LR110, and Zivid 3 XL250 from the official selector. The comparison page supplies core cross-model figures but not every electrical, connectivity, optical, and compliance field in each datasheet, so records remain official-partial."),
    l("焦点处空间分辨率、点精度和真值度只对应页面给定距离与测量条件；不能直接外推到整个工作体积、透明/高反射表面或生产节拍。机器人安装还需要评估运动振动、线缆、遮挡和手眼标定稳定性。", "Focus-plane spatial resolution, point precision, and trueness apply only at the stated distance and measurement conditions; they cannot be generalized across the whole volume, transparent or highly reflective surfaces, or production cycle time. Robot mounting also requires evaluation of motion vibration, cabling, occlusion, and hand-eye calibration stability."),
  ],
  businessAreas: [
    l("工业彩色三维相机", "Industrial color 3D cameras"),
    l("Zivid SDK、Studio 与点云开发工具", "Zivid SDK, Studio, and point-cloud development tools"),
    l("机器人手眼标定与 Zivid Motion 路径规划", "Robot hand-eye calibration and Zivid Motion path planning"),
  ],
  customerGroups: [
    l("物流、仓储和电商机器人集成商", "Logistics, warehouse, and ecommerce robot integrators"),
    l("汽车、制造、医药和包装自动化团队", "Automotive, manufacturing, pharmaceutical, and packaging automation teams"),
    l("机器人视觉、检测和复杂物体抓取研发团队", "Robot-vision, inspection, and difficult-object-picking R&D teams"),
  ],
  milestones: [
    { date: "2015-05", event: l("Zivid AS 从 SINTEF 分拆成立。", "Zivid AS was spun out of SINTEF.") },
    { date: "2017-03", event: l("首款 Zivid One 彩色三维相机公开上市。", "The first Zivid One color 3D camera became available.") },
    { date: "2020-11", event: l("Zivid 2 发布。", "Zivid 2 was launched.") },
    { date: "2023-06", event: l("Zivid 2+ 发布。", "Zivid 2+ was launched.") },
    { date: "2024-12", event: l("Zivid 2+ R-series 发布。", "The Zivid 2+ R-series was launched.") },
    { date: "2025-11", event: l("Zivid 3 发布。", "Zivid 3 was launched.") },
    { date: "2026-03", event: l("Zivid Motion 机器人运动规划软件发布。", "Zivid Motion robot-motion-planning software was launched.") },
  ],
  catalogScope: l("完成官方选择器中的四个当前相机型号；Zivid 2+ Classic、软件、配件和历史相机仍待逐项建档。", "Covers the four current camera models in the official selector. Zivid 2+ Classic, software, accessories, and historical cameras still require individual records."),
  verificationFocus: l("锁定工作距离、视场、空间分辨率、点精度、真值度、材质、曝光/HDR、节拍、安装方式、振动、IP、温度、线缆、标定与 SDK。", "Lock working distance, FOV, spatial resolution, point precision, trueness, material, exposure/HDR, cycle time, mounting, vibration, IP, temperature, cabling, calibration, and SDK."),
  questions: [
    l("工作体积、最小特征、目标材质、遮挡和允许采集时间是什么？", "What are the working volume, minimum feature, target materials, occlusion, and allowed capture time?"),
    l("相机固定安装还是随机器人运动，手眼标定和线缆寿命如何维护？", "Will the camera be stationary or robot-mounted, and how will hand-eye calibration and cable life be maintained?"),
    l("透明、镜面、深色对象与环境光条件下需要怎样的曝光和现场样件验证？", "What exposure strategy and on-site sample validation are required for transparent, specular, dark objects, and ambient light?"),
  ],
});

export const applyVerifiedWaveSevenCompanyPatch = (company: CompanyProfile, locale: Locale): CompanyProfile => {
  if (company.slug === "bota-systems") return patchBota(company, locale);
  if (company.slug === "universal-robots") return patchUniversalRobots(company, locale);
  if (company.slug === "realsense") return patchRealSense(company, locale);
  if (company.slug === "zivid") return patchZivid(company, locale);
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

const companyAboutUrl: Record<WaveSevenCompanySlug, string> = {
  "bota-systems": BOTA_ABOUT,
  "universal-robots": UR_ABOUT,
  realsense: REALSENSE_ABOUT,
  zivid: ZIVID_ABOUT,
};

const catalogTitle: Record<WaveSevenCompanySlug, Localized> = {
  "bota-systems": l("Bota Systems 型号级产品目录", "Bota Systems model-level product catalog"),
  "universal-robots": l("Universal Robots 型号级产品目录", "Universal Robots model-level product catalog"),
  realsense: l("RealSense 型号级产品目录", "RealSense model-level product catalog"),
  zivid: l("Zivid 型号级产品目录", "Zivid model-level product catalog"),
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
    ? "本条对应具名型号；数值只适用于引用来源所述配置和条件。"
    : "This record maps to a named model; figures apply only to the cited configuration and conditions."),
  profile: finderProfile(company),
  evidence: {
    level: seed.level ?? "model",
    specificationKind: "parameters",
    specificationCoverage: seed.coverage,
    specificationCoverageNote: locale === "zh"
      ? seed.coverage === "official-complete"
        ? "已逐项覆盖当前引用官方规格表的公开字段；后续版本变化仍以来源页和订单文件为准。"
        : "已覆盖当前官方产品对比页的公开字段；尚未声明每份技术手册的全部字段均已转录。"
      : seed.coverage === "official-complete"
        ? "All public fields in the currently cited official specification table are covered; later revisions remain governed by the source and order documents."
        : "All fields on the current official comparison page are covered; complete transcription of every technical manual is not yet claimed.",
    overview: seed.overview.map((item) => t(locale, item)),
    applications: seed.applications.map((item) => t(locale, item)),
    disclosureBoundary: locale === "zh"
      ? "公开数值只适用于引用来源、具名型号、配置和测试条件；价格、交期、未公开字段和项目性能不作推断。"
      : "Published figures apply only to the cited source, named model, configuration, and test conditions; price, lead time, undisclosed fields, and project performance are not inferred.",
    sourceLinks: [...new Map([
      { label: locale === "zh" ? `${seed.product} 官方资料` : `${seed.product} official material`, url: seed.pageUrl },
      ...(seed.sourceLinks ?? []).map((item) => ({ label: t(locale, item.label), url: item.url })),
      { label: locale === "zh" ? "公司官方介绍" : "Official company profile", url: companyAboutUrl[seed.companySlug] },
    ].map((item) => [item.url, item])).values()],
  },
});

type BotaVariant = {
  id: string;
  product: string;
  pageUrl: string;
  forceRange: [string, string, string];
  torqueRange: [string, string, string];
  forceOverload: [string, string, string];
  torqueOverload: [string, string, string];
  forceResolution: [string, string, string];
  torqueResolution: [string, string, string];
  dimensions: string;
  sampleRate: string;
  imu: string;
  acceleration?: string;
  gyroscope?: string;
  ingress: string;
  temperature: string;
  voltage: string;
  power: string;
  weight: string;
  communication: string;
  protocol: string;
  flange?: string;
  productCodes: string;
  note?: Localized;
  coverage?: FinderSpecificationCoverage;
};

const botaSource = l("Bota Systems 官方产品规格表", "Bota Systems official product specification table");
const botaLocator = l("Specifications 与产品代码", "Specifications and product codes");
const botaOverloadCondition = l("厂商注明过载极限由有限元方法模拟，实物结果可能偏离。", "The manufacturer states that overload limits are simulated by FEA and real-life results may differ.");
const botaResolutionCondition = l("厂商将 NFR 定义为 100 Hz 时传感器信号 6σ 峰峰值噪声分布。", "The manufacturer defines NFR as the 6-sigma peak-to-peak sensor-signal noise distribution at 100 Hz.");
const botaRow = (pageUrl: string, zh: string, en: string, value: string, valueEn = value, conditions?: Localized) => (
  simpleRow(pageUrl, botaSource, botaLocator, zh, en, value, valueEn, conditions)
);
const axes = (values: [string, string, string], labels: string) => `${labels}: ${values.join(" / ")}`;

const botaVariants: BotaVariant[] = [
  {
    id: "bota-minione-gen-a", product: "MiniONE Gen A", pageUrl: "https://shop.botasys.com/shop/force-torque-sensors-4/minione-gen-a-2162",
    forceRange: ["80 N", "80 N", "100 N"], torqueRange: ["1.5 N·m", "1.5 N·m", "1.5 N·m"],
    forceOverload: ["250 N", "250 N", "300 N"], torqueOverload: ["3.5 N·m", "3.5 N·m", "3.5 N·m"],
    forceResolution: ["0.15 N", "0.15 N", "0.10 N"], torqueResolution: ["0.0018 N·m", "0.0018 N·m", "0.0009 N·m"],
    dimensions: "30 mm × 23.2 mm", sampleRate: "800 Hz", imu: "No", ingress: "Dust and water resistant", temperature: "0°C–55°C",
    voltage: "5 V", power: "1.0 W", weight: "about 30 g",
    communication: "USB VCP; UART 3.3 V; RS-422; RS-485; RS-232", protocol: "Bota protocol; Modbus TCP/RTU; USB VCP",
    flange: "ISO 9409-1-15.5-4-M3", productCodes: "BFT-MN2S-SER-ML; BFT-MN2S-SER-UB",
  },
  {
    id: "bota-minione-pro-gen-a", product: "MiniONE Pro Gen A", pageUrl: "https://shop.botasys.com/shop/force-torque-sensors-4/minione-pro-gen-a-2278",
    forceRange: ["50 N", "50 N", "50 N"], torqueRange: ["1 N·m", "1 N·m", "1 N·m"],
    forceOverload: ["100 N", "100 N", "100 N"], torqueOverload: ["2 N·m", "2 N·m", "2 N·m"],
    forceResolution: ["0.02 N", "0.02 N", "0.0125 N"], torqueResolution: ["0.0002 N·m", "0.0002 N·m", "0.0001 N·m"],
    dimensions: "48 mm × 26.2 mm", sampleRate: "3800 Hz", imu: "6 DoF accelerometer and gyroscope", acceleration: "±16 g", gyroscope: "±2000°/s", ingress: "Dust and water resistant", temperature: "0°C–55°C",
    voltage: "5–60 V (75 V maximum)", power: "1.5 W", weight: "60 g",
    communication: "Ethernet 100 Mbps and USB; or EtherCAT end node and USB", protocol: "Modbus TCP; Bota protocol; USB VCP; or CoE",
    flange: "ISO 9409-1-15.5-4-M3", productCodes: "BFT-MIPS-ENET-CG; BFT-MIPS-CAT1-CG",
  },
  {
    id: "bota-mimx-gen-a", product: "MimX Gen A", pageUrl: "https://shop.botasys.com/shop/force-torque-sensors-4/bft-mm1x-usb-ml-mimx-gen-a-2531",
    forceRange: ["1000 N", "1000 N", "1500 N"], torqueRange: ["20 N·m", "20 N·m", "20 N·m"],
    forceOverload: ["3000 N", "3000 N", "7000 N"], torqueOverload: ["70 N·m", "70 N·m", "100 N·m"],
    forceResolution: ["0.54 N", "0.54 N", "1.14 N"], torqueResolution: ["0.024 N·m", "0.024 N·m", "0.0078 N·m"],
    dimensions: "58 mm × 21 mm", sampleRate: "8000 Hz", imu: "6 DoF accelerometer and gyroscope", acceleration: "±16 g", gyroscope: "±2000°/s", ingress: "Dust and water resistant with adapters", temperature: "0°C–55°C",
    voltage: "5 V sensor; 5–36 V with robot kits", power: "0.45 W", weight: "about 85 g",
    communication: "USB VCP; with robot kits CAN, CAN FD, TTL UART 3.3 V, RS-485 and USB VCP", protocol: "Modbus RTU; Bota protocol",
    productCodes: "BFT-MM1X-USB-ML",
  },
  {
    id: "bota-rokubi-t5-gen-a", product: "Rokubi T5 Gen A", pageUrl: "https://shop.botasys.com/shop/force-torque-sensors-4/rokubi-gen-a-2213",
    forceRange: ["400 N", "400 N", "500 N"], torqueRange: ["5 N·m", "5 N·m", "8 N·m"],
    forceOverload: ["1000 N", "1000 N", "2000 N"], torqueOverload: ["12 N·m", "12 N·m", "15 N·m"],
    forceResolution: ["0.055 N", "0.055 N", "0.025 N"], torqueResolution: ["0.00075 N·m", "0.00075 N·m", "0.00025 N·m"],
    dimensions: "48 mm × 32 mm", sampleRate: "3800 Hz", imu: "6 DoF accelerometer and gyroscope", acceleration: "±16 g", gyroscope: "±2000°/s", ingress: "Dust and water resistant", temperature: "0°C–55°C",
    voltage: "5–60 V (75 V maximum)", power: "1.5 W", weight: "120 g", communication: "Ethernet 100 Mbps, RS-422/232/485 and USB; or EtherCAT in/out and USB", protocol: "Modbus TCP/RTU, Bota protocol and VCP; or CoE",
    flange: "Rokubi flange", productCodes: "BFT-ROKS-IND2-B4; BFT-ROKS-CAT2-B4",
  },
  {
    id: "bota-rokubi-t15-gen-a", product: "Rokubi T15 Gen A", pageUrl: "https://shop.botasys.com/shop/force-torque-sensors-4/rokubi-gen-a-2213",
    forceRange: ["500 N", "500 N", "1200 N"], torqueRange: ["15 N·m", "15 N·m", "12 N·m"],
    forceOverload: ["2500 N", "2500 N", "4000 N"], torqueOverload: ["35 N·m", "35 N·m", "40 N·m"],
    forceResolution: ["0.1 N", "0.1 N", "0.07 N"], torqueResolution: ["0.0021 N·m", "0.0021 N·m", "0.0006 N·m"],
    dimensions: "48 mm × 32 mm", sampleRate: "3800 Hz", imu: "6 DoF accelerometer and gyroscope", acceleration: "±16 g", gyroscope: "±2000°/s", ingress: "Dust and water resistant", temperature: "0°C–55°C",
    voltage: "5–60 V (75 V maximum)", power: "1.5 W", weight: "120 g", communication: "Ethernet 100 Mbps, RS-422/232/485 and USB; or EtherCAT in/out and USB", protocol: "Modbus TCP/RTU, Bota protocol and VCP; or CoE",
    flange: "Rokubi flange", productCodes: "BFT-MEDS-IND2-B4; BFT-MEDS-CAT2-B4",
  },
  {
    id: "bota-sensone-t5-gen-a", product: "SensONE T5 Gen A", pageUrl: "https://shop.botasys.com/shop/force-torque-sensors-4/sensone-gen-a-2322",
    forceRange: ["400 N", "400 N", "500 N"], torqueRange: ["5 N·m", "5 N·m", "8 N·m"],
    forceOverload: ["1000 N", "1000 N", "2000 N"], torqueOverload: ["12 N·m", "12 N·m", "15 N·m"],
    forceResolution: ["0.055 N", "0.055 N", "0.025 N"], torqueResolution: ["0.00075 N·m", "0.00075 N·m", "0.00025 N·m"],
    dimensions: "48 mm × 32 mm", sampleRate: "3800 Hz", imu: "6 DoF accelerometer and gyroscope", acceleration: "±16 g", gyroscope: "±2000°/s", ingress: "Dust and water resistant", temperature: "0°C–55°C",
    voltage: "5–60 V (75 V maximum)", power: "1.5 W", weight: "240 g", communication: "Ethernet 100 Mbps, RS-422/232/485 and USB; or EtherCAT in/out and USB", protocol: "Modbus TCP/RTU, Bota protocol and VCP; or CoE",
    flange: "ISO 9404-1-50-4-M6 (as written on the product page)", productCodes: "BFT-SENS-IND2-B4; BFT-SENS-CAT2-B4",
    note: l("官方 T5 规格表列出 48 × 32 mm，而页面顶部把 SensONE 系列描述为更大外壳；采购前应以图纸和完整料号确认尺寸。", "The official T5 table lists 48 x 32 mm while the page header describes the SensONE family as a larger housing; confirm dimensions from the drawing and full part number before purchase."),
    coverage: "official-partial",
  },
  {
    id: "bota-sensone-t15-gen-a", product: "SensONE T15 Gen A", pageUrl: "https://shop.botasys.com/shop/force-torque-sensors-4/sensone-gen-a-2322",
    forceRange: ["500 N", "500 N", "1200 N"], torqueRange: ["15 N·m", "15 N·m", "12 N·m"],
    forceOverload: ["2500 N", "2500 N", "4000 N"], torqueOverload: ["35 N·m", "35 N·m", "40 N·m"],
    forceResolution: ["0.1 N", "0.1 N", "0.07 N"], torqueResolution: ["0.0021 N·m", "0.0021 N·m", "0.0006 N·m"],
    dimensions: "70 mm × 35 mm", sampleRate: "3800 Hz", imu: "6 DoF accelerometer and gyroscope", acceleration: "±16 g", gyroscope: "±2000°/s", ingress: "Dust and water resistant", temperature: "0°C–55°C",
    voltage: "5–60 V (75 V maximum)", power: "1.5 W", weight: "240 g", communication: "Ethernet 100 Mbps, RS-422/232/485 and USB; or EtherCAT in/out and USB", protocol: "Modbus TCP/RTU, Bota protocol and VCP; or CoE",
    flange: "ISO 9404-1-50-4-M6 (as written on the product page)", productCodes: "BFT-DENS-IND2-B4; BFT-DENS-CAT2-B4",
  },
  {
    id: "bota-pixone-t25-gen-a", product: "PixONE T25 Gen A", pageUrl: "https://shop.botasys.com/shop/force-torque-sensors-4/pixone-gen-a-2282",
    forceRange: ["1000 N", "1000 N", "1800 N"], torqueRange: ["25 N·m", "25 N·m", "25 N·m"],
    forceOverload: ["2800 N", "2800 N", "7500 N"], torqueOverload: ["80 N·m", "80 N·m", "140 N·m"],
    forceResolution: ["0.15 N", "0.15 N", "0.15 N"], torqueResolution: ["0.008 N·m", "0.008 N·m", "0.001 N·m"],
    dimensions: "72 mm × 30 mm", sampleRate: "3800 Hz", imu: "6 DoF IMU", acceleration: "±16 g", gyroscope: "±2000°/s", ingress: "Dust and water resistant", temperature: "0°C–55°C",
    voltage: "5–60 V (75 V maximum)", power: "1.5 W", weight: "236 g", communication: "Ethernet 100 Mbps, RS-422/232/485 and USB; or EtherCAT in/out and USB", protocol: "Modbus TCP/RTU, Bota protocol and VCP; or CoE",
    productCodes: "BFT-MH1-MLP-BD; KIT-MH1-CAT2; KIT-MH1-ENET; KIT-MH1-SER",
  },
  {
    id: "bota-pixone-t60-gen-a", product: "PixONE T60 Gen A", pageUrl: "https://shop.botasys.com/shop/force-torque-sensors-4/pixone-gen-a-2282",
    forceRange: ["1800 N", "1800 N", "4000 N"], torqueRange: ["60 N·m", "60 N·m", "50 N·m"],
    forceOverload: ["7200 N", "7200 N", "12800 N"], torqueOverload: ["160 N·m", "160 N·m", "200 N·m"],
    forceResolution: ["0.35 N", "0.35 N", "0.20 N"], torqueResolution: ["0.01 N·m", "0.01 N·m", "0.003 N·m"],
    dimensions: "85 mm × 41.5 mm", sampleRate: "3800 Hz", imu: "6 DoF IMU", acceleration: "±16 g", gyroscope: "±2000°/s", ingress: "Dust and water resistant", temperature: "0°C–55°C",
    voltage: "5–60 V (75 V maximum)", power: "1.5 W", weight: "436 g", communication: "Ethernet 100 Mbps, RS-422/485, EtherCAT in/out and USB", protocol: "Modbus TCP/RTU, Bota protocol, VCP and CoE",
    productCodes: "BFT-SH1-CAT2-BD; BFT-SH1-IND-BD; KIT-SH1-CAT; KIT-SH1-NET; KIT-SH1-SER",
  },
  {
    id: "bota-laxone-gen-a", product: "LaxONE Gen A", pageUrl: "https://shop.botasys.com/shop/force-torque-sensors-4/laxone-gen-a-2331",
    forceRange: ["1800 N", "1800 N", "4000 N"], torqueRange: ["60 N·m", "60 N·m", "60 N·m"],
    forceOverload: ["7200 N", "7200 N", "12800 N"], torqueOverload: ["160 N·m", "160 N·m", "200 N·m"],
    forceResolution: ["0.72 N", "0.72 N", "0.54 N"], torqueResolution: ["0.021 N·m", "0.021 N·m", "0.007 N·m"],
    dimensions: "83 mm × 44.5 mm", sampleRate: "3800 Hz", imu: "6 DoF accelerometer and gyroscope", acceleration: "±16 g", gyroscope: "±2000°/s", ingress: "Dust and water resistant", temperature: "0°C–55°C",
    voltage: "5–60 V (75 V maximum)", power: "1.5 W", weight: "470 g", communication: "Ethernet 100 Mbps, RS-422/232/485 and USB; or EtherCAT in/out and USB", protocol: "Modbus TCP/RTU, Bota protocol and VCP; or CoE",
    flange: "ISO 9404-1-50-4-M6 (as written on the product page)", productCodes: "BFT-LAXS-IND2-B4; BFT-LAXS-CAT2-B4",
  },
  {
    id: "bota-sensone-t80-gen-a", product: "SensONE T80 Gen A", pageUrl: "https://shop.botasys.com/shop/force-torque-sensors-4/sensone-t80-gen-a-2361",
    forceRange: ["2000 N", "2000 N", "4000 N"], torqueRange: ["80 N·m", "80 N·m", "80 N·m"],
    forceOverload: ["7200 N", "7200 N", "12800 N"], torqueOverload: ["200 N·m", "200 N·m", "200 N·m"],
    forceResolution: ["0.3 N", "0.3 N", "0.2 N"], torqueResolution: ["0.01 N·m", "0.01 N·m", "0.003 N·m"],
    dimensions: "100 mm × 48 mm", sampleRate: "3800 Hz", imu: "6 DoF accelerometer and gyroscope", acceleration: "±16 g", gyroscope: "±2000°/s", ingress: "Dust and water resistant", temperature: "0°C–55°C",
    voltage: "5–60 V (75 V maximum)", power: "1.5 W", weight: "710 g", communication: "Ethernet 100 Mbps, RS-422/232/485 and USB; or EtherCAT in/out and USB", protocol: "Modbus TCP/RTU, Bota protocol and VCP; or CoE",
    flange: "ISO 9404-1-50-4-M6 (as written on the product page)", productCodes: "BFT-MENS-IND2-B4; BFT-MENS-CAT2-B4",
  },
  {
    id: "bota-megaone-t180-gen-a", product: "MegaONE T180 Gen A", pageUrl: "https://shop.botasys.com/shop/force-torque-sensors-4/megaone-gen-a-2297",
    forceRange: ["4000 N", "4000 N", "8000 N"], torqueRange: ["180 N·m", "180 N·m", "180 N·m"],
    forceOverload: ["20000 N", "20000 N", "26000 N"], torqueOverload: ["320 N·m", "320 N·m", "600 N·m"],
    forceResolution: ["0.75 N", "0.75 N", "0.55 N"], torqueResolution: ["0.03 N·m", "0.03 N·m", "0.01 N·m"],
    dimensions: "116 mm × 64 mm", sampleRate: "3800 Hz", imu: "6 DoF accelerometer and gyroscope", acceleration: "±16 g", gyroscope: "±2000°/s", ingress: "Dust and water resistant", temperature: "0°C–55°C",
    voltage: "5–60 V (75 V maximum)", power: "1.5 W", weight: "1370 g", communication: "Ethernet 100 Mbps, RS-422/232/485 and USB; or EtherCAT in/out and USB", protocol: "Modbus TCP/RTU, Bota protocol and VCP; or CoE",
    productCodes: "BFT-MEGS-IND2-B4; BFT-MEGS-CAT2-B4",
  },
  {
    id: "bota-megaone-t540-gen-a", product: "MegaONE T540 Gen A", pageUrl: "https://shop.botasys.com/shop/force-torque-sensors-4/megaone-gen-a-2297",
    forceRange: ["12000 N", "12000 N", "24000 N"], torqueRange: ["540 N·m", "540 N·m", "540 N·m"],
    forceOverload: ["60000 N", "60000 N", "78000 N"], torqueOverload: ["960 N·m", "960 N·m", "1800 N·m"],
    forceResolution: ["1.5 N", "1.5 N", "0.9 N"], torqueResolution: ["0.06 N·m", "0.06 N·m", "0.03 N·m"],
    dimensions: "116 mm × 64 mm", sampleRate: "3800 Hz", imu: "6 DoF accelerometer and gyroscope", acceleration: "±16 g", gyroscope: "±2000°/s", ingress: "Dust and water resistant", temperature: "0°C–55°C",
    voltage: "5–60 V (75 V maximum)", power: "1.5 W", weight: "3570 g", communication: "Ethernet 100 Mbps, RS-422/232/485 and USB; or EtherCAT in/out and USB", protocol: "Modbus TCP/RTU, Bota protocol and VCP; or CoE",
    productCodes: "BFT-NEGS-IND2-B4; BFT-NEGS-CAT2-B4",
  },
  {
    id: "bota-kinova-gen3-ft-v2", product: "Kinova Gen3 6-axis F/T Sensor V2", pageUrl: "https://shop.botasys.com/shop/robot-integration-kits-1/kinova-gen3-6-axis-ft-sensor-2475",
    forceRange: ["900 N", "900 N", "1800 N"], torqueRange: ["20 N·m", "20 N·m", "20 N·m"],
    forceOverload: ["2800 N", "2800 N", "7500 N"], torqueOverload: ["80 N·m", "80 N·m", "80 N·m"],
    forceResolution: ["0.15 N", "0.15 N", "0.072 N"], torqueResolution: ["0.0033 N·m", "0.0033 N·m", "0.0012 N·m"],
    dimensions: "75 mm × 40.8 mm", sampleRate: "3800 Hz", imu: "6 DoF IMU and temperature sensor", acceleration: "±16 g", gyroscope: "±2000°/s", ingress: "IP66", temperature: "0°C–55°C",
    voltage: "5–60 V (75 V maximum)", power: "1.5 W", weight: "305 g", communication: "Internal Ethernet on Kinova expansion module VLAN 20; USB-C for configuration; optional UART", protocol: "Bota protocol family and Modbus",
    productCodes: "BFT-KG32-IND2-SW",
  },
];

const botaRows = (spec: BotaVariant): SpecRow[] => [
  botaRow(spec.pageUrl, "型号", "Model", spec.product),
  botaRow(spec.pageUrl, "测量轴数", "Measurement axes", "6"),
  botaRow(spec.pageUrl, "力量程 Fx / Fy / Fz", "Force range Fx / Fy / Fz", axes(spec.forceRange, "Fx / Fy / Fz")),
  botaRow(spec.pageUrl, "力矩量程 Mx / My / Mz", "Torque range Mx / My / Mz", axes(spec.torqueRange, "Mx / My / Mz")),
  botaRow(spec.pageUrl, "力过载极限 Fx / Fy / Fz", "Force overload limit Fx / Fy / Fz", axes(spec.forceOverload, "Fx / Fy / Fz"), axes(spec.forceOverload, "Fx / Fy / Fz"), botaOverloadCondition),
  botaRow(spec.pageUrl, "力矩过载极限 Mx / My / Mz", "Torque overload limit Mx / My / Mz", axes(spec.torqueOverload, "Mx / My / Mz"), axes(spec.torqueOverload, "Mx / My / Mz"), botaOverloadCondition),
  botaRow(spec.pageUrl, "力噪声自由分辨率 Fx / Fy / Fz", "Force noise-free resolution Fx / Fy / Fz", axes(spec.forceResolution, "Fx / Fy / Fz"), axes(spec.forceResolution, "Fx / Fy / Fz"), botaResolutionCondition),
  botaRow(spec.pageUrl, "力矩噪声自由分辨率 Mx / My / Mz", "Torque noise-free resolution Mx / My / Mz", axes(spec.torqueResolution, "Mx / My / Mz"), axes(spec.torqueResolution, "Mx / My / Mz"), botaResolutionCondition),
  botaRow(spec.pageUrl, "外形尺寸（直径 × 高度）", "Dimensions (diameter x height)", spec.dimensions),
  botaRow(spec.pageUrl, "最大采样率", "Maximum sampling rate", spec.sampleRate),
  botaRow(spec.pageUrl, "惯性测量", "Inertial measurement", spec.imu),
  ...(spec.acceleration ? [botaRow(spec.pageUrl, "线加速度量程", "Linear acceleration range", spec.acceleration)] : []),
  ...(spec.gyroscope ? [botaRow(spec.pageUrl, "角速度量程", "Angular velocity range", spec.gyroscope)] : []),
  botaRow(spec.pageUrl, "防护说明", "Ingress protection", spec.ingress),
  botaRow(spec.pageUrl, "工作温度", "Operating temperature", spec.temperature),
  botaRow(spec.pageUrl, "供电电压", "Supply voltage", spec.voltage),
  botaRow(spec.pageUrl, "功耗", "Power consumption", spec.power),
  botaRow(spec.pageUrl, "质量", "Weight", spec.weight),
  botaRow(spec.pageUrl, "通信接口", "Communication interfaces", spec.communication),
  botaRow(spec.pageUrl, "协议", "Protocols", spec.protocol),
  ...(spec.flange ? [botaRow(spec.pageUrl, "工具侧法兰", "Tool-side flange", spec.flange)] : []),
  botaRow(spec.pageUrl, "产品代码", "Product codes", spec.productCodes),
];

const botaSeeds: ProductSeed[] = botaVariants.map((spec) => ({
  id: spec.id,
  companySlug: "bota-systems",
  product: spec.product,
  pageUrl: spec.pageUrl,
  category: "perception",
  primary: "sensing",
  subclass: "force-torque-sensor",
  useCases: ["research", "manufacturing", "integration"],
  type: l("六轴力/力矩传感器", "Six-axis force/torque sensor"),
  integration: l("按型号选择 EtherCAT、工业以太网、串行、CAN、USB 或机器人内部接口，并使用 FT Stack 驱动；机械法兰、线缆、供电、同步和坐标系需纳入同一配置。", "Select EtherCAT, industrial Ethernet, serial, CAN, USB, or robot-internal connectivity by model and use FT Stack drivers. Mechanical flange, cable, power, timing, and coordinate frames must be part of one controlled configuration."),
  verification: l("在目标预载、冲击、温度、滤波和控制频率下分别验证六轴工作量程、串扰、噪声、漂移和过载恢复；过载模拟值不得作为连续工作能力。", "Validate six-axis operating range, cross-talk, noise, drift, and overload recovery under target preload, shock, temperature, filtering, and control rate. Simulated overload limits must not be treated as continuous operating capability."),
  rows: botaRows(spec),
  overview: [
    l(`${spec.product} 是官方当前产品页中的具名型号或量程变体，本记录把六轴量程、过载、噪声自由分辨率、采样、IMU、环境、电气和接口字段分别建索引。`, `${spec.product} is a named model or range variant on the current official product page. This record separately indexes six-axis range, overload, noise-free resolution, sampling, IMU, environment, electrical, and interface fields.`),
    spec.note ?? l("过载数据来自厂商有限元模拟；NFR 是 100 Hz 时 6σ 峰峰值噪声定义。两者都需要在实际安装、线缆、温度和控制滤波条件下复核。", "Overload data are manufacturer FEA simulations, and NFR is defined as 6-sigma peak-to-peak noise at 100 Hz. Both require verification with the actual mounting, cable, temperature, and control filtering."),
  ],
  applications: [l("腕部力控、装配、插拔、打磨与碰撞检测", "Wrist force control, assembly, insertion, finishing, and collision detection"), l("机器人学习、遥操作、示教与测试测量", "Robot learning, teleoperation, teaching, and test measurement")],
  coverage: spec.coverage ?? "official-complete",
  sourceLinks: [{ label: l("Bota Systems 产品组合", "Bota Systems product portfolio"), url: BOTA_PORTFOLIO }],
}));

type UrArmSpec = {
  id: string;
  product: string;
  series: "e-Series" | "UR Series";
  pageUrl: string;
  sourceUrl: string;
  payload: string;
  extendedPayload?: string;
  reach: string;
  maxPower: string;
  moderatePower?: string;
  forceRange: string;
  torqueRange: string;
  forcePrecision: string;
  torquePrecision: string;
  forceAccuracy: string;
  torqueAccuracy: string;
  tcpSpeed: string;
  repeatability: string;
  baseSpeed: string;
  shoulderSpeed: string;
  elbowSpeed: string;
  wristSpeed: string;
  jointRange: string;
  noise: string;
  footprint: string;
  flange: string;
  mass: string;
  ip: string;
  toolCurrent: string;
};

const urEData = {
  ur3e: "https://www.universal-robots.com/manuals/latest/en/datasheets/ur3e/",
  ur7e: "https://www.universal-robots.com/manuals/latest/en/datasheets/ur7e/",
  ur12e: "https://www.universal-robots.com/manuals/latest/en/datasheets/ur12e/",
  ur16e: "https://www.universal-robots.com/manuals/latest/en/techsheets/ur16e/",
};

const urSpecs: UrArmSpec[] = [
  {
    id: "universal-robots-ur3e", product: "UR3e", series: "e-Series", pageUrl: "https://www.universal-robots.com/products/ur3e/", sourceUrl: urEData.ur3e,
    payload: "3 kg", reach: "500 mm", maxPower: "300 W", forceRange: "±30 N", torqueRange: "±10 N·m", forcePrecision: "±2 N", torquePrecision: "±0.1 N·m", forceAccuracy: "±3.5 N", torqueAccuracy: "±0.1 N·m",
    tcpSpeed: "3 m/s", repeatability: "±0.03 mm", baseSpeed: "180°/s", shoulderSpeed: "180°/s", elbowSpeed: "180°/s", wristSpeed: "360°/s", jointRange: "base through wrist 2 ±360°; wrist 3 infinite", noise: "<60 dBA", footprint: "128 mm", flange: "ISO 9409-1-50-4-M6", mass: "11.2 kg including cable", ip: "IP54", toolCurrent: "600 mA",
  },
  {
    id: "universal-robots-ur7e", product: "UR7e", series: "e-Series", pageUrl: "https://www.universal-robots.com/products/ur7e/", sourceUrl: urEData.ur7e,
    payload: "7.5 kg", reach: "850 mm", maxPower: "570 W", forceRange: "±50 N", torqueRange: "±10 N·m", forcePrecision: "±3.5 N", torquePrecision: "±0.2 N·m", forceAccuracy: "±4 N", torqueAccuracy: "±0.3 N·m",
    tcpSpeed: "4 m/s", repeatability: "±0.03 mm", baseSpeed: "180°/s", shoulderSpeed: "180°/s", elbowSpeed: "180°/s", wristSpeed: "180°/s", jointRange: "all joints ±360°", noise: "<65 dBA", footprint: "151 mm", flange: "ISO 9409-1-50-4-M6", mass: "20.6 kg including cable", ip: "IP54", toolCurrent: "1.5 A dual-pin or 1 A single-pin",
  },
  {
    id: "universal-robots-ur12e", product: "UR12e", series: "e-Series", pageUrl: "https://www.universal-robots.com/products/ur12e/", sourceUrl: urEData.ur12e,
    payload: "12.5 kg", reach: "1300 mm", maxPower: "615 W", forceRange: "±100 N", torqueRange: "±10 N·m", forcePrecision: "±5 N", torquePrecision: "±0.2 N·m", forceAccuracy: "±5.5 N", torqueAccuracy: "±0.5 N·m",
    tcpSpeed: "4 m/s", repeatability: "±0.05 mm", baseSpeed: "120°/s", shoulderSpeed: "120°/s", elbowSpeed: "180°/s", wristSpeed: "180°/s", jointRange: "all joints ±360°", noise: "<65 dBA", footprint: "190 mm", flange: "ISO 9409-1-50-4-M6", mass: "33.5 kg including cable", ip: "IP54", toolCurrent: "2 A dual-pin or 1 A single-pin",
  },
  {
    id: "universal-robots-ur16e", product: "UR16e", series: "e-Series", pageUrl: "https://www.universal-robots.com/products/ur16e/", sourceUrl: urEData.ur16e,
    payload: "16 kg", reach: "900 mm", maxPower: "585 W", forceRange: "±160 N", torqueRange: "±10 N·m", forcePrecision: "±5 N", torquePrecision: "±0.2 N·m", forceAccuracy: "±5.5 N", torqueAccuracy: "±0.5 N·m",
    tcpSpeed: "3 m/s", repeatability: "±0.05 mm", baseSpeed: "120°/s", shoulderSpeed: "120°/s", elbowSpeed: "180°/s", wristSpeed: "180°/s", jointRange: "all joints ±360°", noise: "<65 dBA", footprint: "190 mm", flange: "ISO 9409-1-50-4-M6", mass: "33.1 kg including cable", ip: "IP54", toolCurrent: "2 A dual-pin or 1 A single-pin",
  },
  {
    id: "universal-robots-ur8-long", product: "UR8 Long", series: "UR Series", pageUrl: "https://www.universal-robots.com/products/ur8-long/", sourceUrl: UR_SERIES_PDF,
    payload: "8 kg", extendedPayload: "10 kg under manual-defined conditions", reach: "1750 mm", maxPower: "615 W", moderatePower: "350 W", forceRange: "±150 N", torqueRange: "±10 N·m", forcePrecision: "±7.5 N", torquePrecision: "±0.2 N·m", forceAccuracy: "±8.3 N", torqueAccuracy: "±0.5 N·m",
    tcpSpeed: "5 m/s", repeatability: "±0.08 mm", baseSpeed: "180°/s", shoulderSpeed: "180°/s", elbowSpeed: "240°/s", wristSpeed: "300°/s", jointRange: "all joints ±360°", noise: "<67 dBA", footprint: "204 mm", flange: "ISO 9409-1-50-4-M6", mass: "44.7 kg", ip: "IP65", toolCurrent: "2 A dual-pin or 1 A single-pin",
  },
  {
    id: "universal-robots-ur15", product: "UR15", series: "UR Series", pageUrl: "https://www.universal-robots.com/products/ur15/", sourceUrl: UR_SERIES_PDF,
    payload: "15 kg", extendedPayload: "17.5 kg under manual-defined conditions", reach: "1300 mm", maxPower: "550 W", moderatePower: "350 W", forceRange: "±150 N", torqueRange: "±10 N·m", forcePrecision: "±7.5 N", torquePrecision: "±0.2 N·m", forceAccuracy: "±8.3 N", torqueAccuracy: "±0.5 N·m",
    tcpSpeed: "5 m/s", repeatability: "±0.05 mm", baseSpeed: "180°/s", shoulderSpeed: "180°/s", elbowSpeed: "240°/s", wristSpeed: "300°/s", jointRange: "all joints ±360°", noise: "<67 dBA", footprint: "204 mm", flange: "ISO 9409-1-50-4-M6", mass: "40.7 kg", ip: "IP65", toolCurrent: "2 A dual-pin or 1 A single-pin",
  },
  {
    id: "universal-robots-ur18", product: "UR18", series: "UR Series", pageUrl: "https://www.universal-robots.com/products/ur18/", sourceUrl: UR_SERIES_PDF,
    payload: "18 kg", reach: "950 mm", maxPower: "570 W", moderatePower: "350 W", forceRange: "±150 N", torqueRange: "±10 N·m", forcePrecision: "±7.5 N", torquePrecision: "±0.2 N·m", forceAccuracy: "±8.3 N", torqueAccuracy: "±0.5 N·m",
    tcpSpeed: "4 m/s", repeatability: "±0.05 mm", baseSpeed: "180°/s", shoulderSpeed: "180°/s", elbowSpeed: "240°/s", wristSpeed: "300°/s", jointRange: "all joints ±360°", noise: "<67 dBA", footprint: "204 mm", flange: "ISO 9409-1-50-4-M6", mass: "39.2 kg", ip: "IP65", toolCurrent: "2 A dual-pin or 1 A single-pin",
  },
  {
    id: "universal-robots-ur20", product: "UR20", series: "UR Series", pageUrl: "https://www.universal-robots.com/products/ur20/", sourceUrl: UR_SERIES_PDF,
    payload: "20 kg", extendedPayload: "25 kg under manual-defined conditions", reach: "1750 mm", maxPower: "750 W", moderatePower: "500 W", forceRange: "±200 N", torqueRange: "±20 N·m", forcePrecision: "±5.5 N", torquePrecision: "±0.2 N·m", forceAccuracy: "±10 N", torqueAccuracy: "±0.1 N·m",
    tcpSpeed: "5 m/s", repeatability: "±0.1 mm", baseSpeed: "120°/s", shoulderSpeed: "120°/s", elbowSpeed: "150°/s", wristSpeed: "210°/s", jointRange: "all joints ±360°", noise: "<65 dBA", footprint: "245 mm", flange: "ISO 9409-1-80-6-M8", mass: "64 kg", ip: "IP65", toolCurrent: "2 A dual-pin or 1 A single-pin",
  },
  {
    id: "universal-robots-ur30", product: "UR30", series: "UR Series", pageUrl: "https://www.universal-robots.com/products/ur30/", sourceUrl: UR_SERIES_PDF,
    payload: "30 kg", extendedPayload: "35 kg under manual-defined conditions", reach: "1300 mm", maxPower: "750 W", moderatePower: "300 W", forceRange: "±200 N", torqueRange: "±20 N·m", forcePrecision: "±5.5 N", torquePrecision: "±0.2 N·m", forceAccuracy: "±10 N", torqueAccuracy: "±1.0 N·m",
    tcpSpeed: "4 m/s", repeatability: "±0.1 mm", baseSpeed: "120°/s", shoulderSpeed: "120°/s", elbowSpeed: "150°/s", wristSpeed: "210°/s", jointRange: "all joints ±360°", noise: "<65 dBA", footprint: "245 mm", flange: "ISO 9409-1-80-6-M8", mass: "63.5 kg", ip: "IP65", toolCurrent: "2 A dual-pin or 1 A single-pin",
  },
];

const urSource = (spec: UrArmSpec) => l(`Universal Robots ${spec.product} 官方数据表`, `Universal Robots ${spec.product} official datasheet`);
const urLocator = (spec: UrArmSpec) => l(`${spec.series} 机器人与控制器规格`, `${spec.series} robot and controller specifications`);
const urRow = (spec: UrArmSpec, zh: string, en: string, value: string, valueEn = value, conditions?: Localized) => (
  simpleRow(spec.sourceUrl, urSource(spec), urLocator(spec), zh, en, value, valueEn, conditions)
);

const urRows = (spec: UrArmSpec): SpecRow[] => [
  urRow(spec, "型号", "Model", spec.product),
  urRow(spec, "系列", "Series", spec.series),
  urRow(spec, "关节轴数", "Rotating joints", "6"),
  urRow(spec, "标准负载", "Standard payload", spec.payload),
  ...(spec.extendedPayload ? [urRow(spec, "扩展负载", "Extended payload", spec.extendedPayload, spec.extendedPayload, l("仅在厂商手册规定的重心、姿态和软件条件下成立。", "Applies only under the center-of-gravity, pose, and software conditions defined by the manufacturer manual."))] : []),
  urRow(spec, "最大工作半径", "Reach", spec.reach),
  urRow(spec, "最大功耗", "Maximum power consumption", spec.maxPower),
  ...(spec.moderatePower ? [urRow(spec, "中等工作功耗", "Moderate operating power", spec.moderatePower)] : []),
  urRow(spec, "腕部六维力传感量程", "Wrist force-sensor range", spec.forceRange),
  urRow(spec, "腕部六维力矩传感量程", "Wrist torque-sensor range", spec.torqueRange),
  urRow(spec, "力测量精密度", "Force measurement precision", spec.forcePrecision),
  urRow(spec, "力矩测量精密度", "Torque measurement precision", spec.torquePrecision),
  urRow(spec, "力测量准确度", "Force measurement accuracy", spec.forceAccuracy),
  urRow(spec, "力矩测量准确度", "Torque measurement accuracy", spec.torqueAccuracy),
  urRow(spec, "最大 TCP 速度", "Maximum TCP speed", spec.tcpSpeed),
  urRow(spec, "位姿重复精度", "Pose repeatability", spec.repeatability),
  urRow(spec, "底座最大角速度", "Base maximum speed", spec.baseSpeed),
  urRow(spec, "肩部最大角速度", "Shoulder maximum speed", spec.shoulderSpeed),
  urRow(spec, "肘部最大角速度", "Elbow maximum speed", spec.elbowSpeed),
  urRow(spec, "腕部最大角速度", "Wrist maximum speed", spec.wristSpeed),
  urRow(spec, "关节转动范围", "Joint range", spec.jointRange),
  urRow(spec, "噪声", "Noise", spec.noise),
  urRow(spec, "底座安装面直径", "Footprint diameter", spec.footprint),
  urRow(spec, "工具法兰", "Tool flange", spec.flange),
  urRow(spec, "机械臂质量", "Arm mass", spec.mass),
  urRow(spec, "机械臂防护等级", "Arm ingress protection", spec.ip),
  urRow(spec, "安装方向", "Mounting orientation", "Any orientation"),
  urRow(spec, "环境温度", "Ambient temperature", "0°C–50°C"),
  urRow(spec, "环境湿度", "Ambient humidity", "≤90% RH, non-condensing"),
  urRow(spec, "示教器显示屏", "Teach-pendant display", "12-inch touchscreen"),
  urRow(spec, "可配置安全功能", "Configurable safety functions", "21"),
  urRow(spec, "安全等级", "Safety rating", "EN ISO 13849-1, PLd Category 3; EN ISO 10218-1"),
  urRow(spec, "工具 I/O", "Tool I/O", "2 digital inputs, 2 digital outputs, 2 analog inputs or RS-485"),
  urRow(spec, "工具供电", "Tool power", "12 V or 24 V"),
  urRow(spec, "工具电流", "Tool current", spec.toolCurrent),
  urRow(spec, "机械臂线缆", "Robot cable", "6 m"),
  urRow(spec, "机械臂材料", "Arm materials", "Aluminum, plastic and steel"),
  ...(spec.series === "e-Series" ? [
    urRow(spec, "标准控制箱质量", "Standard control-box mass", "12 kg"),
    urRow(spec, "控制箱数字输入/输出", "Control-box digital I/O", "16 inputs / 16 outputs"),
    urRow(spec, "控制箱模拟输入/输出", "Control-box analog I/O", "2 inputs / 2 outputs"),
    urRow(spec, "编码器输入", "Quadrature encoder inputs", "4"),
    urRow(spec, "控制箱 24 V I/O 电源", "Controller 24 V I/O supply", "2 A"),
    urRow(spec, "工业网络", "Industrial networks", "Modbus TCP, EtherNet/IP, PROFINET and PROFIsafe"),
    urRow(spec, "开发与机器人接口", "Development and robot interfaces", "ROS, ROS 2 and URCaps"),
    urRow(spec, "控制箱以太网", "Controller Ethernet", "1 Gbit/s"),
    urRow(spec, "控制箱 USB", "Controller USB", "USB 2.0 and USB 3.0"),
    urRow(spec, "显示输出", "Display output", "Mini DisplayPort"),
  ] : []),
];

const urSeeds: ProductSeed[] = urSpecs.map((spec) => ({
  id: spec.id,
  companySlug: "universal-robots",
  product: spec.product,
  pageUrl: spec.pageUrl,
  category: "robot-platform",
  primary: "robot-platform",
  subclass: "industrial-arm",
  useCases: ["manufacturing", "research", "integration"],
  type: l(`${spec.series} 六轴协作机械臂`, `${spec.series} six-axis collaborative robot arm`),
  integration: l("通过 PolyScope、URScript、Dashboard Server、RTDE、Modbus TCP、PROFINET/EtherNet IP 及 URCaps 生态集成；具体网络和开发接口随控制器、软件版本和安全配置确认。", "Integrates through PolyScope, URScript, Dashboard Server, RTDE, Modbus TCP, PROFINET/EtherNet IP, and URCaps. Confirm interfaces against the controller, software release, and safety configuration."),
  verification: l("使用真实末端工具、工件、重心、姿态和加速度验证动态负载、节拍、停止距离、力控、重复性、温升与恢复流程；协作应用必须单独完成风险评估。", "Use the real tool, workpiece, center of gravity, pose, and acceleration to validate dynamic payload, cycle time, stopping distance, force control, repeatability, thermal behavior, and recovery. Collaborative applications require an application-specific risk assessment."),
  rows: urRows(spec),
  overview: [
    l(`${spec.product} 是当前 ${spec.series} 中的具名机械臂。本记录把负载、臂展、功耗、六维力/矩测量、TCP 与关节速度、重复性、机械、环境、安全、工具 I/O 和控制接口分开索引。`, `${spec.product} is a named arm in the current ${spec.series}. This record separately indexes payload, reach, power, six-axis force/torque measurement, TCP and joint speed, repeatability, mechanical, environmental, safety, tool I/O, and control interfaces.`),
    spec.extendedPayload
      ? l("扩展负载不是所有姿态下的无条件额定值，必须使用当前手册中的重心和姿态限制进行路径验证。", "Extended payload is not an unconditional rating across every pose; path validation must apply current manual limits for center of gravity and pose.")
      : l("本体参数不能替代整机工作站验收；工具、工件、夹点、外部轴、人员和现场环境会改变风险与节拍。", "Arm specifications do not replace workcell acceptance; tooling, workpiece, pinch points, external axes, people, and site conditions alter both risk and cycle time."),
  ],
  applications: [l("机床上下料、装配、焊接、码垛与搬运", "Machine tending, assembly, welding, palletizing, and handling"), l("实验室自动化、检测、打磨和机器人应用开发", "Laboratory automation, inspection, finishing, and robot-application development")],
  coverage: "official-complete",
  sourceLinks: [
    { label: l("Universal Robots 产品历史", "Universal Robots product history"), url: UR_HISTORY },
    { label: l(spec.series === "e-Series" ? "e-Series 产品页" : "UR Series 统一数据表", spec.series === "e-Series" ? "e-Series product page" : "UR Series comparison datasheet"), url: spec.series === "e-Series" ? UR_E_SERIES : UR_SERIES_PDF },
  ],
}));

type RealSenseCameraSpec = {
  id: string;
  product: string;
  pageUrl: string;
  depthShutter: string;
  depthFov: string;
  depthAccuracy: string;
  depthFilter: string;
  rgbShutter: string;
  rgbResolution: string;
  rgbFov: string;
  imu: string;
  minZ: string;
  idealRange: string;
  components: string;
  dimensions: string;
  cameraInterface: string;
  ingress: string;
};

const realSenseSpecs: RealSenseCameraSpec[] = [
  {
    id: "realsense-d457", product: "D457", pageUrl: "https://www.realsenseai.com/products/d457-gmsl-fakra/",
    depthShutter: "Global shutter", depthFov: "87° × 58°", depthAccuracy: "<2% at 4 m", depthFilter: "All-pass",
    rgbShutter: "Global shutter", rgbResolution: "1280 × 800 at 30 fps", rgbFov: "90° × 65°", imu: "Yes",
    minZ: "about 52 cm at maximum resolution", idealRange: "0.6–6 m", components: "RealSense Vision Processor D4 Board V5 + RealSense Module D450",
    dimensions: "124 mm × 26 mm × 36 mm", cameraInterface: "GMSL / FAKRA", ingress: "IP65",
  },
  {
    id: "realsense-d456", product: "D456", pageUrl: "https://www.realsenseai.com/products/d456-usb/",
    depthShutter: "Global shutter", depthFov: "87° × 58°", depthAccuracy: "<2% at 4 m", depthFilter: "All-pass",
    rgbShutter: "Global shutter", rgbResolution: "1280 × 800 at 30 fps", rgbFov: "90° × 65°", imu: "Yes",
    minZ: "about 52 cm at maximum resolution", idealRange: "0.6–6 m", components: "RealSense Vision Processor D4 Board V5 + RealSense Module D450",
    dimensions: "124 mm × 26 mm × 36 mm", cameraInterface: "USB 3", ingress: "IP65",
  },
  {
    id: "realsense-d455", product: "D455", pageUrl: "https://www.realsenseai.com/products/real-sense-depth-camera-d455f/",
    depthShutter: "Global shutter", depthFov: "87° × 58°", depthAccuracy: "<2% at 4 m", depthFilter: "All-pass",
    rgbShutter: "Global shutter", rgbResolution: "1280 × 800 at 30 fps", rgbFov: "90° × 65°", imu: "Bosch BMI055",
    minZ: "about 52 cm at maximum resolution", idealRange: "0.6–6 m", components: "RealSense Vision Processor D4 + RealSense Module D450",
    dimensions: "124 mm × 26 mm × 29 mm", cameraInterface: "USB-C 3.1 Gen 1", ingress: "None specified",
  },
  {
    id: "realsense-d455f", product: "D455f", pageUrl: "https://www.realsenseai.com/products/d455f/",
    depthShutter: "Global shutter", depthFov: "87° × 58°", depthAccuracy: "<2% at 4 m", depthFilter: "IR-pass",
    rgbShutter: "Global shutter", rgbResolution: "1280 × 800 at 30 fps", rgbFov: "90° × 65°", imu: "Bosch BMI055",
    minZ: "about 52 cm at maximum resolution", idealRange: "0.6–6 m", components: "RealSense Vision Processor D4 + RealSense Module D450",
    dimensions: "124 mm × 26 mm × 29 mm", cameraInterface: "USB-C 3.1 Gen 1", ingress: "None specified",
  },
  {
    id: "realsense-d435", product: "D435", pageUrl: "https://www.realsenseai.com/products/stereo-depth-camera-d435/",
    depthShutter: "Global shutter", depthFov: "87° × 58°", depthAccuracy: "<2% at 2 m", depthFilter: "All-pass",
    rgbShutter: "Rolling shutter", rgbResolution: "1920 × 1080 at 30 fps", rgbFov: "69° × 42°", imu: "No",
    minZ: "about 28 cm at maximum resolution", idealRange: "0.3–3 m", components: "RealSense Vision Processor D4 + RealSense Module D430 + RGB camera",
    dimensions: "90 mm × 25 mm × 25 mm", cameraInterface: "USB-C 3.1 Gen 1", ingress: "None specified",
  },
  {
    id: "realsense-d435i", product: "D435i", pageUrl: "https://www.realsenseai.com/products/depth-camera-d435i/",
    depthShutter: "Global shutter", depthFov: "87° × 58°", depthAccuracy: "<2% at 2 m", depthFilter: "All-pass",
    rgbShutter: "Rolling shutter", rgbResolution: "1920 × 1080 at 30 fps", rgbFov: "69° × 42°", imu: "Yes, six degrees of freedom",
    minZ: "about 28 cm at maximum resolution", idealRange: "0.3–3 m", components: "RealSense Vision Processor D4 + RealSense Module D430 + RGB camera",
    dimensions: "90 mm × 25 mm × 25 mm", cameraInterface: "USB-C 3.1 Gen 1", ingress: "None specified",
  },
  {
    id: "realsense-d435f", product: "D435f", pageUrl: "https://www.realsenseai.com/products/d435f-3/",
    depthShutter: "Global shutter", depthFov: "87° × 58°", depthAccuracy: "<2% at 2 m", depthFilter: "IR-pass",
    rgbShutter: "Rolling shutter", rgbResolution: "1920 × 1080 at 30 fps", rgbFov: "69° × 42°", imu: "No",
    minZ: "about 28 cm at maximum resolution", idealRange: "0.3–3 m", components: "RealSense Vision Processor D4 + RealSense Module D430 + RGB camera",
    dimensions: "90 mm × 25.8 mm × 25 mm", cameraInterface: "USB-C 3.1 Gen 1", ingress: "None specified",
  },
  {
    id: "realsense-d435if", product: "D435if", pageUrl: "https://www.realsenseai.com/products/d435if/",
    depthShutter: "Global shutter", depthFov: "87° × 58°", depthAccuracy: "<2% at 2 m", depthFilter: "IR-pass",
    rgbShutter: "Rolling shutter", rgbResolution: "1920 × 1080 at 30 fps", rgbFov: "69° × 42°", imu: "Yes, six degrees of freedom",
    minZ: "about 28 cm at maximum resolution", idealRange: "0.3–3 m", components: "RealSense Vision Processor D4 + RealSense Module D430 + RGB camera",
    dimensions: "90 mm × 25.8 mm × 25 mm", cameraInterface: "USB-C 3.1 Gen 1", ingress: "None specified",
  },
  {
    id: "realsense-d415", product: "D415", pageUrl: "https://www.realsenseai.com/products/stereo-depth-camera-d415/",
    depthShutter: "Rolling shutter", depthFov: "65° × 40°", depthAccuracy: "<2% at 2 m", depthFilter: "All-pass",
    rgbShutter: "Rolling shutter", rgbResolution: "1920 × 1080 at 30 fps", rgbFov: "69° × 42°", imu: "No",
    minZ: "about 45 cm at maximum resolution", idealRange: "0.5–3 m", components: "RealSense Vision Processor D4 + RealSense Module D415",
    dimensions: "99 mm × 20 mm × 23 mm", cameraInterface: "USB-C 3.1 Gen 1", ingress: "None specified",
  },
  {
    id: "realsense-d405", product: "D405", pageUrl: "https://www.realsenseai.com/products/stereo-depth-camera-d405/",
    depthShutter: "Global shutter", depthFov: "87° × 58°", depthAccuracy: "±2% at 50 cm", depthFilter: "IR-cut",
    rgbShutter: "Global shutter (left imager RGB with ISP)", rgbResolution: "1280 × 720 at 30 fps", rgbFov: "87° × 58°", imu: "No",
    minZ: "7 cm at 480p", idealRange: "7–50 cm", components: "RealSense Vision Processor D4 Board v4 + RealSense Module D401",
    dimensions: "42 mm × 42 mm × 23 mm peripheral; 36.5 mm × 19.4 mm × 10.5 mm module", cameraInterface: "USB 2 or USB 3.1", ingress: "None specified",
  },
];

const realSenseSource = l("RealSense 官方相机对比表", "RealSense official camera comparison table");
const realSenseLocator = l("Compare Depth Cameras 功能矩阵", "Compare Depth Cameras feature matrix");
const realSenseFovCondition = l("厂商注明视场角测量允许相对标称值 ±3°。", "The manufacturer states that measured FOV is within +/-3 degrees of the stated value.");
const realSenseAccuracyCondition = l("厂商注明 Z 轴精度为出厂测量值；现场结果还受标定、距离、纹理、照度和温度影响。", "The manufacturer states that Z accuracy is measured out of the factory; field results also depend on calibration, distance, texture, illumination, and temperature.");
const realSenseRow = (zh: string, en: string, value: string, conditions?: Localized) => (
  simpleRow(REALSENSE_COMPARE, realSenseSource, realSenseLocator, zh, en, value, value, conditions)
);

const realSenseRows = (spec: RealSenseCameraSpec): SpecRow[] => [
  realSenseRow("型号", "Model", spec.product),
  realSenseRow("使用环境", "Use environment", "Indoor / outdoor"),
  realSenseRow("深度图像传感器快门", "Depth image-sensor shutter", spec.depthShutter),
  realSenseRow("深度视场角（水平 × 垂直）", "Depth FOV (horizontal x vertical)", spec.depthFov, realSenseFovCondition),
  realSenseRow("最大深度分辨率", "Maximum depth resolution", "1280 × 720"),
  realSenseRow("深度精度", "Depth accuracy", spec.depthAccuracy, realSenseAccuracyCondition),
  realSenseRow("最大深度帧率", "Maximum depth frame rate", "90 fps"),
  realSenseRow("深度滤光", "Depth filter", spec.depthFilter),
  realSenseRow("RGB 传感器快门", "RGB sensor shutter", spec.rgbShutter),
  realSenseRow("RGB 分辨率与帧率", "RGB resolution and frame rate", spec.rgbResolution),
  realSenseRow("RGB 视场角（水平 × 垂直）", "RGB FOV (horizontal x vertical)", spec.rgbFov, realSenseFovCondition),
  realSenseRow("惯性测量单元", "Inertial measurement unit", spec.imu),
  realSenseRow("最大分辨率下最小深度距离", "Minimum depth distance at maximum resolution", spec.minZ),
  realSenseRow("理想工作距离", "Ideal working range", spec.idealRange),
  realSenseRow("主要组件", "Main components", spec.components),
  realSenseRow("外形尺寸", "Dimensions", spec.dimensions),
  realSenseRow("接口", "Interface", spec.cameraInterface),
  realSenseRow("外壳防护等级", "Enclosure IP rating", spec.ingress),
];

const realSenseSeeds: ProductSeed[] = realSenseSpecs.map((spec) => ({
  id: spec.id,
  companySlug: "realsense",
  product: spec.product,
  pageUrl: spec.pageUrl,
  category: "perception",
  primary: "sensing",
  subclass: "vision-sensor",
  useCases: ["research", "manufacturing", "logistics", "integration"],
  type: l("立体深度相机", "Stereo depth camera"),
  integration: l("通过 librealsense / SDK 2.0、USB 或型号专用 GMSL/FAKRA 接口集成；ROS、同步、带宽、标定和主机兼容性按实际软件版本确认。", "Integrates through librealsense / SDK 2.0 and USB or model-specific GMSL/FAKRA. Confirm ROS, synchronization, bandwidth, calibration, and host compatibility against the actual software release."),
  verification: l("在目标距离、纹理、反光、环境光、速度、分辨率和温度下验证深度完整率、精度与帧率；同时核对快门、滤光、IMU、同步、接口和封装。", "Validate depth completeness, accuracy, and frame rate at target distance, texture, reflectivity, ambient light, motion, resolution, and temperature, while confirming shutter, filter, IMU, synchronization, interface, and enclosure."),
  rows: realSenseRows(spec),
  overview: [
    l(`${spec.product} 是 RealSense 当前产品或对比页中的具名相机。本记录逐项转录官方对比表，便于按工作距离、视场、分辨率、帧率、快门、IMU、接口和尺寸检索。`, `${spec.product} is a named camera in the current RealSense product or comparison pages. This record transcribes the official comparison matrix for search by working range, FOV, resolution, frame rate, shutter, IMU, interface, and dimensions.`),
    l("对比页不是完整数据表，因此电气、同步、温度、投射器、基线和更多光学字段仍需继续补录；当前数值不能替代现场标定和样件测试。", "The comparison page is not a complete datasheet, so electrical, synchronization, temperature, projector, baseline, and additional optical fields still require transcription. Current figures do not replace field calibration and sample testing."),
  ],
  applications: [l("移动机器人导航、避障与空间感知", "Mobile-robot navigation, obstacle avoidance, and spatial perception"), l("机器人抓取、三维扫描、测量和人体交互", "Robot grasping, 3D scanning, measurement, and human interaction")],
  coverage: "official-partial",
  sourceLinks: [
    { label: l("RealSense 官方相机对比表", "RealSense official camera comparison"), url: REALSENSE_COMPARE },
    { label: l("RealSense 独立公司与 A 轮公告", "RealSense spinout and Series A announcement"), url: REALSENSE_SPINOUT },
  ],
}));

type ZividCameraSpec = {
  id: string;
  product: string;
  pageUrl: string;
  applications: string;
  mounting: string;
  focusDistance: string;
  optimalDistance: string;
  recommendedDistance: string;
  fovAtFocus: string;
  spatialResolution: string;
  pointPrecision: string;
  trueness: string;
  captureTime: string;
  dimensions: string;
  weight: string;
};

const zividSpecs: ZividCameraSpec[] = [
  {
    id: "zivid-2-plus-mr60", product: "Zivid 2+ MR60", pageUrl: "https://www.zivid.com/zivid-2-plus-mr60",
    applications: "Assembly; robot guiding; inspection", mounting: "Robot mounting", focusDistance: "600 mm", optimalDistance: "350–900 mm", recommendedDistance: "300–1100 mm",
    fovAtFocus: "570 mm × 460 mm at 600 mm", spatialResolution: "0.24 mm at focus distance", pointPrecision: "80 µm", trueness: ">99.8% at focus distance", captureTime: "25–1500 ms", dimensions: "169 mm × 124 mm × 56 mm", weight: "1000 g",
  },
  {
    id: "zivid-2-plus-mr130", product: "Zivid 2+ MR130", pageUrl: "https://www.zivid.com/zivid-2-plus-mr130",
    applications: "Piece picking; parcel handling; bin picking", mounting: "Stationary mounting", focusDistance: "1300 mm", optimalDistance: "1000–1600 mm", recommendedDistance: "800–2700 mm",
    fovAtFocus: "790 mm × 650 mm at 1300 mm", spatialResolution: "0.32 mm at focus distance", pointPrecision: "210 µm", trueness: ">99.65% at focus distance", captureTime: "25–1500 ms", dimensions: "169 mm × 124 mm × 56 mm", weight: "1000 g",
  },
  {
    id: "zivid-2-plus-lr110", product: "Zivid 2+ LR110", pageUrl: "https://www.zivid.com/zivid-2-plus-lr110",
    applications: "Depalletizing; big-bin picking; piece picking", mounting: "Robot mounting", focusDistance: "1100 mm", optimalDistance: "800–1400 mm", recommendedDistance: "700–1700 mm",
    fovAtFocus: "1090 mm × 850 mm at 1100 mm", spatialResolution: "0.44 mm at focus distance", pointPrecision: "260 µm", trueness: ">99.65% at focus distance", captureTime: "25–1500 ms", dimensions: "169 mm × 124 mm × 56 mm", weight: "1000 g",
  },
  {
    id: "zivid-3-xl250", product: "Zivid 3 XL250", pageUrl: "https://www.zivid.com/zivid-3",
    applications: "Depalletizing; big-bin picking; piece picking", mounting: "Stationary mounting", focusDistance: "2500 mm", optimalDistance: "1500–3500 mm", recommendedDistance: "1500–4000 mm",
    fovAtFocus: "1750 mm × 1750 mm at 2500 mm", spatialResolution: "0.62 mm at focus distance", pointPrecision: "250 µm", trueness: ">99.85% at focus distance", captureTime: "250–1500 ms", dimensions: "336 mm × 133 mm × 70 mm", weight: "2700 g",
  },
];

const zividSource = l("Zivid 官方相机选择与对比表", "Zivid official camera selector and comparison table");
const zividLocator = l("Compare Zivid 3D cameras 参数矩阵", "Compare Zivid 3D cameras parameter matrix");
const zividRow = (zh: string, en: string, value: string, conditions?: Localized) => (
  simpleRow(ZIVID_COMPARE, zividSource, zividLocator, zh, en, value, value, conditions)
);
const zividFocusCondition = l("该数值仅对应官方对比页所示焦点距离，不代表整个工作体积。", "The figure applies at the focus distance shown in the official comparison page, not across the whole working volume.");

const zividRows = (spec: ZividCameraSpec): SpecRow[] => [
  zividRow("型号", "Model", spec.product),
  zividRow("官方列举的主要应用", "Published key applications", spec.applications),
  zividRow("推荐安装方式", "Suitable mounting", spec.mounting),
  zividRow("焦点距离", "Focus distance", spec.focusDistance),
  zividRow("最佳工作距离", "Optimal working distance", spec.optimalDistance),
  zividRow("推荐工作距离", "Recommended working distance", spec.recommendedDistance),
  zividRow("焦点距离处视场", "Field of view at focus distance", spec.fovAtFocus, zividFocusCondition),
  zividRow("焦点距离处空间分辨率", "Spatial resolution at focus distance", spec.spatialResolution, zividFocusCondition),
  zividRow("点精度", "Point precision", spec.pointPrecision, zividFocusCondition),
  zividRow("焦点距离处真值度", "Trueness at focus distance", spec.trueness, zividFocusCondition),
  zividRow("典型采集时间", "Typical capture time", spec.captureTime, l("从采集初始化到点云可复制，包含处理；实际采集时间可能更短。", "From capture initialization until the point cloud is ready to copy, including processing; acquisition itself may be shorter.")),
  zividRow("外形尺寸", "Dimensions", spec.dimensions),
  zividRow("质量", "Weight", spec.weight),
  zividRow("三维成像技术", "3D imaging technology", "Structured light 3D"),
  zividRow("三维 HDR 动态范围", "3D HDR dynamic range", "60–128 dB"),
  zividRow("防护等级", "Ingress protection", "IP65"),
  zividRow("工作温度", "Operating temperature", "0°C–45°C"),
  zividRow("对比页冲击标注", "Comparison-page shock label", "5 G"),
  zividRow("对比页振动标注", "Comparison-page vibration label", "15 G", l("厂商其他 R-series 页面采用不同的冲击/加速度表述，采购前必须以该型号最新数据表确认。", "Other manufacturer R-series pages use different shock/acceleration wording; confirm against the latest model-specific datasheet before procurement.")),
];

const zividSeeds: ProductSeed[] = zividSpecs.map((spec) => ({
  id: spec.id,
  companySlug: "zivid",
  product: spec.product,
  pageUrl: spec.pageUrl,
  category: "perception",
  primary: "sensing",
  subclass: "vision-sensor",
  useCases: ["manufacturing", "logistics", "research", "integration"],
  type: l("工业彩色结构光三维相机", "Industrial color structured-light 3D camera"),
  integration: l("通过 Zivid SDK、Zivid Studio、手眼标定和机器人/视觉软件接口接入；安装方式、工作距离、曝光、网络、计算机和坐标标定必须按型号配置。", "Integrates through Zivid SDK, Zivid Studio, hand-eye calibration, and robot/vision software interfaces. Mounting, working distance, exposure, network, host computer, and coordinate calibration must be configured per model."),
  verification: l("使用真实工件和背景在完整工作体积内验证点云完整率、误差、反光/透明表现、遮挡、采集到路径总节拍和连续温升；焦点处参数不得直接外推。", "Use real workpieces and backgrounds to validate point-cloud completeness, error, reflective/transparent behavior, occlusion, capture-to-path cycle time, and continuous thermal behavior across the full volume. Focus-plane figures must not be generalized."),
  rows: zividRows(spec),
  overview: [
    l(`${spec.product} 是官方当前相机选择器中的具名型号。本记录逐项索引工作距离、焦点处视场与分辨率、点精度、真值度、采集时间、尺寸、质量和环境字段。`, `${spec.product} is a named model in the current official camera selector. This record indexes working range, focus-plane FOV and resolution, point precision, trueness, capture time, dimensions, mass, and environmental fields.`),
    l("选择器只提供跨型号核心比较，不包含每份数据表的全部接口、电气、波长、光源、曝光、合规和配件字段，因此记录保持官方部分覆盖。", "The selector provides core cross-model comparison rather than every interface, electrical, wavelength, illumination, exposure, compliance, and accessory field from each datasheet, so the record remains official-partial."),
  ],
  applications: [l("料箱拣选、单件分拣、包裹处理和拆码垛", "Bin picking, piece picking, parcel handling, and depalletizing"), l("装配、检测、机器人引导与机床上下料", "Assembly, inspection, robot guidance, and machine tending")],
  coverage: "official-partial",
  sourceLinks: [{ label: l("Zivid 官方相机选择器", "Zivid official camera selector"), url: ZIVID_COMPARE }],
}));

const productSeeds: ProductSeed[] = [...botaSeeds, ...urSeeds, ...realSenseSeeds, ...zividSeeds];

export const getVerifiedWaveSevenProductRecords = (
  locale: Locale,
  companies: CompanyProfile[],
): FinderExpansionRecord[] => {
  const companyBySlug = new Map(companies.map((company) => [company.slug, company]));
  return productSeeds.map((seed) => {
    const company = companyBySlug.get(seed.companySlug);
    if (!company) throw new Error(`Wave-seven product company is missing: ${seed.companySlug}`);
    return toRecord(locale, company, seed);
  });
};

export const waveSevenCatalogProductCount = productSeeds.length;
