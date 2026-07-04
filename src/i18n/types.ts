import { en } from './en';

export type Translations = Record<keyof typeof en, string>;
export type SupportedLocale = 'es' | 'en';
