import type { WaveFourteenCompanySeed } from './verified-catalog-wave-fourteen-common';

const l = (zh: string, en = zh) => ({zh, en});
export const beckhoffHistoryUrl = 'https://www.beckhoff.com/en-ca/company/technological-milestones/';
export const beckhoffResultsUrl = 'https://www.beckhoff.com/en-us/company/press/u-s-subsidiary-boosts-sales-by-10-1-to-record-133-5-million-in-revenue-2026-04.html';
export const beckhoffHistory: Pick<WaveFourteenCompanySeed, 'timeline'> = {
  timeline: [
    {date:'1980',kind:'founding',title:l('公司成立','Company founded'),detail:l('官网技术历程的起点。','Starting point in the official company chronology.'),sourceUrl:beckhoffHistoryUrl},
    ...[
      ['1986','PC控制','PC Control'],['1996','TwinCAT','TwinCAT'],['2003','EtherCAT','EtherCAT'],
      ['2012','XTS直线输送系统','XTS linear transport'],['2021','MX-System无控制柜架构','MX-System cabinet-free architecture'],
      ['2022','ATRO模块化机器人与视觉产品','ATRO modular robotics and Vision'],
      ['2024','TwinCAT L与PLC++','TwinCAT L and PLC++'],['2025','AM1000电机及ED系列I/O','AM1000 motors and ED-series I/O'],
    ].map(([date,zh,en])=>({date,kind:'product' as const,title:l(zh,en),detail:l('官网列示的技术里程碑年份，不表示所有型号于该年量产或交付。','Year listed in the official technology chronology, not proof that every model shipped that year.'),sourceUrl:beckhoffHistoryUrl})),
    {date:'2026-04-30',kind:'business',title:l('披露2025年度销售情况','2025 sales disclosed'),detail:l('全球收入12.4亿欧元，同比增长6%；美国子公司收入不能与集团数字相加，也不能视为机器人业务收入。','Global revenue of EUR1.24bn, up 6%; U.S. subsidiary revenue is neither additive to the group total nor robotics-segment revenue.'),sourceUrl:beckhoffResultsUrl},
  ],
};
