import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@hooks/useLanguage';
import { PageLayout } from '@components/layout';
import { SEOHead } from '@components/seo';
import { Card, Badge, Button, ExternalLink, ProjectImage, Lightbox, ScrambleText } from '@components/ui';
import { projects } from '@data/projects';
import {
  ArrowLeft,
  ArrowSquareOut,
  GithubLogo,
  ShieldCheck,
  CheckCircle,
  Lightning,
  Cpu,
  Wrench,
  ChartLineUp,
  Lock,
  Info,
} from '@phosphor-icons/react';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, localize, language } = useLanguage();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<{
    url: string;
    title: string;
    caption?: string;
    isAuthentic?: boolean;
  } | null>(null);

  const project = projects.find(p => p.slug === slug && p.published);

  if (!project) {
    return (
      <PageLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl font-display font-bold text-text-primary mb-4">
            {t.notFound.title}
          </h1>
          <p className="text-text-secondary mb-6">{t.projects.empty}</p>
          <Link to="/">
            <Button variant="outline">{t.projects.backToProjects}</Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  const handleOpenLightbox = (url: string, title: string, caption?: string, isAuthentic?: boolean) => {
    setActiveImage({ url, title, caption, isAuthentic });
    setLightboxOpen(true);
  };

  const details = project.details;

  return (
    <PageLayout>
      <SEOHead
        title={`${project.title} | Fajar Satria`}
        description={localize(project.summary)}
      />

      <article className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Navigation Breadcrumb */}
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-sm font-mono text-accent hover:underline mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
        >
          <ArrowLeft size={16} />
          {t.projects.backToProjects}
        </Link>

        {/* Project Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="accent" className="uppercase font-mono text-xs">
              {project.category}
            </Badge>
            <span className="text-xs font-mono text-text-tertiary">
              {localize(project.role)}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-text-primary tracking-tight mb-4">
            <ScrambleText text={project.title} trigger="both" speed={20} />
          </h1>

          <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-3xl">
            {localize(project.summary)}
          </p>

          {/* Action Links */}
          {(project.demoUrl || project.repositoryUrl) && (
            <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-border/60">
              {project.demoUrl && (
                <ExternalLink href={project.demoUrl}>
                  <Button variant="primary" size="sm">
                    {t.projects.liveDemo}
                    <ArrowSquareOut size={16} />
                  </Button>
                </ExternalLink>
              )}
              {project.repositoryUrl && (
                <ExternalLink href={project.repositoryUrl}>
                  <Button variant="secondary" size="sm">
                    <GithubLogo size={16} />
                    {t.projects.sourceCode}
                  </Button>
                </ExternalLink>
              )}
            </div>
          )}
        </header>

        {/* Primary Featured Visual */}
        <div className="mb-14">
          <ProjectImage
            src={project.authenticScreenshotUrl}
            fallbackSrc={project.fallbackIllustrationUrl || project.thumbnailUrl}
            alt={`${project.title} primary interface`}
            isAuthentic={project.isAuthenticScreenshot}
            showBadge={true}
            onExpand={() =>
              handleOpenLightbox(
                project.authenticScreenshotUrl || project.fallbackIllustrationUrl || project.thumbnailUrl,
                project.title,
                localize(project.summary),
                project.isAuthenticScreenshot
              )
            }
            priority={true}
          />
          <div className="flex items-center justify-between text-xs font-mono text-text-tertiary mt-2.5 px-1">
            <span>{t.projects.clickToZoom}</span>
            <span>16:9 HD</span>
          </div>
        </div>

        {/* Case Study Content Sections */}
        <div className="space-y-12">
          {/* 1. Project Overview */}
          {details?.overview && (
            <Card className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-accent">
                <Info size={22} weight="bold" />
                <h2 className="text-xl font-display font-bold text-text-primary">
                  {t.projects.overview}
                </h2>
              </div>
              <p className="text-text-secondary text-base leading-relaxed">
                {localize(details.overview)}
              </p>
            </Card>
          )}

          {/* 2. Problem Statement & Core Objectives */}
          {details && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-accent">
                  <Lightning size={22} weight="bold" />
                  <h2 className="text-xl font-display font-bold text-text-primary">
                    {t.projects.problemStatement}
                  </h2>
                </div>
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                  {localize(details.problemStatement)}
                </p>
              </Card>

              <Card className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-accent">
                  <CheckCircle size={22} weight="bold" />
                  <h2 className="text-xl font-display font-bold text-text-primary">
                    {t.projects.objectives}
                  </h2>
                </div>
                <ul className="space-y-2.5 list-none p-0 m-0 text-sm sm:text-base text-text-secondary">
                  {details.objectives.map((obj, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      <span>{localize(obj)}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          )}

          {/* 3. My Role and Contributions */}
          {details?.roleAndContributions && (
            <Card className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-accent">
                <Wrench size={22} weight="bold" />
                <h2 className="text-xl font-display font-bold text-text-primary">
                  {t.projects.myRole}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {details.roleAndContributions.map((contrib, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-bg-surface border border-border/70 flex items-start gap-3"
                  >
                    <span className="text-xs font-mono text-accent font-bold mt-0.5">
                      0{idx + 1}
                    </span>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {localize(contrib)}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* 4. Key Modules and Functionality */}
          {details?.keyModules && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-accent">
                <Cpu size={22} weight="bold" />
                <h2 className="text-xl font-display font-bold text-text-primary">
                  {t.projects.keyModules}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {details.keyModules.map((mod, idx) => (
                  <Card key={idx} className="p-5 space-y-2 hover:border-accent/40 transition-colors">
                    <h3 className="font-display font-semibold text-text-primary text-base">
                      {localize(mod.title)}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {localize(mod.description)}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* 5. Actual Application Screenshots / Interface Gallery */}
          {project.galleryScreenshots && project.galleryScreenshots.length > 0 && (
            <div className="space-y-6 pt-4">
              <div>
                <div className="flex items-center gap-2 text-accent mb-1">
                  <ShieldCheck size={22} weight="bold" />
                  <h2 className="text-xl font-display font-bold text-text-primary">
                    {t.projects.screenshotsTitle}
                  </h2>
                </div>
                <p className="text-sm text-text-secondary">
                  {t.projects.screenshotsSubtitle}
                </p>
              </div>

              {/* Status Note when waiting for real screenshots */}
              {!project.isAuthenticScreenshot && (
                <div className="p-4 rounded-lg bg-bg-surface/80 border border-border flex items-start gap-3 text-xs font-mono text-text-tertiary">
                  <Info size={18} className="text-accent shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold text-text-secondary">
                      {t.projects.screenshotPending}
                    </p>
                    <p className="leading-relaxed">
                      {t.projects.screenshotPendingDesc}
                    </p>
                  </div>
                </div>
              )}

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.galleryScreenshots.map(item => (
                  <Card
                    key={item.id}
                    className="p-4 flex flex-col justify-between group/card hover:border-accent/40 transition-all"
                  >
                    <div>
                      <ProjectImage
                        src={item.url}
                        fallbackSrc={item.fallbackUrl || project.fallbackIllustrationUrl}
                        alt={localize(item.title)}
                        isAuthentic={item.isAuthentic}
                        showBadge={true}
                        onExpand={() =>
                          handleOpenLightbox(
                            item.url,
                            localize(item.title),
                            localize(item.caption),
                            item.isAuthentic
                          )
                        }
                      />
                      <h3 className="font-display font-semibold text-text-primary text-base mt-3 mb-1">
                        {localize(item.title)}
                      </h3>
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                        {localize(item.caption)}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* 6. Technology Stack */}
          <Card className="p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-display font-bold text-text-primary">
              {t.projects.techStack}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <Badge
                  key={tech}
                  variant="default"
                  className="text-xs sm:text-sm px-3 py-1 font-mono bg-bg-surface border-border text-text-secondary hover:border-accent/40"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </Card>

          {/* 7. Technical Implementation Highlights */}
          {details?.technicalHighlights && (
            <Card className="p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-display font-bold text-text-primary">
                {t.projects.technicalHighlights}
              </h2>
              <ul className="space-y-3 list-none p-0 m-0 text-sm sm:text-base text-text-secondary">
                {details.technicalHighlights.map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <span className="leading-relaxed">{localize(hl)}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* 8. Challenges & Engineering Solutions */}
          {details?.challengesAndSolutions && (
            <div className="space-y-4">
              <h2 className="text-xl font-display font-bold text-text-primary">
                {t.projects.challengesSolutions}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {details.challengesAndSolutions.map((item, idx) => (
                  <Card key={idx} className="p-6 space-y-4">
                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                        {language === 'id' ? 'Tantangan' : 'Challenge'}
                      </span>
                      <p className="text-sm font-medium text-text-primary leading-relaxed">
                        {localize(item.challenge)}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-border/60 space-y-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                        {language === 'id' ? 'Solusi Rekayasa' : 'Engineering Solution'}
                      </span>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {localize(item.solution)}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* 9. Project Outcomes & Impact */}
          {details?.outcomes && (
            <Card className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-accent">
                <ChartLineUp size={22} weight="bold" />
                <h2 className="text-xl font-display font-bold text-text-primary">
                  {t.projects.outcomes}
                </h2>
              </div>
              <ul className="space-y-2.5 list-none p-0 m-0 text-sm sm:text-base text-text-secondary">
                {details.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-accent shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{localize(outcome)}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* 10. Privacy & Confidentiality Notice */}
          {details?.privacyDisclaimer && (
            <div className="p-6 rounded-xl bg-bg-surface/50 border border-border/80 flex items-start gap-4 text-xs font-mono text-text-tertiary">
              <Lock size={22} className="text-accent shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <h3 className="font-semibold text-text-secondary text-sm">
                  {t.projects.privacyNotice}
                </h3>
                <p className="leading-relaxed">
                  {localize(details.privacyDisclaimer)}
                </p>
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Lightbox Modal */}
      {activeImage && (
        <Lightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          imageSrc={activeImage.url}
          title={activeImage.title}
          caption={activeImage.caption}
          isAuthentic={activeImage.isAuthentic}
        />
      )}
    </PageLayout>
  );
};
