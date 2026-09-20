import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import Counter from "./Counter";
import { CLOSING, CONTACT, HUD_STATS, PROOF_POINTS } from "../data/content";

const SOCIAL = [
  { href: CONTACT.github, icon: Github, label: "GitHub" },
  { href: CONTACT.linkedin, icon: Linkedin, label: "LinkedIn" },
];

/**
 * The close, and the only ask on the site.
 *
 * Everything above this is evidence, and the page used to stop there: About,
 * then a footer. This gives a convinced reader one thing to do, and carries the
 * proof strip and the stat tiles down from the hero so the numbers sit next to
 * the button they are meant to justify rather than next to the name.
 */
const ContactSection: React.FC = () => (
  <AnimatedSection id="contact" labelledBy="contact-heading">
    <header className="mb-6">
      <p className="eyebrow mb-2">{CLOSING.eyebrow}</p>
      <h2 id="contact-heading" className="font-display text-3xl text-text sm:text-4xl">
        <span className="gradient-text">{CLOSING.title}</span>
      </h2>
    </header>

    <div className="max-w-2xl space-y-4">
      {CLOSING.paragraphs.map((p) => (
        <p key={p} className="text-[15px] leading-relaxed text-text-dim">
          {p}
        </p>
      ))}
    </div>

    <div className="mt-8 flex flex-wrap items-center gap-5">
      <a
        href={`mailto:${CONTACT.email}`}
        className="group flex items-center gap-2.5 rounded-full bg-accent-sapphire-deep px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
      >
        <Mail size={16} strokeWidth={2} />
        {CLOSING.ctaLabel}
      </a>
      {SOCIAL.map(({ href, icon: I, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-[13px] font-semibold text-text-dim transition-colors hover:text-text"
        >
          <I size={15} strokeWidth={2} />
          {label}
        </a>
      ))}
    </div>

    {/* Short, checkable claims. Each one is backed by a section above. */}
    <ul className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-white/[0.08] py-4 text-[12px] text-text-dim">
      {PROOF_POINTS.map((p, i) => (
        <li key={p} className="flex items-center gap-3">
          {i > 0 && (
            <span aria-hidden="true" className="text-text-faint/50">
              |
            </span>
          )}
          {p}
        </li>
      ))}
    </ul>

    <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {HUD_STATS.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-white/[0.12] bg-white/[0.03] px-4 py-5 transition-colors hover:border-white/25"
        >
          <dd className="font-display text-3xl text-text">
            <Counter value={s.value} className="gradient-text" />
          </dd>
          <dt className="mt-1 text-[11px] leading-tight text-text-faint">{s.label}</dt>
        </div>
      ))}
    </dl>
  </AnimatedSection>
);

export default ContactSection;
