type Evidence = {
  sourceUrl: string;
  locator: string;
  markers: string[];
  kind: 'primary-source' | 'editorial-boundary';
};
type OverviewParagraph = { zh: string; en: string; evidence: Evidence[] };
const source = (sourceUrl: string, locator: string, markers: string[], kind: Evidence['kind'] = 'primary-source'): Evidence => ({ sourceUrl, locator, markers, kind });
const inspire = 'https://en.inspire-robots.com/about-us/';
const inspireChinese = 'https://www.inspire-robots.com/about%20us/profile/';
const inspireActuators = 'https://en.inspire-robots.com/product-category/micro-linear-servo-actuator/';
const inspireHands = 'https://en.inspire-robots.com/product-category/the-dexterous-hands/';
const dh = 'https://en.dh-robotics.com/about';
const dhApplications = 'https://en.dh-robotics.com/applications';
const dhVolkswagen = 'https://en.dh-robotics.com/case/saic-volkswagen';
const dhSamsung = 'https://en.dh-robotics.com/case/samsung';
const tesollo = 'https://www.tesollo.com/company';
const tesolloTechnology = 'https://www.tesollo.com/technology';
const tesolloSolutions = 'https://www.tesollo.com/solutions';
const ati = 'https://ati.novanta.com/about/';
const atiApplications = 'https://ati.novanta.com/applications/';
const atiComau = 'https://ati.novanta.com/application/ati-tool-changers-and-comaus-smartcell-make-flexible-assembly-a-reality/';
const atiSimulator = 'https://ati.novanta.com/application/ati-force-torque-sensor-at-the-core-of-cutting-edge-orthopaedic-simulator/';
const atiAcquisition = 'https://investors.novanta.com/news/news-details/2021/Novanta-Announces-Agreement-to-Acquire-ATI/default.aspx';

