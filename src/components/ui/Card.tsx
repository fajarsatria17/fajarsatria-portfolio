import React, { type HTMLAttributes } from 'react';
import { cn } from '@utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glow = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-bg-elevated/70 backdrop-blur-sm border border-border rounded-xl p-6 transition-all duration-300 hover:border-accent/30',
          glow && 'hover:shadow-glow-sm',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
