import React, { type HTMLAttributes } from 'react';
import { cn } from '@utils/cn';

export type BadgeVariant = 'default' | 'accent' | 'outline' | 'surface';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-mono transition-colors';

  const variants: Record<BadgeVariant, string> = {
    default: 'bg-bg-surface text-text-secondary border border-border',
    accent: 'bg-accent/10 text-accent border border-accent/30',
    outline: 'bg-transparent text-text-tertiary border border-border',
    surface: 'bg-bg-elevated text-text-primary',
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </span>
  );
};
