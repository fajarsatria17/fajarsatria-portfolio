import React from 'react';
import { useLanguage } from '@hooks/useLanguage';
import { ExternalLink } from '@components/ui';
import { profile } from '@data/profile';
import {
  GithubLogo,
  LinkedinLogo,
  TwitterLogo,
  InstagramLogo,
  EnvelopeSimple,
} from '@phosphor-icons/react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-bg-base/80 py-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-mono text-sm text-text-primary font-semibold">
            {profile.name} <span className="text-accent">/</span> Engineering Portfolio
          </p>
          <p className="text-xs text-text-tertiary mt-1">
            © {currentYear} {profile.name}. {t.footer.rights}
          </p>
        </div>

        <div className="flex items-center gap-4 text-text-secondary">
          {profile.socialLinks.github && (
            <ExternalLink
              href={profile.socialLinks.github}
              aria-label="GitHub profile"
              className="p-2 rounded-lg hover:text-accent hover:bg-bg-surface transition-colors"
            >
              <GithubLogo size={20} />
            </ExternalLink>
          )}

          {profile.socialLinks.linkedin && (
            <ExternalLink
              href={profile.socialLinks.linkedin}
              aria-label="LinkedIn profile"
              className="p-2 rounded-lg hover:text-accent hover:bg-bg-surface transition-colors"
            >
              <LinkedinLogo size={20} />
            </ExternalLink>
          )}

          {profile.socialLinks.twitter && (
            <ExternalLink
              href={profile.socialLinks.twitter}
              aria-label="Twitter profile"
              className="p-2 rounded-lg hover:text-accent hover:bg-bg-surface transition-colors"
            >
              <TwitterLogo size={20} />
            </ExternalLink>
          )}

          {profile.socialLinks.instagram && (
            <ExternalLink
              href={profile.socialLinks.instagram}
              aria-label="Instagram profile"
              className="p-2 rounded-lg hover:text-accent hover:bg-bg-surface transition-colors"
            >
              <InstagramLogo size={20} />
            </ExternalLink>
          )}

          {profile.socialLinks.email && (
            <a
              href={`mailto:${profile.socialLinks.email}`}
              aria-label="Send direct email"
              className="p-2 rounded-lg hover:text-accent hover:bg-bg-surface transition-colors"
            >
              <EnvelopeSimple size={20} />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
};
