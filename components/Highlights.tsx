"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen, ShieldCheck, Bot, Layers } from "lucide-react";

const highlights = [
  {
    icon: GraduationCap,
    text: "First Class BEng (Hons) Software Engineering",
  },
  {
    icon: GraduationCap,
    text: "MSc (Distinction)",
  },
  {
    icon: BookOpen,
    text: "Published in Springer Nature — AI & Ethics",
  },
  {
    icon: ShieldCheck,
    text: "Peer Reviewer — Springer Nature (Trials Journal)",
  },
  {
    icon: Bot,
    text: "Designed a production Multi-Agent AI Platform",
  },
  {
    icon: Layers,
    text: "Built multiple AI-powered SaaS platforms",
  },
];

export default function Highlights() {
  return (
    <section id="highlights" className="py-24 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono text-cyan-400 text-sm mb-2">06 / HIGHLIGHTS</p>
        <h2 className="text-3xl font-bold mb-2 text-white">Professional Highlights</h2>
        <p className="text-gray-400 mb-10">
          A snapshot of academic achievement, published research, and production engineering work.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <motion.div
                key={h.text}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5 hover:border-cyan-400/40 transition-colors"
              >
                <div className="shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <Icon className="text-cyan-400" size={20} />
                </div>
                <p className="text-gray-200 text-sm font-medium">{h.text}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
