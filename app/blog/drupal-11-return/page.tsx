import type { Metadata } from "next";
import DrupalReturnArticle from "@/components/DrupalReturnArticle";

const title = "Back to Drupal After Ten Years: Building a Council Service in Drupal 11";
const description = "What changed in Drupal 11 after a decade away: hook classes, PHP attributes, injected services, and two bugs the tests caught.";

export const metadata: Metadata = {
  title: `${title} | Drupal Notes — Sam Adeyemi`,
  description,
  openGraph: {
    title,
    description,
    url: "https://www.samadeyemi.dev/blog/drupal-11-return",
    siteName: "Sam Adeyemi — Drupal Notes",
    type: "article",
    images: [{ url: "https://www.samadeyemi.dev/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <DrupalReturnArticle />;
}
