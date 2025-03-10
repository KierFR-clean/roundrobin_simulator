import { Input, Typography } from "@material-tailwind/react";

const CloudletConfig = () => {
  return (
    <form className="mt-8 mb-8 2-80 max-w-screen-lg sm:w-96 p-2">
      <div className="mb-1 flex flex-col gap-6 bg-amber-50 rounded-sm p-3 border-2 border-[#3b3f3f]">
        <Input
          type="number"
          size="lg"
          placeholder="Number of Cloudlets (e.g. 8)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />

        <Input
          type="number"
          size="lg"
          placeholder="Cloudlets Length (MI) (e.g. 10000)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />
        <Input
          type="number"
          size="lg"
          placeholder="PEs Required per Cloudlet (e.g. 1)"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
        />
        <select
          className=" text-center p-3 border-4 cursor-pointer border-[#1175c6] rounded-full text-sm  shadow-lg font-bold bg-white text-blue-950 w-fit"
          defaultValue=""
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
