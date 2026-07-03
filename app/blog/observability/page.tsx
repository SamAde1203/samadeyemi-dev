import type { Metadata } from "next";
import ObservabilityArticle from "@/components/ObservabilityArticle";

export const metadata: Metadata = {
  title: "Observability for Multi-Agent AI Systems | PHHM Journal \u2014 Sam Adeyemi",
  description: "You can't debug what you can't see: correlation IDs, structured logs, distributed traces, metrics, and audit trails.",
  openGraph: {
    title: "Observability for Multi-Agent AI Systems",
    description: "You can't debug what you can't see: correlation IDs, structured logs, distributed traces, metrics, and audit trails.",
    url: "https://www.samadeyemi.dev/blog/observability",
    siteName: "Sam Adeyemi — PHHM Journal",
    type: "article",
    images: [{ url: "https://www.samadeyemi.dev/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Observability for Multi-Agent AI Systems",
    description: "You can't debug what you can't see: correlation IDs, structured logs, distributed traces, metrics, and audit trails.",
  },
};

export default function Page() {
  return <ObservabilityArticle />;
}