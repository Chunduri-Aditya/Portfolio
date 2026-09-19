import React from "react";
import { Mail } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";
import { SIDEBAR, CONTACT } from "../data/content";
import { Icon } from "../lib/iconMap";

const Sidebar: React.FC = () => {
  const { education, cta } = SIDEBAR;

  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-24">
      <AnimatedSection id="education" direction="right" labelledBy="education-heading">
        <div className="glass rounded-4xl p-6">
          <h2 id="education-heading" className="eyebrow mb-4">{education.title}</h2>
          <StaggerContainer className="flex flex-col gap-3">
            {education.items.map((entry) => (
              <StaggerItem key={entry.school}>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <div className="mb-1.5 flex items-center gap-2">
                    <Icon name={education.iconName} size={14} className="text-accent-teal" />
                    <span className="text-sm font-bold text-text">{entry.school}</span>
                  </div>
                  <p className="text-[13px] leading-relaxed text-text-dim">{entry.degree}</p>
                  <p className="mt-1 font-mono text-[11px] text-text-faint">
                    {entry.location} · {entry.graduated}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      <AnimatedSection direction="right" delay={0.08} labelledBy="sidebar-cta-heading">
        <div className="glass edge-gradient rounded-4xl p-6 text-center">
          <h2 id="sidebar-cta-heading" className="font-display text-lg text-text">{cta.title}</h2>
          <p className="mb-4 mt-1 text-[13px] text-text-faint">{cta.subtitle}</p>
          <div className="flex flex-col gap-2">
            <a
              href={cta.resumeHref}
              target="_blank"
              rel="noreferrer"
              download
              aria-label="Open resume PDF"
              className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-sapphire-deep to-accent-teal-deep px-4 py-2.5 text-xs font-bold text-white"
            >
              <Icon name="FileText" size={13} />
              {cta.resumeLabel}
            </a>
            <a
              href={cta.emailHref}
              className="flex items-center justify-center gap-2 rounded-full border border-white/[0.12] px-4 py-2.5 text-xs font-semibold text-text-dim transition-colors hover:border-white/25 hover:text-text"
            >
              <Mail size={13} strokeWidth={2} />
              {cta.emailLabel}
            </a>
          </div>
          <div className="mt-3 flex items-center justify-center gap-3 text-[12px] text-text-faint">
            <a className="hover:text-accent-teal" href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <span aria-hidden="true">·</span>
            <a className="hover:text-accent-teal" href={CONTACT.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Sidebar;
