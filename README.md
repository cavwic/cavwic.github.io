# CAVWIC 个人主页

用于发布企业 AI 与具身机器人售前方案、文章、工具和 Skills 的静态站点。项目使用 Astro，本地负责编辑和构建，线上由 GitHub Pages 持续提供访问。

## 本地运行

```powershell
npm install
npm run dev
```

本地审阅与生产构建：

```powershell
npm run verify
npm run build:review
npm run build
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

1. 本地修改内容并运行 `npm run verify`；`draft` 只进入 review 构建。
2. 提交并推送到 GitHub 的 `main` 分支。
3. GitHub Actions 自动构建并发布 GitHub Pages。
4. 先验证 `https://cavwic.github.io`。
5. 确认域名服务支持 A、AAAA、CNAME 或 NS 记录后，再绑定 `cavwic.top`。
6. Skills 和其他下载文件使用 GitHub Releases 分发。
