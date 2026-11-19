import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useReducedMotion } from '@hooks/useReducedMotion';

export interface ScrambleTextProps {
  text: string;
  trigger?: 'view' | 'hover' | 'both' | 'mount';
  speed?: number; // ms per step (default: 22ms)
  delay?: number; // initial delay on mount/view in ms (default: 0)
  className?: string;
  scrambleChars?: string;
  respectReducedMotion?: boolean;
}

const CYBER_GLYPHS = '01#_X/[]*+—=!?<>ABCDEF0123456789';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  trigger = 'both',
  speed = 22,
  delay = 0,
  className,
  scrambleChars = CYBER_GLYPHS,
  respectReducedMotion = false,
}) => {
  const prefersReduced = useReducedMotion();
  const [displayText, setDisplayText] = useState(text);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isAnimatingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasViewAnimatedRef = useRef(false);

  const isTest = typeof process !== 'undefined' && process.env?.NODE_ENV === 'test';

  const startScramble = useCallback(
    (instant = false) => {
      // Keep static text in unit tests for deterministic testing
      if (isTest) {
        setDisplayText(text);
        return;
      }

      // Respect accessibility if explicitly requested
      if (respectReducedMotion && prefersReduced) {
        setDisplayText(text);
        return;
      }

      // Clear any active animation timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      isAnimatingRef.current = true;
      const textLen = text.length;

      // Pacing calculation:
      // Short texts (<20 chars): 1 char/tick (~350ms)
      // Medium texts (20-40 chars): 1-2 chars/tick (~500ms)
      // Long texts (>40 chars): ~2 chars/tick (~600ms)
      const stepIncrement = textLen <= 20 ? 1 : Math.max(1, Math.round(textLen / 22));

      // Initial glitch shuffle frames before progressive resolve
      let glitchTicks = instant ? 1 : 3;
      let step = 0;

      const tick = () => {
        if (glitchTicks > 0) {
          glitchTicks--;
          const glitched = text
            .split('')
            .map((char) => {
              if (char === ' ') return ' ';
              return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            })
            .join('');
          setDisplayText(glitched);
          timerRef.current = setTimeout(tick, speed);
          return;
        }

        const nextText = text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < step) {
              return text[index];
            }
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join('');

        setDisplayText(nextText);

        if (step >= textLen) {
          setDisplayText(text);
          isAnimatingRef.current = false;
        } else {
          step += stepIncrement;
          timerRef.current = setTimeout(tick, speed);
        }
      };

      const waitTime = instant ? 0 : delay;
      if (waitTime > 0) {
        timerRef.current = setTimeout(tick, waitTime);
      } else {
        tick();
      }
    },
    [text, speed, delay, scrambleChars, respectReducedMotion, prefersReduced, isTest]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // When text changes (e.g. language toggle switch EN <-> ID)
  useEffect(() => {
    if (trigger === 'hover') {
      setDisplayText(text);
    } else {
      startScramble(true);
    }
  }, [text, trigger, startScramble]);

  // Mount trigger (for badges, telemetry HUD, hero elements)
  useEffect(() => {
    if (trigger === 'mount') {
      startScramble(false);
    }
  }, [trigger, startScramble]);

  // Viewport IntersectionObserver trigger (for on-scroll decode into view)
  useEffect(() => {
    if (trigger === 'hover' || trigger === 'mount') return;

    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      startScramble(false);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          if (!hasViewAnimatedRef.current) {
            hasViewAnimatedRef.current = true;
            startScramble(false);
          }
        } else {
          hasViewAnimatedRef.current = false;
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger, startScramble]);

  // Interactive Hover: always triggers instantly (0ms delay) with snappy cyber decode
  const handleMouseEnter = () => {
    if (trigger === 'hover' || trigger === 'both') {
      startScramble(true);
    }
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={className}
      aria-label={text}
    >
      {displayText}
    </span>
  );
};
