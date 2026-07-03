import type { Metadata } from "next";
import ConfigurationArticle from "@/components/ConfigurationArticle";

export const metadata: Metadata = {
  title: "Configuration-Driven AI: Why YAML Beats Hardcoded Prompts in Production | PHHM Journal \u2014 Sam Adeyemi",
  description: "How PHHM adds new agents, models, prompts, and workflows without rewriting application code.",
  openGraph: {
    title: "Configuration-Driven AI: Why YAML Beats Hardcoded Prompts in Production",
    description: "How PHHM adds new agents, models, prompts, and workflows without rewriting application code.",
    url: "https://www.samadeyemi.dev/blog/configuration",
    siteName: "Sam Adeyemi — PHHM Journal",
    type: "article",
    images: [{ url: "https://www.samadeyemi.dev/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Configuration-Driven AI: Why YAML Beats Hardcoded Prompts in Production",
    description: "How PHHM adds new agents, models, prompts, and workflows without rewriting application code.",
  },
};

export default function Page() {
  return <ConfigurationArticle />;
}