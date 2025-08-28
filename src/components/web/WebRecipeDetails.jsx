import React, { useEffect, useState } from "react";
import { recipeService } from "../../services/recipeService";
import OptimizedImage from "../OptimizedImage";

/* Overlay for background blur */
const Overlay = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <button
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ease-in-out"
      onClick={onClose}
    />
  );
};

/* Centered details card */
const DetailsCard = ({ open, children }) => {
  if (!open) return null;
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-3xl z-50">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-slideUp will-change-transform transition-all duration-500 ease-out max-h-[90vh]">
        {children}
      </div>
    </div>
  );
};

const WebRecipeDetails = ({ recipeId, open, onClose }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  /* Load recipe */
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
      <DetailsCard open={open}>
        {loading || !data ? (
          <div className="p-8 text-center text-base text-gray-600 animate-fadeIn">
            Loading recipe details…
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Header Image */}
            <div className="relative group">
              <OptimizedImage
                src={data.image}
                alt={data.name}
                width={1000}
                height={288}
                className="w-full h-72 transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute top-4 right-4">
                <button
                  className="bg-white/90 backdrop-blur-md rounded-full p-3 shadow-md hover:bg-red-50 hover:text-red-600 transition-all duration-300 transform hover:scale-110"
                  onClick={onClose}
                  title="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-7 py-6">
              {/* Title + Meta */}
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2 animate-fadeInUp">
                {data.name}
              </h2>
              <p
                className="text-sm text-gray-500 mb-6 animate-fadeInUp"
                style={{ animationDelay: "0.1s" }}
              >
                {data.ingredients?.length || 6} ingredients ·{" "}
                {data.prepTimeMinutes || 20} mins
              </p>

              {/* Quick Info */}
              <div
                className="grid grid-cols-3 text-sm text-gray-700 mb-8 gap-5 animate-fadeInUp"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="flex items-center gap-2 font-medium bg-orange-50 px-3 py-2 rounded-lg shadow-sm">
                  ⏱ {data.prepTimeMinutes || 20} min
                </div>
                <div className="flex items-center gap-2 font-medium bg-green-50 px-3 py-2 rounded-lg shadow-sm">
                  🔥 {data.caloriesPerServing || 230} Kcal
                </div>
                <div className="flex items-center gap-2 font-medium bg-blue-50 px-3 py-2 rounded-lg shadow-sm">
                  👥 {data.servings || 4} servings
                </div>
              </div>

              {/* Ingredients */}
              <h4
                className="text-xl font-semibold text-gray-900 mb-5 animate-fadeInUp"
                style={{ animationDelay: "0.3s" }}
              >
                Ingredients
              </h4>
              <div
                className="grid grid-cols-2 gap-4 mb-8 animate-fadeInUp"
                style={{ animationDelay: "0.4s" }}
              >
                {(data.ingredients || [])
                  .slice(0, 12)
                  .map((ing, idx) => {
                    const measurement = data.measurements && data.measurements[idx] ? data.measurements[idx] : '';
                    return (
                      <div
                        key={idx}
                        className="rounded-xl bg-gradient-to-br from-orange-50 to-white p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
                      >
                        <div className="text-2xl mb-2 text-green-600">🥗</div>
                        <div className="text-sm font-medium text-gray-800 mb-1">
                          {ing}
                        </div>
                        {measurement && (
                          <div className="text-xs text-gray-600">{measurement}</div>
                        )}
                      </div>
                    );
                  })}
              </div>

              {/* Instructions */}
              <h4
                className="text-xl font-semibold text-gray-900 mb-5 animate-fadeInUp"
                style={{ animationDelay: "0.5s" }}
              >
                Cooking Instructions
              </h4>
              <div className="space-y-5">
                {data.instructions ? (
                  typeof data.instructions === 'string' ? (
                    data.instructions.split(/\d+\.\s*|\n\s*\n/).filter(step => step.trim()).map((step, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-r from-orange-50 to-white rounded-xl p-5 text-base text-gray-800 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.01] animate-fadeInUp"
                        style={{ animationDelay: `${0.6 + i * 0.1}s` }}
                      >
                        <div className="font-semibold mb-2 text-gray-900">
                          Step {i + 1}
                        </div>
                        <div className="leading-relaxed">{step.trim()}</div>
                      </div>
                    ))
                  ) : (
                    Array.isArray(data.instructions) ? data.instructions.map((step, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-r from-orange-50 to-white rounded-xl p-5 text-base text-gray-800 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.01] animate-fadeInUp"
                        style={{ animationDelay: `${0.6 + i * 0.1}s` }}
                      >
                        <div className="font-semibold mb-2 text-gray-900">
                          Step {i + 1}
                        </div>
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
      </DetailsCard>
    </>
  );
};

export default WebRecipeDetails;
