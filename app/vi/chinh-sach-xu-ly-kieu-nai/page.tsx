import { complaintHandlingPolicyVN } from '@/lib/complaint-handling-policy'

export default function ComplaintHandlingPolicyPage() {
  const content = complaintHandlingPolicyVN

  return (
    <div className='w-full bg-white min-h-screen'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
        {/* Header */}
        <div className='mb-8 text-center'>
          <h1 className='text-3xl sm:text-4xl font-bold text-black mb-4'>{content.title}</h1>
        </div>

        {/* Policy Items */}
        <div className='mb-8'>
          <div className='space-y-3'>
            {content.items.map((item) => (
              <div key={item.id} className='flex items-start gap-3'>
                <span className='text-[#004085] font-bold mt-1'>–</span>
                <p className='text-base text-black flex-1'>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
