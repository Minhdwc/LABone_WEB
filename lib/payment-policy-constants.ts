export interface PaymentMethod {
  id: number
  title: string
  description: string
}

export interface PaymentPolicyContent {
  title: string
  subtitle: string
  methods: PaymentMethod[]
  notes: string
  bulkOrderNote: string
  commitment: string
}

export const paymentPolicyVN: PaymentPolicyContent = {
  title: 'Chính sách thanh toán',
  subtitle: 'Có 3 hình thức thanh toán, khách hàng có thể lựa chọn hình thức thuận tiện và phù hợp với mình nhất:',
  methods: [
    {
      id: 1,
      title: 'Thanh toán tiền mặt trực tiếp',
      description: 'Quý khách có thể đến trực tiếp địa chỉ của chúng tôi để thanh toán bằng tiền mặt.',
    },
    {
      id: 2,
      title: 'Thanh toán khi nhận hàng (COD)',
      description: 'Khách hàng xem hàng tại nhà, thanh toán tiền mặt cho nhân viên giao nhận hàng.',
    },
    {
      id: 3,
      title: 'Chuyển khoản trước',
      description:
        'Quý khách chuyển khoản trước, sau đó chúng tôi tiến hành giao hàng theo thỏa thuận hoặc hợp đồng với Quý khách.',
    },
  ],
  notes:
    'Nếu sau thời gian thỏa thuận mà chúng tôi không giao hàng hoặc không phản hồi lại, quý khách có thể gửi khiếu nại trực tiếp về địa chỉ trụ sở và yêu cầu bồi thường nếu chứng minh được sự chậm trễ làm ảnh hưởng đến kinh doanh của quý khách.',

  bulkOrderNote:
    'Đối với khách hàng có nhu cầu mua số lượng lớn để kinh doanh hoặc buôn sỉ vui lòng liên hệ trực tiếp với chúng tôi để có chính sách giá cả hợp lý. Và việc thanh toán sẽ được thực hiện theo hợp đồng.',
  commitment: 'Chúng tôi cam kết kinh doanh minh bạch, hợp pháp, bán hàng chất lượng, có nguồn gốc.',
}

export const paymentPolicyEN: PaymentPolicyContent = {
  title: 'Payment Policy',
  subtitle: 'We offer 3 payment methods, customers can choose the most convenient and suitable method:',
  methods: [
    {
      id: 1,
      title: 'Cash payment at our office',
      description: 'You can visit our office directly to make cash payment.',
    },
    {
      id: 2,
      title: 'Cash on Delivery (COD)',
      description: 'Customers can view the products at home and pay cash to the delivery staff.',
    },
    {
      id: 3,
      title: 'Bank transfer in advance',
      description:
        'You transfer money in advance, then we proceed with delivery according to the agreement or contract with you.',
    },
  ],
  notes:
    'If after the agreed time we do not deliver or do not respond, you can file a complaint directly to our headquarters and request compensation if you can prove that the delay affects your business.',

  bulkOrderNote:
    'For customers who need to purchase in bulk for business or wholesale, please contact us directly for reasonable pricing policy. Payment will be made according to the contract.',
  commitment: 'We commit to transparent, legal business, selling quality products with clear origin.',
}
