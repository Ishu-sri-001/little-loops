'use client'

import { useSyncExternalStore } from 'react'

// Tiny cart + wishlist store shared by the header, listing and product pages.
// Persisted to localStorage and synced across tabs.

export type CartItem = {
  key: string // slug + variant, so different colours/sizes are separate lines
  slug: string
  name: string
  image: string
  variant?: string
  price: number
  qty: number
}

type State = { cart: CartItem[]; wishlist: string[] }

const STORAGE_KEY = 'little-loops:store'
const EMPTY: State = { cart: [], wishlist: [] }
export const MAX_QTY = 20

let state: State = EMPTY
let loaded = false
const listeners = new Set<() => void>()

const load = () => {
  if (loaded || typeof window === 'undefined') return
  loaded = true
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved) state = { ...EMPTY, ...JSON.parse(saved) }
  } catch {
    // Storage unavailable (private mode, blocked): keep the in-memory state
  }
}

const emit = () => listeners.forEach((l) => l())

const setState = (update: (s: State) => State) => {
  load()
  state = update(state)
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
  emit()
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return
    loaded = false
    load()
    emit()
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

const getSnapshot = () => {
  load()
  return state
}

const getServerSnapshot = () => EMPTY

export const useStore = () => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

/* ---------- Actions ---------- */

export const addToCart = (item: Omit<CartItem, 'key' | 'qty'>, qty = 1) =>
  setState((s) => {
    const key = `${item.slug}::${item.variant ?? ''}`
    const existing = s.cart.find((i) => i.key === key)
    const cart = existing
      ? s.cart.map((i) => (i.key === key ? { ...i, qty: Math.min(MAX_QTY, i.qty + qty) } : i))
      : [...s.cart, { ...item, key, qty: Math.min(MAX_QTY, qty) }]
    return { ...s, cart }
  })

export const setQty = (key: string, qty: number) =>
  setState((s) => ({
    ...s,
    cart: qty <= 0 ? s.cart.filter((i) => i.key !== key) : s.cart.map((i) => (i.key === key ? { ...i, qty: Math.min(MAX_QTY, qty) } : i)),
  }))

export const removeFromCart = (key: string) => setState((s) => ({ ...s, cart: s.cart.filter((i) => i.key !== key) }))

/** Removes every line (all variants) of a product */
export const removeProductFromCart = (slug: string) =>
  setState((s) => ({ ...s, cart: s.cart.filter((i) => i.slug !== slug) }))

export const toggleWishlist = (slug: string) =>
  setState((s) => ({
    ...s,
    wishlist: s.wishlist.includes(slug) ? s.wishlist.filter((x) => x !== slug) : [...s.wishlist, slug],
  }))

/* ---------- Selectors ---------- */

export const cartCount = (s: State) => s.cart.reduce((n, i) => n + i.qty, 0)
export const cartSubtotal = (s: State) => s.cart.reduce((n, i) => n + i.qty * i.price, 0)
export const isInCart = (s: State, slug: string) => s.cart.some((i) => i.slug === slug)
