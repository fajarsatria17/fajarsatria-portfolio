import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SkillsSection } from '@components/skills';
import { LanguageProvider } from '@hooks/LanguageContext';

describe('SkillsSection Component', () => {
  it('renders all 6 categories and verified skill badges without percentages', () => {
    const { container } = render(
      <LanguageProvider>
        <SkillsSection />
      </LanguageProvider>
    );

    // Section header
    expect(screen.getByRole('heading', { level: 2, name: /Skills & Capabilities/i })).toBeInTheDocument();

    // 6 Category headers
    expect(screen.getByText('Programming Languages')).toBeInTheDocument();
    expect(screen.getByText('Web & Application Development')).toBeInTheDocument();
    expect(screen.getByText('AI & Machine Learning')).toBeInTheDocument();
    expect(screen.getByText('Database & Engineering')).toBeInTheDocument();
    expect(screen.getByText('Development Tools')).toBeInTheDocument();
    expect(screen.getByText('Soft Skills')).toBeInTheDocument();

    // Verified skill badges
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getAllByText('PHP').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('YOLOv8')).toBeInTheDocument();
    expect(screen.getByText('ArcFace')).toBeInTheDocument();
    expect(screen.getByText('Microsoft SQL Server')).toBeInTheDocument();

    // Ensure NO progress bars or percentage ratings exist
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    expect(container.textContent).not.toMatch(/\b(90%|95%|85%|80%)\b/);
  });
});
