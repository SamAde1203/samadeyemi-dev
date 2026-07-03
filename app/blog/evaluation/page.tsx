import type { Metadata } from "next";
import EvaluationArticle from "@/components/EvaluationArticle";

export const metadata: Metadata = {
  title: "Evaluation and Regression Testing for AI Workflows | PHHM Journal \u2014 Sam Adeyemi",
  description: "Golden datasets, behavioral assertions, and CI/CD evaluation gates that prove the workflow still works before every deploy.",
  openGraph: {
    title: "Evaluation and Regression Testing for AI Workflows",
    description: "Golden datasets, behavioral assertions, and CI/CD evaluation gates that prove the workflow still works before every deploy.",
    url: "https://www.samadeyemi.dev/blog/evaluation",
    siteName: "Sam Adeyemi — PHHM Journal",
    type: "article",
    images: [{ url: "https://www.samadeyemi.dev/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Evaluation and Regression Testing for AI Workflows",
    description: "Golden datasets, behavioral assertions, and CI/CD evaluation gates that prove the workflow still works before every deploy.",
  },
};

export default function Page() {
  return <EvaluationArticle />;
}