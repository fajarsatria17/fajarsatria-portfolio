# Hero Section 3D Technical Specification
## Personal Portfolio Website — Dark Futuristic
**Document Version:** 1.0 | **PRD Version:** 1.1 (Addendum)  
**Date:** 2026-11-13

---

## 1. Overview

The Hero Section 3D visual is an **abstract procedural geometric orb** rendered using Three.js via React Three Fiber. It is a **decorative, non-essential** visual element that enhances the dark futuristic aesthetic while never blocking content, accessibility, or performance.

**Core Principle:** The 3D scene is a progressive enhancement. The website must be fully functional without it.

---

## 2. Component Architecture

```
HeroSection (layout wrapper — always renders HTML)
│
├── HeroContent (z-index: above canvas; HTML only)
│   ├── <p class="eyebrow"> — "HELLO, I'M"
│   ├── <h1> — Owner name
│   ├── <p class="headline"> — Headline/role
│   ├── <p class="copy"> — Supporting copy
│   └── HeroActions
│       ├── <Button> View Projects (primary)
│       ├── <Button> Contact Me (secondary)
│       └── Social links
│
└── HeroSceneWrapper (position: absolute; fill right side; z-index: 0)
    │
    ├── IF: prefers-reduced-motion OR sceneFailed OR !webGLSupported
    │   └── HeroSceneFallback (static CSS illustration / SVG)
    │
    └── IF: normal capabilities
        └── React.Suspense (fallback: HeroSceneFallback)
            └── HeroScene (lazy loaded)
                └── <Canvas> (R3F)
                    ├── <PerspectiveCamera>
                    ├── <ambientLight>
                    ├── <pointLight> (accent color glow)
                    ├── <pointLight> (secondary fill)
                    └── <AbstractOrb>
                        ├── Geometry (IcosahedronGeometry or custom)
                        ├── Material (MeshStandardMaterial / custom shader)
                        └── useFrame (idle rotation + pointer lerp)
```

---

## 3. Technology Implementation Details

### 3.1 Canvas Configuration

```tsx
// src/components/hero/HeroScene.tsx
import { Canvas } from '@react-three/fiber';

<Canvas
  dpr={Math.min(window.devicePixelRatio, 2)}  // Max DPR = 2 (performance guard HR-010)
  gl={{
    antialias: true,
    alpha: true,          // Transparent background — blends with CSS bg
    powerPreference: 'default',  // Not 'high-performance' to avoid GPU heat on idle
  }}
  camera={{ position: [0, 0, 5], fov: 45 }}
  style={{
    pointerEvents: 'none',  // Canvas does NOT intercept clicks (AC-HR-10)
    position: 'absolute',
    inset: 0,
  }}
  aria-hidden="true"      // Decorative canvas — hidden from screen readers
  onCreated={({ gl }) => {
    // Store renderer for cleanup reference
  }}
>
```

**Key configuration decisions:**
- `dpr` capped at 2 — prevents excessive GPU load on HiDPI displays (HR-010)
- `alpha: true` — canvas background transparent, CSS gradient shows through
- `pointerEvents: 'none'` — canvas never blocks CTA clicks (AC-HR-10)
- `aria-hidden="true"` — screen readers see only the HTML content (FR-016)

---

### 3.2 Abstract Orb Geometry

**Decision (HD-001 recommended):** Procedural geometry — `IcosahedronGeometry` with detail level 4, optionally enhanced with displacement/noise shader.

```tsx
// src/components/hero/AbstractOrb.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';

function AbstractOrb({ pointerTarget }: { pointerTarget: React.RefObject<[number, number]> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const currentRotation = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // ── Idle rotation (HR-004) ──
    meshRef.current.rotation.y += delta * 0.15;  // ~54°/sec → slow
    meshRef.current.rotation.x += delta * 0.07;

    // ── Pointer parallax lerp (HR-003) ──
    const [targetX, targetY] = pointerTarget.current ?? [0, 0];
    // Lerp factor 0.05 — smooth, not snappy
    currentRotation.current.x += (targetY * 0.4 - currentRotation.current.x) * 0.05;
    currentRotation.current.y += (targetX * 0.4 - currentRotation.current.y) * 0.05;

    meshRef.current.rotation.x += currentRotation.current.x;
    meshRef.current.rotation.y += currentRotation.current.y;
  });

  return (
    <mesh ref={meshRef} scale={1.8}>
      <icosahedronGeometry args={[1, 4]} />
      <MeshDistortMaterial
        color="#00D4FF"
        emissive="#003355"
        emissiveIntensity={0.4}
        roughness={0.1}
        metalness={0.8}
        distort={0.3}       // Organic distortion amount
        speed={1.5}         // Distort animation speed
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}
```

