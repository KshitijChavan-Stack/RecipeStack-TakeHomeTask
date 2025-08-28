// Use /api so Vite proxy can forward requests to dummyjson.com
// (set up proxy in vite.config.js)
const BASE_URL = '/api/recipes';

// Optional fallback (local JSON if API fails)


export const recipeService = {
  // Search recipes by ingredient
  async searchByIngredient(ingredient) {
    try {
      const response = await fetch(`${BASE_URL}?limit=50`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const recipes = data.recipes || [];

      const searchTerm = ingredient.toLowerCase();
      return recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm)) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        recipe.cuisine.toLowerCase().includes(searchTerm)
      );
    } catch (error) {
      console.error('Error fetching recipes by ingredient:', error);
      // fallback
      return mockRecipes.filter(recipe =>
        recipe.name.toLowerCase().includes(ingredient.toLowerCase())
      );
    }
  },

  // Search recipes by category/cuisine
  async searchByCategory(category) {
    try {
      const response = await fetch(`${BASE_URL}?limit=50`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const recipes = data.recipes || [];

      const searchTerm = category.toLowerCase();
      return recipes.filter(recipe =>
        recipe.cuisine.toLowerCase().includes(searchTerm) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        recipe.name.toLowerCase().includes(searchTerm)
      );
    } catch (error) {
      console.error('Error fetching recipes by category:', error);
      // fallback
      return mockRecipes.filter(recipe =>
        recipe.cuisine.toLowerCase().includes(category.toLowerCase())
      );
    }
  },

  async getRecipeById(recipeId) {
    try {
      const response = await fetch(`${BASE_URL}/${recipeId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching recipe:', error);
      // fallback
      return mockRecipes.find(r => r.id === Number(recipeId));
    }
  },

  async getAllRecipes() {
    try {
      const response = await fetch(`${BASE_URL}?limit=50`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.recipes || [];
    } catch (error) {
      console.error('Error fetching all recipes:', error);
      // fallback
      return mockRecipes;
    }
  }
};
