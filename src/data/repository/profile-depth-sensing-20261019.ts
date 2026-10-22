import type { CatalogEnrichmentGroup } from './catalog-enrichment-types';
import { l, type Localized, type TimelineSeed } from './verified-catalog-wave-fourteen-common';
import { grippingCatalogEnrichment } from './catalog-enrichment-parallel-gripping';
import { waveFifteenProfiles } from './verified-catalog-wave-fifteen-profiles';

const kunwei = 'https://www.kunweitech.com/abouts/profile/';
const gelsight = 'https://www.prnewswire.com/news-releases/gelsight-inc-closes-venture-financing-300051141.html';
const contactile = 'https://contactile.com/about-contactile/';

function event(date: string, kind: TimelineSeed['kind'], sourceUrl: string, title: Localized, detail: Localized): TimelineSeed {
  return { date, kind, sourceUrl, title, detail };
}

type ProfilePatch = {
  aboutUrl?: string;
  overview?: Localized[];
  businessAreas: Localized[];
  customerGroups: Localized[];
  timeline?: TimelineSeed[];
};

function uniqueText(items: Localized[]): Localized[] {
  return items.filter((item, index) => items.findIndex(other => other.zh === item.zh && other.en === item.en) === index);
}

// Preserve the accepted narrative and dated history; this group changes profile fields only.
function deepen(slug: string, patch: ProfilePatch): CatalogEnrichmentGroup['profiles'][string] {
  const prior = grippingCatalogEnrichment.profiles[slug];
  const seed = waveFifteenProfiles[slug];
  const timeline = [...(prior.timeline ?? []), ...(patch.timeline ?? [])];
  return {
    ...(patch.aboutUrl ? { aboutUrl: patch.aboutUrl } : {}),
    overview: uniqueText([...(prior.overview ?? []), ...(patch.overview ?? [])]),
    businessAreas: uniqueText([...(prior.businessAreas ?? (seed ? [seed.business] : [])), ...patch.businessAreas]),
    customerGroups: uniqueText([...(prior.customerGroups ?? (seed ? [seed.users] : [])), ...patch.customerGroups]),
    timeline: timeline.filter((item, index) => timeline.findIndex(other => other.date === item.date && other.kind === item.kind && other.sourceUrl === item.sourceUrl && other.title.zh === item.title.zh) === index)
      .sort((a, b) => a.date.localeCompare(b.date)),
  };
}

