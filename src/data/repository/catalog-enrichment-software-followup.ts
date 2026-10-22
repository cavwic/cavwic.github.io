import type { CatalogEnrichmentProduct } from './catalog-enrichment-types';
import type { WaveFourteenCompanySeed } from './verified-catalog-wave-fourteen-common';
import editionTables from './software-edition-tables.json';

const l = (zh: string, en = zh) => ({ zh, en });
const difyFunding = 'https://dify.ai/blog/dify-raises-30m-tomorrow-s-organizations-will-be-built-by-people-and-agents';
const ragChangelog = 'https://ragflow.io/changelog';
const fastTimeline = 'https://doc.fastgpt.cn/en/self-host/upgrading/version-timeline';
export const softwareFollowupSources = {
  langgenius: [difyFunding, 'https://dify.ai/about-us', 'https://www.dify.ai/legal/terms-of-service'],
  infiniflow: ['https://ragflow.io/', ragChangelog, 'https://ragflow.io/solutions/manufacturing'],
  labring: [editionTables.sourceUrl, fastTimeline, 'https://doc.fastgpt.cn/en/self-host/upgrading/outdated/465'],
};

export function applySoftwareFollowup(products: CatalogEnrichmentProduct[], profiles: Record<string, Partial<WaveFourteenCompanySeed>>) {
  const fast = products.find(p => p.id === 'catalog-labring-fastgpt')!;
  const shared = fast.rows.filter(row => ['Knowledge inputs', 'Data preparation', 'Retrieval', 'Workflows', 'Tool protocol', 'License'].includes(row.label.en));
  for (const [index, edition] of editionTables.editions.entries()) {
    const name = ['FastGPT Community', 'FastGPT Commercial', 'FastGPT Cloud'][index];
    const record: CatalogEnrichmentProduct = {
      ...fast,
      id: index === 0 ? fast.id : `catalog-labring-${name.toLowerCase().replaceAll(' ', '-')}`,
      product: name,
      pageUrl: index === 0 ? fast.pageUrl : editionTables.sourceUrl + '#feature-comparison',
      rows: [...shared.map(row => ({...row, conditions: l('项目基础能力；具体版本权限以本页版本对照条目为准。', 'Project-level capabilities; edition-specific availability is stated separately.')})), ...edition.rows],
      overview: [l(`${name} 对应官方版本对照表中的 ${edition.edition}。社区自部署、商业交付和云服务的权限不同；本条目逐项保存支持、不包含、设计中及不需要四种状态。`, `${name} maps to ${edition.edition} in the official comparison. Self-hosted community, commercial and cloud delivery have different entitlements; supported, excluded, planned and not-needed states are preserved separately.`),
        l('知识库、工作流、模型接入与接口集成构成基础能力。发布控制、评测、索引增强、组织权限和单点登录必须按选定版本核对，不能把代码仓库的综合功能清单视为社区版全部可用。', 'Retrieval, workflows, model access and APIs form the base. Publishing controls, evaluation, index enhancements, organizational access and SSO depend on edition, rather than the repository-wide feature summary.')],
      sourceLinks: [...(fast.sourceLinks ?? []), {label: l('该版本官方功能对照', 'Official edition comparison'), url: editionTables.sourceUrl + '#feature-comparison'}],
    };
    if (index === 0) Object.assign(fast, record);
    else products.push(record);
  }

  const rag = products.find(p => p.product === 'RAGFlow')!;
  const sourceUrl = 'https://ragflow.io/';
  const sha = '012d5a44d83816efc17f494447118122bf2f8a764a73467120a64d6842d3eeee';
  const labels = [['应用数量', 'Apps'], ['团队成员', 'Team members'], ['知识库存储', 'Dataset storage'], ['月度点数', 'Monthly credits'], ['API密钥', 'API key']];
  for (const [name, values] of [
    ['Free', ['5', '1', '0.1 GB', '500', 'Not available']],
    ['Starter', ['50', '5', '5 GB', '5,000', 'Available']],
    ['Pro', ['Unlimited', '20', '50 GB', '20,000', 'Available']],
  ] as const) {
    products.push({...rag, id: `catalog-infiniflow-ragflow-cloud-${name.toLowerCase()}`, product: `RAGFlow Cloud ${name}`, pageUrl: sourceUrl + '#pricing-plan',
      rows: values.map((value, i) => ({label: l(...labels[i] as [string, string]), value: l(value === 'Not available' ? '不提供' : value === 'Available' ? '提供' : value === 'Unlimited' ? '不限数量（以服务条款为准）' : value, value),
        sourceUrl, sourceLabel: l('官方云服务方案', 'Official cloud plans'), locator: l(`Scale Your Business / ${name} / ${labels[i][1]}; SHA-256 ${sha}`),
        conditions: l('云服务计划配额，不是本地部署性能或硬件容量；服务计划可能调整。', 'Cloud-plan quota, not local deployment performance or hardware capacity. Plans may change.'), excludeFromNumericIndex: true})),
      overview: [l(`RAGFlow Cloud ${name} 是托管服务计划，公开列示应用数、成员数、知识库存储、月度点数和API密钥权限。平台负责托管，不沿用开源自部署版本的CPU和内存最低配置作为该计划性能。`, `RAGFlow Cloud ${name} is a hosted plan with published app, member, dataset-storage, monthly-credit and API-key allowances. Self-hosted CPU/RAM minima are not performance specifications for this service.`),
        l('公开页面同时显示不同价格，未清楚对应本次使用者的计费周期与促销资格，因此不合并成单一报价。采购时须确认计费、模型消耗、数据驻留和导出条件。', 'The page displays multiple prices without establishing the reader’s billing period or promotion eligibility. No single price is inferred; confirm billing, model consumption, data location and export conditions.')],
      sourceLinks: [{label: l('该产品云服务方案', 'Cloud service plans'), url: sourceUrl + '#pricing-plan'}, ...(rag.sourceLinks ?? [])],
    });
  }
  products.push({...rag, id: 'catalog-infiniflow-ragflow-enterprise', product: 'RAGFlow Enterprise', pageUrl: sourceUrl + '#pricing-plan',
    rows: [['部署', 'Deployment', 'BYOC / On-premises'], ['支持', 'Support', 'Dedicated support'], ['服务级别', 'Service level', 'Custom SLA']].map(([zh, en, value]) => ({label: l(zh, en), value: l(value), sourceUrl, sourceLabel: l('官方企业方案', 'Official enterprise plan'), locator: l(`Scale Your Business / Enterprise / ${en}; SHA-256 ${sha}`), excludeFromNumericIndex: true})),
    overview: [l('RAGFlow Enterprise 的公开交付范围为客户云部署、本地部署、专属支持和定制服务级别。页面没有统一列出应用量、存储量和并发量，不能把其他云计划的配额套入。', 'RAGFlow Enterprise lists customer-cloud and on-premises delivery, dedicated support and custom service levels. No standard app, storage or concurrency allowance is published on this page; other cloud-plan quotas are not applied.')],
    sourceLinks: [{label: l('该产品企业服务方案', 'Enterprise service plan'), url: sourceUrl + '#pricing-plan'}],
  });
  profiles.langgenius.legalName = 'LangGenius, Inc.';
  profiles.langgenius.founded = '2023';
  profiles.langgenius.aboutUrl = 'https://dify.ai/about-us';
  profiles.langgenius.headquarters = l('美国加州Menlo Park（官网列示总部）；另有东京、苏州和上海团队', 'Menlo Park, California, listed as HQ; additional teams in Tokyo, Suzhou and Shanghai');
  profiles.langgenius.overview!.push(l('创始人于2026年3月10日公告披露3000万美元Pre-A轮融资，由HSG领投，GL Ventures、Alt-Alpha Capital、5Y Capital、Mizuho Leaguer Investment和NYX Ventures参与。它是公司公告的融资金额，不是营业收入。', 'The founder’s March 10, 2026 announcement reports a USD30m Pre-A led by HSG with GL Ventures, Alt-Alpha Capital, 5Y Capital, Mizuho Leaguer Investment and NYX Ventures. This is company-reported funding, not revenue.'));
  profiles.langgenius.timeline = [
    {date: '2023-03', kind: 'founding', title: l('Dify创立', 'Dify founded'), detail: l('创始人融资公告回顾了2023年3月创立Dify的时间，不据此推定各地法人注册日。', 'The founder dates Dify’s founding to March 2023; this does not establish each legal entity’s incorporation date.'), sourceUrl: difyFunding},
    {date: '2026-03-10', kind: 'funding', title: l('宣布3000万美元Pre-A轮融资', 'USD30m Pre-A announced'), detail: l('公司公告列示HSG领投及五家参与投资机构。', 'The company names HSG as lead and five participating investors.'), sourceUrl: difyFunding},
  ];
  profiles.langgenius.funding = [{date: '2026-03-10', round: l('Pre-A（公司公告）', 'Pre-A (company announcement)'), amount: 'USD 30 million', investors: l('HSG；GL Ventures、Alt-Alpha Capital、5Y Capital、Mizuho Leaguer Investment、NYX Ventures'), sourceUrl: difyFunding}];
  profiles.langgenius.investmentView = [l('判断：商业化观察重点是付费部署留存、企业交付成本与外部模型费用。官网列示的1.8亿美元估值属于公司自身披露，不能替代交易文件，也不构成当前可成交股权价格。', 'Assessment: monitor paid-deployment retention, enterprise delivery costs and external-model spending. The website’s USD180m valuation is self-reported, not a substitute for transaction documents or a currently executable equity price.')];
  profiles.infiniflow.products = ['RAGFlow', 'Infinity', 'RAGFlow Cloud Free', 'RAGFlow Cloud Starter', 'RAGFlow Cloud Pro', 'RAGFlow Enterprise'];
  profiles.infiniflow.overview!.push(l('官方服务目录增加托管云与企业部署。制造业示例围绕设备手册和维护知识检索，不是机器人实时控制；Free、Starter和Pro按公开配额分列，企业方案按部署与支持条件单独记录。', 'The official service catalog also includes hosted and enterprise delivery. Its manufacturing example concerns manuals and maintenance knowledge, not real-time robot control. Free, Starter and Pro are separated by published quotas; enterprise delivery has its own deployment/support terms.'));
  profiles.infiniflow.timeline = [
    {date: '2026-08-19', kind: 'product', title: l('RAGFlow 0.27.0发布', 'RAGFlow 0.27.0 released'), detail: l('发布说明增加知识编译与四档Agentic RAG思考模式；旧GraphRAG和RAPTOR界面被Graph和Tree替代，既有内容仍可检索。', 'Release notes add knowledge compilation and four Agentic RAG thinking modes. Graph/Tree replace the older GraphRAG/RAPTOR UI while existing content remains searchable.'), sourceUrl: ragChangelog},
    {date: '2026-08-28', kind: 'product', title: l('RAGFlow 0.27.1发布', 'RAGFlow 0.27.1 released'), detail: l('增加Azure DevOps数据连接，并扩展检索API候选数量控制与元数据过滤。', 'Adds an Azure DevOps connector and retrieval-API candidate controls with metadata filtering improvements.'), sourceUrl: ragChangelog},
  ];
  profiles.labring.products = ['FastGPT Community', 'FastGPT Commercial', 'FastGPT Cloud'];
  profiles.labring.overview!.push(l('官方版本对照表列出22个功能与授权项目：社区版不包含应用评测等部分企业功能；云端自定义品牌和SSO标为设计中。商业版允许增强部署及支持，实际权益取决于版本和协议。', 'The official comparison lists 22 feature/license items. Community excludes several enterprise capabilities such as app evaluation; cloud branding and SSO are marked in design. Commercial delivery adds deployment/support options subject to version and contract.'));
  profiles.labring.timeline = [
    {date: '2023-12-25', kind: 'product', title: l('FastGPT 4.6.5发布', 'FastGPT 4.6.5 released'), detail: l('官方升级说明增加查询改写等节点，并调整工具调用配置。该日期是软件版本事件，不是公司成立日期。', 'Upgrade notes add query-rewriting and other nodes and revise tool-call configuration. This is a software event, not a company founding date.'), sourceUrl: softwareFollowupSources.labring[2]},
    {date: '2026-08-22', kind: 'product', title: l('FastGPT 4.16.1发布', 'FastGPT 4.16.1 released'), detail: l('官方发布历程标注该版本日期，并提示配置与迁移要求；不是对最新版本的永久声明。', 'The official release timeline records this date with configuration/migration requirements; it is not a permanent latest-version claim.'), sourceUrl: fastTimeline},
  ];
}
