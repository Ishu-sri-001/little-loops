'use client'

import { useImperativeHandle, useState, useTransition, type Ref } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight } from '@/components/icons/lucide'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { sendContactMessage } from '@/lib/actions'
import { ENQUIRY_TYPES, TOPICS, contactSchema, type ContactValues, type EnquiryType } from '@/lib/contact-schema'
import { SITE } from '@/lib/site'

export type ContactFormHandle = {
  /** Switch to an enquiry type (and optionally a topic) */
  prefill: (type: EnquiryType, topic?: string) => void
  focus: () => void
}

const EMPTY: ContactValues = {
  type: 'enquiry',
  name: '',
  email: '',
  topic: '',
  neededBy: '',
  organisation: '',
  message: '',
  website: '',
}

const fieldClass = 'h-12 rounded-xl border-foreground/20 bg-clean/60 px-4 text-sm'

// "simple" variant: one dropdown covering every type, encoded as "type|topic"
const encode = (type: EnquiryType, topic: string) => `${type}|${topic}`
const ALL_TOPIC_ITEMS = [
  { value: null, label: 'What can we help you with?' },
  ...ENQUIRY_TYPES.flatMap((t) => TOPICS[t.value].map((topic) => ({ value: encode(t.value, topic.value), label: topic.label }))),
]

/**
 * Contact form shared by the homepage section and /contact.
 * `tabs` shows Enquiry / Custom Order / Collaboration tabs; `simple` folds them into one grouped dropdown.
 */
