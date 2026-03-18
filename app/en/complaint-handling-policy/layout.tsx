import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Complaint Handling Policy | LABone',
  description:
    'LABone Complaint Handling Policy - Process for receiving and resolving customer complaints. Commitment to quick and transparent resolution within 03 working days.',
  keywords: [
    'complaint handling policy',
    'customer complaint',
    'complaint resolution',
    'LABone complaint',
    'warranty procedure',
    'customer service',
  ],
  openGraph: {
    title: 'Complaint Handling Policy | LABone',
    description: 'LABone Complaint Handling Policy - Process for receiving and resolving customer complaints.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/en/complaint-handling-policy`,
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/en/complaint-handling-policy`,
    languages: {
      'vi-VN': `${process.env.NEXT_PUBLIC_SITE_URL}/vi/chinh-sach-xu-ly-kieu-nai`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/complaint-handling-policy`,
    },
  },
}

export default function ComplaintHandlingPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
