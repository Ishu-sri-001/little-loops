'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { COLORS, productImage } from '@/app/products/data'
import { MAX_QTY, addToCart, toggleWishlist, useStore } from '@/lib/store'
import { Icon, Stars, formatPrice, variantLabel, type Product } from './shared'

const PERKS = [
  { icon: 'truck', title: 'Free shipping', text: 'on orders above ₹999' },
  { icon: 'returns', title: 'Easy returns', text: 'within 14 days' },
  { icon: 'shield', title: 'Secure payments', text: '100% safe & reliable' },
] as const

const ProductHero = ({ product }: { product: Product }) => {
  const images = product.images
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [colorIndex, setColorIndex] = useState(0)
  const [optionIndex, setOptionIndex] = useState(0)
  const [qty, setQty] = useState(1)
  const store = useStore()

  const color = product.colors[colorIndex]
  const option = product.options?.values[optionIndex]
  const unitPrice = option?.price ?? product.price
  const variant = variantLabel(color.name, option?.label)
  const wishlisted = store.wishlist.includes(product.slug)
  const addedQty = store.cart.find((i) => i.key === `${product.slug}::${variant ?? ''}`)?.qty ?? 0

  const add = () => {
    addToCart({ slug: product.slug, name: product.name, image: images[activeIndex] ?? product.cover, price: unitPrice, variant }, qty)
    setQty(1)
  }
  const activeImage = images[activeIndex]
  const isCutout = activeImage.endsWith('transparent')

  const step = (dir: 1 | -1) => setActiveIndex((i) => (i + dir + images.length) % images.length)

  // Colourways with their own photo jump the gallery to it
  const selectColor = (index: number) => {
    setColorIndex(index)
    const image = product.colors[index].image
    if (image && images.includes(image)) setActiveIndex(images.indexOf(image))
  }

  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % images.length)
      if (e.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxOpen, images.length])

  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 pt-8 pb-12 text-foreground sm:px-8 lg:px-16">
      <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-foreground/60">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/products" className="hover:text-foreground">
              Products
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-foreground/70">{product.category}</li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-foreground/80">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="mt-5 grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        {/* Gallery */}
        <div className="flex min-w-0 flex-col-reverse gap-3 sm:flex-row">
          {images.length > 1 && (
            <div
              data-lenis-prevent
              className="flex gap-3 overflow-x-auto [scrollbar-width:none] sm:max-h-130 sm:w-20 sm:flex-col sm:overflow-y-auto"
            >
              {images.map((file, i) => (
                <button
                  key={file}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-label={`View image ${i + 1}`}
                  aria-current={i === activeIndex}
                  className={`relative aspect-square w-18 shrink-0 cursor-pointer overflow-hidden rounded-sm bg-highlight transition sm:w-full ${
                    i === activeIndex ? 'ring-1 ring-foreground ring-offset-2 ring-offset-background' : 'opacity-75 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={productImage(file)}
                    alt=""
                    fill
                    sizes="80px"
                    className={file.endsWith('transparent') ? 'object-contain p-1' : 'object-cover'}
                  />
                </button>
              ))}
            </div>
          )}

          <div className="relative aspect-square flex-1 overflow-hidden rounded-sm bg-highlight sm:aspect-auto sm:min-h-130">
            <Image
              key={activeImage}
              src={productImage(activeImage)}
              alt={`${product.name}, image ${activeIndex + 1}`}
              fill
              priority={activeIndex === 0}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={isCutout ? 'object-contain p-8' : 'object-cover'}
            />
            {product.badge && (
              <span className="absolute top-4 left-4 rounded-full bg-clean/90 px-3 py-1 text-xs font-medium tracking-wide">
                {product.badge}
              </span>
            )}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-4 flex gap-2 sm:hidden">
                {([-1, 1] as const).map((dir) => (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => step(dir)}
                    aria-label={dir === -1 ? 'Previous image' : 'Next image'}
                    className="grid size-9 cursor-pointer place-items-center rounded-full bg-clean/90"
                  >
                    <Icon name={dir === -1 ? 'arrowLeft' : 'arrowRight'} />
                  </button>
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label="View fullscreen"
              className="absolute right-4 bottom-4 grid size-10 cursor-pointer place-items-center rounded-full bg-clean/90 transition-transform hover:scale-105"
            >
              <Icon name="expand" />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="relative min-w-0">
          <p className="pointer-events-none absolute -top-2 right-0 hidden rotate-6 text-right font-accent text-2xl leading-tight text-foreground/70 xl:block">
            Good
            <br />
            Things
            <br />
            &nbsp;Take
            <br />
            &nbsp;&nbsp;Time
            <br />♡
          </p>

          <a href="#reviews" className="inline-flex items-center gap-2 text-sm text-foreground/75 hover:text-foreground">
            <Stars rating={product.rating} />
            <span>
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </a>
          <h1 className="mt-3 max-w-md font-display text-4xl leading-tight sm:text-5xl">{product.name}</h1>
          <p className="mt-1 font-display text-xl text-foreground/80">{product.subtitle}</p>
          <p className="mt-4 max-w-md text-sm leading-6 tracking-wide text-foreground/75">{product.description}</p>

          <p className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl">{formatPrice(unitPrice)}</span>
            <span className="text-xs text-foreground/60">MRP incl. of all taxes</span>
          </p>

          {/* Colour */}
          <fieldset className="mt-6">
            <legend className="text-sm">
              Colour: <span className="text-foreground/70">{color.name}</span>
            </legend>
            <div className="mt-3 flex flex-wrap gap-3">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => selectColor(i)}
                  title={c.name}
                  aria-label={c.name}
                  aria-pressed={i === colorIndex}
                  className={`size-10 cursor-pointer rounded-full border border-foreground/15 ring-offset-2 ring-offset-background transition-shadow ${
                    i === colorIndex ? 'ring-1 ring-foreground' : 'hover:ring-1 hover:ring-foreground/30'
                  }`}
                  style={{ backgroundColor: COLORS[c.key].hex }}
                />
              ))}
            </div>
          </fieldset>

          {/* Size / pack / style */}
          {product.options && (
            <fieldset className="mt-6">
              <legend className="text-sm">{product.options.label}:</legend>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.options.values.map((v, i) => (
                  <button
                    key={v.label}
                    type="button"
                    onClick={() => setOptionIndex(i)}
                    aria-pressed={i === optionIndex}
                    className={`cursor-pointer rounded-full border px-5 py-2 text-sm transition-colors ${
                      i === optionIndex
                        ? 'border-foreground bg-highlight'
                        : 'border-foreground/25 text-foreground/75 hover:border-foreground/60'
                    }`}
                  >
                    {v.label}
                    {v.price !== product.price && (
                      <span className="ml-1.5 text-xs text-foreground/55">{formatPrice(v.price)}</span>
                    )}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {/* Quantity + cart */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-foreground/30">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty === 1}
                aria-label="Decrease quantity"
                className="grid size-11 cursor-pointer place-items-center disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Icon name="minus" />
              </button>
              <span className="w-8 text-center text-sm" aria-live="polite">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))}
                disabled={qty === MAX_QTY}
                aria-label="Increase quantity"
                className="grid size-11 cursor-pointer place-items-center disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Icon name="plus" />
              </button>
            </div>

            <button
              type="button"
              onClick={add}
              className="order-last flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm whitespace-nowrap text-clean transition-opacity hover:opacity-90 sm:order-none sm:w-auto sm:min-w-56 sm:px-8"
            >
              <Icon name={addedQty ? 'check' : 'cart'} />
              {addedQty ? `In cart (${addedQty}) · Add ${qty} more` : `Add to Cart · ${formatPrice(unitPrice * qty)}`}
            </button>

            <button
              type="button"
              onClick={() => toggleWishlist(product.slug)}
              aria-pressed={wishlisted}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              className="grid size-11 cursor-pointer place-items-center rounded-full border border-foreground/30 transition-colors hover:border-foreground"
            >
              <Icon name="heart" filled={wishlisted} className={`size-5 transition-colors ${wishlisted ? 'text-accent' : '[&_svg]:fill-clean/40'}`} />
            </button>
          </div>
          {addedQty > 0 && (
            <p className="mt-3 text-xs text-foreground/70" role="status">
              {addedQty} × {product.name}{variant && ` (${variant})`} in your cart.
            </p>
          )}

          <ul className="mt-8 grid grid-cols-1 gap-4 border-t border-foreground/10 pt-6 sm:grid-cols-3">
            {PERKS.map((perk) => (
              <li key={perk.title} className="flex items-center gap-3">
                <Icon name={perk.icon} className="size-6 shrink-0 text-foreground/80" />
                <span className="text-xs leading-tight">
                  <span className="block font-medium">{perk.title}</span>
                  <span className="text-foreground/65">{perk.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} gallery`}
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/85 p-4 sm:p-10"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative size-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              key={activeImage}
              src={productImage(activeImage)}
              alt={`${product.name}, image ${activeIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
            className="absolute top-5 right-5 grid size-11 cursor-pointer place-items-center rounded-full bg-clean text-foreground"
          >
            <Icon name="close" />
          </button>
          {images.length > 1 &&
            ([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  step(dir)
                }}
                aria-label={dir === -1 ? 'Previous' : 'Next'}
                className={`absolute grid size-11 cursor-pointer place-items-center rounded-full bg-clean text-foreground ${
                  dir === -1 ? 'left-4' : 'right-4'
                }`}
              >
                <Icon name={dir === -1 ? 'arrowLeft' : 'arrowRight'} />
              </button>
            ))}
          <p className="absolute bottom-5 text-sm text-clean/80">
            {activeIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </section>
  )
}

export default ProductHero
