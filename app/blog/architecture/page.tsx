import type { Metadata } from "next";
import ArchitectureArticle from "@/components/ArchitectureArticle";

export const metadata: Metadata = {
  title: "Building a Multi-Agent AI Orchestration Layer in Python | PHHM Journal \u2014 Sam Adeyemi",
  description: "Lessons from six collaborating agents: specialist agents, central orchestration, and shared workflow state that cut workflow time by 85% and errors by 73%.",
};

export default function Page() {
  return <ArchitectureArticle />;
}