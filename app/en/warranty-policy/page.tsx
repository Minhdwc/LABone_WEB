import { warrantyPolicyEN } from '@/lib/warranty-policy'

export default function WarrantyPolicyPage() {
  const content = warrantyPolicyEN

  return (
    <div className='w-full bg-white min-h-screen'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
        {/* Header */}
        <div className='mb-8 text-center'>
          <h1 className='text-3xl sm:text-4xl font-bold text-black mb-4'>{content.title}</h1>
          <p className='text-base text-black'>{content.subtitle}</p>
        </div>

        {/* Covered Cases */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-black mb-4'>1. Cases covered by warranty:</h2>
          <div className='space-y-3'>
            {content.coveredCases.map((item) => (
              <div key={item.id} className='flex items-start gap-3'>
                <span className='text-[#004085] font-bold mt-1'>–</span>
                <p className='text-base text-black flex-1'>{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Not Covered Cases */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-black mb-4'>2. Cases not covered by warranty:</h2>
          <div className='space-y-3'>
            {content.notCoveredCases.map((item) => (
              <div key={item.id} className='flex items-start gap-3'>
                <span className='text-[#004085] font-bold mt-1'>–</span>
                <p className='text-base text-black flex-1'>{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Return & Refund Conditions */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-black mb-4'>3. {content.returnRefundConditions.title}:</h2>
          <div className='space-y-3 mb-4'>
            {content.returnRefundConditions.conditions.map((item) => (
              <div key={item.id} className='flex items-start gap-3'>
                <span className='text-[#004085] font-bold mt-1'>–</span>
                <p className='text-base text-black flex-1'>{item.title}</p>
              </div>
            ))}
          </div>
          <div className='mt-6'>
            <p className='text-base font-semibold text-black mb-3'>
              <strong>{content.returnRefundConditions.note}</strong>
            </p>
            <div className='space-y-2 ml-4'>
              {content.returnRefundConditions.noteDetails.map((detail, index) => (
                <p key={index} className='text-base text-black leading-relaxed'>
                  – {detail}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
