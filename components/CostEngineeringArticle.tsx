"use client";

import ArticleShell, { type ArticleData } from "./ArticleShell";

const article = {
  "kicker": "PHHM Journal • Cost, Part 1 of 2",
  "focus": "Cost • Measure",
  "icon": "coins",
  "title": "Cost Engineering for Production AI: How We Reduced LLM Costs Without Making the Platform Less Intelligent",
  "subtitle": "The architectural decisions that kept PHHM fast, scalable, and cost-efficient without sacrificing workflow quality. First of a two-part cost series: this article covers measurement; Part 2 covers optimization.",
  "readTime": "13 min",
  "blocks": [
    {
      "t": "p",
      "text": "One of the first questions people ask about AI platforms is:"
    },
    {
      "t": "pull",
      "text": "\"How much does it cost?\""
    },
    {
      "t": "p",
      "text": "It's a reasonable question. It's also the wrong one. The better question is:"
    },
    {
      "t": "pull",
      "text": "\"Why does it cost that much?\""
    },
    {
      "t": "p",
      "text": "When we started building PHHM, cost felt like someone else's problem. The models worked. The workflows were reliable. Users were happy. Then we looked at production telemetry. One workflow consumed nearly four times as many tokens as another. Two seemingly identical requests had completely different execution costs. Retries quietly multiplied token usage."
    },
    {
      "t": "p",
      "text": "Long conversation histories were being sent to every agent. Nothing was technically broken. The platform was simply doing more work than it needed to. That realization completely changed how we thought about AI engineering. Instead of asking:"
    },
    {
      "t": "pull",
      "text": "\"Which model is cheapest?\""
    },
    {
      "t": "p",
      "text": "We started asking:"
    },
    {
      "t": "pull",
      "text": "\"Which architectural decision is making this workflow expensive?\""
    },
    {
      "t": "p",
      "text": "That's the difference between optimizing prompts... ...and engineering production AI."
    },
    {
      "t": "h3",
      "text": "The Biggest Cost Isn't the Model"
    },
    {
      "t": "p",
      "text": "Most discussions about AI costs begin with model pricing. In production, we discovered something surprising. The model was rarely the biggest factor. Architecture was. Two workflows could use exactly the same model. One costs three times more. Why? Because one:"
    },
    {
      "t": "list",
      "items": [
        "executed six agents instead of three",
        "retried twice",
        "included unnecessary conversation history",
        "generated redundant summaries",
        "repeated context across agents"
      ]
    },
    {
      "t": "p",
      "text": "The model didn't create the cost. The workflow did."
    },
    {
      "t": "h3",
      "text": "Cost Is the Sum of Many Small Decisions"
    },
    {
      "t": "p",
      "text": "No single architectural decision doubled our AI bill. Lots of tiny ones did. For example:"
    },
    {
      "t": "diagram",
      "text": "User Request\n↓\nOverseer\n↓\nAnalyst\n↓\nCare\n↓\nCommunications\n↓\nValidation\n↓\nRetry\n↓\nResponse"
    },
    {
      "t": "p",
      "text": "Every step consumes:"
    },
    {
      "t": "list",
      "items": [
        "tokens",
        "latency",
        "compute",
        "API calls"
      ]
    },
    {
      "t": "p",
      "text": "Multiply that across thousands of workflows. Small inefficiencies become significant operational costs."
    },
    {
      "t": "h2",
      "text": "Stop Thinking About Cost Per Request"
    },
    {
      "t": "p",
      "text": "Traditional APIs often measure: Cost per request. Multi-agent systems need something different. We measure:"
    },
    {
      "t": "pull",
      "text": "Cost per workflow."
    },
    {
      "t": "p",
      "text": "One request might execute:"
    },
    {
      "t": "list",
      "items": [
        "two agents",
        "six agents",
        "multiple retries",
        "fallback models",
        "validation passes"
      ]
    },
    {
      "t": "p",
      "text": "Treating those requests equally hides where the money actually goes."
    },
    {
      "t": "h3",
      "text": "Every Workflow Has an Operational Cost"
    },
    {
      "t": "p",
      "text": "By the end of the project, every execution produced a cost profile. For example:"
    },
    {
      "t": "table",
      "headers": [
        "Workflow",
        "Agents",
        "Tokens",
        "Estimated Cost"
      ],
      "rows": [
        [
          "Welcome Journey",
          "2",
          "1,120",
          "Low"
        ],
        [
          "Member Report",
          "4",
          "3,480",
          "Medium"
        ],
        [
          "Care Plan",
          "5",
          "4,210",
          "High"
        ],
        [
          "Newsletter",
          "3",
          "2,870",
          "Medium"
        ]
      ]
    },
    {
      "t": "p",
      "text": "Now optimization becomes targeted. We're no longer guessing. We're measuring."
    },
    {
      "t": "h3",
      "text": "The Architecture We Wanted"
    },
    {
      "t": "p",
      "text": "Eventually every workflow answered three questions. Was it correct?"
    },
    {
      "t": "diagram",
      "text": "↓\nWas it fast?\n↓\nWas it economical?"
    },
    {
      "t": "p",
      "text": "Production AI isn't only about quality. It's about sustainable quality."
    },
    {
      "t": "h3",
      "text": "The Cost Triangle"
    },
    {
      "t": "p",
      "text": "Every engineering decision balanced three competing goals."
    },
    {
      "t": "diagram",
      "text": "        Quality\n           ▲\n          / \\\n         /   \\\n        /     \\\n       /       \\\n Speed ------- Cost"
    },
    {
      "t": "p",
      "text": "You can usually improve two. Improving all three requires architectural changes. That's exactly what this article explores."
    },
    {
      "t": "h3",
      "text": "The Principle That Changed Everything"
    },
    {
      "t": "p",
      "text": "Looking back, one sentence summarizes our entire cost strategy."
    },
    {
      "t": "pull",
      "text": "Don't optimize model prices. Optimize the amount of work your platform performs."
    },
    {
      "t": "p",
      "text": "Everything else followed from that idea."
    },
    {
      "t": "h3",
      "text": "Measuring AI Costs: Stop Optimizing Requests, Start Optimizing Workflows"
    },
    {
      "t": "p",
      "text": "One of the biggest mistakes we made early was measuring AI costs the same way we measured traditional APIs. We looked at cost per request. That turned out to be almost meaningless. Two requests arriving at the same endpoint could have dramatically different execution paths. One might trigger two specialist agents. Another might invoke six agents, perform multiple validation steps, retry twice, and generate a long-form report."
    },
    {
      "t": "code",
      "text": "From the API's perspective, both were simply:"
    },
    {
      "t": "h3",
      "text": "POST /workflow"
    },
    {
      "t": "p",
      "text": "From the platform's perspective, they were completely different workloads. That's why PHHM stopped measuring requests. We started measuring workflows."
    },
    {
      "t": "h3",
      "text": "Every Workflow Has Its Own Cost Profile"
    },
    {
      "t": "p",
      "text": "By the end of the project, every execution produced a detailed cost breakdown. Instead of seeing one total number, we could see where every token was spent."
    },
    {
      "t": "diagram",
      "text": "Member Report Workflow\n        │\n        ▼\nOverseer ............ 320 tokens"
    },
    {
      "t": "p",
      "text": "Analyst ........... 1,420 tokens Care .............. 980 tokens Validation ......... 110 tokens"
    },
    {
      "t": "diagram",
      "text": "Communications ..... 760 tokens\n──────────────────────────────"
    },
    {
      "t": "p",
      "text": "Total ............. 3,590 tokens That immediately answers a much more useful question."
    },
    {
      "t": "pull",
      "text": "Where is the platform spending money?"
    },
    {
      "t": "h3",
      "text": "Cost Is Distributed Across the Workflow"
    },
    {
      "t": "p",
      "text": "One surprising realization was that AI costs rarely come from one expensive operation. They accumulate. Every additional agent contributes:"
    },
    {
      "t": "list",
      "items": [
        "prompt tokens",
        "context tokens",
        "completion tokens",
        "validation overhead",
        "orchestration metadata"
      ]
    },
    {
      "t": "p",
      "text": "Individually those costs seem small. Across thousands of workflows, they become one of the largest operational expenses."
    },
    {
      "t": "h3",
      "text": "Token Accounting Changed Everything"
    },
    {
      "t": "p",
      "text": "The first major improvement wasn't optimization. It was visibility. Every agent records:"
    },
    {
      "t": "list",
      "items": [
        "input tokens",
        "output tokens",
        "total tokens",
        "execution duration",
        "estimated cost"
      ]
    },
    {
      "t": "p",
      "text": "For example:"
    },
    {
      "t": "code",
      "text": "{\n  \"execution_id\": \"8f34d8d2...\",\n  \"agent\": \"analyst\",\n  \"input_tokens\": 1284,\n  \"output_tokens\": 316,\n  \"total_tokens\": 1600,\n  \"duration_ms\": 914\n}"
    },
    {
      "t": "p",
      "text": "Without this information, optimization becomes guesswork. With it, cost engineering becomes measurable."
    },
    {
      "t": "h3",
      "text": "Not Every Agent Costs the Same"
    },
    {
      "t": "p",
      "text": "Another assumption disappeared quickly. We expected every specialist to consume roughly the same resources. Production data showed otherwise."
    },
    {
      "t": "table",
      "headers": [
        "Agent",
        "Typical Token Usage",
        "Relative Cost"
      ],
      "rows": [
        [
          "Overseer",
          "Very Low",
          "Minimal"
        ],
        [
          "Welcome",
          "Low",
          "Low"
        ],
        [
          "Analyst",
          "High",
          "High"
        ],
        [
          "Care",
          "Medium",
          "Medium"
        ],
        [
          "Communications",
          "Medium",
          "Medium"
        ],
        [
          "Gospel",
          "Variable",
          "Depends on content length"
        ]
      ]
    },
    {
      "t": "p",
      "text": "The Analyst consistently consumed the most context because it processed the richest inputs. That made it the first target for optimization. Not because it was inefficient. Because improving the largest contributor produces the greatest return."
    },
    {
      "t": "h3",
      "text": "Context Is Usually the Biggest Expense"
    },
    {
      "t": "p",
      "text": "When people think about AI costs, they usually think about generated text. In reality, input context often dominates. Imagine this request."
    },
    {
      "t": "diagram",
      "text": "Conversation History\n↓\nWorkflow State\n↓\nMember Profile\n↓\nPrompt\n↓\nUser Request"
    },
    {
      "t": "p",
      "text": "Every one of those sections consumes tokens before the model generates a single word. Large contexts quietly become expensive."
    },
    {
      "t": "h3",
      "text": "More Context Isn't Always Better"
    },
    {
      "t": "p",
      "text": "One misconception slowed us down early. We assumed giving agents more information would always improve quality. It didn't. Often, it simply increased cost. Specialist agents rarely need the complete workflow history. The Communications Agent doesn't require every analytical detail. The Welcome Agent doesn't need the entire care record. Instead of maximizing context..."
    },
    {
      "t": "p",
      "text": "We started minimizing it."
    },
    {
      "t": "h3",
      "text": "Context Should Be Purpose-Built"
    },
    {
      "t": "p",
      "text": "Every specialist receives only the information required for its task."
    },
    {
      "t": "diagram",
      "text": "Workflow State\n        │\n        ▼\nContext Builder\n        │\n ├──────────────┐\n ▼              ▼"
    },
    {
      "t": "p",
      "text": "Analyst Communications Each agent receives a different context package. That reduces:"
    },
    {
      "t": "list",
      "items": [
        "token usage",
        "latency",
        "cognitive load for the model"
      ]
    },
    {
      "t": "p",
      "text": "And, surprisingly, often improves output quality. Less irrelevant information means fewer distractions."
    },
    {
      "t": "h3",
      "text": "Shared Context Is Hidden Cost"
    },
    {
      "t": "p",
      "text": "One expensive pattern appears in many AI systems. The same information is sent repeatedly. For example:"
    },
    {
      "t": "diagram",
      "text": "Member Profile\n↓\nAnalyst\n↓\nMember Profile\n↓\nCare\n↓\nMember Profile\n↓\nCommunications"
    },
    {
      "t": "p",
      "text": "The platform keeps paying to transmit identical information. Whenever possible, PHHM summarizes or transforms context before passing it downstream. The downstream agent receives what it needs—not everything that came before."
    },
    {
      "t": "h3",
      "text": "Summaries Are Cheaper Than Histories"
    },
    {
      "t": "p",
      "text": "One optimization delivered immediate savings. Instead of forwarding an entire conversation history between agents, we forward structured summaries. For example:"
    },
    {
      "t": "diagram",
      "text": "Full Conversation\n        │\n        ▼\nWorkflow Summary\n        │\n        ▼\nNext Agent"
    },
    {
      "t": "p",
      "text": "A concise, validated summary often costs a fraction of the original context while preserving the information that actually matters. The result is lower token usage without reducing workflow quality."
    },
    {
      "t": "h3",
      "text": "Cost Engineering Begins with Measurement"
    },
    {
      "t": "p",
      "text": "Looking back, our first instinct was to optimize prompts. That was premature. The real breakthrough came when we understood where the money was going. Once token usage became observable, optimization opportunities became obvious. The biggest savings didn't come from writing clever prompts. They came from removing unnecessary work."
    },
    {
      "t": "h3",
      "text": "The Bigger Lesson"
    },
    {
      "t": "p",
      "text": "One engineering principle emerged again and again."
    },
    {
      "t": "pull",
      "text": "You can't optimize costs you don't measure."
    },
    {
      "t": "p",
      "text": "Token accounting isn't just billing information. It's architectural feedback. It tells you:"
    },
    {
      "t": "list",
      "items": [
        "which workflows are expensive",
        "which agents consume the most context",
        "where retries multiply costs",
        "which optimizations produce meaningful savings"
      ]
    },
    {
      "t": "p",
      "text": "Without those measurements, cost reduction becomes speculation. With them, it becomes engineering."
    },
    {
      "t": "pull",
      "text": "Architectural Cost Optimization: Doing Less Work Instead of Buying Cheaper Models"
    },
    {
      "t": "p",
      "text": "After measuring workflow costs, one pattern became impossible to ignore. The expensive workflows weren't expensive because they used better models. They were expensive because the platform performed unnecessary work. Extra agents executed. Context was repeated. Retries multiplied token usage. Identical requests were processed again. The platform wasn't paying for intelligence."
    },
    {
      "t": "p",
      "text": "It was paying for redundancy. That realization completely changed our optimization strategy. Instead of asking:"
    },
    {
      "t": "pull",
      "text": "\"Which model should we downgrade?\""
    },
    {
      "t": "p",
      "text": "We started asking:"
    },
    {
      "t": "pull",
      "text": "\"Why is this workflow doing this work at all?\""
    },
    {
      "t": "h3",
      "text": "The Cheapest AI Call Is the One You Never Make"
    },
    {
      "t": "p",
      "text": "One engineering principle quickly became our north star."
    },
    {
      "t": "pull",
      "text": "Every unnecessary model invocation is permanent technical debt."
    },
    {
      "t": "p",
      "text": "A language model should only execute when it genuinely adds value. Everything else should be handled by software. For example: Don't ask an LLM:"
    },
    {
      "t": "list",
      "items": [
        "if a required field exists",
        "whether JSON is valid",
        "whether a user is authenticated",
        "whether a workflow exists",
        "whether an email address is correctly formatted"
      ]
    },
    {
      "t": "p",
      "text": "Those are deterministic problems. Software solves them faster, cheaper, and more reliably. Reserve AI for reasoning. Not validation."
    },
    {
      "t": "h2",
      "text": "Intelligent Model Routing"
    },
    {
      "t": "p",
      "text": "Not every task deserves your most capable model. One mistake we made early was treating every workflow equally."
    },
    {
      "t": "diagram",
      "text": "Simple Welcome Message\n↓\nLargest Model"
    },
    {
      "t": "p",
      "text": "Technically correct. Economically inefficient. Eventually, routing became another orchestration responsibility."
    },
    {
      "t": "diagram",
      "text": "Workflow Complexity\n        │\n ├──────────────┐\n ▼              ▼\nSimple       Complex\n │              │\n ▼              ▼"
    },
    {
      "t": "p",
      "text": "Fast Model Advanced Model The orchestrator—not the user—decides which model is appropriate. That keeps quality high while reducing unnecessary cost."
    },
    {
      "t": "h3",
      "text": "Match Capability to Complexity"
    },
    {
      "t": "p",
      "text": "One useful framework emerged during development."
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
          "Routing",
          "Lightweight model"
        ],
        [
          "Summarization",
          "Standard model"
        ],
        [
          "Complex analysis",
          "Advanced model"
        ],
        [
          "Multi-step reasoning",
          "Advanced model"
        ],
        [
          "Final formatting",
          "Lightweight model"
        ]
      ]
    },
    {
      "t": "p",
      "text": "Notice the pattern. High-cost models are reserved for high-value reasoning. Everything else uses simpler alternatives where appropriate."
    },
    {
      "t": "h3",
      "text": "Parallel Execution Has a Cost"
    },
    {
      "t": "p",
      "text": "Earlier in the series we celebrated parallel execution because it reduced latency. There's another side to that decision. Concurrency also increases resource consumption. Imagine this workflow."
    },
    {
      "t": "diagram",
      "text": "Overseer\n        │\n ├──────────────┬──────────────┐\n ▼              ▼              ▼"
    },
    {
      "t": "p",
      "text": "Analyst Care Communications Latency improves. But three model calls now happen simultaneously. Sometimes that's exactly what you want. Sometimes sequential execution is more economical. Choosing between them becomes an architectural trade-off."
    },
    {
      "t": "h3",
      "text": "Optimize for the Right Constraint"
    },
    {
      "t": "p",
      "text": "One lesson became increasingly important. Sometimes the goal is speed. Sometimes it's cost. Sometimes it's both. Those goals don't always align."
    },
    {
      "t": "diagram",
      "text": "Fastest Workflow\n↓\nHigher Cost\n──────────────\nCheapest Workflow\n↓\nHigher Latency\n──────────────\nBalanced Workflow\n↓\nAcceptable Cost"
    },
    {
      "t": "p",
      "text": "+ Acceptable Speed The platform should choose intentionally. Not accidentally."
    },
    {
      "t": "h3",
      "text": "Retries Are More Expensive Than They Look"
    },
    {
      "t": "p",
      "text": "Retries rarely appear on pricing dashboards. They quietly multiply every other cost. Imagine this execution."
    },
    {
      "t": "diagram",
      "text": "Analyst\n↓\nValidation Failed\n↓\nRetry\n↓\nValidation Failed\n↓\nRetry\n↓\nSuccess"
    },
    {
      "t": "p",
      "text": "One logical operation became three AI calls. Three sets of tokens. Three opportunities to consume additional context. That's why reducing retries often produces larger savings than switching models."
    },
    {
      "t": "h3",
      "text": "Fix the Cause, Not the Bill"
    },
    {
      "t": "p",
      "text": "Whenever retries increased, we resisted the temptation to focus on cost. Instead, we investigated the underlying reason. Common causes included:"
    },
    {
      "t": "list",
      "items": [
        "unclear prompts",
        "oversized context",
        "weak output contracts",
        "insufficient validation feedback",
        "poor routing decisions"
      ]
    },
    {
      "t": "p",
      "text": "Reducing retries naturally reduced spending. Cost optimization became a by-product of better engineering."
    },
    {
      "t": "h3",
      "text": "Cache What Doesn't Change"
    },
    {
      "t": "p",
      "text": "One of the simplest optimizations required almost no AI expertise. Stop recomputing identical work. For example:"
    },
    {
      "t": "diagram",
      "text": "Member Summary\n↓\nCache\n↓\nReuse"
    },
    {
      "t": "p",
      "text": "If a profile hasn't changed, regenerating the same summary adds cost without adding value. Caching works especially well for:"
    },
    {
      "t": "list",
      "items": [
        "profile summaries",
        "document analysis",
        "workflow templates",
        "reference material",
        "static knowledge"
      ]
    },
    {
      "t": "p",
      "text": "The orchestrator checks whether existing results remain valid before invoking another model."
    },
    {
      "t": "h3",
      "text": "Avoid Cascading AI Calls"
    },
    {
      "t": "p",
      "text": "Another expensive pattern appeared during profiling. One agent generated information solely so another agent could summarize it."
    },
    {
      "t": "diagram",
      "text": "Agent A\n↓\nLong Report\n↓\nAgent B\n↓\nSummary\n↓\nAgent C"
    },
    {
      "t": "p",
      "text": "The platform paid twice for essentially the same information. Instead, we redesigned several workflows so the first agent produced a structured summary directly. Less text. Fewer tokens. Simpler orchestration. Lower cost."
    },
    {
      "t": "h3",
      "text": "Cost Is a Workflow Metric"
    },
    {
      "t": "p",
      "text": "One mindset shift tied everything together. Instead of treating cost as an accounting problem, we treated it as another operational metric. Every workflow now answers four questions. Was it correct?"
    },
    {
      "t": "diagram",
      "text": "↓\nWas it reliable?\n↓\nWas it fast?\n↓\nWas it economical?"
    },
    {
      "t": "p",
      "text": "A workflow that costs twice as much without improving outcomes isn't better. It's simply more expensive."
    },
    {
      "t": "h2",
      "text": "Cost Observability Changes Engineering Conversations"
    },
    {
      "t": "p",
      "text": "Once cost became visible, design discussions changed. Instead of asking:"
    },
    {
      "t": "pull",
      "text": "\"Can we build this?\""
    },
    {
      "t": "p",
      "text": "We asked:"
    },
    {
      "t": "list",
      "items": [
        "How many model calls does this introduce?",
        "Can this context be reduced?",
        "Should this result be cached?",
        "Is this retry avoidable?",
        "Does this task require our most capable model?"
      ]
    },
    {
      "t": "p",
      "text": "Architecture reviews naturally included economics. That proved far more effective than trying to optimize costs after deployment."
    },
    {
      "t": "h3",
      "text": "The Bigger Lesson"
    },
    {
      "t": "p",
      "text": "Looking back, one principle guided almost every optimization we made."
    },
    {
      "t": "pull",
      "text": "Optimize the architecture before you optimize the model."
    },
    {
      "t": "p",
      "text": "Changing providers might save a percentage. Removing unnecessary work often saves an order of magnitude more. That's the difference between tactical optimization and engineering design."
    },
    {
      "t": "h3",
      "text": "Cost Engineering Is a Design Discipline, Not a Finance Exercise"
    },
    {
      "t": "p",
      "text": "When people hear \"cost optimization,\" they often imagine finance teams asking engineers to reduce cloud bills. That's not what happened in PHHM. The engineering team cared about cost because cost directly influenced architecture. Every unnecessary retry increased latency. Every oversized prompt increased token usage. Every redundant AI call consumed compute that could have been used elsewhere. Cost wasn't simply money leaving the business. It was evidence that the platform was performing unnecessary work."
    },
    {
      "t": "p",
      "text": "Once we understood that, optimization became much easier. We stopped trying to make AI cheaper. We started making the platform more efficient."
    },
    {
      "t": "h3",
      "text": "Sustainable AI Requires Economic Feedback"
    },
    {
      "t": "p",
      "text": "One realization changed how we evaluated architectural decisions. Every new feature should answer one additional question."
    },
    {
      "t": "pull",
      "text": "\"What is the operational cost of this capability?\""
    },
    {
      "t": "p",
      "text": "That doesn't mean rejecting expensive features. It means understanding their trade-offs before deploying them. For example:"
    },
    {
      "t": "list",
      "items": [
        "Does this workflow require another specialist agent?",
        "Can existing context be reused?",
        "Should the result be cached?",
        "Is a more capable model actually necessary?",
        "Will this increase retries?",
        "Does this improve user outcomes enough to justify the additional cost?"
      ]
    },
    {
      "t": "p",
      "text": "Cost became another engineering constraint. Just like latency. Just like reliability."
    },
    {
      "t": "h3",
      "text": "Every Architecture Decision Has an Economic Consequence"
    },
    {
      "t": "p",
      "text": "Looking back, nearly every architectural decision influenced operational cost."
    },
    {
      "t": "diagram",
      "text": "Routing Strategy\n        │\n        ▼\nAgent Count\n        │\n        ▼\nContext Size\n        │\n        ▼\nToken Usage\n        │\n        ▼\nWorkflow Cost"
    },
    {
      "t": "p",
      "text": "Notice something important. The model appears surprisingly late. Most cost is determined long before the first token reaches an LLM. That's why architectural thinking matters so much."
    },
    {
      "t": "h3",
      "text": "Budgeting at the Workflow Level"
    },
    {
      "t": "p",
      "text": "Traditional budgeting often focuses on monthly infrastructure costs. Multi-agent platforms benefit from a different perspective. We started defining expected cost envelopes for each workflow. For example:"
    },
    {
      "t": "table",
      "headers": [
        "Workflow",
        "Target Profile",
        "Operational Goal"
      ],
      "rows": [
        [
          "Welcome Journey",
          "Low cost",
          "Fast onboarding"
        ],
        [
          "Member Report",
          "Moderate cost",
          "High analytical quality"
        ],
        [
          "Care Plan",
          "Higher cost",
          "Prioritize recommendation quality"
        ],
        [
          "Newsletter",
          "Moderate cost",
          "Batch generation efficiently"
        ]
      ]
    },
    {
      "t": "p",
      "text": "Instead of asking whether the platform was expensive, we asked whether each workflow stayed within its intended design goals. That made cost discussions much more productive."
    },
    {
      "t": "h3",
      "text": "Cost Trends Matter More Than Daily Spend"
    },
    {
      "t": "p",
      "text": "One unusually expensive day rarely indicates a systemic problem. Gradual increases do. That's why we monitored trends instead of isolated numbers. Average Workflow Cost Week 1 1.00x"
    },
    {
      "t": "diagram",
      "text": "↓"
    },
    {
      "t": "p",
      "text": "Week 2 1.03x"
    },
    {
      "t": "diagram",
      "text": "↓"
    },
    {
      "t": "p",
      "text": "Week 3 1.11x"
    },
    {
      "t": "diagram",
      "text": "↓"
    },
    {
      "t": "p",
      "text": "Week 4 1.28x Nothing catastrophic happened. But the trend clearly suggested that something in the platform had changed. Trend analysis often revealed regressions long before monthly billing reports did."
    },
    {
      "t": "h3",
      "text": "Cost Dashboards Should Explain Spending"
    },
    {
      "t": "p",
      "text": "One lesson carried over directly from the observability article. Dashboards shouldn't just display numbers. They should answer questions. A useful cost dashboard helps engineers understand:"
    },
    {
      "t": "list",
      "items": [
        "Which workflow is most expensive?",
        "Which agent consumes the most tokens?",
        "Which prompt version increased costs?",
        "Which workflows retry most frequently?",
        "Which model is responsible for the highest spend?",
        "How has cost changed since the last deployment?"
      ]
    },
    {
      "t": "p",
      "text": "Those answers make optimization actionable."
    },
    {
      "t": "h3",
      "text": "Scaling Without Losing Control"
    },
    {
      "t": "p",
      "text": "As usage grows, small inefficiencies become significant. A workflow that wastes only a few hundred tokens doesn't seem important during development. Multiply that across thousands of daily executions and the impact becomes obvious. That's why cost engineering becomes more valuable over time. Good architectural decisions compound just as quickly as poor ones."
    },
    {
      "t": "h3",
      "text": "Cost Completes the Engineering Picture"
    },
    {
      "t": "p",
      "text": "Looking back across the PHHM series, another pattern became clear. Every workflow ultimately balances four competing goals."
    },
    {
      "t": "diagram",
      "text": "            Quality\n               ▲\n              / \\\n             /   \\\n            /     \\\n Reliability     Speed\n            \\     /\n             \\   /\n              \\ /\n             Cost"
    },
    {
      "t": "p",
      "text": "Optimizing only one dimension rarely produces the best platform. Production engineering is the art of balancing all four."
    },
    {
      "t": "h3",
      "text": "The Architecture We Ended Up With"
    },
    {
      "t": "p",
      "text": "By the end of the project, cost engineering wasn't a separate activity. It was woven into the platform itself."
    },
    {
      "t": "diagram",
      "text": "                User Request\n                     │\n                     ▼\n             Orchestration Layer\n                     │\n          ├──────────┼──────────┐\n          ▼          ▼          ▼\n   Model Routing  Context Builder  Cache\n          │          │          │\n          └──────────┼──────────┘\n                     ▼\n          Specialized AI Agents\n                     │\n                     ▼\n     Validation & Retry Management\n                     │\n                     ▼\n      Cost Telemetry & Observability\n                     │\n                     ▼\n              Final Response"
    },
    {
      "t": "p",
      "text": "Notice what's missing. There isn't a separate \"cost optimization service.\" Cost awareness exists throughout the architecture. Every layer contributes."
    },
    {
      "t": "h3",
      "text": "The Five Principles of Cost Engineering"
    },
    {
      "t": "p",
      "text": "If I were designing another production AI platform tomorrow, these are the principles I'd adopt from the beginning."
    },
    {
      "t": "pull",
      "text": "1. Measure workflows—not requests"
    },
    {
      "t": "p",
      "text": "Users experience complete workflows. That's where costs should be measured."
    },
    {
      "t": "pull",
      "text": "2. Minimize unnecessary work"
    },
    {
      "t": "p",
      "text": "Reducing redundant context, retries, and repeated model calls usually produces greater savings than switching providers."
    },
    {
      "t": "pull",
      "text": "3. Match capability to complexity"
    },
    {
      "t": "p",
      "text": "Reserve your most capable models for problems that genuinely require advanced reasoning."
    },
    {
      "t": "pull",
      "text": "4. Treat token usage as engineering telemetry"
    },
    {
      "t": "p",
      "text": "Tokens reveal architectural inefficiencies, not just billing information. Use them to guide design decisions."
    },
    {
      "t": "pull",
      "text": "5. Optimize architecture before pricing"
    },
    {
      "t": "p",
      "text": "Changing providers might reduce costs. Reducing unnecessary computation changes the economics of the entire platform."
    },
    {
      "t": "h3",
      "text": "Final Thoughts"
    },
    {
      "t": "p",
      "text": "When I started building PHHM, I assumed cost optimization would mostly involve comparing model prices. Production taught me something very different. The largest savings rarely came from choosing a different model. They came from improving the architecture around the model. That meant:"
    },
    {
      "t": "list",
      "items": [
        "reducing unnecessary context",
        "avoiding redundant AI calls",
        "minimizing retries",
        "introducing intelligent routing",
        "caching repeatable work",
        "measuring workflow economics",
        "making cost visible to engineers"
      ]
    },
    {
      "t": "p",
      "text": "None of those changes made the platform less intelligent. They simply removed work that never needed to happen. That's why I no longer think about AI costs as a billing problem. I think about them as architectural feedback. Every unexpected increase in cost is the platform telling us it's doing more work than necessary. Listening to that feedback made PHHM faster, simpler, and more sustainable. And that's the biggest lesson I'd carry into every future AI platform."
    },
    {
      "t": "h3",
      "text": "Key Takeaways"
    },
    {
      "t": "code",
      "text": "If you're building production AI systems, I'd recommend adopting these practices from day one:"
    },
    {
      "t": "list",
      "items": [
        "Measure cost per workflow rather than per API request.",
        "Record token usage for every agent execution.",
        "Give each specialist only the context it actually needs.",
        "Route tasks to models based on complexity instead of using one model for everything.",
        "Cache repeatable results whenever possible.",
        "Investigate retries as engineering issues, not just cost issues.",
        "Monitor cost trends alongside latency and reliability.",
        "Include cost discussions in architecture reviews—not only finance meetings.",
        "Treat token usage as operational telemetry.",
        "Design platforms that perform less work rather than simply using cheaper models."
      ]
    }
  ]
} as ArticleData;

export default function CostEngineeringArticle() {
  return <ArticleShell article={article} />;
}
