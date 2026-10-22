import type { SourceRef } from "../content";

export type CompanyOfficialLink = {
  url: string;
  kind: "website" | "official-profile";
};

const overrides: Record<string, CompanyOfficialLink> = {
  langgenius: { url: "https://dify.ai/", kind: "website" },
  infiniflow: { url: "https://ragflow.io/", kind: "website" },
  labring: { url: "https://fastgpt.io/", kind: "website" },
  "nvidia-robotics": { url: "https://developer.nvidia.com/isaac", kind: "website" },
  faulhaber: { url: "https://www.faulhaber.com/", kind: "website" },
  kinco: { url: "https://www.kinco.cn/", kind: "website" },
  linkerbot: { url: "https://www.linkerbot.cn/", kind: "website" },
  synapx: { url: "https://www.worldrobotconference.com/expo/company/709.html", kind: "official-profile" },
};

export function getCompanyOfficialLink(slug: string, refs: SourceRef[]): CompanyOfficialLink | undefined {
  const override = overrides[slug];
  if (override) return override;

  const officialRef = refs.find((ref) => ref.sourceType === "official");
  if (!officialRef) return undefined;

  try {
    const url = new URL(officialRef.url);
    return { url: `${url.origin}/`, kind: "website" };
  } catch {
    return { url: officialRef.url, kind: "official-profile" };
  }
}
