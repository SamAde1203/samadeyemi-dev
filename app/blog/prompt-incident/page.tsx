import type { Metadata } from "next";
import PromptIncidentArticle from "@/components/PromptIncidentArticle";

export const metadata: Metadata = {
  title: "The Production Incident That Changed How We Deploy AI Prompts | PHHM Journal — Sam Adeyemi",
  description: "A post-mortem on the single sentence that quietly degraded our Care Agent — and the engineering practices built so it never happens again.",
};

export default function Page() {
  return <PromptIncidentArticle />;
}
