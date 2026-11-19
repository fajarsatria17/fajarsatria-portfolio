import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AboutSection } from '@components/about';
import { LanguageProvider } from '@hooks/LanguageContext';

describe('AboutSection Component', () => {
  it('renders section title, bio, location, verified metrics, and CV status in English', () => {
    render(
      <LanguageProvider>
        <AboutSection />
      </LanguageProvider>
    );

    // Section header
    expect(screen.getByRole('heading', { level: 2, name: /About Me/i })).toBeInTheDocument();

    // Bio
    const bio = screen.getByTestId('about-bio');
    expect(bio).toBeInTheDocument();
    expect(bio.textContent).toContain('Universitas Malikussaleh');
    expect(bio.textContent).toContain('3.70 / 4.00');

    // Location
    const location = screen.getByTestId('about-location');
    expect(location).toBeInTheDocument();
    expect(location.textContent).toContain('Indonesia');

    // Verified Academic Metrics
    expect(screen.getByText('3.70 / 4.00')).toBeInTheDocument();
    expect(screen.getByText('SINTA 3')).toBeInTheDocument();

    // CV Download Status (FR-011: safe verified configurable asset)
    const cvButton = screen.getByTestId('about-cv-button');
    expect(cvButton).toBeInTheDocument();
    expect(cvButton).toHaveAttribute('href', '/cv/fajar-satria-cv.pdf');
    expect(cvButton.textContent).toContain('Download Resume');
  });
});
