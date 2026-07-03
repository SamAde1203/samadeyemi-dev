import type { Metadata } from "next";
import CostOptimizationArticle from "@/components/CostOptimizationArticle";

export const metadata: Metadata = {
  title: "The Cost of Production AI — Part 2: Optimize | PHHM Journal — Sam Adeyemi",
  description: "Prompt compression, intelligent routing, caching, and parallel execution that made PHHM economically sustainable at scale.",
};

export default function Page() {
  return <CostOptimizationArticle />;
}
