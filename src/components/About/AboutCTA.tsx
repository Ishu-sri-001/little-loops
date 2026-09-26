import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from '@/components/icons/lucide'
import { productImage } from '@/app/products/data'

const AboutCTA = () => {
  return (
    <section className="relative isolate w-full overflow-hidden bg-foreground text-clean">
      <Image
        src={productImage('curtain-tie3')}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[70%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-foreground via-foreground/85 to-foreground/40" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-8 lg:px-16 lg:py-28">
        <p className="flex items-center gap-4 text-xs tracking-[0.35em] text-clean/70 uppercase">
          Still More to Tell <span className="h-px w-10 bg-clean/40" />
        </p>
        <h2 className="mt-6 max-w-2xl font-display text-4xl leading-[1.15] sm:text-5xl">
          Every Piece Has a Story.
          <br />
          And We’re Just Getting Started.
        </h2>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/products"
            className="group inline-flex items-center gap-4 rounded-full border border-clean/70 px-8 py-3.5 text-xs tracking-[0.25em] uppercase transition-colors duration-300 hover:bg-clean hover:text-foreground"
          >
            Explore Our Collection
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full px-6 py-3.5 text-xs tracking-[0.25em] text-clean/80 uppercase underline-offset-8 hover:text-clean hover:underline"
          >
            Say Hello
          </Link>
        </div>

        <p className="pointer-events-none absolute right-8 bottom-10 hidden -rotate-12 text-right font-accent text-4xl leading-tight text-clean/85 md:block lg:right-24">
          Thank you
          <br />
          &nbsp;for being
          <br />
          &nbsp;&nbsp;part of it ♡
        </p>
      </div>
    </section>
  )
}

export default AboutCTA
