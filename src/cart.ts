import { createContext, useContext } from 'react'
import type { MenuItem } from './data'

export interface CartProduct {
  id: string
  name: string
  description: string
  image: string
  price: number
  custom?: boolean
}

export interface CartLine extends CartProduct {
  quantity: number
}

export interface Order {
  id: string
  lines: CartLine[]
  total: number
}

interface CartContextValue {
  lines: CartLine[]
  count: number
  subtotal: number
  order: Order | null
  notification: string
  add: (product: CartProduct) => void
  changeQuantity: (id: string, change: number) => void
  remove: (id: string) => void
  placeOrder: () => void
  dismissNotification: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)

export function useCart() {
  const cart = useContext(CartContext)
  if (!cart) throw new Error('Cart components require CartProvider.')
  return cart
}

export function menuProduct(item: MenuItem): CartProduct {
  return {
    id: item.id,
    image: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
  }
}

export function sumLines(lines: CartLine[]) {
  return lines.reduce((total, line) => total + line.price * line.quantity, 0)
}

export function isCartLine(value: unknown): value is CartLine {
  if (typeof value !== 'object' || value === null) return false
  const line = value as Partial<CartLine>
  return (
    typeof line.id === 'string' &&
    typeof line.name === 'string' &&
    typeof line.description === 'string' &&
    typeof line.image === 'string' &&
    /^[a-z0-9-]+$/.test(line.image) &&
    typeof line.price === 'number' &&
    Number.isSafeInteger(line.price) &&
    line.price >= 0 &&
    typeof line.quantity === 'number' &&
    Number.isSafeInteger(line.quantity) &&
    line.quantity > 0 &&
    line.quantity <= 99 &&
    (line.custom === undefined || typeof line.custom === 'boolean')
  )
}
