"use client";

import ArticleShell, { type ArticleData } from "./ArticleShell";

const article = {
  "kicker": "PHHM Journal • Prompt Versioning",
  "focus": "Prompt Versioning",
  "icon": "commit",
  "title": "Prompt Versioning at Scale: How We Manage, Test, and Deploy AI Prompts in Production",
  "subtitle": "A production engineering deep dive from the PHHM platform.",
  "readTime": "15 min",
  "blocks": [
    {
      "t": "p",
      "text": "Why prompt engineering isn't enough once you have multiple AI agents in production."
    },
    {
      "t": "pull",
      "text": "Why this article will rank"
    },
    {
      "t": "p",
      "text": "Keywords:"
    },
    {
      "t": "list",
      "items": [
        "prompt versioning",
        "prompt management",
        "prompt engineering best practices",
        "AI prompt testing",
        "prompt lifecycle management",
        "production prompt engineering",
        "LLMOps",
        "AI regression testing"
      ]
    },
    {
      "t": "p",
      "text": "Competition is surprisingly low because most articles are theoretical. You'll be writing from actual production experience."
    },
    {
      "t": "p",
      "text": "Most developers think prompts are temporary. Write one. Paste it into your code. Ship. Repeat. That works... Until you have six AI agents. Then twelve."
    },
    {
      "t": "p",
      "text": "Then twenty. Suddenly you're no longer managing prompts. You're managing an entire AI platform. Every prompt update becomes a production deployment. Every wording change risks introducing regressions. Every new model behaves slightly differently. Every rollback becomes stressful. At that point, prompt engineering stops being an AI problem."
    },
    {
      "t": "p",
      "text": "It becomes a software engineering problem. That's exactly what happened while building **PHHM**. As the platform grew, we realized prompts weren't pieces of text anymore. They had become production assets. This article explains how we manage them like software."
    },
    {
      "t": "h3",
      "text": "Section 1"
    },
    {
      "t": "h2",
      "text": "The Problem Nobody Talks About"
    },
    {
      "t": "p",
      "text": "Imagine a normal backend application. Would you edit production code directly? Of course not. You would:"
    },
    {
      "t": "list",
      "items": [
        "version it",
        "test it",
        "review it",
        "deploy it",
        "monitor it"
      ]
    },
    {
      "t": "p",
      "text": "Yet many AI applications still update prompts like this."
    },
    {
      "t": "code",
      "text": "PROMPT = \"\"\"\nYou are a helpful assistant...\n\"\"\""
    },
    {
      "t": "p",
      "text": "One edit. One deployment. Hope for the best. That strategy collapses surprisingly quickly."
    },
    {
      "t": "h3",
      "text": "The First Symptom"
    },
    {
      "t": "p",
      "text": "Our first prompt looked innocent. It lived directly inside Python."
    },
    {
      "t": "code",
      "text": "PROMPT = \"\"\"\nSummarize this member report...\n\"\"\""
    },
    {
      "t": "p",
      "text": "Then we added another. Then another. Eventually every agent had multiple prompts. The repository became filled with files like: assistant.py care.py analyst.py communications.py"
    },
    {
      "t": "p",
      "text": "prompt_v2.py prompt_new.py prompt_final.py prompt_final_final.py"
    },
    {
      "t": "code",
      "text": "If you've ever named a file final_v7.py, you already know where this story ends."
    },
    {
      "t": "h3",
      "text": "The Breaking Point"
    },
    {
      "t": "p",
      "text": "One afternoon we changed a single sentence inside the Analyst prompt. The goal was simple. Improve summaries. Instead... The downstream Care Agent started generating poorer recommendations. Nothing was broken. Nothing crashed. The platform simply became worse."
    },
    {
      "t": "p",
      "text": "The problem wasn't the prompt. The problem was that we had no way to answer questions like:"
    },
    {
      "t": "list",
      "items": [
        "Which prompt version generated this output?",
        "When did it change?",
        "What else changed?",
        "Can we reproduce it?",
        "Can we roll it back?"
      ]
    },
    {
      "t": "p",
      "text": "That's when we realized we weren't missing better prompts. We were missing prompt lifecycle management."
    },
    {
      "t": "h3",
      "text": "Prompt Engineering Ends Here"
    },
    {
      "t": "p",
      "text": "One sentence changed how we thought about prompts forever."
    },
    {
      "t": "pull",
      "text": "If changing a prompt can change production behavior, then prompts deserve the same engineering discipline as source code."
    },
    {
      "t": "p",
      "text": "Everything after that became obvious. Prompts needed:"
    },
    {
      "t": "list",
      "items": [
        "version numbers",
        "testing",
        "reviews",
        "deployments",
        "rollback strategies",
        "monitoring"
      ]
    },
    {
      "t": "p",
      "text": "Exactly like software."
    },
    {
      "t": "h3",
      "text": "Prompts Belong Outside Your Code"
    },
    {
      "t": "p",
      "text": "One of the first architectural changes we made was separating prompts from Python."
    },
    {
      "t": "p",
      "text": "Instead of this:"
    },
    {
      "t": "diagram",
      "text": "SYSTEM_PROMPT = \"\"\"\n...\n\"\"\""
    },
    {
      "t": "p",
      "text": "We moved to this."
    },
    {
      "t": "code",
      "text": "config/"
    },
    {
      "t": "p",
      "text": "agents/ prompts/ analyst.md care.md communications.md welcome.md overseer.md Python stopped owning prompts."
    },
    {
      "t": "p",
      "text": "The orchestration layer simply loaded them. This one decision dramatically simplified future development."
    },
    {
      "t": "pull",
      "text": "Why Markdown?"
    },
    {
      "t": "p",
      "text": "We deliberately chose Markdown. Not JSON. Not YAML. Markdown. Why? Because prompts are documentation. They're instructions. Engineers can edit them."
    },
    {
      "t": "p",
      "text": "Product owners can read them. Domain experts can review them. The file becomes both executable configuration and living documentation. That dramatically reduced communication overhead during development."
    },
    {
      "t": "h2",
      "text": "Introducing the Prompt Registry"
    },
    {
      "t": "p",
      "text": "Instead of hardcoding prompt locations, every agent registers itself."
    },
    {
      "t": "code",
      "text": "agents:\n\nanalyst:"
    },
    {
      "t": "p",
      "text": "prompt: prompts/analyst.md"
    },
    {
      "t": "code",
      "text": "version: 2.4.1\n\nmodel: gpt-4.1\n\ntemperature: 0.2"
    },
    {
      "t": "p",
      "text": "Now the orchestrator doesn't care where prompts live. It asks the registry. The registry answers. That small abstraction made prompt management dramatically easier."
    },
    {
      "t": "h3",
      "text": "Why a Registry Matters"
    },
    {
      "t": "p",
      "text": "Imagine introducing another specialist. Without a registry:"
    },
    {
      "t": "list",
      "items": [
        "edit Python",
        "edit routing",
        "edit imports",
        "redeploy"
      ]
    },
    {
      "t": "p",
      "text": "With a registry:"
    },
    {
      "t": "list",
      "items": [
        "create prompt",
        "register agent",
        "restart"
      ]
    },
    {
      "t": "p",
      "text": "The orchestration engine discovers it automatically. That's a much cleaner architecture."
    },
    {
      "t": "h3",
      "text": "Every Prompt Gets a Version"
    },
    {
      "t": "p",
      "text": "We stopped naming files: prompt_new.md prompt_new2.md prompt_latest.md Instead: Analyst 2.1.0 2.2.0"
    },
    {
      "t": "p",
      "text": "2.3.0 2.4.0 2.4.1 Semantic versioning suddenly became useful for prompts. Major versions changed behavior. Minor versions improved instructions. Patch versions fixed wording. Exactly like software releases."
    },
    {
      "t": "h3",
      "text": "The Biggest Mindset Shift"
    },
    {
      "t": "p",
      "text": "Looking back... The biggest lesson wasn't about prompts at all. It was this."
    },
    {
      "t": "pull",
      "text": "Prompts are not instructions. Prompts are production dependencies."
    },
    {
      "t": "p",
      "text": "Once you accept that, every engineering decision changes."
    },
    {
      "t": "h3",
      "text": "Building a Prompt Registry"
    },
    {
      "t": "p",
      "text": "Once prompts became first-class assets, we needed a way to manage them. Hardcoding prompt locations across the application wasn't sustainable. Instead, every prompt is registered through a central configuration. Rather than asking:"
    },
    {
      "t": "code",
      "text": "\"Where is the Analyst prompt?\""
    },
    {
      "t": "p",
      "text": "The orchestration layer asks:"
    },
    {
      "t": "code",
      "text": "\"What does the Prompt Registry know about the Analyst?\""
    },
    {
      "t": "p",
      "text": "That small distinction removes dozens of hardcoded dependencies."
    },
    {
      "t": "h3",
      "text": "A Single Source of Truth"
    },
    {
      "t": "p",
      "text": "Every agent has one configuration entry."
    },
    {
      "t": "code",
      "text": "agents:\n\n  analyst:\n    prompt: prompts/analyst.md\n    version: 2.4.1\n    model: gpt-4.1\n    temperature: 0.2\n\n  care:\n    prompt: prompts/care.md\n    version: 1.8.0\n    model: gpt-4.1\n    temperature: 0.3\n\n  communications:\n    prompt: prompts/communications.md\n    version: 3.1.2\n    model: gpt-4.1\n    temperature: 0.6"
    },
    {
      "t": "p",
      "text": "Notice that the orchestrator doesn't need to know where prompts live. It only knows how to ask the registry. That separation dramatically reduced coupling throughout the platform."
    },
    {
      "t": "h3",
      "text": "Loading Prompts Dynamically"
    },
    {
      "t": "p",
      "text": "When the application starts, the registry loads every configured prompt. A simplified version looks like this."
    },
    {
      "t": "code",
      "text": "from pathlib import Path\nimport yaml\n\nwith open(\"agents.yaml\") as f:\n    registry = yaml.safe_load(f)\n\ndef load_prompt(agent_name):\n\n    prompt_path = Path(\n        registry[\"agents\"][agent_name][\"prompt\"]\n    )\n\n    return prompt_path.read_text()"
    },
    {
      "t": "p",
      "text": "Now the orchestrator can retrieve prompts dynamically."
    },
    {
      "t": "code",
      "text": "prompt = load_prompt(\"analyst\")"
    },
    {
      "t": "p",
      "text": "Adding another agent no longer requires modifying orchestration logic. Register. Load. Execute."
    },
    {
      "t": "h3",
      "text": "Why This Scales Better"
    },
    {
      "t": "p",
      "text": "Imagine introducing a brand-new specialist. Without a registry:"
    },
    {
      "t": "list",
      "items": [
        "create prompt",
        "edit Python",
        "edit imports",
        "update routing",
        "redeploy"
      ]
    },
    {
      "t": "p",
      "text": "With a registry:"
    },
    {
      "t": "list",
      "items": [
        "create prompt",
        "add YAML entry",
        "restart"
      ]
    },
    {
      "t": "p",
      "text": "That's it. The orchestrator discovers the new prompt automatically. As the number of agents grows, this difference becomes enormous."
    },
    {
      "t": "h3",
      "text": "Prompt Metadata Matters"
    },
    {
      "t": "p",
      "text": "The prompt itself isn't enough. Every prompt also carries metadata."
    },
    {
      "t": "code",
      "text": "analyst:\n\n  version: 2.4.1\n\n  owner: analytics-team\n\n  model: gpt-4.1\n\n  temperature: 0.2\n\n  max_tokens: 2000\n\n  updated: 2026-06-12"
    },
    {
      "t": "p",
      "text": "This might seem excessive. Until six months later when someone asks:"
    },
    {
      "t": "code",
      "text": "\"Which version generated this report?\""
    },
    {
      "t": "p",
      "text": "Now you know immediately."
    },
    {
      "t": "h3",
      "text": "Every Execution Records Its Prompt"
    },
    {
      "t": "p",
      "text": "One practice paid for itself almost immediately. Every workflow records exactly which prompt produced the output."
    },
    {
      "t": "code",
      "text": "{\n  \"execution_id\": \"9d4ab...\",\n\n  \"agent\": \"analyst\",\n\n  \"prompt_version\": \"2.4.1\",\n\n  \"model\": \"gpt-4.1\"\n}"
    },
    {
      "t": "p",
      "text": "Months later, if a regression appears, engineers don't guess. They trace it directly to the responsible prompt version. That makes debugging dramatically easier."
    },
    {
      "t": "h3",
      "text": "Prompt Reviews"
    },
    {
      "t": "p",
      "text": "One mistake we made early was updating prompts without peer review. The changes seemed harmless. Move a paragraph. Reword an instruction. Delete an example. Sometimes those tiny edits completely changed model behaviour. Today every prompt update goes through the same review process as application code. Every pull request answers four questions."
    },
    {
      "t": "pull",
      "text": "What changed?"
    },
    {
      "t": "p",
      "text": "Exactly which instructions were modified?"
    },
    {
      "t": "pull",
      "text": "Why?"
    },
    {
      "t": "p",
      "text": "What problem does this solve?"
    },
    {
      "t": "pull",
      "text": "How was it tested?"
    },
    {
      "t": "p",
      "text": "Which evaluation datasets were used?"
    },
    {
      "t": "pull",
      "text": "What improved?"
    },
    {
      "t": "p",
      "text": "Latency? Accuracy? Validation rate? Token usage? Without those answers, the prompt doesn't ship."
    },
    {
      "t": "h2",
      "text": "Regression Testing Prompts"
    },
    {
      "t": "p",
      "text": "Traditional applications use unit tests. Prompt-driven systems need behavioural tests. Suppose the Analyst Agent summarizes reports. Instead of comparing strings, we compare outcomes."
    },
    {
      "t": "diagram",
      "text": "Regression Dataset\n        │\n        ▼\n Execute Prompt\n        │\n        ▼\nEvaluate Behaviour\n        │\n        ▼\n PASS / FAIL"
    },
    {
      "t": "p",
      "text": "The wording doesn't have to match. The behaviour does."
    },
    {
      "t": "h3",
      "text": "Behaviour Beats Exact Text"
    },
    {
      "t": "p",
      "text": "Large language models are intentionally nondeterministic. The same prompt can produce different wording every time. Testing exact strings creates brittle tests. Instead, we evaluate questions like:"
    },
    {
      "t": "list",
      "items": [
        "Did it identify every risk?",
        "Did it recommend appropriate follow-ups?",
        "Were all required sections included?",
        "Did it violate business rules?",
        "Was the confidence score acceptable?"
      ]
    },
    {
      "t": "p",
      "text": "That's what production users actually care about."
    },
    {
      "t": "h3",
      "text": "Building an Evaluation Dataset"
    },
    {
      "t": "p",
      "text": "Every specialist maintains representative examples. For the Analyst Agent, a simplified dataset might look like this."
    },
    {
      "t": "table",
      "headers": [
        "Input",
        "Expected Behaviour"
      ],
      "rows": [
        [
          "New member profile",
          "Produce structured summary"
        ],
        [
          "High-risk member",
          "Flag elevated risk"
        ],
        [
          "Missing information",
          "Request clarification"
        ],
        [
          "Duplicate member",
          "Detect duplicate"
        ],
        [
          "Invalid dates",
          "Reject malformed input"
        ]
      ]
    },
    {
      "t": "p",
      "text": "These examples become regression tests. Every prompt update must pass them before deployment."
    },
    {
      "t": "h3",
      "text": "Prompt Changes Should Earn Their Place"
    },
    {
      "t": "p",
      "text": "One rule became surprisingly important."
    },
    {
      "t": "pull",
      "text": "Every prompt change must improve at least one measurable outcome."
    },
    {
      "t": "p",
      "text": "That might be:"
    },
    {
      "t": "list",
      "items": [
        "lower token usage",
        "fewer retries",
        "higher validation success",
        "shorter latency",
        "better recommendations"
      ]
    },
    {
      "t": "p",
      "text": "If nothing measurable improves, the change probably doesn't belong in production."
    },
    {
      "t": "h3",
      "text": "Prompt Drift Is Real"
    },
    {
      "t": "p",
      "text": "One danger we didn't expect was prompt drift. Over time, prompts naturally accumulate new instructions."
    },
    {
      "t": "diagram",
      "text": "Version 1\n↓\nAdd onboarding rule\n↓\nAdd formatting rule\n↓\nAdd exception\n↓\nAdd edge case\n↓\nAdd another example\n↓\nPrompt doubles in size"
    },
    {
      "t": "p",
      "text": "Nothing seems wrong. Until latency increases. Costs rise. Responses become inconsistent. Prompt reviews aren't only about adding instructions. They're also about removing unnecessary ones."
    },
    {
      "t": "h3",
      "text": "Smaller Prompts Usually Win"
    },
    {
      "t": "p",
      "text": "One surprising lesson from PHHM was that longer prompts weren't always better. In fact, some of our best improvements came from deleting instructions. Every unnecessary sentence creates another opportunity for the model to lose focus. Our review process regularly asks:"
    },
    {
      "t": "list",
      "items": [
        "Can this instruction move into validation?",
        "Should this become configuration?",
        "Does another agent already own this responsibility?",
        "Is this instruction still necessary?"
      ]
    },
    {
      "t": "p",
      "text": "Prompt quality often improves through subtraction. Not addition."
    },
    {
      "t": "h3",
      "text": "The Engineering Mindset"
    },
    {
      "t": "p",
      "text": "Looking back, prompt engineering wasn't really the challenge. Prompt management was. Once prompts became versioned, testable, reviewable, observable, and deployable, they stopped behaving like experimental text files. They became production software assets. And we started treating them that way."
    },
    {
      "t": "h3",
      "text": "Deploying Prompts Without Breaking Production"
    },
    {
      "t": "p",
      "text": "Writing a better prompt is only half the job. The harder question is:"
    },
    {
      "t": "pull",
      "text": "How do you know it's actually better?"
    },
    {
      "t": "p",
      "text": "Changing one sentence in a prompt can alter how an entire workflow behaves. Sometimes that's exactly what you wanted. Sometimes it quietly introduces regressions that nobody notices until customers do. That's why we stopped thinking about prompt updates as edits. We started treating them as **releases**."
    },
    {
      "t": "h3",
      "text": "The Cost of a Bad Prompt"
    },
    {
      "t": "p",
      "text": "Traditional software usually fails loudly. An exception is thrown. A service crashes. Monitoring alerts the engineering team. Prompt failures are different. Most fail silently. The application still works. Responses still look reasonable."
    },
    {
      "t": "p",
      "text": "But quality slowly declines. Recommendations become less accurate. Validation retries increase. Token usage grows. Latency creeps upward. Nothing is obviously broken. Everything is slightly worse. Those are the hardest production problems to detect."
    },
    {
      "t": "h3",
      "text": "Progressive Rollouts"
    },
    {
      "t": "p",
      "text": "Software teams rarely deploy a major release to every customer at once. Neither should AI systems. Instead of switching every request to a new prompt immediately, PHHM rolls prompts out gradually."
    },
    {
      "t": "diagram",
      "text": "Version 2.3\n      │\n      ▼\n 5% of Requests\n      │\n      ▼\n25% of Requests\n      │\n      ▼\n50% of Requests\n      │\n      ▼\n100% of Requests"
    },
    {
      "t": "p",
      "text": "Each stage provides an opportunity to observe behaviour before increasing traffic. If something unexpected happens, the rollout stops. Not the platform. The rollout."
    },
    {
      "t": "h3",
      "text": "Canary Releases for Prompts"
    },
    {
      "t": "p",
      "text": "One strategy borrowed directly from software engineering is the **canary deployment**. Instead of exposing every user to a new prompt, only a small percentage of requests use it."
    },
    {
      "t": "code",
      "text": "if random.random() < 0.05:\n    prompt_version = \"2.5.0\"\nelse:\n    prompt_version = \"2.4.1\""
    },
    {
      "t": "p",
      "text": "Now both prompt versions run simultaneously. That allows direct comparison under real production traffic. No synthetic benchmarks. No hypothetical scenarios. Real users. Real workflows. Real outcomes."
    },
    {
      "t": "h3",
      "text": "Measuring Before Promoting"
    },
    {
      "t": "p",
      "text": "A rollout shouldn't continue because \"the prompt feels better.\" It should continue because the data says it should. For every deployment we monitor:"
    },
    {
      "t": "table",
      "headers": [
        "Metric",
        "Why It Matters"
      ],
      "rows": [
        [
          "Validation Success Rate",
          "Is the prompt producing usable outputs?"
        ],
        [
          "Retry Rate",
          "Are more requests failing validation?"
        ],
        [
          "Average Latency",
          "Has execution become slower?"
        ],
        [
          "Token Consumption",
          "Is the prompt becoming more expensive?"
        ],
        [
          "Human Corrections",
          "Are users editing responses more often?"
        ],
        [
          "Workflow Completion",
          "Are more workflows reaching completion?"
        ]
      ]
    },
    {
      "t": "p",
      "text": "If those metrics improve—or at least remain stable—the rollout continues. If they don't, we stop."
    },
    {
      "t": "h3",
      "text": "A/B Testing Prompt Variations"
    },
    {
      "t": "p",
      "text": "Sometimes two prompts both perform well. The question becomes:"
    },
    {
      "t": "pull",
      "text": "Which one performs better?"
    },
    {
      "t": "p",
      "text": "Instead of guessing, PHHM can evaluate multiple prompt versions simultaneously."
    },
    {
      "t": "diagram",
      "text": "Incoming Request\n        │\n        ▼\nRandom Assignment\n   ┌──────────────┐\n   │              │\n   ▼              ▼\nPrompt A      Prompt B\n   │              │\n   └──────┬───────┘\n          ▼\n    Compare Metrics"
    },
    {
      "t": "p",
      "text": "The winning prompt isn't the one engineers prefer. It's the one that consistently produces better outcomes."
    },
    {
      "t": "h3",
      "text": "Success Isn't One Metric"
    },
    {
      "t": "p",
      "text": "One mistake we made early was optimizing for a single number. For example: Lower token usage. The prompt became cheaper. Unfortunately... Validation failures increased. The \"better\" prompt actually made the platform worse. Prompt quality is multi-dimensional."
    },
    {
      "t": "p",
      "text": "A successful deployment balances:"
    },
    {
      "t": "list",
      "items": [
        "accuracy",
        "latency",
        "reliability",
        "cost",
        "maintainability"
      ]
    },
    {
      "t": "p",
      "text": "Optimizing one while ignoring the others usually creates new problems."
    },
    {
      "t": "h3",
      "text": "Rollbacks Should Take Seconds"
    },
    {
      "t": "p",
      "text": "Every engineer eventually experiences a bad deployment. The question isn't whether it will happen. It's whether recovery is easy. Prompt rollbacks should never require editing files in production. Instead, the orchestrator simply switches versions."
    },
    {
      "t": "code",
      "text": "analyst:"
    },
    {
      "t": "p",
      "text": "current: 2.4.1"
    },
    {
      "t": "code",
      "text": "available:"
    },
    {
      "t": "list",
      "items": [
        "2.3.8",
        "2.4.0",
        "2.4.1"
      ]
    },
    {
      "t": "p",
      "text": "rollback: 2.3.8 If the latest deployment underperforms, changing one configuration value restores the previous version. No emergency patch. No code deployment. No late-night debugging session. Just a controlled rollback."
    },
    {
      "t": "h3",
      "text": "Every Deployment Leaves an Audit Trail"
    },
    {
      "t": "p",
      "text": "Every prompt release answers three questions."
    },
    {
      "t": "pull",
      "text": "Who deployed it? When was it deployed? Why was it changed?"
    },
    {
      "t": "p",
      "text": "A deployment log might look like this. Prompt: Analyst"
    },
    {
      "t": "code",
      "text": "Version:\n2.5.0"
    },
    {
      "t": "p",
      "text": "Released: 2026-07-04 Reason: Improve risk classification. Approved By: Engineering Lead Status: Canary Deployment (5%) Months later, every change still has context. That makes debugging dramatically easier."
    },
    {
      "t": "h3",
      "text": "Monitoring After Deployment"
    },
    {
      "t": "p",
      "text": "Deployment isn't the finish line. It's the beginning of observation. For the first few hours after a release, dashboards become more important than code. We watch for:"
    },
    {
      "t": "list",
      "items": [
        "unusual latency spikes",
        "increased retry rates",
        "validation failures",
        "higher token usage",
        "unexpected routing changes"
      ]
    },
    {
      "t": "p",
      "text": "Sometimes the prompt is technically correct but operationally expensive. Other times it improves quality while introducing subtle delays. Without monitoring, those trade-offs remain invisible."
    },
    {
      "t": "h3",
      "text": "Feature Flags for Prompts"
    },
    {
      "t": "p",
      "text": "One of the simplest improvements we made was treating prompts like feature flags. Instead of permanently assigning a prompt version, the orchestrator resolves it dynamically."
    },
    {
      "t": "code",
      "text": "prompt = registry.get(\n    agent=\"analyst\",\n    feature_flag=\"new-risk-analysis\"\n)"
    },
    {
      "t": "p",
      "text": "That flexibility allows engineering teams to:"
    },
    {
      "t": "list",
      "items": [
        "enable prompts for internal users",
        "expose new behaviour to beta testers",
        "disable experiments instantly",
        "compare multiple prompt strategies"
      ]
    },
    {
      "t": "p",
      "text": "Prompt experimentation becomes safe because it's reversible."
    },
    {
      "t": "h3",
      "text": "Deployment Is an Engineering Discipline"
    },
    {
      "t": "p",
      "text": "Looking back, the biggest mindset shift wasn't technical. It was operational. We stopped asking:"
    },
    {
      "t": "code",
      "text": "\"Is this a better prompt?\""
    },
    {
      "t": "p",
      "text": "We started asking:"
    },
    {
      "t": "code",
      "text": "\"Is this prompt safe to deploy?\""
    },
    {
      "t": "p",
      "text": "Those are completely different questions. One focuses on quality. The other focuses on reliability. Production systems need both."
    },
    {
      "t": "h3",
      "text": "What We Learned"
    },
    {
      "t": "code",
      "text": "If I had to summarize prompt deployments in one sentence, it would be this:"
    },
    {
      "t": "pull",
      "text": "Never deploy a prompt you can't measure, and never measure a prompt you can't roll back."
    },
    {
      "t": "p",
      "text": "Versioning. Testing. Canary releases. Feature flags. Monitoring. Rollback. None of these ideas are new. Software engineering has relied on them for decades."
    },
    {
      "t": "p",
      "text": "The mistake is assuming AI systems somehow don't need them. They do. Perhaps even more than traditional applications."
    },
    {
      "t": "h3",
      "text": "Prompt Architecture: Designing for Growth, Not Just Today"
    },
    {
      "t": "p",
      "text": "One lesson became painfully obvious as PHHM grew. Managing prompts isn't difficult when you have three. It's difficult when you have thirty. Or sixty. Or one hundred. At that point, the challenge isn't writing prompts. It's organizing them. The same way software projects eventually outgrow a single app.py, AI systems eventually outgrow a single prompts/ folder."
    },
    {
      "t": "p",
      "text": "Prompt architecture becomes just as important as prompt engineering."
    },
    {
      "t": "h3",
      "text": "Organizing Prompts Like Software"
    },
    {
      "t": "p",
      "text": "Early on, our project looked something like this. project/ prompts/ prompt.md prompt2.md prompt_new.md prompt_final.md prompt_final_final.md"
    },
    {
      "t": "p",
      "text": "If you've worked on enough projects, you've probably smiled at that last filename. It usually appears right before technical debt. As more agents were added, we reorganized everything around domains instead of files. project/"
    },
    {
      "t": "code",
      "text": "config/\n    agents.yaml"
    },
    {
      "t": "p",
      "text": "prompts/"
    },
    {
      "t": "code",
      "text": "    analyst/\n        system.md\n        examples.md\n        constraints.md\n\n    care/\n        system.md\n        examples.md\n        constraints.md\n\n    communications/\n        system.md\n        examples.md\n\n    welcome/\n        system.md\n\n    overseer/\n        system.md"
    },
    {
      "t": "p",
      "text": "Now every specialist owns its own directory. Responsibilities stay together. Finding the right prompt takes seconds instead of minutes."
    },
    {
      "t": "h3",
      "text": "Separate Instructions From Examples"
    },
    {
      "t": "p",
      "text": "One mistake we made early was placing everything inside one enormous prompt. Instructions. Examples. Formatting. Business rules. Everything. That quickly became difficult to maintain. Instead, each prompt is assembled from smaller components."
    },
    {
      "t": "p",
      "text": "system.md + examples.md + constraints.md +"
    },
    {
      "t": "diagram",
      "text": "organization.md\n↓\nFinal Prompt"
    },
    {
      "t": "p",
      "text": "This modular approach gives us several advantages. Updating examples no longer risks changing system instructions. Business rules evolve independently. Domain-specific knowledge remains isolated. Most importantly, prompts become reusable."
    },
    {
      "t": "h3",
      "text": "Treat Prompt Components Like Building Blocks"
    },
    {
      "t": "p",
      "text": "Instead of copying instructions between agents, we compose them. For example, every specialist shares a common set of organizational rules."
    },
    {
      "t": "diagram",
      "text": "Common Rules\n↓\nSecurity Rules\n↓\nOutput Formatting\n↓\nAgent Instructions\n↓\nExamples"
    },
    {
      "t": "p",
      "text": "The orchestrator assembles these pieces before sending the request to the model. That means changing one shared rule automatically updates every relevant agent. Less duplication. Less drift. Less maintenance."
    },
    {
      "t": "h3",
      "text": "Every Prompt Has an Owner"
    },
    {
      "t": "p",
      "text": "As the number of prompts increased, another question emerged."
    },
    {
      "t": "pull",
      "text": "Who is responsible for each one?"
    },
    {
      "t": "p",
      "text": "Ownership matters. Without it, prompts become everyone's responsibility. Which usually means nobody owns them. Each PHHM prompt records metadata such as:"
    },
    {
      "t": "code",
      "text": "analyst:\n\n  owner: analytics-team\n\n  reviewer: engineering\n\n  version: 2.4.1\n\n  last_updated: 2026-06-12"
    },
    {
      "t": "p",
      "text": "If an issue appears, there's no guessing. The ownership is explicit."
    },
    {
      "t": "h3",
      "text": "Naming Matters More Than You Think"
    },
    {
      "t": "p",
      "text": "One surprisingly valuable improvement came from naming prompts consistently. Instead of: prompt_v2.md prompt_latest.md assistant_new.md Every prompt follows the same convention. analyst/system.md analyst/examples.md"
    },
    {
      "t": "p",
      "text": "care/system.md communications/system.md welcome/system.md Simple names reduce cognitive overhead. Engineers shouldn't have to remember where things live. The structure should make it obvious."
    },
    {
      "t": "h3",
      "text": "Documentation Is Part of the Prompt"
    },
    {
      "t": "p",
      "text": "Every prompt includes a short header explaining:"
    },
    {
      "t": "list",
      "items": [
        "its purpose",
        "expected inputs",
        "expected outputs",
        "owner",
        "current version",
        "related workflows"
      ]
    },
    {
      "t": "p",
      "text": "For example: # Analyst Agent Purpose: Summarize member information. Inputs: Structured member profile. Outputs: Validated analysis object. Owner: Analytics Team"
    },
    {
      "t": "code",
      "text": "Version:\n2.4.1"
    },
    {
      "t": "p",
      "text": "Six months later, new team members can understand the prompt without reading thousands of lines of application code. Documentation isn't an afterthought. It's part of the architecture."
    },
    {
      "t": "h3",
      "text": "Avoid Prompt Duplication"
    },
    {
      "t": "p",
      "text": "Duplicated prompts create hidden maintenance costs. Suppose two agents share the same formatting instructions. Copying those instructions into both prompts feels harmless. Until one changes. Now they're inconsistent. Instead, PHHM treats shared instructions as reusable components. One source. Many consumers."
    },
    {
      "t": "p",
      "text": "It's the same principle software engineers use with shared libraries."
    },
    {
      "t": "h3",
      "text": "Design for Replacement"
    },
    {
      "t": "p",
      "text": "One question guided almost every architectural decision."
    },
    {
      "t": "pull",
      "text": "Could we replace this prompt tomorrow without changing the rest of the system?"
    },
    {
      "t": "p",
      "text": "If the answer was no... The coupling was probably too tight. The orchestrator shouldn't care what the Analyst prompt says. It should only care that the Analyst produces a valid contract. That's a subtle but important distinction. Interfaces matter more than implementations."
    },
    {
      "t": "h3",
      "text": "The Five Principles That Changed Everything"
    },
    {
      "t": "p",
      "text": "Looking back, nearly every design decision followed one of five principles."
    },
    {
      "t": "pull",
      "text": "1. Prompts are configuration."
    },
    {
      "t": "p",
      "text": "Keep them outside application code."
    },
    {
      "t": "pull",
      "text": "2. Every prompt is versioned."
    },
    {
      "t": "p",
      "text": "If it changes, it needs history."
    },
    {
      "t": "pull",
      "text": "3. Every prompt is testable."
    },
    {
      "t": "p",
      "text": "Don't trust changes that haven't been evaluated."
    },
    {
      "t": "pull",
      "text": "4. Every prompt is observable."
    },
    {
      "t": "p",
      "text": "If you can't measure it, you can't improve it."
    },
    {
      "t": "pull",
      "text": "5. Every prompt is replaceable."
    },
    {
      "t": "p",
      "text": "Design interfaces, not dependencies. Together, these principles transformed prompts from experimental text files into maintainable production assets."
    },
    {
      "t": "h3",
      "text": "From Prompt Engineering to AI Engineering"
    },
    {
      "t": "p",
      "text": "When people ask what changed most during the development of PHHM, they usually expect a discussion about models. GPT-4. Reasoning models. Context windows. Temperature settings. Those things matter. But they weren't the biggest lessons. The biggest shift was realizing that success depended far more on **engineering discipline** than on prompt wording."
    },
    {
      "t": "p",
      "text": "The platform became more reliable because we:"
    },
    {
      "t": "list",
      "items": [
        "versioned prompts",
        "tested behavior",
        "validated outputs",
        "measured performance",
        "monitored deployments",
        "simplified architecture"
      ]
    },
    {
      "t": "p",
      "text": "The prompts improved too. But the system improved even more."
    },
    {
      "t": "h3",
      "text": "Final Thoughts"
    },
    {
      "t": "p",
      "text": "Prompt engineering is an important skill. It's often the first step in building AI applications. But it isn't the final step. As soon as an application moves beyond a prototype, prompts become production assets. They deserve the same care we already give to source code, APIs, database schemas, and infrastructure. Version them. Review them. Test them."
    },
    {
      "t": "p",
      "text": "Deploy them gradually. Measure their impact. Roll them back safely. Because the future of AI engineering isn't about writing clever prompts. It's about building reliable systems that can evolve confidently over time."
    },
    {
      "t": "h3",
      "text": "Key Takeaways"
    },
    {
      "t": "code",
      "text": "If you're building production AI systems, these are the practices I'd adopt from day one:"
    },
    {
      "t": "list",
      "items": [
        "Store prompts outside your application code.",
        "Use a central registry to manage prompt configuration.",
        "Version every prompt with semantic versioning.",
        "Test behavior instead of exact wording.",
        "Roll out prompt updates gradually.",
        "Monitor latency, quality, and validation metrics.",
        "Make rollbacks simple and predictable.",
        "Organize prompts by responsibility, not by convenience.",
        "Treat prompts as software assets—not temporary text files."
      ]
    },
    {
      "t": "h3",
      "text": "What's Next in the Series"
    },
    {
      "t": "p",
      "text": "In the first article, we explored **how six specialized agents collaborate through a central orchestration layer**. In this article, we looked at **how those agents' prompts are managed, tested, versioned, and deployed safely in production**. Next, we'll go one level deeper into the foundation that ties both ideas together:"
    },
    {
      "t": "h3",
      "text": "Configuration-Driven AI: Why YAML Beats Hardcoded Prompts in Production"
    },
    {
      "t": "p",
      "text": "We'll explore how PHHM uses configuration to define agents, routing, permissions, models, prompt locations, feature flags, and workflows—allowing the platform to evolve without constantly modifying application code. Because once your AI platform reaches production, the biggest competitive advantage isn't having the smartest model. It's having the architecture that lets you improve it continuously."
    },
    {
      "t": "h3",
      "text": "Final Reflection"
    },
    {
      "t": "p",
      "text": "When we started PHHM, we thought we were building better prompts. Looking back, we were building something much bigger. We were building an operating system for AI collaboration. The prompts mattered. The models mattered. But the real breakthrough came from treating AI systems with the same engineering discipline we've spent decades applying to every other piece of production software."
    },
    {
      "t": "pull",
      "text": "That's the difference between an AI demo that impresses people today and an AI platform that's still reliable a year from now."
    }
  ]
} as ArticleData;

export default function PromptVersioningArticle() {
  return <ArticleShell article={article} />;
}
