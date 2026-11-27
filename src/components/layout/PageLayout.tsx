import React, { type ReactNode } from 'react';
import { Navbar } from '@components/navigation';
import { Footer } from './Footer';
import { DynamicBackground } from './DynamicBackground';
import { BackToTop } from './BackToTop';
import { SkipLink } from '@components/ui';

export interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col bg-bg-base text-text-primary selection:bg-accent/20 selection:text-accent overflow-x-hidden">
      {/* Option 4: Hybrid Neural Synapse + Ambient Fluid Glow Background */}
      <DynamicBackground />

      <SkipLink />
      <Navbar />
      <main id="main-content" className="flex-1 focus:outline-none relative z-10">
        {children}
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
      <BackToTop />
    </div>
  );
};
