import type { Metadata } from "next";
import FastAPIArticle from "@/components/FastAPIArticle";

export const metadata: Metadata = {
  title: "Building Production AI APIs with FastAPI | PHHM Journal \u2014 Sam Adeyemi",
  description: "Why AI APIs are orchestration, not CRUD: a single workflow endpoint, Pydantic validation at the boundary, and a thin FastAPI layer.",
  openGraph: {
    title: "Building Production AI APIs with FastAPI",
    description: "Why AI APIs are orchestration, not CRUD: a single workflow endpoint, Pydantic validation at the boundary, and a thin FastAPI layer.",
    url: "https://www.samadeyemi.dev/blog/fastapi",
    siteName: "Sam Adeyemi — PHHM Journal",
    type: "article",
    images: [{ url: "https://www.samadeyemi.dev/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Building Production AI APIs with FastAPI",
    description: "Why AI APIs are orchestration, not CRUD: a single workflow endpoint, Pydantic validation at the boundary, and a thin FastAPI layer.",
  },
};

export default function Page() {
  return <FastAPIArticle />;
}