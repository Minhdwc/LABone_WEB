import { privacyPolicyEN } from '@/lib/privacy-policy'

export default function PrivacyPolicyPage() {
  const content = privacyPolicyEN

  return (
    <div className='w-full bg-white min-h-screen'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
        {/* Header */}
        <div className='mb-8 text-center'>
          <h1 className='text-3xl sm:text-4xl font-bold text-black mb-4'>{content.title}</h1>
        </div>

        {/* Section 1: Purpose and Scope */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-black mb-4'>{content.purposeAndScope.title}</h2>
          <p className='text-base text-black mb-4'>{content.purposeAndScope.intro}</p>
          <p className='text-base text-black mb-2'>{content.purposeAndScope.personalInfo.title}</p>
          <div className='space-y-2 mb-4'>
            {content.purposeAndScope.personalInfo.items.map((item, index) => (
              <div key={index} className='flex items-start gap-3'>
                <span className='text-[#004085] font-bold mt-1'>–</span>
                <p className='text-base text-black flex-1'>{item}</p>
              </div>
            ))}
          </div>
          <p className='text-base text-black mb-2'>{content.purposeAndScope.serviceInfo.title}</p>
          <div className='space-y-2'>
            {content.purposeAndScope.serviceInfo.items.map((item, index) => (
              <div key={index} className='flex items-start gap-3'>
                <span className='text-[#004085] font-bold mt-1'>–</span>
                <p className='text-base text-black flex-1'>{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Usage Scope */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-black mb-4'>{content.usageScope.title}</h2>
          <p className='text-base text-black mb-3'>{content.usageScope.intro}</p>
          <div className='space-y-2'>
            {content.usageScope.purposes.map((purpose, index) => (
              <div key={index} className='flex items-start gap-3'>
                <span className='text-[#004085] font-bold mt-1'>–</span>
                <p className='text-base text-black flex-1'>{purpose}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Retention Period */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-black mb-4'>{content.retentionPeriod.title}</h2>
          <p className='text-base text-black'>{content.retentionPeriod.description}</p>
        </div>

        {/* Section 4: Access Organizations */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-black mb-4'>{content.accessOrganizations.title}</h2>
          <p className='text-base text-black mb-3'>{content.accessOrganizations.intro}</p>
          <div className='space-y-2'>
            {content.accessOrganizations.organizations.map((org, index) => (
              <div key={index} className='flex items-start gap-3'>
                <span className='text-[#004085] font-bold mt-1'>–</span>
                <p className='text-base text-black flex-1'>{org}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Company Info */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-black mb-4'>{content.companyInfo.title}</h2>
          <p className='text-base text-black mb-1'>{content.companyInfo.companyName}</p>
          <p className='text-base text-black mb-1'>{content.companyInfo.address}</p>
          <p className='text-base text-black mb-1'>{content.companyInfo.phone}</p>
          <p className='text-base text-black mb-1'>{content.companyInfo.website}</p>
          <p className='text-base text-black'>{content.companyInfo.email}</p>
        </div>

        {/* Section 6: User Access Tools */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-black mb-4'>{content.userAccessTools.title}</h2>
          <p className='text-base text-black mb-3'>{content.userAccessTools.collectionMethod}</p>
          <p className='text-base text-black'>{content.userAccessTools.editRequest}</p>
        </div>

        {/* Section 7: Complaint Mechanism */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-black mb-4'>{content.complaintMechanism.title}</h2>
          <p className='text-base text-black mb-3'>{content.complaintMechanism.intro}</p>
          <p className='text-base text-black mb-3'>{content.complaintMechanism.commitment}</p>
          <div className='space-y-2 mb-4'>
            {content.complaintMechanism.usageCases.map((item, index) => (
              <div key={index} className='flex items-start gap-3'>
                <span className='text-[#004085] font-bold mt-1'>–</span>
                <p className='text-base text-black flex-1'>{item}</p>
              </div>
            ))}
          </div>
          <p className='text-base text-black'>{content.complaintMechanism.contactInfo}</p>
        </div>
      </div>
    </div>
  )
}
