import React from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

type Mode = "signal" | "story";

interface ExperienceItem {
  org: string;
  role: string;
  location: string;
  period: string;
  accent: "cyan" | "purple" | "emerald";
  story: string;
  signal: string;
  bullets: string[];
  tags: string[];
}

const EXPERIENCE: ExperienceItem[] = [
  {
    org: "USC \u2014 Viterbi School of Engineering",
    role: "Research Assistant \u00b7 Computer Vision & Medical Imaging",
    location: "Los Angeles, CA",
    period: "Aug 2024 \u2013 Dec 2024",
    accent: "cyan",
    story:
      "Retinal vessels are small, the labels are noisy, and the downstream diagnosis depends on every pixel. I treated the segmentation problem like a systems problem: better loss, better pipeline, better data hygiene\u2014until the score stopped moving by accident.",
    signal:
      "Led U-Net segmentation + data pipeline work on the CVD-Masks retinal dataset across three concurrent projects, with reproducible experiment tracking and automated curation.",
    bullets: [
      "Engineered a U-Net segmentation pipeline for retinal artery-vein classification on CVD-Masks, achieving 94% Dice score through architectural tuning and custom loss functions",
      "Designed modular PyTorch training pipelines with experiment tracking across 3 concurrent projects, cutting iteration cycles 30% and enabling reproducible comparisons",
      "Built an automated medical image scraper with quality-validation controls, cutting manual curation time 40% across 10,000+ images",
      "Presented findings in weekly cross-functional reviews, translating quantitative results into actionable research decisions",
    ],
    tags: ["PyTorch", "U-Net", "Medical Imaging", "Segmentation", "Experiment Tracking"],
  },
  {
    org: "SSN College of Engineering",
    role: "Research Intern \u00b7 Computer Vision & Object Detection",
    location: "Remote",
    period: "Jun 2021 \u2013 Jul 2021",
    accent: "purple",
    story:
      "I wanted to understand what \u201creal-time\u201d actually costs. Fine-tuned YOLO, benchmarked it across five environmental conditions, and built enough reusable tooling that the next intern didn\u2019t have to start from scratch.",
    signal:
      "Object detection / tracking work: YOLO fine-tuning, 30+ fps pipelines, and reusable PyTorch/TensorFlow modules that eliminated manual annotation overhead.",
    bullets: [
      "Built real-time object tracking pipelines achieving 30+ fps; fine-tuned YOLO-based CNN architectures, improving detection robustness 15% across 5 environmental conditions",
      "Automated a video dataset generation pipeline, eliminating 100% of manual frame-annotation overhead",
      "Produced 10+ reusable PyTorch and TensorFlow modules standardizing deployment workflows and reducing onboarding time for new contributors",
    ],
    tags: ["YOLO", "PyTorch", "TensorFlow", "Object Tracking", "Real-Time"],
  },
];

const accentMap: Record<string, { border: string; text: string; bg: string; dot: string }> = {
  cyan: {
    border: "border-cyan-500/20",
    text: "text-cyan-300",
    bg: "bg-cyan-500/10",
    dot: "bg-cyan-400",
  },
  purple: {
    border: "border-purple-500/20",
    text: "text-purple-300",
    bg: "bg-purple-500/10",
    dot: "bg-purple-400",
  },
  emerald: {
    border: "border-emerald-500/20",
    text: "text-emerald-300",
    bg: "bg-emerald-500/10",
    dot: "bg-emerald-400",
  },
};

interface ExperienceSectionProps {
  mode: Mode;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ mode }) => {
  const isStory = mode === "story";

  return (
    <AnimatedSection id="experience" className="mt-2">
      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className="p-3 rounded-xl glass">
          <Briefcase className="text-cyan-400 w-6 h-6" />
        </div>
        <div>
          <h3 className="text-3xl font-bold text-slate-100 mb-2">Field Work</h3>
          <p className="text-slate-400 text-sm max-w-2xl">
            {isStory
              ? "Places where the problem pushed back and forced me to build better tools."
              : "Research roles. What I shipped, measured, and handed off."}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <StaggerContainer className="flex flex-col gap-6">
        {EXPERIENCE.map((exp) => {
          const a = accentMap[exp.accent];
          return (
            <StaggerItem key={`${exp.org}-${exp.period}`}>
              <motion.div
                className="relative rounded-2xl glass overflow-hidden hover:border-slate-700/50 transition-colors"
                whileHover={{ y: -2 }}
              >
                {/* Accent bar */}
                <div className={`h-1 ${a.bg}`} />

                <div className="p-6 md:p-7">
                  {/* Header row */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-slate-100 mb-1">
                        {exp.org}
                      </h4>
                      <div className={`text-sm ${a.text} font-medium`}>{exp.role}</div>
                    </div>
                    <div className="flex flex-col md:items-end gap-1 text-xs font-mono text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar size={12} /> {exp.period}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={12} /> {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Narrative */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-3xl">
                    {isStory ? exp.story : exp.signal}
                  </p>

                  {/* Bullets */}
                  <ul className="space-y-2.5 mb-5">
                    {exp.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm text-slate-300 leading-relaxed"
                      >
                        <span
                          className={`shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full ${a.dot}`}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((t) => (
                      <span
                        key={t}
                        className={`text-xs px-2.5 py-1 rounded-lg border font-mono ${a.border} ${a.bg} ${a.text}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </AnimatedSection>
  );
};

export default ExperienceSection;
