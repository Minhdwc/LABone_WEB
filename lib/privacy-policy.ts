import { companyInfo } from './company-contants'

export interface PrivacyPolicyContent {
  title: string
  purposeAndScope: {
    title: string
    intro: string
    personalInfo: {
      title: string
      items: string[]
    }
    serviceInfo: {
      title: string
      items: string[]
    }
  }
  usageScope: {
    title: string
    intro: string
    purposes: string[]
  }
  retentionPeriod: {
    title: string
    description: string
  }
  accessOrganizations: {
    title: string
    intro: string
    organizations: string[]
  }
  companyInfo: {
    title: string
    companyName: string
    address: string
    phone: string
    website: string
    email: string
  }
  userAccessTools: {
    title: string
    collectionMethod: string
    contactInfo: string
    editRequest: string
  }
  complaintMechanism: {
    title: string
    intro: string
    commitment: string
    usageCases: string[]
    contactInfo: string
  }
}

export const privacyPolicyVN: PrivacyPolicyContent = {
  title: 'Chính sách bảo mật thông tin',
  purposeAndScope: {
    title: '1. Mục đích và phạm vi thu thập thông tin',
    intro:
      'LABone không bán, chia sẻ hay trao đổi thông tin cá nhân của khách hàng thu thập trên trang web cho một bên thứ ba nào khác. Thông tin cá nhân thu thập được sẽ chỉ được sử dụng trong nội bộ công ty.',
    personalInfo: {
      title: 'Khi bạn liên hệ đăng ký dịch vụ, thông tin cá nhân mà LABone thu thập bao gồm:',
      items: ['Họ và tên', 'Địa chỉ', 'Điện thoại', 'Email'],
    },
    serviceInfo: {
      title: 'Ngoài thông tin cá nhân là các thông tin về dịch vụ',
      items: ['Tên sản phẩm', 'Số lượng', 'Thời gian giao nhận sản phẩm'],
    },
  },
  usageScope: {
    title: '2. Phạm vi sử dụng thông tin',
    intro:
      'Thông tin cá nhân thu thập được sẽ chỉ được LABone sử dụng trong nội bộ công ty và cho một hoặc tất cả các mục đích sau đây:',
    purposes: [
      'Hỗ trợ khách hàng',
      'Cung cấp thông tin liên quan đến dịch vụ',
      'Xử lý đơn đặt hàng và cung cấp dịch vụ và thông tin qua trang web của chúng tôi theo yêu cầu của bạn',
      'Chúng tôi có thể sẽ gửi thông tin sản phẩm, dịch vụ mới, thông tin về các sự kiện sắp tới hoặc thông tin tuyển dụng nếu quý khách đăng kí nhận email thông báo.',
      'Ngoài ra, chúng tôi sẽ sử dụng thông tin bạn cung cấp để hỗ trợ quản lý tài khoản khách hàng; xác nhận và thực hiện các giao dịch tài chính liên quan đến các khoản thanh toán trực tuyến của bạn;',
    ],
  },
  retentionPeriod: {
    title: '3. Thời gian lưu trữ thông tin',
    description: `Đối với thông tin cá nhân, LABone chỉ xóa đi dữ liệu này nếu khách hàng có yêu cầu, khách hàng yêu cầu gửi mail về ${companyInfo.email.vi}`,
  },
  accessOrganizations: {
    title: '4. Những người hoặc tổ chức có thể được tiếp cận với thông tin cá nhân',
    intro: 'Đối tượng được tiếp cận với thông tin cá nhân của khách hàng thuộc một trong những trường hợp sau:',
    organizations: [
      companyInfo.name.vi.toUpperCase(),
      `Các đối tác có ký hợp đồng thực hiện 1 phần dịch vụ do ${companyInfo.name.vi.toUpperCase()}. Các đối tác này sẽ nhận được những thông tin theo thỏa thuận hợp đồng (có thể 1 phần hoặc toàn bộ thông tin tùy theo điều khoản hợp đồng) để tiến hành hỗ trợ người dùng sử dụng dịch vụ do Công ty cung cấp.`,
    ],
  },
  companyInfo: {
    title: '5. Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân',
    companyName: companyInfo.name.vi,
    address: `Địa chỉ: ${companyInfo.address.vi.name}`,
    phone: `Điện thoại: ${companyInfo.phone.vi}`,
    website: 'Website: Labone.com.vn',
    email: `Email: ${companyInfo.email.vi}`,
  },
  userAccessTools: {
    title: '6. Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá nhân của mình',
    collectionMethod: `LABone không thu thập thông tin khách hàng qua trang web, thông tin cá nhân khách hàng được thực hiện thu thập qua email liên hệ đặt mua sản phẩm, dịch vụ gửi về hộp mail của chúng tôi: ${companyInfo.email.vi} hoặc số điện thoại liên hệ đặt mua sản phẩm gọi về ${companyInfo.phone.vi}`,
    contactInfo: '',
    editRequest:
      'Bạn có thể liên hệ địa chỉ email cùng số điện thoại trên để yêu cầu LABone chỉnh sửa dữ liệu cá nhân của mình.',
  },
  complaintMechanism: {
    title:
      '7. Cơ chế tiếp nhận và giải quyết khiếu nại của người tiêu dùng liên quan đến việc thông tin cá nhân bị sử dụng sai mục đích hoặc phạm vi đã thông báo.',
    intro:
      'Tại LABone, việc bảo vệ thông tin cá nhân của bạn là rất quan trọng, bạn được đảm bảo rằng thông tin cung cấp cho chúng tôi sẽ được bảo mật.',
    commitment:
      'LABone cam kết không chia sẻ, bán hoặc cho thuê thông tin cá nhân của bạn cho bất kỳ người nào khác. LABone cam kết chỉ sử dụng các thông tin của bạn vào các trường hợp sau:',
    usageCases: [
      'Nâng cao chất lượng dịch vụ dành cho khách hàng',
      'Giải quyết các tranh chấp, khiếu nại',
      'Khi cơ quan pháp luật có yêu cầu.',
    ],
    contactInfo:
      'LABone hiểu rằng quyền lợi của bạn trong việc bảo vệ thông tin cá nhân cũng chính là trách nhiệm của chúng tôi nên trong bất kỳ trường hợp có thắc mắc, góp ý nào liên quan đến chính sách bảo mật của LABone, và liên quan đến việc thông tin cá nhân bị sử dụng sai mục đích hoặc phạm vi đã thông báo vui lòng liên hệ qua số hotline 0978 782 147 hoặc email: info@labone.vn',
  },
}

