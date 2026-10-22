import type { CatalogEnrichmentGroup } from './catalog-enrichment-types';
import { l, type Localized, type TimelineSeed } from './verified-catalog-wave-fourteen-common';
import { waveFifteenBackground } from './verified-catalog-wave-fifteen-history';
import { waveFifteenProfiles } from './verified-catalog-wave-fifteen-profiles';
import { grippingCatalogEnrichment } from './catalog-enrichment-parallel-gripping';
import { cnRoboticsCatalogEnrichment } from './catalog-enrichment-parallel-cnRobotics';

const previous = {
  ...cnRoboticsCatalogEnrichment.profiles,
  ...grippingCatalogEnrichment.profiles,
};

// Preserve the accepted bilingual prose; only fill the missing structured fields.
function profile(
  slug: string,
  businessAreas: Localized[],
  customerGroups: Localized[],
  timeline: TimelineSeed[] = previous[slug]?.timeline ?? [],
): CatalogEnrichmentGroup['profiles'][string] {
  const overview = previous[slug]?.overview;
  if (!overview || overview.length < 2) throw new Error(`Missing accepted profile: ${slug}`);
  const inheritedCustomers = previous[slug]?.customerGroups ?? [waveFifteenProfiles[slug].users];
  return { overview, businessAreas, customerGroups: [...inheritedCustomers, ...customerGroups], timeline };
}

