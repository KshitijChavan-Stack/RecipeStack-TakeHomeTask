import React, { useEffect, useState } from 'react'
import { recipeService } from '../../services/recipeService'
import { optimizeImageUrl } from '../../lib/img'

const Overlay = ({ open, onClose }) => {
  if (!open) return null
  return (
    <button
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
      onClick={onClose}
    />
  )
}

const DetailsCard = ({ open, children }) => {
  if (!open) return null
  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-4 w-[92%] max-w-md z-50">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden animate-slideUp will-change-transform transition-transform duration-200 ease-out">
        {children}
      </div>
    </div>
  )
}

const MobileRecipeDetails = ({ recipeId, open, onClose }) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open || !recipeId) return
    let cancelled = false
    const load = async () => {
      try {
        setLoading(true)
        const res = await recipeService.getRecipeById(recipeId)
        if (!cancelled) setData(res)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [open, recipeId])

  if (!open) return null

  return (
    <>
      <Overlay open={open} onClose={onClose} />
      <DetailsCard open={open}>
        {loading || !data ? (
          <div className="p-6 text-center text-sm text-gray-500">Loading…</div>
        ) : (
          <div>
            {/* Header Image */}
            <div className="relative">
              <img
                src={optimizeImageUrl(data.image, { width: 900 })}
                alt={data.name}
                className="w-full h-56 object-cover"
              />
              <div className="absolute top-3 right-3">
                <button className="bg-white/80 backdrop-blur-md rounded-full p-2 shadow-md hover:bg-white transition">
                  🤍
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="max-h-[60vh] overflow-y-auto mini-scrollbar px-4 py-5">
              {/* Title + Meta */}
              <h2 className="text-xl font-bold text-gray-900">{data.name}</h2>
              <p className="text-[12px] text-gray-500 mb-3">
                {(data.ingredients?.length || 6)} ingredients
              </p>

              <div className="grid grid-cols-2 text-xs text-gray-700 mb-4">
                <div className="flex items-center gap-1">⏱ {data.prepTimeMinutes || 20} min</div>
                <div className="flex items-center gap-1">🔥 {data.caloriesPerServing || 230} Kcal</div>
              </div>

              {/* Ingredients */}
              <h4 className="font-semibold text-gray-900 mb-3">Ingredients</h4>
              <div className="flex gap-3 overflow-x-auto pb-3 mini-scrollbar-x">
                {(data.ingredients || []).slice(0, 10).map((ing, idx) => (
                  <div
                    key={idx}
                    className="min-w-[110px] rounded-2xl bg-orange-50 p-3 text-center shadow-sm hover:shadow-md transition"
                  >
                    <div className="text-2xl mb-2">🥗</div>
                    <div className="text-xs font-medium text-gray-800 line-clamp-1">{ing}</div>
                  </div>
                ))}
              </div>

              {/* Instructions */}
              <h4 className="font-semibold text-gray-900 mt-6 mb-3">Cooking instructions</h4>
              <ol className="space-y-3">
                {(data.instructions || [data.instructions])
                  .filter(Boolean)
                  .flat()
                  .map((step, i) => (
                    <li
                      key={i}
                      className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 text-sm text-gray-800 shadow-sm hover:shadow-md transition"
                    >
                      <div className="font-semibold mb-1">Step {i + 1}</div>
                      {step}
                    </li>
                  ))}
              </ol>
            </div>
          </div>
        )}
      </DetailsCard>
    </>
  )
}

export default MobileRecipeDetails
