"use client";

import ArticleShell, { type ArticleData } from "./ArticleShell";

const article = {
  "kicker": "PHHM Journal • State",
  "focus": "State",
  "icon": "database",
  "title": "State Management for Multi-Agent AI Systems: What Lives in Memory, What Lives in Storage",
  "subtitle": "How we designed PHHM so six AI agents could collaborate without corrupting each other's context.",
  "readTime": "14 min",
  "blocks": [
    {
      "t": "p",
      "text": "One of the biggest misconceptions in AI development is that context and state are the same thing. They aren't. In fact, confusing the two is one of the fastest ways to build unreliable multi-agent systems. Many AI applications simply keep appending messages to an ever-growing conversation. The longer the conversation becomes:"
    },
    {
      "t": "list",
      "items": [
        "the slower the model gets",
        "the more expensive requests become",
        "the harder prompts become to reason about",
        "the easier it is for unrelated context to influence new decisions"
      ]
    },
    {
      "t": "p",
      "text": "Eventually every agent knows everything. Ironically... That's exactly the problem. While building PHHM we discovered something surprising. The hardest question wasn't:"
    },
    {
      "t": "pull",
      "text": "\"How do agents communicate?\""
    },
    {
      "t": "p",
      "text": "It was:"
    },
    {
      "t": "pull",
      "text": "\"What information should they never share?\""
    },
    {
      "t": "p",
      "text": "The answer completely changed how we designed our orchestration layer."
    },
    {
      "t": "h3",
      "text": "Section 1"
    },
    {
      "t": "h2",
      "text": "Context Isn't State"
    },
    {
      "t": "p",
      "text": "These two words get used interchangeably. They shouldn't. Here's how we define them."
    },
    {
      "t": "h3",
      "text": "Context"
    },
    {
      "t": "p",
      "text": "Information an agent needs to complete one task. Temporary. Disposable. Usually lives inside the prompt. Examples:"
    },
    {
      "t": "list",
      "items": [
        "user question",
        "recent conversation",
        "uploaded document",
        "previous response"
      ]
    },
    {
      "t": "h3",
      "text": "State"
    },
    {
      "t": "p",
      "text": "Information the platform needs after the task finishes. Persistent. Shared. Owned by the orchestration layer. Examples:"
    },
    {
      "t": "list",
      "items": [
        "workflow progress",
        "member record",
        "validation status",
        "completed tasks",
        "execution metadata"
      ]
    },
    {
      "t": "p",
      "text": "That distinction changed everything."
    },
    {
      "t": "h3",
      "text": "A Mental Model"
    },
    {
      "t": "p",
      "text": "Think of a hospital. A doctor reads today's notes before seeing a patient. That's context. The patient's medical record survives after the appointment. That's state. The doctor doesn't own the record. The hospital does. PHHM follows exactly the same principle."
    },
    {
      "t": "p",
      "text": "Agents consume context. The orchestrator owns state."
    },
    {
      "t": "h2",
      "text": "The Hidden Cost of Shared Memory"
    },
    {
      "t": "p",
      "text": "Early prototypes stored almost everything in one shared object."
    },
    {
      "t": "code",
      "text": "memory = {\n    \"messages\": [...],\n    \"analysis\": ...,\n    \"care\": ...,\n    \"newsletter\": ...,\n    \"devotional\": ...\n}"
    },
    {
      "t": "p",
      "text": "Convenient? Absolutely. Scalable? Not even close. Every agent could see everything. Soon prompts contained:"
    },
    {
      "t": "list",
      "items": [
        "onboarding history",
        "care plans",
        "newsletter drafts",
        "analysis reports",
        "unrelated conversations"
      ]
    },
    {
      "t": "p",
      "text": "Agents became slower. Token costs increased. Unexpected reasoning appeared. The more context we shared... The worse the system became."
    },
    {
      "t": "h3",
      "text": "Bigger Context Isn't Better Context"
    },
    {
      "t": "p",
      "text": "One myth keeps appearing in AI discussions."
    },
    {
      "t": "pull",
      "text": "\"Just give the model more context.\""
    },
    {
      "t": "p",
      "text": "More context often means:"
    },
    {
      "t": "list",
      "items": [
        "more irrelevant information",
        "more distractions",
        "higher token costs",
        "longer latency"
      ]
    },
    {
      "t": "p",
      "text": "The better question is:"
    },
    {
      "t": "pull",
      "text": "\"What's the smallest amount of information this agent actually needs?\""
    },
    {
      "t": "p",
      "text": "That's what PHHM optimizes for. Not maximum context. Minimum useful context."
    },
    {
      "t": "h3",
      "text": "The Principle That Changed Everything"
    },
    {
      "t": "p",
      "text": "One rule became our north star."
    },
    {
      "t": "pull",
      "text": "Agents should know only what they need to complete their current task."
    },
    {
      "t": "p",
      "text": "Nothing more. Nothing less. That sounds obvious. It turns out to be surprisingly difficult to maintain."
    },
    {
      "t": "h2",
      "text": "State Ownership"
    },
    {
      "t": "p",
      "text": "Another mistake we made early was allowing agents to \"own\" information. For example:"
    },
    {
      "t": "diagram",
      "text": "Analyst\n↓\nStores recommendations\n↓\nCare reads directly\n↓\nCommunications reads Care"
    },
    {
      "t": "p",
      "text": "Now every agent depends on another. Change one. Risk breaking three. Instead, ownership moved to the orchestration layer."
    },
    {
      "t": "diagram",
      "text": "           Overseer\n                │\n      ┌─────────┼─────────┐\n      ▼         ▼         ▼\n  Analyst     Care   Communications\n      │         │         │\n      └─────────┼─────────┘\n                │\n                ▼\n          Workflow State"
    },
    {
      "t": "p",
      "text": "No agent owns workflow data. The orchestrator does."
    },
    {
      "t": "h2",
      "text": "The Workflow State Object"
    },
    {
      "t": "p",
      "text": "Rather than passing huge conversations around, PHHM maintains a structured workflow state."
    },
    {
      "t": "code",
      "text": "workflow_state = {\n\n    \"member\": {},\n\n    \"analysis\": None,\n\n    \"care_plan\": None,\n\n    \"communications\": None,\n\n    \"completed_steps\": [],\n\n    \"metadata\": {}\n\n}"
    },
    {
      "t": "p",
      "text": "Every agent receives only the slice it needs. The Analyst doesn't care about newsletters. The Communications Agent doesn't need raw analysis notes. Each specialist sees only the information relevant to its responsibility."
    },
    {
      "t": "h3",
      "text": "Why This Matters"
    },
    {
      "t": "p",
      "text": "Reducing shared state had unexpected benefits."
    },
    {
      "t": "list",
      "items": [
        "Lower token usage",
        "Faster execution",
        "Fewer hallucinations",
        "Simpler prompts",
        "Easier debugging"
      ]
    },
    {
      "t": "p",
      "text": "Most importantly... Agents stopped influencing each other in unpredictable ways."
    },
    {
      "t": "h3",
      "text": "Designing a Workflow State Object"
    },
    {
      "t": "p",
      "text": "Once we stopped treating context as shared memory, another question emerged."
    },
    {
      "t": "pull",
      "text": "Where should long-lived information actually live?"
    },
    {
      "t": "p",
      "text": "The answer wasn't inside any individual agent. It belonged to the workflow itself. Instead of every agent maintaining its own memory, PHHM maintains a single workflow state that acts as the source of truth throughout execution. Think of it as a document that every specialist can contribute to—but nobody owns."
    },
    {
      "t": "h3",
      "text": "The Overseer Owns State"
    },
    {
      "t": "p",
      "text": "One architectural rule simplified almost every workflow."
    },
    {
      "t": "pull",
      "text": "Agents produce information. The Overseer owns information."
    },
    {
      "t": "p",
      "text": "That distinction is subtle, but incredibly important. The Analyst doesn't own the analysis. It generates it. The Care Agent doesn't own the care plan. It proposes it. The Communications Agent doesn't own the email. It drafts it. Once an agent finishes its task, the output is handed back to the Overseer, validated, and committed to the workflow state."
    },
    {
      "t": "p",
      "text": "Ownership never leaves the orchestration layer."
    },
    {
      "t": "h3",
      "text": "Designing the State Object"
    },
    {
      "t": "p",
      "text": "Rather than passing entire conversations between agents, PHHM uses a structured state object. A simplified version looks like this:"
    },
    {
      "t": "code",
      "text": "from dataclasses import dataclass, field\n\n@dataclass\nclass WorkflowState:\n\n    member: dict\n\n    analysis: dict | None = None\n\n    care_plan: dict | None = None\n\n    communication: dict | None = None\n\n    completed_steps: list[str] = field(default_factory=list)\n\n    metadata: dict = field(default_factory=dict)"
    },
    {
      "t": "p",
      "text": "Every workflow starts with the same structure. As agents complete work, they enrich the state instead of replacing it. That makes the flow predictable and easy to inspect."
    },
    {
      "t": "h3",
      "text": "State Evolves Incrementally"
    },
    {
      "t": "p",
      "text": "Instead of creating entirely new objects, every completed step contributes one validated update. For example:"
    },
    {
      "t": "diagram",
      "text": "Workflow Started\n↓\nMember Loaded\n↓\nAnalysis Added\n↓\nCare Plan Added\n↓\nCommunication Added\n↓\nWorkflow Complete"
    },
    {
      "t": "p",
      "text": "Every transition is intentional. Every change is traceable. That makes debugging dramatically easier."
    },
    {
      "t": "h3",
      "text": "Immutable Thinking"
    },
    {
      "t": "p",
      "text": "One lesson borrowed from functional programming improved reliability more than we expected. Whenever possible, agents should **return new data instead of mutating existing data**. Instead of this: workflow_state[\"analysis\"] = analysis workflow_state[\"status\"] = \"complete\" Think in terms of:"
    },
    {
      "t": "code",
      "text": "updated_state = {\n    workflow_state,\n    \"analysis\": analysis\n}"
    },
    {
      "t": "p",
      "text": "Or, using immutable data structures, create a new state object from the previous one. Why? Because immutable thinking makes workflows predictable. You always know what changed. And more importantly... You know what didn't."
    },
    {
      "t": "h3",
      "text": "Why Mutability Becomes Dangerous"
    },
    {
      "t": "p",
      "text": "Imagine two agents running in parallel. Both receive the same state object. Both modify it. Which version wins? Without careful synchronization, you've introduced race conditions."
    },
    {
      "t": "diagram",
      "text": "        Shared State\n             │\n     ┌───────┴────────┐\n     ▼                ▼\n Analyst          Communications\n     │                │\n     └───────┬────────┘\n             ▼\n       Conflicting Updates"
    },
    {
      "t": "p",
      "text": "Instead, each agent should return its own result. The Overseer becomes the only component allowed to merge changes. That eliminates an entire class of concurrency bugs."
    },
    {
      "t": "h3",
      "text": "State Should Be Explicit"
    },
    {
      "t": "p",
      "text": "One anti-pattern we encountered early was hiding state inside prompts. For example: Remember that the member requested a follow-up next week... The prompt now contains business state. That's fragile. Instead, prompts should receive structured inputs."
    },
    {
      "t": "code",
      "text": "agent_input = {\n    \"member\": workflow.member,\n    \"analysis\": workflow.analysis,\n    \"next_action\": \"create_follow_up\"\n}"
    },
    {
      "t": "p",
      "text": "Now the prompt doesn't need to remember anything. It simply reasons over structured data. The distinction is subtle but powerful."
    },
    {
      "t": "h3",
      "text": "State Has a Lifecycle"
    },
    {
      "t": "p",
      "text": "Not every piece of information deserves to live forever. One useful way to think about state is by its lifespan."
    },
    {
      "t": "table",
      "headers": [
        "State",
        "Lifetime"
      ],
      "rows": [
        [
          "User message",
          "One request"
        ],
        [
          "Conversation history",
          "Current session"
        ],
        [
          "Workflow state",
          "Current workflow"
        ],
        [
          "Member profile",
          "Permanent"
        ],
        [
          "Execution logs",
          "Audit history"
        ],
        [
          "Prompt version",
          "Deployment history"
        ]
      ]
    },
    {
      "t": "p",
      "text": "Grouping state by lifetime makes storage decisions much easier."
    },
    {
      "t": "h3",
      "text": "What Should Never Be Shared"
    },
    {
      "t": "p",
      "text": "One of the biggest improvements we made came from asking a simple question before exposing data to another agent."
    },
    {
      "t": "pull",
      "text": "Does this agent actually need this information?"
    },
    {
      "t": "p",
      "text": "If the answer was no... We didn't include it. Examples: The Communications Agent doesn't need raw reasoning from the Analyst. The Welcome Agent doesn't need previous newsletter drafts. The Gospel Agent doesn't need internal validation logs. Every unnecessary field increases:"
    },
    {
      "t": "list",
      "items": [
        "prompt size",
        "token usage",
        "cognitive load",
        "risk of unintended reasoning"
      ]
    },
    {
      "t": "p",
      "text": "Minimal state is usually better state."
    },
    {
      "t": "h3",
      "text": "State Is an Interface"
    },
    {
      "t": "p",
      "text": "Eventually we stopped thinking about the workflow state as a Python object. We started thinking about it as an interface. Every agent expects a contract. Every agent produces a contract. The Overseer enforces those contracts."
    },
    {
      "t": "diagram",
      "text": "Workflow State\n       │\n       ▼\n Analyst Contract\n       │\n       ▼\n Validated Output\n       │\n       ▼\n Workflow State"
    },
    {
      "t": "p",
      "text": "That architecture keeps responsibilities clean. The state doesn't belong to any individual component. It belongs to the workflow itself."
    },
    {
      "t": "h3",
      "text": "Event Thinking Instead of Snapshot Thinking"
    },
    {
      "t": "p",
      "text": "Another architectural shift came from asking not just **what the current state is**, but **how it got there**. Instead of only storing the latest snapshot, we began thinking in terms of events."
    },
    {
      "t": "diagram",
      "text": "Workflow Started\n↓\nMember Loaded\n↓\nAnalysis Completed\n↓\nValidation Passed\n↓\nCare Plan Generated\n↓\nCommunication Sent"
    },
    {
      "t": "p",
      "text": "This timeline tells a richer story than the final state alone. It also opens the door to replaying workflows, auditing decisions, and diagnosing failures after the fact. Even if you don't implement full event sourcing, thinking in events leads to more transparent systems."
    },
    {
      "t": "h3",
      "text": "The Principle That Scales"
    },
    {
      "t": "code",
      "text": "If there's one idea I'd carry into every future AI project, it's this:"
    },
    {
      "t": "pull",
      "text": "State belongs to the workflow. Agents borrow it temporarily."
    },
    {
      "t": "p",
      "text": "That one principle kept PHHM modular even as more agents, workflows, and capabilities were added. No agent became indispensable. No component accumulated hidden responsibilities. The workflow remained the source of truth."
    },
    {
      "t": "pull",
      "text": "State Persistence: What Should Live in Memory and What Should Live Forever?"
    },
    {
      "t": "p",
      "text": "One of the first production failures we experienced wasn't caused by an AI model. It was caused by memory. A workflow had completed several expensive steps. Analysis had finished. Validation had passed. The Care Agent had generated recommendations. Then the application restarted. Everything disappeared."
    },
    {
      "t": "p",
      "text": "Not because the AI failed. Because we had stored critical workflow state in memory. That incident changed how we thought about persistence."
    },
    {
      "t": "h3",
      "text": "Not All State Deserves a Database"
    },
    {
      "t": "p",
      "text": "One mistake many systems make is treating all information the same. It isn't. Some data should disappear as soon as the request ends. Some should survive for minutes. Some should survive forever. One useful mental model is to classify state by **lifetime**."
    },
    {
      "t": "table",
      "headers": [
        "State Type",
        "Storage",
        "Lifetime"
      ],
      "rows": [
        [
          "Current prompt",
          "Memory",
          "One request"
        ],
        [
          "Agent context",
          "Memory",
          "Agent execution"
        ],
        [
          "Workflow state",
          "Cache / Database",
          "Workflow duration"
        ],
        [
          "Member profile",
          "Database",
          "Permanent"
        ],
        [
          "Audit logs",
          "Database",
          "Long-term"
        ],
        [
          "Prompt versions",
          "Repository",
          "Permanent"
        ]
      ]
    },
    {
      "t": "p",
      "text": "Once we started thinking in lifetimes instead of objects, storage decisions became much easier."
    },
    {
      "t": "h3",
      "text": "Memory Is Fast—But Fragile"
    },
    {
      "t": "p",
      "text": "In-memory state is incredibly useful. It's also temporary. For example:"
    },
    {
      "t": "code",
      "text": "workflow = WorkflowState(\n    member=member\n)"
    },
    {
      "t": "p",
      "text": "This is perfect while a request is running. It's fast. No database queries. Minimal latency. But if the process dies... So does the workflow. Memory should only hold information you're willing to lose."
    },
    {
      "t": "h3",
      "text": "Databases Preserve Progress"
    },
    {
      "t": "p",
      "text": "Now imagine a workflow that takes several minutes. Analysis completes. Validation succeeds. Communications is halfway finished. The server restarts. Without persistence, the entire workflow begins again. Instead, the Overseer periodically saves progress."
    },
    {
      "t": "code",
      "text": "workflow_repository.save(\n    workflow_state\n)"
    },
    {
      "t": "p",
      "text": "Now recovery becomes possible. The next execution simply resumes from the latest checkpoint."
    },
    {
      "t": "h3",
      "text": "Checkpointing Long Workflows"
    },
    {
      "t": "p",
      "text": "One design decision paid dividends almost immediately. We introduced checkpoints. Instead of waiting until the entire workflow completed, the Overseer saved progress after every major stage."
    },
    {
      "t": "diagram",
      "text": "Workflow Started\n        │\n        ▼\nAnalysis Complete\n   ✓ Checkpoint\n        │\n        ▼\nCare Plan Complete\n   ✓ Checkpoint\n        │\n        ▼\nCommunications Complete\n   ✓ Checkpoint\n        │\n        ▼\nWorkflow Finished"
    },
    {
      "t": "p",
      "text": "If something failed halfway through, we resumed from the last successful checkpoint instead of starting over. That reduced unnecessary AI calls and significantly improved reliability."
    },
    {
      "t": "h3",
      "text": "Recovery Becomes Simple"
    },
    {
      "t": "p",
      "text": "Suppose the application crashes immediately after the Care Agent finishes. Without checkpoints:"
    },
    {
      "t": "diagram",
      "text": "Restart\n↓\nRun Everything Again"
    },
    {
      "t": "p",
      "text": "With checkpoints:"
    },
    {
      "t": "diagram",
      "text": "Restart\n↓\nLoad Workflow\n↓\nResume From Care\n↓\nContinue"
    },
    {
      "t": "p",
      "text": "The difference becomes enormous as workflows become longer and more expensive."
    },
    {
      "t": "h3",
      "text": "Cache Isn't a Database"
    },
    {
      "t": "p",
      "text": "Another lesson we learned was not to confuse caching with persistence. A cache improves performance. A database preserves truth. For example:"
    },
    {
      "t": "diagram",
      "text": "Memory Cache\n↓\nFast Access\n↓\nTemporary"
    },
    {
      "t": "p",
      "text": "versus"
    },
    {
      "t": "diagram",
      "text": "Database\n↓\nDurable Storage\n↓\nSystem of Record"
    },
    {
      "t": "p",
      "text": "The workflow may use both. But they solve different problems."
    },
    {
      "t": "h3",
      "text": "Persist the Right Things"
    },
    {
      "t": "p",
      "text": "Not every object deserves permanent storage. We settled on a simple rule. Persist information that would be expensive, impossible, or risky to recreate. For example: Persist:"
    },
    {
      "t": "list",
      "items": [
        "workflow progress",
        "completed analysis",
        "care plans",
        "validation status",
        "execution metadata"
      ]
    },
    {
      "t": "p",
      "text": "Do not persist:"
    },
    {
      "t": "list",
      "items": [
        "temporary prompts",
        "intermediate reasoning",
        "token-by-token generation",
        "disposable context"
      ]
    },
    {
      "t": "p",
      "text": "Storing everything increases complexity without increasing value."
    },
    {
      "t": "h3",
      "text": "Designing for Idempotency"
    },
    {
      "t": "p",
      "text": "One subtle challenge appears when recovering workflows. Suppose the Communications Agent already sent an email. The application crashes before updating the workflow state. When recovery starts... Should the email be sent again? Probably not. That's where idempotency becomes essential. Every major action should be safe to retry."
    },
    {
      "t": "p",
      "text": "Instead of asking:"
    },
    {
      "t": "code",
      "text": "\"Did this function run?\""
    },
    {
      "t": "p",
      "text": "The system asks:"
    },
    {
      "t": "code",
      "text": "\"Has this action already been completed?\""
    },
    {
      "t": "p",
      "text": "That small distinction prevents duplicate work and unintended side effects."
    },
    {
      "t": "h3",
      "text": "Tracking Workflow Progress"
    },
    {
      "t": "p",
      "text": "The simplest solution was surprisingly effective. Every workflow tracks completed steps."
    },
    {
      "t": "code",
      "text": "workflow.completed_steps = [\n\n    \"analysis\",\n\n    \"care_plan\""
    },
    {
      "t": "p",
      "text": "] Before executing an agent, the Overseer checks:"
    },
    {
      "t": "code",
      "text": "if \"analysis\" not in workflow.completed_steps:\n\n    run_analysis()"
    },
    {
      "t": "p",
      "text": "This pattern makes retries safe and recovery deterministic."
    },
    {
      "t": "h3",
      "text": "State Expiration"
    },
    {
      "t": "p",
      "text": "Not every workflow needs to live forever. Some become irrelevant after a few minutes. Others after several days. We introduced expiration policies based on workflow type. For example:"
    },
    {
      "t": "table",
      "headers": [
        "Workflow",
        "Retention"
      ],
      "rows": [
        [
          "Onboarding",
          "30 days"
        ],
        [
          "Care coordination",
          "1 year"
        ],
        [
          "Newsletter generation",
          "7 days"
        ],
        [
          "Temporary drafts",
          "24 hours"
        ],
        [
          "Audit logs",
          "Long-term"
        ]
      ]
    },
    {
      "t": "p",
      "text": "Expiration policies keep storage manageable while preserving information that matters."
    },
    {
      "t": "h3",
      "text": "Durable Systems Assume Failure"
    },
    {
      "t": "p",
      "text": "One mindset changed how we designed every workflow. Instead of asking:"
    },
    {
      "t": "code",
      "text": "\"What happens if everything works?\""
    },
    {
      "t": "p",
      "text": "We asked:"
    },
    {
      "t": "code",
      "text": "\"What happens if the application crashes right here?\""
    },
    {
      "t": "p",
      "text": "At every stage. If the answer wasn't obvious, the architecture wasn't finished. Production systems aren't designed around success. They're designed around recovery."
    },
    {
      "t": "h3",
      "text": "The Bigger Lesson"
    },
    {
      "t": "p",
      "text": "Persistence isn't about databases. It's about resilience. Reliable AI platforms don't become reliable because models never fail. They become reliable because failures don't erase progress. That's exactly what checkpoints, durable state, and recovery mechanisms provide."
    },
    {
      "t": "h3",
      "text": "State Recovery Is an Orchestration Problem"
    },
    {
      "t": "p",
      "text": "Notice something interesting. The agents don't know anything about persistence. They don't load checkpoints. They don't save workflows. They don't recover after crashes. Only the Overseer manages durability. That separation keeps every specialist focused on one responsibility. Agents generate."
    },
    {
      "t": "p",
      "text": "The Overseer coordinates. Persistence protects. It's the same architectural philosophy we've followed throughout PHHM."
    },
    {
      "t": "h3",
      "text": "Context Optimization: Why More Memory Usually Makes AI Worse"
    },
    {
      "t": "p",
      "text": "One of the most common assumptions in AI development is that more context produces better results. It's an understandable assumption. If the model knows more, surely it can make better decisions. Right? Not necessarily. While building PHHM, we found the opposite was often true. As prompts accumulated more conversation history, workflow state, and unrelated information, performance started to decline. Responses became slower."
    },
    {
      "t": "p",
      "text": "Token costs increased. Reasoning became less focused. And occasionally, agents started incorporating information that wasn't even relevant to their task. The problem wasn't that the models lacked intelligence. The problem was that we were giving them too much to think about."
    },
    {
      "t": "h2",
      "text": "Bigger Context Windows Don't Solve Architecture"
    },
    {
      "t": "p",
      "text": "Modern language models can process enormous context windows. That's an impressive capability. But larger context windows don't eliminate the need for good system design. Think about an experienced software engineer. Giving them access to every file in your repository doesn't automatically help them solve a bug. In many cases, it slows them down. They still need the *right* information. AI agents are no different."
    },
    {
      "t": "p",
      "text": "Large context windows increase capacity. They don't replace architecture."
    },
    {
      "t": "h3",
      "text": "Context Is a Budget"
    },
    {
      "t": "p",
      "text": "One mindset changed how we designed prompts. Instead of treating context as free, we started treating it like a budget. Every piece of information included in a prompt had to justify its existence. We began asking simple questions before adding anything."
    },
    {
      "t": "list",
      "items": [
        "Does this agent actually need it?",
        "Will this information change the decision?",
        "Is it still relevant?",
        "Could it live somewhere else?"
      ]
    },
    {
      "t": "p",
      "text": "If the answer was no, we removed it. Over time, our prompts became smaller, faster, and easier to reason about."
    },
    {
      "t": "h3",
      "text": "Designing Minimal Context"
    },
    {
      "t": "p",
      "text": "The Analyst Agent doesn't need everything. It only needs enough information to produce a structured analysis. Instead of sending an entire workflow, we prepare a focused input."
    },
    {
      "t": "code",
      "text": "agent_input = {\n    \"member\": workflow.member,\n    \"history\": workflow.member_history,\n    \"request\": workflow.current_request\n}"
    },
    {
      "t": "p",
      "text": "Notice what's missing. No communication history. No onboarding details. No validation logs. No unrelated workflow metadata. The agent receives exactly what it needs—and nothing more."
    },
    {
      "t": "h3",
      "text": "Context Is Not Shared Memory"
    },
    {
      "t": "p",
      "text": "One mistake we made early was assuming every agent should inherit everything that came before. Imagine this workflow."
    },
    {
      "t": "diagram",
      "text": "User Request\n      │\n      ▼\n Welcome\n      │\n      ▼\n Analyst\n      │\n      ▼\n Care\n      │\n      ▼\n Communications"
    },
    {
      "t": "p",
      "text": "It seems natural for each agent to receive the complete conversation. But over time that conversation becomes cluttered with information only one specialist ever needed. Instead, every handoff is intentional. The Overseer prepares a fresh context for every execution. Each agent starts with a clean workspace."
    },
    {
      "t": "h3",
      "text": "Think Like an Operating System"
    },
    {
      "t": "p",
      "text": "One analogy helped us rethink memory. An operating system doesn't load every application into RAM all the time. It loads what is needed. Unloads what isn't. Schedules work efficiently. The Overseer performs the same role. Instead of exposing the entire workflow to every agent, it assembles just enough context for the current task. That approach keeps prompts focused while reducing latency and token usage."
    },
    {
      "t": "h3",
      "text": "Context Assembly"
    },
    {
      "t": "p",
      "text": "Rather than storing giant prompts, the Overseer assembles context dynamically."
    },
    {
      "t": "diagram",
      "text": "Workflow State\n       │\n       ▼\nSelect Relevant Data\n       │\n       ▼\nLoad Prompt\n       │\n       ▼\nInject Current Task\n       │\n       ▼\nExecute Agent"
    },
    {
      "t": "p",
      "text": "Notice the separation. The workflow state exists independently. The prompt exists independently. The context is assembled only when needed. That makes the system dramatically more flexible."
    },
    {
      "t": "h3",
      "text": "Forgetting Is a Feature"
    },
    {
      "t": "p",
      "text": "One of the most valuable architectural decisions we made was allowing the system to forget. That sounds counterintuitive. But forgetting irrelevant information improves reasoning. For example, once the Welcome Agent finishes onboarding, those conversational details rarely matter to the Analyst. Likewise, draft newsletter content has no value to the Care Agent. Keeping everything forever doesn't create intelligence. It creates noise. Good AI systems remember deliberately."
    },
    {
      "t": "p",
      "text": "Great AI systems forget deliberately."
    },
    {
      "t": "h3",
      "text": "Context Boundaries"
    },
    {
      "t": "p",
      "text": "Every agent has a clearly defined boundary."
    },
    {
      "t": "table",
      "headers": [
        "Agent",
        "Receives"
      ],
      "rows": [
        [
          "Welcome",
          "Registration details and onboarding request"
        ],
        [
          "Analyst",
          "Member data and analysis inputs"
        ],
        [
          "Care",
          "Analysis results and care objectives"
        ],
        [
          "Communications",
          "Approved content and messaging goals"
        ],
        [
          "Overseer",
          "Complete workflow state"
        ]
      ]
    },
    {
      "t": "p",
      "text": "Only one component sees the whole picture. The Overseer. Everyone else sees only their slice of the workflow. That principle dramatically reduced accidental coupling between agents."
    },
    {
      "t": "h3",
      "text": "Performance Benefits"
    },
    {
      "t": "p",
      "text": "Optimizing context wasn't only about cleaner architecture. It produced measurable operational improvements. Smaller prompts led to:"
    },
    {
      "t": "list",
      "items": [
        "lower token consumption",
        "reduced latency",
        "more consistent outputs",
        "simpler prompt maintenance",
        "lower inference costs"
      ]
    },
    {
      "t": "p",
      "text": "Perhaps most importantly, agents became easier to understand because each prompt focused on a single responsibility."
    },
    {
      "t": "h3",
      "text": "The Architecture We Ended Up With"
    },
    {
      "t": "p",
      "text": "Looking back, PHHM isn't really a system of six AI agents. It's a set of architectural layers."
    },
    {
      "t": "diagram",
      "text": "                 User Request\n                      │\n                      ▼\n             Orchestration Layer\n                      │\n                      ▼\n            Workflow State Engine\n                      │\n                      ▼\n          Context Assembly Pipeline\n                      │\n                      ▼\n            Specialized AI Agents\n                      │\n                      ▼\n          Validation & Guardrails\n                      │\n                      ▼\n              Final Response"
    },
    {
      "t": "p",
      "text": "Each layer has exactly one responsibility. That separation is what makes the platform maintainable."
    },
    {
      "t": "h3",
      "text": "The Five Principles of State Management"
    },
    {
      "t": "p",
      "text": "If I were building another multi-agent platform tomorrow, I'd follow the same five principles."
    },
    {
      "t": "pull",
      "text": "1. Separate context from state"
    },
    {
      "t": "p",
      "text": "Temporary information belongs in prompts. Persistent information belongs in the workflow."
    },
    {
      "t": "pull",
      "text": "2. Keep state ownership centralized"
    },
    {
      "t": "p",
      "text": "Agents should generate information. The orchestration layer should own it."
    },
    {
      "t": "h3",
      "text": "3. Share less"
    },
    {
      "t": "p",
      "text": "Every additional piece of shared information increases complexity. Only expose what an agent genuinely needs."
    },
    {
      "t": "h3",
      "text": "4. Design for recovery"
    },
    {
      "t": "p",
      "text": "Assume failures will happen. Persist progress. Checkpoint long workflows. Make retries safe."
    },
    {
      "t": "pull",
      "text": "5. Optimize context intentionally"
    },
    {
      "t": "p",
      "text": "The goal isn't maximum context. It's maximum relevance."
    },
    {
      "t": "h3",
      "text": "Final Thoughts"
    },
    {
      "t": "p",
      "text": "When people discuss memory in AI systems, the conversation usually focuses on larger context windows, vector databases, or long-term memory. Those tools are valuable. But they're only part of the story. The more important question is architectural."
    },
    {
      "t": "pull",
      "text": "Who owns information? Who should see it? How long should it live? When should it be forgotten?"
    },
    {
      "t": "p",
      "text": "Answer those questions well, and the technology becomes much easier to change. That's exactly what happened with PHHM. As the platform evolved, the orchestration layer remained simple because it treated state as a first-class architectural concern rather than an implementation detail. The models improved. The prompts evolved. New agents were added. But the principles remained the same. State belongs to the workflow."
    },
    {
      "t": "p",
      "text": "Context belongs to the task. And the Overseer decides what every agent needs to know."
    },
    {
      "t": "h3",
      "text": "Key Takeaways"
    },
    {
      "t": "code",
      "text": "If you're designing a production multi-agent AI system, these are the practices I'd recommend from day one:"
    },
    {
      "t": "list",
      "items": [
        "Distinguish context from persistent state.",
        "Give every piece of state a clear owner.",
        "Build a structured workflow state object.",
        "Treat state as an API contract between agents.",
        "Persist progress with checkpoints.",
        "Design every workflow to recover safely.",
        "Assemble context dynamically instead of sharing everything.",
        "Remember intentionally—and forget deliberately."
      ]
    }
  ]
} as ArticleData;

export default function StateManagementArticle() {
  return <ArticleShell article={article} />;
}
