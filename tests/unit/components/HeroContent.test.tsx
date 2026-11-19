import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroContent } from '@components/hero/HeroContent';
import { LanguageProvider } from '@hooks/LanguageContext';
import { profile } from '@data/profile';

describe('HeroContent Component', () => {
  it('renders personal name as an H1 heading for clear visual and semantic hierarchy (FR-002)', () => {
    render(
      <LanguageProvider>
        <HeroContent />
      </LanguageProvider>
    );

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(profile.name);
  });

  it('renders professional headline and summary text', () => {
    render(
      <LanguageProvider>
        <HeroContent />
      </LanguageProvider>
    );

    expect(screen.getByText(profile.headline.en)).toBeInTheDocument();
    expect(screen.getByText(profile.summary.en)).toBeInTheDocument();
  });

  it('renders eyebrow text badge', () => {
    render(
      <LanguageProvider>
        <HeroContent />
      </LanguageProvider>
    );

    expect(screen.getByText(profile.eyebrow.en)).toBeInTheDocument();
  });

  it('renders both primary and secondary CTAs (HR-006)', () => {
    render(
      <LanguageProvider>
        <HeroContent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('hero-cta-primary')).toHaveTextContent('View Projects');
    expect(screen.getByTestId('hero-cta-secondary')).toHaveTextContent('Contact Me');
  });
});
