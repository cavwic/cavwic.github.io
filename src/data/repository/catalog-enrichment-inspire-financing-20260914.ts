import { l, type FundingSeed, type TimelineSeed } from './verified-catalog-wave-fourteen-common';

export const inspireFinancingSource = 'https://www.inspire-robots.com/about%20us/profile/';
export const inspireFinancingReviewedAt = '2026-09-14';
const rounds = [
  ['2016', '天使轮', 'Angel'],
  ['2017', 'Pre-A 轮', 'Pre-Series A'],
  ['2019', 'Pre-A+ 轮', 'Pre-Series A+'],
  ['2021', 'A 轮', 'Series A'],
  ['2022', 'B 轮', 'Series B'],
  ['2023', 'B+ 轮', 'Series B+'],
  ['2024', 'B2 轮', 'Series B2'],
] as const;

// Each year is paired with its own dl.row2 > dt / dd in the cached Chinese HTML.
// The English history independently corroborates 2017 Pre-A and 2023 B+.
export const inspireFinancingRounds: FundingSeed[] = rounds.map(([date, zh, en]) => ({
  date, round: l(zh, en),
  amount: date === '2024'
    ? l('超亿元（官网原文未注明币种）', 'Over 100 million (currency not specified in source)')
    : l('未披露', 'Undisclosed'),
  investors: l('官网未披露', 'Not disclosed on official profile'),
  sourceUrl: inspireFinancingSource,
}));
export const inspireFinancingTimeline: TimelineSeed[] = inspireFinancingRounds.map(round => ({
  date: round.date, kind: 'funding', sourceUrl: inspireFinancingSource, title: round.round,
  detail: round.date === '2024'
    ? l('公司史记载完成超亿元 B2 轮融资；原文未注明币种，未披露投资方。', 'The company history reports Series B2 financing of over 100 million; currency and investors are not specified.')
    : l(`公司史记载获得${round.round.zh}融资，金额和投资方未披露。`, `The company history records ${round.round.en} financing; amount and investors are undisclosed.`),
}));
export const inspireFinancingBoundary = l(
  '融资轮次依据公司官网逐年披露，不代表经审计财务报表。2024 年 B2 轮原文为“超亿元”，未明确币种；其余所列轮次未披露金额，均未列投资方，不推算估值或累计融资总额。',
  'Financing rounds follow the company history, not audited financial statements. The 2024 B2 claim is over 100 million without an explicit currency; other listed amounts and all investors are undisclosed. No valuation or cumulative funding total is inferred.',
);
export const inspireFinancingGap = {
  item: 'Financing disclosure detail',
  reason: 'Chronology corrected against the current Chinese primary history and corroborating English history: Pre-A+ belongs to 2019, not 2025. Most amounts, all investors, valuation and any defensible aggregate remain undisclosed. The 2024 B2 source says over 100 million without specifying currency. The former extraction error is archived in the dated review, not an active source conflict.',
  sourceUrl: inspireFinancingSource,
};
