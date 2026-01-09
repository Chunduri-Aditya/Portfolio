import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Terminal,
  Cpu,
  Database,
  Network,
  GitBranch,
  ArrowRight,
  BookOpen,
  Layers,
  Eye,
  Lock,
  Activity,
  FileText,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
  Mail,
  Github,
  Linkedin,
  Search,
  Filter,
  Sparkles,
  Rocket,
  ShieldCheck,
  Wrench,
  Gauge,
  CheckCircle2,
  XCircle,
  Play,
  ScrollText,
  Boxes,
  Timer,
  ArrowUpRight,
  Brain,
  Music,
} from "lucide-react";
import FaqBot from "./FaqBot";

/** -----------------------------
 * Helper Functions
 * ----------------------------- */
// Get the correct path for public assets (handles base path for GitHub Pages)
const getPublicPath = (path: string): string => {
  const base = import.meta.env.BASE_URL;
  // Remove leading slash from path if base already has trailing slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

/** -----------------------------
 * Type Definitions
 * ----------------------------- */
type Mode = "signal" | "story";

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

interface Project {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  tags: string[];
  oneLiner: string;
  story: string;
  evidence: string[];
  architecture: ProjectArchitecture;
  decisions: ProjectDecision[];
  links: ProjectLinks;
  metrics: ProjectMetric[];
}

/** -----------------------------
 * Small hooks (no deps)
 * ----------------------------- */
function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    // lock scroll while preserving layout
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [locked]);
}

/**
 * Focus pattern:
 * - Store previously focused element
 * - On open, focus close button
 * - On close, restore focus
 *
 * This aligns with WAI-ARIA dialog focus guidance.  [oai_citation:2‡W3C](https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/)
 */
function useDialogFocus(open: boolean, closeBtnRef: React.RefObject<HTMLButtonElement>) {
  const prevFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      prevFocusRef.current = document.activeElement as HTMLElement | null;
      // Wait a tick so the button exists in the DOM
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    } else {
      prevFocusRef.current?.focus?.();
    }
  }, [open, closeBtnRef]);
}

/** -----------------------------
 * Helper Components
 * ----------------------------- */
const NavLink = memo(function NavLink({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
        active
          ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
      }`}
    >
      {label}
    </button>
  );
});

const ModeToggle = memo(function ModeToggle({
  mode,
  setMode,
}: {
  mode: Mode;
  setMode: (mode: Mode) => void;
}) {
  const next = mode === "signal" ? "story" : "signal";
  return (
    <button
      type="button"
      onClick={() => setMode(next)}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-800 transition-colors text-xs font-mono"
      aria-label={`Switch to ${next} mode`}
    >
      {mode === "signal" ? (
        <>
          <ToggleLeft size={16} className="text-slate-400" />
          <span className="text-slate-400">Signal</span>
        </>
      ) : (
        <>
          <ToggleRight size={16} className="text-purple-400" />
          <span className="text-purple-400">Story</span>
        </>
      )}
    </button>
  );
});

const ProofChip = memo(function ProofChip({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 border border-slate-800 text-sm text-slate-300">
      {icon}
      <span>{text}</span>
    </div>
  );
});

const SectionHeader = memo(function SectionHeader({
  title,
  subtitle,
  icon,
  right,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">{icon}</div>
        <div>
          <h3 className="text-3xl font-bold text-slate-100 mb-2">{title}</h3>
          <p className="text-slate-400 text-sm max-w-2xl">{subtitle}</p>
        </div>
      </div>
      {right && <div>{right}</div>}
    </div>
  );
});

const ValueLine = memo(function ValueLine({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3 rounded-xl border border-slate-800 bg-slate-950/20 p-4">
      <div className="shrink-0 w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="text-slate-100 font-semibold text-sm mb-1">{title}</div>
        <div className="text-xs text-slate-400 leading-relaxed">{text}</div>
      </div>
    </div>
  );
});

const MetricCard = memo(function MetricCard({
  label,
  value,
  accent = "cyan",
}: {
  label: string;
  value: string;
  accent?: "cyan" | "purple" | "blue" | "green";
}) {
  const accentColors: Record<string, string> = {
    cyan: "text-cyan-400 border-cyan-500/20 bg-cyan-500/10",
    purple: "text-purple-400 border-purple-500/20 bg-purple-500/10",
    blue: "text-blue-400 border-blue-500/20 bg-blue-500/10",
    green: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
  };
  return (
    <div className={`rounded-lg border p-3 ${accentColors[accent]}`}>
      <div className="text-xs font-mono text-slate-500 mb-1">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
});

const ProjectCard = memo(function ProjectCard({
  project,
  mode,
  onOpen,
}: {
  project: Project;
  mode: Mode;
  onOpen: () => void;
}) {
  const isStory = mode === "story";

  return (
    <button
      type="button"
      id={project.id}
      onClick={onOpen}
      className="text-left rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/50 to-slate-950 p-6 hover:border-slate-700 transition-all cursor-pointer group focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
      aria-label={`Open project: ${project.title}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 group-hover:border-slate-700 transition-colors">
            {project.icon}
          </div>
          <div>
            <h4 className="text-xl font-bold text-slate-100 mb-1">{project.title}</h4>
            <p className="text-sm text-slate-400 font-mono">{project.subtitle}</p>
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
      </div>

      <p
        className={`text-sm leading-relaxed mb-4 ${
          isStory ? "text-slate-300" : "text-slate-400"
        }`}
      >
        {isStory ? project.story : project.oneLiner}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 bg-slate-900/50 border border-slate-800 text-slate-400 rounded-md font-mono"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
        {project.metrics.map((m, idx) => (
          <div key={idx} className="flex items-center gap-1">
            <span className="text-slate-600">{m.label}:</span>
            <span className="text-slate-400">{m.value}</span>
          </div>
        ))}
      </div>
    </button>
  );
});

