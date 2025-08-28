import React, { useEffect, useState } from 'react';
import { recipeService } from '../services/recipeService';
import OptimizedImage from './OptimizedImage';

const Overlay = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <button
      className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 transition-opacity duration-300"
      onClick={onClose}
    />
  );
};

const PopupCard = ({ open, children }) => {
  if (!open) return null;
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-xl z-50">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideUp will-change-transform transition-all duration-300 ease-out max-h-[90vh]">
        {children}
      </div>
    </div>
  );
};

const RecipeDetailsPopup = ({ recipeId, open, onClose }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !recipeId) return;
    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        console.log('Loading recipe with ID:', recipeId);
        const res = await recipeService.getRecipeById(recipeId);
        console.log('Recipe data received:', res);
        if (!cancelled) setData(res);
      } catch (error) {
        console.error('Error loading recipe:', error);
        if (!cancelled) setData(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [open, recipeId]);

  if (!open) return null;

  return (
    <>
      <Overlay open={open} onClose={onClose} />
      <PopupCard open={open}>
        {loading || !data ? (
          <div className="p-6 text-center text-base text-gray-600">Loading recipe details…</div>
        ) : (
          <div>
            {/* Header Image */}
            <div className="relative">
              <OptimizedImage
                src={data.image}
                alt={data.name}
                width={900}
                height={256}
                className="w-full h-64"
              />
              <div className="absolute top-4 right-4">
                <button
                  className="bg-white/90 backdrop-blur-md rounded-full p-2.5 shadow-md hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                  onClick={onClose}
                  title="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="max-h-[65vh] overflow-y-auto custom-scrollbar px-6 py-5">
              {/* Title + Meta */}
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{data.name}</h2>
              <p className="text-xs text-gray-500 mb-4">
                {data.ingredients?.length || 6} ingredients
              </p>

              <div className="grid grid-cols-2 text-sm text-gray-700 mb-5 gap-4">
                <div className="flex items-center gap-2">⏱ {data.prepTimeMinutes || 20} min</div>
                <div className="flex items-center gap-2">🔥 {data.caloriesPerServing || 230} Kcal</div>
              </div>

              {/* Ingredients */}
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Ingredients</h4>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {(data.ingredients || [])
                  .slice(0, 12)
                  .map((ing, idx) => {
                    const measurement = data.measurements && data.measurements[idx] ? data.measurements[idx] : '';
                    return (
                      <div
                        key={idx}
                        className="rounded-xl bg-orange-50 p-3 shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <div className="text-lg mb-1 text-green-600">🥗</div>
                        <div className="text-sm font-medium text-gray-800 mb-1">{ing}</div>
                        {measurement && (
                          <div className="text-xs text-gray-600">{measurement}</div>
                        )}
                      </div>
                    );
                  })}
              </div>

              {/* Instructions */}
              <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Cooking Instructions</h4>
              <div className="space-y-4">
                {data.instructions ? (
                  typeof data.instructions === 'string' ? (
                    data.instructions.split(/\d+\.\s*|\n\s*\n/).filter(step => step.trim()).map((step, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-r from-orange-50 to-white rounded-xl p-4 text-base text-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <div className="font-semibold mb-2 text-gray-900">Step {i + 1}</div>
                        <div className="leading-relaxed">{step.trim()}</div>
                      </div>
                    ))
                  ) : (
                    Array.isArray(data.instructions) ? data.instructions.map((step, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-r from-orange-50 to-white rounded-xl p-4 text-base text-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <div className="font-semibold mb-2 text-gray-900">Step {i + 1}</div>
                        <div className="leading-relaxed">{step}</div>
                      </div>
                    )) : (
                      <div className="text-gray-500 italic">No instructions available</div>
                    )
                  )
                ) : (
                  <div className="text-gray-500 italic">No instructions available</div>
                )}
              </div>
            </div>
          </div>
        )}
      </PopupCard>
    </>
  );
};

export default RecipeDetailsPopup;