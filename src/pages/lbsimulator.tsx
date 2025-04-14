import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import Stepper from "../components/StepsContainer";
import SkeletonLoader from "../components/dashboard/SkeletonLoader";
import VisualizationView from "../components/dashboard/VisualizationView";
import Loader from "../components/Loader";
import Button from "../components/Button";
import { useSimulation } from "../hooks/useSimulation";
import { FormData } from "../types/SimulationData";

const Lbsimulator: React.FC = () => {
  const navigate = useNavigate();
  const [isLeftContainerVisible, setIsLeftContainerVisible] = useState(true);
  const [lastData, setLastData] = useState<FormData | null>(null);

  const {
    runSimulation,
    isSimulating,
    simulationError,
    simulationData,
    logs,
    isFetchingLogs,
    logsError,
    clearSimulation,
  } = useSimulation();

  const handleFormSubmit = async (formData: FormData) => {
    setLastData(formData);
    runSimulation(formData);
  };

  const handleRestart = async () => {
    if (lastData) {
      runSimulation(lastData);
    }
  };

  const handleClear = () => {
    setLastData(null);
    clearSimulation();
  };

  return (
    <>
      <div className={`page ${!isLeftContainerVisible ? "left-hidden" : ""}`}>
        <div className="app">
          <div className="fixed top-24 left-10 z-10 flex flex-col gap-6">
            <Button
              onClick={() => setIsLeftContainerVisible(!isLeftContainerVisible)}
            >
              {isLeftContainerVisible ? "Hide" : "Show"}
            </Button>
            <Button
              onClick={() => navigate({ to: "/" })}
              className="bg-[#319795] text-white hover:bg-[#2C7A7B]"
            >
              Home
            </Button>
          </div>

          <Stepper
            isVisible={isLeftContainerVisible}
            onSubmit={handleFormSubmit}
            onClear={handleClear}
          />

          <div
            className={`bg-[#fff] transition-all duration-200 overflow-x-hidden ${
              isLeftContainerVisible
                ? "col-[2/3] row-[2/3] mx-4 w-[500px]"
                : "col-[1/3] row-[2/3] ml-4 mr-4"
            }`}
          >
            {simulationError && (
              <div className="text-red-500 p-4 bg-red-50 rounded-full rounded-3">
                {simulationError.message}
              </div>
            )}

            {isSimulating ? (
              <div className="flex items-center justify-center h-full duration-300">
                <Loader
                  minLoadingTime={2000}
                  count={1}
                  onLoadingComplete={() => {}}
                />
              </div>
            ) : !simulationData ? (
              <SkeletonLoader section="visualization" />
            ) : (
              <VisualizationView
                data={simulationData}
                logs={logs}
                onRestart={handleRestart}
                totalCpuPerVm={lastData?.vm.vmMips || 1000} // Pass user-provided vmMips
                totalRamPerVm={lastData?.vm.vmRam || 1024} // Pass user-provided vmRam
              />
            )}
          </div>

          <div className="justify-self-end w-[238.4px] min-h-full bg-[#0c273e] col-[3/4] row-[2/3] p-4">
            <div className="grid grid-rows-2 gap-4 h-full">
              <div className="row-span-1 rounded-lg p-4 bg-[#212121] console overflow-y-auto">
                {logs ? (
                  <pre className="font-mono text-xs leading-relaxed text-gray-300 whitespace-pre-wrap text-left">
                    {logs}
                  </pre>
                ) : (
                  <p className="text-gray-300 text-center text-xs mt-30">
                    Console logs will appear here once the simulation starts...
                  </p>
                )}
              </div>
              <div className="row-span-1 bg-[#2196F3] rounded-lg p-4 mt-8">
                <div className="flex justify-between items-center">
                  <p className="text-zinc-50 font-bold text-left text-md">
                    About Our <span className="marked italic">Software</span>
                  </p>
                </div>
                <h5 className="text-sm m-0.5 mt-2 text-justify items-center">
                    A simulation website demonstrating Round Robin (RR)
                  scheduling algorithm in cloud computing environment.
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lbsimulator;
