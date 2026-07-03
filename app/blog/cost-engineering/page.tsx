import type { Metadata } from "next";
import CostEngineeringArticle from "@/components/CostEngineeringArticle";

export const metadata: Metadata = {
  title: "Cost Engineering for Production AI \u2014 Part 1: Measure | PHHM Journal \u2014 Sam Adeyemi",
  description: "You can't optimize costs you don't measure: cost per workflow, token accounting, and why context is usually the biggest expense.",
  openGraph: {
    title: "Cost Engineering for Production AI \u2014 Part 1: Measure",
    description: "You can't optimize costs you don't measure: cost per workflow, token accounting, and why context is usually the biggest expense.",
    url: "https://www.samadeyemi.dev/blog/cost-engineering",
    siteName: "Sam Adeyemi — PHHM Journal",
    type: "article",
    images: [{ url: "https://www.samadeyemi.dev/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cost Engineering for Production AI \u2014 Part 1: Measure",
    description: "You can't optimize costs you don't measure: cost per workflow, token accounting, and why context is usually the biggest expense.",
  },
};

export default function Page() {
  return <CostEngineeringArticle />;
}