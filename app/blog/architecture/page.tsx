import type { Metadata } from "next";
import ArchitectureArticle from "@/components/ArchitectureArticle";

export const metadata: Metadata = {
  title: "Building a Multi-Agent AI Orchestration Layer in Python | PHHM Journal \u2014 Sam Adeyemi",
  description: "Lessons from six collaborating agents: specialist agents, central orchestration, and shared workflow state that cut workflow time by 85% and errors by 73%.",
  openGraph: {
    title: "Building a Multi-Agent AI Orchestration Layer in Python",
    description: "Lessons from six collaborating agents: specialist agents, central orchestration, and shared workflow state that cut workflow time by 85% and errors by 73%.",
    url: "https://www.samadeyemi.dev/blog/architecture",
    siteName: "Sam Adeyemi — PHHM Journal",
    type: "article",
    images: [{ url: "https://www.samadeyemi.dev/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Building a Multi-Agent AI Orchestration Layer in Python",
    description: "Lessons from six collaborating agents: specialist agents, central orchestration, and shared workflow state that cut workflow time by 85% and errors by 73%.",
  },
};

export default function Page() {
  return <ArchitectureArticle />;
}