import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Purely Precious",
    template: "%s — Purely Precious",
  },
  description:
    "Jewellery by Purely Precious Collection. Quiet gold, pearl, and stone pieces, made to be worn.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
