import type { Metadata } from "next";
import PromptVersioningArticle from "@/components/PromptVersioningArticle";

export const metadata: Metadata = {
  title: "Prompt Versioning at Scale | PHHM Journal \u2014 Sam Adeyemi",
  description: "Prompts as deployable software assets: semantic versions, workflow mapping, regression tests, and boring rollbacks.",
};

export default function Page() {
  return <PromptVersioningArticle />;
}