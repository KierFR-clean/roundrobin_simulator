import { useEffect, useState } from "react";

interface SkeletonLoaderProps {
  count?: number;
  //need to simulate minutes
  onLoadingComplete?: () => void;
  minLoadingTime?: number;
}
//random skeleton loader found on net
const SkeletonLoader = ({
  count = 1,
  onLoadingComplete,
  minLoadingTime = 2000,
}: SkeletonLoaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  //compo clean up just to ensure
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onLoadingComplete?.();
    }, minLoadingTime);

    return () => clearTimeout(timer);
  }, [minLoadingTime, onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className="flex flex-col gap-4">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="shadow-sm mx-auto w-full max-w-sm rounded-md border-4 border-[#1175c6] p-4"
        >
          <div className="flex animate-pulse space-x-4">
            <div className="size-10 rounded-full bg-[#f6ad55]"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 rounded bg-gray-200"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                  <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                </div>
                <div className="h-2 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
