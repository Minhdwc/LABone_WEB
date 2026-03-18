import { paymentPolicyEN } from '@/lib/payment-policy-constants'

export default function PaymentPolicyPage() {
  const content = paymentPolicyEN

  return (
    <div className='w-full bg-white min-h-screen'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
        {/* Header */}
        <div className='mb-8 text-center'>
          <h1 className='text-3xl sm:text-4xl font-bold text-black mb-4'>{content.title}</h1>
          <p className='text-base text-black'>{content.subtitle}</p>
        </div>

        {/* Payment Methods */}
        <div className='space-y-4 mb-8'>
          {content.methods.map((method, index) => (
            <div key={method.id} className='mb-4'>
              <p className='text-base text-black'>
                <strong>Method {index + 1}:</strong> {method.title}
                <br />
                {method.description && <>{method.description}</>}
              </p>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className='mb-8'>
          <p className='text-base text-black mb-3'>
            <strong>• Important Notes</strong>
          </p>
          <div className='space-y-3'>
            <p className='text-base text-black leading-relaxed'>{content.notes}</p>
          </div>
        </div>

        {/* Bulk Order Note */}
        <div className='mb-8'>
          <p className='text-base text-black leading-relaxed'>{content.bulkOrderNote}</p>
        </div>

        {/* Commitment */}
        <div className='mb-8'>
          <p className='text-base text-black leading-relaxed'>{content.commitment}</p>
        </div>
      </div>
    </div>
  )
}
