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

export interface IAlertDialog<T> {
  title: string;
  description?: string;
  action: (data?: T) => any;
  children?: ReactNode;
  formId?: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}
export default function CustomAlertDialog<T>({
  action,
  description,
  title,
  children,
  formId,
  loading,
}: IAlertDialog<T>) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <AlertDialog defaultOpen={true}>
      <AlertDialogOverlay className="bg-black/50 backdrop-blur-md" />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-start">{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription className="text-start">
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>
          <AlertDialogAction
            form={formId}
            type="submit"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              action();
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
