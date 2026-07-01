import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { RESEARCH, type Mode, type ResearchAccent } from "../data/content";
import { Icon } from "../lib/iconMap";

const accentMap: Record<ResearchAccent, string> = {
  cyan: "text-cyan-400 border-cyan-500/20 bg-cyan-500/10",
  purple: "text-purple-400 border-purple-500/20 bg-purple-500/10",
  blue: "text-blue-400 border-blue-500/20 bg-blue-500/10",
  green: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
};

interface ResearchSectionProps {
  mode: Mode;
}

const ResearchSection: React.FC<ResearchSectionProps> = ({ mode }) => {
  const isStory = mode === "story";

  return (
    <AnimatedSection id="research" className="mt-2">
      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className="p-3 rounded-xl glass">
          <Icon name={RESEARCH.header.iconName} size={24} className="text-purple-400" />
        </div>
        <div>
          <h3 className="text-3xl font-bold text-slate-100 mb-2">
            {RESEARCH.header.title}
          </h3>
          <p className="text-slate-400 text-sm max-w-2xl">
            {RESEARCH.header.subtitle[mode]}
          </p>
        </div>
      </div>

      {/* Publication cards */}
      <div className="flex flex-col gap-6">
        {RESEARCH.publications.map((pub) => (
          <div key={pub.title} className="relative rounded-2xl glass overflow-hidden">
            {/* Gradient accents */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/8 rounded-bl-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/5 rounded-tr-full pointer-events-none" />
            <div className="h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500" />

            <div className="relative z-10 p-8">
              <motion.div
                className="inline-block px-3 py-1.5 bg-purple-500/15 text-purple-300 text-xs font-bold rounded-lg mb-4 border border-purple-500/20"
                whileHover={{ scale: 1.05 }}
              >
                {pub.badge}
              </motion.div>

              <h4 className="text-2xl font-bold text-slate-100 mb-3">{pub.title}</h4>
              <p className="text-slate-400 mb-6 max-w-2xl leading-relaxed">
                {isStory ? pub.story : pub.signal}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {pub.metrics.map((m) => (
                  <div
                    key={m.label}
                    className={`rounded-xl border p-3 ${accentMap[m.accent]}`}
                  >
                    <div className="text-xs font-mono text-slate-500 mb-1">{m.label}</div>
                    <div className="text-sm font-semibold">{m.value}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                {pub.links.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-slate-200 hover:text-white flex items-center gap-2 glass glass-hover px-4 py-2.5 rounded-xl transition-colors"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {link.label}
                    <ExternalLink
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
};

export default ResearchSection;
