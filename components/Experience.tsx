"use client";
import { motion } from "framer-motion";

const timeline = [
  { year: "2019", title: "Apex Digital Africa", desc: "Joined as Lead Software & AI Systems Engineer, building production REST APIs and workflow engines." },
  { year: "2024", title: "HUNTER Clinical Trial Platform", desc: "Founded and led technical development of an AI-assisted clinical trial platform with protocol validation." },
  { year: "2025", title: "TDCT Validator & Zenodo Publication", desc: "Built a 20+ rule automated validation engine and published as a Zenodo preprint." },
  { year: "2026", title: "Springer Nature Publication", desc: "Published \"Governance and Legitimacy in AI\" in Springer Nature's AI and Ethics journal." },
  { year: "2026", title: "PHHM Multi-Agent AI Platform", desc: "Architected a six-agent Generative AI ecosystem, cutting workflow time by 85% and errors by 73%." },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono text-cyan-400 text-sm mb-2">JOURNEY</p>
        <h2 className="text-3xl font-bold mb-12">Experience Timeline</h2>

        <div className="relative pl-8 border-l border-white/10 space-y-10">
          {timeline.map((t, i) => (
            <div key={i} className="relative">
              <span className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
              <p className="font-mono text-cyan-300 text-sm mb-1">{t.year}</p>
              <h3 className="text-lg font-semibold text-white">{t.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{t.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}