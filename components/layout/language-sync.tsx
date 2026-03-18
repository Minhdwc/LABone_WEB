'use client'

import { useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useLanguageStore } from '@/store/language'

export default function LanguageSync() {
  const pathname = usePathname()
  const { setLanguage } = useLanguageStore()

  useLayoutEffect(() => {
    // Check if pathname starts with '/en' to determine language
    const detectedLanguage = pathname.startsWith('/en') ? 'EN' : 'VN'

    setLanguage(detectedLanguage)
  }, [pathname, setLanguage])

  return null
}
