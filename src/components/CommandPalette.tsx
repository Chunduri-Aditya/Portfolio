import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  FileText,
  ToggleLeft,
  ToggleRight,
  CornerDownLeft,
} from "lucide-react";
import { NAV_LINKS, CONTACT, HERO, PROJECTS, type Mode } from "../data/content";
import { Icon } from "../lib/iconMap";
import { useLockBodyScroll } from "../lib/useLockBodyScroll";

type Group = "Navigate" | "Projects" | "Links" | "Appearance";

interface PaletteCommand {
  id: string;
  group: Group;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
  keywords?: string;
  action: () => void;
}

const GROUP_ORDER: Group[] = ["Navigate", "Projects", "Links", "Appearance"];

const isMac =
  typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

interface CommandPaletteProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
  scrollTo: (id: string) => void;
  onSelectProject: (id: string) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onOpen,
  onClose,
  mode,
  setMode,
  scrollTo,
  onSelectProject,
}) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useLockBodyScroll(isOpen);

  const commands = useMemo<PaletteCommand[]>(() => {
    const nextMode = mode === "signal" ? "story" : "signal";
    return [
      { id: "nav-hero", group: "Navigate" as Group, label: "Home", sublabel: "Back to the top", icon: <ArrowRight size={16} />, action: () => scrollTo("hero") },
      ...NAV_LINKS.map((link) => ({
        id: `nav-${link.id}`,
        group: "Navigate" as Group,
        label: link.label,
        sublabel: `Jump to ${link.label}`,
        icon: <ArrowRight size={16} />,
        action: () => scrollTo(link.id),
      })),
      ...PROJECTS.projects.map((p) => ({
        id: `project-${p.id}`,
        group: "Projects" as Group,
        label: p.title,
        sublabel: p.subtitle,
        icon: <Icon name={p.iconName} size={16} className={p.iconClassName} />,
        keywords: p.tags.join(" "),
        action: () => onSelectProject(p.id),
      })),
      {
        id: "link-github",
        group: "Links" as Group,
        label: "GitHub",
        sublabel: CONTACT.github.replace("https://", ""),
        icon: <Github size={16} />,
        action: () => window.open(CONTACT.github, "_blank", "noopener,noreferrer"),
      },
      {
        id: "link-linkedin",
        group: "Links" as Group,
        label: "LinkedIn",
        sublabel: CONTACT.linkedin.replace("https://", ""),
        icon: <Linkedin size={16} />,
        action: () => window.open(CONTACT.linkedin, "_blank", "noopener,noreferrer"),
      },
      {
        id: "link-email",
        group: "Links" as Group,
        label: "Email",
        sublabel: CONTACT.email,
        icon: <Mail size={16} />,
        action: () => {
          window.location.href = `mailto:${CONTACT.email}`;
        },
      },
      {
        id: "link-resume",
        group: "Links" as Group,
        label: HERO.ctas.resume.label,
        sublabel: "Open resume",
        icon: <FileText size={16} />,
        action: () => window.open(HERO.ctas.resume.href, "_blank", "noopener,noreferrer"),
      },
      {
        id: "mode-toggle",
        group: "Appearance" as Group,
        label: `Switch to ${nextMode === "story" ? "Story" : "Signal"} mode`,
        sublabel: nextMode === "story" ? "More narrative, less terse" : "Terse, scannable copy",
        icon:
          nextMode === "story" ? (
            <ToggleRight size={16} className="text-purple-400" />
          ) : (
            <ToggleLeft size={16} className="text-cyan-400" />
          ),
        action: () => setMode(nextMode),
      },
    ];
  }, [mode, scrollTo, onSelectProject, setMode]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      [c.label, c.sublabel, c.keywords].filter(Boolean).join(" ").toLowerCase().includes(q)
    );
  }, [commands, query]);

  const grouped = useMemo(() => {
    return GROUP_ORDER.map((group) => ({
      group,
      items: filtered.filter((c) => c.group === group),
    })).filter((g) => g.items.length > 0);
  }, [filtered]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, isOpen]);

  // Global shortcut: opens/closes regardless of mount state elsewhere on the page.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        isOpen ? onClose() : onOpen();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onOpen, onClose]);

  // In-palette navigation: only active while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const command = filtered[activeIndex];
        if (command) {
          command.action();
          onClose();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, filtered, activeIndex, onClose]);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
      setQuery("");
    }
  }, [isOpen]);

  let runningIndex = -1;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="relative max-w-xl w-full bg-slate-900/95 rounded-2xl border border-slate-800/60 shadow-2xl backdrop-blur-sm overflow-hidden"
            initial={{ opacity: 0, scale: 0.97, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500" />

            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800/50">
              <Search className="text-slate-500 flex-shrink-0" size={18} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section, project, or link..."
                className="w-full bg-transparent outline-none text-sm text-slate-200 placeholder:text-slate-600"
                aria-label="Search commands"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-palette-list"
              />
              <kbd className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-700 text-slate-500 flex-shrink-0">
                ESC
              </kbd>
            </div>

            <div id="command-palette-list" role="listbox" className="max-h-[50vh] overflow-y-auto">
              {grouped.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-slate-500 font-mono">
                  No matching commands
                </div>
              )}

              {grouped.map(({ group, items }) => (
                <div key={group}>
                  <div className="px-4 pt-3 pb-1 text-xs font-mono uppercase tracking-widest text-slate-500">
                    {group}
                  </div>
                  {items.map((command) => {
                    runningIndex += 1;
                    const isActive = runningIndex === activeIndex;
                    return (
                      <button
                        key={command.id}
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        onClick={() => {
                          command.action();
                          onClose();
                        }}
                        onMouseEnter={() => setActiveIndex(runningIndex)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                          isActive
                            ? "bg-cyan-500/10 text-cyan-200"
                            : "text-slate-300 hover:bg-slate-800/50"
                        }`}
                      >
                        <span className="flex-shrink-0 text-slate-500">{command.icon}</span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-medium truncate">
                            {command.label}
                          </span>
                          {command.sublabel && (
                            <span className="block text-xs text-slate-500 font-mono truncate">
                              {command.sublabel}
                            </span>
                          )}
                        </span>
                        {isActive && (
                          <CornerDownLeft size={14} className="text-cyan-400 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 px-4 py-2 border-t border-slate-800/50 text-[11px] text-slate-600 font-mono">
              <span>&uarr;&darr; Navigate</span>
              <span>&crarr; Select</span>
              <span>ESC Close</span>
              <span className="ml-auto">{isMac ? "⌘K" : "Ctrl+K"} to toggle</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
