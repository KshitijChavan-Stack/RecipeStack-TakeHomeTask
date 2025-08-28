import React from 'react'

const MobilePopularList = ({ recipes = [], onOpen }) => {
  if (!recipes || recipes.length === 0) return null

  return (
    <div className="mx-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-gray-900">Popular Recipes</h3>
        <button className="text-xs text-blue-600">See All</button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
        {recipes.map((r) => (
          <div
            key={r.id}
            className="min-w-[220px] snap-start bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <img src={r.image} alt={r.name} className="h-28 w-full object-cover" />
            <div className="p-3">
              <p className="text-sm font-semibold text-gray-900 line-clamp-2">{r.name}</p>
              <div className="mt-2 flex items-center justify-between text-[11px] text-gray-600">
                <span>{r.caloriesPerServing || 200} Calories</span>
                <span>•</span>
                <span>{(r.prepTimeMinutes||10)+(r.cookTimeMinutes||10)} min</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MobilePopularList





