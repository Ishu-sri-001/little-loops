import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, productImage } from "@/app/products/data";
import { formatPrice } from "@/components/ProductDetail/shared";
import { ArrowRight } from "@/components/icons/lucide";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "This page has unravelled. Explore handmade crochet bags, bouquets, keychains and gifts from Little Loops instead.",
  robots: { index: false, follow: true },
};

const POPULAR = [...PRODUCTS].sort((a, b) => b.popularity - a.popularity).slice(0, 4);

export default function NotFound() {
  return (
    <main className="w-full text-foreground">
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-8 md:grid-cols-[1fr_0.8fr] md:gap-10 md:py-20 lg:px-16 lg:py-24">
        <div>
          <p className="flex items-center gap-4 text-xs tracking-[0.35em] text-foreground/70 uppercase">
            Error 404 <span className="h-px w-10 bg-foreground/40" />
          </p>
          <h1 className="mt-6 font-display text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
            Oops, we
            <br />
            dropped a stitch.
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 tracking-wide text-foreground/80">
            The page you’re looking for has unravelled, moved or never existed. Let’s pick up the thread somewhere
            cosier.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-3.5 text-xs tracking-[0.25em] text-clean uppercase transition-opacity hover:opacity-90"
            >
              Back to Home
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center rounded-full border border-foreground/60 px-8 py-3.5 text-xs tracking-[0.25em] uppercase transition-colors hover:bg-foreground hover:text-clean"
            >
              Browse Products
            </Link>
          </div>
          <p className="mt-6 text-sm text-foreground/65">
            Looking for something specific?{" "}
            <Link href="/contact" className="text-foreground underline underline-offset-4 hover:text-accent">
              Ask us
            </Link>{" "}
            or press <kbd className="rounded border border-foreground/25 px-1.5 py-0.5 text-xs">/</kbd> to search.
          </p>
        </div>

        {/* Unravelling yarn illustration */}
        <div className="relative mx-auto w-full max-w-sm md:max-w-none" aria-hidden>
          <svg viewBox="0 0 320 260" className="w-full">
            <path
              d="M150 150 C 110 170, 80 200, 40 205 S -10 190, 5 240"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="6 7"
            />
            <circle cx="205" cy="115" r="78" style={{ fill: "var(--accent)" }} />
            <g
              fill="none"
              strokeWidth="2.5"
              strokeOpacity="0.55"
              style={{ stroke: "color-mix(in oklab, var(--accent) 55%, black)" }}
              clipPath="url(#nf-clip)"
            >
              {[0, 30, 60, 90, 120, 150].map((a) => (
                <ellipse key={a} cx="205" cy="115" rx="76" ry="30" transform={`rotate(${a} 205 115)`} />
              ))}
            </g>
            <defs>
              <clipPath id="nf-clip">
                <circle cx="205" cy="115" r="78" />
              </clipPath>
            </defs>
            <text x="205" y="128" textAnchor="middle" className="font-display" fontSize="44" style={{ fill: "var(--clean)" }}>
              404
            </text>
          </svg>
          <p className="absolute -bottom-2 left-4 -rotate-6 font-accent text-3xl text-foreground/75">
            Lost, but not for long ♡
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-8 lg:px-16">
        <h2 className="font-display text-2xl sm:text-3xl">Loved by our community</h2>
        <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {POPULAR.map((p) => (
            <li key={p.slug}>
              <Link href={`/products/${p.slug}`} className="group block">
                <span className="relative block aspect-[4/3.4] overflow-hidden rounded-md bg-neutral">
                  <Image
                    src={productImage(p.cover)}
                    alt={p.name}
                    fill
                    sizes="(min-width: 768px) 22vw, 45vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </span>
                <span className="mt-3 block truncate text-sm">{p.name}</span>
                <span className="mt-1 block text-sm text-foreground/75">{formatPrice(p.fromPrice)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
