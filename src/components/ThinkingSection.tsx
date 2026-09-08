import React from "react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";
import { THINKING, type Mode } from "../data/content";
import { Icon } from "../lib/iconMap";

interface ThinkingSectionProps {
  mode: Mode;
}

const ThinkingSection: React.FC<ThinkingSectionProps> = ({ mode }) => (
  <AnimatedSection id="thinking">
    <header className="mb-8">
      <p className="hud-label mb-2">// OPERATING PROCEDURE</p>
      <h3 className="font-display text-3xl font-extrabold uppercase tracking-crush text-phosphor sm:text-4xl">
        {THINKING.header.title}
      </h3>
      <p className="mt-2 max-w-2xl text-sm text-phosphor-dim">
        {THINKING.header.subtitle[mode]}
      </p>
    </header>

    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {/* Loop */}
      <div className="hud-panel hud-corners">
        <div className="border-b border-hairline px-4 py-2">
          <span className="hud-label">{THINKING.loopLabel}</span>
        </div>
        <StaggerContainer className="hud-grid grid-cols-1">
          {THINKING.loop.map((step, idx) => (
            <StaggerItem key={step.title}>
              <div className="flex gap-3 p-4">
                <span className="hud-readout shrink-0 text-xs text-hazard">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-hairline text-phosphor-dim">
                  <Icon name={step.iconName} size={14} />
                </span>
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-hud text-phosphor">
                    {step.title}
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-phosphor-dim">
                    {step.text[mode]}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Values */}
      <div className="hud-panel hud-corners">
        <div className="border-b border-hairline px-4 py-2">
          <span className="hud-label">{THINKING.valuesLabel}</span>
        </div>
        <StaggerContainer className="hud-grid grid-cols-1">
          {THINKING.values.map((v) => (
            <StaggerItem key={v.title}>
              <div className="flex gap-3 p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-hairline text-phosphor-dim">
                  <Icon name={v.iconName} size={14} />
                </span>
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-hud text-phosphor">
                    {v.title}
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-phosphor-dim">
                    {v.text[mode]}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <div className="border-t border-hairline p-4">
          <p className="hud-label mb-1">{THINKING.humanPart.label}</p>
          <p className="text-[13px] leading-relaxed text-phosphor-dim">
            {THINKING.humanPart.text[mode]}
          </p>
        </div>
      </div>
    </div>
  </AnimatedSection>
);

export default ThinkingSection;
