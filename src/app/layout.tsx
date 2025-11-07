import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import ConvexProviderWrapper from "../components/providers/ConvexProviderWrapper";
import { CartProvider } from "../contexts/CartContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import "../styles/globals.css";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Audiophile | Premium Audio Equipment",
  description: "Experience natural, lifelike audio with premium audio equipment",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <ConvexProviderWrapper>
          <CartProvider>
            <Navbar />
            {children}
            <Footer />
          </CartProvider>
        </ConvexProviderWrapper>
      </body>
    </html>
  );
}