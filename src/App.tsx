import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { BottomNavigation, CartNotification, Footer, Header } from './components/Layout'
import { categories } from './data'
import { About } from './pages/About'
import { Builder } from './pages/Builder'
import { Home } from './pages/Home'
import { Menu } from './pages/Menu'
import { NotFound } from './pages/NotFound'
import { Cart, Checkout, Confirmation } from './pages/Order'

const pageNames: Record<string, string> = {
  '/about': 'About Us',
  '/menu': 'Our Menu',
  '/build-a-bowl': 'Build Your Own Bowl',
  '/cart': 'Your Cart',
  '/checkout': 'Checkout',
  '/order-confirmation': 'Order Confirmation',
}

export function App() {
  const { pathname } = useLocation()
  const previousPath = useRef(pathname)

  useEffect(() => {
    const categoryName = categories.find(({ id }) => pathname === `/menu/${id}`)?.label
    const name = pageNames[pathname] ?? categoryName ?? 'Page not found'
    document.title = pathname === '/' ? 'The Daily Bowl' : `${name} | The Daily Bowl`
    const from = previousPath.current
    previousPath.current = pathname
    const isMenu = (path: string) => path === '/menu' || path.startsWith('/menu/')
    if (from !== pathname && !(isMenu(from) && isMenu(pathname))) {
      window.scrollTo(0, 0)
      document.getElementById('main-content')?.focus({ preventScroll: true })
    }
  }, [pathname])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu/:category?" element={<Menu />} />
          <Route path="/build-a-bowl" element={<Builder />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<Confirmation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BottomNavigation />
      <CartNotification />
    </>
  )
}
