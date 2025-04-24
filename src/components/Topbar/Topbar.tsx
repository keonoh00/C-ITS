"use client";

import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { MENU_ITEMS } from "../Sidebar/Sidebar";

interface TopbarProps {
  leftEnhancer?: ReactNode;
}

const Topbar: React.FC<TopbarProps> = ({ leftEnhancer }) => {
  const pathname = usePathname();

  const matchingMenu = MENU_ITEMS.find((item) => item.url === pathname);

  return (
    <>
      <div className="flex flex-row w-full mb-6 items-center">
        {leftEnhancer}
        <div className="ml-4 text-2xl">
          {matchingMenu ? matchingMenu.name : ""}
        </div>
      </div>
    </>
  );
};

export default Topbar;
