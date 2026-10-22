type Text = { zh: string; en: string };
type Metric = { label: Text; value: Text };
type Highlight = { title: Text; detail: Text };

export type LinkerBotProductContent = {
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

type HandSeed = {
  id: string;
  name: string;
  positioningZh: string;
  positioningEn: string;
  architectureZh: string;
  architectureEn: string;
  parameters: Metric[];
  officialUrl: string;
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

const hand = (seed: HandSeed): LinkerBotProductContent => ({
  id: seed.id,
  summary: text(seed.positioningZh, seed.positioningEn),
  overview: [
    text(
      `${seed.name} 采用${seed.architectureZh}。本页按官网“产品数据”逐项保留自由度、传动、控制、电气、负载、力、运动范围与速度，不把不同型号的参数相互套用。`,
      `${seed.name} uses ${seed.architectureEn}. This record preserves each DoF, transmission, control, electrical, payload, force, range, and speed field from the official product-data table without transferring values between models.`,
    ),
    text(
      "官网给出的最大负载、指尖力、抓握力和重复定位精度是厂商公开口径。实际选型还需要结合安装姿态、对象几何、接触材料、占空比、温升、触觉选件和安全系数复测。",
      "Maximum payload, fingertip force, grip force, and repeatability are vendor-published figures. Selection still requires testing against mounting pose, object geometry, contact material, duty cycle, thermal behavior, tactile options, and safety factor.",
    ),
  ],
  highlights: [
    highlight("运动架构", "Motion architecture", seed.architectureZh, seed.architectureEn),
    highlight("型号级参数", "Model-level specification", `当前列出 ${seed.parameters.length} 项官网公开字段，所有数值均限定于 ${seed.name}。`, `${seed.parameters.length} official fields are listed and scoped specifically to ${seed.name}.`),
    highlight("集成判断", "Integration judgment", "自由度高不必然意味着任务效果更好；负载、重量、速度、接口、触觉和控制权限需要按目标任务共同权衡。", "Higher DoF does not automatically yield better task performance; payload, mass, speed, interfaces, tactile sensing, and control access must be evaluated together."),
  ],
  applications: [
    text("人形机器人和机械臂末端集成", "Humanoid and robot-arm end-effector integration"),
    text("精密装配、物流抓取和工具操作", "Precision assembly, logistics grasping, and tool use"),
    text("遥操作、具身数据采集和灵巧策略研究", "Teleoperation, embodied-data capture, and dexterous-policy research"),
  ],
  parameters: seed.parameters,
  officialUrl: seed.officialUrl,
  integration: text(
    "确定左右手、法兰、供电和通信版本后，依次完成机械安装、零位与限位、速度/力限制、故障与急停、末端负载、连续温升和目标物抓取测试。触觉、上位机、SDK 与协议许可应在报价单中单独锁定。",
    "After fixing hand side, flange, power, and communication revision, validate mechanical mounting, zeros and limits, speed/force limits, faults and emergency stop, payload, continuous-duty heat, and target-object grasps. Tactile options, host software, SDKs, and protocol rights should be fixed in the quotation.",
  ),
  verification: text(
    `参数来自 ${seed.name} 官方产品页。官网提示参数会随场景、配置和版本变化，因此本页用于前期筛选，最终以具体料号、正式规格书和样机验收为准。`,
    `Specifications come from the official ${seed.name} product page. The manufacturer notes that values vary by scenario, configuration, and revision, so this record supports screening and must be closed with a part number, formal datasheet, and sample acceptance.`,
  ),
});

const hands: LinkerBotProductContent[] = [
  hand({
    id: "deep-linker-hand-1",
    name: "Linker Hand O6",
    positioningZh: "面向轻量化与高负载集成的六主动自由度连杆灵巧手，整手 360 g，官网最大负载口径为 50 kg。",
    positioningEn: "A six-active-DoF linkage hand for lightweight, high-payload integration, weighing 360 g with a vendor-published maximum payload of 50 kg.",
    architectureZh: "6 个主动自由度、5 个被动自由度与连杆传动",
    architectureEn: "six active and five passive DoF with linkage transmission",
    officialUrl: "https://www.linkerbot.cn/details/LinkerHandO6/",
    parameters: [
      metric("型号", "Model", "Linker Hand O6"),
      metric("自由度", "Degrees of freedom", "6 主动 + 5 被动", "6 active + 5 passive"),
      metric("传动方式", "Transmission", "连杆传动", "Linkage transmission"),
      metric("控制接口", "Control interfaces", "CAN / CAN FD / RS485 / ECAT"),
      metric("重量", "Mass", "360 g"),
      metric("最大负载", "Maximum payload", "50 kg"),
      metric("工作电压", "Operating voltage", "24–48 V"),
      metric("重复定位精度", "Repeatability", "<±0.20 mm"),
      metric("触觉传感器", "Tactile sensor", "选配", "Optional"),
      metric("拇指最大指尖力", "Maximum thumb fingertip force", "20 N"),
      metric("四指最大指尖力", "Maximum four-finger fingertip force", "25 N"),
      metric("五指最大抓握力", "Maximum five-finger grip force", "70 N"),
      metric("四指弯曲角度", "Four-finger bend angle", "1.61 rad（92.59°）", "1.61 rad (92.59°)"),
      metric("拇指侧摆速度", "Thumb abduction speed", "1.36 rad/s（78.10°/s）", "1.36 rad/s (78.10°/s)"),
      metric("四指弯曲速度", "Four-finger bend speed", "1.30 rad/s（74.75°/s）", "1.30 rad/s (74.75°/s)"),
      metric("拇指弯曲速度", "Thumb bend speed", "0.66 rad/s（38°/s）", "0.66 rad/s (38°/s)"),
    ],
  }),
  hand({
    id: "deep-linker-hand-2",
    name: "Linker Hand L6",
    positioningZh: "面向工业抓取与装配的六主动自由度连杆灵巧手，官网公开 607 g、28 kg 最大负载和 CAN/RS485 接口。",
    positioningEn: "A six-active-DoF linkage hand for industrial grasping and assembly, with published 607 g mass, 28 kg maximum payload, and CAN/RS485 interfaces.",
    architectureZh: "6 个主动自由度、5 个被动自由度与无刷电机/滚珠丝杠连杆驱动",
    architectureEn: "six active and five passive DoF with brushless-motor, ball-screw, and linkage actuation",
    officialUrl: "https://www.linkerbot.cn/details/LinkerHandL6/",
    parameters: [
      metric("型号", "Model", "Linker Hand L6"), metric("自由度", "Degrees of freedom", "6 主动 + 5 被动", "6 active + 5 passive"),
      metric("传动方式", "Transmission", "连杆传动", "Linkage transmission"), metric("控制接口", "Control interfaces", "CAN / RS485"),
      metric("重量", "Mass", "607 g"), metric("最大负载", "Maximum payload", "28 kg"), metric("工作电压", "Operating voltage", "24 VDC ±10%"),
      metric("静态电流", "Static current", "0.2 A"), metric("空载运动平均电流", "Average no-load current", "0.6 A"), metric("最大电流", "Maximum current", "5.6 A"),
      metric("重复定位精度", "Repeatability", "<±0.2 mm"), metric("拇指最大指尖力", "Maximum thumb fingertip force", "12 N"),
      metric("四指最大指尖力", "Maximum four-finger fingertip force", "15 N"), metric("五指最大抓握力", "Maximum five-finger grip force", "50 N"),
      metric("四指弯曲角度", "Four-finger bend angle", "1.18 rad（68°）", "1.18 rad (68°)"),
      metric("拇指侧摆速度", "Thumb abduction speed", "3.51 rad/s（202°/s）", "3.51 rad/s (202°/s)"),
      metric("四指弯曲速度", "Four-finger bend speed", "3.5 rad/s（201°/s）", "3.5 rad/s (201°/s)"),
      metric("拇指弯曲速度", "Thumb bend speed", "2.28 rad/s（131°/s）", "2.28 rad/s (131°/s)"),
    ],
  }),
  hand({
    id: "deep-linker-hand-3",
    name: "Linker Hand L20 Lite",
    positioningZh: "以 10 主动加 10 被动自由度平衡灵活度、负载和集成成本的高自由度连杆灵巧手。",
    positioningEn: "A high-DoF linkage hand balancing dexterity, payload, and integration cost with 10 active and 10 passive DoF.",
    architectureZh: "10 个主动自由度、10 个被动自由度与蜗轮蜗杆/连杆混合路线",
    architectureEn: "10 active and 10 passive DoF with a worm-gear and linkage hybrid architecture",
    officialUrl: "https://www.linkerbot.cn/details/LinkerHandL20Lite/",
    parameters: [
      metric("型号", "Model", "Linker Hand L20 Lite"), metric("自由度", "Degrees of freedom", "10 主动 + 10 被动", "10 active + 10 passive"),
      metric("传动方式", "Transmission", "连杆传动（特性说明为蜗轮蜗杆 + 连杆混合）", "Linkage transmission (feature copy describes a worm-gear + linkage hybrid)"),
      metric("控制接口", "Control interfaces", "CAN / RS485"), metric("重量", "Mass", "800 g"), metric("最大负载", "Maximum payload", "25 kg"),
      metric("工作电压", "Operating voltage", "24 VDC ±10%"), metric("静态电流", "Static current", "0.2 A"), metric("空载运动平均电流", "Average no-load current", "0.5 A"),
      metric("最大电流", "Maximum current", "3 A"), metric("重复定位精度", "Repeatability", "<±0.2 mm"), metric("开合时间", "Open/close time", "1.2 s"),
      metric("拇指最大指尖力", "Maximum thumb fingertip force", "15 N"), metric("四指最大指尖力", "Maximum four-finger fingertip force", "15 N"),
      metric("五指最大抓握力", "Maximum five-finger grip force", "80 N"), metric("拇指横向旋转范围", "Thumb rotation range", "0.75 rad（43°）", "0.75 rad (43°)"),
      metric("四指弯曲角度", "Four-finger bend angle", "1.36 rad（78°）", "1.36 rad (78°)"), metric("拇指侧摆速度", "Thumb abduction speed", "1.1 rad/s（63.21°/s）", "1.1 rad/s (63.21°/s)"),
      metric("四指弯曲速度", "Four-finger bend speed", "1.11 rad/s（63.33°/s）", "1.11 rad/s (63.33°/s)"), metric("拇指弯曲速度", "Thumb bend speed", "0.78 rad/s（44.7°/s）", "0.78 rad/s (44.7°/s)"),
    ],
  }),
  hand({
    id: "deep-linker-hand-o20",
    name: "Linker Hand O20",
    positioningZh: "16 个关节均可独立控制的全主动直驱灵巧手，官网 AI 可读产品区公开 888 g、36 kg 最大负载和 0.88 s 开合时间。",
    positioningEn: "A fully actuated direct-drive hand with 16 independently controlled joints, published at 888 g, 36 kg maximum payload, and 0.88 s open/close time.",
    architectureZh: "16 个全主动自由度与直驱架构",
    architectureEn: "16 fully actuated DoF with direct drive",
    officialUrl: "https://www.linkerbot.cn/",
    parameters: [
      metric("型号", "Model", "Linker Hand O20"), metric("自由度", "Degrees of freedom", "16 全主动", "16 fully actuated"), metric("传动方式", "Transmission", "直驱", "Direct drive"),
      metric("控制接口", "Control interface", "CAN FD"), metric("重量", "Mass", "888 g"), metric("最大负载", "Maximum payload", "36 kg"), metric("工作电压", "Operating voltage", "24 VDC ±10%"),
      metric("静态电流", "Static current", "0.27 A"), metric("空载运动平均电流", "Average no-load current", "0.8 A"), metric("最大电流", "Maximum current", "2 A"),
      metric("重复定位精度", "Repeatability", "±0.20 mm"), metric("开合时间", "Open/close time", "0.88 s"), metric("拇指最大指尖力", "Maximum thumb fingertip force", "6.5 N"),
      metric("四指最大指尖力", "Maximum four-finger fingertip force", "10 N"), metric("五指最大抓握力", "Maximum five-finger grip force", "44 N"),
      metric("拇指横向旋转范围", "Thumb rotation range", "1.14 rad（65.24°）", "1.14 rad (65.24°)"), metric("四指弯曲角度", "Four-finger bend angle", "1.61 rad（92.33°）", "1.61 rad (92.33°)"),
      metric("拇指侧摆速度", "Thumb abduction speed", "1.55 rad/s（89.07°/s）", "1.55 rad/s (89.07°/s)"), metric("四指弯曲速度", "Four-finger bend speed", "2.18 rad/s（124.69°/s）", "2.18 rad/s (124.69°/s)"),
      metric("拇指弯曲速度", "Thumb bend speed", "2.01 rad/s（115.24°/s）", "2.01 rad/s (115.24°/s)"),
    ],
  }),
  hand({
    id: "deep-linker-hand-4",
    name: "Linker Hand L20",
    positioningZh: "采用 16 主动加 5 被动自由度、自研关节模块和连杆传动的进阶型灵巧手，官网最大抓握力为 100 N。",
    positioningEn: "An advanced linkage hand with 16 active and five passive DoF plus in-house joint modules, with a published maximum grip force of 100 N.",
    architectureZh: "16 个主动自由度、5 个被动自由度与自研关节模块连杆传动",
    architectureEn: "16 active and five passive DoF with in-house joint modules and linkage transmission",
    officialUrl: "https://www.linkerbot.cn/details/LinkerHandL20/",
    parameters: [
      metric("型号", "Model", "Linker Hand L20"), metric("自由度", "Degrees of freedom", "16 主动 + 5 被动", "16 active + 5 passive"), metric("传动方式", "Transmission", "连杆传动", "Linkage transmission"),
      metric("驱动方式", "Actuation", "自研关节模块", "In-house joint modules"), metric("控制接口", "Control interfaces", "CAN / RS485"), metric("重量", "Mass", "约 1,200 g", "About 1,200 g"),
      metric("最大负载", "Maximum payload", "20 kg"), metric("工作电压", "Operating voltage", "24–48 VDC"), metric("静态电流", "Static current", "0.3 A"), metric("空载运动平均电流", "Average no-load current", "0.4 A"),
      metric("最大电流", "Maximum current", "1.8 A"), metric("重复定位精度", "Repeatability", "±0.20 mm"), metric("拇指最大指尖力", "Maximum thumb fingertip force", "15 N"),
      metric("四指最大指尖力", "Maximum four-finger fingertip force", "20 N"), metric("五指最大抓握力", "Maximum five-finger grip force", "100 N"),
      metric("拇指旋转范围", "Thumb rotation range", "1.32 rad（75.78°）", "1.32 rad (75.78°)"), metric("四指弯曲角度", "Four-finger bend angle", "1.22 rad（69.9°）", "1.22 rad (69.9°)"),
      metric("拇指侧摆速度", "Thumb abduction speed", "3.2 rad/s（193.59°/s）", "3.2 rad/s (193.59°/s)"), metric("四指弯曲速度", "Four-finger bend speed", "3.5 rad/s（200.47°/s）", "3.5 rad/s (200.47°/s)"),
      metric("拇指弯曲速度", "Thumb bend speed", "1.52 rad/s（87.36°/s）", "1.52 rad/s (87.36°/s)"),
    ],
  }),
  hand({
    id: "deep-linker-hand-5",
    name: "Linker Hand O30",
    positioningZh: "20 个关节全主动直驱的科研型灵巧手，官网公开 500 Hz、730 g、30 kg 最大负载和 30 N 四指最大指尖力。",
    positioningEn: "A research hand with 20 fully actuated direct-drive joints, published at 500 Hz, 730 g, 30 kg maximum payload, and 30 N maximum four-finger fingertip force.",
    architectureZh: "20 个全主动自由度与直驱架构",
    architectureEn: "20 fully actuated DoF with direct drive",
    officialUrl: "https://www.linkerbot.cn/details/LinkerHandO30/",
    parameters: [
      metric("型号", "Model", "Linker Hand O30"), metric("自由度", "Degrees of freedom", "20 全主动", "20 fully actuated"), metric("传动方式", "Transmission", "直驱", "Direct drive"), metric("通信频率", "Communication rate", "500 Hz"),
      metric("控制接口", "Control interfaces", "CAN / CAN FD"), metric("重量", "Mass", "730 g"), metric("最大负载", "Maximum payload", "30 kg"), metric("工作电压", "Operating voltage", "24–48 VDC"),
      metric("静态电流", "Static current", "0.4 A @ 24 V"), metric("空载运动平均电流", "Average no-load current", "1.1 A @ 24 V"), metric("最大功率", "Maximum power", "150 W"),
      metric("重复定位精度", "Repeatability", "±0.20 mm"), metric("开合时间", "Open/close time", "0.8 s"), metric("拇指最大指尖力", "Maximum thumb fingertip force", "24 N"),
      metric("四指最大指尖力", "Maximum four-finger fingertip force", "30 N"), metric("五指最大抓握力", "Maximum five-finger grip force", "70 N"),
      metric("拇指旋转范围", "Thumb rotation range", "0.63 rad（36°）", "0.63 rad (36°)"), metric("四指弯曲角度", "Four-finger bend angle", "1.84 rad（105.315°）", "1.84 rad (105.315°)"),
      metric("拇指侧摆速度", "Thumb abduction speed", "1.8718 rad/s（107.249°/s）", "1.8718 rad/s (107.249°/s)"), metric("四指弯曲速度", "Four-finger bend speed", "2.3871 rad/s（136.77°/s）", "2.3871 rad/s (136.77°/s)"),
      metric("拇指弯曲速度", "Thumb bend speed", "2.3134 rad/s（132.55°/s）", "2.3134 rad/s (132.55°/s)"),
    ],
  }),
  hand({
    id: "deep-linker-hand-6",
    name: "Linker Hand L30",
    positioningZh: "18 主动加 4 被动自由度的腱绳仿生灵巧手，官网正式表格公开 0.2 s 开合和最高 450.35°/s 的拇指弯曲速度。",
    positioningEn: "A tendon-driven bionic hand with 18 active and four passive DoF, with an official 0.2 s open/close time and thumb bend speed up to 450.35°/s.",
    architectureZh: "18 个主动自由度、4 个被动自由度与腱绳驱动",
    architectureEn: "18 active and four passive DoF with tendon drive",
    officialUrl: "https://www.linkerbot.cn/details/LinkerHandL30/",
    parameters: [
      metric("型号", "Model", "Linker Hand L30"), metric("自由度", "Degrees of freedom", "18 主动 + 4 被动", "18 active + 4 passive"), metric("传动方式", "Transmission", "肌腱仿生驱动（腱绳）", "Bionic tendon drive"),
      metric("控制接口", "Control interface", "CAN FD（特性区另述 Mini-USB）", "CAN FD (feature section also mentions Mini-USB)"), metric("重量", "Mass", "1,192 g"), metric("最大负载", "Maximum payload", "15 kg"),
      metric("工作电压", "Operating voltage", "24 VDC ±10%"), metric("静态电流", "Static current", "0.16 A"), metric("空载运动平均电流", "Average no-load current", "0.62 A"), metric("最大电流", "Maximum current", "2.71 A"),
      metric("重复定位精度", "Repeatability", "±0.2 mm"), metric("开合时间", "Open/close time", "0.2 s"), metric("拇指最大指尖力", "Maximum thumb fingertip force", "6.5 N"),
      metric("四指最大指尖力", "Maximum four-finger fingertip force", "9 N"), metric("五指最大抓握力", "Maximum five-finger grip force", "39 N"),
      metric("拇指横向旋转范围", "Thumb rotation range", "0.61 rad（35°）", "0.61 rad (35°)"), metric("四指弯曲角度", "Four-finger bend angle", "1.52 rad（87.2°）", "1.52 rad (87.2°)"),
      metric("拇指侧摆速度", "Thumb abduction speed", "4.92 rad/s（282.4°/s）", "4.92 rad/s (282.4°/s)"), metric("四指弯曲速度", "Four-finger bend speed", "6.343 rad/s（363.6°/s）", "6.343 rad/s (363.6°/s)"),
      metric("拇指弯曲速度", "Thumb bend speed", "7.85 rad/s（450.35°/s）", "7.85 rad/s (450.35°/s)"),
      metric("特性区通信频率", "Feature-section communication rate", "500 Hz"),
    ],
  }),
];

const platformContent: LinkerBotProductContent[] = [
  {
    id: "deep-linker-platform-1",
    summary: text("7 自由度轻量机械臂，整机 5.6 kg、工作半径 608 mm、额定负载 3 kg，面向具身操作和轻型自动化。", "A lightweight 7-DoF arm weighing 5.6 kg, with 608 mm reach and 3 kg rated payload for embodied manipulation and light automation."),
    overview: [text("Linker Arm P7 将电机、驱动器和行星减速器集成在关节内，公开表格覆盖自由度、重量、工作半径、额定负载、重复定位精度、电源、通信、功率和温度。", "Linker Arm P7 integrates motor, drive, and planetary reducer in its joints. The public table covers DoF, mass, reach, rated payload, repeatability, power, communication, power draw, and temperature."), text("官网表格把静态最大负载写为“--”，因此本页只记录额定 3 kg，不推断静态极限。特性区的 100 rpm 为关节最高转速描述，需按具体关节和负载确认。", "The official table leaves static maximum payload as “--”, so this record only uses the 3 kg rated payload. The feature section's 100 rpm is a maximum joint-speed statement that requires joint- and load-specific confirmation.")],
    highlights: [highlight("七自由度冗余", "Seven-DoF redundancy", "七轴结构可在保持末端姿态时调整肘部和避障，但实际规划能力取决于控制器和 SDK。", "Seven axes allow elbow and obstacle-avoidance adjustment while maintaining tool pose, subject to controller and SDK capability."), highlight("轻量集成", "Lightweight integration", "5.6 kg 自重与 3 kg 额定负载适合移动平台和桌面工位，仍需核对基座刚度和动态负载。", "The 5.6 kg arm and 3 kg rated payload suit mobile platforms and benches, subject to base stiffness and dynamic-load checks."), highlight("通信与控制", "Communication and control", "官网公开 CAN/CAN FD 与 ±0.043 mm 重复定位精度，但未公开绝对精度、控制周期和安全等级。", "CAN/CAN FD and ±0.043 mm repeatability are published, while absolute accuracy, control cycle, and safety rating are not.")],
    applications: [text("移动操作和人形机器人双臂", "Mobile manipulation and humanoid dual arms"), text("轻型分拣、装配和搬运", "Light sorting, assembly, and handling"), text("遥操作和具身策略研究", "Teleoperation and embodied-policy research")],
    parameters: [metric("型号", "Model", "Linker Arm P7"), metric("自由度", "Degrees of freedom", "7"), metric("重量", "Mass", "5.6 kg"), metric("工作半径", "Reach", "608 mm"), metric("额定负载", "Rated payload", "3 kg"), metric("静态最大负载", "Static maximum payload", "未披露（官网表格为 --）", "Undisclosed (official table shows --)"), metric("重复定位精度", "Repeatability", "±0.043 mm"), metric("负载自重比", "Payload-to-mass ratio", "1:2"), metric("工作电压", "Operating voltage", "48 V"), metric("通信方式", "Communication", "CAN / CAN FD"), metric("静态功率", "Static power", "11 W"), metric("最大功率", "Maximum power", "258 W"), metric("工作温度", "Operating temperature", "0–50 °C")],
    officialUrl: "https://www.linkerbot.cn/details/LinkerArm/",
    integration: text("确认基座、法兰、线缆、控制周期和急停链路后，以最不利伸展姿态验证负载、振动、重复定位和热稳定性；双臂应用还需做互碰与自碰约束。", "After confirming base, flange, cabling, control cycle, and emergency-stop chain, validate payload, vibration, repeatability, and thermal stability at worst-case reach; dual-arm systems also need inter-arm and self-collision constraints."),
    verification: text("13 项按官网产品数据表逐项记录；静态最大负载未披露，100 rpm 仅出现在特性说明中，不作为正式表格字段。", "All 13 fields follow the official product-data table. Static maximum payload is undisclosed, and 100 rpm appears only in feature copy rather than the formal table."),
  },
  {
    id: "deep-linker-platform-2",
    summary: text("由双 7 自由度机械臂、升降立柱、可选双轮差速底盘和灵巧手组成的移动操作平台，身高约 1,450–1,950 mm。", "A mobile-manipulation platform combining dual 7-DoF arms, a lift column, optional differential-drive base, and dexterous hands, with adjustable height of about 1,450–1,950 mm."),
    overview: [text("Linker Humanoid V2 更接近轮式双臂操作平台，而非双足人形。公开参数分别列出上身和可选底盘，避免把底盘能力误认为所有配置标配。", "Linker Humanoid V2 is closer to a wheeled dual-arm manipulation platform than a biped humanoid. Public parameters separate the upper body from the optional base to avoid treating base capabilities as standard."), text("官网公开 Ubuntu、C/C++/Python API 与 ROS 遥操作描述，也列出可选 RGB-D 和语音能力。软件版本、开放控制层级及安全功能仍需在交付配置中确认。", "The official page describes Ubuntu, C/C++/Python APIs, ROS teleoperation, and optional RGB-D and voice functions. Software revision, control-access level, and safety functions still require delivery-specific confirmation.")],
    highlights: [highlight("高度可调", "Adjustable height", "升降范围使平台覆盖低位到高位工作，但最大高度下的稳定性和动态载荷需单独测试。", "The lift covers low and high work areas, while stability and dynamic payload at maximum height require separate testing."), highlight("末端兼容", "End-effector compatibility", "官网称适配全系列灵巧手，实际仍应锁定法兰、供电、通信和载荷预算。", "The page states compatibility with all Linker hands, while flange, power, communication, and payload budget must still be fixed."), highlight("可选移动底盘", "Optional mobile base", "双轮差速底盘、定位和避障属于选配，不应套用到固定式版本。", "The differential base, localization, and obstacle avoidance are optional and should not be attributed to a fixed-base edition.")],
    applications: [text("家庭服务、医药和仓储物流遥操作", "Teleoperation in home service, healthcare, and logistics"), text("双臂抓取、装配和高低位作业", "Dual-arm grasping, assembly, and multi-height work"), text("机器人 API 和具身任务开发", "Robot API and embodied-task development")],
    parameters: [metric("型号", "Model", "Linker Humanoid V2"), metric("身高", "Height", "约 1,450–1,950 mm", "About 1,450–1,950 mm"), metric("双臂臂展", "Dual-arm span", "约 1,550 mm", "About 1,550 mm"), metric("重量", "Mass", "约 100 kg", "About 100 kg"), metric("双臂自由度", "Dual-arm DoF", "2×7"), metric("臂末端负载", "Arm-end payload", "2 kg"), metric("灵巧手兼容", "Dexterous-hand compatibility", "适配灵心巧手全系列", "Compatible with LinkerBot hand range"), metric("可选底盘移动方式", "Optional base drive", "双轮差速", "Differential two-wheel drive"), metric("可选底盘尺寸", "Optional base dimensions", "官网原文 535×4505×355 mm，疑似排版错误", "Official text 535×4505×355 mm; likely a formatting error"), metric("底盘最高 / 正常速度", "Base max / normal speed", "1.2 / 0.8–1.2 m/s"), metric("避障传感器", "Obstacle sensors", "RGB 相机 / 红外测距 / 超声波", "RGB camera / infrared ranging / ultrasonic"), metric("导航", "Navigation", "自主规划路径", "Autonomous route planning"), metric("激光定位精度", "Laser localization accuracy", "2 cm"), metric("爬坡角度", "Slope", "10°"), metric("定位精度", "Localization accuracy", "5–15 cm；8°"), metric("底盘电池", "Base battery", "16 Ah"), metric("底盘充电时长", "Base charging time", "≤3 h"), metric("底盘重量", "Base mass", "60 kg")],
    officialUrl: "https://www.linkerbot.cn/details/LinkerHumanoid/",
    integration: text("先区分固定式与移动底盘版，再确认升降、双臂、手部、视觉、语音和遥操作选件。移动版本需验证制动、坡道、定位丢失、避障盲区与最高升降位稳定性。", "First distinguish fixed and mobile-base editions, then confirm lift, arms, hands, vision, voice, and teleoperation options. The mobile version requires braking, slope, localization-loss, blind-zone, and maximum-height stability tests."),
    verification: text("参数来自官方产品页。底盘尺寸中的 4505 mm 与页面图示和其他尺寸不协调，本页原样保留并明确标疑，不自行改成推测值。", "Specifications come from the official product page. The published 4505 mm base dimension is inconsistent with the illustration and other dimensions, so it is preserved with a warning rather than silently corrected."),
  },
  {
    id: "deep-linker-platform-3",
    summary: text("基于 MEMS 姿态传感器的手部运动捕捉手套，单只 7 个传感器，100 Hz 输出，厂商标称连续工作 6 小时。", "A MEMS-based hand motion-capture glove with seven sensors per glove, 100 Hz output, and a vendor-stated six-hour operating time."),
    overview: [text("Linker MCG 用于捕捉手指屈伸和外展等姿态，并通过 2.4 GHz 链路输出。官网同时列出 600 Hz 数据计算帧率与 100 Hz 输出帧率，应在数据管线中区分内部计算和实际保存频率。", "Linker MCG captures finger flexion and abduction and outputs over a 2.4 GHz link. The official page lists 600 Hz computation and 100 Hz output, which should be distinguished in the data pipeline."), text("官网未披露手套重量和额定功率；这些字段保留为未披露，而不是用类似产品估算。", "The official page does not disclose glove mass or rated power; these remain undisclosed rather than estimated from similar products.")],
    highlights: [highlight("姿态精度", "Pose accuracy", "静态 Roll/Pitch/Yaw 精度分别不高于 0.1°/0.1°/0.2°，但动态精度与磁环境影响仍需实测。", "Static Roll/Pitch/Yaw accuracy is stated at ≤0.1°/0.1°/0.2°, while dynamic accuracy and magnetic-environment effects need testing."), highlight("计算与输出分层", "Compute/output separation", "内部计算 600 Hz、外部输出 100 Hz，采集系统应按输出时间戳评估实际数据密度。", "Internal computation is 600 Hz and external output 100 Hz; acquisition should evaluate actual data density from output timestamps."), highlight("长时佩戴", "Long-session use", "6 小时电池口径适合长时采集评估，仍需验证佩戴舒适性、漂移和操作者差异。", "The six-hour battery figure supports long-session evaluation, while comfort, drift, and operator variability still need validation.")],
    applications: [text("灵巧手遥操作和动作映射", "Dexterous-hand teleoperation and motion mapping"), text("VR 交互和医疗仿真", "VR interaction and medical simulation"), text("手部动作数据采集", "Hand-motion data capture")],
    parameters: [metric("型号", "Model", "LMCG1-01"), metric("手套重量", "Glove mass", "未披露（官网为 --）", "Undisclosed (official table shows --)"), metric("传感器数量", "Sensor count", "7 个 / 单只", "7 per glove"), metric("最小分辨率", "Minimum resolution", "≤0.001°"), metric("静态姿态精度", "Static pose accuracy", "Roll ≤0.1°；Pitch ≤0.1°；Yaw ≤0.2°"), metric("工作电压", "Operating voltage", "3.3 VDC"), metric("额定功率", "Rated power", "未披露（官网为 --）", "Undisclosed (official table shows --)"), metric("电池容量", "Battery capacity", "700 mAh"), metric("工作时长", "Operating time", "6 h"), metric("数据计算帧率", "Computation rate", "600 Hz"), metric("数据输出帧率", "Output rate", "100 Hz"), metric("工作频段", "Frequency band", "2.4 GHz")],
    officialUrl: "https://www.linkerbot.cn/details/LinkerMCG/",
    integration: text("建立操作者手型、佩戴位置和零姿态标定流程，记录内部计算与输出时间戳，测试长时漂移、无线丢包、遮挡和不同手型复现误差。", "Establish operator hand-size, wearing-position, and neutral-pose calibration; record compute and output timestamps; test long-term drift, wireless loss, occlusion, and cross-operator reproduction error."),
    verification: text("12 项按官网产品数据表记录，其中手套重量和额定功率明确为未披露。0.001°是最小分辨率，不等同于动态捕捉精度。", "All 12 fields follow the official table, with glove mass and rated power explicitly undisclosed. The 0.001° figure is minimum resolution, not dynamic capture accuracy."),
  },
  {
    id: "deep-linker-platform-4",
    summary: text("集成 21 自由度运动捕捉与抓握力反馈的专业手套，支持有线 100 Hz 或无线 30 Hz 数据传输。", "A professional glove combining 21-DoF motion capture and grasp-force feedback, with 100 Hz wired or 30 Hz wireless transfer."),
    overview: [text("Linker FFG 通过 16 个电位器与 5 个舵机记录手部运动并提供力反馈。官网公开 0.08° 捕捉精度和 3.5 kg·cm 最大扭矩输出。", "Linker FFG uses 16 potentiometers and five servos for hand-motion capture and force feedback. The official page publishes 0.08° capture accuracy and 3.5 kg·cm maximum torque output."), text("有线和无线模式的数据频率不同，室内无线距离上限为 5 m；训练数据应记录通信模式，不能混合后按同一时间分辨率使用。", "Wired and wireless modes have different rates, with indoor wireless range up to 5 m; datasets should record the mode rather than treating both as the same temporal resolution.")],
    highlights: [highlight("动作与力反馈一体", "Motion plus force feedback", "21 自由度捕捉和 5 个舵机反馈面向远端接触交互，力反馈映射和安全上限需按机器人端传感器标定。", "Twenty-one-DoF capture and five-servo feedback target remote contact interaction, requiring robot-side force mapping and safety-limit calibration."), highlight("双传输模式", "Dual transfer modes", "有线 100 Hz 强调稳定性，无线 30 Hz 强调活动范围，二者适用的控制带宽不同。", "Wired 100 Hz favors stability and wireless 30 Hz favors mobility, with different control-bandwidth implications."), highlight("佩戴与人因", "Fit and ergonomics", "390 g 重量和反馈机构会影响长时使用，需评估疲劳、尺寸适配和紧急释放。", "The 390 g mass and feedback mechanism affect long sessions, requiring fatigue, sizing, and emergency-release evaluation.")],
    applications: [text("灵巧手力反馈遥操作", "Force-feedback dexterous-hand teleoperation"), text("VR 与医疗仿真训练", "VR and medical simulation training"), text("工业远程运维", "Remote industrial operation")],
    parameters: [metric("型号", "Model", "LFFG1-02 / LFFG1-03"), metric("自由度", "Degrees of freedom", "21"), metric("传感与反馈单元", "Sensing and feedback units", "16 个电位器 + 5 个舵机", "16 potentiometers + 5 servos"), metric("重量", "Mass", "390 g"), metric("捕捉精度", "Capture accuracy", "0.08°"), metric("最大扭矩输出", "Maximum torque output", "3.5 kg·cm"), metric("数据传输方式", "Data transfer", "有线 / 无线", "Wired / wireless"), metric("数据频率", "Data rate", "有线 100 Hz；无线 30 Hz", "Wired 100 Hz; wireless 30 Hz"), metric("传输距离", "Transmission range", "室内 ≤5 m", "Indoor ≤5 m"), metric("供电方式", "Power", "5 V Type-C")],
    officialUrl: "https://www.linkerbot.cn/details/LinkerFFG/",
    integration: text("分别标定姿态捕捉和力反馈通道，限制最大反馈扭矩，并记录有线/无线模式、端到端延迟、丢包、操作者尺寸和疲劳。机器人急停不得依赖手套无线链路。", "Calibrate pose and force-feedback channels separately, cap feedback torque, and log wired/wireless mode, end-to-end latency, packet loss, operator size, and fatigue. Robot emergency stop must not depend on the glove's wireless link."),
    verification: text("10 项按官网产品数据表逐项记录。官网未公开端到端延迟数值、每关节反馈力矩、手套尺寸范围或触觉反馈带宽。", "All 10 fields follow the official product-data table. End-to-end latency, per-joint feedback torque, glove size range, and haptic bandwidth are not disclosed."),
  },
  {
    id: "deep-linker-platform-5",
    summary: text("胸前式双臂遥操作设备，14 自由度、单臂臂展 658 mm、200 Hz 采样，使用 CAN 传输绝对值编码器数据。", "A chest-worn dual-arm teleoperation device with 14 DoF, 658 mm reach per arm, 200 Hz sampling, and CAN transfer of absolute-encoder data."),
    overview: [text("Linker TA 用于映射肩、肘和腕部轨迹。官网参数覆盖自由度、臂展、穿戴、电气、重量、CAN 链路、采样和编码器。", "Linker TA maps shoulder, elbow, and wrist trajectories. The official table covers DoF, reach, wearing method, electrical requirements, mass, CAN link, sampling, and encoders."), text("200 Hz 是设备采样频率，不能直接代表机器人端动作更新率或端到端延迟；映射软件、网络和从端控制器均会影响最终响应。", "The 200 Hz figure is device sampling, not necessarily robot command rate or end-to-end latency; mapping software, network, and slave controller all affect final response.")],
    highlights: [highlight("双臂人体映射", "Dual-arm body mapping", "14 自由度覆盖双侧肩肘腕轨迹，适合全臂示教，但人体和机器人运动学差异需要约束映射。", "Fourteen DoF cover bilateral shoulder, elbow, and wrist motion for arm demonstrations, requiring constrained mapping across human and robot kinematics."), highlight("高频绝对编码", "High-rate absolute encoding", "12-bit 绝对值编码器以 200 Hz 采样，仍需核对零位、动态噪声和 CAN 总线负载。", "Twelve-bit absolute encoders sample at 200 Hz, subject to zeroing, dynamic-noise, and CAN-bus-load checks."), highlight("胸前式佩戴", "Chest-worn configuration", "1.4 kg 胸前佩戴有利于空间映射，但长时数据采集需评估舒适性和操作者动作限制。", "The 1.4 kg chest-worn design supports spatial mapping, while long sessions require ergonomic and range-of-motion evaluation.")],
    applications: [text("双臂机器人遥操作", "Dual-arm robot teleoperation"), text("工业和服务任务示教", "Industrial and service-task demonstration"), text("具身数据采集", "Embodied-data capture")],
    parameters: [metric("型号", "Model", "LTA1-02"), metric("自由度", "Degrees of freedom", "14"), metric("单臂臂展", "Reach per arm", "658 mm"), metric("穿戴方式", "Wearing method", "胸前式", "Chest-worn"), metric("额定电压", "Rated voltage", "24 V"), metric("额定电流", "Rated current", "0.075 A"), metric("重量", "Mass", "1.4 kg"), metric("通信方式", "Communication", "CAN"), metric("通信波特率", "Communication bitrate", "1 Mbps"), metric("采样频率", "Sampling rate", "200 Hz"), metric("编码器", "Encoder", "12-bit 绝对值编码器", "12-bit absolute encoder")],
    officialUrl: "https://www.linkerbot.cn/details/LinkerTA/",
    integration: text("建立人体到机器人双臂的坐标、比例、关节限位和奇异位形映射，并把 CAN 时间戳与从端状态统一。验收应包含急停、快速动作、长时佩戴、碰撞和失联恢复。", "Establish frames, scale, joint limits, and singularity handling from human to robot arms, and synchronize CAN timestamps with slave state. Acceptance should cover emergency stop, rapid motion, long wear, collision, and disconnection recovery."),
    verification: text("11 项来自 Linker TA 官方产品表。官网未给出端到端延迟、关节角范围、动态精度和兼容机器人清单。", "All 11 fields come from the official Linker TA table. End-to-end latency, joint ranges, dynamic accuracy, and compatible robot list are not disclosed."),
  },
  {
    id: "deep-linker-eg",
    summary: text("基于磁编码器和 ESP-NOW 的外骨骼手套，单只 15 个传感器、50 Hz 输出、0.1° 捕捉精度，用于灵巧手无线遥操作。", "An exoskeleton glove using magnetic encoders and ESP-NOW, with 15 sensors per glove, 50 Hz output, and 0.1° capture accuracy for wireless hand teleoperation."),
    overview: [text("Linker EG 采集每根手指横摆、根部和指尖三个维度的关节数据，并通过动态映射校准适配不同灵巧手。官网参数表公开通信、延迟、距离、电池、充电、按键和屏幕。", "Linker EG captures three joint dimensions per finger—abduction, base, and distal motion—and uses dynamic mapping calibration across hand types. The official table publishes communication, latency, range, battery, charging, buttons, and display."), text("产品页正文曾写 2 小时续航和 2 小时内充满，而正式参数表写 3.2 小时续航与 1.5 小时充电。本页以正式表格为准，并保留文字差异提示。", "Feature copy mentions two-hour endurance and charging within two hours, while the formal table states 3.2-hour endurance and 1.5-hour charging. This record follows the formal table and preserves the discrepancy.")],
    highlights: [highlight("无漂移角度采集路线", "Drift-resistant angle capture", "官网将磁编码器作为避免定位漂移的核心路线；实际仍需验证机械间隙、安装偏差和重复佩戴。", "The official page presents magnetic encoders as avoiding positional drift, while mechanical play, mounting error, and repeat wear still need testing."), highlight("低延迟无线", "Low-latency wireless", "ESP-NOW 以 50 Hz、2 Mbps 和 <10 ms 公开口径传输，系统端到端延迟还包括映射和机器人控制。", "ESP-NOW is published at 50 Hz, 2 Mbps, and <10 ms, while system latency also includes mapping and robot control."), highlight("多手型校准", "Multi-hand calibration", "兼容清单属于持续扩展状态，采购前需核对目标手型、左右手和固件版本。", "The compatibility list is still expanding, so target hand, side, and firmware revision must be confirmed before procurement.")],
    applications: [text("灵巧手无线遥操作", "Wireless dexterous-hand teleoperation"), text("工业、康复和科研动作采集", "Industrial, rehabilitation, and research motion capture"), text("多手型映射与示教", "Multi-hand mapping and demonstration")],
    parameters: [metric("型号", "Model", "LEG1-02"), metric("传感器数量", "Sensor count", "15"), metric("重量", "Mass", "190 g / 单只", "190 g per glove"), metric("捕捉精度", "Capture accuracy", "0.1°"), metric("数据传输", "Data transfer", "ESP-NOW"), metric("数据频率", "Data rate", "50 Hz"), metric("数据速率", "Bitrate", "2 Mbps"), metric("传输延迟", "Transmission latency", "<10 ms"), metric("传输距离", "Range", "≤10 m"), metric("续航时间", "Endurance", "3.2 h"), metric("电池容量", "Battery capacity", "500 mAh"), metric("充电方式", "Charging", "Type-C"), metric("充电时长", "Charging time", "1.5 h"), metric("按键", "Buttons", "功能 A / 功能 B / 电源", "Function A / Function B / power"), metric("屏幕", "Display", "0.91 英寸", "0.91 inch"), metric("支持手型", "Supported hands", "O6 / O7 / L6 / L10 / L20 / L21（持续扩展）", "O6 / O7 / L6 / L10 / L20 / L21 (expanding)")],
    officialUrl: "https://www.linkerbot.cn/details/LinkerEG/",
    integration: text("先核对目标灵巧手是否在当前固件兼容清单，完成每名操作者的佩戴、零位、关节映射和左右手标定，再记录无线延迟、丢包、续航和重复佩戴误差。", "Confirm that the target hand is supported by the current firmware, calibrate wearing, zero pose, joint mapping, and side for each operator, then log wireless latency, packet loss, endurance, and repeat-wear error."),
    verification: text("16 项按官网正式产品表记录。正文与表格对续航和充电时间存在差异，本页采用表格的 3.2 h / 1.5 h，不把“无漂移”理解为所有工况下零误差。", "All 16 fields follow the formal official table. Feature copy and table differ on endurance and charging; this record uses 3.2 h / 1.5 h and does not interpret “no drift” as zero error in every condition."),
  },
  {
    id: "deep-linker-open-teledex",
    specificationKind: "capabilities",
    summary: text("由主端交互设备、从端灵巧手、协作机械臂和实时通信中间件组成的模块化遥操作与数据采集系统。", "A modular teleoperation and data-capture system combining master interaction devices, slave dexterous hands, collaborative arms, and real-time middleware."),
    overview: [text("Linker Open TeleDex 支持手套、外骨骼和 VR 等交互方式，面向多类机器人平台进行动作同步与数据采集。官网公开的是系统级能力和产出指标，不是单一固定硬件 BOM。", "Linker Open TeleDex supports gloves, exoskeletons, and VR across multiple robot platforms. The official page publishes system-level capabilities and production figures rather than a fixed hardware BOM."), text("公开口径包括多模态时间同步 ≤6 ms、有效产出率 50%–75% 以及单台设备连续产出 4 小时以上。各数字的任务、设备、审核和剔除定义未在公开页完整披露。", "Published figures include ≤6 ms multimodal synchronization, 50%–75% effective yield, and more than four hours of continuous output per device. Task, hardware, review, and rejection definitions are not fully disclosed.")],
    highlights: [highlight("模块化主从端", "Modular master/slave stack", "可组合手套、外骨骼、VR、灵巧手与协作臂，适合跨本体采集，但每种组合需要独立标定。", "Gloves, exoskeletons, VR, dexterous hands, and collaborative arms can be combined, with separate calibration required per embodiment."), highlight("同步与校准", "Synchronization and calibration", "官网强调自动同步和传感器校准；数据验收仍需检查真实时间戳、抖动和跨模态对齐误差。", "The page emphasizes automatic synchronization and sensor calibration; acceptance still needs actual timestamp, jitter, and cross-modal alignment checks."), highlight("量产数据流程", "Production data workflow", "多机协同、自动录制、批量校验和状态可视化面向规模采集，需明确有效产出的审核定义。", "Multi-device coordination, automatic recording, batch validation, and status visualization target scale, while the definition of effective yield must be specified.")],
    applications: [text("具身模型训练数据采集", "Embodied-model training-data capture"), text("多本体遥操作和示教", "Multi-embodiment teleoperation and demonstration"), text("工业化数据生产与质量管理", "Industrialized data production and quality management")],
    parameters: [metric("主端交互", "Master interfaces", "手套 / 外骨骼 / VR"), metric("从端系统", "Slave stack", "灵巧手 / 协作机械臂 / 实时通信中间件"), metric("多模态时间同步", "Multimodal synchronization", "≤6 ms（厂商公开口径）", "≤6 ms (vendor-published)"), metric("有效产出率", "Effective yield", "50%–75%（厂商公开口径）", "50%–75% (vendor-published)"), metric("连续数据产出", "Continuous data output", "单台设备 >4 h", ">4 h per device")],
    officialUrl: "https://www.linkerbot.cn/data/",
    integration: text("在合同中明确硬件组合、传感模态、时钟源、数据格式、标注、审核、失败样本、许可和隐私边界，并用目标任务复测同步误差、有效产出率与连续运行。", "Define hardware stack, modalities, clock source, data format, labels, review, failed samples, licensing, and privacy in the contract, then reproduce synchronization error, effective yield, and continuous duty on target tasks."),
    verification: text("5 项为官方数据页的系统能力口径，不是固定型号规格。官网未公开测试协议、样本数量、任务分布和有效产出的完整定义。", "These five fields are system-capability figures from the official data page, not a fixed model specification. Test protocol, sample count, task distribution, and the full effective-yield definition are not public."),
  },
  {
    id: "deep-linker-platform-6",
    specificationKind: "capabilities",
    summary: text("用于沉淀、管理、追踪和调用真实世界灵巧操作技能的技能库与云端智能平台。", "A skill-library and cloud-intelligence platform for accumulating, managing, tracing, and invoking real-world dexterous-manipulation skills."),
    overview: [text("LinkerSkillStore 位于灵心巧手的数据与云端智能体系中，公开能力围绕标准化采集、批量校验、主流训练框架兼容、权限和质量追踪。", "LinkerSkillStore sits in LinkerBot's data and cloud-intelligence stack, with published capabilities around standardized capture, batch validation, mainstream training-framework compatibility, permissions, and quality traceability."), text("公开页面没有给出技能数量、任务成功率、API、许可价格或部署形态，因此不能据此判断现成技能能否直接迁移到特定机器人和工位。", "The public page does not disclose skill count, task success, APIs, license pricing, or deployment form, so it cannot establish direct transfer to a specific robot or workcell.")],
    highlights: [highlight("采得稳", "Stable capture", "同步采集、状态可视化和异常识别用于稳定数据质量。", "Synchronized capture, state visualization, and anomaly detection support data quality."), highlight("交得出", "Deliverable output", "标准化格式和主流训练框架兼容便于数据转换与模型开发。", "Standardized formats and mainstream framework compatibility support conversion and model development."), highlight("管得住", "Governed assets", "质量追踪、权限管理和复用面向可管理的数据资产闭环。", "Quality traceability, permissions, and reuse support governed data assets.")],
    applications: [text("灵巧技能数据资产管理", "Dexterous-skill data-asset management"), text("训练数据交付和转换", "Training-data delivery and conversion"), text("跨任务技能沉淀与调用", "Cross-task skill accumulation and invocation")],
    parameters: [metric("数据采集", "Capture", "高精度同步 / 全链路状态可视化 / 异常识别"), metric("生产效率", "Production efficiency", "多机协同 / 自动录制 / 批量校验"), metric("交付", "Delivery", "标准化数据格式 / 主流训练与算法框架兼容"), metric("治理", "Governance", "质量追踪 / 权限管理 / 可复用资产")],
    officialUrl: "https://www.linkerbot.cn/data/",
    integration: text("先取得数据模式、API、版本、许可和部署说明，再用目标任务核对技能前置条件、机器人构型、坐标系、失败恢复和性能指标；不能把技能名称视为可直接部署证明。", "Obtain schema, API, version, license, and deployment documentation, then validate task preconditions, embodiment, frames, recovery, and performance. A skill name alone is not evidence of deployability."),
    verification: text("4 项来自官方数据页的能力描述，不是量化性能参数。公开页未披露技能目录规模、基准、价格和客户访问边界。", "These four fields are capability descriptions from the official data page, not quantified performance specifications. Catalog size, benchmarks, pricing, and customer access boundaries are not public."),
  },
  {
    id: "deep-linker-genesis",
    specificationKind: "capabilities",
    summary: text("灵心巧手在官方数据页公开的“灵心造物大模型”，处于模型路线与云端智能能力展示层级。", "LinkerBot's officially presented Linker Genesis foundation model, currently disclosed at model-direction and cloud-intelligence capability level."),
    overview: [text("官方数据页把 Linker Genesis 与云端数据库、Open TeleDex 和 LinkerSkillStore 放在同一数据闭环中，定位是理解并创造物理世界的灵巧操作模型。", "The official data page places Linker Genesis in the same loop as its cloud database, Open TeleDex, and LinkerSkillStore, positioning it as a dexterous-manipulation model for understanding and acting in the physical world."), text("公开页没有给出参数规模、训练数据量、输入输出、基准、权重、API 或许可证。本记录只确认产品名称和体系位置，不推断模型性能或可用性。", "The public page gives no parameter count, training-data scale, I/O contract, benchmarks, weights, API, or license. This record confirms only the name and stack position, without inferring model performance or availability.")],
    highlights: [highlight("数据闭环位置", "Data-loop position", "模型与遥操作采集、云端数据库和技能库关联，目标是形成数据到技能的闭环。", "The model is linked to teleoperation capture, cloud data, and skill storage in a data-to-skill loop."), highlight("公开证据有限", "Limited public evidence", "目前没有公开技术报告或模型卡支撑具体能力比较。", "No public technical report or model card currently supports capability comparison."), highlight("采购前置核验", "Pre-procurement checks", "需确认是否可访问、部署位置、硬件需求、数据权利和输出责任边界。", "Confirm access, deployment location, hardware requirements, data rights, and output-responsibility boundaries.")],
    applications: [text("灵巧操作模型研究", "Dexterous-manipulation model research"), text("数据到技能的训练闭环", "Data-to-skill training loop"), text("云端技能组织与调用", "Cloud skill organization and invocation")],
    parameters: [metric("产品层级", "Product level", "具身灵巧操作大模型", "Embodied dexterous-manipulation foundation model"), metric("关联数据系统", "Associated data system", "自研云端数据库 + Linker Open TeleDex"), metric("关联技能系统", "Associated skill system", "LinkerSkillStore & Cloud Intelligence")],
    officialUrl: "https://www.linkerbot.cn/data/",
    integration: text("在任何技术选型前取得模型卡、API、版本、部署、数据许可和基准说明，并用隔离的项目数据验证输入输出、泛化、失败模式和人工接管。", "Before technical selection, obtain model card, API, version, deployment, data-license, and benchmark documentation, then validate I/O, generalization, failure modes, and human takeover with isolated project data."),
    verification: text("3 项仅来自官方数据页的产品体系描述。未公开的模型参数、性能和交付状态均不补写。", "These three fields come only from the official data-page stack description. Undisclosed model size, performance, and delivery status are not filled in."),
  },
];

export const linkerBotProductContent: LinkerBotProductContent[] = [...hands, ...platformContent];

const expectedParameterCounts: Record<string, number> = {
  "deep-linker-hand-1": 16,
  "deep-linker-hand-2": 18,
  "deep-linker-hand-3": 20,
  "deep-linker-hand-o20": 20,
  "deep-linker-hand-4": 20,
  "deep-linker-hand-5": 21,
  "deep-linker-hand-6": 21,
  "deep-linker-platform-1": 13,
  "deep-linker-platform-2": 18,
  "deep-linker-platform-3": 12,
  "deep-linker-platform-4": 10,
  "deep-linker-platform-5": 11,
  "deep-linker-eg": 16,
  "deep-linker-open-teledex": 5,
  "deep-linker-platform-6": 4,
  "deep-linker-genesis": 3,
};

for (const product of linkerBotProductContent) {
  const expected = expectedParameterCounts[product.id];
  if (expected === undefined || product.parameters.length !== expected) {
    throw new Error(`LinkerBot parameter audit failed for ${product.id}: ${product.parameters.length}/${expected ?? "missing"}`);
  }
}

if (linkerBotProductContent.length !== Object.keys(expectedParameterCounts).length) {
  throw new Error(`LinkerBot product audit failed: ${linkerBotProductContent.length}/${Object.keys(expectedParameterCounts).length}`);
}
