import React from 'react';

const SearchBar = ({ 
  ingredient, 
  setIngredient, 
  onSubmit, 
  loading, 
  placeholder 
}) => {
  return (
    <form onSubmit={onSubmit} className="mb-12 relative z-20">
      <div className="max-w-4xl mx-auto">
        {/* Search heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Search
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Millions of recipes, ingredients, and cooking collections
          </p>
        </div>
        
        {/* Enhanced search bar */}
        <div className="relative max-w-3xl mx-auto">
          <div className="relative">
            {/* Magnifying glass icon */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* Search input */}
            <input
              type="text"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              placeholder={placeholder}
              className="w-full pl-14 pr-6 py-5 text-lg bg-gray-50 border border-gray-200 rounded-2xl 
                         focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-300 
                         transition-all duration-200 placeholder-gray-400 relative z-20"
            />
            
            {/* Search button */}
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-3 
                         bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl 
                         transition-all duration-200 focus:outline-none focus:ring-4 
                         focus:ring-blue-200 disabled:opacity-60 disabled:cursor-not-allowed z-20"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