**Alternative geometry options if MeshDistortMaterial is too heavy:**
- `TorusKnotGeometry` with `MeshStandardMaterial` (wire + solid layers)
- `SphereGeometry` with custom vertex shader (noise displacement)
- `OctahedronGeometry` with wireframe overlay (very lightweight)

**Bundle trade-off for MeshDistortMaterial (Drei):** Adds ~25KB to the lazy chunk. Acceptable as it's already in the lazy-loaded 3D bundle.

---

### 3.3 Lighting Setup

```tsx
// Inside <Canvas>
<>
  {/* Soft ambient — prevents pitch-black shadows */}
  <ambientLight intensity={0.2} />

  {/* Primary accent glow — electric blue/cyan */}
  <pointLight
    position={[2, 3, 4]}
    color="#00D4FF"
    intensity={3}
    distance={10}
    decay={2}
  />

  {/* Secondary fill — complementary color */}
  <pointLight
    position={[-3, -2, 2]}
    color="#0066FF"
    intensity={1.5}
    distance={8}
    decay={2}
  />

  {/* Rim light — subtle highlight */}
  <pointLight
    position={[0, -3, -3]}
    color="#ffffff"
    intensity={0.5}
    distance={6}
    decay={2}
  />
</>
```

---

### 3.4 Pointer Parallax Implementation

```tsx
// src/hooks/usePointerParallax.ts
import { useEffect, useRef } from 'react';

export function usePointerParallax(containerRef: React.RefObject<HTMLElement>) {
  const target = useRef<[number, number]>([0, 0]);
  const isPointerInside = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Only activate on fine pointer devices (hover: hover && pointer: fine)
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!finePointer.matches) return;  // Touch devices: skip (MOT-007)

    const handleMove = (e: PointerEvent) => {
      if (!isPointerInside.current) return;
      const rect = el.getBoundingClientRect();
      // Normalize to -1..1 range
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      // Clamp to prevent extreme tilt
      target.current = [Math.max(-0.6, Math.min(0.6, x)), Math.max(-0.6, Math.min(0.6, y))];
    };

    const handleEnter = () => { isPointerInside.current = true; };
    
    const handleLeave = () => {
      isPointerInside.current = false;
      // Let lerp return to [0, 0] naturally (AC-HR-03: returns to neutral)
      target.current = [0, 0];
    };

    el.addEventListener('pointermove', handleMove, { passive: true });
    el.addEventListener('pointerenter', handleEnter, { passive: true });
    el.addEventListener('pointerleave', handleLeave, { passive: true });

    return () => {
      el.removeEventListener('pointermove', handleMove);
      el.removeEventListener('pointerenter', handleEnter);
      el.removeEventListener('pointerleave', handleLeave);
    };
  }, [containerRef]);

  return target;
}
```

**Key implementation rules from PRD:**
- Only active on `hover: hover` and `pointer: fine` media query (MOT-007, HR-003)
- Returns to neutral `[0, 0]` on pointer leave — lerp handles smooth return (AC-HR-03)
- Clamp ±0.6 prevents extreme rotation (R-HR-03 mitigation)
- `passive: true` event listeners — doesn't block scroll (performance)

---

### 3.5 Reduced Motion & WebGL Fallback Logic

