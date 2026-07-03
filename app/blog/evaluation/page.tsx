import type { Metadata } from "next";
import EvaluationArticle from "@/components/EvaluationArticle";

export const metadata: Metadata = {
  title: "Evaluation and Regression Testing for AI Workflows | PHHM Journal \u2014 Sam Adeyemi",
  description: "Golden datasets, behavioral assertions, and CI/CD evaluation gates that prove the workflow still works before every deploy.",
};

export default function Page() {
  return <EvaluationArticle />;
}