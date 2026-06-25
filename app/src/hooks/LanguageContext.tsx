import { createContext } from 'react';
import type { Language, Translations } from '@/i18n/translations';

export interface LanguageContextType {
  lang: Language;
  t: Translations;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);
