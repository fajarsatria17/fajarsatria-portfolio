import React, { useState, useEffect } from 'react';
import { useLanguage } from '@hooks/useLanguage';
import { ImageSquare, MagnifyingGlassPlus } from '@phosphor-icons/react';

export interface ProjectImageProps {
  src?: string;
  fallbackSrc: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
  showBadge?: boolean;
  isAuthentic?: boolean;
  onExpand?: () => void;
  priority?: boolean;
}

export const ProjectImage: React.FC<ProjectImageProps> = ({
  src,
  fallbackSrc,
  alt,
  aspectRatio = 'aspect-[16/9]',
  className = '',
  showBadge = true,
  isAuthentic = false,
  onExpand,
  priority = false,
}) => {
  const { language } = useLanguage();
  
  const getInitialSrc = () => {
    if (isAuthentic && src) {
      return src;
    }
    return fallbackSrc || src || '';
  };

  // Track currently active source
  const [currentSrc, setCurrentSrc] = useState<string>(getInitialSrc);
  const [isUsingFallback, setIsUsingFallback] = useState<boolean>(!isAuthentic || !src || src === fallbackSrc);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync state if props change
  useEffect(() => {
    const nextSrc = isAuthentic && src ? src : (fallbackSrc || src || '');
    setCurrentSrc(nextSrc);
    setIsUsingFallback(!isAuthentic || !src || nextSrc === fallbackSrc);
    setIsFailed(false);
    setIsLoading(true);
  }, [src, fallbackSrc, isAuthentic]);

  const handleError = () => {
    if (!isUsingFallback && fallbackSrc && currentSrc !== fallbackSrc) {
      // Primary authentic screenshot failed (e.g. file not yet provided by owner)
      // Switch gracefully to fallback illustration without breaking UI
      setCurrentSrc(fallbackSrc);
      setIsUsingFallback(true);
      setIsLoading(false);
    } else {
      // Both primary and fallback failed
      setIsFailed(true);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div
      role={onExpand ? 'button' : undefined}
      tabIndex={onExpand ? 0 : undefined}
      data-testid="project-image-container"
      aria-label={onExpand ? `${alt} - ${language === 'id' ? 'Klik untuk memperbesar' : 'Click to expand'}` : alt}
      className={`relative w-full ${aspectRatio} rounded-lg bg-bg-surface border border-border overflow-hidden select-none group/img ${
        onExpand ? 'cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none' : ''
      } ${className}`}
      onClick={onExpand}
      onKeyDown={(e) => {
        if (onExpand && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onExpand();
        }
      }}
    >
      {/* Loading Skeleton / Placeholder */}
      {isLoading && !isFailed && (
        <div className="absolute inset-0 bg-bg-elevated animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
        </div>
      )}

      {/* Render Image or Graceful Placeholder */}
      {!isFailed ? (
        <img
          src={currentSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover object-center transition-all duration-300 group-hover/img:scale-[1.03] ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-bg-surface border border-border">
          <ImageSquare size={36} className="text-text-tertiary mb-2 opacity-60" />
          <span className="text-xs font-mono text-text-tertiary">
            {language === 'id' ? 'Visual Sedang Disiapkan' : 'Visual Asset Pending'}
          </span>
        </div>
      )}

      {/* Expand / Lightbox Prompt Overlay on Hover */}
      {onExpand && !isFailed && !isLoading && (
        <div className="absolute inset-0 bg-bg-base/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs">
          <div className="px-3 py-1.5 rounded-full bg-bg-elevated/90 border border-accent/40 text-accent font-mono text-xs flex items-center gap-1.5 shadow-glow-sm">
            <MagnifyingGlassPlus size={16} />
            <span>{language === 'id' ? 'Perbesar' : 'Expand View'}</span>
          </div>
        </div>
      )}

      {/* Status Badge: Authentic Screenshot vs Concept Illustration */}
      {showBadge && !isFailed && (
        <div className="absolute bottom-2 right-2 pointer-events-none z-10">
          {!isUsingFallback && isAuthentic ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold rounded bg-accent/20 text-accent border border-accent/40 shadow-glow-sm backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {language === 'id' ? 'Tangkapan Layar Asli' : 'Authentic Screenshot'}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded bg-bg-base/85 text-text-tertiary border border-border/80 backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-text-tertiary/60" />
              {language === 'id' ? 'Ilustrasi Konsep' : 'Concept Visual'}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
