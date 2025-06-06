import { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "@/context/useAuth";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import "../globals.css";

export const metadata: Metadata = {
  title: "Gommerce E-commerce",
  description: "A simplified e-commerce web application powered by Next.js and Go"
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
