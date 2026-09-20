import React from "react";
import { motion } from "framer-motion";
import { HERO } from "../data/content";
import { Icon } from "../lib/iconMap";
import EvidencePanel from "./EvidencePanel";

interface HeroProps {
  scrollTo: (id: string) => void;
}

/**
 * Identity first, and one thing to do about it.
 *
 * Two passes made this. The first fixed the opening: it used to lead on a claim
 * ("I ship ML systems, then measure whether they actually work") and leave the
 * role to an eyebrow, so a recruiter had to infer the job title from a sentence
 * about method. Name, role and what he builds resolve in that order now.
 *
 * The second removed everything that competed with the answer. The screen also
 * held a six-item capability line, the degree, three social links, a five-item
 * proof strip and four stat tiles, which is eleven things to read and six to
 * click before a reader learns what to do. The capabilities are the Skills
 * section, the degree is in the sidebar, the social links are in the nav and
 * the footer, and the proof strip and stat tiles moved to the closing Contact
 * section, where they answer "should I mail him" instead of interrupting "who
 * is this". What is left is the name, the role, the sentence, one button, and
 * the evidence panel, which is the only element here that is itself a result.
 */
const Hero: React.FC<HeroProps> = ({ scrollTo }) => {
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="hero" className="relative pt-10 lg:pt-16">
      <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
        <motion.div {...fade(0.05)} className="mb-5 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-sm uppercase tracking-[0.2em] text-text-dim">
            {HERO.name}
          </h1>
          <span className="flex items-center gap-1.5 text-xs font-medium text-accent-viridian">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-viridian" />
            {HERO.availability}
          </span>
        </motion.div>

        <motion.p
          {...fade(0.1)}
          className="font-display text-4xl leading-[1.05] text-text sm:text-5xl md:text-[3.5rem]"
        >
          {HERO.roleLabel}
        </motion.p>

        <motion.p {...fade(0.16)} className="mt-5 max-w-2xl text-lg leading-relaxed text-text-dim">
          {HERO.headline}
        </motion.p>

        <motion.div {...fade(0.22)} className="mt-9 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => scrollTo(HERO.ctas.primary.targetSection)}
            className="group flex items-center gap-2.5 rounded-full bg-accent-sapphire-deep px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            {HERO.ctas.primary.label}
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5">
              <Icon name="ArrowUpRight" size={14} />
            </span>
          </button>
          {/*
            A text link, not a second button. Two equally weighted CTAs make a
            reader choose before they know enough to choose.
          */}
          <a
            href={HERO.ctas.resume.href}
            target="_blank"
            rel="noreferrer"
            aria-label="View resume (PDF)"
            className="flex items-center gap-2 text-sm font-semibold text-text-dim underline decoration-white/25 underline-offset-4 transition-colors hover:text-text hover:decoration-white/60"
          >
            <Icon name={HERO.ctas.resume.iconName} size={15} />
            {HERO.ctas.resume.label}
          </a>
        </motion.div>
        </div>

        <motion.div {...fade(0.3)} className="lg:col-span-5">
          <EvidencePanel />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
