import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, Github, Linkedin, Menu, X, Search, FileText } from "lucide-react";
import { NAV_LINKS, CONTACT, HERO } from "../data/content";

/**
 * Mobile drawer only.
 *
 * The desktop bar carried the same three icons, which put GitHub, LinkedIn and
 * the email address in four places at once: here, the hero, the new Contact
 * section and the footer. Dropping them here is also what makes room for the
 * sixth nav link without the bar wrapping at 1280px, where it turns on.
 */

const isMac =
  typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

interface NavbarProps {
  activeSection: string;
  scrollTo: (id: string) => void;
  onOpenPalette: () => void;
}

const SOCIAL = [
  { href: `mailto:${CONTACT.email}`, icon: Mail, label: "Email" },
  { href: CONTACT.github, icon: Github, label: "GitHub" },
  { href: CONTACT.linkedin, icon: Linkedin, label: "LinkedIn" },
];

const Navbar: React.FC<NavbarProps> = ({ activeSection, scrollTo, onOpenPalette }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

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
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-accent-sapphire-deep to-accent-teal-deep text-white shadow-lg transition-transform group-hover:scale-105">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
            </span>
            <span className="text-sm font-bold tracking-tight text-text">Aditya Chunduri</span>
          </button>

            {/* Center: search + section links */}
          <div className="hidden items-center gap-3 xl:flex">
            <button
              type="button"
              onClick={onOpenPalette}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] py-1.5 pl-3 pr-2 text-[11px] font-medium text-text-dim transition-colors hover:border-white/35 hover:bg-white/[0.07] hover:text-text"
              aria-label="Open command palette"
            >
              <Search size={13} strokeWidth={2} />
              <span className="pr-6">Search projects, sections, links</span>
              <kbd className="rounded border border-white/15 bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-text-faint">
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
            <a
              href={HERO.ctas.resume.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-accent-sapphire-deep px-3.5 py-1.5 text-xs font-bold text-white transition-transform hover:scale-[1.03]"
            >
              <FileText size={13} strokeWidth={2} />
              Resume
            </a>

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
                      aria-current={active ? "page" : undefined}
                      className={`rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                        active ? "bg-white/10 text-text" : "text-text-dim hover:bg-white/5 hover:text-text"
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center gap-1 border-t border-white/10 pt-4">
                {SOCIAL.map(({ href, icon: I, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="p-2.5 text-text-faint transition-colors hover:text-accent-teal"
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
