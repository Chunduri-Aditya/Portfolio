import React from "react";
import { motion } from "framer-motion";
import { Mail, FileText } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";
import { SIDEBAR, CONTACT, type Mode } from "../data/content";
import { Icon } from "../lib/iconMap";

interface SidebarProps {
  mode: Mode;
}

const Sidebar: React.FC<SidebarProps> = ({ mode }) => {
  const { userManual, offKeyboard, skills, cta } = SIDEBAR;

  return (
    <div className="flex flex-col gap-10">
      {/* User Manual */}
      <AnimatedSection direction="right">
        <div className="glass rounded-2xl p-6">
          <h4 className="text-lg font-bold text-slate-100 mb-5 flex items-center gap-2">
            <Icon name={userManual.iconName} size={18} className="text-emerald-400" />
            {userManual.title}
          </h4>
          <ul className="space-y-4 text-sm text-slate-400">
            {userManual.items.map((item) => (
              <li key={item.num} className="flex gap-3">
                <span className="text-emerald-400 font-mono">{item.num}.</span>
                <span>
                  <strong className="text-slate-200">{item.strong}</strong>{" "}
                  {item.text}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl glass p-4">
            <div className="text-xs font-mono text-slate-500 mb-2">
              {userManual.collaborationStyle.label}
            </div>
            <div className="text-sm text-slate-300 leading-relaxed">
              {userManual.collaborationStyle.text[mode]}
            </div>
          </div>

          <div className="mt-4 rounded-xl glass p-4">
            <div className="text-xs font-mono text-slate-500 mb-2">
              {userManual.performanceHabits.label}
            </div>
            <div className="text-sm text-slate-300 leading-relaxed">
              {userManual.performanceHabits.text[mode]}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Off-Keyboard Training */}
      <AnimatedSection direction="right" delay={0.1}>
        <div className="glass rounded-2xl p-6">
          <h4 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
            <Icon name={offKeyboard.iconName} size={18} className="text-purple-400" />
            {offKeyboard.title}
          </h4>
          <p className="text-xs text-slate-500 font-mono mb-4">{offKeyboard.subtitle}</p>

          <StaggerContainer className="space-y-3">
            {offKeyboard.items.map((item) => (
              <StaggerItem key={item.title}>
                <div className="rounded-xl border border-slate-800/40 bg-slate-950/30 p-4 hover:border-slate-700/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name={item.iconName} size={16} className={item.iconClassName} />
                    <span className="text-sm font-semibold text-slate-200">
                      {item.title}
                    </span>
                    {item.extra && (
                      <span className="text-xs text-slate-500 font-mono ml-auto">
                        {item.extra}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.text[mode]}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* Skills */}
      <AnimatedSection id="skills" direction="right" delay={0.2}>
        <h4 className="text-lg font-bold text-slate-100 mb-5 flex items-center gap-2">
          <Icon name={skills.iconName} size={18} className="text-cyan-400" />
          {skills.title}
        </h4>
        <StaggerContainer className="grid gap-3">
          {skills.items.map((skill) => (
            <StaggerItem key={skill.category}>
              <div className="glass rounded-xl p-4 hover:border-slate-700/50 transition-colors">
                <div className="flex items-center gap-2 mb-3 text-slate-200 font-medium text-sm">
                  <Icon name={skill.iconName} size={16} />
                  {skill.category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.tools.map((tool) => (
                    <motion.span
                      key={tool}
                      className="text-xs px-2.5 py-1 bg-slate-900/50 text-slate-400 rounded-lg border border-slate-800/40 font-mono hover:text-slate-200 hover:border-slate-700/50 transition-colors cursor-default"
                      whileHover={{ scale: 1.05 }}
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection direction="right" delay={0.3}>
        <div className="p-6 rounded-2xl glass relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none" />
          <div className="relative z-10">
            <h5 className="text-slate-200 font-bold mb-2 text-lg">{cta.title}</h5>
            <p className="text-xs text-slate-500 mb-5">{cta.subtitle}</p>
            <div className="grid gap-2">
              <motion.a
                href={cta.resumeHref}
                target="_blank"
                rel="noreferrer"
                download
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 glass glass-hover rounded-xl text-sm font-medium text-slate-200 transition-colors border border-cyan-500/30 hover:border-cyan-500/50"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Open resume PDF"
              >
                <Icon name="FileText" size={16} className="text-cyan-300" />
                <span>{cta.resumeLabel}</span>
              </motion.a>
              <a
                href={cta.resumeFullHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors mt-2"
              >
                <FileText size={11} />
                {cta.resumeFullLabel}
              </a>
              <motion.a
                href={cta.emailHref}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 glass glass-hover rounded-xl text-sm font-medium text-slate-300 transition-colors"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Mail size={16} /> {cta.emailLabel}
              </motion.a>
            </div>
            <div className="mt-4 flex items-center justify-center gap-3 text-xs text-slate-500">
              <a
                className="hover:text-cyan-400 transition-colors"
                href={CONTACT.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <span className="text-slate-700" aria-hidden="true">·</span>
              <a
                className="hover:text-cyan-400 transition-colors"
                href={CONTACT.github}
                target="_blank"
                rel="noreferrer"
              >
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
