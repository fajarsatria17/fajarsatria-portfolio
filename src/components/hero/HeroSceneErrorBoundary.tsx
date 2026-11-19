import { Component, type ReactNode } from 'react';
import { HeroSceneFallback } from './HeroSceneFallback';

export interface HeroSceneErrorBoundaryProps {
  children: ReactNode;
  onError?: (error: Error) => void;
}

interface State {
  hasError: boolean;
}

export class HeroSceneErrorBoundary extends Component<HeroSceneErrorBoundaryProps, State> {
  constructor(props: HeroSceneErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // Log without leaking internal stack traces or secrets (SEC-012)
    console.warn('[HeroScene] WebGL rendering error encountered, displaying fallback:', error.message);
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) {
      return <HeroSceneFallback />;
    }
    return this.props.children;
  }
}
