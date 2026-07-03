import type { Metadata } from "next";
import ObservabilityArticle from "@/components/ObservabilityArticle";

export const metadata: Metadata = {
  title: "Observability for Multi-Agent AI Systems | PHHM Journal — Sam Adeyemi",
  description: "You can't debug what you can't see: correlation IDs, structured logs, distributed traces, metrics, and audit trails.",
};

export default function Page() {
  return <ObservabilityArticle />;
}