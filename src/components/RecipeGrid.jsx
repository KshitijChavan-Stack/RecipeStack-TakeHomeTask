import React from 'react';
import { optimizeImageUrl } from '../lib/img'

const RecipeGrid = ({ recipes, ingredient }) => {
  if (!recipes || recipes.length === 0) return null;

  return (
    <div className="my-12">
      <h2 className="text-2xl md:text-3xl text-gray-800 font-bold mb-8 text-center">
        Found {recipes.length} recipes {ingredient ? `with ${ingredient}` : ''}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
        {recipes.map((recipe) => (
          <div 
            key={recipe.id} 
            className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-3 border border-gray-100 group"
          >
            <div className="relative overflow-hidden">
              <img 
                src={optimizeImageUrl(recipe.image, { width: 600 })}
                alt={recipe.name}
                loading="lazy"
                width={600}
                height={224}
                className="w-full h-56 object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
              />
              <div className="absolute top-4 left-4 bg-white bg-opacity-95 rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm z-10">
                {recipe.cuisine}
              </div>
              <div className="absolute top-4 right-4 bg-blue-500 text-white rounded-full px-3 py-1.5 text-xs font-medium shadow-sm z-10">
                {recipe.prepTimeMinutes + (recipe.cookTimeMinutes||0)}m
              </div>
              <div className="absolute bottom-4 right-4 bg-white bg-opacity-95 rounded-full px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm z-10">
                {recipe.difficulty || 'Medium'}
              </div>
              <div className="absolute bottom-4 left-4 bg-yellow-400 text-white rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm z-10">
                ⭐ {recipe.rating || '4.5'}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3 leading-tight line-clamp-2">
                {recipe.name}
              </h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600 font-medium">
                  {recipe.cuisine} Cuisine
                </span>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {recipe.servings || 4} servings
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                  {recipe.caloriesPerServing || 350} cal
                </span>
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  View Recipe
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeGrid;
