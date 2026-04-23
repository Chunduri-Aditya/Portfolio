import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitBranch,
  Search,
  Filter,
  Sparkles,
  Lock,
  Eye,
  ShieldCheck,
  Music,
} from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import type { Project } from "./ProjectCard";

type Mode = "signal" | "story";

const PROJECTS: Project[] = [
  {
    id: "agent-shield",
    title: "Agent Shield",
    subtitle: "LLM Agent Security Evaluation Framework",
    icon: <ShieldCheck className="w-6 h-6 text-rose-400" />,
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
    icon: <Music className="w-6 h-6 text-purple-400" />,
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
    icon: <Sparkles className="w-6 h-6 text-purple-400" />,
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
    icon: <Lock className="w-6 h-6 text-emerald-400" />,
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
    icon: <Eye className="w-6 h-6 text-cyan-400" />,
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
