import * as stylex from "@stylexjs/stylex";

import LUIButton from "./components/LUIButton";
import { colorVars, languageUITheme } from "./styles/theme.stylex";

export function App() {
  return (
    <div {...stylex.props(languageUITheme)}>
      <div {...stylex.props(styles.themeRoot)}>
        <nav {...stylex.props(styles.nav)}>
          <LUIButton>Home</LUIButton>
          <LUIButton>About</LUIButton>
        </nav>
        <main
          {...stylex.props(styles.shell)}
          aria-label="Site boilerplate"
        ></main>
      </div>
    </div>
  );
}

const styles = stylex.create({
  nav: {
    display: "flex",
    flexDirection: "row",
    paddingBlockStart: 10,
    paddingInlineStart: 10,
    width: "100%",
  },
  shell: {
    placeItems: "center",
    display: "grid",
    minHeight: "100dvh",
  },
  themeRoot: {
    backgroundColor: colorVars.darkSurfaceBackground,
    color: colorVars.primaryTextColor,
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    minHeight: "100dvh",
  },
});
