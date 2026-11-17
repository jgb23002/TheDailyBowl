import { Plus, Star } from 'lucide-react'
import { menuProduct, useCart } from '../cart'
import { categories, diets, foodImage, money, type MenuItem } from '../data'

export function AddToCartButton({ item, featured = false }: { item: MenuItem; featured?: boolean }) {
  const { add, lines } = useCart()
  const atLimit = lines.some((line) => line.id === item.id && line.quantity >= 99)
  return (
    <button
      className={`button button-primary${featured ? ' button-small' : ' button-block'}`}
      type="button"
      onClick={() => add(menuProduct(item))}
      aria-label={featured ? `Order ${item.name} now` : `Add ${item.name} to cart`}
      disabled={atLimit}
    >
      {!featured && <Plus size={17} aria-hidden="true" />}
      {atLimit ? 'Cart limit reached' : featured ? 'Order Now' : 'Add to Cart'}
    </button>
  )
}

export function FoodCard({ item }: { item: MenuItem }) {
  const category = categories.find(({ id }) => id === item.category)
  const dietLabels = diets.filter(({ id }) => item.diets.includes(id)).map(({ label }) => label)

  return (
    <article className="food-card surface">
      <div className="food-card-main">
        <img className="food-card-photo" src={foodImage(item.id)} width="414" height="414" alt="" loading="lazy" />
        <div className="food-card-content">
          <div className="food-card-name">
            <h3>{item.name}</h3>
            <span className="food-rating" aria-label={`Demo rating ${item.rating} out of 5`}>
              <Star size={13} fill="currentColor" aria-hidden="true" /> {item.rating}
            </span>
          </div>
          <p>{item.description}</p>
          <div className="food-card-details">
            <strong>{money(item.price)}</strong>
            <span className="food-category">{category?.label}</span>
          </div>
          <p className="food-diet-label">{dietLabels.join(' · ')}</p>
        </div>
      </div>
      <AddToCartButton item={item} />
    </article>
  )
}
