'use client'

import { IoIosGlobe } from 'react-icons/io'
import { Button } from '@/components/ui/button'

export default function SwitchLanguage({ onClickAction, language }: { onClickAction?: () => void; language: string }) {
  return (
    <Button
      variant='ghost'
      onClick={onClickAction}
      className='gap-2 text-white hover:text-sky-200 hover:bg-white/10 px-3 py-1 h-auto text-sm font-medium cursor-pointer'
    >
      <IoIosGlobe className='text-base' />
      {language === 'VN' ? 'English' : 'Tiếng Việt'}
    </Button>
  )
}
