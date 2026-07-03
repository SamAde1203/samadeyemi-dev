"use client";

import ArticleShell, { type ArticleData } from "./ArticleShell";

const article = {
  "kicker": "PHHM Journal • Evaluation",
  "focus": "Evaluation",
  "icon": "flask",
  "title": "Evaluation and Regression Testing for AI Workflows: Why Testing Prompts Isn't Enough",
  "subtitle": "How we built repeatable evaluation pipelines for PHHM by testing complete workflows instead of individual prompts.",
  "readTime": "12 min",
  "blocks": [
    {
      "t": "p",
      "text": "The first prompt we wrote for PHHM looked great. It generated clean summaries. The formatting was consistent. The responses made sense. Every manual test passed. So we deployed it. Within a day, workflows started failing. Not because the prompt was wrong."
    },
    {
      "t": "p",
      "text": "Because the **workflow** was. A small prompt change caused the Analyst Agent to return recommendations in a different structure. The response still looked correct to a human. But the Care Agent expected a different contract. Validation failed. Retries increased. Workflow latency doubled. Nothing was technically broken."
    },
    {
      "t": "p",
      "text": "Yet the platform became less reliable. That was the moment we realized something important."
    },
    {
      "t": "pull",
      "text": "We weren't deploying prompts. We were deploying workflows."
    },
    {
      "t": "p",
      "text": "From that point on, we stopped evaluating prompts in isolation. We started evaluating the entire system."
    },
    {
      "t": "h2",
      "text": "Why Prompt Testing Doesn't Scale"
    },
    {
      "t": "p",
      "text": "Most AI tutorials demonstrate prompt testing like this."
    },
    {
      "t": "diagram",
      "text": "Input\n↓\nPrompt\n↓\nOutput"
    },
    {
      "t": "p",
      "text": "If the answer looks reasonable... The prompt passes. That works for experiments. It doesn't work for platforms. PHHM isn't one prompt. It's a sequence of coordinated decisions."
    },
    {
      "t": "diagram",
      "text": "User Request\n      │\n      ▼\nOverseer\n      │\n ┌────┼───────────┐\n ▼    ▼           ▼\nAnalyst Care Communications\n │      │           │\n ▼      ▼           ▼\nValidation Validation Validation\n │      │           │\n └──────┼───────────┘\n        ▼\nFinal Response"
    },
    {
      "t": "p",
      "text": "Testing one prompt tells us almost nothing about whether the workflow still works."
    },
    {
      "t": "h3",
      "text": "A Prompt Can Improve While the Platform Gets Worse"
    },
    {
      "t": "p",
      "text": "One of the hardest lessons we learned was that prompt quality and workflow quality aren't the same thing. Imagine improving the Analyst prompt. It now generates more detailed recommendations. Great. Except those recommendations increase token usage by 60%. Validation takes longer. The Care Agent retries more often. Overall workflow latency increases by two seconds."
    },
    {
      "t": "p",
      "text": "The prompt improved. The platform regressed. That's why workflow evaluation became our primary metric."
    },
    {
      "t": "h3",
      "text": "Think Like a Software Engineer"
    },
    {
      "t": "p",
      "text": "Traditional software isn't tested one function at a time. We also test:"
    },
    {
      "t": "list",
      "items": [
        "integration",
        "end-to-end behavior",
        "contracts",
        "regression",
        "performance"
      ]
    },
    {
      "t": "p",
      "text": "AI systems deserve exactly the same discipline. Instead of asking:"
    },
    {
      "t": "pull",
      "text": "\"Did the prompt produce a good answer?\""
    },
    {
      "t": "p",
      "text": "Ask:"
    },
    {
      "t": "pull",
      "text": "\"Did the workflow behave correctly?\""
    },
    {
      "t": "p",
      "text": "That small wording change completely transformed how we approached testing."
    },
    {
      "t": "h2",
      "text": "Defining Workflow Quality"
    },
    {
      "t": "p",
      "text": "Before writing tests, we had to answer a more important question."
    },
    {
      "t": "pull",
      "text": "What does a successful workflow actually look like?"
    },
    {
      "t": "p",
      "text": "Interestingly, the answer had very little to do with wording. A workflow is successful if:"
    },
    {
      "t": "list",
      "items": [
        "the correct agents were selected",
        "routing followed the expected path",
        "validation passed",
        "contracts remained compatible",
        "retries stayed within acceptable limits",
        "execution completed successfully",
        "latency remained acceptable"
      ]
    },
    {
      "t": "p",
      "text": "Notice what's missing. Perfect prose. The platform cares about behavior. Not adjectives."
    },
    {
      "t": "h3",
      "text": "The Biggest Mindset Shift"
    },
    {
      "t": "p",
      "text": "One sentence summarizes almost the entire testing strategy."
    },
    {
      "t": "pull",
      "text": "We're not testing language. We're testing system behavior."
    },
    {
      "t": "p",
      "text": "That distinction became the foundation of every evaluation pipeline in PHHM."
    },
    {
      "t": "h3",
      "text": "The Architecture We Wanted"
    },
    {
      "t": "p",
      "text": "By the time evaluation became a first-class concern, this was the flow we were aiming for."
    },
    {
      "t": "diagram",
      "text": "Prompt Change\n       │\n       ▼\nRegression Suite\n       │\n       ▼\nWorkflow Evaluation\n       │\n       ▼\nBehavior Verification\n       │\n       ▼\nDeployment Decision"
    },
    {
      "t": "p",
      "text": "Nothing reaches production because a prompt \"looks better.\" It reaches production because the workflow proves it behaves correctly."
    },
    {
      "t": "h3",
      "text": "Why This Matters"
    },
    {
      "t": "p",
      "text": "Looking back, evaluation wasn't really about prompts. It was about confidence. Confidence that changing one component wouldn't quietly degrade everything else. That's exactly what regression testing provides. It doesn't guarantee perfection. It dramatically reduces surprises."
    },
    {
      "t": "h3",
      "text": "The Lesson That Changed Everything"
    },
    {
      "t": "code",
      "text": "If there's one idea I'd want readers to remember from this article, it's this:"
    },
    {
      "t": "pull",
      "text": "Prompt engineering is a development activity. Evaluation is an engineering discipline."
    },
    {
      "t": "p",
      "text": "Production AI systems need both."
    },
    {
      "t": "h2",
      "text": "Building Golden Datasets: Testing Workflows Instead of Prompts"
    },
    {
      "t": "p",
      "text": "Once we stopped evaluating prompts individually, another question appeared."
    },
    {
      "t": "pull",
      "text": "What exactly should we test?"
    },
    {
      "t": "p",
      "text": "At first, we collected examples of good prompts. That didn't help much. Changing one prompt rarely broke the prompt itself. It broke something downstream. Eventually we realized our test cases shouldn't represent prompts. They should represent **real workflows**. Every test became a complete user journey from request to final response."
    },
    {
      "t": "pull",
      "text": "What Is a Golden Dataset?"
    },
    {
      "t": "p",
      "text": "A golden dataset is a curated collection of representative workflows that should continue behaving correctly as the platform evolves. Think of it as the AI equivalent of a regression test suite. Instead of checking whether one response \"looks good,\" we verify that the entire orchestration behaves as expected."
    },
    {
      "t": "p",
      "text": "For example:"
    },
    {
      "t": "table",
      "headers": [
        "Scenario",
        "Expected Behaviour"
      ],
      "rows": [
        [
          "New member onboarding",
          "Welcome Agent selected, validation passes, onboarding workflow completes"
        ],
        [
          "Member report",
          "Analyst → Care → Communications, contracts remain valid"
        ],
        [
          "Newsletter generation",
          "Communications Agent executes, formatting passes validation"
        ],
        [
          "Care request",
          "Analyst and Care execute, recommendations satisfy business rules"
        ]
      ]
    },
    {
      "t": "p",
      "text": "Notice something important. The expected result isn't a paragraph of text. It's a sequence of behaviours."
    },
    {
      "t": "h3",
      "text": "Real Workflows Become Test Cases"
    },
    {
      "t": "p",
      "text": "Every production workflow eventually becomes a candidate for the regression suite."
    },
    {
      "t": "diagram",
      "text": "User Scenario\n↓\nWorkflow\n↓\nValidation\n↓\nExpected Behaviour\n↓\nPASS / FAIL"
    },
    {
      "t": "p",
      "text": "The workflow itself becomes the unit under test. That's much closer to how traditional software is evaluated."
    },
    {
      "t": "h3",
      "text": "Good Tests Describe Behaviour"
    },
    {
      "t": "p",
      "text": "One temptation is to compare the entire AI response against a stored answer. That rarely works. Language models naturally produce variation. Instead, PHHM focuses on behavioural assertions. For example:"
    },
    {
      "t": "list",
      "items": [
        "Was the correct workflow selected?",
        "Did the expected agents execute?",
        "Did validation succeed?",
        "Was the output contract satisfied?",
        "Were retries within acceptable limits?",
        "Did the workflow complete?"
      ]
    },
    {
      "t": "p",
      "text": "These assertions remain stable even if the wording changes."
    },
    {
      "t": "h3",
      "text": "Avoid Exact String Matching"
    },
    {
      "t": "p",
      "text": "Suppose yesterday the Analyst generated:"
    },
    {
      "t": "code",
      "text": "\"Schedule a follow-up within seven days.\""
    },
    {
      "t": "p",
      "text": "Today it generates:"
    },
    {
      "t": "code",
      "text": "\"Arrange a follow-up appointment next week.\""
    },
    {
      "t": "p",
      "text": "Both responses satisfy the same intent. Exact string comparison would incorrectly report a failure. Behavioural evaluation accepts both because the recommendation still satisfies the business objective. That's why we evaluate meaning through workflow behaviour rather than literal text."
    },
    {
      "t": "h3",
      "text": "Designing Representative Scenarios"
    },
    {
      "t": "p",
      "text": "One lesson became obvious very quickly. Tiny datasets produce misleading confidence. We deliberately built scenarios that reflected real production diversity. Examples included:"
    },
    {
      "t": "list",
      "items": [
        "straightforward onboarding",
        "incomplete member information",
        "conflicting care recommendations",
        "invalid user requests",
        "unusually long conversations",
        "high-risk member cases",
        "multilingual requests",
        "edge-case routing decisions"
      ]
    },
    {
      "t": "p",
      "text": "The goal wasn't to cover every possible input. It was to cover every important category of behaviour."
    },
    {
      "t": "h3",
      "text": "Happy Paths Aren't Enough"
    },
    {
      "t": "p",
      "text": "Early in development, almost every test represented a successful workflow. Production quickly proved that unrealistic. Good regression suites deliberately include failures. For example:"
    },
    {
      "t": "diagram",
      "text": "Malformed Request\n↓\nValidation Failure\n↓\nExpected Error\n↓\nPASS"
    },
    {
      "t": "p",
      "text": "Or:"
    },
    {
      "t": "diagram",
      "text": "Provider Timeout\n↓\nRetry\n↓\nFallback Model\n↓\nWorkflow Completes\n↓\nPASS"
    },
    {
      "t": "p",
      "text": "Testing recovery paths proved just as valuable as testing successful ones."
    },
    {
      "t": "h3",
      "text": "Regression Tests Protect Architecture"
    },
    {
      "t": "p",
      "text": "One unexpected benefit of workflow testing was architectural confidence. Suppose we update:"
    },
    {
      "t": "list",
      "items": [
        "an agent prompt",
        "a routing rule",
        "a validation schema",
        "a configuration file",
        "a model provider"
      ]
    },
    {
      "t": "p",
      "text": "The regression suite immediately tells us whether the platform still behaves correctly. Notice what we're protecting. Not individual prompts. The architecture itself."
    },
    {
      "t": "h3",
      "text": "Version the Dataset Too"
    },
    {
      "t": "p",
      "text": "Prompt versions aren't the only assets that evolve. Evaluation datasets evolve as well. Every scenario should be version-controlled. For example:"
    },
    {
      "t": "diagram",
      "text": "golden-datasets/\n├── onboarding/\n├── care/\n├── communications/\n├── newsletters/\n└── regression/"
    },
    {
      "t": "p",
      "text": "As new workflows are introduced, new scenarios are added. The dataset grows alongside the platform. That's exactly how software test suites mature."
    },
    {
      "t": "h3",
      "text": "Every Bug Becomes a Test"
    },
    {
      "t": "p",
      "text": "One engineering habit paid off more than almost anything else. Whenever production exposed a bug... We added it to the golden dataset. That means every incident permanently improves the platform. The workflow that failed yesterday becomes tomorrow's regression test. Over time, the evaluation suite becomes a living record of everything the platform has learned."
    },
    {
      "t": "h3",
      "text": "Synthetic Data Complements Real Data"
    },
    {
      "t": "p",
      "text": "Production scenarios are invaluable. They're also limited. To explore edge cases, we supplemented them with synthetic workflows. Examples include:"
    },
    {
      "t": "list",
      "items": [
        "extremely large member profiles",
        "ambiguous requests",
        "conflicting instructions",
        "intentionally malformed inputs",
        "unusual routing combinations"
      ]
    },
    {
      "t": "p",
      "text": "Synthetic data helped us explore situations that rarely occurred in production but could still reveal weaknesses. The goal wasn't realism. It was resilience."
    },
    {
      "t": "h3",
      "text": "Evaluation Is Continuous"
    },
    {
      "t": "p",
      "text": "One mistake we avoided was treating evaluation as something that happens only before deployment. Instead, evaluation became part of the development cycle."
    },
    {
      "t": "diagram",
      "text": "Prompt Change\n↓\nRegression Suite\n↓\nWorkflow Evaluation\n↓\nReview Results\n↓\nDeploy"
    },
    {
      "t": "p",
      "text": "Every meaningful change passes through the same process. That consistency builds confidence over time."
    },
    {
      "t": "h3",
      "text": "The Biggest Lesson"
    },
    {
      "t": "p",
      "text": "Looking back, one principle shaped our entire evaluation strategy."
    },
    {
      "t": "pull",
      "text": "Every production incident should become a permanent test case."
    },
    {
      "t": "p",
      "text": "That's how the platform improves. Not by hoping the same mistake never happens again. By ensuring it can't happen unnoticed."
    },
    {
      "t": "h2",
      "text": "Automating Evaluation: Bringing Regression Testing into CI/CD"
    },
    {
      "t": "p",
      "text": "One of the biggest mistakes we made early was treating evaluation like a checklist. Someone changed a prompt. Someone manually tested a few examples. Everything looked fine. The change was deployed. A few days later, an unrelated workflow started failing. Nothing had been intentionally broken. The problem was that **manual testing doesn't scale**."
    },
    {
      "t": "p",
      "text": "As PHHM grew, prompts, routing rules, validation schemas, configuration files, and models changed constantly. No engineer could reliably verify every workflow by hand. That's when evaluation became part of the deployment pipeline."
    },
    {
      "t": "h3",
      "text": "Every Change Should Prove Itself"
    },
    {
      "t": "p",
      "text": "One architectural rule guided the entire release process."
    },
    {
      "t": "pull",
      "text": "Every meaningful change must demonstrate that it hasn't made the platform worse."
    },
    {
      "t": "p",
      "text": "Notice the wording. Not better. Not smarter. Not faster. Simply **not worse**. That's exactly what regression testing is designed to verify."
    },
    {
      "t": "h3",
      "text": "Evaluation Becomes a Quality Gate"
    },
    {
      "t": "p",
      "text": "Instead of deploying immediately after a prompt change, every update passes through an evaluation pipeline."
    },
    {
      "t": "diagram",
      "text": "Git Commit\n      │\n      ▼\nBuild\n      │\n      ▼\nRegression Suite\n      │\n      ▼\nWorkflow Evaluation\n      │\n      ▼\nQuality Gate\n      │\n      ▼\nDeploy"
    },
    {
      "t": "p",
      "text": "Deployment is no longer based on confidence. It's based on evidence."
    },
    {
      "t": "h3",
      "text": "Testing the Entire Workflow"
    },
    {
      "t": "p",
      "text": "Every workflow in the golden dataset executes from beginning to end."
    },
    {
      "t": "diagram",
      "text": "Test Scenario\n↓\nOverseer\n↓\nAgent Routing\n↓\nValidation\n↓\nWorkflow Complete\n↓\nAssertions"
    },
    {
      "t": "p",
      "text": "Nothing is mocked unnecessarily. The goal is to evaluate the orchestration exactly as it will behave in production."
    },
    {
      "t": "h3",
      "text": "Behavioural Assertions"
    },
    {
      "t": "p",
      "text": "Earlier, we avoided comparing exact wording. Automation follows the same philosophy. Instead of asking: *\"Did the response match this paragraph?\"* We ask questions such as:"
    },
    {
      "t": "list",
      "items": [
        "Was the correct workflow selected?",
        "Were the expected agents executed?",
        "Did validation succeed?",
        "Were contracts preserved?",
        "Did retries remain below the threshold?",
        "Did execution finish successfully?"
      ]
    },
    {
      "t": "p",
      "text": "Those assertions stay stable even as prompts evolve."
    },
    {
      "t": "h3",
      "text": "Define Success Before Running Tests"
    },
    {
      "t": "p",
      "text": "One lesson became surprisingly important. Every scenario should define success **before** execution. For example: scenario: member_report"
    },
    {
      "t": "code",
      "text": "expected:\n\n  workflow: member_report\n\n  agents:\n\n    - analyst\n\n    - care\n\n  validation: passed\n\n  retries: <=1\n\n  completed: true"
    },
    {
      "t": "p",
      "text": "Now evaluation becomes objective. The workflow either satisfies the contract or it doesn't."
    },
    {
      "t": "h3",
      "text": "Regression Isn't Just Functional"
    },
    {
      "t": "p",
      "text": "One misconception is that regression only checks correctness. Production systems also monitor operational characteristics. For every workflow we track metrics like:"
    },
    {
      "t": "list",
      "items": [
        "execution time",
        "retry count",
        "validation failures",
        "token consumption",
        "model latency",
        "total workflow duration"
      ]
    },
    {
      "t": "p",
      "text": "Suppose a prompt update still passes validation but doubles token usage. That's still a regression. Quality includes operational efficiency."
    },
    {
      "t": "h3",
      "text": "Baselines Matter"
    },
    {
      "t": "p",
      "text": "Every workflow establishes a historical baseline. For example:"
    },
    {
      "t": "table",
      "headers": [
        "Metric",
        "Previous",
        "Current",
        "Result"
      ],
      "rows": [
        [
          "Success Rate",
          "99.1%",
          "99.0%",
          "✅ Pass"
        ],
        [
          "Validation Failures",
          "1.2%",
          "1.3%",
          "✅ Pass"
        ],
        [
          "Average Latency",
          "2.1 s",
          "2.0 s",
          "✅ Pass"
        ],
        [
          "Tokens",
          "2,380",
          "3,940",
          "❌ Regression"
        ]
      ]
    },
    {
      "t": "p",
      "text": "The output is still correct. The deployment should still be reviewed. Evaluation isn't only about correctness. It's also about efficiency."
    },
    {
      "t": "h3",
      "text": "Prompt Changes Need Evidence"
    },
    {
      "t": "p",
      "text": "One engineering habit dramatically reduced deployment risk. Every prompt modification answers one question."
    },
    {
      "t": "pull",
      "text": "Show the evaluation results."
    },
    {
      "t": "p",
      "text": "Not opinions. Not screenshots. Evidence. If the regression suite improves or maintains workflow quality, deployment proceeds. If not, the change goes back for revision."
    },
    {
      "t": "h3",
      "text": "CI/CD Makes Evaluation Automatic"
    },
    {
      "t": "p",
      "text": "Eventually evaluation became another automated stage in the delivery pipeline."
    },
    {
      "t": "diagram",
      "text": "Developer Push\n↓\nBuild\n↓\nUnit Tests\n↓\nWorkflow Regression\n↓\nEvaluation Report\n↓\nDeployment"
    },
    {
      "t": "p",
      "text": "Nobody remembers to run tests. The pipeline does it automatically. That's how software engineering has worked for years. AI systems deserve the same discipline."
    },
    {
      "t": "h3",
      "text": "Evaluation Reports Should Explain Decisions"
    },
    {
      "t": "p",
      "text": "One lesson from observability carried directly into testing. Reports shouldn't simply say: PASS They should explain **why**. A useful evaluation summary includes:"
    },
    {
      "t": "list",
      "items": [
        "workflows executed",
        "success rate",
        "failed scenarios",
        "validation results",
        "retry statistics",
        "token changes",
        "latency differences",
        "prompt version",
        "model version"
      ]
    },
    {
      "t": "p",
      "text": "That makes reviews much more meaningful than a simple pass/fail indicator."
    },
    {
      "t": "h3",
      "text": "Human Evaluation Still Matters"
    },
    {
      "t": "p",
      "text": "Automation doesn't eliminate human judgement. It changes where humans spend their time. Instead of manually checking hundreds of routine scenarios, reviewers focus on:"
    },
    {
      "t": "list",
      "items": [
        "nuanced language quality",
        "empathy",
        "clarity",
        "tone",
        "domain-specific correctness"
      ]
    },
    {
      "t": "p",
      "text": "Automation verifies predictable behaviour. Humans evaluate subjective quality. Together they create a much stronger review process."
    },
    {
      "t": "h3",
      "text": "Every Deployment Teaches the Platform"
    },
    {
      "t": "p",
      "text": "One unexpected benefit emerged over time. Every production issue eventually became:"
    },
    {
      "t": "list",
      "items": [
        "a new golden dataset scenario",
        "a new regression test",
        "a stronger evaluation suite"
      ]
    },
    {
      "t": "p",
      "text": "The testing framework evolved alongside the platform. Instead of remaining static, it continuously learned from production experience. That's exactly how mature software test suites grow."
    },
    {
      "t": "h3",
      "text": "The Evaluation Lifecycle"
    },
    {
      "t": "p",
      "text": "Looking back, evaluation became another continuous engineering loop."
    },
    {
      "t": "diagram",
      "text": "Code or Prompt Change\n          │\n          ▼\nAutomated Evaluation\n          │\n          ▼\nRegression Analysis\n          │\n          ▼\nDeployment Decision\n          │\n          ▼\nProduction Monitoring\n          │\n          ▼\nNew Test Cases"
    },
    {
      "t": "p",
      "text": "Notice the feedback loop. Production informs testing. Testing protects production. Each cycle strengthens the platform."
    },
    {
      "t": "h3",
      "text": "The Biggest Lesson"
    },
    {
      "t": "code",
      "text": "If there's one engineering principle I'd carry into every future AI project, it's this:"
    },
    {
      "t": "pull",
      "text": "Don't deploy because the output looks good. Deploy because the evidence says the workflow is still reliable."
    },
    {
      "t": "p",
      "text": "That shift—from subjective confidence to measurable evidence—is what turns AI development into AI engineering."
    },
    {
      "t": "h2",
      "text": "Evaluation Is an Engineering Discipline, Not an AI Feature"
    },
    {
      "t": "p",
      "text": "When people first start building AI applications, evaluation usually happens informally. A prompt is updated. A few example questions are tried. The responses look better. The change is deployed. That approach works surprisingly well. Until the platform grows. Once multiple agents collaborate, prompts evolve independently, workflows become more sophisticated, and multiple engineers contribute changes, informal testing stops being sufficient."
    },
    {
      "t": "p",
      "text": "At that point, evaluation becomes infrastructure. Not because AI is special. Because production software requires confidence."
    },
    {
      "t": "h3",
      "text": "Confidence Comes From Evidence"
    },
    {
      "t": "p",
      "text": "One realization shaped almost every deployment in PHHM."
    },
    {
      "t": "pull",
      "text": "Confidence should come from measurements, not intuition."
    },
    {
      "t": "p",
      "text": "A developer may believe a prompt is better. An evaluation pipeline demonstrates whether the workflow actually improved. Those aren't the same thing. Engineering should always prefer evidence over opinion."
    },
    {
      "t": "h3",
      "text": "Every Deployment Becomes an Experiment"
    },
    {
      "t": "p",
      "text": "Instead of treating deployments as final decisions, we began treating them as controlled experiments. Every release answers questions such as:"
    },
    {
      "t": "list",
      "items": [
        "Did workflow completion improve?",
        "Did validation failures increase?",
        "Did retries decrease?",
        "Did latency remain acceptable?",
        "Did token consumption change?",
        "Did routing behaviour remain stable?"
      ]
    },
    {
      "t": "p",
      "text": "Every deployment generates new operational evidence. That evidence guides the next improvement."
    },
    {
      "t": "h3",
      "text": "Production Closes the Feedback Loop"
    },
    {
      "t": "p",
      "text": "One lesson from previous articles becomes incredibly important here. Evaluation doesn't end when deployment succeeds. Production continues evaluating every workflow."
    },
    {
      "t": "diagram",
      "text": "Development\n      │\n      ▼\nRegression Tests\n      │\n      ▼\nDeployment\n      │\n      ▼\nProduction Metrics\n      │\n      ▼\nObservability\n      │\n      ▼\nNew Test Cases"
    },
    {
      "t": "p",
      "text": "The platform continuously teaches the evaluation pipeline. Every production incident becomes another opportunity to strengthen future releases."
    },
    {
      "t": "h3",
      "text": "Testing Protects Innovation"
    },
    {
      "t": "p",
      "text": "One unexpected benefit was psychological rather than technical. Engineers became more willing to improve the platform. Why? Because they trusted the safety net. Without regression testing:"
    },
    {
      "t": "code",
      "text": "\"I'm not sure this change is safe.\""
    },
    {
      "t": "p",
      "text": "With regression testing:"
    },
    {
      "t": "code",
      "text": "\"Let's evaluate it.\""
    },
    {
      "t": "p",
      "text": "That confidence accelerated development while reducing operational risk. Ironically, better testing allowed us to move faster."
    },
    {
      "t": "h3",
      "text": "Evaluation Is About Behaviour"
    },
    {
      "t": "p",
      "text": "Looking back, the biggest mistake we made early was focusing on responses. Eventually we realized we should have been measuring behaviour instead. For every workflow we asked questions like:"
    },
    {
      "t": "list",
      "items": [
        "Did the correct specialist execute?",
        "Was the routing decision correct?",
        "Were contracts preserved?",
        "Did validation succeed?",
        "Was recovery required?",
        "Did the workflow complete successfully?"
      ]
    },
    {
      "t": "p",
      "text": "Those questions remain meaningful regardless of which model generated the text. Behaviour survives model upgrades. Prompt wording changes. Framework migrations. That's exactly why behavioural evaluation ages so well."
    },
    {
      "t": "h3",
      "text": "The Complete Quality Pipeline"
    },
    {
      "t": "p",
      "text": "By the end of the project, every significant change followed the same lifecycle."
    },
    {
      "t": "diagram",
      "text": "Prompt or Code Change\n          │\n          ▼\nAutomated Build\n          │\n          ▼\nWorkflow Regression Suite\n          │\n          ▼\nBehaviour Evaluation\n          │\n          ▼\nQuality Gates\n          │\n          ▼\nDeployment\n          │\n          ▼\nProduction Observability\n          │\n          ▼\nContinuous Improvement"
    },
    {
      "t": "p",
      "text": "Notice the progression. Evaluation isn't a single step. It's part of an ongoing engineering cycle."
    },
    {
      "t": "h3",
      "text": "The Architecture We Ended Up With"
    },
    {
      "t": "p",
      "text": "When evaluation became a first-class capability, it connected every previous architectural layer."
    },
    {
      "t": "diagram",
      "text": "                Developer\n                    │\n                    ▼\n          Prompt / Code Changes\n                    │\n                    ▼\n          Configuration Updates\n                    │\n                    ▼\n       Automated Evaluation Pipeline\n                    │\n                    ▼\n        Workflow Regression Suite\n                    │\n                    ▼\n         Behaviour Verification\n                    │\n                    ▼\n          Quality Gate Decision\n                    │\n                    ▼\n              Production Deploy\n                    │\n                    ▼\n        Observability & Telemetry\n                    │\n                    ▼\n          New Regression Tests"
    },
    {
      "t": "p",
      "text": "The important point is that evaluation doesn't replace observability. It complements it. Observability explains what happened. Evaluation helps prevent the same issue from happening again."
    },
    {
      "t": "h3",
      "text": "The Five Principles of AI Evaluation"
    },
    {
      "t": "p",
      "text": "If I were building another multi-agent AI platform tomorrow, these are the principles I'd follow from day one."
    },
    {
      "t": "pull",
      "text": "1. Test workflows—not prompts"
    },
    {
      "t": "p",
      "text": "Users experience complete workflows. That's the unit that deserves evaluation."
    },
    {
      "t": "pull",
      "text": "2. Measure behaviour instead of wording"
    },
    {
      "t": "p",
      "text": "Routing, validation, contracts, retries, and successful completion are more stable indicators than exact text."
    },
    {
      "t": "pull",
      "text": "3. Automate every regression"
    },
    {
      "t": "p",
      "text": "Manual testing doesn't scale. Regression testing should be part of every deployment pipeline."
    },
    {
      "t": "pull",
      "text": "4. Learn from production"
    },
    {
      "t": "p",
      "text": "Every incident should become another regression test. Production continuously improves the evaluation suite."
    },
    {
      "t": "pull",
      "text": "5. Let evidence drive deployments"
    },
    {
      "t": "p",
      "text": "Ship changes because the workflow demonstrated reliability—not because the output looked impressive."
    },
    {
      "t": "h3",
      "text": "Final Thoughts"
    },
    {
      "t": "p",
      "text": "When I started building PHHM, I assumed the biggest challenge would be writing effective prompts. It wasn't. The harder challenge was creating an engineering process that allowed those prompts to evolve safely. That required a shift in perspective. Instead of asking:"
    },
    {
      "t": "pull",
      "text": "\"Is this prompt better?\""
    },
    {
      "t": "p",
      "text": "We started asking:"
    },
    {
      "t": "pull",
      "text": "\"Is the platform still behaving correctly?\""
    },
    {
      "t": "p",
      "text": "That single question influenced every evaluation strategy we adopted. It led us to:"
    },
    {
      "t": "list",
      "items": [
        "test workflows instead of prompts",
        "measure behaviour instead of wording",
        "automate regression testing",
        "integrate evaluation into CI/CD",
        "treat production incidents as future test cases"
      ]
    },
    {
      "t": "p",
      "text": "The prompts improved over time. The evaluation pipeline made those improvements safe to deploy. That's the difference between experimenting with AI and operating an AI platform."
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
        "Build golden datasets around real workflows.",
        "Assert behaviour rather than exact wording.",
        "Version evaluation datasets alongside prompts and configuration.",
        "Include successful paths and recovery paths in every regression suite.",
        "Measure latency, retries, validation, and token usage—not just output quality.",
        "Automate workflow evaluation inside your deployment pipeline.",
        "Turn every production incident into a permanent regression test.",
        "Combine automated evaluation with targeted human review.",
        "Use observability to continuously strengthen your evaluation suite.",
        "Treat workflow reliability as the primary deployment metric."
      ]
    }
  ]
} as ArticleData;

export default function EvaluationArticle() {
  return <ArticleShell article={article} />;
}
