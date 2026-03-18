export function formatDateTime(date: Date | string, locale: 'vi' | 'en' = 'vi'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const localeTag = locale === 'vi' ? 'vi-VN' : 'en-US'
  return d.toLocaleString(localeTag, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatDate(date: Date | string, locale: 'vi' | 'en' = 'vi'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const localeTag = locale === 'vi' ? 'vi-VN' : 'en-US'
  return d.toLocaleDateString(localeTag, {
    month: 'long',
    day: 'numeric',
  })
}

/** Short date for exhibitions: "Mar 04" (month abbrev + day) */
export function formatDateShort(date: Date | string, locale: 'vi' | 'en' = 'en'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const localeTag = locale === 'vi' ? 'vi-VN' : 'en-US'
  return d.toLocaleDateString(localeTag, {
    month: 'short',
    day: '2-digit',
  })
}
