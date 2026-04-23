import React from "react";

// Helper to get correct public asset path (handles base path for GitHub Pages)
const getPublicPath = (path: string): string => {
  const base = import.meta.env.BASE_URL;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

export interface FAQLink {
  label: string;
  href: string;
  sectionId?: string;
}

export interface FAQIntent {
  id: string;
  title: string;
  utterances: string[];
  answer: string | React.ReactNode;
  links: FAQLink[];
  tags: string[];
}

export const faqIntents: FAQIntent[] = [
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
      { label: "Resume \u2014 LLM track", href: getPublicPath("Docs/Aditya_Ch_Resume_LLM.pdf") },
      { label: "Resume \u2014 ML track", href: getPublicPath("Docs/Aditya_Ch_Resume_ML.pdf") },
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
      { label: "Read Paper", href: getPublicPath("Docs/Publication_Paper_Wind.pdf") },
      { label: "View Certificate", href: getPublicPath("Docs/IJRASET_Certificate_Wind.pdf") },
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
      "tech",
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
      "Reach me at chunduri@usc.edu. Based in Los Angeles. Open to AI safety / agent security / LLM evaluation roles, research collaborations, and PhD discussions (targeting Fall 2027).",
    links: [
      { label: "Email", href: "mailto:chunduri@usc.edu" },
      { label: "GitHub", href: "https://github.com/Chunduri-Aditya" },
      { label: "LinkedIn", href: "https://linkedin.com/in/aditya-chunduri" },
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
      "ml resume",
      "llm resume",
      "two resumes",
    ],
    answer:
      "Two resume versions depending on the role. The LLM / Safety track leads with Agent Shield, adversarial evaluation, Inspect AI, DPO, and red teaming. The ML / SWE track leads with PyTorch, TensorFlow, computer vision, and end-to-end ML pipelines. Same projects underneath, different emphasis.",
    links: [
      { label: "Resume \u2014 LLM / Safety track", href: getPublicPath("Docs/Aditya_Ch_Resume_LLM.pdf") },
      { label: "Resume \u2014 ML / SWE track", href: getPublicPath("Docs/Aditya_Ch_Resume_ML.pdf") },
    ],
    tags: ["resume", "cv", "pdf", "download", "experience", "ml", "llm", "safety", "swe"],
  },
];
