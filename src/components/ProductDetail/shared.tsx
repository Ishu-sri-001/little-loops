import type { PRODUCTS } from '@/app/products/data'
import * as L from '@/components/icons/lucide'

export type Product = (typeof PRODUCTS)[number]
export type Review = Product['reviews'][number]

export const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`

// Every icon the product and listing pages use, backed by lucide-animated (see components/icons)
const ICONS = {
  arrowLeft: L.ArrowLeft,
  arrowRight: L.ArrowRight,
  chevronDown: L.ChevronDown,
  heart: L.Heart,
  cart: L.ShoppingBag,
  check: L.Check,
  plus: L.Plus,
  minus: L.Minus,
  expand: L.Expand,
  close: L.X,
  play: L.Play,
  truck: L.Truck,
  returns: L.RotateCcw,
  shield: L.ShieldCheck,
  leaf: L.Leaf,
  cloud: L.Feather,
  globe: L.Globe,
  hands: L.HandHeart,
  infinity: L.Sparkles,
  grid: L.LayoutGrid,
  large: L.LayoutPanelTop,
  list: L.List,
  filter: L.SlidersHorizontal,
} as const

export type IconName = keyof typeof ICONS

export const Icon = ({
  name,
  className = 'size-4',
  strokeWidth = 1.5,
  filled,
}: {
  name: IconName
  className?: string
  strokeWidth?: number
  filled?: boolean
}) => {
  const Component = ICONS[name]
  if (Component === L.Minus || Component === L.List) {
    // Static lucide icons (no animated version) take the usual svg props
    return <Component className={className} strokeWidth={strokeWidth} aria-hidden />
  }
  return <Component className={className} strokeWidth={strokeWidth} filled={filled} />
}

const STAR = 'M12 2.8l2.85 5.78 6.37.93-4.61 4.49 1.09 6.35L12 17.35l-5.7 3 1.09-6.35-4.61-4.49 6.37-.93L12 2.8Z'

/** Five stars with partial fill, e.g. 4.5 → four and a half */
export const Stars = ({ rating, className = 'size-3.5' }: { rating: number; className?: string }) => (
  <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => {
      const fill = Math.min(Math.max(rating - i, 0), 1)
      return (
        <span key={i} className={`relative inline-block ${className}`}>
          <svg viewBox="0 0 24 24" className="absolute inset-0 size-full fill-none stroke-current" strokeWidth={1.4}>
            <path d={STAR} />
          </svg>
          <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
            <svg viewBox="0 0 24 24" className={`fill-current ${className}`}>
              <path d={STAR} />
            </svg>
          </span>
        </span>
      )
    })}
  </span>
)

/** Variant label shown in the cart, e.g. "Sage Meadow · Set of 3" */
export const variantLabel = (colorName?: string, optionLabel?: string) =>
  [colorName, optionLabel].filter(Boolean).join(' · ') || undefined

/** Cart line for a quick "add" from a card: first colour and first option */
export const defaultCartItem = (p: Product) => ({
  slug: p.slug,
  name: p.name,
  image: p.cover,
  price: p.price,
  variant: variantLabel(p.colors[0]?.name, p.options?.values[0]?.label),
})
