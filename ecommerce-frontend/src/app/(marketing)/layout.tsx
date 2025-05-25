"use client";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "@/context/useAuth";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import "../globals.css";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>Gommerce E-commerce</title>
      <body>
        <UserProvider>
          <Navbar />
          <CartProvider>
            <WishlistProvider>
              <main className="m-2 p-2">
                <ToastContainer autoClose={3000} />
                {children}
              </main>
            </WishlistProvider>
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
