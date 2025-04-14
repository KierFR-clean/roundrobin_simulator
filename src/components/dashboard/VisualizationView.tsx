import React, { useState, useEffect, useRef } from "react";
import Button from "../Button";
import { FaChartLine, FaExclamationTriangle } from "react-icons/fa";
import { SimulationData } from "../../types/SimulationData";
import { LogResponse } from "../../hooks/useSimulation";

interface VisualizationViewProps {
  data: SimulationData;
  logs?: string;
  onRestart: () => void;
  totalCpuPerVm: number; // Prop for total CPU per VM
  totalRamPerVm: number; // Prop for total RAM per VM
}

// Helper function to format utilization as percentage
const formatUtil = (value: number, total: number): number => {
  return (value / total) * 100; // Convert absolute value to percentage
};

// Generate insights for response time and utilization
const genInsights = (data: SimulationData) => {
  const svdate = data;

  if (!svdate.summary) {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Simulation Insights</h3>
        <div className="p-4 rounded-lg mb-4 bg-yellow-100 text-yellow-800">
          <div className="flex items-center">
            <FaExclamationTriangle className="h-6 w-6 mr-2" />
            <div>
              <h4 className="font-semibold">Insufficient data for insights.</h4>
              <p>Summary data is missing.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const averageResponseTime = svdate.summary.averageResponseTime;

  const getResponseTimeInsight = (
    avgResponseTime: number
  ): { severity: "success" | "info" | "warning"; message: string } => {
    let severity: "success" | "info" | "warning";
    let message = "";

    if (avgResponseTime < 50) {
      severity = "success";
      message = "Response time is excellent.";
    } else if (avgResponseTime < 100) {
      severity = "info";
      message = "Response time is acceptable.";
    } else {
      severity = "warning";
      message = "Response time is high. Consider optimization.";
    }

    return { severity, message };
  };

  const avgCpuUtil =
    svdate.vmUtilization.length > 0
      ? svdate.vmUtilization.reduce(
          (sum, vm) => sum + formatUtil(vm.cpuUtilization, totalCpuPerVm),
          0
        ) / svdate.vmUtilization.length
      : 0;
  const avgRamUtil =
    svdate.vmUtilization.length > 0
      ? svdate.vmUtilization.reduce(
          (sum, vm) => sum + formatUtil(vm.ramUtilization, totalRamPerVm),
          0
        ) / svdate.vmUtilization.length
      : 0;

  const getUtilizationInsight = (
    cpuUtil: number,
    ramUtil: number
  ): Array<{ severity: "success" | "info" | "warning"; message: string }> => {
    const insights = [];

    if (cpuUtil > 80) {
      insights.push({
        severity: "warning",
        message: `High CPU utilization (${cpuUtil.toFixed(1)}%). Consider scaling resources.`,
      });
    } else if (cpuUtil > 50) {
      insights.push({
        severity: "info",
        message: `Moderate CPU utilization (${cpuUtil.toFixed(1)}%).`,
      });
    }

    if (ramUtil > 80) {
      insights.push({
        severity: "warning",
        message: `High RAM utilization (${ramUtil.toFixed(1)}%). Consider memory optimization.`,
      });
    } else if (ramUtil > 50) {
      insights.push({
        severity: "info",
        message: `Moderate RAM utilization (${ramUtil.toFixed(1)}%).`,
      });
    }

    return insights;
  };

  const responseTimeAnalysis = getResponseTimeInsight(averageResponseTime);
  const utilizationInsights = getUtilizationInsight(avgCpuUtil, avgRamUtil);

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Simulation Insights</h3>

      <div
        className={`p-4 rounded-lg mb-4 ${
          responseTimeAnalysis.severity === "success"
            ? "bg-green-100 text-green-800"
            : responseTimeAnalysis.severity === "info"
              ? "bg-blue-100 text-blue-800"
              : "bg-yellow-100 text-yellow-800"
        }`}
      >
        <div className="flex items-center">
          <FaChartLine className="h-6 w-6 mr-2" />
          <div>
            <h4 className="font-semibold">{responseTimeAnalysis.message}</h4>
            <p>Average Response Time: {averageResponseTime.toFixed(2)}s</p>
          </div>
        </div>
      </div>

      {utilizationInsights.map((insight, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg mb-4 ${
            insight.severity === "warning"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          <div className="flex items-center">
            <FaExclamationTriangle className="h-6 w-6 mr-2" />
            <h4 className="font-semibold">{insight.message}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

const VisualizationView: React.FC<VisualizationViewProps> = ({
  data,
  logs,
  onRestart,
  totalCpuPerVm,
  totalRamPerVm,
}) => {
  const [showInsights, setShowInsights] = useState(false);
  const [schedulingLogs, setSchedulingLogs] = useState<
    LogResponse["schedulingLog"]
  >([]);
  const [vmMetrics, setVmMetrics] = useState<LogResponse["vmMetrics"]>([]);
  const [animatedLogs, setAnimatedLogs] = useState<
    LogResponse["schedulingLog"]
  >([]);
  const animationTimeouts = useRef<NodeJS.Timeout[]>([]); // Track timeouts for cleanup

  useEffect(() => {
    if (logs) {
      try {
        const parsedLogs: LogResponse = JSON.parse(logs);
        console.log("Parsed logs in VisualizationView:", parsedLogs);
        setSchedulingLogs(parsedLogs.schedulingLog || []);
        setVmMetrics(parsedLogs.vmMetrics || []);
      } catch (e) {
        console.error("Error parsing logs in VisualizationView:", e);
      }
    }
  }, [logs]);

  // Animate the scheduling logs
  useEffect(() => {
    // Clean up any existing timeouts to prevent duplicates
    animationTimeouts.current.forEach((timeout) => clearTimeout(timeout));
    animationTimeouts.current = [];

    // Combine logs from /logs and /run, and deduplicate by description
    const logsToAnimate =
      schedulingLogs.length > 0 ? schedulingLogs : data.schedulingLog || [];
    const uniqueLogs = Array.from(
      new Map(logsToAnimate.map((log) => [log.description, log])).values()
    );

    // Reset animated logs
    setAnimatedLogs([]);

    // Animate each log entry
    uniqueLogs.forEach((log, index) => {
      const timeout = setTimeout(() => {
        setAnimatedLogs((prev) => {
          // Avoid adding duplicates
          if (
            prev.some(
              (existingLog) => existingLog.description === log.description
            )
          ) {
            return prev;
          }
          return [...prev, log];
        });
      }, index * 1000); // 1000ms delay between each log entry
      animationTimeouts.current.push(timeout);
    });

    // Clean up timeouts on unmount or when logs change
    return () => {
      animationTimeouts.current.forEach((timeout) => clearTimeout(timeout));
    };
  }, [schedulingLogs, data.schedulingLog]);

  if (!data || !data.cloudlets) {
    return (
      <div className="p-4">
        <div className="p-4 bg-red-100 text-red-800 rounded-lg">
          No simulation data available
        </div>
      </div>
    );
  }

  const currentWorkloadData = data.cloudlets || [];
  const effectiveVmMetrics =
    vmMetrics.length > 0 ? vmMetrics : data.vmUtilization || [];

  return (
    <div className="m-3 p-6 h-[670px] w-full overflow-y-auto">
      <div className="p-8 bg-gray-100 text-[#273f82]">
        <h2 className="mb-6 text-center text-sm rounded-full shadow-md text-[#273f82] border-[#1175c6] font-bold border-2 p-2 bg-[#fff] w-fit">
          Results
        </h2>

        {/* <div className="flex justify-between items-center mb-6">
          <Button onClick={() => setShowInsights(!showInsights)}>
            {showInsights ? "Close" : "Show Insights"}
          </Button>
        </div> */}

        {showInsights && genInsights(data)}

        <div className="mb-6 p-4 bg-blue-100 rounded-lg text-center">
          {data.summary ? (
            <h3 className="text-lg font-bold text-blue-800">
              Average Response Time:{" "}
              <span className="text-2xl text-blue-900">
                {data.summary.averageResponseTime.toFixed(2)}s
              </span>
            </h3>
          ) : (
            <h3 className="text-lg font-bold text-blue-800">
              Average Response Time:{" "}
              <span className="text-2xl text-blue-900">N/A</span>
            </h3>
          )}
        </div>

        <div className="mb-6 p-4 bg-white shadow-lg rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold mb-4">
              Real-time Scheduling Log (Round Robin Simulation)
            </h3>
            <Button onClick={() => setAnimatedLogs([])}>
              Replay Animation
            </Button>
          </div>
          <div className="max-h- overflow-y-auto">
            {animatedLogs.length > 0 ? (
              animatedLogs.map((log, index) => (
                <div
                  key={index}
                  className="mb-2 text-sm text-gray-700 animate-slideIn"
                >
                  {log.description}
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500">
                No scheduling logs available. Click "Replay Animation" to start.
              </div>
            )}
          </div>
        </div>

        <div className="mb-6 p-4 bg-white shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            Cloudlet-VM Assignments
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cloudlet ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    VM ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submission Time (s)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentWorkloadData.map((assignment, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {assignment.cloudletId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {assignment.vmId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {assignment.submissionTime?.toFixed(2) || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-6 p-4 bg-white shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            VM Resource Utilization
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    VM ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CPU Utilization (%)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    RAM Utilization (%)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Number of Cloudlets
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {effectiveVmMetrics.length > 0 ? (
                  effectiveVmMetrics.map((vm, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{vm.vmId}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatUtil(vm.cpuUtilization, totalCpuPerVm).toFixed(
                          2
                        )}
                        %
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatUtil(vm.ramUtilization, totalRamPerVm).toFixed(
                          2
                        )}
                        %
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {vm.numCloudlets}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No VM utilization data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default VisualizationView;
