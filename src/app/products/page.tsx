import type { Metadata } from "next";
import { CATEGORIES } from "./data";
import { pageMetadata } from "@/lib/seo";
import ProductsHero from "@/components/Products/ProductsHero";
import ProductListing from "@/components/Products/ProductListing";

export async function generateMetadata({
  searchParams,
}: PageProps<"/products">): Promise<Metadata> {
  const { category } = await searchParams;
  if (typeof category === "string" && CATEGORIES.includes(category)) {
    return pageMetadata({
      title: `Handmade Crochet ${category}`,
      description: `Shop hand-crocheted ${category.toLowerCase()} from Little Loops. Small-batch pieces made slowly in Bengaluru, with free shipping on orders over ₹999.`,
      path: `/products?category=${encodeURIComponent(category)}`,
    });
  }
  return pageMetadata({
    title: "Shop Handmade Crochet Bags, Bouquets & Gifts",
    description:
      "Shop hand-crocheted bags, forever bouquets, hair accessories, keychains and home décor from Little Loops. Filter by colour, occasion and price.",
    path: "/products",
  });
}

export default async function ProductsPage({
  searchParams,
}: PageProps<"/products">) {
  const { category } = await searchParams;
  const initialCategory = typeof category === "string" ? category : undefined;

  return (
    <main>
      <ProductsHero />
      {/* Remount when the category link changes so the filters reset to it */}
      <ProductListing key={initialCategory ?? "all"} initialCategory={initialCategory} />
    </main>
  );
}
