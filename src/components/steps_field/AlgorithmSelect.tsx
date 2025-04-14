import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import Button from "../Button";

interface AlgorithmSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const AlgorithmSelect = ({ value, onChange }: AlgorithmSelectProps) => {
  const [activeTab, setActiveTab] = useState<"algorithm" | "upload">(
    "algorithm"
  );
  // const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setUploadedFile(file);
  //     console.log("Uploaded workload logs file:", file.name);
  //     // Here you can add logic to process the uploaded workload logs file,
  //     // e.g., parse it and update the simulation or log data
  //   }
  // };

  return (
    <div>
      {/* Tab Navigation */}
      <div className=" py-5 flex border-b-2 border-[#3b3f3f] mb-4">
        <Button
          onClick={() => setActiveTab("algorithm")}
          className={`py-2 px-4 text-base font-semibold ${
            activeTab === "algorithm"
              ? "text-[#f6b05c] border-b-4 border-[#f6b05c]"
              : "text-gray-500"
          }`}
        >
          Algorithm
        </Button>
        <Button
          onClick={() => setActiveTab("upload")}
          className={`py-2 px-4 text-base font-semibold ${
            activeTab === "upload"
              ? "text-[#f6b05c] border-b-4 border-[#f6b05c]"
              : "text-gray-500"
          }`}
        >
          Upload
        </Button>
      </div>

      {/* Tab Content */}
      {activeTab === "algorithm" && (
        <div>
          <label
            htmlFor="algorithm"
            className="py-3 block text-base font-semibold text-[#f6b05c]"
          >
            Load Balancing Algorithm
          </label>
          <form className="mt-8 mb-8 2-80 max-w-screen-lg sm:w-96 p-2">
            <div className="mb-1 flex flex-col gap-6 bg-amber-50 rounded-sm p-5 overflow-y-auto border-2 border-[#3b3f3f]">
              <select
                id="algorithm"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="text-center p-3 border-4 cursor-pointer border-[#1175c6] rounded-full text-sm shadow-lg font-bold bg-white text-blue-950 w-fit"
              >
                <option value="round-robin">Round Robin</option>
                <option value="pso" disabled>
                  Particle Swarm Optimization
                </option>
              </select>
              <Typography variant="small" className="text-gray-500 mt-2">
                Currently, only Round Robin algorithm is available
              </Typography>
            </div>
          </form>
        </div>
      )}

      {activeTab === "upload" && (
        <div>
          <label className="py-3 block text-base font-semibold text-[#f6b05c]">
            Upload Workload Logs
          </label>
          <form className="mt-8 mb-8 2-80 max-w-screen-lg sm:w-96 p-2">
            <div className="mb-1 flex flex-col gap-6 bg-amber-50 rounded-sm p-5 overflow-y-auto border-2 border-[#3b3f3f]">
              <input
                type="file"
                accept=".json,.txt,.log"
                // onChange={handleFileUpload}
                className="text-center p-3 border-4 border-[#1175c6] rounded-full text-sm shadow-lg font-bold bg-white text-blue-950 w-fit"
              />
              {/* {uploadedFile && (
                <Typography variant="small" className="text-gray-500 mt-2">
                  Uploaded: {uploadedFile.name}
                </Typography>
              )} */}
              <Typography variant="small" className="text-gray-500 mt-2">
                Upload a CSV, or log file containing workload logs of a system.
                Make sure to follow the format in the HomePage
              </Typography>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AlgorithmSelect;
