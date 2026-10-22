type Text = { zh: string; en: string };
type Metric = { label: Text; value: Text };
type Highlight = { title: Text; detail: Text };
type Variant = { series: Text; model: string; form: Text; dimensions: string };

type PaxiniProductContent = {
  id: string;
  summary: Text;
  overview: Text[];
  highlights: Highlight[];
  variants?: Variant[];
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
const variant = (series: string, model: string, formZh: string, formEn: string, dimensions: string): Variant => ({
  series: text(series, series),
  model,
  form: text(formZh, formEn),
  dimensions,
});

export const paxiniProductContent: PaxiniProductContent[] = [
  {
    id: "deep-paxini-gen4",
    summary: text(
      "第四代多维触觉传感器系列，覆盖指尖、指腹、掌面、皮肤与夹爪形态，并公开 19 个具体料号。",
      "A fourth-generation multidimensional tactile-sensor family spanning fingertip, finger-pad, palm, skin, and gripper formats, with 19 published part numbers.",
    ),
    overview: [
      text(
        "PX6AX GEN4 是帕西尼当前的多形态触觉传感器平台。官网把它分为 Superior、Elite、Omega、Core、Neuron 与 Gripper 六组，产品页同时公开通用性能表和各料号尺寸，适合在灵巧手、夹爪及曲面覆盖设计中先做架构筛选。",
        "PX6AX GEN4 is PaXini's current multi-format tactile-sensor platform. The official page groups it into Superior, Elite, Omega, Core, Neuron, and Gripper series and publishes both a common specification table and part-level dimensions for architecture screening in hands, grippers, and curved-surface designs.",
      ),
      text(
        "该页面的 30 taxels/cm²、0.005 N 最小识别力、1 MHz 测量采样频率及 1000 Hz 最大输出频率属于厂商公开口径，其中部分指标标注为实验室数据。不同料号并不必然共享完全相同的封装、量程、接口与交付状态，具体项目仍应以料号规格书和样件测试为准。",
        "The published 30 taxels/cm² density, 0.005 N minimum detectable force, 1 MHz measurement sampling, and 1000 Hz maximum output rate are vendor figures, with some explicitly marked as laboratory data. Individual part numbers may differ in packaging, range, interface, and availability, so selection should be confirmed with a part-level datasheet and sample testing.",
      ),
    ],
    highlights: [
      highlight("多形态覆盖", "Multiple form factors", "同一产品族公开了指尖、指腹、掌面、皮肤和夹爪传感器，可围绕同一触觉路线覆盖机器人手部不同接触区域。", "The family publishes fingertip, finger-pad, palm, skin, and gripper sensors, allowing one tactile approach to cover several contact regions on a robot hand."),
      highlight("薄型与曲面集成", "Thin and curved integration", "官网给出的最低厚度为 2 mm，并说明可覆盖正面、侧周和曲面边缘；这有利于空间受限设计，但曲率、粘接和耐久性仍需按结构复核。", "The page states a minimum thickness of 2 mm and coverage across front, side, and curved edges. This supports space-constrained designs, while curvature, bonding, and durability still require mechanical validation."),
      highlight("交互与力矩能力", "Interaction and torque capability", "公开能力包括动态温度补偿、任意点转轴感知和主动触屏交互，适合进一步评估接触定位、滑移与交互任务。", "Published capabilities include dynamic temperature compensation, arbitrary-point rotational-axis sensing, and active touchscreen interaction for further evaluation in contact localization, slip, and interaction tasks."),
    ],
    variants: [
      variant("Superior", "PX6AX-GEN4-DP-S1510-Superior", "指尖", "Fingertip", "15×10×7 mm"),
      variant("Superior", "PX6AX-GEN4-U-M3323-Superior", "指腹", "Finger pad", "33×23×15 mm"),
      variant("Superior", "PX6AX-GEN4-MC-M2723-Superior", "掌面", "Palm", "27×23×2 mm"),
      variant("Elite", "PX6AX-GEN4-DP-S1813-Elite", "指尖", "Fingertip", "18×13×10 mm"),
      variant("Elite", "PX6AX-GEN4-DP-S2015-Elite", "指尖", "Fingertip", "20×15×10 mm"),
      variant("Elite", "PX6AX-GEN4-IP-S1610-Elite", "指腹", "Finger pad", "16×10×7 mm"),
      variant("Elite", "PX6AX-GEN4-MC-M2020-Elite", "掌面", "Palm", "20×20×5 mm"),
      variant("Omega", "PX6AX-GEN4-DP-L3530-Omega", "指尖", "Fingertip", "35×30×15 mm"),
      variant("Omega", "PX6AX-GEN4-IP-L5325-Omega", "指腹", "Finger pad", "53×25×6 mm"),
      variant("Omega", "PX6AX-GEN4-DP-M2826-Omega", "指尖", "Fingertip", "28×26×15 mm"),
      variant("Core", "PX6AX-GEN4-DP-S1813-Core", "指尖", "Fingertip", "18×13×10 mm"),
      variant("Core", "PX6AX-GEN4-DP-S2716-Core", "指尖", "Fingertip", "27×16×13 mm"),
      variant("Core", "PX6AX-GEN4-DP-S3013-Core", "指尖", "Fingertip", "30×13×10 mm"),
      variant("Core", "PX6AX-GEN4-IP-M2015-Core", "指腹", "Finger pad", "20×15×6 mm"),
      variant("Core", "PX6AX-GEN4-IP-M2324-Core", "指腹", "Finger pad", "23×24×6 mm"),
      variant("Core", "PX6AX-GEN4-IP-M3025-Core", "指腹", "Finger pad", "30×25×6 mm"),
      variant("Neuron", "PX6AX-GEN4-SK-S1010-Neuron", "皮肤传感器", "Skin sensor", "10×10×3 mm"),
      variant("Gripper", "PX6AX-GEN4-GR-M2824-Gripper", "夹爪传感器", "Gripper sensor", "28×24×6 mm"),
      variant("Gripper", "PX6AX-GEN4-GR-M3525-Gripper", "夹爪传感器", "Gripper sensor", "35×25×6 mm"),
    ],
    applications: [
      text("灵巧手指尖、指腹与掌面接触感知", "Contact sensing on dexterous-hand fingertips, finger pads, and palms"),
      text("工业夹爪接触检测、精细抓取与滑移研究", "Contact detection, precision grasping, and slip research for industrial grippers"),
      text("机器人皮肤、曲面覆盖与主动触屏交互", "Robot skin, curved-surface coverage, and active touchscreen interaction"),
    ],
    parameters: [
      metric("测量输出", "Measurement outputs", "三维阵列分布力、三维合力、三维力矩", "3D distributed force array, 3D resultant force, and 3D torque"),
      metric("有效多维触觉信号密度", "Effective multidimensional tactile density", "30 taxels/cm²"),
      metric("测量范围", "Measurement range", "法向 0–25 N；切向 ±10 N；支持定制 300 N 及以上", "Normal 0–25 N; shear ±10 N; customization at 300 N and above supported"),
      metric("尺寸厚度", "Thickness", "低至 2 mm", "As low as 2 mm"),
      metric("工作温度", "Operating temperature", "-10–50 °C"),
      metric("过载温度", "Overload temperature", "-20–120 °C"),
      metric("阻燃等级", "Flammability rating", "V-0（UL94）", "V-0 (UL94)"),
      metric("使用寿命", "Published life", ">1,000 万次测量（厂商实验室）", ">10 million measurements (vendor laboratory)"),
      metric("测量采样频率", "Measurement sampling frequency", "1 MHz"),
      metric("最大输出频率", "Maximum output frequency", "1,000 Hz（厂商实验室）", "1,000 Hz (vendor laboratory)"),
      metric("最小识别力", "Minimum detectable force", "0.005 N（厂商实验室）", "0.005 N (vendor laboratory)"),
      metric("空间分辨率", "Spatial resolution", "0.1 mm"),
      metric("安全过载", "Safe overload", "200%"),
      metric("冲击过载", "Impact overload", "300%"),
      metric("重复精度", "Repeatability", "<0.5% FS"),
      metric("防水防尘", "Ingress protection", "IP68"),
      metric("抗杂散磁场", "Stray-field immunity", "芯片级抗磁", "Chip-level magnetic immunity"),
      metric("工作电压", "Operating voltage", "3–5 V"),
      metric("表面覆盖", "Surface coverage", "正面及侧周曲面边缘全覆盖", "Full coverage of front, side, and curved edges"),
      metric("动态温度补偿", "Dynamic temperature compensation", "支持", "Supported"),
      metric("扭矩感知", "Torque sensing", "支持任意点转轴感知", "Arbitrary-point rotational-axis sensing supported"),
      metric("主动触屏交互", "Active touchscreen interaction", "支持", "Supported"),
    ],
    officialUrl: "https://paxini.com/cn/ax/gen4",
    integration: text("先按接触区域和可用安装空间选定具体料号，再确认柔性层曲率、固定方式、线缆出口、控制器接口、同步时钟及标定流程。", "Select a specific part number by contact region and packaging space, then confirm compliant-layer curvature, mounting, cable exit, controller interface, clock synchronization, and calibration workflow."),
    verification: text("通用性能表与 19 个料号尺寸来自同一官方页面，但并未逐料号声明所有性能完全一致。0.005 N、1,000 Hz 与寿命值带有实验室口径，采购时应索取目标料号规格书并在实际曲面、温度和载荷下复测。", "The common specification table and 19 part dimensions come from the same official page, but the page does not state that every figure applies identically to every part number. The 0.005 N, 1,000 Hz, and life figures use laboratory framing; request the selected part's datasheet and retest under actual curvature, temperature, and load."),
  },
  {
    id: "deep-paxini-gen3",
    summary: text("第三代六维阵列触觉传感器系列，官网公开 12 个 Elite、Core 与 Omega 料号及完整通用参数。", "A third-generation six-axis array tactile-sensor family with 12 published Elite, Core, and Omega part numbers and a complete common specification table."),
    overview: [
      text("PX-6AX GEN3 将三维阵列分布力、三维合力和三维力矩作为统一输出，公开形态覆盖指尖、指腹、掌面以及一体化指尖/指腹。它适合作为需要空间分布和接触方向信息的机器人手部传感方案候选。", "PX-6AX GEN3 combines 3D distributed-force arrays, 3D resultant force, and 3D torque as outputs. Published formats cover fingertips, finger pads, palms, and an integrated fingertip/finger-pad form for robot-hand designs requiring spatial and directional contact information."),
      text("官网参数表给出最多 717 路触觉信号、1 MHz 测量采样和 1000 Hz 最大输出。参数表是产品族口径，12 个料号的尺寸单独列出，因此页面将二者分开展示，避免把某个尺寸和未明确绑定的性能错误组合。", "The official table states up to 717 tactile channels, 1 MHz measurement sampling, and a 1000 Hz maximum output rate. Because the table is family-level while dimensions are listed by part number, this record presents them separately rather than incorrectly binding an unassigned performance figure to a specific size."),
    ],
    highlights: [
      highlight("阵列与合力并行输出", "Array and resultant outputs", "既提供接触面的分布力，也提供合力与力矩，可分别服务接触定位、抓取控制和外力估计。", "Distributed surface force is available alongside resultant force and torque for contact localization, grasp control, and external-force estimation."),
      highlight("多区域封装", "Multi-region packaging", "12 个公开料号覆盖指尖、指腹、掌面和一体化指端，便于围绕手部结构选择传感区域。", "Twelve published part numbers cover fingertips, finger pads, palms, and integrated finger ends for region-specific hand integration."),
      highlight("环境与保护指标", "Environmental and protection figures", "公开值包括 IP68、V-0（UL94）、200% 安全过载和 300% 冲击过载，但安装后的整机防护仍需重新验证。", "Published figures include IP68, V-0 (UL94), 200% safe overload, and 300% impact overload, while assembled-system protection still requires validation."),
    ],
    variants: [
      variant("Elite", "PX6AX-GEN3-DP-S1813-Elite", "指尖", "Fingertip", "18×13×10 mm"),
      variant("Elite", "PX6AX-GEN3-DP-S2015-Elite", "指尖", "Fingertip", "20×15×10 mm"),
      variant("Elite", "PX6AX-GEN3-IP-S1610-Elite", "指腹", "Finger pad", "16×10×8 mm"),
      variant("Elite", "PX6AX-GEN3-MC-M2020-Elite", "掌面", "Palm", "20×20×8 mm"),
      variant("Core", "PX6AX-GEN3-DP-S1813-Core", "指尖", "Fingertip", "18×13×10 mm"),
      variant("Core", "PX6AX-GEN3-DP-S2716-Core", "指尖", "Fingertip", "27×16×13 mm"),
      variant("Core", "PX6AX-GEN3-DP-S3013-Core", "一体化指尖/指腹", "Integrated fingertip/finger pad", "30×13×10 mm"),
      variant("Core", "PX6AX-GEN3-IP-M2324-Core", "指腹", "Finger pad", "23×24×8 mm"),
      variant("Core", "PX6AX-GEN3-CP-M3025-Core", "指腹", "Finger pad", "30×25×8 mm"),
      variant("Omega", "PX6AX-GEN3-DP-M2826-Omega", "指尖", "Fingertip", "28×26×14 mm"),
      variant("Omega", "PX6AX-GEN3-DP-L3530-Omega", "指尖", "Fingertip", "35×30×8 mm"),
      variant("Omega", "PX6AX-GEN3-CP-L5325-Omega", "拇指指腹", "Thumb finger pad", "53×25×8 mm"),
    ],
    applications: [text("灵巧手分布式触觉和接触闭环", "Distributed tactile sensing and contact feedback for dexterous hands"), text("机器人抓取、滑移识别与力矩估计", "Robot grasping, slip detection, and torque estimation"), text("指尖、指腹和掌面多区域触觉覆盖", "Multi-region tactile coverage across fingertips, pads, and palms")],
    parameters: [
      metric("测量输出", "Measurement outputs", "三维阵列分布力、三维合力、三维力矩", "3D distributed force array, 3D resultant force, and 3D torque"),
      metric("触觉信号数", "Tactile channels", "最多 717 路", "Up to 717"),
      metric("测量范围", "Measurement range", "法向 0–25 N；切向 ±10 N", "Normal 0–25 N; shear ±10 N"),
      metric("工作温度", "Operating temperature", "0–50 °C"),
      metric("过载温度", "Overload temperature", "-20–120 °C"),
      metric("阻燃等级", "Flammability rating", "V-0（UL94）", "V-0 (UL94)"),
      metric("使用寿命", "Published life", ">1,000 万次测量（厂商实验室）", ">10 million measurements (vendor laboratory)"),
      metric("测量采样频率", "Measurement sampling frequency", "1,000,000 Hz"),
      metric("最大输出频率", "Maximum output frequency", "1,000 Hz（厂商实验室）", "1,000 Hz (vendor laboratory)"),
      metric("最小识别力", "Minimum detectable force", "0.01 N（厂商实验室）", "0.01 N (vendor laboratory)"),
      metric("空间分辨率", "Spatial resolution", "0.1 mm（厂商实验室）", "0.1 mm (vendor laboratory)"),
      metric("安全过载", "Safe overload", "200%"),
      metric("冲击过载", "Impact overload", "300%"),
      metric("重复精度", "Repeatability", "<0.5% FS"),
      metric("防水防尘", "Ingress protection", "IP68"),
      metric("抗杂散磁场", "Stray-field immunity", "芯片级抗磁", "Chip-level magnetic immunity"),
      metric("工作电压", "Operating voltage", "3–5 V"),
      metric("表面覆盖", "Surface coverage", "正面及侧周曲面边缘全覆盖", "Full coverage of front, side, and curved edges"),
      metric("动态温度感知补偿", "Dynamic temperature compensation", "具备", "Available"),
      metric("扭矩感知", "Torque sensing", "支持任意点转轴感知", "Arbitrary-point rotational-axis sensing supported"),
    ],
    officialUrl: "https://paxini.com/cn/ax/gen3",
    integration: text("根据接触区域选择料号，并在机械设计阶段确认安装面、曲率、出线、控制器、采样同步和标定。触觉闭环还需要结合控制周期与噪声测试确定滤波和阈值。", "Choose a part by contact region and confirm mounting surface, curvature, cable routing, controller, synchronization, and calibration during mechanical design. Closed-loop tactile control also requires noise and control-cycle testing to set filters and thresholds."),
    verification: text("20 项性能参数为官网产品族口径，12 个尺寸为料号级口径。部分采样、识别力、空间分辨率和寿命数据标注为厂商实验室结果；Omega L3530 当前官网型号列表标为 35×30×8 mm，采购前仍应按最新版料号规格书复核。", "The 20 performance fields are family-level, while the 12 dimensions are part-level. Some sampling, force, spatial-resolution, and life figures are marked as vendor laboratory results. The current official model list gives Omega L3530 as 35×30×8 mm; confirm it against the latest part-level datasheet before purchase."),
  },
  {
    id: "deep-paxini-px3q",
    summary: text("面向机器人关节的薄型扭矩传感器系列，公开 ±30、±50 与 ±100 N·m 三档量程及多种工业通信接口。", "A thin joint-torque sensor family for robot joints with published ±30, ±50, and ±100 N·m ranges and several industrial interfaces."),
    overview: [
      text("PX3Q 用于关节扭矩测量和力控反馈。官网将量程、直径和高度分别列为多个可选值，并说明尺寸可以定制，但没有在公开表格中给出每个量程与尺寸的一一对应关系。", "PX3Q targets joint-torque measurement and force-control feedback. The official table lists several ranges, diameters, and heights and states that dimensions can be customized, but it does not map each range to a specific size in public material."),
      text("公开指标包括 0.1% FS 分辨率、0.5% FS 综合准确度、1000 Hz 采样率和 300% 极限过载。选型时还需获得目标量程的零点漂移、温漂、轴向刚度、安装法兰和校准报告。", "Published figures include 0.1% FS resolution, 0.5% FS combined accuracy, 1000 Hz sampling, and 300% ultimate overload. Selection still requires zero-drift, thermal-drift, axial-stiffness, mounting-flange, and calibration data for the target range."),
    ],
    highlights: [
      highlight("多量程薄型设计", "Multi-range thin design", "公开量程覆盖 ±30 至 ±100 N·m，高度为 9 或 11 mm，可用于不同尺寸关节的初步匹配。", "Published ranges span ±30 to ±100 N·m with 9 or 11 mm heights for preliminary matching to different joint sizes."),
      highlight("工业接口选择", "Industrial interface options", "公开通信包括 RS485、CAN-FD、EtherCAT 和 USB，仍需按具体版本确认接口是否原生集成。", "Published communications include RS485, CAN-FD, EtherCAT, and USB; confirm which interface is natively integrated in the quoted version."),
      highlight("过载与温度范围", "Overload and temperature range", "官网给出 300% 极限过载和 -10 至 80 °C 工作温度，整机关节的热源和预紧仍可能影响测量。", "The page states 300% ultimate overload and -10 to 80 °C operation, while joint heat sources and preload can still affect measurement."),
    ],
    applications: [text("机器人一体化关节扭矩反馈", "Torque feedback in integrated robot joints"), text("协作机械臂碰撞检测与柔顺控制", "Collision detection and compliant control for collaborative arms"), text("关节测试台和执行器性能评估", "Joint test benches and actuator performance evaluation")],
    parameters: [
      metric("测量范围", "Measurement range", "±30 / ±50 / ±100 N·m"), metric("分辨率", "Resolution", "0.1% FS（厂商实验室）", "0.1% FS (vendor laboratory)"), metric("采样率", "Sampling rate", "1,000 Hz（厂商实验室）", "1,000 Hz (vendor laboratory)"), metric("直径", "Diameter", "50 / 60 / 70 mm；支持定制", "50 / 60 / 70 mm; customization supported"), metric("高度", "Height", "9 / 9 / 11 mm；支持定制", "9 / 9 / 11 mm; customization supported"), metric("重量", "Mass", "50 g（厂商实验室）", "50 g (vendor laboratory)"), metric("材质", "Material", "铝合金", "Aluminum alloy"), metric("极限过载", "Ultimate overload", "300%"), metric("重复精度", "Repeatability", "0.1% FS"), metric("综合准确度", "Combined accuracy", "0.5% FS"), metric("工作温度", "Operating temperature", "-10–80 °C"), metric("防水防尘", "Ingress protection", "IP64；IP67 / IP68 可定制", "IP64; IP67 / IP68 customizable"), metric("工作电压", "Operating voltage", "9–24 VDC"), metric("通信", "Communication", "RS485 / CAN-FD / EtherCAT / USB"),
    ],
    officialUrl: "https://paxini.com/cn/ax/torque",
    integration: text("按峰值与持续扭矩留出安全裕量，并核对法兰、轴孔、预紧、刚度、温升、供电和总线周期。控制器应保留零点校准、滤波和异常过载处理。", "Allow margin for peak and continuous torque, then confirm flange, bore, preload, stiffness, temperature rise, supply, and bus cycle. The controller should support zero calibration, filtering, and overload handling."),
    verification: text("14 项参数均来自官方产品页；量程、直径和高度以并列选项公布，不能据此自行推断三者的固定组合。50 g、分辨率和采样率使用厂商实验室口径，目标型号应索取校准和环境测试文件。", "All 14 fields come from the official product page. Ranges, diameters, and heights are published as parallel options and should not be treated as fixed combinations without confirmation. The 50 g mass, resolution, and sampling rate use vendor-laboratory framing; request calibration and environmental test records for the target model."),
  },
  {
    id: "deep-paxini-px6d",
    summary: text("面向腕部、末端工具和力控测试的六维力/力矩传感器系列，公开多种直径、防护等级和工业接口。", "A six-axis force/torque sensor family for wrists, end tools, and force-control testing, with several published diameters, ingress ratings, and industrial interfaces."),
    overview: [
      text("PX6D 同时测量 Fx、Fy、Fz 与 Mx、My、Mz，官网公开的通用量程为三个力轴 ±50 N、三个力矩轴 ±2 N·m。产品页还列出 36、75 和 90 mm 直径选项，但未公开每个直径与量程的绑定关系。", "PX6D measures Fx, Fy, Fz, Mx, My, and Mz. The official common ranges are ±50 N on all force axes and ±2 N·m on all torque axes. The page also lists 36, 75, and 90 mm diameter options without publicly binding each diameter to a range."),
      text("0.5% FS 综合准确度、0.1% FS 重复精度和 1000 Hz 采样率可支持初步的力控架构评估，但机器人腕部选型还需要查看串扰、噪声、刚度、坐标系定义和温漂。", "The 0.5% FS combined accuracy, 0.1% FS repeatability, and 1000 Hz sampling support preliminary force-control architecture assessment, but wrist selection also requires crosstalk, noise, stiffness, coordinate-frame, and thermal-drift data."),
    ],
    highlights: [
      highlight("六轴同步测量", "Six-axis measurement", "一个传感器输出三轴力和三轴力矩，适用于末端接触、装配和测试中的多方向载荷观测。", "One sensor outputs three-axis force and three-axis torque for multidirectional load observation in contact, assembly, and testing."),
      highlight("多尺寸与防护选项", "Multiple sizes and protection options", "官网列出三种直径与 IP65、IP67、IP68 防护选项，需进一步确认哪个尺寸支持哪个防护版本。", "The page lists three diameters and IP65, IP67, and IP68 options; confirm which protection grade is available for each size."),
      highlight("总线适配范围", "Bus integration range", "通信覆盖 RS485、CAN、CAN-FD、EtherCAT 和 USB，可面向控制器或测试上位机，但实时性取决于所选版本。", "Communications span RS485, CAN, CAN-FD, EtherCAT, and USB for controllers or test hosts, while real-time behavior depends on the selected version."),
    ],
    applications: [text("机器人腕部六维力控", "Six-axis force control at robot wrists"), text("精密装配、打磨与接触测试", "Precision assembly, polishing, and contact testing"), text("末端执行器和关节测试台", "End-effector and joint test benches")],
    parameters: [
      metric("测量范围", "Measurement range", "Fx / Fy / Fz：-50–50 N；Mx / My / Mz：-2–2 N·m", "Fx / Fy / Fz: -50–50 N; Mx / My / Mz: -2–2 N·m"), metric("分辨率", "Resolution", "0.1% FS"), metric("采样率", "Sampling rate", "1,000 Hz"), metric("直径", "Diameter", "36 / 75 / 90 mm"), metric("高度", "Height", "24 mm"), metric("重量", "Mass", "180 g"), metric("材质", "Material", "铝合金", "Aluminum alloy"), metric("极限过载", "Ultimate overload", "300%"), metric("重复精度", "Repeatability", "0.1% FS"), metric("综合准确度", "Combined accuracy", "0.5% FS"), metric("工作温度", "Operating temperature", "-10–80 °C"), metric("防水防尘", "Ingress protection", "IP65 / IP67 / IP68"), metric("工作电压", "Operating voltage", "9–24 VDC"), metric("通信", "Communication", "RS485 / CAN / CAN-FD / EtherCAT / USB"),
    ],
    officialUrl: "https://paxini.com/cn/ax/6d",
    integration: text("围绕安装直径、工具力矩臂和峰值冲击选择量程，明确传感器坐标系与机器人法兰坐标系的变换，并核对线缆、总线周期、过载保护和重力补偿。", "Select range around mounting diameter, tool moment arm, and peak impact; define the transform between sensor and robot-flange frames; and confirm cabling, bus cycle, overload protection, and gravity compensation."),
    verification: text("14 个公开字段按官网参数表录入。官网将 9–24 VDC 与通信方式置于同一行，本页保留这一公开结构；不同直径、防护与通信组合的可供版本仍需通过具体料号确认。", "The 14 published fields follow the official table. The source places 9–24 VDC and communication methods in one row, which this record preserves; available combinations of diameter, protection, and interface still require part-level confirmation."),
  },
  {
    id: "deep-paxini-footrix",
    summary: text("用于双足机器人足底三向受力和压力分布感知的多维触觉传感器，公开量程最高覆盖 2,000 N 法向力。", "A multidimensional plantar tactile sensor for three-axis load and pressure-distribution sensing on biped robots, with a published normal-force range up to 2,000 N."),
    overview: [
      text("PX-FOOTRIX 面向落足接触、支撑状态与压力分布测量。官网参数表把 Fx/Fy 切向力、Fz 法向力、空间分辨率、采样率、防护和多种通信方式集中公开，适合用于足底结构与控制系统的初步接口设计。", "PX-FOOTRIX targets foot-contact, support-state, and pressure-distribution measurement. Its official table publishes Fx/Fy shear, Fz normal force, spatial resolution, sampling, ingress protection, and communication options for preliminary foot and control-system interface design."),
      text("官网特性文案提到更高的瞬态冲击承受描述，而正式参数表列出的极限过载为 300% FS。本页以参数表为准，不把两种口径合并；实际步态冲击、鞋底结构和安装刚度仍需样机验证。", "The feature copy mentions a higher transient-impact description, while the formal table lists 300% FS ultimate overload. This record follows the table and does not merge the two claims; actual gait impact, sole structure, and mounting stiffness still require prototype validation."),
    ],
    highlights: [
      highlight("足底三向载荷", "Three-axis plantar load", "公开量程覆盖 Fx/Fy ±1,000 N 与 Fz 0–2,000 N，可观察支撑期内的切向和法向受力。", "Published ranges cover Fx/Fy ±1,000 N and Fz 0–2,000 N for observing shear and normal loads during support."),
      highlight("压力分布与空间分辨率", "Pressure distribution and spatial resolution", "1 cm 空间分辨率用于分布感知，是否满足落足边缘和局部冲击分析应结合实际足底面积判断。", "The 1 cm spatial resolution supports distributed sensing; suitability for foot-edge and local-impact analysis depends on actual sole area."),
      highlight("多接口但交付形态不同", "Multiple interfaces with configuration differences", "标准通信为 SPI，UART、USB、RS485 需要转接，I2C 与 CAN-FD 为定制项，不能视为单一产品同时原生提供全部接口。", "SPI is standard, UART, USB, and RS485 require adapters, and I2C and CAN-FD are custom options, so the product should not be treated as natively providing every interface at once."),
    ],
    applications: [text("双足机器人落足检测与步态研究", "Foot-contact detection and gait research for biped robots"), text("重心、压力中心与平衡控制研究", "Center-of-mass, center-of-pressure, and balance-control research"), text("足底冲击和地面接触状态识别", "Plantar impact and ground-contact-state recognition")],
    parameters: [
      metric("测量范围", "Measurement range", "Fx / Fy：±1,000 N；Fz：0–2,000 N（厂商实验室）", "Fx / Fy: ±1,000 N; Fz: 0–2,000 N (vendor laboratory)"), metric("分辨率", "Resolution", "1% FS"), metric("空间分辨率", "Spatial resolution", "1 cm"), metric("极限过载", "Ultimate overload", "300% FS"), metric("采样率", "Sampling rate", "150 Hz"), metric("材质", "Material", "橡胶", "Rubber"), metric("工作温度", "Operating temperature", "-10–50 °C"), metric("防水防尘", "Ingress protection", "IP67 / IP68"), metric("工作电压", "Operating voltage", "3–5 V；配转接板时为 5 V 或 12 V", "3–5 V; 5 V or 12 V with adapter board"), metric("通信", "Communication", "SPI；UART / USB / RS485 需转接；I2C / CAN-FD 可定制", "SPI; UART / USB / RS485 via adapter; I2C / CAN-FD customizable"),
    ],
    officialUrl: "https://paxini.com/cn/ax/footrix",
    integration: text("需要联合确定足底尺寸、鞋底柔性层、安装预紧、受力传递路径、出线和密封。控制侧需核对 150 Hz 是否满足目标步态，并针对温度、冲击和地面材料完成标定。", "Jointly define sole dimensions, compliant layer, mounting preload, load path, cable routing, and sealing. On the control side, confirm whether 150 Hz meets the target gait and calibrate across temperature, impact, and ground materials."),
    verification: text("10 项参数按官网正式表格逐项录入。页面宣传文案与参数表对冲击承受能力采用不同表达，本页不作等同解释；量程、防护和接口仍应在目标足型及连接方案上验收。", "All 10 fields follow the formal official table. Promotional copy and the table use different descriptions for impact capacity, so this record does not equate them; range, ingress protection, and interfaces should be accepted on the target foot and connection design."),
  },
  {
    id: "deep-paxini-dexh13",
    summary: text("四指 16 自由度视触觉灵巧手，集成 1,140 个多维触觉单元、3,420 路触觉信号和 800 万像素手眼相机。", "A four-finger, 16-DoF visual-tactile dexterous hand integrating 1,140 multidimensional tactile cells, 3,420 tactile channels, and an 8MP hand-eye camera."),
    overview: [
      text("DexH13 将四指灵巧手、分布式多维触觉与掌侧视觉组合在一个末端中。官网公开 13 项规格，涵盖自由度、触觉、视觉、力、负载、抓握范围、速度、动作、驱动、通信和寿命，可用于对移动操作或固定机械臂的末端方案做初筛。", "DexH13 combines a four-finger hand, distributed multidimensional tactile sensing, and palm-side vision in one end effector. The official page publishes 13 specification fields covering DoF, tactile sensing, vision, force, payload, grasp range, speed, actions, actuation, communication, and life for preliminary screening on mobile or fixed manipulators."),
      text("页面中的 15 N 指尖力、1.5 s 最小开合时间和 100 万次寿命属于厂商公开或实验室口径。额定 5 kg 负载不能直接等同于任意姿态、任意抓握直径下的稳定负载，项目验收应使用目标物体和运动轨迹。", "The 15 N fingertip force, 1.5 s minimum open/close time, and one-million-cycle life are vendor-published or laboratory figures. The 5 kg rated payload is not proof of stable handling at every pose and diameter; project acceptance should use target objects and trajectories."),
    ],
    highlights: [
      highlight("视触觉一体", "Integrated vision and touch", "手部同时公开 1,140 个触觉单元、3,420 路信号和 800 万像素 RGB AI 相机，可支持接触前视觉定位与接触后触觉反馈。", "The hand publishes 1,140 tactile cells, 3,420 channels, and an 8MP RGB AI camera for visual localization before contact and tactile feedback after contact."),
      highlight("主动与被动自由度", "Active and passive DoF", "单手共 16 自由度，其中 13 个主动、3 个被动；控制接口和被动顺应的边界需要在动作规划中区分。", "Each hand has 16 DoF, including 13 active and 3 passive; motion planning must distinguish controllable axes from passive compliance."),
      highlight("抓握与按压", "Grasping and pressing", "公开动作覆盖抓、握、捏、压和手指开合，官网另展示 1 mm 按压定位能力，但该能力应按具体任务和标定条件验证。", "Published actions cover grasping, holding, pinching, pressing, and finger opening/closing. The page also presents 1 mm press-positioning capability, which requires task- and calibration-specific validation."),
    ],
    applications: [text("物流分拣、制造装配与服务操作", "Logistics sorting, manufacturing assembly, and service manipulation"), text("视触觉抓取、按键与接触状态研究", "Visual-tactile grasping, button pressing, and contact-state research"), text("遥操作示教和具身数据采集", "Teleoperation demonstration and embodied-data capture")],
    parameters: [
      metric("手指数量", "Finger count", "4"),
      metric("触觉感知能力", "Tactile sensing", "1,140 个多维触觉感知单元；15 种触觉感知能力", "1,140 multidimensional tactile cells; 15 tactile sensing capabilities"),
      metric("触觉信号数", "Tactile channels", "3,420 路", "3,420"),
      metric("视觉能力", "Vision", "800 万像素 RGB AI 手眼相机", "8MP RGB AI hand-eye camera"),
      metric("自由度", "Degrees of freedom", "16（13 主动 + 3 被动）", "16 (13 active + 3 passive)"),
      metric("指尖力", "Fingertip force", "15 N（厂商实验室）", "15 N (vendor laboratory)"),
      metric("额定负载", "Rated payload", "5 kg"),
      metric("最大抓握直径", "Maximum grip diameter", "15 cm"),
      metric("最小开合时间", "Minimum open/close time", "1.5 s（厂商实验室）", "1.5 s (vendor laboratory)"),
      metric("动作能力", "Published actions", "抓 / 握 / 捏 / 压 / 手指开合", "Grasp / hold / pinch / press / finger open-close"),
      metric("驱动方式", "Actuation", "空心杯电机驱动", "Coreless-motor actuation"),
      metric("通信", "Communication", "EtherCAT / Modbus"),
      metric("使用寿命", "Published life", "100 万次", "1 million cycles"),
    ],
    officialUrl: "https://paxini.com/cn/dex/gen2",
    integration: text("确认左右手版本、腕部法兰、线缆与供电，再将 EtherCAT 或 Modbus 接入控制器。视触觉数据应与关节状态统一时间戳，并按目标物体完成触觉阈值、相机外参和抓握策略标定。", "Confirm hand side, wrist flange, cabling, and power before integrating EtherCAT or Modbus. Tactile, visual, and joint data need a common timestamp, with tactile thresholds, camera extrinsics, and grasp policies calibrated on target objects."),
    verification: text("13 项参数按官方产品表逐项录入。指尖力、开合时间和寿命带有厂商实验室或厂商公开口径；额定负载还应明确腕姿、抓握方式、加速度与安全系数，视觉功能需确认相机输出和开发接口。", "All 13 fields follow the official product table. Fingertip force, open/close time, and life use vendor-published or laboratory framing. Rated payload also requires wrist pose, grasp type, acceleration, and safety-factor definitions, while vision requires confirmation of camera output and developer access."),
  },
  {
    id: "deep-paxini-gmh18",
    summary: text("五指 18 自由度多维触觉灵巧手，强调 20 kg 厂商实验室额定负载、自锁结构、视觉扩展和多种工业通信。", "A five-finger, 18-DoF multidimensional tactile hand emphasizing a vendor-laboratory 20 kg rated payload, self-locking mechanics, vision expansion, and multiple industrial interfaces."),
    overview: [
      text("GMH18 是帕西尼官网仍可直接访问的五指灵巧手页面，目前未出现在官网首页主产品导航中。本仓库将其保留为可核验的公开产品记录，同时用这一状态提醒用户在采购前确认是否仍为当前销售型号。", "GMH18 remains directly accessible on PaXini's official site but is not currently listed in the main product navigation. The repository retains it as a verifiable public product record while flagging the need to confirm current sales status before procurement."),
      text("官网公开 11 项参数，覆盖五指结构、18 自由度、千余个 ITPU 触觉单元、20 kg 额定负载、视觉扩展、通信、边缘计算、供电和驱动。高负载和自锁有利于稳固搬运，但不替代具体姿态、指型和动态工况下的负载曲线。", "The official page publishes 11 fields covering five fingers, 18 DoF, more than 1,000 ITPU tactile cells, a 20 kg rated payload, vision expansion, communications, edge computing, power, and actuation. High payload and self-locking may support stable handling but do not replace pose-, grip-, and duty-specific load curves."),
    ],
    highlights: [
      highlight("五指高负载路线", "Five-finger high-payload approach", "18 自由度包含 11 个主动和 7 个被动自由度，厂商实验室额定负载为 20 kg，定位偏向承载与稳固抓握。", "The 18 DoF comprise 11 active and 7 passive axes, with a vendor-laboratory rated payload of 20 kg and a positioning toward load bearing and stable grasping."),
      highlight("全域触觉覆盖", "Broad tactile coverage", "千余个 ITPU 覆盖指甲、指尖、指腹和掌心，公开为 15 种触觉感知能力。", "More than 1,000 ITPU cells cover nails, fingertips, finger pads, and palm, with 15 published tactile sensing capabilities."),
      highlight("控制与扩展", "Control and expansion", "页面列出内置力控算法、预设手势、USB Hub，以及 RGB、RGB-D 和红外视觉扩展，需确认所选配置实际包含哪些模块。", "The page lists built-in force-control algorithms, preset gestures, a USB hub, and RGB, RGB-D, and infrared vision expansion; confirm which modules are included in the selected configuration."),
    ],
    applications: [text("高负载抓取、稳固搬运与工业操作", "High-payload grasping, stable handling, and industrial manipulation"), text("五指触觉研究与力控策略验证", "Five-finger tactile research and force-control validation"), text("带视觉扩展的遥操作与数据采集", "Teleoperation and data capture with vision expansion")],
    parameters: [
      metric("手指数量", "Finger count", "5"), metric("自由度", "Degrees of freedom", "18（11 主动 + 7 被动）；拇指 5 自由度", "18 (11 active + 7 passive); 5-DoF thumb"), metric("触觉感知能力", "Tactile sensing", "1,000+ 个 ITPU 多维触觉单元；15 种触觉感知能力", "1,000+ ITPU multidimensional tactile cells; 15 tactile sensing capabilities"), metric("触觉覆盖", "Tactile coverage", "指甲 / 指尖 / 指腹 / 掌心", "Nails / fingertips / finger pads / palm"), metric("额定负载", "Rated payload", "20 kg（厂商实验室）", "20 kg (vendor laboratory)"), metric("动作能力", "Published actions", "捏 / 抓 / 握 / 压 / 手指开合", "Pinch / grasp / hold / press / finger open-close"), metric("视觉扩展", "Vision expansion", "掌心或手背可扩展 RGB / RGB-D / 红外", "Palm or hand-back expansion with RGB / RGB-D / infrared"), metric("通信", "Communication", "USB / EtherCAT / Ethernet / Modbus / CAN-FD"), metric("边缘计算", "Edge computing", "即插即用；内置力控算法", "Plug and play; built-in force-control algorithms"), metric("供电", "Power", "24–48 VDC / USB PD 3.1"), metric("驱动方式", "Actuation", "空心杯电机 + 多连杆传动", "Coreless motors + multi-linkage transmission"),
    ],
    officialUrl: "https://paxini.com/cn/dex/gen3",
    integration: text("先确认该型号的在售状态、左右手、法兰、供电和总线版本，再根据控制器周期接入力控和姿态接口。视觉模块、USB Hub 和预设手势应在采购清单中逐项确认，不能仅依据产品页默认包含。", "First confirm current availability, hand side, flange, supply, and bus version, then integrate force and pose control around the controller cycle. Vision modules, USB hub, and preset gestures should be confirmed line by line in the bill of materials rather than assumed from the product page."),
    verification: text("11 项规格来自官网可访问页面，但该型号当前未列入官网主产品导航。20 kg 负载为厂商实验室口径，视觉扩展和多种通信也可能是选配或版本差异；采购前需确认销售状态、配置清单和动态负载曲线。", "The 11 fields come from an accessible official page, but this model is not in the site's current main product navigation. The 20 kg payload is a vendor-laboratory figure, and vision or communication options may vary by configuration; confirm sales status, bill of materials, and dynamic load curves before procurement."),
  },
  {
    id: "deep-paxini-tora-one",
    summary: text("可折叠升降的轮式双臂移动操作机器人，官网参数表公开 17 项整机、手部、视觉、底盘和能源指标。", "A foldable, height-adjustable wheeled dual-arm mobile manipulator with 17 published robot, hand, vision, base, and energy specification fields."),
    overview: [
      text("TORA-ONE 将 21 自由度本体、两只 16 自由度灵巧手、视触觉感知和激光 SLAM 底盘组合为移动操作平台。折叠和伸展高度分别为 1.46 m 与 1.86 m，单臂含手额定平举负载为 5 kg，适合评估需要移动、取放和长时间运行的任务。", "TORA-ONE combines a 21-DoF body, two 16-DoF dexterous hands, visual-tactile sensing, and a LiDAR-SLAM base. Its folded and extended heights are 1.46 m and 1.86 m, and each arm including the hand has a published 5 kg rated horizontal payload for evaluating mobile pick-and-place and extended-duty tasks."),
      text("官网正式参数表共有 17 项，本页逐项保留，包括手部驱动、2,280 个 ITPU 单元、6,840 路触觉信号、7 个相机、底盘定位/越障指标以及 40 Ah 电池、6 小时充电和 8 小时续航。续航与定位结果仍受任务负载、地面、传感器配置和软件版本影响。", "The formal official table contains 17 fields, all retained here, including hand actuation, 2,280 ITPU cells, 6,840 tactile channels, seven cameras, base localization and obstacle figures, a 40 Ah battery, six-hour charging, and eight-hour endurance. Endurance and localization still depend on task load, floor conditions, sensor configuration, and software version."),
    ],
    highlights: [
      highlight("完整视触觉双臂配置", "Complete visual-tactile dual-arm configuration", "双手合计 32 自由度，每只手 16 自由度并采用空心杯电机；手部集成 2,280 个 ITPU 单元和 6,840 路触觉信号。", "The two hands provide 32 DoF in total, each with 16 DoF and coreless-motor actuation; the hands integrate 2,280 ITPU cells and 6,840 tactile channels."),
      highlight("折叠升降与长臂展", "Foldable height and long reach", "本体可在 1.46 m 折叠态与 1.86 m 伸展态之间调整，单臂含手最大长度为 96.5 cm，需结合重心和作业空间验证可达性。", "The body adjusts between 1.46 m folded and 1.86 m extended, with a maximum arm length including hand of 96.5 cm; reachability must be validated with center of mass and workspace constraints."),
      highlight("移动与能源公开指标", "Published mobility and energy figures", "底盘公开速度、到点精度、朝向误差、越障、过隙和爬坡值，并给出 40 Ah、6 小时充电和 8 小时续航。", "The base publishes speed, point-arrival accuracy, heading error, obstacle, gap, and slope figures together with 40 Ah capacity, six-hour charging, and eight-hour endurance."),
    ],
    applications: [text("物流取放、物料搬运与跨工位操作", "Logistics picking, material handling, and cross-station operation"), text("制造、服务和康养场景的移动操作验证", "Mobile-manipulation validation in manufacturing, service, and care settings"), text("遥操作示教、视触觉数据采集与具身任务研究", "Teleoperation demonstration, visual-tactile data capture, and embodied-task research")],
    parameters: [
      metric("身高", "Height", "可折叠结构；腰部折叠态 1.46 m，伸展态 1.86 m", "Foldable structure; 1.46 m at folded waist and 1.86 m extended"),
      metric("本体自由度（不含灵巧手）", "Body DoF (excluding hands)", "21"),
      metric("双手自由度", "Two-hand DoF", "32"),
      metric("手指数量（单手）", "Fingers per hand", "4"),
      metric("灵巧手自由度（单手）", "Dexterous-hand DoF per hand", "16（13 主动 + 3 被动）", "16 (13 active + 3 passive)"),
      metric("灵巧手驱动方式", "Dexterous-hand actuation", "空心杯电机驱动", "Coreless-motor actuation"),
      metric("触觉感知能力", "Tactile sensing", "2,280 个 ITPU 多维触觉传感单元", "2,280 ITPU multidimensional tactile cells"),
      metric("触觉信号数", "Tactile channels", "6,840 路", "6,840"),
      metric("视觉能力", "Vision", "5 个 RGB 相机（头部 3 + 双手各 1）+ 2 个 RGB-D 相机（头部 1 + 底盘 1）", "5 RGB cameras (3 head + 1 per hand) + 2 RGB-D cameras (1 head + 1 base)"),
      metric("手臂重复定位精度", "Arm repeatability", "±0.5 mm"),
      metric("单臂（含灵巧手）平举负载", "Horizontal payload per arm including hand", "额定 5 kg", "Rated 5 kg"),
      metric("单臂（含灵巧手）最大长度", "Maximum arm length including hand", "96.5 cm"),
      metric("底盘规格", "Base specifications", "最大移动速度 0.6 m/s；最大转弯速度 0.4 rad/s；重复到点精度 1.5 cm；绝对到点精度 3 cm；朝向角误差 3°；越障高度 2 cm；过隙宽度 2 cm；爬坡角度 7°", "Max speed 0.6 m/s; max turn rate 0.4 rad/s; repeat point accuracy 1.5 cm; absolute point accuracy 3 cm; heading error 3°; obstacle height 2 cm; gap width 2 cm; slope 7°"),
      metric("导航方式", "Navigation", "激光 SLAM 自主导航", "LiDAR-SLAM autonomous navigation"),
      metric("电池容量", "Battery capacity", "40 Ah"),
      metric("充电时长", "Charging time", "6 h"),
      metric("续航时长", "Endurance", "8 h"),
    ],
    officialUrl: "https://paxini.com/cn/robot",
    integration: text("先用目标任务核对高度、可达空间、单臂负载和底盘通行条件，再确认地图维护、网络、充电策略、遥操作接口、双臂碰撞约束与安全停机。视触觉和关节数据应统一时间基准。", "Validate height, reachable workspace, per-arm payload, and base access against target tasks, then confirm map maintenance, networking, charging strategy, teleoperation interfaces, dual-arm collision constraints, and safe-stop behavior. Visual, tactile, and joint data need a common time base."),
    verification: text("官网正式参数表的 17 项已逐项录入，没有把多个官方字段合并，也未把页面宣传语额外计入参数。5 kg 为单臂含手平举额定值，8 小时续航未在公开页说明测试任务循环；定位、越障和续航应在目标场地复测。", "All 17 fields from the formal official table are recorded individually, without merging official rows or counting marketing copy as extra specifications. The 5 kg figure is the rated horizontal payload per arm including the hand, and the public page does not define the duty cycle for eight-hour endurance; localization, obstacle handling, and endurance require site testing."),
  },
  {
    id: "deep-paxini-tora-double",
    specificationKind: "capabilities",
    summary: text("采用可折叠机身、模块化移动底盘和可选触觉灵巧手的通用操作平台；官网当前以产品族配置和能力为主，未给出固定版完整参数表。", "A general manipulation platform with a foldable body, modular mobile bases, and optional tactile dexterous hands; the current official page presents family configurations and capabilities rather than a fixed-edition specification table."),
    overview: [
      text("TORA-DOUBLE ONE 是产品族级记录。官网展示双舵轮全向底盘和四轮可变形主动越障底盘，并说明可搭配帕西尼多款触觉灵巧手，因此同一名称下可能存在不同底盘、手型、自由度和任务配置。", "TORA-DOUBLE ONE is recorded at product-family level. The official page presents a dual-steer-wheel omnidirectional base and a four-wheel deformable active-obstacle base, together with several PaXini tactile-hand options, so one product name may cover different bases, hands, DoF counts, and task configurations."),
      text("公开能力包括最高 52 个关节自由度、低于 60 cm 的最小折叠高度、NVIDIA Jetson AGX Orin 计算平台、OmniVTLA 模型及 PX-Core 视触觉控制。由于官网没有固定版参数表，本页不补写负载、整机尺寸、重量、速度或续航。", "Published capabilities include up to 52 joint DoF, a minimum folded height below 60 cm, NVIDIA Jetson AGX Orin compute, the OmniVTLA model, and PX-Core visual-tactile control. Because the official page does not provide a fixed-edition table, this record does not invent payload, overall dimensions, mass, speed, or endurance."),
    ],
    highlights: [
      highlight("模块化底盘", "Modular bases", "公开两种移动路线：双舵轮全向移动，以及四轮可变形主动越障；二者的通行能力和控制约束应分别评估。", "Two mobility approaches are published: dual-steer-wheel omnidirectional motion and four-wheel deformable active obstacle handling. Their access and control constraints should be evaluated separately."),
      highlight("折叠与运输", "Folding and transport", "官网给出低于 60 cm 的最小折叠高度，适合进一步评估仓储、运输和低位通过，但未公开完整展开尺寸。", "The official page states a minimum folded height below 60 cm for further evaluation of storage, transport, and low-clearance access, but does not publish complete extended dimensions."),
      highlight("视触觉软件栈", "Visual-tactile software stack", "公开组合包括 OmniVTLA、PX-Core 和 AGX Orin，软件版本、模型许可、训练数据与现场部署边界仍需单独确认。", "The published stack includes OmniVTLA, PX-Core, and AGX Orin; software versions, model licensing, training data, and deployment boundaries require separate confirmation."),
    ],
    applications: [text("工业、商业、餐饮、康养与家庭任务验证", "Task validation in industrial, commercial, dining, care, and home settings"), text("可变形底盘通行和移动操作研究", "Deformable-base access and mobile-manipulation research"), text("视触觉模型、遥操作和数据闭环", "Visual-tactile models, teleoperation, and data loops")],
    parameters: [metric("关节自由度", "Joint DoF", "最高 52", "Up to 52"), metric("最小折叠高度", "Minimum folded height", "<60 cm"), metric("底盘选项", "Base options", "双舵轮全向 / 四轮可变形主动越障", "Dual-steer-wheel omnidirectional / four-wheel deformable active-obstacle"), metric("计算平台", "Compute platform", "NVIDIA Jetson AGX Orin"), metric("具身模型", "Embodied model", "OmniVTLA"), metric("控制系统", "Control system", "PX-Core 视触觉双模态控制", "PX-Core visual-tactile dual-modal control"), metric("手部配置", "Hand configuration", "支持帕西尼多维触觉灵巧手系列", "Supports PaXini multidimensional tactile-hand options")],
    officialUrl: "https://paxini.com/cn/robot/doubleOne",
    integration: text("先锁定底盘、手型和任务配置，再向厂商索取该配置的尺寸、重量、载荷、速度、续航、电气接口和安全说明。不得把不同展示配置的参数拼成一台假想的标准机。", "Lock the base, hand, and task configuration first, then request dimensions, mass, payload, speed, endurance, electrical interfaces, and safety documentation for that exact edition. Do not combine figures from different demonstration configurations into an imaginary standard robot."),
    verification: text("官网当前公开 7 类可结构化配置/能力，但没有完整固定版参数表，因此本页保持产品族层级。自由度使用“最高”口径，底盘和手型是选项；未公开的负载、整机尺寸、质量、速度和续航不填数值。", "The current official page exposes seven structured configuration or capability fields but no complete fixed-edition table, so this record remains family-level. DoF is stated as an upper bound, while base and hand are options; undisclosed payload, dimensions, mass, speed, and endurance remain unfilled."),
  },
  {
    id: "deep-paxini-data-1",
    summary: text("与 PXDex III 物理同构的三指数据采集手套，公开触觉、关节角、双目视觉、腕部定位和寿命等 18 项参数。", "A three-finger data-capture glove physically isomorphic to PXDex III, with 18 published fields covering tactile sensing, joint angles, dual-camera vision, wrist tracking, and life."),
    overview: [
      text("PXCap III 是采集端设备，与执行端 PXDex III 采用 1:1 物理同构设计。操作者通过三指机构采集触觉、关节状态、双掌心相机和腕部定位数据，用于遥操作示教、动作映射和具身数据集建设。", "PXCap III is the capture-side device in a 1:1 physical isomorphism with the PXDex III execution hand. Its three-finger mechanism captures tactile signals, joint state, dual palm-camera images, and wrist tracking for teleoperation demonstrations, action mapping, and embodied datasets."),
      text("官网表格公开 18 项参数，包括 650 g 重量、4 自由度、0.1 N 触觉精度、±0.15° 编码器精度、双 1080p RGB 相机、≤5 mm VR 腕部定位精度和 100 万次空载开合寿命。映射质量仍取决于时间同步、操作者适配和采集端/执行端软件版本。", "The official table publishes 18 fields including 650 g mass, 4 DoF, 0.1 N tactile accuracy, ±0.15° encoder accuracy, dual 1080p RGB cameras, ≤5 mm VR wrist-tracking accuracy, and one million no-load cycles. Mapping quality still depends on timing, operator fit, and capture/execution software versions."),
    ],
    highlights: [
      highlight("采集执行同构", "Capture-execution isomorphism", "PXCap III 与 PXDex III 在结构和感知配置上对应，减少从人手示教到执行器动作映射时的形态差异。", "PXCap III corresponds structurally and perceptually to PXDex III, reducing embodiment mismatch between human demonstration and actuator motion."),
      highlight("触觉、视觉与本体状态", "Tactile, visual, and proprioceptive capture", "设备公开合力、分布力阵列、关节编码和两路 RGB 图像，形成多模态采集入口。", "The device publishes resultant force, distributed-force arrays, joint encoding, and two RGB streams as a multimodal capture input."),
      highlight("腕部空间定位", "Wrist spatial tracking", "默认公开方案使用 VR 头显和手柄，厂商称支持其他定位方案；具体精度和坐标系需按所选定位系统重新标定。", "The published default uses a VR headset and controller, while other tracking schemes are stated as supported; accuracy and coordinate frames require calibration for the chosen tracker."),
    ],
    applications: [text("遥操作示教和三指抓取数据采集", "Teleoperation demonstrations and three-finger grasp data capture"), text("PXCap III 到 PXDex III 的同构动作映射", "Isomorphic action mapping from PXCap III to PXDex III"), text("视触觉与本体感知数据集建设", "Visual-tactile and proprioceptive dataset creation")],
    parameters: [
      metric("重量", "Mass", "650 g"), metric("自由度", "Degrees of freedom", "4"), metric("触觉传感器", "Tactile sensor", "帕西尼六维霍尔阵列传感器", "PaXini six-axis Hall-array sensor"), metric("触觉力精度", "Tactile-force accuracy", "0.1 N"), metric("触觉数据", "Tactile data", "合力 / 分布力阵列", "Resultant force / distributed-force array"), metric("关节角度传感", "Joint-angle sensing", "自研高精度抗磁编码器", "In-house high-precision magnetically resistant encoder"), metric("编码器精度", "Encoder accuracy", "±0.15°"), metric("相机", "Cameras", "RGB ×2"), metric("视场角", "Field of view", "D170°"), metric("分辨率", "Camera resolution", "1080p"), metric("帧率", "Frame rate", "30 fps"), metric("最大抓握直径", "Maximum grip diameter", "55 mm"), metric("最小捏取尺寸", "Minimum pinch size", "2 mm"), metric("供电", "Power", "12 VDC"), metric("腕部定位", "Wrist tracking", "VR 头显 + 手柄；支持其他方案", "VR headset + controller; other schemes supported"), metric("腕部定位精度", "Wrist-tracking accuracy", "≤5 mm（VR 方案）", "≤5 mm (VR scheme)"), metric("空载开合寿命", "No-load cycle life", "100 万次", "1 million cycles"), metric("通信", "Communication", "USB"),
    ],
    officialUrl: "https://paxini.com/cn/ax/pxcap3",
    integration: text("采集系统需统一 PXCap III、腕部定位、相机、触觉和执行端时钟，记录标定版本与坐标变换。操作者手型、佩戴位置、关节零点和疲劳都应进入数据质量检查。", "The capture system needs a common clock across PXCap III, wrist tracking, cameras, tactile sensing, and the execution hand, with calibration revisions and coordinate transforms recorded. Operator hand size, fit, joint zero, and fatigue should be part of data-quality checks."),
    verification: text("18 项参数按官方产品表逐项录入。0.1 N、±0.15°、≤5 mm 和寿命值为厂商公开口径；其中腕部定位精度明确对应 VR 方案，其他定位方案不能沿用该值。100 万次为无负载开合寿命，不代表有载任务寿命。", "All 18 fields follow the official table. The 0.1 N, ±0.15°, ≤5 mm, and life figures are vendor-published; wrist accuracy explicitly applies to the VR scheme and should not be reused for other trackers. One million cycles is a no-load figure, not loaded task life."),
  },
  {
    id: "deep-paxini-data-2",
    summary: text("与 PXCap III 同构的三指执行末端，集成六维触觉、关节编码、双掌心相机和 5 kg 最大抓握负载。", "A three-finger execution end effector isomorphic to PXCap III, integrating six-axis tactile sensing, joint encoding, dual palm cameras, and a 5 kg maximum grasp load."),
    overview: [
      text("PXDex III 是 PXCap III 采集体系对应的执行端。官网公开 18 项参数，硬件包括三指 4 自由度机构、六维霍尔阵列触觉、自研关节编码器、两路 RGB 相机和空心杯电机，并提供 EtherCAT、Modbus 与 USB 通信。", "PXDex III is the execution-side counterpart to the PXCap III capture system. The official page publishes 18 fields covering a three-finger 4-DoF mechanism, six-axis Hall-array tactile sensing, in-house joint encoders, dual RGB cameras, coreless motors, and EtherCAT, Modbus, and USB communications."),
      text("最大抓握负载为 5 kg，最大抓握直径 55 mm，最小捏取尺寸 2 mm。这些边界适合做初步对象筛选，但实际抓取还受物体摩擦、指尖接触、姿态、速度与安全系数影响。", "The published maximum grasp load is 5 kg, maximum grip diameter 55 mm, and minimum pinch size 2 mm. These boundaries support preliminary object screening, while actual grasping depends on friction, fingertip contact, pose, speed, and safety margin."),
    ],
    highlights: [
      highlight("同构动作复现", "Isomorphic action replay", "与 PXCap III 的 1:1 物理同构用于降低示教映射复杂度，但仍需处理操作者、安装坐标系和控制延迟差异。", "The 1:1 physical isomorphism with PXCap III reduces demonstration-mapping complexity, while operator, mounting-frame, and latency differences still require handling."),
      highlight("末端多模态感知", "Multimodal end-effector sensing", "公开配置把分布触觉、关节角和双掌心视觉集成在执行端，可为抓取闭环和数据记录提供同步输入。", "The published configuration combines distributed tactile sensing, joint angles, and dual palm vision at the end effector for grasp feedback and synchronized logging."),
      highlight("工业总线接口", "Industrial bus interfaces", "EtherCAT、Modbus 和 USB 面向实时控制与调试两类连接场景，具体周期、对象字典和 SDK 版本需确认。", "EtherCAT, Modbus, and USB address real-time control and debugging connections; confirm cycle time, object dictionary, and SDK revision."),
    ],
    applications: [text("遥操作执行和示教数据复现", "Teleoperated execution and demonstration replay"), text("物流、装配与精细三指抓取", "Logistics, assembly, and precision three-finger grasping"), text("视触觉控制和抓取数据采集", "Visual-tactile control and grasp-data capture")],
    parameters: [
      metric("重量", "Mass", "836 g"), metric("自由度", "Degrees of freedom", "4"), metric("触觉传感器", "Tactile sensor", "帕西尼六维霍尔阵列传感器", "PaXini six-axis Hall-array sensor"), metric("触觉力精度", "Tactile-force accuracy", "0.1 N"), metric("触觉数据", "Tactile data", "合力 / 分布力阵列", "Resultant force / distributed-force array"), metric("关节角度传感", "Joint-angle sensing", "自研高精度抗磁编码器", "In-house high-precision magnetically resistant encoder"), metric("编码器精度", "Encoder accuracy", "±0.15°"), metric("相机", "Cameras", "RGB ×2"), metric("视场角", "Field of view", "D170°"), metric("分辨率", "Camera resolution", "1080p"), metric("帧率", "Frame rate", "30 fps"), metric("最大抓握直径", "Maximum grip diameter", "55 mm"), metric("最小捏取尺寸", "Minimum pinch size", "2 mm"), metric("供电", "Power", "19–48 VDC"), metric("驱动方式", "Actuation", "空心杯电机", "Coreless motors"), metric("最大抓握负载", "Maximum grasp load", "5 kg"), metric("空载开合寿命", "No-load cycle life", "100 万次", "1 million cycles"), metric("通信", "Communication", "EtherCAT / Modbus / USB"),
    ],
    officialUrl: "https://paxini.com/cn/ax/pxdex3",
    integration: text("核对左右手、法兰、供电与总线版本，完成关节零点、触觉标定和双相机外参。与 PXCap III 联用时还需锁定采集端、执行端和映射软件的兼容版本，并测量端到端延迟。", "Confirm hand side, flange, supply, and bus version, then calibrate joint zero, tactile sensing, and dual-camera extrinsics. When paired with PXCap III, lock compatible capture, execution, and mapping software versions and measure end-to-end latency."),
    verification: text("18 项参数按官方产品表逐项录入，直接资料入口指向 PXDex III 独立产品页，不再使用商城或通用目录。5 kg 为最大抓握负载，100 万次为无负载开合寿命；有载寿命、姿态相关负载和通信实时性仍需测试。", "All 18 fields follow the official table, and the direct source now points to the dedicated PXDex III product page rather than a store or general catalog. The 5 kg figure is maximum grasp load and one million cycles is no-load life; loaded life, pose-dependent payload, and communication real-time behavior still require testing."),
  },
  {
    id: "deep-paxini-data-3",
    summary: text("五指 17 自由度具身数据采集手套，集成多维触觉、17 个关节编码器、掌心 RGB 相机和腕部空间定位。", "A five-finger, 17-DoF embodied-data capture glove integrating multidimensional tactile sensing, 17 joint encoders, a palm RGB camera, and spatial wrist tracking."),
    overview: [
      text("PXCap Pro 面向五指人手操作示教。官网参数表公开 17 项，从 325 g 重量、17 自由度、触觉与编码器精度，到 1080p 掌心相机、90 mm 最大抓握直径、VR 腕部定位和 USB 通信。", "PXCap Pro targets five-finger human manipulation demonstrations. Its official table publishes 17 fields from 325 g mass, 17 DoF, tactile and encoder accuracy to a 1080p palm camera, 90 mm maximum grip diameter, VR wrist tracking, and USB communication."),
      text("官网特性部分还公开 1,743 路触觉信号、17 个直径 6.5 mm 的编码器、全局曝光相机和小于 0.2° 的抗磁干扰描述。这些能力作为核心特性展示，但不额外改变正式参数表的 17 项计数。", "The feature section also states 1,743 tactile channels, 17 encoders with 6.5 mm diameter, global-shutter imaging, and a magnetic-interference figure below 0.2°. These appear as core capabilities without changing the formal table's 17-field count."),
    ],
    highlights: [
      highlight("五指 17 自由度采集", "Five-finger 17-DoF capture", "17 个关节编码器对应手部姿态采集，公开编码器精度为 ±0.15°，用于构建细粒度手指动作记录。", "Seventeen joint encoders capture hand pose with a published ±0.15° accuracy for fine-grained finger-motion records."),
      highlight("多维触觉输入", "Multidimensional tactile input", "官网特性页给出 1,743 路触觉信号，正式参数表同时说明可输出合力与分布力阵列。", "The feature page states 1,743 tactile channels, while the formal table specifies resultant-force and distributed-force-array outputs."),
      highlight("掌心视觉与腕部定位", "Palm vision and wrist tracking", "单路 1080p、30 fps RGB 相机配合腕部空间定位，便于记录对象、手部和轨迹关系；坐标系和同步仍需系统级标定。", "A 1080p, 30 fps RGB camera combines with spatial wrist tracking to record object, hand, and trajectory relationships; coordinate frames and timing still require system-level calibration."),
    ],
    applications: [text("五指遥操作示教与动作数据采集", "Five-finger teleoperation demonstration and motion capture"), text("具身模型训练的触觉、视觉与本体数据记录", "Tactile, visual, and proprioceptive logging for embodied-model training"), text("多指抓取和精细操作数据集建设", "Dataset creation for multi-finger grasping and fine manipulation")],
    parameters: [
      metric("重量", "Mass", "325 g"), metric("自由度", "Degrees of freedom", "17"), metric("触觉传感器", "Tactile sensor", "多维阵列传感器", "Multidimensional array sensor"), metric("触觉传感器精度", "Tactile-sensor accuracy", "0.1 N（厂商实验室）", "0.1 N (vendor laboratory)"), metric("触觉数据", "Tactile data", "合力 / 分布力阵列", "Resultant force / distributed-force array"), metric("关节角度传感器", "Joint-angle sensor", "自研高精度编码器", "In-house high-precision encoder"), metric("编码器精度", "Encoder accuracy", "±0.15°"), metric("相机", "Camera", "RGB ×1"), metric("视场角", "Field of view", "D160°"), metric("分辨率", "Camera resolution", "1080p"), metric("帧率", "Frame rate", "30 fps"), metric("最大抓握直径", "Maximum grip diameter", "90 mm"), metric("最小捏取尺寸", "Minimum pinch size", "2 mm"), metric("供电", "Power", "12 VDC"), metric("腕部定位", "Wrist tracking", "VR 头显 + 手柄；支持其他方案", "VR headset + controller; other schemes supported"), metric("腕部定位精度", "Wrist-tracking accuracy", "≤5 mm（VR 方案）", "≤5 mm (VR scheme)"), metric("通信", "Communication", "USB"),
    ],
    officialUrl: "https://paxini.com/cn/ax/pxcapProp",
    integration: text("先完成手套尺寸和佩戴位置适配，再标定 17 个关节零点、触觉、掌心相机、腕部定位和时间同步。数据管线应记录操作者、设备序列号、标定版本、丢帧和异常值。", "Fit glove size and wearing position first, then calibrate all 17 joint zeros, tactile sensing, palm camera, wrist tracking, and timing. The data pipeline should record operator, device serial number, calibration revision, dropped frames, and outliers."),
    verification: text("17 项参数按官网正式表格逐项录入。官网同页对相机视场角出现 D160° 与 165° 两种表述，本页以参数表的 D160° 为准并保留这一差异提示；0.1 N 与腕部定位精度为厂商公开口径。", "All 17 fields follow the formal official table. The same page uses both D160° and 165° for camera field of view; this record follows the table's D160° value and preserves the discrepancy note. The 0.1 N and wrist-tracking accuracy figures are vendor-published."),
  },
  {
    id: "deep-paxini-data-4",
    specificationKind: "capabilities",
    summary: text("面向具身智能训练的数据平台，公开覆盖六类模态、三类采集来源、15+N 场景和从治理到训练部署的工具链。", "An embodied-intelligence data platform publishing six modalities, three collection sources, 15+N scenarios, and a toolchain from governance through training and deployment."),
    overview: [
      text("OmniSharing DB 不是单一硬件型号，而是帕西尼公开的数据与工具平台。官方独立站描述的数据模态包括触觉、多视角视觉、语音、文本、本体感知与空间轨迹，采集来源包括人类采集、遥操作和仿真。", "OmniSharing DB is not a single hardware model but PaXini's public data and tooling platform. Its official standalone site describes tactile, multi-view vision, speech, text, proprioception, and spatial trajectories collected through human capture, teleoperation, and simulation."),
      text("平台页面还说明覆盖 15+N 场景，并列出办公、家庭、物流、教育、娱乐、养老、医疗、康复、商业、零售、3C 制造、餐饮、农业、灾害救援、汽车制造和工业等方向。公开介绍没有披露数据规模、许可价格、样本分布和任务成功率，因此这些项目必须在使用前单独核验。", "The platform states coverage of 15+N scenarios and names office, home, logistics, education, entertainment, eldercare, medical, rehabilitation, commercial, retail, 3C manufacturing, dining, agriculture, disaster response, automotive manufacturing, and industrial domains. Public material does not disclose dataset scale, license pricing, sample distribution, or task success rates, which must be evaluated before use."),
    ],
    highlights: [
      highlight("六类数据模态", "Six data modalities", "触觉、多视角视觉、语音、文本、本体感知和空间轨迹用于描述接触、环境、指令、机器人状态与运动路径。", "Tactile, multi-view vision, speech, text, proprioception, and spatial trajectories represent contact, environment, instructions, robot state, and motion paths."),
      highlight("采集与治理闭环", "Capture and governance loop", "公开流程包括系统标定、实时监控、审核、高精度时间戳、检测以及监控、分析、处理和反馈。", "The published flow includes system calibration, real-time monitoring, review, high-precision timestamps, detection, and a monitor-analyze-process-feedback loop."),
      highlight("训练与部署工具", "Training and deployment tools", "平台公开数据预处理、清洗、标准化、模型训练、Python/ROS SDK 和部署环节，但具体可用接口与许可需登录或商务确认。", "The platform publishes preprocessing, cleaning, standardization, model training, Python/ROS SDKs, and deployment stages, while actual access and licensing require account or commercial confirmation."),
    ],
    applications: [text("家庭、办公、物流和工业具身任务数据", "Embodied-task data for home, office, logistics, and industry"), text("模型训练、评测、数据治理和跨本体复用", "Model training, evaluation, data governance, and cross-embodiment reuse"), text("遥操作、仿真和人类示教数据汇聚", "Aggregation of teleoperation, simulation, and human-demonstration data")],
    parameters: [
      metric("数据模态", "Data modalities", "触觉 / 多视角视觉 / 语音 / 文本 / 本体感知 / 空间轨迹", "Tactile / multi-view vision / speech / text / proprioception / spatial trajectories"), metric("采集来源", "Collection sources", "人类采集 / 遥操作 / 仿真", "Human capture / teleoperation / simulation"), metric("公开场景规模", "Published scenario scope", "15+N 场景", "15+N scenarios"), metric("公开场景", "Published domains", "办公 / 家庭 / 物流 / 教育 / 娱乐 / 养老 / 医疗 / 康复 / 商业 / 零售 / 3C 制造 / 餐饮 / 农业 / 灾害救援 / 汽车制造 / 工业", "Office / home / logistics / education / entertainment / eldercare / medical / rehabilitation / commercial / retail / 3C manufacturing / dining / agriculture / disaster response / automotive manufacturing / industrial"), metric("数据治理", "Data governance", "系统标定 / 实时监控 / 审核 / 高精度时间戳 / 数据检测", "System calibration / real-time monitoring / review / high-precision timestamps / data detection"), metric("处理工具", "Processing tools", "预处理 / 清洗 / 标准化", "Preprocessing / cleaning / standardization"), metric("开发接口", "Developer interfaces", "Python / ROS 等 SDK", "Python / ROS and other SDKs"), metric("使用链路", "Usage workflow", "数据采集到模型训练与部署", "Data capture through model training and deployment"),
    ],
    officialUrl: "https://omnisharingdb.paxini.com/home",
    integration: text("在接入前确认数据许可、下载/API 方式、采集设备和机器人构型、坐标系、时间戳、标注定义、版本管理及隐私合规。训练评估应按任务、场景和本体拆分数据，防止泄漏和分布混淆。", "Before integration, confirm data license, download or API access, capture devices and embodiments, coordinate frames, timestamps, annotation definitions, versioning, and privacy compliance. Training evaluation should split data by task, scenario, and embodiment to prevent leakage and distribution confusion."),
    verification: text("该产品为平台级记录，8 项内容来自官方独立站的能力与流程说明，不是传统硬件规格。官网未公开完整数据规模、样本分布、许可价格、基准结果或客户可访问范围，本页不据此推断训练效果或商业可用性。", "This is a platform-level record. Its eight fields come from the official standalone site's capability and workflow descriptions rather than hardware specifications. The public site does not disclose complete dataset scale, sample distribution, license pricing, benchmark results, or customer access scope, so this record does not infer training performance or commercial availability."),
  },
];

const expectedParameterCounts: Record<string, number> = {
  "deep-paxini-gen4": 22,
  "deep-paxini-gen3": 20,
  "deep-paxini-px3q": 14,
  "deep-paxini-px6d": 14,
  "deep-paxini-footrix": 10,
  "deep-paxini-dexh13": 13,
  "deep-paxini-gmh18": 11,
  "deep-paxini-tora-one": 17,
  "deep-paxini-tora-double": 7,
  "deep-paxini-data-1": 18,
  "deep-paxini-data-2": 18,
  "deep-paxini-data-3": 17,
  "deep-paxini-data-4": 8,
};

const expectedOfficialUrls: Record<string, string> = {
  "deep-paxini-gen4": "https://paxini.com/cn/ax/gen4",
  "deep-paxini-gen3": "https://paxini.com/cn/ax/gen3",
  "deep-paxini-px3q": "https://paxini.com/cn/ax/torque",
  "deep-paxini-px6d": "https://paxini.com/cn/ax/6d",
  "deep-paxini-footrix": "https://paxini.com/cn/ax/footrix",
  "deep-paxini-dexh13": "https://paxini.com/cn/dex/gen2",
  "deep-paxini-gmh18": "https://paxini.com/cn/dex/gen3",
  "deep-paxini-tora-one": "https://paxini.com/cn/robot",
  "deep-paxini-tora-double": "https://paxini.com/cn/robot/doubleOne",
  "deep-paxini-data-1": "https://paxini.com/cn/ax/pxcap3",
  "deep-paxini-data-2": "https://paxini.com/cn/ax/pxdex3",
  "deep-paxini-data-3": "https://paxini.com/cn/ax/pxcapProp",
  "deep-paxini-data-4": "https://omnisharingdb.paxini.com/home",
};

for (const product of paxiniProductContent) {
  const expected = expectedParameterCounts[product.id];
  if (expected === undefined || product.parameters.length !== expected) {
    throw new Error(`PaXini parameter audit failed for ${product.id}: ${product.parameters.length}/${expected ?? "missing"}`);
  }
  if (product.officialUrl !== expectedOfficialUrls[product.id]) {
    throw new Error(`PaXini official URL audit failed for ${product.id}: ${product.officialUrl}`);
  }
}

if (paxiniProductContent.length !== Object.keys(expectedParameterCounts).length) {
  throw new Error(`PaXini product audit failed: ${paxiniProductContent.length}/${Object.keys(expectedParameterCounts).length}`);
}
