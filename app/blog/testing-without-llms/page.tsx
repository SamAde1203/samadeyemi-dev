import type { Metadata } from "next";
import TestingWithoutLLMArticle from "@/components/TestingWithoutLLMArticle";

export const metadata: Metadata = {
  title: "Testing AI Systems Without Calling a Single LLM | PHHM Journal — Sam Adeyemi",
  description: "How PHHM runs thousands of regression tests in CI/CD without spending money on API calls — mocks, dependency injection, and golden responses.",
};

export default function Page() {
  return <TestingWithoutLLMArticle />;
}
