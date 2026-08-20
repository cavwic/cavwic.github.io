export type LandscapeLocale = "zh" | "en";
export type LandscapeIndustryId = "dexterous-hands" | "robotics";

export type LocalizedText = { zh: string; en: string };
export type LandscapeSource = { label: LocalizedText; url: string };
export type LandscapeCompany = {
  id: string;
  name: LocalizedText;
  englishName?: string;
  role: LocalizedText;
  positioning: LocalizedText;
  strengths: LocalizedText;
  products: LocalizedText;
  fit: LocalizedText;
  verify: LocalizedText;
  evidence: LocalizedText[];
  sources: LandscapeSource[];
  reviewedAt: string;
};
export type LandscapeChapter = {
  id: string;
  index: string;
  eyebrow: string;
  title: LocalizedText;
  description: LocalizedText;
  chain: LocalizedText[];
  companyIds: string[];
};
export type IndustryLandscape = {
  id: LandscapeIndustryId;
  label: LocalizedText;
  title: LocalizedText;
  intro: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
  imageNote: LocalizedText;
  chapters: LandscapeChapter[];
};

export const pickText = (value: LocalizedText, locale: LandscapeLocale) => value[locale];
const l = (zh: string, en: string): LocalizedText => ({ zh, en });
const s = (zh: string, en: string, url: string): LandscapeSource => ({ label: l(zh, en), url });
const evidence = [l("官方产品资料", "Official product material"), l("公开产品路径", "Public product path"), l("目标工况待验证", "Target duty cycle unverified")];
const company = (entry: Omit<LandscapeCompany, "evidence" | "reviewedAt">): LandscapeCompany => ({ ...entry, evidence, reviewedAt: "2026-08-20" });

