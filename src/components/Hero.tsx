import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { CONTACT, HERO } from "../data/content";
import { Icon } from "../lib/iconMap";

interface HeroProps {
  scrollTo: (id: string) => void;
}

/**
 * Identity first.
 *
 * The previous hero opened on a claim ("I ship ML systems, then measure whether
 * they actually work") and left the role to an eyebrow, so a recruiter had to
 * infer the job title from a sentence about method. Name, role, and what he
 * builds now resolve in that order, followed by the terms a recruiter is
 * actually scanning for.
 */
const Hero: React.FC<HeroProps> = ({ scrollTo }) => {
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="hero" className="relative pt-10 lg:pt-16">
      <div className="max-w-3xl">
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

        <motion.ul
          {...fade(0.22)}
          className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[13px] text-text-faint"
        >
          {HERO.capabilities.map((c, i) => (
            <li key={c} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden="true" className="text-text-faint/50">
                  ·
                </span>
              )}
              {c}
            </li>
          ))}
        </motion.ul>

        <motion.p {...fade(0.26)} className="mt-4 text-sm text-text-faint">
          {HERO.subhead}
        </motion.p>

        <motion.div {...fade(0.32)} className="mt-9 flex flex-wrap items-center gap-3">
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
          <a
            href={HERO.ctas.resume.href}
            target="_blank"
            rel="noreferrer"
            aria-label="View resume (PDF)"
            className="flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-text transition-colors hover:border-white/50"
          >
            <Icon name={HERO.ctas.resume.iconName} size={15} />
            {HERO.ctas.resume.label}
          </a>
        </motion.div>

        <motion.div {...fade(0.38)} className="mt-7 flex flex-wrap items-center gap-5">
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-[13px] font-semibold text-text-dim transition-colors hover:text-text"
          >
            <Github size={15} strokeWidth={2} />
            GitHub
          </a>
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-[13px] font-semibold text-text-dim transition-colors hover:text-text"
          >
            <Linkedin size={15} strokeWidth={2} />
            LinkedIn
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="flex items-center gap-2 text-[13px] font-semibold text-text-dim transition-colors hover:text-text"
          >
            <Mail size={15} strokeWidth={2} />
            Email
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
