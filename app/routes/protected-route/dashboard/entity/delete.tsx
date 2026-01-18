import { useNavigate, useParams } from "react-router";
import { config, isEntityKey } from "./config";
import CustomAlertDialog, {
  type IAlertDialog,
} from "~/components/custom-alert-dialog";
import { useState } from "react";
import { toast } from "sonner";
import type { ErrorResponse } from "~/type/type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export default function Delete() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { entity, id } = useParams<{ entity: string; id: string }>();
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
      return res.data;
    },
  });

  if (error && !isLoading) {
    navigate("/not-found", { replace: true });
    return null;
  }

  const action = async () => {
    setLoading(true);
    try {
      const res = await entityConfig.api.remove({ id });
      queryClient.invalidateQueries({ queryKey: [entity] });
      toast.success(res.data.message);
      navigate(-1);
    } catch (error) {
      const err = error as ErrorResponse;
      toast.error(err.message);
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  const settings: IAlertDialog<{ id: string }> = {
    loading,
    setLoading,
    title: `${t("action.are you sure you want to delete")} <${data?.data.name}>`,
    action,
    isLoading,
  };

  return <CustomAlertDialog {...settings}></CustomAlertDialog>;
}
