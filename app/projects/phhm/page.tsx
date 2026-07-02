"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, Users, Zap, ShieldCheck, Layers, Bot, MessageSquare } from "lucide-react";

const stack = ["Python", "FastAPI", "OpenAI API", "REST APIs", "YAML", "Multi-Agent AI"];

const highlights = [
  { icon: Bot, name: "Six Specialised Agents", role: "Overseer, Welcome, Analyst, Care, Communications and Gospel agents each handle a distinct domain of the workflow." },
  { icon: Layers, name: "Central Orchestration Layer", role: "Routes tasks between agents, manages shared state, and coordinates handoffs without manual intervention." },
  { icon: Zap, name: "85% Faster Workflows", role: "Parallelised agent execution cuts end-to-end processing time compared to sequential manual handling." },
  { icon: ShieldCheck, name: "73% Fewer Errors", role: "Schema validation and agent-level checks catch inconsistencies before they propagate downstream." },
  { icon: Users, name: "Role-Based Access", role: "Each agent operates within defined permission boundaries, matching real organisational responsibilities." },
  { icon: MessageSquare, name: "Configuration Over Code", role: "JSON/YAML-driven behaviour lets non-technical users adjust agent logic without touching source code." },
];

const flow = [
  { step: "01", title: "Task Intake", desc: "The Overseer agent receives an incoming request and determines which specialised agents need to be involved." },
  { step: "02", title: "Agent Delegation", desc: "Tasks are routed to the Welcome, Analyst, Care, Communications or Gospel agent based on domain." },
  { step: "03", title: "Parallel Processing", desc: "Multiple agents work concurrently where tasks are independent, cutting total processing time." },
  { step: "04", title: "Validation Layer", desc: "Outputs are checked against schema and business rules before being passed downstream." },
  { step: "05", title: "Orchestrated Output", desc: "The Overseer consolidates agent outputs into a single coherent result for the end user." },
];

export default function PHHMCaseStudy() {
  return (
    <main className="min-h-screen bg-bg text-gray-200 px-6 py-24 max-w-5xl mx-auto">
      <Link href="/#projects" className="inline-flex items-center gap-2 text-cyan-300 text-sm mb-10 hover:underline">
        <ArrowLeft size={16} /> Back to Projects
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="font-mono text-cyan-400 text-sm mb-2">FLAGSHIP CASE STUDY</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
          PHHM Multi-Agent AI Platform
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mb-8">
          A modular Generative AI platform built around six specialised agents collaborating through a
          central orchestration layer — cutting workflow time by 85% and errors by 73%.
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

      <section className="grid md:grid-cols-4 gap-6 mb-20">
        {[
          { value: "6", label: "Specialised AI agents" },
          { value: "85%", label: "Faster workflows" },
          { value: "73%", label: "Fewer errors" },
          { value: "100%", label: "Configuration-driven" },
        ].map((m) => (
          <div key={m.label} className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
            <p className="text-2xl font-bold text-cyan-300 mb-2">{m.value}</p>
            <p className="text-gray-400 text-xs">{m.label}</p>
          </div>
        ))}
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-2">The Problem</h2>
        <p className="text-gray-400 max-w-3xl">
          Complex organisational workflows spanning member communication, care coordination, analysis and
          content generation were being handled through disconnected manual processes, leading to slow
          turnaround times and inconsistent outputs across teams.
        </p>
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-2">The Solution</h2>
        <p className="text-gray-400 max-w-3xl mb-10">
          I architected a six-agent Generative AI ecosystem where each agent specialises in one domain,
          coordinated through a central orchestration layer that manages task delegation, parallel
          execution and output validation — replacing manual handoffs with an automated, auditable pipeline.
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
          The platform reduced end-to-end workflow time by 85% and cut output errors by 73%, replacing
          fragmented manual coordination with a single orchestrated system that scales without adding
          headcount.
        </p>
      </section>

      <Link href="/#projects" className="inline-flex items-center gap-2 text-cyan-300 text-sm hover:underline">
        <ArrowLeft size={16} /> Back to all Projects
      </Link>
    </main>
  );
}
