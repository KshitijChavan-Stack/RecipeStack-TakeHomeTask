import { useState, useEffect } from 'react';
import './App.css';

// Mobile UI
import MobileHomeHeader from './components/mobile/MobileHomeHeader';
import MobileRecipeDetails from './components/mobile/RecipeBottomSheet';
import MobileSwipeStack from './components/mobile/MobileSwipeStack';

// Shared
import DecorLayer from './components/DecorLayer';
import FixedDecor from './components/FixedDecor';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
      <DecorLayer />
      <FixedDecor variant="main" position="top-right" />
      <FixedDecor variant="alt" position="bottom-left" />

      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-4 py-3 flex items-center justify-between shadow-sm">
        <MobileHomeHeader query={ingredient} onQuery={handleIngredientChange} />
        <button
          onClick={() => setShowCookLater(true)}
          className="ml-2 shrink-0 bg-white rounded-full p-2.5 shadow-md text-red-500 hover:bg-red-50 transition-colors duration-200"
          title="Cook later"
        >
          ❤️
        </button>
      </div>

      <div className="px-4 mt-4 mb-6 max-w-md mx-auto">
        <QuickSearch onQuickSearch={handleIngredientChange} />
      </div>

      <div className="px-4 mb-6 max-w-md mx-auto">
        <PopularRecipes isCollapsed />
      </div>

      <div className="px-4 max-w-md mx-auto">
        {error && <ErrorMessage error={error} />}
        {loading && <LoadingSpinner />}
        {!loading && allRecipes.length > 0 && (
          <MobileSwipeStack
            items={allRecipes}
            onSave={handleSave}
            onDiscard={handleDiscard}
            onOpen={setOpenId}
          />
        )}
        {!loading && recipes.length === 0 && !error && <NoResults />}
      </div>

      {showCookLater && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <button
            className="absolute inset-0 bg-black/50 transition-opacity duration-300"
            onClick={() => setShowCookLater(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl p-6 max-h-[80vh] overflow-y-auto transform transition-all duration-300 sm:max-w-lg sm:top-1/2 sm:-translate-y-1/2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Cook Later ({cookLater.length})</h3>
              <button
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                onClick={() => setShowCookLater(false)}
              >
                Close
              </button>
            </div>
            <ul className="space-y-4">
              {cookLater.map((r) => (
                <li
                  key={r.id}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-14 h-14 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800">{r.name}</div>
                    <div className="text-xs text-gray-500">
                      {r.cuisine} • {r.prepTimeMinutes + (r.cookTimeMinutes || 0)}m
                    </div>
                  </div>
                </li>
              ))}
              {cookLater.length === 0 && (
                <div className="text-sm text-gray-500 text-center py-6">
                  No saved recipes yet.
                </div>
              )}
            </ul>
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
      <DecorLayer />
      <FixedDecor variant="main" position="top-right" />
      <FixedDecor variant="alt" position="bottom-left" />

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
        <div className="mt-4 mb-6 max-w-5xl mx-auto">
          <QuickSearch onQuickSearch={handleIngredientChange} />
        </div>

        <div className="mb-8 max-w-5xl mx-auto">
          <PopularRecipes isCollapsed />
        </div>

        <div className="max-w-5xl mx-auto">
          {error && <ErrorMessage error={error} />}
          {loading && <LoadingSpinner />}
          {!loading && recipes.length > 0 && (
            <RecipeGrid recipes={recipes} ingredient={ingredient || 'All'} />
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
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 max-h-[80vh] overflow-y-auto transform transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Cook Later ({cookLater.length})</h3>
              <button
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                onClick={() => setShowCookLater(false)}
              >
                Close
              </button>
            </div>
            <ul className="space-y-4">
              {cookLater.map((r) => (
                <li
                  key={r.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{r.name}</div>
                    <div className="text-sm text-gray-500">
                      {r.cuisine} • {r.prepTimeMinutes + (r.cookTimeMinutes || 0)}m
                    </div>
                  </div>
                </li>
              ))}
              {cookLater.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  No saved recipes yet.
                </div>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );

  return <div className="app">{isMobile ? MobileLayout : WebLayout}</div>;
}

export default App;