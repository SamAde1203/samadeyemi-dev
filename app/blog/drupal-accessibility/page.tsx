import type { Metadata } from "next";
import DrupalAccessibilityArticle from "@/components/DrupalAccessibilityArticle";

const title = "Accessibility as a Build Requirement: WCAG 2.2 AA Checks in a Drupal CI Pipeline";
const description = "How axe-core and Playwright check WCAG 2.2 AA on every push, the two problems they caught, and what automated testing can't tell you.";

export const metadata: Metadata = {
  title: `${title} | Drupal Notes — Sam Adeyemi`,
  description,
  openGraph: {
    title,
    description,
    url: "https://www.samadeyemi.dev/blog/drupal-accessibility",
    siteName: "Sam Adeyemi — Drupal Notes",
    type: "article",
    images: [{ url: "https://www.samadeyemi.dev/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <DrupalAccessibilityArticle />;
}
