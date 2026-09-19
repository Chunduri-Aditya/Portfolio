import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default tseslint.config(
  { ignores: ["dist", "node_modules", "coverage", "vite.config.ts.timestamp-*"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // The accessibility rules are the point of this config: this site sells
      // frontend craft, and a full pass of heading order, landmark and ARIA
      // bugs shipped undetected because nothing was checking.
      ...jsxA11y.flatConfigs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      // Advisory, not a correctness rule, and it fires on three legitimate
      // patterns here: syncing to a matchMedia listener in Hero, and resetting
      // the command palette's query and active index when it opens. Each is a
      // behavioural refactor rather than a bug, so it stays visible as a
      // warning instead of being switched off or blocking the build.
      "react-hooks/set-state-in-effect": "warn",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
  {
    // Test files run under vitest globals and may import devDependencies.
    files: ["**/*.test.{ts,tsx}", "src/test-setup.ts"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: { "@typescript-eslint/no-explicit-any": "off" },
  },
  {
    files: ["*.config.js", "*.config.ts"],
    languageOptions: { globals: globals.node },
  },
);
