"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Github, ShieldCheck, Quote, ListChecks, Gauge } from "lucide-react";

const REPO = "https://github.com/SamAde1203/find-my-service";

const stack = ["Python", "FastAPI", "Claude API", "BM25 search", "Pydantic", "pytest", "mypy (strict)", "Docker", "GitHub Actions"];

const highlights = [
  {
    icon: Quote,
    name: "Answers only from the council's pages",
    role: "Claude writes a short answer from the top sections of the council's own pages and cites each one. If they don't cover the question, it says so and gives the phone number.",
  },
  {
    icon: ShieldCheck,
    name: "Guardrails in and out",
    role: "Emergencies are signposted to 999 before anything else runs, prompt injection is refused, and personal details are removed before search, the AI or the logs. Answers without valid citations are replaced.",
  },
  {
    icon: ListChecks,
    name: "Evaluations on every push",
    role: "39 questions in residents' own words plus 14 held-out questions never used for tuning. CI fails if accuracy drops, and safety cases must pass 100%.",
  },
  {
    icon: Gauge,
    name: "Built to run in production",
    role: "Daily cost cap with a no-AI fallback, rate limiting, JSON logs with request IDs, health and metrics endpoints, and a Docker image tested in CI.",
  },
];

const flow = [
  { step: "01", title: "Input guardrails", desc: "Emergency? Signpost to 999 and stop. Prompt injection? Refuse. Personal details? Remove them first." },
  { step: "02", title: "Search", desc: "BM25 search over sections of the council's pages, with stemming and council-specific synonyms such as \"rubbish\" for \"waste\"." },
  { step: "03", title: "Relevance check", desc: "Weak or one-word matches are discarded, so the assistant says it can't find an answer rather than stretching." },
  { step: "04", title: "Answer", desc: "Claude Haiku answers from the top sources. With no key, a spent budget or an AI error, the most relevant sentences are quoted instead." },
  { step: "05", title: "Output guardrails", desc: "The answer must cite only the sources it was given, and invented links are removed. If it breaks a rule, the quoted answer is used." },
];

const screenshots = [
  { src: "/projects/find-my-service/answer.png", alt: "Answer quoting the band D Council Tax charge, with a numbered link to the Council Tax bands page", caption: "Answer with its source" },
  { src: "/projects/find-my-service/emergency.png", alt: "Emergency response giving 999, the gas emergency number and Samaritans", caption: "Emergency signposting" },
  { src: "/projects/find-my-service/error.png", alt: "Error summary reading There is a problem: Enter your question", caption: "GOV.UK-style errors" },
];

const scores = [
  ["Right outcome", "100%", "100%"],
  ["Right page in top 3 results", "100%", "100%"],
  ["Answer cites the right page", "97%", "90%"],
  ["Safety cases", "100%", "100%"],
];

export default function FindMyServiceCaseStudy() {
  return (
    <main className="min-h-screen bg-bg text-gray-200 px-6 py-24 max-w-5xl mx-auto">
      <Link href="/#projects" className="inline-flex items-center gap-2 text-cyan-300 text-sm mb-10 hover:underline">
        <ArrowLeft size={16} /> Back to Projects
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="font-mono text-cyan-400 text-sm mb-2">CASE STUDY</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
          Find My Service
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mb-8">
          An AI assistant that answers residents&apos; questions using only a council&apos;s own web pages, with a link to every source, guardrails, a daily cost cap and an evaluation set that runs on every push.
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
          <a href={`${REPO}/blob/main/docs/DESIGN.md`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 hover:border-cyan-400 transition-colors text-sm">
            Read the design decisions
          </a>
        </div>
      </motion.div>

      <section className="grid md:grid-cols-3 gap-6 mb-20">
        {[
          { value: "53", label: "evaluation questions, including 14 held out from tuning" },
          { value: "100%", label: "of safety cases handled correctly: emergencies, injection, off-topic" },
          { value: "44", label: "automated tests, with no network or API calls" },
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
          Residents often can&apos;t find the right page on a council website, so they phone instead. A chatbot could help, but one that makes something up, such as a wrong payment date or a service that doesn&apos;t exist, does real harm. It also has to handle people in crisis safely and keep personal details private.
        </p>
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-2">The Solution</h2>
        <p className="text-gray-400 max-w-3xl mb-10">
          A narrow assistant that only answers from the council&apos;s published pages and proves where each answer came from. It is built as a service, not a demo: every safety rule is checked in code, not just asked for in a prompt.
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
        <div className="grid md:grid-cols-3 gap-5 items-start">
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
        <h2 className="text-2xl font-bold mb-8">How a Question Is Answered</h2>
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
        <h2 className="text-2xl font-bold mb-2">Evaluation Results</h2>
        <p className="text-gray-400 max-w-3xl mb-6">
          Scores for the no-AI fallback, which runs in CI because it is free and repeatable. The held-out questions were written after tuning and never used to change the search, so they show how it handles wording it hasn&apos;t seen.
        </p>
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-white">
              <tr>
                <th scope="col" className="p-3">Measure</th>
                <th scope="col" className="p-3">Main set (39)</th>
                <th scope="col" className="p-3">Held-out set (14)</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              {scores.map(([name, main, held]) => (
                <tr key={name} className="border-t border-white/10">
                  <td className="p-3">{name}</td>
                  <td className="p-3 font-mono text-cyan-200">{main}</td>
                  <td className="p-3 font-mono text-cyan-200">{held}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-4">Outcome</h2>
        <p className="text-gray-400 max-w-3xl mb-4">
          The evaluations earned their place while I built it: they caught a stemming bug where &ldquo;potholes&rdquo; didn&apos;t match &ldquo;pothole&rdquo;, and an emergency rule that would have treated &ldquo;end my tenancy&rdquo; as a crisis. Both are fixed and covered by tests.
        </p>
        <p className="text-gray-400 max-w-3xl mb-4">
          It answers from the pages of my{" "}
          <Link href="/projects/localgov-microsite" className="text-cyan-300 hover:underline">
            Demo City Council site on LocalGov Drupal
          </Link>
          , crawled and split into sections by its own ingestion tool.
        </p>
        <p className="text-gray-500 text-sm max-w-3xl">
          Portfolio project: Demo City Council is fictional. Next steps: live evaluation with Claude, embedding search for vaguer questions, and a shared store for limits when running several instances.
        </p>
      </section>

      <Link href="/#projects" className="inline-flex items-center gap-2 text-cyan-300 text-sm hover:underline">
        <ArrowLeft size={16} /> Back to all Projects
      </Link>
    </main>
  );
}
