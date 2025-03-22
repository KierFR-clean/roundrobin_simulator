import React, { useState } from "react";
import { Card, Typography, Alert } from "@material-tailwind/react";
import Button from "../Button";
import DCVis from "../reactflow/DCVis";
import {
  FaInfoCircle,
  FaChartLine,
  FaExclamationTriangle,
} from "react-icons/fa";

//array for data
interface VisualizationViewProps {
  data: {
    unevenResults: any[];
    evenResults: any[];
    vmResourceUtilizationEven: any;
    vmResourceUtilizationUneven: any;
    responseTimeEven: any;
    responseTimeUneven: any;
    hostResourceUtilization: any;
  };
  onRestart: () => void; // restart simulation
}

const VisualizationView = ({ data }: VisualizationViewProps) => {
  const [workloadType, setWorkloadType] = useState<"Even" | "Uneven">("Even");
  const [showInsights, setShowInsights] = useState(false);
// get analysis of data
  const genInsights = seriesVis(data);

  return (
    <div className="m-3 p-6 h-[670px] w-full overflow-y-auto">
      <div className="p-8 bg-blue-gray-50 text-[#273f82]">
        <Typography
          variant="h2"
          color="blue-gray"
          className="mb-6 text-center text-sm rounded-full shadow-md text-[#273f82] border-[#1175c6] font-bold border-3 p-2 bg-[#fff] w-fit"
        >
          Datacenter Visualization
        </Typography>

        <div className="flex justify-between items-center mb-6">
          <Button onClick={() => setShowInsights(!showInsights)}>
            {showInsights ? "Close" : "Show Insights"}
          </Button>
        </div>

        {showInsights && genInsights()}

        <Card className="p-4 shadow-lg mb-6">
          <DCVis
            simulationData={data}
            workloadType={workloadType}
            onWorkloadToggle={() =>
              setWorkloadType((prev) => (prev === "Even" ? "Uneven" : "Even"))
            }
          />
        </Card>
      </div>
    </div>
  );
};

