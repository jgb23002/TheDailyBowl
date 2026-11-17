import { ArrowLeft, ArrowRight, Check, LockKeyhole, Minus, Plus, ShoppingBag, ShoppingCart, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useCart } from '../cart'
import { OrderTotals, ReceiptItems } from '../components/OrderDetails'
import { foodImage, money } from '../data'

function OrderHeader({ title, backTo, backLabel }: { title: string; backTo: string; backLabel: string }) {
  return (
    <div className="order-header">
      <Link className="icon-button back-button" to={backTo} aria-label={backLabel}>
        <ArrowLeft size={20} aria-hidden="true" />
      </Link>
      <h1>{title}</h1>
      <span className="order-header-icon"><ShoppingBag size={21} aria-hidden="true" /></span>
    </div>
  )
}

export function Cart() {
  const { lines, subtotal, remove, changeQuantity } = useCart()

  return (
    <div className="container order-page">
      <OrderHeader title="Your Cart" backTo="/menu" backLabel="Back to menu" />
      {lines.length === 0 ? (
        <section className="empty-state surface">
          <span className="empty-icon"><ShoppingCart size={31} aria-hidden="true" /></span>
          <h2>Your cart is empty</h2>
          <p>Find something you love and add it to your cart.</p>
          <Link className="button button-primary" to="/menu">Explore Menu <ArrowRight size={18} aria-hidden="true" /></Link>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items" aria-labelledby="cart-items">
            <h2 id="cart-items">Order Items</h2>
            <ul>
              {lines.map((line) => (
                <li className="cart-item surface" key={line.id}>
                  <img className="cart-item-photo" src={foodImage(line.image)} alt="" width="112" height="112" />
                  <div className="cart-item-content">
                    <div className="cart-item-heading">
                      <h3>{line.name}</h3>
                      <button className="icon-button remove-item" type="button" onClick={() => remove(line.id)} aria-label={`Remove ${line.name}`}>
                        <Trash2 size={17} aria-hidden="true" />
                      </button>
                    </div>
                    <p>{line.description}</p>
                    {line.custom && <span className="custom-label">Customized</span>}
                    <div className="cart-item-actions">
                      <strong>{money(line.price * line.quantity)}</strong>
                      <div className="quantity-group" role="group" aria-label={`Quantity for ${line.name}`}>
                        <button type="button" aria-label={`Decrease ${line.name} quantity`} onClick={() => changeQuantity(line.id, -1)}>
                          <Minus size={16} aria-hidden="true" />
                        </button>
                        <output aria-label={`${line.name} quantity`}>{line.quantity}</output>
                        <button
                          type="button"
                          aria-label={`Increase ${line.name} quantity`}
                          onClick={() => changeQuantity(line.id, 1)}
                          disabled={line.quantity >= 99}
                        >
                          <Plus size={16} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <div className="cart-aside">
            <section className="summary-card surface" aria-labelledby="cart-summary">
              <h2 id="cart-summary">Order Summary</h2>
              <OrderTotals subtotal={subtotal} />
            </section>
            <Link className="button button-primary button-block" to="/checkout">Proceed to Checkout <ArrowRight size={18} aria-hidden="true" /></Link>
            <p className="checkout-note"><LockKeyhole size={14} aria-hidden="true" /> Demo checkout</p>
            <Link className="text-link continue-link" to="/menu"><ArrowLeft size={15} aria-hidden="true" /> Continue Shopping</Link>
          </div>
        </div>
      )}
    </div>
  )
}

export function Checkout() {
  const { lines, subtotal, placeOrder } = useCart()
  const [submitted, setSubmitted] = useState(false)
  if (submitted) return <Navigate replace to="/order-confirmation" />
  if (!lines.length) return <Navigate replace to="/cart" />

  return (
    <div className="container order-page order-page-narrow">
      <OrderHeader title="Checkout" backTo="/cart" backLabel="Back to cart" />
      <div className="checkout-banner">
        <ShoppingBag size={25} aria-hidden="true" />
        <div>
          <h2>Pickup at The Daily Bowl</h2>
          <p>This is a simulated order. No payment details are required.</p>
        </div>
      </div>
      <section className="summary-card surface" aria-labelledby="checkout-summary">
        <h2 id="checkout-summary">Review Your Order</h2>
        <ReceiptItems lines={lines} />
        <OrderTotals subtotal={subtotal} />
      </section>
      <button className="button button-primary button-block place-order" type="button" onClick={() => {
        placeOrder()
        setSubmitted(true)
      }}>
        Place Demo Order <span>{money(subtotal)}</span>
      </button>
    </div>
  )
}

export function Confirmation() {
  const { order } = useCart()
  if (!order) return <Navigate replace to="/menu" />

  return (
    <div className="container order-page order-page-narrow confirmation-page">
      <section className="confirmation-heading">
        <span className="success-icon"><Check size={34} strokeWidth={2.8} aria-hidden="true" /></span>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for ordering from The Daily Bowl.</p>
      </section>
      <section className="confirmation-receipt surface" aria-labelledby="receipt-heading">
        <h2 id="receipt-heading">Order Summary</h2>
        <div className="receipt-status">
          <p>Order #{order.id}</p>
          <span><Check size={14} aria-hidden="true" /> Confirmed</span>
        </div>
        <ReceiptItems lines={order.lines} />
        <OrderTotals subtotal={order.total} paid />
      </section>
      <div className="confirmation-footer">
        <p>Made fresh, just for you!</p>
        <Link className="button button-primary button-block" to="/">Back to Home <ArrowRight size={18} aria-hidden="true" /></Link>
      </div>
    </div>
  )
}
