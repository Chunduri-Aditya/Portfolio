/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0d1017",
          2: "#12161f",
          3: "#171c28",
        },
        text: {
          DEFAULT: "#e9ebf2",
          dim: "#aab2c5",
          faint: "#7c8498",
        },
        accent: {
          violet: "#8b5cf6",
          blue: "#3b82f6",
          cyan: "#22d3ee",
          pink: "#ec4899",
          emerald: "#34d399",
          amber: "#fbbf24",
          // Deep pair for CTA fills only. White text on the bright violet/cyan
          // measured 4.23:1 and 1.81:1, both below AA for the 13px bold labels
          // these buttons use. Keep the bright tokens for text and accents.
          "violet-deep": "#7c3aed",
          "cyan-deep": "#0e7490",
        },
      },
      // These must match the families actually imported in src/index.css.
      // They did not: `sans` pointed at "Plus Jakarta Sans Variable", which is
      // not installed, and `font-sans` on the app root then overrode body's
      // Hanken Grotesk for every descendant. The whole site rendered in
      // system-ui while a 34 KB webfont downloaded unused.
      fontFamily: {
        sans: ['"Hanken Grotesk Variable"', "system-ui", "-apple-system", "sans-serif"],
        display: ['"Bricolage Grotesque Variable"', '"Hanken Grotesk Variable"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      boxShadow: {
        soft: "0 24px 50px -28px rgba(0,0,0,0.55)",
        lift: "0 40px 80px -32px rgba(0,0,0,0.65)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.32, 0.72, 0, 1)",
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backgroundImage: {
        "mesh-hero":
          "radial-gradient(60% 60% at 20% 20%, rgba(139,92,246,0.25), transparent 60%), radial-gradient(50% 50% at 85% 30%, rgba(34,211,238,0.20), transparent 60%), radial-gradient(55% 55% at 50% 90%, rgba(236,72,153,0.18), transparent 60%)",
      },
      keyframes: {
        "count-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 2.5s infinite",
      },
    },
  },
  plugins: [],
};
