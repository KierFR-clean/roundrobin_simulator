import { NodeResizer } from "@reactflow/node-resizer";
import { Handle, Position } from "reactflow";

interface DatacenterNodeProps {
  data: {
    label: string;
    utilization?: {
      cpu?: number;
      ram?: number;
      bandwidth?: number;
    };
  };
}

const DatacenterNode = ({ data }: DatacenterNodeProps) => {
  const cpu = data?.utilization?.cpu ?? 0;
  const ram = data?.utilization?.ram ?? 0;
  const bandwidth = data?.utilization?.bandwidth ?? 0;

  return (
    <div className="border-2 border-[#1175c6] rounded-lg p-4 bg-white shadow-lg min-w-[200px]">
      <NodeResizer minWidth={200} minHeight={100} />
      <Handle type="source" position={Position.Bottom} />
      <div className="text-center">
        <h3 className="text-lg font-bold text-[#273f82]">{data.label}</h3>
        <div className="mt-2 text-sm">
          <div>CPU: {cpu.toFixed(2)}%</div>
          <div>RAM: {ram.toFixed(2)}%</div>
          <div>BW: {bandwidth.toFixed(2)}%</div>
        </div>
      </div>
    </div>
  );
};

export default DatacenterNode;
