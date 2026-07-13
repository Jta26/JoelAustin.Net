import * as stylex from "@stylexjs/stylex";

import { LUIAnimationTrackerProvider } from "./animation/LUIAnimationTrackerProvider";
import AboutCard from "./components/AboutCard";
import LUIFade from "./components/LUIFade";
import LUIHypercube from "./components/LUIHypercube";
import LUITitle from "./components/LUITitle";
import SocialIcons from "./components/SocialIcons";
import { colorVars, languageUITheme } from "./styles/theme.stylex";

const hypercubeFadeDelayMs = 1645;

export function App() {
  return (
    <div {...stylex.props(languageUITheme)}>
      <div {...stylex.props(styles.themeRoot, styles.homeThemeRoot)}>
        <LUIAnimationTrackerProvider>
          <div aria-hidden {...stylex.props(styles.hypercubeLayer)}>
            <LUIFade
              animationId="hypercube"
              delayMs={hypercubeFadeDelayMs}
              durationMs={6000}
              timing="chunky"
              xstyle={styles.cube}
            >
              <LUIHypercube xstyle={styles.cube} />
            </LUIFade>
          </div>
        </LUIAnimationTrackerProvider>
        <LUIAnimationTrackerProvider>
          <SocialIcons />
        </LUIAnimationTrackerProvider>
        <LUIAnimationTrackerProvider>
          <main {...stylex.props(styles.homeShell)}>
            <section
              aria-labelledby="intro-title"
              {...stylex.props(styles.hero)}
            >
              <LUITitle
                eyebrow="Frontend Software Engineer"
                headingId="intro-title"
                title="Joel Austin"
              />
              <AboutCard xstyle={styles.profileCard} />
            </section>
          </main>
        </LUIAnimationTrackerProvider>
      </div>
    </div>
  );
}

const styles = stylex.create({
  cube: {
    height: "100%",
    width: "100%",
  },
  hero: {
    gap: {
      default: 0,
      "@media (max-width: 700px)": 44,
    },
    alignItems: {
      default: "center",
      "@media (max-width: 700px)": "start",
    },
    blockSize: "100%",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr)",
    minBlockSize: 0,
    position: "relative",
    zIndex: 1,
  },
  homeShell: {
    paddingBlock: {
      default: 22,
      "@media (max-width: 700px)": 36,
    },
    paddingInline: {
      default: 48,
      "@media (max-width: 700px)": 20,
    },
    blockSize: "100%",
    display: "grid",
    minBlockSize: 0,
  },
  homeThemeRoot: {
    overflow: {
      default: "hidden",
      "@media (max-width: 700px)": "auto",
    },
    blockSize: "100dvh",
  },
  hypercubeLayer: {
    blockSize: "100vmax",
    inlineSize: "100vmax",
    insetBlockStart: "50%",
    insetInlineStart: "calc(50% - 6vmax)",
    pointerEvents: "none",
    position: "fixed",
    transform: "translate(-50%, -50%)",
  },
  profileCard: {
    insetBlockEnd: {
      default: 0,
      "@media (max-width: 700px)": "auto",
    },
    insetInlineEnd: {
      default: 0,
      "@media (max-width: 700px)": "auto",
    },
    justifySelf: {
      default: "auto",
      "@media (max-width: 700px)": "end",
    },
    position: {
      default: "absolute",
      "@media (max-width: 700px)": "relative",
    },
    maxWidth: {
      default: 360,
      "@media (max-width: 700px)": 300,
    },
    width: "min(100%, 360px)",
  },
  themeRoot: {
    "--lui-letter-spacing": "0.025em",
    backgroundColor: colorVars.darkSurfaceBackground,
    color: colorVars.primaryTextColor,
    display: "grid",
    fontFamily:
      '"Pixelify Sans", "Noto Sans", ui-sans-serif, system-ui, sans-serif',
    gridTemplateRows: "auto minmax(0, 1fr)",
    position: "relative",
    minHeight: "100dvh",
    overflowX: "hidden",
  },
});
