import React, { useState, useEffect, useRef } from "react";
import { X, Send, MessageCircle } from "lucide-react";
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
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: "intro", isBot: true, text: FAQ_BOT_UI.introMessage, links: [] }]);
      setShowSuggestions(true);
    }
  }, [isOpen, messages.length]);

  const handleScrollToSection = (sectionId?: string) => {
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
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

    setMessages((prev) => [...prev, { id: `user-${Date.now()}`, text: queryText, isBot: false }]);
    setInputValue("");
    setShowSuggestions(false);

    const matchedIntent = matchIntent(queryText, FAQ_INTENTS);

    setTimeout(() => {
      if (matchedIntent) {
        logIntent(matchedIntent.id, queryText);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            text: matchedIntent.answer,
            isBot: true,
            links: matchedIntent.links,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { id: `bot-fallback-${Date.now()}`, text: FAQ_BOT_UI.fallbackMessage, isBot: true, links: [] },
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
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 border border-hazard bg-hazard px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-hud text-white transition-colors hover:bg-hazard-bright focus:outline-none focus:ring-1 focus:ring-hazard"
          aria-label="Open FAQ bot"
        >
          <MessageCircle size={16} strokeWidth={1.5} />
          <span className="hidden sm:inline">{FAQ_BOT_UI.launcherLabel}</span>
        </button>
      )}

      {isOpen && (
        <div className="hud-panel fixed bottom-5 right-5 z-50 flex h-[70vh] max-h-[600px] w-[calc(100vw-2.5rem)] max-w-md flex-col overflow-hidden">
          <div className="h-px w-full bg-hazard" />
          <div className="flex items-center justify-between border-b border-hairline bg-ground-raised p-3">
            <span className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-hud text-phosphor">
              <MessageCircle size={14} strokeWidth={1.5} className="text-hazard" />
              // COMMS CHANNEL
            </span>
            <button
              onClick={handleClose}
              className="border border-hairline p-1.5 text-phosphor-dim transition-colors hover:border-hazard hover:text-hazard focus:outline-none focus:ring-1 focus:ring-hazard"
              aria-label="Close chat"
            >
              <X size={14} strokeWidth={1.5} />
            </button>
          </div>

          <div
            ref={transcriptRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            className="flex-1 space-y-3 overflow-y-auto bg-ground p-4"
          >
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[85%] border p-2.5 text-[13px] leading-relaxed ${
                    msg.isBot
                      ? "border-hairline bg-ground-raised text-phosphor-dim"
                      : "border-hazard bg-hazard text-white"
                  }`}
                >
                  <div>{msg.text}</div>
                  {msg.links && msg.links.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5 border-t border-hairline pt-2.5">
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
                          className="border border-hairline px-2 py-1 font-mono text-[10px] uppercase tracking-hud text-phosphor-dim transition-colors hover:border-hazard hover:text-hazard"
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
                <p className="mb-2 font-mono text-[10px] uppercase tracking-hud text-phosphor-faint">
                  Quick queries:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {FAQ_BOT_UI.quickChips.map((chip) => {
                    const intent = FAQ_INTENTS.find((i) => i.id === chip.id);
                    return (
                      <button
                        key={chip.id}
                        onClick={() => intent && handleSend(intent.title)}
                        className="border border-hairline px-2 py-1 font-mono text-[10px] uppercase tracking-hud text-phosphor-dim transition-colors hover:border-phosphor-faint hover:text-phosphor"
                      >
                        {chip.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-hairline bg-ground-raised p-3">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={FAQ_BOT_UI.inputPlaceholder}
                className="flex-1 border border-hairline bg-ground px-3 py-2 font-mono text-xs text-phosphor placeholder:text-phosphor-faint focus:border-phosphor-faint focus:outline-none"
                aria-label="Ask a question"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim()}
                className="border border-hazard bg-hazard p-2 text-white transition-colors hover:bg-hazard-bright disabled:cursor-not-allowed disabled:border-hairline disabled:bg-transparent disabled:text-phosphor-faint"
                aria-label="Send message"
              >
                <Send size={15} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FaqBot;
