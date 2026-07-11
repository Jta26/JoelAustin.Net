import type {
  ButtonHTMLAttributes,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  ReactNode,
} from "react";
import { useId, useState } from "react";
import * as stylex from "@stylexjs/stylex";

import { useLUISoundEffect } from "../hooks/useLUISoundEffect";
import { colorVars } from "../styles/theme.stylex";

type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "className" | "style"
> & {
  children: ReactNode;
};

export default function LUIButton({
  children,
  disabled = false,
  onBlur,
  onFocus,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onPointerDown,
  type = "button",
  ...props
}: ButtonProps) {
  const clipId = useId();
  const playHoverSound = useLUISoundEffect({ type: "hover" });
  const [isActive, setIsActive] = useState(false);
  const [isFocusVisible, setIsFocusVisible] = useState(false);

  function handleMouseEnter(event: MouseEvent<HTMLButtonElement>) {
    if (!disabled) {
      setIsActive(true);
      playHoverSound();
    }

    onMouseEnter?.(event);
  }

  function handleMouseLeave(event: MouseEvent<HTMLButtonElement>) {
    if (!disabled) {
      setIsActive(false);
    }

    onMouseLeave?.(event);
  }

  function handleFocus(event: FocusEvent<HTMLButtonElement>) {
    if (!disabled) {
      setIsActive(true);
      setIsFocusVisible(event.currentTarget.matches(":focus-visible"));
    }

    onFocus?.(event);
  }

  function handleBlur(event: FocusEvent<HTMLButtonElement>) {
    if (!disabled) {
      setIsActive(false);
      setIsFocusVisible(false);
    }

    onBlur?.(event);
  }

  function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
    onPointerDown?.(event);

    if (!disabled && !event.defaultPrevented && event.button === 0) {
      playHoverSound();
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    onKeyDown?.(event);

    if (
      !disabled &&
      !event.defaultPrevented &&
      !event.repeat &&
      (event.key === "Enter" || event.key === " ")
    ) {
      playHoverSound();
    }
  }

  return (
    <button
      {...props}
      type={type}
      disabled={disabled}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
      {...stylex.props(styles.root, disabled && styles.disabled)}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        {...stylex.props(styles.svgSurface)}
      >
        <defs>
          <clipPath id={clipId}>
            <polygon points={buttonPoints} />
          </clipPath>
        </defs>
        <polygon points={buttonPoints} {...stylex.props(styles.innerShape)} />
        <g clipPath={`url(#${clipId})`}>
          <rect
            x="0"
            y="0"
            width="52"
            height="40"
            {...stylex.props(
              styles.fillPanel,
              styles.leftFill,
              isActive && styles.activeFill,
            )}
          />
          <rect
            x="48"
            y="0"
            width="52"
            height="40"
            {...stylex.props(
              styles.fillPanel,
              styles.rightFill,
              isActive && styles.activeFill,
            )}
          />
          <polygon
            points="6 38 16 38 94 2 84 2"
            {...stylex.props(styles.scan, isActive && styles.activeScan)}
          />
        </g>
        <polygon points={buttonPoints} {...stylex.props(styles.borderShape)} />
        <polygon
          points={focusRingPoints}
          {...stylex.props(
            styles.focusRing,
            isFocusVisible && styles.visibleFocusRing,
          )}
        />
      </svg>
      <span {...stylex.props(styles.label)}>
        <span {...stylex.props(styles.baseLabel)}>{children}</span>
        <span
          aria-hidden="true"
          {...stylex.props(
            styles.contrastLabel,
            isActive && styles.activeContrastLabel,
            isActive && styles.activeLabel,
          )}
        >
          {children}
        </span>
      </span>
    </button>
  );
}

const labelFlicker = stylex.keyframes({
  "0%": {
    textShadow: "0 0 0 rgba(255, 255, 255, 0)",
  },
  "42%": {
    textShadow: "0 0 10px rgba(179, 239, 255, .65)",
  },
  "100%": {
    textShadow: "0 0 0 rgba(255, 255, 255, 0)",
  },
});

