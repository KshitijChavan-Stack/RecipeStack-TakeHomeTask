import React, { useState } from 'react'
import { optimizeImageUrl } from '../../lib/img'

const MobileRecommended = ({ recipes = [] }) => {
  const [favs, setFavs] = useState({})
  const toggle = (id) => setFavs(prev => ({...prev, [id]: !prev[id]}))

  return (
    <div className="px-4 mt-4">
      <h3 className="text-base font-semibold text-gray-900 mb-3">Recommended</h3>
      <div className="grid grid-cols-1 gap-4">
        {recipes.slice(0, 6).map(r => (
          <div key={r.id} className="rounded-2xl overflow-hidden bg-white shadow">
            <div className="relative">
              <img src={optimizeImageUrl(r.image, { width: 720 })} alt={r.name} loading="lazy" className="w-full h-56 object-cover"/>
              <button onClick={()=>toggle(r.id)} className="absolute bottom-3 right-3 text-xl">
                {favs[r.id] ? '❤️' : '🤍'}
              </button>
            </div>
            <div className="px-3 py-3">
              <p className="text-sm font-semibold text-gray-900">{r.name}</p>
              <p className="text-[11px] text-gray-500 mt-1">{r.ingredients?.length || 6} ingredients • {(r.prepTimeMinutes||20)} min</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MobileRecommended

