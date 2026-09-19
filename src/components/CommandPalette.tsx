import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, ArrowUpRight, Github, Linkedin, Mail, FileText, CornerDownLeft } from "lucide-react";
import { NAV_LINKS, CONTACT, HERO, PROJECTS } from "../data/content";
import { Icon } from "../lib/iconMap";
import { useFocusTrap } from "../lib/useFocusTrap";
import { useLockBodyScroll } from "../lib/useLockBodyScroll";

type Group = "Navigate" | "Work" | "Links";

interface PaletteCommand {
  id: string;
  group: Group;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
  keywords?: string;
  action: () => void;
}

const GROUP_ORDER: Group[] = ["Navigate", "Work", "Links"];

const isMac =
  typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

interface CommandPaletteProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  scrollTo: (id: string) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onOpen,
  onClose,
  scrollTo,
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(isOpen);
  useFocusTrap(panelRef, isOpen);

  const commands = useMemo<PaletteCommand[]>(() => {
    return [
      {
        id: "nav-hero",
        group: "Navigate" as Group,
        label: "Top",
        sublabel: "Operator dossier",
        icon: <ArrowUpRight size={15} strokeWidth={1.5} />,
        action: () => scrollTo("hero"),
      },
      ...NAV_LINKS.map((link) => ({
        id: `nav-${link.id}`,
        group: "Navigate" as Group,
        label: link.label,
        sublabel: `Jump to ${link.label}`,
        icon: <ArrowUpRight size={15} strokeWidth={1.5} />,
        action: () => scrollTo(link.id),
      })),
      ...PROJECTS.projects.map((p) => ({
        id: `project-${p.id}`,
        group: "Work" as Group,
        label: p.title,
        sublabel: p.discipline,
        icon: <Icon name={p.iconName} size={15} className={p.iconClassName} />,
        keywords: `${p.tags.join(" ")} ${p.discipline}`,
        action: () => navigate(`/work/${p.id}`),
      })),
      {
        id: "link-github",
        group: "Links" as Group,
        label: "GitHub",
        sublabel: CONTACT.github.replace("https://", ""),
        icon: <Github size={15} strokeWidth={1.5} />,
        action: () => window.open(CONTACT.github, "_blank", "noopener,noreferrer"),
      },
      {
        id: "link-linkedin",
        group: "Links" as Group,
        label: "LinkedIn",
        sublabel: CONTACT.linkedin.replace("https://", ""),
        icon: <Linkedin size={15} strokeWidth={1.5} />,
        action: () => window.open(CONTACT.linkedin, "_blank", "noopener,noreferrer"),
      },
      {
        id: "link-email",
        group: "Links" as Group,
        label: "Email",
        sublabel: CONTACT.email,
        icon: <Mail size={15} strokeWidth={1.5} />,
        action: () => {
          window.location.href = `mailto:${CONTACT.email}`;
        },
      },
      {
        id: "link-resume",
        group: "Links" as Group,
        label: HERO.ctas.resume.label,
        sublabel: "Open resume PDF",
        icon: <FileText size={15} strokeWidth={1.5} />,
        action: () => window.open(HERO.ctas.resume.href, "_blank", "noopener,noreferrer"),
      },
    ];
  }, [scrollTo, navigate]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      [c.label, c.sublabel, c.keywords].filter(Boolean).join(" ").toLowerCase().includes(q),
    );
  }, [commands, query]);

  const grouped = useMemo(
    () =>
      GROUP_ORDER.map((group) => ({
        group,
        items: filtered.filter((c) => c.group === group),
      })).filter((g) => g.items.length > 0),
    [filtered],
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [query, isOpen]);

  // Global shortcut.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onOpen();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onOpen, onClose]);

  // In-palette navigation.
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

  // Keep the active row in view during arrow nav.
  useEffect(() => {
    listRef.current
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  // Flat render order, computed once. This used to be a `let` counter mutated
  // inside the render tree, which broke onMouseEnter (every closure shared the
  // one binding and read its final value, so hovering any row highlighted the
  // last) and is not safe under concurrent rendering.
  const flatCommands = grouped.flatMap((g) => g.items);
  const indexOfCommand = new Map(flatCommands.map((c, i) => [c.id, i]));
  const activeCommandId = flatCommands[activeIndex]
    ? `command-option-${flatCommands[activeIndex].id}`
    : undefined;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center p-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.14 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div className="fixed inset-0 bg-ink/80 backdrop-blur-md" />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="glass-strong edge-gradient relative w-full max-w-xl overflow-hidden rounded-4xl"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
              <Search className="shrink-0 text-text-faint" size={16} strokeWidth={2} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section, project, or link..."
                className="w-full bg-transparent text-sm text-text outline-none placeholder:text-text-faint focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 focus-visible:ring-offset-ink-2"
                aria-label="Search commands"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-palette-list"
                aria-activedescendant={activeCommandId}
              />
              <kbd className="hidden shrink-0 rounded border border-white/[0.12] px-1.5 font-mono text-[10px] text-text-faint sm:inline-block">
                ESC
              </kbd>
            </div>

            <div
              ref={listRef}
              id="command-palette-list"
              role="listbox"
              className="max-h-[52vh] overflow-y-auto p-1.5"
            >
              {grouped.length === 0 && (
                <div className="px-4 py-8 text-center text-[13px] text-text-faint">
                  No matching commands
                </div>
              )}

              {grouped.map(({ group, items }) => (
                <div key={group} className="mb-1">
                  <div className="eyebrow px-3 py-1.5">{group}</div>
                  {items.map((command) => {
                    const index = indexOfCommand.get(command.id) ?? -1;
                    const isActive = index === activeIndex;
                    const optionId = `command-option-${command.id}`;
                    return (
                      <button
                        key={command.id}
                        id={optionId}
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        onClick={() => {
                          command.action();
                          onClose();
                        }}
                        onMouseEnter={() => setActiveIndex(index)}
                        className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors ${
                          isActive
                            ? "bg-gradient-to-r from-accent-sapphire/25 to-accent-teal/15 text-text"
                            : "text-text-dim hover:bg-white/5"
                        }`}
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center text-text-faint">
                          {command.icon}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[13px] font-semibold">{command.label}</span>
                          {command.sublabel && (
                            <span className="block truncate text-[11px] text-text-faint">
                              {command.sublabel}
                            </span>
                          )}
                        </span>
                        {isActive && (
                          <CornerDownLeft size={13} strokeWidth={2} className="shrink-0 text-accent-teal" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 border-t border-white/10 px-4 py-2.5 text-[11px] text-text-faint">
              <span>↑↓ Nav</span>
              <span>↵ Run</span>
              <span>ESC Close</span>
              <span className="ml-auto font-mono">{isMac ? "⌘K" : "^K"}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
