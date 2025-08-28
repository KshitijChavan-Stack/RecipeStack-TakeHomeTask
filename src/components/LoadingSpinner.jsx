import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="flex flex-col items-center gap-6 bg-white bg-opacity-90 backdrop-blur-md rounded-xl p-6 border border-gray-200 shadow-lg">
        <div className="relative w-16 h-16">
          <div className="w-16 h-16 border-4 border-t-yellow-400 border-b-gray-200 border-l-gray-200 border-r-gray-200 rounded-full animate-spin"></div>
          <div className="absolute inset-2 flex items-center justify-center">
            <div className="w-8 h-8 bg-yellow-400 rounded-full animate-pulse opacity-75"></div>
          </div>
        </div>
        <div className="text-gray-800 text-lg font-semibold tracking-wide text-center">
          Preparing your recipes...
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;