import React, { Suspense, lazy, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HERO, HUD_STATS, type Mode } from "../data/content";
import { Icon } from "../lib/iconMap";
import { useDepth } from "../lib/depth";
import Counter from "./Counter";

const HeroScene = lazy(() => import("./HeroScene"));

interface HeroProps {
  mode: Mode;
  scrollTo: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ mode, scrollTo }) => {
  const { depth } = useDepth();
  const isPlain = depth === "plain";
  const reduce = useReducedMotion();
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    setShow3D(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setShow3D(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [reduce]);

  const headline = isPlain ? HERO.plain.headline : HERO.headline[mode];
  const intro = isPlain ? HERO.plain.intro : HERO.intro[mode];
  const chips = HERO.chips[mode];

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="hero" className="relative pt-10 lg:pt-16">
      <div className="grid grid-cols-1 items-center gap-x-8 gap-y-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.div {...fade(0.05)} className="mb-6 flex flex-wrap items-center gap-3">
            <span className="eyebrow rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
              ML / AI engineer
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-accent-emerald">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
              open to work
            </span>
          </motion.div>

          <motion.h1
            {...fade(0.12)}
            className="font-display text-4xl leading-[1.05] text-text sm:text-5xl md:text-[3.5rem]"
          >
            {isPlain ? (
              headline
            ) : (
              (() => {
                const m = headline.match(/^(.+?[,:])(\s+)(.+)$/);
                if (!m) return <span className="gradient-text">{headline}</span>;
                return (
                  <>
                    {m[1]}{m[2]}
                    <span className="gradient-text">{m[3]}</span>
                  </>
                );
              })()
            )}
          </motion.h1>

          <motion.p {...fade(0.2)} className="mt-4 text-sm text-text-faint">
            {HERO.subhead}
          </motion.p>

          <motion.div {...fade(0.28)} className="glass mt-7 max-w-xl rounded-3xl p-5">
            <p className="text-[15px] leading-relaxed text-text-dim">{intro}</p>
          </motion.div>

          {!isPlain && (
            <motion.div {...fade(0.34)} className="mt-6 flex flex-wrap gap-2">
              {chips.map((c) => (
                <span
                  key={c.text}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-text-dim"
                >
                  <Icon name={c.iconName} size={13} className="text-accent-cyan" />
                  {c.text}
                </span>
              ))}
            </motion.div>
          )}

          <motion.div {...fade(0.42)} className="mt-9 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => scrollTo(HERO.ctas.primary.targetSection)}
              className="group flex items-center gap-2.5 rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan px-6 py-3 text-sm font-bold text-white shadow-[0_20px_50px_-20px_rgba(139,92,246,0.7)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              {HERO.ctas.primary.label}
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5">
                <Icon name="ArrowUpRight" size={14} />
              </span>
            </button>
            <button
              type="button"
              onClick={() => scrollTo(HERO.ctas.secondary.targetSection)}
              className="flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-text-dim transition-colors hover:border-white/25 hover:text-text"
            >
              <Icon name={HERO.ctas.secondary.iconName} size={15} />
              {HERO.ctas.secondary.label}
            </button>
            <a
              href={HERO.ctas.resume.href}
              target="_blank"
              rel="noreferrer"
              download
              aria-label="View resume (PDF)"
              className="flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-text-dim transition-colors hover:border-white/25 hover:text-text"
            >
              <Icon name={HERO.ctas.resume.iconName} size={15} />
              {HERO.ctas.resume.label}
            </a>
          </motion.div>
        </div>

        {/* 3D showpiece */}
        <motion.div
          {...fade(0.2)}
          className="relative aspect-square w-full max-w-[420px] justify-self-center lg:col-span-5"
        >
          <div className="absolute inset-0 rounded-full bg-mesh-hero blur-2xl" aria-hidden="true" />
          {show3D ? (
            <Suspense fallback={<div className="absolute inset-6 rounded-full bg-gradient-to-br from-accent-violet/40 to-accent-cyan/30 blur-2xl" />}>
              <HeroScene />
            </Suspense>
          ) : (
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-accent-violet via-accent-blue to-accent-pink opacity-70 blur-xl" />
          )}
        </motion.div>
      </div>

      {/* Telemetry counters */}
      <motion.div
        {...fade(0.5)}
        className="glass mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl sm:grid-cols-3 lg:grid-cols-5"
      >
        {HUD_STATS.map((s) => (
          <div key={s.label} className="bg-white/[0.015] px-4 py-5">
            <div className="font-display text-3xl text-text">
              <Counter value={s.value} className="gradient-text" />
            </div>
            <p className="mt-1 text-[11px] leading-tight text-text-faint">{s.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;
