"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import { SidebarItem } from "@/components/sidebar/SidebarItem";
import {
  LayoutDashboard,
  UserCircle,
  Boxes,
  Package,
  Settings,
  Receipt,
  LifeBuoy,
} from "lucide-react";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          active
        />
        <SidebarItem icon={<UserCircle size={20} />} text="Users" alert />
        <SidebarItem icon={<Boxes size={20} />} text="Products" alert />
        <SidebarItem icon={<Receipt size={20} />} text="Billings" />
        <SidebarItem icon={<Package size={20} />} text="Orders" />
        <hr className="my-3" />
        <SidebarItem icon={<Settings size={20} />} text="Settings" />
        <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
      </Sidebar>
      <main className="flex-1 p-3">{children}</main>
    </div>
  );
}
