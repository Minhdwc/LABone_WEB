'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { IProduct, ICartItem, ICartAccessoryItem } from '@/types'
import { hashCartData, decryptCartData } from '@/lib/utils/hast-cart'

interface CartContextType {
  cart: ICartItem[]
  ready: boolean
  addToCart: (item: IProduct, quantity?: number, items?: ICartAccessoryItem[]) => void
  addAccessoryToProduct: (productId: string, accessory: IProduct, quantity: number) => boolean
  updateProduct: (productId: string, quantity: number) => boolean
  updateAccessory: (productId: string, accessoryId: string, quantity: number) => boolean
  removeAccessory: (productId: string, accessoryId: string) => boolean
  removeItem: (productId: string) => void
  clearCart: () => void
  getTotalItems: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)
const CART_KEY = 'cart'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ICartItem[]>([])
  const [ready, setReady] = useState(false)

  // ================================
  // Khởi tạo cart từ localStorage
  // ================================
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const stored = localStorage.getItem(CART_KEY)
      if (stored) {
        const items = decryptCartData(stored)
        if (items) {
          setCart(items)
        }
      }
    } catch (err) {
      console.error('Error initializing cart:', err)
    } finally {
      setReady(true)
    }
  }, [])

  // ================================
  // Lưu cart vào localStorage
  // ================================
  useEffect(() => {
    if (!ready || typeof window === 'undefined') return

    try {
      if (cart.length === 0) {
        localStorage.removeItem(CART_KEY)
        return
      }

      const hashed = hashCartData(cart)
      if (hashed) {
        localStorage.setItem(CART_KEY, hashed)
      }
    } catch (err) {
      console.error('Error saving cart:', err)
    }
  }, [ready, cart])

  // ================================
  // Helper: Tạo key để so sánh accessories
  // ================================
  const getAccessoryKey = useCallback((items?: ICartAccessoryItem[]): string => {
    return (items || [])
      .map((a) => a.accessory.product_id)
      .sort()
      .join(',')
  }, [])

  // ================================
  // Thêm product + accessories vào cart
  // ================================
  const addToCart = useCallback(
    (product: IProduct, quantity = 1, items?: ICartAccessoryItem[]) => {
      const newAccessoryKey = getAccessoryKey(items)

      setCart((prev) => {
        // Tìm product có cùng ID và accessories giống nhau
        const exactMatchIndex = prev.findIndex(
          (item) => item.product.product_id === product.product_id && getAccessoryKey(item.items) === newAccessoryKey,
        )

        if (exactMatchIndex >= 0) {
          // Đã có product với accessories giống nhau → tăng số lượng
          const updated = [...prev]
          const existingItem = updated[exactMatchIndex]

          updated[exactMatchIndex] = {
            ...existingItem,
            quantity: existingItem.quantity + quantity,
            // Tăng số lượng của từng accessory
            items: existingItem.items?.map((acc, idx) => ({
              ...acc,
              quantity: acc.quantity + (items?.[idx]?.quantity || 0),
            })),
          }

          return updated
        }

        // Nếu không tìm thấy exact match, kiểm tra xem có product cùng ID không
        // (trường hợp: thêm product không có accessories nhưng đã có product với accessories)
        const sameProductIndex = prev.findIndex((item) => item.product.product_id === product.product_id)

        if (sameProductIndex >= 0 && !items?.length) {
          // Đã có product (có thể có accessories) và đang thêm product không có accessories
          // → Merge: tăng quantity và giữ nguyên accessories hiện có
          const updated = [...prev]
          const existingItem = updated[sameProductIndex]

          updated[sameProductIndex] = {
            ...existingItem,
            quantity: existingItem.quantity + quantity,
            // Giữ nguyên accessories hiện có
            items: existingItem.items || [],
          }

          return updated
        }

        // Chưa có product → thêm mới
        return [...prev, { product, quantity, items: items || [] }]
      })
    },
    [getAccessoryKey],
  )

  // ================================
  // Xóa product khỏi cart
  // ================================
  const removeItem = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.product_id !== productId))
  }, [])

  // ================================
  // Xóa toàn bộ cart
  // ================================
  const clearCart = useCallback(() => {
    setCart([])
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CART_KEY)
    }
  }, [])

  // ================================
  // Thêm accessory vào product có sẵn
  // ================================
  const addAccessoryToProduct = useCallback((productId: string, accessory: IProduct, quantity: number): boolean => {
    let success = false

    setCart((prev) => {
      // Tìm product trong cart
      const productIndex = prev.findIndex((item) => item.product.product_id === productId)

      if (productIndex === -1) return prev

      success = true
      const updated = [...prev]
      const productItem = { ...updated[productIndex] }

      // Tìm accessory đã tồn tại chưa
      const accessoryIndex =
        productItem.items?.findIndex((acc) => acc.accessory.product_id === accessory.product_id) ?? -1

      if (accessoryIndex >= 0 && productItem.items) {
        // Đã có → tăng số lượng
        productItem.items = productItem.items.map((acc, idx) =>
          idx === accessoryIndex ? { ...acc, quantity: acc.quantity + quantity } : acc,
        )
      } else {
        // Chưa có → thêm mới
        productItem.items = [...(productItem.items || []), { accessory, quantity }]
      }

      updated[productIndex] = productItem
      return updated
    })

    return success
  }, [])

  // ================================
  // Cập nhật số lượng product
  // ================================
  const updateProduct = useCallback((productId: string, quantity: number): boolean => {
    if (quantity <= 0) return false

    let success = false
    setCart((prev) => {
      const productIndex = prev.findIndex((item) => item.product.product_id === productId)

      if (productIndex === -1) return prev

      success = true
      const updated = [...prev]
      updated[productIndex] = {
        ...updated[productIndex],
        quantity,
      }

      return updated
    })

    return success
  }, [])

  // ================================
  // Cập nhật số lượng accessory
  // ================================
  const updateAccessory = useCallback((productId: string, accessoryId: string, quantity: number): boolean => {
    if (quantity <= 0) return false

    let success = false
    setCart((prev) => {
      // Tìm product
      const productIndex = prev.findIndex((item) => item.product.product_id === productId)

      if (productIndex === -1 || !prev[productIndex].items) return prev

      // Tìm accessory
      const accessoryIndex = prev[productIndex].items!.findIndex((acc) => acc.accessory.product_id === accessoryId)

      if (accessoryIndex === -1) return prev

      success = true
      const updated = [...prev]
      const updatedItems = [...updated[productIndex].items!]

      // Cập nhật quantity
      updatedItems[accessoryIndex] = {
        ...updatedItems[accessoryIndex],
        quantity,
      }

      updated[productIndex] = {
        ...updated[productIndex],
        items: updatedItems,
      }

      return updated
    })

    return success
  }, [])

  // ================================
  // Xóa accessory khỏi product
  // ================================
  const removeAccessory = useCallback((productId: string, accessoryId: string): boolean => {
    let success = false

    setCart((prev) => {
      // Tìm product
      const productIndex = prev.findIndex((item) => item.product.product_id === productId)

      if (productIndex === -1 || !prev[productIndex].items) return prev

      // Lọc bỏ accessory
      const filteredItems = prev[productIndex].items!.filter((acc) => acc.accessory.product_id !== accessoryId)

      success = true
      const updated = [...prev]
      updated[productIndex] = {
        ...updated[productIndex],
        items: filteredItems,
      }

      return updated
    })

    return success
  }, [])
  //Tổng số lượng sản phẩm và phụ kiện trong giỏ hàng
  const getTotalItems = useCallback(
    () =>
      cart.reduce(
        (total, item) => total + item.quantity + (item.items?.reduce((acc, item) => acc + item.quantity, 0) ?? 0),
        0,
      ),
    [cart],
  )

  const value: CartContextType = {
    cart,
    ready,
    addToCart,
    addAccessoryToProduct,
    updateProduct,
    updateAccessory,
    removeAccessory,
    removeItem,
    clearCart,
    getTotalItems,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
