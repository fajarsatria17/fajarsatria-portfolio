import React from 'react';
import { useLanguage } from '@hooks/useLanguage';
import { profile } from '@data/profile';
import { HeroActions } from './HeroActions';
import { ScrambleText } from '@components/ui';

export const HeroContent: React.FC = () => {
  const { localize } = useLanguage();

  return (
    <div className="space-y-5 text-center z-20 relative max-w-2xl mx-auto">
      {/* Eyebrow Status Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-mono tracking-wider uppercase">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
        </span>
        <span>
          <ScrambleText text={localize(profile.eyebrow)} trigger="both" delay={50} speed={20} />
        </span>
      </div>

      {/* Main Identity Heading (H1) with interactive hover scramble */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-text-primary leading-[1.1] cursor-default">
        <ScrambleText text={profile.name} trigger="hover" speed={22} />
      </h1>

      {/* Professional Headline with Cyber Scramble Decode Animation */}
      <p className="text-xl sm:text-2xl font-display font-semibold text-accent leading-snug cursor-default">
        <ScrambleText text={localize(profile.headline)} trigger="both" delay={80} speed={24} />
      </p>

      {/* Supporting Copy / Summary */}
      <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
        {localize(profile.summary)}
      </p>

      {/* CTAs and Social Links */}
      <HeroActions />
    </div>
  );
};
