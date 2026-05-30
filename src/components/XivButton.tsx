import { splitProps } from "solid-js";
import type { Component, JSX } from "solid-js";
import * as stylex from "@stylexjs/stylex";
import { xiv, radii } from "../tokens.stylex";

export interface XivButtonProps {
  label: string;
  disabled?: boolean;
  onActivate?: () => void;
  xstyle?: stylex.StyleXStyles;
  class?: string;
  style?: JSX.CSSProperties;
}

const styles = stylex.create({
  button: {
    paddingBlock: "2px",
    borderRadius: radii.pill,
    minWidth: "150px",
    borderWidth: 0,
    borderColor: "transparent",
    borderStyle: "solid",
    backgroundColor: xiv.buttonBg,
    backgroundImage: xiv.buttonGradient,
    backgroundSize: "100% 100%",
    boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
    cursor: "pointer",
    fontFamily: xiv.fontFamily,
    fontSize: "16px",
    color: xiv.buttonText,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: `filter ${xiv.transitionFast}, transform ${xiv.transitionFast}, box-shadow ${xiv.transitionFast}`,
  },
  pressable: {
    filter: {
      default: "none",
      ":hover": `brightness(${xiv.hoverBrightness})`,
    },
    transform: {
      default: "none",
      ":active": "translateY(2px)",
    },
    boxShadow: {
      default: "0px 0px 2px 0px rgba(0,0,0,0.75)",
      ":active": "0px 0px 1px 0px rgba(0,0,0,0.6)",
    },
  },
  disabled: {
    filter: {
      default: "none",
      ":disabled": `brightness(${xiv.disabledBrightness})`,
    },
    cursor: "not-allowed",
  },
});

export const XivButton: Component<XivButtonProps> = props => {
  const [local, rest] = splitProps(props, [
    "label",
    "disabled",
    "onActivate",
    "xstyle",
    "class",
    "style",
  ]);

  const handleClick: JSX.EventHandler<HTMLButtonElement, MouseEvent> = _e => {
    if (!local.disabled && local.onActivate) {
      local.onActivate();
    }
  };

  return (
    <button
      {...stylex.attrs(
        styles.button,
        !local.disabled && styles.pressable,
        local.disabled && styles.disabled,
        local.xstyle,
      )}
      class={local.class}
      style={local.style}
      disabled={local.disabled}
      onClick={handleClick}
      {...rest}
    >
      {local.label}
    </button>
  );
};

export default XivButton;
