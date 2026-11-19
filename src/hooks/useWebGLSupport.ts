import { useState, useEffect } from 'react';

/**
 * Checks for hardware/browser WebGL capability.
 * Fallback to static representation if false (PRD HR-009).
 */
export function useWebGLSupport(): boolean {
  const [isSupported, setIsSupported] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    try {
      const canvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setIsSupported(!!gl);
    } catch {
      setIsSupported(false);
    }
  }, []);

  return isSupported;
}
