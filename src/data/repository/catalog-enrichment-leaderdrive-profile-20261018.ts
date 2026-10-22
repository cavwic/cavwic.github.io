import type { WaveFourteenCompanySeed } from './verified-catalog-wave-fourteen-common';

const l = (zh: string, en: string) => ({ zh, en });
const profile = 'https://www.leaderdrive.com/about/profile.html';
const ciif = 'https://www.leaderdrive.com/news/28.html';
const prospectus = 'https://static.sse.com.cn/stock/disclosure/announcement/c/202006/000395_20200607_XR3C.pdf#page=39';

export const leaderdriveProfileAppend: Partial<WaveFourteenCompanySeed> = {
  founded: '2011-01-13',
  overview: [
    l('2025年工博会预告把具身机器人相关方向进一步细化为灵巧手和腕部用微型谐波减速器、KGU 旋转执行器及倒置式行星滚柱丝杠。判断：这反映旋转与直线传动的组合布局；展会预告不是交付证明，不能据系列名称推演全部可订购配置，也不能直接将这些方案视为完整机器人关节。', 'The 2025 CIIF preview describes miniature harmonic reducers for hands and wrists, KGU rotary actuators and inverted planetary roller screws. Assessment: this indicates a combination of rotary and linear transmission offerings. An exhibition preview is not delivery evidence, an exhaustive ordering matrix or proof of a complete robot joint.'),
  ],
  timeline: [
    {date:'2003',kind:'product',title:l('谐波传动早期研发','Early strain-wave development'),detail:l('官网历程将基础齿形和减速器研发追溯到2003年；不是现法律实体的登记成立日期。','The company chronology dates basic gear-profile and reducer development to 2003, not incorporation of the present legal entity.'),sourceUrl:profile},
    {date:'2011-01-13',kind:'founding',title:l('有限公司成立','Limited company established'),detail:l('招股说明书发行人基本信息表列明有限公司成立日期；与2003年研发起点、2018年股份公司设立分别记录。','The prospectus issuer-information table states the limited-company formation date, distinct from the 2003 development origin and 2018 joint-stock incorporation.'),sourceUrl:prospectus},
    {date:'2013',kind:'product',title:l('形成标准化系列','Standardized product series'),detail:l('官网历程记载形成14个标准系列并进入机器人客户应用；不据此推定现有所有型号的首发时间。','The chronology records 14 standardized series and robot-customer applications; this is not a launch date for every current model.'),sourceUrl:profile},
    {date:'2018-10-29',kind:'business',title:l('股份公司设立','Joint-stock company established'),detail:l('招股说明书列明股份公司设立日期；不是业务最初创立日，也不是2020年上市日。','The prospectus states the joint-stock incorporation date, not the original business formation or the 2020 stock-market listing.'),sourceUrl:prospectus},
    {date:'2020',kind:'business',title:l('科创板上市与新工厂','STAR Market listing and new factory'),detail:l('官网将科创板上市及迁入新工厂列于2020年。不把工厂投入使用等同于满产。','The chronology places STAR Market listing and a new-factory move in 2020, without establishing full capacity utilization.'),sourceUrl:profile},
    {date:'2025',kind:'business',title:l('扩展系列与协同产品','Expanded series and joint offerings'),detail:l('官网年度历程列出21个系列及与子公司推出新产品。该页面不是审计财报，系列数量不等于独立订货型号数。','The annual chronology lists 21 series and new offerings with subsidiaries. It is not audited reporting; series are not individual orderable models.'),sourceUrl:profile},
    {date:'2025-09-21',kind:'business',title:l('发布工博会参展预告','Published CIIF participation preview'),detail:l('网页发布日期为9月21日，正文另标9月23日并预告9月23日至27日展会；介绍微型减速器、KGU 执行器和倒置式行星滚柱丝杠，不据此认定实际参展、上市或批量交付。','The page is dated September 21; its body separately states September 23 and previews the September 23-27 fair. It describes miniature reducers, KGU actuators and inverted planetary roller screws, not confirmed attendance, launch or volume delivery.'),sourceUrl:ciif},
  ],
};
