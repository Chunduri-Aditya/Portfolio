import type { IconName } from "../lib/iconMap";

/* ============================================================================
 * PORTFOLIO CONTENT
 * ----------------------------------------------------------------------------
 * Single source of truth for every piece of editable text/data on the site.
 * Edit values here; components consume them via named exports.
 *
 * Conventions:
 *  - Icons are referenced by string name (see src/lib/iconMap.tsx).
 *  - One voice. Every content type carries exactly one variant.
 *  - PDFs and other assets live in /public/Docs and are resolved via getPublicPath.
 *
 * This file used to carry up to four copies of every string, across a
 * signal/story tone axis and a technical/plain depth axis, both switchable from
 * the navbar. That gave a visitor four possible first impressions of the same
 * person and gave this file four places for one fact to drift, which it did:
 * the FAQ answers disagreed with the project data about how many projects
 * existed and whether ChatDB was on GitHub. One voice now, chosen as the terse
 * technical one, because the audience for this site is technical.
 * ========================================================================= */

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
/**
 * One identity, shared with the resume this site serves.
 *
 * These three fields disagreed with the resume until 2026-09-18: the site said
 * Los Angeles, chunduri@usc.edu and in/aditya-chunduri while the PDF in
 * public/Docs said San Francisco, the gmail and in/chunduriaditya. A recruiter
 * reading both saw two people. The resume wins because its values are the ones
 * already going out on applications, and because the USC address stops working
 * once that affiliation lapses.
 *
 * The USC role and education entries below keep Los Angeles: that is where the
 * work happened, which is a different fact from where he is.
 */
export const CONTACT = {
  email: "chunduriaditya2@gmail.com",
  github: "https://github.com/Chunduri-Aditya",
  linkedin: "https://linkedin.com/in/chunduriaditya",
  location: "San Francisco, CA",
} as const;

/* ============================================================================
 * SECTION 1 — HERO
 * ========================================================================= */

interface Chip {
  iconName: IconName;
  text: string;
}

export interface HeroContent {
  /** Full name. The first thing a recruiter needs to resolve. */
  name: string;
  /** The role, stated plainly. Not a claim, not a tagline. */
  roleLabel: string;
  /** Availability. The single most perishable string on the site, so it lives here. */
  availability: string;
  /** What he builds, in one sentence. */
  headline: string;
  /** Capability line: the terms a recruiter is scanning for. */
  capabilities: string[];
  subhead: string;
  chips: Chip[];
  ctas: {
    primary: { label: string; iconName: IconName; targetSection: string };
    resume: { label: string; iconName: IconName; href: string };
  };
}

