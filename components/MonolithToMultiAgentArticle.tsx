"use client";

import ArticleShell, { type ArticleData } from "./ArticleShell";

const article = {
  "kicker": "PHHM Journal • Refactoring",
  "focus": "Refactoring",
  "icon": "recycle",
  "title": "From Monolith to Multi-Agent: The Refactoring We Should Have Done Earlier",
  "subtitle": "Why the biggest performance improvement in PHHM came from admitting our first architecture had reached its limits—and how we rebuilt it without breaking production.",
  "readTime": "11 min",
  "blocks": [
    {
      "t": "p",
      "text": "PHHM wasn't designed as a multi-agent platform. It became one. That's an important distinction. When I started building it, there was no Overseer. No specialist agents. No orchestration layer. No workflow engine. There was one API endpoint."
    },
    {
      "t": "p",
      "text": "One language model. One carefully engineered prompt. One increasingly large Python application. For weeks, it worked remarkably well. New features were easy to add. The prompt grew. The application grew. Users were happy."
    },
    {
      "t": "p",
      "text": "Looking back, that architecture wasn't wrong. It was simply optimized for the version of the product that existed at the time. The problems only appeared later. Every new capability made the prompt longer. Every new workflow added another conditional. Every deployment became harder to reason about. Eventually, changing one section of the prompt unexpectedly affected completely unrelated features. The platform wasn't collapsing."
    },
    {
      "t": "p",
      "text": "It was becoming fragile. The breaking point came when we introduced the fourth major workflow. Not because four is a magical number. Because that was the moment we realized we weren't maintaining one AI assistant anymore. We were maintaining several different products pretending to be one. That realization triggered the biggest architectural refactor in PHHM's history. Ironically, we didn't rebuild the platform because it stopped working. We rebuilt it because it became too expensive to keep evolving."
    },
    {
      "t": "h3",
      "text": "The Architecture That Got Us Started"
    },
    {
      "t": "p",
      "text": "Early PHHM was intentionally simple."
    },
    {
      "t": "diagram",
      "text": "          User Request\n               │\n               ▼\n           FastAPI API\n               │\n               ▼\n        Single AI Prompt\n               │\n               ▼\n        Business Logic\n               │\n               ▼\n         Final Response"
    },
    {
      "t": "p",
      "text": "That's it. No orchestration. No routing. No agent coordination. No YAML configuration. Just one carefully designed prompt responsible for everything. For an early-stage product, that simplicity was an advantage. There were fewer moving parts."
    },
    {
      "t": "p",
      "text": "Fewer deployment concerns. Less infrastructure to maintain. If someone asked whether I would build the first version the same way again... My answer would be yes."
    },
    {
      "t": "h3",
      "text": "Simplicity Has a Hidden Expiration Date"
    },
    {
      "t": "p",
      "text": "The first architecture optimized for one thing. Shipping. Adding new capabilities usually meant editing one prompt. Adding another validation rule. Writing another conditional. That velocity was incredibly valuable during the early weeks of development. The architecture wasn't limiting us. It was accelerating us."
    },
    {
      "t": "p",
      "text": "The mistake wasn't starting with a monolith. The mistake would have been refusing to leave it once the product outgrew it."
    },
    {
      "t": "h3",
      "text": "The First Signs of Trouble"
    },
    {
      "t": "p",
      "text": "The warning signs appeared gradually. Nothing failed dramatically. Instead, engineering work became noticeably harder. A small change to onboarding unexpectedly influenced care recommendations. Improving newsletter generation subtly affected member summaries. Prompt reviews became longer. Testing became slower. Debugging required understanding one increasingly complex prompt that now tried to solve several unrelated problems."
    },
    {
      "t": "p",
      "text": "Every deployment carried a little more uncertainty than the last. None of those issues were catastrophic on their own. Together, they formed a pattern."
    },
    {
      "t": "h3",
      "text": "The Cost of Shared Responsibility"
    },
    {
      "t": "p",
      "text": "One prompt had quietly accumulated too many responsibilities. It was trying to:"
    },
    {
      "t": "list",
      "items": [
        "welcome new members",
        "analyse profiles",
        "generate care recommendations",
        "write communications",
        "produce faith-based content",
        "maintain workflow context",
        "adapt tone",
        "preserve formatting"
      ]
    },
    {
      "t": "p",
      "text": "Every improvement for one responsibility risked changing another. That's one of the defining characteristics of a monolith. The boundaries between features become increasingly difficult to see."
    },
    {
      "t": "h3",
      "text": "The Fourth Workflow Changed Everything"
    },
    {
      "t": "p",
      "text": "The tipping point wasn't technical. It was architectural. When we added the fourth major workflow, we realized something uncomfortable. We weren't extending one assistant. We were combining several specialists into one increasingly overloaded system. The platform had evolved. The architecture hadn't."
    },
    {
      "t": "h3",
      "text": "The Question That Changed the Refactor"
    },
    {
      "t": "p",
      "text": "During one architecture review, someone asked a deceptively simple question."
    },
    {
      "t": "pull",
      "text": "\"If we were building this today, would we still put all of this into one prompt?\""
    },
    {
      "t": "p",
      "text": "The room became very quiet. Because everyone already knew the answer. No. Not because the first architecture had failed. Because the product had changed. The architecture simply hadn't caught up. That question marked the beginning of the refactor."
    },
    {
      "t": "h3",
      "text": "The Principle That Guided Everything"
    },
    {
      "t": "p",
      "text": "Looking back, one lesson explains why the transition happened."
    },
    {
      "t": "pull",
      "text": "Good architectures don't fail overnight. They quietly become harder to change."
    },
    {
      "t": "p",
      "text": "That's exactly what happened to PHHM. The system still worked. The engineering experience no longer did. And that was enough reason to redesign it."
    },
    {
      "t": "h2",
      "text": "When Complexity Started Winning"
    },
    {
      "t": "p",
      "text": "The turning point wasn't a production outage. It wasn't a failed deployment. It wasn't even a particularly difficult bug. It was a pull request. Adding what should have been a small feature required changes in four different parts of the prompt. A review that should have taken minutes turned into an afternoon of discussion. Everyone understood the change. Nobody could confidently predict its side effects."
    },
    {
      "t": "p",
      "text": "That's when we realized something important. The architecture wasn't slowing down the application. It was slowing down the engineers. And engineering velocity is one of the earliest indicators that an architecture has reached its limits."
    },
    {
      "t": "h3",
      "text": "Every New Feature Touched Everything Else"
    },
    {
      "t": "p",
      "text": "The monolithic prompt had gradually accumulated responsibilities that were never meant to live together. Adding a new onboarding improvement affected member reports. Changing recommendation wording influenced newsletters. Adjusting formatting unexpectedly changed downstream validation. Everything was connected."
    },
    {
      "t": "diagram",
      "text": "                One Prompt\n                     │\n     ┌───────────────┼───────────────┐\n     ▼               ▼               ▼\n Welcome        Member Reports    Care Plans\n     │               │               │\n     └───────────────┼───────────────┘\n                     ▼\n              Shared Behaviour"
    },
    {
      "t": "p",
      "text": "There was no isolation. Every feature shared the same reasoning space. That made experimentation increasingly risky."
    },
    {
      "t": "h3",
      "text": "The Prompt Wasn't Too Large"
    },
    {
      "t": "p",
      "text": "One misconception is that the prompt simply became too long. Length wasn't the real issue. Responsibility was. The prompt wasn't only generating text anymore. It was also deciding:"
    },
    {
      "t": "list",
      "items": [
        "workflow behaviour",
        "business rules",
        "formatting",
        "routing assumptions",
        "domain-specific reasoning",
        "contextual priorities"
      ]
    },
    {
      "t": "p",
      "text": "It had become an architectural bottleneck. Not because of token count. Because every concern lived in the same place."
    },
    {
      "t": "h3",
      "text": "Finding Natural Boundaries"
    },
    {
      "t": "p",
      "text": "Instead of immediately creating six agents, we asked a simpler question."
    },
    {
      "t": "pull",
      "text": "\"Which responsibilities naturally belong together?\""
    },
    {
      "t": "p",
      "text": "The answer appeared surprisingly quickly. We identified independent domains that already behaved like separate products. Welcome Member Analysis Care Planning Communications Faith Content Those weren't arbitrary categories."
    },
    {
      "t": "p",
      "text": "They already existed inside the monolithic prompt. We simply hadn't acknowledged them architecturally."
    },
    {
      "t": "h3",
      "text": "The First Extraction"
    },
    {
      "t": "p",
      "text": "Resisting the urge to split everything at once turned out to be one of the best decisions we made. Instead, we extracted a single responsibility. The Welcome workflow."
    },
    {
      "t": "code",
      "text": "          Before\n\n      One Large Prompt\n\n              │\n\n              ▼\n\n       Everything Happens"
    },
    {
      "t": "diagram",
      "text": "────────────────────────────"
    },
    {
      "t": "code",
      "text": "          After\n\n      Welcome Agent\n\n              │\n\n              ▼\n\n      Monolithic Prompt"
    },
    {
      "t": "p",
      "text": "At first glance, that doesn't look like much. Architecturally, it was huge. For the first time, one capability evolved independently from the rest of the platform."
    },
    {
      "t": "h3",
      "text": "One Agent Changed the Design"
    },
    {
      "t": "p",
      "text": "Extracting the Welcome Agent immediately exposed another problem. Something now needed to decide:"
    },
    {
      "t": "list",
      "items": [
        "when the Welcome Agent should execute",
        "when it shouldn't",
        "what happened next"
      ]
    },
    {
      "t": "p",
      "text": "The monolith had quietly been making those decisions internally. Now they had to exist somewhere else. That \"somewhere else\" eventually became the Overseer."
    },
    {
      "t": "h3",
      "text": "The Overseer Wasn't Planned"
    },
    {
      "t": "p",
      "text": "One interesting lesson from the refactor is that we never sat down intending to build an orchestration layer. The Overseer emerged naturally. Once multiple specialists existed, coordination became a separate responsibility."
    },
    {
      "t": "diagram",
      "text": "User Request\n↓\nOverseer\n├── Welcome\n├── Analyst\n├── Care\n└── Communications"
    },
    {
      "t": "p",
      "text": "The specialists focused on reasoning. The Overseer focused on coordination. That separation dramatically simplified both."
    },
    {
      "t": "h3",
      "text": "Specialists Became Smaller"
    },
    {
      "t": "p",
      "text": "The biggest improvement wasn't performance. It was clarity. Each agent now answered one question exceptionally well. The Analyst no longer worried about onboarding. The Communications Agent ignored care recommendations. The Welcome Agent knew nothing about newsletters. Each specialist became easier to understand. Easier to test."
    },
    {
      "t": "p",
      "text": "Easier to improve."
    },
    {
      "t": "h3",
      "text": "Handoffs Became Explicit"
    },
    {
      "t": "p",
      "text": "The monolith relied heavily on shared context. Everything happened inside one enormous reasoning process. Multi-agent architecture forced us to define contracts."
    },
    {
      "t": "diagram",
      "text": "Analyst\n↓\nStructured Output\n↓\nValidation\n↓\nCare Agent"
    },
    {
      "t": "p",
      "text": "Every handoff became visible. Every boundary became testable. Every assumption became documented. Ironically, introducing more components reduced overall complexity."
    },
    {
      "t": "h3",
      "text": "Validation Protected Every Boundary"
    },
    {
      "t": "p",
      "text": "Earlier in the PHHM series we explored schema validation. The refactor showed why it mattered so much. Every agent produced structured output. Every downstream component validated that structure before continuing."
    },
    {
      "t": "diagram",
      "text": "Agent Output\n↓\nSchema Validation\n↓\nBusiness Validation\n↓\nNext Agent"
    },
    {
      "t": "p",
      "text": "Without those checks, a small change inside one specialist could quietly break another. Validation transformed implicit assumptions into explicit contracts."
    },
    {
      "t": "h3",
      "text": "Small Refactors Reduced Risk"
    },
    {
      "t": "p",
      "text": "One temptation during large architectural changes is to redesign everything. We deliberately avoided that. Each extraction followed the same pattern."
    },
    {
      "t": "diagram",
      "text": "Choose One Responsibility\n↓\nExtract One Agent\n↓\nValidate Behaviour\n↓\nDeploy\n↓\nRepeat"
    },
    {
      "t": "p",
      "text": "No \"big bang\" rewrite. No weekend migration. Just a series of small, reversible improvements. Looking back, that probably reduced more risk than any technical decision we made."
    },
    {
      "t": "h3",
      "text": "Complexity Didn't Disappear"
    },
    {
      "t": "p",
      "text": "An important lesson emerged during the refactor. We didn't eliminate complexity. We redistributed it. The monolith concentrated complexity inside one prompt. The new architecture distributed complexity across:"
    },
    {
      "t": "list",
      "items": [
        "orchestration",
        "specialist agents",
        "validation",
        "workflow state",
        "configuration"
      ]
    },
    {
      "t": "p",
      "text": "At first, that sounds like more moving parts. Operationally, it was much simpler. Each component had one clearly defined responsibility."
    },
    {
      "t": "h3",
      "text": "The Biggest Lesson"
    },
    {
      "t": "p",
      "text": "Looking back, one engineering principle guided every successful extraction."
    },
    {
      "t": "pull",
      "text": "Don't split your system by technology. Split it by responsibility."
    },
    {
      "t": "p",
      "text": "We didn't create agents because multi-agent systems were fashionable. We created agents because the product had already evolved into multiple independent domains. The architecture finally caught up with the reality of the business."
    },
    {
      "t": "h2",
      "text": "Running Two Architectures at Once"
    },
    {
      "t": "p",
      "text": "The biggest mistake we could have made was switching everything overnight. The new architecture looked promising. The specialists were working. The Overseer correctly routed workflows. Validation was passing. On paper, we were ready. Production has a habit of exposing assumptions that paper never does. So we made a different decision."
    },
    {
      "t": "p",
      "text": "Instead of replacing the monolith... ...we ran both architectures at the same time."
    },
    {
      "t": "h3",
      "text": "Shadow Mode"
    },
    {
      "t": "p",
      "text": "Every production request still used the original platform. The new multi-agent system executed in the background. Users never saw its responses."
    },
    {
      "t": "diagram",
      "text": "                User Request\n                      │\n          ┌───────────┴───────────┐\n          ▼                       ▼\n   Monolithic Platform      Multi-Agent Platform\n          │                       │\n          ▼                       ▼\n User Receives Response     Internal Comparison"
    },
    {
      "t": "p",
      "text": "The monolith remained the source of truth. The new platform quietly proved itself. That decision removed almost all deployment pressure."
    },
    {
      "t": "h3",
      "text": "Comparing Behaviour, Not Text"
    },
    {
      "t": "p",
      "text": "One mistake would have been comparing responses word for word. Language models don't work that way. Different wording doesn't necessarily mean different quality. Instead, we compared behaviour. For every workflow we asked:"
    },
    {
      "t": "list",
      "items": [
        "Did the correct workflow execute?",
        "Did the expected specialists participate?",
        "Did validation succeed?",
        "Were business rules satisfied?",
        "Did the final recommendation remain consistent?",
        "Did execution complete successfully?"
      ]
    },
    {
      "t": "p",
      "text": "Those questions survived model variation. Exact wording didn't matter. Behaviour did."
    },
    {
      "t": "h3",
      "text": "Building Confidence Through Evidence"
    },
    {
      "t": "p",
      "text": "For weeks, dashboards displayed two systems side by side."
    },
    {
      "t": "table",
      "headers": [
        "Metric",
        "Monolith",
        "Multi-Agent"
      ],
      "rows": [
        [
          "Workflow Success",
          "99.1%",
          "99.3%"
        ],
        [
          "Validation Pass Rate",
          "98.8%",
          "99.0%"
        ],
        [
          "Average Latency",
          "2.4 s",
          "1.8 s"
        ],
        [
          "Retry Rate",
          "2.3%",
          "1.5%"
        ],
        [
          "Human Review Rate",
          "3.6%",
          "2.9%"
        ]
      ]
    },
    {
      "t": "p",
      "text": "The goal wasn't proving the new architecture was perfect. The goal was collecting enough evidence that it was ready. Engineering confidence came from measurements—not optimism."
    },
    {
      "t": "h3",
      "text": "Every Difference Became a Conversation"
    },
    {
      "t": "p",
      "text": "Whenever outputs differed, we resisted the temptation to ask:"
    },
    {
      "t": "code",
      "text": "\"Which answer sounds better?\""
    },
    {
      "t": "p",
      "text": "Instead we asked:"
    },
    {
      "t": "pull",
      "text": "\"Why did the systems behave differently?\""
    },
    {
      "t": "p",
      "text": "Sometimes the multi-agent workflow was genuinely better. Sometimes the monolith handled an edge case more gracefully. Sometimes both were acceptable. Every difference became an opportunity to refine the architecture before users depended on it."
    },
    {
      "t": "h3",
      "text": "The First Production Traffic"
    },
    {
      "t": "p",
      "text": "Once the shadow environment consistently matched expectations, we introduced feature flags."
    },
    {
      "t": "diagram",
      "text": "Production Traffic\n↓\nFeature Flag\n├── 95% Monolith\n└── 5% Multi-Agent"
    },
    {
      "t": "p",
      "text": "Nothing dramatic happened. Which was exactly what we wanted. The rollout expanded gradually. 5%. 10%. 25%. 50%. Eventually every workflow flowed through the Overseer."
    },
    {
      "t": "p",
      "text": "Users never experienced a \"migration day.\" They experienced continuous improvement."
    },
    {
      "t": "h3",
      "text": "The Cutover Was Almost Boring"
    },
    {
      "t": "p",
      "text": "One of my favourite memories from the project is how uneventful the final cutover felt. No war room. No emergency calls. No rollback. One morning we increased the feature flag to 100%. The monolith stopped serving production traffic. The multi-agent platform quietly became the new production system. That's what successful migrations look like."
    },
    {
      "t": "p",
      "text": "Not excitement. Confidence."
    },
    {
      "t": "h2",
      "text": "What We Would Do Differently"
    },
    {
      "t": "p",
      "text": "People often ask whether we'd start with a multi-agent architecture if we rebuilt PHHM today. My answer usually surprises them. Probably not. At least not immediately. The monolith solved exactly the problem we had. It helped us discover:"
    },
    {
      "t": "list",
      "items": [
        "which workflows actually existed",
        "where natural boundaries emerged",
        "which responsibilities belonged together",
        "what deserved its own specialist"
      ]
    },
    {
      "t": "p",
      "text": "Without that experience, we'd have been guessing. The monolith taught us where to split."
    },
    {
      "t": "h3",
      "text": "Architecture Should Follow Product Maturity"
    },
    {
      "t": "p",
      "text": "One lesson stands above everything else. Architecture should solve today's problems. Not tomorrow's assumptions. If we had started with six agents, an Overseer, workflow state, validation layers, configuration files, and orchestration before understanding the domain... ...we would probably have designed the wrong abstractions. Instead, the product evolved first. The architecture followed. That sequence mattered."
    },
    {
      "t": "h3",
      "text": "The Architecture We Ended Up With"
    },
    {
      "t": "p",
      "text": "By the end of the refactor, PHHM looked very different from where it began."
    },
    {
      "t": "diagram",
      "text": "                    Client\n                      │\n                      ▼\n                 FastAPI API\n                      │\n                      ▼\n                  Overseer\n                      │\n         ├────────────┼────────────┐\n         ▼            ▼            ▼\n     Welcome      Analyst       Care\n                      │\n         ┌────────────┼────────────┐\n         ▼            ▼            ▼\n Communications    Gospel     Validation\n                      │\n                      ▼\n               Workflow State\n                      │\n                      ▼\n               Final Response"
    },
    {
      "t": "p",
      "text": "The platform gained more components. Yet every component became simpler. Complexity didn't disappear. It became organized."
    },
    {
      "t": "h3",
      "text": "The Five Lessons We'll Carry Forward"
    },
    {
      "t": "p",
      "text": "If I were advising a team building a production AI platform today, these are the principles I'd emphasize."
    },
    {
      "t": "pull",
      "text": "1. Start with the simplest architecture that solves today's problem"
    },
    {
      "t": "p",
      "text": "Premature distribution creates unnecessary complexity. Earn complexity through real product needs."
    },
    {
      "t": "pull",
      "text": "2. Watch engineering friction—not just system metrics"
    },
    {
      "t": "p",
      "text": "When every feature touches everything else, the architecture is telling you it's ready to evolve."
    },
    {
      "t": "pull",
      "text": "3. Extract responsibilities, not technologies"
    },
    {
      "t": "p",
      "text": "Create boundaries around business capabilities, not programming languages or frameworks."
    },
    {
      "t": "h3",
      "text": "4. Migrate gradually"
    },
    {
      "t": "p",
      "text": "Run old and new systems together. Measure behaviour. Collect evidence. Then cut over. Confidence grows incrementally."
    },
    {
      "t": "pull",
      "text": "5. Let the product teach you the architecture"
    },
    {
      "t": "p",
      "text": "Your first design won't be your last. That's not failure. That's how successful systems evolve."
    },
    {
      "t": "h3",
      "text": "Final Thoughts"
    },
    {
      "t": "p",
      "text": "Looking back, the most important decision wasn't adopting a multi-agent architecture. It was recognizing that the monolith had already done its job. It helped us validate ideas quickly. It revealed natural workflow boundaries. It taught us where responsibilities belonged. Only then did we have enough information to design a better architecture. That's why I no longer think of the monolith as something we escaped. I think of it as the platform that made the multi-agent system possible."
    },
    {
      "t": "p",
      "text": "Without it, we would have been designing abstractions based on assumptions instead of experience. The refactor wasn't an admission that the original architecture was wrong. It was evidence that the product had grown beyond the constraints of its first successful design. And that's one of the healthiest reasons to refactor any software system."
    },
    {
      "t": "h3",
      "text": "Key Takeaways"
    },
    {
      "t": "code",
      "text": "If you're growing an AI application into a production platform, I'd recommend these principles:"
    },
    {
      "t": "list",
      "items": [
        "Start with the simplest architecture that delivers value.",
        "Refactor when engineering friction consistently outweighs implementation speed.",
        "Split systems along business responsibilities rather than technical layers.",
        "Introduce orchestration only when coordination becomes a distinct responsibility.",
        "Validate every boundary with explicit contracts and schema checks.",
        "Run legacy and new architectures in parallel before migrating users.",
        "Compare behavioural outcomes rather than exact AI responses.",
        "Roll out incrementally using feature flags and production telemetry.",
        "Accept that complexity doesn't disappear—it becomes better organized.",
        "Remember that successful architecture evolves alongside the product."
      ]
    }
  ]
} as ArticleData;

export default function MonolithToMultiAgentArticle() {
  return <ArticleShell article={article} />;
}
