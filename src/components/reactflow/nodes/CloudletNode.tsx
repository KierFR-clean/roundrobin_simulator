import { Handle, Position } from "reactflow";

interface CloudletNodeProps {
  data: {
    label: string;
    executionTime: number;
    status: string;
  };
}

const CloudletNode = ({ data }: CloudletNodeProps) => {
  return (
    <div className="border-2 border-[#319795] rounded-lg p-2 bg-white shadow-sm min-w-[120px]">
      <Handle type="target" position={Position.Top} />

      <div className="text-center">
        <h5 className="text-sm font-medium text-[#273f82]">{data.label}</h5>
        <div className="text-xs">
          <div>Time: {data.executionTime.toFixed(2)}s</div>
          <div
            className={`font-medium ${
              data.status === "SUCCESS" ? "text-green-500" : "text-red-500"
            }`}
          >
            {data.status}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloudletNode;
