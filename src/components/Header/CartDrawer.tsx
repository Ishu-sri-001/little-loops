'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, Minus, Plus, ShoppingBag, X } from '@/components/icons/lucide'
import { PRODUCTS, productImage } from '@/app/products/data'
import { defaultCartItem, formatPrice } from '@/components/ProductDetail/shared'
import {
  MAX_QTY,
  addToCart,
  cartCount,
  cartSubtotal,
  isInCart,
  removeFromCart,
  setQty,
  toggleWishlist,
  useStore,
} from '@/lib/store'

export type DrawerTab = 'cart' | 'wishlist'

const FREE_SHIPPING_AT = 999

const CartDrawer = ({
  tab,
  onTabChange,
  onClose,
}: {
  tab: DrawerTab
  onTabChange: (tab: DrawerTab) => void
  onClose: () => void
}) => {
  const store = useStore()
  const count = cartCount(store)
  const subtotal = cartSubtotal(store)
  const wishlist = store.wishlist
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter((p) => p !== undefined)
  const toFreeShipping = Math.max(0, FREE_SHIPPING_AT - subtotal)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={tab === 'cart' ? 'Your cart' : 'Your wishlist'}
      className="fixed inset-0 z-50"
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-[2px]" onClick={onClose} />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-background text-foreground shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-foreground/10 px-6 pt-6">
          <div role="tablist" className="flex gap-6">
            {(
              [
                ['cart', `Cart (${count})`],
                ['wishlist', `Wishlist (${wishlist.length})`],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tab === id}
                onClick={() => onTabChange(id)}
                className={`-mb-px cursor-pointer border-b-2 pb-4 font-display text-lg transition-colors ${
                  tab === id ? 'border-foreground' : 'border-transparent text-foreground/55 hover:text-foreground'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            aria-label="Close"
            className="-mt-4 grid size-9 cursor-pointer place-items-center rounded-full hover:bg-neutral"
          >
            <X strokeWidth={1.4} className="size-5" />
          </button>
        </div>

        {tab === 'cart' ? (
          store.cart.length === 0 ? (
            <Empty icon={<ShoppingBag strokeWidth={1.2} className="size-10" />} text="Your cart is waiting for something handmade." onClose={onClose} />
          ) : (
            <>
              <div className="px-6 pt-5">
                <p className="text-xs text-foreground/70">
                  {toFreeShipping > 0
                    ? `Add ${formatPrice(toFreeShipping)} more for free shipping`
                    : 'You’ve unlocked free shipping ♡'}
                </p>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-neutral">
                  <div
                    className="h-full rounded-full bg-secondary transition-[width] duration-500"
                    style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100)}%` }}
                  />
                </div>
              </div>

              <ul data-lenis-prevent className="flex-1 divide-y divide-foreground/10 overflow-y-auto px-6">
                {store.cart.map((item) => (
                  <li key={item.key} className="flex gap-4 py-5">
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={onClose}
                      className="relative size-20 shrink-0 overflow-hidden rounded-md bg-neutral"
                    >
                      <Image src={productImage(item.image)} alt={item.name} fill sizes="80px" className="object-cover" />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <Link href={`/products/${item.slug}`} onClick={onClose} className="block truncate font-display text-base hover:underline">
                            {item.name}
                          </Link>
                          {item.variant && <p className="mt-0.5 text-xs text-foreground/60">{item.variant}</p>}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.key)}
                          aria-label={`Remove ${item.name}`}
                          className="cursor-pointer text-foreground/50 hover:text-foreground"
                        >
                          <X strokeWidth={1.4} className="size-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center rounded-full border border-foreground/25">
                          <button
                            type="button"
                            onClick={() => setQty(item.key, item.qty - 1)}
                            aria-label="Decrease quantity"
                            className="grid size-8 cursor-pointer place-items-center"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm" aria-live="polite">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(item.key, item.qty + 1)}
                            disabled={item.qty >= MAX_QTY}
                            aria-label="Increase quantity"
                            className="grid size-8 cursor-pointer place-items-center disabled:opacity-30"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <span className="text-sm">{formatPrice(item.price * item.qty)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-foreground/10 px-6 py-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-foreground/70">Subtotal</span>
                  <span className="font-display text-2xl">{formatPrice(subtotal)}</span>
                </div>
                <p className="mt-1 text-xs text-foreground/55">Taxes included. Shipping calculated at checkout.</p>
                <button
                  type="button"
                  disabled
                  title="Checkout isn’t connected yet"
                  className="mt-5 h-12 w-full cursor-not-allowed rounded-full bg-foreground text-sm tracking-[0.2em] text-clean uppercase opacity-60"
                >
                  Checkout coming soon
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 w-full cursor-pointer text-sm text-foreground/70 underline underline-offset-4 hover:text-foreground"
                >
                  Continue shopping
                </button>
              </div>
            </>
          )
        ) : wishlist.length === 0 ? (
          <Empty icon={<Heart strokeWidth={1.2} className="size-10" />} text="Tap the heart on any piece to save it here." onClose={onClose} />
        ) : (
          <ul data-lenis-prevent className="flex-1 divide-y divide-foreground/10 overflow-y-auto px-6">
            {wishlist.map((p) => {
              const inCart = isInCart(store, p.slug)
              return (
                <li key={p.slug} className="flex gap-4 py-5">
                  <Link href={`/products/${p.slug}`} onClick={onClose} className="relative size-20 shrink-0 overflow-hidden rounded-md bg-neutral">
                    <Image src={productImage(p.cover)} alt={p.name} fill sizes="80px" className="object-cover" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <Link href={`/products/${p.slug}`} onClick={onClose} className="truncate font-display text-base hover:underline">
                        {p.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => toggleWishlist(p.slug)}
                        aria-label={`Remove ${p.name} from wishlist`}
                        className="cursor-pointer text-accent"
                      >
                        <Heart strokeWidth={1.4} filled className="size-4" />
                      </button>
                    </div>
                    <p className="mt-0.5 text-xs text-foreground/60">{p.category}</p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <span className="text-sm">{formatPrice(p.price)}</span>
                      <button
                        type="button"
                        onClick={() => addToCart(defaultCartItem(p))}
                        className="cursor-pointer rounded-full border border-foreground/40 px-4 py-1.5 text-xs transition-colors hover:bg-foreground hover:text-clean"
                      >
                        {inCart ? 'Add another' : 'Add to cart'}
                      </button>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </aside>
    </div>
  )
}

const Empty = ({ icon, text, onClose }: { icon: React.ReactNode; text: string; onClose: () => void }) => (
  <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center text-foreground/70">
    {icon}
    <p className="max-w-60 text-sm">{text}</p>
    <Link
      href="/products"
      onClick={onClose}
      className="mt-2 rounded-full border border-foreground/60 px-6 py-2.5 text-sm text-foreground transition-colors hover:bg-foreground hover:text-clean"
    >
      Browse products
    </Link>
  </div>
)

export default CartDrawer
