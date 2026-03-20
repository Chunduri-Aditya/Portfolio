import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  FileText,
  ScrollText,
  Sparkles,
  ShieldCheck,
  Rocket,
  Boxes,
  Brain,
  Gauge,
  Database,
  Wrench,
} from "lucide-react";

type Mode = "signal" | "story";

const getPublicPath = (path: string): string => {
  const base = import.meta.env.BASE_URL;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

interface HeroProps {
  mode: Mode;
  scrollTo: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ mode, scrollTo }) => {
  const isStory = mode === "story";
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const hero = useMemo(() => {
    const headline = isStory
      ? "I turn noise into signal."
      : "Curiosity is noisy. I build the signal.";
    const subhead =
      "Graduate Student | M.S. Applied Data Science, USC (Dec 2025) | AI & Software Engineer | ML \u00b7 Systems \u00b7 Data";
    const intro = isStory
      ? "I'm a graduate student building systems that matter. Through coursework and personal projects, I'm learning to turn complex problems into reliable solutions\u2014with tests, logs, and clear architecture."
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
    return { headline, subhead, intro, chips };
  }, [isStory]);

  const headlineWords = hero.headline.split(" ");

  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center mb-20 overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />

      {/* Cursor glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${
            isStory ? "rgba(139, 92, 246, 0.06)" : "rgba(6, 182, 212, 0.06)"
          } 0%, transparent 70%)`,
          transition: "left 0.3s ease-out, top 0.3s ease-out",
        }}
      />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-60" />

      <div className="relative max-w-3xl z-10">
        {/* Status badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-mono text-cyan-400 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          System Status: ONLINE // Dec 2025
        </motion.div>

        {/* Headline — staggered word animation */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-100 mb-6 tracking-tight leading-[1.1]">
          {headlineWords.map((word, i) => (
            <motion.span
              key={`${mode}-${i}`}
              className={`inline-block mr-[0.3em] ${
                isStory ? "text-glow-purple" : "text-glow-cyan"
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.3 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subhead */}
        <motion.h2
          className="text-lg md:text-xl text-slate-400 mb-8 font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {hero.subhead}
        </motion.h2>

        {/* Intro with accent border */}
        <motion.p
          className={`text-base md:text-lg leading-relaxed mb-10 max-w-2xl border-l-4 pl-6 transition-all duration-500 ${
            isStory
              ? "border-purple-500 text-slate-200"
              : "border-cyan-500 text-slate-400"
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {hero.intro}
        </motion.p>

        {/* Proof chips */}
        <motion.div
          className="flex flex-wrap gap-2.5 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {hero.chips.map((c, i) => (
            <motion.div
              key={c.text}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full glass text-sm text-slate-300 hover:text-slate-100 transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.9 + i * 0.06 }}
              whileHover={{ scale: 1.05 }}
            >
              {c.icon}
              <span>{c.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <motion.button
            type="button"
            onClick={() => scrollTo("projects")}
            className="px-6 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-cyan-900/30 glow-cyan"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Terminal size={18} />
            Inspect The Work
          </motion.button>
          <motion.button
            type="button"
            onClick={() => scrollTo("thinking")}
            className="px-6 py-3.5 glass glass-hover text-slate-200 font-medium rounded-xl transition-all flex items-center gap-2"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <ScrollText size={18} />
            How I Think
          </motion.button>
          <motion.a
            href={getPublicPath("Docs/Aditya_Ch_Resume.pdf")}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 glass glass-hover text-slate-200 font-medium rounded-xl transition-all flex items-center gap-2"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <FileText size={18} />
            Resume
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
