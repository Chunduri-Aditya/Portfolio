/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a1016",
          2: "#0f1720",
          3: "#141e29",
        },
        text: {
          DEFAULT: "#e8eef0",
          dim: "#a6b6bd",
          faint: "#7d8f97",
        },
        // Peacock ocellus: the eye of the feather. Sapphire and teal are the
        // barbs, viridian the green ring, gold and bronze the metallic outer
        // ring that makes it read as a feather rather than as generic teal.
        // Every value clears WCAG AA on ink; ratios are in the comments.
        accent: {
          sapphire: "#2f8fe0", // 5.58 on ink - primary
          indigo: "#6d82e8",   // 5.47
          teal: "#17b3b3",     // 7.41
          bronze: "#c1743a",   // 5.30
          viridian: "#22c48c", // 8.50
          gold: "#e3b23c",     // 9.74 - the signature
          // Deep pair for CTA fills only. White text on the bright sapphire
          // and teal measures below AA at the 13px bold these buttons use.
          // On the deep pair it is 5.86 and 5.19. Bright tokens stay for text.
          "sapphire-deep": "#1565b8",
          "teal-deep": "#0d7a72",
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
          "radial-gradient(60% 60% at 20% 20%, rgba(47,143,224,0.25), transparent 60%), radial-gradient(50% 50% at 85% 30%, rgba(34,211,238,0.20), transparent 60%), radial-gradient(55% 55% at 50% 90%, rgba(236,72,153,0.18), transparent 60%)",
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
