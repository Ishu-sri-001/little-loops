'use client'

import { useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLenis } from 'lenis/react'
import {
  CATEGORIES,
  CATEGORY_COVERS,
  COLORS,
  FEATURES,
  MATERIALS,
  OCCASIONS,
  PRICE_MAX,
  PRICE_MIN,
  PRODUCTS,
  productImage,
} from '@/app/products/data'
import { Icon, defaultCartItem, type IconName, type Product } from '@/components/ProductDetail/shared'
import { addToCart, isInCart, removeProductFromCart, toggleWishlist, useStore } from '@/lib/store'

type ColorKey = keyof typeof COLORS

type SortKey = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'name'
type View = 'grid' | 'large' | 'list'

type Filters = {
  categories: string[]
  occasions: string[]
  materials: string[]
  colors: ColorKey[]
  features: string[]
  price: [number, number]
}

const EMPTY_FILTERS: Filters = {
  categories: [],
  occasions: [],
  materials: [],
  colors: [],
  features: [],
  price: [PRICE_MIN, PRICE_MAX],
}

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A – Z' },
]

const PAGE_SIZE: Record<View, number> = { grid: 12, large: 9, list: 8 }
const PRICE_STEP = 50

const toggle = <T,>(list: T[], value: T) =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value]

const matches = <T,>(selected: T[], value: T) => selected.length === 0 || selected.includes(value)

const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`

const count = (test: (p: Product) => boolean) => PRODUCTS.filter(test).length

// Any selected value matching any of the product's values (or nothing selected)
const overlaps = <T,>(selected: T[], values: T[]) =>
  selected.length === 0 || values.some((v) => selected.includes(v))

const getPages = (current: number, total: number): (number | '…')[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 4) return [1, 2, 3, 4, 5, '…', total]
  if (current >= total - 3) return [1, '…', total - 4, total - 3, total - 2, total - 1, total]
  return [1, '…', current - 1, current, current + 1, '…', total]
}

/* ---------- Filter building blocks ---------- */

const FilterSection = ({ title, children }: { title: string; children: ReactNode }) => {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-b border-foreground/10 py-5 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between text-sm font-medium"
      >
        {title}
        <Icon name="chevronDown" className={`size-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="pt-4">{children}</div>
        </div>
      </div>
    </div>
  )
}

const Checkbox = ({
  label,
  checked,
  onChange,
  count,
}: {
  label: string
  checked: boolean
  onChange: () => void
  count?: number
}) => (
  <label className="flex cursor-pointer items-center gap-3 py-1 text-[13px] tracking-wide text-foreground/80 hover:text-foreground">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="size-4 shrink-0 cursor-pointer rounded-sm accent-foreground"
    />
    <span>
      {label}
      {count !== undefined && <span className="text-foreground/55"> ({count})</span>}
    </span>
  </label>
)

