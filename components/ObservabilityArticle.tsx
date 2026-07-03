"use client";

import type React from "react";
import {
  ArrowLeft,
  Clock3,
  BadgeCheck,
  Layers3,
  GitBranch,
  LineChart,
  BookOpen,
  Fingerprint,
  FileJson,
  Network,
  Gauge,
  ScrollText,
  Compass,
  Lightbulb,
  ListChecks,
} from "lucide-react";

/* ---------------------------------- data ---------------------------------- */

const stats = [
  { label: "Focus", value: "Observability" },
  { label: "Read time", value: "14 min" },
  { label: "Series", value: "PHHM Journal" },
  { label: "Theme", value: "Production AI" },
];

const highlights = [
  "Correlation IDs that follow a workflow end-to-end",
  "Structured logs for agent decisions, not just messages",
  "Distributed traces that reveal bottlenecks and retries",
  "Audit trails that preserve historical accountability",
];

const toc = [
  { id: "black-boxes", label: "Why AI Workflows Become Black Boxes" },
  { id: "correlation-ids", label: "Correlation IDs and Execution Tracing" },
  { id: "structured-logging", label: "Structured Logging Across Agents" },
  { id: "distributed-tracing", label: "Distributed Tracing for AI Workflows" },
  { id: "metrics", label: "Metrics That Actually Matter" },
  { id: "audit-trails", label: "Audit Trails and Compliance" },
  { id: "five-principles", label: "The Five Principles of AI Observability" },
  { id: "final-thoughts", label: "Final Thoughts" },
  { id: "key-takeaways", label: "Key Takeaways" },
];

const unansweredQuestions = [
  "Which agent failed?",
  "Which prompt version generated the response?",
  "Which model handled the request?",
  "Did validation reject the output?",
  "Was a retry attempted?",
  "Which workflow step consumed the most time?",
  "How many tokens were used?",
];

const workflowProducts = [
  "multiple AI calls",
  "parallel execution",
  "retries",
  "validation events",
  "workflow state changes",
  "orchestration decisions",
  "prompt selections",
  "model invocations",
];

const multiAgentQuestions = [
  "Did the Overseer route correctly?",
  "Did the Analyst produce invalid output?",
  "Did validation reject the result?",
  "Did the retry succeed?",
  "Did another agent overwrite workflow state?",
  "Which prompt version produced the final recommendation?",
];

const distributedLessons = [
  "Correlation IDs",
  "Structured logging",
  "Tracing",
  "Metrics",
  "Dashboards",
  "Alerting",
  "Audit trails",
];

const businessEvents = [
  "workflow_started",
  "agent_selected",
  "prompt_loaded",
  "model_called",
  "validation_passed",
  "validation_failed",
  "retry_started",
  "retry_completed",
  "workflow_completed",
];

const correlationEverywhere = [
  "HTTP request logs",
  "authentication",
  "authorization",
  "orchestration",
  "agent execution",
  "validation",
  "persistence",
  "notifications",
  "audit trails",
];

const workflowMetrics = [
  ["Workflow Success Rate", "Overall platform reliability"],
  ["Average Workflow Duration", "User experience"],
  ["Workflow Failure Rate", "Operational health"],
  ["Retry Frequency", "Prompt or model stability"],
  ["Validation Failure Rate", "Contract quality"],
  ["Human Review Rate", "Confidence in automation"],
];

const agentMetrics = [
  ["Execution Time", "Identify slow agents"],
  ["Token Consumption", "Cost visibility"],
  ["Validation Pass Rate", "Output quality"],
  ["Retry Count", "Prompt reliability"],
  ["Model Latency", "Provider performance"],
  ["Failure Rate", "Operational stability"],
];

const costPerWorkflow = [
  ["Member Report", "$0.06"],
  ["Care Plan", "$0.04"],
  ["Newsletter", "$0.09"],
  ["Welcome Journey", "$0.03"],
];

const behaviourAlerts = [
  "validation failures exceed 5%",
  "retry rate doubles",
  "token usage spikes",
  "workflow completion drops",
  "human review requests increase",
  "provider latency exceeds threshold",
];

const auditRecordContents = [
  "who initiated the workflow",
  "when it ran",
  "which workflow executed",
  "which prompt version was used",
  "which model generated the output",
  "which configuration version was active",
  "which validations were applied",
  "whether retries occurred",
  "whether a human reviewed the result",
];

const devQuestions = [
  "Is it increasing workflow duration?",
  "Is it causing more retries?",
  "Does validation fail more often?",
  "Has token consumption increased?",
  "Are users reaching human review more frequently?",
];

const dashboardQuestions = [
  "Are workflows succeeding?",
  "Which agent is slowest?",
  "Which prompt version is failing?",
  "Are retries increasing?",
  "Which workflow consumes the most tokens?",
  "Is cost increasing unexpectedly?",
];

const fivePrinciples = [
  {
    title: "Every workflow deserves a unique identity",
    text: "Use execution IDs and correlation IDs to connect every event across the platform.",
  },
  {
    title: "Log decisions, not just actions",
    text: "Recording why the Overseer chose a workflow is often more valuable than recording that it executed one.",
  },
  {
    title: "Measure workflows before infrastructure",
    text: "Users experience complete workflows. Optimize those before worrying about individual components.",
  },
  {
    title: "Preserve enough history to explain every decision",
    text: "Prompt versions, configuration versions, retries, validation results, and routing decisions should all be traceable.",
  },
  {
    title: "Design for investigation",
    text: "Every production question should already have an answer somewhere in your telemetry. If engineers need to guess, the observability layer isn't complete.",
  },
];

const keyTakeaways = [
  "Assign a correlation ID to every workflow.",
  "Use structured logs instead of free-form log messages.",
  "Trace the complete workflow—not just individual model calls.",
  "Record prompt, model, and configuration versions with every execution.",
  "Measure workflow health before infrastructure health.",
  "Track retries, validation failures, and token usage as first-class metrics.",
  "Preserve audit records for investigation and compliance.",
  "Build dashboards that answer operational questions, not just display numbers.",
  "Treat telemetry as a product, not an afterthought.",
];

/* ------------------------------- primitives ------------------------------- */

type SectionHeadingProps = {
  id?: string;
  icon?: React.ComponentType<{ className?: string }>;
  kicker: string;
  children: React.ReactNode;
};

