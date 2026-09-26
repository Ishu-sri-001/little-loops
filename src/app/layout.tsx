import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Allura } from "next/font/google";
import LenisSmoothScroll from "@/animations/LenisSmoothScroll";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import InteractionFeedback from "@/components/InteractionFeedback";
import ScrollToTopOnReload from "@/components/ScrollToTopOnReload";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Little Loops | Handmade Crochet Gifts, Bags & Home Décor",
    template: "%s | Little Loops",
  },
  description:
    "Hand-crocheted bags, forever bouquets, hair accessories, keychains and home décor, made slowly in Bengaluru. Thoughtful handmade gifts to love for years.",
  applicationName: "Little Loops",
  keywords: [
    "handmade crochet",
    "crochet bags",
    "crochet bouquet",
    "crochet gifts India",
    "handmade gifts Bengaluru",
    "crochet keychain",
    "crochet home decor",
  ],
  openGraph: {
    siteName: "Little Loops",
    locale: "en_IN",
    type: "website",
    images: [{ url: DEFAULT_OG_IMAGE, alt: "Little Loops handmade crochet" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${dmSans.variable} ${allura.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LenisSmoothScroll>
          <Header />
          {children}
          <Footer />
          <ScrollToTopOnReload />
          <InteractionFeedback />
        </LenisSmoothScroll>
      </body>
    </html>
  );
}
