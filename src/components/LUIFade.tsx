import type {
  AnimationEvent,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
} from "react";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";

import { useLUIAnimationSignal } from "../animation/useLUIAnimationSignal";
import {
  luiWipeCurves,
  luiWipeTimingDurations,
  type LUIWipeTiming,
} from "./LUIWipe.styles";

type LUIFadeProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "className" | "style"
> & {
  animationId?: string;
  children: ReactNode;
  delayMs?: number;
  disabled?: boolean;
  durationMs?: number;
  inline?: boolean;
  onEntered?: () => void;
  order?: number;
  timing?: LUIWipeTiming;
  xstyle?: StyleXStyles;
};

type LUIFadeStyle = CSSProperties & {
  "--lui-fade-delay": string;
  "--lui-fade-duration": string;
};

export default function LUIFade({
  animationId,
  children,
  delayMs = 0,
  disabled = false,
  durationMs,
  inline = false,
  onEntered,
  order = 0,
  timing = "fluid",
  xstyle,
  "aria-hidden": ariaHidden,
  ...props
}: LUIFadeProps) {
  const fadeDurationMs = durationMs ?? luiWipeTimingDurations[timing];
  const fadeDelayMs = Math.max(0, delayMs);
  const animation = useLUIAnimationSignal({
    disabled,
    durationMs: fadeDurationMs + fadeDelayMs,
    id: animationId,
    order,
  });
  const isWaiting = animation.phase === "waiting";
  const fadeStyle: LUIFadeStyle = {
    "--lui-fade-delay": `${fadeDelayMs}ms`,
    "--lui-fade-duration": `${Math.max(0, fadeDurationMs)}ms`,
    display: "block",
    height: "100%",
    width: "100%",
  };

  function handleFadeAnimationEnd(event: AnimationEvent<HTMLDivElement>) {
    if (event.currentTarget !== event.target) {
      return;
    }

    animation.complete();
    onEntered?.();
  }

  return (
    <div
      {...props}
      aria-hidden={isWaiting ? true : ariaHidden}
      data-lui-fade-phase={animation.phase}
      {...stylex.props(
        styles.root,
        inline && styles.inlineRoot,
        luiWipeCurves[timing],
        xstyle,
      )}
    >
      <div style={fadeStyle}>
        <div
          onAnimationEnd={handleFadeAnimationEnd}
          {...stylex.props(
            styles.content,
            inline && styles.inlineContent,
            isWaiting && styles.waitingContent,
            animation.isEntering && animationStyles.enteringContent,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

const fadeIn = stylex.keyframes({
  "0%": {
    opacity: 0,
  },
  "100%": {
    opacity: 1,
  },
});

const animationStyles = stylex.create({
  enteringContent: {
    animationDelay: "var(--lui-fade-delay)",
    animationDuration: "var(--lui-fade-duration)",
    animationFillMode: "both",
    animationName: fadeIn,
    animationTimingFunction: "var(--lui-wipe-easing)",
  },
});

const styles = stylex.create({
  content: {
    display: "block",
    height: "100%",
    width: "100%",
  },
  inlineContent: {
    display: "inline-block",
    height: "auto",
    width: "auto",
  },
  inlineRoot: {
    display: "inline-block",
    verticalAlign: "top",
  },
  root: {
    display: "block",
  },
  waitingContent: {
    visibility: "hidden",
  },
});
