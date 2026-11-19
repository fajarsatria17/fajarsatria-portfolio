import React from 'react';

export const HeroSceneFallback: React.FC = () => {
  return (
    <div
      data-testid="hero-fallback-orb"
      className="w-full h-full flex flex-col items-center justify-center select-none pointer-events-none relative py-4"
      aria-hidden="true"
    >
      <div className="relative w-64 h-80 sm:w-72 sm:h-96 flex items-center justify-center">
        {/* Ambient radial glow background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0066FF]/25 via-[#00D4FF]/20 to-transparent blur-3xl animate-pulse" />

        {/* Cyber Holographic Portrait Container */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center border border-accent/20 bg-gradient-to-b from-bg-surface/60 to-bg-base/80 backdrop-blur-xs">
          {/* Portrait Image with clean, sharp presentation */}
          <img
            src="/images/fajar-suit-portrait.png"
            alt="Fajar Satria Professional Portrait"
            className="w-full h-full object-contain object-bottom drop-shadow-[0_0_25px_rgba(0,212,255,0.35)] opacity-95"
            loading="lazy"
          />

          {/* Subtle Cyber Scanline Grid Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'linear-gradient(rgba(0, 212, 255, 0.15) 1px, transparent 1px)',
              backgroundSize: '100% 4px',
            }}
          />

          {/* Decorative Futuristic Holographic Reticle SVG */}
          <svg
            viewBox="0 0 200 200"
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Corner Brackets */}
            <path d="M 15 35 L 15 15 L 35 15" stroke="#00D4FF" strokeWidth="2" strokeOpacity="0.8" />
            <path d="M 185 35 L 185 15 L 165 15" stroke="#00D4FF" strokeWidth="2" strokeOpacity="0.8" />
            <path d="M 15 165 L 15 185 L 35 185" stroke="#00D4FF" strokeWidth="2" strokeOpacity="0.8" />
            <path d="M 185 165 L 185 185 L 165 185" stroke="#00D4FF" strokeWidth="2" strokeOpacity="0.8" />

            {/* Subtle Crosshair and Radar Nodes */}
            <circle cx="100" cy="100" r="70" stroke="#00D4FF" strokeWidth="0.8" strokeDasharray="4 4" strokeOpacity="0.3" />
            <line x1="20" y1="100" x2="35" y2="100" stroke="#00D4FF" strokeWidth="1" strokeOpacity="0.5" />
            <line x1="165" y1="100" x2="180" y2="100" stroke="#00D4FF" strokeWidth="1" strokeOpacity="0.5" />
          </svg>
        </div>

        {/* Orbital Cyber Ring SVG */}
        <svg
          viewBox="0 0 320 320"
          className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] animate-spin-slow pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="160" cy="160" r="145" stroke="#00D4FF" strokeWidth="1" strokeDasharray="8 12" strokeOpacity="0.25" />
        </svg>
      </div>
    </div>
  );
};
