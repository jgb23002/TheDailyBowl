import { ArrowRight, Leaf, Search, Soup, X } from 'lucide-react'
import { useRef } from 'react'
import { Link, NavLink, useParams, useSearchParams } from 'react-router-dom'
import { FoodCard } from '../components/FoodCard'
import { Brand } from '../components/Layout'
import { categories, categoryUrl, diets, menu, type Diet } from '../data'
import { NotFound } from './NotFound'

export function Menu() {
  const { category } = useParams()
  const [params, setParams] = useSearchParams()
  const searchField = useRef<HTMLInputElement>(null)
  const currentCategory = categories.find(({ id }) => id === category)
  if (category && !currentCategory) return <NotFound />

  const query = params.get('q') ?? ''
  const activeDiets = diets.filter(({ id }) => params.getAll('diet').includes(id)).map(({ id }) => id)
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const results = menu.filter((item) =>
    (!category || item.category === category) &&
    activeDiets.every((diet) => item.diets.includes(diet)) &&
    terms.every((term) => `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(term)),
  )

  function changeSearch(value: string) {
    const next = new URLSearchParams(params)
    if (value) next.set('q', value)
    else next.delete('q')
    setParams(next, { replace: true, preventScrollReset: true })
  }

  function toggleDiet(diet: Diet) {
    const selected = activeDiets.includes(diet)
      ? activeDiets.filter((id) => id !== diet)
      : [...activeDiets, diet]
    const next = new URLSearchParams(params)
    next.delete('diet')
    selected.forEach((id) => next.append('diet', id))
    setParams(next, { preventScrollReset: true })
  }

  function resetFilters() {
    setParams({}, { replace: true, preventScrollReset: true })
    searchField.current?.focus()
  }

  const search = params.toString()
  const categoryLinks = [{ id: undefined, label: 'All' }, ...categories]

  return (
    <div className="container menu-page">
      <div className="mobile-menu-brand"><Brand stacked /></div>
      <div className="menu-intro">
        <div>
          <h1>Our Menu</h1>
          <p>Fresh bowls, wraps, and favorites.</p>
        </div>
        <Link className="button button-outline menu-build-desktop" to="/build-a-bowl">
          <Soup size={20} aria-hidden="true" /> Build Your Own Bowl <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>

      <div className="menu-controls">
        <div className="search-field" role="search">
          <Search size={19} aria-hidden="true" />
          <input
            ref={searchField}
            type="search"
            value={query}
            onChange={(event) => changeSearch(event.target.value)}
            placeholder="Search menu items…"
            aria-label="Search menu items"
          />
          {query && (
            <button className="icon-button" type="button" aria-label="Clear search" onClick={() => {
              changeSearch('')
              searchField.current?.focus()
            }}>
              <X size={18} aria-hidden="true" />
            </button>
          )}
        </div>
        <nav className="category-tabs" aria-label="Menu categories">
          {categoryLinks.map(({ id, label }) => (
            <NavLink end className="category-tab" key={label} to={{ pathname: categoryUrl(id), search }}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="diet-filters" role="group" aria-label="Dietary filters">
          <span className="diet-filter-label"><Leaf size={16} aria-hidden="true" /> Dietary</span>
          {diets.map(({ id, label }) => (
            <button
              type="button"
              className="diet-filter"
              key={id}
              aria-pressed={activeDiets.includes(id)}
              onClick={() => toggleDiet(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <section aria-labelledby="results-heading">
        <div className="menu-results-heading section-heading">
          <h2 id="results-heading">
            {currentCategory?.label ?? (
              <>
                <span className="menu-all-mobile">Our Menu</span>
                <span className="menu-all-desktop">All Items</span>
              </>
            )}
          </h2>
          <div className="menu-results-actions">
            <span role="status">{results.length} {results.length === 1 ? 'item' : 'items'}</span>
            <Link className="menu-build-mobile text-link" to="/build-a-bowl">
              <Soup size={16} aria-hidden="true" /> Build a Bowl
            </Link>
          </div>
        </div>

        {results.length ? (
          <div className="food-grid">{results.map((item) => <FoodCard key={item.id} item={item} />)}</div>
        ) : (
          <div className="menu-empty surface">
            <Search size={30} aria-hidden="true" />
            <h3>No matching items</h3>
            <p>Try a different search or clear your dietary filters.</p>
            <button className="button button-outline" type="button" onClick={resetFilters}>Clear filters</button>
          </div>
        )}
      </section>
    </div>
  )
}
