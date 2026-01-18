import { useNavigate, useParams } from "react-router";
import CustomAlertDialog from "~/components/custom-alert-dialog";
import { config, isEntityKey } from "./config";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { FormikCustom } from "~/components/custom-form";
import { useRef, useState } from "react";

export default function Add() {
  const { entity } = useParams<{ entity: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  if (!entity || !isEntityKey(entity)) {
    navigate("/not-found", { replace: true });
    return null;
  }
  const entityConfig = config[entity];
  entityConfig.formAdd.successFn = (addData) => {
    queryClient.invalidateQueries({ queryKey: [entity] });
    navigate(-1);
  };
  return (
    <CustomAlertDialog
      action={() => formRef.current?.requestSubmit()}
      title={t("action.add")}
      loading={isSubmitting}
    >
      <FormikCustom
        {...entityConfig.formAdd}
        formRef={formRef}
        setIsSubmitting={setIsSubmitting}
        isSubmitting={isSubmitting}
      />
    </CustomAlertDialog>
  );
}
