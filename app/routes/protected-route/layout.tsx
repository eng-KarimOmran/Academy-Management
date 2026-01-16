import { Outlet, useNavigate } from "react-router";
import { userContext } from "@/context/user.context";
import { useContext, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Cookies from "js-cookie";
import SiteHeader from "@/components/site-header";

export default function Layout() {
  const { isLogin } = useContext(userContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/", { replace: true });
    }
  }, [isLogin, navigate]);

  if (!isLogin) {
    return null;
  }
  const defaultOpen = Cookies.get("sidebar_state") === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="w-full px-3">
        <SiteHeader />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
