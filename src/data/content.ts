import type { ReactNode } from "react";
import type { IconName } from "../lib/iconMap";

/* ============================================================================
 * PORTFOLIO CONTENT
 * ----------------------------------------------------------------------------
 * Single source of truth for every piece of editable text/data on the site.
 * Edit values here; components consume them via named exports.
 *
 * Conventions:
 *  - Icons are referenced by string name (see src/lib/iconMap.tsx).
 *  - "story" / "signal" copy variants are toggled by the navbar mode switch.
 *  - PDFs and other assets live in /public/Docs and are resolved via getPublicPath.
 * ========================================================================= */

export type Mode = "signal" | "story";

const getPublicPath = (path: string): string => {
  const base = import.meta.env.BASE_URL;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

/* ── Asset paths (edit here to swap PDFs) ─────────────────────────────── */
export const ASSETS = {
  resumePdf: getPublicPath("Docs/Aditya_Chunduri.pdf"),
  publicationPaper: getPublicPath("Docs/Publication_Paper_Wind.pdf"),
  publicationCertificate: getPublicPath("Docs/IJRASET_Certificate_Wind.pdf"),
} as const;

/* ── Contact / social (used by Navbar, Footer, Sidebar, FAQ bot) ──────── */
export const CONTACT = {
  email: "chunduri@usc.edu",
  github: "https://github.com/Chunduri-Aditya",
  linkedin: "https://linkedin.com/in/chunduriaditya",
  location: "Los Angeles, CA",
} as const;

/* ============================================================================
 * SECTION 1 — HERO
 * ========================================================================= */

interface Chip {
  iconName: IconName;
  text: string;
}

export interface HeroContent {
  statusBadge: string;
  headline: { signal: string; story: string };
  subhead: string;
  intro: { signal: string; story: string };
  chips: { signal: Chip[]; story: Chip[] };
  ctas: {
    primary: { label: string; iconName: IconName; targetSection: string };
    secondary: { label: string; iconName: IconName; targetSection: string };
    resume: { label: string; iconName: IconName; href: string };
  };
}

export const HERO: HeroContent = {
  statusBadge: "System Status: ONLINE // Agent Shield Sprint Active",
  headline: {
    signal: "Agents are shipping. I build the evals that catch what breaks.",
    story: "I turn noise into signal.",
  },
  subhead:
    "M.S. Applied Data Science, USC (Dec 2025) \u00b7 AI Safety & Agent Security \u00b7 LLM Evaluation \u00b7 Adversarial Testing",
  intro: {
    signal:
      "Building reproducible evaluation systems for LLM agents. Current focus: Agent Shield \u2014 8 adversarial modules (prompt injection, MCP tool poisoning, RAG memory attacks, behavioral drift) across 8 frontier models, with unified ASR + utility-under-attack metrics on Inspect AI. arXiv preprint in progress.",
    story:
      "Agents are shipping faster than we know how to test them. I\u2019m building adversarial evaluation systems that catch failure modes before deployment\u2014reproducible, logged, standard-aligned. Current obsession: Agent Shield, an 8-module attack framework stress-testing 8 frontier models on the Inspect AI harness.",
  },
  chips: {
    signal: [
      { iconName: "ShieldCheck", text: "Inspect AI harness" },
      { iconName: "Target", text: "ASR + utility-under-attack" },
      { iconName: "Gauge", text: "Judge-model versioning" },
      { iconName: "ListChecks", text: "CI-ready eval logs" },
      { iconName: "Wrench", text: "Reproducible pipelines" },
    ],
    story: [
      { iconName: "ShieldCheck", text: "Evals over vibes" },
      { iconName: "Radar", text: "Adversarial thinking" },
      { iconName: "Rocket", text: "Reproducible by default" },
      { iconName: "Boxes", text: "Systems > scripts" },
      { iconName: "Brain", text: "Attention trained daily" },
    ],
  },
  ctas: {
    primary: { label: "Inspect The Work", iconName: "Terminal", targetSection: "projects" },
    secondary: { label: "How I Think", iconName: "ScrollText", targetSection: "thinking" },
    resume: { label: "Resume", iconName: "FileText", href: ASSETS.resumePdf },
  },
};

/* ============================================================================
 * SECTION 2 — TICKER THOUGHTS  (rotates in the navbar pill)
 * ========================================================================= */

export const TICKER_THOUGHTS: string[] = [
  "Turning evaluation into unit tests...",
  "Compressing big intent into small prompts...",
  "Finding the smallest change that fixes the whole system...",
  "Chasing edge cases (that\u2019s where truth hides)...",
  "Making memory retrieval feel like remembering, not searching...",
  "Shipping only when behavior is stable...",
];

/* ============================================================================
 * SECTION 3 — NAVIGATION
 * ========================================================================= */

export interface NavLink {
  id: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { id: "thinking", label: "Thinking" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "skills", label: "Skills" },
];

/* ============================================================================
 * SECTION 4 — THINKING ("How I Think")
 * ========================================================================= */

interface ThinkingItem {
  title: string;
  iconName: IconName;
  iconClassName?: string;
  text: { signal: string; story: string };
}

export interface ThinkingContent {
  header: {
    title: string;
    iconName: IconName;
    subtitle: { signal: string; story: string };
  };
  loopLabel: string;
  loop: ThinkingItem[];
  valuesLabel: string;
  values: ThinkingItem[];
  humanPart: { label: string; text: { signal: string; story: string } };
}

export const THINKING: ThinkingContent = {
  header: {
    title: "How I Think",
    iconName: "Layers",
    subtitle: {
      signal: "A repeatable loop I use to design, debug, and ship.",
      story: "My operating system for turning intensity into clarity.",
    },
  },
  loopLabel: "Loop (the whole thing fits in my head)",
  loop: [
    {
      title: "Observe",
      iconName: "Eye",
      iconClassName: "text-cyan-300",
      text: {
        signal: "Identify constraints, failure modes, and a measurable definition of success.",
        story:
          "I start with friction: contradictions, recurring weirdness, the edge case that won't leave.",
      },
    },
    {
      title: "Model",
      iconName: "Boxes",
      iconClassName: "text-purple-300",
      text: {
        signal: "Propose an approach with explicit tradeoffs, risks, and interfaces.",
        story:
          "I sketch a model and try to break it. If it survives, it becomes architecture.",
      },
    },
    {
      title: "Instrument",
      iconName: "Gauge",
      iconClassName: "text-emerald-300",
      text: {
        signal: "Measure early: evals, traces, structured logs, reproducible configs.",
        story:
          "I add gauges: tests, logs, metrics\u2014anything that turns \u2018maybe\u2019 into \u2018we know\u2019.",
      },
    },
    {
      title: "Iterate",
      iconName: "Timer",
      iconClassName: "text-slate-200",
      text: {
        signal: "Run fast experiments, isolate variables, keep a decision log.",
        story:
          "Short loops. Tight feedback. Find the one lever that fixes five things at once.",
      },
    },
    {
      title: "Ship",
      iconName: "Rocket",
      iconClassName: "text-cyan-200",
      text: {
        signal: "Package it: docs, tests, and a story that maps to outcomes.",
        story: "I ship when the system behaves. Not when I feel brave.",
      },
    },
  ],
  valuesLabel: "What I'm optimizing for",
  values: [
    {
      title: "Truthful systems",
      iconName: "ShieldCheck",
      iconClassName: "text-emerald-300",
      text: {
        signal:
          "Ground claims with retrieval, verify with evals, fail loudly when confidence is wrong.",
        story: "If it\u2019s not reliable, it\u2019s not helpful. I\u2019d rather be slower than wrong.",
      },
    },
    {
      title: "Reproducibility",
      iconName: "CheckCircle2",
      iconClassName: "text-cyan-300",
      text: {
        signal:
          "Seeded configs + deterministic eval paths + versioned artifacts; same input, same verdict.",
        story: "I sleep better when tomorrow\u2019s run matches today\u2019s run.",
      },
    },
    {
      title: "Leverage",
      iconName: "ArrowUpRight",
      iconClassName: "text-purple-300",
      text: {
        signal: "Build the eval harness once; every new attack vector becomes a unit test.",
        story: "I hunt the one lever that fixes five things at once.",
      },
    },
    {
      title: "Stable behavior over heroics",
      iconName: "XCircle",
      iconClassName: "text-slate-200",
      text: {
        signal:
          "Regressions caught by instrumentation, not by vibes or late-night debugging.",
        story: "I don\u2019t chase perfection. I chase stable behavior.",
      },
    },
  ],
  humanPart: {
    label: "The human part",
    text: {
      signal:
        "Wide-angle attention and laser focus, running at the same time. Structure\u2014lists, tests, logs, decision trails\u2014keeps both aimed at signal, not noise.",
      story:
        "My attention runs wide-angle and laser at the same time. The way I keep it useful is structure: lists, tests, logs, and clean interfaces\u2014so intensity becomes progress, not noise.",
    },
  },
};

/* ============================================================================
 * SECTION 5 — PROJECTS ("The Rabbit Holes")
 * ========================================================================= */

interface ProjectMetric {
  label: string;
  value: string;
}

interface ProjectLinks {
  github?: string;
  live?: string;
  demo?: string;
}

interface ProjectDecision {
  title: string;
  why: string;
}

interface ProjectArchitecture {
  overview: string;
  diagram: string;
  tradeoffs: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  iconName: IconName;
  iconClassName?: string;
  tags: string[];
  oneLiner: string;
  story: string;
  evidence: string[];
  architecture: ProjectArchitecture;
  decisions: ProjectDecision[];
  links: ProjectLinks;
  metrics: ProjectMetric[];
}

export interface ProjectsSectionContent {
  header: {
    title: string;
    iconName: IconName;
    eyebrow: string;
    subtitle: { signal: string; story: string };
  };
  searchPlaceholder: string;
  projects: Project[];
}

export const PROJECTS: ProjectsSectionContent = {
  header: {
    title: "The Rabbit Holes",
    iconName: "GitBranch",
    eyebrow: "Systems & Obsessions",
    subtitle: {
      signal: "Case studies with constraints, tradeoffs, and outcomes.",
      story: "Systems I built because I couldn\u2019t stop thinking about the problem.",
    },
  },
  searchPlaceholder: "Search (RAG, evals, whisper, demucs, privacy...)",
  projects: [
    {
      id: "agent-shield",
      title: "Agent Shield",
      subtitle: "LLM Agent Security Evaluation Framework",
      iconName: "ShieldCheck",
      iconClassName: "text-rose-400",
      tags: [
        "Inspect AI",
        "AgentDojo",
        "Adversarial Eval",
        "Prompt Injection",
        "MCP Security",
        "Red Teaming",
        "Python",
      ],
      oneLiner:
        "An 8-module adversarial evaluation framework that stress-tests LLM agents across prompt injection, MCP tool poisoning, RAG memory attacks, and behavioral drift\u2014built on UK AISI\u2019s Inspect AI harness.",
      story:
        "Agents are being deployed faster than they\u2019re being measured. I\u2019m building a reproducible attack surface\u2014one harness, one metric schema, eight adversarial modules\u2014so failures show up as scored diffs, not vibes. The kind of eval I\u2019d want to see before trusting an agent with anything real.",
      evidence: [
        "8 attack modules: prompt injection, MCP tool poisoning, RAG memory attacks, multi-agent manipulation, covert exfiltration, Cialdini-grounded behavioral drift, and more",
        "Benchmarks 8 frontier models (Claude, GPT-4.1, Gemini 2.5, Llama 3.1, Mistral Large, DeepSeek V3) under one metric schema",
        "Unified ASR (attack success rate) + utility-under-attack metrics",
        "Reproducible seeds, judge-model versioning, CI-ready eval logs",
        "Built on Inspect AI (UK AISI harness) \u2014 standard-aligned, not ad hoc",
        "arXiv preprint in progress",
      ],
      architecture: {
        overview:
          "Attack Module \u2192 Inspect AI Harness \u2192 Agent Under Test \u2192 Judge Model \u2192 Scored Log \u2192 ASR + Utility Metrics",
        diagram: `
+----------------+   +----------------+   +-------------------+
|  Attack Suite  |-->|  Inspect AI    |-->|  Agent Under Test |
|  (8 modules)   |   |  Harness       |   |  (8 frontier LLMs)|
+----------------+   +----------------+   +---------+---------+
                                                     |
                                                     v
+----------------+   +----------------+   +-------------------+
|  ASR + Utility |<--|  Judge Model   |<--|  Tool + Memory    |
|  Report        |   |  (versioned)   |   |  Trace            |
+----------------+   +----------------+   +-------------------+`,
        tradeoffs: [
          "Breadth vs depth: 8 modules give surface coverage; each can go deeper later",
          "Automated judge vs human rater (judge is cheaper, versioned for reproducibility)",
          "Safety of running attacks vs value of knowing failure modes (sandboxed, logged, bounded)",
        ],
      },
      decisions: [
        {
          title: "Built on Inspect AI, not a custom harness",
          why: "The field needs evals that compose; UK AISI\u2019s harness is the closest thing to a standard.",
        },
        {
          title: "Unified metric schema across all 8 modules",
          why: "Attacks only get comparable when the scoreboard is the same. ASR + utility-under-attack holds everywhere.",
        },
        {
          title: "Judge-model versioning + reproducible seeds",
          why: "A result that can\u2019t be re-run is a rumor. Every number on the dashboard has a receipt.",
        },
      ],
      links: {
        github: "https://github.com/Chunduri-Aditya",
        live: "#",
        demo: "#",
      },
      metrics: [
        { label: "Modules", value: "8 attacks" },
        { label: "Models", value: "8 frontier" },
      ],
    },
    {
      id: "ai-remixmate",
      title: "AI RemixMate",
      subtitle: "AI-Powered DJ Mixing Engine",
      iconName: "Music",
      iconClassName: "text-purple-400",
      tags: ["PyTorch", "Librosa", "Demucs", "FastAPI", "Gradio", "Audio ML"],
      oneLiner:
        "An end-to-end audio ML pipeline that decomposes tracks into stems, analyzes BPM / key / energy, and matches them with Camelot-Wheel harmonic logic. Open-sourced, GPU-accelerated, 9 GitHub stars.",
      story:
        "A clean transition is hidden engineering. I pulled it apart into measurable pieces\u2014source separation with Demucs, spectral features with Librosa, harmonic matching with the Camelot Wheel\u2014and wired them into a single pipeline anyone can point a folder of tracks at.",
      evidence: [
        "Demucs source separation + Librosa spectral analysis + Camelot-Wheel harmonic matching",
        "FastAPI backend with GPU acceleration",
        "Gradio web UI supporting 8+ audio formats",
        "Real-time BPM, key, and energy analysis",
        "Open-sourced; 9 GitHub stars; only pipeline integrating all three components (confirmed via landscape analysis)",
      ],
      architecture: {
        overview:
          "Track A + B \u2192 Demucs Stems \u2192 Librosa Features (BPM/Key/Energy) \u2192 Camelot Wheel \u2192 Match \u2192 Render",
        diagram: `
+-----------+   +-----------+   +----------------------+   +---------------+
|  Track A  |-->|  Demucs   |-->|  Librosa (BPM/Key/   |-->|  Camelot      |
+-----------+   |  (stems)  |   |   Energy features)   |   |  Wheel Match  |
                +-----------+   +----------------------+   +-------+-------+
+-----------+   +-----------+   +----------------------+           |
|  Track B  |-->|  Demucs   |-->|  Librosa features    |-----------+
+-----------+   +-----------+   +----------------------+           |
                                                                    v
                                                            +--------------+
                                                            |   Render     |
                                                            |  (FastAPI    |
                                                            |   + Gradio)  |
                                                            +--------------+`,
        tradeoffs: [
          "Match quality vs compute (cached features + batch)",
          "Beat-perfect sync vs musical feel (rules + smoothing)",
          "Local CPU vs GPU (pipeline is GPU-accelerated but works either way)",
        ],
      },
      decisions: [
        {
          title: "Stems first, features second",
          why: "Vocals are the hardest to blend. Separate them, then reason about the instrumentals.",
        },
        {
          title: "Camelot Wheel for key matching",
          why: "DJs already trust it. Encoding it explicitly beats a black-box similarity score.",
        },
        {
          title: "Open-sourced with a Gradio UI",
          why: "The system only matters if someone can try it in a browser without cloning and configuring.",
        },
      ],
      links: {
        github: "https://github.com/Chunduri-Aditya/ai-remixmate",
        live: "#",
        demo: "#",
      },
      metrics: [
        { label: "Stars", value: "9 on GitHub" },
        { label: "Formats", value: "8+ audio types" },
      ],
    },
    {
      id: "akashic-tree",
      title: "AkashicTree",
      subtitle: "Automated Content Generation Pipeline",
      iconName: "Sparkles",
      iconClassName: "text-purple-400",
      tags: ["Diffusers", "FLUX.1", "Ollama", "ElevenLabs", "Python", "Multimodal"],
      oneLiner:
        "A model-agnostic ACG pipeline that coordinates text (Ollama), image (FLUX.1 / Diffusers), and audio (ElevenLabs) from a single brief\u2014with drop-in backend switching that cut per-iteration inference cost 90%.",
      story:
        "Generative pipelines usually lock you into one provider per modality. I wanted a brief to fan out into text, image, and audio with whichever backend makes sense that day\u2014local Ollama for development, cloud for quality runs\u2014without changing a line of the orchestration layer.",
      evidence: [
        "Single-brief \u2192 text + image + audio via one orchestration layer",
        "Tiered backend switching: local Ollama inference vs cloud APIs (GPT-4o-mini, FLUX.1)",
        "Cut per-iteration inference cost 90% during dev cycles",
        "Cut production time 80% vs the manual equivalent",
        "Drop-in model substitution at every stage",
      ],
      architecture: {
        overview:
          "Brief \u2192 Orchestration Layer \u2192 (Text: Ollama \u2194 Cloud) \u2192 (Image: FLUX.1 / Diffusers) \u2192 (Audio: ElevenLabs) \u2192 Assembled Output",
        diagram: `
+-----------+   +----------------------+
|  Brief    |-->|  Orchestration Layer  |
+-----------+   +----+----------+-------+
                     |          |          |
          +----------+   +------+----+     +-------+
          v              v           v             v
  +---------------+ +--------------+ +--------------+
  |  Text         | | Image        | | Audio        |
  |  (Ollama <->  | | (FLUX.1 /    | | (ElevenLabs) |
  |   Cloud API)  | |  Diffusers)  | |              |
  +-------+-------+ +------+-------+ +------+-------+
          |                |                |
          +----------------+----------------+
                           |
                           v
                   +----------------+
                   |   Assembled    |
                   |    Output      |
                   +----------------+`,
        tradeoffs: [
          "Local inference (cheap, private) vs cloud API (quality ceiling) \u2014 pipeline supports both",
          "Model abstraction overhead vs lock-in risk (worth it for swap freedom)",
          "Batch throughput vs interactive UX (pipeline handles both paths)",
        ],
      },
      decisions: [
        {
          title: "Unified inference abstraction",
          why: "Text / image / audio should be swap points, not rewrites.",
        },
        {
          title: "Tiered backend switching",
          why: "The cheapest model that hits the bar is the right one. That bar changes per iteration.",
        },
        {
          title: "Model-agnostic orchestration",
          why: "The orchestration layer outlives any specific model. Build it to survive the next upgrade.",
        },
      ],
      links: {
        github: "https://github.com/Chunduri-Aditya/Automated-GenAI-Media-Pipeline-Akashic-Tree",
        live: "#",
        demo: "#",
      },
      metrics: [
        { label: "Cost", value: "\u221290% per iter" },
        { label: "Time", value: "\u221280% prod cycle" },
      ],
    },
    {
      id: "ai-health-journal",
      title: "AI Health Journal",
      subtitle: "Privacy-First LLM Assistant (On-Device RAG)",
      iconName: "Lock",
      iconClassName: "text-emerald-400",
      tags: ["RAG", "Ollama", "ChromaDB", "DPO", "Flask", "Local-First"],
      oneLiner:
        "A production RAG assistant running entirely on-device: 7B-parameter Ollama inference, ChromaDB vector store, DPO-aligned outputs, zero cloud dependency.",
      story:
        "Reflection shouldn\u2019t require exporting your private thoughts into someone else\u2019s dataset. I built the whole stack locally\u2014vector retrieval, inference, DPO alignment\u2014so the system grounds its answers in your own history without anything leaving the machine.",
      evidence: [
        "7B-parameter LLM running entirely on-device via Ollama",
        "ChromaDB vector retrieval, sub-second context injection across 10,000+ document chunks",
        "DPO (Direct Preference Optimization) fine-tuning for health-domain alignment",
        "Flask API layer \u2014 zero external API dependencies",
        "Local-first by default; no data egress",
      ],
      architecture: {
        overview:
          "Input \u2192 Embed \u2192 ChromaDB Retrieve \u2192 Compose Prompt \u2192 Ollama 7B (DPO-aligned) \u2192 Verified Response",
        diagram: `
+-----------+   +-----------+   +-----------+   +-----------+
|  Input    |-->|  Embed    |-->|  ChromaDB |-->|  Retrieve |
|  (text)   |   |           |   |  (vector) |   |   top-k   |
+-----------+   +-----------+   +-----------+   +-----+-----+
                                                       |
                                                       v
+-----------+   +-----------+   +-----------+   +-----------+
|  Response |<--|  Verify   |<--|  Ollama   |<--|  Compose  |
|           |   |           |   |  7B (DPO) |   |   prompt  |
+-----------+   +-----------+   +-----------+   +-----------+`,
        tradeoffs: [
          "On-device (private, limited by local hardware) vs cloud (scale, but leak risk)",
          "Retrieval recall vs precision (tight top-k + DPO alignment keep it grounded)",
          "DPO training cost vs alignment quality (one-time investment, compounds per response)",
        ],
      },
      decisions: [
        {
          title: "On-device everything",
          why: "Health context is the last thing I\u2019d hand to a cloud endpoint I don\u2019t control.",
        },
        {
          title: "DPO over SFT",
          why: "Direct preference signals are closer to what \u2018useful for me\u2019 actually means than instruction-tuned defaults.",
        },
        {
          title: "RAG as grounding, not retrieval",
          why: "The point isn\u2019t surfacing passages. It\u2019s anchoring responses so they can\u2019t drift.",
        },
      ],
      links: {
        github: "https://github.com/Chunduri-Aditya/ai-health-journal",
        live: "#",
        demo: "#",
      },
      metrics: [
        { label: "Inference", value: "7B on-device" },
        { label: "Retrieval", value: "10k+ chunks, sub-sec" },
      ],
    },
    {
      id: "model-behavior-lab",
      title: "Model Behavior Lab",
      subtitle: "Adversarial LLM Benchmarking Platform",
      iconName: "Eye",
      iconClassName: "text-cyan-400",
      tags: ["Evals", "Ollama", "Plotly", "CI/CD", "Adversarial", "Python"],
      oneLiner:
        "An adversarial evaluation platform running 5,000+ automated tests across 10+ frontier models\u2014measuring instruction-hierarchy violations, hallucination rate, and refusal consistency with zero manual review.",
      story:
        "I got tired of debating model quality with adjectives. So I built a platform that phrases the question in code: versioned tests, scored outputs, CI-integrated benchmarks. If a new model lands, the numbers are already waiting.",
      evidence: [
        "5,000+ automated tests across 10+ frontier models (GPT-4, Claude, Llama, Mistral)",
        "Measures instruction-hierarchy violations, hallucination rate, refusal consistency",
        "CI/CD integrated \u2014 new model versions benchmark automatically on release",
        "Modular JSON test suites \u2014 any Ollama or API-accessible model is a drop-in target",
        "Evaluation setup time: hours \u2192 under 5 minutes per release cycle",
      ],
      architecture: {
        overview:
          "JSON Test Suite \u2192 CI Runner \u2192 Model Pool (Ollama / API) \u2192 Scorers \u2192 Plotly Reports + Diffs",
        diagram: `
+------------------+   +----------------+   +-------------------+
|  JSON Test Suite |-->|  CI Runner     |-->|  Model Pool       |
|  (adversarial)   |   |  (GH Actions)  |   |  (10+ frontier)   |
+------------------+   +----------------+   +---------+---------+
                                                       |
                                                       v
+------------------+   +----------------+   +-------------------+
|  Plotly Reports  |<--|  Scorers       |<--|  Raw Outputs      |
|  + Diffs         |   |  (automated)   |   |                   |
+------------------+   +----------------+   +-------------------+`,
        tradeoffs: [
          "Automated scoring vs human rater (automated wins at scale; calibrated against judge model)",
          "Strict scoring vs flexibility (JSON schema keeps it configurable, not rigid)",
          "Breadth (many models) vs depth (full probe) \u2014 CI handles breadth, targeted runs handle depth",
        ],
      },
      decisions: [
        {
          title: "JSON-driven test suites",
          why: "Evaluation should be reviewable like code, not buried in notebooks.",
        },
        {
          title: "CI-integrated benchmarking",
          why: "If a regression is only visible when someone remembers to run it, it\u2019s invisible.",
        },
        {
          title: "Failure-mode taxonomy (violations / hallucination / refusal)",
          why: "Averages hide regressions. Categories surface them.",
        },
      ],
      links: {
        github: "https://github.com/Chunduri-Aditya/Model-Behavior-Lab",
        live: "#",
        demo: "#",
      },
      metrics: [
        { label: "Scale", value: "5,000+ tests" },
        { label: "Models", value: "10+ frontier" },
      ],
    },
  ],
};

/* ============================================================================
 * SECTION 6 — EXPERIENCE ("Field Work")
 * ========================================================================= */

export type ExperienceAccent = "cyan" | "purple" | "emerald";

export interface ExperienceItem {
  org: string;
  role: string;
  location: string;
  period: string;
  accent: ExperienceAccent;
  story: string;
  signal: string;
  bullets: string[];
  tags: string[];
}

export interface ExperienceSectionContent {
  header: {
    title: string;
    iconName: IconName;
    subtitle: { signal: string; story: string };
  };
  items: ExperienceItem[];
}

export const EXPERIENCE: ExperienceSectionContent = {
  header: {
    title: "Field Work",
    iconName: "Briefcase",
    subtitle: {
      signal: "Research roles. What I shipped, measured, and handed off.",
      story: "Places where the problem pushed back and forced me to build better tools.",
    },
  },
  items: [
    {
      org: "USC \u2014 Viterbi School of Engineering",
      role: "Research Assistant \u00b7 Computer Vision & Medical Imaging",
      location: "Los Angeles, CA",
      period: "Aug 2024 \u2013 Dec 2024",
      accent: "cyan",
      story:
        "Retinal vessels are small, the labels are noisy, and the downstream diagnosis depends on every pixel. I treated the segmentation problem like a systems problem: better loss, better pipeline, better data hygiene\u2014until the score stopped moving by accident.",
      signal:
        "Led U-Net segmentation + data pipeline work on the CVD-Masks retinal dataset across three concurrent projects, with reproducible experiment tracking and automated curation.",
      bullets: [
        "Engineered a U-Net segmentation pipeline for retinal artery-vein classification on CVD-Masks, achieving 94% Dice score through architectural tuning and custom loss functions",
        "Designed modular PyTorch training pipelines with experiment tracking across 3 concurrent projects, cutting iteration cycles 30% and enabling reproducible comparisons",
        "Built an automated medical image scraper with quality-validation controls, cutting manual curation time 40% across 10,000+ images",
        "Presented findings in weekly cross-functional reviews, translating quantitative results into actionable research decisions",
      ],
      tags: ["PyTorch", "U-Net", "Medical Imaging", "Segmentation", "Experiment Tracking"],
    },
    {
      org: "SSN College of Engineering",
      role: "Research Intern \u00b7 Computer Vision & Object Detection",
      location: "Remote",
      period: "Jun 2021 \u2013 Jul 2021",
      accent: "purple",
      story:
        "I wanted to understand what \u201creal-time\u201d actually costs. Fine-tuned YOLO, benchmarked it across five environmental conditions, and built enough reusable tooling that the next intern didn\u2019t have to start from scratch.",
      signal:
        "Object detection / tracking work: YOLO fine-tuning, 30+ fps pipelines, and reusable PyTorch/TensorFlow modules that eliminated manual annotation overhead.",
      bullets: [
        "Built real-time object tracking pipelines achieving 30+ fps; fine-tuned YOLO-based CNN architectures, improving detection robustness 15% across 5 environmental conditions",
        "Automated a video dataset generation pipeline, eliminating 100% of manual frame-annotation overhead",
        "Produced 10+ reusable PyTorch and TensorFlow modules standardizing deployment workflows and reducing onboarding time for new contributors",
      ],
      tags: ["YOLO", "PyTorch", "TensorFlow", "Object Tracking", "Real-Time"],
    },
  ],
};

/* ============================================================================
 * SECTION 7 — RESEARCH ("Deep Theory")
 * ========================================================================= */

export type ResearchAccent = "cyan" | "purple" | "blue" | "green";

export interface ResearchContent {
  header: {
    title: string;
    iconName: IconName;
    subtitle: { signal: string; story: string };
  };
  badge: string;
  title: string;
  story: string;
  signal: string;
  metrics: { label: string; value: string; accent: ResearchAccent }[];
  paperHref: string;
  certHref: string;
}

export const RESEARCH: ResearchContent = {
  header: {
    title: "Deep Theory",
    iconName: "BookOpen",
    subtitle: {
      signal: "Research + publication work.",
      story: "I like models that respect the physics of reality.",
    },
  },
  badge: "PUBLICATION: IJRASET VOL 11",
  title: "Wind Power Analysis using Digital Twins & ML",
  story:
    "Wind is messy. I built a Digital Twin on Azure to simulate the present and forecast the future\u2014then tested models that respect long-range time dependencies.",
  signal:
    "Hybrid forecasting model combining TCN + KNN inside a Digital Twin architecture on Azure to improve wind output forecasting.",
  metrics: [
    { label: "Architecture", value: "Digital Twin", accent: "cyan" },
    { label: "Model", value: "TCN + KNN", accent: "purple" },
    { label: "Cloud", value: "Azure", accent: "blue" },
    { label: "Focus", value: "Forecasting", accent: "green" },
  ],
  paperHref: ASSETS.publicationPaper,
  certHref: ASSETS.publicationCertificate,
};

/* ============================================================================
 * SECTION 8 — SIDEBAR (User Manual + Off-Keyboard + Skills + CTA)
 * ========================================================================= */

export type SkillAccent = "rose" | "purple" | "cyan" | "emerald" | "blue";

export interface SkillCategory {
  category: string;
  tools: string[];
  iconName: IconName;
  accent: SkillAccent;
}

export interface UserManualItem {
  num: string;
  strong: string;
  text: string;
}

export interface OffKeyboardItem {
  title: string;
  iconName: IconName;
  iconClassName?: string;
  extra?: string;
  text: { signal: string; story: string };
}

export interface SidebarContent {
  userManual: {
    title: string;
    iconName: IconName;
    items: UserManualItem[];
    collaborationStyle: { label: string; text: { signal: string; story: string } };
    performanceHabits: { label: string; text: { signal: string; story: string } };
  };
  offKeyboard: {
    title: string;
    iconName: IconName;
    subtitle: string;
    items: OffKeyboardItem[];
  };
  skills: {
    title: string;
    iconName: IconName;
    items: SkillCategory[];
  };
  cta: {
    title: string;
    subtitle: string;
    resumeLabel: string;
    emailLabel: string;
    resumeHref: string;
    emailHref: string;
  };
}

export const SIDEBAR: SidebarContent = {
  userManual: {
    title: "User Manual",
    iconName: "FileText",
    items: [
      {
        num: "01",
        strong: "I optimize for:",
        text: "Reproducibility. If I can\u2019t run it twice and get the same behavior, it isn\u2019t stable.",
      },
      {
        num: "02",
        strong: "I thrive when:",
        text: "The problem is ambiguous and the solution needs a bridge between two worlds.",
      },
      {
        num: "03",
        strong: "Tooling:",
        text: "I use configs, logs, and evals to force structure onto experimentation.",
      },
    ],
    collaborationStyle: {
      label: "Collaboration style",
      text: {
        signal:
          "Define outcome + constraints. I\u2019ll propose an approach, document tradeoffs, and ship with tests and artifacts.",
        story:
          "Give me a messy problem and a success metric. I\u2019ll turn it into a pipeline, instrument it, and iterate until the system behaves.",
      },
    },
    performanceHabits: {
      label: "Performance habits",
      text: {
        signal: "I treat focus like a trainable skill: routines, feedback loops, resets.",
        story: "Intensity is a feature. Structure is how I aim it.",
      },
    },
  },
  offKeyboard: {
    title: "Off-Keyboard Training",
    iconName: "Activity",
    subtitle: "High-bandwidth attention channeled into structure",
    items: [
      {
        title: "Meditation",
        iconName: "Brain",
        iconClassName: "text-emerald-400",
        extra: "5+ years",
        text: {
          signal: "Attention training: calm under pressure, faster reset, deliberate focus.",
          story:
            "Meditation is my reset button. It turns mental bandwidth into clean signal.",
        },
      },
      {
        title: "Athletics",
        iconName: "Activity",
        iconClassName: "text-cyan-400",
        text: {
          signal:
            "Swimming (endurance + breath control), Badminton (speed + tactics), athletic conditioning.",
          story:
            "Sports that punish sloppy feedback loops: swimming and badminton don\u2019t lie.",
        },
      },
      {
        title: "Techno Focus",
        iconName: "Music",
        iconClassName: "text-purple-400",
        text: {
          signal: "Lyric-light techno as a focus soundtrack during deep work sprints.",
          story:
            "A steady rhythm helps me hold the thread\u2014like a metronome for thinking.",
        },
      },
    ],
  },
  skills: {
    title: "Cognitive Stack",
    iconName: "Layers",
    items: [
      {
        category: "Eval & Adversarial (Safety)",
        tools: ["Inspect AI", "AgentDojo", "DPO", "Red Teaming", "Prompt Injection"],
        iconName: "ShieldCheck",
        accent: "rose",
      },
      {
        category: "LLM & Orchestration",
        tools: ["LangChain", "Ollama", "Hugging Face", "RAG", "ChromaDB"],
        iconName: "Sparkles",
        accent: "purple",
      },
      {
        category: "ML Foundations",
        tools: ["PyTorch", "TensorFlow", "Scikit-learn", "OpenCV", "Librosa", "Demucs"],
        iconName: "Cpu",
        accent: "cyan",
      },
      {
        category: "Systems & Cloud",
        tools: ["Docker", "AWS", "FastAPI", "Flask", "GitHub Actions", "CI/CD"],
        iconName: "Wrench",
        accent: "emerald",
      },
      {
        category: "Data & Storage",
        tools: ["PostgreSQL", "ChromaDB", "Neo4j", "Pandas", "NumPy", "Plotly"],
        iconName: "Database",
        accent: "blue",
      },
    ],
  },
  cta: {
    title: "Want the receipts?",
    subtitle: "One resume, all the proof.",
    resumeLabel: "Resume (PDF)",
    emailLabel: "Email",
    resumeHref: ASSETS.resumePdf,
    emailHref: `mailto:${CONTACT.email}`,
  },
};

/* ============================================================================
 * SECTION 9 — FOOTER
 * ========================================================================= */

export interface FooterContent {
  brand: string;
  tagline: string;
  copyright: (year: number) => string;
}

export const FOOTER: FooterContent = {
  brand: "~/aditya",
  tagline: "Built with React + Tailwind + Framer Motion",
  copyright: (year) => `\u00a9 ${year} Aditya Chunduri. All rights reserved.`,
};

/* ============================================================================
 * SECTION 10 — FAQ BOT INTENTS
 * ----------------------------------------------------------------------------
 * Each intent has utterances (phrases users might type), an answer, and links.
 * The matcher (src/lib/matchIntent.ts) scores incoming queries against utterances + tags.
 * ========================================================================= */

export interface FAQLink {
  label: string;
  href: string;
  sectionId?: string;
}

export interface FAQIntent {
  id: string;
  title: string;
  utterances: string[];
  answer: string | ReactNode;
  links: FAQLink[];
  tags: string[];
}

export const FAQ_INTENTS: FAQIntent[] = [
  {
    id: "about-me",
    title: "About me",
    utterances: [
      "tell me about this person",
      "tell me about you",
      "who are you",
      "about you",
      "introduce yourself",
      "what do you do",
      "what is your background",
      "who is aditya",
      "tell me about aditya",
    ],
    answer:
      "I'm Aditya Chunduri \u2014 M.S. Applied Data Science at USC (graduating Dec 2025), focused on AI agent security and LLM evaluation. I build reproducible adversarial-testing systems for frontier LLMs, with a current push on Agent Shield: an 8-module evaluation framework stress-testing 8 frontier models on UK AISI's Inspect AI harness.",
    links: [
      { label: "View Projects", href: "#projects", sectionId: "projects" },
      { label: "How I Think", href: "#thinking", sectionId: "thinking" },
      { label: "Resume", href: ASSETS.resumePdf },
    ],
    tags: ["about", "who", "introduction", "background", "person", "aditya", "you"],
  },
  {
    id: "current-focus",
    title: "What I'm working on now",
    utterances: [
      "what are you working on",
      "current project",
      "current focus",
      "what now",
      "what's next",
      "right now",
      "latest work",
    ],
    answer:
      "Agent Shield \u2014 an LLM agent security evaluation framework. 8 adversarial modules (prompt injection, MCP tool poisoning, RAG memory attacks, multi-agent manipulation, covert exfiltration, Cialdini-grounded behavioral drift, and more) benchmarked across 8 frontier models on Inspect AI. Unified ASR + utility-under-attack metrics, reproducible seeds, judge-model versioning. arXiv preprint in progress.",
    links: [
      { label: "Agent Shield details", href: "#projects", sectionId: "agent-shield" },
    ],
    tags: ["current", "now", "next", "latest", "agent shield", "working on"],
  },
  {
    id: "agent-shield",
    title: "Agent Shield",
    utterances: [
      "agent shield",
      "llm agent security",
      "agent security",
      "adversarial evaluation",
      "inspect ai",
      "agent dojo",
      "prompt injection framework",
      "mcp security",
      "red teaming llm",
    ],
    answer:
      "Agent Shield is an 8-module adversarial evaluation framework for LLM agents. It tests prompt injection, MCP tool poisoning, RAG memory attacks, multi-agent manipulation, covert exfiltration, and Cialdini-grounded behavioral drift across 8 frontier models (Claude, GPT-4.1, Gemini 2.5, Llama 3.1, Mistral Large, DeepSeek V3). Built on UK AISI's Inspect AI harness with unified ASR + utility-under-attack metrics, reproducible seeds, and CI-ready eval logs.",
    links: [
      { label: "View Project", href: "#projects", sectionId: "agent-shield" },
    ],
    tags: [
      "agent shield",
      "security",
      "adversarial",
      "inspect ai",
      "agent dojo",
      "prompt injection",
      "mcp",
      "red teaming",
      "ai safety",
    ],
  },
  {
    id: "summarize-projects",
    title: "Summarize projects",
    utterances: [
      "what projects have you built",
      "tell me about your projects",
      "show me your work",
      "what have you worked on",
      "summarize your projects",
      "list your projects",
    ],
    answer:
      "Five shipped systems, all focused on evaluation, adversarial testing, and grounded AI: Agent Shield (LLM agent security framework on Inspect AI), AI RemixMate (end-to-end audio ML pipeline with Demucs + Librosa + Camelot Wheel), AkashicTree (multimodal generation pipeline with 90% inference-cost reduction), AI Health Journal (on-device RAG with DPO alignment), and Model Behavior Lab (5,000+ adversarial tests across 10+ frontier models with CI/CD integration).",
    links: [
      { label: "View Projects", href: "#projects", sectionId: "projects" },
    ],
    tags: ["projects", "work", "portfolio", "systems", "built"],
  },
  {
    id: "behavior-lab",
    title: "Model Behavior Lab",
    utterances: [
      "model behavior lab",
      "evaluation framework",
      "llm evaluation",
      "truth seeking engine",
      "how do you test models",
      "model testing",
      "eval framework",
    ],
    answer:
      "Model Behavior Lab is an adversarial LLM evaluation platform running 5,000+ automated tests across 10+ frontier models (GPT-4, Claude, Llama, Mistral). It measures instruction-hierarchy violations, hallucination rate, and refusal consistency with CI/CD integration so new model versions benchmark automatically. JSON test suites make any Ollama or API-accessible model a drop-in target.",
    links: [
      { label: "View Project", href: "#projects", sectionId: "model-behavior-lab" },
    ],
    tags: ["evaluation", "llm", "testing", "benchmark", "json", "reproducible", "ci/cd"],
  },
  {
    id: "health-journal",
    title: "AI Health Journal",
    utterances: [
      "health journal",
      "ai journal",
      "rag journal",
      "external memory",
      "privacy journal",
      "journaling assistant",
      "on device llm",
      "dpo",
    ],
    answer:
      "AI Health Journal is a privacy-first LLM assistant running a 7B-parameter model entirely on-device via Ollama. ChromaDB handles sub-second vector retrieval across 10,000+ document chunks. DPO (Direct Preference Optimization) fine-tunes responses for health-domain alignment. Zero cloud dependency, zero data egress.",
    links: [
      { label: "View Project", href: "#projects", sectionId: "ai-health-journal" },
    ],
    tags: ["rag", "privacy", "journal", "dpo", "ollama", "chromadb", "on-device", "local-first"],
  },
  {
    id: "remix-mate",
    title: "AI RemixMate",
    utterances: [
      "remixmate",
      "remix mate",
      "audio remix",
      "music remix",
      "dj system",
      "audio processing",
      "demucs",
      "camelot",
      "librosa",
    ],
    answer:
      "AI RemixMate is an end-to-end audio ML pipeline: Demucs source separation, Librosa spectral feature extraction, and Camelot-Wheel harmonic matching. FastAPI backend with GPU acceleration, Gradio web UI supporting 8+ audio formats, real-time BPM / key / energy analysis. Open-sourced with 9 GitHub stars \u2014 confirmed via landscape analysis as the only pipeline integrating all three components.",
    links: [
      { label: "View Project", href: "#projects", sectionId: "ai-remixmate" },
    ],
    tags: ["audio", "music", "remix", "demucs", "librosa", "camelot", "fastapi", "gradio"],
  },
  {
    id: "akashic-tree",
    title: "AkashicTree",
    utterances: [
      "akashictree",
      "akashic tree",
      "content generation",
      "media pipeline",
      "flux.1",
      "diffusers",
      "elevenlabs",
      "automated content",
    ],
    answer:
      "AkashicTree is a model-agnostic ACG (Automated Content Generation) pipeline coordinating text (Ollama), image (FLUX.1 / Diffusers), and audio (ElevenLabs) from a single brief. Tiered backend-switching between local Ollama inference and cloud APIs cut per-iteration inference cost 90% during development cycles, and production time fell 80% vs the manual equivalent.",
    links: [
      { label: "View Project", href: "#projects", sectionId: "akashic-tree" },
    ],
    tags: ["content", "generation", "multimodal", "flux", "diffusers", "elevenlabs", "ollama"],
  },
  {
    id: "experience-roles",
    title: "Research experience",
    utterances: [
      "research experience",
      "have you done research",
      "usc viterbi",
      "research assistant",
      "ssn",
      "medical imaging",
      "past roles",
      "work experience",
      "internship",
    ],
    answer:
      "Two research roles. At USC Viterbi (Aug\u2013Dec 2024), I was a Research Assistant in Computer Vision & Medical Imaging \u2014 built a U-Net segmentation pipeline for retinal artery-vein classification reaching 94% Dice on CVD-Masks, plus modular training pipelines across 3 concurrent projects and an automated medical image scraper processing 10,000+ images. At SSN College (Jun\u2013Jul 2021), I worked on real-time object tracking at 30+ fps with YOLO-based CNNs and shipped 10+ reusable PyTorch/TensorFlow modules.",
    links: [
      { label: "Experience section", href: "#experience", sectionId: "experience" },
    ],
    tags: [
      "experience",
      "research",
      "usc",
      "viterbi",
      "ssn",
      "medical imaging",
      "u-net",
      "yolo",
      "internship",
      "research assistant",
    ],
  },
  {
    id: "research-paper",
    title: "Research paper",
    utterances: [
      "research paper",
      "publication",
      "wind power",
      "digital twin",
      "tcn",
      "knn",
      "your paper",
      "published work",
      "ijraset",
    ],
    answer:
      "Published research on Wind Power Analysis using Digital Twins & ML in IJRASET Vol 11 (Aug 2023, co-author). The work combines KNN and TCN inside a Digital Twin architecture on Azure to improve wind forecasting with long-range time dependencies.",
    links: [
      { label: "Read Paper", href: ASSETS.publicationPaper },
      { label: "View Certificate", href: ASSETS.publicationCertificate },
      { label: "Research Section", href: "#research", sectionId: "research" },
    ],
    tags: ["research", "paper", "publication", "wind", "digital twin", "tcn", "knn", "azure"],
  },
  {
    id: "skills-stack",
    title: "Skills/stack",
    utterances: [
      "what are your skills",
      "tech stack",
      "technologies",
      "what do you know",
      "programming languages",
      "tools you use",
      "your skills",
      "technical skills",
    ],
    answer:
      "Eval & adversarial: Inspect AI, AgentDojo, DPO, red teaming, prompt injection. LLM & orchestration: LangChain, Ollama, Hugging Face, RAG, ChromaDB. ML foundations: PyTorch, TensorFlow, Scikit-learn, OpenCV, Librosa, Demucs. Systems & cloud: Docker, AWS, FastAPI, Flask, GitHub Actions, CI/CD. Languages: Python, C++, SQL, JavaScript, Bash.",
    links: [
      { label: "View Skills", href: "#skills", sectionId: "skills" },
    ],
    tags: [
      "skills",
      "stack",
      "python",
      "inspect ai",
      "langchain",
      "docker",
      "rag",
      "dpo",
      "tools",
      "technologies",
      "programming",
    ],
  },
  {
    id: "contact-links",
    title: "Contact/links",
    utterances: [
      "how to contact",
      "email",
      "linkedin",
      "github",
      "get in touch",
      "contact info",
      "social links",
      "where are you",
    ],
    answer:
      `Reach me at ${CONTACT.email}. Based in ${CONTACT.location}. Open to AI safety / agent security / LLM evaluation roles, research collaborations, and PhD discussions (targeting Fall 2027).`,
    links: [
      { label: "Email", href: `mailto:${CONTACT.email}` },
      { label: "GitHub", href: CONTACT.github },
      { label: "LinkedIn", href: CONTACT.linkedin },
    ],
    tags: ["contact", "email", "linkedin", "github", "social", "reach out"],
  },
  {
    id: "resume",
    title: "Resume",
    utterances: [
      "resume",
      "cv",
      "curriculum vitae",
      "download resume",
      "your resume",
      "get resume",
      "view resume",
      "open resume",
    ],
    answer:
      "One combined resume covering Agent Shield, adversarial evaluation, Inspect AI, DPO, red teaming, and the full ML / SWE stack (PyTorch, TensorFlow, computer vision, end-to-end pipelines).",
    links: [
      { label: "Resume (PDF)", href: ASSETS.resumePdf },
    ],
    tags: ["resume", "cv", "pdf", "download", "experience", "ml", "llm", "safety", "swe"],
  },
];

/* ── FAQ bot launcher / chrome (UI strings) ───────────────────────────── */
export const FAQ_BOT_UI = {
  launcherLabel: "Ask about my work",
  introMessage:
    "I'm a lightweight FAQ bot. Ask about my projects, resume, tech stack, or how I think.",
  fallbackMessage: "I'm not sure. Try one of these:",
  inputPlaceholder: "Ask about my work...",
  quickChips: [
    { id: "summarize-projects", label: "Projects" },
    { id: "resume", label: "Resume" },
    { id: "contact-links", label: "Contact" },
    { id: "skills-stack", label: "Tech stack" },
    { id: "about-me", label: "How I think" },
  ],
};
