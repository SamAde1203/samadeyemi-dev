"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, Sparkles, Layers, Calendar, Hash, Repeat, Smartphone } from "lucide-react";

const stack = ["Next.js", "React", "TypeScript", "GPT-4 API", "Stripe", "Multi-Platform APIs"];

const highlights = [
  { icon: Sparkles, name: "GPT-4 Content Generation", role: "Generates platform-optimised social posts from a single input prompt using GPT-4." },
  { icon: Layers, name: "Multi-Platform Adaptation", role: "One idea is automatically reformatted into four distinct outputs tailored to LinkedIn, Twitter/X, Facebook and Instagram." },
  { icon: Hash, name: "Smart Hashtag Optimisation", role: "Generates relevant, platform-appropriate hashtags automatically alongside each post." },
  { icon: Calendar, name: "Intelligent Scheduling", role: "Schedules posts across connected accounts for optimal engagement windows." },
  { icon: Repeat, name: "Content Variation Engine", role: "Produces multiple stylistic variations of the same idea to avoid repetitive posting patterns." },
  { icon: Smartphone, name: "Tiered SaaS Billing", role: "Usage-based subscription tiers (Free, Starter, Pro, Agency) with automated billing and post-count limits." },
];

const flow = [
  { step: "01", title: "Input an Idea", desc: "User enters a topic, prompt, or content idea into the dashboard." },
  { step: "02", title: "GPT-4 Generation", desc: "The generation engine produces a first draft optimised for tone and structure." },
  { step: "03", title: "Platform Adaptation", desc: "The idea is automatically reformatted into four platform-specific versions — LinkedIn, Twitter/X, Facebook, Instagram." },
  { step: "04", title: "Review & Edit", desc: "User reviews AI-generated posts, edits if needed, and approves for publishing." },
  { step: "05", title: "Schedule or Publish", desc: "Posts are scheduled for optimal engagement times or published immediately across connected accounts." },
];

export default function AlphaWingsCaseStudy() {
  return (
    <main className="min-h-screen bg-bg text-gray-200 px-6 py-24 max-w-5xl mx-auto">
      <Link href="/#projects" className="inline-flex items-center gap-2 text-cyan-300 text-sm mb-10 hover:underline">
        <ArrowLeft size={16} /> Back to Projects
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="font-mono text-cyan-400 text-sm mb-2">CASE STUDY</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
          Alpha Wings AI — Post Booster
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mb-8">
          A GPT-4-powered SaaS platform that generates and adapts social media content across four
          platforms from a single input, serving 500+ creators and businesses on a tiered subscription model.
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {stack.map((s) => (
            <span key={s} className="px-3 py-1 rounded-full text-xs font-mono text-cyan-200 border border-cyan-500/20 bg-cyan-500/5">
              {s}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mb-16">
          <a href="https://alphawingsai.com" target="_blank" className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500 text-black font-medium text-sm hover:opacity-90 transition-opacity">
            <ExternalLink size={16} /> Live Platform
          </a>
          <a href="https://github.com/SamAde1203" target="_blank" className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 hover:border-cyan-400 transition-colors text-sm">
            <Github size={16} /> GitHub
          </a>
        </div>
      </motion.div>

      <section className="grid md:grid-cols-4 gap-6 mb-20">
        {[
          { value: "500+", label: "Creators & businesses served" },
          { value: "4.8/5", label: "Average user rating" },
          { value: "4", label: "Platforms supported" },
          { value: "10s", label: "Content generation time" },
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
          Content creators and small businesses were spending 10+ hours per week manually writing and
          reformatting posts for multiple social platforms, while existing scheduling tools like Buffer
          and Hootsuite handled distribution but left the actual content creation entirely up to the user.
        </p>
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-2">The Solution</h2>
        <p className="text-gray-400 max-w-3xl mb-10">
          I built a SaaS platform that uses the GPT-4 API to generate the content itself, not just schedule
          it — automatically adapting a single idea into four platform-specific formats, complete with
          optimised hashtags and intelligent scheduling, wrapped in a tiered subscription billing system.
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
          Alpha Wings AI is live in production with 500+ creators and businesses and a 4.8/5 average
          rating, replacing hours of manual content writing with a 10-second GPT-4-powered generation
          workflow while operating on a self-sustaining tiered subscription model.
        </p>
      </section>

      <Link href="/#projects" className="inline-flex items-center gap-2 text-cyan-300 text-sm hover:underline">
        <ArrowLeft size={16} /> Back to all Projects
      </Link>
    </main>
  );
}
