import Image from 'next/image'
import Link from 'next/link'
import { productImage } from '@/app/products/data'

const ProductsHero = () => {
  return (
    <section className="relative isolate w-full overflow-hidden bg-neutral text-foreground">
      <Image
        src={productImage('daisy-wall-hanging1')}
        alt="Crochet daisy wall hanging in a sunlit room"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[80%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-background via-background/85 to-background/0 md:via-background/70" />

      <div className="mx-auto flex min-h-105 max-w-7xl flex-col justify-center px-4 py-20 sm:px-8 md:min-h-120 lg:px-16">
        <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-foreground/60">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-foreground/80">
              Products
            </li>
          </ol>
        </nav>

        <h1 className="mt-5 font-display text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
          Handmade for
          <br />
          Brighter Tomorrows.
        </h1>
        <p className="mt-6 max-w-md text-sm leading-7 tracking-wide text-foreground/80 sm:text-base">
          Thoughtfully made. Beautifully crafted. Explore bags, blooms, keepsakes and little joys, each one crocheted by
          hand, one stitch at a time.
        </p>
      </div>

      {/* Script note */}
      <p className="pointer-events-none absolute bottom-8 left-6 hidden -rotate-12 font-accent text-3xl leading-tight text-foreground/75 xl:block">
        Create
        <br />
        &nbsp;&nbsp;Craft
        <br />
        &nbsp;&nbsp;&nbsp;Belong ♡
      </p>

      {/* Hang tag */}
      <div className="pointer-events-none absolute right-[16%] bottom-6 hidden rotate-6 lg:block">
        <div className="mx-auto h-8 w-px bg-foreground/40" />
        <div className="relative flex w-32 flex-col items-center rounded-md border border-foreground/15 bg-highlight/90 px-4 pt-7 pb-5 text-center font-display text-lg leading-snug shadow-[0_12px_30px_-12px_rgba(95,75,62,0.5)] [clip-path:polygon(18%_0,82%_0,100%_12%,100%_100%,0_100%,0_12%)]">
          <span className="absolute top-2.5 size-2 rounded-full border border-foreground/40" />
          Small
          <br />
          Stitches
          <br />
          Bigger
          <br />
          Stories
          <span className="mt-2 text-base">♡</span>
        </div>
      </div>

      {/* Side tagline */}
      <div className="pointer-events-none absolute top-1/2 right-6 hidden -translate-y-1/2 flex-col items-center gap-2 text-[11px] tracking-[0.35em] text-foreground/80 uppercase md:flex">
        <span>People</span>
        <span>Planet</span>
        <span>Craft</span>
        <span>Always</span>
        <span className="mt-6 h-px w-8 bg-foreground/50" />
      </div>
    </section>
  )
}

export default ProductsHero
