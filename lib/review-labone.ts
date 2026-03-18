export interface LaboneDescription {
  short: {
    vi: string
    en: string
  }
  full: {
    vi: string
    en: string
  }
}

export interface LaboneData {
  description: LaboneDescription
  productCategories: {
    equipment: {
      vi: string[]
      en: string[]
    }
    media: {
      vi: string[]
      en: string[]
    }
    consumables: {
      vi: string[]
      en: string[]
    }
  }
  standards: string[]
  locations: {
    vi: string
    en: string
  }
}

export const laboneData: LaboneData = {
  description: {
    short: {
      vi: `<p><strong>LABone</strong> là một công ty khoa học về công nghệ y tế, khoa học cuộc sống và phòng sạch. Chúng tôi chuyên phát triển, sản xuất và phân phối các thiết bị, môi trường thử nghiệm vi sinh, vật tư tiêu hao và dịch vụ trong các phòng thí nghiệm và phòng sạch trên toàn thế giới.</p>`,
      en: `<p><strong>LABone</strong> is a science-based company operating in the fields of medical technology, life sciences, and cleanroom technology. We specialize in the development, manufacturing, and distribution of equipment, microbiological testing media, consumables, and services for laboratories and cleanrooms worldwide.</p>`,
    },
    full: {
      vi: `<p><strong>LABone</strong> là một công ty khoa học về công nghệ y tế, khoa học cuộc sống và phòng sạch. Chúng tôi chuyên phát triển, sản xuất và phân phối các thiết bị, môi trường thử nghiệm vi sinh, vật tư tiêu hao và dịch vụ trong các phòng thí nghiệm và phòng sạch trên toàn thế giới.</p><p>Danh mục sản phẩm của chúng tôi đa dạng như thiết bị: Tủ an toàn sinh học, tủ phân lập vô trùng(Isolator), tủ sạch, tủ hút khí độc, tủ thao tác PCR, tủ lưu trử hóa chất, tủ chống cháy, máy dập mẫu vi sinh, bơm nhu động phân phối môi trường, máy pha loãng mẫu theo trọng lượng, máy phân phối chất lỏng tự động, tủ ấm CO2, tủ ấm lắc, tủ ấm, tủ sấy, máy lấy mẫu vi sinh không khí, passbox, airshower, LAF,…Môi trường thử nghiệm vi sinh như các đĩa môi trường chuẩn bị sẵn 90, 60, đĩa contact, môi trường pha loãng, tăng sinh và các dụng cụ lấy mẫu môi trường bằng swab and sponge ; Vật tư tiêu hao như: Túi dập mẫu vi sinh, ống lấy máu chân không.</p><p><strong>LABone</strong> được vận hành thông qua các hệ thống tiêu chuẩn như: ISO 9001, ISO 13485, ISO 17025.</p><p><strong>LABone</strong> hiện tại có nhà máy sản xuất tại Việt Nam và công ty tại Mỹ. Ngoài ra chúng tôi có đại lý và nhà phân phối trên toàn thế giới, đồng thời đang mở rộng càng nhiều nhà phân phối trên mọi quốc gia trên thế giới để hỗ trợ tốt nhất và kịp thời cho tất cả khách hàng.</p>`,
      en: `<p><strong>LABone</strong> is a science-based company operating in the fields of medical technology, life sciences, and cleanroom technology. We specialize in the development, manufacturing, and distribution of equipment, microbiological testing media, consumables, and services for laboratories and cleanrooms worldwide.</p><p>Our product portfolio is diverse and includes equipment such as biosafety cabinets, isolators, clean benches, fume hoods, PCR workstations, chemical storage cabinets, Flammable cabinets, microbiological sample homogenizers, peristaltic pumps for media dispensing, gravimetric sample dilutors, automatic liquid dispensing systems, CO₂ incubators, shaking incubators, incubators, drying ovens, microbial air samplers, pass boxes, air showers, laminar air flow (LAF) units, and other related products; microbiological testing media include ready-to-use culture media plates (90 mm, 60 mm, and contact plates), dilution and enrichment media, as well as environmental sampling tools using swabs and sponges; consumables include microbiological sample bags and vacuum blood collection tubes.</p><p><strong>LABone</strong> operates in compliance with international standards, including ISO 9001, ISO 13485, ISO/IEC 17025.</p><p>Currently, <strong>LABone</strong> has a manufacturing facility located in Vietnam and a company in the United States. In addition, we work with a network of agents and distributors worldwide and are continuously expanding our global distribution network across more countries to provide the best and most timely support to all customers.</p>`,
    },
  },
  productCategories: {
    equipment: {
      vi: [
        'Tủ an toàn sinh học',
        'Tủ phân lập vô trùng (Isolator)',
        'Tủ sạch',
        'Tủ hút khí độc',
        'Tủ thao tác PCR',
        'Tủ lưu trữ hóa chất',
        'Tủ chống cháy',
        'Máy dập mẫu vi sinh',
        'Bơm nhu động phân phối môi trường',
        'Máy pha loãng mẫu theo trọng lượng',
        'Máy phân phối chất lỏng tự động',
        'Tủ ấm CO2',
        'Tủ ấm lắc',
        'Tủ ấm',
        'Tủ sấy',
        'Máy lấy mẫu vi sinh không khí',
        'Passbox',
        'Airshower',
        'LAF (Laminar Air Flow)',
      ],
      en: [
        'Biosafety cabinets',
        'Isolators',
        'Clean benches',
        'Fume hoods',
        'PCR workstations',
        'Chemical storage cabinets',
        'Flammable cabinets',
        'Microbiological sample homogenizers',
        'Peristaltic pumps for media dispensing',
        'Gravimetric sample dilutors',
        'Automatic liquid dispensing systems',
        'CO₂ incubators',
        'Shaking incubators',
        'Incubators',
        'Drying ovens',
        'Microbial air samplers',
        'Pass boxes',
        'Air showers',
        'Laminar air flow (LAF) units',
      ],
    },
    media: {
      vi: [
        'Đĩa môi trường chuẩn bị sẵn 90mm',
        'Đĩa môi trường chuẩn bị sẵn 60mm',
        'Đĩa contact',
        'Môi trường pha loãng',
        'Môi trường tăng sinh',
        'Dụng cụ lấy mẫu môi trường bằng swab',
        'Dụng cụ lấy mẫu môi trường bằng sponge',
      ],
      en: [
        'Ready-to-use culture media plates (90 mm)',
        'Ready-to-use culture media plates (60 mm)',
        'Contact plates',
        'Dilution media',
        'Enrichment media',
        'Environmental sampling tools using swabs',
        'Environmental sampling tools using sponges',
      ],
    },
    consumables: {
      vi: ['Túi dập mẫu vi sinh', 'Ống lấy máu chân không'],
      en: ['Microbiological sample bags', 'Vacuum blood collection tubes'],
    },
  },
  standards: ['ISO 9001', 'ISO 13485', 'ISO/IEC 17025'],
  locations: {
    vi: `<p><strong>LABone</strong> hiện tại có nhà máy sản xuất tại Việt Nam và công ty tại Mỹ. Ngoài ra chúng tôi có đại lý và nhà phân phối trên toàn thế giới, đồng thời đang mở rộng càng nhiều nhà phân phối trên mọi quốc gia trên thế giới để hỗ trợ tốt nhất và kịp thời cho tất cả khách hàng.</p>`,
    en: `<p>Currently, <strong>LABone</strong> has a manufacturing facility located in Vietnam and a company in the United States. In addition, we work with a network of agents and distributors worldwide and are continuously expanding our global distribution network across more countries to provide the best and most timely support to all customers.</p>`,
  },
}
