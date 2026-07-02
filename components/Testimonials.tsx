"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { ExternalLink } from "lucide-react";

const testimonials = [
  {
    quote:
      "Sam delivered a complex Python validation system on time and within spec. His documentation and technical rigour set a new standard for our team.",
    name: "Name",
    title: "Position",
    company: "Company Name",
    link: "https://linkedin.com/in/",
  },
  // Add more testimonials from LinkedIn recommendations
];

export default function Testimonials() {
  // If no testimonials yet, show a placeholder
  const hasTestimonials = testimonials.length > 0;

  return (
    <section id="testimonials" className="py-24 px-6">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono text-cyan-400 text-sm mb-2 text-center">06 / TESTIMONIALS</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">What People Say</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          {hasTestimonials
            ? "Recommendations from colleagues and clients."
            : "Recommendations available on LinkedIn — connect with me there."}
        </p>

        {hasTestimonials ? (
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.name}
                className="card-glow rounded-xl p-6 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Quote className="text-cyan-400/30" size={28} />
                <p className="text-muted-foreground leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.title} — {t.company}
                    </p>
                  </div>
                  <a
                    href={t.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                  >
                    View on LinkedIn
                    <ExternalLink size={12} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="card-glow rounded-xl p-8 text-center">
            <p className="text-muted-foreground mb-4">
              Connect with me on LinkedIn to see recommendations from colleagues and clients.
            </p>
            <a
              href="https://linkedin.com/in/samadeyemi-apex"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Visit LinkedIn Profile →
            </a>
          </div>
        )}
      </motion.div>
    </section>
  );
}