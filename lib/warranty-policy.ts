export interface WarrantyCondition {
  id: number
  title: string
  description?: string
}

export interface WarrantyPolicyContent {
  title: string
  subtitle: string
  coveredCases: WarrantyCondition[]
  notCoveredCases: WarrantyCondition[]
  returnRefundConditions: {
    title: string
    conditions: WarrantyCondition[]
    note: string
    noteDetails: string[]
  }
}

export const warrantyPolicyVN: WarrantyPolicyContent = {
  title: 'Chính sách bảo hành',
  subtitle: 'Chúng tôi cam kết cung cấp dịch vụ bảo hành minh bạch và công bằng cho tất cả khách hàng.',
  coveredCases: [
    {
      id: 1,
      title: 'Sản phẩm trong thời hạn còn bảo hành',
    },
    {
      id: 2,
      title: 'Sản phẩm được bảo hành theo quy định của nhà cung cấp',
    },
    {
      id: 3,
      title: 'Quý khách xuất trình phiếu bảo hành khi bảo hành',
    },
  ],
  notCoveredCases: [
    {
      id: 1,
      title: 'Sản phẩm đã quá thời hạn ghi trên Phiếu bảo hành hoặc mất Phiếu bảo hành',
    },
    {
      id: 2,
      title: 'Phiếu bảo hành không ghi rõ mã số sản phẩm và ngày mua hàng',
    },
    {
      id: 3,
      title: 'Mã số sản phẩm và Phiếu bảo hành không trùng khớp nhau hoặc không xác định được vì bất kỳ lý do nào',
    },
    {
      id: 4,
      title: 'Sản phẩm bị trầy xước do quá trình sử dụng lâu ngày',
    },
    {
      id: 5,
      title: 'Sản phẩm bị bể móp, biến dạng do bị va đập',
    },
    {
      id: 6,
      title: 'Khách hàng tự ý can thiệp vào máy của sản phẩm hoặc đem đến một nơi nào khác sửa chữa',
    },
  ],
  returnRefundConditions: {
    title: 'Điều kiện đổi trả hàng hoặc hoàn tiền 100%',
    conditions: [
      {
        id: 1,
        title: 'Sản phẩm phát hiện bị lỗi của nhà sản xuất khi nhận hàng',
      },
      {
        id: 2,
        title: 'Sản phẩm không giống với sản phẩm mà Quý khách đã đặt hàng trên website của chúng tôi',
      },
    ],
    note: 'Lưu ý:',
    noteDetails: [
      'Khách hàng cần đổi trả hàng trong vòng 7 ngày làm việc tính từ thời điểm quý khách nhận hàng.',
      'Sản phẩm đổi trả cần nguyên vẹn nhãn mác, hộp, bao bì gốc của sản phẩm như khi Quý khách nhận hàng lúc đầu.',
    ],
  },
}

export const warrantyPolicyEN: WarrantyPolicyContent = {
  title: 'Warranty Policy',
  subtitle: 'We are committed to providing transparent and fair warranty services for all customers.',
  coveredCases: [
    {
      id: 1,
      title: 'Products within the warranty period',
    },
    {
      id: 2,
      title: 'Products warranted according to supplier regulations',
    },
    {
      id: 3,
      title: 'Customer must present the warranty card when claiming warranty',
    },
  ],
  notCoveredCases: [
    {
      id: 1,
      title: 'Product is past the warranty period stated on the warranty card or the warranty card is lost',
    },
    {
      id: 2,
      title: 'Warranty card does not clearly state the product code and purchase date',
    },
    {
      id: 3,
      title: 'Product code and warranty card do not match or cannot be identified for any reason',
    },
    {
      id: 4,
      title: 'Product is scratched due to long-term use',
    },
    {
      id: 5,
      title: 'Product is broken, dented, or deformed due to impact',
    },
    {
      id: 6,
      title: 'Customer self-intervenes with the product machine or takes it to another place for repair',
    },
  ],
  returnRefundConditions: {
    title: 'Conditions for product exchange or 100% refund',
    conditions: [
      {
        id: 1,
        title: 'Product is found to have a manufacturer defect upon receipt',
      },
      {
        id: 2,
        title: 'Product is not the same as the product ordered by the customer on our website',
      },
    ],
    note: 'Note:',
    noteDetails: [
      'Customers need to exchange or return goods within 7 working days from the time of receipt.',
      'Returned products must have original labels, boxes, and packaging intact as when the customer first received them.',
    ],
  },
}
