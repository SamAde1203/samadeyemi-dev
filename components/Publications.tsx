"use client";

import { motion } from "framer-motion";
import { BookOpen, ExternalLink, Award } from "lucide-react";

const pubs = [
  {
    title: "Governance and Legitimacy in AI: Developing and Testing the AI Authorship Legitimacy Model",
    venue: "Springer Nature — AI and Ethics, 2026",
    doi: "10.1007/s43681-026-01162-8",
    type: "Journal Article",
  },
  {
    title: "Automated Trial Design Consistency Testing (TDCT): A Validation System for Detecting Protocol Design Flaws Before Clinical Trial Initiation",
    venue: "Zenodo Preprint, 2025",
    doi: "10.5281/zenodo.17844210",
    type: "Preprint",
  },
];

export default function Publications() {
  return (
    <section id="publications" className="py-24 px-6 bg-white/5">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono text-cyan-400 text-sm mb-2">05 / PUBLICATIONS</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Published Research</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mb-8">
          Peer-reviewed research at the intersection of AI governance, ethics, and validation systems.
        </p>

        <div className="space-y-4">
          {pubs.map((p) => (
            <motion.div
              key={p.title}
              className="card-glow rounded-xl p-6 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <BookOpen className="text-cyan-400 shrink-0 mt-1" size={22} />
              <div className="flex-1">
                <p className="font-semibold text-white">{p.title}</p>
                <p className="text-muted-foreground text-sm mt-1">{p.venue}</p>
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <span className="font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20">
                    {p.type}
                  </span>
                  <a
                    href={`https://doi.org/${p.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-cyan-300 transition-colors flex items-center gap-1"
                  >
                    DOI: {p.doi}
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Peer Reviewer Badge */}
        <motion.div
          className="mt-6 inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-violet-500/20 bg-violet-500/5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Award className="text-violet-400" size={20} />
          <span className="text-sm font-mono text-violet-300">
            Peer Reviewer — Springer Nature (Trials Journal)
          </span>
          <span className="text-xs text-muted-foreground">Reviewing methodology and AI ethics submissions</span>
        </motion.div>
      </motion.div>
    </section>
  );
}