export const profileDepthSensingEnrichment: CatalogEnrichmentGroup = {
  products: [],
  reviews: [],
  profiles: {
    'kunwei-technology': deepen('kunwei-technology', {
      aboutUrl: kunwei,
      overview: [l(
        '官网公司史把2018年5月成立的坤维（北京）科技有限公司，与同年10月成立的全资子公司常州坤维传感科技有限公司分开记载。常州公司介绍的业务包含力学传感器研发、制造、销售，以及定制传感器、结构与传感一体化设计、数据采集和现场测试；因此其交付既有标准器件，也有围绕试验或装备的测量方案。',
        'The company history distinguishes Kunwei (Beijing) Technology, established in May 2018, from its wholly owned Changzhou sensing subsidiary, established that October. The Changzhou profile covers sensor development, manufacturing and sales alongside custom transducers, integrated structural/sensing design, data acquisition and field testing. Its offering therefore includes standard components and measurement solutions for equipment and experiments.',
      )],
      businessAreas: [
        l('机器人六维力/力矩传感与力控测量链路', 'Robotic six-axis force/torque sensing and force-control measurement chains'),
        l('工业称重、专用试验与定制力学测量系统', 'Industrial weighing, specialized testing and custom mechanical-measurement systems'),
      ],
      customerGroups: [
        l('机器人及智能装备研发、集成团队；工业过程、质量检测和科研试验机构', 'Robot and intelligent-equipment developers/integrators; industrial-process, quality-inspection and research-test teams'),
      ],
      timeline: [
        event('2018-05', 'founding', kunwei, l('北京主体成立', 'Beijing entity established'), l('官网发展历程记载坤维（北京）科技有限公司于5月成立；不补造具体日期。', 'The official history dates the Beijing company to May, without specifying a day.')),
        event('2018-10', 'business', kunwei, l('常州全资子公司成立', 'Wholly owned Changzhou subsidiary established'), l('常州坤维传感科技有限公司于同年10月成立，官网将其列为全资子公司，区别于北京主体。', 'The history records Changzhou Kunwei Sensing as a wholly owned subsidiary established that October, distinct from the Beijing entity.')),
        event('2025', 'product', kunwei, l('发布HPS、HRS和ELS六维力系列', 'HPS, HRS and ELS six-axis families introduced'), l('官网将高性能、人形和高性价比三类六维力新系列列在2025年；不据此生成目录外型号或推定每款交付日期。', 'The history lists high-performance, humanoid and cost-oriented six-axis families under 2025. This does not create additional model records or establish each model delivery date.')),
      ],
    }),
    gelsight: deepen('gelsight', {
      aboutUrl: 'https://www.gelsight.com/about/',
      overview: [l(
        'GelSight的商业化路线来自MIT CSAIL的弹性介质光学成像技术。公司2015年自发公告回顾其于2011年7月成立，并说明系统之外还需要可更换的凝胶传感耗材；现有产品页则把业务分为表面计量和机器人触觉两线。前者服务在位缺陷与几何检测，后者提供接触图像和开发接口，两者的精度、标定及采购口径不能互相套用。',
        'GelSight commercializes elastomer-based optical imaging originating at MIT CSAIL. Its company-issued 2015 announcement dates its formation to July 2011 and describes replaceable gel sensors alongside the imaging systems. The product catalog separates surface metrology from robotic touch: in-situ defect/geometry inspection differs from contact imagery and developer interfaces, with separate accuracy, calibration and purchasing assumptions.',
      )],
      businessAreas: [
        l('接触式三维表面计量、缺陷与粗糙度检测', 'Contact-based 3D surface metrology, defect and roughness inspection'),
        l('机器人光学触觉传感、凝胶耗材及开发工具', 'Optical tactile sensors, gel consumables and development tools for robotics'),
      ],
      customerGroups: [
        l('制造质量与航空、汽车检测团队；机器人、触觉和材料研究实验室', 'Manufacturing-quality and aerospace/automotive inspection teams; robotics, touch and materials laboratories'),
      ],
      timeline: [
        event('2011-07', 'founding', gelsight, l('GelSight成立', 'GelSight founded'), l('公司2015年公告将成立时间追溯至2011年7月；不补造注册日。', 'The company-issued 2015 release dates its founding to July 2011; no incorporation day is inferred.')),
        event('2015-03-17', 'funding', gelsight, l('公告完成A轮融资', 'Series A closing announced'), l('公司公告称完成由Ping Fu领投、Omega Funds管理基金参与的A轮融资。公告未列金额；这是历史公司声明，不是当前估值或后续轮次完整记录。', 'The company announced a Series A led by Ping Fu with funds managed by Omega Funds. No amount was stated; this is a historical company disclosure, not a current valuation or complete later funding history.')),
      ],
    }),
    syntouch: deepen('syntouch', {
      businessAreas: [
        l('历史BioTac/BioTac SP机器人指尖多模态触觉传感', 'Historical BioTac/BioTac SP multimodal fingertip sensing for robotics'),
        l('历史Toccare材料触感测量与评价', 'Historical Toccare material-touch measurement and evaluation'),
      ],
      customerGroups: [
        l('历史产品面向机器人触觉/操作研究及材料触感评价团队；当前供货和支持关系未核实', 'Historical offerings target robot-touch/manipulation research and material-feel evaluation teams; current supply and support relationships remain unverified'),
      ],
    }),
    contactile: deepen('contactile', {
      overview: [l(
        'Contactile于2019年初在悉尼成立，其触觉技术由创始团队在UNSW Sydney开展研究时形成。公司将光学检测的柔性触点、采集电子和开发套件组合为可集成的感知链路，并以GAL2探索带触觉反馈的完整夹持端；它不只是销售单个力敏元件。官网还记录了CSIRO、悉尼大学及UNSW的创业支持项目，相关科研资助和孵化经历不等于公司股权融资。',
        'Founded in Sydney in early 2019, Contactile commercializes tactile technology developed by its founders at UNSW Sydney. Its offering combines optically read compliant contacts, acquisition electronics and development kits, while GAL2 extends the work into a complete touch-enabled gripper rather than a sensing element alone. Its history also records CSIRO, University of Sydney and UNSW startup programs; research grants and accelerator participation are not company equity financing.',
      )],
      businessAreas: [
        l('三维接触力、位移、振动及滑移/摩擦感知器件', '3D contact-force, displacement, vibration and slip/friction sensing components'),
        l('触觉原生夹爪、采集控制器与机器人开发套件', 'Tactile-native grippers, acquisition controllers and robotics development kits'),
      ],
      customerGroups: [
        l('需要自适应夹持的机器人/夹爪研发与系统集成团队，以及触觉研究机构', 'Robot/gripper developers and integrators needing adaptive grasping, and tactile-research organizations'),
      ],
      timeline: [
        event('2020', 'business', contactile, l('参与UNSW Founders 10x', 'Participated in UNSW Founders 10x'), l('官网OUR HISTORY明确列出2020年参与该创业支持项目；此事件不作为融资轮次或产品首次出货。', 'The official history records participation in this startup-support program in 2020; it is not classified as an equity round or first product shipment.')),
      ],
    }),
    tacterion: deepen('tacterion', {
      businessAreas: [
        l('plyon柔性触摸、压力和接近传感及读取电子', 'plyon flexible touch, pressure and proximity sensing with readout electronics'),
        l('IPM交互模块集成与skillflow装配过程数字化', 'IPM interaction-module integration and skillflow assembly-process digitization'),
      ],
      customerGroups: [
        l('需要曲面交互和接触检测的机器人、工业自动化、电动工具及产品工程团队', 'Robotics, industrial-automation, power-tool and product-engineering teams integrating curved interfaces and contact detection'),
      ],
    }),
    weart: deepen('weart', {
      businessAreas: [
        l('XR可穿戴多模态触觉反馈硬件', 'Wearable multimodal haptic-feedback hardware for XR'),
        l('触觉仿真、交互内容及遥操作软件集成', 'Haptic simulation, interactive-content and teleoperation software integration'),
      ],
      customerGroups: [
        l('工业/医疗培训与虚拟原型团队，以及XR和遥操作研究开发者；不据此主张医疗疗效或具体客户合同', 'Industrial/medical training and virtual-prototyping teams, plus XR and teleoperation researchers; this does not establish medical efficacy or named customer contracts'),
      ],
    }),
  },
};
