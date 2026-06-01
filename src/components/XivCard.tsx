import type { Component, JSX } from "solid-js";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";

export interface XivCardProps {
  xstyle?: StyleXStyles<{ width: number; height: number }>;
  contentXStyle?: StyleXStyles;
  children?: JSX.Element;
}

const styles = stylex.create({
  root: {
    width: "100%",
    height: "100%",
  },

  outer: {
    width: "100%",
    height: "100%",
    boxShadow:
      "inset 0 1px 1px 0 #ded771, inset 0 0 1px 0 hsl(55deg 50% 60% / 5%), 0 0 1px 2px rgb(0 0 0 / 5%), 0 2px 2px 2px rgb(0 0 0 / 5%)",
    borderRadius: 10,
    position: "relative",
    margin: "4px auto 0",
    padding: 5,
    backgroundColor: "#7f6234",
    boxSizing: "border-box",
    color: "rgba(0,0,0,0.87)",
  },

  inner: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
    display: "flex",
    position: "relative",
    flexDirection: "column",
    overflow: "auto",
    backgroundImage: "linear-gradient(#636363, #3c3c3c 1.5rem)",
    boxSizing: "border-box",
    boxShadow:
      "inset 0 0 0 1px hsl(0deg 0% 100% / 10%), 0 0 0 2px #222, 0 3px 1px #ded771, 0 0 2px 1px rgb(0 0 0 / 40%)",
  },

  content: {
    marginInline: 10,
    marginBlock: 5,
  },
});

export const XivCard: Component<XivCardProps> = props => {
  return (
    <div {...stylex.attrs(styles.root, props.xstyle)}>
      <div {...stylex.attrs(styles.outer)}>
        <div {...stylex.attrs(styles.inner)}>
          <div {...stylex.attrs(styles.content, props.contentXStyle)}>{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default XivCard;
