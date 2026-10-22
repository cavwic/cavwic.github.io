# CAVWIC 个人主页

用于发布企业 AI 与具身机器人售前方案、文章、工具和 Skills 的静态站点。项目使用 Astro，本地负责编辑和构建，线上由 GitHub Pages 持续提供访问。

## 本地运行

```powershell
npm install
npm run dev
```

公开发布构建（不包含本地机灵仓整库）：

```powershell
npm run check
npm run audit
npm run test:robotics-labs
npm run build
npm run check:pages-capacity
npm run check:links
npm run preview
```

## 内容入口

- 页面与文案：`src/pages/`
- 白皮书、文章和案例：`src/content/library/`
- 公司、产品矩阵和术语：`src/data/`
- 来源记录：`src/data/sources.ts`
- 研究与风险审计：`research/`
- 全局样式：`src/styles/global.css`
- 首屏图片：`public/images/workbench-hero.webp`

完整编辑方法见 [CONTENT_GUIDE.md](./CONTENT_GUIDE.md)。

## 发布顺序

1. 本地修改并运行上述检查；`draft` 不进入公开构建。
2. 提交并推送到 GitHub 的 `main` 分支。
3. GitHub Actions 自动构建并发布 GitHub Pages。
4. 先验证 `https://cavwic.github.io`。
5. 确认域名服务支持 A、AAAA、CNAME 或 NS 记录后，再绑定 `cavwic.top`。
6. Skills 和其他下载文件使用 GitHub Releases 分发。

## 发布范围与容量

`npm run build` 使用 `pages` 模式，发布个人主页、文章、行业公司简介和中英文灵巧操作实验台。机灵仓、完整元数据目录、逐型号产品页和检索数据分片不进入公开站点；旧入口分别跳转到工具页或公司简介目录。供应商关联链接仍可在行业公司简介之间访问。

完整数据和功能继续保留在本地 `npm run dev`。确需全量静态导出时才使用 `npm run build:local` 或 `npm run build:review`，它们不适用于当前 GitHub Pages 容量。

发布流程在上传前检查所有文件总大小，设置 900 MiB 安全预算，并检查本地整库和 localhost 链接没有混入产物。实验台不重新训练或修改原始结果，摄像头仅在用户主动授权后启用；软件演示不代表真实硬件验证。
