import type { Metadata } from "next";
import GuardrailsArticle from "@/components/GuardrailsArticle";

export const metadata: Metadata = {
  title: "Guardrails for Multi-Agent AI Systems | PHHM Journal \u2014 Sam Adeyemi",
  description: "Treat every AI response as untrusted input: schema validation, business rules, and recovery paths that contain failures.",
};

export default function Page() {
  return <GuardrailsArticle />;
}