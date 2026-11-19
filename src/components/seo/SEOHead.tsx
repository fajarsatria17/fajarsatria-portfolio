import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@hooks/useLanguage';
import { siteSettings } from '@data/settings';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalUrl,
  ogImage = '/images/og/og-default.png',
}) => {
  const { localize, language } = useLanguage();

  const finalTitle = title || localize(siteSettings.siteTitle);
  const finalDesc = description || localize(siteSettings.metaDescription);
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://your-portfolio-domain.com';
  const finalCanonical = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;

  return (
    <Helmet>
      <html lang={language} />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      <link rel="canonical" href={finalCanonical} />

      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDesc} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
    </Helmet>
  );
};
