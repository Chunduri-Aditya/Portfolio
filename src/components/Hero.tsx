import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HERO, type Mode } from "../data/content";
import { Icon } from "../lib/iconMap";

interface HeroProps {
  mode: Mode;
  scrollTo: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ mode, scrollTo }) => {
  const isStory = mode === "story";
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Throttle mousemove via rAF + write directly to the DOM so React doesn't
  // re-render the entire hero on every pixel of cursor movement.
  useEffect(() => {
    if (prefersReducedMotion) return;
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;

    let frame = 0;
    let nextX = 0;
    let nextY = 0;

    const flush = () => {
      frame = 0;
      glow.style.transform = `translate3d(${nextX - 200}px, ${nextY - 200}px, 0)`;
      glow.style.opacity = "1";
    };

    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      nextX = e.clientX - rect.left;
      nextY = e.clientY - rect.top;
      if (!frame) frame = requestAnimationFrame(flush);
    };

    const handleLeave = () => {
      glow.style.opacity = "0";
    };

    section.addEventListener("mousemove", handleMove);
    section.addEventListener("mouseleave", handleLeave);
    return () => {
      section.removeEventListener("mousemove", handleMove);
      section.removeEventListener("mouseleave", handleLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [prefersReducedMotion]);

  const headlineWords = HERO.headline[mode].split(" ");
  const intro = HERO.intro[mode];
  const chips = HERO.chips[mode];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[85vh] flex items-center mb-20 overflow-hidden"
    >
      {/* Gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />

      {/* Cursor glow (positioned via rAF in useEffect; opacity stays 0 until first move) */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="absolute top-0 left-0 pointer-events-none will-change-transform"
        style={{
          width: 400,
          height: 400,
          opacity: 0,
          transition: "opacity 0.4s ease-out, background 0.5s ease-out",
          background: `radial-gradient(circle, ${
            isStory ? "rgba(139, 92, 246, 0.08)" : "rgba(6, 182, 212, 0.08)"
          } 0%, transparent 70%)`,
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
          {HERO.statusBadge}
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
          {HERO.subhead}
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
          {intro}
        </motion.p>

        {/* Proof chips */}
        <motion.div
          className="flex flex-wrap gap-2.5 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {chips.map((c, i) => (
            <motion.div
              key={c.text}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full glass text-sm text-slate-300 hover:text-slate-100 transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.9 + i * 0.06 }}
              whileHover={{ scale: 1.05 }}
            >
              <Icon name={c.iconName} size={14} />
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
            onClick={() => scrollTo(HERO.ctas.primary.targetSection)}
            className="px-6 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-cyan-900/30 glow-cyan"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Icon name={HERO.ctas.primary.iconName} size={18} />
            {HERO.ctas.primary.label}
          </motion.button>
          <motion.button
            type="button"
            onClick={() => scrollTo(HERO.ctas.secondary.targetSection)}
            className="px-6 py-3.5 glass glass-hover text-slate-200 font-medium rounded-xl transition-all flex items-center gap-2"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Icon name={HERO.ctas.secondary.iconName} size={18} />
            {HERO.ctas.secondary.label}
          </motion.button>
          <motion.a
            href={HERO.ctas.resume.href}
            target="_blank"
            rel="noreferrer"
            download
            className="px-6 py-3.5 glass glass-hover text-slate-200 font-medium rounded-xl transition-all flex items-center gap-2 border border-slate-700/60 hover:border-cyan-500/40 hover:text-cyan-200"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            aria-label="View resume (PDF)"
          >
            <Icon name={HERO.ctas.resume.iconName} size={18} />
            {HERO.ctas.resume.label}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
