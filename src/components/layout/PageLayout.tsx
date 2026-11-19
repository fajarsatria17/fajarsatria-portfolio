import React, { type ReactNode } from 'react';
import { Navbar } from '@components/navigation';
import { Footer } from './Footer';
import { SkipLink } from '@components/ui';

export interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-bg-base text-text-primary selection:bg-accent/20 selection:text-accent">
      <SkipLink />
      <Navbar />
      <main id="main-content" className="flex-1 focus:outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
};
