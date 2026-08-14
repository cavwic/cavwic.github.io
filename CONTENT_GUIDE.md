# 网站内容编辑手册

网站在本地编辑，通过 GitHub Pages 托管。电脑和 NAS 都不是线上服务器；专业资料库和工具站已经发布，后续修改仍先在本地检查再推送。

## 本地预览

```powershell
cd "D:\Codex Project\个人主页"
npm install
npm run dev
```

浏览器打开 `http://127.0.0.1:4321`。开发环境会显示 `draft` 和 `published` 内容。

独立工具项目位于：

```text
D:\Codex Project\cavwic-solutions-lab
```

在该目录执行 `npm run dev`，打开 `http://localhost:4322/cavwic-solutions-lab/`。

## 新增白皮书、文章或案例

在 `src/content/library/` 新建 Markdown 文件。文件名使用小写英文和连字符，例如：

```text
src/content/library/robot-service-readiness.md
```

文件头示例：

```yaml
---
title: "文章标题"
description: "说明问题、观点和读者能得到的结果，至少二十个字。"
locale: zh
kind: article
industry: robotics
evidence: [公开资料研究, 分析判断]
publicationStatus: draft
date: 2026-08-14
reviewedAt: 2026-08-14
featured: false
tags: [机器人, 服务]
sourceIds: [ref-23, ref-45]
alternatePath: /en/industries#robotics
---
```

字段规则：

| 字段 | 可用值或要求 |
| --- | --- |
| `kind` | `whitepaper`、`article`、`case-study` |
| `industry` | `ai`、`robotics`、`dexterous-hands`、`cross-industry` |
| `evidence` | `真实经历`、`个人实践`、`公开资料研究`、`分析判断`，可多选 |
| `publicationStatus` | 审阅阶段保持 `draft`；明确批准后才改为 `published` |
| `reviewedAt` | 最后一次逐条核对事实和链接的日期 |
| `sourceIds` | 必须存在于 `src/data/sources.ts`；脱敏真实经历可为空 |
| `alternatePath` | 没有英文全文时，指向相应英文行业摘要，不创建不存在的 `/en/...` |

类型和必填项由 `src/content.config.ts` 校验。栏目页会按内容类型和行业自动归档，不再手工维护文章列表。

## 增加来源

来源统一保存在 `src/data/sources.ts`。新增记录必须有唯一 ID、标题、URL、发布方、类型、核验日期和用途说明。

优先使用官方产品手册、开发文档、标准或政府入口、论文和公司官方招聘页。招聘平台和行业报告可用于岗位与市场背景。没有公开依据的产品参数直接写“未公开”或“需询证”。

内容超过 90 天没有复核时，文章页会显示“待复核”。更新资料后同时修改来源记录和内容文件的 `reviewedAt`。

## 公司、矩阵和术语

- 公司档案：`src/data/catalog.ts` 的 `companies`
- 产品矩阵：`src/data/catalog.ts` 的 `matrices`
- 术语库：`src/data/glossary.ts`

产品比较维度应随产品类型变化。不要用一个总分同时比较 AI 平台、机器人本体和末端执行器；不要给未知字段补平均值。

## 首页和关于页

首页的定位、能力链和代表交付物在 `src/pages/index.astro`。英文核心定位在 `src/pages/en/index.astro`。

关于页职业经历在 `src/pages/about/index.astro`。只能使用公开履历；客户、金额、内部接口、事故细节、联系人和第三方个人信息不能进入网页。HTML 只展示邮箱，不展示电话。

## 语言与主题

只有首页根据浏览器语言自动进入中文或英文：系统语言以 `zh` 开头显示中文，否则显示英文。用户手动切换后，本机浏览器会记住选择。

深层中文页面没有英文全文时，语言按钮返回英文行业摘要；不会跳转到不存在的 `/en/...` 页面。主题默认跟随系统，点击按钮后保存为手动选择。

## 更新简历

当前线上下载文件仍是：

```text
public/downloads/陈文聪简历.pdf
```

本次生成的脱敏候选稿只用于本地审阅，`review/` 已加入 `.gitignore`，不会进入公开仓库：

```text
review/陈文聪-公开版简历候选稿.docx
review/陈文聪-公开版简历候选稿.pdf
```

候选稿不会自动替换线上 PDF。确认内容后，才把批准的 PDF 覆盖到 `public/downloads/陈文聪简历.pdf`，随后重新构建、提交和推送。仅替换本地文件不会同步线上版本。

公开版建议只保留邮箱；删除手机号、详细住址、证件信息、客户名称、项目金额、内部截图和受限材料。

## 审阅与构建

完整本地检查：

```powershell
npm run verify
```

其中：

- `npm run check`：Astro 与 TypeScript 校验
- `npm run audit`：数量、来源、证据标签和敏感信息扫描
- `npm run build`：正式构建，只生成 `published` 内容
- `npm run build:review`：本地审阅构建，包含 `draft`
- `npm run check:links`：检查构建产物中的内部链接和 URL 格式

即使草稿文件误入远程仓库，正式构建也不会生成草稿正文路由。发布前仍要人工审阅劳动合同、保密协议、版权和个人信息边界。

## 发布步骤

完成内容审阅后执行：

```powershell
npm run verify
git status
git add <明确批准的文件>
git commit -m "发布专业资料库"
git push origin main
```

不要直接使用 `git add -A`，先确认没有把本地审阅材料、测试截图或个人文件加入提交。推送到 `main` 后，GitHub Actions 会更新线上网站。

工具站位于公开仓库 `cavwic/cavwic-solutions-lab`。在其目录执行相同的检查、提交和 `git push origin main`，GitHub Actions 会更新 `https://cavwic.github.io/cavwic-solutions-lab/`。

当前 canonical 和访问地址为 `https://cavwic.github.io`。只有 `cavwic.top` 完成 DNS 与 GitHub Pages 验证后，才修改 `astro.config.mjs`。
