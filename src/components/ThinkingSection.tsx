import React, { useMemo } from "react";
import {
  Layers,
  Eye,
  Boxes,
  Gauge,
  Timer,
  Rocket,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  XCircle,
} from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

type Mode = "signal" | "story";

interface ThinkingSectionProps {
  mode: Mode;
}

const ThinkingSection: React.FC<ThinkingSectionProps> = ({ mode }) => {
  const isStory = mode === "story";

  const thinkingLoop = useMemo(
    () => [
      {
        title: "Observe",
        icon: <Eye size={16} className="text-cyan-300" />,
        text: isStory
          ? "I start with friction: contradictions, recurring weirdness, the edge case that won't leave."
          : "Identify constraints, failure modes, and a measurable definition of success.",
      },
      {
        title: "Model",
        icon: <Boxes size={16} className="text-purple-300" />,
        text: isStory
          ? "I sketch a model and try to break it. If it survives, it becomes architecture."
          : "Propose an approach with explicit tradeoffs, risks, and interfaces.",
      },
      {
        title: "Instrument",
        icon: <Gauge size={16} className="text-emerald-300" />,
        text: isStory
          ? "I add gauges: tests, logs, metrics\u2014anything that turns \u2018maybe\u2019 into \u2018we know\u2019."
          : "Measure early: evals, traces, structured logs, reproducible configs.",
      },
      {
        title: "Iterate",
        icon: <Timer size={16} className="text-slate-200" />,
        text: isStory
          ? "Short loops. Tight feedback. Find the one lever that fixes five things at once."
          : "Run fast experiments, isolate variables, keep a decision log.",
      },
      {
        title: "Ship",
        icon: <Rocket size={16} className="text-cyan-200" />,
        text: isStory
          ? "I ship when the system behaves. Not when I feel brave."
          : "Package it: docs, tests, and a story that maps to outcomes.",
      },
    ],
    [isStory]
  );

  const values = useMemo(
    () => [
      {
        icon: <ShieldCheck size={16} className="text-emerald-300" />,
        title: "Truthful systems",
        text: isStory
          ? "If it\u2019s not reliable, it\u2019s not helpful. I\u2019d rather be slower than wrong."
          : "Ground claims with retrieval, verify with evals, fail loudly when confidence is wrong.",
      },
      {
        icon: <CheckCircle2 size={16} className="text-cyan-300" />,
        title: "Reproducibility",
        text: isStory
          ? "I sleep better when tomorrow\u2019s run matches today\u2019s run."
          : "Seeded configs + deterministic eval paths + versioned artifacts; same input, same verdict.",
      },
      {
        icon: <ArrowUpRight size={16} className="text-purple-300" />,
        title: "Leverage",
        text: isStory
          ? "I hunt the one lever that fixes five things at once."
          : "Build the eval harness once; every new attack vector becomes a unit test.",
      },
      {
        icon: <XCircle size={16} className="text-slate-200" />,
        title: "Stable behavior over heroics",
        text: isStory
          ? "I don\u2019t chase perfection. I chase stable behavior."
          : "Regressions caught by instrumentation, not by vibes or late-night debugging.",
      },
    ],
    [isStory]
  );

  return (
    <AnimatedSection id="thinking" className="mb-20">
      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className="p-3 rounded-xl glass">
          <Layers className="text-purple-400 w-6 h-6" />
        </div>
        <div>
          <h3 className="text-3xl font-bold text-slate-100 mb-2">How I Think</h3>
          <p className="text-slate-400 text-sm max-w-2xl">
            {isStory
              ? "My operating system for turning intensity into clarity."
              : "A repeatable loop I use to design, debug, and ship."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Loop */}
        <div className="rounded-2xl glass p-6">
          <div className="text-xs font-mono text-slate-500 mb-4">
            Loop (the whole thing fits in my head)
          </div>
          <StaggerContainer className="grid gap-3">
            {thinkingLoop.map((step, idx) => (
              <StaggerItem key={step.title}>
                <div className="flex gap-3 rounded-xl border border-slate-800/50 bg-slate-950/30 p-4 hover:border-slate-700/50 transition-colors">
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-slate-900/80 border border-slate-800/50 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div>
                    <div className="text-slate-100 font-semibold flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-500">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      {step.title}
                    </div>
                    <div className="text-sm text-slate-400 leading-relaxed mt-1">
                      {step.text}
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
              What I'm optimizing for
            </div>
            <StaggerContainer className="grid gap-3">
              {values.map((v) => (
                <StaggerItem key={v.title}>
                  <div className="flex gap-3 rounded-xl border border-slate-800/50 bg-slate-950/30 p-4 hover:border-slate-700/50 transition-colors">
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-slate-900/80 border border-slate-800/50 flex items-center justify-center">
                      {v.icon}
                    </div>
                    <div>
                      <div className="text-slate-100 font-semibold text-sm mb-1">
                        {v.title}
                      </div>
                      <div className="text-xs text-slate-400 leading-relaxed">
                        {v.text}
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Human part */}
            <div className="mt-5 rounded-xl glass p-4">
              <div className="text-xs font-mono text-slate-500 mb-2">The human part</div>
              <div className="text-sm text-slate-300 leading-relaxed">
                {isStory
                  ? "My attention runs wide-angle and laser at the same time. The way I keep it useful is structure: lists, tests, logs, and clean interfaces\u2014so intensity becomes progress, not noise."
                  : "Wide-angle attention and laser focus, running at the same time. Structure\u2014lists, tests, logs, decision trails\u2014keeps both aimed at signal, not noise."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ThinkingSection;
