const BASE_URL = 'https://dummyjson.com/recipes';

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
      
      // Filter recipes by ingredient (case-insensitive search)
      const filteredRecipes = recipes.filter(recipe => {
        const searchTerm = ingredient.toLowerCase();
        return (
          recipe.name.toLowerCase().includes(searchTerm) ||
          recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm)) ||
          recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
          recipe.cuisine.toLowerCase().includes(searchTerm)
        );
      });
      
      return filteredRecipes;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw new Error('Failed to fetch recipes. Please try again later !');
    }
  },

  async getRecipeById(recipeId) {
    // Get recipe by id (If someone want to search with id)
    // not done much here just some magic of SQL query
    try {
      const response = await fetch(`${BASE_URL}/${recipeId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const recipe = await response.json();
      return recipe;
    } catch (error) {
      console.error('Error fetching recipe:', error);
      throw new Error('Failed to fetch recipe details. Please try again.');
    }
  },

  // Get all recipes from the API and then we can also filter if needed
  // we have added the limit parameter to 50, we can chnage if require
  async getAllRecipes() {
    try {
      const response = await fetch(`${BASE_URL}?limit=50`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      // It's basically saying "give me the recipes, but if there aren't any, just give me an empty list so nothing breaks."
      // prevent app crashing without safty check
      return data.recipes || [];
    } catch (error) {
      console.error('Error fetching all recipes:', error);
      throw new Error('Failed to fetch recipes. Please try again.');
    }
  }
};
