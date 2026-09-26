import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/Legal/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Little Loops collects, uses and protects your personal information when you shop, join our newsletter or contact our handmade crochet studio.",
  path: "/privacy-policy",
});

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <p>
        This website is run by {SITE.legal.businessName} (“{SITE.name}”, “we”, “us”), a handmade crochet studio based
        in {SITE.legal.jurisdiction}. This policy explains what personal information we collect when you use this
        website, why we collect it and the choices you have.
      </p>
    ),
  },
  {
    id: "what-we-collect",
    title: "Information we collect",
    body: (
      <>
        <p>We only collect what we need to reply to you and send you what you ask for:</p>
        <ul>
          <li>
            <strong>Contact form:</strong> your name, email address, the topic you choose, your message and, if you
            add them, a “needed by” date or brand name.
          </li>
          <li>
            <strong>Newsletter:</strong> your email address.
          </li>
          <li>
            <strong>Orders:</strong> when checkout is available, your name, delivery address, phone number and order
            details. Card and UPI payments are handled by our payment partner; we never see or store your full card
            details.
          </li>
          <li>
            <strong>Cart and wishlist:</strong> saved only in your own browser (local storage) so they’re still there
            when you come back. They are not sent to us.
          </li>
        </ul>
        <p>We don’t ask you to create an account, and we don’t collect sensitive personal data.</p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    body: (
      <ul>
        <li>To reply to your messages, quotes and custom-order requests.</li>
        <li>To send the newsletter you signed up for. You can unsubscribe at any time from any email.</li>
        <li>To process, deliver and support your orders, including returns and refunds.</li>
        <li>To meet our legal, tax and accounting obligations.</li>
      </ul>
    ),
  },
  {
    id: "sharing",
    title: "Who we share it with",
    body: (
      <>
        <p>We never sell your personal information. We share it only with services that help us run the shop:</p>
        <ul>
          <li>
            <strong>Resend:</strong> delivers our contact-form and newsletter emails and stores subscriber
            addresses.
          </li>
          <li>
            <strong>Our payment partner and courier partners:</strong> to take payment and deliver your order.
          </li>
          <li>
            <strong>Google Maps:</strong> the map on our <Link href="/contact">contact page</Link> is provided by
            Google, which may set its own cookies when it loads.
          </li>
          <li>Authorities, where the law requires us to.</li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and local storage",
    body: (
      <p>
        We don’t use advertising or tracking cookies. Your browser’s local storage keeps your cart and wishlist on
        your device, and you can clear it any time from your browser settings. Embedded services such as Google Maps
        may use their own cookies under their privacy policies.
      </p>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <p>
        We keep messages for as long as we need to help you, and order records for as long as tax law requires
        (usually 8 years in India). Newsletter subscribers stay on our list until they unsubscribe.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>
          Under India’s Digital Personal Data Protection Act, 2023 and other applicable laws you can ask us to:
        </p>
        <ul>
          <li>see the personal information we hold about you,</li>
          <li>correct or update it,</li>
          <li>delete it, or withdraw consent for the newsletter,</li>
          <li>raise a grievance about how we handle it.</li>
        </ul>
        <p>
          Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and we’ll respond within 30 days.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        The website is served over HTTPS and we limit access to your information to the people who need it. No method
        of sending information over the internet is completely secure, but we work hard to protect it.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy as the shop grows. The “last updated” date at the top will always show the latest
        version.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy"
      intro="Your trust matters as much as every stitch. Here’s exactly what we collect, why, and how you stay in control."
      sections={sections}
    />
  );
}
