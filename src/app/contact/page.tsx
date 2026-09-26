import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ContactHero from "@/components/Contact/ContactHero";
import ContactDetails from "@/components/Contact/ContactDetails";
import ContactFAQ from "@/components/Contact/ContactFAQ";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us: Custom Orders, Gifting & Collaborations",
  description:
    "Get in touch with Little Loops for custom crochet orders, bulk gifting, workshops and collaborations, or just say hello. Visit our studio in Bengaluru.",
  path: "/contact",
  image: "/assets/product-images/lily-flowers3.png",
});

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactDetails />
      <ContactFAQ />
    </main>
  );
}
