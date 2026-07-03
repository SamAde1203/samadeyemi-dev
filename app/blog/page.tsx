import Link from "next/link";
import type { Metadata } from "next";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "PHHM Journal — Production AI Engineering | Sam Adeyemi",
  description:
    "A nine-part engineering series on building production multi-agent AI systems: architecture, FastAPI, configuration, state, prompt versioning, guardrails, observability, evaluation, and security.",
};

export default function BlogHome() {
  const [lead, ...rest] = articles;

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        {/* header */}
        <section className="mb-12">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface2)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            PHHM Journal • Production AI Series
          </p>
          <h1 className="font-['Instrument_Serif',Georgia,serif] text-5xl leading-[0.96] tracking-tight sm:text-6xl lg:text-7xl">
            Engineering essays on production AI
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-[var(--muted)]">
            A nine-part series on building multi-agent AI systems that survive production —
            architecture, APIs, configuration, state, versioning, guardrails, observability,
            evaluation, and security. Best read in order.
          </p>
        </section>

        {/* featured lead article */}
        <Link
          href={`/blog/${lead.slug}`}
          className="group block overflow-hidden rounded-[32px] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow)] transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-8 sm:p-10 lg:p-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface2)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                Part {lead.part} • Start here
              </div>
              <h2 className="font-['Instrument_Serif',Georgia,serif] text-3xl leading-tight sm:text-4xl lg:text-5xl">
                {lead.title}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
                {lead.description}
              </p>
              <div className="mt-6 text-sm font-semibold text-[var(--accent)]">
                Read the article →
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 border-t border-[var(--line)] bg-[linear-gradient(160deg,color-mix(in_oklab,var(--accent)_18%,var(--surface2)),var(--surface2))] p-8 sm:p-10 lg:border-l lg:border-t-0">
              {[
                ["Focus", lead.focus],
                ["Read time", lead.readTime],
                ["Series", "PHHM Journal"],
                ["Theme", "Production AI"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3"
                >
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {label}
                  </div>
                  <div className="mt-1 text-sm font-semibold">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </Link>

        {/* the rest of the series */}
        <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {rest.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group flex flex-col rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 flex items-center justify-between gap-2">
                <span className="inline-flex rounded-full border border-[var(--line)] bg-[var(--surface2)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                  Part {article.part} • {article.focus}
                </span>
                <span className="text-xs font-medium text-[var(--muted)]">
                  {article.readTime}
                </span>
              </div>
              <h2 className="font-['Instrument_Serif',Georgia,serif] text-2xl leading-snug transition group-hover:text-[var(--accent)]">
                {article.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-[var(--muted)]">
                {article.description}
              </p>
              <div className="mt-6 text-sm font-semibold text-[var(--accent)]">
                Read more →
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}