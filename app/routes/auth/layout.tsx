import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { LanguageToggle } from "@/components/language-toggle";
import { ModeToggle } from "@/components/mode-toggle";
import { userContext } from "@/context/user.context";

export default function Layout() {
  const { isLogin } = useContext(userContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate("/dashboard", { replace: true });
    }
  }, [isLogin, navigate]);

  if (isLogin === true) {
    return null;
  }
  
  return (
    <section className="relative min-h-dvh w-full">
      <img
        src="/background.jpg"
        alt="background"
        className="fixed inset-0 w-full h-full object-cover z-0"
      />
      <div className="fixed inset-0 bg-black/30 dark:bg-black/50 z-10" />
      <div className="relative z-20 min-h-dvh flex flex-col">
        <nav className="w-full flex gap-3 p-5 items-center justify-end">
          <LanguageToggle />
          <ModeToggle />
        </nav>
        <main className="flex-1 flex items-center justify-center p-4 pb-18">
          <Outlet />
        </main>
      </div>
    </section>
  );
}
