import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ExperienceSection } from '@components/experience';
import { LanguageProvider } from '@hooks/LanguageContext';

describe('ExperienceSection Component', () => {
  it('renders verified experience entries for PT Denso Indonesia and LPP RRI separately', () => {
    render(
      <LanguageProvider>
        <ExperienceSection />
      </LanguageProvider>
    );

    // Section header
    expect(screen.getByRole('heading', { level: 2, name: /Work & Professional Experience/i })).toBeInTheDocument();

    // Organizations (Denso and RRI kept separate)
    expect(screen.getByText(/PT Denso Indonesia/i)).toBeInTheDocument();
    expect(screen.getByText(/LPP Radio Republik Indonesia \(RRI\)/i)).toBeInTheDocument();

    // Roles
    expect(screen.getByText(/Nasional Internship \/ Digital Transformation Contributor/i)).toBeInTheDocument();
    expect(screen.getByText(/Intern \/ Informatics Engineer/i)).toBeInTheDocument();

    // Period with Present for Denso
    expect(screen.getByText(/Present/i)).toBeInTheDocument();

    // TIMS verification in Denso experience description
    expect(screen.getByText(/TIMS \(TIE Inventory Management System\)/i)).toBeInTheDocument();

    // Verified Technologies
    expect(screen.getByText('Microsoft SQL Server')).toBeInTheDocument();
    expect(screen.getByText('MySQL')).toBeInTheDocument();
  });
});
