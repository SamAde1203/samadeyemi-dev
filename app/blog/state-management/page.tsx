import type { Metadata } from "next";
import StateManagementArticle from "@/components/StateManagementArticle";

export const metadata: Metadata = {
  title: "State Management for Multi-Agent AI | PHHM Journal \u2014 Sam Adeyemi",
  description: "Workflow state is not shared memory: structured, execution-owned context that survives retries and agent handoffs.",
  openGraph: {
    title: "State Management for Multi-Agent AI",
    description: "Workflow state is not shared memory: structured, execution-owned context that survives retries and agent handoffs.",
    url: "https://www.samadeyemi.dev/blog/state-management",
    siteName: "Sam Adeyemi — PHHM Journal",
    type: "article",
    images: [{ url: "https://www.samadeyemi.dev/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "State Management for Multi-Agent AI",
    description: "Workflow state is not shared memory: structured, execution-owned context that survives retries and agent handoffs.",
  },
};

export default function Page() {
  return <StateManagementArticle />;
}