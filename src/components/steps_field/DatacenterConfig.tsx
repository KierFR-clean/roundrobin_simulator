import { Input, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
//update step form
interface DatacenterConfigProps {
  onUpdate: (data: any) => void;
  initialData: {
    numHosts: number;
    numPesPerHost: number;
    peMips: number;
    ramPerHost: number;
    bwPerHost: number;
    storagePerHost: number;
  };
}

const DatacenterConfig = ({ onUpdate, initialData }: DatacenterConfigProps) => {
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
    <form className="mt-8 mb-8 2-80 max-w-screen-lg sm:w-96 p-2">
      <div className="h-[400px] mb-1 flex flex-col gap-6 bg-amber-50 rounded-sm p-5 border-2 border-[#3b3f3f] overflow-y-auto">
        <Typography className=" text-left text-[#f8c17f] text-sm font-bold">
          {" "}
          Number of Hosts
        </Typography>
        <Input
          type="number"
          size="lg"
          name="numHosts"
          value={config.numHosts}
          onChange={handleChange}
          placeholder="Number of Hosts (e.g. 4)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />
        <Typography className=" text-left text-[#f8c17f] text-sm font-bold">
          {" "}
          PEs per Host
        </Typography>
        <Input
          type="number"
          size="lg"
          name="numPesPerHost"
          value={config.numPesPerHost}
          onChange={handleChange}
          placeholder="PEs per Host (e.g. 8)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />
        <Typography className=" text-left text-[#f8c17f] text-sm font-bold">
          {" "}
          MIPS per PE
        </Typography>
        <Input
          type="number"
          size="lg"
          name="peMips"
          value={config.peMips}
          onChange={handleChange}
          placeholder="MIPS per PE (e.g. 1000)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />
        <Typography className=" text-left text-[#f8c17f] text-sm font-bold">
          {" "}
          RAM per Host
        </Typography>
        <Input
          type="number"
          size="lg"
          name="ramPerHost"
          value={config.ramPerHost}
          onChange={handleChange}
          placeholder="RAM per Host (MB) (e.g. 16384)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />
        <Typography className=" text-left text-[#f8c17f] text-sm font-bold">
          {" "}
          Bandwidth per Host
        </Typography>
        <Input
          type="number"
          size="lg"
          name="bwPerHost"
          value={config.bwPerHost}
          onChange={handleChange}
          placeholder="Bandwidth per Host (Mbps) (e.g. 10000)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />
        <Typography className=" text-left text-[#f8c17f] text-sm font-bold">
          {" "}
          Storage per Host
        </Typography>
        <Input
          type="number"
          size="lg"
          name="storagePerHost"
          value={config.storagePerHost}
          onChange={handleChange}
          placeholder="Storage per Host (MB) (e.g. 1000000)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />
      </div>
    </form>
  );
};
export default DatacenterConfig;
