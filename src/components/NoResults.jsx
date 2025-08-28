import React from 'react';

const NoResults = ({ ingredient, category }) => {
  if (!ingredient && !category) return null;
  return (
    <div className="text-center py-16 max-w-md mx-auto">
      <div className="text-8xl mb-6">🍽️</div>
      <div className="text-2xl font-bold text-gray-700 mb-3">No recipes found</div>
      <div className="text-gray-500 mb-6">Try searching for different ingredients or browse our popular recipes</div>
      <div className="flex flex-wrap justify-center gap-2 text-sm">
        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">Try: chicken</span>
        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">Try: pasta</span>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">Try: rice</span>
      </div>
    </div>
  );
};

export default NoResults;
