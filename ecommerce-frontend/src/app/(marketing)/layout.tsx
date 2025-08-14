import { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import "../globals.css";

export const metadata: Metadata = {
  title: "Gommerce",
  description:
    "A simplified e-commerce web application powered by Next.js and Go. Provides user friendly navigation for maximized user browsing",
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <CartProvider>
        <WishlistProvider>
          <Navbar />
          <main className="p-2">
            <ToastContainer autoClose={2000} />
            {children}
          </main>
        </WishlistProvider>
      </CartProvider>
  );
}