/** -----------------------------
 * Modal
 * ----------------------------- */
function ProjectModal({
  project,
  mode,
  onClose,
}: {
  project: Project;
  mode: Mode;
  onClose: () => void;
}) {
  const isStory = mode === "story";
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useLockBodyScroll(true);
  useDialogFocus(true, closeBtnRef);

  // ESC close
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const titleId = `dialog-title-${project.id}`;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onMouseDown={(e) => {
        // Only close if clicking the backdrop itself (not child content)
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-w-4xl w-full bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 p-6 flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              {project.icon}
            </div>
            <div className="flex-1">
              <h3 id={titleId} className="text-2xl font-bold text-slate-100 mb-1">
                {project.title}
              </h3>
              <p className="text-sm text-slate-400 font-mono">{project.subtitle}</p>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
            aria-label="Close modal"
          >
            <XCircle className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-sm font-mono text-slate-500 mb-2 uppercase tracking-widest">
              {isStory ? "The Story" : "Overview"}
            </h4>
            <p className={`text-base leading-relaxed ${isStory ? "text-slate-200" : "text-slate-300"}`}>
              {isStory ? project.story : project.oneLiner}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-mono text-slate-500 mb-3 uppercase tracking-widest">Evidence</h4>
            <ul className="space-y-2">
              {project.evidence.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-mono text-slate-500 mb-3 uppercase tracking-widest">Architecture</h4>
            <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 mb-3">
              <p className="text-sm text-slate-300 mb-3 font-mono">{project.architecture.overview}</p>
              <pre className="text-xs text-slate-400 font-mono overflow-x-auto whitespace-pre">
                {project.architecture.diagram}
              </pre>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-mono text-slate-500 mb-2">Tradeoffs:</p>
              {project.architecture.tradeoffs.map((tradeoff, idx) => (
                <div key={idx} className="text-sm text-slate-400 flex items-start gap-2">
                  <span className="text-slate-600">•</span>
                  <span>{tradeoff}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-mono text-slate-500 mb-3 uppercase tracking-widest">Key Decisions</h4>
            <div className="space-y-3">
              {project.decisions.map((decision, idx) => (
                <div key={idx} className="bg-slate-950/30 border border-slate-800 rounded-xl p-4">
                  <div className="text-sm font-semibold text-slate-200 mb-1">{decision.title}</div>
                  <div className="text-xs text-slate-400 italic">{decision.why}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-200 transition-colors"
              >
                <Github size={16} />
                GitHub
              </a>
            )}
            {project.links.live && project.links.live !== "#" && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-200 transition-colors"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
            {project.links.demo && project.links.demo !== "#" && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-sm text-white transition-colors"
              >
                <Play size={16} />
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** -----------------------------
 * Data (single source of truth)
 * ----------------------------- */
const PROJECTS: Project[] = [
  {
    id: "akashic-tree-web",
    title: "AkashicTree Web Platform",
    subtitle: "Automated GenAI Media Pipeline",
    icon: <Sparkles className="w-6 h-6 text-purple-400" />,
    tags: ["Flask", "LangChain", "Stable Diffusion", "Coqui TTS", "MoviePy", "ChromaDB"],
    oneLiner:
      "An end-to-end content pipeline that turns a brief into scripts, visuals, voice, and assembled video—with quality gates and traceable stages.",
    story:
      "Marketing needs speed *and* brand safety. I built a pipeline that generates scripts, images, voiceovers, and final videos, then blocks output when brand constraints fail. It ships fast, but it doesn’t ship lies.",
    evidence: [
      "Script generation with brand constraints + validation",
      "Image generation via Stable Diffusion",
      "Voice synthesis with Coqui TTS",
      "Video assembly with MoviePy",
      "Quality gates that stop bad generations early",
      "Batch generation + repeatable runs (configs/logs)",
    ],
    architecture: {
      overview: "Brief → Script Gen → Brand Check → Image Gen → Voice Gen → Assembly → Quality Gate → Video",
      diagram: `
+-----------+   +-----------+   +-----------+   +-----------+
|  Brief    |-->|  Script   |-->|   Brand   |-->|   Image   |
|           |   |   Gen     |   |   Check   |   |   Gen     |
+-----------+   +-----------+   +-----------+   +-----------+
                                                             |
                                                             v
+-----------+   +-----------+   +-----------+   +-----------+
|   Video   |<--|  Quality  |<--| Assembly  |<--|  Voice    |
|  Output   |   |   Gate    |   | (MoviePy) |   |   Gen     |
+-----------+   +-----------+   +-----------+   +-----------+
`,
      tradeoffs: [
        "Speed vs correctness (quality gates add time, prevent damage)",
        "Local-first control vs cloud scale (biased toward control + privacy)",
        "Batch throughput vs live UX (supports both paths)",
      ],
    },
    decisions: [
      { title: "Quality gates", why: "It’s cheaper to block bad output than to clean it later." },
      { title: "Modular stages", why: "Swap/upgrade any stage without rewiring the whole system." },
      { title: "Traceable runs", why: "Generative systems need receipts (logs/configs/artifacts)." },
    ],
    links: {
      github: "https://github.com/Chunduri-Aditya/Automated-GenAI-Media-Pipeline-Akashic-Tree",
      live: "#",
      demo: "#",
    },
    metrics: [
      { label: "Output", value: "Video assets" },
      { label: "Design", value: "Quality-gated" },
    ],
  },
  {
    id: "ai-health-journal",
    title: "The External Memory",
    subtitle: "AI Health Journal (Local-First)",
    icon: <Lock className="w-6 h-6 text-emerald-400" />,
    tags: ["RAG", "LangChain", "Whisper", "Local-First", "Privacy", "Flask"],
    oneLiner:
      "A journaling assistant that grounds responses in your own history using retrieval—built to be calm, private, and verifiable.",
    story:
      "I wanted reflection without exporting my private thoughts into someone else’s dataset. So I built a journal that remembers selectively: it retrieves relevant moments and responds with context—not vibes.",
    evidence: [
      "Voice input (Whisper) → structured notes",
      "Vector retrieval grounding (history-backed answers)",
      "Multi-model support (Ollama) with safer “quality mode”",
      "Local-first defaults for privacy",
    ],
    architecture: {
      overview: "Voice/Text → Normalize → Embed → Retrieve → Compose Prompt → Generate → Verify",
      diagram: `
+---------+   +-----------+   +---------+   +-----------+   +-----------+
|  Voice  |-->| Whisper   |-->|  Text   |-->|  Embed    |-->|  Vector   |
+---------+   +-----------+   +---------+   +-----------+   |  Store    |
                                                             +-----+-----+
                                                                   |
                                                                   v
                                                           +---------------+
                                                           |   Retrieve    |
                                                           +-------+-------+
                                                                   |
                                                                   v
                                                           +---------------+
                                                           |  Compose +    |
                                                           |  Grounded LLM |
                                                           +-------+-------+
                                                                   |
                                                                   v
                                                           +---------------+
                                                           | Verify/Revise |
                                                           +---------------+
`,
      tradeoffs: [
        "Privacy vs convenience (local-first default, optional cloud later)",
        "Recall vs relevance (tight retrieval + prompt framing)",
        "Speed vs groundedness (verification is slower, safer)",
      ],
    },
    decisions: [
      { title: "Retrieval grounding", why: "Memory should be targeted, not noisy." },
      { title: "Local-first baseline", why: "Sensitive inputs deserve default privacy." },
      { title: "Verification stage", why: "The best hallucination is the one you never ship." },
    ],
    links: {
      github: "https://github.com/Chunduri-Aditya/ai-health-journal",
      live: "#",
      demo: "#",
    },
    metrics: [
      { label: "Privacy", value: "Default-safe" },
      { label: "Grounding", value: "History-backed" },
    ],
  },
  {
    id: "model-behavior-lab",
    title: "The Truth-Seeking Engine",
    subtitle: "Model Behavior Lab",
    icon: <Eye className="w-6 h-6 text-cyan-400" />,
    tags: ["Python", "Evals", "JSONL", "Viz", "OSS LLMs", "Ollama"],
    oneLiner:
      "A reproducible evaluation harness for LLM behavior—turning “feels off” into scored, comparable runs.",
    story:
      "I got tired of debating model quality with adjectives. So I built an interrogation room: versioned tests, consistent scoring, artifacts you can diff. It makes failure modes visible.",
    evidence: [
      "JSONL test suites → consistent runs",
      "Failure-mode taxonomy: hallucination / refusal / tone drift",
      "Artifacts: reports + breakdowns + diffs",
      "A/B comparisons across models",
    ],
    architecture: {
      overview: "Tests (JSONL) → Runner → Scorers → Artifacts → Compare runs",
      diagram: `
+------------------+     +------------------+     +------------------+
|   tests/*.jsonl  | --> |   eval_runner     | --> |   raw outputs    |
+------------------+     +------------------+     +------------------+
                                   |                      |
                                   v                      v
                            +--------------+       +--------------+
                            |   scorers    |       |  reporters   |
                            +--------------+       +--------------+
                                   |                      |
                                   v                      v
                            +------------------------------------+
                            |  results/ (tables, charts, diffs)  |
                            +------------------------------------+
`,
      tradeoffs: [
        "Strict scoring vs flexibility (kept configurable)",
        "Fast iteration vs deep evaluation (quick + full modes)",
        "Heuristics vs judge-model scoring (designed for both)",
      ],
    },
    decisions: [
      { title: "JSON-driven tests", why: "Evaluation should be reviewable like code." },
      { title: "Artifacts-first", why: "Charts and diffs change minds faster than paragraphs." },
      { title: "Failure-mode taxonomy", why: "So regressions don’t hide behind averages." },
    ],
    links: {
      github: "https://github.com/Chunduri-Aditya/Model-Behavior-Lab",
      live: "#",
      demo: "#",
    },
    metrics: [
      { label: "Core", value: "Evals as tests" },
      { label: "Output", value: "Reports + diffs" },
    ],
  },
  {
    id: "metalearnml",
    title: "MetaLearnML",
    subtitle: "AutoML (Meta-Learning)",
    icon: <Gauge className="w-6 h-6 text-emerald-400" />,
    tags: ["AutoML", "Meta-Learning", "PyTorch", "Neo4j", "FastAPI", "Scikit-learn"],
    oneLiner:
      "A self-improving AutoML engine that learns from past runs to choose better pipelines faster than brute-force search.",
    story:
      "Most AutoML feels like expensive guessing. I wanted an engine that learns from its own history, predicts what will work, then validates and records why.",
    evidence: [
      "Task inference (classification vs regression)",
      "Ranked preprocessing strategies",
      "Meta-learning guided selection",
      "Experiment graph tracking (Neo4j)",
      "Multi-format reports",
    ],
    architecture: {
      overview:
        "Dataset → Task Inference → Preprocess Strategies → Meta-Learner → Select → Train → Log Graph → Report",
      diagram: `
+-----------+   +-----------+   +------------------+   +-----------+
|  Dataset  |-->|   Task    |-->|  Preprocessing   |-->|  Meta-    |
|           |   | Inference |   |   Strategies     |   |  Learner  |
+-----------+   +-----------+   +------------------+   +-----+-----+
                                                             |
                                                             v
+-----------+   +-----------+   +------------------+   +-----------+
|  Neo4j    |<--|  Training |<--|  Model Selection |<--| Prediction|
|  Graph    |   |           |   |                  |   |           |
+-----------+   +-----------+   +------------------+   +-----------+
                                                             |
                                                             v
                                                      +-----------+
                                                      |  Report   |
                                                      +-----------+
`,
      tradeoffs: [
        "Extra system complexity vs selection speed (worth it over time)",
        "Graph storage overhead vs insight (graphs explain ‘why’ better)",
        "Parallelism vs laptop limits (configurable)",
      ],
    },
    decisions: [
      { title: "Meta-learning over brute force", why: "Use experience to reduce wasted compute." },
      { title: "Neo4j tracking", why: "Relationships between experiments matter." },
      { title: "Reports as artifacts", why: "Different stakeholders need different views." },
    ],
    links: {
      github: "https://github.com/Chunduri-Aditya/MetaLearnML",
      live: "#",
      demo: "#",
    },
    metrics: [
      { label: "Goal", value: "Smarter selection" },
      { label: "Stack", value: "PyTorch + Neo4j" },
    ],
  },
  {
    id: "ai-remixmate",
    title: "The Pattern Matcher",
    subtitle: "AI RemixMate",
    icon: <Activity className="w-6 h-6 text-purple-400" />,
    tags: ["Librosa", "Signal Proc", "Demucs", "Whisper", "Multimodal"],
    oneLiner:
      "A DJ-style pipeline that matches tracks using audio features + lyrical alignment, then builds transitions.",
    story:
      "A clean transition is hidden engineering: tempo, key, energy, phrasing, meaning. I decomposed ‘DJ instinct’ into measurable signals, then stitched tracks using stems and alignment.",
    evidence: [
      "Stem separation (Demucs)",
      "Audio similarity (MFCC/chroma/etc.)",
      "Whisper transcription for lyrics alignment",
      "Rule-guided transitions (fades/alignment)",
      "Cached feature DB for fast matching",
    ],
    architecture: {
      overview: "Ingest → Stems → Features + Lyrics → Similarity → Select match → Render transition",
      diagram: `
+-----------+   +-----------+   +----------------------+   +-------------+
|  Track A  |-->|  Demucs   |-->|  Features + Lyrics    |-->| Similarity  |
+-----------+   +-----------+   +----------------------+   +------+------+ 
                                                               | 
+-----------+   +-----------+   +----------------------+        v
|  Track B  |-->|  Demucs   |-->|  Features + Lyrics    |   +----------+
+-----------+   +-----------+   +----------------------+   |  Match    |
                                                           +----+-----+
                                                                |
                                                                v
                                                           +----------+
                                                           |  Render  |
                                                           +----------+
`,
      tradeoffs: [
        "Match quality vs compute (cache + batch)",
        "Beat-perfect sync vs musical feel (rules + smoothing)",
        "Audio-only vs multimodal (lyrics add meaning)",
      ],
    },
    decisions: [
      { title: "Stems first", why: "Vocals are the hardest to blend—separate them." },
      { title: "Multimodal matching", why: "Emotion and meaning don’t live only in audio features." },
      { title: "Rules + signals", why: "Rules keep it musical while signals keep it measurable." },
    ],
    links: {
      github: "https://github.com/Chunduri-Aditya/ai-remixmate",
      live: "#",
      demo: "#",
    },
    metrics: [
      { label: "Signals", value: "Audio + lyrics" },
      { label: "Output", value: "Rendered mixes" },
    ],
  },
  {
    id: "take-action-project",
    title: "Action-First Daily Agent",
    subtitle: "Take_Action_Project (AFDA)",
    icon: <Timer className="w-6 h-6 text-cyan-400" />,
    tags: ["Streamlit", "LLM", "Productivity", "Action-Gating"],
    oneLiner:
      "A personal agent that forces momentum by revealing only one next step—built as a ‘do-engine’ instead of a planning tool.",
    story:
      "Planning can become a hiding place. AFDA only shows one actionable micro-step and unlocks the next after proof-of-work. It turns intention into movement.",
    evidence: [
      "One micro-step at a time",
      "Action-gating (progress requires action)",
      "Minimal UI → fewer decisions",
      "Local-first storage",
    ],
    architecture: {
      overview: "Goal Input → Token → Micro-Step → Action Gate → Completion → Next Step",
      diagram: `
+-----------+   +-----------+   +-----------+   +-----------+
|   Goal    |-->|   Token   |-->|  Micro-   |-->|  Action   |
|  Input    |   | Generation|   |  Step     |   |   Gate    |
+-----------+   +-----------+   +-----------+   +-----+-----+
                                                       |
                                                       v
+-----------+   +-----------+   +-----------+   +-----------+
|  Learning |<--|   Next    |<--| Completion|   |  User     |
|  System   |   |   Step    |   |   Check   |   |  Action   |
+-----------+   +-----------+   +-----------+   +-----------+
`,
      tradeoffs: [
        "Simplicity vs feature breadth (simplicity wins for consistency)",
        "Gating vs flexibility (gating reduces overwhelm)",
        "Local vs cloud sync (privacy + speed first)",
      ],
    },
    decisions: [
      { title: "Single next action", why: "Overwhelm kills motion; one step is doable." },
      { title: "Action-gating", why: "Clarity often arrives after action, not before." },
      { title: "Minimal interface", why: "Fewer controls → less friction → more doing." },
    ],
    links: {
      github: "https://github.com/Chunduri-Aditya/Take_Action_Project",
      live: "#",
      demo: "#",
    },
    metrics: [
      { label: "Mode", value: "Action-first" },
      { label: "UI", value: "Streamlit" },
    ],
  },
  {
    id: "chatdb",
    title: "Natural Language to SQL",
    subtitle: "ChatDB",
    icon: <Database className="w-6 h-6 text-cyan-400" />,
    tags: ["NLP", "SQL", "SQLite", "SQLAlchemy", "Templates"],
    oneLiner:
      "A system that loads CSVs, infers schema, and converts natural language questions into executable SQL safely and predictably.",
    story:
      "I wanted database querying without context switching into SQL. ChatDB loads data, understands the schema, and produces reliable SQL using templates.",
    evidence: [
      "CSV → SQL loader with schema inference",
      "Template-based SQL generation (predictable)",
      "Interactive CLI workflows",
      "Supports WHERE / GROUP BY / aggregations",
    ],
    architecture: {
      overview: "CSV → Schema → SQLite → NL Query → Intent → SQL → Execute → Results",
      diagram: `
+-----------+   +-----------+   +-----------+   +-----------+
|   CSV     |-->|  Schema   |-->|  SQLite   |-->|   NL      |
|   File    |   | Detection |   |   Load    |   |  Query    |
+-----------+   +-----------+   +-----------+   +-----+-----+
                                                       |
                                                       v
+-----------+   +-----------+   +-----------+   +-----------+
|  Results  |<--| Execution |<--|    SQL    |<--|  Intent   |
|           |   |           |   | Generation|   |  Parsing  |
+-----------+   +-----------+   +-----------+   +-----------+
`,
      tradeoffs: [
        "Templates vs LLM (templates are safer, cheaper, predictable)",
        "SQLite portability vs Postgres power (portability first)",
        "Simple intents vs full semantic parsing (tight scope → better reliability)",
      ],
    },
    decisions: [
      { title: "Schema detection", why: "Users shouldn’t hand-author schemas for CSVs." },
      { title: "Template SQL", why: "Reliability beats surprise." },
      { title: "CLI-first", why: "Fast iteration beats fancy UI early on." },
    ],
    links: { github: "https://github.com/Chunduri-Aditya/ChatDB", live: "#", demo: "#" },
    metrics: [
      { label: "Focus", value: "Reliability" },
      { label: "Design", value: "Template-based" },
    ],
  },
];

const SKILLS = [
  { category: "Analysis (Pattern Rec)", tools: ["Python", "SQL", "Pandas", "NumPy", "Scikit-learn"], icon: <Cpu size={16} /> },
  { category: "Synthesis (Creation)", tools: ["LangChain", "Ollama", "Stable Diffusion", "TTS"], icon: <Sparkles size={16} /> },
  { category: "Deployment (Reliability)", tools: ["Docker", "FastAPI", "Flask", "Streamlit"], icon: <Wrench size={16} /> },
  { category: "Recall (Memory)", tools: ["ChromaDB", "Pinecone", "PostgreSQL", "RAG"], icon: <Database size={16} /> },
] as const;

const RESEARCH = {
  badge: "PUBLICATION: IJRASET VOL 11",
  title: "Wind Power Analysis using Digital Twins & ML",
  story:
    "Wind is messy. I built a Digital Twin on Azure to simulate the present and forecast the future—then tested models that respect long-range time dependencies.",
  signal:
    "Hybrid forecasting model combining TCN + KNN inside a Digital Twin architecture on Azure to improve wind output forecasting.",
  metrics: [
    { label: "Architecture", value: "Digital Twin", accent: "cyan" as const },
    { label: "Model", value: "TCN + KNN", accent: "purple" as const },
    { label: "Cloud", value: "Azure", accent: "blue" as const },
    { label: "Focus", value: "Forecasting", accent: "green" as const },
  ],
  paperHref: getPublicPath("Docs/Publication_Paper_Wind.pdf"),
  certHref: getPublicPath("Docs/IJRASET_Certificate_Wind.pdf"),
};

/** -----------------------------
 * Main component
 * ----------------------------- */
const Portfolio = () => {
  const [mode, setMode] = useState<Mode>("signal");
  const isStory = mode === "story";

  const [tickerIndex, setTickerIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("projects");
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const thoughts = useMemo(
    () => [
      "Turning evaluation into unit tests...",
      "Compressing big intent into small prompts...",
      "Finding the smallest change that fixes the whole system...",
      "Chasing edge cases (that’s where truth hides)...",
      "Making memory retrieval feel like remembering, not searching...",
      "Shipping only when behavior is stable...",
    ],
    []
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % thoughts.length);
    }, 3800);
    return () => window.clearInterval(interval);
  }, [thoughts.length]);

  const scrollTo = useCallback((id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const hero = useMemo(() => {
    const headline = isStory ? "I turn noise into signal." : "Curiosity is noisy. I build the signal.";
    const subhead = "Graduate Student | M.S. Applied Data Science, USC (Dec 2025) | AI & Software Engineer | ML • Systems • Data";
    const intro =
      isStory
        ? "I'm a graduate student building systems that matter. Through coursework and personal projects, I'm learning to turn complex problems into reliable solutions—with tests, logs, and clear architecture."
        : "Graduate student focused on building verifiable systems through coursework and projects. Learning to apply instrumentation, testable assumptions, and reproducible pipelines to turn messy inputs into reliable outputs.";
    const chips = isStory
      ? [
          { icon: <Sparkles size={14} />, text: "Curiosity with guardrails" },
          { icon: <ShieldCheck size={14} />, text: "Truth > vibes" },
          { icon: <Rocket size={14} />, text: "Fast iteration, tight loops" },
          { icon: <Boxes size={14} />, text: "Systems over scripts" },
          { icon: <Brain size={14} />, text: "Attention trained daily" },
        ]
      : [
          { icon: <ShieldCheck size={14} />, text: "Reproducible pipelines" },
          { icon: <Gauge size={14} />, text: "Eval-driven development" },
          { icon: <Database size={14} />, text: "RAG + memory" },
          { icon: <Wrench size={14} />, text: "Product-minded engineering" },
          { icon: <Brain size={14} />, text: "Calm under pressure" },
        ];
    return { headline, subhead, intro, chips, statusLine: "System Status: ONLINE // Dec 2025" };
  }, [isStory]);

  const thinkingLoop = useMemo(
    () => [
      {
        title: "Observe",
        icon: <Eye size={16} className="text-cyan-300" />,
        text: isStory
          ? "I start with friction: contradictions, recurring weirdness, the edge case that won’t leave."
          : "Identify constraints, failure modes, and a measurable definition of success.",
      },
      {
        title: "Model",
        icon: <Boxes size={16} className="text-purple-300" />,
        text: isStory
          ? "I sketch a model and try to break it. If it survives, it becomes architecture."
          : "Propose an approach with explicit tradeoffs, risks, and interfaces.",
      },
      {
        title: "Instrument",
        icon: <Gauge size={16} className="text-emerald-300" />,
        text: isStory
          ? "I add gauges: tests, logs, metrics—anything that turns 'maybe' into 'we know'."
          : "Measure early: evals, traces, structured logs, reproducible configs.",
      },
      {
        title: "Iterate",
        icon: <Timer size={16} className="text-slate-200" />,
        text: isStory
          ? "Short loops. Tight feedback. Find the one lever that fixes five things at once."
          : "Run fast experiments, isolate variables, keep a decision log.",
      },
      {
        title: "Ship",
        icon: <Rocket size={16} className="text-cyan-200" />,
        text: isStory
          ? "I ship when the system behaves. Not when I feel brave."
          : "Package it: docs, tests, and a story that maps to outcomes.",
      },
    ],
    [isStory]
  );

  const allTags = useMemo(() => {
    const set = new Set<string>();
    PROJECTS.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const matchesQuery =
        !q || [p.title, p.subtitle, p.oneLiner, p.story, ...(p.tags || [])].join(" ").toLowerCase().includes(q);
      const matchesTags = activeTags.size === 0 || p.tags.some((t) => activeTags.has(t));
      return matchesQuery && matchesTags;
    });
  }, [query, activeTags]);

  const selectedProject = useMemo(
    () => PROJECTS.find((p) => p.id === selectedProjectId) || null,
    [selectedProjectId]
  );

  const toggleTag = useCallback((tag: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  }, []);

  const clearTags = useCallback(() => setActiveTags(new Set()), []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2 hover:text-cyan-300 transition-colors"
            aria-label="Go to top"
          >
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span className="font-mono font-bold text-slate-100 tracking-tight">~/Aditya</span>
          </button>

          <div className="hidden md:flex items-center gap-6 text-sm font-mono text-slate-400">
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700/50">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-cyan-200/80">Compiling:</span>
              <span className="text-xs w-72 truncate">{thoughts[tickerIndex]}</span>
            </div>

            <div className="flex items-center gap-2">
              <NavLink label="Thinking" active={activeSection === "thinking"} onClick={() => scrollTo("thinking")} />
              <NavLink label="Projects" active={activeSection === "projects"} onClick={() => scrollTo("projects")} />
              <NavLink label="Research" active={activeSection === "research"} onClick={() => scrollTo("research")} />
              <NavLink label="Skills" active={activeSection === "skills"} onClick={() => scrollTo("skills")} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ModeToggle mode={mode} setMode={setMode} />
            <a href="mailto:chunduri@usc.edu" className="hover:text-cyan-400 transition-colors" aria-label="Email">
              <Mail size={18} />
            </a>
            <a
              href="https://github.com/Chunduri-Aditya"
              className="hover:text-cyan-400 transition-colors"
              aria-label="GitHub"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/chunduriaditya"
              className="hover:text-cyan-400 transition-colors"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 pt-24 pb-20">
        {/* Hero */}
        <section id="hero" className="mb-16 relative">
          <div className="absolute top-0 right-0 w-1/3 h-64 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-mono text-cyan-400 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              {hero.statusLine}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-slate-100 mb-6 tracking-tight leading-tight">
              {hero.headline}
            </h1>

            <h2 className="text-xl md:text-2xl text-slate-400 mb-8 font-light">{hero.subhead}</h2>

            <p
              className={`text-lg leading-relaxed mb-8 max-w-2xl border-l-4 pl-6 transition-all duration-500 ${
                isStory ? "border-purple-500 text-slate-200" : "border-cyan-500 text-slate-400"
              }`}
            >
              {hero.intro}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {hero.chips.map((c) => (
                <ProofChip key={c.text} icon={c.icon} text={c.text} />
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => scrollTo("projects")}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-cyan-900/20"
              >
                <Terminal size={18} />
                Inspect The Work
              </button>
              <button
                type="button"
                onClick={() => scrollTo("thinking")}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg transition-all border border-slate-700 flex items-center gap-2"
              >
                <ScrollText size={18} />
                How I Think
              </button>
              <a
                href={getPublicPath("Docs/Aditya_Ch_Resume.pdf")}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-slate-900/40 hover:bg-slate-800 text-slate-200 font-medium rounded-lg transition-all border border-slate-800 flex items-center gap-2"
              >
                <FileText size={18} />
                Resume (PDF)
              </a>
            </div>
          </div>
        </section>

        {/* Thinking */}
        <section id="thinking" className="mb-16">
          <SectionHeader
            title="How I Think"
            subtitle={isStory ? "My operating system for turning intensity into clarity." : "A repeatable loop I use to design, debug, and ship."}
            icon={<Layers className="text-purple-400" />}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6">
              <div className="text-xs font-mono text-slate-500 mb-3">Loop (the whole thing fits in my head)</div>
              <div className="grid gap-3">
                {thinkingLoop.map((step, idx) => (
                  <div key={step.title} className="flex gap-3 rounded-xl border border-slate-800 bg-slate-950/20 p-4">
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                      {step.icon}
                    </div>
                    <div>
                      <div className="text-slate-100 font-semibold flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-500">{String(idx + 1).padStart(2, "0")}</span>
                        {step.title}
                      </div>
                      <div className="text-sm text-slate-400 leading-relaxed mt-1">{step.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/60 to-slate-950 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 blur-[60px] rounded-full pointer-events-none" />
              <div className="relative">
                <div className="text-xs font-mono text-slate-500 mb-3">What I'm optimizing for</div>

                <div className="grid gap-3">
                  <ValueLine
                    icon={<ShieldCheck size={16} className="text-emerald-300" />}
                    title="Truthful systems"
                    text={isStory ? "If it’s not reliable, it’s not helpful. I’d rather be slower than wrong." : "Minimize hallucination risk with grounding, verification, and tests."}
                  />
                  <ValueLine
                    icon={<CheckCircle2 size={16} className="text-cyan-300" />}
                    title="Reproducibility"
                    text={isStory ? "I sleep better when tomorrow’s run matches today’s run." : "Configs + deterministic eval paths + artifacts."}
                  />
                  <ValueLine
                    icon={<ArrowUpRight size={16} className="text-purple-300" />}
                    title="Leverage"
                    text={isStory ? "I hunt the one lever that fixes five things at once." : "Architecture that reduces future cognitive load."}
                  />
                  <ValueLine
                    icon={<XCircle size={16} className="text-slate-200" />}
                    title="Less drama"
                    text={isStory ? "I don’t chase perfection. I chase stable behavior." : "Clear definition of done + instrumentation to catch regressions."}
                  />
                </div>

                <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/30 p-4">
                  <div className="text-xs font-mono text-slate-500 mb-2">The human part</div>
                  <div className="text-sm text-slate-300 leading-relaxed">
                    {isStory
                      ? "My attention runs wide-angle and laser at the same time. The way I keep it useful is structure: lists, tests, logs, and clean interfaces—so intensity becomes progress, not noise."
                      : "I keep tight feedback loops and decision logs so exploration stays controlled."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left */}
          <div className="lg:col-span-8 flex flex-col gap-16">
            {/* Projects */}
            <section id="projects">
              <SectionHeader
                title="The Rabbit Holes"
                subtitle={isStory ? "Systems I built because I couldn’t stop thinking about the problem." : "Case studies with constraints, tradeoffs, and outcomes."}
                icon={<GitBranch className="text-cyan-400" />}
                right={<span className="text-xs font-mono text-slate-500 uppercase tracking-widest hidden sm:block">Systems & Obsessions</span>}
              />

              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-800 rounded-xl px-3 py-2">
                  <Search className="text-slate-500" size={16} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search (RAG, evals, whisper, demucs, privacy...)"
                    className="w-full bg-transparent outline-none text-sm text-slate-200 placeholder:text-slate-600"
                    aria-label="Search projects"
                  />
                  {!!query && (
                    <button type="button" onClick={() => setQuery("")} className="text-xs text-slate-400 hover:text-slate-200">
                      Clear
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 mr-2">
                    <Filter size={14} /> Tags:
                  </span>
                  {allTags.map((tag) => {
                    const on = activeTags.has(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`text-xs px-2 py-1 rounded-md border font-mono transition-colors ${
                          on ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-200" : "bg-slate-900/30 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                        aria-pressed={on}
                      >
                        {tag}
                      </button>
                    );
                  })}
                  {activeTags.size > 0 && (
                    <button type="button" onClick={clearTags} className="text-xs font-mono text-slate-400 hover:text-slate-200 ml-2">
                      Reset
                    </button>
                  )}
                </div>

                <div className="text-xs text-slate-600 font-mono">Showing {filteredProjects.length} / {PROJECTS.length}</div>
              </div>

              <div className="flex flex-col gap-8 mt-6">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} mode={mode} onOpen={() => setSelectedProjectId(project.id)} />
                ))}
              </div>
            </section>

            {/* Research */}
            <section id="research" className="mt-2">
              <SectionHeader
                title="Deep Theory"
                subtitle={isStory ? "I like models that respect the physics of reality." : "Research + publication work."}
                icon={<BookOpen className="text-purple-400" />}
              />

              <div className="bg-gradient-to-br from-slate-900 to-slate-800/50 border border-slate-700 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full pointer-events-none" />
                <div className="relative z-10">
                  <div className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-bold rounded mb-4">
                    {RESEARCH.badge}
                  </div>
                  <h4 className="text-2xl font-bold text-slate-100 mb-2">{RESEARCH.title}</h4>
                  <p className="text-slate-400 mb-6 max-w-2xl">{isStory ? RESEARCH.story : RESEARCH.signal}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {RESEARCH.metrics.map((m) => (
                      <MetricCard key={m.label} label={m.label} value={m.value} accent={m.accent} />
                    ))}
                  </div>

                  <div className="flex items-center gap-4 flex-wrap">
                    <a href={RESEARCH.paperHref} target="_blank" rel="noreferrer" className="text-sm font-semibold text-slate-200 hover:text-white flex items-center gap-2 group">
                      Read The Paper
                      <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a href={RESEARCH.certHref} target="_blank" rel="noreferrer" className="text-sm font-semibold text-slate-200 hover:text-white flex items-center gap-2 group">
                      View Certificate
                      <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right */}
          <div className="lg:col-span-4 flex flex-col gap-12">
            {/* User Manual */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h4 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                <FileText size={18} className="text-emerald-400" />
                User Manual
              </h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-mono">01.</span>
                  <span>
                    <strong>I optimize for:</strong> Reproducibility. If I can’t run it twice and get the same behavior, it isn’t stable.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-mono">02.</span>
                  <span>
                    <strong>I thrive when:</strong> The problem is ambiguous and the solution needs a bridge between two worlds.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-mono">03.</span>
                  <span>
                    <strong>Tooling:</strong> I use configs, logs, and evals to force structure onto experimentation.
                  </span>
                </li>
              </ul>

              <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                <div className="text-xs font-mono text-slate-500 mb-2">Collaboration style</div>
                <div className="text-sm text-slate-300 leading-relaxed">
                  {isStory
                    ? "Give me a messy problem and a success metric. I’ll turn it into a pipeline, instrument it, and iterate until the system behaves."
                    : "Define outcome + constraints. I’ll propose an approach, document tradeoffs, and ship with tests and artifacts."}
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                <div className="text-xs font-mono text-slate-500 mb-2">Performance habits</div>
                <div className="text-sm text-slate-300 leading-relaxed">
                  {isStory ? "Intensity is a feature. Structure is how I aim it." : "I treat focus like a trainable skill: routines, feedback loops, resets."}
                </div>
              </div>
            </div>

            {/* Off-Keyboard Training */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h4 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                <Activity size={18} className="text-purple-400" />
                Off-Keyboard Training
              </h4>
              <p className="text-xs text-slate-500 font-mono mb-4">High-bandwidth attention channeled into structure</p>

              <div className="space-y-4">
                <div className="rounded-xl border border-slate-800 bg-slate-950/30 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain size={16} className="text-emerald-400" />
                    <span className="text-sm font-semibold text-slate-200">Meditation</span>
                    <span className="text-xs text-slate-500 font-mono ml-auto">5+ years</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isStory
                      ? "Meditation is my reset button. It turns mental bandwidth into clean signal."
                      : "Attention training: calm under pressure, faster reset, deliberate focus."}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/30 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity size={16} className="text-cyan-400" />
                    <span className="text-sm font-semibold text-slate-200">Athletics</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isStory
                      ? "Sports that punish sloppy feedback loops: swimming and badminton don’t lie."
                      : "Swimming (endurance + breath control), Badminton (speed + tactics), athletic conditioning."}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/30 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Music size={16} className="text-purple-400" />
                    <span className="text-sm font-semibold text-slate-200">Techno Focus</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isStory
                      ? "A steady rhythm helps me hold the thread—like a metronome for thinking."
                      : "Lyric-light techno as a focus soundtrack during deep work sprints."}
                  </p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <section id="skills">
              <h4 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2">
                <Layers size={18} className="text-cyan-400" />
                Cognitive Stack
              </h4>
              <div className="grid gap-4">
                {SKILLS.map((skill) => (
                  <div key={skill.category} className="bg-slate-900/30 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                    <div className="flex items-center gap-2 mb-3 text-slate-200 font-medium">
                      {skill.icon}
                      {skill.category}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.tools.map((tool) => (
                        <span key={tool} className="text-xs px-2 py-1 bg-slate-800 text-slate-400 rounded-md border border-slate-700/50">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-slate-800 text-center">
              <h5 className="text-slate-200 font-bold mb-2">Want the receipts?</h5>
              <p className="text-xs text-slate-500 mb-4">Resume PDF + GitHub + short project demos.</p>
              <div className="grid gap-2">
                <a
                  href={getPublicPath("Docs/Aditya_Ch_Resume.pdf")}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded text-sm font-medium transition-colors"
                >
                  <FileText size={16} /> Resume (PDF)
                </a>
                <a
                  href="mailto:chunduri@usc.edu"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 bg-slate-900/40 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded text-sm font-medium transition-colors"
                >
                  <Mail size={16} /> Email
                </a>
              </div>

              <div className="mt-4 flex items-center justify-center gap-3 text-xs text-slate-500">
                <a className="hover:text-slate-300" href="https://linkedin.com/in/chunduriaditya" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <span>•</span>
                <a className="hover:text-slate-300" href="https://github.com/Chunduri-Aditya" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer id="contact" className="border-t border-slate-900 bg-slate-950 py-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-500 font-mono">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Built with React + Tailwind</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <a href="mailto:chunduri@usc.edu" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
              <Mail size={16} />
              <span>chunduri@usc.edu</span>
            </a>
            <span className="text-slate-700">•</span>
            <a href="https://github.com/Chunduri-Aditya" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
              <Github size={16} />
              <span>GitHub</span>
            </a>
            <span className="text-slate-700">•</span>
            <a href="https://linkedin.com/in/chunduriaditya" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
              <Linkedin size={16} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-6 text-center text-xs text-slate-600 font-mono">
          © 2025 Aditya Chunduri. All rights reserved.
        </div>
      </footer>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          mode={mode}
          onClose={() => setSelectedProjectId(null)}
        />
      )}

      {/* FAQ Bot (Option A) */}
      <FaqBot />
    </div>
  );
};

export default Portfolio;