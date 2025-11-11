import React, { memo } from "react";
import TransitionIcon from "./TransitionIcon";
import { Handle, Position } from '@xyflow/react';
import type IPFCElementInfo from "../dev/IPFCElementInfo";

interface TransitionNodeProps {
  data: {
    element: IPFCElementInfo;
    size: string;
    color: string;
    transitionColor: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  isConnectable: boolean;
}

const transitionNodeStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
};

const transitionIconStyle: React.CSSProperties = {
  height: "20px",
};

const transitionTextStyle: React.CSSProperties = {
  position: "absolute",
  left: "20px",
  display: "inline-block",
  padding: "2px",
};

const TransitionNode = ({ data, isConnectable }: TransitionNodeProps) => {
  const fontFamily: string  = "";
  const fontSize: number = 10;
  const fontIsBold: boolean = false;
  const fontIsItalic: boolean = false;
    
  const configuredTransitionTextStyle: React.CSSProperties = {
    ...transitionTextStyle,
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontWeight: fontIsBold ? "bold" : "normal",
    fontStyle: fontIsItalic ? "italic" : "normal",
    color: data.color
  };

  return (
    <div className="pfc-diagram-transition-node" style={transitionNodeStyle}>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
      <div style={transitionIconStyle}>
        <TransitionIcon color={data.transitionColor} size={data.size} />
      </div>
      <div style={configuredTransitionTextStyle}>
        {data.element.ElemName}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(TransitionNode);