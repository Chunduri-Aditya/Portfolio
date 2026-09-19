import React, { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

import Navbar from "./Navbar";
import Hero from "./Hero";
import ThinkingSection from "./ThinkingSection";
import ProjectsSection from "./ProjectsSection";
import ExperienceSection from "./ExperienceSection";
import ResearchSection from "./ResearchSection";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import FaqBot from "./FaqBot";
import CommandPalette from "./CommandPalette";
import Aurora from "./Aurora";
import { DepthProvider } from "../lib/depth";
import { TICKER_THOUGHTS, type Mode } from "../data/content";

const Portfolio: React.FC = () => {
  const [mode, setMode] = useState<Mode>("signal");
  const [tickerIndex, setTickerIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("projects");
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  // Honour prefers-reduced-motion: hold on the first thought rather than
  // rotating. Auto-advancing text is the clearest case the preference covers.
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    if (reduceMotion) return;
    const interval = window.setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % TICKER_THOUGHTS.length);
    }, 3800);
    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  const scrollTo = useCallback((id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const openPalette = useCallback(() => setIsPaletteOpen(true), []);
  const closePalette = useCallback(() => setIsPaletteOpen(false), []);

  return (
    <DepthProvider>
      <div className="relative min-h-[100dvh] font-sans text-text antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Aurora />
        <div className="grain-overlay" aria-hidden="true" />

        <Navbar
          mode={mode}
          setMode={setMode}
          activeSection={activeSection}
          scrollTo={scrollTo}
          thoughts={TICKER_THOUGHTS}
          tickerIndex={tickerIndex}
          onOpenPalette={openPalette}
        />

        <main id="main" className="relative z-10 mx-auto w-full max-w-[1280px] px-4 pt-28 pb-24 sm:px-6">
          <Hero mode={mode} scrollTo={scrollTo} />

          {/*
            Evidence before philosophy. Thinking used to render here, directly
            under the hero, so a visitor met the method before anything that
            earned it. It now sits after Projects, Experience and Research,
            where the claims it makes are already backed by what they just read.
            NAV_LINKS in content.ts is ordered to match; nothing else depends on
            this order, because the site has no scroll spy.
          */}
          <div className="mt-28 grid grid-cols-1 gap-x-8 gap-y-28 lg:grid-cols-12">
            <div className="flex flex-col gap-28 lg:col-span-8">
              <ProjectsSection mode={mode} />
              <ExperienceSection mode={mode} />
              <ResearchSection mode={mode} />
            </div>

            <div className="lg:col-span-4">
              <Sidebar mode={mode} />
            </div>
          </div>

          <div className="mt-28">
            <ThinkingSection mode={mode} />
          </div>
        </main>

        <Footer />

        <FaqBot />

        <CommandPalette
          isOpen={isPaletteOpen}
          onOpen={openPalette}
          onClose={closePalette}
          mode={mode}
          setMode={setMode}
          scrollTo={scrollTo}
        />
      </div>
    </DepthProvider>
  );
};

export default Portfolio;
