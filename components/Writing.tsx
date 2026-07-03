"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowRight, PenLine } from "lucide-react";
import { articles } from "@/data/articles";

// The three articles to feature on the homepage
const FEATURED_SLUGS = ["langchain", "prompt-incident", "architecture"];

export default function Writing() {
  const featured = FEATURED_SLUGS.map(
    (slug) => articles.find((a) => a.slug === slug)!
  ).filter(Boolean);

  return (
    <section id="writing" className="py-24 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono text-cyan-400 text-sm mb-2">07 / WRITING</p>
        <h2 className="text-3xl font-bold mb-2 text-white">The PHHM Journal</h2>
        <p className="text-gray-400 mb-10 max-w-2xl">
          A 15-part engineering series on building production multi-agent AI
          systems — architecture, orchestration, guardrails, observability,
          cost engineering, and the war stories in between. Written from real
          production experience, not theory.
        </p>

        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {featured.map((article, i) => (
            <motion.a
              key={article.slug}
              href={`/blog/${article.slug}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group flex flex-col rounded-xl border border-white/10 bg-white/5 p-5 hover:border-cyan-400/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-cyan-400">
                  Part {article.part} • {article.focus}
                </span>
                <span className="font-mono text-xs text-gray-500">
                  {article.readTime}
                </span>
              </div>
              <h3 className="text-white text-base font-semibold leading-snug mb-3 group-hover:text-cyan-300 transition-colors">
                {article.title}
              </h3>
              <p className="text-gray-400 text-sm leading-6 flex-1">
                {article.description.length > 120
                  ? article.description.slice(0, 117).trimEnd() + "…"
                  : article.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-cyan-400">
                Read article
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-5"
        >
          <div className="flex items-center gap-4">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <PenLine className="text-cyan-400" size={20} />
            </div>
            <p className="text-gray-200 text-sm font-medium">
              {articles.length} in-depth articles covering the full production
              AI stack — best read in order.
            </p>
          </div>
          <a
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-500/10 border border-cyan-400/40 px-5 py-2.5 text-sm font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-colors"
          >
            <BookOpen size={16} />
            Browse the full series
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
