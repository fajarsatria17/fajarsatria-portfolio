import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { HeroSceneFallback } from '@components/hero/HeroSceneFallback';

describe('HeroSceneFallback Component', () => {
  it('renders decorative SVG with aria-hidden="true" (HR-009 / A11y)', () => {
    const { container } = render(<HeroSceneFallback />);
    const rootEl = container.firstChild as HTMLElement;

    expect(rootEl).toHaveAttribute('aria-hidden', 'true');
    expect(rootEl).toHaveClass('pointer-events-none');
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
