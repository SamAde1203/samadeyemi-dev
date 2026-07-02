"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, ShieldCheck, FileCheck, AlertTriangle, ListChecks } from "lucide-react";

const stack = ["Python", "YAML", "Schema Validation", "Clinical Trial Design", "Zenodo Published"];

const highlights = [
  { icon: ShieldCheck, name: "Rule Engine", role: "20+ automated validation rules encoded as YAML-driven validation logic." },
  { icon: FileCheck, name: "Schema Enforcement", role: "Validates protocol structure against clinical trial design standards before submission." },
  { icon: AlertTriangle, name: "Flaw Detection", role: "Flags inconsistencies and design flaws before clinical trial initiation, reducing costly rework." },
  { icon: ListChecks, name: "Structured Reporting", role: "Generates a structured validation report summarising every rule outcome for reviewers." },
];

const flow = [
  { step: "01", title: "Protocol Ingested", desc: "A clinical trial protocol document is parsed into structured data fields." },
  { step: "02", title: "YAML Rules Loaded", desc: "20+ validation rules are loaded from YAML-driven configuration files." },
  { step: "03", title: "Automated Checks Run", desc: "Each rule is executed against the protocol to detect design inconsistencies." },
  { step: "04", title: "Report Generated", desc: "A structured report flags every failed rule with explanation and severity." },
  { step: "05", title: "Reviewer Sign-off", desc: "Reviewers act on flagged issues before the trial protocol is finalised." },
];

export default function TDCTCaseStudy() {
  return (
    <main className="min-h-screen bg-bg text-gray-200 px-6 py-24 max-w-5xl mx-auto">
      <Link href="/#projects" className="inline-flex items-center gap-2 text-cyan-300 text-sm mb-10 hover:underline">
        <ArrowLeft size={16} /> Back to Projects
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="font-mono text-cyan-400 text-sm mb-2">CASE STUDY</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
          TDCT Validator
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mb-8">
          A Python validation engine executing 20+ automated protocol validation rules using YAML-driven logic — published as a Zenodo preprint.
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
          { value: "20+", label: "Automated validation rules encoded" },
          { value: "100%", label: "YAML-driven, no hardcoded logic" },
          { value: "2025", label: "Published as Zenodo preprint" },
        ].map((m) => (
          <div key={m.label} className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
            <p className="text-3xl font-bold text-cyan-300 mb-2">{m.value}</p>
            <p className="text-gray-400 text-sm">{m.label}</p>
          </div>
        ))}
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-2">The Problem</h2>
        <p className="text-gray-400 max-w-3xl">
          Clinical trial protocols often contain design inconsistencies that go undetected until late in the review process, leading to costly delays, regulatory pushback, and rework after a trial has already begun.
        </p>
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-2">The Solution</h2>
        <p className="text-gray-400 max-w-3xl mb-10">
          I built a Python validation engine that encodes clinical trial design rules as YAML configuration, allowing over 20 automated checks to run against any protocol document and flag inconsistencies before submission.
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
          TDCT Validator gives clinical trial teams an automated first line of defence against protocol design flaws, reducing manual review time and catching issues before they become expensive problems. The work was published as a Zenodo preprint in 2025.
        </p>
      </section>

      <Link href="/#projects" className="inline-flex items-center gap-2 text-cyan-300 text-sm hover:underline">
        <ArrowLeft size={16} /> Back to all Projects
      </Link>
    </main>
  );
}
