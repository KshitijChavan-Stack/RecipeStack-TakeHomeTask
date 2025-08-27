import React from 'react'
import { optimizeImageUrl } from '../../lib/img'

const MobileRecipeRow = ({ recipe, onOpen }) => {
  const img = optimizeImageUrl(recipe.image, { width: 160 })
  return (
    <button onClick={()=>onOpen?.(recipe.id)} className="w-full text-left">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img src={img} alt={recipe.name} width={48} height={48} loading="lazy" className="w-12 h-12 rounded-full object-cover"/>
          <div>
            <p className="text-sm font-medium text-gray-900 line-clamp-1">{recipe.name}</p>
            <div className="mt-1 flex items-center gap-3 text-[11px] text-gray-500">
              <span>{(recipe.prepTimeMinutes||5)+(recipe.cookTimeMinutes||4)} min</span>
              <span className="flex items-center gap-1">•<span>{recipe.servings||2}</span></span>
              <span>{recipe.caloriesPerServing||200} kcal</span>
            </div>
          </div>
        </div>
        <span className="text-gray-400">›</span>
      </div>
    </button>
  )
}

export default MobileRecipeRow
