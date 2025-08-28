import React, { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width = 400, 
  height = 300,
  placeholder = true,
  lazy = true 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [error, setError] = useState(false);
  const imgRef = useRef();

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isInView]);

  // Optimize image URL with compression and sizing
  const getOptimizedUrl = (originalUrl) => {
    if (!originalUrl) return '';
    
    // For TheMealDB images, add size parameter
    if (originalUrl.includes('themealdb.com')) {
      return `${originalUrl}/preview`;
    }
    
    // For Unsplash images, optimize with parameters
    if (originalUrl.includes('unsplash.com')) {
      const url = new URL(originalUrl);
      url.searchParams.set('w', width);
      url.searchParams.set('h', height);
      url.searchParams.set('fit', 'crop');
      url.searchParams.set('auto', 'format,compress');
      url.searchParams.set('q', '80');
      return url.toString();
    }
    
    return originalUrl;
  };

  const handleLoad = () => {
    setIsLoaded(true);
    setError(false);
  };

  const handleError = () => {
    setError(true);
    setIsLoaded(false);
  };

  const optimizedSrc = getOptimizedUrl(src);

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden bg-gray-100 ${className}`}
      style={{ aspectRatio: `${width}/${height}` }}
    >
      {/* Loading placeholder */}
      {placeholder && !isLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse">
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin"></div>
            <span className="text-xs">Loading...</span>
          </div>
        </div>
      )}

      {/* Error placeholder */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <span className="text-2xl">🍽️</span>
            <span className="text-xs">Image unavailable</span>
          </div>
        </div>
      )}

      {/* Actual image */}
      {isInView && (
        <img
          src={optimizedSrc}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          decoding="async"
        />
      )}

      {/* Shimmer effect while loading */}
      {!isLoaded && !error && isInView && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      )}
    </div>
  );
};

export default OptimizedImage;
