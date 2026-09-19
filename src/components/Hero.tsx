import React from "react";
import { motion } from "framer-motion";
import { HERO, HUD_STATS, type Mode } from "../data/content";
import { Icon } from "../lib/iconMap";
import { useDepth } from "../lib/depth";
import Counter from "./Counter";

interface HeroProps {
  mode: Mode;
  scrollTo: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ mode, scrollTo }) => {
  const { depth } = useDepth();
  const isPlain = depth === "plain";

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
      <div>
        <div className="max-w-3xl">
          <motion.div {...fade(0.05)} className="mb-6 flex flex-wrap items-center gap-3">
            <span className="eyebrow rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
              {HERO.roleLabel}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-accent-viridian">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-accent-viridian shadow-[0_0_10px_rgba(34,196,140,0.9)]"
              />
              {HERO.availability}
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
                  <Icon name={c.iconName} size={13} className="text-accent-teal" />
                  {c.text}
                </span>
              ))}
            </motion.div>
          )}

          <motion.div {...fade(0.42)} className="mt-9 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => scrollTo(HERO.ctas.primary.targetSection)}
              className="group flex items-center gap-2.5 rounded-full bg-gradient-to-r from-accent-sapphire-deep to-accent-teal-deep px-6 py-3 text-sm font-bold text-white shadow-[0_20px_50px_-20px_rgba(47,143,224,0.7)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              {HERO.ctas.primary.label}
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5">
                <Icon name="ArrowUpRight" size={14} />
              </span>
            </button>
            <button
              type="button"
              onClick={() => scrollTo(HERO.ctas.secondary.targetSection)}
              className="flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-5 py-3 text-sm font-semibold text-text-dim transition-colors hover:border-white/25 hover:text-text"
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
              className="flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-5 py-3 text-sm font-semibold text-text-dim transition-colors hover:border-white/25 hover:text-text"
            >
              <Icon name={HERO.ctas.resume.iconName} size={15} />
              {HERO.ctas.resume.label}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Telemetry counters */}
      <motion.div
        {...fade(0.5)}
        className="glass mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl sm:grid-cols-4"
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
