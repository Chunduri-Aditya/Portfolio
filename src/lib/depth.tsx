import React, { createContext, useCallback, useContext, useState } from "react";

/**
 * Depth axis — independent of the Signal/Story tone axis (`Mode`).
 *  - "technical": the full engineering write-up (Project.oneLiner / .story, ...)
 *  - "plain":     the jargon-free / ELI5 tier (Project.plain, Hero.plain, ...)
 */
export type Depth = "technical" | "plain";

interface DepthContextValue {
  depth: Depth;
  setDepth: (d: Depth) => void;
  toggleDepth: () => void;
}

const DepthContext = createContext<DepthContextValue | null>(null);

export const DepthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [depth, setDepth] = useState<Depth>("technical");
  const toggleDepth = useCallback(
    () => setDepth((d) => (d === "technical" ? "plain" : "technical")),
    [],
  );
  return (
    <DepthContext.Provider value={{ depth, setDepth, toggleDepth }}>
      {children}
    </DepthContext.Provider>
  );
};

export function useDepth(): DepthContextValue {
  const ctx = useContext(DepthContext);
  // Safe fallback for a component rendered outside the provider (isolated tests).
  if (!ctx) return { depth: "technical", setDepth: () => {}, toggleDepth: () => {} };
  return ctx;
}
