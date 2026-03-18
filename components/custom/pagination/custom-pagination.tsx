import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination'
import ComboboxPageView from '@/components/custom/combobox/combobox-pageview'

interface CustomPaginationProps {
  page: number
  setPage: (page: number) => void
  pageCurrent: number
  totalPages: number
  limit: number
  setLimit: (limit: number) => void
  pageViewOptions?: string
  limitOptions?: boolean
  language?: string
}

const CustomPagination = ({
  page,
  setPage,
  pageCurrent,
  totalPages,
  limit,
  setLimit,
  pageViewOptions = 'odd',
  limitOptions = true,
  language = 'VN',
}: CustomPaginationProps) => {
  return (
    <Pagination className='flex flex-col lg:flex-row items-center justify-center gap-2'>
      <PaginationContent className='list-none'>
        <PaginationItem className='list-none'>
          <Button variant='outline' onClick={() => setPage(page - 1)} disabled={page === 0} className='cursor-pointer'>
            <ChevronLeft className='h-4 w-4' />
            <span className='sr-only'>Back</span>
          </Button>
        </PaginationItem>
        {/* First page */}
        {pageCurrent > 3 && (
          <>
            <PaginationItem className='list-none'>
              <Button
                variant={pageCurrent === 1 ? 'outline' : 'ghost'}
                size='icon'
                onClick={() => setPage(0)}
                className={`${pageCurrent === 1 ? 'bg-black text-white hover:bg-black hover:text-white' : ''} cursor-pointer`}
              >
                1
              </Button>
            </PaginationItem>
            {pageCurrent > 4 && (
              <PaginationItem className='list-none'>
                <span className='px-2'>...</span>
              </PaginationItem>
            )}
          </>
        )}

        {/* Main page numbers */}
        {Array.from({ length: 5 }, (_, i) => pageCurrent - 2 + i)
          .filter((p) => p > 0 && p <= totalPages)
          .map((p) => (
            <PaginationItem key={p} className='list-none'>
              <Button
                variant={p === pageCurrent ? 'outline' : 'ghost'}
                size='icon'
                onClick={() => setPage(p - 1)}
                className={`${p === pageCurrent ? 'bg-black text-white hover:bg-black hover:text-white' : ''} cursor-pointer`}
              >
                {p}
              </Button>
            </PaginationItem>
          ))}

        {/* Last page */}
        {pageCurrent < totalPages - 2 && (
          <>
            {pageCurrent < totalPages - 3 && (
              <PaginationItem className='list-none'>
                <span className='px-2'>...</span>
              </PaginationItem>
            )}
            <PaginationItem className='list-none'>
              <Button
                variant={pageCurrent === totalPages ? 'outline' : 'ghost'}
                size='icon'
                onClick={() => setPage(totalPages - 1)}
                className={`${pageCurrent === totalPages ? 'bg-black text-white hover:bg-black hover:text-white' : ''} cursor-pointer`}
              >
                {totalPages}
              </Button>
            </PaginationItem>
          </>
        )}

        <PaginationItem className='list-none'>
          <Button
            variant='outline'
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages - 1 || totalPages === 0}
            className='cursor-pointer'
          >
            <ChevronRight className='h-4 w-4' />
            <span className='sr-only'>Next</span>
          </Button>
        </PaginationItem>
      </PaginationContent>
      {limitOptions && (
        <div className='mx-2 flex items-center justify-center'>
          <p className='mr-2 text-sm font-semibold'>{language === 'VN' ? 'Chế độ xem: ' : 'View mode: '}</p>
          <ComboboxPageView
            pageViewOptions={pageViewOptions}
            setLimit={setLimit}
            setPage={setPage}
            defaultValue={limit}
            ariaLabel={language === 'VN' ? 'Số mục mỗi trang' : 'Items per page'}
          />
        </div>
      )}
    </Pagination>
  )
}

export default CustomPagination
