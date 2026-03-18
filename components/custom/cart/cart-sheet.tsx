'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart-provider'
import { useLanguageStore } from '@/store/language'
import { ICartItem } from '@/types'
import { FaShoppingCart, FaTrash, FaPlus, FaMinus, FaChevronDown } from 'react-icons/fa'
import { Input } from '@/components/ui/input'
import DialogRemoveProduct from './dialog-remove-product'
import notFoundImage from '@/public/assets/notFound/product-placeholder.jpg'

interface CartSheetProps {
  children: React.ReactNode
}
const cartContent = {
  VN: {
    title: 'Giỏ hàng',
    emptyTitle: 'Giỏ hàng trống',
    emptyDescription: 'Chưa có sản phẩm nào trong giỏ hàng của bạn.',
    continueShopping: 'Tiếp tục mua sắm',
    checkout: 'Đặt hàng',
    remove: 'Xóa',
    quantity: 'Số lượng',
    accessories: 'Phụ kiện đi kèm',
  },
  EN: {
    title: 'Shopping Cart',
    emptyTitle: 'Your cart is empty',
    emptyDescription: 'You have no items in your shopping cart.',
    continueShopping: 'Continue Shopping',
    checkout: 'Checkout',
    remove: 'Remove',
    quantity: 'Quantity',
    accessories: 'Included Accessories',
  },
}

