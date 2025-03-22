import { Card, Typography } from "@material-tailwind/react";
import Chart from "react-apexcharts";
const SkeletonLoader = ({ section = "dashboard" }) => {
  const emptyChartOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    xaxis: {
      categories: ["Even Workload", "Uneven Workload"],
    },
    yaxis: {
      title: {
        text: "Response Time (seconds)",
      },
    },
    noData: {
      text: "Waiting: Simulation data...",
      align: "center",
      verticalAlign: "middle",
      style: {
        fontSize: "14px",
      },
    },
  };

  const hostChartOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    xaxis: {
      categories: ["Even Workload", "Uneven Workload"],
    },
    yaxis: {
      title: {
        text: "Utilization (%)",
      },
    },
    noData: {
      text: "Waiting: Simulation data...",
      align: "center",
      verticalAlign: "middle",
      style: {
        fontSize: "14px",
      },
    },
  };

  const resourceUtilEmptyOptions = {
    ...emptyChartOptions,
    xaxis: {
      categories: ["CPU", "RAM", "Bandwidth"],
    },
    yaxis: {
      title: {
        text: "Utilization (%)",
      },
    },
  };

  const executionTimeEmptyOptions = {
    ...emptyChartOptions,
    xaxis: {
      categories: ["Cloudlet 1", "Cloudlet 2", "Cloudlet 3", "Cloudlet 4"],
    },
    yaxis: {
      title: {
        text: "Time (seconds)",
      },
    },
    legend: {
      position: "top",
    },
  };

  const TBL_HEAD = [
    "Cloudlet ID",
    "VM ID",
    "Start Time (s)",
    "Finish Time (s)",
    "CPU Time (s)",
    "Status",
  ];

  return (
    <div className="m-3 p-6 h-[670px] w-full overflow-y-auto">
      {section === "dashboard" ? (
        <div className="p-8 bg-blue-gray-50 text-[#273f82]">
          <Typography
            variant="h2"
            color="blue-gray"
            className="mb-6 text-center text-sm rounded-full shadow-md text-[#273f82] border-[#1175c6] font-bold border-3 p-2 bg-[#fff] w-fit"
          >
            Simulation Results (No Data Yet)
          </Typography>
          <div className="grid grid-cols-1  gap-6 mb-6">
            <Card className="p-4 shadow-lg">
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-4 font-semibold"
              >
                Average Response Time Comparison
              </Typography>
              <Chart
                options={emptyChartOptions}
                series={[]}
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
                options={{
                  ...hostChartOptions,
                  xaxis: { categories: ["CPU", "RAM", "Bandwidth"] },
                }}
                series={[]}
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
                Execution Time Comparison
              </Typography>
              <Chart
                options={executionTimeEmptyOptions}
                series={[]}
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
                options={resourceUtilEmptyOptions}
                series={[]}
                type="bar"
                height={300}
              />
            </Card>
          </div>
          {["Even", "Uneven"].map((type, idx) => (
            <div key={idx} className="mb-6">
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                {type} Workload Results
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
                      <tr>
                        <td
                          colSpan={6}
                          className="p-4 text-center text-gray-500"
                        >
                          Unfortunately, No data available
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 bg-blue-gray-50 text-[#273f82]">
          <Typography
            variant="h2"
            color="blue-gray"
            className="mb-6 text-center text-sm rounded-full shadow-md text-[#273f82] border-[#1175c6] font-bold border-3 p-2 bg-[#fff] w-fit"
          >
            Datacenter Visualization (No Data Yet)
          </Typography>

          <Card className="p-4 shadow-lg mb-6">
            <div className="h-[400px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <Typography color="gray" className="text-center">
                Datacenter visualization will appear here after simulation and
                upon submitting the form
              </Typography>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SkeletonLoader;
