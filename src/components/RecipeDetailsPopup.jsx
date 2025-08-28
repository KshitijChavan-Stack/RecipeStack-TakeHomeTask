import React, { useEffect, useState } from 'react';
import { recipeService } from '../services/recipeService';
import { optimizeImageUrl } from '../lib/img';

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
        const res = await recipeService.getRecipeById(recipeId);
        if (!cancelled) setData(res);
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
              <img
                src={optimizeImageUrl(data.image, { width: 900 })}
                alt={data.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 right-4">
                <button
                  className="bg-white/90 backdrop-blur-md rounded-full p-2.5 shadow-md hover:bg-yellow-50 hover:text-yellow-600 transition-all duration-200"
                  onClick={() => {}}
                >
                  🤍
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
              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar-x">
                {(data.ingredients || [])
                  .slice(0, 10)
                  .map((ing, idx) => (
                    <div
                      key={idx}
                      className="min-w-[120px] rounded-xl bg-orange-50 p-4 text-center shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <div className="text-2xl mb-2 text-green-600">🥗</div>
                      <div className="text-sm font-medium text-gray-800 line-clamp-2">{ing}</div>
                    </div>
                  ))}
              </div>

              {/* Instructions */}
              <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Cooking Instructions</h4>
              <ol className="space-y-4">
                {(data.instructions || [data.instructions])
                  .filter(Boolean)
                  .flat()
                  .map((step, i) => (
                    <li
                      key={i}
                      className="bg-gradient-to-r from-orange-50 to-white rounded-xl p-4 text-base text-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <div className="font-semibold mb-2 text-gray-900">Step {i + 1}</div>
                      {step}
                    </li>
                  ))}
              </ol>
            </div>
          </div>
        )}
      </PopupCard>
    </>
  );
};

export default RecipeDetailsPopup;