```tsx
// src/components/hero/HeroSection.tsx
import React, { Suspense, useState } from 'react';
import { useReducedMotion } from '@hooks/useReducedMotion';
import { useWebGLSupport } from '@hooks/useWebGLSupport';
import HeroContent from './HeroContent';
import HeroSceneFallback from './HeroSceneFallback';

const HeroScene = React.lazy(() => import('./HeroScene'));

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const webGLSupported = useWebGLSupport();
  const [sceneFailed, setSceneFailed] = useState(false);

  const showFallback = reduceMotion || !webGLSupported || sceneFailed;

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Content: always rendered first, always above canvas */}
      <HeroContent />

      {/* Visual: decorative, right side of layout */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {showFallback ? (
          <HeroSceneFallback />
        ) : (
          <Suspense fallback={<HeroSceneFallback />}>
            <HeroScene onError={() => setSceneFailed(true)} />
          </Suspense>
        )}
      </div>
    </section>
  );
}
```

---

### 3.6 WebGL Support Detection

```tsx
// src/hooks/useWebGLSupport.ts
export function useWebGLSupport(): boolean {
  // Check synchronously — no need for effect since it doesn't change after load
  if (typeof window === 'undefined') return false;
  
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('webgl2') || canvas.getContext('webgl');
    return !!ctx;
  } catch {
    return false;
  }
}
```

---

### 3.7 Reduced Motion Hook

```tsx
// src/hooks/useReducedMotion.ts
import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [reduceMotion, setReduceMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduceMotion;
}
```

---

### 3.8 Tab Visibility Optimization

```tsx
// src/hooks/useTabVisibility.ts
// Used inside HeroScene to pause rendering when tab is hidden (MOT-008)
import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

export function usePauseOnHidden() {
  const { gl } = useThree();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause: tell R3F to stop rendering frames
        gl.setAnimationLoop(null);
      } else {
        // Resume: R3F restarts its own loop
        // (R3F restores this automatically on next render trigger)
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [gl]);
}
```

> R3F 8 handles its own render loop via `useFrame`. When the tab is hidden, browsers already throttle `requestAnimationFrame`. This hook provides an explicit pause as an additional optimization.

---

### 3.9 Error Boundary for 3D Scene

```tsx
// src/components/hero/HeroSceneErrorBoundary.tsx
import { Component, type ReactNode } from 'react';
import HeroSceneFallback from './HeroSceneFallback';

interface Props {
  children: ReactNode;
  onError?: () => void;
}

interface State {
  hasError: boolean;
}

export class HeroSceneErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // Log error without exposing internals (SEC-012)
    console.error('[HeroScene] 3D rendering error:', error.message);
    this.props.onError?.();
  }

  render() {
    if (this.state.hasError) {
      return <HeroSceneFallback />;
    }
    return this.props.children;
  }
}
```

---

### 3.10 Static Fallback Design

The `HeroSceneFallback` renders a **CSS + SVG abstract visual** that maintains the dark futuristic aesthetic without WebGL:

```tsx
// src/components/hero/HeroSceneFallback.tsx
export function HeroSceneFallback() {
  return (
    <div
      className="hero-fallback"
      aria-hidden="true"
      style={{
        // Concentric circles with accent color gradient
        // Subtle radial gradient glow
        // No animation (reduced motion safe)
      }}
    >
      {/* SVG abstract geometric rings */}
      <svg viewBox="0 0 400 400" className="orb-fallback-svg">
        <defs>
          <radialGradient id="orb-gradient" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.6" />
            <stop offset="40%" stopColor="#0066FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0A0E1A" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="180" fill="url(#orb-gradient)" />
        <circle cx="200" cy="200" r="140" fill="none" stroke="#00D4FF" strokeWidth="1" strokeOpacity="0.3" />
        <circle cx="200" cy="200" r="100" fill="none" stroke="#00D4FF" strokeWidth="0.5" strokeOpacity="0.2" />
        <circle cx="200" cy="200" r="60" fill="none" stroke="#00D4FF" strokeWidth="0.5" strokeOpacity="0.4" />
      </svg>
    </div>
  );
}
```

---

## 4. Performance Specification

### 4.1 Performance Budget

| Metric | Target | Measurement Tool |
|---|---|---|
| 3D bundle chunk (lazy) | ≤ 400KB gzipped | Vite bundle analyzer |
| Time to 3D scene visible | ≤ 3s on 3G (acceptable; not LCP) | Chrome DevTools Network |
| LCP (hero text visible) | ≤ 2.5s | Lighthouse / CWV |
| CLS from canvas mounting | 0 | Lighthouse / CWV |
| FPS (desktop, idle) | 30–60fps steady | Chrome Performance panel |
| FPS (mobile, if enabled) | 20–30fps acceptable | Mobile DevTools |
| GPU memory usage | Monitor with profiler | Chrome GPU panel |

