"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "85%", label: "Faster generation via parallelised orchestration" },
  { value: "73%", label: "Fewer errors through schema validation pipelines" },
  { value: "20+", label: "Automated validation rules built (TDCT Validator)" },
  { value: "6+", label: "Years of production software engineering experience" },
];

export default function Metrics() {
  return (
    <section id="metrics" className="py-24 px-6 bg-white/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-cyan-400 text-sm mb-2 text-center">03 / IMPACT</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Measurable Results</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            These aren't just numbers — they're proof of systems that work.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">{s.value}</p>
                <p className="text-muted-foreground text-sm max-w-[160px] mx-auto">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}