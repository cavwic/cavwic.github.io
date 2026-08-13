# 网站内容编辑手册

这个网站在本地编辑，通过 GitHub 自动发布。本地电脑和 NAS 都不是网站服务器，发布完成后可以关机。

## 启动本地预览

首次使用：

```powershell
npm install
npm run dev
```

浏览器打开 `http://127.0.0.1:4321`。修改文件后，页面会自动刷新。

## 修改首页和栏目条目

中文、英文栏目中的条目集中保存在：

```text
src/data/site.ts
```

中文内容写入 `collections.zh`，英文内容写入 `collections.en`。在对应栏目数组中各增加一项：

```ts
{
  title: "条目标题",
  description: "一句话说明内容和用途。",
  status: "published",
  date: "2026.08",
  href: "/articles/article-file-name",
  action: "阅读全文",
}
```

`status` 只能填写 `published`、`draft` 或 `building`，页面会自动显示对应语言的状态文字。外部链接需要增加：

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

英文文章放在 `src/pages/en/articles/`，并在开头增加：

```yaml
locale: en
```

写完后，在 `src/data/site.ts` 的 `collections.zh.articles` 和 `collections.en.articles` 中分别增加条目。中文链接使用 `/articles/my-new-article`，英文链接使用 `/en/articles/my-new-article`。两个文件应使用相同的英文文件名，语言切换才能停留在对应文章。

## 更新行业内容

行业页的 AI、机器人和灵巧手内容保存在 `src/data/site.ts` 的 `industries.zh` 和 `industries.en` 中。每个行业都有自己的 `entries`，新增内容时需要同步填写中文和英文版本。

如需增加新的行业分类，复制一个完整的行业对象并修改 `id`、`code`、`name`、`description` 和 `entries`。`id` 需要使用不重复的英文短名称。

## 更新简历下载

正在修改的简历原稿保存在本地：

```text
src/陈文聪简历.pdf
```

该文件已加入 `.gitignore`，不会被 Git 提交或自动发布。替换这个文件只会更新本地原稿，不会自动同步到网站。

确认可以公开后，将 PDF 保存为：

```text
public/downloads/陈文聪简历.pdf
```

建议使用隐藏手机号、详细住址和证件信息的公开脱敏版。准备好文件后，打开 `src/data/site.ts`，找到 `resume` 配置并把：

```ts
available: false
```

改为：

```ts
available: true
```

首页和关于页会同时从“简历整理中”切换为“下载简历”。替换新版本时保持文件名不变，再重新构建和发布即可。

网站当前已经开放简历下载。以后替换 `public/downloads/陈文聪简历.pdf` 后仍需执行构建、提交和推送；仅覆盖本地文件不会自动更新线上版本。

## 发布方案、工具和 Skills

- 方案：编辑 `collections.zh.solutions` 和 `collections.en.solutions`。
- 工具：编辑两种语言的 `tools` 数组，`href` 指向对应 GitHub 仓库。
- Skills：编辑两种语言的 `skills` 数组；正式下载文件放到 GitHub Releases，并把 `href` 指向 Release 下载页。

需要长篇说明时，可以参照文章方式新建 Markdown 页面，再从栏目条目链接过去。

## 深浅色与中英文

网站首次打开时跟随电脑或手机的系统深浅色。访客点击右上角的太阳或月亮按钮后，浏览器会在本机记住手动选择。

中文页面使用原有路径，英文页面统一位于 `/en` 下。右上角语言按钮会切换到当前页面的另一种语言，因此新增栏目页或文章时应保持中英文路径除 `/en` 前缀外完全一致。

访客首次打开网站时，浏览器语言以 `zh` 开头则显示中文，否则显示英文。访客手动点击语言按钮后，浏览器会在本机记住选择，之后优先使用手动选择。

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
