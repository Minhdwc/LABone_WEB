'use client'
import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from 'lucide-react'
import Image from 'next/image'
import Logo from '@/public/Logo-LABone-png.png'
import { useLanguageStore } from '../../store/language'
import { footerContentVN, footerContentEN } from '../../lib/containts'
import { Separator } from '../ui/separator'

const Footer = () => {
  const { language } = useLanguageStore()
  const content = language === 'VN' ? footerContentVN : footerContentEN

  return (
    <footer className='bg-[#0056b3] text-white'>
      {/* Main Footer Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 md:gap-8'>
          {/* Contact Information */}
          <div className='space-y-3 sm:space-y-4'>
            <h3 className='font-semibold text-base sm:text-lg uppercase'>{content.contact.title}</h3>
            <div className='space-y-4'>
              {/* Vietnam Contact */}
              <div className='space-y-2'>
                <p className='text-sm sm:text-base font-semibold pb-1'>
                  {language === 'VN' ? 'LABone tại Việt Nam:' : 'LABone in Vietnam:'}
                </p>
                <div className='space-y-2 list-none'>
                  <div className='flex items-start space-x-2 sm:space-x-3'>
                    <MapPin size={14} className='mt-0.5 sm:mt-1 shrink-0 sm:w-4 sm:h-4' />
                    <Link
                      href={`https://maps.google.com/?q=${encodeURIComponent(footerContentVN.contact.address)}`}
                      target='_blank'
                      className='text-xs sm:text-sm hover:underline wrap-break-word'
                    >
                      {footerContentVN.contact.address}
                    </Link>
                  </div>
                  <div className='flex items-center space-x-2 sm:space-x-3'>
                    <Phone size={14} className='shrink-0 sm:w-4 sm:h-4' />
                    <Link
                      href={`tel:${footerContentVN.contact.phone.replace(/\s/g, '')}`}
                      className='text-xs sm:text-sm hover:underline'
                    >
                      {footerContentVN.contact.phone}
                    </Link>
                  </div>
                  <div className='flex items-center space-x-2 sm:space-x-3'>
                    <Mail size={14} className='shrink-0 sm:w-4 sm:h-4' />
                    <Link
                      href={`mailto:${footerContentVN.contact.email}`}
                      className='text-xs sm:text-sm hover:underline break-all'
                    >
                      {footerContentVN.contact.email}
                    </Link>
                  </div>
                </div>
              </div>
              <Separator className='my-2' />
              {/* USA Contact */}
              <div className='space-y-2'>
                <p className='text-sm sm:text-base font-semibold'>
                  {language === 'VN' ? 'LABone tại USA:' : 'LABone in USA:'}
                </p>
                <div className='space-y-2 list-none'>
                  <div className='flex items-start space-x-2 sm:space-x-3'>
                    <MapPin size={14} className='mt-0.5 sm:mt-1 shrink-0 sm:w-4 sm:h-4' />
                    <Link
                      href={`https://maps.google.com/?q=${encodeURIComponent(footerContentEN.contact.address)}`}
                      target='_blank'
                      className='text-xs sm:text-sm hover:underline wrap-break-word'
                    >
                      {footerContentEN.contact.address}
                    </Link>
                  </div>
                  <div className='flex items-center space-x-2 sm:space-x-3'>
                    <Phone size={14} className='shrink-0 sm:w-4 sm:h-4' />
                    <Link
                      href={`tel:${footerContentEN.contact.phone.replace(/\s/g, '')}`}
                      className='text-xs sm:text-sm hover:underline'
                    >
                      {footerContentEN.contact.phone}
                    </Link>
                  </div>
                  <div className='flex items-center space-x-2 sm:space-x-3'>
                    <Mail size={14} className='shrink-0 sm:w-4 sm:h-4' />
                    <Link
                      href={`mailto:${footerContentEN.contact.email}`}
                      className='text-xs sm:text-sm hover:underline break-all'
                    >
                      {footerContentEN.contact.email}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className='space-y-3 sm:space-y-4'>
            <h3 className='font-semibold text-base sm:text-lg uppercase'>{content.links.title}</h3>
            <ul className='space-y-1.5 sm:space-y-2 list-none'>
              {content.links.items.map((item, index) => (
                <li key={index} className='list-none'>
                  <Link href={item.href} className='text-xs sm:text-sm hover:underline'>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies Section */}
          <div className='space-y-3 sm:space-y-4'>
            <h3 className='font-semibold text-base sm:text-lg uppercase'>{content.policies.title}</h3>
            <ul className='space-y-1.5 sm:space-y-2 list-none'>
              {content.policies.items.map((item, index) => (
                <li key={index} className='list-none'>
                  <Link href={item.href} className='text-xs sm:text-sm hover:underline'>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Logo and Description */}
          <div className='space-y-3 sm:space-y-4'>
            {/* Logo */}
            <div className='bg-white rounded-lg p-3 sm:p-4 w-fit'>
              <div className='flex items-center space-x-2'>
                <Image className='w-20 sm:w-24 md:w-28' src={Logo} alt='LABone.vn' />
              </div>
            </div>

            {/* Description */}
            <p className='text-xs sm:text-sm leading-relaxed'>{content.description}</p>

            {/* Social Media Icons */}
            <div className='flex space-x-2 sm:space-x-3'>
              <div className='w-7 h-7 sm:w-8 sm:h-8 border border-white rounded-lg flex items-center justify-center hover:bg-white hover:text-[#0056b3] transition-colors cursor-pointer'>
                <Facebook size={14} className='sm:w-4 sm:h-4' />
              </div>
              <div className='w-7 h-7 sm:w-8 sm:h-8 border border-white rounded-lg flex items-center justify-center hover:bg-white hover:text-[#0056b3] transition-colors cursor-pointer'>
                <Twitter size={14} className='sm:w-4 sm:h-4' />
              </div>
              <div className='w-7 h-7 sm:w-8 sm:h-8 border border-white rounded-lg flex items-center justify-center hover:bg-white hover:text-[#0056b3] transition-colors cursor-pointer'>
                <Linkedin size={14} className='sm:w-4 sm:h-4' />
              </div>
              <div className='w-7 h-7 sm:w-8 sm:h-8 border border-white rounded-lg flex items-center justify-center hover:bg-white hover:text-[#0056b3] transition-colors cursor-pointer'>
                <Instagram size={14} className='sm:w-4 sm:h-4' />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className='border-t border-gray-300'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 md:py-5 lg:py-6'>
          <div className='text-center space-y-2 sm:space-y-3'>
            <p className='text-[10px] xs:text-xs sm:text-sm'>{content.copyright}</p>
            <div className='flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-4 text-[10px] xs:text-xs sm:text-sm'>
              {content.bottomLinks.map((link, index) => (
                <div key={index} className='flex items-center'>
                  {index > 0 && <span className='mr-1.5 sm:mr-2 md:mr-4'>|</span>}
                  <Link href={link.href} className='hover:underline'>
                    {link.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
