"use client";
import Image from "next/image";
import avatar from "../../assets/default-avatar.jpg";
import { ChevronFirst, ChevronLast } from "lucide-react";
import { useState, createContext, ReactNode } from "react";

interface SidebarContextType {
  expanded: boolean;
}

export const SidebarContext = createContext<SidebarContextType>({ expanded: true });

export default function Sidebar({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col border-r shadow-sm">
        {/* Header */}
        <div className="p-3 pb-2 flex justify-between items-center">
          <Image
            src="https://img.logoipsum.com/243.svg"
            alt="logo"
            width={120}
            height={40}
            className={`transition-all duration-300 ${
              expanded ? "w-30" : "w-0"
            }`}
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* Menu */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 space-y-1">{children}</ul>
        </SidebarContext.Provider>

        {/* Footer */}
        <div className="border-t flex p-3 items-center">
          <Image
            src={avatar}
            alt="avatar"
            width={40}
            height={40}
            className="w-10 h-10 rounded-md object-cover"
          />
          {expanded && (
            <div className="flex justify-between items-center w-full ml-3">
              <div className="leading-4">
                <h4 className="font-semibold">John Doe</h4>
                <span className="text-xs text-gray-600">admin@example.com</span>
              </div>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
