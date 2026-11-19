import React, { useState, useEffect, type ReactNode } from 'react';
import type { Language, LocalizedString } from '@type/content';
import { translations } from '@data/translations';
import { LanguageContext } from './languageContextDef';

const STORAGE_KEY = 'portfolio_language_pref';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as Language;
      if (saved === 'en' || saved === 'id') return saved;
    }
    return 'en';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, language);
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'en' ? 'id' : 'en'));
  };

  const t = translations[language];

  const localize = (content: LocalizedString | undefined): string => {
    if (!content) return '';
    return content[language] || content.en || '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, localize }}>
      {children}
    </LanguageContext.Provider>
  );
};
