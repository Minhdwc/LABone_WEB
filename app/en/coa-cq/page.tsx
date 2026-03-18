'use client'
import { coaCqEN } from '@/lib/containts'
import CoaCqSearchClient from '@/components/features/coa-cq/coa-cq-search-client'

export default function CoaCqPage() {
  return (
    <div className='w-full bg-white min-h-screen'>
      {/* Hero Section */}
      <div className='relative w-full max-h-[350px] py-12 bg-blue-600'>
        <div className='relative h-full flex items-center justify-center px-4'>
          <div className='text-center space-y-4 max-w-4xl'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white'>{coaCqEN.hero.title}</h1>
            <p className='text-lg sm:text-xl text-white/90 font-medium'>{coaCqEN.hero.subtitle}</p>
            <p className='text-base sm:text-lg text-white/80 max-w-2xl mx-auto'>{coaCqEN.hero.description}</p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <CoaCqSearchClient locale='en' />
    </div>
  )
}
