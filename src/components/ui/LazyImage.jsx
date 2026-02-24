import { useState, useRef, useEffect, memo } from 'react';

const FALLBACK_SRC = 'data:image/svg+xml;base64,' + btoa(
  `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
    <rect fill="#f3f4f6" width="400" height="400"/>
    <text x="200" y="200" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-size="14" fill="#9ca3af">Image unavailable</text>
  </svg>`
);

function LazyImage({
  src,
  alt = '',
  width,
  height,
  className = '',
  containerClassName = '',
  onLoad: externalOnLoad,
  ...rest
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: '200px 0px', threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleLoad = (e) => {
    setIsLoaded(true);
    externalOnLoad?.(e);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const aspectPadding = width && height ? `${(height / width) * 100}%` : undefined;

  return (
    <div
      ref={containerRef}
      className={`lazy-image-container ${containerClassName}`}
      style={aspectPadding ? { position: 'relative', paddingBottom: aspectPadding, overflow: 'hidden' } : { position: 'relative', overflow: 'hidden' }}
    >
      {/* Shimmer skeleton */}
      {!isLoaded && (
        <div
          className="lazy-image-skeleton"
          style={aspectPadding
            ? { position: 'absolute', inset: 0 }
            : { width: '100%', height: '100%', position: 'absolute', inset: 0 }
          }
        />
      )}

      {/* Actual image */}
      {isInView && (
        <img
          src={hasError ? FALLBACK_SRC : src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`lazy-image ${isLoaded ? 'lazy-image-loaded' : 'lazy-image-loading'} ${className}`}
          style={aspectPadding
            ? { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }
            : {}
          }
          {...rest}
        />
      )}
    </div>
  );
}

export default memo(LazyImage);
