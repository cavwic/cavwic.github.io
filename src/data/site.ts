export type Locale = "zh" | "en";
export type EntryStatus = "published" | "draft" | "building";

export type Entry = {
  title: string;
  description: string;
  status: EntryStatus;
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

export const resume = {
  displayName: {
    zh: "CAVWIC 个人简历",
    en: "CAVWIC resume",
  },
  href: "/downloads/cavwic-resume.pdf",
  fileName: "cavwic-resume.pdf",
  available: false,
};

const routePaths = ["/", "/industries", "/solutions", "/articles", "/tools", "/skills", "/about"] as const;

const navigationLabels = {
  zh: ["首页", "行业", "方案", "文章", "工具", "Skills", "关于"],
  en: ["Home", "Industries", "Solutions", "Articles", "Tools", "Skills", "About"],
};

export function localizePath(locale: Locale, path: string) {
  if (locale === "zh") return path;
  return path === "/" ? "/en" : `/en${path}`;
}

export function getBasePath(path: string) {
  if (path === "/en") return "/";
  return path.startsWith("/en/") ? path.slice(3) : path;
}

export function getNavigation(locale: Locale) {
  return routePaths.map((path, index) => ({
    label: navigationLabels[locale][index],
    href: localizePath(locale, path),
    basePath: path,
  }));
}

export const statusLabels: Record<Locale, Record<EntryStatus, string>> = {
  zh: {
    published: "已发布",
    draft: "草稿",
    building: "建设中",
  },
  en: {
    published: "Published",
    draft: "Draft",
    building: "In progress",
  },
};

export const industries: Record<Locale, Industry[]> = {
  zh: [
    {
      id: "ai",
      code: "AI",
      name: "AI",
      description: "整理模型、工作流、自动化方式，以及它们在实际项目中的使用边界。",
      entries: [
        {
          title: "AI 工作流与应用记录",
          description: "后续发布模型选型、本地工作流和项目落地过程中的具体判断。",
          status: "building",
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
          status: "building",
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
          status: "building",
        },
      ],
    },
  ],
  en: [
    {
      id: "ai",
      code: "AI",
      name: "AI",
      description: "Models, workflows, automation, and the practical limits that emerge in real projects.",
      entries: [
        {
          title: "AI workflows and applications",
          description: "Upcoming notes on model selection, local workflows, and decisions made during implementation.",
          status: "building",
        },
      ],
    },
    {
      id: "robotics",
      code: "ROBOTICS",
      name: "Robotics",
      description: "System design, key components, control methods, and applications that can work outside a demo.",
      entries: [
        {
          title: "Robotics industry and solution notes",
          description: "Upcoming reviews of industry developments, system architecture, and verifiable project work.",
          status: "building",
        },
      ],
    },
    {
      id: "dexterous-hands",
      code: "DEXTEROUS HANDS",
      name: "Dexterous hands",
      description: "Public research and working conclusions on actuation, transmission, sensing, control, and product design.",
      entries: [
        {
          title: "Dexterous hand technology and products",
          description: "Upcoming notes on technical approaches, components, and product concepts.",
          status: "building",
        },
      ],
    },
  ],
};

export const collections: Record<Locale, Record<string, Entry[]>> = {
  zh: {
    solutions: [
      {
        title: "个人知识与作品分发站点",
        description: "本地写作与维护，GitHub 保存版本，静态托管平台负责持续在线。",
        status: "building",
        date: "2026.08",
        href: "/articles/local-edit-static-hosting",
        action: "查看方案",
      },
    ],
    articles: [
      {
        title: "本地编辑，线上静态托管",
        description: "个人内容站第一阶段的结构、发布路径和域名分工。",
        status: "draft",
        date: "2026.08",
        href: "/articles/local-edit-static-hosting",
        action: "阅读草稿",
      },
    ],
    tools: [
      {
        title: "工具仓库",
        description: "可独立运行的小工具会保留源码、说明和版本记录。首批项目仍在整理。",
        status: "building",
        href: githubUrl,
        external: true,
        action: "前往 GitHub",
      },
    ],
    skills: [
      {
        title: "Skill 下载区",
        description: "后续提供版本号、适用范围、安装说明和可下载压缩包。",
        status: "building",
      },
    ],
  },
  en: {
    solutions: [
      {
        title: "Personal knowledge and project site",
        description: "Written locally, versioned on GitHub, and kept online through static hosting.",
        status: "building",
        date: "2026.08",
        href: "/en/articles/local-edit-static-hosting",
        action: "View solution",
      },
    ],
    articles: [
      {
        title: "Edit locally, host statically",
        description: "The first-stage structure, publishing workflow, and domain split for this site.",
        status: "draft",
        date: "2026.08",
        href: "/en/articles/local-edit-static-hosting",
        action: "Read draft",
      },
    ],
    tools: [
      {
        title: "Tool repositories",
        description: "Standalone tools will include source code, instructions, and version history. The first releases are still being prepared.",
        status: "building",
        href: githubUrl,
        external: true,
        action: "Open GitHub",
      },
    ],
    skills: [
      {
        title: "Skill downloads",
        description: "Future releases will include a version, intended use, installation notes, and a downloadable package.",
        status: "building",
      },
    ],
  },
};
