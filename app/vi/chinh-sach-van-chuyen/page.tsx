import { shippingPolicyVN } from '@/lib/shipping-policy'

export default function ShippingPolicyPage() {
  const content = shippingPolicyVN

  return (
    <div className='w-full bg-white min-h-screen'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
        {/* Header */}
        <div className='mb-8 text-center'>
          <h1 className='text-3xl sm:text-4xl font-bold text-black mb-4'>{content.title}</h1>
        </div>

        {/* Delivery Methods */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-black mb-4'>{content.deliveryMethods.title}</h2>
          <p className='text-base text-black mb-3'>{content.deliveryMethods.intro}</p>
          <div className='space-y-2'>
            {content.deliveryMethods.methods.map((method, index) => (
              <div key={index} className='flex items-start gap-3'>
                <span className='text-[#004085] font-bold mt-1'>–</span>
                <p className='text-base text-black flex-1'>{method}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Estimated Delivery Time */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-black mb-4'>{content.estimatedDeliveryTime.title}</h2>
          <p className='text-base text-black mb-3'>{content.estimatedDeliveryTime.processingTime}</p>
          <p className='text-base text-black mb-3'>{content.estimatedDeliveryTime.deliveryTime}</p>
          <p className='text-base text-black mb-3'>{content.estimatedDeliveryTime.forceMajeureIntro}</p>
          <div className='space-y-2 mb-4'>
            {content.estimatedDeliveryTime.forceMajeureCases.map((item, index) => (
              <div key={index} className='flex items-start gap-3'>
                <span className='text-[#004085] font-bold mt-1'>–</span>
                <p className='text-base text-black flex-1'>{item}</p>
              </div>
            ))}
          </div>
          <p className='text-base text-black'>{content.estimatedDeliveryTime.shippingFee}</p>
        </div>

        {/* Geographical Limitations */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-black mb-4'>{content.geographicalLimitations.title}</h2>
          <p className='text-base text-black'>{content.geographicalLimitations.description}</p>
        </div>

        {/* Note */}
        <div className='mb-8'>
          <p className='text-base font-semibold text-black'>
            <strong>{content.note}</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
