import React from 'react'

const MobileHomeHeader = ({ name='Michelle', query, onQuery }) => {
  return (
    <div className="px-4 pt-5 pb-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-gray-900">Hello, {name}</h1>
        <img src="https://i.pravatar.cc/48" alt="avatar" className="w-9 h-9 rounded-full"/>
      </div>
      <div className="mt-4 flex items-center gap-2 bg-gray-100 rounded-2xl px-4 py-3">
        <span className="text-gray-400">🔍</span>
        <input
          value={query}
          onChange={(e)=>onQuery?.(e.target.value)}
          placeholder="Search for recipes"
          className="flex-1 bg-transparent outline-none text-sm"
        />
      </div>
    </div>
  )
}

export default MobileHomeHeader





