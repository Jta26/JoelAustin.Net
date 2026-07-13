import type { HTMLAttributes, ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";

import { colorVars } from "../styles/theme.stylex";
import LUIWipe from "./LUIWipe";
import type { LUIWipeTiming } from "./LUIWipe.styles";

type LUITitleProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "className" | "style" | "title"
> & {
  eyebrow: ReactNode;
  eyebrowOrder?: number;
  headingId?: string;
  timing?: LUIWipeTiming;
  title: ReactNode;
  titleOrder?: number;
  xstyle?: StyleXStyles;
};

export default function LUITitle({
  eyebrow,
  eyebrowOrder = 0.35,
  headingId,
  timing = "chunky",
  title,
  titleOrder = 0.45,
  xstyle,
  ...props
}: LUITitleProps) {
  return (
    <div {...props} {...stylex.props(styles.root, xstyle)}>
      <LUIWipe order={eyebrowOrder} timing={timing}>
        <p {...stylex.props(styles.eyebrow)}>{eyebrow}</p>
      </LUIWipe>
      <LUIWipe order={titleOrder} timing={timing}>
        <h1 id={headingId} {...stylex.props(styles.title)}>
          {title}
        </h1>
      </LUIWipe>
    </div>
  );
}

const styles = stylex.create({
  eyebrow: {
    margin: 0,
    color: colorVars.primaryBlue,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "var(--lui-letter-spacing)",
    lineHeight: 1,
    textTransform: "uppercase",
  },
  root: {
    display: "grid",
    justifyItems: "start",
    maxWidth: 560,
  },
  title: {
    marginBlock: 10,
    marginInline: 0,
    color: colorVars.primaryTextColor,
    fontSize: {
      default: 64,
      "@media (max-width: 700px)": 44,
    },
    fontWeight: 700,
    letterSpacing: "var(--lui-letter-spacing)",
    lineHeight: 0.95,
  },
});
