import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/Legal/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Shipping & Returns Policy",
  description:
    "Dispatch and delivery times, free shipping on orders over ₹999, 14-day returns and refunds for Little Loops handmade crochet orders.",
  path: "/shipping-returns",
});

// Keep in step with the product pages (ProductDetails) and the FAQ answers
const sections: LegalSection[] = [
  {
    id: "dispatch",
    title: "When your order ships",
    body: (
      <ul>
        <li>
          <strong>Ready-to-ship pieces</strong> are packed by hand and dispatched within 1–2 business days.
        </li>
        <li>
          <strong>Made-to-order pieces</strong> (marked “Made to Order” on the product page) need 7–10 days to be
          crocheted before dispatch.
        </li>
        <li>If your order mixes both, we ship everything together once it’s all ready.</li>
      </ul>
    ),
  },
  {
    id: "delivery",
    title: "Delivery times and costs",
    body: (
      <ul>
        <li>
          <strong>India:</strong> 3–7 business days after dispatch. Shipping is <strong>free on orders above ₹999</strong>;
          below that, the cost is shown at checkout.
        </li>
        <li>
          <strong>International:</strong> 7–14 business days after dispatch. Shipping is calculated at checkout, and
          any customs duties or taxes are paid by the recipient.
        </li>
        <li>You’ll get a tracking link by email as soon as your parcel is on its way.</li>
      </ul>
    ),
  },
  {
    id: "packaging",
    title: "Packaging",
    body: (
      <p>
        Everything is packed by hand in plastic-free packaging. Many pieces arrive gift-wrapped (look for “Gift
        Wrapped” on the product page), and we’re happy to add a handwritten note to any order.
      </p>
    ),
  },
  {
    id: "returns",
    title: "Returns",
    body: (
      <>
        <p>
          If you change your mind, you can return unused pieces with their tag still attached within{" "}
          <strong>14 days of delivery</strong>.
        </p>
        <p>
          Custom and personalised pieces are made just for you, so they can’t be returned unless they arrive faulty.
        </p>
        <p>
          To start a return, <Link href="/contact">message us</Link> with your order number. We’ll share the return
          address; return shipping is paid by you unless the item is faulty.
        </p>
      </>
    ),
  },
  {
    id: "damaged",
    title: "Damaged or wrong items",
    body: (
      <p>
        If something arrives damaged or isn’t what you ordered, email{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> within 48 hours of delivery with a photo. We’ll repair,
        replace or refund it and cover the shipping. We always fix any fault in our making.
      </p>
    ),
  },
  {
    id: "refunds",
    title: "Refunds",
    body: (
      <p>
        Once your return reaches us and we’ve checked it, we refund you within 5–7 business days to your original
        payment method. Original shipping charges are refunded only if the item was faulty or wrong.
      </p>
    ),
  },
  {
    id: "cancellations",
    title: "Cancellations",
    body: (
      <p>
        You can cancel a ready-to-ship order for a full refund until it’s dispatched. Made-to-order and custom pieces
        can be cancelled within 24 hours of ordering, before we start making them.
      </p>
    ),
  },
];

export default function ShippingReturnsPage() {
  return (
    <LegalPage
      title="Shipping & Returns"
      path="/shipping-returns"
      intro="How your handmade piece gets to you, and what to do if it isn’t quite right."
      sections={sections}
    />
  );
}
