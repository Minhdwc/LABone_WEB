export interface CompanyInfo {
  name: {
    vi: string
    en: string
  }
  address: {
    vi: {
      name: string
      value: string
    }
    en: {
      name: string
      value: string
    }
  }
  phone: {
    vi: string
    en: string
  }
  email: {
    vi: string
    en: string
  }
  internationalDistribution: {
    title: {
      vi: string
      en: string
    }
    description: {
      vi: string
      en: string
    }
    list: {
      name: string
      address?: string
      phone?: string
      email?: string
      website?: string
      country?: string
      logo: string
      region: string
    }[]
  }
}

export const companyHeroVN = {
  label: 'Công ty TNHH Thiết bị Khoa học LABone',
  title: {
    line2: 'THIẾT BỊ KHOA HỌC & PHÒNG LAB',
  },
  description:
    'Giải pháp toàn diện cho nghiên cứu khoa học, công nghệ sinh học và phòng sạch. Sản xuất và cung cấp thiết bị, vật tư tiêu hao và môi trường vi sinh chất lượng cao, giúp tối ưu hiệu suất vận hành và sản xuất.',
  stats: [
    {
      value: '2012',
      label: 'Năm thành lập',
    },
    {
      value: '4',
      label: 'Thương hiệu chính',
    },
    {
      value: '3+',
      label: 'Chứng nhận ISO',
    },
  ],
  labelGlobal: 'Phân phối quốc tế',
}

export const companyHeroEN = {
  label: 'LABone pharmaceutical and scientific equipment company LLC',
  title: {
    line2: 'SCIENTIFIC & LAB EQUIPMENT',
  },
  labelGlobal: 'Worldwide Distribution',
  description:
    'Comprehensive solutions for scientific research, biotechnology, and cleanroom environments. Manufacturing and supplying high-quality laboratory equipment, consumables, and microbiological media to optimize operational efficiency and production performance.',
  stats: [
    {
      value: '2012',
      label: 'Year Established',
    },
    {
      value: '4',
      label: 'Core Brands',
    },
    {
      value: '3+',
      label: 'ISO Certifications',
    },
  ],
}

export const companyInfo: CompanyInfo = {
  name: {
    vi: 'Công ty TNHH Thiết bị Khoa học LABone',
    en: 'LABone pharmaceutical and scientific equipment company LLC',
  },
  address: {
    vi: {
      name: '228/13/3 Nguyễn Thị Lắng, Củ Chi, Thành phố Hồ Chí Minh, Việt Nam',
      value: '228/13/3 Nguyen Thi Lang, Cu Chi, Ho Chi Minh City, Vietnam',
    },
    en: {
      name: '82 Wendell Ave, Pittsfield, MA 01201, United states',
      value: '82 Wendell Ave, Pittsfield, MA 01201, United states',
    },
  },
  phone: {
    vi: '0978 782 147',
    en: '+1339 208 0611',
  },
  email: {
    vi: 'info@labone.vn',
    en: 'usa@labone.vn',
  },
  internationalDistribution: {
    title: {
      vi: 'Danh sách nhà phân phối quốc tế',
      en: 'List of international distributors',
    },
    description: {
      vi: 'Chúng tôi cung cấp các sản phẩm khoa học và thiết bị khoa học đến toàn bộ các quốc gia trên toàn thế giới.',
      en: 'We provide scientific products and equipment to all countries in the world.',
    },
    list: [
      {
        name: 'AFFINITECH CO., LTD',
        country: 'Thailand',
        logo: '/assets/distributors/affinitech-thailand.png',
        region: 'Asia',
      },
      {
        name: 'LABORATORY SUPPLIES & EQUIPMENT SUPPLIER IN SINGAPORE - IT TECH',
        country: 'Singapore',
        logo: '/assets/distributors/ittech-singapore.svg',
        region: 'Asia',
      },
      {
        name: 'NHBIO',
        country: 'Korea',
        logo: '/assets/distributors/nhbio-korea.png',
        region: 'Asia',
      },
      {
        name: 'LABone pharmaceutical and scientific equipment company LLC',
        address: '82 Wendell Ave, Pittsfield, MA 01201, United States',
        phone: '+1339 208 0611',
        email: 'usa@labone.vn',
        website: 'https://www.labone.com.vn',
        logo: '/assets/distributors/LABone.png',
        region: 'Other',
      },
    ],
  },
}
