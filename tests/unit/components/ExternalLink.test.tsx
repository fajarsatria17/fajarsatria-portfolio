import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ExternalLink } from '@components/ui';

describe('ExternalLink Component', () => {
  it('enforces rel="noopener noreferrer" on target="_blank" (BR-010)', () => {
    render(
      <ExternalLink href="https://github.com/example" target="_blank">
        GitHub
      </ExternalLink>
    );

    const link = screen.getByRole('link', { name: 'GitHub' });
    expect(link).toHaveAttribute('href', 'https://github.com/example');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders custom rel if provided', () => {
    render(
      <ExternalLink href="https://example.com" rel="external">
        External
      </ExternalLink>
    );

    const link = screen.getByRole('link', { name: 'External' });
    expect(link).toHaveAttribute('rel', 'external');
  });
});
