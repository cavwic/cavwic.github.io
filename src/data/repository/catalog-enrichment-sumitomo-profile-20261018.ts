import type { WaveFourteenCompanySeed } from './verified-catalog-wave-fourteen-common';

const l = (zh: string, en: string) => ({ zh, en });
const history = 'https://japan.sumitomodrive.com/en-jp/our-history';
const brand = 'https://us.sumitomodrive.com/en-us/news/celebrating-20-years-our-global-brand';
const invertek = 'https://www.shi.co.jp/english/info/2019/6kgpsq0000002el0.html';
const sps = 'https://emeia.sumitomodrive.com/en-gb/news/sps_parma_2026';

export const sumitomoProfileAppend: Partial<WaveFourteenCompanySeed> = {
  overview: [
    l('Sumitomo Drive Technologies 是住友重机械传动与控制业务的全球品牌，2003年10月1日启用，并非同年新成立的独立机器人公司。其业务根源可追溯至1888年的别子铜矿机械修造业务，1939年在日本开始制造 Cyclo 减速器，1984年沿革记载推出精密控制用 Cyclo 机构。历史沿革、品牌启用和具体产品发布时间应分别理解。', 'Sumitomo Drive Technologies is the global brand of Sumitomo Heavy Industries power transmission and controls, introduced on October 1, 2003, not a standalone robotics company founded that year. Its industrial roots include the Besshi mine machinery workshop in 1888, Japanese Cyclo production in 1939 and a precision-control Cyclo mechanism introduced in 1984. These are distinct from the brand launch and individual model releases.'),
    l('机器人相关业务包括精密减速传动，以及面向 AGV/AMR 的减速器、电机和控制器组合。2018年纳入 Lafert 电机业务、2019年公告收购 Invertek 的安排，体现其从机械传动延伸到电机与控制的业务方向；收购不是该品牌的一轮外部融资。选型时应按型号确认接口、承载与供货组合，不能仅凭集团具备相关技术就视为任一产品标配。', 'The robotics scope includes precision transmissions and gearbox, motor and controller packages for AGVs and AMRs. The 2018 addition of Lafert and the 2019 announced Invertek acquisition reflect expansion from mechanical transmission into motors and controls, not external funding rounds for this brand. Selection still requires model-specific interface, load and supply-configuration checks; group capabilities are not standard features of every product.'),
  ],
  businessAreas: [
    l('精密传动：机器人及定位机构使用的精密减速器、伺服减速传动与相关机械接口。', 'Precision transmission: precision reducers, servo gearboxes and mechanical interfaces for robotics and positioning.'),
    l('移动机器人驱动：smartris 将减速器、伺服电机与控制器组合用于 AGV/AMR；具体配置按型号核对。', 'Mobile-robot drives: smartris combines a gearbox, servomotor and controller for AGVs/AMRs, with model-specific configurations.'),
  ],
  customerGroups: [
    l('工业机器人、协作机器人及精密定位设备的制造与集成团队。', 'Manufacturers and integrators of industrial robots, collaborative robots and precision positioning equipment.'),
    l('AGV/AMR 制造商与物流搬运自动化集成方；这是公开应用方向，并非已核实客户名单。', 'AGV/AMR manufacturers and material-handling automation integrators; these are public application groups, not a verified named-customer list.'),
  ],
  timeline: [
    { date: '1888', kind: 'business', title: l('机械修造业务起点', 'Machinery-workshop origins'), detail: l('官方沿革将业务起源追溯到别子铜矿机械修造业务，不将此年写成现有全球品牌的启用年。', 'The official chronology traces industrial roots to the Besshi mine machinery workshop, not the launch of the present global brand.'), sourceUrl: history },
    { date: '1939', kind: 'product', title: l('在日本开始制造 Cyclo 减速器', 'Cyclo production starts in Japan'), detail: l('官方沿革记载新居滨工厂开始在日本制造 Cyclo 减速器；不据此推定当前型号参数。', 'The chronology records Cyclo production at Niihama Works in Japan; this does not establish specifications of current models.'), sourceUrl: history },
    { date: '1984', kind: 'product', title: l('推出精密控制用 Cyclo 机构', 'Precision-control Cyclo mechanism introduced'), detail: l('官方沿革列出精密控制用机构的发布，不等同于当前全部 Fine Cyclo 系列在该年上市。', 'The chronology lists a precision-control mechanism release, not the introduction date of every current Fine Cyclo series.'), sourceUrl: history },
    { date: '2003-10-01', kind: 'founding', title: l('全球品牌启用', 'Global brand introduced'), detail: l('住友重机械传动与控制业务以 Sumitomo Drive Technologies 统一全球品牌；这是品牌节点，不是新设独立法人或融资。', 'The power transmission and controls businesses adopted Sumitomo Drive Technologies as a global brand. This is a branding milestone, not a new standalone legal entity or funding event.'), sourceUrl: brand },
    { date: '2018', kind: 'business', title: l('Lafert 纳入集团', 'Lafert joins the group'), detail: l('官方沿革记载意大利电机厂商 Lafert 成为全资子公司，扩展电机相关业务；不填入未经本轮核对的交易金额。', 'The chronology records Italian motor manufacturer Lafert becoming wholly owned, extending motor capabilities; no unreviewed transaction value is added.'), sourceUrl: history },
    { date: '2019-09-27', kind: 'business', title: l('公告 Invertek 收购协议', 'Invertek acquisition agreement announced'), detail: l('母公司公告达成收购全部股本的协议，当时预计11月上旬交割；本节点是协议公告，不把预计交割日当作已完成事实。', 'The parent announced an agreement to acquire all issued shares, with closing then expected in early November. This event records the agreement, not an assumed completed closing.'), sourceUrl: invertek },
    { date: '2026-04-21', kind: 'product', title: l('预告 Fine Cyclo B 与 smartris 新配置', 'Fine Cyclo B and new smartris configuration previewed'), detail: l('SPS Italia 展前公告介绍 FC-B KIT、带主轴承的 F4C-B 和搭配 Compact Plus 控制器的 smartris。保留展前公告性质，不由此推定所有配置已交付。', 'The pre-show announcement introduces FC-B KIT, main-bearing-equipped F4C-B and smartris with Compact Plus. It does not confirm delivery of every configuration.'), sourceUrl: sps },
  ],
};
