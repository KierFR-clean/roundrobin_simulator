import React from "react";
import Button from "../components/Button";
import { useNavigate } from "@tanstack/react-router";
import PreviewCarousel from "../components/PreviewCarousel";

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartSimulation = () => {
    navigate({ to: "/simulator" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative bg-white">
        <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-white m-10">
            <h1 className="text-5xl text-left font-bold tracking-tight mb-6">
              <span className="text-black">SIMULATE</span>{" "}
              <span className="text-[#F7AC54]">LOAD</span>
              <br />
              <span className="text-[#F7AC54]">BALANCING</span>
              <br />
              <span className="text-black">WITH</span>
              <br />
              <span className="text-black">DIFFERENT</span>
              <br />
              <span className="text-black">ALGORITHMS</span>
            </h1>
            <p className="text-md mb-8 text-gray-800 max-w-md">
              Visualize how different load balancing algorithms distribute
              traffic across multiple servers. Explore animations, real-time
              performance metrics, and interactive comparisons to understand
              their efficiency and effectiveness.
            </p>
            <div className="flex justify-center">
              <Button onClick={handleStartSimulation}>GET STARTED</Button>
            </div>
          </div>

          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden">
              <PreviewCarousel />
            </div>
          </div>
        </div>
      </div>

      {/* Walkthrough Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-2xl text-black font-semibold text-center mb-12">
            Simulation <span className="text-[#2196F3]">Walkthrough</span>
          </h1>

          <div className="space-y-16">
            {/* Step 1 */}
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-6 max-w-2xl">
                <div className="bg-[#F7AC54] text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                  1
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">
                    Select an Algorithm
                  </h2>
                  <p className="text-gray-700">
                    Start by navigating to the{" "}
                    <span className="font-semibold">dashboard</span> and opening
                    the <span className="font-semibold">sidebar</span>, where
                    you'll find a list of available load balancing algorithms.
                    Each algorithm distributes traffic differently, so choose
                    one that best suits your test scenario.
                  </p>
                </div>
              </div>
              <div className="w-64 h-64 bg-white-100 rounded-lg">
                <img
                  src="/algorithm.svg"
                  alt="Algorithm Selection"
                  className="w-167 h-60"
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center justify-between">
              <div className="w-64 h-64 bg-white-100 rounded-lg">
                <img
                  src="/data-center.svg"
                  alt="Algorithm Selection"
                  className="w-167 h-60"
                />
              </div>
              <div className="flex items-start gap-6 max-w-2xl">
                <div className="bg-[#F7AC54] text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                  2
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">
                    Configure Your Data Center
                  </h2>
                  <p className="text-gray-700">
                    Modify key settings such as the{" "}
                    <span className="font-semibold">
                      data center, virtual machines (VMs), cloudlet
                    </span>
                    , and{" "}
                    <span className="font-semibold">
                      workload configurations
                    </span>
                    . Adjusting these parameters allows you to test how the
                    selected algorithm performs under different conditions.{" "}
                    <span className="text-gray-500 italic">
                      [Refer to help for input descriptions]
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-6 max-w-2xl">
                <div className="bg-[#F7AC54] text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                  3
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">
                    Run and Analyze the Simulation
                  </h2>
                  <p className="text-gray-700">
                    Click the{" "}
                    <span className="font-semibold">"Run Simulation"</span>{" "}
                    button to start. Observe how traffic is distributed in
                    real-time and review important performance metrics like{" "}
                    <span className="font-semibold">
                      response time, resource utilization
                    </span>
                    , and{" "}
                    <span className="font-semibold">
                      traffic distribution efficiency
                    </span>
                    . Use these insights to compare algorithms and optimize your
                    setup.
                  </p>
                </div>
              </div>
              <div className="w-64 h-64 bg-white-100 rounded-lg">
                <img
                  src="/cpu.svg"
                  alt="Algorithm Selection"
                  className="w-167 h-60"
                />
              </div>
            </div>
          </div>

          {/* Bottom text */}
          <p className="text-gray-600 text-center mt-12 max-w-1xl mx-auto">
            By following these steps, you can explore how different load
            balancing algorithms distribute workloads across multiple servers.
            This simulation helps in evaluating system performance, optimizing
            resource allocation, and making data-driven decisions for efficient
            cloud management. Experiment with various configurations to
            understand which algorithm best suits your needs.
          </p>
        </div>
      </div>

      {/* New Section: User Workload Schema */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-2xl text-black font-semibold text-center mb-12">
            User Workload <span className="text-[#2196F3]">Schema</span>
          </h1>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
            <p className="text-gray-700 mb-4">
              To simulate a custom workload, you can upload a preprocessed CSV
              file in the simulator page. The CSV file must follow the schema
              below to be compatible with the simulation:
            </p>
            <ul className="text-left list-disc pl-5 text-gray-700 text-sm space-y-2">
              <li>
                <span className="font-semibold">job_id</span> (integer): Unique
                identifier for the job.
              </li>
              <li>
                <span className="font-semibold">task_index</span> (integer):
                Index of the task within the job.
              </li>
              <li>
                <span className="font-semibold">scheduling_class</span>{" "}
                (integer, 0-3): Priority class for scheduling (0-3).
              </li>
              <li>
                <span className="font-semibold">priority</span> (integer, 0-11):
                Task priority (0-11).
              </li>
              <li>
                <span className="font-semibold">cpu_request</span> (float, 0-1):
                Normalized CPU request (e.g., 0.1313).
              </li>
              <li>
                <span className="font-semibold">memory_request</span> (float,
                0-1): Normalized memory request (e.g., 0.1115).
              </li>
              <li>
                <span className="font-semibold">disk_space_request</span>{" "}
                (float, 0-1): Normalized disk space request (e.g., 0.0002108).
              </li>
              <li>
                <span className="font-semibold">time_seconds</span> (float):
                Task submission time in seconds (e.g., 0 or 4223.091001).
              </li>
              <li>
                <span className="font-semibold">duration</span> (float): Task
                duration in seconds (e.g., 672.770490608695).
              </li>
            </ul>
            <p className="text-gray-500 italic text-sm mt-4">
              Example:
              6231386746,73,3,9,0.1313,0.1115,0.0002108,0,672.770490608695
            </p>
            <p className="text-gray-600 text-sm mt-4 text-center">
              You can upload your workload in the simulator page after clicking
              "Get Started". If no file is uploaded, a default workload will be
              used.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#319795] text-left text-md text-white py-8">
        <div className="container mx-auto px-10 py-10">
          <h2 className="font-semibold text-md mb-2">
            Cloud Load Balancing Simulation
          </h2>
          <p className="text-sm mb-6">
            Empowering cloud efficiency through intelligent load balancing.
          </p>

          <div className="text-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold">• Need Help?</span>
              <span>Check out our</span>
              <a
                href="#"
                className="marked no-underline hover:underline text-inherit"
              >
                [User Guide]
              </a>
              <span>or</span>
              <a
                href="#"
                className="marked no-underline hover:underline text-inherit"
              >
                [Support Center]
              </a>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold">• Stay Updated</span>
              <span>– Follow us for the latest updates and improvements.</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold">• Feedback?</span>
              <span>We'd love to hear from you!</span>
              <a
                href="#"
                className="marked no-underline hover:underline  text-inherit"
              >
                [Send Feedback]
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
