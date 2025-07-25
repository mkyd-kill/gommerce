import { useContext, ReactNode } from "react";
import Link from "next/link";
import { SidebarContext } from "./Sidebar";

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
  href?: string;
  target?: string; // _self, _black, _parent, _top
}

export function SidebarItem({
  icon,
  text,
  active,
  alert,
  href = "#",
  target = ""
}: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext);

  return (
    <Link href={href} target={target}>
      <li
        className={`
          relative flex items-center py-2 px-3 font-medium rounded-md cursor-pointer
          transition-colors group
          ${
            active
              ? "bg-indigo-100 text-indigo-800"
              : "hover:bg-indigo-50 text-gray-600"
          }
        `}
      >
        {icon}
        <span
          className={`transition-all overflow-hidden ${
            expanded ? "ml-3 w-full" : "w-0"
          }`}
        >
          {text}
        </span>

        {alert && (
          <span
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}

        {/* Tooltip when collapsed */}
        {!expanded && (
          <div
            className={`
              absolute left-full ml-3 bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded shadow-lg
              opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all
            `}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}