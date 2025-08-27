import React from 'react'
import decorImg from '../assets/decor.png'
import decorImg1 from '../assets/decor1.png'

const FixedDecor = ({ variant = 'main', position = 'top-right' }) => {
  const imageSrc = variant === 'alt' ? decorImg1 : decorImg

  const baseClass =
    'fixed pointer-events-none select-none z-0 opacity-80 animate-floatTilt w-40 sm:w-56 md:w-72'

  let posClass = ''
  switch (position) {
    case 'top-left':
      posClass = 'top-6 left-2 sm:left-6 md:left-10'
      break
    case 'top-right':
      posClass = 'top-6 right-2 sm:right-6 md:right-10'
      break
    case 'bottom-left':
      posClass = 'bottom-6 left-2 sm:left-6 md:left-10'
      break
    case 'bottom-right':
      posClass = 'bottom-6 right-2 sm:right-6 md:right-10'
      break
    default:
      posClass = 'top-6 right-2 sm:right-6 md:right-10'
  }

  return <img src={imageSrc} alt="decor" className={`${baseClass} ${posClass}`} />
}

export default FixedDecor
