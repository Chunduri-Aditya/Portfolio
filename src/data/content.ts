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

/**
 * Resolve a /public asset against the deployed base path.
 *
 * The fallback is not defensive padding: `vite.config.ts` imports this module
 * through `src/lib/caseStudies.ts` to build the sitemap and the emitted route
 * files, and esbuild runs that in plain Node, where `import.meta.env` does not
 * exist. Without it the whole config fails to load. Asset paths are unused on
 * that path, so "/" is only ever a placeholder there; the browser and vitest
 * both get the real base.
 */
const getPublicPath = (path: string): string => {
  const base = import.meta.env?.BASE_URL ?? "/";
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

/**
 * Five fields, which is the whole hero.
 *
 * It also carried `capabilities` (six recruiter keywords), `subhead` (the
 * degree) and `chips` (four slogans). `chips` was never rendered by any
 * component at all, and the other two were removed from the hero because they
 * were each already stated somewhere that has room to back them up: the
 * keywords in Capabilities, the degree in the sidebar and the proof strip.
 * Data nothing renders is data nothing checks, so all three are gone rather
 * than left here to drift.
 */
export interface HeroContent {
  /** Full name. The first thing a recruiter needs to resolve. */
  name: string;
  /** The role, stated plainly. Not a claim, not a tagline. */
  roleLabel: string;
  /** Availability. The single most perishable string on the site, so it lives here. */
  availability: string;
  /** What he builds, in one sentence. Also the source for og:description. */
  headline: string;
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

/* ── Hero evidence panel ──────────────────────────────────────────────── */

export interface AttackModule {
  /** Module prefix as it appears in the attack IDs themselves. */
  code: string;
  label: string;
  ids: number;
}

/**
 * Agent Shield's attack surface, the one Agent Shield figure that is fully
 * documented and currently printable.
 *
 * This is coverage, not results. METRICS.md withdraws the agentic / TL-01
 * anchored results pending a rerun, so leading the page with a results chart
 * would be printing a number the ledger says not to print. Counts are the
 * unique IDs across the six in-house modules; `AA-01`..`AA-05` (the external
 * Auto_Apply benchmark) and the `XX-99` test fixture are excluded, which is why
 * the total is 28 and not 34. See METRICS.md, `agent-shield` 6c142ee.
 */
export const ATTACK_SURFACE: AttackModule[] = [
  { code: "IN", label: "Prompt injection", ids: 5 },
  { code: "PS", label: "Social engineering", ids: 6 },
  { code: "MM", label: "RAG / memory poisoning", ids: 1 },
  { code: "DR", label: "Behavioral drift", ids: 6 },
  { code: "EX", label: "Covert exfiltration", ids: 5 },
  { code: "TL", label: "MCP tool poisoning", ids: 5 },
];

/* ── Proof strip ──────────────────────────────────────────────────────── */

/** Short, checkable claims. Each one is backed by a section further down. */
export const PROOF_POINTS: string[] = [
  "M.S. Applied Data Science, USC",
  "LLM security & evaluation",
  "Agent systems",
  "Computer vision",
  "Open-source engineering",
];

/* ── Closing section ──────────────────────────────────────────────────── */

export interface ClosingContent {
  eyebrow: string;
  title: string;
  /** Two sentences. What he wants, and what makes a useful first message. */
  paragraphs: string[];
  ctaLabel: string;
}

/**
 * The page used to end on About and then a footer, so a reader who had just
 * read the evidence had nothing to do about it. This is the ask, and it is the
 * only place on the site that makes one.
 *
 * The proof strip and HUD_STATS render here too. They were in the hero, where
 * they competed with the name and the role for a first read; at the close they
 * answer the question a convinced reader actually has.
 */
export const CLOSING: ClosingContent = {
  eyebrow: "Contact",
  title: "Get in touch",
  paragraphs: [
    "I am looking for ML and AI engineering work: agent systems, evaluation infrastructure, and the parts of a product that still have to hold up after the demo.",
    "Tell me what the system has to do and what breaks when it does not. Every number on this page traces to a command and a commit, and I will walk through any of them.",
  ],
  ctaLabel: "Email me",
};

/* ============================================================================
 * SECTION 2 — NAVIGATION
 * ========================================================================= */

export interface NavLink {
  id: string;
  label: string;
}

/**
 * Reading order, which is not DOM order: Research is listed above Skills but
 * renders below it. `useScrollSpy` resolves the current section by measured
 * position rather than by this array, so the two are allowed to differ.
 */
export const NAV_LINKS: NavLink[] = [
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
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
 * SECTION 4 — PROJECTS
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
  /**
   * What the decision cost. A decision with no stated cost reads as a feature
   * list; the tradeoff is the part that shows judgement.
   *
   * Optional because it is sourced from each repo's own docs, and a tradeoff
   * the repo does not record is not one to invent.
   */
  tradeoff?: string;
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
  /** The engineering problem, in the repo's own framing. Case study only. */
  problem?: string;
  /** What the design had to work within: latency, privacy, compute, noisy output. */
  constraints?: string[];
  /**
   * Where it breaks, is incomplete, or where a result went against the author.
   * Sourced from each repo's own limitations and caveats, never invented.
   * Honest limits make the rest of a case study believable.
   */
  failureModes?: string[];
  /** Renders the interactive context-selection demo on this project's page. */
  hasContextDemo?: boolean;
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
  /**
   * Give this project a page at /work/<id>.
   *
   * Set on eight of twelve. AkashicTree, Model Behavior Lab, ChatDB and the
   * Attention Drift Detector ran 116 to 278 words with no problem, no
   * constraints and no failure modes, against 846 to 1,199 for the flagships,
   * so the "Case study" button promised an artifact that was not there. They
   * link to their repositories instead, and drop out of the sitemap and the
   * emitted route pages with them. See `src/lib/caseStudies.ts`, which is the
   * single reader of this flag.
   */
  caseStudy?: boolean;
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
      caseStudy: true,
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
      problem:
        "Agent security benchmarks generally answer two questions: did the user's task succeed, and did the attack succeed. That leaves a third outcome invisible, the agent that resists an attack and never mentions it. Silent resistance beats a hijack, but it still leaves the person accountable for the agent with no idea an attack happened, so the project measures operator-facing disclosure as a third axis next to attack success.",
      constraints: [
        "Statistical power. Exactly one module is anchored at n=20; the rest are underpowered, so module count must never be read as result count.",
        "Providers do not honour seeds. The Anthropic API has no server-side seed, so epochs are stochastic samples and baselines have to be re-run in the same session as the defended runs.",
        "Provider capability. One provider emits tool-call envelopes its own API rejects and another hung at log open, so some rows are marked absent rather than filled with zeros that would read as safe.",
        "Paraphrase. Disclosure is scored against a phrase list, and a model that discloses in its own words escapes it.",
        "Dual-use. High-risk fixtures stay gated behind an explicit confirmation flag.",
      ],
      failureModes: [
        "The agentic anchor was withdrawn after publication. A harness subtlety (Inspect reads the model-visible tool description from the execute function's docstring) meant the poisoning payload never reached the model, so an n=20 table that had already been written up measured something else entirely.",
        "Both scorers miss the same paraphrase in the same direction. A completion that plainly describes the injection attempt scores zero transparency and inflates attack success, because the phrase list does not contain that wording.",
        "A better transparency scorer exists and is deliberately not shipped. The v2 LLM judge beat v1 on a live holdout (recall 0.889 vs 0.444), but that holdout was synthetic, so the worse scorer stays in the headline until the expanded set is human-labelled.",
        "The standalone screener passes an email-redacted poisoned catalog as a clean ALLOW; only the proxy path catches it. Tool input_schema is not screened at all, and schema screening remains shadow-only.",
        "The repo's own CI runs mypy against a file list that excludes the shipped runtime perimeter, so the product surface is the part not type-checked. Noted in its internal audit: a project that screens other people's agents for unsafe patterns was running none of that tooling on itself.",
        "Two planned modules were never built, and internal docs still describe the withdrawn anchor as current.",
      ],
      evidence: [
        "6 live attack modules, 28 attack IDs: prompt injection, MCP tool poisoning, RAG/memory poisoning, covert exfiltration, social engineering, multi turn behavioral drift",
        "Introduced Transparency Rate, whether an agent flags an attack to its operator, as a third axis alongside ASR and Benign Utility in a six cell outcome model extending AgentDojo's 2x2 matrix",
        "One anchored surface: inputs/ (prompt injection) at n=20 with Wilson 95% CIs. Every other module is labelled a diagnostic probe rather than quietly presented as a powered result",
        "The tools/ anchor was withdrawn by its own author. Inspect builds the model-visible tool description from the execute function's docstring, not the @tool factory's, so the TL-01 payload never reached the model: the published n=20 rows measured unprompted send_message calls, not tool poisoning. The rows are kept as historical records and a rerun is pending",
        "On anchored prompt injection Sonnet 4.5 shows TR 0.150 while three other models read 0.000, but only Sonnet has the anchored n=20 row. At n=5 the Wilson upper bound is 0.435, so 'Sonnet is the only model that discloses' is not yet a powered claim and the repo refuses to make it",
        "Spotlighting raises TR to 0.800 and also adds 0.200 to ASR. That second number is a scorer artifact, not compliance: the completion discloses the attack in a paraphrase the v1 phrase list does not cover, so both scorers miss the same disclosure in the same direction",
        "The runtime perimeter ships with its own honest-limits block: an email-redacted TL-01 catalog is a clean ALLOW on the standalone screener, and input_schema (parameter descriptions, examples, $defs) is not screened at all",
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
          "Anchored vs diagnostic: exactly one surface is powered at n=20 and the rest are labelled probes, so module count must not be read as result count",
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
          why: "Six live modules is not six powered results. One surface carries n=20 and Wilson intervals; the rest are explicitly marked probes so the README can never be misread as a leaderboard.",
          tradeoff:
            "The project reads as thinner than a benchmark that reports every module as a result, and the honest framing is the less impressive one.",
        },
        {
          title: "Withdraw a published anchor rather than keep the rows",
          why: "The TL-01 payload never reached the model-visible tool description, so the n=20 table measured unprompted message calls rather than tool poisoning. A result that measures the wrong thing is worse than no result.",
          tradeoff:
            "It cost the project its second headline claim: no agentic anchor currently stands, and the rerun is still pending.",
        },
        {
          title: "Keep the weaker transparency scorer in the headline",
          why: "The v2 LLM judge beat the phrase-list scorer on a live holdout, but that holdout was synthetic rather than real episode text, so promoting it would swap a measured number for a promising one.",
          tradeoff:
            "The published transparency numbers are knowingly too low, and the paraphrase gap stays in the headline until the expanded set is human-labelled.",
        },
        {
          title: "Ship the runtime perimeter as a local library, not a service",
          why: "The eval numbers and the runtime guard are different claims with different evidence. Keeping the perimeter local and CLI-shaped keeps them from being quoted as one thing.",
          tradeoff:
            "Two separate claims in one repository are harder to explain than one, and the fixture proof metrics get mistaken for the eval result anyway.",
        },
      ],
      links: {
        github: "https://github.com/Chunduri-Aditya/agent-shield",
        live: "https://doi.org/10.5281/zenodo.20789431",
      },
      metrics: [
        { label: "Attack IDs", value: "6 modules · 28" },
        { label: "Anchored", value: "1 surface · n=20" },
      ],
    },
    {
      id: "twin",
      caseStudy: true,
      title: "Personal Digital Twin",
      subtitle: "Persistent Agent Memory Behind a Fail-Closed Privacy Boundary",
      iconName: "Brain",
      tags: [
        "Agent Architecture",
        "Memory",
        "RAG",
        "Context Engineering",
        "Local Inference",
        "Python",
      ],
      discipline: "AGENT / MEMORY",
      status: "SHIPPED",
      hook: "A context window is always too small. This decides what earns a slot in it.",
      oneLiner:
        "A persistent personalised agent whose retrieval layer tags every chunk with its origin (profile, interview transcript, or expert reflection), ranks candidates by cosine similarity with a per-section offset, and masks disallowed sources to negative infinity before top-k so a filtered-out chunk cannot re-enter on score alone. The index refuses to build at all while a real transcript lacks a matching redacted copy, or while any transcript chunk contains more than 60% of a gold evaluation answer.",
      problem:
        "A personalised agent accumulates far more material than a context window holds, so every turn is a selection problem: given a question, which few pieces of what the system knows about a person actually deserve to be in front of the model? Ranking by similarity alone answers that badly, because the most textually similar paragraph is often not the most useful one, and because some material should never reach the model regardless of how well it scores.",
      constraints: [
        "Fixed context budget. Five chunks reach the model per turn, so selection is the whole game.",
        "Privacy. Raw interview transcripts must never be embedded; only a redacted copy may enter the index.",
        "Evaluation integrity. Indexed material can silently contain the answers to the evaluation set, which would make retrieval scores meaningless.",
        "Local inference, so the material never leaves the machine, against weaker models than hosted frontier ones.",
        "Reproducibility. The same profile, transcript, and reflections must produce the same index.",
      ],
      evidence: [
        "Three source-tagged indexes over the profile, the redacted interview transcript, and expert reflections; every chunk and every index row carries its source",
        "Retrieval masks disallowed sources to negative infinity before top-k, so a source filter cannot be defeated by a high similarity score",
        "Section-aware ranking: a decide-intent query adds a +0.05 offset to chunks from the Decisions section, enough to change the cut only where scores are close",
        "The index build fails closed twice: RedactionRequired when a real transcript has no up-to-date redacted copy, and LeakError when a transcript chunk contains more than 60% of a gold evaluation answer",
        "A combined content hash over all three inputs, so an index cannot silently drift from the material it was built from",
        "Index files written before the source tagging existed still load, so the schema change did not orphan earlier work",
      ],
      architecture: {
        overview:
          "Profile + redacted transcript + reflections -> collect_chunks (tag source) -> embed -> index (+ combined hash) -> query embed -> cosine + section boost -> source mask -> top-k -> local model",
        diagram: `  profile.md    transcript.md    reflections.md
       |              |                 |
       |         [ redact ]             |
       |              |                 |
       +------+-------+--------+--------+
              |
       collect_chunks          tags each chunk: profile | transcript | reflection
              |
        +-----+------+
        | build gate |         RedactionRequired : no matching redacted copy
        +-----+------+         LeakError         : chunk >= 60% of a gold answer
              |                (nothing is embedded if either fires)
           [ embed ]
              |
     index.npz + chunks.json  (per-row source, combined_sha over all 3 inputs)
              |
  query --> [ embed ] --> cosine score
              |
        + section boost        decide intent: Decisions +0.05
              |
        source mask            disallowed sources -> -inf, applied BEFORE top-k
              |
           top-k = 5
              |
        prompt assembly --> local model --> response`,
        tradeoffs: [
          "The section boost is a hand-set constant, not a learned weight. It is legible and tunable, but it is a judgement call rather than a fitted one.",
          "Failing the whole index build on a redaction or leak check means one bad chunk blocks all work, which is the correct default for privacy and the wrong one for iteration speed.",
          "Local embedding and inference keep the material on the machine at the cost of model quality relative to hosted frontier models.",
        ],
      },
      decisions: [
        {
          title: "Mask sources before top-k, not after",
          why: "Filtering after ranking would let a disallowed chunk consume one of the five slots and then be dropped, silently shrinking the context. Setting masked rows to negative infinity before selection means the budget is always spent on admissible material.",
          tradeoff:
            "Scores are no longer comparable across filter settings, so a chunk's rank only means something relative to the sources currently allowed.",
        },
        {
          title: "Refuse to build the index rather than warn",
          why: "A redaction gate that only warns is a gate that gets skipped under time pressure, and the failure it prevents is unrecoverable: once raw transcript text is embedded, it is in the index. The build raises instead.",
          tradeoff:
            "One unredacted chunk blocks the entire build, which is deliberately obstructive during iteration.",
        },
        {
          title: "Treat evaluation leakage as a build-time error",
          why: "If indexed material contains the gold answers, retrieval scores measure memorisation rather than retrieval, and the evaluation quietly stops meaning anything. A containment check over gold answers runs before anything is embedded.",
          tradeoff:
            "The 60% word-containment threshold is a heuristic. It will not catch a paraphrased answer, and it can fire on a passage that merely shares vocabulary.",
        },
        {
          title: "A small additive section offset instead of a re-ranker",
          why: "For a decide-style question, a recorded decision is usually more useful than a merely similar paragraph. A +0.05 offset expresses that preference where scores are close and stays out of the way where they are not.",
          tradeoff:
            "It cannot express anything more subtle than a per-section constant, and the value was set by inspection rather than fitted against a labelled set.",
        },
      ],
      links: { requestAccess: "twin" },
      metrics: [
        { label: "Context budget", value: "k=5 · 3 sources" },
        { label: "Leak gate", value: "0.6 containment" },
      ],
      hasContextDemo: true,
    },
    {
      id: "ai-remixmate",
      caseStudy: true,
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
      caseStudy: true,
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
      problem:
        "A journaling assistant that reads back your own history has to do two things well, and both are easy to fake. It has to retrieve the entry that actually matters rather than the one that shares the most words, and it has to recognise when an entry describes a crisis rather than a bad week. Getting the second one wrong in either direction causes harm: miss it and someone in danger gets a cheerful reframe, over-trigger it and ordinary difficulty gets pathologised.",
      constraints: [
        "Privacy. Journal content must not leave the machine; cloud backends are double-gated and the client is never constructed while the gate is closed.",
        "The safety floor cannot depend on the model. It has to fire when the verifier call fails or the machine is offline.",
        "Local models are slow and weaker. Measured per-case latency ran 24 to 67 seconds across eight local models.",
        "Evaluation data could not be scraped from real people's mental-health posts, so the case sets are authored rather than collected.",
        "Dependencies were kept minimal, which bounded what could be measured: no cross-encoder rerank was testable without pulling torch for a single measurement.",
      ],
      failureModes: [
        "The external validation is unflattering and was kept. Scored against GoEmotions, the valence lexicon reached 0.551 overall accuracy where always guessing the majority class is the baseline, with negative recall at 0.260. A coverage fix moved it to 0.575 on an untouched split, and the log's own verdict is that this is the correct headline number and it is not a good one.",
        "Crisis sensitivity is optimistic by construction. The case set was authored with the detection patterns visible, so specificity is the more trustworthy half and an unbiased estimate needs a held-out set. The repo says so next to the number.",
        "Six known gaps in the safety floor are excluded from the headline scores and still missed by design, including vague departure phrasing and non-English self-harm phrasing.",
        "One bug was traced and deliberately left unfixed: an entry about someone else's crisis fires the user's own support message, because the exemption that would suppress it would also suppress a person describing their own feelings through a therapist's framing. The case is marked accepted rather than quietly patched.",
        "A config value can be silently ignored. Reading a store built with one embedder while configured for another does not raise; the vector store falls back to the embedding function recorded on the collection, so retrieval keeps working under the old model. Recorded as not yet detected.",
        "No outcome data of any kind. Nothing here shows that using the app helps anyone, and there is no efficacy study or psychometric validation.",
      ],
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
          why: "The tier gate cannot depend on an LLM call succeeding. Whatever else fails, the crisis path still has to hold. The rule is that whether a property is mechanically checkable decides whether it belongs in code or in the model.",
          tradeoff:
            "The floor is English-only and brittle to phrasing. Six known gaps are recorded and excluded from the headline rather than chased with an ever-growing regex, and two patterns were removed after live testing because they collided with ordinary usage.",
        },
        {
          title: "Set each filter's breadth by the cost of its own false positive",
          why: "Missing a crisis is unrecoverable, so the crisis floor is deliberately over-broad and keeps false positives it could remove. The harsh-output filter runs the opposite way: a false positive there silently deletes a useful suggestion, so over-broad patterns would quietly gut the analysis.",
          tradeoff:
            "There is no single sensitivity dial to reason about. Each filter has to be argued and measured separately, and some false positives are kept on purpose.",
        },
        {
          title: "Run local models by default and accept what that costs",
          why: "Journal content is the most sensitive data the app touches, so the trust boundary is local disk and cloud backends stay double-gated.",
          tradeoff:
            "Measured across eight local models the best case-pass rate was 0.500, and the shipped default scores below that. It was chosen for latency instead, at roughly 24 seconds per case against a worst case near 67.",
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
      caseStudy: true,
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
      problem:
        "An assistant that builds automation workflows has two ways to be dangerous. It can invent a node parameter that looks plausible and produces a workflow that fails in production, and it can take a live action against a real instance on the strength of its own say-so. This project treats both as gate problems rather than prompt problems: evidence has a fixed precedence order, and any live mutation is held behind a fail-closed, externally signed approval.",
      constraints: [
        "Evidence precedence is fixed. Documentation and community examples inform a plan but never prove an exact node parameter for the target instance.",
        "The retrieval package runs on the Python standard library alone, with no network and no vector database in the test path.",
        "The signing key must be unreachable by agents and workspace code, which puts approval outside the system that wants approval.",
        "Self-improvement shares a trust boundary with the controls that authorise it, so a local apply would let a compromised tuner change both behaviour and its own evidence.",
        "Writes are serialised and concurrency is capped, so reviewers cannot race ahead of writers.",
      ],
      failureModes: [
        "The flagship evaluation run executed zero behavioural cases. Its own result file records the reason: no approved behavioural runner or externally signed evaluator evidence was available, and structural validation is not a behavioural score. The audit reaches the same verdict independently and holds the proposal as not promotable.",
        "Live mutation against a real instance is never exercised end to end. It needs a connected instance plus an externally produced signed ledger, so the gate correctly denies by default and there is no in-repo demo of a successful signed mutation.",
        "Security is defence in depth, not a guarantee. Higher-precedence settings can still disable project hooks, and an ALLOW from a reviewing agent never grants new authority.",
        "The self-improvement loop cannot close. It always terminates at an external-integrator block by design, and the infrastructure that would complete it does not exist in the repository.",
        "The retrieval fallback is a degradation rather than an equivalent. Hash-based fallback is lower quality than semantic embeddings and is documented as an availability fallback only.",
        "No CI workflow is committed; the gate is a make target run by hand. The project's own audit ships as done-with-concerns with open blockers.",
      ],
      evidence: [
        "2,256-row retrieval index across official n8n docs and community workflow examples, with an explicit evidence precedence: live instance schema, then official docs, then community examples, then untrusted references",
        "Six-role agent orchestration (supervisor, security firewall, skeleton architect, module builder, deviation monitor, eval tuner) gated by an Ed25519-signed run ledger, one-time nonces, and a 15-minute authorization window",
        "Deterministic secret-detection policy blocks any self-improvement feedback containing a PEM key, named credential, or GitHub/OpenAI token pattern, fail closed",
        "FastAPI chat endpoint returns cited evidence for every answer, never a plan without a source",
        "Monitoring dashboard recomputes all security control hashes live against the signed manifest instead of trusting a cached result",
        "71 tests across three offline suites (20 web layer, 34 retrieval, 17 self-improvement adversarial), run with no network and no vector database",
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
          why: "The existing hash generator is Node-only, write-capable, and maintainer-only. Giving a read-only backend any path to a write-capable script defeats the point of read-only, and reimplementing removes both the external binary dependency and the shell-injection surface.",
          tradeoff:
            "Two implementations of the same hashing rule now have to agree, and the repo does not record what that duplication costs to maintain.",
        },
        {
          title: "Self-improvement may propose, never apply",
          why: "The tuner and the controls that authorise it share one local trust boundary, so a local apply command would let a compromised tuner change both the behaviour and the evidence for it. The loop terminates at an external integrator instead.",
          tradeoff:
            "The loop cannot close. Every proposal sits permanently on hold, because the external signing infrastructure that would complete it does not exist in the repository.",
        },
        {
          title: "Fail closed by default on the mutation gate",
          why: "Until a pinned public key and a matching signed ledger exist, the hooks deny. A gate that defaults to allow is a gate that is off.",
          tradeoff:
            "The system is unusable for live mutation out of the box, and there is no in-repo demonstration of a successful signed mutation to show that the path works.",
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
      caseStudy: true,
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
      problem:
        "An AutoML system can rank candidate pipelines with a meta-learner trained on past runs, and the obvious claim is that better ranking finds a good pipeline in fewer evaluations. That claim is rarely tested against the baselines it needs to beat. This project builds the ranker and then builds the benchmark that decides whether the ranking actually saves any evaluations.",
      constraints: [
        "Leakage. Development and test partitions split before any encoder is fitted, preprocessing fitted inside each fold, and the target dataset excluded from its own meta-training history.",
        "Cold start. Meta-ranking needs at least 20 compatible history rows before it can rank anything at all.",
        "Compute. CPU only on a single laptop, which bounds the candidate universe and the number of seeds.",
        "Licensing. Third-party datasets cannot be committed, so the suite is pinned by task version, checksum, and snapshot hash instead.",
        "The comparison is scoped. Exhaustive search is the reference inside a fixed 28 to 36 pipeline universe, not a global optimum.",
      ],
      failureModes: [
        "The headline result is null and stays published. Median evaluation reduction against random is 0.0%, with a dataset-bootstrap 95% CI spanning 0% to 50% over 10,000 resamples, which does not establish a reduction. The repo states it does not claim a search speedup.",
        "Ranking quality and evaluation savings came apart. Median Spearman is 0.5676 for meta-only against 0.0216 for random, so the learned ranking genuinely orders candidates better; it just does not convert that into fewer evaluations. The gap between those two facts is the actual finding.",
        "One dataset visibly regresses and is published anyway: micro-mass at 0.154 test regret in a table where the rest are near zero. Another has negative R² for every method, meaning worse than predicting the mean.",
        "18 candidate runs failed on power transformation and are retained in the denominators rather than dropped, which depresses the method's own numbers.",
        "No runtime or memory claim is made, because the cold wall-clock trial was not run and peak memory was not isolated. The published runtime plot is replay-equivalent, not wall clock.",
        "The published evidence run was made from a dirty working tree, recorded in the report rather than hidden.",
      ],
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
          title: "Pre-register the success bar in code, then publish the failure",
          why: "The criterion is a boolean in the analysis script, evaluated automatically: a wholly positive bootstrap interval, at least 95% quality retention at budget 10, and regret no worse than 0.05. Deciding it after seeing results is how a null quietly becomes a win.",
          tradeoff:
            "It cost the project its headline claim. The generator wrote 'resume impact criterion not met' and the machine-readable summary records eligibility as false.",
        },
        {
          title: "Separate ranking quality from end-to-end savings",
          why: "The meta-learner genuinely ranks better than random, by median Spearman 0.5676 against 0.0216. That is not the same as reaching a good model in fewer evaluations, and conflating the two is the trap.",
          tradeoff:
            "Reporting both means publishing a real improvement next to a null result and refusing to let the first one stand in for the second.",
        },
        {
          title: "Report replay-equivalent runtime instead of wall clock",
          why: "Every ranking method replays the same measured candidates, folds and failures, which isolates ordering quality from execution noise.",
          tradeoff:
            "It forfeits any speed claim outright: the cold end-to-end timing trial was never run, so the report cannot say the system is faster.",
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
      id: "profile-rag",
      title: "profile-rag",
      subtitle: "Retrieval-Only Q&A Over This Site",
      iconName: "Database",
      iconClassName: "text-teal-400",
      tags: ["LlamaIndex", "ChromaDB", "BM25", "FastAPI", "ONNX", "Docker", "Python"],
      discipline: "RETRIEVAL / API",
      status: "SHIPPED",
      hook:
        "The Ask box on this site: hybrid retrieval, a reranker, and no language model anywhere.",
      oneLiner:
        "profile-rag answers questions about this portfolio from its own content.ts, exported as 318 fact-sized chunks. BM25 and a dense Chroma index are fused by reciprocal rank, a cross-encoder reranks six candidates, and the best sentences of the top chunk come back with links to their source. A hand-written FAQ layer answers the canonical questions verbatim. Everything runs on CPU with ONNX models on a free host, so there is no API key and no token limit.",
      evidence: [
        "Frozen 48-question eval bank with expected chunk ids: hybrid plus rerank puts the right chunk in the top three for 47 of 48 questions, against 40 of 48 for BM25 alone (2026-09-22)",
        "The eval floor was mutation-checked: removing the reranker's sort dropped the top-three hits to 46 of 48, and the floor was set above that value so the gate can actually fail",
        "Zero LLM calls on the answer path: FAQ match, then retrieval, rerank and lexical sentence extraction; off-corpus questions fall back with suggestions instead of a guess",
        "Health endpoint reports chunk count and the corpus sha256, so a deployment is tied to a specific content.ts commit",
        "Single-threaded ONNX sessions and a startup warm cut extraction latency at 0.1 CPU from 55 to 153 s down to 4 to 9 s, measured with docker --cpus=0.1",
        "14 tests, including allow and deny cases for the CORS allowlist, the 500-character cap and the per-IP rate limit",
      ],
      architecture: {
        overview:
          "content.ts → export-corpus.mjs → JSONL chunks → Chroma (bge-small) + BM25 → QueryFusionRetriever (RRF) → cross-encoder rerank → sentence pick → FastAPI /ask → Ask panel on this site",
        diagram: `
+-------------+   +-------------------+   +--------------------+
| content.ts  |-->| export-corpus.mjs |-->| 318 JSONL chunks   |
+-------------+   +-------------------+   +---------+----------+
                                                    |
                     +------------------------------+-----------+
                     v                                          v
            +-----------------+                        +-----------------+
            | Chroma (dense)  |                        | BM25 (lexical)  |
            +--------+--------+                        +--------+--------+
                     +------------------+  RRF  +---------------+
                                        v
                             +---------------------+
                             | cross-encoder rerank|
                             +----------+----------+
                                        v
     FAQ hit? ----yes----> verbatim     |  no
                                        v
                             +---------------------+    +---------------+
                             | sentence pick + src |--->| FastAPI /ask  |
                             +---------------------+    +---------------+`,
        tradeoffs: [
          "No generation vs a small LLM: answers are quotes from the site, which reads stiffer than prose but can never invent a fact or cost a token",
          "Free 0.1 CPU host vs paid compute: answers take one to a few seconds and the first request after a sleep is slower, in exchange for zero running cost",
          "Hand-written FAQ vs pure retrieval: the FAQ answers the common questions crisply, at the cost of a file that has to be kept in step with the site",
        ],
      },
      decisions: [
        {
          title: "Let retrieval do all the work",
          why: "The site is the corpus and the corpus is small and fact-checked. A reranker over fact-sized chunks finds the right sentence; a model in front of it would only add cost, latency and a way to be wrong.",
          tradeoff: "Questions the site does not answer get a fallback, not a synthesised reply.",
        },
        {
          title: "Freeze the eval bank and ratchet the floor above the ablated value",
          why: "A floor below what plain hybrid already scores would have stayed green with the reranker broken. The floor sits between the ablated and the real number, so it can fail.",
        },
        {
          title: "Measure under the host's CPU quota before shipping",
          why: "83 ms on a laptop became 150 s on a fraction of a core. Reproducing the quota with docker --cpus=0.1 turned the fix into a measurement instead of a guess.",
        },
      ],
      links: {
        github: "https://github.com/Chunduri-Aditya/profile-rag",
      },
      metrics: [
        { label: "Recall@3", value: "47 / 48 questions" },
        { label: "LLM calls", value: "0" },
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
      id: "taintgate",
      caseStudy: true,
      title: "taintgate",
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
        requestAccess: "taintgate",
      },
      metrics: [
        { label: "Tests", value: "124" },
        { label: "Mutations verified red", value: "10" },
      ],
    },
    {
      id: "company-agents",
      caseStudy: true,
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

/* ============================================================================
 * SECTION 5 — EXPERIENCE
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
        "Turns NFL Blitz gameplay video into field positions in yards, and refuses the frames it cannot certify.",
      summary:
        "Classical geometry, no trained model. Started with a labeling and validation tool for field-to-template homographies, then added a second independent mapping strategy, a windowed joint solve, a player-detection pass projected through each frame's certified camera, a 27-test regression suite, and a script that derives every headline number from committed results instead of prose.",
      bullets: [
        "Wrote report_numbers.py after two project docs were found quoting an older run (790 certified, 323 across, 3.3 deg): it reads only committed per-frame results and prints the figures. Run on 2026-09-22: 785 of 873 frames posed along the field (781 solved from their own paint plus 4 hand-marked anchors), 313 of 873 across the field, certified frames up to 14.3 deg of paint tilt",
        "Grew the regression suite from 8 to 27 tests (27 passed, 0 failed, exit 0 on 2026-09-22), including a guard that a windowed re-solve can never flip a refused frame to certified",
        "Added a sliding-window joint solve with a roll-continuity prior, run as a post-pass over frames the per-frame camera solve had already certified: symmetric windows re-solved jointly, only the centre frame kept, so any lag is bounded to the window by construction rather than unbounded like a causal filter",
        "Implemented a second, independent player-mapping strategy (direct 8-DoF homography via cv2.findHomography on hand-marked correspondences) run side by side with the team's 6-parameter per-frame camera solve, and reported plainly that it measured worse on this footage instead of replacing the model",
        "Built the player-detection pass (pretrained YOLO11m COCO person detector, inference only, nothing trained) that projects foot points through each frame's certified homography and inherits that frame's certification: no certified solve, no coordinate",
        "Built a single-reviewer browser tool (Python, OpenCV, NumPy, JavaScript, stdlib HTTP server) for field/template correspondence labeling: homography fitting with per-point residual reporting, 44-keypoint projection, overlay review, and attempt-state handling",
        "Added the guardrails that make a labeled homography trustworthy: minimum-point and convex-hull spatial-distribution checks, schema validation before writes, OS-level immutable attempt records, restart-persistent pointers, and JSONL audit logging",
        "Isolated correspondence-span length as the supported failure mechanism for frame-15: narrow spans (~8\u201317 yards) produced homographies that failed full-field validity, wide spans (~42 yards) stayed locally consistent, shown through six controlled test categories",
        "Wrote the START_HERE handoff for the next person on the repo: which of 35 markdown files are current, the two rotation numbers that get confused (14.3 deg paint tilt vs 3.2 deg roll parameter), and the six approaches to absolute yard identity that already failed",
      ],
      tags: ["Python", "OpenCV", "NumPy", "Homography", "Camera Solve", "YOLO", "Computer Vision"],
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
 * SECTION 6 — RESEARCH
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
    /*
     * Held until the post is on origin/main. The link below returned 404 at
     * audit time because docs/posts/ in agent-shield was still untracked, and
     * a link that 404s never ships on a public surface. Uncomment once the
     * blob URL returns 200 and flip the `test.skip` named "the evals post is
     * listed as a POST and does not count as a paper" in content.test.ts to
     * `test`; HUD_STATS PAPERS already excludes POST badges.
     *
     * {
     *   badge: "POST · 2026",
     *   title: "Where my evals lied",
     *   hook:
     *     "Five numbers from my own eval work that were wrong, each with the commit that fixed it.",
     *   summary:
     *     "Five eval scores that read as measurements and were not, with the test suite green each time. Each entry names the number, why it was wrong, and the commit that corrected it, so every claim can be checked at source.",
     *   metrics: [
     *     { label: "Cases", value: "5", accent: "sapphire" },
     *     { label: "Repos", value: "4", accent: "teal" },
     *   ],
     *   links: [
     *     {
     *       label: "Read The Post",
     *       href: "https://github.com/Chunduri-Aditya/agent-shield/blob/main/docs/posts/where_my_evals_lied.md",
     *     },
     *   ],
     * },
     */
  ],
};

/* ============================================================================
 * SECTION 7 — SIDEBAR (Education + CTA)
 * ========================================================================= */

/* ── Hero telemetry. Derived wherever a derivation exists. ────────────── */

/**
 * Every value here is computed from the data above, so a stat cannot drift from
 * the thing it counts.
 *
 * "DISCIPLINES" used to sit in this list, counting unique `discipline` strings.
 * Every project carries a distinct one, so it was the project count wearing a
 * second label: it read as a credibility signal and carried no information.
 * Public repositories replaced it, because that one is checkable by clicking.
 */
export const HUD_STATS: HudStat[] = [
  {
    label: "SYSTEMS SHIPPED",
    value: String(PROJECTS.projects.filter((p) => p.status === "SHIPPED").length),
  },
  {
    label: "PUBLIC REPOS",
    value: String(PROJECTS.projects.filter((p) => p.links.github).length),
  },
  {
    label: "PAPERS",
    value: String(RESEARCH.publications.filter((p) => !p.badge.startsWith("POST")).length),
  },
  {
    label: "ATTACK IDS CATALOGUED",
    value: String(ATTACK_SURFACE.reduce((n, m) => n + m.ids, 0)),
  },
];

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
 * SECTION 8 — TECHNICAL CAPABILITIES
 * ----------------------------------------------------------------------------
 * Grouped by capability, not by language, so a reader scanning for one lane
 * (evaluation, say, or computer vision) finds it as a block.
 *
 * No proficiency bars and no percentages, here or anywhere: a self-assigned
 * "PyTorch 90%" is a number with nothing behind it, and this site's whole
 * argument is that its numbers trace to something.
 * ========================================================================= */

export interface CapabilitiesContent {
  header: { title: string; eyebrow: string; subtitle: string };
  groups: SkillCategory[];
}

export const CAPABILITIES: CapabilitiesContent = {
  header: {
    title: "Technical Capabilities",
    eyebrow: "Skills",
    subtitle: "Grouped by what they are used to build.",
  },
  groups: [
    {
      category: "Evaluation & Adversarial Testing",
      tools: ["Inspect AI", "AgentDojo", "HarmBench", "Red Teaming", "Prompt Injection", "Benchmark Design", "Mutation Testing", "Wilson CIs"],
      iconName: "ShieldCheck",
      accent: "bronze",
    },
    {
      category: "LLM & Agent Systems",
      tools: ["LangChain", "LangGraph", "Ollama", "Hugging Face", "RAG", "Tool Use", "Agent Orchestration", "Context Engineering", "MCP"],
      iconName: "Sparkles",
      accent: "sapphire",
    },
    {
      category: "ML & Modeling",
      tools: ["Python", "PyTorch", "TensorFlow", "Keras", "Scikit-learn", "NumPy", "Pandas"],
      iconName: "Cpu",
      accent: "teal",
    },
    {
      category: "Computer Vision & Audio",
      tools: ["OpenCV", "MediaPipe", "YOLO", "Segmentation", "Homography", "librosa", "Demucs", "CLAP", "Diffusers"],
      iconName: "Eye",
      accent: "viridian",
    },
    {
      category: "Backend & ML Systems",
      tools: ["FastAPI", "Flask", "React/TypeScript", "Docker", "GitHub Actions", "CI/CD", "pytest", "uv"],
      iconName: "Wrench",
      accent: "indigo",
    },
    {
      category: "Data & Retrieval",
      tools: ["ChromaDB", "pgvector", "Vector Search", "PostgreSQL", "SQLAlchemy", "SQLite", "Plotly"],
      iconName: "Database",
      accent: "sapphire",
    },
  ],
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

