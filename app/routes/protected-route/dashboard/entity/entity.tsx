import { useParams } from "react-router";
import type { Route } from "../../+types/dashboard";
import i18n from "@/lib/i18n";

export function meta({ params }: Route.MetaArgs) {
  const { entity } = params as { entity: string };
  const { t } = i18n;
  const formattedName = t(`entity.${entity}`);

  return [
    { title: `${formattedName} | ${t("academy administration")}` },
    {
      name: "description",
      content: `${t("control panel for")} ${formattedName}`,
    },
  ];
}

export default function Entity() {
  const { entity } = useParams<{ entity: string }>();

  return <div>Entity: {entity}</div>;
}
