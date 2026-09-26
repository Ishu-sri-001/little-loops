import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Hero from "@/components/Homepage/Hero";
import Stage from "@/components/Homepage/Stage";
import About from "@/components/Homepage/About";
import Contact from "@/components/Homepage/Contact";

export const metadata: Metadata = pageMetadata({
  title: "Little Loops | Handmade Crochet Gifts, Bags & Home Décor",
  absoluteTitle: true,
  description:
    "Hand-crocheted bags, forever bouquets, hair accessories, keychains and home décor, made slowly in Bengaluru. Thoughtful handmade gifts to love for years.",
  path: "/",
});

export default function Home() {
  return (
   <>
    <Hero />
    <About />
    <Stage />
    <Contact />
   </>
  );
}
