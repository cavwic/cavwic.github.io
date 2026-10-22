import type { CompanyProfile } from "./catalog";
import type { FinderCategory, FinderExpansionRecord, FinderParameter, FinderUseCase } from "./product-finder-demo";
import type { Locale } from "../site";

type Localized = { zh: string; en: string };
type Coverage = "family-complete" | "model-partial" | "pending-review";

type ProductSeed = {
  name: string;
  category: FinderCategory;
  primary: string;
  subclass: string;
  type: Localized;
  summary: Localized;
  integration: Localized;
  verification: Localized;
  useCases: FinderUseCase[];
  officialUrl: string;
  parameters?: Array<{ label: Localized; value?: Localized }>;
};

type CompanySeed = {
  slug: string;
  name: Localized;
  legalName?: Localized;
  countryCode: string;
  country: Localized;
  headquarters?: Localized;
  founded?: string;
  role: Localized;
  summary: Localized;
  businessAreas: Localized[];
  customers: Localized[];
  officialUrl: string;
  scope: Localized;
  coverage: Coverage;
  products: ProductSeed[];
};

const l = (zh: string, en: string): Localized => ({ zh, en });
const p = (
  name: string,
  category: FinderCategory,
  primary: string,
  subclass: string,
  type: Localized,
  summary: Localized,
  integration: Localized,
  verification: Localized,
  useCases: FinderUseCase[],
  officialUrl: string,
  parameters: ProductSeed["parameters"] = [],
): ProductSeed => ({ name, category, primary, subclass, type, summary, integration, verification, useCases, officialUrl, parameters });

