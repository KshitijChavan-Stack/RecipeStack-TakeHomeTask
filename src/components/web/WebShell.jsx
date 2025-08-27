import React from 'react'
import WebSidebar from './WebSidebar'
import WebHeaderBar from './WebHeaderBar'
import WebCategoryTabs from './WebCategoryTabs'
import { optimizeImageUrl } from '../../lib/img'

const Card = ({ r, onOpen }) => (
  <div className="bg-white rounded-2xl shadow border border-gray-100">
    <img src={optimizeImageUrl(r.image,{width:420})} alt={r.name} className="w-full h-36 object-cover rounded-t-2xl"/>
    <div className="p-3">
      <div className="text-sm font-semibold line-clamp-1">{r.name}</div>
      <div className="text-[11px] text-gray-500 mt-1">20 mins • ⭐ 4.7</div>
      <button onClick={()=>onOpen?.(r.id)} className="mt-3 w-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded-full py-2">View Recipe</button>
    </div>
  </div>
)

const WebShell = ({ query, onQuery, recipes, onOpen, children, activeCategory='pizza', onCategory }) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="flex">
        <WebSidebar />
        <main className="flex-1">
          <WebHeaderBar query={query} onQuery={onQuery} />
          <div className="px-6">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-center">Learn, Cook, & Eat your food</h1>
              <div className="flex justify-center mb-4">
                <WebCategoryTabs active={activeCategory} onPick={onCategory} />
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recipes.slice(0,8).map(r => (
                  <Card key={r.id} r={r} onOpen={onOpen} />
                ))}
              </div>

              <div className="mt-8">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default WebShell
