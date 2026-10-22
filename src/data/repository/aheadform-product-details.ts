type Text = { zh: string; en: string };
type Metric = { label: Text; value: Text };
type Highlight = { title: Text; detail: Text };

export type AheadFormProductContent = {
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
const metric = (zh: string, en: string, valueZh: string, valueEn = valueZh): Metric => ({
  label: text(zh, en),
  value: text(valueZh, valueEn),
});
const highlight = (zh: string, en: string, detailZh: string, detailEn: string): Highlight => ({
  title: text(zh, en),
  detail: text(detailZh, detailEn),
});

const commonIntegration = text(
  "这类产品的选型重点不是单看外观或面部自由度。项目应要求厂商提供对应型号的机械、电气、软件接口和安全资料，并以连续运行、表情同步、语音延迟、识别边界、皮肤维护、内容授权和现场运维进行样机验收。",
  "Selection should not rely on appearance or facial DoF alone. Request model-specific mechanical, electrical, software-interface, and safety documentation, then validate continuous operation, expression synchronization, speech latency, recognition limits, skin maintenance, content rights, and on-site service with a sample unit.",
);

export const aheadFormProductContent: AheadFormProductContent[] = [
  {
    id: "deep-aheadform-origin-f1",
    summary: text("桌面级超仿生女性人形机器人，面向近距离视觉、语音和表情交互。", "A desktop lifelike female humanoid for close-range visual, speech, and expressive interaction."),
    overview: [
      text("Origin F1 将仿生面部机构与多模态交互组合在桌面级载体中。官网明确披露 26 个头部、眼部和面部自由度，并描述眨眼、注视和细微表情。", "Origin F1 combines a biomimetic facial mechanism and multimodal interaction in a desktop form. The official page states 26 head, eye, and facial DoF and describes blinking, gaze, and subtle expressions."),
      text("官网还列出人脸识别、视觉感知、语音识别和语音合成，以及由算法协调表情、眼球和语音行为。页面没有给出整机尺寸、质量、功耗、接口、噪声或连续运行指标。", "The official page also lists face recognition, visual perception, speech recognition and synthesis, plus algorithmic coordination of expression, eye motion, and speech behavior. It does not publish overall dimensions, mass, power, interfaces, noise, or continuous-duty figures."),
    ],
    highlights: [
      highlight("面部机构", "Facial mechanism", "26 个头部、眼部与面部自由度。", "26 head, eye, and facial DoF."),
      highlight("多模态交互", "Multimodal interaction", "视觉、语音、人脸识别及语音识别与合成。", "Vision, speech, face recognition, and speech recognition and synthesis."),
      highlight("披露边界", "Disclosure boundary", "官网为能力说明页，不是完整硬件规格书。", "The official page is a capability profile, not a complete hardware datasheet."),
    ],
    applications: [text("接待与品牌展示", "Reception and brand display"), text("IP 角色交互", "IP-character interaction"), text("人机非语言交互研究", "Non-verbal HRI research")],
    parameters: [
      metric("产品形态", "Form", "桌面级超仿生女性人形机器人", "Desktop lifelike female humanoid"),
      metric("头部/眼部/面部自由度", "Head/eye/facial DoF", "26", "26"),
      metric("表情行为", "Expressive behavior", "眨眼、注视控制、细微表情", "Blinking, gaze control, and subtle expressions"),
      metric("算法能力", "Algorithmic capability", "AI 驱动的面部动作与语音行为协调", "AI-driven coordination of facial motion and speech behavior"),
      metric("视觉能力", "Vision capability", "视觉感知与人脸识别", "Visual perception and face recognition"),
      metric("语音能力", "Speech capability", "语音识别与语音合成", "Speech recognition and synthesis"),
      metric("外观复现", "Appearance replication", "3D 重建与高精度仿生皮肤", "3D reconstruction and high-precision bionic skin"),
      metric("正式硬件参数表", "Formal hardware table", "官网未发布", "Not published on the official page"),
    ],
    officialUrl: "https://www.aheadform.com/origin-f1",
    specificationKind: "capabilities",
    integration: commonIntegration,
    verification: text("逐项依据 Origin F1 官网页面记录。26 自由度限定为头部、眼部和面部机构，不能解释为全身自由度；其余未披露规格保持未知。", "Recorded item by item from the official Origin F1 page. The 26 DoF apply to the head, eyes, and facial mechanism, not the whole body; undisclosed specifications remain unknown."),
  },
  {
    id: "deep-aheadform-origin-m1",
    summary: text("桌面级超仿生男性人形机器人，公开案例将角色外观、触感、双目视觉与角色 AI 结合。", "A desktop lifelike male humanoid whose public case combines character appearance, tactile presentation, binocular vision, and character AI."),
    overview: [
      text("Origin M1 的官网独立页面以《逆水寒》方承意角色合作为主要案例。页面明确列出第二代超仿生皮肤、36.5°C 恒温系统、30 个面部可动肌肉单元、12 种微表情和双目视觉眼神追踪。", "The independent Origin M1 page centers on a Fang Chengyi collaboration for Justice Online. It explicitly lists second-generation hyper-bionic skin, a 36.5°C temperature system, 30 movable facial-muscle units, 12 micro-expressions, and binocular gaze tracking."),
      text("角色对话由网易伏羲 AI 支持是该合作案例的公开口径，不等同于所有交付版本固定搭载同一模型。官网没有披露整机通用尺寸、重量、功耗、接口或交付配置表。", "NetEase Fuxi AI support is stated for this collaboration case and does not establish that every delivered unit uses the same model. The official page gives no general dimensions, mass, power, interfaces, or delivery configuration table."),
    ],
    highlights: [
      highlight("仿生皮肤", "Bionic skin", "第二代皮肤并配有 36.5°C 恒温系统。", "Second-generation skin with a 36.5°C temperature-control system."),
      highlight("面部驱动", "Facial actuation", "30 个可动肌肉单元，公开 12 种微表情。", "30 movable muscle units and 12 published micro-expressions."),
      highlight("项目边界", "Project boundary", "角色 AI 与内容授权属于具体合作配置，需在项目合同中重新确认。", "Character AI and content rights are project-specific and must be reconfirmed contractually."),
    ],
    applications: [text("IP 角色实体化", "Physical embodiment of IP characters"), text("展陈与沉浸式互动", "Exhibition and immersive interaction"), text("近距离角色对话", "Close-range character dialogue")],
    parameters: [
      metric("产品形态", "Form", "桌面级超仿生男性人形机器人", "Desktop lifelike male humanoid"),
      metric("面部可动肌肉单元", "Movable facial-muscle units", "30", "30"),
      metric("微表情", "Micro-expressions", "12 种", "12"),
      metric("皮肤技术", "Skin technology", "第二代超仿生皮肤", "Second-generation hyper-bionic skin"),
      metric("恒温系统", "Temperature system", "36.5°C", "36.5°C"),
      metric("视觉", "Vision", "双目视觉与眼神追踪", "Binocular vision and gaze tracking"),
      metric("面部驱动", "Facial drive", "高性能无刷微型电机", "High-performance brushless micro-motors"),
      metric("案例 AI", "Case-specific AI", "网易伏羲 AI（方承意合作案例）", "NetEase Fuxi AI in the Fang Chengyi collaboration"),
      metric("角色能力", "Character capability", "上下文理解、角色化回答、长期记忆方向", "Context understanding, in-character responses, and long-term-memory direction"),
      metric("正式硬件参数表", "Formal hardware table", "官网未发布", "Not published on the official page"),
    ],
    officialUrl: "https://www.aheadform.com/origin-m1",
    specificationKind: "capabilities",
    integration: commonIntegration,
    verification: text("数字均来自 Origin M1 官网案例页。AI 供应方和角色内容仅归属于页面所述合作案例，不外推为基础型号的永久标准配置。", "Figures come from the official Origin M1 case page. The AI supplier and character content apply only to the stated collaboration and are not generalized as permanent base-model equipment."),
  },
  {
    id: "deep-aheadform-xuan",
    summary: text("精灵系列全尺寸超仿生人形机器人，重点面向连续表情、品牌展示、接待和情绪交互。", "A full-size lifelike humanoid in the Elf series, focused on continuous expression, brand display, reception, and affective interaction."),
    overview: [
      text("精灵·璇官网独立页披露面部超过 30 个自由度，硅胶仿生皮肤精度口径在 0.5 mm 以内，并说明皮肤可配合细微肌肉运动形成连续表情。", "The independent Elf Xuan page states more than 30 facial DoF and a within-0.5-mm precision claim for its silicone bionic skin, designed to follow subtle muscle motion for continuous expression."),
      text("官网把品牌展示、接待服务和情绪交互列为适用场景，并强调持续运行。页面没有提供全身自由度、行走底盘、尺寸、重量、电池、接口或可靠性数据。", "The official page lists brand display, reception, and affective interaction as applicable scenarios and emphasizes continuous operation. It does not disclose whole-body DoF, locomotion base, dimensions, mass, battery, interfaces, or reliability data."),
    ],
    highlights: [
      highlight("连续表情", "Continuous expression", "超过 30 个面部自由度与硅胶仿生皮肤配合。", "More than 30 facial DoF combined with silicone bionic skin."),
      highlight("公开场景", "Published scenarios", "品牌展示、接待服务和情绪交互。", "Brand display, reception, and affective interaction."),
      highlight("关键未知项", "Key unknowns", "全身运动、连续运行时长、维护周期与接口未量化。", "Whole-body motion, continuous-duty duration, maintenance interval, and interfaces are not quantified."),
    ],
    applications: [text("品牌展示", "Brand display"), text("接待服务", "Reception services"), text("演出与情绪交互", "Performance and affective interaction")],
    parameters: [
      metric("产品形态", "Form", "全尺寸超仿生人形机器人", "Full-size lifelike humanoid"),
      metric("面部自由度", "Facial DoF", ">30", ">30"),
      metric("皮肤材料", "Skin material", "自主硅胶仿生皮肤", "Proprietary silicone bionic skin"),
      metric("皮肤精度公开口径", "Published skin-precision figure", "0.5 mm 以内", "Within 0.5 mm"),
      metric("面部驱动", "Facial drive", "高性能无刷微型电机", "High-performance brushless micro-motors"),
      metric("表情能力", "Expression capability", "真实、连续的情绪表达", "Lifelike, continuous emotional expression"),
      metric("适用场景", "Applicable scenarios", "品牌展示、接待服务、情绪交互", "Brand display, reception, and affective interaction"),
      metric("正式硬件参数表", "Formal hardware table", "官网未发布", "Not published on the official page"),
    ],
    officialUrl: "https://www.aheadform.com/elf-xuan",
    specificationKind: "capabilities",
    integration: commonIntegration,
    verification: text("面部自由度与皮肤精度来自精灵·璇官网。0.5 mm 是厂商页面口径，官网未给出测量方法；不能将面部自由度解释为整机运动自由度。", "Facial DoF and the skin-precision figure come from the official Elf Xuan page. The manufacturer does not publish the measurement method for 0.5 mm, and facial DoF must not be read as whole-robot motion DoF."),
  },
  {
    id: "deep-aheadform-iris",
    summary: text("精灵系列命名机器人，当前官网目录将其列为独立作品，但没有公开型号级规格表。", "A named Elf-series robot listed as a separate work in the current official catalog, without a model-level specification table."),
    overview: [text("官网产品目录将精灵·铱列为精灵系列人形机器人。当前可访问资料只确认产品名称、系列与超仿生交互方向。", "The official catalog lists Elf Iridium as an Elf-series humanoid robot. Accessible material confirms only its name, series, and lifelike-interaction direction."), text("不能从照片、精灵·璇或同系列描述外推其自由度、尺寸、皮肤结构、驱动、移动方式或交付状态。", "Photos and sibling Elf-series descriptions cannot establish its DoF, dimensions, skin construction, drive system, locomotion, or delivery status.")],
    highlights: [highlight("资料状态", "Evidence status", "官网命名产品，型号级数据未披露。", "Officially named product; model-level data not disclosed."), highlight("可确认范围", "Confirmed scope", "属于精灵系列人形机器人。", "An Elf-series humanoid robot."), highlight("选型条件", "Selection condition", "需取得对应型号规格书和样机。", "Requires a model-specific datasheet and sample unit.")],
    applications: [text("展陈、角色互动或定制项目", "Exhibition, character interaction, or custom projects")],
    parameters: [metric("产品系列", "Series", "精灵系列", "Elf series"), metric("产品形态", "Form", "超仿生人形机器人", "Lifelike humanoid robot"), metric("正式参数表", "Formal specification table", "官网未发布", "Not published")],
    officialUrl: "https://www.aheadform.com/products",
    specificationKind: "capabilities",
    integration: commonIntegration,
    verification: text("仅记录官网目录可直接确认的信息；未把同系列其他产品的数字复制到本型号。", "Only information directly confirmed by the official catalog is recorded; no figures are copied from sibling models."),
  },
  {
    id: "deep-aheadform-xuan-2",
    summary: text("精灵·璇 2.0 是官网首页与产品目录当前展示的精灵系列迭代作品，型号级规格尚未公开。", "Elf Xuan 2.0 is a current Elf-series iteration shown on the official home and product pages; model-level specifications are not public."),
    overview: [text("官网把精灵·璇 2.0 标为精灵系列人形机器人，并作为当前首页主视觉之一。", "The official site identifies Elf Xuan 2.0 as an Elf-series humanoid and features it prominently on the current home page."), text("页面没有提供可与初代精灵·璇逐项比较的自由度、尺寸、材料、驱动、接口或性能表，因此不写入推测性升级幅度。", "No DoF, dimensions, materials, drives, interfaces, or performance table is provided for comparison with the first Xuan, so no inferred upgrade magnitude is recorded.")],
    highlights: [highlight("产品代际", "Generation", "精灵·璇的 2.0 命名迭代。", "A 2.0-named iteration of Elf Xuan."), highlight("公开状态", "Disclosure status", "官网展示，型号级参数未披露。", "Officially displayed; model-level specifications undisclosed."), highlight("比较边界", "Comparison boundary", "不能沿用初代璇的参数。", "First-generation Xuan figures cannot be reused.")],
    applications: [text("展陈、接待、表演和定制互动", "Exhibition, reception, performance, and custom interaction")],
    parameters: [metric("产品系列", "Series", "精灵系列", "Elf series"), metric("代际", "Generation", "2.0", "2.0"), metric("产品形态", "Form", "超仿生人形机器人", "Lifelike humanoid robot"), metric("正式参数表", "Formal specification table", "官网未发布", "Not published")],
    officialUrl: "https://www.aheadform.com/products",
    specificationKind: "capabilities",
    integration: commonIntegration,
    verification: text("名称和系列来自官网当前目录；其余硬件指标保持未知。", "Name and series come from the current official catalog; all other hardware metrics remain unknown."),
  },
  {
    id: "deep-aheadform-tang-sanzang",
    summary: text("摹生系列角色机器人，官网强调 1:1 生物级精度复现、声纹克隆和个性化方向。", "A Mimetic-series character robot whose official profile emphasizes 1:1 biological-grade reproduction, voiceprint cloning, and personalization."),
    overview: [text("官网将唐三藏列入摹生系列，并描述 1:1 生物级精度复现、声纹克隆和个性化。", "The official site places Tang Sanzang in the Mimetic series and describes 1:1 biological-grade reproduction, voiceprint cloning, and personalization."), text("这些属于产品方向与能力陈述，不是带测量方法的工程规格。官网未公开自由度、尺寸、质量、运动能力、接口或声纹使用授权流程。", "These are positioning and capability statements, not engineering specifications with measurement methods. DoF, dimensions, mass, motion, interfaces, and voiceprint-rights workflow are not public.")],
    highlights: [highlight("复现方向", "Replication direction", "1:1 生物级精度复现。", "1:1 biological-grade reproduction."), highlight("声音与角色", "Voice and character", "声纹克隆与个性化。", "Voiceprint cloning and personalization."), highlight("权利边界", "Rights boundary", "人物形象、声音和内容授权必须独立确认。", "Likeness, voice, and content rights require separate confirmation.")],
    applications: [text("数字遗产与 AI 陪伴概念", "Digital-legacy and AI-companion concepts"), text("角色展陈与定制互动", "Character exhibition and custom interaction")],
    parameters: [metric("产品系列", "Series", "摹生系列", "Mimetic series"), metric("复现口径", "Replication statement", "1:1 生物级精度复现", "1:1 biological-grade reproduction"), metric("声音能力", "Voice capability", "声纹克隆", "Voiceprint cloning"), metric("个性化", "Personalization", "官网列为产品方向", "Listed as a product direction"), metric("正式参数表", "Formal specification table", "官网未发布", "Not published")],
    officialUrl: "https://www.aheadform.com/products",
    specificationKind: "capabilities",
    integration: commonIntegration,
    verification: text("只保留官网公开能力用语，并明确其不是可复现的量化性能指标；项目使用人物形象或声纹前需取得合法授权。", "Only official capability wording is retained and is not presented as reproducible quantitative performance; lawful authorization is required before using a person's likeness or voiceprint."),
  },
  {
    id: "deep-aheadform-chappie",
    summary: text("机甲系列作品，官网以机械结构风格和影视 IP 场景协同为核心定位。", "A Mecha-series work positioned around a mechanical visual language and film/TV IP scenario integration."),
    overview: [text("官网将查派列入机甲系列，描述其采用高度机械化结构设计，并面向影视 IP 与跨系列场景协同。", "The official site places Chappie in the Mecha series, describing a highly mechanical structural design and film/TV IP plus cross-series scenario integration."), text("当前目录没有独立工程参数页，无法确认自由度、尺寸、运动方式、传感器、控制接口、续航或可采购配置。", "The current catalog has no independent engineering page, so DoF, dimensions, locomotion, sensors, control interfaces, endurance, and purchasable configuration cannot be confirmed.")],
    highlights: [highlight("设计语言", "Design language", "高度机械化的机甲结构风格。", "Highly mechanical mecha-style structure."), highlight("内容方向", "Content direction", "影视 IP 与跨系列场景协同。", "Film/TV IP and cross-series scenario integration."), highlight("披露边界", "Disclosure boundary", "没有型号级工程规格。", "No model-level engineering specification is public.")],
    applications: [text("影视 IP 展陈", "Film/TV IP exhibition"), text("主题空间与互动演出", "Themed spaces and interactive performance")],
    parameters: [metric("产品系列", "Series", "机甲系列", "Mecha series"), metric("设计方向", "Design direction", "高度机械化结构", "Highly mechanical structure"), metric("内容方向", "Content direction", "影视 IP 与跨系列场景协同", "Film/TV IP and cross-series scenario integration"), metric("正式参数表", "Formal specification table", "官网未发布", "Not published")],
    officialUrl: "https://www.aheadform.com/products",
    specificationKind: "capabilities",
    integration: commonIntegration,
    verification: text("仅依据官网目录和系列说明；没有从名称、图片或影视角色推断功能。", "Based only on the official catalog and series description; no functionality is inferred from the name, imagery, or film character."),
  },
];

const expectedParameterCounts: Record<string, number> = {
  "deep-aheadform-origin-f1": 8,
  "deep-aheadform-origin-m1": 10,
  "deep-aheadform-xuan": 8,
  "deep-aheadform-iris": 3,
  "deep-aheadform-xuan-2": 4,
  "deep-aheadform-tang-sanzang": 5,
  "deep-aheadform-chappie": 4,
};

for (const product of aheadFormProductContent) {
  const expected = expectedParameterCounts[product.id];
  if (expected === undefined || product.parameters.length !== expected) {
    throw new Error(`AheadForm parameter audit failed for ${product.id}: ${product.parameters.length}/${expected ?? "missing"}`);
  }
}

if (aheadFormProductContent.length !== Object.keys(expectedParameterCounts).length) {
  throw new Error(`AheadForm product audit failed: ${aheadFormProductContent.length}/${Object.keys(expectedParameterCounts).length}`);
}
