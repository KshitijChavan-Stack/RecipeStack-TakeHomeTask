import React, { useRef, useState, useMemo } from 'react'
import { optimizeImageUrl } from '../../lib/img'
import OptimizedImage from '../OptimizedImage'

/**
 * props:
 * - items: array of recipes [{ id, name, image, ... }]
 * - onSave(recipe)
 * - onDiscard(recipe)
 * - onOpen(id)
 */
const MobileSwipeStack = ({ items = [], onSave, onDiscard, onOpen }) => {
  const [index, setIndex] = useState(0)
  const startX = useRef(0)
  const currentX = useRef(0)
  const [dx, setDx] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [leaving, setLeaving] = useState(null) // 'left' | 'right' | null

  const cards = useMemo(() => items.slice(index, index + 3), [items, index])
  const active = cards[0]

  const reset = () => { setDx(0); setIsDragging(false) }

  const handleStart = (e) => {
    if (!active) return
    const touch = e.touches ? e.touches[0] : e
    startX.current = touch.clientX
    currentX.current = touch.clientX
    setIsDragging(true)
    setLeaving(null)
  }

  const handleMove = (e) => {
    if (!isDragging) return
    const touch = e.touches ? e.touches[0] : e
    currentX.current = touch.clientX
    const delta = currentX.current - startX.current
    setDx(delta)
  }

  const animateOut = (dir, recipe) => {
    setLeaving(dir)
    // after animation completes, advance deck
    setTimeout(() => {
      if (dir === 'right') onSave?.(recipe); else onDiscard?.(recipe)
      setIndex((i) => i + 1)
      setLeaving(null)
      setDx(0)
    }, 280)
  }

  const handleEnd = () => {
    if (!isDragging) return
    const threshold = 80
    const delta = dx
    const curr = active
    reset()
    if (!curr) return

    if (Math.abs(delta) < threshold) {
      onOpen?.(curr.id)
      return
    }

    animateOut(delta > 0 ? 'right' : 'left', curr)
  }

  return (
    <div className="relative h-[640px] select-none">
      {cards.slice(0).reverse().map((r, i) => {
        const isTop = i === cards.length - 1
        const timeMin = (r.prepTimeMinutes || 0) + (r.cookTimeMinutes || 0) || r.prepTimeMinutes || 20
        const baseScale = isTop ? 1 : (1 - (cards.length - 1 - i) * 0.06)

        let transform = `scale(${baseScale})`
        let transition = 'transform 200ms ease'
        if (isTop) {
          if (leaving) {
            const dirMult = leaving === 'right' ? 1 : -1
            transform = `translateX(${dirMult*700}px) translateY(60px) rotate(${dirMult*18}deg)`
            transition = 'transform 280ms cubic-bezier(.2,.8,.2,1)'
          } else {
            transform = `translateX(${dx}px) rotate(${dx/18}deg)`
            transition = isDragging ? 'none' : 'transform 200ms ease'
          }
        }

        return (
          <div
            key={r.id}
            className="absolute inset-0 flex items-start justify-center"
            style={{ zIndex: 30 + i, transform, transition }}
          >
            <div
              className="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
              onMouseDown={handleStart}
              onMouseMove={(e)=>isDragging && handleMove(e)}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
            >
              <div className="relative">
                <OptimizedImage 
                  src={r.image} 
                  alt={r.name} 
                  className="w-full h-[400px] rounded-t-2xl" 
                  width={400} 
                  height={400}
                />
                
                {/* Top badges */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                  <div className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                    {r.cuisine}
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                    ⭐ {r.rating || '4.5'}
                  </div>
                </div>

                {/* Center title overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="px-6 py-3 rounded-xl bg-black/70 text-white text-lg font-semibold backdrop-blur-sm text-center max-w-[280px]">
                    {r.name}
                  </div>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4">
                  <div className="flex justify-between items-end text-white">
                    <div className="flex items-center gap-3">
                      <span className="text-sm">⏱ {timeMin} min</span>
                      <span className="text-sm">🍽 {r.servings || 4} servings</span>
                    </div>
                    <div className="text-sm bg-white/20 backdrop-blur-sm px-2 py-1 rounded">
                      {r.difficulty || 'Medium'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50">
                <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">←</span>
                    <span>Skip</span>
                  </div>
                  <div className="w-px h-4 bg-gray-300"></div>
                  <div className="flex items-center gap-2">
                    <span>Save</span>
                    <span className="text-gray-400">→</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
      {!active && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">No more recipes</div>
      )}
    </div>
  )
}

export default MobileSwipeStack
