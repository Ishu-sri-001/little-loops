import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/Legal/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "The terms for browsing and shopping with Little Loops: handmade products, prices and orders, custom pieces, grievances and seller details.",
  path: "/terms",
});

const sections: LegalSection[] = [
  {
    id: "about",
    title: "About these terms",
    body: (
      <p>
        These terms apply when you use this website or buy from {SITE.legal.businessName} (“{SITE.name}”, “we”,
        “us”). By using the site or placing an order you agree to them. Please also read our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link> and{" "}
        <Link href="/shipping-returns">Shipping &amp; Returns</Link> policy.
      </p>
    ),
  },
  {
    id: "handmade",
    title: "Our handmade products",
    body: (
      <p>
        Every piece is crocheted by hand in small batches. Small differences in colour, size and stitch from the
        photos are part of what makes your piece one of a kind and are not considered defects. Colours may also look
        slightly different depending on your screen.
      </p>
    ),
  },
  {
    id: "prices-orders",
    title: "Prices and orders",
    body: (
      <ul>
        <li>All prices are in Indian Rupees (₹) and include applicable taxes.</li>
        <li>
          An order is a request to buy. It’s accepted when we send you an order confirmation. We may decline or
          cancel an order (for example if a piece is no longer available or a price was shown incorrectly) and will
          refund you in full if we do.
        </li>
        <li>Bundle discounts apply only to items bought together in the same order.</li>
      </ul>
    ),
  },
  {
    id: "custom-orders",
    title: "Custom and personalised orders",
    body: (
      <p>
        For custom colours, personalised names or made-to-order pieces, we’ll confirm the details, price and timeline
        with you before we begin. Because they’re made just for you, custom and personalised pieces can’t be returned
        unless they arrive faulty.
      </p>
    ),
  },
  {
    id: "shipping-returns",
    title: "Shipping, returns and refunds",
    body: (
      <p>
        Delivery times, return windows and refunds are explained in our{" "}
        <Link href="/shipping-returns">Shipping &amp; Returns</Link> policy, which forms part of these terms.
      </p>
    ),
  },
  {
    id: "intellectual-property",
    title: "Designs and content",
    body: (
      <p>
        Our designs, photos, text and branding belong to {SITE.name} or are used with permission. You’re welcome to
        share links and tag us, but please don’t copy our designs or content for commercial use without written
        permission.
      </p>
    ),
  },
  {
    id: "use-of-site",
    title: "Using this website",
    body: (
      <p>
        Please don’t misuse the site, for example by sending spam through our forms, trying to break its security or
        copying it in bulk. We may block access for anyone who does.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Our responsibility to you",
    body: (
      <p>
        We’re responsible for providing products as described and for any loss that is a foreseeable result of us
        breaking these terms. Nothing in these terms limits your rights under the Consumer Protection Act, 2019 or any
        other law that can’t be excluded.
      </p>
    ),
  },
  {
    id: "grievances",
    title: "Grievance officer",
    body: (
      <>
        <p>
          In line with the Consumer Protection (E-Commerce) Rules, 2020, you can contact our grievance officer about
          any complaint:
        </p>
        <ul>
          <li>
            <strong>Name:</strong> {SITE.legal.grievanceOfficer.name}
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${SITE.legal.grievanceOfficer.email}`}>{SITE.legal.grievanceOfficer.email}</a>
          </li>
          <li>
            <strong>Address:</strong> {SITE.address.lines.join(", ")}
          </li>
        </ul>
        <p>We acknowledge complaints within 48 hours and aim to resolve them within one month.</p>
      </>
    ),
  },
  {
    id: "seller",
    title: "Seller details",
    body: (
      <ul>
        <li>
          <strong>Business name:</strong> {SITE.legal.businessName}
        </li>
        <li>
          <strong>GSTIN:</strong> {SITE.legal.gstin}
        </li>
        <li>
          <strong>Address:</strong> {SITE.address.lines.join(", ")}
        </li>
        <li>
          <strong>Email:</strong> <a href={`mailto:${SITE.email}`}>{SITE.email}</a> ·{" "}
          <strong>Phone:</strong> {SITE.phone}
        </li>
      </ul>
    ),
  },
  {
    id: "law",
    title: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of India. Any dispute will be handled by the courts of{" "}
        {SITE.legal.jurisdiction}, without affecting your right as a consumer to bring a claim where you live.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      path="/terms"
      intro="The friendly fine print for browsing and shopping with us, written to be read, not skimmed."
      sections={sections}
    />
  );
}
