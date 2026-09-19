import React from "react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";
import { CAPABILITIES } from "../data/content";
import { Icon } from "../lib/iconMap";

const ACCENT: Record<string, string> = {
  bronze: "#c1743a",
  sapphire: "#7fb4ee",
  teal: "#17b3b3",
  viridian: "#22c48c",
  indigo: "#6d82e8",
};

/**
 * Was a card in the sticky right rail, which made `#skills` a nav target
 * pointing into a sidebar. It is a section now, at the same level as the work
 * it describes.
 */
const CapabilitiesSection: React.FC = () => (
  <AnimatedSection id="skills" labelledBy="skills-heading">
    <header className="mb-8">
      <p className="eyebrow mb-2">{CAPABILITIES.header.eyebrow}</p>
      <h2 id="skills-heading" className="font-display text-3xl text-text sm:text-4xl">
        {CAPABILITIES.header.title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-text-dim">{CAPABILITIES.header.subtitle}</p>
    </header>

    <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {CAPABILITIES.groups.map((group) => {
        const hue = ACCENT[group.accent];
        return (
          <StaggerItem key={group.category}>
            <div className="h-full rounded-3xl border border-white/[0.12] bg-white/[0.02] p-5 transition-colors hover:border-white/25">
              <h3 className="mb-3 flex items-center gap-2.5 text-sm font-bold text-text">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: `${hue}1a`, color: hue }}
                >
                  <Icon name={group.iconName} size={16} />
                </span>
                {group.category}
              </h3>
              <ul className="flex flex-wrap gap-1.5">
                {group.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full border border-white/[0.10] px-2.5 py-1 text-[11px] text-text-dim"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  </AnimatedSection>
);

export default CapabilitiesSection;
