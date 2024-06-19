import type { LucideIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface SidebarButtonProps {
  icon?: LucideIcon;
  label: string;
  variant: "ghost" | "secondary";
}

function SidebarButton({ icon: Icon, label, variant }: SidebarButtonProps) {
  return (
    <Button variant={variant} className="w-full gap-2 justify-start">
      {Icon && <Icon size={20} />}
      <span>{label}</span>
    </Button>
  );
}

export default SidebarButton;
