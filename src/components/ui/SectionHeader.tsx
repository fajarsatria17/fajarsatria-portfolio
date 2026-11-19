import React from 'react';
import { cn } from '@utils/cn';
import { ScrambleText } from './ScrambleText';

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
  disableScramble?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className,
  disableScramble = false,
}) => {
  return (
    <div
      className={cn(
        'mb-12',
        align === 'center' ? 'text-center mx-auto max-w-2xl' : 'text-left max-w-2xl',
        className
      )}
    >
      {eyebrow && (
        <span className="inline-block text-xs font-mono font-semibold tracking-widest text-accent uppercase mb-2">
          {disableScramble ? eyebrow : <ScrambleText text={eyebrow} trigger="both" speed={18} />}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary tracking-tight">
        {disableScramble ? title : <ScrambleText text={title} trigger="both" speed={22} />}
      </h2>
      {subtitle && (
        <p className="mt-3 text-text-secondary text-base sm:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