### 4.2 Optimization Techniques Applied

| Technique | Implementation |
|---|---|
| Lazy load 3D bundle | `React.lazy(() => import('./HeroScene'))` |
| DPR cap | `Math.min(window.devicePixelRatio, 2)` |
| Pointer event throttling | `passive: true` listeners; lerp smoothing |
| Tab visibility pause | Page Visibility API in `useEffect` |
| Geometry simplicity | `IcosahedronGeometry(1, 4)` — ~642 triangles (not high-poly) |
| No external model files | Procedural geometry only — no GLTF/OBJ loading |
| No heavy textures | Material shaders only — no image textures |
| Dispose on unmount | `useEffect` cleanup: `geometry.dispose()`, `material.dispose()`, `renderer.dispose()` |

### 4.3 Resource Cleanup

```tsx
// Always dispose Three.js resources on unmount (memory leak prevention)
useEffect(() => {
  return () => {
    if (meshRef.current) {
      meshRef.current.geometry.dispose();
      if (Array.isArray(meshRef.current.material)) {
        meshRef.current.material.forEach(m => m.dispose());
      } else {
        meshRef.current.material.dispose();
      }
    }
  };
}, []);
```

---

## 5. Interaction Specification Summary

| Interaction | Trigger | Behavior | Fallback |
|---|---|---|---|
| Initial entrance | Page load | Hero content fades in (staggered, 100ms delay per item) | Elements appear immediately |
| Idle 3D rotation | Continuous | Slow Y-axis + slight X-axis rotation (~0.15 rad/sec) | Static fallback image |
| Pointer parallax | Mouse move over hero | Orb tilts ±0.4 rad toward pointer; lerp factor 0.05 | No effect (touch/no-pointer) |
| Pointer leave | Mouse exits hero | Target reset to [0,0]; lerp returns to neutral smoothly | N/A |
| Hover on orb | Pointer over canvas | Slight glow increase via distort speed bump (optional) | N/A |
| CTA hover | Mouse over button | Background/border transition, glow effect | CSS transition only |
| CTA focus | Keyboard Tab | Visible focus ring (accent outline) | Same focus ring |
| Tab hidden | Switch tab | Render loop pauses (via Page Visibility API) | N/A |
| Tab restored | Return to tab | Render loop resumes | N/A |
| WebGL fail | Context error/loss | Error boundary catches; shows HeroSceneFallback | — (IS the fallback) |

---

## 6. Mobile Behavior

| Scenario | Behavior |
|---|---|
| `pointer: coarse` (touch screen) | Pointer parallax **disabled** (MOT-007) |
| Small viewport (< 768px) | 3D canvas positioned below content (stacked layout) |
| 3D on mobile | Light idle animation only if device capability allows; default **off** (HD-005) |
| Performance concern | Consider `useFrame` conditional: skip frames on mobile using `state.clock.elapsedTime % 2 < 0.016` |
| Canvas size | Smaller canvas on mobile (e.g., 300×300) reduces GPU load |

---

## 7. Decisions Requiring Owner Confirmation

| ID | Decision | Current Recommendation |
|---|---|---|
| HD-001 | 3D object type | Abstract geometric orb (IcosahedronGeometry + MeshDistortMaterial) |
| HD-002 | Accent color | Electric Blue `#00D4FF` / Cyan (final via design mockup) |
| HD-003 | Secondary CTA | "Contact Me" (not "Download CV") |
| HD-004 | Procedural vs. custom model | Procedural (IcosahedronGeometry) for lightweight MVP |
| HD-005 | Mobile idle animation | Default OFF; static fallback on mobile |
| Performance budget | Acceptable Lighthouse range with 3D | Lighthouse ≥ 85 with 3D enabled (not 90) |

> **Note on Performance:** Achieving Lighthouse Performance ≥ 90 with a WebGL 3D scene is achievable but requires careful lazy loading and ensuring LCP is from text, not the canvas. The 3D scene should **never** be the LCP element.
