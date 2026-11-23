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

interface EmberParticle {
  x: number;
  y: number;
  vy: number;
  radius: number;
  alpha: number;
  maxAlpha: number;
  pulse: number;
}

export const DynamicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glowOrbRef = useRef<HTMLDivElement | null>(null);

  // Parallax layer references
  const farLayerRef = useRef<HTMLDivElement | null>(null);
  const midLayerRef = useRef<HTMLDivElement | null>(null);
  const nearLayerRef = useRef<HTMLDivElement | null>(null);

  const prefersReduced = useReducedMotion();
  const isVisible = useTabVisibility();

  // Scroll & mouse coordinates for layered 3D parallax
  const scrollState = useRef({
    targetY: 0,
    currentY: 0,
  });

  const mousePos = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 3 : 0,
    targetX: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    targetY: typeof window !== 'undefined' ? window.innerHeight / 3 : 0,
    active: false,
  });

  // Track window scroll with passive listener
  useEffect(() => {
    const handleScroll = () => {
      scrollState.current.targetY = window.scrollY || window.pageYOffset || 0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track mouse coordinates across the viewport for gyro/tilt parallax
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

  // Neural Synapse & Near Embers Canvas Simulation with Parallax
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const nodeCount = isMobile ? 36 : 60;
    const connectDistance = isMobile ? 105 : 145;
    const connectDistanceSq = connectDistance * connectDistance;
    const mouseInfluenceRadius = isMobile ? 120 : 170;
    const mouseInfluenceRadiusSq = mouseInfluenceRadius * mouseInfluenceRadius;

    // Layer 2: Neural synapse nodes
    const nodes: NodeParticle[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        baseRadius: Math.random() * 1.8 + 1.4, // larger, brighter nodes
        pulseSpeed: Math.random() * 0.03 + 0.018,
        pulsePhase: Math.random() * Math.PI * 2,
        hueType: Math.random() > 0.35 ? 'cyan' : 'blue',
      });
    }

    // Layer 3: Near floating bokeh embers (higher depth layer)
    const emberCount = isMobile ? 12 : 24;
    const embers: EmberParticle[] = [];
    for (let i = 0; i < emberCount; i++) {
      embers.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vy: -(Math.random() * 0.35 + 0.15), // gently drifts upward
        radius: Math.random() * 2.5 + 2.0, // large foreground bokeh
        alpha: Math.random() * 0.5,
        maxAlpha: Math.random() * 0.4 + 0.25,
        pulse: Math.random() * Math.PI * 2,
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

      // Delta time normalization
      const dt = Math.min((time - lastTime) / 16.67, 2.0);
      lastTime = time;

      // Smooth scroll lerp for layered parallax
      scrollState.current.currentY +=
        (scrollState.current.targetY - scrollState.current.currentY) * 0.1;
      const sY = scrollState.current.currentY;

      // Mouse smooth lerp
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.06;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.06;

      const tiltX = (mousePos.current.x / width - 0.5) * 30;
      const tiltY = (mousePos.current.y / height - 0.5) * 30;

      // ── Apply Layered Parallax Transforms ──
      if (!prefersReduced) {
        // Far Layer: 0.12x scroll velocity + subtle mouse tilt
        if (farLayerRef.current) {
          farLayerRef.current.style.transform = `translate3d(${tiltX * 0.3}px, ${-sY * 0.12 + tiltY * 0.3}px, 0)`;
        }

        // Mid Layer: 0.38x scroll velocity + moderate mouse tilt
        if (midLayerRef.current) {
          midLayerRef.current.style.transform = `translate3d(${tiltX * 0.6}px, ${-sY * 0.38 + tiltY * 0.6}px, 0)`;
        }

        // Near Layer: 0.72x scroll velocity + higher tilt
        if (nearLayerRef.current) {
          nearLayerRef.current.style.transform = `translate3d(${tiltX * 1.1}px, ${-sY * 0.72 + tiltY * 1.1}px, 0)`;
        }
      }

      // Cursor spotlight ambient glow tracking
      if (glowOrbRef.current) {
        glowOrbRef.current.style.transform = `translate3d(${mousePos.current.x - 350}px, ${mousePos.current.y - 350}px, 0)`;
      }

      ctx.clearRect(0, 0, width, height);

      // Reduced motion fallback: draw static snapshot
      if (prefersReduced) {
        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i];
          if (!a) continue;

          ctx.beginPath();
          ctx.arc(a.x, a.y, a.baseRadius * 1.2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 212, 255, 0.6)';
          ctx.fill();

          for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j];
            if (!b) continue;

            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < connectDistanceSq) {
              const alpha = (1 - distSq / connectDistanceSq) * 0.35;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
              ctx.lineWidth = 0.9;
              ctx.stroke();
            }
          }
        }
        return;
      }

      // ── Render Layer 2: Neural Synapse Particles & Lines ──
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (!node) continue;

        node.x += node.vx * dt;
        node.y += node.vy * dt;

        // Bounce boundaries
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

        // Mouse magnetic deflection
        if (mousePos.current.active) {
          const mdx = node.x - mousePos.current.x;
          const mdy = node.y - mousePos.current.y;
          const mDistSq = mdx * mdx + mdy * mdy;

          if (mDistSq < mouseInfluenceRadiusSq && mDistSq > 1) {
            const mDist = Math.sqrt(mDistSq);
            const force = (1 - mDist / mouseInfluenceRadius) * 0.9;
            node.x += (mdx / mDist) * force * dt;
            node.y += (mdy / mDist) * force * dt;
          }
        }

        // Node pulsating glow
        node.pulsePhase += node.pulseSpeed;
        const pulse = Math.sin(node.pulsePhase) * 0.35 + 0.95;
        const currentRadius = node.baseRadius * pulse;

        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        if (node.hueType === 'cyan') {
          ctx.fillStyle = `rgba(0, 212, 255, ${0.7 * pulse})`;
          ctx.shadowColor = '#00D4FF';
          ctx.shadowBlur = 12;
        } else {
          ctx.fillStyle = `rgba(147, 197, 253, ${0.6 * pulse})`;
          ctx.shadowColor = '#93c5fd';
          ctx.shadowBlur = 10;
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
            const alpha = factor * 0.42; // brighter, crisper line connections

            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
            ctx.lineWidth = factor * 1.3 + 0.4;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        }
      }

      // ── Render Layer 3: Near Floating Bokeh Embers ──
      for (let k = 0; k < embers.length; k++) {
        const ember = embers[k];
        if (!ember) continue;

        ember.y += ember.vy * dt;
        ember.pulse += 0.02;

        // Wrap around vertically
        if (ember.y < -20) {
          ember.y = height + 20;
          ember.x = Math.random() * width;
        }

        const alphaPulse = Math.sin(ember.pulse) * 0.15 + ember.maxAlpha;

        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${Math.max(0.05, alphaPulse)})`;
        ctx.shadowColor = '#00D4FF';
        ctx.shadowBlur = 16;
        ctx.fill();
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
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none bg-[#080C16]"
    >
      {/* ══════════════════════════════════════════════════════════════
          LAYER 1: FAR AURORA & NEBULA CLUSTERS (Parallax Velocity: 0.12x)
      ══════════════════════════════════════════════════════════════ */}
      <div
        ref={farLayerRef}
        className="absolute inset-0 w-full h-[140%] pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        {/* Nebula Cluster 1: Top-Left Cyan Neon & Cosmic Teal (behind Hero & Overview) */}
        <div
          className="absolute -top-[5%] -left-[10%] w-[750px] sm:w-[950px] h-[750px] sm:h-[950px] rounded-full bg-gradient-to-br from-[#00D4FF]/30 via-[#0080B0]/35 to-transparent blur-[120px] opacity-85 animate-pulse duration-[7000ms]"
          style={{ willChange: 'transform, opacity' }}
        />

        {/* Nebula Cluster 2: Center-Right Electric Royal Blue (behind Skills & Projects) */}
        <div
          className="absolute top-[35%] -right-[12%] w-[850px] sm:w-[1050px] h-[850px] sm:h-[1050px] rounded-full bg-gradient-to-bl from-[#1E40AF]/45 via-[#00D4FF]/25 to-transparent blur-[140px] opacity-85"
          style={{ willChange: 'transform' }}
        />

        {/* Nebula Cluster 3: Bottom-Left Deep Sky & Indigo (behind Contact & Reach Out) */}
        <div
          className="absolute bottom-[5%] -left-[12%] w-[800px] sm:w-[1000px] h-[800px] sm:h-[1000px] rounded-full bg-gradient-to-tr from-[#0284c7]/35 via-[#0f172a]/50 to-transparent blur-[130px] opacity-90"
          style={{ willChange: 'transform' }}
        />
      </div>

      {/* Interactive Cursor-Tracking Ambient Spotlight Glow (Luminance Boosted) */}
      <div
        ref={glowOrbRef}
        className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full bg-accent/[0.14] blur-[130px] opacity-90 pointer-events-none transition-opacity duration-500"
        style={{ willChange: 'transform' }}
      />

      {/* Cyber Grid Matrix Pattern (Opacity increased to 0.055 for crisp texture) */}
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #00D4FF 1px, transparent 1px), linear-gradient(to bottom, #00D4FF 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* ══════════════════════════════════════════════════════════════
          LAYER 2 & 3: MID NEURAL SYNAPSE + NEAR BOKEH EMBERS (Parallax Velocity: 0.38x & 0.72x)
      ══════════════════════════════════════════════════════════════ */}
      <div
        ref={midLayerRef}
        className="absolute inset-0 w-full h-[130%] pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      </div>

      {/* Near Layer Wrapper for smooth parallax staging */}
      <div
        ref={nearLayerRef}
        className="absolute inset-0 w-full h-[160%] pointer-events-none"
        style={{ willChange: 'transform' }}
      />

      {/* ══════════════════════════════════════════════════════════════
          LAYER 4: SOFTENED CONTRAST GUARD (Bright Peripheral, Clean Center)
      ══════════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 30%, transparent 55%, rgba(8, 12, 22, 0.35) 80%, rgba(8, 12, 22, 0.75) 100%)',
        }}
      />
    </div>
  );
};
