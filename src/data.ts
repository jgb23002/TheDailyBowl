import { Beer, CakeSlice, CookingPot, Pizza, Sandwich, Soup, Utensils } from 'lucide-react'

export const categories = [
  { id: 'bowls', label: 'Bowls', icon: Soup, image: 'harvest-bowl' },
  { id: 'wraps', label: 'Wraps', icon: Sandwich, image: 'falafel-wrap' },
  { id: 'pizza', label: 'Pizza', icon: Pizza, image: 'margherita-pizza' },
  { id: 'pasta', label: 'Pasta', icon: Utensils, image: 'mushroom-pasta' },
  { id: 'snacks', label: 'Snacks', icon: CookingPot, image: 'hummus-pita' },
  { id: 'drinks', label: 'Drinks', icon: Beer, image: 'mint-lemonade' },
  { id: 'desserts', label: 'Desserts', icon: CakeSlice, image: 'chocolate-brownie' },
] as const

export const diets = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten-free', label: 'Gluten-free' },
] as const

export type Category = (typeof categories)[number]['id']
export type Diet = (typeof diets)[number]['id']

export interface MenuItem {
  id: string
  name: string
  category: Category
  description: string
  price: number
  rating: string
  diets: Diet[]
}

export const menu: MenuItem[] = [
  {
    id: 'harvest-bowl',
    name: 'Harvest Bowl',
    category: 'bowls',
    description: 'Quinoa, roasted vegetables and lemon tahini.',
    price: 1250,
    rating: '4.8',
    diets: ['vegetarian', 'vegan', 'gluten-free'],
  },
  {
    id: 'tofu-rice-bowl',
    name: 'Tofu Rice Bowl',
    category: 'bowls',
    description: 'Brown rice, sesame tofu and crunchy slaw.',
    price: 1300,
    rating: '4.7',
    diets: ['vegetarian', 'vegan', 'gluten-free'],
  },
  {
    id: 'falafel-wrap',
    name: 'Falafel Wrap',
    category: 'wraps',
    description: 'Crispy falafel, fresh greens and tahini in a warm flatbread.',
    price: 950,
    rating: '4.6',
    diets: ['vegetarian', 'vegan'],
  },
  {
    id: 'grilled-veggie-wrap',
    name: 'Grilled Veggie Wrap',
    category: 'wraps',
    description: 'Grilled peppers, zucchini, feta and basil pesto.',
    price: 1000,
    rating: '4.7',
    diets: ['vegetarian'],
  },
  {
    id: 'margherita-pizza',
    name: 'Margherita Pizza',
    category: 'pizza',
    description: 'Tomato, fresh mozzarella and basil on a wood-fired crust.',
    price: 1400,
    rating: '4.8',
    diets: ['vegetarian'],
  },
  {
    id: 'mushroom-pasta',
    name: 'Mushroom Pasta',
    category: 'pasta',
    description: 'Penne, roasted mushrooms and creamy Parmesan sauce.',
    price: 1350,
    rating: '4.7',
    diets: ['vegetarian'],
  },
  {
    id: 'hummus-pita',
    name: 'Hummus & Pita',
    category: 'snacks',
    description: 'Creamy chickpea hummus with warm toasted pita.',
    price: 600,
    rating: '4.6',
    diets: ['vegetarian', 'vegan'],
  },
  {
    id: 'crispy-potato-bites',
    name: 'Crispy Potato Bites',
    category: 'snacks',
    description: 'Golden potatoes with sea salt and a lemon herb dip.',
    price: 550,
    rating: '4.7',
    diets: ['vegetarian', 'vegan', 'gluten-free'],
  },
  {
    id: 'mint-lemonade',
    name: 'Mint Lemonade',
    category: 'drinks',
    description: 'Fresh lemon, mint and sparkling water.',
    price: 400,
    rating: '4.8',
    diets: ['vegetarian', 'vegan', 'gluten-free'],
  },
  {
    id: 'chocolate-brownie',
    name: 'Chocolate Brownie',
    category: 'desserts',
    description: 'Rich, fudgy dark chocolate with a crackly top.',
    price: 450,
    rating: '4.8',
    diets: ['vegetarian'],
  },
]

export const favorite = menu[0]

export interface Ingredient {
  id: string
  name: string
  price: number
}

export const bases: Ingredient[] = [
  { id: 'brown-rice', name: 'Brown rice', price: 0 },
  { id: 'mixed-greens', name: 'Mixed greens', price: 0 },
  { id: 'quinoa', name: 'Quinoa', price: 100 },
]

export const proteins: Ingredient[] = [
  { id: 'chickpeas', name: 'Roasted chickpeas', price: 0 },
  { id: 'tofu', name: 'Sesame tofu', price: 150 },
  { id: 'chicken', name: 'Grilled chicken', price: 250 },
  { id: 'no-protein', name: 'No protein', price: 0 },
]

export const toppings: Ingredient[] = [
  { id: 'cucumber', name: 'Cucumber', price: 0 },
  { id: 'cabbage', name: 'Pickled cabbage', price: 0 },
  { id: 'sweet-potato', name: 'Roasted sweet potato', price: 0 },
  { id: 'tomatoes', name: 'Cherry tomatoes', price: 0 },
  { id: 'broccoli', name: 'Roasted broccoli', price: 0 },
  { id: 'avocado', name: 'Avocado', price: 150 },
]

export const sauces: Ingredient[] = [
  { id: 'tahini', name: 'Lemon tahini', price: 0 },
  { id: 'sesame', name: 'Sesame ginger', price: 0 },
  { id: 'herb', name: 'Green herb dressing', price: 0 },
  { id: 'no-sauce', name: 'No sauce', price: 0 },
]

export const bowlBasePrice = 950
export const includedToppings = 3
export const extraToppingPrice = 75

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export function money(cents: number) {
  return currency.format(cents / 100)
}

export function foodImage(id: string) {
  return `/images/${id}.jpg`
}

export function categoryUrl(id?: Category) {
  return id ? `/menu/${id}` : '/menu'
}
