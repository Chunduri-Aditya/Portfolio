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
    answer: "I'm Aditya Chunduri, a graduate student pursuing an M.S. in Applied Data Science at USC (graduating Dec 2025). Through coursework and personal projects, I'm building skills in evaluation systems, RAG architectures, and reproducible pipelines. I'm passionate about turning complex problems into reliable, well-tested solutions.",
    links: [
      { label: "View Projects", href: "#projects", sectionId: "projects" },
      { label: "How I Think", href: "#thinking", sectionId: "thinking" },
      { label: "Download Resume", href: getPublicPath("Docs/Aditya_Ch_Resume.pdf") },
    ],
    tags: ["about", "who", "introduction", "background", "person", "aditya", "you"],
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
    answer: "I've built systems focused on evaluation, RAG, and reproducible pipelines: Model Behavior Lab (LLM testing), AI Health Journal (privacy-aware journaling), and AI RemixMate (audio remixing). Each emphasizes measurable outcomes and grounding.",
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
    answer: "Model Behavior Lab is a JSON-driven evaluation harness for LLM behavior. It benchmarks models across accuracy, hallucination, and failure modes, generating visual reports and diffs to surface behavioral tradeoffs.",
    links: [
      { label: "View Project", href: "#projects", sectionId: "model-behavior-lab" },
    ],
    tags: ["evaluation", "llm", "testing", "benchmark", "json", "reproducible"],
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
      "whisper journal",
    ],
    answer: "AI Health Journal is a privacy-aware journaling assistant using RAG to ground responses in personal history. It uses Whisper for voice transcription and vector retrieval for context-aware responses, with local-first options.",
    links: [
      { label: "View Project", href: "#projects", sectionId: "ai-health-journal" },
    ],
    tags: ["rag", "privacy", "journal", "whisper", "retrieval", "langchain"],
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
      "multimodal audio",
    ],
    answer: "AI RemixMate is a DJ-style pipeline matching tracks using audio features and lyrics alignment. It uses Demucs for stem separation, MFCCs for audio similarity, and Whisper for lyrical alignment to build smooth transitions.",
    links: [
      { label: "View Project", href: "#projects", sectionId: "ai-remixmate" },
    ],
    tags: ["audio", "music", "remix", "demucs", "whisper", "multimodal", "librosa"],
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
    answer: "I published research on Wind Power Analysis using Digital Twins & ML in IJRASET Vol 11. The work combines KNN and TCN within a Digital Twin architecture on Azure to improve wind grid forecasting with long-range time dependencies.",
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
    answer: "My stack spans analysis (Python, SQL, Pandas), synthesis (LangChain, Ollama, Stable Diffusion), structure (Docker, Azure, AWS), and recall (ChromaDB, PostgreSQL, RAG). I focus on reproducible pipelines and eval-driven development.",
    links: [
      { label: "View Skills", href: "#skills", sectionId: "skills" },
    ],
    tags: ["skills", "stack", "python", "langchain", "docker", "rag", "tools", "technologies", "programming", "tech"],
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
    answer: "You can reach me at chunduri@usc.edu. I'm a graduate student based in Los Angeles, CA. Find me on LinkedIn and GitHub. Open to discussing projects, learning opportunities, internships, and collaborative work in AI systems and data science.",
    links: [
      { label: "Email", href: "mailto:chunduri@usc.edu" },
      { label: "GitHub", href: "https://github.com/Chunduri-Aditya" },
      { label: "LinkedIn", href: "https://linkedin.com/in/chunduriaditya" },
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
    ],
    answer: "You can download my resume as a PDF. It includes my M.S. in Applied Data Science from USC, technical skills, system-level projects, research experience, and publications.",
    links: [
      { label: "Download Resume", href: getPublicPath("Docs/Aditya_Ch_Resume.pdf") },
    ],
    tags: ["resume", "cv", "pdf", "download", "experience"],
  },
];
