import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EducationSection } from '@components/education';
import { LanguageProvider } from '@hooks/LanguageContext';

describe('EducationSection Component', () => {
  it('renders Universitas Malikussaleh, GPA 3.70, thesis, and SINTA 3 publication', () => {
    render(
      <LanguageProvider>
        <EducationSection />
      </LanguageProvider>
    );

    // Section header
    expect(screen.getByRole('heading', { level: 2, name: /Education & Research/i })).toBeInTheDocument();

    // Institution & Program
    expect(screen.getByText('Universitas Malikussaleh')).toBeInTheDocument();
    expect(screen.getByText(/Bachelor of Informatics Engineering/i)).toBeInTheDocument();

    // GPA
    expect(screen.getByText(/GPA: 3.70 \/ 4.00/i)).toBeInTheDocument();

    // Thesis
    expect(screen.getByText(/YOLOv8 and ArcFace/i)).toBeInTheDocument();

    // Publication with DOI
    expect(screen.getByText(/Jurnal Riset Komputer \(JURIKOM\)/i)).toBeInTheDocument();
    const doiLink = screen.getByRole('link', { name: /View Paper via DOI/i });
    expect(doiLink).toHaveAttribute('href', 'https://doi.org/10.30865/jurikom.v13i1.9502');

    // Coursework
    expect(screen.getByText('Artificial Intelligence')).toBeInTheDocument();
    expect(screen.getByText('Machine Learning')).toBeInTheDocument();
  });
});
