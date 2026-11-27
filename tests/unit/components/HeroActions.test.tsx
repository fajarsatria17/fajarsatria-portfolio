import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HeroActions } from '@components/hero/HeroActions';
import { LanguageProvider } from '@hooks/LanguageContext';

describe('HeroActions Component', () => {
  beforeEach(() => {
    // Setup document mock element
    const projectsEl = document.createElement('div');
    projectsEl.id = 'projects';
    projectsEl.scrollIntoView = vi.fn();
    document.body.appendChild(projectsEl);

    const contactEl = document.createElement('div');
    contactEl.id = 'contact';
    contactEl.scrollIntoView = vi.fn();
    document.body.appendChild(contactEl);
  });

  it('triggers smooth scroll to #projects on Primary CTA click (TC-HR-012)', () => {
    render(
      <LanguageProvider>
        <HeroActions />
      </LanguageProvider>
    );

    const primaryBtn = screen.getByTestId('hero-cta-primary');
    fireEvent.click(primaryBtn);

    const projectsEl = document.getElementById('projects');
    expect(projectsEl?.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('triggers smooth scroll to #contact on Secondary CTA click (TC-HR-012)', () => {
    render(
      <LanguageProvider>
        <HeroActions />
      </LanguageProvider>
    );

    const secondaryBtn = screen.getByTestId('hero-cta-secondary');
    fireEvent.click(secondaryBtn);

    const contactEl = document.getElementById('contact');
    expect(contactEl?.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('renders verified Instagram and email links and hides unverified links (BR-010)', () => {
    render(
      <LanguageProvider>
        <HeroActions />
      </LanguageProvider>
    );

    // Instagram is verified
    const instagramLink = screen.getByRole('link', { name: /visit instagram profile/i });
    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/fzrstria_?jplx=bnd1cHg1N3E1b3Bj');
    expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer');

    // Email is verified
    const emailLink = screen.getByRole('link', { name: /send direct email/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:fajarsatria1945@gmail.com');

    // GitHub and LinkedIn are omitted until user supplies them
    expect(screen.queryByRole('link', { name: /visit github profile/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /visit linkedin profile/i })).not.toBeInTheDocument();
  });
});
