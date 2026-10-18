import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "FLAMME — Sauces gourmet piquantes",
  description:
    "Sauces artisanales noires et oranges, fermentées lentement. Piment fumé, ail noir, habanero mangue.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
