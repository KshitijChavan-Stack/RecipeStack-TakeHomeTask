import React, { useState, useEffect } from 'react';
import { recipeService } from '../services/recipeService';

const PopularRecipes = ({ isCollapsed = false }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isExpanded, setIsExpanded] = useState(!isCollapsed);

  useEffect(() => {
    const fetchPopularRecipes = async () => {
      try {
        setLoading(true);
        const allRecipes = await recipeService.getAllRecipes();
        
        // Get top 8 recipes by rating (most popular)
        const topRecipes = allRecipes
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 8);
        
        setRecipes(topRecipes);
      } catch (err) {
        setError('Failed to load popular recipes');
        console.error('Error fetching popular recipes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularRecipes();
  }, []);

  // Update expanded state when isCollapsed prop changes
  useEffect(() => {
    setIsExpanded(!isCollapsed);
  }, [isCollapsed]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (loading) {
    return (
      <div className="my-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading popular recipes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-16 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  // Collapsed state - single horizontal bar
  if (!isExpanded) {
    return (
      <div className="my-8">
        <div 
          className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 p-4 mx-6"
          onClick={toggleExpanded}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">🍽️</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Most Popular Recipes</h3>
                <p className="text-sm text-gray-600">Click to explore {recipes.length} delicious dishes</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {recipes.slice(0, 4).map((recipe, index) => (
                  <img 
                    key={recipe.id}
                    src={recipe.image} 
                    alt={recipe.name}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <div className="text-gray-400 ml-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Expanded state - full grid
  return (
    <div className="my-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Most Popular Recipes
          </h2>
          <button 
            onClick={toggleExpanded}
            className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-full transition-colors duration-200"
            title="Collapse section"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the world's favorite dishes from different cuisines
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
        {recipes.map((recipe) => (
          <div 
            key={recipe.id} 
            className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-3 border border-gray-100 group"
          >
            <div className="relative overflow-hidden">
              {/* Recipe Image with Slow Motion Zoom Out */}
              <img 
                src={recipe.image} 
                alt={recipe.name}
                className="w-full h-56 object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
              />
              
              {/* Top-left cuisine badge */}
              <div className="absolute top-4 left-4 bg-white bg-opacity-95 rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm z-10">
                {recipe.cuisine}
              </div>
              
              {/* Top-right time badge */}
              <div className="absolute top-4 right-4 bg-blue-500 text-white rounded-full px-3 py-1.5 text-xs font-medium shadow-sm z-10">
                {recipe.prepTimeMinutes + recipe.cookTimeMinutes}m
              </div>
              
              {/* Bottom-right difficulty badge */}
              <div className="absolute bottom-4 right-4 bg-white bg-opacity-95 rounded-full px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm z-10">
                {recipe.difficulty}
              </div>
              
              {/* Bottom-left rating badge */}
              <div className="absolute bottom-4 left-4 bg-yellow-400 text-white rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm z-10">
                ⭐ {recipe.rating}
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
                  {recipe.servings} servings
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                  {recipe.caloriesPerServing} cal
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

export default PopularRecipes;
