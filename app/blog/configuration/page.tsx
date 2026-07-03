import type { Metadata } from "next";
import ConfigurationArticle from "@/components/ConfigurationArticle";

export const metadata: Metadata = {
  title: "Configuration-Driven AI: Why YAML Beats Hardcoded Prompts in Production | PHHM Journal \u2014 Sam Adeyemi",
  description: "How PHHM adds new agents, models, prompts, and workflows without rewriting application code.",
};

export default function Page() {
  return <ConfigurationArticle />;
}