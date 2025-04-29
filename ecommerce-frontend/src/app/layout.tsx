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
        <main className="m-2 p-2">{children}</main>
      </body>
    </html>
  );
}
