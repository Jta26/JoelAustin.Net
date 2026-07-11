import * as stylex from "@stylexjs/stylex";

const languageUIColorValues = {
  darkSurfaceBackground: "#050914",
  onMediaTextColor: "#070b12",
  primaryBlue: "#73ddff",
  primaryTextColor: "#d8f3ff",
  secondaryBlue: "#24a8ff",
  secondaryTextColor: "#a8b8c8",
} as const;

export const colorVars = stylex.defineVars(languageUIColorValues);

export const languageUITheme = stylex.createTheme(
  colorVars,
  languageUIColorValues,
);
