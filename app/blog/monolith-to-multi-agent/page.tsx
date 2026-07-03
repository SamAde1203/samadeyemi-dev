import type { Metadata } from "next";
import MonolithToMultiAgentArticle from "@/components/MonolithToMultiAgentArticle";

export const metadata: Metadata = {
  title: "From Monolith to Multi-Agent: The Refactoring We Should Have Done Earlier | PHHM Journal \u2014 Sam Adeyemi",
  description: "Why PHHM's biggest performance improvement came from admitting the first architecture had reached its limits \u2014 and rebuilding without breaking production.",
  openGraph: {
    title: "From Monolith to Multi-Agent: The Refactoring We Should Have Done Earlier",
    description: "Why PHHM's biggest performance improvement came from admitting the first architecture had reached its limits \u2014 and rebuilding without breaking production.",
    url: "https://www.samadeyemi.dev/blog/monolith-to-multi-agent",
    siteName: "Sam Adeyemi — PHHM Journal",
    type: "article",
    images: [{ url: "https://www.samadeyemi.dev/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "From Monolith to Multi-Agent: The Refactoring We Should Have Done Earlier",
    description: "Why PHHM's biggest performance improvement came from admitting the first architecture had reached its limits \u2014 and rebuilding without breaking production.",
  },
};

export default function Page() {
  return <MonolithToMultiAgentArticle />;
}