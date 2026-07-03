export type ArticleMeta = {
  slug: string;
  part: number;
  title: string;
  focus: string;
  readTime: string;
  description: string;
};

export const articles: ArticleMeta[] = [
  {
    slug: "architecture",
    part: 1,
    title: "Building a Multi-Agent AI Orchestration Layer in Python",
    focus: "Architecture",
    readTime: "20 min",
    description:
      "Lessons from six collaborating agents — how PHHM reduced workflow time by 85% and errors by 73% with specialist agents, central orchestration, and shared workflow state.",
  },
  {
    slug: "fastapi",
    part: 2,
    title: "Building Production AI APIs with FastAPI",
    focus: "Production APIs",
    readTime: "14 min",
    description:
      "Why AI APIs are orchestration, not CRUD — a single workflow endpoint, Pydantic validation at the boundary, and keeping FastAPI thin while the orchestrator does the thinking.",
  },
  {
    slug: "configuration",
    part: 3,
    title: "Configuration-Driven AI: Why YAML Beats Hardcoded Prompts in Production",
    focus: "Configuration",
    readTime: "8 min",
    description:
      "How PHHM adds new agents, models, prompts, and workflows without rewriting application code — configuration changes behavior, not code structure.",
  },
  {
    slug: "state-management",
    part: 4,
    title: "State Management for Multi-Agent AI",
    focus: "State",
    readTime: "14 min",
    description:
      "Workflow state is not shared memory. Every execution owns structured context that survives retries and agent handoffs, so the platform behaves like one system.",
  },
  {
    slug: "prompt-versioning",
    part: 5,
    title: "Prompt Versioning at Scale",
    focus: "Prompt Versioning",
    readTime: "15 min",
    description:
      "Prompts are deployable software assets — semantic versions, workflow mapping, regression tests, and rollbacks that make prompt changes boring instead of risky.",
  },
  {
    slug: "guardrails",
    part: 6,
    title: "Guardrails for Multi-Agent AI Systems",
    focus: "Guardrails",
    readTime: "10 min",
    description:
      "Treat every AI response as untrusted input. Schema validation protects the software, business rules protect the meaning, and recovery paths keep failures contained.",
  },
  {
    slug: "observability",
    part: 7,
    title: "Observability for Multi-Agent AI Systems",
    focus: "Observability",
    readTime: "14 min",
    description:
      "You can't debug what you can't see — correlation IDs, structured logs, distributed traces, workflow metrics, and audit trails that make AI systems explain themselves.",
  },
  {
    slug: "evaluation",
    part: 8,
    title: "Evaluation and Regression Testing for AI Workflows",
    focus: "Evaluation",
    readTime: "12 min",
    description:
      "Stop testing prompts in isolation. Golden datasets, behavioral assertions, and CI/CD evaluation gates that prove the workflow still works before every deploy.",
  },
  {
    slug: "security",
    part: 9,
    title: "Securing Multi-Agent AI Systems",
    focus: "Security",
    readTime: "10 min",
    description:
      "Prompt injection isn't the root problem — trust boundaries are. Why the model sits outside the trusted core and never decides what the platform does.",
  },
  {
    slug: "langchain",
    part: 10,
    title: "Why We Didn't Use LangChain in Production (And What We Built Instead)",
    focus: "Frameworks",
    readTime: "10 min",
    description:
      "Evaluating LangChain, CrewAI, and AutoGen taught us an important lesson — use frameworks for capabilities, but own the architecture that differentiates your platform.",
  },
  {
    slug: "monolith-to-multi-agent",
    part: 11,
    title: "From Monolith to Multi-Agent: The Refactoring We Should Have Done Earlier",
    focus: "Refactoring",
    readTime: "11 min",
    description:
      "Simplicity has a hidden expiration date. How PHHM outgrew its single-agent design and rebuilt into six specialists without breaking production.",
  },
  {
    slug: "prompt-incident",
    part: 12,
    title: "The Production Incident That Changed How We Deploy AI Prompts",
    focus: "Post-Mortem",
    readTime: "14 min",
    description:
      "No alert fired. Nothing crashed. A post-mortem on the single sentence that quietly degraded our Care Agent — and how the telemetry found it.",
  },
  {
    slug: "testing-without-llms",
    part: 13,
    title: "Testing AI Systems Without Calling a Single LLM",
    focus: "Testing",
    readTime: "10 min",
    description:
      "Thousands of regression tests in CI/CD with a zero-pound API bill — mockable interfaces, dependency injection, golden responses, and deterministic workflows.",
  },
  {
    slug: "cost-engineering",
    part: 14,
    title: "Cost Engineering for Production AI — Part 1: Measure",
    focus: "Cost • Measure",
    readTime: "13 min",
    description:
      "You can't optimize costs you don't measure. Cost per workflow, token accounting, and why context — not model pricing — is usually the biggest expense.",
  },
  {
    slug: "cost-optimization",
    part: 15,
    title: "The Cost of Production AI — Part 2: Optimize",
    focus: "Cost • Optimize",
    readTime: "10 min",
    description:
      "The cheapest AI call is the one you never make — prompt compression, intelligent routing, caching, and parallel execution that made PHHM economically sustainable.",
  },
];
