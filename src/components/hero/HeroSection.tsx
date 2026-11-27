import React, { Suspense, useRef, useState, useEffect } from 'react';
import { HeroContent } from './HeroContent';
import { HeroSceneFallback } from './HeroSceneFallback';
import { HeroSceneErrorBoundary } from './HeroSceneErrorBoundary';
import { profile } from '@data/profile';
import { useReducedMotion } from '@hooks/useReducedMotion';
import { useWebGLSupport } from '@hooks/useWebGLSupport';
import { usePointerParallax } from '@hooks/usePointerParallax';

// Lazy-load the Three.js 3D scene to protect initial render & LCP (HR-010)
const LazyHeroScene = React.lazy(() => import('./HeroScene'));

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerTarget = usePointerParallax(containerRef, { clamp: 0.5 });

  const prefersReducedMotion = useReducedMotion();
  const isWebGLAvailable = useWebGLSupport();

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use fallback if:
  // 1) Reduced motion preferred (HR-008)
  // 2) WebGL unsupported or context failed (HR-009)
  // 3) Mobile viewport by default (HD-005)
  const shouldUseFallback = prefersReducedMotion || !isWebGLAvailable || isMobile;

  return (
    <section
      id="hero"
      ref={containerRef}
      aria-label="Introduction"
      className="relative min-h-[96vh] flex flex-col items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent text-center"
    >
      {/* Background ambient radial accent glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-accent/10 rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Cyber Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #00D4FF 1px, transparent 1px), linear-gradient(to bottom, #00D4FF 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* Centered Cinematic Hero Container */}
      <div className="max-w-4xl w-full mx-auto flex flex-col items-center justify-center relative z-10">
        {/* Centerpiece: Interactive 3D WebGL Biometric Portrait */}
        <div className="relative w-full max-w-xl h-[360px] sm:h-[440px] md:h-[480px] flex items-center justify-center">
          {shouldUseFallback ? (
            <HeroSceneFallback />
          ) : (
            <HeroSceneErrorBoundary>
              <Suspense fallback={<HeroSceneFallback />}>
                <LazyHeroScene pointerTarget={pointerTarget} />
              </Suspense>
            </HeroSceneErrorBoundary>
          )}

          {/* Giant Layered Backdrop Typography: "FAJAR SATRIA" */}
          <div className="absolute -bottom-3 sm:-bottom-6 left-1/2 -translate-x-1/2 pointer-events-none select-none z-10 w-screen max-w-5xl px-2 text-center overflow-hidden">
            <span className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white/95 via-slate-200/40 to-transparent drop-shadow-2xl opacity-90 inline-block uppercase whitespace-nowrap">
              {profile.name}
            </span>
          </div>
        </div>

        {/* Semantic Content (H1, Headline, Summary, CTAs) */}
        <div className="mt-4 sm:mt-6 z-20 relative w-full">
          <HeroContent />
        </div>
      </div>
    </section>
  );
};
