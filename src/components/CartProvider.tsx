import { useEffect, useState, type ReactNode } from 'react'
import { CartContext, isCartLine, sumLines, type CartLine, type CartProduct, type Order } from '../cart'

const cartKey = 'daily-bowl.cart.v1'
const orderKey = 'daily-bowl.order.v1'

function readCart(): CartLine[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(cartKey) ?? '[]')
    return Array.isArray(value) ? value.filter(isCartLine) : []
  } catch {
    return []
  }
}

function readOrder(): Order | null {
  try {
    const value: unknown = JSON.parse(sessionStorage.getItem(orderKey) ?? 'null')
    if (!value || typeof value !== 'object') return null
    const order = value as Partial<Order>
    if (typeof order.id !== 'string' || !Array.isArray(order.lines) || !order.lines.length) return null
    if (!order.lines.every(isCartLine)) return null
    return { id: order.id, lines: order.lines, total: sumLines(order.lines) }
  } catch {
    return null
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState(readCart)
  const [order, setOrder] = useState(readOrder)
  const [notification, setNotification] = useState<{ name: string } | null>(null)
  const count = lines.reduce((total, line) => total + line.quantity, 0)
  const subtotal = sumLines(lines)

  useEffect(() => {
    try {
      localStorage.setItem(cartKey, JSON.stringify(lines))
    } catch {
      // In-memory ordering still works when browser storage is unavailable.
    }
  }, [lines])

  useEffect(() => {
    if (!notification) return
    const timeout = window.setTimeout(() => setNotification(null), 4200)
    return () => window.clearTimeout(timeout)
  }, [notification])

  function add(product: CartProduct) {
    if (lines.some((line) => line.id === product.id && line.quantity >= 99)) return
    setLines((current) => {
      if (current.some((line) => line.id === product.id)) {
        return current.map((line) =>
          line.id === product.id ? { ...line, quantity: Math.min(line.quantity + 1, 99) } : line,
        )
      }
      return [...current, { ...product, quantity: 1 }]
    })
    setNotification({ name: product.name })
  }

  function changeQuantity(id: string, change: number) {
    setLines((current) =>
      current
        .map((line) =>
          line.id === id ? { ...line, quantity: Math.min(line.quantity + change, 99) } : line,
        )
        .filter((line) => line.quantity > 0),
    )
  }

  function remove(id: string) {
    setLines((current) => current.filter((line) => line.id !== id))
  }

  function placeOrder() {
    if (!lines.length) return
    const suffix = crypto.getRandomValues(new Uint32Array(1))[0].toString(36).toUpperCase()
    const nextOrder = { id: `DB-${suffix.padStart(7, '0')}`, lines, total: subtotal }
    setOrder(nextOrder)
    setLines([])
    setNotification(null)
    try {
      sessionStorage.setItem(orderKey, JSON.stringify(nextOrder))
    } catch {
      // The confirmation remains available until the page is reloaded.
    }
  }

  return (
    <CartContext.Provider value={{
      lines,
      count,
      subtotal,
      order,
      notification: notification?.name ?? '',
      add,
      changeQuantity,
      remove,
      placeOrder,
      dismissNotification: () => setNotification(null),
    }}>
      {children}
    </CartContext.Provider>
  )
}
