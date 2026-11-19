import React from 'react';
import { useLanguage } from '@hooks/useLanguage';
import { SectionHeader, Card, Badge, ExternalLink } from '@components/ui';
import { Timeline, TimelineItem } from '@components/timeline';
import { education } from '@data/education';
import { filterPublished, sortByOrder } from '@utils/content';
import { formatDateRange } from '@utils/date';
import { GraduationCap, Article, ArrowSquareOut } from '@phosphor-icons/react';

export const EducationSection: React.FC = () => {
  const { t, localize, language } = useLanguage();

  const publishedEducation = sortByOrder(filterPublished(education));

  return (
    <section
      id="education"
      aria-label={t.sections.educationTitle}
      data-testid="education-section"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-20"
    >
      <SectionHeader
        eyebrow="04 / ACADEMICS"
        title={t.sections.educationTitle}
        subtitle={t.sections.educationSubtitle}
      />

      <div data-testid="education-timeline">
        {publishedEducation.length === 0 ? (
          <Card className="text-center p-8 text-text-tertiary font-mono text-sm">
            {t.education.empty}
          </Card>
        ) : (
          <Timeline aria-label="Education Timeline">
            {publishedEducation.map((item) => {
              const periodString = formatDateRange(
                item.startDate,
                item.endDate,
                false,
                language
              );

              return (
                <TimelineItem
                  key={item.id}
                  title={
                    <span className="flex flex-wrap items-center gap-2">
                      <span>{localize(item.program)}</span>
                      {item.gpa && (
                        <Badge variant="accent" className="text-xs font-mono">
                          GPA: {item.gpa}
                        </Badge>
                      )}
                    </span>
                  }
                  subtitle={
                    <span className="flex items-center gap-1.5 text-accent font-semibold">
                      <GraduationCap size={16} aria-hidden="true" />
                      {item.institution}
                    </span>
                  }
                  period={periodString}
                  description={
                    <div className="space-y-4">
                      {item.description && (
                        <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
                          {localize(item.description)}
                        </p>
                      )}

                      {/* Thesis Details */}
                      {item.thesis && (
                        <div className="p-3.5 rounded-lg bg-bg-surface/60 border border-border/60 text-xs sm:text-sm">
                          <span className="font-mono text-xs font-semibold text-accent uppercase tracking-wider block mb-1">
                            {t.education.thesisLabel}:
                          </span>
                          <span className="italic text-text-primary">
                            &ldquo;{localize(item.thesis)}&rdquo;
                          </span>
                        </div>
                      )}

                      {/* Publication Details & DOI Link */}
                      {item.publication && (
                        <div className="p-3.5 rounded-lg bg-bg-surface/60 border border-accent/20 text-xs sm:text-sm space-y-1.5">
                          <div className="flex items-center gap-1.5 text-accent font-mono text-xs font-semibold uppercase tracking-wider">
                            <Article size={15} aria-hidden="true" />
                            <span>{t.education.publicationLabel}</span>
                          </div>
                          <div className="text-text-primary font-medium">
                            {item.publication.journal} — {item.publication.issue}
                          </div>
                          <div>
                            <ExternalLink
                              href={item.publication.doi}
                              className="text-xs font-mono text-accent hover:underline inline-flex items-center gap-1"
                            >
                              <span>{t.education.viewDoi}</span>
                              <ArrowSquareOut size={13} aria-hidden="true" />
                            </ExternalLink>
                          </div>
                        </div>
                      )}

                      {/* Relevant Coursework */}
                      {item.coursework && item.coursework.length > 0 && (
                        <div className="pt-2">
                          <span className="font-mono text-xs text-text-tertiary block mb-2">
                            {t.education.courseworkLabel}:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {item.coursework.map((course) => (
                              <Badge key={course.en} variant="surface" className="text-xs">
                                {localize(course)}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  }
                />
              );
            })}
          </Timeline>
        )}
      </div>
    </section>
  );
};