export const landscapeCompanies: Record<string, LandscapeCompany> = {
  linkerbot: company({
    id: "linkerbot", name: l("灵心巧手", "LinkerBot"), englishName: "LinkerBot",
    role: l("多路线灵巧手与遥操作数据平台厂商", "Dexterous-hand and teleoperation-data platform vendor"),
    positioning: l("公开产品从六自由度入门型号延伸到腱绳、直驱和高自由度灵巧手，并配套遥操作采集与技能数据产品，跨越整手和开发数据层。", "Its public range spans six-DOF entry models, tendon-driven, direct-drive, and higher-DOF hands, plus teleoperation and skill-data products across the complete-hand and development-data layers."),
    strengths: l("型号跨度、机构路线、开发支持和数据采集入口。", "A broad model range, multiple mechanisms, development support, and data-collection entry points."),
    products: l("O6、L6、L20、L30、R30，Open TeleDex、SkillStore 与 Genesis。", "O6, L6, L20, L30, R30, Open TeleDex, SkillStore, and Genesis."),
    fit: l("科研平台、遥操作采集、跨型号选型和高自由度操作开发。", "Research platforms, teleoperation collection, cross-model selection, and high-DOF manipulation development."),
    verify: l("驱动自由度、触觉覆盖、控制频率、连续温升、负载口径和维护耗材。", "Actuated DOF, tactile coverage, control rate, continuous heat, payload definition, and consumables."),
    sources: [s("灵心巧手产品页", "LinkerBot products", "https://www.linkerhand.com/"), s("灵心巧手公司与平台", "LinkerBot platforms", "https://linkerbot.cn/about/")],
  }),
  inspire: company({
    id: "inspire", name: l("因时机器人", "Inspire Robots"), englishName: "Inspire Robots",
    role: l("微型伺服执行器向五指灵巧手延伸的厂商", "Micro-servo actuator vendor extending into five-finger hands"),
    positioning: l("公开资料把微型伺服电缸与五指灵巧手放在同一产品体系中，适合观察手指驱动器到完整末端的集成路径。", "Public material places micro servo cylinders and five-finger hands in one portfolio, exposing the path from finger actuators to complete end effectors."),
    strengths: l("小型执行器积累、灵巧手产品化，以及安装、通信和控制资料。", "Compact actuators, productized hands, and installation, communication, and control material."),
    products: l("微型伺服电缸、RH56 系列五指灵巧手与触觉配置。", "Micro servo cylinders and RH56-series five-finger hands with tactile options."),
    fit: l("空间受限的多指末端、服务机器人、人机交互和快速样机。", "Space-constrained multi-finger tools, service robots, human interaction, and rapid prototypes."),
    verify: l("电缸寿命与温升、手指输出口径、控制刷新率、过载保护和备件。", "Actuator life and heat, finger-output definitions, refresh rate, overload protection, and spares."),
    sources: [s("因时机器人产品选型手册", "Inspire Robots selection guide", "https://www.inspire-robots.com/d/file/p/2023/11-13/%E5%9B%A0%E6%97%B6%E6%9C%BA%E5%99%A8%E4%BA%BA%E4%BA%A7%E5%93%81%E9%80%89%E5%9E%8B%E6%89%8B%E5%86%8C%20.pdf")],
  }),
  paxini: company({
    id: "paxini", name: l("帕西尼", "PaXini"), englishName: "PaXini",
    role: l("多维触觉、触觉灵巧手与具身数据跨层厂商", "Vendor spanning multidimensional tactile sensing, tactile hands, and embodied data"),
    positioning: l("公开产品覆盖触觉单元、灵巧手、全身力学套件和数据采集，跨越感知、末端与训练数据三层。", "Its public portfolio spans tactile units, dexterous hands, whole-body force kits, and data collection across sensing, end-effector, and training-data layers."),
    strengths: l("多维触觉、较大面积覆盖，以及从传感器到灵巧手和数据采集的一体化路径。", "Multidimensional tactile sensing, broad coverage, and an integrated sensor-to-hand-to-data path."),
    products: l("ITPU 触觉传感器、DEX/AX 灵巧手、全身力学套件和采集产品。", "ITPU tactile sensors, DEX/AX hands, whole-body force kits, and collection products."),
    fit: l("接触丰富的抓取、遥操作数据采集和触觉闭环研究。", "Contact-rich grasping, teleoperation data collection, and tactile closed-loop research."),
    verify: l("量程、漂移、标定、同步、耐磨和对象集成功率。", "Range, drift, calibration, synchronization, wear, and object-set success rate."),
    sources: [s("帕西尼 GEN3 产品页", "PaXini GEN3 product page", "https://paxini.com/cn/dex/gen3")],
  }),
  dhrobotics: company({
    id: "dhrobotics", name: l("大寰机器人", "DH Robotics"), englishName: "DH Robotics",
    role: l("工业末端执行器与灵巧手组合供应商", "Industrial end-effector and dexterous-hand supplier"),
    positioning: l("产品覆盖平行夹爪、自适应夹爪、旋转执行器和五指灵巧手，适合判断任务是否真的需要灵巧手。", "Its range covers parallel and adaptive grippers, rotary actuators, and five-finger hands, helping test whether a task truly needs a dexterous hand."),
    strengths: l("完整的工业末端矩阵，可把灵巧手与更简单夹爪放进同一选型框架。", "A broad industrial end-effector matrix for comparing dexterous hands with simpler grippers."),
    products: l("电动夹爪、自适应夹爪、旋转执行器和五指灵巧手。", "Electric and adaptive grippers, rotary actuators, and five-finger hands."),
    fit: l("工业抓取、装配、节拍明确的自动化和末端复杂度比较。", "Industrial gripping, assembly, cycle-time-defined automation, and end-effector complexity studies."),
    verify: l("对象覆盖、节拍、寿命、接口、安装，以及灵巧手相对夹爪的必要性。", "Object coverage, cycle time, life, interfaces, mounting, and necessity versus a gripper."),
    sources: [s("大寰电动夹爪", "DH electric grippers", "https://www.dh-robotics.com/products/electric-grippers"), s("大寰产品目录", "DH Robotics catalogue", "https://www.dh-robotics.com/wp-content/uploads/2024/07/DH_%E7%94%B5%E7%88%AA%E9%80%89%E5%9E%8B%E6%89%8B%E5%86%8C_CN2508_%E7%94%B5%E5%AD%90%E7%89%88.pdf")],
  }),
  shadow: company({
    id: "shadow", name: l("Shadow Robot", "Shadow Robot"),
    role: l("面向机器人学习与遥操作研究的高自由度灵巧手厂商", "High-DOF hand vendor for robot learning and teleoperation research"),
    positioning: l("公开产品强调腱绳驱动、高自由度、触觉、ROS 与长期实验，主要价值是研究可编程性而非直接替代工业夹爪。", "Public products emphasize tendon actuation, high DOF, tactile sensing, ROS, and long-running research, with value in programmability rather than direct gripper replacement."),
    strengths: l("拟人化机构、机器人学习生态、遥操作和触觉集成。", "Anthropomorphic mechanisms, robot-learning ecosystem, teleoperation, and tactile integration."),
    products: l("Dexterous Hand、Lite 系列与 DEX-EE。", "Dexterous Hand, Lite series, and DEX-EE."),
    fit: l("机器人学习、遥操作、精细操作研究和 ROS 实验室。", "Robot learning, teleoperation, dexterous research, and ROS laboratories."),
    verify: l("采购维护周期、腱绳耗材、标定恢复、对象集成功率和连续实验条件。", "Procurement and service lead time, tendon consumables, calibration recovery, object-set success, and long-run conditions."),
    sources: [s("Shadow 灵巧手系列", "Shadow hand series", "https://shadowrobot.com/dexterous-hand-series/"), s("Shadow DEX-EE", "Shadow DEX-EE", "https://shadowrobot.com/dex-ee_series/")],
  }),
  kunwei: company({
    id: "kunwei", name: l("坤维科技", "Kunwei Technology"), englishName: "Kunwei Technology",
    role: l("六维力与关节力矩传感器厂商", "Six-axis force and joint-torque sensor vendor"),
    positioning: l("公开产品覆盖六维力、拉压力、扭矩和关节力矩传感器，补足指尖触觉之外的腕部与关节测量链。", "Its public range covers six-axis force, tension/compression, torque, and joint-torque sensors, extending measurement beyond fingertip tactile sensing."),
    strengths: l("多类力学传感器、测力平台和力控应用。", "Multiple force-sensor categories, measurement platforms, and force-control applications."),
    products: l("六维力、拉压力、扭矩与关节扭矩传感器。", "Six-axis force, tension/compression, torque, and joint-torque sensors."),
    fit: l("腕部力控、关节反馈、装配测试、标定与验收测量。", "Wrist force control, joint feedback, assembly tests, calibration, and acceptance measurement."),
    verify: l("量程、过载、轴间耦合、温漂、采样链和安装刚度。", "Range, overload, cross-axis coupling, thermal drift, sampling chain, and mounting stiffness."),
    sources: [s("坤维产品中心", "Kunwei products", "https://www.kunweitech.com/products/")],
  }),
  xela: company({
    id: "xela", name: l("XELA Robotics", "XELA Robotics"),
    role: l("模块化三轴触觉皮肤厂商", "Modular three-axis tactile-skin vendor"),
    positioning: l("uSkin 面向夹爪、机器人手和曲面布置，主要价值是模块化覆盖与分布式接触数据。", "uSkin targets grippers, robot hands, and curved surfaces, with value in modular coverage and distributed contact data."),
    strengths: l("模块化触觉阵列、曲面布置和机器人手产品形态。", "Modular tactile arrays, curved-surface placement, and robot-hand form factors."),
    products: l("uSkin uSCu、uSPa 和定制触觉模块。", "uSkin uSCu, uSPa, and customized tactile modules."),
    fit: l("指腹掌面触觉、夹持识别、遥操作和抓取数据记录。", "Finger/palm sensing, grasp-state recognition, teleoperation, and manipulation logging."),
    verify: l("覆盖曲率、布线、封装耐久、同步、标定和控制延迟。", "Surface curvature, wiring, package durability, synchronization, calibration, and latency."),
    sources: [s("XELA uSkin 产品", "XELA uSkin products", "https://xelarobotics.com/products/")],
  }),
  gelsight: company({
    id: "gelsight", name: l("GelSight", "GelSight"),
    role: l("基于成像的高分辨率触觉与表面测量厂商", "Vision-based high-resolution tactile and surface-measurement vendor"),
    positioning: l("产品把机器人触觉与表面计量并列，擅长细微接触形变和表面特征获取，工程封装与速度需另行评估。", "Its products place robotic tactile sensing beside surface metrology, capturing fine deformation and texture while packaging and speed need separate evaluation."),
    strengths: l("高分辨率接触图像、表面形貌和触觉研究。", "High-resolution contact imagery, surface geometry, and tactile research."),
    products: l("GelSight Mini 等机器人触觉和计量产品。", "GelSight Mini and related robotic tactile and metrology products."),
    fit: l("表面识别、滑移研究、装配质量判断和材料实验。", "Surface recognition, slip research, assembly-quality assessment, and material experiments."),
    verify: l("帧率、光学表面寿命、污染、重标定、接触面积和闭环延迟。", "Frame rate, optical-surface life, contamination, recalibration, contact area, and loop latency."),
    sources: [s("GelSight 产品页", "GelSight products", "https://www.gelsight.com/products/")],
  }),
  maxon: company({
    id: "maxon", name: l("maxon", "maxon"),
    role: l("高性能电机、无框电机与机器人驱动组件厂商", "High-performance motor, frameless-motor, and robotic-drive supplier"),
    positioning: l("机器人产品覆盖电机、齿轮箱、编码器、控制器、无框电机和关节模组，支持从单部件到驱动系统逐级选型。", "Its robotics portfolio covers motors, gearheads, encoders, controllers, frameless motors, and joint modules from component to drive system."),
    strengths: l("高功率密度电机、完整驱动组合和机器人应用资料。", "High-power-density motors, complete drive combinations, and robotics material."),
    products: l("无框力矩电机、直流/无刷电机、齿轮箱、编码器、控制器和关节模组。", "Frameless torque motors, brushed/brushless motors, gearheads, encoders, controllers, and joint modules."),
    fit: l("紧凑关节、手指驱动、移动机器人和效率体积受限系统。", "Compact joints, finger actuation, mobile robots, and size/efficiency constrained systems."),
    verify: l("工作点效率、连续工况、热路径、齿轮寿命、控制兼容和供货周期。", "Operating-point efficiency, continuous duty, thermal path, gear life, control compatibility, and lead time."),
    sources: [s("maxon 机器人解决方案", "maxon robotics solutions", "https://www.maxongroup.com/en-us/market-solutions/mobility-solutions/robotics")],
  }),
  faulhaber: company({
    id: "faulhaber", name: l("FAULHABER", "FAULHABER"),
    role: l("微型精密驱动系统厂商", "Miniature precision-drive system vendor"),
    positioning: l("机器人关节资料覆盖微型电机、齿轮、编码和控制组合，价值在紧凑精密而不是单看峰值扭矩。", "Robot-joint material covers miniature motors, gearing, encoders, and controls, with value in compact precision rather than peak torque alone."),
    strengths: l("微型电机、精密齿轮与编码控制组合。", "Miniature motors, precision gearing, and encoder/control combinations."),
    products: l("微电机、无刷电机、齿轮箱、编码器和运动控制器。", "Micromotors, brushless motors, gearheads, encoders, and motion controllers."),
    fit: l("手指、腕部、医疗和实验设备中的紧凑驱动。", "Compact actuation in fingers, wrists, medical devices, and lab equipment."),
    verify: l("负载谱、温升、齿隙、噪声、寿命、接口和定制成本。", "Load spectrum, heat, backlash, noise, life, interfaces, and customization cost."),
    sources: [s("FAULHABER 机器人关节手册", "FAULHABER robot-joint brochure", "https://cdn.faulhaber.com/media/DAM/Documents/brochure/faulhaber-brochure-market-solution-robotic-joints-en.pdf")],
  }),
  leaderdrive: company({
    id: "leaderdrive", name: l("绿的谐波", "Leaderdrive"), englishName: "Leaderdrive",
    role: l("精密谐波传动向机器人关节延伸的核心部件厂商", "Precision harmonic-drive supplier extending into robot joints"),
    positioning: l("产品从谐波减速器延伸到人形关节、旋转执行器和伺服系统，可同时观察部件与机电一体化路径。", "Its range extends from harmonic reducers to humanoid joints, rotary actuators, and servo systems across component and integrated paths."),
    strengths: l("谐波减速器及其向旋转执行器和关节的集成。", "Harmonic reducers and integration into rotary actuators and joints."),
    products: l("谐波减速器、人形机器人关节、旋转执行器和伺服系统。", "Harmonic reducers, humanoid joints, rotary actuators, and servo systems."),
    fit: l("机器人腕、臂和本体旋转关节；微型手指关节需按结构判断。", "Rotary joints in wrists, arms, and bodies; miniature finger use depends on mechanism."),
    verify: l("额定峰值扭矩、刚度、回差、寿命，以及轴承、电机和驱动责任边界。", "Rated/peak torque, stiffness, backlash, life, and responsibility boundaries."),
    sources: [s("绿的谐波官网", "Leaderdrive website", "https://www.leaderdrive.cn/")],
  }),
  harmonicdrive: company({
    id: "harmonicdrive", name: l("Harmonic Drive", "Harmonic Drive"),
    role: l("谐波齿轮与集成旋转执行器厂商", "Harmonic gearing and integrated rotary-actuator vendor"),
    positioning: l("产品包含部件套装、齿轮单元、集成执行器、微型产品和直驱电机，可比较不同集成深度。", "Products include component sets, gear units, integrated actuators, miniature products, and direct-drive motors across integration depths."),
    strengths: l("精密减速、尺寸谱和集成执行器。", "Precision reduction, a broad size range, and integrated actuators."),
    products: l("谐波齿轮部件、齿轮单元、旋转执行器和微型产品。", "Harmonic components, gear units, rotary actuators, and miniature products."),
    fit: l("高定位精度机器人关节、紧凑执行器和精密自动化。", "High-accuracy robot joints, compact actuators, and precision automation."),
    verify: l("负载谱、扭转刚度、回差口径、润滑、轴承、寿命与冲击。", "Load spectrum, torsional stiffness, backlash definition, lubrication, bearings, life, and shock."),
    sources: [s("Harmonic Drive 产品", "Harmonic Drive products", "https://www.harmonicdrive.net/")],
  }),
  kinco: company({
    id: "kinco", name: l("步科", "Kinco"), englishName: "Kinco",
    role: l("无框电机、驱动与机器人关节方案厂商", "Frameless-motor, drive, and robot-joint solution vendor"),
    positioning: l("公开资料覆盖无框力矩电机、中空驱动器和关节方案，重点是电机、驱动、通信与关节集成。", "Public material covers frameless torque motors, hollow-shaft drives, and joint solutions across motor, drive, communications, and integration."),
    strengths: l("无框电机、驱动器和关节电控组合。", "Frameless motors, drives, and joint electrical integration."),
    products: l("FMK 无框力矩电机、RD 中空驱动器和机器人关节方案。", "FMK frameless torque motors, RD hollow-shaft drives, and robot-joint solutions."),
    fit: l("人形与协作机器人关节、国产电控和总线集成样机。", "Humanoid/cobot joints and prototypes needing domestic controls and fieldbus integration."),
    verify: l("控制频率、编码器、力矩估算、功能安全、散热和减速器匹配。", "Control rate, encoders, torque estimation, functional safety, cooling, and reducer matching."),
    sources: [s("步科机器人关节方案", "Kinco robot-joint solution", "https://automation.kinco.cn/solution/biped/articulated-joint")],
  }),
  changxing: company({
    id: "changxing", name: l("长兴动力", "Changxing Power"), englishName: "Changxing Power",
    role: l("力控执行器与机器人本体跨层厂商", "Vendor spanning force-controlled actuators and robot platforms"),
    positioning: l("官网公开力控直线、旋转执行器和机器人产品，并说明无框电机、驱动与控制的集成路径。", "Its public site lists force-controlled linear and rotary actuators and robot products, with integrated frameless motors, drives, and control."),
    strengths: l("力控线性与旋转执行器和模组化集成。", "Force-controlled linear and rotary actuators with modular integration."),
    products: l("力控直线执行器、旋转执行器、机械臂和机器人。", "Force-controlled linear/rotary actuators, manipulators, and robots."),
    fit: l("人形关节比较、力控样机和希望缩短集成周期的本体开发。", "Humanoid joint studies, force-control prototypes, and faster body integration."),
    verify: l("第三方测试、协议、控制周期、散热降额，以及质量体积扭矩口径。", "Independent tests, protocols, control cycle, thermal derating, and consistent mass/volume/torque definitions."),
    sources: [s("长兴动力官网", "Changxing Power website", "https://www.cxdlrobotics.com/")],
  }),
  unitree: company({
    id: "unitree", name: l("宇树科技", "Unitree Robotics"), englishName: "Unitree Robotics",
    role: l("人形与四足机器人本体及开发生态厂商", "Humanoid and quadruped platform and developer-ecosystem vendor"),
    positioning: l("产品形成从四足到多档人形平台的组合并提供开放资源，适合观察标准化本体、成本与开发开放度的取舍。", "Its lineup spans quadrupeds and several humanoid tiers with open resources, exposing tradeoffs among standardized bodies, cost, and developer access."),
    strengths: l("本体产品谱、运动控制、开发版和开放资源。", "Body portfolio, locomotion control, education variants, and open resources."),
    products: l("G1、H1/H2、R1 系列和四足机器人。", "G1, H1/H2, R1 series, and quadrupeds."),
    fit: l("科研开发、运动控制、具身算法验证和标准本体项目。", "Research, locomotion control, embodied-algorithm validation, and standardized-body projects."),
    verify: l("版本接口、安全能力、维护、连续运行、载荷和任务二次开发。", "Version interfaces, safety, service, continuous operation, payload, and task-specific development."),
    sources: [s("宇树 G1", "Unitree G1", "https://www.unitree.com/cn/g1/"), s("宇树开放资源", "Unitree open source", "https://www.unitree.com/opensource/")],
  }),
  booster: company({
    id: "booster", name: l("加速进化", "Booster Robotics"), englishName: "Booster Robotics",
    role: l("面向开发、教育与赛事的人形机器人平台厂商", "Humanoid platform vendor for development, education, and competition"),
    positioning: l("公开产品覆盖不同尺寸与定位的人形平台，并提供开发文档、开放资源和训练生态。", "Its public range covers humanoids at different sizes and positions, backed by developer documentation, open resources, and training tools."),
    strengths: l("开发资料、开放生态和从运动控制到训练的工具链。", "Developer documentation, an open ecosystem, and locomotion-to-training tooling."),
    products: l("K1、T1、T2 人形平台和 Booster Gym 等资源。", "K1, T1, and T2 humanoids plus Booster Gym and related resources."),
    fit: l("高校科研、赛事、算法教学和需要清晰开发入口的项目。", "Academic research, competitions, algorithm education, and projects needing a clear developer entry point."),
    verify: l("产品版本、接口、载荷、续航、安全、备件和从演示到任务的差距。", "Product version, interfaces, payload, endurance, safety, spares, and the demo-to-task gap."),
    sources: [s("加速进化产品", "Booster products", "https://www.booster.tech/zh/"), s("加速进化开发文档", "Booster developer docs", "https://doc-dev.booster.tech/")],
  }),
  galbot: company({
    id: "galbot", name: l("银河通用", "Galbot"), englishName: "Galbot",
    role: l("面向真实任务闭环的轮式具身机器人厂商", "Wheeled embodied-robot vendor oriented toward real task loops"),
    positioning: l("公开资料把本体、开发平台和零售等场景放在一起，重点是感知、操作与业务流程闭环，而不只是本体运动。", "Public material connects bodies, a developer platform, and scenarios such as retail, emphasizing perception-manipulation-workflow loops rather than motion alone."),
    strengths: l("轮式移动操作、本体与开发平台结合和场景任务闭环。", "Wheeled mobile manipulation, body-plus-platform integration, and scenario task loops."),
    products: l("G1、S1 和开发平台。", "G1, S1, and a developer platform."),
    fit: l("零售、仓储和结构化室内服务场景的 POC。", "POCs in retail, warehousing, and structured indoor service environments."),
    verify: l("任务成功率、异常处理、地图网络、人工接管、连续运行和交付边界。", "Task success, exception handling, mapping/network, human takeover, continuous operation, and delivery boundaries."),
    sources: [s("银河通用官网", "Galbot website", "https://www.galbot.com/"), s("G1 开发文档", "G1 developer guide", "https://developer.galbot.com/docs/g1/2.2.4/zh/g1")],
  }),
  noetix: company({
    id: "noetix", name: l("松延动力", "Noetix Robotics"), englishName: "Noetix Robotics",
    role: l("覆盖小型与人形产品的机器人本体厂商", "Robot-body vendor spanning compact and humanoid products"),
    positioning: l("公开产品包括 Bumi、N2、E1 等不同形态，需先按科研、展示、交互和任务执行区分定位。", "Its public products include Bumi, N2, and E1 in different forms and should first be separated by research, display, interaction, and task-execution roles."),
    strengths: l("多形态本体产品和快速产品迭代。", "Multiple body forms and rapid product iteration."),
    products: l("Bumi、N2、E1 等机器人平台。", "Bumi, N2, E1, and related platforms."),
    fit: l("教育、科研、展示交互和轻量任务前期验证。", "Education, research, display interaction, and early lightweight-task validation."),
    verify: l("版本定位、开放接口、连续运行、维修、负载和现场安全。", "Version positioning, open interfaces, continuous operation, service, payload, and site safety."),
    sources: [s("松延动力官网", "Noetix Robotics website", "https://noetixrobotics.com/")],
  }),
  ubtech: company({
    id: "ubtech", name: l("优必选", "UBTECH Robotics"), englishName: "UBTECH Robotics",
    role: l("人形机器人本体与行业应用方案厂商", "Humanoid body and industry-application solution vendor"),
    positioning: l("公开产品从 Walker 人形平台延伸到工业和商用服务方案，适合观察本体如何被包装为现场系统。", "Its public range extends Walker humanoids into industrial and commercial-service solutions, showing how a body becomes a site system."),
    strengths: l("全尺寸人形本体、交互能力和行业场景方案。", "Full-size humanoid bodies, interaction capabilities, and industry scenario solutions."),
    products: l("Walker S 系列、Walker C 等人形机器人。", "Walker S series, Walker C, and related humanoids."),
    fit: l("工业协同、商用服务和需要厂商级集成支持的验证。", "Industrial collaboration, commercial service, and validation needing vendor-level integration."),
    verify: l("交付版本、工位改造、安全、节拍、人员配合、运维和可复制范围。", "Delivered version, workcell changes, safety, cycle time, human coordination, operations, and repeatability."),
    sources: [s("优必选官网", "UBTECH website", "https://www.ubtrobot.com/cn"), s("Walker C 产品页", "Walker C product page", "https://www.ubtrobot.com/cn/humanoid/products/walker-c")],
  }),
  agibot: company({
    id: "agibot", name: l("智元机器人", "AgiBot"), englishName: "AgiBot",
    role: l("具身机器人本体、开发工具与数据生态厂商", "Embodied-robot body, development-tool, and data-ecosystem vendor"),
    positioning: l("公开产品覆盖科研、工业和商用服务系列，并提供 AimDK 与 AGIBOT World，跨越本体、软件与数据层。", "Its public range spans research, industrial, and service series, with AimDK and AGIBOT World crossing body, software, and data layers."),
    strengths: l("产品系列化、本体开发工具和公开数据生态。", "Product series, body-development tooling, and a public data ecosystem."),
    products: l("A2 等机器人系列、AimDK 和 AGIBOT World。", "A2 and other robot series, AimDK, and AGIBOT World."),
    fit: l("科研、数据驱动具身学习、工业与服务场景的分级验证。", "Research, data-driven embodied learning, and staged validation in industrial/service scenarios."),
    verify: l("各系列开放度、数据许可、模型本体兼容、交付证据、维护和版本迭代。", "Openness by series, data licensing, model-body compatibility, delivery evidence, service, and versions."),
    sources: [s("智元机器人官网", "AgiBot website", "https://www.agibot.com.cn/index.html"), s("AimDK 文档", "AimDK documentation", "https://open.agibot.com/docs/aimdk")],
  }),
  fourier: company({
    id: "fourier", name: l("傅利叶", "Fourier"), englishName: "Fourier",
    role: l("从康复机器人延伸到通用人形平台的厂商", "Vendor extending from rehabilitation robotics into general humanoid platforms"),
    positioning: l("产品从康复机器人积累延伸到 GR 系列与开放平台，形成医疗康复、科研和通用人形的交叉路径。", "Its portfolio extends rehabilitation-robotics experience into GR humanoids and open platforms across healthcare, research, and general robotics."),
    strengths: l("康复机器人场景积累、FSA 执行器和人形本体开发。", "Rehabilitation-robotics experience, FSA actuators, and humanoid-body development."),
    products: l("GR 系列、N1 开放平台、FSA 执行器和康复机器人。", "GR series, N1 open platform, FSA actuators, and rehabilitation robots."),
    fit: l("人形科研、康养交互、康复技术和执行器到本体一体研究。", "Humanoid research, care interaction, rehabilitation technology, and actuator-to-body studies."),
    verify: l("版本开放度、医疗与通用边界、任务安全、负载、连续运行和应用验证。", "Version openness, medical/general boundaries, task safety, payload, continuous operation, and validation."),
    sources: [s("傅利叶 GR-1", "Fourier GR-1", "https://www.fftai.cn/products-gr1"), s("Fourier 开发文档", "Fourier documentation", "https://support.fftai.com/en/getting-started/general-information")],
  }),
  nvidia: company({
    id: "nvidia", name: l("NVIDIA", "NVIDIA"),
    role: l("机器人仿真、基础模型、中间件与边缘算力平台厂商", "Robotics simulation, foundation-model, middleware, and edge-compute platform vendor"),
    positioning: l("Isaac GR00T 连接数据、仿真、模型、Isaac ROS 与 Jetson Thor，覆盖训练到在机部署，但不是完整机器人交付方案。", "Isaac GR00T links data, simulation, models, Isaac ROS, and Jetson Thor from training to onboard deployment, but is not a complete robot-delivery solution."),
    strengths: l("仿真到部署工具链、GPU 加速、机器人基础模型和边缘推理。", "Simulation-to-deployment tooling, GPU acceleration, robot foundation models, and edge inference."),
    products: l("Isaac Sim、Isaac Lab、Isaac ROS、Isaac GR00T 和 Jetson Thor。", "Isaac Sim, Isaac Lab, Isaac ROS, Isaac GR00T, and Jetson Thor."),
    fit: l("策略训练、合成数据、仿真验证、多传感处理和机器人端推理。", "Policy training, synthetic data, simulation validation, multisensor processing, and onboard inference."),
    verify: l("支持本体传感器、算力功耗、实时链路、软件版本、安全和迁移成本。", "Supported bodies/sensors, compute/power, real-time path, software versions, safety, and migration cost."),
    sources: [s("NVIDIA Isaac GR00T", "NVIDIA Isaac GR00T", "https://developer.nvidia.com/isaac/gr00t"), s("Jetson Thor", "Jetson Thor", "https://www.nvidia.com/en-eu/autonomous-machines/embedded-systems/jetson-thor/")],
  }),
  deepmind: company({
    id: "deepmind", name: l("Google DeepMind", "Google DeepMind"),
    role: l("具身推理与视觉语言动作模型研发方", "Embodied-reasoning and vision-language-action model developer"),
    positioning: l("Gemini Robotics 把具身推理与动作模型区分开，代表通用模型进入空间理解、任务规划和机器人控制的路径。", "Gemini Robotics separates embodied reasoning and action models, representing a path into spatial understanding, planning, and robot control."),
    strengths: l("多模态空间推理、长任务规划、跨本体迁移和 VLA 研究。", "Multimodal spatial reasoning, longer-horizon planning, cross-embodiment transfer, and VLA research."),
    products: l("Gemini Robotics 与 Gemini Robotics-ER 系列。", "Gemini Robotics and Gemini Robotics-ER families."),
    fit: l("具身推理研究、复杂任务分解和模型能力边界评估。", "Embodied-reasoning research, complex task decomposition, and capability-boundary assessment."),
    verify: l("可用范围、支持硬件、接口、延迟、数据政策、安全限制和现场失败。", "Availability, supported hardware, interfaces, latency, data policy, safety limits, and field failures."),
    sources: [s("Gemini Robotics", "Gemini Robotics", "https://deepmind.google/models/gemini-robotics/"), s("Gemini Robotics 模型卡", "Gemini Robotics model cards", "https://deepmind.google/models/model-cards/")],
  }),
  physicalintelligence: company({
    id: "physicalintelligence", name: l("Physical Intelligence", "Physical Intelligence"),
    role: l("跨本体通用机器人策略研发方", "Cross-embodiment generalist robot-policy developer"),
    positioning: l("pi 系列研究强调多机器人、多任务数据和连续动作输出，当前更适合作为模型路线与评测参考，而非即插即用交付产品。", "Pi research emphasizes multi-robot, multitask data and continuous actions. It is better treated as a model/evaluation reference than a plug-and-play delivery product."),
    strengths: l("跨本体训练、VLA 连续动作建模和复杂操作评测。", "Cross-embodiment training, continuous-action VLA modeling, and complex manipulation evaluation."),
    products: l("pi0 等通用机器人策略与公开研究。", "Generalist robot policies such as pi0 and associated research."),
    fit: l("机器人基础模型研究、数据配方比较和复杂操作任务设计。", "Robot-foundation-model research, data-mixture comparison, and complex-task design."),
    verify: l("模型可获得性、支持本体、后训练数据、推理硬件、失败样本和安全边界。", "Availability, supported embodiments, post-training data, inference hardware, failures, and safety boundaries."),
    sources: [s("pi0 官方研究", "Official pi0 research", "https://www.physicalintelligence.company/blog/pi0")],
  }),
  orbbec: company({
    id: "orbbec", name: l("奥比中光", "Orbbec"), englishName: "Orbbec",
    role: l("机器人 3D 视觉与深度相机厂商", "Robotics 3D-vision and depth-camera vendor"),
    positioning: l("产品覆盖结构光、双目、ToF 和面向运动机器人的工业连接版本，重点是深度硬件与 SDK。", "Its range spans structured light, stereo, ToF, and industrial connectivity for moving robots, centered on depth hardware and SDKs."),
    strengths: l("3D 相机产品谱、机器人接口和多相机同步。", "A broad 3D-camera range, robot-oriented interfaces, and multicamera synchronization."),
    products: l("Gemini 330 系列、Gemini 335Lg 等 3D 相机。", "Gemini 330 series, Gemini 335Lg, and other 3D cameras."),
    fit: l("机械臂近距感知、移动导航、室内外深度和多相机系统。", "Close-range arm perception, mobile navigation, indoor/outdoor depth, and multicamera systems."),
    verify: l("目标距离精度、强光反光物、运动模糊、同步、接口、标定和 SDK。", "Target-distance accuracy, bright/reflective objects, motion blur, sync, interfaces, calibration, and SDK."),
    sources: [s("奥比中光产品页", "Orbbec products", "https://www.orbbec.com/products/"), s("Gemini 335Lg", "Gemini 335Lg", "https://www.orbbec.com/gemini-335lg/")],
  }),
  livox: company({
    id: "livox", name: l("Livox", "Livox"),
    role: l("移动机器人三维激光雷达厂商", "3D LiDAR vendor for mobile robotics"),
    positioning: l("MID-360 面向低速机器人导航与避障，进入建图和移动感知链，不承担操作端近距视觉。", "MID-360 targets low-speed robot navigation and obstacle avoidance, serving mapping and mobility rather than close-range manipulation vision."),
    strengths: l("紧凑三维雷达、全向视场和移动机器人集成。", "Compact 3D LiDAR, omnidirectional field of view, and mobile-robot integration."),
    products: l("MID-360 等 LiDAR 产品。", "MID-360 and related LiDAR products."),
    fit: l("室内外移动、SLAM、避障和周界感知。", "Indoor/outdoor mobility, SLAM, obstacle avoidance, and perimeter sensing."),
    verify: l("反射率、近距盲区、运动畸变、时间同步、算法和安全冗余。", "Reflectivity, near-field blind zone, motion distortion, time sync, algorithms, and safety redundancy."),
    sources: [s("Livox MID-360", "Livox MID-360", "https://www.livoxtech.com/mid-360")],
  }),
  drobotics: company({
    id: "drobotics", name: l("地瓜机器人", "D-Robotics"), englishName: "D-Robotics",
    role: l("机器人边缘计算与开发套件平台厂商", "Robot edge-compute and developer-kit platform vendor"),
    positioning: l("RDK 把 BPU 算力、接口、操作系统、算法样例和传感器生态组合为机器人开发基础设施。", "RDK combines BPU compute, interfaces, operating systems, algorithm examples, and a sensor ecosystem as robotics infrastructure."),
    strengths: l("机器人开发板、国产边缘算力、开放算法和硬件生态。", "Robot development boards, domestic edge compute, open algorithms, and a hardware ecosystem."),
    products: l("RDK X5、RDK S 系列、相机和扩展配件。", "RDK X5, RDK S series, cameras, and expansion accessories."),
    fit: l("机器人视觉、导航、轻量模型部署和多 I/O 原型。", "Robot vision, navigation, lightweight model deployment, and rich-I/O prototypes."),
    verify: l("算子支持、端到端延迟、实时控制分工、功耗散热、维护和量产供货。", "Operator support, end-to-end latency, real-time partitioning, power/cooling, maintenance, and supply."),
    sources: [s("RDK X5", "RDK X5", "https://en.d-robotics.cc/rdkx5"), s("RDK 硬件生态", "RDK hardware ecosystem", "https://en.d-robotics.cc/accessories")],
  }),
  mechmind: company({
    id: "mechmind", name: l("梅卡曼德", "Mech-Mind Robotics"), englishName: "Mech-Mind Robotics",
    role: l("工业 3D 视觉、机器人软件与场景工作站供应商", "Industrial 3D vision, robot software, and application-station supplier"),
    positioning: l("产品从工业 3D 相机延伸到视觉、编程、深度学习软件和眼脑手工作站，体现部件如何进入可交付工位。", "Its products extend from industrial 3D cameras into vision, programming, deep-learning software, and eye-brain-hand stations, showing how components become deliverable workcells."),
    strengths: l("工业 3D 视觉、图形化应用软件和跨行业案例。", "Industrial 3D vision, graphical application software, and cross-industry cases."),
    products: l("Mech-Eye、Mech-Vision、Mech-Viz、Mech-DLK 和眼脑手工作站。", "Mech-Eye, Mech-Vision, Mech-Viz, Mech-DLK, and eye-brain-hand stations."),
    fit: l("拆码垛、上下料、无序抓取、定位装配和在线检测。", "Depalletizing, machine tending, random picking, localization/assembly, and inline inspection."),
    verify: l("对象样本、节拍、反光透明件、工位改造、异常恢复、安全和维护责任。", "Object samples, cycle time, reflective/transparent items, workcell changes, recovery, safety, and service ownership."),
    sources: [s("梅卡曼德产品", "Mech-Mind products", "https://www.mech-mind.com/videos/product-videos/002.html"), s("梅卡曼德解决方案", "Mech-Mind solutions", "https://www.mech-mind.com/videos/solution-videos/002.html")],
  }),
};

