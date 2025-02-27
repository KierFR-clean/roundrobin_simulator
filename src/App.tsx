import { useState } from 'react'
import './App.css'
import Button from './components/Button';

function App() {
  const [isLeftContainerVisible, setIsLeftContainerVisible] = useState(true);

  return (
    <>
      <div className='page'>
          <div className="app">
            <div className='flex justify-between items-center bg-[#319795] px-3 col-span-3 w-full'> 
              <h5 className='capitalize w-full py-4 font-bold text-center text-zinc-50'>
                Cloud Load Balancing Simulation using Round Robin Algorithm
              </h5>
            </div>
            <div className="fixed top-24 left-10 z-10">
  <Button onClick={() => setIsLeftContainerVisible(!isLeftContainerVisible)}>
    {isLeftContainerVisible ? 'Hide' : 'Show'}
  </Button>
</div>

            <div className={`
              bg-[#b9d5ec] mt-0.5 mb-0.5 col-[1/2] row-[2/4] p-4 border-2 border-[#319795] rounded-tr-md rounded-br-md shadow-md
              transition-all duration-300 
              ${isLeftContainerVisible ? 'translate-x-0' : '-translate-x-full'}
            `}>
            </div>

            <div className='bg-[#fff] col-[2/3] row-[2/3] p-4 mx-4'>
            </div>

            <div className='bg-[#113b5e] col-[3/4] row-[2/3] p-4 ml-40'>
              <div className="grid grid-rows-2 gap-4 h-full">
                <div className="row-span-1 rounded-lg p-4  bg-[#212121] console ">
                  <h5 className="font-bold text-zinc-50 text-left text-sm ">Metric Logs</h5>
                </div>
                <div className="row-span-1 bg-[#2196F3] rounded-lg p-4 mt-8">
                  <p className='text-zinc-50 font-bold text-left text-md '>About Our <span className='marked italic'>Software</span></p>
                </div>
              </div>
            </div>

            <div className='bg-[#319795] col-span-3 row-[4/4] p-4 text-white flex justify-center items-center'>
            <p>© 2025 Developed by TeamBa </p>
            </div>
          </div>
      </div>
    </>
  )
}

export default App
