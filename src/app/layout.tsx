import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Allura } from "next/font/google";
import LenisSmoothScroll from "@/animations/LenisSmoothScroll";
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
  title: "little-loops",
  description: "little-loops",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${dmSans.variable} ${allura.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LenisSmoothScroll>{children}</LenisSmoothScroll>
      </body>
    </html>
  );
}
