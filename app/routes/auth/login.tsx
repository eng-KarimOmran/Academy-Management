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
import type { LoginDTO } from "@/DTO/auth.DTO";
import { loginSchema } from "@/validation/auth.validation";
import { useContext, useRef, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { userContext } from "@/context/user.context";
import { useNavigate } from "react-router";
import i18n from "@/lib/i18n";
import { FormikCustom, type ICustomForm } from "~/components/custom-form";
import api from "@/service/auth";
import type { User } from "~/type/entity";

export function meta({}: Route.MetaArgs) {
  const { t } = i18n;
  const title = t("auth.login");
  return [
    { title: `${title} | ${t("administration")} ${t("academy.academy")}` },
    {
      name: "description",
      content: title,
    },
  ];
}

export default function Login() {
  const { t } = useTranslation();
  const { setIsLogin, setUser } = useContext(userContext);
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const config: ICustomForm<LoginDTO, User> = {
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    inputs: [
      {
        name: "username",
        required: true,
        type: "text",
      },
      {
        name: "password",
        required: true,
        type: "password",
      },
    ],
    submit: api.login,
    successFn: (data) => {
      setIsLogin(true);
      setUser(data);
      navigate("/dashboard", {
        replace: true,
      });
    },
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          <div className="p-4 rounded-2xl shadow-lg bg-linear-to-br from-primary to-primary/80 size-17 flex items-center justify-center mx-auto transition-all hover:scale-105 text-white">
            <CarFront size={48} strokeWidth={2.5} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormikCustom
          {...config}
          formRef={formRef}
          setIsSubmitting={setIsSubmitting}
          isSubmitting={isSubmitting}
        />
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
          onClick={() => formRef?.current?.requestSubmit()}
        >
          {isSubmitting && <Spinner />}
          {t("auth.login")}
        </Button>
      </CardFooter>
    </Card>
  );
}
