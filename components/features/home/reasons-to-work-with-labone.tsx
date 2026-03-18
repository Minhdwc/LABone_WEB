'use client'

import { useLanguageStore } from '@/store/language'
import { reasonsToWorkVN, reasonsToWorkEN } from '@/lib/containts'

const ISOIcon = () => (
  <div className='w-12 h-12 rounded-full border-2 border-blue-600 bg-white flex items-center justify-center'>
    <div className='text-blue-600 font-bold text-xs text-center'>
      <div>ISO</div>
      <div className='text-xs'>✓</div>
    </div>
  </div>
)

const ManufacturingIcon = () => (
  <div className='w-12 h-12 rounded-full border-2 border-blue-600 bg-white flex items-center justify-center'>
    <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
      />
    </svg>
  </div>
)

const StandardsIcon = () => (
  <div className='w-12 h-12 rounded-full border-2 border-blue-600 bg-white flex items-center justify-center'>
    <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
      />
    </svg>
  </div>
)

const RDIcon = () => (
  <div className='w-12 h-12 rounded-full border-2 border-blue-600 bg-white flex items-center justify-center'>
    <div className='text-blue-600 font-bold text-xs'>
      <div>R&D</div>
    </div>
  </div>
)

const PricingIcon = () => (
  <div className='w-12 h-12 rounded-full border-2 border-blue-600 bg-white flex items-center justify-center'>
    <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
      />
    </svg>
  </div>
)

const ServiceIcon = () => (
  <div className='w-12 h-12 rounded-full border-2 border-blue-600 bg-white flex items-center justify-center'>
    <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'
      />
    </svg>
  </div>
)

// Icon mapping
const iconMap = {
  ISO: ISOIcon,
  Manufacturing: ManufacturingIcon,
  Standards: StandardsIcon,
  'R&D': RDIcon,
  Pricing: PricingIcon,
  Service: ServiceIcon,
}

interface ReasonsToWorkWithLaboneProps {
  variant?: 'default' | 'two-columns'
  className?: string
}

export default function ReasonsToWorkWithLabone({ variant = 'default', className = '' }: ReasonsToWorkWithLaboneProps) {
  const { language } = useLanguageStore()
  const content = language === 'VN' ? reasonsToWorkVN : reasonsToWorkEN

  const gridCols =
    variant === 'two-columns'
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <section className={`py-8 px-4 ${className}`}>
      <div className={variant === 'two-columns' ? 'w-full' : 'max-w-6xl mx-auto'}>
        {/* Header Section */}
        <div className={`${variant === 'two-columns' ? 'text-left' : 'text-center'} mb-8`}>
          <h2
            className={`${
              variant === 'two-columns' ? 'text-2xl md:text-3xl' : 'text-2xl sm:text-3xl md:text-4xl'
            } font-bold text-center text-blue-600 mb-4`}
          >
            {content.title}
          </h2>
          {variant === 'default' && (
            <p className='text-gray-700 text-sm sm:text-base md:text-lg max-w-4xl mx-auto leading-relaxed'>
              {content.description}
            </p>
          )}
        </div>

        {/* Feature Cards Grid */}
        <div className={`grid ${gridCols} gap-3 sm:gap-4`}>
          {content.features.map((feature) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap]

            return (
              <div
                key={feature.id}
                className='border-2 bg-white border-gray-300 rounded-lg p-4 sm:p-5 text-center hover:shadow-md transition-shadow'
              >
                <div className='flex flex-col items-center space-y-3'>
                  <IconComponent />
                  <p className='text-gray-800 text-sm sm:text-base leading-relaxed font-medium'>{feature.title}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
