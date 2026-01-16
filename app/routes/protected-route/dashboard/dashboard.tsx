import i18n from "@/lib/i18n";
import type { Route } from "../../../+types/root";

export function meta({}: Route.MetaArgs) {
  const { t } = i18n;
  const title = t("dashboard");
  return [
    { title: `${title} | ${t("academy administration")}` },
    {
      name: "description",
      content: title,
    },
  ];
}

export default function Dashboard() {
  return <div>dashboard</div>;
}
