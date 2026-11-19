import React, { useEffect, useRef, useState } from 'react';
import { ScrambleText } from '@components/ui';

export interface BiometricHUDProps {
  pointerTarget: React.RefObject<[number, number]>;
}

export const BiometricHUD: React.FC<BiometricHUDProps> = ({ pointerTarget }) => {
  const hudRef = useRef<HTMLDivElement>(null);
  const [hudOffset, setHudOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animId: number;

    const updateParallax = () => {
      const [ptrX, ptrY] = pointerTarget.current || [0, 0];
      // Counter-parallax offset for floating holographic depth sensation
      setHudOffset((prev) => ({
        x: prev.x + (ptrX * -10 - prev.x) * 0.08,
        y: prev.y + (ptrY * -8 - prev.y) * 0.08,
      }));
      animId = requestAnimationFrame(updateParallax);
    };

    animId = requestAnimationFrame(updateParallax);
    return () => cancelAnimationFrame(animId);
  }, [pointerTarget]);

  return (
    <div
      ref={hudRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none flex items-center justify-center z-15"
      style={{
        transform: `translate3d(${hudOffset.x}px, ${hudOffset.y}px, 0)`,
        transition: 'transform 0.05s ease-out',
      }}
    >
      {/* Biometric Framing Reticle (encapsulates the portrait) */}
      <div className="relative w-[280px] h-[350px] sm:w-[320px] sm:h-[400px] md:w-[350px] md:h-[430px] rounded-2xl border border-accent/20 bg-accent/[0.015] backdrop-blur-[0.5px]">
        {/* Corner Bracket: Top-Left */}
        <div className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-2 border-l-2 border-accent drop-shadow-[0_0_6px_rgba(0,212,255,0.8)]" />
        {/* Corner Bracket: Top-Right */}
        <div className="absolute -top-1.5 -right-1.5 w-6 h-6 border-t-2 border-r-2 border-accent drop-shadow-[0_0_6px_rgba(0,212,255,0.8)]" />
        {/* Corner Bracket: Bottom-Left */}
        <div className="absolute -bottom-1.5 -left-1.5 w-6 h-6 border-b-2 border-l-2 border-accent drop-shadow-[0_0_6px_rgba(0,212,255,0.8)]" />
        {/* Corner Bracket: Bottom-Right */}
        <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-2 border-r-2 border-accent drop-shadow-[0_0_6px_rgba(0,212,255,0.8)]" />

        {/* Side Crosshair Ticks */}
        <div className="absolute top-1/2 -left-2 w-3 h-[1px] bg-accent/70 -translate-y-1/2" />
        <div className="absolute top-1/2 -right-2 w-3 h-[1px] bg-accent/70 -translate-y-1/2" />
        <div className="absolute -top-2 left-1/2 w-[1px] h-3 bg-accent/70 -translate-x-1/2" />

        {/* Top-Left Telemetry Tag: Biometric Status */}
        <div className="absolute -top-6 left-0 flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-accent/90 uppercase bg-bg-base/80 px-2 py-0.5 rounded border border-accent/25 backdrop-blur-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>
            <ScrambleText text="BIO_ID // VERIFIED" trigger="mount" delay={80} speed={20} />
          </span>
        </div>

        {/* Top-Right Telemetry Tag: Confidence Score */}
        <div className="absolute -top-6 right-0 font-mono text-[10px] tracking-wider text-accent/80 uppercase bg-bg-base/80 px-2 py-0.5 rounded border border-accent/25 backdrop-blur-xs hidden sm:block">
          <ScrambleText text="CONFIDENCE: 99.8%" trigger="mount" delay={200} speed={20} />
        </div>

        {/* Bottom-Left Telemetry Tag: Architecture Stack */}
        <div className="absolute -bottom-6 left-0 font-mono text-[9px] sm:text-[10px] tracking-wider text-slate-400 uppercase bg-bg-base/80 px-2 py-0.5 rounded border border-slate-700/60 backdrop-blur-xs">
          <span className="text-accent/90 mr-1">SYS:</span>
          <ScrambleText text="YOLOV8 + ARCFACE" trigger="mount" delay={320} speed={20} />
        </div>

        {/* Bottom-Right Telemetry Tag: Latency */}
        <div className="absolute -bottom-6 right-0 font-mono text-[9px] sm:text-[10px] tracking-wider text-slate-400 uppercase bg-bg-base/80 px-2 py-0.5 rounded border border-slate-700/60 backdrop-blur-xs hidden sm:block">
          <ScrambleText text="LATENCY: 18ms // 60FPS" trigger="mount" delay={450} speed={20} />
        </div>

        {/* Subtle Edge Grid Lines */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="0" y1="25" x2="6" y2="25" stroke="#00D4FF" strokeWidth="0.8" />
          <line x1="94" y1="25" x2="100" y2="25" stroke="#00D4FF" strokeWidth="0.8" />
          <line x1="0" y1="75" x2="6" y2="75" stroke="#00D4FF" strokeWidth="0.8" />
          <line x1="94" y1="75" x2="100" y2="75" stroke="#00D4FF" strokeWidth="0.8" />
        </svg>
      </div>
    </div>
  );
};
