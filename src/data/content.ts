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
  /** Role framing in the hero eyebrow. */
  roleLabel: string;
  /** Availability. The single most perishable string on the site, so it lives here. */
  availability: string;
  headline: { signal: string; story: string };
  subhead: string;
  intro: { signal: string; story: string };
  /** "Plain" depth tier — jargon-free headline + intro, tone-neutral. */
  plain: { headline: string; intro: string };
  chips: { signal: Chip[]; story: Chip[] };
  ctas: {
    primary: { label: string; iconName: IconName; targetSection: string };
    secondary: { label: string; iconName: IconName; targetSection: string };
    resume: { label: string; iconName: IconName; href: string };
  };
}

export const HERO: HeroContent = {
  roleLabel: "ML / AI engineer",
  availability: "open to work",
  headline: {
    signal: "I ship ML systems, then measure whether they actually work.",
    story: "I like the messy middle: a hard problem, a metric, and a system that has to earn the number.",
  },
  subhead:
    "M.S. Applied Data Science, USC \u00b7 Evaluation \u00b7 Audio ML \u00b7 Generative AI \u00b7 Computer Vision \u00b7 Full-stack",
  intro: {
    signal:
      "I build ML systems end to end and measure whether they hold up: adversarial evaluation for LLM agents, a full stack DJ engine with a research grade audio core, a model agnostic media pipeline, on device computer vision, an AutoML benchmark. Different domains, one habit: seeded runs, real metrics, a result you can reproduce. Current focus is Agent Shield, an evaluation framework for agent security on UK AISI's Inspect AI harness.",
    story:
      "The thread across everything I build is the same. Take a domain I do not fully understand yet, find the metric that actually matters, and build a system that has to earn it. That has looked like DJ transitions, retinal masks, generative pipelines, focus tracking, and AutoML search, and right now it looks like agent security. The tools change. The habit does not.",
  },
  plain: {
    headline: "I build software that uses machine learning, across a lot of different areas, and I check that it works.",
    intro:
      "My projects run across audio, images, language, computer vision, and web apps. The common thread is that each one is measured, not just built: a real number that says whether it works, and a setup where you can run it again and get the same answer. Right now I am focused on testing AI agents for security holes.",
  },
  chips: {
    signal: [
      { iconName: "Boxes", text: "End to end ML systems" },
      { iconName: "Gauge", text: "Real metrics, seeded runs" },
      { iconName: "Wrench", text: "Full-stack: React + FastAPI" },
      { iconName: "Sparkles", text: "Research grade cores" },
      { iconName: "CheckCircle2", text: "Reproducible by default" },
    ],
    story: [
      { iconName: "Boxes", text: "Systems over scripts" },
      { iconName: "Radar", text: "Curiosity as method" },
      { iconName: "Gauge", text: "Measure before you claim" },
      { iconName: "Rocket", text: "Reproducible by default" },
      { iconName: "Brain", text: "Attention trained daily" },
    ],
  },
  ctas: {
    primary: { label: "Inspect The Work", iconName: "Terminal", targetSection: "projects" },
    secondary: { label: "How I Think", iconName: "ScrollText", targetSection: "thinking" },
    resume: { label: "Resume", iconName: "FileText", href: ASSETS.resumePdf },
  },
};

/* ── HUD telemetry readout (Hero operator panel). Real, verifiable counts only. ── */
export interface HudStat {
  label: string;
  value: string;
}

/**
 * HUD_STATS is defined after PROJECTS, near the end of the projects section,
 * because two of its values are derived from that array rather than hand
 * maintained. See the comment on the export itself.
 */

/* ============================================================================
 * SECTION 2 — TICKER THOUGHTS  (rotates in the navbar pill)
 * ========================================================================= */