const scanSweep = stylex.keyframes({
  "0%": {
    opacity: 0,
    transform: "translateX(-42%)",
  },
  "9%": {
    opacity: 0.42,
  },
  "24%": {
    opacity: 0,
    transform: "translateX(42%)",
  },
  "100%": {
    opacity: 0,
    transform: "translateX(42%)",
  },
});

const buttonPoints = "15.5 1 98.5 1 84.5 39 1.5 39";
const focusRingPoints = "15.5 3.5 95 3.5 84.5 36.5 5 36.5";

const styles = stylex.create({
  activeFill: {
    transform: "translateX(0)",
  },
  activeLabel: {
    animationDuration: "225ms",
    animationName: labelFlicker,
    animationTimingFunction: "steps(3, end)",
  },
  activeScan: {
    animationDuration: "3620ms",
    animationIterationCount: "infinite",
    animationName: scanSweep,
    animationTimingFunction: "linear",
  },
  disabled: {
    cursor: "not-allowed",
    opacity: 0.48,
  },
  borderShape: {
    fill: "none",
    stroke: colorVars.primaryBlue,
    strokeWidth: 2,
    vectorEffect: "non-scaling-stroke",
  },
  activeContrastLabel: {
    maskSize: "52% 100%, 52% 100%",
  },
  baseLabel: {
    color: colorVars.primaryTextColor,
  },
  contrastLabel: {
    inset: 0,
    alignItems: "center",
    color: colorVars.onMediaTextColor,
    display: "flex",
    justifyContent: "center",
    maskImage: "linear-gradient(#000, #000), linear-gradient(#000, #000)",
    maskPosition: "left center, right center",
    maskRepeat: "no-repeat, no-repeat",
    maskSize: "0% 100%, 0% 100%",
    pointerEvents: "none",
    position: "absolute",
    transitionDuration: "650ms",
    transitionProperty: "mask-size",
    transitionTimingFunction: "cubic-bezier(.16,.84,.22,1)",
  },
  fillPanel: {
    fill: "#FFFFFF",
    transformBox: "fill-box",
    transformOrigin: "center",
    transitionDuration: "650ms",
    transitionProperty: "transform",
    transitionTimingFunction: "cubic-bezier(.16,.84,.22,1)",
    willChange: "transform",
  },
  focusRing: {
    fill: "none",
    stroke: "#8ee7ff",
    strokeWidth: 2,
    vectorEffect: "non-scaling-stroke",
    opacity: 0,
    transitionDuration: "140ms",
    transitionProperty: "opacity",
    transitionTimingFunction: "ease",
  },
  innerShape: {
    fill: colorVars.darkSurfaceBackground,
  },
  label: {
    paddingBlock: 8,
    alignItems: "center",
    boxSizing: "border-box",
    display: "flex",
    flexBasis: "auto",
    flexGrow: "1",
    flexShrink: "1",
    fontSize: 13,
    fontWeight: 700,
    justifyContent: "center",
    letterSpacing: 0,
    lineHeight: 1,
    pointerEvents: "none",
    position: "relative",
    textWrap: "nowrap",
    transitionDuration: "160ms",
    transitionProperty: "color",
    transitionTimingFunction: "ease",
    userSelect: "none",
    zIndex: 2,
    minHeight: 28,
    minWidth: 116,
    width: "100%",
  },
  leftFill: {
    transform: "translateX(-101%)",
  },
  rightFill: {
    transform: "translateX(101%)",
  },
  root: {
    WebkitTapHighlightColor: "transparent",
    padding: 0,
    borderWidth: 0,
    overflow: "hidden",
    paddingInline: 32,
    appearance: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    display: "inline-flex",
    fontFamily: "inherit",
    isolation: "isolate",
    opacity: {
      default: 1,
      ":active": 0.72,
    },
    outlineStyle: "none",
    position: "relative",
    transitionDuration: "120ms",
    transitionProperty: "opacity",
    transitionTimingFunction: "ease",
  },
  scan: {
    fill: colorVars.secondaryBlue,
    opacity: 0,
    transformBox: "fill-box",
    transformOrigin: "center",
  },
  svgSurface: {
    inset: 0,
    pointerEvents: "none",
    position: "absolute",
    zIndex: 0,
    height: "100%",
    width: "100%",
  },
  visibleFocusRing: {
    opacity: 1,
  },
});