export const privacyPolicyEN: PrivacyPolicyContent = {
  title: 'Privacy Policy',
  purposeAndScope: {
    title: '1. Purpose and scope of information collection',
    intro:
      'LABone does not sell, share or exchange customer personal information collected on the website to any third party. Personal information collected will only be used internally by the company.',
    personalInfo: {
      title: 'When you contact to register for services, personal information that LABone collects includes:',
      items: ['Full name', 'Address', 'Phone', 'Email'],
    },
    serviceInfo: {
      title: 'In addition to personal information, service-related information',
      items: ['Product name', 'Quantity', 'Product delivery time'],
    },
  },
  usageScope: {
    title: '2. Scope of information usage',
    intro:
      'Personal information collected will only be used by LABone internally within the company and for one or all of the following purposes:',
    purposes: [
      'Customer support',
      'Provide service-related information',
      'Process orders and provide services and information via our website as per your request',
      'We may send information about new products, services, upcoming events, or recruitment information if you subscribe to email notifications.',
      'Additionally, we will use the information you provide to support customer account management; confirm and execute financial transactions related to your online payments;',
    ],
  },
  retentionPeriod: {
    title: '3. Information retention period',
    description:
      'For personal information, LABone will only delete this data if the customer requests it by sending an email to info@labone.vn',
  },
  accessOrganizations: {
    title: '4. Individuals or organizations that may access personal information',
    intro: 'Parties that may access customer personal information include the following cases:',
    organizations: [
      'LABONE SCIENTIFIC EQUIPMENT CO., LTD',
      'Partners who have signed contracts to perform a part of the services provided by LABONE SCIENTIFIC EQUIPMENT CO., LTD. These partners will receive information according to the contract agreement (which may be partial or complete information depending on the contract terms) to assist users in using the services provided by the Company.',
    ],
  },
  companyInfo: {
    title: '5. Address of the unit collecting and managing personal information',
    companyName: companyInfo.name.en,
    address: `Address: ${companyInfo.address.en.name}`,
    phone: `Phone: ${companyInfo.phone.en}`,
    website: 'Website: Labone.com.vn',
    email: `Email: ${companyInfo.email.en}`,
  },
  userAccessTools: {
    title: '6. Means and tools for users to access and edit their personal data',
    collectionMethod:
      'LABone does not collect customer information via the website; customer personal information is collected via email for product/service inquiries sent to our mailbox: info@labone.vn or by calling the product purchase contact number 0978 782 147',
    contactInfo: '',
    editRequest:
      'You can contact the email address and phone number above to request LABone to edit your personal data.',
  },
  complaintMechanism: {
    title:
      '7. Mechanism for receiving and resolving consumer complaints regarding personal information being used for the wrong purpose or beyond the announced scope.',
    intro:
      'At LABone, protecting your personal information is very important, and you are assured that the information you provide to us will be kept confidential.',
    commitment:
      'LABone commits not to share, sell, or rent your personal information to any other party. LABone commits to using your information only in the following cases:',
    usageCases: ['Improving customer service quality', 'Resolving disputes, complaints', 'When required by law'],
    contactInfo:
      "LABone understands that your rights in protecting personal information are also our responsibility, so in any case of questions or feedback related to LABone's privacy policy, and related to personal information being used for the wrong purpose or beyond the announced scope, please contact hotline 0978 782 147 or email: info@labone.vn",
  },
}
