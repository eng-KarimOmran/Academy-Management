import { useContext, useEffect } from "react";

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { ChevronsUpDown, School } from "lucide-react";

import { useTranslation } from "react-i18next";

import { academyContext } from "~/context/academy.context";

export default function SideHeader() {
  const { isMobile } = useSidebar();

  const { t } = useTranslation();

  const { activeAcademy, setActiveAcademy, academies } = useContext(academyContext);

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <School size={16} />
                </div>

                <div className="grid flex-1 text-sm text-start leading-tight">
                  <span className="font-medium truncate">
                    {activeAcademy?.name || t("academy.there are no")}
                  </span>
                  <span className="text-xs truncate text-muted-foreground">
                    {activeAcademy?.owner}
                  </span>
                </div>

                <ChevronsUpDown className="ml-auto size-4 opacity-50" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-muted-foreground text-xs uppercase">
                {t("academy.academies")}
              </DropdownMenuLabel>

              {academies.map((academy) => (
                <DropdownMenuItem
                  key={academy.id}
                  onClick={() => setActiveAcademy(academy)}
                  className="gap-2 p-2 cursor-pointer"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <School className="size-4" />
                  </div>
                  <span className="flex-1">{academy.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}