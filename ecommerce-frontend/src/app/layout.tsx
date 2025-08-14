import { Metadata } from "next";
import { UserProvider } from "@/context/useAuth";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Not Found",
};

export default function BaseSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
        { children }
        </UserProvider>
      </body>
    </html>
  );
}
