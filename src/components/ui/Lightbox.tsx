import React, { useEffect, useCallback } from 'react';
import { useLanguage } from '@hooks/useLanguage';
import { X, ShieldCheck } from '@phosphor-icons/react';

export interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
  caption?: string;
  isAuthentic?: boolean;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  imageSrc,
  title,
  caption,
  isAuthentic = false,
}) => {
  const { language, t } = useLanguage();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-bg-base/90 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-bg-surface border border-border rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Lightbox Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-bg-elevated border-b border-border">
          <div className="flex items-center gap-3 truncate">
            <h3 className="font-display font-semibold text-text-primary text-sm sm:text-base truncate">
              {title}
            </h3>
            {isAuthentic ? (
              <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded bg-accent/20 text-accent border border-accent/40">
                <ShieldCheck size={12} />
                {t.projects.authenticScreenshotBadge}
              </span>
            ) : (
              <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded bg-bg-surface text-text-tertiary border border-border">
                {t.projects.conceptIllustrationBadge}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-surface border border-transparent hover:border-border transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            aria-label={t.projects.closeLightbox}
          >
            <X size={20} />
          </button>
        </div>

        {/* Lightbox Image Container */}
        <div className="relative flex-1 bg-bg-base/60 flex items-center justify-center p-2 sm:p-4 overflow-auto min-h-[300px]">
          <img
            src={imageSrc}
            alt={title}
            className="max-h-[70vh] w-auto max-w-full object-contain rounded-md border border-border/40 shadow-lg"
          />
        </div>

        {/* Caption Bar */}
        {caption && (
          <div className="px-5 py-3 bg-bg-elevated/80 border-t border-border text-xs sm:text-sm text-text-secondary font-mono">
            <p className="leading-relaxed">
              <span className="text-accent font-semibold mr-1.5">{language === 'id' ? 'Catatan:' : 'Note:'}</span>
              {caption}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
