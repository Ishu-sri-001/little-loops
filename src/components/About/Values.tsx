'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { productImage } from '@/app/products/data'

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=700&q=75`

// Each card gets its own organic "blob" crop, like torn paper
const VALUES = [
  {
    title: 'People First',
    text: 'We work with and support skilled artisans, because craft thrives in community.',
    image: unsplash('1670764732518-a4cec3b0dc09'),
    alt: 'A maker knitting a cable-knit piece',
    shape: 'rounded-[42%_58%_46%_54%/55%_45%_55%_45%]',
  },
  {
    title: 'Kind to the Planet',
    text: 'We choose natural, low-impact yarns, plastic-free packaging and mindful practices.',
    image: unsplash('1616431101491-554c0932ea40'),
    alt: 'A stem of fluffy white cotton bolls',
    shape: 'rounded-[55%_45%_52%_48%/45%_55%_45%_55%]',
  },
  {
    title: 'Meaningful Craft',
    text: 'We believe in slow, intentional making over mass production, every stitch by hand.',
    image: productImage('table-mat2'),
    alt: 'Close-up of a hand-crocheted floral table mat',
    shape: 'rounded-[48%_52%_58%_42%/52%_48%_52%_48%]',
  },
  {
    title: 'More Joy, Always',
    text: 'Our pieces are made to be cherished, gifted and lived with for years to come.',
    image: unsplash('1764764138818-0b22ab4d4023'),
    alt: 'A gift wrapped in kraft paper and twine',
    shape: 'rounded-[52%_48%_44%_56%/48%_56%_44%_52%]',
  },
]

const Values = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 text-foreground sm:px-8 lg:px-16 lg:py-24">
      <p className="flex items-center gap-4 text-xs tracking-[0.35em] text-foreground/70 uppercase">
        Our Values <span className="h-px w-10 bg-foreground/40" />
      </p>
      <h2 className="mt-6 max-w-xl font-display text-4xl leading-[1.1] sm:text-5xl">What Every Stitch Stands For.</h2>

      <ul className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {VALUES.map((value, i) => (
          <motion.li
            key={value.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className={`group lg:px-7 ${i > 0 ? 'lg:border-l lg:border-foreground/15' : 'lg:pl-0'} ${i === VALUES.length - 1 ? 'lg:pr-0' : ''}`}
          >
            <div className={`relative aspect-[5/4] overflow-hidden bg-neutral ${value.shape}`}>
              <Image
                src={value.image}
                alt={value.alt}
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <h3 className="mt-7 text-xs font-medium tracking-[0.3em] uppercase">{value.title}</h3>
            <p className="mt-3 text-sm leading-6 text-foreground/75">{value.text}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

export default Values
