import React, { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Mail, Github, Linkedin, Menu, X, Search } from "lucide-react";
import { NAV_LINKS, CONTACT, type Mode } from "../data/content";
import { useDepth } from "../lib/depth";

const isMac =
  typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

interface NavbarProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
  activeSection: string;
  scrollTo: (id: string) => void;
  thoughts: string[];
  tickerIndex: number;
  onOpenPalette: () => void;
}

/** Two-state segmented control, mono, bracketed, 90° corners. */
const SegToggle = memo(function SegToggle<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly [T, T];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div
      className="flex items-stretch border border-hairline"
      role="radiogroup"
      aria-label={label}
    >
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt)}
            className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-hud transition-colors duration-150 ${
              active
                ? "bg-hazard text-white"
                : "text-phosphor-dim hover:text-phosphor"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
});

const SOCIAL = [
  { href: `mailto:${CONTACT.email}`, icon: Mail, label: "Email" },
  { href: CONTACT.github, icon: Github, label: "GitHub" },
  { href: CONTACT.linkedin, icon: Linkedin, label: "LinkedIn" },
];

const Navbar: React.FC<NavbarProps> = ({
  mode,
  setMode,
  activeSection,
  scrollTo,
  thoughts,
  tickerIndex,
  onOpenPalette,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { depth, setDepth } = useDepth();

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-ground/92 backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6">
          {/* Unit ID */}
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            className="glitch group flex items-center gap-2.5"
            aria-label="Go to top"
          >
            <span className="flex h-7 w-7 items-center justify-center border border-hazard text-hazard">
              <Terminal className="h-3.5 w-3.5" strokeWidth={1.5} />
            </span>
            <span className="font-mono text-xs font-bold tracking-hud text-phosphor">
              A.CHUNDURI
            </span>
            <span className="hidden font-mono text-[10px] tracking-hud text-phosphor-faint sm:inline">
              UNIT / AC-01
            </span>
          </button>

          {/* Desktop cluster */}
          <div className="hidden items-center gap-4 xl:flex">
            {/* Telemetry ticker */}
            <div className="flex items-center gap-2 border border-hairline px-2.5 py-1">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-online animate-blink" />
              <div className="h-3 w-56 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={tickerIndex}
                    className="block truncate font-mono text-[10px] uppercase tracking-hud text-phosphor-dim"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                  >
                    {thoughts[tickerIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Search */}
            <button
              type="button"
              onClick={onOpenPalette}
              className="flex items-center gap-2 border border-hairline px-2.5 py-1 font-mono text-[10px] uppercase tracking-hud text-phosphor-dim transition-colors hover:border-phosphor-faint hover:text-phosphor"
              aria-label="Open command palette"
            >
              <Search size={12} strokeWidth={1.5} />
              <span>Search</span>
              <kbd className="border border-hairline px-1 text-phosphor-faint">
                {isMac ? "⌘K" : "^K"}
              </kbd>
            </button>

            {/* Nav links */}
            <div className="flex items-center">
              {NAV_LINKS.map((link) => {
                const active = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    aria-current={active ? "true" : undefined}
                    className={`relative px-2.5 py-1 font-mono text-[10px] uppercase tracking-hud transition-colors ${
                      active
                        ? "text-hazard"
                        : "text-phosphor-dim hover:text-phosphor"
                    }`}
                  >
                    {active && <span className="mr-1 text-hazard">&gt;</span>}
                    {link.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: toggles + social + mobile trigger */}
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 sm:flex">
              <SegToggle
                label="Tone"
                options={["signal", "story"] as const}
                value={mode}
                onChange={(v) => setMode(v as Mode)}
              />
              <SegToggle
                label="Depth"
                options={["tech", "plain"] as const}
                value={depth === "technical" ? "tech" : "plain"}
                onChange={(v) => setDepth(v === "tech" ? "technical" : "plain")}
              />
            </div>

            <div className="hidden items-center xl:flex">
              {SOCIAL.map(({ href, icon: I, label }) => (
                <a
                  key={label}
                  href={href}
                  className="p-2 text-phosphor-dim transition-colors hover:text-hazard"
                  aria-label={label}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noreferrer"}
                >
                  <I size={15} strokeWidth={1.5} />
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="border border-hairline p-2 text-phosphor-dim transition-colors hover:text-phosphor xl:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={16} strokeWidth={1.5} /> : <Menu size={16} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile console */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-ground/80 backdrop-blur-sm xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed inset-x-0 top-14 z-40 border-b border-hairline bg-ground p-5 xl:hidden"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="hud-label mb-3">// NAVIGATION</p>
              <div className="hud-grid grid-cols-1">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenPalette();
                  }}
                  className="flex items-center gap-2 px-4 py-3 text-left font-mono text-xs uppercase tracking-hud text-phosphor-dim hover:text-phosphor"
                >
                  <Search size={14} strokeWidth={1.5} />
                  Search
                </button>
                {NAV_LINKS.map((link) => {
                  const active = activeSection === link.id;
                  return (
                    <button
                      key={link.id}
                      type="button"
                      onClick={() => {
                        scrollTo(link.id);
                        setMobileOpen(false);
                      }}
                      className={`px-4 py-3 text-left font-mono text-xs uppercase tracking-hud transition-colors ${
                        active ? "text-hazard" : "text-phosphor-dim hover:text-phosphor"
                      }`}
                    >
                      {active ? "> " : ""}
                      {link.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center gap-3 sm:hidden">
                <SegToggle
                  label="Tone"
                  options={["signal", "story"] as const}
                  value={mode}
                  onChange={(v) => setMode(v as Mode)}
                />
                <SegToggle
                  label="Depth"
                  options={["tech", "plain"] as const}
                  value={depth === "technical" ? "tech" : "plain"}
                  onChange={(v) => setDepth(v === "tech" ? "technical" : "plain")}
                />
              </div>

              <div className="mt-4 flex items-center gap-1 border-t border-hairline pt-4">
                {SOCIAL.map(({ href, icon: I, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="p-2.5 text-phosphor-dim transition-colors hover:text-hazard"
                    aria-label={label}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel={href.startsWith("mailto") ? undefined : "noreferrer"}
                  >
                    <I size={17} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
