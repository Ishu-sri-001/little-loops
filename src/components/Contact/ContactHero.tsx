import Image from 'next/image'
import { Globe, Heart, Leaf, Sprout } from '@/components/icons/lucide'
import { productImage } from '@/app/products/data'
import { SITE } from '@/lib/site'
import ContactForm from './ContactForm'

const VALUES = [
  { label: 'Kind\nConversations', icon: Leaf },
  { label: 'Support\nReal People', icon: Heart },
  { label: 'A Brighter\nTomorrow', icon: Globe },
]

const ContactHero = () => {
  return (
    <section className="relative isolate w-full overflow-hidden text-foreground">
      <Image
        src={productImage('lily-flowers3')}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[75%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-background via-background/85 to-background/20" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-8 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-10 xl:grid-cols-[1fr_minmax(0,440px)_140px] lg:px-16 lg:py-20">
        <div className="relative">
          <p className="flex items-center gap-4 text-xs tracking-[0.35em] text-foreground/70 uppercase">
            Contact Us <span className="h-px w-10 bg-foreground/40" />
          </p>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] sm:text-6xl">
            Let’s
            <br />
            Create Together.
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 tracking-wide text-foreground/80">
            Have a question, a custom order in mind, or just want to say hello? We’d love to hear from you. Whether
            you’re a maker, a dreamer or a first-time gifter, we’re here to help.
          </p>

          <ul className="mt-10 flex max-w-md">
            {VALUES.map(({ label, icon: Icon }, i) => (
              <li
                key={label}
                data-icon-trigger
                className={`flex flex-1 flex-col items-center gap-3 text-center text-[10px] leading-snug tracking-[0.2em] whitespace-pre-line text-foreground/75 uppercase ${
                  i > 0 ? 'border-l border-foreground/20' : ''
                }`}
              >
                <Icon strokeWidth={1.2} className="size-7" />
                {label}
              </li>
            ))}
          </ul>

          <p className="pointer-events-none absolute top-0 right-0 hidden rotate-12 font-accent text-3xl leading-tight text-foreground/70 xl:block">
            Good
            <br />
            &nbsp;People
            <br />
            &nbsp;&nbsp;Make
            <br />
            &nbsp;&nbsp;&nbsp;Here ♡
          </p>
        </div>

        <div
          id="message"
          className="scroll-mt-24 rounded-3xl border border-foreground/10 bg-highlight/90 p-6 shadow-[0_30px_60px_-30px_rgba(95,75,62,0.5)] backdrop-blur-md sm:p-8"
        >
          <h2 className="mb-6 font-display text-2xl">Send Us a Message</h2>
          <ContactForm variant="simple" />
          <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-foreground/65">
            <Sprout strokeWidth={1.3} className="size-4" />
            {SITE.replyTime}.
          </p>
        </div>

        {/* Stacked books, like the reference */}
        <div className="pointer-events-none hidden self-end xl:flex xl:flex-col" aria-hidden>
          {['People', 'Planet', 'Craft', 'Always'].map((word, i) => (
            <span
              key={word}
              style={{ marginLeft: `${[6, 0, 10, 2][i]}px` }}
              className="w-32 rounded-sm border border-foreground/10 bg-highlight py-1.5 text-center text-[11px] tracking-[0.3em] uppercase shadow-[0_6px_12px_-8px_rgba(95,75,62,0.6)]"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ContactHero
