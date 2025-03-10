import { Input, Select, Option, Typography } from "@material-tailwind/react";

const VMConfig = () => {
  return (
    <form className="mt-8 mb-8 2-80 max-w-screen-lg sm:w-96 p-2">
      <div className="mb-1 flex flex-col gap-6 bg-amber-50 rounded-sm p-3 border-2 border-[#3b3f3f]">
        <Input
          type="number"
          size="lg"
          placeholder="Number of VMs (e.g. 4)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />

        <Input
          type="number"
          size="lg"
          placeholder="MIPS per VM (e.g. 1000)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />
        <Input
          type="number"
          size="lg"
          placeholder="Number of PEs per VM (e.g. 2)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />
        <Input
          type="number"
          size="lg"
          placeholder="RAM per VM (MB) (e.g. 2048)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />
        <Input
          type="number"
          size="lg"
          placeholder="Bandwidth per VM (Mbps) (e.g. 1000)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />
        <Input
          type="number"
          size="lg"
          placeholder="Storage per VM (MB) (e.g. 10000)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />

        <select
          className=" text-center p-3 border-4 border-[#1175c6] rounded-full text-sm  shadow-lg font-bold bg-white text-blue-950 w-fit cursor-pointer"
          defaultValue=""
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