export const TICKER_THOUGHTS: string[] = [
  "Finding the smallest change that fixes the whole system...",
  "Matching two songs on the exact bar where the beat lands...",
  "Chasing edge cases (that's where truth hides)...",
  "Throwing the camera pixels away, keeping only the numbers...",
  "Reading a benchmark that says my own idea did not help...",
  "Shipping only when the behavior is stable...",
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
        signal: "Sketch an approach with the tradeoffs, risks, and interfaces named up front.",
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
          "I add gauges: tests, logs, metrics, anything that turns 'maybe' into 'we know'.",
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
        signal: "Build the measurement once, and every new case after that is just another row in the table.",
        story: "I hunt the one lever that fixes five things at once.",
      },
    },
    {
      title: "Stable behavior over heroics",
      iconName: "XCircle",
      iconClassName: "text-slate-200",
      text: {
        signal:
          "Regressions caught by instrumentation, not by vibes or a late night in the debugger.",
        story: "I don't chase perfection. I chase stable behavior.",
      },
    },
  ],
  humanPart: {
    label: "The human part",
    text: {
      signal:
        "Wide angle attention and laser focus, running at the same time. Structure, meaning lists, tests, logs, and decision trails, keeps both aimed at signal instead of noise.",
      story:
        "My attention runs wide angle and laser at once. Structure is how I keep it useful: lists, tests, logs, and clean interfaces, so intensity turns into progress instead of noise.",
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
  /**
   * Repo name for work that stays private. Renders a "Request access" mailto
   * instead of a GitHub link, so a private repo never shows a URL that 404s.
   * Mutually exclusive with `github`.
   */
  requestAccess?: string;
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

export type ProjectStatus = "SHIPPED" | "PREPRINT" | "COURSEWORK";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  iconName: IconName;
  iconClassName?: string;
  tags: string[];
  /** HUD class label, e.g. "AI-SAFETY / EVAL". Uppercase, terse. */
  discipline: string;
  status: ProjectStatus;
  /** Tier 1 — always visible on the card. One punchy "normal person" line, <= ~14 words. */
  hook: string;
  /** Tier 2 — "Plain" / ELI5. 2-3 sentences, zero jargon. Tone-neutral (not signal/story). */
  plain: string;
  /** Tier 3 — "Technical", crisp variant. */
  oneLiner: string;
  /** Tier 3 — "Technical", narrative variant. */
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
  searchPlaceholder: "Search (RAG, evals, homography, demucs, privacy...)",
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
      discipline: "AI-SAFETY / EVAL",
      status: "SHIPPED",
      hook:
        "I break AI agents on purpose so they fail in my lab, not in production.",
      plain:
        "Companies are wiring AI assistants into real tools faster than anyone can check whether they are safe. Agent Shield is the test rig that attacks these assistants the way a bad actor would, with hidden instructions, poisoned tools, and slow manipulation, then scores how often they fall for it, whether they warn their owner, and whether they still do their normal job. It also ships a small local filter that screens sketchy tool descriptions before the AI ever reads them.",
      oneLiner:
        "Agent Shield stress tests LLM agents across prompt injection, MCP tool poisoning, RAG memory poisoning, and behavioral drift. It runs on UK AISI's Inspect AI harness, maps every threat to OWASP and MITRE ATLAS, and now carries a second claim surface: a local runtime perimeter that screens MCP tool descriptions in flight.",
      story:
        "Agents get deployed faster than they get measured. So I built a reproducible attack surface first: one harness, one scoring schema, seeded tasks, so failures show up as scored diffs, not vibes. The results made the second half obvious. If no model flags a poisoned tool description, scoring that after the fact is not enough, so the same repo now ships a local perimeter that screens tool descriptions before the agent ever reads them.",
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
      discipline: "AUDIO-ML",
      status: "SHIPPED",
      hook:
        "A DJ engine that mixes two songs into one clean transition, with 904 tests proving it.",
      plain:
        "Blending two tracks so the switch sounds seamless is real engineering. You have to match the key, the tempo, and the exact bar where the beat lands, then fade the bass out without a thud. This is a full app that does all of it automatically: pick two songs, get a mixed track, backed by a research grade audio core and a web interface that streams job progress live.",
      oneLiner:
        "AI RemixMate is a full stack DJ engine: a React/TypeScript frontend with SSE live streaming, a FastAPI async job queue, and a research grade MIR core (TIV harmonic scoring, Beat This! downbeat detection, CLAP 512-D semantic search), with 904 tests and mastering to -14 LUFS.",
      story:
        "A clean transition is hidden engineering. I started with Demucs stems and Camelot Wheel matching, then kept pulling the thread: librosa beat detection out, Beat This! (ISMIR 2024) in for proper downbeats; IIR bass shelving out, a true cosine taper stem ramp in; TIV harmonic scoring from the MIR literature added; CLAP 512-D semantic search added so DJs can find tracks by sound and not just by name. Then I wrapped it in a React frontend with live SSE job streaming so it behaves like a product.",
      evidence: [
        "FastAPI async job queue (SQLite write-through persistence) + React/TypeScript frontend, 10 pages, SSE live job streaming, Zustand state management",
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
        "904 tests across unit, behavioral, and integration suites; GitHub Actions CI",
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
        requestAccess: "ai-remixmate",
      },
      metrics: [
        { label: "Tests", value: "904" },
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
      discipline: "GENAI / PIPELINE",
      status: "SHIPPED",
      hook:
        "One short brief in; a matching script, image, and voiceover out. Swap any model, no rewrites.",
      plain:
        "Most tools that generate media lock you into one company's model for text, another for images, another for voice. This pipeline takes a single prompt and produces all three, and it lets you swap the underlying model at any stage, cheap local models while you experiment and better cloud ones for the final run, without touching the rest of the code.",
      oneLiner:
        "AkashicTree is an agentic, model agnostic GenAI media pipeline that turns a single brief into text, image, and audio, coordinating local Ollama inference, Diffusers / FLUX.1, and ElevenLabs voice through one modular workflow.",
      story:
        "Generative pipelines usually lock you into one provider per modality. I wanted a brief to fan out into text, image, and audio with whichever backend makes sense that day, local Ollama for development and cloud for quality runs, without changing a line of the orchestration layer.",
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
        requestAccess: "AkashicTree",
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
      discipline: "RAG / SAFETY",
      status: "SHIPPED",
      hook:
        "A private journaling AI where the two claims that matter, recall and crisis safety, are measured, not promised.",
      plain:
        "A journaling assistant that runs entirely on your own computer, so nothing you write ever leaves the machine. The point is honesty about its own quality. It measures whether it actually pulls up the right past entry, because an average score was hiding one category that had quietly failed, and it has a plain deterministic safety check for crisis language that was tested by deliberately breaking it.",
      oneLiner:
        "AI Health Journal is a local first journaling assistant whose two load bearing claims, does retrieval surface the right past entry and does the safety floor catch a crisis, are measured and reproducible offline rather than asserted.",
      story:
        "Aggregate recall said 0.875 and looked healthy. Broken out by category, one bucket sat at 0.667: entries about a good day were pulling back the user's worst entries, because the embedder encoded topic and not emotional valence. In a journaling app the retrieved entries become the grounding context the person reads back, so on a good day the system was quietly reflecting their hardest writing at them. That bug convinced me the aggregate number is the enemy, and that everything here needs a per category breakdown and an eval I have broken on purpose myself.",
      evidence: [
        "Retrieval ablation across 4 strategies (dense MiniLM, BM25, hybrid RRF, dense nomic-embed-text) on a corpus where every query is tagged with the confusion it was built to induce",
        "The valence_flip category went 0.667 to 1.000 on an embedder swap that also lifted full corpus Recall@3 to 0.968 and runs roughly twice as fast (26.6ms vs 58.0ms median per embedding)",
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
        github: "https://github.com/Chunduri-Aditya/journal-agent",
      },
      metrics: [
        { label: "Retrieval", value: "0.968 Recall@3" },
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
      discipline: "EVAL / TOOLING",
      status: "SHIPPED",
      hook:
        "Stop arguing about which model is 'better'. Score it with a repeatable test suite instead.",
      plain:
        "A local tool for comparing language models on concrete tasks, reasoning, making things up, emotional tone, and writing correct code, with runs you can repeat and charts to line them up. It is the measurement habit that later grew into Agent Shield.",
      oneLiner:
        "Model Behavior Lab is a local Ollama based evaluation platform that benchmarks reasoning, hallucination, emotion alignment, and code correctness with repeatable runs and dashboards. It is the methodology that became the base for Agent Shield.",
      story:
        "I got tired of debating model quality with adjectives. So I built a platform that phrases the question in code: JSON test suites, scored outputs, repeatable runs. When a new model lands, the numbers are already waiting. This became the groundwork for Agent Shield.",
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
      discipline: "CV / LOCAL-FIRST",
      status: "SHIPPED",
      hook:
        "A webcam focus tracker that never records video. Only the numbers it computes touch the disk.",
      plain:
        "A tool that watches, through your webcam, whether you are focused, drifting, or away during deep work, and nudges you after five seconds of drift. Every tool like this wants your camera feed in someone's cloud. This one throws the pixels away immediately and keeps only derived numbers, so the privacy claim is a property of the data on disk, not a promise.",
      oneLiner:
        "Attention Drift Detector classifies focus, drift, and absence in real time from head pose and iris gaze, nudges you after five continuous seconds of drift, and writes a session report. No video is ever recorded: only derived angles and labels reach disk.",
      story:
        "I wanted to know what my attention actually did during deep work, and every tool that offered to tell me wanted the camera feed in someone else's cloud. The interesting constraint was throwing the pixels away: if only derived numbers persist, the privacy claim stops being a policy promise and becomes a property of the data on disk.",
      evidence: [
        "MediaPipe Face Mesh (478 landmarks) to head pose via solvePnP to iris based gaze estimation, then a rule based classifier with temporal smoothing over a 1 second sliding window",
        "Three states (focused, drifting, absent) with an OS notification firing after 5 continuous seconds of drift",
        "No video recorded and nothing leaves the machine: only derived numbers (head angles, gaze vectors) and session labels persist, in local SQLite",
        "HTML session report generated automatically on quit, plus a live OpenCV overlay showing state, focus ratio, and drift count",
        "52 tests across 5 modules, running in under a second with no webcam and no network required, and a --dummy mode that exercises the full pipeline on synthetic frames",
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
        github: "https://github.com/Chunduri-Aditya/attention-drift-detector",
      },
      metrics: [
        { label: "Pipeline", value: "478 landmarks" },
        { label: "Tests", value: "52 · under 1s" },
      ],
    },
    {
      id: "sourcewarden",
      title: "Sourcewarden",
      subtitle: "Security-Gated n8n Workflow Orchestration",
      iconName: "Layers",
      iconClassName: "text-blue-400",
      tags: ["FastAPI", "RAG", "n8n", "Security", "Ed25519", "Docker", "Python"],
      discipline: "SYSTEMS / SECURITY",
      status: "SHIPPED",
      hook:
        "A chatbot that helps you build n8n workflows, and only exposes what's actually safe to expose.",
      plain:
        "Two projects had grown up side by side: one that searches n8n's docs, one that runs a locked down multi agent build pipeline behind signed approvals. I merged them and put a web layer on top. The disciplined call was scoping that web layer to grounded search and live status only, because wiring a chatbox straight into the build pipeline would mean rebuilding or bypassing its approval controls.",
      oneLiner:
        "Sourcewarden merges a retrieval index and a multi agent orchestration system for building n8n workflows behind a read only FastAPI layer that grounds every chat answer in cited evidence and verifies its own security controls live instead of shelling out to run anything itself.",
      story:
        "Two repos had grown side by side: one doing retrieval over n8n's docs and community examples, the other running a six role agent pipeline behind an Ed25519 signed approval ledger. I merged them into one system, then went to add a web layer. The obvious move was a chatbox that drives the whole pipeline end to end. The correct move was to check what was actually callable first. The orchestration lives entirely in prompt files a human runs through an AI coding agent, gated on purpose so nothing mutates a live workflow without a signed approval. Wiring a chatbox straight into that would mean rebuilding the approval flow in a browser or quietly bypassing it. So I scoped the web layer to what was real and safe to expose: grounded retrieval and live status, not execution.",
      evidence: [
        "2,256-row retrieval index across official n8n docs and community workflow examples, with an explicit evidence precedence: live instance schema, then official docs, then community examples, then untrusted references",
        "Six-role agent orchestration (supervisor, security firewall, skeleton architect, module builder, deviation monitor, eval tuner) gated by an Ed25519-signed run ledger, one-time nonces, and a 15-minute authorization window",
        "Deterministic secret-detection policy blocks any self-improvement feedback containing a PEM key, named credential, or GitHub/OpenAI token pattern, fail closed",
        "FastAPI chat endpoint returns cited evidence for every answer, never a plan without a source",
        "Monitoring dashboard recomputes all security control hashes live against the signed manifest instead of trusting a cached result",
        "20 of 20 tests passing, including a mutation test that flips one byte in a tracked file and confirms the hash check reports a mismatch for that file and a match for the rest",
        "Ships as a single Docker image and degrades to a clear empty state instead of failing when the retrieval index isn't mounted",
      ],
      architecture: {
        overview:
          "Query -> FastAPI /chat -> retriever (router -> vector store -> rerank) over the retrieval index -> cited evidence back to the browser. Separately, /dashboard reads self-improvement run status, eval and tuning artifacts, and the security control hash manifest live, recomputing every hash rather than trusting a cache.",
        diagram: `
                    +-------------------+
                    |      Browser       |
                    +----+----------+---+
                         |          |
                   /chat |          | /dashboard
                         v          v
        +-------------------+   +-----------------------+
        |  Retriever          |   |  Live status reads:    |
        |  router -> store    |   |  self-improvement,     |
        |  -> rerank          |   |  eval/tuning files,    |
        +---------+----------+   |  security hash recompute|
                  |               |  module manifest        |
                  v               +-----------+------------+
        +-------------------+                 |
        | Retrieval index    |                 v
        | (docs + examples)  |       +-----------------------+
        +---------+----------+       |  Rendered, read-only   |
                  |                   |  dashboard              |
                  v                   +-----------------------+
        +-------------------+
        |  Cited evidence     |
        +-------------------+`,
        tradeoffs: [
          "Read only dashboard vs a live agent driver. A driver would demo better, but it either duplicates the approval ledger in the browser or bypasses it, so read only won",
          "Recomputing every security hash on each dashboard load vs trusting a cache. Slower page load, but a cached match can go stale and lie",
          "Single Docker image with no baked in index vs bundling one. Keeps the image small and the index out of version control, at the cost of an empty state chat until it is mounted",
        ],
      },
      decisions: [
        {
          title: "Read-only web layer, not an agent driver",
          why: "The six-role pipeline's whole design point is a human approving every mutation through a signed run ledger. A chatbox that shells out to run it directly would either rebuild that approval flow or bypass it, so the web layer only reads: retrieval and status, never execution.",
        },
        {
          title: "Reimplemented the hash check in Python instead of shelling out",
          why: "The existing hash generator is Node-only, write-capable, and maintainer-only. Giving a read-only backend any path to a write-capable script defeats the point of read-only.",
        },
        {
          title: "Merged the two source repos before building anything on top",
          why: "Two repos evolving in parallel meant two copies of the same evidence-precedence logic. One index, one manifest, one place for a security fix to actually land.",
        },
      ],
      links: {
        github: "https://github.com/Chunduri-Aditya/sourcewarden",
      },
      metrics: [
        { label: "Retrieval Index", value: "2,256 rows" },
        { label: "Security Hashes", value: "Verified live" },
        { label: "Tests", value: "71 passing" },
      ],
    },
    {
      id: "metalearnml",
      title: "MetaLearnML",
      subtitle: "Meta-Learned AutoML Ranking, Measured Against Its Baselines",
      iconName: "Boxes",
      iconClassName: "text-emerald-400",
      tags: [
        "AutoML",
        "scikit-learn",
        "PyTorch",
        "Meta-Learning",
        "Benchmarking",
        "Leakage Control",
        "GitHub Actions CI",
      ],
      discipline: "AUTOML / BENCHMARK",
      status: "SHIPPED",
      hook:
        "I built an AutoML ranker, then the benchmark that proved it does not save time, and I kept that result.",
      plain:
        "AutoML tools promise to reach a good model faster by predicting which candidates are worth trying. I built one, then a careful benchmark over 15 datasets to check the promise. It ranks candidates better than random guessing, but it did not measurably cut the work needed to reach a good model, and the project keeps that negative result written down instead of quietly dropping it.",
      oneLiner:
        "MetaLearnML is a tabular AutoML engine that ranks preprocessing by model candidates with a meta learner trained on past runs, next to a benchmark over 15 datasets built to measure whether that learned ranking actually beats proxy and random baselines. On end to end evaluation savings it does not, and the repo records that.",
      story:
        "The pitch for meta learned model selection is that it saves you evaluations. I built the engine and then the benchmark that would catch me if it did not. On ranking quality the meta learner is clearly better than random (median Spearman 0.57 vs 0.02). On the thing that matters, evaluations saved to reach a good model, the measured reduction was 0.0% with a 95% CI of 0 to 50%. The benchmark report marks the resume impact criterion as not met. Keeping that result visible is the point of the project.",
      evidence: [
        "Candidate universe: up to 12 preprocessing strategies × 7 (classification) or 9 (regression) models, ranked by fast proxy evaluation plus an optional RandomForest meta-learner over prior-run meta-features",
        "Leakage controls: outer dev/test split before any encoder is fit, fold-local preprocessing, a single scored touch of the test partition, deterministic splits, SHA-256 content-addressed candidate identity, and a versioned meta-feature schema that refuses to load on drift",
        "Benchmark: 15 OpenML datasets (8 classification, 7 regression), outer seeds [13, 42, 97], 5 inner folds, 20 seeded candidate orderings, methods {exhaustive, proxy, meta, proxy+meta, random}",
        "Ranking quality, meta vs random: median Spearman 0.57 vs 0.02, Recall@5 0.40 vs 0.20",
        "End-to-end: proxy+meta held 100% median quality retention at a budget of 10 candidates with 0.0 median normalized regret, but the median evaluation reduction vs random was 0.0% (95% CI 0.0% to 50.0%)",
        "86 tests, Ruff-clean, GitHub Actions CI",
        "Optional FastAPI read API and Neo4j experiment-graph logging, kept as optional infrastructure rather than load-bearing claims",
      ],
      architecture: {
        overview:
          "CSV + label → task inference → candidate universe (preprocessing × model) → proxy score + meta-learner rank → fold-local CV on top-k → refit winner on all dev rows → single test score → deployable bundle + benchmark report",
        diagram: `
+---------------+   +------------------+   +----------------------+
|  CSV + label  |-->|  Task inference  |-->|  Candidate universe  |
+---------------+   +------------------+   |  preproc x model     |
                                          +-----------+----------+
                                                      |
                                                      v
+----------------------+   +------------------+   +----------------------+
|  Fold-local CV on    |<--|  Proxy score +   |<--|  Meta-features over   |
|  top-k candidates    |   |  meta-learner    |   |  prior runs (RF)     |
+----------+-----------+   +------------------+   +----------------------+
           |
           v
+----------------------+   +------------------+
|  Refit winner on all |-->|  Single test     |
|  dev rows            |   |  score + bundle  |
+----------------------+   +--------+---------+
                                    |
                                    v
                         +----------------------+
                         |  Benchmark report:   |
                         |  ranking vs speedup  |
                         +----------------------+`,
        tradeoffs: [
          "Meta-learner vs proxy-only ranking: the meta-learner ranks better, but did not convert that into fewer end-to-end evaluations in the measured suite",
          "Report the null result vs bury it: the benchmark explicitly records that the speedup criterion was not met, so the claim cannot drift upward later",
          "Fixed 15-dataset suite vs broader coverage: a locked suite with committed result rows is reproducible; generalization beyond it is not claimed",
          "RandomForest over meta-features vs gradient-based meta-learning: a small inspectable regressor was enough to test the hypothesis and cheap to retrain",
        ],
      },
      decisions: [
        {
          title: "Build the benchmark that could disprove the engine",
          why: "Meta-learned ranking is supposed to save evaluations. The only honest way to claim that is a leakage-resistant suite that measures it, including when the answer is no.",
        },
        {
          title: "Write ‘resume-impact criterion not met’ into the repo",
          why: "A negative result that lives only in my head gets rounded up to a positive one later. In the benchmark report, it stays honest.",
        },
        {
          title: "Separate ranking quality from end-to-end savings",
          why: "The meta-learner genuinely ranks better than random. That is not the same as reaching a good model in fewer evaluations, and conflating the two is the trap.",
        },
        {
          title: "Content-address candidates and version the meta-feature schema",
          why: "Reproducible identity and a schema that refuses to load on drift are what make a re-run comparable to the original.",
        },
      ],
      links: {
        github: "https://github.com/Chunduri-Aditya/MetaLearnML",
      },
      metrics: [
        { label: "Ranking (meta vs random)", value: "0.57 vs 0.02 ρ" },
        { label: "Measured speedup", value: "0.0% (CI 0 to 50)" },
      ],
    },
    {
      id: "chatdb",
      title: "ChatDB",
      subtitle: "Rule-Based Natural-Language-to-SQL CLI",
      iconName: "Database",
      iconClassName: "text-blue-400",
      tags: ["Python", "pandas", "SQLAlchemy", "SQLite", "Regex", "CLI"],
      discipline: "DEV-TOOL / SQL",
      status: "COURSEWORK",
      hook:
        "Plain English questions into SQL with five regex rules and zero machine learning.",
      plain:
        "A command line tool from a database course: load a spreadsheet, ask something like 'total sales grouped by region' in plain English, get the SQL back. It uses five hand written pattern rules rather than any AI, and if it does not recognize your question it says so instead of guessing.",
      oneLiner:
        "ChatDB loads a CSV into SQLite and turns a fixed grammar of plain English aggregate questions into SQL with regex pattern matching, not a model.",
      story:
        "Built for a USC database course. The constraint I set was natural language to SQL with zero ML: five hand written regex patterns, exact column matching, and a sample query generator that teaches the grammar it actually supports. It is honest about its edges. An unrecognized query returns an error string rather than a guess.",
      evidence: [
        "CSV ingestion with pandas: column-name normalization, then dtype-based classification into datetime / measure / attribute columns to drive query planning",
        "Five named regex intent patterns (sum / average / min / max / count, each grouped-by) mapped to SQL GROUP BY templates",
        "SQLAlchemy write-through into SQLite; the shipped CLI path prints the generated SQL rather than executing it",
        "Randomized sample-query generator so a new user sees the supported phrasing instead of guessing",
        "Exact, case-sensitive column matching with no fuzzy fallback; an unrecognized query returns an explicit error, never a wrong guess",
      ],
      architecture: {
        overview:
          "CSV → pandas load + column-type inference → SQLite via SQLAlchemy → NL query → regex intent match → SQL GROUP BY template → printed SQL",
        diagram: `
+-----------+   +----------------------+   +------------------+
|  CSV file |-->|  pandas load         |-->|  SQLite          |
+-----------+   |  + column-type infer |   |  (SQLAlchemy)    |
                +----------------------+   +--------+---------+
                                                    |
+-----------+   +----------------------+            |
|  NL query |-->|  Regex intent match  |<-----------+
+-----------+   |  (5 patterns)        |
                +----------+-----------+
                           |
              match        |        no match
                           v
                +----------------------+   +------------------+
                |  SQL GROUP BY        |   |  "Error: unable  |
                |  template -> print   |   |   to detect ..." |
                +----------------------+   +------------------+`,
        tradeoffs: [
          "Regex rules vs a parser or a model: rules are fully inspectable and need no training data, at the cost of covering only a fixed aggregate-by-group grammar",
          "Print the SQL vs execute it: printing keeps the tool a transparent translator and sidesteps unsafe interpolation in the shipped path",
          "Exact column matching vs fuzzy: exact matching fails loudly on a typo instead of silently querying the wrong column",
        ],
      },
      decisions: [
        {
          title: "Regex intent matching, no NLP",
          why: "For a fixed grammar of aggregate-by-group questions, five readable patterns beat a parser you cannot debug and a model you cannot ship in a CLI.",
        },
        {
          title: "Return an error on no match, never a guessed query",
          why: "A natural-language-to-SQL tool that guesses is worse than one that says it does not understand. No match is an explicit failure, not a fallback.",
        },
        {
          title: "Infer column roles from pandas dtypes at load time",
          why: "Classifying columns as dates / measures / attributes once, up front, is what lets a short regex decide what can be summed and what can be grouped.",
        },
      ],
      links: {
        github: "https://github.com/Chunduri-Aditya/ChatDB",
      },
      metrics: [
        { label: "Translation", value: "5 regex patterns" },
        { label: "Stack", value: "pandas · SQLAlchemy" },
      ],
    },
  ],
};

/**
 * Hero telemetry counters.
 *
 * Two rules, both learned the hard way on 2026-09-18:
 *   1. Anything countable is derived from PROJECTS, never typed by hand. The
 *      old hardcoded "SYSTEMS SHIPPED: 9" counted a COURSEWORK entry, and
 *      "DOMAINS: 6" matched nothing in the data at all.
 *   2. Anything not derivable carries a row in METRICS.md naming the command
 *      that produced it.
 *
 * Dropped here: "FRONTIER MODELS RED-TEAMED: 8". RESULTS.md logs 6 model IDs,
 * 2 of them frontier tier, and the site's own Agent Shield evidence already
 * read "4 of the 8 target" models. Neither number was supportable, so the stat
 * is gone rather than swapped for a different wrong one.
 */
export const HUD_STATS: HudStat[] = [
  {
    label: "SYSTEMS SHIPPED",
    value: String(PROJECTS.projects.filter((p) => p.status === "SHIPPED").length),
  },
  {
    label: "DISCIPLINES",
    value: String(new Set(PROJECTS.projects.map((p) => p.discipline)).size),
  },
  { label: "PAPERS", value: "2" },
  // 6 in-house modules: IN 5, PS 6, MM 1, DR 6, EX 5, TL 5. See METRICS.md.
  { label: "ATTACK IDS CATALOGUED", value: "28" },
];

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
  /** Tier 1 — always visible. One plain line on what the role actually was. */
  hook: string;
  /** Tier 2 — "Plain" / ELI5. 1-2 sentences, zero jargon. */
  plain: string;
  /** Tier 3 — "Technical", narrative variant. */
  story: string;
  /** Tier 3 — "Technical", crisp variant. */
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
      signal: "Research and engineering roles. What I shipped, measured, and handed off.",
      story: "Places where the problem pushed back and forced me to build better tools.",
    },
  },
  items: [
    {
      org: "Easley Dunn Productions, Inc.",
      role: "AI/ML Engineer Intern \u00b7 Gameplay Analyzer Team",
      location: "Remote",
      period: "Aug 2026 \u2013 Present",
      accent: "emerald",
      hook:
        "Built the tool a video team relies on to decide whether a camera to field mapping is trustworthy before they accept it.",
      plain:
        "For a studio turning NFL Blitz gameplay video into tracking data, I built the review tool that decides whether a computed field alignment is good enough to keep. Then I chased down why one class of alignments kept failing and proved which cause was real.",
      story:
        "The brief was computer vision for tracking NFL Blitz gameplay. What it needed first was a way to trust a homography before accepting it, so I built the reviewer tool and the schema gates around it. Then I spent the diagnosis time proving which failure mechanism was real and which coordinate bug was a red herring.",
      signal:
        "Built a single-reviewer browser tool for field-registration labeling and homography validation on NFL Blitz footage, then diagnosed a class of homography failures down to its geometric mechanism.",
      bullets: [
        "Built a single-reviewer browser tool (Python, OpenCV, NumPy, JavaScript, stdlib HTTP server) for field/template correspondence labeling: homography fitting with per-point residual reporting, 44-keypoint projection, overlay review, and attempt-state handling",
        "Added the guardrails that make a labeled homography trustworthy: minimum-point and convex-hull spatial-distribution checks, schema validation before writes, OS-level immutable attempt records, restart-persistent pointers, and JSONL audit logging",
        "Reproduced the frame-6 reference homography to a maximum matrix difference of 4.73e-11 with 0-pixel correspondence residuals, and verified the saved domain-gate result",
        "Isolated correspondence-span length as the supported failure mechanism for frame-15: narrow spans (~8\u201317 yards) produced homographies that failed full-field validity, wide spans (~42 yards) stayed locally consistent, shown through six controlled test categories",
        "Found a real template-scale coordinate bug (the tool assumed an edge-to-edge 100-yard field; the asset is inset, ~8-yard error at the goal line) and confirmed it was not the cause of the frame-15 rejections",
        "Defined ACCEPTED / REJECTED / UNLABELABLE / ADJUDICATION_REQUIRED attempt schemas; the validation suite passes 6/6 positive and 16/16 negative fixtures",
      ],
      tags: ["Python", "OpenCV", "NumPy", "Homography", "Computer Vision", "Schema Validation"],
    },
    {
      org: "USC \u2014 Viterbi School of Engineering",
      role: "Research Assistant \u00b7 Computer Vision & Medical Imaging",
      location: "Los Angeles, CA",
      period: "Jun 2024 \u2013 Dec 2024",
      accent: "cyan",
      hook:
        "Made the clean artery versus vein training masks a team's retinal scan segmentation model learned from.",
      plain:
        "On a research team building a model that traces blood vessels in eye scans, my job was the data side: separating arteries from veins in the training images cleanly enough that the model had something honest to learn from.",
      story:
        "Retinal vessels are small and the labels are noisy, and every downstream diagnosis rides on the mask quality. My part was the data side: separating artery from vein cleanly enough that the team's model had something honest to learn from.",
      signal:
        "Contributed mask generation and refinement to a team U-Net artery-vein segmentation project on retinal fundus images, with MLflow experiment tracking across dataset and augmentation variants.",
      bullets: [
        "Built an AV mask-generation pipeline from color-segmented retinal fundus images: artery/vein separation via RGB-channel differencing, producing binary and RGB training masks for the team's U-Net model",
        "Ran threshold-tuning and overlap-mask extraction experiments (brute-force RGB and HSV color-space searches) to refine artery / vein / overlap boundaries",
        "Iterated on mask refinement to hand the team clean training data; the team's segmentation model reached ~0.94 AUC and ~94% pixel accuracy",
        "Contributed to team brainstorming on modeling approaches, with runs tracked in MLflow across the RITE and FIVES datasets and augmentation variants",
      ],
      tags: ["TensorFlow/Keras", "U-Net", "segmentation_models", "MLflow", "Medical Imaging"],
    },
    {
      org: "Yashoda Hospitals",
      role: "Data Analyst Intern",
      location: "Remote",
      period: "Nov 2022 \u2013 May 2023",
      accent: "emerald",
      hook:
        "Turned confidential insurance paperwork into something a doctor could read at a glance.",
      plain:
        "Hospital insurance documents are dense and doctors do not have time to dig through them. I analyzed that data and built dashboards that put the handful of fields they actually need on one screen.",
      story:
        "A remote data analyst internship working on confidential insurance-document data. The analysis mattered less than the delivery: the useful output was not a model, it was a dashboard a busy doctor would actually open.",
      signal:
        "Exploratory data analysis on confidential insurance-document data, delivered as Power BI and Tableau dashboards for doctor review.",
      bullets: [
        "Performed exploratory data analysis on confidential insurance-document data",
        "Developed Power BI and Tableau dashboards and visual summaries to help doctors review key insurance information",
      ],
      tags: ["Power BI", "Tableau", "EDA", "Dashboards"],
    },
    {
      org: "RB Associates",
      role: "Automation Engineering Intern (Finance and Accounting)",
      location: "Remote",
      period: "Aug 2021 \u2013 Sep 2022",
      accent: "purple",
      hook:
        "Automated four reconciliation processes by sitting with the accountants who ran them by hand.",
      plain:
        "An accounting firm was reconciling large transaction batches manually, which is slow and easy to get wrong late in a long day. I shadowed the accountants through live audits, learned the four processes they repeated most, and wrote Python workflows that do the matching and flag what needs a human.",
      story:
        "My first engineering job, and the one that taught me requirements are gathered by watching, not asking. I tagged along with accountants during live audits until I understood which four processes were repetitive enough to be worth automating, then built reconciliation workflows around rule-based matching with the failure cases written down rather than hidden.",
      signal:
        "Built Python and pandas reconciliation workflows for four repetitive finance processes, on transaction batches averaging roughly USD 120,000 per run.",
      bullets: [
        "Developed Python/pandas reconciliation workflows with transaction-data standardization, schema validation, SQL storage, and rule-based matching",
        "Gathered requirements by interviewing accountants and shadowing them during live audits, and automated four repetitive processes",
        "Incorporated accountant feedback into human-review workflows; validated reconciliation outputs against manual calculations and documented failure cases and recovery procedures",
        "Ran against reconciliation batches averaging about USD 120,000 per run as an internal tool for the firm",
      ],
      tags: ["Python", "pandas", "SQL", "Schema Validation", "Process Automation"],
    },
    {
      org: "SSN College of Engineering",
      role: "Research Intern \u00b7 Computer Vision & Object Detection",
      location: "Remote",
      period: "Jun 2021 \u2013 Jul 2021",
      accent: "purple",
      hook:
        "First taste of computer vision: running a detector over test video and writing down where it broke.",
      plain:
        "A short remote internship early in undergrad. I ran a YOLOv5 and OpenCV detection pipeline over test video, compared how reliably it held up as lighting, motion and occlusion changed, and wrote up the cases where it failed.",
      story:
        "A short remote internship early in my undergrad, and my first real exposure to computer vision. Running the same detector across clips that differed in lighting, motion and occlusion taught me that the interesting part is not the model, it is characterising the conditions under which it stops working.",
      signal:
        "Introductory object detection: YOLOv5 and OpenCV detection on test video, with reliability compared across lighting, motion and occlusion changes and failure cases documented.",
      bullets: [
        "Evaluated a YOLOv5 and OpenCV detection pipeline on test video",
        "Compared detection reliability across lighting, motion and occlusion changes, and documented the failure cases",
      ],
      tags: ["YOLOv5", "OpenCV", "Object Detection", "Failure Analysis"],
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
  /** Tier 1 — always visible. One plain line on what the paper argues. */
  hook: string;
  /** Tier 2 — "Plain" / ELI5. 1-2 sentences, zero jargon. */
  plain: string;
  /** Tier 3 — "Technical", narrative variant. */
  story: string;
  /** Tier 3 — "Technical", crisp variant. */
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
      hook:
        "When an AI resists an attack but never mentions it, that's not the same as staying safe. I measure the difference.",
      plain:
        "Security tests for AI agents usually check two things: did the attack work, and did the agent still do its job. They skip a third thing that matters \u2014 did the agent tell its owner something was wrong? This paper adds that measurement, so 'quietly resisted' and 'resisted and reported it' stop counting as the same result.",
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
      /*
       * Title corrected 2026-09-18 to the publisher record. The old title,
       * "Wind Power Analysis using Digital Twins & ML", was never what IJRASET
       * published. Second of four authors, stated plainly rather than implied.
       *
       * The Digital Twin / Azure / TCN / KNN claims were flagged as unsupported
       * during the audit, then verified directly against the PDF: section II
       * states the cloud architecture of digital twins, "Microsoft Azure's
       * platform for the creation of three-dimensional digital twins", and
       * "a non-parametric k-nearest neighbors (KNN) regression method combined
       * with a deep learning approach called a temporal convolution network
       * (TCN)". They stay. Note the paper is internally inconsistent: its
       * abstract and index terms describe SVM and Random Forest regression
       * instead, so do not claim a single headline method for it.
       */
      badge: "PUBLICATION \u00b7 IJRASET VOL 11, AUG 2023",
      title: "Wind Power Analysis Using Machine Learning in Wind Turbines",
      hook:
        "Forecasting wind-farm output from a live software model of the farm, as the second of four authors.",
      plain:
        "Wind power is hard to predict, which makes it hard to plan around. This undergraduate publication builds a 'digital twin', a running software copy of a wind farm on Azure, and pairs two forecasting methods to predict output. I was the second of four authors.",
      story:
        "Wind is messy. The paper builds a Digital Twin on Azure to mirror the farm in software, then forecasts output with models that respect long-range time dependencies. My first publication, second of four authors, from undergrad at SRM.",
      signal:
        "Hybrid forecasting combining TCN and KNN regression inside a Digital Twin architecture on Azure. IJRASET Vol 11 Issue VIII, Aug 2023. Second of four authors.",
      metrics: [
        { label: "Architecture", value: "Digital Twin", accent: "cyan" },
        { label: "Model", value: "TCN + KNN", accent: "purple" },
        { label: "Authorship", value: "2nd of 4", accent: "blue" },
        { label: "DOI", value: "10.22214/ijraset.2023.52452", accent: "green" },
      ],
      links: [
        { label: "Read The Paper", href: ASSETS.publicationPaper },
        { label: "View Certificate", href: ASSETS.publicationCertificate },
        { label: "DOI", href: "https://doi.org/10.22214/ijraset.2023.52452" },
      ],
    },
  ],
};

