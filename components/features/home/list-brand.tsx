'use client'

import Image from 'next/image'
import { useLanguageStore } from '@/store/language'
import { brandsContentEN, brandsContentVN } from '@/lib/containts'

export default function ListBrand() {
  const { language } = useLanguageStore()
  const content = language === 'VN' ? brandsContentVN : brandsContentEN

  return (
    <section className='bg-blue-100/70 py-8'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-8'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 uppercase'>{content.title}</h2>
          <div className='mx-auto mt-2 w-16 h-0.5 bg-blue-600 rounded-full' aria-hidden />
          <p className='text-sm sm:text-base text-gray-600 mt-2'>{content.subtitle}</p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
          {content.brands.map((brand, index) => (
            <div
              key={`brand-${index}`}
              className='bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow'
            >
              <div className='relative w-full h-24'>
                <Image
                  src={brand.logoImage}
                  alt={brand.name}
                  fill
                  sizes='(max-width: 640px) 50vw, 25vw'
                  className='object-contain'
                  loading='lazy'
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
