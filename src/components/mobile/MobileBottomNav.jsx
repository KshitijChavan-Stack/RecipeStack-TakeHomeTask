import React from 'react'

const items = [
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'recipes', label: 'Recipes', icon: '📖' },
  { key: 'plan', label: 'Meal Plan', icon: '🧾' },
  { key: 'profile', label: 'Profile', icon: '👤' },
]

const MobileBottomNav = ({ active='home', onSelect }) => {
  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-30">
      <div className="bg-white/95 shadow-lg rounded-3xl px-6 py-3 flex items-center gap-6 border">
        {items.map(i => (
          <button 
            key={i.key} 
            onClick={()=>onSelect?.(i.key)} 
            className={`flex flex-col items-center text-[11px] ${active===i.key? 'text-orange-500':'text-gray-400'}`}
          >
            <span className="text-xl leading-none">{i.icon}</span>
            {i.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MobileBottomNav
