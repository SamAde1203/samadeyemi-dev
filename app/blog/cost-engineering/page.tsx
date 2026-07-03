import type { Metadata } from "next";
import CostEngineeringArticle from "@/components/CostEngineeringArticle";

export const metadata: Metadata = {
  title: "Cost Engineering for Production AI — Part 1: Measure | PHHM Journal — Sam Adeyemi",
  description: "You can't optimize costs you don't measure: cost per workflow, token accounting, and why context is usually the biggest expense.",
};

export default function Page() {
  return <CostEngineeringArticle />;
}
