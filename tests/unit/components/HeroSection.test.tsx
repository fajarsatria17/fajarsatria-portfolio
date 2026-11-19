import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroSection } from '@components/hero/HeroSection';
import { LanguageProvider } from '@hooks/LanguageContext';

describe('HeroSection Component', () => {
  beforeEach(() => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  it('renders semantic content and headings immediately (AC-HR-01)', () => {
    render(
      <LanguageProvider>
        <HeroSection />
      </LanguageProvider>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Fajar Satria');
    expect(screen.getByTestId('hero-cta-primary')).toBeInTheDocument();
    expect(screen.getByTestId('hero-cta-secondary')).toBeInTheDocument();
  });

  it('renders HeroSceneFallback when reduced motion is preferred (HR-008 / TC-HR-006)', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion: reduce'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { container } = render(
      <LanguageProvider>
        <HeroSection />
      </LanguageProvider>
    );

    // Fallback SVG must be present
    expect(container.querySelector('svg')).toBeInTheDocument();
    // And semantic content must still be intact
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Fajar Satria');
  });

  it('renders HeroSceneFallback on mobile devices by default (HD-005 / TC-HR-005)', () => {
    // Set window.innerWidth to mobile screen width
    window.innerWidth = 400;

    const { container } = render(
      <LanguageProvider>
        <HeroSection />
      </LanguageProvider>
    );

    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
