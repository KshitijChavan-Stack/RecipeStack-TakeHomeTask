import React from 'react';

const ErrorMessage = ({ error }) => {
  return (
    <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-6 text-center mx-auto max-w-md shadow-lg">
      <div className="text-4xl mb-4">😔</div>
      <div className="text-xl font-bold text-red-700 mb-2">Oops! Something went wrong</div>
      <div className="text-red-600 mb-4">{error}</div>
      <div className="text-sm text-red-500">Please try searching again in a moment</div>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorMessage;
