'use server'

import { Resend } from 'resend'
import { ENQUIRY_TYPES, TOPICS, contactSchema, newsletterSchema } from './contact-schema'
import { SITE } from './site'

export type ActionResult = { ok: true } | { ok: false; error: string }

/* ---------- Resend setup (keys live in .env.local) ---------- */

const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL
  if (!apiKey || !from || !to) {
    console.error('[email] Missing RESEND_API_KEY, RESEND_FROM_EMAIL or CONTACT_TO_EMAIL. See .env.example')
    return null
  }
  return { resend: new Resend(apiKey), from, to }
}

const NOT_CONFIGURED: ActionResult = {
  ok: false,
  error: `Our inbox isn’t connected yet. Please email us at ${SITE.email} instead.`,
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

/** Minimal on-brand wrapper so emails don't look like plain system mail */
const emailLayout = (body: string) => `
  <div style="background:#f8efe7;padding:32px 16px;font-family:Helvetica,Arial,sans-serif;color:#5f4b3e">
    <div style="max-width:560px;margin:0 auto;background:#fdeedb;border-radius:16px;padding:32px">
      <p style="margin:0 0 24px;font-family:Georgia,serif;font-size:22px">${SITE.name}</p>
      ${body}
      <p style="margin:32px 0 0;font-size:12px;color:#8a7768">${SITE.tagline} ♡</p>
    </div>
  </div>`

/* ---------- Contact form ---------- */

export async function sendContactMessage(input: unknown): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: 'Some details look off. Please check the form and try again.' }
  }

  const data = parsed.data
  // Bots fill the hidden field; pretend it worked so they don't retry
  if (data.website) return { ok: true }

  const email = getResend()
  if (!email) return NOT_CONFIGURED

  const typeLabel = ENQUIRY_TYPES.find((t) => t.value === data.type)?.label ?? data.type
  const topicLabel = TOPICS[data.type].find((t) => t.value === data.topic)?.label ?? data.topic
  const details: [string, string | undefined][] = [
    ['Name', data.name],
    ['Email', data.email],
    ['Type', typeLabel],
    ['Topic', topicLabel],
    ['Needed by', data.neededBy || undefined],
    ['Brand / organisation', data.organisation || undefined],
  ]
  const rows = details.filter((d): d is [string, string] => Boolean(d[1]))

  // 1. Notify the studio: replying goes straight to the customer
  const { error } = await email.resend.emails.send({
    from: email.from,
    to: [email.to],
    replyTo: data.email,
    subject: `[${typeLabel}] ${topicLabel} from ${data.name}`,
    text: `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${data.message}`,
    html: emailLayout(`
      <table style="font-size:14px;border-collapse:collapse;margin-bottom:24px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#8a7768">${k}</td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`
          )
          .join('')}
      </table>
      <p style="font-size:15px;line-height:1.6;white-space:pre-wrap;margin:0">${escapeHtml(data.message)}</p>`),
  })

  if (error) {
    console.error('[email] Contact message failed:', error)
    return { ok: false, error: 'We couldn’t send your message just now. Please try again in a moment.' }
  }

  // 2. Friendly acknowledgement to the customer: nice to have, so failures don't fail the form
  const { error: ackError } = await email.resend.emails.send({
    from: email.from,
    to: [data.email],
    replyTo: email.to,
    subject: `We’ve got your message, ${data.name.split(' ')[0]} ♡`,
    text: `Hi ${data.name},\n\nThank you for reaching out to ${SITE.name}! ${SITE.replyTime}.\n\nYour message:\n${data.message}\n\nWarmly,\nThe ${SITE.name} team`,
    html: emailLayout(`
      <p style="font-size:15px;line-height:1.6">Hi ${escapeHtml(data.name)},</p>
      <p style="font-size:15px;line-height:1.6">Thank you for reaching out! ${SITE.replyTime}.</p>
      <p style="font-size:13px;color:#8a7768;margin-top:24px">Your message</p>
      <p style="font-size:14px;line-height:1.6;white-space:pre-wrap;border-left:2px solid #d4a89c;padding-left:12px">${escapeHtml(data.message)}</p>
      <p style="font-size:15px;line-height:1.6;margin-top:24px">Warmly,<br/>The ${SITE.name} team</p>`),
  })
  if (ackError) console.warn('[email] Acknowledgement email failed:', ackError)

  return { ok: true }
}

/* ---------- Newsletter ---------- */

export async function subscribeToNewsletter(input: unknown): Promise<ActionResult> {
  const parsed = newsletterSchema.safeParse(input)
  if (!parsed.success) return { ok: false, error: 'Please enter a valid email address.' }

  const email = getResend()
  if (!email) return NOT_CONFIGURED

  const segmentId = process.env.RESEND_SEGMENT_ID
  const { error } = await email.resend.contacts.create({
    email: parsed.data.email,
    unsubscribed: false,
    ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
  })

  // Signing up twice isn't an error for the visitor
  const alreadySubscribed = error && /already exists/i.test(error.message)
  if (error && !alreadySubscribed) {
    console.error('[email] Newsletter signup failed:', error)
    return { ok: false, error: 'We couldn’t sign you up just now. Please try again in a moment.' }
  }

  if (!alreadySubscribed) {
    const { error: welcomeError } = await email.resend.emails.send({
      from: email.from,
      to: [parsed.data.email],
      subject: `Welcome to the loop ♡`,
      text: `Thank you for joining the ${SITE.name} community! Expect new creations, stories and workshop news, never spam.`,
      html: emailLayout(`
        <p style="font-size:15px;line-height:1.6">Thank you for joining the ${SITE.name} community!</p>
        <p style="font-size:15px;line-height:1.6">Expect new creations, stories from the studio and first dibs on workshops. A little joy in your inbox, never spam.</p>`),
    })
    if (welcomeError) console.warn('[email] Welcome email failed:', welcomeError)
  }

  return { ok: true }
}
