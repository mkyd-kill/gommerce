"use client";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "@/context/useAuth";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Navbar />
          <main className="m-2 p-2">
            <ToastContainer />
            {children}
          </main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
