import React, { memo } from "react";
import TerminationIcon from "./TerminationIcon";
import { Handle, Position } from '@xyflow/react';
import type IPFCElementInfo from "../dev/IPFCElementInfo";

interface TerminationNodeProps {
  data: {
    element: IPFCElementInfo;
    size: string;
    color: string;
    transitionColor: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  isConnectable: boolean;
}

const terminationNodeStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
};

const terminationIconStyle: React.CSSProperties = {
  height: "20px",
};

const terminationTextStyle: React.CSSProperties = {
  position: "absolute",
  left: "20px",
  display: "inline-block",
  padding: "2px"
};

const TerminationNode = ({ data, isConnectable }: TerminationNodeProps) => {
  const fontFamily: string  =  "";
  const fontSize: number =  10;
  const fontIsBold: boolean = false;
  const fontIsItalic: boolean = false;

  const configuredTerminationTextStyle: React.CSSProperties = {
    ...terminationTextStyle,
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontWeight: fontIsBold ? "bold" : "normal",
    fontStyle: fontIsItalic ? "italic" : "normal",
    color: data.color
  };

  return (
    <div className="pfc-diagram-termination-node" style={terminationNodeStyle}>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
      <div style={terminationIconStyle}>
        <TerminationIcon color={data.transitionColor} size={data.size} />
      </div>
      <div style={configuredTerminationTextStyle}>
        {data.element.ElemName}
      </div>
    </div>
  );
};

export default memo(TerminationNode);