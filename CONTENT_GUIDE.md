# 网站内容编辑手册

这个网站在本地编辑，通过 GitHub 自动发布。本地电脑和 NAS 都不是网站服务器，发布完成后可以关机。

## 启动本地预览

首次使用：

```powershell
npm install
npm run dev
```

浏览器打开 `http://127.0.0.1:4321`。修改文件后，页面会自动刷新。

## 修改首页条目

首页和四个栏目中的条目集中保存在：

```text
src/data/site.ts
```

在对应数组中增加一项：

```ts
{
  title: "条目标题",
  description: "一句话说明内容和用途。",
  status: "已发布",
  date: "2026.08",
  href: "/articles/article-file-name",
  action: "阅读全文",
}
```

`status` 只能填写 `已发布`、`草稿` 或 `建设中`。外部链接需要增加：

```ts
external: true
```

## 发布文章

在 `src/pages/articles/` 中新建 Markdown 文件，例如：

```text
src/pages/articles/my-new-article.md
```

文件开头使用以下格式：

```markdown
---
layout: ../../layouts/ArticleLayout.astro
title: 文章标题
description: 文章摘要
date: 2026.08.12
status: 草稿
---

这里开始写正文。

## 一级章节

正文内容。
```

写完后，在 `src/data/site.ts` 的 `articles` 数组中增加对应条目，`href` 使用 `/articles/my-new-article`。

## 发布方案、工具和 Skills

- 方案：编辑 `src/data/site.ts` 的 `solutions` 数组。
- 工具：编辑 `tools` 数组，`href` 指向对应 GitHub 仓库。
- Skills：编辑 `skills` 数组；正式下载文件放到 GitHub Releases，并把 `href` 指向 Release 下载页。

需要长篇说明时，可以参照文章方式新建 Markdown 页面，再从栏目条目链接过去。

## 更换图片

图片放在：

```text
public/images/
```

页面中使用 `/images/文件名.webp` 引用。照片优先转为 WebP，避免原图过大影响访问速度。

## 发布更新

修改完成后先检查构建：

```powershell
npm run build
```

然后发布：

```powershell
git add -A
git commit -m "更新文章或项目内容"
git push
```

推送到 `main` 后，GitHub Actions 会自动更新网站。可以在仓库的 `Actions` 页面查看进度。

## 公开访问地址

GitHub Pages 地址：

```text
https://cavwic.github.io
```

后续将 `cavwic.top` 绑定到 GitHub Pages 后，访问者也可以通过独立域名进入。NAS 继续使用 `nasremote.cavwic.top`，两者互不影响。
