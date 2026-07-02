"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

const flagships = [
  {
    slug: "seedtracker",
    tag: "247 orgs • ₦2.4B+ tracked • Live in production",
    title: "SeedTracker",
    description:
      "Multi-tenant fintech SaaS platform for organisational financial management — dual-gateway payments, offline-first sync, WhatsApp-native notifications and AI engagement predictions.",
    stack: ["Next.js", "React", "TypeScript", "Paystack", "Flutterwave", "Claude AI"],
    demo: "https://seedtracker.ng",
    code: "https://github.com/SamAde1203",
  },
  {
    slug: "phhm",
    tag: "6 agents • 85% faster • 73% fewer errors",
    title: "PHHM Multi-Agent AI Platform",
    description:
      "A modular Generative AI platform built around six specialised agents — Overseer, Welcome, Analyst, Care, Communications and Gospel — collaborating through a central orchestration layer.",
    stack: ["Python", "FastAPI", "OpenAI API", "REST APIs", "YAML"],
    demo: "#",
    code: "https://github.com/SamAde1203",
  },
];

const projects = [
  {
    slug: "cv-builder",
    tag: "10+ tools • 100% AI-driven",
    title: "AI CV Builder Pro™",
    description:
      "Full-stack AI career system with 10+ specialised tools — CV Builder, Interview Coach, Company Intelligence, Salary Negotiator, and more.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "AI Integration"],
    demo: "#",
    code: "https://github.com/SamAde1203/phhm-suite",
  },
  {
    slug: "alphawings",
    tag: "500+ users • 4.8/5 rating • GPT-4",
    title: "Alpha Wings AI — Post Booster",
    description:
      "GPT-4-powered SaaS that generates and adapts social media content across four platforms from a single input, on a tiered subscription model.",
    stack: ["Next.js", "GPT-4 API", "Stripe", "Multi-Platform APIs"],
    demo: "https://alphawingsai.com",
    code: "https://github.com/SamAde1203",
  },
  {
    slug: "tdct",
    tag: "20+ rules • MIT-licensed",
    title: "TDCT Validator",
    description:
      "Python/YAML validation framework running 20+ automated checks on clinical trial protocols. Detects logical, safety, and design flaws before trial initiation.",
    stack: ["Python", "YAML", "Validation", "MIT License"],
    demo: "https://github.com/SamAde1203/tdct-validator",
    code: "https://github.com/SamAde1203/tdct-validator",
  },
  {
    slug: "trialforge",
    tag: "AI-assisted • Clinical documentation",
    title: "TrialForge AI",
    description:
      "AI-powered tooling supporting clinical trial documentation, validation and protocol automation for research teams.",
    stack: ["Python", "OpenAI API", "Clinical Trials"],
    demo: "#",
    code: "https://github.com/SamAde1203",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono text-cyan-400 text-sm mb-2">04 / PROJECTS</p>
        <h2 className="text-3xl font-bold mb-2 text-white">Featured Work</h2>
        <p className="text-gray-400 mb-10">
          Systems I&apos;ve built &mdash; each one solving a real problem with measurable outcomes.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {flagships.map((p) => (
            <div key={p.slug} className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-8 hover:border-cyan-400/50 transition-colors">
              <p className="text-xs font-mono text-cyan-300 mb-3">{p.tag}</p>
              <h3 className="text-2xl font-bold text-white mb-3">⭐ {p.title}</h3>
              <p className="text-gray-400 text-sm mb-5">{p.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {p.stack.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-full text-xs font-mono text-cyan-200 border border-cyan-500/20 bg-cyan-500/5">
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <Link href={`/projects/${p.slug}`} className="flex items-center gap-2 text-sm text-cyan-300 hover:underline">
                  <ExternalLink size={14} /> View Case Study
                </Link>
                <a href={p.code} target="_blank" className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-300 transition-colors">
                  <Github size={14} /> Code
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((p) => (
            <div key={p.slug} className="rounded-xl border border-white/10 bg-white/5 p-6 hover:border-cyan-400/40 transition-colors">
              <p className="text-xs font-mono text-gray-500 mb-2">{p.tag}</p>
              <h4 className="font-bold text-lg mb-2 text-white">{p.title}</h4>
              <p className="text-gray-400 text-sm mb-4">{p.description}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {p.stack.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-full text-xs font-mono text-cyan-200 border border-cyan-500/20 bg-cyan-500/5">
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <Link href={`/projects/${p.slug}`} className="flex items-center gap-2 text-sm text-cyan-300 hover:underline">
                  <ExternalLink size={14} /> Case Study
                </Link>
                <a href={p.code} target="_blank" className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-300 transition-colors">
                  <Github size={14} /> Code
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-5 text-sm text-gray-400">
          🔄 <span className="text-white font-medium">In Progress:</span> Clinical Protocol RAG Assistant — FastAPI backend, OpenAI API, Vector search, React front end, Dockerised deployment.
        </div>
      </motion.div>
    </section>
  );
}
