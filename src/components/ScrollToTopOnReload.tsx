'use client'

import { useEffect } from 'react'
import { useLenis } from 'lenis/react'

/**
 * Browsers restore the old scroll position on reload; we always start from the top instead.
 * Fresh visits to a link with a #hash still land on that section.
 */
const ScrollToTopOnReload = () => {
  const lenis = useLenis()

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])

  useEffect(() => {
    const [nav] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
    if (nav?.type !== 'reload') return
    window.scrollTo(0, 0)
    lenis?.scrollTo(0, { immediate: true, force: true })
  }, [lenis])

  return null
}

export default ScrollToTopOnReload
