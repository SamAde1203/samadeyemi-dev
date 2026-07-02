"use client";

import { motion } from "framer-motion";
import { CheckCircle, Code, Layers, Zap } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-white/5">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono text-cyan-400 text-sm mb-2">01 / ABOUT</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Who I Am</h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Bio */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a <span className="text-cyan-300 font-semibold">Software Engineer — Generative AI</span> 
              with 6+ years of experience building production systems. My work focuses on
              Python-led APIs, metadata-driven workflows, and validation pipelines
              that deliver measurable impact.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I've built systems that reduced output errors by{" "}
              <span className="text-cyan-400 font-semibold">73%</span> and accelerated
              generation workflows by <span className="text-violet-400 font-semibold">85%</span>.
              My approach combines rigorous software engineering with a practical,
              commercial mindset.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Currently, I'm focused on <span className="text-cyan-300 font-semibold">Generative AI engineering</span> —
              turning early-stage AI ideas into secure, scalable applications
              that solve real-world challenges.
            </p>

            {/* Approach */}
            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              <div className="flex items-start gap-3">
                <CheckCircle size={18} className="text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Configuration over Code</p>
                  <p className="text-xs text-muted-foreground">JSON/YAML-driven architecture</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={18} className="text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Validation-First</p>
                  <p className="text-xs text-muted-foreground">73% fewer errors</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={18} className="text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Event-Driven Orchestration</p>
                  <p className="text-xs text-muted-foreground">85% faster workflows</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Quick Facts */}
          <div className="lg:col-span-1 space-y-4">
            <div className="card-glow rounded-xl p-6">
              <h3 className="font-semibold text-sm text-muted-foreground mb-4">Quick Facts</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="text-cyan-300">Sheffield, UK</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Availability</span>
                  <span className="text-cyan-300">Immediate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Remote</span>
                  <span className="text-cyan-300">✅ Open to</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="text-cyan-300">6+ years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Publications</span>
                  <span className="text-cyan-300">2 + 1 Peer Review</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SC Clearance</span>
                  <span className="text-cyan-300">Eligible to apply</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}