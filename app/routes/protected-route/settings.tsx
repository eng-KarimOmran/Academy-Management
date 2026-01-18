import i18n from "@/lib/i18n";
import { LanguageToggle } from "@/components/language-toggle";
import type { Route } from "./+types/layout";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "@/components/theme-provider";

export function meta({}: Route.MetaArgs) {
  const { t } = i18n;
  const title = t("settings.settings");
  return [
    { title: `${title} | ${t("administration")} ${t("academy.academy")}` },
    {
      name: "description",
      content: title,
    },
  ];
}

export interface ISettings {
  title: string;
  description: string;
  content: ReactNode;
}

export default function Settings() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  console.log(theme);
  const arrSettings: ISettings[] = [
    {
      title: t("settings.the language"),
      description: `${t("settings.current language")} : ${t("settings.language")}`,
      content: <LanguageToggle />,
    },
    {
      title: t("settings.mode"),
      description: `${t("settings.current mode")} : ${t(`settings.${theme}`)}`,
      content: <ModeToggle />,
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-5 gap-5">
      {arrSettings.map((s) => (
        <div
          className="bg-sidebar p-5 rounded-md shadow-sm flex justify-between items-center"
          key={s.title}
        >
          <div className="flex flex-col gap-4">
            <span className="font-normal text-xl">{s.title}</span>
            <p className="font-extralight text-md capitalize">
              {s.description}
            </p>
          </div>
          <div>{s.content}</div>
        </div>
      ))}
    </section>
  );
}
