import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="text-center">
        <div className="relative mb-8">
          {/* Minimal animated spinner */}
          <div className="w-16 h-16 mx-auto relative">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-3 flex items-center justify-center">
              <span className="text-lg animate-pulse">🍳</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-lg font-medium text-gray-800">Loading recipes...</p>
          <p className="text-sm text-gray-500">This should only take a moment</p>
          <div className="flex justify-center space-x-1 mt-4">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;