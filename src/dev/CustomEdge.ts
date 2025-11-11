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
};

export const getOrthogonalPath = (
  { sourceX, sourceY, targetX, targetY }: GetSpecialPathParams
) => {
  const midY = (sourceY + targetY) / 2;

  // Create an orthogonal path with right-angle turns, focusing on vertical movement first
  let path = `M ${sourceX} ${sourceY}`;
  path += ` L ${sourceX} ${midY}`;
  path += ` L ${targetX} ${midY}`;
  path += ` L ${targetX} ${targetY}`;

  return path;
};

export default function CustomEdge({
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
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

  let path = "";

  if (isBiDirectionEdge) {
    path = getOrthogonalPath(edgePathParams);
  } else {
    path = getOrthogonalPath(edgePathParams);
  }

  return BaseEdge({ path, markerEnd });
}