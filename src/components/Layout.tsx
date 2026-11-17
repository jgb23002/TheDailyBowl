import { CircleCheck, House, Info, ShoppingCart, Utensils, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useCart } from '../cart'

const navigation = [
  { to: '/', label: 'Home', icon: House },
  { to: '/about', label: 'About Us', icon: Info },
  { to: '/menu', label: 'Menu', icon: Utensils },
  { to: '/cart', label: 'Cart', icon: ShoppingCart },
]

export function Brand({ stacked = false }: { stacked?: boolean }) {
  return (
    <Link className={`brand${stacked ? ' brand--stacked' : ''}`} to="/" aria-label="The Daily Bowl home">
      <img className="brand-mark" src="/bowl.svg" alt="" width="44" height="44" />
      <span className="brand-type">
        <span className="brand-name">The Daily Bowl</span>
        <span className="brand-tagline">Fresh • Simple • Delicious</span>
      </span>
    </Link>
  )
}

function CartBadge({ count }: { count: number }) {
  return count > 0 ? <span className="cart-badge" aria-hidden="true">{count > 99 ? '99+' : count}</span> : null
}

export function Header() {
  const { count } = useCart()
  const { pathname } = useLocation()
  const menu = pathname === '/menu' || pathname.startsWith('/menu/')
  const order = pathname === '/cart' || pathname === '/checkout'

  return (
    <header className={`site-header${menu ? ' site-header--menu' : ''}${order ? ' site-header--order' : ''}`}>
      <div className="site-header-inner container">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.slice(0, 3).map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>
          ))}
          <NavLink to="/build-a-bowl">Build a Bowl</NavLink>
        </nav>
        <NavLink className="header-cart" to="/cart" aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}>
          <ShoppingCart size={20} aria-hidden="true" />
          <span className="header-cart-label">Cart</span>
          <CartBadge count={count} />
        </NavLink>
      </div>
    </header>
  )
}

export function BottomNavigation() {
  const { count } = useCart()
  const { pathname } = useLocation()

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {navigation.map(({ to, label, icon: Icon }) => {
        const onNestedPage =
          (to === '/menu' && pathname === '/build-a-bowl') ||
          (to === '/cart' && pathname === '/checkout')
        return (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => (isActive || onNestedPage ? 'active' : undefined)}
            aria-label={to === '/cart' ? `Cart, ${count} ${count === 1 ? 'item' : 'items'}` : undefined}
          >
            <span className="bottom-nav-icon">
              <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
              {to === '/cart' && <CartBadge count={count} />}
            </span>
            <span>{label}</span>
          </NavLink>
        )
      })}
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container flex items-center justify-between gap-4">
        <Brand />
        <p>University design prototype</p>
      </div>
    </footer>
  )
}

export function CartNotification() {
  const { notification, dismissNotification } = useCart()
  return (
    <>
      <div className="sr-only" role="status" aria-atomic="true">
        {notification ? `${notification} added to your cart.` : ''}
      </div>
      {notification && (
        <div className="cart-toast">
          <CircleCheck size={23} aria-hidden="true" />
          <div>
            <strong>Added to cart</strong>
            <p>{notification}</p>
          </div>
          <Link to="/cart" onClick={dismissNotification}>View cart</Link>
          <button className="icon-button" type="button" onClick={dismissNotification} aria-label="Dismiss notification">
            <X size={17} aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  )
}
