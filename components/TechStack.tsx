"use client";
import { motion } from "framer-motion";
import {
  SiPython, SiFastapi, SiNextdotjs, SiReact, SiTypescript,
  SiNodedotjs, SiGithub, SiLinux, SiDocker,
} from "react-icons/si";
import { BsRobot } from "react-icons/bs";

const stack = [
  { icon: SiPython, name: "Python" },
  { icon: SiFastapi, name: "FastAPI" },
  { icon: SiNextdotjs, name: "Next.js" },
  { icon: SiReact, name: "React" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: BsRobot, name: "OpenAI" },
  { icon: SiNodedotjs, name: "Node.js" },
  { icon: SiGithub, name: "GitHub" },
  { icon: SiLinux, name: "Linux" },
  { icon: SiDocker, name: "Docker" },
];

export default function TechStack() {
  return (
    <section id="stack" className="py-16 px-6 border-y border-white/5 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-gray-500 text-xs font-mono tracking-widest mb-8">
          FEATURED TECHNOLOGIES
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-x-10 gap-y-6"
        >
          {stack.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.name} className="flex flex-col items-center gap-2 group">
                <Icon size={28} className="text-gray-500 group-hover:text-cyan-300 transition-colors" />
                <span className="text-xs text-gray-500 group-hover:text-cyan-300 transition-colors">
                  {s.name}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
