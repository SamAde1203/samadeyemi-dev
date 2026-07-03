import type { Metadata } from "next";
import CostOptimizationArticle from "@/components/CostOptimizationArticle";

export const metadata: Metadata = {
  title: "The Cost of Production AI \u2014 Part 2: Optimize | PHHM Journal \u2014 Sam Adeyemi",
  description: "Prompt compression, intelligent routing, caching, and parallel execution that made PHHM economically sustainable at scale.",
  openGraph: {
    title: "The Cost of Production AI \u2014 Part 2: Optimize",
    description: "Prompt compression, intelligent routing, caching, and parallel execution that made PHHM economically sustainable at scale.",
    url: "https://www.samadeyemi.dev/blog/cost-optimization",
    siteName: "Sam Adeyemi — PHHM Journal",
    type: "article",
    images: [{ url: "https://www.samadeyemi.dev/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Cost of Production AI \u2014 Part 2: Optimize",
    description: "Prompt compression, intelligent routing, caching, and parallel execution that made PHHM economically sustainable at scale.",
  },
};

export default function Page() {
  return <CostOptimizationArticle />;
}