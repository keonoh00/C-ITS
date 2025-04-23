"use client";

import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Shield, ClipboardList, Lock, HomeIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export interface MenuItemType {
  name: string;
  icon: React.ReactNode;
  url: string;
}

export const MENU_ITEMS: MenuItemType[] = [
  { name: "Home", icon: <HomeIcon />, url: "/" },
  { name: "Defend", icon: <Shield />, url: "/defend" },
  { name: "Defend Scenario", icon: <Lock />, url: "/defend-scenario" },
  { name: "Assessment", icon: <ClipboardList />, url: "/assessment" },
];

export interface SidebarRef {
  toggle: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SidebarProps {}

const Sidebar = forwardRef<SidebarRef, SidebarProps>(({}, ref) => {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);

  useImperativeHandle(ref, () => ({
    toggle: () => setExpanded((prev) => !prev),
  }));

  return (
    <div
      className={`h-screen bg-white dark:bg-gray-900 border-r transition-all duration-300 ${
        expanded ? "w-56" : "w-16"
      }`}
    >
      <div className="flex items-center justify-between p-4 ml-1">
        <div className={`relative h-10 ${expanded ? "w-56" : "w-16"}`}>
          <Image
            src={expanded ? "/assets/logo-dark.png" : "/assets/logo-sm.png"}
            alt="Logo"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <nav className="mt-5 space-y-2">
        {MENU_ITEMS.map((item) => (
          <div className="relative group" key={item.name}>
            <Link href={item.url}>
              <div
                className={`flex items-center p-2 text-sm font-medium rounded-md transition-colors duration-200
                  ${
                    pathname == item.url
                      ? "text-blue-500 dark:bg-gray-800"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }
                  ${!expanded ? "justify-center" : ""}`}
              >
                <div className="w-6 h-6">{item.icon}</div>
                {expanded && (
                  <span className="ml-3 whitespace-nowrap">{item.name}</span>
                )}
              </div>
            </Link>
            {!expanded && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1 rounded bg-gray-800 text-white text-sm shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
                {item.name}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
});

Sidebar.displayName = "Sidebar";
export default Sidebar;
