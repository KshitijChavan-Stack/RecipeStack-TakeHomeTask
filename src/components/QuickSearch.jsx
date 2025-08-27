import React from 'react';
import { QUICK_SEARCH_OPTIONS } from '../utils/constants';

const QuickSearch = ({ onQuickSearch }) => {
  return (
    <div className="text-center mb-12">
      <p className="text-gray-600 text-base font-medium mb-6">Quick search:</p>
      <div className="flex gap-4 justify-center flex-wrap max-w-2xl mx-auto">
        {QUICK_SEARCH_OPTIONS.map((option, index) => (
          <button 
            key={index}
            type="button" 
            className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-blue-300 rounded-full text-sm font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 group"
            onClick={() => onQuickSearch(option.name.toLowerCase())}
          >
            <span className="text-lg mr-2 group-hover:scale-110 transition-transform duration-200">{option.emoji}</span>
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickSearch;