export const HERO: HeroContent = {
  name: "Aditya Chunduri",
  roleLabel: "ML / AI Engineer",
  availability: "open to work",
  /*
   * The old headline, "I ship ML systems, then measure whether they actually
   * work", was a good line but it made a visitor infer the role instead of
   * reading it. Identity resolves first now; the measurement thesis is still
   * the spine of the site, it just gets proven by the projects rather than
   * asserted above them.
   */
  headline: "Building agentic systems, evaluation infrastructure, and production AI applications.",
  capabilities: [
    "Python",
    "PyTorch",
    "LLM Systems",
    "Evaluation",
    "Computer Vision",
    "Backend AI",
  ],
  subhead: "M.S. Applied Data Science, USC",
  chips: [
    { iconName: "Boxes", text: "End to end ML systems" },
    { iconName: "Gauge", text: "Real metrics, seeded runs" },
    { iconName: "Wrench", text: "Full-stack: React + FastAPI" },
    { iconName: "CheckCircle2", text: "Reproducible by default" },
  ],
  ctas: {
    primary: { label: "View Engineering Work", iconName: "Terminal", targetSection: "projects" },
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
 * SECTION 2 — NAVIGATION
 * ========================================================================= */

export interface NavLink {
  id: string;
  label: string;
}

/** Order must match the DOM order in Portfolio.tsx, or the nav reads wrong. */
export const NAV_LINKS: NavLink[] = [
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
];

/* ============================================================================
 * SECTION 3 — ABOUT
 * ========================================================================= */

export interface AboutContent {
  header: { title: string; iconName: IconName; eyebrow: string };
  /** Three to five sentences. Engineering mindset, not autobiography. */
  paragraphs: string[];
}

/*
 * This replaces a "How I Think" section that ran a five-step loop, four
 * values, and a "human part", each in two voices. It sat below the evidence
 * and restated in the abstract what the case studies already show concretely.
 * What survives is the part a hiring manager cannot infer from a repo: which
 * problems he goes looking for.
 */
export const ABOUT: AboutContent = {
  header: { title: "About", iconName: "Layers", eyebrow: "About" },
  paragraphs: [
    "I work on AI systems where model capability alone is not the hard part. The interesting questions sit around the model: what enters a limited context window, which tool call is safe to make, what the system does when retrieval misses, and how you would know any of it is working.",
    "That pulls me toward evaluation. Most of my projects ship with the measurement attached, because a system I cannot re-run and get the same answer from is a demo, not a result. It also means I publish results that went against me: MetaLearnML's benchmark says its learned ranking does not reduce end to end evaluation time, and the repo records that rather than burying it.",
    "I build across the stack it takes to get there, from adversarial evals and retrieval pipelines to FastAPI services, agent orchestration, and on-device computer vision. The domains change; the habit of instrumenting first does not.",
  ],
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
  /** Always visible on the card. One punchy line, <= ~14 words. */
  hook: string;
  /** The technical description. One paragraph, used on the card and the case study. */
  oneLiner: string;
  evidence: string[];
  architecture: ProjectArchitecture;
  decisions: ProjectDecision[];
  links: ProjectLinks;
  metrics: ProjectMetric[];
  /**
   * Surface this one above the rest. Four are marked, chosen on one rule: the
   * evidence is strong AND the repository is public, so every flagship link
   * resolves for a visitor who clicks it. Private work stays in the main list
   * behind a request-access action rather than leading with a button that
   * cannot be followed.
   */
  featured?: boolean;
}

export interface ProjectsSectionContent {
  header: {
    title: string;
    iconName: IconName;
    eyebrow: string;
    subtitle: string;
  };
  searchPlaceholder: string;
  projects: Project[];
}

export const PROJECTS: ProjectsSectionContent = {
  header: {
    title: "Featured Engineering Work",
    iconName: "GitBranch",
    eyebrow: "Work",
    subtitle: "Case studies with constraints, tradeoffs, evaluation, and outcomes.",
  },
  searchPlaceholder: "Search (RAG, evals, homography, demucs, privacy...)",
  projects: [
    {
      id: "agent-shield",
      featured: true,
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
      oneLiner:
        "Agent Shield stress tests LLM agents across prompt injection, MCP tool poisoning, RAG memory poisoning, and behavioral drift. It runs on UK AISI's Inspect AI harness, maps every threat to OWASP and MITRE ATLAS, and now carries a second claim surface: a local runtime perimeter that screens MCP tool descriptions in flight.",
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
      oneLiner:
        "AI RemixMate is a full stack DJ engine: a React/TypeScript frontend with SSE live streaming, a FastAPI async job queue, and a research grade MIR core (TIV harmonic scoring, Beat This! downbeat detection, CLAP 512-D semantic search), with 904 tests and mastering to -14 LUFS.",
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
      oneLiner:
        "AkashicTree is an agentic, model agnostic GenAI media pipeline that turns a single brief into text, image, and audio, coordinating local Ollama inference, Diffusers / FLUX.1, and ElevenLabs voice through one modular workflow.",
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
      featured: true,
      title: "AI Health Journal",
      subtitle: "Local RAG Journal with a Measured Safety Floor",
      iconName: "Lock",
      iconClassName: "text-emerald-400",
      tags: ["RAG", "Ollama", "ChromaDB", "Retrieval Evals", "Mutation Testing", "DPO", "Flask", "Local-First"],
      discipline: "RAG / SAFETY",
      status: "SHIPPED",
      hook:
        "A private journaling AI where the two claims that matter, recall and crisis safety, are measured, not promised.",
      oneLiner:
        "AI Health Journal is a local first journaling assistant whose two load bearing claims, does retrieval surface the right past entry and does the safety floor catch a crisis, are measured and reproducible offline rather than asserted.",
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
      oneLiner:
        "Model Behavior Lab is a local Ollama based evaluation platform that benchmarks reasoning, hallucination, emotion alignment, and code correctness with repeatable runs and dashboards. It is the methodology that became the base for Agent Shield.",
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
      oneLiner:
        "Attention Drift Detector classifies focus, drift, and absence in real time from head pose and iris gaze, nudges you after five continuous seconds of drift, and writes a session report. No video is ever recorded: only derived angles and labels reach disk.",
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
      featured: true,
      title: "Sourcewarden",
      subtitle: "Security-Gated n8n Workflow Orchestration",
      iconName: "Layers",
      iconClassName: "text-blue-400",
      tags: ["FastAPI", "RAG", "n8n", "Security", "Ed25519", "Docker", "Python"],
      discipline: "SYSTEMS / SECURITY",
      status: "SHIPPED",
      hook:
        "A chatbot that helps you build n8n workflows, and only exposes what's actually safe to expose.",
      oneLiner:
        "Sourcewarden merges a retrieval index and a multi agent orchestration system for building n8n workflows behind a read only FastAPI layer that grounds every chat answer in cited evidence and verifies its own security controls live instead of shelling out to run anything itself.",
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
      featured: true,
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
      oneLiner:
        "MetaLearnML is a tabular AutoML engine that ranks preprocessing by model candidates with a meta learner trained on past runs, next to a benchmark over 15 datasets built to measure whether that learned ranking actually beats proxy and random baselines. On end to end evaluation savings it does not, and the repo records that.",
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
      oneLiner:
        "ChatDB loads a CSV into SQLite and turns a fixed grammar of plain English aggregate questions into SQL with regex pattern matching, not a model.",
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
    {
      id: "jarvis",
      title: "jarvis",
      subtitle: "Turn-Scoped Containment for Coding Agents",
      iconName: "ShieldCheck",
      iconClassName: "text-accent-viridian",
      tags: ["Claude Code Hooks", "Prompt Injection", "Taint Tracking", "Fail-Closed", "Python", "Agent Shield"],
      discipline: "AGENT-SECURITY / RUNTIME",
      status: "SHIPPED",
      hook:
        "Once a coding agent reads something hostile, it stops being allowed to act for the rest of that turn.",
      oneLiner:
        "A Claude Code hook layer that screens tool results through Agent Shield, wraps flagged content as untrusted data before the model reads it, and denies every write, execute and network tool for the remainder of that turn, keyed by prompt_id.",
      evidence: [
        "Turn-scoped taint keyed by prompt_id, surviving across separate hook subprocesses, so ingest in one tool call constrains every later call in the same turn",
        "Gate covers 14 tool names plus every mcp__* tool by prefix. The matcher was checked against the harness rather than assumed: a probe confirmed Bash and an MCP tool fire while Read does not, which a wildcard matcher would have hidden",
        "Fails closed. With the screener pointed at a path that does not exist, a WebFetch was denied with an explicit reason rather than quietly allowed",
        "Live deny rate of 1 denied in 10 gated calls, recorded with the allow path too, so the rate has a real denominator",
        "124 tests, and ten mutations reintroduced as defects were each observed red then restored byte-identical",
        "Documents its own recall gaps rather than hiding them: as screened on 2026-09-17, secret-key assignments and a base64-piped-to-shell command scored allow low and are not wrapped. Those are gaps in the screener's ruleset, named in the README",
      ],
      architecture: {
        overview:
          "Tool call → PostToolUse hook → Agent Shield screen → wrap flagged output as untrusted data and set turn taint → PreToolUse gate reads taint by prompt_id → deny writes, execution and network for the rest of the turn",
        diagram: `
   tool result
        |
        v
+-------------------+     +---------------------+
| PostToolUse hook  |---->|  Agent Shield       |
|  (cannot block)   |     |  screener           |
+---------+---------+     +----------+----------+
          |                          |
          |   flagged                | clean
          v                          v
+-------------------+     +---------------------+
| wrap as UNTRUSTED |     |  pass through       |
| + taint[prompt_id]|     +---------------------+
+---------+---------+
          |
          v              next tool call, same turn
+-------------------------------------------------------+
| PreToolUse gate: is taint[prompt_id] set?              |
|   yes -> DENY writes / exec / network, with a reason   |
|   no  -> allow                                         |
|   screener unrunnable -> DENY (fail closed)            |
+-------------------------------------------------------+`,
        tradeoffs: [
          "PostToolUse cannot block, only rewrite, so quarantine wraps unconditionally when the guard is missing rather than pretending it screened something",
          "Turn scope rather than session scope: a session-wide block would make one bad web page end the session, while a turn-scoped one degrades to read-only and recovers",
          "Guards a cooperative model's mistakes, not an adversarial one. The run log is writable through Bash by means no gate here inspects, and the README says so rather than implying containment it does not provide",
        ],
      },
      decisions: [
        {
          title: "Key the taint on prompt_id, not session_id",
          why: "It is the only identifier that scopes to a single turn and survives across separate hook subprocesses. A probe confirmed a subagent's PreToolUse carries the parent turn's prompt_id, so taint propagates into subagents rather than leaking around them.",
        },
        {
          title: "Fail closed when the screener cannot run",
          why: "A security layer that silently degrades to allow is worse than none, because it is trusted. An executable check denies writes and names the exact missing binary in the message.",
        },
        {
          title: "Publish the recall gaps in the README",
          why: "The layer wraps what the screener flags, which is not the same as everything dangerous. Stating the payloads that currently score allow low is the difference between a security tool and a security claim.",
        },
      ],
      links: {
        requestAccess: "jarvis",
      },
      metrics: [
        { label: "Tests", value: "124" },
        { label: "Mutations verified red", value: "10" },
      ],
    },
    {
      id: "company-agents",
      title: "Company Agents",
      subtitle: "An Executable Map of a Company's Roles",
      iconName: "Boxes",
      iconClassName: "text-accent-gold",
      tags: ["Multi-Agent", "Node.js", "Zero Dependencies", "Mutation Testing", "LangGraph.js", "Agent Shield"],
      discipline: "MULTI-AGENT / TOOLING",
      status: "SHIPPED",
      hook:
        "Company functions down to role agents, with a verifier that refuses to call a blank job done.",
      oneLiner:
        "An executable map of company functions to departments to branches to jobs to role agents, with a five-layer enforcement chain: job records, branch designs, a preflight gate, context screening through Agent Shield, and generated role agents.",
      evidence: [
        "node scripts/verify.mjs passes 42 of 42 steps, exit 0, with the repository audit green",
        "Caught its own false success: a caption pass ran against blank inputs because 51 of 159 job records used a heading the runner did not read, and the run still exited 0. Fixed, and the verifier now fails on it",
        "Three mutations reintroduced as defects, each observed red then restored",
        "Zero runtime dependencies: Node builtins and relative imports only, tested with node --test",
        "Live model runs recorded with their failures, not just their successes: of three runs on a local 8B model, one completed with all four required outputs and two were blocked for inventing a URL",
        "Agent Shield wired in as a live dependency for context screening rather than named as a design intention",
      ],
      architecture: {
        overview:
          "Functions → departments → branches → job records → preflight gate → Agent Shield context screen → generated role agents, with a verifier over every layer",
        diagram: `
+------------------+
| company profile  |   a pack plus a profile, not a fork
+--------+---------+
         v
+------------------+   +------------------+   +------------------+
|  functions       |-->|  departments     |-->|  branches        |
+------------------+   +------------------+   +--------+---------+
                                                       v
                                            +----------------------+
                                            |  job records (159)   |
                                            +----------+-----------+
                                                       v
                                            +----------------------+
                                            |  preflight gate      |  blank -> FAIL
                                            +----------+-----------+
                                                       v
                                            +----------------------+
                                            |  Agent Shield screen |
                                            +----------+-----------+
                                                       v
                                            +----------------------+
                                            |  generated role      |
                                            |  agents              |
                                            +----------------------+
       verify.mjs asserts every layer above: 42 / 42`,
        tradeoffs: [
          "Zero dependencies keeps the whole chain auditable and installable anywhere, at the cost of writing the runner and test scaffolding by hand",
          "Records and generated agents rather than hand-written agents: adding a company is configuration, but the generator becomes the thing that has to be right",
          "A preflight gate that fails on blank input costs runs that would previously have reported success, which is the point",
        ],
      },
      decisions: [
        {
          title: "A company is a pack plus a profile, not a fork",
          why: "Forking the repo per company means every fix has to be applied N times and drift is guaranteed. Keeping the structure in records means a new company is data.",
        },
        {
          title: "Fail the run on a blank job rather than let it exit 0",
          why: "The failure that motivated this produced plausible output from empty inputs and reported success. An agent pipeline that cannot tell empty input from a hard task will confidently produce nothing.",
        },
        {
          title: "Record what the repo is not",
          why: "STATE.md carries the correction that this is not an operational multi-agent company, along with its open bugs. A skeleton described as a product is the failure mode this project exists to avoid.",
        },
      ],
      links: {
        requestAccess: "Company_Agents_skeleton",
      },
      metrics: [
        { label: "Verify steps", value: "42 / 42" },
        { label: "Runtime deps", value: "0" },
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

export type ExperienceAccent = "teal" | "sapphire" | "viridian";

export interface ExperienceItem {
  org: string;
  role: string;
  location: string;
  period: string;
  accent: ExperienceAccent;
  /** Always visible. One line on what the role actually was. */
  hook: string;
  /** The technical summary, shown when the entry is expanded. */
  summary: string;
  bullets: string[];
  tags: string[];
}

export interface ExperienceSectionContent {
  header: {
    title: string;
    iconName: IconName;
    subtitle: string;
  };
  items: ExperienceItem[];
}

export const EXPERIENCE: ExperienceSectionContent = {
  header: {
    title: "Experience",
    iconName: "Briefcase",
    subtitle: "Research and engineering roles. What I shipped, measured, and handed off.",
  },
  items: [
    {
      org: "Easley Dunn Productions, Inc.",
      role: "AI/ML Engineer Intern \u00b7 Gameplay Analyzer Team",
      location: "Remote",
      period: "Aug 2026 \u2013 Present",
      accent: "viridian",
      hook:
        "Built the tool a video team relies on to decide whether a camera to field mapping is trustworthy before they accept it.",
      summary:
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
      accent: "teal",
      hook:
        "Made the clean artery versus vein training masks a team's retinal scan segmentation model learned from.",
      summary:
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
      accent: "viridian",
      hook:
        "Turned confidential insurance paperwork into something a doctor could read at a glance.",
      summary:
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
      accent: "sapphire",
      hook:
        "Automated four reconciliation processes by sitting with the accountants who ran them by hand.",
      summary:
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
      accent: "sapphire",
      hook:
        "First taste of computer vision: running a detector over test video and writing down where it broke.",
      summary:
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

export type ResearchAccent = "teal" | "sapphire" | "indigo" | "viridian";

export interface PublicationLink {
  label: string;
  href: string;
}

export interface Publication {
  badge: string;
  title: string;
  /** Always visible. One line on what the paper argues. */
  hook: string;
  /** The technical summary: question, method, result. */
  summary: string;
  metrics: { label: string; value: string; accent: ResearchAccent }[];
  links: PublicationLink[];
}

export interface ResearchContent {
  header: {
    title: string;
    iconName: IconName;
    subtitle: string;
  };
  publications: Publication[];
}

export const RESEARCH: ResearchContent = {
  header: {
    title: "Research",
    iconName: "BookOpen",
    subtitle: "Research question, method, result, and the artifacts behind each.",
  },
  publications: [
    {
      badge: "PREPRINT \u00b7 ZENODO 2026",
      title:
        "Beyond Attack Success Rate: Measuring Operator-Facing Transparency in LLM Agent Security",
      hook:
        "When an AI resists an attack but never mentions it, that's not the same as staying safe. I measure the difference.",
      summary:
        "Sole-author preprint introducing a transparency-aware evaluation protocol on Inspect AI. Adds Transparency Rate (TR) as a third axis to the AgentDojo outcome matrix, with an anchored prompt-injection result (n=20, Wilson 95% CIs) across four models and diagnostic probes over six adversarial surfaces.",
      metrics: [
        { label: "Contribution", value: "Transparency Rate", accent: "sapphire" },
        { label: "Harness", value: "Inspect AI", accent: "teal" },
        { label: "Surfaces", value: "6 attack", accent: "viridian" },
        { label: "Author", value: "Sole author", accent: "indigo" },
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
      summary:
        "Hybrid forecasting combining TCN and KNN regression inside a Digital Twin architecture on Azure. IJRASET Vol 11 Issue VIII, Aug 2023. Second of four authors.",
      metrics: [
        { label: "Architecture", value: "Digital Twin", accent: "teal" },
        { label: "Model", value: "TCN + KNN", accent: "sapphire" },
        { label: "Authorship", value: "2nd of 4", accent: "indigo" },
        { label: "DOI", value: "10.22214/ijraset.2023.52452", accent: "viridian" },
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

export type SkillAccent = "bronze" | "sapphire" | "teal" | "viridian" | "indigo";

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

export interface SidebarContent {
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
  skills: {
    title: "Cognitive Stack",
    iconName: "Layers",
    items: [
      {
        category: "Eval & Adversarial (Safety)",
        tools: ["Inspect AI", "AgentDojo", "HarmBench", "Red Teaming", "Prompt Injection", "MCP Proxying", "Mutation Testing", "Wilson CIs"],
        iconName: "ShieldCheck",
        accent: "bronze",
      },
      {
        category: "LLM & Orchestration",
        tools: ["LangChain", "LangGraph", "Ollama", "Hugging Face", "RAG", "ChromaDB", "pgvector"],
        iconName: "Sparkles",
        accent: "sapphire",
      },
      {
        category: "ML / CV / Audio",
        tools: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "OpenCV", "MediaPipe", "librosa", "Demucs", "Beat This!", "CLAP", "Diffusers"],
        iconName: "Cpu",
        accent: "teal",
      },
      {
        category: "Systems & Engineering",
        tools: ["FastAPI", "React/TypeScript", "Docker", "Flask", "GitHub Actions", "CI/CD", "pytest", "uv"],
        iconName: "Wrench",
        accent: "viridian",
      },
      {
        category: "Data & Storage",
        tools: ["PostgreSQL", "SQLAlchemy", "SQLite", "ChromaDB", "Pandas", "NumPy", "Plotly"],
        iconName: "Database",
        accent: "indigo",
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

