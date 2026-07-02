"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, FileText, ShieldCheck, Workflow, Sparkles } from "lucide-react";

const stack = ["Python", "OpenAI API", "FastAPI", "Clinical Trials"];

const highlights = [
  { icon: FileText, name: "AI-Assisted Documentation", role: "Generates and structures clinical trial protocol documents using OpenAI API-driven drafting." },
  { icon: ShieldCheck, name: "Protocol Consistency Checks", role: "Cross-references drafted sections against trial design rules to flag contradictions early." },
  { icon: Workflow, name: "Structured Workflow Engine", role: "Guides trial coordinators through a repeatable, auditable documentation process." },
  { icon: Sparkles, name: "Biostatistics-Informed Prompts", role: "Prompt design grounded in biostatistics methodology to reduce hallucinated or invalid content." },
];

const flow = [
  { step: "01", title: "Trial Parameters Input", desc: "Coordinator enters trial design parameters — population, endpoints, arms, and methodology." },
  { step: "02", title: "AI Drafting", desc: "OpenAI API drafts protocol sections and supporting documentation based on the input parameters." },
  { step: "03", title: "Consistency Validation", desc: "Drafted content is checked against trial design rules for contradictions or gaps." },
  { step: "04", title: "Human Review", desc: "Coordinator reviews and edits AI-drafted sections before finalising." },
  { step: "05", title: "Export & Archive", desc: "Finalised protocol documentation is exported and archived for regulatory submission." },
];

export default function TrialForgeCaseStudy() {
  return (
    <main className="min-h-screen bg-bg text-gray-200 px-6 py-24 max-w-5xl mx-auto">
      <Link href="/#projects" className="inline-flex items-center gap-2 text-cyan-300 text-sm mb-10 hover:underline">
        <ArrowLeft size={16} /> Back to Projects
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="font-mono text-cyan-400 text-sm mb-2">CASE STUDY</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
          TrialForge AI
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mb-8">
          AI-assisted clinical trial documentation and protocol drafting, combining biostatistics expertise with OpenAI-powered generation to accelerate trial setup.
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {stack.map((s) => (
            <span key={s} className="px-3 py-1 rounded-full text-xs font-mono text-cyan-200 border border-cyan-500/20 bg-cyan-500/5">
              {s}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mb-16">
          <a href="https://github.com/SamAde1203" target="_blank" className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 hover:border-cyan-400 transition-colors text-sm">
            <Github size={16} /> View on GitHub
          </a>
          <a href="#" className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500 text-black font-medium text-sm hover:opacity-90 transition-opacity">
            <ExternalLink size={16} /> Live Demo
          </a>
        </div>
      </motion.div>

      <section className="grid md:grid-cols-3 gap-6 mb-20">
        {[
          { value: "AI-Drafted", label: "Protocol documentation generated from structured inputs" },
          { value: "Validated", label: "Cross-checked against trial design consistency rules" },
          { value: "Biostatistics-Led", label: "Prompt engineering grounded in trial methodology expertise" },
        ].map((m) => (
          <div key={m.label} className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
            <p className="text-2xl font-bold text-cyan-300 mb-2">{m.value}</p>
            <p className="text-gray-400 text-sm">{m.label}</p>
          </div>
        ))}
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-2">The Problem</h2>
        <p className="text-gray-400 max-w-3xl">
          Drafting clinical trial protocol documentation is slow, repetitive, and error-prone — coordinators spend significant time writing sections that follow predictable structures, while inconsistencies between sections can delay regulatory approval.
        </p>
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-2">The Solution</h2>
        <p className="text-gray-400 max-w-3xl mb-10">
          I built an AI-assisted documentation tool that drafts protocol sections from structured trial parameters, checks them for internal consistency, and gives coordinators a structured review workflow before finalising submission-ready documents.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {highlights.map((h) => {
            const Icon = h.icon;
            return (
              <div key={h.name} className="rounded-xl border border-white/10 bg-white/5 p-5 hover:border-cyan-400/40 transition-colors">
                <Icon className="text-cyan-400 mb-3" size={22} />
                <h3 className="font-semibold text-white mb-1">{h.name}</h3>
                <p className="text-gray-400 text-sm">{h.role}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-8">How It Works</h2>
        <div className="space-y-4">
          {flow.map((f) => (
            <div key={f.step} className="flex gap-5 items-start">
              <span className="font-mono text-cyan-400 text-lg w-10 shrink-0">{f.step}</span>
              <div className="border-l border-white/10 pl-5 pb-4">
                <h3 className="font-semibold text-white">{f.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-4">Outcome</h2>
        <p className="text-gray-400 max-w-3xl">
          TrialForge AI cuts the time required to produce first-draft protocol documentation, while its consistency checks catch design contradictions earlier in the process, reducing costly revisions later in regulatory review.
        </p>
      </section>

      <Link href="/#projects" className="inline-flex items-center gap-2 text-cyan-300 text-sm hover:underline">
        <ArrowLeft size={16} /> Back to all Projects
      </Link>
    </main>
  );
}
