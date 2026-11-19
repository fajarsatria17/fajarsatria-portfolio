import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Timeline, TimelineItem } from '@components/timeline';

describe('Timeline Component', () => {
  it('renders a list with timeline items and tags', () => {
    render(
      <Timeline aria-label="Test Timeline">
        <TimelineItem
          title="Senior Systems Architect"
          subtitle="@ Cyberdyne Systems"
          period="Jan 2022 – Present"
          isCurrent={true}
          description="Architecting high-load distributed services."
          tags={['Go', 'Kubernetes', 'gRPC']}
        />
        <TimelineItem
          title="Software Engineer"
          subtitle="@ Tech Corp"
          period="Jan 2020 – Dec 2021"
          isCurrent={false}
          description="Building web services."
          tags={['React', 'TypeScript']}
        />
      </Timeline>
    );

    expect(screen.getByRole('list', { name: 'Test Timeline' })).toBeInTheDocument();
    expect(screen.getByText('Senior Systems Architect')).toBeInTheDocument();
    expect(screen.getByText('@ Cyberdyne Systems')).toBeInTheDocument();
    expect(screen.getByText('Jan 2022 – Present')).toBeInTheDocument();
    expect(screen.getByText('Architecting high-load distributed services.')).toBeInTheDocument();
    expect(screen.getByText('Go')).toBeInTheDocument();
    expect(screen.getByText('Kubernetes')).toBeInTheDocument();
    expect(screen.getByText('gRPC')).toBeInTheDocument();

    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('@ Tech Corp')).toBeInTheDocument();
  });
});
