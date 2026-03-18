import { returnRefundPolicyEN } from '@/lib/return-refund-policy'

export default function ReturnRefundPolicyPage() {
  const content = returnRefundPolicyEN

  return (
    <div className='w-full bg-white min-h-screen'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
        {/* Header */}
        <div className='mb-8 text-center'>
          <h1 className='text-3xl sm:text-4xl font-bold text-black mb-4'>{content.title}</h1>
        </div>

        {/* Return Conditions */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-black mb-4'>{content.returnConditions.title}</h2>
          <p className='text-base text-black mb-4'>{content.returnConditions.intro}</p>
          <div className='space-y-3 mb-4'>
            {content.returnConditions.conditions.map((item) => (
              <div key={item.id} className='flex items-start gap-3'>
                <span className='text-[#004085] font-bold mt-1'>–</span>
                <p className='text-base text-black flex-1'>{item.title}</p>
              </div>
            ))}
          </div>
          <p className='text-base text-black mt-4'>{content.returnConditions.note}</p>
        </div>

        {/* Regulations */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-black mb-4'>{content.regulations.title}</h2>
          <div className='space-y-4'>
            <div>
              <p className='text-base font-semibold text-black mb-2'>
                <strong>{content.regulations.notificationTime.title}</strong>
              </p>
              <p className='text-base text-black'>{content.regulations.notificationTime.description}</p>
            </div>
            <div>
              <p className='text-base font-semibold text-black mb-2'>
                <strong>{content.regulations.sendBackTime.title}</strong>
              </p>
              <p className='text-base text-black'>{content.regulations.sendBackTime.description}</p>
            </div>
            <div>
              <p className='text-base font-semibold text-black mb-2'>
                <strong>{content.regulations.returnLocation.title}</strong>
              </p>
              <p className='text-base text-black'>{content.regulations.returnLocation.description}</p>
            </div>
            <div className='mt-4'>
              <p className='text-base text-black'>{content.regulations.contactNote}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
