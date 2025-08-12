import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Not Found",
};

export default function NotFoundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        { children }
      </body>
    </html>
  );
}
