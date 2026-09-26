import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import AboutHero from "@/components/About/AboutHero";
import WhoWeAre from "@/components/About/WhoWeAre";
import Mission from "@/components/About/Mission";
import Values from "@/components/About/Values";
import AboutCTA from "@/components/About/AboutCTA";

export const metadata: Metadata = pageMetadata({
  title: "About Us: Our Story, Mission & Values",
  description:
    "More than just crochet. Meet the small Bengaluru team behind Little Loops, our mission for a kinder, cozier world and the values in every handmade piece.",
  path: "/about",
  image: "/assets/product-images/daisy-wall-hanging6.png",
});

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <WhoWeAre />
      <Mission />
      <Values />
      <AboutCTA />
    </main>
  );
}
