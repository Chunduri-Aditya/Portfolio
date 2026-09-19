import type { Bar } from "../components/MiniViz";

/**
 * Small quantitative snapshots per project, derived from the evidence bullets in
 * content.ts. Kept here so content.ts stays copy-only. Only projects with a
 * chartable result get an entry; the rest lean on their flow diagram.
 */
export const PROJECT_VIZ: Record<string, { title: string; bars: Bar[] }> = {
  "agent-shield": {
    title: "Transparency Rate — anchored prompt injection (n=20)",
    bars: [
      { label: "Claude Sonnet 4.5", value: 0.15, max: 1, display: "0.150", hue: "#17b3b3" },
      { label: "Llama 3.1 8B", value: 0.0, max: 1, display: "0.000", hue: "#2f8fe0" },
      { label: "Groq Llama 3.3 70B", value: 0.0, max: 1, display: "0.000", hue: "#2f8fe0" },
      { label: "Gemini 3.5 Flash", value: 0.0, max: 1, display: "0.000", hue: "#2f8fe0" },
    ],
  },
  "ai-health-journal": {
    title: "Retrieval recall — before / after the embedder swap",
    bars: [
      { label: "valence_flip category (before)", value: 0.667, max: 1, display: "0.667", hue: "#c1743a" },
      { label: "valence_flip category (after)", value: 1.0, max: 1, display: "1.000", hue: "#22c48c" },
      { label: "Recall@3 overall (after)", value: 0.979, max: 1, display: "0.979", hue: "#17b3b3" },
    ],
  },
  metalearnml: {
    title: "Ranking quality — median Spearman ρ vs baselines",
    bars: [
      { label: "Random", value: 0.0216, max: 0.6, display: "0.02", hue: "#7d8f97" },
      { label: "Proxy only", value: 0.0288, max: 0.6, display: "0.03", hue: "#6d82e8" },
      { label: "Meta only", value: 0.5676, max: 0.6, display: "0.57", hue: "#22c48c" },
      { label: "Proxy + meta", value: 0.407, max: 0.6, display: "0.41", hue: "#2f8fe0" },
    ],
  },
};
