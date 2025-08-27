import React from 'react'

const WebHeaderBar = ({ query, onQuery }) => {
  return (
    <div className="flex items-center justify-between p-6 pb-2">
      <div className="flex items-center gap-3 bg-white border rounded-full px-4 py-2 w-full max-w-lg shadow-sm">
        <span className="text-gray-400">🔍</span>
        <input
          value={query}
          onChange={(e)=>onQuery?.(e.target.value)}
          placeholder="Search recipes..."
          className="flex-1 outline-none text-sm"
        />
      </div>
      <div className="hidden md:flex items-center gap-3 text-xl text-gray-600">
        <span>🔔</span>
        <span>⚙️</span>
      </div>
    </div>
  )
}

export default WebHeaderBar

