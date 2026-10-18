"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Github, FileText, ClipboardCheck, Landmark, TestTube2 } from "lucide-react";

const REPO = "https://github.com/SamAde1203/localgov-council-microsite";
const AUDIT = `${REPO}/blob/main/docs/ACCESSIBILITY-AUDIT.md`;

const stack = ["LocalGov Drupal 4", "Drupal 11", "PHP 8.3", "Twig", "PHPUnit", "Playwright", "axe-core", "GitHub Actions", "DDEV"];

const highlights = [
  {
    icon: Landmark,
    name: "Built on LocalGov Drupal",
    role: "The shared Drupal distribution used by UK councils: services, guides and publications, with a LocalGov Base sub-theme for Demo City Council.",
  },
  {
    icon: FileText,
    name: "Accessible Formats module",
    role: "Every PDF or Word document gets a \"Request an accessible format\" link. Residents ask for large print, Easy Read, audio or braille; staff manage requests in Drupal.",
  },
  {
    icon: ClipboardCheck,
    name: "WCAG 2.2 AA audit",
    role: "10 issues found and fixed, from a search button labelled \"Apply\" to error messages that didn't link to their fields. Written up with WCAG references and severity.",
  },
  {
    icon: TestTube2,
    name: "Tested in CI",
    role: "42 PHPUnit tests, Drupal coding standards, and axe-core plus keyboard checks on 14 page states at desktop and mobile sizes, on every push.",
  },
];

const flow = [
  { step: "01", title: "A resident finds a PDF", desc: "Under the link they see: \"This file may not be suitable for users of assistive technology. Request an accessible format.\"" },
  { step: "02", title: "They choose a format", desc: "Large print, Easy Read, audio, braille, an accessible web page or something else. Errors follow the GOV.UK pattern: a summary that links to each field." },
  { step: "03", title: "They get a reference", desc: "A confirmation panel shows a reference such as AF-00012 and when to expect a reply. Focus moves to it, so screen reader users hear it." },
  { step: "04", title: "Staff deal with it", desc: "Requests appear under Content in Drupal, unanswered first, and can also be emailed to a team inbox. Staff tick them off when done." },
];

const screenshots = [
  { src: "/projects/localgov-microsite/document-notice.png", alt: "A PDF link with the text: This file may not be suitable for users of assistive technology. Request an accessible format.", caption: "Request link under a PDF" },
  { src: "/projects/localgov-microsite/request-errors.png", alt: "Request form with an error summary linking to each field, and an error message at each field", caption: "Errors, GOV.UK style" },
  { src: "/projects/localgov-microsite/request-confirmation.png", alt: "Green confirmation panel showing reference number AF-00001", caption: "Confirmation with reference" },
  { src: "/projects/localgov-microsite/publication.png", alt: "Annual budget publication offered as a web page first, with a PDF version", caption: "HTML-first publication" },
];

const findings = [
  ["Search button labelled \"Apply\"", "2.4.6", "Relabelled \"Search\""],
  ["Errors didn't link to fields or appear next to them", "3.3.1, 3.3.3", "Inline errors with an error summary and specific messages"],
  ["Focus stayed at the top after sending a request", "4.1.3", "Focus moves to the confirmation"],
  ["Messages used role=\"contentinfo\", creating two footer landmarks", "1.3.1", "Theme template with alert and status roles"],
  ["No accessibility statement", "PSBAR 2018", "Statement page added, based on the GOV.UK sample"],
];

