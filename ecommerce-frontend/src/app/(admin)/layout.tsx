"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SidebarItem } from "@/components/sidebar/SidebarItem";
import {
  LayoutDashboard,
  UserCircle,
  Boxes,
  Package,
  Settings,
  Receipt,
  LifeBuoy,
  LogOut,
  Link
} from "lucide-react";
import "../globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>Gommerce | Admin</title>
      <body>
        <div className="flex min-h-screen">
          <Sidebar>
            <SidebarItem
              icon={<LayoutDashboard size={20} />}
              text="Dashboard"
              active
              href="/admin"
            />
            <SidebarItem icon={<UserCircle size={20} />} text="Users" />
            <SidebarItem icon={<Boxes size={20} />} text="Products" href="/admin/products" />
            <SidebarItem icon={<Receipt size={20} />} text="Billings" />
            <SidebarItem icon={<Package size={20} />} text="Orders" />
            <hr className="my-3" />
            <SidebarItem icon={<Link size={20} />} text="Main Site" href="/" />
            <SidebarItem icon={<Settings size={20} />} text="Settings" />
            <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
            <SidebarItem icon={<LogOut size={20} />} text="Logout" />
          </Sidebar>
          <main className="flex-1 p-3">
            <ToastContainer autoClose={2000} />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}