function SectionHeading({ id, icon: Icon, kicker, children }: SectionHeadingProps) {
  return (
    <div id={id} className="scroll-mt-28">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface2)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
        {Icon && <Icon className="h-3.5 w-3.5 text-[var(--accent)]" />} {kicker}
      </div>
      <h2 className="font-['Instrument_Serif',Georgia,serif] text-4xl leading-tight sm:text-5xl">
        {children}
      </h2>
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-12 font-['Instrument_Serif',Georgia,serif] text-2xl leading-snug sm:text-3xl">
      {children}
    </h3>
  );
}

function P({ children, lead = false }: { children: React.ReactNode; lead?: boolean }) {
  return (
    <p className={`mt-4 leading-7 text-[var(--muted)] ${lead ? "text-lg sm:text-xl" : "text-base"}`}>
      {children}
    </p>
  );
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-[var(--text)]">{children}</strong>;
}

function Pull({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="mt-8 rounded-[24px] border-l-4 border-[var(--accent)] bg-[var(--surface2)] px-6 py-5 font-['Instrument_Serif',Georgia,serif] text-2xl leading-tight sm:text-3xl">
      {children}
    </blockquote>
  );
}

function Diagram({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <figure className="mt-8 overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface2)]">
      {title && (
        <figcaption className="border-b border-[var(--line)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          {title}
        </figcaption>
      )}
      <pre className="overflow-x-auto px-6 py-6 font-mono text-[13px] leading-6 text-[var(--text)]">
        {children}
      </pre>
    </figure>
  );
}

function Code({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <figure className="mt-8 overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface2)]">
      {title && (
        <figcaption className="flex items-center gap-2 border-b border-[var(--line)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          <FileJson className="h-3.5 w-3.5 text-[var(--accent)]" /> {title}
        </figcaption>
      )}
      <pre className="overflow-x-auto px-6 py-6 font-mono text-[13px] leading-6 text-[var(--text)]">
        {children}
      </pre>
    </figure>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface2)] px-4 py-3 text-sm text-[var(--muted)]"
        >
          <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

type MetricTableProps = {
  caption?: string;
  headers: string[];
  rows: string[][];
};