export default function CartSheet({ children }: CartSheetProps) {
  const { language } = useLanguageStore()
  const { cart, removeItem, updateProduct, updateAccessory, removeAccessory } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  const content = cartContent[language]
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side='right'
        className='w-full sm:max-w-lg bg-white dark:bg-black rounded-l-xl border-l-2 border-blue-100 dark:border-blue-900 shadow-xl px-0 overflow-hidden flex flex-col'
      >
        <SheetHeader className='px-6 pt-6 pb-4 border-b'>
          <SheetTitle className='flex items-center gap-2 text-2xl font-bold text-blue-600 dark:text-blue-400'>
            <FaShoppingCart className='text-blue-600 dark:text-blue-400' />
            {content.title}
          </SheetTitle>
          <SheetDescription className='text-base text-gray-600 dark:text-gray-300 mt-1'>
            {cart.length} {language === 'VN' ? 'sản phẩm' : 'items'} in cart
          </SheetDescription>
        </SheetHeader>

        {/* Cart Items */}
        <div className='flex-1 overflow-y-auto px-6 py-4'>
          {cart.length === 0 ? (
            <div className='flex flex-col items-center justify-center h-full text-center py-12'>
              <FaShoppingCart className='h-20 w-20 text-gray-300 dark:text-gray-600 mb-4' />
              <h3 className='text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2'>{content.emptyTitle}</h3>
              <p className='text-gray-500 dark:text-gray-400 mb-6 max-w-sm'>{content.emptyDescription}</p>
              <Button
                variant='outline'
                onClick={() => setIsOpen(false)}
                className='border-blue-600 text-blue-600 hover:bg-blue-50 cursor-pointer'
              >
                {content.continueShopping}
              </Button>
            </div>
          ) : (
            <div className='space-y-4'>
              {cart.map((item) => (
                <CartItemCard
                  key={item.product.product_id}
                  item={item}
                  onRemove={() => removeItem(item.product.product_id)}
                  onUpdateQuantity={(qty: number) => updateProduct(item.product.product_id, qty)}
                  onUpdateAccessoryQuantity={(productId: string, accessoryId: string, quantity: number) => {
                    updateAccessory(productId, accessoryId, quantity)
                  }}
                  onRemoveAccessory={(productId: string, accessoryId: string) => {
                    removeAccessory(productId, accessoryId)
                  }}
                  removeLabel={content.remove}
                  quantityLabel={content.quantity}
                  accessoriesLabel={content.accessories}
                />
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <SheetFooter className='flex flex-col gap-4 px-6 py-4 border-t bg-gray-50 dark:bg-gray-900'>
            <div className='flex gap-3 w-full'>
              <Button
                variant='outline'
                onClick={() => setIsOpen(false)}
                className='flex-1 border-gray-300 hover:bg-gray-100 cursor-pointer'
              >
                {content.continueShopping}
              </Button>
              <Button
                className='flex-1 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                onClick={() => {
                  window.location.href = language === 'VN' ? '/vi/dat-hang' : '/en/order'
                  setIsOpen(false)
                }}
              >
                {content.checkout}
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}

interface CartItemCardProps {
  item: ICartItem
  onRemove: () => void
  onUpdateQuantity: (quantity: number) => void
  onUpdateAccessoryQuantity: (productId: string, accessoryId: string, quantity: number) => void
  onRemoveAccessory: (productId: string, accessoryId: string) => void
  removeLabel: string
  quantityLabel: string
  accessoriesLabel: string
}

function CartItemCard({
  item,
  onRemove,
  onUpdateQuantity,
  onUpdateAccessoryQuantity,
  onRemoveAccessory,
  removeLabel,
  quantityLabel,
  accessoriesLabel,
}: CartItemCardProps) {
  const { language } = useLanguageStore()
  const [showAccessories, setShowAccessories] = useState(false)

  const productName =
    language === 'VN' ? item.product.product_name : item.product.product_english_name || item.product.product_name
  const productDescription = item.product.product_id
  const productImage = item.product.image_url || notFoundImage

  const hasAccessories = item.items && item.items.length > 0

  return (
    <div
      className={`p-4 bg-white dark:bg-gray-800 rounded-lg border ${hasAccessories ? 'border-blue-200 dark:border-blue-800' : 'border-gray-200 dark:border-gray-700'
        }`}
    >
      <div className='flex gap-4'>
        {/* Product Image */}
        <div className='shrink-0'>
          <div className='w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600'>
            <Image src={productImage} alt={productName} width={80} height={80} className='w-full h-full object-cover' />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1 min-w-0 flex flex-col gap-2'>
          <div className='flex justify-between items-start'>
            <div className='flex-1 min-w-0'>
              <h3 className='font-semibold text-gray-900 dark:text-white text-sm line-clamp-2'>{productName}</h3>
              {productDescription && (
                <p className='text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1'>{productDescription}</p>
              )}
            </div>
            <DialogRemoveProduct
              product={item.product}
              onConfirm={onRemove}
              trigger={
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer p-1 h-auto'
                  aria-label={removeLabel}
                >
                  <FaTrash className='h-4 w-4' />
                </Button>
              }
            />
          </div>

          {/* Quantity Controls */}
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <span className='text-xs text-gray-500 dark:text-gray-400'>{quantityLabel}:</span>
              <div className='flex items-center gap-1 border border-gray-300 dark:border-gray-600 rounded'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => onUpdateQuantity(item.quantity - 1)}
                  className='h-7 w-7 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
                  disabled={item.quantity <= 1}
                >
                  <FaMinus className='h-3 w-3' />
                </Button>
                <Input
                  type='number'
                  className='w-16 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-none focus:border-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none'
                  value={item.quantity}
                  min={1}
                  onChange={(e) => {
                    const value = e.target.value
                    if (value === '') return
                    const numValue = Number(value)
                    if (!isNaN(numValue) && numValue >= 1) {
                      onUpdateQuantity(numValue)
                    }
                  }}
                  onBlur={(e) => {
                    const value = Number(e.target.value)
                    if (isNaN(value) || value < 1 || e.target.value === '') {
                      onUpdateQuantity(1)
                    }
                  }}
                />
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => onUpdateQuantity(item.quantity + 1)}
                  className='h-7 w-7 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
                >
                  <FaPlus className='h-3 w-3' />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accessories Section */}
      {hasAccessories && (
        <div className='mt-4 border-t border-gray-200 dark:border-gray-700'>
          {/* Accessories Header */}
          <button
            onClick={() => setShowAccessories(!showAccessories)}
            className='w-full flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 rounded cursor-pointer'
          >
            <div className='flex items-center gap-2'>
              <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>{accessoriesLabel}</span>
              <span className='px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded text-xs font-medium'>
                {item.items?.length || 0}
              </span>
            </div>
            <FaChevronDown
              className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${showAccessories ? 'rotate-180' : ''
                }`}
            />
          </button>

          {/* Accessories List */}
          {showAccessories && (
            <div className='mt-2 space-y-2'>
              {item.items?.map((accessoryItem, index) => {
                const accessoryName =
                  language === 'VN'
                    ? accessoryItem.accessory.product_name
                    : accessoryItem.accessory.product_english_name || accessoryItem.accessory.product_name
                const accessoryImage = accessoryItem.accessory.image_url || notFoundImage

                return (
                  <div
                    key={`${accessoryItem.accessory.product_id}-${index}`}
                    className='flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-900/30 rounded border border-gray-200 dark:border-gray-700'
                  >
                    {/* Accessory Image */}
                    <div className='shrink-0'>
                      <div className='w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden border border-gray-200 dark:border-gray-600'>
                        <Image
                          src={accessoryImage}
                          alt={accessoryName}
                          width={48}
                          height={48}
                          className='w-full h-full object-cover'
                        />
                      </div>
                    </div>

                    {/* Accessory Info */}
                    <div className='flex-1 min-w-0'>
                      <div className='flex justify-between items-center'>
                        <p className='text-sm font-medium text-gray-900 dark:text-white line-clamp-1 mb-2'>
                          {accessoryName}
                        </p>
                        <DialogRemoveProduct
                          product={item.product}
                          accessory={accessoryItem.accessory}
                          onConfirm={() =>
                            onRemoveAccessory(item.product.product_id, accessoryItem.accessory.product_id)
                          }
                          trigger={
                            <Button
                              variant='ghost'
                              size='sm'
                              className='text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer p-1 h-auto'
                              aria-label={removeLabel}
                            >
                              <FaTrash className='h-4 w-4' />
                            </Button>
                          }
                        />
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='text-xs text-gray-500 dark:text-gray-400'>{quantityLabel}:</span>
                        <div className='flex items-center gap-1 border border-gray-300 dark:border-gray-600 rounded'>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => {
                              if (accessoryItem.quantity > 1) {
                                onUpdateAccessoryQuantity(
                                  item.product.product_id,
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
                            className='w-16 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-none focus:border-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none'
                            value={accessoryItem.quantity}
                            min={0}
                            onChange={(e) => {
                              const value = e.target.value
                              if (value === '') return
                              const numValue = Number(value)
                              if (!isNaN(numValue) && numValue >= 1) {
                                onUpdateAccessoryQuantity(
                                  item.product.product_id,
                                  accessoryItem.accessory.product_id,
                                  numValue,
                                )
                              }
                            }}
                            onBlur={(e) => {
                              const value = Number(e.target.value)
                              if (isNaN(value) || value < 1 || e.target.value === '') {
                                onUpdateAccessoryQuantity(
                                  item.product.product_id,
                                  accessoryItem.accessory.product_id,
                                  1,
                                )
                              }
                            }}
                          />
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => {
                              onUpdateAccessoryQuantity(
                                item.product.product_id,
                                accessoryItem.accessory.product_id,
                                accessoryItem.quantity + 1,
                              )
                            }}
                            className='h-7 w-7 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
                          >
                            <FaPlus className='h-3 w-3' />
                          </Button>
                        </div>
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
  )
}
