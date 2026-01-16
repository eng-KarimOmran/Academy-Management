import { Sidebar } from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next";
import SideHeader from "./sidebar-header";
import SideFooter from "./sidebar-footer";
import SideContent from "./sidebar-content";

export function AppSidebar() {
  const { i18n } = useTranslation();

  return (
    <Sidebar
      collapsible={"icon"}
      side={i18n.language === "ar" ? "right" : "left"}
    >
      <SideHeader />
      <SideContent />
      <SideFooter />
    </Sidebar>
  );
}
