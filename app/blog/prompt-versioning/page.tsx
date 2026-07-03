import type { Metadata } from "next";
import PromptVersioningArticle from "@/components/PromptVersioningArticle";

export const metadata: Metadata = {
  title: "Prompt Versioning at Scale | PHHM Journal \u2014 Sam Adeyemi",
  description: "Prompts as deployable software assets: semantic versions, workflow mapping, regression tests, and boring rollbacks.",
  openGraph: {
    title: "Prompt Versioning at Scale",
    description: "Prompts as deployable software assets: semantic versions, workflow mapping, regression tests, and boring rollbacks.",
    url: "https://www.samadeyemi.dev/blog/prompt-versioning",
    siteName: "Sam Adeyemi — PHHM Journal",
    type: "article",
    images: [{ url: "https://www.samadeyemi.dev/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt Versioning at Scale",
    description: "Prompts as deployable software assets: semantic versions, workflow mapping, regression tests, and boring rollbacks.",
  },
};

export default function Page() {
  return <PromptVersioningArticle />;
}