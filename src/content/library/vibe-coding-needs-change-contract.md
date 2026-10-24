---
title: "Vibe coding 需要的不是更长提示词，而是变更契约"
description: "把“帮我做个应用”改写为可检查的范围、行为、数据保护和验收，让 AI 开发更容易接续与审查。"
locale: zh
kind: article
industry: ai
evidence: [公开资料研究, 分析判断]
publicationStatus: published
date: 2026-10-22
reviewedAt: 2026-10-22
featured: false
tags: [Vibe coding, AI辅助开发, 验收, 代码审查]
sourceIds: [ref-119]
alternatePath: /en/library/vibe-coding-needs-change-contract
---

## 提示词很长，边界仍然可能很模糊

“做一个专业、美观、完整的工具”包含偏好，却没有定义可观察的行为。开发助手可能做出很多页面，但无法知道原始文件能否覆盖、哪些系统可以访问，或者什么结果才算完成。

我更倾向把需求压缩成一份变更契约，后续的反馈再逐步修订它，而不是不断叠加形容词。

## 一份可以开工的契约

以本地 CSV 检查器为例：

- 用户动作：选择文件，看到错误行，导出错误清单。
- 数据边界：不上传；不修改原文件；刷新后不默认为已保存。
- 允许修改：导入、校验、结果视图和对应测试；不更换框架。
- 完成条件：正常文件、缺列、空文件、重复行与取消操作均有确定结果。
- 另行批准：安装依赖、迁移数据、提交、推送与部署。

这不是一个已完成的客户案例，而是任务拆分示例。验收条件应随实际风险调整。

## 先要证据，再谈完成

“测试应该能通过”“界面已经响应式”都不是结果。交接时应记录执行过的命令、退出状态、实际检查的页面尺寸、未执行的测试和已知限制。若测试因环境失败，应报告阻塞，而不是把未执行写成通过。

代码审查和自动状态检查可以作为合并门禁。GitHub 提供相关分支保护选项，但是否启用、是否允许绕过，应到仓库配置中确认。[官方说明](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)

## 让下一次对话能接得上

交接材料只需说明：当前入口在哪里、做完了什么、最后验证到哪一步、保留了什么用户状态、下一步是什么。不要用聊天长度代替任务记录，也不要在恢复时重复安装或覆盖已有结果。

<!-- AI_WORKBENCH_PAUSED: 可以在 [AI 交付工作台](/tools/ai-delivery-workbench) 生成这份任务契约，再配合 [AI 编码交付 Skill](/skills/ai-coding-delivery)。工具导出的内容是待执行计划，不是已经运行的证据。 -->
可配合 [AI 编码交付 Skill](/skills/ai-coding-delivery) 整理任务契约，更完整的方法见 [AI 辅助开发方案](/library/ai-assisted-coding-delivery)。任务书是待执行计划，不是已经运行的证据。
