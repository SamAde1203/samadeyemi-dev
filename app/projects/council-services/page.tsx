"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Github, Accessibility, ShieldCheck, Plug, TestTube2 } from "lucide-react";

const REPO = "https://github.com/SamAde1203/council-services-drupal";

const stack = ["Drupal 11", "PHP 8.3", "Twig", "PHPUnit", "Playwright", "axe-core", "GitHub Actions", "DDEV"];

const highlights = [
  {
    icon: Accessibility,
    name: "Accessible by design",
    role: "A custom theme built to WCAG 2.2 AA, using GOV.UK Design System patterns for errors and hints. Automated axe-core checks run on every push.",
  },
  {
    icon: Plug,
    name: "Real API integration",
    role: "Postcodes are checked against postcodes.io, with a 5-second timeout, 24-hour caching and a fallback if the service is down.",
  },
  {
    icon: ShieldCheck,
    name: "Secure and configurable",
    role: "Rate limiting with Drupal's flood service, validation before any API call, and an admin settings page so staff can change behaviour without a developer.",
  },
  {
    icon: TestTube2,
    name: "Tested end to end",
    role: "26 PHPUnit tests (unit, kernel and functional), Drupal coding standards and accessibility checks, all running in CI.",
  },
];

const flow = [
  { step: "01", title: "Resident enters a postcode", desc: "On /bin-day or from a block in the sidebar. The form works without JavaScript." },
  { step: "02", title: "Validate", desc: "The postcode is tidied up and its format checked, then the visitor's search count is checked against the hourly limit." },
  { step: "03", title: "Verify", desc: "A service checks the postcode exists using postcodes.io. If the service is down, the resident still gets an answer, marked as unverified." },
  { step: "04", title: "Work out collections", desc: "A second service maps the postcode area to a collection round and calculates the next black, blue and brown bin dates." },
  { step: "05", title: "Show results", desc: "Results render through a Twig template, and focus moves to them so screen reader users know they've appeared." },
];

const screenshots = [
  { src: "/projects/council-services/results.png", alt: "Bin Day Finder results showing the next black, blue and brown bin collection dates for a Sheffield postcode", caption: "Results", span: "md:col-span-2" },
  { src: "/projects/council-services/error.png", alt: "Error summary titled There is a problem, linking to the postcode field, with an inline error message", caption: "Validation error (GOV.UK pattern)", span: "md:col-span-2" },
  { src: "/projects/council-services/mobile-results.png", alt: "Bin Day Finder results on a phone-sized screen", caption: "Mobile", span: "md:col-span-1" },
];

export default function CouncilServicesCaseStudy() {
  return (
    <main className="min-h-screen bg-bg text-gray-200 px-6 py-24 max-w-5xl mx-auto">
      <Link href="/#projects" className="inline-flex items-center gap-2 text-cyan-300 text-sm mb-10 hover:underline">
        <ArrowLeft size={16} /> Back to Projects
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="font-mono text-cyan-400 text-sm mb-2">CASE STUDY</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
          Council Services on Drupal 11
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mb-8">
          A Drupal 11 site for a fictional local authority. Its custom Bin Day Finder module lets residents enter a postcode and see their next bin collections, through an accessible custom theme.
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {stack.map((s) => (
            <span key={s} className="px-3 py-1 rounded-full text-xs font-mono text-cyan-200 border border-cyan-500/20 bg-cyan-500/5">
              {s}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mb-16">
          <a href={REPO} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500 text-black font-medium text-sm hover:opacity-90 transition-opacity">
            <Github size={16} /> View the code on GitHub
          </a>
        </div>
      </motion.div>

      <section className="grid md:grid-cols-3 gap-6 mb-20">
        {[
          { value: "0", label: "axe-core accessibility violations across 5 page states, desktop and mobile" },
          { value: "26", label: "automated PHPUnit tests: unit, kernel and functional" },
          { value: "WCAG 2.2 AA", label: "colour contrast and keyboard access built into the theme" },
        ].map((m) => (
          <div key={m.label} className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
            <p className="text-3xl font-bold text-cyan-300 mb-2">{m.value}</p>
            <p className="text-gray-400 text-sm">{m.label}</p>
          </div>
        ))}
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-2">The Problem</h2>
        <p className="text-gray-400 max-w-3xl">
          &ldquo;When is my bin day?&rdquo; is one of the most common questions residents ask their council. The answer has to work for everyone, including people using screen readers, keyboards or old phones, and it shouldn&apos;t break when a third-party service is down.
        </p>
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-2">The Solution</h2>
        <p className="text-gray-400 max-w-3xl mb-10">
          I built a custom Drupal 11 module and theme using modern Drupal practice: services with dependency injection, PHP attributes for hooks and plugins, configuration with schema, and the Form API. Rounds and bin types are stored as configuration, so they can be changed and deployed without editing code.
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
        <h2 className="text-2xl font-bold mb-8">Screenshots</h2>
        <div className="grid md:grid-cols-5 gap-5 items-start">
          {screenshots.map((s) => (
            <figure key={s.src} className={`${s.span} rounded-xl border border-white/10 bg-white/5 p-3`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.src} alt={s.alt} loading="lazy" className="w-full h-auto rounded-lg bg-white" />
              <figcaption className="text-gray-400 text-sm mt-3">{s.caption}</figcaption>
            </figure>
          ))}
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
        <p className="text-gray-400 max-w-3xl mb-4">
          A working council service that installs with one command, passes its tests and accessibility checks on every push, and keeps answering residents when the postcode service fails. The tests caught two real bugs before release: a crash on a second search and stale results showing beside a new error.
        </p>
        <p className="text-gray-500 text-sm max-w-3xl">
          Portfolio project: &ldquo;Demo City Council&rdquo; is fictional and collection dates come from demonstration data. Postcode data from postcodes.io under the Open Government Licence.
        </p>
      </section>

      <Link href="/#projects" className="inline-flex items-center gap-2 text-cyan-300 text-sm hover:underline">
        <ArrowLeft size={16} /> Back to all Projects
      </Link>
    </main>
  );
}
