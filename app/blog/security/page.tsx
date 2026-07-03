import type { Metadata } from "next";
import SecurityArticle from "@/components/SecurityArticle";

export const metadata: Metadata = {
  title: "Securing Multi-Agent AI Systems | PHHM Journal \u2014 Sam Adeyemi",
  description: "Prompt injection isn't the root problem \u2014 trust boundaries are. The model never decides what the platform does.",
};

export default function Page() {
  return <SecurityArticle />;
}