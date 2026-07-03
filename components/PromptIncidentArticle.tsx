"use client";

import ArticleShell, { type ArticleData } from "./ArticleShell";

const article = {
  "kicker": "PHHM Journal • Post-Mortem",
  "focus": "Post-Mortem",
  "icon": "siren",
  "title": "The Production Incident That Changed How We Deploy AI Prompts",
  "subtitle": "A post-mortem on the single sentence that quietly degraded our Care Agent—and the engineering practices we built to ensure it never happened again.",
  "readTime": "14 min",
  "blocks": [
    {
      "t": "p",
      "text": "One of the most important incidents in PHHM never triggered an alert. No exceptions were thrown. No APIs went offline. No dashboards turned red. Every workflow completed successfully. Every validation rule passed. Latency remained stable. Infrastructure looked healthy."
    },
    {
      "t": "p",
      "text": "If you had opened our monitoring dashboard that morning, you would have assumed everything was working perfectly. It wasn't. Over the following days, our Care Agent gradually began producing weaker recommendations. Nothing was obviously wrong. The advice wasn't incorrect. It was simply… less useful. More generic. Less actionable."
    },
    {
      "t": "p",
      "text": "Enough to reduce the quality of the platform without ever making it unusable. At first we blamed the model. Then we blamed randomness. Then we blamed prompt variability. Eventually we discovered the real cause. A single sentence had changed in the Analyst Agent's prompt. That tiny edit quietly altered the structure and emphasis of the Analyst's recommendations. Those recommendations still passed schema validation."
    },
    {
      "t": "p",
      "text": "They still satisfied business rules. But they subtly changed the inputs consumed by the Care Agent. Nothing crashed. The platform simply became slightly worse. That incident fundamentally changed how we deploy AI. Today, prompts in PHHM move through the same engineering process as application code—with version control, pull requests, automated regression testing, staged rollouts, feature flags, and rollback strategies. Because production AI doesn't only fail through errors. Sometimes it fails through **behavioural drift**."
    },
    {
      "t": "h3",
      "text": "The Incident"
    },
    {
      "t": "p",
      "text": "The deployment itself was routine. We wanted the Analyst Agent to write recommendations that sounded a little more conversational. The original prompt encouraged concise recommendations. The revised version encouraged additional context so that downstream users could better understand the reasoning behind each recommendation. During review, everyone preferred the new output. It felt clearer. It felt more natural. It felt more helpful."
    },
    {
      "t": "p",
      "text": "Regression testing wasn't yet part of our deployment process. Manual review was enough. So we approved the change. The prompt went live. Nothing appeared to happen."
    },
    {
      "t": "h3",
      "text": "Everything Looked Healthy"
    },
    {
      "t": "p",
      "text": "Over the next several days, every operational metric remained healthy. Our dashboards showed:"
    },
    {
      "t": "table",
      "headers": [
        "Metric",
        "Status"
      ],
      "rows": [
        [
          "API Availability",
          "✅ Healthy"
        ],
        [
          "Workflow Completion",
          "✅ Normal"
        ],
        [
          "Validation Success",
          "✅ Stable"
        ],
        [
          "Retry Rate",
          "✅ Unchanged"
        ],
        [
          "Average Latency",
          "✅ Normal"
        ],
        [
          "Infrastructure",
          "✅ Healthy"
        ]
      ]
    },
    {
      "t": "p",
      "text": "If we'd stopped there, we would have declared the deployment a success. But users don't experience dashboards. They experience workflows."
    },
    {
      "t": "h3",
      "text": "The First Clue"
    },
    {
      "t": "p",
      "text": "The first indication came during a routine review of completed workflows. Several Care recommendations felt unusually broad. Nothing violated validation. Nothing contradicted business rules. Nothing would have triggered an alert. Yet something felt different. The recommendations contained more explanation... ...and less prioritization."
    },
    {
      "t": "p",
      "text": "Instead of producing focused actions, the Care Agent increasingly generated comprehensive—but less decisive—responses. The platform still worked. It simply became slightly less effective. Those are the hardest failures to detect because traditional monitoring isn't designed to measure quality drift."
    },
    {
      "t": "h3",
      "text": "The Most Dangerous AI Failures Don't Crash"
    },
    {
      "t": "p",
      "text": "That incident forced us to rethink how AI systems fail. Traditional software usually fails loudly."
    },
    {
      "t": "diagram",
      "text": "Request\n↓\nException\n↓\nAlert\n↓\nEngineer Responds"
    },
    {
      "t": "p",
      "text": "AI systems often fail differently."
    },
    {
      "t": "diagram",
      "text": "Prompt Change\n↓\nWorkflow Completes\n↓\nOutput Quality Drifts\n↓\nUsers Adapt\n↓\nEngineers Notice Later"
    },
    {
      "t": "p",
      "text": "Everything technically succeeds. The platform just slowly becomes worse. That's a fundamentally different operational challenge."
    },
    {
      "t": "h3",
      "text": "Behavioural Drift Is an Engineering Problem"
    },
    {
      "t": "p",
      "text": "Looking back, the biggest mistake wasn't changing the prompt. The mistake was assuming successful execution meant successful behaviour. Those aren't the same thing. A workflow can:"
    },
    {
      "t": "list",
      "items": [
        "complete successfully",
        "satisfy every schema",
        "pass every validation rule",
        "produce syntactically correct output"
      ]
    },
    {
      "t": "p",
      "text": "...while still delivering worse outcomes. That's behavioural drift. And behavioural drift requires different engineering practices than traditional software failures."
    },
    {
      "t": "h3",
      "text": "The Question That Changed Everything"
    },
    {
      "t": "p",
      "text": "During the post-mortem someone asked a simple question."
    },
    {
      "t": "pull",
      "text": "\"Which prompt version generated this recommendation?\""
    },
    {
      "t": "p",
      "text": "Nobody knew. We knew which model had executed. We knew which workflow had run. We knew which user submitted the request. But we couldn't confidently answer one of the most important questions."
    },
    {
      "t": "pull",
      "text": "Which prompt actually produced the output?"
    },
    {
      "t": "p",
      "text": "That realization exposed a gap in our platform. We had versioned our code. We hadn't versioned our prompts with the same discipline. Everything changed after that."
    },
    {
      "t": "h2",
      "text": "Following the Evidence: Finding the Prompt That Changed Everything"
    },
    {
      "t": "p",
      "text": "Once we knew the platform had changed, the obvious question became:"
    },
    {
      "t": "h3",
      "text": "\"What changed?\""
    },
    {
      "t": "p",
      "text": "At first, we looked in all the usual places. Had the model been updated? Were there infrastructure issues? Did a recent deployment introduce a bug? Was a configuration file modified? Nothing stood out. The orchestrator behaved exactly as expected. Workflow routing hadn't changed."
    },
    {
      "t": "p",
      "text": "Validation continued to pass. No new retries appeared. Operationally, the platform looked identical to the previous week. Yet the recommendations were clearly different. That meant one thing. The change wasn't in the infrastructure. It was in the behaviour."
    },
    {
      "t": "h3",
      "text": "Reconstructing the Workflow"
    },
    {
      "t": "p",
      "text": "Instead of comparing outputs, we reconstructed the entire execution. Every workflow already carried a unique execution ID."
    },
    {
      "t": "diagram",
      "text": "Execution ID\n↓\nWorkflow Trace\n↓\nAgent Timeline\n↓\nValidation Events\n↓\nPrompt Metadata\n↓\nFinal Response"
    },
    {
      "t": "p",
      "text": "Rather than asking engineers to reproduce the issue manually, we followed the evidence the platform had already recorded. That immediately narrowed the investigation."
    },
    {
      "t": "h3",
      "text": "Comparing Healthy and Unhealthy Executions"
    },
    {
      "t": "p",
      "text": "The next step was surprisingly simple. We selected two workflows. One completed before users noticed any issues. The other completed after the reports began appearing. Everything else remained as similar as possible. Same workflow. Same routing. Same validation rules."
    },
    {
      "t": "p",
      "text": "Same model. Same configuration. The only meaningful difference should have been whatever introduced the behavioural change."
    },
    {
      "t": "h3",
      "text": "The Workflow Trace"
    },
    {
      "t": "p",
      "text": "Looking at the trace, nothing appeared unusual."
    },
    {
      "t": "diagram",
      "text": "Workflow\n↓\nOverseer\n↓\nAnalyst\n↓\nValidation\n↓\nCare\n↓\nValidation\n↓\nCommunications\n↓\nCompleted"
    },
    {
      "t": "p",
      "text": "Every stage completed successfully. No retries. No failures. No warnings. The trace looked almost identical to hundreds of previous executions. That's what made the incident so deceptive."
    },
    {
      "t": "h3",
      "text": "Structured Logs Revealed More"
    },
    {
      "t": "p",
      "text": "The breakthrough came from structured logging. Every agent already recorded operational metadata. For example:"
    },
    {
      "t": "code",
      "text": "{\n  \"execution_id\": \"8f34d8d2...\",\n  \"agent\": \"analyst\",\n  \"model\": \"gpt-4.1\",\n  \"duration_ms\": 847,\n  \"validation\": \"passed\",\n  \"status\": \"success\"\n}"
    },
    {
      "t": "p",
      "text": "Nothing looked suspicious. Until we added one additional field."
    },
    {
      "t": "code",
      "text": "{\n  \"execution_id\": \"8f34d8d2...\",\n  \"agent\": \"analyst\",\n  \"prompt_version\": \"2.4.3\",\n  \"model\": \"gpt-4.1\"\n}"
    },
    {
      "t": "p",
      "text": "Suddenly the investigation became much simpler."
    },
    {
      "t": "h3",
      "text": "The Missing Piece"
    },
    {
      "t": "p",
      "text": "Before this incident, prompt versions weren't treated as operational metadata. They existed in Git. They existed in pull requests. But they weren't attached to workflow executions. That meant we couldn't answer one critical question."
    },
    {
      "t": "pull",
      "text": "\"Which version of the prompt produced this recommendation?\""
    },
    {
      "t": "p",
      "text": "Once prompt versions became part of every execution record, comparisons became straightforward."
    },
    {
      "t": "h3",
      "text": "The Timeline Told the Story"
    },
    {
      "t": "p",
      "text": "With prompt versions recorded, we reconstructed the deployment timeline. Monday"
    },
    {
      "t": "diagram",
      "text": "Prompt v2.4.2\n↓\nTuesday"
    },
    {
      "t": "diagram",
      "text": "Prompt v2.4.3 Deployed\n↓\nWednesday"
    },
    {
      "t": "diagram",
      "text": "Behaviour Begins to Drift\n↓\nThursday"
    },
    {
      "t": "diagram",
      "text": "Users Report Lower Quality\n↓\nFriday"
    },
    {
      "t": "p",
      "text": "Investigation Begins Nothing else changed during that period. No model upgrade. No configuration update. No workflow changes. Only one prompt deployment. The evidence was becoming difficult to ignore."
    },
    {
      "t": "h3",
      "text": "Comparing Prompt Versions"
    },
    {
      "t": "p",
      "text": "We loaded both prompt revisions side by side. The difference was surprisingly small. The older prompt instructed the Analyst to prioritize concise, action-oriented recommendations. The newer version encouraged additional explanation and supporting context. The change looked harmless during review. It even improved the Analyst's responses when evaluated in isolation. But the Care Agent wasn't consuming the Analyst's response as a human would. It was consuming it as structured workflow input."
    },
    {
      "t": "p",
      "text": "More explanation meant less emphasis on prioritization. The Care Agent faithfully built on that subtle shift. Nothing broke. The downstream behaviour simply drifted."
    },
    {
      "t": "h3",
      "text": "The Root Cause"
    },
    {
      "t": "p",
      "text": "The prompt wasn't incorrect. The Care Agent wasn't incorrect. The orchestrator wasn't incorrect. The failure emerged from the interaction between them. That's an important distinction. Production AI failures often aren't component failures. They're system failures. Every component behaved exactly as designed."
    },
    {
      "t": "p",
      "text": "The combination produced an unexpected result. That's why workflow evaluation matters so much."
    },
    {
      "t": "h3",
      "text": "Behavioural Regressions Leave Operational Clues"
    },
    {
      "t": "p",
      "text": "Looking back, the platform had been warning us all along. Not through exceptions. Through small behavioural signals. For example:"
    },
    {
      "t": "list",
      "items": [
        "slightly longer responses",
        "increased average token usage",
        "less focused recommendations",
        "reduced consistency between similar workflows"
      ]
    },
    {
      "t": "p",
      "text": "Individually, none of those changes seemed significant. Together, they formed a pattern. Once we knew what to look for, the regression became obvious."
    },
    {
      "t": "h2",
      "text": "The Moment Everything Changed"
    },
    {
      "t": "p",
      "text": "That investigation led to one of the biggest engineering changes in PHHM. Every workflow would now permanently record:"
    },
    {
      "t": "list",
      "items": [
        "execution ID",
        "workflow version",
        "prompt version",
        "model version",
        "configuration version",
        "validation outcome"
      ]
    },
    {
      "t": "p",
      "text": "Those fields transformed debugging. Instead of asking:"
    },
    {
      "t": "pull",
      "text": "\"What do we think happened?\""
    },
    {
      "t": "p",
      "text": "We started asking:"
    },
    {
      "t": "pull",
      "text": "\"What does the execution metadata tell us?\""
    },
    {
      "t": "p",
      "text": "Evidence replaced intuition."
    },
    {
      "t": "h3",
      "text": "The Bigger Lesson"
    },
    {
      "t": "p",
      "text": "Looking back, the investigation taught us something much broader than prompt versioning."
    },
    {
      "t": "pull",
      "text": "AI incidents rarely have a single cause. They emerge from interactions between otherwise healthy components."
    },
    {
      "t": "p",
      "text": "That's exactly why production AI platforms need observability. Without execution metadata, this incident might have remained unexplained. With it, the platform effectively diagnosed itself."
    },
    {
      "t": "h2",
      "text": "Building a Safer Prompt Deployment Pipeline"
    },
    {
      "t": "p",
      "text": "The prompt wasn't the problem. Our deployment process was. Looking back, the prompt behaved exactly as we asked it to. The real issue was that we deployed it with far more confidence than evidence. Once we understood that, the solution became obvious. Stop treating prompts like configuration files. Start treating them like production code. That single mindset shift transformed how PHHM evolved."
    },
    {
      "t": "h3",
      "text": "Every Prompt Became Version Controlled"
    },
    {
      "t": "p",
      "text": "The first change was also the simplest. Every prompt became a versioned artifact. Instead of editing prompts directly, every change now receives its own version identifier."
    },
    {
      "t": "diagram",
      "text": "Prompt\n↓\nv2.4.2\n↓\nv2.4.3\n↓\nv2.5.0"
    },
    {
      "t": "p",
      "text": "Every workflow execution records exactly which version generated its output. Weeks later, we can still answer:"
    },
    {
      "t": "list",
      "items": [
        "Which prompt produced this recommendation?",
        "When was it deployed?",
        "Which workflows used it?",
        "When was it replaced?"
      ]
    },
    {
      "t": "p",
      "text": "That level of traceability changed debugging completely."
    },
    {
      "t": "h3",
      "text": "Prompt Changes Require Pull Requests"
    },
    {
      "t": "p",
      "text": "Before the incident, prompt edits often happened alongside feature work. Afterwards, prompts received the same engineering discipline as application code. Every modification now requires:"
    },
    {
      "t": "list",
      "items": [
        "a pull request",
        "a clear description of the intended behaviour",
        "peer review",
        "regression evidence",
        "deployment approval"
      ]
    },
    {
      "t": "p",
      "text": "The discussion shifted from:"
    },
    {
      "t": "code",
      "text": "\"Does this response sound better?\""
    },
    {
      "t": "p",
      "text": "To:"
    },
    {
      "t": "code",
      "text": "\"What evidence shows this improves the workflow?\""
    },
    {
      "t": "p",
      "text": "That's a much healthier engineering conversation."
    },
    {
      "t": "h3",
      "text": "Every Deployment Starts Behind a Feature Flag"
    },
    {
      "t": "p",
      "text": "One of the biggest operational improvements came from feature flags. Instead of replacing the active prompt immediately, new versions remain disabled by default."
    },
    {
      "t": "diagram",
      "text": "Current Prompt\n↓\nFeature Flag\n├── OFF → Existing Prompt\n└── ON → New Prompt"
    },
    {
      "t": "p",
      "text": "This gives us precise control over when new behaviour becomes active. More importantly, it allows us to activate new prompts without deploying new code. Behaviour and deployment become independent decisions."
    },
    {
      "t": "h2",
      "text": "Canary Releases for Prompts"
    },
    {
      "t": "p",
      "text": "The incident also changed how we roll out prompts. Instead of exposing every user to a new version immediately, deployments happen gradually."
    },
    {
      "t": "diagram",
      "text": "New Prompt\n↓\n5% Traffic\n↓\n25% Traffic\n↓\n50% Traffic\n↓\n100% Traffic"
    },
    {
      "t": "p",
      "text": "Each stage gives us another opportunity to observe behaviour before expanding the rollout. If quality begins to drift, the deployment stops immediately. Most users never notice."
    },
    {
      "t": "h3",
      "text": "Behaviour Determines Promotion"
    },
    {
      "t": "p",
      "text": "Traditional deployments often promote new versions because they remain online. Prompt deployments follow a different rule. Promotion depends on behaviour. During a canary rollout we compare metrics such as:"
    },
    {
      "t": "table",
      "headers": [
        "Metric",
        "Existing Prompt",
        "Canary Prompt"
      ],
      "rows": [
        [
          "Workflow Success",
          "99.2%",
          "99.3%"
        ],
        [
          "Validation Failures",
          "1.1%",
          "1.0%"
        ],
        [
          "Retry Rate",
          "2.4%",
          "2.2%"
        ],
        [
          "Average Tokens",
          "2,480",
          "2,510"
        ],
        [
          "Human Review Rate",
          "3.2%",
          "3.1%"
        ]
      ]
    },
    {
      "t": "p",
      "text": "Only if the canary performs at least as well as the current version does it progress. Availability isn't enough. Behaviour matters."
    },
    {
      "t": "h3",
      "text": "Regression Testing Became Mandatory"
    },
    {
      "t": "p",
      "text": "Earlier in the PHHM series we explored workflow evaluation. This incident made those ideas mandatory. No prompt reaches production without executing the regression suite."
    },
    {
      "t": "diagram",
      "text": "Prompt Change\n↓\nWorkflow Regression\n↓\nBehaviour Evaluation\n↓\nQuality Gates\n↓\nDeploy"
    },
    {
      "t": "p",
      "text": "The deployment pipeline no longer asks:"
    },
    {
      "t": "pull",
      "text": "\"Does this prompt sound better?\""
    },
    {
      "t": "p",
      "text": "It asks:"
    },
    {
      "t": "pull",
      "text": "\"Does the workflow remain reliable?\""
    },
    {
      "t": "p",
      "text": "That's a much stronger guarantee."
    },
    {
      "t": "h3",
      "text": "One-Click Rollbacks"
    },
    {
      "t": "p",
      "text": "One lesson from traditional software carried over perfectly. Every deployment should be reversible. Prompt rollbacks became intentionally simple."
    },
    {
      "t": "diagram",
      "text": "Prompt v2.5.0\n↓\nIssue Detected\n↓\nRollback\n↓\nPrompt v2.4.3"
    },
    {
      "t": "p",
      "text": "No emergency editing. No rewriting prompts under pressure. No guessing which sentence changed. We simply restore the previous version. That's exactly how mature deployment systems should behave."
    },
    {
      "t": "h3",
      "text": "Deployment Checklists Reduced Risk"
    },
    {
      "t": "p",
      "text": "Technology wasn't the only improvement. Process mattered too. Every prompt deployment now answers the same checklist."
    },
    {
      "t": "list",
      "items": [
        "Has the regression suite passed?",
        "Have behavioural metrics been reviewed?",
        "Has another engineer approved the change?",
        "Is the feature flag configured?",
        "Is the rollback version known?",
        "Are dashboards monitoring the rollout?"
      ]
    },
    {
      "t": "p",
      "text": "Simple questions. Consistently applied. That consistency dramatically reduced deployment risk."
    },
    {
      "t": "h3",
      "text": "We Started Measuring Prompt Deployments"
    },
    {
      "t": "p",
      "text": "Prompt releases also became observable events. Every deployment records:"
    },
    {
      "t": "list",
      "items": [
        "prompt version",
        "deployment timestamp",
        "reviewer",
        "rollout percentage",
        "evaluation results",
        "rollback status"
      ]
    },
    {
      "t": "p",
      "text": "Weeks later, we can correlate platform behaviour with deployment history. Observability and deployment became tightly connected."
    },
    {
      "t": "h3",
      "text": "The New Deployment Lifecycle"
    },
    {
      "t": "p",
      "text": "Looking back, prompt deployments evolved into a repeatable engineering workflow."
    },
    {
      "t": "diagram",
      "text": "Prompt Change\n        │\n        ▼\nPull Request\n        │\n        ▼\nPeer Review\n        │\n        ▼\nRegression Suite\n        │\n        ▼\nFeature Flag\n        │\n        ▼\nCanary Rollout\n        │\n        ▼\nProduction Monitoring\n        │\n        ▼\nFull Release"
    },
    {
      "t": "p",
      "text": "Every stage exists to answer one question:"
    },
    {
      "t": "pull",
      "text": "\"Has this change earned the right to continue?\""
    },
    {
      "t": "h3",
      "text": "The Biggest Lesson"
    },
    {
      "t": "p",
      "text": "The post-mortem wasn't really about prompts. It was about deployment discipline. The prompt exposed a weakness that already existed in our engineering process. Fixing the prompt would have solved one incident. Fixing the deployment pipeline prevented an entire class of future incidents. That's a much more valuable outcome."
    },
    {
      "t": "h3",
      "text": "Final Thoughts"
    },
    {
      "t": "p",
      "text": "When I first started building PHHM, prompts felt temporary. They were just instructions. Easy to edit. Easy to replace. Production changed that perspective completely. Today, I think about prompts the same way I think about APIs, database schemas, or workflow contracts. They're production assets. They deserve:"
    },
    {
      "t": "list",
      "items": [
        "version control",
        "code review",
        "automated testing",
        "staged rollouts",
        "feature flags",
        "rollback strategies",
        "observability"
      ]
    },
    {
      "t": "p",
      "text": "Not because prompts are code. But because they influence production behaviour in exactly the same way. The production incident that sparked this article didn't just improve one prompt. It permanently changed how we engineer AI systems."
    },
    {
      "t": "h3",
      "text": "Key Takeaways"
    },
    {
      "t": "code",
      "text": "If you're deploying AI prompts in production, I'd recommend adopting these practices from day one:"
    },
    {
      "t": "list",
      "items": [
        "Treat prompts as versioned production artifacts.",
        "Require pull requests and peer review for every prompt change.",
        "Record prompt versions alongside every workflow execution.",
        "Deploy prompts behind feature flags instead of replacing them immediately.",
        "Use canary rollouts to observe behavioural changes before full deployment.",
        "Make workflow regression testing a mandatory deployment gate.",
        "Design prompt deployments to support one-click rollbacks.",
        "Track deployment metadata as part of your observability platform.",
        "Measure behavioural quality, not just operational health.",
        "Improve the deployment process after every incident—not just the prompt."
      ]
    },
    {
      "t": "h3",
      "text": "What This Incident Changed About How We Build AI"
    },
    {
      "t": "p",
      "text": "Looking back, the most valuable outcome wasn't fixing the prompt. It wasn't even improving the Care Agent. The biggest change was how we thought about production AI. Before this incident, prompts felt different from software. They were instructions. Easy to edit. Easy to replace. Easy to experiment with."
    },
    {
      "t": "p",
      "text": "After this incident, that mental model disappeared. We realized something much more important. A prompt isn't just text. It's production logic. Changing a prompt changes system behaviour. Sometimes dramatically. Sometimes so subtly that nobody notices until users begin experiencing lower-quality outcomes. That's exactly what happened here."
    },
    {
      "t": "p",
      "text": "The platform remained available. The workflows continued to complete. The infrastructure stayed healthy. Yet the user experience slowly deteriorated. That kind of failure deserves the same engineering discipline as changing application code."
    },
    {
      "t": "h3",
      "text": "Our Deployment Philosophy Today"
    },
    {
      "t": "p",
      "text": "Today, every prompt deployment follows one simple principle."
    },
    {
      "t": "pull",
      "text": "Assume every prompt change can alter production behaviour."
    },
    {
      "t": "p",
      "text": "That assumption influences every stage of development. A prompt isn't merged because someone likes the wording. It's merged because the evidence shows the workflow remains reliable. A prompt isn't deployed because manual testing looked good. It's deployed because automated evaluation says it behaves correctly. A prompt isn't trusted because validation passed. It's trusted because production telemetry confirms that users continue receiving high-quality outcomes. Evidence replaced optimism."
    },
    {
      "t": "h3",
      "text": "The Deployment Pipeline That Emerged"
    },
    {
      "t": "p",
      "text": "By the end of the project, prompt deployments followed exactly the same lifecycle as software releases."
    },
    {
      "t": "diagram",
      "text": "Prompt Change\n       │\n       ▼\nGit Commit\n       │\n       ▼\nPull Request\n       │\n       ▼\nPeer Review\n       │\n       ▼\nRegression Testing\n       │\n       ▼\nFeature Flag\n       │\n       ▼\nCanary Deployment\n       │\n       ▼\nProduction Monitoring\n       │\n       ▼\nFull Rollout\n       │\n       ▼\nContinuous Evaluation"
    },
    {
      "t": "p",
      "text": "Notice what isn't in the diagram. Manual confidence. Every stage exists to collect evidence. Only after enough evidence exists does the deployment continue."
    },
    {
      "t": "h3",
      "text": "The Cost of Small Changes"
    },
    {
      "t": "p",
      "text": "One sentence keeps coming back to me whenever I think about this incident."
    },
    {
      "t": "pull",
      "text": "The smaller the prompt change, the easier it is to underestimate its impact."
    },
    {
      "t": "p",
      "text": "Changing one sentence doesn't feel risky. Changing one configuration value doesn't feel risky. Changing one routing rule doesn't feel risky. But complex systems rarely react to changes in isolation. Every component influences the next. A tiny behavioural change in one agent can quietly propagate through an entire workflow. That's why production AI deserves systems thinking. Not just prompt engineering."
    },
    {
      "t": "h3",
      "text": "Looking Beyond Prompts"
    },
    {
      "t": "p",
      "text": "Ironically, this article isn't really about prompts. It's about engineering maturity. Mature engineering teams don't assume deployments are safe. They build processes that prove they are. That philosophy applies equally to:"
    },
    {
      "t": "list",
      "items": [
        "prompts",
        "workflows",
        "routing rules",
        "validation schemas",
        "configuration files",
        "model upgrades",
        "orchestration logic"
      ]
    },
    {
      "t": "p",
      "text": "Anything capable of changing production behaviour deserves the same operational discipline."
    },
    {
      "t": "h3",
      "text": "The Five Lessons We'll Keep"
    },
    {
      "t": "p",
      "text": "If I had to summarize everything this incident taught us, it would be these five principles."
    },
    {
      "t": "pull",
      "text": "1. Small prompt changes can create large behavioural changes"
    },
    {
      "t": "p",
      "text": "Never judge risk by the number of words that changed. Judge it by the behaviour that changed."
    },
    {
      "t": "pull",
      "text": "2. Behaviour matters more than availability"
    },
    {
      "t": "p",
      "text": "Healthy infrastructure doesn't guarantee healthy workflows. Users experience outcomes—not dashboards."
    },
    {
      "t": "pull",
      "text": "3. Every prompt deserves traceability"
    },
    {
      "t": "p",
      "text": "Always know:"
    },
    {
      "t": "list",
      "items": [
        "which version executed",
        "when it was deployed",
        "who approved it",
        "which workflows used it"
      ]
    },
    {
      "t": "p",
      "text": "Without that information, investigations become guesswork."
    },
    {
      "t": "pull",
      "text": "4. Deploy prompts like software"
    },
    {
      "t": "p",
      "text": "Version them. Review them. Test them. Roll them out gradually. Monitor them. Rollback them when necessary."
    },
    {
      "t": "pull",
      "text": "5. Every incident should improve the platform"
    },
    {
      "t": "p",
      "text": "The purpose of a post-mortem isn't assigning blame. It's strengthening the system. This incident didn't just improve one prompt. It permanently improved how PHHM evolves."
    },
    {
      "t": "h3",
      "text": "Final Thoughts"
    },
    {
      "t": "p",
      "text": "When people ask what surprised me most about building PHHM, they usually expect an answer about language models. Instead, I think about deployment. Building reliable AI systems turned out to have much more in common with traditional software engineering than I expected. The tools were different. The engineering principles weren't. Version control. Regression testing. Feature flags."
    },
    {
      "t": "p",
      "text": "Canary releases. Observability. Rollbacks. Post-mortems. Those practices existed long before large language models. They're still some of the most effective ways to build reliable AI platforms today. The production incident that inspired this article didn't teach us how to write better prompts. It taught us how to build a better engineering process."
    },
    {
      "t": "p",
      "text": "And in the long run, that was the more valuable lesson."
    },
    {
      "t": "h3",
      "text": "Key Takeaways"
    },
    {
      "t": "code",
      "text": "If you're deploying AI systems to production, I'd recommend adopting these practices from your very first prompt:"
    },
    {
      "t": "list",
      "items": [
        "Treat prompts as production assets rather than editable text.",
        "Record prompt versions with every workflow execution.",
        "Use structured telemetry to correlate behavioural changes with deployments.",
        "Run regression tests before every prompt release.",
        "Deploy behind feature flags and expand gradually with canary rollouts.",
        "Design every deployment to support immediate rollback.",
        "Monitor workflow behaviour, not just infrastructure health.",
        "Turn every production incident into a permanent improvement to your deployment process.",
        "Prefer evidence over intuition when deciding whether to release.",
        "Remember that reliable AI systems are built through disciplined engineering—not optimistic experimentation."
      ]
    },
    {
      "t": "h3",
      "text": "What's Next in the PHHM Engineering Stories"
    },
    {
      "t": "p",
      "text": "This article marks a shift in the series. The previous posts focused on **architecture**. The next set focuses on **real production stories**—the engineering decisions, failures, and lessons that shaped PHHM. Upcoming post-mortems include:"
    },
    {
      "t": "list",
      "items": [
        "When an AI Workflow Passed Every Test but Still Failed Users",
        "The Day We Realized Observability Was More Important Than Model Choice",
        "Why We Removed Memory From One of Our Agents—and Improved Performance",
        "How a Validation Rule Prevented an AI Hallucination From Reaching Production"
      ]
    },
    {
      "t": "p",
      "text": "Because the most valuable engineering lessons rarely come from the day everything worked. They come from the days it didn't."
    }
  ]
} as ArticleData;

export default function PromptIncidentArticle() {
  return <ArticleShell article={article} />;
}
