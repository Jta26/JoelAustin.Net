import type { Component, JSX } from "solid-js";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";

const HEADER_URL = "/images/xiv/card/card-header.png";
const FOOTER_URL = "/images/xiv/card/card-footer.png";
const SIDE_URL = "/images/xiv/card/card-side-border.png";

const HEADER_HEIGHT = 14;
const FOOTER_HEIGHT = 18;

export interface XivCardProps {
  xstyle?: StyleXStyles<{ width: number; height: number }>;
  children?: JSX.Element;
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
    backgroundImage: `url(${SIDE_URL})`,
    backgroundPosition: "left top, right top",
    backgroundRepeat: "repeat-y",
    backgroundSize: `100%`,
    overflow: "auto",
    zIndex: 1,
  },
});

export const XivCard: Component<XivCardProps> = props => {
  const { xstyle, children } = props;

  return (
    <div {...stylex.attrs(styles.root, xstyle)}>
      <div {...stylex.attrs(styles.header)} />
      <div {...stylex.attrs(styles.content)}>{children}</div>
      <div {...stylex.attrs(styles.footer)} />
    </div>
  );
};

export default XivCard;
