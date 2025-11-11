import React from 'react';
import {
  ReactFlow,
  Background,
  MiniMap,
  Position,
  Handle
} from '@xyflow/react';
import type { Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface CustomNodeData {
  label: string;
  status?: string;
  statusColor?: string;
  badge?: string;
}

// Custom node component
const CustomNode = ({ data }: { data: CustomNodeData }) => {
  return (
    <div style={{
      background: 'white',
      border: '2px solid #ddd',
      borderRadius: '4px',
      padding: '0',
      width: '180px',
      height: '80px',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '8px',
        background: data.statusColor || '#6c757d',
        borderTopLeftRadius: '4px',
        borderBottomLeftRadius: '4px',
      }} />
      <div style={{
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '4px',
      }}>
        {data.label}
      </div>
      {data.status && (
        <div style={{
          fontSize: '12px',
          color: data.statusColor,
          marginBottom: '2px',
        }}>
          {data.status === 'FAILURE' ? '✗ FAILURE' : data.status}
        </div>
      )}
      <div style={{
        fontSize: '11px',
        color: '#999',
      }}>
        O-AUTO
      </div>
      {data.badge && (
        <div style={{
          position: 'absolute',
          right: '10px',
          top: '15px',
          fontSize: '12px',
          color: '#666',
        }}>
          {data.badge}
        </div>
      )}
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const ProcessFlowDiagram: React.FC = () => {
  const nodes: Node[] = [
    {
      id: 'uptank',
      type: 'custom',
      position: { x: 225, y: 20 },
      data: { label: 'UPTANK', status: 'COMPLETE', statusColor: '#28a745', badge: '1' },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      style: { width: 180, height: 80 },
    },
    {
      id: 'pvessel',
      type: 'custom',
      position: { x: 120, y: 160 },
      data: { label: 'PVESSEL', status: 'FAILURE', statusColor: '#dc3545', badge: '1' },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      style: { width: 180, height: 80 },
    },
    {
      id: 'pmixer11',
      type: 'custom',
      position: { x: 340, y: 160 },
      data: { label: 'P_MIXER_11', status: 'RUNNING', statusColor: '#28a745', badge: '1' },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      style: { width: 180, height: 80 },
    },
    {
      id: 'lowtank',
      type: 'custom',
      position: { x: 225, y: 290 },
      data: { label: 'LOW_TANK', statusColor: '#6c757d', badge: '1' },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      style: { width: 180, height: 80 },
    },
    {
      id: 'agitator',
      type: 'custom',
      position: { x: 120, y: 450 },
      data: { label: 'AGITATOR', statusColor: '#6c757d', badge: '1' },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      style: { width: 180, height: 80 },
    },
    {
      id: 'pmixer44',
      type: 'custom',
      position: { x: 340, y: 450 },
      data: { label: 'P_MIXER_44', statusColor: '#6c757d', badge: '1' },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      style: { width: 180, height: 80 },
    },
  ];

  const edges: Edge[] = [
    {
      id: 'e1',
      source: 'uptank',
      target: 'pvessel',
      type: 'smoothstep',
      animated: false,
      style: { stroke: '#000000ff', strokeWidth: 2 },
      markerEnd: { type: 'arrowclosed', color: '#999' },
    },
    {
      id: 'e2',
      source: 'uptank',
      target: 'pmixer11',
      type: 'smoothstep',
      animated: false,
      style: { stroke: '#000000ff', strokeWidth: 2 },
      markerEnd: { type: 'arrowclosed', color: '#999' },
    },
    {
      id: 'e3',
      source: 'pvessel',
      target: 'lowtank',
      type: 'smoothstep',
      animated: false,
      style: { stroke: '#000000ff', strokeWidth: 2 },
      markerEnd: { type: 'arrowclosed', color: '#999' },
    },
    {
      id: 'e4',
      source: 'pmixer11',
      target: 'lowtank',
      type: 'smoothstep',
      animated: false,
      style: { stroke: '#000000ff', strokeWidth: 2 },
      markerEnd: { type: 'arrowclosed', color: '#999' },
    },
    {
      id: 'e5',
      source: 'lowtank',
      target: 'agitator',
      type: 'smoothstep',
      animated: false,
      style: { stroke: '#000000ff', strokeWidth: 2 },
      markerEnd: { type: 'arrowclosed', color: '#999' },
    },
    {
      id: 'e6',
      source: 'lowtank',
      target: 'pmixer44',
      type: 'smoothstep',
      animated: false,
      style: { stroke: '#000000ff', strokeWidth: 2 },
      markerEnd: { type: 'arrowclosed', color: '#999' },
    },
  ];

  return (
    <div style={{ width: '1920px', height: '1080px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
        >
          <Background bgColor="#ffffffff" />
          <MiniMap />
        </ReactFlow>
    </div>
  );
};

export default ProcessFlowDiagram;