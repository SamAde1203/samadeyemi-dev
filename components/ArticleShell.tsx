"use client";

import type React from "react";
import {
  ArrowLeft,
  Clock3,
  BadgeCheck,
  GitBranch,
  LineChart,
  BookOpen,
  Cpu,
  Server,
  SlidersHorizontal,
  FlaskConical,
  Shield,
  GitCommit,
  Lock,
  Database,
  FileJson,
  Boxes,
  Recycle,
  Siren,
  TestTube,
  Coins,
  Wallet,
} from "lucide-react";

/* ------------------------------- data types ------------------------------- */

export type ArticleBlock =
  | { t: "h2"; text: string }
  | { t: "h3"; text: string }
  | { t: "p"; text: string }
  | { t: "pull"; text: string }
  | { t: "diagram"; text: string }
  | { t: "code"; text: string }
  | { t: "list"; items: string[] }
  | { t: "table"; headers: string[]; rows: string[][] };

export type ArticleData = {
  kicker: string;
  focus: string;
  icon: keyof typeof ICONS;
  title: string;
  subtitle: string;
  readTime: string;
  blocks: ArticleBlock[];
};

const ICONS = {
  book: BookOpen,
  cpu: Cpu,
  server: Server,
  sliders: SlidersHorizontal,
  flask: FlaskConical,
  shield: Shield,
  commit: GitCommit,
  lock: Lock,
  database: Database,
  boxes: Boxes,
  recycle: Recycle,
  siren: Siren,
  testtube: TestTube,
  coins: Coins,
  wallet: Wallet,
} as const;

/* ------------------------------- utilities -------------------------------- */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

/** Render inline **bold** markers inside prose. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-[var(--text)]">
            {part}
          </strong>
        ) : (
          <span key={i}>{part.replace(/\*+/g, "")}</span>
        )
      )}
    </>
  );
}

/* ------------------------------- primitives ------------------------------- */

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-12 font-['Instrument_Serif',Georgia,serif] text-2xl leading-snug sm:text-3xl">
      {children}
    </h3>
  );
}

function P({ text }: { text: string }) {
  return (
    <p className="mt-4 text-base leading-7 text-[var(--muted)]">
      <Inline text={text} />
    </p>
  );
}

function Pull({ text }: { text: string }) {
  return (
    <blockquote className="mt-8 rounded-[24px] border-l-4 border-[var(--accent)] bg-[var(--surface2)] px-6 py-5 font-['Instrument_Serif',Georgia,serif] text-2xl leading-tight sm:text-3xl">
      <Inline text={text} />
    </blockquote>
  );
}

function Diagram({ text }: { text: string }) {
  return (
    <figure className="mt-8 overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface2)]">
      <pre className="overflow-x-auto px-6 py-6 font-mono text-[13px] leading-6 text-[var(--text)]">
        {text}
      </pre>
    </figure>
  );
}

