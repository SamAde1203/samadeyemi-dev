import type { Metadata } from "next";
import GuardrailsArticle from "@/components/GuardrailsArticle";

export const metadata: Metadata = {
  title: "Guardrails for Multi-Agent AI Systems | PHHM Journal \u2014 Sam Adeyemi",
  description: "Treat every AI response as untrusted input: schema validation, business rules, and recovery paths that contain failures.",
  openGraph: {
    title: "Guardrails for Multi-Agent AI Systems",
    description: "Treat every AI response as untrusted input: schema validation, business rules, and recovery paths that contain failures.",
    url: "https://www.samadeyemi.dev/blog/guardrails",
    siteName: "Sam Adeyemi — PHHM Journal",
    type: "article",
    images: [{ url: "https://www.samadeyemi.dev/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guardrails for Multi-Agent AI Systems",
    description: "Treat every AI response as untrusted input: schema validation, business rules, and recovery paths that contain failures.",
  },
};

export default function Page() {
  return <GuardrailsArticle />;
}