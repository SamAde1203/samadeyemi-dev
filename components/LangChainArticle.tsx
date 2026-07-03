"use client";

import ArticleShell, { type ArticleData } from "./ArticleShell";

const article = {
  "kicker": "PHHM Journal • Frameworks",
  "focus": "Frameworks",
  "icon": "boxes",
  "title": "Why We Didn't Use LangChain in Production (And What We Built Instead)",
  "subtitle": "Evaluating LangChain, CrewAI, and AutoGen taught us an important lesson: production AI platforms need ownership, not abstraction.",
  "readTime": "10 min",
  "blocks": [
    {
      "t": "p",
      "text": "One of the questions I get asked most about PHHM is surprisingly consistent."
    },
    {
      "t": "pull",
      "text": "\"Why didn't you build it with LangChain?\""
    },
    {
      "t": "p",
      "text": "Sometimes the question is about CrewAI. Sometimes it's AutoGen. Sometimes another orchestration framework. The assumption is always the same. If you're building a multi-agent AI platform, surely you start with an orchestration framework. We didn't. Not because those frameworks are bad. Quite the opposite."
    },
    {
      "t": "p",
      "text": "They're impressive pieces of engineering. They solve real problems. We evaluated them carefully before writing a single line of orchestration code. And then we made what initially felt like the harder decision. We built our own orchestration layer using **FastAPI**, **asyncio**, and **YAML-driven configuration**. Looking back, I think that decision had more impact on PHHM's long-term architecture than almost any model or prompt we chose. Not because our solution was more sophisticated. Because it gave us ownership of the parts of the platform that mattered most."
    },
    {
      "t": "h3",
      "text": "This Was Never About Choosing a Winner"
    },
    {
      "t": "p",
      "text": "Before discussing architecture, it's worth making one thing clear. This wasn't a competition. We weren't trying to prove one framework was better than another. Every framework we evaluated solves a different problem. That's exactly why engineering decisions should start with requirements—not preferences. For PHHM, the requirements were unusually specific. We needed:"
    },
    {
      "t": "list",
      "items": [
        "deterministic workflow routing",
        "explicit orchestration",
        "YAML-configured agents",
        "strict validation",
        "workflow state ownership",
        "structured observability",
        "prompt version tracking",
        "role-based permissions",
        "predictable deployment behaviour"
      ]
    },
    {
      "t": "p",
      "text": "Those requirements became the benchmark. Not popularity. Not GitHub stars. Not social media discussions."
    },
    {
      "t": "h3",
      "text": "The Frameworks We Evaluated"
    },
    {
      "t": "p",
      "text": "Early in the project we spent time evaluating several orchestration approaches. Broadly, they fell into three categories."
    },
    {
      "t": "table",
      "headers": [
        "Framework",
        "Strength",
        "Typical Use Case"
      ],
      "rows": [
        [
          "LangChain",
          "Rich ecosystem and integrations",
          "Rapid application development"
        ],
        [
          "CrewAI",
          "Agent collaboration abstractions",
          "Multi-agent experimentation"
        ],
        [
          "AutoGen",
          "Conversational agent interactions",
          "Research and autonomous workflows"
        ],
        [
          "Custom Orchestration",
          "Full architectural control",
          "Production platforms with domain-specific requirements"
        ]
      ]
    },
    {
      "t": "p",
      "text": "Notice something important. None of these tools are \"wrong.\" They're optimized for different engineering goals. The question wasn't:"
    },
    {
      "t": "pull",
      "text": "\"Which framework is best?\""
    },
    {
      "t": "p",
      "text": "It was:"
    },
    {
      "t": "pull",
      "text": "\"Which approach best matches the platform we're building?\""
    },
    {
      "t": "h3",
      "text": "Prototypes and Platforms Have Different Constraints"
    },
    {
      "t": "p",
      "text": "One realization kept resurfacing during our evaluation. The requirements for a prototype are almost the opposite of the requirements for a production platform. A prototype optimizes for:"
    },
    {
      "t": "list",
      "items": [
        "speed",
        "experimentation",
        "iteration",
        "abstraction",
        "convenience"
      ]
    },
    {
      "t": "p",
      "text": "A production platform optimizes for:"
    },
    {
      "t": "list",
      "items": [
        "predictability",
        "observability",
        "debugging",
        "deployment",
        "operational control"
      ]
    },
    {
      "t": "p",
      "text": "Those priorities don't always point toward the same architecture. And that's where our decision started to take shape."
    },
    {
      "t": "h3",
      "text": "The First Architectural Question"
    },
    {
      "t": "p",
      "text": "Instead of asking:"
    },
    {
      "t": "pull",
      "text": "\"How can we orchestrate multiple agents?\""
    },
    {
      "t": "p",
      "text": "We started asking:"
    },
    {
      "t": "pull",
      "text": "\"Who owns orchestration?\""
    },
    {
      "t": "p",
      "text": "That single question influenced everything that followed. If orchestration lived inside a framework, many of our operational decisions would also live there. If orchestration lived inside PHHM, we could shape it around our workflows instead of adapting our workflows to someone else's abstractions. That distinction became increasingly important as the platform grew."
    },
    {
      "t": "h3",
      "text": "Building Versus Owning"
    },
    {
      "t": "p",
      "text": "This wasn't really a decision between using a library and writing code. It was a decision about ownership. Who owns:"
    },
    {
      "t": "list",
      "items": [
        "routing?",
        "retries?",
        "workflow state?",
        "validation?",
        "logging?",
        "versioning?",
        "permissions?",
        "deployment behaviour?"
      ]
    },
    {
      "t": "p",
      "text": "For PHHM, those weren't implementation details. They were core platform capabilities. Once we recognized that, the path became much clearer."
    },
    {
      "t": "h3",
      "text": "The Principle That Guided Everything"
    },
    {
      "t": "p",
      "text": "Looking back, one principle summarizes the entire evaluation."
    },
    {
      "t": "pull",
      "text": "Use frameworks for capabilities. Own the architecture that differentiates your platform."
    },
    {
      "t": "p",
      "text": "That idea influenced every decision that followed."
    },
    {
      "t": "h2",
      "text": "Where Frameworks Shine—and Where We Reached Their Limits"
    },
    {
      "t": "p",
      "text": "One thing surprised me during our evaluation. Every framework worked. LangChain. CrewAI. AutoGen. Within a few hours, we could build a working multi-agent prototype using any of them. Requests flowed between agents. The models produced useful outputs."
    },
    {
      "t": "p",
      "text": "Basic orchestration worked exactly as advertised. If our goal had been demonstrating an idea, we could have stopped there. But PHHM wasn't being built as a demo. It was being built as a platform. And platforms ask different questions."
    },
    {
      "t": "h3",
      "text": "Prototypes Optimize for Speed"
    },
    {
      "t": "p",
      "text": "Frameworks are excellent at reducing the amount of code you write. Instead of implementing orchestration yourself, you compose higher-level building blocks."
    },
    {
      "t": "diagram",
      "text": "Application\n↓\nFramework\n↓\nModel\n↓\nResponse"
    },
    {
      "t": "p",
      "text": "That dramatically shortens the path from idea to working software. For experimentation, that's exactly what you want."
    },
    {
      "t": "h3",
      "text": "Production Optimizes for Control"
    },
    {
      "t": "p",
      "text": "As PHHM grew, the questions changed. Instead of asking:"
    },
    {
      "t": "pull",
      "text": "\"Can we connect multiple agents?\""
    },
    {
      "t": "p",
      "text": "We started asking:"
    },
    {
      "t": "list",
      "items": [
        "Why did this workflow take seven seconds?",
        "Why did the Care Agent retry twice?",
        "Which prompt version generated this recommendation?",
        "Which validation rule rejected this response?",
        "Which YAML configuration was active?",
        "Why did this workflow choose one route instead of another?"
      ]
    },
    {
      "t": "p",
      "text": "Those questions aren't primarily about AI. They're about operating distributed software. That's where our requirements began to diverge from what orchestration frameworks were designed to solve."
    },
    {
      "t": "h3",
      "text": "Abstraction Is Both a Strength and a Cost"
    },
    {
      "t": "p",
      "text": "One engineering lesson became increasingly clear. Every abstraction hides complexity. That's its purpose. But hidden complexity also means hidden decisions. Consider this simplified comparison."
    },
    {
      "t": "diagram",
      "text": "Application\n↓\nFramework\n↓\nRouting\n↓\nAgent\n↓\nResponse"
    },
    {
      "t": "p",
      "text": "The framework decides how several pieces interact. That's incredibly convenient. Until you need one of those decisions to behave differently."
    },
    {
      "t": "h3",
      "text": "We Needed Deterministic Routing"
    },
    {
      "t": "p",
      "text": "One requirement influenced almost every architectural decision. The Overseer—not the framework—should decide exactly which agents participate in every workflow. For example:"
    },
    {
      "t": "diagram",
      "text": "User Request\n↓\nOverseer\n├── Member Report\n│      │\n│      ├── Analyst\n│      ├── Care\n│      └── Communications\n└── Newsletter\n       │\n       └── Communications"
    },
    {
      "t": "p",
      "text": "Routing wasn't something we wanted inferred. It was business logic. That meant we wanted complete ownership over it."
    },
    {
      "t": "h3",
      "text": "Hidden Behaviour Becomes Operational Risk"
    },
    {
      "t": "p",
      "text": "Another lesson appeared once we started debugging production workflows. Suppose an execution behaves unexpectedly. Where do you investigate? Inside your code? Inside the framework? Inside callbacks? Inside middleware? Inside internal execution chains?"
    },
    {
      "t": "p",
      "text": "Every additional abstraction layer becomes another place where behaviour can hide. That doesn't mean abstractions are bad. It simply changes the debugging experience. For PHHM, we wanted every routing decision to be visible inside our own codebase."
    },
    {
      "t": "h3",
      "text": "We Wanted Explicit State Management"
    },
    {
      "t": "p",
      "text": "Earlier in this series, we explored workflow state. That requirement also influenced our architecture. Instead of allowing conversational state to evolve implicitly, PHHM manages it explicitly."
    },
    {
      "t": "diagram",
      "text": "Workflow State\n↓\nOrchestrator\n↓\nAgent Context\n↓\nValidation\n↓\nUpdated State"
    },
    {
      "t": "p",
      "text": "Every transition is intentional. Every update is observable. Every change is versionable. That level of explicit control became much easier once orchestration belonged to the platform."
    },
    {
      "t": "h3",
      "text": "YAML Became the Source of Truth"
    },
    {
      "t": "p",
      "text": "Another requirement gradually emerged. Non-technical administrators needed to adjust agent behaviour without modifying Python code. Instead of hardcoding orchestration rules, we moved configuration into YAML. For example:"
    },
    {
      "t": "code",
      "text": "analyst:\n  enabled: true\n  model: gpt-4.1\n  prompt_version: \"2.5.0\"\n\ncare:\n  enabled: true\n  depends_on:\n    - analyst"
    },
    {
      "t": "p",
      "text": "The orchestrator interprets configuration. It doesn't contain business logic. That separation made deployments significantly easier to reason about."
    },
    {
      "t": "h3",
      "text": "Observability Needed First-Class Support"
    },
    {
      "t": "p",
      "text": "One of the recurring themes throughout the PHHM series is observability. Every workflow records:"
    },
    {
      "t": "list",
      "items": [
        "execution ID",
        "prompt version",
        "configuration version",
        "routing decisions",
        "validation outcomes",
        "retry history",
        "token usage"
      ]
    },
    {
      "t": "p",
      "text": "Those weren't optional features. They were foundational requirements. Owning the orchestration layer meant we could make observability part of the architecture instead of integrating it later."
    },
    {
      "t": "h3",
      "text": "Predictability Beat Flexibility"
    },
    {
      "t": "p",
      "text": "One phrase appeared repeatedly during architecture reviews."
    },
    {
      "t": "pull",
      "text": "\"Can we predict exactly what this workflow will do?\""
    },
    {
      "t": "code",
      "text": "If the answer was:\n\n\"Usually.\""
    },
    {
      "t": "p",
      "text": "We weren't satisfied. Production platforms benefit from predictable execution. Deterministic routing. Explicit state transitions. Versioned configuration. Clear validation. Those characteristics made troubleshooting significantly easier."
    },
    {
      "t": "h3",
      "text": "Frameworks Solved Different Problems"
    },
    {
      "t": "p",
      "text": "Looking back, I don't think the frameworks failed us. I think they optimized for different goals. They excel at:"
    },
    {
      "t": "list",
      "items": [
        "rapid experimentation",
        "proof-of-concepts",
        "developer productivity",
        "reusable integrations",
        "flexible agent interactions"
      ]
    },
    {
      "t": "p",
      "text": "PHHM optimized for:"
    },
    {
      "t": "list",
      "items": [
        "deterministic execution",
        "operational visibility",
        "workflow ownership",
        "reproducibility",
        "long-term maintainability"
      ]
    },
    {
      "t": "p",
      "text": "Those aren't competing priorities. They're different engineering objectives."
    },
    {
      "t": "h3",
      "text": "The Decision Became Obvious"
    },
    {
      "t": "p",
      "text": "Eventually the architectural question became very simple. Do we want to own:"
    },
    {
      "t": "list",
      "items": [
        "routing?",
        "validation?",
        "workflow state?",
        "observability?",
        "deployment?",
        "versioning?"
      ]
    },
    {
      "t": "p",
      "text": "Or do we want those behaviours to emerge through another abstraction layer? For PHHM, those capabilities defined the platform. That made the answer surprisingly straightforward. We built our own orchestration layer—not because frameworks were insufficient, but because orchestration itself had become part of our product."
    },
    {
      "t": "h3",
      "text": "The Bigger Lesson"
    },
    {
      "t": "p",
      "text": "Looking back, one engineering principle explains the entire decision."
    },
    {
      "t": "pull",
      "text": "The closer a component is to your competitive advantage, the more carefully you should consider owning it."
    },
    {
      "t": "p",
      "text": "Authentication? Use proven libraries. HTTP serving? Use FastAPI. Database access? Use mature tooling. But orchestration was different. It embodied our business workflows, operational practices, and engineering philosophy."
    },
    {
      "t": "p",
      "text": "That made it worth owning."
    },
    {
      "t": "h3",
      "text": "What We Built Instead: A Lightweight Orchestration Layer We Fully Own"
    },
    {
      "t": "p",
      "text": "Choosing not to use an orchestration framework meant accepting a responsibility. We now owned orchestration. That sounds like a lot of work. In practice, it turned out to be surprisingly small. One lesson became obvious very quickly. We didn't need a large orchestration framework. We needed a small orchestration engine that solved **our** problems extremely well. Instead of adapting our workflows to match a framework..."
    },
    {
      "t": "p",
      "text": "...we built a framework around our workflows."
    },
    {
      "t": "h3",
      "text": "The Architecture Is Intentionally Simple"
    },
    {
      "t": "p",
      "text": "At a high level, PHHM consists of a small number of well-defined components."
    },
    {
      "t": "diagram",
      "text": "                Client\n                  │\n                  ▼\n             FastAPI API\n                  │\n                  ▼\n          Authentication\n                  │\n                  ▼\n        Overseer (Router)\n                  │\n      ├───────────┼────────────┐\n      ▼           ▼            ▼\n  Analyst      Care     Communications\n      │           │            │\n      └───────────┼────────────┘\n                  ▼\n            Validation Layer\n                  │\n                  ▼\n          Workflow State\n                  │\n                  ▼\n          Final Response"
    },
    {
      "t": "p",
      "text": "Notice what's missing. There isn't another orchestration framework sitting between the API and the business logic. The platform owns the workflow directly."
    },
    {
      "t": "h2",
      "text": "FastAPI Became the Control Plane"
    },
    {
      "t": "p",
      "text": "One misconception is that orchestration requires a dedicated orchestration framework. For PHHM, **FastAPI** already provided much of what we needed. It handled:"
    },
    {
      "t": "list",
      "items": [
        "HTTP endpoints",
        "dependency injection",
        "authentication",
        "request validation",
        "lifecycle management",
        "asynchronous execution"
      ]
    },
    {
      "t": "p",
      "text": "Instead of adding another abstraction layer, we simply built orchestration on top of those primitives. That kept the architecture remarkably easy to understand."
    },
    {
      "t": "h3",
      "text": "Asyncio Did the Heavy Lifting"
    },
    {
      "t": "p",
      "text": "Earlier in the series we discussed parallel execution. That capability came directly from Python's asynchronous programming model."
    },
    {
      "t": "code",
      "text": "tasks = [\n    analyst.run(context),\n    care.run(context),\n    communications.run(context),\n]\n\nresults = await asyncio.gather(*tasks)"
    },
    {
      "t": "p",
      "text": "There wasn't a complex orchestration engine deciding concurrency. Python already solved that problem elegantly. The orchestrator simply decided **what** should execute. asyncio decided **how** it executed. That separation kept responsibilities clear."
    },
    {
      "t": "h3",
      "text": "The Overseer Is Deliberately Small"
    },
    {
      "t": "p",
      "text": "One mistake we avoided was turning the Overseer into a giant decision engine. Its responsibilities remain intentionally limited."
    },
    {
      "t": "diagram",
      "text": "Receive Request\n↓\nIdentify Workflow\n↓\nLoad Configuration\n↓\nSelect Agents\n↓\nExecute Workflow\n↓\nValidate Output\n↓\nReturn Response"
    },
    {
      "t": "p",
      "text": "That's it. The Overseer coordinates. It doesn't perform business logic. Each specialist remains responsible for its own domain."
    },
    {
      "t": "h3",
      "text": "YAML Controls Behaviour"
    },
    {
      "t": "p",
      "text": "One of the biggest architectural wins was moving behaviour into configuration. Instead of editing Python every time an agent changed, we edited YAML. For example:"
    },
    {
      "t": "code",
      "text": "workflow:\n  member_report:\n\n    agents:\n      - analyst\n      - care\n      - communications\n\n    parallel:\n      - analyst\n      - care\n\n    validation: member_schema"
    },
    {
      "t": "p",
      "text": "The orchestrator interprets configuration. It doesn't contain workflow definitions. That distinction dramatically simplified maintenance."
    },
    {
      "t": "h3",
      "text": "Adding a New Agent Became Predictable"
    },
    {
      "t": "p",
      "text": "Because orchestration is configuration-driven, introducing a new specialist follows a consistent process."
    },
    {
      "t": "diagram",
      "text": "Create Agent\n↓\nDefine Prompt\n↓\nRegister YAML\n↓\nAdd Validation\n↓\nDeploy"
    },
    {
      "t": "p",
      "text": "No internal framework modifications. No orchestration rewrites. No hidden execution chains. Everything follows the same lifecycle."
    },
    {
      "t": "h3",
      "text": "Validation Lives Outside the Agents"
    },
    {
      "t": "p",
      "text": "Another architectural decision proved valuable. Agents never validate themselves. Instead, every response passes through a dedicated validation layer."
    },
    {
      "t": "diagram",
      "text": "Agent Output\n↓\nSchema Validation\n↓\nBusiness Validation\n↓\nWorkflow Continues"
    },
    {
      "t": "p",
      "text": "Keeping validation independent has several advantages. It makes validation reusable. It keeps prompts focused on reasoning. And it ensures every agent follows the same quality standards."
    },
    {
      "t": "h3",
      "text": "Observability Was Built In—Not Added Later"
    },
    {
      "t": "p",
      "text": "Earlier articles explored structured logging and distributed tracing. Owning orchestration made those features much easier to implement. Every workflow automatically records:"
    },
    {
      "t": "list",
      "items": [
        "execution ID",
        "correlation ID",
        "prompt version",
        "configuration version",
        "routing decisions",
        "execution times",
        "token usage",
        "validation results"
      ]
    },
    {
      "t": "p",
      "text": "Nothing special has to happen inside each agent. The orchestration layer captures those events automatically. That's a major advantage of owning the control plane."
    },
    {
      "t": "h3",
      "text": "Versioning Becomes Consistent"
    },
    {
      "t": "p",
      "text": "Another unexpected benefit emerged. Everything now follows the same versioning strategy."
    },
    {
      "t": "diagram",
      "text": "Application\n↓\nWorkflow\n↓\nConfiguration\n↓\nPrompt\n↓\nDeployment"
    },
    {
      "t": "p",
      "text": "Instead of tracking independent pieces manually, every execution captures a complete snapshot of the platform. Weeks later, we can reproduce exactly how a workflow behaved. That's invaluable during production investigations."
    },
    {
      "t": "h3",
      "text": "The Platform Became Easier to Reason About"
    },
    {
      "t": "p",
      "text": "Looking back, perhaps the biggest advantage wasn't flexibility. It was clarity. Every workflow answers the same questions."
    },
    {
      "t": "list",
      "items": [
        "Which configuration loaded?",
        "Which agents executed?",
        "Which validations ran?",
        "Which prompt versions were active?",
        "Which model generated each response?"
      ]
    },
    {
      "t": "p",
      "text": "Nothing is hidden behind internal abstractions. The platform explains itself. That dramatically reduced debugging time."
    },
    {
      "t": "h3",
      "text": "What We Didn't Build"
    },
    {
      "t": "p",
      "text": "This is just as important. We deliberately avoided building:"
    },
    {
      "t": "list",
      "items": [
        "a custom LLM framework",
        "a prompt templating engine",
        "an agent runtime",
        "a plugin ecosystem",
        "a workflow DSL",
        "a visual orchestration designer"
      ]
    },
    {
      "t": "p",
      "text": "Those are fascinating engineering problems. They just weren't our problems. PHHM exists to solve organizational workflows. Every line of orchestration code had to support that goal."
    },
    {
      "t": "h2",
      "text": "The Trade-Offs We Accepted"
    },
    {
      "t": "p",
      "text": "Building our own orchestration layer wasn't free. We gave up several conveniences. For example:"
    },
    {
      "t": "table",
      "headers": [
        "We Lost",
        "We Gained"
      ],
      "rows": [
        [
          "Faster prototyping",
          "Predictable execution"
        ],
        [
          "Framework integrations",
          "Complete workflow ownership"
        ],
        [
          "Generic abstractions",
          "Domain-specific simplicity"
        ],
        [
          "Automatic updates",
          "Stable architecture"
        ],
        [
          "Community extensions",
          "Full operational visibility"
        ]
      ]
    },
    {
      "t": "p",
      "text": "That's an intentional trade-off. Our priorities favored long-term operability over short-term convenience. Another team building a different product might reasonably choose the opposite."
    },
    {
      "t": "h3",
      "text": "The Biggest Lesson"
    },
    {
      "t": "p",
      "text": "Looking back, one engineering principle explains why this architecture has remained successful."
    },
    {
      "t": "pull",
      "text": "Own the layer where your product becomes unique."
    },
    {
      "t": "code",
      "text": "FastAPI isn't our differentiator."
    },
    {
      "t": "p",
      "text": "Python isn't our differentiator. OpenAI isn't our differentiator. The orchestration layer is where PHHM's business rules, workflows, validation, observability, and deployment strategy come together. That made it worth owning."
    },
    {
      "t": "h3",
      "text": "Final Thoughts"
    },
    {
      "t": "p",
      "text": "People sometimes ask whether I'd make the same decision today. Yes. Not because orchestration frameworks have stood still—they've improved tremendously. But because the question was never:"
    },
    {
      "t": "pull",
      "text": "\"Which framework is best?\""
    },
    {
      "t": "p",
      "text": "It was:"
    },
    {
      "t": "pull",
      "text": "\"Which parts of the platform should belong to us?\""
    },
    {
      "t": "p",
      "text": "For PHHM, the answer was always the orchestration layer. Owning that layer gave us deterministic routing, explicit workflow state, built-in observability, consistent validation, configuration-driven behaviour, and complete deployment control. Those capabilities shaped every other engineering decision in the platform. The result isn't a framework. It's something much simpler. A lightweight orchestration engine that exists solely to solve the problems PHHM actually has. And, in my experience, that's often the best kind of software."
    },
    {
      "t": "h3",
      "text": "Key Takeaways"
    },
    {
      "t": "code",
      "text": "If you're deciding whether to adopt an orchestration framework or build your own, I'd recommend asking these questions first:"
    },
    {
      "t": "list",
      "items": [
        "Is orchestration part of your competitive advantage?",
        "Do you need deterministic workflows or flexible experimentation?",
        "How important are observability and operational debugging?",
        "Will configuration change more frequently than code?",
        "Do you need complete ownership of routing, validation, and deployment?",
        "Can existing Python primitives like asyncio solve most of your orchestration needs?",
        "Are you solving a general orchestration problem or a domain-specific workflow problem?",
        "Does introducing another abstraction simplify your architecture—or make it harder to understand?"
      ]
    },
    {
      "t": "p",
      "text": "Choose the option that makes your production system easier to operate five years from now—not just easier to prototype this week."
    }
  ]
} as ArticleData;

export default function LangChainArticle() {
  return <ArticleShell article={article} />;
}
