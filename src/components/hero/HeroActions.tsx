import React from 'react';
import { useLanguage } from '@hooks/useLanguage';
import { Button, ExternalLink } from '@components/ui';
import { profile } from '@data/profile';
import {
  ArrowRight,
  ChatCircleText,
  GithubLogo,
  LinkedinLogo,
  TwitterLogo,
  InstagramLogo,
  EnvelopeSimple,
} from '@phosphor-icons/react';

export const HeroActions: React.FC = () => {
  const { t } = useLanguage();

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6 pt-2">
      {/* Primary & Secondary Call to Actions */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button
          size="lg"
          variant="primary"
          onClick={() => handleScrollTo('projects')}
          data-testid="hero-cta-primary"
          aria-label={t.hero.viewProjects}
        >
          <span>{t.hero.viewProjects}</span>
          <ArrowRight size={18} aria-hidden="true" />
        </Button>

        <Button
          size="lg"
          variant="outline"
          onClick={() => handleScrollTo('contact')}
          data-testid="hero-cta-secondary"
          aria-label={t.hero.contactMe}
        >
          <ChatCircleText size={18} aria-hidden="true" />
          <span>{t.hero.contactMe}</span>
        </Button>
      </div>

      {/* Professional Social Media Links */}
      <div className="flex items-center justify-center gap-3 pt-2 text-text-secondary">
        <span className="text-xs font-mono uppercase tracking-wider text-text-tertiary mr-1 hidden sm:inline-block">
          Connect:
        </span>

        {profile.socialLinks.github && (
          <ExternalLink
            href={profile.socialLinks.github}
            aria-label="Visit GitHub Profile"
            className="p-2.5 rounded-lg bg-bg-surface/80 hover:bg-bg-overlay border border-border text-text-secondary hover:text-accent transition-all duration-200 hover:shadow-glow-sm"
          >
            <GithubLogo size={20} aria-hidden="true" />
          </ExternalLink>
        )}

        {profile.socialLinks.linkedin && (
          <ExternalLink
            href={profile.socialLinks.linkedin}
            aria-label="Visit LinkedIn Profile"
            className="p-2.5 rounded-lg bg-bg-surface/80 hover:bg-bg-overlay border border-border text-text-secondary hover:text-accent transition-all duration-200 hover:shadow-glow-sm"
          >
            <LinkedinLogo size={20} aria-hidden="true" />
          </ExternalLink>
        )}

        {profile.socialLinks.twitter && (
          <ExternalLink
            href={profile.socialLinks.twitter}
            aria-label="Visit Twitter Profile"
            className="p-2.5 rounded-lg bg-bg-surface/80 hover:bg-bg-overlay border border-border text-text-secondary hover:text-accent transition-all duration-200 hover:shadow-glow-sm"
          >
            <TwitterLogo size={20} aria-hidden="true" />
          </ExternalLink>
        )}

        {profile.socialLinks.instagram && (
          <ExternalLink
            href={profile.socialLinks.instagram}
            aria-label="Visit Instagram Profile"
            className="p-2.5 rounded-lg bg-bg-surface/80 hover:bg-bg-overlay border border-border text-text-secondary hover:text-accent transition-all duration-200 hover:shadow-glow-sm"
          >
            <InstagramLogo size={20} aria-hidden="true" />
          </ExternalLink>
        )}

        {profile.socialLinks.email && (
          <a
            href={`mailto:${profile.socialLinks.email}`}
            aria-label="Send Direct Email"
            className="p-2.5 rounded-lg bg-bg-surface/80 hover:bg-bg-overlay border border-border text-text-secondary hover:text-accent transition-all duration-200 hover:shadow-glow-sm inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <EnvelopeSimple size={20} aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
};
