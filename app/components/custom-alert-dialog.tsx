import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Spinner } from "./ui/spinner";
import type { ReactNode } from "react";
import { Skeleton } from "./ui/skeleton";

export interface IAlertDialog<T> {
  title: string;
  description?: string;
  action: (data?: T) => any;
  children?: ReactNode;
  loading?: boolean;
  setLoading?: (loading: boolean) => void;
  isLoading?: boolean;
}
export default function CustomAlertDialog<T>({
  action,
  description,
  title,
  children,
  loading,
  isLoading,
}: IAlertDialog<T>) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <AlertDialog defaultOpen={true}>
      <AlertDialogOverlay className="bg-black/20 backdrop-blur-lg" />
      <AlertDialogContent>
        {isLoading ? (
          <Skeleton className="w-full h-40 p-5" />
        ) : (
          <AlertDialogHeader>
            <AlertDialogTitle className="text-start">{title}</AlertDialogTitle>
            {description && (
              <AlertDialogDescription className="text-start">
                {description}
              </AlertDialogDescription>
            )}
            {children}
          </AlertDialogHeader>
        )}
        <AlertDialogFooter>
          <AlertDialogAction
            type="submit"
            disabled={loading || isLoading}
            onClick={(e) => {
              e.preventDefault();
              {
                action && action();
              }
            }}
          >
            {loading && <Spinner />}
            {t("action.continue")}
          </AlertDialogAction>
          <AlertDialogCancel
            disabled={loading}
            className="capitalize"
            onClick={() => navigate(-1)}
          >
            {t("action.cancel")}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
