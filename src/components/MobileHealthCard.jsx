import React from 'react'

const MobileHealthCard = () => {
  return (
    <div className="mx-4 mb-6 rounded-2xl p-4 bg-gradient-to-br from-teal-200 via-teal-300 to-teal-400 text-gray-900 shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-800/80 mb-1">Feeling Better!</p>
          <p className="text-sm font-medium max-w-[180px]">Keep you healthy life with healthy food</p>
          <div className="mt-3 flex items-center gap-4 text-xs">
            <div>
              <div className="font-bold leading-none">421g</div>
              <div className="opacity-80">Protein</div>
            </div>
            <div>
              <div className="font-bold leading-none">1052kcal</div>
              <div className="opacity-80">Calories</div>
            </div>
          </div>
        </div>
        <div className="w-20 h-20 rounded-xl bg-white/40 backdrop-blur flex items-center justify-center">
          <span className="text-3xl">🥗</span>
        </div>
      </div>
    </div>
  )
}

export default MobileHealthCard





