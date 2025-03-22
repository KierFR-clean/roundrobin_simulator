import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "reactflow";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import "reactflow/dist/style.css";

import DCNode from "../reactflow/nodes/DatacenterNode";
import VMNode from "../reactflow/nodes/VMNode";
import ClNode from "../reactflow/nodes/CloudletNode";
import { generateLayout } from "../../utils/flowHelpers";

import { Button, Switch, Typography } from "@material-tailwind/react";

const nodeTypes = {
  datacenter: DCNode,
  vm: VMNode,
  cloudlet: ClNode,
};

//vis by two exect types
interface DatacenterVisualizationProps {
  simulationData: any;
  workloadType: "Even" | "Uneven";
  onWorkloadToggle: () => void;
}

const DCVis = ({
  simulationData,
  workloadType,
  onWorkloadToggle,
}: DatacenterVisualizationProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    console.log("Simulation Data:", simulationData);
  }, [simulationData]);

  useEffect(() => {
    if (simulationData) {
      const { nodes: layoutNodes, edges: layoutEdges } = generateLayout(
        simulationData,
        workloadType
      );
      setNodes(layoutNodes);
      setEdges(layoutEdges);
    }
  }, [simulationData, workloadType]);

  const onInit = useCallback(() => {}, []);

  return (
    <div className="h-[400px] w-full border-2 border-[#319795] rounded-lg">
      <div className="p-2 flex justify-between items-center bg-gray-50">
        <Typography variant="h6" color="blue-gray">
          <span className="marked">Datacenter Visualization</span>
        </Typography>
        <div onClick={onWorkloadToggle} className="cursor-pointer">
          {workloadType === "Uneven" ? (
            <FaToggleOn size={24} className="text-blue-500" />
          ) : (
            <FaToggleOff size={24} className="text-gray-400" />
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="marked text-sm">Even</span>

          <span className="marked text-sm">Uneven</span>
        </div>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onInit={onInit}
        fitView // can't fit to much larger
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
export default DCVis;
