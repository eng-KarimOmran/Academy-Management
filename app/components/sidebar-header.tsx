import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { getAllAcademy } from "@/service/academy";
import type { Academy } from "@/type/academy";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronsUpDown, School } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

export default function SideHeader() {
  const { isMobile } = useSidebar();
  const { t } = useTranslation();

  const {
    data: academies,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["academy"],
    queryFn: getAllAcademy,
    staleTime: Infinity,
    select: (axiosRes) => axiosRes.data as Academy[],
  });

  const [activeAcademy, setActiveAcademy] = useState<Academy | null>(null);

  useEffect(() => {
    if (academies?.length && !activeAcademy) {
      const savedId = Cookies.get("academyId");
      const found = academies.find((a) => a.id === savedId);
      setActiveAcademy(found || academies[0]);
    }
  }, [academies, activeAcademy]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const handleAcademyChange = (academy: Academy) => {
    setActiveAcademy(academy);
    Cookies.set("academyId", academy.id, { expires: 7 });
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
    );
  }

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          {academies && academies.length > 0 ? (
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
                      {activeAcademy?.name}
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
                    onClick={() => handleAcademyChange(academy)}
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
          ) : (
            <div className="p-2 text-sm text-center text-muted-foreground capitalize">
              {t("no academies found")}
            </div>
          )}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
