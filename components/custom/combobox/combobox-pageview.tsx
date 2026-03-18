import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const pageViewOptionsOdd = [
  { value: 9, label: '9 item' },
  { value: 45, label: '45 item' },
  { value: 90, label: '90 item' },
  { value: 900, label: '900 item' },
]
const pageViewOptionsEven = [
  { value: 10, label: '10 item' },
  { value: 20, label: '20 item' },
  { value: 50, label: '50 item' },
  { value: 100, label: '100 item' },
]

export default function ComboboxPageView({
  pageViewOptions = 'odd',
  defaultValue,
  setPage,
  setLimit,
  ariaLabel = 'Items per page',
}: {
  pageViewOptions?: string
  defaultValue?: number
  setPage: (value: number) => void
  setLimit: (value: number) => void
  ariaLabel?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(defaultValue || 10)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          aria-label={ariaLabel}
          className='w-[200px] justify-between cursor-pointer'
        >
          {pageViewOptions === 'odd'
            ? pageViewOptionsOdd.find((option) => option.value === value)?.label
            : pageViewOptionsEven.find((option) => option.value === value)?.label || '10 item'}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandGroup>
              {pageViewOptions === 'odd' &&
                pageViewOptionsOdd.map((option, index) => (
                  <CommandItem
                    key={index}
                    value={option.value.toString()}
                    onSelect={() => {
                      setValue(option.value)
                      setOpen(false)
                      setPage(0)
                      setLimit(option.value)
                    }}
                  >
                    {option.label}
                    <Check className={cn('ml-auto', value === option.value ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                ))}
              {pageViewOptions === 'even' &&
                pageViewOptionsEven.map((option, index) => (
                  <CommandItem
                    key={index}
                    value={option.value.toString()}
                    onSelect={() => {
                      setValue(option.value)
                      setOpen(false)
                      setPage(0)
                      setLimit(option.value)
                    }}
                  >
                    {option.label}
                    <Check className={cn('ml-auto', value === option.value ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
