import React from "react";
import { AnimatedSection } from "./AnimatedSection";
import { ABOUT } from "../data/content";

/**
 * Short by design. This replaced a "How I Think" section that restated in the
 * abstract what the case studies below it already demonstrate.
 */
const AboutSection: React.FC = () => (
  <AnimatedSection id="about" labelledBy="about-heading">
    <header className="mb-6">
      <p className="eyebrow mb-2">{ABOUT.header.eyebrow}</p>
      <h2 id="about-heading" className="font-display text-3xl text-text sm:text-4xl">
        {ABOUT.header.title}
      </h2>
    </header>

    <div className="max-w-2xl space-y-4">
      {ABOUT.paragraphs.map((p) => (
        <p key={p} className="text-[15px] leading-relaxed text-text-dim">
          {p}
        </p>
      ))}
    </div>
  </AnimatedSection>
);

export default AboutSection;
