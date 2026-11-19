import React from 'react';
import { useLanguage } from '@hooks/useLanguage';

export const SkipLink: React.FC = () => {
  const { t } = useLanguage();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-[#0A0E1A] focus:font-semibold focus:rounded-md focus:shadow-glow-md"
    >
      {t.footer.skipLink}
    </a>
  );
};
