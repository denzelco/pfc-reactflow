import React, { memo } from "react";
import { Handle, Position } from '@xyflow/react';
import type IPFCElementInfo from "../dev/IPFCElementInfo";

interface StartNodeProps {
  data: {
    element: IPFCElementInfo;
    border: string;
    label: string;
    selectStep: (stepName: string) => void;
  };
  isConnectable: boolean;
}

const startNodeStyle: React.CSSProperties = {
  width: "115px",
  height: "50px",
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  justifyContent: "left"
};

const StartNode = ({ data, isConnectable }: StartNodeProps) => {
  const configuredStartNodeStyle: React.CSSProperties = {
    ...startNodeStyle,
    height: `${data.element.Height}px`,
    width: `${data.element.Width}px`,
    border: data.border
  };

  return (
    <>
      <div className="pfc-diagram-start-node" style={configuredStartNodeStyle} onClick={() => data.selectStep(data.element.ElemName)} />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
    </>
  );
};

export default memo(StartNode);