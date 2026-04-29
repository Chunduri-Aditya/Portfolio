import React from "react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";
import { THINKING, type Mode } from "../data/content";
import { Icon } from "../lib/iconMap";

interface ThinkingSectionProps {
  mode: Mode;
}

const ThinkingSection: React.FC<ThinkingSectionProps> = ({ mode }) => {
  return (
    <AnimatedSection id="thinking" className="mb-20">
      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className="p-3 rounded-xl glass">
          <Icon name={THINKING.header.iconName} size={24} className="text-purple-400" />
        </div>
        <div>
          <h3 className="text-3xl font-bold text-slate-100 mb-2">
            {THINKING.header.title}
          </h3>
          <p className="text-slate-400 text-sm max-w-2xl">
            {THINKING.header.subtitle[mode]}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Loop */}
        <div className="rounded-2xl glass p-6">
          <div className="text-xs font-mono text-slate-500 mb-4">{THINKING.loopLabel}</div>
          <StaggerContainer className="grid gap-3">
            {THINKING.loop.map((step, idx) => (
              <StaggerItem key={step.title}>
                <div className="flex gap-3 rounded-xl border border-slate-800/50 bg-slate-950/30 p-4 hover:border-slate-700/50 transition-colors">
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-slate-900/80 border border-slate-800/50 flex items-center justify-center">
                    <Icon
                      name={step.iconName}
                      size={16}
                      className={step.iconClassName}
                    />
                  </div>
                  <div>
                    <div className="text-slate-100 font-semibold flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-500">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      {step.title}
                    </div>
                    <div className="text-sm text-slate-400 leading-relaxed mt-1">
                      {step.text[mode]}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Values */}
        <div className="rounded-2xl glass p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 blur-[60px] rounded-full pointer-events-none" />
          <div className="relative">
            <div className="text-xs font-mono text-slate-500 mb-4">
              {THINKING.valuesLabel}
            </div>
            <StaggerContainer className="grid gap-3">
              {THINKING.values.map((v) => (
                <StaggerItem key={v.title}>
                  <div className="flex gap-3 rounded-xl border border-slate-800/50 bg-slate-950/30 p-4 hover:border-slate-700/50 transition-colors">
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-slate-900/80 border border-slate-800/50 flex items-center justify-center">
                      <Icon
                        name={v.iconName}
                        size={16}
                        className={v.iconClassName}
                      />
                    </div>
                    <div>
                      <div className="text-slate-100 font-semibold text-sm mb-1">
                        {v.title}
                      </div>
                      <div className="text-xs text-slate-400 leading-relaxed">
                        {v.text[mode]}
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Human part */}
            <div className="mt-5 rounded-xl glass p-4">
              <div className="text-xs font-mono text-slate-500 mb-2">
                {THINKING.humanPart.label}
              </div>
              <div className="text-sm text-slate-300 leading-relaxed">
                {THINKING.humanPart.text[mode]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ThinkingSection;
