import {
  useStore,
  BaseEdge,
  type EdgeProps,
  type ReactFlowState,
} from "@xyflow/react";

export type GetSpecialPathParams = {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  offset?: number;
};

export const getOrthogonalPath = (
  { sourceX, sourceY, targetX, targetY, offset = 0 }: GetSpecialPathParams
) => {
  const midY = (sourceY + targetY) / 2;

  // Calculate perpendicular offset for parallel lines
  const dx = targetX - sourceX;
  const dy = targetY - sourceY;
  const length = Math.sqrt(dx * dx + dy * dy);
  
  // Perpendicular vector (normalized)
  const perpX = length > 0 ? (-dy / length) * offset : offset;
  const perpY = length > 0 ? (dx / length) * offset : 0;

  // Apply offset to all points
  const sX = sourceX + perpX;
  const sY = sourceY + perpY;
  const tX = targetX + perpX;
  const tY = targetY + perpY;
  const mY = midY + perpY;

  // Create an orthogonal path with right-angle turns, focusing on vertical movement first
  let path = `M ${sX} ${sY}`;
  path += ` L ${sX} ${mY}`;
  path += ` L ${tX} ${mY}`;
  path += ` L ${tX} ${tY}`;

  return path;
};

export default function CustomParallelEdge({
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  style,
}: EdgeProps) {
  const isBiDirectionEdge = useStore((s: ReactFlowState) => {
    const edgeExists = s.edges.some(
      (e) =>
        (e.source === target && e.target === source) ||
        (e.target === source && e.source === target),
    );

    return edgeExists;
  });

  const edgePathParams = {
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  };

  // Number of parallel lines and spacing
  const numLines = 2;
  const spacing = 5; // pixels between lines

  // Generate multiple parallel paths
  const paths = [];
  for (let i = 0; i < numLines; i++) {
    const offset = (i - (numLines - 1) / 2) * spacing;
    const path = getOrthogonalPath({ ...edgePathParams, offset });
    paths.push(path);
  }

  return (
    <g>
      {paths.map((path, index) => (
        <path
          key={index}
          d={path}
          fill="none"
          stroke={style?.stroke || "#707070"}
          strokeWidth={style?.strokeWidth || 1}
          markerEnd={index === Math.floor(numLines / 2) ? markerEnd : undefined}
        />
      ))}
    </g>
  );
}