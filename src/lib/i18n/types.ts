export type Lang = 'en' | 'cn' | 'jp' | 'vn' | 'th' | 'kr';
export type Region = 'gl' | 'kr';

export const SUPPORTED_LANGS: Lang[] = ['kr', 'en'];

export const LANG_LABELS: Record<Lang, string> = {
  en: 'English',
  cn: '中文',
  jp: '日本語',
  vn: 'Tiếng Việt',
  th: 'ภาษาไทย',
  kr: '한국어',
};

export const LANG_FLAGS: Record<Lang, string> = {
  en: '🇺🇸',
  cn: '🇨🇳',
  jp: '🇯🇵',
  vn: '🇻🇳',
  th: '🇹🇭',
  kr: '🇰🇷',
};

export function isValidLang(lang: string): lang is Lang {
  return SUPPORTED_LANGS.includes(lang as Lang);
}

export function isValidRegion(region: string): region is Region {
  return region === 'gl' || region === 'kr';
}
