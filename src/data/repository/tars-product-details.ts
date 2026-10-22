type Text = { zh: string; en: string };
type Metric = { label: Text; value: Text };
type Highlight = { title: Text; detail: Text };

export type TarsProductContent = {
  id: string;
  summary: Text;
  overview: Text[];
  highlights: Highlight[];
  applications: Text[];
  parameters: Metric[];
  officialUrl: string;
  specificationKind: "capabilities";
  integration: Text;
  verification: Text;
};

const text = (zh: string, en: string): Text => ({ zh, en });
const metric = (zh: string, en: string, valueZh: string, valueEn = valueZh): Metric => ({ label: text(zh, en), value: text(valueZh, valueEn) });
const highlight = (zh: string, en: string, detailZh: string, detailEn: string): Highlight => ({ title: text(zh, en), detail: text(detailZh, detailEn) });

const integration = text(
  "当前公开资料不足以完成型号采购。接入前应向厂商取得对应硬件版本的尺寸、质量、负载、自由度、关节性能、供电、通信、SDK、接口权限、安全、可靠性和交付清单，并以目标任务数据和样机测试闭环。",
  "Current public material is insufficient for model procurement. Before integration, obtain version-specific dimensions, mass, payload, DoF, joint performance, power, communication, SDK and interface rights, safety, reliability, and delivery scope, then close the decision with target-task data and sample testing.",
);

