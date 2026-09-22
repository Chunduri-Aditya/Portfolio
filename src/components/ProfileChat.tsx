import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ArrowUpRight, CornerDownLeft, RefreshCw } from "lucide-react";
import { ask, health, suggestions as fetchSuggestions, type ChatAnswer } from "../lib/profileChat";
import { useFocusTrap } from "../lib/useFocusTrap";
import { useLockBodyScroll } from "../lib/useLockBodyScroll";

/**
 * "Ask about my work": a retrieval-only answer box over the site's own content.
 *
 * Same frame as the command palette, because it is the same kind of surface:
 * type, get a result, leave. The service has no LLM, so every answer is a
 * passage from this site with a link to where it lives.
 */

type Phase =
  | { kind: "idle" }
  | { kind: "waking" }
  | { kind: "loading"; question: string }
  | { kind: "answer"; question: string; result: ChatAnswer }
  | { kind: "error"; question: string };

/** Health slower than this means the free host is spinning up (about a minute). */
const WAKING_AFTER_MS = 1500;
const MAX_SUGGESTIONS = 6;

interface ProfileChatProps {
  isOpen: boolean;
  onClose: () => void;
  endpoint: string;
}

const ProfileChat: React.FC<ProfileChatProps> = ({ isOpen, onClose, endpoint }) => {
  const [query, setQuery] = useState("");
  const [phase, setPhase] = useState<Phase>({ kind: "idle" });
  const [awake, setAwake] = useState(false);
  const [prompts, setPrompts] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(isOpen);
  useFocusTrap(panelRef, isOpen);

  // Ping on open: a slept host answers /health late, and that is the signal to
  // say so instead of leaving the first question hanging in silence.
  useEffect(() => {
    if (!isOpen || awake) return;
    let cancelled = false;
    const timer = window.setTimeout(() => {
      if (!cancelled) setPhase((p) => (p.kind === "idle" ? { kind: "waking" } : p));
    }, WAKING_AFTER_MS);
    Promise.all([health(endpoint), fetchSuggestions(endpoint).catch(() => [] as string[])])
      .then(([, s]) => {
        if (cancelled) return;
        setAwake(true);
        setPrompts(s.slice(0, MAX_SUGGESTIONS));
        setPhase((p) => (p.kind === "waking" ? { kind: "idle" } : p));
      })
      .catch(() => {
        if (!cancelled) setPhase({ kind: "error", question: "" });
      })
      .finally(() => window.clearTimeout(timer));
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [isOpen, awake, endpoint]);

  useEffect(() => {
    if (isOpen) requestAnimationFrame(() => inputRef.current?.focus());
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const submit = useCallback(
    async (question: string) => {
      const q = question.trim();
      if (!q) return;
      setQuery(q);
      setPhase({ kind: "loading", question: q });
      try {
        const result = await ask(q, endpoint);
        setPhase({ kind: "answer", question: q, result });
      } catch {
        setPhase({ kind: "error", question: q });
      }
    },
    [endpoint],
  );

  const suggestionList = (items: string[]) =>
    items.length > 0 && (
      <div className="mt-3 flex flex-wrap gap-1.5">
        {items.slice(0, MAX_SUGGESTIONS).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => submit(s)}
            className="rounded-full border border-white/[0.12] bg-white/[0.04] px-3 py-1.5 text-left text-[12px] font-medium text-text-dim transition-colors hover:border-white/30 hover:bg-white/[0.08] hover:text-text focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 focus-visible:ring-offset-ink-2"
          >
            {s}
          </button>
        ))}
      </div>
    );

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
            aria-label="Ask about my work"
            className="glass-strong edge-gradient relative w-full max-w-xl overflow-hidden rounded-4xl"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <form
              className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5"
              onSubmit={(e) => {
                e.preventDefault();
                submit(query);
              }}
            >
              <MessageSquare className="shrink-0 text-text-faint" size={16} strokeWidth={2} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about a project, a role, or a result..."
                maxLength={500}
                className="w-full bg-transparent text-sm text-text outline-none placeholder:text-text-faint focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 focus-visible:ring-offset-ink-2"
                aria-label="Your question"
                autoComplete="off"
              />
              <button
                type="submit"
                className="hidden shrink-0 items-center gap-1 rounded border border-white/[0.12] px-1.5 py-0.5 font-mono text-[10px] text-text-faint transition-colors hover:text-text sm:inline-flex"
                aria-label="Ask"
              >
                <CornerDownLeft size={11} strokeWidth={2} />
                ASK
              </button>
              <kbd className="hidden shrink-0 rounded border border-white/[0.12] px-1.5 font-mono text-[10px] text-text-faint sm:inline-block">
                ESC
              </kbd>
            </form>

            <div className="max-h-[56vh] overflow-y-auto px-4 py-4" aria-live="polite">
              {phase.kind === "idle" && (
                <>
                  <p className="text-[13px] text-text-dim">
                    Answers come from this site only. No model in between, every answer links to its source.
                  </p>
                  {suggestionList(prompts)}
                </>
              )}

              {phase.kind === "waking" && (
                <p className="flex items-center gap-2 text-[13px] text-text-dim">
                  <RefreshCw size={13} strokeWidth={2} className="animate-spin text-accent-teal" />
                  Waking the answer service. The first question can take up to a minute.
                </p>
              )}

              {phase.kind === "loading" && (
                <div className="space-y-2" aria-label="Looking through the site">
                  <div className="h-3 w-4/5 animate-pulse rounded bg-white/[0.08]" />
                  <div className="h-3 w-3/5 animate-pulse rounded bg-white/[0.08]" />
                </div>
              )}

              {phase.kind === "answer" && phase.result.mode !== "fallback" && (
                <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                  <p className="text-sm leading-relaxed text-text">{phase.result.answer}</p>
                  {phase.result.sources.length > 0 && (
                    <ul className="mt-4 flex flex-col gap-1 border-t border-white/10 pt-3" aria-label="Sources">
                      {phase.result.sources.slice(0, 3).map((s) => (
                        <li key={s.id}>
                          <a
                            href={s.url}
                            onClick={onClose}
                            className="group flex items-center justify-between gap-3 rounded-xl px-2 py-1.5 text-[12px] transition-colors hover:bg-white/[0.06]"
                          >
                            <span className="truncate">
                              <span className="font-semibold text-text">{s.title}</span>
                              <span className="text-text-faint"> · {s.section}</span>
                            </span>
                            <ArrowUpRight size={13} strokeWidth={2} className="shrink-0 text-text-faint group-hover:text-accent-teal" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="mt-3 font-mono text-[10px] text-text-faint">
                    {phase.result.latency_ms} ms · retrieval only
                  </p>
                </motion.div>
              )}

              {phase.kind === "answer" && phase.result.mode === "fallback" && (
                <>
                  <p className="text-[13px] text-text-dim">
                    Nothing on the site answers that. This box only knows what is published here. Try one of these:
                  </p>
                  {suggestionList(phase.result.suggestions ?? prompts)}
                </>
              )}

              {phase.kind === "error" && (
                <div>
                  <p className="text-[13px] text-text-dim">
                    The answer service did not respond. It runs on a free host and may be asleep; try again in a minute.
                  </p>
                  <button
                    type="button"
                    onClick={() => (phase.question ? submit(phase.question) : (setAwake(false), setPhase({ kind: "idle" })))}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] px-3 py-1.5 text-[12px] font-medium text-text-dim transition-colors hover:border-white/30 hover:text-text"
                  >
                    <RefreshCw size={12} strokeWidth={2} />
                    Try again
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileChat;