const dexterousHands: IndustryLandscape = {
  id: "dexterous-hands",
  label: l("INDUSTRY MAP / VERIFIED SOURCES", "INDUSTRY MAP / VERIFIED SOURCES"),
  title: l("把灵巧手放回整条产业链", "Put the dexterous hand back into its value chain"),
  intro: l("不按自由度给产品排队，而是沿着接触、驱动、传动、控制和应用逐层看：谁提供完整末端，谁解决关键部件，谁把它接入机器人和真实任务。", "Do not rank hands by degrees of freedom. Follow contact, actuation, transmission, control, and application to see who supplies a complete end effector, who solves a component problem, and who integrates it into a real task."),
  image: "/images/dexterous-hand-exploded.webp",
  imageAlt: l("概念性的灵巧手机构、触觉、驱动、传动和控制部件拆解陈列", "Conceptual arrangement of dexterous-hand mechanisms, tactile parts, drives, transmissions, and control electronics"),
  imageNote: l("概念图用于解释产业链浏览方式，不代表任何厂商的具体产品结构。", "This concept image explains the value-chain browsing model and does not represent any vendor's actual architecture."),
  chapters: [
    { id: "dex-complete-hands", index: "01", eyebrow: "HAND / END EFFECTOR", title: l("整手与末端执行器", "Complete hands and end effectors"), description: l("整手厂商把机构、驱动、传感、控制和接口封装成可安装产品。比较前先判断任务是否需要多指灵巧性，还是夹爪已经足够。", "Complete-hand vendors package mechanism, actuation, sensing, control, and interfaces. First decide whether the task needs multi-finger dexterity or whether a simpler gripper is enough."), chain: [l("对象与任务", "Objects and tasks"), l("机构与自由度", "Mechanism and DOF"), l("接口与安装", "Interfaces and mounting"), l("寿命与维护", "Life and service")], companyIds: ["linkerbot", "inspire", "paxini", "dhrobotics", "shadow"] },
    { id: "dex-touch-force", index: "02", eyebrow: "TOUCH / FORCE", title: l("触觉与力觉", "Tactile and force sensing"), description: l("触觉回答接触位置、压力分布和滑移，腕部与关节力传感回答整体受力。两者不能用同一组参数替代。", "Tactile sensing measures contact location, pressure distribution, and slip; wrist and joint force sensing measure overall load. One cannot substitute for the other."), chain: [l("指尖与掌面", "Fingers and palm"), l("腕部六维力", "Wrist six-axis force"), l("标定与同步", "Calibration and sync"), l("闭环反馈", "Closed-loop feedback")], companyIds: ["paxini", "kunwei", "xela", "gelsight"] },
    { id: "dex-micro-drive", index: "03", eyebrow: "MOTOR / DRIVE", title: l("微型驱动", "Miniature actuation"), description: l("手指驱动受体积、重量和散热约束。峰值输出好看并不等于能在目标节拍下连续工作。", "Finger actuation is constrained by volume, mass, and heat. An attractive peak output does not guarantee continuous operation at the target cycle."), chain: [l("电机或电缸", "Motor or cylinder"), l("编码反馈", "Encoder feedback"), l("驱动控制", "Drive control"), l("温升降额", "Thermal derating")], companyIds: ["inspire", "maxon", "faulhaber", "changxing"] },
    { id: "dex-transmission", index: "04", eyebrow: "REDUCTION / TRANSMISSION", title: l("传动与关节", "Transmission and joints"), description: l("腱绳、连杆、齿轮和减速器各有空间与维护代价。谐波减速器更常见于腕、臂和本体关节，不能默认塞进每个手指。", "Tendons, linkages, gears, and reducers have different space and service costs. Harmonic reducers are more typical in wrists, arms, and body joints and should not be assumed for every finger."), chain: [l("腱绳与连杆", "Tendons and linkages"), l("齿轮与减速", "Gears and reduction"), l("轴承与刚度", "Bearings and stiffness"), l("回差与寿命", "Backlash and life")], companyIds: ["leaderdrive", "harmonicdrive", "kinco", "changxing"] },
    { id: "dex-control-data", index: "05", eyebrow: "CONTROL / DATA", title: l("控制、遥操作与数据", "Control, teleoperation, and data"), description: l("一只手能动只是起点。开发效率取决于控制接口、时间同步、遥操作映射、数据许可和可复现实验流程。", "A moving hand is only the starting point. Development speed depends on control interfaces, timing, teleoperation mapping, data rights, and reproducible experiments."), chain: [l("底层控制", "Low-level control"), l("遥操作映射", "Teleoperation mapping"), l("数据采集", "Data collection"), l("训练与评测", "Training and evaluation")], companyIds: ["linkerbot", "shadow", "paxini", "nvidia"] },
    { id: "dex-integration", index: "06", eyebrow: "INTEGRATION / APPLICATION", title: l("集成与应用", "Integration and application"), description: l("真正的选型发生在对象集、机械臂、视觉、节拍、安全和维护被放进同一个测试计划之后。场景适配需要验证，不是厂商标签。", "Selection becomes real only when the object set, arm, vision, cycle time, safety, and maintenance enter one test plan. Scenario fit must be validated; it is not a vendor label."), chain: [l("对象集", "Object set"), l("臂手眼协同", "Arm-hand-eye coordination"), l("失败恢复", "Failure recovery"), l("验收与维护", "Acceptance and service")], companyIds: ["dhrobotics", "linkerbot", "shadow", "mechmind"] },
  ],
};

