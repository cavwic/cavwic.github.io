export type Entry = {
  title: string;
  description: string;
  status: "已发布" | "草稿" | "建设中";
  date?: string;
  href?: string;
  external?: boolean;
  action?: string;
};

export type Industry = {
  id: string;
  code: string;
  name: string;
  description: string;
  entries: Entry[];
};

export const githubUrl = "https://github.com/cavwic";

export const navigation = [
  { label: "首页", href: "/" },
  { label: "行业", href: "/industries" },
  { label: "方案", href: "/solutions" },
  { label: "文章", href: "/articles" },
  { label: "工具", href: "/tools" },
  { label: "Skills", href: "/skills" },
  { label: "关于", href: "/about" },
];

export const industries: Industry[] = [
  {
    id: "ai",
    code: "AI",
    name: "AI",
    description: "整理模型、工作流、自动化方式，以及它们在实际项目中的使用边界。",
    entries: [
      {
        title: "AI 工作流与应用记录",
        description: "后续发布模型选型、本地工作流和项目落地过程中的具体判断。",
        status: "建设中",
      },
    ],
  },
  {
    id: "robotics",
    code: "ROBOTICS",
    name: "机器人",
    description: "关注机器人系统方案、关键部件、控制方式和可落地的应用场景。",
    entries: [
      {
        title: "机器人行业与方案记录",
        description: "后续整理行业观察、系统拆解和方案实践中可复核的内容。",
        status: "建设中",
      },
    ],
  },
  {
    id: "dexterous-hands",
    code: "DEXTEROUS HANDS",
    name: "灵巧手",
    description: "持续记录驱动、传动、感知、控制和产品化方向的公开资料与判断。",
    entries: [
      {
        title: "灵巧手技术与产品记录",
        description: "后续发布技术路线、零部件信息和产品方案的阶段性整理。",
        status: "建设中",
      },
    ],
  },
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
