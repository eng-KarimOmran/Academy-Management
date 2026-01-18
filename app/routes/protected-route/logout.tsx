import { useContext, useState } from "react";
import { userContext } from "@/context/user.context";
import { useTranslation } from "react-i18next";
import type { IAlertDialog } from "@/components/custom-alert-dialog";
import CustomAlertDialog from "@/components/custom-alert-dialog";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import i18n from "@/lib/i18n";
import type { Route } from "./+types/logout";
import type { ErrorResponse } from "~/type/type";
import api from "@/service/auth";

export function meta({}: Route.MetaArgs) {
  const { t } = i18n;
  const title = t("auth.logout");
  return [
    { title: `${title} | ${t("administration")} ${t("academy.academy")}` },
    {
      name: "description",
      content: title,
    },
  ];
}

export default function Logout() {
  const { user, setIsLogin, clear } = useContext(userContext);
  const { t, i18n } = useTranslation();
  const currentDir = i18n.language === "en" ? "ltr" : "rtl";
  const [loading, setLoading] = useState(false);
  const [device, setDevice] = useState<"device" | "all-device">("device");
  const navigate = useNavigate();
  const action = async () => {
    setLoading(true);
    try {
      await api.logout(device);
      setIsLogin(false);
      clear();
      navigate("/");
    } catch (error) {
      const err = error as ErrorResponse;
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  const settings: IAlertDialog<any> = {
    title: t("auth.Are you sure you want to log out"),
    description: `${t("auth.Log out of Academy Management as")} ${user.username}`,
    action,
    loading,
    setLoading,
  };
  return (
    <CustomAlertDialog {...settings}>
      <RadioGroup
        dir={currentDir}
        defaultValue={device}
        onValueChange={(value) => {
          setDevice(value as "all-device" | "device");
        }}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="device" id="device" />
          <Label htmlFor="device">
            {t("auth.Log out of this device only")}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="all-device" id="all-device" />
          <Label htmlFor="all-device">{t("auth.Log out of all devices")}</Label>
        </div>
      </RadioGroup>
    </CustomAlertDialog>
  );
}
