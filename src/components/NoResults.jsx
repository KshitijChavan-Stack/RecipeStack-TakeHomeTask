import React from 'react';

const NoResults = ({ ingredient }) => {
  if (!ingredient) return null;

  return (
    <div className="text-center text-gray-500 my-12">
      <div className="text-6xl mb-4">🔍</div>
      <p className="text-xl font-medium mb-2">No recipes found</p>
      <p className="text-lg">Try searching for a different ingredient!</p>
    </div>
  );
};

export default NoResults;
