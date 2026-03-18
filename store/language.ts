'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LanguageStore {
  language: 'VN' | 'EN'
  setLanguage: (language: 'VN' | 'EN') => void
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'VN',
      setLanguage: (language: 'VN' | 'EN') => set({ language }),
    }),
    {
      name: 'labone-language-storage',
    },
  ),
)