// Funding corrections are isolated in catalog-enrichment-inspire-financing-20260914.ts; product seeds are not edited.
// Raw-source provenance: sources.json and qa-hold-validation.json in the dated overview-repair review directory.
export const grippingOverviewReviewedAt = '2026-09-14';
export const grippingOverviewRepairs: Record<string, OverviewParagraph[]> = {
  'inspire-robots': [
    {
      zh: '北京因时机器人科技有限公司于 2016 年在北京成立，围绕微型运动控制研发机器人核心部件。其业务包括微型直线伺服执行器、五指灵巧手和电动夹爪，提供从紧凑驱动部件到机器人操作末端的产品。',
      en: 'Beijing Inspire Robots Technology Co., Ltd. was established in Beijing in 2016. It develops robotic components around miniature motion control, spanning micro linear servo actuators, five-finger hands and electric grippers, from compact drive components to manipulation end effectors.',
      evidence: [source(inspire, 'About Us; Company History / 2016; product navigation', ['Founded in 2016', 'Electric Gripper'])],
    },
    {
      zh: '执行器目录区分 LA、LAS、LAF、LASF 与 BLA 等系列，其中部分系列配有力传感器，用于推拉力闭环控制。灵巧手则按型号提供不同的结构与感知配置。执行器的力控能力不能直接等同于所有手部型号均开放同一种关节力矩接口。',
      en: 'The actuator catalog separates LA, LAS, LAF, LASF and BLA families; selected families incorporate force sensing for closed-loop push/pull control. Hand models offer different mechanical and sensing configurations. Actuator force control does not establish a common exposed joint-torque interface across every hand.',
      evidence: [source(inspireActuators, 'Product categories; LASF family descriptions', ['LASF30', 'closed-loop control']), source(inspireHands, 'Dexterous-hand model listings', ['RH56BFX', 'RH5DG2']), source(inspireActuators, 'Model-specific capability boundary', ['LASF30'], 'editorial-boundary')],
    },
    {
      zh: '官网列出的应用行业包括机器人、新能源、半导体、3C 电子和生物医疗，并提供选型、集成及售后支持。中文网站的合作伙伴栏列示宇树科技、优必选及高校等机构；这属于厂商发布的合作方展示，不等于所有机构都有可核验的当前订单，也不能推算客户收入占比。',
      en: 'Inspire identifies robotics, new energy, semiconductors, 3C electronics and biomedical applications, with selection, integration and after-sales support. Its Chinese partner section lists Unitree, UBTECH and universities. This vendor-published partner list does not establish current orders from every institution or customer revenue shares.',
      evidence: [source(inspire, 'About Us; Mature implementation', ['semiconductors', 'after-sales']), source(inspireChinese, 'Partners section', ['合作伙伴', '宇树科技', '优必选', '清华大学']), source(inspireChinese, 'Partner-list versus customer-order boundary', ['合作伙伴'], 'editorial-boundary')],
    },
    {
      zh: '公司史记载苏州工厂于 2024 年投产，2025 年灵巧手出货超过 10,000 只、微型执行器产能为 100,000 台。两者分别是厂商披露的出货与产能口径，不能相互替代，也不是营收或特定任务下抓取成功率、寿命的证明。',
      en: 'Its history records the Suzhou factory opening in 2024, then over 10,000 hand shipments and 100,000-unit actuator capacity in 2025. These are company-reported shipment and capacity measures, not interchangeable figures, revenue, or evidence of task-specific grasp success and service life.',
      evidence: [source(inspire, 'Company History / 2024 and 2025', ['Suzhou factory', '100,000']), source(inspire, 'Shipment/capacity and task-validation boundary', ['Company History'], 'editorial-boundary')],
    },
  ],
  'dh-robotics': [
    {
      zh: '大寰机器人是面向工业制造的机器人核心部件与精密运动产品供应商，官网列出深圳研发总部和东莞制造中心。其技术方向包括直驱力反馈、精密控制及机电集成，业务从夹持延伸到旋转、直线运动和柔性输送。',
      en: 'DH-Robotics supplies robotic components and precision-motion products for industrial manufacturing, with a Shenzhen R&D headquarters and Dongguan manufacturing center. Its stated technical focus includes direct-drive force feedback, precision control and integration, spanning gripping, rotation, linear motion and flexible transport.',
      evidence: [source(dh, 'Company introduction; Core Technologies; Where Innovation Meets Production', ['Dongguan Manufacturing Center', 'Direct Drive Force Feedback Technology'])],
    },
    {
      zh: '产品组合包括电动与旋转夹爪、音圈和直驱执行器、伺服电缸及驱动器，也覆盖灵巧手、iFM 智能柔性运动系统和六自由度并联平台。它既提供机器人末端部件，也提供设备内部的运动单元；系列级能力说明不能替代具体型号的额定参数。',
      en: 'The portfolio includes electric and rotary grippers, voice-coil and direct-drive actuators, servo cylinders and drives, alongside dexterous hands, iFM flexible-motion systems and hexapods. It serves both robot tooling and motion within equipment. Family-level capabilities are not substitutes for model-specific ratings.',
      evidence: [source(dh, 'Diverse Product Lineup; current product navigation', ['Diverse Product Lineup', 'Hexapods']), source(dh, 'Family-versus-model boundary', ['Diverse Product Lineup'], 'editorial-boundary')],
    },
    {
      zh: '其应用页面面向医疗自动化、电子、汽车及一般自动化，列出分拣、抓取、装配、上下料和开合盖等任务。上汽大众案例介绍汽车零部件定位与装配，三星案例介绍手机镜头模组上下料及光学检测；这些是厂商发布的应用案例，不能据此认定独家供货、当前采购规模或客户集中度。',
      en: 'DH targets medical automation, electronics, automotive and general automation, with sorting, gripping, assembly, machine tending and lid handling tasks. Its SAIC Volkswagen case describes automotive part positioning and assembly; its Samsung case describes phone-lens module handling and optical inspection. These vendor-published cases do not establish exclusivity, current purchasing volume or customer concentration.',
      evidence: [source(dhApplications, 'Industry Applications; Core tasks', ['Medical automation', 'Assembly']), source(dhVolkswagen, 'Demonstration cases / process description', ['positioning and assembly']), source(dhSamsung, 'Demonstration cases / process description', ['mobile phone lens module', 'optical inspection']), source(dhApplications, 'Case-study interpretation', ['Demonstration cases'], 'editorial-boundary')],
    },
    {
      zh: '公司简介披露累计出货 200,000 多台、覆盖 60 多个国家和地区，并列示近五年 120% 的复合增长率。这些为厂商统计，其中增长率没有明确指标基数，不宜称为收入增长。应用演示也不能替代持续工况、热与寿命验证。',
      en: 'The company reports over 200,000 cumulative shipments, coverage of more than 60 countries and regions, and 120% compound growth over five years. The growth metric lacks a defined base and is not treated as revenue growth. Demonstrations do not establish continuous-duty, thermal or lifetime performance.',
      evidence: [source(dh, 'Company introduction / scale indicators', ['200,000+', '120%']), source(dh, 'Undefined growth base and operating-condition boundary', ['Compound growth rate'], 'editorial-boundary')],
    },
  ],
  tesollo: [
    {
      zh: 'Tesollo Inc. 于 2019 年 1 月成立，总部位于韩国仁川，研发中心和工厂位于光明。公司研发多关节夹爪与灵巧手，面向工业自动化、人形机器人及 Physical AI 研究，产品从多指夹持末端延伸至仿人机器人手。',
      en: 'Tesollo Inc. was founded in January 2019, with headquarters in Incheon and R&D and manufacturing in Gwangmyeong, South Korea. It develops articulated grippers and dexterous hands for industrial automation, humanoid robotics and Physical AI research.',
      evidence: [source(tesollo, 'Company introduction; History / 2019; Company Information', ['2019.01', 'Incheon', 'Gwangmyeong'])],
    },
    {
      zh: '其技术体系覆盖多关节机构、紧凑执行器、驱动电子、嵌入式控制和机器人软件，并提供 SDK、ROS 2 与仿真集成支持。官网还描述模型驱动及学习型操作控制的研发方向；这些是公司层面的能力介绍，不能推定每款手都附带相同的软件、传感器或已验证策略。',
      en: 'Its technology spans articulated mechanisms, compact actuation, drive electronics, embedded control and robotics software, including SDK, ROS 2 and simulation support. Model-based and learning-based manipulation are stated development areas, not proof that every hand includes identical software, sensors or validated policies.',
      evidence: [source(tesolloTechnology, 'Electronics & Actuation; Robotics Software & Integration; Intelligent Manipulation & AI Control', ['ROS 2', 'Learning-Based Manipulation']), source(tesolloTechnology, 'Company-capability versus delivered-configuration boundary', ['depending on the product'], 'editorial-boundary')],
    },
    {
      zh: 'Delto Solution 将业务延伸至自动抓取、装配、双臂遥操作和操作数据采集。公司说明先用实际工件开展测试与 PoC，再与自身或客户指定的系统集成伙伴推进产线部署。公司史记录向 LG、Delta 和 Samsung 交付 DG-3F，但未说明采购量或收入占比。',
      en: 'Delto Solution covers picking, assembly, dual-arm teleoperation and manipulation-data collection, progressing from real-object tests and PoCs to deployment with system-integration partners. Tesollo records DG-3F deliveries to LG, Delta and Samsung in its history, without disclosing order quantities or revenue shares.',
      evidence: [source(tesolloSolutions, 'Delto Solution / feasibility, PoC and SI partner workflow', ['DS-PICK', 'DS-ASS', 'DS-Dual Arm']), source(tesollo, 'History / June 2022, May and July 2024 deliveries', ['LG Electronics', 'Delta Electronics', 'Samsung Electronics'])],
    },
    {
      zh: '产品导航将 DG-3F-B 明确标为停产，不能用历史型号推定当前供货。公司介绍与应用方案也不构成任意工件上的通用抓取保证；具体手型、感知选件、控制接口和连续运行条件仍应按交付配置核实。',
      en: 'The product navigation marks DG-3F-B as discontinued; historical models do not establish current availability. Company capabilities and solution descriptions are not universal grasping guarantees. Hand configuration, sensing options, control interfaces and continuous-operation conditions remain delivery-specific.',
      evidence: [source(tesollo, 'Product navigation / DG-3F-B Discontinued', ['DG-3F-B', 'Discontinued']), source(tesolloSolutions, 'Process-specific feasibility boundary', ['actual samples', 'technical feasibility'], 'editorial-boundary')],
    },
  ],
  'ati-industrial-automation': [
    {
      zh: 'ATI Industrial Automation 于 1989 年成立，总部位于美国北卡罗来纳州 Apex，2021 年被 Novanta 收购。其业务以机器人末端工具与自动化部件的研发、制造及应用支持为主，范围不只限于腕部力传感器。',
      en: 'ATI Industrial Automation was founded in 1989, is headquartered in Apex, North Carolina, and was acquired by Novanta in 2021. Its business centers on developing and manufacturing robot tooling and automation components with application support, extending beyond wrist force sensors.',
      evidence: [source(ati, 'About Us; Our Locations / Global Headquarters', ['since 1989', 'Apex', 'acquired by Novanta']), source(atiAcquisition, 'ATI business description', ['end-of-arm technology', 'manufactures'])],
    },
    {
      zh: '现行目录包含机器人快换装置及功能模块、多轴力/力矩传感器、去毛刺等材料去除工具、碰撞传感器、公用介质耦合器和柔顺装置。这些部件分别处理换工具、接触测量、加工与机械适应等问题，组合能力不能直接归为某一传感器或快换型号的规格。',
      en: 'Its catalog includes tool changers and modules, multi-axis force/torque sensors, material-removal tools, collision sensors, utility couplers and compliance devices. These address tool exchange, contact measurement, processing and mechanical accommodation; combined system capabilities should not be assigned to an individual sensor or changer.',
      evidence: [source(ati, 'Current product navigation', ['Utility Couplers', 'Compliance Devices', 'Material Removal Tools']), source(ati, 'Component-versus-system specification boundary', ['Tool Changer Modules'], 'editorial-boundary')],
    },
    {
      zh: 'Novanta 的 2021 年收购公告将 ATI 的客户定位为工业及手术机器人 OEM 和终端用户。其应用资料展示 Comau 柔性装配、Creaform 自动检测及 Cleveland Clinic 生物力学实验室的模拟测试系统，说明用途跨越生产自动化与研究测试；案例效果不等于所有部署的可复现收益。',
      en: 'Novanta\'s 2021 acquisition release identifies industrial and surgical robot OEMs and end-users as ATI customers. ATI application materials cover Comau flexible assembly, Creaform automated inspection and Cleveland Clinic laboratory biomechanics testing, spanning production and research. Case results are not guaranteed benefits for every deployment.',
      evidence: [source(atiAcquisition, 'Customer and application description / 2021', ['original equipment manufacturers', 'end-users']), source(atiApplications, 'Automated Inspection entry', ['Creaform']), source(atiComau, 'SmartCell tool-exchange description', ['SmartCell', 'Tool Changer']), source(atiSimulator, 'BioRobotics Laboratory and simVITRO description', ['Cleveland Clinic', 'simVITRO']), source(atiApplications, 'Case-result transfer boundary', ['Applications'], 'editorial-boundary')],
    },
    {
      zh: '2021 年公告中的 ATI 全年收入数字属于交易时的预期，不能作为当前实绩；收购对价也不是 ATI 融资轮。对于应用选型，多轴力测量、碰撞检测与柔顺机构各有不同作用，单个部件不能单独证明完整机器人系统的安全性或医疗适用性。',
      en: 'ATI revenue figures in the 2021 transaction release were expectations at that time, not current results; acquisition consideration is not an ATI funding round. Force measurement, collision detection and compliance have distinct roles. A component alone does not establish complete-system safety or medical suitability.',
      evidence: [source(atiAcquisition, 'Expected 2021 revenue; transaction terms; forward-looking information', ['expected 2021 revenue', 'forward-looking']), source(ati, 'System-level acceptance boundary', ['Collision Sensors', 'Compliance Devices'], 'editorial-boundary')],
    },
  ],
};

