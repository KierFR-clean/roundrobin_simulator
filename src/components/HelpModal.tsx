import React, { useState } from "react";

const helpContent = [
  {
    title: "SIMULATION: HELP",
    body: (
      <>
        <h3>Overview of Round Robin Load Balancing</h3>
        <p>
          Round Robin is a simple and efficient load balancing algorithm that
          distributes incoming requests sequentially across a set of servers.
          Each request is assigned to the next available server in a cyclic
          manner, ensuring that all servers receive an equal share of the
          workload over time.
        </p>
      </>
    ),
  },
  {
    title: "Input Descriptions",
    body: (
      <>
        <h4>Data Center Configuration</h4>
        <ul>
          <li>
            <b>Number of Data Centers:</b> The total number of data centers
            involved in load balancing.
          </li>
          <li>
            <b>Number of Hosts per Data Center:</b> The number of physical hosts
            in each data center.
          </li>
        </ul>

        <h4>Virtual Machine (VM) Configuration</h4>
        <ul>
          <li>
            <b>Total Number of VMs:</b> The sum of all VMs across data centers.
          </li>
          <li>
            <b>CPU Capacity per VM (MIPS):</b> Defines the processing power of
            each virtual machine.
          </li>
          <li>
            <b>Memory (RAM) per VM (MB):</b> Determines the amount of memory
            allocated to each VM.
          </li>
          <li>
            <b>Storage per VM (MB):</b> The disk storage assigned to each VM.
          </li>
          <li>
            <b>Bandwidth per VM (MBps):</b> The network capacity available for
            handling requests.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Cloudlet (Task) Configuration",
    body: (
      <>
        <ul>
          <li>
            <b>Number of Cloudlets (Requests/Tasks):</b> Total number of incoming requests for processing.
          </li>
          <li>
            <b>Cloudlet Length (MI):</b> Defines the computational demand of each task.
          </li>
          <li>
            <b>Number of Processing Elements (Cores) per Cloudlet:</b> The number of cores a cloudlet can use.
          </li>
          <li>
            <b>Cloudlet File Size (MB):</b> The file size of the task to be processed.
          </li>
          <li>
            <b>Cloudlet Output Size (MB):</b> The output data size after processing.
          </li>
          <li>
            <b>Utilization Model (Full, Stochastic, etc.):</b> Defines how cloudlets consume CPU, RAM, and bandwidth.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Load Balancing Parameters",
    body: (
      <>
        <ul>
          <li><b>Task Complexity:</b> Defines how demanding each request is in terms of resources.</li>
          <li><b>Scheduling Interval:</b> The frequency at which load balancing decisions are made.</li>
          <li><b>Processing Time per Request (ms):</b> The time taken by a VM to process a request (if applicable).</li>
          <li><b>Request Arrival Rate:</b> The frequency at which requests arrive in the system.</li>
          <li><b>Number of Requests:</b> The total number of incoming requests to be distributed.</li>
          <li><b>Simulation Duration:</b> The total time period for which the load balancing simulation runs.</li>
          <li><b>Start Simulation:</b> A button to initiate the Round Robin simulation.</li>
          <li><b>Number of Data Centers:</b> The total number of data centers involved in load balancing.</li>
          <li><b>Number of Virtual Machines (VMs) per Data Center:</b> Defines how many VMs each data center has.</li>
          <li><b>Total Number of VMs:</b> The sum of all VMs across data centers.</li>
        </ul>
      </>
    ),
  },
];

interface HelpModalProps {
  show: boolean;
  onHide: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ show, onHide }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < helpContent.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!show) return null;

  return (
    <>
      <style>
        {`
          .help-modal-container {
            position: fixed;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.5);
          }

          .help-modal {
            background: white;
            padding: 24px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            width: 600px;
            border: 1px solid #2FAEFE;
            position: relative;
            text-alignL left;
          }

          .modal-header h2,
          .modal-body h3,
          .modal-body h4 {
            text-align: center;
          }

          .modal-body ul {
            text-align: left;
          }

          .modal-body b {
            color: #FF8A07;
          
          }


          .close-button {
            position: absolute;
            top: 8px;
            right: 8px;
            font-size: 20px;
            color: #2FAEFE;
            background: transparent;
            border: none;
            cursor: pointer;
          }

          .modal-header {
            padding-bottom: 8px;
          }

          .modal-header h2 {
            font-size: 20px;
            font-weight: 600;
            color: #2FAEFE;
          }

          .modal-body {
            padding: 16px 0;
            color: black;
          }

          .modal-body h3 {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 8px;
          }

          .modal-body h4 {
            font-size: 14px;
            font-weight: bold;
            margin-top: 12px;
          }

          .modal-body ul {
            list-style: none;
            padding-left: 0;
          }

          .modal-body li {
            margin: 5px 0;
            color: black;
            font-size: 14px;
          }

          .modal-footer {
            display: flex;
            justify-content: space-between;
            margin-top: 16px;
          }

          .modal-button {
            padding: 8px 16px;
            border-radius: 20px;
            border: 1px solid #2FAEFE;
            background: white;
            color: #2FAEFE;
            cursor: pointer;
            transition: background 0.2s, color 0.2s;
          }

          .modal-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .modal-button:hover:not(:disabled) {
            background: #2FAEFE;
            color: white;
          }
        `}
      </style>

      <div className="help-modal-container">
        <div className="help-modal">
          <button className="close-button" onClick={onHide}>
            &times;
          </button>
          <div className="modal-header">
            <h2>{helpContent[currentStep].title}</h2>
          </div>
          <div className="modal-body">{helpContent[currentStep].body}</div>
          <div className="modal-footer">
            <button 
              className="modal-button" 
              onClick={handleBack} 
              disabled={currentStep === 0}
            >
              Back
            </button>
            <button 
              className="modal-button" 
              onClick={handleNext} 
              disabled={currentStep === helpContent.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpModal;
