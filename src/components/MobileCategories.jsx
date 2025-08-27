import React from 'react'

const categories = [
  { name: 'Popular', active: true },
  { name: 'Desert', active: false },
  { name: 'Noodle', active: false },
]

const MobileCategories = ({ onSelect }) => {
  return (
    <div className="mx-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-gray-900">Category</h3>
        <button className="text-xs text-blue-600">See All</button>
      </div>
      <div className="flex gap-2">
        {categories.map((c) => (
          <button
            key={c.name}
            onClick={() => onSelect?.(c.name.toLowerCase())}
            className={
              `px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                c.active ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'
              }`
            }
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MobileCategories

