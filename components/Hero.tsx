"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center px-6 pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulseGlow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulseGlow" />
      </div>

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-5 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="md:col-span-3"
        >
          <span className="inline-flex items-center gap-2 pill px-4 py-1.5 rounded-full text-xs text-cyan-300 border border-cyan-500/20 bg-cyan-500/5 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Available immediately — Open to remote and UK-based roles
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">
            Hi, I&apos;m <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Sam Adeyemi</span>
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-gray-300 mb-6">
            Software Engineer — Generative AI
          </p>

          <div className="flex gap-8 mb-6">
            <div>
              <p className="text-2xl font-bold text-cyan-300">85%</p>
              <p className="text-xs text-gray-500">Faster workflows</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-cyan-300">73%</p>
              <p className="text-xs text-gray-500">Fewer errors</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-cyan-300">6+</p>
              <p className="text-xs text-gray-500">Years experience</p>
            </div>
          </div>

          <p className="text-gray-400 text-lg max-w-xl mb-8">
            Building production AI systems that transform complex ideas into scalable software.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <a href="#projects" className="flex items-center gap-2 bg-cyan-500 text-black font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
              View My Work <ArrowRight size={16} />
            </a>
            <a href="/Sam_Adeyemi_CV.pdf" className="flex items-center gap-2 border border-white/20 px-6 py-3 rounded-lg hover:border-cyan-400 transition-colors">
              <FileText size={16} /> Download CV
            </a>
          </div>

          <div className="flex gap-5">
            <a href="https://github.com/SamAde1203" target="_blank" className="text-gray-400 hover:text-cyan-300 transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/samadeyemi-apex" target="_blank" className="text-gray-400 hover:text-cyan-300 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="mailto:sam@samadeyemi.dev" className="text-gray-400 hover:text-cyan-300 transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="md:col-span-2 flex justify-center relative"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-pulseGlow" />
            <div className="absolute inset-4 rounded-full border border-violet-500/20" />
            <img
              src="/headshot.jpg"
              alt="Sam Adeyemi — Generative AI Software Engineer"
              className="absolute inset-6 rounded-full object-cover w-[calc(100%-3rem)] h-[calc(100%-3rem)] shadow-2xl shadow-cyan-500/20"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}