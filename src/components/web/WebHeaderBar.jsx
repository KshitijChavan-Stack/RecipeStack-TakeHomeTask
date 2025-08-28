import React from "react";

const WebHeaderBar = ({ 
  query, 
  onQuery, 
  onSubmit, 
  loading, 
  cookLaterCount = 0, 
  onShowCookLater 
}) => {
  return (
    <div className="flex items-center justify-between px-4 md:px-8 py-4 bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      
      {/* Search Box */}
      <form 
        onSubmit={onSubmit} 
        className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 w-full max-w-lg 
                   shadow-sm transition-all duration-200 hover:border-gray-300 
                   focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100"
      >
        {/* Magnifying glass */}
        <span className="text-gray-400 text-xl">🔍</span>
        
        {/* Input */}
        <input
          value={query}
          onChange={(e) => onQuery?.(e.target.value)}
          placeholder="Search recipes..."
          className="flex-1 outline-none text-sm md:text-base text-gray-700 placeholder-gray-400 bg-transparent"
        />

        {/* Search button */}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-medium 
                     transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              {/* Spinner */}
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-12 12h4z"
                />
              </svg>
              Searching...
            </>
          ) : (
            "Search"
          )}
        </button>
      </form>

      {/* Cook Later Button */}
      <div className="flex items-center gap-4 ml-4">
        <button
          onClick={onShowCookLater}
          className="relative bg-white rounded-full p-3 shadow-md text-red-500 hover:bg-red-50 hover:shadow-lg 
                     transition-all duration-200"
          title="Cook later"
        >
          ❤️
          {cookLaterCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-sm">
              {cookLaterCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default WebHeaderBar;
