import type { Metadata } from "next";
import FastAPIArticle from "@/components/FastAPIArticle";

export const metadata: Metadata = {
  title: "Building Production AI APIs with FastAPI | PHHM Journal \u2014 Sam Adeyemi",
  description: "Why AI APIs are orchestration, not CRUD: a single workflow endpoint, Pydantic validation at the boundary, and a thin FastAPI layer.",
};

export default function Page() {
  return <FastAPIArticle />;
}