import { useId } from "react";
import * as stylex from "@stylexjs/stylex";
import type {
  CSSProperties as StyleXCSSProperties,
  StyleXStyles,
} from "@stylexjs/stylex";

import { colorVars } from "../styles/theme.stylex";

type LUIOrbitalRingsXStyle = StyleXStyles<{
  height?: StyleXCSSProperties["height"];
  width?: StyleXCSSProperties["width"];
}>;

type LUIOrbitalRingsProps = {
  xstyle?: LUIOrbitalRingsXStyle;
};

type TickMark = {
  id: string;
  isMajor: boolean;
  isMedium: boolean;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

const CENTER = 500;

function polarPoint(radius: number, angleDeg: number): [number, number] {
  const rad = (angleDeg * Math.PI) / 180;
  return [
    Number((CENTER + radius * Math.cos(rad)).toFixed(2)),
    Number((CENTER + radius * Math.sin(rad)).toFixed(2)),
  ];
}

const outerTicks: readonly TickMark[] = Array.from({ length: 36 }, (_, i) => {
  const angle = i * 10;
  const isMajor = angle % 90 === 0;
  const isMedium = !isMajor && angle % 30 === 0;
  const length = isMajor ? 18 : isMedium ? 11 : 5;
  const [x1, y1] = polarPoint(460, angle);
  const [x2, y2] = polarPoint(460 - length, angle);

  return {
    id: `outer-tick-${angle}`,
    isMajor,
    isMedium,
    x1,
    x2,
    y1,
    y2,
  };
});

const innerCardinalTicks: readonly TickMark[] = [0, 90, 180, 270].map(
  (angle) => {
    const [x1, y1] = polarPoint(185, angle);
    const [x2, y2] = polarPoint(168, angle);

    return {
      id: `inner-tick-${angle}`,
      isMajor: true,
      isMedium: false,
      x1,
      x2,
      y1,
      y2,
    };
  },
);

const primaryNodes = [
  { angle: 12, id: "primary-node-a", radius: 385 },
  { angle: 204, id: "primary-node-b", radius: 385 },
].map(({ angle, id, radius }) => {
  const [cx, cy] = polarPoint(radius, angle);
  return { cx, cy, id };
});

const midNode = (() => {
  const [cx, cy] = polarPoint(285, 132);
  return { cx, cy };
})();

const crossNode = (() => {
  const [cx, cy] = polarPoint(340, 322);
  return { cx, cy };
})();

export default function LUIOrbitalRings({ xstyle }: LUIOrbitalRingsProps) {
  const baseId = useId();
  const primaryHaloId = `lui-orbital-primary-${baseId}`;
  const midHaloId = `lui-orbital-mid-${baseId}`;
  const centerHaloId = `lui-orbital-center-${baseId}`;
  const crossHaloId = `lui-orbital-cross-${baseId}`;

  return (
    <div
      role="img"
      aria-label="Slowly rotating spherical orbital rings"
      {...stylex.props(styles.root, xstyle)}
    >
      <div aria-hidden="true" {...stylex.props(styles.ambientGlow)} />

      <div aria-hidden="true" {...stylex.props(styles.sphereScene)}>
        <div {...stylex.props(styles.plane, styles.outerPlane)}>
          <svg
            viewBox="0 0 1000 1000"
            {...stylex.props(styles.ringSvg, styles.spinOuter)}
          >
            <circle
              cx={CENTER}
              cy={CENTER}
              fill="none"
              r={460}
              strokeWidth={1.3}
              {...stylex.props(styles.secondaryStroke, styles.opacitySubtle)}
            />
            {outerTicks.map((tick) => (
              <line
                key={tick.id}
                strokeWidth={tick.isMajor ? 2 : 1.2}
                x1={tick.x1}
                x2={tick.x2}
                y1={tick.y1}
                y2={tick.y2}
                {...stylex.props(
                  tick.isMajor ? styles.primaryStroke : styles.secondaryStroke,
                  tick.isMajor
                    ? styles.opacityBright
                    : tick.isMedium
                      ? styles.opacityMedium
                      : styles.opacitySubtle,
                )}
              />
            ))}
          </svg>
        </div>

        <div {...stylex.props(styles.plane, styles.primaryPlane)}>
          <svg
            viewBox="0 0 1000 1000"
            {...stylex.props(styles.ringSvg, styles.spinPrimary)}
          >
            <defs>
              <radialGradient
                id={primaryHaloId}
                {...stylex.props(styles.primaryColor)}
              >
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
                <stop
                  offset="38%"
                  stopColor="currentColor"
                  stopOpacity="0.38"
                />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle
              cx={CENTER}
              cy={CENTER}
              fill="none"
              r={385}
              strokeWidth={1.2}
              {...stylex.props(styles.primaryStroke, styles.opacityFaint)}
            />
            <circle
              cx={CENTER}
              cy={CENTER}
              fill="none"
              r={385}
              strokeDasharray="460 270 160 340 500 689"
              strokeLinecap="round"
              strokeWidth={7.5}
              {...stylex.props(styles.primaryStroke, styles.opacityGlow)}
            />
            <circle
              cx={CENTER}
              cy={CENTER}
              fill="none"
              r={385}
              strokeDasharray="460 270 160 340 500 689"
              strokeLinecap="round"
              strokeWidth={2.1}
              {...stylex.props(styles.primaryStroke, styles.opacityStrong)}
            />
            {primaryNodes.map((node) => (
              <g key={node.id}>
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  fill={`url(#${primaryHaloId})`}
                  r={17}
                />
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={3.5}
                  {...stylex.props(styles.nodeCoreFill)}
                />
              </g>
            ))}
          </svg>
        </div>

        <div {...stylex.props(styles.plane, styles.crossPlane)}>
          <svg
            viewBox="0 0 1000 1000"
            {...stylex.props(styles.ringSvg, styles.spinCross)}
          >
            <defs>
              <radialGradient
                id={crossHaloId}
                {...stylex.props(styles.primaryColor)}
              >
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
                <stop
                  offset="38%"
                  stopColor="currentColor"
                  stopOpacity="0.38"
                />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle
              cx={CENTER}
              cy={CENTER}
              fill="none"
              r={340}
              strokeWidth={1.2}
              {...stylex.props(styles.secondaryStroke, styles.opacitySubtle)}
            />
            <circle
              cx={CENTER}
              cy={CENTER}
              fill="none"
              r={340}
              strokeDasharray="240 1900"
              strokeDashoffset={220}
              strokeLinecap="round"
              strokeWidth={6.5}
              {...stylex.props(styles.primaryStroke, styles.opacityGlow)}
            />
            <circle
              cx={CENTER}
              cy={CENTER}
              fill="none"
              r={340}
              strokeDasharray="240 1900"
              strokeDashoffset={220}
              strokeLinecap="round"
              strokeWidth={1.8}
              {...stylex.props(styles.primaryStroke, styles.opacityBright)}
            />
            <circle
              cx={crossNode.cx}
              cy={crossNode.cy}
              fill={`url(#${crossHaloId})`}
              r={18}
            />
            <circle
              cx={crossNode.cx}
              cy={crossNode.cy}
              r={3.5}
              {...stylex.props(styles.nodeCoreFill)}
            />
          </svg>
        </div>

        <div {...stylex.props(styles.plane, styles.midPlane)}>
          <svg
            viewBox="0 0 1000 1000"
            {...stylex.props(styles.ringSvg, styles.spinMid)}
          >
            <defs>
              <radialGradient
                id={midHaloId}
                {...stylex.props(styles.primaryColor)}
              >
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
                <stop
                  offset="38%"
                  stopColor="currentColor"
                  stopOpacity="0.38"
                />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle
              cx={CENTER}
              cy={CENTER}
              fill="none"
              r={285}
              strokeDasharray="6 14"
              strokeWidth={1.6}
              {...stylex.props(styles.secondaryStroke, styles.opacityMedium)}
            />
            <circle
              cx={CENTER}
              cy={CENTER}
              fill="none"
              r={285}
              strokeDasharray="210 685 210 685"
              strokeLinecap="round"
              strokeWidth={6.5}
              {...stylex.props(styles.primaryStroke, styles.opacityGlow)}
            />
            <circle
              cx={CENTER}
              cy={CENTER}
              fill="none"
              r={285}
              strokeDasharray="210 685 210 685"
              strokeLinecap="round"
              strokeWidth={1.9}
              {...stylex.props(styles.primaryStroke, styles.opacityBright)}
            />
            <circle
              cx={midNode.cx}
              cy={midNode.cy}
              fill={`url(#${midHaloId})`}
              r={15}
            />
            <circle
              cx={midNode.cx}
              cy={midNode.cy}
              r={3}
              {...stylex.props(styles.nodeCoreFill)}
            />
          </svg>
        </div>

        <div {...stylex.props(styles.plane, styles.innerPlane)}>
          <svg
            viewBox="0 0 1000 1000"
            {...stylex.props(styles.ringSvg, styles.spinInner)}
          >
            <circle
              cx={CENTER}
              cy={CENTER}
              fill="none"
              r={185}
              strokeWidth={1.3}
              {...stylex.props(styles.primaryStroke, styles.opacitySubtle)}
            />
            <circle
              cx={CENTER}
              cy={CENTER}
              fill="none"
              r={166}
              strokeDasharray="2 9"
              strokeWidth={1.1}
              {...stylex.props(styles.secondaryStroke, styles.opacitySubtle)}
            />
            <circle
              cx={CENTER}
              cy={CENTER}
              fill="none"
              r={185}
              strokeDasharray="150 431 150 431"
              strokeLinecap="round"
              strokeWidth={2}
              {...stylex.props(styles.primaryStroke, styles.opacityBright)}
            />
            {innerCardinalTicks.map((tick) => (
              <line
                key={tick.id}
                strokeWidth={1.6}
                x1={tick.x1}
                x2={tick.x2}
                y1={tick.y1}
                y2={tick.y2}
                {...stylex.props(styles.primaryStroke, styles.opacityMedium)}
              />
            ))}
          </svg>
        </div>

        <div {...stylex.props(styles.plane, styles.corePlane)}>
          <svg viewBox="0 0 1000 1000" {...stylex.props(styles.ringSvg)}>
            <defs>
              <radialGradient
                id={centerHaloId}
                {...stylex.props(styles.primaryColor)}
              >
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
                <stop
                  offset="40%"
                  stopColor="currentColor"
                  stopOpacity="0.32"
                />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle
              cx={CENTER}
              cy={CENTER}
              fill="none"
              r={52}
              strokeWidth={1.1}
              {...stylex.props(styles.primaryStroke, styles.opacityFaint)}
            />
            <circle
              cx={CENTER}
              cy={CENTER}
              fill={`url(#${centerHaloId})`}
              r={22}
              {...stylex.props(styles.opacityMedium)}
            />
            <circle
              cx={CENTER}
              cy={CENTER}
              r={3}
              {...stylex.props(styles.nodeCoreFill, styles.opacityBright)}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

const spinClockwise = stylex.keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});

const spinCounterClockwise = stylex.keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(-360deg)",
  },
});

