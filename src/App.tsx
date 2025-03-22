import { useState, useEffect } from "react";
import "./App.css";
import Button from "./components/Button";
// import LinkedInButton from './components/LinkedInButton';
//import { Input, Typography } from "@material-tailwind/react";
import Stepper from "./components/StepsContainer";
import HelpButton from "./components/Help";
import HelpModal from "./components/HelpModal";
import SkeletonLoader from "./components/dashboard/SkeletonLoader";
//import Result from "./components/dashboard/Result";
import DashboardView from "./components/dashboard/DashboardView";
import VisualizationView from "./components/dashboard/VisualizationView";
import Loader from "./components/Loader";

//test the json
interface SimResponse {
  success: boolean;
  message: string;
  data?: any; //optional
}

function App() {
  //state toggle for left container
  const [isLeftContainerVisible, setIsLeftContainerVisible] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  //recycle code from prelim project
  const [consoleOutput, setConsoleOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [simResults, setSimResults] = useState<Record<string, any> | null>(
    null
  ); //needed to be obj before post
  //get last data
  const [lastdata, setLastData] = useState<any>(null);
  //to add btn for separate dashboard and visualization
  // decided just to separate the two given niche naman is simulator talaga no added content pa
  const [activeSection, setActiveSection] = useState<
    "dashboard" | "visualization"
  >("dashboard");

  const formatPayload = (formData: any) => {
    return {
      //[1]
      numHosts: parseInt(formData.datacenter.numHosts),
      numPesPerHost: parseInt(formData.datacenter.numPesPerHost),
      peMips: parseInt(formData.datacenter.peMips),
      ramPerHost: parseInt(formData.datacenter.ramPerHost),
      bwPerHost: parseInt(formData.datacenter.bwPerHost),
      storagePerHost: parseInt(formData.datacenter.storagePerHost),
      //[2]
      numVms: parseInt(formData.vm.numVms),
      vmMips: parseInt(formData.vm.vmMips),
      vmPes: parseInt(formData.vm.vmPes),
      vmRam: parseInt(formData.vm.vmRam),
      vmBw: parseInt(formData.vm.vmBw),
      vmSize: parseInt(formData.vm.vmSize),
      vmScheduler: formData.vm.vmScheduler,
      //[3]
      numCloudlets: parseInt(formData.cloudlet.numCloudlets),
      cloudletLength: parseInt(formData.cloudlet.cloudletLength),
      cloudletPes: parseInt(formData.cloudlet.cloudletPes),
      cloudletExecType: formData.cloudlet.cloudletExecType,
      //[4]
      workloadType: formData.workload.workloadType,
    };
  };

  //to restart simulation, act like a temp refresh
  const handleRestart = async () => {
    if (lastdata) {
      await handleFormSubmit(lastdata);
    } else {
      setSimResults(null);
      setIsLoading(false);
      setError(null);
    }
  };

  //added remover helper for clearing
  const handleClear = () => {
    setSimResults(null);
    setError(null);
    setLastData(null);
    setConsoleOutput("");
  };

  const fetchLogs = async () => {
    const currtimestamp = new Date().toLocaleString();
    try {
      const res = await fetch("http://localhost:8080/api/logs");
      let output;
      try {
        const data = await res.clone().json();
        output = JSON.stringify(data, null, 2);
      } catch (jsonError) {
        output = await res.text();
      }
      setConsoleOutput(
        `[${currtimestamp}] INFO: Simulation completed successfully\n` +
          `INFO: Round Robin load balancer initialized\n` +
          `INFO: Processing results...\n` +
          output
      );
    } catch (err: any) {
      setConsoleOutput(
        `[${currtimestamp}] Error fetching logs: ${err.message}`
      );
      console.log(err.message);
    }
  };

  const handleFormSubmit = async (formData: any) => {
    //save for later
    setLastData(formData);
    setIsLoading(true);
    setError(null); // assume
    const currtimestamp = new Date().toLocaleString();

    fetchLogs();
    setConsoleOutput(`Simulation started at ${currtimestamp}...\n`);

    try {
      const formattedpayload = formatPayload(formData);
      //I just set the cors to allow any origins muna
      const response = await fetch("http://localhost:8080/api/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedpayload),
      });

      if (!response.ok) {
        throw new Error("status: " + response.status);
      }

      const result: SimResponse = await response.json();

      //make dynamic
      setSimResults(result);
      await fetchLogs();
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "unknown error";
      setError(errMsg);
      setSimResults(null);
      setConsoleOutput((prev) => prev + `\nError: ${errMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={`page ${!isLeftContainerVisible ? "left-hidden" : ""}`}>
        <div className="app">
          <Header />
          <div className="fixed top-24 left-10 z-10">
            {" "}
            {/* btn toggle left  */}
            <Button
              onClick={() => setIsLeftContainerVisible(!isLeftContainerVisible)}
            >
              {isLeftContainerVisible ? "Hide" : "Show"}
            </Button>
          </div>
          {/* call the form container*/}
          <Stepper
            isVisible={isLeftContainerVisible}
            onSubmit={handleFormSubmit}
            onClear={handleClear}
          />
          <div
            className={`bg-[#fff] transition-all duration-200 overflow-x-hidden ${
              isLeftContainerVisible
                ? "col-[2/3] row-[2/3] mx-4 w-[500px]"
                : "col-[1/3] row-[2/3] ml-4 mr-4"
            }`}
          >
            <div className="flex justify-between gap-4 mb-6 p-4">
              <Button
                className={
                  activeSection === "dashboard" ? "bg-[#319795] text-white" : ""
                }
                onClick={() => setActiveSection("dashboard")}
              >
                Dashboard
              </Button>
              <Button
                className={
                  activeSection === "visualization"
                    ? "bg-[#319795] text-white"
                    : ""
                }
                onClick={() => setActiveSection("visualization")}
              >
                Visualization
              </Button>
            </div>
            {(() => {
              console.log(simResults); //test
              if (isLoading) {
                return (
                  <div className="flex items-center justify-center h-full duration-300">
                    <Loader
                      minLoadingTime={2000}
                      count={1}
                      onLoadingComplete={() => setIsLoading(false)}
                    />
                  </div>
                );
              }

              if (!simResults) {
                return <SkeletonLoader section={activeSection} />;
              }

              return activeSection === "dashboard" ? (
                <DashboardView data={simResults} onRestart={handleRestart} />
              ) : (
                <VisualizationView data={simResults} />
              );
            })()}
          </div>
          {/* {isLoading ? (
              <div className="flex items-center justify-center h-full duration-300">
                <SkeletonLoader
                  count={1}
                  onLoadingComplete={() => setIsLoading(false)}
                  minLoadingTime={2000} //just for the loader to be seen
                />
              </div>
            ) : error ? (
              <div className="text-red-500 p-4 bg-red-50 rounded-full rounded-3">
                {error}
              </div>
            ) : ( */}
          {/* /* simResults ? ( */}

          {/* // )} */}

          {/* right side based on design*/}
          <div className="justify-self-end w-[238.4px] min-h-full bg-[#0c273e] col-[3/4] row-[2/3] p-4 ">
            <div className="grid grid-rows-2 gap-4 h-full">
              {/* sample msg kemerut*/}
              <div
                className="row-span-1 rounded-lg p-4 bg-[#212121] console overflow-y-auto 
              "
              >
                {" "}
                {/* console stuff */}
                {consoleOutput ? (
                  <pre className="font-mono text-xs leading-relaxed text-gray-300 whitespace-pre-wrap text-left">
                    {consoleOutput}
                  </pre>
                ) : (
                  <p className="text-gray-300 text-center text-xs mt-30">
                    Console logs will appear here once the simulation starts...
                  </p>
                )}{" "}
                {/* Display actual console output now */}
              </div>
              {/* about*/}
              <div className="row-span-1 bg-[#2196F3] rounded-lg p-4 mt-8">
                <div className="flex justify-between items-center">
                  <p className="text-zinc-50 font-bold text-left text-md">
                    About Our <span className="marked italic">Software</span>
                  </p>
                  {/* <LinkedInButton size='sm' url="https://github.com/KierFR-clean/roundrobin_simulator" /> {} */}{" "}
                  {/* i was wrong here supposed to be github icon */}
                </div>
                <h5 className="text-sm m-0.5 mt-2 text-justify items-center">
                  {" "}
                  &nbsp; A simulation website demonstrating Round Robin (RR)
                  Algorithm implementation for cloud load balancing efficiency.
                  Serves as the team's first introduction to CloudSim framework,
                  which will be essential for our upcoming research
                  project.{" "}
                </h5>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>

      {/* Help Button */}
      <HelpButton onClick={() => setModalShow(true)} />

      {/* Help Modal */}
      <HelpModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default App;

function Header({}) {
  return (
    <div className="flex justify-between items-center bg-[#319795] px-3 col-span-3 ">
      {" "}
      {/* header */}
      <h5 className="capitalize w-full py-4 font-bold text-center text-zinc-50">
        <span className="marked">Cloud</span> Load Balancing Simulation using
        Round Robin Algorithm
      </h5>
    </div>
  );
}

function Footer({}) {
  return (
    <div className="footer">
      <p className="text-sm">
        © 2025 Developed by Group 7 as Partial Fulfillment for our SoftEng
        Project{" "}
      </p>
    </div>
  );
}
