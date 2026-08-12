export type Entry = {
  title: string;
  description: string;
  status: "已发布" | "草稿" | "建设中";
  date?: string;
  href?: string;
  external?: boolean;
  action?: string;
};

export const githubUrl = "https://github.com/cavwic";

export const navigation = [
  { label: "首页", href: "/" },
  { label: "方案", href: "/solutions" },
  { label: "文章", href: "/articles" },
  { label: "工具", href: "/tools" },
  { label: "Skills", href: "/skills" },
  { label: "关于", href: "/about" },
];

export const collections: Record<string, Entry[]> = {
  solutions: [
    {
      title: "个人知识与作品分发站点",
      description: "本地写作与维护，GitHub 保存版本，静态托管平台负责持续在线。",
      status: "建设中",
      date: "2026.08",
      href: "/articles/local-edit-static-hosting",
      action: "查看方案",
    },
  ],
  articles: [
    {
      title: "本地编辑，线上静态托管",
      description: "个人内容站第一阶段的结构、发布路径和域名分工。",
      status: "草稿",
      date: "2026.08",
      href: "/articles/local-edit-static-hosting",
      action: "阅读草稿",
    },
  ],
  tools: [
    {
      title: "工具仓库",
      description: "可独立运行的小工具会保留源码、说明和版本记录。首批项目仍在整理。",
      status: "建设中",
      href: githubUrl,
      external: true,
      action: "前往 GitHub",
    },
  ],
  skills: [
    {
      title: "Skill 下载区",
      description: "后续提供版本号、适用范围、安装说明和可下载压缩包。",
      status: "建设中",
    },
  ],
};
