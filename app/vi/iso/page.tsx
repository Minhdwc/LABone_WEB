'use client'
import { certificationDataVN } from '@/lib/certification-constants'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function ISOPage() {
  const [expandedCert, setExpandedCert] = useState<string | null>(null)

  const toggleCert = (id: string) => {
    setExpandedCert(expandedCert === id ? null : id)
  }

  return (
    <div className='w-full bg-white min-h-screen'>
      {/* Hero Section with Background Image */}
      <div className='relative w-full h-[300px] overflow-hidden'>
        {/* Background Image - Optimized with Next.js Image */}
        <Image
          src='/assets/company/companyLabone.jpg'
          alt='Công ty LABone'
          fill
          priority
          className='object-cover object-center'
          sizes='100vw'
          quality={85}
        />
        {/* Overlay with Certification Logos */}
        <div className='absolute left-0 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-10'>
          <div className='bg-white/95 backdrop-blur-sm rounded-lg p-3 sm:p-4 md:p-5 lg:p-6 shadow-lg'>
            <div className='relative w-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto'>
              <Image
                src='/assets/iso/iso.png'
                alt='Chứng nhận ISO'
                width={600}
                height={150}
                className='object-contain w-full h-auto'
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Title Section */}
      <div className='w-full bg-white py-6 sm:py-8'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6'>
          <h2 className='text-xl sm:text-2xl font-bold text-[#1e3a8a] text-center'>{certificationDataVN.title}</h2>
        </div>
      </div>

      {/* Main Content */}
      <div className='mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-6'>
        <div className='space-y-3 sm:space-y-4'>
          {certificationDataVN.certifications.map((certification) => (
            <div key={certification.id} className='bg-white border border-gray-300 rounded-lg overflow-hidden'>
              {/* Certification Header - Clickable */}
              <button
                onClick={() => toggleCert(certification.id)}
                className='w-full flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 text-left hover:bg-gray-50 transition-colors duration-200'
              >
                <h3 className='text-base sm:text-lg font-bold text-[#1e3a8a]'>{certification.name}</h3>
                <ChevronDown
                  className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-600 transition-transform duration-200 shrink-0 ${
                    expandedCert === certification.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Certification Content - 2 Column Layout (Shown when expanded) */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out cursor-pointer ${
                  expandedCert === certification.id ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className='bg-gray-100 p-4 sm:p-5'>
                  <div className='flex flex-col lg:flex-row gap-4 sm:gap-5 items-start lg:items-center'>
                    {/* Left: Certificate Image */}
                    {certification.imageUrl && (
                      <div className='w-full lg:w-auto lg:shrink-0'>
                        <div className='bg-white rounded p-2 sm:p-3 shadow border border-gray-200'>
                          <div className='relative w-full max-w-xs mx-auto lg:mx-0'>
                            <Image
                              src={certification.imageUrl}
                              alt={certification.name}
                              width={300}
                              height={300}
                              className='object-contain w-full h-auto'
                              sizes='(max-width: 1024px) 100vw, 300px'
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Right: Description and Button */}
                    <div className='flex-1 flex flex-col justify-center space-y-3'>
                      <p className='text-gray-700 leading-relaxed text-sm sm:text-base'>{certification.description}</p>
                      {certification.detailLink && (
                        <Link
                          href={certification.detailLink}
                          className='inline-flex items-center justify-center w-fit px-4 py-2 text-sm font-medium text-[#2563eb] border border-[#2563eb] rounded hover:bg-[#2563eb] hover:text-white transition-colors duration-200'
                        >
                          Chi tiết thông tin &gt;
                        </Link>
                      )}
                      {certification.sub && (
                        <div className='flex flex-col gap-2'>
                          {certification.sub.map((sub) => (
                            <Link
                              key={sub.id}
                              href={sub.subLink}
                              className='text-blue-500 hover:text-blue-700 border-l-2 border-blue-500 pl-3 pt-2 pb-2 pr-4'
                            >
                              {sub.subName}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
