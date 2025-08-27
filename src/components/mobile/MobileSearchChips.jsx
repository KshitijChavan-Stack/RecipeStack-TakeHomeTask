import React from 'react'

const chips = ['Breakfast', 'Lunch', 'Dinner', 'Fish dishes']

const MobileSearchChips = ({ value, onChange, onChip }) => {
  return (
    <div className="px-4 pt-3 pb-2">
      <div className="flex items-center gap-2 bg-gray-100 rounded-2xl px-3 py-2">
        <span className="text-gray-400">🔍</span>
        <input
          value={value}
          onChange={(e)=>onChange?.(e.target.value)}
          placeholder="search"
          className="flex-1 bg-transparent outline-none text-sm py-2"
        />
        <button className="text-gray-400">⚙️</button>
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {chips.map(c => (
          <button
            key={c}
            onClick={()=>onChip?.(c.toLowerCase())}
            className="px-3 py-1.5 bg-white border rounded-full text-xs text-gray-600 whitespace-nowrap"
          >{c}</button>
        ))}
      </div>
    </div>
  )
}

export default MobileSearchChips

