import React, { useState } from 'react';
import { optimizeImageUrl } from '../lib/img';
import RecipeDetailsPopup from './RecipeDetailsPopup';
import OptimizedImage from './OptimizedImage';

const RecipeGrid = ({ recipes, ingredient, category, onRecipeClick }) => {
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  if (!recipes || recipes.length === 0) return null;

  const getTitle = () => {
    if (category) {
      return `Found ${recipes.length} ${category} recipes`;
    }
    if (ingredient) {
      return `Found ${recipes.length} recipes with ${ingredient}`;
    }
    return `Found ${recipes.length} recipes`;
  };

  const handleViewRecipe = (recipeId) => {
    if (onRecipeClick) {
      onRecipeClick(recipeId);
    } else {
      setSelectedRecipeId(recipeId);
      setIsPopupOpen(true);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedRecipeId(null);
  };

  return (
    <div className="my-12">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8 text-center animate-fadeIn">
        {getTitle()}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 md:px-6">
        {recipes.map((recipe, index) => (
          <div
            key={recipe.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-2 border border-gray-100 group animate-fadeInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative overflow-hidden">
              <OptimizedImage
                src={recipe.image}
                alt={recipe.name}
                width={600}
                height={224}
                className="w-full h-48 transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-white bg-opacity-90 rounded-full px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm z-10">
                {recipe.cuisine}
              </div>
              <div className="absolute top-3 right-3 bg-yellow-400 text-white rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm z-10">
                {recipe.prepTimeMinutes + (recipe.cookTimeMinutes || 0)}m
              </div>
              <div className="absolute bottom-3 right-3 bg-white bg-opacity-90 rounded-full px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm z-10">
                {recipe.difficulty || 'Medium'}
              </div>
              <div className="absolute bottom-3 left-3 bg-orange-500 text-white rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm z-10">
                ⭐ {recipe.rating || '4.5'}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight line-clamp-2">
                {recipe.name}
              </h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600 font-medium">
                  {recipe.cuisine} Cuisine
                </span>
                <span className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                  {recipe.servings || 4} servings
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                  {recipe.caloriesPerServing || 350} cal
                </span>
                <button
                  onClick={() => handleViewRecipe(recipe.id)}
                  className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  View Recipe
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Details Popup */}
      <RecipeDetailsPopup
        recipeId={selectedRecipeId}
        open={isPopupOpen}
        onClose={handleClosePopup}
      />
    </div>
  );
};

export default RecipeGrid;