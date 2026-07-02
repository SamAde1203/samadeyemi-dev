"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, FileText, ArrowRight } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono text-cyan-400 text-sm mb-2">07 / CONTACT</p>
        <h2 className="text-3xl font-bold mb-4 text-white">Let&apos;s Build Something Great</h2>
        <p className="text-gray-400 mb-10">
          Available immediately. Open to remote and UK-based roles.
        </p>

        <div className="flex justify-center gap-6 mb-10">
          <a href="mailto:samoadeyemi@yahoo.co.uk" className="p-4 rounded-full border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors">
            <Mail className="text-cyan-300" />
          </a>
          <a href="https://linkedin.com/in/samadeyemi-apex" target="_blank" className="p-4 rounded-full border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors">
            <Linkedin className="text-cyan-300" />
          </a>
          <a href="https://github.com/SamAde1203" target="_blank" className="p-4 rounded-full border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors">
            <Github className="text-cyan-300" />
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <a href="/Sam_Adeyemi_CV.pdf" className="flex items-center gap-2 bg-cyan-500 text-black font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
            <FileText size={16} /> Download CV
          </a>
          <a href="#projects" className="flex items-center gap-2 border border-white/20 px-6 py-3 rounded-lg hover:border-cyan-400 transition-colors">
            View My Work
          </a>
          <a href="mailto:samoadeyemi@yahoo.co.uk" className="flex items-center gap-2 border border-white/20 px-6 py-3 rounded-lg hover:border-cyan-400 transition-colors">
            Let&apos;s Talk <ArrowRight size={16} />
          </a>
        </div>

        <p className="text-gray-500 text-xs mt-16">
          © 2026 Sam Adeyemi. Built with Next.js, TypeScript &amp; Tailwind CSS.
        </p>
        <p className="text-gray-600 text-xs mt-1">v2.1 — Unbeatable Portfolio</p>
      </motion.div>
    </section>
  );
}
