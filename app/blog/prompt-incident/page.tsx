import type { Metadata } from "next";
import PromptIncidentArticle from "@/components/PromptIncidentArticle";

export const metadata: Metadata = {
  title: "The Production Incident That Changed How We Deploy AI Prompts | PHHM Journal \u2014 Sam Adeyemi",
  description: "A post-mortem on the single sentence that quietly degraded our Care Agent \u2014 and the engineering practices built so it never happens again.",
  openGraph: {
    title: "The Production Incident That Changed How We Deploy AI Prompts",
    description: "A post-mortem on the single sentence that quietly degraded our Care Agent \u2014 and the engineering practices built so it never happens again.",
    url: "https://www.samadeyemi.dev/blog/prompt-incident",
    siteName: "Sam Adeyemi — PHHM Journal",
    type: "article",
    images: [{ url: "https://www.samadeyemi.dev/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Production Incident That Changed How We Deploy AI Prompts",
    description: "A post-mortem on the single sentence that quietly degraded our Care Agent \u2014 and the engineering practices built so it never happens again.",
  },
};

export default function Page() {
  return <PromptIncidentArticle />;
}