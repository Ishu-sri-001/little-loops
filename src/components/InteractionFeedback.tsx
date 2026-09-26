'use client'

import { useEffect } from 'react'

// Site-wide micro-interactions, applied by delegation so every control gets them:
//  • hover: button-like controls ease up to a slightly larger scale
//  • press: every link/button gives a quick squish-and-settle
// Uses the Web Animations API on the `scale` property, so it never fights the
// Tailwind `transition-*` / `transform` classes already on each element.

const INTERACTIVE = 'button, a[href], [role="button"], [role="tab"], label:has(input), summary, select'
const HOVER_SCALE = 1.03
const PRESS_SCALE = 0.95
// Large targets (product cards, drawer rows) already zoom their images: leave them still
const MAX_HOVER_WIDTH = 360
const MAX_HOVER_HEIGHT = 160

const isDisabled = (el: Element) => el.matches(':disabled, [aria-disabled="true"]')

/** Pills, icon buttons and anything with a visible box: not plain inline text links */
const isButtonLike = (el: HTMLElement) => {
  if (el.tagName !== 'A') return true
  const style = getComputedStyle(el)
  const hasBorder = style.borderStyle !== 'none' && parseFloat(style.borderWidth) > 0
  const hasBackground = style.backgroundColor !== 'rgba(0, 0, 0, 0)' && style.backgroundColor !== 'transparent'
  return hasBorder || hasBackground
}

const InteractionFeedback = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const hoverAnims = new WeakMap<HTMLElement, Animation>()
    let hovered: HTMLElement | null = null

    const canHover = (el: HTMLElement) => {
      if (isDisabled(el) || el.closest('[data-no-hover]') || !isButtonLike(el)) return false
      const { width, height } = el.getBoundingClientRect()
      return width <= MAX_HOVER_WIDTH && height <= MAX_HOVER_HEIGHT
    }

    const enter = (el: HTMLElement) => {
      if (!canHover(el)) return
      hoverAnims.get(el)?.cancel()
      hoverAnims.set(
        el,
        el.animate([{ scale: 1 }, { scale: HOVER_SCALE }], { duration: 220, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' })
      )
    }

    const leave = (el: HTMLElement) => {
      const anim = hoverAnims.get(el)
      if (!anim) return
      hoverAnims.delete(el)
      anim.cancel()
      el.animate([{ scale: HOVER_SCALE }, { scale: 1 }], { duration: 260, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' })
    }

    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const el = (e.target as Element | null)?.closest<HTMLElement>(INTERACTIVE) ?? null
      if (el === hovered) return
      if (hovered) leave(hovered)
      hovered = el
      if (el) enter(el)
    }

    const onOut = (e: PointerEvent) => {
      if (!hovered) return
      const to = e.relatedTarget as Node | null
      if (to && hovered.contains(to)) return
      leave(hovered)
      hovered = null
    }

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return
      const el = (e.target as Element | null)?.closest<HTMLElement>(INTERACTIVE)
      if (!el || isDisabled(el) || el.closest('[data-no-press]')) return
      const base = hoverAnims.has(el) ? HOVER_SCALE : 1
      el.animate([{ scale: base }, { scale: base * PRESS_SCALE, offset: 0.35 }, { scale: base }], {
        duration: 320,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      })
    }

    document.addEventListener('pointerover', onOver)
    document.addEventListener('pointerout', onOut)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout', onOut)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [])

  return null
}

export default InteractionFeedback