function Code({ text }: { text: string }) {
  return (
    <figure className="mt-8 overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface2)]">
      <figcaption className="flex items-center gap-2 border-b border-[var(--line)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
        <FileJson className="h-3.5 w-3.5 text-[var(--accent)]" /> Example
      </figcaption>
      <pre className="overflow-x-auto px-6 py-6 font-mono text-[13px] leading-6 text-[var(--text)]">
        {text}
      </pre>
    </figure>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface2)] px-4 py-3 text-sm text-[var(--muted)]"
        >
          <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
          <span>
            <Inline text={item} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function MetricTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <figure className="mt-8 overflow-x-auto rounded-3xl border border-[var(--line)] bg-[var(--surface2)]">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-[var(--line)] text-[var(--text)]">
            {headers.map((h) => (
              <th key={h} className="px-5 py-3 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-[var(--line)] last:border-0">
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={
                    ci === 0
                      ? "px-5 py-3 font-medium text-[var(--text)]"
                      : "px-5 py-3 text-[var(--muted)]"
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.t) {
    case "h3":
      return <SubHeading>{block.text}</SubHeading>;
    case "p":
      return <P text={block.text} />;
    case "pull":
      return <Pull text={block.text} />;
    case "diagram":
      return <Diagram text={block.text} />;
    case "code":
      return <Code text={block.text} />;
    case "list":
      return <Checklist items={block.items} />;
    case "table":
      return <MetricTable headers={block.headers} rows={block.rows} />;
    default:
      return null;
  }
}

/* --------------------------------- shell ---------------------------------- */

export default function ArticleShell({ article }: { article: ArticleData }) {
  const Icon = ICONS[article.icon] ?? BookOpen;

  // group blocks into sections split at each h2
  type Section = { id: string; title: string | null; blocks: ArticleBlock[] };
  const sections: Section[] = [];
  let current: Section = { id: "introduction", title: null, blocks: [] };
  for (const block of article.blocks) {
    if (block.t === "h2") {
      if (current.blocks.length > 0 || current.title) sections.push(current);
      current = { id: slugify(block.text), title: block.text, blocks: [] };
    } else {
      current.blocks.push(block);
    }
  }
  if (current.blocks.length > 0 || current.title) sections.push(current);

  const toc = sections.filter((s) => s.title);
  const stats = [
    { label: "Focus", value: article.focus },
    { label: "Read time", value: article.readTime },
    { label: "Series", value: "PHHM Journal" },
    { label: "Theme", value: "Production AI" },
  ];

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <header className="mb-8 flex items-center justify-between gap-4">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold shadow-[var(--shadow)] transition hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </a>
          <div className="hidden items-center gap-2 text-sm text-[var(--muted)] md:flex">
            <Clock3 className="h-4 w-4" /> Long-form article
          </div>
        </header>

        {/* hero */}
        <section className="overflow-hidden rounded-[32px] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow)]">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative p-8 sm:p-10 lg:p-14">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface2)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                <Icon className="h-3.5 w-3.5 text-[var(--accent)]" /> {article.kicker}
              </div>
              <h1 className="max-w-3xl font-['Instrument_Serif',Georgia,serif] text-5xl leading-[0.96] sm:text-6xl lg:text-7xl">
                {article.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-[var(--muted)] sm:text-xl">
                {article.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-[var(--line)] bg-[var(--surface2)] px-4 py-3"
                  >
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                      {s.label}
                    </div>
                    <div className="mt-1 text-sm font-semibold">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="relative border-t border-[var(--line)] bg-[linear-gradient(160deg,color-mix(in_oklab,var(--accent)_18%,var(--surface2)),var(--surface2))] p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-5">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <GitBranch className="h-4 w-4 text-[var(--accent2)]" /> Table of contents
                </div>
                <ol className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                  {toc.map((s, i) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="transition hover:text-[var(--accent)]">
                        {i + 1}. {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>
        </section>

        {/* body */}
        {sections.map((section, i) => (
          <article
            key={section.id + i}
            className="mt-10 rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow)] sm:p-10 lg:p-12"
          >
            {section.title && (
              <div id={section.id} className="scroll-mt-28">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface2)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  <Icon className="h-3.5 w-3.5 text-[var(--accent)]" /> Part{" "}
                  {toc.findIndex((s) => s.id === section.id) + 1}
                </div>
                <h2 className="font-['Instrument_Serif',Georgia,serif] text-4xl leading-tight sm:text-5xl">
                  {section.title}
                </h2>
              </div>
            )}
            {section.blocks.map((block, bi) => (
              <Block key={bi} block={block} />
            ))}
          </article>
        ))}

        {/* footer */}
        <footer className="mt-10 rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-8 text-sm text-[var(--muted)] shadow-[var(--shadow)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <LineChart className="h-4 w-4 text-[var(--accent)]" />
              PHHM Journal • Production AI Series
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/blog"
                className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white"
              >
                Read next
              </a>
              <a
                href="/#projects"
                className="rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold"
              >
                View my work
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