export const grippingOverviewOverride = (slug: string) => grippingOverviewRepairs[slug]?.map(({ zh, en }) => ({ zh, en }));

// ATI-only structured profile gap; the four reviewed overview paragraphs above remain unchanged.
export const grippingAtiProfileBlock20261018l = {
  businessAreas: [
    {
      zh: '末端工具接口：机器人快换装置、功能模块与公用介质耦合器，归为工具连接与切换业务；不将不同部件的能力合并为单一型号规格。',
      en: 'End-effector interfaces: robot tool changers, functional modules and utility couplers, grouped as tool connection and exchange. Capabilities of separate components are not combined into a single model specification.',
      evidence: [source(ati, 'Products navigation: Tool Changers; Tool Changer Modules; Utility Couplers', ['Tool Changers', 'Tool Changer Modules', 'Utility Couplers'])],
    },
    {
      zh: '接触测量与机械适应：多轴力/力矩传感器、碰撞传感器和柔顺装置。力反馈应用包括装配与产品测试；测量、碰撞检测和机械柔顺作用不同，不据此认定完整系统安全性。',
      en: 'Contact measurement and mechanical accommodation: multi-axis force/torque sensors, collision sensors and compliance devices. Force-feedback applications include assembly and product testing; sensing, collision detection and compliance have distinct roles and do not establish complete-system safety.',
      evidence: [source(ati, 'Products navigation: Force/Torque Sensors; Collision Sensors; Compliance Devices', ['Force/Torque Sensors', 'Collision Sensors', 'Compliance Devices']), source(atiSimulator, 'Final paragraph: industrial force/torque applications', ['product testing', 'robotic assembly'])],
    },
    {
      zh: '机器人材料去除工具：官方独立产品线，按加工工具业务归类；不能将材料去除工具与力传感器的组合应用，解释为每款工具均内置相同传感或控制功能。',
      en: 'Robotic material-removal tooling: a distinct official product line, grouped as processing tools. Applications combining tooling and force sensing do not imply identical built-in sensing or control in every tool.',
      evidence: [source(ati, 'Products navigation: Material Removal Tools', ['Material Removal Tools'])],
    },
  ] satisfies OverviewParagraph[],
  customerGroups: [
    {
      zh: '工业机器人 OEM 与终端用户：Novanta 2021-07-19 公告描述 ATI 面向工业及协作机器人应用的末端技术；这是公告时的客户定位，不是当前订单或客户集中度披露。',
      en: 'Industrial robot OEMs and end-users: the Novanta release dated 2021-07-19 describes ATI end-of-arm technology for industrial and collaborative applications. This is announcement-date customer positioning, not disclosure of current orders or customer concentration.',
      evidence: [source(atiAcquisition, 'July 19, 2021; paragraph beginning ATI is a leading supplier', ['original equipment manufacturers', 'industrial, collaborative', 'end-users'])],
    },
    {
      zh: '手术与医疗机器人 OEM：同一 2021-07-19 公告明确提到手术机器人 OEM 和医疗机器人应用；这不证明具体医院的采购关系，也不替代医疗器械或整机合规审查。',
      en: 'Surgical and medical robot OEMs: the same 2021-07-19 release explicitly identifies surgical robot OEMs and medical robotic applications. This does not establish purchasing relationships with particular hospitals or replace device or system compliance review.',
      evidence: [source(atiAcquisition, 'July 19, 2021; ATI customer and application description', ['advanced industrial and surgical robots', 'medical robotic applications'])],
    },
    {
      zh: '生物力学研究与实验室测试团队：ATI 2025-06-27 案例介绍 Cleveland Clinic BioRobotics Laboratory 在肌肉骨骼测试及 simVITRO 中使用其力/力矩传感器，并提到信号调理与工程支持。案例不构成当前采购量、独家供应或临床应用证明。',
      en: 'Biomechanics research and laboratory testing teams: ATI\'s 2025-06-27 case describes Cleveland Clinic BioRobotics Laboratory using its force/torque sensors in musculoskeletal testing and simVITRO, with signal conditioning and engineering support. The case does not establish current purchase volume, exclusivity or clinical use.',
      evidence: [source(atiSimulator, 'Published June 27, 2025; BioRobotics Laboratory; since-2003 paragraph; attributed engineering-support statement', ['June 27, 2025', 'Cleveland Clinic', 'simVITRO', 'signal conditioning hardware', 'engineering product support'])],
    },
  ] satisfies OverviewParagraph[],
  timeline: [{
    date: '2003', kind: 'business' as const, sourceUrl: atiSimulator,
    title: { zh: '生物力学实验室开始使用 ATI 力传感器', en: 'Biomechanics laboratory began using ATI force sensors' },
    detail: {
      zh: 'ATI 于 2025-06-27 发布的案例回顾称，Cleveland Clinic 的 BioRobotics Laboratory 自 2003 年起在其内部机器人肌肉骨骼测试系统中使用 ATI 力/力矩传感器。2003 年不是该文发布日期、simVITRO 商业发布日或已披露的合同签订日；该回顾不推定 2026 年采购仍在持续。',
      en: 'ATI\'s case published on 2025-06-27 retrospectively reports that Cleveland Clinic\'s BioRobotics Laboratory has used ATI force/torque sensors in its in-house robotic musculoskeletal testing systems since 2003. The year 2003 is not the article date, simVITRO commercial launch date or a disclosed contract date; the retrospective account does not establish continuing purchases in 2026.',
    },
  }],
};

