# CAVWIC 个人主页

用于发布方案、文章、工具和 Skills 的静态站点。项目使用 Astro，本地负责编辑和构建，线上由静态托管平台持续提供访问。

## 本地运行

```powershell
npm install
npm run dev
```

生产构建：

```powershell
npm run build
npm run preview
```

## 内容入口

- 页面与文案：`src/pages/`
- 首页条目数据：`src/data/site.ts`
- 全局样式：`src/styles/global.css`
- 首屏图片：`public/images/workbench-hero.webp`

完整编辑方法见 [CONTENT_GUIDE.md](./CONTENT_GUIDE.md)。

## 发布顺序

1. 本地修改内容并运行 `npm run build`。
2. 提交并推送到 GitHub 的 `main` 分支。
3. GitHub Actions 自动构建并发布 GitHub Pages。
4. 先验证 `https://cavwic.github.io`。
5. 确认域名服务支持 A、AAAA、CNAME 或 NS 记录后，再绑定 `cavwic.top`。
6. Skills 和其他下载文件使用 GitHub Releases 分发。
