import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AddToCartButton } from '../components/FoodCard'
import { categories, categoryUrl, favorite, foodImage, money } from '../data'

export function Home() {
  return (
    <div className="container home-page">
      <section className="home-hero" aria-labelledby="hero-title">
        <img
          className="hero-image"
          src={foodImage('hero')}
          srcSet={`${foodImage('hero-small')} 800w, ${foodImage('hero')} 1536w`}
          sizes="(min-width: 1240px) 900px, (min-width: 800px) 72vw, 94vw"
          alt=""
          width="1536"
          height="1024"
          fetchPriority="high"
        />
        <div className="hero-content">
          <h1 id="hero-title">Fresh Bowls.<br className="desktop-break" /> Better Days.</h1>
          <p>Wholesome ingredients. Made fresh every day.</p>
          <Link className="button hero-button" to="/menu">
            Explore Menu <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="home-categories" aria-labelledby="categories-title">
        <div className="section-heading">
          <h2 id="categories-title">What Are You Craving?</h2>
          <Link className="text-link category-more" to="/menu">View full menu <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className="category-grid">
          {categories.slice(0, 4).map(({ id, label, image, icon: Icon }) => (
            <Link className="category-card surface" key={id} to={categoryUrl(id)}>
              <img src={foodImage(image)} width="414" height="414" alt="" />
              <span><Icon size={18} aria-hidden="true" /> {label} <ArrowRight className="category-arrow" size={17} aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </section>

      <div className="home-features">
        <section aria-labelledby="favorite-title">
          <h2 id="favorite-title">Today’s Favorite</h2>
          <article className="favorite-card surface">
            <img src={foodImage(favorite.id)} width="414" height="414" alt="" loading="lazy" />
            <div className="favorite-content">
              <h3>{favorite.name}</h3>
              <p>{favorite.description}</p>
              <div className="favorite-actions">
                <strong>{money(favorite.price)}</strong>
                <AddToCartButton item={favorite} featured />
              </div>
            </div>
          </article>
        </section>

        <section className="builder-promo" aria-labelledby="builder-promo-title">
          <div>
            <h2 id="builder-promo-title">Build Your Own Bowl</h2>
            <p>Choose your base, protein, toppings, and sauce.</p>
            <Link className="text-link" to="/build-a-bowl">Start building <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          <img src={foodImage('custom-bowl')} width="620" height="620" alt="" loading="lazy" />
        </section>
      </div>
    </div>
  )
}
