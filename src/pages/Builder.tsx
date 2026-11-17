import { useState } from 'react'
import { ArrowLeft, Plus, Soup } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../cart'
import {
  bases, bowlBasePrice, extraToppingPrice, foodImage, includedToppings, money, proteins, sauces,
  toppings, type Ingredient,
} from '../data'

interface IngredientGroupProps {
  title: string
  group: string
  description: string
  ingredients: Ingredient[]
  selected: string[]
  onSelect: (ingredient: Ingredient) => void
  multiple?: boolean
}

function IngredientGroup({
  title, group, description, ingredients, selected, onSelect, multiple = false,
}: IngredientGroupProps) {
  return (
    <fieldset className="ingredient-group surface" aria-describedby={`${group}-description`}>
      <legend>{title}</legend>
      <p id={`${group}-description`}>{description}</p>
      <div className="ingredient-grid">
        {ingredients.map((ingredient) => (
          <label className="ingredient-option" key={ingredient.id}>
            <input
              type={multiple ? 'checkbox' : 'radio'}
              name={group}
              value={ingredient.id}
              checked={selected.includes(ingredient.id)}
              onChange={() => onSelect(ingredient)}
            />
            <span>{ingredient.name}</span>
            {ingredient.price > 0 && <small>+{money(ingredient.price)}</small>}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function Builder() {
  const [base, setBase] = useState(bases[0])
  const [protein, setProtein] = useState(proteins[0])
  const [selectedToppings, setSelectedToppings] = useState<string[]>([])
  const [sauce, setSauce] = useState(sauces[0])
  const { add, lines } = useCart()

  const chosenToppings = toppings.filter(({ id }) => selectedToppings.includes(id))
  const extraToppings = Math.max(0, chosenToppings.filter(({ price }) => price === 0).length - includedToppings)
  const toppingCost = chosenToppings.reduce((sum, topping) => sum + topping.price, 0) + extraToppings * extraToppingPrice
  const price = bowlBasePrice + base.price + protein.price + sauce.price + toppingCost
  const ingredients = [base, protein, ...chosenToppings, sauce]
  const id = `custom:${ingredients.map((ingredient) => ingredient.id).join(':')}`
  const atLimit = lines.some((line) => line.id === id && line.quantity >= 99)

  function toggleTopping(ingredient: Ingredient) {
    setSelectedToppings((current) => current.includes(ingredient.id)
      ? current.filter((item) => item !== ingredient.id)
      : [...current, ingredient.id],
    )
  }

  function addBowl() {
    add({
      id,
      name: 'Build Your Own Bowl',
      description: ingredients.map((ingredient) => ingredient.name).join(' · '),
      image: 'custom-bowl',
      price,
      custom: true,
    })
  }

  return (
    <div className="container builder-page">
      <Link className="text-link back-link" to="/menu"><ArrowLeft size={17} aria-hidden="true" /> Back to menu</Link>
      <div className="page-heading">
        <h1>Build Your Own Bowl</h1>
        <p>Make it yours, starting at {money(bowlBasePrice)}.</p>
      </div>
      <div className="builder-layout">
        <form className="builder-form" id="bowl-builder" onSubmit={(event) => {
          event.preventDefault()
          addBowl()
        }}>
          <IngredientGroup title="Base" group="base" description="Choose one base." ingredients={bases} selected={[base.id]} onSelect={setBase} />
          <IngredientGroup title="Protein" group="protein" description="Choose one option." ingredients={proteins} selected={[protein.id]} onSelect={setProtein} />
          <IngredientGroup
            title="Toppings"
            group="toppings"
            description={`Choose up to ${includedToppings} standard toppings with your bowl. Extra standard toppings are ${money(extraToppingPrice)} each.`}
            ingredients={toppings}
            selected={selectedToppings}
            onSelect={toggleTopping}
            multiple
          />
          <IngredientGroup title="Sauce" group="sauce" description="Choose one option." ingredients={sauces} selected={[sauce.id]} onSelect={setSauce} />
        </form>
        <aside className="builder-summary surface" aria-labelledby="your-bowl">
          <img src={foodImage('custom-bowl')} width="620" height="620" alt="" />
          <div className="builder-summary-body">
            <h2 id="your-bowl"><Soup size={23} aria-hidden="true" /> Your bowl</h2>
            <ul>
              {ingredients.map((ingredient) => <li key={ingredient.id}>{ingredient.name}</li>)}
            </ul>
            {extraToppings > 0 && <p className="extra-toppings">{extraToppings} extra {extraToppings === 1 ? 'topping' : 'toppings'} · {money(extraToppings * extraToppingPrice)}</p>}
          </div>
          <div className="builder-actions">
            <div>
              <span>Live total</span>
              <output aria-label="Bowl price">{money(price)}</output>
            </div>
            <button className="button button-primary" type="submit" form="bowl-builder" disabled={atLimit}>
              <Plus size={17} aria-hidden="true" /> {atLimit ? 'Cart limit reached' : 'Add Bowl to Cart'}
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
