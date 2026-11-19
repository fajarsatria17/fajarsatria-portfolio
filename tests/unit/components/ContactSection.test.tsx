import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContactSection } from '@components/contact/ContactSection';
import { LanguageProvider } from '@hooks/LanguageContext';
import { profile } from '@data/profile';

describe('ContactSection Component', () => {
  it('renders section header, operational status node, and verified email', () => {
    render(
      <LanguageProvider>
        <ContactSection />
      </LanguageProvider>
    );

    // Section header
    expect(screen.getByRole('heading', { level: 2, name: /Get In Touch/i })).toBeInTheDocument();

    // Node status & SLA
    expect(screen.getByText(/Indonesia/i)).toBeInTheDocument();
    expect(screen.getByText(/< 24 Jam|< 24 Hours/i)).toBeInTheDocument();

    // Direct email
    expect(screen.getByText(profile.socialLinks.email!)).toBeInTheDocument();
  });
});
