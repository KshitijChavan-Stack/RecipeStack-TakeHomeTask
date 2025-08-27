import React from 'react';
import { POPULAR_SUGGESTIONS } from '../utils/constants';

const PopularSuggestions = ({ onSuggestionClick }) => {
  return (
    <div className="text-center my-16">
      <h3 className="text-2xl md:text-3xl text-gray-800 font-bold mb-8">Popular Ingredients to Try</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-7xl mx-auto px-6">
        {POPULAR_SUGGESTIONS.map((suggestion, index) => (
          <div 
            key={index} 
            className="bg-white border-2 border-gray-200 rounded-3xl p-6 cursor-pointer transition-all duration-300 hover:border-blue-400 hover:-translate-y-3 hover:shadow-xl hover:shadow-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 group"
            onClick={() => onSuggestionClick(suggestion.name.toLowerCase())}
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">{suggestion.emoji}</div>
            <div className="font-bold text-gray-800 mb-2 text-base leading-tight">{suggestion.name}</div>
            <div className="text-gray-500 text-sm font-medium bg-gray-50 px-3 py-1.5 rounded-full">{suggestion.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularSuggestions;
