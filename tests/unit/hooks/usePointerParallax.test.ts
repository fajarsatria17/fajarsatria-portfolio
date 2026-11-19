import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePointerParallax } from '@hooks/usePointerParallax';

describe('usePointerParallax Hook', () => {
  beforeEach(() => {
    // Mock matchMedia to simulate desktop mouse pointer: (hover: hover) and (pointer: fine)
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('pointer: fine'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  it('initializes pointer target at neutral [0, 0]', () => {
    const container = document.createElement('div');
    const containerRef = { current: container };

    const { result } = renderHook(() => usePointerParallax(containerRef));
    expect(result.current.current).toEqual([0, 0]);
  });

  it('updates target on pointermove within clamp bounds', () => {
    const container = document.createElement('div');
    // Mock getBoundingClientRect
    container.getBoundingClientRect = vi.fn().mockReturnValue({
      left: 0,
      top: 0,
      width: 1000,
      height: 1000,
    });
    const containerRef = { current: container };

    const { result } = renderHook(() => usePointerParallax(containerRef, { clamp: 0.5 }));

    act(() => {
      const moveEvent = new PointerEvent('pointermove', {
        clientX: 750, // 75% -> raw: 0.5
        clientY: 750,
      });
      container.dispatchEvent(moveEvent);
    });

    expect(result.current.current[0]).toBeCloseTo(0.5, 2);
    expect(result.current.current[1]).toBeCloseTo(0.5, 2);
  });

  it('smoothly resets target to [0, 0] on pointerleave (TC-HR-004)', () => {
    const container = document.createElement('div');
    container.getBoundingClientRect = vi.fn().mockReturnValue({
      left: 0,
      top: 0,
      width: 100,
      height: 100,
    });
    const containerRef = { current: container };

    const { result } = renderHook(() => usePointerParallax(containerRef));

    act(() => {
      container.dispatchEvent(new PointerEvent('pointermove', { clientX: 80, clientY: 80 }));
    });
    expect(result.current.current).not.toEqual([0, 0]);

    act(() => {
      container.dispatchEvent(new PointerEvent('pointerleave'));
    });
    expect(result.current.current).toEqual([0, 0]);
  });
});
