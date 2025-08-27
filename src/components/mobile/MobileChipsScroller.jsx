import React from 'react'

const MobileChipsScroller = ({ items = [], onPick }) => {
  return (
    <div className="px-4">
      <div className="flex gap-3 overflow-x-auto pb-1">
        {items.map((label, idx) => (
          <button
            key={idx}
            onClick={()=>onPick?.(label.toLowerCase())}
            className="min-w-[110px] h-16 rounded-xl bg-orange-400 text-white text-xs font-semibold px-3 text-left shadow-sm"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MobileChipsScroller

