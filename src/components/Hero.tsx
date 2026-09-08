import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { HERO, HUD_STATS, type Mode } from "../data/content";
import { Icon } from "../lib/iconMap";
import { useDepth } from "../lib/depth";

interface HeroProps {
  mode: Mode;
  scrollTo: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ mode, scrollTo }) => {
  const { depth } = useDepth();
  const isPlain = depth === "plain";
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Scroll parallax on the backdrop grid — its own reduced-motion guard.
  const { scrollY } = useScroll();
  const gridY = useTransform(scrollY, [0, 600], [0, prefersReducedMotion ? 0 : 120]);

  // rAF-throttled cursor reticle glow, written straight to the DOM.
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
      glow.style.transform = `translate3d(${nextX - 180}px, ${nextY - 180}px, 0)`;
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

  const headline = isPlain ? HERO.plain.headline : HERO.headline[mode];
  const intro = isPlain ? HERO.plain.intro : HERO.intro[mode];
  const chips = HERO.chips[mode];

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[calc(100dvh-7rem)] overflow-hidden"
    >
      {/* Backdrop grid (parallax) */}
      <motion.div
        aria-hidden="true"
        style={{ y: gridY }}
        className="dot-grid pointer-events-none absolute inset-x-0 -top-24 bottom-0 opacity-50"
      />
      {/* Cursor reticle glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 will-change-transform"
        style={{
          width: 360,
          height: 360,
          opacity: 0,
          transition: "opacity 0.4s ease-out",
          background:
            "radial-gradient(circle, rgba(230,25,25,0.10) 0%, transparent 70%)",
        }}
      />

      <div className="relative grid grid-cols-1 gap-x-8 gap-y-12 pt-10 lg:grid-cols-12 lg:pt-16">
        {/* Dossier */}
        <div className="lg:col-span-8">
          <motion.div {...fade(0.05)} className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="hud-label">// OPERATOR DOSSIER</span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-hud text-online">
              <span className="h-1.5 w-1.5 rounded-full bg-online animate-blink" />
              STATUS: ONLINE
            </span>
          </motion.div>

          <motion.p
            {...fade(0.1)}
            className="mb-5 font-mono text-xs uppercase tracking-hud text-phosphor-dim"
          >
            A. CHUNDURI &nbsp;/&nbsp; AI SAFETY &amp; AGENT-SECURITY ENGINEER
          </motion.p>

          <motion.h1
            {...fade(0.16)}
            className="max-w-3xl text-balance font-display text-4xl font-extrabold leading-[1.03] tracking-crush text-phosphor sm:text-5xl md:text-[3.4rem]"
          >
            {headline}
          </motion.h1>

          <motion.p
            {...fade(0.24)}
            className="mt-6 font-mono text-[11px] uppercase tracking-hud text-phosphor-faint"
          >
            {HERO.subhead}
          </motion.p>

          <motion.p
            {...fade(0.3)}
            className="mt-7 max-w-2xl border-l border-hazard pl-5 text-sm leading-relaxed text-phosphor-dim md:text-base"
          >
            {intro}
          </motion.p>

          {!isPlain && (
            <motion.div {...fade(0.36)} className="mt-8 flex flex-wrap gap-2">
              {chips.map((c) => (
                <span
                  key={c.text}
                  className="inline-flex items-center gap-1.5 border border-hairline px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-hud text-phosphor-dim"
                >
                  <Icon name={c.iconName} size={12} />
                  {c.text}
                </span>
              ))}
            </motion.div>
          )}

          {/* CTAs */}
          <motion.div {...fade(0.44)} className="mt-10 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => scrollTo(HERO.ctas.primary.targetSection)}
              className="group flex items-center gap-3 bg-hazard px-5 py-3 font-mono text-xs font-bold uppercase tracking-hud text-white transition-colors hover:bg-hazard-bright active:scale-[0.98]"
            >
              {HERO.ctas.primary.label}
              <span className="flex h-6 w-6 items-center justify-center bg-white/15 transition-transform group-hover:translate-x-0.5">
                <Icon name="ArrowUpRight" size={13} />
              </span>
            </button>
            <button
              type="button"
              onClick={() => scrollTo(HERO.ctas.secondary.targetSection)}
              className="flex items-center gap-2 border border-hairline px-5 py-3 font-mono text-xs uppercase tracking-hud text-phosphor-dim transition-colors hover:border-phosphor-faint hover:text-phosphor active:scale-[0.98]"
            >
              <Icon name={HERO.ctas.secondary.iconName} size={14} />
              {HERO.ctas.secondary.label}
            </button>
            <a
              href={HERO.ctas.resume.href}
              target="_blank"
              rel="noreferrer"
              download
              aria-label="View resume (PDF)"
              className="flex items-center gap-2 border border-hairline px-5 py-3 font-mono text-xs uppercase tracking-hud text-phosphor-dim transition-colors hover:border-phosphor-faint hover:text-phosphor active:scale-[0.98]"
            >
              <Icon name={HERO.ctas.resume.iconName} size={14} />
              {HERO.ctas.resume.label}
            </a>
          </motion.div>
        </div>

        {/* Telemetry readout */}
        <motion.div {...fade(0.3)} className="lg:col-span-4">
          <div className="hud-panel hud-corners">
            <div className="border-b border-hairline px-4 py-2">
              <span className="hud-label">// TELEMETRY</span>
            </div>
            <dl className="divide-y divide-hairline">
              {HUD_STATS.map((s) => (
                <div key={s.label} className="flex items-baseline justify-between gap-3 px-4 py-3">
                  <dt className="font-mono text-[10px] uppercase leading-tight tracking-hud text-phosphor-dim">
                    {s.label}
                  </dt>
                  <dd className="hud-readout shrink-0 text-lg font-bold text-phosphor">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="border-t border-hairline px-4 py-2">
              <span className="font-mono text-[10px] uppercase tracking-hud text-phosphor-faint">
                {HERO.statusBadge}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
