import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SimulationData, FormData } from "../types/SimulationData";

const API_BASE_URL = "http://localhost:8080/api";

const formatPayload = (formData: FormData) => {
  return {
    numHosts: parseInt(String(formData.datacenter.numHosts)),
    numPesPerHost: parseInt(String(formData.datacenter.numPesPerHost)),
    peMips: parseInt(String(formData.datacenter.peMips)),
    ramPerHost: parseInt(String(formData.datacenter.ramPerHost)),
    bwPerHost: parseInt(String(formData.datacenter.bwPerHost)),
    storagePerHost: parseInt(String(formData.datacenter.storagePerHost)),
    numVms: parseInt(String(formData.vm.numVms)),
    vmMips: parseInt(String(formData.vm.vmMips)),
    vmPes: parseInt(String(formData.vm.vmPes)),
    vmRam: parseInt(String(formData.vm.vmRam)),
    vmBw: parseInt(String(formData.vm.vmBw)),
    vmSize: parseInt(String(formData.vm.vmSize)),
    vmScheduler: formData.vm.vmScheduler,
    numCloudlets: parseInt(String(formData.cloudlet.numCloudlets)),
    cloudletLength: parseInt(String(formData.cloudlet.cloudletLength)),
    cloudletPes: parseInt(String(formData.cloudlet.cloudletPes)),
    cloudletExecType: formData.cloudlet.cloudletExecType,
    workloadType: formData.workload.workloadType,
  };
};

const runSimulation = async (formData: FormData): Promise<SimulationData> => {
  const formattedPayload = formatPayload(formData);
  console.log("Sending payload:", formattedPayload);

  const response = await fetch(`${API_BASE_URL}/run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formattedPayload),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log("Received response from /run:", data);

  return {
    cloudlets: data.cloudlets || [],
    summary: data.summary || {
      averageResponseTime: 0,
      totalCloudlets: 0,
      finishedCloudlets: 0,
    },
    vmUtilization: data.vmUtilization || [],
    schedulingLog: data.schedulingLog || [],
  };
};

// Update LogResponse to reflect the actual /logs response structure
export interface LogEntry {
  cloudletId: number;
  vmId: number;
  description: string;
  submissionTime: number;
}

export interface LogResponse {
  schedulingLog: LogEntry[];
  vmMetrics: Array<{
    vmId: number;
    cpuUtilization: number;
    ramUtilization: number;
    numCloudlets: number;
  }>;
}

const fetchLogs = async (): Promise<string> => {
  console.log("Fetching logs from /logs...");
  const response = await fetch(`${API_BASE_URL}/logs`);
  if (!response.ok) {
    console.error(
      `Failed to fetch logs: HTTP error! status: ${response.status}`
    );
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  try {
    // The /logs API returns an array of log entries
    const logEntries = (await response.json()) as LogEntry[];
    console.log("Raw /logs response:", logEntries);

    // Transform the array into the expected LogResponse format
    const transformedResponse: LogResponse = {
      schedulingLog: logEntries,
      vmMetrics: [], // Since /logs doesn't provide vmMetrics, leave it empty
    };

    return JSON.stringify(transformedResponse);
  } catch (e) {
    console.error("Error parsing logs:", e);
    const text = await response.text();
    console.log("Raw /logs response (text):", text);
    return text;
  }
};

export const useSimulation = () => {
  const simulationMutation = useMutation({
    mutationFn: runSimulation,
    onSuccess: async (data) => {
      console.log("Mutation succeeded with data:", data);
      await logsQuery.refetch();
    },
    onError: (error) => {
      console.error("Simulation error:", error);
    },
  });

  const logsQuery = useQuery({
    queryKey: ["logs"],
    queryFn: async () => {
      try {
        const result = await fetchLogs();
        console.log("Fetched logs (stringified):", result);
        return result;
      } catch (error) {
        console.error("Error fetching logs:", error);
        throw error;
      }
    },
    refetchInterval: 2000,
    retry: 3,
  });

  useEffect(() => {
    console.log("Simulation state:", {
      isSimulating: simulationMutation.isPending,
      hasData: !!simulationMutation.data,
      hasError: !!simulationMutation.error,
      data: simulationMutation.data,
    });
    console.log("Logs state:", {
      logs: logsQuery.data,
      isFetching: logsQuery.isFetching,
      error: logsQuery.error,
    });
  }, [
    simulationMutation.isPending,
    simulationMutation.data,
    simulationMutation.error,
    logsQuery.data,
    logsQuery.isFetching,
    logsQuery.error,
  ]);

  const clearSimulation = () => {
    simulationMutation.reset();
    logsQuery.remove();
  };

  return {
    runSimulation: simulationMutation.mutate,
    isSimulating: simulationMutation.isPending,
    simulationError: simulationMutation.error,
    simulationData: simulationMutation.data,
    logs: logsQuery.data,
    isFetchingLogs: logsQuery.isFetching,
    logsError: logsQuery.error,
    clearSimulation,
  };
};
