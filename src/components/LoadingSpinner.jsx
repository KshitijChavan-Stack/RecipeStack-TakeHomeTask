import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur flex justify-center items-center z-50">
      <div className="flex flex-col items-center gap-8 bg-white bg-opacity-10 backdrop-blur rounded-3xl p-8 border border-white border-opacity-20">
        <div className="relative w-32 h-20">
          <div className="w-24 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-t-full relative shadow-2xl">
            <div className="w-10 h-2 bg-gray-600 rounded absolute -left-8 top-6"></div>
            <div className="absolute top-5 left-5 w-16 h-5">
              <div className="w-1.5 h-1.5 bg-teal-400 rounded-full absolute top-0 left-0 animate-pulse pulse-glow"></div>
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full absolute top-2 left-4 animate-pulse pulse-glow" style={{animationDelay: '0.3s'}}></div>
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full absolute top-0.5 left-8 animate-pulse pulse-glow" style={{animationDelay: '0.6s'}}></div>
            </div>
          </div>
        </div>
        <div className="relative w-48 h-28">
          <div className="w-5 h-5 bg-red-500 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 floating"></div>
          <div className="w-4.5 h-4.5 bg-gray-100 rounded-full absolute top-6 left-10 floating" style={{animationDelay: '0.5s'}}></div>
          <div className="w-4 h-4 bg-green-500 rounded-full absolute top-11 left-16 floating" style={{animationDelay: '1s'}}></div>
          <div className="w-4.5 h-4.5 bg-purple-600 rounded-full absolute top-16 left-11 floating" style={{animationDelay: '1.5s'}}></div>
        </div>
        <div className="text-gray-100 text-lg font-medium tracking-wide text-shadow-lg">
          Cooking up delicious recipes...
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