/* ============================================================================
 * SECTION 8 — SIDEBAR (User Manual + Off-Keyboard + Skills + CTA)
 * ========================================================================= */

export type SkillAccent = "rose" | "purple" | "cyan" | "emerald" | "blue";

export interface EducationEntry {
  school: string;
  location: string;
  degree: string;
  /** Graduation date, not a range, matching how the resume prints it. */
  graduated: string;
}

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
  education: {
    title: string;
    iconName: IconName;
    items: EducationEntry[];
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
          "Give me the outcome and the constraints. I come back with an approach, the tradeoffs written down, and a shipped result with tests and artifacts.",
        story:
          "Give me a messy problem and a success metric. I turn it into a pipeline, instrument it, and iterate until the system behaves.",
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
    subtitle: "High bandwidth attention, channeled into structure",
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
        tools: ["LangChain", "LangGraph", "Ollama", "Hugging Face", "RAG", "ChromaDB", "pgvector"],
        iconName: "Sparkles",
        accent: "purple",
      },
      {
        category: "ML / CV / Audio",
        tools: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "OpenCV", "MediaPipe", "librosa", "Demucs", "Beat This!", "CLAP", "Diffusers"],
        iconName: "Cpu",
        accent: "cyan",
      },
      {
        category: "Systems & Engineering",
        tools: ["FastAPI", "React/TypeScript", "Docker", "Flask", "GitHub Actions", "CI/CD", "pytest", "uv"],
        iconName: "Wrench",
        accent: "emerald",
      },
      {
        category: "Data & Storage",
        tools: ["PostgreSQL", "SQLAlchemy", "SQLite", "ChromaDB", "Pandas", "NumPy", "Plotly"],
        iconName: "Database",
        accent: "blue",
      },
    ],
  },
  education: {
    title: "Education",
    iconName: "ScrollText",
    items: [
      {
        school: "University of Southern California",
        location: "Los Angeles, CA",
        degree: "M.S., Applied Data Science",
        graduated: "Dec 2025",
      },
      {
        school: "SRM Institute of Science and Technology",
        location: "Chennai, India",
        degree: "B.Tech, Computer Science and Engineering (AI/ML)",
        graduated: "Jul 2023",
      },
    ],
  },
  cta: {
    title: "Want the receipts?",
    subtitle: "One resume, and the numbers on this site trace back to it.",
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
  /** This site's own repo. The tagline links to it: the source is the evidence. */
  sourceUrl: string;
  copyright: (year: number) => string;
}

