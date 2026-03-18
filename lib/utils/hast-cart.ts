import { ICartItem } from '@/types'
import CryptoJS from 'crypto-js'

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || ''

//Function dùng để mã hóa dữ liệu giỏ hàng
export const hashCartData = (items: ICartItem[]) => {
  try {
    const encrypCart = CryptoJS.AES.encrypt(JSON.stringify({ items }), SECRET_KEY).toString()
    return encrypCart
  } catch {
    return null
  }
}

//Function dùng để giải mã dữ liệu giỏ hàng
export const decryptCartData = (encryptedData: string): ICartItem[] | null => {
  try {
    const decryptedData = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY).toString(CryptoJS.enc.Utf8)
    const parsedData = JSON.parse(decryptedData) as { items: ICartItem[] }
    return parsedData.items || []
  } catch {
    return null
  }
}
