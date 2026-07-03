import type { Metadata } from "next";
import StateManagementArticle from "@/components/StateManagementArticle";

export const metadata: Metadata = {
  title: "State Management for Multi-Agent AI | PHHM Journal \u2014 Sam Adeyemi",
  description: "Workflow state is not shared memory: structured, execution-owned context that survives retries and agent handoffs.",
};

export default function Page() {
  return <StateManagementArticle />;
}