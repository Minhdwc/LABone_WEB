'use client'

import { useLanguageStore } from '@/store/language'
import Image from 'next/image'
import { MapPin, Globe, Building2, Phone, Mail } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { contactInfoVN, contactInfoEN, contactFormVN, contactFormEN } from '@/lib/containts'
import { companyInfo } from '@/lib/company-contants'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useState } from 'react'

type FormValues = {
  name: string
  email: string
  phone: string
  content: string
}

// List of regions with English labels
const tabRegions = [
  { value: 'Asia', label: 'Asia' },
  { value: 'Europe', label: 'Europe' },
  { value: 'North America', label: 'North America' },
  { value: 'South America', label: 'South America' },
  { value: 'Middle East', label: 'Middle East' },
  { value: 'Africa', label: 'Africa' },
  { value: 'Oceania', label: 'Oceania' },
  { value: 'Other', label: 'Other' },
]

export default function ContactPage() {
  const { language } = useLanguageStore()
  const content = language === 'VN' ? contactInfoVN : contactInfoEN
  const formContent = language === 'VN' ? contactFormVN : contactFormEN
  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      content: '',
    },
  })

  // State to manage selected region
  const [selectedRegion, setSelectedRegion] = useState<string>('Asia')

  const mapAddress = encodeURIComponent(language === 'VN' ? content.address.fullAddress : content.address.value)
  const mapIframeUrl = `https://www.google.com/maps?q=${mapAddress}&output=embed`
  const mapDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapAddress}`
  const mapViewUrl = `https://www.google.com/maps/search/?api=1&query=${mapAddress}`

  // Filter distributors by selected region
  const filteredDistributors = companyInfo.internationalDistribution.list.filter(
    (distributor) => distributor.region === selectedRegion,
  )

  const onSubmit = () => {
    form.reset()
  }

  return (
    <div className='min-h-screen bg-zinc-50'>
      {/* Hero Section */}
      <div className='w-full bg-[#004085] text-white py-8 relative overflow-hidden'>
        <div className='absolute inset-0 opacity-10 pointer-events-none'>
          <Globe className='absolute -right-20 -bottom-20 w-96 h-96 text-white' />
        </div>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center'>
          <h1 className='text-4xl lg:text-6xl font-extrabold mb-6 tracking-tight uppercase'>{content.title}</h1>
          <p className='text-lg lg:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed'>
            {language === 'VN'
              ? 'LABone luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của quý khách hàng.'
              : 'LABone is always ready to listen and answer all your questions.'}
          </p>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-5 relative z-20'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
          {/* Left Column: Company Image & Form */}
          <div className='lg:col-span-7 space-y-8'>
            {/* Company Image */}
            <Card className='bg-white shadow-lg border-none rounded-2xl overflow-hidden'>
              <div className='relative w-full h-72 sm:h-80 lg:h-96 bg-gray-100'>
                <Image
                  src={content.companyImage}
                  alt={language === 'VN' ? 'Tòa nhà công ty LABone' : 'LABone Company Building'}
                  fill
                  className='object-cover'
                  priority
                />
              </div>
            </Card>

            {/* Contact Form */}
            <Card className='bg-white shadow-lg border-none rounded-2xl'>
              <div className='p-8 sm:p-10'>
                <div className='mb-8'>
                  <h2 className='text-2xl font-bold text-gray-900 uppercase tracking-tight'>{formContent.title}</h2>
                  <div className='h-1.5 w-20 bg-blue-600 mt-3 rounded-full'></div>
                  <p className='text-gray-600 mt-6 leading-relaxed'>{formContent.description}</p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <FormField
                        control={form.control}
                        name='name'
                        rules={{ required: true }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-gray-700 font-semibold'>{formContent.form.name.label}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={formContent.form.name.placeholder}
                                className='h-12 rounded-lg'
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
                        rules={{ required: true }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-gray-700 font-semibold'>
                              {formContent.form.email.label}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type='email'
                                placeholder={formContent.form.email.placeholder}
                                className='h-12 rounded-lg'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name='phone'
                      rules={{ required: true }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-gray-700 font-semibold'>{formContent.form.phone.label}</FormLabel>
                          <FormControl>
                            <Input
                              type='tel'
                              placeholder={formContent.form.phone.placeholder}
                              className='h-12 rounded-lg'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='content'
                      rules={{ required: true }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-gray-700 font-semibold'>
                            {formContent.form.content.label}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={formContent.form.content.placeholder}
                              rows={5}
                              className='resize-none rounded-lg'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type='submit'
                      className='w-full bg-[#004085] hover:bg-blue-800 text-white font-bold py-4 rounded-lg text-lg'
                    >
                      {formContent.form.submitButton}
                    </Button>
                  </form>
                </Form>
              </div>
            </Card>
          </div>

          {/* Right Column: Office Info & Map */}
          <div className='lg:col-span-5 space-y-8'>
            {/* Contact Information */}
            <Card className='bg-white shadow-lg border-none rounded-2xl'>
              <div className='p-6 sm:p-8 space-y-8'>
                <div className='mb-8'>
                  <h2 className='text-2xl font-bold text-gray-900 uppercase tracking-tight'>
                    LABone Scientific Equipment Co.Ltd.
                  </h2>
                  <div className='h-1.5 w-20 bg-blue-600 mt-3 rounded-full'></div>
                </div>
                {/* Vietnam Office */}
                <div>
                  <div className='flex items-center gap-3 mb-6'>
                    <div className='p-2.5 bg-blue-50 rounded-xl text-blue-600'>
                      <MapPin className='h-6 w-6' />
                    </div>
                    <h3 className='text-xl font-bold text-gray-900 uppercase'>
                      {language === 'VN' ? 'LABone tại Việt Nam' : 'LABone in Vietnam'}
                    </h3>
                  </div>

                  <div className='space-y-4 text-sm'>
                    <div>
                      <p className='font-bold text-gray-700 mb-1'>{contactInfoVN.address.label}:</p>
                      <p className='text-gray-600'>
                        {language === 'VN'
                          ? content.address.value
                          : '228/13/3 Nguyen Thi Lang, Tan Phu Trung, Cu Chi, Ho Chi Minh City, Vietnam'}
                      </p>
                    </div>
                    <div>
                      <p className='font-bold text-gray-700 mb-1'>{contactInfoVN.phone.label}:</p>
                      <a
                        href={`tel:${contactInfoVN.phone.value.replace(/\s/g, '')}`}
                        className='text-blue-600 hover:underline font-medium'
                      >
                        {contactInfoVN.phone.value}
                      </a>
                    </div>
                    <div>
                      <p className='font-bold text-gray-700 mb-1'>{contactInfoVN.email.label}:</p>
                      <a
                        href={`mailto:${contactInfoVN.email.value}`}
                        className='text-blue-600 hover:underline font-medium break-all'
                      >
                        {contactInfoVN.email.value}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className='border-t border-gray-200'></div>

                {/* US Office */}
                <div>
                  <div className='flex items-center gap-3 mb-6'>
                    <div className='p-2.5 bg-zinc-100 rounded-xl text-zinc-600'>
                      <MapPin className='h-6 w-6' />
                    </div>
                    <h3 className='text-xl font-bold text-gray-900 uppercase'>
                      {language === 'VN' ? 'LABone tại Hoa Kỳ' : 'LABone in USA'}
                    </h3>
                  </div>

                  <div className='space-y-4 text-sm'>
                    <div>
                      <p className='font-bold text-gray-700 mb-1'>{contactInfoEN.address.label}:</p>
                      <p className='text-gray-600'>{contactInfoEN.address.value}</p>
                    </div>
                    <div>
                      <p className='font-bold text-gray-700 mb-1'>{contactInfoEN.phone.label}:</p>
                      <a
                        href={`tel:${contactInfoEN.phone.value.replace(/\s/g, '')}`}
                        className='text-blue-600 hover:underline font-medium'
                      >
                        {contactInfoEN.phone.value}
                      </a>
                    </div>
                    <div>
                      <p className='font-bold text-gray-700 mb-1'>{contactInfoEN.email.label}:</p>
                      <a
                        href={`mailto:${contactInfoEN.email.value}`}
                        className='text-blue-600 hover:underline font-medium break-all'
                      >
                        {contactInfoEN.email.value}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Google Map */}
            <Card className='bg-white shadow-lg border-none rounded-2xl overflow-hidden'>
              <div className='relative w-full h-[220px] sm:h-[280px] lg:h-[320px]'>
                <iframe
                  src={mapIframeUrl}
                  width='100%'
                  height='100%'
                  style={{ border: 0 }}
                  allowFullScreen
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                  className='w-full h-full'
                  title={content.companyName}
                />
              </div>
              <div className='p-4 bg-white border-t border-gray-100'>
                <div className='flex justify-center gap-8 text-sm font-medium'>
                  <a
                    href={mapDirectionsUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 hover:text-blue-800 flex items-center gap-2'
                  >
                    <MapPin className='w-4 h-4' />
                    {language === 'VN' ? 'Chỉ đường' : 'Directions'}
                  </a>
                  <a
                    href={mapViewUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 hover:text-blue-800 flex items-center gap-2'
                  >
                    <Globe className='w-4 h-4' />
                    {language === 'VN' ? 'Xem bản đồ' : 'View map'}
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* International Distributors Section */}
      </div>
      <div className='mt-20 p-8 bg-linear-to-b from-blue-50 to-blue-100/30'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-12'>
            <div className='flex items-center justify-center gap-3 mb-4'>
              <Building2 className='w-8 h-8 text-blue-600' />
              <h2 className='text-3xl lg:text-4xl font-bold text-gray-900 uppercase'>
                {language === 'VN'
                  ? companyInfo.internationalDistribution.title.vi
                  : companyInfo.internationalDistribution.title.en}
              </h2>
            </div>
            <div className='h-1.5 w-24 bg-blue-600 mx-auto rounded-full mb-6'></div>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              {language === 'VN'
                ? companyInfo.internationalDistribution.description.vi
                : companyInfo.internationalDistribution.description.en}
            </p>
          </div>

          {/* Region Tabs */}
          <div className='mb-8'>
            <div className='flex flex-wrap justify-center gap-3'>
              {tabRegions.map((region) => (
                <button
                  key={region.value}
                  onClick={() => setSelectedRegion(region.value)}
                  className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                    selectedRegion === region.value
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                  }`}
                >
                  {region.label}
                </button>
              ))}
            </div>
          </div>

          {/* Distributors Grid */}
          {filteredDistributors.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {filteredDistributors.map((distributor, index) => {
                const hasFullContact =
                  distributor.address || distributor.phone || distributor.email || distributor.website
                return (
                  <Card
                    key={distributor.country ? `${distributor.country}-${index}` : `${distributor.name}-${index}`}
                    className='bg-white hover:shadow-xl transition-all duration-300 border-none rounded-xl overflow-hidden group'
                  >
                    <div className='p-6 space-y-4'>
                      {/* Logo */}
                      <div className='relative w-full h-24 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-gray-100 transition-colors'>
                        <div className='relative w-full h-full p-4'>
                          <Image
                            src={distributor.logo}
                            alt={distributor.name}
                            fill
                            className='object-contain'
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                          />
                        </div>
                      </div>

                      {/* Name */}
                      <h4 className='font-bold text-gray-900 text-sm line-clamp-2 min-h-10'>{distributor.name}</h4>

                      {/* Country (simple card) */}
                      {distributor.country && (
                        <div className='flex items-center gap-2 text-sm text-gray-600'>
                          <MapPin className='w-4 h-4 text-blue-600 shrink-0' />
                          <span className='font-medium'>{distributor.country}</span>
                        </div>
                      )}

                      {/* Full contact (address, phone, email, website) */}
                      {hasFullContact && (
                        <div className='space-y-2 pt-2 border-t border-gray-100'>
                          {distributor.address && (
                            <div className='flex items-start gap-2 text-sm text-gray-600'>
                              <MapPin className='w-4 h-4 text-blue-600 shrink-0 mt-0.5' />
                              <span>{distributor.address}</span>
                            </div>
                          )}
                          {distributor.phone && (
                            <div className='flex items-center gap-2 text-sm'>
                              <Phone className='w-4 h-4 text-blue-600 shrink-0' />
                              <a
                                href={`tel:${distributor.phone.replace(/\s/g, '')}`}
                                className='text-blue-600 hover:text-blue-800 font-medium'
                              >
                                {distributor.phone}
                              </a>
                            </div>
                          )}
                          {distributor.email && (
                            <div className='flex items-center gap-2 text-sm'>
                              <Mail className='w-4 h-4 text-blue-600 shrink-0' />
                              <a
                                href={`mailto:${distributor.email}`}
                                className='text-blue-600 hover:text-blue-800 font-medium'
                              >
                                {distributor.email}
                              </a>
                            </div>
                          )}
                          {distributor.website && (
                            <div className='flex items-center gap-2 text-sm'>
                              <Globe className='w-4 h-4 text-blue-600 shrink-0' />
                              <a
                                href={distributor.website}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-blue-600 hover:text-blue-800 font-medium truncate'
                              >
                                {distributor.website.replace(/^https?:\/\//, '')}
                              </a>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className='bg-white border-none rounded-xl shadow-lg'>
              <div className='p-12 text-center space-y-4'>
                <div className='flex justify-center mb-4'>
                  <div className='p-4 bg-gray-100 rounded-full'>
                    <Building2 className='w-12 h-12 text-gray-400' />
                  </div>
                </div>
                <h3 className='text-xl font-bold text-gray-900'>
                  {language === 'VN' ? 'Chưa có nhà phân phối tại khu vực này' : 'No distributors in this region yet'}
                </h3>
                <p className='text-gray-600 max-w-md mx-auto'>
                  {language === 'VN'
                    ? 'Chúng tôi chưa có nhà phân phối tại vị trí này. Vui lòng tham khảo các vị trí gần hơn hoặc liên hệ trực tiếp với chúng tôi.'
                    : 'We do not have distributors in this location yet. Please refer to nearby locations or contact us directly.'}
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
