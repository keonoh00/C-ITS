"use client";
import { MenuIcon } from "lucide-react";
import React from "react";
import { MENU_ITEMS, useSidebar } from "../Sidebar/Sidebar";
import { usePathname } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface TopbarProps {}

const Topbar: React.FC<TopbarProps> = ({}) => {
  const { toggle } = useSidebar();
  const pathname = usePathname();
  const matchingMenu = MENU_ITEMS.filter((item) => item.url == pathname);
  return (
    <div className="flex flex-row w-full h-18 items-center">
      <button onClick={toggle}>
        <MenuIcon size={32} />
      </button>
      <div className="justify-center">
        <p className="text-2xl ml-4">
          {matchingMenu && matchingMenu.length > 0 ? matchingMenu[0].name : ""}
        </p>
      </div>
    </div>
  );
};

export default Topbar;
