/**
 * @type {import("prettier").Config}
 */
export default {
  // Core formatting (matches current project style)
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  useTabs: false,
  printWidth: 100,
  trailingComma: "all",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "avoid",

  // JSX / TSX
  jsxSingleQuote: false,

  // Misc
  endOfLine: "lf",
  quoteProps: "as-needed",

  // Plugins (add later if needed, e.g. for Tailwind or Solid)
  plugins: [],
};
