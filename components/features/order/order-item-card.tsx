'use client'

import { useLanguageStore } from '@/store/language'
import { useCart } from '@/context/cart-provider'
import { ICartItem } from '@/types'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FaChevronDown, FaChevronUp, FaPlus, FaMinus, FaTrash } from 'react-icons/fa'
import notFoundImage from '@/public/assets/notFound/product-placeholder.jpg'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import DialogRemoveProduct from '../../custom/cart/dialog-remove-product'
import PreviewImage from '@/components/custom/preview-image'

interface OrderItemCardProps {
  item: ICartItem
}

export function OrderItemCard({ item }: OrderItemCardProps) {
  const { language } = useLanguageStore()
  const { updateProduct, updateAccessory, removeItem, removeAccessory } = useCart()
  const [showAccessories, setShowAccessories] = useState(false)

  const productName =
    language === 'VN' ? item.product.product_name : item.product.product_english_name || item.product.product_name
  const productImage = item.product.image_url || notFoundImage
  const hasAccessories = item.items && item.items.length > 0

  const handleUpdateProductQuantity = (quantity: number) => {
    if (quantity >= 1) {
      updateProduct(item.product.product_id, quantity)
    }
  }

  const handleUpdateAccessoryQuantity = (accessoryId: string, quantity: number) => {
    if (quantity >= 1) {
      updateAccessory(item.product.product_id, accessoryId, quantity)
    }
  }

  return (
    <Card className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'>
      <CardContent className='p-4 sm:p-6'>
        <div className='flex flex-col gap-4 sm:flex-row'>
          {/* Product Image */}
          <div className='shrink-0 flex sm:block justify-center'>
            <div className='w-20 h-20 lg:w-24 lg:h-24 aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600'>
              <PreviewImage imageUrl={productImage as string} clsx='w-full h-full rounded-none object-cover' />
            </div>
          </div>

          {/* Product Info */}
          <div className='flex-1 min-w-0'>
            <div className='flex justify-between items-start mb-2'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>{productName}</h3>
              <DialogRemoveProduct
                product={item.product}
                onConfirm={() => removeItem(item.product.product_id)}
                trigger={
                  <Button
                    variant='ghost'
                    size='sm'
                    className='text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer p-1 h-auto'
                    aria-label={language === 'VN' ? 'Xóa sản phẩm' : 'Remove product'}
                  >
                    <FaTrash className='h-4 w-4' />
                  </Button>
                }
              />
            </div>
            <div className='space-y-1 text-sm text-gray-600 dark:text-gray-400 mb-4'>
              {item.product.code && (
                <p>
                  <span className='font-medium'>{language === 'VN' ? 'Mã sản phẩm' : 'Product Code'}:</span>{' '}
                  {item.product.code}
                </p>
              )}

              {/* Quantity Controls for Product */}
              <div className='flex flex-wrap items-center gap-2 sm:gap-3'>
                <span className='font-medium'>{language === 'VN' ? 'Số lượng' : 'Quantity'}:</span>
                <div className='flex items-center gap-1 border border-gray-300 dark:border-gray-600 rounded shrink-0'>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => handleUpdateProductQuantity(item.quantity - 1)}
                    className='h-7 w-7 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
                    disabled={item.quantity <= 1}
                  >
                    <FaMinus className='h-3 w-3' />
                  </Button>
                  <Input
                    type='number'
                    className='w-14 text-center text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-none focus:border-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none'
                    value={item.quantity}
                    min={1}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value === '') return
                      const numValue = Number(value)
                      if (!isNaN(numValue) && numValue >= 1) {
                        handleUpdateProductQuantity(numValue)
                      }
                    }}
                    onBlur={(e) => {
                      const value = Number(e.target.value)
                      if (isNaN(value) || value < 1 || e.target.value === '') {
                        handleUpdateProductQuantity(1)
                      }
                    }}
                  />
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => handleUpdateProductQuantity(item.quantity + 1)}
                    className='h-7 w-7 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
                  >
                    <FaPlus className='h-3 w-3' />
                  </Button>
                </div>
                <span className='text-xs text-gray-500 dark:text-gray-400'>{item.product.unit || ''}</span>
              </div>
            </div>

            {/* Accessories Section */}
            {hasAccessories && (
              <div className='mt-4 border-t border-gray-200 dark:border-gray-700 pt-4'>
                <button
                  onClick={() => setShowAccessories(!showAccessories)}
                  className='w-full flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 rounded cursor-pointer'
                >
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                      {language === 'VN' ? 'Phụ kiện đi kèm' : 'Included Accessories'}
                    </span>
                    <span className='px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded text-xs font-medium'>
                      {item.items?.length || 0}
                    </span>
                  </div>
                  {showAccessories ? (
                    <FaChevronUp className='w-4 h-4 text-gray-500 dark:text-gray-400' />
                  ) : (
                    <FaChevronDown className='w-4 h-4 text-gray-500 dark:text-gray-400' />
                  )}
                </button>

                {showAccessories && (
                  <div className='mt-3 space-y-3'>
                    {item.items?.map((accessoryItem, index) => {
                      const accessoryName =
                        language === 'VN'
                          ? accessoryItem.accessory.product_name
                          : accessoryItem.accessory.product_english_name || accessoryItem.accessory.product_name
                      const accessoryImage = accessoryItem.accessory.image_url || notFoundImage

                      return (
                        <div
                          key={`${accessoryItem.accessory.product_id}-${index}`}
                          className='flex flex-col gap-3 sm:flex-row sm:items-center p-3 bg-gray-50 dark:bg-gray-900/30 rounded border border-gray-200 dark:border-gray-700'
                        >
                          <div className='shrink-0 self-center sm:self-start'>
                            <div className='w-20 h-20 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden border border-gray-200 dark:border-gray-600'>
                              <Image
                                src={accessoryImage}
                                alt={accessoryName}
                                width={64}
                                height={64}
                                className='w-full h-full object-cover'
                              />
                            </div>
                          </div>
                          <div className='flex-1 w-full min-w-0'>
                            <div className='flex items-center justify-between gap-2 mb-2'>
                              <p className='flex-1 text-sm font-medium text-gray-900 dark:text-white line-clamp-2'>
                                {accessoryName}
                              </p>
                              <DialogRemoveProduct
                                product={item.product}
                                accessory={accessoryItem.accessory}
                                onConfirm={() =>
                                  removeAccessory(item.product.product_id, accessoryItem.accessory.product_id)
                                }
                                trigger={
                                  <Button
                                    variant='ghost'
                                    size='sm'
                                    className='text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer p-1 h-auto'
                                    aria-label={language === 'VN' ? 'Xóa phụ kiện' : 'Remove accessory'}
                                  >
                                    <FaTrash className='h-3 w-3' />
                                  </Button>
                                }
                              />
                            </div>

                            {/* Quantity Controls for Accessory */}
                            <div className='flex flex-wrap items-center gap-2'>
                              <span className='text-xs text-gray-500 dark:text-gray-400'>
                                {language === 'VN' ? 'Số lượng' : 'Quantity'}:
                              </span>
                              <div className='flex items-center gap-1 border border-gray-300 dark:border-gray-600 rounded shrink-0'>
                                <Button
                                  variant='ghost'
                                  size='sm'
                                  onClick={() => {
                                    if (accessoryItem.quantity > 1) {
                                      handleUpdateAccessoryQuantity(
                                        accessoryItem.accessory.product_id,
                                        accessoryItem.quantity - 1,
                                      )
                                    }
                                  }}
                                  className='h-7 w-7 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
                                  disabled={accessoryItem.quantity <= 1}
                                >
                                  <FaMinus className='h-3 w-3' />
                                </Button>
                                <Input
                                  type='number'
                                  className='w-14 text-center text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-none focus:border-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none'
                                  value={accessoryItem.quantity}
                                  min={1}
                                  onChange={(e) => {
                                    const value = e.target.value
                                    if (value === '') return
                                    const numValue = Number(value)
                                    if (!isNaN(numValue) && numValue >= 1) {
                                      handleUpdateAccessoryQuantity(accessoryItem.accessory.product_id, numValue)
                                    }
                                  }}
                                  onBlur={(e) => {
                                    const value = Number(e.target.value)
                                    if (isNaN(value) || value < 1 || e.target.value === '') {
                                      handleUpdateAccessoryQuantity(accessoryItem.accessory.product_id, 1)
                                    }
                                  }}
                                />
                                <Button
                                  variant='ghost'
                                  size='sm'
                                  onClick={() => {
                                    handleUpdateAccessoryQuantity(
                                      accessoryItem.accessory.product_id,
                                      accessoryItem.quantity + 1,
                                    )
                                  }}
                                  className='h-7 w-7 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
                                >
                                  <FaPlus className='h-3 w-3' />
                                </Button>
                              </div>
                              <span className='text-xs text-gray-500 dark:text-gray-400'>
                                {accessoryItem.accessory.unit || ''}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
