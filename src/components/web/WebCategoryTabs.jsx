import React from 'react';

const WebCategoryTabs = ({ active = 'pizza', onPick }) => {
  // This is hard-coded; can be fetched from a backend API service if needed
  const cats = ['Onions', 'Dessert', 'Butter', 'Tomatoes', 'garlic'];
  return (
    <div className="flex gap-2 flex-wrap justify-center items-center p-2">
      {cats.map((c) => (
        <button
          key={c}
          onClick={() => onPick?.(c.toLowerCase())}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
            active.toLowerCase() === c.toLowerCase()
              ? 'bg-black text-white border-black shadow-md'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:shadow-sm'
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
};

export default WebCategoryTabs;