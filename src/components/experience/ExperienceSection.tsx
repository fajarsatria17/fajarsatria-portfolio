import React from 'react';
import { useLanguage } from '@hooks/useLanguage';
import { SectionHeader } from '@components/ui';
import { Timeline, TimelineItem } from '@components/timeline';
import { experience } from '@data/experience';
import { filterPublished, sortByOrder } from '@utils/content';
import { formatDateRange } from '@utils/date';

export const ExperienceSection: React.FC = () => {
  const { t, localize, language } = useLanguage();

  const publishedExperience = sortByOrder(filterPublished(experience));

  return (
    <section
      id="experience"
      aria-label={t.sections.experienceTitle}
      data-testid="experience-section"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-20"
    >
      <SectionHeader
        eyebrow="03 / CAREER"
        title={t.sections.experienceTitle}
        subtitle={t.sections.experienceSubtitle}
      />

      <div data-testid="experience-timeline">
        <Timeline aria-label="Work Experience Timeline">
          {publishedExperience.map((item) => {
            const periodString = formatDateRange(
              item.startDate,
              item.endDate,
              item.isCurrent,
              language
            );

            const details = [item.division, item.team, item.department].filter(Boolean).join(' | ');

            return (
              <TimelineItem
                key={item.id}
                title={localize(item.role)}
                subtitle={
                  <span className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="text-accent font-semibold">@ {item.organization}</span>
                    {details && (
                      <span className="text-xs font-mono text-text-tertiary">
                        ({details})
                      </span>
                    )}
                  </span>
                }
                period={periodString}
                isCurrent={item.isCurrent}
                description={localize(item.description)}
                tags={item.technologies}
              />
            );
          })}
        </Timeline>
      </div>
    </section>
  );
};
