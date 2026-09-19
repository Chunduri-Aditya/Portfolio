import React from "react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";
import { THINKING, type Mode } from "../data/content";
import { Icon } from "../lib/iconMap";

const ThinkingSection: React.FC<{ mode: Mode }> = ({ mode }) => (
  <AnimatedSection id="thinking" labelledBy="thinking-heading">
    <header className="mb-8">
      <p className="eyebrow mb-2">Operating procedure</p>
      <h2 id="thinking-heading" className="font-display text-3xl text-text sm:text-4xl">
        <span className="gradient-text">{THINKING.header.title}</span>
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-text-dim">{THINKING.header.subtitle[mode]}</p>
    </header>

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="glass rounded-4xl p-6">
        <p className="eyebrow mb-4">{THINKING.loopLabel}</p>
        <StaggerContainer className="flex flex-col gap-3">
          {THINKING.loop.map((step, idx) => (
            <StaggerItem key={step.title}>
              <div className="flex gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
                <span className="font-display text-lg gradient-text">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 text-accent-teal">
                  <Icon name={step.iconName} size={15} />
                </span>
                <div>
                  <p className="text-sm font-bold text-text">{step.title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-text-dim">{step.text[mode]}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <div className="glass rounded-4xl p-6">
        <p className="eyebrow mb-4">{THINKING.valuesLabel}</p>
        <StaggerContainer className="flex flex-col gap-3">
          {THINKING.values.map((v) => (
            <StaggerItem key={v.title}>
              <div className="flex gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 text-accent-bronze">
                  <Icon name={v.iconName} size={15} />
                </span>
                <div>
                  <p className="text-sm font-bold text-text">{v.title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-text-dim">{v.text[mode]}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <div className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
          <p className="eyebrow mb-1">{THINKING.humanPart.label}</p>
          <p className="text-[13px] leading-relaxed text-text-dim">{THINKING.humanPart.text[mode]}</p>
        </div>
      </div>
    </div>
  </AnimatedSection>
);

export default ThinkingSection;
