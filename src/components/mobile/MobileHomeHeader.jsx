import React from 'react'

const MobileHomeHeader = ({ name='Michelle', query, onQuery }) => {
  return (
    <div className="flex-1">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search for recipes, ingredients..."
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <span className="text-gray-400 text-sm">🔍</span>
        </div>
      </div>
    </div>
  )
}

export default MobileHomeHeader





