import React, { useCallback, useState } from "react";

import Navbar from "./Navbar";
import Hero from "./Hero";
import AboutSection from "./AboutSection";
import ProjectsSection from "./ProjectsSection";
import ExperienceSection from "./ExperienceSection";
import ResearchSection from "./ResearchSection";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import CommandPalette from "./CommandPalette";

const Portfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState("projects");
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  const scrollTo = useCallback((id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const openPalette = useCallback(() => setIsPaletteOpen(true), []);
  const closePalette = useCallback(() => setIsPaletteOpen(false), []);

  return (
    <div className="relative min-h-[100dvh] font-sans text-text antialiased">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Navbar activeSection={activeSection} scrollTo={scrollTo} onOpenPalette={openPalette} />

      <main id="main" className="relative z-10 mx-auto w-full max-w-[1280px] px-4 pt-28 pb-24 sm:px-6">
        <Hero scrollTo={scrollTo} />

        {/*
          Evidence before background. Projects, Experience and Research come
          first; About sits last, where the claims it makes have already been
          shown. NAV_LINKS in content.ts is ordered to match.
        */}
        <div className="mt-28 grid grid-cols-1 gap-x-8 gap-y-28 lg:grid-cols-12">
          <div className="flex flex-col gap-28 lg:col-span-8">
            <ProjectsSection />
            <ExperienceSection />
            <ResearchSection />
          </div>

          <div className="lg:col-span-4">
            <Sidebar />
          </div>
        </div>

        <div className="mt-28">
          <AboutSection />
        </div>
      </main>

      <Footer />

      <CommandPalette isOpen={isPaletteOpen} onOpen={openPalette} onClose={closePalette} scrollTo={scrollTo} />
    </div>
  );
};

export default Portfolio;
