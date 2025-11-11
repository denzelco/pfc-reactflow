import React, { memo } from "react";
import type IPFCElementInfo from "../dev/IPFCElementInfo";
import { Handle, Position } from '@xyflow/react';

interface StatusCardProps {
  title: string;
  status: string;
  mode: string;
  badge?: string;
  statusColor?: string;

  
  data: {
    element: IPFCElementInfo; 
    border: string;
    color: string;
    selectedStep: string;
    selectStep: (stepName: string) => void;
  };
  isConnectable: boolean;
}

const StatusCard = ({ 
  data,
  isConnectable
}: StatusCardProps) => {
  const containerStyle: React.CSSProperties = {
    background: 'white',
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: '180px',
    height: '60px',
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '8px 12px',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  };

  const leftBarStyle: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '6px',
    background: "green",
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
  };

  const statusStyle: React.CSSProperties = {
    fontSize: '12px',
    color: "green",
    fontWeight: '500',
  };

  const modeStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#999',
  };

  const badgeStyle: React.CSSProperties = {
    position: 'absolute',
    right: '12px',
    top: '12px',
    fontSize: '12px',
    color: '#666',
  };

  return (
    <div className="pfc-diagram-step-node"style={containerStyle}>
        <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555' }}
        isConnectable={isConnectable}
        />
      {/* Left status bar */}
      <div style={leftBarStyle} />
      
      {/* Title */}
      <div style={titleStyle}>
            {data.element.ElemName}</div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <div style={statusStyle}>{data.element.RRtState.toUpperCase()}</div>
        <div style={modeStyle}>
            {data.element.RRtFailIndex > 0 ? "FAILURE" : "CONDITION"}</div>
      </div>
      
      {/* Badge */}
      <div style={badgeStyle}>1</div>
       <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#555' }}
        isConnectable={isConnectable}
    />
    </div>
  );
};

export default StatusCard;
