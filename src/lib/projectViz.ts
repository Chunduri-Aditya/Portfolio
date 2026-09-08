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
      { label: "Claude Sonnet 4.5", value: 0.15, max: 1, display: "0.150", hue: "#22d3ee" },
      { label: "Llama 3.1 8B", value: 0.0, max: 1, display: "0.000", hue: "#8b5cf6" },
      { label: "Groq Llama 3.3 70B", value: 0.0, max: 1, display: "0.000", hue: "#8b5cf6" },
      { label: "Gemini 3.5 Flash", value: 0.0, max: 1, display: "0.000", hue: "#8b5cf6" },
    ],
  },
  "ai-health-journal": {
    title: "Retrieval recall — before / after the embedder swap",
    bars: [
      { label: "valence_flip category (before)", value: 0.667, max: 1, display: "0.667", hue: "#ec4899" },
      { label: "valence_flip category (after)", value: 1.0, max: 1, display: "1.000", hue: "#34d399" },
      { label: "Recall@3 overall (after)", value: 0.979, max: 1, display: "0.979", hue: "#22d3ee" },
    ],
  },
  metalearnml: {
    title: "Ranking quality — median Spearman ρ vs baselines",
    bars: [
      { label: "Random", value: 0.0216, max: 0.6, display: "0.02", hue: "#7c8498" },
      { label: "Proxy only", value: 0.0288, max: 0.6, display: "0.03", hue: "#3b82f6" },
      { label: "Meta only", value: 0.5676, max: 0.6, display: "0.57", hue: "#34d399" },
      { label: "Proxy + meta", value: 0.407, max: 0.6, display: "0.41", hue: "#8b5cf6" },
    ],
  },
};
