"use client";

import ArticleShell, { type ArticleData } from "./ArticleShell";

const article = {
  "kicker": "PHHM Journal • Configuration",
  "focus": "Configuration",
  "icon": "sliders",
  "title": "Configuration-Driven AI: Why YAML Beats Hardcoded Prompts in Production",
  "subtitle": "How we designed PHHM so new AI agents, models, prompts, and workflows can be added without rewriting application code.",
  "readTime": "8 min",
  "blocks": [
    {
      "t": "p",
      "text": "One of the most common patterns I see in AI projects looks something like this:"
    },
    {
      "t": "code",
      "text": "if request.type == \"care\":\n    return CareAgent()\n\nelif request.type == \"analysis\":\n    return AnalystAgent()\n\nelif request.type == \"newsletter\":\n    return CommunicationsAgent()"
    },
    {
      "t": "p",
      "text": "It works. Until someone asks:"
    },
    {
      "t": "code",
      "text": "\"Can we add another agent?\""
    },
    {
      "t": "p",
      "text": "Now you edit Python. Deploy. Test everything. Hope nothing breaks. A week later someone asks:"
    },
    {
      "t": "code",
      "text": "\"Can we switch the Analyst Agent to Claude?\""
    },
    {
      "t": "p",
      "text": "Back to Python. Then:"
    },
    {
      "t": "code",
      "text": "\"Can the Gospel Agent use a different prompt?\""
    },
    {
      "t": "p",
      "text": "Python again. Eventually your orchestration layer stops orchestrating. It becomes a giant collection of if statements. While building PHHM we realized something. The problem wasn't Python. The problem was that **business decisions were living inside application code.** So we moved almost everything into configuration. That single decision fundamentally changed how the platform evolved."
    },
    {
      "t": "h3",
      "text": "Section 1"
    },
    {
      "t": "h2",
      "text": "The Hidden Cost of Hardcoding"
    },
    {
      "t": "p",
      "text": "Hardcoded systems feel productive. Initially. Need another agent?"
    },
    {
      "t": "code",
      "text": "agents = {\n    \"analyst\": Analyst(),\n    \"care\": Care(),\n    \"welcome\": Welcome()\n}"
    },
    {
      "t": "p",
      "text": "Need another one? agents[\"communications\"] = Communications() Still easy. Then six months later... Your orchestration layer starts looking like this."
    },
    {
      "t": "code",
      "text": "if role == \"care\":"
    },
    {
      "t": "diagram",
      "text": "...\nelif role == \"analyst\":\n...\nelif role == \"communications\":\n...\nelif role == \"gospel\":\n..."
    },
    {
      "t": "code",
      "text": "elif role == \"welcome\":"
    },
    {
      "t": "p",
      "text": "Every feature means another deployment. Every deployment introduces another opportunity for bugs. The architecture slowly becomes more rigid."
    },
    {
      "t": "h3",
      "text": "The Real Problem"
    },
    {
      "t": "p",
      "text": "The code isn't complicated. The coupling is. Business logic now depends on implementation. Changing organizational behaviour requires engineering work. That's backwards. Business decisions should be data. Not code."
    },
    {
      "t": "h3",
      "text": "The Shift"
    },
    {
      "t": "p",
      "text": "One sentence changed how we designed PHHM."
    },
    {
      "t": "pull",
      "text": "If non-engineers should be able to change it, it probably shouldn't live in Python."
    },
    {
      "t": "p",
      "text": "That principle pushed almost everything into configuration. Models. Prompts. Permissions. Routing. Workflows. Feature flags. Defaults."
    },
    {
      "t": "p",
      "text": "Thresholds. The Python code became smaller. The platform became dramatically more flexible."
    },
    {
      "t": "h3",
      "text": "Configuration Is an API"
    },
    {
      "t": "p",
      "text": "Instead of asking:"
    },
    {
      "t": "pull",
      "text": "What does the application do?"
    },
    {
      "t": "p",
      "text": "We started asking:"
    },
    {
      "t": "pull",
      "text": "What does the configuration describe?"
    },
    {
      "t": "p",
      "text": "That's a subtle but profound shift. The application became an execution engine. The configuration became the product."
    },
    {
      "t": "h2",
      "text": "Designing the Agent Registry"
    },
    {
      "t": "p",
      "text": "Instead of constructing agents inside Python... We describe them."
    },
    {
      "t": "code",
      "text": "agents:\n\n  analyst:\n\n    role: analysis\n\n    model: gpt-4.1\n\n    prompt: prompts/analyst.md\n\n    temperature: 0.2\n\n    permissions:\n\n      - reports\n\n      - summaries\n\n      - recommendations"
    },
    {
      "t": "p",
      "text": "Now Python doesn't \"know\" about the Analyst. It discovers it."
    },
    {
      "t": "h3",
      "text": "The Registry Pattern"
    },
    {
      "t": "p",
      "text": "Every startup follows the same process."
    },
    {
      "t": "diagram",
      "text": "Application Starts\n↓\nLoad Configuration\n↓\nRegister Agents\n↓\nValidate Configuration\n↓\nReady"
    },
    {
      "t": "p",
      "text": "Notice what didn't happen. No hardcoded imports. No switch statements. No routing tables buried inside Python. Everything comes from configuration."
    },
    {
      "t": "h3",
      "text": "Dynamic Loading"
    },
    {
      "t": "p",
      "text": "Instead of:"
    },
    {
      "t": "code",
      "text": "Analyst()\n\nCare()\n\nWelcome()"
    },
    {
      "t": "p",
      "text": "The orchestrator builds agents dynamically."
    },
    {
      "t": "code",
      "text": "for name, config in registry[\"agents\"].items():\n\n    agents[name] = AgentFactory(config)"
    },
    {
      "t": "p",
      "text": "One loop. Unlimited agents. That's the power of metadata."
    },
    {
      "t": "h2",
      "text": "Routing Without if Statements"
    },
    {
      "t": "p",
      "text": "Once every agent became configuration, another question appeared. How does the Overseer know where to send work? Most AI applications solve this with increasingly large routing functions. Something like this:"
    },
    {
      "t": "code",
      "text": "if intent == \"analysis\":\n    return analyst\n\nelif intent == \"care\":\n    return care\n\nelif intent == \"communications\":\n    return communications"
    },
    {
      "t": "p",
      "text": "It works. Until the tenth agent. Or the twentieth. Every new capability requires modifying the routing logic. Ironically, the orchestrator becomes the least flexible part of the platform. We wanted exactly the opposite."
    },
    {
      "t": "h3",
      "text": "Let Configuration Drive Routing"
    },
    {
      "t": "p",
      "text": "Instead of embedding routing rules inside Python, we moved them into configuration."
    },
    {
      "t": "code",
      "text": "routes:\n\n  member_report:\n\n    agents:\n      - analyst\n      - care\n\n  onboarding:\n\n    agents:\n      - welcome\n\n  newsletter:\n\n    agents:\n      - communications\n\n  devotional:\n\n    agents:\n      - gospel"
    },
    {
      "t": "p",
      "text": "The routing engine no longer asks: *\"Which Python function should I call?\"* Instead it asks: *\"What does the configuration say this workflow requires?\"* That's a huge architectural difference."
    },
    {
      "t": "h3",
      "text": "The Orchestrator Becomes Generic"
    },
    {
      "t": "p",
      "text": "Once routing lives in configuration, the orchestration engine becomes surprisingly small."
    },
    {
      "t": "code",
      "text": "def get_workflow(intent):\n\n    return registry[\"routes\"][intent][\"agents\"]"
    },
    {
      "t": "p",
      "text": "That's it. No growing list of conditionals. No expanding switch statement. No duplicated routing logic. The engine doesn't know anything about newsletters, care plans, or onboarding. It only knows how to execute whatever the configuration describes. That's exactly where orchestration belongs."
    },
    {
      "t": "h3",
      "text": "From Business Logic to Business Data"
    },
    {
      "t": "p",
      "text": "This was probably the biggest mindset shift in PHHM. Originally we wrote code that expressed business decisions. Eventually we realized business decisions change far more often than orchestration logic. So we flipped the relationship. Instead of writing:"
    },
    {
      "t": "code",
      "text": "if member.is_new:\n    assign_welcome_agent()"
    },
    {
      "t": "p",
      "text": "we describe the workflow."
    },
    {
      "t": "code",
      "text": "workflow:\n\n  trigger: new_member\n\n  agents:\n\n    - welcome\n\n    - analyst"
    },
    {
      "t": "p",
      "text": "Python executes."
    },
    {
      "t": "code",
      "text": "Configuration decides."
    },
    {
      "t": "h2",
      "text": "Configuration as Contracts"
    },
    {
      "t": "p",
      "text": "Another unexpected benefit emerged."
    },
    {
      "t": "code",
      "text": "Configuration became documentation."
    },
    {
      "t": "p",
      "text": "Anyone opening the YAML could understand the platform. For example:"
    },
    {
      "t": "code",
      "text": "agent:\n\n  analyst\n\npurpose:\n\n  Generate structured analysis.\n\ninputs:\n\n  Member profile\n\noutputs:\n\n  Analysis object\n\npermissions:\n\n  reports\n\n  summaries\n\n  recommendations"
    },
    {
      "t": "p",
      "text": "Without reading a single line of Python, someone can answer:"
    },
    {
      "t": "list",
      "items": [
        "What does this agent do?",
        "What information does it require?",
        "What does it return?",
        "What permissions does it have?"
      ]
    },
    {
      "t": "p",
      "text": "The configuration becomes a contract."
    },
    {
      "t": "h3",
      "text": "Validating Configuration"
    },
    {
      "t": "code",
      "text": "Configuration is powerful."
    },
    {
      "t": "p",
      "text": "It's also dangerous. One typo can break an entire workflow. That's why PHHM validates configuration before the application starts."
    },
    {
      "t": "code",
      "text": "class AgentConfig(BaseModel):\n\n    role: str\n\n    model: str\n\n    prompt: str\n\n    permissions: list[str]"
    },
    {
      "t": "p",
      "text": "At startup:"
    },
    {
      "t": "code",
      "text": "config = AgentConfig.model_validate(raw_config)"
    },
    {
      "t": "p",
      "text": "If validation fails... The application never starts. Failing fast is far better than discovering configuration errors during production traffic."
    },
    {
      "t": "h3",
      "text": "Configuration Should Fail Loudly"
    },
    {
      "t": "p",
      "text": "One principle guided the entire platform."
    },
    {
      "t": "pull",
      "text": "Invalid configuration is a deployment problem—not a runtime problem."
    },
    {
      "t": "p",
      "text": "Imagine discovering that an agent has no prompt configured after receiving a customer request. That's already too late. Instead, every configuration file is validated before the first request reaches the system. Startup should be boring. Production should be predictable."
    },
    {
      "t": "h3",
      "text": "Dynamic Agent Discovery"
    },
    {
      "t": "p",
      "text": "One feature we didn't initially plan for became one of our favorites. Because agents are defined in configuration, the orchestrator automatically discovers them. for agent in registry[\"agents\"]:"
    },
    {
      "t": "code",
      "text": "    register(agent)"
    },
    {
      "t": "p",
      "text": "That's the entire registration process. No imports. No manual wiring. No application changes. Adding another specialist becomes a data change. Not a software project."
    },
    {
      "t": "h3",
      "text": "Permissions Live Beside the Agent"
    },
    {
      "t": "p",
      "text": "Another lesson came from authorization. Originally permissions were scattered throughout the application. Eventually we moved them next to the agent definition."
    },
    {
      "t": "code",
      "text": "analyst:\n\n  permissions:\n\n    - reports\n\n    - summaries\n\n    - recommendations\n\ncare:\n\n  permissions:\n\n    - follow_ups\n\n    - interventions"
    },
    {
      "t": "p",
      "text": "Now authorization travels with the agent itself."
    },
    {
      "t": "code",
      "text": "Configuration stays cohesive."
    },
    {
      "t": "p",
      "text": "Responsibilities remain obvious."
    },
    {
      "t": "h3",
      "text": "Swapping Models Without Code Changes"
    },
    {
      "t": "p",
      "text": "One of the biggest advantages of configuration-driven design is model independence. Suppose tomorrow you decide the Communications Agent should use a different model. You don't edit Python. You edit configuration."
    },
    {
      "t": "code",
      "text": "communications:\n\n  model: claude-4\n\nanalyst:\n\n  model: gpt-4.1\n\ncare:\n\n  model: gpt-4.1"
    },
    {
      "t": "p",
      "text": "The orchestrator doesn't care. It loads whatever model the registry specifies. Today it's GPT-4.1. Tomorrow it might be Claude. Six months from now it could be an entirely different provider. The architecture doesn't change. Only the configuration does. That's exactly the kind of flexibility we wanted."
    },
    {
      "t": "h3",
      "text": "Configuration Is an Abstraction Layer"
    },
    {
      "t": "p",
      "text": "Looking back, YAML wasn't really the innovation. The registry wasn't either. The important idea was abstraction. Instead of coupling orchestration to specific models, prompts, or workflows, we inserted a configuration layer between them."
    },
    {
      "t": "diagram",
      "text": "Business Rules\n       │\n       ▼\nConfiguration\n       │\n       ▼\nOrchestration Engine\n       │\n       ▼\nAI Models"
    },
    {
      "t": "p",
      "text": "Each layer has a single responsibility. Business rules describe."
    },
    {
      "t": "code",
      "text": "Configuration defines."
    },
    {
      "t": "p",
      "text": "The orchestrator executes. The models generate. That's clean architecture applied to AI systems."
    },
    {
      "t": "h3",
      "text": "Why This Matters"
    },
    {
      "t": "p",
      "text": "The biggest surprise wasn't that configuration made the system easier to change. It was that it made the code easier to understand. The orchestration engine stopped growing. The configuration grew instead. And configuration is far easier to read, review, validate, and evolve than application logic. That trade-off compounds over time. The larger the platform becomes, the more valuable it gets."
    },
    {
      "t": "h3",
      "text": "Runtime Configuration: Building an AI Platform That Evolves Without Code Changes"
    },
    {
      "t": "p",
      "text": "Moving prompts into YAML was only the beginning. The real breakthrough came when we stopped thinking of configuration as static files. Instead, configuration became **the control plane** for the entire AI platform. Models. Agents. Prompts. Permissions. Feature flags."
    },
    {
      "t": "p",
      "text": "Workflows. Routing. All of them became runtime decisions. That meant we could evolve the platform without constantly modifying Python."
    },
    {
      "t": "h3",
      "text": "The Difference Between Configuration and Configuration-Driven"
    },
    {
      "t": "p",
      "text": "There's an important distinction. Many applications have configuration. Very few are **configuration-driven**. For example, this application has configuration."
    },
    {
      "t": "code",
      "text": "model: gpt-4.1\n\ntemperature: 0.2"
    },
    {
      "t": "p",
      "text": "Useful? Yes."
    },
    {
      "t": "code",
      "text": "Configuration-driven?"
    },
    {
      "t": "p",
      "text": "Not really. A configuration-driven platform allows the configuration itself to influence application behaviour. For example:"
    },
    {
      "t": "code",
      "text": "agents:\n\n  analyst:\n    enabled: true\n\n  gospel:\n    enabled: false\n\n  communications:\n    enabled: true"
    },
    {
      "t": "p",
      "text": "Now the orchestration engine doesn't decide which agents exist."
    },
    {
      "t": "code",
      "text": "Configuration does."
    },
    {
      "t": "p",
      "text": "That's a fundamentally different architecture."
    },
    {
      "t": "h2",
      "text": "Feature Flags for AI Agents"
    },
    {
      "t": "p",
      "text": "One of the first capabilities we introduced was feature flags. Suppose we're developing a new Follow-Up Agent. We don't want every production workflow using it immediately. Instead, we register it but leave it disabled."
    },
    {
      "t": "code",
      "text": "agents:\n\n  follow_up:\n\n    enabled: false\n\n    model: gpt-4.1\n\n    prompt: prompts/follow_up/system.md"
    },
    {
      "t": "p",
      "text": "The agent exists. The orchestrator knows about it. But no production traffic reaches it. Turning it on becomes a configuration change. Not a deployment."
    },
    {
      "t": "h3",
      "text": "Controlled Rollouts"
    },
    {
      "t": "p",
      "text": "When the agent is ready, we don't expose it to everyone at once. We enable it gradually."
    },
    {
      "t": "code",
      "text": "follow_up:\n\n  enabled: true\n\n  rollout:\n\n    percentage: 10"
    },
    {
      "t": "p",
      "text": "The orchestration layer checks the rollout policy before assigning work. A simplified implementation might look like this:"
    },
    {
      "t": "code",
      "text": "if rollout_enabled(\"follow_up\"):\n\n    execute(\"follow_up\")"
    },
    {
      "t": "p",
      "text": "As confidence grows, increasing adoption becomes a matter of changing one value. 10%. 25%. 50%. 100%. No application release required."
    },
    {
      "t": "h3",
      "text": "Environment-Specific Configuration"
    },
    {
      "t": "p",
      "text": "Production isn't the only environment. PHHM runs different configurations depending on where it's deployed. For example:"
    },
    {
      "t": "code",
      "text": "config/\n\n    development.yaml\n\n    staging.yaml\n\n    production.yaml"
    },
    {
      "t": "p",
      "text": "Development prioritizes experimentation. Staging mirrors production. Production prioritizes stability. The orchestration engine stays exactly the same. Only the configuration changes."
    },
    {
      "t": "h3",
      "text": "Swapping Models Without Rewriting Code"
    },
    {
      "t": "p",
      "text": "Model providers evolve quickly. Hardcoding them creates unnecessary coupling. Instead, every agent declares the model it should use."
    },
    {
      "t": "code",
      "text": "analyst:\n\n  provider: openai\n\n  model: gpt-4.1\n\ncommunications:\n\n  provider: anthropic\n\n  model: claude-4"
    },
    {
      "t": "p",
      "text": "The orchestrator simply asks the configured provider for a response. Tomorrow, if a different model performs better, the migration is a configuration update—not a refactor. That flexibility protects the platform from vendor lock-in."
    },
    {
      "t": "h3",
      "text": "Runtime Prompt Selection"
    },
    {
      "t": "p",
      "text": "Not every workflow benefits from the same prompt. Sometimes an agent needs different instructions depending on context. Rather than embedding conditional logic into Python, prompt selection also lives in configuration."
    },
    {
      "t": "code",
      "text": "analyst:\n\n  prompts:\n\n    default: analyst/system.md\n\n    emergency: analyst/emergency.md\n\n    onboarding: analyst/onboarding.md"
    },
    {
      "t": "p",
      "text": "The orchestrator chooses the appropriate prompt based on the workflow. The application doesn't need additional if statements. The configuration already describes the behaviour."
    },
    {
      "t": "h3",
      "text": "Configuration-Based Permissions"
    },
    {
      "t": "p",
      "text": "Permissions evolve just as quickly as workflows. Keeping them close to the agent definition avoids duplication."
    },
    {
      "t": "code",
      "text": "care:\n\n  permissions:\n\n    - care_plan\n\n    - follow_up\n\n    - intervention\n\n  roles:\n\n    - pastor\n\n    - administrator"
    },
    {
      "t": "p",
      "text": "Now authorization becomes data. Reviewing permissions becomes as simple as reading one configuration file."
    },
    {
      "t": "h3",
      "text": "Experimenting Safely"
    },
    {
      "t": "p",
      "text": "One unexpected advantage of configuration-driven architecture is experimentation. Suppose we want to compare two prompts. Instead of modifying code, the registry defines the experiment."
    },
    {
      "t": "code",
      "text": "experiments:\n\n  analyst_prompt:\n\n    control: v2.4.1\n\n    candidate: v2.5.0\n\n    traffic: 20"
    },
    {
      "t": "p",
      "text": "The orchestrator routes a percentage of requests to the candidate version while collecting metrics. Experiments become repeatable. And just as importantly... They're reversible."
    },
    {
      "t": "h3",
      "text": "Runtime Decisions Replace Compile-Time Decisions"
    },
    {
      "t": "p",
      "text": "Looking back, this was the biggest architectural shift. Originally, most decisions were made when we wrote the code. Now they're made when the application runs. Examples include:"
    },
    {
      "t": "table",
      "headers": [
        "Before",
        "After"
      ],
      "rows": [
        [
          "Which model to use",
          "Configuration"
        ],
        [
          "Which prompt to load",
          "Configuration"
        ],
        [
          "Which agents are enabled",
          "Configuration"
        ],
        [
          "Which workflow to execute",
          "Configuration"
        ],
        [
          "Which experiment is active",
          "Configuration"
        ],
        [
          "Which permissions apply",
          "Configuration"
        ]
      ]
    },
    {
      "t": "p",
      "text": "The Python code became increasingly generic. The platform became increasingly flexible."
    },
    {
      "t": "h3",
      "text": "The Orchestrator Became Smaller"
    },
    {
      "t": "p",
      "text": "One surprising outcome of moving behaviour into configuration was that the orchestrator itself became simpler. It no longer needed to know:"
    },
    {
      "t": "list",
      "items": [
        "specific models",
        "prompt locations",
        "workflow details",
        "routing exceptions",
        "experimental features"
      ]
    },
    {
      "t": "p",
      "text": "Its responsibility narrowed to one thing:"
    },
    {
      "t": "pull",
      "text": "Execute the configuration faithfully."
    },
    {
      "t": "p",
      "text": "That's exactly what orchestration should do."
    },
    {
      "t": "h3",
      "text": "The Trade-Offs"
    },
    {
      "t": "code",
      "text": "Configuration-driven architecture isn't free."
    },
    {
      "t": "p",
      "text": "It introduces new responsibilities. More configuration means:"
    },
    {
      "t": "list",
      "items": [
        "stronger validation requirements",
        "better documentation",
        "versioned configuration",
        "change management",
        "ownership"
      ]
    },
    {
      "t": "p",
      "text": "Poorly managed configuration becomes just as dangerous as poorly written code. The goal isn't to eliminate complexity. It's to move it somewhere it's easier to understand and maintain. For PHHM, configuration was that place."
    },
    {
      "t": "h3",
      "text": "The Biggest Lesson"
    },
    {
      "t": "p",
      "text": "Looking back, YAML wasn't the hero of this architecture. It could have been JSON. A database. A service registry. Even a remote configuration service. The important idea wasn't the file format. It was the separation of responsibilities."
    },
    {
      "t": "pull",
      "text": "Business behaviour should be described, not hardcoded."
    },
    {
      "t": "p",
      "text": "That's the principle that made PHHM adaptable."
    },
    {
      "t": "h3",
      "text": "Five Principles of Configuration-Driven AI"
    },
    {
      "t": "p",
      "text": "If I were building another multi-agent platform tomorrow, I'd follow the same five principles."
    },
    {
      "t": "pull",
      "text": "1. Keep orchestration generic"
    },
    {
      "t": "p",
      "text": "The engine shouldn't know business rules. It should execute them."
    },
    {
      "t": "pull",
      "text": "2. Keep business logic declarative"
    },
    {
      "t": "p",
      "text": "Describe behaviour through configuration instead of embedding it in code."
    },
    {
      "t": "pull",
      "text": "3. Validate everything before startup"
    },
    {
      "t": "code",
      "text": "Configuration errors should stop deployments—not customer requests."
    },
    {
      "t": "h3",
      "text": "4. Design for replacement"
    },
    {
      "t": "p",
      "text": "Models, prompts, and workflows should all be interchangeable."
    },
    {
      "t": "h3",
      "text": "5. Optimize for change"
    },
    {
      "t": "p",
      "text": "The architecture should make common changes easy and uncommon changes possible."
    },
    {
      "t": "h3",
      "text": "Conclusion"
    },
    {
      "t": "p",
      "text": "When we first started PHHM, YAML felt like an implementation detail. By the end of the project, we realized it represented something much larger. It represented a philosophy. The philosophy that **software should execute decisions—not contain them**."
    },
    {
      "t": "code",
      "text": "Configuration describes the platform."
    },
    {
      "t": "p",
      "text": "The orchestrator executes the platform. The agents perform the work. Each layer has one responsibility. That separation is what allowed PHHM to evolve from a small experiment into a production-ready AI system without the orchestration engine growing more complex every month."
    }
  ]
} as ArticleData;

export default function ConfigurationArticle() {
  return <ArticleShell article={article} />;
}