const tumbleOuter = stylex.keyframes({
  "0%": {
    transform:
      "translate(-50%, -50%) rotateZ(-10deg) rotateX(58deg) rotateY(-18deg)",
  },
  "100%": {
    transform:
      "translate(-50%, -50%) rotateZ(-10deg) rotateX(58deg) rotateY(342deg)",
  },
});

const tumblePrimary = stylex.keyframes({
  "0%": {
    transform:
      "translate(-50%, -50%) rotateZ(16deg) rotateY(-26deg) rotateX(52deg)",
  },
  "100%": {
    transform:
      "translate(-50%, -50%) rotateZ(16deg) rotateY(-26deg) rotateX(412deg)",
  },
});

const tumbleCross = stylex.keyframes({
  "0%": {
    transform:
      "translate(-50%, -50%) rotateZ(-32deg) rotateX(34deg) rotateY(42deg)",
  },
  "100%": {
    transform:
      "translate(-50%, -50%) rotateZ(-32deg) rotateX(34deg) rotateY(-318deg)",
  },
});

const tumbleMid = stylex.keyframes({
  "0%": {
    transform:
      "translate(-50%, -50%) rotateZ(38deg) rotateY(28deg) rotateX(-44deg)",
  },
  "100%": {
    transform:
      "translate(-50%, -50%) rotateZ(38deg) rotateY(28deg) rotateX(-404deg)",
  },
});

