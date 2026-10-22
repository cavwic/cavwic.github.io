import { l, type TimelineSeed, type FundingSeed, type Localized } from './verified-catalog-wave-fourteen-common';

type Background = { founded?: string; headquarters?: Localized; timeline: TimelineSeed[]; funding?: FundingSeed[] };
const event = (date: string, kind: TimelineSeed['kind'], sourceUrl: string, zh: string, en: string): TimelineSeed => ({date, kind, sourceUrl, title:l(zh,en), detail:l(zh,en)});
const shadow='https://shadowrobot.com/the-story-behind-the-shadow-robot-brand-refresh/';
const kunwei='https://www.kunweitech.cn/articleinfo/6.html';
const wonik='https://wonikrobotics.com/en/sub/company/history.php';
const qb='https://qbrobotics.com/from-its-inception-to-the-first-commercial-prototypes/';
const seed='https://www.seedrobotics.com/about-us';
const synapx='https://www.synapxdynamics.ai/news/25';
const tacterion='https://www.tacterion.com/company/history';
const weart='https://weart.it/about-weart/';
const senso='https://www.sensodrive.de/about-us/historie_e.php';
const wacoh='https://wacoh-tech.com/company/outline.html';
const photon='https://www.photoneo.com/about-us';

// Events use occurrence dates where disclosed, not the date of a later retrospective.
export const waveFifteenBackground: Record<string, Background> = {
  'shadow-robot': {founded:'1997', timeline:[
    event('1997','founding',shadow,'由机器人爱好者团队发展而来，并正式注册为公司。','The robotics hobbyist group formally registered as a company.'),
  ]},
  'kunwei-technology': {founded:'2018', timeline:[
    event('2018','founding',kunwei,'坤维成立，面向机器人及工业测试提供力觉测量。','Kunwei was established to supply force sensing for robots and industrial testing.'),
    event('2019','funding',kunwei,'完成 Pre-A 轮；点亮伯恩、东科创星、驰星资本参与。此事由公司在 2022 年回顾披露。','Completed a Pre-A round with the three investors named in its later 2022 announcement.'),
    event('2025-01-03','funding','https://www.kunweitech.com/news/1/p12/','公司宣布 B 轮融资，列出小米、舜宇、深创投、高瓴创投与明荟。目录未给出金额，不据此估算估值。','Announced Series B funding naming Xiaomi, Sunny Optical, Shenzhen Capital, GL Ventures and Minghui; the cited listing gives no amount.'),
  ]},
  'xela-robotics': {founded:'2018-08',headquarters:l('东京','Tokyo'),timeline:[
    event('2018-08','founding','https://xelarobotics.com/about/','作为早稻田大学技术衍生企业在东京成立，由 Alexander Schmitz 等共同创建。','Founded in Tokyo as a Waseda University spin-out by Alexander Schmitz and co-founders.'),
  ]},
  gelsight: {founded:'2011-07',timeline:[
    event('2011-07','founding','https://www.prnewswire.com/news-releases/gelsight-inc-closes-venture-financing-300051141.html','公司于 2011 年 7 月成立，将接触式光学表面测量技术商业化。','Founded in July 2011 to commercialize contact-based optical surface measurement.'),
    event('2015','funding','https://www.prnewswire.com/news-releases/gelsight-inc-closes-venture-financing-300051141.html','公司宣布完成风险投资融资；此前已向美国、欧洲和亚洲客户交付系统。公告未给出金额。','Announced venture financing after initial system shipments to the US, Europe and Asia; the announcement did not state an amount.'),
  ]},
  'wonik-robotics': {founded:'2004',headquarters:l('韩国城南市','Seongnam, South Korea'),timeline:[
    event('2004','founding',wonik,'以 SimLab Co., Ltd. 名义成立。','Established as SimLab Co., Ltd.'),
    event('2012','business',wonik,'获得 KITECH 人形机器人手技术转移。','Received humanoid-robot-hand technology transfer from KITECH.'),
    event('2012','product',wonik,'开始生产销售 Allegro Hand V1。','Began Allegro Hand V1 production and sales.'),
    event('2016','business',wonik,'加入 WONIK 集团后更名为 WONIK Robotics；不是一次新的公司初创。','Renamed WONIK Robotics after joining WONIK Group; this is a restructuring milestone, not a new founding.'),
    event('2018','product',wonik,'发布 Allegro Hand V4。','Launched Allegro Hand V4.'),
    event('2023','product',wonik,'发布 300 kg 负载级 AMR。','Launched a 300 kg payload-class AMR.'),
    event('2024','product',wonik,'发布 600 kg、1 t AMR、AMMR 和 Allegro Hand V5。','Launched 600 kg and 1 t AMRs, AMMR and Allegro Hand V5.'),
    event('2026-08-28','funding','https://wonikrobotics.com/en/','公司宣布取得 3500 亿韩元资金，明确包含政策资金和民间投资；不能将总额全部视为股权融资。','Announced KRW 350 billion combining policy funding and private investment; the total is not treated as all-equity financing.'),
  ]},
  qbrobotics: {founded:'2011',headquarters:l('意大利比萨 Navacchio','Navacchio, Pisa, Italy'),timeline:[
    event('2011','founding',qb,'作为比萨大学 E. Piaggio 研究中心和 IIT 的衍生企业成立，发展软体机器人与可变刚度驱动器。','Founded as a University of Pisa E. Piaggio Center/IIT spin-off developing soft robotics and variable-stiffness actuation.'),
    event('2015','business',qb,'迁入 Navacchio 科技园，扩大研发及原型制造条件。','Moved to the Navacchio technology park to support R&D and prototyping.'),
  ]},
  'seed-robotics': {founded:'2015',headquarters:l('葡萄牙里斯本','Lisbon, Portugal'),timeline:[
    event('2015','founding',seed,'成立，围绕研究用机器人手开展业务。','Founded to develop robotic hands and research systems.'),
    event('2019','business',seed,'与汉堡大学合作制造开源 NICO 平台。','Collaborated with the University of Hamburg to manufacture the open-source NICO platform.'),
    event('2020','product',seed,'发布 FTS 触觉压力传感器系列；SINGLEX 为第三方设备集成版本。','Released FTS tactile pressure sensors, including SINGLEX variants for third-party integration.'),
    event('2020','business',seed,'迁往里斯本，扩大工作及制造空间。','Relocated to Lisbon with larger workspace and manufacturing facilities.'),
  ]},
  psyonic: {founded:'2015',headquarters:l('美国圣迭戈','San Diego, USA'),timeline:[
    event('2015','founding','https://www.psyonic.io/news/press-release-psyonic-amp-nvidia-officially-announce-collaboration-at-nvidia-gtc-2026','PSYONIC 成立，创始人为 Aadeel Akhtar。','PSYONIC was founded by Aadeel Akhtar.'),
    event('2020','funding','https://www.psyonic.io/who-we-are','公司列出 93.7 万美元 NSF Phase II SBIR 资助；这是研究资助，不是股权融资轮次。','The company lists a USD 937,000 NSF Phase II SBIR grant; this is research funding, not an equity round.'),
    event('2026','product','https://www.psyonic.io/news/press-release-psyonic-amp-nvidia-officially-announce-collaboration-at-nvidia-gtc-2026','宣布与 NVIDIA 合作并推进 Ability Hand 的 Isaac Lab 集成，用于人类操作数据与机器人研究。','Announced NVIDIA collaboration and Ability Hand integration with Isaac Lab for human manipulation data and robotics research.'),
  ]},
  synapx: {founded:'2026-01',timeline:[
    event('2026-01','founding',synapx,'章鱼动力成立，品牌对应北京章鱼灵动科技有限公司。','SynapX Dynamics was founded; the brand corresponds to Beijing Zhangyu Lingdong Technology.'),
    event('2026-03-20','funding',synapx,'宣布完成近 5000 万美元首轮融资，由地平线、高瓴创投、小米战投、顺为和线性资本联合投资。','Announced a first round of nearly USD 50 million from Horizon Robotics, GL Ventures, Xiaomi, Shunwei and Linear Capital.'),
  ],funding:[{date:'2026-03-20',round:l('首轮融资','First round'),amount:l('近 5000 万美元','Nearly USD 50 million'),investors:l('地平线、高瓴创投、小米战投、顺为资本、线性资本','Horizon Robotics, GL Ventures, Xiaomi, Shunwei Capital, Linear Capital'),sourceUrl:synapx}]},
  contactile: {founded:'2019',headquarters:l('澳大利亚悉尼','Sydney, Australia'),timeline:[
    event('2019','founding','https://contactile.com/about-contactile/','于 2019 年初成立；技术源于 UNSW Sydney，由 ARC 和美国 ONRG 支持的研究发展而来。科研资助不等于公司的股权融资。','Founded in early 2019 from UNSW Sydney technology supported by ARC and US ONRG research funding, which is not equivalent to company equity financing.'),
  ]},
  tacterion: {founded:'2015',headquarters:l('德国慕尼黑','Munich, Germany'),timeline:[
    event('2015','founding',tacterion,'Michael 与 Daniel Strohmayr 创建 DLR 衍生企业 tacterion。','Michael and Daniel Strohmayr founded tacterion as a DLR spin-off.'),
    event('2016','funding',tacterion,'取得 Unger Capital Management 支持；历史页面未列金额。','Received backing from Unger Capital Management; the historical page gives no amount.'),
    event('2019','product',tacterion,'开发 plyon flex 新版本，并开始 IPM 集成模块开发。','Developed a new plyon flex version and began IPM module development.'),
    event('2021','funding',tacterion,'完成 A 轮，引入 Miele 和一家未具名电动工具厂商作为战略投资者。','Completed Series A with Miele and an unnamed power-tool manufacturer as strategic investors.'),
    event('2022','product',tacterion,'推出 skillflow 可穿戴装配过程检测及配套 Tactile Brain 软件。','Introduced skillflow wearable assembly monitoring and supporting Tactile Brain software.'),
  ]},
  weart: {founded:'2018-12',timeline:[
    event('2018-12','founding',weart,'与产业伙伴 e-Novia 共同创建 WEART。','Founded WEART with industrial partner e-Novia.'),
    event('2020-11','funding',weart,'官网记载 pre-seed 轮为 750k；时间轴未标币种，不自动换算。','The official roadmap lists a 750k pre-seed round without a currency; no conversion is inferred.'),
    event('2021-09','product',weart,'推出 TouchDIVER。','Launched TouchDIVER.'),
    event('2023-11','funding',weart,'官网记载 CDP Venture Capital 参与第二轮投资，未列金额。','The roadmap records a second investment round involving CDP Venture Capital, without an amount.'),
    event('2024-06','product',weart,'推出 TouchDIVER Pro。','Launched TouchDIVER Pro.'),
  ]},
  sensodrive: {founded:'2003',headquarters:l('德国韦斯灵','Wessling, Germany'),timeline:[
    event('2003','founding',senso,'从 DLR 轻量机器人研究中衍生，推出扭矩传感器与方向盘模拟器。','Spun out from DLR lightweight robotics, introducing torque sensors and a steering-wheel simulator.'),
  ]},
  leptrino: {founded:'2001-10',headquarters:l('日本长野县佐久市','Saku, Nagano, Japan'),timeline:[
    event('2001-10','founding','https://www.leptrino.co.jp/company','公司成立；官网列示注册资本 1000 万日元。注册资本不是融资总额或估值。','Established in October 2001; the official page lists JPY 10 million capital, not total funding or valuation.'),
    event('2026-09-01','product','https://www.leptrino.co.jp/','FFS 系列加入 FFS100、125、160，并提供 IP67 定制选择。','Added FFS100, FFS125 and FFS160, with an IP67 customization option.'),
  ]},
  'wacoh-tech': {founded:'2007-07',headquarters:l('日本富山县高冈市','Takaoka, Toyama, Japan'),timeline:[
    event('2007-07','founding',wacoh,'WACOH-TECH 成立。','WACOH-TECH was established.'),
    event('2008-10','product',wacoh,'开始 DynPick 样品出货。','Began DynPick sample shipments.'),
    event('2012-04','founding',wacoh,'富山总部及工厂取得 ISO 9001 认证；不推断该历史认证即为当前证书状态。','Toyama headquarters/factory obtained ISO 9001 certification; this historical event does not establish current certificate validity.'),
  ]},
  photoneo: {founded:'2013',timeline:[
    event('2013','founding',photon,'由 Jan Zizka、Tomas Kovacovsky 和 Michal Maly 创立。','Founded by Jan Zizka, Tomas Kovacovsky and Michal Maly.'),
    event('2016','product',photon,'推出首款商用 PhoXi 3D Scanner。','Launched the first commercial PhoXi 3D Scanner.'),
    event('2018','product',photon,'推出 Bin Picking Studio。','Launched Bin Picking Studio.'),
    event('2020','product',photon,'推出 MotionCam 3D。','Launched MotionCam 3D.'),
    event('2022','product',photon,'推出匹配三维和 RGB 数据的 MotionCam-3D Color。','Introduced MotionCam-3D Color with corresponding 3D and RGB data.'),
    event('2025-03-05','funding','https://www.photoneo.com/photoneo-acquired-by-zebra-technologies/','公告确认加入 Zebra Technologies；属于收购事件，不作为独立上市公司或新增股权融资轮次。','Confirmed joining Zebra Technologies through acquisition, not an independent listing or new equity funding round.'),
  ]},
};
