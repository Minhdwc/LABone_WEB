/**
 * Convert locale (vi/en) to language (VN/EN)
 */
export function localeToLanguage(locale: string): 'VN' | 'EN' {
  return locale === 'vi' ? 'VN' : 'EN'
}

/**
 * Convert language (VN/EN) to locale (vi/en)
 */
export function languageToLocale(language: 'VN' | 'EN'): string {
  return language === 'VN' ? 'vi' : 'en'
}

/**
 * Generate full path with locale prefix
 */
export function getLocalePath(locale: string, path: string): string {
  return `/${locale}/${path}`
}
