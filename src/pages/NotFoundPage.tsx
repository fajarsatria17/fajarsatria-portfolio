import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@hooks/useLanguage';
import { PageLayout } from '@components/layout';
import { Button } from '@components/ui';

export const NotFoundPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <PageLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <span className="font-mono text-6xl sm:text-8xl font-black text-accent/40 mb-4">
          404
        </span>
        <h1 className="text-2xl sm:text-4xl font-display font-bold text-text-primary mb-3">
          {t.notFound.title}
        </h1>
        <p className="text-text-secondary text-base max-w-md mb-8">
          {t.notFound.desc}
        </p>
        <Link to="/">
          <Button variant="primary">{t.notFound.backHome}</Button>
        </Link>
      </div>
    </PageLayout>
  );
};
