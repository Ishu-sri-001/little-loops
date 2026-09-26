import type { Metadata } from 'next'
import { SITE } from './site'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

/** Image used when a page doesn't have its own share image */
export const DEFAULT_OG_IMAGE = '/assets/product-images/daisy-wall-hanging1.png'

/**
 * Consistent SEO metadata for a page: title (the root layout appends "| Little Loops"),
 * description, canonical URL and Open Graph / Twitter share cards.
 */
export const pageMetadata = ({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  absoluteTitle = false,
  noIndex = false,
}: {
  title: string
  description: string
  path: string
  image?: string
  /** Use the title as-is, without the "| Little Loops" suffix */
  absoluteTitle?: boolean
  noIndex?: boolean
}): Metadata => {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE.name}`
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE.name,
      locale: 'en_IN',
      type: 'website',
      images: [{ url: image, alt: fullTitle }],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [image] },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  }
}
