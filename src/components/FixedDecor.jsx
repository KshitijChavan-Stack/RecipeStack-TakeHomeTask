import React from 'react'
import decorImg from '../assets/decor.png'
import decorImg1 from '../assets/decor1.png'

const FixedDecor = ({ variant = 'main', position = 'top-right' }) => {
  const imageSrc = variant === 'alt' ? decorImg1 : decorImg

  const baseClass =
    'fixed pointer-events-none select-none z-10 opacity-80 animate-floatTilt w-40 sm:w-56 md:w-72'

  let posClass = ''
  switch (position) {
    case 'top-left':
      posClass = 'top-8 left-4 sm:left-8 md:left-12'
      break
    case 'top-right':
      posClass = 'top-8 right-4 sm:right-8 md:right-12'
      break
    case 'bottom-left':
      posClass = 'bottom-8 left-16 sm:left-20 md:left-24'
      break
    case 'bottom-right':
      posClass = 'bottom-8 right-4 sm:right-8 md:right-12'
      break
    default:
      posClass = 'top-8 right-4 sm:right-8 md:right-12'
  }

  return <img src={imageSrc} alt="decor" className={`${baseClass} ${posClass}`} />
}

export default FixedDecor
