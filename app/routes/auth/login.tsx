import { Button } from "@/components/ui/button";
import type { Route } from "../../+types/root";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { CarFront } from "lucide-react";
import { CustomForm, type ICustomForm } from "@/components/custom-form";
import type { LoginDTO } from "@/DTO/auth.DTO";
import { loginSchema } from "@/validation/auth.validation";
import { useContext, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import axiosApi from "@/lib/axios";
import type { Response } from "@/type/type";
import type { User } from "~/type/user";
import { userContext } from "@/context/user.context";
import { useNavigate } from "react-router";
import { login } from "~/service/auth";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "تسجيل الدخول | إدارة الأكاديمية" },
    {
      name: "description",
      content: "قم بتسجيل الدخول للوصول إلى لوحة التحكم الخاصة بك",
    },
  ];
}

export default function Login() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { setIsLogin, setUser } = useContext(userContext);
  const navigate = useNavigate();
  const config: ICustomForm<LoginDTO> = {
    formId: "login-form",
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    loading,
    setLoading,
    inputs: [
      {
        id: "username",
        label: t("auth.username"),
        name: "username",
        placeholder: t("auth.type the username"),
        required: true,
        type: "text",
      },
      {
        id: "password",
        label: t("auth.password"),
        name: "password",
        placeholder: t("auth.type the password"),
        required: true,
        type: "password",
      },
    ],
    onSubmit: login,
    successFn: (data: Response<User>) => {
      setIsLogin(true);
      setUser(data.data);
      navigate("/dashboard", {
        replace: true,
      });
    },
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          <div className="p-4 rounded-2xl shadow-lg bg-linear-to-br from-primary to-primary/80 size-17 flex items-center justify-center mx-auto transition-transform hover:scale-105 text-white">
            <CarFront size={48} strokeWidth={2.5} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CustomForm {...config} />
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full"
          form={config.formId}
          disabled={loading}
        >
          {loading && <Spinner />}
          {t("auth.login")}
        </Button>
      </CardFooter>
    </Card>
  );
}