export const FOOTER: FooterContent = {
  brand: "~/aditya",
  tagline: "Built with React + Tailwind + Framer Motion",
  sourceUrl: "https://github.com/Chunduri-Aditya/Portfolio",
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
      "tell me about yourself",
      "who are you",
      "about yourself",
      "introduce yourself",
      "what do you do",
      "what is your background",
      "who is aditya",
      "tell me about aditya",
    ],
    answer:
      "I'm Aditya Chunduri, M.S. Applied Data Science from USC (Dec 2025), B.Tech in CSE with an AI/ML specialisation from SRM (Jul 2023). I build ML systems across a range of domains and measure each one instead of just shipping it: adversarial evaluation for LLM agents, a full stack DJ engine with a research grade audio core, a model agnostic media pipeline, on device computer vision, an AutoML benchmark. Same habit everywhere, seeded runs and a reproducible number. Current focus is Agent Shield, an evaluation framework for agent security on UK AISI's Inspect AI harness.",
    links: [
      { label: "View Projects", href: "#projects", sectionId: "projects" },
      { label: "How I Think", href: "#thinking", sectionId: "thinking" },
      { label: "Resume", href: ASSETS.resumePdf },
    ],
    tags: ["about", "who", "introduction", "background", "person", "aditya", "yourself"],
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
      "Nine builds. Agent Shield: LLM agent security eval framework on Inspect AI (6 modules, 28 attack IDs, 2 anchored surfaces, Zenodo preprint) plus a local runtime perimeter. AI RemixMate: full stack DJ engine (React/TypeScript + FastAPI, TIV harmonic scoring, Beat This!, CLAP 512-D search, learned spectral matching, 904 tests). AkashicTree: agentic multimodal pipeline for text, image, and audio. AI Health Journal: local RAG journal with a measured retrieval ablation (0.968 Recall@3) and a mutation tested crisis safety floor at 1.000 sensitivity. Model Behavior Lab: local Ollama eval platform, the methodology that became Agent Shield. Attention Drift Detector: on device webcam attention monitoring where no video is ever stored. Sourcewarden: security gated retrieval + multi agent orchestration for n8n, exposed read only. MetaLearnML: a meta learned AutoML ranker plus the 15 dataset benchmark that measured it produced no end to end speedup, and kept that result. ChatDB: a rule based natural language to SQL CLI from a database course, five regex patterns, no ML.",
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
      "AI Health Journal is a local first journaling assistant built around a multi model Draft, Verify, Revise pipeline over Ollama, with Chroma and nomic-embed-text for retrieval. The point is that its two load bearing claims are measured, not asserted: a 4 way retrieval ablation (0.968 Recall@3 across the full corpus, and a valence_flip category that went 0.667 to 1.000 after the embedder swap) and a deterministic crisis safety floor at 1.000 sensitivity, verified by deliberately breaking it. PRIVACY_MODE=strict scrubs PII before storage; Pinecone and Anthropic are opt in gates that ship off.",
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
      "AI RemixMate is a full-stack DJ engine: FastAPI async job queue with SQLite persistence, React/TypeScript frontend (10 pages, SSE live streaming), and a research-grade MIR core. TIV harmonic scoring (Bernardes et al. 2016), Beat This! (ISMIR 2024) downbeat detection with bar-grid snapping, cosine-taper stem bass ramp, FxNorm per-stem LUFS normalization, CLAP 512-D semantic search, Essentia energy arc modeling, masking aware multiband EQ (Hafezi & Reiss 2015), and rekordbox XML + Serato GEOB cue export. Newest layer is a learned spectral pipeline: mel band trajectory matching picks track B's entry phrase with drop aware scoring, and per band weights update online from thumbs up/down verdicts. 904 tests, GitHub Actions CI.",
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
      "Attention Drift Detector is an on device webcam tool that classifies focus, drift, and absence in real time: MediaPipe Face Mesh (478 landmarks) to head pose via solvePnP to iris based gaze estimation, then a rule based classifier with temporal smoothing over a 1 second window. It nudges you after 5 continuous seconds of drift and writes an HTML session report. No video is ever recorded, only derived angles and session labels reach local SQLite. 52 tests run in under a second with no webcam or network needed.",
    links: [
      { label: "View Project", href: "#projects", sectionId: "attention-drift-detector" },
    ],
    tags: ["attention", "drift", "webcam", "mediapipe", "opencv", "gaze", "computer vision", "privacy", "local-first", "focus"],
  },
  {
    id: "sourcewarden",
    title: "Sourcewarden",
    utterances: [
      "sourcewarden",
      "source warden",
      "n8n workflows",
      "workflow orchestration",
      "security gated",
      "read only dashboard",
      "ed25519",
    ],
    answer:
      "Sourcewarden merges a retrieval system over n8n's docs and community examples with a six-role, Ed25519-gated agent orchestration pipeline, behind a read-only FastAPI layer. Every chat answer is grounded in cited evidence, and the monitoring dashboard recomputes all security-control hashes live against a signed manifest instead of trusting a cache. The deliberate call was scoping the web layer to retrieval and status only, never execution, so it can't rebuild or bypass the pipeline's signed approval flow. 2,256-row retrieval index, 71 tests including a byte-flip mutation test, ships as one Docker image.",
    links: [
      { label: "View Project", href: "#projects", sectionId: "sourcewarden" },
    ],
    tags: ["n8n", "workflow", "orchestration", "security", "ed25519", "fastapi", "rag", "docker", "read-only"],
  },
  {
    id: "metalearnml",
    title: "MetaLearnML",
    utterances: [
      "metalearnml",
      "meta learn ml",
      "meta learning",
      "automl",
      "auto ml",
      "model selection",
      "candidate ranking",
      "automl benchmark",
    ],
    answer:
      "MetaLearnML is a tabular AutoML engine that ranks preprocessing-by-model candidates with a RandomForest meta-learner over prior runs, plus a 15-dataset OpenML benchmark built to test whether that ranking actually saves work. It does not: median evaluation reduction vs random was 0.0% (95% CI 0.0% to 50.0%), and the benchmark report marks the resume-impact criterion as not met. What it does do is rank better than random (median Spearman 0.57 vs 0.02). Leakage controls throughout: outer dev/test split before any encoder fit, fold-local preprocessing, one scored test touch, content-addressed candidate identity. 86 tests, GitHub Actions CI.",
    links: [
      { label: "View Project", href: "#projects", sectionId: "metalearnml" },
      { label: "GitHub", href: "https://github.com/Chunduri-Aditya/MetaLearnML" },
    ],
    tags: ["automl", "meta-learning", "model-selection", "benchmark", "ranking", "leakage", "scikit-learn", "openml", "null-result"],
  },
  {
    id: "chatdb",
    title: "ChatDB",
    utterances: [
      "chatdb",
      "chat db",
      "natural language to sql",
      "nl to sql",
      "text to sql",
      "sql cli",
      "csv to sql",
      "regex sql tool",
    ],
    answer:
      "ChatDB is a rule-based natural-language-to-SQL command-line tool built for a USC database course. No ML: it loads a CSV into SQLite with pandas and SQLAlchemy, infers column types (datetime / measure / attribute), and matches a fixed grammar of aggregate-by-group questions with five hand-written regex patterns to SQL GROUP BY templates. The shipped path prints the SQL rather than executing it, exact column matching has no fuzzy fallback, and an unrecognized query returns an explicit error instead of a guess. Local-only, single commit, not pushed to GitHub.",
    links: [
      { label: "View Project", href: "#projects", sectionId: "chatdb" },
    ],
    tags: ["sql", "nl-to-sql", "cli", "pandas", "sqlalchemy", "regex", "database", "coursework", "rule-based"],
  },
  {
    id: "experience-roles",
    title: "Roles & experience",
    utterances: [
      "research experience",
      "have you done research",
      "usc viterbi",
      "research assistant",
      "easley dunn",
      "nfl blitz",
      "internship",
      "ssn",
      "medical imaging",
      "past roles",
      "work experience",
    ],
    answer:
      "Five roles across about four years. At Easley Dunn Productions (AI/ML Engineer Intern, Gameplay Analyzer team, Aug 2026 to present), I built a single-reviewer browser tool for field-registration labeling and homography validation on NFL Blitz footage, reproduced a reference homography to a 4.73e-11 matrix difference with 0-pixel residuals, and isolated a class of homography failures to its geometric cause. At USC Viterbi (Jun\u2013Dec 2024), I contributed artery-vein mask generation and refinement to a team U-Net retinal-segmentation project (the team's model reached ~0.94 AUC, ~94% pixel accuracy), with MLflow experiment tracking. At Yashoda Hospitals (Nov 2022\u2013May 2023), I did exploratory analysis on confidential insurance-document data and built Power BI and Tableau dashboards for doctors. At RB Associates (Aug 2021\u2013Sep 2022), my first engineering job, I automated four repetitive finance reconciliation processes in Python and pandas, gathering the requirements by shadowing accountants during live audits. At SSN College (Jun\u2013Jul 2021), a short remote internship, I evaluated a YOLOv5 and OpenCV detection pipeline on test video and documented where its reliability broke down under lighting, motion and occlusion changes.",
    links: [
      { label: "Experience section", href: "#experience", sectionId: "experience" },
    ],
    tags: [
      "experience",
      "research",
      "easley dunn",
      "nfl blitz",
      "homography",
      "usc",
      "viterbi",
      "ssn",
      "medical imaging",
      "u-net",
      "yolo",
      "internship",
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
      "Two papers. (1) Sole-author preprint — “Beyond Attack Success Rate: Measuring Operator-Facing Transparency in LLM Agent Security” (Zenodo, 2026), introducing Transparency Rate as a third evaluation axis on the Inspect AI harness. (2) Peer-reviewed publication — “Wind Power Analysis Using Machine Learning in Wind Turbines” in IJRASET Vol 11 Issue VIII (Aug 2023), second of four authors, combining KNN + TCN inside a Digital Twin on Azure for wind forecasting.",
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
      "Eval & adversarial: Inspect AI, AgentDojo, HarmBench, OWASP LLM/Agentic, MITRE ATLAS, red teaming, prompt injection, MCP proxying, mutation testing. LLM & orchestration: LangChain, LangGraph, Ollama, Hugging Face, RAG, ChromaDB, pgvector. ML / CV / Audio: PyTorch, TensorFlow, Keras, Scikit-learn, OpenCV, MediaPipe, librosa, Demucs, Beat This!, CLAP, Diffusers. Systems & engineering: FastAPI, React/TypeScript, Docker, Flask, GitHub Actions, CI/CD, pytest, uv. Languages: Python, SQL, JavaScript/TypeScript, Bash.",
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
