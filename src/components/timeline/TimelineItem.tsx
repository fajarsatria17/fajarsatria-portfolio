import React from 'react';
import { Card, Badge } from '@components/ui';
import { cn } from '@utils/cn';
import { CalendarBlank } from '@phosphor-icons/react';

export interface TimelineItemProps {
  title: string | React.ReactNode;
  subtitle: string | React.ReactNode;
  period: string;
  isCurrent?: boolean;
  description?: string | React.ReactNode;
  tags?: string[];
  className?: string;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  subtitle,
  period,
  isCurrent = false,
  description,
  tags = [],
  className,
}) => {
  return (
    <li className={cn('relative group', className)}>
      {/* Futuristic Timeline Node */}
      <div
        className="absolute -left-[31px] sm:-left-[39px] top-6 flex items-center justify-center"
        aria-hidden="true"
      >
        <span
          className={cn(
            'w-3.5 h-3.5 rounded-full border-2 transition-all duration-300',
            isCurrent
              ? 'border-accent bg-accent/30 shadow-[0_0_12px_rgba(0,212,255,0.7)]'
              : 'border-border bg-bg-surface group-hover:border-accent/60 group-hover:bg-accent/10'
          )}
        />
        {isCurrent && (
          <span className="absolute w-5 h-5 rounded-full bg-accent/20 animate-ping pointer-events-none" />
        )}
      </div>

      {/* Timeline Card */}
      <Card
        glow={isCurrent}
        className={cn(
          'transition-all duration-300 border-border/80 group-hover:border-accent/40',
          isCurrent && 'border-l-4 border-l-accent'
        )}
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
          <div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-text-primary tracking-tight">
              {title}
            </h3>
            <p className="text-sm sm:text-base font-medium text-accent mt-0.5">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-text-tertiary bg-bg-surface/80 border border-border/60 px-2.5 py-1 rounded-md self-start sm:self-auto shrink-0">
            <CalendarBlank size={13} className="text-accent/80" aria-hidden="true" />
            <span>{period}</span>
          </div>
        </div>

        {description && (
          <div className="text-text-secondary text-sm sm:text-base leading-relaxed mb-4">
            {description}
          </div>
        )}

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40" aria-label="Technologies used">
            {tags.map(tag => (
              <Badge key={tag} variant="surface" className="text-xs hover:border-accent/50 hover:text-accent transition-colors">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </Card>
    </li>
  );
};
