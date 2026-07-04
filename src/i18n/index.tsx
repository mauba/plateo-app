import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as ExpoLocalization from 'expo-localization';
import { en } from './en';
import { es } from './es';
import type { SupportedLocale, Translations } from './types';

const LOCALE_STORAGE_KEY = 'plateo_locale';
const SUPPORTED_LOCALES: SupportedLocale[] = ['es', 'en'];
const translations: Record<SupportedLocale, Translations> = { en, es };

function resolveDeviceLocale(): SupportedLocale {
  const tag = ExpoLocalization.getLocales()[0]?.languageTag ?? 'en';
  const lang = tag.split('-')[0] as SupportedLocale;
  return SUPPORTED_LOCALES.includes(lang) ? lang : 'en';
}

type LocaleContextValue = {
  locale: SupportedLocale;
  t: Translations;
  setLocale: (locale: SupportedLocale) => Promise<void>;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale | null>(null);

  useEffect(() => {
    SecureStore.getItemAsync(LOCALE_STORAGE_KEY).then((stored) => {
      const candidate = stored as SupportedLocale | null;
      const resolved = candidate && SUPPORTED_LOCALES.includes(candidate)
        ? candidate
        : resolveDeviceLocale();
      setLocaleState(resolved);
    });
  }, []);

  async function setLocale(newLocale: SupportedLocale) {
    await SecureStore.setItemAsync(LOCALE_STORAGE_KEY, newLocale);
    setLocaleState(newLocale);
  }

  if (locale === null) return null;

  return (
    <LocaleContext.Provider value={{ locale, t: translations[locale], setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (ctx === null) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return ctx;
}
