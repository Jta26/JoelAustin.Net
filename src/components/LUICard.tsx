import type {
  AnimationEvent,
  HTMLAttributes,
  ImgHTMLAttributes,
  ReactNode,
} from "react";
import { isValidElement, useId, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";

import { useLUIAnimationSignal } from "../animation/useLUIAnimationSignal";
import { colorVars } from "../styles/theme.stylex";
import {
  luiWipeCurves,
  luiWipeTimingDurations,
  type LUIWipeTiming,
} from "./LUIWipe.styles";

type HeadingLevel = 2 | 3 | 4 | 5 | 6;

type LUIProfilePhoto = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "alt" | "className" | "style"
> & {
  alt: string;
};

type LUICardBaseProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "className" | "style" | "title"
> & {
  animationId?: string;
  animationOrder?: number;
  children: ReactNode;
  header?: ReactNode;
  headingLevel?: HeadingLevel;
  order?: number;
  timing?: LUIWipeTiming;
  xstyle?: StyleXStyles;
};

type LUICardStandardHeaderProps = {
  headerType?: "standard";
  profilePhoto?: never;
  title?: ReactNode;
};

type LUICardProfileHeaderProps = {
  headerType: "profilePhoto";
  profilePhoto: LUIProfilePhoto;
  title: ReactNode;
};

type LUICardProps = LUICardBaseProps &
  (LUICardStandardHeaderProps | LUICardProfileHeaderProps);

const headingTags = {
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

type LUICardHeaderProps = {
  headingLevel?: HeadingLevel;
  title: ReactNode;
  titleId?: string;
  xstyle?: StyleXStyles;
};

type LUIProfilePhotoHeaderProps = LUICardHeaderProps & {
  hoverProfilePhoto?: LUIProfilePhoto;
  profilePhoto: LUIProfilePhoto;
};

export function LUICardHeader({
  headingLevel = 2,
  title,
  titleId,
  xstyle,
}: LUICardHeaderProps) {
  const Heading = headingTags[headingLevel];

  return (
    <header {...stylex.props(styles.header, xstyle)}>
      <div {...stylex.props(styles.headerTitleBlock)}>
        <div {...stylex.props(styles.headerTitleRail)}>
          <span aria-hidden="true" {...stylex.props(styles.headerTick)} />
          <Heading id={titleId} {...stylex.props(styles.title)}>
            {title}
          </Heading>
        </div>
        <div aria-hidden="true" {...stylex.props(styles.headerLine)} />
      </div>
    </header>
  );
}

export function LUIProfilePhotoHeader({
  headingLevel = 2,
  hoverProfilePhoto,
  profilePhoto,
  title,
  titleId,
  xstyle,
}: LUIProfilePhotoHeaderProps) {
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);
  const hasHoverPhoto = hoverProfilePhoto != null;

  return (
    <>
      <div
        onPointerEnter={() => setIsPhotoHovered(true)}
        onPointerLeave={() => setIsPhotoHovered(false)}
        {...stylex.props(styles.profilePhotoFrame)}
      >
        <img
          {...profilePhoto}
          alt={profilePhoto.alt}
          loading={profilePhoto.loading ?? "lazy"}
          decoding={profilePhoto.decoding ?? "async"}
          {...stylex.props(
            styles.profilePhoto,
            styles.profilePhotoLayer,
            hasHoverPhoto && isPhotoHovered && styles.hiddenProfilePhoto,
          )}
        />
        {hasHoverPhoto ? (
          <img
            {...hoverProfilePhoto}
            aria-hidden="true"
            alt=""
            loading={hoverProfilePhoto.loading ?? "lazy"}
            decoding={hoverProfilePhoto.decoding ?? "async"}
            {...stylex.props(
              styles.profilePhoto,
              styles.profilePhotoLayer,
              styles.hoverProfilePhoto,
              isPhotoHovered && styles.visibleProfilePhoto,
            )}
          />
        ) : null}
        <span aria-hidden="true" {...stylex.props(styles.profilePhotoArc)} />
      </div>
      <LUICardHeader
        headingLevel={headingLevel}
        title={title}
        titleId={titleId}
        xstyle={[styles.profileHeaderOffset, xstyle] as StyleXStyles}
      />
    </>
  );
}

export default function LUICard({
  animationId,
  animationOrder,
  children,
  header,
  headerType = "standard",
  headingLevel = 2,
  order = 1,
  profilePhoto,
  timing = "fluid",
  title,
  xstyle,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: LUICardProps) {
  const titleId = useId();
  const generatedAnimationId = useId();
  const cardAnimationId = animationId ?? generatedAnimationId;
  const hasTitle = title != null;
  const hasProfileHeader =
    (headerType === "profilePhoto" && profilePhoto != null) ||
    isProfilePhotoHeader(header);
  const resolvedHeader =
    header ??
    (hasTitle ? (
      headerType === "profilePhoto" && profilePhoto != null ? (
        <LUIProfilePhotoHeader
          headingLevel={headingLevel}
          profilePhoto={profilePhoto}
          title={title}
          titleId={titleId}
        />
      ) : (
        <LUICardHeader
          headingLevel={headingLevel}
          title={title}
          titleId={titleId}
        />
      )
    ) : null);
  const hasHeader = resolvedHeader != null;
  const resolvedAnimationOrder = animationOrder ?? order;
  const animationDurationMs = luiWipeTimingDurations[timing];
  const [hasInitialRevealEntered, setHasInitialRevealEntered] = useState(false);
  const cardAnimation = useLUIAnimationSignal({
    durationMs: hasHeader ? animationDurationMs * 2 : animationDurationMs,
    id: `${cardAnimationId}-card`,
    order: resolvedAnimationOrder,
  });
  const shouldApplyInitialRevealMask =
    !hasInitialRevealEntered && !cardAnimation.hasEntered;

  function handleInitialRevealEnd(event: AnimationEvent<HTMLDivElement>) {
    if (event.currentTarget !== event.target) {
      return;
    }

    setHasInitialRevealEntered(true);
  }

  function handleBodyWipeEnd(event: AnimationEvent<HTMLDivElement>) {
    if (event.currentTarget !== event.target) {
      return;
    }

    cardAnimation.complete();
  }

  return (
    <div
      {...props}
      aria-labelledby={ariaLabelledBy ?? (hasTitle ? titleId : undefined)}
      data-lui-card-phase={cardAnimation.phase}
      onAnimationEnd={handleInitialRevealEnd}
      {...stylex.props(
        styles.revealRoot,
        hasProfileHeader && styles.profileRevealRoot,
        luiWipeCurves[timing],
        shouldApplyInitialRevealMask && styles.waitingCardReveal,
        shouldApplyInitialRevealMask &&
          cardAnimation.isEntering &&
          styles.enterCardReveal,
        xstyle,
      )}
    >
      <div
        {...stylex.props(
          styles.root,
          hasProfileHeader && styles.profileRoot,
        )}
      >
        {resolvedHeader}
        <div
          data-lui-card-body-phase={cardAnimation.phase}
          onAnimationEnd={handleBodyWipeEnd}
          {...stylex.props(
            styles.bodyReveal,
            luiWipeCurves[timing],
            cardAnimation.hasEntered && styles.enteredBodyReveal,
            cardAnimation.isEntering && styles.enterBodyReveal,
            !hasHeader && styles.immediateBodyReveal,
          )}
        >
          <div {...stylex.props(styles.bodyClip)}>
            <div {...stylex.props(styles.body)}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function isProfilePhotoHeader(header: ReactNode) {
  return isValidElement(header) && header.type === LUIProfilePhotoHeader;
}

const bodyWipeDown = stylex.keyframes({
  "0%": {
    gridTemplateRows: "0fr",
  },
  "100%": {
    gridTemplateRows: "1fr",
  },
});

const cardWipeRight = stylex.keyframes({
  "0%": {
    maskSize: "0% 100%",
  },
  "100%": {
    maskSize: "100% 100%",
  },
});

const styles = stylex.create({
  body: {
    paddingBlock: 18,
    paddingInline: 20,
  },
  bodyClip: {
    overflow: "hidden",
    minBlockSize: 0,
  },
  bodyReveal: {
    overflow: "hidden",
    display: "grid",
    gridTemplateRows: "0fr",
  },
  enterBodyReveal: {
    animationDelay: "var(--lui-wipe-duration)",
    animationDuration: "var(--lui-wipe-duration)",
    animationFillMode: "forwards",
    animationName: bodyWipeDown,
    animationTimingFunction: "var(--lui-wipe-easing)",
  },
  enterCardReveal: {
    animationDuration: "var(--lui-wipe-duration)",
    animationFillMode: "forwards",
    animationName: cardWipeRight,
    animationTimingFunction: "var(--lui-wipe-easing)",
  },
  enteredBodyReveal: {
    gridTemplateRows: "1fr",
  },
  immediateBodyReveal: {
    animationDelay: "0ms",
  },
  hiddenProfilePhoto: {
    opacity: 0,
  },
  hoverProfilePhoto: {
    inset: 0,
    opacity: 0,
    position: "absolute",
  },
  header: {
    overflow: "hidden",
    paddingBlock: 12,
    paddingInline: 16,
    alignItems: "start",
    backgroundImage:
      "linear-gradient(90deg, rgba(115, 221, 255, .2) 0%, rgba(36, 168, 255, .1) 48%, rgba(5, 9, 20, 0) 100%)",
    borderBlockEndColor: "rgba(115, 221, 255, .38)",
    borderBlockEndStyle: "solid",
    borderBlockEndWidth: 1,
    boxShadow:
      "inset 0 1px 0 rgba(255, 255, 255, .16), inset 0 -1px 0 rgba(36, 168, 255, .2)",
    columnGap: 14,
    display: "grid",
    gridTemplateColumns: "1fr",
    minBlockSize: 52,
    position: "relative",
  },
  headerLine: {
    backgroundColor: colorVars.primaryBlue,
    boxShadow: "0 0 12px rgba(115, 221, 255, .38)",
    inlineSize: "100%",
    maskImage: "linear-gradient(90deg, #000 0%, #000 64%, transparent 100%)",
    height: 1,
  },
  headerTick: {
    backgroundColor: colorVars.primaryBlue,
    blockSize: 14,
    boxShadow: "0 0 10px rgba(115, 221, 255, .55)",
    clipPath: "polygon(0 0, 100% 0, 100% 72%, 58% 100%, 0 100%)",
    inlineSize: 4,
  },
  headerTitleBlock: {
    gap: 8,
    alignContent: "start",
    alignSelf: "start",
    display: "grid",
    inlineSize: "100%",
    minInlineSize: 0,
    position: "relative",
    zIndex: 1,
  },
  headerTitleRail: {
    alignItems: "center",
    columnGap: 8,
    display: "grid",
    gridTemplateColumns: "auto minmax(0, 1fr)",
    minInlineSize: 0,
  },
  profileHeaderOffset: {
    paddingInlineStart: 78,
  },
  profilePhoto: {
    borderRadius: "50%",
    blockSize: "100%",
    display: "block",
    inlineSize: "100%",
    objectFit: "cover",
  },
  profilePhotoLayer: {
    transitionDuration: {
      default: "180ms",
      "@media (prefers-reduced-motion: reduce)": "0ms",
    },
    transitionProperty: "opacity",
    transitionTimingFunction: "ease",
  },
  profilePhotoArc: {
    inset: 0,
    borderRadius: "50%",
    backgroundColor: colorVars.primaryBlue,
    filter: "drop-shadow(0 0 8px rgba(115, 221, 255, .46))",
    maskImage:
      "radial-gradient(circle at center, transparent 0 69%, #000 70% 72%, transparent 73% 100%)",
    pointerEvents: "none",
    position: "absolute",
  },
  profilePhotoFrame: {
    borderRadius: "50%",
    overflow: "hidden",
    backgroundColor: colorVars.darkSurfaceBackground,
    backgroundImage:
      "radial-gradient(circle at 28% 24%, rgba(216, 243, 255, .28), transparent 32%), linear-gradient(135deg, rgba(115, 221, 255, .32), rgba(36, 168, 255, .08))",
    blockSize: 112,
    boxShadow:
      "0 0 18px rgba(115, 221, 255, .24), inset 0 0 0 3px rgba(5, 9, 20, .74), inset 0 0 18px rgba(36, 168, 255, .22)",
    boxSizing: "border-box",
    inlineSize: 112,
    insetBlockStart: 0,
    insetInlineStart: 0,
    position: "absolute",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
  },
  profileRoot: {
    overflow: "visible",
  },
  profileRevealRoot: {
    paddingBlockEnd: 8,
    paddingBlockStart: 64,
    paddingInlineStart: 64,
  },
  revealRoot: {
    overflow: "visible",
    alignSelf: "start",
    isolation: "isolate",
    position: "relative",
  },
  root: {
    borderColor: colorVars.primaryBlue,
    borderRadius: "clamp(6px, 2.6%, 14px)",
    borderStyle: "solid",
    borderWidth: 1,
    cornerShape: "squircle",
    overflow: "hidden",
    alignContent: "start",
    alignSelf: "start",
    backgroundColor: colorVars.cardBackround,
    boxShadow:
      "inset 0 0 0 1px rgba(115, 221, 255, .1), 0 0 24px rgba(36, 168, 255, .12)",
    color: colorVars.primaryTextColor,
    display: "grid",
    position: "relative",
    width: "100%",
  },
  title: {
    margin: 0,
    color: colorVars.primaryTextColor,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "var(--lui-letter-spacing)",
    lineHeight: 1.15,
  },
  visibleProfilePhoto: {
    opacity: 1,
  },
  waitingCardReveal: {
    maskImage: "linear-gradient(90deg, #000 0%, #000 100%)",
    maskPosition: "left top",
    maskRepeat: "no-repeat",
    maskSize: "0% 100%",
  },
});
