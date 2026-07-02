"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, FileSearch, Sparkles, Target, MessageSquare } from "lucide-react";

const stack = ["Python", "OpenAI API", "ATS Optimisation", "FastAPI"];

const highlights = [
  { icon: FileSearch, name: "ATS Analysis Engine", role: "Scores CVs against job descriptions and flags missing keywords or formatting issues." },
  { icon: Sparkles, name: "Tailored CV Generation", role: "Produces a CV rewritten to match the language and priorities of a specific job posting." },
  { icon: Target, name: "Recruiter Intelligence", role: "Surfaces insights on what a company and role are likely prioritising in candidates." },
  { icon: MessageSquare, name: "Interview Preparation", role: "Generates likely interview questions and structured talking points based on the CV and role." },
];

const flow = [
  { step: "01", title: "CV & Job Description Input", desc: "User uploads their CV and pastes the target job description." },
  { step: "02", title: "ATS Scoring", desc: "The ATS Analysis Engine scores compatibility and flags gaps against the job description." },
  { step: "03", title: "AI Tailoring", desc: "OpenAI API rewrites CV content to align with the role while preserving factual accuracy." },
  { step: "04", title: "Cover Letter & Prep Generated", desc: "A matching cover letter and interview preparation notes are produced automatically." },
  { step: "05", title: "Export", desc: "The user downloads a polished, tailored application package ready to submit." },
];

export default function CVBuilderCaseStudy() {
  return (
    <main className="min-h-screen bg-bg text-gray-200 px-6 py-24 max-w-5xl mx-auto">
      <Link href="/#projects" className="inline-flex items-center gap-2 text-cyan-300 text-sm mb-10 hover:underline">
        <ArrowLeft size={16} /> Back to Projects
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="font-mono text-cyan-400 text-sm mb-2">CASE STUDY</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
          AI CV Builder Pro™
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mb-8">
          An AI-powered CV optimisation platform providing ATS analysis, tailored CV generation, cover letter creation, interview preparation and recruiter intelligence.
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
          { value: "ATS-Optimised", label: "Analyses CVs against real applicant tracking systems" },
          { value: "Tailored", label: "Generates CVs matched to specific job descriptions" },
          { value: "End-to-End", label: "CV, cover letter and interview prep in one flow" },
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
          Job seekers routinely lose out to Applicant Tracking System (ATS) filters, submitting generic CVs that fail to match the specific language and requirements of a job description, regardless of their actual qualifications.
        </p>
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-2">The Solution</h2>
        <p className="text-gray-400 max-w-3xl mb-10">
          I built an AI-powered platform that analyses a CV against a target job description, scores its ATS compatibility, and generates a tailored CV, cover letter and interview preparation notes in a single workflow.
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
          AI CV Builder Pro gives job seekers a structured, data-driven way to close the gap between their experience and what recruiters and ATS systems are actually scanning for, materially improving callback rates.
        </p>
      </section>

      <Link href="/#projects" className="inline-flex items-center gap-2 text-cyan-300 text-sm hover:underline">
        <ArrowLeft size={16} /> Back to all Projects
      </Link>
    </main>
  );
}
