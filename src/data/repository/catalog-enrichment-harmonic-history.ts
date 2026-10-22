import type { TimelineSeed } from './verified-catalog-wave-fourteen-common';

const l = (zh: string, en: string) => ({ zh, en });
const history = 'https://www.hds.co.jp/english/company/statutes/';

export const harmonicUsHistory: TimelineSeed[] = [
  {
    date: '1987-02', kind: 'business',
    title: l('美国业务前身HD Systems成立', 'US predecessor HD Systems established'),
    detail: l('日本母公司设立HD Systems拓展美国市场；这是前身业务节点，不是现有LLC的成立日期。', 'The Japanese parent established HD Systems for US expansion, a predecessor event rather than the current LLC incorporation.'),
    sourceUrl: history,
  },
  {
    date: '2005-12', kind: 'founding',
    title: l('Harmonic Drive LLC合资成立', 'Harmonic Drive LLC joint venture formed'),
    detail: l('HD Systems与Harmonic Drive Technologies Nabtesco合资设立美国LLC。', 'HD Systems and Harmonic Drive Technologies Nabtesco formed the US LLC.'),
    sourceUrl: history,
  },
  {
    date: '2021-02', kind: 'business',
    title: l('成为日本母公司的全资子公司', 'Became wholly owned by the Japanese parent'),
    detail: l('Harmonic Drive Systems收购Nabtesco持有的49%股权。这是股权收购，不是新增融资轮或美国公司收入。', 'Harmonic Drive Systems acquired Nabtesco’s 49% holding. This is an acquisition, not a funding round or US operating revenue.'),
    sourceUrl: history,
  },
];
