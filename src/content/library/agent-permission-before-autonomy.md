---
title: "先明确权限，再让 Agent 自主执行"
description: "企业 Agent 的关键不是能调用多少工具，而是每个动作是否可授权、可观察、可撤销并能转交人工。"
locale: zh
kind: article
industry: ai
evidence: [公开资料研究, 分析判断]
publicationStatus: published
date: 2026-08-14
reviewedAt: 2026-08-14
featured: false
tags: [Agent, 权限, 安全]
sourceIds: [ref-05, ref-06, ref-14, ref-41, ref-43, ref-44, job-15, job-20]
alternatePath: /en/library/agent-permission-before-autonomy
---

## 观点

“让 Agent 自己完成”不是产品能力描述，而是一组权限承诺。读取客户资料、发邮件、改订单和删除记录，风险完全不同，不能共用一句“支持工具调用”。

每个动作应有单独的授权模型：谁可以发起，模型可以决定什么，规则校验什么，谁批准，执行后留下哪些日志，失败怎样补偿。只要其中一项答不上来，就不应开放自动写入。

有人认为人工审批会削弱自动化价值。这种担忧只在低风险、高频、规则稳定的任务上成立。涉及对外承诺、资金、删除、敏感数据和不可逆操作时，审批本身就是控制措施。更合理的顺序是先提供只读建议，再允许受控写入，最后才讨论限定范围内的自动执行。

实施时，工具清单要与权限矩阵对应。演示脚本也必须包含超时、重复提交、部分成功和返回状态不明的情况。评价 Agent 不能只看它能执行多少动作，还要看它能否在不该继续时停止。
