import React, { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Mail,
  Github,
  Linkedin,
  ToggleLeft,
  ToggleRight,
  Menu,
  X,
} from "lucide-react";

type Mode = "signal" | "story";

interface NavbarProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
  activeSection: string;
  scrollTo: (id: string) => void;
  thoughts: string[];
  tickerIndex: number;
}

const navLinks = [
  { id: "thinking", label: "Thinking" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "skills", label: "Skills" },
];

const ModeToggle = memo(function ModeToggle({
  mode,
  setMode,
}: {
  mode: Mode;
  setMode: (mode: Mode) => void;
}) {
  const next = mode === "signal" ? "story" : "signal";
  return (
    <motion.button
      type="button"
      onClick={() => setMode(next)}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass glass-hover transition-colors text-xs font-mono"
      aria-label={`Switch to ${next} mode`}
      whileTap={{ scale: 0.95 }}
    >
      {mode === "signal" ? (
        <>
          <ToggleLeft size={16} className="text-cyan-400" />
          <span className="text-cyan-400">Signal</span>
        </>
      ) : (
        <>
          <ToggleRight size={16} className="text-purple-400" />
          <span className="text-purple-400">Story</span>
        </>
      )}
    </motion.button>
  );
});

const Navbar: React.FC<NavbarProps> = ({
  mode,
  setMode,
  activeSection,
  scrollTo,
  thoughts,
  tickerIndex,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50">
        <div className="glass border-b border-slate-800/50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            {/* Logo */}
            <motion.button
              type="button"
              onClick={() => scrollTo("hero")}
              className="flex items-center gap-2.5 hover:text-cyan-300 transition-colors"
              aria-label="Go to top"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-white" />
              </div>
              <span className="font-mono font-bold text-slate-100 tracking-tight text-sm">
                ~/aditya
              </span>
            </motion.button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-5">
              {/* Ticker */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={tickerIndex}
                    className="text-slate-400 w-64 truncate"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    {thoughts[tickerIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Links */}
              <div className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                      activeSection === link.id
                        ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 glow-cyan"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <ModeToggle mode={mode} setMode={setMode} />

              <div className="hidden sm:flex items-center gap-2">
                {[
                  { href: "mailto:chunduri@usc.edu", icon: <Mail size={16} />, label: "Email" },
                  { href: "https://github.com/Chunduri-Aditya", icon: <Github size={16} />, label: "GitHub" },
                  { href: "https://linkedin.com/in/chunduriaditya", icon: <Linkedin size={16} />, label: "LinkedIn" },
                ].map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors"
                    aria-label={link.label}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto") ? undefined : "noreferrer"}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>

              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-16 right-0 bottom-0 w-72 glass z-40 p-6 flex flex-col gap-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => {
                      scrollTo(link.id);
                      setMobileOpen(false);
                    }}
                    className={`px-4 py-3 rounded-xl text-left text-sm font-mono transition-all ${
                      activeSection === link.id
                        ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                        : "text-slate-300 hover:bg-slate-800/50"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <div className="border-t border-slate-800 pt-4">
                <div className="flex items-center gap-3">
                  {[
                    { href: "mailto:chunduri@usc.edu", icon: <Mail size={18} />, label: "Email" },
                    { href: "https://github.com/Chunduri-Aditya", icon: <Github size={18} />, label: "GitHub" },
                    { href: "https://linkedin.com/in/chunduriaditya", icon: <Linkedin size={18} />, label: "LinkedIn" },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="p-3 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors"
                      aria-label={link.label}
                      target={link.href.startsWith("mailto") ? undefined : "_blank"}
                      rel={link.href.startsWith("mailto") ? undefined : "noreferrer"}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
