import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllSlugs,
  getPairedProducts,
  getProductBySlug,
  getRelatedProducts,
  productImage,
} from "../data";
import { pageMetadata } from "@/lib/seo";
import ProductHero from "@/components/ProductDetail/ProductHero";
import ProductDetails from "@/components/ProductDetail/ProductDetails";
import FrequentlyBought from "@/components/ProductDetail/FrequentlyBought";
import RelatedProducts from "@/components/ProductDetail/RelatedProducts";
import RealStories from "@/components/ProductDetail/RealStories";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found", robots: { index: false } };
  return pageMetadata({
    title: `${product.name} | Handmade Crochet`,
    description: trimDescription(
      `${product.description} From ₹${product.fromPrice.toLocaleString("en-IN")}, handmade in India.`
    ),
    path: `/products/${product.slug}`,
    image: productImage(product.cover),
  });
}

/** Keep descriptions within ~160 characters, cut on a word boundary */
const trimDescription = (text: string, max = 160) =>
  text.length <= max ? text : `${text.slice(0, text.lastIndexOf(" ", max - 1))}…`;

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <main key={product.slug}>
      <ProductHero product={product} />
      <ProductDetails product={product} />
      <FrequentlyBought product={product} pairs={getPairedProducts(product)} />
      <RelatedProducts products={getRelatedProducts(product)} />
      <RealStories product={product} />
    </main>
  );
}
