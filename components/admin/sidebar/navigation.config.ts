import type React from "react";
import {
  BarChart3,
  Calendar,
  Users,
  Mail,
  Zap,
  Settings,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const navItems: NavItem[] = [
  { href: "/admin", label: "Overview", icon: BarChart3 },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/registrations", label: "All Registrations", icon: Users },
  { href: "/admin/emails", label: "Emails", icon: Mail },
  { href: "/admin/automation", label: "Automation", icon: Zap },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/core-team", label: "Core Team", icon: Users },
];
