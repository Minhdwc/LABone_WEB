'use client'
import { coaCqVN } from '@/lib/containts'
import CoaCqSearchClient from '@/components/features/coa-cq/coa-cq-search-client'

export default function CoaCqPage() {
  return (
    <div className='w-full bg-white min-h-screen'>
      {/* Hero Section */}
      <div className='relative w-full max-h-[350px] py-12 bg-blue-600'>
        <div className='relative h-full flex items-center justify-center px-4'>
          <div className='text-center space-y-4 max-w-4xl'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white'>{coaCqVN.hero.title}</h1>
            <p className='text-lg sm:text-xl text-white/90 font-medium'>{coaCqVN.hero.subtitle}</p>
            <p className='text-base sm:text-lg text-white/80 max-w-2xl mx-auto'>{coaCqVN.hero.description}</p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <CoaCqSearchClient locale='vi' />
    </div>
  )
}
