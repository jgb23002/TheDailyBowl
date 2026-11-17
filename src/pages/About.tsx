import { ArrowRight, Heart, Leaf, Sprout } from 'lucide-react'
import { Link } from 'react-router-dom'
import { foodImage } from '../data'

const values = [
  { name: 'Fresh Ingredients', description: 'Seasonal produce and whole grains in every bowl.', icon: Sprout },
  { name: 'Made with Love', description: 'Meals prepared with care, from the first chop to the final drizzle.', icon: Heart },
  { name: 'Healthy Choices', description: 'Balanced options with plenty of room for your tastes.', icon: Leaf },
]

export function About() {
  return (
    <div className="container about-page">
      <section className="story">
        <div className="story-heading">
          <h1>Our Story</h1>
          <p>Good food from fresh, simple ingredients.</p>
        </div>
        <img className="story-photo" src={foodImage('our-story')} width="620" height="620" alt="Hands holding a bowl of fresh greens, roasted vegetables and chickpeas" />
        <div className="story-details">
          <p>At The Daily Bowl, we believe great food starts with fresh ingredients and a passion for healthy living. Our mission is to make nutritious, delicious meals accessible to everyone.</p>
          <p>From wholesome grain bowls to flavorful wraps and freshly prepared favorites, we bring the same care to every dish on the menu.</p>
        </div>
      </section>

      <section className="values" aria-labelledby="values-title">
        <h2 id="values-title">Our Values</h2>
        <div className="value-grid">
          {values.map(({ name, description, icon: Icon }) => (
            <article key={name} className="value-card surface">
              <span className="value-icon"><Icon size={22} aria-hidden="true" /></span>
              <div>
                <h3>{name}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-cta" aria-labelledby="hungry-title">
        <div>
          <h2 id="hungry-title">Hungry Yet?</h2>
          <p>Explore our menu and find your next favorite meal.</p>
        </div>
        <Link className="button button-primary" to="/menu">Explore Our Menu <ArrowRight size={18} aria-hidden="true" /></Link>
      </section>
    </div>
  )
}
