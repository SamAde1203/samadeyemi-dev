"use client";

import ArticleShell, { type ArticleData } from "./ArticleShell";

const article = {
  "kicker": "PHHM Journal • Testing",
  "focus": "Testing",
  "icon": "testtube",
  "title": "Testing AI Systems Without Calling a Single LLM",
  "subtitle": "How PHHM runs thousands of regression tests in CI/CD without spending money on API calls—and why most AI behaviour can be verified before a model is ever invoked.",
  "readTime": "10 min",
  "blocks": [
    {
      "t": "p",
      "text": "One question came up repeatedly as PHHM grew."
    },
    {
      "t": "pull",
      "text": "\"How do you run regression tests without spending hundreds of dollars on API calls?\""
    },
    {
      "t": "p",
      "text": "At first, our answer was simple. We didn't. Every test invoked a live language model. Every pull request generated real completions. Every workflow consumed real tokens. It worked. Until it didn't. As the platform expanded, so did the test suite."
    },
    {
      "t": "p",
      "text": "A single change to the orchestration layer triggered hundreds of AI calls. CI pipelines slowed down. Costs increased. Test results became inconsistent because language models don't produce identical outputs every time. The problem wasn't our code. It was our testing strategy. That's when we realized something important."
    },
    {
      "t": "pull",
      "text": "Most of our platform wasn't AI."
    },
    {
      "t": "p",
      "text": "It was orchestration. Routing. Validation. State management. Permissions. Retries. Observability. Workflow execution."
    },
    {
      "t": "p",
      "text": "None of those components require a language model to verify. Once we separated platform behaviour from model behaviour, our testing strategy changed completely. Today, PHHM runs **well over a thousand regression tests** during CI without making a single production LLM call. The result?"
    },
    {
      "t": "list",
      "items": [
        "Faster feedback.",
        "Zero API cost.",
        "Deterministic test results.",
        "Higher confidence before deployment."
      ]
    },
    {
      "t": "p",
      "text": "Ironically, removing the language model from most tests made us significantly better at testing AI systems."
    },
    {
      "t": "h3",
      "text": "The Biggest Misconception in AI Testing"
    },
    {
      "t": "p",
      "text": "Early on, we assumed every AI feature required a real AI model during testing. That assumption felt reasonable. If an application depends on GPT-4, surely every test should call GPT-4. The longer we worked on PHHM, the more that assumption broke down. Consider a simple workflow."
    },
    {
      "t": "diagram",
      "text": "User Request\n↓\nOverseer\n↓\nAnalyst\n↓\nValidation\n↓\nCare\n↓\nResponse"
    },
    {
      "t": "p",
      "text": "How much of that flow actually depends on a language model? Surprisingly little. Most of the workflow is ordinary software engineering. The LLM contributes one step. The platform contributes everything else."
    },
    {
      "t": "h3",
      "text": "AI Platforms Are Mostly Software"
    },
    {
      "t": "p",
      "text": "This realization completely changed how we thought about testing. Instead of viewing PHHM as \"an AI application,\" we started viewing it as a software platform that happened to use language models. That distinction matters. Because software platforms have decades of testing practices we can reuse. We don't need to reinvent testing. We need to decide **which parts genuinely require intelligence** and which parts simply require correctness."
    },
    {
      "t": "h3",
      "text": "Two Different Kinds of Tests"
    },
    {
      "t": "p",
      "text": "Eventually, our entire testing strategy split into two categories."
    },
    {
      "t": "diagram",
      "text": "Platform Tests\n↓\nNo LLM Required\n──────────────\nModel Tests\n↓\nLive LLM Required"
    },
    {
      "t": "p",
      "text": "That separation immediately reduced both cost and complexity."
    },
    {
      "t": "pull",
      "text": "What Doesn't Need an LLM?"
    },
    {
      "t": "p",
      "text": "More than most teams expect. For example, we can fully test:"
    },
    {
      "t": "list",
      "items": [
        "workflow routing",
        "YAML loading",
        "configuration parsing",
        "permission checks",
        "validation rules",
        "retry logic",
        "workflow state transitions",
        "execution IDs",
        "correlation IDs",
        "observability",
        "audit logging",
        "deployment behaviour"
      ]
    },
    {
      "t": "p",
      "text": "None of those require generated text. They're deterministic engineering problems."
    },
    {
      "t": "pull",
      "text": "What Does Need an LLM?"
    },
    {
      "t": "p",
      "text": "Some behaviours genuinely require live models. For example:"
    },
    {
      "t": "list",
      "items": [
        "reasoning quality",
        "summarization",
        "tone",
        "empathy",
        "hallucination resistance",
        "prompt effectiveness",
        "instruction following"
      ]
    },
    {
      "t": "p",
      "text": "Those tests remain important. They're simply a much smaller part of the overall test suite."
    },
    {
      "t": "h3",
      "text": "The Principle That Changed Everything"
    },
    {
      "t": "p",
      "text": "Looking back, one engineering principle reshaped our entire CI pipeline."
    },
    {
      "t": "pull",
      "text": "Don't test the model when you're trying to test the platform."
    },
    {
      "t": "p",
      "text": "That single sentence reduced costs, improved reliability, and made every deployment pipeline dramatically faster."
    },
    {
      "t": "h2",
      "text": "Designing a Mockable AI Platform"
    },
    {
      "t": "p",
      "text": "The biggest architectural change wasn't in our tests. It was in our application. Early versions of PHHM called the language model directly from individual agents."
    },
    {
      "t": "code",
      "text": "response = client.responses.create(...)"
    },
    {
      "t": "p",
      "text": "It worked. Until we wanted to test the workflow. Now every unit test needed:"
    },
    {
      "t": "list",
      "items": [
        "API credentials",
        "network access",
        "available quota",
        "a live model",
        "deterministic luck"
      ]
    },
    {
      "t": "p",
      "text": "None of those belong in a fast test suite. The problem wasn't OpenAI. The problem was our architecture."
    },
    {
      "t": "h3",
      "text": "Separate the Interface from the Implementation"
    },
    {
      "t": "p",
      "text": "Instead of allowing agents to call models directly, every interaction now goes through a common interface."
    },
    {
      "t": "diagram",
      "text": "Agent\n↓\nLLM Interface\n├── Production Model\n└── Mock Model"
    },
    {
      "t": "p",
      "text": "The agent no longer knows whether it's talking to GPT-4, another provider, or a test double. It simply requests a completion. That separation became the foundation of our entire testing strategy."
    },
    {
      "t": "h3",
      "text": "Dependency Injection Makes Testing Easy"
    },
    {
      "t": "p",
      "text": "Once we introduced an abstraction layer, swapping implementations became trivial. In production:"
    },
    {
      "t": "code",
      "text": "llm = OpenAIProvider()"
    },
    {
      "t": "p",
      "text": "During testing:"
    },
    {
      "t": "code",
      "text": "llm = MockProvider()"
    },
    {
      "t": "p",
      "text": "Nothing inside the workflow changes. The orchestrator executes exactly the same logic. Only the implementation behind the interface is different. That's a classic software engineering technique—and it works just as well for AI."
    },
    {
      "t": "pull",
      "text": "What Does the Mock Actually Return?"
    },
    {
      "t": "p",
      "text": "One misconception is that a mock has to generate realistic AI responses. It doesn't. Its job is to return predictable responses that allow the workflow to execute. For example:"
    },
    {
      "t": "code",
      "text": "{\n  \"summary\": \"Mock member summary\",\n  \"risk\": \"medium\",\n  \"recommendation\": \"Follow up within seven days.\"\n}"
    },
    {
      "t": "p",
      "text": "The wording doesn't matter. The structure does. We're testing orchestration—not creativity."
    },
    {
      "t": "h2",
      "text": "Deterministic Inputs Create Deterministic Tests"
    },
    {
      "t": "p",
      "text": "One of the biggest advantages of mocks is consistency. A live model may produce slightly different wording every time. A mock always produces the same response."
    },
    {
      "t": "diagram",
      "text": "Input\n↓\nMock Response\n↓\nValidation\n↓\nPASS"
    },
    {
      "t": "p",
      "text": "That predictability eliminates flaky tests. If a regression appears, it's because the platform changed—not because the model happened to phrase something differently."
    },
    {
      "t": "h3",
      "text": "Testing the Workflow, Not the Model"
    },
    {
      "t": "p",
      "text": "Once the model became replaceable, our tests became much more focused. Instead of asking:"
    },
    {
      "t": "code",
      "text": "\"Did GPT produce a good answer?\""
    },
    {
      "t": "p",
      "text": "We asked:"
    },
    {
      "t": "list",
      "items": [
        "Did the Overseer choose the correct workflow?",
        "Did the expected agents execute?",
        "Was workflow state updated correctly?",
        "Did validation pass?",
        "Were retries triggered appropriately?",
        "Was the final response assembled correctly?"
      ]
    },
    {
      "t": "p",
      "text": "Those questions remain valuable regardless of which model powers the platform."
    },
    {
      "t": "h3",
      "text": "Golden Responses Replace Live Completions"
    },
    {
      "t": "p",
      "text": "Earlier in the series we discussed golden datasets. Here they become incredibly powerful. Instead of calling a model, the mock loads a predefined response."
    },
    {
      "t": "diagram",
      "text": "Test Scenario\n↓\nGolden Response\n↓\nWorkflow Execution\n↓\nAssertions"
    },
    {
      "t": "p",
      "text": "The workflow behaves exactly as though an LLM had responded."
    },
    {
      "t": "code",
      "text": "Except:"
    },
    {
      "t": "list",
      "items": [
        "there's no network latency",
        "there are no API costs",
        "there is no output variation"
      ]
    },
    {
      "t": "p",
      "text": "That's ideal for regression testing."
    },
    {
      "t": "h3",
      "text": "Behaviour Matters More Than Text"
    },
    {
      "t": "p",
      "text": "One temptation is to compare generated text character by character. We deliberately avoid that. Instead, every test focuses on behaviour. For example:"
    },
    {
      "t": "list",
      "items": [
        "Was the correct workflow selected?",
        "Did the right validation schema execute?",
        "Was the response accepted?",
        "Did downstream agents receive the expected structure?",
        "Was the workflow completed?"
      ]
    },
    {
      "t": "p",
      "text": "The exact wording is irrelevant. The workflow behaviour is what matters."
    },
    {
      "t": "h3",
      "text": "CI Pipelines Became Dramatically Faster"
    },
    {
      "t": "p",
      "text": "Removing live model calls had an immediate operational impact. Our continuous integration pipeline no longer waited for external APIs."
    },
    {
      "t": "diagram",
      "text": "Git Push\n↓\nUnit Tests\n↓\nWorkflow Tests\n↓\nRegression Suite\n↓\nDeploy"
    },
    {
      "t": "p",
      "text": "Everything runs locally. Everything is deterministic. Most importantly, every engineer gets rapid feedback without consuming AI credits. That encourages frequent testing rather than avoiding it because it's slow or expensive."
    },
    {
      "t": "h3",
      "text": "Faster Tests Encourage Better Engineering"
    },
    {
      "t": "p",
      "text": "One unexpected benefit had nothing to do with AI. When the test suite became fast, engineers started writing more tests. A workflow that takes milliseconds to verify gets tested often. A workflow that depends on dozens of external API calls usually doesn't. Reducing friction improved engineering discipline across the project."
    },
    {
      "t": "h3",
      "text": "The Mock Isn't Pretending to Be Smart"
    },
    {
      "t": "p",
      "text": "This is an important distinction. Our mock doesn't attempt to simulate a language model. It doesn't invent new responses. It doesn't generate creative text. It simply provides known outputs so the rest of the platform can be exercised. That's exactly what a good test double should do. Its purpose isn't realism. Its purpose is isolation."
    },
    {
      "t": "h3",
      "text": "The Bigger Lesson"
    },
    {
      "t": "p",
      "text": "Looking back, one principle reshaped our entire testing strategy."
    },
    {
      "t": "pull",
      "text": "Mock the dependency. Test the behaviour."
    },
    {
      "t": "p",
      "text": "The language model is a dependency. The workflow is the behaviour. Separating those two ideas allowed us to build a regression suite that was:"
    },
    {
      "t": "list",
      "items": [
        "deterministic",
        "inexpensive",
        "fast",
        "reliable",
        "easy to run on every pull request"
      ]
    },
    {
      "t": "p",
      "text": "That's a much stronger foundation than relying on live model calls for every test."
    },
    {
      "t": "h3",
      "text": "The AI Testing Pyramid: Balancing Speed, Cost, and Confidence"
    },
    {
      "t": "p",
      "text": "By the time PHHM matured, one thing had become obvious. Neither extreme worked. Testing everything with mocks missed model-specific problems. Testing everything with live LLMs made CI painfully slow, expensive, and inconsistent. The answer wasn't choosing one approach. It was combining both. The goal became simple:"
    },
    {
      "t": "pull",
      "text": "Use the cheapest test that still gives you meaningful confidence."
    },
    {
      "t": "p",
      "text": "That philosophy shaped our entire testing strategy."
    },
    {
      "t": "h3",
      "text": "Not Every Test Needs Intelligence"
    },
    {
      "t": "p",
      "text": "One mistake many teams make is assuming every AI-related feature requires a live model. In reality, most engineering questions have nothing to do with language generation. For example:"
    },
    {
      "t": "list",
      "items": [
        "Did the correct workflow execute?",
        "Was the right agent selected?",
        "Was validation successful?",
        "Did retries behave correctly?",
        "Was workflow state updated?",
        "Were audit records created?",
        "Did observability capture the execution?"
      ]
    },
    {
      "t": "p",
      "text": "Those questions don't require GPT-4. They require deterministic software tests."
    },
    {
      "t": "h3",
      "text": "Build Confidence in Layers"
    },
    {
      "t": "p",
      "text": "Instead of relying on one giant test suite, PHHM evaluates the platform in layers."
    },
    {
      "t": "diagram",
      "text": "                Manual Evaluation\n                      ▲\n               Live LLM Testing\n                      ▲\n          Workflow Regression Tests\n                      ▲\n              Unit & Integration Tests"
    },
    {
      "t": "p",
      "text": "Each layer answers different questions. Together they provide confidence without unnecessary cost."
    },
    {
      "t": "h3",
      "text": "Layer 1: Unit Tests"
    },
    {
      "t": "p",
      "text": "The foundation is exactly what you'd expect in any Python application. We test:"
    },
    {
      "t": "list",
      "items": [
        "routing logic",
        "YAML parsing",
        "validation rules",
        "state management",
        "configuration loading",
        "retry policies",
        "utility functions"
      ]
    },
    {
      "t": "p",
      "text": "These tests run in milliseconds. No models. No APIs. No network. Thousands can execute on every pull request."
    },
    {
      "t": "h3",
      "text": "Layer 2: Workflow Regression"
    },
    {
      "t": "p",
      "text": "Above that sits the workflow regression suite. These tests replace live models with deterministic mocks."
    },
    {
      "t": "diagram",
      "text": "Golden Dataset\n↓\nMock Provider\n↓\nWorkflow Execution\n↓\nAssertions"
    },
    {
      "t": "p",
      "text": "Now we're testing the complete orchestration layer. Exactly the same routing. Exactly the same validation. Exactly the same workflow state. Without paying for AI inference. This became the largest layer in our testing strategy."
    },
    {
      "t": "h3",
      "text": "Layer 3: Live Model Evaluation"
    },
    {
      "t": "p",
      "text": "Eventually, some questions genuinely require intelligence. Examples include:"
    },
    {
      "t": "list",
      "items": [
        "reasoning quality",
        "summarization accuracy",
        "instruction following",
        "prompt effectiveness",
        "tone",
        "empathy",
        "hallucination resistance"
      ]
    },
    {
      "t": "p",
      "text": "Those evaluations still use live language models. They're simply executed far less frequently. Instead of every commit, they typically run:"
    },
    {
      "t": "list",
      "items": [
        "before releases",
        "after prompt changes",
        "during scheduled evaluations",
        "when introducing new models"
      ]
    },
    {
      "t": "p",
      "text": "That dramatically reduces cost while preserving confidence."
    },
    {
      "t": "h3",
      "text": "Layer 4: Human Review"
    },
    {
      "t": "p",
      "text": "Automation eventually reaches its limits. Some qualities remain subjective. For example:"
    },
    {
      "t": "list",
      "items": [
        "clarity",
        "empathy",
        "readability",
        "usefulness",
        "domain-specific nuance"
      ]
    },
    {
      "t": "p",
      "text": "Those are evaluated by humans. Importantly, humans no longer review every workflow. Automation filters out routine cases. Human attention focuses on the areas where judgement genuinely adds value."
    },
    {
      "t": "h3",
      "text": "CI/CD Becomes Predictable"
    },
    {
      "t": "p",
      "text": "Separating these layers transformed our deployment pipeline."
    },
    {
      "t": "diagram",
      "text": "Git Push\n↓\nUnit Tests\n↓\nWorkflow Regression\n↓\nQuality Gates\n↓\nMerge\n↓\nScheduled Live Evaluation\n↓\nProduction"
    },
    {
      "t": "p",
      "text": "Most pull requests now complete quickly because they never wait for external AI services. That encourages engineers to run the pipeline often. Fast feedback creates better engineering habits."
    },
    {
      "t": "h3",
      "text": "Live Models Become Validation, Not Infrastructure"
    },
    {
      "t": "p",
      "text": "One mindset shift changed everything. We stopped treating language models as part of our testing infrastructure. We started treating them as another dependency to validate. That distinction matters. Our CI pipeline shouldn't fail because an external API is slow. It should fail because our platform regressed. Separating those concerns made the entire delivery process much more reliable."
    },
    {
      "t": "h3",
      "text": "Confidence Comes from Diversity"
    },
    {
      "t": "p",
      "text": "No single testing technique catches every problem. Mocks verify deterministic behaviour. Regression suites protect workflows. Live evaluations verify reasoning. Humans assess quality. Observability monitors production. Together they create overlapping layers of confidence. That's far stronger than depending on one expensive end-to-end test."
    },
    {
      "t": "h3",
      "text": "The Architecture We Ended Up With"
    },
    {
      "t": "p",
      "text": "By the end of the project, testing had become another first-class architectural capability."
    },
    {
      "t": "diagram",
      "text": "              Developer\n                   │\n                   ▼\n             Git Commit\n                   │\n                   ▼\n          Unit & Integration Tests\n                   │\n                   ▼\n       Mock-Based Workflow Tests\n                   │\n                   ▼\n            Regression Suite\n                   │\n                   ▼\n            Quality Gates\n                   │\n                   ▼\n               Deployment\n                   │\n                   ▼\n        Live Model Evaluation\n                   │\n                   ▼\n          Production Monitoring\n                   │\n                   ▼\n         New Golden Test Cases"
    },
    {
      "t": "p",
      "text": "Notice the feedback loop. Production continuously strengthens the test suite. Every incident becomes another deterministic regression test. That's how confidence compounds over time."
    },
    {
      "t": "h3",
      "text": "The Five Principles of AI Testing"
    },
    {
      "t": "p",
      "text": "If I were building another production AI platform tomorrow, these are the principles I'd adopt from day one."
    },
    {
      "t": "pull",
      "text": "1. Test the platform separately from the model"
    },
    {
      "t": "p",
      "text": "Most regressions occur in orchestration, validation, state management, and workflow logic. Those don't require an LLM."
    },
    {
      "t": "pull",
      "text": "2. Mock external dependencies"
    },
    {
      "t": "p",
      "text": "Language models are external services. Treat them like any other dependency during automated testing."
    },
    {
      "t": "pull",
      "text": "3. Reserve live evaluations for behavioural quality"
    },
    {
      "t": "p",
      "text": "Use real models to verify reasoning, instruction following, and prompt effectiveness—not routing logic."
    },
    {
      "t": "pull",
      "text": "4. Make deterministic tests your default"
    },
    {
      "t": "p",
      "text": "The faster and more predictable the test suite, the more frequently engineers will use it."
    },
    {
      "t": "pull",
      "text": "5. Let production improve the test suite"
    },
    {
      "t": "p",
      "text": "Every bug. Every incident. Every regression. Should become another permanent test. Over time, your testing strategy becomes smarter than any single engineer's memory."
    },
    {
      "t": "h3",
      "text": "Final Thoughts"
    },
    {
      "t": "p",
      "text": "When we started PHHM, we assumed AI systems required AI-powered testing. Experience taught us something different. Most of the platform wasn't artificial intelligence. It was software engineering. That meant decades of proven testing practices still applied. Dependency injection. Test doubles. Golden datasets."
    },
    {
      "t": "p",
      "text": "Behavioural assertions. Regression suites. Continuous integration. Observability. The language model changed what our application could do. It didn't change how disciplined engineering teams build reliable systems. Today, our CI pipeline executes thousands of regression tests without making a single production LLM call. Not because we don't trust language models."
    },
    {
      "t": "p",
      "text": "Because we understand exactly **which parts of the platform actually require one.** That's the difference between testing an AI model... ...and testing an AI platform."
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
        "Separate platform testing from model evaluation.",
        "Introduce an LLM interface so providers can be mocked during testing.",
        "Use dependency injection to swap production and mock implementations.",
        "Build golden datasets around workflows rather than individual prompts.",
        "Assert behaviour instead of exact wording.",
        "Run deterministic regression suites on every pull request.",
        "Reserve live model evaluations for reasoning, quality, and prompt validation.",
        "Keep human review focused on subjective qualities that automation can't reliably assess.",
        "Feed production incidents back into your regression suite.",
        "Build an AI testing pyramid that balances speed, cost, and confidence."
      ]
    }
  ]
} as ArticleData;

export default function TestingWithoutLLMArticle() {
  return <ArticleShell article={article} />;
}
