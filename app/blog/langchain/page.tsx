import type { Metadata } from "next";
import LangChainArticle from "@/components/LangChainArticle";

export const metadata: Metadata = {
  title: "Why We Didn't Use LangChain in Production (And What We Built Instead) | PHHM Journal — Sam Adeyemi",
  description: "Evaluating LangChain, CrewAI, and AutoGen taught us a lesson: production AI platforms need ownership, not abstraction.",
};

export default function Page() {
  return <LangChainArticle />;
}
