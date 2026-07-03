import type { Metadata } from "next";
import SecurityArticle from "@/components/SecurityArticle";

export const metadata: Metadata = {
  title: "Securing Multi-Agent AI Systems | PHHM Journal \u2014 Sam Adeyemi",
  description: "Prompt injection isn't the root problem \u2014 trust boundaries are. The model never decides what the platform does.",
  openGraph: {
    title: "Securing Multi-Agent AI Systems",
    description: "Prompt injection isn't the root problem \u2014 trust boundaries are. The model never decides what the platform does.",
    url: "https://www.samadeyemi.dev/blog/security",
    siteName: "Sam Adeyemi — PHHM Journal",
    type: "article",
    images: [{ url: "https://www.samadeyemi.dev/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Securing Multi-Agent AI Systems",
    description: "Prompt injection isn't the root problem \u2014 trust boundaries are. The model never decides what the platform does.",
  },
};

export default function Page() {
  return <SecurityArticle />;
}