import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { config, isEntityKey } from "./config";
import CustomAlertDialog from "@/components/custom-alert-dialog";
import { FormikCustom } from "~/components/custom-form";
import { useRef, useState } from "react";

export default function update() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { entity, id } = useParams<{ entity: string; id: string }>();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!entity || !id || !isEntityKey(entity)) {
    navigate("/not-found", { replace: true });
    return null;
  }

  const entityConfig = config[entity];

  const { data, isLoading, error } = useQuery({
    queryKey: [entity, id],
    queryFn: () => entityConfig.api.getById({ id }),
    staleTime: Infinity,
    select(res) {
      return res.data.data;
    },
  });

  if (error && !isLoading) {
    navigate("/not-found", { replace: true });
    return null;
  }

  const { initialValues, ...formUpdate } = entityConfig.formUpdate;

  if (!data) {
    navigate("/not-found", { replace: true });
    return null;
  }

  const newInitialValues = Object.keys(initialValues).reduce(
    (acc, key) => {
      const safeKey = key as keyof typeof initialValues;
      acc[safeKey] = data[safeKey];
      return acc;
    },
    { ...initialValues },
  );

  entityConfig.formUpdate.successFn = (updatedData) => {
    queryClient.invalidateQueries({ queryKey: [entity] });
    navigate(-1);
  };

  return (
    <CustomAlertDialog
      action={() => formRef.current?.requestSubmit()}
      title={t("action.update")}
      loading={isSubmitting}
    >
      <FormikCustom
        {...formUpdate}
        initialValues={newInitialValues}
        formRef={formRef}
        setIsSubmitting={setIsSubmitting}
        isSubmitting={isSubmitting}
      />
    </CustomAlertDialog>
  );
}
