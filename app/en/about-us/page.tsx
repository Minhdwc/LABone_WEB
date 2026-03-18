'use client'
import { brandsContentEN, contactInfoEN } from '@/lib/containts'
import { companyInfo } from '@/lib/company-contants'
import { laboneData } from '@/lib/review-labone'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail, LinkIcon } from 'lucide-react'
import DOMPurify from 'isomorphic-dompurify'
import { useLanguageStore } from '@/store/language'

export default function AboutUsPage() {
  const { language } = useLanguageStore()
  const sanitizeHTML = (html: string) => {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['p', 'strong', 'em', 'br', 'ul', 'ol', 'li'],
      ALLOWED_ATTR: [],
    })
  }
  return (
    <div className='w-full bg-white min-h-screen'>
      {/* Hero Section with Background Image */}
      <div className='relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden'>
        {/* Background Image - Optimized with Next.js Image */}
        <Image
          src='/assets/company/companyLabone.jpg'
          alt='LABone Company'
          fill
          priority
          className='object-cover object-center'
          sizes='100vw'
          quality={85}
        />
        {/* Overlay with Company Info */}
        <div className='absolute inset-0 flex items-center justify-start z-10'>
          <div className='bg-white/95 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 ml-4 sm:ml-6 md:ml-8 lg:ml-12 max-w-2xl'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-3 sm:mb-4'>ABOUT US</h1>
            <div
              className='text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3'
              dangerouslySetInnerHTML={{
                __html: sanitizeHTML(laboneData.description.short.en),
              }}
            />
          </div>
        </div>
      </div>

      {/* Full Description Section */}

      {/* Brands Section */}
      <div className='mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12'>
        <div className='bg-white'>
          <h3 className='text-base sm:text-lg font-bold text-[#1e3a8a] mb-4'>About LABone</h3>
          <div
            className='text-base sm:text-lg text-gray-700 mb-4 leading-relaxed'
            dangerouslySetInnerHTML={{
              __html: sanitizeHTML(laboneData.description.full.en),
            }}
          />
        </div>

        <div className='border-t border-gray-300 my-6 sm:my-8'></div>
        <div className='space-y-6 sm:space-y-8'>
          {/* Brands Title */}
          <div>
            <p className='text-base sm:text-lg text-gray-700 mb-4 leading-relaxed'>{brandsContentEN.brandsTitle}</p>
            <div className='space-y-3 sm:space-y-4'>
              {brandsContentEN.brands.map((brand, index) => (
                <div key={brand.id || index} className='space-y-1.5'>
                  <p className='text-sm sm:text-base font-medium text-gray-800'>
                    ({index + 1}) {brand.name}: {brand.features.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
            {brandsContentEN.brands.map((brand, index) => (
              <div
                key={`brand-${index}`}
                className='bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow'
              >
                <div className='relative w-full h-24'>
                  <Image src={brand.logoImage} alt={brand.name} fill className='object-contain' />
                </div>
              </div>
            ))}
          </div>
          {/* Divider */}
          <div className='border-t border-gray-300 my-6 sm:my-8'></div>

          {/* Factory and Mission Section */}
          <div className='bg-blue-50 p-4 sm:p-6 md:p-8'>
            <div className='flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 items-start lg:items-center'>
              {/* Left: Factory Image */}
              <div className='w-full lg:w-1/2'>
                <div className='relative w-full rounded overflow-hidden'>
                  <Image
                    src='/assets/about-us/BANNER-LABONE-3.jpg'
                    alt='LABone Factory'
                    width={800}
                    height={600}
                    className='w-full h-auto object-cover'
                    priority
                  />
                </div>
              </div>

              {/* Right: Factory Info and Mission */}
              <div className='w-full lg:w-1/2 space-y-4 sm:space-y-5'>
                <div>
                  <h3 className='text-base sm:text-lg font-bold text-[#1e3a8a] mb-2'>Factory LABone</h3>
                  <div
                    className='text-sm sm:text-base text-gray-700 leading-relaxed'
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHTML(laboneData.locations.en),
                    }}
                  />
                </div>

                <div>
                  <h3 className='text-base sm:text-lg font-bold text-[#1e3a8a] mb-2'>
                    {brandsContentEN.mission.title}
                  </h3>
                  <p className='text-sm sm:text-base font-semibold text-[#2563eb] mb-2 italic'>
                    &quot;{brandsContentEN.mission.quote}&quot;
                  </p>
                  <p className='text-sm sm:text-base text-gray-700 leading-relaxed'>
                    {brandsContentEN.mission.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          {/* <div className='border-t border-gray-300 my-6 sm:my-8'></div> */}

          {/* International Distributors Section */}
          {/* <div className='space-y-4 sm:space-y-6 bg-blue-50 p-6'>
            <div className='flex items-center gap-3 mb-4'>
              <Globe className='h-6 w-6 text-[#1e3a8a]' />
              <h2 className='text-xl sm:text-2xl font-bold text-[#1e3a8a]'>
                {companyInfo.internationalDistribution.title.en}
              </h2>
            </div>
            <p className='text-sm sm:text-base text-gray-700 leading-relaxed mb-6'>
              {companyInfo.internationalDistribution.description.en}
            </p> */}

          {/* Distributors Grid */}
          {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
              {companyInfo.internationalDistribution.list.map(
                (distributor, index) => (
                  <div
                    key={index}
                    className='bg-white border-2 border-gray-200 rounded-lg p-4 sm:p-6 hover:border-[#2563eb] hover:shadow-md transition-all'
                  >
                    <div className='flex items-center justify-center mb-4 h-20 sm:h-24 bg-gray-50 rounded-lg p-3'>
                      <div className='relative w-full h-full'>
                        <Image
                          src={distributor.logo}
                          alt={distributor.name}
                          fill
                          className='object-contain'
                          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        />
                      </div>
                    </div>
                    <h3 className='text-base sm:text-lg font-bold text-gray-900 mb-3 text-center line-clamp-2 min-h-[56px] flex items-center justify-center'>
                      {distributor.name}
                    </h3>
                    <div className='flex items-center justify-center gap-2 pt-3 border-t border-gray-200'>
                      <MapPin className='h-4 w-4 text-gray-500' />
                      <span className='text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full'>
                        {distributor.country}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div> */}
          {/* </div> */}

          {/* Divider */}
          <div className='border-t border-gray-300 my-6 sm:my-8'></div>

          {/* Contact Information Section */}
          <div className='space-y-6 sm:space-y-8'>
            <h2 className='text-xl sm:text-2xl font-bold text-[#1e3a8a]'>Contact us:</h2>

            {/* Two Offices Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8'>
              {/* Vietnam Office */}
              <div className='bg-blue-50 p-4 sm:p-6 rounded-lg border-2 border-blue-100'>
                <div className='flex items-center gap-2 mb-4 pb-3 border-b-2 border-blue-200'>
                  <h3 className='text-lg sm:text-xl font-bold text-[#1e3a8a]'>LABone in Vietnam</h3>
                </div>
                <div className='space-y-3 text-sm sm:text-base text-gray-700'>
                  <p className='font-semibold text-gray-900'>
                    {language === 'VN' ? companyInfo.name.vi : 'LABone Scientific Equipment Co.Ltd.'}
                  </p>
                  <div className='flex items-start gap-2'>
                    <MapPin className='h-5 w-5 text-blue-800 mt-0.5 shrink-0' />
                    <p>
                      <span className='font-medium'>Address:</span>{' '}
                      {language === 'VN'
                        ? companyInfo.address.vi.name
                        : '228/13/3 Nguyen Thi Lang, Phu Loi Hamlet, Cu Chi Commune, Ho Chi Minh City, Vietnam'}
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Phone className='h-5 w-5 text-blue-800 shrink-0' />
                    <p>
                      <span className='font-medium'>Phone:</span>{' '}
                      <Link
                        href={`tel:${companyInfo.phone.vi.replace(/\s/g, '')}`}
                        className='text-blue-500 hover:underline'
                      >
                        {companyInfo.phone.vi}
                      </Link>
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Mail className='h-5 w-5 text-blue-800 shrink-0' />
                    <p>
                      <span className='font-medium'>Email:</span>{' '}
                      <Link href={`mailto:${companyInfo.email.vi}`} className='text-blue-500 hover:underline break-all'>
                        {companyInfo.email.vi}
                      </Link>
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <LinkIcon className='h-5 w-5 text-blue-800 shrink-0' />
                    <p>
                      <span className='font-medium'>{contactInfoEN.website.label}:</span>{' '}
                      <Link
                        href={`https://${contactInfoEN.website.value}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-500 hover:underline'
                      >
                        {contactInfoEN.website.value}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* US Office */}
              <div className='bg-green-50 p-4 sm:p-6 rounded-lg border-2 border-green-100'>
                <div className='flex items-center gap-2 mb-4 pb-3 border-b-2 border-green-200'>
                  <h3 className='text-lg sm:text-xl font-bold text-green-700'>LABone in USA</h3>
                </div>
                <div className='space-y-3 text-sm sm:text-base text-gray-700'>
                  <p className='font-semibold text-gray-900'>{companyInfo.name.en}</p>
                  <div className='flex items-start gap-2'>
                    <MapPin className='h-5 w-5 text-green-600 mt-0.5 shrink-0' />
                    <p>
                      <span className='font-medium'>Address:</span> {companyInfo.address.en.name}
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Phone className='h-5 w-5 text-green-600 shrink-0' />
                    <p>
                      <span className='font-medium'>Phone:</span>{' '}
                      <Link
                        href={`tel:${companyInfo.phone.en.replace(/\s/g, '').replace('+', '')}`}
                        className='text-green-700 hover:underline'
                      >
                        {companyInfo.phone.en}
                      </Link>
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Mail className='h-5 w-5 text-green-600 shrink-0' />
                    <p>
                      <span className='font-medium'>Email:</span>{' '}
                      <Link
                        href={`mailto:${companyInfo.email.en}`}
                        className='text-green-700 hover:underline break-all'
                      >
                        {companyInfo.email.en}
                      </Link>
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <LinkIcon className='h-5 w-5 text-green-600 shrink-0' />
                    <p>
                      <span className='font-medium'>{contactInfoEN.website.label}:</span>{' '}
                      <Link
                        href={`https://${contactInfoEN.website.value}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-green-700 hover:underline'
                      >
                        {contactInfoEN.website.value}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
