"use client";

import ArticleShell, { type ArticleData } from "./ArticleShell";

const article = {
  "kicker": "PHHM Journal • Cost, Part 2 of 2",
  "focus": "Cost • Optimize",
  "icon": "wallet",
  "title": "The Cost of Production AI: How We Engineered PHHM to Scale Without Exploding Our LLM Bill",
  "subtitle": "Prompt compression, intelligent routing, caching, parallel execution, and workflow-level cost engineering that made the platform economically sustainable. Second of a two-part cost series: Part 1 covers measurement; this article covers optimization.",
  "readTime": "10 min",
  "blocks": [
    {
      "t": "pull",
      "text": "One of the biggest misconceptions about production AI is that your cloud bill is determined by model pricing. It isn't. Pricing matters. Architecture matters far more. Early in PHHM's development, we tracked token usage almost as an afterthought. The platform worked. Users were happy. Workflows completed reliably. Then we started looking at execution telemetry. Two workflows serving similar user requests consumed dramatically different numbers of tokens. Some specialist agents consistently generated far more text than they actually needed. The same context was being transmitted repeatedly between agents. Identical requests triggered identical model calls. Nothing was technically broken. The platform was simply doing far more work than necessary. That realization completely changed how we approached AI cost."
    },
    {
      "t": "h3",
      "text": "Instead of asking:"
    },
    {
      "t": "pull",
      "text": "\"Which model should we switch to?\" We started asking: \"Why is the platform spending these tokens in the first place?\" That single question led to architectural changes that reduced operational cost without sacrificing workflow quality. More importantly, it changed how we think about AI economics. Today, cost isn't something we review at the end of the month. It's another engineering signal—just like latency, reliability, and validation failures."
    },
    {
      "t": "h3",
      "text": "Cost Doesn't Come From One Place"
    },
    {
      "t": "pull",
      "text": "One mistake we made early was treating every AI request as though it had roughly the same cost. Production quickly proved otherwise. A simple welcome workflow might invoke two lightweight agents. A care-planning workflow could involve:"
    },
    {
      "t": "list",
      "items": [
        "the Overseer ",
        "the Analyst ",
        "the Care Agent ",
        "validation ",
        "downstream communications "
      ]
    },
    {
      "t": "pull",
      "text": "Each additional step consumed more:"
    },
    {
      "t": "list",
      "items": [
        "prompt tokens ",
        "completion tokens ",
        "orchestration overhead ",
        "validation time "
      ]
    },
    {
      "t": "pull",
      "text": "By the time a workflow finished, the total cost reflected dozens of architectural decisions—not just one API call."
    },
    {
      "t": "h3",
      "text": "Every Workflow Has Its Own Economics"
    },
    {
      "t": "pull",
      "text": "Eventually, every execution produced a detailed cost profile."
    },
    {
      "t": "h3",
      "text": "Care Planning Workflow"
    },
    {
      "t": "h3",
      "text": "│"
    },
    {
      "t": "h3",
      "text": "▼"
    },
    {
      "t": "diagram",
      "text": "Overseer .............. 280 tokens\nAnalyst ............. 1,520 tokens\nCare ................. 940 tokens\nValidation ............ 90 tokens\nCommunications ....... 610 tokens\n──────────────────────────────\nTotal .............. 3,440 tokens"
    },
    {
      "t": "pull",
      "text": "Looking at costs this way immediately changed the conversation. Instead of debating model prices, we could identify which parts of the workflow were genuinely expensive. That's where meaningful optimisation begins."
    },
    {
      "t": "h3",
      "text": "Cost Is an Architectural Property"
    },
    {
      "t": "pull",
      "text": "By the end of the project, one engineering principle guided almost every optimisation. AI costs are an emergent property of architecture. The model only generates tokens. The platform decides:"
    },
    {
      "t": "list",
      "items": [
        "how many agents execute ",
        "how much context each receives ",
        "whether work is repeated ",
        "whether retries occur ",
        "whether responses are cached ",
        "which model performs each task "
      ]
    },
    {
      "t": "pull",
      "text": "Those decisions determine the majority of operational cost. The rest of the article explores the architectural changes that had the greatest impact."
    },
    {
      "t": "h2",
      "text": "Optimisation #1: Prompt Compression — Removing Words That Didn't Add Value"
    },
    {
      "t": "p",
      "text": "The first optimization didn't involve changing models. It didn't involve changing providers. It didn't even involve changing our architecture. We started by questioning something we'd never measured before."
    },
    {
      "t": "pull",
      "text": "How much of every prompt was actually useful?"
    },
    {
      "t": "p",
      "text": "As PHHM evolved, prompts naturally became longer. Every new feature added another instruction. Another edge case. Another formatting rule. Another example. Another reminder. Individually, none of these additions seemed significant. Collectively, they became one of the largest contributors to token usage."
    },
    {
      "t": "h3",
      "text": "Prompts Naturally Accumulate Technical Debt"
    },
    {
      "t": "p",
      "text": "Prompt growth happens gradually. Version 1 might look like this."
    },
    {
      "t": "diagram",
      "text": "System Role\n↓\nInstructions\n↓\nUser Input"
    },
    {
      "t": "p",
      "text": "Six months later, the same prompt often looks more like this."
    },
    {
      "t": "diagram",
      "text": "System Role\n↓\nFormatting Rules\n↓\nBusiness Rules\n↓\nEdge Cases\n↓\nExamples\n↓\nReminders\n↓\nHistorical Notes\n↓\nUser Input"
    },
    {
      "t": "p",
      "text": "Every section was added for a good reason. Very few were ever removed."
    },
    {
      "t": "h3",
      "text": "We Started Measuring Prompt Efficiency"
    },
    {
      "t": "p",
      "text": "Instead of asking whether a prompt was \"good,\" we asked better engineering questions."
    },
    {
      "t": "list",
      "items": [
        "Which instructions are never exercised?",
        "Which examples no longer improve outputs?",
        "Which constraints duplicate validation rules?",
        "Which formatting instructions belong in code instead?",
        "Which context can be supplied dynamically?"
      ]
    },
    {
      "t": "p",
      "text": "Those questions revealed something surprising. Many prompts contained instructions that had become obsolete as the platform evolved."
    },
    {
      "t": "h3",
      "text": "Every Word Has a Cost"
    },
    {
      "t": "p",
      "text": "One mindset shift changed how we wrote prompts. Every token has three costs."
    },
    {
      "t": "list",
      "items": [
        "It increases API usage.",
        "It increases latency.",
        "It increases cognitive load for the model."
      ]
    },
    {
      "t": "p",
      "text": "More instructions don't automatically produce better reasoning. Sometimes they simply produce more noise."
    },
    {
      "t": "h3",
      "text": "Shorter Prompts Often Performed Better"
    },
    {
      "t": "p",
      "text": "This was one of the most surprising discoveries. Several prompts actually improved after becoming shorter. Why? Because removing irrelevant instructions made the core objective clearer. Instead of telling the model everything it should avoid... ...we focused on what it needed to accomplish. Less ambiguity. Less distraction."
    },
    {
      "t": "p",
      "text": "Better outputs. Lower cost."
    },
    {
      "t": "h3",
      "text": "Static Instructions Moved into Software"
    },
    {
      "t": "p",
      "text": "Another optimization came from asking a simple question."
    },
    {
      "t": "pull",
      "text": "\"Does the model actually need to know this?\""
    },
    {
      "t": "p",
      "text": "Many prompt instructions described deterministic behaviour. For example:"
    },
    {
      "t": "list",
      "items": [
        "output valid JSON",
        "include required fields",
        "reject invalid values",
        "follow schema"
      ]
    },
    {
      "t": "p",
      "text": "Those aren't reasoning tasks. They're validation tasks. Instead of reminding the model repeatedly, we enforced those rules after generation."
    },
    {
      "t": "diagram",
      "text": "Model Output\n↓\nSchema Validation\n↓\nBusiness Validation\n↓\nAccepted Response"
    },
    {
      "t": "p",
      "text": "The prompt became smaller. The validation became stronger. Both improved simultaneously."
    },
    {
      "t": "h3",
      "text": "Examples Were Treated Like Code"
    },
    {
      "t": "p",
      "text": "Few things increase prompt size faster than examples. They're valuable. They're also expensive. Rather than continuously adding examples, we reviewed them like production code. Every example had to justify its existence. If removing one didn't reduce output quality, it stayed out. The result wasn't fewer examples. It was **better** examples."
    },
    {
      "t": "h3",
      "text": "Dynamic Context Replaced Static Context"
    },
    {
      "t": "p",
      "text": "Another common source of prompt bloat was static information. Early versions included large sections describing workflows that rarely changed. Eventually we replaced those with dynamic context. Base Prompt + Workflow Context + User Request"
    },
    {
      "t": "p",
      "text": "Each agent received only the information relevant to its current task. The prompt stayed compact. The context stayed relevant."
    },
    {
      "t": "h2",
      "text": "Optimisation #2: Cache Work That Doesn't Change"
    },
    {
      "t": "p",
      "text": "The second major improvement had almost nothing to do with AI. It was a classic software engineering technique. Caching. One pattern appeared repeatedly in our telemetry. The platform kept asking the same questions. Generate this member summary. Summarize this profile. Analyse this document."
    },
    {
      "t": "p",
      "text": "Nothing had changed. Yet we were paying for another model invocation every time."
    },
    {
      "t": "h3",
      "text": "The Orchestrator Became the Cache Manager"
    },
    {
      "t": "p",
      "text": "Instead of allowing every agent to call a model independently, the orchestrator checked whether an existing result could be reused."
    },
    {
      "t": "diagram",
      "text": "Workflow Request\n↓\nCache Lookup\n├── Cache Hit\n│      │\n│      ▼\n│ Reuse Response\n│\n└── Cache Miss\n       │\n       ▼\n   Call Model\n       │\n       ▼\n   Store Result"
    },
    {
      "t": "p",
      "text": "This kept caching completely transparent to individual agents. Specialists focused on reasoning. The orchestrator handled efficiency."
    },
    {
      "t": "h3",
      "text": "Cache Stable Knowledge, Not Conversations"
    },
    {
      "t": "p",
      "text": "One lesson became clear very quickly. Not everything should be cached. We avoided caching:"
    },
    {
      "t": "list",
      "items": [
        "active conversations",
        "evolving workflow state",
        "personalised recommendations",
        "time-sensitive decisions"
      ]
    },
    {
      "t": "p",
      "text": "Those depend on fresh context. Instead, we cached information that changes infrequently. For example:"
    },
    {
      "t": "list",
      "items": [
        "member profile summaries",
        "analysed documents",
        "organisation metadata",
        "workflow templates",
        "reusable reference material"
      ]
    },
    {
      "t": "p",
      "text": "The result was a high cache hit rate without sacrificing accuracy."
    },
    {
      "t": "h3",
      "text": "Cache Invalidation Matters"
    },
    {
      "t": "p",
      "text": "Caching introduces its own engineering challenges. The hardest question isn't:"
    },
    {
      "t": "pull",
      "text": "\"When should we cache?\""
    },
    {
      "t": "code",
      "text": "It's:"
    },
    {
      "t": "pull",
      "text": "\"When should we stop trusting the cache?\""
    },
    {
      "t": "p",
      "text": "Every cached artifact includes clear invalidation rules."
    },
    {
      "t": "diagram",
      "text": "Profile Updated\n↓\nCache Invalidated\n↓\nNext Request\n↓\nFresh AI Generation"
    },
    {
      "t": "p",
      "text": "Freshness always takes priority over savings. A stale recommendation costs far more than another API call."
    },
    {
      "t": "h3",
      "text": "The Results Were Larger Than Expected"
    },
    {
      "t": "p",
      "text": "Prompt compression reduced the number of tokens sent to the model. Caching reduced the number of model calls altogether. Together they changed the economics of the platform. Not by making the AI less capable. By ensuring we only paid for work that genuinely needed to happen."
    },
    {
      "t": "h3",
      "text": "The Bigger Lesson"
    },
    {
      "t": "p",
      "text": "Looking back, the biggest savings didn't come from clever prompt engineering. They came from applying decades of software engineering principles to AI systems. Remove duplication. Reduce unnecessary work. Cache expensive operations. Keep responsibilities separate. Those ideas existed long before large language models. They remain just as valuable today."
    },
    {
      "t": "h2",
      "text": "Optimisation #3: The Right Model for the Right Job"
    },
    {
      "t": "p",
      "text": "Early in development, we made a very common mistake. Every agent used exactly the same language model. It simplified configuration. It simplified deployment. It also meant we were paying premium prices for tasks that didn't require premium reasoning. The Welcome Agent doesn't solve complex analytical problems. The Communications Agent often formats existing information. The Overseer primarily routes workflows."
    },
    {
      "t": "p",
      "text": "Treating every task as equally difficult was convenient. It wasn't economical."
    },
    {
      "t": "h3",
      "text": "Intelligence Should Match Complexity"
    },
    {
      "t": "p",
      "text": "Eventually, model selection became another orchestration responsibility. Instead of allowing every specialist to choose independently, the Overseer selected the most appropriate model for each task."
    },
    {
      "t": "diagram",
      "text": "Workflow\n↓\nOverseer\n├── Welcome → Lightweight Model\n├── Communications → Standard Model\n├── Analyst → Advanced Model\n└── Care → Advanced Model"
    },
    {
      "t": "p",
      "text": "The agents never needed to know which provider or model they were using. They simply requested reasoning. The orchestration layer supplied the most appropriate capability."
    },
    {
      "t": "h3",
      "text": "Not Every Problem Needs Maximum Intelligence"
    },
    {
      "t": "p",
      "text": "One framework guided our routing decisions."
    },
    {
      "t": "table",
      "headers": [
        "Task",
        "Model Strategy"
      ],
      "rows": [
        [
          "Classification",
          "Lightweight model"
        ],
        [
          "Workflow routing",
          "Lightweight model"
        ],
        [
          "Formatting",
          "Lightweight model"
        ],
        [
          "Summarisation",
          "Standard model"
        ],
        [
          "Member analysis",
          "Advanced model"
        ],
        [
          "Care recommendations",
          "Advanced model"
        ]
      ]
    },
    {
      "t": "p",
      "text": "Notice the pattern. We reserved our most capable—and most expensive—models for the work that genuinely benefited from deeper reasoning. Everything else used simpler alternatives without affecting user experience."
    },
    {
      "t": "h2",
      "text": "Optimisation #4: Parallel Execution Reduced Waiting—Not Quality"
    },
    {
      "t": "p",
      "text": "Earlier in this engineering series, we explored how asynchronous execution improved workflow performance. It also influenced cost. Not by reducing token usage. By reducing idle time. Originally, many workflows executed sequentially."
    },
    {
      "t": "diagram",
      "text": "Overseer\n↓\nAnalyst\n↓\nCare\n↓\nCommunications"
    },
    {
      "t": "p",
      "text": "Each agent waited for the previous one to finish. As workflows grew, those delays became increasingly noticeable."
    },
    {
      "t": "h3",
      "text": "Independent Work Should Execute Together"
    },
    {
      "t": "p",
      "text": "Many specialists don't depend on one another. Once we recognized those boundaries, the orchestrator began executing them concurrently."
    },
    {
      "t": "diagram",
      "text": "Overseer\n        │\n ├──────────────┬──────────────┐\n ▼              ▼              ▼"
    },
    {
      "t": "p",
      "text": "Analyst Care Communications The number of model calls stayed the same. The total execution time dropped significantly. That improved both user experience and infrastructure efficiency."
    },
    {
      "t": "h3",
      "text": "Faster Workflows Reduce Hidden Costs"
    },
    {
      "t": "p",
      "text": "Parallel execution doesn't reduce token consumption directly. It reduces another important cost. Time. Shorter workflows mean:"
    },
    {
      "t": "list",
      "items": [
        "fewer concurrent requests waiting in queues",
        "lower infrastructure utilisation",
        "improved throughput",
        "better user responsiveness"
      ]
    },
    {
      "t": "p",
      "text": "Cost engineering isn't only about API pricing. It's about overall operational efficiency."
    },
    {
      "t": "h2",
      "text": "Building Cost Observability"
    },
    {
      "t": "p",
      "text": "Optimisation only works when engineers can see what's happening. That's why cost became another first-class metric inside PHHM. Every workflow automatically records:"
    },
    {
      "t": "list",
      "items": [
        "total tokens",
        "input tokens",
        "output tokens",
        "estimated execution cost",
        "model used",
        "execution duration",
        "cache hits",
        "retry count"
      ]
    },
    {
      "t": "p",
      "text": "Instead of guessing where money was being spent, we could see it."
    },
    {
      "t": "h3",
      "text": "Every Workflow Has a Financial Profile"
    },
    {
      "t": "p",
      "text": "Our internal dashboards evolved beyond simple token counts. Each workflow produced an operational summary."
    },
    {
      "t": "diagram",
      "text": "Workflow\n↓\nExecution Time\n↓\nToken Usage\n↓\nModel Selection\n↓\nCache Status\n↓\nEstimated Cost"
    },
    {
      "t": "p",
      "text": "One execution tells a useful story. Thousands reveal architectural trends."
    },
    {
      "t": "h3",
      "text": "Looking Beyond Individual Users"
    },
    {
      "t": "p",
      "text": "As adoption increased, another perspective became valuable. Instead of asking:"
    },
    {
      "t": "pull",
      "text": "\"How much did this request cost?\""
    },
    {
      "t": "p",
      "text": "We started asking:"
    },
    {
      "t": "list",
      "items": [
        "What does this workflow cost?",
        "What does an average user cost?",
        "What does each organisation consume?",
        "Which features generate the highest operational expense?"
      ]
    },
    {
      "t": "p",
      "text": "That changed optimisation discussions completely. Architecture decisions became data-driven instead of intuitive."
    },
    {
      "t": "h3",
      "text": "The Dashboard That Changed Our Thinking"
    },
    {
      "t": "p",
      "text": "Eventually, every deployment review included the same operational dashboard."
    },
    {
      "t": "table",
      "headers": [
        "Metric",
        "Why It Matters"
      ],
      "rows": [
        [
          "Cost per workflow",
          "Identifies expensive execution paths"
        ],
        [
          "Cost per user",
          "Tracks usage efficiency"
        ],
        [
          "Cost per organisation",
          "Supports capacity planning"
        ],
        [
          "Tokens per agent",
          "Highlights optimisation opportunities"
        ],
        [
          "Cache hit rate",
          "Measures avoided model calls"
        ],
        [
          "Retry rate",
          "Reveals hidden cost multipliers"
        ],
        [
          "Average latency",
          "Balances performance against efficiency"
        ]
      ]
    },
    {
      "t": "p",
      "text": "No single metric tells the whole story. Together they describe the economic health of the platform."
    },
    {
      "t": "h3",
      "text": "Cost Became an Engineering Signal"
    },
    {
      "t": "p",
      "text": "Perhaps the biggest mindset shift was this. We stopped treating cost as something the finance team monitored. Instead, engineers reviewed cost alongside:"
    },
    {
      "t": "list",
      "items": [
        "latency",
        "reliability",
        "validation failures",
        "deployment success",
        "workflow completion"
      ]
    },
    {
      "t": "p",
      "text": "Unexpected cost increases often indicated architectural inefficiencies long before users noticed any impact. In that sense, cost became another form of observability."
    },
    {
      "t": "h3",
      "text": "The Architecture We Ended Up With"
    },
    {
      "t": "p",
      "text": "By the end of the project, cost optimisation wasn't a separate activity. It was embedded throughout the platform."
    },
    {
      "t": "diagram",
      "text": "                 User Request\n                      │\n                      ▼\n                Orchestrator\n                      │\n     ├───────────────┼───────────────┐\n     ▼               ▼               ▼\nContext Builder  Cache Layer   Model Router\n     │               │               │\n     └───────────────┼───────────────┘\n                     ▼\n            Specialist AI Agents\n                     │\n                     ▼\n           Validation & Monitoring\n                     │\n                     ▼\n              Cost Dashboard\n                     │\n                     ▼\n              Final Response"
    },
    {
      "t": "p",
      "text": "Cost wasn't optimized at the end. It was considered at every stage of execution."
    },
    {
      "t": "h3",
      "text": "The Five Principles of Cost Engineering"
    },
    {
      "t": "p",
      "text": "If I were designing another production AI platform tomorrow, these are the principles I'd adopt from day one."
    },
    {
      "t": "pull",
      "text": "1. Measure workflows—not requests"
    },
    {
      "t": "p",
      "text": "Users experience complete workflows. That's where meaningful optimisation begins."
    },
    {
      "t": "pull",
      "text": "2. Remove unnecessary work before changing models"
    },
    {
      "t": "p",
      "text": "The largest savings usually come from eliminating redundant computation—not replacing providers."
    },
    {
      "t": "pull",
      "text": "3. Match model capability to task complexity"
    },
    {
      "t": "p",
      "text": "Reserve advanced reasoning for problems that genuinely require it."
    },
    {
      "t": "pull",
      "text": "4. Make caching part of orchestration"
    },
    {
      "t": "p",
      "text": "Repeated work is one of the easiest sources of avoidable AI spend. The orchestrator is the ideal place to eliminate it."
    },
    {
      "t": "pull",
      "text": "5. Treat cost as operational telemetry"
    },
    {
      "t": "p",
      "text": "Unexpected spending often reveals architectural inefficiencies before other monitoring systems do."
    },
    {
      "t": "h3",
      "text": "Final Thoughts"
    },
    {
      "t": "p",
      "text": "When people ask how to reduce the cost of production AI, they often expect recommendations about model pricing. That's certainly one lever. It just wasn't the most important one for PHHM. The biggest improvements came from changing the architecture around the model. We compressed prompts so the model received only what it needed. We cached stable results instead of regenerating them. We matched models to the complexity of the task. We executed independent work in parallel."
    },
    {
      "t": "p",
      "text": "We measured every workflow instead of estimating monthly spend. None of those changes reduced the platform's capabilities. They simply removed unnecessary work. That's why I now think about AI costs the same way I think about latency or reliability. They're not finance metrics. They're engineering metrics. When your architecture is efficient, lower costs become a natural consequence—not the primary objective."
    },
    {
      "t": "h3",
      "text": "Key Takeaways"
    },
    {
      "t": "code",
      "text": "If you're building production AI systems, I'd recommend adopting these practices from the beginning:"
    },
    {
      "t": "list",
      "items": [
        "Measure cost at the workflow level rather than per API request.",
        "Continuously review prompts and remove instructions that no longer add value.",
        "Move deterministic rules into validation code instead of repeating them in prompts.",
        "Cache stable AI outputs wherever freshness isn't critical.",
        "Route tasks to models based on reasoning complexity.",
        "Execute independent agents concurrently to improve throughput.",
        "Track token usage, cache hits, retries, and latency together.",
        "Build dashboards that explain *why* costs change, not just *how much* they changed.",
        "Treat cost as another form of engineering observability.",
        "Design systems that spend tokens intentionally rather than automatically."
      ]
    }
  ]
} as ArticleData;

export default function CostOptimizationArticle() {
  return <ArticleShell article={article} />;
}
