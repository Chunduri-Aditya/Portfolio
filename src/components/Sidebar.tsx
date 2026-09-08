import React from "react";
import { Mail } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";
import { SIDEBAR, CONTACT, type Mode } from "../data/content";
import { Icon } from "../lib/iconMap";

interface SidebarProps {
  mode: Mode;
}

const PanelHead: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="border-b border-hairline px-4 py-2">
    <span className="hud-label">{children}</span>
  </div>
);

const Sidebar: React.FC<SidebarProps> = ({ mode }) => {
  const { userManual, offKeyboard, skills, cta } = SIDEBAR;

  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-20">
      {/* User Manual */}
      <AnimatedSection direction="right">
        <div className="hud-panel hud-corners">
          <PanelHead>// {userManual.title}</PanelHead>
          <ul className="hud-grid grid-cols-1">
            {userManual.items.map((item) => (
              <li key={item.num} className="flex gap-3 p-4 text-[13px] leading-relaxed text-phosphor-dim">
                <span className="hud-readout shrink-0 text-hazard">{item.num}</span>
                <span>
                  <strong className="text-phosphor">{item.strong}</strong> {item.text}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t border-hairline p-4">
            <p className="hud-label mb-1">{userManual.collaborationStyle.label}</p>
            <p className="text-[13px] leading-relaxed text-phosphor-dim">
              {userManual.collaborationStyle.text[mode]}
            </p>
          </div>
          <div className="border-t border-hairline p-4">
            <p className="hud-label mb-1">{userManual.performanceHabits.label}</p>
            <p className="text-[13px] leading-relaxed text-phosphor-dim">
              {userManual.performanceHabits.text[mode]}
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Off-keyboard */}
      <AnimatedSection direction="right" delay={0.08}>
        <div className="hud-panel hud-corners">
          <PanelHead>// {offKeyboard.title}</PanelHead>
          <p className="border-b border-hairline px-4 py-2 font-mono text-[10px] uppercase tracking-hud text-phosphor-faint">
            {offKeyboard.subtitle}
          </p>
          <StaggerContainer className="hud-grid grid-cols-1">
            {offKeyboard.items.map((item) => (
              <StaggerItem key={item.title}>
                <div className="p-4">
                  <div className="mb-1.5 flex items-center gap-2">
                    <Icon name={item.iconName} size={14} className={item.iconClassName} />
                    <span className="font-mono text-xs font-bold uppercase tracking-hud text-phosphor">
                      {item.title}
                    </span>
                    {item.extra && (
                      <span className="ml-auto font-mono text-[10px] uppercase tracking-hud text-phosphor-faint">
                        {item.extra}
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] leading-relaxed text-phosphor-dim">{item.text[mode]}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* Skills */}
      <AnimatedSection id="skills" direction="right" delay={0.16}>
        <div className="hud-panel hud-corners">
          <PanelHead>// {skills.title}</PanelHead>
          <StaggerContainer className="hud-grid grid-cols-1">
            {skills.items.map((skill) => (
              <StaggerItem key={skill.category}>
                <div className="p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Icon name={skill.iconName} size={14} />
                    <span className="font-mono text-xs font-bold uppercase tracking-hud text-phosphor">
                      {skill.category}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {skill.tools.map((tool) => (
                      <span
                        key={tool}
                        className="font-mono text-[10px] uppercase tracking-hud text-phosphor-faint"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection direction="right" delay={0.24}>
        <div className="hud-panel hud-corners">
          <PanelHead>// {cta.title}</PanelHead>
          <div className="p-4">
            <p className="mb-4 text-[13px] text-phosphor-dim">{cta.subtitle}</p>
            <div className="flex flex-col gap-2">
              <a
                href={cta.resumeHref}
                target="_blank"
                rel="noreferrer"
                download
                aria-label="Open resume PDF"
                className="flex items-center justify-center gap-2 border border-hazard bg-hazard px-4 py-2.5 font-mono text-[10px] uppercase tracking-hud text-white transition-colors hover:bg-hazard-bright"
              >
                <Icon name="FileText" size={13} />
                {cta.resumeLabel}
              </a>
              <a
                href={cta.emailHref}
                className="flex items-center justify-center gap-2 border border-hairline px-4 py-2.5 font-mono text-[10px] uppercase tracking-hud text-phosphor-dim transition-colors hover:border-phosphor-faint hover:text-phosphor"
              >
                <Mail size={13} strokeWidth={1.5} />
                {cta.emailLabel}
              </a>
            </div>
            <div className="mt-3 flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-hud text-phosphor-faint">
              <a className="hover:text-hazard" href={CONTACT.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <span aria-hidden="true">/</span>
              <a className="hover:text-hazard" href={CONTACT.github} target="_blank" rel="noreferrer">
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
