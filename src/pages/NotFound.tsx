import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="container">
      <section className="empty-state surface">
        <h1>Page not found</h1>
        <p>Find your way back to The Daily Bowl menu.</p>
        <Link className="button button-primary" to="/menu">Explore Menu</Link>
      </section>
    </div>
  )
}
