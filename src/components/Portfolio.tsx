import React, { Suspense, lazy, useCallback, useMemo, useState } from "react";

import Navbar from "./Navbar";
import Hero from "./Hero";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import ProjectsSection from "./ProjectsSection";
import ExperienceSection from "./ExperienceSection";
import ResearchSection from "./ResearchSection";
import CapabilitiesSection from "./CapabilitiesSection";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import CommandPalette from "./CommandPalette";
import { NAV_LINKS } from "../data/content";
import { useScrollSpy } from "../lib/useScrollSpy";
import { PROFILE_CHAT_URL, chatEnabled } from "../lib/profileChat";

// Loaded only when a service URL was baked in at build time, so the static
// bundle carries no chat code for a build that has nowhere to send a question.
const ProfileChat = lazy(() => import("./ProfileChat"));

const Portfolio: React.FC = () => {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatOn = chatEnabled(PROFILE_CHAT_URL);

  // "hero" is tracked so no nav link is marked current while the hero is on
  // screen, but it is not itself a nav link.
  const sectionIds = useMemo(() => ["hero", ...NAV_LINKS.map((l) => l.id)], []);
  const activeSection = useScrollSpy(sectionIds);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const openPalette = useCallback(() => setIsPaletteOpen(true), []);
  const closePalette = useCallback(() => setIsPaletteOpen(false), []);
  const openChat = useCallback(() => {
    setIsPaletteOpen(false);
    setIsChatOpen(true);
  }, []);
  const closeChat = useCallback(() => setIsChatOpen(false), []);

  return (
    <div className="relative min-h-[100dvh] font-sans text-text antialiased">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Navbar
        activeSection={activeSection}
        scrollTo={scrollTo}
        onOpenPalette={openPalette}
        onOpenChat={chatOn ? openChat : undefined}
      />

      <main id="main" className="relative z-10 mx-auto w-full max-w-[1280px] px-4 pt-28 pb-24 sm:px-6">
        <Hero scrollTo={scrollTo} />

        {/*
          Evidence before background, then the ask. Projects, Experience and
          Research come first; About sits after them, where the claims it makes
          have already been shown; Contact closes, because a reader who has read
          this far is the one worth giving something to do.
        */}
        <div className="mt-28 grid grid-cols-1 gap-x-8 gap-y-28 lg:grid-cols-12">
          <div className="flex flex-col gap-28 lg:col-span-8">
            <ProjectsSection />
            <ExperienceSection />
            <CapabilitiesSection />
            <ResearchSection />
          </div>

          <div className="lg:col-span-4">
            <Sidebar />
          </div>
        </div>

        <div className="mt-28">
          <AboutSection />
        </div>

        <div className="mt-28">
          <ContactSection />
        </div>
      </main>

      <Footer />

      <CommandPalette
        isOpen={isPaletteOpen}
        onOpen={openPalette}
        onClose={closePalette}
        scrollTo={scrollTo}
        onOpenChat={chatOn ? openChat : undefined}
      />
      {chatOn && PROFILE_CHAT_URL && (
        <Suspense fallback={null}>
          <ProfileChat isOpen={isChatOpen} onClose={closeChat} endpoint={PROFILE_CHAT_URL} />
        </Suspense>
      )}
    </div>
  );
};

export default Portfolio;
