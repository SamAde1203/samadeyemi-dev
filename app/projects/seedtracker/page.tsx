"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, Github, ExternalLink, Wallet, MessageSquare,
  ShieldCheck, Smartphone, TrendingUp, Users,
} from "lucide-react";

const stack = [
  "Next.js", "React", "TypeScript", "Node.js", "PostgreSQL",
  "Paystack", "Flutterwave", "WhatsApp Business API", "Claude AI",
];

const highlights = [
  { icon: Wallet, name: "Dual-Gateway Payments", role: "Paystack and Flutterwave integration with automatic failover — card, bank transfer, USSD and mobile money, so no payment is ever lost." },
  { icon: MessageSquare, name: "WhatsApp-First Notifications", role: "Instant giving receipts, reminders and reports delivered via WhatsApp Business API — no app download required." },
  { icon: ShieldCheck, name: "Multi-Tenant Security", role: "Row-level database isolation ensures organisations never see each other's data, with a tamper-proof audit trail and dual-control approvals." },
  { icon: Smartphone, name: "Offline-First Architecture", role: "Transactions queue locally on unreliable connections and sync automatically once connectivity returns." },
  { icon: TrendingUp, name: "AI Engagement Predictions", role: "Claude AI analyses giving patterns to predict disengagement risk and generates personalised outreach recommendations." },
  { icon: Users, name: "Self-Service Member Portal", role: "Every user gets a personal portal with history, digital QR card, and downloadable statements — zero admin overhead." },
];

const flow = [
  { step: "01", title: "Transaction Recorded", desc: "Cash, transfer or online payment is captured in real time by staff or through self-service giving." },
  { step: "02", title: "Reconciliation Engine", desc: "Bank transfers are automatically matched against records; cash entries are batched and audited." },
  { step: "03", title: "Multi-Gateway Processing", desc: "Online payments route through Paystack or Flutterwave with automatic failover between providers." },
  { step: "04", title: "Instant Notification", desc: "WhatsApp Business API sends a confirmation receipt to the member within seconds." },
  { step: "05", title: "Live Dashboard Update", desc: "Admin dashboard reflects the transaction instantly, with AI models updating engagement scores in the background." },
];

export default function SeedTrackerCaseStudy() {
  return (
    <main className="min-h-screen bg-bg text-gray-200 px-6 py-24 max-w-5xl mx-auto">
      <Link href="/#projects" className="inline-flex items-center gap-2 text-cyan-300 text-sm mb-10 hover:underline">
        <ArrowLeft size={16} /> Back to Projects
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="font-mono text-cyan-400 text-sm mb-2">FLAGSHIP CASE STUDY</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
          SeedTracker
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mb-8">
          A multi-tenant fintech SaaS platform for organisational financial management —
          processing over &#8358;2.4B in transactions across 247 active organisations, with
          real-time reconciliation, dual-gateway payments, and AI-driven engagement analytics.
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {stack.map((s) => (
            <span key={s} className="px-3 py-1 rounded-full text-xs font-mono text-cyan-200 border border-cyan-500/20 bg-cyan-500/5">
              {s}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mb-16">
          <a href="https://seedtracker.ng" target="_blank" className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500 text-black font-medium text-sm hover:opacity-90 transition-opacity">
            <ExternalLink size={16} /> Live Platform
          </a>
          <a href="https://github.com/SamAde1203" target="_blank" className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 hover:border-cyan-400 transition-colors text-sm">
            <Github size={16} /> GitHub
          </a>
        </div>
      </motion.div>

      <section className="grid md:grid-cols-4 gap-6 mb-20">
        {[
          { value: "₦2.4B+", label: "Transaction volume tracked" },
          { value: "247", label: "Active organisations" },
          { value: "99.9%", label: "Uptime SLA" },
          { value: "<10s", label: "Per-transaction entry time" },
        ].map((m) => (
          <div key={m.label} className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
            <p className="text-2xl font-bold text-cyan-300 mb-2">{m.value}</p>
            <p className="text-gray-400 text-xs">{m.label}</p>
          </div>
        ))}
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-2">The Problem</h2>
        <p className="text-gray-400 max-w-3xl">
          Organisations across Nigeria were managing complex financial operations with
          spreadsheets, paper records and WhatsApp screenshots &mdash; leading to lost records,
          hours of manual reconciliation, zero financial transparency for stakeholders, and
          member data scattered across personal devices with no continuity when staff turnover occurred.
        </p>
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-2">The Solution</h2>
        <p className="text-gray-400 max-w-3xl mb-10">
          I architected and built a production multi-tenant SaaS platform from the ground up &mdash;
          covering real-time transaction capture, dual-gateway payment processing, automated
          reconciliation, WhatsApp-native communication, and AI-powered engagement scoring &mdash;
          designed specifically for the payment infrastructure, connectivity constraints and
          communication habits of the African market.
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
        <h2 className="text-2xl font-bold mb-8">Transaction Flow</h2>
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
        <h2 className="text-2xl font-bold mb-4">Technical Challenges Solved</h2>
        <ul className="space-y-3 text-gray-400 max-w-3xl">
          <li>&#9656; <span className="text-white">Payment reliability:</span> automatic failover between Paystack and Flutterwave ensures no transaction is ever lost, even during gateway outages.</li>
          <li>&#9656; <span className="text-white">Connectivity resilience:</span> offline-first sync architecture allows staff to keep working during unreliable internet, queuing writes locally.</li>
          <li>&#9656; <span className="text-white">Data isolation at scale:</span> row-level security ensures 247+ organisations share infrastructure without any risk of cross-tenant data exposure.</li>
          <li>&#9656; <span className="text-white">Regulatory compliance:</span> built-in PAYE, pension and NHF payroll calculations aligned with Nigerian statutory requirements.</li>
        </ul>
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-4">Outcome</h2>
        <p className="text-gray-400 max-w-3xl">
          SeedTracker is live in production, processing over &#8358;2.4 billion in transactions
          across 247 active organisations with a 99.9% uptime SLA. The platform replaced manual
          spreadsheet reconciliation with real-time automated processing, cutting weekly admin
          time from hours to minutes while giving end-users full visibility into their transaction
          history for the first time.
        </p>
      </section>

      <Link href="/#projects" className="inline-flex items-center gap-2 text-cyan-300 text-sm hover:underline">
        <ArrowLeft size={16} /> Back to all Projects
      </Link>
    </main>
  );
}
