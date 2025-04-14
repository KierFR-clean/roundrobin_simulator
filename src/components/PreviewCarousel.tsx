import React, { useState, useEffect } from "react";
import Button from "./Button";
import algorithmSelect from "../assets/carousel/algo-config.png";
import resourceUtilization from "../assets/carousel/show-results.png";
import performanceAnalysis from "../assets/carousel/insights.png";
import algorihmConfig from "../assets/carousel/param.png";
const previews = [
  {
    title: "Algorithm Selection",
    description:
      "Select between Round Robin and other load balancing algorithms",
    image: algorithmSelect,
    stats: {
      efficiency: "85%",
      distribution: "Even",
      scalability: "High",
    },
  },
  {
    title: "Algorithm Configuration",
    description:
      "Select and configure your load balancing algorithm with our intuitive interface",
    image: algorihmConfig,
    stats: {
      setup: "Simple",
      options: "Multiple",
      config: "Flexible",
    },
  },
  {
    title: "Real-time Monitoring",
    description:
      "Watch your load balancing strategy in action with live performance metrics",
    image: resourceUtilization,
    stats: {
      latency: "Real-time",
      metrics: "Detailed",
      tracking: "Live",
    },
  },
  {
    title: "Performance Analysis",
    description:
      "Analyze detailed performance metrics and resource distribution",
    image: performanceAnalysis,
    stats: {
      data: "Comprehensive",
      insights: "Deep",
      export: "Available",
    },
  },
];

const PreviewCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === previews.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === previews.length - 1 ? 0 : prevIndex + 1
    );
    setIsPaused(true);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? previews.length - 1 : prevIndex - 1
    );
    setIsPaused(true);
  };

  useEffect(() => {
    if (isPaused) {
      const resumeTimer = setTimeout(() => {
        setIsPaused(false);
      }, 5000);

      return () => clearTimeout(resumeTimer);
    }
  }, [isPaused]);

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden">
        <div className="relative h-[330px]">
          <img
            src={previews[currentIndex].image}
            alt={previews[currentIndex].title}
            className="w-full h-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "./placeholder.png";
            }}
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center font-semibold text-md *:text-[white] shadow-md">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">
                  {previews[currentIndex].title}
                </h3>
                <p className="text-sm mb-4 px-4">
                  {previews[currentIndex].description}
                </p>

                <div className="grid grid-cols-3 gap-4 px-8">
                  {Object.entries(previews[currentIndex].stats).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="bg-[#fffbeb] rounded p-2 shadow-md border-2 border-[#1175c6]"
                      >
                        <div className="text-xs uppercase text-[#F7AC54]">
                          {key}
                        </div>
                        <div className="font-semibold text-sm text-[#F7AC54]">
                          {value}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between p-4 bg-[#1175c6]">
        <Button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#F7AC54] text-white p-2 rounded-full hover:bg-[#f69b31] transition-colors"
        >
          Back
        </Button>
        <Button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#F7AC54] text-white p-2 rounded-full hover:bg-[#f69b31] transition-colors"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PreviewCarousel;
