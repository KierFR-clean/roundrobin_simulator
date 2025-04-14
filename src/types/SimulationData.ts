// src/types/SimulationData.ts
export interface SimulationData {
  cloudlets: Array<{
    cloudletId: number;
    vmId: number;
    submissionTime: number;
    finishTime: number;
    responseTime: number;
    startTime: number;
    status: string;
  }>;
  summary: {
    averageResponseTime: number;
    totalCloudlets: number;
    finishedCloudlets: number;
  };
  vmUtilization: Array<{
    vmId: number;
    cpuUtilization: number; // In absolute units (e.g., MIPS)
    ramUtilization: number; // In absolute units (e.g., MB)
    numCloudlets: number;
  }>;
  schedulingLog: Array<{
    vmId: number;
    cloudletId: number;
    description: string;
    submissionTime: number;
  }>;
}

export interface FormData {
  datacenter: {
    numHosts: number;
    numPesPerHost: number;
    peMips: number;
    ramPerHost: number;
    bwPerHost: number;
    storagePerHost: number;
  };
  vm: {
    numVms: number;
    vmMips: number;
    vmPes: number;
    vmRam: number;
    vmBw: number;
    vmSize: number;
    vmScheduler: string;
  };
  cloudlet: {
    numCloudlets: number;
    cloudletLength: number;
    cloudletPes: number;
    cloudletExecType: string;
  };
  workload: {
    workloadType: string;
  };
}
