import { Menu, Home, UsersRound } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";

import { useLocation } from "react-router-dom";
import type { NavigationItems } from "@/types/Navigation";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import React from "react";
import SidebarButton from "./SidebarButton";

const navigationItems: NavigationItems = {
  links: [
    {
      label: "Home",
      href: "/home", 
      icon: Home,
    },
    {
      label: "Groups",
      href: "/groups",
      icon: UsersRound,
    },
  ],
};

export function SidebarMenu() {
  const location = useLocation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="shadow-sm h-12 w-12 bg-opacity-60">
          <Menu size={30} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="px-3 py-4 rounded-r-lg bg-background/95">
        <SheetHeader className="flex flex-row justify-between items-center space-y-0">
          <span className="text-lg font-semibold text-foreground mx-3">HITYM</span>
        </SheetHeader>
        <div className="h-full">
          <div className="mt-5 flex flex-col w-full gap-1">
            {navigationItems.links.map((link, idx) => (
              <SheetClose asChild key={idx}>
                <Link to={link.href}>
                  <SidebarButton
                    variant={location.pathname === link.href ? "default" : "ghost"}
                    icon={link.icon}
                    label={link.label}
                  />
                </Link>
              </SheetClose>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
