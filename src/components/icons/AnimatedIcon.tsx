'use client'

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ForwardRefExoticComponent,
  type HTMLAttributes,
  type RefAttributes,
} from 'react'
import { cn } from '@/lib/utils'

export type IconHandle = { startAnimation: () => void; stopAnimation: () => void }
export type AnimatedIconComponent = ForwardRefExoticComponent<
  HTMLAttributes<HTMLSpanElement> & { size?: number } & RefAttributes<IconHandle>
>

/**
 * Renders a lucide-animated icon and plays it when the surrounding control
 * (closest link, button, label or [data-icon-trigger]) is hovered or focused:
 * not just when the pointer is over the tiny icon itself.
 */
const AnimatedIcon = ({
  icon: Icon,
  className,
  strokeWidth = 1.5,
  label,
}: {
  icon: AnimatedIconComponent
  /** Size and colour via classes, e.g. "size-5 text-accent" */
  className?: string
  strokeWidth?: number
  /** Accessible name when the icon stands alone; otherwise it's hidden from screen readers */
  label?: string
}) => {
  const iconRef = useRef<IconHandle>(null)
  const wrapRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const host = wrap.closest<HTMLElement>('a, button, label, [role="button"], [data-icon-trigger]') ?? wrap
    const start = () => iconRef.current?.startAnimation()
    const stop = () => iconRef.current?.stopAnimation()
    host.addEventListener('pointerenter', start)
    host.addEventListener('pointerleave', stop)
    host.addEventListener('focusin', start)
    host.addEventListener('focusout', stop)
    return () => {
      host.removeEventListener('pointerenter', start)
      host.removeEventListener('pointerleave', stop)
      host.removeEventListener('focusin', start)
      host.removeEventListener('focusout', stop)
    }
  }, [])

  return (
    <span
      ref={wrapRef}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{ '--icon-stroke': strokeWidth } as CSSProperties}
      className={cn(
        'inline-flex size-4 shrink-0 items-center justify-center',
        // Fit the fixed-size svg to our box and match the site's thinner strokes
        '[&>span]:block [&>span]:size-full [&_svg]:size-full [&_:is(svg,path,circle,rect,line,polyline,polygon,ellipse,g)]:[stroke-width:var(--icon-stroke)]',
        className
      )}
    >
      <Icon ref={iconRef} />
    </span>
  )
}

export default AnimatedIcon
