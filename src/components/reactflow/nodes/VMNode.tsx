import { Handle, Position } from "reactflow";

//data to display
interface VMNodeProps {
  data: {
    label: string;
    utilization: {
      cpu: number;
      ram: number;
      bandwidth: number;
    };
  };
}

const VMNode = ({ data }: VMNodeProps) => {
  return (
    <div className="border-2 border-[#f6ad55] rounded-lg p-3 bg-white shadow-md">
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />

      <div className="text-center">
        <h4 className="font-semibold text-[#273f82]">{data.label}</h4>
        <div className="mt-1 text-xs">
          <div>CPU: {data.utilization.cpu.toFixed(2)}%</div>
          <div>RAM: {data.utilization.ram.toFixed(2)}%</div>
          <div className="text-green-500">{data.status}</div>
        </div>
      </div>
    </div>
  );
};

export default VMNode;
