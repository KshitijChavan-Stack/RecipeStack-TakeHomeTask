// TheMealDB API - Free and comprehensive recipe database
// Use proxy in development, direct API in production
const MEAL_DB_BASE = import.meta.env.DEV ? '/api' : 'https://www.themealdb.com/api/json/v1/1';

// Cache for storing fetched recipes
let recipeCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Expanded mock data for better user experience
const mockRecipes = [
  {
    id: 1,
    name: "Classic Margherita Pizza",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
    cuisine: "Italian",
    prepTimeMinutes: 20,
    cookTimeMinutes: 15,
    servings: 4,
    difficulty: "Easy",
    rating: 4.6,
    caloriesPerServing: 300,
    ingredients: ["pizza dough", "tomato sauce", "mozzarella cheese", "fresh basil", "olive oil"],
    tags: ["pizza", "vegetarian", "italian"]
  },
  {
    id: 2,
    name: "Chicken Tikka Masala",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400",
    cuisine: "Indian",
    prepTimeMinutes: 30,
    cookTimeMinutes: 25,
    servings: 4,
    difficulty: "Medium",
    rating: 4.8,
    caloriesPerServing: 450,
    ingredients: ["chicken breast", "yogurt", "tomato sauce", "cream", "spices"],
    tags: ["chicken", "curry", "indian", "spicy"]
  },
  {
    id: 3,
    name: "Caesar Salad",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400",
    cuisine: "American",
    prepTimeMinutes: 15,
    cookTimeMinutes: 0,
    servings: 2,
    difficulty: "Easy",
    rating: 4.3,
    caloriesPerServing: 250,
    ingredients: ["romaine lettuce", "parmesan cheese", "croutons", "caesar dressing"],
    tags: ["salad", "vegetarian", "healthy"]
  },
  {
    id: 4,
    name: "Beef Stir Fry",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
    cuisine: "Asian",
    prepTimeMinutes: 15,
    cookTimeMinutes: 10,
    servings: 3,
    difficulty: "Easy",
    rating: 4.4,
    caloriesPerServing: 380,
    ingredients: ["beef strips", "vegetables", "soy sauce", "garlic", "ginger"],
    tags: ["beef", "stir-fry", "asian", "quick"]
  },
  {
    id: 5,
    name: "Spaghetti Carbonara",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400",
    cuisine: "Italian",
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    servings: 4,
    difficulty: "Medium",
    rating: 4.7,
    caloriesPerServing: 520,
    ingredients: ["spaghetti", "eggs", "parmesan", "pancetta", "black pepper"],
    tags: ["pasta", "italian", "creamy"]
  },
  {
    id: 6,
    name: "Grilled Salmon",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400",
    cuisine: "Mediterranean",
    prepTimeMinutes: 10,
    cookTimeMinutes: 12,
    servings: 2,
    difficulty: "Easy",
    rating: 4.5,
    caloriesPerServing: 280,
    ingredients: ["salmon fillet", "lemon", "herbs", "olive oil", "garlic"],
    tags: ["fish", "healthy", "grilled", "mediterranean"]
  },
  {
    id: 7,
    name: "Vegetable Curry",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
    cuisine: "Indian",
    prepTimeMinutes: 20,
    cookTimeMinutes: 30,
    servings: 4,
    difficulty: "Medium",
    rating: 4.4,
    caloriesPerServing: 220,
    ingredients: ["mixed vegetables", "coconut milk", "curry spices", "onion", "garlic"],
    tags: ["vegetarian", "curry", "indian", "healthy"]
  },
  {
    id: 8,
    name: "Chicken Fried Rice",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
    cuisine: "Asian",
    prepTimeMinutes: 15,
    cookTimeMinutes: 12,
    servings: 3,
    difficulty: "Easy",
    rating: 4.3,
    caloriesPerServing: 340,
    ingredients: ["rice", "chicken", "eggs", "vegetables", "soy sauce"],
    tags: ["rice", "chicken", "asian", "fried-rice"]
  }
];


// Helper function to check cache validity
const isCacheValid = () => {
  return recipeCache && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION);
};

// Helper function to fetch with timeout and better error handling
const fetchWithTimeout = async (url, timeout = 8000) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    const response = await fetch(url, { 
      signal: controller.signal,
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
};

// Helper function to transform TheMealDB recipe to our format
const transformMealDBRecipe = (meal) => {
  const ingredients = [];
  const measurements = [];
  
  // Extract ingredients and measurements (up to 20 possible)
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(ingredient.trim());
      if (measure && measure.trim()) {
        measurements.push(measure.trim());
      }
    }
  }

  return {
    id: parseInt(meal.idMeal),
    name: meal.strMeal,
    image: meal.strMealThumb,
    cuisine: meal.strArea || 'International',
    category: meal.strCategory || 'Main Course',
    instructions: meal.strInstructions,
    ingredients: ingredients,
    measurements: measurements,
    tags: meal.strTags ? meal.strTags.split(',').map(tag => tag.trim().toLowerCase()) : [],
    youtube: meal.strYoutube,
    difficulty: ingredients.length <= 5 ? 'Easy' : ingredients.length <= 10 ? 'Medium' : 'Hard',
    prepTimeMinutes: Math.floor(Math.random() * 20) + 10, // Estimated
    cookTimeMinutes: Math.floor(Math.random() * 40) + 15, // Estimated
    servings: Math.floor(Math.random() * 4) + 2, // Estimated 2-6 servings
    rating: (Math.random() * 1.5 + 3.5).toFixed(1), // Random rating 3.5-5.0
    caloriesPerServing: Math.floor(Math.random() * 300) + 200 // Estimated 200-500 calories
  };
};

