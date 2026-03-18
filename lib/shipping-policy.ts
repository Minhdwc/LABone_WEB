export interface ShippingPolicyContent {
  title: string
  deliveryMethods: {
    title: string
    intro: string
    methods: string[]
  }
  estimatedDeliveryTime: {
    title: string
    processingTime: string
    deliveryTime: string
    forceMajeureIntro: string
    forceMajeureCases: string[]
    shippingFee: string
  }
  geographicalLimitations: {
    title: string
    description: string
  }
  note: string
}

export const shippingPolicyVN: ShippingPolicyContent = {
  title: 'Chính sách vận chuyển và giao nhận',
  deliveryMethods: {
    title: 'a) Các phương thức giao hàng',
    intro: 'Chúng tôi sử dụng 02 phương thức giao hàng:',
    methods: ['Khách hàng mua trực tiếp hàng tại công ty, cửa hàng của chúng tôi', 'Ship hàng'],
  },
  estimatedDeliveryTime: {
    title: 'b) Thời hạn ước tính cho việc giao hàng',
    processingTime:
      'Thông thường sau khi nhận được thông tin đặt hàng chúng tôi sẽ xử lý đơn hàng trong vòng 24h và phản hồi lại thông tin cho khách hàng về việc thanh toán và giao nhận.',
    deliveryTime:
      'Thời gian giao hàng thường trong khoảng từ 3-5 ngày kể từ ngày chốt đơn hàng hoặc theo thỏa thuận với khách khi đặt hàng.',
    forceMajeureIntro:
      'Tuy nhiên, cũng có trường hợp việc giao hàng kéo dài hơn nhưng chỉ xảy ra trong những tình huống bất khả kháng như sau:',
    forceMajeureCases: [
      'Nhân viên chúng tôi liên lạc với khách hàng qua điện thoại không được nên không thể giao hàng.',
      'Địa chỉ giao hàng bạn cung cấp không chính xác hoặc khó tìm.',
      'Số lượng đơn hàng tăng đột biến khiến việc xử lý đơn hàng bị chậm.',
      'Đối tác cung cấp hàng chậm hơn dự kiến khiến việc giao hàng bị chậm lại hoặc đối tác vận chuyển giao hàng bị chậm',
    ],
    shippingFee:
      'Về phí vận chuyển, chúng tôi sử dụng dịch vụ vận chuyển ngoài nên cước phí vận chuyển sẽ được tính theo phí của các đơn vị vận chuyển tùy vào vị trí và khối lượng của đơn hàng, khi liên hệ lại xác nhận đơn hàng với khách sẽ báo mức phí cụ thể cho khách hàng.',
  },
  geographicalLimitations: {
    title: 'c) Các giới hạn về mặt địa lý cho việc giao hàng',
    description:
      'Riêng khách tỉnh có nhu cầu mua số lượng lớn hoặc khách buôn sỉ nếu có nhu cầu mua sản phẩm, chúng tôi sẽ nhờ dịch vụ giao nhận của các công ty vận chuyển và phí sẽ được tính theo phí của các đơn vị cung cấp dịch vụ vận chuyển hoặc theo thoản thuận hợp đồng giữa 2 bên.',
  },
  note: 'Lưu ý: Trường hợp phát sinh chậm trễ trong việc giao hàng chúng tôi sẽ thông tin kịp thời cho khách hàng và khách hàng có thể lựa chọn giữa việc Hủy hoặc tiếp tục chờ hàng.',
}

export const shippingPolicyEN: ShippingPolicyContent = {
  title: 'Shipping and Delivery Policy',
  deliveryMethods: {
    title: 'a) Delivery Methods',
    intro: 'We use 02 delivery methods:',
    methods: ['Customers directly purchase goods at our company, our store', 'Shipping'],
  },
  estimatedDeliveryTime: {
    title: 'b) Estimated Delivery Time',
    processingTime:
      'Normally, after receiving order information, we will process the order within 24 hours and respond to the customer with information regarding payment and delivery.',
    deliveryTime:
      'Delivery time is usually within 3-5 days from the order confirmation date or as agreed with the customer when placing the order.',
    forceMajeureIntro:
      'However, there are cases where delivery may take longer, but only in the following force majeure situations:',
    forceMajeureCases: [
      'Our staff cannot contact the customer by phone, so delivery cannot be made.',
      'The delivery address you provided is incorrect or difficult to find.',
      'A sudden increase in the number of orders causes order processing to be delayed.',
      'The supplier delivers goods slower than expected, causing delivery to be delayed, or the shipping partner delays delivery.',
    ],
    shippingFee:
      'Regarding shipping fees, we use external shipping services, so shipping fees will be calculated according to the fees of the shipping units depending on the location and volume of the order. When re-contacting to confirm the order with the customer, the specific fee will be informed to the customer.',
  },
  geographicalLimitations: {
    title: 'c) Geographical Limitations for Delivery',
    description:
      'For provincial customers who wish to purchase large quantities or wholesale customers who wish to purchase products, we will use the delivery services of shipping companies, and the fees will be calculated according to the fees of the shipping service providers or according to the contractual agreement between the two parties.',
  },
  note: 'Note: In case of delivery delays, we will promptly inform the customer, and the customer can choose between canceling or continuing to wait for the order.',
}
