import { Link, useLocation } from "react-router";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";

export default function SiteHeader() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const parts = pathname.split("/");
  parts.shift();
  const links = parts.map((part, i) => {
    return {
      label: t(`entity.${part}`),
      path: `/${parts.slice(0, i + 1).join("/")}`,
    };
  });
  return (
    <header className="h-10 py-3 flex items-center gap-2">
      <SidebarTrigger />
      <Separator orientation="vertical" />
      <nav>
        <ul className="flex items-center gap-2">
          {links.map((link, i) => (
            <li key={link.path} className="space-x-2">
              <span className="text-zinc-700 dark:text-zinc-500">
                {i > 0 && t("<")}
              </span>
              <Link
                to={link.path}
                className={
                  i === links.length - 1
                    ? "text-primary"
                    : "text-zinc-700 dark:text-zinc-500"
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
