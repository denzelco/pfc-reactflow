import React from "react";
import { ReactFlow, Background, useReactFlow } from '@xyflow/react';
import type { Edge, Node, NodeMouseHandler } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import CustomEdge from "./dev/CustomEdge";
import SLVItem from "./dev/SLVItem";
import type IPFCElementInfo from "./dev/IPFCElementInfo";
import type IPFCRecipe from "./dev/IPFCRecipe";

import { BatchService } from "./dev/BatchService";
import StartNode from "./DiagramElements/StartNode";
import StepNode from "./DiagramElements/StepNode";
import StatusCard from "./components/StatusCard";
import TransitionNode from "./DiagramElements/TransitionNode";
import TerminationNode from "./DiagramElements/TerminationNode";
import ParallelNode from "./DiagramElements/ParallelNode";
import { usePFCContext } from "./dev/PFCContextProvider";

const colorDiagramBackground = "#f3f3f3";
// const startNodeBorder = "3px solid #707070";
const stepNodeBorder = "1px solid #c0c0c0";
// const parallelNodeBorder = "1px solid #707070";
// const edgeBorder = "1px solid #707070";
const transitionColor = "#707070";


const BuildDiagramNodes = ( openedElement: SLVItem | null, selectStep: (step: string) => void, selectedStep: string | null): Node[] => {
    const nodes: Node[] = [];

    if (!openedElement) {
        return nodes; // Return empty array if recipe not found
    }

    openedElement?.Recipe?.Elements.forEach((element) => {
        let nodeType = "";
        switch (element.Type) {
            case "InitialStep":
                nodeType = "startNode";
                break;
            case "RegularStep":
            case "PhaseStep":
                nodeType = "stepNode";
                break;
            case "Transition":
                nodeType = "transitionNode";
                break;
            default:
                return; // Skip unknown types
        }
        if (nodeType === "stepNode" || nodeType === "startNode")
        {
            nodes.push({
                id: element.ID.toString(),
                type: nodeType,
                data: { 
                    width: 55, 
                    height: 120, 
                    stepName: element.ElemName,
                    state: "STATE",
                    mode: "MODE",
                    failIndex: 0,
                    border: stepNodeBorder,
                    color: "#000000",
                    elementId: element.ID, 
                    label: element.ElemName, 
                    selectStep: selectStep, 
                    selectedStep: selectedStep, 
                    element: element, 
                    recipe: openedElement?.Recipe 
                },
                position: { x: element.XPosition, y: element.YPosition }
            });
        }
        else if (nodeType === "transitionNode")
        {
            nodes.push({
                id: element.ID.toString(),
                type: nodeType,
                data: { 
                    terminationName: element.ElemName,
                    size: "20px",
                    color: "#000000",
                    transitionColor: transitionColor,
                    terminationColor: transitionColor,
                    elementId: element.ID, 
                    label: element.ElemName, 
                    selectStep: selectStep, 
                    selectedStep: selectedStep, 
                    element: element, 
                    recipe: openedElement?.Recipe 
                },
                position: { x: element.XPosition, y: element.YPosition }
            });
        }
        else
        {
            nodes.push({
                id: element.ID.toString(),
                type: nodeType,
                data: { elementId: element.ID, label: element.ElemName, selectStep: selectStep, selectedStep: selectedStep, element: element, recipe: openedElement?.Recipe },
                position: { x: element.XPosition, y: element.YPosition }
            });
        }
    });

    return nodes;
};

let rootNode: SLVItem | null = null;
const BuildSLVTree = (recipeId: string): void => {
    const rootRecipe = BatchService.getRecipeById(recipeId);

    if (!rootRecipe) {
        return;
    }

    rootNode = CreateSLV(0, rootRecipe, null);
};

const CreateSLV = (id: number, recipe: IPFCRecipe | null | undefined, parent: SLVItem | null): SLVItem => {
    const slvItem = new SLVItem(id, recipe, parent);

    if (recipe)
    {
        recipe.Elements.forEach((element) => {
            switch(element.Type)
            {
                case "InitialStep":
                case "Transition":
                case "PhaseStep":
                    slvItem.AddChild(CreateSLV(element.ID, null, slvItem));
                    break;
                case "RegularStep":
                    const recipeName = element.ElemName.split(":")[0];
                    const childRecipe = BatchService.getRecipeById(recipeName);
                    slvItem.AddChild(CreateSLV(element.ID, childRecipe, slvItem));
                    break;
            }
        });
    }
    return slvItem;
};

const BuildDiagramEdges = (openedElement: SLVItem | null): Edge[] => {
    const edges: Edge[] = [];

    if (!openedElement) {
        return edges;
    }

    openedElement?.Recipe?.Elements.forEach((element) => {
        if (element.Type === "Link") {
            edges.push({
                id: "e" + element.PrevID.toString() + "-" + element.NextID.toString(),
                source: element.PrevID.toString(),
                target: element.NextID.toString(),
                type: "customEdge",
                selectable: false
            });
        }
    });

    return edges;
};

const PFCDiagramComponent = () => {
    const {
        selectedRecipe,
        // collapsedLeftPane,
        // collapsedBottomPane,
        // collapsedRightPane
     } = usePFCContext();

     BatchService.initialize();

    const [disabled] = React.useState(true);

    const [selectedStep, selectStep] = React.useState<string | null>(null);
    const [openedElement, openElement] = React.useState<SLVItem | null>(null);
    
    const proOptions = { hideAttribution: true };

    const nodeTypes = {
        stepNode: StatusCard,
        transitionNode: TransitionNode,
        terminationNode: TerminationNode,
        startNode: StartNode,
        parallelNode: ParallelNode
      };

      const edgeTypes = {
        customEdge: CustomEdge
      };
     
    let initialNodes: Node[] = BuildDiagramNodes(openedElement, selectStep, selectedStep);
    let initialEdges: Edge[] = BuildDiagramEdges(openedElement);

    // const [isFirstEffectDone, setIsFirstEffectDone] = React.useState(false);

    const topDown = true;

    React.useEffect(() => {
        BuildSLVTree(selectedRecipe);

        if(topDown) {
            openElement(rootNode);
        }
        else {                
            openElement(rootNode?.GetDeepestActiveChild() as SLVItem);
        }
    }, [selectedRecipe]);

    const drillDown: NodeMouseHandler = (event, node) => {
        console.log(event);
        const nodeId = node.data.elementId as number;
        const pfcRecipe = node.data.recipe as IPFCRecipe;
        const pfcElement = node.data.element as IPFCElementInfo;
        if (pfcElement.Type === "RegularStep") {
            const child = openedElement?.GetChild(nodeId);
            if (child)
                openElement(child);
        }
        else if (pfcElement.Type === "InitialStep" && pfcRecipe.Type !== "Procedure") {
            const parent = openedElement?.Parent;
            if (parent)
                openElement(parent);
        }
    };

    return (
        <div style={{height: "800px", width: "800px", marginTop: "25px"}}>
            <ReactFlow nodes={initialNodes} edges={initialEdges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                edgesReconnectable={!disabled}
                edgesFocusable={!disabled}
                nodesDraggable={!disabled}
                nodesConnectable={!disabled}
                nodesFocusable={!disabled}
                draggable={!disabled}
                panOnDrag={true}
                proOptions={proOptions}
                zoomOnDoubleClick={false}
                onNodeDoubleClick={drillDown}
                maxZoom={10}>
                <Background color={colorDiagramBackground} gap={16} />
            </ReactFlow>
        </div>
    );
};

export default PFCDiagramComponent;