import React, { useState, useEffect, useRef } from "react";
import { X, Send, MessageCircle, ChevronDown } from "lucide-react";
import { faqIntents, FAQIntent } from "../data/faqIntents";
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

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Add intro message on first open with quick chips
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const introMessage: Message = {
        id: "intro",
        isBot: true,
        text: "I'm a lightweight FAQ bot. Ask about my projects, resume, tech stack, or how I think.",
        links: [],
      };
      setMessages([introMessage]);
      setShowSuggestions(true);
    }
  }, [isOpen]);

  const handleScrollToSection = (sectionId?: string) => {
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        // Close bot after scrolling
        setTimeout(() => setIsOpen(false), 300);
      }
    }
  };

  const logIntent = (intentId: string, query: string) => {
    // Log intent selection for analytics
    if (typeof window !== "undefined" && window.console) {
      console.log("[FAQ Bot Analytics]", {
        intentId,
        query: query.toLowerCase().trim(),
        timestamp: new Date().toISOString(),
      });
      // In production, you could send this to an analytics endpoint:
      // fetch('/api/analytics/faq-intent', { method: 'POST', body: JSON.stringify({ intentId, query }) });
    }
  };

  const handleSend = (query?: string) => {
    const queryText = query || inputValue.trim();
    if (!queryText) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: queryText,
      isBot: false,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setShowSuggestions(false);

    // Find matching intent
    const matchedIntent = matchIntent(queryText, faqIntents);

    // Add bot response
    setTimeout(() => {
      if (matchedIntent) {
        // Log intent selection
        logIntent(matchedIntent.id, queryText);
        
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          text: matchedIntent.answer,
          isBot: true,
          links: matchedIntent.links,
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const fallbackMessage: Message = {
          id: `bot-fallback-${Date.now()}`,
          text: "I'm not sure. Try one of these:",
          isBot: true,
          links: [],
        };
        setMessages((prev) => [...prev, fallbackMessage]);
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

  // Quick chips: Projects, Resume, Contact, Tech stack, How I think
  const quickChips = [
    { id: "summarize-projects", label: "Projects" },
    { id: "resume", label: "Resume" },
    { id: "contact-links", label: "Contact" },
    { id: "skills-stack", label: "Tech stack" },
    { id: "about-me", label: "How I think" },
  ];

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          ref={launcherRef}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-full shadow-lg shadow-cyan-900/30 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950"
          aria-label="Open FAQ bot"
        >
          <MessageCircle size={20} />
          <span className="hidden sm:inline">Ask about my work</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-md h-[70vh] max-h-[600px] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <MessageCircle size={20} className="text-cyan-400" />
              FAQ Bot
            </h3>
            <button
              onClick={handleClose}
              className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label="Close chat"
            >
              <X size={18} className="text-slate-400" />
            </button>
          </div>

          {/* Transcript */}
          <div
            ref={transcriptRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.isBot
                      ? "bg-slate-800 text-slate-200"
                      : "bg-cyan-600 text-white"
                  }`}
                >
                  <div className="text-sm leading-relaxed">{msg.text}</div>
                  {msg.links && msg.links.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-700">
                      <div className="flex flex-wrap gap-2">
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
                            rel={
                              link.href.startsWith("http")
                                ? "noreferrer"
                                : undefined
                            }
                            className="text-xs px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
                          >
                            Open {link.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Quick Chips - Always show when suggestions are visible */}
            {showSuggestions && (
              <div className="space-y-2">
                <div className="text-xs text-slate-500 font-mono mb-2">
                  Quick questions:
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickChips.map((chip) => {
                    const intent = faqIntents.find(i => i.id === chip.id);
                    return (
                      <button
                        key={chip.id}
                        onClick={() => {
                          if (intent) {
                            handleSend(intent.title);
                          }
                        }}
                        className="text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      >
                        {chip.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Input Row */}
          <div className="p-4 border-t border-slate-800 bg-slate-950">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about my work..."
                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                aria-label="Ask a question"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim()}
                className="p-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FaqBot;
