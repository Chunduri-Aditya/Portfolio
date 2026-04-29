import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./Navbar";
import Hero from "./Hero";
import ThinkingSection from "./ThinkingSection";
import ProjectsSection from "./ProjectsSection";
import ExperienceSection from "./ExperienceSection";
import ResearchSection from "./ResearchSection";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import FaqBot from "./FaqBot";
import { TICKER_THOUGHTS, type Mode } from "../data/content";

const Portfolio: React.FC = () => {
  const [mode, setMode] = useState<Mode>("signal");
  const [tickerIndex, setTickerIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("projects");

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % TICKER_THOUGHTS.length);
    }, 3800);
    return () => window.clearInterval(interval);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Navbar */}
      <Navbar
        mode={mode}
        setMode={setMode}
        activeSection={activeSection}
        scrollTo={scrollTo}
        thoughts={TICKER_THOUGHTS}
        tickerIndex={tickerIndex}
      />

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 pt-24 pb-20">
        {/* Hero */}
        <Hero mode={mode} scrollTo={scrollTo} />

        {/* Section divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800/50 to-transparent mb-16" />

        {/* Thinking */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`thinking-${mode}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ThinkingSection mode={mode} />
          </motion.div>
        </AnimatePresence>

        {/* Section divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800/50 to-transparent mb-16" />

        {/* 2-column layout: Projects + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Projects + Research */}
          <div className="lg:col-span-8 flex flex-col gap-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={`projects-${mode}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectsSection mode={mode} />
              </motion.div>
            </AnimatePresence>

            {/* Section divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-slate-800/50 to-transparent" />

            <AnimatePresence mode="wait">
              <motion.div
                key={`experience-${mode}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ExperienceSection mode={mode} />
              </motion.div>
            </AnimatePresence>

            {/* Section divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-slate-800/50 to-transparent" />

            <AnimatePresence mode="wait">
              <motion.div
                key={`research-${mode}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ResearchSection mode={mode} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Sidebar */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`sidebar-${mode}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Sidebar mode={mode} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* FAQ Bot */}
      <FaqBot />
    </div>
  );
};

export default Portfolio;
