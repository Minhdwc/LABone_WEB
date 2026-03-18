'use client'

import { useCart } from '@/context/cart-provider'
import { useLanguageStore } from '@/store/language'
import { useState } from 'react'
import { OrderItemCard } from './order-item-card'
import { OrderSummaryCard } from './order-summary-card'
import { OrderEmptyState } from './order-empty-state'
import { OrderInfoForm, OrderInfoFormData } from './order-info-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function OrderPageContent() {
  const { language } = useLanguageStore()
  const { cart, getTotalItems, ready } = useCart()
  const [customerInfo, setCustomerInfo] = useState<OrderInfoFormData>({
    tax_code: '',
    company_name: '',
    company_phone: '',
    company_email: '',
    company_address: '',
    legal_representative: '',
    contact_person: '',
    note: '',
  })

  const totalItems = getTotalItems()
  const totalProducts = cart.reduce((acc, item) => acc + item.quantity, 0)
  const totalAccessories = totalItems - totalProducts

  const handleCustomerInfoChange = (data: OrderInfoFormData) => {
    setCustomerInfo(data)
  }

  if (!ready) {
    return (
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12'>
          <div className='flex items-center justify-center py-16'>
            <div className='text-center'>
              <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent'></div>
              <p className='mt-4 text-gray-600 dark:text-gray-400'>
                {language === 'VN' ? 'Đang tải...' : 'Loading...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  if (cart.length === 0) {
    return <OrderEmptyState />
  }
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-12'>
        {/* Page Header */}
        <div className='mb-8'>
          <h1 className='text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2'>
            {language === 'VN' ? 'Đặt hàng' : 'Place Order'}
          </h1>
          <p className='text-gray-600 dark:text-gray-400'>
            {totalProducts} {language === 'VN' ? 'sản phẩm' : 'products'} • {totalItems - totalProducts}{' '}
            {language === 'VN' ? 'phụ kiện' : 'accessories'}
          </p>
        </div>

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8'>
          {/* Left Column - Order Information Form */}
          <div className='lg:col-span-2 space-y-6 order-2 lg:order-1'>
            {/* Thông tin đơn hàng */}
            <Card className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'>
              <CardHeader>
                <CardTitle className='text-xl font-bold text-gray-900 dark:text-white'>
                  {language === 'VN' ? 'Thông tin đơn hàng' : 'Order Details'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {cart.map((item) => (
                    <OrderItemCard key={item.product.product_id} item={item} />
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Thông tin đặt hàng */}
            <OrderInfoForm
              value={customerInfo}
              onChange={handleCustomerInfoChange}
              onSubmit={handleCustomerInfoChange}
            />
          </div>

          {/* Right Column - Order Summary */}
          <div className='lg:col-span-1 order-1 lg:order-2'>
            <OrderSummaryCard totalProducts={totalProducts} totalItems={totalAccessories} customerInfo={customerInfo} />
          </div>
        </div>
      </div>
    </div>
  )
}
