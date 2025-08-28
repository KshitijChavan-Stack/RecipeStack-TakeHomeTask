import { useState, useEffect } from 'react';
import './App.css';

// Mobile UI
import MobileHomeHeader from './components/mobile/MobileHomeHeader';
import MobileRecipeDetails from './components/mobile/RecipeBottomSheet';
import MobileSwipeStack from './components/mobile/MobileSwipeStack';

// Shared
import DecorLayer from './components/DecorLayer';
import FixedDecor from './components/FixedDecor';
import FloatingBackground from './components/FloatingBackground';

// Web shell and classic components
import WebShell from './components/web/WebShell';
import WebRecipeDetails from './components/web/WebRecipeDetails';
import RecipeDetailsPopup from './components/RecipeDetailsPopup';
import RecipeGrid from './components/RecipeGrid';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import NoResults from './components/NoResults';
import PopularRecipes from './components/PopularRecipes';
import QuickSearch from './components/QuickSearch';

// Services
import { recipeService } from './services/recipeService';

function App() {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(true);
  const [openId, setOpenId] = useState(null);
  const [cookLater, setCookLater] = useState([]);
  const [showCookLater, setShowCookLater] = useState(false);
  const [activeCategory, setActiveCategory] = useState('pizza');
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loadAllRecipes = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Load recipes with optimized service
        const all = await recipeService.getAllRecipes();
        
        if (!cancelled) {
          setAllRecipes(all);
          setRecipes(all);
        }
      } catch (e) {
        if (!cancelled) {
          setAllRecipes([]);
          setRecipes([]);
          setError('Failed to load recipes. Please try again.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    
    // Start loading immediately
    loadAllRecipes();
    
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ingredient.trim() && !activeCategory) return;

    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        let results = [];
        if (ingredient.trim()) {
          results = await recipeService.searchByIngredient(ingredient.trim());
        } else if (activeCategory) {
          results = await recipeService.searchByCategory(activeCategory);
        }
        if (!cancelled) setRecipes(results);
      } catch (e) {
        if (!cancelled) {
          setRecipes([]);
          setError('Failed to load recipes. Please try again.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [ingredient, activeCategory]);

  const handleSave = (r) => {
    setCookLater((list) => (list.find((x) => x.id === r.id) ? list : [...list, r]));
  };

  const handleDiscard = () => {};

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setIngredient('');
  };

  const handleIngredientChange = (newIngredient) => {
    setIngredient(newIngredient);
    if (newIngredient.trim()) {
      setActiveCategory('');
    }
  };

  const MobileLayout = (
    <div className="min-h-screen bg-gray-50 font-sans relative">
      <FloatingBackground />
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Recipe Finder</h1>
            <MobileHomeHeader query={ingredient} onQuery={handleIngredientChange} />
          </div>
          <button
            onClick={() => setShowCookLater(true)}
            className="relative ml-3 bg-white border border-gray-300 text-gray-700 rounded-full p-3 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            title="Cook later"
          >
            <span className="text-lg">🤍</span>
            {cookLater.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {cookLater.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Quick Search */}
      <div className="px-4 mt-6 mb-4">
        <QuickSearch onQuickSearch={handleIngredientChange} />
      </div>

      {/* Popular Recipes */}
      <div className="px-4 mb-6">
        <PopularRecipes isCollapsed />
      </div>

      {/* Main Content */}
      <div className="px-4 pb-8">
        {error && <ErrorMessage error={error} />}
        {loading && <LoadingSpinner />}
        {!loading && allRecipes.length > 0 && (
          <div className="max-w-sm mx-auto">
            <MobileSwipeStack
              items={allRecipes}
              onSave={handleSave}
              onDiscard={handleDiscard}
              onOpen={setOpenId}
            />
          </div>
        )}
        {!loading && recipes.length === 0 && !error && <NoResults />}
      </div>

      {showCookLater && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <button
            className="absolute inset-0 bg-black/50 transition-opacity duration-300"
            onClick={() => setShowCookLater(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 sm:max-w-lg">
            <div className="bg-gray-900 px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  Saved Recipes ({cookLater.length})
                </h3>
                <button
                  className="text-gray-400 hover:text-white rounded-full p-1 transition-colors duration-200"
                  onClick={() => setShowCookLater(false)}
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-6">
              {cookLater.length > 0 ? (
                <ul className="space-y-3">
                  {cookLater.map((r) => (
                    <li
                      key={r.id}
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 border border-gray-200"
                    >
                      <img
                        src={r.image}
                        alt={r.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 mb-1">{r.name}</div>
                        <div className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="bg-white px-2 py-1 rounded text-xs border">{r.cuisine}</span>
                          <span>⏱ {r.prepTimeMinutes + (r.cookTimeMinutes || 0)}m</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setOpenId(r.id)}
                        className="bg-gray-900 text-white px-3 py-2 rounded text-xs font-medium hover:bg-gray-800 transition-all duration-200"
                      >
                        View
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4 text-gray-400">📝</div>
                  <div className="text-gray-600 mb-2">No saved recipes yet</div>
                  <div className="text-sm text-gray-500">Swipe right on recipes to save them!</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <MobileRecipeDetails
        recipeId={openId}
        open={Boolean(openId)}
        onClose={() => setOpenId(null)}
      />
    </div>
  );

  const WebLayout = (
    <div className="min-h-screen bg-white font-sans relative">
      <FloatingBackground />
      <WebShell
        query={ingredient}
        onQuery={handleIngredientChange}
        recipes={allRecipes}
        onOpen={setOpenId}
        activeCategory={activeCategory}
        onCategory={handleCategoryChange}
        onSave={handleSave}
        onDiscard={handleDiscard}
        cookLaterCount={cookLater.length}
        onShowCookLater={() => setShowCookLater(true)}
      >
        {/* Hero Section */}
        <div className="text-center mb-12 px-6">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Recipe Finder
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto font-light">
            Discover recipes, save favorites, cook with confidence
          </p>
        </div>

        {/* Quick Search */}
        <div className="mb-8 max-w-4xl mx-auto px-6">
          <QuickSearch onQuickSearch={handleIngredientChange} />
        </div>

        {/* Popular Recipes */}
        <div className="mb-12 max-w-6xl mx-auto px-6">
          <PopularRecipes isCollapsed={false} />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6">
          {error && <ErrorMessage error={error} />}
          {loading && <LoadingSpinner />}
          {!loading && recipes.length > 0 && (
            <RecipeGrid 
              recipes={recipes} 
              ingredient={ingredient || 'All'} 
              onRecipeClick={setOpenId}
            />
          )}
          {!loading && recipes.length === 0 && !error && <NoResults />}
        </div>

        <WebRecipeDetails
          recipeId={openId}
          open={Boolean(openId)}
          onClose={() => setOpenId(null)}
        />
      </WebShell>

      {showCookLater && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <button
            className="absolute inset-0 bg-black/50 transition-opacity duration-300"
            onClick={() => setShowCookLater(false)}
          />
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 mx-4">
            <div className="bg-gray-900 px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  Saved Recipes ({cookLater.length})
                </h3>
                <button
                  className="text-gray-400 hover:text-white rounded-full p-1 transition-colors duration-200"
                  onClick={() => setShowCookLater(false)}
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="max-h-[70vh] overflow-y-auto p-6">
              {cookLater.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cookLater.map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 border border-gray-200 hover:shadow-sm"
                    >
                      <img
                        src={r.image}
                        alt={r.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 mb-1">{r.name}</div>
                        <div className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                          <span className="bg-white px-2 py-1 rounded text-xs border">{r.cuisine}</span>
                          <span>⏱ {r.prepTimeMinutes + (r.cookTimeMinutes || 0)}m</span>
                        </div>
                        <button
                          onClick={() => {setOpenId(r.id); setShowCookLater(false);}}
                          className="bg-gray-900 text-white px-3 py-1 rounded text-xs font-medium hover:bg-gray-800 transition-all duration-200"
                        >
                          View Recipe
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4 text-gray-400">📝</div>
                  <div className="text-gray-600 mb-2">No saved recipes yet</div>
                  <div className="text-sm text-gray-500">Save recipes to cook later and find them here!</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return <div className="app">{isMobile ? MobileLayout : WebLayout}</div>;
}

export default App;