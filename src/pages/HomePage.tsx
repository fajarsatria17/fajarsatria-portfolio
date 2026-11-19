import React from 'react';
import { useLanguage } from '@hooks/useLanguage';
import { PageLayout } from '@components/layout';
import { SEOHead } from '@components/seo';
import { SectionHeader, Card, Badge, ExternalLink, ProjectImage, ScrambleText } from '@components/ui';
import { HeroSection } from '@components/hero';
import { AboutSection } from '@components/about';
import { SkillsSection } from '@components/skills';
import { ExperienceSection } from '@components/experience';
import { EducationSection } from '@components/education';
import { ContactSection } from '@components/contact';
import { projects } from '@data/projects';
import { filterPublished, sortByOrder } from '@utils/content';

export const HomePage: React.FC = () => {
  const { t, localize } = useLanguage();

  const publishedProjects = sortByOrder(filterPublished(projects));

  return (
    <PageLayout>
      <SEOHead />

      {/* Hero Section (Phase 3: 3D Interactive & Content) */}
      <HeroSection />

      {/* About Section (Phase 4) */}
      <AboutSection />

      {/* Skills Section (Phase 4) */}
      <SkillsSection />

      {/* Experience Section (Phase 4) */}
      <ExperienceSection />

      {/* Education Section (Phase 4) */}
      <EducationSection />

      {/* Projects Section (Placeholder until Phase 5) */}
      <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20">
        <SectionHeader
          eyebrow="05 / PORTFOLIO"
          title={t.sections.projectsTitle}
          subtitle={t.sections.projectsSubtitle}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedProjects.map(proj => (
            <Card key={proj.id} glow className="flex flex-col justify-between group">
              <div>
                <div className="mb-4">
                  <ProjectImage
                    src={proj.authenticScreenshotUrl}
                    fallbackSrc={proj.fallbackIllustrationUrl || proj.thumbnailUrl}
                    alt={`${proj.title} preview`}
                    isAuthentic={proj.isAuthenticScreenshot}
                    showBadge={true}
                  />
                </div>
                <h3 className="font-display font-bold text-lg text-text-primary mb-2 group-hover:text-accent transition-colors">
                  <ScrambleText text={proj.title} trigger="both" speed={20} />
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  {localize(proj.summary)}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.technologies.slice(0, 3).map(tech => (
                    <Badge key={tech} variant="accent">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-border/50">
                  <a
                    href={`/projects/${proj.slug}`}
                    className="text-accent hover:underline flex items-center gap-1 font-semibold"
                  >
                    {t.projects.viewDetails} →
                  </a>
                  {proj.demoUrl && (
                    <ExternalLink href={proj.demoUrl} className="text-text-tertiary hover:text-accent">
                      {t.projects.liveDemo}
                    </ExternalLink>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section (Phase 6 Final Release) */}
      <ContactSection />
    </PageLayout>
  );
};
