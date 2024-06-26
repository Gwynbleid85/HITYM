import type { LucideIcon } from "lucide-react";

export interface NavigationItems {
  links: Array<{
    label: string;
    href: string;
    icon?: LucideIcon;
  }>;
}
