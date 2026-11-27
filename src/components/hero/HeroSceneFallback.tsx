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

        {/* Clean Holographic Portrait Container (No framing box) */}
        <div className="relative w-full h-full flex items-center justify-center">
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
