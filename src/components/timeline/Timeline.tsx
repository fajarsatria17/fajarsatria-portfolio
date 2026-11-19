import React from 'react';
import { cn } from '@utils/cn';

export interface TimelineProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

export const Timeline: React.FC<TimelineProps> = ({
  children,
  className,
  'aria-label': ariaLabel,
}) => {
  return (
    <ol
      aria-label={ariaLabel}
      className={cn(
        'relative border-l-2 border-border/80 ml-4 sm:ml-6 space-y-6 sm:space-y-8 pl-6 sm:pl-8 list-none',
        className
      )}
    >
      {children}
    </ol>
  );
};
