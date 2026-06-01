import { Show, createMemo, createSignal, splitProps } from "solid-js";
import type { Component, JSX } from "solid-js";
import * as stylex from "@stylexjs/stylex";

const BASE_URL = "/images/xiv/action-button/action-button-base.png";
const FRAME_URL = "/images/xiv/action-button/action-button-frame.png";

const pressBurst = stylex.keyframes({
  "0%": {
    opacity: 0,
    transform: "translate(-50%, -50%) scale(0.08)",
  },
  "14%": {
    opacity: 0.94,
  },
  "58%": {
    opacity: 0.44,
  },
  "100%": {
    opacity: 0,
    transform: "translate(-50%, -50%) scale(1.72)",
  },
});

/**
 * Opinionated presets for supported button sizes.
 *
 * Each entry maps a rendered pixel size to the exact scale (relative size of the icon
 * inside the frame) and verticalOffset (in pixels) needed for correct optical centering.
 *
 * The frame artwork has asymmetric inner spacing (more room at the bottom),
 * so the required offset changes with size. Only these discrete sizes are supported
 * for pixel-perfect results.
 */
export const ICON_SIZE_PRESETS = {
  40: { scale: 0.82, verticalOffset: -0.5 },
  48: { scale: 0.83, verticalOffset: -1 },
  56: { scale: 0.835, verticalOffset: -1.5 },
  64: { scale: 0.84, verticalOffset: -2 },
  80: { scale: 0.8478, verticalOffset: -3 },
} as const;

export type SupportedIconSize = keyof typeof ICON_SIZE_PRESETS;

export interface XivActionButtonProps {
  icon: string;
  /** Must be one of the supported sizes in ICON_SIZE_PRESETS for correct centering */
  size?: SupportedIconSize;
  label?: string;
  disabled?: boolean;
  onActivate?: () => void;
  class?: string;
  style?: JSX.CSSProperties;
}

const styles = stylex.create({
  // Completely unstyled <button> — no browser defaults, no decorative styles.
  // All visuals come from the child images + cover div.
  root: {
    all: "unset",
    position: "relative",
    display: "inline-block",
    cursor: "pointer",
    overflow: "hidden",
    borderRadius: "12%",
    // Explicit border reset as extra safety against UA styles
    border: "0",
    borderStyle: "none",
    borderWidth: "0",
    backgroundColor: "transparent",
  },

  // First <img> - the background / socket layer
  socket: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    userSelect: "none",
    display: "block",
  },

  // Second <img> - the actual skill icon
  icon: {
    position: "absolute",
    pointerEvents: "none",
    userSelect: "none",
    display: "block",
  },

  pressClip: {
    position: "absolute",
    left: "50%",
    top: "50%",
    overflow: "hidden",
    borderRadius: "10%",
    pointerEvents: "none",
    userSelect: "none",
    zIndex: 2,
  },

  pressGlow: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: "72%",
    height: "72%",
    borderRadius: "50%",
    pointerEvents: "none",
    userSelect: "none",
    opacity: 0,
    transform: "translate(-50%, -50%) scale(0.08)",
    transformOrigin: "center",
    backgroundImage:
      "radial-gradient(circle, rgba(255, 250, 194, 0.9) 0%, rgba(255, 219, 86, 0.72) 32%, rgba(211, 139, 25, 0.46) 57%, rgba(142, 80, 9, 0.18) 72%, rgba(142, 80, 9, 0) 82%)",
    filter: "blur(0.01em)",
    animationName: pressBurst,
    animationDuration: "300ms",
    animationTimingFunction: "cubic-bezier(0.12, 0.82, 0.22, 1)",
    animationFillMode: "forwards",
  },

  // The cover div that holds the frame as a background-image (exactly like item_icon_cover on the sites)
  // Made size-flexible using percentages instead of fixed 152px.
  cover: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    userSelect: "none",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0 0",
    zIndex: 3,
  },
});

export const XivActionButton: Component<XivActionButtonProps> = props => {
  const [local, rest] = splitProps(props, [
    "icon",
    "size",
    "label",
    "disabled",
    "onActivate",
    "class",
    "style",
  ]);

  const getSize = () => local.size ?? 48;

  const preset = createMemo(() => {
    const s = getSize();
    const p = ICON_SIZE_PRESETS[s];
    if (!p) {
      throw new Error(
        `Unsupported icon size: ${s}px. ` +
          `This component uses an opinionated API. Supported sizes: ${Object.keys(ICON_SIZE_PRESETS).join(", ")}`,
      );
    }
    return p;
  });

  const iconScale = () => preset().scale;
  const verticalOffset = () => `${preset().verticalOffset}px`;
  const [pressBurstKey, setPressBurstKey] = createSignal(0);

  const playPressBurst = () => {
    if (!local.disabled) {
      setPressBurstKey(key => key + 1);
    }
  };

  const handleClick: JSX.EventHandler<HTMLButtonElement, MouseEvent> = _e => {
    if (!local.disabled) {
      playPressBurst();
      local.onActivate?.();
    }
  };

  return (
    <button
      {...stylex.attrs(styles.root)}
      class={local.class}
      style={{
        width: `${getSize()}px`,
        height: `${getSize()}px`,
        ...(local.style || {}),
      }}
      disabled={local.disabled}
      onClick={handleClick}
      title={local.label}
      aria-label={local.label}
      {...rest}
    >
      {/* 1. Background / socket layer */}
      <img src={BASE_URL} {...stylex.attrs(styles.socket)} alt="" draggable={false} />

      {/* 2. The skill icon itself (scaled to fit inside the frame like the official sites) */}
      {/* Using 50% + transform + small vertical offset for optical centering */}
      <img
        src={local.icon}
        {...stylex.attrs(styles.icon)}
        style={{
          width: `${iconScale() * 100}%`,
          height: `${iconScale() * 100}%`,
          left: "50%",
          top: "50%",
          transform: `translate(-50%, calc(-50% + ${verticalOffset()}))`,
        }}
        alt=""
        draggable={false}
      />

      <Show keyed when={pressBurstKey()}>
        <div
          {...stylex.attrs(styles.pressClip)}
          style={{
            width: `${iconScale() * 100}%`,
            height: `${iconScale() * 100}%`,
            transform: `translate(-50%, calc(-50% + ${verticalOffset()}))`,
          }}
          onAnimationEnd={() => setPressBurstKey(0)}
          aria-hidden="true"
        >
          <div {...stylex.attrs(styles.pressGlow)} />
        </div>
      </Show>

      {/* 3. Frame as background on a cover div (exactly like item_icon_cover) */}
      <div {...stylex.attrs(styles.cover)} style={{ "background-image": `url(${FRAME_URL})` }} />
    </button>
  );
};

export default XivActionButton;
