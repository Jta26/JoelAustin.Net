import type { Component, JSX } from "solid-js";
import * as stylex from "@stylexjs/stylex";

const HEADER_URL = "/images/xiv/card/card-header.png";
const FOOTER_URL = "/images/xiv/card/card-footer.png";
const SIDE_URL = "/images/xiv/card/card-side-border.png";

const HEADER_HEIGHT = 14;
const FOOTER_HEIGHT = 18;
const SIDE_WIDTH = 8; // Visual thickness of the vertical side borders

export interface XivCardXStyle {
  width?: string | number;
  height?: string | number;
}

export interface XivCardProps {
  xstyle?: XivCardXStyle;
  children?: JSX.Element;
  class?: string;
  style?: JSX.CSSProperties;
}

const styles = stylex.create({
  root: {
    position: "relative",
    overflow: "hidden",
    boxSizing: "border-box",
  },

  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    backgroundImage: `url(${HEADER_URL})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    zIndex: 2,
  },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: FOOTER_HEIGHT,
    backgroundImage: `url(${FOOTER_URL})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    zIndex: 2,
  },

  content: {
    position: "absolute",
    top: HEADER_HEIGHT,
    bottom: FOOTER_HEIGHT,
    left: 0,
    right: 0,
    backgroundImage: `url(${SIDE_URL}), url(${SIDE_URL})`,
    backgroundPosition: "left top, right top",
    backgroundRepeat: "repeat-y, repeat-y",
    paddingTop: 4,
    paddingBottom: 4,
    overflow: "auto",
    zIndex: 1,
    // No background color — interior of the card should be transparent
    // so the border (header + footer + side borders) is clearly visible
    // against whatever is behind the card.
  },
});

const toSize = (value?: string | number) => {
  if (value == null) return undefined;
  return typeof value === "number" ? `${value}px` : value;
};

export const XivCard: Component<XivCardProps> = props => {
  const { xstyle, children, class: className, style } = props;

  return (
    <div
      class={className}
      {...stylex.attrs(styles.root)}
      style={{
        width: toSize(xstyle?.width),
        height: toSize(xstyle?.height),
        ...style,
      }}
    >
      <div {...stylex.attrs(styles.header)} />
      <div {...stylex.attrs(styles.content)}>{children}</div>
      <div {...stylex.attrs(styles.footer)} />
    </div>
  );
};

export default XivCard;
