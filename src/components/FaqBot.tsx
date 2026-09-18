import React, { useState, useEffect, useRef } from "react";
import { X, Send, Sparkles } from "lucide-react";
import { FAQ_INTENTS, FAQ_BOT_UI } from "../data/content";
import { matchIntent } from "../lib/matchIntent";

interface Message {
  id: string;
  text: string | React.ReactNode;
  isBot: boolean;
  links?: { label: string; href: string; sectionId?: string }[];
}

const FaqBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: "intro", isBot: true, text: FAQ_BOT_UI.introMessage, links: [] }]);
      setShowSuggestions(true);
    }
  }, [isOpen, messages.length]);

  const handleScrollToSection = (sectionId?: string) => {
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => setIsOpen(false), 300);
      }
    }
  };

  const logIntent = (intentId: string, query: string) => {
    if (typeof window !== "undefined" && window.console) {
      console.log("[FAQ Bot Analytics]", {
        intentId,
        query: query.toLowerCase().trim(),
        timestamp: new Date().toISOString(),
      });
    }
  };

  const handleSend = (query?: string) => {
    const queryText = query || inputValue.trim();
    if (!queryText) return;
    setMessages((p) => [...p, { id: `user-${Date.now()}`, text: queryText, isBot: false }]);
    setInputValue("");
    setShowSuggestions(false);
    const matched = matchIntent(queryText, FAQ_INTENTS);
    setTimeout(() => {
      if (matched) {
        logIntent(matched.id, queryText);
        setMessages((p) => [
          ...p,
          { id: `bot-${Date.now()}`, text: matched.answer, isBot: true, links: matched.links },
        ]);
      } else {
        setMessages((p) => [
          ...p,
          { id: `bot-fb-${Date.now()}`, text: FAQ_BOT_UI.fallbackMessage, isBot: true, links: [] },
        ]);
        setShowSuggestions(true);
      }
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    } else if (e.key === "Escape") {
      setIsOpen(false);
      launcherRef.current?.focus();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    launcherRef.current?.focus();
  };

  return (
    <>
      {!isOpen && (
        <button
          ref={launcherRef}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-violet-deep to-accent-cyan-deep px-4 py-3 text-xs font-bold text-white shadow-[0_20px_50px_-18px_rgba(139,92,246,0.7)] transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-violet/60"
          aria-label="Open FAQ bot"
        >
          <Sparkles size={15} strokeWidth={2} />
          <span className="hidden sm:inline">{FAQ_BOT_UI.launcherLabel}</span>
        </button>
      )}

      {isOpen && (
        <div className="glass-strong fixed bottom-5 right-5 z-50 flex h-[70vh] max-h-[600px] w-[calc(100vw-2.5rem)] max-w-md flex-col overflow-hidden rounded-4xl">
          <div className="edge-gradient flex items-center justify-between border-b border-white/10 bg-white/[0.02] p-3">
            <span className="flex items-center gap-2 text-sm font-bold text-text">
              <Sparkles size={14} strokeWidth={2} className="text-accent-cyan" />
              Ask about my work
            </span>
            <button
              onClick={handleClose}
              className="rounded-full border border-white/[0.12] p-1.5 text-text-dim transition-colors hover:border-accent-pink/60 hover:text-accent-pink"
              aria-label="Close chat"
            >
              <X size={14} strokeWidth={2} />
            </button>
          </div>

          <div
            ref={transcriptRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            className="flex-1 space-y-3 overflow-y-auto p-4"
          >
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-[13px] leading-relaxed ${
                    msg.isBot
                      ? "border border-white/10 bg-white/[0.04] text-text-dim"
                      : "bg-gradient-to-r from-accent-violet-deep to-accent-cyan-deep text-white"
                  }`}
                >
                  <div>{msg.text}</div>
                  {msg.links && msg.links.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5 border-t border-white/15 pt-2.5">
                      {msg.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.href}
                          onClick={(e) => {
                            if (link.sectionId) {
                              e.preventDefault();
                              handleScrollToSection(link.sectionId);
                            }
                          }}
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                          rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                          className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] font-semibold text-text-dim transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {showSuggestions && (
              <div>
                <p className="eyebrow mb-2">Quick questions</p>
                <div className="flex flex-wrap gap-1.5">
                  {FAQ_BOT_UI.quickChips.map((chip) => {
                    const intent = FAQ_INTENTS.find((i) => i.id === chip.id);
                    return (
                      <button
                        key={chip.id}
                        onClick={() => intent && handleSend(intent.title)}
                        className="rounded-full border border-white/[0.12] px-2.5 py-1 text-[11px] font-medium text-text-dim transition-colors hover:border-white/25 hover:text-text"
                      >
                        {chip.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-white/10 bg-white/[0.02] p-3">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={FAQ_BOT_UI.inputPlaceholder}
                className="flex-1 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-text placeholder:text-text-faint focus:border-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
                aria-label="Ask a question"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim()}
                className="rounded-full bg-gradient-to-r from-accent-violet-deep to-accent-cyan-deep p-2.5 text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <Send size={14} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FaqBot;
