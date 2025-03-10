import { Input, Typography } from "@material-tailwind/react";

const WorkloadConfig = () => {
  return (
    <form className="mt-8 mb-8 2-80 max-w-screen-lg sm:w-96 p-2">
      <div className="mb-1 flex flex-col gap-6 bg-amber-50 rounded-sm p-3 border-2 border-[#3b3f3f]">
        <select
          className=" text-center p-3 border-4 cursor-pointer border-[#1175c6] rounded-full text-sm  shadow-lg font-bold bg-white text-blue-950 w-fit"
          defaultValue=""
        >
          <option value="" disabled>
            Select Workload Type
          </option>
          <option value="Even Distribution">Even Distribution</option>
          <option value="Uneven Distribution">Uneven Distribution</option>
        </select>
      </div>
    </form>
  );
};
export default WorkloadConfig;
