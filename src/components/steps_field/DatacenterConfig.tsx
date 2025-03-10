import { Input, Typography } from "@material-tailwind/react";

const DatacenterConfig = () => {
  return (
    <form className="mt-8 mb-8 2-80 max-w-screen-lg sm:w-96 p-2">
      <div className="mb-1 flex flex-col gap-6 bg-amber-50 rounded-sm p-3 border-2 border-[#3b3f3f]">
        <Input
          type="number"
          size="lg"
          placeholder="Number of Hosts (e.g. 4)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />

        <Input
          type="number"
          size="lg"
          placeholder="PEs per Host (e.g. 8)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />
        <Input
          type="number"
          size="lg"
          placeholder="MIPS per PE (e.g. 1000)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />
        <Input
          type="number"
          size="lg"
          placeholder="RAM per Host (MB) (e.g. 16384)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />
        <Input
          type="number"
          size="lg"
          placeholder="Bandwidth per Host (Mbps) (e.g. 10000)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />
        <Input
          type="number"
          size="lg"
          placeholder="Storage per Host (MB) (e.g. 1000000)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />
      </div>
    </form>
  );
};
export default DatacenterConfig;
