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

      {/* Main Identity Heading (H1) - compact editorial sub-label to complement backdrop */}
      <h1 className="text-sm sm:text-base font-mono font-semibold tracking-[0.22em] text-text-secondary uppercase cursor-default">
        <ScrambleText text={profile.name} trigger="hover" speed={22} />
      </h1>

      {/* Professional Headline as Visual Centerpiece */}
      <p className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-text-primary to-accent leading-[1.15] cursor-default">
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
