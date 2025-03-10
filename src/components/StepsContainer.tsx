import { useState } from "react";
import { Typography } from "@material-tailwind/react";
import DatacenterConfig from "./steps_field/DatacenterConfig";
import VMConfig from "./steps_field/VMConfig";
import CloudletConfig from "./steps_field/CloudletConfig";
import WorkloadConfig from "./steps_field/WorkloadConfig";
import Button from "./Button";

interface StepsContainerProps {
  isVisible: boolean;
}

const StepsContainer = ({ isVisible }: StepsContainerProps) => {
  //track current step
  const [cStep, setCStep] = useState(1);
  //total steps
  const tSteps = 4;
  //nav handlers
  const handleNext = () => {
    setCStep((prev) => Math.min(prev + 1, tSteps));
  };

  const handleBack = () => {
    setCStep((prev) => Math.max(prev - 1, 1));
  };
  //foe dynamic title
  const renderTitles = () => {
    switch (cStep) {
      case 1:
        return "Data Center Configuration";
      case 2:
        return "VM Configuration";
      case 3:
        return "Cloudlet Configuration";
      case 4:
        return "Workload Configuration";
      default:
        return "Data Center Configuration";
    }
  };

  const renderContent = () => {
    switch (cStep) {
      case 1:
        return <DatacenterConfig />;
      case 2:
        return <VMConfig />;
      case 3:
        return <CloudletConfig />;
      case 4:
        return <WorkloadConfig />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`
        bg-[#f8f8f8] mt-0.5 mb-0.5 col-[1/2] row-[2/4] p-4 border-2 border-[#319795] rounded-tr-md rounded-br-md shadow-md
        transition-all duration-300 
        ${isVisible ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="mb-1 w-fit bg-white rounded-full p-3 border-4 border-[#1175c6] shadow-md">
        <Typography color="gray" className="mt-1 font-bold">
          <span className="marked">{renderTitles()}</span>
        </Typography>
      </div>
      {/* curr content */}
      {renderContent()}
      {/* nav btns */}
      <div className="flex justify-between items-center mt-4">
        <Button onClick={handleBack} disabled={cStep === 1}>
          Back
        </Button>
        <Button onClick={handleNext}>
          {cStep === tSteps ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
};
export default StepsContainer;
