import React from 'react';

const QuickSearch = ({ onQuickSearch }) => {
  const quickSearchItems = [
    { label: 'Chicken', emoji: '🐔' },
    { label: 'Seafood', emoji: '🦐' },
    { label: 'Vegetarian', emoji: '🥬' },
    { label: 'Dessert', emoji: '🍰' },
    { label: 'Pasta', emoji: '🍝' },
    { label: 'Vegan', emoji: '🌱' },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">Quick Search</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {quickSearchItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onQuickSearch(item.label)}
            className="bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 p-4 rounded-lg transition-all duration-200 flex flex-col items-center gap-2 hover:shadow-sm"
          >
            <span className="text-xl">{item.emoji}</span>
            <span className="text-sm font-medium text-gray-700">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickSearch;
