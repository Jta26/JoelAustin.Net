import type {
  ButtonHTMLAttributes,
  FocusEvent,
  MouseEvent,
  ReactNode,
} from "react";
import { useId, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";

import { useLUISoundEffect } from "../hooks/useLUISoundEffect";
import { colorVars } from "../styles/theme.stylex";

type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "className" | "style"
> & {
  children: ReactNode;
  labelXstyle?: StyleXStyles;
  xstyle?: StyleXStyles;
};

export default function LUIButton({
  children,
  disabled = false,
  labelXstyle,
  onBlur,
  onClick,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  type = "button",
  xstyle,
  ...props
}: ButtonProps) {
  const clipId = useId();
  const playClickSound = useLUISoundEffect({ type: "click" });
  const [isActive, setIsActive] = useState(false);
  const [isFocusVisible, setIsFocusVisible] = useState(false);

  function handleMouseEnter(event: MouseEvent<HTMLButtonElement>) {
    if (!disabled) {
      setIsActive(true);
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

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (!disabled && !event.defaultPrevented) {
      playClickSound();
    }

    onClick?.(event);
  }

  return (
    <button
      {...props}
      type={type}
      disabled={disabled}
      onBlur={handleBlur}
      onClick={handleClick}
      onFocus={handleFocus}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...stylex.props(
        styles.root,
        animationStyles.root,
        disabled && styles.disabled,
        xstyle,
      )}
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
              animationStyles.fillPanel,
              animationStyles.leftFill,
              isActive && animationStyles.activeFill,
            )}
          />
          <rect
            x="48"
            y="0"
            width="52"
            height="40"
            {...stylex.props(
              styles.fillPanel,
              animationStyles.fillPanel,
              animationStyles.rightFill,
              isActive && animationStyles.activeFill,
            )}
          />
          <polygon
            points="6 38 16 38 94 2 84 2"
            {...stylex.props(
              styles.scan,
              animationStyles.scan,
              isActive && animationStyles.activeScan,
            )}
          />
        </g>
        <polygon points={buttonPoints} {...stylex.props(styles.borderShape)} />
        <polygon
          points={focusRingPoints}
          {...stylex.props(
            styles.focusRing,
            animationStyles.focusRing,
            isFocusVisible && animationStyles.visibleFocusRing,
          )}
        />
      </svg>
      <span {...stylex.props(styles.label, labelXstyle)}>
        <span {...stylex.props(styles.baseLabel)}>{children}</span>
        <span
          aria-hidden="true"
          {...stylex.props(
            styles.contrastLabel,
            animationStyles.contrastLabel,
            isActive && animationStyles.activeContrastLabel,
            isActive && animationStyles.activeLabel,
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
    textShadow: "0 0 0.625rem rgba(179, 239, 255, .65)",
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

const animationStyles = stylex.create({
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
  activeContrastLabel: {
    maskSize: "52% 100%, 52% 100%",
  },
  contrastLabel: {
    maskSize: "0% 100%, 0% 100%",
    transitionDuration: "650ms",
    transitionProperty: "mask-size",
    transitionTimingFunction: "cubic-bezier(.16,.84,.22,1)",
  },
  fillPanel: {
    transformBox: "fill-box",
    transformOrigin: "center",
    transitionDuration: "650ms",
    transitionProperty: "transform",
    transitionTimingFunction: "cubic-bezier(.16,.84,.22,1)",
    willChange: "transform",
  },
  focusRing: {
    opacity: 0,
    transitionDuration: "140ms",
    transitionProperty: "opacity",
    transitionTimingFunction: "ease",
  },
  leftFill: {
    transform: "translateX(-101%)",
  },
  rightFill: {
    transform: "translateX(101%)",
  },
  root: {
    opacity: {
      default: 1,
      ":active": 0.72,
    },
    transitionDuration: "120ms",
    transitionProperty: "opacity",
    transitionTimingFunction: "ease",
  },
  scan: {
    opacity: 0,
    transformBox: "fill-box",
    transformOrigin: "center",
  },
  visibleFocusRing: {
    opacity: 1,
  },
});

const styles = stylex.create({
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
    pointerEvents: "none",
    position: "absolute",
  },
  fillPanel: {
    fill: "#FFFFFF",
  },
  focusRing: {
    fill: "none",
    stroke: "#8ee7ff",
    strokeWidth: 2,
    vectorEffect: "non-scaling-stroke",
  },
  innerShape: {
    fill: colorVars.cardBackround,
  },
  label: {
    paddingBlock: "0.5rem",
    alignItems: "center",
    boxSizing: "border-box",
    display: "flex",
    flexBasis: "auto",
    flexGrow: "1",
    flexShrink: "1",
    fontSize: "0.8125rem",
    fontWeight: 700,
    justifyContent: "center",
    letterSpacing: "var(--lui-letter-spacing)",
    lineHeight: 1,
    pointerEvents: "none",
    position: "relative",
    textWrap: "nowrap",
    transitionDuration: "160ms",
    transitionProperty: "color",
    transitionTimingFunction: "ease",
    userSelect: "none",
    zIndex: 2,
    minHeight: "1.75rem",
    minWidth: "7.25rem",
    width: "100%",
  },
  root: {
    WebkitTapHighlightColor: "transparent",
    padding: 0,
    borderWidth: 0,
    overflow: "hidden",
    paddingInline: "2rem",
    appearance: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    display: "inline-flex",
    fontFamily: "inherit",
    isolation: "isolate",
    outlineStyle: "none",
    position: "relative",
  },
  scan: {
    fill: colorVars.secondaryBlue,
  },
  svgSurface: {
    inset: 0,
    pointerEvents: "none",
    position: "absolute",
    zIndex: 0,
    height: "100%",
    width: "100%",
  },
});
