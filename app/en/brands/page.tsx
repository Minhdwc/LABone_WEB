'use client'

import React from 'react'
import Image from 'next/image'
import { useLanguageStore } from '@/store/language'
import { brandsContentVN, brandsContentEN } from '@/lib/containts'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type Brand = {
  id?: string
  brand_id?: string
  name: string
  description: string
  features: string[]
  color: string
  sampleImage: string
  logoImage: string
}

const BrandCard = ({ brand, language }: { brand: Brand; language: 'VN' | 'EN' }) => {
  const badgeVariants: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    cyan: 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200',
    indigo: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
    green: 'bg-green-100 text-green-700 hover:bg-green-200',
  }

  return (
    <Card className='group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]'>
      {/* Sample Image - Hình mẫu */}
      <div className='relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100'>
        <Image
          src={brand.sampleImage}
          alt={`${brand.name} sample`}
          fill
          className='object-cover group-hover:scale-105 transition-transform duration-500'
        />
      </div>

      {/* Brand Content */}
      <div className='p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4'>
        <p className='text-gray-700 leading-relaxed text-sm sm:text-base'>{brand.description}</p>

        {/* Features List */}
        <div className='pt-2'>
          <h4 className='text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3'>
            {language === 'VN' ? 'Sản phẩm chính:' : 'Main Products:'}
          </h4>
          <div className='flex flex-wrap gap-1.5 sm:gap-2'>
            {brand.features.map((feature, index) => (
              <Badge
                key={index}
                variant='secondary'
                className={`${badgeVariants[brand.color]} border-0 font-normal text-xs sm:text-sm`}
              >
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Logo Image - Hình logo */}
      <div className='px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6'>
        <div className='relative h-24 sm:h-28 md:h-32 overflow-hidden bg-white rounded-lg border border-gray-200'>
          <Image src={brand.logoImage} alt={`${brand.name} logo`} fill className='object-contain p-3 sm:p-4' />
        </div>
      </div>
    </Card>
  )
}

export default function BrandsPage() {
  const { language } = useLanguageStore()
  const content = language === 'VN' ? brandsContentVN : brandsContentEN

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 sm:py-16 md:py-20'>
        <div className='absolute inset-0 bg-[url("/bg.svg")] opacity-10'></div>
        <div className='container mx-auto px-4 sm:px-6 relative z-10'>
          <div className='max-w-4xl mx-auto text-center space-y-4 sm:space-y-6'>
            <div className='inline-block'>
              <Badge className='bg-white/20 text-white border-white/30 px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm mb-3 sm:mb-4'>
                {content.subtitle}
              </Badge>
            </div>
            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 animate-fade-in'>
              {content.title}
            </h1>
            <p className='text-base sm:text-lg md:text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto px-2'>
              {content.intro}
            </p>
          </div>
        </div>
        <div className='absolute bottom-0 left-0 right-0 h-12 sm:h-16 md:h-20 bg-gradient-to-t from-gray-50 to-transparent'></div>
      </section>

      {/* Brands Title Section */}
      <section className='container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-8 sm:mb-10 md:mb-12'>
            {content.brandsTitle}
          </h2>
        </div>
      </section>

      {/* Brands Grid */}
      <section className='container mx-auto px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto'>
          {content.brands.map((brand, index) => (
            <BrandCard key={`brand-${index}`} brand={brand as Brand} language={language} />
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className='bg-gradient-to-br from-blue-50 to-indigo-50 py-12 sm:py-16 md:py-20'>
        <div className='container mx-auto px-4 sm:px-6'>
          <Card className='max-w-5xl mx-auto border-0 shadow-xl bg-white/80 backdrop-blur-sm'>
            <div className='p-6 sm:p-8 md:p-12 space-y-4 sm:space-y-6'>
              <div className='text-center space-y-3 sm:space-y-4'>
                <Badge className='bg-blue-600 text-white px-4 py-1.5 sm:px-6 sm:py-2 text-xs sm:text-sm'>
                  {content.mission.title}
                </Badge>
                <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 italic px-2'>
                  &ldquo;{content.mission.quote}&rdquo;
                </h2>
              </div>
              <div className='border-l-4 border-blue-600 pl-4 sm:pl-6'>
                <p className='text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed'>
                  {content.mission.description}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className='container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20'>
        <div className='max-w-4xl mx-auto text-center space-y-6 sm:space-y-8'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 px-2'>
            {language === 'VN' ? 'Sẵn sàng hợp tác với chúng tôi?' : 'Ready to work with us?'}
          </h2>
          <p className='text-base sm:text-lg md:text-xl text-gray-600 px-2'>
            {language === 'VN'
              ? 'Liên hệ với chúng tôi để được tư vấn và báo giá chi tiết'
              : 'Contact us for consultation and detailed quotation'}
          </p>
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center'>
            <Button
              size='lg'
              className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg cursor-pointer w-full sm:w-auto'
            >
              {language === 'VN' ? 'Liên Hệ Ngay' : 'Contact Now'}
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg cursor-pointer w-full sm:w-auto'
            >
              {language === 'VN' ? 'Xem Sản Phẩm' : 'View Products'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
