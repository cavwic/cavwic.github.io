type Text = { zh: string; en: string };
type Metric = { label: Text; value: Text };
type Highlight = { title: Text; detail: Text };

export type GalbotProductContent = {
  id: string;
  summary: Text;
  overview: Text[];
  highlights: Highlight[];
  applications: Text[];
  parameters: Metric[];
  officialUrl: string;
  specificationKind?: "parameters" | "capabilities";
  integration: Text;
  verification: Text;
};

const text = (zh: string, en: string): Text => ({ zh, en });
const metric = (zh: string, en: string, value: string, valueEn = value): Metric => ({
  label: text(zh, en),
  value: text(value, valueEn),
});
const highlight = (zh: string, en: string, detailZh: string, detailEn: string): Highlight => ({
  title: text(zh, en),
  detail: text(detailZh, detailEn),
});

export const galbotProductContent: GalbotProductContent[] = [
  {
    id: "deep-galbot-g1",
    summary: text(
      "面向零售、制造、医疗和服务任务的轮式移动双臂机器人，公开规格覆盖本体、计算、感知、自由度、底盘、电池和扩展接口。",
      "A wheeled mobile dual-arm robot for retail, manufacturing, healthcare, and service tasks, with published body, compute, perception, DoF, base, battery, and expansion specifications.",
    ),
    overview: [
      text(
        "Galbot G1 采用升降本体、双 7 自由度机械臂和四轮全向底盘。腕部工作空间垂直覆盖 0–2,100 mm、水平覆盖 1,900 mm，单臂负载 5 kg、双臂合计 10 kg。",
        "Galbot G1 combines a lifting body, dual 7-DoF arms, and a four-wheel omnidirectional base. Its wrist-center workspace spans 0–2,100 mm vertically and 1,900 mm horizontally, with 5 kg per arm and 10 kg total payload.",
      ),
      text(
        "开发者手册列出 AGX Orin 64GB、双目与 RGB/深度相机、腕部六维力、激光雷达、超声和 IMU。8 小时工作时长来自厂商在实验室以 60% 平均速度进行的综合测试，不应直接等同于具体客户任务的连续运行时间。",
        "The developer manual lists AGX Orin 64GB, stereo and RGB/depth cameras, wrist six-axis force sensing, LiDAR, ultrasonic sensors, and IMUs. The eight-hour runtime is a vendor laboratory result at 60% average speed and should not be treated as task-specific continuous duty.",
      ),
    ],
    highlights: [
      highlight("高度覆盖", "Height coverage", "650 mm 腿部升降与长臂组合，使腕部中心可从地面附近覆盖到 2.1 m 高度。", "A 650 mm lift combined with long arms gives the wrist center coverage from near floor level to 2.1 m."),
      highlight("多源感知", "Multi-source perception", "头、躯干、腕部与底盘分布视觉、力觉、激光雷达、超声和惯性传感器，适合做操作与移动的联合感知。", "Vision, force, LiDAR, ultrasonic, and inertial sensors are distributed across the head, torso, wrists, and base for joint manipulation and mobility perception."),
      highlight("开放边界", "Development boundary", "官方手册明确二次开发需联系商务；接口可见不等于所有底层控制权限默认开放。", "The manual states that secondary development requires commercial contact; visible hardware interfaces do not imply that every low-level control path is enabled by default."),
    ],
    applications: [
      text("零售拣选、补货和店内配送", "Retail picking, replenishment, and in-store delivery"),
      text("制造业分拣、上下料和物料流转", "Manufacturing sorting, machine tending, and material transfer"),
      text("医疗物资配送与研究型移动操作", "Medical-supply delivery and research mobile manipulation"),
    ],
    parameters: [
      metric("整机最高高度", "Maximum overall height", "1,730 mm"),
      metric("手臂长度", "Arm length", "710 mm（肩部中心到腕部中心）", "710 mm (shoulder center to wrist center)"),
      metric("腿部升降高度差", "Leg lift travel", "650 mm"),
      metric("腕部工作空间", "Wrist-center workspace", "垂直 0–2,100 mm；水平 1,900 mm", "Vertical 0–2,100 mm; horizontal 1,900 mm"),
      metric("腕部负载", "Wrist-center payload", "单臂 5 kg；双臂合计 10 kg", "5 kg per arm; 10 kg total"),
      metric("机身重量", "Body mass", "92.5 kg"),
      metric("工作环境", "Operating environment", "0–40 °C；湿度 90% RH，无凝露", "0–40 °C; 90% RH, non-condensing"),
      metric("计算平台", "Compute platform", "NVIDIA AGX Orin 64GB；275 TOPS"),
      metric("网络", "Network", "Wi-Fi 2.4/5 GHz；Bluetooth 5.2"),
      metric("屏幕", "Display", "5.5 英寸触摸屏；1,920×1,080", "5.5-inch touchscreen; 1,920×1,080"),
      metric("麦克风", "Microphones", "线性四麦克风阵列 ×2", "Linear four-microphone arrays ×2"),
      metric("扬声器", "Speakers", "5 W ×2"),
      metric("头部感知", "Head perception", "双目相机 ×1", "Stereo camera ×1"),
      metric("躯干感知", "Torso perception", "RGB 相机 ×4；IMU ×2", "RGB cameras ×4; IMUs ×2"),
      metric("腕部感知", "Wrist perception", "深度相机 ×2；六维力传感器 ×2", "Depth cameras ×2; six-axis force sensors ×2"),
      metric("底盘感知", "Base perception", "3D 激光雷达 ×1；超声 ×8；IMU ×1", "3D LiDAR ×1; ultrasonic sensors ×8; IMU ×1"),
      metric("本体自由度", "Body degrees of freedom", "颈部 2；双臂 7×2；腰部 3；腿部 2（不含底盘和末端）", "Neck 2; dual arms 7×2; waist 3; legs 2 (excluding base and end effectors)"),
      metric("底盘形式", "Base type", "四轮全向移动底盘", "Four-wheel omnidirectional base"),
      metric("底盘尺寸", "Base dimensions", "600×600 mm；投影圆直径 625 mm", "600×600 mm; 625 mm projected-circle diameter"),
      metric("底盘最高速度", "Maximum base speed", "1.5 m/s"),
      metric("工作时长", "Operating time", "8 h（实验室、60% 平均速度）", "8 h (laboratory, 60% average speed)"),
      metric("适配器充电时长", "Adapter charging time", "3.5 h"),
      metric("充电规格", "Charging specification", "54.6 V / 10 A"),
      metric("电池", "Battery", "48 V / 30 Ah"),
      metric("标配附件", "Standard accessory", "有线充电器", "Wired charger"),
      metric("选配附件", "Optional accessories", "无线充电桩 / 备用电池 / 遥控器", "Wireless charging dock / spare battery / remote controller"),
      metric("本体按键", "On-body controls", "开机 / 急停 / 示教", "Power / emergency stop / teach"),
      metric("扩展接口", "Expansion interfaces", "USB 3.0 ×2；HDMI"),
    ],
    officialUrl: "https://developer.galbot.com/docs/g1/2.2.4/zh/g1/",
    integration: text(
      "项目集成应先锁定末端执行器、二次开发许可和安全控制层，再标定底盘、升降、双臂、相机、力传感器及世界坐标系。连续任务需记录速度、负载、抓取姿态、充电策略和人工接管。",
      "Integration should first lock the end effector, secondary-development entitlement, and safety layer, then calibrate the base, lift, arms, cameras, force sensors, and world frames. Continuous-task validation should log speed, payload, grasp pose, charging strategy, and human takeover.",
    ),
    verification: text(
      "28 项参数逐项来自 Galbot G1 V2.0 快速使用手册。工作时长为厂商实验室综合数据；交付版本、SDK 权限、末端配置、任务成功率和安全认证需按项目合同另行确认。",
      "All 28 fields are transcribed from the Galbot G1 V2.0 quick-start manual. Runtime is a vendor laboratory result; delivery revision, SDK access, end-effector configuration, task success rate, and safety certification require project-specific confirmation.",
    ),
  },
  {
    id: "deep-galbot-s1",
    summary: text(
      "面向工业搬运、上下料和仓储拣选的重载轮式双臂机器人，当前官网给出双臂最高 50 kg、双电池热插拔和 8 小时运行口径。",
      "A heavy-duty wheeled dual-arm robot for industrial handling, machine tending, and warehouse picking, with a current published dual-arm maximum payload of 50 kg, hot-swappable dual batteries, and eight-hour runtime.",
    ),
    overview: [
      text(
        "Galbot S1 使用四轮转向全向底盘、双 7 自由度机械臂和 750 mm 升降轴，腕部工作空间水平覆盖 0–2,400 mm、垂直覆盖 2,390 mm。",
        "Galbot S1 uses a four-steer-wheel omnidirectional base, dual 7-DoF arms, and a 750 mm lift, with wrist-center coverage of 0–2,400 mm horizontally and 2,390 mm vertically.",
      ),
      text(
        "当前官网产品页把负载表述为双臂最高 50 kg；较早的快速手册曾给出单臂 15 kg、双臂 30 kg。两者可能对应版本或测试口径变化，本记录采用当前产品页，同时保留差异供采购核对。",
        "The current product page states a maximum dual-arm payload of 50 kg, while an earlier quick-start manual stated 15 kg per arm and 30 kg total. This record follows the current page and preserves the discrepancy for procurement review.",
      ),
    ],
    highlights: [
      highlight("重载与大工作空间", "Heavy payload and broad workspace", "双臂最高负载和 2.4 m 水平工作空间面向箱件搬运、码垛及高低位上下料，但负载随姿态变化。", "The maximum dual-arm payload and 2.4 m horizontal workspace target case handling, palletizing, and multi-height machine tending, while payload remains pose-dependent."),
      highlight("双电池热插拔", "Hot-swappable dual batteries", "两块 48 V / 30 Ah 电池支持热插拔，可用于设计换电轮转流程；实际无停机能力仍取决于更换顺序和系统策略。", "Two 48 V / 30 Ah batteries support hot swapping for battery-rotation workflows; actual no-shutdown operation still depends on replacement sequence and system policy."),
      highlight("工业感知布局", "Industrial sensing layout", "头部与底盘配置 3D 激光雷达，胸部配置深度相机和六维力传感器，适合移动、定位和接触作业联合开发。", "3D LiDAR on the head and base plus chest depth cameras and six-axis force sensors support combined mobility, localization, and contact-task development."),
    ],
    applications: [
      text("工业物料搬运和机床上下料", "Industrial material handling and machine tending"),
      text("仓储拣选、码垛和拆垛", "Warehouse picking, palletizing, and depalletizing"),
      text("需要大工作空间的移动双臂任务", "Mobile dual-arm tasks requiring a broad workspace"),
    ],
    parameters: [
      metric("整机最高高度", "Maximum overall height", "1,793 mm"),
      metric("手臂长度", "Arm length", "920 mm（肩部到腕部）", "920 mm (shoulder to wrist)"),
      metric("升降行程", "Lift travel", "750 mm"),
      metric("整机重量", "Overall mass", "320 kg"),
      metric("公开负载", "Published payload", "双臂最高 50 kg（当前官网口径）", "Dual-arm maximum 50 kg (current official figure)"),
      metric("腕部工作空间", "Wrist-center workspace", "水平 0–2,400 mm；垂直 2,390 mm", "Horizontal 0–2,400 mm; vertical 2,390 mm"),
      metric("自由度", "Degrees of freedom", "颈部 2；双臂 7×2；升降 1"),
      metric("工作环境", "Operating environment", "0–40 °C；0–90% RH，无冷凝", "0–40 °C; 0–90% RH, non-condensing"),
      metric("底盘形式", "Base type", "四轮转向全向底盘", "Four-steer-wheel omnidirectional base"),
      metric("底盘尺寸", "Base dimensions", "730×730 mm"),
      metric("最高速度", "Maximum speed", "1.5 m/s"),
      metric("计算平台", "Compute platform", "NVIDIA AGX Orin 64GB；275 TOPS"),
      metric("屏幕", "Display", "7 英寸触摸屏", "7-inch touchscreen"),
      metric("扬声器", "Speakers", "5 W ×2"),
      metric("网络", "Network", "Wi-Fi 2.4/5 GHz；Bluetooth 5.2"),
      metric("头部传感器", "Head sensors", "双目相机 ×1；3D 激光雷达 ×1", "Stereo camera ×1; 3D LiDAR ×1"),
      metric("胸部传感器", "Chest sensors", "深度相机 ×2；六维力传感器 ×2", "Depth cameras ×2; six-axis force sensors ×2"),
      metric("底盘传感器", "Base sensors", "3D 激光雷达 ×2", "3D LiDAR ×2"),
      metric("满电运行时长", "Full-charge runtime", "8 h"),
      metric("充电时长", "Charging time", "2.0 h / 单电池适配器", "2.0 h per battery adapter"),
      metric("电池", "Battery", "48 V / 30 Ah ×2"),
      metric("电池热插拔", "Battery hot swap", "支持", "Supported"),
      metric("标配附件", "Standard accessories", "无线遥控 / 有线充电器 / 无线急停", "Wireless remote / wired charger / wireless emergency stop"),
      metric("本体按键", "On-body controls", "开机 / 急停", "Power / emergency stop"),
      metric("扩展接口", "Expansion interfaces", "USB 3.0 ×2；千兆以太网", "USB 3.0 ×2; Gigabit Ethernet"),
    ],
    officialUrl: "https://www.galbot.com/s1/",
    integration: text(
      "优先取得报价版本的负载曲线、末端接口和安全包，并围绕地面承载、通道宽度、转弯空间、换电区域和无线急停布置完成现场设计。重载测试必须覆盖最不利臂展与加减速工况。",
      "Obtain the quoted revision's payload curves, tool interface, and safety package first, then design around floor loading, aisle width, turning space, battery-swap area, and wireless emergency-stop coverage. Heavy-load tests must cover worst-case reach and acceleration.",
    ),
    verification: text(
      "25 项参数按当前 S1 官网产品页及官方快速手册整理。当前网页的双臂最高 50 kg 与较早手册的单臂 15 kg、合计 30 kg 不一致，采购时必须由厂商按具体版本书面确认。",
      "The 25 fields follow the current S1 product page and official quick-start material. The current 50 kg dual-arm maximum differs from an earlier 15 kg-per-arm, 30 kg-total manual figure and must be confirmed in writing for the quoted revision.",
    ),
  },
  {
    id: "deep-galbot-et1",
    summary: text(
      "面向互动演艺和人机交互的 1.25 m 双足人形机器人，标准版为 26 自由度，专业版和旗舰版可增加 12 自由度灵巧手。",
      "A 1.25 m biped humanoid for interaction and performance, with 26 DoF in the standard edition and 12 additional dexterous-hand DoF in Pro and Flagship editions.",
    ),
    overview: [
      text(
        "Galbot ET1（银河星仔）公开定位为物理世界原生交互智能体。官网列出标准、专业和旗舰层级，并把差异集中在灵巧手与高性能算力配置。",
        "Galbot ET1 is positioned as a native interactive agent for the physical world. The official page lists Standard, Pro, and Flagship tiers, with key differences in dexterous hands and high-performance compute.",
      ),
      text(
        "官网同时描述亿级参数 Transformer 动作基模、动态推理与行为规划、互动学习等能力。这些属于厂商能力说明，不等同于可量化的任务成功率、交互延迟或连续运行指标。",
        "The page also describes a 100M-scale Transformer motion model, dynamic reasoning and planning, and learning through interaction. These are vendor capability statements rather than quantified task-success, latency, or continuous-duty results.",
      ),
    ],
    highlights: [
      highlight("版本分层", "Edition structure", "标准版保持 26 自由度，专业版和旗舰版通过灵巧手增加 12 自由度，并配置不同等级的 Orin 算力。", "The standard edition has 26 DoF, while Pro and Flagship add 12 dexterous-hand DoF and different Orin compute tiers."),
      highlight("互动与演艺", "Interaction and performance", "公开场景包括游乐场互动、门店迎宾、舞台舞蹈和现场喜剧，重点在语言、动作与现场反馈的组合。", "Published scenarios include theme-park interaction, storefront greeting, stage dance, and live comedy, combining language, motion, and audience feedback."),
      highlight("仍处发布阶段", "Launch-stage boundary", "官网标注“敬请期待”，项目应用需要继续确认交付时间、软件接口、续航、安全和运维条件。", "The official page says “Coming Soon”; projects must confirm delivery timing, software interfaces, endurance, safety, and service requirements."),
    ],
    applications: [
      text("展馆、乐园和门店互动", "Exhibition, theme-park, and storefront interaction"),
      text("舞台演艺与角色化内容", "Stage performance and character-based content"),
      text("多模态人机交互研究", "Multimodal human-robot interaction research"),
    ],
    parameters: [
      metric("站立高度", "Standing height", "1,250 mm"),
      metric("带电池重量", "Mass with battery", "32 kg"),
      metric("总自由度", "Total degrees of freedom", "标准版 26；专业版 / 旗舰版 26+12（灵巧手）", "Standard 26; Pro / Flagship 26+12 with dexterous hands"),
      metric("视觉感知", "Visual perception", "双目摄像头", "Stereo camera"),
      metric("主控芯片", "Main processors", "RK3588 + RDK X5"),
      metric("高性能算力", "High-performance compute", "专业版 Orin Nano 40 TOPS；旗舰版 Orin NX 100 TOPS", "Pro Orin Nano 40 TOPS; Flagship Orin NX 100 TOPS"),
    ],
    officialUrl: "https://www.galbot.com/et1/",
    integration: text(
      "互动项目应先取得可交付版本和内容开发接口，再验证唤醒、识别、对话、动作生成、多人环境稳定性、急停与人群安全。专业版和旗舰版的手部与算力不能套用到标准版。",
      "Interaction projects should first obtain the deliverable edition and content-development interfaces, then validate wake-up, recognition, dialogue, motion generation, crowd robustness, emergency stop, and public-space safety. Pro and Flagship hand and compute configurations must not be attributed to Standard.",
    ),
    verification: text(
      "6 项规格逐项来自 ET1 官方产品页。动作模型、规划和互动学习按公开能力描述记录；官网未披露续航、关节扭矩、移动速度、接口、噪声或正式交付日期。",
      "All six specifications follow the official ET1 product page. Motion-model, planning, and interactive-learning claims are recorded as published capabilities; endurance, joint torque, speed, interfaces, noise, and a firm delivery date are not disclosed.",
    ),
  },
  {
    id: "deep-galbot-tm01",
    summary: text(
      "用于 Galbot G1 全身关节遥操作、示教数据采集和远程接管的双臂主从设备，官方手册给出 13 项技术参数。",
      "A dual-arm master device for Galbot G1 whole-body teleoperation, demonstration capture, and remote takeover, with 13 technical fields in the official manual.",
    ),
    overview: [
      text(
        "TM01 采用双侧 7 自由度主臂，以比例映射驱动 G1 双臂，并通过控制器摇杆联动底盘、升降、头部和腰部。设备使用 USB 有线连接，采样频率至少 100 Hz，厂商标称映射延迟不高于 20 ms。",
        "TM01 uses dual 7-DoF master arms to proportionally map G1's arms, while controller sticks coordinate the base, lift, head, and waist. It uses wired USB, samples at at least 100 Hz, and has a vendor-stated mapping latency no greater than 20 ms.",
      ),
      text(
        "该设备为 G1 专用遥操作附件，不是通用机械臂。IP20 表明其不防水，且手册明确要求遥操作时保持动作平稳并正确使用急停和示教按键。",
        "This is a G1-specific teleoperation accessory rather than a general robot arm. IP20 means it is not water resistant, and the manual requires controlled motion plus proper use of emergency-stop and teach controls.",
      ),
    ],
    highlights: [
      highlight("比例主从映射", "Proportional master-slave mapping", "双臂 7 DoF ×2 对应 G1 双臂，适合采集人体操作轨迹，但标定、关节限位和坐标映射仍需按软件版本确认。", "Dual 7-DoF arms map to G1's arms for human-motion capture, while calibration, joint limits, and frame mapping remain software-version dependent."),
      highlight("整机联动控制", "Whole-robot coordination", "摇杆组合键可控制底盘平移旋转、躯干升降、头部和腰部，使操作员在同一设备上完成移动操作示教。", "Joystick combinations control base translation and rotation, torso lift, head, and waist for mobile-manipulation demonstrations from one device."),
      highlight("数据质量边界", "Data-quality boundary", "100 Hz 与 ≤20 ms 是设备级公开口径；端到端数据还受机器人控制周期、网络、时间同步、操作者动作和保存链路影响。", "The 100 Hz and ≤20 ms figures are device-level specifications; end-to-end data also depends on robot control cycles, networking, synchronization, operator motion, and storage."),
    ],
    applications: [
      text("G1 双臂和全身遥操作", "G1 dual-arm and whole-body teleoperation"),
      text("具身任务示教数据采集", "Embodied-task demonstration capture"),
      text("远程接管和异常处置", "Remote takeover and exception handling"),
    ],
    parameters: [
      metric("产品名称", "Product name", "G1 遥操主从臂", "G1 Teleoperation Master-Slave Arm"),
      metric("产品型号", "Model", "TM01"),
      metric("自由度", "Degrees of freedom", "双臂 7 DoF ×2", "Dual arms 7 DoF ×2"),
      metric("产品尺寸", "Dimensions", "530×330×70 mm（不含三脚架）", "530×330×70 mm (excluding tripod)"),
      metric("产品净重", "Net mass", "约 2 kg（不含三脚架）", "About 2 kg (excluding tripod)"),
      metric("额定电压", "Rated voltage", "12 V"),
      metric("额定功率", "Rated power", "30 W"),
      metric("采样频率", "Sampling frequency", "≥100 Hz"),
      metric("映射延迟", "Mapping latency", "≤20 ms"),
      metric("连接通信", "Connection", "USB 有线连接", "Wired USB"),
      metric("防护等级", "Ingress protection", "IP20（不防水）", "IP20 (not water resistant)"),
      metric("工作温度", "Operating temperature", "0–40 °C"),
      metric("工作湿度", "Operating humidity", "≤85% RH，无凝结", "≤85% RH, non-condensing"),
    ],
    officialUrl: "https://developer.galbot.com/docs/tm01/1.4.0/zh/tm01/",
    integration: text(
      "使用前应核对 TM01、G1 固件和 SDK 版本，完成双臂零位、比例映射、关节限位及急停测试。数据集还需记录操作者、任务结果、失败标记、机器人状态和统一时间戳。",
      "Before use, align TM01, G1 firmware, and SDK revisions, then validate arm zeros, proportional mapping, joint limits, and emergency stop. Datasets should also record operator, task outcome, failure labels, robot state, and synchronized timestamps.",
    ),
    verification: text(
      "13 项参数与官方 TM01 V1.4.0 手册技术参数表逐项一致。该表不披露关节量程、编码器分辨率、寿命或通用机器人兼容性，本页不作推断。",
      "All 13 fields match the official TM01 V1.4.0 technical table. The table does not disclose joint range, encoder resolution, service life, or compatibility with non-Galbot robots, so none are inferred.",
    ),
  },
];

const expectedParameterCounts: Record<string, number> = {
  "deep-galbot-g1": 28,
  "deep-galbot-s1": 25,
  "deep-galbot-et1": 6,
  "deep-galbot-tm01": 13,
};

for (const product of galbotProductContent) {
  const expected = expectedParameterCounts[product.id];
  if (expected === undefined || product.parameters.length !== expected) {
    throw new Error(`Galbot parameter audit failed for ${product.id}: ${product.parameters.length}/${expected ?? "missing"}`);
  }
}

if (galbotProductContent.length !== Object.keys(expectedParameterCounts).length) {
  throw new Error(`Galbot product audit failed: ${galbotProductContent.length}/${Object.keys(expectedParameterCounts).length}`);
}
