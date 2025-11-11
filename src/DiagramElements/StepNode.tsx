import React, { memo } from "react";
import type IPFCElementInfo from "../dev/IPFCElementInfo";
import { Handle, Position } from '@xyflow/react';

const borderStepNodeSelected = '3px dashed #707070';

interface StepNodeProps {
  data: {
    element: IPFCElementInfo; 
    border: string;
    color: string;
    selectedStep: string;
    selectStep: (stepName: string) => void;
  };
  isConnectable: boolean;
}

const stepNodeStyle: React.CSSProperties = {
  fontSize: "16px",
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  justifyContent: "left"
};

const mainStepDetailsSectionStyle: React.CSSProperties = {
  padding: "1px",
  height: "70%",
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
};

const mainStepDetailsContentStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between"
};

const stateDetailsSectionStyle: React.CSSProperties = {
  padding: "1px",
  height: "30%",
  color: "white",
  backgroundColor: "#329543",
  textAlign: "center",
  alignContent: "center",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  justifyContent: "space-between"
};

const stepNameLabelStyle: React.CSSProperties = {
  textAlign: "left",
  paddingLeft: "3px",
  paddingTop: "3px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  width: "50px"
};

const modeLabelStyle: React.CSSProperties = {
  textAlign: "left",
  paddingLeft: "3px",
  paddingTop: "3px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  width: "50px"
};

const failIndexLabelStyle: React.CSSProperties = {
  textAlign: "right",
  paddingRight: "3px",
  paddingTop: "3px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  width: "50px"
};

const conditionLabelStyle: React.CSSProperties = {
  textAlign: "right",
  paddingRight: "3px",
  paddingTop: "3px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  width: "50px"
};

const StepNode = ({ data, isConnectable }: StepNodeProps) => {
  const fontFamily: string  = "";
  const fontSize: number = 10;
  const fontIsBold: boolean = false;
  const fontIsItalic: boolean = false;

  const configuredStepNodeStyle: React.CSSProperties = {
    ...stepNodeStyle,
    height: `${data.element.Height}px`,
    width: `${data.element.Width}px`,
    border: data.border,
    fontSize: fontSize,
    fontFamily: fontFamily,
    fontWeight: fontIsBold ? "bold" : "normal",
    fontStyle: fontIsItalic ? "italic" : "normal",
    color: data.color
  };

  const configuredStepNameLabelStyle: React.CSSProperties = {
    ...stepNameLabelStyle,
    width: `${(data.element.Width-8)*2/3}px`,
    height: `${((data.element.Height-8)/3)}px`
  };

  const configuredConditionLabelStyle: React.CSSProperties = {
    ...conditionLabelStyle,
    color: data.element.RRtFailIndex > 0 ? "red" : data.color,
    width: `${(data.element.Width-8)/2}px`,
    height: `${((data.element.Height-8)/3)}px`
  };

  const configuredModeLabelStyle: React.CSSProperties = {
    ...modeLabelStyle,
    color: data.color,
    width: `${(data.element.Width-8)/2}px`,
    height: `${((data.element.Height-8)/3)}px`
  };

  const configuredFailIndexLabelStyle: React.CSSProperties = {
    ...failIndexLabelStyle,
    color: data.color,
    width: `${(data.element.Width-8)/3}px`,
    height: `${((data.element.Height-8)/3)}px`
  };

  const configuredStateDetailsSectionStyle: React.CSSProperties = {
    ...stateDetailsSectionStyle,
    height: `${((data.element.Height-8)/3)}px`
  };

  return (
    <div className="pfc-diagram-step-node" style={configuredStepNodeStyle}>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
      {data.selectedStep === data.element.ElemName ?       
      <div style={{left: '-5px', top: '-5px', width: (data.element.Width + 7).toString() + 'px', height: (data.element.Height + 7).toString() + 'px', border: borderStepNodeSelected, fontSize:'16px', position: 'absolute' }} onClick={() => {data.selectStep(data.element.ElemName)}}>
      </div> 
      : <div></div>
      }
      <div className="main-step-details" style={mainStepDetailsSectionStyle}>
        <div className="main-step-details-first-layer" style={mainStepDetailsContentStyle}>
          <div style={configuredStepNameLabelStyle}>
            {data.element.ElemName}
          </div>
          <div style={configuredFailIndexLabelStyle}>
            {data.element.RRtFailIndex}
          </div>
        </div>
        <div className="main-step-details-righ-second-layer" style={mainStepDetailsContentStyle}>
          <div style={configuredModeLabelStyle}>
            {data.element.RRtMode}
          </div>
          <div style={configuredConditionLabelStyle}>
            {data.element.RRtFailIndex > 0 ? "FAILURE" : "CONDITION"}
          </div>
        </div>
      </div>
      <div className="state-details" style={configuredStateDetailsSectionStyle}>
        {data.element.RRtState}
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

export default memo(StepNode);