const companies: CompanySeed[] = [
  {
    slug: "kepler", name: l("开普勒机器人", "Kepler Robotics"), countryCode: "cn", country: l("中国", "China"), headquarters: l("上海", "Shanghai"), founded: "2023",
    role: l("通用人形机器人厂商", "General-purpose humanoid robot company"),
    summary: l("开普勒围绕先行者系列开发全尺寸人形机器人，公开方向覆盖本体、执行器、运动控制和面向工业任务的具身智能。", "Kepler develops the Forerunner full-size humanoid family across robot hardware, actuators, motion control, and embodied intelligence for industrial tasks."),
    businessAreas: [l("人形机器人本体与执行器", "Humanoid bodies and actuators"), l("工业操作与具身智能", "Industrial manipulation and embodied intelligence")],
    customers: [l("制造、物流与科研验证团队", "Manufacturing, logistics, and research validation teams")], officialUrl: "https://www.gotokepler.com/",
    scope: l("官网公开的先行者系列；型号配置按当前产品资料确认。", "Public Forerunner family; configurations require confirmation against the current product page."), coverage: "model-partial",
    products: [p("Forerunner K2", "robot-platform", "robot-platform", "humanoid-robot", l("全尺寸人形机器人", "Full-size humanoid robot"), l("面向工业操作和任务学习的先行者系列平台。", "A Forerunner platform for industrial manipulation and task learning."), l("本体、灵巧操作、感知和任务软件按交付版本集成。", "Body, dexterous manipulation, perception, and task software vary by delivered edition."), l("核对自由度、负载、续航、接口和实际交付状态。", "Verify DoF, payload, endurance, interfaces, and delivery status."), ["manufacturing", "logistics", "research"], "https://www.gotokepler.com/")],
  },
  {
    slug: "engineai", name: l("众擎机器人", "ENGINEAI"), countryCode: "cn", country: l("中国", "China"), headquarters: l("深圳", "Shenzhen"), founded: "2023",
    role: l("人形机器人与开发平台厂商", "Humanoid robot and development-platform company"),
    summary: l("众擎公开产品覆盖全尺寸人形、轻量人形与开发平台，重点在运动能力、本体工程和面向研究与应用的二次开发。", "ENGINEAI publishes full-size and compact humanoids plus development platforms, with emphasis on locomotion, robot engineering, and secondary development."),
    businessAreas: [l("人形机器人本体", "Humanoid robot hardware"), l("运动控制与开发平台", "Motion control and development platforms")], customers: [l("高校、实验室、开发者与场景合作方", "Universities, laboratories, developers, and deployment partners")], officialUrl: "https://www.engineai.com.cn/",
    scope: l("官网公开的人形机器人型号；演示配置与可采购配置分开核验。", "Officially published humanoid models; demonstration and purchasable configurations are reviewed separately."), coverage: "model-partial",
    products: [p("PM01", "robot-platform", "robot-platform", "humanoid-robot", l("人形机器人开发平台", "Humanoid development platform"), l("面向运动控制、算法研究和二次开发。", "Targets locomotion, algorithm research, and secondary development."), l("本体、控制器和开发接口按版本核对。", "Verify body, controller, and development interfaces by version."), l("核对自由度、质量、速度、续航和开放权限。", "Verify DoF, mass, speed, endurance, and access rights."), ["research", "integration"], "https://www.engineai.com.cn/")],
  },
  {
    slug: "robotera", name: l("星尘智能", "RobotEra"), countryCode: "cn", country: l("中国", "China"), headquarters: l("北京", "Beijing"), founded: "2023",
    role: l("人形机器人、灵巧手与具身模型厂商", "Humanoid, dexterous-hand, and embodied-model company"),
    summary: l("星尘智能将人形本体、灵巧手和具身模型放在同一研发体系中，产品覆盖全尺寸人形、轻量平台与多指末端。", "RobotEra develops humanoid bodies, dexterous hands, and embodied models in one stack, spanning full-size humanoids, lighter platforms, and multi-finger end effectors."),
    businessAreas: [l("人形机器人本体", "Humanoid robots"), l("灵巧手与具身模型", "Dexterous hands and embodied models")], customers: [l("具身智能研究、数据采集与场景验证团队", "Embodied-AI research, data-collection, and deployment-validation teams")], officialUrl: "https://www.robotera.com/",
    scope: l("官网公开的机器人和灵巧手系列；参数按独立型号页拆分。", "Official robot and hand families; specifications are split by model page."), coverage: "model-partial",
    products: [p("L7", "robot-platform", "robot-platform", "humanoid-robot", l("全尺寸人形机器人", "Full-size humanoid robot"), l("面向具身任务研究和工业场景验证。", "Targets embodied-task research and industrial validation."), l("与灵巧手、感知和模型工具链组合。", "Integrates hands, perception, and model tooling."), l("核对负载、速度、续航、接口和交付版本。", "Verify payload, speed, endurance, interfaces, and delivery version."), ["research", "manufacturing"], "https://www.robotera.com/")],
  },
  {
    slug: "limx-dynamics", name: l("逐际动力", "LimX Dynamics"), countryCode: "cn", country: l("中国", "China"), headquarters: l("深圳", "Shenzhen"), founded: "2022",
    role: l("通用机器人本体与运动智能厂商", "General robot hardware and motion-intelligence company"),
    summary: l("逐际动力公开平台覆盖双足、轮足、四足和人形机器人，强调通用运动控制、本体平台和开发者研究。", "LimX Dynamics publishes biped, wheeled-leg, quadruped, and humanoid platforms centered on general motion control and developer research."),
    businessAreas: [l("双足、轮足、四足与人形本体", "Biped, wheeled-leg, quadruped, and humanoid platforms"), l("通用运动控制", "General motion control")], customers: [l("机器人研究、教育开发和场景验证团队", "Robotics research, education, and deployment-validation teams")], officialUrl: "https://www.limxdynamics.com/",
    scope: l("官网当前公开的本体系列；研究平台与商品化交付状态分开标注。", "Currently public robot families; research-platform and commercial-delivery status are separated."), coverage: "model-partial",
    products: [p("TRON 1", "robot-platform", "robot-platform", "robot-platform-general", l("模块化多形态机器人平台", "Modular multi-form robot platform"), l("通过不同足端配置支持双足、点足和轮足研究。", "Supports biped, point-foot, and wheeled-leg research through interchangeable end modules."), l("控制、仿真和开发接口按套件版本核对。", "Verify control, simulation, and development interfaces by kit."), l("核对模块配置、速度、续航、负载和维护边界。", "Verify module configuration, speed, endurance, payload, and maintenance boundaries."), ["research", "integration"], "https://www.limxdynamics.com/")],
  },
  {
    slug: "contactile", name: l("Contactile", "Contactile"), legalName: l("Contactile Pty Ltd", "Contactile Pty Ltd"), countryCode: "au", country: l("澳大利亚", "Australia"), headquarters: l("悉尼", "Sydney"),
    role: l("三轴触觉阵列与机器人抓取传感厂商", "Three-axis tactile-array and robotic-grasp sensing company"),
    summary: l("Contactile 通过柔性触觉柱阵列测量三维力、滑移和接触状态，主要面向夹爪、灵巧手和机器人操作研究。", "Contactile uses compliant tactile-pillar arrays to measure three-axis force, slip, and contact state for grippers, dexterous hands, and manipulation research."),
    businessAreas: [l("三轴触觉阵列", "Three-axis tactile arrays"), l("抓取反馈与滑移检测", "Grasp feedback and slip detection")], customers: [l("机器人研究实验室、末端执行器和自动化集成商", "Robotics labs, end-effector developers, and automation integrators")], officialUrl: "https://contactile.com/",
    scope: l("官网公开的触觉传感器和开发套件；定制阵列不计入标准目录。", "Public tactile sensors and development kits; custom arrays are outside the standard catalog."), coverage: "model-partial",
    products: [p("PapillArray Development Kit 2.0", "perception", "sensing", "tactile-sensor", l("三轴阵列触觉开发套件", "Three-axis tactile-array development kit"), l("测量局部三维力、振动与滑移相关信号。", "Measures local three-axis force, vibration, and slip-related signals."), l("USB、C++ 库和可选 ROS 节点。", "USB, C++ library, and optional ROS node."), l("核对局部/全局量程、封装寿命、漂移和闭环时延。", "Verify local/global range, skin life, drift, and closed-loop latency."), ["research", "integration", "manufacturing"], "https://contactile.com/")],
  },
  {
    slug: "robotiq", name: l("Robotiq", "Robotiq"), countryCode: "ca", country: l("加拿大", "Canada"), headquarters: l("魁北克省莱维", "Levis, Quebec"), founded: "2008",
    role: l("协作机器人末端执行器与应用套件厂商", "Collaborative-robot end-effector and application-kit company"),
    summary: l("Robotiq 产品覆盖两指和三指夹爪、真空抓取、力矩传感、视觉与应用软件，核心价值在于协作机器人快速部署。", "Robotiq offers two- and three-finger grippers, vacuum gripping, force/torque sensing, vision, and application software for faster cobot deployment."),
    businessAreas: [l("夹爪与真空抓具", "Grippers and vacuum tools"), l("力控、视觉和应用套件", "Force control, vision, and application kits")], customers: [l("协作机器人用户、机床上下料和装配集成商", "Cobot users and machine-tending or assembly integrators")], officialUrl: "https://robotiq.com/",
    scope: l("官网公开的协作机器人末端和应用套件；停产代际不作为当前型号。", "Public cobot end effectors and application kits; discontinued generations are excluded."), coverage: "model-partial",
    products: [p("2F / Hand-E / 3-Finger grippers", "end-effector", "manipulator-end-effector", "gripper", l("协作机器人电动夹爪系列", "Electric cobot gripper families"), l("覆盖通用两指、紧凑高精度和三指自适应抓取。", "Covers general two-finger, compact precision, and adaptive three-finger gripping."), l("与主流协作机器人、腕部相机和应用软件组合。", "Integrates with major cobots, wrist vision, and application software."), l("按型号核对行程、夹力、负载、指尖和防护等级。", "Verify stroke, force, payload, fingers, and ingress protection by model."), ["manufacturing", "integration"], "https://robotiq.com/products")],
  },
  {
    slug: "tacterion", name: l("tacterion", "tacterion"), countryCode: "de", country: l("德国", "Germany"), headquarters: l("慕尼黑", "Munich"), founded: "2015",
    role: l("柔性触觉与压力传感材料厂商", "Flexible tactile and pressure-sensing company"), summary: l("tacterion 的 plyon 传感器将柔性压力或触觉层集成到机器人、夹爪、可穿戴设备和工业表面。", "tacterion's plyon sensors integrate flexible pressure or tactile layers into robots, grippers, wearables, and industrial surfaces."),
    businessAreas: [l("柔性压力与触觉传感", "Flexible pressure and tactile sensing"), l("定制传感表面", "Custom sensing surfaces")], customers: [l("机器人、医疗、可穿戴与工业设备研发团队", "Robotics, medical, wearable, and industrial-device developers")], officialUrl: "https://www.tacterion.com/",
    scope: l("官网公开的 plyon 产品系列；定制尺寸和封装按项目确认。", "Public plyon families; custom geometry and packaging require project confirmation."), coverage: "model-partial",
    products: [p("plyon flex / stretch", "perception", "sensing", "tactile-sensor", l("柔性与可拉伸触觉传感器", "Flexible and stretchable tactile sensors"), l("为曲面和柔性结构提供接触、压力或形变感知。", "Adds contact, pressure, or deformation sensing to curved and compliant structures."), l("传感层、电子接口和机械封装按应用组合。", "Sensing layer, electronics, and mechanical packaging are application-specific."), l("核对量程、漂移、弯折寿命、采样和温度影响。", "Verify range, drift, flex life, sampling, and temperature effects."), ["research", "integration", "manufacturing"], "https://www.tacterion.com/")],
  },
  {
    slug: "weart", name: l("WEART", "WEART"), countryCode: "it", country: l("意大利", "Italy"), headquarters: l("米兰", "Milan"), founded: "2018",
    role: l("可穿戴触觉反馈与遥操作设备厂商", "Wearable haptic-feedback and teleoperation-device company"), summary: l("WEART 以手指佩戴式触觉设备提供力、振动和温度反馈，主要用于 XR、训练和机器人遥操作。", "WEART provides finger-worn force, vibration, and thermal feedback for XR, training, and robot teleoperation."),
    businessAreas: [l("可穿戴触觉反馈", "Wearable haptics"), l("遥操作与 XR 交互", "Teleoperation and XR interaction")], customers: [l("机器人遥操作、培训仿真和研究团队", "Robot teleoperation, training-simulation, and research teams")], officialUrl: "https://weart.it/",
    scope: l("官网公开的 TouchDIVER 产品；配件和软件许可按套件核对。", "Public TouchDIVER products; accessories and software licensing depend on the kit."), coverage: "model-partial",
    products: [p("TouchDIVER Pro", "perception", "sensing", "tactile-sensor", l("多指可穿戴触觉设备", "Multi-finger wearable haptic device"), l("为操作者提供力、振动和温度反馈。", "Provides force, vibration, and thermal feedback to the operator."), l("与 XR 或机器人遥操作软件连接。", "Connects to XR or robot teleoperation software."), l("核对时延、工作空间、手型适配、SDK 和连续佩戴。", "Verify latency, workspace, hand fit, SDK, and prolonged use."), ["research", "integration"], "https://weart.it/")],
  },
  {
    slug: "robotis", name: l("ROBOTIS", "ROBOTIS"), legalName: l("ROBOTIS Co., Ltd.", "ROBOTIS Co., Ltd."), countryCode: "kr", country: l("韩国", "South Korea"), headquarters: l("首尔", "Seoul"), founded: "1999",
    role: l("智能舵机、教育机器人与开放机器人平台厂商", "Smart-servo, educational-robot, and open-platform company"), summary: l("ROBOTIS 以 DYNAMIXEL 总线型智能舵机为核心，并提供机械臂、移动机器人、教育套件和 ROS 开发资源。", "ROBOTIS centers on DYNAMIXEL bus-connected smart servos and also provides manipulators, mobile robots, educational kits, and ROS resources."),
    businessAreas: [l("DYNAMIXEL 智能舵机", "DYNAMIXEL smart servos"), l("开放机械臂与移动机器人", "Open manipulators and mobile robots")], customers: [l("教育、研究、原型开发和轻型机器人制造团队", "Education, research, prototyping, and light-robot developers")], officialUrl: "https://www.robotis.us/",
    scope: l("机器人相关产品系列；DYNAMIXEL 同时保留系列级索引和独立型号记录，OpenCR 与 OpenMANIPULATOR-X 单独记录。", "Robotics product families; DYNAMIXEL retains both family-level and model-level entries, while OpenCR and OpenMANIPULATOR-X are indexed separately."), coverage: "model-partial",
    products: [
      p("DYNAMIXEL X / P / Y / PRO+ series", "motion", "motion-transmission", "motor-servo", l("总线型智能舵机系列", "Bus-connected smart servo families"), l("集成电机、减速、编码器、驱动和通信。", "Integrates motor, gearing, encoder, drive, and communication."), l("TTL 或 RS-485 总线与 DYNAMIXEL 协议。", "TTL or RS-485 with the DYNAMIXEL protocol."), l("型号选型必须使用对应电压、性能曲线和热工况。", "Model selection must use the applicable voltage, performance curve, and thermal duty."), ["research", "integration"], "https://emanual.robotis.com/docs/en/dxl/"),
      p("OpenCR 1.0", "model-software", "control-compute", "embedded-controller", l("机器人嵌入式控制板", "Embedded robot controller board"), l("面向 ROS 教育与机器人平台的开源控制板，提供 MCU、传感和 DYNAMIXEL 总线接口。", "An open controller board for ROS education and robot platforms, combining an MCU, sensing, and DYNAMIXEL bus interfaces."), l("与 DYNAMIXEL、Arduino IDE、OpenCR 固件和 ROS 平台组合。", "Integrates with DYNAMIXEL, Arduino IDE, OpenCR firmware, and ROS platforms."), l("核对固件版本、I/O 电平、总线供电、实时周期和目标平台支持。", "Verify firmware version, I/O levels, bus power, real-time cycle, and target-platform support."), ["research", "integration"], "https://emanual.robotis.com/docs/en/parts/controller/opencr10/"),
      p("OpenMANIPULATOR-X", "end-effector", "manipulator-end-effector", "robot-arm", l("开放式桌面机械臂模块", "Open desktop manipulator module"), l("基于 DYNAMIXEL 的小型开放式机械臂，用于 ROS、MoveIt 和操作算法研究。", "A compact open manipulator based on DYNAMIXEL for ROS, MoveIt, and manipulation research."), l("本体、OpenCR、DYNAMIXEL、ROS 2 与 MoveIt 工具链按套件组合。", "Combines the arm, OpenCR, DYNAMIXEL, ROS 2, and MoveIt tooling by kit."), l("核对负载、臂展、重复精度、控制频率、夹爪和当前软件版本。", "Verify payload, reach, repeatability, control rate, gripper, and current software version."), ["research", "integration"], "https://emanual.robotis.com/docs/en/platform/openmanipulator_x/overview/")
    ],
  },
  {
    slug: "cubemars", name: l("CubeMars", "CubeMars"), legalName: l("南京市开源电子有限公司", "Nanjing Open Source Mechatronics Technology Co., Ltd."), countryCode: "cn", country: l("中国", "China"), headquarters: l("南京", "Nanjing"),
    role: l("无刷电机与机器人关节执行器厂商", "Brushless-motor and robotic-joint actuator company"), summary: l("CubeMars 产品覆盖无刷电机、一体化关节、轮毂与水下推进等系列，其中 AK 和 RI/RO 系列常用于足式、人形和外骨骼原型。", "CubeMars offers brushless motors, integrated joints, wheel-hub drives, and underwater propulsion; AK and RI/RO families are often used in legged, humanoid, and exoskeleton prototypes."),
    businessAreas: [l("一体化机器人关节", "Integrated robotic joints"), l("无刷电机与驱动", "Brushless motors and drives")], customers: [l("足式机器人、人形机器人、外骨骼与研究原型团队", "Legged-robot, humanoid, exoskeleton, and research-prototype teams")], officialUrl: "https://www.cubemars.com/",
    scope: l("机器人关节与驱动系列；推进器和航模产品不计入机器人目录。", "Robotic-joint and drive families; propulsion and hobby-aircraft products are outside this robotics catalog."), coverage: "model-partial",
    products: [p("AK / RI / RO robotic actuator families", "motion", "motion-transmission", "integrated-joint", l("一体化机器人关节系列", "Integrated robotic actuator families"), l("将电机、减速器、编码器和驱动器集成到紧凑关节。", "Combines motor, reducer, encoder, and drive electronics in compact joints."), l("CAN、UART 和控制模式因型号而异。", "CAN, UART, and control modes vary by model."), l("核对额定与峰值扭矩、热工况、回差、电压和固件。", "Verify rated/peak torque, thermal duty, backlash, voltage, and firmware."), ["research", "integration", "manufacturing"], "https://www.cubemars.com/robotics.html")],
  },

  {
    slug: "tesla-optimus", name: l("Tesla Optimus", "Tesla Optimus"), legalName: l("Tesla, Inc.", "Tesla, Inc."), countryCode: "us", country: l("美国", "United States"), headquarters: l("得克萨斯州奥斯汀", "Austin, Texas"),
    role: l("通用双足人形机器人研发项目", "General-purpose biped humanoid robotics program"), summary: l("Optimus 是 Tesla 的通用双足机器人项目，公开目标是处理不安全、重复或枯燥的任务。当前公开信息以研发方向、演示和公司披露为主，不能等同于公开销售产品。", "Optimus is Tesla's general-purpose biped program for unsafe, repetitive, or boring tasks. Public evidence remains centered on development direction, demonstrations, and company disclosures rather than an openly sold product."),
    businessAreas: [l("双足人形本体", "Biped humanoid hardware"), l("视觉、规划与端侧推理", "Vision, planning, and onboard inference")], customers: [l("当前主要为 Tesla 内部制造验证；外部交付范围未公开", "Currently centered on internal Tesla manufacturing validation; external delivery scope is undisclosed")], officialUrl: "https://www.tesla.com/AI",
    scope: l("仅收录 Tesla 官方公开的 Optimus；代际演示不拆成可采购型号。", "Only Tesla's publicly disclosed Optimus program is indexed; demonstration generations are not treated as purchasable SKUs."), coverage: "family-complete",
    products: [p("Optimus", "robot-platform", "robot-platform", "humanoid-robot", l("通用双足人形机器人", "General-purpose biped humanoid"), l("面向不安全、重复或枯燥任务的自主双足机器人研发平台。", "An autonomous biped program for unsafe, repetitive, or boring tasks."), l("复用视觉、规划、推理硬件、电池和执行器工程。", "Draws on vision, planning, inference hardware, battery, and actuator engineering."), l("未公开销售配置；不能从演示推断负载、续航或量产能力。", "No public sales configuration; demonstrations do not establish payload, endurance, or production capability."), ["manufacturing", "research"], "https://www.tesla.com/AI", [{ label: l("公开阶段", "Public stage"), value: l("研发与内部验证", "Development and internal validation") }, { label: l("产品状态", "Product status"), value: l("未公开销售", "Not publicly offered for sale") }])],
  },
  {
    slug: "xpeng-robotics", name: l("小鹏机器人", "XPENG Robotics"), legalName: l("XPENG Robotics", "XPENG Robotics"), countryCode: "cn", country: l("中国", "China"), headquarters: l("广州", "Guangzhou"),
    role: l("Physical AI 与人形机器人业务", "Physical AI and humanoid robotics business"), summary: l("小鹏 IRON 采用高度拟人化结构、灵巧手和端侧 Physical AI 计算，官方计划先在门店和园区部署，再进入更广泛商业场景。量产与交付时间应按公司最新披露核验。", "XPENG IRON combines a humanlike structure, dexterous hands, and onboard Physical AI compute. Official plans start with stores and campuses before broader commercial use; production and delivery timing require current disclosure."),
    businessAreas: [l("人形机器人本体与灵巧手", "Humanoid hardware and dexterous hands"), l("Physical AI 芯片、模型与控制", "Physical AI chips, models, and control")], customers: [l("门店、园区及后续商业应用方", "Stores, campuses, and later commercial deployments")], officialUrl: "https://www.xpeng.com/de/model/ai-robot",
    scope: l("官网公开的 IRON；不同公开代际按当前量产目标版本合并。", "Official IRON program; public generations are consolidated around the current production-target version."), coverage: "family-complete",
    products: [p("IRON", "robot-platform", "robot-platform", "humanoid-robot", l("高度拟人化通用人形机器人", "Highly humanlike general-purpose humanoid"), l("面向 Physical AI、自然运动和通用任务学习的人形平台。", "A humanoid platform for Physical AI, natural motion, and general task learning."), l("自研芯片、控制器、运动模块和灵巧手组成全栈系统。", "Uses an in-house stack spanning chips, controllers, motion modules, and dexterous hands."), l("量产和对外交付仍按计划推进；性能需以最终配置和现场工况验证。", "Production and external delivery remain plan-dependent; performance requires final configuration and site validation."), ["service", "manufacturing", "research"], "https://www.xpeng.com/de/model/ai-robot", [{ label: l("全身自由度", "Whole-body DoF"), value: l("76", "76") }, { label: l("单手自由度", "DoF per hand"), value: l("21", "21") }, { label: l("端侧算力", "Onboard compute"), value: l("最高 2250 TOPS（官方口径）", "Up to 2,250 TOPS (official claim)") }])],
  },
  {
    slug: "mentee-robotics", name: l("Mentee Robotics", "Mentee Robotics"), countryCode: "il", country: l("以色列", "Israel"), headquarters: l("赫兹利亚", "Herzliya"), founded: "2022",
    role: l("通用人形机器人研发厂商", "General-purpose humanoid robotics company"), summary: l("Mentee Robotics 已成为 Mobileye 旗下公司，开发 MenteeBot，将视觉、语言、运动和任务学习结合到垂直整合的人形本体。公开资料仍应区分演示能力、试点能力和标准交付能力。", "Mentee Robotics is now a Mobileye company developing MenteeBot, a vertically integrated humanoid that combines vision, language, locomotion, and task learning. Demonstration, pilot, and standard delivery capability must be separated."),
    businessAreas: [l("人形本体与端到端任务学习", "Humanoid hardware and end-to-end task learning")], customers: [l("仓储、制造及研究试点团队", "Warehouse, manufacturing, and research-pilot teams")], officialUrl: "https://www.menteebot.com/",
    scope: l("官网公开的 MenteeBot；未公开型号保持单一产品记录。", "Official MenteeBot; no separate SKU is created without a public model."), coverage: "family-complete",
    products: [p("MenteeBot", "robot-platform", "robot-platform", "humanoid-robot", l("通用人形机器人", "General-purpose humanoid robot"), l("结合感知、语言理解、运动和任务学习，官网将当前本体标注为第三代平台。", "Combines perception, language understanding, locomotion, and task learning; the official site describes the current body as a third-generation platform."), l("本体、自研执行器、冗余计算、仿真与学习系统按当前开发版本组合。", "Hardware, in-house actuators, redundant compute, simulation, and learning systems vary by current development release."), l("核对交付阶段、任务自治、人工接管、负载和连续运行；官网规格不等于已形成标准化批量交付。", "Verify delivery stage, autonomy, human takeover, payload, and continuous operation; published specifications do not by themselves establish standardized volume delivery."), ["logistics", "manufacturing", "research"], "https://www.menteebot.com/bot/", [
      { label: l("身高", "Height"), value: l("175 cm", "175 cm") },
      { label: l("质量", "Mass"), value: l("70 kg", "70 kg") },
      { label: l("最高速度", "Maximum speed"), value: l("1.5 m/s", "1.5 m/s") },
      { label: l("最大搬运质量", "Maximum carried mass"), value: l("25 kg", "25 kg") },
      { label: l("自由度", "Degrees of freedom"), value: l("40", "40") },
      { label: l("公开交互方式", "Published interaction mode"), value: l("语音", "Voice") }
    ])],
  },
  {
    slug: "engineered-arts", name: l("Engineered Arts", "Engineered Arts"), countryCode: "gb", country: l("英国", "United Kingdom"), headquarters: l("康沃尔", "Cornwall"), founded: "2004",
    role: l("拟人交互与娱乐机器人厂商", "Humanlike interaction and entertainment-robot company"), summary: l("Engineered Arts 专注拟人面部、语音交互和展陈体验，产品并非面向工业搬运。Ameca、Mesmer 和 RoboThespian 的形态、自由度和定制程度不同。", "Engineered Arts specializes in expressive faces, conversational interaction, and public experiences rather than industrial handling. Ameca, Mesmer, and RoboThespian differ in form, DoF, and customization."),
    businessAreas: [l("拟人交互机器人", "Humanlike interactive robots"), l("展陈、教育和研究平台", "Exhibition, education, and research platforms")], customers: [l("博物馆、展会、研究机构与体验空间", "Museums, events, research institutes, and experience venues")], officialUrl: "https://www.engineeredarts.co.uk/",
    scope: l("官网和官方文档公开的在售机器人家族；客户定制角色不单列。", "Robot families in the official site and documentation; customer-specific characters are not separate products."), coverage: "family-complete",
    products: [
      p("Ameca", "robot-platform", "robot-platform", "humanoid-robot", l("全尺寸拟人交互机器人", "Full-size humanlike interaction robot"), l("强调面部表情、语音和人机互动的模块化机器人，官方用途为娱乐、教育与公众互动。", "A modular robot focused on facial expression, speech, and human interaction for entertainment, education, and public engagement."), l("由 Tritium 软件、视觉、音频和运动模块组成。", "Combines Tritium software with vision, audio, and motion modules."), l("不应用工业负载指标评价；需核对云服务、内容、语言、定制模块和现场运营。", "Industrial-payload criteria are not appropriate; verify cloud services, content, language, custom modules, and venue operation."), ["service", "research"], "https://docs.engineeredarts.co.uk/guide/reference/hardware/mesmer_full_size_gen2", [
        { label: l("总自由度", "Total degrees of freedom"), value: l("61", "61") },
        { label: l("面部自由度", "Facial degrees of freedom"), value: l("27", "27") },
        { label: l("颈部自由度", "Neck degrees of freedom"), value: l("5", "5") },
        { label: l("肩部自由度", "Shoulder degrees of freedom"), value: l("8（左右各 4）", "8 (4 per side)") },
        { label: l("手臂自由度", "Arm degrees of freedom"), value: l("10（左右各 5）", "10 (5 per side)") },
        { label: l("手部自由度", "Hand degrees of freedom"), value: l("8（左右各 4）", "8 (4 per side)") },
        { label: l("躯干自由度", "Torso degrees of freedom"), value: l("3", "3") },
        { label: l("交互硬件", "Interaction hardware"), value: l("麦克风、摄像头和扬声器", "Microphones, cameras, and speaker") }
      ]),
      p("Ameca Desktop / Ami Desktop", "robot-platform", "robot-platform", "robot-platform-general", l("桌面头肩式交互机器人", "Desktop head-and-shoulders interaction robots"), l("适合较小空间的表情、语音、教育和研究交互，不用于与人或物体发生物理交互。", "Supports expressive, conversational, educational, and research interaction in a smaller footprint and is not intended for physical interaction with people or objects."), l("摄像头、麦克风、扬声器和 Tritium 平台。", "Cameras, microphones, speakers, and the Tritium platform."), l("核对具体代际、角色定制、内容系统和远程支持；Gen 2 与 Gen 3 的电气及连接规格不能混用。", "Verify the exact generation, character customization, content system, and remote support; Gen 2 and Gen 3 electrical and connectivity specifications must not be mixed."), ["service", "research"], "https://docs.engineeredarts.co.uk/guide/reference/hardware/desktop_robot_gen2", [
        { label: l("自由度", "Degrees of freedom"), value: l("32", "32") },
        { label: l("颈部自由度", "Neck degrees of freedom"), value: l("5", "5") },
        { label: l("面部自由度", "Facial degrees of freedom"), value: l("27", "27") },
        { label: l("近似质量", "Approximate mass"), value: l("8 kg", "8 kg") },
        { label: l("使用环境", "Operating environment"), value: l("仅限室内", "Indoor only") },
        { label: l("建议温度", "Recommended temperature"), value: l("10-30 °C", "10-30 °C") },
        { label: l("建议相对湿度", "Recommended relative humidity"), value: l("45-60%", "45-60%") },
        { label: l("交互硬件", "Interaction hardware"), value: l("麦克风、摄像头和扬声器", "Microphones, cameras, and speaker") }
      ]),
      p("RoboThespian", "robot-platform", "robot-platform", "humanoid-robot", l("表演与教育人形机器人", "Performance and education humanoid"), l("面向剧场、展陈、教育和公共互动。", "Designed for theatre, exhibitions, education, and public interaction."), l("脚本、语音、动作和交互内容由 Tritium 系统管理。", "Tritium manages scripts, speech, motion, and interactive content."), l("核对内容制作、语言、维护和现场人员职责。", "Verify content production, language, maintenance, and operator responsibilities."), ["service", "research"], "https://www.engineeredarts.co.uk/robot/robothespian/")
    ],
  },
  {
    slug: "clone-robotics", name: l("Clone Robotics", "Clone Robotics"), countryCode: "pl", country: l("波兰 / 美国", "Poland / United States"), founded: "2021",
    role: l("仿生肌肉骨骼机器人研发厂商", "Biomimetic musculoskeletal robotics company"), summary: l("Clone Robotics 采用液压肌肉和仿生骨骼结构开发手、上身和人形原型。公开产品与预发布项目并存，需明确可购买硬件、开发计划和演示原型的边界。", "Clone Robotics develops hands, torsos, and humanoid prototypes using hydraulic muscles and biomimetic skeletal structures. Purchasable hardware, development plans, and demonstrations must be separated."),
    businessAreas: [l("仿生手与肌肉骨骼执行", "Biomimetic hands and musculoskeletal actuation"), l("人形原型", "Humanoid prototypes")], customers: [l("仿生机器人研究与早期开发合作方", "Biomimetic-robotics researchers and early development partners")], officialUrl: "https://clonerobotics.com/",
    scope: l("官网正式列出的手、上身和人形项目；概念或预告保持研发状态。", "Official hand, torso, and humanoid projects; concepts and previews retain development status."), coverage: "family-complete",
    products: [
      p("Clone Hand", "end-effector", "manipulator-end-effector", "dexterous-hand", l("仿生肌肉驱动五指手", "Biomimetic muscle-driven five-finger hand"), l("通过肌腱与人工肌肉复现人手运动结构。", "Uses tendons and artificial muscles to reproduce human-hand mechanics."), l("需要配套液压、控制和标定系统。", "Requires hydraulic, control, and calibration support."), l("核对可采购状态、压力系统、安全、寿命和控制接口。", "Verify purchase status, pressure system, safety, life, and control interfaces."), ["research", "integration"], "https://clonerobotics.com/hand"),
      p("Clone Torso", "robot-platform", "robot-platform", "robot-platform-general", l("仿生上身机器人", "Biomimetic robotic torso"), l("将仿生手臂、手和躯干组合用于人形操作研究。", "Combines biomimetic arms, hands, and torso for humanoid manipulation research."), l("液压、感知和控制系统为整体平台组成。", "Hydraulics, sensing, and controls form one integrated platform."), l("核对交付状态、工作空间、负载、泄漏风险和维护。", "Verify delivery status, workspace, payload, leak risk, and maintenance."), ["research"], "https://clonerobotics.com/")
    ],
  },
  {
    slug: "anybotics", name: l("ANYbotics", "ANYbotics"), countryCode: "ch", country: l("瑞士", "Switzerland"), headquarters: l("苏黎世", "Zurich"), founded: "2016",
    role: l("工业巡检四足机器人厂商", "Industrial-inspection quadruped robot company"), summary: l("ANYbotics 的 ANYmal 系列面向能源、化工、矿业和公用设施巡检，产品价值依赖传感载荷、自治巡检软件、现场防爆或防护配置以及运维体系。", "ANYbotics' ANYmal family targets inspection in energy, chemicals, mining, and utilities. Value depends on payload sensors, autonomous inspection software, site-rated protection, and operations support."),
    businessAreas: [l("四足机器人本体", "Quadruped robot hardware"), l("工业巡检与资产数据", "Industrial inspection and asset data")], customers: [l("能源、化工、矿业和公用设施运营方", "Energy, chemical, mining, and utility operators")], officialUrl: "https://www.anybotics.com/",
    scope: l("官网公开的 ANYmal 工业版本；历史研究代际不作为当前产品。", "Current official ANYmal industrial editions; historical research generations are excluded."), coverage: "family-complete",
    products: [p("ANYmal", "robot-platform", "robot-platform", "quadruped-robot", l("自主工业巡检四足机器人", "Autonomous industrial-inspection quadruped"), l("在复杂工业现场执行例行巡检、读表、热成像、声学检测和异常识别。", "Performs routine inspection, gauge reading, thermal imaging, acoustic inspection, and anomaly detection in industrial sites."), l("机器人、巡检载荷、任务规划、Workforce 操作界面和资产数据接口组成系统。", "Combines the robot, inspection payload, mission planning, Workforce interface, and asset-data integration."), l("核对标准版或防爆版、楼梯与地面条件、载荷、任务覆盖、网络和现场支持；不同官网资料对应的硬件代际需单独确认。", "Verify standard or Ex edition, stairs and terrain, payload, mission coverage, network, and site support; hardware generations represented in different official documents require separate confirmation."), ["manufacturing", "service"], "https://www.anybotics.com/robotics/anymal/", [
      { label: l("工作尺寸（长×宽×高）", "Operating size (L×W×H)"), value: l("80 × 60 × 70 cm（当前产品页）", "80 × 60 × 70 cm (current product page)") },
      { label: l("额外载荷", "Additional payload"), value: l("最高 10 kg（当前产品页）", "Up to 10 kg (current product page)") },
      { label: l("正常步行速度", "Normal walking speed"), value: l("0.75 m/s", "0.75 m/s") },
      { label: l("续航", "Runtime"), value: l("约 90 min；规格表给出 90-120 min", "About 90 min; specification sheet states 90-120 min") },
      { label: l("单次典型巡检距离", "Typical inspection range per charge"), value: l("最高约 2 km", "Up to about 2 km") },
      { label: l("防护等级", "Ingress protection"), value: l("IP67", "IP67") },
      { label: l("环境感知", "Environment perception"), value: l("360° 激光雷达、6 个深度相机", "360° LiDAR and 6 depth cameras") },
      { label: l("遥操作相机", "Teleoperation cameras"), value: l("2 个广角彩色相机", "2 wide-angle color cameras") },
      { label: l("边缘计算", "Edge compute"), value: l("2× 第 8 代六核 Intel Core i7", "2× 8th-generation six-core Intel Core i7") },
      { label: l("连接", "Connectivity"), value: l("2.4/5 GHz Wi-Fi；可选 4G/LTE", "2.4/5 GHz Wi-Fi; optional 4G/LTE") },
      { label: l("标准巡检载荷", "Standard inspection payload"), value: l("20× 光学变焦、热像仪、超声麦克风和照明灯", "20× optical zoom, thermal camera, ultrasonic microphone, and spotlight") },
      { label: l("软件", "Software"), value: l("Ubuntu、ROS 接口及厂商任务软件", "Ubuntu, ROS API, and vendor mission software") }
    ])],
  },
  {
    slug: "rainbow-robotics", name: l("Rainbow Robotics", "Rainbow Robotics"), legalName: l("Rainbow Robotics Inc.", "Rainbow Robotics Inc."), countryCode: "kr", country: l("韩国", "South Korea"), headquarters: l("大田", "Daejeon"), founded: "2011",
    role: l("协作机器人、双臂移动机器人与人形研发厂商", "Cobot, dual-arm mobile robot, and humanoid R&D company"), summary: l("Rainbow Robotics 的公开业务覆盖 RB 协作机器人、RB-Y1 双臂移动平台和人形/四足研发。用于选型时应按可采购工业产品与研究项目分开。", "Rainbow Robotics publicly covers RB cobots, the RB-Y1 dual-arm mobile platform, and humanoid or quadruped R&D. Purchasable industrial products and research programs should be separated."),
    businessAreas: [l("协作机器人", "Collaborative robots"), l("双臂移动平台和人形研发", "Dual-arm mobile platforms and humanoid R&D")], customers: [l("制造集成商、研究机构和移动操作开发团队", "Manufacturing integrators, research institutes, and mobile-manipulation developers")], officialUrl: "https://www.rainbow-robotics.com/",
    scope: l("官网公开的 RB 系列与 RB-Y1；研究项目按平台记录。", "Official RB families and RB-Y1; research programs are recorded as platforms."), coverage: "model-partial",
    products: [
      p("RB collaborative robot family", "robot-platform", "robot-platform", "industrial-arm", l("六轴协作机器人系列", "Six-axis collaborative robot family"), l("覆盖不同负载和臂展的工业协作机械臂。", "Covers industrial cobots with different payload and reach combinations."), l("控制器、示教器和工业通信按型号配置。", "Controller, pendant, and industrial communications vary by model."), l("按具体型号核对负载、臂展、重复精度、防护和认证。", "Verify payload, reach, repeatability, protection, and certification by model."), ["manufacturing", "integration"], "https://www.rainbow-robotics.com/"),
      p("RB-Y1", "robot-platform", "robot-platform", "mobile-robot", l("双臂移动机器人平台", "Dual-arm mobile robot platform"), l("将双臂、升降躯干和移动底盘用于研究和复杂操作。", "Combines dual arms, a lifting torso, and mobile base for research and complex manipulation."), l("机械臂、移动底盘、视觉和开发接口构成平台。", "Arms, mobile base, vision, and development interfaces form the platform."), l("核对交付版本、负载、移动安全、续航和 SDK。", "Verify delivery version, payload, mobile safety, endurance, and SDK."), ["research", "integration"], "https://www.rainbow-robotics.com/")
    ],
  },
  {
    slug: "kawada-robotics", name: l("Kawada Robotics", "Kawada Robotics"), countryCode: "jp", country: l("日本", "Japan"), headquarters: l("东京", "Tokyo"),
    role: l("双臂协作机器人厂商", "Dual-arm collaborative-robot company"), summary: l("Kawada Robotics 的 NEXTAGE 系列采用双臂、头部视觉和人形上身布局，主要面向既有人工工位的装配、搬运和多工序自动化。", "Kawada Robotics' NEXTAGE family uses dual arms, head vision, and a humanoid upper-body layout for assembly, handling, and multi-step automation at human workstations."),
    businessAreas: [l("双臂协作机器人", "Dual-arm collaborative robots"), l("人工工位自动化", "Human-workstation automation")], customers: [l("电子、机械、医药和轻型装配制造商", "Electronics, machinery, pharmaceutical, and light-assembly manufacturers")], officialUrl: "https://nextage.kawadarobot.co.jp/en/",
    scope: l("官网公开的 NEXTAGE 当前系列；早期研究平台不计入。", "Current official NEXTAGE family; early research platforms are excluded."), coverage: "family-complete",
    products: [p("NEXTAGE Fillie", "robot-platform", "robot-platform", "industrial-arm", l("双臂协作机器人", "Dual-arm collaborative robot"), l("面向人类工位中的多工序装配和物料操作。", "Targets multi-step assembly and material handling at human workstations."), l("双臂、头部相机、手眼视觉和末端工具按应用集成。", "Dual arms, head cameras, hand-eye vision, and end tools are application-specific."), l("核对节拍、视觉条件、夹具、末端、风险评估和维护。", "Verify cycle time, vision conditions, fixtures, tools, risk assessment, and maintenance."), ["manufacturing", "integration"], "https://nextage.kawadarobot.co.jp/en/")],
  },
  {
    slug: "diligent-robotics", name: l("Diligent Robotics", "Diligent Robotics"), countryCode: "us", country: l("美国", "United States"), headquarters: l("得克萨斯州奥斯汀", "Austin, Texas"), founded: "2017",
    role: l("医院物流与协作服务机器人厂商", "Hospital logistics and collaborative service-robot company"), summary: l("Moxi 面向医院内部的非临床物品配送和后勤任务，重点不是替代临床决策，而是减少人员往返。部署价值取决于医院流程、门禁、电梯和任务调度集成。", "Moxi handles non-clinical hospital delivery and logistics to reduce staff walking rather than replace clinical decisions. Deployment depends on workflow, access control, elevators, and task scheduling."),
    businessAreas: [l("医院移动服务机器人", "Hospital mobile service robots"), l("任务调度与运营服务", "Task orchestration and operations services")], customers: [l("医院和医疗系统运营团队", "Hospitals and healthcare-system operations teams")], officialUrl: "https://www.diligentrobots.com/",
    scope: l("官网公开的 Moxi 服务；软件和运营作为同一交付体系。", "Official Moxi service; software and operations are treated as one delivery system."), coverage: "family-complete",
    products: [p("Moxi", "robot-platform", "robot-platform", "mobile-robot", l("医院移动操作服务机器人", "Hospital mobile-manipulation service robot"), l("执行药品、耗材、样本等非临床配送任务。", "Performs non-clinical delivery of supplies, medication, and samples."), l("移动底盘、机械臂、任务平台和医院基础设施连接。", "Combines mobile base, arm, task platform, and hospital-infrastructure integration."), l("核对任务责任、门禁电梯、感染控制、人工接管和服务 SLA。", "Verify task responsibility, doors and elevators, infection control, human takeover, and service SLA."), ["service"], "https://www.diligentrobots.com/moxi")],
  },
  {
    slug: "standard-bots", name: l("Standard Bots", "Standard Bots"), countryCode: "us", country: l("美国", "United States"), headquarters: l("纽约", "New York"), founded: "2017",
    role: l("AI 协作机器人与自动化平台厂商", "AI-enabled cobot and automation-platform company"), summary: l("Standard Bots 以 RO1 协作机械臂和软件平台降低部署门槛，公开定位覆盖机床上下料、搬运和通用自动化。实际项目仍需工程集成和风险评估。", "Standard Bots combines the RO1 collaborative arm with software intended to reduce deployment effort for machine tending, handling, and general automation. Projects still require engineering integration and risk assessment."),
    businessAreas: [l("协作机械臂", "Collaborative robot arms"), l("视觉与自动化软件", "Vision and automation software")], customers: [l("中小制造商、机床和通用自动化集成商", "Small and midsize manufacturers, machine shops, and automation integrators")], officialUrl: "https://standardbots.com/",
    scope: l("官网公开的 RO1 机器人和配套软件。", "Official RO1 robot and supporting software."), coverage: "family-complete",
    products: [p("RO1", "robot-platform", "robot-platform", "industrial-arm", l("六轴协作机械臂", "Six-axis collaborative robot arm"), l("面向机床上下料、搬运、检验和通用自动化。", "Targets machine tending, handling, inspection, and general automation."), l("机械臂、视觉、控制软件、控制箱和末端工具组成工作站。", "Arm, vision, control software, control box, and tooling form the workcell."), l("额定性能、无负载最高速度和具体工艺节拍不可混用；项目仍需风险评估。", "Rated performance, no-load maximum speed, and process cycle time must not be conflated; projects still require risk assessment."), ["manufacturing", "integration"], "https://help.standardbots.com/src/ro1-manual.pdf", [
      { label: l("轴数", "Axes"), value: l("6", "6") },
      { label: l("额定负载", "Rated payload"), value: l("18 kg", "18 kg") },
      { label: l("工作半径", "Reach"), value: l("1.3 m", "1.3 m") },
      { label: l("重复定位精度", "Repeatability"), value: l("±0.025 mm", "±0.025 mm") },
      { label: l("典型 TCP 速度", "Typical TCP speed"), value: l("1 m/s", "1 m/s") },
      { label: l("最高 TCP 速度", "Maximum TCP speed"), value: l("3 m/s（无负载）", "3 m/s (no payload)") },
      { label: l("腕部最高角速度", "Maximum wrist speed"), value: l("±435°/s", "±435°/s") },
      { label: l("通信", "Communication"), value: l("24 V I/O、Modbus TCP、Ethernet API", "24 V I/O, Modbus TCP, and Ethernet APIs") },
      { label: l("数字 I/O", "Digital I/O"), value: l("16 路输入、16 路输出", "16 inputs and 16 outputs") },
      { label: l("控制箱电源", "Control-box supply"), value: l("90-264 VAC，47-63 Hz", "90-264 VAC, 47-63 Hz") }
    ])],
  },
  {
    slug: "collaborative-robotics", name: l("Collaborative Robotics", "Collaborative Robotics"), countryCode: "us", country: l("美国", "United States"), headquarters: l("加利福尼亚州圣克拉拉", "Santa Clara, California"), founded: "2022",
    role: l("移动操作机器人与协作自动化厂商", "Mobile-manipulation and collaborative-automation company"), summary: l("Collaborative Robotics 开发 Proxie 移动操作平台，目标是在制造、物流和服务环境中与人员共享空间。公开试点不等同于标准化批量交付。", "Collaborative Robotics develops the Proxie mobile-manipulation platform for shared human environments in manufacturing, logistics, and services. Public pilots do not by themselves establish standardized volume delivery."),
    businessAreas: [l("移动操作机器人", "Mobile-manipulation robots"), l("协作任务软件", "Collaborative task software")], customers: [l("物流、制造和现场服务试点团队", "Logistics, manufacturing, and field-service pilot teams")], officialUrl: "https://www.co.bot/",
    scope: l("官网公开的 Proxie 平台。", "Official Proxie platform."), coverage: "family-complete",
    products: [p("Proxie", "robot-platform", "robot-platform", "mobile-robot", l("协作移动操作机器人", "Collaborative mobile-manipulation robot"), l("在人员环境中执行搬运、取放和流程衔接。", "Performs transport, pick-and-place, and workflow handoffs around people."), l("移动底盘、操作机构、感知和任务软件组成平台。", "Combines a mobile base, manipulator, perception, and task software."), l("核对试点任务、负载、速度、人机安全、异常接管和系统接口。", "Verify pilot tasks, payload, speed, human safety, exception handling, and system interfaces."), ["logistics", "manufacturing", "service"], "https://www.co.bot/")],
  },
  {
    slug: "universal-robots", name: l("Universal Robots", "Universal Robots"), countryCode: "dk", country: l("丹麦", "Denmark"), headquarters: l("欧登塞", "Odense"), founded: "2005",
    role: l("协作机器人厂商", "Collaborative-robot company"), summary: l("Universal Robots 提供 e-Series 和新一代 UR 系列协作机械臂，覆盖从轻载桌面到更高负载搬运。产品生态包括 URCaps、认证配件和应用套件。", "Universal Robots offers e-Series and newer UR cobots from light desktop work to higher-payload handling, supported by URCaps, certified accessories, and application kits."),
    businessAreas: [l("协作机械臂", "Collaborative robot arms"), l("URCaps 与应用生态", "URCaps and application ecosystem")], customers: [l("制造、机床、焊接、码垛和实验室自动化用户", "Manufacturing, machine-tending, welding, palletizing, and laboratory-automation users")], officialUrl: "https://www.universal-robots.com/products/",
    scope: l("官网当前产品页列出的机械臂型号；停产 CB 系列不计入。", "Arm models on the current official products page; discontinued CB-series arms are excluded."), coverage: "model-partial",
    products: [
      p("UR3e / UR5e / UR10e / UR16e", "robot-platform", "robot-platform", "industrial-arm", l("e-Series 协作机械臂", "e-Series collaborative robot arms"), l("覆盖轻型装配、机床、焊接和搬运。", "Covers light assembly, machine tending, welding, and handling."), l("PolyScope、URCaps、控制箱和认证工具生态。", "PolyScope, URCaps, controller, and certified tooling ecosystem."), l("按型号核对负载、臂展、节拍、防护和安全功能。", "Verify payload, reach, cycle time, protection, and safety by model."), ["manufacturing", "integration"], "https://www.universal-robots.com/products/"),
      p("UR20 / UR30", "robot-platform", "robot-platform", "industrial-arm", l("高负载新一代协作机械臂", "Higher-payload next-generation cobots"), l("面向码垛、机床和更高负载操作。", "Targets palletizing, machine tending, and higher-payload handling."), l("使用新一代关节与 PolyScope 软件生态。", "Uses a newer joint platform with the PolyScope ecosystem."), l("核对动态负载、工具重心、安全配置和地基刚度。", "Verify dynamic payload, tool center of mass, safety configuration, and mounting stiffness."), ["manufacturing", "integration"], "https://www.universal-robots.com/products/")
    ],
  },
  {
    slug: "franka-robotics", name: l("Franka Robotics", "Franka Robotics"), countryCode: "de", country: l("德国", "Germany"), headquarters: l("慕尼黑", "Munich"), founded: "2016",
    role: l("力控协作机械臂与研究平台厂商", "Torque-controlled cobot and research-platform company"), summary: l("Franka FR3 以关节力矩传感、轻量结构和研究接口著称，适合精密操作、机器人学习和轻型自动化。工业可用性取决于具体控制、认证和应用配置。", "Franka FR3 combines joint torque sensing, a lightweight structure, and research access for precision manipulation, robot learning, and light automation. Industrial suitability depends on control, certification, and application configuration."),
    businessAreas: [l("力控机械臂", "Torque-controlled arms"), l("研究接口与机器人学习", "Research interfaces and robot learning")], customers: [l("高校实验室、研发团队和轻型自动化集成商", "University labs, R&D teams, and light-automation integrators")], officialUrl: "https://franka.de/",
    scope: l("官网当前 FR3 平台及其研究/工业配置。", "Current official FR3 platform and its research or industrial configurations."), coverage: "family-complete",
    products: [p("Franka Research 3 (FR3)", "robot-platform", "robot-platform", "industrial-arm", l("七轴力控机械臂", "Seven-axis torque-controlled arm"), l("面向机器人研究、学习、精密操作和柔顺控制。", "Targets robotics research, learning, precision manipulation, and compliant control."), l("关节力矩传感、控制器、FCI 实时接口、ROS 2 与夹爪生态。", "Joint torque sensing, controller, FCI real-time interface, ROS 2, and gripper ecosystem."), l("核对控制许可、系统镜像、实时主机配置、末端负载、安全认证和交付附件。", "Verify control license, system image, real-time host configuration, end load, safety certification, and delivered accessories."), ["research", "manufacturing", "integration"], "https://franka.de/franka-research-3-cobot", [
      { label: l("自由度", "Degrees of freedom"), value: l("7", "7") },
      { label: l("额定负载", "Rated payload"), value: l("3 kg", "3 kg") },
      { label: l("最大工作半径", "Maximum reach"), value: l("855 mm", "855 mm") },
      { label: l("重复定位精度", "Position repeatability"), value: l("<±0.1 mm", "<±0.1 mm") },
      { label: l("工作空间覆盖率", "Workspace coverage"), value: l("94.5%", "94.5%") },
      { label: l("关节力矩传感器", "Joint torque sensors"), value: l("7 个，每轴一个", "7, one per axis") },
      { label: l("低层控制与状态频率", "Low-level control and state rate"), value: l("1 kHz（FCI）", "1 kHz (FCI)") },
      { label: l("机械臂质量", "Arm mass"), value: l("约 17.8 kg", "about 17.8 kg") },
      { label: l("防护等级", "Ingress protection"), value: l("IP40", "IP40") },
      { label: l("研究接口", "Research interfaces"), value: l("FCI、libfranka、ROS 2、MATLAB", "FCI, libfranka, ROS 2, and MATLAB") }
    ])],
  },
  {
    slug: "kinova", name: l("Kinova", "Kinova"), countryCode: "ca", country: l("加拿大", "Canada"), headquarters: l("魁北克省布瓦布里扬", "Boisbriand, Quebec"), founded: "2006",
    role: l("轻量机械臂与辅助机器人厂商", "Lightweight manipulator and assistive-robotics company"), summary: l("Kinova 产品覆盖 Gen3 研究机械臂、Link 6 工业协作臂和 JACO 辅助机械臂。研究、工业和医疗辅助用途的认证、接口与支持边界不同。", "Kinova spans Gen3 research arms, the Link 6 industrial cobot, and JACO assistive arms. Research, industrial, and assistive-medical use have different certification, interface, and support boundaries."),
    businessAreas: [l("轻量研究机械臂", "Lightweight research arms"), l("工业协作与辅助机械臂", "Industrial cobots and assistive arms")], customers: [l("机器人实验室、制造集成商和辅助技术用户", "Robotics labs, manufacturing integrators, and assistive-technology users")], officialUrl: "https://www.kinovarobotics.com/",
    scope: l("官网当前 Gen3、Link 和辅助机器人系列；历史代际不重复。", "Current official Gen3, Link, and assistive families; historical generations are not duplicated."), coverage: "model-partial",
    products: [
      p("KINOVA Gen3 / Gen3 lite", "robot-platform", "robot-platform", "industrial-arm", l("轻量研究机械臂", "Lightweight research robot arms"), l("面向操作研究、移动操作和机器人学习。", "Targets manipulation research, mobile manipulation, and robot learning."), l("ROS、API、视觉和末端按配置组合。", "ROS, APIs, vision, and end effectors vary by configuration."), l("核对轴数、负载、臂展、控制权限和软件版本。", "Verify axes, payload, reach, control access, and software version."), ["research", "integration"], "https://www.kinovarobotics.com/product/gen3-robots"),
      p("KINOVA Link 6", "robot-platform", "robot-platform", "industrial-arm", l("工业协作机器人", "Industrial collaborative robot"), l("面向制造自动化与协作工作站。", "Targets manufacturing automation and collaborative workcells."), l("工业控制、安全和应用工具按项目配置。", "Industrial control, safety, and application tooling are project-specific."), l("核对认证、负载、节拍、防护、工具和系统接口。", "Verify certification, payload, cycle time, protection, tooling, and system interfaces."), ["manufacturing", "integration"], "https://www.kinovarobotics.com/product/link-6-cobot")
    ],
  },
  {
    slug: "dobot", name: l("越疆科技", "DOBOT"), legalName: l("深圳市越疆科技股份有限公司", "Shenzhen Dobot Corp Ltd"), countryCode: "cn", country: l("中国", "China"), headquarters: l("深圳", "Shenzhen"), founded: "2015",
    role: l("协作机器人、桌面机器人与人形平台厂商", "Cobot, desktop-robot, and humanoid-platform company"), summary: l("DOBOT 的公开产品从桌面教育机械臂扩展到 CR/CRA 协作机器人、SCARA、工业应用和人形平台。选型需要按系列锁定控制器、负载、臂展和安全配置。", "DOBOT spans desktop educational arms, CR/CRA cobots, SCARA products, industrial applications, and humanoid platforms. Selection must lock the series, controller, payload, reach, and safety configuration."),
    businessAreas: [l("协作与工业机械臂", "Collaborative and industrial arms"), l("桌面教育与人形平台", "Desktop education and humanoid platforms")], customers: [l("制造、教育、科研和系统集成商", "Manufacturing, education, research, and system integrators")], officialUrl: "https://www.dobot-robots.com/",
    scope: l("官网当前机器人系列，按产品家族收录；同系列负载型号在详情中列出。", "Current official robot families, indexed by family; payload variants are listed within details."), coverage: "model-partial",
    products: [
      p("CRA / CR collaborative robot families", "robot-platform", "robot-platform", "industrial-arm", l("六轴协作机器人系列", "Six-axis collaborative robot families"), l("覆盖不同负载和臂展的装配、上下料、焊接和搬运。", "Covers assembly, tending, welding, and handling across payload and reach variants."), l("控制柜、示教、视觉、末端和工业协议按型号配置。", "Controller, teaching, vision, tooling, and industrial protocols vary by model."), l("核对型号、负载、臂展、重复精度、防护和安全认证。", "Verify model, payload, reach, repeatability, protection, and safety certification."), ["manufacturing", "integration"], "https://www.dobot-robots.com/products/cobot.html"),
      p("Nova / MG400 / Magician desktop families", "robot-platform", "robot-platform", "industrial-arm", l("轻量桌面机器人系列", "Light desktop robot families"), l("面向教育、零售、轻型搬运和桌面自动化。", "Targets education, retail, light handling, and desktop automation."), l("桌面控制、视觉与教育软件随系列变化。", "Desktop control, vision, and education software vary by family."), l("核对用途认证、负载、工作空间、精度和连续运行。", "Verify intended-use certification, payload, workspace, accuracy, and continuous duty."), ["research", "service", "integration"], "https://www.dobot-robots.com/products/desktop-four-axis.html")
    ],
  },
  {
    slug: "jaka-robotics", name: l("节卡机器人", "JAKA Robotics"), legalName: l("上海节卡机器人科技有限公司", "JAKA Robotics Co., Ltd."), countryCode: "cn", country: l("中国", "China"), headquarters: l("上海", "Shanghai"), founded: "2014",
    role: l("协作机器人厂商", "Collaborative-robot company"), summary: l("JAKA 产品覆盖 Zu、Pro、Alls、MiniCobo 等协作系列，并针对防护、洁净、视觉和特定行业提供配置。系列名称不能替代具体型号的负载和臂展核验。", "JAKA offers Zu, Pro, Alls, MiniCobo, and related cobot families with protection, cleanroom, vision, and industry-specific options. Family names do not replace model-level payload and reach checks."),
    businessAreas: [l("协作机械臂", "Collaborative robot arms"), l("视觉、行业应用与控制软件", "Vision, industry applications, and control software")], customers: [l("汽车、电子、金属、食品和通用制造集成商", "Automotive, electronics, metal, food, and general manufacturing integrators")], officialUrl: "https://www.jaka.com/",
    scope: l("官网当前协作机器人家族；型号级参数在后续数据批次拆分。", "Current official cobot families; model-level specifications are split in later data batches."), coverage: "model-partial",
    products: [
      p("JAKA Zu / Pro / Alls families", "robot-platform", "robot-platform", "industrial-arm", l("工业协作机器人系列", "Industrial collaborative robot families"), l("覆盖通用、增强防护和柔性装配应用。", "Covers general, enhanced-protection, and flexible-assembly applications."), l("控制器、工业总线、视觉和末端生态按型号配置。", "Controller, industrial buses, vision, and tooling vary by model."), l("核对负载、臂展、重复精度、防护、洁净等级和认证。", "Verify payload, reach, repeatability, protection, cleanroom rating, and certification."), ["manufacturing", "integration"], "https://www.jaka.com/product"),
      p("JAKA MiniCobo", "robot-platform", "robot-platform", "industrial-arm", l("紧凑型协作机器人", "Compact collaborative robot"), l("面向桌面、教育、零售和轻型装配。", "Targets desktop, education, retail, and light assembly."), l("紧凑控制器、图形化编程和配件生态。", "Compact controller, graphical programming, and accessory ecosystem."), l("核对负载、工作半径、连续节拍和用途认证。", "Verify payload, reach, continuous cycle, and intended-use certification."), ["research", "service", "manufacturing"], "https://www.jaka.com/product")
    ],
  },
  {
    slug: "elite-robots", name: l("艾利特机器人", "Elite Robots"), countryCode: "cn", country: l("中国", "China"), headquarters: l("苏州", "Suzhou"), founded: "2016",
    role: l("协作机器人厂商", "Collaborative-robot company"), summary: l("Elite Robots 提供 CS、EC 等协作机器人系列，覆盖不同负载、臂展与工业防护需求。产品对比应以具体型号和控制系统代际为准。", "Elite Robots offers CS, EC, and related cobot families across payload, reach, and industrial-protection requirements. Comparisons should use the specific model and controller generation."),
    businessAreas: [l("协作机械臂", "Collaborative robot arms"), l("控制器与应用生态", "Controllers and application ecosystem")], customers: [l("制造业和自动化系统集成商", "Manufacturers and automation system integrators")], officialUrl: "https://www.eliterobots.com/",
    scope: l("官网当前 CS/EC 产品家族；区域版本差异按当地官网确认。", "Current CS and EC families; regional variants require local-site confirmation."), coverage: "model-partial",
    products: [p("CS / EC collaborative robot families", "robot-platform", "robot-platform", "industrial-arm", l("六轴协作机器人系列", "Six-axis collaborative robot families"), l("覆盖焊接、码垛、上下料、装配和检测。", "Covers welding, palletizing, tending, assembly, and inspection."), l("控制柜、编程、工业协议和末端工具按系列配置。", "Controller, programming, industrial protocols, and tooling vary by family."), l("按型号核对负载、臂展、精度、防护、安全和软件版本。", "Verify payload, reach, accuracy, protection, safety, and software by model."), ["manufacturing", "integration"], "https://www.eliterobots.com/products/")],
  },
  {
    slug: "aubo-robotics", name: l("遨博智能", "AUBO Robotics"), countryCode: "cn", country: l("中国", "China"), headquarters: l("北京", "Beijing"), founded: "2015",
    role: l("协作机器人厂商", "Collaborative-robot company"), summary: l("AUBO 的 i 系列及后续产品覆盖不同负载协作机械臂，面向装配、码垛、焊接和机床上下料。应用能力取决于末端、视觉、工艺包和集成质量。", "AUBO's i-series and newer cobots span multiple payload classes for assembly, palletizing, welding, and machine tending. Application capability depends on tooling, vision, process packages, and integration quality."),
    businessAreas: [l("协作机械臂", "Collaborative robot arms"), l("工业应用解决方案", "Industrial application solutions")], customers: [l("汽车、3C、金属和通用制造用户", "Automotive, electronics, metal, and general manufacturing users")], officialUrl: "https://www.aubo-robotics.cn/",
    scope: l("官网当前协作机器人家族；各负载型号后续拆为型号级数据。", "Current official cobot families; payload variants will be split into model-level records."), coverage: "model-partial",
    products: [p("AUBO i-series collaborative robots", "robot-platform", "robot-platform", "industrial-arm", l("六轴协作机器人系列", "Six-axis collaborative robot family"), l("覆盖多负载等级的工业协作任务。", "Covers industrial collaborative tasks across payload classes."), l("控制器、示教、工业通信和应用工艺包按项目组合。", "Controller, teaching, industrial communication, and process packages are project-specific."), l("核对具体型号、负载、臂展、精度、防护和认证。", "Verify model, payload, reach, accuracy, protection, and certification."), ["manufacturing", "integration"], "https://www.aubo-robotics.cn/product/")],
  },
  {
    slug: "techman-robot", name: l("达明机器人", "Techman Robot"), countryCode: "tw", country: l("中国台湾", "Taiwan, China"), headquarters: l("桃园", "Taoyuan"), founded: "2015",
    role: l("视觉协作机器人厂商", "Vision-integrated collaborative-robot company"), summary: l("Techman Robot 将内置视觉与协作机械臂结合，TM AI Cobot 和 S 系列覆盖不同负载与臂展。内置视觉能降低部分集成工作，但不能替代工位光学验证。", "Techman Robot combines integrated vision with cobots. TM AI Cobot and S-series models span payload and reach classes; integrated vision reduces some integration effort but does not replace workcell optical validation."),
    businessAreas: [l("视觉协作机械臂", "Vision-integrated cobots"), l("工厂自动化软件", "Factory automation software")], customers: [l("电子、机床、物流和通用制造集成商", "Electronics, machine-tool, logistics, and general manufacturing integrators")], officialUrl: "https://www.tm-robot.com/",
    scope: l("官网当前 TM AI Cobot 与 S 系列。", "Current official TM AI Cobot and S-series families."), coverage: "model-partial",
    products: [p("TM AI Cobot / S series", "robot-platform", "robot-platform", "industrial-arm", l("内置视觉协作机器人系列", "Vision-integrated cobot families"), l("面向视觉定位、上下料、装配、检测和码垛。", "Targets vision-guided tending, assembly, inspection, and palletizing."), l("机械臂、内置视觉、控制软件和工业协议集成。", "Combines arm, integrated vision, control software, and industrial protocols."), l("按型号核对负载、臂展、视觉视场、光照、精度和安全。", "Verify payload, reach, vision FOV, lighting, accuracy, and safety by model."), ["manufacturing", "integration"], "https://www.tm-robot.com/en/products/")],
  },
  {
    slug: "kassow-robots", name: l("Kassow Robots", "Kassow Robots"), countryCode: "dk", country: l("丹麦", "Denmark"), headquarters: l("哥本哈根", "Copenhagen"), founded: "2018",
    role: l("七轴协作机器人厂商", "Seven-axis collaborative-robot company"), summary: l("Kassow Robots 的七轴机械臂强调冗余运动和狭小空间可达性，型号以负载与臂展组合区分。额外一轴改善路径灵活性，但也需要更完整的编程与碰撞验证。", "Kassow Robots' seven-axis cobots emphasize kinematic redundancy and access in constrained spaces. Models differ by payload and reach; the extra axis improves path flexibility but requires fuller programming and collision validation."),
    businessAreas: [l("七轴协作机械臂", "Seven-axis collaborative arms")], customers: [l("机床、装配、包装和狭小工位自动化用户", "Machine-tending, assembly, packaging, and constrained-workcell users")], officialUrl: "https://www.kassowrobots.com/",
    scope: l("官网当前 KR 产品型号。", "Current official KR models."), coverage: "model-partial",
    products: [p("KR seven-axis cobot family", "robot-platform", "robot-platform", "industrial-arm", l("七轴协作机器人系列", "Seven-axis cobot family"), l("通过冗余关节改善绕障、狭小空间和复杂姿态作业。", "Uses kinematic redundancy for obstacle avoidance, constrained spaces, and complex poses."), l("控制器、示教软件和末端工具按应用配置。", "Controller, teaching software, and tooling are application-specific."), l("按型号核对负载、臂展、速度、精度、奇异位形和安全。", "Verify payload, reach, speed, accuracy, singularities, and safety by model."), ["manufacturing", "integration"], "https://www.kassowrobots.com/products")],
  },
  {
    slug: "ufactory", name: l("UFACTORY", "UFACTORY"), countryCode: "cn", country: l("中国", "China"), headquarters: l("深圳", "Shenzhen"), founded: "2013",
    role: l("轻量机械臂与机器人开发平台厂商", "Lightweight robot-arm and development-platform company"), summary: l("UFACTORY 的 xArm 和 Lite 系列面向研究、教育与轻型自动化，提供 API、ROS 和配套夹爪。不同代际和轴数的负载、臂展与控制器需分别核验。", "UFACTORY's xArm and Lite families serve research, education, and light automation with APIs, ROS, and grippers. Payload, reach, and controller vary by generation and axis count."),
    businessAreas: [l("轻量机械臂", "Lightweight robot arms"), l("开发接口与末端工具", "Development interfaces and end effectors")], customers: [l("教育、研究、餐饮、零售和轻型制造开发者", "Education, research, food service, retail, and light-manufacturing developers")], officialUrl: "https://www.ufactory.cc/",
    scope: l("官网当前 xArm、Lite 与 850 系列；配件单独记录。", "Current official xArm, Lite, and 850 families; accessories are separate records."), coverage: "model-partial",
    products: [
      p("xArm 5 / 6 / 7", "robot-platform", "robot-platform", "industrial-arm", l("轻量协作机械臂系列", "Lightweight collaborative arm family"), l("按轴数覆盖不同研究与轻型自动化任务。", "Covers research and light automation across axis counts."), l("Python/C++ API、ROS、控制箱和夹爪生态。", "Python/C++ APIs, ROS, controller, and gripper ecosystem."), l("按型号核对轴数、负载、臂展、精度、防护和控制频率。", "Verify axes, payload, reach, repeatability, protection, and control rate by model."), ["research", "manufacturing", "integration"], "https://www.ufactory.cc/xarm-collaborative-robot/"),
      p("Lite 6", "robot-platform", "robot-platform", "industrial-arm", l("入门级六轴机械臂", "Entry-level six-axis robot arm"), l("面向教育、桌面研究和轻型取放。", "Targets education, desktop research, and light pick-and-place."), l("API、ROS 和轻量末端工具。", "APIs, ROS, and lightweight tooling."), l("核对负载、工作半径、连续运行和安全用途边界。", "Verify payload, workspace, continuous duty, and intended-use safety boundary."), ["research", "integration"], "https://www.ufactory.cc/lite-6-collaborative-robot/")
    ],
  },
  {
    slug: "elephant-robotics", name: l("大象机器人", "Elephant Robotics"), countryCode: "cn", country: l("中国", "China"), headquarters: l("深圳", "Shenzhen"), founded: "2016",
    role: l("桌面机械臂、人形与教育机器人厂商", "Desktop-arm, humanoid, and educational-robot company"), summary: l("Elephant Robotics 产品覆盖 myCobot 桌面机械臂、Mercury 双臂平台、mechArm、myArm 和移动底盘。产品线更新快，型号名称、控制器和开源程度必须按当前页面确认。", "Elephant Robotics spans myCobot desktop arms, Mercury dual-arm platforms, mechArm, myArm, and mobile bases. The catalog changes quickly, so model name, controller, and openness require current page checks."),
    businessAreas: [l("桌面与教育机械臂", "Desktop and educational arms"), l("双臂、移动与人形开发平台", "Dual-arm, mobile, and humanoid development platforms")], customers: [l("教育、创客、实验室和轻型应用开发者", "Education, makers, laboratories, and light-application developers")], officialUrl: "https://www.elephantrobotics.com/",
    scope: l("官网当前主要机器人家族；同系列计算平台版本合并到型号选项。", "Current major robot families; compute-platform variants are consolidated as model options."), coverage: "model-partial",
    products: [
      p("myCobot / mechArm / myArm families", "robot-platform", "robot-platform", "industrial-arm", l("桌面多轴机械臂系列", "Desktop multi-axis robot-arm families"), l("覆盖教育、视觉、ROS 和轻型操作原型。", "Covers education, vision, ROS, and light-manipulation prototypes."), l("不同控制器、计算平台、夹爪和相机配件组合。", "Combines different controllers, compute platforms, grippers, and cameras."), l("按具体型号核对负载、臂展、精度、控制频率和连续工况。", "Verify payload, reach, accuracy, control rate, and continuous duty by model."), ["research", "integration"], "https://www.elephantrobotics.com/en/product/"),
      p("Mercury dual-arm family", "robot-platform", "robot-platform", "robot-platform-general", l("双臂具身开发平台", "Dual-arm embodied-development platform"), l("面向双臂协同、视觉和具身操作研究。", "Targets bimanual coordination, vision, and embodied manipulation research."), l("双臂、视觉、移动或桌面结构与软件工具链组合。", "Combines dual arms, vision, mobile or desktop structure, and software tooling."), l("核对版本、自由度、负载、控制接口、同步和安全边界。", "Verify edition, DoF, payload, control interfaces, synchronization, and safety."), ["research", "integration"], "https://www.elephantrobotics.com/en/product/")
    ],
  },
  {
    slug: "onrobot", name: l("OnRobot", "OnRobot"), countryCode: "dk", country: l("丹麦", "Denmark"), headquarters: l("欧登塞", "Odense"), founded: "2018",
    role: l("协作机器人末端工具与应用软件厂商", "Cobot tooling and application-software company"), summary: l("OnRobot 的产品覆盖电动与真空夹爪、磁性抓具、力矩传感、砂光、螺丝锁付、视觉和部署软件，目标是跨机器人品牌复用末端应用。", "OnRobot offers electric, vacuum, and magnetic grippers, force/torque sensing, sanding, screwdriving, vision, and deployment software for cross-brand cobot applications."),
    businessAreas: [l("夹爪和末端工具", "Grippers and end tools"), l("应用软件与快速部署", "Application software and rapid deployment")], customers: [l("协作机器人用户与自动化集成商", "Cobot users and automation integrators")], officialUrl: "https://onrobot.com/",
    scope: l("官网当前末端工具家族；尺寸或负载变体合并到同一系列。", "Current official end-tool families; size or payload variants are consolidated by family."), coverage: "model-partial",
    products: [
      p("RG / 2FG / 3FG electric grippers", "end-effector", "manipulator-end-effector", "gripper", l("电动夹爪系列", "Electric gripper families"), l("覆盖通用两指、内抓外抓和三指自定心应用。", "Covers general two-finger, internal/external, and three-finger centering applications."), l("Quick Changer、统一控制和机器人品牌插件。", "Quick Changer, unified control, and robot-brand plugins."), l("按型号核对行程、夹力、负载、指尖、防护和工件公差。", "Verify stroke, grip force, payload, fingers, protection, and part tolerance by model."), ["manufacturing", "integration"], "https://onrobot.com/en/products"),
      p("VG / VGC / MG / Gecko grippers", "end-effector", "manipulator-end-effector", "gripper", l("真空、磁性与仿生抓取系列", "Vacuum, magnetic, and gecko-inspired grippers"), l("覆盖纸箱、板材、金属和多孔工件。", "Covers cartons, sheet materials, metal, and porous parts."), l("真空、磁性或干式黏附原理与统一工具接口。", "Uses vacuum, magnetic, or dry-adhesion principles with common tooling interfaces."), l("核对材料、表面、泄漏、保持力、断电安全和污染。", "Verify material, surface, leakage, holding force, power-loss safety, and contamination."), ["manufacturing", "logistics"], "https://onrobot.com/en/products"),
      p("HEX / Eyes / Sander / Screwdriver", "end-effector", "manipulator-end-effector", "end-effector-general", l("力控、视觉与工艺工具系列", "Force-control, vision, and process-tool family"), l("支持力控工艺、视觉定位、砂光和螺丝锁付。", "Supports force processes, vision guidance, sanding, and screwdriving."), l("与机械臂、工艺软件和工具快换集成。", "Integrates with robot arms, process software, and tool changers."), l("按工艺核对精度、力控带宽、耗材、节拍和安全。", "Verify accuracy, force-control bandwidth, consumables, cycle time, and safety by process."), ["manufacturing", "integration"], "https://onrobot.com/en/products"),
      p("Quick Changer / Dual Quick Changer", "end-effector", "manipulator-end-effector", "tool-changer", l("协作机器人手动与双工具快换系列", "Manual and dual-tool cobot changer family"), l("用于在统一机械与电气接口上更换或并联两个末端工具。", "Supports changing or combining two end tools through a common mechanical and electrical interface."), l("与 OnRobot 工具、机器人法兰和统一控制系统组合。", "Integrates with OnRobot tools, robot flanges, and the common control system."), l("核对载荷、偏心距、法兰、触点、人工换装步骤和安全锁定。", "Verify payload, offset, flange, contacts, manual change procedure, and safe locking."), ["manufacturing", "integration"], "https://onrobot.com/en/products")
    ],
  },
  {
    slug: "sake-robotics", name: l("SAKE Robotics", "SAKE Robotics"), countryCode: "us", country: l("美国", "United States"), headquarters: l("加利福尼亚州", "California"),
    role: l("自适应机器人夹爪厂商", "Adaptive robotic-gripper company"), summary: l("SAKE Robotics 的 EZGripper 采用欠驱动手指，用较少执行器适应不同形状工件，常见于研究、轻型抓取和移动操作原型。", "SAKE Robotics' EZGripper uses underactuated fingers to conform to varied objects with fewer actuators, often in research, light grasping, and mobile-manipulation prototypes."),
    businessAreas: [l("欠驱动自适应夹爪", "Underactuated adaptive grippers")], customers: [l("机器人研究、教育和移动操作开发团队", "Robotics research, education, and mobile-manipulation developers")], officialUrl: "https://sakerobotics.com/",
    scope: l("官网公开的 EZGripper 系列与配件。", "Official EZGripper family and accessories."), coverage: "family-complete",
    products: [p("EZGripper", "end-effector", "manipulator-end-effector", "gripper", l("欠驱动自适应两指夹爪", "Underactuated adaptive two-finger gripper"), l("通过柔顺欠驱动结构适应不同物体外形，官网提供 ROS 与非 ROS 开源驱动、URDF 和三维模型。", "Uses compliant underactuation to conform to varied object shapes and includes open-source ROS and non-ROS drivers, URDF, and 3D models."), l("DYNAMIXEL 舵机、手指、安装件、12 V 供电和 USB 转 RS-485 接口组成套件。", "Combines a DYNAMIXEL servo, fingers, mount, 12 V supply, and USB-to-RS-485 interface."), l("公开负载分别对应 9 cm 管件的包络抓取与夹持抓取，不能直接外推到其他物体、姿态或加速度。", "Published payloads apply to enveloping and pinch grasps on a 9 cm pipe and must not be generalized to other objects, orientations, or accelerations."), ["research", "integration"], "https://sakerobotics.com/", [
      { label: l("抓取宽度", "Grasp width"), value: l("145 mm", "145 mm") },
      { label: l("包络抓取负载", "Enveloping-grasp payload"), value: l("5 kg（9 cm 管件）", "5 kg (9 cm pipe)") },
      { label: l("夹持抓取负载", "Pinch-grasp payload"), value: l("2.5 kg（9 cm 管件）", "2.5 kg (9 cm pipe)") },
      { label: l("夹爪质量", "Gripper mass"), value: l("365 g；安装件另加 35 g", "365 g plus 35 g mount") },
      { label: l("抓力", "Grasp force"), value: l("35 N", "35 N") },
      { label: l("舵机", "Servo"), value: l("ROBOTIS DYNAMIXEL MX-64AR", "ROBOTIS DYNAMIXEL MX-64AR") },
      { label: l("工作电压", "Operating voltage"), value: l("12 V", "12 V") },
      { label: l("软件资料", "Software resources"), value: l("开源 ROS/非 ROS 驱动、URDF、三维模型", "Open-source ROS/non-ROS drivers, URDF, and 3D models") },
      { label: l("连接", "Connection"), value: l("USB 转 RS-485", "USB to RS-485") }
    ])],
  },
  {
    slug: "bota-systems", name: l("Bota Systems", "Bota Systems"), countryCode: "ch", country: l("瑞士", "Switzerland"), headquarters: l("苏黎世", "Zurich"), founded: "2020",
    role: l("机器人六维力/力矩传感器厂商", "Robotic six-axis force/torque sensor company"), summary: l("Bota Systems 专注紧凑六维力/力矩传感器，产品覆盖 EtherCAT、CAN、串行和不同机械尺寸，常用于机器人腕部、装配和研究。", "Bota Systems focuses on compact six-axis force/torque sensors across EtherCAT, CAN, serial, and mechanical formats for robot wrists, assembly, and research."),
    businessAreas: [l("六维力/力矩传感器", "Six-axis force/torque sensors"), l("机器人力控集成", "Robot force-control integration")], customers: [l("机器人厂商、研究实验室和力控自动化集成商", "Robot OEMs, research labs, and force-control integrators")], officialUrl: "https://botasystems.com/",
    scope: l("官网当前 MiniONE、SensONE、Rokubi 等系列；量程变体作为型号选项。", "Current MiniONE, SensONE, Rokubi, and related families; range variants are model options."), coverage: "model-partial",
    products: [p("MiniONE / SensONE / Rokubi F/T families", "perception", "sensing", "force-torque-sensor", l("机器人六维力/力矩传感器系列", "Robotic six-axis force/torque sensor families"), l("覆盖紧凑腕部、通孔和较高量程测量。", "Covers compact wrist, through-hole, and higher-range measurements."), l("EtherCAT、CAN、串行或 USB 取决于型号和电子系统。", "EtherCAT, CAN, serial, or USB depends on model and electronics."), l("按型号核对六轴量程、过载、噪声、采样、同步和安装。", "Verify six-axis ranges, overload, noise, sampling, synchronization, and mounting by model."), ["research", "manufacturing", "integration"], "https://botasystems.com/")],
  },
  {
    slug: "robotous", name: l("ROBOTous", "ROBOTous"), countryCode: "kr", country: l("韩国", "South Korea"), headquarters: l("首尔", "Seoul"),
    role: l("机器人力/力矩与扭矩传感器厂商", "Robot force/torque and torque-sensor company"), summary: l("ROBOTous 提供 RFT 多轴力/力矩传感器及机器人力控相关产品，型号覆盖不同尺寸、量程和接口。选型必须使用完整订货型号而非系列名。", "ROBOTous provides RFT multi-axis force/torque sensors and force-control products across sizes, ranges, and interfaces. Selection requires the full ordering model rather than only the family name."),
    businessAreas: [l("多轴力/力矩传感", "Multi-axis force/torque sensing"), l("机器人力控", "Robot force control")], customers: [l("机器人、自动化、测试和研究团队", "Robotics, automation, test, and research teams")], officialUrl: "https://www.robotous.com/",
    scope: l("官网当前 RFT 产品家族；量程和接口变体按型号管理。", "Current official RFT families; range and interface variants are model-managed."), coverage: "model-partial",
    products: [p("RFT force/torque sensor family", "perception", "sensing", "force-torque-sensor", l("六维力/力矩传感器系列", "Six-axis force/torque sensor family"), l("用于腕部力控、装配、打磨、碰撞检测和测量。", "Used for wrist force control, assembly, finishing, collision detection, and measurement."), l("传感器、放大器或数字接口按型号组合。", "Sensor, amplifier, and digital interface vary by model."), l("核对量程、过载、分辨率、采样率、温漂和坐标标定。", "Verify range, overload, resolution, sampling, thermal drift, and coordinate calibration."), ["manufacturing", "research", "integration"], "https://www.robotous.com/")],
  },
  {
    slug: "sensodrive", name: l("SENSODRIVE", "SENSODRIVE"), countryCode: "de", country: l("德国", "Germany"), headquarters: l("韦斯灵", "Wessling"),
    role: l("扭矩传感器与力反馈执行器厂商", "Torque-sensor and force-feedback actuator company"), summary: l("SENSODRIVE 提供静态和旋转扭矩传感器、力反馈旋转执行器及机器人关节相关产品。选型需要区分测量元件、完整执行器和安全人机交互用途。", "SENSODRIVE offers static and rotating torque sensors, force-feedback rotary actuators, and robotic-joint products. Selection must distinguish measurement components, complete actuators, and human-interaction use."),
    businessAreas: [l("扭矩传感与力反馈", "Torque sensing and force feedback"), l("机器人关节执行器", "Robotic-joint actuators")], customers: [l("机器人、医疗、驾驶模拟和人机交互设备开发团队", "Robotics, medical, driving-simulation, and human-machine-interface developers")], officialUrl: "https://www.sensodrive.de/",
    scope: l("官网机器人相关扭矩传感器和执行器家族；定制项目不计入标准目录。", "Official robotics-related torque-sensor and actuator families; custom projects are outside the standard catalog."), coverage: "model-partial",
    products: [p("Torque sensor and force-feedback actuator families", "perception", "sensing", "force-torque-sensor", l("扭矩传感与力反馈产品系列", "Torque-sensing and force-feedback families"), l("覆盖关节扭矩测量、旋转力反馈和安全人机交互。", "Covers joint-torque measurement, rotary force feedback, and safe human interaction."), l("传感器、执行器、编码器和控制电子按系列组合。", "Sensors, actuators, encoders, and control electronics vary by family."), l("核对量程、过载、精度、带宽、安装刚度和安全功能。", "Verify range, overload, accuracy, bandwidth, mounting stiffness, and safety functions."), ["manufacturing", "research", "integration"], "https://www.sensodrive.de/products/torque-technology-torque-sensors.php")],
  },
  {
    slug: "leptrino", name: l("Leptrino", "Leptrino"), countryCode: "jp", country: l("日本", "Japan"), headquarters: l("长野", "Nagano"),
    role: l("小型多轴力传感器厂商", "Compact multi-axis force-sensor company"), summary: l("Leptrino 提供小型六轴力传感器和测量接口，常用于机器人手腕、夹爪、测试装置和研究。不同系列在尺寸、量程和数字接口上差异明显。", "Leptrino provides compact six-axis force sensors and measurement interfaces for robot wrists, grippers, test rigs, and research. Families differ materially in size, range, and digital interface."),
    businessAreas: [l("小型六轴力传感器", "Compact six-axis force sensors"), l("测量接口与放大器", "Measurement interfaces and amplifiers")], customers: [l("机器人研发、测量和精密自动化团队", "Robotics R&D, measurement, and precision-automation teams")], officialUrl: "https://www.leptrino.co.jp/",
    scope: l("官网当前多轴力传感器家族；量程型号后续拆分。", "Current multi-axis force-sensor families; range variants are split later."), coverage: "model-partial",
    products: [p("PFS / FFS multi-axis force sensor families", "perception", "sensing", "force-torque-sensor", l("紧凑六维力传感器系列", "Compact six-axis force-sensor families"), l("用于小型机器人腕部、夹爪和测量装置。", "Used in small robot wrists, grippers, and measurement fixtures."), l("传感器与放大/数字接口按系列组合。", "Sensors pair with amplifier or digital interfaces by family."), l("核对量程、过载、分辨率、采样、线缆和安装预紧。", "Verify range, overload, resolution, sampling, cable, and mounting preload."), ["research", "integration", "manufacturing"], "https://www.leptrino.co.jp/product")],
  },
  {
    slug: "wacoh-tech", name: l("WACOH-TECH", "WACOH-TECH"), countryCode: "jp", country: l("日本", "Japan"), headquarters: l("富山", "Toyama"),
    role: l("力觉与触觉传感器厂商", "Force and tactile-sensor company"), summary: l("WACOH-TECH 公开产品覆盖六轴力觉、触觉和机器人接触测量。产品适合腕部力控、指端接触和研究，但量程、封装与接口需按型号确认。", "WACOH-TECH publishes six-axis force, tactile, and robotic-contact sensors for wrist force control, fingertip contact, and research; range, packaging, and interface are model-specific."),
    businessAreas: [l("六轴力觉传感", "Six-axis force sensing"), l("触觉与接触传感", "Tactile and contact sensing")], customers: [l("机器人、研究、医疗和精密设备开发团队", "Robotics, research, medical, and precision-device developers")], officialUrl: "https://wacoh-tech.com/en/",
    scope: l("官网机器人相关力觉与触觉产品家族。", "Official robotics-related force and tactile product families."), coverage: "model-partial",
    products: [p("DynPick force/torque sensor family", "perception", "sensing", "force-torque-sensor", l("六维力/力矩传感器系列", "Six-axis force/torque sensor family"), l("用于机器人腕部、装配、研究和接触测量。", "Used for robot wrists, assembly, research, and contact measurement."), l("传感器、放大器和接口按型号组合。", "Sensor, amplifier, and interface depend on model."), l("核对量程、过载、分辨率、采样、温漂和安装。", "Verify range, overload, resolution, sampling, drift, and mounting."), ["research", "manufacturing", "integration"], "https://wacoh-tech.com/en/")],
  },
  {
    slug: "kuka", name: l("KUKA", "KUKA"), legalName: l("库卡股份公司", "KUKA Aktiengesellschaft"), countryCode: "de", country: l("德国", "Germany"), headquarters: l("奥格斯堡", "Augsburg"), founded: "1898",
    role: l("工业机器人、协作机器人与自动化系统厂商", "Industrial-robot, cobot, and automation-system company"), summary: l("KUKA 的机器人本体覆盖并联、SCARA、协作、小负载到重负载六轴平台，并配套控制器、软件和外围设备。不同系列的负载、臂展、安装方式和环境版本差异很大，选型应进入具体型号而不是仅按品牌判断。", "KUKA spans delta, SCARA, collaborative, small-payload, and heavy-payload robot platforms, with matching controllers, software, and periphery. Payload, reach, mounting, and environmental variants differ substantially, so selection must resolve to a specific model rather than the brand alone."),
    businessAreas: [l("工业与协作机器人本体", "Industrial robots and cobots"), l("控制器、软件与自动化系统", "Controllers, software, and automation systems")], customers: [l("汽车、电子、金属、食品、物流与系统集成商", "Automotive, electronics, metal, food, logistics, and system integrators")], officialUrl: "https://www.kuka.com/en-de/products/robot-systems",
    scope: l("收录官网工业机器人目录中的当前主要产品族；同一产品族内的负载、臂展和环境变体继续按型号拆分。", "Covers the current major families listed in KUKA's industrial-robot catalog; payload, reach, and environment variants within each family remain model-level work."), coverage: "model-partial",
    products: [
      p("KR DELTA", "robot-platform", "robot-platform", "robot-platform-general", l("并联高速机器人系列", "High-speed delta robot family"), l("面向高速拾放、分拣和包装。", "Targets high-speed pick-and-place, sorting, and packaging."), l("与 KUKA 控制器、视觉及生产线外围设备集成。", "Integrates with KUKA controllers, vision, and line equipment."), l("核对工作空间、节拍、食品版本、负载和末端惯量。", "Verify workspace, cycle time, food variant, payload, and tool inertia."), ["manufacturing", "logistics", "integration"], "https://www.kuka.com/en-de/products/robot-systems/industrial-robots", [{ label: l("负载范围", "Payload range"), value: l("6-15 kg", "6-15 kg") }, { label: l("最大臂展范围", "Maximum reach range"), value: l("250-455 mm", "250-455 mm") }]),
      p("KR SCARA", "robot-platform", "robot-platform", "robot-platform-general", l("SCARA 机器人系列", "SCARA robot family"), l("面向高速装配、搬运和测试工序。", "Targets high-speed assembly, handling, and test processes."), l("需按轴数、安装环境、控制器和工艺设备组合。", "Requires configuration by axes, environment, controller, and process equipment."), l("核对负载、臂展、Z 行程、重复精度和洁净版本。", "Verify payload, reach, Z stroke, repeatability, and cleanroom variant."), ["manufacturing", "integration"], "https://www.kuka.com/en-de/products/robot-systems/industrial-robots", [{ label: l("负载范围", "Payload range"), value: l("6-60 kg", "6-60 kg") }, { label: l("最大臂展范围", "Maximum reach range"), value: l("500-1200 mm", "500-1200 mm") }]),
      p("LBR iisy", "robot-platform", "robot-platform", "industrial-arm", l("工业协作机器人系列", "Industrial cobot family"), l("用于装配、搬运、焊接及人机协作生产。", "Supports assembly, handling, welding, and collaborative production."), l("集成关节力矩传感、iiQKA.OS2 和 KR C5 micro-2。", "Combines joint-torque sensing, iiQKA.OS2, and KR C5 micro-2."), l("核对协作风险评估、负载、臂展、防护和节拍。", "Verify collaborative risk assessment, payload, reach, protection, and cycle time."), ["manufacturing", "integration", "research"], "https://www.kuka.com/en-de/products/robot-systems/industrial-robots/lbr-iisy-cobot", [{ label: l("负载范围", "Payload range"), value: l("3-15 kg", "3-15 kg") }, { label: l("最大臂展范围", "Maximum reach range"), value: l("760-1300 mm", "760-1300 mm") }]),
      p("LBR iiwa", "robot-platform", "robot-platform", "industrial-arm", l("轻型力控机器人系列", "Lightweight force-controlled robot family"), l("面向高灵敏装配、研究和人机协作。", "Targets sensitive assembly, research, and human-robot collaboration."), l("七轴结构与关节力矩检测支持柔顺操作。", "Seven axes and joint-torque sensing support compliant manipulation."), l("核对负载、臂展、控制器代际、接口和安全配置。", "Verify payload, reach, controller generation, interfaces, and safety configuration."), ["manufacturing", "research", "integration"], "https://www.kuka.com/en-de/products/robot-systems/industrial-robots/lbr-iiwa", [{ label: l("负载范围", "Payload range"), value: l("7-14 kg", "7-14 kg") }, { label: l("最大臂展范围", "Maximum reach range"), value: l("800-820 mm", "800-820 mm") }]),
      p("KR 4 AGILUS", "robot-platform", "robot-platform", "industrial-arm", l("紧凑小负载六轴机器人", "Compact small-payload six-axis robot"), l("用于狭小空间内的高速搬运、装配和测试。", "Supports high-speed handling, assembly, and test in confined cells."), l("需匹配控制器、安装方式和工艺外围设备。", "Requires matching controller, mounting, and process periphery."), l("核对节拍、重复精度、安装姿态和环境版本。", "Verify cycle time, repeatability, mounting orientation, and environment variant."), ["manufacturing", "integration"], "https://www.kuka.com/en-de/products/robot-systems/industrial-robots", [{ label: l("额定负载", "Rated payload"), value: l("4 kg", "4 kg") }, { label: l("最大臂展", "Maximum reach"), value: l("601 mm", "601 mm") }]),
      p("KR AGILUS ultra", "robot-platform", "robot-platform", "industrial-arm", l("高性能紧凑六轴机器人系列", "High-performance compact six-axis family"), l("面向高工艺密度生产单元中的快速、精密操作。", "Targets fast, precise work in high-density production cells."), l("兼容 iiQKA.OS2 与 KR C5 micro-2 控制平台。", "Supports iiQKA.OS2 and KR C5 micro-2."), l("核对负载、臂展、IP67 条件、节拍和工具惯量。", "Verify payload, reach, IP67 conditions, cycle time, and tool inertia."), ["manufacturing", "integration"], "https://www.kuka.com/en-de/products/robot-systems/industrial-robots/kr-agilus-ultra", [{ label: l("负载范围", "Payload range"), value: l("10-16 kg", "10-16 kg") }, { label: l("最大臂展范围", "Maximum reach range"), value: l("901-1103 mm", "901-1103 mm") }]),
      p("KR AGILUS", "robot-platform", "robot-platform", "industrial-arm", l("高速小型六轴机器人系列", "High-speed small six-axis robot family"), l("用于紧凑空间的高速精密生产，含洁净、防水等版本。", "Supports high-speed precision production in compact spaces, including cleanroom and waterproof variants."), l("可按地面、墙面或顶装方式进入自动化单元。", "Supports floor, wall, and ceiling installation in automation cells."), l("核对环境版本、负载、臂展、重复精度和控制器。", "Verify environment variant, payload, reach, repeatability, and controller."), ["manufacturing", "integration"], "https://www.kuka.com/en-de/products/robot-systems/industrial-robots/kr-agilus", [{ label: l("负载范围", "Payload range"), value: l("6-11 kg", "6-11 kg") }, { label: l("最大臂展范围", "Maximum reach range"), value: l("726-1101 mm", "726-1101 mm") }]),
      p("KR CYBERTECH nano", "robot-platform", "robot-platform", "industrial-arm", l("低负载长臂六轴机器人系列", "Low-payload long-reach six-axis family"), l("面向搬运、加工和连续轨迹工艺。", "Targets handling, machining, and continuous-path processes."), l("需按腕部、安装姿态、控制器和工艺包组合。", "Configuration varies by wrist, mounting, controller, and process package."), l("核对路径精度、负载、臂展、工具惯量和环境版本。", "Verify path accuracy, payload, reach, tool inertia, and environment variant."), ["manufacturing", "integration"], "https://www.kuka.com/en-de/products/robot-systems/industrial-robots", [{ label: l("负载范围", "Payload range"), value: l("6-10 kg", "6-10 kg") }, { label: l("最大臂展范围", "Maximum reach range"), value: l("1440-1840 mm", "1440-1840 mm") }]),
      p("KR CYBERTECH nano ARC", "robot-platform", "robot-platform", "industrial-arm", l("弧焊专用低负载机器人系列", "Low-payload arc-welding robot family"), l("面向弧焊和连续路径工艺。", "Targets arc welding and continuous-path processes."), l("与焊机、送丝、夹具和 KUKA 工艺软件集成。", "Integrates with welding source, wire feed, fixtures, and KUKA process software."), l("核对焊接包、臂展、负载、空心腕和线缆管理。", "Verify welding package, reach, payload, hollow wrist, and cable routing."), ["manufacturing", "integration"], "https://www.kuka.com/en-de/products/robot-systems/industrial-robots", [{ label: l("负载范围", "Payload range"), value: l("6-8 kg", "6-8 kg") }, { label: l("最大臂展范围", "Maximum reach range"), value: l("1441-2010 mm", "1441-2010 mm") }]),
      p("KR CYBERTECH", "robot-platform", "robot-platform", "industrial-arm", l("中小负载多用途机器人系列", "Medium-small-payload multipurpose robot family"), l("用于搬运、加工、装配和其他工业工艺。", "Supports handling, machining, assembly, and other industrial processes."), l("需按具体腕部、控制器和工艺版本配置。", "Requires configuration by wrist, controller, and process variant."), l("核对负载、臂展、路径精度、防护和安装方式。", "Verify payload, reach, path accuracy, protection, and mounting."), ["manufacturing", "integration"], "https://www.kuka.com/en-de/products/robot-systems/industrial-robots", [{ label: l("负载范围", "Payload range"), value: l("8-35 kg", "8-35 kg") }, { label: l("最大臂展范围", "Maximum reach range"), value: l("1612-2013 mm", "1612-2013 mm") }]),
      p("KR CYBERTECH ARC", "robot-platform", "robot-platform", "industrial-arm", l("弧焊工艺机器人系列", "Arc-welding process robot family"), l("针对弧焊和连续轨迹生产线。", "Targets arc-welding and continuous-path production lines."), l("与焊接电源、工装、控制器和工艺软件集成。", "Integrates with welding source, fixtures, controller, and process software."), l("官网聚合页参数存在缺项，选型须进入具体型号复核。", "The aggregate official listing has missing fields; selection must use the specific model page."), ["manufacturing", "integration"], "https://www.kuka.com/en-de/products/robot-systems/industrial-robots"),
      p("KR IONTEC", "robot-platform", "robot-platform", "industrial-arm", l("中等负载六轴机器人系列", "Medium-payload six-axis robot family"), l("覆盖搬运、装配、加工和生产线自动化。", "Covers handling, assembly, machining, and line automation."), l("按工艺、安装姿态、控制器和环境版本配置。", "Configuration varies by process, mounting, controller, and environment."), l("核对负载、臂展、腕部惯量、重复精度和环境版本。", "Verify payload, reach, wrist inertia, repeatability, and environment variant."), ["manufacturing", "integration"], "https://www.kuka.com/en-de/products/robot-systems/industrial-robots", [{ label: l("负载范围", "Payload range"), value: l("20-70 kg", "20-70 kg") }, { label: l("最大臂展范围", "Maximum reach range"), value: l("2101-3101 mm", "2101-3101 mm") }]),
      p("KR QUANTEC", "robot-platform", "robot-platform", "industrial-arm", l("高负载多用途机器人系列", "High-payload multipurpose robot family"), l("面向汽车、铸造、加工、搬运和焊接等重载工艺。", "Targets heavy-duty automotive, foundry, machining, handling, and welding processes."), l("按腕部、安装结构、环境版本和控制器配置。", "Configuration varies by wrist, mounting structure, environment, and controller."), l("核对具体型号的额定负载、臂展、刚度、环境和运动模式。", "Verify each model's rated payload, reach, stiffness, environment, and motion mode."), ["manufacturing", "integration"], "https://www.kuka.com/en-de/products/robot-systems/industrial-robots/kr-quantec"),
      p("KR QUANTEC PA", "robot-platform", "robot-platform", "industrial-arm", l("高速重载码垛机器人系列", "High-speed heavy-payload palletizing family"), l("用于高节拍码垛和包装生产线。", "Targets high-throughput palletizing and packaging lines."), l("与输送、视觉、托盘系统及 KUKA 控制器集成。", "Integrates with conveyors, vision, pallet systems, and KUKA controllers."), l("核对负载、堆垛高度、低温版本、节拍和夹具质量。", "Verify payload, stacking height, cold variant, cycle time, and gripper mass."), ["manufacturing", "logistics", "integration"], "https://www.kuka.com/en-de/products/robot-systems/industrial-robots/kr-quantec-pa", [{ label: l("负载范围", "Payload range"), value: l("140-240 kg", "140-240 kg") }, { label: l("最大臂展", "Maximum reach"), value: l("3195 mm", "3195 mm") }]),
    ],
  },
  {
    slug: "myactuator", name: l("MYACTUATOR", "MYACTUATOR"), countryCode: "cn", country: l("中国", "China"),
    role: l("一体化伺服执行器与机器人关节厂商", "Integrated servo-actuator and robotic-joint company"), summary: l("MYACTUATOR 以 RMD 系列一体化伺服为主，产品覆盖不同直径、减速比、扭矩和中空结构。官网型号多，必须通过电压、额定/峰值扭矩和接口筛选。", "MYACTUATOR centers on RMD integrated servos across diameters, ratios, torque classes, and hollow-shaft structures. The broad model range requires filtering by voltage, rated/peak torque, and interface."),
    businessAreas: [l("一体化机器人关节", "Integrated robotic joints"), l("电机驱动与控制", "Motor drives and control")], customers: [l("机器人、云台、外骨骼和自动化设备开发者", "Robotics, gimbal, exoskeleton, and automation-equipment developers")], officialUrl: "https://www.myactuator.com/",
    scope: l("官网当前 RMD 机器人执行器系列；型号级参数逐步拆分。", "Current official RMD robotic-actuator families; model specifications are progressively split."), coverage: "model-partial",
    products: [p("RMD integrated servo families", "motion", "motion-transmission", "integrated-joint", l("一体化伺服执行器系列", "Integrated servo-actuator families"), l("将无刷电机、减速、编码和驱动集成用于机器人关节。", "Integrates brushless motor, reduction, encoder, and drive for robot joints."), l("CAN、RS-485 或 EtherCAT 依型号和控制器而定。", "CAN, RS-485, or EtherCAT depends on model and controller."), l("核对额定/峰值扭矩、减速比、回差、热、制动器和固件。", "Verify rated/peak torque, ratio, backlash, heat, brake, and firmware."), ["research", "integration", "manufacturing"], "https://www.myactuator.com/")],
  },
  {
    slug: "innfos", name: l("INNFOS", "INNFOS"), countryCode: "cn", country: l("中国", "China"), headquarters: l("深圳", "Shenzhen"),
    role: l("智能柔性执行器与机器人关节历史产品主体", "Historical smart compliant-actuator and robotic-joint product company"), summary: l("INNFOS 曾公开 QDD、QDD Lite 等智能柔性执行器和机器人关节方案，面向协作机械臂、足式机器人和研究平台。当前官网无法稳定访问，因此这些系列只能作为历史选型线索，不能据此判断仍在售、可交付或仍由原主体支持。", "INNFOS previously published QDD, QDD Lite, and related smart compliant actuators for cobots, legged robots, and research platforms. Its official site is not reliably reachable, so these records are historical selection leads rather than evidence of current sale, delivery, or support."),
    businessAreas: [l("智能柔性执行器", "Smart compliant actuators"), l("机器人关节与控制", "Robotic joints and control")], customers: [l("协作机器人、人形和研究平台开发团队", "Cobot, humanoid, and research-platform developers")], officialUrl: "https://innfos.com/",
    scope: l("历史官方资料中的 QDD、QDD Lite 等系列；现行目录、公司状态和售后支持均待复核。", "QDD, QDD Lite, and related families from historical official material; current catalog, company status, and support remain pending review."), coverage: "pending-review",
    products: [p("QDD / Lite smart actuator families", "motion", "motion-transmission", "integrated-joint", l("智能柔性执行器系列", "Smart compliant-actuator families"), l("用于机器人关节的紧凑驱动、反馈和控制。", "Provides compact actuation, feedback, and control for robot joints."), l("执行器、驱动器、控制器和总线接口按型号组合。", "Actuator, drive, controller, and bus interface vary by model."), l("核对额定/峰值输出、力矩感知、带宽、热、回差和寿命。", "Verify rated/peak output, torque sensing, bandwidth, heat, backlash, and life."), ["research", "integration", "manufacturing"], "https://innfos.com/product/")],
  },
  {
    slug: "nabtesco", name: l("Nabtesco", "Nabtesco"), countryCode: "jp", country: l("日本", "Japan"), headquarters: l("东京", "Tokyo"), founded: "2003",
    role: l("精密摆线减速器厂商", "Precision cycloidal-reducer company"), summary: l("Nabtesco 的 RV 精密减速器广泛用于工业机器人关节和高刚度旋转轴。型号体系覆盖组件型、单元型和不同轴承/中空结构，不能用单一扭矩值代表整个系列。", "Nabtesco's RV precision reducers are widely used in industrial robot joints and high-rigidity rotary axes. The range spans component and unit types plus bearing and hollow structures, so no single torque value represents the family."),
    businessAreas: [l("RV 精密减速器", "RV precision reducers"), l("机器人关节传动", "Robot-joint transmission")], customers: [l("工业机器人、机床和高精度旋转设备制造商", "Industrial-robot, machine-tool, and precision rotary-equipment manufacturers")], officialUrl: "https://precision.nabtesco.com/en/",
    scope: l("官网精密减速器产品家族；其他交通与航空业务排除。", "Official precision-reducer families; transportation and aerospace businesses are excluded."), coverage: "model-partial",
    products: [p("RV precision reducer families", "motion", "motion-transmission", "reducer", l("精密摆线减速器系列", "Precision cycloidal-reducer families"), l("面向高刚度、高负载和低回差机器人关节。", "Targets high-rigidity, high-load, low-backlash robot joints."), l("组件型、单元型、中空和轴承结构按系列选择。", "Component, unit, hollow, and bearing structures vary by family."), l("按型号核对额定/峰值扭矩、回差、刚度、寿命、润滑和安装。", "Verify rated/peak torque, backlash, stiffness, life, lubrication, and mounting by model."), ["manufacturing", "integration"], "https://precision.nabtesco.com/en/products/")],
  },
  {
    slug: "sumitomo-drive", name: l("Sumitomo Drive Technologies", "Sumitomo Drive Technologies"), countryCode: "jp", country: l("日本", "Japan"),
    role: l("摆线与精密减速传动厂商", "Cycloidal and precision-drive company"), summary: l("Sumitomo 的 Fine Cyclo 精密减速器用于机器人、机床和定位机构，产品结构和扭矩范围多样。机器人应用需关注回差、刚度、轴承、润滑和寿命。", "Sumitomo's Fine Cyclo precision reducers serve robots, machine tools, and positioning mechanisms across structures and torque ranges. Robotics selection should focus on backlash, stiffness, bearings, lubrication, and life."),
    businessAreas: [l("Fine Cyclo 精密减速器", "Fine Cyclo precision reducers")], customers: [l("机器人、机床和精密自动化设备制造商", "Robot, machine-tool, and precision-automation manufacturers")], officialUrl: "https://us.sumitomodrive.com/",
    scope: l("机器人相关 Fine Cyclo 精密减速器家族；通用大型齿轮箱排除。", "Robotics-related Fine Cyclo precision families; general large gearboxes are excluded."), coverage: "model-partial",
    products: [p("Fine Cyclo precision reducer families", "motion", "motion-transmission", "reducer", l("精密摆线减速器系列", "Precision cycloidal-reducer families"), l("用于机器人关节和高精度旋转定位。", "Used in robot joints and high-precision rotary positioning."), l("组件、单元、轴承和中空结构按型号选择。", "Component, unit, bearing, and hollow structures vary by model."), l("核对扭矩、回差、刚度、效率、寿命、润滑和安装。", "Verify torque, backlash, stiffness, efficiency, life, lubrication, and mounting."), ["manufacturing", "integration"], "https://us.sumitomodrive.com/en-us/fine-cyclo")],
  },
  {
    slug: "nidec-drive", name: l("Nidec Drive Technology", "Nidec Drive Technology"), countryCode: "jp", country: l("日本", "Japan"), headquarters: l("京都", "Kyoto"),
    role: l("精密减速器与伺服传动厂商", "Precision-reducer and servo-drive company"), summary: l("Nidec Drive Technology 提供 FLEXWAVE 谐波类减速器和其他精密传动产品，适用于机器人关节、协作机械臂和自动化轴。", "Nidec Drive Technology offers FLEXWAVE strain-wave reducers and other precision drives for robot joints, cobots, and automation axes."),
    businessAreas: [l("FLEXWAVE 精密减速器", "FLEXWAVE precision reducers"), l("机器人伺服传动", "Robot servo transmission")], customers: [l("机器人、自动化和精密设备制造商", "Robotics, automation, and precision-equipment manufacturers")], officialUrl: "https://www.nidec-dtc.com/en/",
    scope: l("官网机器人相关精密减速器家族；通用变速机产品排除。", "Official robotics-related precision-reducer families; general gear drives are excluded."), coverage: "model-partial",
    products: [p("FLEXWAVE precision reducer family", "motion", "motion-transmission", "reducer", l("应变波精密减速器系列", "Strain-wave precision-reducer family"), l("面向紧凑、低回差和高减速比机器人关节。", "Targets compact, low-backlash, high-ratio robot joints."), l("不同尺寸、速比和输出结构按型号配置。", "Size, ratio, and output structure vary by model."), l("核对额定/峰值扭矩、回差、刚度、寿命、润滑和轴承责任。", "Verify rated/peak torque, backlash, stiffness, life, lubrication, and bearing responsibility."), ["manufacturing", "integration"], "https://www.nidec-dtc.com/en/product/flexwave/")],
  },
  {
    slug: "zivid", name: l("Zivid", "Zivid"), countryCode: "no", country: l("挪威", "Norway"), headquarters: l("奥斯陆", "Oslo"), founded: "2015",
    role: l("工业彩色三维相机厂商", "Industrial color 3D-camera company"), summary: l("Zivid 的结构光三维相机面向机器人抓取、拆码垛、装配和检测，强调彩色点云与工业标定。相机性能依赖工作距离、视场、表面材质和曝光策略。", "Zivid's structured-light 3D cameras target robotic picking, depalletizing, assembly, and inspection with color point clouds and industrial calibration. Performance depends on working distance, FOV, surface material, and exposure strategy."),
    businessAreas: [l("工业三维视觉", "Industrial 3D vision"), l("机器人手眼标定与 SDK", "Robot hand-eye calibration and SDK")], customers: [l("机器人集成商、物流和制造视觉团队", "Robot integrators and logistics or manufacturing vision teams")], officialUrl: "https://www.zivid.com/",
    scope: l("官网当前 Zivid 2+ 相机系列；镜头/工作距离变体按型号。", "Current official Zivid 2+ camera family; lens and working-distance variants are model-specific."), coverage: "model-partial",
    products: [p("Zivid 2+ camera family", "perception", "sensing", "vision-sensor", l("工业彩色三维相机系列", "Industrial color 3D-camera family"), l("为机器人抓取、分拣、装配和检测生成彩色点云。", "Produces color point clouds for robotic picking, sorting, assembly, and inspection."), l("相机、SDK、手眼标定和第三方机器人集成。", "Combines camera, SDK, hand-eye calibration, and third-party robot integration."), l("按型号核对工作距离、视场、点云精度、节拍、反光和环境光。", "Verify working distance, FOV, point-cloud accuracy, cycle time, reflections, and ambient light by model."), ["manufacturing", "logistics", "integration"], "https://www.zivid.com/zivid-2-plus")],
  },
  {
    slug: "photoneo", name: l("Photoneo", "Photoneo"), countryCode: "sk", country: l("斯洛伐克", "Slovakia"), headquarters: l("布拉迪斯拉发", "Bratislava"), founded: "2013",
    role: l("工业三维视觉与机器人拣选厂商", "Industrial 3D-vision and robotic-picking company"), summary: l("Photoneo 产品覆盖 PhoXi 静态三维扫描、MotionCam-3D 动态场景成像以及 Bin Picking 软件。硬件和软件应按对象运动、工作距离和节拍组合选型。", "Photoneo offers PhoXi static 3D scanning, MotionCam-3D for moving scenes, and Bin Picking software. Hardware and software selection depends on object motion, working distance, and cycle time."),
    businessAreas: [l("三维相机与扫描器", "3D cameras and scanners"), l("机器人拣选软件", "Robotic picking software")], customers: [l("物流、汽车、制造和自动化集成商", "Logistics, automotive, manufacturing, and automation integrators")], officialUrl: "https://www.photoneo.com/",
    scope: l("官网当前 PhoXi、MotionCam-3D 和 Bin Picking 家族。", "Current official PhoXi, MotionCam-3D, and Bin Picking families."), coverage: "family-complete",
    products: [
      p("PhoXi 3D Scanner", "perception", "sensing", "vision-sensor", l("静态工业三维扫描器", "Static industrial 3D scanner"), l("面向静态工件高质量三维扫描和检测。", "Targets high-quality 3D scanning and inspection of stationary parts."), l("扫描器、SDK 和视觉软件按应用组合。", "Scanner, SDK, and vision software are application-specific."), l("核对工作距离、视场、精度、扫描时间和表面材质。", "Verify working distance, FOV, accuracy, scan time, and surface material."), ["manufacturing", "integration"], "https://www.photoneo.com/phoxi-3d-scanner/"),
      p("MotionCam-3D", "perception", "sensing", "vision-sensor", l("动态场景工业三维相机", "Industrial 3D camera for moving scenes"), l("用于运动物体、连续输送和无停顿抓取。", "Used for moving objects, continuous conveyors, and pick without stopping."), l("相机、并行结构光、SDK 和机器人拣选软件。", "Combines camera, parallel structured light, SDK, and robotic-picking software."), l("核对运动速度、曝光、反光、遮挡、节拍和计算资源。", "Verify motion speed, exposure, reflections, occlusion, cycle time, and compute."), ["manufacturing", "logistics", "integration"], "https://www.photoneo.com/motioncam-3d/")
    ],
  },
  {
    slug: "ouster", name: l("Ouster", "Ouster"), countryCode: "us", country: l("美国", "United States"), headquarters: l("加利福尼亚州旧金山", "San Francisco, California"), founded: "2015",
    role: l("数字激光雷达与感知软件厂商", "Digital LiDAR and perception-software company"), summary: l("Ouster 的 OS 系列数字激光雷达覆盖近距广角到远距感知，应用于移动机器人、工业自动化和车辆。选型需结合量程、垂直视场、分辨率、防护和同步。", "Ouster's OS digital LiDAR family spans near-field wide-angle to longer-range sensing for mobile robots, industrial automation, and vehicles. Selection depends on range, vertical FOV, resolution, protection, and synchronization."),
    businessAreas: [l("数字激光雷达", "Digital LiDAR"), l("感知与监测软件", "Perception and monitoring software")], customers: [l("移动机器人、工业自动化、测绘和智能交通团队", "Mobile robotics, industrial automation, mapping, and intelligent-transport teams")], officialUrl: "https://ouster.com/",
    scope: l("官网当前 Rev8 OSDome、OS0、OS1 与 OS1 Max；历史 OS2、Velodyne 型号及旧代参数另行处理。", "Current official Rev8 OSDome, OS0, OS1, and OS1 Max; historical OS2, Velodyne products, and earlier-generation specifications are handled separately."), coverage: "family-complete",
    products: [
      p("OSDome", "perception", "sensing", "lidar", l("半球视场数字激光雷达", "Hemispherical-field digital LiDAR"), l("180° 垂直视场覆盖近距半球空间，面向机器人、基础设施与全向环境感知。", "A 180° vertical field of view covers the near-field hemisphere for robotics, infrastructure, and all-around awareness."), l("千兆以太网、PTP/gPTP/GPRMC 时间同步、Ouster SDK 与 ROS 驱动。", "Gigabit Ethernet, PTP/gPTP/GPRMC timing, Ouster SDK, and ROS drivers."), l("本条使用当前 Rev8 概览参数；功能安全为设计目标，不能表述为已完成全部认证。", "This record uses the current Rev8 overview; functional safety is a design target and must not be represented as completed certification."), ["logistics", "manufacturing", "integration"], "https://ouster.com/products/hardware/osdome", [
        { label: l("10% 反射率量程", "Range at 10% reflectivity"), value: l("20 m", "20 m") },
        { label: l("最大量程", "Maximum range"), value: l("约 250 m", "about 250 m") },
        { label: l("最小量程", "Minimum range"), value: l("0.0 m", "0.0 m") },
        { label: l("垂直视场", "Vertical field of view"), value: l("180°", "180°") },
        { label: l("通道数", "Channels"), value: l("32 / 64 / 128", "32 / 64 / 128") },
        { label: l("最高点频", "Maximum point rate"), value: l("10,485,760 点/s", "10,485,760 points/s") },
        { label: l("帧率", "Frame rate"), value: l("5 / 10 / 15 / 20 / 30 / 40 Hz", "5 / 10 / 15 / 20 / 30 / 40 Hz") },
        { label: l("防护等级", "Ingress protection"), value: l("IP68 / IP69K", "IP68 / IP69K") },
        { label: l("功耗", "Power consumption"), value: l("10-20 W", "10-20 W") }
      ]),
      p("OS0", "perception", "sensing", "lidar", l("超广角近距数字激光雷达", "Ultra-wide near-field digital LiDAR"), l("90° 垂直视场面向近距避障、仓储自动化和移动机器人感知。", "A 90° vertical field of view targets near-field obstacle detection, warehouse automation, and mobile-robot perception."), l("千兆以太网、PTP/gPTP/GPRMC 时间同步、Ouster SDK 与 ROS 驱动。", "Gigabit Ethernet, PTP/gPTP/GPRMC timing, Ouster SDK, and ROS drivers."), l("本条使用当前 Rev8 概览参数；必须按订货通道数和接口版本核验。", "This record uses the current Rev8 overview; channel count and interface version must be verified by order code."), ["logistics", "manufacturing", "integration"], "https://ouster.com/products/hardware/os0", [
        { label: l("10% 反射率量程", "Range at 10% reflectivity"), value: l("35 m", "35 m") },
        { label: l("最大量程", "Maximum range"), value: l("约 250 m", "about 250 m") },
        { label: l("最小量程", "Minimum range"), value: l("0.0 m", "0.0 m") },
        { label: l("垂直视场", "Vertical field of view"), value: l("90°", "90°") },
        { label: l("通道数", "Channels"), value: l("32 / 64 / 128", "32 / 64 / 128") },
        { label: l("最高点频", "Maximum point rate"), value: l("10,485,760 点/s", "10,485,760 points/s") },
        { label: l("防护等级", "Ingress protection"), value: l("IP68 / IP69K", "IP68 / IP69K") },
        { label: l("工作温度", "Operating temperature"), value: l("-40 至 +85 °C", "-40 to +85 °C") }
      ]),
      p("OS1", "perception", "sensing", "lidar", l("中距数字激光雷达", "Mid-range digital LiDAR"), l("在 45° 垂直视场、分辨率和量程之间平衡，面向机器人、工业、测绘与自动系统。", "Balances a 45° vertical field of view, resolution, and range for robotics, industry, mapping, and autonomous systems."), l("千兆以太网、PTP/gPTP/GPRMC 时间同步、Ouster SDK 与 ROS 驱动。", "Gigabit Ethernet, PTP/gPTP/GPRMC timing, Ouster SDK, and ROS drivers."), l("本条使用当前 Rev8 总览口径；旧 L3 产品页的 200 m、5.2M 点/s 和 20 Hz 上限不与 Rev8 参数混用。", "This record uses the current Rev8 overview; the older L3 page's 200 m, 5.2M points/s, and 20 Hz limits are not mixed with Rev8 figures."), ["logistics", "manufacturing", "integration"], "https://ouster.com/products/hardware/os1", [
        { label: l("10% 反射率量程", "Range at 10% reflectivity"), value: l("90 m", "90 m") },
        { label: l("最大量程", "Maximum range"), value: l("约 250 m（Rev8 概览）", "about 250 m (Rev8 overview)") },
        { label: l("垂直视场", "Vertical field of view"), value: l("45°", "45°") },
        { label: l("通道数", "Channels"), value: l("32 / 64 / 128", "32 / 64 / 128") },
        { label: l("最高点频", "Maximum point rate"), value: l("10,485,760 点/s", "10,485,760 points/s") },
        { label: l("帧率", "Frame rate"), value: l("5 / 10 / 15 / 20 / 30 / 40 Hz", "5 / 10 / 15 / 20 / 30 / 40 Hz") },
        { label: l("防护等级", "Ingress protection"), value: l("IP68 / IP69K", "IP68 / IP69K") },
        { label: l("工作温度", "Operating temperature"), value: l("-40 至 +85 °C", "-40 to +85 °C") }
      ]),
      p("OS1 Max", "perception", "sensing", "lidar", l("高分辨率长距数字激光雷达", "High-resolution long-range digital LiDAR"), l("256 通道版本面向高速自主系统、重工业和远距高密度感知。", "The 256-channel variant targets high-speed autonomy, heavy industry, and dense long-range perception."), l("千兆以太网、PTP/gPTP/GPRMC 时间同步、Ouster SDK 与 ROS 驱动。", "Gigabit Ethernet, PTP/gPTP/GPRMC timing, Ouster SDK, and ROS drivers."), l("本条记录当前 Rev8 产品；500 m 为最大量程，不能替代 10% 反射率目标量程。", "This record covers the current Rev8 product; 500 m is maximum range and does not replace the 10%-reflectivity target range."), ["logistics", "manufacturing", "integration"], "https://ouster.com/products/hardware/os1-max", [
        { label: l("10% 反射率量程", "Range at 10% reflectivity"), value: l("200 m", "200 m") },
        { label: l("最大量程", "Maximum range"), value: l("约 500 m", "about 500 m") },
        { label: l("垂直视场", "Vertical field of view"), value: l("45°", "45°") },
        { label: l("通道数", "Channels"), value: l("32 / 64 / 128 / 256", "32 / 64 / 128 / 256") },
        { label: l("256 通道垂直角分辨率", "256-channel vertical angular resolution"), value: l("0.17°", "0.17°") },
        { label: l("最高点频", "Maximum point rate"), value: l("10,485,760 点/s", "10,485,760 points/s") },
        { label: l("防护等级", "Ingress protection"), value: l("IP68 / IP69K", "IP68 / IP69K") },
        { label: l("功耗", "Power consumption"), value: l("15-25 W", "15-25 W") },
        { label: l("工作温度", "Operating temperature"), value: l("-40 至 +85 °C", "-40 to +85 °C") }
      ])
    ],
  },
  {
    slug: "hesai", name: l("禾赛科技", "Hesai Technology"), legalName: l("上海禾赛科技有限公司", "Hesai Technology Co., Ltd."), countryCode: "cn", country: l("中国", "China"), headquarters: l("上海", "Shanghai"), founded: "2014",
    role: l("激光雷达厂商", "LiDAR company"), summary: l("禾赛产品覆盖车载与机器人激光雷达。机器人选型重点是 JT、XT 等面向近距或移动平台的系列，而车规远距产品不能直接替代机器人场景验证。", "Hesai spans automotive and robotic LiDAR. Robotics selection focuses on JT, XT, and related near-field or mobile-platform families; automotive long-range products do not replace robot-specific validation."),
    businessAreas: [l("机器人激光雷达", "Robotic LiDAR"), l("车载激光雷达", "Automotive LiDAR")], customers: [l("移动机器人、工业车辆、测绘和智能驾驶团队", "Mobile robots, industrial vehicles, mapping, and autonomous-driving teams")], officialUrl: "https://www.hesaitech.com/",
    scope: l("官网当前机器人相关激光雷达家族；车规产品保留但在机器人筛选中分组。", "Current official robotics-related LiDAR families; automotive products are retained but grouped separately for robotics selection."), coverage: "model-partial",
    products: [p("JT / XT robotic LiDAR families", "perception", "sensing", "lidar", l("机器人三维激光雷达系列", "Robotic 3D-LiDAR families"), l("面向移动机器人导航、避障、测绘和近距感知。", "Targets mobile-robot navigation, obstacle avoidance, mapping, and near-field sensing."), l("以太网、时间同步、SDK 与 ROS 驱动按型号提供。", "Ethernet, time synchronization, SDK, and ROS support vary by model."), l("按型号核对量程、盲区、视场、点频、反射率、IP 和眼安全。", "Verify range, blind zone, FOV, point rate, reflectivity, IP, and eye safety by model."), ["logistics", "manufacturing", "integration"], "https://www.hesaitech.com/product/")],
  },
  {
    slug: "robosense", name: l("速腾聚创", "RoboSense"), legalName: l("深圳市速腾聚创科技有限公司", "RoboSense Technology Co., Ltd."), countryCode: "cn", country: l("中国", "China"), headquarters: l("深圳", "Shenzhen"), founded: "2014",
    role: l("激光雷达与机器人感知厂商", "LiDAR and robotic-perception company"), summary: l("RoboSense 产品覆盖车载和机器人激光雷达，机器人平台常关注 E1R、Airy 等紧凑产品及配套感知软件。必须按具体型号区分视场、量程、盲区和接口。", "RoboSense spans automotive and robotic LiDAR. Robot platforms often use compact products such as E1R and Airy plus perception software; FOV, range, blind zone, and interfaces are model-specific."),
    businessAreas: [l("机器人激光雷达", "Robotic LiDAR"), l("感知软件与方案", "Perception software and solutions")], customers: [l("移动机器人、工业自动化、无人配送和智能驾驶团队", "Mobile robotics, industrial automation, delivery robots, and autonomous-driving teams")], officialUrl: "https://www.robosense.ai/",
    scope: l("官网当前机器人相关雷达和感知家族；车载产品单独分组。", "Current official robotics-related LiDAR and perception families; automotive products are grouped separately."), coverage: "model-partial",
    products: [p("Airy / E1R robotic LiDAR family", "perception", "sensing", "lidar", l("紧凑机器人三维激光雷达", "Compact robotic 3D-LiDAR family"), l("面向机器人导航、避障和空间感知。", "Targets robot navigation, obstacle avoidance, and spatial perception."), l("以太网、同步、SDK 和 ROS 集成按型号。", "Ethernet, synchronization, SDK, and ROS integration vary by model."), l("核对量程、视场、盲区、点频、反射率、功耗和环境等级。", "Verify range, FOV, blind zone, point rate, reflectivity, power, and environmental rating."), ["logistics", "manufacturing", "integration"], "https://www.robosense.ai/en/rslidar/")],
  },
  {
    slug: "realsense", name: l("RealSense", "RealSense"), countryCode: "us", country: l("美国", "United States"),
    role: l("深度相机与视觉开发平台厂商", "Depth-camera and vision-development-platform company"), summary: l("RealSense 提供 D400 等深度相机、模块和 SDK，广泛用于机器人近距感知、导航、抓取和研究。型号在基线、视场、快门、环境适应和封装上差异明显。", "RealSense offers D400-series depth cameras, modules, and SDKs for robot near-field perception, navigation, grasping, and research. Models differ in baseline, FOV, shutter, environmental behavior, and packaging."),
    businessAreas: [l("立体深度相机", "Stereo depth cameras"), l("视觉模块与 SDK", "Vision modules and SDK")], customers: [l("机器人厂商、实验室、自动化和视觉开发团队", "Robot OEMs, labs, automation, and vision-development teams")], officialUrl: "https://www.realsenseai.com/",
    scope: l("官网当前深度相机和模块家族；停产型号保留生命周期标签而不作为首选。", "Current official depth-camera and module families; discontinued models retain lifecycle tags but are not preferred."), coverage: "model-partial",
    products: [p("D400 depth-camera family", "perception", "sensing", "vision-sensor", l("立体深度相机系列", "Stereo depth-camera family"), l("为机器人导航、抓取、人体和近距三维感知提供深度与彩色数据。", "Provides depth and color data for robot navigation, grasping, people sensing, and near-field 3D perception."), l("USB、librealsense、ROS 和多平台 SDK。", "USB, librealsense, ROS, and multi-platform SDKs."), l("按型号核对快门、基线、视场、工作距离、深度误差、同步和光照。", "Verify shutter, baseline, FOV, working distance, depth error, synchronization, and lighting by model."), ["research", "logistics", "manufacturing", "integration"], "https://www.realsenseai.com/depth-camera-d400/")],
  },
  {
    slug: "adlink-technology", name: l("凌华科技", "ADLINK Technology"), legalName: l("凌华科技股份有限公司", "ADLINK Technology Inc."), countryCode: "tw", country: l("中国台湾", "Taiwan, China"), headquarters: l("新北", "New Taipei"), founded: "1995",
    role: l("边缘计算与 ROS 2 机器人控制器厂商", "Edge-compute and ROS 2 robotic-controller company"), summary: l("凌华科技的 ROScube 系列把工业计算、传感器 I/O、实时机制和 ROS 2 软件支持组合为机器人控制器，主要面向 AMR、服务机器人和工业自主设备。", "ADLINK's ROScube family combines industrial compute, sensor I/O, real-time mechanisms, and ROS 2 support for AMRs, service robots, and autonomous industrial equipment."),
    businessAreas: [l("ROS 2 机器人控制器", "ROS 2 robotic controllers"), l("工业边缘计算与数据采集", "Industrial edge compute and data acquisition")], customers: [l("AMR、服务机器人、工业自主设备和系统集成团队", "AMR, service-robot, autonomous-equipment, and integration teams")], officialUrl: "https://www.adlinktech.com/en/ROS2-Solution.aspx",
    scope: l("官网当前 ROScube ROS 2 控制器家族；已标记停产的旧型号只保留生命周期说明。", "Current official ROScube ROS 2 controller family; discontinued legacy models remain only as lifecycle references."), coverage: "model-partial",
    products: [
      p("ROScube RQX-59 / RQP families", "model-software", "control-compute", "robot-controller", l("ROS 2 机器人控制器系列", "ROS 2 robotic-controller family"), l("面向移动机器人传感融合、任务执行和边缘推理的工业控制计算平台。", "Industrial control-compute platforms for mobile-robot sensor fusion, task execution, and edge inference."), l("ROS 2、Ubuntu、Jetson 或 Intel 计算、相机与工业 I/O 按型号组合。", "Combines ROS 2, Ubuntu, Jetson or Intel compute, cameras, and industrial I/O by model."), l("核对当前生命周期、处理器版本、实时机制、相机同步、I/O、功耗和 BSP。", "Verify current lifecycle, processor edition, real-time mechanism, camera synchronization, I/O, power, and BSP."), ["logistics", "research", "integration"], "https://www.adlinktech.com/en/ROS2-Solution.aspx")
    ],
  },
  {
    slug: "elmo-motion-control", name: l("Elmo Motion Control", "Elmo Motion Control"), countryCode: "il", country: l("以色列", "Israel"), headquarters: l("佩塔提克瓦", "Petah Tikva"), founded: "1988",
    role: l("高功率密度伺服驱动与运动控制厂商", "High-power-density servo-drive and motion-control company"), summary: l("Elmo Motion Control 提供紧凑伺服驱动、运动控制器和配置软件，产品面向机器人、自动化、医疗与精密运动设备。Platinum 系列强调 EtherCAT、功能安全和高功率密度。", "Elmo Motion Control supplies compact servo drives, motion controllers, and configuration software for robotics, automation, medical, and precision-motion equipment. The Platinum family emphasizes EtherCAT, functional safety, and high power density."),
    businessAreas: [l("伺服驱动与运动控制", "Servo drives and motion control"), l("EtherCAT 与功能安全", "EtherCAT and functional safety")], customers: [l("机器人 OEM、精密设备和运动控制集成商", "Robot OEMs, precision-equipment makers, and motion-control integrators")], officialUrl: "https://www.elmomc.com/",
    scope: l("官网当前机器人相关 Platinum 与 Gold 伺服驱动家族；电流、电压和封装变体按完整订货型号核验。", "Current robotics-related Platinum and Gold servo-drive families; current, voltage, and packaging variants require the full ordering code."), coverage: "model-partial",
    products: [
      p("Platinum Twitter", "motion", "control-compute", "motor-driver", l("紧凑型功能安全伺服驱动器", "Compact functional-safety servo drive"), l("面向空间受限机器人关节和高动态运动轴的 PCB 安装伺服驱动器。", "A PCB-mounted servo drive for space-constrained robot joints and high-dynamic motion axes."), l("EtherCAT、FSoE、多反馈接口与 Composer 2 工具链。", "EtherCAT, FSoE, multiple feedback interfaces, and the Composer 2 toolchain."), l("按订货型号核对 80/100/200 V 版本、电流、散热、反馈、安全功能和认证。", "Verify 80/100/200 V editions, current, cooling, feedback, safety functions, and certification by ordering code."), ["research", "manufacturing", "integration"], "https://www.elmomc.com/product/platinum-twitter/", [
        { label: l("外形尺寸", "Dimensions"), value: l("35 x 30 x 15.3 mm（不含散热器）", "35 x 30 x 15.3 mm without heatsink") },
        { label: l("产品页电流/电压范围", "Published current/voltage range"), value: l("最高 80 A / 80 V、70 A / 100 V 或 35 A / 200 V，取决于型号", "Up to 80 A / 80 V, 70 A / 100 V, or 35 A / 200 V, depending on variant") },
        { label: l("网络与安全", "Network and safety"), value: l("EtherCAT、FSoE，具体安全功能按型号", "EtherCAT and FSoE; exact safety functions are variant-specific") }
      ])
    ],
  },
  {
    slug: "heidenhain", name: l("海德汉", "HEIDENHAIN"), legalName: l("DR. JOHANNES HEIDENHAIN GmbH", "DR. JOHANNES HEIDENHAIN GmbH"), countryCode: "de", country: l("德国", "Germany"), headquarters: l("特劳恩罗伊特", "Traunreut"), founded: "1889",
    role: l("高精度位置测量与编码器厂商", "High-accuracy position-measurement and encoder company"), summary: l("海德汉提供旋转、角度和直线编码器，并面向机器人电机反馈、关节二次测量和高精度运动控制提供专用产品。机器人选型需区分电机侧编码器与减速器输出侧二次编码器。", "HEIDENHAIN supplies rotary, angle, and linear encoders, including products for robot motor feedback, secondary joint measurement, and high-accuracy motion control. Selection must distinguish motor-side feedback from output-side secondary encoders."),
    businessAreas: [l("旋转、角度与直线编码器", "Rotary, angle, and linear encoders"), l("机器人双编码器与二次测量", "Robot dual encoders and secondary measurement")], customers: [l("机器人、电机、机床和精密自动化设备制造商", "Robot, motor, machine-tool, and precision-automation manufacturers")], officialUrl: "https://www.heidenhain.com/industries/robotics",
    scope: l("官网机器人应用中列出的 KCI/KBI、ECI/EBI/EQI 与二次编码器家族；精度与接口按具体型号核验。", "KCI/KBI, ECI/EBI/EQI, and secondary-encoder families presented for robotics; accuracy and interfaces are model-specific."), coverage: "model-partial",
    products: [
      p("KCI / KBI / ECI / EBI / EQI robotics encoder families", "perception", "sensing", "position-motion-sensor", l("机器人旋转与双编码器系列", "Rotary and dual encoder families for robotics"), l("覆盖紧凑电机反馈、大中空轴以及电机侧与输出侧双位置测量。", "Covers compact motor feedback, large hollow shafts, and dual measurement upstream and downstream of gearing."), l("EnDat 等接口、功能安全和机械集成取决于系列及型号。", "Interfaces such as EnDat, functional safety, and mechanical integration depend on family and model."), l("核对测量原理、分辨率、系统精度、允许转速、空心轴、接口和安全认证。", "Verify measurement principle, resolution, system accuracy, permissible speed, hollow shaft, interface, and safety certification."), ["manufacturing", "research", "integration"], "https://www.heidenhain.com/industries/robotics")
    ],
  },
  {
    slug: "wiferion", name: l("Wiferion", "Wiferion"), legalName: l("Wiferion（PULS 品牌）", "Wiferion, a PULS brand"), countryCode: "de", country: l("德国", "Germany"), headquarters: l("弗赖堡", "Freiburg"), founded: "2016",
    role: l("移动机器人感应充电与电池系统厂商", "Inductive charging and battery-system company for mobile robots"), summary: l("Wiferion 面向 AMR、AGV 和工业车辆提供非接触充电、接收端电子、电池和 BMS 集成。产品重点是过程内补能，而不是替代整车能耗与电池热设计。", "Wiferion supplies contactless charging, receiver electronics, batteries, and integrated BMS options for AMRs, AGVs, and industrial vehicles. Its focus is in-process charging rather than replacing vehicle energy and battery thermal design."),
    businessAreas: [l("移动机器人感应充电", "Inductive charging for mobile robots"), l("工业电池与 BMS 集成", "Industrial batteries and integrated BMS")], customers: [l("AMR、AGV、工业车辆厂商和物流自动化集成商", "AMR, AGV, industrial-vehicle, and intralogistics integrators")], officialUrl: "https://www.wiferion.com/en/products/",
    scope: l("官网当前 etaLINK、CW 与 etaSTORE 产品家族；etaSTORE 的地区可用性和电芯组合按项目确认。", "Current official etaLINK, CW, and etaSTORE families; etaSTORE regional availability and cell configuration require project confirmation."), coverage: "model-partial",
    products: [
      p("etaSTORE LFP / LTO battery systems", "motion", "power-energy", "battery-pack", l("移动机器人模块化工业电池系统", "Modular industrial battery systems for mobile robots"), l("为 AMR、AGV 和工业车辆提供 LFP 或 LTO 电池模块及过程内快充能力。", "Provides LFP or LTO battery modules and in-process fast charging for AMRs, AGVs, and industrial vehicles."), l("24 V 模块、CAN、集成 BMS 与 etaLINK/CW 充电系统按方案组合。", "Combines 24 V modules, CAN, integrated BMS, and etaLINK/CW charging by system design."), l("核对地区可用性、串并联规则、可用能量、倍率、循环口径、温度和认证。", "Verify regional availability, series/parallel rules, usable energy, C-rate, cycle definition, temperature, and certification."), ["logistics", "manufacturing", "integration"], "https://www.wiferion.com/en/products/batteries-for-industrial-trucks-automated-guided-vehicles-etastore/", [
        { label: l("化学体系", "Chemistry"), value: l("LFP 或 LTO，取决于型号", "LFP or LTO, depending on model") },
        { label: l("系统电压", "System voltage"), value: l("单模块约 24 V；组合方式按型号", "About 24 V per module; system combination is model-specific") },
        { label: l("通信", "Communication"), value: l("CAN-BUS", "CAN bus") }
      ]),
      p("etaSTORE integrated BMS", "motion", "power-energy", "bms", l("电池系统集成式 BMS", "Integrated battery-management system"), l("etaSTORE 电池模块内置 BMS，用于状态监测、保护以及与充电器的通信。该条目不是独立通用 BMS 商品。", "etaSTORE modules include a BMS for status monitoring, protection, and charger communication. This entry is not a standalone general-purpose BMS product."), l("与 etaSTORE 电池、CAN 和充电系统共同配置。", "Configured with etaSTORE batteries, CAN, and the charging system."), l("核对保护阈值、主从拓扑、CAN 协议、可访问诊断量和第三方充电器兼容性。", "Verify protection thresholds, leader/follower topology, CAN protocol, accessible diagnostics, and third-party charger compatibility."), ["logistics", "manufacturing", "integration"], "https://www.wiferion.com/en/faq/faq-etastore/"),
      p("etaLINK 3000 / CW charger families", "motion", "power-energy", "charger", l("移动机器人非接触充电系统", "Contactless charging systems for mobile robots"), l("为 AMR、AGV 和工业车辆提供 1 kW 至多千瓦级的过程内非接触充电。", "Provides in-process contactless charging from 1 kW into multi-kilowatt classes for AMRs, AGVs, and industrial vehicles."), l("固定发射端、接收端电子、充电线圈、CAN/BMS 通信与电池组合。", "Combines stationary transmitter, receiver electronics, coils, CAN/BMS communication, and batteries."), l("核对功率等级、输入供电、充电电压电流、位置容差、间隙、IP 和电池协议。", "Verify power class, input supply, charging voltage/current, positioning tolerance, gap, IP rating, and battery protocol."), ["logistics", "manufacturing", "integration"], "https://www.wiferion.com/en/products/etalink-3000-inductive-charging-with-3-kw/", [
        { label: l("etaLINK 3000 连续功率", "etaLINK 3000 continuous power"), value: l("3000 W", "3000 W") },
        { label: l("充电电压", "Charging voltage"), value: l("15-60 V", "15-60 V") },
        { label: l("防护等级", "Ingress protection"), value: l("IP65 / IP68，按部件", "IP65 / IP68, depending on component") }
      ])
    ],
  },
  {
    slug: "puls", name: l("PULS", "PULS"), legalName: l("PULS GmbH", "PULS GmbH"), countryCode: "de", country: l("德国", "Germany"), headquarters: l("慕尼黑", "Munich"),
    role: l("工业电源、DC/DC 与直流保护厂商", "Industrial power-supply, DC/DC, and DC-protection company"), summary: l("PULS 提供 DIN 导轨与现场安装工业电源、DC/DC、UPS、缓冲和电子保护模块。对机器人而言，适合控制柜、移动设备充电基础设施和分布式 I/O 供电，但必须按整机电源预算与峰值工况选型。", "PULS supplies DIN-rail and field-mounted power supplies, DC/DC converters, UPS, buffer, and electronic-protection modules. In robotics they fit control cabinets, mobile-equipment charging infrastructure, and distributed I/O power, subject to full-system power and peak-load design."),
    businessAreas: [l("工业 AC/DC 与 DC/DC", "Industrial AC/DC and DC/DC"), l("直流保护、UPS 与现场电源", "DC protection, UPS, and field power")], customers: [l("自动化设备、控制柜、机器人单元和系统集成商", "Automation equipment, control-panel, robot-cell, and system integrators")], officialUrl: "https://products.pulspower.com/en/",
    scope: l("官网当前 FIEPOS、DIMENSION、PIANO 与补充单元产品族；具体输出与认证按订货号。", "Current FIEPOS, DIMENSION, PIANO, and supplementary-unit families; output and approvals are ordering-code specific."), coverage: "model-partial",
    products: [
      p("FIEPOS / DIMENSION power-supply families", "motion", "power-energy", "power-supply", l("工业现场与控制柜电源系列", "Industrial field and control-cabinet power supplies"), l("覆盖 IP54/IP65/IP67 现场电源、DIN 导轨 AC/DC、DC/DC 和智能通信电源。", "Covers IP54/IP65/IP67 field power, DIN-rail AC/DC, DC/DC, and smart communicating power supplies."), l("按现场或控制柜安装，与 EtherCAT、IO-Link、保护和冗余模块组合。", "Configured for field or cabinet installation with EtherCAT, IO-Link, protection, and redundancy modules."), l("核对输入制式、输出电压电流、峰值能力、效率、温度降额、IP、连接器和认证。", "Verify input type, output voltage/current, peak capability, efficiency, temperature derating, IP rating, connectors, and approvals."), ["manufacturing", "integration"], "https://products.pulspower.com/en/", [
        { label: l("FIEPOS 功率等级", "FIEPOS power classes"), value: l("约 94-500 W，按型号", "About 94-500 W, depending on model") },
        { label: l("典型输出", "Typical output"), value: l("24 V DC；其他输出按系列", "24 V DC; other outputs depend on family") }
      ])
    ],
  },
  {
    slug: "hms-networks", name: l("HMS Networks", "HMS Networks"), legalName: l("HMS Networks AB", "HMS Networks AB"), countryCode: "se", country: l("瑞典", "Sweden"), headquarters: l("哈尔姆斯塔德", "Halmstad"), founded: "1988",
    role: l("工业网络、网关与无线连接厂商", "Industrial-network, gateway, and wireless-connectivity company"), summary: l("HMS Networks 通过 Anybus、Ixxat 等产品连接机器人、控制器、传感器和工业网络。对机器人项目的价值在于协议适配与设备接入，不应被误解为替代实时控制器或安全网络设计。", "HMS Networks connects robots, controllers, sensors, and industrial networks through Anybus, Ixxat, and related products. Its role is protocol adaptation and device connectivity rather than replacing real-time controllers or safety-network design."),
    businessAreas: [l("工业协议网关与嵌入式通信", "Industrial protocol gateways and embedded communication"), l("工业无线与远程接入", "Industrial wireless and remote access")], customers: [l("机器人 OEM、自动化设备厂商、系统集成商和工厂网络团队", "Robot OEMs, automation-equipment makers, integrators, and factory-network teams")], officialUrl: "https://www.hms-networks.com/",
    scope: l("官网当前 Anybus 网关与工业无线产品族；协议组合、认证和生命周期按完整产品号。", "Current Anybus gateway and industrial-wireless families; protocol pair, certification, and lifecycle are full-part-number specific."), coverage: "model-partial",
    products: [
      p("Anybus Communicator / X-gateway families", "model-software", "communication-connectivity", "industrial-network", l("工业协议网关与转换器系列", "Industrial protocol gateway and converter families"), l("在串行、CAN、工业以太网与现场总线之间映射设备和控制系统数据。", "Maps device and control-system data across serial, CAN, industrial Ethernet, and fieldbus networks."), l("DIN 导轨网关、Web 配置、PLC 网络和设备侧协议按订货号组合。", "Combines DIN-rail gateway hardware, web configuration, PLC networks, and device-side protocols by part number."), l("核对主站/从站角色、协议方向、数据量、周期、诊断、安全认证和固件生命周期。", "Verify controller/device role, protocol direction, data volume, cycle time, diagnostics, safety certification, and firmware lifecycle."), ["manufacturing", "integration"], "https://www.hms-networks.com/industrial-gateways-for-device-manufacturers"),
      p("Anybus Wireless Bolt / Bridge families", "model-software", "communication-connectivity", "wireless", l("工业无线桥与设备接入系列", "Industrial wireless bridge and device-access family"), l("为移动设备、控制柜或机器提供 Wi-Fi、Bluetooth 或 5G 等无线接入选择。", "Provides Wi-Fi, Bluetooth, or 5G connectivity options for mobile equipment, control cabinets, and machines."), l("以太网或串行设备、天线/外壳与无线网络按具体型号组合。", "Combines Ethernet or serial devices, antenna/enclosure, and wireless network by model."), l("核对无线制式、频段、距离、漫游、时延、网络安全、认证和现场射频环境。", "Verify wireless standard, band, range, roaming, latency, cybersecurity, approvals, and site RF conditions."), ["logistics", "manufacturing", "integration"], "https://support.hms-networks.com/hc/en-us/sections/5478145145746-Anybus-Wireless")
    ],
  },
  {
    slug: "harting", name: l("浩亭", "HARTING"), legalName: l("HARTING Technology Group", "HARTING Technology Group"), countryCode: "de", country: l("德国", "Germany"), headquarters: l("埃斯佩尔坎普", "Espelkamp"), founded: "1945",
    role: l("工业连接器、线束与机器人连接方案厂商", "Industrial connector, harness, and robotic-connectivity company"), summary: l("HARTING 为工业机器人、协作机器人、AMR 和控制柜提供电力、信号和数据连接器、预制线束及线缆管理。选型必须同时考虑电气额定值、动态弯扭、插拔寿命和环境防护。", "HARTING supplies power, signal, and data connectors, preassembled harnesses, and cable management for industrial robots, cobots, AMRs, and control cabinets. Selection must combine electrical ratings, dynamic bend/torsion, mating life, and environmental protection."),
    businessAreas: [l("工业连接器与模块化接口", "Industrial connectors and modular interfaces"), l("机器人线束与线缆管理", "Robot harnesses and cable management")], customers: [l("机器人 OEM、控制柜、自动化设备和系统集成商", "Robot OEMs, control-panel builders, automation-equipment makers, and integrators")], officialUrl: "https://www.harting.com/en-GB/robotics",
    scope: l("官网机器人连接方案中公开的连接器、预制线束与管理系统；具体针位和线缆组合按项目配置。", "Connectors, preassembled harnesses, and management systems published for robotics; pinout and cable assembly are project-specific."), coverage: "model-partial",
    products: [
      p("Robotics connector and cable-assembly portfolio", "motion", "communication-connectivity", "connector-cable", l("机器人连接器、线缆与线束产品族", "Robot connector, cable, and harness portfolio"), l("覆盖机器人本体、末端工具、控制柜和 AMR 的电力、信号与数据连接。", "Covers power, signal, and data connections across robot bodies, end tools, control cabinets, and AMRs."), l("连接器、预制线束、动态线缆和线缆管理按机械与电气需求组合。", "Combines connectors, preassembled harnesses, dynamic cables, and cable management to mechanical and electrical requirements."), l("核对电压电流、针位、协议、屏蔽、弯扭寿命、插拔寿命、IP 和认证。", "Verify voltage/current, pinout, protocol, shielding, flex/torsion life, mating life, IP rating, and approvals."), ["manufacturing", "integration"], "https://www.harting.com/en-GB/robotics")
    ],
  },
  {
    slug: "beckhoff", name: l("倍福", "Beckhoff Automation"), legalName: l("Beckhoff Automation GmbH & Co. KG", "Beckhoff Automation GmbH & Co. KG"), countryCode: "de", country: l("德国", "Germany"), headquarters: l("费尔", "Verl"), founded: "1980",
    role: l("PC 控制、EtherCAT、I/O 与运动控制厂商", "PC-based control, EtherCAT, I/O, and motion-control company"), summary: l("倍福以 PC 控制、TwinCAT、EtherCAT I/O 和伺服系统构成自动化平台。机器人项目中常用于单元控制、分布式 I/O、驱动与现场总线集成，但系统实时性和安全责任取决于完整架构。", "Beckhoff combines PC-based control, TwinCAT, EtherCAT I/O, and servo systems into an automation platform. In robotics it is used for cell control, distributed I/O, drives, and fieldbus integration, while real-time and safety responsibility depend on the full architecture."),
    businessAreas: [l("PC 控制与 TwinCAT", "PC-based control and TwinCAT"), l("EtherCAT I/O、运动与安全", "EtherCAT I/O, motion, and safety")], customers: [l("机器制造商、机器人单元、测试设备和系统集成商", "Machine builders, robot cells, test systems, and system integrators")], officialUrl: "https://www.beckhoff.com/",
    scope: l("官网当前 EtherCAT 端子、工业 PC、TwinCAT 与驱动产品族；单元级配置不拆成固定机器人套件。", "Current EtherCAT terminals, industrial PCs, TwinCAT, and drive families; cell-level configurations are not treated as fixed robot kits."), coverage: "model-partial",
    products: [
      p("EtherCAT EL / ED / ELM terminal families", "model-software", "communication-connectivity", "io-module", l("模块化 EtherCAT I/O 与测量端子系列", "Modular EtherCAT I/O and measurement terminal families"), l("覆盖数字量、模拟量、编码器、通信、紧凑驱动、安全和高速测量信号。", "Covers digital, analog, encoder, communication, compact-drive, safety, and high-speed measurement signals."), l("EtherCAT 耦合器、端子、TwinCAT 与传感器/执行器按通道需求组合。", "Combines EtherCAT couplers, terminals, TwinCAT, and sensors/actuators by channel requirements."), l("核对信号类型、通道数、采样率、同步、隔离、接线、温度和 TwinSAFE 边界。", "Verify signal type, channel count, sampling, synchronization, isolation, wiring, temperature, and TwinSAFE boundary."), ["manufacturing", "integration"], "https://www.beckhoff.com/en-en/products/i-o/ethercat-terminals/")
    ],
  },
  {
    slug: "thk", name: l("THK", "THK"), legalName: l("THK 株式会社", "THK CO., LTD."), countryCode: "jp", country: l("日本", "Japan"), headquarters: l("东京", "Tokyo"), founded: "1971",
    role: l("直线运动、精密轴承与传动部件厂商", "Linear-motion, precision-bearing, and transmission-component company"), summary: l("THK 产品覆盖 LM 导轨、滚珠丝杠、直线模组和交叉滚子轴承。机器人应用中，交叉滚子轴承常用于关节与旋转单元，LM 导轨和丝杠用于直线轴、升降与外部轴。", "THK offers LM guides, ball screws, linear actuators, and cross-roller rings. In robotics, cross-roller rings serve joints and rotary units, while LM guides and screws support linear axes, lifts, and external axes."),
    businessAreas: [l("LM 导轨与直线模组", "LM guides and linear modules"), l("交叉滚子轴承与滚珠丝杠", "Cross-roller rings and ball screws")], customers: [l("机器人、机床、半导体设备和精密自动化制造商", "Robot, machine-tool, semiconductor-equipment, and precision-automation manufacturers")], officialUrl: "https://www.thk.com/",
    scope: l("官网当前 LM Guide、Cross-Roller Ring 与 Ball Screw 产品族；尺寸、精度和预紧按具体型号。", "Current LM Guide, Cross-Roller Ring, and Ball Screw families; dimensions, accuracy, and preload are model-specific."), coverage: "model-partial",
    products: [
      p("Cross-Roller Ring families", "motion", "structure-thermal", "bearing", l("机器人关节用交叉滚子轴承系列", "Cross-roller bearing families for robot joints"), l("单个轴承承受径向、轴向和倾覆力矩载荷，适合紧凑高刚度旋转结构。", "A single bearing supports radial, axial, and moment loads for compact high-rigidity rotary structures."), l("关节壳体、减速器输出和安装预紧按型号与结构共同设计。", "Joint housing, reducer output, and mounting preload are co-designed around the selected model."), l("核对内外径、载荷、刚度、精度、预紧、密封、润滑、寿命和安装公差。", "Verify ID/OD, load, stiffness, accuracy, preload, sealing, lubrication, life, and mounting tolerance."), ["manufacturing", "integration"], "https://www.thk.com/us/en/products/cross_roller_ring/cross_roller_ring/"),
      p("LM Guide families", "motion", "structure-thermal", "linear-guide", l("滚动直线导轨系列", "Rolling linear-guide families"), l("为机器人外部轴、升降、滑台和自动化设备提供高刚度低摩擦直线运动。", "Provides high-rigidity, low-friction linear motion for robot external axes, lifts, stages, and automation equipment."), l("导轨、滑块、密封、润滑和安装基准按负载与环境组合。", "Combines rails, blocks, seals, lubrication, and mounting datum to load and environment."), l("核对四向载荷、力矩、精度、预紧、速度、润滑、污染防护和基座精度。", "Verify four-way load, moment, accuracy, preload, speed, lubrication, contamination protection, and base accuracy."), ["manufacturing", "integration"], "https://www.thk.com/us/en/products/lm_guide/"),
      p("Ball Screw families", "motion", "motion-transmission", "transmission", l("精密与轧制滚珠丝杠系列", "Precision and rolled ball-screw families"), l("将旋转运动转换为高效率直线运动，用于升降轴、滑台、夹持和机器人外部轴。", "Converts rotary motion to efficient linear motion for lifts, stages, clamping, and robot external axes."), l("丝杠、螺母、支撑轴承、润滑与电机联轴器按轴系组合。", "Combines screw, nut, support bearings, lubrication, and motor coupling into an axis."), l("核对直径、导程、额定载荷、临界转速、精度、预紧、寿命和防护。", "Verify diameter, lead, load rating, critical speed, accuracy, preload, life, and protection."), ["manufacturing", "integration"], "https://www.thk.com/us/en/products/ball_screw/")
    ],
  },
  {
    slug: "misumi", name: l("米思米", "MISUMI"), legalName: l("MISUMI Group Inc.", "MISUMI Group Inc."), countryCode: "jp", country: l("日本", "Japan"), headquarters: l("东京", "Tokyo"), founded: "1963",
    role: l("可配置机械标准件与自动化结构部件供应商", "Configurable mechanical-component and automation-structure supplier"), summary: l("MISUMI 提供可配置铝型材、框架连接件、机器人架台、外装件和大量自动化标准件。其优势是规格化选型与 CAD/交付流程，不代表框架结构无需进行刚度、振动和安全校核。", "MISUMI supplies configurable aluminum extrusions, frame connectors, robot bases, enclosure parts, and automation components. Its catalog and CAD workflow do not remove the need for stiffness, vibration, and safety verification."),
    businessAreas: [l("铝型材、机架与外装件", "Aluminum extrusions, frames, and enclosure parts"), l("自动化机械标准件", "Automation mechanical components")], customers: [l("设备设计、机器人工作站、实验装置和自动化集成团队", "Equipment designers, robot workcells, laboratory rigs, and automation integrators")], officialUrl: "https://us.misumi-ec.com/",
    scope: l("机器人结构相关的铝型材、连接件、面板、架台与配置服务；全站通用零件不全部纳入机器人目录。", "Robot-structure-related extrusions, connectors, panels, bases, and configuration services; the entire general catalog is not treated as robotics-specific."), coverage: "model-partial",
    products: [
      p("Aluminum extrusion and robot-base families", "motion", "structure-thermal", "structure", l("可配置铝型材、框架与机器人架台系列", "Configurable extrusion, frame, and robot-base families"), l("用于机器人工作站、护栏、设备框架、传感器支架和试验平台。", "Used for robot workcells, guards, equipment frames, sensor mounts, and test platforms."), l("型材、连接件、面板、脚轮、调平件和 CAD 配置按结构需求组合。", "Combines extrusions, joints, panels, casters, leveling elements, and CAD configuration to structural requirements."), l("核对截面惯性、连接刚度、载荷、振动、地脚、护栏标准、加工公差和交付长度。", "Verify section inertia, joint stiffness, load, vibration, anchoring, guarding standards, machining tolerance, and delivered length."), ["manufacturing", "research", "integration"], "https://us.misumi-ec.com/maker/misumi/mech/product/al/")
    ],
  },
  {
    slug: "boyd-thermal", name: l("Boyd Thermal", "Boyd Thermal"), legalName: l("Boyd Thermal（Eaton 旗下）", "Boyd Thermal, part of Eaton"), countryCode: "us", country: l("美国", "United States"),
    role: l("液冷、风冷与两相热管理方案厂商", "Liquid, air, and two-phase thermal-management company"), summary: l("Boyd Thermal 提供冷板、液冷回路、换热器、散热器、风扇和两相热管理。机器人中的高算力控制器、电池与紧凑执行器可借鉴这些方案，但多数产品需要按热源、空间和环境定制。", "Boyd Thermal supplies cold plates, liquid loops, heat exchangers, heat sinks, fans, and two-phase cooling. Robotics compute, batteries, and compact actuators can use these approaches, but many products are engineered to the heat source, envelope, and environment."),
    businessAreas: [l("液冷系统与冷板", "Liquid-cooling systems and cold plates"), l("风冷、导热与两相散热", "Air, conduction, and two-phase cooling")], customers: [l("高算力设备、电池、电力电子和紧凑机电系统制造商", "High-compute, battery, power-electronics, and compact-mechatronics manufacturers")], officialUrl: "https://www.boydcorp.com/thermal.html",
    scope: l("官网公开的液冷、风冷、导热与两相热管理产品族；机器人专用配置通常为工程定制。", "Public liquid, air, conduction, and two-phase thermal families; robot-specific configurations are generally engineered."), coverage: "model-partial",
    products: [
      p("Liquid cold plates and cooling-loop families", "motion", "structure-thermal", "thermal-management", l("液冷冷板与系统部件系列", "Liquid cold-plate and cooling-system families"), l("将高热流密度芯片、电力电子或电池的热量传递到冷却回路和换热器。", "Transfers heat from high-flux compute, power electronics, or batteries into a liquid loop and heat exchanger."), l("冷板、泵、管路、快接、换热器、传感与控制按热设计组合。", "Combines cold plates, pumps, tubing, quick disconnects, heat exchangers, sensing, and controls to the thermal design."), l("核对热负载、允许温升、压降、流量、材料兼容、泄漏测试、振动、质量和维护。", "Verify heat load, allowable temperature rise, pressure drop, flow, material compatibility, leak testing, vibration, mass, and serviceability."), ["manufacturing", "integration"], "https://www.boydcorp.com/thermal/liquid-cooling-systems.html")
    ],
  },
  {
    slug: "cyberbotics", name: l("Cyberbotics", "Cyberbotics"), countryCode: "ch", country: l("瑞士", "Switzerland"), headquarters: l("洛桑", "Lausanne"), founded: "1998",
    role: l("机器人仿真软件与开发服务厂商", "Robot-simulation software and development-services company"), summary: l("Cyberbotics 开发 Webots 开源机器人仿真器，支持机器人、传感器、物理场景和多种控制语言。它适合算法原型、教育和持续测试，但仿真参数必须通过实机数据校准。", "Cyberbotics develops the open-source Webots robot simulator with robot, sensor, physics-scene, and multi-language control support. It fits prototyping, education, and continuous testing, but simulation parameters require calibration against real hardware."),
    businessAreas: [l("Webots 机器人仿真", "Webots robot simulation"), l("机器人仿真模型与工程服务", "Robot models and simulation engineering")], customers: [l("高校、实验室、机器人开发团队和持续集成测试团队", "Universities, laboratories, robot developers, and CI test teams")], officialUrl: "https://www.cyberbotics.com/",
    scope: l("Webots 当前开源版本、官方模型和文档；社区模型需单独核验来源与精度。", "Current open-source Webots, official models, and documentation; community models require separate provenance and accuracy review."), coverage: "family-complete",
    products: [
      p("Webots", "model-software", "software-tools", "simulation", l("开源机器人仿真器", "Open-source robot simulator"), l("用于移动机器人、机械臂、无人系统和传感器的物理仿真、控制开发和测试。", "Supports physics simulation, controller development, and testing for mobile robots, manipulators, autonomous systems, and sensors."), l("C/C++、Python、Java、MATLAB、ROS 2 与多种机器人模型按项目组合。", "Integrates C/C++, Python, Java, MATLAB, ROS 2, and robot models by project."), l("核对物理参数、接触模型、传感器噪声、控制周期、模型来源和实机一致性。", "Verify physics parameters, contact model, sensor noise, control cycle, model provenance, and hardware correlation."), ["research", "integration"], "https://www.cyberbotics.com/")
    ],
  },
  {
    slug: "open-robotics", name: l("Open Robotics", "Open Robotics"), countryCode: "us", country: l("美国", "United States"),
    role: l("开源机器人软件基础设施组织", "Open-source robotics software infrastructure organization"), summary: l("Open Robotics 发起并维护 ROS 及相关开源机器人基础设施。ROS 2 提供通信抽象、工具、库和生态接口，但具体系统的实时性、安全、网络质量和生命周期仍由集成方案承担。", "Open Robotics initiated and maintains ROS and related open-source robotics infrastructure. ROS 2 provides communication abstractions, tools, libraries, and ecosystem interfaces, while real-time behavior, safety, network quality, and lifecycle remain system-integration responsibilities."),
    businessAreas: [l("ROS 2 中间件与开发生态", "ROS 2 middleware and development ecosystem"), l("开源机器人基础设施", "Open-source robotics infrastructure")], customers: [l("机器人研发、教育、产品开发和系统集成团队", "Robotics research, education, product-development, and integration teams")], officialUrl: "https://www.openrobotics.org/",
    scope: l("ROS 2 官方发行版、核心文档与治理项目；第三方软件包不自动视为 Open Robotics 产品。", "Official ROS 2 distributions, core documentation, and governed projects; third-party packages are not automatically treated as Open Robotics products."), coverage: "family-complete",
    products: [
      p("ROS 2", "model-software", "software-tools", "middleware", l("开源机器人软件开发套件与中间件生态", "Open-source robotics SDK and middleware ecosystem"), l("为机器人节点、消息、服务、动作、工具和跨平台软件复用提供基础设施。", "Provides infrastructure for robot nodes, messages, services, actions, tooling, and cross-platform software reuse."), l("DDS/RMW、Linux/Windows、仿真、可视化和厂商驱动按发行版与项目组合。", "Combines DDS/RMW, Linux/Windows, simulation, visualization, and vendor drivers by distribution and project."), l("核对发行版支持期、RMW 实现、QoS、实时内核、网络、安全、包维护和目标硬件。", "Verify distribution support period, RMW implementation, QoS, real-time kernel, network, security, package maintenance, and target hardware."), ["research", "integration"], "https://docs.ros.org/en/jazzy/")
    ],
  },
];

