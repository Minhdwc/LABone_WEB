'use client'

import { useLanguageStore } from '@/store/language'
import { Button } from '@/components/ui/button'
import { FaShoppingCart } from 'react-icons/fa'

export function OrderEmptyState() {
  const { language } = useLanguageStore()

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='flex flex-col items-center justify-center text-center py-16'>
          <FaShoppingCart className='h-24 w-24 text-gray-300 dark:text-gray-600 mb-6' />
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
            {language === 'VN' ? 'Giỏ hàng trống' : 'Your cart is empty'}
          </h1>
          <p className='text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md'>
            {language === 'VN'
              ? 'Chưa có sản phẩm nào trong giỏ hàng của bạn.'
              : 'You have no items in your shopping cart.'}
          </p>
          <div
            onClick={() => {
              window.location.href = language === 'VN' ? '/vi/danh-muc-san-pham' : '/en/product-categories'
            }}
            className='cursor-pointer'
          >
            <Button className='bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'>
              {language === 'VN' ? 'Tiếp tục mua sắm' : 'Continue Shopping'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
