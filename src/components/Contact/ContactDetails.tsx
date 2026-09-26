import Image from 'next/image'
import { ArrowRight, Clock, Mail, MapPin, Phone } from '@/components/icons/lucide'
import { SITE } from '@/lib/site'
import { format12h } from '@/lib/time'
import StudioStatus from './StudioStatus'

const STUDIO_IMAGE =
  'https://images.unsplash.com/photo-1788712998889-0c7875bccf3c?auto=format&fit=crop&w=1200&q=75'

const mapQuery = encodeURIComponent(SITE.address.mapQuery)
const MAP_EMBED = `https://maps.google.com/maps?q=${mapQuery}&z=14&output=embed`
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`

const DETAILS = [
  {
    icon: Mail,
    title: 'Email',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    note: 'We typically respond within 1–2 business days.',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: SITE.phone,
    href: `tel:${SITE.phone.replace(/\s/g, '')}`,
    note: SITE.phoneHours,
  },
  {
    icon: MapPin,
    title: 'Studio Address',
    value: SITE.address.name,
    href: DIRECTIONS,
    note: SITE.address.lines.join('\n'),
  },
]

const ContactDetails = () => {
  return (
    <section className="w-full text-foreground">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 py-16 sm:px-8 lg:grid-cols-[1fr_1.35fr] lg:gap-0 lg:px-16 lg:py-20">
        {/* Contact details */}
        <div className="lg:border-r lg:border-foreground/15 lg:pr-14">
          <h2 className="font-display text-3xl">Contact Details</h2>
          <p className="mt-2 text-sm text-foreground/70">Reach us anytime through the channels below.</p>

          <ul className="mt-10 space-y-9">
            {DETAILS.map(({ icon: Icon, title, value, href, note }) => (
              <li key={title} data-icon-trigger className="flex gap-5">
                <Icon strokeWidth={1.3} className="mt-0.5 size-6 shrink-0" />
                <div>
                  <h3 className="font-medium">{title}</h3>
                  <a
                    href={href}
                    {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="mt-1 block text-sm underline-offset-4 hover:underline"
                  >
                    {value}
                  </a>
                  <p className="mt-1 text-xs leading-5 whitespace-pre-line text-foreground/65">{note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Studio */}
        <div className="lg:pl-14">
          <h2 className="font-display text-3xl">Visit Our Studio</h2>
          <p className="mt-2 max-w-md text-sm text-foreground/70">
            Come say hello! Feel the textures, explore our collection, and be part of our creative space.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_200px]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral sm:aspect-auto sm:min-h-72">
              <Image
                src={STUDIO_IMAGE}
                alt="Shelves of yarn in a sunlit craft studio"
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover"
              />
            </div>

            <div data-icon-trigger className="rounded-2xl bg-highlight/80 p-6">
              <Clock strokeWidth={1.3} className="size-7" />
              <h3 className="mt-4 font-medium">Studio Hours</h3>
              <StudioStatus />
              <dl className="mt-5 space-y-4 text-xs">
                {SITE.hours.map((h) => (
                  <div key={h.label}>
                    <dt className="font-medium">{h.label}</dt>
                    <dd className="mt-0.5 text-foreground/70">
                      {h.open && h.close ? `${format12h(h.open)} – ${format12h(h.close)}` : 'Closed'}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="grid border-y border-foreground/10 lg:grid-cols-[1.4fr_1fr]">
        <div className="relative h-80 bg-neutral lg:h-96">
          <iframe
            title={`Map showing ${SITE.address.name}`}
            src={MAP_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="size-full border-0 opacity-90 [filter:grayscale(0.6)_sepia(0.35)_contrast(0.95)]"
          />
          <a
            href={DIRECTIONS}
            target="_blank"
            rel="noreferrer"
            className="group absolute bottom-6 left-6 inline-flex items-center gap-3 rounded-full border border-foreground/50 bg-background/95 px-6 py-3 text-sm shadow-lg transition-colors hover:bg-foreground hover:text-clean"
          >
            Get Directions
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="relative flex flex-col justify-center px-4 py-12 sm:px-8 lg:px-14">
          <h2 className="font-display text-3xl">Find Us Here</h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-foreground/70">
            We’re in the heart of Bengaluru, with easy access and parking. Drop by during studio hours, no appointment
            needed.
          </p>
          <span className="mt-8 h-px w-16 bg-foreground/30" />
          <p className="pointer-events-none mt-8 -rotate-6 self-end font-accent text-3xl leading-tight text-foreground/70">
            More than Just a Store ♡
          </p>
        </div>
      </div>
    </section>
  )
}

export default ContactDetails
