'use client'

import { useState, useEffect } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { IProduct, IWebMenuProductAccessory } from '@/types'
import PreviewImage from '@/components/custom/preview-image'
import DialogAddAccessory from '@/components/custom/cart/dialog-add-accessory'
import { useCart } from '@/context/cart-provider'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'

interface AccessoryOrderingInfoProps {
  webMenuProductId: string
  product: IProduct // Sản phẩm cha
  accessories: IWebMenuProductAccessory[] | null
  currentLanguage: 'VN' | 'EN'
}

export default function AccessoryOrderingInfo({
  webMenuProductId,
  product,
  accessories,
  currentLanguage,
}: AccessoryOrderingInfoProps) {
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(9)
  const [loading, setLoading] = useState(false)
  // State để lưu quantity cho từng accessory
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})
  const { addToCart } = useCart()

  // Tạo main product item để thêm vào đầu danh sách
  const createMainProductItem = (): IWebMenuProductAccessory => {
    return {
      web_menu_product_accesory_id: `main-${product.product_id}`,
      web_menu_product_id: webMenuProductId,
      accessory_product_id: product.product_id,
      accessory_product: product,
    } as IWebMenuProductAccessory
  }

  // Kết hợp main product với accessories
  const allProducts = [createMainProductItem(), ...(accessories || [])]

  // Xử lý thêm sản phẩm chính vào giỏ hàng
  const handleAddMainProductToCart = () => {
    const quantity = quantities[`main-${product.product_id}`] || 1
    addToCart(product, quantity)

    const productName =
      currentLanguage === 'VN' ? product.product_name : product.product_english_name || product.product_name

    toast.success(currentLanguage === 'VN' ? 'Thêm vào giỏ hàng thành công' : 'Added to cart successfully', {
      description: `${productName} (x${quantity})`,
      className: '!bg-green-500 !text-white !border-0',
      style: {
        backgroundColor: '#10b981',
        color: '#ffffff',
      },
      position: 'top-right',
    })
  }

  if (loading) {
    return (
      <div className='mt-8'>
        <div className='text-center py-8 text-gray-500'>{currentLanguage === 'VN' ? 'Đang tải...' : 'Loading...'}</div>
      </div>
    )
  }

  if (!allProducts || allProducts.length === 0) {
    return null
  }

  return (
    <div className='mt-8'>
      <h2 className='text-lg sm:text-xl font-bold text-gray-900 mb-4'>
        {currentLanguage === 'VN' ? 'Danh sách đặt hàng' : 'Ordering List'}
      </h2>

      {/* Grid Card View - Mobile & Tablet */}
      <div className='lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {allProducts.map((accessory, index) => {
          const productName =
            currentLanguage === 'VN'
              ? accessory.accessory_product?.product_name
              : accessory.accessory_product?.product_english_name
          const unit =
            currentLanguage === 'VN' ? accessory.accessory_product?.unit : accessory.accessory_product?.unit_english
          const isMainProduct = index === 0

          return (
            <div
              key={`ordering-${index}-${String(accessory.web_menu_product_accesory_id ?? '')}`}
              className={`bg-white rounded-lg border border-gray-200 p-4 ${
                isMainProduct ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className='flex flex-col gap-3'>
                {/* Image and Product Name */}
                <div className='flex gap-3'>
                  {accessory.accessory_product?.image_url ? (
                    <div className='relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-gray-200 shrink-0'>
                      <PreviewImage
                        imageUrl={accessory.accessory_product.image_url}
                        clsx='w-full h-full rounded-lg object-cover'
                      />
                    </div>
                  ) : (
                    <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-lg border border-gray-200 bg-gray-100 flex items-center justify-center shrink-0'>
                      <span className='text-gray-400 text-[10px] sm:text-xs text-center px-1'>
                        {currentLanguage === 'VN' ? 'Không có ảnh' : 'No image'}
                      </span>
                    </div>
                  )}
                  <div className='flex-1 min-w-0'>
                    <h3 className='text-sm sm:text-base font-semibold text-gray-900 break-words'>
                      {accessory.accessory_product?.code ? accessory.accessory_product?.code + ' | ' : ''}
                      {productName || '-'}
                    </h3>
                    <p className='text-xs text-gray-500 mt-1 break-all'>
                      {currentLanguage === 'VN' ? 'Mã: ' : 'Code: '}
                      {accessory.accessory_product?.product_id || '-'}
                    </p>
                  </div>
                </div>

                {/* Unit and Quantity */}
                <div className='flex items-center justify-between gap-2'>
                  <div className='text-sm text-gray-600'>
                    <span className='font-medium'>{currentLanguage === 'VN' ? 'Đơn vị: ' : 'Unit: '}</span>
                    <span>{unit || '-'}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <label className='text-xs text-gray-600 whitespace-nowrap'>
                      {currentLanguage === 'VN' ? 'Số lượng:' : 'Qty:'}
                    </label>
                    <Input
                      type='number'
                      min={0}
                      value={quantities[accessory.web_menu_product_accesory_id] || 1}
                      onChange={(e) => {
                        const value = Number(e.target.value) || 0
                        setQuantities((prev) => ({
                          ...prev,
                          [accessory.web_menu_product_accesory_id]: value > 0 ? value : 1,
                        }))
                      }}
                      className='w-16 sm:w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                      placeholder={currentLanguage === 'VN' ? 'SL' : 'Qty'}
                    />
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className='pt-2'>
                  {isMainProduct ? (
                    <Button
                      onClick={handleAddMainProductToCart}
                      className='w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded flex items-center justify-center gap-2 cursor-pointer'
                    >
                      <ShoppingCart className='w-4 h-4' />
                      <span>{currentLanguage === 'VN' ? 'Thêm giỏ hàng' : 'Add to Cart'}</span>
                    </Button>
                  ) : (
                    accessory.accessory_product && (
                      <DialogAddAccessory
                        product={product}
                        accessory={accessory.accessory_product}
                        quantity={quantities[accessory.web_menu_product_accesory_id] || 1}
                        trigger={
                          <Button className='w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded flex items-center justify-center gap-2 cursor-pointer'>
                            <ShoppingCart className='w-4 h-4' />
                            <span>{currentLanguage === 'VN' ? 'Thêm giỏ hàng' : 'Add to Cart'}</span>
                          </Button>
                        }
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Table View - Desktop */}
      <div className='hidden lg:block bg-white rounded-lg border border-gray-200 overflow-hidden'>
        <div className='overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow className='bg-gray-50'>
                <TableHead className='px-4 py-3 text-left text-sm font-semibold text-gray-700 max-w-[300px]'>
                  {currentLanguage === 'VN' ? 'Tên sản phẩm' : 'Product Name'}
                </TableHead>
                <TableHead className='px-4 py-3 text-left text-sm font-semibold text-gray-700 max-w-[250px]'>
                  {currentLanguage === 'VN' ? 'Hình ảnh' : 'Image'}
                </TableHead>
                <TableHead className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                  {currentLanguage === 'VN' ? 'Mã đặt hàng/sản phẩm' : 'Order Code/Product Code'}
                </TableHead>
                <TableHead className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                  {currentLanguage === 'VN' ? 'Đơn vị tính' : 'Unit'}
                </TableHead>
                <TableHead className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                  {currentLanguage === 'VN' ? 'Số lượng' : 'Quantity'}
                </TableHead>
                <TableHead className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                  {currentLanguage === 'VN' ? 'Chọn vào giỏ hàng' : 'Add to Cart'}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allProducts.map((accessory, index) => {
                const productName =
                  currentLanguage === 'VN'
                    ? accessory.accessory_product?.product_name
                    : accessory.accessory_product?.product_english_name
                const unit =
                  currentLanguage === 'VN'
                    ? accessory.accessory_product?.unit
                    : accessory.accessory_product?.unit_english
                const isMainProduct = index === 0

                return (
                  <TableRow
                    key={`ordering-${index}-${String(accessory.web_menu_product_accesory_id ?? '')}`}
                    className={`hover:bg-gray-50 ${isMainProduct ? 'bg-blue-50' : ''}`}
                  >
                    <TableCell className='px-4 py-4 text-sm text-gray-900 max-w-[300px] whitespace-normal break-words'>
                      <span>{accessory.accessory_product?.code ? accessory.accessory_product?.code + ' | ' : ''}</span>
                      <span>{productName || '-'}</span>
                    </TableCell>
                    <TableCell className='px-4 py-4 max-w-[250px]'>
                      {accessory.accessory_product?.image_url ? (
                        <div className='relative w-26 sm:w-30 aspect-square rounded-lg overflow-hidden border border-gray-200 bg-white'>
                          <PreviewImage
                            imageUrl={accessory.accessory_product.image_url}
                            clsx='w-full h-full rounded-lg object-cover'
                          />
                        </div>
                      ) : (
                        <span className='text-gray-400 text-xs'>
                          {currentLanguage === 'VN' ? 'Không có ảnh' : 'No image'}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className='px-4 py-4 text-sm text-gray-700'>
                      {accessory.accessory_product?.product_id || '-'}
                    </TableCell>
                    <TableCell className='px-4 py-4 text-sm text-gray-700'>{unit || '-'}</TableCell>
                    <TableCell className='px-4 py-4'>
                      <input
                        type='number'
                        min='1'
                        value={quantities[accessory.web_menu_product_accesory_id] || 1}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 1
                          setQuantities((prev) => ({
                            ...prev,
                            [accessory.web_menu_product_accesory_id]: value > 0 ? value : 1,
                          }))
                        }}
                        className='w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder={currentLanguage === 'VN' ? 'Điền số lượng' : 'Quantity'}
                      />
                    </TableCell>
                    <TableCell className='px-4 py-4'>
                      {isMainProduct ? (
                        <Button
                          onClick={handleAddMainProductToCart}
                          className='bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded flex items-center gap-2 cursor-pointer'
                        >
                          <ShoppingCart className='w-4 h-4' />
                          <span>{currentLanguage === 'VN' ? 'Thêm giỏ hàng' : 'Add to Cart'}</span>
                        </Button>
                      ) : (
                        accessory.accessory_product && (
                          <DialogAddAccessory
                            product={product}
                            accessory={accessory.accessory_product}
                            quantity={quantities[accessory.web_menu_product_accesory_id] || 1}
                            trigger={
                              <Button className='bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded flex items-center gap-2 cursor-pointer'>
                                <ShoppingCart className='w-4 h-4' />
                                <span>{currentLanguage === 'VN' ? 'Thêm giỏ hàng' : 'Add to Cart'}</span>
                              </Button>
                            }
                          />
                        )
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
