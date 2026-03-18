'use client'

import { Fragment, useState } from 'react'
import { Minus, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'

import { useLanguageStore } from '@/store/language'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ICartItem } from '@/types'

interface QuotationItem extends ICartItem {
  category?: {
    vn: string
    en: string
  }
  webMenuId?: string | null
}

interface OrderTableProps {
  items: QuotationItem[]
  onUpdateProductQuantity: (productId: string, quantity: number, webMenuId?: string | null) => void
  onUpdateAccessoryQuantity: (
    productId: string,
    accessoryId: string,
    quantity: number,
    webMenuId?: string | null,
  ) => void
  onRemoveProduct: (productId: string, webMenuId?: string | null) => void
  onRemoveAccessory: (productId: string, accessoryId: string) => void
}

const OrderTable = ({
  items,
  onUpdateProductQuantity,
  onUpdateAccessoryQuantity,
  onRemoveProduct,
  onRemoveAccessory,
}: OrderTableProps) => {
  const { language } = useLanguageStore()
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const totalMainItems = items.length
  const totalAccessories = items.reduce((sum, item) => sum + (item.items?.length ?? 0), 0)

  const toggleExpand = (itemKey: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }))
  }

  const renderQuantityControl = (value: number, onChange: (value: number) => void) => (
    <div className='inline-flex items-center gap-0.5 rounded-md border border-gray-200 bg-white px-1 py-0.5 dark:border-gray-700 dark:bg-gray-900'>
      <Button
        type='button'
        size='icon'
        variant='ghost'
        className='h-6 w-6 cursor-pointer'
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
      >
        <Minus className='h-3 w-3' />
      </Button>
      <Input
        type='number'
        min={1}
        value={value}
        onChange={(event) => {
          const numeric = Number(event.target.value)
          if (!Number.isNaN(numeric) && numeric >= 1) {
            onChange(numeric)
          }
        }}
        className='h-7 w-12 border-none bg-transparent text-center text-sm focus-visible:ring-0'
      />
      <Button
        type='button'
        size='icon'
        variant='ghost'
        className='h-6 w-6 cursor-pointer'
        onClick={() => onChange(value + 1)}
      >
        <Plus className='h-3 w-3' />
      </Button>
    </div>
  )

  return (
    <Card className='border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900/60'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='text-xl font-semibold text-gray-900 dark:text-white'>
              {language === 'VN' ? 'Danh sách báo giá tạm' : 'Temporary quotation list'}
            </CardTitle>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              {language === 'VN'
                ? 'Sản phẩm và phụ kiện bạn đã chọn sẽ hiển thị tại đây.'
                : 'Products and accessories you selected will show up here.'}
            </p>
          </div>
          <div className='rounded-md border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 dark:border-gray-700 dark:text-gray-300'>
            {language === 'VN'
              ? `${totalMainItems} sản phẩm / ${totalAccessories} phụ kiện`
              : `${totalMainItems} products / ${totalAccessories} accessories`}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {items.length === 0 && (
          <div className='flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-gray-200 py-10 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400'>
            <p className='text-base font-medium text-gray-700 dark:text-gray-200'>
              {language === 'VN' ? 'Chưa có sản phẩm nào được thêm' : 'No product added yet'}
            </p>
            <p>
              {language === 'VN'
                ? 'Chọn sản phẩm ở bảng bên dưới để bắt đầu.'
                : 'Pick products from the list below to get started.'}
            </p>
          </div>
        )}

        {items.length > 0 && (
          <>
            {/* Grid Card View - Mobile & Tablet */}
            <div className='lg:hidden grid grid-cols-1 gap-4'>
              {items.map((item, index) =>
                (() => {
                  const productName =
                    language === 'VN'
                      ? item.product.product_name
                      : item.product.product_english_name || item.product.product_name
                  const categoryName = language === 'VN' ? item.category?.vn || '---' : item.category?.en || '---'

                  return (
                    <div
                      key={`${item.product.product_id}-${item.webMenuId}`}
                      className='bg-white dark:bg-gray-900/40 rounded-lg border border-gray-200 dark:border-gray-800 p-4 space-y-4'
                    >
                      {/* Main Product */}
                      <div className='space-y-3'>
                        <div className='flex items-start justify-between gap-3'>
                          <div className='flex-1 min-w-0'>
                            <div className='flex items-center gap-2 mb-1'>
                              <span className='text-xs font-semibold text-gray-500 dark:text-gray-400'>
                                #{index + 1}
                              </span>
                              <span className='text-xs font-medium text-gray-700 dark:text-gray-300'>
                                {categoryName}
                              </span>
                              {item.items && item.items.length > 0 && (
                                <Button
                                  type='button'
                                  variant='ghost'
                                  size='icon'
                                  className='h-5 w-5 cursor-pointer text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                                  onClick={() => toggleExpand(`${item.product.product_id}-${item.webMenuId}`)}
                                >
                                  {expandedItems[`${item.product.product_id}-${item.webMenuId}`] ? (
                                    <ChevronUp className='h-3 w-3' />
                                  ) : (
                                    <ChevronDown className='h-3 w-3' />
                                  )}
                                </Button>
                              )}
                            </div>
                            <h3 className='text-sm font-semibold text-gray-900 dark:text-white break-words'>
                              {productName}
                            </h3>
                            <p className='text-xs text-gray-500 dark:text-gray-400 mt-1 break-all'>
                              {item.product.product_id + ' / ' || '---'} {item.product.code || '---'}
                            </p>
                          </div>
                          <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            className='cursor-pointer text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 shrink-0'
                            onClick={() => onRemoveProduct(item.product.product_id, item.webMenuId)}
                          >
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </div>

                        <div className='flex items-center justify-between gap-2'>
                          <div className='text-xs text-gray-600 dark:text-gray-400'>
                            <span className='font-medium'>{language === 'VN' ? 'Đơn vị: ' : 'Unit: '}</span>
                            <span>
                              {language === 'VN' ? item.product.unit || '---' : item.product.unit_english || '---'}
                            </span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <span className='text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap'>
                              {language === 'VN' ? 'Số lượng:' : 'Quantity:'}
                            </span>
                            {renderQuantityControl(
                              typeof item.quantity === 'number' ? item.quantity : Number(item.quantity) || 1,
                              (quantity) => onUpdateProductQuantity(item.product.product_id, quantity, item.webMenuId),
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Accessories */}
                      {item.items && item.items.length > 0 && (
                        <div className='pt-3 border-t border-gray-200 dark:border-gray-700'>
                          {expandedItems[`${item.product.product_id}-${item.webMenuId}`] && (
                            <div className='mt-3 space-y-3'>
                              {item.items.map((accessoryItem) =>
                                (() => {
                                  const accessoryName =
                                    language === 'VN'
                                      ? accessoryItem.accessory.product_name
                                      : accessoryItem.accessory.product_english_name ||
                                        accessoryItem.accessory.product_name
                                  const accessoryCategoryName =
                                    language === 'VN' ? item.category?.vn || '---' : item.category?.en || '---'

                                  return (
                                    <div
                                      key={`${item.product.product_id}-${accessoryItem.accessory.product_id}`}
                                      className='bg-gray-50 dark:bg-gray-900/20 rounded-md p-3 space-y-2'
                                    >
                                      <div className='flex items-start justify-between gap-2'>
                                        <div className='flex-1 min-w-0'>
                                          <h5 className='text-xs font-medium text-gray-700 dark:text-gray-200 break-words'>
                                            {accessoryName}
                                          </h5>
                                          <p className='text-[10px] text-gray-500 dark:text-gray-400 mt-1'>
                                            {accessoryCategoryName}
                                          </p>
                                        </div>
                                        <Button
                                          type='button'
                                          variant='ghost'
                                          size='icon'
                                          className='cursor-pointer text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 h-6 w-6 shrink-0'
                                          onClick={() =>
                                            onRemoveAccessory(
                                              item.product.product_id,
                                              accessoryItem.accessory.product_id,
                                            )
                                          }
                                        >
                                          <Trash2 className='h-3 w-3' />
                                        </Button>
                                      </div>
                                      <div className='flex items-center justify-between gap-2'>
                                        <div className='text-[10px] text-gray-600 dark:text-gray-400'>
                                          <span className='font-medium'>
                                            {language === 'VN' ? 'Đơn vị: ' : 'Unit: '}
                                          </span>
                                          <span>
                                            {language === 'VN'
                                              ? accessoryItem.accessory.unit || '---'
                                              : accessoryItem.accessory.unit_english ||
                                                accessoryItem.accessory.unit ||
                                                '---'}
                                          </span>
                                        </div>
                                        <div className='flex items-center gap-1'>
                                          <span className='text-[10px] text-gray-600 dark:text-gray-400 whitespace-nowrap'>
                                            {language === 'VN' ? 'SL:' : 'Qty:'}
                                          </span>
                                          {renderQuantityControl(
                                            typeof accessoryItem.quantity === 'number'
                                              ? accessoryItem.quantity
                                              : Number(accessoryItem.quantity) || 1,
                                            (quantity) =>
                                              onUpdateAccessoryQuantity(
                                                item.product.product_id,
                                                accessoryItem.accessory.product_id,
                                                quantity,
                                                item.webMenuId,
                                              ),
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })(),
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })(),
              )}
            </div>

            {/* Table View - Desktop */}
            <div className='hidden lg:block overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800'>
              <Table>
                <TableHeader>
                  <TableRow className='bg-gray-50/50 dark:bg-gray-800/40'>
                    <TableHead className='w-14 text-center text-xs font-semibold uppercase tracking-wide text-gray-500'>
                      {language === 'VN' ? 'STT' : 'No.'}
                    </TableHead>
                    <TableHead className='min-w-[300px] lg:min-w-[350px] xl:min-w-[400px] text-xs font-semibold uppercase tracking-wide text-gray-500'>
                      <div className='flex flex-col gap-0.5'>
                        <span>{language === 'VN' ? 'Tên sản phẩm' : 'Product Name'}</span>
                        <span className='text-[11px] font-normal text-gray-400'>Model / Code</span>
                      </div>
                    </TableHead>
                    <TableHead className='w-24 text-center text-xs font-semibold uppercase tracking-wide text-gray-500'>
                      {language === 'VN' ? 'Đơn vị' : 'Unit'}
                    </TableHead>
                    <TableHead className='w-32 text-center text-xs font-semibold uppercase tracking-wide text-gray-500'>
                      {language === 'VN' ? 'Số lượng' : 'Quantity'}
                    </TableHead>

                    <TableHead className='w-20 text-right text-xs font-semibold uppercase tracking-wide text-gray-500'>
                      {language === 'VN' ? 'Xóa' : 'Remove'}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) =>
                    (() => {
                      const productName =
                        language === 'VN'
                          ? item.product.product_name
                          : item.product.product_english_name || item.product.product_name

                      return (
                        <Fragment key={`${item.product.product_id}-${item.webMenuId}`}>
                          <TableRow className='bg-white dark:bg-gray-900/40'>
                            <TableCell className='text-center font-semibold text-gray-600 dark:text-gray-300'>
                              {index + 1}
                            </TableCell>
                            <TableCell className='min-w-[300px] lg:min-w-[350px] xl:min-w-[400px]'>
                              <div className='space-y-1'>
                                <div className='flex items-center gap-2'>
                                  <p
                                    className='font-medium text-gray-900 dark:text-gray-50 whitespace-normal flex-1 min-w-0 break-words'
                                    title={productName}
                                  >
                                    {productName}
                                  </p>
                                  {item.items && item.items.length > 0 && (
                                    <Button
                                      type='button'
                                      variant='ghost'
                                      size='icon'
                                      className='h-6 w-6 cursor-pointer text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 shrink-0'
                                      onClick={() => toggleExpand(`${item.product.product_id}-${item.webMenuId}`)}
                                    >
                                      {expandedItems[`${item.product.product_id}-${item.webMenuId}`] ? (
                                        <ChevronUp className='h-4 w-4' />
                                      ) : (
                                        <ChevronDown className='h-4 w-4' />
                                      )}
                                    </Button>
                                  )}
                                </div>
                                <p className='text-xs text-gray-500 dark:text-gray-400 break-words'>
                                  {item.product.product_id + ' / ' || '---'} {item.product.code || '---'}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell className='text-center text-sm font-medium text-gray-700 dark:text-gray-200'>
                              {language === 'VN' ? item.product.unit || '---' : item.product.unit_english || '---'}
                            </TableCell>
                            <TableCell className='text-center'>
                              {renderQuantityControl(
                                typeof item.quantity === 'number' ? item.quantity : Number(item.quantity) || 1,
                                (quantity) =>
                                  onUpdateProductQuantity(item.product.product_id, quantity, item.webMenuId),
                              )}
                            </TableCell>
                            <TableCell className='text-right'>
                              <Button
                                type='button'
                                variant='ghost'
                                className='cursor-pointer text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30'
                                onClick={() => onRemoveProduct(item.product.product_id, item.webMenuId)}
                              >
                                <Trash2 className='h-4 w-4' />
                              </Button>
                            </TableCell>
                          </TableRow>

                          {expandedItems[`${item.product.product_id}-${item.webMenuId}`] &&
                            item.items?.map((accessoryItem) =>
                              (() => {
                                const accessoryName =
                                  language === 'VN'
                                    ? accessoryItem.accessory.product_name
                                    : accessoryItem.accessory.product_english_name ||
                                      accessoryItem.accessory.product_name

                                return (
                                  <TableRow
                                    key={`${item.product.product_id}-${accessoryItem.accessory.product_id}`}
                                    className='bg-gray-50/70 text-sm dark:bg-gray-900/20'
                                  >
                                    <TableCell />
                                    <TableCell className='min-w-[300px] lg:min-w-[350px] xl:min-w-[400px]'>
                                      <div className='flex flex-col gap-1'>
                                        <p className='text-gray-700 dark:text-gray-200 break-words'>{accessoryName}</p>
                                        <span className='text-xs uppercase text-blue-600 dark:text-blue-300'>
                                          {language === 'VN' ? 'Phụ kiện' : 'Accessory'}
                                        </span>
                                      </div>
                                    </TableCell>
                                    <TableCell className='text-center text-xs text-gray-600 dark:text-gray-300'>
                                      {language === 'VN'
                                        ? accessoryItem.accessory.unit
                                        : accessoryItem.accessory.unit_english || '---'}
                                    </TableCell>
                                    <TableCell className='text-center'>
                                      {renderQuantityControl(
                                        typeof accessoryItem.quantity === 'number'
                                          ? accessoryItem.quantity
                                          : Number(accessoryItem.quantity) || 1,
                                        (quantity) =>
                                          onUpdateAccessoryQuantity(
                                            item.product.product_id,
                                            accessoryItem.accessory.product_id,
                                            quantity,
                                            item.webMenuId,
                                          ),
                                      )}
                                    </TableCell>
                                    <TableCell className='text-right'>
                                      <Button
                                        type='button'
                                        variant='ghost'
                                        className='cursor-pointer text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30'
                                        onClick={() =>
                                          onRemoveAccessory(item.product.product_id, accessoryItem.accessory.product_id)
                                        }
                                      >
                                        <Trash2 className='h-4 w-4' />
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                )
                              })(),
                            )}
                        </Fragment>
                      )
                    })(),
                  )}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default OrderTable
