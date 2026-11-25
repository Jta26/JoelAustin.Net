import { useId, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import type {
  CSSProperties as StyleXCSSProperties,
  StyleXStyles,
} from "@stylexjs/stylex";

import { colorVars } from "../styles/theme.stylex";
import LUIFade from "./LUIFade";
import type { LUIWipeTiming } from "./LUIWipe.styles";

type LUIOrbitalRingsXStyle = StyleXStyles<{
  height?: StyleXCSSProperties["height"];
  width?: StyleXCSSProperties["width"];
}>;

type LUIOrbitalRingsProps = {
  animationId?: string;
  fadeDurationMs?: number;
  fadeOrder?: number;
  timing?: LUIWipeTiming;
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

type RingPhaseDelays = {
  coreSpin: string;
  coreTumble: string;
  crossSpin: string;
  crossTumble: string;
  innerSpin: string;
  innerTumble: string;
  midSpin: string;
  midTumble: string;
  outerSpin: string;
  outerTumble: string;
  primarySpin: string;
  primaryTumble: string;
};

const CENTER = 500;

const RING_DURATIONS_SEC = {
  coreSpin: 28,
  coreTumble: 74,
  crossSpin: 36,
  crossTumble: 125,
  innerSpin: 32,
  innerTumble: 88,
  midSpin: 42,
  midTumble: 105,
  outerSpin: 90,
  outerTumble: 210,
  primarySpin: 48,
  primaryTumble: 155,
} as const;

function randomNegativeDelay(durationSec: number): string {
  return `${(-Math.random() * durationSec).toFixed(2)}s`;
}

function createRandomPhaseDelays(): RingPhaseDelays {
  return {
    coreSpin: randomNegativeDelay(RING_DURATIONS_SEC.coreSpin),
    coreTumble: randomNegativeDelay(RING_DURATIONS_SEC.coreTumble),
    crossSpin: randomNegativeDelay(RING_DURATIONS_SEC.crossSpin),
    crossTumble: randomNegativeDelay(RING_DURATIONS_SEC.crossTumble),
    innerSpin: randomNegativeDelay(RING_DURATIONS_SEC.innerSpin),
    innerTumble: randomNegativeDelay(RING_DURATIONS_SEC.innerTumble),
    midSpin: randomNegativeDelay(RING_DURATIONS_SEC.midSpin),
    midTumble: randomNegativeDelay(RING_DURATIONS_SEC.midTumble),
    outerSpin: randomNegativeDelay(RING_DURATIONS_SEC.outerSpin),
    outerTumble: randomNegativeDelay(RING_DURATIONS_SEC.outerTumble),
    primarySpin: randomNegativeDelay(RING_DURATIONS_SEC.primarySpin),
    primaryTumble: randomNegativeDelay(RING_DURATIONS_SEC.primaryTumble),
  };
}

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

export default function LUIOrbitalRings({
  animationId = "orbital-rings",
  fadeDurationMs = 6000,
  fadeOrder,
  timing = "chunky",
  xstyle,
}: LUIOrbitalRingsProps) {
  const baseId = useId();
  const [phaseDelays] = useState<RingPhaseDelays>(createRandomPhaseDelays);
  const primaryHaloId = `lui-orbital-primary-${baseId}`;
  const midHaloId = `lui-orbital-mid-${baseId}`;
  const centerHaloId = `lui-orbital-center-${baseId}`;
  const crossHaloId = `lui-orbital-cross-${baseId}`;

  const ringsContent = (
    <div {...stylex.props(styles.ringsStage)}>
      <div aria-hidden="true" {...stylex.props(styles.ambientGlow)} />
      <div aria-hidden="true" {...stylex.props(styles.ambientNoise)} />
      <div aria-hidden="true" {...stylex.props(styles.sphereViewport)}>
        <div {...stylex.props(styles.sphereScene)}>
        <div
          {...stylex.props(
            styles.plane,
            styles.outerPlane,
            styles.phaseDelay(phaseDelays.outerTumble),
          )}
        >
          <svg
            viewBox="0 0 1000 1000"
            {...stylex.props(
              styles.ringSvg,
              styles.spinOuter,
              styles.phaseDelay(phaseDelays.outerSpin),
            )}
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

        <div
          {...stylex.props(
            styles.plane,
            styles.primaryPlane,
            styles.phaseDelay(phaseDelays.primaryTumble),
          )}
        >
          <svg
            viewBox="0 0 1000 1000"
            {...stylex.props(
              styles.ringSvg,
              styles.spinPrimary,
              styles.phaseDelay(phaseDelays.primarySpin),
            )}
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

        <div
          {...stylex.props(
            styles.plane,
            styles.crossPlane,
            styles.phaseDelay(phaseDelays.crossTumble),
          )}
        >
          <svg
            viewBox="0 0 1000 1000"
            {...stylex.props(
              styles.ringSvg,
              styles.spinCross,
              styles.phaseDelay(phaseDelays.crossSpin),
            )}
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

        <div
          {...stylex.props(
            styles.plane,
            styles.midPlane,
            styles.phaseDelay(phaseDelays.midTumble),
          )}
        >
          <svg
            viewBox="0 0 1000 1000"
            {...stylex.props(
              styles.ringSvg,
              styles.spinMid,
              styles.phaseDelay(phaseDelays.midSpin),
            )}
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

        <div
          {...stylex.props(
            styles.plane,
            styles.innerPlane,
            styles.phaseDelay(phaseDelays.innerTumble),
          )}
        >
          <svg
            viewBox="0 0 1000 1000"
            {...stylex.props(
              styles.ringSvg,
              styles.spinInner,
              styles.phaseDelay(phaseDelays.innerSpin),
            )}
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

        <div
          {...stylex.props(
            styles.plane,
            styles.coreRingPlane,
            styles.phaseDelay(phaseDelays.coreTumble),
          )}
        >
          <svg
            viewBox="0 0 1000 1000"
            {...stylex.props(
              styles.ringSvg,
              styles.spinCore,
              styles.phaseDelay(phaseDelays.coreSpin),
            )}
          >
            <circle
              cx={CENTER}
              cy={CENTER}
              fill="none"
              r={52}
              strokeWidth={1.1}
              {...stylex.props(styles.primaryStroke, styles.opacitySubtle)}
            />
            <circle
              cx={CENTER}
              cy={CENTER}
              fill="none"
              r={52}
              strokeDasharray="64 263"
              strokeLinecap="round"
              strokeWidth={1.8}
              {...stylex.props(styles.primaryStroke, styles.opacityBright)}
            />
          </svg>
        </div>

        <div {...stylex.props(styles.plane, styles.coreDotPlane)}>
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
    </div>
  );

  return (
    <div
      role="img"
      aria-label="Slowly rotating spherical orbital rings"
      {...stylex.props(styles.root, xstyle)}
    >
      {fadeOrder !== undefined ? (
        <LUIFade
          animationId={animationId}
          durationMs={fadeDurationMs}
          order={fadeOrder}
          timing={timing}
          xstyle={styles.circlesFade}
        >
          {ringsContent}
        </LUIFade>
      ) : (
        ringsContent
      )}
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

const tumbleCore = stylex.keyframes({
  "0%": {
    transform:
      "translate(-50%, -50%) rotateZ(24deg) rotateY(-20deg) rotateX(48deg)",
  },
  "100%": {
    transform:
      "translate(-50%, -50%) rotateZ(24deg) rotateY(-20deg) rotateX(-312deg)",
  },
});

const noiseTextureDataUrl = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const styles = stylex.create({
  ambientGlow: {
    backgroundImage:
      "radial-gradient(circle at 50% 50%, rgba(36, 168, 255, 0.06) 0%, rgba(36, 168, 255, 0.04) 12%, rgba(62, 186, 255, 0.022) 26%, rgba(36, 168, 255, 0.01) 42%, rgba(36, 168, 255, 0.003) 58%, rgba(36, 168, 255, 0) 76%)",
    insetBlockEnd: "-50vmax",
    insetBlockStart: "-50vmax",
    insetInlineEnd: "-50vmax",
    insetInlineStart: "-50vmax",
    pointerEvents: "none",
    position: "absolute",
  },
  ambientNoise: {
    backgroundImage: noiseTextureDataUrl,
    backgroundRepeat: "repeat",
    backgroundSize: "200px 200px",
    insetBlockEnd: "-50vmax",
    insetBlockStart: "-50vmax",
    insetInlineEnd: "-50vmax",
    insetInlineStart: "-50vmax",
    opacity: 0.032,
    pointerEvents: "none",
    position: "absolute",
  },
  circlesFade: {
    "--lui-wipe-easing": "cubic-bezier(0.4, 0, 0.2, 1)",
    height: "100%",
    width: "100%",
  },
  coreDotPlane: {
    transform: "translate(-50%, -50%)",
  },
  coreRingPlane: {
    animationDuration: {
      default: "74s",
      "@media (prefers-reduced-motion: reduce)": "0s",
    },
    animationIterationCount: "infinite",
    animationName: {
      default: tumbleCore,
      "@media (prefers-reduced-motion: reduce)": "none",
    },
    animationTimingFunction: "linear",
    transform:
      "translate(-50%, -50%) rotateZ(24deg) rotateY(-20deg) rotateX(48deg)",
  },
  crossPlane: {
    animationDuration: {
      default: "125s",
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
      default: "88s",
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
      default: "105s",
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
      default: "210s",
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
  phaseDelay: (animationDelay: string) => ({
    animationDelay,
  }),
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
      default: "155s",
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
  ringsStage: {
    position: "relative",
    height: "100%",
    width: "100%",
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
  sphereViewport: {
    overflow: "visible",
    perspective: "70rem",
    perspectiveOrigin: "50% 50%",
    position: "relative",
    height: "100%",
    width: "100%",
  },
  spinCore: {
    animationDuration: {
      default: "28s",
      "@media (prefers-reduced-motion: reduce)": "0s",
    },
    animationIterationCount: "infinite",
    animationName: {
      default: spinClockwise,
      "@media (prefers-reduced-motion: reduce)": "none",
    },
    animationTimingFunction: "linear",
  },
  spinCross: {
    animationDuration: {
      default: "36s",
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
      default: "32s",
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
      default: "42s",
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
      default: "90s",
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
      default: "48s",
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
