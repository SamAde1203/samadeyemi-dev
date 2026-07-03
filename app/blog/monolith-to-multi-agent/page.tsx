import type { Metadata } from "next";
import MonolithToMultiAgentArticle from "@/components/MonolithToMultiAgentArticle";

export const metadata: Metadata = {
  title: "From Monolith to Multi-Agent: The Refactoring We Should Have Done Earlier | PHHM Journal — Sam Adeyemi",
  description: "Why PHHM's biggest performance improvement came from admitting the first architecture had reached its limits — and rebuilding without breaking production.",
};

export default function Page() {
  return <MonolithToMultiAgentArticle />;
}
