import React, { useRef, useState, useMemo } from 'react'
import { optimizeImageUrl } from '../../lib/img'

/**
 * props:
 * - items: array of recipes [{ id, name, image, ... }]
 * - onSave(recipe)
 * - onDiscard(recipe)
 * - onOpen(id)
 */
const WebSwipeStack = ({ items = [], onSave, onDiscard, onOpen }) => {
  const [index, setIndex] = useState(0)
  const startY = useRef(0)
  const currentY = useRef(0)
  const [dy, setDy] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [leaving, setLeaving] = useState(null) // 'up' | 'down' | null

  const cards = useMemo(() => items.slice(index, index + 3), [items, index])
  const active = cards[0]

  const reset = () => { setDy(0); setIsDragging(false) }

  const handleStart = (e) => {
    if (!active) return
    const touch = e.touches ? e.touches[0] : e
    startY.current = touch.clientY
    currentY.current = touch.clientY
    setIsDragging(true)
    setLeaving(null)
  }

  const handleMove = (e) => {
    if (!isDragging) return
    const touch = e.touches ? e.touches[0] : e
    currentY.current = touch.clientY
    const delta = currentY.current - startY.current
    setDy(delta)
  }

  const animateOut = (dir, recipe) => {
    setLeaving(dir)
    // after animation completes, advance deck
    setTimeout(() => {
      if (dir === 'down') onSave?.(recipe); else onDiscard?.(recipe)
      setIndex((i) => i + 1)
      setLeaving(null)
      setDy(0)
    }, 280)
  }

  const handleEnd = () => {
    if (!isDragging) return
    const threshold = 80
    const delta = dy
    const curr = active
    reset()
    if (!curr) return

    if (Math.abs(delta) < threshold) {
      onOpen?.(curr.id)
      return
    }

    animateOut(delta > 0 ? 'down' : 'up', curr)
  }

  return (
    <div className="relative h-[700px] select-none max-w-md mx-auto">
      {cards.slice(0).reverse().map((r, i) => {
        const isTop = i === cards.length - 1
        const timeMin = (r.prepTimeMinutes || 0) + (r.cookTimeMinutes || 0) || r.prepTimeMinutes || 20
        const baseScale = isTop ? 1 : (1 - (cards.length - 1 - i) * 0.06)

        let transform = `scale(${baseScale})`
        let transition = 'transform 200ms ease'
        if (isTop) {
          if (leaving) {
            const dirMult = leaving === 'down' ? 1 : -1
            transform = `translateY(${dirMult*400}px) translateX(${dirMult*60}px) rotate(${dirMult*12}deg)`
            transition = 'transform 280ms cubic-bezier(.2,.8,.2,1)'
          } else {
            transform = `translateY(${dy}px) rotate(${dy/30}deg)`
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
              className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer"
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
              onMouseDown={handleStart}
              onMouseMove={(e)=>isDragging && handleMove(e)}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
            >
              <div className="relative">
                <img src={optimizeImageUrl(r.image, { width: 1000 })} alt={r.name} className="w-full h-[500px] object-cover" />
                {/* center title overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="px-3 py-1.5 rounded-full bg-black/50 text-white text-sm font-semibold backdrop-blur-sm">
                    {r.name}
                  </div>
                </div>
                {/* subtle gradient at bottom for metadata */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-2 left-3 text-white text-xs">⏱ {timeMin} min</div>
              </div>
              <div className="p-4">
                <p className="text-[11px] text-gray-500 text-center">Swipe down to save, up to skip</p>
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

export default WebSwipeStack
