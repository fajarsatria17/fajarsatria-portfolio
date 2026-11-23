import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '@hooks/useReducedMotion';
import { useTabVisibility } from '@hooks/useTabVisibility';

interface NodeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  pulseSpeed: number;
  pulsePhase: number;
  hueType: 'cyan' | 'blue';
}

export const DynamicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glowOrbRef = useRef<HTMLDivElement | null>(null);

  const prefersReduced = useReducedMotion();
  const isVisible = useTabVisibility();

  const mousePos = useRef<{ x: number; y: number; targetX: number; targetY: number; active: boolean }>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 3 : 0,
    targetX: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    targetY: typeof window !== 'undefined' ? window.innerHeight / 3 : 0,
    active: false,
  });

  // Track mouse coordinates across the entire viewport
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.targetX = e.clientX;
      mousePos.current.targetY = e.clientY;
      mousePos.current.active = true;
    };

    const handleMouseLeave = () => {
      mousePos.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Neural Synapse Mesh Canvas Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const nodeCount = isMobile ? 32 : 55;
    const connectDistance = isMobile ? 95 : 135;
    const connectDistanceSq = connectDistance * connectDistance;
    const mouseInfluenceRadius = isMobile ? 110 : 160;
    const mouseInfluenceRadiusSq = mouseInfluenceRadius * mouseInfluenceRadius;

    // Initialize neural particles
    const nodes: NodeParticle[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        baseRadius: Math.random() * 1.5 + 1.0,
        pulseSpeed: Math.random() * 0.025 + 0.015,
        pulsePhase: Math.random() * Math.PI * 2,
        hueType: Math.random() > 0.3 ? 'cyan' : 'blue',
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    let lastTime = performance.now();

    const render = (time: number) => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      // Smooth lerp for ambient glow spotlight tracking mouse
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      if (glowOrbRef.current) {
        glowOrbRef.current.style.transform = `translate3d(${mousePos.current.x - 300}px, ${mousePos.current.y - 300}px, 0)`;
      }

      // Delta time normalization
      const dt = Math.min((time - lastTime) / 16.67, 2.0);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // If user prefers reduced motion, draw once as static aesthetic constellation
      if (prefersReduced) {
        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i];
          if (!a) continue;

          ctx.beginPath();
          ctx.arc(a.x, a.y, a.baseRadius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 212, 255, 0.35)';
          ctx.fill();

          for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j];
            if (!b) continue;

            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < connectDistanceSq) {
              const alpha = (1 - distSq / connectDistanceSq) * 0.18;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
              ctx.lineWidth = 0.7;
              ctx.stroke();
            }
          }
        }
        return;
      }

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (!node) continue;

        // Position update
        node.x += node.vx * dt;
        node.y += node.vy * dt;

        // Bounce boundaries softly
        if (node.x < 0) {
          node.x = 0;
          node.vx = Math.abs(node.vx);
        } else if (node.x > width) {
          node.x = width;
          node.vx = -Math.abs(node.vx);
        }

        if (node.y < 0) {
          node.y = 0;
          node.vy = Math.abs(node.vy);
        } else if (node.y > height) {
          node.y = height;
          node.vy = -Math.abs(node.vy);
        }

        // Mouse subtle magnetic deflection
        if (mousePos.current.active) {
          const mdx = node.x - mousePos.current.x;
          const mdy = node.y - mousePos.current.y;
          const mDistSq = mdx * mdx + mdy * mdy;

          if (mDistSq < mouseInfluenceRadiusSq && mDistSq > 1) {
            const mDist = Math.sqrt(mDistSq);
            const force = (1 - mDist / mouseInfluenceRadius) * 0.75;
            node.x += (mdx / mDist) * force * dt;
            node.y += (mdy / mDist) * force * dt;
          }
        }

        // Node pulsating glow
        node.pulsePhase += node.pulseSpeed;
        const pulse = Math.sin(node.pulsePhase) * 0.4 + 0.9;
        const currentRadius = node.baseRadius * pulse;

        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        if (node.hueType === 'cyan') {
          ctx.fillStyle = `rgba(0, 212, 255, ${0.45 * pulse})`;
          ctx.shadowColor = '#00D4FF';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = `rgba(147, 197, 253, ${0.35 * pulse})`;
          ctx.shadowColor = '#93c5fd';
          ctx.shadowBlur = 6;
        }
        ctx.fill();

        // Connect adjacent synapses
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          if (!other) continue;

          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectDistanceSq) {
            const factor = 1 - distSq / connectDistanceSq;
            const alpha = factor * 0.22;

            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
            ctx.lineWidth = factor * 0.9 + 0.3;
            ctx.shadowBlur = 0; // reset for lines to optimize drawing performance
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isVisible, prefersReduced]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
    >
      {/* ── Layer 1: Ambient Quantum Aurora Glows ── */}

      {/* Floating Aurora Cluster 1: Deep Cosmic Teal (top-left slow drift) */}
      <div
        className="absolute -top-[15%] -left-[10%] w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full bg-gradient-to-br from-accent/15 via-[#004b66]/20 to-transparent blur-[140px] opacity-70 animate-pulse duration-[8000ms]"
        style={{ willChange: 'transform, opacity' }}
      />

      {/* Floating Aurora Cluster 2: Midnight Indigo / Violet (bottom-right slow drift) */}
      <div
        className="absolute -bottom-[20%] -right-[15%] w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] rounded-full bg-gradient-to-tl from-indigo-950/40 via-blue-900/20 to-transparent blur-[160px] opacity-80"
        style={{ willChange: 'transform' }}
      />

      {/* Interactive Cursor-Tracking Ambient Spotlight Glow */}
      <div
        ref={glowOrbRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-accent/[0.07] blur-[150px] opacity-80 pointer-events-none transition-opacity duration-700"
        style={{ willChange: 'transform' }}
      />

      {/* ── Layer 2: Subtle Cyber Grid Matrix Texture ── */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #00D4FF 1px, transparent 1px), linear-gradient(to bottom, #00D4FF 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* ── Layer 3: Interactive Neural Synapse Mesh Canvas ── */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* ── Layer 4: Vignette Contrast Guard for 100% Text Readability ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 35%, transparent 40%, rgba(10, 14, 26, 0.75) 85%, #0A0E1A 100%)',
        }}
      />
    </div>
  );
};