const PriceRange = ({
  value,
  onChange,
}: {
  value: [number, number]
  onChange: (value: [number, number]) => void
}) => {
  const [min, max] = value
  const left = ((min - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100
  const right = 100 - ((max - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100
  const thumb =
    'pointer-events-none absolute inset-0 h-4 w-full appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-foreground [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground'

  return (
    <div>
      <div className="relative h-4">
        <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded bg-foreground/15" />
        <div
          className="absolute top-1/2 h-0.5 -translate-y-1/2 rounded bg-foreground"
          style={{ left: `${left}%`, right: `${right}%` }}
        />
        <input
          type="range"
          aria-label="Minimum price"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={PRICE_STEP}
          value={min}
          onChange={(e) => onChange([Math.min(Number(e.target.value), max - PRICE_STEP), max])}
          className={thumb}
        />
        <input
          type="range"
          aria-label="Maximum price"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={PRICE_STEP}
          value={max}
          onChange={(e) => onChange([min, Math.max(Number(e.target.value), min + PRICE_STEP)])}
          className={thumb}
        />
      </div>
      <div className="mt-3 flex justify-between text-xs text-foreground/70">
        <span>{formatPrice(min)}</span>
        <span>{formatPrice(max)}</span>
      </div>
    </div>
  )
}

/* ---------- Product card ---------- */

const ProductCard = ({
  product,
  view,
  wishlisted,
  inCart,
  onWishlist,
  onCart,
}: {
  product: Product
  view: View
  wishlisted: boolean
  inCart: boolean
  onWishlist: () => void
  onCart: () => void
}) => {
  const isList = view === 'list'
  return (
    <article
      className={`group relative overflow-hidden rounded-md bg-highlight/50 transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgba(95,75,62,0.45)] ${
        isList ? 'flex gap-5' : 'flex flex-col'
      }`}
    >
      <div
        className={`relative shrink-0 overflow-hidden bg-neutral ${
          isList ? 'aspect-square w-36 sm:w-48' : 'aspect-[4/3]'
        }`}
      >
        <Link href={`/products/${product.slug}`} tabIndex={-1} aria-hidden>
          <Image
            src={productImage(product.cover)}
            alt={product.name}
            fill
            sizes={isList ? '200px' : '(min-width: 1280px) 22vw, (min-width: 768px) 33vw, 50vw'}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        {product.badge && (
          <span className="absolute top-3 left-3 rounded bg-clean/90 px-2.5 py-1 text-[11px] font-medium tracking-wide">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          onClick={onWishlist}
          aria-pressed={wishlisted}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className="absolute top-2.5 right-2.5 grid size-8 cursor-pointer place-items-center rounded-full text-foreground transition-transform hover:scale-110"
        >
          <Icon name="heart" filled={wishlisted} className={`size-5 transition-colors ${wishlisted ? 'text-accent' : '[&_svg]:fill-clean/40'}`} />
        </button>
      </div>

      <div className={`flex flex-1 flex-col ${isList ? 'justify-center py-4 pr-5' : 'p-3.5 pt-3'}`}>
        <div className="flex gap-1.5">
          {product.colorKeys.map((c) => (
            <span
              key={c}
              title={COLORS[c].label}
              className="size-3 rounded-full border border-foreground/15"
              style={{ backgroundColor: COLORS[c].hex }}
            />
          ))}
        </div>
        <h3 className="mt-3 font-display text-lg leading-tight">
          <Link href={`/products/${product.slug}`} className="underline-offset-4 hover:underline">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-xs tracking-wide text-foreground/65">{product.subtitle}</p>
        {isList && (
          <p className="mt-2 text-xs tracking-wide text-foreground/65">
            {product.category} · {product.material} · {product.features.join(', ')}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-base">
            {product.options && product.fromPrice !== product.price && (
              <span className="mr-1 text-xs text-foreground/60">From</span>
            )}
            {formatPrice(product.fromPrice)}
          </span>
          <button
            type="button"
            onClick={onCart}
            aria-pressed={inCart}
            aria-label={inCart ? `Remove ${product.name} from cart` : `Add ${product.name} to cart`}
            className={`grid size-9 cursor-pointer place-items-center rounded-full border transition-colors duration-300 ${
              inCart
                ? 'border-foreground bg-foreground text-clean'
                : 'border-foreground/40 hover:border-foreground hover:bg-foreground hover:text-clean'
            }`}
          >
            <Icon name={inCart ? 'check' : 'cart'} />
          </button>
        </div>
      </div>
    </article>
  )
}

/* ---------- Listing ---------- */

const ProductListing = ({ initialCategory }: { initialCategory?: string }) => {
  const [filters, setFilters] = useState<Filters>(() =>
    initialCategory && CATEGORIES.includes(initialCategory)
      ? { ...EMPTY_FILTERS, categories: [initialCategory] }
      : EMPTY_FILTERS
  )
  const [sort, setSort] = useState<SortKey>('featured')
  const [view, setView] = useState<View>('grid')
  const [page, setPage] = useState(1)
  const store = useStore()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const listingRef = useRef<HTMLElement>(null)
  const categoryTrackRef = useRef<HTMLDivElement>(null)
  const lenis = useLenis()

  // Every filter change starts again from page 1
  const updateFilters = (patch: Partial<Filters>) => {
    setFilters((f) => ({ ...f, ...patch }))
    setPage(1)
  }
  const clearAll = () => {
    setFilters(EMPTY_FILTERS)
    setPage(1)
  }

  const filtered = PRODUCTS.filter(
    (p) =>
      matches(filters.categories, p.category) &&
      overlaps(filters.occasions, p.occasions) &&
      matches(filters.materials, p.material) &&
      overlaps(filters.colors, p.colorKeys) &&
      overlaps(filters.features, p.features) &&
      p.fromPrice >= filters.price[0] &&
      p.fromPrice <= filters.price[1]
  ).sort((a, b) => {
    switch (sort) {
      case 'newest':
        return b.addedAt - a.addedAt
      case 'price-asc':
        return a.fromPrice - b.fromPrice
      case 'price-desc':
        return b.fromPrice - a.fromPrice
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return b.popularity - a.popularity
    }
  })

  const pageSize = PAGE_SIZE[view]
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const activeFilterCount =
    filters.categories.length +
    filters.occasions.length +
    filters.materials.length +
    filters.colors.length +
    filters.features.length +
    (filters.price[0] !== PRICE_MIN || filters.price[1] !== PRICE_MAX ? 1 : 0)

  const goToPage = (next: number) => {
    setPage(Math.min(Math.max(1, next), totalPages))
    const el = listingRef.current
    if (!el) return
    if (lenis) lenis.scrollTo(el, { offset: -24 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  const selectCategoryPill = (category: string | null) =>
    updateFilters({ categories: category ? [category] : [] })

  const filterPanel = (
    <>
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-sm font-medium">Filters</h2>
        <button
          type="button"
          onClick={clearAll}
          disabled={activeFilterCount === 0}
          className="cursor-pointer text-xs text-foreground/70 underline underline-offset-4 transition-colors hover:text-accent disabled:cursor-default disabled:opacity-40 disabled:hover:text-foreground/70"
        >
          Clear All
        </button>
      </div>

      <FilterSection title="Category">
        <Checkbox
          label="All Products"
          count={PRODUCTS.length}
          checked={filters.categories.length === 0}
          onChange={() => updateFilters({ categories: [] })}
        />
        {CATEGORIES.map((c) => (
          <Checkbox
            key={c}
            label={c}
            count={count((p) => p.category === c)}
            checked={filters.categories.includes(c)}
            onChange={() => updateFilters({ categories: toggle(filters.categories, c) })}
          />
        ))}
      </FilterSection>

      <FilterSection title="Perfect For">
        {OCCASIONS.map((o) => (
          <Checkbox
            key={o}
            label={o}
            count={count((p) => p.occasions.includes(o))}
            checked={filters.occasions.includes(o)}
            onChange={() => updateFilters({ occasions: toggle(filters.occasions, o) })}
          />
        ))}
      </FilterSection>

      <FilterSection title="Material">
        {MATERIALS.map((m) => (
          <Checkbox
            key={m}
            label={m}
            count={count((p) => p.material === m)}
            checked={filters.materials.includes(m)}
            onChange={() => updateFilters({ materials: toggle(filters.materials, m) })}
          />
        ))}
      </FilterSection>

      <FilterSection title="Color">
        <div className="grid grid-cols-5 gap-3">
          {(Object.keys(COLORS) as ColorKey[]).map((c) => {
            const selected = filters.colors.includes(c)
            return (
              <button
                key={c}
                type="button"
                title={COLORS[c].label}
                aria-label={COLORS[c].label}
                aria-pressed={selected}
                onClick={() => updateFilters({ colors: toggle(filters.colors, c) })}
                className={`size-7 cursor-pointer rounded-full border border-foreground/20 ring-offset-2 ring-offset-background transition-shadow ${
                  selected ? 'ring-2 ring-foreground' : 'hover:ring-1 hover:ring-foreground/40'
                }`}
                style={{ backgroundColor: COLORS[c].hex }}
              />
            )
          })}
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <PriceRange value={filters.price} onChange={(price) => updateFilters({ price })} />
      </FilterSection>

      <FilterSection title="Features">
        {FEATURES.map((f) => (
          <Checkbox
            key={f}
            label={f}
            count={count((p) => p.features.includes(f))}
            checked={filters.features.includes(f)}
            onChange={() => updateFilters({ features: toggle(filters.features, f) })}
          />
        ))}
      </FilterSection>
    </>
  )

  const viewButtons: { value: View; label: string; icon: IconName }[] = [
    { value: 'grid', label: 'Grid view', icon: 'grid' },
    { value: 'large', label: 'Large grid view', icon: 'large' },
    { value: 'list', label: 'List view', icon: 'list' },
  ]

  const pillCategories: (string | null)[] = [null, ...CATEGORIES]

  return (
    <section
      ref={listingRef}
      className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 text-foreground sm:px-8 lg:grid-cols-[220px_1fr] lg:gap-10 lg:px-16"
    >
      {/* Desktop sidebar */}
      <aside className="hidden lg:block lg:border-r lg:border-foreground/10 lg:pr-8">{filterPanel}</aside>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${drawerOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!drawerOpen}
      >
        <div
          onClick={() => setDrawerOpen(false)}
          className={`absolute inset-0 bg-foreground/30 transition-opacity duration-300 ${drawerOpen ? 'opacity-100' : 'opacity-0'}`}
        />
        <div
          data-lenis-prevent
          className={`absolute inset-y-0 left-0 w-[85%] max-w-sm overflow-y-auto bg-background p-6 shadow-xl transition-transform duration-300 ${
            drawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close filters"
            className="mb-4 ml-auto grid size-9 cursor-pointer place-items-center rounded-full border border-foreground/30"
          >
            <Icon name="close" />
          </button>
          {filterPanel}
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="mt-6 w-full cursor-pointer rounded-full bg-foreground py-3 text-sm text-clean"
          >
            Show {filtered.length} products
          </button>
        </div>
      </div>

      <div className="min-w-0">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-foreground/30 px-4 py-2 text-sm lg:hidden"
            >
              <Icon name="filter" />
              Filters{activeFilterCount > 0 && ` (${activeFilterCount})`}
            </button>
            <p className="text-sm text-foreground/70">
              {filtered.length} {filtered.length === 1 ? 'Product' : 'Products'}
            </p>
          </div>

          <div className="flex items-center gap-5">
            <label className="flex items-center gap-3 text-sm text-foreground/70">
              <span className="hidden sm:inline">Sort by:</span>
              <span className="relative">
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value as SortKey)
                    setPage(1)
                  }}
                  className="cursor-pointer appearance-none rounded-md border border-foreground/20 bg-highlight/50 py-2 pr-9 pl-3 text-sm text-foreground outline-none focus:border-foreground/50"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <Icon
                  name="chevronDown"
                  className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2"
                />
              </span>
            </label>

            <div className="flex items-center gap-1" role="group" aria-label="Layout">
              {viewButtons.map((b) => (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => setView(b.value)}
                  aria-label={b.label}
                  aria-pressed={view === b.value}
                  className={`grid size-9 cursor-pointer place-items-center rounded-md transition-colors ${
                    view === b.value ? 'border border-foreground/30 bg-highlight' : 'text-foreground/60 hover:text-foreground'
                  }`}
                >
                  <Icon name={b.icon} className="size-5" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category pills */}
        <div className="mt-8 flex items-start gap-4">
          <div
            ref={categoryTrackRef}
            className="flex min-w-0 flex-1 gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {pillCategories.map((c) => {
              const cover = CATEGORY_COVERS[(c ?? 'All') as keyof typeof CATEGORY_COVERS]
              const active = c === null ? filters.categories.length === 0 : filters.categories.length === 1 && filters.categories[0] === c
              return (
                <button
                  key={c ?? 'all'}
                  type="button"
                  onClick={() => selectCategoryPill(c)}
                  aria-pressed={active}
                  className="group flex shrink-0 cursor-pointer flex-col items-center gap-3"
                >
                  <span
                    className={`relative block size-20 overflow-hidden rounded-full bg-highlight ring-offset-4 ring-offset-background transition-shadow sm:size-24 ${
                      active ? 'ring-1 ring-foreground' : 'group-hover:ring-1 group-hover:ring-foreground/30'
                    }`}
                  >
                    <Image
                      src={productImage(cover)}
                      alt=""
                      fill
                      sizes="96px"
                      className={`transition-transform duration-500 group-hover:scale-110 ${
                        cover.endsWith('transparent') ? 'object-contain p-2' : 'object-cover'
                      }`}
                    />
                  </span>
                  <span
                    className={`max-w-24 border-b pb-1 text-center text-sm leading-tight tracking-wide transition-colors ${
                      active ? 'border-foreground font-medium' : 'border-transparent text-foreground/70'
                    }`}
                  >
                    {c ?? 'All'}
                  </span>
                </button>
              )
            })}
          </div>
          <button
            type="button"
            aria-label="Scroll categories"
            onClick={() => categoryTrackRef.current?.scrollBy({ left: 240, behavior: 'smooth' })}
            className="mt-7 hidden size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-foreground/40 transition-colors hover:bg-foreground hover:text-clean sm:grid xl:hidden"
          >
            <Icon name="arrowRight" />
          </button>
        </div>

        {/* Products */}
        {visible.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-md bg-highlight/50 py-24 text-center">
            <p className="font-display text-2xl">Nothing matches those filters.</p>
            <p className="text-sm text-foreground/70">Try loosening a filter or two.</p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-2 cursor-pointer rounded-full border border-foreground/60 px-6 py-2.5 text-sm transition-colors hover:bg-foreground hover:text-clean"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div
            className={`mt-8 grid gap-5 ${
              view === 'grid'
                ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                : view === 'large'
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1 xl:grid-cols-2'
            }`}
          >
            {visible.map((p) => (
              <ProductCard
                key={p.slug}
                product={p}
                view={view}
                wishlisted={store.wishlist.includes(p.slug)}
                inCart={isInCart(store, p.slug)}
                onWishlist={() => toggleWishlist(p.slug)}
                onCart={() => (isInCart(store, p.slug) ? removeProductFromCart(p.slug) : addToCart(defaultCartItem(p)))}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="grid size-10 cursor-pointer place-items-center rounded-full border border-foreground/30 transition-colors hover:bg-foreground hover:text-clean disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-foreground"
            >
              <Icon name="arrowLeft" />
            </button>
            {getPages(currentPage, totalPages).map((p, i) =>
              p === '…' ? (
                <span key={`gap-${i}`} className="px-1 text-sm text-foreground/60">
                  …
                </span>
              ) : (
                <button
                  key={p}
                  type="button"
                  onClick={() => goToPage(p)}
                  aria-current={p === currentPage ? 'page' : undefined}
                  className={`grid size-10 cursor-pointer place-items-center rounded-full text-sm transition-colors ${
                    p === currentPage ? 'bg-foreground text-clean' : 'hover:bg-neutral'
                  }`}
                >
                  {p}
                </button>
              )
            )}
            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="grid size-10 cursor-pointer place-items-center rounded-full border border-foreground/30 transition-colors hover:bg-foreground hover:text-clean disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-foreground"
            >
              <Icon name="arrowRight" />
            </button>
          </nav>
        )}
      </div>
    </section>
  )
}

export default ProductListing
