import type { Metadata } from "next";
import LangChainArticle from "@/components/LangChainArticle";

export const metadata: Metadata = {
  title: "Why We Didn't Use LangChain in Production (And What We Built Instead) | PHHM Journal \u2014 Sam Adeyemi",
  description: "Evaluating LangChain, CrewAI, and AutoGen taught us a lesson: production AI platforms need ownership, not abstraction.",
  openGraph: {
    title: "Why We Didn't Use LangChain in Production (And What We Built Instead)",
    description: "Evaluating LangChain, CrewAI, and AutoGen taught us a lesson: production AI platforms need ownership, not abstraction.",
    url: "https://www.samadeyemi.dev/blog/langchain",
    siteName: "Sam Adeyemi — PHHM Journal",
    type: "article",
    images: [{ url: "https://www.samadeyemi.dev/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why We Didn't Use LangChain in Production (And What We Built Instead)",
    description: "Evaluating LangChain, CrewAI, and AutoGen taught us a lesson: production AI platforms need ownership, not abstraction.",
  },
};

export default function Page() {
  return <LangChainArticle />;
}