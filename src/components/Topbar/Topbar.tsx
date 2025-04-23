"use client";

import { MenuIcon } from "lucide-react";
import React, { ReactNode, useRef } from "react";
import { usePathname } from "next/navigation";
import Sidebar, { MENU_ITEMS, SidebarRef } from "../Sidebar/Sidebar";

interface TopbarProps {
  leftEnhancer?: ReactNode;
}

const Topbar: React.FC<TopbarProps> = ({ leftEnhancer }) => {
  const pathname = usePathname();

  const matchingMenu = MENU_ITEMS.find((item) => item.url === pathname);

  return (
    <>
      <div className="flex flex-row w-full h-18 items-center">
        {leftEnhancer}
        <div className="ml-4 text-2xl">
          {matchingMenu ? matchingMenu.name : ""}
        </div>
      </div>
    </>
  );
};

export default Topbar;
