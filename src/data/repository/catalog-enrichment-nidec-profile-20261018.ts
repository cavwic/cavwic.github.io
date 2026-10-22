import type { WaveFourteenCompanySeed } from './verified-catalog-wave-fourteen-common';

const l = (zh: string, en: string) => ({ zh, en });
const outline = 'https://www.nidec.com/en/nidec-drivetechnology/corporate/outline/';
const history = 'https://www.nidec.com/en/nidec-drivetechnology/corporate/history/';
const products = 'https://www.nidec.com/en/nidec-drivetechnology/corporate/history3/';

export const nidecProfileAppend: Partial<WaveFourteenCompanySeed> = {
  founded: '1952-04-07',
  overview: [
    l('日本公司官网说明，其实际创立日为1952年4月7日，因与存续公司合并，登记设立日为1946年10月31日。1995年加入尼得科集团，1997年使用 Nidec-Shimpo 名称，2023年4月更名 NIDEC DRIVE TECHNOLOGY CORPORATION。现总部位于京都府向日市 Nidec Park；2026年1月的地址表示调整不是再次搬迁。', 'The Japanese company states that operations were effectively established on April 7, 1952; the registered date is October 31, 1946 because of a merger with a surviving company. It joined Nidec in 1995, adopted the Nidec-Shimpo name in 1997 and became NIDEC DRIVE TECHNOLOGY CORPORATION in April 2023. Its headquarters is at Nidec Park in Muko, Kyoto; the January 2026 address-format update was not another relocation.'),
    l('公司概要披露2026年3月资本金37.96亿日元、合并员工3,332人，以及截至2026年3月财年的销售额1,055亿日元。以上为该公司概要中的口径，并非整个尼得科集团数据，也不能拆分成机器人减速器收入；网页概要不是独立审计意见。产品历程显示，业务从伺服减速器延伸至 AGV 驱动、FLEXWAVE、CORONEX 和集成传感器的 Smart-FLEXWAVE。', 'The company outline reports capital of JPY3.796 billion and 3,332 consolidated employees as of March 2026, plus sales of JPY105.5 billion for the year ending March 2026. These figures belong to this company outline, not the entire Nidec group or a separately disclosed robot-reducer business; the webpage is not an independent audit opinion. Product history extends from servo reducers to AGV drives, FLEXWAVE, CORONEX and sensor-equipped Smart-FLEXWAVE.'),
  ],
  timeline: [
    {date:'1952-04-07',kind:'founding',title:l('Shimpo 实际创立','Shimpo operating foundation'),detail:l('公司概要给出的实际创立日；同页注明因合并，登记设立日为1946年10月31日。', 'The effective foundation date in the company outline; the registered date is October31,1946 due to a merger.'),sourceUrl:outline},
    {date:'1994-04',kind:'product',title:l('ABLE VR 伺服减速器','ABLE VR servo reducer'),detail:l('产品沿革列出 VR 系列，不将此日期视为所有后续 ABLE 型号的发布日。','Product history lists the VR series, not the release date of every later ABLE model.'),sourceUrl:products},
    {date:'1995-02',kind:'business',title:l('加入尼得科集团','Joined the Nidec group'),detail:l('企业沿革记载被 Nidec 收购；该事件不是一轮外部风险融资。','The corporate chronology records acquisition by Nidec, not an external venture funding round.'),sourceUrl:history},
    {date:'1997-10',kind:'business',title:l('更名 Nidec-Shimpo','Renamed Nidec-Shimpo'),detail:l('企业沿革记载商号变更。','The corporate chronology records the trade-name change.'),sourceUrl:history},
    {date:'2007-08',kind:'product',title:l('AGV 驱动单元','AGV driving unit'),detail:l('产品沿革列出 AGV 驱动单元；不据此推定现款产品配置。','Product history lists an AGV driving unit without establishing present-model configurations.'),sourceUrl:products},
    {date:'2015-06',kind:'product',title:l('FLEXWAVE 系列','FLEXWAVE series'),detail:l('产品沿革列出精密控制用 FLEXWAVE 减速器。','Product history lists FLEXWAVE reducers for precision control.'),sourceUrl:products},
    {date:'2015-10',kind:'product',title:l('CORONEX 系列','CORONEX series'),detail:l('产品沿革列出精密控制用 CORONEX 内部行星减速器。','Product history lists CORONEX internal planetary reducers for precision control.'),sourceUrl:products},
    {date:'2016-04',kind:'product',title:l('S-CART AGV','S-CART AGV'),detail:l('产品沿革列出 S-CART；历史发布不等同于当前地区仍可订购。','Product history lists S-CART; historical introduction does not prove current regional orderability.'),sourceUrl:products},
    {date:'2022-07',kind:'business',title:l('总部迁入 Nidec Park','Headquarters moved to Nidec Park'),detail:l('企业沿革记载迁至京都府向日市。2026年的地址格式调整不另记为搬迁。','The chronology records the move to Muko, Kyoto. The2026 address-format revision is not another move.'),sourceUrl:history},
    {date:'2023-04',kind:'business',title:l('启用现公司名称','Adopted the current company name'),detail:l('商号改为 NIDEC DRIVE TECHNOLOGY CORPORATION，不与尼得科母公司或其他子公司的更名混同。','The name became NIDEC DRIVE TECHNOLOGY CORPORATION, distinct from changes at the parent or other subsidiaries.'),sourceUrl:history},
    {date:'2024-01',kind:'product',title:l('KINEX 大型精密减速器','KINEX large precision reducers'),detail:l('公司产品沿革列出 KINEX 系列。','The company product chronology lists KINEX.'),sourceUrl:products},
    {date:'2024-12',kind:'product',title:l('Smart-FLEXWAVE','Smart-FLEXWAVE'),detail:l('产品沿革列出内置多传感器的 Smart-FLEXWAVE；传感器指标仍按具体型号查看。','Product history lists multisensor Smart-FLEXWAVE; sensor ratings remain model-specific.'),sourceUrl:products},
  ],
};
