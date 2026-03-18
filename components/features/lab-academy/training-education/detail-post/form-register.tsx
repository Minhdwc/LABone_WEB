'use client'

import { useState } from 'react'
import { UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useLanguageStore } from '@/store/language'
import { Separator } from '@/components/ui/separator'
import WebLabAcademyPostApplyService from '@/services/web-lab-academy-post-apply.service'

interface LabAcademyPostRegisterFormProps {
  webAcademyId: string
  isFull: boolean
  onSuccess?: () => void
}

export default function LabAcademyPostRegisterForm({
  webAcademyId,
  isFull,
  onSuccess,
}: LabAcademyPostRegisterFormProps) {
  const { language } = useLanguageStore()
  const isVN = language === 'VN'
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = z.object({
    full_name: z.string().min(1, {
      message: isVN ? 'Họ tên không được để trống' : 'Full name is required',
    }),
    email: z
      .string()
      .min(1, {
        message: isVN ? 'Email không được để trống' : 'Email is required',
      })
      .email({
        message: isVN ? 'Email không hợp lệ' : 'Invalid email format',
      }),
    phone: z.string().min(1, {
      message: isVN ? 'Số điện thoại không được để trống' : 'Phone number is required',
    }),
    year_of_birth: z
      .string()
      .min(1, {
        message: isVN ? 'Năm sinh không được để trống' : 'Year of birth is required',
      })
      .refine(
        (val) => {
          const year = parseInt(val)
          const currentYear = new Date().getFullYear()
          return year >= 1900 && year <= currentYear
        },
        {
          message: isVN ? 'Năm sinh không hợp lệ' : 'Year of birth must be between 1900 and current year',
        },
      ),
  })

  type FormValues = z.infer<typeof formSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      email: '',
      phone: '',
      year_of_birth: '',
    },
  })

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true)
    try {
      const result = await WebLabAcademyPostApplyService.createWebLabAcademyPostApply({
        web_academy_id: webAcademyId,
        full_name: values.full_name,
        email: values.email,
        phone: values.phone,
        year_of_birth: parseInt(values.year_of_birth),
      })

      if (result) {
        toast.success(
          isVN
            ? 'Đăng ký thành công! Cảm ơn bạn đã quan tâm.'
            : 'Registration successful! Thank you for your interest.',
          {
            duration: 2000,
            className: '!bg-green-500 !text-white !border-0',
            position: 'top-right',
          },
        )
        form.reset()
        onSuccess?.()
      }
    } catch (error: any) {
      // Lấy message từ error (có thể từ backend hoặc generic message)
      const errorMessage = error?.message || error?.data?.message
      toast.error(errorMessage, {
        duration: 4000,
        className: '!bg-red-500 !text-white !border-0',
        position: 'top-right',
        description: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='border rounded-lg p-6 bg-gray-50'>
      <div className='mb-6'>
        <h2 className='text-xl font-bold text-gray-900 mb-2'>{isVN ? 'Đăng ký tham gia' : 'Register'}</h2>
        <p className='text-sm text-gray-600'>
          {isVN
            ? 'Vui lòng điền thông tin bên dưới để đăng ký tham gia'
            : 'Please fill in the information below to register'}
        </p>
      </div>
      <Separator className='mb-6' />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='full_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-medium text-red-500'>{isVN ? 'Họ tên*' : 'Full Name*'}</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder={isVN ? 'Nhập họ tên' : 'Enter full name'}
                    className='h-10'
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-medium text-red-500'>Email*</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder={isVN ? 'Nhập email' : 'Enter email'}
                    className='h-10'
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-medium text-red-500'>{isVN ? 'Số điện thoại*' : 'Phone Number*'}</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder={isVN ? 'Nhập số điện thoại' : 'Enter phone number'}
                    className='h-10'
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='year_of_birth'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-medium text-red-500'>{isVN ? 'Năm sinh*' : 'Year of Birth*'}</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder={isVN ? 'Nhập năm sinh' : 'Enter year of birth'}
                    className='h-10'
                    disabled={isLoading}
                    min='1900'
                    max={new Date().getFullYear()}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white'
            disabled={isLoading || isFull}
          >
            {isLoading ? (
              <div className='flex items-center gap-2'>
                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                {isVN ? 'Đang xử lý...' : 'Processing...'}
              </div>
            ) : (
              <div className='flex items-center gap-2'>
                <UserPlus className='w-4 h-4' />
                {isVN ? 'Đăng ký' : 'Register'}
              </div>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
