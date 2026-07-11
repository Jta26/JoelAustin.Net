import * as stylex from "@stylexjs/stylex";

import LUIButton from "./components/LUIButton";
import LUICard from "./components/LUICard";
import LUIHypercube from "./components/LUIHypercube";
import { colorVars, languageUITheme } from "./styles/theme.stylex";

export function App() {
  return (
    <div {...stylex.props(languageUITheme)}>
      <div {...stylex.props(styles.themeRoot)}>
        <nav {...stylex.props(styles.nav)}>
          <LUIButton>Home</LUIButton>
          <LUIButton>About</LUIButton>
        </nav>
        <main {...stylex.props(styles.shell)} aria-label="Site boilerplate">
          <div {...stylex.props(styles.hypercubeLayer)}>
            <LUIHypercube xstyle={styles.cube} />
          </div>
          <LUICard title="Lorem ipsum dolor" xstyle={styles.card}>
            <p {...stylex.props(styles.cardText)}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              vitae luctus augue. Donec vel ligula at arcu fermentum facilisis
              sed non lorem.
            </p>
          </LUICard>
        </main>
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
    overflow: "hidden",
    paddingBlock: 72,
    paddingInline: 24,
    placeItems: "center",
    display: "grid",
    isolation: "isolate",
    position: "relative",
    minHeight: "100dvh",
  },
  card: {
    zIndex: 1,
    maxWidth: 420,
    width: "min(100%, 420px)",
  },
  cardText: {
    margin: 0,
    color: colorVars.secondaryTextColor,
    fontSize: 14,
    lineHeight: 1.6,
  },
  themeRoot: {
    backgroundColor: colorVars.darkSurfaceBackground,
    color: colorVars.primaryTextColor,
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    minHeight: "100dvh",
  },
  cube: {
    height: {
      default: "min(90vw, 820px)",
      "@media (max-width: 700px)": "min(118vw, 660px)",
    },
    width: {
      default: "min(90vw, 820px)",
      "@media (max-width: 700px)": "min(118vw, 660px)",
    },
  },
  hypercubeLayer: {
    insetBlockStart: {
      default: "50%",
      "@media (max-width: 700px)": "44%",
    },
    insetInlineStart: {
      default: "none",
      "@media (max-width: 700px)": "50%",
    },
    pointerEvents: "none",
    position: "absolute",
    transform: {
      default: "translateY(-50%)",
      "@media (max-width: 700px)": "translate(-50%, -50%)",
    },
  },
});
