import type { ImgHTMLAttributes } from "react";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";

import { colorVars } from "../styles/theme.stylex";

type ImagePosition = "center" | "left" | "right";

type LUIImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "alt" | "className" | "style"
> & {
  alt: string;
  imagePosition?: ImagePosition;
  xstyle?: StyleXStyles;
};

export default function LUIImage({
  alt,
  imagePosition = "center",
  xstyle,
  ...props
}: LUIImageProps) {
  return (
    <figure {...stylex.props(styles.root, xstyle)}>
      <img
        {...props}
        alt={alt}
        loading={props.loading ?? "lazy"}
        decoding={props.decoding ?? "async"}
        {...stylex.props(
          styles.image,
          imagePosition === "left" && styles.leftImage,
          imagePosition === "right" && styles.rightImage,
        )}
      />
    </figure>
  );
}

const styles = stylex.create({
  image: {
    display: "block",
    objectFit: "cover",
    objectPosition: "center",
    height: "100%",
    width: "100%",
  },
  leftImage: {
    objectPosition: "left center",
  },
  rightImage: {
    objectPosition: "right center",
  },
  root: {
    margin: 0,
    borderColor: colorVars.primaryBlue,
    borderRadius: "clamp(5px, 2%, 10px)",
    borderStyle: "solid",
    borderWidth: 1,
    cornerShape: "squircle",
    overflow: "hidden",
    aspectRatio: "4 / 3",
    backgroundColor: colorVars.darkSurfaceBackground,
    boxShadow:
      "0 0 10px rgba(115, 221, 255, .2), inset 0 0 12px rgba(36, 168, 255, .08)",
    display: "block",
  },
});
