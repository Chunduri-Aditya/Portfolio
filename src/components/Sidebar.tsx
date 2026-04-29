import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Activity,
  Brain,
  Music,
  Layers,
  Cpu,
  Sparkles,
  Wrench,
  Database,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

type Mode = "signal" | "story";

const getPublicPath = (path: string): string => {
  const base = import.meta.env.BASE_URL;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

const SKILLS = [
  {
    category: "Eval & Adversarial (Safety)",
    tools: ["Inspect AI", "AgentDojo", "DPO", "Red Teaming", "Prompt Injection"],
    icon: <ShieldCheck size={16} />,
    accent: "rose",
  },
  {
    category: "LLM & Orchestration",
    tools: ["LangChain", "Ollama", "Hugging Face", "RAG", "ChromaDB"],
    icon: <Sparkles size={16} />,
    accent: "purple",
  },
  {
    category: "ML Foundations",
    tools: ["PyTorch", "TensorFlow", "Scikit-learn", "OpenCV", "Librosa", "Demucs"],
    icon: <Cpu size={16} />,
    accent: "cyan",
  },
  {
    category: "Systems & Cloud",
    tools: ["Docker", "AWS", "FastAPI", "Flask", "GitHub Actions", "CI/CD"],
    icon: <Wrench size={16} />,
    accent: "emerald",
  },
  {
    category: "Data & Storage",
    tools: ["PostgreSQL", "ChromaDB", "Neo4j", "Pandas", "NumPy", "Plotly"],
    icon: <Database size={16} />,
    accent: "blue",
  },
] as const;

interface SidebarProps {
  mode: Mode;
}

const Sidebar: React.FC<SidebarProps> = ({ mode }) => {
  const isStory = mode === "story";

  return (
    <div className="flex flex-col gap-10">
      {/* User Manual */}
      <AnimatedSection direction="right">
        <div className="glass rounded-2xl p-6">
          <h4 className="text-lg font-bold text-slate-100 mb-5 flex items-center gap-2">
            <FileText size={18} className="text-emerald-400" />
            User Manual
          </h4>
          <ul className="space-y-4 text-sm text-slate-400">
            {[
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
            ].map((item) => (
              <li key={item.num} className="flex gap-3">
                <span className="text-emerald-400 font-mono">{item.num}.</span>
                <span>
                  <strong className="text-slate-200">{item.strong}</strong>{" "}
                  {item.text}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl glass p-4">
            <div className="text-xs font-mono text-slate-500 mb-2">
              Collaboration style
            </div>
            <div className="text-sm text-slate-300 leading-relaxed">
              {isStory
                ? "Give me a messy problem and a success metric. I\u2019ll turn it into a pipeline, instrument it, and iterate until the system behaves."
                : "Define outcome + constraints. I\u2019ll propose an approach, document tradeoffs, and ship with tests and artifacts."}
            </div>
          </div>

          <div className="mt-4 rounded-xl glass p-4">
            <div className="text-xs font-mono text-slate-500 mb-2">
              Performance habits
            </div>
            <div className="text-sm text-slate-300 leading-relaxed">
              {isStory
                ? "Intensity is a feature. Structure is how I aim it."
                : "I treat focus like a trainable skill: routines, feedback loops, resets."}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Off-Keyboard Training */}
      <AnimatedSection direction="right" delay={0.1}>
        <div className="glass rounded-2xl p-6">
          <h4 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
            <Activity size={18} className="text-purple-400" />
            Off-Keyboard Training
          </h4>
          <p className="text-xs text-slate-500 font-mono mb-4">
            High-bandwidth attention channeled into structure
          </p>

          <StaggerContainer className="space-y-3">
            {[
              {
                icon: <Brain size={16} className="text-emerald-400" />,
                title: "Meditation",
                extra: "5+ years",
                text: isStory
                  ? "Meditation is my reset button. It turns mental bandwidth into clean signal."
                  : "Attention training: calm under pressure, faster reset, deliberate focus.",
              },
              {
                icon: <Activity size={16} className="text-cyan-400" />,
                title: "Athletics",
                text: isStory
                  ? "Sports that punish sloppy feedback loops: swimming and badminton don\u2019t lie."
                  : "Swimming (endurance + breath control), Badminton (speed + tactics), athletic conditioning.",
              },
              {
                icon: <Music size={16} className="text-purple-400" />,
                title: "Techno Focus",
                text: isStory
                  ? "A steady rhythm helps me hold the thread\u2014like a metronome for thinking."
                  : "Lyric-light techno as a focus soundtrack during deep work sprints.",
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="rounded-xl border border-slate-800/40 bg-slate-950/30 p-4 hover:border-slate-700/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    {item.icon}
                    <span className="text-sm font-semibold text-slate-200">
                      {item.title}
                    </span>
                    {item.extra && (
                      <span className="text-xs text-slate-500 font-mono ml-auto">
                        {item.extra}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* Skills */}
      <AnimatedSection id="skills" direction="right" delay={0.2}>
        <h4 className="text-lg font-bold text-slate-100 mb-5 flex items-center gap-2">
          <Layers size={18} className="text-cyan-400" />
          Cognitive Stack
        </h4>
        <StaggerContainer className="grid gap-3">
          {SKILLS.map((skill) => (
            <StaggerItem key={skill.category}>
              <div className="glass rounded-xl p-4 hover:border-slate-700/50 transition-colors">
                <div className="flex items-center gap-2 mb-3 text-slate-200 font-medium text-sm">
                  {skill.icon}
                  {skill.category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.tools.map((tool) => (
                    <motion.span
                      key={tool}
                      className="text-xs px-2.5 py-1 bg-slate-900/50 text-slate-400 rounded-lg border border-slate-800/40 font-mono hover:text-slate-200 hover:border-slate-700/50 transition-colors cursor-default"
                      whileHover={{ scale: 1.05 }}
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection direction="right" delay={0.3}>
        <div className="p-6 rounded-2xl glass relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none" />
          <div className="relative z-10">
            <h5 className="text-slate-200 font-bold mb-2 text-lg">
              Want the receipts?
            </h5>
            <p className="text-xs text-slate-500 mb-5">
              One resume, all the proof.
            </p>
            <div className="grid gap-2">
              <motion.a
                href={getPublicPath("Docs/Aditya_Chunduri.pdf")}
                target="_blank"
                rel="noreferrer"
                download="Aditya_Chunduri.pdf"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 glass glass-hover rounded-xl text-sm font-medium text-slate-200 transition-colors border border-cyan-500/30 hover:border-cyan-500/50"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Open resume PDF"
              >
                <FileText size={16} className="text-cyan-300" />
                <span>Resume (PDF)</span>
              </motion.a>
              <motion.a
                href="mailto:chunduri@usc.edu"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 glass glass-hover rounded-xl text-sm font-medium text-slate-300 transition-colors"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Mail size={16} /> Email
              </motion.a>
            </div>
            <div className="mt-4 flex items-center justify-center gap-3 text-xs text-slate-500">
              <a
                className="hover:text-cyan-400 transition-colors"
                href="https://linkedin.com/in/chunduriaditya"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <span className="text-slate-700" aria-hidden="true">·</span>
              <a
                className="hover:text-cyan-400 transition-colors"
                href="https://github.com/Chunduri-Aditya"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Sidebar;
