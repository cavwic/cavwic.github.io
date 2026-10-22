const checks = [
  [/(?<![\w.])(?:\+?86[-\s]?)?1[3-9]\d{9}(?![\w.])/u, '手机号'],
  [/戴尔/u, '客户名称'],
  [/(?:合同金额|项目金额)(?:\s|[:：为是约]|人民币|RMB|CNY|USD|￥|¥|\$){0,12}\d|原始标书|内部截图|联系人姓名/u, '敏感业务描述'],
];

export function findPrivacyIssues(text) {
  return checks.filter(([pattern]) => pattern.test(text)).map(([, label]) => label);
}
