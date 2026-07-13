import * as stylex from "@stylexjs/stylex";
import type {
  CSSProperties as StyleXCSSProperties,
  StyleXStyles,
} from "@stylexjs/stylex";

import { colorVars } from "../styles/theme.stylex";

type Vertex = readonly [number, number, number];

type Edge = {
  id: string;
  length: number;
  rotateY: number;
  rotateZ: number;
  x: number;
  y: number;
  z: number;
};

type LUIHypercubeXStyle = StyleXStyles<{
  height?: StyleXCSSProperties["height"];
  width?: StyleXCSSProperties["width"];
}>;

type LUIHypercubeProps = {
  innerSize?: number;
  outerSize?: number;
  xstyle?: LUIHypercubeXStyle;
};

const edgePairs = [
  [0, 1],
  [0, 2],
  [0, 4],
  [1, 3],
  [1, 5],
  [2, 3],
  [2, 6],
  [3, 7],
  [4, 5],
  [4, 6],
  [5, 7],
  [6, 7],
] as const;

export default function LUIHypercube({
  innerSize = 46,
  outerSize = 84,
  xstyle,
}: LUIHypercubeProps) {
  const outerVertices = createCubeVertices(outerSize);
  const innerVertices = createCubeVertices(innerSize);
  const edges = createHypercubeEdges(outerVertices, innerVertices);

  return (
    <div
      role="img"
      aria-label="Slowly rotating CSS hypercube"
      {...stylex.props(styles.root, xstyle)}
    >
      <div {...stylex.props(styles.cube)}>
        {edges.map((edge) => (
          <span
            key={edge.id}
            {...stylex.props(
              styles.edgeWrapper(
                `${(edge.length / outerSize).toFixed(5)}`,
                `${edge.rotateY.toFixed(5)}rad`,
                `${edge.rotateZ.toFixed(5)}rad`,
                `${(edge.x / outerSize).toFixed(5)}`,
                `${(edge.y / outerSize).toFixed(5)}`,
                `${(edge.z / outerSize).toFixed(5)}`,
              ),
            )}
          >
            <span {...stylex.props(styles.edge)} />
          </span>
        ))}
      </div>
    </div>
  );
}

function createCubeVertices(size: number, offset: Vertex = [0, 0, 0]) {
  const [offsetX, offsetY, offsetZ] = offset;

  return [
    [-size + offsetX, -size + offsetY, -size + offsetZ],
    [size + offsetX, -size + offsetY, -size + offsetZ],
    [-size + offsetX, size + offsetY, -size + offsetZ],
    [size + offsetX, size + offsetY, -size + offsetZ],
    [-size + offsetX, -size + offsetY, size + offsetZ],
    [size + offsetX, -size + offsetY, size + offsetZ],
    [-size + offsetX, size + offsetY, size + offsetZ],
    [size + offsetX, size + offsetY, size + offsetZ],
  ] as const satisfies readonly Vertex[];
}

function createHypercubeEdges(
  outerVertices: readonly Vertex[],
  innerVertices: readonly Vertex[],
) {
  const hypercubeEdges: Edge[] = [];

  edgePairs.forEach(([start, end]) => {
    hypercubeEdges.push(
      createEdge(
        `outer-${start}-${end}`,
        outerVertices[start],
        outerVertices[end],
      ),
    );
    hypercubeEdges.push(
      createEdge(
        `inner-${start}-${end}`,
        innerVertices[start],
        innerVertices[end],
      ),
    );
  });

  outerVertices.forEach((vertex, index) => {
    hypercubeEdges.push(
      createEdge(`connector-${index}`, vertex, innerVertices[index]),
    );
  });

  return hypercubeEdges;
}

function createEdge(id: string, start: Vertex, end: Vertex): Edge {
  const [startX, startY, startZ] = start;
  const [endX, endY, endZ] = end;
  const deltaX = endX - startX;
  const deltaY = endY - startY;
  const deltaZ = endZ - startZ;
  const length = Math.hypot(deltaX, deltaY, deltaZ);

  return {
    id,
    length,
    rotateY: Math.asin(-deltaZ / length),
    rotateZ: Math.atan2(deltaY, deltaX),
    x: startX,
    y: startY,
    z: startZ,
  };
}

const rotateHypercube = stylex.keyframes({
  "0%": {
    transform: "rotateX(58deg) rotateY(0deg) rotateZ(38deg)",
  },
  "100%": {
    transform: "rotateX(58deg) rotateY(360deg) rotateZ(38deg)",
  },
});

const styles = stylex.create({
  cube: {
    animationDuration: {
      default: "86s",
      "@media (prefers-reduced-motion: reduce)": "0s",
    },
    animationIterationCount: "infinite",
    animationName: rotateHypercube,
    animationTimingFunction: "linear",
    position: "absolute",
    transform: "rotateX(58deg) rotateY(0deg) rotateZ(38deg)",
    transformStyle: "preserve-3d",
    height: 1,
    left: "50%",
    top: "50%",
    width: 1,
  },
  edgeWrapper: (
    edgeLength: string,
    edgeRotateY: string,
    edgeRotateZ: string,
    edgeX: string,
    edgeY: string,
    edgeZ: string,
  ) => ({
    "--edge-length": edgeLength,
    "--edge-rotate-y": edgeRotateY,
    "--edge-rotate-z": edgeRotateZ,
    "--edge-x": edgeX,
    "--edge-y": edgeY,
    "--edge-z": edgeZ,
    display: "contents",
  }),
  edge: {
    backgroundColor: colorVars.primaryBlue,
    boxShadow:
      "0 0 8px rgba(115, 221, 255, .78), 0 0 18px rgba(36, 168, 255, .34)",
    display: "block",
    position: "absolute",
    transform:
      "translate3d(calc(var(--hypercube-radius) * var(--edge-x)), calc(var(--hypercube-radius) * var(--edge-y)), calc(var(--hypercube-radius) * var(--edge-z))) rotateZ(var(--edge-rotate-z)) rotateY(var(--edge-rotate-y))",
    transformOrigin: "0 50%",
    transformStyle: "preserve-3d",
    height: 2,
    left: 0,
    top: 0,
    width: "calc(var(--hypercube-radius) * var(--edge-length))",
  },
  root: {
    "--hypercube-radius": "min(20cqw, 20cqh)",
    containerType: "size",
    filter: "drop-shadow(0 0 18px rgba(36, 168, 255, .4))",
    opacity: 0.5,
    perspective: "620px",
    perspectiveOrigin: "50% 50%",
    position: "relative",
    transformStyle: "preserve-3d",
    height: "min(72dvh, 420px)",
    width: "min(92vw, 560px)",
  },
});
