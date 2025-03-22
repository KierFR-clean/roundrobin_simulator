import React, { useState, useMemo } from "react";
import Chart from "react-apexcharts";
import { Card, Typography } from "@material-tailwind/react";
import Button from "../Button";
import SkeletonLoader from "./SkeletonLoader";

interface DashboardViewProps {
  data: {
    unevenResults: any[];
    evenResults: any[];
    vmResourceUtilizationEven: any;
    vmResourceUtilizationUneven: any;
    responseTimeEven: any;
    responseTimeUneven: any;
    hostResourceUtilization: any;
  };
  onRestart: () => void;
}

const DashBoardView = ({ data, onRestart }: DashboardViewProps) => {
  const chartData = useMemo(() => {
    if (!data) return null;
    return initSimulRes();
  }, [data]);

  if (!data || !chartData) {
    return <SkeletonLoader />;
  }
  <SkeletonLoader />;

  const {
    responseTimeOptions,
    responseTimeSeries,
    hostUtilOptions,
    hostUtilSeries,
    executionTimeOptions,
    executionTimeSeries,
    resourceUtilOptions,
    resourceUtilSeries,
  } = chartData;

  const TBL_HEAD = [
    "Cloudlet ID",
    "VM ID",
    "Start Time (s)",
    "Finish Time (s)",
    "CPU Time (s)",
    "Status",
  ];

  return (
    <div className="p-8 bg-blue-gray-50 text-[#273f82]">
      <Typography
        variant="h2"
        color="blue-gray"
        className="mb-6 text-center text-sm rounded-full shadow-md text-[#273f82] border-[#1175c6] font-bold border-3 p-2 bg-[#fff] w-fit"
      >
        Simulation Results
      </Typography>

      <div className="grid grid-cols-1 xl:grid-cols-1 gap-6 mb-6">
        <Card className="p-4 shadow-lg">
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-4 font-semibold"
          >
            Average Response Time Comparison
          </Typography>
          <Chart
            options={responseTimeOptions}
            series={responseTimeSeries}
            type="bar"
            height={300}
          />
        </Card>

        <Card className="p-4 shadow-lg">
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-4 font-semibold"
          >
            Host Resource Utilization
          </Typography>
          <Chart
            options={hostUtilOptions}
            series={hostUtilSeries}
            type="bar"
            height={300}
          />
        </Card>
      </div>

      <Card className="p-4 shadow-lg mb-6">
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-4 font-semibold"
        >
          Execution Time Comparison
        </Typography>
        <Chart
          options={executionTimeOptions}
          series={executionTimeSeries}
          type="bar"
          height={300}
        />
      </Card>

      <Card className="p-4 shadow-lg mb-6">
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-4 font-semibold"
        >
          Resource Utilization Comparison
        </Typography>
        <Chart
          options={resourceUtilOptions}
          series={resourceUtilSeries}
          type="bar"
          height={300}
        />
      </Card>

      <div className="mb-6">
        <Typography variant="h5" color="blue-gray" className="mb-2 font-medium">
          Uneven Workload Results
        </Typography>
        <Card className="h-full w-full overflow-x-auto shadow-lg">
          <div className="min-w-[810px]">
            <table className="w-full table-auto text-left">
              <thead>
                <tr>
                  {TBL_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b font-bold border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.unevenResults.map((result, index) => {
                  const isLast = index === data.unevenResults.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {result.cloudletId}
                        </Typography>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {result.vmId}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {result.startTime.toFixed(2)}
                        </Typography>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {result.finishTime.toFixed(2)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {result.cpuTime.toFixed(2)}
                        </Typography>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <Typography
                          variant="small"
                          color="green"
                          className="font-medium"
                        >
                          {result.status}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div>
        <Typography variant="h5" color="blue-gray" className="mb-2 font-medium">
          Even Workload Results
        </Typography>
        <Card className="w-full overflow-x-auto shadow-lg">
          <div className="min-w-[810px]">
            <table className="w-full table-auto text-left">
              <thead>
                <tr>
                  {TBL_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.evenResults.map((result, index) => {
                  const isLast = index === data.evenResults.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {result.cloudletId}
                        </Typography>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {result.vmId}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {result.startTime.toFixed(2)}
                        </Typography>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {result.finishTime.toFixed(2)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {result.cpuTime.toFixed(2)}
                        </Typography>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <Typography
                          variant="small"
                          color="green"
                          className="font-medium"
                        >
                          {result.status}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
  //net code about apexchart
  function initSimulRes() {
    //prevent getting prod of a whole number for ram and bw
    const formatUtil = (value: number) => {
      return value >= 1 ? value : value * 100;
    };

    const responseTimeOptions = {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
        },
      },
      xaxis: {
        categories: ["Even Workload", "Uneven Workload"],
      },
      yaxis: {
        title: {
          text: "Response Time (seconds)",
        },
        // add this to be fixed by 2
        labels: {
          formatter: function (val) {
            return val.toFixed(2);
          },
        },
      },
      colors: ["#1976D2"],
    };

    const responseTimeSeries = [
      {
        name: "Response Time",
        data: [
          parseFloat(data.responseTimeEven.averageResponseTime).toFixed(2),
          parseFloat(data.responseTimeUneven.averageResponseTime).toFixed(2),
        ],
      },
    ];

    const hostUtilOptions = {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
        },
      },
      xaxis: {
        categories: ["CPU", "RAM", "Bandwidth"],
      },
      yaxis: {
        title: {
          text: "Utilization (%)",
        },
      },
      colors: ["#ca7434"],
    };

    const hostUtilSeries = [
      {
        name: "Utilization",
        data: [
          data.hostResourceUtilization.averageCpuUtilization,
          formatUtil(data.hostResourceUtilization.averageRamUtilization),
          formatUtil(data.hostResourceUtilization.averageBwUtilization),
        ],
      },
    ];

    const resourceUtilOptions = {
      chart: {
        type: "bar",
        height: 350,
        stacked: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 4,
        },
      },
      xaxis: {
        categories: ["CPU", "RAM", "Bandwidth"],
      },
      yaxis: {
        title: {
          text: "Utilization (%)",
        },
        labels: {
          formatter: function (val) {
            return val.toFixed(2);
          },
        },
      },
      colors: ["#1976D2", "#ca7434"],
    };

    const resourceUtilSeries = [
      {
        name: "Even Workload",
        data: [
          parseFloat(
            data.vmResourceUtilizationEven.averageCpuUtilizationEven
          ).toFixed(2),
          formatUtil(
            data.vmResourceUtilizationEven.averageRamUtilizationEven
          ).toFixed(2),
          formatUtil(
            data.vmResourceUtilizationEven.averageBwUtilizationEven
          ).toFixed(2),
        ],
      },
      {
        name: "Uneven Workload",
        data: [
          parseFloat(
            data.vmResourceUtilizationUneven.averageCpuUtilizationUneven
          ).toFixed(2),
          formatUtil(
            data.vmResourceUtilizationUneven.averageRamUtilizationUneven
          ).toFixed(2),
          formatUtil(
            data.vmResourceUtilizationUneven.averageBwUtilizationUneven
          ).toFixed(2),
        ],
      },
    ];

    const executionTimeOptions = {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
        },
      },
      xaxis: {
        categories: data.evenResults.map(
          (item) => `Cloudlet ${item.cloudletId}`
        ),
      },
      yaxis: {
        title: {
          text: "Time (seconds)",
        },
      },
      colors: ["#1976D2", "#ca7434"],
      legend: {
        position: "top",
      },
    };

    const executionTimeSeries = [
      {
        name: "Even Workload",
        data: data.evenResults.map((item) =>
          parseFloat(item.cpuTime.toFixed(2))
        ),
      },
      {
        name: "Uneven Workload",
        data: data.unevenResults.map((item) =>
          parseFloat(item.cpuTime.toFixed(2))
        ),
      },
    ];
    return {
      responseTimeOptions,
      responseTimeSeries,
      hostUtilOptions,
      hostUtilSeries,
      executionTimeOptions,
      executionTimeSeries,
      resourceUtilOptions,
      resourceUtilSeries,
    };
  }
};
export default DashBoardView;