function seriesVis(data: VisualizationViewProps["data"]) {
  return () => {
    //convert to percentages for util
    const formatUtil = (value: number) => {
      return value >= 1 ? value : value * 100;
    };
//gjuss pass
    const svdate = data;
    //count for diff
    const responseTimeDiff = Math.abs(
      svdate.responseTimeEven.averageResponseTime -
        svdate.responseTimeUneven.averageResponseTime
    );

    const getResponseTimeInsight = (
      diff: number,
      even: number,
      uneven: number
    ) => {
      //more than two secs or reached two secs
      if (diff >= 120) {
        console.log(diff);
        return {
          severity: "warning",
          message: `Critical performance variance detected. The ${
            even > uneven ? "even" : "uneven"
          } workload distribution shows ${diff.toFixed(1)}s slower response times. 
          Consider implementing auto-scaling policies or reviewing resource allocation strategy.
          Recommendation: Implement dynamic resource allocation to handle workload variations.`,
        };
      } else if (diff > 60) {
        return {
          severity: "info",
          message: `Moderate performance difference observed (${diff.toFixed(1)}s variance). 
          While system stability is maintained, there's room for optimization in the ${
            even > uneven ? "even" : "uneven"
          } workload scenario. 
          Recommendation: Fine-tune VM allocation policy for better load distribution.`,
        };
      } else {
        return {
          severity: "success",
          message: `Excellent performance consistency across workload patterns (${diff.toFixed(
            2
          )}s variance). The Round Robin algorithm is effectively managing resource distribution.
          Recommendation: Current configuration is optimal for the given workload patterns.`,
        };
      }
    };
    //compare
    const evenCpuUtil =
      svdate.vmResourceUtilizationEven.averageCpuUtilizationEven;
    const unevenCpuUtil =
      svdate.vmResourceUtilizationUneven.averageCpuUtilizationUneven;
    const utilizationDiff = Math.abs(evenCpuUtil - unevenCpuUtil);
    const memoryUtil = formatUtil(
      svdate.hostResourceUtilization.averageRamUtilization
    );
    const bwUtil = formatUtil(
      svdate.hostResourceUtilization.averageBwUtilization
    );

    const getUtilizationInsight = (
      cpuDiff: number,
      memUtil: number,
      bwUtil: number
    ) => {
      //put in array of objects
      const insights = [];

      if (cpuDiff > 25) {
        insights.push({
          severity: "warning",
          message: `Significant resource utilization imbalance (${cpuDiff.toFixed(
            1
          )}% variance). This indicates potential resource bottlenecks under different workload patterns.
          Recommendation: Consider implementing predictive scaling based on workload patterns.`,
        });
      } else if (cpuDiff > 15) {
        insights.push({
          severity: "info",
          message: `Moderate resource utilization variance (${cpuDiff.toFixed(
            1
          )}%). System shows adaptability but could benefit from optimization.
          Recommendation: Review VM sizing and distribution strategy.`,
        });
      } else {
        insights.push({
          severity: "success",
          message: `Excellent resource balance achieved (${cpuDiff.toFixed(
            1
          )}% variance). Round Robin algorithm is effectively distributing workload.`,
        });
      }

      if (memUtil > 80) {
        insights.push({
          severity: "warning",
          message: `High memory utilization (${memUtil.toFixed(
            1
          )}%). Consider memory optimization or scaling.`,
        });
      }

      if (bwUtil > 75) {
        insights.push({
          severity: "warning",
          message: `Network bandwidth approaching capacity (${bwUtil.toFixed(
            1
          )}%). Consider network optimization strategies.`,
        });
      }

      return insights;
    };
    //compare
    const responseTimeAnalysis = getResponseTimeInsight(
      responseTimeDiff,
      svdate.responseTimeEven.averageResponseTime,
      svdate.responseTimeUneven.averageResponseTime
    );

    const utilizationInsights = getUtilizationInsight(
      utilizationDiff,
      memoryUtil,
      bwUtil
    );

    // ... existing return JSX with updated insights ...
    return (
      <div className="mb-6">
        <Card placeholder="" className="p-6 shadow-lg bg-white">
          <Typography
            placeholder=""
            variant="h5"
            color="blue-gray"
            className="mb-4 font-semibold flex items-center gap-2"
          >
            <FaChartLine className="text-[#f6ad55]" />
            Performance Analysis Report
          </Typography>

          <div className="space-y-4 p-3">
            <Alert
              color={responseTimeAnalysis.severity}
              icon={<FaInfoCircle className="text-[#f6ad55]" />}
              className="mb-4 shadow-md border-3 border-[#1678c7]"
            >
              <Typography placeholder="" className="font-medium text-gray-900">
                <span className="marked font-semibold">
                  Response Time Analysis
                </span>
              </Typography>
              <Typography
                placeholder=""
                className="mt-2 text-sm text-gray-900 text-justify"
              >
                {responseTimeAnalysis.message}
                <br />
                Even Workload:{" "}
                {svdate.responseTimeEven.averageResponseTime.toFixed(2)}s
                <br />
                Uneven Workload:{" "}
                {svdate.responseTimeUneven.averageResponseTime.toFixed(2)}s
              </Typography>
            </Alert>

            {utilizationInsights.map((insight, index) => (
              <Alert
                key={index}
                color={insight.severity}
                icon={<FaExclamationTriangle className="text-[#f6ad55]" />}
                className="mb-4 shadow-md border-3 border-[#1678c7]"
              >
                <Typography
                  placeholder=""
                  className="font-medium text-gray-900"
                >
                  <span className="marked font-semibold">
                    Resource Analysis
                  </span>
                </Typography>
                <Typography
                  placeholder=""
                  className="mt-2 text-sm text-gray-900 text-justify"
                >
                  {insight.message}
                </Typography>
              </Alert>
            ))}
          </div>
        </Card>
      </div>
    );
  };
}
export default VisualizationView;
