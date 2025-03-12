import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
// import LinkedInButton from './components/LinkedInButton';
import { Input, Typography } from "@material-tailwind/react";
import Stepper from "./components/StepsContainer";
import HelpButton from "./components/Help";
import HelpModal from "./components/HelpModal"; 

function App() {
  //state toggle for left container
  const [isLeftContainerVisible, setIsLeftContainerVisible] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  //recycle code from prelim proj

  return (
    <>
      <div className="page">
        <div className="app">
          <div className="flex justify-between items-center bg-[#319795] px-3 col-span-3 w-full">
            {" "}
            {/* header */}
            <h5 className="capitalize w-full py-4 font-bold text-center text-zinc-50">
              Cloud Load Balancing Simulation using Round Robin Algorithm
            </h5>
          </div>
          <div className="fixed top-24 left-10 z-10">
            {" "}
            {/* btn toggle left  */}
            <Button
              onClick={() => setIsLeftContainerVisible(!isLeftContainerVisible)}
            >
              {isLeftContainerVisible ? "Hide" : "Show"}
            </Button>
          </div>

          <Stepper isVisible={isLeftContainerVisible} />
          <div className="bg-[#fff] col-[2/3] row-[2/3] p-4 mx-4"></div>
          {/* left side based on design*/}
          <div className="min-h-full  bg-[#0c273e] col-[3/4] row-[2/3] p-4 ml-38">
            <div className="grid grid-rows-2 gap-4 h-full">
              {/* sample msg kemerut*/}
              <div className="row-span-1 rounded-lg p-4 bg-[#212121] console overflow-y-auto max-h-[500px] max-h-full">
                {" "}
                {/* console stuff */}
                <pre className="font-mono text-xs leading-relaxed text-gray-300 whitespace-pre-wrap text-left">
                  {/* {`[2025-02-28 00:42:15] INFO: Round Robin Simulator initialized. Version 1.2.3
[2025-02-28 00:42:15] INFO: CloudSim core modules loaded successfully
[2025-02-28 00:42:16] INFO: Creating datacenter with 4 hosts
[2025-02-28 00:42:16] INFO: Host 1 configured: 16 cores, 64GB RAM, 2TB storage
[2025-02-28 00:42:16] INFO: Host 2 configured: 16 cores, 64GB RAM, 2TB storage
[2025-02-28 00:42:16] INFO: Host 3 configured: 16 cores, 64GB RAM, 2TB storage
[2025-02-28 00:42:16] INFO: Host 4 configured: 16 cores, 64GB RAM, 2TB storage
[2025-02-28 00:42:17] INFO: Round Robin load balancer initialized
[2025-02-28 00:42:17] INFO: Creating 5 VM instances as requested by user`} */}
                </pre>{" "}
                {/* dummy poo display*/}
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
          <div className="bg-[#319795] col-span-3 row-[4/4] p-4 text-white flex justify-center items-center">
            <p className="text-sm">© 2025 Developed by Group 7 as Partial Fulfillment on our SE Project </p>
          </div>
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
