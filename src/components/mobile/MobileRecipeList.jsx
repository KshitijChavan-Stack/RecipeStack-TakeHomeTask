import React from 'react'
import MobileRecipeRow from './MobileRecipeRow'

const MobileRecipeList = ({ recipes = [], onOpen }) => {
  return (
    <div className="divide-y">
      {recipes.map(r => (
        <MobileRecipeRow key={r.id} recipe={r} onOpen={onOpen} />
      ))}
    </div>
  )
}

export default MobileRecipeList