const localize = (locale: Locale, value: Localized) => value[locale];
const reviewDate = "2026-09-02";

const toParameter = (locale: Locale, item: NonNullable<ProductSeed["parameters"]>[number]): FinderParameter => ({
  label: localize(locale, item.label),
  value: item.value ? localize(locale, item.value) : (locale === "zh" ? "待补充" : "Pending"),
  status: item.value ? "manufacturer" : "unknown",
});

export const phaseOneCountryBySlug = Object.fromEntries(companies.map((company) => [company.slug, company.countryCode]));

export function getPhaseOneCompanyProfiles(locale: Locale): CompanyProfile[] {
  return companies.map((company) => {
    const name = localize(locale, company.name);
    const productNames = company.products.map((product) => product.name);
    const businessAreas = company.businessAreas.map((item) => localize(locale, item));
    const customerGroups = company.customers.map((item) => localize(locale, item));
    const catalogScope = localize(locale, company.scope);
    const summary = localize(locale, company.summary);
    const role = localize(locale, company.role);
    return {
      slug: company.slug,
      name,
      englishName: company.name.en,
      industry: company.products.some((product) => product.category === "end-effector" || product.category === "perception") ? "dexterous-hands" : "robotics",
      valueChainRole: role,
      positioning: summary,
      strengths: businessAreas,
      products: productNames,
      fit: customerGroups,
      verificationFocus: locale === "zh"
        ? `先确认目录覆盖范围和产品生命周期，再按具体型号核验公开参数、接口、交付配置、维护与验收条件。${catalogScope}`
        : `Confirm catalog scope and lifecycle first, then verify model-level public specifications, interfaces, delivery configuration, maintenance, and acceptance conditions. ${catalogScope}`,
      presalesQuestions: locale === "zh"
        ? ["当前官网目录中哪些型号仍可采购或进入试点？", "目标任务对应哪个具体型号、配置、接口和软件版本？", "公开参数对应什么工况，哪些字段需要厂商书面确认？"]
        : ["Which models in the current official catalog are purchasable or available for pilot work?", "Which exact model, configuration, interfaces, and software version fit the target task?", "What conditions apply to public specifications, and which fields require written vendor confirmation?"],
      sourceIds: [],
      reviewedAt: reviewDate,
      legalName: company.legalName ? localize(locale, company.legalName) : undefined,
      country: localize(locale, company.country),
      headquarters: company.headquarters ? localize(locale, company.headquarters) : undefined,
      founded: company.founded,
      officialUrl: company.officialUrl,
      overview: [summary, locale === "zh" ? `产品目录口径：${catalogScope}` : `Catalog scope: ${catalogScope}`],
      businessAreas,
      customerGroups,
      catalogScope,
      catalogCoverage: company.coverage,
    };
  });
}

