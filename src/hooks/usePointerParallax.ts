import { useEffect, useRef } from 'react';

export interface PointerParallaxOptions {
  clamp?: number; // Maximum tilt angle/factor (default: 0.5)
}

/**
 * Hook for capturing smooth normalized pointer movements for 3D parallax.
 * Enforces fine-pointer (mouse) checks so touch devices do not trigger pointer parallax (MOT-007).
 * When pointer leaves, target smoothly returns to [0, 0] (AC-HR-03).
 */
export function usePointerParallax(
  containerRef: React.RefObject<HTMLElement | null>,
  options: PointerParallaxOptions = {}
) {
  const { clamp = 0.5 } = options;
  const target = useRef<[number, number]>([0, 0]);
  const isPointerInside = useRef<boolean>(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === 'undefined') return;

    // Check for fine pointer and hover support (desktop mouse)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) {
      return; // Touch devices or coarse pointers: disabled by default (HD-005)
    }

    const handlePointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      // Normalize coordinates to -1 to +1 range relative to container center
      const rawX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const rawY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      // Clamp to prevent extreme rotation (R-HR-03)
      const clampedX = Math.max(-clamp, Math.min(clamp, rawX));
      const clampedY = Math.max(-clamp, Math.min(clamp, rawY));

      target.current = [clampedX, clampedY];
      isPointerInside.current = true;
    };

    const handlePointerLeave = () => {
      isPointerInside.current = false;
      // Smoothly return to neutral position (AC-HR-03 / TC-HR-004)
      target.current = [0, 0];
    };

    el.addEventListener('pointermove', handlePointerMove, { passive: true });
    el.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    return () => {
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [containerRef, clamp]);

  return target;
}