export const tarsProductContent: TarsProductContent[] = [
  {
    id: "deep-tars-t1",
    summary: text("它石智航公开的 T 系列双足通用机器人整机方向；不是可独立采购的腿部模块。", "TARS Robotics' public T-series direction is a complete biped general-purpose robot, not a separately procurable leg module."),
    overview: [text("T1 在公司公开材料中以双足通用机器人平台出现，面向具身操作和工业任务研发。", "T1 appears in company material as a biped general-purpose robot platform for embodied manipulation and industrial-task R&D."), text("当前官网没有可核验的型号级参数表、手册或下载包。页面因此只记录已公开定位，不推测身高、质量、自由度、负载、速度、续航或计算平台。", "No verifiable model-level table, manual, or download package is currently public. This page therefore records only disclosed positioning and does not infer height, mass, DoF, payload, speed, endurance, or compute.")],
    highlights: [highlight("产品边界", "Product boundary", "完整双足机器人平台，不是独立腿部组件。", "A complete biped robot platform, not a standalone leg component."), highlight("公开方向", "Published direction", "通用操作与工业任务研发。", "General manipulation and industrial-task R&D."), highlight("资料边界", "Evidence boundary", "未找到型号级正式参数表。", "No model-level formal specification table was found.")],
    applications: [text("通用操作研发", "General manipulation R&D"), text("工业任务验证", "Industrial-task validation")],
    parameters: [metric("产品形态", "Form", "双足人形整机", "Complete biped humanoid"), metric("产品层级", "Product level", "机器人平台", "Robot platform"), metric("公开阶段", "Public stage", "公开展示/发布材料", "Public demonstration/launch material"), metric("正式参数表", "Formal specification table", "未公开", "Not public")],
    officialUrl: "https://www.tars-ai.com/",
    specificationKind: "capabilities",
    integration,
    verification: text("仅保留公司公开定位。没有把媒体画面比例、同类机器人或 A 系列信息套用到 T1。", "Only company-published positioning is retained. No dimensions from imagery, peer robots, or A-series material are transferred to T1."),
  },
  {
    id: "deep-tars-a1",
    summary: text("轮式移动双臂操作平台，公开案例包括精细线束装配。", "A wheeled mobile dual-arm manipulation platform publicly demonstrated on fine harness assembly."),
    overview: [text("A1 属于 A 系列轮式操作机器人方向，公开演示把移动底盘与双臂操作组合，用于精细工业操作。", "A1 belongs to the A-series wheeled manipulation direction, combining a mobile base and dual-arm operation for fine industrial tasks."), text("“亚毫米级线束装配”是公开演示的任务描述，不等于通用重复定位精度。官网尚未提供可核验的整机参数表。", "The public 'sub-millimeter harness assembly' wording describes a demonstrated task and is not a general repeatability specification. No verifiable system table is currently published.")],
    highlights: [highlight("系统形态", "System form", "轮式移动底盘与双臂操作。", "Wheeled mobile base with dual-arm manipulation."), highlight("公开任务", "Published task", "精细线束装配演示。", "Fine harness-assembly demonstration."), highlight("解读限制", "Interpretation limit", "任务精度不能替代机械臂重复定位精度。", "Task-level accuracy does not establish arm repeatability.")],
    applications: [text("线束与精密装配验证", "Harness and precision-assembly validation"), text("移动操作研究", "Mobile-manipulation research")],
    parameters: [metric("产品形态", "Form", "轮式移动双臂机器人", "Wheeled mobile dual-arm robot"), metric("公开任务", "Published task", "精细/亚毫米级线束装配演示", "Fine/sub-millimeter harness-assembly demonstration"), metric("产品层级", "Product level", "完整操作平台", "Complete manipulation platform"), metric("正式参数表", "Formal specification table", "未公开", "Not public")],
    officialUrl: "https://www.tars-ai.com/",
    specificationKind: "capabilities",
    integration,
    verification: text("公开任务描述与硬件精度指标分开记录；没有从演示结果反推负载、重复定位或节拍。", "The published task statement is separated from hardware-accuracy metrics; payload, repeatability, and cycle time are not inferred from the demonstration."),
  },
  {
    id: "deep-tars-awe3",
    summary: text("公司公开的 AWE 3.0 通用具身模型方向，面向感知、推理和动作生成。", "AWE 3.0 is the company's public general embodied-model direction for perception, reasoning, and action generation."),
    overview: [text("AWE 3.0 被公司描述为通用具身模型路线，用于把多模态感知、任务理解和机器人动作连接起来。", "The company describes AWE 3.0 as a general embodied-model path connecting multimodal perception, task understanding, and robot action."), text("当前可核验的官方 GitHub 与 Hugging Face 组织没有公开 AWE 3.0 权重、模型卡、训练数据清单、评测分数或商用许可，因此本页不把它写成可下载模型。", "The verifiable official GitHub and Hugging Face organizations currently publish no AWE 3.0 weights, model card, training-data inventory, benchmark scores, or commercial license, so this page does not present it as a downloadable model.")],
    highlights: [highlight("模型方向", "Model direction", "感知、推理与动作生成。", "Perception, reasoning, and action generation."), highlight("公开版本", "Published version", "AWE 3.0。", "AWE 3.0."), highlight("可用性", "Availability", "未发现公开权重或模型卡。", "No public weights or model card were found.")],
    applications: [text("具身策略研究", "Embodied-policy research"), text("任务泛化与动作生成研究", "Task-generalization and action-generation research")],
    parameters: [metric("资产类型", "Asset type", "通用具身模型方向", "General embodied-model direction"), metric("版本", "Version", "3.0", "3.0"), metric("能力范围", "Capability scope", "多模态感知、推理、动作生成", "Multimodal perception, reasoning, and action generation"), metric("公开权重", "Public weights", "未发现", "Not found"), metric("模型卡/评测", "Model card/benchmarks", "未发现", "Not found"), metric("许可", "License", "未公开", "Not public")],
    officialUrl: "https://www.tars-ai.com/",
    specificationKind: "capabilities",
    integration,
    verification: text("依据公司公开定位，并用官方 GitHub/Hugging Face 组织核对可下载状态；没有将数据集条目误写为模型权重。", "Based on company positioning and checked against official GitHub/Hugging Face availability; dataset entries are not misrepresented as model weights."),
  },
  {
    id: "deep-tars-omnivta",
    summary: text("视觉—触觉联合数据与研究资产；官方 Hugging Face 当前公开数据集和样例，不公开模型权重。", "A vision-tactile joint data and research asset; the official Hugging Face organization currently publishes datasets and samples, not model weights."),
    overview: [text("OmniVitac/OmniVTA 方向用于联合记录和研究视觉与触觉信息，适合接触操作、触觉预测和多模态表征工作。", "The OmniVitac/OmniVTA direction jointly records and studies vision and touch for contact manipulation, tactile prediction, and multimodal representation."), text("官方 Hugging Face 组织列出 OmniVitac 与 OmniVitac_Samples 数据集，同时显示公开模型数量为 0。页面因此把它归为研究数据资产，而不是已发布权重的世界模型。", "The official Hugging Face organization lists OmniVitac and OmniVitac_Samples datasets while showing zero public models. It is therefore classified here as a research data asset rather than a world model with released weights.")],
    highlights: [highlight("模态", "Modalities", "视觉与触觉。", "Vision and touch."), highlight("公开形态", "Public form", "Hugging Face 数据集与样例。", "Hugging Face datasets and samples."), highlight("模型状态", "Model status", "官方组织当前无公开模型权重。", "The official organization currently has no public model weights.")],
    applications: [text("视觉—触觉表征研究", "Vision-tactile representation research"), text("接触操作与触觉预测", "Contact manipulation and tactile prediction")],
    parameters: [metric("资产类型", "Asset type", "研究数据集/样例", "Research datasets/samples"), metric("输入模态", "Modalities", "视觉 + 触觉", "Vision + tactile"), metric("公开数据集", "Published datasets", "OmniVitac、OmniVitac_Samples", "OmniVitac and OmniVitac_Samples"), metric("托管平台", "Hosting", "Hugging Face", "Hugging Face"), metric("公开模型数量", "Public model count", "0（官方组织当前页面）", "0 on the current official organization page"), metric("模型权重", "Model weights", "未公开", "Not public")],
    officialUrl: "https://huggingface.co/tars-robotics",
    specificationKind: "capabilities",
    integration,
    verification: text("名称存在 OmniVTA 与 OmniVitac 两种公开写法；本页保留现有产品名，并明确当前可核验对象是官方数据集。", "Both OmniVTA and OmniVitac spellings appear publicly. This page retains the existing product name while making clear that the verifiable assets are official datasets."),
  },
  {
    id: "deep-tars-sensehub",
    summary: text("World In Your Hands 数据生态使用的可穿戴多模态采集方向，覆盖胸前和手部视角、手部状态与动作标注。", "The wearable multimodal capture direction behind World In Your Hands, spanning chest and hand viewpoints, hand states, and action annotations."),
    overview: [text("官方 WIYH 资料描述一种以人为中心的野外灵巧操作采集体系，数据包含胸前与手部鱼眼相机、末端位姿、人体运动、手部状态、抓取状态、任务和子任务标注。", "Official WIYH material describes a human-centric in-the-wild dexterous-manipulation capture system with chest- and hand-mounted fisheye cameras, end-effector poses, ego-motion, hand and grasp states, tasks, and subtask annotations."), text("当前 Hugging Face 完整数据约 36.5 TB，按公寓、宴会、烛光、酒店、洗衣、物流、办公室和超市场景组织。GitHub 计划项曾写约 1,000 小时/约 30 TB，两者时间点和统计口径不同，不能互相替代。", "The current Hugging Face dataset is about 36.5 TB and organized into Apartment, Banquet, Candlelight, Hotel, Laundry, Logistics, Office, and Supermarket scenes. An earlier GitHub plan stated about 1,000 hours/about 30 TB; the dates and accounting differ and should not be treated as identical."),
    ],
    highlights: [highlight("采集视角", "Capture views", "胸前与手部鱼眼相机。", "Chest- and hand-mounted fisheye cameras."), highlight("数据规模", "Dataset scale", "当前官方 Hugging Face 目录约 36.5 TB。", "About 36.5 TB in the current official Hugging Face tree."), highlight("使用边界", "Use boundary", "数据与代码许可需分别以对应仓库页面为准。", "Dataset and code licenses must be checked on their respective repository pages.")],
    applications: [text("人类中心灵巧操作数据采集", "Human-centric dexterous-manipulation data capture"), text("模仿学习与世界模型研究", "Imitation learning and world-model research")],
    parameters: [metric("资产类型", "Asset type", "可穿戴采集系统与数据生态", "Wearable capture system and data ecosystem"), metric("相机视角", "Camera views", "胸前鱼眼 + 手部鱼眼", "Chest fisheye + hand fisheye"), metric("记录内容", "Recorded content", "多相机图像、末端位姿、自运动、手部/抓取状态", "Multi-camera images, end-effector poses, ego-motion, hand/grasp states"), metric("标注", "Annotations", "任务、子任务分段及状态等", "Tasks, subtask segmentation, status, and related annotations"), metric("当前公开数据规模", "Current public dataset size", "约 36.5 TB", "About 36.5 TB"), metric("早期计划口径", "Earlier planned scale", "约 1,000 小时 / 约 30 TB", "About 1,000 hours / about 30 TB"), metric("场景数量", "Scene groups", "8", "8"), metric("场景", "Scenes", "公寓、宴会、烛光、酒店、洗衣、物流、办公室、超市", "Apartment, Banquet, Candlelight, Hotel, Laundry, Logistics, Office, Supermarket"), metric("数据版本", "Dataset version", "1.0.0（Croissant 元数据）", "1.0.0 in Croissant metadata"), metric("数据许可", "Dataset license", "CC BY-NC 4.0（Hugging Face 数据卡）", "CC BY-NC 4.0 on the Hugging Face dataset card"), metric("开发工具", "Devkit", "Python 3 / HDF5 读取与可视化工具", "Python 3 / HDF5 reading and visualization tools")],
    officialUrl: "https://wiyh.tars-ai.com/",
    specificationKind: "capabilities",
    integration,
    verification: text("36.5 TB 来自当前官方 Hugging Face 文件树；约 1,000 小时/30 TB 来自官方 GitHub 计划项。两组数字并列保留并说明口径差异。", "36.5 TB comes from the current official Hugging Face tree; about 1,000 hours/30 TB comes from an official GitHub plan item. Both are retained with their scope difference."),
  },
  {
    id: "deep-tars-effector-1",
    summary: text("公司公开材料提及的 21 自由度灵巧手方向；当前未找到可核验的独立型号页。", "A 21-DoF dexterous-hand direction named in company material; no verifiable independent model page was found."),
    overview: [text("公开材料确认该末端硬件为多指灵巧手，并给出 21 自由度。", "Public material identifies the end effector as a multi-finger dexterous hand and states 21 DoF."), text("自由度的主动/被动构成、驱动、传动、力、速度、重复精度、触觉、质量、供电、接口和寿命均未形成公开规格表。", "The active/passive DoF split, actuation, transmission, force, speed, repeatability, tactile sensing, mass, power, interfaces, and life are not available in a public table.")],
    highlights: [highlight("公开指标", "Published metric", "21 自由度。", "21 DoF."), highlight("产品方向", "Product direction", "多指灵巧手。", "Multi-finger dexterous hand."), highlight("采购状态", "Procurement status", "缺少独立型号级资料。", "Independent model-level documentation is absent.")],
    applications: [text("精密操作与数据采集研究", "Precision manipulation and data-capture research")],
    parameters: [metric("产品形态", "Form", "多指灵巧手", "Multi-finger dexterous hand"), metric("自由度", "DoF", "21", "21"), metric("产品层级", "Product level", "公开硬件方向", "Published hardware direction"), metric("正式参数表", "Formal specification table", "未公开", "Not public")],
    officialUrl: "https://www.tars-ai.com/",
    specificationKind: "capabilities",
    integration,
    verification: text("只记录公开的 21 自由度，不推断手指数、驱动自由度或触觉配置。", "Only the published 21 DoF is recorded; finger count, actuated DoF, and tactile configuration are not inferred."),
  },
  ...[
    { id: "deep-tars-effector-2", nameZh: "两指末端执行器", nameEn: "Two-Finger End Effector", count: "2" },
    { id: "deep-tars-effector-3", nameZh: "三指末端执行器", nameEn: "Three-Finger End Effector", count: "3" },
  ].map<TarsProductContent>((item) => ({
    id: item.id,
    summary: text(`${item.nameZh}是公司公开材料中出现的专用末端硬件，当前未找到独立型号页。`, `${item.nameEn} is a dedicated end-effector direction shown in company material; no independent model page was found.`),
    overview: [text(`公开资料可确认其为${item.nameZh}方向。`, `Public material confirms a ${item.nameEn.toLowerCase()} direction.`), text("官网没有公开驱动、行程、抓力、负载、速度、重复精度、质量、尺寸、供电、接口、寿命或防护等级。", "Actuation, stroke, grip force, payload, speed, repeatability, mass, dimensions, power, interfaces, life, and ingress protection are not published.")],
    highlights: [highlight("结构", "Structure", `${item.count} 指末端执行器。`, `${item.count}-finger end effector.`), highlight("资料状态", "Evidence status", "产品方向可确认，型号和参数未披露。", "Product direction is confirmed; model and specifications are undisclosed."), highlight("选型要求", "Selection requirement", "需要正式料号、图纸、接口和样机。", "Requires a formal part number, drawings, interfaces, and sample unit.")],
    applications: [text("专用抓取、精密操作和数据采集", "Dedicated grasping, precision manipulation, and data capture")],
    parameters: [metric("产品形态", "Form", `${item.count} 指末端执行器`, `${item.count}-finger end effector`), metric("手指数量", "Finger count", item.count, item.count), metric("产品层级", "Product level", "公开硬件方向", "Published hardware direction"), metric("正式参数表", "Formal specification table", "未公开", "Not public")],
    officialUrl: "https://www.tars-ai.com/",
    specificationKind: "capabilities",
    integration,
    verification: text("只记录公司公开的手指数量和产品方向，其他性能保持未知。", "Only the publicly stated finger count and product direction are recorded; all other performance remains unknown."),
  })),
];

const expectedParameterCounts: Record<string, number> = {
  "deep-tars-t1": 4,
  "deep-tars-a1": 4,
  "deep-tars-awe3": 6,
  "deep-tars-omnivta": 6,
  "deep-tars-sensehub": 11,
  "deep-tars-effector-1": 4,
  "deep-tars-effector-2": 4,
  "deep-tars-effector-3": 4,
};

for (const product of tarsProductContent) {
  const expected = expectedParameterCounts[product.id];
  if (expected === undefined || product.parameters.length !== expected) {
    throw new Error(`TARS parameter audit failed for ${product.id}: ${product.parameters.length}/${expected ?? "missing"}`);
  }
}

if (tarsProductContent.length !== Object.keys(expectedParameterCounts).length) {
  throw new Error(`TARS product audit failed: ${tarsProductContent.length}/${Object.keys(expectedParameterCounts).length}`);
}
