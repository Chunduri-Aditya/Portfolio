import React, { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, Github, Linkedin, Menu, X, Search } from "lucide-react";
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

/** Pill segmented control with an animated gradient thumb. */
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
      className="relative flex rounded-full border border-white/10 bg-white/[0.03] p-0.5"
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
            className="relative z-10 rounded-full px-3 py-1 text-[11px] font-semibold capitalize transition-colors"
          >
            <span className={active ? "text-white" : "text-text-faint hover:text-text-dim"}>{opt}</span>
            {active && (
              <motion.span
                layoutId={`seg-${label}`}
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
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
      <nav className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div className="glass mx-auto flex h-14 w-full max-w-[1180px] items-center justify-between gap-4 rounded-full px-3 pl-4 sm:px-5">
          {/* Brand */}
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            className="group flex items-center gap-2.5"
            aria-label="Go to top"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-accent-violet to-accent-cyan text-white shadow-lg transition-transform group-hover:scale-105">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
            </span>
            <span className="text-sm font-bold tracking-tight text-text">Aditya Chunduri</span>
          </button>

          {/* Center: ticker + search + links */}
          <div className="hidden items-center gap-3 xl:flex">
            <div className="flex items-center gap-2 rounded-full border border-white/[0.08] px-3 py-1">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-emerald shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <div className="h-4 w-52 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={tickerIndex}
                    className="block truncate font-mono text-[11px] text-text-faint"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    {thoughts[tickerIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenPalette}
              className="flex items-center gap-2 rounded-full border border-white/[0.08] px-3 py-1.5 text-[11px] font-medium text-text-faint transition-colors hover:border-white/20 hover:text-text"
              aria-label="Open command palette"
            >
              <Search size={13} strokeWidth={2} />
              Search
              <kbd className="rounded border border-white/10 px-1 font-mono text-[10px]">
                {isMac ? "⌘K" : "^K"}
              </kbd>
            </button>

            <div className="flex items-center gap-0.5">
              {NAV_LINKS.map((link) => {
                const active = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                      active
                        ? "bg-white/10 text-text"
                        : "text-text-faint hover:text-text"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 sm:flex">
              <SegToggle
                label="tone"
                options={["signal", "story"] as const}
                value={mode}
                onChange={(v) => setMode(v as Mode)}
              />
              <SegToggle
                label="depth"
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
                  className="p-2 text-text-faint transition-colors hover:text-accent-cyan"
                  aria-label={label}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noreferrer"}
                >
                  <I size={16} strokeWidth={2} />
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="rounded-full border border-white/10 p-2 text-text-dim transition-colors hover:text-text xl:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={16} strokeWidth={2} /> : <Menu size={16} strokeWidth={2} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile console */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-ink/70 backdrop-blur-sm xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="glass fixed inset-x-3 top-20 z-40 rounded-3xl p-5 xl:hidden"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="eyebrow mb-3">Navigate</p>
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenPalette();
                  }}
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-text-dim hover:bg-white/5 hover:text-text"
                >
                  <Search size={15} strokeWidth={2} />
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
                      className={`rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                        active ? "bg-white/10 text-text" : "text-text-dim hover:bg-white/5 hover:text-text"
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center gap-2 sm:hidden">
                <SegToggle
                  label="tone"
                  options={["signal", "story"] as const}
                  value={mode}
                  onChange={(v) => setMode(v as Mode)}
                />
                <SegToggle
                  label="depth"
                  options={["tech", "plain"] as const}
                  value={depth === "technical" ? "tech" : "plain"}
                  onChange={(v) => setDepth(v === "tech" ? "technical" : "plain")}
                />
              </div>

              <div className="mt-4 flex items-center gap-1 border-t border-white/10 pt-4">
                {SOCIAL.map(({ href, icon: I, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="p-2.5 text-text-faint transition-colors hover:text-accent-cyan"
                    aria-label={label}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel={href.startsWith("mailto") ? undefined : "noreferrer"}
                  >
                    <I size={18} strokeWidth={2} />
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
