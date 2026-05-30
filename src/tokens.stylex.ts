import * as stylex from "@stylexjs/stylex";

// ---------------------------------------------------------------------------
// Generic / Site-wide tokens (used by non-XIV parts of the site)
// ---------------------------------------------------------------------------

export const colors = stylex.defineVars({
  primary: "#335d92",
  primaryMuted: "rgba(68, 107, 158, 0.1)",
  text: "#222",
  background: "#fff",
});

export const spacing = stylex.defineVars({
  sm: "8px",
  md: "16px",
  lg: "24px",
});

export const radii = stylex.defineVars({
  pill: "30px",
  md: "4px",
});

// ---------------------------------------------------------------------------
// XIV UI Design System Tokens
// These represent the visual language of Final Fantasy XIV's interface.
// They are defined here with dark-theme defaults and are fully overridable
// via stylex.createTheme() to support multiple themes (e.g. Dark, Classic,
// Material UI inspired, Frost, etc.).
// ---------------------------------------------------------------------------

export const xiv = stylex.defineVars({
  // --- Backgrounds & Surfaces ---
  // The signature dark panel fill used inside ornate window frames.
  cardBg: "#262626",
  // Deep page / scene background (the area behind windows)
  pageBg: "#0f0f0f",
  // Slightly deeper variant for nested panels or code blocks
  panelBg: "#1f1f1f",
  codeBg: "rgba(0, 0, 0, 0.45)",

  // --- Text Colors (warm, parchment-like) ---
  textPrimary: "#ddd",
  textSecondary: "#ccc",
  textMuted: "#a8a8a8",
  textIntro: "#aaa",
  textCode: "#c9c9c9",
  // The distinctive warm gold used for window titles and important labels
  textGold: "#e8d9a0",

  // --- Accents ---
  gold: "#e8d9a0",
  goldMuted: "#c8a15f",

  // --- Buttons (metallic gray gradient family) ---
  buttonBg: "#4b4b4b",
  buttonGradient: "linear-gradient(180deg, #636363 0%, #4b4b4b 45%, #373737 55%, #454545 100%)",
  buttonText: "#fff",

  // --- Interactive feedback ---
  // Used with filter: brightness(...)
  hoverBrightness: "1.2",
  activeBrightness: "0.65",
  disabledBrightness: "0.65",

  // --- Typography (FFXIV flavor) ---
  fontFamily: "meiryo, system-ui, sans-serif",
  fontFamilyMono: "ui-monospace, SFMono-Regular, Menlo, monospace",
  letterSpacingTitle: "0.3px",
  letterSpacingTitleLarge: "0.5px",

  // --- Motion ---
  transitionFast: "80ms ease",
});

// ---------------------------------------------------------------------------
// Concrete Themes (via createTheme)
// Attach one of these at the root of a subtree using {...stylex.attrs(xivDark)}
// to activate the variable values for that theme.
// ---------------------------------------------------------------------------

/** Modern Dark theme (closest to current retail FFXIV "Dark" UI) */
export const xivDark = stylex.createTheme(xiv, {
  cardBg: "#262626",
  pageBg: "#0f0f0f",
  panelBg: "#1f1f1f",
  codeBg: "rgba(0, 0, 0, 0.45)",

  textPrimary: "#ddd",
  textSecondary: "#ccc",
  textMuted: "#a8a8a8",
  textIntro: "#aaa",
  textCode: "#c9c9c9",
  textGold: "#e8d9a0",

  gold: "#e8d9a0",
  goldMuted: "#c8a15f",

  buttonBg: "#4b4b4b",
  buttonGradient: "linear-gradient(180deg, #636363 0%, #4b4b4b 45%, #373737 55%, #454545 100%)",
  buttonText: "#fff",

  hoverBrightness: "1.2",
  activeBrightness: "0.65",
  disabledBrightness: "0.65",

  fontFamily: "meiryo, system-ui, sans-serif",
  fontFamilyMono: "ui-monospace, SFMono-Regular, Menlo, monospace",
  letterSpacingTitle: "0.3px",
  letterSpacingTitleLarge: "0.5px",

  transitionFast: "80ms ease",
});

/**
 * Alternative theme example — "Slate" (slightly cooler, more modern flat feel).
 * Demonstrates how easy it is to create additional themes for the same
 * component library without touching component code.
 */
export const xivSlate = stylex.createTheme(xiv, {
  cardBg: "#25282f",
  pageBg: "#121318",
  panelBg: "#1a1d24",
  codeBg: "rgba(0, 0, 0, 0.55)",

  textPrimary: "#d8d8d8",
  textSecondary: "#c4c4c4",
  textMuted: "#9a9a9a",
  textIntro: "#9a9a9a",
  textCode: "#b8b8b8",
  textGold: "#d4af37",

  gold: "#d4af37",
  goldMuted: "#a68b4a",

  buttonBg: "#3f4249",
  buttonGradient: "linear-gradient(180deg, #55595f 0%, #3f4249 45%, #2f3238 55%, #3a3d44 100%)",
  buttonText: "#f0f0f0",

  hoverBrightness: "1.15",
  activeBrightness: "0.7",
  disabledBrightness: "0.6",

  fontFamily: "meiryo, system-ui, sans-serif",
  fontFamilyMono: "ui-monospace, SFMono-Regular, Menlo, monospace",
  letterSpacingTitle: "0.3px",
  letterSpacingTitleLarge: "0.5px",

  transitionFast: "80ms ease",
});

/** Future expansion example: Classic / warmer tone */
export const xivClassic = stylex.createTheme(xiv, {
  cardBg: "#2a2720",
  pageBg: "#15120e",
  panelBg: "#1f1b15",
  codeBg: "rgba(0, 0, 0, 0.5)",

  textPrimary: "#e6d9c2",
  textSecondary: "#d4c4a8",
  textMuted: "#a89d85",
  textIntro: "#a89d85",
  textCode: "#c9b99f",
  textGold: "#d4af37",

  gold: "#d4af37",
  goldMuted: "#a68b4a",

  buttonBg: "#524a3a",
  buttonGradient: "linear-gradient(180deg, #6b604d 0%, #524a3a 45%, #3f3729 55%, #484031 100%)",
  buttonText: "#f5e9d3",

  hoverBrightness: "1.18",
  activeBrightness: "0.72",
  disabledBrightness: "0.65",

  fontFamily: "meiryo, system-ui, sans-serif",
  fontFamilyMono: "ui-monospace, SFMono-Regular, Menlo, monospace",
  letterSpacingTitle: "0.3px",
  letterSpacingTitleLarge: "0.5px",

  transitionFast: "80ms ease",
});