export const recipeService = {
  // Get all recipes with caching and TheMealDB integration
  async getAllRecipes() {
    // Return cached data if valid
    if (isCacheValid()) {
      return recipeCache;
    }

    try {
      // Fetch multiple categories to get diverse recipes
      const categories = ['Chicken', 'Dessert', 'Pasta', 'Seafood', 'Vegetarian', 'Vegan'];
      const randomCategories = categories.sort(() => 0.5 - Math.random()).slice(0, 3);
      
      const allMeals = [];
      
      for (const category of randomCategories) {
        try {
          const response = await fetchWithTimeout(`${MEAL_DB_BASE}/filter.php?c=${category}`, 5000);
          const data = await response.json();
          if (data.meals) {
            // Get first 6 meals from each category
            const categoryMeals = data.meals.slice(0, 6);
            allMeals.push(...categoryMeals);
          }
        } catch (error) {
          console.warn(`Failed to fetch ${category} recipes:`, error.message);
        }
      }

      // Get detailed info for each meal
      const detailedRecipes = [];
      for (const meal of allMeals.slice(0, 24)) { // Limit to 24 recipes
        try {
          const response = await fetchWithTimeout(`${MEAL_DB_BASE}/lookup.php?i=${meal.idMeal}`, 2000);
          if (response.ok) {
            const data = await response.json();
            if (data.meals && data.meals[0]) {
              detailedRecipes.push(transformMealDBRecipe(data.meals[0]));
            }
          }
        } catch (error) {
          console.warn(`Failed to fetch meal details for ${meal.idMeal}:`, error.message);
        }
      }

      if (detailedRecipes.length > 0) {
        recipeCache = detailedRecipes;
        cacheTimestamp = Date.now();
        return detailedRecipes;
      } else {
        throw new Error('No recipes fetched from API');
      }
    } catch (error) {
      console.error('Failed to fetch recipes from API:', error.message);
      console.log('Using mock data as fallback');
      
      // Fallback to mock data
      recipeCache = mockRecipes;
      cacheTimestamp = Date.now();
      return mockRecipes;
    }
  },

  // Search recipes by ingredient
  async searchByIngredient(ingredient) {
    try {
      // First try TheMealDB ingredient search
      const response = await fetchWithTimeout(`${MEAL_DB_BASE}/filter.php?i=${ingredient}`, 3000);
      if (response.ok) {
        const data = await response.json();
        if (data.meals) {
          const detailedRecipes = [];
          // Get details for first 12 results
          for (const meal of data.meals.slice(0, 12)) {
            try {
              const detailResponse = await fetchWithTimeout(`${MEAL_DB_BASE}/lookup.php?i=${meal.idMeal}`, 2000);
              if (detailResponse.ok) {
                const detailData = await detailResponse.json();
                if (detailData.meals && detailData.meals[0]) {
                  detailedRecipes.push(transformMealDBRecipe(detailData.meals[0]));
                }
              }
            } catch (error) {
              console.warn(`Failed to fetch details for meal ${meal.idMeal}`);
            }
          }
          if (detailedRecipes.length > 0) {
            return detailedRecipes;
          }
        }
      }
    } catch (error) {
      console.warn('TheMealDB ingredient search failed:', error.message);
    }

    // Fallback to cached data search
    const allRecipes = await this.getAllRecipes();
    const searchTerm = ingredient.toLowerCase();
    
    return allRecipes.filter(recipe =>
      recipe.name.toLowerCase().includes(searchTerm) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm)) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      recipe.cuisine.toLowerCase().includes(searchTerm)
    );
  },

  // Search recipes by category
  async searchByCategory(category) {
    try {
      // Try TheMealDB category search
      const response = await fetchWithTimeout(`${MEAL_DB_BASE}/filter.php?c=${category}`, 3000);
      if (response.ok) {
        const data = await response.json();
        if (data.meals) {
          const detailedRecipes = [];
          // Get details for first 12 results
          for (const meal of data.meals.slice(0, 12)) {
            try {
              const detailResponse = await fetchWithTimeout(`${MEAL_DB_BASE}/lookup.php?i=${meal.idMeal}`, 2000);
              if (detailResponse.ok) {
                const detailData = await detailResponse.json();
                if (detailData.meals && detailData.meals[0]) {
                  detailedRecipes.push(transformMealDBRecipe(detailData.meals[0]));
                }
              }
            } catch (error) {
              console.warn(`Failed to fetch details for meal ${meal.idMeal}`);
            }
          }
          if (detailedRecipes.length > 0) {
            return detailedRecipes;
          }
        }
      }
    } catch (error) {
      console.warn('TheMealDB category search failed:', error.message);
    }

    // Fallback to cached data search
    const allRecipes = await this.getAllRecipes();
    const searchTerm = category.toLowerCase();
    
    return allRecipes.filter(recipe =>
      recipe.cuisine.toLowerCase().includes(searchTerm) ||
      recipe.category.toLowerCase().includes(searchTerm) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      recipe.name.toLowerCase().includes(searchTerm)
    );
  },

  // Get recipe by ID
  async getRecipeById(recipeId) {
    // First check cached data
    const allRecipes = await this.getAllRecipes();
    const recipe = allRecipes.find(r => r.id === Number(recipeId));
    
    if (recipe) {
      return recipe;
    }

    // Try TheMealDB lookup
    try {
      const response = await fetchWithTimeout(`${MEAL_DB_BASE}/lookup.php?i=${recipeId}`, 3000);
      if (response.ok) {
        const data = await response.json();
        if (data.meals && data.meals[0]) {
          return transformMealDBRecipe(data.meals[0]);
        }
      }
    } catch (error) {
      console.warn('TheMealDB recipe lookup failed:', error.message);
    }

    return null;
  }
};
