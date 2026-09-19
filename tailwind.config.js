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
        // Ratios below are measured against the *lightest surface this text
        // actually lands on*, not against bare ink. Surfaces stack: a
        // white/[0.06] card sits on a white/[0.04] glass panel sitting on ink,
        // and each layer lifts the background and cuts contrast. Measured on
        // bare ink alone, faint looked fine at 5.69; on that stack it was
        // 4.44, under AA.
        text: {
          DEFAULT: "#e8eef0", // 12.73 on the lightest stack
          dim: "#a6b6bd", // 7.14 on the lightest stack
          faint: "#7f9199", // 4.55 on the lightest stack, 5.84 on bare ink
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
    },
  },
  plugins: [],
};
