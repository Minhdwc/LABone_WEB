'use client'
import { useState } from 'react'
import { servicesDataVN, servicesDataEN } from '@/lib/services-constants'
import { useLanguageStore } from '@/store/language'

export default function ServicesPage() {
  const { language } = useLanguageStore()
  const [selectedService, setSelectedService] = useState(0)

  const servicesData = language === 'VN' ? servicesDataVN : servicesDataEN
  const currentService = servicesData.services[selectedService]

  return (
    <div className='w-full bg-white min-h-screen'>
      {/* Hero Section with Background Image */}
      <div
        className='relative w-full h-[200px] sm:h-[300px] md:h-[400px] bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: 'url(/assets/services/dich-vu-sua-chua-HUYlab-LABone.jpg)',
        }}
      ></div>

      {/* Title Section with Decorative Lines */}
      <div className='w-full bg-white py-8 sm:py-10 md:py-12'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6'>
          <div className='flex items-center justify-center gap-2 sm:gap-4'>
            <div className='flex-1 border-t border-gray-300'></div>
            <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-[#1e3a8a] tracking-wide px-2 sm:px-4 text-center'>
              {servicesData.title}
            </h2>
            <div className='flex-1 border-t border-gray-300'></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8 pb-12 sm:pb-16'>
        <div className='flex flex-col lg:flex-row gap-4 sm:gap-6'>
          {/* Left Navigation */}
          <div className='w-full lg:w-1/3'>
            <nav className='space-y-2 sm:space-y-3'>
              {servicesData.services.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(index)}
                  className={`w-full text-left px-4 py-3 sm:px-6 sm:py-4 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    selectedService === index
                      ? 'bg-[#2563eb] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {service.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Content */}
          <div className='w-full lg:w-2/3'>
            <div className='bg-white border-2 border-[#3b82f6] rounded-lg p-4 sm:p-6 md:p-8'>
              <div className='space-y-3 sm:space-y-4 md:space-y-5'>
                {currentService.description.map((paragraph, index) => (
                  <div key={index} className='flex items-start gap-2 sm:gap-3'>
                    <span className='text-gray-800 mt-1.5 sm:mt-2 shrink-0 text-sm sm:text-base'>•</span>
                    <p className='text-gray-700 leading-relaxed text-sm sm:text-base'>{paragraph}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
