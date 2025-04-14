import { Input, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
interface CloudletConfigProps {
  onUpdate: (data: any) => void;
  initialData: {
    numCloudlets: number;
    cloudletLength: number;
    cloudletPes: number;
    cloudletExecType: string;
  };
}

const CloudletConfig = ({ onUpdate, initialData }: CloudletConfigProps) => {
  const [config, setConfig] = useState(initialData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
    <form className="mt-8 mb-8 2-80 max-w-screen-lg sm:w-96 h-[400px] w-full  p-2">
      <div className="h-[400px] mb-1 flex flex-col gap-6 bg-amber-50 rounded-sm p-5 overflow-y-auto border-2 border-[#3b3f3f]">
        <Typography className=" text-left text-[#f8c17f] text-sm font-bold">
          {" "}
          Number of Cloudlets
        </Typography>
        <Input
          type="number"
          size="lg"
          min={1}
          name="numCloudlets"
          value={config.numCloudlets}
          onChange={handleChange}
          placeholder="Number of Cloudlets (e.g. 8)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />
        <Typography className=" text-left text-[#f8c17f] text-sm font-bold">
          {" "}
          Cloudlets Length (MI)
        </Typography>

        <Input
          type="number"
          size="lg"
          name="cloudletLength"
          value={config.cloudletLength}
          onChange={handleChange}
          placeholder="Cloudlets Length (MI) (e.g. 10000)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />
        <Typography className=" text-left text-[#f8c17f] text-sm font-bold">
          {" "}
          PEs Required per Cloudlet
        </Typography>
        <Input
          type="number"
          size="lg"
          name="cloudletPes"
          value={config.cloudletPes}
          onChange={handleChange}
          placeholder="PEs Required per Cloudlet (e.g. 1)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />
        <select
          className=" text-center p-3 border-4 cursor-pointer border-[#1175c6] rounded-full text-sm  shadow-lg font-bold bg-white text-blue-950 w-fit"
          defaultValue=""
          name="cloudletExecType"
          value={config.cloudletExecType}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select Execution Type
          </option>
          <option value="Fixed">Fixed</option>
          <option value="Random">Random</option>
        </select>
      </div>
    </form>
  );
};
export default CloudletConfig;
