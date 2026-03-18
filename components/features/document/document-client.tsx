'use client'

import { useState, useEffect } from 'react'
import { IProduct, IProductFile } from '@/types'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CustomPagination from '@/components/custom/pagination/custom-pagination'
import { FileText } from 'lucide-react'
import FileProductService from '@/services/file-product.service'

interface FileProductData {
  data: IProductFile[]
  total: number
  pageCurrent: number
  totalPage: number
}

interface DocumentClientProps {
  locale: 'vi' | 'en'
  hero: {
    title: string
    subtitle: string
    description: string
  }
  note: {
    title: string
    description: string
  }
  files: IProductFile[]
}

export default function DocumentClient({ locale, hero, note, files: initialFiles }: DocumentClientProps) {
  const [files, setFiles] = useState<IProductFile[]>(initialFiles)
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedLocale, setSelectedLocale] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  // Fetch data when filters or pagination changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = (await FileProductService.getAllFileProductWeb({
          search: search,
          type: selectedType !== 'all' ? selectedType : '',
          locale: selectedLocale !== 'all' ? selectedLocale : '',
          limit: itemsPerPage,
          page: currentPage - 1, // API uses 0-based indexing
        })) as FileProductData

        if (response && response.data) {
          setFiles(response.data || [])
          setTotal(response.total || 0)
          setTotalPages(response.totalPage || 1)
        }
      } catch {
        setFiles([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [search, selectedType, currentPage, itemsPerPage, selectedLocale])

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'userManual':
        return locale === 'vi' ? 'Hướng dẫn sử dụng' : 'User Manual'
      case 'flyer':
        return locale === 'vi' ? 'Flyer' : 'Flyer'
      case 'ms-ds':
        return locale === 'vi' ? 'MSDS' : 'MSDS'
      case 'brochure':
        return locale === 'vi' ? 'Brochure' : 'Brochure'
      case 'catalogue':
        return locale === 'vi' ? 'Catalogue' : 'Catalogue'
      default:
        return locale === 'vi' ? 'Khác' : 'Other'
    }
  }
  const getNameProduct = (product: IProduct, language: 'vi' | 'en'): string => {
    if (!product) return ''

    const productName = language === 'vi' ? product.product_name : product.product_english_name || product.product_name

    if (product.code) {
      return `${product.code} | ${productName}`
    }

    return productName
  }
  return (
    <div className='w-full bg-white min-h-screen'>
      {/* Hero Section */}
      <div className='relative w-full h-[280px] sm:h-[250px] md:h-[300px] bg-linear-to-br from-blue-600 via-blue-700 to-sky-600'>
        <div className='relative h-full flex items-center justify-center px-4 sm:px-6'>
          <div className='text-center space-y-3 sm:space-y-4 max-w-4xl w-full'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white px-2'>{hero.title}</h1>
            <p className='text-base sm:text-lg md:text-xl text-white/90 font-medium px-2'>{hero.subtitle}</p>
            <p className='text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto px-2'>{hero.description}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
        {/* Header */}
        <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6'>
          {locale === 'vi' ? 'Thư viện tài liệu' : 'Document Library'}
        </h2>

        {/* Search and Filter Section */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6'>
          <div className='sm:col-span-2 lg:col-span-1'>
            <label className='block text-xs sm:text-sm font-medium text-gray-700 mb-1.5'>
              {locale === 'vi' ? 'Tìm kiếm' : 'Search'}
            </label>
            <Input
              type='text'
              placeholder={locale === 'vi' ? 'Tìm kiếm tài liệu...' : 'Search documents...'}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1) // Reset to first page on search
              }}
              className='w-full text-sm sm:text-base'
            />
          </div>
          <div>
            <label className='block text-xs sm:text-sm font-medium text-gray-700 mb-1.5'>
              {locale === 'vi' ? 'Danh mục' : 'Category'}
            </label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger
                className='w-full text-sm sm:text-base'
                aria-label={locale === 'vi' ? 'Chọn danh mục' : 'Select category'}
              >
                <SelectValue placeholder={locale === 'vi' ? 'Chọn' : 'Select'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>{locale === 'vi' ? 'Tất cả danh mục' : 'All Categories'}</SelectItem>
                <SelectItem value='other'>{locale === 'vi' ? 'Khác' : 'Other'}</SelectItem>
                <SelectItem value='brochure'>{locale === 'vi' ? 'Brochure' : 'Brochure'}</SelectItem>
                <SelectItem value='catalogue'>{locale === 'vi' ? 'Catalogue' : 'Catalogue'}</SelectItem>
                <SelectItem value='userManual'>{locale === 'vi' ? 'Hướng dẫn sử dụng' : 'User Manual'}</SelectItem>
                <SelectItem value='flyer'>{locale === 'vi' ? 'Flyer' : 'Flyer'}</SelectItem>
                <SelectItem value='ms-ds'>{locale === 'vi' ? 'MSDS' : 'MSDS'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className='block text-xs sm:text-sm font-medium text-gray-700 mb-1.5'>
              {locale === 'vi' ? 'Ngôn ngữ' : 'Language'}
            </label>
            <Select value={selectedLocale} onValueChange={setSelectedLocale}>
              <SelectTrigger
                className='w-full text-sm sm:text-base'
                aria-label={locale === 'vi' ? 'Chọn ngôn ngữ' : 'Select language'}
              >
                <SelectValue placeholder={locale === 'vi' ? 'Chọn' : 'Select'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>{locale === 'vi' ? 'Tất cả ngôn ngữ' : 'All Languages'}</SelectItem>
                <SelectItem value='vi'>{locale === 'vi' ? 'Tiếng Việt' : 'Vietnamese'}</SelectItem>
                <SelectItem value='en'>{locale === 'vi' ? 'Tiếng Anh' : 'English'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Document Table - Desktop */}
        <div className='hidden md:block border border-gray-200 rounded-lg overflow-hidden'>
          <Table className='table-fixed'>
            <TableHeader>
              <TableRow className='bg-gray-50'>
                <TableHead className='font-semibold text-gray-900 text-sm sm:text-base w-52'>
                  {locale === 'vi' ? 'Tiêu đề' : 'Title'}
                </TableHead>
                <TableHead className='font-semibold text-gray-900 text-sm sm:text-base w-72'>
                  {locale === 'vi' ? 'Sản phẩm' : 'Product'}
                </TableHead>
                <TableHead className='font-semibold text-gray-900 text-sm sm:text-base w-40'>
                  {locale === 'vi' ? 'Loại file' : 'File Type'}
                </TableHead>
                <TableHead className='font-semibold text-gray-900 text-sm sm:text-base w-28'>
                  {locale === 'vi' ? 'Ngôn ngữ' : 'Language'}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className='text-center py-8 text-gray-500 text-sm sm:text-base'>
                    {locale === 'vi' ? 'Đang tải...' : 'Loading...'}
                  </TableCell>
                </TableRow>
              ) : files.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className='text-center py-8 text-gray-500 text-sm sm:text-base'>
                    {locale === 'vi' ? 'Không tìm thấy tài liệu' : 'No documents found'}
                  </TableCell>
                </TableRow>
              ) : (
                files.map((file) => (
                  <TableRow key={file.product_file_id} className='hover:bg-gray-50'>
                    <TableCell className='text-sm sm:text-base whitespace-normal align-top min-w-0'>
                      <div className='flex items-center gap-3 min-w-0'>
                        <a
                          href={`/file/${file.slug}`}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='shrink-0 cursor-pointer'
                        >
                          <div className='shrink-0 w-8 h-8 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700 transition-colors'>
                            <FileText className='w-4 h-4 text-white' />
                          </div>
                        </a>
                        <span className='text-gray-900 break-words block min-w-0'>
                          {file.folderFileProduct?.folder_file_product_name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className='text-sm sm:text-base whitespace-normal align-top min-w-0'>
                      <span className='text-gray-900 break-words block'>
                        {getNameProduct(file.product as IProduct, locale)}
                      </span>
                    </TableCell>
                    <TableCell className='text-sm sm:text-base whitespace-normal align-top min-w-0'>
                      <span className='text-gray-900 break-words block'>{getTypeLabel(file.type)}</span>
                    </TableCell>
                    <TableCell className='text-sm sm:text-base'>
                      <span className='text-gray-900'>
                        {file.locale === 'vi'
                          ? locale === 'vi'
                            ? 'Tiếng Việt'
                            : 'Vietnamese'
                          : locale === 'vi'
                            ? 'Tiếng Anh'
                            : 'English'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Document Cards - Mobile & Tablet */}
        <div className='md:hidden space-y-3'>
          {loading ? (
            <div className='text-center py-12 text-gray-500 text-sm'>
              {locale === 'vi' ? 'Đang tải...' : 'Loading...'}
            </div>
          ) : files.length === 0 ? (
            <div className='text-center py-12 text-gray-500 text-sm'>
              {locale === 'vi' ? 'Không tìm thấy tài liệu' : 'No documents found'}
            </div>
          ) : (
            files.map((file) => (
              <div
                key={file.product_file_id}
                className='border border-gray-200 rounded-lg p-4 bg-white hover:border-blue-300 transition-colors'
              >
                <div className='flex items-start gap-3'>
                  <a
                    href={`/file/${file.slug}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='shrink-0 cursor-pointer'
                  >
                    <div className='w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors'>
                      <FileText className='w-5 h-5 text-white' />
                    </div>
                  </a>
                  <div className='flex-1 min-w-0'>
                    <h3 className='text-sm sm:text-base font-semibold text-gray-900 mb-2 line-clamp-2'>
                      {file.folderFileProduct?.folder_file_product_name}
                    </h3>
                    <div className='flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600'>
                      <div className='flex items-center gap-1.5'>
                        <span className='font-medium'>{locale === 'vi' ? 'Loại:' : 'Type:'}</span>
                        <span>{file.type && getTypeLabel(file.type)}</span>
                      </div>
                      <div className='flex items-center gap-1.5'>
                        <span className='font-medium'>{locale === 'vi' ? 'Ngôn ngữ:' : 'Language:'}</span>
                        <span>
                          {file.locale === 'vi'
                            ? locale === 'vi'
                              ? 'Tiếng Việt'
                              : 'Vietnamese'
                            : locale === 'vi'
                              ? 'Tiếng Anh'
                              : 'English'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Footer */}
        <div className='flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mt-4 sm:mt-6'>
          <div className='text-xs sm:text-sm text-gray-700 text-center sm:text-left w-full sm:w-auto'>
            {total} {locale === 'vi' ? 'tài liệu' : 'documents'}
          </div>
          <div className='w-full sm:w-auto flex justify-center'>
            <CustomPagination
              pageViewOptions='even'
              page={currentPage - 1}
              setPage={(page) => setCurrentPage(page + 1)}
              pageCurrent={currentPage}
              totalPages={totalPages}
              limit={itemsPerPage}
              setLimit={(limit) => {
                setItemsPerPage(limit)
                setCurrentPage(1)
              }}
            />
          </div>
          <div></div>
        </div>
      </div>

      {/* Note Section */}
      <div className='py-8 sm:py-10 md:py-12 bg-blue-50 mt-8 sm:mt-10 md:mt-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='bg-white border border-blue-200 rounded-lg p-4 sm:p-6'>
            <div className='flex items-start gap-3'>
              <FileText className='w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mt-0.5 sm:mt-1 shrink-0' />
              <div className='flex-1 min-w-0'>
                <h3 className='text-lg sm:text-xl font-bold text-gray-900 mb-2'>{note.title}</h3>
                <p className='text-xs sm:text-sm text-gray-700 leading-relaxed'>{note.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
