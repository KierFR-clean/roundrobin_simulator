import { useState } from 'react'
import './App.css'
import Button from './components/Button';
// import LinkedInButton from './components/LinkedInButton';
import {Input, Typography } from "@material-tailwind/react";

function App() {
  //state toggle for left container 
  const [isLeftContainerVisible, setIsLeftContainerVisible] = useState(true);

  return (
    <>
      <div className='page'>
          <div className="app">
            <div className='flex justify-between items-center bg-[#319795] px-3 col-span-3 w-full'>  {/* header */}
              <h5 className='capitalize w-full py-4 font-bold text-center text-zinc-50'>
                Cloud Load Balancing Simulation using Round Robin Algorithm
              </h5>
            </div>
            <div className="fixed top-24 left-10 z-10"> {/* btn toggle left  */}
  <Button onClick={() => setIsLeftContainerVisible(!isLeftContainerVisible)}>
    {isLeftContainerVisible ? 'Hide' : 'Show'}
  </Button>
</div>
            {/* panel being toggled*/}
            <div className={`
              bg-[#f8f8f8] mt-0.5 mb-0.5 col-[1/2] row-[2/4] p-4 border-2 border-[#319795] rounded-tr-md rounded-br-md shadow-md
              transition-all duration-300 
              ${isLeftContainerVisible ? 'translate-x-0' : '-translate-x-full'}
            `}>
            <Typography
              variant="h4"
              color="blue"
              className='mb-4 font-bold text-gray-800'
            > {/* just trying this, but there's issue with typescript type checking so whether to change to use react components or not idk*/}
              Hi <span className='marked italic'>There!!!</span>
            </Typography>
            <Typography color="gray" className="mt-1 font-normal text-gray-800">
               Let's get you <span className='marked italic'>Started! </span>
      </Typography>

      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 p-2 ">
        <div className="mb-1 flex flex-col gap-6 bg-amber-50 rounded-sm p-3 border-2 border-[#3b3f3f]">
          <Typography variant="h6"  className="-mb-3 font-bold text-orange-400 text-sm">
            Number of VM's
          </Typography>
          <Input
            type="number"
            size="lg"
            placeholder="eg. 5"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-sm p-3 text-black "
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <div className='flex justify-end items-center'>
          <Button > Create Instances</Button> {/* don't know what to name but i just follow the design*/}
          </div>
        </div>
        </form>
            </div>

            <div className='bg-[#fff] col-[2/3] row-[2/3] p-4 mx-4'>
            </div>
              {/* left side based on design*/}
            <div className='bg-[#0c273e] col-[3/4] row-[2/3] p-4 ml-38'>
              <div className="grid grid-rows-2 gap-4 h-full">{/* sample msg kemerut*/}
              <div className="row-span-1 rounded-lg p-4 bg-[#212121] console overflow-y-auto max-h-[500px] max-h-full"> {/* console stuff */}
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
      </pre> {/* dummy poo display*/}
    </div>
    {/* about*/}
                <div className="row-span-1 bg-[#2196F3] rounded-lg p-4 mt-8">
                  <div className="flex justify-between items-center">
                  <p className='text-zinc-50 font-bold text-left text-md'>
                    About Our <span className='marked italic'>Software</span>
                  </p>
                  {/* <LinkedInButton size='sm' url="https://github.com/KierFR-clean/roundrobin_simulator" /> {} */} {/* i was wrong here supposed to be github icon */}
                  </div>
                  <h5 className='text-sm m-0.5 mt-2 text-justify items-center'> &nbsp; A simulation website demonstrating Round Robin (RR) Algorithm implementation for cloud load balancing efficiency. Serves as the team's first introduction to CloudSim framework, which will be essential for our upcoming research project. </h5>
                </div>
              </div>
            </div>

            <div className='bg-[#319795] col-span-3 row-[4/4] p-4 text-white flex justify-center items-center'>
            <p className='text-sm'>© 2025 Developed by TeamBa </p>
            </div>
          </div>
      </div>
    </>
  )
}

export default App
