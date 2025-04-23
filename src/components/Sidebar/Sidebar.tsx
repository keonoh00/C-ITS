"use client";

import React, { createContext, useContext, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Shield, LayoutGrid, ClipboardList, Lock } from "lucide-react";

export interface MenuItemType {
  name: string;
  icon: React.ReactNode;
  url: string;
}

export const MENU_ITEMS: MenuItemType[] = [
  { name: "Asset", icon: <LayoutGrid />, url: "/asset" },
  { name: "Defend", icon: <Shield />, url: "/defend" },
  { name: "Defend Scenario", icon: <Lock />, url: "/defend-scenario" },
  { name: "Assessment", icon: <ClipboardList />, url: "/assessment" },
];

interface SidebarContextType {
  expanded: boolean;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context)
    throw new Error("useSidebar must be used within a SidebarProvider");
  return context;
};

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [expanded, setExpanded] = useState(true);
  const toggle = () => setExpanded((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ expanded, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
};

const Sidebar: React.FC = () => {
  const { expanded } = useSidebar();
  const pathname = usePathname();

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
            sizes={expanded ? "224px" : "64px"}
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
                    pathname.startsWith(item.url)
                      ? "text-blue-500 bg-blue-100 dark:bg-gray-800"
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
};

export default Sidebar;
