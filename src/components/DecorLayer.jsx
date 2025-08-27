import React, { useMemo } from 'react'

// Automatically imports any image under src/assets at build time (Vite)
const modules = import.meta.glob('/src/assets/*.{png,jpg,jpeg,svg,gif,webp}', { eager: true, import: 'default' })

const positions = [
  { cls: 'top-4 left-3 rotate-[-8deg]' },
  { cls: 'top-6 right-4 rotate-[-4deg]' },
  { cls: 'bottom-6 left-4 rotate-[-6deg]' },
  { cls: 'bottom-8 right-6 rotate-[-10deg]' },
]

const DecorLayer = ({ size = 'w-20 sm:w-24 md:w-28', opacity = 'opacity-75' }) => {
  const images = useMemo(() => Object.values(modules), [])
  if (!images.length) return null

  // choose up to 4 images to place around corners
  const picks = images.slice(0, Math.min(positions.length, images.length))

  return (
    <div className="pointer-events-none select-none fixed inset-0 -z-10">
      {picks.map((src, idx) => (
        <img
          key={src + idx}
          src={src}
          alt="decor"
          className={`${positions[idx].cls} ${size} ${opacity} animate-floatTilt drop-shadow-lg absolute`}
        />
      ))}
    </div>
  )
}

export default DecorLayer

