"use client";
import Navbar from "@/components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "@/context/useAuth";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>Gommerce</title>
      <body>
        <UserProvider>
          <Navbar />
          <CartProvider>
          <main className="m-2 p-2">
            <ToastContainer />
            {children}
          </main>
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
