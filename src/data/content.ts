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
  agentShieldPaper: getPublicPath("Docs/Agent_Shield_Paper.pdf"),
} as const;

/* ── Contact / social (used by Navbar, Footer, Sidebar, FAQ bot) ──────── */
export const CONTACT = {
  email: "chunduri@usc.edu",
  github: "https://github.com/Chunduri-Aditya",
  linkedin: "https://linkedin.com/in/aditya-chunduri",
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
  statusBadge: "System Status: ONLINE // Agent Shield Build Active",
  headline: {
    signal: "Agents are shipping. I build the evals that catch what breaks.",
    story: "I turn noise into signal.",
  },
  subhead:
    "M.S. Applied Data Science, USC \u00b7 AI Safety & Agent Security \u00b7 LLM Evaluation \u00b7 Adversarial Testing",
  intro: {
    signal:
      "Building reproducible evaluation systems for LLM agents. Current focus: Agent Shield, adversarial evals for prompt injection, MCP tool poisoning, RAG memory poisoning, and behavioral drift across frontier models, scored on attack success rate, benign utility, and transparency, mapped to OWASP and MITRE ATLAS, all on Inspect AI. Now paired with a local runtime perimeter that screens MCP tool descriptions before an agent ever reads them.",
    story:
      "Agents are shipping faster than we know how to test them. I\u2019m building adversarial evaluation systems that catch failure modes before deployment: reproducible, logged, standard aligned. Current obsession: Agent Shield, an attack framework on the Inspect AI harness that grew a second half, a local perimeter that screens untrusted tool descriptions at runtime instead of only scoring them afterward.",
  },
  chips: {
    signal: [
      { iconName: "ShieldCheck", text: "Inspect AI harness" },
      { iconName: "Target", text: "ASR + benign utility" },
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
      subtitle: "Adversarial Eval Framework + Local Runtime Perimeter",
      iconName: "ShieldCheck",
      iconClassName: "text-rose-400",
      tags: [
        "Inspect AI",
        "AgentDojo",
        "HarmBench",
        "Prompt Injection",
        "MCP Security",
        "Runtime Perimeter",
        "OWASP / MITRE ATLAS",
        "Python",
      ],
      oneLiner:
        "An adversarial evaluation framework that stress-tests LLM agents across prompt injection, MCP tool poisoning, RAG memory poisoning, and behavioral drift, built on UK AISI\u2019s Inspect AI harness and mapped to OWASP and MITRE ATLAS. Now with a second claim surface: a local runtime perimeter that screens MCP tool descriptions in flight.",
      story:
        "Agents are being deployed faster than they\u2019re being measured. I built a reproducible attack surface first: one harness, one scoring schema, seeded tasks, so failures show up as scored diffs and not vibes. Then the results made the second half obvious. If no model flags a poisoned tool description, scoring that after the fact isn\u2019t enough, so the same repo now ships a local perimeter that screens tool descriptions before the agent ever reads them.",
      evidence: [
        "6 live attack modules, 28 attack IDs: prompt injection, MCP tool poisoning, RAG/memory poisoning, covert exfiltration, social engineering, multi turn behavioral drift",
        "Introduced Transparency Rate, whether an agent flags an attack to its operator, as a third axis alongside ASR and Benign Utility in a six cell outcome model extending AgentDojo's 2x2 matrix",
        "Two anchored surfaces at n=20 with Wilson 95% CIs: inputs/ (prompt injection) logged on 4 of the 8 target frontier models, and tools/ (MCP tool description poisoning) logged on Sonnet 4.5 and Llama 3.1 8B. Every other module is labeled a diagnostic probe, not a powered result",
        "On anchored prompt injection, Sonnet 4.5 is the sole model with non-zero TR (0.150); the other three sit at 0.000. Spotlighting raises TR to 0.800 but adds 0.200 to ASR via paraphrase residue",
        "On anchored MCP tool poisoning (TL-01, n=20), both logged models score ASR 0.000 and TR 0.000: the poisoned description is neither executed nor flagged. Resisting quietly and never telling the operator is exactly the gap TR exists to name",
        "Local runtime perimeter (agent-shield-guard, agent-shield-mcp-proxy) screens untrusted text and MCP tool descriptions, quarantines known poisons, and raises operator alerts. A library and CLI by design, deliberately not a hosted firewall",
        "Bounded research control plane that makes no network calls of its own: query redaction, CIA classification, source screening, approval manifests, retrieved content screening, quarantine, and append only audit events wrapped around whichever agent does the fetching",
        "TR-v2 LLM judge built as a challenger to the v1 phrase list scorer, held back from promotion until a human labeled holdout clears a 5% false positive gate",
        "Built on Inspect AI (UK AISI harness), standard aligned rather than ad hoc; all attacks mapped to OWASP LLM, OWASP Agentic, MITRE ATLAS, and AIVSS",
        "Released as a Zenodo preprint (doi:10.5281/zenodo.20789431) with framework, attack registries, seeds, and logs",
      ],
      architecture: {
        overview:
          "Two surfaces. Eval: Seeded Task \u2192 Inspect AI Harness \u2192 Agent Under Test \u2192 Scorers \u2192 ASR + Utility + Transparency. Runtime: Untrusted Text / MCP Tool Description \u2192 Screener \u2192 Quarantine or Pass \u2192 Operator Alert",
        diagram: `
  EVAL SURFACE (scored, seeded, reproducible)
+----------------+   +----------------+   +-------------------+
|  Attack Suite  |-->|  Inspect AI    |-->|  Agent Under Test |
|  6 modules     |   |  Harness       |   |  (frontier LLMs)  |
|  28 attack IDs |   |  (seed-pinned) |   |                   |
+----------------+   +----------------+   +---------+---------+
                                                     |
                                                     v
+----------------+   +----------------+   +-------------------+
|  ASR + Utility |<--|  Scorers       |<--|  Tool + Memory    |
|  + Transparency|   |  (TR-v1 live,  |   |  Trace            |
|    (n=20 CI)   |   |   TR-v2 chal.) |   |                   |
+----------------+   +----------------+   +-------------------+

  RUNTIME SURFACE (local library + CLI, separate claim)
+----------------+   +----------------+   +-------------------+
|  Untrusted     |-->|  agent-shield- |-->|  Quarantine  or   |
|  text / MCP    |   |  guard / proxy |   |  pass to agent    |
|  tool descs    |   |  (screeners)   |   +---------+---------+
+----------------+   +----------------+             |
                                                     v
                                          +-------------------+
                                          |  Operator Alert   |
                                          +-------------------+`,
        tradeoffs: [
          "Anchored vs diagnostic: only 2 surfaces are powered at n=20; the rest are labeled probes rather than quietly presented as results",
          "Automated scoring vs human rater (automated is cheaper and seeded for reproducibility)",
          "Safety of running attacks vs value of knowing failure modes (sandboxed, logged, bounded)",
          "Local library vs hosted service: shipping a library keeps the claim checkable and avoids a product promise the evidence does not support yet",
        ],
      },
      decisions: [
        {
          title: "Built on Inspect AI, not a custom harness",
          why: "The field needs evals that compose; UK AISI\u2019s harness is the closest thing to a standard.",
        },
        {
          title: "Unified scoring across every attack class",
          why: "Attacks only get comparable when the scoreboard is the same. ASR, benign utility, and transparency hold everywhere.",
        },
        {
          title: "Seeded JSONL tasks + OWASP / MITRE ATLAS mapping",
          why: "A result that can\u2019t be re-run is a rumor, and a threat without a taxonomy is a one-off. Every run is reproducible and mapped.",
        },
        {
          title: "Label anchored results separately from diagnostic probes",
          why: "Six live modules is not six powered results. Two surfaces carry n=20 and Wilson intervals; the rest are explicitly marked probes so the README can never be misread as a leaderboard.",
        },
        {
          title: "Ship the runtime perimeter as a local library, not a service",
          why: "The eval numbers and the runtime guard are different claims with different evidence. Keeping the perimeter local and CLI-shaped keeps them from being quoted as one thing.",
        },
      ],
      links: {
        github: "https://github.com/Chunduri-Aditya/agent-shield",
        live: "https://doi.org/10.5281/zenodo.20789431",
        demo: "#",
      },
      metrics: [
        { label: "Attack IDs", value: "6 modules · 28" },
        { label: "Anchored", value: "2 surfaces · n=20" },
      ],
    },
    {
      id: "ai-remixmate",
      title: "AI RemixMate",
      subtitle: "Full-Stack DJ Engine with Research-Grade MIR",
      iconName: "Music",
      iconClassName: "text-purple-400",
      tags: ["FastAPI", "React/TypeScript", "Demucs", "Beat This!", "CLAP", "Essentia", "librosa", "Audio ML"],
      oneLiner:
        "A full-stack DJ engine: React/TypeScript frontend with SSE live streaming, FastAPI async job queue, and a research-grade MIR core (TIV harmonic scoring, Beat This! downbeat detection, CLAP 512-D semantic search) with 520+ tests and -14 LUFS mastering.",
      story:
        "A clean transition is hidden engineering. I started with Demucs stems and Camelot Wheel matching, then kept pulling the thread\u2014replacing librosa beat detection with Beat This! (ISMIR 2024) for proper downbeats, swapping IIR bass shelving for a true cosine-taper stem ramp, adding TIV harmonic scoring from the MIR literature, and building CLAP 512-D semantic search so DJs can find tracks by sound, not just by name. Then wrapped it in a React frontend with real-time SSE job streaming so it actually behaves like a product.",
      evidence: [
        "FastAPI async job queue (SQLite write-through persistence) + React/TypeScript frontend, 8 pages, SSE live job streaming, Zustand state management",
        "TIV harmonic scoring (Bernardes et al. 2016 Tonal Interval Space) replacing psychoacoustic consonance approximation",
        "Beat This! (ISMIR 2024) downbeat detection with 8/16/32-bar grid snapping, replacing librosa beat_track",
        "Cosine-taper stem bass ramp (no IIR bleed) + FxNorm per-stem-type LUFS normalization using corpus-derived targets",
        "CLAP 512-D semantic search (crate_digger.py) + Essentia arousal/valence energy arc modeling for setlist planning",
        "rekordbox XML + Serato GEOB cue export to bridge output into professional DJ software",
        "Learned spectral matching: mel band trajectory matching picks track B's entry phrase against A's outro evolution, with drop aware scoring so B's drop lands just after handover and never mid crossfade. Per band weights update online from thumbs up/down verdicts, one shot per render",
        "Post render spectral sync: a time varying multiband EQ eases the overlap spectrum from A to B, transient preserving via onset flux protection, gain capped and edge tapered, bass band left untouched",
        "Masking aware multiband EQ (Hafezi & Reiss 2015) behind a defensive import, so a missing dependency degrades to no EQ instead of breaking the render",
        "Two mixing engines selectable per job: a frozen byte faithful vendor of the April 2026 algorithm alongside the current pipeline, with every result recording which engine produced it",
        "Live-testing passes against the running app kept catching what the shape-only test suite couldn't: a compatibility scorer marking key-clashing pairs ‘compatible,’ a library-count undercount from a partial indexing write, a duplicate song-naming policy causing request floods, and a job executor that never emitted terminal SSE frames so job cards froze at their last progress percentage forever. Each one has a regression test now",
        "520+ tests across unit, behavioral, and integration suites; GitHub Actions CI; 18 organic GitHub stars",
      ],
      architecture: {
        overview:
          "Track A + B \u2192 Demucs Stems \u2192 Beat This! Downbeats \u2192 Bar-Grid Snap \u2192 TIV Harmonic Match \u2192 Stem Bass Ramp + FxNorm \u2192 -14 LUFS Master \u2192 FastAPI Job Queue \u2192 React SSE Frontend",
        diagram: `
+-----------+   +-----------+   +----------------------+   +-------------------+
|  Track A  |-->|  Demucs   |-->|  Beat This! (ISMIR   |-->|  Bar-Grid Snap    |
+-----------+   |  (stems)  |   |  2024) Downbeats     |   |  (8/16/32-bar)    |
                +-----------+   +----------------------+   +--------+----------+
+-----------+   +-----------+   +----------------------+            |
|  Track B  |-->|  Demucs   |-->|  TIV Harmonic Score  |------------+
+-----------+   +-----------+   +----------------------+            |
                                                                     v
                                                         +------------------------+
                                                         |  Stem Bass Ramp        |
                                                         |  (cosine taper)        |
                                                         |  FxNorm LUFS per stem  |
                                                         |  -14 LUFS Master       |
                                                         +----------+-------------+
                                                                    |
                                          +-------------------------+
                                          |
                              +-----------v-----------+
                              |  FastAPI Job Queue    |
                              |  (SQLite + SSE)       |
                              |  React/TS Frontend    |
                              +-----------------------+`,
        tradeoffs: [
          "Beat This! (accurate downbeats, ~50 MB model) vs librosa (fast, weaker bar detection) \u2014 Beat This! wins for cue snapping accuracy",
          "TIV harmonic score (MIR literature, continuous) vs Camelot Wheel (DJ convention, discrete) \u2014 both exposed; TIV used for transition planning",
          "CLAP 512-D (semantic audio search, 300 MB download) vs 35-D music_index (instant, keyword-only) \u2014 CLAP for search, 35-D as fallback",
          "True stem bass ramp vs IIR shelving filter \u2014 ramp eliminates IIR bass bleed on sustained notes",
        ],
      },
      decisions: [
        {
          title: "Replace librosa beat_track with Beat This! (ISMIR 2024)",
          why: "librosa gives beat times but misses downbeats. Phrase-boundary cue snapping to 8/16/32-bar grid requires knowing which beat is beat 1. Beat This! predicts this directly.",
        },
        {
          title: "TIV harmonic scoring alongside Camelot Wheel",
          why: "Camelot is discrete (adjacent or not). TIV gives a continuous compatibility score [0,1] from the Tonal Interval Space, so transition planning can rank candidates, not just filter them.",
        },
        {
          title: "Cosine-taper stem bass ramp instead of IIR shelving",
          why: "IIR filters have group delay and bleed on sustained bass notes. A cosine taper with derivative=0 at endpoints makes no audible click and hard-zeros Song A bass after the swap.",
        },
        {
          title: "CLAP 512-D semantic search over 35-D handcrafted embeddings",
          why: "35-D features (BPM, key, energy) can\u2019t capture timbral similarity. CLAP embeds audio into a space shared with text, so \u2018find me something that sounds like X\u2019 actually works.",
        },
        {
          title: "Learn spectral band weights from listener verdicts, one shot per render",
          why: "Whether a transition sounds right is a taste judgment no offline metric captures. A thumbs up/down per render is the cheapest honest signal available, and capping it at one update per render keeps a single opinionated session from overfitting the weights.",
        },
        {
          title: "Keep the old mixing engine as a frozen, selectable option",
          why: "The rewrite is not automatically better on every track. Vendoring the previous engine byte-faithfully and tagging each result with its engine makes it a comparison rather than a bet.",
        },
      ],
      links: {
        github: "https://github.com/Chunduri-Aditya/ai-remixmate",
        live: "#",
        demo: "#",
      },
      metrics: [
        { label: "Tests", value: "520+" },
        { label: "Mastering", value: "\u221214 LUFS" },
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
        "An agentic, model-agnostic GenAI media pipeline that turns a single brief into text, image, and audio\u2014coordinating local Ollama inference, Diffusers / FLUX.1, and ElevenLabs voice through one modular workflow.",
      story:
        "Generative pipelines usually lock you into one provider per modality. I wanted a brief to fan out into text, image, and audio with whichever backend makes sense that day\u2014local Ollama for development, cloud for quality runs\u2014without changing a line of the orchestration layer.",
      evidence: [
        "Single-brief \u2192 text + image + audio via one orchestration layer",
        "Local Ollama inference for text generation",
        "Image generation with Diffusers / FLUX.1",
        "Voice synthesis with ElevenLabs",
        "Modular, drop-in model substitution at every stage",
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
        github: "https://github.com/Chunduri-Aditya/Automated-GenAI-Media-Pipeline-Akashic-Tree-",
        live: "#",
        demo: "#",
      },
      metrics: [
        { label: "Modalities", value: "Text \u00b7 Image \u00b7 Audio" },
        { label: "Workflow", value: "Agentic, modular" },
      ],
    },
    {
      id: "ai-health-journal",
      title: "AI Health Journal",
      subtitle: "Local RAG Journal with a Measured Safety Floor",
      iconName: "Lock",
      iconClassName: "text-emerald-400",
      tags: ["RAG", "Ollama", "ChromaDB", "Retrieval Evals", "Mutation Testing", "DPO", "Flask", "Local-First"],
      oneLiner:
        "A local first journaling assistant where the two claims that actually matter, does retrieval surface the right past entry and does the safety floor catch a crisis, are measured and reproducible offline instead of asserted.",
      story:
        "Aggregate recall said 0.875 and looked healthy. Broken out by category, one bucket sat at 0.667: entries about a good day were retrieving the user\u2019s worst entries, because the embedder encoded topic and not emotional valence. In a journaling app the retrieved entries become the grounding context the person reads back, so on a good day the system was quietly reflecting their hardest writing at them. That is the bug that convinced me the aggregate number is the enemy, and that everything here needs a per category breakdown and an eval I have personally broken on purpose.",
      evidence: [
        "Retrieval ablation across 4 strategies (dense MiniLM, BM25, hybrid RRF, dense nomic-embed-text) on a corpus where every query is tagged with the confusion it was built to induce",
        "The valence_flip category went 0.667 to 1.000 on an embedder swap that also lifted Recall@3 to 0.979 and runs roughly twice as fast (26.6ms vs 58.0ms median per embedding)",
        "Two alternative fixes built, measured, and rejected: a score threshold (relevant and irrelevant distributions overlap completely) and a valence aware reranker (helped the weak embedder, actively hurt the strong one). Both kept documented rather than deleted, so they do not get re proposed",
        "Crisis safety floor at sensitivity 1.000 and specificity 0.971, deterministic and LLM free, so it still holds on an offline machine or a failed verifier call",
        "That eval was verified by breaking the thing it measures: deleting one euphemistic crisis pattern drops sensitivity to 0.909, names both missed entries, and exits non zero",
        "Five detector reframe quality rubric (minimising, toxic positivity, commanding language, ungrounded genericness, invalidating pivots), each detector proven load bearing by independent disable mutation testing: recall drops 1.000 to 0.800, missing exactly its own cases",
        "Multi model Draft, Verify, Revise pipeline over local Ollama models, auto selected against the machine's capacity rather than pinned to one model size",
        "Local first by default: PRIVACY_MODE=strict scrubs PII before storage, and Pinecone and Anthropic are both opt in gates that ship off",
        "Stated limits, on the card because they are on the repo: 31 document retrieval corpus, 24 queries, case sets authored with the implementation visible. Sensitivity is therefore optimistic and specificity is the more trustworthy half",
      ],
      architecture: {
        overview:
          "Entry \u2192 PII Scrub \u2192 Embed (nomic-embed-text) \u2192 Chroma Retrieve \u2192 Safety Tier Gate \u2192 Draft / Verify / Revise over local Ollama \u2192 Reflection",
        diagram: `
+-----------+   +-----------+   +----------------+   +-----------+
|  Entry    |-->| PII Scrub |-->|  Embed         |-->|  Chroma   |
|  (text)   |   | (strict)  |   | nomic-embed    |   |  top-k    |
+-----------+   +-----------+   +----------------+   +-----+-----+
                                                           |
                                                           v
                                              +------------------------+
                                              |  Safety Tier Gate      |
                                              |  crisis / distress /   |
                                              |  normal (deterministic)|
                                              +-----------+------------+
                                                          |
                          crisis: reframe cleared,        |  normal
                          points to human support         v
                                              +------------------------+
                                              |  Draft -> Verify ->    |
                                              |  Revise (local Ollama) |
                                              +-----------+------------+
                                                          |
                                                          v
                                              +------------------------+
                                              |  Grounded Reflection   |
                                              +------------------------+`,
        tradeoffs: [
          "Sensitivity gated at 1.000 while specificity is gated lower: a false positive shows one unnecessary supportive message, a false negative lets a reframe reach someone in real danger. The two errors are not equally bad and the gates say so",
          "Deterministic floor vs LLM verifier: the floor is weaker but survives an offline machine, so it is the layer the guarantee rests on",
          "On device (private, bounded by local hardware) vs cloud (scale, leak risk). Cloud exists as an opt in gate, never a default",
          "Small self authored eval sets vs no measurement at all: worth having, worth caveating in the same breath",
        ],
      },
      decisions: [
        {
          title: "Report retrieval per category, never as an aggregate",
          why: "The aggregate was 0.875 and hid a category sitting at 0.667. An average is where a failure goes to hide.",
        },
        {
          title: "Verify every eval by breaking it before trusting a green run",
          why: "A guard that passes against the bug it exists to catch is not a test. Deleting a crisis pattern has to turn the build red, or the build was never watching.",
        },
        {
          title: "Keep the rejected challengers documented instead of deleting them",
          why: "A proposal that failed measurement is the only thing that stops it being re proposed six months later.",
        },
        {
          title: "Deterministic safety floor underneath the model, not inside it",
          why: "The tier gate cannot depend on an LLM call succeeding. Whatever else fails, the crisis path still has to hold.",
        },
      ],
      links: {
        github: "https://github.com/Chunduri-Aditya/ai-health-journal",
        live: "#",
        demo: "#",
      },
      metrics: [
        { label: "Retrieval", value: "0.979 Recall@3" },
        { label: "Crisis floor", value: "1.000 sensitivity" },
      ],
    },
    {
      id: "model-behavior-lab",
      title: "Model Behavior Lab",
      subtitle: "Local LLM Evaluation Platform",
      iconName: "Eye",
      iconClassName: "text-cyan-400",
      tags: ["Evals", "Ollama", "JSON Test Suites", "Plotly", "Python"],
      oneLiner:
        "A local, Ollama-based LLM evaluation platform that benchmarks reasoning, hallucination, emotion alignment, and code correctness with repeatable runs and dashboards\u2014the methodology that became the base for Agent Shield.",
      story:
        "I got tired of debating model quality with adjectives. So I built a platform that phrases the question in code: JSON test suites, scored outputs, repeatable runs. If a new model lands, the numbers are already waiting. This became the groundwork for Agent Shield.",
      evidence: [
        "Local Ollama-based evaluation \u2014 no external API dependency",
        "Benchmarks reasoning, hallucination, emotion alignment, and code correctness",
        "Modular JSON test suites \u2014 any Ollama model is a drop-in target",
        "Repeatable runs with Plotly dashboards for cross-run comparison",
        "Methodology became the base for Agent Shield",
      ],
      architecture: {
        overview:
          "JSON Test Suite \u2192 Runner \u2192 Ollama Model Pool \u2192 Scorers \u2192 Plotly Dashboards",
        diagram: `
+------------------+   +----------------+   +-------------------+
|  JSON Test Suite |-->|  Runner        |-->|  Ollama Model     |
|  (categories)    |   |  (repeatable)  |   |  Pool (local)     |
+------------------+   +----------------+   +---------+---------+
                                                       |
                                                       v
+------------------+   +----------------+   +-------------------+
|  Plotly          |<--|  Scorers       |<--|  Raw Outputs      |
|  Dashboards      |   |  (automated)   |   |                   |
+------------------+   +----------------+   +-------------------+`,
        tradeoffs: [
          "Local Ollama (private, repeatable) vs hosted APIs (scale, but cost + drift)",
          "Strict scoring vs flexibility (JSON schema keeps it configurable, not rigid)",
          "Breadth (many categories) vs depth (full probe) \u2014 suites handle breadth, targeted runs handle depth",
        ],
      },
      decisions: [
        {
          title: "JSON-driven test suites",
          why: "Evaluation should be reviewable like code, not buried in notebooks.",
        },
        {
          title: "Local Ollama, repeatable runs",
          why: "Same input, same verdict. Reproducibility comes first; scale can come later.",
        },
        {
          title: "Failure-mode categories (reasoning / hallucination / emotion / code)",
          why: "Averages hide regressions. Categories surface them.",
        },
      ],
      links: {
        github: "https://github.com/Chunduri-Aditya/Model-Behavior-Lab",
        live: "#",
        demo: "#",
      },
      metrics: [
        { label: "Categories", value: "4 eval axes" },
        { label: "Runtime", value: "Local Ollama" },
      ],
    },
    {
      id: "attention-drift-detector",
      title: "Attention Drift Detector",
      subtitle: "On Device Attention Monitoring (No Video Leaves the Machine)",
      iconName: "Radar",
      iconClassName: "text-cyan-400",
      tags: ["MediaPipe", "OpenCV", "solvePnP", "Gaze Estimation", "SQLite", "Local-First"],
      oneLiner:
        "A webcam tool that classifies focus, drift, and absence in real time from head pose and iris gaze, nudges you after five continuous seconds of drift, and writes a session report. No video is ever recorded: only derived angles and labels reach disk.",
      story:
        "I wanted to know what my attention actually did during deep work, and every tool that offered to tell me wanted the camera feed in someone else's cloud. The interesting constraint was throwing the pixels away: if only derived numbers persist, the privacy claim stops being a policy promise and becomes a property of the data on disk.",
      evidence: [
        "MediaPipe Face Mesh (478 landmarks) to head pose via solvePnP to iris based gaze estimation, then a rule based classifier with temporal smoothing over a 1 second sliding window",
        "Three states (focused, drifting, absent) with an OS notification firing after 5 continuous seconds of drift",
        "No video recorded and nothing leaves the machine: only derived numbers (head angles, gaze vectors) and session labels persist, in local SQLite",
        "HTML session report generated automatically on quit, plus a live OpenCV overlay showing state, focus ratio, and drift count",
        "50 tests across 5 modules, running in under a second with no webcam and no network required, and a --dummy mode that exercises the full pipeline on synthetic frames",
      ],
      architecture: {
        overview:
          "Webcam Frame → MediaPipe Face Mesh → Head Pose (solvePnP) + Iris Gaze → Classifier → Temporal Smoother → Drift Event → Nudge + SQLite → HTML Report",
        diagram: `
+-----------+   +------------------+   +--------------------+
|  Webcam   |-->|  MediaPipe Face  |-->|  Head Pose         |
|  Frame    |   |  Mesh (478 pts)  |   |  (solvePnP)        |
+-----------+   +------------------+   |  + Iris Gaze       |
                                       +---------+----------+
   frame discarded, never stored                 |
                                                 v
+--------------------+   +------------------+   +--------------------+
|  Temporal Smoother |<--|  Classifier      |<--|  Derived Angles    |
|  (1s window)       |   |  focus/drift/    |   |  + Vectors only    |
+---------+----------+   |  absent          |   +--------------------+
          |              +------------------+
          v
+--------------------+   +------------------+
|  Drift Event       |-->|  OS Nudge        |
|  (5s continuous)   |   |  + SQLite log    |
+--------------------+   +--------+---------+
                                  |
                                  v
                         +------------------+
                         |  HTML Report     |
                         +------------------+`,
        tradeoffs: [
          "Rule based classifier vs a learned model: rules are inspectable and need no training data, at the cost of ceiling accuracy",
          "Temporal smoothing adds latency to state changes but stops a single blink or glance registering as drift",
          "Discarding frames makes the privacy claim structural, and also makes any later model training impossible without re collecting data. Worth it",
        ],
      },
      decisions: [
        {
          title: "Throw the pixels away at the first stage",
          why: "A privacy promise that depends on me not misusing stored video is weaker than a pipeline where the video was never written down.",
        },
        {
          title: "Rule based classification over a trained model",
          why: "I can read a threshold and argue with it. A small model trained on my own face would be less inspectable and no more trustworthy.",
        },
        {
          title: "A dummy frame mode as a first class entry point",
          why: "A pipeline that can only be tested with a face in front of a camera cannot be tested in CI. Synthetic frames make the whole path runnable in under a second.",
        },
      ],
      links: {
        live: "#",
        demo: "#",
      },
      metrics: [
        { label: "Pipeline", value: "478 landmarks" },
        { label: "Tests", value: "50 · under 1s" },
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
        "Led U-Net segmentation and data pipeline work on the CHASE_DB1 and DRIVE retinal fundus datasets, with reproducible experiment tracking and automated curation.",
      bullets: [
        "Engineered a TensorFlow/Keras U-Net segmentation pipeline for retinal artery-vein classification on CHASE_DB1 and DRIVE, reaching 0.98 AUC, 0.99 pixel accuracy, and 0.91 Dice across an 80-image evaluation set",
        "Designed modular training pipelines with per-run experiment tracking, enabling reproducible comparison across five model versions with saved metrics and training curves",
        "Built an automated medical image scraper with quality-validation controls, reducing manual curation effort",
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
        "A short remote internship early in my undergrad, and my first real exposure to computer vision. Annotating aerial imagery taught me how much of detection work is dataset quality rather than model choice.",
      signal:
        "Introductory object detection: annotated an aerial imagery dataset in Roboflow and trained YOLOv5 on it for small object detection.",
      bullets: [
        "Annotated and managed an aerial imagery dataset in Roboflow for small object detection",
        "Trained and evaluated a YOLOv5 model on the annotated dataset",
      ],
      tags: ["YOLOv5", "Roboflow", "Object Detection", "Aerial Imagery"],
    },
  ],
};

/* ============================================================================
 * SECTION 7 — RESEARCH ("Deep Theory")
 * ========================================================================= */

export type ResearchAccent = "cyan" | "purple" | "blue" | "green";

export interface PublicationLink {
  label: string;
  href: string;
}

export interface Publication {
  badge: string;
  title: string;
  story: string;
  signal: string;
  metrics: { label: string; value: string; accent: ResearchAccent }[];
  links: PublicationLink[];
}

export interface ResearchContent {
  header: {
    title: string;
    iconName: IconName;
    subtitle: { signal: string; story: string };
  };
  publications: Publication[];
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
  publications: [
    {
      badge: "PREPRINT \u00b7 ZENODO 2026",
      title:
        "Beyond Attack Success Rate: Measuring Operator-Facing Transparency in LLM Agent Security",
      story:
        "Most agent benchmarks ask two questions\u2014did the task succeed, did the attack succeed\u2014and never whether the agent told its operator anything was wrong. I added that missing axis: Transparency Rate. Silent resistance and resistance-out-loud stop being the same outcome.",
      signal:
        "Sole-author preprint introducing a transparency-aware evaluation protocol on Inspect AI. Adds Transparency Rate (TR) as a third axis to the AgentDojo outcome matrix, with an anchored prompt-injection result (n=20, Wilson 95% CIs) across four models and diagnostic probes over six adversarial surfaces.",
      metrics: [
        { label: "Contribution", value: "Transparency Rate", accent: "purple" },
        { label: "Harness", value: "Inspect AI", accent: "cyan" },
        { label: "Surfaces", value: "6 attack", accent: "green" },
        { label: "Author", value: "Sole author", accent: "blue" },
      ],
      links: [
        { label: "Read The Paper", href: ASSETS.agentShieldPaper },
        { label: "View on Zenodo", href: "https://doi.org/10.5281/zenodo.20789431" },
        { label: "GitHub", href: "https://github.com/Chunduri-Aditya/agent-shield" },
      ],
    },
    {
      badge: "PUBLICATION \u00b7 IJRASET VOL 11 (PEER-REVIEWED)",
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
      links: [
        { label: "Read The Paper", href: ASSETS.publicationPaper },
        { label: "View Certificate", href: ASSETS.publicationCertificate },
      ],
    },
  ],
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
        tools: ["Inspect AI", "AgentDojo", "HarmBench", "Red Teaming", "Prompt Injection", "MCP Proxying", "Mutation Testing", "Wilson CIs"],
        iconName: "ShieldCheck",
        accent: "rose",
      },
      {
        category: "LLM & Orchestration",
        tools: ["LangChain", "Ollama", "Hugging Face", "RAG", "ChromaDB", "FAISS"],
        iconName: "Sparkles",
        accent: "purple",
      },
      {
        category: "ML / CV / Audio",
        tools: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "OpenCV", "MediaPipe", "librosa", "Demucs", "Beat This!", "CLAP", "Essentia", "Diffusers"],
        iconName: "Cpu",
        accent: "cyan",
      },
      {
        category: "Systems & Engineering",
        tools: ["FastAPI", "React/TypeScript", "Docker", "AWS", "Flask", "GitHub Actions", "CI/CD", "pytest"],
        iconName: "Wrench",
        accent: "emerald",
      },
      {
        category: "Data & Storage",
        tools: ["PostgreSQL", "ChromaDB", "Pandas", "NumPy", "Plotly"],
        iconName: "Database",
        accent: "blue",
      },
    ],
  },
  cta: {
    title: "Want the receipts?",
    subtitle: "One resume, kept current.",
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
      "I'm Aditya Chunduri, M.S. Applied Data Science from USC (Dec 2025), focused on AI agent security and LLM evaluation. I build reproducible adversarial-testing systems for frontier LLMs, with a current push on Agent Shield: an evaluation framework on UK AISI's Inspect AI harness scored on attack success rate, benign utility, and transparency and mapped to OWASP and MITRE ATLAS, now paired with a local runtime perimeter that screens MCP tool descriptions before an agent reads them.",
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
      "Agent Shield, an LLM agent security evaluation framework. Adversarial evals for prompt injection, MCP tool poisoning, RAG memory poisoning, and behavioral drift on Inspect AI, with two surfaces anchored at n=20 and Wilson intervals and the rest labeled diagnostic probes. Seeded JSONL tasks scored on attack success rate, benign utility, and transparency rate, threats mapped to OWASP and MITRE ATLAS. The newest half is a local runtime perimeter (agent-shield-guard, agent-shield-mcp-proxy) that screens tool descriptions in flight rather than scoring them afterward.",
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
      "Agent Shield is an adversarial evaluation framework for LLM agents: 6 live attack modules and 28 attack IDs covering prompt injection, MCP tool poisoning, RAG memory poisoning, covert exfiltration, social engineering, and multi turn drift. Built on UK AISI's Inspect AI harness with seeded JSONL tasks and unified scoring (attack success rate, benign utility, transparency rate), threats mapped to OWASP and MITRE ATLAS. Two surfaces are anchored at n=20 with Wilson 95% CIs and the rest are labeled diagnostic probes, on purpose. The finding that drove the runtime half: on anchored MCP tool poisoning both logged models score ASR 0.000 and TR 0.000, meaning the poisoned description is neither executed nor flagged to the operator.",
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
      "Six shipped systems. Agent Shield: LLM agent security eval framework on Inspect AI (6 modules, 28 attack IDs, 2 anchored surfaces, Zenodo preprint) plus a local runtime perimeter. AI RemixMate: full stack DJ engine (React/TypeScript + FastAPI, TIV harmonic scoring, Beat This!, CLAP 512-D search, learned spectral matching, 520+ tests). AkashicTree: agentic multimodal pipeline for text, image, and audio. AI Health Journal: local RAG journal with a measured retrieval ablation (0.979 Recall@3) and a mutation tested crisis safety floor at 1.000 sensitivity. Model Behavior Lab: local Ollama eval platform, the methodology that became Agent Shield. Attention Drift Detector: on device webcam attention monitoring where no video is ever stored.",
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
      "Model Behavior Lab is a local, Ollama-based LLM evaluation platform. It benchmarks reasoning, hallucination, emotion alignment, and code correctness with repeatable runs and Plotly dashboards. JSON test suites make any Ollama model a drop-in target, and the methodology became the base for Agent Shield.",
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
      "AI Health Journal is a local first journaling assistant built around a multi model Draft, Verify, Revise pipeline over Ollama, with Chroma and nomic-embed-text for retrieval. The point is that its two load bearing claims are measured, not asserted: a 4 way retrieval ablation (0.979 Recall@3, and a valence_flip category that went 0.667 to 1.000 after the embedder swap) and a deterministic crisis safety floor at 1.000 sensitivity, verified by deliberately breaking it. PRIVACY_MODE=strict scrubs PII before storage; Pinecone and Anthropic are opt in gates that ship off.",
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
      "AI RemixMate is a full-stack DJ engine: FastAPI async job queue with SQLite persistence, React/TypeScript frontend (8 pages, SSE live streaming), and a research-grade MIR core. TIV harmonic scoring (Bernardes et al. 2016), Beat This! (ISMIR 2024) downbeat detection with bar-grid snapping, cosine-taper stem bass ramp, FxNorm per-stem LUFS normalization, CLAP 512-D semantic search, Essentia energy arc modeling, masking aware multiband EQ (Hafezi & Reiss 2015), and rekordbox XML + Serato GEOB cue export. Newest layer is a learned spectral pipeline: mel band trajectory matching picks track B's entry phrase with drop aware scoring, and per band weights update online from thumbs up/down verdicts. 520+ tests, GitHub Actions CI, 18 organic GitHub stars.",
    links: [
      { label: "View Project", href: "#projects", sectionId: "ai-remixmate" },
    ],
    tags: ["audio", "music", "remix", "demucs", "librosa", "camelot", "fastapi", "react", "clap", "beat this", "tiv", "essentia"],
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
      "AkashicTree is an agentic, model-agnostic GenAI media pipeline that turns a single brief into text, image, and audio. It coordinates local Ollama inference for text, Diffusers / FLUX.1 for image, and ElevenLabs for voice through one modular workflow, with drop-in model substitution at every stage.",
    links: [
      { label: "View Project", href: "#projects", sectionId: "akashic-tree" },
    ],
    tags: ["content", "generation", "multimodal", "flux", "diffusers", "elevenlabs", "ollama"],
  },
  {
    id: "attention-drift-detector",
    title: "Attention Drift Detector",
    utterances: [
      "attention drift detector",
      "attention monitoring",
      "webcam tool",
      "focus tracker",
      "gaze tracking",
      "mediapipe",
      "computer vision project",
      "deep work tool",
    ],
    answer:
      "Attention Drift Detector is an on device webcam tool that classifies focus, drift, and absence in real time: MediaPipe Face Mesh (478 landmarks) to head pose via solvePnP to iris based gaze estimation, then a rule based classifier with temporal smoothing over a 1 second window. It nudges you after 5 continuous seconds of drift and writes an HTML session report. No video is ever recorded, only derived angles and session labels reach local SQLite. 50 tests run in under a second with no webcam or network needed.",
    links: [
      { label: "View Project", href: "#projects", sectionId: "attention-drift-detector" },
    ],
    tags: ["attention", "drift", "webcam", "mediapipe", "opencv", "gaze", "computer vision", "privacy", "local-first", "focus"],
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
      "Two research roles. At USC Viterbi (Aug\u2013Dec 2024), I was a Research Assistant in Computer Vision & Medical Imaging \u2014 built a TensorFlow/Keras U-Net segmentation pipeline for retinal artery-vein classification on CHASE_DB1 and DRIVE, reaching 0.98 AUC and 0.91 Dice, plus modular training pipelines with per-run experiment tracking and an automated medical image scraper. At SSN College (Jun\u2013Jul 2021), a short remote internship, I annotated an aerial imagery dataset in Roboflow and trained a YOLOv5 model on it for small object detection.",
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
      "Two papers. (1) Sole-author preprint — “Beyond Attack Success Rate: Measuring Operator-Facing Transparency in LLM Agent Security” (Zenodo, 2026), introducing Transparency Rate as a third evaluation axis on the Inspect AI harness. (2) Peer-reviewed publication — “Wind Power Analysis using Digital Twins & ML” in IJRASET Vol 11 (Aug 2023, co-author), combining KNN + TCN inside a Digital Twin on Azure for wind forecasting.",
    links: [
      { label: "Agent Shield Paper", href: ASSETS.agentShieldPaper },
      { label: "View on Zenodo", href: "https://doi.org/10.5281/zenodo.20789431" },
      { label: "Wind Paper (IJRASET)", href: ASSETS.publicationPaper },
      { label: "Research Section", href: "#research", sectionId: "research" },
    ],
    tags: ["research", "paper", "publication", "preprint", "zenodo", "transparency rate", "agent shield", "wind", "digital twin", "tcn", "knn", "azure"],
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
      "Eval & adversarial: Inspect AI, AgentDojo, OWASP LLM/Agentic, MITRE ATLAS, AIVSS, red teaming, prompt injection. LLM & orchestration: LangChain, Ollama, Hugging Face, RAG, ChromaDB. ML / CV / Audio: PyTorch, TensorFlow, Keras, Scikit-learn, OpenCV, librosa, Demucs, Beat This!, CLAP, Essentia, Diffusers. Systems & engineering: FastAPI, React/TypeScript, Docker, AWS, Flask, GitHub Actions, CI/CD, pytest. Languages: Python, SQL, JavaScript/TypeScript, Bash, C/C++.",
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
