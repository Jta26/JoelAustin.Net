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

type WipeDirection = "left" | "right";

type LUIWipeProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "className" | "style"
> & {
  animationId?: string;
  children: ReactNode;
  delayMs?: number;
  direction?: WipeDirection;
  disabled?: boolean;
  inline?: boolean;
  onEntered?: () => void;
  order?: number;
  timing?: LUIWipeTiming;
  xstyle?: StyleXStyles;
};

type LUIWipeStyle = CSSProperties & {
  "--lui-wipe-delay": string;
};

export default function LUIWipe({
  animationId,
  children,
  delayMs = 0,
  direction = "right",
  disabled = false,
  inline = false,
  onEntered,
  order = 0,
  timing = "fluid",
  xstyle,
  ...props
}: LUIWipeProps) {
  const animation = useLUIAnimationSignal({
    disabled,
    durationMs: luiWipeTimingDurations[timing] + Math.max(0, delayMs),
    id: animationId,
    order,
  });
  const isWaiting = animation.phase === "waiting";
  const wipeStyle: LUIWipeStyle = {
    "--lui-wipe-delay": `${Math.max(0, delayMs)}ms`,
  };

  function handleRevealAnimationEnd(event: AnimationEvent<HTMLDivElement>) {
    if (event.currentTarget !== event.target) {
      return;
    }

    animation.complete();
    onEntered?.();
  }

  return (
    <div
      {...props}
      data-lui-wipe-phase={animation.phase}
      {...stylex.props(
        styles.root,
        inline && styles.inlineRoot,
        luiWipeCurves[timing],
        xstyle,
      )}
    >
      <div style={wipeStyle}>
        <div
          aria-hidden={isWaiting ? true : undefined}
          onAnimationEnd={handleRevealAnimationEnd}
          {...stylex.props(
            styles.content,
            inline && styles.inlineContent,
            isWaiting && styles.waitingContent,
            animation.isEntering && animationStyles.enteringContent,
            animation.isEntering &&
              direction === "right" &&
              animationStyles.revealRight,
            animation.isEntering &&
              direction === "left" &&
              animationStyles.revealLeft,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

const revealLeft = stylex.keyframes({
  "0%": {
    clipPath: "inset(0 0 0 100%)",
  },
  "100%": {
    clipPath: "inset(0 0 0 0)",
  },
});

const revealRight = stylex.keyframes({
  "0%": {
    clipPath: "inset(0 100% 0 0)",
  },
  "100%": {
    clipPath: "inset(0 0 0 0)",
  },
});

const animationStyles = stylex.create({
  enteringContent: {
    animationDelay: "var(--lui-wipe-delay)",
    animationDuration: "var(--lui-wipe-duration)",
    animationFillMode: "both",
    animationTimingFunction: "var(--lui-wipe-easing)",
  },
  revealLeft: {
    animationName: revealLeft,
  },
  revealRight: {
    animationName: revealRight,
  },
});

const styles = stylex.create({
  content: {
    display: "block",
  },
  inlineContent: {
    display: "inline-block",
  },
  inlineRoot: {
    display: "inline-block",
    verticalAlign: "top",
  },
  root: {
    overflow: "hidden",
    display: "block",
    isolation: "isolate",
    position: "relative",
  },
  waitingContent: {
    visibility: "hidden",
  },
});
