import type { Metadata } from "next";
import TestingWithoutLLMArticle from "@/components/TestingWithoutLLMArticle";

export const metadata: Metadata = {
  title: "Testing AI Systems Without Calling a Single LLM | PHHM Journal \u2014 Sam Adeyemi",
  description: "How PHHM runs thousands of regression tests in CI/CD without spending money on API calls \u2014 mocks, dependency injection, and golden responses.",
  openGraph: {
    title: "Testing AI Systems Without Calling a Single LLM",
    description: "How PHHM runs thousands of regression tests in CI/CD without spending money on API calls \u2014 mocks, dependency injection, and golden responses.",
    url: "https://www.samadeyemi.dev/blog/testing-without-llms",
    siteName: "Sam Adeyemi — PHHM Journal",
    type: "article",
    images: [{ url: "https://www.samadeyemi.dev/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Testing AI Systems Without Calling a Single LLM",
    description: "How PHHM runs thousands of regression tests in CI/CD without spending money on API calls \u2014 mocks, dependency injection, and golden responses.",
  },
};

export default function Page() {
  return <TestingWithoutLLMArticle />;
}