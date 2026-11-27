import React, { useEffect, useState } from 'react';
import { ArrowUp } from '@phosphor-icons/react';
import { useReducedMotion } from '@hooks/useReducedMotion';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 450);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className={`fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-bg-surface/90 backdrop-blur-md border border-accent/35 text-accent hover:bg-accent/15 hover:border-accent hover:shadow-glow-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95 ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp size={20} weight="bold" aria-hidden="true" />
    </button>
  );
};