export function getPhaseOneProductRecords(locale: Locale): FinderExpansionRecord[] {
  return companies.flatMap((company) => {
    const profile = getPhaseOneCompanyProfiles(locale).find((item) => item.slug === company.slug)!;
    return company.products.map((product, index) => ({
      id: `phase-one-${company.slug}-${index + 1}`,
      matrixSlug: "",
      matrixTitle: locale === "zh" ? "机灵仓第一阶段产品目录" : "Jeeling phase-one product catalog",
      industry: profile.industry,
      reviewedAt: reviewDate,
      product: product.name,
      company: profile.name,
      type: localize(locale, product.type),
      openness: locale === "zh" ? "官方产品页或官方公司资料可查" : "Official product page or company material available",
      integration: localize(locale, product.integration),
      verificationFocus: localize(locale, product.verification),
      sourceIds: [],
      officialUrl: product.officialUrl,
      category: product.category,
      useCases: product.useCases,
      opennessLevel: "documented",
      parameters: product.parameters?.length
        ? product.parameters.map((item) => toParameter(locale, item))
        : [
            { label: locale === "zh" ? "产品层级" : "Catalog level", value: locale === "zh" ? "产品系列" : "Product family", status: "manufacturer" as const },
            { label: locale === "zh" ? "型号参数" : "Model specifications", value: locale === "zh" ? "按官网具体型号复核" : "Verify against the official model page", status: "unknown" as const },
          ],
      catalogPrimary: product.primary,
      catalogSubclass: product.subclass,
      catalogCoverage: company.coverage,
      catalogScope: profile.catalogScope,
      profile: {
        slug: profile.slug,
        valueChainRole: profile.valueChainRole ?? "",
        positioning: localize(locale, product.summary),
        strengths: profile.strengths ?? [],
        products: profile.products,
        fit: profile.fit ?? [],
        questions: profile.presalesQuestions,
        sourceIds: [],
        reviewedAt: reviewDate,
        legalName: profile.legalName,
        country: profile.country,
        headquarters: profile.headquarters,
        founded: profile.founded,
        officialUrl: profile.officialUrl,
        overview: profile.overview,
        businessAreas: profile.businessAreas,
        customerGroups: profile.customerGroups,
        milestones: profile.milestones,
        catalogScope: profile.catalogScope,
        catalogCoverage: profile.catalogCoverage,
      },
    }));
  });
}
