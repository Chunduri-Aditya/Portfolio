import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitBranch,
  Search,
  Filter,
  Sparkles,
  Lock,
  Eye,
  Gauge,
  Activity,
  Timer,
  Database,
} from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import type { Project } from "./ProjectCard";

type Mode = "signal" | "story";

const PROJECTS: Project[] = [
  {
    id: "akashic-tree-web",
    title: "AkashicTree Web Platform",
    subtitle: "Automated GenAI Media Pipeline",
    icon: <Sparkles className="w-6 h-6 text-purple-400" />,
    tags: ["Flask", "LangChain", "Stable Diffusion", "Coqui TTS", "MoviePy", "ChromaDB"],
    oneLiner:
      "An end-to-end content pipeline that turns a brief into scripts, visuals, voice, and assembled video\u2014with quality gates and traceable stages.",
    story:
      "Marketing needs speed *and* brand safety. I built a pipeline that generates scripts, images, voiceovers, and final videos, then blocks output when brand constraints fail. It ships fast, but it doesn\u2019t ship lies.",
    evidence: [
      "Script generation with brand constraints + validation",
      "Image generation via Stable Diffusion",
      "Voice synthesis with Coqui TTS",
      "Video assembly with MoviePy",
      "Quality gates that stop bad generations early",
      "Batch generation + repeatable runs (configs/logs)",
    ],
    architecture: {
      overview: "Brief \u2192 Script Gen \u2192 Brand Check \u2192 Image Gen \u2192 Voice Gen \u2192 Assembly \u2192 Quality Gate \u2192 Video",
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
+-----------+   +-----------+   +-----------+   +-----------+`,
      tradeoffs: [
        "Speed vs correctness (quality gates add time, prevent damage)",
        "Local-first control vs cloud scale (biased toward control + privacy)",
        "Batch throughput vs live UX (supports both paths)",
      ],
    },
    decisions: [
      { title: "Quality gates", why: "It\u2019s cheaper to block bad output than to clean it later." },
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
      "A journaling assistant that grounds responses in your own history using retrieval\u2014built to be calm, private, and verifiable.",
    story:
      "I wanted reflection without exporting my private thoughts into someone else\u2019s dataset. So I built a journal that remembers selectively: it retrieves relevant moments and responds with context\u2014not vibes.",
    evidence: [
      "Voice input (Whisper) \u2192 structured notes",
      "Vector retrieval grounding (history-backed answers)",
      "Multi-model support (Ollama) with safer \u201cquality mode\u201d",
      "Local-first defaults for privacy",
    ],
    architecture: {
      overview: "Voice/Text \u2192 Normalize \u2192 Embed \u2192 Retrieve \u2192 Compose Prompt \u2192 Generate \u2192 Verify",
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
                                                           +---------------+`,
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
      "A reproducible evaluation harness for LLM behavior\u2014turning \u201cfeels off\u201d into scored, comparable runs.",
    story:
      "I got tired of debating model quality with adjectives. So I built an interrogation room: versioned tests, consistent scoring, artifacts you can diff. It makes failure modes visible.",
    evidence: [
      "JSONL test suites \u2192 consistent runs",
      "Failure-mode taxonomy: hallucination / refusal / tone drift",
      "Artifacts: reports + breakdowns + diffs",
      "A/B comparisons across models",
    ],
    architecture: {
      overview: "Tests (JSONL) \u2192 Runner \u2192 Scorers \u2192 Artifacts \u2192 Compare runs",
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
                            +------------------------------------+`,
      tradeoffs: [
        "Strict scoring vs flexibility (kept configurable)",
        "Fast iteration vs deep evaluation (quick + full modes)",
        "Heuristics vs judge-model scoring (designed for both)",
      ],
    },
    decisions: [
      { title: "JSON-driven tests", why: "Evaluation should be reviewable like code." },
      { title: "Artifacts-first", why: "Charts and diffs change minds faster than paragraphs." },
      { title: "Failure-mode taxonomy", why: "So regressions don\u2019t hide behind averages." },
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
        "Dataset \u2192 Task Inference \u2192 Preprocess Strategies \u2192 Meta-Learner \u2192 Select \u2192 Train \u2192 Log Graph \u2192 Report",
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
                                                      +-----------+`,
      tradeoffs: [
        "Extra system complexity vs selection speed (worth it over time)",
        "Graph storage overhead vs insight (graphs explain \u2018why\u2019 better)",
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
      "A clean transition is hidden engineering: tempo, key, energy, phrasing, meaning. I decomposed \u2018DJ instinct\u2019 into measurable signals, then stitched tracks using stems and alignment.",
    evidence: [
      "Stem separation (Demucs)",
      "Audio similarity (MFCC/chroma/etc.)",
      "Whisper transcription for lyrics alignment",
      "Rule-guided transitions (fades/alignment)",
      "Cached feature DB for fast matching",
    ],
    architecture: {
      overview: "Ingest \u2192 Stems \u2192 Features + Lyrics \u2192 Similarity \u2192 Select match \u2192 Render transition",
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
                                                           +----------+`,
      tradeoffs: [
        "Match quality vs compute (cache + batch)",
        "Beat-perfect sync vs musical feel (rules + smoothing)",
        "Audio-only vs multimodal (lyrics add meaning)",
      ],
    },
    decisions: [
      { title: "Stems first", why: "Vocals are the hardest to blend\u2014separate them." },
      { title: "Multimodal matching", why: "Emotion and meaning don\u2019t live only in audio features." },
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
      "A personal agent that forces momentum by revealing only one next step\u2014built as a \u2018do-engine\u2019 instead of a planning tool.",
    story:
      "Planning can become a hiding place. AFDA only shows one actionable micro-step and unlocks the next after proof-of-work. It turns intention into movement.",
    evidence: [
      "One micro-step at a time",
      "Action-gating (progress requires action)",
      "Minimal UI \u2192 fewer decisions",
      "Local-first storage",
    ],
    architecture: {
      overview: "Goal Input \u2192 Token \u2192 Micro-Step \u2192 Action Gate \u2192 Completion \u2192 Next Step",
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
+-----------+   +-----------+   +-----------+   +-----------+`,
      tradeoffs: [
        "Simplicity vs feature breadth (simplicity wins for consistency)",
        "Gating vs flexibility (gating reduces overwhelm)",
        "Local vs cloud sync (privacy + speed first)",
      ],
    },
    decisions: [
      { title: "Single next action", why: "Overwhelm kills motion; one step is doable." },
      { title: "Action-gating", why: "Clarity often arrives after action, not before." },
      { title: "Minimal interface", why: "Fewer controls \u2192 less friction \u2192 more doing." },
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
      "CSV \u2192 SQL loader with schema inference",
      "Template-based SQL generation (predictable)",
      "Interactive CLI workflows",
      "Supports WHERE / GROUP BY / aggregations",
    ],
    architecture: {
      overview: "CSV \u2192 Schema \u2192 SQLite \u2192 NL Query \u2192 Intent \u2192 SQL \u2192 Execute \u2192 Results",
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
+-----------+   +-----------+   +-----------+   +-----------+`,
      tradeoffs: [
        "Templates vs LLM (templates are safer, cheaper, predictable)",
        "SQLite portability vs Postgres power (portability first)",
        "Simple intents vs full semantic parsing (tight scope \u2192 better reliability)",
      ],
    },
    decisions: [
      { title: "Schema detection", why: "Users shouldn\u2019t hand-author schemas for CSVs." },
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

interface ProjectsSectionProps {
  mode: Mode;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ mode }) => {
  const isStory = mode === "story";
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    PROJECTS.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const matchesQuery =
        !q ||
        [p.title, p.subtitle, p.oneLiner, p.story, ...p.tags]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesTags =
        activeTags.size === 0 || p.tags.some((t) => activeTags.has(t));
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
    <>
      <AnimatedSection id="projects">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl glass">
              <GitBranch className="text-cyan-400 w-6 h-6" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-slate-100 mb-2">The Rabbit Holes</h3>
              <p className="text-slate-400 text-sm max-w-2xl">
                {isStory
                  ? "Systems I built because I couldn\u2019t stop thinking about the problem."
                  : "Case studies with constraints, tradeoffs, and outcomes."}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest hidden sm:block mt-2">
            Systems & Obsessions
          </span>
        </div>

        {/* Search & filters */}
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center gap-2 glass rounded-xl px-4 py-3">
            <Search className="text-slate-500" size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search (RAG, evals, whisper, demucs, privacy...)"
              className="w-full bg-transparent outline-none text-sm text-slate-200 placeholder:text-slate-600"
              aria-label="Search projects"
            />
            {!!query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-xs text-slate-400 hover:text-slate-200 whitespace-nowrap"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 mr-1">
              <Filter size={14} /> Tags:
            </span>
            {allTags.map((tag) => {
              const on = activeTags.has(tag);
              return (
                <motion.button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-mono transition-all ${
                    on
                      ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-200 glow-cyan"
                      : "bg-slate-900/30 border-slate-800/50 text-slate-400 hover:border-slate-700/50"
                  }`}
                  aria-pressed={on}
                  whileTap={{ scale: 0.95 }}
                >
                  {tag}
                </motion.button>
              );
            })}
            {activeTags.size > 0 && (
              <button
                type="button"
                onClick={clearTags}
                className="text-xs font-mono text-slate-400 hover:text-slate-200 ml-1"
              >
                Reset
              </button>
            )}
          </div>

          <div className="text-xs text-slate-600 font-mono">
            Showing {filteredProjects.length} / {PROJECTS.length}
          </div>
        </div>

        {/* Project grid */}
        <StaggerContainer className="flex flex-col gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <StaggerItem key={project.id}>
                <ProjectCard
                  project={project}
                  mode={mode}
                  onOpen={() => setSelectedProjectId(project.id)}
                />
              </StaggerItem>
            ))}
          </AnimatePresence>
        </StaggerContainer>
      </AnimatedSection>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        mode={mode}
        onClose={() => setSelectedProjectId(null)}
      />
    </>
  );
};

export default ProjectsSection;
