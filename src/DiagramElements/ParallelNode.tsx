import React, { memo } from "react";
import { Handle, Position } from '@xyflow/react';

interface ParallelNodeProps {
  data: {
    border: string;
    selectStep: (stepName: string) => void;
  }
  isConnectable: boolean;
}

const parallelLineStyle: React.CSSProperties = {
  width: "300px",
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  justifyContent: "left"
};

const ParallelNode = ({ data, isConnectable }: ParallelNodeProps) => {
  const upperParallelLineStyle: React.CSSProperties = {
    ...parallelLineStyle,
    border: data.border,
    marginBottom: "1.5px"
  };

  const lowerParallelLineStyle: React.CSSProperties = {
    ...parallelLineStyle,
    border: data.border
  };

  return (
    <div className="pfc-diagram-parallel-node">
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
      <div style={upperParallelLineStyle} />
      <div style={lowerParallelLineStyle} />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#555', left: '75%' }}
        id="source2"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(ParallelNode);