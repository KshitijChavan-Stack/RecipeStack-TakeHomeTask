import React from 'react'

// Place your image at public/decor-chef.png (or override via src prop)
const CornerDecor = ({ src = '/decor-chef.png', position = 'bottom-right' }) => {
  const posClass = position === 'top-right'
    ? 'top-2 right-2'
    : position === 'top-left'
    ? 'top-2 left-2'
    : position === 'bottom-left'
    ? 'bottom-2 left-2'
    : 'bottom-2 right-2'

  return (
    <img
      src={src}
      alt="decor"
      className={`fixed ${posClass} z-0 pointer-events-none select-none opacity-80 animate-floatTilt drop-shadow-lg w-28 sm:w-32 md:w-40`}
    />
  )
}

export default CornerDecor





