import { Link, useLocation } from "react-router";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { LayoutDashboard, Route, School, Settings } from "lucide-react";

export interface LinkNav {
  title: string;
  icon: ReactNode;
  path: string;
}
export default function SideContent() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const linkNav: LinkNav[] = [
    {
      title: t("dashboard"),
      path: "/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      title: t("entity.academies"),
      path: "/dashboard/academies",
      icon: <School />,
    },
    {
      title: t("entity.courses"),
      path: "/dashboard/courses",
      icon: <Route />,
    },
  ];

  const navBottom: LinkNav[] = [
    {
      title: t("settings.settings"),
      path: "/settings",
      icon: <Settings />,
    },
  ];
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {linkNav.map((link) => (
              <SidebarMenuItem key={link.title}>
                <SidebarMenuButton tooltip={link.title} asChild>
                  <Link
                    className={`capitalize ${pathname == link.path ? "bg-sidebar-accent" : "bg-transparent"}`}
                    to={link.path}
                  >
                    {link.icon}
                    <span>{link.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup className="mt-auto">
        <SidebarGroupContent>
          <SidebarMenu>
            {navBottom.map((link) => (
              <SidebarMenuItem key={link.title}>
                <SidebarMenuButton tooltip={link.title} asChild>
                  <Link
                    className={`capitalize ${pathname == link.path ? "bg-sidebar-accent" : "bg-transparent"}`}
                    to={link.path}
                  >
                    {link.icon}
                    <span>{link.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
