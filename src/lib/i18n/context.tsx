'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import type { Lang, Region } from './types';
import { isValidLang, isValidRegion } from './types';
import { translations, type TranslationKey } from './translations';

interface I18nContextValue {
  lang: Lang;
  region: Region;
  t: (key: TranslationKey) => string;
  setLang: (lang: Lang) => void;
}

const I18nContext = createContext<I18nContextValue>({
  lang: 'kr',
  region: 'kr',
  t: (key) => key,
  setLang: () => {},
});

export function I18nProvider({ children, region: regionProp, lang: langProp }: {
  children: React.ReactNode;
  region: Region;
  lang: Lang;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const t = useMemo(() => (key: TranslationKey): string => {
    return translations[langProp]?.[key] ?? translations['en'][key] ?? key;
  }, [langProp]);

  const setLang = (newLang: Lang) => {
    // Replace the [lang] segment in the current path
    // Path format: /<region>/<lang>/... 
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length >= 2) {
      segments[1] = newLang;
      router.push('/' + segments.join('/'));
    } else {
      router.push(`/${regionProp}/${newLang}`);
    }
  };

  return (
    <I18nContext.Provider value={{ lang: langProp, region: regionProp, t, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