function MetricTable({ caption, headers, rows }: MetricTableProps) {
  return (
    <figure className="mt-8 overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface2)]">
      {caption && (
        <figcaption className="border-b border-[var(--line)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          {caption}
        </figcaption>
      )}
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-[var(--line)] text-[var(--text)]">
            {headers.map((h) => (
              <th key={h} className="px-5 py-3 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b]) => (
            <tr key={a} className="border-b border-[var(--line)] last:border-0">
              <td className="px-5 py-3 font-medium text-[var(--text)]">{a}</td>
              <td className="px-5 py-3 text-[var(--muted)]">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

function Article({ children }: { children: React.ReactNode }) {
  return (
    <article className="mt-10 rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow)] sm:p-10 lg:p-12">
      {children}
    </article>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function ObservabilityArticle() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="mx-auto max-w-6xl px-6 py-6">
        {/* ------------------------------ header ------------------------------ */}
        <header className="mb-8 flex items-center justify-between gap-4">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold shadow-[var(--shadow)] transition hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </a>
          <div className="hidden items-center gap-2 text-sm text-[var(--muted)] md:flex">
            <Clock3 className="h-4 w-4" /> Long-form article
          </div>
        </header>

        {/* ------------------------------- hero ------------------------------- */}
        <section className="overflow-hidden rounded-[32px] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow)]">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative p-8 sm:p-10 lg:p-14">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface2)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                <BookOpen className="h-3.5 w-3.5 text-[var(--accent)]" /> PHHM Journal • Observability
              </div>
              <h1 className="max-w-3xl font-['Instrument_Serif',Georgia,serif] text-5xl leading-[0.92] sm:text-6xl lg:text-7xl">
                Observability for Multi-Agent AI Systems
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-[var(--muted)] sm:text-xl">
                Logging, tracing, metrics, and debugging production workflows — how we transformed
                PHHM from an AI black box into an observable production platform using structured
                logs, distributed tracing, correlation IDs, and workflow telemetry.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-[var(--line)] bg-[var(--surface2)] px-4 py-3"
                  >
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                      {s.label}
                    </div>
                    <div className="mt-1 text-sm font-semibold">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="relative border-t border-[var(--line)] bg-[linear-gradient(160deg,color-mix(in_oklab,var(--accent)_18%,var(--surface2)),var(--surface2))] p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <div className="grid gap-4">
                <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Layers3 className="h-4 w-4 text-[var(--accent)]" /> What this article covers
                  </div>
                  <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
                    {highlights.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <GitBranch className="h-4 w-4 text-[var(--accent2)]" /> Table of contents
                  </div>
                  <ol className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                    {toc.map((t, i) => (
                      <li key={t.id}>
                        <a href={`#${t.id}`} className="transition hover:text-[var(--accent)]">
                          {i + 1}. {t.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* ------------------------------- hook ------------------------------- */}
        <Article>
          <SectionHeading icon={Lightbulb} kicker="The Hook">
            The Platform Wasn&rsquo;t Broken. It Was Invisible.
          </SectionHeading>
          <P lead>
            The first production incident in PHHM wasn&rsquo;t caused by an LLM. It wasn&rsquo;t a
            prompt. It wasn&rsquo;t OpenAI. It wasn&rsquo;t FastAPI.
          </P>
          <P>The real problem was much simpler.</P>
          <Pull>We had no idea what happened.</Pull>
          <P>
            A user submitted a request. The request eventually failed. But we couldn&rsquo;t answer
            basic questions:
          </P>
          <Checklist items={unansweredQuestions} />
          <P>
            The platform wasn&rsquo;t broken. It was invisible. That experience taught us something
            every distributed systems engineer already knows.
          </P>
          <Pull>If you can&rsquo;t observe a system, you can&rsquo;t reliably operate it.</Pull>
          <P>
            The moment multiple AI agents collaborate, debugging becomes fundamentally different.
            You&rsquo;re no longer debugging one model. You&rsquo;re debugging an entire workflow.
            That&rsquo;s exactly why observability became one of the most important architectural
            layers in PHHM.
          </P>
        </Article>

        {/* --------------------------- black boxes ---------------------------- */}
        <Article>
          <SectionHeading id="black-boxes" icon={Network} kicker="Part One">
            Why AI Systems Become Black Boxes
          </SectionHeading>
          <P lead>
            Traditional applications are usually straightforward to debug. A request enters. A
            controller executes. A database query runs. A response returns. The execution path is
            relatively predictable.
          </P>
          <Diagram title="Traditional request path">
{`Request
    │
    ▼
Business Logic
    │
    ▼
Database
    │
    ▼
Response`}
          </Diagram>
          <P>An orchestrated AI platform looks very different.</P>
          <Diagram title="Orchestrated multi-agent workflow">
{`User Request
      │
      ▼
   Overseer
      │
 ┌────┼───────────────┐
 ▼    ▼               ▼
Welcome  Analyst    Care
 │        │           │
 ▼        ▼           ▼
Validation Validation Validation
 │        │           │
 └────────┼───────────┘
          ▼
   Communications
          │
          ▼
   Final Response`}
          </Diagram>
          <P>One request now produces:</P>
          <Checklist items={workflowProducts} />
          <P>Without observability, this entire execution becomes a black box.</P>

          <SubHeading>More Agents Mean More Unknowns</SubHeading>
          <P>
            Single-agent systems are relatively easy to reason about. If something fails,
            there&rsquo;s only one place to investigate. Multi-agent systems introduce entirely new
            questions.
          </P>
          <Checklist items={multiAgentQuestions} />
          <P>
            Every additional agent increases the number of possible execution paths. Without
            visibility, debugging quickly becomes guesswork.
          </P>

          <SubHeading>Debugging Should Never Begin with Guessing</SubHeading>
          <P>One engineering principle shaped the observability layer.</P>
          <Pull>Every production question should already have an answer in the telemetry.</Pull>
          <P>
            Instead of asking engineers to reproduce workflows, inspect prompts, or manually compare
            outputs, the platform should already contain enough information to explain what
            happened. Observability isn&rsquo;t about collecting logs.{" "}
            <Strong>It&rsquo;s about answering questions.</Strong>
          </P>

          <SubHeading>The Four Pillars of AI Observability</SubHeading>
          <P>
            Over time, PHHM&rsquo;s observability strategy evolved into four complementary layers.
          </P>
          <Diagram title="The four pillars">
{`Workflow Execution
        │
        ▼
 Structured Logs
        │
        ▼
Distributed Traces
        │
        ▼
     Metrics
        │
        ▼
  Audit Trails`}
          </Diagram>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              ["Structured logs", "Explain individual events."],
              ["Distributed traces", "Explain workflow execution."],
              ["Metrics", "Reveal operational health."],
              ["Audit trails", "Explain historical decisions."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-3xl border border-[var(--line)] bg-[var(--surface2)] p-5">
                <div className="text-sm font-semibold">{title}</div>
                <p className="mt-2 text-sm text-[var(--muted)]">{text}</p>
              </div>
            ))}
          </div>
          <P>Together, they transform opaque AI workflows into observable systems.</P>

          <SubHeading>The Biggest Mindset Shift</SubHeading>
          <P>One sentence completely changed how we approached debugging.</P>
          <Pull>
            We&rsquo;re not logging AI responses. We&rsquo;re logging AI decisions.
          </Pull>
          <P>
            That distinction matters. Responses tell you <Strong>what</Strong> happened. Decisions
            explain <Strong>why</Strong> it happened. Understanding both is what makes production
            systems maintainable.
          </P>

          <SubHeading>AI Needs the Same Operational Discipline as Microservices</SubHeading>
          <P>
            When I first started building multi-agent systems, I assumed observability would be
            AI-specific. It wasn&rsquo;t. Nearly every lesson came directly from distributed systems
            engineering.
          </P>
          <Checklist items={distributedLessons} />
          <P>
            The models changed. The engineering principles didn&rsquo;t. The more PHHM evolved, the
            more it started looking like a distributed platform that happened to use AI. That
            realization shaped every operational decision that followed.
          </P>

          <SubHeading>The Architecture We Wanted</SubHeading>
          <P>
            By the time observability became a first-class concern, this was the architecture we
            were aiming for.
          </P>
          <Diagram title="Target architecture">
{`                 User Request
                      │
                      ▼
             Orchestration Layer
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
    Specialized   Validation   Workflow State
       Agents     & Recovery
        │             │             │
        └─────────────┼─────────────┘
                      ▼
           Observability Layer
        ┌────────┬────────┬────────┐
        ▼        ▼        ▼        ▼
      Logs    Traces   Metrics  Audit
                      │
                      ▼
               Final Response`}
          </Diagram>
          <P>
            Notice something important. Observability doesn&rsquo;t sit beside the workflow.{" "}
            <Strong>It surrounds it.</Strong> Every decision, every retry, every validation event,
            and every agent execution becomes part of the operational story. That&rsquo;s what makes
            production AI explainable.
          </P>

          <SubHeading>The Lesson That Changed Everything</SubHeading>
          <P>Looking back, one sentence summarizes the entire article.</P>
          <Pull>&ldquo;You can&rsquo;t debug what you can&rsquo;t see.&rdquo;</Pull>
          <P>
            AI models will continue to improve. Prompt engineering will evolve. Frameworks will come
            and go. But observability will remain one of the foundations of reliable AI systems.
            Because production engineering isn&rsquo;t about building systems that never fail.{" "}
            <Strong>It&rsquo;s about building systems that always explain themselves.</Strong>
          </P>
        </Article>

        {/* -------------------------- correlation IDs -------------------------- */}
        <Article>
          <SectionHeading id="correlation-ids" icon={Fingerprint} kicker="Part Two">
            Correlation IDs: Following a Workflow from Start to Finish
          </SectionHeading>
          <P lead>
            The first improvement we made to PHHM was surprisingly small. Every workflow received a
            unique execution identifier. Not every agent. Not every prompt.{" "}
            <Strong>The entire workflow.</Strong>
          </P>
          <P>
            That identifier became the thread connecting every event inside the platform. Without
            it, logs from multiple users quickly become impossible to untangle. With it, an entire
            execution can be reconstructed in seconds.
          </P>

          <SubHeading>Every Workflow Gets an Identity</SubHeading>
          <P>
            The moment a request reaches the API, the Overseer creates a unique execution ID.
          </P>
          <Code title="Creating the execution identity">
{`from uuid import uuid4

execution_id = str(uuid4())`}
          </Code>
          <P>
            That identifier travels with the request for its entire lifetime. Every agent receives
            it. Every validation event includes it. Every retry references it. Every log entry
            records it. <Strong>The execution ID becomes the identity of the workflow.</Strong>
          </P>

          <SubHeading>One Request, One Story</SubHeading>
          <P>
            Imagine a member report workflow. Instead of unrelated log entries scattered across
            multiple services, every event belongs to the same execution.
          </P>
          <Diagram title="Execution ID: 8f34d8d2…">
{`Overseer
    │
    ▼
Analyst
    │
    ▼
Validation
    │
    ▼
Care
    │
    ▼
Communications
    │
    ▼
Final Response`}
          </Diagram>
          <P>
            Debugging no longer starts with searching log files. It starts with one execution ID.
            Everything else follows naturally.
          </P>

          <SubHeading>Correlation IDs Beat Guesswork</SubHeading>
          <P>Before introducing correlation IDs, debugging looked something like this.</P>
          <Diagram title="Before: manual reconstruction">
{`Search Logs
    ↓
Find Analyst Output
    ↓
Search Again
    ↓
Find Validation
    ↓
Search Again
    ↓
Find Retry
    ↓
Hope Nothing Was Missed`}
          </Diagram>
          <P>
            Every investigation became manual. Every incident consumed engineering time. After
            introducing execution IDs, debugging became dramatically simpler.
          </P>
          <Diagram title="After: instant retrieval">
{`Execution ID
    ↓
Complete Workflow Timeline`}
          </Diagram>
          <P>
            Instead of reconstructing events&hellip; <Strong>we simply retrieved them.</Strong>
          </P>
        </Article>

        {/* ------------------------- structured logging ------------------------ */}
        <Article>
          <SectionHeading id="structured-logging" icon={ScrollText} kicker="Part Three">
            Structured Logging Changes Everything
          </SectionHeading>
          <P lead>
            Correlation IDs are only useful if every component logs consistently. One lesson became
            obvious very quickly: <Strong>plain text logs don&rsquo;t scale.</Strong>
          </P>
          <P>This tells us very little:</P>
          <Code>{`Analyst completed successfully.`}</Code>
          <P>Instead, every agent emits structured events.</P>
          <Code title="Structured event">
{`{
  "execution_id": "8f34d8d2...",
  "workflow": "member_report",
  "agent": "analyst",
  "event": "completed",
  "duration_ms": 812,
  "status": "success"
}`}
          </Code>
          <P>
            Now logs become machine-readable. Filtering, aggregation, dashboards, and alerts become
            straightforward.
          </P>

          <SubHeading>Every Event Follows the Same Structure</SubHeading>
          <P>
            One practice paid dividends over time: every event follows the same schema.
          </P>
          <Code title="Consistent event schema">
{`{
  "timestamp": "...",
  "execution_id": "...",
  "workflow": "...",
  "agent": "...",
  "event": "...",
  "status": "...",
  "duration_ms": 842
}`}
          </Code>
          <P>
            The event changes. The structure doesn&rsquo;t. That consistency makes operational
            tooling dramatically simpler.
          </P>

          <SubHeading>Log Events, Not Messages</SubHeading>
          <P>
            Another mindset shift changed how we thought about logging. Instead of writing messages
            like &ldquo;Validation completed,&rdquo; we log business events. Examples include:
          </P>
          <Checklist items={businessEvents} />
          <P>
            Events explain what happened. Messages often explain very little.
          </P>

          <SubHeading>Following an Execution Timeline</SubHeading>
          <P>
            Once structured events exist, building execution timelines becomes almost trivial.
          </P>
          <Diagram title="Execution timeline">
{`09:12:41  Workflow Started
    │
09:12:41  Intent Classified
    │
09:12:42  Analyst Started
    │
09:12:43  Analyst Completed
    │
09:12:43  Schema Validation Passed
    │
09:12:44  Care Started
    │
09:12:45  Workflow Completed`}
          </Diagram>
          <P>
            Notice something important. This isn&rsquo;t just logging.{" "}
            <Strong>It&rsquo;s storytelling.</Strong> The timeline explains exactly what happened
            without reading application code.
          </P>

          <SubHeading>Every Agent Adds Context</SubHeading>
          <P>
            Structured logs become even more valuable when every specialist contributes additional
            metadata.
          </P>
          <Code title="Agent metadata">
{`{
  "execution_id": "8f34d8d2...",
  "agent": "care",
  "model": "gpt-4.1",
  "prompt_version": "1.8.3",
  "tokens": 1478,
  "duration_ms": 963,
  "validation": "passed"
}`}
          </Code>
          <P>
            Now one event tells us who executed, which model ran, which prompt version was used, how
            long it took, how many tokens were consumed, and whether validation succeeded.{" "}
            <Strong>That&rsquo;s operational gold.</Strong>
          </P>

          <SubHeading>Correlation Doesn&rsquo;t Stop at AI</SubHeading>
          <P>
            One mistake we avoided was limiting execution IDs to AI components. The same identifier
            appears everywhere:
          </P>
          <Checklist items={correlationEverywhere} />
          <P>
            The entire platform speaks the same language. That makes cross-service debugging
            dramatically easier.
          </P>

          <SubHeading>Tracing Decisions, Not Just Actions</SubHeading>
          <P>
            One of the most valuable additions wasn&rsquo;t logging actions. It was logging
            decisions.
          </P>
          <Code title="Routing decision">
{`{
  "event": "routing_decision",
  "execution_id": "8f34d8d2...",
  "selected_agents": ["analyst", "care"],
  "reason": "member_report"
}`}
          </Code>
          <P>
            Weeks later, if someone asks{" "}
            <Strong>&ldquo;Why didn&rsquo;t the Communications Agent run?&rdquo;</Strong> the answer
            already exists. The platform recorded the decision when it happened. Observability
            isn&rsquo;t only about failures. It&rsquo;s about understanding behaviour.
          </P>

          <SubHeading>Logs Explain What Happened</SubHeading>
          <P>
            Metrics tell us <Strong>something is wrong</Strong>. Logs tell us{" "}
            <Strong>what happened</Strong>. That&rsquo;s why both are necessary. A latency alert
            might reveal that workflows suddenly became slower. The structured logs explain why.
            Perhaps a new prompt increased token usage. Perhaps validation retried three times.
            Perhaps an external provider experienced degraded performance. Without logs, metrics
            only point toward the problem. Logs provide the explanation.
          </P>

          <SubHeading>The Biggest Lesson</SubHeading>
          <Pull>Every production question should already have an answer in the logs.</Pull>
          <P>
            If an engineer has to reproduce a workflow just to understand what happened&hellip; the
            observability layer isn&rsquo;t complete.{" "}
            <Strong>The system should already be telling its own story.</Strong>
          </P>
        </Article>

        {/* ------------------------- distributed tracing ----------------------- */}
        <Article>
          <SectionHeading id="distributed-tracing" icon={GitBranch} kicker="Part Four">
            Distributed Tracing: Seeing the Entire Workflow, Not Just Individual Events
          </SectionHeading>
          <P lead>
            By the time PHHM reached six collaborating agents, structured logs were no longer
            enough. Every component was logging correctly. Every event had an execution ID. Yet
            debugging still felt fragmented.
          </P>
          <P>
            We could answer questions like &ldquo;Did the Analyst complete?&rdquo; But we
            couldn&rsquo;t immediately answer &ldquo;How did the entire workflow unfold?&rdquo;
            That&rsquo;s the difference between logs and traces.{" "}
            <Strong>Logs explain individual events. Traces explain relationships.</Strong>
          </P>

          <SubHeading>A Workflow Is More Than a List of Logs</SubHeading>
          <P>
            Imagine reading a novel where every page had been shuffled. Every sentence still exists.
            But the story disappears. That&rsquo;s exactly what happens when you rely only on logs.
            Distributed tracing reconstructs the narrative. Instead of isolated events, you see one
            connected execution.
          </P>
          <Diagram title="One connected trace">
{`User Request
      │
      ▼
   Overseer
      │
 ┌────┼───────────┐
 ▼    ▼           ▼
Welcome Analyst  Care
 │      │         │
 ▼      ▼         ▼
Validation Validation Validation
 │      │         │
 └──────┼─────────┘
        ▼
 Communications
        │
        ▼
 Final Response`}
          </Diagram>
          <P>
            Every node belongs to the same trace. Every edge represents work performed by the
            platform.
          </P>

          <SubHeading>From Events to Spans</SubHeading>
          <P>
            Distributed tracing introduces one important idea: a <Strong>span</Strong>. Think of a
            span as a measurable unit of work.
          </P>
          <Diagram title="Workflow spans">
{`Workflow
├── Authentication
├── Intent Classification
├── Analyst
├── Validation
├── Care
├── Communications
└── Final Aggregation`}
          </Diagram>
          <P>
            Every span records when it started, when it finished, how long it took, whether it
            succeeded, and what metadata it produced. Together, those spans become the complete
            execution trace.
          </P>

          <SubHeading>Every Agent Becomes a Span</SubHeading>
          <P>Each specialist contributes its own portion of the trace.</P>
          <Code title="Agent span">
{`{
  "span": "analyst",
  "execution_id": "8f34d8d2...",
  "parent": "workflow",
  "duration_ms": 912,
  "status": "success"
}`}
          </Code>
          <P>
            Notice something important. The span doesn&rsquo;t only record execution. It records{" "}
            <Strong>where the execution belongs</Strong>. That&rsquo;s what allows tracing tools to
            rebuild the workflow automatically.
          </P>

          <SubHeading>Parent-Child Relationships</SubHeading>
          <P>
            One concept from distributed systems translated perfectly into AI orchestration. Every
            workflow begins with a root span. Every agent execution becomes its child.
          </P>
          <Diagram title="Span hierarchy">
{`Workflow
│
├── Overseer
│     │
│     ├── Analyst
│     ├── Care
│     └── Communications
│
└── Final Response`}
          </Diagram>
          <P>
            Instead of unrelated operations, the platform now understands hierarchy. That&rsquo;s
            invaluable when investigating failures.
          </P>

          <SubHeading>Parallel Execution Becomes Visible</SubHeading>
          <P>
            One advantage of tracing is that concurrency becomes obvious. Logs might tell you three
            agents executed. A trace shows that they executed simultaneously.
          </P>
          <Diagram title="Concurrency made visible">
{`             Overseer
                │
    ┌───────────┼────────────┐
    ▼           ▼            ▼
 Analyst      Care     Communications
    │           │            │
    └───────────┼────────────┘
                ▼
        Response Assembly`}
          </Diagram>
          <P>Suddenly performance bottlenecks become much easier to identify.</P>

          <SubHeading>Finding the Slowest Step</SubHeading>
          <P>
            Imagine a workflow taking eight seconds. Without tracing, you know it&rsquo;s slow. With
            tracing:
          </P>
          <Diagram title="Span durations">
{`Workflow
├── Authentication ........ 18ms
├── Routing ............... 11ms
├── Analyst ............... 2.8s
├── Validation ............ 31ms
├── Care .................. 1.1s
├── Communications ........ 540ms
└── Aggregation ........... 19ms`}
          </Diagram>
          <P>
            Now the bottleneck is obvious. The Analyst isn&rsquo;t &ldquo;probably slow.&rdquo; It
            is objectively the longest-running span.{" "}
            <Strong>Observability turns opinions into measurements.</Strong>
          </P>

          <SubHeading>Retries Become Part of the Story</SubHeading>
          <P>Retries often make logs difficult to follow. Tracing keeps everything connected.</P>
          <Diagram title="One recovery path">
{`Analyst
   ↓
Validation Failed
   ↓
Retry
   ↓
Analyst
   ↓
Validation Passed
   ↓
Continue Workflow`}
          </Diagram>
          <P>
            Instead of seeing two unrelated executions, engineers see one recovery path.
            That&rsquo;s exactly what happened. That&rsquo;s exactly what the trace should show.
          </P>

          <SubHeading>Visualizing Workflow Health</SubHeading>
          <P>
            One unexpected benefit of tracing was operational visibility. Healthy workflows looked
            very different from unhealthy ones.
          </P>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Diagram title="Healthy trace">
{`Request
   ↓
Overseer
   ↓
Agents
   ↓
Validation
   ↓
Response`}
            </Diagram>
            <Diagram title="Unhealthy trace">
{`Request
   ↓
Overseer
   ↓
Analyst
   ↓
Retry
   ↓
Retry
   ↓
Fallback Model
   ↓
Validation
   ↓
Response`}
            </Diagram>
          </div>
          <P>
            Without reading logs, engineers could immediately see that something unusual happened.
          </P>

          <SubHeading>Prompt Versions Belong in the Trace</SubHeading>
          <P>
            One lesson from earlier articles becomes incredibly valuable here. Every span records
            prompt metadata.
          </P>
          <Code title="Prompt metadata in the trace">
{`{
  "agent": "analyst",
  "prompt_version": "2.4.1",
  "model": "gpt-4.1",
  "tokens": 1832
}`}
          </Code>
          <P>
            Now traces answer questions like: Which prompt generated this output? Did latency
            increase after a deployment? Which model executed this workflow? Which configuration
            version was active? <Strong>Tracing becomes historical documentation.</Strong>
          </P>

          <SubHeading>The Complete Workflow Story</SubHeading>
          <P>By this point, every request tells a complete story.</P>
          <Diagram title="The full narrative">
{`Workflow Started
   ↓
Authentication
   ↓
Intent Classification
   ↓
Routing Decision
   ↓
Parallel Agent Execution
   ↓
Validation
   ↓
Retry (if required)
   ↓
Aggregation
   ↓
Final Response
   ↓
Audit Recorded`}
          </Diagram>
          <P>Nothing is hidden. Nothing requires guesswork. Everything is observable.</P>

          <SubHeading>Tracing Changes How You Debug</SubHeading>
          <P>
            The biggest change wasn&rsquo;t technical. It was psychological. Instead of asking{" "}
            <Strong>&ldquo;Where should I start looking?&rdquo;</Strong> engineers ask{" "}
            <Strong>&ldquo;Show me the trace.&rdquo;</Strong> That one shift dramatically reduced
            investigation time. The platform already knew what happened. The trace simply revealed
            it.
          </P>

          <SubHeading>The Bigger Lesson</SubHeading>
          <P>
            Distributed tracing isn&rsquo;t really about visualization. It&rsquo;s about
            understanding causality. Every workflow is a chain of decisions. Tracing preserves those
            relationships. Without it, you&rsquo;re looking at isolated events. With it, you&rsquo;re
            looking at a living system. That&rsquo;s exactly what multi-agent AI platforms become.
          </P>
          <Pull>Not collections of prompts. Distributed software systems.</Pull>
        </Article>

        {/* ------------------------------- metrics ----------------------------- */}
        <Article>
          <SectionHeading id="metrics" icon={Gauge} kicker="Part Five">
            Metrics That Matter: Measuring the Health of Multi-Agent AI Systems
          </SectionHeading>
          <P lead>
            One mistake we made early was measuring the wrong things. Like many AI projects, our
            first dashboard focused almost entirely on model usage: number of requests, tokens
            consumed, API latency.
          </P>
          <P>
            Useful? Absolutely. Sufficient? Not even close. None of those metrics told us whether
            the <Strong>workflow</Strong> was actually healthy. Eventually we stopped monitoring
            models. We started monitoring the platform. That small mindset shift completely changed
            our operational dashboards.
          </P>

          <SubHeading>Measure Workflows, Not Just Models</SubHeading>
          <P>
            Suppose the Analyst completes in under a second. That sounds great. But what if
            validation fails three times? What if Communications retries twice? What if the final
            response takes eight seconds? The Analyst wasn&rsquo;t the user&rsquo;s experience.{" "}
            <Strong>The workflow was.</Strong> That&rsquo;s why PHHM measures end-to-end execution
            before individual model performance.
          </P>

          <SubHeading>Every Layer Produces Metrics</SubHeading>
          <P>Every architectural layer contributes operational signals.</P>
          <Diagram title="Signal-producing layers">
{`HTTP Layer
   ↓
Authentication
   ↓
Orchestration
   ↓
Agent Execution
   ↓
Validation
   ↓
Workflow State
   ↓
Final Response`}
          </Diagram>
          <P>
            Each layer answers different questions. The API measures availability. The orchestrator
            measures workflow execution. The agents measure AI performance. Validation measures
            reliability. Together they describe the health of the platform.
          </P>

          <SubHeading>Workflow Metrics Come First</SubHeading>
          <P>The first dashboard focuses on workflow outcomes.</P>
          <MetricTable
            caption="Workflow metrics"
            headers={["Metric", "Why It Matters"]}
            rows={workflowMetrics}
          />
          <P>
            These metrics answer the question users actually care about:{" "}
            <Strong>&ldquo;Did my workflow complete successfully?&rdquo;</Strong>
          </P>

          <SubHeading>Agent-Level Metrics</SubHeading>
          <P>Once workflow health is understood, we drill into individual specialists.</P>
          <MetricTable
            caption="Agent metrics"
            headers={["Agent Metric", "Purpose"]}
            rows={agentMetrics}
          />
          <P>
            This makes it easy to spot bottlenecks. If one agent suddenly doubles its execution
            time, you&rsquo;ll see it immediately.
          </P>

          <SubHeading>Latency Is More Than One Number</SubHeading>
          <P>
            Average latency rarely tells the full story. Instead, PHHM breaks execution into stages.
          </P>
          <Diagram title="Latency by stage">
{`Workflow
├── Authentication ......... 12ms
├── Routing ................ 8ms
├── Analyst ................ 2.1s
├── Validation ............. 24ms
├── Care ................... 840ms
├── Communications ......... 470ms
└── Aggregation ............ 18ms`}
          </Diagram>
          <P>
            Now optimization becomes targeted. Instead of guessing where time is spent, engineers
            know exactly which component needs attention.
          </P>

          <SubHeading>Token Usage Is an Operational Metric</SubHeading>
          <P>
            Tokens aren&rsquo;t just billing data. They&rsquo;re architectural feedback. Sudden
            increases often indicate prompts becoming longer, unnecessary context, repeated retries,
            excessive workflow state, or inefficient orchestration. That&rsquo;s why every workflow
            records token consumption.
          </P>
          <Diagram title="Token accounting per workflow">
{`Workflow:        Member Report
Input Tokens:    2,840
Output Tokens:   618
Retries:         0
Total:           3,458`}
          </Diagram>
          <P>Tracking this over time makes regressions obvious.</P>

          <SubHeading>Cost Per Workflow</SubHeading>
          <P>
            One metric proved surprisingly valuable. Instead of asking &ldquo;How much are we
            spending today?&rdquo; we asked{" "}
            <Strong>&ldquo;How much does this workflow cost?&rdquo;</Strong>
          </P>
          <MetricTable
            caption="Cost per workflow"
            headers={["Workflow", "Estimated AI Cost"]}
            rows={costPerWorkflow}
          />
          <P>
            Now optimization becomes meaningful. A prompt change that increases cost by 40%
            immediately becomes visible.
          </P>

          <SubHeading>Prompt Versions Become Operational Data</SubHeading>
          <P>
            Earlier in the series we discussed prompt versioning. Observability closes the loop.
            Every execution records the prompt version, model version, configuration version, and
            workflow version.
          </P>
          <Code title="Versions attached to every execution">
{`{
  "workflow": "member_report",
  "prompt_version": "2.5.1",
  "model": "gpt-4.1",
  "config_version": "1.14.0"
}`}
          </Code>
          <P>
            Weeks later, if validation failures suddenly increase, engineers can quickly correlate
            them with a specific deployment.
          </P>

          <SubHeading>Detecting Regressions Automatically</SubHeading>
          <P>Imagine deploying a new Analyst prompt. Within an hour, dashboards show:</P>
          <Diagram title="Validation failures">
{`Yesterday:  1.2%
Today:      7.9%`}
          </Diagram>
          <P>
            Nothing crashed. The API is healthy. Users still receive responses. But the platform is
            telling you something changed. That&rsquo;s the value of operational metrics.{" "}
            <Strong>You discover regressions before customers report them.</Strong>
          </P>

          <SubHeading>Dashboards Should Answer Questions</SubHeading>
          <Pull>
            If an engineer has to open raw logs to understand platform health, the dashboard
            isn&rsquo;t complete.
          </Pull>
          <P>A good operational dashboard answers questions like:</P>
          <Checklist items={dashboardQuestions} />
          <P>
            Dashboards shouldn&rsquo;t replace logs. They should tell engineers when it&rsquo;s time
            to read them.
          </P>

          <SubHeading>Alerts Should Focus on Behaviour</SubHeading>
          <P>
            Another lesson came from alerting. We originally monitored infrastructure. CPU. Memory.
            Response time. Useful, but incomplete. Eventually we started monitoring workflow
            behaviour instead. Examples include:
          </P>
          <Checklist items={behaviourAlerts} />
          <P>
            Those alerts reflect what actually matters. Healthy infrastructure doesn&rsquo;t always
            mean healthy AI workflows.
          </P>

          <SubHeading>Trends Matter More Than Snapshots</SubHeading>
          <P>
            One slow workflow isn&rsquo;t necessarily a problem. A gradual increase over several
            weeks is. That&rsquo;s why we care more about trends than isolated events.
          </P>
          <Diagram title="Workflow success rate">
{`Week 1   99.3%
   ↓
Week 2   98.8%
   ↓
Week 3   97.9%
   ↓
Week 4   95.4%`}
          </Diagram>
          <P>
            Nothing dramatic happened. But something clearly changed. Trend analysis catches slow
            regressions long before they become incidents.
          </P>

          <SubHeading>The Metrics Hierarchy</SubHeading>
          <P>Looking back, our metrics naturally formed a hierarchy.</P>
          <Diagram title="From business down to infrastructure">
{`Business Metrics
        │
        ▼
Workflow Metrics
        │
        ▼
 Agent Metrics
        │
        ▼
 Model Metrics
        │
        ▼
Infrastructure Metrics`}
          </Diagram>
          <P>
            Most teams start at the bottom. PHHM starts at the top. Because users care about
            workflows—not CPU utilization. Infrastructure still matters. It&rsquo;s just not the
            first thing we optimize.
          </P>

          <SubHeading>The Biggest Lesson</SubHeading>
          <Pull>Measure outcomes before components.</Pull>
          <P>
            Users don&rsquo;t experience prompts. They don&rsquo;t experience models. They
            don&rsquo;t experience FastAPI. <Strong>They experience workflows.</Strong> Those
            workflows should become the primary unit of measurement. Everything else exists to
            explain why those workflows succeed—or fail.
          </P>
        </Article>

        {/* ---------------------------- audit trails --------------------------- */}
        <Article>
          <SectionHeading id="audit-trails" icon={ScrollText} kicker="Part Six">
            Audit Trails: Explaining Every AI Decision Months Later
          </SectionHeading>
          <P lead>
            Logs help engineers debug today&rsquo;s problems. Metrics reveal today&rsquo;s trends.
            Traces explain today&rsquo;s workflows. But production systems have another
            responsibility. They must also explain{" "}
            <Strong>what happened weeks or months later.</Strong>
          </P>
          <P>
            Imagine a member asks: <em>&ldquo;Why did the platform recommend this care
            plan?&rdquo;</em> Or an administrator asks: <em>&ldquo;Which prompt version generated
            this newsletter?&rdquo;</em> Or an engineer asks: <em>&ldquo;Why did workflow
            reliability suddenly decrease last Tuesday?&rdquo;</em> Those questions can&rsquo;t be
            answered with memory. They require history. That&rsquo;s where audit trails become
            essential.
          </P>

          <SubHeading>Logs Are Temporary. Audit Trails Are Evidence.</SubHeading>
          <P>
            One mistake we made early was assuming logs would be enough. They weren&rsquo;t. Logs
            are optimized for operational debugging. Audit trails are optimized for accountability.
            That distinction matters. A structured log might tell us &ldquo;Validation
            Passed.&rdquo; An audit record tells us:
          </P>
          <Checklist items={auditRecordContents} />
          <P>
            <Strong>That&rsquo;s the difference between an event and evidence.</Strong>
          </P>

          <SubHeading>Every Workflow Leaves a Paper Trail</SubHeading>
          <P>
            By the end of the project, every execution produced a complete operational record.
          </P>
          <Diagram title="The paper trail">
{`Workflow Started
        │
        ▼
Authentication
        │
        ▼
Routing Decision
        │
        ▼
Agent Execution
        │
        ▼
Validation
        │
        ▼
Retry (if needed)
        │
        ▼
Workflow Completed
        │
        ▼
Audit Record Stored`}
          </Diagram>
          <P>
            Nothing disappears. Every important decision becomes part of the workflow history.
          </P>

          <SubHeading>What Should an Audit Record Contain?</SubHeading>
          <P>
            One lesson became obvious. If you don&rsquo;t capture metadata during execution, you
            can&rsquo;t recover it later. A useful audit record includes information such as:
          </P>
          <Code title="Audit record">
{`{
  "execution_id": "8f34d8d2...",
  "workflow": "member_report",
  "user_id": "user_482",
  "agents": ["analyst", "care"],
  "model": "gpt-4.1",
  "prompt_version": "2.5.1",
  "config_version": "1.14.0",
  "status": "completed",
  "retries": 1,
  "completed_at": "2026-07-03T14:18:22Z"
}`}
          </Code>
          <P>
            Notice that this isn&rsquo;t storing the entire conversation. It&rsquo;s preserving the
            execution history. That&rsquo;s enough to reconstruct what happened without
            unnecessarily retaining transient context.
          </P>

          <SubHeading>Workflow Replay</SubHeading>
          <P>
            One capability became invaluable during production investigations: workflow replay.
            Instead of trying to reproduce an issue manually, engineers can replay the execution
            using the recorded metadata.
          </P>
          <Diagram title="Replay pipeline">
{`Audit Record
   ↓
Load Prompt Version
   ↓
Load Configuration
   ↓
Load Workflow State
   ↓
Replay Execution`}
          </Diagram>
          <P>
            Replay doesn&rsquo;t necessarily reproduce identical AI output—language models remain
            probabilistic. What it does reproduce is the workflow itself. The routing decisions. The
            validation steps. The configuration. The execution path. That context dramatically
            shortens investigations.
          </P>

          <SubHeading>Observability Closes the Feedback Loop</SubHeading>
          <P>
            One realization tied together the entire PHHM architecture. Every previous article
            contributes information to observability.
          </P>
          <Diagram title="The layers feed observability">
{`Orchestration
        │
        ▼
Prompt Versioning
        │
        ▼
 Configuration
        │
        ▼
Workflow State
        │
        ▼
   Guardrails
        │
        ▼
 Observability`}
          </Diagram>
          <P>
            Observability isn&rsquo;t another feature.{" "}
            <Strong>It&rsquo;s the layer that explains every other layer.</Strong> Without it, the
            architecture becomes difficult to operate.
          </P>

          <SubHeading>Incident Reviews Become Data-Driven</SubHeading>
          <P>
            One unexpected benefit was improving post-incident reviews. Instead of asking
            &ldquo;What do we think happened?&rdquo; we asked{" "}
            <Strong>&ldquo;What does the telemetry show?&rdquo;</Strong> A typical investigation now
            follows a predictable sequence.
          </P>
          <Diagram title="Investigation sequence">
{`Alert Triggered
        │
        ▼
 Open Dashboard
        │
        ▼
Inspect Workflow Trace
        │
        ▼
Review Structured Logs
        │
        ▼
Compare Prompt Version
        │
        ▼
Identify Root Cause`}
          </Diagram>
          <P>
            Opinions disappear. Evidence takes over. That&rsquo;s exactly what mature operational
            practices should encourage.
          </P>

          <SubHeading>Observability Improves Development Too</SubHeading>
          <P>
            One pleasant surprise was how useful observability became during feature development.
            When introducing a new agent, we could immediately answer questions like:
          </P>
          <Checklist items={devQuestions} />
          <P>
            Those insights helped us improve features long before they became production issues.
            Observability isn&rsquo;t only about responding to incidents.{" "}
            <Strong>It&rsquo;s about guiding engineering decisions.</Strong>
          </P>

          <SubHeading>The Architecture We Ended Up With</SubHeading>
          <P>
            By the time PHHM matured, observability had become a cross-cutting layer across the
            entire platform.
          </P>
          <Diagram title="Final platform architecture">
{`                    Client
                      │
                      ▼
                 FastAPI Layer
                      │
                      ▼
               Authentication
                      │
                      ▼
           Orchestration Engine
                      │
         ┌────────────┼────────────┐
         ▼            ▼            ▼
     Analyst        Care    Communications
         │            │            │
         └────────────┼────────────┘
                      ▼
         Validation & Recovery
                      │
                      ▼
     Workflow State & Persistence
                      │
                      ▼
       Observability Platform
         ┌────────┬────────┬────────┐
         ▼        ▼        ▼        ▼
       Logs    Traces   Metrics  Audit
                      │
                      ▼
               Final Response`}
          </Diagram>
          <P>
            Notice something important. Observability isn&rsquo;t attached to one component.{" "}
            <Strong>It surrounds the entire platform.</Strong> Every architectural decision leaves a
            measurable footprint.
          </P>
        </Article>

        {/* --------------------------- five principles ------------------------- */}
        <Article>
          <SectionHeading id="five-principles" icon={Compass} kicker="Part Seven">
            The Five Principles of AI Observability
          </SectionHeading>
          <P lead>
            If I were building another multi-agent platform tomorrow, these are the principles
            I&rsquo;d carry with me.
          </P>
          <div className="mt-8 grid gap-4">
            {fivePrinciples.map((p, i) => (
              <div
                key={p.title}
                className="flex items-start gap-5 rounded-3xl border border-[var(--line)] bg-[var(--surface2)] p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] font-['Instrument_Serif',Georgia,serif] text-xl text-white">
                  {i + 1}
                </div>
                <div>
                  <div className="text-base font-semibold">{p.title}</div>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Article>

        {/* ---------------------------- final thoughts ------------------------- */}
        <Article>
          <SectionHeading id="final-thoughts" icon={Lightbulb} kicker="Part Eight">
            Final Thoughts
          </SectionHeading>
          <P lead>
            When people think about observability, they often picture dashboards full of graphs.
            Those are useful. But they aren&rsquo;t the goal.{" "}
            <Strong>The goal is understanding.</Strong>
          </P>
          <P>
            Can you explain why a workflow took longer today than yesterday? Can you identify which
            prompt deployment increased validation failures? Can you reconstruct an execution that
            happened three months ago? Can you answer those questions without relying on memory?
            That&rsquo;s what observability provides.
          </P>
          <P>Looking back, one realization stands above everything else.</P>
          <Pull>
            Observability isn&rsquo;t about watching AI systems. It&rsquo;s about making AI systems
            explain themselves.
          </Pull>
          <P>
            That philosophy shaped every operational decision in PHHM. The models generated
            responses. The orchestration layer coordinated work. The validation layer protected
            quality. The observability layer explained everything. Together, those layers
            transformed a collection of AI agents into a platform that could be trusted, maintained,
            and continuously improved.
          </P>
        </Article>

        {/* ---------------------------- key takeaways -------------------------- */}
        <Article>
          <SectionHeading id="key-takeaways" icon={ListChecks} kicker="Part Nine">
            Key Takeaways
          </SectionHeading>
          <P lead>
            If you&rsquo;re building a production multi-agent AI platform, I&rsquo;d recommend
            adopting these practices from day one:
          </P>
          <Checklist items={keyTakeaways} />

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="/blog"
              className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white"
            >
              Read next
            </a>
            <a
              href="/blog/categories"
              className="rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold"
            >
              Browse categories
            </a>
          </div>
        </Article>

        {/* ------------------------------- footer ------------------------------ */}
        <footer className="mt-10 rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-8 text-sm text-[var(--muted)] shadow-[var(--shadow)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <LineChart className="h-4 w-4 text-[var(--accent)]" />
              PHHM Journal • Production AI Series
            </div>
            <div>
              Suggested companion posts: Guardrails, Evaluation, and Security — all build on the
              observability layer.
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}