export const grippingAtiProfileSources20261018l = [
  { sourceUrl: ati, sha256: '6a60de45a157297ebae201e749c3ed713593b5fd0250dc852c7ad9614526d03e', reviewedAt: '2026-10-18', publishedAt: null, retrievedAt: '2026-10-18T10:04:48.364Z', provenance: 'Original HTTP 200 body; Products navigation; no publication date established.' },
  { sourceUrl: atiAcquisition, sha256: 'afed2e3192fa2fc9d2ed99eb3e905a5ea96dc64f6406f5dd5de2444cadeb8603', reviewedAt: '2026-10-18', publishedAt: '2021-07-19', retrievedAt: null, originalRecordedTimestamp: '2026-09-13T17:02:08.036Z', provenance: 'Verified previous HTML cache; original recorded timestamp is cache mtime, not a verified retrieval timestamp. Current raw HTTP attempt returned 403 without bypass; official text also read through web tool on review date.' },
  { sourceUrl: atiSimulator, sha256: 'e405e87138eb867091631c4edd6ddf17c0b800cf16a39ae0c3538e72fd79ec70', reviewedAt: '2026-10-18', publishedAt: '2025-06-27', retrievedAt: '2026-10-18T10:04:50.381Z', provenance: 'Original HTTP 200 body; publication date, BioRobotics Laboratory use since 2003, and simVITRO context.' },
];
