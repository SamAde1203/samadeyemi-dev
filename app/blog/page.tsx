import Link from "next/link";
import { articles } from "@/data/articles";

export default function BlogHome() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-24">
      <section className="mb-12">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">PHHM Journal</p>
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">Blog</h1>
        <p className="mt-5 max-w-2xl text-lg text-gray-600">
          Engineering essays on multi-agent AI, reliability, observability, security, and production software design.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <Link key={article.slug} href={`/blog/${article.slug}`} className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div className="mb-4 inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gray-600">
              Article
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 group-hover:text-gray-700">{article.title}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">Read the full article in the PHHM series.</p>
            <div className="mt-6 text-sm font-medium text-gray-900">Read more →</div>
          </Link>
        ))}
      </section>
    </main>
  );
}