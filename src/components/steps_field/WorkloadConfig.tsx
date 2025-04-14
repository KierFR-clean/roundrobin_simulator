import { useState, useEffect } from "react";

interface WorkloadConfigProps {
  onUpdate: (data: any) => void;
  initialData: {
    workloadType: string;
  };
}
const WorkloadConfig = ({ onUpdate, initialData }: WorkloadConfigProps) => {
  const [config, setConfig] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setConfig((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    onUpdate(config);
  }, [config]);

  useEffect(() => {
    setConfig(initialData);
  }, [initialData]);

  return (
    <form className="mt-8 mb-8 2-80 max-w-screen-lg sm:w-96 p-2">
      <div className="mb-1 flex flex-col gap-6 bg-amber-50 rounded-sm p-5 overflow-y-auto border-2 border-[#3b3f3f]">
        <select
          defaultValue=""
          name="workloadType"
          value={config.workloadType}
          onChange={handleChange}
          className="text-center p-3 border-4 cursor-pointer border-[#1175c6] rounded-full text-sm shadow-lg font-bold bg-white text-blue-950 w-fit"
        >
          <option value="" disabled>
            Select Workload Type
          </option>
          <option value="Even">Even Distribution</option>
          <option value="Uneven">Uneven Distribution</option>
        </select>
      </div>
    </form>
  );
};
export default WorkloadConfig;
