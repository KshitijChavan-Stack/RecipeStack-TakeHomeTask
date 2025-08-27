import React from 'react';

const ErrorMessage = ({ error, message }) => {
  const errorMessage = error || message;
  if (!errorMessage) return null;

  return (
    <div className="bg-gradient-to-r from-red-50 to-red-100 text-red-600 px-8 py-6 rounded-2xl border-2 border-red-200 max-w-2xl mx-auto mb-8 text-center relative overflow-hidden shadow-lg shadow-red-100">
      <div className="text-3xl mb-4 animate-bounce">⚠️</div>
      <div className="relative z-10 text-lg font-medium">{errorMessage}</div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
    </div>
  );
};

export default ErrorMessage;
