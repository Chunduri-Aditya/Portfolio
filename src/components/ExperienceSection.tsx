import React from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";
import { EXPERIENCE, type ExperienceAccent, type Mode } from "../data/content";
import { Icon } from "../lib/iconMap";

const accentMap: Record<ExperienceAccent, { border: string; text: string; bg: string; dot: string }> = {
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
          <Icon name={EXPERIENCE.header.iconName} size={24} className="text-cyan-400" />
        </div>
        <div>
          <h3 className="text-3xl font-bold text-slate-100 mb-2">
            {EXPERIENCE.header.title}
          </h3>
          <p className="text-slate-400 text-sm max-w-2xl">
            {EXPERIENCE.header.subtitle[mode]}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <StaggerContainer className="flex flex-col gap-6">
        {EXPERIENCE.items.map((exp) => {
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