export default function LocalGovCaseStudy() {
  return (
    <main className="min-h-screen bg-bg text-gray-200 px-6 py-24 max-w-5xl mx-auto">
      <Link href="/#projects" className="inline-flex items-center gap-2 text-cyan-300 text-sm mb-10 hover:underline">
        <ArrowLeft size={16} /> Back to Projects
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="font-mono text-cyan-400 text-sm mb-2">CASE STUDY</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
          Demo City Council on LocalGov Drupal
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mb-8">
          A council website on LocalGov Drupal 4 and Drupal 11, with a custom module that lets residents request documents in a format they can use, and a full WCAG 2.2 AA accessibility audit.
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {stack.map((s) => (
            <span key={s} className="px-3 py-1 rounded-full text-xs font-mono text-cyan-200 border border-cyan-500/20 bg-cyan-500/5">
              {s}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mb-16">
          <a href={REPO} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500 text-black font-medium text-sm hover:opacity-90 transition-opacity">
            <Github size={16} /> View the code on GitHub
          </a>
          <a href={AUDIT} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 hover:border-cyan-400 transition-colors text-sm">
            <ClipboardCheck size={16} /> Read the accessibility audit
          </a>
        </div>
      </motion.div>

      <section className="grid md:grid-cols-3 gap-6 mb-20">
        {[
          { value: "10", label: "accessibility issues found and fixed, each mapped to WCAG 2.2" },
          { value: "0", label: "axe-core violations across 14 page states, desktop and mobile" },
          { value: "42", label: "automated PHPUnit tests across the custom modules" },
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
          Councils publish huge numbers of PDFs, and many of them don&apos;t work with screen readers. UK accessibility regulations expect councils to say when a document may not be accessible and to offer it in another format. In practice that often means a generic email address and no way to track who asked for what.
        </p>
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-2">The Solution</h2>
        <p className="text-gray-400 max-w-3xl mb-10">
          I built the site on LocalGov Drupal, so it uses the same content types and patterns as real councils, then added a custom module and fixed the accessibility problems I found in the base theme.
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
        <div className="grid md:grid-cols-2 gap-5 items-start">
          {screenshots.map((s) => (
            <figure key={s.src} className="rounded-xl border border-white/10 bg-white/5 p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.src} alt={s.alt} loading="lazy" className="w-full h-auto rounded-lg bg-white" />
              <figcaption className="text-gray-400 text-sm mt-3">{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-8">How a Request Works</h2>
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
        <h2 className="text-2xl font-bold mb-2">Selected Audit Findings</h2>
        <p className="text-gray-400 max-w-3xl mb-6">
          Five of the ten findings. The <a href={AUDIT} target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">full report</a> covers method, severity and what automated testing can&apos;t tell you.
        </p>
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-white">
              <tr>
                <th scope="col" className="p-3">Issue</th>
                <th scope="col" className="p-3">WCAG</th>
                <th scope="col" className="p-3">Fix</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              {findings.map(([issue, wcag, fix]) => (
                <tr key={issue} className="border-t border-white/10">
                  <td className="p-3">{issue}</td>
                  <td className="p-3 font-mono text-cyan-200 whitespace-nowrap">{wcag}</td>
                  <td className="p-3">{fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-4">Outcome</h2>
        <p className="text-gray-400 max-w-3xl mb-4">
          A council site that installs with one command, passes its tests and accessibility checks on every push, and gives residents a clear route to documents they can use. Testing also caught a non-accessibility bug: the request form accepted any file, including images, so it now only accepts real documents.
        </p>
        <p className="text-gray-400 max-w-3xl mb-4">
          It builds on my{" "}
          <Link href="/projects/council-services" className="text-cyan-300 hover:underline">
            Council Services on Drupal 11
          </Link>{" "}
          project: the Bin Day Finder module runs inside this site.
        </p>
        <p className="text-gray-500 text-sm max-w-3xl">
          Portfolio project: &ldquo;Demo City Council&rdquo; is fictional and all content is demonstration content. Built on LocalGov Drupal (GPL-2.0-or-later).
        </p>
      </section>

      <Link href="/#projects" className="inline-flex items-center gap-2 text-cyan-300 text-sm hover:underline">
        <ArrowLeft size={16} /> Back to all Projects
      </Link>
    </main>
  );
}
