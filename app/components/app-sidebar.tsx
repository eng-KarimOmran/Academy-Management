import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next";
import SideHeader from "./sidebar-header";
import SideFooter from "./sidebar-footer";

export function AppSidebar() {
  const { i18n } = useTranslation();

  return (
    <Sidebar side={i18n.language === "ar" ? "right" : "left"}>
      <SideHeader />
      <SidebarContent></SidebarContent>
      <SideFooter />
    </Sidebar>
  );
}
