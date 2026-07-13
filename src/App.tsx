import * as stylex from "@stylexjs/stylex";

import { LUIAnimationTrackerProvider } from "./animation/LUIAnimationTrackerProvider";
import AboutCard from "./components/AboutCard";
import LUIFade from "./components/LUIFade";
import LUIHypercube from "./components/LUIHypercube";
import LUITitle from "./components/LUITitle";
import SocialIcons from "./components/SocialIcons";
import { layoutConsts } from "./styles/layout-consts.stylex";
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
      [layoutConsts.compactScreen]: "2.75rem",
    },
    alignContent: {
      default: "normal",
      [layoutConsts.compactScreen]: "start",
    },
    alignItems: {
      default: "center",
      [layoutConsts.compactScreen]: "start",
    },
    blockSize: {
      default: "100%",
      [layoutConsts.compactScreen]: "auto",
    },
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr)",
    minBlockSize: 0,
    position: "relative",
    zIndex: 1,
  },
  homeShell: {
    paddingBlock: {
      default: "1.375rem",
      [layoutConsts.compactScreen]: "2.25rem",
    },
    paddingInline: {
      default: "3rem",
      [layoutConsts.compactScreen]: "1.25rem",
    },
    alignContent: {
      default: "normal",
      [layoutConsts.compactScreen]: "start",
    },
    blockSize: {
      default: "100%",
      [layoutConsts.compactScreen]: "auto",
    },
    display: "grid",
    minBlockSize: 0,
  },
  homeThemeRoot: {
    overflow: {
      default: "hidden",
      [layoutConsts.compactScreen]: "visible",
    },
    blockSize: {
      default: "100dvh",
      [layoutConsts.compactScreen]: "auto",
    },
    minBlockSize: {
      default: "auto",
      [layoutConsts.compactScreen]: "100svh",
    },
  },
  hypercubeLayer: {
    blockSize: "max(90dvh, 90vw)",
    inlineSize: "max(90dvh, 90vw)",
    insetBlockStart: "50%",
    insetInlineStart: {
      default: "calc(50% - 5rem)",
      [layoutConsts.compactScreen]: "50%",
    },
    pointerEvents: "none",
    position: "fixed",
    transform: "translate(-50%, -50%)",
  },
  profileCard: {
    insetBlockEnd: {
      default: 0,
      [layoutConsts.compactScreen]: "auto",
    },
    insetInlineEnd: {
      default: 0,
      [layoutConsts.compactScreen]: "auto",
    },
    justifySelf: {
      default: "auto",
      [layoutConsts.compactScreen]: "end",
    },
    position: {
      default: "absolute",
      [layoutConsts.compactScreen]: "relative",
    },
    maxWidth: {
      default: "22.5rem",
      [layoutConsts.compactScreen]: "18.75rem",
    },
    width: "min(100%, 22.5rem)",
  },
  themeRoot: {
    "--lui-letter-spacing": "0.025em",
    backgroundColor: colorVars.darkSurfaceBackground,
    color: colorVars.primaryTextColor,
    display: "grid",
    fontFamily:
      '"LUI Japanese Pixel", "Pixelify Sans", "Noto Sans", ui-sans-serif, system-ui, sans-serif',
    gridTemplateRows: "auto minmax(0, 1fr)",
    paddingBlockEnd: "env(safe-area-inset-bottom, 0)",
    paddingBlockStart: "env(safe-area-inset-top, 0)",
    position: "relative",
    minHeight: {
      default: "100dvh",
      [layoutConsts.compactScreen]: "100svh",
    },
    overflowX: "hidden",
  },
});
