import { useState } from "react";
import { Typography } from "@material-tailwind/react";
import DatacenterConfig from "./steps_field/DatacenterConfig";
import VMConfig from "./steps_field/VMConfig";
import CloudletConfig from "./steps_field/CloudletConfig";
import WorkloadConfig from "./steps_field/WorkloadConfig";
import AlgorithmSelect from "./steps_field/AlgorithmSelect";
import Button from "./Button";

interface StepsContainerProps {
  isVisible: boolean;
  onSubmit: (formData: FormData) => void;
  onClear: () => void;
}

const StepsContainer = ({
  isVisible,
  onSubmit,
  onClear,
}: StepsContainerProps) => {
  const [formData, setFormData] = useState({
    datacenter: {
      numHosts: 0,
      numPesPerHost: 0,
      peMips: 0,
      ramPerHost: 0,
      bwPerHost: 0,
      storagePerHost: 0,
    },
    vm: {
      numVms: 0,
      vmMips: 0,
      vmPes: 0,
      vmRam: 0,
      vmBw: 0,
      vmSize: 0,
      vmScheduler: "",
    },
    cloudlet: {
      numCloudlets: 0,
      cloudletLength: 0,
      cloudletPes: 0,
      cloudletExecType: "",
    },
    workload: {
      workloadType: "",
    },
  });

  const clearFields = () => {
    setFormData({
      datacenter: {
        numHosts: 0,
        numPesPerHost: 0,
        peMips: 0,
        ramPerHost: 0,
        bwPerHost: 0,
        storagePerHost: 0,
      },
      vm: {
        numVms: 0,
        vmMips: 0,
        vmPes: 0,
        vmRam: 0,
        vmBw: 0,
        vmSize: 0,
        vmScheduler: "",
      },
      cloudlet: {
        numCloudlets: 0,
        cloudletLength: 0,
        cloudletPes: 0,
        cloudletExecType: "",
      },
      workload: {
        workloadType: "",
      },
    });
    onClear();
  };

  //for the default values
  const D_PARAM = {
    datacenter: {
      numHosts: 1,
      numPesPerHost: 20,
      peMips: 2000,
      ramPerHost: 10240,
      bwPerHost: 100000,
      storagePerHost: 1000000,
    },
    vm: {
      numVms: 10,
      vmMips: 1000,
      vmPes: 2,
      vmRam: 1024,
      vmBw: 1000,
      vmSize: 10000,
      vmScheduler: "TimeShared",
    },
    cloudlet: {
      numCloudlets: 100,
      cloudletLength: 1000,
      cloudletPes: 1,
      cloudletExecType: "Fixed",
    },
    workload: {
      workloadType: "Even",
    },
  };

  //track current step
  const [cStep, setCStep] = useState(1);
  //total steps
  const tSteps = 5;

  const handleDefault = () => {
    const stringifiedDefaults = {
      datacenter: {
        numHosts: D_PARAM.datacenter.numHosts,
        numPesPerHost: D_PARAM.datacenter.numPesPerHost,
        peMips: D_PARAM.datacenter.peMips,
        ramPerHost: D_PARAM.datacenter.ramPerHost,
        bwPerHost: D_PARAM.datacenter.bwPerHost,
        storagePerHost: D_PARAM.datacenter.storagePerHost,
      },
      vm: {
        numVms: D_PARAM.vm.numVms,
        vmMips: D_PARAM.vm.vmMips,
        vmPes: D_PARAM.vm.vmPes,
        vmRam: D_PARAM.vm.vmRam,
        vmBw: D_PARAM.vm.vmBw,
        vmSize: D_PARAM.vm.vmSize,
        vmScheduler: D_PARAM.vm.vmScheduler,
      },
      cloudlet: {
        numCloudlets: D_PARAM.cloudlet.numCloudlets,
        cloudletLength: D_PARAM.cloudlet.cloudletLength,
        cloudletPes: D_PARAM.cloudlet.cloudletPes,
        cloudletExecType: D_PARAM.cloudlet.cloudletExecType,
      },
      workload: {
        workloadType: D_PARAM.workload.workloadType,
      },
    };

    setFormData(stringifiedDefaults);
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };
  //
  const updateFormData = (section: string, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

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
        return "Algorithm Selection";
      case 2:
        return "Data Center Configuration";
      case 3:
        return "VM Configuration";
      case 4:
        return "Cloudlet Configuration";
      case 5:
        return "Workload Configuration";
      default:
        return "Algorithm Selection";
    }
  };

  const renderContent = () => {
    switch (cStep) {
      case 1:
        return <AlgorithmSelect value="round-robin" onChange={() => {}} />;
      case 2:
        return (
          <DatacenterConfig
            onUpdate={(data) => updateFormData("datacenter", data)}
            initialData={formData.datacenter}
          />
        );
      case 3:
        return (
          <VMConfig
            onUpdate={(data) => updateFormData("vm", data)}
            initialData={formData.vm}
          />
        );
      case 4:
        return (
          <CloudletConfig
            onUpdate={(data) => updateFormData("cloudlet", data)}
            initialData={formData.cloudlet}
          />
        );
      case 5:
        return (
          <WorkloadConfig
            onUpdate={(data) => updateFormData("workload", data)}
            initialData={formData.workload}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`
        h-full bg-[#f8f8f8]  col-[1/2] row-[2/3] p-4 border-2 border-[#319795] rounded-tr-md rounded-br-md shadow-md
        transition-all duration-300 
        ${isVisible ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="mb-1 w-fit bg-white rounded-full p-2 border-4 border-[#1175c6] shadow-md">
        <Typography color="gray" className="mt-1 font-bold">
          <span className="marked text-sm p-3">{renderTitles()}</span>
        </Typography>
      </div>
      <div className=" flex justify-between items-center mt-4">
        <Button onClick={handleBack} disabled={cStep === 1}>
          Back
        </Button>
        <Button onClick={clearFields}>Clear All</Button>

        <Button onClick={cStep === tSteps ? handleSubmit : handleNext}>
          {cStep === tSteps ? "Submit" : "Next"}
        </Button>
      </div>
      {/* curr content */}
      {renderContent()}
      {/* try with default */}
      <div className="flex justify-start items-center ">
        <Button onClick={handleDefault}>Try with default parameters</Button>
      </div>
    </div>
  );
};
export default StepsContainer;
