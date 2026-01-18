import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Eye, SquarePen, Trash } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";
import { IoLogoWhatsapp } from "react-icons/io";
import type { ReactNode } from "react";

export type Action = "delete" | "update" | "whatsapp" | "watch";

export interface IActionTable {
  id: string | number;
  actions: Action[];
  phone?: string;
}

export default function ActionTable({ id, actions, phone }: IActionTable) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-center">
          {t("action.actions")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {actions.map((action) => (
          <DropdownMenuItem asChild key={`${action}-${id}`}>
            {
              <Link
                to={
                  action === "whatsapp"
                    ? `https://wa.me/2${phone}`
                    : `${pathname}/${action}/${id}`
                }
              >
                {actionIcons[action]}
                {t(`action.${action}`)}
              </Link>
            }
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const actionIcons: Record<Action, ReactNode> = {
  delete: <Trash />,
  update: <SquarePen />,
  whatsapp: <IoLogoWhatsapp />,
  watch: <Eye />,
};
