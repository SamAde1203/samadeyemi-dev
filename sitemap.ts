import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
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
    {
      url: "https://www.samadeyemi.dev/blog/architecture",
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://www.samadeyemi.dev/blog/fastapi",
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://www.samadeyemi.dev/blog/configuration",
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://www.samadeyemi.dev/blog/state-management",
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://www.samadeyemi.dev/blog/prompt-versioning",
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://www.samadeyemi.dev/blog/guardrails",
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://www.samadeyemi.dev/blog/observability",
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://www.samadeyemi.dev/blog/evaluation",
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://www.samadeyemi.dev/blog/security",
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://www.samadeyemi.dev/blog/langchain",
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://www.samadeyemi.dev/blog/monolith-to-multi-agent",
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://www.samadeyemi.dev/blog/prompt-incident",
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://www.samadeyemi.dev/blog/testing-without-llms",
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://www.samadeyemi.dev/blog/cost-engineering",
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://www.samadeyemi.dev/blog/cost-optimization",
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://www.samadeyemi.dev/projects/alphawings",
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: "https://www.samadeyemi.dev/projects/cv-builder",
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: "https://www.samadeyemi.dev/projects/phhm",
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: "https://www.samadeyemi.dev/projects/seedtracker",
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: "https://www.samadeyemi.dev/projects/tdct",
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: "https://www.samadeyemi.dev/projects/trialforge",
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];
}