const tumbleInner = stylex.keyframes({
  "0%": {
    transform:
      "translate(-50%, -50%) rotateZ(-18deg) rotateX(54deg) rotateY(30deg)",
  },
  "100%": {
    transform:
      "translate(-50%, -50%) rotateZ(-18deg) rotateX(54deg) rotateY(390deg)",
  },
});

const styles = stylex.create({
  ambientGlow: {
    backgroundImage:
      "radial-gradient(circle at 50% 50%, rgba(36, 168, 255, 0.16) 0%, rgba(115, 221, 255, 0.05) 36%, transparent 64%)",
    insetBlockEnd: 0,
    insetBlockStart: 0,
    insetInlineEnd: 0,
    insetInlineStart: 0,
    pointerEvents: "none",
    position: "absolute",
  },
  corePlane: {
    transform: "translate(-50%, -50%) rotateX(54deg) rotateY(-14deg)",
  },
  crossPlane: {
    animationDuration: {
      default: "54s",
      "@media (prefers-reduced-motion: reduce)": "0s",
    },
    animationIterationCount: "infinite",
    animationName: {
      default: tumbleCross,
      "@media (prefers-reduced-motion: reduce)": "none",
    },
    animationTimingFunction: "linear",
    transform:
      "translate(-50%, -50%) rotateZ(-32deg) rotateX(34deg) rotateY(42deg)",
  },
  innerPlane: {
    animationDuration: {
      default: "38s",
      "@media (prefers-reduced-motion: reduce)": "0s",
    },
    animationIterationCount: "infinite",
    animationName: {
      default: tumbleInner,
      "@media (prefers-reduced-motion: reduce)": "none",
    },
    animationTimingFunction: "linear",
    transform:
      "translate(-50%, -50%) rotateZ(-18deg) rotateX(54deg) rotateY(30deg)",
  },
  midPlane: {
    animationDuration: {
      default: "46s",
      "@media (prefers-reduced-motion: reduce)": "0s",
    },
    animationIterationCount: "infinite",
    animationName: {
      default: tumbleMid,
      "@media (prefers-reduced-motion: reduce)": "none",
    },
    animationTimingFunction: "linear",
    transform:
      "translate(-50%, -50%) rotateZ(38deg) rotateY(28deg) rotateX(-44deg)",
  },
  nodeCoreFill: {
    fill: colorVars.primaryTextColor,
  },
  opacityBright: {
    opacity: 0.78,
  },
  opacityFaint: {
    opacity: 0.22,
  },
  opacityGlow: {
    opacity: 0.22,
  },
  opacityMedium: {
    opacity: 0.5,
  },
  opacityStrong: {
    opacity: 0.92,
  },
  opacitySubtle: {
    opacity: 0.36,
  },
  outerPlane: {
    animationDuration: {
      default: "96s",
      "@media (prefers-reduced-motion: reduce)": "0s",
    },
    animationIterationCount: "infinite",
    animationName: {
      default: tumbleOuter,
      "@media (prefers-reduced-motion: reduce)": "none",
    },
    animationTimingFunction: "linear",
    transform:
      "translate(-50%, -50%) rotateZ(-10deg) rotateX(58deg) rotateY(-18deg)",
  },
  plane: {
    position: "absolute",
    transformStyle: "preserve-3d",
    height: "min(96cqw, 96cqh)",
    left: "50%",
    top: "50%",
    width: "min(96cqw, 96cqh)",
  },
  primaryColor: {
    color: colorVars.primaryBlue,
  },
  primaryPlane: {
    animationDuration: {
      default: "68s",
      "@media (prefers-reduced-motion: reduce)": "0s",
    },
    animationIterationCount: "infinite",
    animationName: {
      default: tumblePrimary,
      "@media (prefers-reduced-motion: reduce)": "none",
    },
    animationTimingFunction: "linear",
    transform:
      "translate(-50%, -50%) rotateZ(16deg) rotateY(-26deg) rotateX(52deg)",
  },
  primaryStroke: {
    stroke: colorVars.primaryBlue,
  },
  ringSvg: {
    overflow: "visible",
    display: "block",
    insetBlockStart: 0,
    insetInlineStart: 0,
    position: "absolute",
    transformOrigin: "50% 50%",
    height: "100%",
    width: "100%",
  },
  root: {
    overflow: "visible",
    containerType: "size",
    opacity: 0.78,
    perspective: "70rem",
    perspectiveOrigin: "50% 50%",
    position: "relative",
    height: "min(72dvh, 26.25rem)",
    width: "min(92vw, 35rem)",
  },
  secondaryStroke: {
    stroke: colorVars.secondaryBlue,
  },
  sphereScene: {
    insetBlockEnd: 0,
    insetBlockStart: 0,
    insetInlineEnd: 0,
    insetInlineStart: 0,
    position: "absolute",
    transformStyle: "preserve-3d",
  },
  spinCross: {
    animationDuration: {
      default: "76s",
      "@media (prefers-reduced-motion: reduce)": "0s",
    },
    animationIterationCount: "infinite",
    animationName: {
      default: spinClockwise,
      "@media (prefers-reduced-motion: reduce)": "none",
    },
    animationTimingFunction: "linear",
  },
  spinInner: {
    animationDuration: {
      default: "52s",
      "@media (prefers-reduced-motion: reduce)": "0s",
    },
    animationIterationCount: "infinite",
    animationName: {
      default: spinCounterClockwise,
      "@media (prefers-reduced-motion: reduce)": "none",
    },
    animationTimingFunction: "linear",
  },
  spinMid: {
    animationDuration: {
      default: "68s",
      "@media (prefers-reduced-motion: reduce)": "0s",
    },
    animationIterationCount: "infinite",
    animationName: {
      default: spinClockwise,
      "@media (prefers-reduced-motion: reduce)": "none",
    },
    animationTimingFunction: "linear",
  },
  spinOuter: {
    animationDuration: {
      default: "140s",
      "@media (prefers-reduced-motion: reduce)": "0s",
    },
    animationIterationCount: "infinite",
    animationName: {
      default: spinClockwise,
      "@media (prefers-reduced-motion: reduce)": "none",
    },
    animationTimingFunction: "linear",
  },
  spinPrimary: {
    animationDuration: {
      default: "92s",
      "@media (prefers-reduced-motion: reduce)": "0s",
    },
    animationIterationCount: "infinite",
    animationName: {
      default: spinCounterClockwise,
      "@media (prefers-reduced-motion: reduce)": "none",
    },
    animationTimingFunction: "linear",
  },
});