const ContactForm = ({ variant = 'tabs', ref }: { variant?: 'tabs' | 'simple'; ref?: Ref<ContactFormHandle> }) => {
  const [sent, setSent] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: EMPTY,
    mode: 'onTouched',
  })
  const type = useWatch({ control: form.control, name: 'type' })

  const selectType = (next: EnquiryType, topic = '') => {
    form.setValue('type', next)
    form.setValue('topic', topic, { shouldValidate: topic !== '' })
    form.clearErrors('topic')
  }

  useImperativeHandle(ref, () => ({
    prefill: (next, topic) => {
      setSent(false)
      selectType(next, topic)
    },
    focus: () => {
      setSent(false)
      // Let the form re-mount if we were on the thank-you screen
      window.setTimeout(() => form.setFocus('name'), 50)
    },
  }))

  const onSubmit = (values: ContactValues) => {
    setServerError(null)
    startTransition(async () => {
      const result = await sendContactMessage(values)
      if (result.ok) {
        setSent(true)
        form.reset({ ...EMPTY, type: values.type })
      } else {
        setServerError(result.error)
      }
    })
  }

  const topics = TOPICS[type]

  return (
    <AnimatePresence mode="wait" initial={false}>
      {sent ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="flex min-h-96 flex-col items-center justify-center gap-4 text-center"
          role="status"
        >
          <span className="grid size-14 place-items-center rounded-full bg-secondary/40 text-2xl">♡</span>
          <h3 className="font-display text-3xl">Thank you!</h3>
          <p className="max-w-xs text-sm leading-6 text-foreground/75">
            Your message is on its way to our makers. {SITE.replyTime}.
          </p>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="mt-2 cursor-pointer text-sm text-accent underline underline-offset-4"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
        >
          {variant === 'tabs' && (
            <div role="tablist" aria-label="Reason for contact" className="mb-6 flex gap-4 overflow-x-auto [scrollbar-width:none] sm:gap-6">
              {ENQUIRY_TYPES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  role="tab"
                  aria-selected={type === t.value}
                  onClick={() => selectType(t.value)}
                  className={`shrink-0 cursor-pointer border-b pb-2.5 text-[10px] tracking-[0.12em] uppercase transition-colors sm:text-[11px] sm:tracking-[0.2em] ${
                    type === t.value ? 'border-foreground text-foreground' : 'border-transparent text-foreground/60 hover:text-foreground'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}

          <FieldGroup className="gap-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${variant}-contact-name`} className="sr-only">
                    Your name
                  </FieldLabel>
                  <Input
                    {...field}
                    id={`${variant}-contact-name`}
                    autoComplete="name"
                    placeholder="Your Name*"
                    aria-invalid={fieldState.invalid}
                    className={fieldClass}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${variant}-contact-email`} className="sr-only">
                    Email address
                  </FieldLabel>
                  <Input
                    {...field}
                    id={`${variant}-contact-email`}
                    type="email"
                    autoComplete="email"
                    placeholder={variant === 'simple' ? 'Your Email*' : 'Email Address*'}
                    aria-invalid={fieldState.invalid}
                    className={fieldClass}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="topic"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${variant}-contact-topic`} className="sr-only">
                    What can we help you with?
                  </FieldLabel>
                  {variant === 'tabs' ? (
                    <Select
                      items={[{ value: null, label: 'What are you reaching out for?' }, ...topics]}
                      value={field.value || null}
                      onValueChange={(value) => field.onChange(value ?? '')}
                      onOpenChange={(open) => !open && field.onBlur()}
                    >
                      <SelectTrigger
                        id={`${variant}-contact-topic`}
                        ref={field.ref}
                        aria-invalid={fieldState.invalid}
                        className={`${fieldClass} w-full data-[size=default]:h-12`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent data-lenis-prevent>
                        {topics.map((t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Select
                      items={ALL_TOPIC_ITEMS}
                      value={field.value ? encode(type, field.value) : null}
                      onValueChange={(value) => {
                        if (!value) return field.onChange('')
                        const [nextType, topic] = value.split('|') as [EnquiryType, string]
                        form.setValue('type', nextType)
                        field.onChange(topic)
                      }}
                      onOpenChange={(open) => !open && field.onBlur()}
                    >
                      <SelectTrigger
                        id={`${variant}-contact-topic`}
                        ref={field.ref}
                        aria-invalid={fieldState.invalid}
                        className={`${fieldClass} w-full data-[size=default]:h-12`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent data-lenis-prevent>
                        {ENQUIRY_TYPES.map((t) => (
                          <SelectGroup key={t.value}>
                            <SelectLabel>{t.label}</SelectLabel>
                            {TOPICS[t.value].map((topic) => (
                              <SelectItem key={topic.value} value={encode(t.value, topic.value)}>
                                {topic.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {type === 'custom-order' && (
              <Controller
                name="neededBy"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor={`${variant}-contact-needed-by`} className="text-xs text-foreground/70">
                      Needed by (optional)
                    </FieldLabel>
                    <Input {...field} id={`${variant}-contact-needed-by`} type="date" className={fieldClass} />
                  </Field>
                )}
              />
            )}

            {type === 'collaboration' && (
              <Controller
                name="organisation"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor={`${variant}-contact-organisation`} className="sr-only">
                      Brand, studio or Instagram handle
                    </FieldLabel>
                    <Input
                      {...field}
                      id={`${variant}-contact-organisation`}
                      placeholder="Brand, studio or @handle (optional)"
                      className={fieldClass}
                    />
                  </Field>
                )}
              />
            )}

            <Controller
              name="message"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${variant}-contact-message`} className="sr-only">
                    Your message
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id={`${variant}-contact-message`}
                    rows={4}
                    placeholder={
                      type === 'custom-order'
                        ? 'Tell us what you’d love us to make: colours, size, who it’s for…*'
                        : 'Your Message*'
                    }
                    aria-invalid={fieldState.invalid}
                    data-lenis-prevent
                    className="min-h-28 rounded-xl border-foreground/20 bg-clean/60 px-4 py-3 text-sm"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Honeypot: hidden from people, tempting to bots */}
            <input
              {...form.register('website')}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            {serverError && (
              <p role="alert" className="text-sm text-destructive">
                {serverError}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className={`group flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-foreground text-sm text-clean transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60 ${
                variant === 'tabs' ? 'tracking-[0.2em] uppercase' : 'tracking-wide'
              }`}
            >
              {isPending ? 'Sending…' : 'Send Message'}
              {!isPending && <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />}
            </button>
          </FieldGroup>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

export default ContactForm
