import React from 'react'

const MobileTopTabs = ({ active = 'all', favoriteCount = 3, onTab }) => {
  return (
    <div className="sticky top-0 z-20 bg-white/95 backdrop-blur px-4 pt-3 pb-2 border-b">
      <div className="flex items-center justify-between">
        <button
          onClick={() => onTab?.('all')}
          className={`text-sm font-semibold pb-2 border-b-2 ${
            active === 'all' ? 'border-lime-400 text-gray-900' : 'border-transparent text-gray-500'
          }`}
        >
          All recipes
        </button>
        <button
          onClick={() => onTab?.('favorite')}
          className={`text-sm font-semibold pb-2 flex items-center gap-1 border-b-2 ${
            active === 'favorite' ? 'border-lime-400 text-gray-900' : 'border-transparent text-gray-500'
          }`}
        >
          Favorite
          <span className="ml-1 inline-flex items-center justify-center text-[10px] font-bold bg-lime-400 text-gray-900 rounded-full w-4 h-4">
            {favoriteCount}
          </span>
        </button>
      </div>
    </div>
  )
}

export default MobileTopTabs





