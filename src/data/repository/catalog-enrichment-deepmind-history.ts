import type { WaveFourteenCompanySeed } from './verified-catalog-wave-fourteen-common';

const l = (zh: string, en: string) => ({zh, en});
const formation = 'https://deepmind.google/blog/announcing-google-deepmind/';
const robotics = 'https://deepmind.google/blog/gemini-robotics-brings-ai-into-the-physical-world/';
const robotics15 = 'https://deepmind.google/blog/gemini-robotics-15-brings-ai-agents-into-the-physical-world/';

export const deepmindHistory: Pick<WaveFourteenCompanySeed, 'founded' | 'timeline'> = {
  founded: '2010 / Google DeepMind 2023',
  timeline: [
    {date:'2010',kind:'founding',title:l('DeepMind成立','DeepMind founded'),detail:l('2023年公司公告回顾DeepMind于2010年成立；这不是合并后的Google DeepMind组织成立年份。','The 2023 announcement dates DeepMind to 2010, distinct from the later combined Google DeepMind organization.'),sourceUrl:formation},
    {date:'2023-04-20',kind:'business',title:l('宣布组建Google DeepMind','Google DeepMind formation announced'),detail:l('公告将DeepMind与Google Research的Brain团队合并为一个研发组织，不属于新的外部融资轮次。','The announcement combines DeepMind and Google Research’s Brain team into one research unit, not a new external funding round.'),sourceUrl:formation},
    {date:'2025-03-12',kind:'product',title:l('发布Gemini Robotics与ER研究','Gemini Robotics and ER introduced'),detail:l('分别面向机器人动作生成与具身推理；演示机器人和合作伙伴不作为自有硬件产品计算。','The models address robot action generation and embodied reasoning; demonstrated robots and partners are not counted as owned hardware products.'),sourceUrl:robotics},
    {date:'2025-09-25',kind:'product',title:l('发布Gemini Robotics 1.5系列','Gemini Robotics 1.5 introduced'),detail:l('发布VLA与ER 1.5，并宣布ER 1.5经AI Studio中的Gemini API提供。此处记录发布时的渠道，不保证历史版本当前仍可调用。','Introduced the VLA and ER 1.5, with ER 1.5 announced through the Gemini API in AI Studio. This records launch access, not continued availability of the historical version.'),sourceUrl:robotics15},
  ],
};