const robotics: IndustryLandscape = {
  id: "robotics",
  label: l("INDUSTRY MAP / VERIFIED SOURCES", "INDUSTRY MAP / VERIFIED SOURCES"),
  title: l("一台具身机器人如何成为系统", "How an embodied robot becomes a system"),
  intro: l("本体只是载体。模型、感知、算力、关节、末端和现场流程必须同时成立，演示动作才能变成可验收、可维护的任务系统。", "The body is only a carrier. Models, sensing, compute, joints, end effectors, and site workflows must work together before a demo can become an acceptable and maintainable task system."),
  image: "/images/embodied-robot-exploded.webp",
  imageAlt: l("概念性人形机器人本体、传感器、算力、关节、驱动、灵巧手与电源部件拆解陈列", "Conceptual exploded arrangement of a humanoid body, sensors, compute, joints, drives, dexterous hands, and power components"),
  imageNote: l("概念图用于说明系统分层，不代表任何厂商本体、部件配置或实际产品结构。", "This concept image explains the system layers and does not represent any vendor's body, component configuration, or product architecture."),
  chapters: [
    { id: "robot-bodies", index: "01", eyebrow: "BODY / PLATFORM", title: l("本体与平台", "Bodies and platforms"), description: l("本体决定尺寸、负载、移动方式和开发入口，但产品必须先按科研、教育、展示、服务和任务执行区分。", "The body sets size, payload, mobility, and developer access, but platforms must first be separated by research, education, display, service, and task-execution roles."), chain: [l("形态与尺寸", "Form and size"), l("运动与负载", "Motion and payload"), l("开发开放度", "Developer access"), l("维护与安全", "Service and safety")], companyIds: ["unitree", "booster", "galbot", "noetix", "ubtech", "agibot", "fourier"] },
    { id: "robot-models", index: "02", eyebrow: "MODEL / SOFTWARE", title: l("模型、仿真与数据", "Models, simulation, and data"), description: l("VLA、具身推理、仿真和数据管线解决策略开发，不会自动解决现场接口、实时性和安全责任。", "VLA models, embodied reasoning, simulation, and data pipelines support policy development; they do not automatically solve site interfaces, real-time behavior, or safety ownership."), chain: [l("数据采集", "Data collection"), l("仿真训练", "Simulation training"), l("策略与推理", "Policy and reasoning"), l("部署评测", "Deployment evaluation")], companyIds: ["nvidia", "deepmind", "physicalintelligence", "agibot"] },
    { id: "robot-perception", index: "03", eyebrow: "PERCEPTION / SENSING", title: l("环境与接触感知", "Environment and contact sensing"), description: l("移动导航、近距操作和接触反馈需要不同传感器。相机、雷达、触觉和力传感必须经过标定、同步与故障检测。", "Mobility, close-range manipulation, and contact feedback need different sensors. Cameras, LiDAR, tactile, and force sensing require calibration, synchronization, and fault detection."), chain: [l("RGB-D 与双目", "RGB-D and stereo"), l("三维激光雷达", "3D LiDAR"), l("触觉与力觉", "Tactile and force"), l("融合与标定", "Fusion and calibration")], companyIds: ["orbbec", "livox", "paxini", "kunwei"] },
    { id: "robot-compute-control", index: "04", eyebrow: "COMPUTE / CONTROL", title: l("算力与实时控制", "Compute and real-time control"), description: l("高层推理、视觉处理和关节实时控制周期不同。合理架构会明确每层在哪运行、怎样降级、谁负责监督。", "High-level reasoning, vision, and joint control run at different cycles. A sound architecture states where each layer runs, how it degrades, and what supervises it."), chain: [l("端侧推理", "Onboard inference"), l("运动控制", "Motion control"), l("总线与同步", "Bus and sync"), l("安全与降级", "Safety and fallback")], companyIds: ["nvidia", "drobotics", "kinco", "changxing"] },
    { id: "robot-joints", index: "05", eyebrow: "JOINT / TRANSMISSION", title: l("关节、驱动与传动", "Joints, drives, and transmission"), description: l("关节参数要回到整机负载谱、步态冲击、散热和寿命。单一峰值扭矩无法说明本体能否连续工作。", "Joint figures must return to the full body's load spectrum, gait impact, cooling, and life. Peak torque alone cannot establish continuous operation."), chain: [l("无框电机", "Frameless motors"), l("减速与轴承", "Reduction and bearings"), l("驱动与编码", "Drives and encoders"), l("力控与热", "Force control and heat")], companyIds: ["leaderdrive", "harmonicdrive", "kinco", "maxon", "changxing"] },
    { id: "robot-end-effectors", index: "06", eyebrow: "HAND / TOOL", title: l("末端执行器", "End effectors"), description: l("末端决定机器人是否真能完成对象操作。五指手、夹爪、吸盘和专用工具应按任务覆盖、节拍与维护比较。", "The end effector determines whether the robot can manipulate target objects. Five-finger hands, grippers, suction, and special tools should be compared by task coverage, cycle time, and service."), chain: [l("抓取对象集", "Object set"), l("工具形态", "Tool form"), l("臂手眼协同", "Arm-hand-eye coordination"), l("换型与维护", "Changeover and service")], companyIds: ["linkerbot", "paxini", "inspire", "dhrobotics"] },
    { id: "robot-deployment", index: "07", eyebrow: "SCENE / DELIVERY", title: l("场景系统与交付", "Scenario systems and delivery"), description: l("行业位置最终由可重复交付能力体现：现场条件、业务流程、安全、人工接管、运维和验收缺一不可。", "Value is ultimately demonstrated by repeatable delivery: site conditions, workflow, safety, human takeover, operations, and acceptance all matter."), chain: [l("场景勘察", "Site survey"), l("流程与接口", "Workflow and interfaces"), l("异常与人工接管", "Exceptions and takeover"), l("验收与复制", "Acceptance and replication")], companyIds: ["ubtech", "galbot", "agibot", "fourier", "mechmind"] },
  ],
};

export const industryLandscapes: Record<LandscapeIndustryId, IndustryLandscape> = {
  "dexterous-hands": dexterousHands,
  robotics,
};
