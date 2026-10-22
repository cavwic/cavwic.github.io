import raw from './catalog-enrichment-cubemars-data.json';
import type { CatalogEnrichmentGroup, CatalogEnrichmentProduct } from './catalog-enrichment-types';
import { l } from './verified-catalog-wave-fourteen-common';

const catalog = 'https://www.cubemars.com/categorys/product';
const about = 'https://www.cubemars.com/about-us.html';
const home = 'https://www.cubemars.com/';

export const cubemarsCatalogEnrichment: CatalogEnrichmentGroup = {
  profiles: {
    cubemars: {
      legalName:'Nanchang Kude Intelligent Technology Co., Ltd.',
      officialUrl:home, aboutUrl:about, country:l('中国','China'), headquarters:l('江西南昌','Nanchang, Jiangxi'),
      founded:'2018',
      products:['AK / AKA / AKH / AKE','RI / RO','G / GL','DW / SW / W','TW ESC','Rubik Link / S-Link'],
      role:l('机器人电机、关节模组与配套驱动供应商','Supplier of robotic motors, joint modules and associated drives'),
      positioning:l('从无框电机到带减速器及反馈的一体化执行器','From frameless motors to integrated geared actuators with feedback'),
      overview:[
        l('CubeMars 是南昌三瑞智能旗下的机器人动力品牌，官网将运营主体列为南昌酷德智能科技有限公司。品牌历程从 2018 年起算，母公司的历史从 2009 年起算，两者不混同。', 'CubeMars is a robotic-power brand within the Sanrui group, operated by Nanchang Kude Intelligent Technology. Its brand history starts in 2018, distinct from the parent company history beginning in 2009.'),
        l('产品架构包括 AK、AKA、AKH、AKE 关节执行器，RI 内转子及 RO 外转子无框电机，G、GL 云台电机，以及水下推进器、电调、驱动板与调试配件。无框电机需要用户完成轴承、壳体、反馈和驱动集成；关节执行器也需要按代际确认接口与供电。', 'The catalog spans AK, AKA, AKH and AKE actuators; RI inrunner and RO outrunner frameless motors; G and GL gimbal motors; and underwater propulsion, ESCs, driver boards and commissioning accessories. Frameless motors require bearing, housing, feedback and drive integration. Actuator supply and interfaces remain generation-specific.'),
        l('选型判断：这一组合适合需要在电机本体和集成关节之间权衡的研发团队。是否适用于具体机械臂、外骨骼或水下平台，应以负载谱、安装空间、热设计和安全要求验证，不由产品系列名称直接推出。', 'Selection assessment: this range supports development teams choosing between motor-level integration and assembled joints. Suitability for a particular arm, exoskeleton or underwater platform depends on duty cycles, installation space, thermal design and safety requirements, not the series name alone.'),
      ],
      businessAreas:[l('机器人关节与无框力矩电机','Robot joints and frameless torque motors'),l('云台及视觉系统驱动','Gimbal and vision-system actuation'),l('水下推进与配套驱动','Underwater propulsion and associated drives')],
      customerGroups:[l('机器人本体及关节研发团队','Robot and joint development teams'),l('工业自动化与运动控制集成团队','Automation and motion-control integrators'),l('外骨骼、云台和水下系统研发团队','Exoskeleton, gimbal and subsea-system developers')],
      strengths:[l('电机与配套执行器覆盖多个集成层级','Motor and actuator options at several integration levels'),l('公开型号表列出电磁、机械及接线字段','Model tables expose electromagnetic, mechanical and wiring fields')],
      fit:[l('需要型号级参数核对与驱动配套的运动系统','Motion systems requiring model-level checks and compatible drives')],
      catalogScope:l('本次核对 80 个可访问的官方产品页面，按型号、绕组、代际及配件拆分。已转录可读规格表和核心参数；下载资料、图纸公差及定制选项仍需按实际选型补查，不能将本次范围宣称为全部工程规格。', 'This review covers 80 accessible official product pages, separated by model, winding, generation and accessory. Readable specification tables and core data are transcribed; downloadable documents, drawing tolerances and custom options still require model-specific review, so this scope is not all engineering specifications.'),
      verificationFocus:l('供电、热边界、峰值持续时间、代际兼容、接口及安全集成','Supply, thermal limits, peak duration, generation compatibility, interfaces and safety integration'),
      presalesQuestions:[
        l('实际占空比与环境温度下，允许的连续扭矩和峰值持续时间是什么？','What continuous torque and peak duration apply at the intended duty cycle and ambient temperature?'),
        l('所选绕组、编码器、驱动板固件及线束是否属于同一兼容配置？','Do the winding, encoder, drive firmware and harness belong to a compatible configuration?'),
        l('需要补充哪些安装公差、密封条件、寿命或安全文件，才能完成整机验证？','Which installation tolerances, sealing limits, life or safety documents are needed to validate the complete machine?'),
      ],
      catalogTitle:l('CubeMars 官方型号目录','CubeMars official model catalog'),
      timeline:[
        {date:'2018',title:l('品牌建立','Brand established'),detail:l('官网品牌历程将 CubeMars 的建立时间列为 2018 年。','The official brand timeline dates the establishment of CubeMars to 2018.'),sourceUrl:home,kind:'founding'},
        {date:'2019',title:l('AK 系列推出','AK series introduced'),detail:l('官方历程记载推出首代 AK 系列，组合电机、减速器、驱动器和编码器。','The timeline records the first AK series integrating a motor, gearbox, drive and encoder.'),sourceUrl:home,kind:'product'},
        {date:'2021',title:l('产品线扩展','Product-line expansion'),detail:l('官网记录持续优化动力系统并扩展产品线。','The official history records motor-system development and catalog expansion.'),sourceUrl:home,kind:'product'},
        {date:'2024',title:l('人形机器人关节开发','Humanoid joint development'),detail:l('官网称该年形成面向人形机器人关节模组的开发和量产能力；这是厂商自述，并非独立产能审计。','The manufacturer reports developing humanoid-joint production capability; this is a company statement, not an independent capacity audit.'),sourceUrl:home,kind:'product'},
      ],
      investmentView:[l('观察重点是具体型号的重复采购、交付一致性和客户验证，而不是将品牌网页上的集团规模或产能直接等同于机器人业务收入。','Assess repeat model orders, delivery consistency and customer validation rather than equating group scale or capacity claims with robotic-business revenue.')],
    },
  },
  products:raw.products as CatalogEnrichmentProduct[],
  reviews:[{
    slug:'cubemars',reviewedAt:'2026-09-06',catalogUrls:[catalog,'https://www.cubemars.com/sitemap.html'],
    reviewedProductUrls:[...new Set(raw.products.map(product=>product.pageUrl))],status:'reviewed-partial',
    scope:l('80 个官方产品页及其中型号表；页面可读字段已录入，工程附件仍需补查。','80 official product pages and their model tables; readable page fields are recorded and engineering attachments remain to be reviewed.'),
    gaps:[...raw.gaps,{item:'Engineering attachments and options',reason:'Downloaded manuals, drawing-only tolerances and unlisted custom configurations have not all been audited.'}],
  }],
};
