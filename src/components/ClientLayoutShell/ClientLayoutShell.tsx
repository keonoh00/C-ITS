"use client";

import React, { useRef } from "react";
import Topbar from "@/components/Topbar/Topbar";
import Sidebar, { SidebarRef } from "@/components/Sidebar/Sidebar";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

export default function ClientLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarRef = useRef<SidebarRef>(null);

  return (
    <div className="flex min-h-screen">
      <Sidebar ref={sidebarRef} />
      <div className="flex flex-col">
        <Topbar
          leftEnhancer={
            <Button onClick={sidebarRef.current?.toggle}>
              <MenuIcon size={32} />
            </Button>
          }
        />
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
