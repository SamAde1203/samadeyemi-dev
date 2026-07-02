"use client";

import { motion } from "framer-motion";
import { Brain, Database, ShieldCheck, Zap, GitBranch, Cloud } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "AI-Powered Workflows",
    description: "Event-driven orchestration and metadata-driven pipelines that accelerate generation by 85%.",
    metric: "85% faster",
  },
  {
    icon: Database,
    title: "Production APIs",
    description: "FastAPI, Python, REST APIs with validation layers and modular service boundaries.",
    metric: "Built for scale",
  },
  {
    icon: ShieldCheck,
    title: "Validation Pipelines",
    description: "Schema enforcement and rule-based validation that reduced output errors by 73%.",
    metric: "73% fewer errors",
  },
  {
    icon: Zap,
    title: "Generative AI Integration",
    description: "AI-assisted engineering with structured prompt/output review and governance.",
    metric: "AI governance-ready",
  },
  {
    icon: GitBranch,
    title: "Metadata-Driven Architecture",
    description: "JSON/YAML-driven systems where non-technical users can adjust behaviour without code.",
    metric: "Configurable",
  },
  {
    icon: Cloud,
    title: "Full-Stack Foundations",
    description: "Vanilla JavaScript, React-transferable components, API integration, and responsive UI.",
    metric: "Production-ready",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-6">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono text-cyan-400 text-sm mb-2">02 / SERVICES</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Deliver</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mb-12">
          I build systems that solve real problems — with measurable results.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="card-glow rounded-xl p-6 space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <service.icon className="text-cyan-400" size={24} />
              <h3 className="font-semibold text-lg">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
              <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                <span className="text-xs font-mono text-cyan-400">{service.metric}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}