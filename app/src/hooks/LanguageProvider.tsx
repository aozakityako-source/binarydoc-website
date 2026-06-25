import { useState, useCallback, type ReactNode } from 'react';
import { translations, type Language } from '@/i18n/translations';
import { LanguageContext } from './LanguageContext';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('zh');

  const setLang = useCallback((newLang: 'en' | 'zh') => {
    setLangState(newLang);
    document.documentElement.lang = newLang;
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next = prev === 'zh' ? 'en' : 'zh';
      document.documentElement.lang = next;
      return next;
    });
  }, []);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, t, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
