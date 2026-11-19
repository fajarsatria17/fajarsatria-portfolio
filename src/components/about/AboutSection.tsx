import React from 'react';
import { useLanguage } from '@hooks/useLanguage';
import { SectionHeader, Card } from '@components/ui';
import { profile } from '@data/profile';
import { siteSettings } from '@data/settings';
import {
  MapPin,
  DownloadSimple,
  EnvelopeSimple,
  CheckCircle,
  GraduationCap,
  Article,
  CalendarCheck,
  Brain,
} from '@phosphor-icons/react';

export const AboutSection: React.FC = () => {
  const { t, localize, language } = useLanguage();

  const metrics = [
    {
      value: t.about.gpa,
      label: t.about.gpaLabel,
      icon: GraduationCap,
    },
    {
      value: t.about.publication,
      label: t.about.publicationLabel,
      icon: Article,
    },
    {
      value: t.about.graduationYear,
      label: t.about.graduationYearLabel,
      icon: CalendarCheck,
    },
    {
      value: t.about.focus,
      label: t.about.focusLabel,
      icon: Brain,
    },
  ];

  const pillars = language === 'id' ? [
    'Artificial Intelligence & Machine Learning (YOLOv8, ArcFace)',
    'Pengembangan Web Full-Stack (React, Node.js, PHP)',
    'Pengelolaan Basis Data & Analisis Sistem (SQL Server, MySQL)',
    'Inisiatif Transformasi Digital & Sistem Kontrol Inventaris',
  ] : [
    'Artificial Intelligence & Machine Learning (YOLOv8, ArcFace)',
    'Full-Stack Web Development (React, Node.js, PHP)',
    'Database Management & System Analysis (SQL Server, MySQL)',
    'Digital Transformation Initiatives & Inventory Control Systems',
  ];

  return (
    <section
      id="about"
      aria-label={t.sections.aboutTitle}
      data-testid="about-section"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20"
    >
      <SectionHeader
        eyebrow="01 / OVERVIEW"
        title={t.sections.aboutTitle}
        subtitle={t.sections.aboutSubtitle}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Bio & Engineering Pillars */}
        <div className="lg:col-span-7 space-y-6">
          <Card glow className="space-y-6 border-border/80">
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-border/60 pb-3 font-mono text-xs text-text-tertiary">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent/30 border border-accent/60" />
                <span className="text-text-secondary font-semibold">fajar-satria.profile</span>
              </div>
              <span className="text-accent/80">status: active</span>
            </div>

            {/* Bio Prose */}
            <p
              data-testid="about-bio"
              className="text-text-secondary text-base sm:text-lg leading-relaxed"
            >
              {localize(profile.bio)}
            </p>

            {/* Location Indicator */}
            {profile.location && (
              <div
                data-testid="about-location"
                className="flex items-center gap-2 text-xs sm:text-sm font-mono text-text-tertiary pt-2 border-t border-border/50"
              >
                <MapPin size={16} className="text-accent shrink-0" aria-hidden="true" />
                <span>{localize(profile.location)}</span>
              </div>
            )}

            {/* Engineering Pillars */}
            <div className="pt-4 border-t border-border/50 space-y-3">
              <h4 className="font-mono text-xs font-semibold text-accent uppercase tracking-wider">
                {t.about.keyStrengths}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-none p-0 m-0">
                {pillars.map((pillar) => (
                  <li key={pillar} className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary">
                    <CheckCircle size={15} weight="bold" className="text-accent shrink-0" aria-hidden="true" />
                    <span>{pillar}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              {siteSettings.cvAvailable && siteSettings.cvUrl ? (
                <a
                  href={siteSettings.cvUrl}
                  download="Fajar-Satria-CV.pdf"
                  data-testid="about-cv-button"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold font-mono bg-accent text-bg-base hover:bg-accent-dim transition-all duration-200 shadow-glow-sm hover:shadow-glow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <DownloadSimple size={18} weight="bold" aria-hidden="true" />
                  {t.about.downloadCv}
                </a>
              ) : (
                <span
                  data-testid="about-cv-unavailable"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono border border-border/60 text-text-tertiary bg-bg-surface/50"
                  title={t.about.cvUponRequest}
                >
                  <DownloadSimple size={16} aria-hidden="true" />
                  {t.about.cvUponRequest}
                </span>
              )}

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold font-mono border border-border hover:border-accent text-text-primary hover:text-accent transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <EnvelopeSimple size={18} aria-hidden="true" />
                {t.hero.contactMe}
              </a>
            </div>
          </Card>
        </div>

        {/* Right Column: Verified Academic & Professional Metrics Grid */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <Card
                key={m.label}
                glow
                className="p-5 flex flex-col justify-between hover:border-accent/40 group transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/25 flex items-center justify-center text-accent mb-4 group-hover:scale-105 group-hover:border-accent/50 transition-all duration-300">
                  <Icon size={20} weight="duotone" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-display font-extrabold text-2xl sm:text-3xl text-text-primary tracking-tight group-hover:text-accent transition-colors">
                    {m.value}
                  </div>
                  <div className="font-mono text-xs text-text-tertiary mt-1">
                    {m.label}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
