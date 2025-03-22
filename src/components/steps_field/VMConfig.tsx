import { Input, Select, Option, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";

interface VMConfigProps {
  onUpdate: (data: any) => void;
  initialData: {
    numVms: number;
    vmMips: number;
    vmPes: number;
    vmRam: number;
    vmBw: number;
    vmSize: number;
    vmScheduler: string;
  };
}

const VMConfig = ({ onUpdate, initialData }: VMConfigProps) => {
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

  //another useeffect to update the fields
  useEffect(() => {
    setConfig(initialData);
  }, [initialData]);

  return (
    <form className="w-full mt-8 mb-8 2-80 max-w-screen-lg sm:w-96 p-2">
      <div className=" h-[400px] mb-1 flex flex-col gap-6 bg-amber-50 rounded-sm p-5 overflow-y-auto border-2 border-[#3b3f3f]">
        <Typography className=" text-left text-[#f8c17f] text-sm font-bold">
          {" "}
          Number of VMs
        </Typography>
        <Input
          type="number"
          size="lg"
          name="numVms"
          value={config.numVms}
          onChange={handleChange}
          placeholder="Number of VMs (e.g. 4)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />
        <Typography className=" text-left text-[#f8c17f] text-sm font-bold">
          {" "}
          MIPS per VM
        </Typography>

        <Input
          type="number"
          size="lg"
          name="vmMips"
          value={config.vmMips}
          onChange={handleChange}
          placeholder="MIPS per VM (e.g. 1000)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />
        <Typography className=" text-left text-[#f8c17f] text-sm font-bold">
          {" "}
          Number of PEs per VM
        </Typography>
        <Input
          type="number"
          size="lg"
          name="vmPes"
          value={config.vmPes}
          onChange={handleChange}
          placeholder="Number of PEs per VM (e.g. 2)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />
        <Typography className=" text-left text-[#f8c17f] text-sm font-bold">
          {" "}
          RAM per VM (MB)
        </Typography>
        <Input
          type="number"
          size="lg"
          name="vmRam"
          value={config.vmRam}
          onChange={handleChange}
          placeholder="RAM per VM (MB) (e.g. 2048)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />
        <Typography className=" text-left text-[#f8c17f] text-sm font-bold">
          {" "}
          Bandwidth per VM (Mbps)
        </Typography>
        <Input
          type="number"
          size="lg"
          name="vmBw"
          value={config.vmBw}
          onChange={handleChange}
          placeholder="Bandwidth per VM (Mbps) (e.g. 1000)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />
        <Typography className=" text-left text-[#f8c17f] text-sm font-bold">
          {" "}
          Storage per VM (MB)
        </Typography>
        <Input
          type="number"
          size="lg"
          name="vmSize"
          value={config.vmSize}
          onChange={handleChange}
          placeholder="Storage per VM (MB) (e.g. 10000)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />

        <select
          className=" text-center p-3 border-4 border-[#1175c6] rounded-full text-sm  shadow-lg font-bold bg-white text-blue-950 w-fit cursor-pointer"
          defaultValue=""
          name="vmScheduler"
          value={config.vmScheduler}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select VM Scheduling Policy
          </option>
          <option value="TimeShared">Time Shared</option>
          <option value="SpaceShared">Space Shared</option>
        </select>
      </div>
    </form>
  );
};
export default VMConfig;
