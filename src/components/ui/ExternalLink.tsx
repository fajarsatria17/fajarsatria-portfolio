import React, { type AnchorHTMLAttributes } from 'react';
import { cn } from '@utils/cn';
import { getSafeExternalRel } from '@utils/links';

export interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export const ExternalLink: React.FC<ExternalLinkProps> = ({
  href,
  className,
  target = '_blank',
  rel,
  children,
  ...props
}) => {
  const safeRel = rel || getSafeExternalRel(target);

  return (
    <a
      href={href}
      target={target}
      rel={safeRel}
      className={cn(
        'inline-flex items-center gap-1 text-accent hover:text-accent-dim transition-colors focus-visible:outline-none focus-visible:underline',
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
};
