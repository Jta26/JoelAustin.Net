import type { HTMLAttributes, ReactNode } from "react";
import { useId } from "react";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";

import { colorVars } from "../styles/theme.stylex";

type HeadingLevel = 2 | 3 | 4 | 5 | 6;

type LUICardProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "className" | "style" | "title"
> & {
  children: ReactNode;
  headingLevel?: HeadingLevel;
  title?: ReactNode;
  xstyle?: StyleXStyles;
};

const headingTags = {
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

export default function LUICard({
  children,
  headingLevel = 2,
  title,
  xstyle,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: LUICardProps) {
  const titleId = useId();
  const Heading = headingTags[headingLevel];
  const hasTitle = title != null;

  return (
    <div
      {...props}
      aria-labelledby={ariaLabelledBy ?? (hasTitle ? titleId : undefined)}
      {...stylex.props(styles.root, xstyle)}
    >
      {hasTitle ? (
        <header {...stylex.props(styles.header)}>
          <Heading id={titleId} {...stylex.props(styles.title)}>
            {title}
          </Heading>
          <div aria-hidden="true" {...stylex.props(styles.headerLine)} />
        </header>
      ) : null}
      <div {...stylex.props(styles.body)}>{children}</div>
    </div>
  );
}

const styles = stylex.create({
  body: {
    paddingBlock: 18,
    paddingInline: 20,
  },
  header: {
    gap: 10,
    paddingInline: 20,
    display: "grid",
    paddingBlockStart: 16,
  },
  headerLine: {
    backgroundColor: colorVars.primaryBlue,
    boxShadow: "0 0 12px rgba(115, 221, 255, .38)",
    inlineSize: "100%",
    maskImage: "linear-gradient(90deg, #000 0%, #000 64%, transparent 100%)",
    height: 1,
  },
  root: {
    borderColor: colorVars.primaryBlue,
    borderRadius: "clamp(6px, 2.6%, 14px)",
    borderStyle: "solid",
    borderWidth: 1,
    cornerShape: "squircle",
    overflow: "hidden",
    backgroundColor: colorVars.darkSurfaceBackground,
    boxShadow:
      "inset 0 0 0 1px rgba(115, 221, 255, .1), 0 0 24px rgba(36, 168, 255, .12)",
    color: colorVars.primaryTextColor,
    display: "grid",
    position: "relative",
  },
  title: {
    margin: 0,
    color: colorVars.primaryTextColor,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: 1.15,
  },
});
