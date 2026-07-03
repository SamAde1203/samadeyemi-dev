import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const blogSlugs = [
    "architecture",
    "fastapi",
    "configuration",
    "state-management",
    "prompt-versioning",
    "guardrails",
    "observability",
    "evaluation",
    "security",
    "langchain",
    "monolith-to-multi-agent",
    "prompt-incident",
    "testing-without-llms",
    "cost-engineering",
    "cost-optimization",
  ];

  const projectSlugs = [
    "alphawings",
    "cv-builder",
    "phhm",
    "seedtracker",
    "tdct",
    "trialforge",
  ];

  return [
    {
      url: "https://www.samadeyemi.dev",
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: "https://www.samadeyemi.dev/blog",
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...blogSlugs.map((slug) => ({
      url: `https://www.samadeyemi.dev/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projectSlugs.map((slug) => ({
      url: `https://www.samadeyemi.dev/projects/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
