import { foodImage, money } from '../data'
import type { CartLine } from '../cart'

export function OrderTotals({ subtotal, paid = false }: { subtotal: number; paid?: boolean }) {
  return (
    <dl className="order-totals">
      <div><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
      <div><dt>Delivery Fee</dt><dd>{money(0)}</dd></div>
      <div><dt>Taxes</dt><dd>{money(0)}</dd></div>
      <div className="order-total"><dt>{paid ? 'Total Paid' : 'Total'}</dt><dd>{money(subtotal)}</dd></div>
    </dl>
  )
}

export function ReceiptItems({ lines }: { lines: CartLine[] }) {
  return (
    <ul className="receipt-items">
      {lines.map((line) => (
        <li key={line.id}>
          <img src={foodImage(line.image)} width="72" height="72" alt="" />
          <div>
            <strong>{line.name}</strong>
            <p>{line.description}</p>
            <small>Quantity {line.quantity}</small>
          </div>
          <strong className="receipt-price">{money(line.price * line.quantity)}</strong>
        </li>
      ))}
    </ul>
  )
}
