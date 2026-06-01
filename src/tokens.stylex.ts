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
  fontFamily: '"Schuss Sans PCG", system-ui, sans-serif',
  fontFamilyMono: "ui-monospace, SFMono-Regular, Menlo, monospace",
  letterSpacingTitle: "0.3px",
  letterSpacingTitleLarge: "0.5px",

  // --- Motion ---
  transitionFast: "80ms ease",
});

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

  fontFamily: '"Schuss Sans PCG", system-ui, sans-serif',
  fontFamilyMono: "ui-monospace, SFMono-Regular, Menlo, monospace",
  letterSpacingTitle: "0.3px",
  letterSpacingTitleLarge: "0.5px",

  transitionFast: "80ms ease",
});
