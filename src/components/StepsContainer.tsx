import { useState } from "react";
import { Typography } from "@material-tailwind/react";
import DatacenterConfig from "./steps_field/DatacenterConfig";
import VMConfig from "./steps_field/VMConfig";
import CloudletConfig from "./steps_field/CloudletConfig";
import WorkloadConfig from "./steps_field/WorkloadConfig";
import Button from "./Button";

interface StepsContainerProps {
  isVisible: boolean;
  onSubmit: (formData: any) => void;
  //propagate in order to remove the result
  onClear: () => void;
}

const StepsContainer = ({
  isVisible,
  onSubmit,
  onClear,
}: StepsContainerProps) => {
  const [formData, setFormData] = useState({
    datacenter: {
      numHosts: "",
      numPesPerHost: "",
      peMips: "",
      ramPerHost: "",
      bwPerHost: "",
      storagePerHost: "",
    },
    vm: {
      numVms: "",
      vmMips: "",
      vmPes: "",
      vmRam: "",
      vmBw: "",
      vmSize: "",
      vmScheduler: "",
    },
    cloudlet: {
      numCloudlets: "",
      cloudletLength: "",
      cloudletPes: "",
      cloudletExecType: "",
    },
    workload: {
      workloadType: "",
    },
  });

  const clearFields = () => {
    setFormData({
      datacenter: {
        numHosts: "",
        numPesPerHost: "",
        peMips: "",
        ramPerHost: "",
        bwPerHost: "",
        storagePerHost: "",
      },
      vm: {
        numVms: "",
        vmMips: "",
        vmPes: "",
        vmRam: "",
        vmBw: "",
        vmSize: "",
        vmScheduler: "",
      },
      cloudlet: {
        numCloudlets: "",
        cloudletLength: "",
        cloudletPes: "",
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
      numHosts: 4,
      numPesPerHost: 4,
      peMips: 3000,
      ramPerHost: 16384,
      bwPerHost: 100000,
      storagePerHost: 1000000,
    },
    vm: {
      numVms: 4,
      vmMips: 3000,
      vmPes: 2,
      vmRam: 4096,
      vmBw: 10000,
      vmSize: 50000,
      vmScheduler: "TimeShared",
    },
    cloudlet: {
      numCloudlets: 10,
      cloudletLength: 500000,
      cloudletPes: 2,
      cloudletExecType: "Fixed",
    },
    workload: {
      workloadType: "Even",
    },
  };

  //track current step
  const [cStep, setCStep] = useState(1);
  //total steps
  const tSteps = 4;

  const handleDefault = () => {
    //revert other raw data to string
    const stringifiedDefaults = {
      datacenter: {
        numHosts: D_PARAM.datacenter.numHosts.toString(),
        numPesPerHost: D_PARAM.datacenter.numPesPerHost.toString(),
        peMips: D_PARAM.datacenter.peMips.toString(),
        ramPerHost: D_PARAM.datacenter.ramPerHost.toString(),
        bwPerHost: D_PARAM.datacenter.bwPerHost.toString(),
        storagePerHost: D_PARAM.datacenter.storagePerHost.toString(),
      },
      vm: {
        numVms: D_PARAM.vm.numVms.toString(),
        vmMips: D_PARAM.vm.vmMips.toString(),
        vmPes: D_PARAM.vm.vmPes.toString(),
        vmRam: D_PARAM.vm.vmRam.toString(),
        vmBw: D_PARAM.vm.vmBw.toString(),
        vmSize: D_PARAM.vm.vmSize.toString(),
        vmScheduler: D_PARAM.vm.vmScheduler,
      },
      cloudlet: {
        numCloudlets: D_PARAM.cloudlet.numCloudlets.toString(),
        cloudletLength: D_PARAM.cloudlet.cloudletLength.toString(),
        cloudletPes: D_PARAM.cloudlet.cloudletPes.toString(),
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
        return (
          <DatacenterConfig
            onUpdate={(data) => updateFormData("datacenter", data)}
            initialData={formData.datacenter}
          />
        );
      case 2:
        return (
          <VMConfig
            onUpdate={(data) => updateFormData("vm", data)}
            initialData={formData.vm}
          />
        );
      case 3:
        return (
          <CloudletConfig
            onUpdate={(data) => updateFormData("cloudlet", data)}
            initialData={formData.cloudlet}
          />
        );
      case 4:
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
  //finally fixed the adaptation on left
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
