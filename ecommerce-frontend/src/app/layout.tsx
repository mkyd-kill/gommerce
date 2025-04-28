import Navbar from "@/components/navbar/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="p-4 m-2">{children}</main>
      </body>
    </html>
  );
}
