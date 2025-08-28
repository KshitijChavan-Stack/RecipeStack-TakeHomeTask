import React, { useEffect } from 'react';

const SearchBar = ({ 
  ingredient, 
  setIngredient, 
  onSubmit, 
  loading, 
  placeholder 
}) => {

  // Auto search whenever input changes (even 1 character)
  useEffect(() => {
    if (ingredient && ingredient.trim().length > 0) {
      const delayDebounce = setTimeout(() => {
        onSubmit(new Event("submit")); // mimic submit
      }, 500); // debounce to avoid spamming API
      return () => clearTimeout(delayDebounce);
    }
  }, [ingredient]);

  return (
    <form onSubmit={onSubmit} className="mb-12 relative z-20">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            🍳 Find Recipes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover millions of recipes by ingredients, diet, or cuisine.
          </p>
        </div>
        
        {/* Search bar */}
        <div className="relative max-w-3xl mx-auto">
          <div className="relative">
            {/* Icon */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* Input */}
            <input
              type="text"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              placeholder={placeholder}
              className="w-full pl-14 pr-6 py-5 text-lg bg-white shadow-sm border border-gray-200 
                         rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 
                         focus:border-blue-400 transition-all duration-200 placeholder-gray-400"
            />
            
            {/* Button */}
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-3 
                         bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl 
                         transition-all duration-200 focus:outline-none focus:ring-4 
                         focus:ring-blue-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"></path>
                  </svg>
                  <span>Searching...</span>
                </>
              ) : (
                "Search"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