export const profileDepthGrippingEnrichment: CatalogEnrichmentGroup = {
  profiles: {
    'wonik-robotics': profile('wonik-robotics', [
      l('Allegro 多指电驱灵巧手及手部控制、触觉集成，面向机器人抓取与操作开发。',
        'Allegro electrically driven multifinger hands, hand control and tactile integration for grasping and manipulation development.'),
      l('AMR 自主移动与 AMMR 移动操作平台，结合厂内物料运输和机械臂作业。',
        'AMR mobility and AMMR mobile-manipulation platforms combining in-plant material transport with arm-based work.'),
      l('制造自动化与机器人控制系统；公司史列有机床上下料、半导体工序搬运和生产线集成项目。',
        'Manufacturing automation and robot-control systems, with company-reported machine-tending, semiconductor-transfer and production-line integration projects.'),
    ], [
      l('灵巧操作、抓取学习和机器人平台开发团队；Allegro 的各代机械与传感配置分别选型。',
        'Dexterous-manipulation, grasp-learning and robot-platform developers selecting generation-specific Allegro mechanics and sensing.'),
      l('制造与半导体工厂的物流、机床上下料和自动化集成团队；历史项目描述不代表当前具名客户合同。',
        'Factory and semiconductor automation teams working on logistics, machine tending and integration; historical project descriptions are not current named-customer contracts.'),
    ]),
    qbrobotics: profile('qbrobotics', [
      l('柔顺、欠驱动的 SoftHand 与 SoftClaw 抓取产品，分别提供工业集成和研究用途的手部及配套附件。',
        'Compliant, underactuated SoftHand and SoftClaw grasping products, with industrial and research hands and integration accessories.'),
      l('qbmove 可变刚度执行器与模块化研究、教学套件，将可调弹性驱动用于机构和协作机器人实验。',
        'qbmove variable-stiffness actuators and modular research and teaching kits for elastic mechanisms and collaborative-robot experiments.'),
    ], [
      l('柔性抓取与协作机械臂集成团队；Industry 产品的应用示例不等同于已披露客户采购。',
        'Adaptive-grasping and collaborative-arm integrators; Industry application examples are not disclosed customer purchases.'),
      l('软体机器人、可变刚度驱动和机器人教学实验室，使用 Research 产品或 DelMo 等模块化套件。',
        'Soft-robotics, variable-stiffness and robotics-teaching laboratories using Research products or modular kits such as DelMo.'),
    ]),
    'seed-robotics': profile('seed-robotics', [
      l('面向研究的成人尺寸、儿童尺寸机器人手与简化操作器，包含欠驱动手指、内置控制及可选掌部感知。',
        'Adult-sized and child-sized research hands and simplified manipulators with underactuated fingers, embedded control and optional palm sensing.'),
      l('FTS 触觉压力传感器，可嵌入自有机器人手，也有用于第三方设备的独立集成形式。',
        'FTS tactile-pressure sensors for embedding in Seed hands or integrating independently into third-party equipment.'),
      l('NICO 开源研究平台的预装制造与配置服务；平台设计归属汉堡大学项目，不将代工集成等同于原创设计所有权。',
        'Preassembled manufacture and configuration of the open-source NICO research platform, whose design belongs to the University of Hamburg project rather than being claimed as Seed\'s original design.'),
    ], [
      l('人工智能、神经科学、心理学、认知科学及多模态人机交互研究团队，使用手部、触觉器件或完整 NICO 实验平台。',
        'AI, neuroscience, psychology, cognitive-science and multimodal HRI researchers using hands, tactile devices or an assembled NICO experimental platform.'),
    ]),
    psyonic: profile('psyonic', [
      l('Ability Hand 仿生假肢手及配套适配资料，服务上肢假肢应用；临床装配和使用评估独立于机器人研究规格。',
        'Ability Hand bionic prosthetic hands and fitting material for upper-limb prosthetics; clinical fitting and assessment remain separate from robotics specifications.'),
      l('机器人用 Ability Hand、软件接口与仿真集成，将触觉操作硬件用于机器人学习和人类操作数据采集。',
        'Robotics Ability Hand hardware, software interfaces and simulation integration for manipulation learning and human-operation data capture.'),
    ], [
      l('假肢装配、临床与康复配套团队；此处表示服务对象，不推导疗效、医疗销量或全部认证范围。',
        'Prosthetic-fitting, clinical and rehabilitation teams, without implying clinical outcomes, medical sales or universal certification coverage.'),
      l('机器人与具身智能研发团队，包括需要 Isaac Lab 仿真、触觉抓取和人机操作数据流程的开发者。',
        'Robotics and embodied-AI developers using Isaac Lab simulation, tactile grasping and human-to-robot manipulation-data workflows.'),
    ], waveFifteenBackground.psyonic.timeline),
    'theo-hand': profile('theo-hand', [
      l('微型伺服电缸与执行模组；公开 ELI16-2SD 手册将驱动、丝杠传动、位置传感和闭环控制组织为一体化直线执行部件。',
        'Miniature servo cylinders and actuator modules; the public ELI16-2SD manual describes an integrated linear actuator combining drive, screw transmission, position sensing and closed-loop control.'),
      l('Eco、Std、Pro 灵巧手与上肢操作方案，将内部执行部件与多自由度抓取、精细操作结合。',
        'Eco, Std and Pro dexterous hands and upper-limb solutions combining actuation components with multi-DoF grasping and fine manipulation.'),
    ], [
      l('机器人本体和末端集成团队，面向工业分拣、仓储物流与精细摆放等官网列示场景；未将用途描述当作已签客户名单。',
        'Robot and end-effector integrators targeting the stated sorting, warehouse-logistics and precision-placement applications, not a verified list of contracted customers.'),
    ]),
    'sake-robotics': profile('sake-robotics', [
      l('EZGripper 欠驱动夹爪与可更换指垫，利用平行夹持及手指包络适应不同工件。',
        'EZGripper underactuated grippers and replaceable finger pads, combining parallel gripping and enveloping fingers for different objects.'),
      l('机器人安装与软件集成，包括通用及 Unitree G1 安装件、DDS/DEX1、ROS 和 Python 支持；适配关系不等于机器人厂商采购。',
        'Robot mounting and software integration, including universal and Unitree G1 mounts, DDS/DEX1, ROS and Python support; compatibility does not establish purchases by robot manufacturers.'),
    ], [
      l('抓取研究与机器人系统集成团队，使用机械臂或 G1 等平台开展操作实验；官网演示与兼容型号不作为销售客户或订单规模。',
        'Grasping researchers and robot-system integrators running manipulation experiments on arms or platforms such as G1; demonstrations and compatible platforms are not sales customers or order volumes.'),
    ], [
      {
        date: '2017', kind: 'product',
        title: l('第二代夹爪 iREX 演示', 'Gen2 iREX demonstration'),
        detail: l('官网视频索引将一项第二代 EZGripper 折衣演示标注为早稻田大学 iREX 2017 展示；这是厂商对演示的历史记载，不证明采购或持续合作。',
          'The official video index identifies a Gen2 EZGripper laundry-folding demonstration with Waseda University at iREX 2017; this is a vendor retrospective, not evidence of procurement or an ongoing partnership.'),
        sourceUrl: 'https://sakerobotics.com/videos/',
      },
      {
        date: '2018-01-09', kind: 'product',
        title: l('第二代 EZGripper 资料页发布', 'Gen2 EZGripper brochure page published'),
        detail: l('官网第二代 EZGripper 宣传册下载页标注创建日期为2018年1月9日，文件另标 Apr 2018 版本；这是资料发布记录，不据此推定产品首发日。',
          'The official Gen2 EZGripper brochure page records January 9, 2018 as its creation date and separately labels the file Apr 2018; this dates the documentation, not the initial product launch.'),
        sourceUrl: 'https://sakerobotics.com/download/ezgripper-brochure/',
      },
    ]),
    synapx: profile('synapx', [
      l('OctoH-Hand 灵巧执行硬件，以前臂远置执行器和腱绳传动组织手部操作。',
        'OctoH-Hand dexterous hardware using forearm-mounted actuators and tendon transmission.'),
      l('OctoSense 可穿戴与同构操作数据采集，包括肌电手环、外骨骼手套、鱼眼视觉设备和数据处理平台。',
        'OctoSense wearable and homologous manipulation-data collection using EMG wristbands, exoskeleton gloves, fisheye vision and a data-processing platform.'),
      l('OctoMind 具身模型与评测体系，包括 SYNWorld、SYNAction、SYNEval，连接模型训练、策略后训练和分层评测。',
        'OctoMind embodied models and evaluation, including SYNWorld, SYNAction and SYNEval for model training, policy post-training and layered evaluation.'),
    ], [
      l('开展真实操作数据采集、跨机器人策略训练与真机评测的研发和系统集成团队；由产品用途识别服务对象，不声称已披露具名付费客户。',
        'R&D and integration teams collecting real manipulation data, training cross-robot policies and evaluating physical robots; this audience follows the stated use cases, not a disclosed list of paying customers.'),
    ]),
  },
  products: [],
  reviews: [],
};
