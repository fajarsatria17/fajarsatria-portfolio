import { createContext } from 'react';
import type { Language, LocalizedString } from '@type/content';
import { type TranslationKeys } from '@data/translations';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationKeys;
  localize: (content: LocalizedString | undefined) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
